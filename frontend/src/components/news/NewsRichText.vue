<template>
  <div class="rich-editor">
    <div class="toolbar" role="toolbar" aria-label="正文格式">
      <button v-for="tool in tools" :key="tool.label" type="button" @mousedown.prevent @click="format(tool.command, tool.value)">{{ tool.label }}</button>
      <button type="button" @mousedown.prevent @click="openLink">链接</button>
      <button type="button" @mousedown.prevent @click="format('unlink')">移除链接</button>
    </div>
    <div ref="editor" class="news-content editor-body" contenteditable="true" role="textbox" aria-multiline="true" :aria-label="label" @input="update" @blur="clean" @paste.prevent="paste" @drop.prevent @compositionstart="composing = true" @compositionend="composing = false; update()"></div>
    <el-dialog v-model="linkOpen" title="插入链接" width="min(460px, 94vw)" append-to-body>
      <el-input v-model="linkUrl" placeholder="https://example.com" aria-label="链接地址" @keyup.enter="insertLink" />
      <template #footer><el-button @click="linkOpen = false">取消</el-button><el-button type="primary" @click="insertLink">插入</el-button></template>
    </el-dialog>
  </div>
</template>
<script setup>
import { onMounted, ref, watch } from 'vue'
import { ElMessage } from 'element-plus'
import { sanitizeRichText, safeUrl, escapeHtml, plainTextHtml } from '../../utils/groupNewsContent.js'
import '../../assets/group-news-content.css'
const props = defineProps({ modelValue: { type: String, default: '' }, label: { type: String, default: '正文内容' } })
const emit = defineEmits(['update:modelValue'])
const editor = ref(null)
const composing = ref(false)
const linkOpen = ref(false)
const linkUrl = ref('')
let savedRange = null
const tools = [
  { label: '段落', command: 'formatBlock', value: 'p' },
  { label: '标题 2', command: 'formatBlock', value: 'h2' },
  { label: '标题 3', command: 'formatBlock', value: 'h3' },
  { label: '加粗', command: 'bold' }, { label: '斜体', command: 'italic' },
  { label: '无序列表', command: 'insertUnorderedList' }, { label: '有序列表', command: 'insertOrderedList' }
]
onMounted(() => { editor.value.innerHTML = sanitizeRichText(props.modelValue) })
watch(() => props.modelValue, value => {
  if (editor.value && document.activeElement !== editor.value && !linkOpen.value) editor.value.innerHTML = sanitizeRichText(value)
})
function update() {
  if (!composing.value) emit('update:modelValue', sanitizeRichText(editor.value.innerHTML))
}
function clean() {
  if (composing.value || linkOpen.value) return
  const html = sanitizeRichText(editor.value.innerHTML)
  editor.value.innerHTML = html
  emit('update:modelValue', html)
}
function format(command, value = null) {
  editor.value.focus()
  document.execCommand(command, false, value)
  update()
}
function paste(event) {
  const html = event.clipboardData?.getData('text/html')
  const safe = html ? sanitizeRichText(html) : plainTextHtml(event.clipboardData?.getData('text/plain'))
  format('insertHTML', safe)
}
function openLink() {
  const selection = window.getSelection()
  savedRange = selection?.rangeCount && editor.value.contains(selection.anchorNode) && editor.value.contains(selection.focusNode) ? selection.getRangeAt(0).cloneRange() : null
  linkUrl.value = ''
  linkOpen.value = true
}
function insertLink() {
  const href = safeUrl(linkUrl.value)
  if (!href) return ElMessage.warning('请输入有效的 HTTP(S) 或邮箱链接')
  editor.value.focus()
  if (savedRange) {
    const selection = window.getSelection()
    selection.removeAllRanges()
    selection.addRange(savedRange)
  }
  if (savedRange && !savedRange.collapsed) format('createLink', href)
  else format('insertHTML', `<a href="${escapeHtml(href)}" target="_blank" rel="noopener noreferrer">${escapeHtml(href)}</a>`)
  linkOpen.value = false
  update()
}
</script>
<style scoped>
.rich-editor { border: 1px solid #d1d5db; border-radius: 8px; overflow: hidden; width: 100%; }
.toolbar { display: flex; flex-wrap: wrap; gap: 4px; padding: 8px; background: #f9fafb; border-bottom: 1px solid #e5e7eb; }
.toolbar button { font-size: 12px; padding: 4px 7px; border-radius: 4px; color: #374151; }
.toolbar button:hover, .toolbar button:focus-visible { background: #f0e5c9; }
.editor-body { min-height: 170px; padding: 14px; outline: none; }
.rich-editor:focus-within { border-color: var(--crm-primary); }
</style>
