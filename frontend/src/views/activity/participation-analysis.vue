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
            <div class="text-sm font-bold text-gray-800 mb-3">筛选</div>
            <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-12 gap-3 text-xs items-center">
              <div class="flex items-center gap-2 xl:col-span-3">
                <div class="text-gray-600 w-[84px] shrink-0 text-right">活动名称：</div>
                <el-select v-model="form.activityId" class="flex-1" placeholder="请选择">
                  <el-option v-for="a in activities" :key="a.id" :label="a.name" :value="a.id" />
                </el-select>
              </div>
              <div class="flex items-center gap-2 xl:col-span-3">
                <div class="text-gray-600 w-[84px] shrink-0 text-right">产品名称：</div>
                <el-select v-model="form.productName" class="flex-1" placeholder="全部产品">
                  <el-option label="全部产品" value="all" />
                  <el-option v-for="p in productOptions" :key="p" :label="p" :value="p" />
                </el-select>
              </div>
              <div class="flex items-center gap-2 xl:col-span-2">
                <div class="text-gray-600 w-[84px] shrink-0 text-right">活动状态：</div>
                <el-select v-model="form.activityStatus" class="flex-1" placeholder="全部">
                  <el-option v-for="o in activityStatusOptions" :key="o" :label="o" :value="o" />
                </el-select>
              </div>
              <div class="flex items-center gap-2 xl:col-span-4">
                <div class="text-gray-600 w-[84px] shrink-0 text-right">活动时间：</div>
                <el-date-picker
                  v-model="form.activityDateRange"
                  type="daterange"
                  range-separator="到"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  class="flex-1"
                />
              </div>
              <div class="flex items-center gap-2 xl:col-span-3">
                <div class="text-gray-600 w-[84px] shrink-0 text-right">达标状态：</div>
                <el-select v-model="form.achieveStatus" class="flex-1" placeholder="全部">
                  <el-option v-for="o in achieveStatusOptions" :key="o.value" :label="o.label" :value="o.value" />
                </el-select>
              </div>

              <div class="flex items-center gap-2 xl:col-span-8">
                <div class="text-gray-600 w-[84px] shrink-0 text-right">代理/客户/MT：</div>
                <el-input v-model="form.keyword" class="flex-1" placeholder="代理名称 / 客户名称 / MT账号" clearable />
              </div>
              <div class="flex items-center justify-end gap-3 xl:col-span-4">
                <button class="bg-white border border-gray-300 text-gray-600 hover:bg-gray-50 px-6 py-2 rounded text-xs transition-colors shadow-sm font-medium" @click="resetSearch">
                  重置
                </button>
                <button class="bg-white border border-primaryBtn text-primaryBtn hover:bg-primaryBtn hover:text-white px-6 py-2 rounded text-xs transition-colors shadow-sm font-medium" @click="applySearch">
                  查询
                </button>
              </div>
            </div>
          </div>

          <div class="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-8 gap-3">
            <div v-for="c in kpiCards" :key="c.key" class="rounded-lg shadow-sm border p-3 bg-white border-gray-100">
              <div class="text-[11px] text-gray-500">{{ c.label }}</div>
              <div class="mt-1 font-mono font-bold text-base text-gray-800">{{ c.value }}</div>
              <div v-if="c.sub" class="mt-0.5 text-[11px] text-gray-400">{{ c.sub }}</div>
            </div>
          </div>

          <div class="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
            <div class="flex items-center justify-between gap-3 flex-wrap">
              <div class="text-sm font-bold text-gray-800">产品维度统计</div>
            </div>

            <div class="mt-3 overflow-x-auto no-scrollbar">
              <DataTable :data="productDisplayRows" :total="productRows.length" v-model:page="productPage" v-model:limit="productLimit" @change="handleProductPageChange">
                <el-table-column prop="productName" label="产品名称" min-width="180" show-overflow-tooltip />
                <el-table-column prop="signupCustomers" label="报名客户数" width="110" align="right" />
                <el-table-column prop="validCustomers" label="有效参与客户数" width="130" align="right" />
                <el-table-column prop="achievedCustomers" label="达标客户数" width="110" align="right" />
                <el-table-column prop="achievedRateText" label="达标率" width="100" align="right" />
                <el-table-column prop="netDeposit" label="活动净入金" width="130" align="right">
                  <template #default="{ row }">
                    <span class="font-mono">{{ formatMoney(row.netDeposit) }}</span>
                  </template>
                </el-table-column>
                <el-table-column prop="lots" label="交易手数" width="110" align="right">
                  <template #default="{ row }">
                    <span class="font-mono">{{ formatLots(row.lots) }}</span>
                  </template>
                </el-table-column>
                <el-table-column prop="activeCustomers" label="活跃客户数" width="110" align="right" />
                <el-table-column prop="rewardDisplay" label="奖励/权益发放" min-width="160" show-overflow-tooltip />
                <el-table-column prop="agentCount" label="关联代理数" width="110" align="right" />
                <el-table-column label="操作" width="110" fixed="right">
                  <template #default="{ row }">
                    <button class="bg-white border border-primaryBtn text-primaryBtn hover:bg-primaryBtn hover:text-white px-3 py-1.5 rounded text-xs transition-colors shadow-sm font-medium" type="button" @click="openProductAgent(row.productName)">
                      查看代理
                    </button>
                  </template>
                </el-table-column>
              </DataTable>
            </div>
          </div>

          <el-drawer v-model="productAgentVisible" direction="rtl" size="78%" :title="productAgentTitle">
            <div class="h-full w-full flex flex-col gap-4">
              <div class="bg-white rounded-lg border border-gray-100 p-4">
                <div class="text-sm font-bold text-gray-800">代理表现</div>
                <div class="mt-2 text-xs text-gray-500 flex flex-wrap gap-x-5 gap-y-1">
                  <div>活动：<span class="font-medium text-gray-700">{{ currentActivity?.name || '-' }}</span></div>
                  <div>产品：<span class="font-medium text-gray-700">{{ selectedProductName || '全部产品' }}</span></div>
                  <div>奖励/权益：<span class="font-medium text-gray-700">{{ rewardText }}</span></div>
                </div>
              </div>

              <div class="bg-white rounded-lg border border-gray-100 overflow-hidden flex-1 flex flex-col">
                <DataTable :data="agentDisplayRows" :total="agentRowsSorted.length" v-model:page="agentPage" v-model:limit="agentLimit" @change="handleAgentPageChange">
                  <el-table-column prop="agentName" label="代理名称" min-width="160" show-overflow-tooltip />
                  <el-table-column prop="level" label="代理层级" width="90" />
                  <el-table-column prop="parentName" label="上级代理" min-width="140" show-overflow-tooltip />
                  <el-table-column prop="eligibleCustomers" label="伞下符合条件客户数" width="150" align="right" />
                  <el-table-column prop="signupCustomers" label="报名客户数" width="110" align="right" />
                  <el-table-column prop="validCustomers" label="有效参与客户数" width="130" align="right" />
                  <el-table-column prop="participationRateText" label="参与率" width="100" align="right" />
                  <el-table-column prop="achievedCustomers" label="达标客户数" width="110" align="right" />
                  <el-table-column prop="achievedRateText" label="达标率" width="100" align="right" />
                  <el-table-column prop="netDeposit" label="活动净入金" width="130" align="right">
                    <template #default="{ row }">
                      <span class="font-mono">{{ formatMoney(row.netDeposit) }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column prop="lots" label="交易手数" width="110" align="right">
                    <template #default="{ row }">
                      <span class="font-mono">{{ formatLots(row.lots) }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column prop="activeCustomers" label="活跃客户数" width="110" align="right" />
                  <el-table-column label="操作" width="110" fixed="right">
                    <template #default="{ row }">
                      <button class="bg-white border border-primaryBtn text-primaryBtn hover:bg-primaryBtn hover:text-white px-3 py-1.5 rounded text-xs transition-colors shadow-sm font-medium" type="button" @click="openAgentCustomer(row.agentId)">
                        查看客户
                      </button>
                    </template>
                  </el-table-column>
                </DataTable>
              </div>
            </div>
          </el-drawer>

          <el-drawer v-model="agentCustomerVisible" direction="rtl" size="78%" :title="agentCustomerTitle">
            <div class="h-full w-full flex flex-col gap-4">
              <div class="bg-white rounded-lg border border-gray-100 p-4">
                <div class="text-sm font-bold text-gray-800">客户明细</div>
                <div class="mt-2 text-xs text-gray-500 flex flex-wrap gap-x-5 gap-y-1">
                  <div>活动：<span class="font-medium text-gray-700">{{ currentActivity?.name || '-' }}</span></div>
                  <div>产品：<span class="font-medium text-gray-700">{{ selectedProductName || '全部产品' }}</span></div>
                  <div>代理：<span class="font-medium text-gray-700">{{ selectedAgentName || '-' }}</span></div>
                </div>
              </div>

              <div class="bg-white rounded-lg border border-gray-100 overflow-hidden flex-1 flex flex-col">
                <DataTable :data="customerDisplayRows" :total="customerRows.length" v-model:page="customerPage" v-model:limit="customerLimit" @change="handleCustomerPageChange">
                  <el-table-column prop="customerName" label="客户姓名" min-width="140" show-overflow-tooltip />
                  <el-table-column prop="mtAccount" label="MT账号" width="120" />
                  <el-table-column prop="agentName" label="所属代理" min-width="140" show-overflow-tooltip />
                  <el-table-column prop="productName" label="产品名称" min-width="140" show-overflow-tooltip />
                  <el-table-column prop="signupAt" label="报名时间" width="170" />
                  <el-table-column prop="approvedAt" label="审核通过时间" width="170" />
                  <el-table-column prop="participationStatus" label="参与状态" width="120" />
                  <el-table-column prop="achievedStatus" label="达标状态" width="110" />
                  <el-table-column label="达标进度" min-width="280">
                    <template #default="{ row }">
                      <div class="flex flex-col gap-0.5">
                        <div class="text-[11px] text-gray-500">{{ row.progressSummary }}</div>
                        <div class="text-[11px] text-gray-500">{{ row.progressDetail }}</div>
                        <div class="text-[11px] text-gray-400">{{ row.progressPctText }}</div>
                      </div>
                    </template>
                  </el-table-column>
                  <el-table-column prop="netDeposit" label="活动净入金" width="130" align="right">
                    <template #default="{ row }">
                      <span class="font-mono">{{ formatMoney(row.netDeposit) }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column prop="lots" label="交易手数" width="110" align="right">
                    <template #default="{ row }">
                      <span class="font-mono">{{ formatLots(row.lots) }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column prop="rewardStatus" label="奖励/权益状态" min-width="140" show-overflow-tooltip />
                  <el-table-column prop="updatedAt" label="最后更新时间" width="170" />
                </DataTable>
              </div>
            </div>
          </el-drawer>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, reactive, ref, watch } from 'vue'
import RelationTree from '@/components/RelationTree.vue'
import DataTable from '@/components/DataTable.vue'
import { relationTreeDemoData } from '@/mocks/relation-tree-demo'

const relationTreeData = computed(() => relationTreeDemoData)

const activities = ref([
  {
    id: 'pcard',
    name: 'Pcard活动',
    status: '进行中',
    startAt: '2026-01-01',
    endAt: '2026-12-31',
    reward: { type: 'bonus', plan: 2000, released: 800 },
    products: [
      { name: '标准账户', targets: { netDeposit: 10000, lots: 50 } },
      { name: '美分账户', targets: { netDeposit: 8000, lots: 35 } }
    ]
  },
  {
    id: 'pioneer1',
    name: '先锋一号 50,000 USD 体验金活动',
    status: '已结束',
    startAt: '2026-06-01',
    endAt: '2026-08-15',
    reward: { type: 'cash', amount: 5000 },
    products: [
      { name: '标准账户', targets: { netDeposit: 20000, lots: 80 } },
      { name: '美分账户', targets: { netDeposit: 15000, lots: 60 } }
    ]
  },
  {
    id: 'training',
    name: '交易训练营（无奖励示例）',
    status: '进行中',
    startAt: '2026-09-01',
    endAt: '2026-10-15',
    reward: { type: 'none' },
    products: [
      { name: '标准账户', targets: { netDeposit: 8000, lots: 35 } },
      { name: '美分账户', targets: { netDeposit: 5000, lots: 20 } }
    ]
  },
  {
    id: 'gift',
    name: 'VIP 资格赛（实物/资格权益示例）',
    status: '进行中',
    startAt: '2026-09-05',
    endAt: '2026-11-30',
    reward: { type: 'gift', issuedCount: 12 },
    products: [
      { name: '标准账户', targets: { netDeposit: 15000, lots: 60 } },
      { name: '美分账户', targets: { netDeposit: 10000, lots: 40 } }
    ]
  }
])

const activityStatusOptions = ['全部', '进行中', '已结束']
const achieveStatusOptions = [
  { label: '全部', value: 'all' },
  { label: '已达标', value: 'achieved' },
  { label: '未达标', value: 'not_achieved' }
]

const getActivityById = (id) => activities.value.find((a) => a.id === id) || activities.value[0] || null

const currentActivityForForm = computed(() => getActivityById(form.activityId))

const productOptions = computed(() => {
  const list = currentActivityForForm.value?.products || []
  return list.map((p) => p.name)
})

const form = reactive({
  activityId: activities.value[0]?.id || '',
  productName: 'all',
  activityStatus: '全部',
  activityDateRange: [],
  keyword: '',
  achieveStatus: 'all'
})

const applied = ref({ ...form })
const selectedRelation = ref(null)

const normalize = (v) => String(v ?? '').trim().toLowerCase()

const parseDate = (d) => {
  if (!d) return null
  const dt = new Date(d)
  return Number.isNaN(dt.getTime()) ? null : dt
}

const handleRelationNodeClick = (node) => {
  selectedRelation.value = node
}

const applySearch = () => {
  applied.value = { ...form }
}

const resetSearch = () => {
  form.activityId = activities.value[0]?.id || ''
  form.productName = 'all'
  form.activityStatus = '全部'
  form.activityDateRange = []
  form.keyword = ''
  form.achieveStatus = 'all'
  applied.value = { ...form }
}

watch(
  () => form.activityId,
  () => {
    form.productName = 'all'
    applySearch()
  }
)

const agentMeta = computed(() => {
  const roots = relationTreeData.value || []
  const map = new Map()

  const walk = (node, parent, depth) => {
    if (!node) return
    if (node.type === 'ib') {
      map.set(node.id, {
        id: node.id,
        label: node.label,
        agentName: String(node.label || '').split('-').slice(1).join('-') || node.label,
        parentId: parent?.id ?? null,
        parentName: parent ? (String(parent.label || '').split('-').slice(1).join('-') || parent.label) : '-',
        level: depth
      })
    }
    const children = Array.isArray(node.children) ? node.children : []
    for (const ch of children) walk(ch, node.type === 'ib' ? node : parent, node.type === 'ib' ? depth + 1 : depth)
  }

  for (const r of roots) walk(r, null, 1)
  return map
})

const clientMeta = computed(() => {
  const roots = relationTreeData.value || []
  const clients = new Map()

  const walk = (node, currentAgent) => {
    if (!node) return
    if (node.type === 'client') {
      const name = String(node.label || '').split('-').slice(1).join('-') || node.label
      clients.set(node.id, {
        clientId: node.id,
        customerName: name,
        mtAccount: node.mtAccount || '',
        agentId: currentAgent?.id ?? null,
        agentName: currentAgent ? (String(currentAgent.label || '').split('-').slice(1).join('-') || currentAgent.label) : '-'
      })
    }
    const children = Array.isArray(node.children) ? node.children : []
    for (const ch of children) walk(ch, node.type === 'ib' ? node : currentAgent)
  }

  for (const r of roots) walk(r, null)
  return clients
})

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

const allParticipations = ref([
  { activityId: 'pcard', productName: '标准账户', clientId: 70, signupAt: '2026-09-02 10:15:00', approvedAt: '2026-09-02 11:20:00', achieved: true, netDeposit: 12000, lots: 55, activeDays: 9, updatedAt: '2026-09-10 18:20:10', rewardStatus: '已释放 $800' },
  { activityId: 'pcard', productName: '美分账户', clientId: 70, signupAt: '2026-09-02 10:15:00', approvedAt: '2026-09-02 11:20:00', achieved: false, netDeposit: 2000, lots: 10, activeDays: 4, updatedAt: '2026-09-10 18:20:10', rewardStatus: '应发 $2000' },
  { activityId: 'pcard', productName: '标准账户', clientId: 319, signupAt: '2026-09-03 09:12:00', approvedAt: '2026-09-03 10:02:00', achieved: false, netDeposit: 8000, lots: 35, activeDays: 6, updatedAt: '2026-09-10 09:40:00', rewardStatus: '应发 $2000' },
  { activityId: 'pcard', productName: '美分账户', clientId: 319, signupAt: '2026-09-03 09:12:00', approvedAt: '2026-09-03 10:02:00', achieved: true, netDeposit: 9000, lots: 42, activeDays: 7, updatedAt: '2026-09-10 09:40:00', rewardStatus: '已释放 $800' },
  { activityId: 'pcard', productName: '标准账户', clientId: 329, signupAt: '2026-09-05 14:30:00', approvedAt: null, achieved: false, netDeposit: 0, lots: 0, activeDays: 0, updatedAt: '2026-09-05 14:30:00', rewardStatus: '待审核' },

  { activityId: 'pioneer1', productName: '标准账户', clientId: 70, signupAt: '2026-06-12 08:00:00', approvedAt: '2026-06-12 08:30:00', achieved: true, netDeposit: 26000, lots: 92, activeDays: 14, updatedAt: '2026-08-10 16:10:00', rewardStatus: '资金奖励 $5000 已发放' },
  { activityId: 'pioneer1', productName: '美分账户', clientId: 319, signupAt: '2026-06-20 09:10:00', approvedAt: '2026-06-20 09:40:00', achieved: false, netDeposit: 12000, lots: 40, activeDays: 8, updatedAt: '2026-08-12 12:00:00', rewardStatus: '资金奖励 $5000 已发放' },

  { activityId: 'training', productName: '标准账户', clientId: 319, signupAt: '2026-09-06 11:00:00', approvedAt: '2026-09-06 11:10:00', achieved: true, netDeposit: 8200, lots: 40, activeDays: 5, updatedAt: '2026-09-12 10:10:00', rewardStatus: '无奖励' },
  { activityId: 'training', productName: '美分账户', clientId: 999, signupAt: '2026-09-06 12:20:00', approvedAt: '2026-09-06 13:05:00', achieved: false, netDeposit: 2000, lots: 10, activeDays: 2, updatedAt: '2026-09-12 12:20:00', rewardStatus: '无奖励' },

  { activityId: 'gift', productName: '标准账户', clientId: 70, signupAt: '2026-09-06 09:00:00', approvedAt: '2026-09-06 09:10:00', achieved: true, netDeposit: 15000, lots: 60, activeDays: 7, updatedAt: '2026-09-13 09:30:00', rewardStatus: '权益已发放' },
  { activityId: 'gift', productName: '美分账户', clientId: 319, signupAt: '2026-09-06 09:05:00', approvedAt: '2026-09-06 09:15:00', achieved: false, netDeposit: 7000, lots: 22, activeDays: 4, updatedAt: '2026-09-13 11:00:00', rewardStatus: '待发放' }
])

const currentActivity = computed(() => getActivityById(applied.value.activityId))

const rewardText = computed(() => {
  const r = currentActivity.value?.reward
  if (!r || r.type === 'none') return '无奖励'
  if (r.type === 'cash') return `$${formatMoney(r.amount)}`
  if (r.type === 'bonus') return `应发 $${formatMoney(r.plan)} / 已释放 $${formatMoney(r.released)}`
  if (r.type === 'gift') return `已发放 ${formatInt(r.issuedCount)} 人`
  return '无奖励'
})

const scopedClientIds = computed(() => {
  const scope = selectedRelation.value
  const allClients = Array.from(clientMeta.value.keys())
  if (!scope) return allClients
  if (scope.type === 'client') return [Number(scope.id)]
  if (scope.type === 'ib') {
    const ids = relationScopes.value.get(scope.id) || []
    return ids.length ? ids.map((v) => Number(v)) : []
  }
  return allClients
})

const baseParticipations = computed(() => {
  const filter = applied.value
  const keyword = normalize(filter.keyword)
  const achieveStatus = filter.achieveStatus

  const status = filter.activityStatus
  const [start, end] = Array.isArray(filter.activityDateRange) ? filter.activityDateRange : []
  const startDate = parseDate(start)
  const endDate = parseDate(end)

  return allParticipations.value
    .filter((row) => row.activityId === filter.activityId)
    .filter((row) => scopedClientIds.value.includes(Number(row.clientId)))
    .filter(() => {
      if (status === '全部') return true
      return (currentActivity.value?.status || '') === status
    })
    .filter(() => {
      if (!startDate || !endDate) return true
      const aStart = parseDate(String(currentActivity.value?.startAt || '').replace(' ', 'T'))
      const aEnd = parseDate(String(currentActivity.value?.endAt || '').replace(' ', 'T'))
      if (!aStart || !aEnd) return true
      return aEnd.getTime() >= startDate.getTime() && aStart.getTime() <= endDate.getTime()
    })
    .filter((row) => {
      if (achieveStatus === 'all') return true
      if (!row.approvedAt) return false
      return achieveStatus === 'achieved' ? !!row.achieved : !row.achieved
    })
    .filter((row) => {
      if (!keyword) return true
      const cm = clientMeta.value.get(row.clientId)
      const fields = [cm?.customerName, cm?.agentName, cm?.mtAccount].map((v) => normalize(v))
      return fields.some((s) => s.includes(keyword))
    })
})

const metric = (rows) => {
  const setCount = (predicate) => {
    const ids = new Set()
    for (const r of rows) {
      if (!predicate(r)) continue
      ids.add(Number(r.clientId))
    }
    return ids.size
  }

  const signupCustomers = setCount((r) => !!r.signupAt)
  const validCustomers = setCount((r) => !!r.approvedAt)
  const achievedCustomers = setCount((r) => !!r.approvedAt && !!r.achieved)
  const netDeposit = rows.reduce((s, r) => s + Number(r.netDeposit || 0), 0)
  const lots = rows.reduce((s, r) => s + Number(r.lots || 0), 0)
  const activeCustomers = setCount((r) => !!r.approvedAt && Number(r.activeDays || 0) > 0)
  const achievedRate = validCustomers ? achievedCustomers / validCustomers : null

  return {
    signupCustomers,
    validCustomers,
    achievedCustomers,
    achievedRate,
    netDeposit,
    lots,
    activeCustomers
  }
}

const productScopedParticipations = computed(() => {
  const p = applied.value.productName
  if (!p || p === 'all') return baseParticipations.value
  return baseParticipations.value.filter((row) => row.productName === p)
})

const summary = computed(() => metric(productScopedParticipations.value))

const kpiCards = computed(() => {
  const t = summary.value
  return [
    { key: 'signupCustomers', label: '报名客户数', value: formatInt(t.signupCustomers) },
    { key: 'validCustomers', label: '有效参与客户数', value: formatInt(t.validCustomers), sub: '审核通过才算参与' },
    { key: 'achievedCustomers', label: '达标客户数', value: formatInt(t.achievedCustomers) },
    { key: 'achievedRate', label: '达标率', value: formatPercentOrDash(t.achievedRate) },
    { key: 'netDeposit', label: '活动净入金', value: formatMoney(t.netDeposit) },
    { key: 'lots', label: '交易手数', value: formatLots(t.lots) },
    { key: 'activeCustomers', label: '活跃客户数', value: formatInt(t.activeCustomers) },
    { key: 'reward', label: '奖励/权益发放', value: rewardText.value }
  ]
})

const productRows = computed(() => {
  const raw = baseParticipations.value
  const selected = applied.value.productName
  const list = []
  const groups = new Map()

  for (const r of raw) {
    if (selected && selected !== 'all' && r.productName !== selected) continue
    const key = r.productName || '-'
    const arr = groups.get(key) || []
    arr.push(r)
    groups.set(key, arr)
  }

  for (const [productName, rows] of groups.entries()) {
    const m = metric(rows)
    const agents = new Set()
    for (const r of rows) {
      const cm = clientMeta.value.get(r.clientId)
      if (cm?.agentId) agents.add(cm.agentId)
    }
    list.push({
      productName,
      ...m,
      achievedRateText: formatPercentOrDash(m.achievedRate),
      rewardDisplay: rewardText.value,
      agentCount: agents.size
    })
  }

  list.sort((a, b) => {
    const ar = a.achievedRate == null ? -1 : a.achievedRate
    const br = b.achievedRate == null ? -1 : b.achievedRate
    if (br !== ar) return br - ar
    return b.validCustomers - a.validCustomers
  })

  return list
})

const productPage = ref(1)
const productLimit = ref(20)

const productDisplayRows = computed(() => {
  const start = (productPage.value - 1) * productLimit.value
  return productRows.value.slice(start, start + productLimit.value)
})

const handleProductPageChange = () => {
}

watch(
  () => [applied.value.activityId, applied.value.productName, selectedRelation.value, applied.value.keyword, applied.value.achieveStatus, applied.value.activityStatus, applied.value.activityDateRange],
  () => {
    productPage.value = 1
  },
  { deep: true }
)

const selectedProductName = ref('')
const productAgentVisible = ref(false)

const openProductAgent = (productName) => {
  selectedProductName.value = productName
  productAgentVisible.value = true
  agentPage.value = 1
}

const productAgentTitle = computed(() => {
  const p = selectedProductName.value || '全部产品'
  return `代理表现 - ${p}`
})

const agentParticipations = computed(() => {
  const p = selectedProductName.value
  return p ? baseParticipations.value.filter((row) => row.productName === p) : productScopedParticipations.value
})

const umbrellaIntersect = (umbrella, scopeIds) => {
  const set = new Set(scopeIds.map((v) => Number(v)))
  return umbrella.filter((id) => set.has(Number(id)))
}

const agentRows = computed(() => {
  const list = []
  for (const [agentId, meta] of agentMeta.value.entries()) {
    const umbrellaClientIds = relationScopes.value.get(agentId) || []
    const intersect = umbrellaIntersect(umbrellaClientIds, scopedClientIds.value)
    if (!intersect.length) continue

    const rows = agentParticipations.value.filter((r) => intersect.includes(Number(r.clientId)))
    if (!rows.length) continue

    const eligibleCustomers = intersect.length
    const m = metric(rows)
    const participationRate = eligibleCustomers ? m.validCustomers / eligibleCustomers : null

    list.push({
      agentId,
      agentName: meta.agentName,
      level: meta.level,
      parentName: meta.parentName,
      eligibleCustomers,
      signupCustomers: m.signupCustomers,
      validCustomers: m.validCustomers,
      participationRateText: formatPercentOrDash(participationRate),
      achievedCustomers: m.achievedCustomers,
      achievedRateText: formatPercentOrDash(m.achievedRate),
      netDeposit: m.netDeposit,
      lots: m.lots,
      activeCustomers: m.activeCustomers
    })
  }

  list.sort((a, b) => {
    const ar = a.achievedRateText === '-' ? -1 : Number(String(a.achievedRateText).replace('%', '')) / 100
    const br = b.achievedRateText === '-' ? -1 : Number(String(b.achievedRateText).replace('%', '')) / 100
    if (br !== ar) return br - ar
    return b.validCustomers - a.validCustomers
  })

  return list
})

const agentRowsSorted = computed(() => agentRows.value)

const agentPage = ref(1)
const agentLimit = ref(20)

const agentDisplayRows = computed(() => {
  const start = (agentPage.value - 1) * agentLimit.value
  return agentRowsSorted.value.slice(start, start + agentLimit.value)
})

const handleAgentPageChange = () => {
}

watch(
  () => [selectedProductName.value, applied.value.activityId, selectedRelation.value, applied.value.keyword, applied.value.achieveStatus, applied.value.activityStatus, applied.value.activityDateRange],
  () => {
    agentPage.value = 1
  },
  { deep: true }
)

const selectedAgentId = ref(null)
const selectedAgentName = computed(() => {
  if (!selectedAgentId.value) return ''
  const meta = agentMeta.value.get(selectedAgentId.value)
  return meta?.agentName || ''
})

const agentCustomerVisible = ref(false)

const openAgentCustomer = (agentId) => {
  selectedAgentId.value = agentId
  agentCustomerVisible.value = true
  customerPage.value = 1
}

const agentCustomerTitle = computed(() => {
  const p = selectedProductName.value || '全部产品'
  const a = selectedAgentName.value || '-'
  return `客户明细 - ${p} - ${a}`
})

const findProductTarget = (activity, productName) => {
  const list = activity?.products || []
  const item = list.find((p) => p.name === productName) || list[0] || null
  return item?.targets || { netDeposit: 0, lots: 0 }
}

const targets = computed(() => findProductTarget(currentActivity.value, selectedProductName.value))

const customerRows = computed(() => {
  const rows = agentParticipations.value
  const keyword = normalize(applied.value.keyword)
  const result = []
  const agentId = selectedAgentId.value
  if (!agentId) return []

  const umbrellaClients = relationScopes.value.get(agentId) || []
  const allowedClientIds = new Set(umbrellaIntersect(umbrellaClients, scopedClientIds.value).map((v) => Number(v)))

  for (const r of rows) {
    const cm = clientMeta.value.get(r.clientId)
    if (!cm) continue
    if (!allowedClientIds.has(Number(r.clientId))) continue
    if (keyword) {
      const fields = [cm.customerName, cm.agentName, cm.mtAccount].map((v) => normalize(v))
      if (!fields.some((s) => s.includes(keyword))) continue
    }

    const participationStatus = r.approvedAt ? '已参与' : r.signupAt ? '已报名(待审核)' : '未报名'
    const achievedStatus = r.approvedAt ? (r.achieved ? '已达标' : '未达标') : '-'

    const pctDeposit = targets.value.netDeposit ? Math.min(100, Math.round((Number(r.netDeposit || 0) / targets.value.netDeposit) * 100)) : 0
    const pctLots = targets.value.lots ? Math.min(100, Math.round((Number(r.lots || 0) / targets.value.lots) * 100)) : 0
    const pct = Math.max(pctDeposit, pctLots)

    result.push({
      ...cm,
      productName: r.productName || '-',
      signupAt: r.signupAt || '-',
      approvedAt: r.approvedAt || '-',
      participationStatus,
      achievedStatus,
      netDeposit: Number(r.netDeposit || 0),
      lots: Number(r.lots || 0),
      rewardStatus: currentActivity.value?.reward?.type === 'none' ? '无奖励' : r.rewardStatus || '-',
      updatedAt: r.updatedAt || '-',
      progressSummary: `已完成 ${pct}%`,
      progressDetail: `净入金 ${formatMoney(r.netDeposit)} / ${formatMoney(targets.value.netDeposit)}，交易 ${formatLots(r.lots)} / ${formatLots(targets.value.lots)} Lot`,
      progressPctText: `净入金 ${pctDeposit}% / 交易 ${pctLots}%`
    })
  }

  return result
})

const customerPage = ref(1)
const customerLimit = ref(20)

const customerDisplayRows = computed(() => {
  const start = (customerPage.value - 1) * customerLimit.value
  return customerRows.value.slice(start, start + customerLimit.value)
})

const handleCustomerPageChange = () => {
}

const formatInt = (v) => Number(v || 0).toLocaleString()

const formatMoney = (v) => {
  const num = Number(v || 0)
  return num.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

const formatLots = (v) => {
  const num = Number(v || 0)
  return num.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

const formatPercentOrDash = (v) => {
  if (v == null) return '-'
  const num = Number(v || 0)
  if (!Number.isFinite(num)) return '-'
  return `${(num * 100).toFixed(2)}%`
}
</script>
