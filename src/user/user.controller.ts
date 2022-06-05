import { Body, Controller, Get, Param, Post, Query, Req } from '@nestjs/common';
import { CreateBody, loginPayload } from './types';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('findOne')
  async findOne(@Body() body) {
    const { username } = body;

    return await this.userService.findOne(username);
  }

  @Get('findAll')
  async findAll() {
    return await this.userService.findAll();
  }

  @Post('createUser')
  async createUser(@Body() body: CreateBody) {
    console.log(body);

    return await this.userService.createUser(body);
  }

  @Post('register')
  async register(@Body() body: CreateBody) {
    console.log(body);

    return await this.userService.register(body);
  }
}
