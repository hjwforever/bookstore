import request from '@/utils/request'

// 获取购物车商品列表
export function getCart(params) {
  return request({
    url: '/user/cart/itemlist',
    params
  })
}

// 添加商品到购物车
// 1.	书籍编号：long book_id
// 2.	数量：int amount
export function addToCart(data) {
  return request({
    url: '/user/cart/additem',
    method: 'POST',
    data
  })
}

// 在购物车中调整某个商品的数量
// 1.	书籍编号: book_id
// 2.	修改后的数量：amount
export function modifyItemInCart(data) {
  return request({
    url: '/user/cart/changenum',
    method: 'POST',
    data
  })
}

// 从购物车删除商品（可批量也可单独删除）
// 书籍编号列表 bookIdList
// @example [13124, 12431324, 41234, 634646]
export function deleteFromCart(params) {
  return request({
    url: '/user/cart/delitem',
    params
  })
}
// TODO: ?? get 传列表
// export function deleteFromCart(data) {
//   return request({
//     url: '/user/cart/delitem',
//     method: 'POST',
//     data
//   })
// }
