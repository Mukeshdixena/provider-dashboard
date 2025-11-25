<template>
    <div class="d-flex min-vh-100 bg-light">
        <div class="bg-white shadow-sm border-end d-flex flex-column" style="width: 280px;">
            <div class="p-4 border-bottom">
                <h4 class="fw-bold text-pink mb-1">
                    <i class="bi bi-shop-window"></i> {{ salonName }}
                </h4>
                <small class="text-muted">Provider Portal</small>
            </div>

            <nav class="nav flex-column flex-grow-1 p-3">
                <router-link to="/provider/dashboard"
                    class="nav-link py-3 px-4 rounded-3 mb-2 d-flex align-items-center gap-3"
                    active-class="bg-pink bg-opacity-10 text-pink fw-bold">
                    <i class="bi bi-speedometer2"></i> Dashboard
                </router-link>
                <router-link to="/provider/queue"
                    class="nav-link py-3 px-4 rounded-3 mb-2 d-flex align-items-center gap-3"
                    active-class="bg-pink bg-opacity-10 text-pink fw-bold">
                    <i class="bi bi-people-fill"></i> Today's Queue
                </router-link>
                <router-link to="/provider/services"
                    class="nav-link py-3 px-4 rounded-3 mb-2 d-flex align-items-center gap-3"
                    active-class="bg-pink bg-opacity-10 text-pink fw-bold">
                    <i class="bi bi-scissors"></i> Services
                </router-link>
                <router-link to="/provider/bookings"
                    class="nav-link py-3 px-4 rounded-3 mb-2 d-flex align-items-center gap-3"
                    active-class="bg-pink bg-opacity-10 text-pink fw-bold">
                    <i class="bi bi-calendar-check"></i> All Bookings
                </router-link>
                <router-link to="/provider/earnings"
                    class="nav-link py-3 px-4 rounded-3 mb-2 d-flex align-items-center gap-3"
                    active-class="bg-pink bg-opacity-10 text-pink fw-bold">
                    <i class="bi bi-currency-rupee"></i> Earnings
                </router-link>
            </nav>

            <div class="p-3 border-top">
                <button @click="logout" class="btn btn-outline-danger w-100 rounded-pill">
                    <i class="bi bi-box-arrow-right"></i> Logout
                </button>
            </div>
        </div>

        <div class="flex-grow-1 d-flex flex-column">
            <nav class="navbar bg-white shadow-sm sticky-top border-bottom">
                <div class="container-fluid px-4">
                    <span class="navbar-text fw-bold text-dark fs-5">
                        {{ currentPageTitle }}
                    </span>

                    <div class="dropdown">
                        <button
                            class="btn btn-light border rounded-pill px-3 dropdown-toggle d-flex align-items-center gap-2"
                            type="button" data-bs-toggle="dropdown">
                            <span class="text-muted small">Welcome,</span>
                            <strong>{{ userName }}</strong>
                        </button>

                        <ul class="dropdown-menu dropdown-menu-end shadow-sm">
                            <li>
                                <button class="dropdown-item" @click="router.push('/provider/profile')">
                                    <i class="bi bi-person-circle me-2"></i> Profile
                                </button>
                            </li>
                            <li>
                                <hr class="dropdown-divider">
                            </li>
                            <li>
                                <button class="dropdown-item text-danger" @click="logout">
                                    <i class="bi bi-box-arrow-right me-2"></i> Logout
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

            <main class="flex-grow-1 p-4 p-md-5">
                <router-view />
            </main>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

const userData = localStorage.getItem('provider')
const user = userData ? JSON.parse(userData) : {}

const salonName = computed(() => user.salonName || user.name || 'My Salon')
const userName = computed(() => user.name || 'Owner')

const currentPageTitle = computed(() => {
    return route.meta.title as string || 'Dashboard'
})

const logout = () => {
    localStorage.removeItem('provider_token')
    localStorage.removeItem('provider')
    router.push('/login')
}
</script>

<style scoped>
.nav-link {
    color: #555 !important;
    transition: all 0.2s;
}

.nav-link:hover {
    background: #f8f9fa;
    color: #333 !important;
}

.text-pink {
    color: #ff6bd6;
}

.bg-pink {
    background-color: #ff6bd6;
}
</style>
