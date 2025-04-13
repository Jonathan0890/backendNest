import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Profile } from './entities/profile.entity';
import { Role } from 'src/roles/entities/role.entity';
import { Evaluation } from 'src/evaluation/entities/evaluation.entity';
import { Attendance } from 'src/attendance/entities/attendance.entity';
import { Report } from 'src/report/entities/report.entity';
import { Contact } from 'src/contact/entities/contact.entity';
import { Group } from 'src/group/entities/gruop.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User, Profile, Role, Group, Evaluation, Attendance, Report, Contact
    ]),
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
