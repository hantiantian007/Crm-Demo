<template>
  <div class="article-container" :class="{ mobile }">
    <article class="news-article">
      <h1>{{ article.title || '未填写文章标题' }}</h1>
      <p class="article-date">{{ article.displayDate || article.publishedAt || '未设置显示日期' }}</p>
      <p v-if="article.summary" class="summary">{{ article.summary }}</p>
      <NewsImage v-if="article.cover" :src="article.cover" caption="" class="cover" />
      <section v-for="module in renderedModules" :key="module.id" class="article-module">
        <div v-if="module.type === 'rich'" class="news-content" v-html="module.html" @error.capture="inlineImageError"></div>
        <NewsImage v-else-if="module.type === 'image'" :src="module.image" :caption="module.caption" />
        <div v-else-if="module.type === 'image-text'" class="article-columns">
          <NewsImage :src="module.image" :caption="module.caption" />
          <div class="news-content" v-html="module.html" @error.capture="inlineImageError"></div>
        </div>
        <div v-else-if="module.type === 'double'" class="article-columns">
          <NewsImage v-for="(image, index) in module.images" :key="index" :src="image.src" :caption="image.caption" />
        </div>
        <div v-else-if="module.type === 'carousel'" class="carousel" aria-label="文章图片轮播">
          <NewsImage :key="slide(module)" :src="module.images[slide(module)]?.src" :caption="module.images[slide(module)]?.caption" framed />
          <div v-if="module.images.length > 1" class="carousel-controls">
            <button type="button" aria-label="上一张图片" @click="step(module, -1)">‹ 上一张</button>
            <span>{{ slide(module) + 1 }} / {{ module.images.length }}</span>
            <button type="button" aria-label="下一张图片" @click="step(module, 1)">下一张 ›</button>
          </div>
        </div>
      </section>
      <p v-if="!article.modules?.length" class="empty">添加正文或图片模块后可在这里预览</p>
    </article>
  </div>
</template>
<script setup>
import { computed, reactive, watch } from 'vue'
import NewsImage from './NewsImage.vue'
import { sanitizeRichText } from '../../utils/groupNewsContent.js'
import '../../assets/group-news-content.css'
const props = defineProps({ article: { type: Object, required: true }, mobile: Boolean })
const positions = reactive({})
watch(() => props.article.id, () => { Object.keys(positions).forEach(key => delete positions[key]) })
const renderedModules = computed(() => (props.article.modules || []).map(module => ({ ...module, html: sanitizeRichText(module.html), images: module.images || [] })))
const slide = module => Math.min(positions[module.id] || 0, Math.max(0, module.images.length - 1))
function step(module, delta) { positions[module.id] = (slide(module) + delta + module.images.length) % module.images.length }
function inlineImageError(event) {
  if (event.target.tagName !== 'IMG') return
  event.target.removeAttribute('src')
  event.target.alt = '图片暂时无法加载'
}
</script>
<style scoped>
.article-container { container-type: inline-size; width: 100%; min-width: 0; background: white; }
.article-container.mobile { max-width: 375px; margin: 0 auto; }
.news-article { padding: 28px; max-width: 960px; margin: auto; font-family: Arial, "PingFang SC", "Microsoft YaHei", sans-serif; overflow-wrap: anywhere; }
h1 { margin: 0 0 12px; font-size: 28px; font-weight: 600; line-height: 1.45; color: #1f2937; }
.article-date { color: #6b7280; font-size: 13px; margin-bottom: 20px; }
.summary { color: #4b5563; font-size: 16px; line-height: 1.8; margin-bottom: 24px; white-space: pre-wrap; }
.cover { margin-bottom: 24px; }
.article-module + .article-module { margin-top: 24px; }
.article-columns { display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 1fr); align-items: start; gap: 20px; }
.carousel-controls { display: flex; justify-content: center; align-items: center; gap: 20px; margin-top: 10px; font-size: 13px; color: #6b7280; }
.carousel-controls button { padding: 5px 8px; color: #8c6b45; }
.empty { color: #9ca3af; font-size: 14px; }
@container (max-width: 480px) {
  .news-article { padding: 18px; }
  h1 { font-size: 23px; }
  .article-columns { grid-template-columns: minmax(0, 1fr); gap: 16px; }
}
</style>
