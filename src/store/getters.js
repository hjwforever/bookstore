const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  user: state => state.user,
  avatar: state => state.user.avatar,
  email: state => state.user.email,
  name: state => state.user.name,
  roles: state => state.user.roles,
  rights: state => state.user.rights,
  permission_routes: state => state.permission.routes
}
export default getters
