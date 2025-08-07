import { Controller, Post, Body, Get, Param, Patch, Delete } from '@nestjs/common';
import { PetsService } from './pets.service';
import { CreatePetDto } from './dto/create-pet.dto';
import { UpdatePetDto } from './dto/update-pet.dto';
import { CreateMedicalRecordDto } from './dto/create-medical-record.dto';
import { UpdateMedicalRecordDto } from './dto/update-medical-record.dto';
import { CreateObservationDto } from './dto/create-observation.dto';
import { UpdateObservationDto } from './dto/update-observation.dto';

@Controller('pets')
export class PetsController {
  constructor(private readonly petsService: PetsService) { }

  @Post() create(@Body() dto: CreatePetDto) {
    return this.petsService.create(dto);
  }

  @Get() findAll() {
    return this.petsService.findAll();
  }

  @Get(':id') findOne(@Param('id') id: string) {
    return this.petsService.findOne(+id);
  }

  @Patch(':id') update(@Param('id') id: string, @Body() dto: UpdatePetDto) {
    return this.petsService.update(+id, dto);
  }

  @Delete(':id') remove(@Param('id') id: string) {
    return this.petsService.remove(+id);
  }

  // Medical Records
  @Post('medical') createMR(@Body() dto: CreateMedicalRecordDto) {
    return this.petsService.createMedicalRecord(dto);
  }

  @Patch('medical/:id') updateMR(@Param('id') id: string, @Body() dto: UpdateMedicalRecordDto) {
    return this.petsService.updateMedicalRecord(+id, dto);
  }

  @Delete('medical/:id') removeMR(@Param('id') id: string) {
    return this.petsService.deleteMedicalRecord(+id);
  }

  // Observations
  @Post('observation') createObs(@Body() dto: CreateObservationDto) {
    return this.petsService.createObservation(dto);
  }

  @Patch('observation/:id') updateObs(@Param('id') id: string, @Body() dto: UpdateObservationDto) {
    return this.petsService.updateObservation(+id, dto);
  }

  @Delete('observation/:id') removeObs(@Param('id') id: string) {
    return this.petsService.deleteObservation(+id);
  }
}
