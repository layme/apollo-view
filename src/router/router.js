import Vue from 'vue'
import Router from 'vue-router'
import routers from './routers.js'

Vue.use(Router)

/**
 * meta {
 *   title: 标题
 *   hideMenu: 隐藏菜单
 * }
 */
export default new Router({
  routes: routers
})
