<template>
  <div class="flex h-full bg-mainBg overflow-hidden">
    <div class="flex-1 flex flex-col min-w-0 bg-gray-50 overflow-hidden p-4 custom-scrollbar overflow-y-auto">
      <div class="flex-1 overflow-y-auto p-6 flex flex-col gap-6 min-h-0">
 <!-- 工具栏：搜索 + 日期范围 + 状态筛选 -->
 <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
  <div class="flex items-center justify-between flex-wrap gap-4">
   <div class="flex items-center gap-5 flex-wrap">
    <div class="flex items-center gap-3">
     <label class="text-[13px] text-gray-600 font-medium whitespace-nowrap">
      对账日期范围:
     </label>
     <input v-model="filters.start" class="custom-input w-[160px]" type="date" />
     <span class="text-gray-400">
      至
     </span>
     <input v-model="filters.end" class="custom-input w-[160px]" type="date" />
    </div>
    <div class="flex items-center gap-2">
     <select v-model="filters.status" class="custom-select w-[140px]">
      <option value="all">
       请选择
      </option>
      <option value="normal">
       正常
      </option>
      <option value="abnormal">
       异常
      </option>
     </select>
    </div>
    <div class="flex items-center gap-2">
     <button class="rounded-md bg-[#C19B5E] px-4 py-2 text-[13px] font-medium text-white transition-colors hover:bg-[#B28B52]" type="button" @click="handleSearch">搜索</button>
     <button class="rounded-md border border-gray-300 bg-white px-4 py-2 text-[13px] font-medium text-gray-600 transition-colors hover:bg-gray-50" type="button" @click="handleReset">重置</button>
    </div>
   </div>
  </div>
 </div>
 <!-- 对账批次宽表（横向 nowrap 滚动） -->
 <div class="reconciliation-list-table-card bg-white rounded-xl shadow-sm border border-gray-100 flex flex-col">
  <div class="flex items-center justify-between p-5 border-b border-gray-100">
   <div class="flex items-center gap-3">
    <h3 class="font-bold text-gray-800 text-[15px]">
     对账批次列表
    </h3>
    <span class="pill pill-gray">
     共 31 条，异常批次 3 条已高亮
    </span>
   </div>
  </div>
  <div class="reconciliation-list-table-scroll overflow-x-auto no-scrollbar">
   <table class="commission-list-table custom-table w-full min-w-[1020px]">
    <thead class="bg-tableHeader sticky top-0">
     <tr>
      <th>
       对账日期
      </th>
      <th>
       平仓订单数
      </th>
      <th>
       应返佣金额
      </th>
      <th>
       CRM实际返佣金额
      </th>
      <th>
       MT返佣金额
      </th>
      <th>
       对账状态
      </th>
      <th>
       异常笔数
      </th>
      <th>
       金额差额
      </th>
      <th>
       操作
      </th>
     </tr>
    </thead>
    <tbody>
     <!-- 今日批次（待线下处理：异常） -->
     <tr class="bg-orange-50/30">
      <td class="font-semibold">
       2026-08-11
      </td>
      <td>
       328
      </td>
      <td class="font-mono font-semibold">
       $42,876.30
      </td>
      <td class="font-mono font-semibold">
       $42,938.90
      </td>
      <td class="font-mono" :class="mtAmountClass(mtCommissionAmounts['2026-08-11'], 42938.90)">
       {{ formatMtAmount(mtCommissionAmounts['2026-08-11']) }}
      </td>
      <td>
       <span class="pill pill-red">
        异常
       </span>
      </td>
      <td class="font-bold text-red-600">
       7 笔
      </td>
      <td class="font-bold text-red-600">
       +$62.60
      </td>
      <td>
       <div class="flex items-center justify-center">
        <a class="text-blue-600 hover:text-blue-800 text-[12px] font-medium px-2 py-1 rounded hover:bg-blue-50 transition-colors" href="#/crm/commission-daily-audit">
         查看详情
        </a>
       </div>
      </td>
     </tr>
     <!-- 昨天批次（异常未清零） -->
     <tr class="bg-red-50/20">
      <td>
       2026-08-10
      </td>
      <td>
       391
      </td>
      <td class="font-mono font-semibold">
       $51,228.80
      </td>
      <td class="font-mono font-semibold">
       $51,370.40
      </td>
      <td class="font-mono" :class="mtAmountClass(mtCommissionAmounts['2026-08-10'], 51370.40)">
       {{ formatMtAmount(mtCommissionAmounts['2026-08-10']) }}
      </td>
      <td>
       <span class="pill pill-red">
        异常
       </span>
      </td>
      <td class="font-bold text-red-600">
       3 笔
      </td>
      <td class="font-bold text-red-600">
       +$141.60
      </td>
      <td>
       <div class="flex items-center justify-center">
        <a class="text-blue-600 hover:text-blue-800 text-[12px] font-medium px-2 py-1 rounded hover:bg-blue-50 transition-colors" href="#/crm/commission-daily-audit">
         查看详情
        </a>
       </div>
      </td>
     </tr>
     <!-- 08-09 批次（正常） -->
     <tr>
      <td>
       2026-08-09
      </td>
      <td>
       418
      </td>
      <td class="font-mono">
       $58,394.10
      </td>
      <td class="font-mono">
       $58,394.10
      </td>
      <td class="font-mono" :class="mtAmountClass(mtCommissionAmounts['2026-08-09'], 58394.10)">
       {{ formatMtAmount(mtCommissionAmounts['2026-08-09']) }}
      </td>
      <td>
       <span class="pill pill-green">
        正常
       </span>
      </td>
      <td class="font-semibold text-emerald-700">
       0 笔
      </td>
      <td class="text-emerald-600 font-semibold">
       $0.00
      </td>
      <td>
       <div class="flex items-center justify-center">
        <a class="text-blue-600 hover:text-blue-800 text-[12px] font-medium px-2 py-1 rounded hover:bg-blue-50 transition-colors" href="#/crm/commission-daily-audit">
         查看详情
        </a>
       </div>
      </td>
     </tr>
     <!-- 08-08 批次（原4笔异常→线下处理完成→正常） -->
     <tr>
      <td>
       2026-08-08
      </td>
      <td>
       264
      </td>
      <td class="font-mono">
       $34,620.00
      </td>
      <td class="font-mono">
       $34,620.00
      </td>
      <td class="font-mono" :class="mtAmountClass(mtCommissionAmounts['2026-08-08'], 34620.00)">
       {{ formatMtAmount(mtCommissionAmounts['2026-08-08']) }}
      </td>
      <td>
       <span class="pill pill-green">
        正常
       </span>
      </td>
      <td class="font-semibold text-emerald-700">
       0 笔
      </td>
      <td class="text-emerald-600 font-semibold">
       $0.00
      </td>
      <td>
       <div class="flex items-center justify-center">
        <a class="text-blue-600 hover:text-blue-800 text-[12px] font-medium px-2 py-1 rounded hover:bg-blue-50 transition-colors" href="#/crm/commission-daily-audit">
         查看详情
        </a>
       </div>
      </td>
     </tr>
     <!-- 08-07 批次（正常） -->
     <tr>
      <td>
       2026-08-07
      </td>
      <td>
       302
      </td>
      <td class="font-mono">
       $40,088.25
      </td>
      <td class="font-mono">
       $40,088.25
      </td>
      <td class="font-mono" :class="mtAmountClass(mtCommissionAmounts['2026-08-07'], 40088.25)">
       {{ formatMtAmount(mtCommissionAmounts['2026-08-07']) }}
      </td>
      <td>
       <span class="pill pill-green">
        正常
       </span>
      </td>
      <td class="font-semibold text-emerald-700">
       0 笔
      </td>
      <td class="text-emerald-600 font-semibold">
       $0.00
      </td>
      <td>
       <div class="flex items-center justify-center">
        <a class="text-blue-600 hover:text-blue-800 text-[12px] font-medium px-2 py-1 rounded hover:bg-blue-50 transition-colors" href="#/crm/commission-daily-audit">
         查看详情
        </a>
       </div>
      </td>
     </tr>
     <!-- 08-06 批次（原9笔异常→线下处理完成→正常） -->
     <tr>
      <td>
       2026-08-06
      </td>
      <td>
       346
      </td>
      <td class="font-mono">
       $46,133.50
      </td>
      <td class="font-mono">
       $46,133.50
      </td>
      <td class="font-mono" :class="mtAmountClass(mtCommissionAmounts['2026-08-06'], 46133.50)">
       {{ formatMtAmount(mtCommissionAmounts['2026-08-06']) }}
      </td>
      <td>
       <span class="pill pill-green">
        正常
       </span>
      </td>
      <td class="font-semibold text-emerald-700">
       0 笔
      </td>
      <td class="text-emerald-600 font-semibold">
       $0.00
      </td>
      <td>
       <div class="flex items-center justify-center">
        <a class="text-blue-600 hover:text-blue-800 text-[12px] font-medium px-2 py-1 rounded hover:bg-blue-50 transition-colors" href="#/crm/commission-daily-audit">
         查看详情
        </a>
       </div>
      </td>
     </tr>
     <!-- 08-05 批次（正常） -->
     <tr>
      <td>
       2026-08-05
      </td>
      <td>
       312
      </td>
      <td class="font-mono">
       $41,285.80
      </td>
      <td class="font-mono">
       $41,285.80
      </td>
      <td class="font-mono" :class="mtAmountClass(mtCommissionAmounts['2026-08-05'], 41285.80)">
       {{ formatMtAmount(mtCommissionAmounts['2026-08-05']) }}
      </td>
      <td>
       <span class="pill pill-green">
        正常
       </span>
      </td>
      <td class="font-semibold text-emerald-700">
       0 笔
      </td>
      <td class="text-emerald-600 font-semibold">
       $0.00
      </td>
      <td>
       <div class="flex items-center justify-center">
        <a class="text-blue-600 hover:text-blue-800 text-[12px] font-medium px-2 py-1 rounded hover:bg-blue-50 transition-colors" href="#/crm/commission-daily-audit">
         查看详情
        </a>
       </div>
      </td>
     </tr>
    </tbody>
   </table>
  </div>
  <div class="reconciliation-list-pagination flex items-center justify-between px-5 py-4 border-t border-gray-100 text-xs text-gray-500">
   <div>
    共 31 条记录，当前显示前 7 条
   </div>
   <div class="flex items-center gap-2">
    <button class="w-8 h-8 rounded border border-gray-200 hover:bg-gray-50 text-gray-500">
     <i class="fas fa-chevron-left text-[10px]">
     </i>
    </button>
    <button class="w-8 h-8 rounded bg-blue-600 text-white font-semibold">
     1
    </button>
    <button class="w-8 h-8 rounded border border-gray-200 hover:bg-gray-50 text-gray-600">
     2
    </button>
    <button class="w-8 h-8 rounded border border-gray-200 hover:bg-gray-50 text-gray-600">
     3
    </button>
    <button class="w-8 h-8 rounded border border-gray-200 hover:bg-gray-50 text-gray-600">
     5
    </button>
    <button class="w-8 h-8 rounded border border-gray-200 hover:bg-gray-50 text-gray-500">
     <i class="fas fa-chevron-right text-[10px]">
     </i>
    </button>
    <select class="custom-select w-[100px] ml-3">
     <option>
      20 条/页
     </option>
     <option>
      50 条/页
     </option>
     <option>
      100 条/页
     </option>
    </select>
   </div>
  </div>
 </div>
</div>

    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { ElMessage } from 'element-plus'

// 固定前端演示金额，不代表真实 MT5 入账；按批次日期取值，不随渲染或刷新随机变化。
// 未配置的批次继续显示“—”，不以 CRM 金额推定 MT 入账结果。
const mtCommissionAmounts = ref({
  '2026-08-11': 42920.90,
  '2026-08-10': 51390.40,
  '2026-08-09': 58394.10,
  '2026-08-08': 34620.00,
  '2026-08-07': 40080.25,
  '2026-08-06': 46133.50,
  '2026-08-05': 41285.80
})
const amountFormatter = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2, maximumFractionDigits: 2 })
const hasMtAmount = value => typeof value === 'number' && Number.isFinite(value)
const formatMtAmount = value => hasMtAmount(value) ? amountFormatter.format(value) : '—'
const mtAmountClass = (value, crmAmount) => !hasMtAmount(value) ? 'text-gray-400' : value === crmAmount ? 'text-emerald-600' : 'text-red-600'


const filters = ref({
  start: '2026-07-13',
  end: '2026-08-11',
  status: 'all'
})

const handleSearch = () => {
  ElMessage.success('已按当前条件查询')
}

const handleReset = () => {
  filters.value = { start: '2026-07-13', end: '2026-08-11', status: 'all' }
  ElMessage.success('筛选条件已重置')
}
</script>

<style scoped>
.reconciliation-list-table-card {
  overflow: visible;
}

.reconciliation-list-table-scroll {
  overflow-x: auto;
  overflow-y: visible;
}

.commission-list-table {
  border-collapse: separate;
  border-spacing: 0;
  color: #374151;
  font-size: 13px;
}

.commission-list-table thead th {
  height: 56px;
  padding: 0 16px;
  background: #fbfcfd;
  border-bottom: 1px solid #edf0f2;
  color: #6b7280;
  font-size: 12px;
  font-weight: 600;
  line-height: 18px;
  text-align: left;
  vertical-align: middle;
  white-space: nowrap;
}

.commission-list-table tbody td {
  height: 58px;
  padding: 12px 16px;
  text-align: left;
  border-bottom: 1px solid #f1f3f5;
  line-height: 20px;
  vertical-align: middle;
  white-space: nowrap;
}

.commission-list-table tbody tr:last-child td {
  border-bottom: 0;
}

.commission-list-table tbody td:last-child > .flex {
  min-width: 100px;
  justify-content: flex-start;
}

.commission-list-table tbody td:last-child a {
  padding-inline: 0;
}

.reconciliation-list-pagination {
  min-height: 64px;
  background: #fff;
}
</style>
