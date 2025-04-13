import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { EvaluationService } from './evaluation.service';
import { CreateEvaluationDto } from './dto/create-evaluation.dto';
import { UpdateEvaluationDto } from './dto/update-evaluation.dto';

@Controller('evaluation')
export class EvaluationController {
  constructor(private readonly evaluationService: EvaluationService) { }

  @Get()
  getEvaluations () {
    return this.evaluationService.getEvaluations();
  }

  @Get(':id')
  getEvaluation (@Param('id', ParseIntPipe) id: number) {
    return this.evaluationService.getEvaluation(id);
  }

  @Post()
  createEvaluation(@Body() newEvaluation: CreateEvaluationDto) {
    return this.evaluationService.createEvaluation(newEvaluation);
  }

  @Patch(':id')
  updateEvaluation(@Param('id', ParseIntPipe) id: number, @Body() evaluation: UpdateEvaluationDto) {
    return this.evaluationService.updateEvaluation(id, evaluation);
  }

  @Delete(':id')
  deleteEvaluation(@Param('id', ParseIntPipe) id: number) {
    return this.evaluationService.deleteEvaluation(id);
  }
}
