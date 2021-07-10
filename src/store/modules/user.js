import { login, logout, registrationSingle, getInfo } from '@/api/user'
import { resetRouter } from '@/router'
import { Message } from 'element-ui'
import { removeEmail, setEmail, removeJSessionID } from '@/utils/auth'

const getDefaultState = () => {
  return {
    uid: 0,
    did: 0.1,
    gender: '男',
    name: '',
    email: '',
    birthday: '',
    avatar: '',
    roles: [],
    rights: [],
    departments: []
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
  SET_DID: (state, did) => {
    state.did = did
  },
  SET_NAME: (state, name) => {
    state.name = name
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
  SET_ROLES: (state, roles) => {
    state.roles = roles
  },
  SET_RIGHTS: (state, rights) => {
    state.rights = rights
  },
  SET_DEPARTMENTS: (state, departments) => {
    state.departments = departments
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
        commit('SET_EMAIL', data.email)
        setEmail(data.email)

        // const { name, avatar } = data
        let { rightList } = data
        const { uname, gender, uid, birthday, lastdid, roleList, departmentList } = data
        const avatar = 'https://z3.ax1x.com/2021/04/11/cwKLLj.png'
        // roles must be a non-empty array
        let roles = roleList.map(item => item.rolename)
        if (!roles || roles.length <= 0) {
          // reject('getInfo: roles must be a non-null array!')
          console.log('getInfo: roles must be a non-null array!')
          roles = ['user']
        }

        if (!rightList || rightList.length <= 0) {
          console.log('getInfo: rightList must be a non-null array!')
          rightList = []
        }

        // if (!lastdid) lastdid=0.1
        commit('SET_NAME', uname)
        commit('SET_GENDER', gender ? '男' : '女')
        commit('SET_AVATAR', avatar)
        commit('SET_BIRTHDAY', birthday)
        commit('SET_UID', uid)
        commit('SET_DID', lastdid)
        commit('SET_ROLES', roles)
        commit('SET_RIGHTS', rightList)
        commit('SET_DEPARTMENTS', departmentList)

        Message({
          message: '登录成功',
          type: 'success',
          duration: 3000
        })
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user register
  register({ commit }, userInfo) {
    const { uname, email, password } = userInfo
    return new Promise((resolve, reject) => {
      registrationSingle({ uname: uname.trim(), email: email.trim(), password: password }).then(response => {
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
        // commit('SET_NAME', uname)
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

        const { roleList, uname/*, avatar*/, birthday, gender, email, lastdid, uid, rightList, departmentList } = data
        setEmail(email)
        let roles = roleList.map(item => item.rolename)

        // roles must be a non-empty array
        if (!roles || roles.length <= 0) {
          // reject('getInfo: roles must be a non-null array!')
          console.log('getInfo: roles must be a non-null array!')
          roles = ['user']
        }

        // commit("SET_NAME", data.name)
        commit('SET_AVATAR', 'https://z3.ax1x.com/2021/04/11/cwKLLj.png')
        // commit("SET_ROLES", ['admin'])
        commit('SET_ROLES', roles)
        commit('SET_NAME', uname)
        commit('SET_BIRTHDAY', birthday)
        commit('SET_EMAIL', data.email)
        commit('SET_GENDER', gender ? '男' : '女')
        // commit('SET_AVATAR', avatar)
        commit('SET_UID', uid)
        commit('SET_DID', lastdid)
        commit('SET_RIGHTS', rightList)
        commit('SET_DEPARTMENTS', departmentList)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout().then(() => {
        Message({
          message: '登出成功',
          type: 'success',
          duration: 3000
        })
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
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
