import { Injectable } from '@nestjs/common';
import { CreateGruopDto } from './dto/create-group.dto';
import { UpdateGruopDto } from './dto/update-group.dto';

@Injectable()
export class GruopService {
  create(createGruopDto: CreateGruopDto) {
    return 'This action adds a new gruop';
  }

  findAll() {
    return `This action returns all gruop`;
  }

  findOne(id: number) {
    return `This action returns a #${id} gruop`;
  }

  update(id: number, updateGruopDto: UpdateGruopDto) {
    return `This action updates a #${id} gruop`;
  }

  remove(id: number) {
    return `This action removes a #${id} gruop`;
  }
}
