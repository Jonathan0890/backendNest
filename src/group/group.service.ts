import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Group } from './entities/gruop.entity';

@Injectable()
export class GroupService {

  constructor(
    @InjectRepository(Group) private groupRepository: Repository<Group>,
  ) {}
  async createGroup( group: CreateGroupDto) {
    const groupFound = await this.groupRepository.findOne({
      where: {name: group.name,
        grade: {id: group.gradeId}
      },
      relations: ['grade']
    })
    if (groupFound) {
      throw new HttpException('Group already exists', HttpStatus.CONFLICT);
    }
    const newgroup = this.groupRepository.create(group);
    return this.groupRepository.save(newgroup);
  }

  getGroups() {
    return this.groupRepository.find({
      relations: ['grade'],
    });
  }

  async getGroup(id: number) {
    const groupFound = await this.groupRepository.findOne(
      {where: {id},
      relations: ['grade'],
    });
    if (!groupFound) {
      throw new HttpException('group not found', HttpStatus.NOT_FOUND);
    }
    return this.groupRepository.findOne({where: {id}});
  }

  async updateGroup(id: number, group: UpdateGroupDto) {
    const groupFound = await this.groupRepository.findOne({
      where: {id,},
    })
    if (!groupFound) {
      throw new HttpException('group not found', HttpStatus.NOT_FOUND);
    }
    const updateGroup = Object.assign(groupFound, group);
    return this.groupRepository.save(updateGroup);
  }

  async deleteGroup(id: number) {
    const result = await this.groupRepository.delete({id});

    if (result.affected === 0){
      throw new HttpException('group not found', HttpStatus.NOT_FOUND)
    }
    return result;
  }
}
