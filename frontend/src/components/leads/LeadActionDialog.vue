<template>
  <el-dialog :model-value="modelValue" :title="mode === 'assign' ? '分配留资' : '新增跟进'" width="92%" :style="{ maxWidth: '580px' }" :close-on-click-modal="false" @update:model-value="$emit('update:modelValue', $event)" destroy-on-close>
    <p class="text-sm text-gray-600 mb-4">{{ targets.map(row => row.name).join('、') || '未选择记录' }}</p>
    <el-form label-position="top" @submit.prevent>
      <el-form-item v-if="mode === 'assign'" label="归属销售 / 客服" required>
        <el-select v-model="assigneeId" placeholder="请选择销售或客服" class="w-full"><el-option v-for="person in LEAD_STAFF" :key="person.id" :value="person.id" :label="`${person.name}（${person.role}）`" /></el-select>
      </el-form-item>
      <template v-else>
        <el-form-item label="跟进内容" required><el-input v-model="content" type="textarea" :rows="4" :maxlength="2000" show-word-limit placeholder="请输入跟进内容" /></el-form-item>
        <el-form-item label="更新状态"><el-select v-model="status" class="w-full"><el-option v-for="value in ['assigned', 'invalid', 'converted']" :key="value" :value="value" :label="LEAD_STATES[value]" /></el-select></el-form-item>
        <el-form-item label="下次跟进时间（UTC+8）"><el-date-picker v-model="nextFollowAt" type="datetime" value-format="YYYY-MM-DD HH:mm:ss" placeholder="可选" /></el-form-item>
        <p class="text-xs text-gray-400">保留原型规则：已转化或无效线索仍可通过跟进更新状态。这里只更新留资状态，不创建真实客户账户。</p>
      </template>
    </el-form>
    <p class="text-xs text-gray-500 mt-3">本地演示操作，操作人：{{ LEAD_OPERATOR }}；保存后自动记录时间。</p>
    <template #footer><el-button @click="$emit('update:modelValue', false)">取消</el-button><el-button type="primary" @click="save">{{ mode === 'assign' ? '确认分配' : '保存跟进' }}</el-button></template>
  </el-dialog>
</template>
<script setup>
import { ref, watch } from 'vue'
import { ElMessage } from 'element-plus'
import { LEAD_STAFF, LEAD_STATES, LEAD_OPERATOR, leadsStore, copyLead } from '../../store/leadsDemo.js'
const props = defineProps({ modelValue: Boolean, mode: { type: String, default: 'assign' }, ids: { type: Array, default: () => [] } })
const emit = defineEmits(['update:modelValue', 'saved'])
const targets = ref([])
const assigneeId = ref('')
const content = ref('')
const status = ref('assigned')
const nextFollowAt = ref('')
watch(() => props.modelValue, open => {
  if (!open) return
  leadsStore.refresh()
  targets.value = copyLead(leadsStore.records.value.filter(row => props.ids.includes(row.id)))
  assigneeId.value = targets.value.length === 1 ? targets.value[0].assigneeId : ''
  content.value = ''
  status.value = ['invalid', 'converted'].includes(targets.value[0]?.status) ? targets.value[0].status : 'assigned'
  nextFollowAt.value = targets.value[0]?.nextFollowAt || ''
})
function save() {
  if (!targets.value.length || targets.value.length !== props.ids.length) return ElMessage.error('所选记录不存在，请重新查询')
  const result = props.mode === 'assign'
    ? leadsStore.assign(props.ids, assigneeId.value, Object.fromEntries(targets.value.map(row => [row.id, row.revision])))
    : leadsStore.follow(targets.value[0].id, { content: content.value, status: status.value, nextFollowAt: nextFollowAt.value }, targets.value[0].revision)
  if (!result.ok) return ElMessage.error(result.error)
  ElMessage.success(props.mode === 'assign' ? '已分配，状态更新为跟进中' : '跟进记录已保存')
  emit('update:modelValue', false)
  emit('saved')
}
</script>
