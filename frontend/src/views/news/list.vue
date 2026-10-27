<template>
  <div class="news-list p-4 md:p-6 bg-gray-50">
    <div class="rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden">
      <div class="px-6 py-4 border-b border-gray-100">
        <h2 class="text-base font-bold text-gray-900 mb-4">搜索与筛选</h2>
        <form class="search-grid" @submit.prevent="search">
          <label>标题<el-input v-model="filters.title" placeholder="请输入标题" clearable /></label>
          <label>语言<el-select v-model="filters.language"><el-option label="全部" value="" /><el-option v-for="value in languages" :key="value" :label="value" :value="value" /></el-select></label>
          <label>投放站点<el-select v-model="filters.site"><el-option label="全部" value="" /><el-option v-for="value in sites" :key="value" :label="value" :value="value" /></el-select></label>
          <label>发布时间（开始）<el-date-picker v-model="filters.start" type="date" value-format="YYYY-MM-DD" placeholder="开始日期" /></label>
          <label>发布时间（结束）<el-date-picker v-model="filters.end" type="date" value-format="YYYY-MM-DD" placeholder="结束日期" /></label>
          <label>操作人<el-input v-model="filters.operator" placeholder="请输入操作人" clearable /></label>
          <label>发布状态<el-select v-model="filters.status"><el-option label="全部" value="" /><el-option v-for="(label, value) in STATUS_LABELS" :key="value" :label="label" :value="value" /></el-select></label>
          <div class="search-buttons"><el-button type="primary" native-type="submit">搜索</el-button><el-button @click="reset">重置</el-button></div>
        </form>
      </div>
      <el-alert v-if="error" :title="error" type="error" :closable="false" show-icon />
      <div class="px-6 py-4 border-b border-gray-100 flex flex-wrap gap-3 items-center justify-between">
        <div class="text-sm text-gray-500">当前共 {{ articles.length }} 条动态，筛选结果 {{ filtered.length }} 条。内容仅保存于当前浏览器。</div>
        <div class="flex items-center gap-3"><span class="text-xs text-gray-500">HK / Group</span><el-button type="primary" @click="edit()">新增动态</el-button></div>
      </div>
      <div class="overflow-x-auto">
        <table class="min-w-full text-sm text-left">
          <thead class="bg-gray-50 text-gray-600 border-b border-gray-200"><tr>
            <th>类型</th><th class="title-column">标题</th><th>语言</th><th>投放站点</th><th>官网排序</th><th>显示日期</th><th>首次发布时间</th><th>操作人</th><th>发布状态</th><th class="actions-column">操作</th>
          </tr></thead>
          <tbody class="divide-y divide-gray-100">
            <tr v-for="article in visible" :key="article.id" class="hover:bg-gray-50">
              <td>集团动态</td><td class="title-column font-medium text-gray-800">{{ article.title }}</td><td>{{ article.language }}</td>
              <td><span class="site-badge">{{ article.site }}</span></td><td>{{ article.sort }}</td><td>{{ article.displayDate || '—' }}</td><td>{{ article.publishedAt || '—' }}</td><td>{{ article.operator }}</td>
              <td><el-tag size="small" :type="article.status === 'published' ? 'success' : article.status === 'draft' ? 'info' : 'warning'">{{ STATUS_LABELS[article.status] }}</el-tag></td>
              <td><div class="flex flex-wrap gap-2">
                <button class="action preview" @click="preview(article)">预览</button>
                <button class="action copy" @click="copy(article)">复制</button>
                <button class="action neutral" @click="edit(article)">编辑</button>
                <button v-if="article.status === 'published'" class="action neutral" @click="changeStatus(article, 'offline')">下架</button>
                <button v-else class="action publish" @click="changeStatus(article, 'published')">发布</button>
                <button class="action neutral" @click="remove(article)">删除</button>
              </div></td>
            </tr>
            <tr v-if="!filtered.length"><td colspan="10"><el-empty description="暂无符合条件的集团动态" :image-size="70" /></td></tr>
          </tbody>
        </table>
      </div>
      <div class="px-6 py-4 border-t border-gray-100 flex flex-wrap gap-3 items-center justify-between">
        <span class="text-xs text-gray-500">共 {{ filtered.length }} 条，当前显示 {{ visible.length }} 条</span>
        <el-pagination v-model:current-page="page" :total="filtered.length" :page-size="20" layout="prev, pager, next" />
      </div>
    </div>
    <el-dialog v-model="previewOpen" title="集团动态预览" width="min(1040px, 96vw)" destroy-on-close>
      <div class="preview-toolbar"><span>预览当前已保存内容 · {{ STATUS_LABELS[selected?.status] }}</span><el-radio-group v-model="previewDevice" size="small"><el-radio-button label="desktop">桌面端</el-radio-button><el-radio-button label="mobile">移动端</el-radio-button></el-radio-group></div>
      <NewsArticle v-if="selected" :article="selected" :mobile="previewDevice === 'mobile'" />
      <template #footer><el-button @click="previewOpen = false">关闭</el-button></template>
    </el-dialog>
  </div>
</template>
<script setup>
import { computed, onMounted, onUnmounted, reactive, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ElMessage, ElMessageBox } from 'element-plus'
import NewsArticle from '../../components/news/NewsArticle.vue'
import { groupNewsStore, STATUS_LABELS, cloneNews, NEWS_KEY } from '../../store/groupNewsDemo.js'
const router = useRouter()
const route = useRoute()
const { articles, error } = groupNewsStore
const languages = ['简体中文', '繁体中文', 'English']
const sites = ['HK', 'Group', 'HK + Group']
const defaults = () => ({ title: '', language: '', site: '', start: '', end: '', operator: '', status: '' })
const filters = reactive(defaults())
const applied = ref(defaults())
const page = ref(1)
const previewOpen = ref(false)
const previewDevice = ref('desktop')
const selected = ref(null)
const filtered = computed(() => articles.value.filter(a => {
  const f = applied.value
  const date = a.publishedAt?.slice(0, 10) || ''
  return a.title.toLowerCase().includes(f.title.trim().toLowerCase()) && (!f.language || a.language === f.language) && (!f.site || a.site === f.site) && (!f.status || a.status === f.status) && (a.operator || '').toLowerCase().includes(f.operator.trim().toLowerCase()) && (!f.start || date >= f.start) && (!f.end || (!!date && date <= f.end))
}))
const visible = computed(() => filtered.value.slice((page.value - 1) * 20, page.value * 20))
watch(() => filtered.value.length, count => { page.value = Math.min(page.value, Math.max(1, Math.ceil(count / 20))) })
function search() {
  if (filters.start && filters.end && filters.start > filters.end) return ElMessage.warning('开始日期不能晚于结束日期')
  applied.value = { ...filters }
  page.value = 1
}
function reset() { Object.assign(filters, defaults()); search() }
function edit(article) { router.push({ path: '/news/create-optimized', query: { ...(article ? { id: article.id } : {}), from: route.path } }) }
function preview(article) { selected.value = cloneNews(article); previewDevice.value = 'desktop'; previewOpen.value = true }
function feedback(result, text) { result.ok ? ElMessage.success(text) : ElMessage.error(result.error) }
function copy(article) { feedback(groupNewsStore.copy(article.id), '已复制为新草稿') }
async function changeStatus(article, status) {
  try { await ElMessageBox.confirm(`确认${status === 'published' ? '发布' : '下架'}「${article.title}」？本操作仅更新本地演示数据。`, '集团动态', { confirmButtonText: '确认', cancelButtonText: '取消' }) } catch { return }
  feedback(groupNewsStore.setStatus(article.id, status), status === 'published' ? '已发布' : '已下架')
}
async function remove(article) {
  try { await ElMessageBox.confirm(`确认删除「${article.title}」？删除后无法在列表中恢复。`, '删除动态', { type: 'warning', confirmButtonText: '删除', cancelButtonText: '取消' }) } catch { return }
  feedback(groupNewsStore.remove(article.id), '已删除')
}
function sync(event) { if (!event.key || event.key === NEWS_KEY) groupNewsStore.refresh() }
onMounted(() => { groupNewsStore.refresh(); window.addEventListener('storage', sync) })
onUnmounted(() => window.removeEventListener('storage', sync))
</script>
<style scoped>
.search-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(170px, 1fr)); gap: 14px; align-items: end; }
.search-grid label { display: grid; gap: 7px; font-size: 12px; color: #6b7280; }
.search-grid :deep(.el-date-editor), .search-grid :deep(.el-select) { width: 100%; }
.search-buttons { display: flex; }
th, td { padding: 14px 16px; vertical-align: middle; white-space: nowrap; }
th { font-weight: 500; }
td { color: #4b5563; }
.title-column { min-width: 240px; max-width: 340px; white-space: normal; overflow-wrap: anywhere; }
.actions-column { min-width: 240px; }
.action { padding: 6px 12px; border-radius: 8px; border: 1px solid #e5e7eb; font-size: 12px; line-height: 16px; }
.action:hover { filter: brightness(.97); }
.preview { background: #fffbeb; color: #b45309; border-color: #fef3c7; }
.copy { background: #faf5ff; color: #7e22ce; border-color: #f3e8ff; }
.neutral { background: #f3f4f6; color: #374151; }
.publish { background: #ecfdf5; color: #047857; border-color: #d1fae5; }
.site-badge { background: #eff6ff; color: #1d4ed8; border: 1px solid #dbeafe; border-radius: 20px; padding: 3px 8px; font-size: 12px; }
.preview-toolbar { display: flex; justify-content: space-between; gap: 10px; flex-wrap: wrap; padding-bottom: 16px; color: #6b7280; font-size: 12px; }
</style>
