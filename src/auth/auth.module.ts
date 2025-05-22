import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { UsersModule } from 'src/users/users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt/jwt.strategy';

@Module({
  imports: [forwardRef(() => UsersModule), PassportModule, UsersModule],
  providers: [AuthResolver, AuthService, JwtStrategy],
})
export class AuthModule {}
