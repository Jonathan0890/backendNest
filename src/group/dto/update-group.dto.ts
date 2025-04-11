import { PartialType } from '@nestjs/mapped-types';
import { CreateGruopDto } from './create-group.dto';

export class UpdateGruopDto extends PartialType(CreateGruopDto) {}
