import { Module } from '@nestjs/common';
import { GroupService } from './group.service';
import { GruopController } from './group.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GradeModule } from 'src/grade/grade.module';
import { Group } from './entities/gruop.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Group]),
    GradeModule
  ],
  controllers: [GruopController],
  providers: [GroupService],
  exports: [GroupService],
})
export class GruopModule {}
