import request from '@/utils/request'

// 获取收获地址列表
export function getAddressList() {
  return request('/user/address/getList')
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
export function createAddress(data) {
  return request({
    url: '/user/address/add',
    method: 'POST',
    data
  })
}

// 删除收货地址
// 地址编号：long addr_id
export function deleteAddress(params) {
  return request({
    url: '/user/address/del',
    params
  })
}

// 编辑收货地址
// {
//   "addr_id" : "3",
//   "phone" : "159321",
//   "zip_code" : "100086",
//   "country" : "国家",
//   "receiver_state" : "省份",
//   "receiver_city" : "城市",
//   "receiver_district" : "区/县",
//   "detail_address" : "详细地址"
// }
export function modifyAddress(data) {
  return request({
    url: '/user/address/modify',
    method: 'POST',
    data
  })
}

// 设置为默认地址
// 地址编号: long addr_id
export function setAddressAsDefault(params) {
  return request({
    url: '/user/address/setdefault',
    method: 'POST',
    params
  })
}
