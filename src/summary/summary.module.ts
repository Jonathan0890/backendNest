import { Module } from '@nestjs/common';
import { SummaryService } from './summary.service';
import { SummaryController } from './summary.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Summary } from './entities/summary.entity';
import { User } from 'src/users/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Summary, User])
  ],
  controllers: [SummaryController],
  providers: [SummaryService],
  exports: [SummaryService]
})
export class SummaryModule {}
