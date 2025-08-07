import { Module } from '@nestjs/common';
import { PetsService } from './pets.service';
import { PetsController } from './pets.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MedicalRecord } from './entities/medical-record.entity';
import { User } from 'src/users/entities/user.entity';
import { Observation } from './entities/observation.entity';
import { Pet } from './entities/pet.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Pet, MedicalRecord, User, Observation]
    ),
  ],
  controllers: [PetsController],
  providers: [PetsService],
  exports: [PetsService]
})
export class PetsModule { }
