

<template>
  <div class="p-8 flex flex-col gap-10 min-h-screen relative overflow-hidden bg-gray-50">
    <!-- Subtle Background -->
    <div class="fixed inset-0 -z-10">
      <div class="absolute inset-0 bg-gray-50"></div>
      <div class="absolute top-0 left-0 w-full h-full opacity-20">
        <div class="absolute top-20 left-20 w-96 h-96 bg-[#C2E7F6]/40 rounded-full blur-3xl"></div>
        <div class="absolute top-40 right-20 w-80 h-80 bg-blue-100/50 rounded-full blur-3xl"></div>
        <div class="absolute bottom-20 left-40 w-72 h-72 bg-blue-50/60 rounded-full blur-3xl"></div>
      </div>
    </div>

    <!-- Modern Header Section -->
    <div class="relative">
      <div class="bg-white rounded-xl p-8 shadow-sm border border-gray-200">
        <div class="flex items-center justify-between">
          <div class="relative">
            <h1 class="text-5xl font-black text-blue-600 mb-3">🚀 Data Jenjang AK</h1>
            <p class="text-gray-700 text-xl font-medium">Kelola data Analis Kebijakan </p>
            <div class="flex items-center gap-2 mt-2">
              <div class="w-2 h-2 bg-emerald-500 rounded-full"></div>
              <span class="text-emerald-600 text-sm font-medium">Real-time Data</span>
            </div>
          </div>
          <div class="hidden md:flex items-center gap-6">
            <div class="text-right">
              <div class="text-4xl font-black text-blue-600">{{ totalAK }}</div>
              <div class="text-sm text-gray-600 font-medium">Total Pegawai AK</div>
              <div class="text-xs text-emerald-600 font-semibold mt-1">↗ +12% bulan ini</div>
            </div>
            <div class="w-20 h-20 bg-blue-500 rounded-xl flex items-center justify-center shadow-sm">
              <span class="text-white text-3xl"><i class="fi fi-users"></i></span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Tombol Tambah Data (DaisyUI) -->
    <button class="btn btn-primary fixed bottom-8 right-8 z-50" @click="showAddModal = true">
      <span class="hidden sm:inline">Tambah Data</span>
      <span class="inline sm:hidden">+</span>
    </button>

    <!-- Summary Cards -->
    <div class="grid grid-cols-1 sm:grid-cols-5 gap-6 mb-8">
      <div class="bg-white rounded-xl p-6 flex flex-col items-center gap-3 shadow-sm border border-gray-200">
        <span class="text-4xl text-blue-600"><i class="fi fi-users"></i></span>
        <div class="text-4xl font-black text-blue-600">{{ totalAK }}</div>
        <div class="text-blue-800 font-bold text-sm text-center">Total AK</div>
        <div class="w-2 h-2 bg-green-500 rounded-full"></div>
      </div>
      <div v-for="(j, idx) in jenjangData" :key="j.name" class="bg-white rounded-xl p-6 flex flex-col items-center gap-3 shadow-sm border border-gray-200">
        <div class="flex mb-1 text-yellow-400 text-2xl">
          <span v-for="n in idx+1" :key="n">★</span>
        </div>
        <div :class="['text-3xl font-black', cardColors[idx]]">{{ j.value }}</div>
        <div class="font-bold text-gray-700 text-sm text-center">{{ j.name }}</div>
        <div class="text-xs text-gray-500 font-medium">Jenjang {{ idx + 1 }}</div>
      </div>
    </div>

    <!-- Filter Bar -->
    <div class="flex flex-wrap gap-4 mb-8 items-center p-6 bg-gradient-to-r from-gray-50 to-blue-50 rounded-2xl border border-gray-200">
      <input v-model="filterNama" type="text" placeholder="� Cari nama pegawai..." class="input input-bordered w-52 max-w-xs" />
      <select v-model="filterJenjang" class="select select-bordered w-52 max-w-xs">
        <option value="">🎯 Semua Jenjang</option>
        <option v-for="j in jenjangList" :key="j" :value="j">⭐ {{ j }}</option>
      </select>
      <button class="btn btn-warning ml-auto" @click="resetFilter">✨ Reset Filter</button>
    </div>

    <!-- Table Section -->
    <div class="overflow-x-auto rounded-2xl shadow-2xl">
      <table class="min-w-full text-left border-collapse bg-white/80 backdrop-blur-sm">
        <thead>
          <tr class="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white">
            <th class="py-4 px-6 font-bold text-sm tracking-wider">👤 Nama</th>
            <th class="py-4 px-6 font-bold text-sm tracking-wider">🏆 Jenjang</th>
            <th class="py-4 px-6 font-bold text-sm tracking-wider">🏢 Instansi</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="row in pagedData" :key="row.id" class="group transition-all duration-300 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 hover:shadow-2xl hover:scale-[1.02] cursor-pointer">
            <td class="py-4 px-6 font-bold text-blue-700 group-hover:text-indigo-600 transition-colors">
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 bg-gradient-to-br from-blue-400 via-emerald-400 to-purple-400 rounded-full flex items-center justify-center text-white font-extrabold text-lg shadow-lg animate-float">
                  {{ row.nama.charAt(0).toUpperCase() }}
                </div>
                <div class="flex-1">
                  <div class="font-bold flex items-center gap-2 group-hover:underline">{{ row.nama }}</div>
                  <div class="text-xs text-gray-500">ID: {{ row.id }}</div>
                </div>
              </div>
            </td>
            <td class="py-4 px-6">
              <span :class="[
                'inline-flex items-center gap-1 px-3 py-2 rounded-full border text-xs font-bold shadow-lg transform transition-all duration-300 group-hover:scale-110',
                row.jenjang === 'Pertama' ? 'bg-blue-100 text-blue-700 border-blue-300' : '',
                row.jenjang === 'Muda' ? 'bg-emerald-100 text-emerald-700 border-emerald-300' : '',
                row.jenjang === 'Madya' ? 'bg-amber-100 text-amber-700 border-amber-300' : '',
                row.jenjang === 'Utama' ? 'bg-purple-100 text-purple-700 border-purple-300' : ''
              ]">
                <span v-for="n in jenjangList.indexOf(row.jenjang)+1" :key="n" class="text-yellow-400">★</span>
                {{ row.jenjang }}
              </span>
            </td>
            <td class="py-4 px-6 font-medium text-gray-700 group-hover:text-blue-600 transition-colors">
              <div class="max-w-xs truncate">{{ row.instansi }}</div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Pagination -->
    <div class="flex justify-center mt-4">
      <button class="btn btn-outline btn-sm mr-2" :disabled="page === 1" @click="page = Math.max(1, page-1)">Sebelumnya</button>
      <span class="px-4 py-2 text-blue-700 font-semibold select-none">Halaman {{ page }} dari {{ totalPages }}</span>
      <button class="btn btn-outline btn-sm ml-2" :disabled="page === totalPages" @click="page = Math.min(totalPages, page+1)">Berikutnya</button>
    </div>

    <!-- Modal Tambah Data -->
    <dialog class="modal" :open="showAddModal">
      <form method="dialog" class="modal-box w-full max-w-lg" @submit.prevent="submitAdd">
        <h3 class="font-bold text-lg mb-4">Tambah Data Pegawai</h3>
        <div class="form-control mb-2">
          <label class="label">Nama Lengkap</label>
          <input v-model="form.nama" class="input input-bordered" required placeholder="Masukkan nama lengkap" />
        </div>
        <div class="form-control mb-2">
          <label class="label">NIP</label>
          <input v-model="form.nip" class="input input-bordered" required placeholder="Masukkan NIP" />
        </div>
        <div class="form-control mb-2">
          <label class="label">Email</label>
          <input v-model="form.email" class="input input-bordered" required type="email" placeholder="contoh@email.com" />
        </div>
        <div class="form-control mb-2">
          <label class="label">Jenjang</label>
          <select v-model="form.jenjang" class="select select-bordered">
            <option v-for="j in jenjangList" :key="j" :value="j">{{ j }}</option>
          </select>
        </div>
        <div class="form-control mb-2">
          <label class="label">Instansi</label>
          <input v-model="form.instansi" class="input input-bordered" required placeholder="Nama instansi" />
        </div>
        <div class="form-control mb-2">
          <label class="label">Provinsi</label>
          <input v-model="form.provinsi" class="input input-bordered" required placeholder="Nama provinsi" />
        </div>
        <div v-if="errorAdd" class="alert alert-error my-2">{{ errorAdd }}</div>
        <div class="modal-action">
          <button class="btn" @click="showAddModal = false" type="button">Batal</button>
          <button class="btn btn-primary" :disabled="loadingAdd">
            <span v-if="loadingAdd" class="loading loading-spinner"></span>
            Simpan Data
          </button>
        </div>
      </form>
    </dialog>

  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
definePageMeta({ layout: 'admin' });

const pegawai = ref([]);
const page = ref(1);
const rowsPerPage = 20;
const showAddModal = ref(false);
const loadingAdd = ref(false);
const errorAdd = ref('');
const filterNama = ref('');
const filterJenjang = ref('');
const form = ref({ nama: '', nip: '', email: '', jenjang: 'Pertama', instansi: '', provinsi: '' });

const jenjangList = ['Pertama', 'Muda', 'Madya', 'Utama'];
const cardColors = ['text-blue-600', 'text-emerald-600', 'text-amber-600', 'text-purple-600'];
const totalAK = computed(() => pegawai.value.length);
const jenjangData = computed(() => jenjangList.map(nm => ({ name: nm, value: pegawai.value.filter(p => p.jenjang === nm).length })));

const dataTable = computed(() => pegawai.value.map(p => ({
  id: p.id,
  nama: p.nama,
  jenjang: p.jenjang,
  instansi: p.instansi,
})));
const filteredData = computed(() => dataTable.value.filter(row =>
  (!filterNama.value || row.nama.toLowerCase().includes(filterNama.value.toLowerCase())) &&
  (!filterJenjang.value || row.jenjang === filterJenjang.value)
));
const totalPages = computed(() => Math.max(1, Math.ceil(filteredData.value.length / rowsPerPage)));
const pagedData = computed(() => filteredData.value.slice((page.value-1)*rowsPerPage, page.value*rowsPerPage));

function resetFilter() {
  filterNama.value = '';
  filterJenjang.value = '';
}

function submitAdd() {
  loadingAdd.value = true;
  errorAdd.value = '';
  setTimeout(() => {
    // Simulasi tambah data
    pegawai.value.push({
      id: String(Date.now()),
      nama: form.value.nama,
      nip: form.value.nip,
      email: form.value.email,
      jenjang: form.value.jenjang,
      instansi: form.value.instansi,
      provinsi: form.value.provinsi,
    });
    showAddModal.value = false;
    form.value = { nama: '', nip: '', email: '', jenjang: 'Pertama', instansi: '', provinsi: '' };
    loadingAdd.value = false;
  }, 1000);
}

onMounted(() => {
  // Simulasi fetch data pegawai
  pegawai.value = [
    { id: '1', nama: 'Budi Santoso', jenjang: 'Pertama', instansi: 'LAN RI' },
    { id: '2', nama: 'Siti Aminah', jenjang: 'Muda', instansi: 'LAN RI' },
    { id: '3', nama: 'Andi Wijaya', jenjang: 'Madya', instansi: 'LAN RI' },
    { id: '4', nama: 'Admin', jenjang: 'Utama', instansi: 'LAN RI' },
  ];
});
</script>

<style scoped>
@keyframes bounce-slow {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-8px); }
}
.animate-bounce-slow {
  animation: bounce-slow 2.2s infinite;
}
@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-6px); }
}
.animate-float {
  animation: float 3.2s ease-in-out infinite;
}
</style>


