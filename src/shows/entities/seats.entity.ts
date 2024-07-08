import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { SeatGrade } from './seatGrades.entity'; // SeatGrade 엔티티 import

@Entity({ name: 'seats' })
export class Seat {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'enum', enum: ['Y', 'N'] }) // 예약 가능 여부 ('Y': 예약 가능, 'N': 예약 불가)
  status: 'Y' | 'N';

  @Column({ type: 'varchar' })
  seatNo: string; // 좌석 번호 (예: A1, B2)

  @ManyToOne(() => SeatGrade, (seatGrade) => seatGrade.seats)
  seatGrade: SeatGrade;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
