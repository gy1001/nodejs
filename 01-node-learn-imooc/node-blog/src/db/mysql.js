const mysql = require('mysql2')
const { MYSQL_CONF } = require('../conf/db')

const con = mysql.createConnection(MYSQL_CONF)

con.connect()

// 执行 sql 的函数
function exec(sql) {
  return new Promise((resolve, reject) => {
    con.query(sql, (err, result) => {
      if (err) {
        reject(result)
        return
      }
      resolve(result)
    })
  })
}

module.exports = {
  exec,
}
