import request from '@/utils/request'

// 添加评论
export function addComment(data) {
  return request({
    url: '/item/comment/add',
    method: 'post',
    data
  })
}
