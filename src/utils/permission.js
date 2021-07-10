import store from '@/store'

/**
 * @param {Array} value
 * @returns {Boolean}
 */
export function hasAnyRole(value) {
  if (value && value instanceof Array && value.length > 0) {
    const roles = store.getters && store.getters.roles
    return roles.some(role => {
      return value.includes(role)
    })
  } else {
    console.error(`need roles! Like v-roles="['admin','editor']"`)
    return false
  }
}

/**
 * @param {Array} value
 * @returns {Boolean}
 */
export function hasAnyRight(value) {
  if (value && value instanceof Array && value.length > 0) {
    const rights = store.getters && store.getters.rights
    return rights.some(right => {
      return right.rightname === 'allRights' || value.includes(right.rightname)
    })
  } else {
    console.error(`need rights! Like v-rights="['user:view','role:view']"`)
    return false
  }
}

export const RIGHTS = {
  LEDGER_VIEW: 'ledger:view',
  LEDGER_EDIT: 'ledger:edit',
  TEMPLATE_VIEW: 'template:view',
  TEMPLATE_EDIT: 'template:edit',
  ROLE_VIEW: 'role:view',
  ROLE_EDIT: 'role:edit',
  USER_VIEW: 'user:view',
  USER_EDIT: 'user:edit',
  DEPARTMENT_VIEW: 'department:view',
  DEPARTMENT_EDIT: 'department:edit',
  RIGHT_VIEW: 'right:view',
  RIGHT_EDIT: 'right:edit',
  LOG: 'log',
  ALL_RIGHTS: 'allRights'
}
