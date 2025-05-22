import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class LoginAuthDto {
  @Field(() => String, { description: 'Email of the user!' })
  @IsEmail()
  @IsString()
  @IsNotEmpty()
  email: string;

  @Field(() => String, { description: 'Password of the user!' })
  @IsString()
  @IsNotEmpty()
  password: string;
}
