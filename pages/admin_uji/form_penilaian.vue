<template>
  <div class="max-w-7xl mx-auto p-0 md:p-8">
    <div class="card bg-base-100 shadow-xl border border-base-200 animate-fadein">
      <div class="card-body space-y-6">
        <div class="flex items-center gap-4 mb-2">
          <span class="badge badge-primary badge-lg text-lg">Form Penilaian Ujian Wawancara</span>
          <span class="ml-auto text-base-300">No. Form: <span class="font-bold">{{ peserta.no || '-' }}</span></span>
        </div>
        <div class="divider my-0"></div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-2">
          <div>
            <label class="label font-semibold">No Seleksi</label>
            <div class="input input-bordered w-full bg-base-200 cursor-not-allowed">{{ peserta.no || '-' }}</div>
          </div>
          <div>
            <label class="label font-semibold">Nama</label>
            <div class="input input-bordered w-full bg-base-200 cursor-not-allowed">{{ peserta.nama || '-' }}</div>
          </div>
          <div>
            <label class="label font-semibold">Instansi</label>
            <div class="input input-bordered w-full bg-base-200 cursor-not-allowed">{{ peserta.instansi || '-' }}</div>
          </div>
        </div>
        <div class="divider"></div>
        <div class="mb-2 p-3 rounded-lg bg-gradient-to-r from-primary/10 to-base-100 border border-primary/20 flex items-center gap-4">
          <span class="text-primary text-lg font-bold"><i class="fa-solid fa-clipboard-list"></i> Penilaian Kompetensi</span>
          <span class="ml-auto text-xs text-base-400">* Silakan isi nilai pada setiap baris kompetensi</span>
        </div>
        <div class="overflow-x-auto">
          <table class="table w-full text-sm border border-primary/30 rounded-xl align-middle">
            <thead class="sticky top-0 z-10">
              <tr class="bg-primary/20 text-primary">
                <th class="whitespace-normal w-56 border-r border-primary/20">Judul</th>
                <th class="whitespace-normal w-40 border-r border-primary/20">Jenis</th>
                <th class="whitespace-normal w-56 border-r border-primary/20">Element</th>
                <th class="w-24 border-r border-primary/20">Nilai I</th>
                <th class="w-24 border-r border-primary/20">Nilai II</th>
                <th class="w-24 border-r border-primary/20">Rata2</th>
                <th class="w-24 border-r border-primary/20">Konversi</th>
                <th class="w-40 border-r border-primary/20">Catatan 1</th>
                <th class="w-40">Catatan 2</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, i) in penilaianRows" :key="i" class="hover:bg-primary/10 transition-colors group">
                <td><div class="p-2 rounded bg-base-200 text-base-content whitespace-pre-line break-words min-h-[38px]">{{ item.judul }}</div></td>
                <td><div class="p-2 rounded bg-base-200 text-base-content whitespace-pre-line break-words min-h-[38px]">{{ item.jenis }}</div></td>
                <td><div class="p-2 rounded bg-base-200 text-base-content whitespace-pre-line break-words min-h-[38px]">{{ item.element }}</div></td>
                <td><input v-model.number="item.nilai1" type="number" min="0" max="100" class="input input-bordered input-xs w-20 border-primary/30 group-hover:border-primary" /></td>
                <td><input v-model.number="item.nilai2" type="number" min="0" max="100" class="input input-bordered input-xs w-20 border-primary/30 group-hover:border-primary" /></td>
                <td><span class="badge badge-info group-hover:scale-110 transition-transform">{{ avgNilai(item) }}</span></td>
                <td><span class="badge group-hover:scale-110 transition-transform" :class="konversiBadge(avgNilai(item))">{{ konversiNilai(avgNilai(item)) }}</span></td>
                <td><textarea v-model="item.catatan1" rows="1" class="textarea textarea-bordered textarea-xs w-32 border-primary/30 group-hover:border-primary resize-y" placeholder="Catatan..." /></td>
                <td><textarea v-model="item.catatan2" rows="1" class="textarea textarea-bordered textarea-xs w-32 border-primary/30 group-hover:border-primary resize-y" placeholder="Catatan..." /></td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="flex gap-2 mt-4">
          <button type="button" class="btn btn-outline btn-sm" @click="addPenilaianRow">
            <i class="fa-solid fa-plus"></i> Tambah Baris Penilaian
          </button>
          <button type="button" class="btn btn-success btn-sm" @click="simpanPenilaian">
            <i class="fa-solid fa-floppy-disk"></i> Simpan Penilaian
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
const peserta = ref({ no: '', nama: '', instansi: '' })
const penilaianRows = ref([
  // Kemampuan Analisis
  { judul: 'Kemampuan Analisis', jenis: 'Kompetensi Inti', element: 'Pengetahuan tentang Bidang Pekerjaan', nilai1: null, nilai2: null, catatan1: '', catatan2: '' },
  { judul: 'Kemampuan Analisis', jenis: 'Kompetensi Inti', element: 'Kemampuan Menulis dan Publikasi', nilai1: null, nilai2: null, catatan1: '', catatan2: '' },

  // Kemampuan Politis - Kompetensi Inti
  { judul: 'Kemampuan Politis', jenis: 'Kompetensi Inti', element: 'Konteks Politik (dinamika politik dan budaya birokrasi)', nilai1: null, nilai2: null, catatan1: '', catatan2: '' },
  { judul: 'Kemampuan Politis', jenis: 'Kompetensi Inti', element: 'Regulasi dan Legislasi', nilai1: null, nilai2: null, catatan1: '', catatan2: '' },
  { judul: 'Kemampuan Politis', jenis: 'Kompetensi Inti', element: 'Komunikasi (CV/wawancara)', nilai1: null, nilai2: null, catatan1: '', catatan2: '' },
  { judul: 'Kemampuan Politis', jenis: 'Kompetensi Inti', element: 'Membangun jejaring (Networking) (CV/wawancara)', nilai1: null, nilai2: null, catatan1: '', catatan2: '' },
  { judul: 'Kemampuan Politis', jenis: 'Kompetensi Inti', element: 'Presentasi (CV/wawancara)', nilai1: null, nilai2: null, catatan1: '', catatan2: '' },

  // Kemampuan Politis - Kompetensi Spesialis
  { judul: 'Kemampuan Politis', jenis: 'Kompetensi Spesialis', element: 'Konsultasi Publik (CV/wawancara)', nilai1: null, nilai2: null, catatan1: '', catatan2: '' },
  { judul: 'Kemampuan Politis', jenis: 'Kompetensi Spesialis', element: 'Partnership (CV/wawancara)', nilai1: null, nilai2: null, catatan1: '', catatan2: '' },

  // Kemampuan Analisis dan Politis - Kompetensi Dasar
  { judul: 'Kemampuan Analisis dan Politis', jenis: 'Kompetensi Dasar', element: 'Manajemen Diri', nilai1: null, nilai2: null, catatan1: '', catatan2: '' },
  { judul: 'Kemampuan Analisis dan Politis', jenis: 'Kompetensi Dasar', element: 'Membangun Tim', nilai1: null, nilai2: null, catatan1: '', catatan2: '' }
])
const route = useRoute()
onMounted(() => {
  peserta.value.no = route.query.no || ''
  peserta.value.nama = route.query.nama || ''
  peserta.value.instansi = route.query.instansi || ''
})
function addPenilaianRow() {
  penilaianRows.value.push({ judul: '', jenis: '', element: '', nilai1: null, nilai2: null, catatan1: '', catatan2: '' })
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
function konversiBadge(avg) {
  if (!avg) return 'badge-ghost'
  const n = Number(avg)
  if (n >= 85) return 'badge-success'
  if (n >= 70) return 'badge-info'
  if (n >= 55) return 'badge-warning'
  if (n > 0) return 'badge-error'
  return 'badge-ghost'
}
function simpanPenilaian() {
  // Simpan penilaian ke backend jika perlu
  alert('Penilaian berhasil disimpan!')
}
</script>
