import request from '@/utils/request'

// 添加评论
// 书籍编号: long book_id
// 评论内容: String content
export function addComment(params) {
  return request({
    url: `/item/comment/add?book_id=${params.book_id}&content=${params.content}`,
    method: 'post'
  })
}

// 回复评论
// 回复的评论id: long comment_id
// 回复内容: String content
export function replayComment(params) {
  return request.post(`/item/comment/reply?comment_id=${params.comment_id}&content=${params.content}`)
}

// 获取某本书所有的评论及回复
// 书籍id: book_id
export function getCommentList(params) {
  return request.get('/item/comment/list', { params })
}
