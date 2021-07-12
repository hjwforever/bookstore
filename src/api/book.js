import request from '@/utils/request'

// 根据分类获取商品列表（包含分类信息或只有商品列表)
// 1. 是否包含头部分类信息：Boolean isContentCategory （默认值false）
// 2. 关键词：String keyword（默认值“”）
// 3. 类别id：long cate_id （默认值-1）
// 4. 最低价格：float lowPrice（默认值0）
// 5. 最高价格：float highPrice（默认值无穷大）
// 6. 页数：int pageNum（默认值1）
// 7. 每页条数：int pageSize（默认值72）
export function getSearch(params) {
  return request({
    url: '/item/search',
    params
  })
}

// 获取商品详情
// 路径参数书籍编号：book_id
export function getBookInfo(params) {
  return request({
    url: '/item/detail',
    params
  })
}
