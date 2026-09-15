<template>
  <div class="flex flex-col min-w-0 w-full h-full">
    <div class="flex-1 min-w-0 overflow-y-auto custom-scrollbar">
      <div class="bg-white rounded-xl border border-gray-100 overflow-hidden">
        <div class="px-5 py-4 border-b border-gray-100 flex items-center justify-between gap-3">
          <div class="text-sm font-semibold text-gray-900">入金记录</div>
          <div class="flex items-center gap-2">
            <div class="hidden sm:flex items-center gap-2">
              <span class="text-xs text-gray-500">MT账号</span>
              <input v-model="filters.account" class="h-9 w-44 rounded border border-gray-200 bg-white px-3 text-sm outline-none focus:border-primary" placeholder="输入MT账号" type="text" />
            </div>
            <button class="inline-flex items-center gap-2 px-3 py-2 rounded-md bg-primary hover:bg-primaryHover text-white text-sm font-medium transition-colors" type="button" @click="goDeposit">
              <i class="fas fa-plus text-xs"></i>
              入金申请
            </button>
          </div>
        </div>

        <div class="overflow-x-auto">
          <table class="min-w-[1200px] w-full text-sm">
            <thead class="bg-white text-gray-500">
              <tr class="border-b border-gray-100">
                <th class="text-left font-medium px-5 py-4 whitespace-nowrap">MT账号</th>
                <th class="text-left font-medium px-5 py-4 whitespace-nowrap">MT账户类型</th>
                <th class="text-left font-medium px-5 py-4 whitespace-nowrap">订单号</th>
                <th class="text-left font-medium px-5 py-4 whitespace-nowrap">入金金额</th>
                <th class="text-left font-medium px-5 py-4 whitespace-nowrap">支付金额</th>
                <th class="text-left font-medium px-5 py-4 whitespace-nowrap">支付方式</th>
                <th class="text-left font-medium px-5 py-4 whitespace-nowrap">状态</th>
                <th class="text-left font-medium px-5 py-4 whitespace-nowrap">付款状态</th>
                <th class="text-left font-medium px-5 py-4 whitespace-nowrap">时间</th>
                <th class="text-left font-medium px-5 py-4 whitespace-nowrap">操作</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-100">
              <tr v-for="row in filteredRows" :key="row.orderId" class="align-top hover:bg-gray-50/70">
                <td class="px-5 py-5 whitespace-nowrap font-medium text-gray-800">{{ row.mtAccount }}</td>
                <td class="px-5 py-5 whitespace-nowrap">
                  <span class="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium border" :class="row.accountType === 'cent' ? 'bg-red-50 text-red-600 border-red-200' : 'bg-gray-50 text-gray-700 border-gray-200'">
                    {{ row.accountTypeLabel }}
                  </span>
                </td>
                <td class="px-5 py-5 whitespace-nowrap text-gray-600">{{ row.orderId }}</td>
                <td class="px-5 py-5 whitespace-nowrap">
                  <template v-if="row.accountType === 'cent'">
                    <div class="font-medium text-gray-800">{{ formatInt(row.depositAmount) }} USC</div>
                    <div class="text-xs text-gray-400 mt-2">折算 {{ formatMoney(row.depositUsd, 2) }} USD</div>
                  </template>
                  <template v-else>
                    <div class="font-medium text-gray-800">{{ formatMoney(row.depositUsd, 2) }} USD</div>
                  </template>
                </td>
                <td class="px-5 py-5 whitespace-nowrap">
                  <div class="font-medium text-gray-800">{{ formatMoney(row.payAmount, 2) }} {{ row.payCurrency }}</div>
                  <div class="text-xs text-gray-400 mt-2">汇率 {{ formatMoney(row.payRate, 4) }}</div>
                </td>
                <td class="px-5 py-5 whitespace-nowrap text-gray-600">{{ row.payMethod }}</td>
                <td class="px-5 py-5 whitespace-nowrap">
                  <span class="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium border" :class="statusBadgeClass(row.reviewStatus)">
                    <span class="w-1.5 h-1.5 rounded-full mr-1.5" :class="statusDotClass(row.reviewStatus)"></span>
                    {{ row.reviewStatusLabel }}
                  </span>
                </td>
                <td class="px-5 py-5 whitespace-nowrap text-gray-600">{{ row.payStatus }}</td>
                <td class="px-5 py-5 whitespace-nowrap text-gray-500">{{ row.time }}</td>
                <td class="px-5 py-5 whitespace-nowrap">
                  <button class="px-3 py-1.5 rounded-md bg-primary/15 text-primary hover:bg-primary/20 text-xs font-medium transition-colors" type="button" @click="openDetail(row)">
                    查看详情
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="px-5 py-4 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
          <div>{{ pageSize }}条 / 页&nbsp;&nbsp; 1/1页</div>
          <div class="flex items-center gap-2">
            <button class="w-8 h-8 rounded border border-gray-200 bg-white text-gray-300 cursor-not-allowed" type="button">
              <i class="fas fa-angle-left"></i>
            </button>
            <button class="w-8 h-8 rounded border border-primary bg-primary text-white" type="button">1</button>
            <button class="w-8 h-8 rounded border border-gray-200 bg-white text-gray-300 cursor-not-allowed" type="button">
              <i class="fas fa-angle-right"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div v-if="detail.visible" class="fixed inset-0 z-[100] flex items-center justify-center p-6">
    <div class="absolute inset-0 bg-black/50 backdrop-blur-sm" @click="closeDetail"></div>
    <div class="relative w-full max-w-2xl bg-white rounded-xl shadow-2xl overflow-hidden">
      <div class="bg-gray-50 px-6 py-4 border-b border-gray-100 flex justify-between items-center">
        <h3 class="text-lg font-bold text-gray-900">入金详情</h3>
        <button class="text-gray-400 hover:text-gray-600 transition-colors" type="button" @click="closeDetail">
          <i class="fa-solid fa-xmark text-lg"></i>
        </button>
      </div>
      <div class="p-6">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div class="text-gray-500">MT账号：<span class="text-gray-900 font-medium">{{ detail.row?.mtAccount || '-' }}</span></div>
          <div class="text-gray-500">订单号：<span class="text-gray-900 font-medium">{{ detail.row?.orderId || '-' }}</span></div>
          <div class="text-gray-500">MT账户类型：<span class="text-gray-900 font-medium">{{ detail.row?.accountTypeLabel || '-' }}</span></div>
          <div class="text-gray-500">支付方式：<span class="text-gray-900 font-medium">{{ detail.row?.payMethod || '-' }}</span></div>
          <div class="text-gray-500">入金金额：<span class="text-gray-900 font-medium">{{ detailDepositText }}</span></div>
          <div class="text-gray-500">支付金额：<span class="text-gray-900 font-medium">{{ detailPayText }}</span></div>
          <div class="text-gray-500">审核状态：<span class="text-gray-900 font-medium">{{ detail.row?.reviewStatusLabel || '-' }}</span></div>
          <div class="text-gray-500">付款状态：<span class="text-gray-900 font-medium">{{ detail.row?.payStatus || '-' }}</span></div>
          <div class="text-gray-500 md:col-span-2">时间：<span class="text-gray-900 font-medium">{{ detail.row?.time || '-' }}</span></div>
        </div>
      </div>
      <div class="px-6 py-4 bg-gray-50 border-t border-gray-100 flex justify-end">
        <button class="px-6 py-2 bg-primary hover:bg-primaryHover text-white rounded-lg text-sm font-bold shadow-sm transition-colors" type="button" @click="closeDetail">
          关闭
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, reactive, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const router = useRouter()
const route = useRoute()

const pageSize = 15

const rows = ref([
  {
    mtAccount: '9900456',
    accountType: 'cent',
    accountTypeLabel: '美分账户 / USC',
    orderId: '904617301918089429',
    depositAmount: 10000,
    depositUsd: 100,
    payAmount: 100,
    payCurrency: 'USD',
    payMethod: 'crm',
    payRate: 1,
    reviewStatus: 'reviewed',
    reviewStatusLabel: '已审核',
    payStatus: '支付成功',
    time: '2026-07-31 14:34:19'
  },
  {
    mtAccount: '8800123',
    accountType: 'standard',
    accountTypeLabel: '标准账户 / USD',
    orderId: '904617301918089430',
    depositAmount: 100,
    depositUsd: 100,
    payAmount: 100,
    payCurrency: 'USD',
    payMethod: 'MAXPAY(USDT)',
    payRate: 1,
    reviewStatus: 'processing',
    reviewStatusLabel: '处理中',
    payStatus: '待支付',
    time: '2026-07-31 13:11:06'
  },
  {
    mtAccount: '9900668',
    accountType: 'cent',
    accountTypeLabel: '美分账户 / USC',
    orderId: '904617301918089431',
    depositAmount: 25000,
    depositUsd: 250,
    payAmount: 1795,
    payCurrency: 'CNY',
    payMethod: 'UGATE',
    payRate: 7.18,
    reviewStatus: 'reviewed',
    reviewStatusLabel: '已审核',
    payStatus: '支付成功',
    time: '2026-07-30 18:42:51'
  }
])

const formatMoney = (n, digits = 2) => {
  const num = Number(n)
  if (!Number.isFinite(num)) return '-'
  return num.toLocaleString('en-US', { minimumFractionDigits: digits, maximumFractionDigits: digits })
}

const formatInt = (n) => {
  const num = Number(n)
  if (!Number.isFinite(num)) return '-'
  return Math.round(num).toLocaleString('en-US', { maximumFractionDigits: 0 })
}

const statusDotClass = (status) => {
  if (status === 'reviewed') return 'bg-emerald-500'
  if (status === 'processing') return 'bg-amber-400'
  if (status === 'rejected') return 'bg-red-500'
  return 'bg-gray-300'
}

const statusBadgeClass = (status) => {
  if (status === 'reviewed') return 'bg-emerald-50 text-emerald-700 border-emerald-200'
  if (status === 'processing') return 'bg-amber-50 text-amber-700 border-amber-200'
  if (status === 'rejected') return 'bg-red-50 text-red-700 border-red-200'
  return 'bg-gray-50 text-gray-600 border-gray-200'
}

const goDeposit = () => {
  router.push('/crm/client-deposit-cent-account')
}

const filters = reactive({
  account: ''
})

const normalizedAccount = computed(() => String(filters.account || '').trim())

const filteredRows = computed(() => {
  if (!normalizedAccount.value) return rows.value
  return rows.value.filter((r) => String(r.mtAccount || '').includes(normalizedAccount.value))
})

watch(
  () => route.query.account,
  (value) => {
    if (typeof value === 'string' && value.trim()) {
      filters.account = value.trim()
      return
    }
    if (Array.isArray(value) && value[0]) {
      filters.account = String(value[0]).trim()
      return
    }
    filters.account = ''
  },
  { immediate: true }
)

const detail = reactive({
  visible: false,
  row: null
})

const openDetail = (row) => {
  detail.visible = true
  detail.row = row
}

const closeDetail = () => {
  detail.visible = false
  detail.row = null
}

const detailDepositText = computed(() => {
  if (!detail.row) return '-'
  if (detail.row.accountType === 'cent') return `${formatInt(detail.row.depositAmount)} USC（折算 ${formatMoney(detail.row.depositUsd, 2)} USD）`
  return `${formatMoney(detail.row.depositUsd, 2)} USD`
})

const detailPayText = computed(() => {
  if (!detail.row) return '-'
  return `${formatMoney(detail.row.payAmount, 2)} ${detail.row.payCurrency}（汇率 ${formatMoney(detail.row.payRate, 4)}）`
})
</script>
