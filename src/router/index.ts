// src/router/index.ts → FULL PROVIDER DASHBOARD ROUTES
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
    // Public Routes
    { path: '/', name: 'home', component: () => import('../views/Home.vue') },
    { path: '/login', name: 'login', component: () => import('../views/auth/Login.vue') },
    { path: '/register', name: 'register', component: () => import('../views/auth/Register.vue') },

    // PROTECTED PROVIDER DASHBOARD (Nested Layout)
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

    // 404
    { path: '/:pathMatch(.*)*', redirect: '/' }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
    scrollBehavior() {
        return { top: 0 }
    }
})

// AUTH GUARD
router.beforeEach((to, from, next) => {
    const token = localStorage.getItem('provider_token')
    const userData = localStorage.getItem('provider')
    const user = userData ? JSON.parse(userData) : null

    // If route requires auth
    if (to.meta.requiresAuth && !token) {
        return next('/login')
    }

    // Role check
    if (to.meta.allowedRoles && user && !to.meta.allowedRoles.includes(user.role)) {
        return next('/login')
    }

    // If already logged in, don't allow access to login/register
    if (token && (to.name === 'login' || to.name === 'register')) {
        return next('/provider')
    }

    next()
})

export default router