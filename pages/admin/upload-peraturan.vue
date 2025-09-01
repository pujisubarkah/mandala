<template>
  <div class="min-h-screen bg-gray-50 p-8">
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-bold text-gray-800">Daftar Peraturan</h1>
      <button class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold shadow" @click="openForm">
        + Input Peraturan
      </button>
    </div>

    <!-- Table -->
    <div class="bg-white rounded-lg shadow p-4">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-100">
          <tr>
            <th class="px-4 py-2 text-left text-xs font-bold text-gray-600">Judul</th>
            <th class="px-4 py-2 text-left text-xs font-bold text-gray-600">Deskripsi</th>
            <th class="px-4 py-2 text-left text-xs font-bold text-gray-600">Nama File</th>
            <th class="px-4 py-2 text-left text-xs font-bold text-gray-600">Ukuran</th>
            <th class="px-4 py-2 text-left text-xs font-bold text-gray-600">Jumlah File</th>
            <th class="px-4 py-2 text-left text-xs font-bold text-gray-600">Tanggal Dibuat</th>
            <th class="px-4 py-2 text-left text-xs font-bold text-gray-600">Terakhir Diubah</th>
            <th class="px-4 py-2 text-left text-xs font-bold text-gray-600">Kategori</th>
            <th class="px-4 py-2 text-left text-xs font-bold text-gray-600">Tags</th>
            <th class="px-4 py-2 text-left text-xs font-bold text-gray-600">Aksi</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in peraturanList" :key="item.id" class="hover:bg-blue-50">
            <td class="px-4 py-2 font-semibold text-gray-800">{{ item.title }}</td>
            <td class="px-4 py-2 text-gray-600">{{ item.description }}</td>
            <td class="px-4 py-2 text-blue-700 font-mono">{{ item.file_name }}</td>
            <td class="px-4 py-2 text-gray-600">{{ item.file_size }}</td>
            <td class="px-4 py-2 text-gray-600">{{ item.file_count }}</td>
            <td class="px-4 py-2 text-gray-600">{{ formatDate(item.create_date) }}</td>
            <td class="px-4 py-2 text-gray-600">{{ formatDate(item.last_modified) }}</td>
            <td class="px-4 py-2">
              <span class="px-2 py-1 rounded text-xs font-bold" :class="item.bg_color">{{ item.category?.name }}</span>
            </td>
            <td class="px-4 py-2">
              <span v-for="tag in item.tags" :key="tag.id" class="inline-block bg-gray-100 text-gray-700 rounded-full px-2 py-1 mr-1 text-xs">{{ tag.tag }}</span>
            </td>
            <td class="px-4 py-2">
              <button class="text-blue-600 hover:underline mr-2" @click="editItem(item)">Edit</button>
              <button class="text-red-600 hover:underline" @click="deleteItem(item.id)">Hapus</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Modal/Form Input Peraturan -->
    <div v-if="showForm" class="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg shadow-lg p-8 w-full max-w-lg">
        <h2 class="text-xl font-bold mb-4">Input Peraturan Baru</h2>
        <form @submit.prevent="submitForm">
          <div class="mb-4">
            <label class="block text-sm font-semibold mb-1">Judul</label>
            <input v-model="form.title" type="text" class="w-full border rounded px-3 py-2" required />
          </div>
          <div class="mb-4">
            <label class="block text-sm font-semibold mb-1">Deskripsi</label>
            <textarea v-model="form.description" class="w-full border rounded px-3 py-2" rows="3" required></textarea>
          </div>
          <div class="mb-4">
            <label class="block text-sm font-semibold mb-1">Kategori</label>
            <select v-model="form.category" class="w-full border rounded px-3 py-2" required>
              <option value="" disabled>Pilih kategori...</option>
              <option v-for="cat in categories" :key="cat.id" :value="cat.id">{{ cat.name }}</option>
            </select>
          </div>
          <div class="mb-4">
            <label class="block text-sm font-semibold mb-1">Link Dokumen</label>
            <input v-model="form.link" type="url" class="w-full border rounded px-3 py-2" placeholder="https://drive.google.com/..." required />
          </div>
          <div class="mb-4">
            <label class="block text-sm font-semibold mb-1">Tags (pisahkan dengan koma)</label>
            <input v-model="form.tags" type="text" class="w-full border rounded px-3 py-2" placeholder="PNS, Manajemen, Jabatan Fungsional" />
          </div>
          <div class="flex justify-end gap-2 mt-6">
            <button type="button" class="px-4 py-2 bg-gray-200 rounded" @click="closeForm">Tutup</button>
            <button type="submit" class="px-4 py-2 bg-blue-600 text-white rounded font-semibold" :disabled="!form.title || !form.link">Simpan</button>
          </div>
        </form>
      </div>
    </div>

    <!-- Modal Edit Peraturan -->
    <div v-if="showEditForm" class="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg shadow-lg p-8 w-full max-w-lg">
        <h2 class="text-xl font-bold mb-4">Edit Peraturan</h2>
        <form @submit.prevent="submitEditForm">
          <div class="mb-4">
            <label class="block text-sm font-semibold mb-1">Judul</label>
            <input v-model="editForm.title" type="text" class="w-full border rounded px-3 py-2" required />
          </div>
          <div class="mb-4">
            <label class="block text-sm font-semibold mb-1">Deskripsi</label>
            <textarea v-model="editForm.description" class="w-full border rounded px-3 py-2" rows="3" required></textarea>
          </div>
          <div class="mb-4">
            <label class="block text-sm font-semibold mb-1">Kategori</label>
            <select v-model="editForm.category" class="w-full border rounded px-3 py-2" required>
              <option value="" disabled>Pilih kategori...</option>
              <option v-for="cat in categories" :key="cat.id" :value="cat.id">{{ cat.name }}</option>
            </select>
          </div>
          <div class="mb-4">
            <label class="block text-sm font-semibold mb-1">Link Dokumen</label>
            <input v-model="editForm.link" type="url" class="w-full border rounded px-3 py-2" placeholder="https://drive.google.com/..." required />
          </div>
          <div class="mb-4">
            <label class="block text-sm font-semibold mb-1">Tags (pisahkan dengan koma)</label>
            <input v-model="editForm.tags" type="text" class="w-full border rounded px-3 py-2" placeholder="PNS, Manajemen, Jabatan Fungsional" />
          </div>
          <div class="flex justify-end gap-2 mt-6">
            <button type="button" class="px-4 py-2 bg-gray-200 rounded" @click="closeEditForm">Tutup</button>
            <button type="submit" class="px-4 py-2 bg-blue-600 text-white rounded font-semibold">Simpan</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({ layout: 'admin' })
import { ref, onMounted } from 'vue';

const peraturanList = ref([]);
const showForm = ref(false);
const showEditForm = ref(false);
const categories = ref([]);
const form = ref({
  title: '',
  description: '',
  category: '',
  link: '',
  tags: ''
});
const editForm = ref({
  id: null,
  title: '',
  description: '',
  category: '',
  link: '',
  tags: ''
});

function openForm() {
  showForm.value = true;
}
function closeForm() {
  showForm.value = false;
  form.value = { title: '', description: '', category: '', link: '', tags: '' };
}
async function submitForm() {
  try {
    const payload = {
      title: form.value.title,
      description: form.value.description,
      file_name: form.value.link,
      file_size: '-',
      file_count: 1,
      category_id: form.value.category,
      tags: form.value.tags.split(',').map(t => t.trim()).filter(t => t),
      download_url: form.value.link
    };
    const res = await fetch('/api/download', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    if (!res.ok) throw new Error('Gagal upload peraturan');
  await res.json();
  // Fetch ulang data agar data yang tampil sudah lengkap dari backend
  const refresh = await fetch('/api/download');
  const data = await refresh.json();
  peraturanList.value = Array.isArray(data) ? data : [];
  closeForm();
  } catch (err) {
    alert(err.message || 'Terjadi kesalahan saat upload peraturan');
  }
}
function editItem(item) {
  editForm.value = {
    id: item.id,
    title: item.title,
    description: item.description,
    category: item.category_id || '',
    link: item.link || item.file_name,
    tags: item.tags?.map(t => t.tag).join(', ')
  };
  showEditForm.value = true;
}

function closeEditForm() {
  showEditForm.value = false;
  editForm.value = { id: null, title: '', description: '', category: '', link: '', tags: '' };
}

function submitEditForm() {
  const idx = peraturanList.value.findIndex(p => p.id === editForm.value.id);
  if (idx !== -1) {
    peraturanList.value[idx] = {
      ...peraturanList.value[idx],
      title: editForm.value.title,
      description: editForm.value.description,
      category: { name: editForm.value.category },
      file_name: editForm.value.link,
      link: editForm.value.link,
      tags: editForm.value.tags.split(',').map((t, i) => ({ id: i + 1, tag: t.trim() })).filter(t => t.tag),
      last_modified: new Date().toISOString()
    };
  }
  closeEditForm();
}
function deleteItem(id) {
  // TODO: implement delete
}
function formatDate(dateStr) {
  if (!dateStr) return '-';
  const d = new Date(dateStr);
  return d.toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' });
}

onMounted(async () => {
  // Fetch data dari endpoint API download
  const res = await fetch('/api/download');
  const data = await res.json();
  peraturanList.value = Array.isArray(data) ? data : [];
  // Fetch kategori dari endpoint API download_categories
  const catRes = await fetch('/api/download_categories');
  const catData = await catRes.json();
  categories.value = Array.isArray(catData) ? catData : [];
});
</script>

<style scoped>
/* Tambahkan style sesuai kebutuhan */
</style>
