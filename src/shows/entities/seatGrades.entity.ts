import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Seat } from './seats.entity'; // Seat 엔티티 import
import { rank } from '../types/seatGrade.type';

@Entity({ name: 'seat_grades' })
export class SeatGrade {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int' })
  showId: number;

  @Column({ type: 'int' })
  amount: number; // 좌석 등급별 수량

  @Column({ type: 'enum', enum: rank }) // 실제 등급 값으로 변경
  rank: rank;

  @Column({ type: 'int' })
  price: number;

  @OneToMany(() => Seat, (seat) => seat.seatGrade)
  seats: Seat[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
