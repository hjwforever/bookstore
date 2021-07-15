import request from '@/utils/request'

// 查询某一用户所有订单列表
// 是否从所有用户中搜索：Boolean searchAll（默认值false）
// 订单状态：int status（默认值 -1, 待付款 0, 待发货 1, 待收货 2, 待评价 3）
// 关键词：keyword  （默认值 ""）
export function getOrderList(params) {
  return request({
    url: '/user/order/search',
    params
  })
}

// 生成订单
// 一个initOrder对象包含：
// 付款类型：int payment_type
// 买家备注：String buyer_message
// 地址编号：addr_id
// 订单明细列表：order_detail_list
// {
//     "payment_type" : 2,
//     "buyer_message" : "请用顺丰发货",
//     "addr_id" : "21534",
//     "orderDetailList" : [
//         {
//             "book_id" : "6",
//             "amount" : "5"
//         },
//         {
//             "book_id" : "8",
//             "amount" : "1"
//         }
//      ]
// }
export function generateOrder(data) {
  return request({
    url: '/user/order/generateOrder',
    method: 'post',
    data
  })
}

// 支付订单
// 订单id：long order_id
export function pay(data) {
  return request({
    url: '/user/order/pay',
    method: 'post',
    data
  })
}

// 取消订单
// 订单id：long order_id
export function cancelOrder(data) {
  return request({
    url: '/user/order/cancelOrder',
    method: 'post',
    data,
    transformRequest: [
      function(data) {
        let ret = ''
        for (const it in data) {
          ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
        }
        ret = ret.substring(0, ret.lastIndexOf('&'))
        return ret
      }
    ],
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }})
}

// 商品发货
// 订单id: long order_id
// 物流名称：String shipping_name
// 物流单号：String shipping_code
export function ship(params) {
  return request.post('/user/order/ship', { params: { order_id: params.order_id, shipping_name: params.shipping_name, shipping_code: params.shipping_code }})
}

// 确认收货
// 订单id：long order_id
export function confirmReceipt(data) {
  return request({
    url: '/user/order/confirmReceipt',
    method: 'post',
    data,
    transformRequest: [
      function(data) {
        let ret = ''
        for (const it in data) {
          ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
        }
        ret = ret.substring(0, ret.lastIndexOf('&'))
        return ret
      }
    ],
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }})
}

// 评价订单中的某个商品
// 订单id：long order_id
export function commentOrder(data) {
  console.log('data', data)
  return request({
    url: '/user/order/comment',
    method: 'post',
    data
  })
}

export const ORDER_STATUS = {
  DEFAULT: {
    label: '全部订单',
    index: -1
  },
  WAIT_PAY: {
    label: '待付款',
    index: 0
  },
  WAIT_SHIP: {
    label: '待发货',
    index: 1
  },
  WAIT_FINISH: {
    label: '待收货',
    index: 2
  },
  WAIT_COMMENT: {
    label: '待评价',
    index: 3
  },
  CANCELED: {
    label: '已取消',
    index: 4
  },
  COMPLETED: {
    label: '已完成',
    index: 5
  }
}
