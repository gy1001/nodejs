const Koa = require('./like-koa2')
const app = new Koa()

app.use(async (ctx, next) => {
  console.log('洋葱模型1 执行开始')
  await next()
  const rt = ctx['X-Response-Time']
  console.log(`${ctx.req.method}, ${ctx.req.url} - ${rt}`)
  console.log('洋葱模型1 执行结束')
})

// X-Response-Time
app.use(async (ctx, next) => {
  console.log('洋葱模型2 执行开始')
  const start = Date.now()
  await next()
  const ms = Date.now() - start
  ctx['X-Response-Time'] = `${ms}ms`
  console.log('洋葱模型2 执行结束')
})

// response
app.use(async (ctx) => {
  console.log('洋葱模型3 执行结束不往下执行了')
  ctx.res.end('this is like koa2')
})

app.listen(8080, () => {
  console.log('服务启动了')
})

// const a = async () => {
//   console.log('洋葱模型1开始执行')
//   await b()
//   console.log('洋葱模型1结束执行')
// }

// const b = async () => {
//   console.log('洋葱模型2开始执行')
//   await c()
//   console.log('洋葱模型2结束执行')
// }

// const c = async () => {
//   console.log('洋葱模型3 执行')
// }

// a()
