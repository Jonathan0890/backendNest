import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { ReportService } from './report.service';
import { CreateReportDto } from './dto/create-report.dto';
import { UpdateReportDto } from './dto/update-report.dto';

@Controller('report')
export class ReportController {
  constructor(private readonly reportService: ReportService) {}

  @Get()
  getReports()//: Promise<Report[]>{
  {
    return this.reportService.getReports();
  }

  @Get(':id')
  getReport(@Param('id', ParseIntPipe) id: number) {
    return this.reportService.getReport(id);
  }

  @Post()
  createReport(@Body() newReport: CreateReportDto) {
    return this.reportService.createReport(newReport);
  }

  @Patch(':id')
  updateReport(@Param('id', ParseIntPipe) id: number, @Body() report: UpdateReportDto) {
    return this.reportService.updateReport(id, report);
  }

  @Delete(':id')
  deleteReport(@Param('id', ParseIntPipe) id: number) {
    return this.reportService.deleteReport(id);
  }
}
