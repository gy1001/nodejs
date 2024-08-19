const redis = require('redis')
const { REDIS_CONF } = require('../conf/db')
async function start() {
  // 创建客户端
  const redisClient = redis.createClient({
    socket: {
      port: REDIS_CONF.port,
      host: REDIS_CONF.host,
    },
  })
  redisClient.on('error', (err) => {
    console.error(err)
  })
  await redisClient.connect()

  // await redisClient.set('myname', 'zhangsan')

  // const value = await redisClient.get('myname')
  // console.log(value)

  // await redisClient.quit()
}

start()

async function set(key, value) {
  if (typeof value === 'object') {
    value = JSON.stringify(value)
  }
  await redisClient.set(key, value)
}

function get(key) {
  return redisClient.get(key).then((value) => {
    try {
      return JSON.parse(value)
    } catch (e) {
      return value
    }
  })
}

module.exports = {
  get,
  set,
}
