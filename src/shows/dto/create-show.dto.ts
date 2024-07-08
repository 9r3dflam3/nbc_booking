import {
  IsNotEmpty,
  IsString,
  IsEnum,
  IsNumber,
  IsDate,
  IsArray,
} from 'class-validator';
import { category } from '../types/category.type';
import { GradePrice } from '../types/gradePrice.type';
import { PastDate } from '../validators/pastDate.decorator';
import { Type } from 'class-transformer';
import { Seat } from '../entities/seats.entity';

export class CreateShowDto {
  @IsNotEmpty({ message: '공연 제목을 입력해주세요.' })
  @IsString()
  showName: string;

  @IsNotEmpty({ message: '공연 이미지를 등록해주세요.' })
  @IsString()
  showThumbnail: string;

  @IsNotEmpty({ message: '공연 설명을 입력해주세요.' })
  @IsString()
  showInfo: string;

  @IsNotEmpty({ message: '공연 카테고리를 선택해 주세요.' })
  @IsEnum(category, { message: '유효하지 않은 카테고리 입니다.' })
  categories: category;

  @IsNumber()
  @IsNotEmpty({ message: '총 공연 시간을 입력해 주세요.' })
  runningTime: number;

  @IsString()
  @IsNotEmpty({ message: '공연 장소를 입력해 주세요.' })
  location: string;

  @IsString()
  @IsNotEmpty({ message: '공연 이미지를 등록해 주세요.' })
  showImage: string;

  @IsNotEmpty({ message: '공연 예매 시작 시간을 입력해 주세요.' })
  @IsDate({ message: '날짜 입력 형식이 올바르지 않습니다.' })
  @Type(() => Date)
  bookingStartAt: Date;

  @IsNotEmpty({ message: '공연 시간을 입력해 주세요.' })
  @IsArray({ message: '공연 시간은 배열로 입력해 주세요.' })
  @IsDate({ each: true, message: '공연 시간 입력 형식이 잘못되었습니다.' })
  @Type(() => Date)
  @PastDate({
    message: '등록할 공연 시간에 이미 지난 시간이 포함되어 있습니다.',
  })
  showDate: Date[];

  @IsNotEmpty({ message: '좌석 등급 별 가격을 입력해 주세요.' })
  gradePrice: GradePrice[];

  @IsNotEmpty({ message: '좌석 정보를 입력해 주세요.' })
  seatNo: string[];
}
