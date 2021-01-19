import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: 路由配置项
 *
 * hidden: true                   // 当设置 true 的时候该路由不会再侧边栏出现 如401，login等页面，或者如一些编辑页面/edit/1
 * alwaysShow: true               // 当你一个路由下面的 children 声明的路由大于1个时，自动会变成嵌套的模式--如组件页面
 *                                // 只有一个时，会将那个子路由当做根路由显示在侧边栏--如引导页面
 *                                // 若你想不管路由下面的 children 声明的个数都显示你的根路由
 *                                // 你可以设置 alwaysShow: true，这样它就会忽略之前定义的规则，一直显示根路由
 * redirect: noRedirect           // 当设置 noRedirect 的时候该路由在面包屑导航中不可被点击
 * name:'router-name'             // 设定路由的名字，一定要填写不然使用<keep-alive>时会出现各种问题
 * meta : {
    roles: ['admin','editor']    // 设置该路由进入的权限，支持多个权限叠加
    title: 'title'               // 设置该路由在侧边栏和面包屑中展示的名字
    icon: 'svg-name'             // 设置该路由的图标，对应路径src/icons/svg
    breadcrumb: false            // 如果设置为false，则不会在breadcrumb面包屑中显示
  }
 */

// 公共路由
export const constantRoutes = [
  // {
  //   path: '/project',
  //   component: Layout,
  //   hidden: true,
  //   redirect: 'noredirect',
  //   children: [
  //     {
  //       path: '/projectView',
  //       component: (resolve) => require(['@/views/project/projectView/index'], resolve),
  //       name: 'Profile',
  //       meta: { title: '个人中心', icon: 'user' }
  //     }
  //   ]
  // },
  {
    path: '/system',
    component: Layout,
    hidden: true,
    redirect: 'noredirect',
    children: [
      {
        path: '/user',
        component: (resolve) => require(['@/views/system/user/index'], resolve),
        name: 'Profile',
        meta: { title: '人员管理', icon: 'user' }
      },
      {
        path: '/role',
        component: (resolve) => require(['@/views/system/role/index'], resolve),
        name: 'Profile',
        meta: { title: '角色管理', icon: 'user' }
      },
      {
        path: '/dept',
        component: (resolve) => require(['@/views/system/dept/index'], resolve),
        name: 'Profile',
        meta: { title: '组织管理', icon: 'user' }
      },
      {
        path: '/post',
        component: (resolve) => require(['@/views/system/post/index'], resolve),
        name: 'Profile',
        meta: { title: '岗位管理', icon: 'user' }
      }
    ]
  },
  {
    path: '/monitor',
    component: Layout,
    hidden: true,
    redirect: 'noredirect',
    children: [
      {
        path: '/menu',
        component: (resolve) => require(['@/views/system/menu/index'], resolve),
        name: 'Profile',
        meta: { title: '个人中心', icon: 'user' }
      }
    ]
  },
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: (resolve) => require(['@/views/redirect'], resolve)
      },
      {
        path: '/addDayReport',
        component: (resolve) => require(['@/views/workReport/addDayReport/index'], resolve),
      },
      {
        path: '/qualityDetail',
        component: (resolve) => require(['@/views/qualityProblem/qualityDetail/index'], resolve),
      },
      {
        path: '/securityDetail',
        component: (resolve) => require(['@/views/securityProblem/securityDetail/index'], resolve),
        // name: '质量详情',
        // meta: { title: '质量详情', icon: 'dashboard', noCache: true, affix: true }
      },
      {
        path: '/qualityPlanDetail',
        component: (resolve) => require(['@/views/qualityPlan/qualityPlanDetail/index'], resolve),
        // name: '质量详情',
        // meta: { title: '质量详情', icon: 'dashboard', noCache: true, affix: true }
      },
      {
        path: '/sealedBox',
        component: (resolve) => require(['@/views/monitor/projectView/index'], resolve),
      },

    ]
  },
  {
    path: '/login',
    component: (resolve) => require(['@/views/login'], resolve),
    hidden: true
  },
  {
    path: '/forgetPassword',
    component: (resolve) => require(['@/views/forgetPassword'], resolve),
    hidden: true
  },
  {
    path: '/resetPassword',
    component: (resolve) => require(['@/views/resetPassword'], resolve),
    hidden: true
  },
  {
    path: '/404',
    component: (resolve) => require(['@/views/error/404'], resolve),
    hidden: true
  },
  {
    path: '/401',
    component: (resolve) => require(['@/views/error/401'], resolve),
    hidden: true
  },
  {
    path: '',
    component: Layout,
    redirect: 'index',
    children: [
      {
        path: 'index',
        component: (resolve) => require(['@/views/index'], resolve),
        name: '首页',
        meta: { title: '首页', icon: 'dashboard', noCache: true, affix: true }
      },
    ]
  },
  {
    path: '/user',
    component: Layout,
    hidden: true,
    redirect: 'noredirect',
    children: [
      {
        path: 'profile',
        component: (resolve) => require(['@/views/system/user/profile/index'], resolve),
        name: 'Profile',
        meta: { title: '个人中心', icon: 'user' }
      }
    ]
  },
  {
    path: '/dict',
    component: Layout,
    hidden: true,
    children: [
      {
        path: 'type/data/:dictId(\\d+)',
        component: (resolve) => require(['@/views/system/dict/data'], resolve),
        name: 'Data',
        meta: { title: '字典数据', icon: '' }
      }
    ]
  },
  {
    path: '/job',
    component: Layout,
    hidden: true,
    children: [
      {
        path: 'log',
        component: (resolve) => require(['@/views/monitor/job/log'], resolve),
        name: 'JobLog',
        meta: { title: '调度日志' }
      }
    ]
  },
  {
    path: '/gen',
    component: Layout,
    hidden: true,
    children: [
      {
        path: 'edit/:tableId(\\d+)',
        component: (resolve) => require(['@/views/tool/gen/editTable'], resolve),
        name: 'GenEdit',
        meta: { title: '修改生成配置' }
      }
    ]
  }
]

export default new Router({
  mode: 'history', // 去掉url中的#
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})
