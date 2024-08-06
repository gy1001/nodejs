const env = process.env.NODE_ENV // 环境变量

let MYSQL_CONF = {}

if (env == 'dev') {
  MYSQL_CONF = {
    host: 'localhost',
    user: 'root',
    password: 'root@1234',
    port: 3306,
    database: 'vben_book_dev',
  }
}

if (env === 'production') {
  MYSQL_CONF = {
    host: 'localhost',
    user: 'root',
    password: 'root@1234',
    port: 3306,
    database: 'vben_book_dev',
  }
}

module.exports = { MYSQL_CONF }
