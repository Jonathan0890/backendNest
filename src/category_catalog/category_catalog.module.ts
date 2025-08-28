import { Module } from '@nestjs/common';
import { CategoryCatalogService } from './category_catalog.service';
import { CategoryCatalogController } from './category_catalog.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryCatalog } from './entities/category_catalog.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([CategoryCatalog])
  ],
  controllers: [CategoryCatalogController],
  providers: [CategoryCatalogService],
  exports: [CategoryCatalogService],
})
export class CategoryCatalogModule {}
