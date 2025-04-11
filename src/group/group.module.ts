import { Module } from '@nestjs/common';
import { GruopService } from './group.service';
import { GruopController } from './group.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Gruop } from './entities/group.entity';
import { GradeModule } from 'src/grade/grade.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Gruop]),
    GradeModule
  ],
  controllers: [GruopController],
  providers: [GruopService],
  exports: [GruopService],
})
export class GruopModule {}
