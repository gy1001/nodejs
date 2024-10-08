const { handlerBlogRouter } = require('./src/router/blog')
const { handlerUserRouter } = require('./src/router/user')
const qs = require('querystring')
const { access } = require('./src/utils/log')

// session 数据
const SESSION_DATA = {}
const getCookieExpires = () => {
  const d = new Date()
  d.setTime(d.getTime() + 24 * 60 * 60 * 1000)
  return d.toGMTString()
}

// 用于处理post data
const getPostData = (req) => {
  const promise = new Promise((resolve, reject) => {
    if (req.method !== 'POST') {
      resolve({})
    }
    if (req.headers['content-type'] === 'application/json') {
      resolve({})
      return
    }
    let postData = ''
    req.on('data', (chunk) => {
      postData += chunk.toString()
    })
    req.on('end', () => {
      if (!postData) {
        resolve({})
        return
      }
      resolve(JSON.parse(postData))
    })
  })

  return promise
}

const serverHandle = (req, res) => {
  // 记录 access log
  access(`${req.method}, -- ${req.url} -- ${req.headers['user-agent']}`)
  req.path = req.url.split('?')[0]
  // 设置返回格式
  res.setHeader('content-type', 'application/json')
  // 解析query
  req.query = qs.parse(req.url.split('?')[1])
  // 解析 cookie
  const cookieStr = req.headers.cookies || ''
  req.cookie = {}
  cookieStr.split(';').forEach((item) => {
    if (!item) {
      return
    }
    const arr = item.split('=')
    const key = arr[0].trim()
    const value = arr[1].trim()
    req.cookie[key] = value
  })

  const userId = req.cookie.userId
  // 解析 session
  let needSetCookie = false
  if (userId) {
    if (!SESSION_DATA[userId]) {
      SESSION_DATA[userId] = {}
    }
  } else {
    needSetCookie = true
    userId = `${Date.now()}${Math.random()}`
    SESSION_DATA[userId] = {}
  }
  req.session = SESSION_DATA[userId]

  getPostData(req).then((resData) => {
    req.body = resData
    // 处理blog 路由
    const blogResult = handlerBlogRouter(req, res)
    if (blogResult) {
      blogResult.then((blogData) => {
        if (needSetCookie) {
          res.setHeader(
            'Set-Cookie',
            `userId=${userId};path=/;httpOnly;expires=${getCookieExpires()}`,
          )
        }
        res.end(JSON.stringify(blogData))
      })
      return
    }

    // 处理user 路由
    const userResult = handlerUserRouter(req, res)
    if (userResult) {
      userResult.then((userData) => {
        if (needSetCookie) {
          res.setHeader(
            'Set-Cookie',
            `userId=${userId};path=/;httpOnly;expires=${getCookieExpires()}`,
          )
        }
        res.end(JSON.stringify(userData))
      })
      return
    }

    // 未命中路由，返回 404
    res.writeHead(404, { 'content-type': 'text/plain' })
    res.write('404 Not Found \n')
    res.end()
  })
}

module.exports = serverHandle
