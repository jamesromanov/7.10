import * as env from 'dotenv';
env.config();
export const JwtConstraints = {
  secret: process.env.ACCESS_TOKEN_KEY,
};
