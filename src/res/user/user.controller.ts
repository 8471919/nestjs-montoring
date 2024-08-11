import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from './user.service';
import { FindOneUserOutputDto } from 'src/dtos/user/find-user.dto';
import { SignUpBodyDto } from 'src/dtos/user/post-body.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { TestInterceptor } from 'src/middlewares/interceptors/test.interceptor';

@Controller('/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // @를 쓰는 아이가 데코레이터.
  // 아래 함수인 getUserMainPage를 꾸며준다.
  @Get() // GET /user
  async getUserMainPage(): Promise<string> {
    const res = await this.userService.getUserMainPage();

    return res;
  }

  // param의 userId 뒤에 0을 붙이는걸로
  // 1 -> 10. 10 -> 100
  @Get('/:userId')
  async getUserInfoByUserId(
    @Param('userId', ParseIntPipe) userId: number,
  ): Promise<FindOneUserOutputDto> {
    console.log(userId);
    const user = await this.userService.getUserInfo(userId);

    return user;
  }

  // typescript -> javascript
  // javscript가 동작
  // javascript는 타입이 없어요.
  @Get('/info')
  async getUserInfo(
    @Query('name') name: string,
    @Query('age', ParseIntPipe) age: number,
  ): Promise<any> {
    // age는 숫자
    console.log(typeof age);
    console.log(age);

    return {
      name,
      age,
    };
  }

  @Get('/money')
  async deposit(
    @Query('send-money', ParseIntPipe) money: number,
  ): Promise<any> {
    const currentMoney = 1000;

    const total = currentMoney + money;

    return total;
  }

  @Get('/name/:name/age/:age')
  async paramTest(
    @Param('name') name: string,
    @Param('age', ParseIntPipe)
    age: number,
  ): Promise<any> {
    return `지금은 Param을 테스트 중이고, name: ${name}, age: ${age} 입니다.`;
  }

  @Post()
  async bodyTest(@Body() body: any): Promise<any> {
    return `Body Test \
    body.name: ${body.name} \
    body.age: ${body.age}`;
  }

  @ApiOperation({
    summary: '회원가입 API',
    description: '유저가 회원가입을 할 수 있습니다.',
  })
  @ApiResponse({
    status: 200,
    type: Boolean,
  })
  @Post('/sign-up')
  async signUp(@Body() body: SignUpBodyDto): Promise<true> {
    const { email, password, nickname } = body;

    const isCreated = await this.userService.signUp(email, password, nickname);

    return isCreated;
  }
}
