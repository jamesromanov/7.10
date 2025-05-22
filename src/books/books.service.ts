import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateBookInput } from './dto/create-book.input';
import { UpdateBookInput } from './dto/update-book.input';
import { InjectRepository } from '@nestjs/typeorm';
import { BookModel } from './entities/book,model';
import { In, Repository } from 'typeorm';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(BookModel) private bookRepo: Repository<BookModel>,
  ) {}
  async create(createBookInput: CreateBookInput) {
    const book = this.bookRepo.create(createBookInput);
    return await this.bookRepo.save(book);
  }

  async findAll() {
    return await this.bookRepo.find({ where: { isDeleted: false } });
  }
  async find(where: any) {
    return await this.bookRepo.find({ where: { id: In(where) } });
  }

  async findOne(id: number) {
    if (id < 1 || isNaN(id)) throw new BadRequestException('Invalid id!');
    const book = await this.bookRepo.findOne({
      where: { id, isDeleted: false },
    });
    if (!book) throw new NotFoundException('Book not found :(');
    return book;
  }

  async update(id: number, updateBookInput: UpdateBookInput) {
    if (id < 1 || isNaN(id)) throw new BadRequestException('Invalid id!');
    const book = await this.bookRepo.findOne({
      where: { id, isDeleted: false },
    });
    if (!book) throw new NotFoundException('Book not found :(');
    Object.assign(book, updateBookInput);
    return await this.bookRepo.save(book);
  }

  async remove(id: number) {
    if (id < 1 || isNaN(id)) throw new BadRequestException('Invalid id!');
    const book = await this.bookRepo.findOne({
      where: { id, isDeleted: false },
    });
    if (!book) throw new NotFoundException('Book not found :(');
    book.isDeleted = true;
    return await this.bookRepo.save(book);
  }
}
