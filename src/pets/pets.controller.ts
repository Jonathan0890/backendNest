import {
  Controller,
  // Get, 
  Post, Body,
  // Patch, Param, Delete 
} from '@nestjs/common';
import { PetsService } from './pets.service';
//import { CreatePetDto } from './dto/create-pet.dto';
import { Dog } from './entities/dog.entity';
import { MedicalRecord } from './schemas/medical-record.schema';
//import { UpdatePetDto } from './dto/update-pet.dto';

@Controller('pets')
export class PetsController {
  constructor(private readonly petsService: PetsService) { }

  @Post('dog')
  createDog(@Body() dogData: Partial<Dog>) {
    return this.petsService.createDog(dogData);
  }

  @Post('medical-record')
  createMedicalRecord(@Body() recordData: Partial<MedicalRecord>) {
    return this.petsService.createMedicalRecord(recordData);
  }

  /*@Get()
  findAll() {
    return this.petsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.petsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePetDto: UpdatePetDto) {
    return this.petsService.update(+id, updatePetDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.petsService.remove(+id);
  }*/
}
