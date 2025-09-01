<template>
  <div class="p-8 flex flex-col gap-10 min-h-screen bg-gray-50">
    <h1 class="text-3xl font-bold text-blue-700 mb-6">Analitik Analis Bangkom (Halaman Sementara)</h1>
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
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import VueECharts from 'vue-echarts'
import * as echarts from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { BarChart, PieChart } from 'echarts/charts'
import { TitleComponent, TooltipComponent, LegendComponent, GridComponent } from 'echarts/components'

echarts.use([CanvasRenderer, BarChart, PieChart, TitleComponent, TooltipComponent, LegendComponent, GridComponent])

// Dummy data sementara untuk Analis Bangkom
const barData = {
  labels: ['Golongan I', 'Golongan II', 'Golongan III', 'Golongan IV'],
  values: [5, 12, 18, 7]
}
const pieData = [
  { value: 30, name: 'Pria' },
  { value: 70, name: 'Wanita' }
]

const barOptions = computed(() => ({
  title: { text: 'Distribusi Golongan Analis Bangkom', left: 'center' },
  tooltip: {},
  xAxis: { type: 'category', data: barData.labels },
  yAxis: { type: 'value' },
  series: [{
    type: 'bar',
    data: barData.values,
    itemStyle: { color: '#2563eb' }
  }]
}))

const pieOptions = computed(() => ({
  title: { text: 'Komposisi Jenis Kelamin Analis Bangkom', left: 'center' },
  tooltip: { trigger: 'item' },
  legend: { bottom: 0 },
  series: [{
    type: 'pie',
    radius: '60%',
    data: pieData,
    label: { formatter: '{b}: {d}%' }
  }]
}))
</script>

<script>
definePageMeta({ layout: 'admin' })
</script>
