import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pet } from './entities/pet.entity';
import { User } from 'src/users/entities/user.entity';
import { MedicalRecord } from './entities/medical-record.entity';
import { Observation } from './entities/observation.entity';
import { CreatePetDto } from './dto/create-pet.dto';
import { UpdatePetDto } from './dto/update-pet.dto';
import { CreateObservationDto } from './dto/create-observation.dto';
import { UpdateObservationDto } from './dto/update-observation.dto';
import { UpdateMedicalRecordDto } from './dto/update-medical-record.dto';
import { CreateMedicalRecordDto } from './dto/create-medical-record.dto';


@Injectable()
export class PetsService {
  constructor(
    @InjectRepository(Pet) private petRepo: Repository<Pet>,
    @InjectRepository(User) private userRepo: Repository<User>,
    @InjectRepository(MedicalRecord) private mrRepo: Repository<MedicalRecord>,
    @InjectRepository(Observation) private obsRepo: Repository<Observation>,
  ) { }

  // CRUD Pet
  async create(createDto: CreatePetDto) {
    const owner = await this.userRepo.findOneBy({ id: createDto.ownerId });
    if (!owner) throw new NotFoundException('Owner not found');

    const pet = this.petRepo.create({ ...createDto, owner });
    return this.petRepo.save(pet);
  }

  findAll() {
    return this.petRepo.find({ relations: ['medicalRecords'] });
  }

  async findOne(id: number) {
    const pet = await this.petRepo.findOne({ where: { id }, relations: ['owner', 'medicalRecords'] });
    if (!pet) throw new NotFoundException('Pet not found');
    return pet;
  }

  async update(id: number, updateDto: UpdatePetDto) {
    const pet = await this.findOne(id);
    Object.assign(pet, updateDto);
    return this.petRepo.save(pet);
  }

  async remove(id: number) {
    const pet = await this.findOne(id);
    return this.petRepo.remove(pet);
  }

  // CRUD MedicalRecord
  async createMedicalRecord(dto: CreateMedicalRecordDto) {
    const pet = await this.petRepo.findOneBy({ id: dto.petId });
    if (!pet) throw new NotFoundException('Pet not found');
    const record = this.mrRepo.create({ ...dto, pet });
    return this.mrRepo.save(record);
  }

  findAllMedicalRecords() {
    return this.mrRepo.find({ relations: ['pet'] });
  }

  async updateMedicalRecord(id: number, dto: UpdateMedicalRecordDto) {
    const record = await this.mrRepo.findOneBy({ id });
    if (!record) throw new NotFoundException('Record not found');
    Object.assign(record, dto);
    return this.mrRepo.save(record);
  }

  async deleteMedicalRecord(id: number) {
    const record = await this.mrRepo.findOneBy({ id });
    if (!record) throw new NotFoundException('Record not found');
    return this.mrRepo.remove(record);
  }

  // CRUD Observation
  async createObservation(dto: CreateObservationDto) {
    const record = await this.mrRepo.findOneBy({ id: dto.medicalRecordId });
    if (!record) throw new NotFoundException('Medical Record not found');

    const obs = this.obsRepo.create({
      note: dto.description,
      pet: record.pet,
    });

    return this.obsRepo.save(obs);
  }


  findAllObservations() {
    return this.obsRepo.find({ relations: ['medicalRecord'] });
  }

  async updateObservation(id: number, dto: UpdateObservationDto) {
    const obs = await this.obsRepo.findOneBy({ id });
    if (!obs) throw new NotFoundException('Observation not found');
    Object.assign(obs, dto);
    return this.obsRepo.save(obs);
  }

  async deleteObservation(id: number) {
    const obs = await this.obsRepo.findOneBy({ id });
    if (!obs) throw new NotFoundException('Observation not found');
    return this.obsRepo.remove(obs);
  }
}
