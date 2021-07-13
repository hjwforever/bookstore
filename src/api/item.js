import request from '@/utils/request'

// 获取首页信息
// 个性化推荐书籍的数目：int recommendNum
// 首页显示排行榜类别的数量：int cate_top
// 每个类别排行榜有几条数据：int book_top
export function getIndexData(params) {
  return request({
    url: '/item/home',
    params: params
  })
}

// 首页个性化推荐书籍列表
// 推荐条数：recommendNum（默认值5）
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
export function getCategory(params) {
  return request({
    url: '/item/categorys',
    params
  })
}

// 根据分类获取商品列表（包含分类信息或只有商品列表）
// 是否包含头部分类信息：Boolean isContentCategory （默认值false）
// 关键词：String keyword（默认值“”）
// 类别id：long cate_id （默认值-1）
// 最低价格：float lowPrice（默认值0）
// 最高价格：float highPrice（默认值无穷大）
// 页数：int pageNum（默认值1）
// 每页条数：int pageSize（默认值72）
export function search(params) {
  return request.get('/item/search', { params })
}
