const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  user: state => state.user,
  avatar: state => state.user.avatar,
  email: state => state.user.email,
  name: state => state.user.name,
  nickname: state => state.user.nickname,
  addressesList: state => state.user.addressesList,
  defaultAddress: state => state.user.addressesList.find(address => address.default_addr === true) || { 'addr_id': 2, 'user_id': 1, 'phone': '18321654113', 'zip_code': '100086', 'receiver_state': '北京', 'receiver_city': '北京市', 'receiver_district': '海淀区', 'detail_address': '上园村3号', 'country': '中国', 'default_addr': true },
  roles: state => state.user.roles,
  rights: state => state.user.rights,
  permission_routes: state => state.permission.routes
}
export default getters
