import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { GruopService } from './group.service';
import { CreateGruopDto } from './dto/create-group.dto';
import { UpdateGruopDto } from './dto/update-group.dto';

@Controller('gruop')
export class GruopController {
  constructor(private readonly gruopService: GruopService) {}

  @Post()
  create(@Body() createGruopDto: CreateGruopDto) {
    return this.gruopService.create(createGruopDto);
  }

  @Get()
  findAll() {
    return this.gruopService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.gruopService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateGruopDto: UpdateGruopDto) {
    return this.gruopService.update(+id, updateGruopDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.gruopService.remove(+id);
  }
}
