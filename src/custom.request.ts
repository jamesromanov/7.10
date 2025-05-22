import { UserModel } from './users/entities/user.mode';

declare global {
  namespace Express {
    interface Request {
      user?: UserModel;
    }
  }
}
