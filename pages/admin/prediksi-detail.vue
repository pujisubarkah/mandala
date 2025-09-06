<template>
  <div class="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 p-8">
    <div class="max-w-5xl mx-auto">
      <div class="mb-4 flex items-center">
        <NuxtLink to="/admin/analytic-ak" class="px-4 py-2 bg-emerald-600 text-white rounded-lg font-bold shadow hover:bg-emerald-700 transition flex items-center gap-2">
          ← Kembali ke Analitik
        </NuxtLink>
      </div>
      <h1 class="text-3xl font-black text-emerald-700 mb-6">Detail Prediksi Kenaikan Jabatan Fungsional Analis Kebijakan</h1>
      <div class="flex gap-4 mb-8">
        <select v-model="selectedJenjang" class="px-4 py-2 rounded-lg border border-emerald-300 bg-white text-emerald-700 font-bold">
          <option value="Muda">Muda</option>
          <option value="Madya">Madya</option>
          <option value="Utama">Utama</option>
        </select>
        <select v-model="selectedTahun" class="px-4 py-2 rounded-lg border border-emerald-300 bg-white text-emerald-700 font-bold">
          <option v-for="tahun in tahunList" :key="tahun" :value="tahun">{{ tahun }}</option>
        </select>
        <button @click="fetchDetail" class="px-6 py-2 bg-emerald-600 text-white rounded-lg font-bold shadow hover:bg-emerald-700 transition">Tampilkan</button>
      </div>
      <div v-if="loading" class="text-center py-8 text-gray-500">Loading...</div>
      <div v-else>
        <table class="min-w-full text-left border-collapse bg-white/80 rounded-xl overflow-hidden shadow-lg">
          <thead>
            <tr class="bg-gradient-to-r from-emerald-600 to-teal-600 text-white">
              <th class="py-3 px-4 font-bold text-sm">Nama</th>
              <th class="py-3 px-4 font-bold text-sm">NIP</th>
              <th class="py-3 px-4 font-bold text-sm">Jenjang</th>
              <th class="py-3 px-4 font-bold text-sm">Golongan</th>
              <th class="py-3 px-4 font-bold text-sm">Instansi</th>
              <th class="py-3 px-4 font-bold text-sm">TMT Pangkat</th>
              <th class="py-3 px-4 font-bold text-sm">Pendidikan</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="row in detailData" :key="row.nip">
              <td class="py-2 px-4">{{ row.nama }}</td>
              <td class="py-2 px-4">{{ row.nip }}</td>
              <td class="py-2 px-4">{{ row.jenjang }}</td>
              <td class="py-2 px-4">{{ row.golongan }}</td>
              <td class="py-2 px-4">{{ row.instansi }}</td>
              <td class="py-2 px-4">{{ row.tmt_pangkat }}</td>
              <td class="py-2 px-4">{{ row.pendidikan }}</td>
            </tr>
          </tbody>
        </table>
        <div v-if="detailData.length === 0" class="text-center py-8 text-gray-500">Tidak ada data pegawai.</div>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({ layout: 'admin' })
import { ref } from 'vue'
const tahunList = [2026,2027,2028,2029,2030]
const selectedJenjang = ref('Muda')
const selectedTahun = ref(2026)
const detailData = ref([])
const loading = ref(false)

function fetchDetail() {
  loading.value = true
  fetch(`/api/analis_kebijakan/prediksi-detail?jenjang=${selectedJenjang.value}&tahun=${selectedTahun.value}`)
    .then(res => res.json())
    .then(data => {
      detailData.value = data
      loading.value = false
    })
    .catch(() => {
      detailData.value = []
      loading.value = false
    })
}

// Fetch initial data
fetchDetail()
</script>
