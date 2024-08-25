const fs = require("fs");
const path = require("path");
const readline = require("readline");

// 文件名
const filename = path.join(__dirname, "../../logs", "access.log");
// 创建 readStream
const readStream = fs.createReadStream(filename);
// 创建 readline 对象
const rl = readline.createInterface({
  input: readStream,
});

let chromeNum = 0;
let sum = 0;
// 逐行读取
rl.on("line", (lineData) => {
  if (!lineData) {
    return;
  }
  sum++;
  const arr = lineData.split(" -- ");
  if (arr[2] && arr[2].indexOf("Chrome") > -1) {
    // 累加 chrome 的数量
    chromeNum++;
  }
});

rl.on("close", () => {
  console.log("chrome 占比：" + chromeNum / sum);
});
