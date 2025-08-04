<template>
  <div class="flex flex-col items-center justify-center min-h-[60vh]">
    <h2 class="text-2xl font-bold mb-8">Pilih Tanggal Jadwal Ujikom</h2>
    <div class="bg-white rounded-xl shadow p-6 w-[350px]">
      <div class="flex justify-between items-center mb-4">
        <button class="btn btn-sm btn-ghost" @click="prevMonth">&#8592;</button>
        <span class="font-semibold text-lg">{{ monthName }} {{ year }}</span>
        <button class="btn btn-sm btn-ghost" @click="nextMonth">&#8594;</button>
      </div>
      <div class="grid grid-cols-7 gap-1 text-center mb-2">
        <span v-for="d in days" :key="d" class="font-bold">{{ d }}</span>
      </div>
      <div class="grid grid-cols-7 gap-1">
        <span v-for="n in firstDayOfMonth" :key="'empty'+n"></span>
        <button v-for="d in daysInMonth" :key="d" class="btn btn-ghost btn-sm rounded-full"
          :class="{'bg-primary text-white': isSelected(d)}"
          @click="selectDate(d)">{{ d }}</button>
      </div>
    </div>
    <button class="btn btn-primary btn-lg mt-8" :disabled="!tanggal" @click="goToForm">Lanjutkan</button>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()
const today = new Date()
const year = ref(today.getFullYear())
const month = ref(today.getMonth()) // 0-indexed
const tanggal = ref('')

const days = ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab']
const monthName = computed(() =>
  new Date(year.value, month.value).toLocaleString('id-ID', { month: 'long' })
)
const daysInMonth = computed(() =>
  new Date(year.value, month.value + 1, 0).getDate()
)
const firstDayOfMonth = computed(() =>
  (new Date(year.value, month.value, 1).getDay())
)

function prevMonth() {
  if (month.value === 0) {
    month.value = 11
    year.value--
  } else {
    month.value--
  }
}
function nextMonth() {
  if (month.value === 11) {
    month.value = 0
    year.value++
  } else {
    month.value++
  }
}
function selectDate(d) {
  const m = (month.value + 1).toString().padStart(2, '0')
  const day = d.toString().padStart(2, '0')
  tanggal.value = `${year.value}-${m}-${day}`
}
function isSelected(d) {
  const m = (month.value + 1).toString().padStart(2, '0')
  const day = d.toString().padStart(2, '0')
  return tanggal.value === `${year.value}-${m}-${day}`
}
function goToForm() {
  router.push('/admin_uji/home')
}
</script>
