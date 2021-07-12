import request from '@/utils/request'

// 绑定邮箱 获取邮箱验证码
export function getCaptcha(data) {
  return request({
    url: '/user/account/getcaptcha',
    method: 'post',
    data
  })
}

// 绑定邮箱
// 1. 邮箱：String email
// 2. 验证码：String captcha
export function bindEmail(data) {
  return request({
    url: '/user/account/bindemail',
    method: 'post',
    data
  })
}

// 修改密码 获取验证码
// 1. 新密码：String password
// 2. 验证码：String captcha
export function changePassword(data) {
  return request({
    url: '/user/account/bindemail',
    method: 'post',
    data
  })
}
