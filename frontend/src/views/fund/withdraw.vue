<template>
  <div class="flex h-full bg-mainBg overflow-hidden">
    <div class="flex-1 flex flex-col min-w-0 bg-gray-50 overflow-hidden p-4 custom-scrollbar overflow-y-auto">
      <main class="flex-1 overflow-y-auto p-4 md:p-6 bg-mainBg">
 <div class="bg-[#F7F7F8] rounded-xl border border-gray-200 p-4 md:p-6 min-h-full">
  <div class="bg-white rounded-xl border border-gray-100 overflow-hidden">
   <div class="px-5 py-4 border-b border-gray-100 flex items-center justify-between gap-3">
    <div class="flex items-center gap-2">
     <span class="text-xs text-gray-500">
      MT账号
     </span>
     <input v-model="filters.account" class="h-9 w-44 rounded border border-gray-200 bg-white px-3 text-sm outline-none focus:border-primary" placeholder="输入MT账号" type="text"/>
    </div>
    <router-link class="inline-flex items-center gap-2 px-3 py-2 rounded-md bg-primary hover:bg-primaryHover text-white text-sm font-medium transition-colors" to="/crm/client-withdraw-cent-account">
     <i class="fas fa-plus text-xs">
     </i>
     出金申请
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
        账户类型
       </th>
       <th class="text-left font-medium px-5 py-4 whitespace-nowrap">
        订单号
       </th>
       <th class="text-left font-medium px-5 py-4 whitespace-nowrap change-highlight">
        出金金额
       </th>
       <th class="text-left font-medium px-5 py-4 whitespace-nowrap change-highlight">
        到账金额
       </th>
       <th class="text-left font-medium px-5 py-4 whitespace-nowrap change-highlight">
        汇率
       </th>
       <th class="text-left font-medium px-5 py-4 whitespace-nowrap">
        支付方式
       </th>
       <th class="text-left font-medium px-5 py-4 whitespace-nowrap">
        申请时间
       </th>
       <th class="text-left font-medium px-5 py-4 whitespace-nowrap">
        状态
       </th>
       <th class="text-left font-medium px-5 py-4 whitespace-nowrap">
        付款状态
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
       <td class="px-5 py-5 whitespace-nowrap change-highlight" :class="row.accountType === 'cent' ? 'text-primary' : 'text-gray-500'">
        {{ row.accountTypeLabel }}
       </td>
       <td class="px-5 py-5 whitespace-nowrap text-gray-600" :class="row.accountType === 'cent' ? 'change-highlight' : ''">
        {{ row.orderId }}
       </td>
       <td class="px-5 py-5 whitespace-nowrap">
        <div class="font-medium text-gray-800 change-highlight">
         {{ row.withdrawText }}
        </div>
       </td>
       <td class="px-5 py-5 whitespace-nowrap">
        <div class="font-medium text-gray-800 change-highlight">
         {{ row.arrivalText }}
        </div>
       </td>
       <td class="px-5 py-5 whitespace-nowrap text-gray-600 change-highlight">
        {{ row.rateText }}
       </td>
       <td class="px-5 py-5 whitespace-nowrap text-gray-600">
        {{ row.payMethod }}
       </td>
       <td class="px-5 py-5 whitespace-nowrap text-gray-500" :class="row.accountType === 'cent' ? 'change-highlight' : ''">
        {{ row.applyTime }}
       </td>
       <td class="px-5 py-5 whitespace-nowrap text-gray-600">
        {{ row.status }}
       </td>
       <td class="px-5 py-5 whitespace-nowrap text-gray-600">
        {{ row.payStatus }}
       </td>
       <td class="px-5 py-5 whitespace-nowrap">
        <button
          class="px-2 py-1 rounded text-[12px] font-medium text-[#FF4D4F] border border-[#FFB3B6] bg-[#FFF1F0] hover:bg-[#FFE5E5] transition-colors text-red-500 hover:text-red-700"
          type="button"
        >
         取消
        </button>
       </td>
      </tr>
     </tbody>
    </table>
   </div>
   <div class="px-5 py-4 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
    <div>
     15条 / 页   1记录，第 1/1页
    </div>
    <div class="flex items-center gap-2">
     <button class="w-8 h-8 rounded border border-gray-200 bg-white text-gray-300 cursor-not-allowed">
      <i class="fas fa-angle-left">
      </i>
     </button>
     <button class="w-8 h-8 rounded border border-primary bg-primary text-white">
      1
     </button>
     <button class="w-8 h-8 rounded border border-gray-200 bg-white text-gray-300 cursor-not-allowed">
      <i class="fas fa-angle-right">
      </i>
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
import { useRoute } from 'vue-router'

const route = useRoute()

const filters = reactive({
  account: ''
})

const rows = ref([
  {
    mtAccount: '8100453',
    accountType: 'standard',
    accountTypeLabel: '标准账户',
    orderId: 'OUT_923832107870979672',
    withdrawText: '$1,233.00',
    arrivalText: '$1,233.00',
    rateText: '1.00000',
    payMethod: 'maxpay-usdt',
    applyTime: '2026-07-31 15:07:06',
    status: '会签审核',
    payStatus: '待支付'
  },
  {
    mtAccount: '9900456',
    accountType: 'cent',
    accountTypeLabel: '美分账户',
    orderId: 'OUT_923832107870979699',
    withdrawText: '$125.00',
    arrivalText: '$125.00',
    rateText: '1.00000',
    payMethod: 'maxpay-usdt',
    applyTime: '2026-07-31 16:22:18',
    status: '会签审核',
    payStatus: '待支付'
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
</script>
