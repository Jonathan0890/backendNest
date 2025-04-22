import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { SummaryService } from './summary.service';
import { CreateSummaryDto } from './dto/create-summary.dto';
import { UpdateSummaryDto } from './dto/update-summary.dto';

@Controller('summary')
export class SummaryController {
  constructor(private readonly summaryService: SummaryService) {}
  
  @Get()
  getSummaries() {
    return this.summaryService.getSummaries();
  }

  @Get(':id')
  getSummary(@Param('id', ParseIntPipe) id: number) {
    return this.summaryService.getSummary(id);
  }

  @Post()
  createSummary(@Body() newSummary: CreateSummaryDto) {
    return this.summaryService.createSummary(newSummary);
  }

  @Patch(':id')
  updateSummary(@Param('id', ParseIntPipe) id: number, @Body() summary: UpdateSummaryDto) {
    return this.summaryService.updateSummary(id, summary);
  }

  @Delete(':id')
  deleteSummary(@Param('id', ParseIntPipe) id: number) {
    return this.summaryService.deleteSummary(id);
  }
}
