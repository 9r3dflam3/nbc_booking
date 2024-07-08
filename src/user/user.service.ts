import { compare, hash } from 'bcrypt';
import _ from 'lodash';
import { Repository } from 'typeorm';
import { DataSource } from 'typeorm';

import {
  BadRequestException,
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';

import { User } from './entities/user.entity';
import { UserInfo } from './entities/userinfo.entity';
import { userInfo } from 'os';

@Injectable()
export class UserService {
  constructor(
    private dataSource: DataSource,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(UserInfo)
    private userInfoRepository: Repository<UserInfo>, // UserInfo 레포지토리 추가
    private readonly jwtService: JwtService,
  ) {}

  //회원가입 api
  async register(email: string, password: string) {
    // 비밀번호 검증 로직 추가
    const passwordRegex = /^(?=.*\d)(?=.*\W)[A-Za-z\d@$!%*?&]{8,}$/;

    if (!passwordRegex.test(password)) {
      if (password.length < 8) {
        throw new BadRequestException('비밀번호는 8자 이상이어야 합니다.');
      } else if (!/\d/.test(password)) {
        throw new BadRequestException('비밀번호에 숫자가 포함되어야 합니다.');
      } else {
        throw new BadRequestException(
          '비밀번호에 특수 문자가 포함되어야 합니다.',
        );
      }
    }
    const hashedPassword = await hash(password, 10);
    const user = this.userRepository.create({
      userInfo: { email, password: hashedPassword },
    }); // User 엔티티와 UserInfo 엔티티를 한번에 생성
    return await this.userRepository.save(user);
  }

  //로그인 로직
  async login(email: string, password: string) {
    const userRepository = this.dataSource.getRepository(User);
    const user = await userRepository
      .createQueryBuilder('user') // user 테이블에 대한 쿼리 빌더 생성
      .leftJoinAndSelect('user.userInfo', 'userInfo') // userInfo 테이블과 조인
      .where('userInfo.email = :email', { email }) // 조인된 userInfo 테이블의 email 컬럼으로 검색
      .getOne();
    if (!user || !(await compare(password, user.userInfo.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { email, sub: user.id, role: user.userInfo.role }; // JWT payload에 role 추가
    return {
      access_token: this.jwtService.sign(payload, { expiresIn: '1h' }), // 토큰 만료 시간 설정
    };
  }

  //유저 포인트 차감
  async deductWalletPoint(userId: number, price: number, queryRunner) {
    const userInfo = await this.userInfoRepository.findOne({
      where: { user: { id: userId } },
      relations: ['user'],
    });

    if (userInfo.walletPoint < price) {
      throw new BadRequestException('포인트 잔액이 모자랍니다.');
    }

    userInfo.walletPoint -= price;

    await queryRunner.manager.save(userInfo);
  }

  //유저 포인트 환불
  async refundWalletPoint(userId: number, price: number, queryRunner) {
    const userInfo = await this.userInfoRepository.findOne({
      where: { user: { id: userId } },
      relations: ['user'],
    });

    userInfo.walletPoint += price;

    await queryRunner.manager.save(userInfo);
  }
}
