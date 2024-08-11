const { loginCheck } = require('../controller/user')
const { SuccessModel, ErrorModel } = require('../model/resModel')

const getCookieExpires = () => {
  const d = new Date()
  d.setTime(d.getTime() + 24 * 60 * 60 * 1000)
  return d.toGMTString()
}

const handlerUserRouter = (req, res) => {
  const { method, path } = req

  if (method === 'POST') {
    // 新建一篇博客
    if (path === '/api/user/login') {
      const { username, password } = req.body
      const result = loginCheck(username, password)
      return result.then((data) => {
        if (data) {
          // httpOnly表示只能服务器修改使用，客户端不能用
          // res.setHeader(
          //   'Set-Cookie',
          //   `username=${
          //     data.username
          //   };path=/;httpOnly;expires=${getCookieExpires()}`,
          // )

          req.session.username = data.username
          req.session.realname = data.realname
          return new SuccessModel(data)
        }
        return new ErrorModel('账号或者密码错误')
      })
    }
  }

  if (method === 'GET' && path === '/api/user/login-test') {
    if (req.session.username) {
      return Promise.resolve(
        new SuccessModel({
          username: req.session.username,
        }),
      )
    }
    return Promise.resolve(new ErrorModel('尚未登录'))
  }
}

module.exports = { handlerUserRouter }
