<template>
  <div class="flex h-full bg-mainBg overflow-hidden">
    <div class="flex-1 flex flex-col min-w-0 bg-gray-50 overflow-hidden p-4 custom-scrollbar overflow-y-auto">
      <div class="w-full max-w-7xl mx-auto p-2 sm:p-4">
        <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <div>
            <h1 class="text-2xl font-bold text-gray-900">我的智能交易系统订单</h1>
            <p class="text-sm text-gray-500 mt-1">查看您购买的智能交易系统、托管商品及运行状态</p>
          </div>
          <router-link
            class="px-5 py-2.5 bg-primary hover:bg-primaryHover text-white rounded-lg text-sm font-medium transition-colors shadow-sm flex items-center gap-2 w-fit"
            to="/crm/client-product-list"
          >
            <i class="fas fa-store"></i>
            继续选购
          </router-link>
        </div>

        <div class="border-b border-gray-200 mb-6 overflow-x-auto">
          <nav class="-mb-px flex gap-8 min-w-max">
            <button
              v-for="t in tabs"
              :key="t.key"
              class="whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors"
              :class="activeTab === t.key ? 'border-primary text-primary' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'"
              type="button"
              @click="activeTab = t.key"
            >
              {{ t.label }}
              <span v-if="typeof t.badge === 'number'" class="ml-1 bg-yellow-100 text-yellow-600 py-0.5 px-2 rounded-full text-xs">
                {{ t.badge }}
              </span>
            </button>
          </nav>
        </div>

        <div class="space-y-4">
          <div
            v-for="o in filteredOrders"
            :key="o.id"
            class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"
            :class="[o.muted ? 'opacity-75' : '', isHighlighted(o) ? 'border-l-4 border-primary bg-primary/5' : '']"
          >
            <div class="bg-gray-50 px-6 py-3 border-b border-gray-200 flex justify-between items-center gap-4">
              <div class="text-sm text-gray-500 min-w-0">
                <span class="font-medium text-gray-700 mr-4">{{ o.createdAt }}</span>
                <span class="truncate">订单号: {{ o.orderNo }}</span>
              </div>
              <span class="shrink-0 px-2.5 py-1 rounded text-xs font-medium border flex items-center gap-1" :class="o.statusBadgeClass">
                <i :class="o.statusIcon"></i>
                {{ o.statusLabel }}
              </span>
            </div>

            <div class="p-6 flex flex-col md:flex-row gap-6 items-center">
              <div class="w-24 h-24 rounded-lg flex items-center justify-center shrink-0 relative overflow-hidden" :class="o.coverClass">
                <i class="fas text-3xl relative z-10" :class="o.coverIcon"></i>
              </div>
              <div class="flex-1 min-w-0">
                <h3 class="text-lg font-bold text-gray-900 mb-1 truncate">{{ o.productName }}</h3>
                <p class="text-sm text-gray-500 mb-3">{{ o.packageName }}</p>
                <div class="text-sm text-gray-600">
                  支付方式: <span class="font-medium">{{ o.payMethod }}</span>
                </div>
                <div v-if="o.effectDate || o.expireDate" class="text-sm text-gray-600 flex flex-wrap gap-4 mt-2">
                  <span v-if="o.effectDate">生效日期: <span class="font-medium">{{ o.effectDate }}</span></span>
                  <span v-if="o.expireDate">到期日期: <span class="font-medium">{{ o.expireDate }}</span></span>
                </div>
              </div>
              <div class="text-right">
                <div class="text-2xl font-bold mb-1" :class="o.muted ? 'text-gray-400' : 'text-gray-900'">${{ o.amount }}</div>
                <p v-if="o.note" class="text-xs" :class="o.muted ? 'text-gray-400' : 'text-gray-400'">{{ o.note }}</p>
              </div>
            </div>
          </div>

          <div v-if="filteredOrders.length === 0" class="bg-white rounded-xl border border-gray-200 p-10 text-center text-sm text-gray-500">
            暂无订单数据
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const tabs = [
  { key: 'all', label: '全部订单' },
  { key: 'pending', label: '待确认', badge: 1 },
  { key: 'active', label: '生效中' },
  { key: 'closed', label: '已失效 / 退款' }
]

const activeTab = ref('all')

const orders = ref([
  {
    id: 'ORD-20260625-8891',
    createdAt: '2026-06-25 14:30:22',
    orderNo: 'ORD-20260625-8891',
    productId: 1,
    statusKey: 'pending',
    statusLabel: '待确认',
    statusIcon: 'fas fa-clock',
    statusBadgeClass: 'text-yellow-600 bg-yellow-50 border-yellow-100',
    coverClass: 'bg-gradient-to-r from-gray-900 to-gray-800',
    coverIcon: 'fa-rocket text-[#55B9B9]',
    productName: '先锋一号',
    packageName: '进阶版',
    payMethod: 'CRM 钱包余额扣除',
    amount: '50,000.00',
    note: '已提交，等待后台确认并扣款',
    muted: false
  },
  {
    id: 'ORD-20260620-3402',
    createdAt: '2026-06-20 10:12:10',
    orderNo: 'ORD-20260620-3402',
    productId: 2,
    statusKey: 'pending',
    statusLabel: '待确认',
    statusIcon: 'fas fa-clock',
    statusBadgeClass: 'text-yellow-600 bg-yellow-50 border-yellow-100',
    coverClass: 'bg-gradient-to-r from-teal-900 to-teal-800',
    coverIcon: 'fa-code text-teal-200',
    productName: '先锋二号',
    packageName: '买断版',
    payMethod: 'CRM 钱包余额扣除',
    amount: '800.00',
    note: '已提交，等待后台确认并扣款',
    muted: false
  },
  {
    id: 'ORD-20260510-1024',
    createdAt: '2026-05-10 09:15:00',
    orderNo: 'ORD-20260510-1024',
    productId: 4,
    statusKey: 'active',
    statusLabel: '生效中',
    statusIcon: 'fas fa-check-circle',
    statusBadgeClass: 'text-green-600 bg-green-50 border-green-100',
    coverClass: 'bg-gradient-to-r from-blue-900 to-indigo-900',
    coverIcon: 'fa-chart-line text-blue-300',
    productName: '先锋四号',
    packageName: '按月订阅',
    payMethod: 'CRM 钱包余额扣除',
    amount: '199.00',
    note: '',
    effectDate: '2026-05-10',
    expireDate: '2026-06-10',
    muted: false
  },
  {
    id: 'ORD-20260401-0089',
    createdAt: '2026-04-01 11:20:00',
    orderNo: 'ORD-20260401-0089',
    productId: 1,
    statusKey: 'closed',
    statusLabel: '已拒绝/取消',
    statusIcon: 'fas fa-times-circle',
    statusBadgeClass: 'text-red-500 bg-red-50 border-red-100',
    coverClass: 'bg-gray-200',
    coverIcon: 'fa-box text-gray-400',
    productName: '先锋一号',
    packageName: '进阶版',
    payMethod: 'CRM 钱包余额扣除',
    amount: '5,000.00',
    note: '',
    muted: true
  }
])

const highlightTargetOrderNo = computed(() => {
  const queryOrderId = route.query.orderId ? String(route.query.orderId) : ''
  if (queryOrderId) return queryOrderId

  const n = Number(route.query.productId)
  const queryProductId = Number.isFinite(n) ? n : null
  if (!queryProductId) return ''

  const match = orders.value.find((o) => o.productId === queryProductId)
  return match?.orderNo ?? ''
})

const isHighlighted = (o) => {
  if (!highlightTargetOrderNo.value) return false
  return o.orderNo === highlightTargetOrderNo.value || o.id === highlightTargetOrderNo.value
}

const filteredOrders = computed(() => {
  if (activeTab.value === 'all') return orders.value
  return orders.value.filter((o) => o.statusKey === activeTab.value)
})
</script>
