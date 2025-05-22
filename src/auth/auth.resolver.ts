import { Resolver, Mutation, Args, Context } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { Auth } from './entities/auth.entity';
import { CreateAuthInput } from './dto/create-auth.input';
import { LoginAuthDto } from './dto/login-auth.dto';
import { Response } from 'express';
import { AuthResponse } from './Authresponse';

@Resolver(() => Auth)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => Auth)
  register(@Args('createAuthInput') createAuthInput: CreateAuthInput) {
    return this.authService.create(createAuthInput);
  }
  @Mutation(() => AuthResponse)
  login(
    @Args('loginAuthDto') loginAuthDto: LoginAuthDto,
    @Context() { res }: { res: Response },
  ) {
    return this.authService.login(loginAuthDto, res);
  }
}
