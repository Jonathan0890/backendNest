import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Role } from './entities/role.entity';

@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Get()
  getRoles(): Promise<Role[]> {
    return this.rolesService.getRoles();
  }

  @Get(':id')
  getRole(@Param('id', ParseIntPipe) id: number) {
    return this.rolesService.getRole(id);
  }
  @Post()
  createRol(@Body() newRole: CreateRoleDto) {
    return this.rolesService.createRol(newRole);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() role: UpdateRoleDto) {
    return this.rolesService.updateRol(id, role);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.rolesService.deleteRol(id);
  }
}
