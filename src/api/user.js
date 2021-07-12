import request from '@/utils/request'

// 登录
export function login(params) {
  return request({
    url: '/user/account/login',
    method: 'post',
    params
  })
}

// 登出
export function logout() {
  return request({
    url: '/user/account/logout'
  })
}

// 注册
export function registrationSingle(data) {
  return request({
    url: '/user/account/register',
    method: 'post',
    data
  })
}

// 测试session
export function testSession() {
  return request({
    url: '/user/testsession'
  })
}

export function modifyUserInfo(data) {
  return request({
    url: '/user/modify',
    method: 'post',
    data
  })
}

// 获取某部门下的用户列表
// 返回 Page<User>
export function getUserList({
  did,
  isExpand = true,
  pageNum = 1,
  pageSize = 10
}) {
  return request({
    url: `/user/users_in_department?did=${did}&isExpand=${isExpand}&pageNum=${pageNum}&pageSize=${pageSize}`,
    method: 'get'
  })
}

// 获取所有用户列表
// 返回 Page<User>
export function getAllUsers({
  pageNum, pageSize
}) {
  return request({
    url: '/user/allusers?pageNum=' + pageNum + '&pageSize=' + pageSize,
    method: 'get'
  })
}

// 获取所有用户列表及其角色列表
// 返回 Page<User>
export function getAllUsersWithRoles({
  pageNum, pageSize
}) {
  return request({
    url: '/user/alluserswithroles?pageNum=' + pageNum + '&pageSize=' + pageSize,
    method: 'get'
  })
}

// 获取某用户在某部门的角色
// 返回 List<Role>
export function getRoleListInDepartment(did, uid) {
  return request({
    url: '/user/roles_in_department?did=' + did + '&uid=' + uid
  })
}

// 获取某用户的所有角色
// 返回 List<Role>
export function getUserAllRoles(uid) {
  return request({
    url: '/user/allroles?uid=' + uid
  })
}

// 获取某用户关联的所有部门
// 返回 List<Department>
export function getUserAllDepartments(uid) {
  return request({
    url: '/user/userdepartments?uid=' + uid
  })
}

// 获取某用户在某部门下的所有权限
// 返回 List<Right>
export function getUserAllRightsInDepartment(params = {
  did: 0.1, uid: 4
}) {
  return request({
    url: '/user/rights_in_department', // ?did='+params.did+'&uid='+params.uid,
    params
  })
}

// 获取用户信息
export function getInfo(email) {
  return request({
    url: '/user/info',
    params: { email }
  })
  // return new Promise(resolve => {
  //   setTimeout(() => {
  //     resolve({
  //       code: "0",
  //       data:{
  //         name: '管理员',
  //         did: 0.1,
  //         uid: 4,
  //         avatar: 'https://z3.ax1x.com/2021/04/11/cwKLLj.png',
  //         roles: ['admin']
  //       },
  //       msg: "成功获取用户信息"
  //     })}, 300)
  // })
}
