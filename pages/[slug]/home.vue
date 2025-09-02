<template>
  <div class="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 via-blue-50 to-indigo-100">
    <div class="bg-white rounded-xl shadow-2xl p-10 max-w-2xl w-full text-center relative">
      <img src="/logo.png" alt="Logo Mandala" class="mx-auto mb-6 h-20 w-auto drop-shadow-lg" />
      <h1 class="text-4xl font-extrabold text-blue-700 mb-2 animate-fade-in">Selamat Datang, <span class="text-indigo-600">{{ nama }}</span>!</h1>
      <p class="text-lg text-gray-600 mb-6">Anda masuk sebagai <span class="font-semibold text-blue-600">Fungsional Instansi</span>.<br>Berikut statistik pegawai fungsional Analis Kebijakan, Widyaiswara dan Analis Bangkom di instansi Anda:</p>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        <div class="bg-blue-50 rounded-lg shadow p-6 flex flex-col items-center">
          <span class="text-3xl mb-2">📊</span>
          <div class="text-2xl font-bold text-blue-700">{{ jumlahAK }}</div>
          <div class="text-sm text-gray-600 mt-1">Analis Kebijakan</div>
        </div>
        <div class="bg-indigo-50 rounded-lg shadow p-6 flex flex-col items-center">
          <span class="text-3xl mb-2">🎓</span>
          <div class="text-2xl font-bold text-indigo-700">{{ jumlahWI }}</div>
          <div class="text-sm text-gray-600 mt-1">Widyaiswara</div>
        </div>
        <div class="bg-green-50 rounded-lg shadow p-6 flex flex-col items-center">
          <span class="text-3xl mb-2">🧑‍💼</span>
          <div class="text-2xl font-bold text-green-700">{{ jumlahBangkom }}</div>
          <div class="text-sm text-gray-600 mt-1">Analis Bangkom</div>
        </div>
      </div>
      <div class="mt-10">
        <NuxtLink :to="`/${nama}`" class="px-6 py-3 bg-indigo-600 text-white rounded-lg font-semibold shadow hover:bg-indigo-700 transition">Detail per Jabatan</NuxtLink>
      </div>
      <div class="absolute top-0 right-0 m-4 text-xs text-gray-400">Dashboard Instansi</div>
    </div>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router';
import { ref, onMounted } from 'vue';
const route = useRoute();
const nama = route.params.slug;

const jumlahAK = ref(0);
const jumlahWI = ref(0);
const jumlahBangkom = ref(0);

function getInstansiId() {
  // Coba ambil dari Pinia store jika ada, fallback ke localStorage
  try {
    const { useUserStore } = require('~/store/user');
    const userStore = useUserStore();
    if (userStore.instansi_id) return userStore.instansi_id;
  } catch (e) {}
  return localStorage.getItem('instansi_id');
}

onMounted(async () => {
  const instansi_id = getInstansiId();
  if (!instansi_id) return;
  try {
    const res = await fetch(`/api/user?instansi_id=${instansi_id}`);
    const { data } = await res.json();
    // role_id: 5 = AK, 6 = WI, 7 = Bangkom (ganti sesuai skema Anda)
    jumlahAK.value = data.filter(u => u.role_id == 5).length;
    jumlahWI.value = data.filter(u => u.role_id == 6).length;
    jumlahBangkom.value = data.filter(u => u.role_id == 7).length;
  } catch (e) {
    jumlahAK.value = jumlahWI.value = jumlahBangkom.value = 0;
  }
});

definePageMeta({ layout: 'admin' })
</script>

<style scoped>
body {
  font-family: 'Poppins', sans-serif;
}
</style>
