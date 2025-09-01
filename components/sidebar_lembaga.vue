<template>
  <aside class="w-64 bg-white shadow-lg min-h-screen flex flex-col">
    <div class="px-6 py-4 border-b">
      <h2 class="text-xl font-bold text-blue-700">Menu Admin</h2>
    </div>
    <nav class="flex-1 px-4 py-6">
      <ul class="space-y-2">
        <li>
          <NuxtLink to="/[slug]/dashboard" class="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-blue-50 text-gray-700 font-medium">
            <span class="text-lg">📊</span>
            Dashboard
          </NuxtLink>
        </li>
        <li>
          <NuxtLink to="/[slug]/input-fungsional" class="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-blue-50 text-gray-700 font-medium">
            <span class="text-lg">📝</span>
            Input Fungsional
          </NuxtLink>
        </li>
      </ul>
    </nav>
  </aside>
</template>

<script setup>
// Sidebar statis, bisa diganti dengan data dinamis jika diperlukan
</script>

<style scoped>
.w-64 {
  width: 16rem;
}
</style>
