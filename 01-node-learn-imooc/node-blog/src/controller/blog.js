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
  const sql = `select * from blogs where id = '${id}'`
  return exec(sql).then((rows) => {
    return rows[0]
  })
}

const newBlog = (blogData = {}) => {
  // blogData 是一个博客对象，包含 title  content 属性
  const title = blogData.title
  const content = blogData.content
  const author = blogData.author
  const createTime = Date.now()
  const sql = `
    insert into blogs (title, content, author, createtime) values ("${title}", "${content}", "${author}","${createTime}")
  `
  return exec(sql).then((res) => {
    return res.insertId
  })
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
