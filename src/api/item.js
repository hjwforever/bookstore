import request from '@/utils/request'

// 获取首页信息
export function getIndexData() {
  return request('/item/home')
}

// 首页个性化推荐书籍列表
// 1. 页数：int pageNum（默认值1）
// 2. 每页条数：int pageSize（默认值10）
export function getRecommend(params) {
  return request({
    url: '/item/recommend',
    params
  })
}

// 获取首页按类别热门排行书籍列表
// 1. 类别编号：long cate_id
// 2. 热度前几名：int top
export function getPopular(params) {
  return request({
    url: '/item/popular',
    params
  })
}

// 获取分类列表
export function getBookInfo(params) {
  return request({
    url: '/item/categorys',
    params
  })
}
