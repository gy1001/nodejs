const env = process.env.NODE_ENV // 环境变量

let MYSQL_CONF = {}
let REDIS_CONF = {}

if (env == 'dev') {
  // mysql
  MYSQL_CONF = {
    host: 'localhost',
    user: 'root',
    password: 'root@1234',
    port: 3306,
    database: 'vben_book_dev',
  }
  // redis
  REDIS_CONF = {
    port: 6379,
    host: '127.0.0.1',
  }
}

if (env === 'production') {
  // mysql
  MYSQL_CONF = {
    host: 'localhost',
    user: 'root',
    password: 'root@1234',
    port: 3306,
    database: 'vben_book_dev',
  }
  // redis
  REDIS_CONF = {
    port: 6379,
    host: '127.0.0.1',
  }
}

module.exports = { MYSQL_CONF, REDIS_CONF }
