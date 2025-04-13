import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { PostsModule } from './posts/posts.module';
import { AuthModule } from './auth/auth.module';
import { RolesModule } from './roles/roles.module';
import { GradeModule } from './grade/grade.module';
import { GruopModule } from './group/group.module';
import { SubjectModule } from './subject/subject.module';
import { ScheduleModule } from './schedule/schedule.module';
import { AttendanceModule } from './attendance/attendance.module';
import { ReportModule } from './report/report.module';
import { ContactModule } from './contact/contact.module';
import { EvaluationModule } from './evaluation/evaluation.module';
import { LoggerService } from './logger/logger.service';
import { LoggerModule } from './logger/logger.module';
import { FilesModule } from './files/files.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'test',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    UsersModule,
    PostsModule,
    AuthModule,
    RolesModule,
    GradeModule,
    GruopModule,
    SubjectModule,
    ScheduleModule,
    AttendanceModule,
    ReportModule,
    ContactModule,
    EvaluationModule,
    LoggerModule,
    FilesModule,
  ],
  controllers: [AppController],
  providers: [AppService,  LoggerService, ],
  exports: [LoggerService]
})
export class AppModule {}
