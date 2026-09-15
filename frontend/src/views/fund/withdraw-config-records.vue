<template>
  <div class="flex h-full bg-mainBg overflow-hidden">
    <div class="flex-1 flex flex-col min-w-0 bg-gray-50 overflow-hidden p-4 custom-scrollbar overflow-y-auto">
      <div class="flex-1 overflow-y-auto bg-gray-50 p-6">
        <div class="bg-white rounded-xl card-shadow border border-gray-100 overflow-hidden">
          <div class="px-6 py-4 border-b border-gray-100 flex items-center justify-between gap-3 flex-wrap">
            <div class="flex items-center gap-3">
              <button
                type="button"
                class="h-9 w-9 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 text-gray-600"
                @click="router.back()"
              >
                <i class="fa-solid fa-arrow-left text-xs"></i>
              </button>
              <div>
                <div class="text-base font-semibold text-gray-800">提现配置记录</div>
                <div class="text-xs text-gray-500 mt-0.5">演示数据 · 历史记录只读</div>
              </div>
            </div>

            <div class="inline-flex rounded-lg border border-gray-200 bg-white overflow-hidden">
              <button
                type="button"
                class="px-4 py-2 text-sm font-medium"
                :class="activeTab === 'logs' ? 'bg-primaryBtn text-white' : 'text-gray-600 hover:bg-gray-50'"
                @click="activeTab = 'logs'"
              >
                配置日志
              </button>
              <button
                type="button"
                class="px-4 py-2 text-sm font-medium border-l border-gray-200"
                :class="activeTab === 'rates' ? 'bg-primaryBtn text-white' : 'text-gray-600 hover:bg-gray-50'"
                @click="activeTab = 'rates'"
              >
                业务汇率记录
              </button>
            </div>
          </div>

          <div v-show="activeTab === 'logs'">
            <div class="px-6 py-4 border-b border-gray-100 bg-gray-50">
              <div class="grid grid-cols-1 md:grid-cols-5 gap-3">
                <select v-model="logFilters.channel" class="h-10 px-3 border border-gray-200 rounded-lg text-sm bg-white">
                  <option value="">全部通道</option>
                  <option v-for="c in logChannelOptions" :key="c" :value="c">{{ c }}</option>
                </select>

                <select v-model="logFilters.opType" class="h-10 px-3 border border-gray-200 rounded-lg text-sm bg-white">
                  <option value="">全部操作类型</option>
                  <option value="新增提现方式">新增提现方式</option>
                  <option value="修改配置">修改配置</option>
                  <option value="启用">启用</option>
                  <option value="禁用">禁用</option>
                </select>

                <input v-model="logFilters.startDate" type="date" class="h-10 px-3 border border-gray-200 rounded-lg text-sm bg-white" />
                <input v-model="logFilters.endDate" type="date" class="h-10 px-3 border border-gray-200 rounded-lg text-sm bg-white" />

                <div class="flex items-center justify-end">
                  <button type="button" class="h-10 px-4 rounded-lg bg-white border border-gray-200 text-gray-600 text-sm hover:bg-gray-50" @click="resetLogFilters">
                    重置
                  </button>
                </div>
              </div>
            </div>

            <div class="p-6">
              <div class="overflow-x-auto border border-gray-200 rounded-lg">
                <table class="w-full text-sm">
                  <thead class="bg-tableHeader text-gray-600 border-b border-gray-200">
                    <tr>
                      <th class="px-4 py-3 font-medium whitespace-nowrap">操作时间</th>
                      <th class="px-4 py-3 font-medium whitespace-nowrap">操作人</th>
                      <th class="px-4 py-3 font-medium whitespace-nowrap">提现通道</th>
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
                        <div class="text-gray-800 font-medium">{{ log.channel }}</div>
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
              <div class="mt-4 text-sm text-gray-500">
                共 <span class="font-medium text-gray-700">{{ filteredLogs.length }}</span> 条记录
              </div>
            </div>
          </div>

          <div v-show="activeTab === 'rates'">
            <div class="px-6 py-4 border-b border-gray-100 bg-gray-50">
              <div class="grid grid-cols-1 md:grid-cols-4 gap-3">
                <input v-model="rateFilters.startDate" type="date" class="h-10 px-3 border border-gray-200 rounded-lg text-sm bg-white" />
                <input v-model="rateFilters.endDate" type="date" class="h-10 px-3 border border-gray-200 rounded-lg text-sm bg-white" />
                <select v-model="rateFilters.channel" class="h-10 px-3 border border-gray-200 rounded-lg text-sm bg-white">
                  <option value="">全部通道</option>
                  <option v-for="c in rateChannelOptions" :key="c" :value="c">{{ c }}</option>
                </select>
                <select v-model="rateFilters.rateSource" class="h-10 px-3 border border-gray-200 rounded-lg text-sm bg-white">
                  <option value="">全部来源</option>
                  <option value="api">接口查询</option>
                  <option value="page">页面配置</option>
                </select>
                <div class="flex items-center justify-end md:col-span-4">
                  <button type="button" class="h-10 px-4 rounded-lg bg-white border border-gray-200 text-gray-600 text-sm hover:bg-gray-50" @click="resetRateFilters">
                    重置
                  </button>
                </div>
              </div>
            </div>

            <div class="p-6">
              <div class="overflow-x-auto border border-gray-200 rounded-lg">
                <table class="w-full text-sm">
                  <thead class="bg-tableHeader text-gray-600 border-b border-gray-200">
                    <tr>
                      <th class="px-4 py-3 font-medium whitespace-nowrap">业务时间</th>
                      <th class="px-4 py-3 font-medium whitespace-nowrap">通道</th>
                      <th class="px-4 py-3 font-medium whitespace-nowrap">简称</th>
                      <th class="px-4 py-3 font-medium whitespace-nowrap">汇率来源</th>
                      <th class="px-4 py-3 font-medium whitespace-nowrap text-right">接口返回汇率</th>
                      <th class="px-4 py-3 font-medium whitespace-nowrap text-right">实际使用汇率</th>
                      <th class="px-4 py-3 font-medium whitespace-nowrap">获取时间</th>
                    </tr>
                  </thead>
                  <tbody class="divide-y divide-gray-100">
                    <tr v-for="row in filteredRates" :key="row.id" class="hover:bg-gray-50/60">
                      <td class="px-4 py-3 text-gray-600 font-mono text-xs whitespace-nowrap">{{ row.bizTime }}</td>
                      <td class="px-4 py-3 text-gray-700 whitespace-nowrap">{{ row.channel }}</td>
                      <td class="px-4 py-3 text-gray-800 font-medium whitespace-nowrap">{{ row.shortName }}</td>
                      <td class="px-4 py-3 whitespace-nowrap">
                        <span class="inline-flex items-center px-2 py-1 text-[11px] font-medium rounded-full border" :class="row.rateSource === 'api' ? 'bg-blue-50 text-blue-600 border-blue-100' : 'bg-emerald-50 text-emerald-600 border-emerald-100'">
                          {{ row.rateSource === 'api' ? '接口查询' : '页面配置' }}
                        </span>
                      </td>
                      <td class="px-4 py-3 text-gray-700 text-right font-mono">{{ row.rateSource === 'api' ? formatRate(row.apiRate) : '-' }}</td>
                      <td class="px-4 py-3 text-gray-900 text-right font-mono font-semibold">{{ formatRate(row.usedRate) }}</td>
                      <td class="px-4 py-3 text-gray-600 font-mono text-xs whitespace-nowrap">{{ getFetchTime(row) }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div class="mt-4 text-sm text-gray-500">
                共 <span class="font-medium text-gray-700">{{ filteredRates.length }}</span> 条记录
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { withdrawConfigLogs, withdrawDailyRates } from '@/store/withdraw-config'

const router = useRouter()
const activeTab = ref('logs')

const logFilters = ref({
  channel: '',
  opType: '',
  startDate: '',
  endDate: ''
})

const logChannelOptions = computed(() => Array.from(new Set(withdrawConfigLogs.value.map((x) => x.channel))))

const opTypeClass = (type) => {
  if (type === '新增提现方式') return 'bg-blue-50 text-blue-700 border-blue-200'
  if (type === '修改配置') return 'bg-amber-50 text-amber-800 border-amber-200'
  if (type === '启用') return 'bg-emerald-50 text-emerald-700 border-emerald-200'
  if (type === '禁用') return 'bg-gray-100 text-gray-600 border-gray-200'
  return 'bg-gray-50 text-gray-700 border-gray-200'
}

const filteredLogs = computed(() => {
  const channel = logFilters.value.channel
  const opType = logFilters.value.opType
  const start = logFilters.value.startDate ? `${logFilters.value.startDate} 00:00:00` : ''
  const end = logFilters.value.endDate ? `${logFilters.value.endDate} 23:59:59` : ''

  return [...withdrawConfigLogs.value]
    .filter((log) => {
      if (channel && log.channel !== channel) return false
      if (opType && log.opType !== opType) return false
      if (start && log.time < start) return false
      if (end && log.time > end) return false
      return true
    })
    .sort((a, b) => (a.time < b.time ? 1 : -1))
})

const resetLogFilters = () => {
  logFilters.value = { channel: '', opType: '', startDate: '', endDate: '' }
}

const rateFilters = ref({
  startDate: '',
  endDate: '',
  channel: '',
  rateSource: ''
})

const rateChannelOptions = computed(() => Array.from(new Set(withdrawDailyRates.value.map((x) => x.channel))))

const formatRate = (value) => {
  if (value === null || value === undefined || value === '') return '-'
  const n = Number(value || 0)
  return n.toLocaleString('en-US', { minimumFractionDigits: 6, maximumFractionDigits: 6 })
}

const filteredRates = computed(() => {
  return [...withdrawDailyRates.value]
    .filter((row) => {
      const start = rateFilters.value.startDate ? `${rateFilters.value.startDate} 00:00:00` : ''
      const end = rateFilters.value.endDate ? `${rateFilters.value.endDate} 23:59:59` : ''
      if (start && row.bizTime < start) return false
      if (end && row.bizTime > end) return false
      if (rateFilters.value.channel && row.channel !== rateFilters.value.channel) return false
      if (rateFilters.value.rateSource && row.rateSource !== rateFilters.value.rateSource) return false
      return true
    })
    .sort((a, b) => {
      if (a.bizTime !== b.bizTime) return a.bizTime < b.bizTime ? 1 : -1
      return String(a.channel || '').localeCompare(String(b.channel || ''))
    })
})

const resetRateFilters = () => {
  rateFilters.value = { startDate: '', endDate: '', channel: '', rateSource: '' }
}

const getFetchTime = (row) => {
  if (row.rateSource === 'api') return row.fetchTime || '-'
  return row.effectiveTime || row.fetchTime || '-'
}
</script>
