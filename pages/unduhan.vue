<template>
  <div class="min-h-screen bg-gray-50 font-sans">
    

    <!-- Hero Section -->
    <section class="py-16 px-4 sm:px-6 lg:px-8 bg-white">
      <div class="max-w-7xl mx-auto text-center">
        <div class="flex items-center justify-center gap-3 mb-6">
          <span class="text-4xl text-blue-600">⬇️</span>
          <h1 class="text-5xl md:text-6xl font-bold text-gray-900">
            Pusat <span class="text-blue-600">Unduhan</span>
          </h1>
        </div>
        <p class="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
          Download peraturan, panduan, dan dokumentasi resmi terkait Jabatan Fungsional Analis Kebijakan dalam format PDF yang mudah diakses dan dipelajari.
        </p>
      </div>
    </section>

    <!-- Search and Filter Section -->
    <section class="py-8 px-4 sm:px-6 lg:px-8">
      <div class="max-w-7xl mx-auto">
        <div class="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <div class="flex flex-col md:flex-row gap-4">
            <div class="relative flex-1">
              <span class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg">🔍</span>
              <input v-model="searchTerm" type="text" placeholder="Cari peraturan, panduan, atau kata kunci..." class="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white" />
            </div>
            <div class="relative">
              <span class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg">⚙️</span>
              <select v-model="selectedCategory" class="pl-10 pr-8 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white appearance-none min-w-[200px]">
                <option value="">Semua</option>
                <option v-for="cat in categories" :key="cat" :value="cat">{{ cat }}</option>
              </select>
            </div>
          </div>
          <div class="mt-4 text-sm text-gray-600">
            Ditemukan <span class="font-bold text-blue-600">{{ filteredFiles.length }}</span> file
          </div>
        </div>
      </div>
    </section>

    <!-- Files Grid -->
    <section class="py-8 px-4 sm:px-6 lg:px-8">
      <div class="max-w-7xl mx-auto">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div v-for="file in paginatedFiles" :key="file.id" class="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105 group cursor-pointer border border-gray-200" @click="openModal(file)">
            <div :class="['w-16 h-16 rounded-lg flex flex-col items-center justify-center mb-4 transition-colors duration-300 relative shadow-md', file.bgColor]">
              <span class="text-white text-lg mb-1">📄</span>
              <span class="text-white text-xs font-bold">PDF</span>
              <div class="absolute top-0 right-0 w-3 h-3 bg-white bg-opacity-20 transform rotate-45 translate-x-1 -translate-y-1"></div>
            </div>
            <div class="inline-block px-3 py-1 bg-blue-600 text-white text-xs font-bold rounded-full mb-3">{{ file.category }}</div>
            <h3 class="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-300">{{ file.title }}</h3>
            <p class="text-gray-600 text-sm mb-4 line-clamp-3">{{ file.description }}</p>
            <div class="flex justify-between items-center text-xs text-gray-500 mb-4">
              <span class="flex items-center gap-1">💾 {{ file.fileSize }}</span>
              <span class="flex items-center gap-1">📚 {{ file.fileCount }} file</span>
            </div>
            <div class="flex flex-wrap gap-1 mb-4">
              <span v-for="tag in file.tags.slice(0,3)" :key="tag" class="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">{{ tag }}</span>
            </div>
            <div class="flex gap-2">
              <button @click.stop="openModal(file)" class="flex-1 flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 hover:text-blue-600 px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-300">
                👁️ Detail
              </button>
              <a :href="file.downloadUrl" :download="file.fileName" class="flex-1 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-300">
                ⬇️ Download
              </a>
            </div>
          </div>
        </div>
        <!-- Pagination Controls -->
        <div v-if="totalPages > 1" class="flex justify-center items-center gap-2 mt-8">
          <button @click="goToPage(currentPage - 1)" :disabled="currentPage === 1" class="px-4 py-2 rounded-lg bg-gray-100 text-gray-700 font-medium disabled:opacity-50">Sebelumnya</button>
          <span class="mx-2 text-sm">Halaman {{ currentPage }} dari {{ totalPages }}</span>
          <button @click="goToPage(currentPage + 1)" :disabled="currentPage === totalPages" class="px-4 py-2 rounded-lg bg-gray-100 text-gray-700 font-medium disabled:opacity-50">Berikutnya</button>
        </div>
      </div>
    </section>

    <!-- File Detail Modal -->
    <div v-if="isModalOpen && selectedFile" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div class="bg-white rounded-lg shadow-xl p-8 w-full max-w-2xl relative border border-gray-200 max-h-[90vh] overflow-y-auto">
        <button @click="closeModal" class="absolute top-4 right-4 text-gray-400 hover:text-red-500 bg-gray-100 hover:bg-red-50 rounded-full p-2 transition-colors duration-300">✖️</button>
        <div class="text-center mb-6">
          <div :class="['w-20 h-20 rounded-lg flex flex-col items-center justify-center mx-auto mb-4 relative shadow-lg', selectedFile.bgColor]">
            <span class="text-white text-2xl mb-1">📄</span>
            <span class="text-white text-sm font-bold">PDF</span>
            <div class="absolute top-0 right-0 w-4 h-4 bg-white bg-opacity-20 transform rotate-45 translate-x-2 -translate-y-2"></div>
          </div>
          <div class="inline-block px-4 py-2 bg-blue-600 text-white text-sm font-bold rounded-full mb-4">{{ selectedFile.category }}</div>
          <h2 class="text-3xl font-bold text-gray-900 mb-2">{{ selectedFile.title }}</h2>
          <p class="text-gray-600 leading-relaxed">{{ selectedFile.description }}</p>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div class="space-y-4">
            <div class="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <div class="flex items-center gap-3 mb-2">📄 <span class="font-semibold text-gray-800">Nama File</span></div>
              <p class="text-gray-600 text-sm font-mono bg-white px-3 py-2 rounded-lg">{{ selectedFile.fileName }}</p>
            </div>
            <div class="bg-green-50 p-4 rounded-lg border border-green-200">
              <div class="flex items-center gap-3 mb-2">💾 <span class="font-semibold text-gray-800">Ukuran File</span></div>
              <p class="text-gray-600 font-medium">{{ selectedFile.fileSize }}</p>
            </div>
            <div class="bg-purple-50 p-4 rounded-lg border border-purple-200">
              <div class="flex items-center gap-3 mb-2">📚 <span class="font-semibold text-gray-800">Jumlah File</span></div>
              <p class="text-gray-600 font-medium">{{ selectedFile.fileCount }} dokumen</p>
            </div>
          </div>
          <div class="space-y-4">
            <div class="bg-orange-50 p-4 rounded-lg border border-orange-200">
              <div class="flex items-center gap-3 mb-2">📅 <span class="font-semibold text-gray-800">Tanggal Dibuat</span></div>
              <p class="text-gray-600 font-medium">{{ selectedFile.createDate }}</p>
            </div>
            <div class="bg-red-50 p-4 rounded-lg border border-red-200">
              <div class="flex items-center gap-3 mb-2">🕒 <span class="font-semibold text-gray-800">Terakhir Diperbarui</span></div>
              <p class="text-gray-600 font-medium">{{ selectedFile.lastModified }}</p>
            </div>
            <div class="bg-indigo-50 p-4 rounded-lg border border-indigo-200">
              <div class="flex items-center gap-3 mb-2"><span class="font-semibold text-gray-800">Tags</span></div>
              <div class="flex flex-wrap gap-2">
                <span v-for="tag in selectedFile.tags" :key="tag" class="px-3 py-1 bg-white text-indigo-600 text-sm font-medium rounded-full border border-indigo-200">{{ tag }}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="text-center">
          <a :href="selectedFile.downloadUrl" :download="selectedFile.fileName" class="inline-flex items-center gap-3 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors">
            ⬇️ Download File <span class="text-sm opacity-90">({{ selectedFile.fileSize }})</span>
          </a>
        </div>
      </div>
    </div>

    <!-- Statistics Section -->
    <section class="py-16 bg-white border-t border-gray-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <h2 class="text-4xl font-bold text-gray-900 mb-4">Statistik Unduhan</h2>
          <p class="text-xl text-gray-600">Koleksi peraturan dan panduan untuk Analis Kebijakan</p>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div class="text-center bg-blue-50 p-8 rounded-lg border border-blue-200 hover:shadow-md transition-shadow duration-300">
            <div class="text-4xl font-bold text-blue-600 mb-2">{{ pdfFiles.length }}</div>
            <div class="text-gray-600 font-medium">Total Dokumen</div>
          </div>
          <div class="text-center bg-green-50 p-8 rounded-lg border border-green-200 hover:shadow-md transition-shadow duration-300">
            <div class="text-4xl font-bold text-green-600 mb-2">{{ categories.length }}</div>
            <div class="text-gray-600 font-medium">Kategori</div>
          </div>
          <div class="text-center bg-purple-50 p-8 rounded-lg border border-purple-200 hover:shadow-md transition-shadow duration-300">
            <div class="text-4xl font-bold text-purple-600 mb-2">{{ totalFileCount }}</div>
            <div class="text-gray-600 font-medium">Total File</div>
          </div>
          <div class="text-center bg-orange-50 p-8 rounded-lg border border-orange-200 hover:shadow-md transition-shadow duration-300">
            <div class="text-4xl font-bold text-orange-600 mb-2">2024</div>
            <div class="text-gray-600 font-medium">Update Terbaru</div>
          </div>
        </div>
      </div>
    </section>

   
  </div>
</template>

<script setup>


import { ref, computed, watch } from 'vue';
const searchTerm = ref('');
const selectedCategory = ref('');
// Reset currentPage ke 1 setiap kali filter berubah
watch([searchTerm, selectedCategory], () => {
  currentPage.value = 1;
});

// Menggunakan useSeoMeta untuk meta tags yang lebih aman
useSeoMeta({
  title: 'Pusat Unduhan | Mandala',
  description: 'Download peraturan, panduan, dan dokumentasi resmi Jabatan Fungsional Analis Kebijakan.'
});


const isModalOpen = ref(false);
const selectedFile = ref(null);

const pdfFiles = ref([]);
const currentPage = ref(1);
const pageSize = 6;

async function fetchDownloads() {
  const res = await fetch('/api/download');
  const data = await res.json();
  pdfFiles.value = Array.isArray(data)
    ? data.map(item => ({
        id: item.id,
        title: item.title,
        category: item.category?.name || '',
        description: item.description,
        fileName: item.file_name,
        fileSize: item.file_size,
        fileCount: item.file_count,
        createDate: item.create_date,
        lastModified: item.last_modified,
        downloadUrl: item.download_url,
        tags: Array.isArray(item.tags) ? item.tags.map(t => t.tag) : [],
        bgColor: item.bg_color || (item.category?.bg_color ? `bg-gradient-to-br ${item.category.bg_color}` : '')
      }))
      .sort((a, b) => {
        const dateA = new Date(a.createDate);
        const dateB = new Date(b.createDate);
        return dateB - dateA;
      })
    : [];
}

fetchDownloads();

const categories = computed(() => {
  const cats = pdfFiles.value.map(f => f.category);
  return Array.from(new Set(cats));
});

const filteredFiles = computed(() => {
  return pdfFiles.value.filter(file => {
    const matchesSearch = file.title.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
      file.description.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
      file.tags.some(tag => tag.toLowerCase().includes(searchTerm.value.toLowerCase()));
    const matchesCategory = !selectedCategory.value || file.category === selectedCategory.value;
    return matchesSearch && matchesCategory;
  });
});

const totalPages = computed(() => Math.ceil(filteredFiles.value.length / pageSize));

const paginatedFiles = computed(() => {
  const start = (currentPage.value - 1) * pageSize;
  return filteredFiles.value.slice(start, start + pageSize);
});

function goToPage(page) {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page;
  }
}

const totalFileCount = computed(() => pdfFiles.value.reduce((sum, file) => sum + file.fileCount, 0));

function openModal(file) {
  selectedFile.value = file;
  isModalOpen.value = true;
}
function closeModal() {
  isModalOpen.value = false;
  selectedFile.value = null;
}
</script>

<style scoped>
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
