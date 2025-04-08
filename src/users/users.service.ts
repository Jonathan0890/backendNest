import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { createProfileDto } from './dto/create-profile.dto';
import { Profile } from './entities/profile.entity';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Profile) private profileRepository: Repository<Profile> 
  ) {}

  async createUser(user: CreateUserDto) {
    const userFound = await  this.userRepository.findOne({
      where: { username: user.username }
    })
    if (userFound) {
      return new HttpException('User already exists', HttpStatus.CONFLICT);
    }
    const newUser = this.userRepository.create(user);
    return this.userRepository.save(newUser);
  }

  getUsers() {  
    return this.userRepository.find();
  }

  async getUser(id: number) {
    const userFound = await this.userRepository.findOne({
      where: { id,},
    });

    if (!userFound) {
      return new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    return this.userRepository.findOne({
      where: { id }
    });
  }

  async updateUser(id: number, user: UpdateUserDto) {
    const userFound = await this.userRepository.findOne({
      where: { id, },
    })

    if (!userFound){
      return new HttpException('User not found', HttpStatus.NOT_FOUND)
    }
    const updateUser = Object.assign(userFound, user);
    return this.userRepository.save(updateUser);
  }

  async deleteUser(id: number) {
    const result = await this.userRepository.delete({id});

    if (result.affected === 0){
      return new HttpException('User not found', HttpStatus.NOT_FOUND)
    }
    return result;
  }

  //profile
  async createProfile(id: number, profile: createProfileDto) {
    const userFound = await this.userRepository.findOne({
      where: { id, },
    }); 
    if(!userFound){
      return new HttpException('User not found', HttpStatus.NOT_FOUND)
    }
    const newProfile = this.profileRepository.create(profile);
    const savedProfile = await this.profileRepository.save(newProfile);
    userFound.profile = savedProfile;

    return this.userRepository.save(userFound);
  }
}
