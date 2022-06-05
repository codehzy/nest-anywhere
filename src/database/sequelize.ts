import { Sequelize } from 'sequelize-typescript';
import db from '../../config/db';

const sequelize = new Sequelize(
  db.mysql.database,
  db.mysql.user,
  db.mysql.password,
  {
    host: db.mysql.host,
    dialect: 'mysql',
    timezone: '+08:00', // 东八时区
  },
);

// 测试数据库连接
sequelize
  .authenticate()
  .then(() => {
    console.log('数据库连接成功');
  })
  .catch((err) => {
    console.log('数据库连接失败');
    throw err;
  });

export default sequelize;
