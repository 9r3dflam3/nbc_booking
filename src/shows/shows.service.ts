import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Show } from './entities/shows.entity';
import { CreateShowDto } from './dto/create-show.dto';

@Injectable()
export class ShowsService {
  constructor(
    @InjectRepository(Show)
    private showsRepository: Repository<Show>,
  ) {}

  create(createShowDto: CreateShowDto) {
    const show = this.showsRepository.create(createShowDto);
    return this.showsRepository.save(show);
  }
}
