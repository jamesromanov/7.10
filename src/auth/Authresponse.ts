import { Field, InputType, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class AuthResponse {
  @Field(() => String, { description: 'Token of the user!' })
  accessToken: string;
}
