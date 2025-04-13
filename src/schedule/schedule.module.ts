import { Module } from '@nestjs/common';
import { ScheduleService } from './schedule.service';
import { ScheduleController } from './schedule.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Schedule } from './entities/schedule.entity';
import { Subject } from 'src/subject/entities/subject.entity';
import { Group } from 'src/group/entities/gruop.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Schedule, Subject, Group
    ]),
  ],
  controllers: [ScheduleController],
  providers: [ScheduleService],
  exports: [ScheduleService],
})
export class ScheduleModule {}
