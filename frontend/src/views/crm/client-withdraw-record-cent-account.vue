<template>
  <div class="flex flex-col min-w-0 w-full h-full">
    <div class="flex-1 min-w-0 overflow-y-auto custom-scrollbar">
      <div class="bg-white rounded-xl border border-gray-100 overflow-hidden">
        <div class="px-5 py-4 border-b border-gray-100 flex items-center justify-between gap-3">
          <div class="text-sm font-semibold text-gray-900">出金记录</div>
          <div class="flex items-center gap-2">
            <div class="hidden sm:flex items-center gap-2">
              <span class="text-xs text-gray-500">MT账号</span>
              <input v-model="filters.account" class="h-9 w-44 rounded border border-gray-200 bg-white px-3 text-sm outline-none focus:border-primary" placeholder="输入MT账号" type="text" />
            </div>
            <button class="inline-flex items-center gap-2 px-3 py-2 rounded-md bg-primary hover:bg-primaryHover text-white text-sm font-medium transition-colors" type="button" @click="goWithdrawApply">
              <i class="fas fa-plus text-xs"></i>
              出金申请
            </button>
          </div>
        </div>

        <div class="overflow-x-auto">
          <table class="min-w-[1300px] w-full text-sm">
            <thead class="bg-white text-gray-500">
              <tr class="border-b border-gray-100">
                <th class="text-left font-medium px-5 py-4 whitespace-nowrap">MT账号</th>
                <th class="text-left font-medium px-5 py-4 whitespace-nowrap">账户类型</th>
                <th class="text-left font-medium px-5 py-4 whitespace-nowrap">订单号</th>
                <th class="text-left font-medium px-5 py-4 whitespace-nowrap">出金金额</th>
                <th class="text-left font-medium px-5 py-4 whitespace-nowrap">到账金额</th>
                <th class="text-left font-medium px-5 py-4 whitespace-nowrap">汇率</th>
                <th class="text-left font-medium px-5 py-4 whitespace-nowrap">支付方式</th>
                <th class="text-left font-medium px-5 py-4 whitespace-nowrap">申请时间</th>
                <th class="text-left font-medium px-5 py-4 whitespace-nowrap">状态</th>
                <th class="text-left font-medium px-5 py-4 whitespace-nowrap">付款状态</th>
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
                  <div class="font-medium text-gray-800">${{ formatMoney(row.withdrawAmount, 2) }}</div>
                </td>
                <td class="px-5 py-5 whitespace-nowrap">
                  <div class="font-medium text-gray-800">${{ formatMoney(row.arrivalAmount, 2) }}</div>
                </td>
                <td class="px-5 py-5 whitespace-nowrap text-gray-600">{{ formatMoney(row.rate, 5) }}</td>
                <td class="px-5 py-5 whitespace-nowrap text-gray-600">{{ row.payMethod }}</td>
                <td class="px-5 py-5 whitespace-nowrap text-gray-500">{{ row.applyTime }}</td>
                <td class="px-5 py-5 whitespace-nowrap text-gray-600">{{ row.status }}</td>
                <td class="px-5 py-5 whitespace-nowrap text-gray-600">{{ row.payStatus }}</td>
                <td class="px-5 py-5 whitespace-nowrap">
                  <button
                    v-if="row.canCancel"
                    class="px-2 py-1 rounded text-[12px] font-medium text-[#FF4D4F] border border-[#FFB3B6] bg-[#FFF1F0] hover:bg-[#FFE5E5] transition-colors"
                    type="button"
                    @click="cancel(row)"
                  >
                    取消
                  </button>
                  <span v-else class="text-xs text-gray-400">-</span>
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
</template>

<script setup>
import { computed, reactive, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const router = useRouter()
const route = useRoute()

const pageSize = 15

const rows = ref([
  {
    mtAccount: '8100453',
    accountType: 'standard',
    accountTypeLabel: '标准账户',
    orderId: 'OUT_923832107870979672',
    withdrawAmount: 1233,
    arrivalAmount: 1233,
    rate: 1,
    payMethod: 'maxpay-usdt',
    applyTime: '2026-07-31 15:07:06',
    status: '会签审核',
    payStatus: '待支付',
    canCancel: true
  },
  {
    mtAccount: '9900456',
    accountType: 'cent',
    accountTypeLabel: '美分账户',
    orderId: 'OUT_923832107870979699',
    withdrawAmount: 125,
    arrivalAmount: 125,
    rate: 1,
    payMethod: 'maxpay-usdt',
    applyTime: '2026-07-31 16:22:18',
    status: '会签审核',
    payStatus: '待支付',
    canCancel: true
  }
])

const formatMoney = (n, digits = 2) => {
  const num = Number(n)
  if (!Number.isFinite(num)) return '-'
  return num.toLocaleString('en-US', { minimumFractionDigits: digits, maximumFractionDigits: digits })
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

const cancel = (row) => {
  row.canCancel = false
  row.status = '已取消'
  row.payStatus = '-'
}

const goWithdrawApply = () => {
  router.push('/crm/client-withdraw-cent-account')
}
</script>
