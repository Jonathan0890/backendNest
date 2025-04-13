import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Contact } from './entities/contact.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ContactService {

  constructor(
    @InjectRepository(Contact) private contactRepository: Repository<Contact>,
  ) {}

  async createContact(contact: CreateContactDto) {
    const contactFound = await this.contactRepository.findOne({
      where: {message: contact.message,
        sender: {id: contact.senderId},
        receiver: {id: contact.receiverId},
      },
      relations: ['sender', 'receiver'],
    });

    if (contactFound) {
      throw new HttpException('Contact already exists', HttpStatus.CONFLICT);
    }
    const newContact = this.contactRepository.create(contact);
    return this.contactRepository.save(newContact);
  }

  getContasts() {
    return this.contactRepository.find({
      relations: ['sender', 'receiver'],
    });
  }

  async getContast(id: number) {
    const contactFound = await this.contactRepository.findOne(
      {where: {id},
      relations: ['sender', 'receiver'],
    });
    if (!contactFound) {
      throw new HttpException('Contact not found', HttpStatus.NOT_FOUND);
    }
    return this.contactRepository.findOne({where: {id}});
  }

  async updateContact(id: number, contact: UpdateContactDto) {
    const contactFound = await this.contactRepository.findOne({where: {id}});
    if (!contactFound) {
      throw new HttpException('Contact not found', HttpStatus.NOT_FOUND);
    }
    const updatedContact = Object.assign(contactFound, contact);
    return this.contactRepository.save(updatedContact);
  }

  async deleteContact(id: number) {
    const result = await this.contactRepository.delete({id});

    if (result.affected === 0){
      throw new HttpException('Contact not found', HttpStatus.NOT_FOUND)
    }
    return result;
  }
}
