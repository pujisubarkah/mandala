<template>
  <NuxtLayout name="admin">
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
        <div class="bg-gradient-to-br from-white via-blue-50 to-indigo-100 rounded-2xl p-8 shadow-xl border border-blue-200/50 backdrop-blur-sm">
          <div class="flex items-center justify-between">
            <div class="relative">
              <div class="flex items-center gap-4 mb-4">
                <div class="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                  <span class="text-white text-2xl">📊</span>
                </div>
                <div>
                  <h1 class="text-4xl font-black bg-gradient-to-r from-blue-600 to-indigo-700 bg-clip-text text-transparent">
                    Dashboard Widyaiswara
                  </h1>
                  <p v-if="namaInstansi" class="text-lg text-indigo-700 font-semibold">{{ namaInstansi }}</p>
                </div>
              </div>
              <p class="text-gray-700 text-lg font-medium mb-3">Kelola data pegawai Widyaiswara secara real-time</p>
              <div class="flex items-center gap-4">
                <div class="flex items-center gap-2 bg-emerald-100 px-3 py-1 rounded-full">
                  <div class="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                  <span class="text-emerald-700 text-sm font-semibold">Data Terkini</span>
                </div>
                <div class="flex items-center gap-2 bg-blue-100 px-3 py-1 rounded-full">
                  <div class="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span class="text-blue-700 text-sm font-semibold">{{ totalAK }} Pegawai</span>
                </div>
              </div>
            </div>
            <div class="hidden lg:flex items-center gap-6">
              <div class="text-center">
                <div class="text-5xl font-black bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">{{ totalAK }}</div>
                <div class="text-sm text-gray-600 font-medium">Total Pegawai</div>
                <div class="text-xs text-emerald-600 font-semibold mt-1 flex items-center justify-center gap-1">
                  <span>📈</span> Active
                </div>
              </div>
              <div class="w-24 h-24 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-xl transform hover:scale-105 transition-all duration-300">
                <span class="text-white text-4xl">👥</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Floating Action Button -->
      <button
        class="fixed bottom-8 right-8 z-50 group"
        @click="showAddModal = true"
      >
        <div class="relative flex items-center gap-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold px-8 py-4 rounded-full shadow-xl transform transition-all duration-300 hover:scale-110 hover:shadow-2xl">
          <span class="text-2xl animate-pulse">✨</span>
          <span class="hidden sm:block">Tambah Data</span>
        </div>
        <div class="absolute -top-12 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none">
          <div class="bg-gradient-to-r from-gray-800 to-gray-900 text-white text-xs px-4 py-2 rounded-xl shadow-lg">
            Tambah pegawai baru
          </div>
          <div class="w-2 h-2 bg-gray-800 transform rotate-45 -mt-1 mx-auto"></div>
        </div>
      </button>

      <!-- Enhanced Summary Cards -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
        <div class="bg-gradient-to-br from-white to-blue-50 rounded-2xl p-6 flex flex-col items-center gap-3 shadow-lg border border-blue-200/50 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
          <div class="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center shadow-lg">
            <span class="text-white text-2xl">👥</span>
          </div>
          <div class="text-4xl font-black bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">{{ totalAK }}</div>
          <div class="text-sm text-gray-700 font-semibold text-center">Total Pegawai</div>
          <div class="text-xs text-emerald-600 font-bold mt-1 bg-emerald-100 px-2 py-1 rounded-full">📈 Active</div>
        </div>
        <div v-for="(j, idx) in jenjangData" :key="j.name"
          class="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-6 flex flex-col items-center gap-3 shadow-lg border border-gray-200/50 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group">
          <div class="flex mb-2">
            <span v-for="i in idx+1" :key="i" class="text-yellow-400 text-xl -ml-1 transform group-hover:scale-110 transition-transform duration-200" style="filter: drop-shadow(0 2px 4px rgba(0,0,0,0.1))">⭐</span>
          </div>
          <div :class="`text-3xl font-black ${['text-blue-600','text-emerald-600','text-amber-600','text-purple-600'][idx]}`">{{ j.value }}</div>
          <div class="font-bold text-gray-800 text-sm text-center">{{ j.name }}</div>
          <div class="text-xs text-gray-500 font-medium bg-gray-100 px-2 py-1 rounded-full">Jenjang {{ idx + 1 }}</div>
        </div>
      </div>

      <!-- Enhanced Chart Section -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <div class="bg-gradient-to-br from-white to-blue-50 rounded-2xl p-8 shadow-xl border border-blue-200/50 backdrop-blur-sm">
          <div class="flex items-center gap-3 mb-6">
            <div class="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
              <span class="text-white text-lg">📊</span>
            </div>
            <div>
              <h3 class="font-black text-xl bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">
                Distribusi per Jenjang
              </h3>
              <p v-if="namaInstansi" class="text-sm text-blue-600 font-medium">{{ namaInstansi }}</p>
            </div>
          </div>
          <client-only>
            <component v-if="isChartsLoaded && VueECharts" :is="VueECharts" :option="barOptions" style="height:320px;" />
            <div v-else class="flex items-center justify-center h-80">
              <div class="text-gray-500">Loading chart...</div>
            </div>
          </client-only>
        </div>
        <div class="bg-gradient-to-br from-white to-indigo-50 rounded-2xl p-8 shadow-xl border border-indigo-200/50 backdrop-blur-sm">
          <div class="flex items-center gap-3 mb-6">
            <div class="w-10 h-10 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-lg flex items-center justify-center">
              <span class="text-white text-lg">🥧</span>
            </div>
            <div>
              <h3 class="font-black text-xl bg-gradient-to-r from-indigo-600 to-indigo-700 bg-clip-text text-transparent">
                Proporsi Jenjang
              </h3>
              <p v-if="namaInstansi" class="text-sm text-indigo-600 font-medium">{{ namaInstansi }}</p>
            </div>
          </div>
          <client-only>
            <component v-if="isChartsLoaded && VueECharts" :is="VueECharts" :option="pieOptions" style="height:320px;" />
            <div v-else class="flex items-center justify-center h-80">
              <div class="text-gray-500">Loading chart...</div>
            </div>
          </client-only>
        </div>
      </div>

      <!-- Table Section -->
      <div class="relative group">
        <div class="relative bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/50 overflow-hidden">
          <!-- Enhanced Header Section -->
          <div class="relative flex items-center justify-between mb-8">
            <div class="flex items-center gap-4">
              <div class="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center shadow-lg">
                <span class="text-white text-xl">📋</span>
              </div>
              <div>
                <h3 class="font-black text-2xl bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                  Data Pegawai Widyaiswara
                </h3>
                <p class="text-sm text-gray-600 font-medium">Kelola dan pantau data pegawai secara real-time</p>
              </div>
            </div>
            <div class="flex items-center gap-3">
              <div class="bg-gradient-to-r from-emerald-100 to-teal-100 px-4 py-2 rounded-full shadow-lg">
                <div class="flex items-center gap-2">
                  <div class="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                  <span class="text-sm font-bold text-emerald-700">{{ filteredData.length }} Data</span>
                </div>
              </div>
              <div class="bg-gradient-to-r from-blue-100 to-indigo-100 px-4 py-2 rounded-full shadow-lg">
                <div class="flex items-center gap-2">
                  <div class="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span class="text-sm font-bold text-blue-700">Live Update</span>
                </div>
              </div>
            </div>
          </div>
          <!-- Enhanced Filter Bar -->
          <div class="bg-gradient-to-r from-white to-gray-50/80 backdrop-blur-sm rounded-2xl p-6 mb-8 border border-gray-200/50 shadow-lg">
            <div class="flex flex-wrap gap-4 items-center">
              <div class="flex-1 min-w-[250px]">
                <div class="relative">
                  <input
                    type="text"
                    placeholder="Cari nama pegawai..."
                    class="w-full px-4 py-3 pl-12 border-2 border-blue-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-300/30 focus:border-blue-400 text-gray-700 bg-white/90 shadow-lg font-medium transition-all duration-300 hover:shadow-xl"
                    v-model="filterNama"
                  />
                  <div class="absolute left-4 top-1/2 transform -translate-y-1/2 text-blue-400">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                    </svg>
                  </div>
                </div>
              </div>
              <div class="min-w-[200px]">
                <select
                  class="w-full px-4 py-3 border-2 border-emerald-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-emerald-300/30 focus:border-emerald-400 text-gray-700 bg-white/90 shadow-lg font-medium transition-all duration-300 hover:shadow-xl cursor-pointer"
                  v-model="filterJenjang"
                >
                  <option value="">🎯 Semua Jenjang</option>
                  <option v-for="j in jenjangList" :key="j" :value="j">⭐ {{ j }}</option>
                </select>
              </div>
              <button
                @click="filterNama = ''; filterJenjang = ''"
                class="px-6 py-3 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold rounded-xl shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl flex items-center gap-2"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
                </svg>
                Reset Filter
              </button>
            </div>
          </div>
          <!-- Table -->
          <div class="overflow-x-auto rounded-2xl shadow-2xl">
            <table class="min-w-full text-left border-collapse bg-white/80 backdrop-blur-sm">
              <thead>
                <tr class="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white">
                  <th class="py-4 px-6 font-bold text-sm tracking-wider">👤 Nama (Klik untuk Detail)</th>
                  <th class="py-4 px-6 font-bold text-sm tracking-wider">NIP</th>
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
                  @click="router.push(`/${currentSlug}/form/widyaiswara/${row.id}`)"
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
                      </div>
                    </div>
                  </td>
                  <td class="py-4 px-6 font-medium text-gray-700 group-hover:text-blue-600 transition-colors">
                    {{ row.nip }}
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
                <LoadingSpinner v-if="loadingAdd" size="sm" />
                Simpan Data
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useUserStore } from '~/store/user'

// Get current route to access slug parameter
const route = useRoute()
const router = useRouter()
const currentSlug = route.params.slug

// ECharts components - will be loaded dynamically
const VueECharts = ref(null)
const isChartsLoaded = ref(false)

// Load ECharts only on client side
onMounted(async () => {
  // Handle localStorage fallback
  if (!instansi_id.value || !username.value) {
    const user = JSON.parse(localStorage.getItem('user') || '{}')
    if (!instansi_id.value) instansi_id.value = localStorage.getItem('instansi_id')
    if (!username.value) username.value = user.nama || ''
  }

  // Load ECharts components
  if (process.client) {
    try {
      const [
        { default: VueEChartsComponent },
        echartsCore,
        { BarChart, PieChart },
        { TitleComponent, TooltipComponent, LegendComponent, GridComponent },
        { CanvasRenderer }
      ] = await Promise.all([
        import('vue-echarts'),
        import('echarts/core'),
        import('echarts/charts'),
        import('echarts/components'),
        import('echarts/renderers')
      ])
      
      echartsCore.use([BarChart, PieChart, TitleComponent, TooltipComponent, LegendComponent, GridComponent, CanvasRenderer])
      VueECharts.value = VueEChartsComponent
      isChartsLoaded.value = true
    } catch (error) {
      console.error('Failed to load ECharts:', error)
    }
  }

  // Load instansi data
  if (instansi_id.value) {
    try {
      const res = await fetch(`/api/instansi`)
      const data = await res.json()
      const found = Array.isArray(data) ? data.find(i => i.id == instansi_id.value) : null
      if (found) namaInstansi.value = found.nama_instansi
    } catch {}
  }

  // Fetch pegawai data
  if (instansi_id.value) {
    const res = await fetch(`/api/widyaiswara/instansi?instansi_id=${instansi_id.value}`)
    pegawai.value = await res.json()
  }
})

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
// User Store & Authentication
const userStore = useUserStore()
let instansi_id = ref(userStore.instansi_id)
let username = ref(userStore.username)

const namaInstansi = ref('')

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

// Summary & chart data
const jenjangData = computed(() =>
  jenjangList.map(nm => ({
    name: nm,
    value: pegawai.value.filter(p => p.nm_jenjang === nm).length,
  }))
)
const totalAK = computed(() => pegawai.value.length)

// Table data
const dataTable = computed(() =>
  pegawai.value.map(p => ({
    id: p.id,
    nama: p.nama,
    jenjang: p.nm_jenjang || "-",
    instansi: p.nama_instansi || "-",
    provinsi: p.provinsi || "-",
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
    if (!instansi_id.value) throw new Error("instansi_id tidak ditemukan")
    const res = await fetch(`/api/widyaiswara/instansi`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        nama: form.value.nama,
        nip: form.value.nip,
        email: form.value.email,
        jenjang_id: jenjangList.indexOf(form.value.jenjang) + 1,
        instansi_id: instansi_id.value,
      }),
    })
    if (!res.ok) throw new Error("Gagal menambah data")
    showAddModal.value = false
    form.value = { nama: "", nip: "", email: "", jenjang: "Pertama", instansi: "", provinsi: "" }
    // Refresh data
    const r = await fetch(`/api/widyaiswara/instansi?instansi_id=${instansi_id.value}`)
    pegawai.value = await r.json()
  } catch {
    errorAdd.value = "Gagal menambah data"
  } finally {
    loadingAdd.value = false
  }
}

// Bar chart options
const barOptions = computed(() => ({
  title: { text: 'Distribusi Widyaiswara per Jenjang', left: 'center' },
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
  title: { text: 'Proporsi Jenjang Widyaiswara', left: 'center' },
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



