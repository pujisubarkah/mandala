<template>
  <aside class="w-72 min-h-screen bg-white shadow-lg flex flex-col p-8 text-gray-800 relative overflow-visible border-r border-gray-200">
    <!-- Background Decorations -->
    <div class="absolute -top-20 -left-20 w-60 h-60 bg-gradient-to-r from-blue-100/40 to-blue-200/40 rounded-full blur-3xl" />
    <div class="absolute top-1/2 -right-20 w-40 h-40 bg-gradient-to-l from-blue-50/60 to-blue-100/60 rounded-full blur-2xl" />
    <div class="absolute bottom-0 left-1/2 w-80 h-20 bg-gradient-to-r from-blue-50/30 to-blue-100/30 rounded-full blur-xl" />
    <!-- Logo Section -->
    <div class="relative z-10 mb-8">
      <div class="flex items-center gap-3 mb-4">
        <div class="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-md">
          <span class="text-2xl font-black text-white">🗂️</span>
        </div>
        <div>
          <h1 class="text-2xl font-extrabold text-blue-700 tracking-tight">daTAMandala</h1>
          <p class="text-xs text-blue-500 font-medium tracking-wider">Sistem Platform NIAKN</p>
        </div>
      </div>
      <div class="h-1 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full shadow-sm"></div>
    </div>
    <!-- Navigation -->
    <nav class="flex flex-col gap-3 text-base font-medium z-10 flex-1">
      <template v-for="item in props.menu" :key="item.label">
        <NuxtLink v-if="item.type === 'main'" :to="item.to" class="group">
          <div class="flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-300 hover:bg-[#C2E7F6]/50 hover:shadow-sm border border-transparent hover:border-blue-200">
            <div class="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
              <span class="text-white text-lg">{{ item.icon }}</span>
            </div>
            <span class="group-hover:text-blue-700 transition-colors duration-300 text-gray-700">{{ item.label }}</span>
          </div>
        </NuxtLink>
        <div v-else-if="item.type === 'dropdown'">
          <div class="flex items-center gap-4 px-4 py-3 rounded-xl">
            <div class="w-10 h-10 rounded-lg flex items-center justify-center"
              :class="item.icon === '👤' ? 'bg-gradient-to-br from-emerald-500 to-emerald-600' : item.icon === '📚' ? 'bg-gradient-to-br from-purple-500 to-purple-600' : 'bg-gradient-to-br from-orange-500 to-orange-600'">
              <span class="text-white text-lg">{{ item.icon }}</span>
            </div>
            <span :class="[item.icon === '👤' ? 'text-emerald-700' : item.icon === '📚' ? 'text-purple-700' : 'text-orange-700', 'flex-1 text-left text-gray-700']">{{ item.label }}</span>
          </div>
          <div class="ml-10 flex flex-col gap-1">
            <NuxtLink v-for="child in item.children" :key="child.to" :to="child.to" class="px-4 py-2 rounded-lg text-sm text-gray-600 hover:bg-blue-50 flex items-center gap-2">
              <span v-if="child.icon">{{ child.icon }}</span>
              {{ child.label }}
            </NuxtLink>
          </div>
        </div>
      </template>
    </nav>
    <!-- Footer & Logout -->
    <div class="relative z-10 mt-8 pt-6 border-t border-gray-200">
      <div class="flex items-center gap-3 px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 mb-2">
        <div class="w-8 h-8 bg-gradient-to-br from-gray-400 to-gray-500 rounded-lg flex items-center justify-center">
          <span class="text-white text-sm">⚙️</span>
        </div>
        <div class="flex-1">
          <p class="text-xs text-gray-600 font-medium">System v2.0</p>
          <p class="text-xs text-gray-500">Admin Panel</p>
        </div>
      </div>
      <div 
        role="button"
        class="flex items-center gap-3 px-4 py-3 rounded-xl bg-red-50 border border-red-200 cursor-pointer hover:bg-red-100 transition-colors duration-200"
        @click="handleLogout"
        tabindex="0"
        style="pointer-events:auto; user-select:none;"
      >
        <div class="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
          <span class="text-red-600 text-sm">🚪</span>
        </div>
        <span class="text-red-700 font-medium">Logout</span>
      </div>
    </div>
  </aside>
</template>

<script setup>
import { ref } from 'vue';

function handleLogout() {
  if (!window.confirm('Apakah Anda yakin ingin logout?')) return;
  localStorage.removeItem('user');
  localStorage.removeItem('token');
  localStorage.removeItem('authToken');
  window.location.href = '/';
}

const props = defineProps({
  menu: {
    type: Array,
    required: true
  }
});
</script>
