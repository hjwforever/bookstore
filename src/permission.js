import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import getPageTitle from '@/utils/get-page-title'
import { getEmail, resetState } from '@/utils/auth'
import { constantRoutes } from '@/router'

NProgress.configure({ showSpinner: false })

const routes = constantRoutes.filter(item => item.path && item.path !== '/').map(item => item.path.split(':')[0])

const whiteList = [...routes, '/', '/dashboard', '/search', '/login', '/register'] // no redirect whitelist
console.log(whiteList)

router.beforeEach(async(to, from, next) => {
  NProgress.start()
  document.title = getPageTitle(to.meta.title)

  // const currentEmail = getEmail()
  const username = store.getters.name
  // if (currentEmail) {
  if (username) {
    if (to.path === '/login') {
      next({ path: '/' })
      NProgress.done()
    } else {
      const hasRoles = store.getters.roles && store.getters.roles.length > 0
      if (hasRoles) {
        next()
      } else {
        try {
          // const { roleList, privilegeList } = await store.dispatch('user/getInfo')
          const roleList = [{
            'role_id': 1,
            'rolename': 'user',
            'description': '普通用户'
          }]
          const privilegeList = [{
            'priv_id': 1,
            'privname': 'priv1',
            'description': '权限1'
          }]

          const roles = roleList.map(item => item.rolename)
          const rights = privilegeList.map(item => item.privname)

          await store.dispatch('user/resetToken')
          store.commit('user/SET_ROLES', roles)
          store.commit('user/SET_RIGHTS', privilegeList)
          // console.log('rolesDetails',roleList)
          // console.log('roles',roles)

          // generate accessible routes map based on roles
          const accessRoutes = await store.dispatch('permission/generateRoutes', {
            roles, rights
          })

          // dynamically add accessible routes
          router.addRoutes(accessRoutes)

          // hack method to ensure that addRoutes is complete
          // set the replace: true, so the navigation will not leave a history record
          next({ ...to, replace: true })
        } catch (error) {
          // remove token and go to login page to re-login
          await store.dispatch('user/resetToken')
          Message.error(error || 'Has Error')
          next(`/login?redirect=${to.path}`)
          NProgress.done()
        }
      }
    }
  } else {
    // TODO: get default roles and rights from remote server

    store.dispatch('user/resetToken')
    resetState()
    // const { roleList, rightList } = await store.dispatch('user/getInfo')
    const roles = [{
      'rolename': 'tourist',
      'roleid': 9,
      'description': '游客'
    }].map(role => role.rolename)
    const rights = [{
      'priv_id': 1,
      'privname': 'priv1',
      'description': '权限1'
    }].map(right => right.privname)

    store.commit('user/SET_ROLES', roles)
    store.commit('user/SET_RIGHTS', rights)

    // console.log('rolesDetails',roleList)
    // console.log('roles',roles)
    const accessRoutes = await store.dispatch('permission/generateRoutes', {
      roles, rights
    })
    router.addRoutes(accessRoutes)

    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      Message.error('请登录')
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
