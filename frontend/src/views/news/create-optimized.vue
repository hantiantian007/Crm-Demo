<template>
  <div class="news-editor p-4 md:p-6 bg-gray-50">
    <div class="page-actions">
      <h2>{{ route.query.id ? '编辑集团动态' : '新增集团动态' }}</h2>
      <div class="flex flex-wrap gap-2"><el-button @click="back">返回列表</el-button><el-button :disabled="!article" @click="save('draft')">保存草稿</el-button><el-button :disabled="!article" @click="save(article.status)">保存并返回</el-button><el-button type="primary" :disabled="!article" @click="save('published')">发布</el-button></div>
    </div>
    <el-alert v-if="loadError" :title="loadError" type="error" show-icon :closable="false" />
    <div v-if="article" class="editor-grid">
      <div class="space-y-5 min-w-0">
        <section class="section-card">
          <h3>1. 基础信息</h3>
          <el-form label-position="top" class="section-body basic-grid" @submit.prevent>
            <el-form-item label="类型"><el-input model-value="集团动态" disabled /></el-form-item>
            <el-form-item label="发布状态"><el-select v-model="article.status"><el-option v-for="(label, value) in STATUS_LABELS" :key="value" :label="label" :value="value" /></el-select></el-form-item>
            <el-form-item label="文章标题" required class="full-width"><el-input v-model="article.title" maxlength="200" show-word-limit placeholder="请输入文章标题" /></el-form-item>
            <el-form-item label="语言版本"><el-select v-model="article.language"><el-option v-for="value in languages" :key="value" :label="value" :value="value" /></el-select></el-form-item>
            <el-form-item label="投放站点"><el-select v-model="article.site"><el-option v-for="value in sites" :key="value" :label="value" :value="value" /></el-select></el-form-item>
            <el-form-item label="官网排序"><el-input-number v-model="article.sort" :min="0" :max="99999" :precision="0" /></el-form-item>
            <el-form-item label="显示日期"><el-date-picker v-model="article.displayDate" type="date" value-format="YYYY-MM-DD" placeholder="选择日期" /></el-form-item>
            <div class="full-width text-xs text-gray-500">首次发布时间：{{ article.publishedAt || '发布时自动记录' }} · 状态和内容在保存后生效，仅用于本地演示。</div>
          </el-form>
        </section>
        <section class="section-card">
          <h3>2. 封面与摘要</h3>
          <el-form label-position="top" class="section-body" @submit.prevent>
            <el-form-item label="封面图片"><NewsImageInput v-model="article.cover" label="封面图片地址" /></el-form-item>
            <el-form-item label="文章摘要"><el-input v-model="article.summary" type="textarea" :rows="3" maxlength="1000" show-word-limit placeholder="输入文章摘要，用于官网首屏展示" /></el-form-item>
          </el-form>
        </section>
        <section class="section-card">
          <div class="section-heading"><h3>3. 正文与内容模块</h3><el-button type="primary" plain @click="isModuleModalOpen = true">新增模块</el-button></div>
          <div class="section-body">
            <p class="text-xs text-gray-500 mb-4">当前 {{ article.modules.length }} 个模块。编辑内容与顺序，右侧同步预览；粘贴内容自动清除字体、颜色和固定尺寸。</p>
            <div v-for="(module, index) in article.modules" :key="module.id" class="module-editor">
              <div class="module-heading">
                <strong>{{ index + 1 }}. {{ MODULE_LABELS[module.type] }}模块</strong>
                <div class="flex gap-2"><el-button size="small" :disabled="index === 0" @click="moveModule(index, -1)">上移</el-button><el-button size="small" :disabled="index === article.modules.length - 1" @click="moveModule(index, 1)">下移</el-button><el-button size="small" type="danger" plain @click="removeModule(index)">删除</el-button></div>
              </div>
              <div class="module-fields">
                <template v-if="module.type === 'image' || module.type === 'image-text'">
                  <label>图片<NewsImageInput v-model="module.image" /></label>
                  <label>图片说明<el-input v-model="module.caption" maxlength="300" placeholder="可选，显示在图片下方" /></label>
                </template>
                <NewsRichText v-if="module.type === 'rich' || module.type === 'image-text'" v-model="module.html" :label="`${index + 1}. ${MODULE_LABELS[module.type]}内容`" />
                <template v-if="module.type === 'double' || module.type === 'carousel'">
                  <div v-for="(image, imageIndex) in module.images" :key="`${module.id}-${imageIndex}`" class="image-fields">
                    <div class="flex items-center justify-between"><span>图片 {{ imageIndex + 1 }}</span><el-button v-if="module.type === 'carousel'" link type="danger" @click="module.images.splice(imageIndex, 1)">移除图片</el-button></div>
                    <NewsImageInput v-model="image.src" :label="`图片 ${imageIndex + 1} 地址`" />
                    <el-input v-model="image.caption" maxlength="300" placeholder="图片说明（可选）" :aria-label="`图片 ${imageIndex + 1} 说明`" />
                  </div>
                  <el-button v-if="module.type === 'carousel'" @click="module.images.push({ src: '', caption: '' })">添加轮播图片</el-button>
                  <p class="text-xs text-gray-500">{{ module.type === 'double' ? '桌面端并排，窄屏自动纵向排列。' : '统一 16:9 图片容器，预览支持上一张 / 下一张切换。' }}</p>
                </template>
              </div>
            </div>
            <el-empty v-if="!article.modules.length" description="点击新增模块，添加正文或图片" :image-size="60" />
          </div>
        </section>
      </div>
      <aside class="section-card preview-panel">
        <div class="section-heading"><h3>官网效果预览</h3><el-radio-group v-model="deviceMode" size="small"><el-radio-button label="desktop">桌面端</el-radio-button><el-radio-button label="mobile">移动端</el-radio-button></el-radio-group></div>
        <p class="preview-note">{{ STATUS_LABELS[article.status] }} · 当前编辑内容实时预览，未保存内容不会出现在列表中。</p>
        <NewsArticle :article="article" :mobile="deviceMode === 'mobile'" />
      </aside>
    </div>
    <el-dialog v-model="isModuleModalOpen" title="新增内容模块" width="min(480px, 94vw)">
      <div class="module-options"><el-button v-for="(label, type) in MODULE_LABELS" :key="type" @click="addModule(type)">{{ label }}模块</el-button></div>
      <template #footer><el-button @click="isModuleModalOpen = false">取消</el-button></template>
    </el-dialog>
  </div>
</template>
<script setup>
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'
import { onBeforeRouteLeave, onBeforeRouteUpdate, useRoute, useRouter } from 'vue-router'
import { ElMessage, ElMessageBox } from 'element-plus'
import NewsArticle from '../../components/news/NewsArticle.vue'
import NewsImageInput from '../../components/news/NewsImageInput.vue'
import NewsRichText from '../../components/news/NewsRichText.vue'
import { groupNewsStore, newArticle, newModule, cloneNews, MODULE_LABELS, STATUS_LABELS } from '../../store/groupNewsDemo.js'
import { safeUrl } from '../../utils/groupNewsContent.js'
const route = useRoute()
const router = useRouter()
const article = ref(null)
const loadError = ref('')
const baseline = ref('')
const deviceMode = ref('desktop')
const isModuleModalOpen = ref(false)
const languages = ['简体中文', '繁体中文', 'English']
const sites = ['HK', 'Group', 'HK + Group']
const dirty = computed(() => article.value && JSON.stringify(article.value) !== baseline.value)
function load() {
  article.value = null
  loadError.value = ''
  if (!groupNewsStore.refresh()) { loadError.value = groupNewsStore.error.value; return }
  const id = route.query.id
  const found = id ? groupNewsStore.articles.value.find(a => a.id === id) : newArticle()
  if (!found) { loadError.value = '该动态不存在或已删除，请返回列表重新选择。'; return }
  article.value = cloneNews(found)
  baseline.value = JSON.stringify(article.value)
}
watch(() => route.query.id, load, { immediate: true })
function addModule(type) { article.value.modules.push(newModule(type)); isModuleModalOpen.value = false }
function moveModule(index, delta) {
  const nextIndex = index + delta
  if (nextIndex < 0 || nextIndex >= article.value.modules.length) return
  const modules = [...article.value.modules]
  const [picked] = modules.splice(index, 1)
  modules.splice(nextIndex, 0, picked)
  article.value.modules = modules
}
async function removeModule(index) {
  try { await ElMessageBox.confirm('确认删除此模块及其内容？保存前仍可返回列表放弃修改。', '删除模块', { confirmButtonText: '删除', cancelButtonText: '取消', type: 'warning' }) } catch { return }
  article.value.modules.splice(index, 1)
}
function back() { router.push(route.query.from === '/news/list' ? '/news/list' : '/news/group') }
function save(status) {
  if (!article.value) return
  const urls = [article.value.cover, ...article.value.modules.flatMap(m => [m.image, ...(m.images || []).map(i => i.src)])]
  if (urls.some(url => url?.trim() && !safeUrl(url, true))) return ElMessage.warning('存在无效图片地址，请更正或清空后保存')
  const result = groupNewsStore.save(article.value, status, { isNew: !route.query.id })
  if (!result.ok) return ElMessage.error(result.error)
  article.value = result.record
  baseline.value = JSON.stringify(article.value)
  ElMessage.success(status === 'published' ? '已发布并保存到本地' : '已保存到本地')
  back()
}
async function confirmLeave() {
  if (!dirty.value) return true
  try { await ElMessageBox.confirm('有未保存的内容，离开将放弃本次修改。是否继续？', '未保存的修改', { confirmButtonText: '放弃并离开', cancelButtonText: '继续编辑', type: 'warning' }); return true } catch { return false }
}
onBeforeRouteLeave(confirmLeave)
onBeforeRouteUpdate((to, from) => to.query.id === from.query.id || confirmLeave())
function beforeUnload(event) { if (dirty.value) { event.preventDefault(); event.returnValue = '' } }
onMounted(() => window.addEventListener('beforeunload', beforeUnload))
onUnmounted(() => window.removeEventListener('beforeunload', beforeUnload))
</script>
<style scoped>
.page-actions { display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 12px; margin-bottom: 20px; }
.page-actions h2 { font-size: 18px; font-weight: 600; }
.editor-grid { display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 1fr); gap: 24px; align-items: start; }
.section-card { border: 1px solid #e5e7eb; border-radius: 16px; background: white; overflow: hidden; box-shadow: 0 1px 2px rgb(0 0 0 / 3%); min-width: 0; }
.section-card > h3, .section-heading { padding: 16px 20px; border-bottom: 1px solid #f3f4f6; }
h3 { font-size: 15px; font-weight: 600; }
.section-heading { display: flex; align-items: center; justify-content: space-between; gap: 10px; flex-wrap: wrap; }
.section-body { padding: 20px; }
.basic-grid { display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 1fr); column-gap: 18px; }
.full-width { grid-column: 1 / -1; }
.basic-grid :deep(.el-select), .basic-grid :deep(.el-date-editor), .basic-grid :deep(.el-input-number) { width: 100%; }
.module-editor { border: 1px solid #e5e7eb; border-radius: 12px; margin-bottom: 16px; overflow: hidden; }
.module-heading { display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 10px; padding: 12px; background: #f9fafb; }
.module-heading strong { font-size: 13px; }
.module-heading :deep(.el-button + .el-button), .page-actions :deep(.el-button + .el-button) { margin-left: 0; }
.module-fields, .image-fields, .module-fields > label { display: grid; gap: 10px; min-width: 0; }
.module-fields { padding: 14px; font-size: 13px; }
.image-fields { padding-bottom: 12px; border-bottom: 1px solid #f3f4f6; }
.module-options { display: grid; gap: 10px; }
.module-options :deep(.el-button) { margin: 0; }
.preview-note { padding: 12px 20px; color: #6b7280; font-size: 12px; background: #fafafa; }
@media (max-width: 1100px) { .editor-grid { grid-template-columns: minmax(0, 1fr); } }
@media (max-width: 600px) { .basic-grid { grid-template-columns: minmax(0, 1fr); } .section-body { padding: 14px; } }
</style>
