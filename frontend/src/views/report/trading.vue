<template>
  <div class="flex h-full bg-mainBg overflow-hidden w-full">
    <div class="flex-1 flex flex-col min-w-0 bg-gray-50 overflow-hidden p-4 custom-scrollbar overflow-y-auto w-full">
      <div class="flex-1 p-4 bg-gray-50 flex flex-col md:flex-row gap-4 overflow-hidden">
        <div class="w-full md:w-[232px] flex flex-col gap-2 shrink-0">
          <div class="flex justify-end">
            <button class="bg-white border border-primaryBtn text-primaryBtn hover:bg-primaryBtn hover:text-white px-4 py-2 rounded text-xs transition-colors shadow-sm font-medium" type="button">
              代理视角
            </button>
          </div>
          <RelationTree
            width-class="w-full"
            height-class="h-[240px] md:h-full"
            :data="relationTreeData"
            auto-select
            default-selected-text="华安"
            @node-click="handleRelationNodeClick"
          />
        </div>

        <div class="flex-1 flex flex-col gap-4 overflow-y-auto no-scrollbar min-w-0">
          <div class="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
            <div class="text-sm font-bold text-gray-800 mb-4">搜索</div>
            <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-12 gap-3 text-xs items-center">
              <div class="flex items-center gap-2 xl:col-span-2">
                <div class="text-gray-600 w-[72px] shrink-0 text-right">用户类型：</div>
                <el-select v-model="form.userType" class="flex-1" placeholder="不限">
                  <el-option v-for="o in userTypeOptions" :key="o.value" :label="o.label" :value="o.value" />
                </el-select>
              </div>
              <div class="flex items-center gap-2 xl:col-span-2">
                <div class="text-gray-600 w-[72px] shrink-0 text-right">MT账号：</div>
                <el-input v-model="form.mtAccount" class="flex-1" placeholder="请输入" clearable />
              </div>
              <div class="flex items-center gap-2 xl:col-span-2">
                <div class="text-gray-600 w-[72px] shrink-0 text-right">客户邮箱：</div>
                <el-input v-model="form.email" class="flex-1" placeholder="请输入" clearable />
              </div>
              <div class="flex items-center gap-2 xl:col-span-2">
                <div class="text-gray-600 w-[72px] shrink-0 text-right">成交号：</div>
                <el-input v-model="form.dealNo" class="flex-1" placeholder="请输入" clearable />
              </div>
              <div class="flex items-center gap-2 xl:col-span-2">
                <div class="text-gray-600 w-[72px] shrink-0 text-right">持仓编号：</div>
                <el-input v-model="form.positionId" class="flex-1" placeholder="请输入" clearable />
              </div>
              <div class="flex items-center gap-2 xl:col-span-2">
                <div class="text-gray-600 w-[72px] shrink-0 text-right">订单编号：</div>
                <el-input v-model="form.orderId" class="flex-1" placeholder="请输入" clearable />
              </div>

              <div class="flex items-center gap-2 xl:col-span-2">
                <div class="text-gray-600 w-[72px] shrink-0 text-right">趋势：</div>
                <el-select v-model="form.trend" class="flex-1" placeholder="全部">
                  <el-option v-for="o in trendOptions" :key="o.value" :label="o.label" :value="o.value" />
                </el-select>
              </div>
              <div class="flex items-center gap-2 xl:col-span-2">
                <div class="text-gray-600 w-[72px] shrink-0 text-right">交易指令：</div>
                <el-select v-model="form.tradeCmd" class="flex-1" placeholder="全部">
                  <el-option v-for="o in cmdOptions" :key="o.value" :label="o.label" :value="o.value" />
                </el-select>
              </div>
              <div class="flex items-center gap-2 xl:col-span-2">
                <div class="text-gray-600 w-[72px] shrink-0 text-right">交易品种：</div>
                <el-select v-model="form.symbol" class="flex-1" placeholder="全部">
                  <el-option v-for="o in symbolOptions" :key="o.value" :label="o.label" :value="o.value" />
                </el-select>
              </div>
              <div class="flex items-center gap-2 xl:col-span-4">
                <div class="text-gray-600 w-[72px] shrink-0 text-right">平台时间：</div>
                <el-date-picker
                  v-model="form.dateRange"
                  type="daterange"
                  range-separator="到"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  class="flex-1"
                />
              </div>
              <div class="flex items-center justify-end gap-3 xl:col-span-2">
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

            <div class="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              <div class="text-gray-500">
                订单盈亏($)：
                <span class="ml-2 font-bold text-primaryBtn font-mono text-base">{{ formatMoney(kpi.pnlSum) }}</span>
              </div>
              <div class="text-gray-500">
                交易量(标准手)：
                <span class="ml-2 font-bold text-primaryBtn font-mono text-base">{{ formatLots(kpi.standardLots) }}</span>
              </div>
              <div class="text-gray-500">
                交易量(美分手)：
                <span class="ml-2 font-bold text-primaryBtn font-mono text-base">{{ formatLots(kpi.centLots) }}</span>
              </div>
            </div>
          </div>

          <div class="flex-1 min-h-0 bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
            <DataTable :data="displayRows" :total="filteredRows.length" v-model:page="page" v-model:limit="limit" @change="handlePageChange">
              <el-table-column type="expand" width="42">
                <template #default="{ row }">
                  <div class="px-3 py-2 text-xs text-gray-600 space-y-2">
                    <div class="flex items-center gap-2">
                      <div class="w-[72px] text-gray-500 shrink-0">佣金($)</div>
                      <div class="font-mono">{{ formatMoney(row.commissionUsd) }}</div>
                    </div>
                    <div class="flex items-start gap-2">
                      <div class="w-[72px] text-gray-500 shrink-0">注释</div>
                      <div class="break-all">{{ row.remark || '-' }}</div>
                    </div>
                  </div>
                </template>
              </el-table-column>
              <el-table-column prop="mtAccount" label="MT账号" width="120" />
              <el-table-column prop="mtType" label="MT类型" width="120" />
              <el-table-column prop="platformTime" label="平台时间" width="170" />
              <el-table-column prop="email" label="客户邮箱" min-width="180" show-overflow-tooltip />
              <el-table-column prop="dealNo" label="成交号" width="120" />
              <el-table-column prop="positionId" label="持仓编号" width="120" />
              <el-table-column prop="orderId" label="订单编号" width="120" />
              <el-table-column prop="symbol" label="交易品种" width="120" />
              <el-table-column prop="trend" label="趋势" width="90" />
              <el-table-column prop="tradeCmd" label="交易指令" width="110" />
              <el-table-column prop="handType" label="手数类型" width="90" />
              <el-table-column prop="lots" label="交易量(手)" width="110" align="right">
                <template #default="{ row }">
                  <span class="font-mono">{{ formatLots(row.lots) }}</span>
                </template>
              </el-table-column>
              <el-table-column prop="price" label="价位" width="120" align="right">
                <template #default="{ row }">
                  <span class="font-mono">{{ formatPrice(row.price) }}</span>
                </template>
              </el-table-column>
              <el-table-column prop="pnlUsd" label="盈亏($)" width="120" align="right">
                <template #default="{ row }">
                  <span class="font-mono" :class="Number(row.pnlUsd || 0) >= 0 ? 'text-emerald-700' : 'text-red-600'">{{ formatMoney(row.pnlUsd) }}</span>
                </template>
              </el-table-column>
              <el-table-column prop="storageFeeUsd" label="库存费($)" width="120" align="right">
                <template #default="{ row }">
                  <span class="font-mono">{{ formatMoney(row.storageFeeUsd) }}</span>
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

const trendOptions = [
  { label: '全部', value: 'all' },
  { label: '开仓', value: '开仓' },
  { label: '平仓', value: '平仓' }
]

const cmdOptions = [
  { label: '全部', value: 'all' },
  { label: '买入交易', value: '买入交易' },
  { label: '卖出交易', value: '卖出交易' },
  { label: '结余操作', value: '结余操作' }
]

const symbolOptions = [
  { label: '全部', value: 'all' },
  { label: 'XAUUSD', value: 'XAUUSD' },
  { label: 'XAGUSD', value: 'XAGUSD' },
  { label: 'EURUSD', value: 'EURUSD' }
]

const form = reactive({
  userType: 'all',
  mtAccount: '',
  email: '',
  dealNo: '',
  positionId: '',
  orderId: '',
  trend: 'all',
  tradeCmd: 'all',
  symbol: 'all',
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
  { clientId: 319, agentId: 42, mtAccount: '8150144', mtType: '标准账户', platformTime: '2026-09-14 11:59:33', email: '13755079682@qq.com', dealNo: '1201585', positionId: '-', orderId: '-', symbol: '-', trend: '-', tradeCmd: '结余操作', handType: '标准手', lots: 0, price: 0, pnlUsd: -3.17, storageFeeUsd: 0, commissionUsd: 0, remark: 'WD NPCNY OUT_940167690465576381' },
  { clientId: 319, agentId: 42, mtAccount: '8110469', mtType: '美分账户', platformTime: '2026-09-14 11:57:11', email: '13755079682@qq.com', dealNo: '1201552', positionId: '-', orderId: '-', symbol: '-', trend: '-', tradeCmd: '结余操作', handType: '美分手', lots: 0, price: 0, pnlUsd: -1.3, storageFeeUsd: 0, commissionUsd: 0, remark: 'USC-130.0000' },
  { clientId: 70, agentId: 42, mtAccount: '8300248', mtType: '标准账户', platformTime: '2026-09-11 14:49:21', email: 'huaan@qq.com', dealNo: '1198021', positionId: '695287', orderId: '695288', symbol: 'XAUUSD', trend: '平仓', tradeCmd: '卖出交易', handType: '标准手', lots: 0.01, price: 4335.68, pnlUsd: 0.88, storageFeeUsd: 0, commissionUsd: 0, remark: 'MT Order#1198021 MT Login#8300248' },
  { clientId: 70, agentId: 42, mtAccount: '8300248', mtType: '标准账户', platformTime: '2026-09-11 14:52:14', email: 'huaan@qq.com', dealNo: '1198023', positionId: '695287', orderId: '695289', symbol: 'XAUUSD', trend: '平仓', tradeCmd: '卖出交易', handType: '标准手', lots: 0.01, price: 4334.1, pnlUsd: -0.7, storageFeeUsd: 0, commissionUsd: 0, remark: 'MT Order#1198023 MT Login#8300248' },
  { clientId: 999, agentId: null, mtAccount: '999001', mtType: '美分账户', platformTime: '2026-09-11 10:06:12', email: 'testline3@163.com', dealNo: '1181445', positionId: '684385', orderId: '684385', symbol: 'EURUSD', trend: '开仓', tradeCmd: '买入交易', handType: '美分手', lots: 0.2, price: 1.081, pnlUsd: 1.2, storageFeeUsd: -0.05, commissionUsd: 0.01, remark: '演示数据：交易记录' }
])

const handleRelationNodeClick = (node) => {
  selectedRelation.value = node
}

const applySearch = () => {
  applied.value = { ...form }
}

const resetSearch = () => {
  form.userType = 'all'
  form.mtAccount = ''
  form.email = ''
  form.dealNo = ''
  form.positionId = ''
  form.orderId = ''
  form.trend = 'all'
  form.tradeCmd = 'all'
  form.symbol = 'all'
  form.dateRange = []
  applied.value = { ...form }
}

const filteredRows = computed(() => {
  const scope = selectedRelation.value
  const filter = applied.value

  const mtKeyword = normalize(filter.mtAccount)
  const emailKeyword = normalize(filter.email)
  const dealKeyword = normalize(filter.dealNo)
  const positionKeyword = normalize(filter.positionId)
  const orderKeyword = normalize(filter.orderId)
  const userType = filter.userType || 'all'
  const trend = filter.trend || 'all'
  const cmd = filter.tradeCmd || 'all'
  const symbol = filter.symbol || 'all'

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

    if (userType !== 'all') {
      const isClient = row.agentId == null
      if (userType === 'client' && !isClient) return false
      if (userType === 'ib' && isClient) return false
    }

    if (mtKeyword && !normalize(row.mtAccount).includes(mtKeyword)) return false
    if (emailKeyword && !normalize(row.email).includes(emailKeyword)) return false
    if (dealKeyword && !normalize(row.dealNo).includes(dealKeyword)) return false
    if (positionKeyword && !normalize(row.positionId).includes(positionKeyword)) return false
    if (orderKeyword && !normalize(row.orderId).includes(orderKeyword)) return false

    if (trend !== 'all' && row.trend !== trend) return false
    if (cmd !== 'all' && row.tradeCmd !== cmd) return false
    if (symbol !== 'all' && row.symbol !== symbol) return false

    if (startDate && endDate) {
      const t = parseDate(String(row.platformTime || '').replace(' ', 'T'))
      if (!t) return false
      const startOk = t.getTime() >= startDate.getTime()
      const endOk = t.getTime() <= endDate.getTime() + 24 * 60 * 60 * 1000 - 1
      if (!startOk || !endOk) return false
    }

    return true
  })
})

const kpi = computed(() => {
  const rows = filteredRows.value
  const pnlSum = rows.reduce((s, r) => s + Number(r.pnlUsd || 0), 0)
  const standardLots = rows.filter((r) => String(r.handType || '').includes('标准')).reduce((s, r) => s + Number(r.lots || 0), 0)
  const centLots = rows.filter((r) => String(r.handType || '').includes('美分')).reduce((s, r) => s + Number(r.lots || 0), 0)
  return { pnlSum, standardLots, centLots }
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

const formatMoney = (v) => {
  const num = Number(v || 0)
  return num.toLocaleString(undefined, { minimumFractionDigits: 4, maximumFractionDigits: 4 })
}

const formatLots = (v) => {
  const num = Number(v || 0)
  return num.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

const formatPrice = (v) => {
  const num = Number(v || 0)
  return num.toLocaleString(undefined, { minimumFractionDigits: 4, maximumFractionDigits: 4 })
}
</script>
