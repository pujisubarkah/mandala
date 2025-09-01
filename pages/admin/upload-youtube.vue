<template>
  <div class="min-h-screen bg-white p-8">
    <div class="flex justify-between items-center mb-8">
      <h1 class="text-3xl font-bold">Manajemen Video YouTube</h1>
      <button @click="showModal = true" class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold shadow-lg transition-all duration-300">
        + Upload Video
      </button>
    </div>

    <!-- Modal Input Video -->
    <div v-if="showModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div class="bg-white rounded-xl shadow-xl p-8 w-full max-w-lg relative">
        <button @click="showModal = false" class="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-2xl">&times;</button>
        <h2 class="text-xl font-bold mb-6">Upload Video Baru</h2>
        <form @submit.prevent="submitVideo">
          <div class="mb-4">
            <label class="block font-semibold mb-1">Judul</label>
            <input v-model="form.title" type="text" class="w-full border rounded px-3 py-2" required />
          </div>
          <div class="mb-4">
            <label class="block font-semibold mb-1">Subjudul</label>
            <input v-model="form.subtitle" type="text" class="w-full border rounded px-3 py-2" />
          </div>
          <div class="mb-4">
            <label class="block font-semibold mb-1">Deskripsi</label>
            <textarea v-model="form.description" class="w-full border rounded px-3 py-2" rows="3"></textarea>
          </div>
          <div class="mb-4">
            <label class="block font-semibold mb-1">URL Video YouTube</label>
            <input v-model="form.video_url" type="url" class="w-full border rounded px-3 py-2" required />
          </div>
          <div class="mb-4">
            <label class="block font-semibold mb-1">Tahun</label>
            <input v-model="form.date_year" type="number" class="w-full border rounded px-3 py-2" required />
          </div>
          <div class="mb-4">
            <label class="block font-semibold mb-1">Kategori</label>
            <select v-model="form.category_id" class="w-full border rounded px-3 py-2" required>
              <option v-for="cat in categories" :key="cat.id" :value="cat.id">{{ cat.name }}</option>
            </select>
          </div>
          <div class="mb-4">
            <label class="block font-semibold mb-1">Icon (Emoji)</label>
            <select v-model="form.icon" class="w-full border rounded px-3 py-2">
              <option value="">Pilih Emoji</option>
              <option value="🧑‍💼">🧑‍💼 Analis</option>
              <option value="📈">📈 Statistik</option>
              <option value="🏆">🏆 Widyaiswara</option>
              <option value="⏰">⏰ Bangkom</option>
              <option value="🎬">🎬 Video</option>
              <option value="🌐">🌐 Global</option>
              <option value="📚">📚 Edukasi</option>
              <option value="📝">📝 Kebijakan</option>
            </select>
          </div>
          <div class="mb-4">
            <label class="block font-semibold mb-1">Warna Card</label>
            <select v-model="form.color" class="w-full border rounded px-3 py-2">
              <option value="">Pilih Warna</option>
              <option value="from-blue-600 to-blue-800">Biru</option>
              <option value="from-green-600 to-green-800">Hijau</option>
              <option value="from-purple-600 to-purple-800">Ungu</option>
              <option value="from-orange-600 to-orange-800">Oranye</option>
              <option value="from-red-600 to-red-700">Merah</option>
            </select>
          </div>
          <div class="mb-4">
            <label class="block font-semibold mb-1">Warna Background Card</label>
            <select v-model="form.bg_color" class="w-full border rounded px-3 py-2">
              <option value="">Pilih Background</option>
              <option value="from-blue-50 to-blue-100">Biru Muda</option>
              <option value="from-green-50 to-green-100">Hijau Muda</option>
              <option value="from-purple-50 to-purple-100">Ungu Muda</option>
              <option value="from-orange-50 to-orange-100">Oranye Muda</option>
              <option value="from-red-50 to-red-100">Merah Muda</option>
            </select>
          </div>
          <div class="flex justify-end gap-2 mt-6">
            <button type="button" @click="showModal = false" class="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300">Batal</button>
            <button type="submit" class="px-6 py-2 rounded bg-blue-600 text-white font-semibold hover:bg-blue-700">Simpan</button>
          </div>
        </form>
      </div>
    </div>

    <!-- Tabel Video -->
    <div class="overflow-x-auto bg-white rounded-xl shadow-lg">
      <table class="min-w-full text-left">
        <thead>
          <tr class="bg-blue-50">
            <th class="py-3 px-4 font-bold">Judul</th>
            <th class="py-3 px-4 font-bold">Subjudul</th>
            <th class="py-3 px-4 font-bold">Deskripsi</th>
            <th class="py-3 px-4 font-bold">Kategori</th>
            <th class="py-3 px-4 font-bold">Tahun</th>
            <th class="py-3 px-4 font-bold">Icon</th>
            <th class="py-3 px-4 font-bold">Aksi</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in paginatedVideos" :key="item.id" class="border-b">
            <td class="py-2 px-4">{{ item.title }}</td>
            <td class="py-2 px-4">{{ item.subtitle }}</td>
            <td class="py-2 px-4 max-w-xs truncate" :title="item.description">{{ item.description }}</td>
            <td class="py-2 px-4">{{ item.category?.name }}</td>
            <td class="py-2 px-4">{{ item.date_year }}</td>
            <td class="py-2 px-4 text-2xl">{{ item.icon }}</td>
            <td class="py-2 px-4 flex gap-2">
              <button @click="editVideo(item)" class="text-blue-600 hover:text-blue-800 font-bold">Edit</button>
              <button @click="deleteVideo(item.id)" class="text-red-600 hover:text-red-800 font-bold">Hapus</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Pagination -->
    <div class="flex justify-center items-center gap-2 mt-6">
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
</template>

<script setup>
import { computed } from 'vue'
definePageMeta({ layout: 'admin' })
import { ref, onMounted } from 'vue'

const showModal = ref(false)
const videos = ref([])
const categories = ref([])
const form = ref({
  title: '',
  subtitle: '',
  description: '',
  video_url: '',
  date_year: new Date().getFullYear(),
  category_id: '',
  icon: '',
  color: '',
  bg_color: ''
})

const currentPage = ref(1)
const pageSize = 10
const totalPages = computed(() => Math.ceil(videos.value.length / pageSize) || 1)
const paginatedVideos = computed(() => {
  const start = (currentPage.value - 1) * pageSize
  return videos.value.slice(start, start + pageSize)
})

async function fetchVideos() {
  const res = await fetch('/api/youtube')
  const data = await res.json()
  videos.value = Array.isArray(data) ? data : []
}

async function fetchCategories() {
  const res = await fetch('/api/video_kategori')
  const data = await res.json()
  categories.value = Array.isArray(data) ? data : []
}

async function submitVideo() {
  let res
  if (form.value.id) {
    // Edit video
    res = await fetch(`/api/youtube/${form.value.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form.value)
    })
  } else {
    // Tambah video
    res = await fetch('/api/youtube', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form.value)
    })
  }
  if (res.ok) {
    showModal.value = false
    form.value = {
      title: '', subtitle: '', description: '', video_url: '', date_year: new Date().getFullYear(), category_id: '', icon: ''
    }
    fetchVideos()
  }
}
function editVideo(item) {
  form.value = {
    id: item.id,
    title: item.title,
    subtitle: item.subtitle,
    description: item.description,
    video_url: item.video_url,
    date_year: item.date_year,
    category_id: item.category_id,
    icon: item.icon || '',
    color: item.color || '',
    bg_color: item.bg_color || ''
  }
  showModal.value = true
}

async function deleteVideo(id) {
  if (!confirm('Yakin ingin menghapus video ini?')) return
  const res = await fetch(`/api/youtube/${id}`, { method: 'DELETE' })
  if (res.ok) fetchVideos()
}

onMounted(() => {
  fetchVideos()
  fetchCategories()
})
</script>

<style scoped>
/* Optional: custom style for modal overlay */
</style>
