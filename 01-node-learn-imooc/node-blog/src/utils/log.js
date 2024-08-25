const fs = require('fs')
const path = require('path')

// 生成 writeStream
function createWriteStream(filaName) {
  const fullFileName = path.join(__dirname, '../../logs/', filaName)
  const writeStream = fs.createWriteStream(fullFileName, {
    flags: 'a',
  })

  return writeStream
}

const accessWriteStream = createWriteStream('access.log')

// 写日志
function writeLog(writeStream, log) {
  writeStream.write(log + '\n') // 关键代码
}

function access(log) {
  writeLog(accessWriteStream, log)
}

module.exports = {
  access,
}
