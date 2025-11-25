import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  { path: '/', name: 'home', component: () => import('../views/Home.vue') },
  { path: '/login', name: 'login', component: () => import('../views/auth/Login.vue') },
  { path: '/register', name: 'register', component: () => import('../views/auth/Register.vue') },

  {
    path: '/provider',
    component: () => import('../views/ProviderLayout.vue'),
    meta: { requiresAuth: true, allowedRoles: ['PROVIDER'] },
    children: [
      { path: '', redirect: { name: 'provider-dashboard' } },
      {
        path: 'dashboard',
        name: 'provider-dashboard',
        component: () => import('../views/dashboard/DashboardHome.vue'),
        meta: { title: 'Dashboard' }
      },
      {
        path: 'queue',
        name: 'provider-queue',
        component: () => import('../views/queue/Queue.vue'),
        meta: { title: "Today's Queue" }
      },
      {
        path: 'services',
        name: 'provider-services',
        component: () => import('../views/services/Services.vue'),
        meta: { title: 'Services' }
      },
      {
        path: 'bookings',
        name: 'provider-bookings',
        component: () => import('../views/bookings/Bookings.vue'),
        meta: { title: 'All Bookings' }
      },
      {
        path: 'earnings',
        name: 'provider-earnings',
        component: () => import('../views/earnings/Earnings.vue'),
        meta: { title: 'Earnings' }
      }
    ]
  },

  { path: '/:pathMatch(.*)*', redirect: '/' }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 }
  }
})

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('provider_token')
  const userData = localStorage.getItem('provider')
  const user = userData ? JSON.parse(userData) : null

  if (to.meta.requiresAuth && !token) {
    return next('/login')
  }

  const allowedRoles = to.meta.allowedRoles as string[] | undefined
  if (allowedRoles && user && !allowedRoles.includes(user.role)) {
    return next('/login')
  }

  if (token && (to.name === 'login' || to.name === 'register')) {
    return next('/provider')
  }

  next()
})

export default router
