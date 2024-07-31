const { loginCheck } = require('../controller/user')
const { SuccessModel, ErrorModel } = require('../model/resModel')

const handlerUserRouter = (req, res) => {
  const { method, path } = req

  if (method === 'POST') {
    // 新建一篇博客
    if (path === '/api/user/login') {
      const { username, password } = req.body
      const data = loginCheck(username, password)
      if (data) {
        return new SuccessModel(data)
      }
      return new ErrorModel('账号或者密码错误')
    }
  }
}

module.exports = { handlerUserRouter }
