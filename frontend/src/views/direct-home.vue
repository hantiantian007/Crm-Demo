<template>
  <div class="w-full min-w-0">
    <div class="flex flex-col gap-4 min-w-0">
      <div class="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-3">
        <div
          v-for="k in kpis"
          :key="k.key"
          :class="[
            'bg-white border rounded-lg shadow-sm p-4',
            kpiHighlightKeys.has(k.key) ? 'border-[#d1a84f]/40 bg-[#d1a84f]/5' : 'border-gray-100'
          ]"
        >
          <div class="text-[11px] text-gray-500">{{ k.label }}</div>
          <div :class="['mt-1 font-bold font-mono', kpiHighlightKeys.has(k.key) ? 'text-xl text-gray-900' : 'text-lg text-gray-900']">{{ k.value }}</div>
          <div v-if="k.sub" class="mt-0.5 text-[11px] text-gray-400">{{ k.sub }}</div>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_360px] gap-4 min-w-0">
        <div class="min-w-0">
          <div v-if="isActivityOngoing" class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div class="p-5">
              <div class="flex items-start justify-between gap-6">
                <div class="flex items-start gap-4 min-w-0">
                  <div class="w-12 h-12 rounded-xl bg-[#C19B5E] text-white flex items-center justify-center flex-shrink-0">
                    <i class="fa-regular fa-credit-card text-xl"></i>
                  </div>
                  <div class="min-w-0">
                    <div class="flex items-center gap-3 min-w-0">
                      <div class="text-base font-bold text-gray-900">{{ activity.name }}</div>
                      <button
                        v-if="!activityJoined"
                        class="h-8 px-4 rounded-md text-white text-xs font-bold transition-colors bg-rose-500 hover:bg-rose-600 flex-shrink-0"
                        type="button"
                        @click="handleJoinActivity"
                      >
                        立即参与
                      </button>
                    </div>
                    <div class="text-sm text-orange-500 font-medium mt-1">新用户开户即送100USD赠金</div>
                    <div class="text-xs text-orange-500 font-medium mt-1">单客户达标条件：净入金 ${{ formatMoney(TARGET_NET_DEPOSIT) }} + 交易 {{ formatLots(TARGET_LOTS) }} Lot</div>
                    <div class="mt-2 text-[11px] text-gray-500 font-mono flex items-center gap-2 flex-wrap">
                      <span>{{ activity.timeRange }}</span>
                      <span class="text-gray-300">|</span>
                      <span class="text-gray-500">剩余 {{ formatInt(activityRemainingDays) }} 天</span>
                    </div>
                  </div>
                </div>

                <div class="flex flex-col items-end gap-2 flex-shrink-0">
                  <div class="flex items-center gap-2 text-xs font-medium">
                    <span class="w-1.5 h-1.5 rounded-full" :class="activityJoined ? 'bg-emerald-500' : 'bg-gray-300'"></span>
                    <span :class="activityJoined ? 'text-emerald-600' : 'text-gray-500'">{{ activityJoined ? '已参与' : '未参加活动' }}</span>
                  </div>
                </div>
              </div>

              <div v-if="activityJoined" class="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] text-gray-500">
                <div class="flex items-center gap-2">
                  <span class="text-gray-400">参与 MT 账号</span>
                  <span class="font-medium text-gray-700 font-mono">{{ joinedMtAccount }}</span>
                </div>
                <div class="flex items-center gap-2">
                  <span class="text-gray-400">参与时间</span>
                  <span class="font-medium text-gray-700 font-mono">{{ joinedAt }}</span>
                </div>
              </div>

              <div class="mt-5 space-y-4">
                <div class="flex items-center justify-between gap-4">
                  <div class="text-xs text-emerald-600 font-medium flex items-center gap-2">
                    <i class="fa-solid fa-dollar-sign"></i>
                    活动净入金
                  </div>
                  <div class="text-xs font-bold text-gray-800">${{ formatMoney(activity.netDeposit) }}</div>
                </div>
                <div class="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div class="h-full bg-emerald-400 rounded-full" :style="{ width: `${netDepositProgress}%` }"></div>
                </div>

                <div class="flex items-center justify-between gap-4">
                  <div class="text-xs text-blue-600 font-medium flex items-center gap-2">
                    <i class="fa-solid fa-chart-line"></i>
                    活动交易手数
                  </div>
                  <div class="text-xs font-bold text-gray-800">{{ formatLots(activity.tradingLots) }} Lot</div>
                </div>
                <div class="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div class="h-full bg-blue-500 rounded-full" :style="{ width: `${tradeLotsProgress}%` }"></div>
                </div>

                <div class="bg-orange-50 border border-orange-200 text-orange-600 px-4 py-3 rounded-lg text-xs font-medium flex items-start gap-2">
                  <i class="fa-solid fa-circle-info mt-0.5"></i>
                  <span>达标口径：按客户维度判断；统计从客户参与成功时间起算。</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="w-full lg:w-[360px] flex-shrink-0 flex flex-col gap-4">
          <div class="bg-white rounded-xl shadow-sm border border-gray-100 px-5 py-4">
            <div class="flex justify-between items-center mb-2">
              <p class="text-sm text-gray-500 font-medium">通知公告</p>
              <a href="#" class="text-xs text-gray-400 hover:text-gray-600">查看更多 ></a>
            </div>
            <div v-for="n in displayNotices" :key="n.id" class="flex justify-between items-center group cursor-pointer mt-1 py-2">
              <div class="flex items-center gap-2 min-w-0">
                <span class="w-1.5 h-1.5 rounded-full flex-shrink-0" :class="n.isLatest ? 'bg-[#d1a84f]' : 'bg-gray-300'"></span>
                <p class="text-sm text-gray-700 group-hover:text-[#d1a84f] transition-colors truncate">{{ n.title }}</p>
                <span v-if="n.isPinned" class="ml-1 text-[10px] px-1.5 py-0.5 rounded bg-[#d1a84f]/10 border border-[#d1a84f]/25 text-[#b8903f] font-medium flex-shrink-0">置顶</span>
              </div>
              <span class="text-xs text-gray-400 flex-shrink-0">{{ n.date }}</span>
            </div>
          </div>

          <div class="bg-white border border-gray-100 rounded-lg shadow-sm">
            <div class="px-5 py-4 border-b border-gray-100 flex items-center justify-between gap-3">
              <div class="text-sm font-bold text-gray-800">推广中心</div>
            </div>
            <div class="p-5 text-xs space-y-3">
              <div class="space-y-3">
                <div class="flex items-center justify-between gap-3">
                  <div class="text-gray-500">直客邀请码</div>
                  <div class="flex items-center gap-2">
                    <div class="font-mono font-medium text-gray-800">{{ directInviteCode }}</div>
                    <button class="px-2.5 py-1.5 rounded bg-blue-50 hover:bg-blue-100 text-blue-600 border border-blue-100 transition-colors" type="button" @click="copyText(directInviteCode, '邀请码')">
                      复制
                    </button>
                  </div>
                </div>

                <div class="space-y-2">
                  <div class="text-gray-500">直客邀请链接</div>
                  <div class="flex items-center gap-2">
                    <input class="flex-1 border border-gray-200 rounded px-3 py-2 text-[11px] font-mono outline-none" :value="directInviteLink" readonly />
                    <button class="px-3 py-2 rounded bg-blue-50 hover:bg-blue-100 text-blue-600 border border-blue-100 transition-colors" type="button" @click="copyText(directInviteLink, '邀请链接')">
                      复制
                    </button>
                  </div>
                </div>

                <div class="flex items-center gap-2">
                  <button class="flex-1 px-3 py-2 rounded border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors" type="button" @click="qrVisible = true">查看二维码</button>
                </div>
              </div>

              <div class="bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-[11px] text-gray-600 leading-relaxed">
                被邀请人注册后客户类型固定为直客；邀请关系不等于代理关系，不会自动产生代理身份、代理权限或返佣关系。
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="bg-white border border-gray-100 rounded-lg shadow-sm p-4">
        <div class="flex items-start justify-between gap-4 flex-wrap">
          <div class="flex items-center gap-2 text-[11px] text-gray-500">
            <span class="w-1.5 h-1.5 rounded-full bg-gray-400"></span>
            <span class="font-medium text-gray-700">MT账户概览</span>
          </div>

          <div class="flex items-center gap-3 flex-wrap justify-end">
            <div class="flex items-center gap-2">
              <span class="text-[11px] text-gray-500">MT账户</span>
              <select
                v-model="mtOverviewAccountId"
                class="h-8 rounded-md border border-gray-200 bg-white px-2 text-xs text-gray-700 outline-none focus:border-[#d1a84f] focus:ring-2 focus:ring-[#d1a84f]/10"
                :disabled="mtOverviewAccounts.length <= 1"
              >
                <option v-for="a in mtOverviewAccounts" :key="a.id" :value="a.id">{{ a.id }}</option>
              </select>
            </div>

            <div class="flex items-center gap-2 text-[11px] text-gray-500">
              <span class="text-gray-400">MT类型</span>
              <span class="font-medium text-gray-700">{{ mtOverviewSelectedAccount.mtType }}</span>
            </div>

            <div class="flex items-center gap-2 text-[11px] text-gray-500">
              <span class="text-gray-400">最后更新时间</span>
              <span class="font-mono text-gray-700">{{ mtOverviewUpdatedAt }}</span>
            </div>
          </div>
        </div>

        <div class="mt-3">
          <div class="text-[11px] font-medium text-gray-700">当前账户状态</div>

          <div class="mt-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3 text-xs">
            <div class="rounded-lg border border-gray-100 bg-gray-50/60 px-3 py-2.5">
              <div class="flex items-center justify-between gap-2">
                <div class="text-[11px] text-gray-500">MT余额</div>
                <span class="text-[10px] px-1.5 py-0.5 rounded bg-white border border-gray-200 text-gray-500">当前</span>
              </div>
              <div class="mt-0.5 font-mono font-bold text-base text-gray-900">$ {{ formatMoney(mtOverviewSelectedAccount.realtime.balance) }}</div>
            </div>

            <div class="rounded-lg border border-gray-100 bg-gray-50/60 px-3 py-2.5">
              <div class="flex items-center justify-between gap-2">
                <div class="text-[11px] text-gray-500">净值</div>
                <span class="text-[10px] px-1.5 py-0.5 rounded bg-white border border-gray-200 text-gray-500">当前</span>
              </div>
              <div class="mt-0.5 font-mono font-bold text-base text-gray-900">$ {{ formatMoney(mtOverviewSelectedAccount.realtime.equity) }}</div>
            </div>

            <div class="rounded-lg border border-gray-100 bg-gray-50/60 px-3 py-2.5">
              <div class="flex items-center justify-between gap-2">
                <div class="text-[11px] text-gray-500">可用预付款</div>
                <span class="text-[10px] px-1.5 py-0.5 rounded bg-white border border-gray-200 text-gray-500">当前</span>
              </div>
              <div class="mt-0.5 font-mono font-bold text-base text-gray-900">$ {{ formatMoney(mtOverviewSelectedAccount.realtime.availableCredit) }}</div>
            </div>

            <div class="rounded-lg border border-gray-100 bg-gray-50/60 px-3 py-2.5">
              <div class="flex items-center justify-between gap-2">
                <div class="text-[11px] text-gray-500">当前持仓量</div>
                <span class="text-[10px] px-1.5 py-0.5 rounded bg-white border border-gray-200 text-gray-500">当前</span>
              </div>
              <div class="mt-0.5 font-mono font-bold text-base text-gray-900">{{ formatLots(mtOverviewSelectedAccount.realtime.positionLots) }} Lot</div>
            </div>

            <div class="rounded-lg border border-gray-100 bg-gray-50/60 px-3 py-2.5">
              <div class="flex items-center justify-between gap-2">
                <div class="text-[11px] text-gray-500">当前浮动盈亏</div>
                <span class="text-[10px] px-1.5 py-0.5 rounded bg-white border border-gray-200 text-gray-500">当前</span>
              </div>
              <div class="mt-0.5 font-mono font-bold text-base" :class="pnlClass(mtOverviewSelectedAccount.realtime.floatingPnl)">$ {{ formatMoney(mtOverviewSelectedAccount.realtime.floatingPnl) }}</div>
            </div>

            <div class="rounded-lg border border-gray-100 bg-gray-50/60 px-3 py-2.5">
              <div class="flex items-center justify-between gap-2">
                <div class="text-[11px] text-gray-500">预付款比例</div>
                <span class="text-[10px] px-1.5 py-0.5 rounded bg-white border border-gray-200 text-gray-500">当前</span>
              </div>
              <div class="mt-0.5 font-mono font-bold text-base" :class="mtOverviewPrepayRatioClass">
                {{ mtOverviewPrepayRatioText }}
              </div>
              <div v-if="mtOverviewPrepayHint" class="mt-1 text-[11px] font-medium" :class="mtOverviewPrepayRatioClass">{{ mtOverviewPrepayHint }}</div>
            </div>
          </div>
        </div>

        <div class="mt-4 pt-4 border-t border-gray-100">
          <div class="flex items-center justify-between gap-3 flex-wrap">
            <div class="text-[11px] font-medium text-gray-700">{{ mtOverviewPeriodTitle }}</div>
            <div class="flex bg-gray-100/60 p-1 rounded-lg border border-gray-200/60">
              <button
                v-for="t in mtTimeTabs"
                :key="t.key"
                type="button"
                class="px-3 py-1 rounded-md text-xs font-medium transition-all"
                :class="mtTimeKey === t.key ? 'bg-white text-gray-800 shadow-sm border border-gray-200/60' : 'text-gray-500 hover:text-gray-700'"
                @click="mtTimeKey = t.key"
              >
                {{ t.label }}
              </button>
            </div>
          </div>

          <div v-if="mtTimeKey === 'custom'" class="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div class="flex items-center gap-2">
              <div class="text-gray-500 w-[52px] shrink-0 text-right">开始：</div>
              <input v-model="mtCustomStart" class="border border-gray-300 rounded px-3 py-2 outline-none flex-1 bg-white text-center" placeholder="YYYY-MM-DD" type="text" />
            </div>
            <div class="flex items-center gap-2">
              <div class="text-gray-500 w-[52px] shrink-0 text-right">结束：</div>
              <input v-model="mtCustomEnd" class="border border-gray-300 rounded px-3 py-2 outline-none flex-1 bg-white text-center" placeholder="YYYY-MM-DD" type="text" />
            </div>
          </div>

          <div class="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div class="rounded-lg border border-gray-100 bg-gray-50/60 px-3 py-2.5">
              <div class="text-[11px] text-gray-500">入金 / 出金 / 净入金</div>
              <div class="mt-2 space-y-1">
                <div class="flex items-center justify-between gap-3">
                  <span class="text-gray-500">{{ mtPeriodLabel }}入金 $</span>
                  <span class="font-mono font-semibold text-gray-800">$ {{ formatMoney(mtOverviewPeriod.deposit) }}</span>
                </div>
                <div class="flex items-center justify-between gap-3">
                  <span class="text-gray-500">{{ mtPeriodLabel }}出金 $</span>
                  <span class="font-mono font-semibold text-gray-800">$ {{ formatMoney(mtOverviewPeriod.withdraw) }}</span>
                </div>
                <div class="flex items-center justify-between gap-3">
                  <span class="text-gray-500">{{ mtPeriodLabel }}净入金 $</span>
                  <span class="font-mono font-semibold text-gray-800">$ {{ formatMoney(mtOverviewPeriodNetDeposit) }}</span>
                </div>
              </div>
            </div>

            <div class="rounded-lg border border-gray-100 bg-gray-50/60 px-3 py-2.5">
              <div class="text-[11px] text-gray-500">交易量 / 已平仓盈亏</div>
              <div class="mt-2 space-y-1">
                <div class="flex items-center justify-between gap-3">
                  <span class="text-gray-500">{{ mtPeriodLabel }}交易量 Lot</span>
                  <span class="font-mono font-semibold text-gray-800">{{ formatLots(mtOverviewPeriod.tradingLots) }} Lot</span>
                </div>
                <div class="flex items-center justify-between gap-3">
                  <span class="text-gray-500">{{ mtPeriodLabel }}已平仓盈亏 $</span>
                  <span class="font-mono font-semibold" :class="pnlClass(mtOverviewPeriod.closedPnl)">$ {{ formatMoney(mtOverviewPeriod.closedPnl) }}</span>
                </div>
              </div>
            </div>
          </div>

          <div class="mt-3 text-[11px] text-gray-400">
            余额、净值、持仓及浮动盈亏为当前数据；入金、出金、交易量及已平仓盈亏按所选时间统计。
          </div>
          <div class="mt-1 text-[11px] text-gray-400">
            口径：净入金＝真实入金－真实出金；浮动盈亏统计当前未平仓订单；已平仓盈亏统计所选时间内的平仓订单。
          </div>
        </div>
      </div>

      <div class="bg-white border border-gray-100 rounded-lg shadow-sm">
        <div class="px-5 py-4 border-b border-gray-100 flex items-center justify-between gap-3">
          <div class="text-sm font-bold text-gray-800">经营趋势</div>
          <div class="flex items-center gap-2 text-xs">
            <button
              v-for="t in trendTabs"
              :key="t.key"
              type="button"
              :class="[
                'px-3 py-1.5 rounded border transition-colors',
                trendKey === t.key ? 'bg-[#d1a84f]/10 border-[#d1a84f]/30 text-[#b8903f] font-medium' : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'
              ]"
              @click="trendKey = t.key"
            >
              {{ t.label }}
            </button>
          </div>
        </div>
        <div class="p-5">
          <div class="h-[180px] w-full">
            <svg class="w-full h-full" viewBox="0 0 600 180" preserveAspectRatio="none">
              <polyline :points="trendPoints" fill="none" stroke="#d1a84f" stroke-width="2" />
              <polyline :points="trendArea" fill="rgba(209,168,79,0.12)" stroke="none" />
            </svg>
          </div>
          <div class="mt-2 flex items-center justify-between text-[11px] text-gray-400 font-mono">
            <span>近30天</span>
            <span>{{ trendRangeText }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>

  <el-dialog v-model="qrVisible" title="直客邀请二维码" width="420px">
    <div class="flex flex-col items-center justify-center py-4 gap-3">
      <div class="w-[240px] h-[240px] bg-gray-50 border border-gray-200 rounded flex items-center justify-center text-xs text-gray-400">QR Code</div>
      <div class="text-[11px] text-gray-500 font-mono break-all text-center">{{ directInviteLink }}</div>
    </div>
    <template #footer>
      <div class="flex items-center justify-end gap-2">
        <button class="px-4 py-2 rounded border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors" type="button" @click="qrVisible = false">关闭</button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup>
import { computed, ref } from 'vue'

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

const pnlClass = (v) => {
  const n = Number(v || 0)
  if (n > 0) return 'text-emerald-600'
  if (n < 0) return 'text-red-600'
  return 'text-gray-700'
}

const mtTimeTabs = [
  { key: 'today', label: '今日' },
  { key: 'week', label: '本周' },
  { key: 'month', label: '本月' },
  { key: 'lastMonth', label: '上月' },
  { key: 'custom', label: '自定义' }
]

const mtTimeKey = ref('month')
const mtCustomStart = ref('2026-09-01')
const mtCustomEnd = ref('2026-09-13')

const mtPeriodLabel = computed(() => {
  if (mtTimeKey.value === 'custom') return '区间'
  return mtTimeTabs.find((t) => t.key === mtTimeKey.value)?.label || mtTimeKey.value
})

const mtOverviewAccounts = [
  {
    id: '8100458',
    mtType: '标准账户',
    realtime: { balance: 125820.45, equity: 130260.35, availableCredit: 25600.0, positionLots: 18.6, floatingPnl: 520.35, prepayRatio: 0.62 },
    month: { deposit: 85200.0, withdraw: 32600.0, tradingLots: 185.25, closedPnl: 3200.25 }
  },
  {
    id: '8200781',
    mtType: '美分账户',
    realtime: { balance: 68520.2, equity: 64210.55, availableCredit: 8200.0, positionLots: 9.35, floatingPnl: -860.12, prepayRatio: 0.28 },
    month: { deposit: 46200.0, withdraw: 18500.0, tradingLots: 102.5, closedPnl: -980.8 }
  }
]

const mtOverviewAccountId = ref(mtOverviewAccounts[0]?.id || '')
const mtOverviewSelectedAccount = computed(() => mtOverviewAccounts.find((a) => a.id === mtOverviewAccountId.value) || mtOverviewAccounts[0])
const mtOverviewUpdatedAt = ref('2026-09-13 14:30:25')

const mtOverviewPrepayRatioText = computed(() => {
  const v = Number(mtOverviewSelectedAccount.value?.realtime?.prepayRatio || 0)
  return `${(v * 100).toFixed(0)}%`
})

const mtOverviewPrepayRatioClass = computed(() => {
  const v = Number(mtOverviewSelectedAccount.value?.realtime?.prepayRatio || 0)
  if (v <= 0.3) return 'text-red-600'
  if (v <= 0.6) return 'text-orange-600'
  return 'text-gray-900'
})

const mtOverviewPrepayHint = computed(() => {
  const v = Number(mtOverviewSelectedAccount.value?.realtime?.prepayRatio || 0)
  if (v <= 0.3) return '风险：预付款比例偏低'
  if (v <= 0.6) return '提示：预付款比例偏低'
  return ''
})

const mtOverviewPeriodTitle = computed(() => {
  const map = { today: '今日', week: '本周', month: '本月', lastMonth: '上月', custom: '自定义' }
  const prefix = map[mtTimeKey.value] || mtPeriodLabel.value
  return `${prefix}期间数据`
})

const parseYmd = (s) => {
  const m = String(s || '').match(/^(\d{4})-(\d{2})-(\d{2})$/)
  if (!m) return null
  const d = new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3]))
  if (Number.isNaN(d.getTime())) return null
  return d
}

const diffDaysInclusive = (start, end) => {
  const s = parseYmd(start)
  const e = parseYmd(end)
  if (!s || !e) return 30
  const diff = Math.floor((e.getTime() - s.getTime()) / 86400000) + 1
  return Math.max(1, diff)
}

const mtFactor = computed(() => {
  if (mtTimeKey.value === 'today') return 1 / 30
  if (mtTimeKey.value === 'week') return 7 / 30
  if (mtTimeKey.value === 'month') return 1
  if (mtTimeKey.value === 'lastMonth') return 0.92
  const days = diffDaysInclusive(mtCustomStart.value, mtCustomEnd.value)
  return Math.min(2, Math.max(0.05, days / 30))
})

const mtOverviewPeriod = computed(() => {
  const base = mtOverviewSelectedAccount.value?.month || { deposit: 0, withdraw: 0, tradingLots: 0, closedPnl: 0 }
  const f = mtFactor.value
  return {
    deposit: base.deposit * f,
    withdraw: base.withdraw * f,
    tradingLots: base.tradingLots * f,
    closedPnl: base.closedPnl * f
  }
})

const mtOverviewPeriodNetDeposit = computed(() => mtOverviewPeriod.value.deposit - mtOverviewPeriod.value.withdraw)

const kpis = computed(() => [
  { key: 'balance', label: 'MT余额', value: '$ ' + formatMoney(mtOverviewSelectedAccount.value?.realtime?.balance || 0) },
  { key: 'netDeposit', label: '净入金', value: '$ ' + formatMoney(mtOverviewPeriodNetDeposit.value) },
  { key: 'tradingLots', label: '交易量', value: formatLots(mtOverviewPeriod.value.tradingLots) + ' Lot' },
  { key: 'positionLots', label: '持仓量', value: formatLots(mtOverviewSelectedAccount.value?.realtime?.positionLots || 0) + ' Lot' },
  { key: 'floatingPnl', label: '浮动盈亏', value: '$ ' + formatMoney(mtOverviewSelectedAccount.value?.realtime?.floatingPnl || 0) }
])

const kpiHighlightKeys = new Set(['netDeposit'])

const trendTabs = [
  { key: 'netDeposit', label: '净入金' },
  { key: 'tradingLots', label: '交易量' }
]

const trendKey = ref('netDeposit')

const trendData = computed(() => {
  const base = trendKey.value === 'tradingLots' ? 12 : 180
  const amp = trendKey.value === 'tradingLots' ? 10 : 120
  const data = []
  for (let i = 0; i < 30; i += 1) {
    const v = base + Math.sin(i / 4) * amp + Math.cos(i / 7) * (amp * 0.4) + (i % 9 === 0 ? amp * 0.6 : 0)
    data.push(Math.max(0, v))
  }
  return data
})

const trendRangeText = computed(() => {
  const arr = trendData.value
  const min = Math.min(...arr)
  const max = Math.max(...arr)
  return `${formatMoney(min)} ~ ${formatMoney(max)}`
})

const trendPoints = computed(() => {
  const arr = trendData.value
  const max = Math.max(...arr) || 1
  const min = Math.min(...arr)
  const w = 600
  const h = 180
  return arr
    .map((v, i) => {
      const x = (i / (arr.length - 1)) * w
      const y = h - ((v - min) / (max - min || 1)) * (h - 16) - 8
      return `${x.toFixed(1)},${y.toFixed(1)}`
    })
    .join(' ')
})

const trendArea = computed(() => `${trendPoints.value} 600,180 0,180`)

const TARGET_NET_DEPOSIT = 1000
const TARGET_LOTS = 10

const activity = {
  name: '星际起航免费开卡',
  startAt: '2026-09-01',
  endAt: '2026-09-28',
  timeRange: '2026-09-01 ~ 2026-09-28',
  participants: 126,
  achieved: 43,
  nearGoal: 56,
  netDeposit: 126000.5,
  tradingLots: 680.25
}

const activityJoined = ref(false)
const joinedMtAccount = ref('-')
const joinedAt = ref('-')

const isActivityOngoing = computed(() => {
  const end = new Date(activity.endAt + 'T23:59:59')
  if (Number.isNaN(end.getTime())) return true
  return new Date().getTime() <= end.getTime()
})

const activityRemainingDays = computed(() => {
  const end = new Date(activity.endAt + 'T23:59:59')
  const now = new Date()
  const diff = end.getTime() - now.getTime()
  if (!Number.isFinite(diff) || diff <= 0) return 0
  return Math.ceil(diff / (24 * 60 * 60 * 1000))
})

const percent = (value, target) => {
  const v = Number(value || 0)
  const t = Number(target || 0)
  if (!t) return 0
  const pct = (v / t) * 100
  return Math.min(100, Math.max(0, Math.round(pct)))
}

const netDepositProgress = computed(() => percent(activity.netDeposit, TARGET_NET_DEPOSIT))
const tradeLotsProgress = computed(() => percent(activity.tradingLots, TARGET_LOTS))

const nowText = () => {
  const d = new Date()
  const pad = (n) => String(n).padStart(2, '0')
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`
}

const handleJoinActivity = () => {
  activityJoined.value = true
  joinedMtAccount.value = '8300248'
  joinedAt.value = nowText()
  window.alert('已报名（演示）')
}

const notices = ref([
  { id: 'n1', title: '节假日交易时间调整通知', date: '09-11', isLatest: true, isPinned: true },
  { id: 'n2', title: '产品/交易规则更新说明', date: '09-10', isLatest: false, isPinned: false },
  { id: 'n3', title: '系统维护公告（周末 02:00-04:00）', date: '09-09', isLatest: false, isPinned: false },
  { id: 'n4', title: '重要业务通知：入金通道切换安排', date: '09-08', isLatest: false, isPinned: false }
])

const displayNotices = computed(() => {
  const parseMd = (s) => {
    const [mm, dd] = String(s || '').split('-').map((x) => Number(x))
    if (!mm || !dd) return 0
    return mm * 100 + dd
  }
  return [...notices.value].sort((a, b) => {
    const ap = a.isPinned ? 1 : 0
    const bp = b.isPinned ? 1 : 0
    if (ap !== bp) return bp - ap
    return parseMd(b.date) - parseMd(a.date)
  })
})

const directInviteCode = ref('D-CLIENT-8300248')
const directInviteLink = computed(() => `https://crm-demo.example.com/register?ref=${encodeURIComponent(directInviteCode.value)}`)
const qrVisible = ref(false)

const copyText = async (text, label) => {
  try {
    await navigator.clipboard.writeText(String(text || ''))
  } catch (e) {
    const input = document.createElement('textarea')
    input.value = String(text || '')
    document.body.appendChild(input)
    input.select()
    document.execCommand('copy')
    document.body.removeChild(input)
  }
  if (label) window.alert(`${label}已复制（演示）`)
}
</script>
