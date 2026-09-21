<template>
  <div class="w-full min-w-0">
    <div class="flex flex-col gap-4 min-w-0">
      <div class="bg-white border border-gray-100 rounded-lg shadow-sm p-4 sm:p-5">
        <div class="flex flex-col lg:flex-row lg:items-center gap-3 lg:gap-4">
          <div class="flex items-center gap-2 flex-wrap">
            <div class="text-sm font-bold text-gray-800">新版首页</div>
            <span class="text-xs text-gray-400">外汇 CRM 经营驾驶舱</span>
          </div>

          <div class="flex-1"></div>

          <div class="flex flex-col sm:flex-row sm:items-center gap-3">
            <div class="flex items-center gap-2">
              <span class="text-xs text-gray-500">统计时间</span>
              <div class="flex bg-gray-100/60 p-1 rounded-lg border border-gray-200/60">
                <button
                  v-for="t in timeTabs"
                  :key="t.key"
                  type="button"
                  class="px-3 py-1 rounded-md text-xs font-medium transition-all"
                  :class="timeKey === t.key ? 'bg-white text-gray-800 shadow-sm border border-gray-200/60' : 'text-gray-500 hover:text-gray-700'"
                  @click="setTimeKey(t.key)"
                >
                  {{ t.label }}
                </button>
              </div>
            </div>

            <div v-if="timeKey === 'custom'" class="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div class="flex items-center gap-2">
                <div class="text-gray-500 w-[52px] shrink-0 text-right">开始：</div>
                <input v-model="customStart" class="border border-gray-300 rounded px-3 py-2 outline-none flex-1 bg-white text-center font-mono" placeholder="YYYY-MM-DD" type="text" @blur="syncCustomData" />
              </div>
              <div class="flex items-center gap-2">
                <div class="text-gray-500 w-[52px] shrink-0 text-right">结束：</div>
                <input v-model="customEnd" class="border border-gray-300 rounded px-3 py-2 outline-none flex-1 bg-white text-center font-mono" placeholder="YYYY-MM-DD" type="text" @blur="syncCustomData" />
              </div>
            </div>

            <div class="flex items-center gap-2 text-xs">
              <span class="text-gray-500">统计币种</span>
              <span class="px-2 py-1 rounded bg-gray-50 border border-gray-200 text-gray-700 font-mono">USD</span>
            </div>

            <div class="flex items-center gap-2 text-xs">
              <span class="text-gray-500">数据更新时间</span>
              <span class="text-gray-700 font-mono">{{ lastUpdated }}</span>
            </div>

            <button class="h-9 px-4 rounded bg-[#C19B5E] hover:opacity-90 text-white text-xs font-bold transition-opacity" type="button" @click="refreshData">
              刷新
            </button>
          </div>
        </div>

        <div v-if="dataDelayVisible" class="mt-4 rounded-lg border border-orange-200 bg-orange-50 px-4 py-3 text-xs text-orange-700 flex items-start gap-2">
          <i class="fa-solid fa-triangle-exclamation mt-0.5"></i>
          <div class="leading-5">
            <div>部分交易数据存在延迟，最后同步时间：{{ delaySyncAt }}</div>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        <div v-for="m in kpiCards" :key="m.key" class="bg-white border border-gray-100 rounded-lg shadow-sm p-4">
          <div class="flex items-start justify-between gap-3">
            <div class="min-w-0">
              <div class="flex items-center gap-2">
                <div class="text-[11px] text-gray-500 font-medium truncate">{{ m.label }}</div>
                <span class="text-gray-300 cursor-help" :title="m.tips">
                  <i class="fa-regular fa-circle-question text-[12px]"></i>
                </span>
              </div>
              <div class="mt-1 text-lg font-bold text-gray-900 font-mono">{{ m.valueText }}</div>
            </div>
            <div class="flex flex-col items-end gap-1 shrink-0">
              <div class="text-[11px] font-medium" :class="m.deltaClass">
                <i :class="['fa-solid mr-1 text-[10px]', m.deltaIcon]"></i>{{ m.deltaText }}
              </div>
              <div class="text-[10px] text-gray-400">{{ m.compareText }}</div>
            </div>
          </div>

          <div class="mt-3 flex items-center justify-between gap-3">
            <div class="text-[10px] text-gray-400 truncate">来源：{{ m.source }}</div>
            <div class="text-[10px] text-gray-400 font-mono shrink-0">{{ m.updatedAt }}</div>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-1 xl:grid-cols-2 gap-4">
        <div class="bg-white border border-gray-100 rounded-lg shadow-sm overflow-hidden">
          <div class="px-5 py-4 border-b border-gray-100 flex items-center justify-between gap-3">
            <div class="min-w-0">
              <div class="text-sm font-bold text-gray-800">资金概况</div>
              <div class="mt-1 text-[11px] text-gray-400">净入金口径：真实入金 - 真实出金（不含赠金、信用金、内部转账）</div>
            </div>
            <button class="text-xs text-gray-400 hover:text-gray-600 shrink-0" type="button" @click="demoViewMore('资金概况')">查看更多 ></button>
          </div>

          <div class="p-5">
            <div class="flex items-center justify-between gap-3 flex-wrap">
              <div class="flex bg-gray-100/60 p-1 rounded-lg border border-gray-200/60">
                <button
                  v-for="t in fundTrendTabs"
                  :key="t.key"
                  type="button"
                  class="px-3 py-1 rounded-md text-xs font-medium transition-all"
                  :class="fundTrendKey === t.key ? 'bg-white text-gray-800 shadow-sm border border-gray-200/60' : 'text-gray-500 hover:text-gray-700'"
                  @click="fundTrendKey = t.key"
                >
                  {{ t.label }}
                </button>
              </div>

              <div class="flex items-center gap-3 text-xs">
                <span class="inline-flex items-center gap-1 text-gray-500">
                  <span class="w-2.5 h-0.5 rounded bg-emerald-500"></span>入金
                </span>
                <span class="inline-flex items-center gap-1 text-gray-500">
                  <span class="w-2.5 h-0.5 rounded bg-rose-500"></span>出金
                </span>
                <span class="inline-flex items-center gap-1 text-gray-500">
                  <span class="w-2.5 h-0.5 rounded bg-[#C19B5E]"></span>净入金
                </span>
              </div>
            </div>

            <div class="mt-4 h-[170px] w-full">
              <svg class="w-full h-full" viewBox="0 0 600 170" preserveAspectRatio="none">
                <polyline :points="fundDepositPoints" fill="none" stroke="#10B981" stroke-width="2" />
                <polyline :points="fundWithdrawPoints" fill="none" stroke="#F43F5E" stroke-width="2" />
                <polyline :points="fundNetPoints" fill="none" stroke="#C19B5E" stroke-width="2" />
              </svg>
            </div>

            <div class="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div class="rounded-lg border border-gray-100 bg-gray-50/60 px-3 py-2.5">
                <div class="text-[11px] text-gray-500">入金成功率</div>
                <div class="mt-1 font-mono font-bold text-gray-900">{{ moneySummary.depositSuccessRate }}</div>
              </div>
              <div class="rounded-lg border border-gray-100 bg-gray-50/60 px-3 py-2.5">
                <div class="text-[11px] text-gray-500">出金成功率</div>
                <div class="mt-1 font-mono font-bold text-gray-900">{{ moneySummary.withdrawSuccessRate }}</div>
              </div>
              <div class="rounded-lg border border-gray-100 bg-gray-50/60 px-3 py-2.5">
                <div class="text-[11px] text-gray-500">平均入金到账</div>
                <div class="mt-1 font-mono font-bold text-gray-900">{{ moneySummary.avgDepositMins }}</div>
              </div>
              <div class="rounded-lg border border-gray-100 bg-gray-50/60 px-3 py-2.5">
                <div class="text-[11px] text-gray-500">平均出金处理</div>
                <div class="mt-1 font-mono font-bold text-gray-900">{{ moneySummary.avgWithdrawMins }}</div>
              </div>
            </div>

            <div class="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div class="rounded-lg border border-gray-100 bg-gray-50/60 px-3 py-2.5 flex items-center justify-between gap-3">
                <div>
                  <div class="text-[11px] text-gray-500">待审核入金</div>
                  <div class="mt-1 font-mono font-bold text-gray-900">{{ moneySummary.pendingDepositCount }} 笔</div>
                </div>
                <div class="text-right">
                  <div class="text-[11px] text-gray-500">金额</div>
                  <div class="mt-1 font-mono font-bold text-gray-900">$ {{ moneySummary.pendingDepositAmount }}</div>
                </div>
              </div>
              <div class="rounded-lg border border-gray-100 bg-gray-50/60 px-3 py-2.5 flex items-center justify-between gap-3">
                <div>
                  <div class="text-[11px] text-gray-500">待审核出金</div>
                  <div class="mt-1 font-mono font-bold text-gray-900">{{ moneySummary.pendingWithdrawCount }} 笔</div>
                </div>
                <div class="text-right">
                  <div class="text-[11px] text-gray-500">金额</div>
                  <div class="mt-1 font-mono font-bold text-gray-900">$ {{ moneySummary.pendingWithdrawAmount }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="bg-white border border-gray-100 rounded-lg shadow-sm overflow-hidden">
          <div class="px-5 py-4 border-b border-gray-100 flex items-center justify-between gap-3">
            <div class="text-sm font-bold text-gray-800">支付通道状态</div>
            <button class="text-xs text-gray-400 hover:text-gray-600" type="button" @click="demoViewMore('支付通道')">查看更多 ></button>
          </div>
          <div class="p-5">
            <div class="overflow-x-auto">
              <table class="w-full text-xs min-w-[640px]">
                <thead class="bg-gray-50 text-gray-600 border border-gray-100">
                  <tr>
                    <th class="text-left font-medium px-3 py-2">通道名称</th>
                    <th class="text-right font-medium px-3 py-2">请求笔数</th>
                    <th class="text-right font-medium px-3 py-2">成功率</th>
                    <th class="text-right font-medium px-3 py-2">平均到账</th>
                    <th class="text-right font-medium px-3 py-2">失败金额</th>
                    <th class="text-left font-medium px-3 py-2">状态</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-gray-50 border border-gray-100 border-t-0 text-gray-700">
                  <tr v-for="c in paymentChannels" :key="c.name" class="hover:bg-gray-50/60 transition-colors">
                    <td class="px-3 py-2">{{ c.name }}</td>
                    <td class="px-3 py-2 text-right font-mono">{{ c.req }}</td>
                    <td class="px-3 py-2 text-right font-mono">{{ c.sr }}</td>
                    <td class="px-3 py-2 text-right font-mono">{{ c.avg }}</td>
                    <td class="px-3 py-2 text-right font-mono">$ {{ c.failAmt }}</td>
                    <td class="px-3 py-2">
                      <span class="inline-flex items-center gap-1 px-2 py-1 rounded border text-[11px]" :class="channelStatusClass(c.status)">
                        <span class="w-1.5 h-1.5 rounded-full" :class="channelDotClass(c.status)"></span>
                        {{ c.status }}
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <div class="bg-white border border-gray-100 rounded-lg shadow-sm overflow-hidden">
        <div class="px-5 py-4 border-b border-gray-100 flex items-center justify-between gap-3">
          <div class="text-sm font-bold text-gray-800">风险预警</div>
          <button class="text-xs text-gray-400 hover:text-gray-600" type="button" @click="demoViewMore('风险预警')">查看更多 ></button>
        </div>
        <div class="p-5">
          <div class="overflow-x-auto">
            <table class="w-full text-xs min-w-[980px]">
              <thead class="bg-gray-50 text-gray-600 border border-gray-100">
                <tr>
                  <th class="text-left font-medium px-3 py-2">风险分类</th>
                  <th class="text-left font-medium px-3 py-2">风险等级</th>
                  <th class="text-right font-medium px-3 py-2">预警数量</th>
                  <th class="text-right font-medium px-3 py-2">未处理</th>
                  <th class="text-right font-medium px-3 py-2">涉及金额/敞口</th>
                  <th class="text-left font-medium px-3 py-2">操作</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-50 border border-gray-100 border-t-0 text-gray-700">
                <tr v-for="r in riskRows" :key="r.key" class="hover:bg-gray-50/60 transition-colors">
                  <td class="px-3 py-2">{{ r.label }}</td>
                  <td class="px-3 py-2">
                    <span class="inline-flex items-center gap-1 px-2 py-1 rounded border text-[11px]" :class="riskLevelClass(r.level)">
                      <span class="w-1.5 h-1.5 rounded-full" :class="riskDotClass(r.level)"></span>
                      {{ r.level }}
                    </span>
                  </td>
                  <td class="px-3 py-2 text-right font-mono">{{ r.total }}</td>
                  <td class="px-3 py-2 text-right font-mono">{{ r.pending }}</td>
                  <td class="px-3 py-2 text-right font-mono">{{ r.exposureText }}</td>
                  <td class="px-3 py-2">
                    <button class="px-3 py-1.5 rounded border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors" type="button" @click="demoViewMore(r.label)">
                      查看明细
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div class="bg-white border border-gray-100 rounded-lg shadow-sm overflow-hidden">
        <div class="px-5 py-4 border-b border-gray-100 flex items-center justify-between gap-3">
          <div class="text-sm font-bold text-gray-800">运营待办</div>
          <button class="text-xs text-gray-400 hover:text-gray-600" type="button" @click="demoViewMore('运营待办')">查看更多 ></button>
        </div>
        <div class="p-5 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 text-xs">
          <button
            v-for="t in todoCards"
            :key="t.key"
            type="button"
            class="rounded-lg border border-gray-100 bg-gray-50/60 px-4 py-3 text-left hover:bg-gray-50 transition-colors"
            @click="demoClickTodo(t.label)"
          >
            <div class="flex items-center justify-between gap-2">
              <div class="text-[11px] text-gray-500">{{ t.label }}</div>
              <span class="inline-flex items-center justify-center w-2 h-2 rounded-full" :class="todoDotClass(t.status)"></span>
            </div>
            <div class="mt-1 font-mono font-bold text-lg text-gray-900">{{ t.value }}</div>
            <div class="mt-1 text-[11px] font-medium" :class="todoStatusTextClass(t.status)">{{ t.statusText }}</div>
          </button>
        </div>
      </div>

      <div class="grid grid-cols-1 xl:grid-cols-2 gap-4">
        <div class="bg-white border border-gray-100 rounded-lg shadow-sm overflow-hidden">
          <div class="px-5 py-4 border-b border-gray-100 flex items-center justify-between gap-3">
            <div class="text-sm font-bold text-gray-800">交易趋势</div>
            <button class="text-xs text-gray-400 hover:text-gray-600" type="button" @click="demoViewMore('交易趋势')">查看更多 ></button>
          </div>
          <div class="p-5">
            <div class="flex bg-gray-100/60 p-1 rounded-lg border border-gray-200/60 w-fit">
              <button
                v-for="t in tradeTrendTabs"
                :key="t.key"
                type="button"
                class="px-3 py-1 rounded-md text-xs font-medium transition-all"
                :class="tradeTrendKey === t.key ? 'bg-white text-gray-800 shadow-sm border border-gray-200/60' : 'text-gray-500 hover:text-gray-700'"
                @click="tradeTrendKey = t.key"
              >
                {{ t.label }}
              </button>
            </div>

            <div class="mt-4 h-[170px] w-full">
              <svg class="w-full h-full" viewBox="0 0 600 170" preserveAspectRatio="none">
                <polyline :points="tradeTrendPoints" fill="none" stroke="#C19B5E" stroke-width="2" />
                <polyline :points="tradeTrendArea" fill="rgba(193,155,94,0.12)" stroke="none" />
              </svg>
            </div>

            <div class="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div v-for="s in tradeSummary" :key="s.key" class="rounded-lg border border-gray-100 bg-gray-50/60 px-3 py-2.5">
                <div class="text-[11px] text-gray-500">{{ s.label }}</div>
                <div class="mt-1 font-mono font-bold text-gray-900">{{ s.value }}</div>
              </div>
            </div>
          </div>
        </div>

        <div class="bg-white border border-gray-100 rounded-lg shadow-sm overflow-hidden">
          <div class="px-5 py-4 border-b border-gray-100 flex items-center justify-between gap-3">
            <div class="text-sm font-bold text-gray-800">风险敞口</div>
            <button class="text-xs text-gray-400 hover:text-gray-600" type="button" @click="demoViewMore('风险敞口')">查看更多 ></button>
          </div>
          <div class="p-5">
            <div class="flex items-center gap-2 text-[11px] text-gray-500">
              <span class="px-2 py-1 rounded border border-amber-200 bg-amber-50 text-amber-700">演示数据</span>
              <span>当前系统如无真实 A/B Book 数据，默认使用演示口径</span>
            </div>

            <div class="mt-3 grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
              <div v-for="e in exposureCards" :key="e.key" class="rounded-lg border border-gray-100 bg-gray-50/60 px-3 py-2.5">
                <div class="text-[11px] text-gray-500">{{ e.label }}</div>
                <div class="mt-1 font-mono font-bold text-gray-900">{{ e.value }}</div>
              </div>
            </div>

            <div class="mt-4 pt-4 border-t border-gray-100">
              <div class="text-[11px] font-medium text-gray-700">产品风险（Top 5）</div>
              <div class="mt-2 overflow-x-auto">
                <table class="w-full text-xs min-w-[720px]">
                  <thead class="bg-gray-50 text-gray-600 border border-gray-100">
                    <tr>
                      <th class="text-left font-medium px-3 py-2">产品</th>
                      <th class="text-right font-medium px-3 py-2">买入持仓</th>
                      <th class="text-right font-medium px-3 py-2">卖出持仓</th>
                      <th class="text-right font-medium px-3 py-2">净持仓</th>
                      <th class="text-right font-medium px-3 py-2">浮动盈亏</th>
                      <th class="text-left font-medium px-3 py-2">风险等级</th>
                    </tr>
                  </thead>
                  <tbody class="divide-y divide-gray-50 border border-gray-100 border-t-0 text-gray-700">
                    <tr v-for="p in productRiskRows" :key="p.product" class="hover:bg-gray-50/60 transition-colors">
                      <td class="px-3 py-2">{{ p.product }}</td>
                      <td class="px-3 py-2 text-right font-mono">{{ p.buy }}</td>
                      <td class="px-3 py-2 text-right font-mono">{{ p.sell }}</td>
                      <td class="px-3 py-2 text-right font-mono">{{ p.net }}</td>
                      <td class="px-3 py-2 text-right font-mono" :class="p.pnlClass">{{ p.pnl }}</td>
                      <td class="px-3 py-2">
                        <span class="inline-flex items-center gap-1 px-2 py-1 rounded border text-[11px]" :class="riskLevelClass(p.level)">
                          <span class="w-1.5 h-1.5 rounded-full" :class="riskDotClass(p.level)"></span>
                          {{ p.level }}
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="bg-white border border-gray-100 rounded-lg shadow-sm overflow-hidden">
        <div class="px-5 py-4 border-b border-gray-100 flex items-center justify-between gap-3">
          <div class="text-sm font-bold text-gray-800">重点客户排名</div>
          <button class="text-xs text-gray-400 hover:text-gray-600" type="button" @click="demoViewMore('重点客户')">查看更多 ></button>
        </div>
        <div class="p-5">
          <div class="flex bg-gray-100/60 p-1 rounded-lg border border-gray-200/60 w-fit">
            <button
              v-for="t in keyCustomerTabs"
              :key="t.key"
              type="button"
              class="px-3 py-1 rounded-md text-xs font-medium transition-all"
              :class="keyCustomerKey === t.key ? 'bg-white text-gray-800 shadow-sm border border-gray-200/60' : 'text-gray-500 hover:text-gray-700'"
              @click="keyCustomerKey = t.key"
            >
              {{ t.label }}
            </button>
          </div>

          <div class="mt-4 overflow-x-auto">
            <table class="w-full text-xs min-w-[980px]">
              <thead class="bg-gray-50 text-gray-600 border border-gray-100">
                <tr>
                  <th class="text-left font-medium px-3 py-2">客户名称</th>
                  <th class="text-left font-medium px-3 py-2">MT交易账号</th>
                  <th class="text-left font-medium px-3 py-2">MT类型</th>
                  <th class="text-left font-medium px-3 py-2">主要交易产品</th>
                  <th class="text-right font-medium px-3 py-2">净入金</th>
                  <th class="text-right font-medium px-3 py-2">交易量</th>
                  <th class="text-right font-medium px-3 py-2">浮动盈亏</th>
                  <th class="text-left font-medium px-3 py-2">风险状态</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-50 border border-gray-100 border-t-0 text-gray-700">
                <tr v-for="c in keyCustomerRows" :key="c.mt" class="hover:bg-gray-50/60 transition-colors">
                  <td class="px-3 py-2">{{ c.name }}</td>
                  <td class="px-3 py-2 font-mono">{{ c.mt }}</td>
                  <td class="px-3 py-2">{{ c.mtType }}</td>
                  <td class="px-3 py-2">{{ c.product }}</td>
                  <td class="px-3 py-2 text-right font-mono">$ {{ c.netDeposit }}</td>
                  <td class="px-3 py-2 text-right font-mono">{{ c.lots }} Lot</td>
                  <td class="px-3 py-2 text-right font-mono" :class="c.pnlClass">$ {{ c.pnl }}</td>
                  <td class="px-3 py-2">
                    <span class="inline-flex items-center gap-1 px-2 py-1 rounded border text-[11px]" :class="riskLevelClass(c.riskLevel)">
                      <span class="w-1.5 h-1.5 rounded-full" :class="riskDotClass(c.riskLevel)"></span>
                      {{ c.riskLevel }}
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-1 xl:grid-cols-3 gap-4">
        <div class="xl:col-span-2 bg-white border border-gray-100 rounded-lg shadow-sm overflow-hidden">
          <div class="px-5 py-4 border-b border-gray-100 flex items-center justify-between gap-3">
            <div class="text-sm font-bold text-gray-800">客户转化</div>
            <button class="text-xs text-gray-400 hover:text-gray-600" type="button" @click="demoViewMore('客户转化')">查看更多 ></button>
          </div>
          <div class="p-5 grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div class="space-y-3">
              <div v-for="(s, idx) in funnelSteps" :key="s.key" class="rounded-lg border border-gray-100 bg-gray-50/60 px-4 py-3 text-xs">
                <div class="flex items-center justify-between gap-3">
                  <div class="flex items-center gap-2 min-w-0">
                    <span class="w-6 h-6 rounded-full bg-white border border-gray-200 text-gray-600 flex items-center justify-center font-mono text-[11px] shrink-0">{{ idx + 1 }}</span>
                    <div class="font-medium text-gray-800 truncate">{{ s.label }}</div>
                  </div>
                  <div class="text-right">
                    <div class="font-mono font-bold text-gray-900">{{ s.count }}</div>
                    <div class="text-[11px] text-gray-500">转化率 {{ s.rate }}</div>
                  </div>
                </div>
                <div class="mt-2 flex items-center justify-between gap-3 text-[11px] text-gray-500">
                  <span>流失人数</span>
                  <span class="font-mono font-medium text-gray-700">{{ s.drop }}</span>
                </div>
              </div>
            </div>

            <div class="rounded-lg border border-gray-100 bg-gray-50/60 p-4 text-xs">
              <div class="text-[11px] font-medium text-gray-700">客户状态摘要</div>
              <div class="mt-3 space-y-2">
                <div v-for="s in customerStatusSummary" :key="s.key" class="flex items-center justify-between gap-3">
                  <span class="text-gray-600">{{ s.label }}</span>
                  <span class="font-mono font-bold text-gray-900">{{ s.value }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="bg-white border border-gray-100 rounded-lg shadow-sm overflow-hidden">
          <div class="px-5 py-4 border-b border-gray-100 flex items-center justify-between gap-3">
            <div class="text-sm font-bold text-gray-800">地区分析</div>
            <button class="text-xs text-gray-400 hover:text-gray-600" type="button" @click="demoViewMore('地区分析')">查看更多 ></button>
          </div>
          <div class="p-5">
            <div class="overflow-x-auto">
              <table class="w-full text-xs min-w-[720px]">
                <thead class="bg-gray-50 text-gray-600 border border-gray-100">
                  <tr>
                    <th class="text-left font-medium px-3 py-2">地区</th>
                    <th class="text-right font-medium px-3 py-2">新增客户</th>
                    <th class="text-right font-medium px-3 py-2">首入客户</th>
                    <th class="text-right font-medium px-3 py-2">净入金</th>
                    <th class="text-right font-medium px-3 py-2">交易量</th>
                    <th class="text-right font-medium px-3 py-2">地址不一致</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-gray-50 border border-gray-100 border-t-0 text-gray-700">
                  <tr v-for="r in regionRows" :key="r.region" class="hover:bg-gray-50/60 transition-colors">
                    <td class="px-3 py-2">{{ r.region }}</td>
                    <td class="px-3 py-2 text-right font-mono">{{ r.new }}</td>
                    <td class="px-3 py-2 text-right font-mono">{{ r.first }}</td>
                    <td class="px-3 py-2 text-right font-mono">$ {{ r.netDeposit }}</td>
                    <td class="px-3 py-2 text-right font-mono">{{ r.lots }}</td>
                    <td class="px-3 py-2 text-right font-mono">{{ r.mismatch }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <div class="bg-white border border-gray-100 rounded-lg shadow-sm overflow-hidden">
        <div class="px-5 py-4 border-b border-gray-100 flex items-center justify-between gap-3">
          <div class="text-sm font-bold text-gray-800">渠道贡献</div>
          <button class="text-xs text-gray-400 hover:text-gray-600" type="button" @click="demoViewMore('渠道贡献')">查看更多 ></button>
        </div>
        <div class="p-5">
          <div class="flex bg-gray-100/60 p-1 rounded-lg border border-gray-200/60 w-fit">
            <button
              v-for="t in channelTabs"
              :key="t.key"
              type="button"
              class="px-3 py-1 rounded-md text-xs font-medium transition-all"
              :class="channelKey === t.key ? 'bg-white text-gray-800 shadow-sm border border-gray-200/60' : 'text-gray-500 hover:text-gray-700'"
              @click="channelKey = t.key"
            >
              {{ t.label }}
            </button>
          </div>

          <div class="mt-4 overflow-x-auto">
            <table class="w-full text-xs min-w-[980px]">
              <thead class="bg-gray-50 text-gray-600 border border-gray-100">
                <tr>
                  <th class="text-left font-medium px-3 py-2">名称</th>
                  <th class="text-right font-medium px-3 py-2">注册人数</th>
                  <th class="text-right font-medium px-3 py-2">首入人数</th>
                  <th class="text-right font-medium px-3 py-2">净入金</th>
                  <th class="text-right font-medium px-3 py-2">交易量</th>
                  <th class="text-right font-medium px-3 py-2">预估平台收入</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-50 border border-gray-100 border-t-0 text-gray-700">
                <tr v-for="c in channelRows" :key="c.name" class="hover:bg-gray-50/60 transition-colors">
                  <td class="px-3 py-2">{{ c.name }}</td>
                  <td class="px-3 py-2 text-right font-mono">{{ c.reg }}</td>
                  <td class="px-3 py-2 text-right font-mono">{{ c.first }}</td>
                  <td class="px-3 py-2 text-right font-mono">$ {{ c.netDeposit }}</td>
                  <td class="px-3 py-2 text-right font-mono">{{ c.lots }}</td>
                  <td class="px-3 py-2 text-right font-mono">$ {{ c.income }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-1 xl:grid-cols-2 gap-4">
        <div class="bg-white border border-gray-100 rounded-lg shadow-sm overflow-hidden">
          <div class="px-5 py-4 border-b border-gray-100 flex items-center justify-between gap-3">
            <div class="text-sm font-bold text-gray-800">活动摘要</div>
            <button class="text-xs text-gray-400 hover:text-gray-600" type="button" @click="demoViewMore('活动摘要')">查看更多 ></button>
          </div>
          <div class="p-5">
            <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div v-for="a in activitySummaryCards" :key="a.key" class="rounded-lg border border-gray-100 bg-gray-50/60 px-3 py-2.5">
                <div class="text-[11px] text-gray-500">{{ a.label }}</div>
                <div class="mt-1 font-mono font-bold text-gray-900">{{ a.value }}</div>
              </div>
            </div>
          </div>
        </div>

        <div class="bg-white border border-gray-100 rounded-lg shadow-sm overflow-hidden">
          <div class="px-5 py-4 border-b border-gray-100 flex items-center justify-between gap-3">
            <div class="text-sm font-bold text-gray-800">佣金与奖励</div>
            <button class="text-xs text-gray-400 hover:text-gray-600" type="button" @click="demoViewMore('佣金与奖励')">查看更多 ></button>
          </div>
          <div class="p-5">
            <div class="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
              <div v-for="c in commissionSummaryCards" :key="c.key" class="rounded-lg border border-gray-100 bg-gray-50/60 px-3 py-2.5">
                <div class="text-[11px] text-gray-500">{{ c.label }}</div>
                <div class="mt-1 font-mono font-bold text-gray-900">{{ c.value }}</div>
              </div>
            </div>

            <div class="mt-4 flex bg-gray-100/60 p-1 rounded-lg border border-gray-200/60 w-fit">
              <button
                v-for="t in commissionTabs"
                :key="t.key"
                type="button"
                class="px-3 py-1 rounded-md text-xs font-medium transition-all"
                :class="commissionKey === t.key ? 'bg-white text-gray-800 shadow-sm border border-gray-200/60' : 'text-gray-500 hover:text-gray-700'"
                @click="commissionKey = t.key"
              >
                {{ t.label }}
              </button>
            </div>

            <div class="mt-3 overflow-x-auto">
              <table class="w-full text-xs min-w-[720px]">
                <thead class="bg-gray-50 text-gray-600 border border-gray-100">
                  <tr>
                    <th class="text-left font-medium px-3 py-2">排名</th>
                    <th class="text-left font-medium px-3 py-2">名称</th>
                    <th class="text-right font-medium px-3 py-2">金额</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-gray-50 border border-gray-100 border-t-0 text-gray-700">
                  <tr v-for="(r, idx) in commissionTopRows" :key="r.name" class="hover:bg-gray-50/60 transition-colors">
                    <td class="px-3 py-2 font-mono">{{ idx + 1 }}</td>
                    <td class="px-3 py-2">{{ r.name }}</td>
                    <td class="px-3 py-2 text-right font-mono">$ {{ r.amount }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-1 xl:grid-cols-2 gap-4">
        <div class="bg-white border border-gray-100 rounded-lg shadow-sm overflow-hidden">
          <div class="px-5 py-4 border-b border-gray-100 flex items-center justify-between gap-3">
            <div class="text-sm font-bold text-gray-800">系统状态</div>
            <button class="text-xs text-gray-400 hover:text-gray-600" type="button" @click="demoViewMore('系统状态')">查看更多 ></button>
          </div>
          <div class="p-5 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div v-for="s in systemStatusCards" :key="s.key" class="rounded-lg border border-gray-100 bg-gray-50/60 px-4 py-3 flex items-center justify-between gap-3">
              <div class="min-w-0">
                <div class="text-[11px] text-gray-500">{{ s.label }}</div>
                <div class="mt-1 font-mono font-bold text-gray-900 truncate">{{ s.value }}</div>
              </div>
              <span class="inline-flex items-center gap-1 px-2 py-1 rounded border text-[11px]" :class="systemStatusClass(s.status)">
                <span class="w-1.5 h-1.5 rounded-full" :class="systemDotClass(s.status)"></span>
                {{ s.status }}
              </span>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div class="flex justify-between items-center mb-4">
            <p class="text-sm text-gray-500 font-medium">通知公告</p>
            <button class="text-xs text-gray-400 hover:text-gray-600" type="button" @click="demoViewMore('通知公告')">查看更多 ></button>
          </div>

          <button
            v-for="n in notices"
            :key="n.id"
            type="button"
            class="w-full flex justify-between items-center group cursor-pointer mt-2 py-2"
            @click="demoViewMore('公告：' + n.title)"
          >
            <div class="flex items-center gap-2 min-w-0">
              <span class="w-1.5 h-1.5 rounded-full" :class="n.level === '高' ? 'bg-red-500' : n.level === '中' ? 'bg-orange-400' : 'bg-gray-300'"></span>
              <p class="text-sm text-gray-700 group-hover:text-[#d1a84f] transition-colors truncate">{{ n.title }}</p>
              <span v-if="n.level === '高'" class="text-[10px] px-2 py-0.5 rounded bg-rose-50 text-rose-700 border border-rose-200 shrink-0">高</span>
              <span v-else-if="n.level === '中'" class="text-[10px] px-2 py-0.5 rounded bg-orange-50 text-orange-700 border border-orange-200 shrink-0">中</span>
            </div>
            <span class="text-xs text-gray-400 font-mono shrink-0">{{ n.date }}</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { ElMessage } from 'element-plus'

const timeTabs = [
  { key: 'today', label: '今日' },
  { key: 'week', label: '本周' },
  { key: 'month', label: '本月' },
  { key: 'lastMonth', label: '上月' },
  { key: 'custom', label: '自定义' }
]

const timeKey = ref('today')
const customStart = ref('2026-09-01')
const customEnd = ref('2026-09-13')

const nowText = () => {
  const d = new Date()
  const pad = (n) => String(n).padStart(2, '0')
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`
}

const lastUpdated = ref(nowText())
const delaySyncAt = ref(nowText())
const dataDelayVisible = ref(false)

const formatInt = (n) => Number(n || 0).toLocaleString('en-US')
const formatMoney = (n) => Number(n || 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
const formatPct = (n) => `${(Number(n || 0) * 100).toFixed(1)}%`

const pnlClass = (v) => {
  const n = Number(v || 0)
  if (n > 0) return 'text-emerald-600'
  if (n < 0) return 'text-rose-600'
  return 'text-gray-700'
}

const demoData = ref({
  today: {
    delay: true,
    kpis: {
      depositToday: { value: 128500.25, delta: 0.084, compare: '较昨日', source: '支付流水汇总' },
      withdrawToday: { value: 62450.1, delta: -0.031, compare: '较昨日', source: '出金订单汇总' },
      netToday: { value: 66050.15, delta: 0.112, compare: '较昨日', source: '真实入金-真实出金' },
      netMonth: { value: 820350.55, delta: 0.067, compare: '较上月', source: '资金汇总' },
      lotsToday: { value: 1865.25, delta: 0.042, compare: '较昨日', source: 'MT 成交汇总' },
      activeTradeAccounts: { value: 382, delta: 0.018, compare: '较昨日', source: '交易账户口径' },
      totalEquity: { value: 6185920.35, delta: -0.006, compare: '较昨日', source: 'MT 余额汇总' },
      netExposure: { value: 125.6, delta: 0.091, compare: '较昨日', source: '买入持仓-卖出持仓' },
      pendingWithdrawAmount: { value: 45820.0, delta: 0.153, compare: '较昨日', source: '待审核出金' },
      pendingRiskCount: { value: 26, delta: 0.08, compare: '较昨日', source: '未关闭预警' }
    },
    money: {
      depositSuccessRate: formatPct(0.962),
      withdrawSuccessRate: formatPct(0.941),
      avgDepositMins: '8.6 min',
      avgWithdrawMins: '42.3 min',
      pendingDepositCount: 18,
      pendingDepositAmount: formatMoney(32500),
      pendingWithdrawCount: 9,
      pendingWithdrawAmount: formatMoney(45820)
    },
    fundTrend: {
      deposit: [22, 30, 28, 36, 42, 38, 41, 44, 46, 52, 50, 58],
      withdraw: [18, 22, 21, 25, 28, 26, 27, 29, 33, 35, 32, 34],
      net: [4, 8, 7, 11, 14, 12, 14, 15, 13, 17, 18, 24]
    },
    paymentChannels: [
      { name: 'USDT-TRC20', req: 1260, sr: formatPct(0.982), avg: '6.1 min', failAmt: formatMoney(820.0), status: '正常' },
      { name: 'Bank Transfer', req: 320, sr: formatPct(0.945), avg: '22.5 min', failAmt: formatMoney(1250.0), status: '维护中' },
      { name: 'Credit Card', req: 860, sr: formatPct(0.958), avg: '2.8 min', failAmt: formatMoney(2460.0), status: '异常' }
    ],
    risks: [
      { key: 'bigWithdraw', label: '大额出金', level: '红色', total: 6, pending: 4, exposureText: '$ 120,500' },
      { key: 'abnormalProfit', label: '异常盈利', level: '橙色', total: 8, pending: 6, exposureText: '$ 85,200' },
      { key: 'lowMargin', label: '保证金水平过低', level: '红色', total: 3, pending: 3, exposureText: '$ 42,800' },
      { key: 'liquidation', label: '强平风险', level: '橙色', total: 5, pending: 3, exposureText: '$ 56,300' },
      { key: 'hugePosition', label: '超大持仓', level: '黄色', total: 7, pending: 5, exposureText: '净敞口 58.2' }
    ],
    todos: [
      { key: 'kyc', label: '待审核KYC', value: 12, status: 'normal' },
      { key: 'dep', label: '待审核入金', value: 18, status: 'warning' },
      { key: 'wd', label: '待审核出金', value: 9, status: 'danger' },
      { key: 'reward', label: '待发放活动奖励', value: 6, status: 'normal' },
      { key: 'rebate', label: '待结算返佣', value: 15, status: 'warning' },
      { key: 'rebateFail', label: '返佣结算失败', value: 2, status: 'danger' },
      { key: 'risk', label: '待处理风险预警', value: 26, status: 'danger' },
      { key: 'msg', label: '待回复留言', value: 8, status: 'normal' },
      { key: 'sys', label: '系统异常任务', value: 3, status: 'warning' }
    ],
    trade: {
      volume: [18, 22, 26, 24, 29, 33, 31, 35, 38, 40, 42, 46],
      accounts: [80, 92, 88, 96, 102, 110, 118, 112, 125, 132, 138, 145],
      closedPnl: [12, 9, 14, 6, 8, 15, 11, 10, 16, 14, 18, 20],
      floatingPnl: [6, 5, 8, 4, 3, 7, 6, 2, 9, 8, 10, 11]
    },
    tradeSummary: [
      { key: 'tradePeople', label: '交易人数', value: formatInt(268) },
      { key: 'avgLots', label: '平均每客交易量', value: '6.95 Lot' },
      { key: 'activeAcc', label: '活跃交易账户数', value: formatInt(382) },
      { key: 'profitLossRatio', label: '盈利/亏损占比', value: '41% / 59%' }
    ],
    exposure: [
      { key: 'aBookLots', label: 'A-Book 交易量', value: '820.50 Lot' },
      { key: 'bBookLots', label: 'B-Book 交易量', value: '1044.75 Lot' },
      { key: 'abRatio', label: 'A/B Book 占比', value: '44% / 56%' },
      { key: 'hedgeLots', label: '对冲交易量', value: '610.20 Lot' },
      { key: 'unHedgeExposure', label: '未对冲净敞口', value: '125.6' },
      { key: 'bBookPnl', label: 'B-Book 浮动盈亏', value: '$ -9,170.57' }
    ],
    productRisk: [
      { product: '外汇', buy: '125.6', sell: '98.2', net: '27.4', pnl: '$ 12,580.25', level: '黄色' },
      { product: '黄金', buy: '86.2', sell: '110.5', net: '-24.3', pnl: '$ -8,230.10', level: '橙色' },
      { product: '原油', buy: '40.5', sell: '22.1', net: '18.4', pnl: '$ 3,420.80', level: '黄色' },
      { product: '股指', buy: '62.8', sell: '75.0', net: '-12.2', pnl: '$ -2,120.55', level: '黄色' },
      { product: '比特币', buy: '18.6', sell: '35.2', net: '-16.6', pnl: '$ -5,820.30', level: '红色' }
    ],
    keyCustomers: {
      position: [
        { name: 'Luna', mt: '8100458', mtType: 'MT5', product: '黄金', netDeposit: formatMoney(68500), lots: formatMoney(312.5), pnl: formatMoney(-1230.55), riskLevel: '橙色' },
        { name: 'Noah', mt: '8100477', mtType: 'MT4', product: '外汇', netDeposit: formatMoney(52300), lots: formatMoney(268.35), pnl: formatMoney(520.35), riskLevel: '黄色' },
        { name: 'Mikey', mt: '8100520', mtType: 'MT5', product: '股指', netDeposit: formatMoney(41800.55), lots: formatMoney(215.9), pnl: formatMoney(8120.0), riskLevel: '黄色' },
        { name: 'Kris', mt: '8100601', mtType: 'MT4', product: '比特币', netDeposit: formatMoney(35600), lots: formatMoney(182.75), pnl: formatMoney(-9170.57), riskLevel: '红色' },
        { name: 'jack', mt: '8100702', mtType: 'MT5', product: '原油', netDeposit: formatMoney(22850), lots: formatMoney(120.6), pnl: formatMoney(3200.25), riskLevel: '黄色' }
      ],
      profit: [],
      loss: [],
      volume: [],
      netDeposit: []
    },
    funnel: [
      { key: 'register', label: '注册', count: formatInt(1520), rate: '100%', drop: formatInt(0) },
      { key: 'profile', label: '完成资料', count: formatInt(1180), rate: '77.6%', drop: formatInt(340) },
      { key: 'kyc', label: 'KYC通过', count: formatInt(860), rate: '72.9%', drop: formatInt(320) },
      { key: 'mt', label: '开立MT账户', count: formatInt(790), rate: '91.9%', drop: formatInt(70) },
      { key: 'firstDeposit', label: '首次入金', count: formatInt(420), rate: '53.2%', drop: formatInt(370) },
      { key: 'firstTrade', label: '首次交易', count: formatInt(268), rate: '63.8%', drop: formatInt(152) },
      { key: 'active', label: '持续活跃', count: formatInt(182), rate: '67.9%', drop: formatInt(86) }
    ],
    customerStatus: [
      { key: 'regNoProfile', label: '已注册未完成资料', value: formatInt(340) },
      { key: 'kycFail', label: 'KYC未通过', value: formatInt(120) },
      { key: 'mtNoDeposit', label: '已开户未入金', value: formatInt(370) },
      { key: 'depositNoTrade', label: '已入金未交易', value: formatInt(152) },
      { key: 'noTrade7', label: '7天未交易', value: formatInt(96) },
      { key: 'silent30', label: '30天沉默', value: formatInt(58) },
      { key: 'churnHigh', label: '高价值流失预警', value: formatInt(12) }
    ],
    regions: [
      { region: '越南', new: 86, first: 42, netDeposit: formatMoney(85200), lots: formatMoney(185.25), mismatch: 8 },
      { region: '中国', new: 62, first: 31, netDeposit: formatMoney(52300), lots: formatMoney(128.6), mismatch: 5 },
      { region: '中国香港', new: 38, first: 22, netDeposit: formatMoney(41800), lots: formatMoney(96.3), mismatch: 4 },
      { region: '韩国', new: 24, first: 15, netDeposit: formatMoney(22850), lots: formatMoney(72.2), mismatch: 3 },
      { region: '日本', new: 18, first: 10, netDeposit: formatMoney(17220), lots: formatMoney(58.8), mismatch: 2 }
    ],
    channel: {
      channel: [
        { name: 'Google Ads', reg: 320, first: 110, netDeposit: formatMoney(168500), lots: formatMoney(420.5), income: formatMoney(12680) },
        { name: 'SEO', reg: 260, first: 92, netDeposit: formatMoney(132800), lots: formatMoney(368.2), income: formatMoney(9820) },
        { name: 'Affiliate A', reg: 210, first: 86, netDeposit: formatMoney(98500), lots: formatMoney(312.8), income: formatMoney(8420) },
        { name: 'KOL', reg: 180, first: 64, netDeposit: formatMoney(76200), lots: formatMoney(220.3), income: formatMoney(6580) },
        { name: 'Referral', reg: 150, first: 52, netDeposit: formatMoney(53800), lots: formatMoney(168.4), income: formatMoney(5120) }
      ],
      sales: [
        { name: 'Sales-A', reg: 140, first: 48, netDeposit: formatMoney(63500), lots: formatMoney(182.5), income: formatMoney(4620) },
        { name: 'Sales-B', reg: 118, first: 36, netDeposit: formatMoney(52800), lots: formatMoney(160.3), income: formatMoney(3980) },
        { name: 'Sales-C', reg: 92, first: 28, netDeposit: formatMoney(41800), lots: formatMoney(132.2), income: formatMoney(3120) },
        { name: 'Sales-D', reg: 76, first: 22, netDeposit: formatMoney(35600), lots: formatMoney(110.6), income: formatMoney(2680) },
        { name: 'Sales-E', reg: 64, first: 18, netDeposit: formatMoney(28500), lots: formatMoney(92.4), income: formatMoney(2160) }
      ],
      agent: [
        { name: 'IB1020', reg: 260, first: 86, netDeposit: formatMoney(68500), lots: formatMoney(312.5), income: formatMoney(3680) },
        { name: 'IB1108', reg: 190, first: 57, netDeposit: formatMoney(52300), lots: formatMoney(268.35), income: formatMoney(2410) },
        { name: 'IB1217', reg: 165, first: 49, netDeposit: formatMoney(41800.55), lots: formatMoney(215.9), income: formatMoney(1980) },
        { name: 'IB1350', reg: 132, first: 38, netDeposit: formatMoney(35600), lots: formatMoney(182.75), income: formatMoney(1520) },
        { name: 'IB1406', reg: 98, first: 26, netDeposit: formatMoney(22850), lots: formatMoney(120.6), income: formatMoney(980) }
      ]
    },
    activitySummary: [
      { key: 'ongoing', label: '进行中活动数', value: formatInt(4) },
      { key: 'join', label: '参与人数', value: formatInt(126) },
      { key: 'achieved', label: '达标人数', value: formatInt(43) },
      { key: 'reward', label: '已发奖励', value: '$ ' + formatMoney(58200) },
      { key: 'net', label: '活动净入金', value: '$ ' + formatMoney(126000.5) },
      { key: 'lots', label: '活动交易量', value: formatMoney(680.25) + ' Lot' },
      { key: 'abnormal', label: '异常参与人数', value: formatInt(6) },
      { key: 'ending', label: '即将结束活动数', value: formatInt(1) }
    ],
    commissionSummary: [
      { key: 'pending', label: '待结算返佣', value: '$ ' + formatMoney(12580.5) },
      { key: 'settled', label: '已结算返佣', value: '$ ' + formatMoney(18650.2) },
      { key: 'fail', label: '结算失败金额', value: '$ ' + formatMoney(980.3) },
      { key: 'salesReward', label: '销售交易奖励', value: '$ ' + formatMoney(3620.4) },
      { key: 'netReward', label: '净入金奖励', value: '$ ' + formatMoney(2410.2) },
      { key: 'activityReward', label: '活动奖励', value: '$ ' + formatMoney(5820.0) }
    ],
    commissionTop: {
      sales: [
        { name: 'Sales-A', amount: formatMoney(1280.5) },
        { name: 'Sales-B', amount: formatMoney(980.2) },
        { name: 'Sales-C', amount: formatMoney(820.4) },
        { name: 'Sales-D', amount: formatMoney(720.1) },
        { name: 'Sales-E', amount: formatMoney(650.0) }
      ],
      agent: [
        { name: 'IB1020', amount: formatMoney(1680.5) },
        { name: 'IB1108', amount: formatMoney(1240.2) },
        { name: 'IB1217', amount: formatMoney(980.0) },
        { name: 'IB1350', amount: formatMoney(820.65) },
        { name: 'IB1406', amount: formatMoney(680.3) }
      ],
      activity: [
        { name: '星际起航免费开卡', amount: formatMoney(2680.0) },
        { name: '先锋一号体验金', amount: formatMoney(1820.0) },
        { name: '成长计划', amount: formatMoney(920.0) },
        { name: 'IB计划', amount: formatMoney(680.0) },
        { name: '注册赠金', amount: formatMoney(520.0) }
      ]
    },
    system: [
      { key: 'mtSync', label: 'MT4/MT5 数据同步', value: '最近 2 分钟', status: '正常' },
      { key: 'pay', label: '支付通道', value: '部分维护中', status: '维护中' },
      { key: 'commission', label: '返佣结算任务', value: '今日已执行 6 次', status: '正常' },
      { key: 'activity', label: '活动计算任务', value: '最近 10 分钟', status: '正常' },
      { key: 'report', label: '报表数据更新时间', value: lastUpdated.value, status: '正常' },
      { key: 'fail', label: '失败任务数量', value: '3', status: '异常' }
    ],
    notices: [
      { id: 'n1', title: '节假日交易时间调整通知', date: '09-21', level: '高' },
      { id: 'n2', title: '系统维护公告（周末 02:00-04:00）', date: '09-20', level: '中' },
      { id: 'n3', title: '产品/交易规则更新说明', date: '09-18', level: '低' },
      { id: 'n4', title: '支付通道切换安排', date: '09-16', level: '低' }
    ]
  },
  week: { delay: false },
  month: { delay: false },
  lastMonth: { delay: false },
  custom: { delay: false }
})

const buildDerivedByTimeKey = (k) => {
  if (k === 'week') {
    return {
      ...demoData.value.today,
      delay: false,
      kpis: {
        ...demoData.value.today.kpis,
        depositToday: { ...demoData.value.today.kpis.depositToday, value: 560800.2, delta: 0.052, compare: '较上周' },
        withdrawToday: { ...demoData.value.today.kpis.withdrawToday, value: 312450.15, delta: 0.018, compare: '较上周' },
        netToday: { ...demoData.value.today.kpis.netToday, value: 248350.05, delta: 0.063, compare: '较上周' },
        lotsToday: { ...demoData.value.today.kpis.lotsToday, value: 8920.5, delta: 0.031, compare: '较上周' },
        pendingRiskCount: { ...demoData.value.today.kpis.pendingRiskCount, value: 18, delta: -0.12, compare: '较上周' }
      }
    }
  }
  if (k === 'month') {
    return {
      ...demoData.value.today,
      delay: false,
      kpis: {
        ...demoData.value.today.kpis,
        depositToday: { ...demoData.value.today.kpis.depositToday, value: 2350000.0, delta: 0.082, compare: '较上月' },
        withdrawToday: { ...demoData.value.today.kpis.withdrawToday, value: 1520000.0, delta: 0.054, compare: '较上月' },
        netToday: { ...demoData.value.today.kpis.netToday, value: 830000.0, delta: 0.074, compare: '较上月' },
        netMonth: { ...demoData.value.today.kpis.netMonth, value: 820350.55, delta: 0.067, compare: '较上月' },
        pendingWithdrawAmount: { ...demoData.value.today.kpis.pendingWithdrawAmount, value: 85200.0, delta: 0.09, compare: '较上月' }
      }
    }
  }
  if (k === 'lastMonth') {
    return {
      ...demoData.value.today,
      delay: false,
      kpis: {
        ...demoData.value.today.kpis,
        depositToday: { ...demoData.value.today.kpis.depositToday, value: 1980000.0, delta: -0.024, compare: '较上上月' },
        withdrawToday: { ...demoData.value.today.kpis.withdrawToday, value: 1345000.0, delta: -0.018, compare: '较上上月' },
        netToday: { ...demoData.value.today.kpis.netToday, value: 635000.0, delta: -0.012, compare: '较上上月' },
        netMonth: { ...demoData.value.today.kpis.netMonth, value: 768500.0, delta: -0.021, compare: '较上上月' },
        pendingRiskCount: { ...demoData.value.today.kpis.pendingRiskCount, value: 31, delta: 0.11, compare: '较上上月' }
      }
    }
  }
  return demoData.value.today
}

const currentData = computed(() => {
  const key = timeKey.value
  if (key === 'today') return demoData.value.today
  if (key === 'custom') return demoData.value.custom.delay ? demoData.value.custom : buildDerivedByTimeKey('week')
  return buildDerivedByTimeKey(key)
})

const setTimeKey = (k) => {
  timeKey.value = k
  refreshData()
}

const refreshData = () => {
  lastUpdated.value = nowText()
  delaySyncAt.value = nowText()
  dataDelayVisible.value = Boolean(currentData.value.delay)
  if (timeKey.value === 'custom') syncCustomData()
}

const syncCustomData = () => {
  demoData.value.custom = {
    ...buildDerivedByTimeKey('week'),
    delay: false,
    kpis: {
      ...buildDerivedByTimeKey('week').kpis,
      netToday: { ...buildDerivedByTimeKey('week').kpis.netToday, compare: `${customStart.value} ~ ${customEnd.value}` }
    }
  }
}

const deltaMeta = (delta) => {
  const d = Number(delta || 0)
  if (d > 0) return { cls: 'text-emerald-600', icon: 'fa-arrow-trend-up', text: '+' + formatPct(d) }
  if (d < 0) return { cls: 'text-rose-600', icon: 'fa-arrow-trend-down', text: formatPct(d) }
  return { cls: 'text-gray-500', icon: 'fa-minus', text: '0.0%' }
}

const kpiDefs = [
  { key: 'depositToday', label: '今日入金', tips: '统计周期内的真实入金汇总（演示口径）' },
  { key: 'withdrawToday', label: '今日出金', tips: '统计周期内的真实出金汇总（演示口径）' },
  { key: 'netToday', label: '今日净入金', tips: '净入金 = 真实入金 - 真实出金（不含赠金、信用金、内部转账）' },
  { key: 'netMonth', label: '本月净入金', tips: '按自然月累计净入金（演示口径）' },
  { key: 'lotsToday', label: '今日交易量', tips: '统计周期内的成交手数汇总（演示口径）' },
  { key: 'activeTradeAccounts', label: '活跃交易账户', tips: '统计周期内至少产生 1 笔有效交易的 MT 账户数' },
  { key: 'totalEquity', label: '客户总资金', tips: '客户 MT 账户余额汇总（演示口径）' },
  { key: 'netExposure', label: '当前净敞口', tips: '同一产品买入持仓 - 卖出持仓（演示口径）' },
  { key: 'pendingWithdrawAmount', label: '待审核出金金额', tips: '当前待审核出金订单金额汇总（演示口径）' },
  { key: 'pendingRiskCount', label: '未处理风险预警', tips: '仅统计未关闭且未处理的有效预警（演示口径）' }
]

const kpiCards = computed(() => {
  const kpis = currentData.value.kpis || {}
  return kpiDefs.map((d) => {
    const item = kpis[d.key] || { value: 0, delta: 0, compare: '较上一周期', source: '-' }
    const dm = deltaMeta(item.delta)
    const valueText = d.key === 'activeTradeAccounts' || d.key === 'pendingRiskCount'
      ? formatInt(item.value)
      : d.key === 'netExposure'
        ? formatMoney(item.value)
        : d.key.includes('lots')
          ? formatMoney(item.value) + ' Lot'
          : '$ ' + formatMoney(item.value)
    return {
      ...d,
      valueText,
      deltaText: dm.text,
      deltaClass: dm.cls,
      deltaIcon: dm.icon,
      compareText: item.compare,
      source: item.source,
      updatedAt: lastUpdated.value
    }
  })
})

const fundTrendTabs = [
  { key: 'deposit', label: '入金' },
  { key: 'withdraw', label: '出金' },
  { key: 'net', label: '净入金' }
]
const fundTrendKey = ref('net')

const sparkPoints = (arr, w = 600, h = 170, padY = 12) => {
  const a = Array.isArray(arr) ? arr : []
  if (!a.length) return ''
  const max = Math.max(...a) || 1
  const min = Math.min(...a)
  return a
    .map((v, i) => {
      const x = (i / (a.length - 1 || 1)) * w
      const y = h - ((v - min) / (max - min || 1)) * (h - padY * 2) - padY
      return `${x.toFixed(1)},${y.toFixed(1)}`
    })
    .join(' ')
}

const fundDepositPoints = computed(() => sparkPoints(currentData.value.fundTrend?.deposit))
const fundWithdrawPoints = computed(() => sparkPoints(currentData.value.fundTrend?.withdraw))
const fundNetPoints = computed(() => sparkPoints(currentData.value.fundTrend?.net))

const moneySummary = computed(() => currentData.value.money || {})
const paymentChannels = computed(() => currentData.value.paymentChannels || [])
const riskRows = computed(() => currentData.value.risks || [])

const todoCards = computed(() => {
  const map = { normal: '正常', warning: '接近超时', danger: '已超时' }
  return (currentData.value.todos || []).map((t) => ({ ...t, statusText: map[t.status] || '正常' }))
})

const tradeTrendTabs = [
  { key: 'volume', label: '交易量' },
  { key: 'accounts', label: '活跃交易账户' },
  { key: 'closedPnl', label: '平仓盈亏' },
  { key: 'floatingPnl', label: '持仓浮动盈亏' }
]
const tradeTrendKey = ref('volume')

const tradeSeries = computed(() => currentData.value.trade?.[tradeTrendKey.value] || [])
const tradeTrendPoints = computed(() => sparkPoints(tradeSeries.value))
const tradeTrendArea = computed(() => `${tradeTrendPoints.value} 600,170 0,170`)
const tradeSummary = computed(() => currentData.value.tradeSummary || [])

const exposureCards = computed(() => currentData.value.exposure || [])
const productRiskRows = computed(() => (currentData.value.productRisk || []).map((p) => ({ ...p, pnlClass: pnlClass(String(p.pnl).replace(/[^0-9.-]/g, '')) })))

const keyCustomerTabs = [
  { key: 'position', label: '持仓量最高' },
  { key: 'profit', label: '盈利最高' },
  { key: 'loss', label: '亏损最高' },
  { key: 'volume', label: '交易量最高' },
  { key: 'netDeposit', label: '净入金最高' }
]
const keyCustomerKey = ref('position')

const keyCustomerRows = computed(() => {
  const base = currentData.value.keyCustomers?.position || []
  const rows = currentData.value.keyCustomers?.[keyCustomerKey.value]
  const finalRows = Array.isArray(rows) && rows.length ? rows : base
  return finalRows.map((c) => ({ ...c, pnlClass: pnlClass(Number(String(c.pnl).replace(/,/g, ''))) }))
})

const funnelSteps = computed(() => currentData.value.funnel || [])
const customerStatusSummary = computed(() => currentData.value.customerStatus || [])
const regionRows = computed(() => currentData.value.regions || [])

const channelTabs = [
  { key: 'channel', label: '渠道' },
  { key: 'sales', label: '销售' },
  { key: 'agent', label: '代理' }
]
const channelKey = ref('channel')
const channelRows = computed(() => currentData.value.channel?.[channelKey.value] || [])

const activitySummaryCards = computed(() => currentData.value.activitySummary || [])
const commissionSummaryCards = computed(() => currentData.value.commissionSummary || [])

const commissionTabs = [
  { key: 'sales', label: '销售返佣' },
  { key: 'agent', label: '代理返佣' },
  { key: 'activity', label: '活动奖励' }
]
const commissionKey = ref('sales')
const commissionTopRows = computed(() => currentData.value.commissionTop?.[commissionKey.value] || [])

const systemStatusCards = computed(() => currentData.value.system || [])
const notices = computed(() => currentData.value.notices || [])

const riskLevelClass = (level) => {
  if (level === '红色') return 'border-rose-200 bg-rose-50 text-rose-700'
  if (level === '橙色') return 'border-orange-200 bg-orange-50 text-orange-700'
  return 'border-amber-200 bg-amber-50 text-amber-700'
}

const riskDotClass = (level) => {
  if (level === '红色') return 'bg-rose-500'
  if (level === '橙色') return 'bg-orange-400'
  return 'bg-amber-400'
}

const channelStatusClass = (status) => {
  if (status === '异常') return 'border-rose-200 bg-rose-50 text-rose-700'
  if (status === '维护中') return 'border-orange-200 bg-orange-50 text-orange-700'
  return 'border-emerald-200 bg-emerald-50 text-emerald-700'
}

const channelDotClass = (status) => {
  if (status === '异常') return 'bg-rose-500'
  if (status === '维护中') return 'bg-orange-400'
  return 'bg-emerald-500'
}

const systemStatusClass = (status) => {
  if (status === '异常') return 'border-rose-200 bg-rose-50 text-rose-700'
  if (status === '维护中') return 'border-orange-200 bg-orange-50 text-orange-700'
  return 'border-emerald-200 bg-emerald-50 text-emerald-700'
}

const systemDotClass = (status) => {
  if (status === '异常') return 'bg-rose-500'
  if (status === '维护中') return 'bg-orange-400'
  return 'bg-emerald-500'
}

const todoDotClass = (status) => {
  if (status === 'danger') return 'bg-rose-500'
  if (status === 'warning') return 'bg-amber-400'
  return 'bg-gray-300'
}

const todoStatusTextClass = (status) => {
  if (status === 'danger') return 'text-rose-600'
  if (status === 'warning') return 'text-amber-700'
  return 'text-gray-500'
}

const demoViewMore = (name) => {
  ElMessage({ message: `仅演示：${name} 查看更多`, type: 'info' })
}

const demoClickTodo = (name) => {
  ElMessage({ message: `仅演示：进入 ${name}`, type: 'info' })
}

refreshData()
</script>
