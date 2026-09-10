<template>
  <div ref="homeScrollRef" class="flex-1 overflow-y-auto bg-gray-50 p-4 md:p-6 custom-scrollbar">
    <div class="w-full grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_320px] xl:grid-cols-[minmax(0,1fr)_360px] gap-6">
      <div class="min-w-0 flex flex-col gap-6">
        <div class="flex flex-col gap-6">
          <div class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div class="p-6">
              <div class="flex items-start justify-between gap-6">
                <div class="flex items-start gap-4 min-w-0">
                  <div class="w-12 h-12 rounded-xl bg-[#C19B5E] text-white flex items-center justify-center flex-shrink-0">
                    <i class="fa-regular fa-credit-card text-xl"></i>
                  </div>
                  <div class="min-w-0">
                    <div class="text-base font-bold text-gray-900 truncate">星际起航免费开卡</div>
                    <div class="text-xs text-orange-500 font-medium mt-1 truncate">新用户开户即送100USD赠金</div>
                  </div>
                </div>
                <div class="flex items-center gap-3 flex-shrink-0">
                  <div class="flex items-center gap-2 text-xs font-medium">
                    <span class="w-1.5 h-1.5 rounded-full" :class="activityJoined ? 'bg-emerald-500' : 'bg-gray-300'"></span>
                    <span :class="activityJoined ? 'text-emerald-600' : 'text-gray-500'">{{ activityJoined ? '已参与' : '未参加活动' }}</span>
                  </div>
                  <button
                    class="h-8 px-4 rounded-md text-white text-xs font-bold transition-colors"
                    :class="activityJoined ? 'bg-gray-300 cursor-not-allowed' : 'bg-rose-500 hover:bg-rose-600'"
                    :disabled="activityJoined"
                    type="button"
                    @click="handleJoinActivity"
                  >
                    {{ activityJoined ? '已参与' : '立即参与' }}
                  </button>
    <button
      type="button"
      class="h-8 px-3 rounded-md bg-amber-50 hover:bg-amber-100 text-amber-700 text-xs font-medium transition-colors border border-amber-200 flex items-center gap-1.5"
      @click="openPcardJoinPrd"
    >
      <i class="fa-solid fa-file-lines"></i> PRD
    </button>
                </div>
              </div>

              <div v-if="activityJoined" class="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] text-gray-500">
                <div class="flex items-center gap-2">
                  <span class="text-gray-400">参与 MT 账号</span>
                  <span class="font-medium text-gray-700">{{ joinedMtAccount }}</span>
                </div>
                <div class="flex items-center gap-2">
                  <span class="text-gray-400">参与时间</span>
                  <span class="font-medium text-gray-700">{{ joinedAt }}</span>
                </div>
              </div>

              <div class="mt-5 space-y-4">
                <div class="flex items-center justify-between gap-4">
                  <div class="text-xs text-emerald-600 font-medium flex items-center gap-2">
                    <i class="fa-solid fa-dollar-sign"></i>
                    净入金
                  </div>
                  <div class="text-xs font-bold text-gray-800">${{ effectiveNetDeposit }} <span class="text-gray-400 font-normal">/ $1,000</span></div>
                </div>
                <div class="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div class="h-full bg-emerald-400 rounded-full" :style="{ width: `${netDepositProgress}%` }"></div>
                </div>

                <div class="flex items-center justify-between gap-4">
                  <div class="text-xs text-blue-600 font-medium flex items-center gap-2">
                    <i class="fa-solid fa-chart-line"></i>
                    交易手数
                  </div>
                  <div class="text-xs font-bold text-gray-800">{{ effectiveTradeLots }} <span class="text-gray-400 font-normal">/ 10 Lot</span></div>
                </div>
                <div class="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div class="h-full bg-blue-500 rounded-full" :style="{ width: `${tradeLotsProgress}%` }"></div>
                </div>

                <div class="bg-orange-50 border border-orange-200 text-orange-600 px-4 py-3 rounded-lg text-xs font-medium flex items-start gap-2">
                  <i class="fa-solid fa-circle-info mt-0.5"></i>
                  <span>
                    活动进度从申请成功时间开始统计，申请前产生的净入金及交易手数不计入本次活动。
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
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

          <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex justify-between items-start sm:col-span-2 xl:col-span-1">
            <div>
              <p class="text-sm text-gray-500 font-medium mb-2">返佣金额 / 交易奖励 $</p>
              <p class="text-xl font-bold text-gray-800 mb-2">121.80 / <span class="text-gray-400">0.00</span></p>
              <p class="text-xs text-gray-400">未提现金额 <span class="font-medium text-orange-400">$ 0.00</span></p>
            </div>
            <div class="w-10 h-10 rounded-full bg-orange-50 flex items-center justify-center text-orange-500">
              <i class="fa-solid fa-coins"></i>
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
        <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex-1 min-h-[200px]">
          <div class="flex justify-between items-center mb-4">
            <p class="text-sm text-gray-500 font-medium">通知公告</p>
            <a href="#" class="text-xs text-gray-400 hover:text-gray-600">查看更多 ></a>
          </div>
          <div class="flex justify-between items-center group cursor-pointer mt-2 py-2">
            <div class="flex items-center gap-2">
              <span class="w-1.5 h-1.5 bg-[#d1a84f] rounded-full"></span>
              <p class="text-sm text-gray-700 group-hover:text-[#d1a84f] transition-colors">关于美国大选期间保证金调整通知</p>
            </div>
            <span class="text-xs text-gray-400">11-04</span>
          </div>
          <div class="flex justify-between items-center group cursor-pointer mt-2 py-2">
            <div class="flex items-center gap-2">
              <span class="w-1.5 h-1.5 bg-gray-300 rounded-full"></span>
              <p class="text-sm text-gray-700 group-hover:text-[#d1a84f] transition-colors">感恩节假期交易时间调整</p>
            </div>
            <span class="text-xs text-gray-400">10-28</span>
          </div>
        </div>
        
        <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <p class="text-sm text-gray-500 font-medium mb-3">推荐码</p>
          <div class="bg-gray-50 p-3 rounded flex justify-between items-center border border-gray-100">
            <span class="font-medium text-gray-800 tracking-wider">HAINJ8YG</span>
            <button class="text-gray-400 hover:text-gray-600 text-xs flex items-center gap-1"><i class="fa-regular fa-copy"></i> 复制</button>
          </div>
        </div>

        <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <p class="text-sm text-gray-500 font-medium mb-4">推广开户</p>
          <div class="border-b border-gray-100 flex gap-6 mb-4">
            <button class="text-sm text-[#41B8AF] border-b-2 border-[#41B8AF] pb-2 font-medium">代理分享</button>
            <button class="text-sm text-gray-400 hover:text-gray-600 pb-2">直客分享</button>
          </div>
          <div>
            <p class="text-xs text-gray-500 mb-2">代理客户推广链接</p>
            <div class="bg-gray-50 p-3 rounded flex justify-between items-center border border-gray-100 group">
              <span class="text-xs text-gray-600 truncate flex-1 mr-2">http://crmuat.pcard.hk/admin/reg.php?invent_code=H...</span>
              <button class="text-gray-400 hover:text-gray-600 text-xs flex items-center gap-1 shrink-0"><i class="fa-regular fa-copy"></i> 复制</button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <el-dialog
      v-model="joinDialogVisible"
      title="申请参与 PCard 活动"
      width="92%"
      :style="{ maxWidth: '560px' }"
      :close-on-click-modal="false"
      destroy-on-close
    >
      <div class="space-y-4 text-xs text-gray-600">
        <div class="flex items-center justify-between">
          <div class="text-[11px] text-gray-400">用户类型</div>
          <div class="flex bg-gray-100/60 p-1 rounded-lg border border-gray-200/60">
            <button
              type="button"
              class="px-3 py-1 rounded-md text-xs font-medium transition-all"
              :class="isNewUser ? 'bg-white text-gray-800 shadow-sm border border-gray-200/60' : 'text-gray-500 hover:text-gray-700'"
              @click="userType = 'new'"
            >
              新用户
            </button>
            <button
              type="button"
              class="px-3 py-1 rounded-md text-xs font-medium transition-all"
              :class="!isNewUser ? 'bg-white text-gray-800 shadow-sm border border-gray-200/60' : 'text-gray-500 hover:text-gray-700'"
              @click="userType = 'old'"
            >
              老用户
            </button>
          </div>
        </div>

        <div class="grid grid-cols-1 gap-3">
          <div class="flex items-start gap-3">
            <span class="w-16 text-gray-400 shrink-0">活动名称</span>
            <span class="font-medium text-gray-800">星际起航免费开卡</span>
          </div>
          <div class="flex items-start gap-3">
            <span class="w-16 text-gray-400 shrink-0">活动说明</span>
            <span class="font-medium text-gray-800">
              {{ isNewUser ? '新用户开户即送100USD赠金，免费办理星际信用卡' : '参与活动可免费办理星际信用卡' }}
            </span>
          </div>
          <div class="flex items-start gap-3">
            <span class="w-16 text-gray-400 shrink-0">活动条件</span>
            <div class="space-y-1">
              <div>净入金达到 <span class="font-medium text-gray-800">$1,000</span></div>
              <div>累计交易达到 <span class="font-medium text-gray-800">10 Lot</span></div>
              <div>双条件达标即可免费办理 <span class="font-medium text-gray-800">PCard</span></div>
            </div>
          </div>
        </div>

        <div class="bg-orange-50 border border-orange-200 text-orange-700 px-4 py-3 rounded-lg text-xs leading-relaxed">
          {{ isNewUser ? '将使用本次享受赠金的 MT 账号参与活动，进度从申请成功时间开始统计。' : '老用户参与活动不享受开户赠金，请选择一个 MT 账号参加活动。' }}
        </div>

        <div v-if="!isNewUser" class="space-y-3">
          <div class="text-gray-500">参与 MT 账号</div>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button
              v-for="mt in displayMtAccounts"
              :key="mt"
              type="button"
              class="p-3 rounded-lg border text-left transition-colors"
              :class="selectedJoinMtAccount === mt ? 'border-[#d1a84f] bg-amber-50' : 'border-gray-200 bg-white hover:bg-gray-50'"
              @click="selectedJoinMtAccount = mt"
            >
              <div class="flex items-center justify-between gap-3">
                <div class="font-medium text-gray-800">{{ mt }}</div>
                <span class="w-3 h-3 rounded-full border flex items-center justify-center" :class="selectedJoinMtAccount === mt ? 'border-[#d1a84f]' : 'border-gray-300'">
                  <span class="w-1.5 h-1.5 rounded-full" :class="selectedJoinMtAccount === mt ? 'bg-[#d1a84f]' : 'bg-transparent'"></span>
                </span>
              </div>
            </button>
          </div>
        </div>

        <div v-else class="space-y-2">
          <div class="text-gray-500">参与 MT 账号</div>
          <div class="inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-amber-200 bg-amber-50 text-amber-700">
            <span class="w-2 h-2 rounded-full bg-[#d1a84f]"></span>
            <span class="text-sm font-bold tracking-wide">{{ bonusMtAccount }}</span>
          </div>
        </div>
      </div>

      <template #footer>
        <div class="flex justify-end gap-3">
          <button
            type="button"
            class="h-9 px-4 rounded-md border border-gray-200 bg-white text-gray-600 text-xs font-medium hover:bg-gray-50"
            @click="joinDialogVisible = false"
          >
            取消
          </button>
          <button
            type="button"
            class="h-9 px-5 rounded-md text-white text-xs font-bold transition-colors"
            :class="joinConfirmDisabled ? 'bg-gray-300 cursor-not-allowed' : 'bg-[#d1a84f] hover:bg-[#b89241]'"
            :disabled="joinConfirmDisabled"
            @click="confirmJoinActivity"
          >
            确认参与
          </button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { computed, nextTick, onMounted, ref } from 'vue'
import { openPrd } from '@/store/prd'

const homeScrollRef = ref(null)

const activityJoined = ref(false)
const netDeposit = ref(0)
const netDepositTarget = ref(1000)
const tradeLots = ref(0)
const tradeLotsTarget = ref(10)

const joinDialogVisible = ref(false)
const userType = ref('new')
const isNewUser = computed(() => userType.value === 'new')
const mockMtAccounts = ref(['MT100001', 'MT100002', 'MT100003', 'MT100004', 'MT100005'])
const displayMtAccounts = computed(() => mockMtAccounts.value.slice(0, 5))
const bonusMtAccount = ref('MT100001')
const selectedJoinMtAccount = ref('')

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

const openPcardJoinPrd = () => openPrd('prd-home-pcard-activity-join.html', 'PCard 活动参与 - PRD')

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
  if (isNewUser.value) return false
  return !selectedJoinMtAccount.value
})

const handleJoinActivity = () => {
  if (activityJoined.value) return
  selectedJoinMtAccount.value = ''
  joinDialogVisible.value = true
}

const confirmJoinActivity = () => {
  if (joinConfirmDisabled.value) return
  const mt = isNewUser.value ? bonusMtAccount.value : selectedJoinMtAccount.value
  const now = formatDateTime(new Date())
  joinedMtAccount.value = mt
  joinedAt.value = now
  joinStartNetDeposit.value = netDeposit.value
  joinStartTradeLots.value = tradeLots.value
  activityJoined.value = true
  joinDialogVisible.value = false
}

const scrollToTop = () => {
  const el = homeScrollRef.value
  if (!el) return
  el.scrollTop = 0
  el.scrollLeft = 0
}

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
