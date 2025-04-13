import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { GroupService } from './group.service';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';

@Controller('gruop')
export class GruopController {
  constructor(private readonly gruopService: GroupService) { }

  @Get()
  getGroups()//: Promise<Gruop[]>
  {
    return this.gruopService.getGroups();
  }

  @Get(':id')
  getGroup(@Param('id', ParseIntPipe) id: number) {
    return this.gruopService.getGroup(id);
  }

  @Post()
  create(@Body() newGroup: CreateGroupDto) {
    return this.gruopService.createGroup(newGroup);
  }

  @Patch(':id')
  updateGroup(@Param('id', ParseIntPipe) id: number, @Body() group: UpdateGroupDto) {
    return this.gruopService.updateGroup(id, group);
  }

  @Delete(':id')
  deleteGroup(@Param('id', ParseIntPipe) id: number) {
    return this.gruopService.deleteGroup(id);
  }
}
