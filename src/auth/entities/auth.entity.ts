import { ObjectType, Field, ID } from '@nestjs/graphql';
import { UserRole } from 'src/users/user.role';

@ObjectType()
export class Auth {
  @Field(() => ID, { description: 'Id of the user' })
  id: number;
  @Field(() => String, { description: 'Name of the user!' })
  name: string;
  @Field(() => String, { description: 'Email of the user' })
  email: string;
  @Field(() => String, { description: 'Password of the user!' })
  password: string;
  @Field(() => UserRole, {
    defaultValue: UserRole.USER,
    description: 'Role of the user',
  })
  role: UserRole;
  @Field(() => Date, { description: 'Time of the user' })
  createdAt: Date;
  @Field(() => Boolean, {
    description: 'Status of the user',
    defaultValue: false,
  })
  isDeleted: boolean = false;
}
