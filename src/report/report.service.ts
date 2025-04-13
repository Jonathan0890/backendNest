import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateReportDto } from './dto/create-report.dto';
import { UpdateReportDto } from './dto/update-report.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Report } from './entities/report.entity';

@Injectable()
export class ReportService {

  constructor(
    @InjectRepository(Report) private reportRepository: Repository<Report>
  ) {}

  async createReport(report: CreateReportDto) {
    const reportFound = await this.reportRepository.findOne({
      where: {issue: report.issue}
    });

    if (reportFound) {
      throw new HttpException('Report already exists', HttpStatus.CONFLICT);
    }
    const newReport = this.reportRepository.create(report);
    return this.reportRepository.save(newReport);
  }

  getReports() {
    return this.reportRepository.find({
      relations: ['student']
    });
  }

  async getReport(id: number) {
    const reportFound = await this.reportRepository.findOne({
      where: {id},
      relations: ['student']
    })

    if (!reportFound) {
      throw new HttpException('Report not found', HttpStatus.NOT_FOUND);
    }
    return this.reportRepository.findOne({where: {id}});
  }

  async updateReport(id: number, report: UpdateReportDto) {
    const reportFound = await this.reportRepository.findOne({
      where: {id}
    })

    if (!reportFound) {
      throw new HttpException('Report not found', HttpStatus.NOT_FOUND);
    }
    const updateReport = Object.assign(reportFound, report);
    return this.reportRepository.save(updateReport);
  }

  async deleteReport(id: number) {
    const result = await this.reportRepository.delete({id});

    if (result.affected === 0) {
      throw new HttpException('Report not found', HttpStatus.NOT_FOUND);
    }
    return result;
  }
}
