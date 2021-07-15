import request from '@/utils/request'

// 登录状态绑定邮箱——获取邮箱验证码
export function getCaptcha(params) {
  return request({
    url: '/user/account/getcaptcha',
    method: 'post',
    params
  })
}

// 登录状态绑定邮箱
// 1. 邮箱：String email
// 2. 验证码：String captcha
export function bindEmail(params) {
  return request({
    url: '/user/account/bindemail',
    method: 'post',
    params
  })
}

// 登录状态修改密码——获取邮箱验证码
export function getPwdCaptcha() {
  return request({
    url: '/user/account/getcaptcha?keyword=password',
    method: 'post'
  })
}

// 登录状态修改密码
// 1. 新密码：String password
// 2. 验证码：String captcha
export function modifyPassword(params) {
  return request({
    url: '/user/account/updatepassword',
    method: 'post',
    params
  })
}
