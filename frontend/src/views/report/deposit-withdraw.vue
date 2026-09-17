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
                <el-select v-model="form.queryScope" class="flex-1" placeholder="所有">
                  <el-option v-for="o in scopeOptions" :key="o.value" :label="o.label" :value="o.value" />
                </el-select>
              </div>
              <div class="flex items-center gap-2 xl:col-span-3">
                <div class="text-gray-600 w-[72px] shrink-0 text-right">MT账号：</div>
                <el-input v-model="form.mtAccount" class="flex-1" placeholder="请输入" clearable />
              </div>
              <div class="flex items-center gap-2 xl:col-span-3">
                <div class="text-gray-600 w-[72px] shrink-0 text-right">邮箱：</div>
                <el-input v-model="form.email" class="flex-1" placeholder="请输入" clearable />
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
                <button class="bg-white border border-primaryBtn text-primaryBtn hover:bg-primaryBtn hover:text-white px-4 py-2 rounded text-xs transition-colors shadow-sm font-medium" @click="exportSummary">
                  报表导出
                </button>
                <button class="bg-white border border-primaryBtn text-primaryBtn hover:bg-primaryBtn hover:text-white px-4 py-2 rounded text-xs transition-colors shadow-sm font-medium" @click="exportDetail">
                  明细导出
                </button>
              </div>
            </div>

            <div class="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
              <div>
                <div class="text-gray-500">总入金($)：</div>
                <div class="mt-1 font-bold text-primaryBtn">{{ formatMoney(summary.depositSum) }}</div>
              </div>
              <div>
                <div class="text-gray-500">总出金($)：</div>
                <div class="mt-1 font-bold text-primaryBtn">{{ formatMoney(summary.withdrawSum) }}</div>
              </div>
              <div>
                <div class="text-gray-500">净入金($)：</div>
                <div class="mt-1 font-bold text-primaryBtn">{{ formatMoney(summary.netSum) }}</div>
              </div>
              <div>
                <div class="text-gray-500">账户余额($)：</div>
                <div class="mt-1 font-bold text-primaryBtn">{{ formatMoney(summary.balanceSum) }}</div>
              </div>
            </div>
          </div>

          <div class="flex-1 min-h-0 bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
            <DataTable :data="displayRows" :total="filteredRows.length" v-model:page="page" v-model:limit="limit" @change="handlePageChange">
              <el-table-column label="账户信息" min-width="220" show-overflow-tooltip>
                <template #default="{ row }">
                  <div class="font-medium text-gray-800">{{ row.userName }}</div>
                  <div class="text-[11px] text-gray-400 mt-0.5">{{ row.email }}</div>
                </template>
              </el-table-column>
              <el-table-column prop="mtAccount" label="MT账号" width="120" />
              <el-table-column prop="mtType" label="MT类型" width="120" />
              <el-table-column prop="accountType" label="账户类型" width="110" />
              <el-table-column prop="depositCount" label="入金笔数" width="100" align="right" />
              <el-table-column prop="depositAmount" label="入金金额($)" width="140" align="right">
                <template #default="{ row }">
                  <span class="font-mono">{{ formatMoney(row.depositAmount) }}</span>
                </template>
              </el-table-column>
              <el-table-column prop="withdrawCount" label="出金笔数" width="100" align="right" />
              <el-table-column prop="withdrawAmount" label="出金金额($)" width="140" align="right">
                <template #default="{ row }">
                  <span class="font-mono">{{ formatMoney(row.withdrawAmount) }}</span>
                </template>
              </el-table-column>
              <el-table-column prop="netAmount" label="净入金金额($)" width="160" align="right">
                <template #default="{ row }">
                  <span class="font-mono">{{ formatMoney(row.netAmount) }}</span>
                </template>
              </el-table-column>
              <el-table-column prop="balance" label="账号余额($)" width="140" align="right">
                <template #default="{ row }">
                  <span class="font-mono">{{ formatMoney(row.balance) }}</span>
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
  { label: '所有', value: 'all' },
  { label: '直属', value: 'direct' },
  { label: '团队', value: 'team' }
]

const timeFieldOptions = [
  { label: '系统时间', value: 'systemTime' },
  { label: 'MT时间', value: 'mtTime' }
]

const form = reactive({
  userType: 'all',
  queryScope: 'all',
  mtAccount: '',
  email: '',
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
  { clientId: 70, agentId: 42, userName: 'test-沈栋晓', email: '138322766457@qq.com', mtAccount: '8150145', mtType: '标准账户', accountType: '交易', depositCount: 1, depositAmount: 1000.0, withdrawCount: 0, withdrawAmount: 0.0, netAmount: 1000.0, balance: 1000.22, mtTime: '2026-09-10 11:20:00', systemTime: '2026-09-10 11:21:10' },
  { clientId: 319, agentId: 42, userName: 'test-周本', email: '13926295388@qq.com', mtAccount: '8110473', mtType: '美分账户', accountType: '交易', depositCount: 2, depositAmount: 1000.0, withdrawCount: 0, withdrawAmount: 0.0, netAmount: 1000.0, balance: 1030.713, mtTime: '2026-09-11 09:05:12', systemTime: '2026-09-11 09:06:30' },
  { clientId: 329, agentId: 42, userName: 'test-施新溪', email: '15286072073@qq.com', mtAccount: '8100613', mtType: '标准账户', accountType: '交易', depositCount: 3, depositAmount: 1000.0, withdrawCount: 0, withdrawAmount: 0.0, netAmount: 1000.0, balance: 938.64, mtTime: '2026-09-12 14:13:04', systemTime: '2026-09-12 14:17:57' },
  { clientId: 999, agentId: null, userName: '独立直客示例', email: 'testline3@163.com', mtAccount: '7100108', mtType: '美分账户', accountType: '交易', depositCount: 1, depositAmount: 1000.0, withdrawCount: 0, withdrawAmount: 0.0, netAmount: 1000.0, balance: 999.9456, mtTime: '2026-09-09 11:02:00', systemTime: '2026-09-09 11:08:44' }
])

const applySearch = () => {
  applied.value = { ...form }
}

const resetSearch = () => {
  form.userType = 'all'
  form.queryScope = 'all'
  form.mtAccount = ''
  form.email = ''
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
  const [start, end] = Array.isArray(filter.dateRange) ? filter.dateRange : []
  const startDate = parseDate(start)
  const endDate = parseDate(end)
  const timeField = filter.timeField || 'systemTime'
  const userType = filter.userType || 'all'

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
  const depositSum = rows.reduce((s, r) => s + Number(r.depositAmount || 0), 0)
  const withdrawSum = rows.reduce((s, r) => s + Number(r.withdrawAmount || 0), 0)
  const balanceSum = rows.reduce((s, r) => s + Number(r.balance || 0), 0)
  return {
    depositSum,
    withdrawSum,
    netSum: depositSum - withdrawSum,
    balanceSum
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

const exportSummary = () => {
}

const exportDetail = () => {
}

const formatMoney = (v) => {
  const num = Number(v || 0)
  return num.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}
</script>
