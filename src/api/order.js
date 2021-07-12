import request from '@/utils/request'

// 查询某一用户所有订单列表
export function getOrderList() {
  return request('/order/search')
}
