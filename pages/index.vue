<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-100 via-yellow-50 to-green-100 font-sans">
   

    <!-- Hero Section -->
<section id="beranda" class="py-20 px-4 sm:px-6 lg:px-8">
  <div class="max-w-7xl mx-auto text-center">
  <div class="p-2 inline-block mb-6 bg-transparent">
  <img src="/logo.png" alt="Logo Mandala" style="width: 480px; height: auto; display: block; background: transparent;" />
</div>

    <h1 class="text-5xl md:text-6xl font-bold text-gray-900 mb-6 flex items-center justify-center gap-4">
      Selamat Datang di
      <span class="bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">daTAMANDALA</span>
    </h1>

    <p class="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
      Data Elektronik Kompetensi ASN. Kelola data pegawai, pantau jenjang karir, dan analisis kinerja dalam satu platform terintegrasi.
    </p>

    <div class="flex flex-col sm:flex-row gap-4 justify-center">
      <NuxtLink
        to="/login"
        class="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 hover:scale-105 shadow-xl hover:shadow-2xl"
      >
        <span class="text-xl">🔑</span>
        Mulai Sekarang
        <span class="text-xl">➡️</span>
      </NuxtLink>

      <NuxtLink
        to="/unduhan"
        class="inline-flex items-center gap-2 border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 hover:scale-105"
      >
        <span class="text-xl">⬇️</span>
        Pelajari Lebih Lanjut
      </NuxtLink>
    </div>
  </div>
</section>


    <!-- Informasi Terkini Section -->
    <section class="py-20 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="text-4xl font-bold text-gray-900 mb-4">Informasi Terkini</h2>
          <p class="text-xl text-gray-600 max-w-2xl mx-auto">
            Update terbaru mengenai uji kompetensi, verifikasi validasi, dan peraturan jabatan fungsional
          </p>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div class="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
            <span class="text-3xl text-blue-600 mb-4">⬇️</span>
            <h3 class="text-lg font-bold text-gray-900 mb-2">Panduan Uji Kompetensi AK</h3>
            <p class="text-gray-600 mb-4 text-sm">Panduan pelaksanaan uji kompetensi Analis Kebijakan terbaru</p>
            <NuxtLink to="/unduhan" class="text-blue-600 font-medium hover:text-blue-800 transition-colors text-sm">Download PDF</NuxtLink>
          </div>
          <div class="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
            <span class="text-3xl text-green-600 mb-4">⬇️</span>
            <h3 class="text-lg font-bold text-gray-900 mb-2">Daftar Peserta Lulus</h3>
            <p class="text-gray-600 mb-4 text-sm">Daftar nama peserta lulus verifikasi dan validasi uji kompetensi</p>
            <NuxtLink to="/unduhan" class="text-green-600 font-medium hover:text-green-800 transition-colors text-sm">Download Excel</NuxtLink>
          </div>
          <div class="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
            <span class="text-3xl text-purple-600 mb-4">⬇️</span>
            <h3 class="text-lg font-bold text-gray-900 mb-2">Hasil Verval Widyaiswara</h3>
            <p class="text-gray-600 mb-4 text-sm">Hasil verifikasi dan validasi jabatan fungsional Widyaiswara</p>
            <NuxtLink to="/unduhan" class="text-purple-600 font-medium hover:text-purple-800 transition-colors text-sm">Download PDF</NuxtLink>
          </div>
          <div class="bg-gradient-to-br from-orange-50 to-orange-100 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
            <span class="text-3xl text-orange-600 mb-4">⬇️</span>
            <h3 class="text-lg font-bold text-gray-900 mb-2">Peraturan Widyaiswara</h3>
            <p class="text-gray-600 mb-4 text-sm">Salinan peraturan terbaru tentang jabatan fungsional Widyaiswara</p>
            <NuxtLink to="/unduhan" class="text-orange-600 font-medium hover:text-orange-800 transition-colors text-sm">Download PDF</NuxtLink>
          </div>
        </div>
        <div class="text-center mt-12">
          <NuxtLink to="/unduhan" class="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105 shadow-lg">
            <span class="text-lg">⬇️</span>
            Lihat Semua Informasi
            <span class="text-lg">➡️</span>
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- Timeline Section -->
    <section id="timeline" class="py-20 bg-gradient-to-br from-blue-50 via-white to-blue-100">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="text-4xl font-bold text-gray-900 mb-4">Lini Masa Pengembangan</h2>
          <p class="text-xl text-gray-600 max-w-2xl mx-auto">
            Perjalanan pengembangan sistem Mandala dari konsep hingga implementasi
          </p>
        </div>
        <div class="space-y-8">
          <div class="flex items-center gap-6 bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
            <div class="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">1</div>
            <div>
              <h3 class="text-xl font-bold text-gray-900">Analisis Kebutuhan</h3>
              <p class="text-gray-600">Identifikasi kebutuhan sistem manajemen data fungsional yang komprehensif</p>
            </div>
          </div>
          <div class="flex items-center gap-6 bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
            <div class="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center text-white font-bold">2</div>
            <div>
              <h3 class="text-xl font-bold text-gray-900">Desain & Pengembangan</h3>
              <p class="text-gray-600">Perancangan arsitektur sistem dan development interface yang user-friendly</p>
            </div>
          </div>
          <div class="flex items-center gap-6 bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
            <div class="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold">3</div>
            <div>
              <h3 class="text-xl font-bold text-gray-900">Testing & Implementasi</h3>
              <p class="text-gray-600">Pengujian sistem secara menyeluruh dan implementasi bertahap di berbagai instansi</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Download Section -->
    <section id="download" class="py-20 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="text-4xl font-bold text-gray-900 mb-4">Pusat Unduhan</h2>
          <p class="text-xl text-gray-600 max-w-2xl mx-auto">
            Akses berbagai dokumen, formulir, dan file penting untuk jabatan fungsional Analis Kebijakan
          </p>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div class="bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
            <div class="w-16 h-16 bg-blue-600 rounded-xl flex items-center justify-center mb-6">
              <span class="text-white text-2xl">📄</span>
            </div>
            <h3 class="text-xl font-bold text-gray-900 mb-4">Formulir & Template</h3>
            <p class="text-gray-600 mb-6">Formulir pengajuan, template laporan, dan dokumen administratif lainnya</p>
            <NuxtLink to="/unduhan" class="text-blue-600 font-medium hover:text-blue-800 transition-colors">Lihat Formulir →</NuxtLink>
          </div>
          <div class="bg-gradient-to-br from-green-50 to-green-100 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
            <div class="w-16 h-16 bg-green-600 rounded-xl flex items-center justify-center mb-6">
              <span class="text-white text-2xl">📖</span>
            </div>
            <h3 class="text-xl font-bold text-gray-900 mb-4">Panduan & Manual</h3>
            <p class="text-gray-600 mb-6">Panduan penggunaan sistem, manual prosedur, dan dokumentasi lengkap</p>
            <NuxtLink to="/unduhan" class="text-green-600 font-medium hover:text-green-800 transition-colors">Lihat Panduan →</NuxtLink>
          </div>
          <div class="bg-gradient-to-br from-purple-50 to-purple-100 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
            <div class="w-16 h-16 bg-purple-600 rounded-xl flex items-center justify-center mb-6">
              <span class="text-white text-2xl">📊</span>
            </div>
            <h3 class="text-xl font-bold text-gray-900 mb-4">Data & Laporan</h3>
            <p class="text-gray-600 mb-6">Data statistik, laporan analisis, dan file backup sistem</p>
            <NuxtLink to="/unduhan" class="text-purple-600 font-medium hover:text-purple-800 transition-colors">Lihat Data →</NuxtLink>
          </div>
        </div>
        <div class="text-center mt-12">
          <NuxtLink to="/unduhan" class="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105 shadow-lg">
            <span class="text-lg">⬇️</span>
            Kunjungi Pusat Unduhan
            <span class="text-lg">➡️</span>
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- FAQ Section -->
    <section id="faq" class="py-20 bg-gradient-to-br from-blue-50 via-white to-blue-100">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="text-4xl font-bold text-gray-900 mb-4">FAQ</h2>
          <p class="text-xl text-gray-600">Pertanyaan yang sering diajukan tentang sistem Mandala</p>
        </div>
        <div class="space-y-6">
          <div class="bg-white p-6 rounded-2xl shadow-lg">
            <h3 class="text-xl font-bold text-gray-900 mb-3">Apa itu sistem Mandala?</h3>
            <p class="text-gray-600">Mandala adalah Sistem Informasi Manajemen Data Fungsional yang dirancang khusus untuk mengelola data Analis Kebijakan (AK) secara komprehensif dan terintegrasi.</p>
          </div>
          <div class="bg-white p-6 rounded-2xl shadow-lg">
            <h3 class="text-xl font-bold text-gray-900 mb-3">Siapa yang dapat menggunakan sistem ini?</h3>
            <p class="text-gray-600">Sistem ini dapat digunakan oleh admin instansi, user pegawai AK, dan pimpinan untuk mengelola dan memantau data fungsional.</p>
          </div>
          <div class="bg-white p-6 rounded-2xl shadow-lg">
            <h3 class="text-xl font-bold text-gray-900 mb-3">Bagaimana cara mengakses sistem?</h3>
            <p class="text-gray-600">Anda dapat mengakses sistem melalui web browser dengan login menggunakan akun yang telah didaftarkan oleh admin instansi.</p>
          </div>
          <div class="bg-white p-6 rounded-2xl shadow-lg">
            <h3 class="text-xl font-bold text-gray-900 mb-3">Apakah data aman di sistem ini?</h3>
            <p class="text-gray-600">Ya, sistem Mandala menggunakan enkripsi data dan sistem keamanan berlapis untuk melindungi informasi sensitif pegawai.</p>
          </div>
        </div>
      </div>
        <div class="text-center mt-12">
          <NuxtLink to="/unduhan" class="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105 shadow-lg">
            <span class="text-lg">⬇️</span>
            Lihat Detail Data Jenjang
            <span class="text-lg">➡️</span>
          </NuxtLink>
        </div>
      </section>

      <client-only>
  <VueECharts :option="chartOptions" style="height: 400px; width: 100%" />
</client-only>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import VueECharts from 'vue-echarts'

const jenjangSummary = ref([])

onMounted(async () => {
  jenjangSummary.value = await $fetch('/api/analis_kebijakan/jenjang')
})

const chartOptions = computed(() => ({
  tooltip: { trigger: 'item' },
  legend: { top: 'bottom' },
  series: [
    {
      name: 'Total Pegawai per Jenjang',
      type: 'pie',
      radius: ['40%', '70%'],
      avoidLabelOverlap: false,
      label: {
        show: true,
        formatter: '{b}: {c}',
      },
      data: jenjangSummary.value.map(j => ({
        value: j.total,
        name: j.nm_jenjang
      }))
    }
  ]
}))
</script>
