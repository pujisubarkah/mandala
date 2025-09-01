<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 via-white to-emerald-50 p-8">
    <div class="max-w-5xl mx-auto">
      <h1 class="text-2xl font-bold text-blue-700 mb-6">Data & Form Input</h1>
      <!-- Tabel Data -->
      <div class="bg-white rounded-xl shadow p-6 mb-8">
        <h2 class="text-lg font-semibold text-blue-600 mb-4">Tabel Data</h2>
        <table class="min-w-full border border-gray-200 rounded-lg overflow-hidden">
          <thead class="bg-blue-50">
            <tr>
              <th class="px-4 py-2 text-left">Nama</th>
              <th class="px-4 py-2 text-left">Jabatan</th>
              <th class="px-4 py-2 text-left">Instansi</th>
              <th class="px-4 py-2 text-left">Aksi</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in items" :key="item.id" class="border-b">
              <td class="px-4 py-2">{{ item.nama }}</td>
              <td class="px-4 py-2">{{ item.jabatan }}</td>
              <td class="px-4 py-2">{{ item.instansi }}</td>
              <td class="px-4 py-2">
                <button class="text-blue-600 hover:underline mr-2" @click="editItem(item)">Edit</button>
                <button class="text-red-600 hover:underline" @click="deleteItem(item.id)">Hapus</button>
              </td>
            </tr>
            <tr v-if="items.length === 0">
              <td colspan="4" class="text-center text-gray-400 py-4">Tidak ada data</td>
            </tr>
          </tbody>
        </table>
      </div>
      <!-- Form Input -->
      <div class="bg-white rounded-xl shadow p-6">
        <h2 class="text-lg font-semibold text-blue-600 mb-4">Form Input</h2>
        <form @submit.prevent="handleSubmit">
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Nama</label>
              <input v-model="form.nama" type="text" class="w-full border rounded px-3 py-2" required />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Jabatan</label>
              <input v-model="form.jabatan" type="text" class="w-full border rounded px-3 py-2" required />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Instansi</label>
              <input v-model="form.instansi" type="text" class="w-full border rounded px-3 py-2" required />
            </div>
          </div>
          <div class="flex gap-4">
            <button type="submit" class="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition">Simpan</button>
            <button type="button" class="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg font-semibold hover:bg-gray-300 transition" @click="resetForm">Reset</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const items = ref([
  { id: 1, nama: 'Budi', jabatan: 'Analis', instansi: 'LAN' },
  { id: 2, nama: 'Siti', jabatan: 'Widyaiswara', instansi: 'LAN' }
])

const form = ref({
  nama: '',
  jabatan: '',
  instansi: ''
})

function handleSubmit() {
  if (!form.value.nama || !form.value.jabatan || !form.value.instansi) return
  if (form.value.id) {
    // Edit
    const idx = items.value.findIndex(i => i.id === form.value.id)
    if (idx !== -1) items.value[idx] = { ...form.value }
  } else {
    // Tambah
    items.value.push({ ...form.value, id: Date.now() })
  }
  resetForm()
}

function editItem(item) {
  form.value = { ...item }
}

function deleteItem(id) {
  items.value = items.value.filter(i => i.id !== id)
  resetForm()
}

function resetForm() {
  form.value = { nama: '', jabatan: '', instansi: '' }
}
</script>
