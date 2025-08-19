<template>
  <div class="p-8 flex flex-col gap-10 min-h-screen relative overflow-hidden bg-gray-50">
    <!-- Subtle Background -->
    <div class="fixed inset-0 -z-10">
      <div class="absolute inset-0 bg-gray-50"></div>
      <div class="absolute top-0 left-0 w-full h-full opacity-20">
        <div class="absolute top-20 left-20 w-96 h-96 bg-[#C2E7F6]/40 rounded-full blur-3xl"></div>
        <div class="absolute top-40 right-20 w-80 h-80 bg-blue-100/50 rounded-full blur-3xl"></div>
        <div class="absolute bottom-20 left-40 w-72 h-72 bg-blue-50/60 rounded-full blur-3xl"></div>
      </div>
    </div>

    <!-- Modern Header Section -->
    <div class="relative">
      <div class="bg-white rounded-xl p-8 shadow-sm border border-gray-200">
        <div class="flex items-center justify-between">
          <div class="relative">
            <h1 class="text-5xl font-black text-blue-600 mb-3">
              🚀 Data Jenjang AK
            </h1>
            <p class="text-gray-700 text-xl font-medium">Kelola data Analis Kebijakan </p>
            <div class="flex items-center gap-2 mt-2">
              <div class="w-2 h-2 bg-emerald-500 rounded-full"></div>
              <span class="text-emerald-600 text-sm font-medium">Real-time Data</span>
            </div>
          </div>
          <div class="hidden md:flex items-center gap-6">
            <div class="text-right">
              <div class="text-4xl font-black text-blue-600">{{ totalAK }}</div>
              <div class="text-sm text-gray-600 font-medium">Total Pegawai AK</div>
              <div class="text-xs text-emerald-600 font-semibold mt-1">↗ +12% bulan ini</div>
            </div>
            <div class="w-20 h-20 bg-blue-500 rounded-xl flex items-center justify-center shadow-sm">
              <span class="text-white text-3xl">👥</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Floating Add Button -->
    <button
      class="fixed bottom-8 right-8 z-50 group"
      @click="showAddModal = true"
    >
      <div class="relative flex items-center gap-3 bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-4 rounded-full shadow-lg transform transition-all duration-300 hover:scale-105">
        <span class="text-2xl">➕</span>
        <span class="hidden sm:block">Tambah Data</span>
      </div>
      <div class="absolute -top-12 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none">
        <div class="bg-gray-800/90 text-white text-xs px-3 py-2 rounded-lg shadow-lg">
          Klik untuk menambah pegawai baru
        </div>
        <div class="w-2 h-2 bg-gray-800/90 transform rotate-45 -mt-1 mx-auto"></div>
      </div>
    </button>

    <!-- Summary Cards -->
    <div class="grid grid-cols-1 sm:grid-cols-5 gap-6 mb-8">
      <div class="bg-white rounded-xl p-6 flex flex-col items-center gap-3 shadow-sm border border-gray-200 hover:shadow-md transition-all duration-300">
        <span class="text-4xl text-blue-600">👥</span>
        <div class="text-4xl font-black text-blue-600">{{ totalAK }}</div>
        <div class="text-sm text-gray-600 font-medium">Total Pegawai AK</div>
        <div class="text-xs text-emerald-600 font-semibold mt-1">↗ +12% bulan ini</div>
      </div>
      <div v-for="(j, idx) in jenjangData" :key="j.name"
        class="bg-white rounded-xl p-6 flex flex-col items-center gap-3 shadow-sm border border-gray-200 hover:shadow-md transition-all duration-300">
        <span class="flex mb-1 text-yellow-400 text-2xl drop-shadow">
          <span v-for="i in idx+1" :key="i" class="-ml-2">⭐</span>
        </span>
        <div :class="`text-3xl font-black ${['text-blue-600','text-emerald-600','text-amber-600','text-purple-600'][idx]}`">{{ j.value }}</div>
        <div class="font-bold text-gray-700 text-sm text-center">{{ j.name }}</div>
        <div class="text-xs text-gray-500 font-medium">Jenjang {{ idx + 1 }}</div>
      </div>
    </div>

    <!-- Chart Section -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
      <div class="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <h3 class="font-black text-xl text-blue-600 mb-4">
          📊 Distribusi AK per Jenjang
        </h3>
        <VueECharts :option="barOptions" style="height:300px;" />
      </div>
      <div class="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <h3 class="font-black text-xl text-blue-600 mb-4">
          📊 Proporsi Jenjang AK
        </h3>
        <VueECharts :option="pieOptions" style="height:300px;" />
      </div>
    </div>

    <!-- Table Section -->
    <div class="relative group">
      <div class="relative bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/50 overflow-hidden">
        <div class="flex items-center gap-3 mb-6">
          <div class="w-3 h-3 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full animate-ping"></div>
          <h3 class="font-black text-2xl bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
            📋 Tabel Data Jenjang AK
          </h3>
          <div class="ml-auto flex items-center gap-2 bg-gradient-to-r from-emerald-100 to-teal-100 px-4 py-2 rounded-full">
            <div class="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
            <span class="text-sm font-medium text-emerald-700">{{ filteredData.length }} data ditemukan</span>
          </div>
        </div>
        <!-- Filter Bar -->
        <div class="flex flex-wrap gap-4 mb-8 items-center p-6 bg-gradient-to-r from-gray-50 to-blue-50 rounded-2xl border border-gray-200">
          <input
            type="text"
            placeholder="🔍 Cari nama pegawai..."
            class="relative px-4 py-3 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-blue-900 bg-white/90 shadow-lg font-medium transition-all duration-300 hover:shadow-xl"
            v-model="filterNama"
            style="min-width: 200px"
          />
          <select
            class="relative px-4 py-3 border border-green-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 text-green-900 bg-white/90 shadow-lg font-medium transition-all duration-300 hover:shadow-xl cursor-pointer"
            v-model="filterJenjang"
          >
            <option value="">🎯 Semua Jenjang</option>
            <option v-for="j in jenjangList" :key="j" :value="j">⭐ {{ j }}</option>
          </select>
          <button
            @click="filterNama = ''; filterJenjang = ''"
            class="relative px-6 py-3 bg-gradient-to-r from-orange-500 to-amber-600 text-white font-bold rounded-lg shadow-lg transform transition-all duration-300 hover:scale-105"
          >
            ✨ Reset Filter
          </button>
        </div>
        <!-- Table -->
        <div class="overflow-x-auto rounded-2xl shadow-2xl">
          <table class="min-w-full text-left border-collapse bg-white/80 backdrop-blur-sm">
            <thead>
              <tr class="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white">
                <th class="py-4 px-6 font-bold text-sm tracking-wider">👤 Nama (Klik untuk Detail)</th>
                <th class="py-4 px-6 font-bold text-sm tracking-wider">🏆 Jenjang</th>
                <th class="py-4 px-6 font-bold text-sm tracking-wider">🏢 Instansi</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(row, idx) in pagedData" :key="row.nama"
                :class=" [
                  'group transition-all duration-300 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 hover:shadow-lg hover:scale-[1.01] cursor-pointer',
                  idx % 2 === 1 ? 'bg-gradient-to-r from-gray-50/50 to-blue-50/30' : 'bg-white/60',
                  'hover:border-l-4 hover:border-blue-500'
                ]"
                @click="router.push(`/admin/jumlah-ak/${row.id}`)"
                :title="`Klik untuk melihat detail ${row.nama}`"
              >
                <td class="py-4 px-6 font-bold text-blue-700 group-hover:text-indigo-600 transition-colors">
                  <div class="flex items-center gap-3">
                    <div class="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                      {{ row.nama.charAt(0).toUpperCase() }}
                    </div>
                    <div class="flex-1">
                      <div class="font-bold flex items-center gap-2">
                        {{ row.nama }}
                        <svg class="w-4 h-4 text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </div>
                      <div class="text-xs text-gray-500">ID: {{ row.id }} • Klik untuk detail</div>
                    </div>
                  </div>
                </td>
                <td class="py-4 px-6">
                  <span
                    :class=" [
                      'inline-flex items-center gap-1 px-3 py-2 rounded-full border text-xs font-bold shadow-lg transform transition-all duration-300 group-hover:scale-110',
                      JENJANG_BADGE[row.jenjang]
                    ]"
                  >
                    <span class="flex mb-1 text-yellow-400 text-2xl drop-shadow">
                      <span v-for="i in jenjangList.indexOf(row.jenjang) + 1" :key="i" class="-ml-2">⭐</span>
                    </span>
                    {{ row.jenjang }}
                  </span>
                </td>
                <td class="py-4 px-6 font-medium text-gray-700 group-hover:text-blue-600 transition-colors">
                  <div class="max-w-xs truncate">{{ row.instansi }}</div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- Pagination -->
    <div class="flex justify-center mt-4">
      <button
        class="px-4 py-2 bg-blue-600 text-white rounded-l-lg"
        :disabled="page === 1"
        @click="page = Math.max(1, page - 1)"
      >Previous</button>
      <span class="px-4 py-2 text-blue-700 font-semibold select-none">Halaman {{ page }} dari {{ totalPages }}</span>
      <button
        class="px-4 py-2 bg-blue-600 text-white rounded-r-lg"
        :disabled="page === totalPages"
        @click="page = Math.min(totalPages, page + 1)"
      >Next</button>
    </div>

    <!-- Modal Tambah Data -->
    <div v-if="showAddModal" class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div class="bg-gradient-to-br from-white via-blue-50/90 to-green-50/90 rounded-3xl shadow-2xl p-8 w-full max-w-lg relative backdrop-blur-xl border-2 border-white/20">
        <button
          class="absolute top-4 right-4 text-gray-400 hover:text-red-500 bg-white/80 hover:bg-red-50 rounded-full p-2 shadow-lg transition-all duration-200 hover:scale-110"
          @click="showAddModal = false"
        >✖</button>
        <div class="text-center mb-6">
          <div class="w-16 h-16 bg-gradient-to-r from-blue-500 to-green-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
            <span class="text-white text-2xl">➕</span>
          </div>
          <h2 class="text-3xl font-bold bg-gradient-to-r from-blue-700 to-green-600 bg-clip-text text-transparent">
            Tambah Data Pegawai
          </h2>
          <p class="text-gray-600 text-sm mt-2">Lengkapi form di bawah untuk menambah data pegawai baru</p>
        </div>
        <form @submit.prevent="handleAddData" class="space-y-4">
          <div class="space-y-2">
            <label class="text-sm font-semibold text-gray-700">Nama Lengkap</label>
            <input
              class="w-full border-2 border-blue-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-4 focus:ring-blue-300/30 focus:border-blue-400 transition-all duration-200 bg-white/80 backdrop-blur-sm shadow-sm hover:shadow-md"
              required
              placeholder="Masukkan nama lengkap"
              v-model="form.nama"
            />
          </div>
          <div class="space-y-2">
            <label class="text-sm font-semibold text-gray-700">NIP</label>
            <input
              class="w-full border-2 border-blue-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-4 focus:ring-blue-300/30 focus:border-blue-400 transition-all duration-200 bg-white/80 backdrop-blur-sm shadow-sm hover:shadow-md"
              required
              placeholder="Masukkan NIP"
              v-model="form.nip"
            />
          </div>
          <div class="space-y-2">
            <label class="text-sm font-semibold text-gray-700">Email</label>
            <input
              class="w-full border-2 border-blue-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-4 focus:ring-blue-300/30 focus:border-blue-400 transition-all duration-200 bg-white/80 backdrop-blur-sm shadow-sm hover:shadow-md"
              required
              type="email"
              placeholder="contoh@email.com"
              v-model="form.email"
            />
          </div>
          <div class="space-y-2">
            <label class="text-sm font-semibold text-gray-700">Jenjang</label>
            <select
              class="w-full border-2 border-blue-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-4 focus:ring-blue-300/30 focus:border-blue-400 transition-all duration-200 bg-white/80 backdrop-blur-sm shadow-sm hover:shadow-md"
              v-model="form.jenjang"
            >
              <option v-for="j in jenjangList" :key="j" :value="j">{{ j }}</option>
            </select>
          </div>
          <div class="space-y-2">
            <label class="text-sm font-semibold text-gray-700">Instansi</label>
            <input
              class="w-full border-2 border-blue-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-4 focus:ring-blue-300/30 focus:border-blue-400 transition-all duration-200 bg-white/80 backdrop-blur-sm shadow-sm hover:shadow-md"
              required
              placeholder="Nama instansi"
              v-model="form.instansi"
            />
          </div>
          <div class="space-y-2">
            <label class="text-sm font-semibold text-gray-700">Provinsi</label>
            <input
              class="w-full border-2 border-blue-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-4 focus:ring-blue-300/30 focus:border-blue-400 transition-all duration-200 bg-white/80 backdrop-blur-sm shadow-sm hover:shadow-md"
              required
              placeholder="Nama provinsi"
              v-model="form.provinsi"
            />
          </div>
          <div v-if="errorAdd" class="alert alert-error my-2">{{ errorAdd }}</div>
          <div class="modal-action">
            <button class="btn" @click="showAddModal = false" type="button">Batal</button>
            <button class="btn btn-primary" :disabled="loadingAdd">
              <span v-if="loadingAdd" class="loading loading-spinner"></span>
              Simpan Data
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Data Jenjang Table -->
    <div>
      <h2 class="text-xl font-bold mb-4">Data Jenjang</h2>
      <table class="min-w-full border">
        <thead>
          <tr>
            <th class="border px-4 py-2">Jenjang</th>
            <th class="border px-4 py-2">Total</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="row in jenjangSummary" :key="row.nm_jenjang">
            <td class="border px-4 py-2">{{ row.nm_jenjang }}</td>
            <td class="border px-4 py-2">{{ row.total }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import VueECharts from 'vue-echarts'
import * as echarts from 'echarts/core'
import { BarChart, PieChart } from 'echarts/charts'
import { TitleComponent, TooltipComponent, LegendComponent, GridComponent } from 'echarts/components'
import { CanvasRenderer } from 'echarts/renderers'

echarts.use([BarChart, PieChart, TitleComponent, TooltipComponent, LegendComponent, GridComponent, CanvasRenderer])

// Jenjang badge style
const JENJANG_BADGE = {
  "Pertama": "bg-blue-100 text-blue-700 border-blue-300",
  "Muda": "bg-emerald-100 text-emerald-700 border-emerald-300",
  "Madya": "bg-amber-100 text-amber-700 border-amber-300",
  "Utama": "bg-purple-100 text-purple-700 border-purple-300",
}

// Jenjang list
const jenjangList = ["Pertama", "Muda", "Madya", "Utama"]
const COLORS = ["#2563eb", "#10b981", "#f59e0b", "#8b5cf6"]

// State
const showAddModal = ref(false)
const pegawai = ref([])
const page = ref(1)
const rowsPerPage = 20
const router = useRouter()

const form = ref({
  nama: "",
  nip: "",
  email: "",
  jenjang: "Pertama",
  instansi: "",
  provinsi: "",
})
const loadingAdd = ref(false)
const errorAdd = ref("")

const filterNama = ref("")
const filterJenjang = ref("")

// Fetch pegawai data
onMounted(async () => {
  const res = await fetch("/api/analis_kebijakan")
  pegawai.value = await res.json()

  // Fetch jenjang summary data
  jenjangSummary.value = await $fetch('/api/analis_kebijakan/jenjang')
})

// Summary & chart data
const jenjangData = computed(() =>
  jenjangList.map(nm => ({
    name: nm,
    value: pegawai.value.filter(p => p.jenjang?.nm_jenjang === nm).length,
  }))
)
const totalAK = computed(() => pegawai.value.length)

// Table data
const dataTable = computed(() =>
  pegawai.value.map(p => ({
    id: p.id,
    nama: p.nama,
    jenjang: p.jenjang?.nm_jenjang || "-",
    instansi: p.instansi?.nama_instansi || "-",
    provinsi: p.instansi?.provinsi || "-",
    nip: p.nip,
    email: p.email,
  }))
)

// Filtered data
const filteredData = computed(() =>
  dataTable.value.filter(row =>
    (!filterNama.value || row.nama.toLowerCase().includes(filterNama.value.toLowerCase())) &&
    (!filterJenjang.value || row.jenjang === filterJenjang.value)
  )
)
const totalPages = computed(() => Math.ceil(filteredData.value.length / rowsPerPage))
const pagedData = computed(() =>
  filteredData.value.slice((page.value - 1) * rowsPerPage, page.value * rowsPerPage)
)

// Reset page on filter change
watch([filterNama, filterJenjang], () => { page.value = 1 })

// Add data handler
async function handleAddData() {
  loadingAdd.value = true
  errorAdd.value = ""
  try {
    const res = await fetch("/api/analis_kebijakan", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        nama: form.value.nama,
        nip: form.value.nip,
        email: form.value.email,
        jenjang: { nm_jenjang: form.value.jenjang },
        instansi: { nama_instansi: form.value.instansi, provinsi: form.value.provinsi },
      }),
    })
    if (!res.ok) throw new Error("Gagal menambah data")
    showAddModal.value = false
    form.value = { nama: "", nip: "", email: "", jenjang: "Pertama", instansi: "", provinsi: "" }
    // Refresh data
    const r = await fetch("/api/analis_kebijakan")
    pegawai.value = await r.json()
  } catch {
    errorAdd.value = "Gagal menambah data"
  } finally {
    loadingAdd.value = false
  }
}

// Bar chart options
const barOptions = computed(() => ({
  title: { text: 'Distribusi AK per Jenjang', left: 'center' },
  tooltip: {},
  xAxis: { type: 'category', data: jenjangData.value.map(j => j.name) },
  yAxis: { type: 'value' },
  series: [{
    type: 'bar',
    data: jenjangData.value.map(j => j.value),
    itemStyle: {
      color: (params) => ['#2563eb', '#10b981', '#f59e0b', '#8b5cf6'][params.dataIndex]
    }
  }]
}))

// Pie chart options
const pieOptions = computed(() => ({
  title: { text: 'Proporsi Jenjang AK', left: 'center' },
  tooltip: { trigger: 'item' },
  legend: { bottom: 0 },
  series: [{
    type: 'pie',
    radius: '60%',
    data: jenjangData.value.map((j, i) => ({
      value: j.value,
      name: j.name,
      itemStyle: { color: ['#2563eb', '#10b981', '#f59e0b', '#8b5cf6'][i] }
    })),
    label: { formatter: '{b}: {d}%' }
  }]
}))

// JenjangStars component
function JenjangStars({ count }) {
  return Array.from({ length: count }).map((_, i) =>
    h('span', { class: 'text-yellow-400 text-2xl drop-shadow', style: { marginLeft: i > 0 ? '-0.5rem' : '0' } }, [
      h('svg', { class: 'inline', width: 20, height: 20, fill: 'currentColor', viewBox: '0 0 20 20' }, [
        h('path', { d: 'M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.966a1 1 0 00.95.69h4.18c.969 0 1.371 1.24.588 1.81l-3.388 2.462a1 1 0 00-.364 1.118l1.287 3.966c.3.921-.755 1.688-1.54 1.118l-3.388-2.462a1 1 0 00-1.175 0l-3.388 2.462c-.784.57-1.838-.197-1.539-1.118l1.287-3.966a1 1 0 00-.364-1.118L2.174 9.393c-.783-.57-.38-1.81.588-1.81h4.18a1 1 0 00.95-.69l1.286-3.966z' })
      ])
    ])
  )
}
</script>

<script>
definePageMeta({ layout: 'admin' })
</script>

<style scoped>
@keyframes bounce-slow {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-8px); }
}
.animate-bounce-slow {
  animation: bounce-slow 2.2s infinite;
}
@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-6px); }
}
.animate-float {
  animation: float 3.2s ease-in-out infinite;
}
</style>


