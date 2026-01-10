<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const isAuthenticated = ref(!!localStorage.getItem('token'))

function syncAuth() {
  isAuthenticated.value = !!localStorage.getItem('token')
}

function handleLogoutClick() {
  localStorage.removeItem('token')
  isAuthenticated.value = false
  router.push({ name: 'home' })
}

onMounted(() => {
  window.addEventListener('storage', syncAuth)
})

onUnmounted(() => {
  window.removeEventListener('storage', syncAuth)
})
</script>

<template>
  <div class="navbar bg-base-100 shadow-sm flex justify-between">
    <button class="btn btn-ghost text-xl" @click="router.push({ name: 'home' })">
      Contacts - Alfasoft
    </button>

    <div class="flex gap-4">
      <button class="btn btn-accent" @click="router.push({ name: 'new' })">New</button>
      <button class="btn btn-info" v-if="isAuthenticated" @click="handleLogoutClick">
        Logout
      </button>
    </div>
  </div>
</template>
