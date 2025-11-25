<!-- src/views/Dashboard.vue -->
<template>
  <div class="min-vh-100 bg-light">
    <nav class="navbar bg-white shadow-sm sticky-top">
      <div class="container-fluid">
        <span class="navbar-brand fw-bold text-pink">
          <i class="bi bi-shop-window"></i> {{ providerName }} Dashboard
        </span>
        <button @click="logout" class="btn btn-outline-danger rounded-pill">
          Logout
        </button>
      </div>
    </nav>
    <div class="container py-5">
      <h1>Welcome back, Owner!</h1>
      <p class="lead">Your salon dashboard is ready.</p>
      <div class="alert alert-info">
        Full dashboard with bookings, revenue, calendar coming next!
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const providerName = computed(() => {
  const p = localStorage.getItem('provider')
  return p ? JSON.parse(p).salonName || 'Salon Owner' : 'Owner'
})

const logout = () => {
  localStorage.removeItem('provider_token')
  localStorage.removeItem('provider')
  router.push('/')
}
</script>