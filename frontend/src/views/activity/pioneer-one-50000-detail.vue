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
                <p class="text-xs text-gray-500 mb-1">已完成达标交易手数</p>
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
                <p class="text-xs text-gray-500 mb-1">累计净入金</p>
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
                    <span class="text-gray-500">客户姓名:</span>
                    <el-input v-model="signupSearch.customerName" placeholder="客户姓名" clearable class="w-40" size="small" />
                  </div>
                  <div class="flex items-center gap-2">
                    <span class="text-gray-500">客户邮箱:</span>
                    <el-input v-model="signupSearch.customerEmail" placeholder="客户邮箱" clearable class="w-56" size="small" />
                  </div>
                  <div class="flex items-center gap-2">
                    <span class="text-gray-500">MT账号:</span>
                    <el-input v-model="signupSearch.mtAccount" placeholder="MT账号" clearable class="w-40" size="small" />
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
                  <el-table-column label="MT账号" min-width="120">
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
                  <el-table-column label="是否结束活动" min-width="120">
                    <template #default="{ row }">
                      <span class="text-gray-700">{{ row.endedExperience }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column label="账户余额（$）" min-width="130" align="right">
                    <template #default="{ row }">
                      <span class="font-mono text-gray-700">${{ formatMoney(row.experienceBalance) }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column label="交易手数" min-width="130" align="right">
                    <template #default="{ row }">
                      <span class="font-mono text-gray-700">{{ formatLots(row.experienceLots) }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column label="盈利金额（$）" min-width="130" align="right">
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
                    <span class="text-gray-500">客户姓名:</span>
                    <el-input v-model="orderSearch.customerName" placeholder="客户姓名" clearable class="w-40" size="small" />
                  </div>
                  <div class="flex items-center gap-2">
                    <span class="text-gray-500">客户邮箱:</span>
                    <el-input v-model="orderSearch.customerEmail" placeholder="客户邮箱" clearable class="w-56" size="small" />
                  </div>
                  <div class="flex items-center gap-2">
                    <span class="text-gray-500">MT账号:</span>
                    <el-input v-model="orderSearch.mtAccount" placeholder="MT账号" clearable class="w-40" size="small" />
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
                  <el-table-column label="MT账号" min-width="120">
                    <template #default="{ row }">
                      <span class="font-mono font-medium text-gray-800">{{ row.mtAccount }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column label="盈利金额" min-width="120" align="right">
                    <template #default="{ row }">
                      <span class="font-mono text-gray-700">${{ formatUsd4(row.profitAmount) }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column label="奖励金额" min-width="120" align="right">
                    <template #default="{ row }">
                      <span class="font-mono text-gray-700">${{ formatUsd4(row.rewardAmount) }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column label="交易手数" min-width="120" align="right">
                    <template #default="{ row }">
                      <span class="font-mono text-gray-700">{{ formatLots(row.tradeLots) }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column label="总入金" min-width="120" align="right">
                    <template #default="{ row }">
                      <span class="font-mono text-gray-700">${{ formatUsd4(row.totalDeposit) }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column label="总出金" min-width="120" align="right">
                    <template #default="{ row }">
                      <span class="font-mono text-gray-700">${{ formatUsd4(row.totalWithdraw) }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column label="净入金" min-width="120" align="right">
                    <template #default="{ row }">
                      <span class="font-mono text-gray-700">${{ formatUsd4(row.netDeposit) }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column label="释放比例" min-width="110" align="right">
                    <template #default="{ row }">
                      <span class="font-mono text-gray-700">{{ formatPercent(row.releaseRatio) }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column label="是否释放" min-width="110">
                    <template #default="{ row }">
                      <span class="text-gray-700">{{ row.released ? '是' : '否' }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column label="释放时间" min-width="160">
                    <template #default="{ row }">
                      <span class="font-mono text-gray-600">{{ row.released ? row.releasedAt : '-' }}</span>
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
import { ref, reactive, computed, watch } from 'vue'
import { useRoute } from 'vue-router'
import DataTable from '@/components/DataTable.vue'

const route = useRoute()
const activityId = computed(() => {
  const raw = Array.isArray(route.query.activity) ? route.query.activity[0] : route.query.activity
  return String(raw || 'pioneer-one-50000')
})

const getActivityById = (id) => {
  if (id === 'pioneer-one-50000') {
    return {
      id,
      name: '先锋一号 50,000 USD 活动',
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
    }
  }
  return {
    id,
    name: '先锋一号 50,000 USD 活动',
    code: String(id || ''),
    status: '进行中',
    startAt: '2026-09-01 00:00:00',
    endAt: '2026-12-31 23:59:59',
    creator: '系统管理员',
    createdAt: '2026-08-28 16:20:00',
    totalLots: 0,
    totalRewardAmount: 0,
    totalReleasedAmount: 0,
    netDeposit: 0
  }
}

const activity = reactive(getActivityById(activityId.value))

watch(
  () => activityId.value,
  (id) => {
    Object.assign(activity, getActivityById(id))
  }
)

const activeTab = ref('signup')

const signupSearch = reactive({
  customerName: '',
  customerEmail: '',
  mtAccount: ''
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
  },
  {
    customerName: '赵子涵',
    customerEmail: 'zhaozihan@example.com',
    demoMtAccount: 'DMT-8001120',
    mtType: 'MT5',
    registeredAt: '2026-09-15 14:05:31',
    endedExperience: '否',
    experienceBalance: 49820.66,
    experienceLots: 12.5,
    experienceProfit: 86.42,
    openedRealAccount: '是'
  }
])

const filteredSignupRows = computed(() => {
  const customerName = signupSearch.customerName.trim()
  const customerEmail = signupSearch.customerEmail.trim()
  const mtAccount = signupSearch.mtAccount.trim()

  return signupRows.value.filter(r => {
    const matchName = !customerName || r.customerName.includes(customerName)
    const matchEmail = !customerEmail || r.customerEmail.includes(customerEmail)
    const matchMt = !mtAccount || r.demoMtAccount.includes(mtAccount)
    return matchName && matchEmail && matchMt
  })
})

const orderSearch = reactive({
  customerName: '',
  customerEmail: '',
  mtAccount: ''
})
const orderPage = ref(1)
const orderLimit = ref(15)

const orderRows = ref([
  {
    customerName: '王建国',
    customerEmail: 'wangjianguo@example.com',
    mtAccount: '8001023',
    profitAmount: 1234.5,
    rewardAmount: 500,
    tradeLots: 12.5,
    totalDeposit: 8200,
    totalWithdraw: 0,
    netDeposit: 8200,
    releaseRatio: 0.2,
    released: true,
    releasedAt: '2026-10-09 10:35:12'
  },
  {
    customerName: '王建国',
    customerEmail: 'wangjianguo@example.com',
    mtAccount: '8001023',
    profitAmount: 320.1256,
    rewardAmount: 200,
    tradeLots: 8.75,
    totalDeposit: 5200,
    totalWithdraw: 0,
    netDeposit: 5200,
    releaseRatio: 0.1,
    released: false,
    releasedAt: ''
  },
  {
    customerName: '李雪',
    customerEmail: 'lixue88@example.com',
    mtAccount: '8001055',
    profitAmount: 512.2,
    rewardAmount: 300,
    tradeLots: 6.0,
    totalDeposit: 6000,
    totalWithdraw: 500,
    netDeposit: 5500,
    releaseRatio: 0.15,
    released: true,
    releasedAt: '2026-10-12 16:22:40'
  },
  {
    customerName: '赵子涵',
    customerEmail: 'zhaozihan@example.com',
    mtAccount: '8001120',
    profitAmount: 86.42,
    rewardAmount: 50,
    tradeLots: 2.5,
    totalDeposit: 2100,
    totalWithdraw: 0,
    netDeposit: 2100,
    releaseRatio: 0.05,
    released: false,
    releasedAt: ''
  }
])

const filteredOrderRows = computed(() => {
  const customerName = orderSearch.customerName.trim()
  const customerEmail = orderSearch.customerEmail.trim()
  const mtAccount = orderSearch.mtAccount.trim()
  return orderRows.value.filter(r => {
    const matchName = !customerName || r.customerName.includes(customerName)
    const matchEmail = !customerEmail || r.customerEmail.includes(customerEmail)
    const matchMt = !mtAccount || r.mtAccount.includes(mtAccount)
    return matchName && matchEmail && matchMt
  })
})

const resetSignupSearch = () => {
  signupSearch.customerName = ''
  signupSearch.customerEmail = ''
  signupSearch.mtAccount = ''
}

const resetOrderSearch = () => {
  orderSearch.customerName = ''
  orderSearch.customerEmail = ''
  orderSearch.mtAccount = ''
}

const formatMoney = (val) => {
  const num = Number(val) || 0
  return num.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

const formatUsd4 = (val) => {
  const num = Number(val) || 0
  return num.toLocaleString('en-US', { minimumFractionDigits: 4, maximumFractionDigits: 4 })
}

const formatPercent = (ratio) => {
  const num = Number(ratio)
  if (!Number.isFinite(num)) return '-'
  return `${Math.round(num * 100)}%`
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
