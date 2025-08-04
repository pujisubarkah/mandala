<template>
  <header class="w-full flex items-center justify-between px-8 py-4 bg-white shadow-sm border-b border-gray-200 relative overflow-visible">
    <!-- Background Decorations -->
    <div class="absolute top-0 left-0 w-96 h-full bg-gradient-to-r from-blue-50/30 to-transparent"></div>
    <div class="absolute top-0 right-0 w-96 h-full bg-gradient-to-l from-blue-100/20 to-transparent"></div>
    <!-- Left Section - Logo -->
    <div class="flex items-center gap-4 relative z-10">
      <div class="flex items-center gap-3">
        <div class="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-md hover:scale-105 transition-transform duration-300">
          <span class="text-xl font-black text-white">F</span>
        </div>
        <div class="flex flex-col">
          <span class="text-xl font-black text-blue-600">MANDALA</span>
          <span class="text-xs text-blue-500 font-medium -mt-1">Admin Panel</span>
        </div>
      </div>
      <div class="hidden md:block w-px h-8 bg-gray-300 mx-2"></div>
      <div class="hidden md:block">
        <p class="text-gray-600 text-sm font-medium">Fungsional Online System</p>
        <p class="text-gray-500 text-xs">Dashboard Management</p>
      </div>
    </div>
    <!-- Right Section - Actions -->
    <div class="flex items-center gap-4 relative z-10">
      <!-- Notifications -->
      <div class="relative">
        <button class="group relative p-3 rounded-xl bg-gray-50 border border-gray-200 hover:bg-[#C2E7F6]/50 transition-all duration-300 hover:scale-105">
          <span class="text-xl text-gray-600 group-hover:text-blue-700 transition-colors duration-300">🔔</span>
          <div v-if="notificationCount > 0" class="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-red-500 to-red-600 rounded-full flex items-center justify-center">
            <span class="text-xs font-bold text-white">{{ notificationCount }}</span>
          </div>
          <div class="absolute -top-1 -right-1 w-5 h-5 bg-red-400 rounded-full animate-ping opacity-20"></div>
        </button>
      </div>
      <!-- User Profile Dropdown -->
      <div class="relative">
        <button 
          class="group flex items-center gap-3 px-4 py-2 rounded-xl bg-gray-50 border border-gray-200 hover:bg-[#C2E7F6]/50 transition-all duration-300 hover:scale-105"
          @click="showDropdown = !showDropdown"
        >
          <div class="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
            <span class="text-white text-sm">👤</span>
          </div>
          <div class="hidden sm:block text-left">
            <p class="text-gray-800 font-semibold text-sm">{{ nama }}</p>
            <p class="text-gray-600 text-xs">Administrator</p>
          </div>
          <span :class="['text-gray-600 transition-transform duration-300', showDropdown ? 'rotate-180' : '']">▼</span>
        </button>
        <!-- Dropdown Menu -->
        <div v-if="showDropdown" class="absolute top-full right-0 mt-2 w-56 bg-white backdrop-blur-lg rounded-xl shadow-xl border border-gray-200 overflow-hidden z-[200]">
          <div class="p-4 bg-[#C2E7F6]/30 border-b border-gray-200">
            <p class="font-semibold text-gray-800">{{ nama }}</p>
            <p class="text-sm text-gray-600">admin@mandala.com</p>
          </div>
          <div class="p-2">
            <button class="group w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-blue-50 transition-colors duration-200">
              <div class="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-200 transition-colors duration-200">
                <span class="text-blue-600 text-sm">👤</span>
              </div>
              <span class="text-gray-700 font-medium">Profile Settings</span>
            </button>
            <button class="group w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-purple-50 transition-colors duration-200">
              <div class="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center group-hover:bg-purple-200 transition-colors duration-200">
                <span class="text-purple-600 text-sm">⚙️</span>
              </div>
              <span class="text-gray-700 font-medium">System Settings</span>
            </button>
            <NuxtLink to="/" class="group w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-green-50 transition-colors duration-200">
              <div class="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center group-hover:bg-green-200 transition-colors duration-200">
                <span class="text-green-600 text-sm">🏠</span>
              </div>
              <span class="text-gray-700 font-medium">Test Home</span>
            </NuxtLink>
            <div class="border-t border-gray-200 my-2"></div>
            <button 
              class="group w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-red-50 transition-colors duration-200 disabled:opacity-50"
              @click="handleLogout"
              :disabled="isLoggingOut"
            >
              <div class="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center group-hover:bg-red-200 transition-colors duration-200">
                <span class="text-red-600 text-sm">🚪</span>
              </div>
              <span class="text-gray-700 font-medium">
                {{ isLoggingOut ? 'Logging out...' : 'Logout' }}
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- Click outside to close dropdown -->
    <div v-if="showDropdown" class="fixed inset-0 z-[150]" @click="showDropdown = false"></div>
  </header>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const nama = ref('User');
const showDropdown = ref(false);
const notificationCount = ref(3);
const isLoggingOut = ref(false);
const router = useRouter();

function handleLogout() {
  if (!window.confirm('Apakah Anda yakin ingin logout?')) return;
  isLoggingOut.value = true;
  try {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.removeItem('authToken');
    showDropdown.value = false;
    router.push('/');
  } catch (error) {
    isLoggingOut.value = false;
    window.alert('Terjadi kesalahan saat logout. Silakan coba lagi.');
  }
}

onMounted(() => {
  const user = localStorage.getItem('user');
  if (user) {
    try {
      const parsed = JSON.parse(user);
      nama.value = parsed.nama || 'User';
    } catch {
      nama.value = 'User';
    }
  } else {
    nama.value = 'User';
  }
});
</script>
