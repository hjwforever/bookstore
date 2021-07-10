import request from '@/utils/request'
import axios from 'axios'

export function getRoleList({
  did = 0.1,
  isExpand = true,
  pageNum = 1,
  pageSize = 10
}) {
  return request({
    url: `/role?did=${did}&isExpand=${isExpand}&pageNum=${pageNum}&pageSize=${pageSize}`,
    method: 'get'
  })
}

export function testSession() {
  return request('/test')
}
export function test1() {
  return axios(({
    url: `http://127.0.0.1:8081/test1`
  }))
}

export function test2() {
  return axios(({
    url: `http://127.0.0.1:8081/test2`
  }))
}

export function createRole(data) {
  return request({
    url: '/role/create',
    method: 'post',
    data
  })
}

export function getAllRights(roleid) {
  return request('/role/rightsofrole?roleid=' + roleid)
}

export function modifyRoleInfo(data) {
  return request({
    url: '/role/modify',
    method: 'post',
    data
  })
}

// example {
//     "uid": 5,
//     "roleidList": [
//         23
//     ]
// }
export function distribute(data) {
  return request({
    url: '/role/distribute',
    method: 'post',
    data
  })
}
