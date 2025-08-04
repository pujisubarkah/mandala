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
          <span class="text-2xl font-black text-white">F</span>
        </div>
        <div>
          <h1 class="text-3xl font-black text-blue-600">MANDALA</h1>
          <p class="text-xs text-blue-500 font-medium tracking-wider">FUNGSIONAL ONLINE</p>
        </div>
      </div>
      <div class="h-1 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full shadow-sm"></div>
    </div>
    <!-- Navigation -->
    <nav class="flex flex-col gap-3 text-base font-medium z-10 flex-1">
      <NuxtLink to="/admin/home" class="group">
        <div class="flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-300 hover:bg-[#C2E7F6]/50 hover:shadow-sm border border-transparent hover:border-blue-200">
          <div class="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
            <span class="text-white text-lg">🏠</span>
          </div>
          <span class="group-hover:text-blue-700 transition-colors duration-300 text-gray-700">Dashboard</span>
        </div>
      </NuxtLink>
      <!-- Analis Kebijakan -->
      <div class="relative">
        <button @click="toggleMenu('ak')" class="group flex items-center gap-4 px-4 py-3 w-full rounded-xl transition-all duration-300 hover:bg-[#C2E7F6]/50 hover:shadow-sm border border-transparent hover:border-blue-200">
          <div class="w-10 h-10 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
            <span class="text-white text-lg">👤</span>
          </div>
          <span class="group-hover:text-emerald-700 transition-colors duration-300 flex-1 text-left text-gray-700">Analis Kebijakan</span>
          <span :class="['transition-all duration-300 group-hover:text-emerald-700', openMenu === 'ak' ? 'rotate-90 text-emerald-600' : 'rotate-0 text-gray-500']">▼</span>
        </button>
        <div v-if="openMenu === 'ak'" class="absolute left-full top-0 ml-2 w-56 bg-white border border-gray-200 rounded-xl shadow-xl py-2 z-[100] animate-fadeIn">
          <NuxtLink to="/admin/jumlah-ak" class="group flex items-center gap-3 px-4 py-3 transition-all duration-200 hover:bg-emerald-50">
            <div class="w-2 h-2 bg-emerald-500 rounded-full group-hover:scale-150 transition-transform duration-200"></div>
            <span class="text-sm group-hover:text-emerald-700 text-gray-600">Jumlah AK</span>
          </NuxtLink>
          <NuxtLink to="/admin/analytic-ak" class="group flex items-center gap-3 px-4 py-3 transition-all duration-200 hover:bg-emerald-50">
            <div class="w-2 h-2 bg-emerald-500 rounded-full group-hover:scale-150 transition-transform duration-200"></div>
            <span class="text-sm group-hover:text-emerald-700 text-gray-600">Data Analytic</span>
          </NuxtLink>
        </div>
      </div>
      <!-- Widyaiswara -->
      <div class="relative">
        <button @click="toggleMenu('wi')" class="group flex items-center gap-4 px-4 py-3 w-full rounded-xl transition-all duration-300 hover:bg-[#C2E7F6]/50 hover:shadow-sm border border-transparent hover:border-blue-200">
          <div class="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
            <span class="text-white text-lg">📚</span>
          </div>
          <span class="group-hover:text-purple-700 transition-colors duration-300 flex-1 text-left text-gray-700">Widyaiswara</span>
          <span :class="['transition-all duration-300 group-hover:text-purple-700', openMenu === 'wi' ? 'rotate-90 text-purple-600' : 'rotate-0 text-gray-500']">▼</span>
        </button>
        <div v-if="openMenu === 'wi'" class="absolute left-full top-0 ml-2 w-56 bg-white border border-gray-200 rounded-xl shadow-xl py-2 z-[100] animate-fadeIn">
          <NuxtLink to="/admin/widyaiswara" class="group flex items-center gap-3 px-4 py-3 transition-all duration-200 hover:bg-purple-50">
            <div class="w-2 h-2 bg-purple-500 rounded-full group-hover:scale-150 transition-transform duration-200"></div>
            <span class="text-sm group-hover:text-purple-700 text-gray-600">Jumlah</span>
          </NuxtLink>
          <NuxtLink to="/admin/analytic-wi" class="group flex items-center gap-3 px-4 py-3 transition-all duration-200 hover:bg-purple-50">
            <div class="w-2 h-2 bg-purple-500 rounded-full group-hover:scale-150 transition-transform duration-200"></div>
            <span class="text-sm group-hover:text-purple-700 text-gray-600">Data Analytic</span>
          </NuxtLink>
        </div>
      </div>
      <!-- Analis Bangkom -->
      <div class="relative">
        <button @click="toggleMenu('ab')" class="group flex items-center gap-4 px-4 py-3 w-full rounded-xl transition-all duration-300 hover:bg-[#C2E7F6]/50 hover:shadow-sm border border-transparent hover:border-blue-200">
          <div class="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
            <span class="text-white text-lg">📊</span>
          </div>
          <span class="group-hover:text-orange-700 transition-colors duration-300 flex-1 text-left text-gray-700">Analis Bangkom</span>
          <span :class="['transition-all duration-300 group-hover:text-orange-700', openMenu === 'ab' ? 'rotate-90 text-orange-600' : 'rotate-0 text-gray-500']">▼</span>
        </button>
        <div v-if="openMenu === 'ab'" class="absolute left-full top-0 ml-2 w-56 bg-white border border-gray-200 rounded-xl shadow-xl py-2 z-[100] animate-fadeIn">
          <NuxtLink to="/admin/jumlah-ab" class="group flex items-center gap-3 px-4 py-3 transition-all duration-200 hover:bg-orange-50">
            <div class="w-2 h-2 bg-orange-500 rounded-full group-hover:scale-150 transition-transform duration-200"></div>
            <span class="text-sm group-hover:text-orange-700 text-gray-600">Jumlah</span>
          </NuxtLink>
          <NuxtLink to="/admin/analytic-ab" class="group flex items-center gap-3 px-4 py-3 transition-all duration-200 hover:bg-orange-50">
            <div class="w-2 h-2 bg-orange-500 rounded-full group-hover:scale-150 transition-transform duration-200"></div>
            <span class="text-sm group-hover:text-orange-700 text-gray-600">Data Analytic</span>
          </NuxtLink>
        </div>
      </div>
    </nav>
    <!-- Footer -->
    <div class="relative z-10 mt-8 pt-6 border-t border-gray-200">
      <div class="flex items-center gap-3 px-4 py-3 rounded-xl bg-gray-50 border border-gray-200">
        <div class="w-8 h-8 bg-gradient-to-br from-gray-400 to-gray-500 rounded-lg flex items-center justify-center">
          <span class="text-white text-sm">⚙️</span>
        </div>
        <div class="flex-1">
          <p class="text-xs text-gray-600 font-medium">System v2.0</p>
          <p class="text-xs text-gray-500">Admin Panel</p>
        </div>
      </div>
    </div>
  </aside>
</template>

<script setup>
import { ref } from 'vue';

const openMenu = ref(null);
function toggleMenu(menu) {
  openMenu.value = openMenu.value === menu ? null : menu;
}
</script>
