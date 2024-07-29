const { handlerBlogRouter } = require('./src/router/blog')
const { handlerUserRouter } = require('./src/router/user')

const serverHandle = (req, res) => {
  req.path = req.url.split('?')[0]
  // 设置返回格式
  res.setHeader('content-type', 'application/json')

  // 处理blog 路由
  const blogData = handlerBlogRouter(req, res)
  if (blogData) {
    res.end(JSON.stringify(blogData))
    return
  }

  // 处理user 路由
  const userData = handlerUserRouter(req, res)
  if (userData) {
    res.end(JSON.stringify(userData))
    return
  }

  // 未命中路由，返回 404
  res.writeHead(404, { 'content-type': 'text/plain' })
  res.write('404 Not Found \n')
  res.end()
}

module.exports = serverHandle
