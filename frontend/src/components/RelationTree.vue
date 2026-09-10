<template>
  <div class="w-64 bg-white border-r border-gray-200 flex flex-col h-full flex-shrink-0">
    <!-- 顶部操作区 -->
    <div class="p-3 border-b border-gray-100 flex gap-2 items-center bg-gray-50/50">
      <div class="flex-1 flex bg-white border border-gray-200 rounded overflow-hidden">
        <input 
          v-model="filterText"
          class="w-full px-2 py-1.5 text-xs outline-none text-gray-700" 
          placeholder="搜索代理/直客、MT账号" 
          type="text"
        />
        <button class="px-2 text-gray-400 hover:text-[#d1a84f] border-l border-gray-200 bg-white">
          <i class="fas fa-search"></i>
        </button>
      </div>
    </div>
    <!-- 树列表 -->
    <div class="flex-1 overflow-y-auto p-2 text-[13px] text-gray-600 custom-scrollbar">
      <el-tree
        ref="treeRef"
        :data="treeData"
        :props="defaultProps"
        :filter-node-method="filterNode"
        node-key="id"
        highlight-current
        @node-click="handleNodeClick"
        :expand-on-click-node="false"
        class="position-stats-tree"
        icon="CaretRight"
      >
        <template #default="{ node, data }">
          <div class="flex-1 flex items-center justify-between pr-2 py-0.5 w-full">
            <div class="flex items-center gap-2">
              <i v-if="data.type === 'client'" class="fa-solid fa-circle text-gray-200 text-[6px] w-3 text-center"></i>
              <span class="tree-label truncate max-w-[120px]" :title="data.label">
                {{ data.label }}
              </span>
            </div>
            <span v-if="data.type === 'ib'" class="tree-tag tag-ib shrink-0">
              代理
            </span>
            <span v-else class="tree-tag tag-client shrink-0">
              直客
            </span>
          </div>
        </template>
      </el-tree>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { CaretRight } from '@element-plus/icons-vue'

const filterText = ref('')
const treeRef = ref(null)

// 模拟的高保真关系树数据，后续可通过 axios 从 Python 后端拉取
const treeData = ref([
  {
    id: 285,
    label: '285-华安',
    type: 'ib',
    children: [
      { 
        id: 29, 
        label: '29-Luke', 
        type: 'ib', 
        children: [
          { 
            id: 42, 
            label: '42-jack', 
            type: 'ib', 
            children: [
              { id: 70, label: '70-张生龙', type: 'client', mtAccount: '888001' },
              { id: 319, label: '319-黎富英', type: 'client', mtAccount: '888002' },
              { id: 329, label: '329-魏正博', type: 'client', mtAccount: '888003' },
              { id: 468, label: '468-孙敏宏', type: 'ib' },
              { id: 528, label: '528-谢兰香', type: 'ib' }
            ] 
          },
          { id: 43, label: '43-汪晋霖', type: 'ib' },
          { id: 161, label: '161-Mikey', type: 'ib' }
        ] 
      }
    ]
  },
  {
    id: 999,
    label: '88-独立直客示例',
    type: 'client',
    mtAccount: '999001'
  }
])

const defaultProps = {
  children: 'children',
  label: 'label'
}

watch(filterText, (val) => {
  treeRef.value.filter(val)
})

const filterNode = (value, data) => {
  if (!value) return true
  // 支持名称或 MT 账号搜索
  const matchLabel = data.label.includes(value)
  const matchMt = data.mtAccount ? data.mtAccount.includes(value) : false
  return matchLabel || matchMt
}

const emit = defineEmits(['node-click'])

const handleNodeClick = (data) => {
  emit('node-click', data)
}
</script>

<style scoped>
.custom-scrollbar::-webkit-scrollbar { width: 4px; }
.custom-scrollbar::-webkit-scrollbar-thumb { background: #e5e7eb; border-radius: 4px; }
.custom-scrollbar::-webkit-scrollbar-track { background: transparent; }

/* 覆盖 el-tree 默认样式以匹配 position-stats */
.position-stats-tree {
  --el-tree-node-hover-bg-color: #f9fafb;
  --el-tree-text-color: #4b5563;
}
.position-stats-tree :deep(.el-tree-node__content) {
  height: 32px;
  border-radius: 4px;
  margin-bottom: 2px;
}
.position-stats-tree :deep(.el-tree-node.is-current > .el-tree-node__content) {
  background-color: rgba(209, 168, 79, 0.1) !important;
}
.position-stats-tree :deep(.el-tree-node.is-current > .el-tree-node__content .tree-label) {
  color: #d1a84f;
  font-weight: 500;
}
.position-stats-tree :deep(.el-tree-node.is-current > .el-tree-node__content .tree-tag.tag-ib) {
  color: #d1a84f;
  background-color: rgba(209, 168, 79, 0.2);
}
.position-stats-tree :deep(.el-tree-node.is-current > .el-tree-node__content .tree-tag.tag-client) {
  color: #d1a84f;
  background-color: rgba(209, 168, 79, 0.2);
}
.position-stats-tree :deep(.el-tree-node.is-current > .el-tree-node__content .el-tree-node__expand-icon) {
  color: #d1a84f;
}

/* 展开图标替换与样式 */
.position-stats-tree :deep(.el-tree-node__expand-icon) {
  color: #9ca3af;
  font-size: 12px;
}
.position-stats-tree :deep(.el-tree-node__expand-icon.is-leaf) {
  color: transparent;
}

/* 标签通用样式 */
.tree-tag {
  font-size: 10px;
  padding: 2px 6px;
  border-radius: 4px;
}
.tag-ib {
  color: #3b82f6;
  background-color: #eff6ff;
}
.tag-client {
  color: #f97316;
  background-color: #fff7ed;
}
</style>
