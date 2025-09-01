# Loading System Documentation

## LoadingSpinner Component

Komponen global untuk menampilkan loading indicator menggunakan logo.png dengan efek rotasi.

### Props:
- `size`: String - Ukuran spinner ('sm', 'md', 'lg', 'xl'), default: 'md'
- `customClass`: String - CSS class tambahan, default: ''

### Ukuran Available:
- `sm`: 16x16px (w-4 h-4)
- `md`: 20x20px (w-5 h-5) - default
- `lg`: 32x32px (w-8 h-8)
- `xl`: 48x48px (w-12 h-12)

### Contoh Penggunaan:

```vue
<template>
  <div>
    <!-- Loading kecil untuk button -->
    <LoadingSpinner v-if="loading" size="sm" />
    
    <!-- Loading medium untuk card -->
    <LoadingSpinner v-if="loading" size="md" />
    
    <!-- Loading besar untuk halaman -->
    <LoadingSpinner v-if="loading" size="xl" custom-class="mx-auto" />
    
    <!-- Dengan custom class -->
    <LoadingSpinner size="sm" custom-class="text-white" />
  </div>
</template>
```

## useLoading Composable

Composable untuk mengelola state loading dengan mudah.

### Methods:
- `isLoading`: ReadOnly Ref - Status loading saat ini
- `startLoading()`: Function - Mulai loading
- `stopLoading()`: Function - Stop loading  
- `withLoading(asyncFunction)`: Function - Wrapper untuk async function dengan auto loading

### Contoh Penggunaan:

```vue
<script setup>
const { isLoading, startLoading, stopLoading, withLoading } = useLoading()

// Manual loading control
const handleSubmit = async () => {
  startLoading()
  try {
    await submitData()
  } finally {
    stopLoading()
  }
}

// Auto loading dengan withLoading
const handleSubmitAuto = () => {
  withLoading(async () => {
    await submitData()
  })
}
</script>

<template>
  <button :disabled="isLoading">
    <LoadingSpinner v-if="isLoading" size="sm" />
    Submit
  </button>
</template>
```

## Global Implementation

Semua halaman sudah diupdate untuk menggunakan LoadingSpinner:

1. ✅ `pages/admin/jumlah-ak/index.vue` - Modal tambah data
2. ✅ `pages/admin_uji/home.vue` - Form jadwal dan simpan
3. ✅ `pages/login.vue` - Button login
4. ✅ Komponen tersedia global di seluruh aplikasi

## Best Practices:

1. Gunakan ukuran yang sesuai:
   - `sm` untuk button dan inline elements
   - `md` untuk card dan form
   - `lg` atau `xl` untuk loading halaman penuh

2. Berikan custom class jika perlu styling khusus:
   ```vue
   <LoadingSpinner size="sm" custom-class="text-white" />
   ```

3. Gunakan useLoading composable untuk konsistensi:
   ```vue
   const { isLoading, withLoading } = useLoading()
   ```
