import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from './entities/role.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RolesService {

  constructor(
    @InjectRepository(Role) private rolesRepository: Repository<Role>
  ) {}
  async createRol(role: CreateRoleDto) {
    const newRole = this.rolesRepository.create(role);
    return await this.rolesRepository.save(newRole);

    const rolFound = await this.rolesRepository.findOne({
      where: { name: role.name}
    })
    if (rolFound) {
      throw new HttpException('Role already exists', HttpStatus.CONFLICT);
    }
  }

  getRoles() {
    return this.rolesRepository.find();
  }

  async getRole(id: number) {
    const rolFound = await this.rolesRepository.findOne({
      where: { id }
    })
    if (!rolFound) {
      throw new HttpException('Role not found', HttpStatus.NOT_FOUND);
    }
    return this.rolesRepository.findOne({where: {id}});
  }

  async updateRol(id: number, role: UpdateRoleDto) {
    const rolFound = await this.rolesRepository.findOne({
      where: { id },
    })
    if (!rolFound) {
      throw new HttpException('Role not found', HttpStatus.NOT_FOUND);
    }
    const UpdateRol = Object.assign(rolFound, role);
    return this.rolesRepository.save(UpdateRol);
  }

  async deleteRol(id: number) {
    const result = await this.rolesRepository.delete({ id });
    if (result.affected === 0) {
      throw new HttpException('Role not found', HttpStatus.NOT_FOUND);
    }
    return result;
  }
}
