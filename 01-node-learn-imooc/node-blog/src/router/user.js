const handlerUserRouter = (req, res) => {
  const { method, path } = req

  if (method === 'POST') {
    // 新建一篇博客
    if (path === '/api/user/login') {
      const resData = {
        msg: '这是登录接口',
      }
      return resData
    }
  }
}

module.exports = { handlerUserRouter }
