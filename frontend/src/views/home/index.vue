<template>
  <div
    ref="homeScrollRef"
    class="flex flex-col flex-1 min-h-0 custom-scrollbar overflow-y-auto bg-gray-50 p-4 md:p-6"
  >
    <div class="w-full grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_320px] xl:grid-cols-[minmax(0,1fr)_360px] gap-6">
      <div class="min-w-0 flex flex-col gap-6">
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
              class="mt-[22px] h-7 px-3 rounded-md text-white text-xs font-bold transition-colors flex-shrink-0"
              :class="activityJoined ? 'bg-gray-300 cursor-not-allowed' : 'bg-rose-500 hover:bg-rose-600'"
              :disabled="activityJoined"
              type="button"
              @click="handleJoinActivity"
            >
              {{ activityJoined ? '已参与' : '立即参与' }}
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
      v-model="joinDialogVisible"
      title="提示"
      width="92%"
      :style="{ maxWidth: '560px' }"
      :close-on-click-modal="false"
      destroy-on-close
    >
      <div class="px-4">
        <div class="text-center text-base text-gray-700 font-medium py-10">
          您正在申请参加先锋一号 50,000 USD 体验金活动
        </div>

        <div class="space-y-5 pb-8">
          <div class="flex items-center gap-4">
            <div class="w-20 text-sm text-gray-600">
              体验账号 <span class="text-red-500">*</span>
            </div>
            <el-input v-model="demoAccount" placeholder="请输入体验账号" />
          </div>

          <div class="flex items-start gap-4">
            <div class="w-20 text-sm text-gray-600 pt-1">
              上传图片
            </div>
            <div class="flex-1">
              <input class="w-full text-sm text-gray-600" type="file" accept="image/*" @change="onScreenshotChange" />
              <div v-if="screenshotUrl" class="mt-3">
                <a :href="screenshotUrl" target="_blank" class="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 hover:underline">
                  <img :src="screenshotUrl" alt="" class="w-24 h-16 object-cover rounded border border-gray-200" />
                  <span class="text-xs">{{ screenshotName }}</span>
                </a>
              </div>
            </div>
          </div>

          <div class="flex justify-center pt-2">
            <button
              type="button"
              class="h-10 px-10 rounded-md text-white text-sm font-medium transition-colors"
              :class="joinConfirmDisabled ? 'bg-gray-300 cursor-not-allowed' : 'bg-[#d1a84f] hover:bg-[#b89241]'"
              :disabled="joinConfirmDisabled"
              @click="confirmJoinActivity"
            >
              报名
            </button>
          </div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script setup>
import { computed, nextTick, onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'

const homeScrollRef = ref(null)
const route = useRoute()

const activityJoined = ref(false)
const netDeposit = ref(0)
const netDepositTarget = ref(1000)
const tradeLots = ref(0)
const tradeLotsTarget = ref(10)

const joinDialogVisible = ref(false)
const demoAccount = ref('')
const screenshotUrl = ref('')
const screenshotName = ref('')

const joinedMtAccount = ref('-')
const joinedAt = ref('-')
const joinStartNetDeposit = ref(0)
const joinStartTradeLots = ref(0)

const effectiveNetDeposit = computed(() => {
  const base = activityJoined.value ? joinStartNetDeposit.value : 0
  return Math.max(0, netDeposit.value - base)
})

const effectiveTradeLots = computed(() => {
  const base = activityJoined.value ? joinStartTradeLots.value : 0
  return Math.max(0, tradeLots.value - base)
})

const netDepositProgress = computed(() => {
  const target = netDepositTarget.value || 1
  return Math.max(0, Math.min(100, (effectiveNetDeposit.value / target) * 100))
})

const tradeLotsProgress = computed(() => {
  const target = tradeLotsTarget.value || 1
  return Math.max(0, Math.min(100, (effectiveTradeLots.value / target) * 100))
})

const pad2 = (n) => String(n).padStart(2, '0')

const formatDateTime = (date) => {
  const y = date.getFullYear()
  const m = pad2(date.getMonth() + 1)
  const d = pad2(date.getDate())
  const hh = pad2(date.getHours())
  const mm = pad2(date.getMinutes())
  const ss = pad2(date.getSeconds())
  return `${y}-${m}-${d} ${hh}:${mm}:${ss}`
}

const joinConfirmDisabled = computed(() => {
  if (!demoAccount.value.trim()) return true
  if (!screenshotUrl.value) return true
  return false
})

const handleJoinActivity = () => {
  if (activityJoined.value) return
  demoAccount.value = ''
  screenshotUrl.value = ''
  screenshotName.value = ''
  joinDialogVisible.value = true
}

const confirmJoinActivity = () => {
  if (joinConfirmDisabled.value) return
  const mt = demoAccount.value.trim()
  const now = formatDateTime(new Date())
  joinedMtAccount.value = mt
  joinedAt.value = now
  joinStartNetDeposit.value = netDeposit.value
  joinStartTradeLots.value = tradeLots.value
  activityJoined.value = true
  joinDialogVisible.value = false
  window.alert('申请已提交，等待审核')
}

const onScreenshotChange = (e) => {
  const input = e.target
  const file = input?.files?.[0]
  if (!file) {
    screenshotUrl.value = ''
    screenshotName.value = ''
    return
  }
  screenshotName.value = file.name
  screenshotUrl.value = URL.createObjectURL(file)
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
