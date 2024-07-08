import {
  Column,
  Entity,
  Index,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Role } from '../types/userRole.type';
import { User } from '../entities/user.entity';

@Index('email', ['email'], { unique: true })
@Entity({ name: 'userinfos' })
export class UserInfo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', unique: true, nullable: false })
  email: string;

  @Column({ type: 'varchar', select: false, nullable: false })
  password: string;

  @Column({ type: 'enum', enum: Role, default: Role.Customer })
  role: Role;

  @Column({ type: 'varchar', nullable: false })
  nickname: string;

  @Column({ type: 'varchar', nullable: true })
  profile: string; // 프로필 이미지 URL

  @Column({
    type: 'number',
    nullable: false,
    default: 1000000,
  })
  walletPoint: number;

  @OneToOne(() => User, (user) => user.userInfo)
  user: User;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
