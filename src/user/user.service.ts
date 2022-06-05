import { Injectable } from '@nestjs/common';
import * as Sequelize from 'sequelize'; // 引入 Sequelize 库
import sequelize from 'src/database/sequelize';
import { CreateBody } from './types';
import * as argon2 from 'argon2';

@Injectable()
export class UserService {
  /**
   * 查询单个用户
   * @param username 用户名
   * @returns 用户名整条数据
   */
  async findOne(username: string): Promise<CreateBody[]> {
    const sql = `SELECT * FROM users where username = '${username}'`;

    try {
      const res = await sequelize.query<CreateBody>(sql, {
        type: Sequelize.QueryTypes.SELECT, // 查询方式
        raw: true, // 是否使用数组组装的方式展示结果
        logging: true, // 是否将 SQL 语句打印到控制台，默认为 true
      });
      return res;
    } catch (error) {
      console.log(error);
    }
  }

  /**
   * 查询所有用户
   * @returns 返回数据库所有用户
   */
  async findAll() {
    const sql = `SELECT * FROM users`;

    try {
      const res = await sequelize.query(sql, {
        type: Sequelize.QueryTypes.SELECT,
        raw: true,
      });

      return res;
    } catch (error) {
      console.log(error);
    }
  }

  /**
   * 新增出入用户
   * @param body 创建用户的数据 CreateBody类型
   * @returns 是否插入成功
   */
  async createUser(body: CreateBody) {
    const { username, password, age, email, company } = body;
    const sql = `INSERT INTO users (username,password,age,email,company) VALUES ('${username}','${password}',${age},'${email}','${company}')`;
    const user = await this.findOne(username);
    console.log(user);

    if (user.length) {
      return {
        code: 400,
        msg: `用户${username}已经存在`,
      };
    }
    try {
      await sequelize.query(sql, {
        type: Sequelize.QueryTypes.INSERT,
        raw: true,
      });
      return {
        msg: `用户${username}入库成功`,
      };
    } catch (err) {
      console.log(err);
    }
  }

  /**
   * 注册用户 hash加密密码
   * @param body 注册用户的数据 CreateBody类型
   * @returns 是否注册成功
   */
  async register({ username, password, age, email, company }) {
    try {
      const hashPwd = await argon2.hash(password);
      console.log(`密码hash成功：${hashPwd}`);
      const sql = `INSERT INTO users (username,password,age,email,company) VALUES ('${username}','${hashPwd}',${age},'${email}','${company}')`;
      const user = await this.findOne(username);
      if (user.length) {
        return {
          code: 400,
          msg: `用户${username}已经存在`,
        };
      }
      try {
        await sequelize.query(sql, {
          type: Sequelize.QueryTypes.INSERT,
          raw: true,
        });
        return {
          msg: `用户${username}注册成功`,
        };
      } catch (error) {
        throw new Error('注册失败');
      }
    } catch (err) {
      console.log(err);
      throw new Error('密码hash失败');
    }
  }
}
