import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

export const constRoutes: RouteRecordRaw[] = []

export const asyncRoutes: RouteRecordRaw[] = []

const router = createRouter({
  history: createWebHistory(),
  routes: constRoutes,
  scrollBehavior(_to, _from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  }
})

export default router
