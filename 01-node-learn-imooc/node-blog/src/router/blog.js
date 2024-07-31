const {
  getList,
  getDetail,
  newBlog,
  updateBlog,
  deleteBlog,
} = require('../controller/blog')
const { SuccessModel, ErrorModel } = require('../model/resModel')

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
      const blogData = req.body
      return new SuccessModel(newBlog(blogData))
    }

    // 更新一篇博客
    if (path === '/api/blog/update') {
      const data = updateBlog(req.id, req.body)
      if (data) {
        return new SuccessModel(data)
      } else {
        return new ErrorModel('更新博客失败')
      }
    }

    // 删除一篇博客
    if (path === '/api/blog/del') {
      const data = deleteBlog(req.id)
      if (data) {
        return new SuccessModel(data)
      } else {
        return new ErrorModel('删除博客失败')
      }
    }
  }
}

module.exports = { handlerBlogRouter }
