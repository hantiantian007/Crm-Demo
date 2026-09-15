<template>
  <div class="w-full min-w-0">
    <div class="flex flex-col gap-4 min-w-0">
      <div class="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-3">
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

      <div class="bg-white border border-gray-100 rounded-lg shadow-sm p-4">
        <div class="flex items-start justify-between gap-4 flex-wrap">
          <div class="flex items-center gap-2 text-[11px] text-gray-500">
            <span class="w-1.5 h-1.5 rounded-full bg-gray-400"></span>
            <span class="font-medium text-gray-700">MT账户概览</span>
          </div>

          <div class="flex items-center gap-3 flex-wrap justify-end">
            <div class="flex items-center gap-2">
              <span class="text-[11px] text-gray-500">范围</span>
              <div class="flex bg-gray-100/60 p-1 rounded-lg border border-gray-200/60">
              <button
                v-for="t in mtScopeTabs"
                :key="t.key"
                type="button"
                class="px-3 py-1 rounded-md text-xs font-medium transition-all"
                :class="mtScopeKey === t.key ? 'bg-white text-gray-800 shadow-sm border border-gray-200/60' : 'text-gray-500 hover:text-gray-700'"
                @click="mtScopeKey = t.key"
              >
                {{ t.label }}
              </button>
              </div>
            </div>

            <div class="flex items-center gap-2">
              <span class="text-[11px] text-gray-500">时间</span>
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

        <div class="mt-3">
          <div class="text-[11px] font-medium text-gray-700">当前数据</div>

          <div class="mt-2 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div class="rounded-lg border border-gray-100 bg-gray-50/60 px-3 py-2.5">
              <div class="flex items-center justify-between gap-2">
                <div class="text-[11px] text-gray-500">MT余额</div>
                <span class="text-[10px] px-1.5 py-0.5 rounded bg-white border border-gray-200 text-gray-500">当前</span>
              </div>
              <div class="mt-0.5 font-mono font-bold text-base text-gray-900">$ {{ formatMoney(mtRealtime.balance) }}</div>
            </div>

            <div class="rounded-lg border border-gray-100 bg-gray-50/60 px-3 py-2.5">
              <div class="flex items-center justify-between gap-2">
                <div class="text-[11px] text-gray-500">持仓量</div>
                <span class="text-[10px] px-1.5 py-0.5 rounded bg-white border border-gray-200 text-gray-500">当前</span>
              </div>
              <div class="mt-0.5 font-mono font-bold text-base text-gray-900">{{ formatLots(mtRealtime.positionLots) }} Lot</div>
            </div>

            <div class="rounded-lg border border-gray-100 bg-gray-50/60 px-3 py-2.5">
              <div class="flex items-center justify-between gap-2">
                <div class="text-[11px] text-gray-500">浮动盈亏</div>
                <span class="text-[10px] px-1.5 py-0.5 rounded bg-white border border-gray-200 text-gray-500">当前</span>
              </div>
              <div class="mt-0.5 font-mono font-bold text-base" :class="pnlClass(mtRealtime.floatingPnl)">$ {{ formatMoney(mtRealtime.floatingPnl) }}</div>
            </div>
          </div>
        </div>

        <div class="mt-4 pt-4 border-t border-gray-100">
          <div class="text-[11px] font-medium text-gray-700">期间数据</div>

          <div class="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div class="rounded-lg border border-gray-100 bg-gray-50/60 px-3 py-2.5">
              <div class="text-[11px] text-gray-500">入金 / 出金</div>
              <div class="mt-2 space-y-1">
                <div class="flex items-center justify-between gap-3">
                  <span class="text-gray-500">{{ mtPeriodLabel }}入金 $</span>
                  <span class="font-mono font-semibold text-gray-800">$ {{ formatMoney(mtPeriod.deposit) }}</span>
                </div>
                <div class="flex items-center justify-between gap-3">
                  <span class="text-gray-500">{{ mtPeriodLabel }}出金 $</span>
                  <span class="font-mono font-semibold text-gray-800">$ {{ formatMoney(mtPeriod.withdraw) }}</span>
                </div>
              </div>
            </div>

            <div class="rounded-lg border border-gray-100 bg-gray-50/60 px-3 py-2.5">
              <div class="text-[11px] text-gray-500">交易量 / 平仓盈亏</div>
              <div class="mt-2 space-y-1">
                <div class="flex items-center justify-between gap-3">
                  <span class="text-gray-500">{{ mtPeriodLabel }}交易量 Lot</span>
                  <span class="font-mono font-semibold text-gray-800">{{ formatLots(mtPeriod.tradingLots) }} Lot</span>
                </div>
                <div class="flex items-center justify-between gap-3">
                  <span class="text-gray-500">{{ mtPeriodLabel }}平仓盈亏 $</span>
                  <span class="font-mono font-semibold" :class="pnlClass(mtPeriod.closedPnl)">$ {{ formatMoney(mtPeriod.closedPnl) }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="flex gap-4">
        <div class="flex-1 min-w-0 flex flex-col gap-4">
          <div v-if="isActivityOngoing" class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div class="p-5">
            <div class="flex items-start justify-between gap-6">
              <div class="flex items-start gap-4 min-w-0">
                <div class="w-12 h-12 rounded-xl bg-[#C19B5E] text-white flex items-center justify-center flex-shrink-0">
                  <i class="fa-regular fa-credit-card text-xl"></i>
                </div>
                <div class="min-w-0">
                  <div class="flex items-center gap-3 min-w-0">
                    <div class="text-base font-bold text-gray-900 truncate">{{ activity.name }}</div>
                    <button
                      v-if="!activityJoined"
                      class="h-8 px-4 rounded-md text-white text-xs font-bold transition-colors bg-rose-500 hover:bg-rose-600 flex-shrink-0"
                      type="button"
                      @click="handleJoinActivity"
                    >
                      立即参与
                    </button>
                  </div>
                  <div class="text-sm text-orange-500 font-medium mt-1 truncate">新用户开户即送100USD赠金</div>
                  <div class="text-xs text-orange-500 font-medium mt-1 truncate">单客户达标条件：净入金 ${{ formatMoney(TARGET_NET_DEPOSIT) }} + 交易 {{ formatLots(TARGET_LOTS) }} Lot</div>
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

            <div class="mt-3 text-[11px] text-gray-500 flex items-center gap-4 flex-wrap">
              <div class="flex items-center gap-2">
                <span class="text-gray-400">旗下参与</span>
                <span class="font-medium text-gray-700 font-mono">{{ formatInt(activity.participants) }}</span>
              </div>
              <div class="flex items-center gap-2">
                <span class="text-gray-400">已达标</span>
                <span class="font-medium text-gray-700 font-mono">{{ formatInt(activity.achieved) }}</span>
              </div>
              <div class="flex items-center gap-2">
                <span class="text-gray-400">接近达标</span>
                <span class="font-medium text-gray-700 font-mono">{{ formatInt(activity.nearGoal) }}</span>
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

        <div class="bg-white border border-gray-100 rounded-lg shadow-sm">
          <div class="px-5 py-4 border-b border-gray-100 flex items-center justify-between gap-3">
            <div class="text-sm font-bold text-gray-800">客户运营提醒</div>
          </div>
          <div class="p-5 grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-3 text-xs">
            <div
              v-for="it in reminders"
              :key="it.key"
              class="bg-gray-50 hover:bg-gray-100 border border-gray-100 rounded-lg p-3 transition-colors cursor-pointer group"
              role="button"
              tabindex="0"
              @click="openReminder(it)"
              @keydown.enter="openReminder(it)"
            >
              <div class="flex items-center justify-between gap-2">
                <div class="text-[11px] text-gray-500 group-hover:text-gray-600">{{ it.label }}</div>
                <span class="text-[11px] text-gray-400 group-hover:text-gray-500">></span>
              </div>
              <div class="mt-1 font-mono text-base font-bold text-gray-800">{{ formatInt(it.value) }}</div>
            </div>
          </div>
        </div>

        <div class="bg-white border border-gray-100 rounded-lg shadow-sm">
          <div class="px-5 py-4 border-b border-gray-100 flex items-center justify-between gap-3">
            <div class="text-sm font-bold text-gray-800">返佣概览</div>
          </div>
          <div class="p-5 grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
            <div v-for="c in commissionCards" :key="c.key" class="bg-gray-50 border border-gray-100 rounded-lg p-3">
              <div class="text-[11px] text-gray-500">{{ c.label }}</div>
              <div class="mt-1 font-mono text-base font-bold text-gray-800">$ {{ formatMoney(c.value) }}</div>
            </div>
          </div>
        </div>

        <div v-if="isMib" class="bg-white border border-gray-100 rounded-lg shadow-sm">
          <div class="px-5 py-4 border-b border-gray-100 flex items-center justify-between gap-3">
            <div class="text-sm font-bold text-gray-800">MIB 团队概览</div>
          </div>
          <div class="p-5 grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
            <div v-for="c in teamCards" :key="c.key" class="bg-gray-50 border border-gray-100 rounded-lg p-3">
              <div class="text-[11px] text-gray-500">{{ c.label }}</div>
              <div class="mt-1 font-mono text-base font-bold text-gray-800">{{ formatInt(c.value) }}</div>
            </div>
          </div>
          <div class="px-5 pb-5">
            <div class="text-xs font-medium text-gray-700 mb-2">Top 下级代理</div>
            <div class="overflow-x-auto">
              <table class="w-full text-xs min-w-[520px]">
                <thead class="bg-gray-50 text-gray-600 border border-gray-100">
                  <tr>
                    <th class="text-left font-medium px-3 py-2">代理账号</th>
                    <th class="text-left font-medium px-3 py-2">代理名称</th>
                    <th class="text-right font-medium px-3 py-2">客户数</th>
                    <th class="text-right font-medium px-3 py-2">本月返佣($)</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-gray-50 border border-gray-100 border-t-0 text-gray-700">
                  <tr v-for="a in topAgents" :key="a.agentId" class="hover:bg-gray-50/60 transition-colors">
                    <td class="px-3 py-2 font-mono">{{ a.agentId }}</td>
                    <td class="px-3 py-2">{{ a.agentName }}</td>
                    <td class="px-3 py-2 text-right font-mono">{{ formatInt(a.customers) }}</td>
                    <td class="px-3 py-2 text-right font-mono">{{ formatMoney(a.monthCommission) }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

        <div class="w-[360px] shrink-0 hidden xl:flex flex-col gap-4">
          <div class="bg-white border border-gray-100 rounded-lg shadow-sm">
            <div class="px-5 py-4 border-b border-gray-100 flex items-center justify-between gap-3">
              <div class="text-sm font-bold text-gray-800">推广中心</div>
            </div>
            <div class="p-5 text-xs space-y-3">
              <div class="flex bg-gray-100/60 p-1 rounded-lg border border-gray-200/60">
                <button
                  type="button"
                  class="flex-1 px-3 py-1 rounded-md text-xs font-medium transition-all"
                  :class="promoTab === 'client' ? 'bg-white text-gray-800 shadow-sm border border-gray-200/60' : 'text-gray-500 hover:text-gray-700'"
                  @click="promoTab = 'client'"
                >
                  直客邀请
                </button>
                <button
                  type="button"
                  class="flex-1 px-3 py-1 rounded-md text-xs font-medium transition-all"
                  :class="promoTab === 'agent' ? 'bg-white text-gray-800 shadow-sm border border-gray-200/60' : 'text-gray-500 hover:text-gray-700'"
                  @click="promoTab = 'agent'"
                >
                  代理邀请
                </button>
              </div>

              <div class="space-y-3">
                <div class="flex items-center justify-between gap-3">
                  <div class="text-gray-500">{{ currentPromo.codeLabel }}</div>
                  <div class="flex items-center gap-2">
                    <div class="font-mono font-medium text-gray-800">{{ currentPromo.inviteCode }}</div>
                    <button class="px-2.5 py-1.5 rounded bg-blue-50 hover:bg-blue-100 text-blue-600 border border-blue-100 transition-colors" type="button" @click="copyText(currentPromo.inviteCode)">
                      复制
                    </button>
                  </div>
                </div>

                <div class="space-y-2">
                  <div class="text-gray-500">{{ currentPromo.linkLabel }}</div>
                  <div class="flex items-center gap-2">
                    <input class="flex-1 border border-gray-200 rounded px-3 py-2 text-[11px] font-mono outline-none" :value="currentPromo.shareLink" readonly />
                    <button class="px-3 py-2 rounded bg-blue-50 hover:bg-blue-100 text-blue-600 border border-blue-100 transition-colors" type="button" @click="copyText(currentPromo.shareLink)">
                      复制
                    </button>
                  </div>
                </div>

                <div class="flex items-center gap-2">
                  <button class="flex-1 px-3 py-2 rounded border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors" type="button" @click="qrVisible = true">查看二维码</button>
                </div>
              </div>
            </div>
          </div>

        <div v-if="showMessageCenter" class="bg-white border border-gray-100 rounded-lg shadow-sm">
          <div class="px-5 py-4 border-b border-gray-100 flex items-center justify-between gap-3">
            <div class="text-sm font-bold text-gray-800">站内信 / 消息</div>
            <div class="inline-flex items-center gap-2">
              <span v-if="unreadCount > 0" class="inline-flex items-center justify-center w-5 h-5 rounded-full bg-red-500 text-white text-[10px] font-bold">{{ unreadCount }}</span>
            </div>
          </div>
          <div class="p-5 text-xs">
            <div class="space-y-3">
              <button
                v-for="m in messages"
                :key="m.id"
                type="button"
                class="w-full text-left flex items-start gap-3 hover:bg-gray-50 rounded p-2 -m-2 transition-colors"
                @click="openMessage(m)"
              >
                <span :class="['w-2 h-2 rounded-full mt-1.5', m.read ? 'bg-gray-300' : 'bg-red-500']"></span>
                <div class="flex-1 min-w-0">
                  <div class="flex items-center justify-between gap-3">
                    <div class="font-medium text-gray-800 truncate">{{ m.title }}</div>
                    <div class="text-[11px] text-gray-400 font-mono shrink-0">{{ m.time }}</div>
                  </div>
                  <div class="mt-0.5 text-[11px] text-gray-500 truncate">{{ m.desc }}</div>
                </div>
              </button>
            </div>
            <div class="mt-4">
              <button class="w-full px-3 py-2 rounded border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors" type="button" @click="viewAllMessages">
                查看全部
              </button>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div class="flex justify-between items-center mb-4">
            <p class="text-sm text-gray-500 font-medium">通知公告</p>
            <button class="text-xs text-gray-400 hover:text-gray-600" type="button" @click="viewAllNotices">查看更多 ></button>
          </div>

          <button
            v-for="n in notices"
            :key="n.id"
            type="button"
            class="w-full flex justify-between items-center group cursor-pointer mt-2 py-2"
            @click="openNotice(n)"
          >
            <div class="flex items-center gap-2 min-w-0">
              <span class="w-1.5 h-1.5 rounded-full" :class="n.isLatest ? 'bg-[#d1a84f]' : 'bg-gray-300'"></span>
              <p class="text-sm text-gray-700 group-hover:text-[#d1a84f] transition-colors truncate">
                {{ n.title }}
              </p>
              <span v-if="n.isLatest" class="text-[10px] px-2 py-0.5 rounded bg-amber-50 text-amber-700 border border-amber-200 shrink-0">最新</span>
            </div>
            <span class="text-xs text-gray-400 font-mono shrink-0">{{ n.date }}</span>
          </button>
        </div>
        </div>
      </div>

      <el-dialog v-model="qrVisible" title="推广二维码" width="420px">
        <div class="flex items-center justify-center py-6">
          <div class="w-[240px] h-[240px] bg-gray-50 border border-gray-200 rounded flex items-center justify-center text-xs text-gray-400">
            QR Code
          </div>
        </div>
        <template #footer>
          <div class="flex items-center justify-end gap-2">
            <button class="px-4 py-2 rounded border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors" type="button" @click="qrVisible = false">关闭</button>
          </div>
        </template>
      </el-dialog>

      <el-dialog v-model="joinDialogVisible" title="申请参与 PCard 活动" width="92%" :style="{ maxWidth: '560px' }" :close-on-click-modal="false" destroy-on-close>
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
              <span class="font-medium text-gray-800">{{ activity.name }}</span>
            </div>
            <div class="flex items-start gap-3">
              <span class="w-16 text-gray-400 shrink-0">活动条件</span>
              <div class="space-y-1">
                <div>净入金达到 <span class="font-medium text-gray-800">${{ formatMoney(TARGET_NET_DEPOSIT) }}</span></div>
                <div>累计交易达到 <span class="font-medium text-gray-800">{{ formatLots(TARGET_LOTS) }} Lot</span></div>
                <div>双条件达标即可免费办理 <span class="font-medium text-gray-800">PCard</span></div>
              </div>
            </div>
          </div>

          <div class="bg-orange-50 border border-orange-200 text-orange-700 px-4 py-3 rounded-lg text-xs leading-relaxed">
            {{ isNewUser ? '将默认使用本次享受赠金的 MT 账号参与活动，进度从申请成功时间开始统计。' : '老用户参与活动不享受开户赠金，请选择一个 MT 账号参加活动。' }}
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
        </div>
        <template #footer>
          <div class="flex items-center justify-end gap-2">
            <button class="px-4 py-2 rounded border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors" type="button" @click="joinDialogVisible = false">取消</button>
            <button
              class="px-4 py-2 rounded bg-rose-500 hover:bg-rose-600 text-white text-xs font-bold transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              type="button"
              :disabled="!isNewUser && !selectedJoinMtAccount"
              @click="confirmJoin"
            >
              确认参与
            </button>
          </div>
        </template>
      </el-dialog>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, watch } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const showMessageCenter = ref(false)

const isMib = computed(() => false)

const mtScopeTabs = [
  { key: 'self', label: '本人' },
  { key: 'umbrella', label: '伞下' },
  { key: 'all', label: '全部' }
]

const mtTimeTabs = [
  { key: 'today', label: '今日' },
  { key: 'week', label: '本周' },
  { key: 'month', label: '本月' },
  { key: 'lastMonth', label: '上月' },
  { key: 'custom', label: '自定义' }
]

const mtScopeKey = ref('umbrella')
const mtTimeKey = ref('month')
const mtCustomStart = ref('2026-09-01')
const mtCustomEnd = ref('2026-09-13')

const mtScopeLabel = computed(() => mtScopeTabs.find((t) => t.key === mtScopeKey.value)?.label || mtScopeKey.value)
const mtTimeLabel = computed(() => {
  if (mtTimeKey.value === 'custom') return `${mtCustomStart.value} ~ ${mtCustomEnd.value}`
  return mtTimeTabs.find((t) => t.key === mtTimeKey.value)?.label || mtTimeKey.value
})

const mtPeriodLabel = computed(() => {
  if (mtTimeKey.value === 'custom') return '区间'
  return mtTimeTabs.find((t) => t.key === mtTimeKey.value)?.label || mtTimeKey.value
})

const mtDemo = {
  self: {
    realtime: { balance: 125820.45, positionLots: 18.6, floatingPnl: 520.35 },
    month: { deposit: 85200.0, withdraw: 32600.0, tradingLots: 185.25, closedPnl: 3200.25 }
  },
  umbrella: {
    realtime: { balance: 456530.3, positionLots: 302.15, floatingPnl: -9170.57 },
    month: { deposit: 266800.0, withdraw: 84900.0, tradingLots: 1095.35, closedPnl: 42010.1 }
  },
  all: {
    realtime: { balance: 582350.75, positionLots: 320.75, floatingPnl: -8650.22 },
    month: { deposit: 352000.0, withdraw: 117500.0, tradingLots: 1280.6, closedPnl: 45210.35 }
  }
}

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

const mtRealtime = computed(() => mtDemo[mtScopeKey.value]?.realtime || mtDemo.umbrella.realtime)

const mtPeriod = computed(() => {
  const base = mtDemo[mtScopeKey.value]?.month || mtDemo.umbrella.month
  const f = mtFactor.value
  return {
    deposit: base.deposit * f,
    withdraw: base.withdraw * f,
    tradingLots: base.tradingLots * f,
    closedPnl: base.closedPnl * f
  }
})

const userType = ref('new')
const isNewUser = computed(() => userType.value === 'new')

const baseKpi = {
  customersTotal: 1260,
  activeCustomers: 382,
  monthNewCustomers: 86,
  netDeposit: 235000.55,
  tradingLots: 1280.6,
  monthCommission: 18650.2,
  firstDepositCustomers: 42,
  monthWithdraw: 98000.0
}

const kpis = computed(() => [
  { key: 'customersTotal', label: '客户总数', value: formatInt(baseKpi.customersTotal) },
  { key: 'activeCustomers', label: '活跃客户数', value: formatInt(baseKpi.activeCustomers) },
  { key: 'monthNewCustomers', label: '本月新增客户', value: formatInt(baseKpi.monthNewCustomers) },
  { key: 'netDeposit', label: '客户净入金', value: '$ ' + formatMoney(baseKpi.netDeposit) },
  { key: 'tradingLots', label: '客户交易量', value: formatLots(baseKpi.tradingLots) + ' Lot' },
  { key: 'monthCommission', label: '本月返佣', value: '$ ' + formatMoney(baseKpi.monthCommission) }
])

const kpiHighlightKeys = new Set(['monthCommission'])

const trendTabs = [
  { key: 'netDeposit', label: '净入金' },
  { key: 'tradingLots', label: '交易量' },
  { key: 'monthNewCustomers', label: '新增客户' },
  { key: 'monthCommission', label: '返佣' }
]

const trendKey = ref('netDeposit')

const trendData = computed(() => {
  const base = trendKey.value === 'monthNewCustomers' ? 4 : trendKey.value === 'tradingLots' ? 60 : 800
  const amp = trendKey.value === 'monthCommission' ? 120 : trendKey.value === 'netDeposit' ? 600 : trendKey.value === 'tradingLots' ? 40 : 3
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

const reminders = [
  { key: 'newNoDeposit', label: '新注册未入金', value: 38 },
  { key: 'depositNoTrade', label: '已入金未交易', value: 57 },
  { key: 'noTrade7', label: '7天未交易', value: 124 },
  { key: 'inactive30', label: '30天未活跃', value: 210 },
  { key: 'bigWithdraw', label: '大额出金客户', value: 9 }
]

const commissionCards = [
  { key: 'today', label: '今日返佣', value: 520.8 },
  { key: 'week', label: '本周返佣', value: 3620.4 },
  { key: 'month', label: '本月返佣', value: baseKpi.monthCommission },
  { key: 'lastMonth', label: '上月返佣', value: 17220.35 }
]

const teamCards = computed(() => [
  { key: 'directAgents', label: '直属代理数', value: 18 },
  { key: 'teamAgents', label: '团队代理数', value: 62 },
  { key: 'directCustomers', label: '直属客户数', value: 420 },
  { key: 'teamCustomers', label: '团队客户数', value: baseKpi.customersTotal }
])

const topAgents = [
  { agentId: 'IB1020', agentName: 'jack', customers: 260, monthCommission: 3680.5 },
  { agentId: 'IB1108', agentName: 'Mikey', customers: 190, monthCommission: 2410.2 },
  { agentId: 'IB1217', agentName: 'Luna', customers: 165, monthCommission: 1980.0 }
]

const promoTab = ref('client')
const promoClient = {
  inviteCode: 'C-IB1001X',
  shareLink: 'https://crm-demo.example.com/register/client?ref=C-IB1001X'
}
const promoAgent = {
  inviteCode: 'A-IB1001X',
  shareLink: 'https://crm-demo.example.com/register/agent?ref=A-IB1001X'
}
const currentPromo = computed(() => {
  if (promoTab.value === 'agent') {
    return { codeLabel: '代理邀请码', linkLabel: '代理分享链接', inviteCode: promoAgent.inviteCode, shareLink: promoAgent.shareLink }
  }
  return { codeLabel: '直客邀请码', linkLabel: '直客分享链接', inviteCode: promoClient.inviteCode, shareLink: promoClient.shareLink }
})

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
  tradingLots: 680.25,
  link: promoClient.shareLink
}

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

const messages = ref([
  { id: 'm1', title: '返佣到账', desc: '今日返佣已实时到账，可在返佣报表查看明细。', time: '09-11 10:20', read: false },
  { id: 'm2', title: '今日返佣更新', desc: '本日返佣累计 +$120.50。', time: '09-11 09:48', read: false },
  { id: 'm3', title: '客户交易产生返佣', desc: '客户 C10002 交易产生返佣 +$12.30。', time: '09-10 21:05', read: true },
  { id: 'm4', title: '客户归属变化', desc: '客户 C20013 归属已调整至 IB1108。', time: '09-10 18:12', read: true },
  { id: 'm5', title: '系统业务通知', desc: '入金通道维护完成，当前服务正常。', time: '09-10 12:30', read: true }
])

const notices = ref([
  { id: 'n1', title: '节假日交易时间调整通知', date: '09-11', isLatest: true },
  { id: 'n2', title: '产品/交易规则更新说明', date: '09-10', isLatest: false },
  { id: 'n3', title: '系统维护公告（周末 02:00-04:00）', date: '09-09', isLatest: false },
  { id: 'n4', title: '重要业务通知：入金通道切换安排', date: '09-08', isLatest: false }
])

const unreadCount = computed(() => messages.value.filter((m) => !m.read).length)

const qrVisible = ref(false)
const joinDialogVisible = ref(false)
const activityJoined = ref(false)
const joinedMtAccount = ref('-')
const joinedAt = ref('-')
const selectedJoinMtAccount = ref('')

const bonusMtAccount = '8100458'
const mtAccounts = ref(['8100458', '8100477', '8100520', '8100601', '8100702', '8300248', '8300255'])
const displayMtAccounts = computed(() => mtAccounts.value.slice(0, 5))
watch(
  userType,
  (v) => {
    if (v === 'new') selectedJoinMtAccount.value = bonusMtAccount
    else selectedJoinMtAccount.value = ''
  },
  { immediate: true }
)

const nowText = () => {
  const d = new Date()
  const pad = (n) => String(n).padStart(2, '0')
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`
}

const copyText = async (text) => {
  try {
    await navigator.clipboard.writeText(text)
  } catch (e) {
    const input = document.createElement('textarea')
    input.value = text
    document.body.appendChild(input)
    input.select()
    document.execCommand('copy')
    document.body.removeChild(input)
  }
}

const openReminder = () => {}

const handleJoinActivity = () => {
  joinDialogVisible.value = true
  if (isNewUser.value) {
    selectedJoinMtAccount.value = bonusMtAccount
  }
}

const confirmJoin = () => {
  if (!isNewUser.value && !selectedJoinMtAccount.value) return
  const mt = isNewUser.value ? bonusMtAccount : selectedJoinMtAccount.value
  activityJoined.value = true
  joinedMtAccount.value = mt
  joinedAt.value = nowText()
  joinDialogVisible.value = false
}

const openMessage = (m) => {
  m.read = true
}

const viewAllMessages = () => {
  router.push('/system/msg')
}

const viewAllNotices = () => {
  router.push('/news/latest')
}

const openNotice = () => {}

const pnlClass = (v) => {
  const n = Number(v || 0)
  if (n > 0) return 'text-emerald-600'
  if (n < 0) return 'text-red-600'
  return 'text-gray-700'
}

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

const netDepositProgress = computed(() => percent(activity.netDeposit, TARGET_NET_DEPOSIT))
const tradeLotsProgress = computed(() => percent(activity.tradingLots, TARGET_LOTS))
</script>
