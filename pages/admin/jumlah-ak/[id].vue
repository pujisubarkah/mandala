<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { Icon } from '@iconify/vue';

const route = useRoute()
const router = useRouter()
const id = route.params.id

const data = ref(null)
const loading = ref(true)
const error = ref('')
const formData = ref(null)
const isSubmitting = ref(false)
const showSuccessToast = ref(false)
const isEditing = ref(false)
const hasChanges = ref(false)

const pendidikanOptions = ref([])
const instansiOptions = ref([])
const jenjangOptions = ref([])
const jenisKelaminOptions = ref([])
const golonganOptions = ref([])
const jalurOptions = ref([])

onMounted(async () => {
  if (!id) return
  loading.value = true
  try {
    const [pegawaiRes, pendidikanRes, instansiRes, jenjangRes, jenisKelaminRes, golonganRes, jalurRes] = await Promise.all([
      $fetch(`/api/analis_kebijakan/${id}`),
      $fetch('/api/pendidikan'),
      $fetch('/api/instansi'),
      $fetch('/api/jenjang'),
      $fetch('/api/jns_kelamin'),
      $fetch('/api/golongan'),
      $fetch('/api/jalur')
    ])
    data.value = pegawaiRes
    formData.value = pegawaiRes
    pendidikanOptions.value = pendidikanRes
    instansiOptions.value = instansiRes
    jenjangOptions.value = jenjangRes
    jenisKelaminOptions.value = jenisKelaminRes
    golonganOptions.value = golonganRes
    jalurOptions.value = jalurRes
    error.value = ''
  } catch {
    error.value = 'Data tidak ditemukan.'
    data.value = null
    formData.value = null
  } finally {
    loading.value = false
  }
})

function handleChange(e) {
  const { name, value } = e.target
  if (formData.value) {
    const newData = { ...formData.value, [name]: value }
    hasChanges.value = JSON.stringify(newData) !== JSON.stringify(data.value)
    formData.value = newData
  }
}

async function handleSubmit(e) {
  e.preventDefault()
  if (!hasChanges.value) return
  isSubmitting.value = true
  try {
    // TODO: Implementasi PATCH/PUT ke API
    // await $fetch(`/api/pegawai/${id}`, { method: 'PUT', body: formData.value })
    data.value = { ...formData.value }
    hasChanges.value = false
    isEditing.value = false
    showSuccessToast.value = true
    setTimeout(() => showSuccessToast.value = false, 3000)
  } catch {
    alert('Terjadi kesalahan saat menyimpan data')
  } finally {
    isSubmitting.value = false
  }
}
</script>

<template>
  <div class="min-h-screen bg-gray-50 relative overflow-hidden">
    <!-- Success Toast -->
    <Transition name="fade">
      <div v-if="showSuccessToast" class="fixed top-4 right-4 z-50">
        <div class="bg-emerald-500 text-white px-6 py-4 rounded-xl shadow-lg border border-emerald-400/20 flex items-center gap-3">
          <Icon icon="mdi:check-circle" class="w-6 h-6" />
          <div>
            <div class="font-bold">Berhasil!</div>
            <div class="text-sm opacity-90">Data pegawai telah diperbarui</div>
          </div>
        </div>
      </div>
    </Transition>

    <!-- Loading State -->
    <div v-if="loading" class="min-h-screen flex items-center justify-center bg-gray-50">
      <div class="w-20 h-20 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      <div class="mt-4 text-center">
        <div class="text-xl font-bold text-blue-600">Memuat Data...</div>
        <div class="text-sm text-gray-600 mt-1">Mohon tunggu sebentar</div>
      </div>
    </div>

    <!-- Error State -->
    <!-- Dihilangkan sementara agar data tetap ditampilkan meski error -->
    <!--
    <div v-else-if="error || !data || !formData" class="min-h-screen bg-gray-50">
      <div class="p-8">
        <NuxtLink to="/admin/jumlah-ak" class="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-sm border border-gray-200 text-blue-700 hover:bg-[#C2E7F6]/30 font-medium">
          <Icon icon="mdi:arrow-left" class="w-5 h-5" /> Kembali ke Dashboard
        </NuxtLink>
        <div class="max-w-md mx-auto bg-white rounded-xl shadow-sm p-8 border border-gray-200 text-center mt-8">
          <Icon icon="mdi:account" class="w-16 h-16 mx-auto mb-4 text-red-500" />
          <h2 class="text-2xl font-bold text-red-600 mb-2">Data Tidak Ditemukan</h2>
          <p class="text-gray-600 mb-4">{{ error || 'Pegawai yang Anda cari tidak tersedia dalam sistem.' }}</p>
          <NuxtLink to="/admin/jumlah-ak" class="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold shadow-sm hover:bg-blue-700">
            <Icon icon="mdi:arrow-left" /> Kembali ke Dashboard
          </NuxtLink>
        </div>
      </div>
    </div>
    -->

    <!-- Main Content -->
    <div v-else class="p-8 flex flex-col items-center">
      <div class="w-full max-w-6xl mb-6">
        <NuxtLink to="/admin/jumlah-ak" class="inline-flex items-center gap-3 bg-white px-6 py-3 rounded-xl shadow-sm border border-gray-200 text-blue-700 hover:bg-[#C2E7F6]/30 font-semibold group">
          <Icon icon="mdi:arrow-left" class="w-5 h-5 group-hover:-translate-x-1 transition-transform" /> Kembali ke Dashboard
        </NuxtLink>
      </div>
      <div class="w-full max-w-6xl">
        <div class="bg-white rounded-xl shadow-sm p-8 border border-gray-200 overflow-hidden">
          <!-- Header -->
          <div class="mb-8 text-center">
            <div class="flex items-center justify-center gap-3 mb-4">
              <div class="w-3 h-3 bg-blue-500 rounded-full"></div>
              <h1 class="text-4xl font-black text-blue-600">📋 Detail Profil Analis Kebijakan</h1>
              <div class="w-3 h-3 bg-blue-500 rounded-full"></div>
            </div>
            <p class="text-gray-600 text-lg">Kelola dan perbarui informasi pegawai secara real-time</p>
          </div>
          <div class="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
            <!-- Profile Photo -->
            <div class="lg:col-span-1 flex flex-col items-center">
              <div class="relative mb-6">
                <div class="w-48 h-48 rounded-xl bg-white flex items-center justify-center border border-gray-200 shadow-sm overflow-hidden">
                  <img :src="data.photo || undefined" :alt="data.nama" class="object-cover w-full h-full" />
                  <div v-if="!data.photo" class="w-full h-full bg-blue-50 text-blue-600 text-4xl font-bold flex items-center justify-center">
                    {{ data.nama.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase() }}
                  </div>
                </div>
                <div class="absolute -top-2 -right-2">
                  <div class="bg-emerald-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-sm flex items-center gap-1">
                    <Icon icon="mdi:check-circle" class="w-4 h-4" /> Aktif
                  </div>
                </div>
              </div>
              <div class="text-center mb-6">
                <h2 class="text-2xl font-bold text-gray-800 mb-2">{{ data.nama }}</h2>
                <div class="text-sm text-gray-600 space-y-1">
                  <div class="flex items-center justify-center gap-1">
                    <Icon icon="mdi:email" class="w-4 h-4" />
                    <span>{{ data.email || 'Email tidak tersedia' }}</span>
                  </div>
                  <div class="flex items-center justify-center gap-1">
                    <Icon icon="mdi:phone" class="w-4 h-4" />
                    <span>{{ data.phone }}</span>
                  </div>
                </div>
              </div>
              <!-- Quick Info Cards -->
              <div class="w-full space-y-3">
                <InfoCard label="NIP" :value="data.nip" icon="mdi:file-document" color="emerald" />
                <InfoCard label="Jenjang" :value="data.jenjang?.nm_jenjang || '-'" icon="mdi:award" color="purple" />
                <InfoCard label="Golongan" :value="data.golongan?.golongan || '-'" icon="mdi:briefcase" color="amber" />
                <InfoCard label="Status" value="Aktif" icon="mdi:check-circle" color="green" status />
              </div>
            </div>
            <!-- Form Section -->
            <div class="lg:col-span-3 relative">
              <form class="bg-white/80 rounded-xl p-8 border border-gray-200 space-y-6 shadow-sm" @submit="handleSubmit">
                <div class="flex items-center justify-between mb-6">
                  <div class="flex items-center gap-3">
                    <Icon icon="mdi:pencil" class="w-6 h-6 text-blue-600" />
                    <h2 class="text-2xl font-bold text-blue-600">
                      {{ isEditing ? 'Mode Edit Data' : 'Detail Data Pegawai' }}
                    </h2>
                  </div>
                  <button type="button" @click="isEditing = !isEditing; if (!isEditing) { formData = { ...data }; hasChanges = false }"
                    :class="[
                      'px-4 py-2 rounded-lg font-semibold text-sm flex items-center gap-2 transition-all duration-300',
                      isEditing ? 'bg-gray-500 text-white hover:bg-gray-600' : 'bg-blue-500 text-white hover:bg-blue-600'
                    ]">
                    <Icon :icon="isEditing ? 'mdi:alert-circle' : 'mdi:pencil'" class="w-4 h-4" />
                    {{ isEditing ? 'Batal Edit' : 'Mulai Edit' }}
                  </button>
                </div>
                <div v-if="hasChanges && isEditing" class="bg-amber-50 border border-amber-300 rounded-lg p-3 mb-4 flex items-center gap-2 text-amber-700">
                  <Icon icon="mdi:alert-circle" class="w-5 h-5" />
                  <span class="font-semibold text-sm">Ada perubahan yang belum disimpan</span>
                </div>
                <!-- Personal Information -->
                <div class="bg-blue-50 rounded-xl p-6 border border-blue-200">
                  <h3 class="text-lg font-bold text-blue-700 mb-4 flex items-center gap-2">
                    <Icon icon="mdi:account" class="w-5 h-5" /> Informasi Personal
                  </h3>
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormRow label="Nama Lengkap" name="nama" :value="formData.nama" @change="handleChange" icon="mdi:account" :readOnly="!isEditing" />
                    <FormRow label="NIP" name="nip" :value="formData.nip" @change="handleChange" icon="mdi:file-document" :readOnly="!isEditing" />
                    <FormRow label="NIAKN" name="niakn" :value="formData.niakn" @change="handleChange" icon="mdi:file-document" :readOnly="!isEditing" />
                    <FormRow label="Unit Kerja" name="unit_kerja" :value="formData.unit_kerja" @change="handleChange" icon="mdi:map-marker" :readOnly="!isEditing" />
                    <FormRow label="Email" name="email" :value="formData.email" @change="handleChange" icon="mdi:email" type="email" :readOnly="!isEditing" />
                    <FormRow label="No. HP" name="phone" :value="formData.phone" @change="handleChange" icon="mdi:phone" :readOnly="!isEditing" />
                    <FormRowSelect label="Instansi" name="instansi_id" :value="formData.instansi_id" @change="handleChange" :options="instansiOptions" :readOnly="!isEditing" optionLabel="nama_instansi" />
                    <FormRowSelect label="Jenis Kelamin" name="jns_kelamin_id" :value="formData.jns_kelamin_id" @change="handleChange" :options="jenisKelaminOptions" :readOnly="!isEditing" optionLabel="jns_kelamin" />
                  </div>
                </div>
                <!-- Document & Education -->
                <div class="bg-amber-50 rounded-xl p-6 border border-amber-200">
                  <h3 class="text-lg font-bold text-amber-700 mb-4 flex items-center gap-2">
                    <Icon icon="mdi:file-document" class="w-5 h-5" /> Informasi Dokumen & Pendidikan
                  </h3>
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormRow label="Nomor Surat" name="nomor_surat" :value="formData.nomor_surat" @change="handleChange" icon="mdi:file-document" :readOnly="!isEditing" />
                    <FormRow label="TMT Pangkat" name="tmt_pangkat" :value="formData.tmt_pangkat?.slice(0, 10)" @change="handleChange" icon="mdi:calendar" type="date" :readOnly="!isEditing" />
                    <FormRow label="TMT Surat" name="tmt_surat" :value="formData.tmt_surat?.slice(0, 10)" @change="handleChange" icon="mdi:calendar" type="date" :readOnly="!isEditing" />
                    <FormRowSelect label="Pendidikan" name="pendidikan_id" :value="formData.pendidikan_id" @change="handleChange" :options="pendidikanOptions" :readOnly="!isEditing" optionLabel="pendidikan" />
                    <FormRowSelect label="Jenjang" name="jenjang_id" :value="formData.jenjang_id" @change="handleChange" :options="jenjangOptions" :readOnly="!isEditing" optionLabel="nm_jenjang" />
                    <FormRowSelect label="Golongan" name="golongan_id" :value="formData.golongan_id" @change="handleChange" :options="golonganOptions" :readOnly="!isEditing" optionLabel="golongan" />
                    <FormRowSelect label="Jalur Pengangkatan" name="jalur_id" :value="formData.jalur_id" @change="handleChange" :options="jalurOptions" :readOnly="!isEditing" optionLabel="jalur_pengangkatan" />
                  </div>
                </div>
                <div v-if="isEditing" class="pt-6 flex gap-4">
                  <button type="submit" :disabled="isSubmitting || !hasChanges"
                    :class="[
                      'flex-1 rounded-xl px-8 py-4 font-bold text-lg shadow-sm flex items-center justify-center gap-3 group',
                      isSubmitting || !hasChanges ? 'bg-gray-400 cursor-not-allowed' : 'bg-emerald-600 hover:bg-emerald-700 hover:shadow-md',
                      'text-white'
                    ]">
                    <span v-if="isSubmitting">
                      <span class="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                      Menyimpan...
                    </span>
                    <span v-else>
                      <Icon icon="mdi:content-save" class="w-6 h-6" /> Simpan Perubahan
                    </span>
                  </button>
                  <button type="button" @click="formData = { ...data }; hasChanges = false; isEditing = false"
                    class="px-6 py-4 bg-gray-500 hover:bg-gray-600 text-white rounded-xl font-semibold text-sm flex items-center gap-2">
                    <Icon icon="mdi:alert-circle" class="w-5 h-5" /> Batal
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<!-- InfoCard, FormRow, FormRowSelect bisa dibuat sebagai komponen terpisah atau slot -->