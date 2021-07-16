import { login, logout, registrationSingle, getInfo } from '@/api/user'
import { resetRouter } from '@/router'
import { Message } from 'element-ui'
import { removeEmail, setEmail, removeJSessionID } from '@/utils/auth'
import { getAddressList } from '@/api/address'

const getDefaultState = () => {
  return {
    uid: 0,
    gender: '男',
    name: '',
    nickname: '',
    email: '',
    password: '',
    birthday: '',
    avatar: '',
    active: true,
    roles: [],
    rights: [],
    addressesList: []
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_UID: (state, uid) => {
    state.uid = uid
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_NICKNAME: (state, nickname) => {
    state.nickname = nickname
  },
  SET_PASSWORD: (state, password) => {
    state.password = password
  },
  SET_GENDER: (state, gender) => {
    state.gender = gender
  },
  SET_EMAIL: (state, email) => {
    state.email = email
  },
  SET_BIRTHDAY: (state, birthday) => {
    state.birthday = birthday
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_ACTIVE: (state, active) => {
    state.active = active
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  },
  SET_RIGHTS: (state, rights) => {
    state.rights = rights
  },
  SET_ADDRESS: (state, addressesList) => {
    state.addressesList = addressesList
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      login({ username: username.trim(), password: password }).then(response => {
        console.log('user login', response)
        const { data } = response

        // const { name, avatar } = data
        let { privilegeList, addressesList } = data
        const { username, password, nickname, gender, user_id, birthday, roleList, active } = data
        const avatar = 'https://z3.ax1x.com/2021/04/11/cwKLLj.png'
        // roles must be a non-empty array
        // TODO: backend add more user info such as roles and rights
        // let roles = roleList.map(item => item.rolename)
        let roles = roleList

        // TODO: 是否验证账户激活
        // if (!active) {
        //   Message({
        //     message: '登录失败 账户未激活',
        //     type: 'error',
        //     duration: 3000
        //   })
        //   reject('账户未激活')
        //   return
        // }

        if (!roles || roles.length <= 0) {
          // reject('getInfo: roles must be a non-null array!')
          console.log('getInfo: roles must be a non-null array!')
          roles = [{
            'role_id': 1,
            'rolename': 'user',
            'description': '普通用户'
          }]
        }

        if (!privilegeList || privilegeList.length <= 0) {
          console.log('getInfo: rightList must be a non-null array!')
          privilegeList = [{
            'priv_id': 1,
            'privname': 'priv1',
            'description': '权限1'
          }]
        }

        if (!addressesList || addressesList.length <= 0) {
          addressesList = []
          addressesList.push({ 'addr_id': 2, 'user_id': user_id, 'phone': '18321654113', 'zip_code': '100086', 'receiver_state': '北京', 'receiver_city': '北京市', 'receiver_district': '海淀区', 'detail_address': '上园村3号', 'country': '中国', 'default_addr': true })
        }

        commit('SET_EMAIL', data.email)
        setEmail(data.email)
        commit('SET_NAME', username)
        commit('SET_NICKNAME', nickname)
        commit('SET_PASSWORD', password)
        commit('SET_GENDER', gender ? '男' : '女')
        commit('SET_AVATAR', avatar)
        commit('SET_ACTIVE', active)
        commit('SET_BIRTHDAY', birthday)
        commit('SET_UID', user_id)
        commit('SET_ROLES', roles)
        commit('SET_RIGHTS', privilegeList)
        commit('SET_ADDRESS', addressesList)

        Message({
          message: '登录成功',
          type: 'success',
          duration: 3000
        })
        resolve()
      }).catch(error => {
        console.log('登录失败', error)
        reject(error)
      })
    })
  },

  // user register
  register({ commit }, userInfo) {
    const { uname, nickname, email, password, captcha } = userInfo
    return new Promise((resolve, reject) => {
      registrationSingle({ username: uname.trim(), nickname: nickname.trim(), email: email.trim(), password: password, captcha: captcha.trim() }).then(response => {
        console.log('user register', response)
        // const { data } = response
        // commit("SET_EMAIL", data.email)
        // setEmail(data.email)
        //
        // // const { name, avatar } = data
        // let { uname } = data
        // const avatar = "https://z3.ax1x.com/2021/04/11/cwKLLj.png"
        // const roles = ['admin']
        // // roles must be a non-empty array
        // if (!roles || roles.length <= 0) {
        //   reject('getInfo: roles must be a non-null array!')
        // }
        //
        // commit('SET_ROLES', roles)
        // commit('SET_NAME', username)
        // commit('SET_AVATAR', avatar)

        Message({
          message: '注册成功',
          type: 'success',
          duration: 3000
        })
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo(state.email).then(response => {
        const { data } = response
        console.log(response)
        if (!data) {
          reject('Verification failed, please Login again.')
        }

        const { roleList, username, nickname, avatar, birthday, password, gender, email, user_id, privilegeList, addressesList } = data
        setEmail(email)
        // let roles = roleList.map(item => item.rolename)
        let roles = roleList

        // roles must be a non-empty array
        if (!roles || roles.length <= 0) {
          // reject('getInfo: roles must be a non-null array!')
          console.log('getInfo: roles must be a non-null array!')
          roles = [{
            'role_id': 2,
            'rolename': 'user',
            'description': '普通用户'
          }
          ]
        }

        // commit("SET_NAME", data.name)
        // commit("SET_ROLES", ['admin'])
        commit('SET_ROLES', roles)
        commit('SET_NAME', username)
        commit('SET_NICKNAME', nickname)
        commit('SET_PASSWORD', password)
        commit('SET_BIRTHDAY', birthday)
        commit('SET_EMAIL', data.email)
        commit('SET_GENDER', gender ? '男' : '女')
        commit('SET_AVATAR', avatar || 'https://z3.ax1x.com/2021/04/11/cwKLLj.png')
        commit('SET_UID', user_id)
        commit('SET_RIGHTS', privilegeList)
        commit('SET_ADDRESS', addressesList)

        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout().then(res => {
        Message({
          message: '登出成功',
          type: 'success',
          duration: 3000
        })
        console.log('登出成功', res)
        removeEmail()
        removeJSessionID()
        resetRouter()
        commit('RESET_STATE')
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  resetToken({ commit }) {
    return new Promise(resolve => {
      removeEmail()
      removeJSessionID()
      commit('RESET_STATE')
      resolve()
    })
  },

  updateAddress({ commit }) {
    return new Promise((resolve, reject) => {
      getAddressList()
        .then(res => {
          console.log('地址更新成功', res)
          commit('SET_ADDRESS', res.data)
          resolve(res)
        })
        .catch(err => {
          console.log('地址更新失败', err)
          reject(err)
        })
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
