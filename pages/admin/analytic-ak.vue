<template>
  <div class="p-8 flex flex-col gap-10 min-h-screen relative overflow-hidden">
    <!-- Header -->
    <div class="relative bg-white/40 backdrop-blur-2xl rounded-3xl p-10 shadow-2xl border border-white/50">
      <div class="flex items-center justify-between">
        <div>
          <h1 class="text-5xl font-black bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent mb-3">
            <BarChart2 class="inline-block w-10 h-10 text-blue-600 mr-2" /> Analitik Data AK
          </h1>
          <p class="text-gray-700 text-xl font-medium">Dashboard analisis mendalam untuk insight data Analis Kebijakan</p>
        </div>
        <div class="hidden md:flex items-center gap-6">
          <div class="text-right">
            <div class="text-4xl font-black text-blue-600">{{ totalAKAllProv }}</div>
            <div class="text-sm text-gray-600 font-medium">Total AK</div>
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

    <!-- Top Instansi Table -->
    <div class="overflow-x-auto rounded-2xl shadow-2xl mt-8">
      <h4 class="font-black text-xl mb-4 text-emerald-700 flex items-center gap-2">
        <div class="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
        📋 Detail Data per Instansi
      </h4>
      <table class="min-w-full text-left border-collapse bg-white/80 backdrop-blur-sm rounded-2xl overflow-hidden shadow-lg">
        <thead>
          <tr class="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 text-white">
            <th class="py-4 px-6 font-bold text-sm tracking-wider">🏛️ Instansi</th>
            <th class="py-4 px-6 font-bold text-sm tracking-wider text-right">👥 Total AK</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(row, idx) in provinsiData" :key="row.provinsi"
            :class=" [
              'group transition-all duration-300 hover:bg-gradient-to-r hover:from-emerald-50 hover:to-teal-50 hover:shadow-lg hover:scale-[1.01] cursor-pointer',
              idx % 2 === 0 ? 'bg-white/60' : 'bg-gradient-to-r from-gray-50/50 to-emerald-50/30'
            ]"
          >
            <td class="py-4 px-6 font-bold text-gray-700 group-hover:text-emerald-600 transition-colors">
              <div class="flex items-center gap-3">
                <div class="w-8 h-8 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                  {{ idx + 1 }}
                </div>
                <div class="max-w-xs truncate">{{ row.provinsi }}</div>
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
              {{ provinsiData.reduce((a,b)=>a+b.total,0) }}
            </td>
          </tr>
        </tbody>
      </table>
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
})

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
</script>