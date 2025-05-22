import { CreateBookInput } from './create-book.input';
import { Field, InputType, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateBookInput extends PartialType(CreateBookInput) {}
