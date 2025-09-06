<template>
  <div class="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 p-8">
    <div class="max-w-7xl mx-auto">
      <!-- Header -->
      <div class="text-center mb-8">
        <h1 class="text-4xl font-black bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent mb-4">
          📊 Dashboard Analitik Analis Kebijakan
        </h1>
        <div class="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-emerald-200">
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div class="text-center">
              <div class="text-3xl font-black text-emerald-600 mb-2">{{ totalAKAllProv }}</div>
              <div class="text-sm font-medium text-gray-600">Total Analis Kebijakan</div>
            </div>
            <div class="text-center">
              <div class="text-3xl font-black text-teal-600 mb-2 flex items-center justify-center gap-2">
                {{ growth }}%
                <span :class="isGrowthUp ? 'text-green-500' : 'text-red-500'">
                  {{ isGrowthUp ? '📈' : '📉' }}
                </span>
              </div>
              <div class="text-sm font-medium text-gray-600">Pertumbuhan Tahunan</div>
            </div>
            <div class="text-center">
              <div class="text-3xl font-black text-cyan-600 mb-2">{{ provinsiData.length }}</div>
              <div class="text-sm font-medium text-gray-600">Instansi Terdaftar</div>
            </div>
          </div>
        </div>
      </div>

    <!-- Data Stories Section -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
      <!-- Pendidikan Story -->
      <div class="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-xl p-6 border-l-4 border-blue-500 shadow-lg">
        <div class="flex items-center gap-3 mb-4">
          <div class="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
            🎓
          </div>
          <h3 class="font-bold text-lg text-blue-800">Profil Pendidikan</h3>
        </div>
        <div class="space-y-3 text-sm">
          <div class="bg-white/60 rounded-lg p-3">
            <div class="font-bold text-blue-700">Dominasi S1 & S2</div>
            <div class="text-gray-700">
              {{ Math.round(((summary?.pendidikan?.['S1'] || 0) + (summary?.pendidikan?.['S2'] || 0)) / 
                Object.values(summary?.pendidikan || {}).reduce((a,b) => a+b, 0) * 100) }}% 
              AK berlatar S1-S2
            </div>
          </div>
          <div class="bg-white/60 rounded-lg p-3">
            <div class="font-bold text-blue-700">Potensi S3</div>
            <div class="text-gray-700">
              {{ summary?.pendidikan?.['S3'] || 0 }} doktor 
              ({{ Math.round((summary?.pendidikan?.['S3'] || 0) / 
                Object.values(summary?.pendidikan || {}).reduce((a,b) => a+b, 0) * 100) }}%)
            </div>
          </div>
          <div class="bg-blue-500 text-white rounded-lg p-3 font-bold text-center">
            📈 Trend: Kualifikasi Tinggi!
          </div>
        </div>
      </div>

      <!-- Jenjang Story with Prediction -->
      <div class="bg-gradient-to-br from-emerald-50 to-green-100 rounded-xl p-6 border-l-4 border-emerald-500 shadow-lg">
        <div class="flex items-center gap-3 mb-4">
          <div class="w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center">
            🏆
          </div>
          <h3 class="font-bold text-lg text-emerald-800">Proyeksi Jenjang</h3>
        </div>
        <div class="space-y-3 text-sm">
          <div class="bg-white/60 rounded-lg p-3">
            <div class="font-bold text-emerald-700">Kondisi Saat Ini</div>
            <div class="text-gray-700">
              Muda: {{ summary?.nm_jenjang?.['Muda'] || 0 }} | 
              Madya: {{ summary?.nm_jenjang?.['Madya'] || 0 }}
            </div>
          </div>
          <div class="bg-white/60 rounded-lg p-3">
            <div class="font-bold text-emerald-700">Prediksi 3 Tahun</div>
            <div class="text-gray-700">
              Estimasi +{{ Math.round((summary?.nm_jenjang?.['Pertama'] || 0) * 0.6) }} 
              naik ke Muda
            </div>
            <div class="text-gray-700">
              Estimasi +{{ Math.round((summary?.nm_jenjang?.['Muda'] || 0) * 0.4) }} 
              naik ke Madya
            </div>
          </div>
          <div class="bg-emerald-500 text-white rounded-lg p-3 font-bold text-center">
            🚀 Proyeksi: +{{ Math.round((summary?.nm_jenjang?.['Pertama'] || 0) * 0.6 + (summary?.nm_jenjang?.['Muda'] || 0) * 0.4) }} Promosi
          </div>
        </div>
      </div>

      <!-- Usia Story -->
      <div class="bg-gradient-to-br from-orange-50 to-red-100 rounded-xl p-6 border-l-4 border-orange-500 shadow-lg">
        <div class="flex items-center gap-3 mb-4">
          <div class="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center">
            ⏰
          </div>
          <h3 class="font-bold text-lg text-orange-800">Dinamika Usia</h3>
        </div>
        <div class="space-y-3 text-sm">
          <div class="bg-white/60 rounded-lg p-3">
            <div class="font-bold text-orange-700">Usia Produktif</div>
            <div class="text-gray-700">
              {{ ageAnalysis.productive.percentage }}% 
              ({{ ageAnalysis.productive.count }} orang) dalam usia produktif
            </div>
          </div>
          <div class="bg-white/60 rounded-lg p-3">
            <div class="font-bold text-orange-700">Regenerasi</div>
            <div class="text-gray-700">
              {{ ageAnalysis.young.count }} AK muda 
              ({{ ageAnalysis.young.percentage }}%) siap berkembang
            </div>
          </div>
          <div class="bg-white/60 rounded-lg p-3">
            <div class="font-bold text-orange-700">Prapensiun</div>
            <div class="text-gray-700">
              {{ ageAnalysis.preRetirement.count }} AK 
              ({{ ageAnalysis.preRetirement.percentage }}%) mendekati pensiun
            </div>
          </div>
          <div class="bg-orange-500 text-white rounded-lg p-3 font-bold text-center">
            ⚡ Bonus Demografi Aktif!
          </div>
        </div>
      </div>
    </div>

    <!-- Charts Section -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
      <div class="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <h3 class="font-black text-xl text-blue-600 mb-4 flex items-center gap-2">
          📊 AK per Golongan
        </h3>
        <client-only>
          <VueECharts :option="barOptions" style="height:320px;" />
        </client-only>
      </div>
      <div class="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <h3 class="font-black text-xl text-purple-600 mb-4 flex items-center gap-2">
          👥 Komposisi Jenis Kelamin
        </h3>
        <client-only>
          <VueECharts :option="pieOptions" style="height:320px;" />
        </client-only>
      </div>
    </div>

    <!-- Additional Charts Section -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
      <div class="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <h3 class="font-black text-xl text-purple-600 mb-4 flex items-center gap-2">
          🎓 Distribusi Pendidikan
        </h3>
        <client-only>
          <VueECharts :option="pendidikanOptions" style="height:320px;" />
        </client-only>
      </div>
      <div class="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <h3 class="font-black text-xl text-orange-600 mb-4 flex items-center gap-2">
          📊 Distribusi Rentang Usia
        </h3>
        <client-only>
          <VueECharts :option="usiaOptions" style="height:320px;" />
        </client-only>
      </div>
      <div class="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <h3 class="font-black text-xl text-emerald-600 mb-4 flex items-center gap-2">
          🏆 Distribusi Jenjang AK
        </h3>
        <client-only>
          <VueECharts :option="jenjangOptions" style="height:320px;" />
        </client-only>
      </div>
    </div>

    <!-- Prediksi Kenaikan Jabatan Fungsional Analis Kebijakan 2026 - 2030 -->
    <div class="overflow-x-auto rounded-2xl shadow-2xl mt-8">
      <h4 class="font-black text-xl mb-4 text-emerald-700 flex items-center gap-2">
        <div class="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
        🏆 Prediksi Kenaikan Jabatan Fungsional Analis Kebijakan 2026 - 2030
      </h4>
      <table class="min-w-full text-left border-collapse bg-white/80 backdrop-blur-sm rounded-2xl overflow-hidden shadow-lg">
        <thead>
          <tr class="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 text-white">
            <th class="py-4 px-6 font-bold text-sm tracking-wider">Jenjang</th>
            <th v-for="tahun in [2026,2027,2028,2029,2030]" :key="tahun" class="py-4 px-6 font-bold text-sm tracking-wider text-center">{{ tahun }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="jenjang in ['Muda','Madya','Utama']" :key="jenjang"
            class="group transition-all duration-300 hover:bg-gradient-to-r hover:from-emerald-50 hover:to-teal-50 hover:shadow-lg hover:scale-[1.01] cursor-pointer">
            <td class="py-4 px-6 font-bold text-gray-700 group-hover:text-emerald-600 transition-colors">{{ jenjang }}</td>
            <td v-for="tahun in [2026,2027,2028,2029,2030]" :key="tahun" class="py-4 px-6 text-center font-black text-emerald-700 group-hover:text-teal-600 transition-colors text-lg">
              <NuxtLink :to="`/admin/prediksi-detail?jenjang=${jenjang}&tahun=${tahun}`" class="cursor-pointer hover:underline">{{ prediksi?.[jenjang]?.[tahun] || 0 }}</NuxtLink>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Modal Detail Prediksi -->
    <div v-if="showDetailModal" class="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div class="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-2xl relative">
        <button class="absolute top-4 right-4 text-gray-400 hover:text-red-500 bg-white/80 hover:bg-red-50 rounded-full p-2 shadow-lg transition-all duration-200 hover:scale-110" @click="showDetailModal = false">✖</button>
        <h2 class="text-2xl font-bold mb-4 text-emerald-700">Detail Prediksi Kenaikan {{ modalJenjang }} Tahun {{ modalTahun }}</h2>
        <div v-if="loadingDetail" class="text-center py-8 text-gray-500">Loading...</div>
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
    </div>
    </div>
</template>

<script setup>
definePageMeta({
  layout: 'admin'
})

import { ref, onMounted, computed } from 'vue'
import VueECharts from 'vue-echarts'
import * as echarts from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { BarChart, PieChart } from 'echarts/charts'
import { TitleComponent, TooltipComponent, LegendComponent, GridComponent } from 'echarts/components'

echarts.use([CanvasRenderer, BarChart, PieChart, TitleComponent, TooltipComponent, LegendComponent, GridComponent])

const COLORS = ["#2563eb", "#38bdf8", "#fbbf24", "#f87171", "#34d399", "#a78bfa", "#f472b6", "#facc15", "#60a5fa", "#f472b6"]

const summary = ref(null)
const loading = ref(true)
const growth = ref(8)
const isGrowthUp = computed(() => growth.value >= 0)
const totalAKAllProv = ref(0)
const provinsiData = ref([])
const prediksi = ref(null)
const showDetailModal = ref(false)
const modalJenjang = ref('')
const modalTahun = ref('')
const detailData = ref([])
const loadingDetail = ref(false)

// Dynamic age analysis
const ageAnalysis = computed(() => {
  const ageData = summary.value?.rentang_usia || {}
  const total = Object.values(ageData).reduce((a, b) => a + b, 0)
  
  let youngCount = 0
  let productiveCount = 0
  let seniorCount = 0
  let preRetirementCount = 0
  
  Object.entries(ageData).forEach(([range, count]) => {
    const match = range.match(/(\d+)-(\d+)/)
    if (match) {
      const start = parseInt(match[1])
      const end = parseInt(match[2])
      
      if (start >= 20 && end <= 35) youngCount += count
      if (start >= 30 && end <= 55) productiveCount += count
      if (start >= 45 && end <= 60) seniorCount += count
      if (start >= 55) preRetirementCount += count
    }
  })
  
  return {
    young: { count: youngCount, percentage: Math.round(youngCount / total * 100) },
    productive: { count: productiveCount, percentage: Math.round(productiveCount / total * 100) },
    senior: { count: seniorCount, percentage: Math.round(seniorCount / total * 100) },
    preRetirement: { count: preRetirementCount, percentage: Math.round(preRetirementCount / total * 100) }
  }
})

onMounted(async () => {
  const res = await fetch('/api/analis_kebijakan/summary')
  summary.value = await res.json()
  // Total AK dari semua instansi
  totalAKAllProv.value = Object.values(summary.value?.nama_instansi || {}).reduce((a, b) => a + b, 0)
  // Top 10 instansi
  provinsiData.value = Object.entries(summary.value?.nama_instansi || {})
    .map(([name, value]) => ({ provinsi: name, total: value }))
    .sort((a, b) => b.total - a.total)
    .slice(0, 10)
  loading.value = false

  const resPrediksi = await fetch('/api/analis_kebijakan/prediksi')
  prediksi.value = await resPrediksi.json()
})

function openDetailModal(jenjang, tahun) {
  showDetailModal.value = true
  modalJenjang.value = jenjang
  modalTahun.value = tahun
  loadingDetail.value = true
  fetch(`/api/analis_kebijakan/prediksi-detail?jenjang=${jenjang}&tahun=${tahun}`)
    .then(res => res.json())
    .then(data => {
      detailData.value = data
      loadingDetail.value = false
    })
    .catch(() => {
      detailData.value = []
      loadingDetail.value = false
    })
}

// Chart options
const barOptions = computed(() => ({
  title: { text: 'AK per Golongan', left: 'center' },
  tooltip: {},
  xAxis: { type: 'category', data: Object.keys(summary.value?.golongan || {}) },
  yAxis: { type: 'value' },
  series: [{
    type: 'bar',
    data: Object.values(summary.value?.golongan || {}),
    itemStyle: { color: '#2563eb' }
  }]
}))

const pieOptions = computed(() => ({
  title: { text: 'Komposisi Jenis Kelamin', left: 'center' },
  tooltip: { trigger: 'item' },
  legend: { bottom: 0 },
  series: [{
    type: 'pie',
    radius: '60%',
    data: Object.entries(summary.value?.jns_kelamin || {}).map(([name, value]) => ({ value, name })),
    label: { formatter: '{b}: {d}%' }
  }]
}))

const pendidikanOptions = computed(() => ({
  title: { text: 'Distribusi Pendidikan', left: 'center' },
  tooltip: { 
    trigger: 'item',
    formatter: '{b}: {c} ({d}%)'
  },
  legend: { 
    bottom: 0,
    type: 'scroll'
  },
  series: [{
    type: 'pie',
    radius: ['40%', '70%'],
    data: Object.entries(summary.value?.pendidikan || {}).map(([name, value]) => ({ 
      value, 
      name: name === '-' ? 'Tidak Diketahui' : name 
    })),
    label: { 
      formatter: '{b}: {d}%',
      fontSize: 10
    },
    emphasis: {
      itemStyle: {
        shadowBlur: 10,
        shadowOffsetX: 0,
        shadowColor: 'rgba(0, 0, 0, 0.5)'
      }
    }
  }]
}))

const usiaOptions = computed(() => ({
  title: { text: 'Distribusi Rentang Usia', left: 'center' },
  tooltip: {
    trigger: 'axis',
    formatter: '{b}: {c} orang'
  },
  xAxis: { 
    type: 'category', 
    data: Object.keys(summary.value?.rentang_usia || {}),
    axisLabel: { 
      rotate: 45,
      fontSize: 10
    }
  },
  yAxis: { type: 'value' },
  series: [{
    type: 'bar',
    data: Object.values(summary.value?.rentang_usia || {}),
    itemStyle: { color: '#10b981' },
    emphasis: {
      itemStyle: { color: '#059669' }
    }
  }]
}))

const jenjangOptions = computed(() => ({
  title: { text: 'Komposisi Jenjang Jabatan', left: 'center' },
  tooltip: { 
    trigger: 'item',
    formatter: '{b}: {c} ({d}%)'
  },
  legend: { bottom: 0 },
  series: [{
    type: 'pie',
    radius: '60%',
    data: Object.entries(summary.value?.nm_jenjang || {}).map(([name, value]) => ({ value, name })),
    label: { formatter: '{b}: {d}%' },
    emphasis: {
      itemStyle: {
        shadowBlur: 10,
        shadowOffsetX: 0,
        shadowColor: 'rgba(0, 0, 0, 0.5)'
      }
    }
  }]
}))
</script>