<template>
  <div class="flex min-h-screen bg-gray-50 font-sans">
  <Sidebar :menu="menu" />
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

const context = 'admin';
const menu = computed(() => useSidebarMenu(context));
</script>
