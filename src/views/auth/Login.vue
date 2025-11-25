<!-- src/views/auth/Login.vue → CONNECTED TO YOUR BACKEND -->
<template>
  <div class="min-vh-100 bg-light d-flex align-items-center justify-content-center">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-md-6 col-lg-5">
          <div class="card shadow-lg border-0 rounded-4 overflow-hidden">
            <div class="card-header bg-gradient-pink text-white text-center py-5">
              <h2 class="mb-0 fw-bold">
                <i class="bi bi-shop-window fs-1 d-block mb-3"></i>
                Salon Owner Login
              </h2>
            </div>
            <div class="card-body p-5">
              <form @submit.prevent="login">
                <div class="mb-4">
                  <label class="form-label fw-bold">Email</label>
                  <input v-model="form.email" type="email" class="form-control form-control-lg" required placeholder="owner@glamour.com" />
                </div>
                <div class="mb-4">
                  <label class="form-label fw-bold">Password</label>
                  <input v-model="form.password" type="password" class="form-control form-control-lg" required />
                </div>

                <button type="submit" class="btn btn-pink btn-lg w-100 rounded-pill fw-bold" :disabled="loading">
                  <span v-if="loading" class="spinner-border spinner-border-sm me-2"></span>
                  Login to Dashboard
                </button>
              </form>

              <div class="text-center mt-4">
                <p class="small text-muted">
                  Not registered yet? 
                  <router-link to="/register" class="text-pink fw-bold">Request Access</router-link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import api from '@/api'

const router = useRouter()
const loading = ref(false)

const form = ref({
  email: '',
  password: ''
})

const login = async () => {
  loading.value = true
  try {
    const res = await api.post('/auth/provider/login', form.value)  // Matches your backend

    // Save token and user data
    localStorage.setItem('provider_token', res.data.token)
    localStorage.setItem('provider', JSON.stringify({
      id: res.data.userId,
      name: res.data.name,
      email: res.data.email,
      role: res.data.role
    }))

    router.push('/provider/dashboard')
  } catch (err: any) {
    alert(err.response?.data || 'Invalid email or password')
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.bg-gradient-pink { background: linear-gradient(135deg, #ff6bd6, #ff8fab) !important; }
.btn-pink { background: linear-gradient(135deg, #ff6bd6, #ff8fab); border: none; color: white; }
.btn-pink:hover { background: linear-gradient(135deg, #ff4ac6, #ff7a9b); }
.text-pink { color: #ff6bd6; }
</style>