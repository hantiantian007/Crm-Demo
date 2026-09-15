<template>
  <div class="flex bg-mainBg overflow-hidden min-h-0">
    <div class="flex-1 flex flex-col min-w-0 bg-gray-50 overflow-hidden p-4 custom-scrollbar overflow-y-auto">
      <div class="bg-white rounded-xl border border-gray-100 shadow-sm p-4 sm:p-6">
        <div class="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div class="min-w-0">
            <div class="flex items-center gap-3 flex-wrap">
              <div class="text-lg font-semibold text-gray-900">账户详情</div>
              <span :class="accountTypeBadgeClass" class="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium border">
                {{ accountTypeLabel }}
              </span>
              <span :class="statusBadgeClass" class="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium border">
                {{ account.value.status }}
              </span>
            </div>
            <div class="mt-2 text-sm text-gray-600 flex items-center gap-2 flex-wrap">
              <span class="text-gray-500">MT账号</span>
              <span class="font-semibold text-gray-900">{{ account.value.mtAccount }}</span>
              <span class="text-gray-300">|</span>
              <span class="text-gray-500">所属客户</span>
              <button class="text-blue-600 hover:underline font-medium" type="button" @click="goClientDetail">
                {{ account.value.clientName }}（{{ account.value.clientId }}）
              </button>
            </div>
          </div>

          <div class="flex items-center gap-2 shrink-0">
            <button class="h-9 px-3 rounded bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium transition-colors" type="button" @click="goBack">
              返回列表
            </button>
            <button class="h-9 px-3 rounded bg-primary hover:bg-primaryHover text-white text-sm font-medium transition-colors" type="button" @click="goClientDetail">
              客户详情
            </button>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-1 xl:grid-cols-3 gap-4 mt-4">
        <section class="xl:col-span-2 bg-white rounded-xl border border-gray-100 shadow-sm p-4 sm:p-6">
          <div class="text-base font-semibold text-gray-900">账户基础信息</div>
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4 text-sm">
            <div class="rounded-lg bg-gray-50 border border-gray-100 p-3">
              <div class="text-xs text-gray-500">MT账号</div>
              <div class="mt-1 font-semibold text-gray-900">{{ account.value.mtAccount }}</div>
            </div>
            <div class="rounded-lg bg-gray-50 border border-gray-100 p-3">
              <div class="text-xs text-gray-500">客户ID</div>
              <div class="mt-1 font-semibold text-gray-900">{{ account.value.clientId }}</div>
            </div>
            <div class="rounded-lg bg-gray-50 border border-gray-100 p-3">
              <div class="text-xs text-gray-500">客户姓名</div>
              <div class="mt-1 font-semibold text-gray-900">{{ account.value.clientName }}</div>
            </div>
            <div class="rounded-lg bg-gray-50 border border-gray-100 p-3">
              <div class="text-xs text-gray-500">账户类型</div>
              <div class="mt-1 font-semibold text-gray-900">{{ accountTypeLabel }}</div>
            </div>
            <div class="rounded-lg bg-gray-50 border border-gray-100 p-3">
              <div class="text-xs text-gray-500">账号属性</div>
              <div class="mt-1 font-semibold text-gray-900">{{ account.value.accountProperty }}</div>
            </div>
            <div class="rounded-lg bg-gray-50 border border-gray-100 p-3">
              <div class="text-xs text-gray-500">杠杆</div>
              <div class="mt-1 font-semibold text-gray-900">{{ account.value.leverage }}</div>
            </div>
            <div class="rounded-lg bg-gray-50 border border-gray-100 p-3 sm:col-span-2 lg:col-span-3">
              <div class="text-xs text-gray-500">MT Group</div>
              <div class="mt-1 font-semibold text-gray-900 break-all">{{ account.value.group }}</div>
            </div>
            <div class="rounded-lg bg-gray-50 border border-gray-100 p-3">
              <div class="text-xs text-gray-500">注册时间</div>
              <div class="mt-1 font-semibold text-gray-900">{{ account.value.registerTime }}</div>
            </div>
            <div class="rounded-lg bg-gray-50 border border-gray-100 p-3">
              <div class="text-xs text-gray-500">开户时间</div>
              <div class="mt-1 font-semibold text-gray-900">{{ account.value.openTime }}</div>
            </div>
          </div>
        </section>

        <section class="bg-white rounded-xl border border-gray-100 shadow-sm p-4 sm:p-6">
          <div class="flex items-center justify-between gap-3">
            <div class="text-base font-semibold text-gray-900">资金记录入口</div>
            <div class="text-xs text-gray-500">演示跳转</div>
          </div>
          <div class="grid grid-cols-2 gap-2 mt-4">
            <button class="h-10 rounded bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium transition-colors" type="button" @click="goDepositRecord">
              入金记录
            </button>
            <button class="h-10 rounded bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium transition-colors" type="button" @click="goWithdrawRecord">
              出金记录
            </button>
            <button class="h-10 rounded bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium transition-colors" type="button" @click="goInternalTransferRecord">
              内部转账记录
            </button>
            <button class="h-10 rounded bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium transition-colors" type="button" @click="goTradeRecord">
              交易记录
            </button>
          </div>
          <div v-if="account.value.accountType === 'cent'" class="mt-4 rounded-lg bg-amber-50 border border-amber-100 p-3 text-xs text-amber-700 leading-5">
            美分账户金额默认展示 USC/美分，并在部分金额下方给出折算 USD 口径（演示）。
          </div>
        </section>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4">
        <section class="bg-white rounded-xl border border-gray-100 shadow-sm p-4 sm:p-6">
          <div class="text-base font-semibold text-gray-900">账户资金</div>
          <div class="grid grid-cols-2 gap-3 mt-4 text-sm">
            <div class="rounded-lg bg-gray-50 border border-gray-100 p-3">
              <div class="text-xs text-gray-500">Balance</div>
              <div class="mt-1 font-semibold text-gray-900">{{ formatMoneyWithUnit(account.value.funds.balance) }}</div>
              <div v-if="showUsdHint" class="mt-1 text-xs text-gray-500">USD：{{ formatUsdFromCent(account.value.funds.balance) }}</div>
            </div>
            <div class="rounded-lg bg-gray-50 border border-gray-100 p-3">
              <div class="text-xs text-gray-500">Credit</div>
              <div class="mt-1 font-semibold text-gray-900">{{ formatMoneyWithUnit(account.value.funds.credit) }}</div>
              <div v-if="showUsdHint" class="mt-1 text-xs text-gray-500">USD：{{ formatUsdFromCent(account.value.funds.credit) }}</div>
            </div>
            <div class="rounded-lg bg-gray-50 border border-gray-100 p-3">
              <div class="text-xs text-gray-500">Equity</div>
              <div class="mt-1 font-semibold text-gray-900">{{ formatMoneyWithUnit(account.value.funds.equity) }}</div>
              <div v-if="showUsdHint" class="mt-1 text-xs text-gray-500">USD：{{ formatUsdFromCent(account.value.funds.equity) }}</div>
            </div>
            <div class="rounded-lg bg-gray-50 border border-gray-100 p-3">
              <div class="text-xs text-gray-500">Margin</div>
              <div class="mt-1 font-semibold text-gray-900">{{ formatMoneyWithUnit(account.value.funds.margin) }}</div>
              <div v-if="showUsdHint" class="mt-1 text-xs text-gray-500">USD：{{ formatUsdFromCent(account.value.funds.margin) }}</div>
            </div>
            <div class="rounded-lg bg-gray-50 border border-gray-100 p-3">
              <div class="text-xs text-gray-500">Free Margin</div>
              <div class="mt-1 font-semibold text-gray-900">{{ formatMoneyWithUnit(account.value.funds.freeMargin) }}</div>
              <div v-if="showUsdHint" class="mt-1 text-xs text-gray-500">USD：{{ formatUsdFromCent(account.value.funds.freeMargin) }}</div>
            </div>
            <div class="rounded-lg bg-gray-50 border border-gray-100 p-3">
              <div class="text-xs text-gray-500">Margin Level</div>
              <div class="mt-1 font-semibold text-gray-900">{{ formatPercent(account.value.funds.marginLevel) }}</div>
            </div>
            <div class="rounded-lg bg-gray-50 border border-gray-100 p-3 col-span-2">
              <div class="text-xs text-gray-500">浮动盈亏</div>
              <div class="mt-1 font-semibold" :class="account.value.funds.floatingPnl >= 0 ? 'text-green-700' : 'text-red-600'">
                {{ formatSignedMoneyWithUnit(account.value.funds.floatingPnl) }}
              </div>
              <div v-if="showUsdHint" class="mt-1 text-xs text-gray-500">USD：{{ formatSignedUsdFromCent(account.value.funds.floatingPnl) }}</div>
            </div>
          </div>
        </section>

        <section class="bg-white rounded-xl border border-gray-100 shadow-sm p-4 sm:p-6">
          <div class="text-base font-semibold text-gray-900">交易概览</div>
          <div class="grid grid-cols-2 gap-3 mt-4 text-sm">
            <div class="rounded-lg bg-gray-50 border border-gray-100 p-3">
              <div class="text-xs text-gray-500">当前持仓量</div>
              <div class="mt-1 font-semibold text-gray-900">{{ formatNumber(account.value.trade.positionVolume) }}</div>
            </div>
            <div class="rounded-lg bg-gray-50 border border-gray-100 p-3">
              <div class="text-xs text-gray-500">累计交易量</div>
              <div class="mt-1 font-semibold text-gray-900">{{ formatNumber(account.value.trade.totalVolume) }}</div>
            </div>
            <div class="rounded-lg bg-gray-50 border border-gray-100 p-3">
              <div class="text-xs text-gray-500">平仓盈亏</div>
              <div class="mt-1 font-semibold" :class="account.value.trade.closedPnl >= 0 ? 'text-green-700' : 'text-red-600'">
                {{ formatSignedMoneyWithUnit(account.value.trade.closedPnl) }}
              </div>
              <div v-if="showUsdHint" class="mt-1 text-xs text-gray-500">USD：{{ formatSignedUsdFromCent(account.value.trade.closedPnl) }}</div>
            </div>
            <div class="rounded-lg bg-gray-50 border border-gray-100 p-3">
              <div class="text-xs text-gray-500">Swap / 利息</div>
              <div class="mt-1 font-semibold text-gray-900">{{ formatSignedMoneyWithUnit(account.value.trade.swap) }}</div>
              <div v-if="showUsdHint" class="mt-1 text-xs text-gray-500">USD：{{ formatSignedUsdFromCent(account.value.trade.swap) }}</div>
            </div>
            <div class="rounded-lg bg-gray-50 border border-gray-100 p-3 col-span-2">
              <div class="text-xs text-gray-500">Commission / Fee</div>
              <div class="mt-1 font-semibold text-gray-900">{{ formatSignedMoneyWithUnit(account.value.trade.commissionFee) }}</div>
              <div v-if="showUsdHint" class="mt-1 text-xs text-gray-500">USD：{{ formatSignedUsdFromCent(account.value.trade.commissionFee) }}</div>
            </div>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, watchEffect } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const router = useRouter()
const route = useRoute()

const demoAccounts = [
  {
    mtAccount: '8100458',
    clientId: '88820391',
    clientName: 'test-杨均',
    accountType: 'standard',
    accountProperty: '交易',
    group: 'real\\HATC\\Test\\Standard',
    leverage: '1:100',
    status: '正常',
    registerTime: '2026-06-08 15:04:05',
    openTime: '2026-06-08 15:05:15',
    funds: {
      balance: 1990.9,
      credit: 0,
      equity: 1990.9,
      margin: 0,
      freeMargin: 1990.9,
      marginLevel: 0,
      floatingPnl: 0
    },
    trade: {
      positionVolume: 0,
      totalVolume: 0.25,
      closedPnl: 0,
      swap: 0,
      commissionFee: 0
    }
  },
  {
    mtAccount: '8300255',
    clientId: '88820391',
    clientName: 'test-杨均',
    accountType: 'commission',
    accountProperty: '佣金',
    group: 'real\\HATC\\Test\\Agent',
    leverage: '1:100',
    status: '禁用',
    registerTime: '2026-06-08 15:04:05',
    openTime: '2026-06-08 15:05:29',
    funds: {
      balance: 3,
      credit: 0,
      equity: 3,
      margin: 0,
      freeMargin: 3,
      marginLevel: 0,
      floatingPnl: 0
    },
    trade: {
      positionVolume: 0,
      totalVolume: 0,
      closedPnl: 0,
      swap: 0,
      commissionFee: 0
    }
  },
  {
    mtAccount: '9900456',
    clientId: '88820391',
    clientName: 'test-杨均',
    accountType: 'cent',
    accountProperty: '交易',
    group: 'real\\HATC\\Cent\\Real-02',
    leverage: '1:100',
    status: '正常',
    registerTime: '2026-06-08 15:04:05',
    openTime: '2026-06-08 15:05:29',
    funds: {
      balance: 756000,
      credit: 500,
      equity: 760000,
      margin: 500,
      freeMargin: 83000,
      marginLevel: 142,
      floatingPnl: 4000
    },
    trade: {
      positionVolume: 1,
      totalVolume: 0.52,
      closedPnl: 2300,
      swap: -120,
      commissionFee: -35
    }
  },
  {
    mtAccount: '8300254',
    clientId: '99100012',
    clientName: 'test-韩心',
    accountType: 'commission',
    accountProperty: '佣金',
    group: 'real\\HATC\\Test\\Agent',
    leverage: '1:100',
    status: '禁用',
    registerTime: '2026-06-08 15:04:05',
    openTime: '2026-06-08 15:05:29',
    funds: {
      balance: 0.13,
      credit: 0,
      equity: 0.13,
      margin: 0,
      freeMargin: 0.13,
      marginLevel: 0,
      floatingPnl: 0
    },
    trade: {
      positionVolume: 0,
      totalVolume: 0,
      closedPnl: 0,
      swap: 0,
      commissionFee: 0
    }
  }
]

const account = ref(demoAccounts[0])

watchEffect(() => {
  const id = String(route.query.id || '').trim()
  if (!id) return
  const found = demoAccounts.find((x) => x.mtAccount === id)
  if (found) account.value = found
})

const showUsdHint = computed(() => account.value.accountType === 'cent')

const accountTypeLabel = computed(() => {
  if (account.value.accountType === 'standard') return '标准账户'
  if (account.value.accountType === 'commission') return '佣金账户'
  if (account.value.accountType === 'cent') return '美分账户'
  return account.value.accountType
})

const accountTypeBadgeClass = computed(() => {
  if (account.value.accountType === 'cent') return 'bg-red-50 border-red-200 text-red-700'
  if (account.value.accountType === 'commission') return 'bg-purple-50 border-purple-200 text-purple-700'
  return 'bg-blue-50 border-blue-200 text-blue-700'
})

const statusBadgeClass = computed(() => {
  if (account.value.status === '正常') return 'bg-green-50 border-green-200 text-green-700'
  if (account.value.status === '禁用') return 'bg-gray-100 border-gray-200 text-gray-700'
  return 'bg-gray-100 border-gray-200 text-gray-700'
})

const unitText = computed(() => (account.value.accountType === 'cent' ? 'USC/美分' : 'USD/美元'))

const amountDigits = computed(() => (account.value.accountType === 'commission' ? 4 : 2))

const formatNumber = (n, digits = 2) =>
  Number(n || 0).toLocaleString('en-US', { minimumFractionDigits: digits, maximumFractionDigits: digits })

const formatMoneyWithUnit = (n) => `${formatNumber(n, amountDigits.value)} ${unitText.value}`

const formatSignedMoneyWithUnit = (n) => {
  const value = Number(n || 0)
  const sign = value > 0 ? '+' : ''
  return `${sign}${formatNumber(value, amountDigits.value)} ${unitText.value}`
}

const formatUsdFromCent = (n) => `${formatNumber(Number(n || 0) / 100, 2)} USD/美元`

const formatSignedUsdFromCent = (n) => {
  const value = Number(n || 0) / 100
  const sign = value > 0 ? '+' : ''
  return `${sign}${formatNumber(value, 2)} USD/美元`
}

const formatPercent = (n) => {
  const value = Number(n || 0)
  if (!value) return '--'
  return `${formatNumber(value, 2)}%`
}

const goBack = () => router.push('/crm/account')

const goClientDetail = () => router.push({ path: '/crm/client-detail', query: { id: String(account.value.clientId || '') } })

const goDepositRecord = () => {
  if (account.value.accountType === 'cent') {
    router.push({ path: '/crm/client-deposit-record-cent-account', query: { account: String(account.value.mtAccount || '') } })
    return
  }
  router.push({ path: '/fund/deposit', query: { account: String(account.value.mtAccount || '') } })
}

const goWithdrawRecord = () => {
  if (account.value.accountType === 'cent') {
    router.push({ path: '/crm/client-withdraw-record-cent-account', query: { account: String(account.value.mtAccount || '') } })
    return
  }
  router.push({ path: '/fund/withdraw', query: { account: String(account.value.mtAccount || '') } })
}

const goInternalTransferRecord = () => {
  router.push({ path: '/fund/internal-transfer-record', query: { account: String(account.value.mtAccount || '') } })
}

const goTradeRecord = () => {
  router.push({ path: '/report/trade-record', query: { account: String(account.value.mtAccount || '') } })
}
</script>
