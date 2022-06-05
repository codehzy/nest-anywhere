// 生产环境数据库
const productConfig = {
  mysql: {
    port: '3306',
    host: 'localhost',
    user: 'root',
    password: 'HzY1314..',
    database: 'nest',
    connectionLimit: 10,
  },
};

// 开发环境数据库
const developmentConfig = {
  mysql: {
    port: '3306',
    host: 'localhost',
    user: 'root',
    password: 'HzY1314..',
    database: 'nest',
    connectionLimit: 10,
  },
};

const config = process.env.NODE_ENV ? productConfig : developmentConfig;

export default config;
