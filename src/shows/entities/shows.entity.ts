import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { category } from '../types/category.type';
import { ShowSchedule } from './showschedules.entity'; // ShowSchedule 엔티티 import

@Entity({ name: 'shows' })
export class Show {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  showName: string;

  @Column({ type: 'varchar' })
  showThumbnail: string;

  @Column({ type: 'varchar' })
  showInfo: string;

  @Column({ type: 'bigint' })
  adminId: number;

  @Column({ type: 'enum', enum: category })
  categories: category;

  @OneToMany(() => ShowSchedule, (schedule) => schedule.show)
  schedules: ShowSchedule[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
