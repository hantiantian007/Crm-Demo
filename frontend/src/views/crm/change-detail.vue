<template>
  <div class="flex h-full bg-mainBg overflow-hidden">
    <!-- 左侧关系树 -->
    <RelationTree @node-click="handleNodeClick" class="w-[280px] shadow-sm z-10" />

    <!-- 右侧主体区 -->
    <div class="flex-1 flex flex-col min-w-0 p-4 md:p-6 overflow-hidden">
      
      <!-- 搜索区域 -->
      <div class="bg-white p-5 rounded-xl shadow-sm border border-gray-100 mb-4">
        <div class="font-bold text-gray-800 mb-4">搜索</div>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-7 gap-4 items-end">
          <div>
            <label class="block text-xs text-gray-500 mb-1">真实姓名</label>
            <el-input v-model="searchForm.name" placeholder="请输入" clearable />
          </div>
          <div>
            <label class="block text-xs text-gray-500 mb-1">邮箱</label>
            <el-input v-model="searchForm.email" placeholder="请输入" clearable />
          </div>
          <div>
            <label class="block text-xs text-gray-500 mb-1">MT账号</label>
            <el-input v-model="searchForm.mtAccount" placeholder="请输入" clearable />
          </div>
          <div>
            <label class="block text-xs text-gray-500 mb-1">变更类型</label>
            <el-select v-model="searchForm.changeType" placeholder="请选择" clearable class="w-full">
              <el-option label="基础资料变更" value="基础资料变更" />
              <el-option label="佣金变更" value="佣金变更" />
              <el-option label="敏感数据变更" value="敏感数据变更" />
            </el-select>
          </div>
          <div>
            <label class="block text-xs text-gray-500 mb-1">操作者</label>
            <el-input v-model="searchForm.operator" placeholder="请输入" clearable />
          </div>
          <div class="lg:col-span-2 flex items-end gap-4">
            <div class="flex-1 min-w-0">
              <label class="block text-xs text-gray-500 mb-1">处理时间</label>
              <el-date-picker
                v-model="searchForm.dateRange"
                type="daterange"
                range-separator="至"
                start-placeholder="开始"
                end-placeholder="结束"
                class="w-full"
              />
            </div>
            <button @click="handleSearch" class="bg-[#d1a84f] hover:bg-[#b89241] text-white px-6 h-[32px] rounded text-sm font-medium transition-colors shrink-0">
              搜索
            </button>
          </div>
        </div>
      </div>

      <!-- 数据表格 -->
      <div class="flex-1 min-h-0 bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <DataTable 
          :data="filteredData" 
          :total="filteredData.length" 
          v-model:page="page" 
          v-model:limit="limit"
          @change="fetchData"
        >
          <el-table-column label="客户信息" min-width="180">
            <template #default="{ row }">
              <div class="font-medium text-gray-800">【{{ row.clientId }}】{{ row.clientName }}</div>
              <div v-if="row.group" class="text-xs text-gray-400 mt-1">分组: {{ row.group }}</div>
            </template>
          </el-table-column>
          <el-table-column prop="changeType" label="变更类型" width="130">
            <template #default="{ row }">
              <span class="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">{{ row.changeType }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="type" label="类型" width="130" />
          <el-table-column prop="oldValue" label="旧值" min-width="120" />
          <el-table-column prop="newValue" label="新值" min-width="120">
            <template #default="{ row }">
              <span :class="row.oldValue !== row.newValue ? 'text-orange-500 font-medium' : ''">{{ row.newValue }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="operator" label="操作者" width="100" />
          <el-table-column prop="processTime" label="处理时间" width="160" />
        </DataTable>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'
import RelationTree from '@/components/RelationTree.vue'
import DataTable from '@/components/DataTable.vue'

// 搜索表单
const searchForm = reactive({
  name: '',
  email: '',
  mtAccount: '',
  changeType: '',
  operator: '',
  dateRange: []
})

// 分页参数
const page = ref(1)
const limit = ref(20)

// 模拟数据 (直接取自原型)
const allData = [
  { clientId: '463', clientName: 'test-孙春', group: '', changeType: '基础资料变更', type: '真实姓名', oldValue: 'test-孙春', newValue: '孙春测试', operator: 'test-F7', processTime: '2026-09-07 10:29:20' },
  { clientId: '477', clientName: 'test-杨晗和', group: 'real\\HATC\\Test\\Stan', changeType: '敏感数据变更', type: '-', oldValue: '0', newValue: '0', operator: 'test-F7', processTime: '2026-08-21 10:46:54' },
  { clientId: '477', clientName: 'test-杨晗和', group: 'real\\HATC\\Test\\Stan', changeType: '佣金变更', type: '股指配置', oldValue: '0', newValue: '0', operator: 'test-F7', processTime: '2026-08-21 10:46:54' },
  { clientId: '477', clientName: 'test-杨晗和', group: 'real\\HATC\\Test\\Stan', changeType: '佣金变更', type: '白银配置', oldValue: '0', newValue: '13', operator: 'test-F7', processTime: '2026-08-21 10:46:53' },
  { clientId: '477', clientName: 'test-杨晗和', group: 'real\\HATC\\Test\\Stan', changeType: '佣金变更', type: '黄金配置', oldValue: '0', newValue: '6', operator: 'test-F7', processTime: '2026-08-21 10:46:53' }
]

const tableData = ref([...allData])

// 实现前端假搜索过滤
const filteredData = computed(() => {
  return tableData.value.filter(item => {
    const matchName = !searchForm.name || item.clientName.includes(searchForm.name)
    const matchType = !searchForm.changeType || item.changeType === searchForm.changeType
    const matchOperator = !searchForm.operator || item.operator.includes(searchForm.operator)
    return matchName && matchType && matchOperator
  })
})

const handleSearch = () => {
  console.log('执行搜索条件：', searchForm)
}

const handleNodeClick = (data) => {
  console.log('点击了左侧关系树节点:', data)
  // 模拟：点击不同树节点加载不同数据
  if (data.type === 'ib') {
    tableData.value = [...allData] // 恢复全部
  } else {
    // 随机减少一条数据模拟变化
    tableData.value = allData.slice(0, 3)
  }
}

const fetchData = () => {
  console.log('触发翻页或查询', page.value, limit.value)
}
</script>
