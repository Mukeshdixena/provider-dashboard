<!-- src/views/Home.vue -->
<template>
  <div class="min-vh-100 bg-gradient-pink d-flex align-items-center text-white">
    <div class="container text-center">
      <h1 class="display-3 fw-bold mb-4">
        <i class="bi bi-shop-window"></i><br>
        BeautyBook Provider Portal
      </h1>
      <p class="lead fs-3 mb-5 opacity-90">
        Manage bookings, services & grow your salon business
      </p>
      <div class="d-flex gap-3 justify-content-center flex-wrap">
        <router-link to="/login" class="btn btn-dark btn-lg rounded-pill px-5 fw-bold">
          Login to Dashboard
        </router-link>
        <router-link to="/register" class="btn btn-outline-light btn-lg rounded-pill px-5 fw-bold">
          Request Access
        </router-link>
      </div>
    </div>
  </div>
</template>

<style scoped>
.bg-gradient-pink { background: linear-gradient(135deg, #ff6bd6, #ff8fab) !important; }
</style>