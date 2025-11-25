<!-- src/views/auth/Register.vue → MATCHES YOUR /provider/register -->
<template>
  <div class="min-vh-100 bg-light d-flex align-items-center justify-content-center">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-md-8 col-lg-6">
          <div class="card shadow-lg border-0 rounded-4">
            <div class="card-header bg-gradient-pink text-white text-center py-5">
              <h2 class="mb-0 fw-bold">
                <i class="bi bi-shop-window fs-1 d-block mb-3"></i>
                Request Salon Access
              </h2>
            </div>
            <div class="card-body p-5">
              <form @submit.prevent="register">
                <div class="row g-3">
                  <div class="col-md-6">
                    <input v-model="form.name" type="text" class="form-control form-control-lg" placeholder="Your Full Name" required />
                  </div>
                  <div class="col-md-6">
                    <input v-model="form.phone" type="tel" class="form-control form-control-lg" placeholder="Phone Number" required />
                  </div>
                  <div class="col-12">
                    <input v-model="form.email" type="email" class="form-control form-control-lg" placeholder="Email Address" required />
                  </div>
                  <div class="col-12">
                    <input v-model="form.password" type="password" class="form-control form-control-lg" placeholder="Create Password" required minlength="6" />
                  </div>
                </div>

                <button type="submit" class="btn btn-pink btn-lg w-100 rounded-pill mt-4 fw-bold" :disabled="loading">
                  <span v-if="loading" class="spinner-border spinner-border-sm me-2"></span>
                  Submit Request
                </button>
              </form>

              <div class="text-center mt-4">
                <router-link to="/login" class="text-pink small">← Back to Login</router-link>
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
  name: '',
  email: '',
  password: '',
  phone: ''
})

const register = async () => {
  loading.value = true
  try {
    await api.post('/auth/provider/register', form.value)  // EXACTLY matches your backend

    alert('Salon registered! Waiting for admin approval.')
    router.push('/login')
  } catch (err: any) {
    alert(err.response?.data || 'Registration failed. Try again.')
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