import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  withCredentials: true,
  timeout: 10000
})

axios.defaults.withCredentials = true

service.interceptors.request.use(
  config => {
    // do something before request is sent
    // config.headers['Connection'] = 'keep-alive';
    // if (store.getters.token) {
    //   // let each request carry token
    //   // ['X-Token'] is a custom headers key
    //   // please modify it according to the actual situation
    //   config.headers['X-Token'] = getToken()
    // }
    // config.headers['Content-Type'] = "application/json;charset=utf-8"
    config.withCredentials = true
    // console.log('config', config)
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  response => {
    // console.log('response.headers', response.headers)
    // console.log('response.headers[\'Set-Cookie\']', response.headers['Set-Cookie'])

    const res = response.data

    if (Number.parseInt(res.code) === 503) {
      console.log('logout')
      store.dispatch('user/resetToken').then(() => {
        location.reload()
      })
      Message({
        message: '登录超时！请重新登录',
        type: 'error',
        duration: 5 * 1000
      })
      // if the custom code is not 20000, it is judged as an error.
    } else if (res.code !== 200 && res.code !== '0' && res.code !== 0) {
    // if (res.code !== 200 && res.code !== "0" && res.code !== 0) {
      Message({
        message: res.msg || 'Error',
        type: 'error',
        duration: 5 * 1000
      })

      // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
      if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
        // to re-login
        MessageBox.confirm('You have been logged out, you can cancel to stay on this page, or log in again', 'Confirm logout', {
          confirmButtonText: 'Re-Login',
          cancelButtonText: 'Cancel',
          type: 'warning'
        }).then(() => {
          store.dispatch('user/resetToken').then(() => {
            location.reload()
          })
        })
      }
      return Promise.reject(new Error(res.msg || 'Error'))
    } else {
      return res
    }
  },
  error => {
    console.log('err' + error) // for debug
    Message({
      message: error.msg,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
