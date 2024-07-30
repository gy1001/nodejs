const getList = (author, keyword) => {
  // 先返回假数据，保证格式是正确的
  return [
    {
      id: 1,
      title: '标题A',
      content: '内容A',
      createTime: 1722268562897,
      author: '张三',
    },
    {
      id: 2,
      title: '标题B',
      content: '内容B',
      createTime: 1722268591545,
      author: '李四',
    },
  ]
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

module.exports = { getList, getDetail }
