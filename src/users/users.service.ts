import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserModel } from './entities/user.mode';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserModel) private userRepo: Repository<UserModel>,
  ) {}
  async create(createUserInput: CreateUserInput) {
    const user = this.userRepo.create(createUserInput);
    return (await this.userRepo.save(user)).toJson();
  }

  async findAll() {
    return await this.userRepo.find({ where: { isDeleted: false } });
  }

  async findOne(id: number) {
    if (id < 1 || isNaN(id)) throw new BadRequestException('Invalid id!');
    const user = await this.userRepo.findOne({
      where: { id, isDeleted: false },
    });
    if (!user) throw new NotFoundException('User not found!');
    return user.toJson();
  }

  async update(id: number, updateUserInput: UpdateUserInput) {
    if (id < 1 || isNaN(id)) throw new BadRequestException('Invalid id!');
    const user = await this.userRepo.findOne({
      where: { id, isDeleted: false },
    });
    if (!user) throw new NotFoundException('User not found!');
    Object.assign(user, updateUserInput);
    return await this.userRepo.save(user);
  }

  async remove(id: number) {
    if (id < 1 || isNaN(id)) throw new BadRequestException('Invalid id!');
    const user = await this.userRepo.findOne({
      where: { id, isDeleted: false },
    });
    if (!user) throw new NotFoundException('User not found!');
    user.isDeleted = true;
    return await this.userRepo.save(user);
  }
  async validateUser(email: string, password: string) {
    const user = await this.userRepo.findOne({
      where: { email, isDeleted: false },
      select: ['id', 'password', 'email', 'name', 'role', 'refreshToken'],
    });
    if (!user) throw new NotFoundException('Email or password is incorrect!');

    const checkingPassword = user.comparePassword(password);

    if (!checkingPassword)
      throw new BadRequestException('Email or password is incorrect!');

    return user;
  }
}
