<template>
  <div class="flex h-full bg-mainBg overflow-hidden">
    <div class="flex-1 flex flex-col min-w-0 bg-gray-50 overflow-hidden p-4 custom-scrollbar overflow-y-auto">
      <div class="flex-1 overflow-y-auto bg-gray-50 p-6">
        <div class="flex items-center justify-between gap-3 flex-wrap mb-4">
          <div class="inline-flex rounded-lg border border-gray-200 bg-white overflow-hidden">
            <button
              type="button"
              class="px-4 py-2 text-sm font-medium"
              :class="activeTab === 'config' ? 'bg-primaryBtn text-white' : 'text-gray-600 hover:bg-gray-50'"
              @click="activeTab = 'config'"
            >
              支付配置
            </button>
            <button
              type="button"
              class="px-4 py-2 text-sm font-medium border-l border-gray-200"
              :class="activeTab === 'daily-rate' ? 'bg-primaryBtn text-white' : 'text-gray-600 hover:bg-gray-50'"
              @click="activeTab = 'daily-rate'"
            >
              每日通道汇率
            </button>
          </div>

          <div class="flex items-center gap-2">
            <button
              type="button"
              class="inline-flex items-center gap-2 px-4 py-2 bg-white hover:bg-gray-50 text-gray-700 rounded-lg text-sm font-medium transition-colors border border-gray-200"
              @click="openLogDrawer"
            >
              <i class="fa-solid fa-clock-rotate-left text-xs"></i>
              配置日志
            </button>

            <button
              v-show="activeTab === 'config'"
              type="button"
              class="inline-flex items-center gap-2 px-5 py-2 bg-primaryBtn hover:bg-primaryBtnHover text-white rounded-lg text-sm font-medium transition-colors shadow-sm"
              @click="openAddModal"
            >
              <i class="fa-solid fa-plus text-xs"></i>
              添加支付方式
            </button>
          </div>
        </div>

        <div v-show="activeTab === 'config'" class="space-y-4">
          <div class="bg-white rounded-xl card-shadow border border-gray-100 overflow-hidden">
            <div class="px-6 py-4 border-b border-gray-100 flex items-center gap-3 flex-wrap">
              <div class="flex items-center gap-3 flex-1 min-w-0">
                <select
                  v-model="filters.status"
                  class="flex-shrink-0 w-32 px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primaryBtn/20 focus:border-primaryBtn transition-all bg-white"
                >
                  <option value="">全部状态</option>
                  <option value="enabled">启用</option>
                  <option value="disabled">禁用</option>
                </select>

                <div v-show="hitChannel" class="flex items-center gap-2 ml-auto px-3 py-2 rounded-lg border border-amber-200 bg-amber-50/80">
                  <span class="text-[11px] text-gray-500 whitespace-nowrap">当前命中通道</span>
                  <div class="flex items-center gap-1.5">
                    <span class="text-xs text-amber-800 font-bold whitespace-nowrap">
                      {{ hitChannel?.currency }} · {{ hitChannel?.shortName }}
                    </span>
                    <span class="px-2 py-0.5 text-[10px] font-bold rounded bg-amber-100 text-amber-800 border border-amber-200 whitespace-nowrap">
                      汇率 {{ formatRate(hitChannel?.rate) }}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div class="overflow-x-auto">
              <table class="w-full text-sm text-left">
                <thead class="bg-tableHeader text-gray-600 border-b border-gray-200">
                  <tr>
                    <th class="px-4 py-4 font-medium whitespace-nowrap">编号</th>
                    <th class="px-4 py-4 font-medium whitespace-nowrap">简称</th>
                    <th class="px-4 py-4 font-medium whitespace-nowrap">支付编号</th>
                    <th class="px-4 py-4 font-medium whitespace-nowrap">支付名称</th>
                    <th class="px-4 py-4 font-medium whitespace-nowrap">商户号</th>
                    <th class="px-4 py-4 font-medium whitespace-nowrap">币种</th>
                    <th class="px-4 py-4 font-medium">提示语</th>
                    <th class="px-4 py-4 font-medium whitespace-nowrap text-right">汇率</th>
                    <th class="px-4 py-4 font-medium whitespace-nowrap text-center w-24">状态</th>
                    <th class="px-4 py-4 font-medium whitespace-nowrap text-center w-28">汇率来源</th>
                    <th class="px-4 py-4 font-medium whitespace-nowrap text-center w-28">操作</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-gray-100">
                  <tr v-for="item in filteredPayments" :key="item.id" class="hover:bg-gray-50/50 transition-colors">
                    <td class="px-4 py-3 text-gray-500">{{ item.id }}</td>
                    <td class="px-4 py-3 font-medium text-gray-800">{{ item.shortName }}</td>
                    <td class="px-4 py-3 text-red-500 font-mono text-xs">{{ item.payNo }}</td>
                    <td class="px-4 py-3 text-gray-700">{{ item.payName }}</td>
                    <td class="px-4 py-3 text-gray-600 font-mono text-xs break-all">{{ item.merchantNo }}</td>
                    <td class="px-4 py-3 text-gray-700">{{ item.currency }}</td>
                    <td class="px-4 py-3 text-gray-500 text-xs">{{ item.hint }}</td>
                    <td class="px-4 py-3 text-gray-700 text-right font-mono">{{ formatRate(item.rate) }}</td>
                    <td class="px-4 py-3 text-center">
                      <button
                        type="button"
                        class="px-3 py-1 text-xs font-medium rounded-full transition-colors"
                        :class="item.status === 'enabled' ? 'bg-emerald-50 text-emerald-600 hover:bg-emerald-100' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'"
                        @click="toggleStatus(item)"
                      >
                        {{ item.status === 'enabled' ? '启用' : '禁用' }}
                      </button>
                    </td>
                    <td class="px-4 py-3 text-center">
                      <span
                        class="inline-flex items-center px-2 py-1 text-[11px] font-medium rounded-full border"
                        :class="item.rateSource === 'api' ? 'bg-blue-50 text-blue-600 border-blue-100' : 'bg-emerald-50 text-emerald-600 border-emerald-100'"
                      >
                        {{ item.rateSource === 'api' ? '接口查询' : '页面配置' }}
                      </span>
                    </td>
                    <td class="px-4 py-3 text-center">
                      <div class="flex items-center justify-center gap-3">
                        <button type="button" class="text-blue-500 hover:text-blue-700 text-xs font-medium transition-colors" @click="openEditModal(item)">
                          编辑
                        </button>
                        <button type="button" class="text-gray-400 text-xs font-medium transition-colors cursor-not-allowed" disabled>
                          删除
                        </button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div class="px-6 py-5 border-t border-gray-100 flex items-center justify-between">
              <div class="text-sm text-gray-500">
                共 <span class="font-medium text-gray-700">{{ filteredPayments.length }}</span> 条记录
              </div>
            </div>
          </div>
        </div>

        <div v-show="activeTab === 'daily-rate'" class="space-y-4">
          <div class="bg-white rounded-xl card-shadow border border-gray-100 overflow-hidden">
            <div class="px-6 py-4 border-b border-gray-100 flex items-center gap-3 flex-wrap">
              <input
                v-model="dailyFilters.date"
                type="date"
                class="h-10 px-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primaryBtn/20 focus:border-primaryBtn transition-all bg-white"
              />
              <select
                v-model="dailyFilters.channel"
                class="h-10 px-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primaryBtn/20 focus:border-primaryBtn transition-all bg-white"
              >
                <option value="">全部通道</option>
                <option v-for="c in channelOptions" :key="c" :value="c">{{ c }}</option>
              </select>
              <select
                v-model="dailyFilters.currency"
                class="h-10 px-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primaryBtn/20 focus:border-primaryBtn transition-all bg-white"
              >
                <option value="">全部币种</option>
                <option v-for="c in currencyOptions" :key="c" :value="c">{{ c }}</option>
              </select>
              <select
                v-model="dailyFilters.rateSource"
                class="h-10 px-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primaryBtn/20 focus:border-primaryBtn transition-all bg-white"
              >
                <option value="">全部来源</option>
                <option value="api">接口查询</option>
                <option value="page">页面配置</option>
              </select>
            </div>

            <div class="overflow-x-auto">
              <table class="w-full text-sm text-left">
                <thead class="bg-tableHeader text-gray-600 border-b border-gray-200">
                  <tr>
                    <th class="px-4 py-4 font-medium whitespace-nowrap">日期</th>
                    <th class="px-4 py-4 font-medium whitespace-nowrap">支付通道</th>
                    <th class="px-4 py-4 font-medium whitespace-nowrap">支付简称</th>
                    <th class="px-4 py-4 font-medium whitespace-nowrap">支付编号</th>
                    <th class="px-4 py-4 font-medium whitespace-nowrap">币种</th>
                    <th class="px-4 py-4 font-medium whitespace-nowrap text-right">当日汇率</th>
                    <th class="px-4 py-4 font-medium whitespace-nowrap text-center">汇率来源</th>
                    <th class="px-4 py-4 font-medium whitespace-nowrap">更新时间</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-gray-100">
                  <tr v-for="row in filteredDailyRates" :key="row.id" class="hover:bg-gray-50/50 transition-colors">
                    <td class="px-4 py-3 text-gray-700">{{ row.date }}</td>
                    <td class="px-4 py-3 text-gray-700">{{ row.channel }}</td>
                    <td class="px-4 py-3 font-medium text-gray-800">{{ row.shortName }}</td>
                    <td class="px-4 py-3 text-red-500 font-mono text-xs">{{ row.payNo }}</td>
                    <td class="px-4 py-3 text-gray-700">{{ row.currency }}</td>
                    <td class="px-4 py-3 text-gray-700 text-right font-mono">{{ formatRate(row.rate) }}</td>
                    <td class="px-4 py-3 text-center">
                      <span
                        class="inline-flex items-center px-2 py-1 text-[11px] font-medium rounded-full border"
                        :class="row.rateSource === 'api' ? 'bg-blue-50 text-blue-600 border-blue-100' : 'bg-emerald-50 text-emerald-600 border-emerald-100'"
                      >
                        {{ row.rateSource === 'api' ? '接口查询' : '页面配置' }}
                      </span>
                    </td>
                    <td class="px-4 py-3 text-gray-600 font-mono text-xs">{{ row.updatedAt }}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div class="px-6 py-5 border-t border-gray-100 flex items-center justify-between">
              <div class="text-sm text-gray-500">
                共 <span class="font-medium text-gray-700">{{ filteredDailyRates.length }}</span> 条记录
              </div>
            </div>
          </div>
        </div>
      </div>

      <div v-show="isLogDrawerOpen" class="fixed inset-0 z-[90] bg-black/30" @click.self="closeLogDrawer">
        <div class="absolute right-0 top-0 h-full w-full max-w-[720px] bg-white shadow-2xl flex flex-col">
          <div class="h-14 px-6 border-b border-gray-100 flex items-center justify-between">
            <div class="text-base font-semibold text-gray-800">配置日志</div>
            <button type="button" class="text-gray-400 hover:text-gray-600" @click="closeLogDrawer">
              <i class="fa-solid fa-xmark text-lg"></i>
            </button>
          </div>

          <div class="px-6 py-4 border-b border-gray-100 bg-gray-50">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
              <select v-model="logFilters.paymentId" class="h-10 px-3 border border-gray-200 rounded-lg text-sm bg-white">
                <option value="">全部支付方式</option>
                <option v-for="p in payments" :key="p.id" :value="p.id">{{ p.shortName }} · {{ p.currency }}</option>
              </select>
              <select v-model="logFilters.opType" class="h-10 px-3 border border-gray-200 rounded-lg text-sm bg-white">
                <option value="">全部操作类型</option>
                <option value="新增支付方式">新增支付方式</option>
                <option value="修改配置">修改配置</option>
                <option value="启用">启用</option>
                <option value="禁用">禁用</option>
              </select>
              <div class="grid grid-cols-2 gap-2">
                <input v-model="logFilters.startDate" type="date" class="h-10 px-3 border border-gray-200 rounded-lg text-sm bg-white" />
                <input v-model="logFilters.endDate" type="date" class="h-10 px-3 border border-gray-200 rounded-lg text-sm bg-white" />
              </div>
            </div>
          </div>

          <div class="flex-1 overflow-y-auto p-6">
            <div class="overflow-x-auto border border-gray-200 rounded-lg">
              <table class="w-full text-sm">
                <thead class="bg-tableHeader text-gray-600 border-b border-gray-200">
                  <tr>
                    <th class="px-4 py-3 font-medium whitespace-nowrap">操作时间</th>
                    <th class="px-4 py-3 font-medium whitespace-nowrap">操作人</th>
                    <th class="px-4 py-3 font-medium whitespace-nowrap">支付方式/通道</th>
                    <th class="px-4 py-3 font-medium whitespace-nowrap">操作类型</th>
                    <th class="px-4 py-3 font-medium">变更内容</th>
                    <th class="px-4 py-3 font-medium">备注</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-gray-100">
                  <tr v-for="log in filteredLogs" :key="log.id" class="hover:bg-gray-50/60">
                    <td class="px-4 py-3 text-gray-600 font-mono text-xs whitespace-nowrap">{{ log.time }}</td>
                    <td class="px-4 py-3 text-gray-700 whitespace-nowrap">{{ log.user }}</td>
                    <td class="px-4 py-3">
                      <div class="text-gray-800 font-medium">{{ log.shortName }}</div>
                      <div class="text-gray-500 text-xs font-mono">{{ log.payNo }}</div>
                    </td>
                    <td class="px-4 py-3 whitespace-nowrap">
                      <span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border" :class="opTypeClass(log.opType)">
                        {{ log.opType }}
                      </span>
                    </td>
                    <td class="px-4 py-3">
                      <div class="space-y-1">
                        <div v-for="change in log.changes" :key="change.key" class="text-xs text-gray-700">
                          <span class="text-gray-500">{{ change.label }}：</span>
                          <span class="font-mono">{{ change.before }}</span>
                          <span class="text-gray-400 mx-1">→</span>
                          <span class="font-mono font-semibold text-gray-900">{{ change.after }}</span>
                        </div>
                      </div>
                    </td>
                    <td class="px-4 py-3 text-gray-600 text-xs">{{ log.remark || '-' }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <div v-show="isEditModalOpen" class="fixed inset-0 z-[100] bg-black/40 flex items-center justify-center px-4" @click.self="closeEditModal">
        <div class="w-full max-w-[720px] rounded-2xl bg-white border border-gray-200 shadow-2xl overflow-hidden">
          <div class="h-14 px-6 border-b border-gray-100 flex items-center justify-between">
            <div class="text-base font-semibold text-gray-800">{{ editingMode === 'add' ? '新增支付方式' : '编辑支付方式' }}</div>
            <button type="button" class="text-gray-400 hover:text-gray-600" @click="closeEditModal">
              <i class="fa-solid fa-xmark text-lg"></i>
            </button>
          </div>

          <div class="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            <label class="block">
              <div class="text-xs text-gray-500 mb-2">支付简称</div>
              <input v-model="editForm.shortName" class="w-full h-10 px-3 border border-gray-200 rounded-lg text-sm bg-white" />
            </label>
            <label class="block">
              <div class="text-xs text-gray-500 mb-2">支付编号</div>
              <input v-model="editForm.payNo" class="w-full h-10 px-3 border border-gray-200 rounded-lg text-sm bg-white" />
            </label>
            <label class="block">
              <div class="text-xs text-gray-500 mb-2">支付名称</div>
              <input v-model="editForm.payName" class="w-full h-10 px-3 border border-gray-200 rounded-lg text-sm bg-white" />
            </label>
            <label class="block">
              <div class="text-xs text-gray-500 mb-2">商户号</div>
              <input v-model="editForm.merchantNo" class="w-full h-10 px-3 border border-gray-200 rounded-lg text-sm bg-white" />
            </label>
            <label class="block">
              <div class="text-xs text-gray-500 mb-2">币种</div>
              <select v-model="editForm.currency" class="w-full h-10 px-3 border border-gray-200 rounded-lg text-sm bg-white">
                <option value="CNY">CNY</option>
                <option value="HKD">HKD</option>
                <option value="USDT">USDT</option>
              </select>
            </label>
            <label class="block">
              <div class="text-xs text-gray-500 mb-2">汇率来源</div>
              <select v-model="editForm.rateSource" class="w-full h-10 px-3 border border-gray-200 rounded-lg text-sm bg-white">
                <option value="page">页面配置</option>
                <option value="api">接口查询</option>
              </select>
            </label>
            <label class="block md:col-span-2">
              <div class="text-xs text-gray-500 mb-2">提示语</div>
              <input v-model="editForm.hint" class="w-full h-10 px-3 border border-gray-200 rounded-lg text-sm bg-white" />
            </label>
            <label class="block">
              <div class="text-xs text-gray-500 mb-2">汇率</div>
              <input v-model="editForm.rate" class="w-full h-10 px-3 border border-gray-200 rounded-lg text-sm bg-white font-mono" />
            </label>
            <label class="block">
              <div class="text-xs text-gray-500 mb-2">状态</div>
              <select v-model="editForm.status" class="w-full h-10 px-3 border border-gray-200 rounded-lg text-sm bg-white">
                <option value="enabled">启用</option>
                <option value="disabled">禁用</option>
              </select>
            </label>
            <label class="block md:col-span-2">
              <div class="text-xs text-gray-500 mb-2">备注</div>
              <input v-model="editForm.remark" class="w-full h-10 px-3 border border-gray-200 rounded-lg text-sm bg-white" />
            </label>
          </div>

          <div class="px-6 py-4 border-t border-gray-100 bg-gray-50 flex items-center justify-end gap-2">
            <button type="button" class="h-10 px-4 rounded-lg bg-white border border-gray-200 text-gray-600 text-sm hover:bg-gray-50" @click="closeEditModal">
              取消
            </button>
            <button type="button" class="h-10 px-4 rounded-lg bg-primaryBtn hover:bg-primaryBtnHover text-white text-sm" @click="submitEdit">
              {{ editingMode === 'add' ? '提交' : '保存' }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'

const activeTab = ref('config')

const filters = ref({
  status: ''
})

const payments = ref([
  {
    id: 16,
    shortName: 'alpay',
    payNo: 'alpay',
    payName: 'alpay',
    merchantNo: '209045',
    currency: 'CNY',
    hint: '',
    rate: '6.880000',
    rateSource: 'page',
    status: 'disabled'
  },
  {
    id: 2,
    shortName: 'UGate',
    payNo: 'merchant',
    payName: 'UGate',
    merchantNo: '1930804',
    currency: 'CNY',
    hint: '',
    rate: '6.820000',
    rateSource: 'api',
    status: 'enabled'
  },
  {
    id: 13,
    shortName: 'Pcard',
    payNo: 'passtocredit',
    payName: 'Pcard',
    merchantNo: '32',
    currency: 'HKD',
    hint: '支持港币入金，自动按汇率折算为USDT抵押入账',
    rate: '7.780000',
    rateSource: 'page',
    status: 'enabled'
  },
  {
    id: 10,
    shortName: 'UTRC',
    payNo: 'usdt-trc20',
    payName: 'USDT-TRC20',
    merchantNo: 'TY6CxXQxsppq3B8NnP493Y4Ph97zgkfKBU',
    currency: 'USDT',
    hint: '',
    rate: '1.500000',
    rateSource: 'page',
    status: 'disabled'
  }
])

const formatRate = (value) => {
  const n = Number(value || 0)
  return n.toLocaleString('en-US', { minimumFractionDigits: 6, maximumFractionDigits: 6 })
}

const filteredPayments = computed(() => {
  if (!filters.value.status) return payments.value
  return payments.value.filter((p) => p.status === filters.value.status)
})

const hitChannel = computed(() => {
  const cny = payments.value.filter((p) => p.currency === 'CNY' && p.status === 'enabled')
  if (!cny.length) return null
  const sorted = [...cny].sort((a, b) => Number(b.rate || 0) - Number(a.rate || 0))
  return sorted[0] || null
})

const isLogDrawerOpen = ref(false)
const logFilters = ref({
  paymentId: '',
  opType: '',
  startDate: '',
  endDate: ''
})

const logs = ref([
  {
    id: 'l1',
    paymentId: 2,
    time: '2026-09-15 09:05:12',
    user: 'Olivia',
    shortName: 'UGate',
    payNo: 'merchant',
    opType: '修改配置',
    changes: [
      { key: 'rate', label: '汇率', before: '6.740000', after: '6.820000' },
      { key: 'rateSource', label: '汇率来源', before: '页面配置', after: '接口查询' }
    ],
    remark: '演示数据'
  }
])

const opTypeClass = (type) => {
  if (type === '新增支付方式') return 'bg-blue-50 text-blue-700 border-blue-200'
  if (type === '修改配置') return 'bg-amber-50 text-amber-800 border-amber-200'
  if (type === '启用') return 'bg-emerald-50 text-emerald-700 border-emerald-200'
  if (type === '禁用') return 'bg-gray-100 text-gray-600 border-gray-200'
  return 'bg-gray-50 text-gray-700 border-gray-200'
}

const filteredLogs = computed(() => {
  const paymentId = logFilters.value.paymentId ? Number(logFilters.value.paymentId) : null
  const opType = logFilters.value.opType
  const start = logFilters.value.startDate ? `${logFilters.value.startDate} 00:00:00` : ''
  const end = logFilters.value.endDate ? `${logFilters.value.endDate} 23:59:59` : ''

  return [...logs.value]
    .filter((log) => {
      if (paymentId && log.paymentId !== paymentId) return false
      if (opType && log.opType !== opType) return false
      if (start && log.time < start) return false
      if (end && log.time > end) return false
      return true
    })
    .sort((a, b) => (a.time < b.time ? 1 : -1))
})

const openLogDrawer = () => {
  isLogDrawerOpen.value = true
}

const closeLogDrawer = () => {
  isLogDrawerOpen.value = false
}

const nowText = () => {
  const d = new Date()
  const pad2 = (n) => String(n).padStart(2, '0')
  return `${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())} ${pad2(d.getHours())}:${pad2(d.getMinutes())}:${pad2(d.getSeconds())}`
}

const pushLog = (payload) => {
  logs.value = [{ id: `l${Date.now()}`, ...payload }, ...logs.value]
}

const toggleStatus = (item) => {
  const before = item.status
  item.status = item.status === 'enabled' ? 'disabled' : 'enabled'
  const opType = item.status === 'enabled' ? '启用' : '禁用'
  pushLog({
    paymentId: item.id,
    time: nowText(),
    user: 'Olivia',
    shortName: item.shortName,
    payNo: item.payNo,
    opType,
    changes: [{ key: 'status', label: '状态', before: before === 'enabled' ? '启用' : '禁用', after: item.status === 'enabled' ? '启用' : '禁用' }],
    remark: ''
  })
}

const isEditModalOpen = ref(false)
const editingMode = ref('edit')
const editingId = ref(null)

const editForm = ref({
  shortName: '',
  payNo: '',
  payName: '',
  merchantNo: '',
  currency: 'CNY',
  hint: '',
  rate: '0.000000',
  rateSource: 'page',
  status: 'enabled',
  remark: ''
})

const openAddModal = () => {
  editingMode.value = 'add'
  editingId.value = null
  editForm.value = {
    shortName: '',
    payNo: '',
    payName: '',
    merchantNo: '',
    currency: 'CNY',
    hint: '',
    rate: '0.000000',
    rateSource: 'page',
    status: 'enabled',
    remark: ''
  }
  isEditModalOpen.value = true
}

const openEditModal = (item) => {
  editingMode.value = 'edit'
  editingId.value = item.id
  editForm.value = {
    shortName: item.shortName,
    payNo: item.payNo,
    payName: item.payName,
    merchantNo: item.merchantNo,
    currency: item.currency,
    hint: item.hint,
    rate: String(item.rate ?? ''),
    rateSource: item.rateSource,
    status: item.status,
    remark: ''
  }
  isEditModalOpen.value = true
}

const closeEditModal = () => {
  isEditModalOpen.value = false
}

const submitEdit = () => {
  if (editingMode.value === 'add') {
    const nextId = Math.max(...payments.value.map((p) => Number(p.id) || 0)) + 1
    const item = {
      id: nextId,
      shortName: editForm.value.shortName || `Pay${nextId}`,
      payNo: editForm.value.payNo || `pay-${nextId}`,
      payName: editForm.value.payName || editForm.value.shortName || `Pay${nextId}`,
      merchantNo: editForm.value.merchantNo || '-',
      currency: editForm.value.currency,
      hint: editForm.value.hint,
      rate: editForm.value.rate,
      rateSource: editForm.value.rateSource,
      status: editForm.value.status
    }
    payments.value = [item, ...payments.value]
    pushLog({
      paymentId: item.id,
      time: nowText(),
      user: 'Olivia',
      shortName: item.shortName,
      payNo: item.payNo,
      opType: '新增支付方式',
      changes: [
        { key: 'shortName', label: '支付简称', before: '-', after: item.shortName },
        { key: 'payNo', label: '支付编号', before: '-', after: item.payNo },
        { key: 'payName', label: '支付名称', before: '-', after: item.payName },
        { key: 'merchantNo', label: '商户号', before: '-', after: item.merchantNo },
        { key: 'currency', label: '币种', before: '-', after: item.currency },
        { key: 'hint', label: '提示语', before: '-', after: item.hint || '-' },
        { key: 'rate', label: '汇率', before: '-', after: String(item.rate) },
        { key: 'rateSource', label: '汇率来源', before: '-', after: item.rateSource === 'api' ? '接口查询' : '页面配置' },
        { key: 'status', label: '状态', before: '-', after: item.status === 'enabled' ? '启用' : '禁用' }
      ],
      remark: editForm.value.remark
    })
    closeEditModal()
    return
  }

  const item = payments.value.find((p) => p.id === editingId.value)
  if (!item) {
    closeEditModal()
    return
  }

  const mapping = [
    { key: 'shortName', label: '支付简称', format: (v) => String(v ?? '') },
    { key: 'payNo', label: '支付编号', format: (v) => String(v ?? '') },
    { key: 'payName', label: '支付名称', format: (v) => String(v ?? '') },
    { key: 'merchantNo', label: '商户号', format: (v) => String(v ?? '') },
    { key: 'currency', label: '币种', format: (v) => String(v ?? '') },
    { key: 'hint', label: '提示语', format: (v) => String(v ?? '') },
    { key: 'rate', label: '汇率', format: (v) => String(v ?? '') },
    { key: 'rateSource', label: '汇率来源', format: (v) => (v === 'api' ? '接口查询' : '页面配置') },
    { key: 'status', label: '状态', format: (v) => (v === 'enabled' ? '启用' : '禁用') }
  ]

  const changes = mapping
    .map(({ key, label, format }) => {
      const before = format(item[key])
      const after = format(editForm.value[key])
      if (before === after) return null
      return { key, label, before: before || '-', after: after || '-' }
    })
    .filter(Boolean)

  item.shortName = editForm.value.shortName
  item.payNo = editForm.value.payNo
  item.payName = editForm.value.payName
  item.merchantNo = editForm.value.merchantNo
  item.currency = editForm.value.currency
  item.hint = editForm.value.hint
  item.rate = editForm.value.rate
  item.rateSource = editForm.value.rateSource
  item.status = editForm.value.status

  if (changes.length) {
    pushLog({
      paymentId: item.id,
      time: nowText(),
      user: 'Olivia',
      shortName: item.shortName,
      payNo: item.payNo,
      opType: '修改配置',
      changes,
      remark: editForm.value.remark
    })
  }

  closeEditModal()
}

const dailyFilters = ref({
  date: '',
  channel: '',
  currency: '',
  rateSource: ''
})

const dailyRates = ref([
  {
    id: 'd1',
    date: '2026-09-15',
    channel: 'UGate',
    shortName: 'UGate',
    payNo: 'merchant',
    currency: 'CNY',
    rate: '6.820000',
    rateSource: 'api',
    updatedAt: '09:05:12'
  },
  {
    id: 'd2',
    date: '2026-09-15',
    channel: 'alpay',
    shortName: 'alpay',
    payNo: 'alpay',
    currency: 'CNY',
    rate: '6.880000',
    rateSource: 'page',
    updatedAt: '09:02:18'
  },
  {
    id: 'd3',
    date: '2026-09-15',
    channel: 'Pcard',
    shortName: 'Pcard',
    payNo: 'passtocredit',
    currency: 'HKD',
    rate: '7.780000',
    rateSource: 'page',
    updatedAt: '08:56:33'
  }
])

const channelOptions = computed(() => Array.from(new Set(dailyRates.value.map((x) => x.channel))))
const currencyOptions = computed(() => Array.from(new Set(dailyRates.value.map((x) => x.currency))))

const filteredDailyRates = computed(() => {
  return [...dailyRates.value]
    .filter((row) => {
      if (dailyFilters.value.date && row.date !== dailyFilters.value.date) return false
      if (dailyFilters.value.channel && row.channel !== dailyFilters.value.channel) return false
      if (dailyFilters.value.currency && row.currency !== dailyFilters.value.currency) return false
      if (dailyFilters.value.rateSource && row.rateSource !== dailyFilters.value.rateSource) return false
      return true
    })
    .sort((a, b) => {
      if (a.date !== b.date) return a.date < b.date ? 1 : -1
      return a.channel.localeCompare(b.channel)
    })
})
</script>
