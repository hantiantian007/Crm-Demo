<template>
  <div
    ref="homeScrollRef"
    class="flex flex-col flex-1 min-h-0 custom-scrollbar overflow-y-auto bg-gray-50 p-4 md:p-6"
  >
    <div class="w-full grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_320px] xl:grid-cols-[minmax(0,1fr)_360px] gap-6">
      <div class="min-w-0 flex flex-col gap-6">
        <div class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div v-if="joinedActivityCount === 0" class="p-5">
            <div class="flex items-start justify-between gap-6">
              <div class="flex items-start gap-4 min-w-0">
                <div class="w-12 h-12 rounded-xl bg-[#C19B5E] text-white flex items-center justify-center flex-shrink-0">
                  <i class="fa-regular fa-calendar-check text-xl"></i>
                </div>
                <div class="min-w-0">
                  <div class="text-base font-bold text-gray-900">暂无已参加活动</div>
                  <div class="text-xs text-gray-500 mt-1">您当前没有已参加的活动，可前往查看更多活动。</div>
                </div>
              </div>
              <button
                class="h-8 px-4 rounded-md text-white text-xs font-bold transition-colors bg-rose-500 hover:bg-rose-600 flex-shrink-0"
                type="button"
                @click="handleViewActivities"
              >
                查看活动
              </button>
            </div>
          </div>

          <div v-else class="p-5">
            <div class="-mt-1 mb-4">
              <div class="overflow-x-auto no-scrollbar">
                <div class="inline-flex min-w-max bg-gray-100/60 p-1 rounded-lg border border-gray-200/60">
                <button
                  v-for="(t, idx) in activityTabs"
                  :key="t.key"
                  type="button"
                  class="h-8 px-3 text-xs font-medium whitespace-nowrap transition-colors flex-shrink-0 max-w-[180px] truncate"
                  :class="[
                    idx === 0 ? 'rounded-l-md' : idx === activityTabs.length - 1 ? 'rounded-r-md' : 'rounded-none',
                    idx !== activityTabs.length - 1 ? 'border-r border-gray-200/60' : '',
                    activeActivityKey === t.key ? 'bg-white text-gray-800 shadow-sm' : 'bg-transparent text-gray-500 hover:text-gray-700'
                  ]"
                  @click="activeActivityKey = t.key"
                  :title="t.title"
                >
                  {{ t.tabLabel }}
                </button>
                </div>
              </div>
            </div>

            <div class="flex items-start justify-between gap-6">
              <div class="flex items-start gap-4 min-w-0">
                <div class="w-12 h-12 rounded-xl bg-[#C19B5E] text-white flex items-center justify-center flex-shrink-0">
                  <i class="fa-regular fa-credit-card text-xl"></i>
                </div>
                <div class="min-w-0">
                  <div class="flex items-center gap-3 min-w-0 flex-wrap">
                    <div class="text-base font-bold text-gray-900 truncate">{{ currentActivity.title }}</div>
                    <button
                      class="h-8 px-4 rounded-md text-white text-xs font-bold transition-colors bg-rose-500 hover:bg-rose-600 flex-shrink-0"
                      type="button"
                      @click="handlePrimaryAction(currentActivity.key)"
                    >
                      {{ primaryActionText(currentActivity) }}
                    </button>
                  </div>
                  <div class="text-sm text-orange-500 font-medium mt-1">{{ currentActivity.mainCopy }}</div>
                  <div class="text-xs text-orange-500 font-medium mt-1">{{ currentActivity.conditionText }}</div>

                  <div class="mt-2 text-[11px] text-gray-500 font-mono flex items-center gap-2 flex-wrap">
                    <span>{{ currentActivity.timeRange }}</span>
                    <span class="text-gray-300">|</span>
                    <span class="text-gray-500">剩余 {{ formatInt(currentActivity.remainingDays) }} 天</span>
                  </div>
                </div>
              </div>

              <div class="flex flex-col items-end gap-2 flex-shrink-0">
                <div class="flex items-center gap-2 text-xs font-medium">
                  <span
                    class="w-1.5 h-1.5 rounded-full"
                    :class="currentActivity.status === 'joined' ? 'bg-emerald-500' : currentActivity.status === 'ended' ? 'bg-gray-400' : 'bg-gray-300'"
                  ></span>
                  <span
                    :class="currentActivity.status === 'joined' ? 'text-emerald-600' : currentActivity.status === 'ended' ? 'text-gray-600' : 'text-gray-500'"
                  >
                    {{ statusText(currentActivity) }}
                  </span>
                </div>
              </div>
            </div>

            <div class="mt-5 space-y-4">
              <div v-for="p in currentActivity.progresses" :key="p.key" class="space-y-2">
                <div class="flex items-center justify-between gap-4">
                  <div
                    class="text-xs font-medium flex items-center gap-2"
                    :class="p.color === 'emerald' ? 'text-emerald-600' : p.color === 'blue' ? 'text-blue-600' : 'text-gray-600'"
                  >
                    <i :class="p.icon"></i>
                    {{ p.label }}
                  </div>
                  <div class="text-xs font-bold text-gray-800">
                    <span v-if="p.format === 'money'">${{ formatMoney(p.value) }}</span>
                    <span v-else-if="p.format === 'lots'">{{ formatLots(p.value) }} Lot</span>
                    <span v-else>{{ formatInt(p.value) }}</span>
                    <span class="text-gray-400 font-medium">
                      /
                      <span v-if="p.format === 'money'">${{ formatMoney(p.target) }}</span>
                      <span v-else-if="p.format === 'lots'">{{ formatLots(p.target) }} Lot</span>
                      <span v-else>{{ formatInt(p.target) }}</span>
                    </span>
                  </div>
                </div>
                <div class="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    class="h-full rounded-full"
                    :class="p.color === 'emerald' ? 'bg-emerald-400' : p.color === 'blue' ? 'bg-blue-500' : 'bg-gray-400'"
                    :style="{ width: `${percent(p.value, p.target)}%` }"
                  ></div>
                </div>
              </div>

              <div
                v-if="currentActivity.key === 'pioneer-one-50000'"
                class="grid grid-cols-1 sm:grid-cols-2 gap-3"
              >
                <div class="bg-amber-50 border border-amber-200 rounded-lg px-4 py-3 flex items-start justify-between gap-4">
                  <div class="min-w-0">
                    <div class="text-[11px] text-amber-700 font-medium">当前释放档位</div>
                    <div class="mt-1 text-lg font-bold text-amber-800 font-mono">{{ currentActivity.releaseTierPct }}%</div>
                  </div>
                  <div class="w-9 h-9 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center flex-shrink-0">
                    <i class="fa-solid fa-bolt text-sm"></i>
                  </div>
                </div>
                <div class="bg-orange-50 border border-orange-200 rounded-lg px-4 py-3 flex items-start justify-between gap-4">
                  <div class="min-w-0">
                    <div class="text-[11px] text-orange-700 font-medium">当前已释放金额</div>
                    <div class="mt-1 text-lg font-bold text-orange-700 font-mono">${{ formatMoney(currentActivity.releasedAmount) }}</div>
                  </div>
                  <div class="w-9 h-9 rounded-lg bg-orange-100 text-orange-700 flex items-center justify-center flex-shrink-0">
                    <i class="fa-solid fa-sack-dollar text-sm"></i>
                  </div>
                </div>
              </div>

              <div class="bg-orange-50 border border-orange-200 text-orange-600 px-4 py-3 rounded-lg text-xs font-medium flex items-start gap-2">
                <i class="fa-solid fa-circle-info mt-0.5"></i>
                <span>{{ currentActivity.footerTip }}</span>
              </div>
            </div>
          </div>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex justify-between items-start">
            <div>
              <p class="text-sm text-gray-500 font-medium mb-2">MT余额 $</p>
              <p class="text-2xl font-bold text-gray-800 mb-2">1,239.20</p>
              <p class="text-xs text-gray-400">MT账号数 <span class="font-medium text-gray-600">2</span></p>
            </div>
            <div class="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-500">
              <i class="fa-solid fa-thumbs-up"></i>
            </div>
          </div>

          <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex justify-between items-start">
            <div>
              <p class="text-sm text-gray-500 font-medium mb-2">入 / 出金量 $</p>
              <p class="text-xl font-bold text-gray-800 mb-2">1,013.00 / <span class="text-gray-400">-0.00</span></p>
              <p class="text-xs text-gray-400">净入金 <span class="font-medium text-gray-600">$ 1,013.00</span></p>
            </div>
            <div class="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-500">
              <i class="fa-solid fa-file-invoice-dollar"></i>
            </div>
          </div>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div class="flex flex-col gap-6">
            <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex-1 flex flex-col justify-center">
              <p class="text-sm text-gray-500 font-medium mb-2">交易量 Lot / 盈亏 $</p>
              <p class="text-xl font-bold text-gray-800">0 / 0.00</p>
            </div>
            <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex-1 flex flex-col justify-center">
              <p class="text-sm text-gray-500 font-medium mb-2">持仓量 Lot / 浮动盈亏 $</p>
              <p class="text-xl font-bold text-gray-800">0 / 0.00</p>
            </div>
          </div>

          <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-6 lg:col-span-2 flex flex-col">
            <p class="text-sm text-gray-500 font-medium mb-6">胜率分析</p>
            <div class="flex-1 flex flex-col items-center justify-center">
              <div class="relative w-40 h-40 flex items-center justify-center mb-6">
                <canvas id="winRateChart"></canvas>
                <div class="absolute -left-16 top-1/2 -translate-y-1/2 text-xs text-gray-500 flex items-center">
                  亏损笔数: 0
                </div>
                <div class="absolute -right-16 top-1/2 -translate-y-1/2 text-xs text-gray-500 flex items-center">
                  获利笔数: 0
                </div>
              </div>
              <div class="flex items-center gap-6 mt-2">
                <div class="flex items-center gap-2"><span class="w-4 h-2 bg-orange-400 rounded-sm"></span><span class="text-xs text-gray-500">获利笔数</span></div>
                <div class="flex items-center gap-2"><span class="w-4 h-2 bg-gray-300 rounded-sm"></span><span class="text-xs text-gray-500">亏损笔数</span></div>
              </div>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex-1 flex flex-col min-h-[300px]">
          <p class="text-sm text-gray-500 font-medium mb-6">交易盈亏分析 ($)</p>
          <div class="flex-1 w-full relative">
            <canvas id="pnlChart"></canvas>
          </div>
          <div class="h-8 mt-4 bg-[#e8f0fe] rounded-full border border-[#c7d2fe] relative flex items-center">
            <div class="absolute left-0 w-4 h-full bg-white border border-gray-300 rounded-full shadow-sm cursor-pointer z-10 flex items-center justify-center"><i class="fa-solid fa-bars text-[8px] text-gray-400 transform rotate-90"></i></div>
            <div class="absolute right-0 w-4 h-full bg-white border border-gray-300 rounded-full shadow-sm cursor-pointer z-10 flex items-center justify-center"><i class="fa-solid fa-bars text-[8px] text-gray-400 transform rotate-90"></i></div>
            <div class="h-full bg-blue-100 w-full opacity-50"></div>
          </div>
        </div>
      </div>

      <div class="min-w-0 flex flex-col gap-6">
        <div class="bg-white rounded-xl shadow-sm border border-gray-100 px-5 py-4">
          <div class="flex items-start justify-between gap-4">
            <div class="min-w-0">
              <p class="text-sm text-gray-500 font-medium">活动信息</p>
              <div class="mt-2 flex items-center gap-2 min-w-0">
                <span class="w-2 h-2 rounded-full bg-[#d1a84f] flex-shrink-0"></span>
                <p class="text-sm font-medium text-gray-800 truncate">先锋一号 50,000 USD 体验金活动</p>
              </div>
            </div>
            <button
              class="mt-[22px] h-7 px-3 rounded-md text-white text-xs font-bold transition-colors flex-shrink-0 bg-rose-500 hover:bg-rose-600"
              type="button"
              @click="openPioneerJoinDialog"
            >
              未参与
            </button>
          </div>
        </div>

        <div class="bg-white rounded-xl shadow-sm border border-gray-100 px-5 py-4">
          <div class="flex items-center justify-between text-sm">
            <span class="text-gray-500">先锋盈利金额：</span>
            <span class="text-gray-700 font-medium">-</span>
          </div>
          <div class="mt-3 flex items-center justify-between text-sm">
            <span class="text-gray-500">先锋活动奖励：</span>
            <span class="text-gray-700 font-medium">-</span>
          </div>
        </div>

        <div class="bg-white rounded-xl shadow-sm border border-gray-100 px-5 py-4">
          <div class="flex justify-between items-center mb-2">
            <p class="text-sm text-gray-500 font-medium">通知公告</p>
            <a href="#" class="text-xs text-gray-400 hover:text-gray-600">查看更多 ></a>
          </div>
          <div class="flex justify-between items-center group cursor-pointer mt-1 py-2">
            <div class="flex items-center gap-2 min-w-0">
              <span class="w-1.5 h-1.5 bg-[#d1a84f] rounded-full flex-shrink-0"></span>
              <p class="text-sm text-gray-700 group-hover:text-[#d1a84f] transition-colors truncate">关于美国大选期间保证金调整通知</p>
            </div>
            <span class="text-xs text-gray-400 flex-shrink-0">11-04</span>
          </div>
          <div class="flex justify-between items-center group cursor-pointer mt-1 py-2">
            <div class="flex items-center gap-2 min-w-0">
              <span class="w-1.5 h-1.5 bg-gray-300 rounded-full flex-shrink-0"></span>
              <p class="text-sm text-gray-700 group-hover:text-[#d1a84f] transition-colors truncate">感恩节假期交易时间调整</p>
            </div>
            <span class="text-xs text-gray-400 flex-shrink-0">10-28</span>
          </div>
        </div>
      </div>
    </div>

    <el-dialog
      v-model="pioneerJoinDialogVisible"
      title="参与先锋一号 50,000 USD 体验金活动"
      width="92%"
      :style="{ maxWidth: '560px' }"
      :close-on-click-modal="false"
      destroy-on-close
    >
      <div class="space-y-4">
        <div class="space-y-3 text-sm text-gray-700 leading-relaxed">
          <div class="flex items-start gap-2">
            <span class="mt-1 w-1.5 h-1.5 rounded-full bg-[#d1a84f] flex-shrink-0"></span>
            <span>请确认参与活动前已准备模拟账户账号和模拟账户截图。</span>
          </div>
        </div>

        <div class="space-y-4">
          <div class="space-y-2">
            <div class="text-sm text-gray-700 font-medium">
              模拟账号 <span class="text-rose-500">*</span>
            </div>
            <input
              v-model="pioneerDemoAccount"
              class="w-full h-10 px-3 rounded-md border border-gray-200 bg-white text-sm outline-none focus:border-[#d1a84f]"
              placeholder="请输入 Star 模拟账号"
              type="text"
            />
          </div>

          <div class="space-y-2">
            <div class="text-sm text-gray-700 font-medium">
              上传模拟账户截图 <span class="text-rose-500">*</span>
            </div>
            <div class="flex items-center gap-3 flex-wrap">
              <label class="inline-flex items-center gap-2 h-10 px-4 rounded-md border border-gray-200 text-gray-700 hover:bg-gray-50 cursor-pointer">
                <i class="fa-solid fa-upload text-xs text-gray-500"></i>
                <span class="text-sm">选择文件</span>
                <input class="hidden" type="file" accept="image/*" @change="onPioneerScreenshotChange" />
              </label>
              <div class="text-sm text-gray-500 min-w-0">
                <span v-if="pioneerScreenshotName" class="font-mono truncate inline-block max-w-[320px]">{{ pioneerScreenshotName }}</span>
                <span v-else>未选择文件</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <template #footer>
        <div class="flex items-center justify-end gap-2">
          <button
            type="button"
            class="h-9 px-4 rounded-md border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors"
            @click="pioneerJoinDialogVisible = false"
          >
            取消
          </button>
          <button
            type="button"
            class="h-9 px-4 rounded-md text-white bg-rose-500 hover:bg-rose-600 transition-colors"
            @click="confirmPioneerJoin"
          >
            确认参与
          </button>
        </div>
      </template>
    </el-dialog>

  </div>
</template>

<script setup>
import { computed, nextTick, onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'

const homeScrollRef = ref(null)
const route = useRoute()

const formatInt = (n) => {
  const v = Number(n || 0)
  return v.toLocaleString('en-US')
}

const formatMoney = (n) => {
  const v = Number(n || 0)
  return v.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

const formatLots = (n) => {
  const v = Number(n || 0)
  return v.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

const percent = (value, target) => {
  const v = Number(value || 0)
  const t = Number(target || 0)
  if (!t) return 0
  const pct = (v / t) * 100
  return Math.min(100, Math.max(0, Math.round(pct)))
}

const homeActivities = ref([
  {
    key: 'free-card',
    tabLabel: '星际起航免费开卡',
    title: '星际起航免费开卡',
    status: 'joined',
    mainCopy: '新用户开户即送100USD赠金',
    conditionText: `单客户达标条件：净入金 $${formatMoney(1000)} + 交易 ${formatLots(10)} Lot`,
    timeRange: '2026-09-01 ~ 2026-09-28',
    remainingDays: 13,
    stats: { participated: 126, achieved: 43, nearAchieved: 56 },
    progresses: [
      { key: 'net-deposit', label: '活动净入金', icon: 'fa-solid fa-dollar-sign', color: 'emerald', value: 126000.5, target: 1000, format: 'money' },
      { key: 'trade-lots', label: '活动交易手数', icon: 'fa-solid fa-chart-line', color: 'blue', value: 680.25, target: 10, format: 'lots' }
    ],
    footerTip: '达标口径：按客户维度判断；统计从客户参与成功时间起算。'
  },
  {
    key: 'pioneer-one-50000',
    tabLabel: '先锋一号 50,000 USD',
    title: '先锋一号 50,000 USD 体验金活动',
    status: 'joined',
    mainCopy: '完成净入金与交易手数目标，可按档位释放体验金盈利',
    conditionText: `最高净入金 $${formatMoney(50000)} + 交易 ${formatLots(500)} Lot`,
    timeRange: '2026-09-01 ~ 2026-10-31',
    remainingDays: 45,
    stats: { participated: 68, achieved: 19, nearAchieved: 24 },
    progresses: [
      { key: 'net-deposit', label: '活动净入金', icon: 'fa-solid fa-dollar-sign', color: 'emerald', value: 32500, target: 50000, format: 'money' },
      { key: 'trade-lots', label: '活动交易手数', icon: 'fa-solid fa-chart-line', color: 'blue', value: 318.6, target: 500, format: 'lots' }
    ],
    releaseTierPct: 60,
    releasableProfitAmount: 8000,
    releasedAmount: 4800,
    footerTip: '达标口径：从审核通过时间起累计净入金；Lot 累计不清零，达到新档位后释放差额。'
  }
])

const activityTabs = computed(() => {
  const list = Array.isArray(homeActivities.value) ? homeActivities.value : []
  const weight = (a) => (a.status === 'joined' || a.status === 'ended' ? 0 : 1)
  return [...list].sort((a, b) => weight(a) - weight(b))
})

const joinedActivityCount = computed(() => {
  const list = Array.isArray(homeActivities.value) ? homeActivities.value : []
  return list.filter((a) => a.status === 'joined' || a.status === 'ended').length
})

const findDefaultActivityKey = () => {
  const list = Array.isArray(activityTabs.value) ? activityTabs.value : []
  const firstJoined = list.find((a) => a.status === 'joined' || a.status === 'ended')
  return firstJoined?.key || list[0]?.key || ''
}

const activeActivityKey = ref(findDefaultActivityKey())

watch(
  () => activityTabs.value.map((t) => t.key).join('|'),
  () => {
    const list = Array.isArray(activityTabs.value) ? activityTabs.value : []
    const exists = list.some((t) => t.key === activeActivityKey.value)
    if (!exists) activeActivityKey.value = findDefaultActivityKey()
  }
)

const currentActivity = computed(() => {
  const list = Array.isArray(homeActivities.value) ? homeActivities.value : []
  return list.find((a) => a.key === activeActivityKey.value) || list[0]
})

const statusText = (activity) => {
  if (activity?.status === 'joined') return '已参加活动'
  if (activity?.status === 'ended') return '已结束活动'
  return '未参加活动'
}

const primaryActionText = (activity) => {
  if (activity?.status === 'ended') return '查看结果'
  if (activity?.status === 'joined') return '查看进度'
  return '立即参与'
}

const handlePrimaryAction = (key) => {
  const list = Array.isArray(homeActivities.value) ? homeActivities.value : []
  const idx = list.findIndex((a) => a.key === key)
  const activity = idx >= 0 ? list[idx] : null
  if (!activity) return

  if (activity.status === 'not_joined') {
    activity.status = 'joined'
    homeActivities.value = [...list]
    window.alert('已报名（演示）')
    return
  }

  if (activity.status === 'ended') {
    window.alert('查看结果（演示）')
    return
  }

  window.alert('查看进度（演示）')
}

const handleViewActivities = () => {
  window.alert('查看活动（演示）')
}

const pioneerActivity = computed(() => {
  const list = Array.isArray(homeActivities.value) ? homeActivities.value : []
  return list.find((a) => a.key === 'pioneer-one-50000') || null
})

const pioneerJoined = computed(() => {
  const s = pioneerActivity.value?.status
  return s === 'joined' || s === 'ended'
})

const handleJoinActivity = () => {
  if (pioneerJoined.value) return
  activeActivityKey.value = 'pioneer-one-50000'
  handlePrimaryAction('pioneer-one-50000')
}

const pioneerJoinDialogVisible = ref(false)
const pioneerDemoAccount = ref('')
const pioneerScreenshotUrl = ref('')
const pioneerScreenshotName = ref('')

const openPioneerJoinDialog = () => {
  pioneerDemoAccount.value = ''
  pioneerScreenshotUrl.value = ''
  pioneerScreenshotName.value = ''
  pioneerJoinDialogVisible.value = true
}

const onPioneerScreenshotChange = (e) => {
  const input = e.target
  const file = input?.files?.[0]
  if (!file) {
    pioneerScreenshotUrl.value = ''
    pioneerScreenshotName.value = ''
    return
  }
  pioneerScreenshotName.value = file.name
  pioneerScreenshotUrl.value = URL.createObjectURL(file)
}

const confirmPioneerJoin = () => {
  if (!pioneerDemoAccount.value.trim()) {
    window.alert('请输入模拟账号')
    return
  }
  if (!pioneerScreenshotUrl.value) {
    window.alert('请上传模拟账户截图')
    return
  }
  pioneerJoinDialogVisible.value = false
  window.alert('参与申请已提交')
}

const scrollToTop = () => {
  const el = homeScrollRef.value
  if (!el) return
  el.scrollTop = 0
  el.scrollLeft = 0
}

watch(
  () => route.query.join,
  (value) => {
    const join = Array.isArray(value) ? value[0] : value
    if (join !== 'pioneer-one-50000') return
    handleJoinActivity()
  },
  { immediate: true }
)

onMounted(async () => {
  await nextTick()
  scrollToTop()
  requestAnimationFrame(scrollToTop)
  setTimeout(scrollToTop, 50)
})
</script>

<style scoped>
.custom-scrollbar::-webkit-scrollbar { width: 6px; height: 6px; }
.custom-scrollbar::-webkit-scrollbar-thumb { background: #e5e7eb; border-radius: 4px; }
.custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
</style>
