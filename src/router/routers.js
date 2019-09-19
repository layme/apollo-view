import main from '../views/Main.vue'

/**
 * meta {
 *   title: 标题
 *   hideMenu: 隐藏菜单
 * }
 */
export default [
  {
    path: '/',
    name: '_dashboard',
    redirect: '/dashboard',
    meta: {
      title: '大盘',
      icon: 'el-icon-odometer'
    },
    component: main,
    children: [
      {
        path: '/dashboard',
        name: 'dashboard',
        meta: {
          title: '云台',
          hideMenu: true
        },
        component: () => import('../views/dashboard/dashboard.vue')
      }
    ]
  },
  {
    path: '/vehicle',
    name: 'vehicle',
    meta: {
      title: '车辆',
      icon: 'el-icon-truck'
    },
    component: main,
    children: [
      {
        path: 'sold',
        name: 'sold',
        meta: {
          title: '已售车辆',
          icon: 'el-icon-truck'
        },
        component: () => import('../views/vehicle/sold.vue')
      },
      {
        path: 'stock',
        name: 'stock',
        meta: {
          title: '库存车辆',
          icon: 'el-icon-truck'
        },
        component: () => import('../views/vehicle/stock.vue')
      }
    ]
  },
  {
    path: '/cus',
    name: 'cus',
    meta: {
      title: '客户',
      icon: 'el-icon-s-custom'
    },
    component: main,
    children: [
      {
        path: 'customer',
        name: 'customer',
        meta: {
          title: '客户列表'
        },
        component: () => import('../views/customer/customer.vue')
      },
      {
        path: 'customerMap',
        name: 'customerMap',
        meta: {
          title: '客户地图'
        },
        component: () => import('../views/customer/customerMap.vue')
      }
    ]
  },
  {
    path: '/ins',
    name: 'ins',
    meta: {
      title: '保险',
      icon: 'el-icon-umbrella'
    },
    component: main,
    children: [
      {
        path: 'insurance',
        name: 'insurance',
        meta: {
          title: '保险',
          icon: 'el-icon-umbrella'
        },
        component: () => import('../views/insurance/insurance.vue')
      }
    ]
  },
  {
    path: '/system',
    name: 'system',
    meta: {
      title: '系统',
      icon: 'el-icon-s-promotion'
    },
    component: main,
    children: [
      {
        path: 'store',
        name: 'store',
        meta: {
          title: '门店'
        },
        component: () => import('../views/system/store/store.vue')
      },
      {
        path: 'employee',
        name: 'employee',
        meta: {
          title: '员工'
        },
        component: () => import('../views/system/employee/employee.vue')
      },
      {
        path: 'resource',
        name: 'resource',
        meta: {
          title: '资源'
        },
        component: () => import('../views/system/resource/resource.vue')
      },
      {
        path: 'role',
        name: 'role',
        meta: {
          title: '角色'
        },
        component: () => import('../views/system/role/role.vue')
      },
      {
        path: 'person',
        name: 'person',
        meta: {
          title: '个人中心'
        },
        component: () => import('../views/system/person/person.vue')
      }
    ]
  },
  {
    path: '*',
    name: 'error_404',
    meta: {
      hideInMenu: true
    },
    component: () => import('../views/error/404.vue')
  }
]
