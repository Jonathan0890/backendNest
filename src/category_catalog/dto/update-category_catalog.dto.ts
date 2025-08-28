import { PartialType } from '@nestjs/mapped-types';
import { CreateCategoryCatalogDto } from './create-category_catalog.dto';

export class UpdateCategoryCatalogDto extends PartialType(CreateCategoryCatalogDto) {}
