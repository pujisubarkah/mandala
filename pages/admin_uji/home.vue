<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-100 py-8 px-2 md:px-8 animate-fadein">
    <div class="max-w-5xl mx-auto">
      <div class="flex items-center gap-4 mb-8">
        <div class="bg-blue-600 text-white rounded-full p-4 shadow-lg animate-bounce">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-10 h-10">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6l4 2" />
            <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="1.5" fill="none" />
          </svg>
        </div>
        <div>
          <h1 class="text-3xl md:text-4xl font-extrabold text-blue-700 mb-1 tracking-tight">Dashboard Admin Uji Kompetensi</h1>
          <p class="text-gray-600 text-lg">Kelola jadwal dan penilaian ujian kompetensi dengan mudah dan cepat.</p>
        </div>
      </div>
      <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <NuxtLink to="/admin_uji/calendar" class="btn btn-outline btn-info shadow">📅 Pilih Tanggal Jadwal Ujikom</NuxtLink>
        <div class="text-lg font-semibold">
          Tanggal Jadwal: <span class="badge badge-primary text-base">{{ tanggalJadwal }}</span>
        </div>
      </div>
      <transition name="fade">
        <button v-if="!showForm" class="btn btn-primary mb-8 w-full md:w-auto shadow-md" @click="showForm = true">
          <span class="mr-2">➕</span> Input Jadwal
        </button>
      </transition>
    <teleport to="body">
      <div v-if="showForm" class="fixed inset-0 z-[1000] flex items-center justify-center bg-black/50 overflow-auto" style="pointer-events: auto;">
        <form @submit.prevent="addRow" class="bg-white rounded-xl shadow-2xl max-w-3xl w-full p-8 relative animate-fadein border-2 border-blue-100" style="pointer-events: auto;">
          <button type="button" class="btn btn-sm btn-circle btn-ghost absolute right-4 top-4" @click="showForm = false">✕</button>
          <h2 class="text-2xl font-bold mb-4 text-blue-700 flex items-center gap-2">
            <span>📝</span> Input Jadwal Uji Kompetensi
          </h2>
          <div class="grid grid-cols-1 gap-4">
            <div class="space-y-4">
              <div class="flex items-center gap-4">
                <label class="w-48 text-right font-semibold">Nama</label>
                <input v-model="form.nama" class="input input-bordered w-full max-w-xl" required />
              </div>
              <div class="flex items-center gap-4">
                <label class="w-48 text-right font-semibold">Instansi</label>
                <select v-model="form.instansi" class="input input-bordered w-full max-w-xl" required>
                  <option value="" disabled>Pilih Instansi</option>
                  <option v-for="i in instansiList" :key="i.id" :value="i.nama_instansi">{{ i.nama_instansi }}</option>
                </select>
              </div>
              <div class="flex items-center gap-4">
                <label class="w-48 text-right font-semibold">Pangkat/Golongan</label>
                <select v-model="form.pangkat" class="input input-bordered w-full max-w-xl" required>
                  <option value="" disabled>Pilih Golongan</option>
                  <option v-for="g in golonganList" :key="g.id" :value="g.golongan">{{ g.golongan }}</option>
                </select>
              </div>
              <div class="flex items-center gap-4">
                <label class="w-48 text-right font-semibold">Mekanisme</label>
                <input v-model="form.mekanisme" class="input input-bordered w-full max-w-xl" required />
              </div>
              <div class="flex items-center gap-4">
                <label class="w-48 text-right font-semibold">Waktu (WIB)</label>
                <input v-model="form.waktu" class="input input-bordered w-full max-w-xl" required placeholder="ex: 09:00" />
              </div>
              <div class="flex items-center gap-4">
                <label class="w-48 text-right font-semibold">Ruangan</label>
                <input v-model="form.ruangan" class="input input-bordered w-full max-w-xl" required />
              </div>
              <div class="flex items-center gap-4">
                <label class="w-48 text-right font-semibold">Tim Penguji 1</label>
                <input v-model="form.penguji1" class="input input-bordered w-full max-w-xl" required />
              </div>
              <div class="flex items-center gap-4">
                <label class="w-48 text-right font-semibold">Tim Penguji 2</label>
                <input v-model="form.penguji2" class="input input-bordered w-full max-w-xl" required />
              </div>
              <div class="flex items-center gap-4">
                <label class="w-48 text-right font-semibold">Pendamping 1</label>
                <input v-model="form.pendamping1" class="input input-bordered w-full max-w-xl" required />
              </div>
              <div class="flex items-center gap-4">
                <label class="w-48 text-right font-semibold">Pendamping 2</label>
                <input v-model="form.pendamping2" class="input input-bordered w-full max-w-xl" required />
              </div>
            </div>
          </div>
          <button class="btn btn-primary w-full mt-4" :disabled="loading">
            <span v-if="loading" class="loading loading-spinner"></span>
            Tambah
          </button>
        </form>
      </div>
    </teleport>
    <div class="overflow-x-auto rounded-xl shadow-lg bg-white/80">
      <table class="table w-full text-base">
        <thead>
          <tr>
            <th>No</th>
            <th>Nama</th>
            <th>Instansi</th>
            <th>Pangkat/Golongan</th>
            <th>Mekanisme</th>
            <th>Waktu (WIB)</th>
            <th>Ruangan</th>
            <th>Tim Penguji</th>
            <th>Pendamping</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(row, idx) in rows" :key="idx">
            <td class="whitespace-nowrap">{{ idx + 1 }}</td>
            <td>
              <NuxtLink
                :to="{
                  path: '/admin_uji/form_penilaian',
                  query: {
                    no: idx + 1,
                    nama: row.nama,
                    instansi: row.instansi
                  }
                }"
                class="btn btn-link p-0 min-h-0 h-auto text-left"
              >{{ row.nama }}</NuxtLink>
            </td>
            <td>{{ row.instansi }}</td>
            <td>{{ row.pangkat }}</td>
            <td>{{ row.mekanisme }}</td>
            <td>{{ row.waktu }}</td>
            <td>{{ row.ruangan }}</td>
            <td>{{ row.penguji1 }}</td>
            <td>{{ row.penguji2 }}</td>
            <td>{{ row.pendamping1 }}</td>
            <td>{{ row.pendamping2 }}</td>
            <td>
              <button type="button" class="btn btn-error btn-xs" @click="removeRow(idx)">Hapus</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Modal Form Penilaian overlay -->
    <teleport to="body">
      <div v-if="showPenilaian" class="fixed inset-0 z-[1000] flex items-center justify-center bg-black/50 overflow-auto" style="pointer-events: auto;">
        <div class="absolute inset-0" style="pointer-events: none;"></div>
        <form method="dialog" class="bg-white rounded-xl shadow-2xl max-w-5xl w-full p-8 relative animate-fadein" style="pointer-events: auto;">
          <button type="button" class="btn btn-sm btn-circle btn-ghost absolute right-4 top-4" @click="closePenilaian">✕</button>
          <div class="mb-2">
            <div class="font-bold text-lg mb-1">Data Peserta</div>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-2 mb-2">
              <div><span class="font-semibold">No Seleksi:</span> {{ selectedIdx + 1 }}</div>
              <div><span class="font-semibold">Nama:</span> {{ selectedRow?.nama }}</div>
              <div><span class="font-semibold">Instansi:</span> {{ selectedRow?.instansi }}</div>
            </div>
          </div>
          <div class="font-bold text-base mt-4 mb-2">FORM PENILAIAN UJIAN WAWANCARA</div>
          <div class="mb-1">UJI KOMPETENSI MELALUI KENAIKAN JENJANG DAN PERPINDAHAN JABATAN (POLA BARU)</div>
          <div class="mb-4">JABATAN FUNGSIONAL ANALIS KEBIJAKAN JENJANG MUDA</div>
          <div class="overflow-x-auto">
            <table class="table w-full text-sm">
              <thead>
                <tr>
                  <th>Judul Unit Kompetensi</th>
                  <th>Jenis Kompetensi</th>
                  <th>Element Kompetensi</th>
                  <th>Nilai Penguji I</th>
                  <th>Nilai Penguji II</th>
                  <th>Rata - Rata</th>
                  <th>Konversi</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, i) in penilaianRows" :key="i">
                  <td><input v-model="item.judul" class="input input-bordered input-xs w-full" /></td>
                  <td><input v-model="item.jenis" class="input input-bordered input-xs w-full" /></td>
                  <td><input v-model="item.element" class="input input-bordered input-xs w-full" /></td>
                  <td><input v-model.number="item.nilai1" type="number" min="0" max="100" class="input input-bordered input-xs w-20" /></td>
                  <td><input v-model.number="item.nilai2" type="number" min="0" max="100" class="input input-bordered input-xs w-20" /></td>
                  <td>{{ avgNilai(item) }}</td>
                  <td>{{ konversiNilai(avgNilai(item)) }}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <button type="button" class="btn btn-outline btn-sm mt-4" @click="addPenilaianRow">+ Tambah Baris Penilaian</button>
          <button type="button" class="btn btn-success mt-4 ml-4" @click="simpanPenilaian">Simpan Penilaian</button>
        </form>
      </div>
    </teleport>
    <button class="btn btn-success w-full mt-6 shadow-lg" :disabled="rows.length === 0 || loading" @click="submitAll">
      <span v-if="loading" class="loading loading-spinner"></span>
      💾 Simpan Semua Jadwal
    </button>
    <transition name="fade">
      <div v-if="success" class="alert alert-success mt-4 shadow">Jadwal berhasil disimpan!</div>
    </transition>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const form = ref({
  nama: '',
  instansi: '',
  pangkat: '',
  mekanisme: '',
  waktu: '',
  ruangan: '',
  penguji1: '',
  penguji2: '',
  pendamping1: '',
  pendamping2: ''
})
const rows = ref([])
const loading = ref(false)
const success = ref(false)
const showForm = ref(false)
const tanggalJadwal = ref('')
const golonganList = ref([])
const instansiList = ref([])

// Penilaian modal state
const showPenilaian = ref(false)
const selectedIdx = ref(-1)
const selectedRow = ref(null)
const penilaianRows = ref([
  { judul: '', jenis: '', element: '', nilai1: null, nilai2: null }
])

onMounted(async () => {
  tanggalJadwal.value = localStorage.getItem('tanggalJadwal') || '-'
  try {
    const res = await fetch('/api/golongan')
    const data = await res.json()
    if (data.success && Array.isArray(data.data)) {
      golonganList.value = data.data
    }
  } catch (e) {
    golonganList.value = []
  }
  // Ambil data instansi
  try {
    const res = await fetch('/api/instansi')
    const data = await res.json()
    if (Array.isArray(data)) {
      instansiList.value = data
    }
  } catch (e) {
    instansiList.value = []
  }
})

function addRow() {
  if (!form.value.nama || !form.value.instansi || !form.value.pangkat || !form.value.mekanisme || !form.value.waktu || !form.value.ruangan || !form.value.penguji1 || !form.value.penguji2 || !form.value.pendamping1 || !form.value.pendamping2) return
  rows.value.push({ ...form.value })
  form.value = { nama: '', instansi: '', pangkat: '', mekanisme: '', waktu: '', ruangan: '', penguji1: '', penguji2: '', pendamping1: '', pendamping2: '' }
}
function removeRow(idx) {
  rows.value.splice(idx, 1)
}

async function submitAll() {
  loading.value = true
  success.value = false
  // Simulasi submit, ganti dengan request ke backend jika perlu
  await new Promise(r => setTimeout(r, 1000))
  loading.value = false
  success.value = true
  rows.value = []
}

function openPenilaian(idx) {
  selectedIdx.value = idx
  selectedRow.value = rows.value[idx]
  showPenilaian.value = true
  penilaianRows.value = [ { judul: '', jenis: '', element: '', nilai1: null, nilai2: null } ]
}
function closePenilaian() {
  showPenilaian.value = false
}
function addPenilaianRow() {
  penilaianRows.value.push({ judul: '', jenis: '', element: '', nilai1: null, nilai2: null })
}
function avgNilai(item) {
  if (item.nilai1 == null && item.nilai2 == null) return ''
  const n1 = Number(item.nilai1) || 0
  const n2 = Number(item.nilai2) || 0
  return ((n1 + n2) / 2).toFixed(2)
}
function konversiNilai(avg) {
  if (!avg) return ''
  const n = Number(avg)
  if (n >= 85) return 'A'
  if (n >= 70) return 'B'
  if (n >= 55) return 'C'
  if (n > 0) return 'D'
  return ''
}
function simpanPenilaian() {
  // Simpan penilaian ke backend atau rows jika perlu
  showPenilaian.value = false
}
// ...existing code...
</script>

<style scoped>
.animate-fadein {
  animation: fadein 0.7s;
}
@keyframes fadein {
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
}
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.4s;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>

<style scoped>
.animate-fadein {
  animation: fadein 0.7s;
}
@keyframes fadein {
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
}
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.4s;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>