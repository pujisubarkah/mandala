<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 via-white to-emerald-50 p-8">
    <div class="max-w-6xl mx-auto">
      <h1 class="text-3xl font-bold text-blue-700 mb-6">Dashboard Admin</h1>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div class="bg-white rounded-xl shadow p-6 flex flex-col items-center">
          <span class="text-5xl text-blue-500 mb-2">👤</span>
          <div class="text-lg font-semibold">Jumlah Pegawai</div>
          <div class="text-2xl font-bold text-blue-700 mt-2">123</div>
        </div>
        <div class="bg-white rounded-xl shadow p-6 flex flex-col items-center">
          <span class="text-5xl text-emerald-500 mb-2">📊</span>
          <div class="text-lg font-semibold">Analisis Kinerja</div>
          <div class="text-2xl font-bold text-emerald-700 mt-2">87%</div>
        </div>
        <div class="bg-white rounded-xl shadow p-6 flex flex-col items-center">
          <span class="text-5xl text-yellow-500 mb-2">📁</span>
          <div class="text-lg font-semibold">Dokumen Tersimpan</div>
          <div class="text-2xl font-bold text-yellow-700 mt-2">45</div>
        </div>
      </div>
      <div class="bg-white rounded-xl shadow p-6">
        <h2 class="text-xl font-bold text-blue-700 mb-4">Grafik Kinerja Pegawai</h2>
        <!-- Tempatkan chart di sini, misal pakai vue-echarts -->
        <div class="h-64 flex items-center justify-center text-gray-400">Grafik akan tampil di sini</div>
      </div>
    </div>
  </div>
</template>

<script setup>
// Data dummy, bisa diganti dengan fetch API
</script>
