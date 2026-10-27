<template>
  <div class="image-input">
    <el-input :model-value="modelValue?.startsWith('data:') ? '' : modelValue" :aria-label="label" :placeholder="modelValue?.startsWith('data:') ? '已选择本地图片；输入新地址可替换' : 'https:// 图片地址，或选择本地图片'" @update:model-value="$emit('update:modelValue', $event)" />
    <div class="image-actions">
      <label class="upload-button">选择图片<input type="file" accept="image/png,image/jpeg,image/webp,image/gif" @change="upload"></label>
      <el-button v-if="modelValue" link @click="$emit('update:modelValue', '')">清空</el-button>
      <span>PNG / JPG / WebP / GIF，单张不超过 1 MB</span>
    </div>
    <span v-if="modelValue && !safeUrl(modelValue, true)" class="invalid">图片地址无效，请使用 HTTP(S) 图片地址或上传图片</span>
  </div>
</template>
<script setup>
import { ElMessage } from 'element-plus'
import { safeUrl } from '../../utils/groupNewsContent.js'
defineProps({ modelValue: String, label: { type: String, default: '图片地址' } })
const emit = defineEmits(['update:modelValue'])
function upload(event) {
  const file = event.target.files?.[0]
  event.target.value = ''
  if (!file) return
  if (!['image/png', 'image/jpeg', 'image/webp', 'image/gif'].includes(file.type) || file.size > 1024 * 1024) return ElMessage.warning('请选择 1 MB 以内的 PNG、JPG、WebP 或 GIF 图片')
  const reader = new FileReader()
  reader.onload = () => emit('update:modelValue', String(reader.result))
  reader.onerror = () => ElMessage.error('图片读取失败，请重试')
  reader.readAsDataURL(file)
}
</script>
<style scoped>
.image-input { display: grid; gap: 7px; width: 100%; }
.image-actions { display: flex; gap: 10px; align-items: center; flex-wrap: wrap; font-size: 12px; color: #6b7280; }
.upload-button { position: relative; display: inline-flex; padding: 5px 10px; border: 1px solid #e5e7eb; border-radius: 6px; color: #374151; cursor: pointer; }
.upload-button:focus-within { outline: 2px solid var(--crm-primary); }
.upload-button input { position: absolute; opacity: 0; inset: 0; width: 100%; cursor: pointer; }
.invalid { color: #dc2626; font-size: 12px; }
</style>
