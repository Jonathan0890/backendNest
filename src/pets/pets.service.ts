import { Injectable } from '@nestjs/common';
//import { CreatePetDto } from './dto/create-pet.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Dog } from './entities/dog.entity';
import { Repository } from 'typeorm';
import { Cat } from './entities/cat.entity';
import { InjectModel } from '@nestjs/mongoose';
import { MedicalRecord } from './schemas/medical-record.schema';
import { Model } from 'mongoose';
//import { UpdatePetDto } from './dto/update-pet.dto';

@Injectable()
export class PetsService {

  constructor(
    @InjectRepository(Dog) private dogRepository: Repository<Dog>,
    @InjectRepository(Cat) private catRepository: Repository<Cat>,
    @InjectModel(MedicalRecord.name) private medicalRecordModel: Model<MedicalRecord>,
  ) {}
  
  async createDog(dogData: Partial<Dog>) {
    return await this.dogRepository.save(dogData);
  }

  async createMedicalRecord(recordData: Partial<MedicalRecord>) {
    const newRecord = new this.medicalRecordModel(recordData);
    return await newRecord.save();
  }

  /*async create(createPetDto: CreatePetDto) {
    return 'This action adds a new pet';
  }

  findAll() {
    return `This action returns all pets`;
  }

  findOne(id: number) {
    return `This action returns a #${id} pet`;
  }

  update(id: number, updatePetDto: UpdatePetDto) {
    return `This action updates a #${id} pet`;
  }

  remove(id: number) {
    return `This action removes a #${id} pet`;
  }*/
}
