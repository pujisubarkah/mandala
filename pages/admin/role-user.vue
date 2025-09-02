<template>
  <div class="min-h-screen bg-gray-50 p-8">
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-bold text-gray-800">Manajemen Role User</h1>
      <button class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold shadow" @click="openForm">
        + Tambah User
      </button>
    </div>

    <!-- Table -->
    <div class="bg-white rounded-lg shadow p-4">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-100">
          <tr>
            <th class="px-4 py-2 text-left text-xs font-bold text-gray-600">Username</th>
            <th class="px-4 py-2 text-left text-xs font-bold text-gray-600">Nama</th>
            <th class="px-4 py-2 text-left text-xs font-bold text-gray-600">Email</th>
            <th class="px-4 py-2 text-left text-xs font-bold text-gray-600">Instansi</th>
            <th class="px-4 py-2 text-left text-xs font-bold text-gray-600">Role</th>
            <th class="px-4 py-2 text-left text-xs font-bold text-gray-600">Tanggal Dibuat</th>
            <th class="px-4 py-2 text-left text-xs font-bold text-gray-600">Aksi</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in userList" :key="user.id" class="hover:bg-blue-50">
            <td class="px-4 py-2 font-semibold text-gray-800">{{ user.username }}</td>
            <td class="px-4 py-2 text-gray-600">{{ user.nama }}</td>
            <td class="px-4 py-2 text-gray-600">{{ user.email }}</td>
            <td class="px-4 py-2 text-gray-600">{{ user.nama_instansi || '-' }}</td>
            <td class="px-4 py-2 text-gray-600">{{ roleName(user.role_id) }}</td>
            <td class="px-4 py-2 text-gray-600">{{ formatDate(user.createdAt) }}</td>
            <td class="px-4 py-2">
              <button class="text-blue-600 hover:underline mr-2" @click="editUser(user)">Edit</button>
              <button class="text-red-600 hover:underline" @click="deleteUser(user.id)">Hapus</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Modal Input User -->
    <div v-if="showForm" class="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg shadow-lg p-8 w-full max-w-lg">
        <h2 class="text-xl font-bold mb-4">Tambah User Baru</h2>
        <form @submit.prevent="submitForm">
          <div class="mb-4">
            <label class="block text-sm font-semibold mb-1">Username</label>
            <input v-model="form.username" type="text" class="w-full border rounded px-3 py-2" required />
          </div>
          <div class="mb-4">
            <label class="block text-sm font-semibold mb-1">Nama</label>
            <input v-model="form.nama" type="text" class="w-full border rounded px-3 py-2" required />
          </div>
          <div class="mb-4">
            <label class="block text-sm font-semibold mb-1">Email</label>
            <input v-model="form.email" type="email" class="w-full border rounded px-3 py-2" required />
          </div>
          <div class="mb-4">
            <label class="block text-sm font-semibold mb-1">Role</label>
            <select v-model="form.role_id" class="w-full border rounded px-3 py-2" required>
              <option v-for="role in roles" :key="role.role_id" :value="role.role_id">{{ role.role_nama }}</option>
            </select>
          </div>
          <div class="mb-4">
            <label class="block text-sm font-semibold mb-1">Password</label>
            <input v-model="form.password" type="password" class="w-full border rounded px-3 py-2" required />
          </div>
          <div class="mb-4">
            <label class="block text-sm font-semibold mb-1">Instansi</label>
            <select v-model="form.instansi_id" class="w-full border rounded px-3 py-2" required>
              <option value="">Pilih Instansi</option>
              <option v-for="ins in instansiList" :key="ins.id" :value="ins.id">{{ ins.nama_instansi }}</option>
            </select>
          </div>
          <div class="flex justify-end gap-2 mt-6">
            <button type="button" class="px-4 py-2 bg-gray-200 rounded" @click="closeForm">Tutup</button>
            <button type="submit" class="px-4 py-2 bg-blue-600 text-white rounded font-semibold">Simpan</button>
          </div>
        </form>
      </div>
    </div>

    <!-- Modal Edit User -->
    <div v-if="showEditForm" class="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg shadow-lg p-8 w-full max-w-lg">
        <h2 class="text-xl font-bold mb-4">Edit User</h2>
        <form @submit.prevent="submitEditForm">
          <div class="mb-4">
            <label class="block text-sm font-semibold mb-1">Username</label>
            <input v-model="editForm.username" type="text" class="w-full border rounded px-3 py-2" required />
          </div>
          <div class="mb-4">
            <label class="block text-sm font-semibold mb-1">Nama</label>
            <input v-model="editForm.nama" type="text" class="w-full border rounded px-3 py-2" required />
          </div>
          <div class="mb-4">
            <label class="block text-sm font-semibold mb-1">Email</label>
            <input v-model="editForm.email" type="email" class="w-full border rounded px-3 py-2" required />
          </div>
          <div class="mb-4">
            <label class="block text-sm font-semibold mb-1">Instansi</label>
            <select v-model="editForm.instansi_id" class="w-full border rounded px-3 py-2" required>
              <option value="">Pilih Instansi</option>
              <option v-for="ins in instansiList" :key="ins.id" :value="ins.id">{{ ins.nama_instansi }}</option>
            </select>
          </div>
          <div class="mb-4">
            <label class="block text-sm font-semibold mb-1">Role</label>
            <select v-model="editForm.role_id" class="w-full border rounded px-3 py-2" required>
              <option v-for="role in roles" :key="role.role_id" :value="role.role_id">{{ role.role_nama }}</option>
            </select>
          </div>
          <div class="mb-4">
            <label class="block text-sm font-semibold mb-1">Password</label>
            <input v-model="editForm.password" type="password" class="w-full border rounded px-3 py-2" required />
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

const userList = ref([]);
const showForm = ref(false);
const showEditForm = ref(false);
const form = ref({
  username: '',
  nama: '',
  email: '',
  role_id: '',
  password: '',
  instansi_id: ''
});
const editForm = ref({
  id: null,
  username: '',
  nama: '',
  email: '',
  role_id: '',
  password: '',
  instansi_id: ''
});
const roles = ref([]);
const instansiList = ref([]);

function openForm() {
  showForm.value = true;
}
function closeForm() {
  showForm.value = false;
  form.value = { username: '', nama: '', email: '', role_id: '', password: '' };
}
async function submitForm() {
  try {
    const res = await fetch('/api/user', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form.value)
    });
    if (!res.ok) throw new Error('Gagal tambah user');
    await res.json();
    // Refresh data user
    const userRes = await fetch('/api/user');
    const userData = await userRes.json();
    userList.value = Array.isArray(userData.data) ? userData.data : [];
    closeForm();
  } catch (err) {
    alert(err.message || 'Terjadi kesalahan saat tambah user');
  }
}
function editUser(user) {
  editForm.value = {
    id: user.id,
    username: user.username,
    nama: user.nama,
    email: user.email,
    role_id: user.role_id,
    password: '', // kosongkan password untuk edit
    instansi_id: user.instansi_id || ''
  };
  showEditForm.value = true;
}
function closeEditForm() {
  showEditForm.value = false;
  editForm.value = { id: null, username: '', nama: '', email: '', role_id: '', password: '', instansi_id: '' };
}
async function submitEditForm() {
  try {
    const res = await fetch(`/api/user/${editForm.value.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(editForm.value)
    });
    if (!res.ok) throw new Error('Gagal edit user');
    await res.json();
    // Refresh data user
    const userRes = await fetch('/api/user');
    const userData = await userRes.json();
    userList.value = Array.isArray(userData.data) ? userData.data : [];
    closeEditForm();
  } catch (err) {
    alert(err.message || 'Terjadi kesalahan saat edit user');
  }
}
async function deleteUser(id) {
  if (!window.confirm('Yakin ingin menghapus user ini?')) return;
  try {
    const res = await fetch(`/api/user/${id}`, {
      method: 'DELETE'
    });
    if (!res.ok) throw new Error('Gagal hapus user');
    await res.json();
    // Refresh data user
    const userRes = await fetch('/api/user');
    const userData = await userRes.json();
    userList.value = Array.isArray(userData.data) ? userData.data : [];
  } catch (err) {
    alert(err.message || 'Terjadi kesalahan saat hapus user');
  }
}
function formatDate(dateStr) {
  if (!dateStr) return '-';
  const d = new Date(dateStr);
  return d.toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' });
}
function roleName(roleId) {
  if (!roles.value || !Array.isArray(roles.value)) return '-';
  const role = roles.value.find(r => r.role_id == roleId); // gunakan == untuk handle string/number
  return role ? role.role_nama : 'Unknown';
}

onMounted(async () => {
  // Fetch data dari endpoint API user
  const res = await fetch('/api/user');
  const data = await res.json();
  userList.value = Array.isArray(data.data) ? data.data : [];
  // Fetch data role dari endpoint API role
  const roleRes = await fetch('/api/role');
  const roleData = await roleRes.json();
  roles.value = Array.isArray(roleData.data) ? roleData.data : (Array.isArray(roleData) ? roleData : []);
  // Fetch data instansi dari endpoint API instansi
  const instansiRes = await fetch('/api/instansi');
  const instansiData = await instansiRes.json();
  instansiList.value = Array.isArray(instansiData) ? instansiData : (Array.isArray(instansiData.data) ? instansiData.data : []);
});
</script>

<style scoped>
/* Tambahkan style sesuai kebutuhan */
</style>
