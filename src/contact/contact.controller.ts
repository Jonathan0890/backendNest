import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { ContactService } from './contact.service';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';

@Controller('contact')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @Post()
  createContact(@Body() createContactDto: CreateContactDto) {
    return this.contactService.createContact(createContactDto);
  }

  @Get()
  getContasts() {
    return this.contactService.getContasts();
  }

  @Get(':id')
  getContast(@Param('id', ParseIntPipe) id: number) {
    return this.contactService.getContast(id);
  }

  @Patch(':id')
  updateContact(@Param('id', ParseIntPipe) id: number, @Body() newContact: UpdateContactDto) {
    return this.contactService.updateContact(+id, newContact);
  }

  @Delete(':id')
  deleteContact(@Param('id', ParseIntPipe) id: number) {
    return this.contactService.deleteContact(id);
  }
}
