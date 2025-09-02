<template>
  <div class="p-8 flex flex-col gap-10 min-h-screen relative overflow-hidden">
    <!-- Header -->
    <div class="relative bg-white/40 backdrop-blur-2xl rounded-3xl p-10 shadow-2xl border border-white/50">
      <div class="flex items-center justify-between">
        <div>
          <h1 class="text-5xl font-black bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent mb-3">
            <BarChart2 class="inline-block w-10 h-10 text-blue-600 mr-2" /> Analitik Data Widyaiswara
          </h1>
          <p class="text-gray-700 text-xl font-medium">Dashboard analisis mendalam untuk insight data Widyaiswara</p>
        </div>
        <div class="hidden md:flex items-center gap-6">
          <div class="text-right">
            <div class="text-4xl font-black text-blue-600">{{ totalAKAllProv }}</div>
            <div class="text-sm text-gray-600 font-medium">Total Widyaiswara</div>
            <div class="text-xs text-emerald-600 font-semibold mt-1 flex items-center gap-1">
              <TrendingUp v-if="isGrowthUp" class="w-5 h-5" />
              <TrendingDown v-else class="w-5 h-5" />
              {{ growth }}% pertumbuhan
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Chart Section -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div>
        <client-only>
          <VueECharts :option="barOptions" style="height:320px;" />
        </client-only>
      </div>
      <div>
        <client-only>
          <VueECharts :option="pieOptions" style="height:320px;" />
        </client-only>
      </div>
    </div>

    <!-- Additional Charts Section -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
      <div class="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <h3 class="font-black text-xl text-purple-600 mb-4 flex items-center gap-2">
          🎓 Distribusi Pendidikan Widyaiswara
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
    </div>

    <!-- Data Story Section -->
    <div class="mt-8 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 rounded-3xl p-8 border border-indigo-200">
      <div class="text-center mb-8">
        <h2 class="text-4xl font-black bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
          📈 Data Story: Profil Widyaiswara Indonesia
        </h2>
        <p class="text-gray-700 text-lg font-medium">Insight mendalam dari {{ totalAKAllProv }} Widyaiswara di seluruh Indonesia</p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <!-- Gender Balance Card -->
        <div class="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/50 hover:shadow-xl transition-all duration-300">
          <div class="flex items-center gap-4 mb-4">
            <div class="w-12 h-12 bg-gradient-to-r from-pink-500 to-rose-600 rounded-full flex items-center justify-center">
              <span class="text-white text-2xl">👫</span>
            </div>
            <div>
              <h3 class="font-bold text-gray-800">Keseimbangan Gender</h3>
              <p class="text-sm text-gray-600">Distribusi Pria vs Wanita</p>
            </div>
          </div>
          <div v-if="summary?.jns_kelamin" class="space-y-3">
            <div class="flex justify-between items-center">
              <span class="text-sm font-medium text-gray-700">Pria</span>
              <div class="flex items-center gap-2">
                <div class="w-20 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div class="h-full bg-blue-500 rounded-full" :style="`width: ${(summary.jns_kelamin.Pria / (summary.jns_kelamin.Pria + summary.jns_kelamin.Wanita) * 100)}%`"></div>
                </div>
                <span class="text-sm font-bold text-blue-600">{{ Math.round(summary.jns_kelamin.Pria / (summary.jns_kelamin.Pria + summary.jns_kelamin.Wanita) * 100) }}%</span>
              </div>
            </div>
            <div class="flex justify-between items-center">
              <span class="text-sm font-medium text-gray-700">Wanita</span>
              <div class="flex items-center gap-2">
                <div class="w-20 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div class="h-full bg-pink-500 rounded-full" :style="`width: ${(summary.jns_kelamin.Wanita / (summary.jns_kelamin.Pria + summary.jns_kelamin.Wanita) * 100)}%`"></div>
                </div>
                <span class="text-sm font-bold text-pink-600">{{ Math.round(summary.jns_kelamin.Wanita / (summary.jns_kelamin.Pria + summary.jns_kelamin.Wanita) * 100) }}%</span>
              </div>
            </div>
            <div class="bg-gradient-to-r from-blue-50 to-pink-50 p-3 rounded-lg mt-4">
              <p class="text-xs text-gray-700 font-medium">
                💡 <strong>Insight:</strong> Dominasi pria sebesar {{ Math.round(summary.jns_kelamin.Pria / (summary.jns_kelamin.Pria + summary.jns_kelamin.Wanita) * 100) }}% menunjukkan perlu strategi khusus untuk meningkatkan partisipasi wanita dalam jabatan Widyaiswara.
              </p>
            </div>
          </div>
        </div>

        <!-- Education Excellence Card -->
        <div class="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/50 hover:shadow-xl transition-all duration-300">
          <div class="flex items-center gap-4 mb-4">
            <div class="w-12 h-12 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-full flex items-center justify-center">
              <span class="text-white text-2xl">🎓</span>
            </div>
            <div>
              <h3 class="font-bold text-gray-800">Kualifikasi Pendidikan</h3>
              <p class="text-sm text-gray-600">Standar Tinggi Pendidikan</p>
            </div>
          </div>
          <div v-if="summary?.pendidikan" class="space-y-3">
            <div class="text-center">
              <div class="text-3xl font-black text-purple-600">{{ Math.round(summary.pendidikan.S2 / (summary.pendidikan.S2 + summary.pendidikan.S3) * 100) }}%</div>
              <p class="text-sm text-gray-600">Bergelar S2</p>
            </div>
            <div class="text-center">
              <div class="text-2xl font-bold text-indigo-600">{{ Math.round(summary.pendidikan.S3 / (summary.pendidikan.S2 + summary.pendidikan.S3) * 100) }}%</div>
              <p class="text-sm text-gray-600">Bergelar S3</p>
            </div>
            <div class="bg-gradient-to-r from-purple-50 to-indigo-50 p-3 rounded-lg mt-4">
              <p class="text-xs text-gray-700 font-medium">
                🏆 <strong>Excellence:</strong> 100% Widyaiswara memiliki pendidikan minimal S2, dengan {{ summary.pendidikan.S3 }} orang bergelar S3 sebagai dosen senior.
              </p>
            </div>
          </div>
        </div>

        <!-- Age Distribution Card -->
        <div class="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/50 hover:shadow-xl transition-all duration-300">
          <div class="flex items-center gap-4 mb-4">
            <div class="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-600 rounded-full flex items-center justify-center">
              <span class="text-white text-2xl">📊</span>
            </div>
            <div>
              <h3 class="font-bold text-gray-800">Profil Usia</h3>
              <p class="text-sm text-gray-600">Distribusi Generasi</p>
            </div>
          </div>
          <div v-if="summary?.rentang_usia" class="space-y-3">
            <div class="grid grid-cols-2 gap-4 text-center">
              <div>
                <div class="text-2xl font-bold text-green-600">{{ summary.rentang_usia['30-34 tahun'] + summary.rentang_usia['35-39 tahun'] }}</div>
                <p class="text-xs text-gray-600">Usia 30-39</p>
              </div>
              <div>
                <div class="text-2xl font-bold text-orange-600">{{ summary.rentang_usia['40-44 tahun'] + summary.rentang_usia['45-49 tahun'] }}</div>
                <p class="text-xs text-gray-600">Usia 40-49</p>
              </div>
            </div>
            <div class="bg-gradient-to-r from-orange-50 to-red-50 p-3 rounded-lg mt-4">
              <p class="text-xs text-gray-700 font-medium">
                ⚡ <strong>Prime Age:</strong> Mayoritas Widyaiswara berada di usia produktif 30-49 tahun, menunjukkan kematangan pengalaman dan energi optimal.
              </p>
            </div>
          </div>
        </div>

        <!-- Top Institutions Card -->
        <div class="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/50 hover:shadow-xl transition-all duration-300">
          <div class="flex items-center gap-4 mb-4">
            <div class="w-12 h-12 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full flex items-center justify-center">
              <span class="text-white text-2xl">🏛️</span>
            </div>
            <div>
              <h3 class="font-bold text-gray-800">Institusi Terdepan</h3>
              <p class="text-sm text-gray-600">Top 3 Kementerian</p>
            </div>
          </div>
          <div v-if="allInstansiData.length > 0" class="space-y-2">
            <div v-for="(inst, idx) in allInstansiData.slice(0, 3)" :key="idx" class="flex justify-between items-center p-2 bg-gray-50 rounded-lg">
              <span class="text-sm font-medium text-gray-700 truncate flex-1">{{ inst.provinsi.replace('Kementerian ', '').replace('Pemerintah Provinsi ', '') }}</span>
              <span class="text-sm font-bold text-emerald-600 ml-2">{{ inst.total }}</span>
            </div>
            <div class="bg-gradient-to-r from-emerald-50 to-teal-50 p-3 rounded-lg mt-4">
              <p class="text-xs text-gray-700 font-medium">
                🎯 <strong>Distribution:</strong> {{ allInstansiData.length }} instansi dengan distribusi yang cukup merata di seluruh Indonesia.
              </p>
            </div>
          </div>
        </div>

        <!-- Career Path Card -->
        <div class="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/50 hover:shadow-xl transition-all duration-300">
          <div class="flex items-center gap-4 mb-4">
            <div class="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-full flex items-center justify-center">
              <span class="text-white text-2xl">🚀</span>
            </div>
            <div>
              <h3 class="font-bold text-gray-800">Jalur Karier</h3>
              <p class="text-sm text-gray-600">Path to Excellence</p>
            </div>
          </div>
          <div v-if="summary?.jalur_pengangkatan" class="space-y-2">
            <div class="flex justify-between items-center">
              <span class="text-sm text-gray-700">Perpindahan Jabatan</span>
              <span class="text-sm font-bold text-blue-600">{{ summary.jalur_pengangkatan['Perpindahan Jabatan'] }}</span>
            </div>
            <div class="flex justify-between items-center">
              <span class="text-sm text-gray-700">Inpassing</span>
              <span class="text-sm font-bold text-green-600">{{ summary.jalur_pengangkatan['Inpassing'] }}</span>
            </div>
            <div class="flex justify-between items-center">
              <span class="text-sm text-gray-700">Pengangkatan Pertama</span>
              <span class="text-sm font-bold text-purple-600">{{ summary.jalur_pengangkatan['Pengangkatan Pertama'] }}</span>
            </div>
            <div class="bg-gradient-to-r from-blue-50 to-cyan-50 p-3 rounded-lg mt-4">
              <p class="text-xs text-gray-700 font-medium">
                💼 <strong>Career Growth:</strong> Mayoritas melalui perpindahan jabatan dan inpassing, menunjukkan pengalaman kerja yang kaya.
              </p>
            </div>
          </div>
        </div>

        <!-- Key Metrics Summary -->
        <div class="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl p-6 text-white shadow-lg border border-indigo-300">
          <div class="flex items-center gap-4 mb-4">
            <div class="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
              <span class="text-2xl">📈</span>
            </div>
            <div>
              <h3 class="font-bold text-white">Key Metrics</h3>
              <p class="text-sm text-indigo-100">Ringkasan Eksekutif</p>
            </div>
          </div>
          <div class="space-y-3">
            <div class="flex justify-between">
              <span class="text-sm text-indigo-100">Total Widyaiswara</span>
              <span class="font-bold">{{ totalAKAllProv.toLocaleString() }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-sm text-indigo-100">Cakupan Instansi</span>
              <span class="font-bold">{{ allInstansiData.length }}</span>
            </div>
            <div class="flex justify-between" v-if="summary?.pendidikan">
              <span class="text-sm text-indigo-100">Kualifikasi S3</span>
              <span class="font-bold">{{ Math.round(summary.pendidikan.S3 / (summary.pendidikan.S2 + summary.pendidikan.S3) * 100) }}%</span>
            </div>
            <div class="bg-white/10 p-3 rounded-lg mt-4">
              <p class="text-xs text-indigo-100 font-medium">
                ✨ Widyaiswara Indonesia memiliki standar kualifikasi tinggi dengan distribusi yang merata di seluruh nusantara.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Data Instansi Table -->
    <div class="overflow-x-auto rounded-2xl shadow-2xl mt-8">
      <div class="flex items-center justify-between mb-4">
        <h4 class="font-black text-xl text-emerald-700 flex items-center gap-2">
          <div class="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
          📋 Detail Data per Instansi
        </h4>
        <div class="flex items-center gap-2 bg-gradient-to-r from-emerald-100 to-teal-100 px-4 py-2 rounded-full">
          <div class="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
          <span class="text-sm font-medium text-emerald-700">{{ allInstansiData.length }} instansi total</span>
        </div>
      </div>
      <table class="min-w-full text-left border-collapse bg-white/80 backdrop-blur-sm rounded-2xl overflow-hidden shadow-lg">
        <thead>
          <tr class="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 text-white">
            <th class="py-4 px-6 font-bold text-sm tracking-wider">🏛️ Instansi</th>
            <th class="py-4 px-6 font-bold text-sm tracking-wider text-right">👥 Total Widyaiswara</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(row, idx) in pagedInstansiData" :key="row.provinsi"
            :class=" [
              'group transition-all duration-300 hover:bg-gradient-to-r hover:from-emerald-50 hover:to-teal-50 hover:shadow-lg hover:scale-[1.01] cursor-pointer',
              idx % 2 === 0 ? 'bg-white/60' : 'bg-gradient-to-r from-gray-50/50 to-emerald-50/30'
            ]"
          >
            <td class="py-4 px-6 font-bold text-gray-700 group-hover:text-emerald-600 transition-colors">
              <div class="flex items-center gap-3">
                <div class="w-8 h-8 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                  {{ ((currentPage - 1) * itemsPerPage) + idx + 1 }}
                </div>
                <div class="max-w-xs break-words">{{ row.provinsi }}</div>
              </div>
            </td>
            <td class="py-4 px-6 text-right font-black text-emerald-700 group-hover:text-teal-600 transition-colors text-lg">
              {{ row.total }}
            </td>
          </tr>
          <tr class="bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-black">
            <td class="py-4 px-6 text-right font-black text-lg">
              🎯 TOTAL KESELURUHAN
            </td>
            <td class="py-4 px-6 text-right font-black text-xl">
              {{ totalAKAllProv }}
            </td>
          </tr>
        </tbody>
      </table>
      
      <!-- Pagination -->
      <div class="flex justify-center mt-6">
        <button
          class="px-4 py-2 bg-emerald-600 text-white rounded-l-lg hover:bg-emerald-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          :disabled="currentPage === 1"
          @click="currentPage = Math.max(1, currentPage - 1)"
        >Previous</button>
        <span class="px-4 py-2 text-emerald-700 font-semibold select-none bg-white border-t border-b">
          Halaman {{ currentPage }} dari {{ totalPages }}
        </span>
        <button
          class="px-4 py-2 bg-emerald-600 text-white rounded-r-lg hover:bg-emerald-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          :disabled="currentPage === totalPages"
          @click="currentPage = Math.min(totalPages, currentPage + 1)"
        >Next</button>
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
const allInstansiData = ref([])

// Pagination state
const currentPage = ref(1)
const itemsPerPage = 10

// Computed properties for pagination
const totalPages = computed(() => Math.ceil(allInstansiData.value.length / itemsPerPage))
const pagedInstansiData = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  const end = start + itemsPerPage
  return allInstansiData.value.slice(start, end)
})

onMounted(async () => {
  const res = await fetch('/api/widyaiswara/summary')
  summary.value = await res.json()
  // Total Widyaiswara dari semua instansi
  totalAKAllProv.value = Object.values(summary.value?.nama_instansi || {}).reduce((a, b) => a + b, 0)
  // Semua instansi (diurutkan berdasarkan total tertinggi)
  allInstansiData.value = Object.entries(summary.value?.nama_instansi || {})
    .map(([name, value]) => ({ provinsi: name, total: value }))
    .sort((a, b) => b.total - a.total)
  loading.value = false
})

// Chart options
const barOptions = computed(() => ({
  title: { text: 'Widyaiswara per Golongan', left: 'center' },
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

// Chart options untuk pendidikan (Donut Chart)
const pendidikanOptions = computed(() => ({
  title: { text: 'Distribusi Pendidikan', left: 'center', textStyle: { color: '#7c3aed' } },
  tooltip: { 
    trigger: 'item',
    formatter: '{b}: {c} orang ({d}%)'
  },
  legend: { 
    orient: 'horizontal',
    bottom: 10,
    textStyle: { fontSize: 12 }
  },
  series: [{
    type: 'pie',
    radius: ['40%', '70%'], // Donut chart
    center: ['50%', '45%'],
    data: Object.entries(summary.value?.pendidikan || {}).map(([name, value]) => ({ 
      value, 
      name,
      itemStyle: {
        color: name === 'S2' ? '#7c3aed' : name === 'S3' ? '#f59e0b' : '#6b7280'
      }
    })),
    label: { 
      formatter: '{b}\n{d}%',
      fontSize: 11,
      fontWeight: 'bold'
    },
    labelLine: { show: false },
    emphasis: {
      itemStyle: {
        shadowBlur: 10,
        shadowOffsetX: 0,
        shadowColor: 'rgba(0, 0, 0, 0.5)'
      }
    }
  }]
}))

// Chart options untuk rentang usia (Column Chart)
const usiaOptions = computed(() => {
  const usiaData = summary.value?.rentang_usia || {}
  const sortedUsia = [
    '25-29 tahun', '30-34 tahun', '35-39 tahun', '40-44 tahun', 
    '45-49 tahun', '50-54 tahun', '55-59 tahun', '≥60 tahun'
  ].filter(key => usiaData[key])
  
  return {
    title: { text: 'Distribusi Rentang Usia', left: 'center', textStyle: { color: '#ea580c' } },
    tooltip: { 
      trigger: 'axis',
      formatter: '{b}: {c} orang'
    },
    xAxis: { 
      type: 'category', 
      data: sortedUsia,
      axisLabel: {
        rotate: 45,
        fontSize: 10
      }
    },
    yAxis: { 
      type: 'value',
      name: 'Jumlah Orang',
      nameTextStyle: { fontSize: 12 }
    },
    series: [{
      type: 'bar',
      data: sortedUsia.map(key => usiaData[key]),
      itemStyle: {
        color: (params) => {
          const colors = ['#fbbf24', '#f59e0b', '#d97706', '#b45309', '#92400e', '#78350f', '#451a03', '#1c0a00']
          return colors[params.dataIndex] || '#ea580c'
        }
      },
      label: {
        show: true,
        position: 'top',
        fontSize: 10,
        fontWeight: 'bold'
      },
      barWidth: '60%'
    }],
    grid: {
      left: '10%',
      right: '10%',
      bottom: '15%',
      top: '15%'
    }
  }
})
</script>