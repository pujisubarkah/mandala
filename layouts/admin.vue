<template>
  <div class="flex min-h-screen bg-gray-50 font-sans">
  <client-only>
    <Sidebar :menu="menu" />
  </client-only>
    <div class="flex-1 flex flex-col overflow-hidden">
      <Header />
      <main class="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 p-6">
        <slot />
      </main>
    </div>
  </div>
</template>

<script setup>


import { computed } from 'vue';
import useSidebarMenu from '~/composables/useSidebarMenu.js';
let role_id = null;
let username = '';
if (process.client) {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  role_id = Number(user.role_id) || null;
  username = user.nama || '';
}

const menu = computed(() => {
  const m = useSidebarMenu(role_id, username);
  if (process.client) {
    console.log('Sidebar menu:', m, 'role_id:', role_id, 'username:', username);
  }
  return m;
});
</script>
