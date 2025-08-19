<template>
  <!-- Navigation Header -->
  <nav class="bg-white shadow-sm border-b border-blue-100 sticky top-0 z-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16">
        <!-- Logo -->
  <div class="flex items-center gap-1">
          <img src="/logo.png" alt="Logo Mandala" class="h-16 w-auto object-contain align-middle" style="background:transparent;" />
          <span class="text-2xl font-bold text-blue-600 align-middle">daTAMANDALA</span>
        </div>
        <!-- Desktop Navigation -->
        <div class="hidden md:flex items-center space-x-8">
          <NuxtLink to="/" class="flex items-center gap-2 text-gray-700 hover:text-blue-600 font-medium transition-colors duration-300 hover:scale-105">
            <span class="text-lg">🏠</span>
            Beranda
          </NuxtLink>
          <NuxtLink to="/linimasa" class="flex items-center gap-2 text-gray-700 hover:text-blue-600 font-medium transition-colors duration-300 hover:scale-105">
            <span class="text-lg">🕒</span>
            Lini Masa
          </NuxtLink>
          <NuxtLink to="/unduhan" class="flex items-center gap-2 text-gray-700 hover:text-blue-600 font-medium transition-colors duration-300 hover:scale-105">
            <span class="text-lg">⬇️</span>
            Unduhan
          </NuxtLink>
          <a href="#faq" class="flex items-center gap-2 text-gray-700 hover:text-blue-600 font-medium transition-colors duration-300 hover:scale-105">
            <span class="text-lg">❓</span>
            FAQ
          </a>
          <NuxtLink to="/login" class="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-2 rounded-lg font-medium transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl">
            <span class="text-lg">🔑</span>
            Masuk
          </NuxtLink>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const nama = ref('User')
const showDropdown = ref(false)
const notificationCount = ref(3)
const isLoggingOut = ref(false)
const router = useRouter()

const handleLogout = () => {
  if (!window.confirm('Apakah Anda yakin ingin logout?')) return
  isLoggingOut.value = true
  try {
    localStorage.removeItem('user')
    localStorage.removeItem('token')
    localStorage.removeItem('authToken')
    showDropdown.value = false
    router.push('/')
  } catch (error) {
    isLoggingOut.value = false
    window.alert('Terjadi kesalahan saat logout. Silakan coba lagi.')
  }
}

onMounted(() => {
  const user = localStorage.getItem('user')
  if (user) {
    try {
      const parsed = JSON.parse(user)
      nama.value = parsed.nama || 'User'
    } catch {
      nama.value = 'User'
    }
  } else {
    nama.value = 'User'
  }
})
</script>

<style scoped>
.font-sans {
  font-family: 'Poppins', sans-serif;
}
</style>
