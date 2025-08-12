<template>
  <div class="flex min-h-screen m-0 p-0 overflow-hidden font-sans">
    <!-- Left Panel - Login Form -->
    <div class="w-full md:w-1/2 xl:w-2/5 relative bg-gray-50 flex flex-col justify-center items-center p-8 overflow-hidden">
      <div class="absolute inset-0 bg-white"></div>
      <div class="relative z-10 w-full max-w-md">
        <!-- Logo and Title Section -->
        <div class="flex flex-col items-center mb-8 text-center">
          <div class="relative group mb-6">
            <div class="relative w-28 h-28">
              <img src="/lanri.png" alt="Logo LANRI" class="w-full h-full object-contain aspect-square rounded-lg shadow-sm hover:scale-105 transition-all duration-300 border border-gray-200 bg-white" />
            </div>
          </div>
          <div class="mb-4">
            <h1 class="text-5xl md:text-6xl xl:text-7xl font-black mb-2 text-blue-600 relative">MANDALA</h1>
            <div class="h-1 w-32 bg-blue-600 rounded-full mx-auto"></div>
          </div>
          <p class="text-gray-600 text-lg font-medium leading-relaxed">
            Sistem Informasi Jabatan<br />
            <span class="text-blue-600 font-semibold">Fungsional Online</span>
          </p>
        </div>
        <!-- Login Form -->
        <div class="relative">
          <form @submit.prevent="handleLogin" class="relative bg-white rounded-lg p-8 shadow-sm border border-gray-200 space-y-6">
            <div class="text-center mb-6">
              <h2 class="text-2xl font-bold text-gray-900 mb-2">Selamat Datang! 👋</h2>
              <p class="text-gray-600">Silakan masuk ke akun Anda</p>
            </div>
            <div v-if="errorMessage" class="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
              <div class="flex items-center gap-2">
                <div class="w-2 h-2 bg-red-500 rounded-full"></div>
                {{ errorMessage }}
              </div>
            </div>
            <div class="space-y-2">
              <label class="text-sm font-semibold text-gray-700">Username</label>
              <div class="relative group">
                <span class="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5">👤</span>
                <input v-model="username" class="w-full py-4 pl-12 pr-4 bg-white border border-gray-300 rounded-lg text-gray-700 font-medium placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-gray-400 transition-all duration-300" id="username" type="text" placeholder="Masukkan username Anda" required />
              </div>
            </div>
            <div class="space-y-2">
              <label class="text-sm font-semibold text-gray-700">Password</label>
              <div class="relative group">
                <span class="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5">🔒</span>
                <input v-model="password" class="w-full py-4 pl-12 pr-12 bg-white border border-gray-300 rounded-lg text-gray-700 font-medium placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-gray-400 transition-all duration-300" id="password" :type="showPassword ? 'text' : 'password'" placeholder="Masukkan password Anda" required />
                <button type="button" class="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-blue-500 transition-colors" @click="showPassword = !showPassword">
                  <span v-if="showPassword">🙈</span>
                  <span v-else>👁️</span>
                </button>
              </div>
            </div>
            <div class="flex items-center justify-between">
              <label class="flex items-center cursor-pointer group">
                <input type="checkbox" class="w-4 h-4 text-blue-600 bg-white border-2 border-gray-300 rounded focus:ring-blue-500 focus:ring-2" v-model="rememberMe" />
                <span class="ml-3 text-sm text-gray-700 group-hover:text-blue-600 transition-colors">Ingat saya</span>
              </label>
              <NuxtLink to="#" class="text-sm text-blue-600 hover:text-blue-800 hover:underline transition-colors">Lupa password?</NuxtLink>
            </div>
            <button :class="['w-full py-4 px-6 rounded-lg font-bold text-lg shadow-sm transition-all duration-300 flex items-center justify-center gap-3 group relative overflow-hidden', isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 hover:shadow-md', 'text-white']" type="submit" :disabled="isLoading">
              <span v-if="isLoading">
                <span class="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin inline-block"></span>
                Memproses...
              </span>
              <span v-else>
                Masuk <span class="ml-2">→</span>
              </span>
            </button>
            <div class="text-center pt-4">
              <p class="text-sm text-gray-500">
                Belum punya akun?
                <NuxtLink to="#" class="text-blue-600 hover:text-blue-800 hover:underline ml-1 font-semibold">Hubungi Administrator</NuxtLink>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
    <!-- Right Panel - Image Slider (hidden on mobile) -->
    <div class="hidden md:block w-1/2 xl:w-3/5 relative bg-blue-600 items-center justify-center overflow-hidden">
      <div class="relative w-full h-full">
        <div v-for="(slide, index) in slides" :key="index" :class="['absolute inset-0 transition-all duration-1000 ease-in-out', index === currentSlide ? 'opacity-100 scale-100 z-10' : 'opacity-0 scale-105 z-0']">
          <img :src="slide.image" :alt="slide.title" class="object-cover w-full h-full transform transition-transform duration-1000" />
          <div class="absolute inset-0 bg-gradient-to-br from-blue-900/70 via-blue-800/50 to-indigo-900/70"></div>
          <div class="absolute inset-0 opacity-10">
            <div class="absolute top-1/4 left-1/4 w-2 h-2 bg-white rounded-full animate-pulse"></div>
            <div class="absolute top-1/3 right-1/3 w-1 h-1 bg-white rounded-full animate-pulse delay-700"></div>
            <div class="absolute bottom-1/4 left-1/3 w-1.5 h-1.5 bg-white rounded-full animate-pulse delay-1000"></div>
            <div class="absolute bottom-1/3 right-1/4 w-1 h-1 bg-white rounded-full animate-pulse delay-300"></div>
          </div>
          <div class="absolute inset-0 flex flex-col justify-center items-center text-center p-12">
            <div :class="['max-w-lg transform transition-all duration-1000 delay-300', index === currentSlide ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0']">
              <h2 class="text-4xl xl:text-5xl font-bold text-white mb-4 drop-shadow-lg">{{ slide.title }}</h2>
              <p class="text-xl text-white/90 mb-6 drop-shadow-md">{{ slide.subtitle }}</p>
              <p class="text-white/80 text-lg leading-relaxed drop-shadow-sm">{{ slide.description }}</p>
            </div>
          </div>
        </div>
        <button @click="prevSlide" class="absolute left-6 top-1/2 transform -translate-y-1/2 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full p-3 transition-all duration-300 group">
          <span class="w-6 h-6 text-white group-hover:scale-110 transition-transform">←</span>
        </button>
        <button @click="nextSlide" class="absolute right-6 top-1/2 transform -translate-y-1/2 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full p-3 transition-all duration-300 group">
          <span class="w-6 h-6 text-white group-hover:scale-110 transition-transform">→</span>
        </button>
        <div class="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3">
          <button v-for="(_, index) in slides" :key="index" @click="setCurrentSlide(index)" :class="['w-3 h-3 rounded-full transition-all duration-300', index === currentSlide ? 'bg-white scale-110' : 'bg-white/40 hover:bg-white/60']"></button>
        </div>
        <div class="absolute bottom-0 left-0 w-full h-1 bg-black/20">
          <div class="h-full bg-gradient-to-r from-white via-blue-200 to-white transition-all duration-300 ease-linear relative overflow-hidden" :style="{ width: ((currentSlide + 1) / slides.length * 100) + '%' }">
            <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';

const username = ref('');
const password = ref('');
const errorMessage = ref('');
const showPassword = ref(false);
const rememberMe = ref(false);
const isLoading = ref(false);

const currentSlide = ref(0);
const slides = [
  {
    image: '/LAN_9694.JPG',
    title: 'Gedung LANRI',
    subtitle: 'Lembaga Administrasi Negara Republik Indonesia',
    description: 'Pusat pengembangan aparatur sipil negara yang profesional dan berintegritas'
  },
  {
    image: '/LAN_9802.JPG',
    title: 'Fasilitas Modern',
    subtitle: 'Infrastruktur pendidikan dan pelatihan terdepan',
    description: 'Dilengkapi teknologi canggih untuk pembelajaran yang efektif'
  },
  {
    image: '/LAN_9736.JPG',
    title: 'Lingkungan Akademis',
    subtitle: 'Suasana kondusif untuk pengembangan kompetensi',
    description: 'Menciptakan lingkungan belajar yang inspiratif dan inovatif'
  }
];

let timer = null;
onMounted(() => {
  timer = setInterval(() => {
    currentSlide.value = (currentSlide.value + 1) % slides.length;
  }, 5000);
});
onUnmounted(() => {
  clearInterval(timer);
});

function nextSlide() {
  currentSlide.value = (currentSlide.value + 1) % slides.length;
}
function prevSlide() {
  currentSlide.value = (currentSlide.value - 1 + slides.length) % slides.length;
}
function setCurrentSlide(idx) {
  currentSlide.value = idx;
}

const router = useRouter();
async function handleLogin() {
  if (!username.value || !password.value) {
    errorMessage.value = 'Username dan password harus diisi';
    return;
  }
  isLoading.value = true;
  errorMessage.value = '';
  try {
    // Ganti URL di bawah ini dengan endpoint login API Anda
    const response = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: username.value, password: password.value })
    });
    if (!response.ok) {
      throw new Error('Login gagal');
    }
    const user = await response.json();
    if (user.role_id === 1) {
      router.push('/admin/home');
    } else if (user.role_id === 2) {
      router.push('/user/home');
    } else if (user.role_id === 3) {
      router.push('/admin_uji/home');
    } else {
      errorMessage.value = 'Peran tidak dikenali';
    }
  } catch (err) {
    errorMessage.value = 'Terjadi kesalahan. Silakan coba lagi.';
  } finally {
    isLoading.value = false;
  }
}
</script>

<script>
definePageMeta({ layout: false })
</script>

<style scoped>
.animate-spin {
  animation: spin 1s linear infinite;
}
@keyframes spin {
  to { transform: rotate(360deg); }
}
</style>
