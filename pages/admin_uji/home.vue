
<template>
  <div>
    <NuxtLink to="/admin_uji/calendar" class="btn btn-outline mb-6">Pilih Tanggal Jadwal Ujikom</NuxtLink>
    <div class="mb-4 text-lg font-semibold">
      Tanggal Jadwal: <span class="badge badge-primary text-base">{{ tanggalJadwal }}</span>
    </div>
    <button v-if="!showForm" class="btn btn-primary mb-8" @click="showForm = true">Input Jadwal</button>
    <teleport to="body">
      <div v-if="showForm" class="fixed inset-0 z-[1000] flex items-center justify-center bg-black/50 overflow-auto" style="pointer-events: auto;">
        <form @submit.prevent="addRow" class="bg-white rounded-xl shadow-2xl max-w-3xl w-full p-8 relative animate-fadein" style="pointer-events: auto;">
          <button type="button" class="btn btn-sm btn-circle btn-ghost absolute right-4 top-4" @click="showForm = false">✕</button>
          <h2 class="text-2xl font-bold mb-4">Input Jadwal Uji Kompetensi</h2>
          <div class="grid grid-cols-1 gap-4">
            <div class="space-y-4">
              <div class="flex items-center gap-4">
                <label class="w-48 text-right font-semibold">Nama</label>
                <input v-model="form.nama" class="input input-bordered w-full max-w-xl" required />
              </div>
              <div class="flex items-center gap-4">
                <label class="w-48 text-right font-semibold">Instansi</label>
                <input v-model="form.instansi" class="input input-bordered w-full max-w-xl" required />
              </div>
              <div class="flex items-center gap-4">
                <label class="w-48 text-right font-semibold">Pangkat/Golongan</label>
                <input v-model="form.pangkat" class="input input-bordered w-full max-w-xl" required />
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
                <label class="w-48 text-right font-semibold">Tim Penguji</label>
                <input v-model="form.penguji" class="input input-bordered w-full max-w-xl" required />
              </div>
              <div class="flex items-center gap-4">
                <label class="w-48 text-right font-semibold">Pendamping</label>
                <input v-model="form.pendamping" class="input input-bordered w-full max-w-xl" required />
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
    <div class="overflow-x-auto">
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
            <td>{{ row.penguji }}</td>
            <td>{{ row.pendamping }}</td>
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
    <button class="btn btn-success w-full mt-6" :disabled="rows.length === 0 || loading" @click="submitAll">
      <span v-if="loading" class="loading loading-spinner"></span>
      Simpan Semua Jadwal
    </button>
    <div v-if="success" class="alert alert-success mt-4">Jadwal berhasil disimpan!</div>
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
  penguji: '',
  pendamping: ''
})
const rows = ref([])
const loading = ref(false)
const success = ref(false)
const showForm = ref(false)
const tanggalJadwal = ref('')

// Penilaian modal state
const showPenilaian = ref(false)
const selectedIdx = ref(-1)
const selectedRow = ref(null)
const penilaianRows = ref([
  { judul: '', jenis: '', element: '', nilai1: null, nilai2: null }
])

onMounted(() => {
  tanggalJadwal.value = localStorage.getItem('tanggalJadwal') || '-'
})

function addRow() {
  if (!form.value.nama || !form.value.instansi || !form.value.pangkat || !form.value.mekanisme || !form.value.waktu || !form.value.ruangan || !form.value.penguji || !form.value.pendamping) return
  rows.value.push({ ...form.value })
  form.value = { nama: '', instansi: '', pangkat: '', mekanisme: '', waktu: '', ruangan: '', penguji: '', pendamping: '' }
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
</script>