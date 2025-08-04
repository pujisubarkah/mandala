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
            v-for="item in timelineData"
            :key="item.id"
            :item="item"
            :activeVideo="activeVideo"
            @toggleVideo="toggleVideo"
          />
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
import { ref } from 'vue'
import TimelineCard from '@/components/TimelineCard.vue'

const activeVideo = ref(null)
const timelineData = [
  {
    id: 1,
    title: 'Pengenalan Sistem Fungsional',
    subtitle: 'Video Keseluruhan - Gambaran Lengkap',
    description: 'Video komprehensif tentang sistem fungsional yang mencakup semua aspek jabatan fungsional dalam pemerintahan Indonesia.',
    videoId: 'o9_fcOZIUxE',
    date: '2024',
    category: 'Overview',
    color: 'from-blue-600 to-blue-800',
    bgColor: 'from-blue-50 to-blue-100',
    icon: '🧑‍💼'
  },
  {
    id: 2,
    title: 'Analis Kebijakan',
    subtitle: 'Jabatan Fungsional Strategis',
    description: 'Memahami peran dan tanggung jawab Analis Kebijakan dalam merumuskan dan menganalisis kebijakan publik yang efektif.',
    videoId: 'PZ1AuvU4fG0',
    date: '2024',
    category: 'Analis Kebijakan',
    color: 'from-green-600 to-green-800',
    bgColor: 'from-green-50 to-green-100',
    icon: '📈'
  },
  {
    id: 3,
    title: 'Widyaiswara',
    subtitle: 'Pendidik dan Pengembang SDM',
    description: 'Eksplorasi mendalam tentang profesi Widyaiswara sebagai pendidik profesional dalam pengembangan kapasitas aparatur sipil negara.',
    videoId: 'A2RXvhHGvW0',
    date: '2024',
    category: 'Widyaiswara',
    color: 'from-purple-600 to-purple-800',
    bgColor: 'from-purple-50 to-purple-100',
    icon: '🏆'
  },
  {
    id: 4,
    title: 'Analis Bangkom',
    subtitle: 'Spesialis Pengembangan Kompetensi',
    description: 'Mengenal lebih dekat profesi Analis Pengembangan Kompetensi (Bangkom) dan kontribusinya dalam peningkatan SDM aparatur.',
    videoId: 'x_NgKrSS8z4',
    date: '2024',
    category: 'Analis Bangkom',
    color: 'from-orange-600 to-orange-800',
    bgColor: 'from-orange-50 to-orange-100',
    icon: '⏰'
  }
]

function toggleVideo(videoId) {
  activeVideo.value = activeVideo.value === videoId ? null : videoId
}
</script>
