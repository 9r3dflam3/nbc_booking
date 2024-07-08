import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Show } from './shows.entity'; // Show 엔티티 import

@Entity({ name: 'show_schedules' })
export class ShowSchedule {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  showImage: string;

  @Column({ type: 'varchar' })
  showInfo: string;

  @Column({ type: 'varchar' })
  location: string;

  @Column({ type: 'date' })
  showDate: Date;

  @Column({ type: 'smallint' })
  showTime: number; // 공연 시간 (예: 1 => 00시, 2 => 00시 30분 ... 48 => 23시 30분)

  @Column({ type: 'int' })
  seatAmount: number;

  @ManyToOne(() => Show, (show) => show.schedules)
  show: Show;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
