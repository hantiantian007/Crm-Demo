<template>
  <div class="flex h-full bg-mainBg overflow-hidden">
    <div class="flex-1 flex flex-col min-w-0 bg-gray-50 overflow-hidden">
      <div class="flex-1 overflow-y-auto p-4 custom-scrollbar">
        <div class="w-full space-y-4">
          <div class="bg-gradient-to-r from-amber-50 via-white to-teal-50 rounded-xl border border-amber-100 shadow-sm overflow-hidden">
            <div class="px-6 py-5 border-b border-amber-100/60 flex flex-wrap items-center gap-4 justify-between">
              <div class="flex items-center gap-4">
                <div>
                  <h2 class="text-base font-bold text-gray-800 flex items-center gap-2">
                    {{ activity.name }}
                    <span class="inline-flex px-2.5 py-0.5 rounded-full text-[11px] font-medium status-running">
                      {{ activity.status }}
                    </span>
                  </h2>
                  <p class="text-xs text-gray-500 mt-0.5">
                    活动有效期：{{ activity.startAt }} 至 {{ activity.endAt }}
                  </p>
                </div>
              </div>
            </div>

            <div class="px-6 py-4 grid grid-cols-2 md:grid-cols-4 xl:grid-cols-6 gap-4">
              <div>
                <p class="text-xs text-gray-500 mb-1">活动名称</p>
                <p class="text-sm font-bold text-gray-800">{{ activity.name }}</p>
              </div>
              <div>
                <p class="text-xs text-gray-500 mb-1">活动编号</p>
                <p class="text-sm font-bold text-gray-800 font-mono">{{ activity.code }}</p>
              </div>
              <div>
                <p class="text-xs text-gray-500 mb-1">活动状态</p>
                <p class="text-sm font-bold text-gray-800">{{ activity.status }}</p>
              </div>
              <div>
                <p class="text-xs text-gray-500 mb-1">开始时间</p>
                <p class="text-sm font-bold text-gray-800 font-mono">{{ activity.startAt }}</p>
              </div>
              <div>
                <p class="text-xs text-gray-500 mb-1">结束时间</p>
                <p class="text-sm font-bold text-gray-800 font-mono">{{ activity.endAt }}</p>
              </div>
              <div>
                <p class="text-xs text-gray-500 mb-1">创建人</p>
                <p class="text-sm font-bold text-gray-800">{{ activity.creator }}</p>
              </div>
              <div>
                <p class="text-xs text-gray-500 mb-1">创建时间</p>
                <p class="text-sm font-bold text-gray-800 font-mono">{{ activity.createdAt }}</p>
              </div>
              <div>
                <p class="text-xs text-gray-500 mb-1">累计交易手数</p>
                <p class="text-sm font-bold text-gray-800 font-mono">{{ formatLots(activity.totalLots) }}</p>
              </div>
              <div>
                <p class="text-xs text-gray-500 mb-1">累计奖励金额</p>
                <p class="text-sm font-bold text-gray-800 font-mono">${{ formatMoney(activity.totalRewardAmount) }}</p>
              </div>
              <div>
                <p class="text-xs text-gray-500 mb-1">累计已释放金额</p>
                <p class="text-sm font-bold text-gray-800 font-mono">${{ formatMoney(activity.totalReleasedAmount) }}</p>
              </div>
              <div>
                <p class="text-xs text-gray-500 mb-1">活动净入金</p>
                <p class="text-sm font-bold text-gray-800 font-mono">${{ formatMoney(activity.netDeposit) }}</p>
              </div>
            </div>
          </div>

          <div class="bg-white rounded-xl shadow-sm border border-gray-100 flex flex-col min-h-[560px]">
            <div class="px-5 py-4 border-b border-gray-100 flex flex-wrap items-center justify-between gap-4">
              <div class="flex space-x-1 bg-gray-100/50 p-1 rounded-lg border border-gray-200/60">
                <button
                  class="px-4 py-1.5 text-sm font-medium rounded-md border border-transparent transition-all"
                  :class="activeTab === 'signup' ? 'bg-white text-gray-800 shadow-sm border-gray-200/50' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-200/50'"
                  type="button"
                  @click="activeTab = 'signup'"
                >
                  报名信息
                </button>
                <button
                  class="px-4 py-1.5 text-sm font-medium rounded-md border border-transparent transition-all"
                  :class="activeTab === 'orders' ? 'bg-white text-gray-800 shadow-sm border-gray-200/50' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-200/50'"
                  type="button"
                  @click="activeTab = 'orders'"
                >
                  活动订单信息
                </button>
              </div>
            </div>

            <div v-show="activeTab === 'signup'" class="flex-1 flex flex-col min-h-0">
              <div class="px-5 py-3 border-b border-gray-100 bg-gray-50/50">
                <div class="flex flex-wrap items-center gap-4 text-xs">
                  <div class="flex items-center gap-2">
                    <span class="text-gray-500">客户名称/邮箱:</span>
                    <el-input v-model="signupSearch.keyword" placeholder="搜索客户" clearable class="w-56" size="small" />
                  </div>
                  <div class="flex items-center gap-2">
                    <span class="text-gray-500">MT账号(模拟):</span>
                    <el-input v-model="signupSearch.demoMt" placeholder="模拟 MT 账号" clearable class="w-40" size="small" />
                  </div>
                  <div class="flex items-center gap-2">
                    <span class="text-gray-500">MT类型:</span>
                    <el-select v-model="signupSearch.mtType" placeholder="全部" clearable class="w-28" size="small">
                      <el-option label="MT4" value="MT4" />
                      <el-option label="MT5" value="MT5" />
                    </el-select>
                  </div>
                  <div class="flex items-center gap-2">
                    <span class="text-gray-500">是否结束体验:</span>
                    <el-select v-model="signupSearch.ended" placeholder="全部" clearable class="w-28" size="small">
                      <el-option label="是" value="是" />
                      <el-option label="否" value="否" />
                    </el-select>
                  </div>
                  <button class="bg-[#d1a84f] hover:bg-[#b89241] text-white px-4 py-1.5 rounded text-xs font-medium transition-colors" type="button">
                    搜索
                  </button>
                  <button class="bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 px-4 py-1.5 rounded text-xs font-medium transition-colors" type="button" @click="resetSignupSearch">
                    重置
                  </button>
                </div>
              </div>

              <div class="flex-1 p-0 overflow-hidden min-h-[320px]">
                <DataTable :data="filteredSignupRows" :total="filteredSignupRows.length" v-model:page="signupPage" v-model:limit="signupLimit">
                  <el-table-column label="客户姓名" min-width="120" fixed="left">
                    <template #default="{ row }">
                      <span class="font-medium text-gray-800">{{ row.customerName }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column label="客户邮箱" min-width="200">
                    <template #default="{ row }">
                      <span class="text-gray-600">{{ row.customerEmail }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column label="MT账号(模拟)" min-width="120">
                    <template #default="{ row }">
                      <span class="font-mono font-medium text-gray-800">{{ row.demoMtAccount }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column label="MT类型" min-width="90">
                    <template #default="{ row }">
                      <span class="inline-flex px-2 py-0.5 rounded-full text-[11px] font-medium border border-gray-200 bg-gray-50 text-gray-600">{{ row.mtType }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column label="注册时间" min-width="160">
                    <template #default="{ row }">
                      <span class="font-mono text-gray-600">{{ row.registeredAt }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column label="是否结束体验" min-width="120">
                    <template #default="{ row }">
                      <span class="text-gray-700">{{ row.endedExperience }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column label="账户余额(体验)" min-width="130" align="right">
                    <template #default="{ row }">
                      <span class="font-mono text-gray-700">${{ formatMoney(row.experienceBalance) }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column label="交易手数(体验)" min-width="130" align="right">
                    <template #default="{ row }">
                      <span class="font-mono text-gray-700">{{ formatLots(row.experienceLots) }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column label="盈利金额(体验)" min-width="130" align="right">
                    <template #default="{ row }">
                      <span class="font-mono text-gray-700">${{ formatMoney(row.experienceProfit) }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column label="是否开通真实账户" min-width="140">
                    <template #default="{ row }">
                      <span class="text-gray-700">{{ row.openedRealAccount }}</span>
                    </template>
                  </el-table-column>
                </DataTable>
              </div>
            </div>

            <div v-show="activeTab === 'orders'" class="flex-1 flex flex-col min-h-0">
              <div class="px-5 py-3 border-b border-gray-100 bg-gray-50/50">
                <div class="flex flex-wrap items-center gap-4 text-xs">
                  <div class="flex items-center gap-2">
                    <span class="text-gray-500">客户名称/邮箱:</span>
                    <el-input v-model="orderSearch.keyword" placeholder="搜索客户" clearable class="w-56" size="small" />
                  </div>
                  <div class="flex items-center gap-2">
                    <span class="text-gray-500">订单状态:</span>
                    <el-select v-model="orderSearch.status" placeholder="全部" clearable class="w-28" size="small">
                      <el-option label="已发放" value="已发放" />
                      <el-option label="待发放" value="待发放" />
                      <el-option label="已取消" value="已取消" />
                    </el-select>
                  </div>
                  <button class="bg-[#d1a84f] hover:bg-[#b89241] text-white px-4 py-1.5 rounded text-xs font-medium transition-colors" type="button">
                    搜索
                  </button>
                  <button class="bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 px-4 py-1.5 rounded text-xs font-medium transition-colors" type="button" @click="resetOrderSearch">
                    重置
                  </button>
                </div>
              </div>

              <div class="flex-1 p-0 overflow-hidden min-h-[320px]">
                <DataTable :data="filteredOrderRows" :total="filteredOrderRows.length" v-model:page="orderPage" v-model:limit="orderLimit">
                  <el-table-column label="订单号" min-width="160" fixed="left">
                    <template #default="{ row }">
                      <span class="font-mono text-gray-700">{{ row.orderNo }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column label="客户姓名" min-width="120">
                    <template #default="{ row }">
                      <span class="font-medium text-gray-800">{{ row.customerName }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column label="客户邮箱" min-width="200">
                    <template #default="{ row }">
                      <span class="text-gray-600">{{ row.customerEmail }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column label="下单时间" min-width="160">
                    <template #default="{ row }">
                      <span class="font-mono text-gray-600">{{ row.orderedAt }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column label="奖励金额" min-width="120" align="right">
                    <template #default="{ row }">
                      <span class="font-mono text-gray-700">${{ formatMoney(row.rewardAmount) }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column label="订单状态" min-width="120">
                    <template #default="{ row }">
                      <span class="text-gray-700">{{ row.status }}</span>
                    </template>
                  </el-table-column>
                </DataTable>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'
import DataTable from '@/components/DataTable.vue'

const activity = reactive({
  name: '先锋一号 50,000 USD 体验金活动',
  code: 'PIONEER-ONE-50000',
  status: '进行中',
  startAt: '2026-09-01 00:00:00',
  endAt: '2026-12-31 23:59:59',
  creator: '系统管理员',
  createdAt: '2026-08-28 16:20:00',
  totalLots: 1268.35,
  totalRewardAmount: 6200,
  totalReleasedAmount: 5200,
  netDeposit: 182350.2
})

const activeTab = ref('signup')

const signupSearch = reactive({
  keyword: '',
  demoMt: '',
  mtType: '',
  ended: ''
})
const signupPage = ref(1)
const signupLimit = ref(20)

const signupRows = ref([
  {
    customerName: '王建国',
    customerEmail: 'wangjianguo@example.com',
    demoMtAccount: 'DMT-8001023',
    mtType: 'MT5',
    registeredAt: '2026-09-02 09:12:10',
    endedExperience: '否',
    experienceBalance: 47652.32,
    experienceLots: 86.25,
    experienceProfit: 1234.5,
    openedRealAccount: '是'
  },
  {
    customerName: '李雪',
    customerEmail: 'lixue88@example.com',
    demoMtAccount: 'DMT-8001055',
    mtType: 'MT5',
    registeredAt: '2026-09-03 11:22:50',
    endedExperience: '否',
    experienceBalance: 50312.12,
    experienceLots: 35.2,
    experienceProfit: 512.2,
    openedRealAccount: '否'
  },
  {
    customerName: '陈大文',
    customerEmail: 'chen.dw@example.com',
    demoMtAccount: 'DMT-8001088',
    mtType: 'MT4',
    registeredAt: '2026-09-08 08:40:05',
    endedExperience: '是',
    experienceBalance: 0,
    experienceLots: 0,
    experienceProfit: -120.78,
    openedRealAccount: '否'
  }
])

const filteredSignupRows = computed(() => {
  const keyword = signupSearch.keyword.trim()
  const demoMt = signupSearch.demoMt.trim()
  const mtType = signupSearch.mtType
  const ended = signupSearch.ended

  return signupRows.value.filter(r => {
    const matchKeyword = !keyword || r.customerName.includes(keyword) || r.customerEmail.includes(keyword)
    const matchMt = !demoMt || r.demoMtAccount.includes(demoMt)
    const matchType = !mtType || r.mtType === mtType
    const matchEnded = !ended || r.endedExperience === ended
    return matchKeyword && matchMt && matchType && matchEnded
  })
})

const orderSearch = reactive({
  keyword: '',
  status: ''
})
const orderPage = ref(1)
const orderLimit = ref(20)

const orderRows = ref([
  {
    orderNo: 'PO-50000-000012',
    customerName: '王建国',
    customerEmail: 'wangjianguo@example.com',
    orderedAt: '2026-09-09 10:35:12',
    rewardAmount: 500,
    status: '已发放'
  },
  {
    orderNo: 'PO-50000-000023',
    customerName: '李雪',
    customerEmail: 'lixue88@example.com',
    orderedAt: '2026-09-12 16:22:40',
    rewardAmount: 300,
    status: '待发放'
  }
])

const filteredOrderRows = computed(() => {
  const keyword = orderSearch.keyword.trim()
  const status = orderSearch.status
  return orderRows.value.filter(r => {
    const matchKeyword = !keyword || r.customerName.includes(keyword) || r.customerEmail.includes(keyword)
    const matchStatus = !status || r.status === status
    return matchKeyword && matchStatus
  })
})

const resetSignupSearch = () => {
  signupSearch.keyword = ''
  signupSearch.demoMt = ''
  signupSearch.mtType = ''
  signupSearch.ended = ''
}

const resetOrderSearch = () => {
  orderSearch.keyword = ''
  orderSearch.status = ''
}

const formatMoney = (val) => {
  const num = Number(val) || 0
  return num.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

const formatLots = (val) => {
  const num = Number(val) || 0
  return num.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}
</script>

<style scoped>
.custom-scrollbar::-webkit-scrollbar { width: 6px; height: 6px; }
.custom-scrollbar::-webkit-scrollbar-thumb { background: #e5e7eb; border-radius: 4px; }
.custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
</style>

