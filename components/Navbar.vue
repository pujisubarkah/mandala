<template>
  <!-- Navigation Header -->
  <nav class="bg-white/95 backdrop-blur-md shadow-sm border-b border-blue-100 sticky top-0 z-50 transition-all duration-300">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16">

        <!-- 🔹 KIRI: Logo + Judul Aplikasi -->
        <div class="flex items-center gap-3 flex-shrink-0">
          <div class="flex items-center gap-2">
            <img src="/lanri.png" alt="LAN RI" class="h-10 w-auto object-contain" />
            <img src="/berakhlak.png" alt="BerAKHLAK" class="h-10 w-auto object-contain" />
            <img src="/bangga.png" alt="Bangga Melayani Bangsa" class="h-10 w-auto object-contain" />
            <img src="/logo.png" alt="Mandala" class="h-10 w-auto object-contain" />
          </div>
          <span class="text-xl font-extrabold text-blue-700 tracking-tight">daTAMANDALA</span>
        </div>

        <!-- 🔹 KANAN: Menu Navigasi (Desktop) - Rata Kanan -->
        <div class="hidden md:flex items-center space-x-6">
          <NuxtLink 
            v-for="item in navItems" 
            :key="item.to" 
            :to="item.to" 
            :href="item.href"
            class="flex items-center gap-2 px-3 py-2 rounded-lg text-gray-700 hover:text-blue-600 hover:bg-blue-50 font-medium transition-all duration-200"
          >
            <span class="text-lg">{{ item.icon }}</span>
            {{ item.label }}
          </NuxtLink>

          <!-- Tombol Masuk - Paling Kanan -->
          <NuxtLink 
            to="/login" 
            class="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-5 py-2.5 rounded-xl font-medium transition-all duration-300 hover:scale-105 shadow-md hover:shadow-lg"
          >
            <span class="text-lg">🔑</span>
            Masuk
          </NuxtLink>
        </div>

        <!-- 🔹 Mobile Menu Button (di kanan) -->
        <div class="md:hidden">
          <button 
            @click="showDropdown = !showDropdown"
            class="text-gray-700 hover:text-blue-600 focus:outline-none p-2 rounded-lg hover:bg-gray-100 transition-colors"
            aria-label="Toggle menu"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Mobile Dropdown Menu -->
    <div 
      v-if="showDropdown" 
      class="md:hidden absolute right-4 mt-2 w-60 bg-white rounded-xl shadow-xl border border-gray-200 overflow-hidden z-50 animate-fadeIn"
    >
      <div class="py-2">
        <NuxtLink 
          v-for="item in navItems" 
          :key="item.to" 
          :to="item.to" 
          :href="item.href"
          class="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200"
          @click="showDropdown = false"
        >
          <span class="text-lg">{{ item.icon }}</span>
          <span class="font-medium">{{ item.label }}</span>
        </NuxtLink>

        <hr class="my-2 border-gray-200">

        <NuxtLink 
          to="/login" 
          class="flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-medium rounded-lg transition-all duration-200 hover:from-blue-700"
          @click="showDropdown = false"
        >
          <span class="text-lg">🔑</span>
          Masuk
        </NuxtLink>

        <button 
          @click="handleLogout" 
          class="w-full text-left px-4 py-3 text-red-600 font-medium hover:bg-red-50 transition-colors duration-200"
        >
          Logout
        </button>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const showDropdown = ref(false)
const router = useRouter()

// Data menu untuk clean code
const navItems = [
  { label: 'Beranda', to: '/', icon: '🏠' },
  { label: 'Lini Masa', to: '/linimasa', icon: '🕒' },
  { label: 'Unduhan', to: '/unduhan', icon: '⬇️' },
  { label: 'FAQ', href: '#faq', icon: '❓' }
]

const handleLogout = () => {
  if (!window.confirm('Apakah Anda yakin ingin logout?')) return
  localStorage.removeItem('user')
  localStorage.removeItem('token')
  localStorage.removeItem('authToken')
  showDropdown.value = false
  router.push('/')
}
</script>

<style scoped>
.animate-fadeIn {
  animation: fadeIn 0.2s ease-out;
}
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>