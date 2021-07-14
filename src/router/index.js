import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import Layout from '@/layout'

export const constantRoutes = [
  // // 新建台账
  // {
  //   path: '/createLedger',
  //   component: () => import('@/views/ledgerManage/createLedger'),
  //   hidden: true
  // },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: () => import('@/views/dashboard/index'),
        meta: { title: '首页', icon: 'dashboard' }
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login'),
    hidden: true
  },
  {
    path: '/register',
    component: () => import('@/views/register'),
    hidden: true
  },
  {
    path: '/search',
    component: Layout,
    children: [
      {
        path: '',
        name: 'Search',
        component: () => import('@/views/search'),
        meta: { title: '书籍搜索', icon: 'search' }
      }
    ]
  },

  // {
  //   path: '/items/:bookId',
  //   component: Layout,
  //   children: [
  //     {
  //       path: '',
  //       name: 'Items',
  //       props: true,
  //       component: () => import('@/components/Books/bookItem'),
  //       meta: { title: '书籍详情', icon: 'book' }
  //     }
  //   ]
  // },
  {
    path: '/items/:bookId',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '',
        name: 'Items',
        props: true,
        component: () => import('@/components/Books/BookDetail'),
        meta: { title: '书籍详情', icon: 'book' }
      }
    ]
  },
  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  }
]

export const asyncRoutes = [
  {
    path: '/account',
    name: 'PersonCenter',
    component: Layout,
    redirect: '/account/center',
    meta: { title: '个人中心', icon: 'user-manage' },
    children: [
      {
        path: 'profile',
        name: 'Account',
        component: () => import('@/views/account'),
        meta: { title: '个人信息', icon: 'id-card' }
      },
      {
        path: 'order',
        name: 'Order',
        props: true,
        component: () => import('@/views/order'),
        meta: { title: '订单管理', icon: 'order-manage' }
      }
    ]
  },
  // {
  //   path: '/',
  //   component: Layout,
  //   redirect: '/dashboard',
  //   name: 'Ledger',
  //   meta: { title: '台账管理', icon: 'reconciliation', rights: ['ledger', 'template'] },
  //   children: [
  //     {
  //       path: 'ledger/list',
  //       name: 'LedgerList',
  //       component: () => import('@/views/ledgerManage/ledgerList'),
  //       meta: { title: '台账列表', icon: 'table', rights: ['ledger'] }
  //     },
  //     {
  //       path: 'ledger/info',
  //       name: 'LedgerInfo',
  //       hidden: true,
  //       component: () => import('@/views/ledgerManage/ledgerInfo'),
  //       meta: { title: '台账详情', icon: 'info', rights: ['ledger'] }
  //     },
  //     {
  //       path: 'ledger/create',
  //       hidden: true,
  //       name: 'CreateLedger',
  //       component: () => import('@/views/ledgerManage/createLedger'),
  //       meta: { title: '新建台账', icon: 'info', rights: ['ledger'] }
  //     },
  //     {
  //       path: 'template/list',
  //       name: 'TemplateList',
  //       component: () => import('@/views/templateManage/ledgerTemplate'),
  //       meta: { title: '模板列表', icon: 'table', rights: ['template'] }
  //     },
  //     {
  //       path: 'template/info',
  //       hidden: true,
  //       name: 'TemplateInfo',
  //       component: () => import('@/views/templateManage/templateInfo'),
  //       meta: { title: '模板详情', icon: 'template', rights: ['template'] }
  //     },
  //     {
  //       path: 'template/create',
  //       hidden: true,
  //       name: 'CreateTemplate',
  //       component: () => import('@/views/templateManage/createTemplate'),
  //       meta: { title: '新建模板', icon: 'add-template', rights: ['template'] }
  //     }
  //   ]
  // },

  // {
  //   path: "/template",
  //   component: Layout,
  //   alwaysShow: true,
  //   redirect: "/template/list",
  //   name: "Template",
  //   meta: { title: "模板管理", icon: "template-manage", rights: ['template'] },
  //   children: [
  //
  //   ]
  // },

  // {
  //   path: '/department',
  //   component: Layout,
  //   children: [
  //     {
  //       path: '',
  //       name: 'Department',
  //       component: () => import('@/views/departmentManage'),
  //       meta: { title: '部门管理', icon: 'department', rights: ['department'] }
  //     }
  //   ]
  // },

  // {
  //   path: '/system',
  //   component: Layout,
  //   alwaysShow: true,
  //   redirect: '/system/accountManage',
  //   name: 'SystemManage',
  //   meta: { title: '系统管理', icon: 'system', rights: ['user', 'role', 'right', 'log'] },
  //   children: [
  //     {
  //       path: 'accountManage',
  //       name: 'AccountManage',
  //       component: () => import('@/views/systemManage/accountManage'),
  //       meta: { title: '账号管理', icon: 'user-manage', rights: ['user'] }
  //     },
  //     {
  //       path: 'roleManage',
  //       name: 'RoleManage',
  //       component: () => import('@/views/systemManage/roleManage'),
  //       meta: { title: '角色管理', icon: 'role-manage', rights: ['role'] }
  //       // children: [
  //       //   {
  //       //     path: "add",
  //       //     name: "roleManage",
  //       //     hidden: true,
  //       //     component: () => import("@/views/systemManage/roleManage/add/index"),
  //       //     meta: { title: "添加角色", icon: "add-user" },
  //       //   }
  //       // ]
  //     },
  //     {
  //       path: 'permissionAssignment',
  //       name: 'PermissionAssignment',
  //       component: () => import('@/views/systemManage/permissionAssignment'),
  //       meta: { title: '权限分配', icon: 'role-manage', rights: ['right'] }
  //     },
  //     {
  //       path: 'record',
  //       name: 'Record',
  //       component: () => import('@/views/systemManage/record'),
  //       meta: { title: '日志管理', icon: 'record', rights: ['log'] }
  //     }
  //   ]
  // },

  // {
  //   path: "external-link",
  //   component: Layout,
  //   children: [
  //     {
  //       path:
  //         "https://github.com/hjwforever/bookstore",
  //       meta: { title: "外链", icon: "link" }
  //     }
  //   ]
  // },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () =>
  new Router({
    // mode: 'history', // require service support
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes
  })

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
