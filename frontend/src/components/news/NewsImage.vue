<template>
  <figure class="news-image" :class="{ framed }">
    <img v-if="url && !failed" :src="url" :alt="caption || '文章图片'" referrerpolicy="no-referrer" @error="failed = true">
    <div v-else class="image-fallback" role="img" :aria-label="url ? '图片暂时无法加载' : '尚未设置图片'">{{ url ? '图片暂时无法加载' : '尚未设置图片' }}</div>
    <figcaption v-if="caption">{{ caption }}</figcaption>
  </figure>
</template>
<script setup>
import { computed, ref, watch } from 'vue'
import { safeUrl } from '../../utils/groupNewsContent.js'
const props = defineProps({ src: String, caption: String, framed: Boolean })
const url = computed(() => safeUrl(props.src, true))
const failed = ref(false)
watch(url, () => { failed.value = false })
</script>
<style scoped>
.news-image { min-width: 0; margin: 0; }
img { display: block; width: auto; max-width: 100%; height: auto; margin: auto; }
.image-fallback { display: grid; place-items: center; background: #f3f4f6; min-height: 100px; color: #6b7280; font-size: 13px; border-radius: 6px; }
.framed img, .framed .image-fallback { width: 100%; aspect-ratio: 16 / 9; object-fit: contain; background: #f3f4f6; }
figcaption { text-align: center; font-size: 13px; line-height: 1.6; margin-top: 8px; color: #6b7280; overflow-wrap: anywhere; }
</style>
