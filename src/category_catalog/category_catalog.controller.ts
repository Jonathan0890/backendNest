import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { CategoryCatalogService } from './category_catalog.service';
import { CreateCategoryCatalogDto } from './dto/create-category_catalog.dto';
import { UpdateCategoryCatalogDto } from './dto/update-category_catalog.dto';

@Controller('category-catalog')
export class CategoryCatalogController {
  constructor(private readonly categoryCatalogService: CategoryCatalogService) {}

  @Post()
  create(@Body() newCategoryCatalog: CreateCategoryCatalogDto) {
    return this.categoryCatalogService.createCategoryCatalog(newCategoryCatalog);
  }

  @Get()
  getCategoryCatalogs() {
    return this.categoryCatalogService.getCategoryCatalogs();
  }

  @Get(':id')
  getCategoryCatalog(@Param('id', ParseIntPipe) id: number) {
    return this.categoryCatalogService.getCategoryCatalog(id);
  }

  @Patch(':id')
  updateCategoryCatalog(@Param('id', ParseIntPipe) id: number, @Body() categoryCatalog: UpdateCategoryCatalogDto) {
    return this.categoryCatalogService.updateCategoryCatalog(id,categoryCatalog);
  }

  @Delete(':id')
  deleteCategoryCatalog(@Param('id', ParseIntPipe) id: number) {
    return this.categoryCatalogService.deleteCategoryCatalog(id);
  }
}
