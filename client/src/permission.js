/*
 * @Author: beyondouyuan
 * @Date:   2018-12-10 13:53:30
 * @Last Modified by:   beyondouyuan
 * @Last Modified time: 2019-02-15 02:05:49
 */

import router from '@/router'
import store from '@/store'


router.beforeEach((to, redirect, next) => {

  if (to.path === '/login' || to.path === '/register' || to.path.includes('/user')) {
    next()
  } else {
    console.log('权限菜单')
    if (!store.state.user.userInfo.token) {
      next({
        path: '/login',
        query: {
          redirect: to.fullPath
        } // 将跳转的路由path作为参数，登录成功后跳转到该路由
      })
    } else {
      next()
    }
  }
})

router.afterEach(() => {})
