<template>
  <div class="flex h-full bg-mainBg overflow-hidden w-full">
    <div class="flex-1 flex flex-col min-w-0 bg-gray-50 overflow-hidden p-4 custom-scrollbar overflow-y-auto w-full">
      <div class="flex-1 p-4 bg-gray-50 flex flex-col md:flex-row gap-4 overflow-hidden">
        <RelationTree
          width-class="w-full md:w-[232px]"
          height-class="h-[240px] md:h-full"
          :data="relationTreeData"
          auto-select
          default-selected-text="华安"
          @node-click="handleRelationNodeClick"
        />
        <div class="flex-1 flex flex-col gap-4 overflow-y-auto no-scrollbar min-w-0">
          <div class="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
            <div class="text-sm font-bold text-gray-800 mb-3">筛选</div>
            <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-12 gap-3 text-xs">
              <div class="flex items-center gap-2 xl:col-span-3">
                <div class="text-gray-600 w-[72px] shrink-0 text-right">交易品种：</div>
                <el-select v-model="form.symbol" class="flex-1" placeholder="全部">
                  <el-option v-for="o in symbolOptions" :key="o" :label="o" :value="o" />
                </el-select>
              </div>
              <div class="flex items-center justify-end gap-3 xl:col-span-9">
                <button class="bg-white border border-gray-300 text-gray-600 hover:bg-gray-50 px-6 py-2 rounded text-xs transition-colors shadow-sm font-medium" @click="resetSearch">
                  重置
                </button>
                <button class="bg-white border border-primaryBtn text-primaryBtn hover:bg-primaryBtn hover:text-white px-6 py-2 rounded text-xs transition-colors shadow-sm font-medium" @click="applySearch">
                  查询
                </button>
                <button class="bg-[#41B8AF] hover:bg-[#359f97] text-white px-6 py-2 rounded text-xs transition-colors shadow-sm font-medium" type="button">
                  导出
                </button>
              </div>
            </div>
          </div>
          <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div class="rounded-lg shadow-sm border p-3 bg-[#d1a84f]/5 border-[#d1a84f]/25">
              <div class="text-[11px] text-[#b8903f] font-medium">交易品种数</div>
              <div class="mt-1 font-bold font-mono text-xl text-gray-900">{{ kpi.symbolCount }}</div>
            </div>
            <div class="rounded-lg shadow-sm border p-3 bg-white border-gray-100">
              <div class="text-[11px] text-gray-600">订单数</div>
              <div class="mt-1 font-bold font-mono text-base text-gray-800">{{ kpi.orderCount }}</div>
            </div>
            <div class="rounded-lg shadow-sm border p-3 bg-white border-gray-100">
              <div class="text-[11px] text-gray-600">浮动盈亏(USD)</div>
              <div class="mt-1 font-bold font-mono text-base" :class="kpi.floatingPnl >= 0 ? 'text-emerald-700' : 'text-red-600'">
                {{ formatMoney(kpi.floatingPnl) }}
              </div>
            </div>
            <div class="rounded-lg shadow-sm border p-3 bg-white border-gray-100">
              <div class="text-[11px] text-gray-600">净头寸(手)</div>
              <div class="mt-1 font-bold font-mono text-base text-gray-800">{{ formatLots(kpi.netLots) }}</div>
            </div>
          </div>
          <div class="flex-1 min-h-0 bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
            <DataTable :data="displayRows" :total="aggregatedRows.length" v-model:page="page" v-model:limit="limit" @change="handlePageChange">
              <el-table-column prop="symbol" label="交易品种" width="120" />
              <el-table-column label="净头寸(手)" width="140" align="right">
                <template #default="{ row }">
                  <span class="font-mono">{{ formatLots(row.netLots) }}</span>
                </template>
              </el-table-column>
              <el-table-column label="浮动盈亏(USD)" min-width="160" align="right">
                <template #default="{ row }">
                  <span class="font-mono" :class="row.floatingPnl >= 0 ? 'text-emerald-700' : 'text-red-600'">{{ formatMoney(row.floatingPnl) }}</span>
                </template>
              </el-table-column>
              <el-table-column label="笔数(BUY/SELL)" width="140" align="center">
                <template #default="{ row }">
                  <span class="font-mono">{{ row.buyOrders }} / {{ row.sellOrders }}</span>
                </template>
              </el-table-column>
              <el-table-column label="买入 / 价格" min-width="180">
                <template #default="{ row }">
                  <div class="font-mono text-gray-800">{{ formatLots(row.buyLots) }}</div>
                  <div class="text-[11px] text-gray-400 mt-0.5">均价 {{ formatPrice(row.buyAvgPrice) }}</div>
                </template>
              </el-table-column>
              <el-table-column label="卖出 / 价格" min-width="180">
                <template #default="{ row }">
                  <div class="font-mono text-gray-800">{{ formatLots(row.sellLots) }}</div>
                  <div class="text-[11px] text-gray-400 mt-0.5">均价 {{ formatPrice(row.sellAvgPrice) }}</div>
                </template>
              </el-table-column>
            </DataTable>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, reactive, ref } from 'vue'
import RelationTree from '@/components/RelationTree.vue'
import DataTable from '@/components/DataTable.vue'
import { relationTreeDemoData } from '@/mocks/relation-tree-demo'

const relationTreeData = computed(() => relationTreeDemoData)

const symbolOptions = ['全部', 'XAUUSD', 'XAGUSD', 'EURUSD']

const form = reactive({
  symbol: '全部'
})

const applied = ref({ ...form })
const selectedRelation = ref(null)

const relationScopes = computed(() => {
  const roots = relationTreeData.value || []
  const clientsMap = new Map()

  const walk = (node) => {
    if (!node || node.type !== 'ib') return []
    let clientIds = []
    const children = Array.isArray(node.children) ? node.children : []
    for (const ch of children) {
      if (ch.type === 'client') clientIds.push(ch.id)
      if (ch.type === 'ib') clientIds = clientIds.concat(walk(ch))
    }
    clientsMap.set(node.id, clientIds)
    return clientIds
  }

  for (const r of roots) walk(r)
  return clientsMap
})

const baseOrders = ref([
  { clientId: 70, agentId: 42, symbol: 'XAUUSD', side: 'BUY', lots: 1.2, price: 2350.25, floatingPnl: 38.2 },
  { clientId: 70, agentId: 42, symbol: 'XAUUSD', side: 'SELL', lots: 0.4, price: 2352.6, floatingPnl: -6.5 },
  { clientId: 319, agentId: 42, symbol: 'XAGUSD', side: 'BUY', lots: 2.0, price: 28.12, floatingPnl: 12.3 },
  { clientId: 319, agentId: 42, symbol: 'EURUSD', side: 'SELL', lots: 1.0, price: 1.0832, floatingPnl: -9.1 },
  { clientId: 329, agentId: 42, symbol: 'XAUUSD', side: 'BUY', lots: 0.8, price: 2348.7, floatingPnl: 15.6 },
  { clientId: 999, agentId: null, symbol: 'EURUSD', side: 'BUY', lots: 0.5, price: 1.0810, floatingPnl: 3.2 }
])

const applySearch = () => {
  applied.value = { ...form }
}

const resetSearch = () => {
  form.symbol = symbolOptions[0]
  applied.value = { ...form }
}

const handleRelationNodeClick = (node) => {
  selectedRelation.value = node
}

const scopedOrders = computed(() => {
  const scope = selectedRelation.value
  const symbol = applied.value.symbol

  return baseOrders.value.filter((row) => {
    let okScope = true
    if (scope?.type === 'client') {
      okScope = Number(row.clientId) === Number(scope.id)
    } else if (scope?.type === 'ib') {
      const ids = relationScopes.value.get(scope.id) || []
      okScope = ids.length ? ids.includes(Number(row.clientId)) : false
    }

    if (!okScope) return false
    if (symbol !== '全部' && row.symbol !== symbol) return false
    return true
  })
})

const aggregatedRows = computed(() => {
  const map = new Map()
  for (const r of scopedOrders.value) {
    if (!map.has(r.symbol)) {
      map.set(r.symbol, {
        symbol: r.symbol,
        buyLots: 0,
        buyAmount: 0,
        buyOrders: 0,
        sellLots: 0,
        sellAmount: 0,
        sellOrders: 0,
        floatingPnl: 0
      })
    }
    const item = map.get(r.symbol)
    item.floatingPnl += Number(r.floatingPnl || 0)
    if (r.side === 'BUY') {
      item.buyLots += Number(r.lots || 0)
      item.buyAmount += Number(r.lots || 0) * Number(r.price || 0)
      item.buyOrders += 1
    } else {
      item.sellLots += Number(r.lots || 0)
      item.sellAmount += Number(r.lots || 0) * Number(r.price || 0)
      item.sellOrders += 1
    }
  }
  return Array.from(map.values()).map((r) => ({
    ...r,
    netLots: r.buyLots - r.sellLots,
    buyAvgPrice: r.buyLots ? r.buyAmount / r.buyLots : 0,
    sellAvgPrice: r.sellLots ? r.sellAmount / r.sellLots : 0
  }))
})

const kpi = computed(() => {
  const rows = aggregatedRows.value
  const orders = scopedOrders.value
  const floatingPnl = rows.reduce((s, r) => s + Number(r.floatingPnl || 0), 0)
  const netLots = rows.reduce((s, r) => s + Number(r.netLots || 0), 0)
  return {
    symbolCount: rows.length,
    orderCount: orders.length,
    floatingPnl,
    netLots
  }
})

const page = ref(1)
const limit = ref(20)

const displayRows = computed(() => {
  const start = (page.value - 1) * limit.value
  return aggregatedRows.value.slice(start, start + limit.value)
})

const handlePageChange = () => {
}

const formatMoney = (v) => {
  const num = Number(v || 0)
  return num.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

const formatLots = (v) => {
  const num = Number(v || 0)
  return num.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

const formatPrice = (v) => {
  const num = Number(v || 0)
  return num.toLocaleString(undefined, { minimumFractionDigits: 4, maximumFractionDigits: 4 })
}
</script>
