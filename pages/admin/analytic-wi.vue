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