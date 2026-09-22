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
      <p class="mt-1 text-xs font-medium text-gray-600">
        客户总数为当前数据；活跃客户统计最近30天；新增客户、净入金、交易量及返佣统计本月1日至当前时间。
      </p>

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

          <div class="bg-white border border-gray-100 rounded-lg shadow-sm p-4">
            <div class="flex items-start justify-between gap-4 flex-wrap">
              <div class="flex items-center gap-2 text-[11px] text-gray-500">
                <span class="w-1.5 h-1.5 rounded-full bg-gray-400"></span>
                <span class="font-medium text-gray-700">MT账户概览</span>
              </div>

              <div class="flex items-center gap-3 flex-wrap justify-end">
                <div class="flex items-center gap-2">
                  <span class="text-[11px] text-gray-500">账户范围</span>
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
              </div>
            </div>

            <div class="mt-3">
              <div class="flex items-center justify-between gap-3 flex-wrap">
                <div class="text-[11px] font-medium text-gray-700">当前实时数据</div>
                <div class="flex items-center gap-2">
                  <span class="text-[10px] px-2 py-0.5 rounded bg-[#d1a84f]/10 border border-[#d1a84f]/30 text-[#b8903f] font-medium">实时快照</span>
                  <span class="text-[11px] text-gray-400 font-mono">{{ mtRealtimeSyncAt }}</span>
                </div>
              </div>
              <div class="mt-1 text-[11px] text-gray-400">当前数据为所选账户范围的最新快照，不受时间筛选影响。</div>

              <div class="mt-2 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div class="rounded-lg border border-gray-100 bg-gray-50/60 px-3 py-2.5">
                  <div class="text-[11px] text-gray-500">当前MT余额</div>
                  <div class="mt-0.5 font-mono font-bold text-base text-gray-900">$ {{ formatMoney(mtRealtime.balance) }}</div>
                </div>

                <div class="rounded-lg border border-gray-100 bg-gray-50/60 px-3 py-2.5">
                  <div class="text-[11px] text-gray-500">当前持仓量</div>
                  <div class="mt-0.5 font-mono font-bold text-base text-gray-900">{{ formatLots(mtRealtime.positionLots) }} Lot</div>
                </div>

                <div class="rounded-lg border border-gray-100 bg-gray-50/60 px-3 py-2.5">
                  <div class="text-[11px] text-gray-500">当前浮动盈亏</div>
                  <div class="mt-0.5 font-mono font-bold text-base" :class="pnlClass(mtRealtime.floatingPnl)">$ {{ formatMoney(mtRealtime.floatingPnl) }}</div>
                </div>
              </div>
            </div>

            <div class="mt-4 pt-4 border-t border-gray-100">
              <div class="flex items-center justify-between gap-3 flex-wrap">
                <div class="text-[11px] font-medium text-gray-700">{{ mtPeriodTitle }}</div>
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

              <div v-if="mtTimeKey === 'custom'" class="mt-3">
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div class="flex items-center gap-2">
                    <div class="text-gray-500 w-[72px] shrink-0 text-right">开始日期：</div>
                    <input v-model="mtCustomStart" class="border border-gray-300 rounded px-3 py-2 outline-none flex-1 bg-white text-center" placeholder="YYYY-MM-DD" type="date" />
                  </div>
                  <div class="flex items-center gap-2">
                    <div class="text-gray-500 w-[72px] shrink-0 text-right">结束日期：</div>
                    <input v-model="mtCustomEnd" class="border border-gray-300 rounded px-3 py-2 outline-none flex-1 bg-white text-center" placeholder="YYYY-MM-DD" type="date" />
                  </div>
                </div>
                <div v-if="mtCustomError" class="mt-2 text-[11px] text-red-500">{{ mtCustomError }}</div>
              </div>

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

        <div class="bg-white border border-gray-100 rounded-lg shadow-sm">
          <div class="px-5 py-4 border-b border-gray-100 flex items-center justify-between gap-3">
            <div class="text-sm font-bold text-gray-800">下级代理列表</div>
            <div class="text-[11px] text-gray-400">演示数据</div>
          </div>
          <div class="p-5">
            <div class="overflow-x-auto">
              <table class="w-full text-xs min-w-[980px]">
                <thead class="bg-gray-50 text-gray-600 border border-gray-100">
                  <tr>
                    <th class="text-left font-medium px-3 py-2">代理账号</th>
                    <th class="text-left font-medium px-3 py-2">代理名称</th>
                    <th class="text-right font-medium px-3 py-2">下级客户数</th>
                    <th class="text-right font-medium px-3 py-2">本月净入金($)</th>
                    <th class="text-right font-medium px-3 py-2">本月交易量(Lot)</th>
                    <th class="text-right font-medium px-3 py-2">本月返佣($)</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-gray-50 border border-gray-100 border-t-0 text-gray-700">
                  <tr v-for="a in subAgentRows" :key="a.agentId" class="hover:bg-gray-50/60 transition-colors">
                    <td class="px-3 py-2 font-mono">{{ a.agentId }}</td>
                    <td class="px-3 py-2">{{ a.agentName }}</td>
                    <td class="px-3 py-2 text-right font-mono">{{ formatInt(a.customers) }}</td>
                    <td class="px-3 py-2 text-right font-mono">{{ formatMoney(a.netDeposit) }}</td>
                    <td class="px-3 py-2 text-right font-mono">{{ formatLots(a.tradingLots) }}</td>
                    <td class="px-3 py-2 text-right font-mono">{{ formatMoney(a.monthCommission) }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

        <div class="w-[360px] shrink-0 hidden xl:flex flex-col gap-4">
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

      <el-dialog v-model="reminderDialogVisible" :title="reminderDialogTitle" width="90%" :style="{ maxWidth: '1400px' }" destroy-on-close>
        <div class="space-y-4">
          <div class="flex items-start justify-between gap-3 flex-wrap">
            <div class="text-xs text-gray-500">
              <div class="flex items-center gap-2">
                <span class="text-gray-400">当前统计总数</span>
                <span class="font-mono font-bold text-gray-900">{{ formatInt(reminderTotal) }}</span>
              </div>
              <div class="mt-2 text-[11px] text-gray-500 leading-relaxed">
                {{ reminderCaliber }}
              </div>
            </div>
          </div>

          <div class="bg-gray-50 border border-gray-100 rounded-lg p-4">
            <div class="grid grid-cols-1 md:grid-cols-[1fr_220px_auto] gap-3 items-end">
              <div>
                <div class="text-[11px] text-gray-500 mb-2">客户名称/邮箱</div>
                <input v-model.trim="reminderKeywordInput" class="h-9 w-full rounded border border-gray-200 bg-white px-3 text-xs outline-none focus:border-[#d1a84f] focus:ring-2 focus:ring-[#d1a84f]/10" placeholder="请输入客户名称或邮箱" />
              </div>
              <div>
                <div class="text-[11px] text-gray-500 mb-2">MT账号</div>
                <input v-model.trim="reminderMtInput" class="h-9 w-full rounded border border-gray-200 bg-white px-3 text-xs outline-none focus:border-[#d1a84f] focus:ring-2 focus:ring-[#d1a84f]/10" placeholder="请输入MT账号" />
              </div>
              <div class="flex items-center justify-end gap-2">
                <button type="button" class="h-9 px-4 rounded bg-[#d1a84f] hover:bg-[#b8903f] text-white text-xs font-bold transition-colors" @click="applyReminderSearch">查询</button>
                <button type="button" class="h-9 px-4 rounded border border-gray-200 text-gray-600 hover:bg-gray-100 text-xs font-medium transition-colors" @click="resetReminderSearch">重置</button>
              </div>
            </div>
          </div>

          <div class="border border-gray-100 rounded-lg overflow-hidden bg-white">
            <div class="overflow-x-auto">
              <table class="w-full text-xs min-w-[1180px]">
                <thead class="bg-gray-50 text-gray-600 border-b border-gray-100">
                  <tr>
                    <th v-for="c in reminderColumns" :key="c.key" class="text-left font-medium px-3 py-2" :style="c.width ? { width: c.width } : undefined">
                      {{ c.label }}
                    </th>
                    <th class="text-left font-medium px-3 py-2 sticky right-0 bg-gray-50 border-l border-gray-100 w-[110px]">操作</th>
                  </tr>
                </thead>
                <tbody v-if="reminderPageRows.length" class="divide-y divide-gray-50 text-gray-700">
                  <tr v-for="row in reminderPageRows" :key="row.__rowKey" class="hover:bg-gray-50/60 transition-colors">
                    <td v-for="c in reminderColumns" :key="c.key" class="px-3 py-2 align-top">
                      <template v-if="c.key === 'noTradeDays'">
                        <span class="inline-flex items-center px-2 py-0.5 rounded border border-amber-200 bg-amber-50 text-amber-700 font-mono">{{ row.noTradeDays }}</span>
                      </template>
                      <template v-else-if="c.key === 'inactiveDays'">
                        <span
                          class="inline-flex items-center px-2 py-0.5 rounded border font-mono"
                          :class="Number(row.inactiveDays) >= 60 ? 'border-red-200 bg-red-50 text-red-600' : 'border-amber-200 bg-amber-50 text-amber-700'"
                        >
                          {{ row.inactiveDays }}
                        </span>
                      </template>
                      <template v-else-if="c.key === 'singleWithdraw'">
                        <span class="font-mono" :class="Number(row.singleWithdraw) >= 10000 ? 'text-red-600 font-bold' : 'text-gray-700'">{{ row.singleWithdrawText }}</span>
                      </template>
                      <template v-else-if="c.key === 'withdraw24h'">
                        <span class="font-mono" :class="Number(row.withdraw24h) >= 20000 ? 'text-red-600 font-bold' : 'text-gray-700'">{{ row.withdraw24hText }}</span>
                      </template>
                      <template v-else-if="c.key === 'withdrawRatio'">
                        <span class="font-mono" :class="Number(row.withdrawRatio) >= 0.8 ? 'text-red-600 font-bold' : 'text-gray-700'">{{ row.withdrawRatioText }}</span>
                      </template>
                      <template v-else>
                        <span :class="c.mono ? 'font-mono' : ''">{{ row[c.key] }}</span>
                      </template>
                    </td>
                    <td class="px-3 py-2 sticky right-0 bg-white border-l border-gray-100">
                      <button type="button" class="px-3 py-1.5 rounded bg-[#d1a84f] hover:bg-[#b8903f] text-white text-xs font-bold transition-colors whitespace-nowrap" @click="viewReminderClient(row)">查看客户</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div v-if="!reminderPageRows.length" class="py-12 text-center text-xs text-gray-400">
              暂无数据
            </div>
          </div>

          <div class="flex items-center justify-between gap-3 flex-wrap">
            <div class="text-[11px] text-gray-400">共 {{ formatInt(reminderFilteredTotal) }} 条记录</div>
            <div class="flex items-center gap-2">
              <button
                type="button"
                class="h-8 px-3 rounded border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors text-xs disabled:opacity-40 disabled:cursor-not-allowed"
                :disabled="reminderPage <= 1"
                @click="reminderPage -= 1"
              >
                上一页
              </button>
              <div class="text-[11px] text-gray-500 font-mono">
                {{ reminderPage }} / {{ reminderTotalPages }}
              </div>
              <button
                type="button"
                class="h-8 px-3 rounded border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors text-xs disabled:opacity-40 disabled:cursor-not-allowed"
                :disabled="reminderPage >= reminderTotalPages"
                @click="reminderPage += 1"
              >
                下一页
              </button>
            </div>
          </div>
        </div>
        <template #footer>
          <div class="flex items-center justify-end gap-2">
            <button class="px-4 py-2 rounded border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors" type="button" @click="reminderDialogVisible = false">关闭</button>
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
const mtRealtimeSyncAt = ref('2026-09-13 14:30:25')

const mtPeriodTitle = computed(() => {
  if (mtTimeKey.value === 'custom') return '自定义期间数据'
  const t = mtTimeTabs.find((x) => x.key === mtTimeKey.value)
  return `${t?.label || mtTimeKey.value}期间数据`
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

const mtCustomError = computed(() => {
  if (mtTimeKey.value !== 'custom') return ''
  if (!mtCustomStart.value) return '开始日期不能为空'
  if (!mtCustomEnd.value) return '结束日期不能为空'
  const s = parseYmd(mtCustomStart.value)
  const e = parseYmd(mtCustomEnd.value)
  if (!s) return '开始日期格式不正确'
  if (!e) return '结束日期格式不正确'
  if (s.getTime() > e.getTime()) return '开始日期不能晚于结束日期'
  return ''
})

const mtFactor = computed(() => {
  if (mtTimeKey.value === 'today') return 1 / 30
  if (mtTimeKey.value === 'week') return 7 / 30
  if (mtTimeKey.value === 'month') return 1
  if (mtTimeKey.value === 'lastMonth') return 0.92
  if (mtCustomError.value) return 0
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

const subAgentRows = [
  { agentId: 'IB1020', agentName: 'jack', customers: 260, netDeposit: 68500.0, tradingLots: 312.5, monthCommission: 3680.5 },
  { agentId: 'IB1108', agentName: 'Mikey', customers: 190, netDeposit: 52300.0, tradingLots: 268.35, monthCommission: 2410.2 },
  { agentId: 'IB1217', agentName: 'Luna', customers: 165, netDeposit: 41800.55, tradingLots: 215.9, monthCommission: 1980.0 },
  { agentId: 'IB1350', agentName: 'Kris', customers: 132, netDeposit: 35600.0, tradingLots: 182.75, monthCommission: 1520.65 },
  { agentId: 'IB1406', agentName: 'Noah', customers: 98, netDeposit: 22850.0, tradingLots: 120.6, monthCommission: 980.3 }
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

const reminderDialogVisible = ref(false)
const reminderActiveKey = ref('')
const reminderPage = ref(1)
const reminderPageSize = 10
const reminderKeywordInput = ref('')
const reminderMtInput = ref('')
const reminderSearch = ref({ keyword: '', mt: '' })

const reminderConfigs = computed(() => {
  const mkRowKey = (prefix, idx) => `${prefix}-${idx + 1}`

  const agents = ['IB1020', 'IB1108', 'IB1217', 'IB1350', 'IB1406']
  const regions = ['中国', '中国香港', '日本', '韩国', '新加坡', '泰国', '越南']
  const kyc = ['未提交', '审核中', '已通过', '未通过']
  const mtOpen = ['未开户', '已开户', '开户中']

  const newNoDepositRows = Array.from({ length: reminders.find((x) => x.key === 'newNoDeposit')?.value || 0 }).map((_, i) => {
    const id = 8100000 + i + 1
    return {
      __rowKey: mkRowKey('newNoDeposit', i),
      customerName: `客户${String(i + 1).padStart(2, '0')}`,
      customerEmail: `client${id}@demo.com`,
      registerAt: `2026-09-${String(((i % 7) + 7)).padStart(2, '0')} ${String((9 + (i % 10))).padStart(2, '0')}:1${i % 6}:0${i % 9}`,
      registerRegion: regions[i % regions.length],
      kycStatus: kyc[i % kyc.length],
      mtOpenStatus: mtOpen[i % mtOpen.length],
      totalDeposit: '0.00 USD',
      agent: agents[i % agents.length],
      lastContactAt: `2026-09-${String(((i % 7) + 7)).padStart(2, '0')} ${String((14 + (i % 6))).padStart(2, '0')}:0${i % 6}:2${i % 9}`,
      clientId: String(id)
    }
  })

  const depositNoTradeRows = Array.from({ length: reminders.find((x) => x.key === 'depositNoTrade')?.value || 0 }).map((_, i) => {
    const id = 8200000 + i + 1
    return {
      __rowKey: mkRowKey('depositNoTrade', i),
      customerName: `客户${String(i + 1).padStart(2, '0')}`,
      customerEmail: `client${id}@demo.com`,
      mtAccount: String(8100400 + (i % 80)),
      firstDepositAt: `2026-08-${String(((i % 30) + 1)).padStart(2, '0')} 10:2${i % 6}:1${i % 9}`,
      firstDepositAmount: `${formatMoney(200 + (i % 9) * 100)} USD`,
      tradeCount: 0,
      lastLoginAt: `2026-09-${String(((i % 7) + 6)).padStart(2, '0')} 12:0${i % 6}:3${i % 9}`,
      agent: agents[i % agents.length],
      clientId: i % 7 === 0 ? '' : String(id)
    }
  })

  const noTrade7Rows = Array.from({ length: reminders.find((x) => x.key === 'noTrade7')?.value || 0 }).map((_, i) => {
    const id = 8300000 + i + 1
    const days = 7 + (i % 23)
    return {
      __rowKey: mkRowKey('noTrade7', i),
      customerName: `客户${String(i + 1).padStart(2, '0')}`,
      customerEmail: `client${id}@demo.com`,
      mtAccount: String(8100600 + (i % 120)),
      lastTradeAt: `2026-08-${String(((i % 23) + 1)).padStart(2, '0')} 09:3${i % 6}:0${i % 9}`,
      noTradeDays: `${days}天`,
      historyLots: `${formatLots(80 + (i % 12) * 12.5)} Lot`,
      currentBalance: `${formatMoney(1000 + (i % 20) * 350)} USD`,
      lastLoginAt: `2026-09-${String(((i % 7) + 6)).padStart(2, '0')} 16:1${i % 6}:0${i % 9}`,
      agent: agents[i % agents.length],
      clientId: String(id)
    }
  })

  const inactive30Rows = Array.from({ length: reminders.find((x) => x.key === 'inactive30')?.value || 0 }).map((_, i) => {
    const id = 8400000 + i + 1
    const silentDays = 30 + (i % 45)
    return {
      __rowKey: mkRowKey('inactive30', i),
      customerName: `客户${String(i + 1).padStart(2, '0')}`,
      customerEmail: `client${id}@demo.com`,
      mtAccount: String(8100200 + (i % 160)),
      lastLoginAt: `2026-08-${String(((i % 28) + 1)).padStart(2, '0')} 11:0${i % 6}:1${i % 9}`,
      lastDepositAt: i % 3 === 0 ? '-' : `2026-07-${String(((i % 28) + 1)).padStart(2, '0')} 15:2${i % 6}:0${i % 9}`,
      lastTradeAt: `2026-07-${String(((i % 28) + 1)).padStart(2, '0')} 13:1${i % 6}:2${i % 9}`,
      inactiveDays: `${silentDays}天`,
      currentBalance: `${formatMoney(800 + (i % 22) * 420)} USD`,
      historyNetDeposit: `${formatMoney(1200 + (i % 18) * 600)} USD`,
      agent: agents[i % agents.length],
      clientId: String(id)
    }
  })

  const bigWithdrawRows = Array.from({ length: reminders.find((x) => x.key === 'bigWithdraw')?.value || 0 }).map((_, i) => {
    const id = 8500000 + i + 1
    const single = i % 3 === 0 ? 10000 : 6500 + i * 800
    const sum24h = i % 2 === 0 ? 20000 : 12000 + i * 1500
    const balance = 12000 + i * 5000
    const ratio = i % 2 === 0 ? 0.8 : Math.min(0.95, single / balance)
    const rule = i % 3 === 0 ? '单笔出金≥10,000 USD' : i % 3 === 1 ? '24小时累计出金≥20,000 USD' : '出金占比≥80%'
    const status = ['待审核', '审核中', '已通过', '已完成'][i % 4]
    return {
      __rowKey: mkRowKey('bigWithdraw', i),
      customerName: `客户${String(i + 1).padStart(2, '0')}`,
      customerEmail: `client${id}@demo.com`,
      mtAccount: String(8100800 + (i % 30)),
      applyAt: `2026-09-${String(((i % 7) + 5)).padStart(2, '0')} 10:4${i % 6}:0${i % 9}`,
      singleWithdraw: single,
      singleWithdrawText: `${formatMoney(single)} USD`,
      withdraw24h: sum24h,
      withdraw24hText: `${formatMoney(sum24h)} USD`,
      currentFunds: `${formatMoney(balance)} USD`,
      withdrawRatio: ratio,
      withdrawRatioText: `${Math.round(ratio * 100)}%`,
      auditStatus: status,
      triggerRule: rule,
      agent: agents[i % agents.length],
      clientId: String(id)
    }
  })

  return {
    newNoDeposit: {
      label: '新注册未入金',
      total: reminders.find((x) => x.key === 'newNoDeposit')?.value || 0,
      caliber: '最近7天内注册，且累计成功真实入金金额为0的客户。注册不足24小时的客户也计入。',
      columns: [
        { key: 'customerName', label: '客户名称', width: '120px' },
        { key: 'customerEmail', label: '客户邮箱', width: '180px', mono: true },
        { key: 'registerAt', label: '注册时间', width: '150px', mono: true },
        { key: 'registerRegion', label: '注册地区', width: '120px' },
        { key: 'kycStatus', label: 'KYC状态', width: '100px' },
        { key: 'mtOpenStatus', label: 'MT开户状态', width: '100px' },
        { key: 'totalDeposit', label: '累计真实入金', width: '120px', mono: true },
        { key: 'agent', label: '归属代理', width: '90px', mono: true },
        { key: 'lastContactAt', label: '最近联系时间', width: '150px', mono: true }
      ],
      rows: newNoDepositRows
    },
    depositNoTrade: {
      label: '已入金未交易',
      total: reminders.find((x) => x.key === 'depositNoTrade')?.value || 0,
      caliber: '最近30天完成首次成功真实入金，但所有真实MT账户均未产生有效交易的客户。',
      columns: [
        { key: 'customerName', label: '客户名称', width: '120px' },
        { key: 'customerEmail', label: '客户邮箱', width: '180px', mono: true },
        { key: 'mtAccount', label: 'MT账号', width: '110px', mono: true },
        { key: 'firstDepositAt', label: '首次入金时间', width: '150px', mono: true },
        { key: 'firstDepositAmount', label: '首次入金金额', width: '130px', mono: true },
        { key: 'tradeCount', label: '有效交易笔数', width: '110px', mono: true },
        { key: 'lastLoginAt', label: '最近登录时间', width: '150px', mono: true },
        { key: 'agent', label: '归属代理', width: '90px', mono: true }
      ],
      rows: depositNoTradeRows
    },
    noTrade7: {
      label: '7天未交易',
      total: reminders.find((x) => x.key === 'noTrade7')?.value || 0,
      caliber: '历史上存在有效真实交易，最后一次有效交易距当前7至29天的客户。',
      columns: [
        { key: 'customerName', label: '客户名称', width: '120px' },
        { key: 'customerEmail', label: '客户邮箱', width: '180px', mono: true },
        { key: 'mtAccount', label: 'MT账号', width: '110px', mono: true },
        { key: 'lastTradeAt', label: '最后交易时间', width: '150px', mono: true },
        { key: 'noTradeDays', label: '未交易天数', width: '100px', mono: true },
        { key: 'historyLots', label: '历史交易量', width: '120px', mono: true },
        { key: 'currentBalance', label: '当前余额', width: '120px', mono: true },
        { key: 'lastLoginAt', label: '最近登录时间', width: '150px', mono: true },
        { key: 'agent', label: '归属代理', width: '90px', mono: true }
      ],
      rows: noTrade7Rows
    },
    inactive30: {
      label: '30天未活跃',
      total: reminders.find((x) => x.key === 'inactive30')?.value || 0,
      caliber: '连续30天没有CRM/MT登录、真实入金和有效交易行为的客户。',
      columns: [
        { key: 'customerName', label: '客户名称', width: '120px' },
        { key: 'customerEmail', label: '客户邮箱', width: '180px', mono: true },
        { key: 'mtAccount', label: 'MT账号', width: '110px', mono: true },
        { key: 'lastLoginAt', label: '最后登录时间', width: '150px', mono: true },
        { key: 'lastDepositAt', label: '最后入金时间', width: '150px', mono: true },
        { key: 'lastTradeAt', label: '最后交易时间', width: '150px', mono: true },
        { key: 'inactiveDays', label: '沉默天数', width: '100px', mono: true },
        { key: 'currentBalance', label: '当前余额', width: '120px', mono: true },
        { key: 'historyNetDeposit', label: '历史净入金', width: '120px', mono: true },
        { key: 'agent', label: '归属代理', width: '90px', mono: true }
      ],
      rows: inactive30Rows
    },
    bigWithdraw: {
      label: '大额出金客户',
      total: reminders.find((x) => x.key === 'bigWithdraw')?.value || 0,
      caliber: '当前统计周期内触发单笔大额出金、24小时累计出金或高出金占比规则的客户。',
      columns: [
        { key: 'customerName', label: '客户名称', width: '120px' },
        { key: 'customerEmail', label: '客户邮箱', width: '180px', mono: true },
        { key: 'mtAccount', label: 'MT账号', width: '110px', mono: true },
        { key: 'applyAt', label: '申请时间', width: '150px', mono: true },
        { key: 'singleWithdraw', label: '单笔出金金额', width: '130px', mono: true },
        { key: 'withdraw24h', label: '24小时累计出金', width: '140px', mono: true },
        { key: 'currentFunds', label: '当前资金', width: '120px', mono: true },
        { key: 'withdrawRatio', label: '出金占比', width: '100px', mono: true },
        { key: 'auditStatus', label: '审核状态', width: '100px' },
        { key: 'triggerRule', label: '触发规则', width: '210px' },
        { key: 'agent', label: '归属代理', width: '90px', mono: true }
      ],
      rows: bigWithdrawRows
    }
  }
})

const reminderActive = computed(() => reminderConfigs.value[reminderActiveKey.value] || null)
const reminderDialogTitle = computed(() => (reminderActive.value ? `${reminderActive.value.label}明细` : '明细'))
const reminderTotal = computed(() => reminderActive.value?.total || 0)
const reminderCaliber = computed(() => reminderActive.value?.caliber || '')
const reminderColumns = computed(() => reminderActive.value?.columns || [])
const reminderAllRows = computed(() => reminderActive.value?.rows || [])

const reminderFilteredRows = computed(() => {
  const kw = String(reminderSearch.value.keyword || '').trim().toLowerCase()
  const mt = String(reminderSearch.value.mt || '').trim()
  return reminderAllRows.value.filter((r) => {
    const okKw = !kw || String(r.customerName || '').toLowerCase().includes(kw) || String(r.customerEmail || '').toLowerCase().includes(kw)
    const okMt = !mt || String(r.mtAccount || '').includes(mt)
    return okKw && okMt
  })
})

const reminderFilteredTotal = computed(() => reminderFilteredRows.value.length)
const reminderTotalPages = computed(() => Math.max(1, Math.ceil(reminderFilteredTotal.value / reminderPageSize)))
const reminderPageRows = computed(() => {
  const start = (reminderPage.value - 1) * reminderPageSize
  return reminderFilteredRows.value.slice(start, start + reminderPageSize)
})

watch(
  () => reminderFilteredTotal.value,
  () => {
    if (reminderPage.value > reminderTotalPages.value) reminderPage.value = reminderTotalPages.value
    if (reminderPage.value < 1) reminderPage.value = 1
  }
)

const applyReminderSearch = () => {
  reminderSearch.value = {
    keyword: reminderKeywordInput.value,
    mt: reminderMtInput.value
  }
  reminderPage.value = 1
}

const resetReminderSearch = () => {
  reminderKeywordInput.value = ''
  reminderMtInput.value = ''
  reminderSearch.value = { keyword: '', mt: '' }
  reminderPage.value = 1
}

const openReminder = (it) => {
  reminderActiveKey.value = String(it?.key || '')
  resetReminderSearch()
  reminderDialogVisible.value = true
}

const viewReminderClient = (row) => {
  const id = String(row?.clientId || '').trim()
  if (!id) {
    window.alert('客户详情为演示数据')
    return
  }
  router.push(`/crm/client-detail?id=${id}`)
}

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

function formatInt(n) {
  const v = Number(n || 0)
  return v.toLocaleString('en-US')
}

function formatMoney(n) {
  const v = Number(n || 0)
  return v.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

function formatLots(n) {
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
