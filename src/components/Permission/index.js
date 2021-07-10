import permission from './permission'

const { roles, rights } = permission

const install = function(Vue) {
  Vue.directive('roles', roles)
  Vue.directive('rights', rights)
}

if (window.Vue) {
  window['roles'] = roles
  window['rights'] = rights
  Vue.use(install); // eslint-disable-line
}

roles.install = install
rights.install = install
export default {
  roles,
  rights
}
