const { getList, getDetail } = require('../controller/blog')
const { SuccessModel } = require('../model/resModel')

const handlerBlogRouter = (req, res) => {
  const { method, path } = req

  if (method === 'GET') {
    // 获取博客列表
    if (path === '/api/blog/list') {
      const { author = '', keyword = '' } = req.query
      const listData = getList(author, keyword)
      return new SuccessModel(listData)
    }

    // 获取博客详情
    if (path === '/api/blog/detail') {
      const detailData = getDetail(req.query.id)
      return new SuccessModel(detailData)
    }
  }

  if (method === 'POST') {
    // 新建一篇博客
    if (path === '/api/blog/new') {
      const resData = {
        msg: '这里是新建一篇博客的接口',
      }
      return resData
    }

    // 更新一篇博客
    if (path === '/api/blog/update') {
      const resData = {
        msg: '这里是更新一篇博客的接口',
      }
      return resData
    }

    // 删除一篇博客
    if (path === '/api/blog/del') {
      const resData = {
        msg: '这里是删除一篇博客的接口',
      }
      return resData
    }
  }
}

module.exports = { handlerBlogRouter }
