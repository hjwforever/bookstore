import request from '@/utils/request'

// 获取收获地址列表
export function getAddressList() {
  return request('/address/getlist')
}

// 新建收获地址列表
// @example 地址对象newAddr:
// {
//   "phone" : "18321654113",
//   "zip_code" : "100086",
//   "country" : "国家",
//   "receiver_state" : "省份",
//   "receiver_city" : "城市",
//   "receiver_district" : "区/县",
//   "detail_address" : "详细地址"
// }
export function createAddressList(data) {
  return request({
    url: '/address/add',
    method: 'POST',
    data
  })
}
