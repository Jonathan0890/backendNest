import { Module } from '@nestjs/common';
import { PetsService } from './pets.service';
import { PetsController } from './pets.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MongooseModule } from '@nestjs/mongoose';
import { Dog } from './entities/dog.entity';
import { Cat } from './entities/cat.entity';
import { Observation, ObservationSchema } from './schemas/observation.schema';
import { MedicalRecord, MedicalRecordSchema } from './schemas/medical-record.schema';

@Module({
  imports: [
    TypeOrmModule.forFeature([ Dog, Cat]),
    MongooseModule.forFeature([
      { name: MedicalRecord.name, schema: ObservationSchema },
      { name: Observation.name, schema: MedicalRecordSchema }
    ])
  ],
  controllers: [PetsController],
  providers: [PetsService],
  exports: [PetsService]
})
export class PetsModule {}
