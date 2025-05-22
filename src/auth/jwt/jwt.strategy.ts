import { PassportStrategy } from '@nestjs/passport';
import { UsersService } from 'src/users/users.service';
import { JwtConstraints } from './jwt.constraints';
import { Strategy, ExtractJwt } from 'passport-jwt';

export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private userService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: JwtConstraints.secret,
    });
  }

  async validate(payload: any) {
    return { id: payload.id, role: payload.role };
  }
}
