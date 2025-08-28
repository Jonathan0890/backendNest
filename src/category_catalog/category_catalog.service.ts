import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateCategoryCatalogDto } from './dto/create-category_catalog.dto';
import { UpdateCategoryCatalogDto } from './dto/update-category_catalog.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryCatalog } from './entities/category_catalog.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoryCatalogService {
  constructor(
    @InjectRepository(CategoryCatalog) private categoryCatalogRepository: Repository<CategoryCatalog>,
  ) { }
  async createCategoryCatalog(categoryCatalog: CreateCategoryCatalogDto) {
    const categoryCatalogFound = await this.categoryCatalogRepository.findOne({ where: { name: categoryCatalog.name } });
    if (categoryCatalogFound) {
      throw new HttpException('Category Catalog already exists', HttpStatus.CONFLICT);
    }
    const newCategoryCatalog = this.categoryCatalogRepository.create(categoryCatalog);
    return this.categoryCatalogRepository.save(newCategoryCatalog);
  }

  getCategoryCatalogs() {
    return this.categoryCatalogRepository.find();
  }

  async getCategoryCatalog(id: number) {
    return this.findCategoryOrThrow(id);
  }

  async updateCategoryCatalog(id: number, categoryCatalog: UpdateCategoryCatalogDto) {
    const categoryCatalogFound = await this.categoryCatalogRepository.findOne({ where: { id } });
    if (!categoryCatalogFound) {
      throw new HttpException('Category Catalog not found', HttpStatus.NOT_FOUND);
    }
    const updateCategoryCatalog = Object.assign(categoryCatalogFound, categoryCatalog);
    return this.categoryCatalogRepository.save(updateCategoryCatalog);
  }

  async deleteCategoryCatalog(id: number) {
    const result = await this.categoryCatalogRepository.delete({ id });
    if (result.affected === 0) {
      throw new HttpException('Category Catalog not found', HttpStatus.NOT_FOUND);
    }
    return result;
  }

  private async findCategoryOrThrow(id: number): Promise<CategoryCatalog> {
    const categoryCatalogFound = await this.categoryCatalogRepository.findOne({ where: { id } });
    if (!categoryCatalogFound) {
      throw new HttpException('Category Catalog not found', HttpStatus.NOT_FOUND);
    }
    return categoryCatalogFound;
  }
}
