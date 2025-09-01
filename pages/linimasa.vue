<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 font-sans">
    <!-- Hero Section -->
    <section class="py-16 px-4 sm:px-6 lg:px-8">
      <div class="max-w-7xl mx-auto text-center">
        <div class="flex items-center justify-center gap-3 mb-6">
          <span class="text-4xl text-blue-600">🕒</span>
          <h1 class="text-5xl md:text-6xl font-bold text-gray-900">
            Lini Masa <span class="bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">MANDALA</span>
          </h1>
        </div>
        <p class="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
          Jelajahi perjalanan dan pemahaman mendalam tentang berbagai jabatan fungsional melalui koleksi video edukatif yang komprehensif.
        </p>
      </div>
    </section>

    <!-- Video Timeline -->
    <section class="py-16 px-4 sm:px-6 lg:px-8">
          <div class="max-w-7xl mx-auto">
            <div class="space-y-16">
              <TimelineCard
                v-for="item in paginatedTimeline"
                :key="item.id"
                :item="item"
                :activeVideo="activeVideo"
                @toggleVideo="toggleVideo"
              />
            </div>
            <!-- Pagination -->
            <div class="flex justify-center items-center gap-2 mt-8">
              <button
                :disabled="currentPage === 1"
                @click="currentPage--"
                class="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
              >Prev</button>
              <span class="font-semibold">Halaman {{ currentPage }} dari {{ totalPages }}</span>
              <button
                :disabled="currentPage === totalPages"
                @click="currentPage++"
                class="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
              >Next</button>
            </div>
          </div>
        </section>

    <!-- Statistics Section -->
    <section class="py-16 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <h2 class="text-4xl font-bold text-gray-900 mb-4">Statistik Video</h2>
          <p class="text-xl text-gray-600">Koleksi video edukatif untuk pengembangan jabatan fungsional</p>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div class="text-center bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
            <div class="text-4xl font-bold text-blue-600 mb-2">{{ timelineData.length }}</div>
            <div class="text-gray-600 font-medium">Total Video</div>
          </div>
          <div class="text-center bg-gradient-to-br from-green-50 to-green-100 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
            <div class="text-4xl font-bold text-green-600 mb-2">3</div>
            <div class="text-gray-600 font-medium">Jabatan Fungsional</div>
          </div>
          <div class="text-center bg-gradient-to-br from-purple-50 to-purple-100 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
            <div class="text-4xl font-bold text-purple-600 mb-2">2024</div>
            <div class="text-gray-600 font-medium">Tahun Produksi</div>
          </div>
          <div class="text-center bg-gradient-to-br from-orange-50 to-orange-100 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
            <div class="text-4xl font-bold text-orange-600 mb-2">HD</div>
            <div class="text-gray-600 font-medium">Kualitas Video</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Call to Action -->
    <section class="py-16 bg-gradient-to-r from-blue-600 to-blue-800">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 class="text-4xl font-bold text-white mb-4">Siap Memulai Perjalanan Anda?</h2>
        <p class="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">Bergabunglah dengan sistem Mandala dan kelola data fungsional Anda dengan lebih efektif</p>
        <NuxtLink to="/login" class="inline-flex items-center gap-2 bg-white text-blue-600 hover:bg-blue-50 px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 hover:scale-105 shadow-xl hover:shadow-2xl">
          Masuk ke Sistem
          <span class="text-xl">➡️</span>
        </NuxtLink>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import TimelineCard from '@/components/TimelineCard.vue'



const activeVideo = ref(null)
const timelineData = ref([])
const currentPage = ref(1)
const pageSize = 5
const totalPages = computed(() => Math.ceil(timelineData.value.length / pageSize) || 1)
const paginatedTimeline = computed(() => {
  const start = (currentPage.value - 1) * pageSize
  return timelineData.value.slice(start, start + pageSize)
})

async function fetchTimeline() {
  try {
    const res = await fetch('/api/youtube')
    const data = await res.json()
    timelineData.value = Array.isArray(data)
      ? data
          .slice() // copy array
          .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
          .map((item) => {
            // Ekstrak videoId dari video_url YouTube
            let videoId = ''
            if (item.video_url) {
              const match = item.video_url.match(/[?&]v=([^&#]+)/)
              videoId = match ? match[1] : item.video_url
            }
            return {
              id: item.id,
              title: item.title,
              subtitle: item.subtitle,
              description: item.description,
              videoId,
              date: item.date_year || '',
              category: item.category?.name || '',
              color: item.color || 'from-blue-600 to-blue-800',
              bgColor: item.bg_color || 'from-blue-50 to-blue-100',
              icon: item.icon || '🎬',
            }
          })
      : []
  } catch (err) {
    timelineData.value = []
  }
}

fetchTimeline()

function toggleVideo(videoId) {
  activeVideo.value = activeVideo.value === videoId ? null : videoId
}
</script>
