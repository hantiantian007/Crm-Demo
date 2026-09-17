<template>
  <div class="flex h-full bg-mainBg overflow-hidden w-full">
    <div class="flex-1 flex flex-col min-w-0 bg-gray-50 overflow-hidden p-4 custom-scrollbar overflow-y-auto w-full">
      <main class="flex-1 overflow-y-auto p-4 md:p-6 bg-mainBg">
        <div class="space-y-4">
          <section class="bg-white rounded-xl border border-gray-200 p-5">
            <div class="text-sm font-semibold text-gray-700 mb-4">搜索</div>
            <div class="space-y-4">
              <div class="grid grid-cols-12 gap-4">
              <div class="col-span-12 md:col-span-6 lg:col-span-3">
                <label class="block text-xs text-gray-500 mb-2">销售名称</label>
                <input v-model="form.salesName" class="h-9 w-full rounded-md border border-gray-200 bg-white px-3 text-xs text-gray-700 outline-none focus:border-[#C19B5E] focus:ring-2 focus:ring-[#C19B5E]/10" placeholder="请输入销售名称" />
              </div>
              <div class="col-span-12 md:col-span-6 lg:col-span-3">
                <label class="block text-xs text-gray-500 mb-2">销售邮箱</label>
                <input v-model="form.salesEmail" class="h-9 w-full rounded-md border border-gray-200 bg-white px-3 text-xs text-gray-700 outline-none focus:border-[#C19B5E] focus:ring-2 focus:ring-[#C19B5E]/10" placeholder="请输入销售邮箱" />
              </div>
              <div class="col-span-12 md:col-span-6 lg:col-span-3">
                <label class="block text-xs text-gray-500 mb-2">享受返佣</label>
                <select v-model="form.commissionEnabled" class="h-9 w-full rounded-md border border-gray-200 bg-white px-3 text-xs text-gray-700 outline-none focus:border-[#C19B5E] focus:ring-2 focus:ring-[#C19B5E]/10">
                  <option value="all">全部</option>
                  <option value="yes">是</option>
                  <option value="no">否</option>
                </select>
              </div>
              <div class="col-span-12 md:col-span-6 lg:col-span-3">
                <label class="block text-xs text-gray-500 mb-2">交易奖励</label>
                <select v-model="form.tradingRewardEnabled" class="h-9 w-full rounded-md border border-gray-200 bg-white px-3 text-xs text-gray-700 outline-none focus:border-[#C19B5E] focus:ring-2 focus:ring-[#C19B5E]/10">
                  <option value="all">全部</option>
                  <option value="yes">是</option>
                  <option value="no">否</option>
                </select>
              </div>
              </div>

              <div class="grid grid-cols-12 gap-4 items-end">
              <div class="col-span-12 md:col-span-6 lg:col-span-3">
                <label class="block text-xs text-gray-500 mb-2">净入金奖励</label>
                <select v-model="form.netDepositRewardEnabled" class="h-9 w-full rounded-md border border-gray-200 bg-white px-3 text-xs text-gray-700 outline-none focus:border-[#C19B5E] focus:ring-2 focus:ring-[#C19B5E]/10">
                  <option value="all">全部</option>
                  <option value="yes">是</option>
                  <option value="no">否</option>
                </select>
              </div>
              <div class="col-span-12 md:col-span-6 lg:col-span-9 flex flex-wrap gap-3">
                <button class="sales-btn sales-btn-primary" type="button" @click="handleSearch">搜索</button>
                <button class="sales-btn sales-btn-outline" type="button" @click="handleReset">重置</button>
                <button class="sales-btn sales-btn-primary" type="button" @click="handleCreate">新增账户</button>
              </div>
              </div>
            </div>
          </section>
          <section class="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div class="overflow-x-auto">
              <table class="min-w-[1200px] w-full text-xs">
                <thead class="bg-white text-gray-500">
                  <tr class="border-b border-gray-100">
                    <th class="text-left font-medium px-5 py-4 whitespace-nowrap">销售名称</th>
                    <th class="text-left font-medium px-5 py-4 whitespace-nowrap">销售邮箱</th>
                    <th class="text-left font-medium px-5 py-4 whitespace-nowrap">是否享受返佣</th>
                    <th class="text-left font-medium px-5 py-4 whitespace-nowrap">是否开启交易奖励</th>
                    <th class="text-left font-medium px-5 py-4 whitespace-nowrap">交易奖励周期</th>
                    <th class="text-left font-medium px-5 py-4 whitespace-nowrap">是否开启净入金奖励</th>
                    <th class="text-left font-medium px-5 py-4 whitespace-nowrap">净入金奖励周期</th>
                    <th class="text-left font-medium px-5 py-4 whitespace-nowrap">更新人</th>
                    <th class="text-left font-medium px-5 py-4 whitespace-nowrap">更新时间</th>
                    <th class="text-left font-medium px-5 py-4 whitespace-nowrap sales-op-col">操作</th>
                  </tr>
                </thead>
                <tbody class="text-gray-700">
                  <tr v-for="row in pagedRows" :key="row.id" class="border-b border-gray-50 hover:bg-gray-50/40 transition-colors">
                    <td class="px-5 py-4 whitespace-nowrap">{{ row.salesName }}</td>
                    <td class="px-5 py-4 whitespace-nowrap">{{ row.salesEmail }}</td>
                    <td class="px-5 py-4 whitespace-nowrap">
                      <span :class="row.commissionEnabled ? yesTagClass : noTagClass">{{ row.commissionEnabled ? '是' : '否' }}</span>
                    </td>
                    <td class="px-5 py-4 whitespace-nowrap">
                      <span :class="row.tradingRewardEnabled ? yesTagClass : noTagClass">{{ row.tradingRewardEnabled ? '是' : '否' }}</span>
                    </td>
                    <td class="px-5 py-4 whitespace-nowrap">{{ row.tradingRewardPeriod }}</td>
                    <td class="px-5 py-4 whitespace-nowrap">
                      <span :class="row.netDepositRewardEnabled ? yesTagClass : noTagClass">{{ row.netDepositRewardEnabled ? '是' : '否' }}</span>
                    </td>
                    <td class="px-5 py-4 whitespace-nowrap">{{ row.netDepositRewardPeriod }}</td>
                    <td class="px-5 py-4 whitespace-nowrap">{{ row.updatedBy }}</td>
                    <td class="px-5 py-4 whitespace-nowrap">{{ row.updatedAt }}</td>
                    <td class="px-5 py-4 whitespace-nowrap sales-op-col">
                      <div class="flex items-center gap-2">
                        <button class="sales-btn-small" type="button" @click="handleDetail(row)">详情</button>
                        <button class="sales-btn-small" type="button" @click="handleNotReady">编辑</button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div v-if="filteredRows.length === 0" class="py-16 flex flex-col items-center justify-center text-gray-400">
              <div class="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                <i class="fa-regular fa-box-open text-3xl text-gray-300"></i>
              </div>
              <div class="text-sm">无可用数据</div>
            </div>

            <div v-else class="flex items-center justify-center gap-4 px-5 py-4 text-xs text-gray-500">
              <button class="w-8 h-8 flex items-center justify-center rounded-md border border-gray-200 bg-white text-gray-400" type="button" disabled>
                <i class="fa-solid fa-chevron-left text-[10px]"></i>
              </button>
              <button class="w-8 h-8 flex items-center justify-center rounded-full sales-page-current" type="button" disabled>
                {{ currentPage }}
              </button>
              <button class="w-8 h-8 flex items-center justify-center rounded-md border border-gray-200 bg-white text-gray-400" type="button" disabled>
                <i class="fa-solid fa-chevron-right text-[10px]"></i>
              </button>
              <div class="ml-2">第{{ currentPage }}/{{ totalPages }}页，共{{ total }}条记录</div>
            </div>
          </section>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import { computed, reactive, ref } from 'vue'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'

const router = useRouter()

const form = reactive({
  salesName: '',
  salesEmail: '',
  commissionEnabled: 'all',
  tradingRewardEnabled: 'all',
  netDepositRewardEnabled: 'all',
})

const query = reactive({
  salesName: '',
  salesEmail: '',
  commissionEnabled: 'all',
  tradingRewardEnabled: 'all',
  netDepositRewardEnabled: 'all',
})

const allRows = ref([
  {
    id: 's-001',
    salesName: 'test-测试小何',
    salesEmail: '66666666@165.com',
    commissionEnabled: true,
    commissionMode: 'inherit',
    tradingRewardEnabled: false,
    tradingRewardPeriod: '实时',
    netDepositRewardEnabled: true,
    netDepositRewardPeriod: '日结',
    updatedBy: 'test-F7',
    updatedAt: '2026-08-18 10:28:36',
  },
  {
    id: 's-002',
    salesName: 'test-褚萌隐',
    salesEmail: '15186061920@qq.com',
    commissionEnabled: true,
    commissionMode: 'inherit',
    tradingRewardEnabled: false,
    tradingRewardPeriod: '实时',
    netDepositRewardEnabled: true,
    netDepositRewardPeriod: '日结',
    updatedBy: 'test-F7',
    updatedAt: '2026-08-18 10:28:21',
  },
  {
    id: 's-003',
    salesName: 'test-b2',
    salesEmail: 'b2@qq.com',
    commissionEnabled: false,
    commissionMode: 'none',
    tradingRewardEnabled: false,
    tradingRewardPeriod: '实时',
    netDepositRewardEnabled: false,
    netDepositRewardPeriod: '日结',
    updatedBy: 'test-F7',
    updatedAt: '2026-07-01 18:24:06',
  },
  {
    id: 's-004',
    salesName: 'test-Han',
    salesEmail: 'ceshi@q.com',
    commissionEnabled: false,
    commissionMode: 'none',
    tradingRewardEnabled: false,
    tradingRewardPeriod: '实时',
    netDepositRewardEnabled: false,
    netDepositRewardPeriod: '日结',
    updatedBy: '史密斯',
    updatedAt: '2026-07-01 18:17:48',
  },
  {
    id: 's-005',
    salesName: 'H',
    salesEmail: 'Hancs@q.com',
    commissionEnabled: false,
    commissionMode: 'none',
    tradingRewardEnabled: false,
    tradingRewardPeriod: '实时',
    netDepositRewardEnabled: true,
    netDepositRewardPeriod: '每月最后一日',
    updatedBy: '史密斯',
    updatedAt: '2026-06-24 16:31:30',
  },
  {
    id: 's-006',
    salesName: '新销售A',
    salesEmail: 'sales-a@example.com',
    commissionEnabled: true,
    commissionMode: 'inherit',
    currentTierRange: '0–99,999.99 USD',
    currentTierCommission: '1.50 USD/标准手',
    tradingRewardEnabled: true,
    tradingCalcMode: 'teamNetDepositTier',
    tradingRewardPeriod: '实时',
    netDepositRewardEnabled: false,
    netDepositRewardPeriod: '日结',
    updatedBy: '演示数据',
    updatedAt: '2026-09-17 10:20:00',
  },
  {
    id: 's-007',
    salesName: '新销售B',
    salesEmail: 'sales-b@example.com',
    commissionEnabled: true,
    commissionMode: 'inherit',
    currentTierRange: '0–99,999.99 USD',
    currentTierCommission: '1.50 USD/标准手',
    tradingRewardEnabled: true,
    tradingCalcMode: 'teamNetDepositTier',
    tradingRewardPeriod: '实时',
    netDepositRewardEnabled: false,
    netDepositRewardPeriod: '日结',
    updatedBy: '演示数据',
    updatedAt: '2026-09-17 10:21:00',
  },
])

const currentPage = ref(1)
const pageSize = ref(10)

const yesTagClass = 'inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-100'
const noTagClass = 'inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold bg-rose-50 text-rose-700 border border-rose-100'

const normalize = (v) => String(v || '').trim().toLowerCase()

const matchYesNo = (value, queryValue) => {
  if (queryValue === 'all') return true
  if (queryValue === 'yes') return value === true
  if (queryValue === 'no') return value === false
  return true
}

const filteredRows = computed(() => {
  const nameQ = normalize(query.salesName)
  const emailQ = normalize(query.salesEmail)

  return allRows.value.filter((r) => {
    const okName = !nameQ || normalize(r.salesName).includes(nameQ)
    const okEmail = !emailQ || normalize(r.salesEmail).includes(emailQ)
    const okCommission = matchYesNo(r.commissionEnabled, query.commissionEnabled)
    const okTradingReward = matchYesNo(r.tradingRewardEnabled, query.tradingRewardEnabled)
    const okNetDepositReward = matchYesNo(r.netDepositRewardEnabled, query.netDepositRewardEnabled)
    return okName && okEmail && okCommission && okTradingReward && okNetDepositReward
  })
})

const total = computed(() => filteredRows.value.length)
const totalPages = computed(() => Math.max(1, Math.ceil(total.value / pageSize.value)))

const pagedRows = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value
  return filteredRows.value.slice(start, start + pageSize.value)
})

const syncQueryFromForm = () => {
  query.salesName = form.salesName
  query.salesEmail = form.salesEmail
  query.commissionEnabled = form.commissionEnabled
  query.tradingRewardEnabled = form.tradingRewardEnabled
  query.netDepositRewardEnabled = form.netDepositRewardEnabled
}

const handleSearch = () => {
  syncQueryFromForm()
  currentPage.value = 1
}

const handleReset = () => {
  form.salesName = ''
  form.salesEmail = ''
  form.commissionEnabled = 'all'
  form.tradingRewardEnabled = 'all'
  form.netDepositRewardEnabled = 'all'
  syncQueryFromForm()
  currentPage.value = 1
}

const handleCreate = () => {
  router.push('/commission/sales-list/create')
}

const handleDetail = (row) => {
  if (row && row.tradingCalcMode === 'teamNetDepositTier') {
    ElMessage({
      message: `交易返佣计算方式：团队净入金阶梯计算；当前净入金档位：${row.currentTierRange || '-'}；当前返佣：${row.currentTierCommission || '-'}`,
      type: 'info',
    })
    return
  }
  ElMessage({ message: '功能流程待确认', type: 'info' })
}

const handleNotReady = () => {
  ElMessage({ message: '功能流程待确认', type: 'info' })
}
</script>

<style scoped>
.sales-btn {
  height: 36px;
  padding: 0 16px;
  border-radius: 6px;
  font-size: 13px;
  font-weight: 600;
  transition: background-color 0.15s ease, border-color 0.15s ease, color 0.15s ease;
}

.sales-btn-primary {
  background: #d1a84f;
  color: #ffffff;
}

.sales-btn-primary:hover {
  background: #b89241;
}

.sales-btn-outline {
  background: #ffffff;
  color: #374151;
  border: 1px solid #e5e7eb;
}

.sales-btn-outline:hover {
  background: #f9fafb;
}

.sales-btn-small {
  height: 28px;
  padding: 0 12px;
  border-radius: 6px;
  background: #d1a84f;
  color: #ffffff;
  font-size: 12px;
  font-weight: 600;
  transition: background-color 0.15s ease;
}

.sales-btn-small:hover {
  background: #b89241;
}

.sales-op-col {
  min-width: 140px;
}

.sales-page-current {
  background: #d1a84f;
  color: #ffffff;
  font-weight: 600;
}
</style>
