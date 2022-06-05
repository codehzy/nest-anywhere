import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as argon2 from 'argon2';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private userService: UserService, private jwt: JwtService) {}

  /**
   * 用户登录
   * @param param0 登录用户的数据 username password
   * @returns
   */
  async login({ username, password }) {
    console.log(username, password);
    const user = await this.userService.findOne(username);
    if (!user.length) {
      return {
        code: 400,
        msg: '用户不存在',
      };
    }
    try {
      if (await argon2.verify(user[0].password, password)) {
        return {
          code: 200,
          msg: '登录成功',
          access_token: await this.signToken(username, password),
        };
      } else {
        return {
          code: 400,
          msg: '密码错误',
        };
      }
    } catch (err) {
      console.log(err);
      throw new Error('登录失败');
    }
  }

  async signToken(username: string, password: string) {
    const payload = {
      username,
      password,
    };
    const secret = process.env.JWT_SECRET;

    const token = await this.jwt.signAsync(payload, {
      expiresIn: '15m',
      secret: secret,
    });

    return {
      access_token: token,
    };
  }
}
