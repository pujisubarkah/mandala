<template>
	<div class="min-h-screen bg-gray-50 py-8 px-2 md:px-8">
		<div class="max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-8">
			<h1 class="text-2xl font-bold mb-6 text-blue-700">Input Data Pendamping</h1>
			<button class="btn btn-primary mb-6" @click="showModal = true">Tambah Pendamping</button>
			<teleport to="body">
				<div v-if="showModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
					<form @submit.prevent="addPendamping" class="bg-white rounded-xl shadow-2xl max-w-md w-full p-8 relative animate-fadein">
						<button type="button" class="btn btn-sm btn-circle btn-ghost absolute right-4 top-4" @click="showModal = false">✕</button>
						<h2 class="text-xl font-bold mb-4 text-blue-700">Tambah Pendamping</h2>
						<div class="space-y-4">
							<input v-model="form.nama" class="input input-bordered w-full" placeholder="Nama Pendamping" required />
							<input v-model="form.nip" class="input input-bordered w-full" placeholder="NIP" required />
							<input v-model="form.instansi" class="input input-bordered w-full" placeholder="Instansi" required />
							  <input v-model="form.foto" class="input input-bordered w-full" placeholder="URL Foto (opsional)" />
							  <input v-model="form.password" type="password" class="input input-bordered w-full bg-gray-100" placeholder="Password Default" readonly />
						</div>
						<button class="btn btn-primary w-full mt-6">Simpan</button>
					</form>
				</div>
			</teleport>
			<h2 class="text-lg font-semibold mb-2">Daftar Pendamping</h2>
			<div class="overflow-x-auto rounded shadow">
				<table class="table w-full text-base">
					<thead>
						<tr>
							<th>No</th>
							<th>Foto</th>
							<th>Nama</th>
							<th>NIP</th>
							<th>Instansi</th>
							<th></th>
						</tr>
					</thead>
					<tbody>
						<tr v-for="(p, idx) in pendampingList" :key="idx">
							<td>{{ idx + 1 }}</td>
							<td>
								<img v-if="p.foto" :src="p.foto" alt="foto" class="w-12 h-12 object-cover rounded-full border" />
								<div v-else class="w-12 h-12 flex items-center justify-center bg-gray-200 rounded-full text-gray-400">-</div>
							</td>
							<td>{{ p.nama }}</td>
							<td>{{ p.nip }}</td>
							<td>{{ p.instansi }}</td>
							<td><button class="btn btn-error btn-xs" @click="removePendamping(idx)">Hapus</button></td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	</div>
</template>

<script setup>
import { ref } from 'vue'

const form = ref({ nama: '', nip: '', instansi: '', foto: '', password: '12345678' })
const pendampingList = ref([])
const showModal = ref(false)

function addPendamping() {
	if (!form.value.nama || !form.value.nip || !form.value.instansi) return
	pendampingList.value.push({ ...form.value })
	form.value = { nama: '', nip: '', instansi: '', foto: '', password: '12345678' }
	showModal.value = false
}
function removePendamping(idx) {
	pendampingList.value.splice(idx, 1)
}
</script>

<style scoped>
.input {
	border: 1px solid #cbd5e1;
	border-radius: 0.5rem;
	padding: 0.5rem 1rem;
}
.btn {
	padding: 0.5rem 1.5rem;
	border-radius: 0.5rem;
	font-weight: 600;
}
.btn-primary {
	background: #2563eb;
	color: #fff;
}
.btn-error {
	background: #ef4444;
	color: #fff;
}
</style>
