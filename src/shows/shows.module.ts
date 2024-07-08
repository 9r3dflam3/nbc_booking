import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Show } from './entities/shows.entity';
import { ShowSchedule } from './entities/showschedules.entity';
import { Seat } from './entities/seats.entity';
import { SeatGrade } from './entities/seatGrades.entity';
import { ShowsService } from './shows.service';
import { ShowsController } from './shows.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Show, ShowSchedule, Seat, SeatGrade])],
  providers: [ShowsService],
  controllers: [ShowsController],
})
export class ShowsModule {}
