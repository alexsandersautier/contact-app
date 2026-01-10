import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/pages/HomePage.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/pages/LoginPage.vue')
    },
    {
      path: '/details/:id',
      name: 'details',
      meta: {
        requiresAuth: true,
      },
      component: () => import('@/pages/DetailsPage.vue')
    },
    {
      path: '/new',
      name: 'new',
      meta: {
        requiresAuth: true,
      },
      component: () => import('@/pages/NewContactPage.vue')
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('@/pages/RegisterPage.vue')
    }
  ],
})


router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  const isAuthenticated = localStorage.getItem('token')
  if (requiresAuth && !isAuthenticated) {
    next({ name: 'login' })
  } else {
    next()
  }
})


export default router
