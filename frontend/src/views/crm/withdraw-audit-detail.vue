<template>
  <div class="flex h-full bg-mainBg overflow-hidden">
    <div class="flex-1 flex flex-col min-w-0 bg-gray-50 overflow-hidden p-4 custom-scrollbar overflow-y-auto">
      <main class="flex-1 overflow-y-auto p-4 md:p-6 bg-mainBg">
        <div class="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_320px] gap-5">
          <div class="space-y-4">
            <section class="bg-white rounded-xl border border-gray-200 p-5">
              <div class="text-sm font-semibold text-gray-700 mb-4">出金详情</div>
              <div class="grid grid-cols-1 md:grid-cols-3 gap-x-10 gap-y-4 text-sm">
                <template v-for="row in withdrawBasicRows" :key="row.key">
                  <div v-for="cell in row.cells" :key="cell.key" class="flex items-start gap-4">
                    <div class="w-28 shrink-0" :class="cell.labelClass || 'text-gray-500'">{{ cell.label }}</div>
                    <div class="break-all" :class="cell.valueClass || 'text-gray-800 font-medium'">
                      <template v-if="cell.type === 'tag'">
                        <span class="inline-flex items-center px-2 py-1 text-xs font-medium rounded-full border" :class="cell.tagClass">
                          {{ cell.value }}
                        </span>
                      </template>
                      <template v-else>{{ cell.value }}</template>
                    </div>
                  </div>
                </template>
              </div>
            </section>

            <section class="bg-white rounded-xl border border-gray-200 p-5">
              <div class="text-sm font-semibold text-gray-700 mb-4">资金信息</div>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-4 text-sm">
                <div v-for="f in fundInfoFields" :key="f.key" class="flex items-start gap-4">
                  <div class="text-gray-500 w-36 shrink-0">{{ f.label }}</div>
                  <div class="text-gray-800 font-medium break-all">{{ f.value }}</div>
                </div>
              </div>
            </section>

            <section class="bg-white rounded-xl border border-gray-200 overflow-hidden">
              <div class="px-5 py-4 border-b border-gray-100 text-sm font-semibold text-gray-700">入金记录</div>
              <div class="overflow-x-auto">
                <table class="min-w-full text-sm">
                  <thead class="bg-gray-50 text-gray-500">
                    <tr class="border-b border-gray-100">
                      <th class="text-left font-medium px-5 py-3 whitespace-nowrap">订单号</th>
                      <th class="text-left font-medium px-5 py-3 whitespace-nowrap">MT账号</th>
                      <th class="text-left font-medium px-5 py-3 whitespace-nowrap">MT类型</th>
                      <th class="text-left font-medium px-5 py-3 whitespace-nowrap">金额</th>
                      <th class="text-left font-medium px-5 py-3 whitespace-nowrap">支付方式</th>
                      <th class="text-left font-medium px-5 py-3 whitespace-nowrap">审核状态</th>
                      <th class="text-left font-medium px-5 py-3 whitespace-nowrap">支付状态</th>
                      <th class="text-left font-medium px-5 py-3 whitespace-nowrap">申请时间</th>
                      <th class="text-left font-medium px-5 py-3 whitespace-nowrap">处理时间</th>
                    </tr>
                  </thead>
                  <tbody class="divide-y divide-gray-100">
                    <tr v-for="row in pagedDepositRows" :key="row.orderId" class="hover:bg-gray-50/70">
                      <td class="px-5 py-4 whitespace-nowrap text-gray-700 font-medium">{{ row.orderId }}</td>
                      <td class="px-5 py-4 whitespace-nowrap text-gray-700">{{ row.mtAccount }}</td>
                      <td class="px-5 py-4 whitespace-nowrap text-gray-700">{{ row.mtTypeLabel }}</td>
                      <td class="px-5 py-4 whitespace-nowrap text-gray-700 font-semibold">{{ row.amountText }}</td>
                      <td class="px-5 py-4 whitespace-nowrap text-gray-600">{{ row.payMethod }}</td>
                      <td class="px-5 py-4 whitespace-nowrap text-gray-600">{{ row.auditStatus }}</td>
                      <td class="px-5 py-4 whitespace-nowrap text-gray-600">{{ row.payStatus }}</td>
                      <td class="px-5 py-4 whitespace-nowrap text-gray-500">{{ row.applyTime }}</td>
                      <td class="px-5 py-4 whitespace-nowrap text-gray-500">{{ row.handleTime }}</td>
                    </tr>
                    <tr v-if="!pagedDepositRows.length">
                      <td class="px-5 py-8 text-center text-gray-400 text-sm" colspan="9">暂无记录</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div class="px-5 py-4 border-t border-gray-100 flex flex-col items-center gap-3">
                <div class="flex items-center gap-2 text-xs text-gray-500">
                  <button
                    type="button"
                    class="w-7 h-7 rounded-full border border-gray-200 text-gray-500 flex items-center justify-center hover:bg-gray-50 disabled:opacity-40 disabled:hover:bg-transparent"
                    :disabled="depositPage <= 1"
                    @click="depositPage = Math.max(1, depositPage - 1)"
                  >
                    <i class="fa-solid fa-angle-left text-[10px]"></i>
                  </button>
                  <button class="w-7 h-7 rounded-full bg-primary text-white font-medium">{{ depositPage }}</button>
                  <button
                    type="button"
                    class="w-7 h-7 rounded-full border border-gray-200 text-gray-500 flex items-center justify-center hover:bg-gray-50 disabled:opacity-40 disabled:hover:bg-transparent"
                    :disabled="depositPage >= depositTotalPages"
                    @click="depositPage = Math.min(depositTotalPages, depositPage + 1)"
                  >
                    <i class="fa-solid fa-angle-right text-[10px]"></i>
                  </button>
                </div>
                <div class="text-xs text-gray-400">第{{ depositPage }}/{{ depositTotalPages }}页，共{{ depositRowsSorted.length }}条记录</div>
              </div>
            </section>

            <section class="bg-white rounded-xl border border-gray-200 overflow-hidden">
              <div class="px-5 py-4 border-b border-gray-100 text-sm font-semibold text-gray-700">支付信息</div>
              <div class="overflow-x-auto">
                <table class="min-w-full text-sm">
                  <thead class="bg-gray-50 text-gray-500">
                    <tr class="border-b border-gray-100">
                      <th class="text-left font-medium px-5 py-3 whitespace-nowrap">支付方式</th>
                      <th class="text-left font-medium px-5 py-3 whitespace-nowrap">支付编号</th>
                      <th class="text-left font-medium px-5 py-3 whitespace-nowrap">支付时间</th>
                      <th class="text-left font-medium px-5 py-3 whitespace-nowrap">支付状态</th>
                      <th class="text-left font-medium px-5 py-3 whitespace-nowrap">实际支付金额</th>
                      <th class="text-left font-medium px-5 py-3 whitespace-nowrap">应支付金额</th>
                      <th class="text-left font-medium px-5 py-3 whitespace-nowrap">操作人</th>
                      <th class="text-left font-medium px-5 py-3 whitespace-nowrap">原因</th>
                      <th class="text-left font-medium px-5 py-3 whitespace-nowrap">操作</th>
                    </tr>
                  </thead>
                  <tbody class="divide-y divide-gray-100">
                    <tr v-for="row in paymentRows" :key="row.payNo" class="hover:bg-gray-50/70">
                      <td class="px-5 py-4 whitespace-nowrap text-gray-700">{{ row.payMethod }}</td>
                      <td class="px-5 py-4 whitespace-nowrap text-gray-700 font-medium">{{ row.payNo }}</td>
                      <td class="px-5 py-4 whitespace-nowrap text-gray-500">{{ row.payTime }}</td>
                      <td class="px-5 py-4 whitespace-nowrap text-gray-600">{{ row.payStatus }}</td>
                      <td class="px-5 py-4 whitespace-nowrap text-gray-700 font-semibold">{{ row.actualPayAmount }}</td>
                      <td class="px-5 py-4 whitespace-nowrap text-gray-700">{{ row.shouldPayAmount }}</td>
                      <td class="px-5 py-4 whitespace-nowrap text-gray-600">{{ row.operator }}</td>
                      <td class="px-5 py-4 whitespace-nowrap text-gray-500">{{ row.reason }}</td>
                      <td class="px-5 py-4 whitespace-nowrap text-gray-500">-</td>
                    </tr>
                    <tr v-if="!paymentRows.length">
                      <td class="px-5 py-8 text-center text-gray-400 text-sm" colspan="9">暂无记录</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>
          </div>

          <aside class="space-y-4">
            <section class="bg-white rounded-xl border border-gray-200 p-5">
              <div class="text-sm font-semibold text-gray-700 mb-4">风险提示</div>
              <div class="bg-red-50 border border-red-100 rounded-lg p-4 text-sm text-red-700" v-if="riskText !== '-'">
                {{ riskText }}
              </div>
              <div class="bg-gray-50 border border-gray-200 rounded-lg p-4 text-sm text-gray-500" v-else>
                暂未发现风险
              </div>
            </section>

            <section class="bg-white rounded-xl border border-gray-200 p-5">
              <div class="flex items-start justify-between mb-5">
                <div class="text-sm font-semibold text-gray-700">审核详情</div>
                <div class="stamp">{{ stampText }}</div>
              </div>
              <div class="space-y-4">
                <div v-for="(item, idx) in timelineRows" :key="idx" class="flex items-start gap-3">
                  <div class="mt-1 w-2.5 h-2.5 rounded-full" :class="item.dotClass"></div>
                  <div class="flex-1 min-w-0">
                    <div class="text-sm font-medium text-gray-800">{{ item.title }}</div>
                    <div class="mt-1 text-xs text-gray-500">{{ item.time }}</div>
                    <div class="mt-1 text-xs text-gray-500" v-if="item.operator">操作人：{{ item.operator }}</div>
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
import { computed, ref } from 'vue'
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
      accountName: 'test-沈栋晓',
      email: '13832766457@qq.com',
      phone: '13832766457',
      mtGroup: 'real\\HATC-Inland\\Test\\Stan-Cent',
      parentInfo: '孙春测试',
      bankName: '建设银行',
      bankAccount: '6222026449953404355',
      idName: 'test-沈栋晓',
      idNo: '210102198602102359',
      withdrawTypeNameSnapshot: '返佣多发扣回',
      countAsRealWithdrawSnapshot: false,
      payMethod: 'passttopay',
      withdrawAmount: 5,
      withdrawCurrency: 'USD',
      arrivalAmount: 12,
      arrivalCurrency: 'CNY',
      rate: 2.333,
      feeAmount: 0,
      feeCurrency: 'USD',
      balance: 20005.08,
      equity: 20005.08,
      freeMargin: 20005.08,
      accountCurrency: 'USC/美分',
      auditStatus: '已审核',
      payStatus: '待支付',
      applyTime: '2026-07-20 15:09:10',
      handleTime: '2026-07-20 15:16:56',
      riskText: '客户是平台异常名单'
    }
  }
  return {
    orderNo: 'OUT_923832107870979672',
    mtAccount: '8100453',
    mtType: 'standard',
    mtTypeLabel: '标准账户',
    accountName: 'test-b5',
    email: 'b5@example.com',
    phone: '13932282801',
    mtGroup: 'real\\HATC-Inland\\Test\\Stan',
    parentInfo: '-',
    bankName: '招商银行',
    bankAccount: '6214830000000000',
    idName: 'test-b5',
    idNo: '110101199001011234',
    withdrawTypeNameSnapshot: '',
    countAsRealWithdrawSnapshot: null,
    payMethod: 'MAXPAY-USDT',
    withdrawAmount: 1233,
    withdrawCurrency: 'USD',
    arrivalAmount: 1233,
    arrivalCurrency: 'USD',
    rate: 1,
    feeAmount: 0,
    feeCurrency: 'USD',
    balance: 10000,
    equity: 10000,
    freeMargin: 10000,
    accountCurrency: 'USD',
    payMethod: 'MAXPAY-USDT',
    auditStatus: '会签审核',
    payStatus: '待支付',
    applyTime: '2026-07-31 15:07:06',
    handleTime: '2026-07-31 15:07:08',
    riskText: ''
  }
})

const displayText = (v) => (v === null || v === undefined || String(v).trim() === '' ? '-' : String(v))

const formatAmount = (v) => {
  if (v === null || v === undefined || v === '') return '-'
  const n = Number(v)
  if (!Number.isFinite(n)) return '-'
  return n.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

const moneyText = (amount, currency) => {
  const a = formatAmount(amount)
  if (a === '-') return '-'
  return `${a} ${displayText(currency)}`
}

const countAsRealTag = (v) => {
  if (v === true) return { text: '是', cls: 'bg-emerald-50 text-emerald-700 border-emerald-200' }
  if (v === false) return { text: '否', cls: 'bg-gray-100 text-gray-600 border-gray-200' }
  return { text: '-', cls: 'bg-gray-100 text-gray-600 border-gray-200' }
}

const withdrawBasicRows = computed(() => {
  const typeNameSnapshot = displayText(detail.value.withdrawTypeNameSnapshot)
  const tag = countAsRealTag(detail.value.countAsRealWithdrawSnapshot)
  const highlightLabelClass = 'text-red-500 font-medium'

  return [
    {
      key: 'r1',
      cells: [
        { key: 'mtAccount', label: 'MT账号', value: displayText(detail.value.mtAccount) },
        { key: 'accountName', label: '账户名称', value: displayText(detail.value.accountName) },
        { key: 'mtGroup', label: 'MT分组', value: displayText(detail.value.mtGroup) }
      ]
    },
    {
      key: 'r2',
      cells: [
        {
          key: 'withdrawType',
          label: '出金类型',
          value: typeNameSnapshot,
          labelClass: highlightLabelClass,
          valueClass: typeNameSnapshot === '-' ? highlightLabelClass : undefined
        },
        {
          key: 'countAsReal',
          label: '是否计入真实出金',
          labelClass: highlightLabelClass,
          ...(tag.text === '-'
            ? { value: '-', valueClass: highlightLabelClass }
            : { type: 'tag', value: tag.text, tagClass: tag.cls })
        },
        { key: 'payMethod', label: '支付方式', value: displayText(detail.value.payMethod) }
      ]
    },
    {
      key: 'r3',
      cells: [
        { key: 'parentInfo', label: '上级信息', value: displayText(detail.value.parentInfo) },
        { key: 'phone', label: '手机号', value: displayText(detail.value.phone) },
        { key: 'id', label: '证件信息', value: `${displayText(detail.value.idName)} / ${displayText(detail.value.idNo)}` }
      ]
    },
    {
      key: 'r4',
      cells: [
        { key: 'bankName', label: '银行名称', value: displayText(detail.value.bankName) },
        { key: 'bankAccount', label: '银行账号', value: displayText(detail.value.bankAccount) },
        { key: 'applyTime', label: '申请时间', value: displayText(detail.value.applyTime) }
      ]
    },
    {
      key: 'r5',
      cells: [{ key: 'handleTime', label: '处理时间', value: displayText(detail.value.handleTime) }]
    }
  ]
})

const fundInfoFields = computed(() => [
  { key: 'withdrawAmount', label: '出金金额及币种', value: moneyText(detail.value.withdrawAmount, detail.value.withdrawCurrency) },
  { key: 'arrivalAmount', label: '到账金额及币种', value: moneyText(detail.value.arrivalAmount, detail.value.arrivalCurrency) },
  { key: 'rate', label: '汇率', value: displayText(detail.value.rate) },
  { key: 'fee', label: '出金手续费及币种', value: moneyText(detail.value.feeAmount, detail.value.feeCurrency) },
  { key: 'balance', label: '账户余额', value: moneyText(detail.value.balance, detail.value.accountCurrency) },
  { key: 'equity', label: '账户净值', value: moneyText(detail.value.equity, detail.value.accountCurrency) },
  { key: 'freeMargin', label: '可用保证金', value: moneyText(detail.value.freeMargin, detail.value.accountCurrency) }
])

const depositPage = ref(1)
const depositPageSize = 4

const depositRowsSorted = computed(() => {
  const rows = [
    {
      orderId: '942659247831777930',
      mtAccount: '8110474',
      mtTypeLabel: '美分账户',
      amountText: 'USC 10,000.00',
      payMethod: 'crm',
      auditStatus: '已审核',
      payStatus: '支付成功',
      applyTime: '2026-09-21 13:59:26',
      handleTime: '2026-09-21 13:59:27'
    },
    {
      orderId: 'IN_942622071760881534',
      mtAccount: '8150145',
      mtTypeLabel: '标准账户',
      amountText: '$5.00',
      payMethod: 'NowPay-Cny',
      auditStatus: '待审核',
      payStatus: '待支付',
      applyTime: '2026-09-21 11:31:42',
      handleTime: '-'
    },
    {
      orderId: 'IN_940149089985626519',
      mtAccount: '8150145',
      mtTypeLabel: '标准账户',
      amountText: '$4.00',
      payMethod: 'NowPay-Cny',
      auditStatus: '待审核',
      payStatus: '支付取消',
      applyTime: '2026-09-14 15:44:58',
      handleTime: '-'
    },
    {
      orderId: '938610544380741746',
      mtAccount: '8150145',
      mtTypeLabel: '标准账户',
      amountText: '$1,000.00',
      payMethod: 'crm',
      auditStatus: '已审核',
      payStatus: '支付成功',
      applyTime: '2026-09-10 09:51:20',
      handleTime: '2026-09-10 09:51:21'
    }
  ]

  const toTs = (t) => {
    const ts = Date.parse(String(t || '').replace(/-/g, '/'))
    return Number.isFinite(ts) ? ts : 0
  }
  return rows.slice().sort((a, b) => toTs(b.applyTime) - toTs(a.applyTime))
})

const depositTotalPages = computed(() => Math.max(1, Math.ceil(depositRowsSorted.value.length / depositPageSize)))

const pagedDepositRows = computed(() => {
  if (depositPage.value > depositTotalPages.value) depositPage.value = depositTotalPages.value
  const start = (depositPage.value - 1) * depositPageSize
  return depositRowsSorted.value.slice(start, start + depositPageSize)
})

const paymentRows = computed(() => [
  {
    payMethod: displayText(detail.value.payMethod),
    payNo: displayText(detail.value.orderNo ? `OUT_${String(detail.value.orderNo).slice(-16)}` : '-'),
    payTime: displayText(detail.value.handleTime),
    payStatus: displayText(detail.value.payStatus),
    actualPayAmount: moneyText(detail.value.arrivalAmount, detail.value.arrivalCurrency),
    shouldPayAmount: moneyText(detail.value.withdrawAmount, detail.value.withdrawCurrency),
    operator: displayText(detail.value.accountName),
    reason: '-'
  }
])

const timelineRows = computed(() => {
  const base = [
    { title: '发起申请', time: displayText(detail.value.applyTime), operator: displayText(detail.value.accountName), note: '', dotClass: 'bg-green-500' },
    { title: '客服审核', time: displayText(detail.value.handleTime), operator: '客服-A', note: detail.value.auditStatus === '会签审核' ? '会签审核中' : '通过', dotClass: detail.value.auditStatus === '会签审核' ? 'bg-amber-500' : 'bg-green-500' },
    { title: '风控审核', time: detail.value.auditStatus === '会签审核' ? '-' : displayText(detail.value.handleTime), operator: detail.value.auditStatus === '会签审核' ? '' : '风控-A', note: detail.value.auditStatus === '会签审核' ? '会签审核中' : '通过', dotClass: detail.value.auditStatus === '会签审核' ? 'bg-gray-300' : 'bg-green-500' },
    { title: '财务审核', time: detail.value.auditStatus === '会签审核' ? '-' : displayText(detail.value.handleTime), operator: detail.value.auditStatus === '会签审核' ? '' : '财务-A', note: detail.value.auditStatus === '会签审核' ? '会签审核中' : '通过', dotClass: detail.value.auditStatus === '会签审核' ? 'bg-gray-300' : 'bg-green-500' },
    { title: '支付处理', time: displayText(detail.value.handleTime), operator: displayText(detail.value.accountName), note: displayText(detail.value.payStatus), dotClass: detail.value.payStatus === '支付成功' ? 'bg-green-500' : detail.value.payStatus === '待支付' ? 'bg-amber-500' : 'bg-gray-300' },
    { title: detail.value.auditStatus === '审核拒绝' ? '拒绝' : '完成', time: detail.value.payStatus === '支付成功' ? displayText(detail.value.handleTime) : '-', operator: detail.value.payStatus === '支付成功' ? displayText(detail.value.accountName) : '', note: detail.value.payStatus === '支付成功' ? '完成' : (detail.value.auditStatus === '会签审核' ? '会签审核中' : '-'), dotClass: detail.value.payStatus === '支付成功' ? 'bg-green-500' : 'bg-gray-300' }
  ]
  return base
})

const stampText = computed(() => {
  if (detail.value.auditStatus === '会签审核') return '会签审核中'
  if (detail.value.auditStatus === '审核拒绝') return '已拒绝'
  return '已审核'
})

const riskText = computed(() => displayText(detail.value.riskText))
</script>
