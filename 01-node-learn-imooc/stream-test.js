// const fs = require('fs')
// const path = require('path')

// // 两个文件名
// const fileName1 = path.resolve(__dirname, 'data.txt')
// const fileName2 = path.resolve(__dirname, 'data-bak.txt')

// // 读取文件的stream 对象
// const readStream = fs.createReadStream(fileName1)
// // 写入文件的 stream 对象
// const writeStream = fs.createWriteStream(fileName2)

// // 执行拷贝，通过 pipe
// readStream.pipe(writeStream)

// // 读物数据完成，即拷贝完成
// readStream.on('end', function () {
//   console.log('拷贝完成')
// })
