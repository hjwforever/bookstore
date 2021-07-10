import { asyncRoutes, constantRoutes } from '@/router'
import { RIGHTS } from '@/utils/permission'

/**
 * Use meta.role to determine if the current user has permission
 * @param roles
 * @param rights
 * @param route
 */
function hasPermission(roles, rights, route) {
  if (route.meta) {
    return (route.meta.roles ? roles.some(role => route.meta.roles.includes(role.split(':')[0])) : true) &&
      (route.meta.rights ? rights.some(right => route.meta.rights.includes(right.split(':')[0])) : true)
  } else {
  // if (route.meta && route.meta.roles) {
  //   return roles.some(role => route.meta.roles.includes(role.split(":")[0]))
  // } else {
    return true
  }
}

/**
 * Filter asynchronous routing tables by recursion
 * @param routes asyncRoutes
 * @param roles
 * @param rights
 */
export function filterAsyncRoutes(routes, roles, rights) {
  const res = []

  routes.forEach(route => {
    const tmp = { ...route }
    if (hasPermission(roles, rights, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, roles, rights)
      }
      res.push(tmp)
    }
  })

  return res
}

const state = {
  routes: [],
  addRoutes: []
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    state.routes = constantRoutes.concat(routes)
  }
}

const actions = {
  generateRoutes({ commit }, { roles, rights }) {
    return new Promise(resolve => {
      let accessedRoutes
      const isAdmin = rights.some(right => {
        return right === RIGHTS.ALL_RIGHTS
      })
      if (isAdmin || roles.includes('admin')) {
        accessedRoutes = asyncRoutes || []
      } else {
        accessedRoutes = filterAsyncRoutes(asyncRoutes, roles, rights)
      }
      commit('SET_ROUTES', accessedRoutes)
      resolve(accessedRoutes)
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
