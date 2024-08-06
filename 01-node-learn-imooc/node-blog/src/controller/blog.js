const { exec } = require('../db/mysql')

const getList = (author, keyword) => {
  let sql = 'select * from blogs where 1=1 '
  if (author) {
    sql += `and author='${author}' `
  }
  if (keyword) {
    sql += `and title like '%${keyword}%' `
  }
  sql += `order by createTime desc;`
  // 先返回假数据，保证格式是正确的
  return exec(sql)
}

const getDetail = (id) => {
  return {
    id: 1,
    title: '标题A',
    content: '内容A',
    createTime: 1722268562897,
    author: '张三',
  }
}

const newBlog = (blogData = {}) => {
  // blogData 是一个博客对象，包含 title  content 属性
  return {
    id: 3, // 表示新建博客，插入到数据表里面的数据
  }
}

const updateBlog = (id, blogData = {}) => {
  // id 是要更新博客的 id
  // blogData 是一个博客对象，包含 title content 属性
  return true
}

const deleteBlog = (id) => {
  // Id 就是要删除的id
  return true
}

module.exports = { getList, getDetail, newBlog, updateBlog, deleteBlog }
