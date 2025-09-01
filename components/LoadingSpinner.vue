<template>
  <img 
    src="/lanri.png" 
    alt="Loading" 
    :class="[
      size === 'sm' ? 'w-4 h-4' : '',
      size === 'md' ? 'w-5 h-5' : '',
      size === 'lg' ? 'w-8 h-8' : '',
      size === 'xl' ? 'w-12 h-12' : '',
      (!size || size === '') ? 'w-60 h-60' : '',
      'object-contain aspect-square',
      customClass
    ]"
    style="aspect-ratio:1/1;object-fit:contain;"
  />
</template>

<script setup>
// Props untuk ukuran dan custom class
const props = defineProps({
  size: {
    type: String,
    default: 'md',
    validator: (value) => ['sm', 'md', 'lg', 'xl'].includes(value)
  },
  customClass: {
    type: String,
    default: ''
  }
})
</script>
