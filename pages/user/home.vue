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
                <th class="w-24 border-r border-primary/20">Nilai</th>
                <th class="w-40">Catatan</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, i) in penilaianRows" :key="i" class="hover:bg-primary/10 transition-colors group">
                <td><div class="p-2 rounded bg-base-200 text-base-content whitespace-pre-line break-words min-h-[38px]">{{ item.judul }}</div></td>
                <td><div class="p-2 rounded bg-base-200 text-base-content whitespace-pre-line break-words min-h-[38px]">{{ item.jenis }}</div></td>
                <td><div class="p-2 rounded bg-base-200 text-base-content whitespace-pre-line break-words min-h-[38px]">{{ item.element }}</div></td>
                <td><input v-model.number="item.nilai" type="number" min="0" max="100" class="input input-bordered input-xs w-20 border-primary/30 group-hover:border-primary" /></td>
                <td><textarea v-model="item.catatan" rows="1" class="textarea textarea-bordered textarea-xs w-32 border-primary/30 group-hover:border-primary resize-y" placeholder="Catatan..." /></td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="flex gap-2 mt-4">
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
  { judul: 'Kemampuan Analisis', jenis: 'Kompetensi Inti', element: 'Pengetahuan tentang Bidang Pekerjaan', nilai: null, catatan: '' },
  { judul: 'Kemampuan Analisis', jenis: 'Kompetensi Inti', element: 'Kemampuan Menulis dan Publikasi', nilai: null, catatan: '' },
  { judul: 'Kemampuan Politis', jenis: 'Kompetensi Inti', element: 'Konteks Politik (dinamika politik dan budaya birokrasi)', nilai: null, catatan: '' },
  { judul: 'Kemampuan Politis', jenis: 'Kompetensi Inti', element: 'Regulasi dan Legislasi', nilai: null, catatan: '' },
  { judul: 'Kemampuan Politis', jenis: 'Kompetensi Inti', element: 'Komunikasi (CV/wawancara)', nilai: null, catatan: '' },
  { judul: 'Kemampuan Politis', jenis: 'Kompetensi Inti', element: 'Membangun jejaring (Networking) (CV/wawancara)', nilai: null, catatan: '' },
  { judul: 'Kemampuan Politis', jenis: 'Kompetensi Inti', element: 'Presentasi (CV/wawancara)', nilai: null, catatan: '' },
  { judul: 'Kemampuan Politis', jenis: 'Kompetensi Spesialis', element: 'Konsultasi Publik (CV/wawancara)', nilai: null, catatan: '' },
  { judul: 'Kemampuan Politis', jenis: 'Kompetensi Spesialis', element: 'Partnership (CV/wawancara)', nilai: null, catatan: '' },
  { judul: 'Kemampuan Analisis dan Politis', jenis: 'Kompetensi Dasar', element: 'Manajemen Diri', nilai: null, catatan: '' },
  { judul: 'Kemampuan Analisis dan Politis', jenis: 'Kompetensi Dasar', element: 'Membangun Tim', nilai: null, catatan: '' }
])
const route = useRoute()
onMounted(() => {
  peserta.value.no = route.query.no || ''
  peserta.value.nama = route.query.nama || ''
  peserta.value.instansi = route.query.instansi || ''
})
function addPenilaianRow() {
  penilaianRows.value.push({ judul: '', jenis: '', element: '', nilai: null, catatan: '' })
}
// fungsi avgNilai, konversiNilai, konversiBadge dihapus karena tidak dipakai
function simpanPenilaian() {
  // Simpan penilaian ke backend jika perlu
  alert('Penilaian berhasil disimpan!')
}
</script>
