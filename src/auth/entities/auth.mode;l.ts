import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { UserRole } from 'src/users/user.role';

@Entity()
export class AuthModel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false, unique: true })
  email: string;

  @Column({ nullable: false, select: false })
  password: string;

  @Column()
  role: UserRole;

  @Column({ nullable: true, select: false })
  refreshToken: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'boolean', default: false })
  isDeleted: boolean = false;
  toJson() {
    const { password, refreshToken, ...otherData } = this;
    return otherData;
  }

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    if (this.password && !this.password.startsWith('$2b$')) {
      const salt = 12;
      this.password = await bcrypt.hash(this.password, salt);
    }
  }

  async comparePassword(password: string) {
    return await bcrypt.compare(password, this.password);
  }
}
