import store from '@/store'

function checkHasAnyRole(el, binding) {
  const { value } = binding
  const roles = store.getters && store.getters.roles

  if (value && value instanceof Array) {
    if (value.length > 0) {
      const permissionRoles = value

      const hasPermission = roles.some(role => {
        return permissionRoles.includes(role)
      })

      if (!hasPermission) {
        el.parentNode && el.parentNode.removeChild(el)
      }
    }
  } else {
    throw new Error(`need roles! Like v-roles="['admin','editor']"`)
  }
}

function checkHasAnyRight(el, binding) {
  const { value } = binding
  const rights = store.getters && store.getters.rights

  if (value && value instanceof Array) {
    if (value.length > 0) {
      const permissionRights = value

      const hasPermission = rights.some(right => {
        return permissionRights.includes(right.rightname)
      })

      if (!hasPermission) {
        el.parentNode && el.parentNode.removeChild(el)
      }
    }
  } else {
    throw new Error(`need rights!Like v-rights="['user:view','role:view']"`)
  }
}

export default {
  roles: {
    inserted(el, binding) {
      checkHasAnyRole(el, binding)
    },
    update(el, binding) {
      checkHasAnyRole(el, binding)
    }
  },
  rights: {
    inserted(el, binding) {
      checkHasAnyRight(el, binding)
    },
    update(el, binding) {
      checkHasAnyRight(el, binding)
    }
  }
}
