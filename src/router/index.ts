// src/router/index.ts
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
    { path: '/', name: 'home', component: () => import('../views/Home.vue') },
    { path: '/login', name: 'login', component: () => import('../views/auth/Login.vue') },
    { path: '/register', name: 'register', component: () => import('../views/auth/Register.vue') },
    {
        path: '/dashboard',
        name: 'dashboard',
        component: () => import('../views/Dashboard.vue'),
        meta: { requiresAuth: true }
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach((to, from, next) => {
    const token = localStorage.getItem('provider_token')

    if (to.meta.requiresAuth && !token) {
        next('/login')
    } else if ((to.name === 'login' || to.name === 'register') && token) {
        next('/dashboard')
    } else {
        next()
    }
})

export default router