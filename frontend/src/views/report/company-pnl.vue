<template>
  <div class="flex h-full bg-mainBg overflow-hidden w-full">
    <div class="flex-1 flex flex-col min-w-0 bg-gray-50 overflow-hidden p-4 custom-scrollbar overflow-y-auto w-full">
      <div class="flex flex-col gap-4 min-w-0">
        <div class="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
          <div class="flex items-start justify-between gap-4">
            <div class="text-sm font-bold text-gray-800">筛选</div>
            <div class="text-[11px] text-gray-500">
              金额统一折算为 USD 展示（演示数据）
            </div>
          </div>
          <div class="mt-3 grid grid-cols-1 xl:grid-cols-12 gap-3 text-xs">
            <div class="flex items-center gap-2 xl:col-span-2">
              <div class="text-gray-600 w-[84px] shrink-0 text-right">时间类型：</div>
              <select v-model="form.dateMode" class="border border-gray-300 rounded px-2 py-2 outline-none flex-1 bg-white">
                <option value="single">单日</option>
                <option value="range">区间</option>
              </select>
            </div>

            <div class="flex items-center gap-2 xl:col-span-4">
              <div class="text-gray-600 w-[84px] shrink-0 text-right">日期：</div>
              <div v-if="form.dateMode === 'single'" class="flex-1">
                <input v-model="form.date" class="border border-gray-300 rounded px-3 py-2 outline-none w-full bg-white text-center" placeholder="YYYY-MM-DD" type="text" />
              </div>
              <div v-else class="flex flex-1 items-center border border-gray-300 rounded overflow-hidden bg-white">
                <input v-model="form.dateStart" class="px-3 py-2 outline-none flex-1 text-center" placeholder="开始(YYYY-MM-DD)" type="text" />
                <span class="bg-gray-50 px-2 py-2 text-gray-400 border-x border-gray-300">到</span>
                <input v-model="form.dateEnd" class="px-3 py-2 outline-none flex-1 text-center" placeholder="结束(YYYY-MM-DD)" type="text" />
              </div>
            </div>

            <div class="flex items-center gap-2 xl:col-span-2">
              <div class="text-gray-600 w-[84px] shrink-0 text-right">公司：</div>
              <select v-model="form.company" class="border border-gray-300 rounded px-2 py-2 outline-none flex-1 bg-white">
                <option v-for="c in companyOptions" :key="c.value" :value="c.value">{{ c.label }}</option>
              </select>
            </div>

            <div class="flex items-center gap-2 xl:col-span-2">
              <div class="text-gray-600 w-[84px] shrink-0 text-right">币种：</div>
              <select v-model="form.currency" class="border border-gray-300 rounded px-2 py-2 outline-none flex-1 bg-white">
                <option v-for="c in currencyOptions" :key="c" :value="c">{{ c }}</option>
              </select>
            </div>

            <div class="flex items-center justify-end gap-3 xl:col-span-2">
              <button class="bg-white border border-gray-300 text-gray-600 hover:bg-gray-50 px-6 py-2 rounded text-xs transition-colors shadow-sm font-medium" @click="resetSearch">
                重置
              </button>
              <button class="bg-white border border-primaryBtn text-primaryBtn hover:bg-primaryBtn hover:text-white px-6 py-2 rounded text-xs transition-colors shadow-sm font-medium" @click="applySearch">
                查询
              </button>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
          <div class="px-5 py-4 border-b border-gray-100 flex items-center justify-between gap-3">
            <div class="text-sm font-bold text-gray-800">公司盈亏总览</div>
            <div class="text-[11px] text-gray-500 flex items-center gap-2">
              <span class="w-1.5 h-1.5 rounded-full bg-gray-400"></span>
              <span>返佣按最高条件计算</span>
              <span v-if="overview.rebateNeedCheck" class="flex items-center gap-1 text-orange-600">
                <span class="w-1.5 h-1.5 rounded-full bg-orange-500"></span>
                <span>返佣异常：待核查</span>
              </span>
            </div>
          </div>

          <div class="p-4 space-y-3">
            <div class="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-3">
              <div
                v-for="item in overviewPrimary"
                :key="item.key"
                class="rounded-lg border border-gray-100 bg-white p-3"
              >
                <div class="text-[11px] text-gray-600">{{ item.label }}</div>
                <div
                  :class="['mt-1 font-bold font-mono text-base', item.colorize ? numberClass(item.value) : 'text-gray-900']"
                >
                  <template v-if="item.type === 'money'">$ {{ formatMoney(item.value) }}</template>
                  <template v-else-if="item.type === 'lots'">{{ formatLots(item.value) }} Lot</template>
                  <template v-else>{{ formatInt(item.value) }}</template>
                </div>
              </div>
            </div>

            <div class="text-xs text-gray-500 bg-gray-50 border border-gray-100 rounded-lg px-4 py-2">
              <div class="flex flex-wrap items-center gap-x-6 gap-y-1">
                <div v-for="item in overviewSecondary" :key="item.key" class="whitespace-nowrap">
                  <span>{{ item.label }}</span>
                  <span class="ml-1 font-mono font-medium" :class="item.colorize ? numberClass(item.value) : 'text-gray-700'">
                    <template v-if="item.type === 'money'">$ {{ formatMoney(item.value) }}</template>
                    <template v-else-if="item.type === 'lots'">{{ formatLots(item.value) }} Lot</template>
                    <template v-else>{{ formatInt(item.value) }}</template>
                  </span>
                </div>
              </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div v-for="item in commissionAccountItems" :key="item.key" class="rounded-lg border border-gray-100 bg-white p-3">
                <div class="text-[11px] text-gray-600">{{ item.label }}</div>
                <div class="mt-1 font-bold font-mono text-base text-gray-900">$ {{ formatMoney(item.value) }}</div>
              </div>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
          <div class="px-5 py-4 border-b border-gray-100 flex items-center justify-between gap-3">
            <div class="text-sm font-bold text-gray-800">本月累计公司盈亏</div>
            <div class="text-[11px] text-gray-500">累计净盈亏包含现时浮动盈亏（口径由财务/运营统一提供）</div>
          </div>
          <div class="p-4">
            <div class="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-3">
              <div v-for="item in monthCumulativeItems" :key="item.key" class="rounded-lg border border-gray-100 bg-white p-3">
                <div class="text-[11px] text-gray-600">{{ item.label }}</div>
                <div :class="['mt-1 font-bold font-mono text-base', item.colorize ? numberClass(item.value) : 'text-gray-900']">
                  $ {{ formatMoney(item.value) }}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
          <div class="px-5 py-4 border-b border-gray-100 flex items-center justify-between gap-3">
            <div class="text-sm font-bold text-gray-800">公司盈亏趋势</div>
            <div class="flex items-center gap-3 text-xs">
              <select v-model="trendMode" class="border border-gray-300 rounded px-2 py-2 outline-none bg-white">
                <option value="monthly">月度</option>
                <option value="yearly">年度</option>
              </select>
              <select v-model="trendCompany" class="border border-gray-300 rounded px-2 py-2 outline-none bg-white">
                <option v-for="c in trendCompanyOptions" :key="c.value" :value="c.value">{{ c.label }}</option>
              </select>
              <select v-model="trendMetric" class="border border-gray-300 rounded px-2 py-2 outline-none bg-white">
                <option v-for="m in trendMetricOptions" :key="m.value" :value="m.value">{{ m.label }}</option>
              </select>
            </div>
          </div>

          <div class="p-4 space-y-3">
            <div class="rounded-lg border border-gray-100 bg-gray-50 p-3">
              <div class="flex items-center justify-between gap-4">
                <div class="text-[11px] text-gray-600">趋势图（演示：一次仅展示 1 个指标）</div>
                <div class="text-[11px] text-gray-500 font-mono">
                  当前：{{ trendMetricLabel }} = $ {{ formatMoney(currentTrendValue) }}
                </div>
              </div>
              <div class="mt-2 w-full h-[120px]">
                <svg :viewBox="`0 0 ${trendChartWidth} ${trendChartHeight}`" class="w-full h-full">
                  <polyline :points="trendChartPoints" fill="none" stroke="#C19B5E" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                  <circle
                    v-if="trendChartLastPoint"
                    :cx="trendChartLastPoint.x"
                    :cy="trendChartLastPoint.y"
                    r="3"
                    fill="#C19B5E"
                  />
                </svg>
              </div>
            </div>

            <el-table
              :data="trendTableRows"
              border
              stripe
              size="small"
              class="w-full"
            >
              <el-table-column prop="period" :label="trendMode === 'monthly' ? '月份' : '年度'" width="110" sortable />
              <el-table-column prop="company" label="公司" width="110" sortable />
              <el-table-column prop="netDeposit" label="净入金(USD)" min-width="140" sortable align="right">
                <template #default="{ row }">$ {{ formatMoney(row.netDeposit) }}</template>
              </el-table-column>
              <el-table-column prop="closedPnl" label="平仓盈亏(USD)" min-width="150" sortable align="right">
                <template #default="{ row }"><span :class="numberClass(row.closedPnl)">$ {{ formatMoney(row.closedPnl) }}</span></template>
              </el-table-column>
              <el-table-column prop="rebate" label="返佣(USD)" min-width="120" sortable align="right">
                <template #default="{ row }">$ {{ formatMoney(row.rebate) }}</template>
              </el-table-column>
              <el-table-column prop="companyNetPnl" label="公司净盈亏(USD)" min-width="160" sortable align="right">
                <template #default="{ row }"><span :class="numberClass(row.companyNetPnl)">$ {{ formatMoney(row.companyNetPnl) }}</span></template>
              </el-table-column>
            </el-table>
          </div>
        </div>

        <div class="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
          <div class="px-5 py-4 border-b border-gray-100 flex items-center justify-between gap-3">
            <div class="text-sm font-bold text-gray-800">客户分析</div>
            <div class="text-[11px] text-gray-500">Top 20（演示数据）</div>
          </div>
          <div class="p-4">
            <el-tabs v-model="customerTab" type="card" class="report-tabs">
              <el-tab-pane v-for="t in customerTabs" :key="t.key" :name="t.key" :label="t.label">
                <el-table :data="customerTableData" border stripe size="small">
                  <el-table-column prop="login" label="MT5 Login" width="120" sortable />
                  <el-table-column prop="name" label="客户名称" min-width="140" sortable />
                  <el-table-column v-if="t.key === 'profit'" prop="totalProfit" label="总盈利(USD)" min-width="160" sortable align="right">
                    <template #default="{ row }"><span class="text-green-600 font-mono">$ {{ formatMoney(row.totalProfit) }}</span></template>
                  </el-table-column>
                  <el-table-column v-else-if="t.key === 'loss'" prop="totalLoss" label="总亏损(USD)" min-width="160" sortable align="right">
                    <template #default="{ row }"><span class="text-red-600 font-mono">$ {{ formatMoney(row.totalLoss) }}</span></template>
                  </el-table-column>
                  <el-table-column v-else-if="t.key === 'highEquity'" prop="equity" label="净值金额(USD)" min-width="160" sortable align="right">
                    <template #default="{ row }">$ {{ formatMoney(row.equity) }}</template>
                  </el-table-column>
                  <el-table-column v-else-if="t.key === 'floatingLoss'" prop="floatingLoss" label="浮亏金额(USD)" min-width="160" sortable align="right">
                    <template #default="{ row }"><span class="text-red-600 font-mono">$ {{ formatMoney(row.floatingLoss) }}</span></template>
                  </el-table-column>
                  <el-table-column v-else-if="t.key === 'floatingProfit'" prop="floatingProfit" label="浮盈金额(USD)" min-width="160" sortable align="right">
                    <template #default="{ row }"><span class="text-green-600 font-mono">$ {{ formatMoney(row.floatingProfit) }}</span></template>
                  </el-table-column>
                  <el-table-column v-else-if="t.key === 'commission'" prop="commission" label="佣金(USD)" min-width="140" sortable align="right">
                    <template #default="{ row }">$ {{ formatMoney(row.commission) }}</template>
                  </el-table-column>
                  <el-table-column v-else prop="volumeLots" label="交易量(Lot)" min-width="140" sortable align="right">
                    <template #default="{ row }">{{ formatLots(row.volumeLots) }}</template>
                  </el-table-column>

                  <el-table-column v-if="t.key === 'profit' || t.key === 'loss'" prop="floatingPnl" label="现时浮动盈亏(USD)" min-width="170" sortable align="right">
                    <template #default="{ row }"><span :class="numberClass(row.floatingPnl)">$ {{ formatMoney(row.floatingPnl) }}</span></template>
                  </el-table-column>
                  <el-table-column v-if="t.key === 'profit' || t.key === 'loss'" prop="closeCount" label="期间平仓笔数" min-width="130" sortable align="right">
                    <template #default="{ row }">{{ formatInt(row.closeCount) }}</template>
                  </el-table-column>
                  <el-table-column v-if="t.key === 'profit' || t.key === 'loss'" prop="closeLots" label="期间平仓量(Lot)" min-width="150" sortable align="right">
                    <template #default="{ row }">{{ formatLots(row.closeLots) }}</template>
                  </el-table-column>

                  <el-table-column v-if="t.key === 'highEquity'" prop="floatingPnl" label="浮动盈亏(USD)" min-width="150" sortable align="right">
                    <template #default="{ row }"><span :class="numberClass(row.floatingPnl)">$ {{ formatMoney(row.floatingPnl) }}</span></template>
                  </el-table-column>
                  <el-table-column v-if="t.key === 'highEquity'" prop="periodTotalPnl" label="期间总盈亏(USD)" min-width="160" sortable align="right">
                    <template #default="{ row }"><span :class="numberClass(row.periodTotalPnl)">$ {{ formatMoney(row.periodTotalPnl) }}</span></template>
                  </el-table-column>
                </el-table>
              </el-tab-pane>
            </el-tabs>
          </div>
        </div>

        <div class="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
          <div class="px-5 py-4 border-b border-gray-100 flex items-center justify-between gap-3">
            <div class="text-sm font-bold text-gray-800">产品分析</div>
            <div class="flex items-center gap-2 text-xs">
              <span class="text-gray-600">排序：</span>
              <select v-model="productSortKey" class="border border-gray-300 rounded px-2 py-2 outline-none bg-white">
                <option value="volumeLots">交易量</option>
                <option value="volumeShare">占比</option>
                <option value="pnlWithRebate">盈亏</option>
              </select>
              <select v-model="productSortOrder" class="border border-gray-300 rounded px-2 py-2 outline-none bg-white">
                <option value="desc">降序</option>
                <option value="asc">升序</option>
              </select>
            </div>
          </div>
          <div class="p-4">
            <el-table :data="productRows" border stripe size="small">
              <el-table-column prop="symbol" label="交易产品" min-width="160" sortable />
              <el-table-column prop="closeCount" label="平仓笔数" min-width="120" sortable align="right">
                <template #default="{ row }">{{ formatInt(row.closeCount) }}</template>
              </el-table-column>
              <el-table-column prop="volumeLots" label="交易量(Lot)" min-width="140" sortable align="right">
                <template #default="{ row }">{{ formatLots(row.volumeLots) }}</template>
              </el-table-column>
              <el-table-column prop="volumeShare" label="交易量占比" min-width="140" sortable align="right">
                <template #default="{ row }">{{ formatPercent(row.volumeShare) }}</template>
              </el-table-column>
              <el-table-column prop="pnlWithRebate" label="平仓盈亏 + 返佣(USD)" min-width="190" sortable align="right">
                <template #default="{ row }"><span :class="numberClass(row.pnlWithRebate)">$ {{ formatMoney(row.pnlWithRebate) }}</span></template>
              </el-table-column>
            </el-table>
          </div>
        </div>

        <div class="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
          <div class="px-5 py-4 border-b border-gray-100 flex items-center justify-between gap-3">
            <div class="text-sm font-bold text-gray-800">&lt;=120秒交易分析</div>
            <div class="text-[11px] text-gray-500">以风险/业务分析为主（演示数据）</div>
          </div>
          <div class="p-4">
            <el-tabs v-model="shortTradeTab" type="border-card">
              <el-tab-pane name="customer" label="客户维度">
                <el-table :data="shortTradeCustomerRows" border stripe size="small">
                  <el-table-column prop="login" label="MT5 Login" width="120" sortable />
                  <el-table-column prop="name" label="客户名称" min-width="140" sortable />
                  <el-table-column prop="ratio" label="&lt;=120秒交易占率" min-width="160" sortable align="right">
                    <template #default="{ row }">{{ formatPercent(row.ratio) }}</template>
                  </el-table-column>
                  <el-table-column prop="shortCloseCount" label="&lt;=120秒平仓笔数" min-width="160" sortable align="right">
                    <template #default="{ row }">{{ formatInt(row.shortCloseCount) }}</template>
                  </el-table-column>
                  <el-table-column prop="totalCloseCount" label="总平仓笔数" min-width="130" sortable align="right">
                    <template #default="{ row }">{{ formatInt(row.totalCloseCount) }}</template>
                  </el-table-column>
                  <el-table-column prop="shortPnl" label="&lt;=120秒交易盈亏(USD)" min-width="190" sortable align="right">
                    <template #default="{ row }"><span :class="numberClass(row.shortPnl)">$ {{ formatMoney(row.shortPnl) }}</span></template>
                  </el-table-column>
                  <el-table-column prop="periodTotalPnl" label="期间总盈亏(USD)" min-width="160" sortable align="right">
                    <template #default="{ row }"><span :class="numberClass(row.periodTotalPnl)">$ {{ formatMoney(row.periodTotalPnl) }}</span></template>
                  </el-table-column>
                </el-table>
              </el-tab-pane>
              <el-tab-pane name="product" label="产品维度">
                <el-table :data="shortTradeProductRows" border stripe size="small">
                  <el-table-column prop="symbol" label="交易产品" min-width="160" sortable />
                  <el-table-column prop="shortCloseCount" label="&lt;=120秒笔数" min-width="120" sortable align="right">
                    <template #default="{ row }">{{ formatInt(row.shortCloseCount) }}</template>
                  </el-table-column>
                  <el-table-column prop="ratio" label="&lt;=120秒占率" min-width="120" sortable align="right">
                    <template #default="{ row }">{{ formatPercent(row.ratio) }}</template>
                  </el-table-column>
                  <el-table-column prop="pnlWithRebate" label="&lt;=120秒盈亏 + 返佣(USD)" min-width="210" sortable align="right">
                    <template #default="{ row }"><span :class="numberClass(row.pnlWithRebate)">$ {{ formatMoney(row.pnlWithRebate) }}</span></template>
                  </el-table-column>
                </el-table>
              </el-tab-pane>
            </el-tabs>
          </div>
        </div>

        <div class="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
          <div class="px-5 py-4 border-b border-gray-100 flex items-center justify-between gap-3">
            <div class="text-sm font-bold text-gray-800">月度 / 年度汇总表</div>
            <div class="text-[11px] text-gray-500">字段口径以现有财务/运营统一定义为准（页面仅展示结果）</div>
          </div>
          <div class="p-4">
            <el-tabs v-model="summaryTab" type="card">
              <el-tab-pane name="monthly" label="月度汇总">
                <el-table :data="summaryMonthlyRows" border stripe size="small">
                  <el-table-column prop="period" label="月份" width="110" sortable />
                  <el-table-column prop="company" label="公司" width="110" sortable />
                  <el-table-column prop="equity" label="净值(USD)" min-width="140" sortable align="right">
                    <template #default="{ row }">$ {{ formatMoney(row.equity) }}</template>
                  </el-table-column>
                  <el-table-column prop="netDeposit" label="净入金(USD)" min-width="140" sortable align="right">
                    <template #default="{ row }">$ {{ formatMoney(row.netDeposit) }}</template>
                  </el-table-column>
                  <el-table-column prop="credit" label="信用金额(USD)" min-width="150" sortable align="right">
                    <template #default="{ row }">$ {{ formatMoney(row.credit) }}</template>
                  </el-table-column>
                  <el-table-column prop="closeCount" label="平仓笔数" min-width="120" sortable align="right">
                    <template #default="{ row }">{{ formatInt(row.closeCount) }}</template>
                  </el-table-column>
                  <el-table-column prop="closeLots" label="平仓手数(Lot)" min-width="150" sortable align="right">
                    <template #default="{ row }">{{ formatLots(row.closeLots) }}</template>
                  </el-table-column>
                  <el-table-column prop="fee" label="手续费(USD)" min-width="140" sortable align="right">
                    <template #default="{ row }">$ {{ formatMoney(row.fee) }}</template>
                  </el-table-column>
                  <el-table-column prop="interest" label="平仓利息(USD)" min-width="150" sortable align="right">
                    <template #default="{ row }"><span :class="numberClass(row.interest)">$ {{ formatMoney(row.interest) }}</span></template>
                  </el-table-column>
                  <el-table-column prop="closedPnl" label="平仓盈亏(USD)" min-width="150" sortable align="right">
                    <template #default="{ row }"><span :class="numberClass(row.closedPnl)">$ {{ formatMoney(row.closedPnl) }}</span></template>
                  </el-table-column>
                  <el-table-column prop="rebate" label="返佣(USD)" min-width="130" sortable align="right">
                    <template #default="{ row }">$ {{ formatMoney(row.rebate) }}</template>
                  </el-table-column>
                  <el-table-column prop="floatingPnl" label="浮动盈亏(USD)" min-width="150" sortable align="right">
                    <template #default="{ row }"><span :class="numberClass(row.floatingPnl)">$ {{ formatMoney(row.floatingPnl) }}</span></template>
                  </el-table-column>
                  <el-table-column prop="companyNetPnl" label="公司净盈亏(USD)" min-width="160" sortable align="right">
                    <template #default="{ row }"><span :class="numberClass(row.companyNetPnl)">$ {{ formatMoney(row.companyNetPnl) }}</span></template>
                  </el-table-column>
                  <el-table-column prop="commissionAccountEquity" label="代理佣金账户(USD)" min-width="170" sortable align="right">
                    <template #default="{ row }">$ {{ formatMoney(row.commissionAccountEquity) }}</template>
                  </el-table-column>
                </el-table>
              </el-tab-pane>
              <el-tab-pane name="yearly" label="年度汇总">
                <el-table :data="summaryYearlyRows" border stripe size="small">
                  <el-table-column prop="period" label="年度" width="110" sortable />
                  <el-table-column prop="company" label="公司" width="110" sortable />
                  <el-table-column prop="netDeposit" label="净入金(USD)" min-width="140" sortable align="right">
                    <template #default="{ row }">$ {{ formatMoney(row.netDeposit) }}</template>
                  </el-table-column>
                  <el-table-column prop="closedPnl" label="平仓盈亏(USD)" min-width="150" sortable align="right">
                    <template #default="{ row }"><span :class="numberClass(row.closedPnl)">$ {{ formatMoney(row.closedPnl) }}</span></template>
                  </el-table-column>
                  <el-table-column prop="rebate" label="返佣(USD)" min-width="130" sortable align="right">
                    <template #default="{ row }">$ {{ formatMoney(row.rebate) }}</template>
                  </el-table-column>
                  <el-table-column prop="floatingPnl" label="浮动盈亏(USD)" min-width="150" sortable align="right">
                    <template #default="{ row }"><span :class="numberClass(row.floatingPnl)">$ {{ formatMoney(row.floatingPnl) }}</span></template>
                  </el-table-column>
                  <el-table-column prop="companyNetPnl" label="公司净盈亏(USD)" min-width="160" sortable align="right">
                    <template #default="{ row }"><span :class="numberClass(row.companyNetPnl)">$ {{ formatMoney(row.companyNetPnl) }}</span></template>
                  </el-table-column>
                </el-table>
              </el-tab-pane>
            </el-tabs>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, reactive, ref } from 'vue'

const companyOptions = [
  { value: 'ALL', label: '全部' },
  { value: 'HATCGL', label: 'HATCGL' },
  { value: 'HATC-HK', label: 'HATC-HK' }
]

const currencyOptions = ['USD', 'HKD', 'CNY']

const form = reactive({
  dateMode: 'single',
  date: '2026-09-13',
  dateStart: '2026-09-01',
  dateEnd: '2026-09-13',
  company: 'ALL',
  currency: 'USD'
})

const querySnapshot = ref({ ...form })

const resetSearch = () => {
  form.dateMode = 'single'
  form.date = '2026-09-13'
  form.dateStart = '2026-09-01'
  form.dateEnd = '2026-09-13'
  form.company = 'ALL'
  form.currency = 'USD'
  querySnapshot.value = { ...form }
}

const applySearch = () => {
  querySnapshot.value = { ...form }
}

const currencyFactor = computed(() => {
  if (querySnapshot.value.currency === 'HKD') return 0.92
  if (querySnapshot.value.currency === 'CNY') return 0.88
  return 1
})

const demo = {
  HATCGL: {
    overview: {
      equityNow: 12658320.55,
      netDeposit: 382150.2,
      netCreditDeposit: 48500.0,
      closeCount: 12840,
      closeLots: 38650.75,
      closeInterest: -12850.33,
      closedPnl: 186520.41,
      rebate: 84250.0,
      floatingPnl: -45210.66,
      companyNetPnl: 214820.12,
      commissionAccountEquity: 125820.23,
      commissionAccountDeposit: 68210.0,
      commissionAccountWithdraw: 22500.0,
      rebateNeedCheck: true,
      fee: 16820.0,
      adjustment: -5200.0
    },
    month: {
      prevTotalPnl: 185200.0,
      rebate: 84250.0,
      periodTotalPnl: 268450.0,
      cumulativeTotalPnl: 453650.0,
      cumulativeNetPnl: 408439.34
    },
    trendMonthly: [
      { period: '2026-04', company: 'HATCGL', netDeposit: 95020.0, closedPnl: 51220.0, rebate: 18200.0, companyNetPnl: 63450.0 },
      { period: '2026-05', company: 'HATCGL', netDeposit: 102300.0, closedPnl: 36520.0, rebate: 20100.0, companyNetPnl: 51820.0 },
      { period: '2026-06', company: 'HATCGL', netDeposit: 88500.0, closedPnl: 42500.0, rebate: 19200.0, companyNetPnl: 56820.0 },
      { period: '2026-07', company: 'HATCGL', netDeposit: 91220.0, closedPnl: 38400.0, rebate: 21500.0, companyNetPnl: 49210.0 },
      { period: '2026-08', company: 'HATCGL', netDeposit: 105110.0, closedPnl: 46210.0, rebate: 22100.0, companyNetPnl: 61580.0 },
      { period: '2026-09', company: 'HATCGL', netDeposit: 382150.2, closedPnl: 186520.41, rebate: 84250.0, companyNetPnl: 214820.12 }
    ],
    trendYearly: [
      { period: '2024', company: 'HATCGL', netDeposit: 1325020.0, closedPnl: 452100.0, rebate: 185200.0, companyNetPnl: 520300.0, floatingPnl: -35200.0 },
      { period: '2025', company: 'HATCGL', netDeposit: 1658200.0, closedPnl: 585200.0, rebate: 225400.0, companyNetPnl: 648520.0, floatingPnl: 15200.0 },
      { period: '2026', company: 'HATCGL', netDeposit: 1201100.0, closedPnl: 512200.0, rebate: 212800.0, companyNetPnl: 595100.0, floatingPnl: -45100.0 }
    ],
    products: [
      { symbol: 'XAUUSD', closeCount: 3620, volumeLots: 11820.5, volumeShare: 0.306, pnlWithRebate: 86250.25 },
      { symbol: 'XAUUSD.cent', closeCount: 2850, volumeLots: 9650.75, volumeShare: 0.250, pnlWithRebate: 51220.5 },
      { symbol: 'XAGUSD', closeCount: 1250, volumeLots: 4820.25, volumeShare: 0.125, pnlWithRebate: -12520.0 },
      { symbol: 'XTIUSD', closeCount: 1080, volumeLots: 3620.0, volumeShare: 0.094, pnlWithRebate: 18500.0 },
      { symbol: 'EURUSD', closeCount: 1460, volumeLots: 3280.5, volumeShare: 0.085, pnlWithRebate: 8200.0 },
      { symbol: 'GBPUSD', closeCount: 980, volumeLots: 2350.75, volumeShare: 0.061, pnlWithRebate: -5200.0 },
      { symbol: 'USDJPY', closeCount: 620, volumeLots: 1020.0, volumeShare: 0.026, pnlWithRebate: 3650.0 },
      { symbol: 'AUDUSD', closeCount: 540, volumeLots: 860.0, volumeShare: 0.022, pnlWithRebate: 1820.0 },
      { symbol: 'USDCAD', closeCount: 440, volumeLots: 720.0, volumeShare: 0.019, pnlWithRebate: -1250.0 },
      { symbol: 'BTCUSD', closeCount: 0, volumeLots: 0, volumeShare: 0, pnlWithRebate: 0 }
    ],
    shortTradeCustomer: [],
    shortTradeProduct: []
  },
  'HATC-HK': {
    overview: {
      equityNow: 8255320.12,
      netDeposit: 215820.75,
      netCreditDeposit: 32500.0,
      closeCount: 8420,
      closeLots: 22510.5,
      closeInterest: -8520.0,
      closedPnl: -26520.25,
      rebate: 65200.0,
      floatingPnl: 32510.88,
      companyNetPnl: 11850.63,
      commissionAccountEquity: 85210.0,
      commissionAccountDeposit: 50200.0,
      commissionAccountWithdraw: 18500.0,
      rebateNeedCheck: false,
      fee: 12500.0,
      adjustment: 3200.0
    },
    month: {
      prevTotalPnl: 82500.0,
      rebate: 65200.0,
      periodTotalPnl: 12500.0,
      cumulativeTotalPnl: 95000.0,
      cumulativeNetPnl: 127510.88
    },
    trendMonthly: [
      { period: '2026-04', company: 'HATC-HK', netDeposit: 58200.0, closedPnl: -12520.0, rebate: 16200.0, companyNetPnl: -8520.0 },
      { period: '2026-05', company: 'HATC-HK', netDeposit: 62500.0, closedPnl: 8200.0, rebate: 17500.0, companyNetPnl: 6200.0 },
      { period: '2026-06', company: 'HATC-HK', netDeposit: 54120.0, closedPnl: -5200.0, rebate: 16800.0, companyNetPnl: -3650.0 },
      { period: '2026-07', company: 'HATC-HK', netDeposit: 68200.0, closedPnl: 10200.0, rebate: 19500.0, companyNetPnl: 8520.0 },
      { period: '2026-08', company: 'HATC-HK', netDeposit: 71500.0, closedPnl: -8200.0, rebate: 20500.0, companyNetPnl: -4520.0 },
      { period: '2026-09', company: 'HATC-HK', netDeposit: 215820.75, closedPnl: -26520.25, rebate: 65200.0, companyNetPnl: 11850.63 }
    ],
    trendYearly: [
      { period: '2024', company: 'HATC-HK', netDeposit: 985200.0, closedPnl: 18200.0, rebate: 152800.0, companyNetPnl: 82520.0, floatingPnl: 12500.0 },
      { period: '2025', company: 'HATC-HK', netDeposit: 1125200.0, closedPnl: -52000.0, rebate: 165200.0, companyNetPnl: 35200.0, floatingPnl: 22510.0 },
      { period: '2026', company: 'HATC-HK', netDeposit: 852500.0, closedPnl: -32520.0, rebate: 138200.0, companyNetPnl: 26820.0, floatingPnl: 32510.88 }
    ],
    products: [
      { symbol: 'XAUUSD', closeCount: 2250, volumeLots: 6820.0, volumeShare: 0.303, pnlWithRebate: 15200.0 },
      { symbol: 'XAUUSD.cent', closeCount: 1860, volumeLots: 5280.25, volumeShare: 0.235, pnlWithRebate: 8200.0 },
      { symbol: 'XTIUSD', closeCount: 980, volumeLots: 2850.0, volumeShare: 0.127, pnlWithRebate: -5200.0 },
      { symbol: 'EURUSD', closeCount: 1120, volumeLots: 2480.5, volumeShare: 0.110, pnlWithRebate: 3650.0 },
      { symbol: 'GBPUSD', closeCount: 860, volumeLots: 1850.75, volumeShare: 0.082, pnlWithRebate: -1250.0 },
      { symbol: 'XAGUSD', closeCount: 620, volumeLots: 1320.0, volumeShare: 0.059, pnlWithRebate: 1820.0 },
      { symbol: 'USDJPY', closeCount: 420, volumeLots: 820.0, volumeShare: 0.036, pnlWithRebate: 920.0 },
      { symbol: 'AUDUSD', closeCount: 360, volumeLots: 620.0, volumeShare: 0.028, pnlWithRebate: -650.0 },
      { symbol: 'USDCAD', closeCount: 310, volumeLots: 520.0, volumeShare: 0.023, pnlWithRebate: 420.0 }
    ],
    shortTradeCustomer: [],
    shortTradeProduct: []
  }
}

const buildCustomers = (seed, count, mapper) => {
  const rows = []
  for (let i = 0; i < count; i += 1) {
    const login = 700000 + seed * 1000 + i
    rows.push(mapper(i, login))
  }
  return rows
}

const buildShortTradeCustomers = (seed) => buildCustomers(seed, 12, (i, login) => {
  const ratio = Math.min(0.65, 0.12 + i * 0.03)
  const totalCloseCount = 520 + i * 35
  const shortCloseCount = Math.round(totalCloseCount * ratio)
  const shortPnl = (i % 2 === 0 ? 1 : -1) * (1800 + i * 220)
  const periodTotalPnl = shortPnl + (i % 3 === 0 ? 2200 : -1500)
  return {
    login: String(login),
    name: `客户${seed}-${i + 1}`,
    ratio,
    shortCloseCount,
    totalCloseCount,
    shortPnl,
    periodTotalPnl
  }
})

const buildShortTradeProducts = () => ([
  { symbol: 'XAUUSD', shortCloseCount: 620, ratio: 0.18, pnlWithRebate: 8200.0 },
  { symbol: 'XTIUSD', shortCloseCount: 420, ratio: 0.12, pnlWithRebate: -3650.0 },
  { symbol: 'EURUSD', shortCloseCount: 380, ratio: 0.11, pnlWithRebate: 1520.0 },
  { symbol: 'GBPUSD', shortCloseCount: 300, ratio: 0.09, pnlWithRebate: -920.0 },
  { symbol: 'XAGUSD', shortCloseCount: 210, ratio: 0.06, pnlWithRebate: 420.0 }
])

demo.HATCGL.shortTradeCustomer = buildShortTradeCustomers(1)
demo['HATC-HK'].shortTradeCustomer = buildShortTradeCustomers(2)
demo.HATCGL.shortTradeProduct = buildShortTradeProducts()
demo['HATC-HK'].shortTradeProduct = buildShortTradeProducts().map((r, idx) => ({ ...r, shortCloseCount: Math.round(r.shortCloseCount * (0.85 + idx * 0.02)), pnlWithRebate: r.pnlWithRebate * 0.9 }))

const customerBase = {
  HATCGL: {
    profit: buildCustomers(1, 20, (i, login) => ({
      login: String(login),
      name: `盈利客户${i + 1}`,
      totalProfit: 12500 + (19 - i) * 820 + (i % 3) * 120,
      floatingPnl: (i % 4 === 0 ? -1 : 1) * (520 + i * 35),
      closeCount: 120 + (19 - i) * 18,
      closeLots: 85.2 + (19 - i) * 4.1
    })),
    loss: buildCustomers(2, 20, (i, login) => ({
      login: String(login),
      name: `亏损客户${i + 1}`,
      totalLoss: 9800 + (19 - i) * 650 + (i % 2) * 80,
      floatingPnl: (i % 5 === 0 ? 1 : -1) * (420 + i * 28),
      closeCount: 95 + (19 - i) * 15,
      closeLots: 62.5 + (19 - i) * 3.2
    })),
    highEquity: buildCustomers(3, 20, (i, login) => ({
      login: String(login),
      name: `高净值客户${i + 1}`,
      equity: 85000 + (19 - i) * 6200 + (i % 4) * 250,
      floatingPnl: (i % 3 === 0 ? 1 : -1) * (1800 + i * 120),
      periodTotalPnl: (i % 2 === 0 ? 1 : -1) * (5200 + (19 - i) * 320)
    })),
    floatingLoss: buildCustomers(4, 20, (i, login) => ({
      login: String(login),
      name: `浮亏客户${i + 1}`,
      floatingLoss: 5200 + (19 - i) * 420 + (i % 3) * 60
    })),
    floatingProfit: buildCustomers(5, 20, (i, login) => ({
      login: String(login),
      name: `浮盈客户${i + 1}`,
      floatingProfit: 4200 + (19 - i) * 380 + (i % 3) * 55
    })),
    commission: buildCustomers(6, 20, (i, login) => ({
      login: String(login),
      name: `佣金客户${i + 1}`,
      commission: 3200 + (19 - i) * 260 + (i % 2) * 45
    })),
    volume: buildCustomers(7, 20, (i, login) => ({
      login: String(login),
      name: `高平仓量客户${i + 1}`,
      volumeLots: 520 + (19 - i) * 45 + (i % 5) * 6
    }))
  },
  'HATC-HK': {
    profit: buildCustomers(11, 20, (i, login) => ({
      login: String(login),
      name: `盈利客户${i + 1}`,
      totalProfit: 9800 + (19 - i) * 720 + (i % 4) * 120,
      floatingPnl: (i % 4 === 0 ? -1 : 1) * (420 + i * 32),
      closeCount: 98 + (19 - i) * 16,
      closeLots: 72.3 + (19 - i) * 3.7
    })),
    loss: buildCustomers(12, 20, (i, login) => ({
      login: String(login),
      name: `亏损客户${i + 1}`,
      totalLoss: 8200 + (19 - i) * 580 + (i % 2) * 80,
      floatingPnl: (i % 5 === 0 ? 1 : -1) * (380 + i * 24),
      closeCount: 85 + (19 - i) * 14,
      closeLots: 55.1 + (19 - i) * 2.8
    })),
    highEquity: buildCustomers(13, 20, (i, login) => ({
      login: String(login),
      name: `高净值客户${i + 1}`,
      equity: 72500 + (19 - i) * 5200 + (i % 4) * 220,
      floatingPnl: (i % 3 === 0 ? 1 : -1) * (1520 + i * 110),
      periodTotalPnl: (i % 2 === 0 ? 1 : -1) * (4520 + (19 - i) * 280)
    })),
    floatingLoss: buildCustomers(14, 20, (i, login) => ({
      login: String(login),
      name: `浮亏客户${i + 1}`,
      floatingLoss: 4200 + (19 - i) * 360 + (i % 3) * 55
    })),
    floatingProfit: buildCustomers(15, 20, (i, login) => ({
      login: String(login),
      name: `浮盈客户${i + 1}`,
      floatingProfit: 3650 + (19 - i) * 320 + (i % 3) * 45
    })),
    commission: buildCustomers(16, 20, (i, login) => ({
      login: String(login),
      name: `佣金客户${i + 1}`,
      commission: 2850 + (19 - i) * 230 + (i % 2) * 35
    })),
    volume: buildCustomers(17, 20, (i, login) => ({
      login: String(login),
      name: `高平仓量客户${i + 1}`,
      volumeLots: 420 + (19 - i) * 38 + (i % 5) * 5
    }))
  }
}

const selectedCompanies = computed(() => {
  const company = querySnapshot.value.company
  if (company === 'ALL') return ['HATCGL', 'HATC-HK']
  return [company]
})

const sumNumber = (rows, key) => rows.reduce((acc, r) => acc + (Number(r[key]) || 0), 0)

const applyFactorToObject = (obj, factor, moneyKeys) => {
  const out = { ...obj }
  moneyKeys.forEach((k) => { out[k] = (Number(out[k]) || 0) * factor })
  return out
}

const overview = computed(() => {
  const keysMoney = ['equityNow', 'netDeposit', 'netCreditDeposit', 'closeInterest', 'closedPnl', 'rebate', 'floatingPnl', 'companyNetPnl', 'commissionAccountEquity', 'commissionAccountDeposit', 'commissionAccountWithdraw', 'fee', 'adjustment']
  const factor = currencyFactor.value
  const companies = selectedCompanies.value
  if (companies.length === 1) return applyFactorToObject(demo[companies[0]].overview, factor, keysMoney)

  const base = companies.map((c) => demo[c].overview)
  const merged = {
    equityNow: sumNumber(base, 'equityNow'),
    netDeposit: sumNumber(base, 'netDeposit'),
    netCreditDeposit: sumNumber(base, 'netCreditDeposit'),
    closeCount: sumNumber(base, 'closeCount'),
    closeLots: sumNumber(base, 'closeLots'),
    closeInterest: sumNumber(base, 'closeInterest'),
    closedPnl: sumNumber(base, 'closedPnl'),
    rebate: sumNumber(base, 'rebate'),
    floatingPnl: sumNumber(base, 'floatingPnl'),
    companyNetPnl: sumNumber(base, 'companyNetPnl'),
    commissionAccountEquity: sumNumber(base, 'commissionAccountEquity'),
    commissionAccountDeposit: sumNumber(base, 'commissionAccountDeposit'),
    commissionAccountWithdraw: sumNumber(base, 'commissionAccountWithdraw'),
    rebateNeedCheck: base.some((x) => x.rebateNeedCheck),
    fee: sumNumber(base, 'fee'),
    adjustment: sumNumber(base, 'adjustment')
  }
  return applyFactorToObject(merged, factor, keysMoney)
})

const overviewPrimary = computed(() => ([
  { key: 'equityNow', label: '现时净值', value: overview.value.equityNow, type: 'money' },
  { key: 'netDeposit', label: '净入金', value: overview.value.netDeposit, type: 'money' },
  { key: 'netCreditDeposit', label: '净信用入金', value: overview.value.netCreditDeposit, type: 'money' },
  { key: 'closeCount', label: '平仓笔数', value: overview.value.closeCount, type: 'int' },
  { key: 'closeLots', label: '平仓手数', value: overview.value.closeLots, type: 'lots' },
  { key: 'closeInterest', label: '平仓利息', value: overview.value.closeInterest, type: 'money', colorize: true },
  { key: 'closedPnl', label: '平仓盈亏', value: overview.value.closedPnl, type: 'money', colorize: true },
  { key: 'rebate', label: '返佣', value: overview.value.rebate, type: 'money' },
  { key: 'floatingPnl', label: '现时浮动盈亏', value: overview.value.floatingPnl, type: 'money', colorize: true },
  { key: 'companyNetPnl', label: '公司净盈亏', value: overview.value.companyNetPnl, type: 'money', colorize: true }
]))

const overviewSecondary = computed(() => ([
  { key: 'fee', label: '手续费', value: overview.value.fee, type: 'money' },
  { key: 'adjustment', label: '调整金额', value: overview.value.adjustment, type: 'money', colorize: true }
]))

const commissionAccountItems = computed(() => ([
  { key: 'commissionAccountEquity', label: '代理佣金账户净值', value: overview.value.commissionAccountEquity },
  { key: 'commissionAccountDeposit', label: '代理佣金账户总入金', value: overview.value.commissionAccountDeposit },
  { key: 'commissionAccountWithdraw', label: '代理佣金账户总出金', value: overview.value.commissionAccountWithdraw }
]))

const monthCumulative = computed(() => {
  const factor = currencyFactor.value
  const companies = selectedCompanies.value
  if (companies.length === 1) return applyFactorToObject(demo[companies[0]].month, factor, Object.keys(demo[companies[0]].month))
  const base = companies.map((c) => demo[c].month)
  const merged = {
    prevTotalPnl: sumNumber(base, 'prevTotalPnl'),
    rebate: sumNumber(base, 'rebate'),
    periodTotalPnl: sumNumber(base, 'periodTotalPnl'),
    cumulativeTotalPnl: sumNumber(base, 'cumulativeTotalPnl'),
    cumulativeNetPnl: sumNumber(base, 'cumulativeNetPnl')
  }
  return applyFactorToObject(merged, factor, Object.keys(merged))
})

const monthCumulativeItems = computed(() => ([
  { key: 'prevTotalPnl', label: '前期累计总盈亏', value: monthCumulative.value.prevTotalPnl, colorize: true },
  { key: 'rebate', label: '本期返佣', value: monthCumulative.value.rebate },
  { key: 'periodTotalPnl', label: '本期总盈亏', value: monthCumulative.value.periodTotalPnl, colorize: true },
  { key: 'cumulativeTotalPnl', label: '累计总盈亏', value: monthCumulative.value.cumulativeTotalPnl, colorize: true },
  { key: 'cumulativeNetPnl', label: '累计净盈亏', value: monthCumulative.value.cumulativeNetPnl, colorize: true }
]))

const trendMode = ref('monthly')
const trendCompany = ref('HATCGL')
const trendMetric = ref('companyNetPnl')

const trendCompanyOptions = [
  { value: 'HATCGL', label: 'HATCGL' },
  { value: 'HATC-HK', label: 'HATC-HK' }
]

const trendMetricOptions = [
  { value: 'companyNetPnl', label: '公司净盈亏' },
  { value: 'netDeposit', label: '净入金' },
  { value: 'closedPnl', label: '平仓盈亏' },
  { value: 'rebate', label: '返佣' }
]

const trendMetricLabel = computed(() => trendMetricOptions.find((x) => x.value === trendMetric.value)?.label || trendMetric.value)

const trendRawRows = computed(() => {
  const c = trendCompany.value
  const factor = currencyFactor.value
  const rows = trendMode.value === 'monthly' ? demo[c].trendMonthly : demo[c].trendYearly
  const normalized = rows.map((r) => ({
    ...r,
    netDeposit: r.netDeposit * factor,
    closedPnl: r.closedPnl * factor,
    rebate: r.rebate * factor,
    companyNetPnl: r.companyNetPnl * factor
  }))
  return normalized
})

const trendTableRows = computed(() => trendRawRows.value.map((r) => ({ ...r })))

const currentTrendValue = computed(() => {
  const rows = trendRawRows.value
  if (!rows.length) return 0
  const last = rows[rows.length - 1]
  return last[trendMetric.value] || 0
})

const trendSeries = computed(() => trendRawRows.value.map((r) => Number(r[trendMetric.value]) || 0))

const trendChartWidth = 600
const trendChartHeight = 120

const trendChartPoints = computed(() => {
  const values = trendSeries.value
  if (!values.length) return ''
  const paddingX = 10
  const paddingY = 10
  const minVal = Math.min(...values)
  const maxVal = Math.max(...values)
  const range = maxVal - minVal || 1
  const innerW = trendChartWidth - paddingX * 2
  const innerH = trendChartHeight - paddingY * 2
  const stepX = values.length > 1 ? innerW / (values.length - 1) : 0
  return values.map((v, idx) => {
    const x = paddingX + idx * stepX
    const y = paddingY + (maxVal - v) / range * innerH
    return `${x.toFixed(1)},${y.toFixed(1)}`
  }).join(' ')
})

const trendChartLastPoint = computed(() => {
  const values = trendSeries.value
  if (!values.length) return null
  const paddingX = 10
  const paddingY = 10
  const minVal = Math.min(...values)
  const maxVal = Math.max(...values)
  const range = maxVal - minVal || 1
  const innerW = trendChartWidth - paddingX * 2
  const innerH = trendChartHeight - paddingY * 2
  const stepX = values.length > 1 ? innerW / (values.length - 1) : 0
  const idx = values.length - 1
  const v = values[idx]
  return {
    x: paddingX + idx * stepX,
    y: paddingY + (maxVal - v) / range * innerH
  }
})

const customerTab = ref('profit')
const customerTabs = [
  { key: 'profit', label: 'Top 20 盈利客户' },
  { key: 'loss', label: 'Top 20 亏损客户' },
  { key: 'highEquity', label: 'Top 20 高净值客户' },
  { key: 'floatingLoss', label: 'Top 20 浮动亏损客户' },
  { key: 'floatingProfit', label: 'Top 20 浮动盈利客户' },
  { key: 'commission', label: 'Top 20 佣金收益客户' },
  { key: 'volume', label: 'Top 20 最高平仓量客户' }
]

const mergeTopCustomers = (key) => {
  const companies = selectedCompanies.value
  const rows = companies.flatMap((c) => customerBase[c][key])
  if (key === 'profit') {
    return [...rows].sort((a, b) => b.totalProfit - a.totalProfit).slice(0, 20)
  }
  if (key === 'loss') {
    return [...rows].sort((a, b) => b.totalLoss - a.totalLoss).slice(0, 20)
  }
  if (key === 'highEquity') {
    return [...rows].sort((a, b) => b.equity - a.equity).slice(0, 20)
  }
  if (key === 'floatingLoss') {
    return [...rows].sort((a, b) => b.floatingLoss - a.floatingLoss).slice(0, 20)
  }
  if (key === 'floatingProfit') {
    return [...rows].sort((a, b) => b.floatingProfit - a.floatingProfit).slice(0, 20)
  }
  if (key === 'commission') {
    return [...rows].sort((a, b) => b.commission - a.commission).slice(0, 20)
  }
  return [...rows].sort((a, b) => b.volumeLots - a.volumeLots).slice(0, 20)
}

const customerTableData = computed(() => {
  const factor = currencyFactor.value
  const rows = mergeTopCustomers(customerTab.value)
  const moneyKeys = ['totalProfit', 'totalLoss', 'equity', 'floatingPnl', 'periodTotalPnl', 'floatingLoss', 'floatingProfit', 'commission']
  return rows.map((r) => {
    const out = { ...r }
    moneyKeys.forEach((k) => {
      if (out[k] === undefined) return
      out[k] = out[k] * factor
    })
    return out
  })
})

const productSortKey = ref('volumeLots')
const productSortOrder = ref('desc')

const productRows = computed(() => {
  const companies = selectedCompanies.value
  const factor = currencyFactor.value
  const list = companies.flatMap((c) => demo[c].products)
  const bySymbol = new Map()
  list.forEach((r) => {
    const existing = bySymbol.get(r.symbol)
    if (!existing) {
      bySymbol.set(r.symbol, { ...r })
      return
    }
    existing.closeCount += r.closeCount
    existing.volumeLots += r.volumeLots
    existing.volumeShare += r.volumeShare
    existing.pnlWithRebate += r.pnlWithRebate
  })
  const merged = [...bySymbol.values()].map((r) => ({
    ...r,
    pnlWithRebate: r.pnlWithRebate * factor
  }))
  const key = productSortKey.value
  const order = productSortOrder.value
  const sorted = [...merged].sort((a, b) => {
    const delta = (Number(a[key]) || 0) - (Number(b[key]) || 0)
    return order === 'asc' ? delta : -delta
  })
  const totalLots = sorted.reduce((acc, r) => acc + r.volumeLots, 0) || 1
  return sorted.map((r) => ({ ...r, volumeShare: r.volumeLots / totalLots }))
})

const shortTradeTab = ref('customer')

const shortTradeCustomerRows = computed(() => {
  const companies = selectedCompanies.value
  const factor = currencyFactor.value
  const rows = companies.flatMap((c) => demo[c].shortTradeCustomer)
  const merged = rows.map((r) => ({
    ...r,
    shortPnl: r.shortPnl * factor,
    periodTotalPnl: r.periodTotalPnl * factor
  }))
  return merged.sort((a, b) => b.ratio - a.ratio)
})

const shortTradeProductRows = computed(() => {
  const companies = selectedCompanies.value
  const factor = currencyFactor.value
  const list = companies.flatMap((c) => demo[c].shortTradeProduct)
  const bySymbol = new Map()
  list.forEach((r) => {
    const existing = bySymbol.get(r.symbol)
    if (!existing) {
      bySymbol.set(r.symbol, { ...r })
      return
    }
    existing.shortCloseCount += r.shortCloseCount
    existing.pnlWithRebate += r.pnlWithRebate
    existing.ratio = Math.max(existing.ratio, r.ratio)
  })
  return [...bySymbol.values()].map((r) => ({ ...r, pnlWithRebate: r.pnlWithRebate * factor })).sort((a, b) => b.shortCloseCount - a.shortCloseCount)
})

const summaryTab = ref('monthly')

const stableUnit = (seed) => {
  const str = String(seed)
  let h = 0
  for (let i = 0; i < str.length; i += 1) {
    h = (h * 31 + str.charCodeAt(i)) % 1000000
  }
  return (h % 1000) / 1000
}

const summaryMonthlyRows = computed(() => {
  const companies = selectedCompanies.value
  const factor = currencyFactor.value
  const rows = companies.flatMap((c) => {
    const list = demo[c].trendMonthly
    const overviewBase = demo[c].overview
    return list.map((r) => ({
      period: r.period,
      company: r.company,
      equity: overviewBase.equityNow * (0.94 + stableUnit(`${r.period}|${r.company}|equity`) * 0.04),
      netDeposit: r.netDeposit,
      credit: overviewBase.netCreditDeposit * (0.8 + stableUnit(`${r.period}|${r.company}|credit`) * 0.4),
      closeCount: overviewBase.closeCount * (0.12 + stableUnit(`${r.period}|${r.company}|closeCount`) * 0.05),
      closeLots: overviewBase.closeLots * (0.12 + stableUnit(`${r.period}|${r.company}|closeLots`) * 0.05),
      fee: overviewBase.fee * (0.7 + stableUnit(`${r.period}|${r.company}|fee`) * 0.5),
      interest: overviewBase.closeInterest * (0.7 + stableUnit(`${r.period}|${r.company}|interest`) * 0.5),
      closedPnl: r.closedPnl,
      rebate: r.rebate,
      floatingPnl: overviewBase.floatingPnl * (0.7 + stableUnit(`${r.period}|${r.company}|floatingPnl`) * 0.5),
      companyNetPnl: r.companyNetPnl,
      commissionAccountEquity: overviewBase.commissionAccountEquity * (0.9 + stableUnit(`${r.period}|${r.company}|commissionAccountEquity`) * 0.2)
    }))
  })
  return rows.map((r) => ({
    ...r,
    equity: r.equity * factor,
    netDeposit: r.netDeposit * factor,
    credit: r.credit * factor,
    fee: r.fee * factor,
    interest: r.interest * factor,
    closedPnl: r.closedPnl * factor,
    rebate: r.rebate * factor,
    floatingPnl: r.floatingPnl * factor,
    companyNetPnl: r.companyNetPnl * factor,
    commissionAccountEquity: r.commissionAccountEquity * factor
  }))
})

const summaryYearlyRows = computed(() => {
  const companies = selectedCompanies.value
  const factor = currencyFactor.value
  const rows = companies.flatMap((c) => demo[c].trendYearly.map((r) => ({
    period: r.period,
    company: r.company,
    netDeposit: r.netDeposit * factor,
    closedPnl: r.closedPnl * factor,
    rebate: r.rebate * factor,
    floatingPnl: (r.floatingPnl || 0) * factor,
    companyNetPnl: r.companyNetPnl * factor
  })))
  return rows
})

const numberClass = (val) => {
  const n = Number(val) || 0
  if (n > 0) return 'text-green-600'
  if (n < 0) return 'text-red-600'
  return 'text-gray-700'
}

const formatMoney = (num) => {
  const n = Number(num) || 0
  return n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

const formatInt = (num) => {
  const n = Number(num) || 0
  return Math.round(n).toLocaleString('en-US')
}

const formatLots = (num) => {
  const n = Number(num) || 0
  return n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

const formatPercent = (ratio) => {
  const n = Number(ratio) || 0
  return `${(n * 100).toFixed(2)}%`
}
</script>

<style scoped>
:deep(.report-tabs .el-tabs__item) { font-size: 12px; }
</style>
