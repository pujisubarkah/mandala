<script setup>
definePageMeta({ layout: 'admin' })
import LoadingSpinner from '~/components/LoadingSpinner.vue';
import { useUserStore } from '~/store/user'
import { defineComponent, h } from 'vue'

const userStore = useUserStore()
let username = userStore.username
if (!username && typeof window !== 'undefined') {
  const user = JSON.parse(localStorage.getItem('user') || '{}')
  username = user.nama || ''
}

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

// Options
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
      $fetch(`/api/widyaiswara/${id}`),
      $fetch('/api/pendidikan'),
      $fetch('/api/instansi'),
      $fetch('/api/jenjang'),
      $fetch('/api/jns_kelamin'),
      $fetch('/api/golongan'),
      $fetch('/api/jalur')
    ])

    // Gunakan langsung karena struktur sudah benar
    data.value = pegawaiRes

    // Siapkan formData, pastikan tanggal dalam format YYYY-MM-DD
    formData.value = {
      ...pegawaiRes,
      tmt_pangkat: pegawaiRes.tmt_pangkat ? pegawaiRes.tmt_pangkat.split('T')[0] : '',
      tmt_surat: pegawaiRes.tmt_surat ? pegawaiRes.tmt_surat.split('T')[0] : '',
      nomor_surat: pegawaiRes.nomor_surat || ''
    }

    // Isi opsi dropdown - handle response structure
    pendidikanOptions.value = pendidikanRes?.data || pendidikanRes || []
    instansiOptions.value = instansiRes?.data || instansiRes || []
    jenjangOptions.value = jenjangRes?.data || jenjangRes || []
    jenisKelaminOptions.value = jenisKelaminRes?.data || jenisKelaminRes || []
    golonganOptions.value = golonganRes?.data || golonganRes || []
    jalurOptions.value = jalurRes?.data || jalurRes || []
    error.value = ''
  } catch (err) {
    error.value = 'Data tidak ditemukan.'
    console.error('Error fetching data:', err)
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
    // TODO: Kirim ke API
    // await $fetch(`/api/analis_kebijakan/${id}`, { method: 'PUT', body: formData.value })
    data.value = { ...formData.value }
    hasChanges.value = false
    isEditing.value = false
    showSuccessToast.value = true
    setTimeout(() => showSuccessToast.value = false, 3000)
  } catch (err) {
    alert('Gagal menyimpan data. Coba lagi.')
  } finally {
    isSubmitting.value = false
  }
}

// Helper: Format tanggal
const formatDate = (date) => {
  if (!date) return '-'
  const d = new Date(date)
  return d.toLocaleDateString('id-ID', { day: '2-digit', month: 'long', year: 'numeric' })
}

// Komponen lokal
const StatCard = defineComponent({
  props: {
    label: String,
    value: [String, Number],
    icon: String,
    color: String
  },
  setup(props) {
    const colorClass = {
      blue: 'bg-blue-100 text-blue-800',
      purple: 'bg-purple-100 text-purple-800',
      amber: 'bg-amber-100 text-amber-800',
      indigo: 'bg-indigo-100 text-indigo-800',
      green: 'bg-green-100 text-green-800'
    }[props.color] || 'bg-gray-100 text-gray-800'
    return () => h('div', { class: 'text-center' }, [
      h('div', { class: 'text-xs font-medium text-gray-500 mb-1' }, props.label),
      h('div', { class: `text-lg font-bold px-3 py-1 rounded-full ${colorClass}` }, [
        h('Icon', { icon: props.icon, class: 'inline w-4 h-4 mr-1 -mt-0.5' }),
        props.value || '-'
      ])
    ])
  }
})

const InfoItem = defineComponent({
  props: {
    label: String,
    value: [String, Number],
    icon: String
  },
  setup(props) {
    return () => h('div', { class: 'flex items-center gap-2 text-gray-700' }, [
      h('Icon', { icon: props.icon, class: 'w-4 h-4 text-gray-500' }),
      h('span', { class: 'font-medium text-sm min-w-24' }, `${props.label}:`),
      h('span', { class: 'text-sm' }, props.value || '-')
    ])
  }
})

const FormRow = defineComponent({
  props: {
    label: String,
    name: String,
    value: [String, Number],
    icon: String,
    type: String,
    readOnly: Boolean
  },
  emits: ['change'],
  setup(props, { emit }) {
    return () => h('div', {}, [
      h('label', { class: 'block text-sm font-medium text-gray-700 mb-1' }, props.label),
      h('div', { class: 'relative' }, [
        h('input', {
          type: props.type || 'text',
          name: props.name,
          value: props.value,
          onInput: e => emit('change', e),
          readOnly: props.readOnly,
          class: [
            'w-full px-4 py-2 rounded-lg border text-gray-700 focus:ring-2 focus:ring-blue-300 outline-none transition',
            props.readOnly ? 'bg-gray-100 cursor-not-allowed' : 'bg-white hover:border-gray-400 focus:border-blue-500'
          ].join(' ')
        }),
        props.icon ? h('Icon', { icon: props.icon, class: 'absolute right-3 top-1/2 w-5 h-5 -translate-y-1/2 text-gray-400' }) : null
      ])
    ])
  }
})

const FormRowSelect = defineComponent({
  props: {
    label: String,
    name: String,
    value: [String, Number],
    options: Array,
    optionLabel: String,
    readOnly: Boolean
  },
  emits: ['change'],
  setup(props, { emit }) {
    return () => h('div', {}, [
      h('label', { class: 'block text-sm font-medium text-gray-700 mb-1' }, props.label),
      h('select', {
        name: props.name,
        value: props.value,
        onChange: e => emit('change', e),
        disabled: props.readOnly,
        class: [
          'w-full px-4 py-2 rounded-lg border text-gray-700 focus:ring-2 focus:ring-blue-300 outline-none transition',
          props.readOnly ? 'bg-gray-100 cursor-not-allowed' : 'bg-white hover:border-gray-400 focus:border-blue-500'
        ].join(' ')
      }, [
        h('option', { value: '' }, `Pilih ${props.label}`),
        ...(props.options || []).map(opt =>
          h('option', { key: opt.id, value: opt.id }, opt[props.optionLabel])
        )
      ])
    ])
  }
})
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 via-white to-emerald-50 relative overflow-hidden">
      <!-- Success Toast -->
      <Transition name="fade" mode="out-in">
        <div v-if="showSuccessToast" class="fixed top-4 right-4 z-50">
          <div class="bg-emerald-500 text-white px-6 py-4 rounded-xl shadow-lg border border-emerald-400/20 flex items-center gap-3 animate-bounce">
            <Icon icon="mdi:check-circle" class="w-6 h-6" />
            <div>
              <div class="font-bold">Berhasil!</div>
              <div class="text-sm opacity-90">Data telah diperbarui</div>
            </div>
          </div>
        </div>
      </Transition>

      <!-- Loading -->
      <div v-if="loading" class="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <LoadingSpinner size="xl" custom-class="mb-4" />
        <div class="mt-6 text-center">
          <div class="text-xl font-bold text-blue-600">Memuat Data...</div>
          <div class="text-sm text-gray-600 mt-1">Mohon tunggu sebentar</div>
        </div>
      </div>

      <!-- Main Content -->
      <div v-else class="p-6 md:p-8">
        <!-- Back Button -->
        <div class="mb-6">
          <NuxtLink
            :to="`/${username}/form/analis-kebijakan`"
            class="inline-flex items-center gap-3 bg-white px-6 py-3 rounded-xl shadow-sm border border-gray-200 text-blue-700 hover:bg-blue-50 font-semibold group transition-all"
          >
            <Icon icon="mdi:arrow-left" class="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            Kembali ke Dashboard
          </NuxtLink>
        </div>

        <!-- Header Info -->
        <div v-if="data" class="mb-8">
          <h1 class="text-3xl font-bold text-gray-800">{{ data.jabfung }}</h1>
          <p class="text-xl text-gray-600 mt-1">{{ data.nama }}</p>
          <p class="text-lg text-blue-500 font-medium">{{ data.nama_instansi }}</p>
        </div>

        <!-- Grid Utama -->
        <div class="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start max-w-7xl mx-auto">
          <!-- Left: Profile & Info -->
          <div class="lg:col-span-1 space-y-6">
            <!-- Profile Picture -->
            <div class="bg-white rounded-2xl shadow-lg p-6 text-center border border-gray-100">
              <div class="relative inline-block mb-4">
                <div class="w-32 h-32 rounded-2xl border-4 border-white shadow-xl overflow-hidden mx-auto">
                  <img
                    v-if="data?.photo"
                    :src="data.photo.trim()"
                    :alt="data.nama"
                    class="object-cover w-full h-full"
                  />
                  <div
                    v-else
                    class="w-full h-full bg-gradient-to-br from-blue-400 to-blue-600 text-white text-6xl font-bold flex items-center justify-center"
                  >
                    {{ data?.nama?.charAt(0).toUpperCase() || '?' }}
                  </div>
                </div>
                <div class="absolute -bottom-2 -right-2 bg-emerald-500 text-white p-2 rounded-full shadow-lg">
                  <Icon icon="mdi:check-circle" class="w-5 h-5" />
                </div>
              </div>

          
           
            </div>

        
          </div>

          <!-- Right: Edit Form -->
          <div class="lg:col-span-3">
            <form @submit="handleSubmit" class="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-gray-200">
              <!-- Header -->
              <div class="flex items-center justify-between mb-6">
                <div class="flex items-center gap-3">
                  <Icon icon="mdi:pencil" class="w-6 h-6 text-blue-600" />
                  <h2 class="text-2xl font-bold text-gray-800">
                    {{ isEditing ? 'Sunting Data' : 'Detail Pegawai' }}
                  </h2>
                </div>
                <button
                  type="button"
                  @click="isEditing = !isEditing; if (!isEditing) { formData = { ...data }; hasChanges = false }"
                  class="px-4 py-2 rounded-lg font-semibold text-sm transition-all flex items-center gap-2"
                  :class="isEditing ? 'bg-gray-500 hover:bg-gray-600 text-white' : 'bg-blue-500 hover:bg-blue-600 text-white'"
                >
                  <Icon :icon="isEditing ? 'mdi:close' : 'mdi:pencil'" class="w-4 h-4" />
                  {{ isEditing ? 'Batal' : 'Edit' }}
                </button>
              </div>

              <!-- Unsaved Changes Alert -->
              <div v-if="hasChanges && isEditing" class="bg-amber-50 border border-amber-300 rounded-lg p-3 mb-6 flex items-center gap-2 text-amber-700 text-sm">
                <Icon icon="mdi:alert" class="w-5 h-5" />
                <span><strong>Perubahan belum disimpan.</strong> Klik "Simpan" untuk menerapkan.</span>
              </div>

              <!-- Personal Info -->
              <div class="bg-blue-50 rounded-xl p-6 border border-blue-200 mb-6">
                <h3 class="text-lg font-bold text-blue-700 mb-4 flex items-center gap-2">
                  <Icon icon="mdi:account" class="w-5 h-5" /> Informasi Pribadi
                </h3>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <FormRow label="Nama Lengkap" name="nama" :value="formData?.nama" @change="handleChange" icon="mdi:account" :readOnly="!isEditing" />
                  <FormRow label="NIP" name="nip" :value="formData?.nip" @change="handleChange" icon="mdi:file-document" :readOnly="!isEditing" />
                  <FormRow label="NIKN" name="niakn" :value="formData?.niakn" @change="handleChange" icon="mdi:file-document" :readOnly="!isEditing" />
                  <FormRow label="Unit Kerja" name="unit_kerja" :value="formData?.unit_kerja" @change="handleChange" icon="mdi:map-marker" :readOnly="!isEditing" />
                  <FormRow label="Email" name="email" :value="formData?.email" @change="handleChange" icon="mdi:email" type="email" :readOnly="!isEditing" />
                  <FormRow label="No. HP" name="phone" :value="formData?.phone" @change="handleChange" icon="mdi:phone" :readOnly="!isEditing" />
                  
                  <!-- Golongan - Custom Field -->
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Golongan</label>
                    <div class="relative">
                      <div v-if="!isEditing" class="w-full px-4 py-2 rounded-lg border bg-gray-100 text-gray-700 flex items-center gap-2">
                        <Icon icon="mdi:trophy" class="w-5 h-5 text-amber-500" />
                        <span>{{ formData?.golongan || '-' }}</span>
                      </div>
                      <select v-else
                        name="golongan"
                        :value="formData?.golongan"
                        @change="handleChange"
                        class="w-full px-4 py-2 rounded-lg border text-gray-700 focus:ring-2 focus:ring-blue-300 outline-none transition bg-white hover:border-gray-400 focus:border-blue-500"
                      >
                        <option value="">Pilih Golongan</option>
                        <option v-for="gol in golonganOptions" :key="gol.id" :value="gol.golongan">
                          {{ gol.golongan }}
                        </option>
                      </select>
                    </div>
                  </div>

                  <FormRow 
                    label="Instansi" 
                    name="nama_instansi" 
                    :value="formData?.nama_instansi" 
                    @change="handleChange" 
                    icon="mdi:office-building" 
                    :readOnly="!isEditing" 
                  />
                  
                  <!-- Jenjang - Custom Field -->
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Jenjang</label>
                    <div class="relative">
                      <div v-if="!isEditing" class="w-full px-4 py-2 rounded-lg border bg-gray-100 text-gray-700 flex items-center gap-2">
                        <Icon icon="mdi:star" class="w-5 h-5 text-yellow-500" />
                        <span>{{ formData?.nm_jenjang || '-' }}</span>
                      </div>
                      <select v-else
                        name="nm_jenjang"
                        :value="formData?.nm_jenjang"
                        @change="handleChange"
                        class="w-full px-4 py-2 rounded-lg border text-gray-700 focus:ring-2 focus:ring-blue-300 outline-none transition bg-white hover:border-gray-400 focus:border-blue-500"
                      >
                        <option value="">Pilih Jenjang</option>
                        <option v-for="jenj in jenjangOptions" :key="jenj.id" :value="jenj.nm_jenjang">
                          {{ jenj.nm_jenjang }}
                        </option>
                      </select>
                    </div>
                  </div>

                  <!-- Pendidikan - Custom Field -->
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Pendidikan</label>
                    <div class="relative">
                      <div v-if="!isEditing" class="w-full px-4 py-2 rounded-lg border bg-gray-100 text-gray-700 flex items-center gap-2">
                        <Icon icon="mdi:school" class="w-5 h-5 text-blue-500" />
                        <span>{{ formData?.pendidikan || '-' }}</span>
                      </div>
                      <select v-else
                        name="pendidikan"
                        :value="formData?.pendidikan"
                        @change="handleChange"
                        class="w-full px-4 py-2 rounded-lg border text-gray-700 focus:ring-2 focus:ring-blue-300 outline-none transition bg-white hover:border-gray-400 focus:border-blue-500"
                      >
                        <option value="">Pilih Pendidikan</option>
                        <option v-for="pend in pendidikanOptions" :key="pend.id" :value="pend.pendidikan">
                          {{ pend.pendidikan }}
                        </option>
                      </select>
                    </div>
                  </div>

                  <!-- Jalur Pengangkatan - Custom Field -->
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Jalur Pengangkatan</label>
                    <div class="relative">
                      <div v-if="!isEditing" class="w-full px-4 py-2 rounded-lg border bg-gray-100 text-gray-700 flex items-center gap-2">
                        <Icon icon="mdi:account-arrow-right" class="w-5 h-5 text-purple-500" />
                        <span>{{ formData?.jalur_pengangkatan || '-' }}</span>
                      </div>
                      <select v-else
                        name="jalur_pengangkatan"
                        :value="formData?.jalur_pengangkatan"
                        @change="handleChange"
                        class="w-full px-4 py-2 rounded-lg border text-gray-700 focus:ring-2 focus:ring-blue-300 outline-none transition bg-white hover:border-gray-400 focus:border-blue-500"
                      >
                        <option value="">Pilih Jalur Pengangkatan</option>
                        <option v-for="jalur in jalurOptions" :key="jalur.id" :value="jalur.jalur_pengangkatan">
                          {{ jalur.jalur_pengangkatan }}
                        </option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Jenis Kelamin</label>
                    <div class="relative">
                      <div v-if="!isEditing" class="w-full px-4 py-2 rounded-lg border bg-gray-100 text-gray-700 flex items-center gap-2">
                        <Icon :icon="formData?.jns_kelamin === 'Pria' ? 'mdi:gender-male' : 'mdi:gender-female'" 
                              :class="formData?.jns_kelamin === 'Pria' ? 'text-blue-600' : 'text-pink-600'" 
                              class="w-5 h-5" />
                        <span>{{ formData?.jns_kelamin || '-' }}</span>
                      </div>
                      <select v-else
                        name="jns_kelamin"
                        :value="formData?.jns_kelamin"
                        @change="handleChange"
                        class="w-full px-4 py-2 rounded-lg border text-gray-700 focus:ring-2 focus:ring-blue-300 outline-none transition bg-white hover:border-gray-400 focus:border-blue-500"
                      >
                        <option value="">Pilih Jenis Kelamin</option>
                        <option value="Pria">👨 Pria</option>
                        <option value="Wanita">👩 Wanita</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Dokumen & Riwayat -->
              <div class="bg-emerald-50 rounded-xl p-6 border border-emerald-200 mb-6">
                <h3 class="text-lg font-bold text-emerald-700 mb-4 flex items-center gap-2">
                  <Icon icon="mdi:file-document" class="w-5 h-5" /> Riwayat & Dokumen
                </h3>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <FormRow
                    label="Nomor Surat"
                    name="nomor_surat"
                    :value="formData?.nomor_surat || ''"
                    @change="handleChange"
                    icon="mdi:file-document"
                    :readOnly="!isEditing"
                  />
                  <FormRow
                    label="TMT Pangkat"
                    name="tmt_pangkat"
                    :value="formData?.tmt_pangkat || ''"
                    @change="handleChange"
                    type="date"
                    :readOnly="!isEditing"
                  />
                  <FormRow
                    label="TMT Surat"
                    name="tmt_surat"
                    :value="formData?.tmt_surat || ''"
                    @change="handleChange"
                    type="date"
                    :readOnly="!isEditing"
                  />
                </div>

                <!-- Stats Grid -->
            
              </div>

              <!-- Submit Buttons -->
              <div v-if="isEditing" class="flex gap-4 pt-4">
                <button
                  type="submit"
                  :disabled="isSubmitting || !hasChanges"
                  class="flex-1 bg-emerald-600 hover:bg-emerald-700 disabled:bg-gray-400 text-white font-bold py-4 px-8 rounded-xl flex items-center justify-center gap-3 shadow-sm transition-all"
                >
                  <span v-if="isSubmitting">
                    <span class="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                    Menyimpan...
                  </span>
                  <span v-else>
                    <Icon icon="mdi:content-save" class="w-6 h-6" />
                    Simpan Perubahan
                  </span>
                </button>
                <button
                  type="button"
                  @click="formData = { ...data }; hasChanges = false; isEditing = false"
                  class="px-6 py-4 bg-gray-500 hover:bg-gray-600 text-white rounded-xl font-semibold flex items-center gap-2"
                >
                  <Icon icon="mdi:close" class="w-5 h-5" />
                  Batal
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  
</template>

<style>
.fade-enter-active, .fade-leave-active {
  transition: all 0.3s;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
  transform: translateY(0.5rem);
}
</style>