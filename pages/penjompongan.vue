<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
    <div class="container mx-auto px-4 py-16">
      <!-- Hero Section -->
      <div class="text-center mb-16">
        <h1 class="text-5xl font-bold text-gray-800 mb-6">
          Selamat Datang
        </h1>
        <p class="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Selamat datang di sistem manajemen kami. Kami siap membantu Anda dalam mengelola data dan informasi dengan mudah dan efisien.
        </p>
        <div class="flex justify-center gap-4">
          <button class="btn btn-primary btn-lg">
            <i class="fa-solid fa-rocket mr-2"></i>
            Mulai Sekarang
          </button>
          <button class="btn btn-outline btn-lg">
            <i class="fa-solid fa-info-circle mr-2"></i>
            Pelajari Lebih Lanjut
          </button>
        </div>
      </div>

      <!-- Features Section -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        <div class="card bg-white shadow-lg">
          <div class="card-body text-center">
            <div class="text-4xl text-primary mb-4">
              <i class="fa-solid fa-users"></i>
            </div>
            <h3 class="text-xl font-semibold mb-2">Manajemen User</h3>
            <p class="text-gray-600">Kelola pengguna dengan mudah dan aman</p>
          </div>
        </div>

        <div class="card bg-white shadow-lg">
          <div class="card-body text-center">
            <div class="text-4xl text-primary mb-4">
              <i class="fa-solid fa-chart-bar"></i>
            </div>
            <h3 class="text-xl font-semibold mb-2">Laporan & Analisis</h3>
            <p class="text-gray-600">Dapatkan insights dari data Anda</p>
          </div>
        </div>

        <div class="card bg-white shadow-lg">
          <div class="card-body text-center">
            <div class="text-4xl text-primary mb-4">
              <i class="fa-solid fa-shield-alt"></i>
            </div>
            <h3 class="text-xl font-semibold mb-2">Keamanan Terjamin</h3>
            <p class="text-gray-600">Data Anda aman dengan enkripsi tingkat tinggi</p>
          </div>
        </div>
      </div>

      <!-- Data Table Section -->
      <div class="card bg-white shadow-xl mb-8">
        <div class="card-body">
          <div class="flex justify-between items-center mb-4">
            <h2 class="text-2xl font-bold text-gray-800">
              <i class="fa-solid fa-table mr-2"></i>
              Data Pengguna
            </h2>
            <button class="btn btn-primary" @click="showAddModal = true">
              <i class="fa-solid fa-plus mr-2"></i>
              Tambah Data
            </button>
            <button class="btn btn-success ml-2" @click="showImportModal = true">
              <i class="fa-solid fa-file-excel mr-2"></i>
              Import Excel
            </button>
          </div>
          <div class="overflow-x-auto">
            <table class="table w-full">
              <thead>
                <tr>
                  <th>No</th>
                  <th>Nama</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Status</th>
                  <th>Aksi</th>
                </tr>
              </thead>
              <tbody>
                <tr v-if="loading">
                  <td colspan="6" class="text-center py-8">
                    <span class="loading loading-spinner loading-lg"></span>
                    <p class="mt-2">Memuat data...</p>
                  </td>
                </tr>
                <tr v-else-if="error">
                  <td colspan="6" class="text-center py-8">
                    <div class="alert alert-error">
                      <i class="fa-solid fa-exclamation-triangle"></i>
                      {{ error }}
                    </div>
                  </td>
                </tr>
                <tr v-else-if="users.length === 0">
                  <td colspan="6" class="text-center py-8">
                    <p class="text-gray-500">Tidak ada data pengguna</p>
                  </td>
                </tr>
                <tr v-else v-for="(user, index) in users" :key="user.id">
                  <td>{{ index + 1 }}</td>
                  <td>
                    <div class="flex items-center gap-3">
                      <div class="avatar">
                        <div class="mask mask-squircle w-12 h-12">
                          <img :src="`https://ui-avatars.com/api/?name=${user.nama}&background=random`" :alt="user.nama" />
                        </div>
                      </div>
                      <div>
                        <div class="font-bold">{{ user.nama }}</div>
                        <div class="text-sm opacity-50">{{ user.username }}</div>
                      </div>
                    </div>
                  </td>
                  <td>{{ user.email }}</td>
                  <td>
                    <span class="badge" :class="getRoleBadgeClass(user.role_id)">
                      {{ getRoleText(user.role_id) }}
                    </span>
                  </td>
                  <td>
                    <span class="badge badge-success">Aktif</span>
                  </td>
                  <td>
                    <div class="flex gap-2">
                      <button class="btn btn-info btn-xs" @click="viewUser(user)">
                        <i class="fa-solid fa-eye"></i>
                      </button>
                      <button class="btn btn-warning btn-xs" @click="editUser(user)">
                        <i class="fa-solid fa-edit"></i>
                      </button>
                      <button class="btn btn-error btn-xs" @click="deleteUser(user.id)">
                        <i class="fa-solid fa-trash"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <!-- Welcome Message -->
      <div class="card bg-white shadow-xl">
        <div class="card-body">
          <div class="flex items-center justify-between">
            <div>
              <h2 class="text-2xl font-bold text-gray-800 mb-2">
                Siap untuk memulai?
              </h2>
              <p class="text-gray-600">
                Bergabunglah dengan ribuan pengguna yang telah merasakan kemudahan sistem kami.
              </p>
            </div>
            <div class="hidden md:block">
              <div class="text-6xl text-primary">
                <i class="fa-solid fa-heart"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal Overlay untuk Input Data -->
    <Teleport to="body">
      <div v-if="showAddModal" class="modal modal-open">
        <div class="modal-box w-11/12 max-w-md">
          <h3 class="font-bold text-lg mb-4">
            <i class="fa-solid fa-user-plus mr-2"></i>
            Tambah Pengguna Baru
          </h3>
          
          <form @submit.prevent="addUser" class="space-y-4">
            <!-- Nama -->
            <div class="form-control">
              <label class="label">
                <span class="label-text font-semibold">Nama Lengkap</span>
              </label>
              <input 
                v-model="newUser.nama" 
                type="text" 
                class="input input-bordered" 
                placeholder="Masukkan nama lengkap"
                required
              />
            </div>

            <!-- Username -->
            <div class="form-control">
              <label class="label">
                <span class="label-text font-semibold">Username</span>
              </label>
              <input 
                v-model="newUser.username" 
                type="text" 
                class="input input-bordered" 
                placeholder="Masukkan username"
                required
              />
            </div>

            <!-- Email -->
            <div class="form-control">
              <label class="label">
                <span class="label-text font-semibold">Email</span>
              </label>
              <input 
                v-model="newUser.email" 
                type="email" 
                class="input input-bordered" 
                placeholder="Masukkan email"
                required
              />
            </div>

            <!-- Password -->
            <div class="form-control">
              <label class="label">
                <span class="label-text font-semibold">Password</span>
              </label>
              <input 
                v-model="newUser.password" 
                type="password" 
                class="input input-bordered" 
                placeholder="Masukkan password"
                required
              />
            </div>

            <!-- Role -->
            <div class="form-control">
              <label class="label">
                <span class="label-text font-semibold">Role</span>
              </label>
              <select v-model="newUser.role_id" class="select select-bordered" required>
                <option value="">Pilih Role</option>
                <option value="1">Admin</option>
                <option value="2">User</option>
                <option value="3">Manager</option>
              </select>
            </div>

            <!-- Action Buttons -->
            <div class="modal-action">
              <button 
                type="button" 
                class="btn btn-ghost" 
                @click="closeAddModal"
              >
                <i class="fa-solid fa-times mr-2"></i>
                Batal
              </button>
              <button 
                type="submit" 
                class="btn btn-primary"
                :disabled="isSubmitting"
              >
                <span v-if="isSubmitting" class="loading loading-spinner loading-sm mr-2"></span>
                <i v-else class="fa-solid fa-save mr-2"></i>
                {{ isSubmitting ? 'Menyimpan...' : 'Simpan' }}
              </button>
            </div>
          </form>
        </div>
        <div class="modal-backdrop" @click="closeAddModal"></div>
      </div>
    </Teleport>

    <!-- Modal Import Excel -->
    <Teleport to="body">
      <div v-if="showImportModal" class="modal modal-open">
        <div class="modal-box w-11/12 max-w-2xl">
          <h3 class="font-bold text-lg mb-4">
            <i class="fa-solid fa-file-excel mr-2"></i>
            Import Data dari Excel
          </h3>
          
          <!-- Format Template -->
          <div class="alert alert-info mb-4">
            <i class="fa-solid fa-info-circle"></i>
            <div>
              <h4 class="font-semibold">Format Excel yang diperlukan:</h4>
              <p class="text-sm">File Excel harus memiliki kolom: Nama, Username, Email, Password, Role (1=Admin, 2=User, 3=Manager)</p>
            </div>
          </div>

          <!-- Download Template -->
          <div class="mb-4">
            <button class="btn btn-outline btn-sm" @click="downloadTemplate">
              <i class="fa-solid fa-download mr-2"></i>
              Download Template Excel
            </button>
          </div>

          <!-- File Upload -->
          <div class="form-control mb-4">
            <label class="label">
              <span class="label-text font-semibold">Pilih File Excel</span>
            </label>
            <input 
              ref="fileInput"
              type="file" 
              accept=".xlsx,.xls"
              class="file-input file-input-bordered w-full" 
              @change="handleFileUpload"
            />
            <label class="label">
              <span class="label-text-alt">Format yang didukung: .xlsx, .xls</span>
            </label>
          </div>

          <!-- Preview Data -->
          <div v-if="importData.length > 0" class="mb-4">
            <h4 class="font-semibold mb-2">Preview Data ({{ importData.length }} records):</h4>
            <div class="overflow-x-auto max-h-64">
              <table class="table table-xs table-zebra">
                <thead>
                  <tr>
                    <th>No</th>
                    <th>Nama</th>
                    <th>Username</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item, index) in importData.slice(0, 5)" :key="index">
                    <td>{{ index + 1 }}</td>
                    <td>{{ item.nama }}</td>
                    <td>{{ item.username }}</td>
                    <td>{{ item.email }}</td>
                    <td>{{ getRoleText(item.role_id) }}</td>
                    <td>
                      <span v-if="item.valid" class="badge badge-success badge-xs">Valid</span>
                      <span v-else class="badge badge-error badge-xs">Error</span>
                    </td>
                  </tr>
                  <tr v-if="importData.length > 5">
                    <td colspan="6" class="text-center text-gray-500">... dan {{ importData.length - 5 }} data lainnya</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <!-- Error Messages -->
          <div v-if="importErrors.length > 0" class="alert alert-error mb-4">
            <i class="fa-solid fa-exclamation-triangle"></i>
            <div>
              <h4 class="font-semibold">Ditemukan Error:</h4>
              <ul class="text-sm">
                <li v-for="error in importErrors.slice(0, 3)" :key="error">{{ error }}</li>
                <li v-if="importErrors.length > 3" class="text-gray-600">... dan {{ importErrors.length - 3 }} error lainnya</li>
              </ul>
            </div>
          </div>

          <!-- Action Buttons -->
          <div class="modal-action">
            <button 
              type="button" 
              class="btn btn-ghost" 
              @click="closeImportModal"
            >
              <i class="fa-solid fa-times mr-2"></i>
              Batal
            </button>
            <button 
              type="button" 
              class="btn btn-primary"
              @click="importUsers"
              :disabled="importData.length === 0 || isImporting || importErrors.length > 0"
            >
              <span v-if="isImporting" class="loading loading-spinner loading-sm mr-2"></span>
              <i v-else class="fa-solid fa-upload mr-2"></i>
              {{ isImporting ? 'Mengimport...' : `Import ${importData.length} Data` }}
            </button>
          </div>
        </div>
        <div class="modal-backdrop" @click="closeImportModal"></div>
      </div>
    </Teleport>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

// Reactive state
const users = ref([])
const loading = ref(false)
const error = ref(null)
const showAddModal = ref(false)
const isSubmitting = ref(false)

// Import modal state
const showImportModal = ref(false)
const isImporting = ref(false)
const importData = ref([])
const importErrors = ref([])
const fileInput = ref(null)

// Form data for new user
const newUser = ref({
  nama: '',
  username: '',
  email: '',
  password: '',
  role_id: ''
})

// Set page meta
useHead({
  title: 'Selamat Datang - Sistem Manajemen',
  meta: [
    { name: 'description', content: 'Halaman selamat datang sistem manajemen' }
  ]
})

// Fetch users data
async function fetchUsers() {
  loading.value = true
  error.value = null
  
  try {
    const response = await $fetch('/api/user')
    users.value = response.data || []
  } catch (err) {
    console.error('Error fetching users:', err)
    error.value = 'Gagal memuat data pengguna'
  } finally {
    loading.value = false
  }
}

// Helper functions
function getRoleBadgeClass(roleId) {
  switch (roleId) {
    case 1:
      return 'badge-primary'
    case 2:
      return 'badge-secondary'
    case 3:
      return 'badge-accent'
    default:
      return 'badge-ghost'
  }
}

function getRoleText(roleId) {
  switch (roleId) {
    case 1:
      return 'Admin'
    case 2:
      return 'User'
    case 3:
      return 'Manager'
    default:
      return 'Unknown'
  }
}

// Action handlers
function viewUser(user) {
  alert(`Melihat detail user: ${user.nama}`)
}

function editUser(user) {
  alert(`Edit user: ${user.nama}`)
}

async function deleteUser(userId) {
  if (confirm('Yakin ingin menghapus user ini?')) {
    try {
      await $fetch(`/api/user?id=${userId}`, { method: 'DELETE' })
      await fetchUsers() // Refresh data
      alert('User berhasil dihapus')
    } catch (err) {
      console.error('Error deleting user:', err)
      alert('Gagal menghapus user')
    }
  }
}

// Modal handlers
function closeAddModal() {
  showAddModal.value = false
  // Reset form
  newUser.value = {
    nama: '',
    username: '',
    email: '',
    password: '',
    role_id: ''
  }
}

async function addUser() {
  isSubmitting.value = true
  
  try {
    await $fetch('/api/user', {
      method: 'POST',
      body: newUser.value
    })
    
    await fetchUsers() // Refresh data
    closeAddModal()
    alert('User berhasil ditambahkan')
  } catch (err) {
    console.error('Error adding user:', err)
    alert('Gagal menambahkan user')
  } finally {
    isSubmitting.value = false
  }
}

// Import modal handlers
function closeImportModal() {
  showImportModal.value = false
  importData.value = []
  importErrors.value = []
  if (fileInput.value) {
    fileInput.value.value = ''
  }
}

function downloadTemplate() {
  // Create sample Excel data
  const templateData = [
    ['Nama', 'Username', 'Email', 'Password', 'Role'],
    ['John Doe', 'johndoe', 'john@example.com', 'password123', '2'],
    ['Jane Smith', 'janesmith', 'jane@example.com', 'password456', '1'],
    ['Bob Wilson', 'bobwilson', 'bob@example.com', 'password789', '3']
  ]
  
  // Convert to CSV for simple download
  const csvContent = templateData.map(row => row.join(',')).join('\n')
  const blob = new Blob([csvContent], { type: 'text/csv' })
  const url = window.URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = 'template_user_import.csv'
  link.click()
  window.URL.revokeObjectURL(url)
}

function handleFileUpload(event) {
  const file = event.target.files[0]
  if (!file) return
  
  const reader = new FileReader()
  reader.onload = (e) => {
    try {
      // For simplicity, we'll handle CSV format
      // In a real app, you'd use a library like xlsx to handle Excel files
      const text = e.target.result
      const lines = text.split('\n').filter(line => line.trim())
      
      if (lines.length < 2) {
        importErrors.value = ['File harus memiliki header dan minimal 1 data']
        return
      }
      
      const headers = lines[0].split(',').map(h => h.trim().toLowerCase())
      const expectedHeaders = ['nama', 'username', 'email', 'password', 'role']
      
      // Validate headers
      const missingHeaders = expectedHeaders.filter(h => !headers.includes(h))
      if (missingHeaders.length > 0) {
        importErrors.value = [`Header yang hilang: ${missingHeaders.join(', ')}`]
        return
      }
      
      // Process data rows
      const data = []
      const errors = []
      
      for (let i = 1; i < lines.length; i++) {
        const row = lines[i].split(',').map(cell => cell.trim())
        if (row.length < 5) continue
        
        const [nama, username, email, password, role] = row
        const roleId = parseInt(role)
        
        // Validate data
        let valid = true
        const rowErrors = []
        
        if (!nama) { rowErrors.push(`Baris ${i + 1}: Nama tidak boleh kosong`); valid = false }
        if (!username) { rowErrors.push(`Baris ${i + 1}: Username tidak boleh kosong`); valid = false }
        if (!email || !email.includes('@')) { rowErrors.push(`Baris ${i + 1}: Email tidak valid`); valid = false }
        if (!password) { rowErrors.push(`Baris ${i + 1}: Password tidak boleh kosong`); valid = false }
        if (![1, 2, 3].includes(roleId)) { rowErrors.push(`Baris ${i + 1}: Role harus 1, 2, atau 3`); valid = false }
        
        errors.push(...rowErrors)
        
        data.push({
          nama,
          username,
          email,
          password,
          role_id: roleId,
          valid
        })
      }
      
      importData.value = data
      importErrors.value = errors
      
    } catch (err) {
      console.error('Error parsing file:', err)
      importErrors.value = ['Error membaca file. Pastikan format file benar.']
    }
  }
  
  reader.readAsText(file)
}

async function importUsers() {
  isImporting.value = true
  
  try {
    const validData = importData.value.filter(item => item.valid)
    
    for (const userData of validData) {
      await $fetch('/api/user', {
        method: 'POST',
        body: {
          nama: userData.nama,
          username: userData.username,
          email: userData.email,
          password: userData.password,
          role_id: userData.role_id
        }
      })
    }
    
    await fetchUsers() // Refresh data
    closeImportModal()
    alert(`Berhasil mengimport ${validData.length} user`)
  } catch (err) {
    console.error('Error importing users:', err)
    alert('Gagal mengimport data')
  } finally {
    isImporting.value = false
  }
}

// Load data on mount
onMounted(() => {
  fetchUsers()
})
</script>

<style scoped>
.animate-fadein {
  animation: fadeIn 0.5s ease-in;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
