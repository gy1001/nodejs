const redis = require('redis')

async function start() {
  // 创建客户端
  const redisClient = redis.createClient({
    socket: {
      port: 6379,
      host: '127.0.0.1',
    },
  })
  redisClient.on('error', (err) => {
    console.error(err)
  })
  await redisClient.connect()

  await redisClient.set('myname', 'zhangsan')

  const value = await redisClient.get('myname')
  console.log(value)

  await redisClient.quit()
}

start()
