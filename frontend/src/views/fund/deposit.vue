<template>
  <div class="flex h-full bg-mainBg overflow-hidden w-full">
    <div class="flex-1 flex flex-col min-w-0 bg-gray-50 overflow-hidden p-4 custom-scrollbar overflow-y-auto w-full">
      <main class="flex-1 overflow-y-auto p-4 md:p-6 bg-mainBg">
        <div class="bg-[#F7F7F8] rounded-xl border border-gray-200 p-4 md:p-6 min-h-full">
            <div class="bg-white rounded-xl border border-gray-100 overflow-hidden">
            <div class="px-5 py-4 border-b border-gray-100 flex items-center justify-between gap-3">
              <div class="flex items-center gap-2">
                <span class="text-xs text-gray-500">MT账号</span>
                <input v-model="filters.account" class="h-9 w-44 rounded border border-gray-200 bg-white px-3 text-sm outline-none focus:border-primary" placeholder="输入MT账号" type="text" />
              </div>
              <router-link class="inline-flex items-center gap-2 px-3 py-2 rounded-md bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium transition-colors" to="/crm/client-deposit-cent-account">
                <i class="fas fa-plus text-xs"></i>
                入金申请
              </router-link>
            </div>
            <div class="overflow-x-auto">
              <table class="min-w-full text-sm">
                <thead class="bg-white text-gray-500">
                  <tr class="border-b border-gray-100">
                    <th class="text-left font-medium px-5 py-4 whitespace-nowrap">
                      MT账号
                    </th>
                    <th class="text-left font-medium px-5 py-4 whitespace-nowrap change-highlight">
                      MT账户类型
                    </th>
                    <th class="text-left font-medium px-5 py-4 whitespace-nowrap">
                      订单号
                    </th>
                    <th class="text-left font-medium px-5 py-4 whitespace-nowrap change-highlight">
                      入金金额
                    </th>
                    <th class="text-left font-medium px-5 py-4 whitespace-nowrap">
                      支付金额
                    </th>
                    <th class="text-left font-medium px-5 py-4 whitespace-nowrap">
                      支付方式
                    </th>
                    <th class="text-left font-medium px-5 py-4 whitespace-nowrap">
                      状态
                    </th>
                    <th class="text-left font-medium px-5 py-4 whitespace-nowrap">
                      付款状态
                    </th>
                    <th class="text-left font-medium px-5 py-4 whitespace-nowrap">
                      时间
                    </th>
                    <th class="text-left font-medium px-5 py-4 whitespace-nowrap">
                      操作
                    </th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-gray-100">
                  <tr v-for="row in filteredRows" :key="row.orderId" class="align-top hover:bg-gray-50/70">
                    <td class="px-5 py-5 whitespace-nowrap font-medium text-gray-800">
                      {{ row.mtAccount }}
                    </td>
                    <td class="px-5 py-5 whitespace-nowrap font-medium change-highlight" :class="row.accountType === 'cent' ? 'text-primary' : 'text-gray-500'">
                      {{ row.mtTypeText }}
                    </td>
                    <td class="px-5 py-5 whitespace-nowrap text-gray-600">
                      {{ row.orderId }}
                    </td>
                    <td class="px-5 py-5 whitespace-nowrap">
                      <template v-if="row.accountType === 'cent'">
                        <div class="font-medium text-gray-800 change-highlight">
                          {{ row.depositText }}
                        </div>
                        <div class="text-xs text-gray-400 mt-2 change-highlight">
                          {{ row.depositUsdText }}
                        </div>
                      </template>
                      <template v-else>
                        <div class="font-medium text-gray-800 change-highlight">
                          {{ row.depositText }}
                        </div>
                      </template>
                    </td>
                    <td class="px-5 py-5 whitespace-nowrap">
                      <div class="font-medium text-gray-800" :class="row.accountType === 'cent' ? '' : ''">
                        {{ row.payText }}
                      </div>
                      <div class="text-xs text-gray-400 mt-2">
                        {{ row.rateText }}
                      </div>
                    </td>
                    <td class="px-5 py-5 whitespace-nowrap text-gray-600">
                      {{ row.payMethod }}
                    </td>
                    <td class="px-5 py-5 whitespace-nowrap text-gray-600">
                      {{ row.reviewStatus }}
                    </td>
                    <td class="px-5 py-5 whitespace-nowrap text-gray-600">
                      {{ row.payStatus }}
                    </td>
                    <td class="px-5 py-5 whitespace-nowrap text-gray-500">
                      {{ row.time }}
                    </td>
                    <td class="px-5 py-5 whitespace-nowrap">
                      <button class="px-3 py-1.5 rounded-md bg-blue-500 text-white hover:bg-blue-600 text-xs font-medium transition-colors" type="button" @click="goDepositDetail(row)">
                        查看详情
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="px-5 py-4 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
              <div>
                15条 / 页&nbsp;&nbsp; 1/1页
              </div>
              <div class="flex items-center gap-2">
                <button class="w-8 h-8 rounded border border-gray-200 bg-white text-gray-300 cursor-not-allowed">
                  <i class="fas fa-angle-left"></i>
                </button>
                <button class="w-8 h-8 rounded border border-primary bg-primary text-white">
                  1
                </button>
                <button class="w-8 h-8 rounded border border-gray-200 bg-white text-gray-300 cursor-not-allowed">
                  <i class="fas fa-angle-right"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import { computed, reactive, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const filters = reactive({
  account: ''
})

const rows = ref([
  {
    mtAccount: '9900456',
    accountType: 'cent',
    mtTypeText: '美分账户 / USC',
    orderId: '904617301918089429',
    depositText: '10,000 USC',
    depositUsdText: '折算 100.00 USD',
    payText: '100.00 USD',
    rateText: '汇率 1.0000',
    payMethod: 'crm',
    reviewStatus: '已审核',
    payStatus: '支付成功',
    time: '2026-07-31 14:34:19'
  },
  {
    mtAccount: '8800123',
    accountType: 'standard',
    mtTypeText: '标准账户 / USD',
    orderId: '904617301918089430',
    depositText: '100.00 USD',
    depositUsdText: '',
    payText: '100.00 USD',
    rateText: '汇率 1.0000',
    payMethod: 'MAXPAY(USDT)',
    reviewStatus: '处理中',
    payStatus: '待支付',
    time: '2026-07-31 13:11:06'
  },
  {
    mtAccount: '9900668',
    accountType: 'cent',
    mtTypeText: '美分账户 / USC',
    orderId: '904617301918089431',
    depositText: '25,000 USC',
    depositUsdText: '折算 250.00 USD',
    payText: '1,795.00 CNY',
    rateText: '汇率 7.1800',
    payMethod: 'UGATE',
    reviewStatus: '已审核',
    payStatus: '支付成功',
    time: '2026-07-30 18:42:51'
  }
])

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

const goDepositDetail = (row) => {
  router.push({ path: '/fund/deposit-detail', query: { orderId: String(row?.orderId || '') } })
}
</script>

<style scoped>
.change-highlight {
  color: #DC2626 !important;
}
</style>
