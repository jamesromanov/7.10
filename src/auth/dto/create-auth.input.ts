import { InputType, Int, Field } from '@nestjs/graphql';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
} from 'class-validator';
import { UserRole } from 'src/users/user.role';

@InputType()
export class CreateAuthInput {
  @IsString()
  @IsNotEmpty()
  @Field(() => String, { description: 'Name of the string' })
  name: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  @Field(() => String, { description: 'Email of the user' })
  email: string;

  @IsString()
  @IsNotEmpty()
  @IsStrongPassword()
  @Field(() => String, { description: 'Password of the user' })
  password: string;

  @IsEnum(UserRole)
  @Field(() => UserRole, {
    description: 'Role of the user',
    defaultValue: UserRole.USER,
  })
  role: UserRole;

  @Field(() => String, {
    description: 'refreshToken of the user',
    nullable: true,
  })
  refreshToken?: string;

  @Field(() => Boolean, {
    description: 'Status of the user',
    defaultValue: false,
    nullable: true,
  })
  isDeleted?: boolean = false;
}
