<template>
  <div class="flex h-full bg-mainBg overflow-hidden">
    <div class="flex-1 flex flex-col min-w-0 bg-gray-50 overflow-hidden p-4 custom-scrollbar overflow-y-auto">
      <main class="flex-1 overflow-y-auto p-4 md:p-6 bg-mainBg">
 <div class="grid grid-cols-[minmax(0,1fr)_320px] gap-5">
  <div class="space-y-4">
   <section class="bg-white rounded-xl border border-gray-200 p-5">
    <div class="text-sm font-semibold text-gray-700 mb-4">
     出金详情
    </div>
    <div class="grid grid-cols-2 gap-x-6 gap-y-3 text-sm">
      <div v-for="row in detailRows" :key="row.label" class="flex items-start justify-between gap-3">
        <div class="text-gray-500 shrink-0">{{ row.label }}</div>
        <div class="text-gray-800 font-medium text-right break-all">{{ row.value }}</div>
      </div>
    </div>
   </section>
   <section class="bg-white rounded-xl border border-gray-200 p-5">
    <div class="text-sm font-semibold text-gray-700 mb-4">
     资金信息
    </div>
    <div class="grid grid-cols-2 gap-x-6 gap-y-3 text-sm">
      <div v-for="row in fundRows" :key="row.label" class="flex items-start justify-between gap-3">
        <div class="text-gray-500 shrink-0">{{ row.label }}</div>
        <div class="text-gray-800 font-medium text-right break-all">{{ row.value }}</div>
      </div>
    </div>
   </section>
   <section class="bg-white rounded-xl border border-gray-200 overflow-hidden">
    <div class="px-5 py-4 border-b border-gray-100 text-sm font-semibold text-gray-700">
     入金记录
    </div>
    <div class="overflow-x-auto">
     <table class="min-w-full text-sm">
      <thead class="bg-gray-50 text-gray-500">
       <tr class="border-b border-gray-100">
        <th class="text-left font-medium px-5 py-3 whitespace-nowrap">
         订单号
        </th>
        <th class="text-left font-medium px-5 py-3 whitespace-nowrap change-highlight">
         MT类型
        </th>
        <th class="text-left font-medium px-5 py-3 whitespace-nowrap">
         MT账号
        </th>
        <th class="text-left font-medium px-5 py-3 whitespace-nowrap change-highlight">
         金额
        </th>
        <th class="text-left font-medium px-5 py-3 whitespace-nowrap">
         支付方式
        </th>
        <th class="text-left font-medium px-5 py-3 whitespace-nowrap">
         审核状态
        </th>
        <th class="text-left font-medium px-5 py-3 whitespace-nowrap">
         支付状态
        </th>
        <th class="text-left font-medium px-5 py-3 whitespace-nowrap">
         申请时间
        </th>
        <th class="text-left font-medium px-5 py-3 whitespace-nowrap">
         处理时间
        </th>
       </tr>
      </thead>
      <tbody class="divide-y divide-gray-100">
        <tr v-for="row in depositRows" :key="row.orderId" class="hover:bg-gray-50/70">
          <td class="px-5 py-4 whitespace-nowrap text-gray-700 font-medium">{{ row.orderId }}</td>
          <td class="px-5 py-4 whitespace-nowrap">
            <span class="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium border" :class="row.mtType === 'cent' ? 'bg-red-50 text-red-700 border-red-200' : 'bg-gray-50 text-gray-700 border-gray-200'">
              {{ row.mtTypeLabel }}
            </span>
          </td>
          <td class="px-5 py-4 whitespace-nowrap text-gray-700">{{ row.mtAccount }}</td>
          <td class="px-5 py-4 whitespace-nowrap text-gray-700 change-highlight font-semibold">{{ row.amountText }}</td>
          <td class="px-5 py-4 whitespace-nowrap text-gray-600">{{ row.payMethod }}</td>
          <td class="px-5 py-4 whitespace-nowrap text-gray-600">{{ row.auditStatus }}</td>
          <td class="px-5 py-4 whitespace-nowrap text-gray-600">{{ row.payStatus }}</td>
          <td class="px-5 py-4 whitespace-nowrap text-gray-500">{{ row.applyTime }}</td>
          <td class="px-5 py-4 whitespace-nowrap text-gray-500">{{ row.handleTime }}</td>
        </tr>
      </tbody>
     </table>
    </div>
    <div class="px-5 py-4 border-t border-gray-100 flex flex-col items-center gap-3">
     <div class="flex items-center gap-2 text-xs text-gray-500">
      <button class="w-7 h-7 rounded-full border border-gray-200 text-gray-400 flex items-center justify-center">
       <i class="fa-solid fa-angle-left text-[10px]">
       </i>
      </button>
      <button class="w-7 h-7 rounded-full bg-primary text-white font-medium">
       1
      </button>
      <button class="w-7 h-7 rounded-full text-gray-500 hover:bg-gray-100">
       2
      </button>
      <button class="w-7 h-7 rounded-full text-gray-500 hover:bg-gray-100">
       3
      </button>
      <button class="w-7 h-7 rounded-full text-gray-500 hover:bg-gray-100">
       4
      </button>
      <button class="w-7 h-7 rounded-full text-gray-500 hover:bg-gray-100">
       5
      </button>
      <button class="w-7 h-7 rounded-full border border-gray-200 text-gray-400 flex items-center justify-center">
       <i class="fa-solid fa-angle-right text-[10px]">
       </i>
      </button>
     </div>
     <div class="text-xs text-gray-400">
      第1/5页，共42条记录
     </div>
    </div>
   </section>
   <section class="bg-white rounded-xl border border-gray-200 overflow-hidden">
    <div class="px-5 py-4 border-b border-gray-100 text-sm font-semibold text-gray-700">
     支付信息
    </div>
    <div class="overflow-x-auto">
     <table class="min-w-full text-sm">
      <thead class="bg-gray-50 text-gray-500">
       <tr class="border-b border-gray-100">
        <th class="text-left font-medium px-5 py-3 whitespace-nowrap">
         支付方式
        </th>
        <th class="text-left font-medium px-5 py-3 whitespace-nowrap">
         支付编号
        </th>
        <th class="text-left font-medium px-5 py-3 whitespace-nowrap">
         支付时间
        </th>
        <th class="text-left font-medium px-5 py-3 whitespace-nowrap">
         支付状态
        </th>
        <th class="text-left font-medium px-5 py-3 whitespace-nowrap">
         实际支付金额
        </th>
        <th class="text-left font-medium px-5 py-3 whitespace-nowrap">
         支付金额
        </th>
        <th class="text-left font-medium px-5 py-3 whitespace-nowrap">
         操作者
        </th>
        <th class="text-left font-medium px-5 py-3 whitespace-nowrap">
         原因
        </th>
        <th class="text-left font-medium px-5 py-3 whitespace-nowrap">
         操作
        </th>
       </tr>
      </thead>
      <tbody class="divide-y divide-gray-100">
        <tr v-for="row in paymentRows" :key="row.payNo" class="hover:bg-gray-50/70">
          <td class="px-5 py-4 whitespace-nowrap text-gray-700">{{ row.payMethod }}</td>
          <td class="px-5 py-4 whitespace-nowrap text-gray-700 font-medium">{{ row.payNo }}</td>
          <td class="px-5 py-4 whitespace-nowrap text-gray-500">{{ row.payTime }}</td>
          <td class="px-5 py-4 whitespace-nowrap text-gray-600">{{ row.payStatus }}</td>
          <td class="px-5 py-4 whitespace-nowrap text-gray-700 change-highlight font-semibold">{{ row.actualPayAmount }}</td>
          <td class="px-5 py-4 whitespace-nowrap text-gray-700">{{ row.payAmount }}</td>
          <td class="px-5 py-4 whitespace-nowrap text-gray-600">{{ row.operator }}</td>
          <td class="px-5 py-4 whitespace-nowrap text-gray-500">{{ row.reason }}</td>
          <td class="px-5 py-4 whitespace-nowrap">
            <button class="px-3 py-1.5 rounded bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-medium transition-colors" type="button">
              查看
            </button>
          </td>
        </tr>
      </tbody>
     </table>
    </div>
   </section>
  </div>
  <aside class="space-y-4">
   <section class="bg-white rounded-xl border border-gray-200 p-5">
    <div class="flex items-start justify-between mb-5">
     <div class="text-sm font-semibold text-gray-700">
      审核详情
     </div>
     <div class="stamp">
      已审核
     </div>
    </div>
    <div class="space-y-4">
      <div v-for="(item, idx) in timelineRows" :key="idx" class="flex items-start gap-3">
        <div class="mt-1 w-2.5 h-2.5 rounded-full" :class="item.dotClass"></div>
        <div class="flex-1 min-w-0">
          <div class="text-sm font-medium text-gray-800">{{ item.title }}</div>
          <div class="mt-1 text-xs text-gray-500">{{ item.time }}</div>
          <div v-if="item.note" class="mt-2 text-xs text-gray-600 leading-5">{{ item.note }}</div>
        </div>
      </div>
    </div>
   </section>
  </aside>
 </div>
</main>

    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const account = computed(() => String(route.query.account || '').trim() || '8100453')

const detail = computed(() => {
  if (account.value === '9900456') {
    return {
      orderNo: 'OUT_919847271934199098',
      mtAccount: '9900456',
      mtType: 'cent',
      mtTypeLabel: '美分账户',
      clientName: 'test-小测试',
      phone: '14578541002',
      withdrawAmount: '$120.00',
      arrivalAmount: '￥861.60',
      payMethod: 'AIPAY',
      auditStatus: '已下发',
      payStatus: '支付中',
      applyTime: '2026-07-20 15:09:10',
      handleTime: '2026-07-20 15:16:56',
      group: '美分分组XXXX',
      leverage: '1:100'
    }
  }
  return {
    orderNo: 'OUT_923832107870979672',
    mtAccount: '8100453',
    mtType: 'standard',
    mtTypeLabel: '标准账户',
    clientName: 'test-b5',
    phone: '13932282801',
    withdrawAmount: '$1,233.00',
    arrivalAmount: '$1,233.00',
    payMethod: 'MAXPAY-USDT',
    auditStatus: '会签审核',
    payStatus: '待支付',
    applyTime: '2026-07-31 15:07:06',
    handleTime: '2026-07-31 15:07:08',
    group: '标准分组XXXXX',
    leverage: '1:100'
  }
})

const detailRows = computed(() => [
  { label: '订单号', value: detail.value.orderNo },
  { label: 'MT账号', value: detail.value.mtAccount },
  { label: 'MT类型', value: detail.value.mtTypeLabel },
  { label: 'MT Group', value: detail.value.group },
  { label: '杠杆', value: detail.value.leverage },
  { label: '客户姓名', value: detail.value.clientName },
  { label: '手机号', value: detail.value.phone },
  { label: '出金金额', value: detail.value.withdrawAmount },
  { label: '到账金额', value: detail.value.arrivalAmount },
  { label: '出金方式', value: detail.value.payMethod },
  { label: '审核状态', value: detail.value.auditStatus },
  { label: '支付状态', value: detail.value.payStatus },
  { label: '申请时间', value: detail.value.applyTime },
  { label: '处理时间', value: detail.value.handleTime }
])

const fundRows = computed(() => {
  if (detail.value.mtType === 'cent') {
    return [
      { label: 'Balance', value: '52,450.00 USC' },
      { label: 'Credit', value: '0.00 USC' },
      { label: 'Equity', value: '52,460.00 USC' },
      { label: 'Margin', value: '500.00 USC' },
      { label: 'Free Margin', value: '83,000.00 USC' },
      { label: 'Margin Level', value: '142.00%' },
      { label: '浮动盈亏', value: '+4,000.00 USC' }
    ]
  }
  return [
    { label: 'Balance', value: '10,000.00 USD' },
    { label: 'Credit', value: '0.00 USD' },
    { label: 'Equity', value: '10,000.00 USD' },
    { label: 'Margin', value: '0.00 USD' },
    { label: 'Free Margin', value: '10,000.00 USD' },
    { label: 'Margin Level', value: '--' },
    { label: '浮动盈亏', value: '0.00 USD' }
  ]
})

const depositRows = computed(() => {
  const mtTypeLabel = detail.value.mtTypeLabel
  const mtType = detail.value.mtType
  return [
    {
      orderId: 'IN_904617301918089429',
      mtType,
      mtTypeLabel,
      mtAccount: detail.value.mtAccount,
      amountText: mtType === 'cent' ? '10,000 USC（折算 100.00 USD）' : '100.00 USD',
      payMethod: mtType === 'cent' ? 'UGATE' : 'MAXPAY(USDT)',
      auditStatus: '已审核',
      payStatus: '支付成功',
      applyTime: '2026-07-31 14:34:19',
      handleTime: '2026-07-31 14:40:09'
    }
  ]
})

const paymentRows = computed(() => [
  {
    payMethod: detail.value.payMethod,
    payNo: `PAY_${detail.value.orderNo.slice(-6)}`,
    payTime: detail.value.handleTime,
    payStatus: detail.value.payStatus,
    actualPayAmount: detail.value.arrivalAmount,
    payAmount: detail.value.withdrawAmount,
    operator: '财务-A',
    reason: '-'
  }
])

const timelineRows = computed(() => {
  if (detail.value.mtType === 'cent') {
    return [
      { title: '客服审核', time: '2026-07-20 15:13:23', note: '通过（演示）', dotClass: 'bg-green-500' },
      { title: '风险审核', time: '2026-07-20 15:15:15', note: '通过（演示）', dotClass: 'bg-green-500' },
      { title: '财务审核', time: '2026-07-20 15:16:56', note: '已下发（演示）', dotClass: 'bg-amber-500' }
    ]
  }
  return [
    { title: '客服审核', time: '2026-07-31 15:07:08', note: '会签审核（演示）', dotClass: 'bg-amber-500' }
  ]
})
</script>
