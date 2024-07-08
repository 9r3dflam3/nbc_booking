import {
  Entity,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserInfo } from './userinfo.entity';

//user 엔티티에서는 아이디와 유저인포 접근, 그리고 생성시간만 관리
@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => UserInfo, (userInfo) => userInfo.user)
  @JoinColumn()
  userInfo: UserInfo;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
