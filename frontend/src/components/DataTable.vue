<template>
  <div class="bg-white rounded-lg flex flex-col h-full border border-gray-100 shadow-sm">
    <div class="flex-1 overflow-hidden p-2">
      <el-table 
        :data="data" 
        style="width: 100%; height: 100%"
        height="100%"
        header-row-class-name="bg-gray-50 text-gray-700 font-medium"
        v-bind="$attrs"
      >
        <slot></slot>
      </el-table>
    </div>
    <div class="py-3 px-4 border-t border-gray-100 flex justify-end bg-gray-50/50 rounded-b-lg">
      <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :page-sizes="[10, 20, 50, 100]"
        background
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  data: { type: Array, required: true },
  total: { type: Number, default: 0 },
  page: { type: Number, default: 1 },
  limit: { type: Number, default: 20 }
})

const emit = defineEmits(['update:page', 'update:limit', 'change'])

const currentPage = ref(props.page)
const pageSize = ref(props.limit)

watch(() => props.page, (val) => { currentPage.value = val })
watch(() => props.limit, (val) => { pageSize.value = val })

const handleSizeChange = (val) => {
  emit('update:limit', val)
  emit('change', { page: currentPage.value, limit: val })
}

const handleCurrentChange = (val) => {
  emit('update:page', val)
  emit('change', { page: val, limit: pageSize.value })
}
</script>

<style scoped>
/* 覆盖 Element Plus 的分页主色调为金色 */
:deep(.el-pagination.is-background .el-pager li.is-active) {
  background-color: #d1a84f !important;
  color: white !important;
}
</style>
