<template>
  <div :class="['grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch', itemIndex % 2 === 1 ? 'md:grid-cols-2 md:flex-row-reverse' : '']">
    <!-- Video Side -->
    <div class="flex-1 w-full flex items-center justify-center">
      <div :class="`relative bg-gradient-to-br ${item.bgColor} p-0 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 group w-full max-w-xl`">
        <div v-if="activeVideo === item.videoId" class="aspect-video rounded-xl overflow-hidden shadow-lg">
          <iframe
            width="100%"
            height="100%"
            :src="`https://www.youtube.com/embed/${item.videoId}?autoplay=1&rel=0`"
            :title="item.title"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
            class="w-full h-full"
          ></iframe>
        </div>
        <div v-else class="aspect-video rounded-xl overflow-hidden shadow-lg cursor-pointer relative group-hover:scale-105 transition-transform duration-300" @click="$emit('toggleVideo', item.videoId)">
          <img :src="`https://img.youtube.com/vi/${item.videoId}/maxresdefault.jpg`" :alt="item.title" class="object-cover w-full h-full" />
          <div class="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center group-hover:bg-opacity-30 transition-all duration-300">
            <div class="w-20 h-20 bg-gradient-to-r from-red-600 to-red-700 rounded-full flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-300">
              <span class="text-white text-3xl ml-1">▶️</span>
            </div>
          </div>
        </div>
        <div class="absolute top-4 left-4 bg-white/80 px-3 py-1 rounded-full text-xs font-bold text-gray-700 shadow">{{ item.category }}</div>
        <div class="absolute bottom-4 right-4 bg-white/80 px-3 py-1 rounded-full text-xs font-bold text-gray-700 shadow">{{ item.date }}</div>
      </div>
    </div>
    <!-- Content Side -->
    <div class="flex-1 space-y-6 flex flex-col justify-center">
      <div :class="`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r ${item.color} text-white text-sm font-medium shadow-lg self-start`">
        <span class="text-lg">{{ item.icon }}</span>
        {{ item.category }}
      </div>
      <div>
        <h2 class="text-4xl font-bold text-gray-900 mb-2">{{ item.title }}</h2>
        <h3 class="text-xl text-gray-600 font-medium mb-4">{{ item.subtitle }}</h3>
        <p class="text-gray-600 text-lg leading-relaxed">{{ item.description }}</p>
      </div>
      <div class="flex items-center gap-4">
        <button
          @click="$emit('toggleVideo', item.videoId)"
          :class="['inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105 shadow-lg',
            activeVideo === item.videoId
              ? 'bg-gradient-to-r from-red-600 to-red-700 text-white'
              : `bg-gradient-to-r ${item.color} text-white hover:shadow-xl`
          ]"
        >
          <span class="text-lg">▶️</span>
          {{ activeVideo === item.videoId ? 'Tutup Video' : 'Tonton Video' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  item: Object,
  activeVideo: String,
  itemIndex: Number
})
</script>
