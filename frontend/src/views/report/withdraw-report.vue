<template>
  <div class="flex h-full bg-mainBg overflow-hidden w-full">
    <div class="flex-1 flex flex-col min-w-0 bg-gray-50 overflow-hidden p-4 custom-scrollbar overflow-y-auto w-full">
      <div class="flex-1 p-4 bg-gray-50 flex flex-col md:flex-row gap-4 overflow-hidden">
        <RelationTree
          width-class="w-full md:w-[232px]"
          height-class="h-[240px] md:h-full"
          :data="relationTreeData"
          auto-select
          default-selected-text="华安"
          @node-click="handleRelationNodeClick"
        />
        <div class="flex-1 flex flex-col gap-4 overflow-y-auto no-scrollbar min-w-0">
          <div class="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
            <div class="text-sm font-bold text-gray-800 mb-4">搜索</div>
            <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-12 gap-3 text-xs items-center">
              <div class="flex items-center gap-2 xl:col-span-3">
                <div class="text-gray-600 w-[72px] shrink-0 text-right">用户类型：</div>
                <el-select v-model="form.userType" class="flex-1" placeholder="不限">
                  <el-option v-for="o in userTypeOptions" :key="o.value" :label="o.label" :value="o.value" />
                </el-select>
              </div>
              <div class="flex items-center gap-2 xl:col-span-3">
                <div class="text-gray-600 w-[72px] shrink-0 text-right">查询范围：</div>
                <el-select v-model="form.queryScope" class="flex-1" placeholder="全下">
                  <el-option v-for="o in scopeOptions" :key="o.value" :label="o.label" :value="o.value" />
                </el-select>
              </div>
              <div class="flex items-center gap-2 xl:col-span-3">
                <div class="text-gray-600 w-[72px] shrink-0 text-right">请选择上级：</div>
                <el-select v-model="form.parent" class="flex-1" placeholder="请选择上级">
                  <el-option v-for="o in parentOptions" :key="o.value" :label="o.label" :value="o.value" />
                </el-select>
              </div>
              <div class="flex items-center gap-2 xl:col-span-3">
                <div class="text-gray-600 w-[72px] shrink-0 text-right">MT账号：</div>
                <el-input v-model="form.mtAccount" class="flex-1" placeholder="请输入" clearable />
              </div>

              <div class="flex items-center gap-2 xl:col-span-3">
                <div class="text-gray-600 w-[72px] shrink-0 text-right">客户邮箱：</div>
                <el-input v-model="form.email" class="flex-1" placeholder="请输入" clearable />
              </div>
              <div class="flex items-center gap-2 xl:col-span-2">
                <div class="text-gray-600 w-[72px] shrink-0 text-right">编号：</div>
                <el-input v-model="form.recordId" class="flex-1" placeholder="请输入" clearable />
              </div>
              <div class="flex items-center gap-2 xl:col-span-2">
                <div class="text-gray-600 w-[72px] shrink-0 text-right">佣金编号：</div>
                <el-input v-model="form.commissionId" class="flex-1" placeholder="请输入" clearable />
              </div>
              <div class="flex items-center gap-2 xl:col-span-2">
                <div class="text-gray-600 w-[72px] shrink-0 text-right">状态：</div>
                <el-select v-model="form.status" class="flex-1" placeholder="全部">
                  <el-option v-for="o in statusOptions" :key="o.value" :label="o.label" :value="o.value" />
                </el-select>
              </div>

              <div class="flex items-center gap-2 xl:col-span-2">
                <div class="text-gray-600 w-[72px] shrink-0 text-right">时间范围：</div>
                <el-select v-model="form.timeField" class="flex-1" placeholder="系统时间">
                  <el-option v-for="o in timeFieldOptions" :key="o.value" :label="o.label" :value="o.value" />
                </el-select>
              </div>
              <div class="flex items-center gap-2 xl:col-span-7">
                <el-date-picker
                  v-model="form.dateRange"
                  type="daterange"
                  range-separator="到"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  class="w-full"
                />
              </div>
              <div class="flex items-center justify-end gap-3 xl:col-span-3">
                <button class="bg-white border border-primaryBtn text-primaryBtn hover:bg-primaryBtn hover:text-white px-6 py-2 rounded text-xs transition-colors shadow-sm font-medium" @click="applySearch">
                  搜索
                </button>
                <button class="bg-white border border-gray-300 text-gray-600 hover:bg-gray-50 px-6 py-2 rounded text-xs transition-colors shadow-sm font-medium" @click="resetSearch">
                  重置
                </button>
              </div>
            </div>
          </div>

          <div class="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
            <div class="flex items-center justify-between gap-4 flex-wrap">
              <div class="text-sm font-bold text-gray-800">汇总统计</div>
              <div class="flex items-center gap-2">
                <button class="bg-white border border-primaryBtn text-primaryBtn hover:bg-primaryBtn hover:text-white px-4 py-2 rounded text-xs transition-colors shadow-sm font-medium" @click="exportReport">
                  报表导出
                </button>
              </div>
            </div>

            <div class="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
              <div>
                <div class="text-gray-500">返佣总金额($)：</div>
                <div class="mt-1 font-bold text-primaryBtn">{{ formatMoney(summary.commissionSum) }}</div>
              </div>
              <div>
                <div class="text-gray-500">提现总金额($)：</div>
                <div class="mt-1 font-bold text-primaryBtn">{{ formatMoney(summary.withdrawSum) }}</div>
              </div>
            </div>
          </div>

          <div class="flex-1 min-h-0 bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
            <DataTable :data="displayRows" :total="filteredRows.length" v-model:page="page" v-model:limit="limit" @change="handlePageChange">
              <el-table-column prop="mtAccount" label="MT账号" width="120" />
              <el-table-column prop="platformTime" label="平台时间(ib)" width="170" />
              <el-table-column label="客户信息" min-width="220">
                <template #default="{ row }">
                  <div class="font-medium text-gray-800">{{ row.clientName }}</div>
                  <div class="text-[11px] text-gray-400 mt-0.5">{{ row.email }}</div>
                </template>
              </el-table-column>
              <el-table-column prop="status" label="状态" width="100" />
              <el-table-column prop="amountUsd" label="金额($)" width="120" align="right">
                <template #default="{ row }">
                  <span class="font-mono">{{ formatMoney(row.amountUsd) }}</span>
                </template>
              </el-table-column>
              <el-table-column prop="remark" label="注释" min-width="200" show-overflow-tooltip />
              <el-table-column prop="recordId" label="编号" width="100" />
              <el-table-column prop="commissionId" label="佣金编号" width="120" />
              <el-table-column label="操作" width="110">
                <template #default="{ row }">
                  <button class="bg-primaryBtn hover:opacity-90 text-white px-3 py-1.5 rounded text-xs transition-colors shadow-sm font-medium" @click="viewDetail(row)">
                    查看详情
                  </button>
                </template>
              </el-table-column>
            </DataTable>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, reactive, ref } from 'vue'
import RelationTree from '@/components/RelationTree.vue'
import DataTable from '@/components/DataTable.vue'
import { relationTreeDemoData } from '@/mocks/relation-tree-demo'

const relationTreeData = computed(() => relationTreeDemoData)

const userTypeOptions = [
  { label: '不限', value: 'all' },
  { label: '代理', value: 'ib' },
  { label: '直客', value: 'client' }
]

const scopeOptions = [
  { label: '全下', value: 'all' },
  { label: '直属', value: 'direct' },
  { label: '团队', value: 'team' }
]

const parentOptions = [
  { label: '全部', value: 'all' },
  { label: '285-华安', value: 285 },
  { label: '29-Luke', value: 29 }
]

const statusOptions = [
  { label: '全部', value: 'all' },
  { label: '结算', value: '结算' },
  { label: '返佣', value: '返佣' }
]

const timeFieldOptions = [
  { label: '系统时间', value: 'systemTime' },
  { label: '平台时间', value: 'platformTime' }
]

const form = reactive({
  mtAccount: '',
  email: '',
  recordId: '',
  commissionId: '',
  userType: 'all',
  queryScope: 'all',
  parent: 'all',
  status: 'all',
  timeField: 'systemTime',
  dateRange: []
})

const applied = ref({ ...form })
const selectedRelation = ref(null)

const normalize = (v) => String(v ?? '').trim().toLowerCase()

const parseDate = (d) => {
  if (!d) return null
  const dt = new Date(d)
  return Number.isNaN(dt.getTime()) ? null : dt
}

const relationScopes = computed(() => {
  const roots = relationTreeData.value || []
  const clientsMap = new Map()

  const walk = (node) => {
    if (!node || node.type !== 'ib') return []
    let clientIds = []
    const children = Array.isArray(node.children) ? node.children : []
    for (const ch of children) {
      if (ch.type === 'client') clientIds.push(ch.id)
      if (ch.type === 'ib') clientIds = clientIds.concat(walk(ch))
    }
    clientsMap.set(node.id, clientIds)
    return clientIds
  }

  for (const r of roots) walk(r)
  return clientsMap
})

const allRows = ref([
  { clientId: 70, agentId: 42, mtAccount: '8300248', platformTime: '2026-09-11 19:52:39', systemTime: '2026-09-11 19:52:45', clientName: '华安', email: 'huaan@qq.com', status: '结算', amountUsd: -0.05, remark: 'MT Order#1198024 MT Login#8300248', recordId: '361877', commissionId: '143312', bizType: '提现' },
  { clientId: 70, agentId: 42, mtAccount: '-', platformTime: '2026-09-11 19:52:39', systemTime: '2026-09-11 19:52:45', clientName: '华安', email: 'huaan@qq.com', status: '返佣', amountUsd: 0.05, remark: 'Commission', recordId: '361876', commissionId: '143312', bizType: '返佣' },
  { clientId: 319, agentId: 42, mtAccount: '-', platformTime: '2026-09-11 19:52:39', systemTime: '2026-09-11 19:52:45', clientName: 'test-测试-B', email: '3218965885@qq.com', status: '返佣', amountUsd: 0.19, remark: 'Commission', recordId: '361875', commissionId: '143311', bizType: '返佣' },
  { clientId: 999, agentId: null, mtAccount: '-', platformTime: '2026-09-11 11:45:22', systemTime: '2026-09-11 11:45:40', clientName: '独立直客示例', email: 'testline3@163.com', status: '返佣', amountUsd: 0.12, remark: 'Commission', recordId: '361869', commissionId: '143307', bizType: '返佣' }
])

const applySearch = () => {
  applied.value = { ...form }
}

const resetSearch = () => {
  form.mtAccount = ''
  form.email = ''
  form.recordId = ''
  form.commissionId = ''
  form.userType = 'all'
  form.queryScope = 'all'
  form.parent = 'all'
  form.status = 'all'
  form.timeField = 'systemTime'
  form.dateRange = []
  applied.value = { ...form }
}

const handleRelationNodeClick = (node) => {
  selectedRelation.value = node
}

const filteredRows = computed(() => {
  const scope = selectedRelation.value
  const filter = applied.value
  const mtKeyword = normalize(filter.mtAccount)
  const emailKeyword = normalize(filter.email)
  const recordIdKeyword = normalize(filter.recordId)
  const commissionIdKeyword = normalize(filter.commissionId)
  const status = filter.status || 'all'
  const timeField = filter.timeField || 'systemTime'
  const userType = filter.userType || 'all'
  const [start, end] = Array.isArray(filter.dateRange) ? filter.dateRange : []
  const startDate = parseDate(start)
  const endDate = parseDate(end)

  return allRows.value.filter((row) => {
    let okScope = true
    if (scope?.type === 'client') {
      okScope = Number(row.clientId) === Number(scope.id)
    } else if (scope?.type === 'ib') {
      const ids = relationScopes.value.get(scope.id) || []
      okScope = ids.length ? ids.includes(Number(row.clientId)) : false
    }

    if (!okScope) return false

    const okMt = !mtKeyword ? true : normalize(row.mtAccount).includes(mtKeyword)
    if (!okMt) return false

    const okEmail = !emailKeyword ? true : normalize(row.email).includes(emailKeyword)
    if (!okEmail) return false

    const okRecordId = !recordIdKeyword ? true : normalize(row.recordId).includes(recordIdKeyword)
    if (!okRecordId) return false

    const okCommissionId = !commissionIdKeyword ? true : normalize(row.commissionId).includes(commissionIdKeyword)
    if (!okCommissionId) return false

    const okStatus = status === 'all' ? true : row.status === status
    if (!okStatus) return false

    if (userType !== 'all') {
      const isClient = row.agentId == null
      if (userType === 'client' && !isClient) return false
      if (userType === 'ib' && isClient) return false
    }

    if (startDate && endDate) {
      const t = parseDate(String(row[timeField] || '').replace(' ', 'T'))
      if (!t) return false
      const startOk = t.getTime() >= startDate.getTime()
      const endOk = t.getTime() <= endDate.getTime() + 24 * 60 * 60 * 1000 - 1
      if (!startOk || !endOk) return false
    }

    return true
  })
})

const summary = computed(() => {
  const rows = filteredRows.value
  const commissionSum = rows.filter((r) => r.bizType === '返佣').reduce((s, r) => s + Number(r.amountUsd || 0), 0)
  const withdrawSum = rows.filter((r) => r.bizType === '提现').reduce((s, r) => s + Number(r.amountUsd || 0), 0)
  return {
    commissionSum,
    withdrawSum
  }
})

const page = ref(1)
const limit = ref(20)

const displayRows = computed(() => {
  const start = (page.value - 1) * limit.value
  return filteredRows.value.slice(start, start + limit.value)
})

const handlePageChange = () => {
}

const exportReport = () => {
}

const viewDetail = () => {
}

const formatMoney = (v) => {
  const num = Number(v || 0)
  return num.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}
</script>
