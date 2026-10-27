import { ref } from 'vue'
import { sanitizeRichText, safeUrl } from '../utils/groupNewsContent.js'

export const NEWS_KEY = 'crm-group-news-demo-v1'
export const STATUS_LABELS = { draft: '草稿', published: '已发布', offline: '已下架' }
export const MODULE_LABELS = { rich: '富文本', image: '单图', 'image-text': '图文', double: '双图', carousel: '轮播' }
export const cloneNews = value => JSON.parse(JSON.stringify(value))
export const newId = () => globalThis.crypto?.randomUUID?.() || `news-${Date.now()}-${Math.random().toString(36).slice(2)}`
export const dateTime = (date = new Date()) => {
  const pad = n => String(n).padStart(2, '0')
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())} ${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`
}
export function newModule(type = 'rich') {
  return { id: newId(), type, html: '', image: '', caption: '', images: type === 'double' ? [{ src: '', caption: '' }, { src: '', caption: '' }] : type === 'carousel' ? [{ src: '', caption: '' }] : [] }
}
export function newArticle() {
  return { id: newId(), title: '', summary: '', cover: '', language: '简体中文', site: 'Group', sort: 10, displayDate: dateTime().slice(0, 10), status: 'draft', publishedAt: '', updatedAt: '', operator: '演示管理员', modules: [newModule()] }
}
export function seedArticles() {
  const title = '光明同行，守护未来丨 HATC 华安泰昌走进辽宁省光明学校开展公益助学行动'
  return [
    { id: 'group-news-1', title, site: 'Group', status: 'offline', publishedAt: '2026-07-20 17:59:38' },
    { id: 'group-news-2', title, site: 'HK', status: 'published', publishedAt: '2026-07-20 17:59:41' },
    { id: 'group-news-3', title: 'Lighting the Way, Guarding the Future...', site: 'HK + Group', language: 'English', sort: 9, status: 'published', publishedAt: '2026-07-20 17:59:39' },
    { id: 'group-news-4', title: 'HATC 慈善公益专题页内容同步稿...', site: 'Group', sort: 7, status: 'draft', displayDate: '2026-06-04', operator: 'winnie tang' }
  ].map(row => ({ ...newArticle(), displayDate: '2026-07-10', operator: '史宏丽', summary: '记录集团公益行动，分享活动成果与现场故事。', modules: [{ ...newModule(), html: '<h2>光明同行，守护未来</h2><p>HATC 华安泰昌走进辽宁省光明学校，开展公益助学行动。</p><p>我们持续关注教育与社会责任，用实际行动传递关爱。</p>' }], ...row }))
}

// Storage injection keeps persistence/failure handling testable without a browser.
export function createNewsStore({ storage = () => window.localStorage, sanitize = sanitizeRichText, now = dateTime } = {}) {
  const articles = ref([])
  const error = ref('')
  function refresh() {
    try {
      const raw = storage().getItem(NEWS_KEY)
      const parsed = raw === null ? seedArticles() : JSON.parse(raw)
      if (!Array.isArray(parsed) || parsed.some(a => !a || typeof a.id !== 'string' || typeof a.title !== 'string' || !Array.isArray(a.modules) || !STATUS_LABELS[a.status] || a.modules.some(m => !m || !m.id || !MODULE_LABELS[m.type] || typeof m.html !== 'string' || !Array.isArray(m.images) || m.images.some(i => !i || typeof i.src !== 'string')) || new Set(a.modules.map(m => m.id)).size !== a.modules.length) || new Set(parsed.map(a => a.id)).size !== parsed.length) throw new Error('invalid')
      articles.value = parsed
      error.value = ''
      return true
    } catch {
      error.value = '无法读取本地集团动态数据，请检查浏览器存储权限或已有数据。未覆盖原数据。'
      return false
    }
  }
  function commit(next) {
    try {
      storage().setItem(NEWS_KEY, JSON.stringify(next))
      articles.value = next
      error.value = ''
      return { ok: true }
    } catch {
      return { ok: false, error: '保存失败：本地存储不可用或空间不足。请减少图片大小后重试，当前编辑内容仍保留。' }
    }
  }
  function save(article, status = article.status, { isNew = false } = {}) {
    if (!refresh()) return { ok: false, error: error.value }
    if (!article.title?.trim()) return { ok: false, error: '请输入文章标题' }
    if (!STATUS_LABELS[status]) return { ok: false, error: '发布状态无效' }
    const existing = articles.value.find(a => a.id === article.id)
    if (!isNew && !existing) return { ok: false, error: '该动态已不存在，请返回列表确认' }
    if (isNew && existing) return { ok: false, error: '动态编号已存在，请重新打开新增页面' }
    if (existing && (existing.updatedAt !== article.updatedAt || (existing.revision || 0) !== (article.revision || 0))) return { ok: false, error: '该动态已在其他窗口更新，请返回列表重新加载后编辑' }
    const record = cloneNews(article)
    record.title = record.title.trim()
    record.summary = String(record.summary || '').trim()
    record.cover = safeUrl(record.cover, true)
    record.modules = record.modules.filter(m => MODULE_LABELS[m.type]).map(m => ({ ...m, html: sanitize(m.html), image: safeUrl(m.image, true), images: (m.images || []).map(i => ({ src: safeUrl(i.src, true), caption: String(i.caption || '') })) }))
    if (status === 'published' && !record.modules.some(m => m.html.replace(/<[^>]*>/g, '').replace(/&nbsp;/g, '').trim() || /<img\s/.test(m.html) || m.image || m.images.some(i => i.src))) return { ok: false, error: '请先填写正文或模块图片再发布' }
    record.status = status
    record.publishedAt = existing?.publishedAt || (status === 'published' ? now() : '')
    record.updatedAt = now()
    record.revision = (existing?.revision || 0) + 1
    record.operator = '演示管理员'
    const next = existing ? articles.value.map(a => a.id === record.id ? record : a) : [record, ...articles.value]
    const result = commit(next)
    return { ...result, record: result.ok ? cloneNews(record) : undefined }
  }
  function setStatus(id, status) {
    if (!refresh()) return { ok: false, error: error.value }
    const article = articles.value.find(a => a.id === id)
    return article ? save(article, status) : { ok: false, error: '动态不存在' }
  }
  function copy(id) {
    if (!refresh()) return { ok: false, error: error.value }
    const original = articles.value.find(a => a.id === id)
    if (!original) return { ok: false, error: '动态不存在' }
    const article = cloneNews(original)
    article.id = newId()
    article.title += '（副本）'
    article.publishedAt = ''
    article.updatedAt = ''
    article.modules.forEach(m => { m.id = newId() })
    return save(article, 'draft', { isNew: true })
  }
  function remove(id) {
    if (!refresh()) return { ok: false, error: error.value }
    return commit(articles.value.filter(a => a.id !== id))
  }
  return { articles, error, refresh, save, setStatus, copy, remove }
}
export const groupNewsStore = createNewsStore()
