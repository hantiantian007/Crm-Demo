<template>
  <div class="flex h-full bg-mainBg overflow-hidden w-full">
    <div class="flex-1 flex flex-col min-w-0 bg-gray-50 overflow-hidden p-4 custom-scrollbar overflow-y-auto w-full">
      <div class="flex-1 p-4 bg-gray-50 flex gap-4 overflow-hidden">
        <RelationTree width-class="w-[232px]" :data="relationTreeData" @node-click="handleRelationNodeClick" />

        <div class="flex-1 flex flex-col gap-4 overflow-y-auto no-scrollbar min-w-0">
          <div class="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
            <div class="text-sm font-bold text-gray-800 mb-3">筛选</div>
            <div class="grid grid-cols-1 xl:grid-cols-12 gap-3 text-xs">
              <div class="flex items-center gap-2 xl:col-span-2">
                <div class="text-gray-600 w-[72px] shrink-0 text-right">活动名称：</div>
                <select v-model="form.activityName" class="border border-gray-300 rounded px-2 py-2 outline-none flex-1 bg-white">
                  <option v-for="o in activityOptions" :key="o" :value="o">{{ o }}</option>
                </select>
              </div>

              <div class="flex items-center gap-2 xl:col-span-4">
                <div class="text-gray-600 w-[72px] shrink-0 text-right">活动时间：</div>
                <div class="flex flex-1 items-center border border-gray-300 rounded overflow-hidden bg-white">
                  <input v-model="form.dateStart" class="px-3 py-2 outline-none flex-1 text-center" placeholder="开始日期(YYYY-MM-DD)" type="text" />
                  <span class="bg-gray-50 px-2 py-2 text-gray-400 border-x border-gray-300">到</span>
                  <input v-model="form.dateEnd" class="px-3 py-2 outline-none flex-1 text-center" placeholder="结束日期(YYYY-MM-DD)" type="text" />
                </div>
              </div>

              <div class="flex items-center gap-2 xl:col-span-2">
                <div class="text-gray-600 w-[72px] shrink-0 text-right">参与状态：</div>
                <select v-model="form.status" class="border border-gray-300 rounded px-2 py-2 outline-none flex-1 bg-white">
                  <option v-for="o in statusOptions" :key="o" :value="o">{{ o }}</option>
                </select>
              </div>

              <div class="flex items-center gap-2 xl:col-span-2">
                <div class="text-gray-600 w-[72px] shrink-0 text-right">统计范围：</div>
                <select v-model="form.scope" class="border border-gray-300 rounded px-2 py-2 outline-none flex-1 bg-white">
                  <option value="直属">直属</option>
                  <option value="团队">团队</option>
                </select>
              </div>

              <div class="flex items-center justify-end gap-3 xl:col-span-2">
                <button
                  type="button"
                  class="px-3 py-2 rounded text-xs text-gray-600 hover:text-gray-800 hover:bg-gray-50 border border-gray-200 transition-colors"
                  @click="moreOpen = !moreOpen"
                >
                  更多筛选
                </button>
                <button class="bg-white border border-primaryBtn text-primaryBtn hover:bg-primaryBtn hover:text-white px-6 py-2 rounded text-xs transition-colors shadow-sm font-medium" @click="applySearch">
                  查询
                </button>
              </div>
            </div>

            <div v-if="moreOpen" class="mt-3 pt-3 border-t border-gray-100">
              <div class="grid grid-cols-1 xl:grid-cols-12 gap-3 text-xs">
                <div class="flex items-center gap-2 xl:col-span-4">
                  <div class="text-gray-600 w-[84px] shrink-0 text-right">代理账号/名称：</div>
                  <input v-model="form.agentKeyword" class="border border-gray-300 rounded px-3 py-2 outline-none flex-1" placeholder="账号或名称" type="text" />
                </div>

                <div class="flex items-center gap-2 xl:col-span-5">
                  <div class="text-gray-600 w-[84px] shrink-0 text-right">客户/MT账号：</div>
                  <input v-model="form.customerKeyword" class="border border-gray-300 rounded px-3 py-2 outline-none flex-1" placeholder="客户ID/姓名/MT" type="text" />
                </div>

                <div class="flex items-center justify-end xl:col-span-3">
                  <button class="bg-white border border-gray-300 text-gray-600 hover:bg-gray-50 px-6 py-2 rounded text-xs transition-colors shadow-sm font-medium" @click="resetSearch">
                    重置
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div class="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-3">
            <div
              v-for="card in kpiCards"
              :key="card.key"
              :class="[
                'rounded-lg shadow-sm border p-3',
                card.level === 'primary' ? 'bg-[#d1a84f]/5 border-[#d1a84f]/25' : card.level === 'secondary' ? 'bg-white border-gray-100' : 'bg-white border-gray-100'
              ]"
            >
              <div :class="['text-[11px]', card.level === 'primary' ? 'text-[#b8903f] font-medium' : card.level === 'secondary' ? 'text-gray-600' : 'text-gray-500']">
                {{ card.label }}
              </div>
              <div :class="['mt-1 font-bold font-mono', card.level === 'primary' ? 'text-xl text-gray-900' : card.level === 'secondary' ? 'text-base text-gray-800' : 'text-sm text-gray-700']">
                {{ card.value }}
              </div>
              <div v-if="card.sub" class="mt-0.5 text-[11px] text-gray-400">{{ card.sub }}</div>
            </div>
          </div>

          <div class="text-xs text-gray-500 bg-white border border-gray-100 rounded-lg px-4 py-2 flex items-center justify-between">
            <div class="flex items-center gap-4 flex-wrap">
              <div>接近达标 <span class="font-mono text-gray-700 font-medium">{{ formatInt(kpi.nearGoalCustomers) }}</span></div>
              <div>平仓盈亏(含Swap) $<span class="font-mono text-gray-700 font-medium">{{ formatMoney(kpi.closedPnl) }}</span></div>
              <div>返佣金额 $<span class="font-mono text-gray-700 font-medium">{{ formatMoney(kpi.commission) }}</span></div>
              <div>待发奖励 $<span class="font-mono text-gray-700 font-medium">{{ formatMoney(kpi.rewardPending) }}</span></div>
              <div>已发奖励 $<span class="font-mono text-gray-700 font-medium">{{ formatMoney(kpi.rewardIssued) }}</span></div>
            </div>
            <span class="text-[11px] text-gray-500 bg-gray-100 border border-gray-200 px-2 py-0.5 rounded">Mock</span>
          </div>

          <div class="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden flex-1 flex flex-col">
            <div class="px-5 py-4 border-b border-gray-100 flex items-center justify-between gap-3">
              <div class="text-sm font-bold text-gray-800">代理汇总</div>
              <span class="text-[11px] text-gray-500 bg-gray-100 border border-gray-200 px-2 py-0.5 rounded">按代理活动效果</span>
            </div>

            <div class="overflow-x-auto flex-1 no-scrollbar">
              <table class="w-full text-xs min-w-[1220px]">
                <thead class="bg-gray-50 text-gray-600 border-b border-gray-100 sticky top-0 z-10">
                  <tr>
                    <th class="text-left font-medium px-4 py-3 whitespace-nowrap w-[110px]">代理账号</th>
                    <th class="text-left font-medium px-4 py-3 whitespace-nowrap w-[110px]">代理名称</th>
                    <th class="text-right font-medium px-4 py-3 whitespace-nowrap w-[80px]">客户数</th>
                    <th class="text-right font-medium px-4 py-3 whitespace-nowrap w-[100px]">参与客户</th>
                    <th class="text-right font-medium px-4 py-3 whitespace-nowrap w-[90px]">参与率</th>
                    <th class="text-right font-medium px-4 py-3 whitespace-nowrap w-[80px]">已达标</th>
                    <th class="text-right font-medium px-4 py-3 whitespace-nowrap w-[90px]">达标率</th>
                    <th class="text-right font-medium px-4 py-3 whitespace-nowrap w-[140px]">净入金($)</th>
                    <th class="text-right font-medium px-4 py-3 whitespace-nowrap w-[120px]">交易量(Lot)</th>
                    <th class="text-right font-medium px-4 py-3 whitespace-nowrap w-[150px]">平仓盈亏($)</th>
                    <th class="text-right font-medium px-4 py-3 whitespace-nowrap w-[120px]">返佣($)</th>
                    <th class="text-left font-medium px-4 py-3 whitespace-nowrap w-[110px]">操作</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-gray-50 text-gray-700">
                  <tr v-for="row in agentRows" :key="row.agentId" class="hover:bg-gray-50/60 transition-colors">
                    <td class="px-4 py-3 font-mono text-gray-800">
                      <button class="text-blue-600 hover:text-blue-800 hover:underline" type="button" @click="openDetail(row.agentId)">
                        {{ row.agentId }}
                      </button>
                    </td>
                    <td class="px-4 py-3 text-gray-800 font-medium">{{ row.agentName }}</td>
                    <td class="px-4 py-3 text-right font-mono">{{ formatInt(row.customersTotal) }}</td>
                    <td class="px-4 py-3 text-right font-mono">{{ formatInt(row.participantCustomers) }}</td>
                    <td class="px-4 py-3 text-right font-mono">{{ formatPercent(row.participantRate) }}</td>
                    <td class="px-4 py-3 text-right font-mono">{{ formatInt(row.achievedCustomers) }}</td>
                    <td class="px-4 py-3 text-right font-mono">{{ formatPercent(row.achievedRate) }}</td>
                    <td class="px-4 py-3 text-right font-mono">{{ formatMoney(row.netDeposit) }}</td>
                    <td class="px-4 py-3 text-right font-mono">{{ formatLots(row.lots) }}</td>
                    <td class="px-4 py-3 text-right font-mono" :class="row.closedPnl >= 0 ? 'text-emerald-700' : 'text-red-600'">{{ formatMoney(row.closedPnl) }}</td>
                    <td class="px-4 py-3 text-right font-mono">{{ formatMoney(row.commission) }}</td>
                    <td class="px-4 py-3">
                      <button class="px-3 py-1.5 rounded bg-blue-50 hover:bg-blue-100 text-blue-600 text-xs font-medium transition-colors border border-blue-100" type="button" @click="openDetail(row.agentId)">
                        查看明细
                      </button>
                    </td>
                  </tr>

                  <tr v-if="agentRows.length === 0">
                    <td class="px-4 py-12 text-center text-gray-400" colspan="12">无匹配数据</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <el-drawer v-model="detailVisible" direction="rtl" size="72%" :title="detailTitle" class="custom-prd-drawer">
            <div class="h-full w-full flex flex-col gap-4">
              <div class="bg-white rounded-lg border border-gray-100 p-4">
                <div class="flex items-center justify-between gap-3">
                  <div class="text-sm font-bold text-gray-800">客户活动明细</div>
                  <div class="text-xs text-gray-400">目标：净入金 ${{ formatMoney(TARGET_NET_DEPOSIT) }} / 交易 {{ formatLots(TARGET_LOTS) }} Lot</div>
                </div>
                <div class="mt-2 text-xs text-gray-500 flex flex-wrap gap-x-5 gap-y-1">
                  <div>口径：从客户参与成功时间起算，截止 min(活动结束, 当前)</div>
                  <div>参与MT数 <span class="font-mono text-gray-700 font-medium">{{ formatInt(selectedAgentSummary.participantMtAccounts) }}</span></div>
                  <div>进行中 <span class="font-mono text-gray-700 font-medium">{{ formatInt(selectedAgentSummary.inProgressCustomers) }}</span></div>
                  <div>接近达标 <span class="font-mono text-gray-700 font-medium">{{ formatInt(selectedAgentSummary.nearGoalCustomers) }}</span></div>
                  <div>平仓盈亏(含Swap) $<span class="font-mono text-gray-700 font-medium">{{ formatMoney(selectedAgentSummary.closedPnl) }}</span></div>
                  <div>返佣 $<span class="font-mono text-gray-700 font-medium">{{ formatMoney(selectedAgentSummary.commission) }}</span></div>
                  <div>待发奖励 $<span class="font-mono text-gray-700 font-medium">{{ formatMoney(selectedAgentSummary.rewardPending) }}</span></div>
                  <div>已发奖励 $<span class="font-mono text-gray-700 font-medium">{{ formatMoney(selectedAgentSummary.rewardIssued) }}</span></div>
                </div>
                <div class="mt-3 grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
                  <div class="bg-gray-50 rounded border border-gray-100 p-3">
                    <div class="text-[11px] text-gray-500">参与客户数</div>
                    <div class="mt-1 font-mono text-base font-bold text-gray-800">{{ formatInt(detailKpi.participantCustomers) }}</div>
                  </div>
                  <div class="bg-gray-50 rounded border border-gray-100 p-3">
                    <div class="text-[11px] text-gray-500">达标客户数</div>
                    <div class="mt-1 font-mono text-base font-bold text-gray-800">{{ formatInt(detailKpi.achievedCustomers) }}</div>
                  </div>
                  <div class="bg-gray-50 rounded border border-gray-100 p-3">
                    <div class="text-[11px] text-gray-500">活动净入金($)</div>
                    <div class="mt-1 font-mono text-base font-bold text-gray-800">{{ formatMoney(detailKpi.netDeposit) }}</div>
                  </div>
                  <div class="bg-gray-50 rounded border border-gray-100 p-3">
                    <div class="text-[11px] text-gray-500">活动交易量(Lot)</div>
                    <div class="mt-1 font-mono text-base font-bold text-gray-800">{{ formatLots(detailKpi.lots) }}</div>
                  </div>
                </div>
              </div>

              <div class="bg-white rounded-lg border border-gray-100 overflow-hidden flex-1 flex flex-col">
                <div class="px-4 py-3 border-b border-gray-100 flex items-center justify-between">
                  <div class="text-sm font-bold text-gray-800">明细列表</div>
                  <div class="text-xs text-gray-400">进度条最高显示 100%，数值显示真实值</div>
                </div>

                <div class="overflow-x-auto flex-1 no-scrollbar">
                  <table class="w-full text-xs min-w-[1350px]">
                    <thead class="bg-gray-50 text-gray-600 border-b border-gray-100 sticky top-0 z-10">
                      <tr>
                        <th class="text-left font-medium px-4 py-3">客户ID</th>
                        <th class="text-left font-medium px-4 py-3">客户姓名</th>
                        <th class="text-left font-medium px-4 py-3">MT账号</th>
                        <th class="text-left font-medium px-4 py-3">活动名称</th>
                        <th class="text-left font-medium px-4 py-3">参与时间</th>
                        <th class="text-left font-medium px-4 py-3">净入金及进度</th>
                        <th class="text-left font-medium px-4 py-3">交易手数及进度</th>
                        <th class="text-right font-medium px-4 py-3">平仓盈亏($)</th>
                        <th class="text-right font-medium px-4 py-3">返佣($)</th>
                        <th class="text-left font-medium px-4 py-3">状态</th>
                        <th class="text-right font-medium px-4 py-3">奖励金额($)</th>
                        <th class="text-left font-medium px-4 py-3">奖励状态</th>
                        <th class="text-left font-medium px-4 py-3">奖励时间</th>
                      </tr>
                    </thead>
                    <tbody class="divide-y divide-gray-50 text-gray-700">
                      <tr v-for="d in detailRows" :key="d.mtAccount + '-' + d.joinedAt" class="hover:bg-gray-50/60 transition-colors">
                        <td class="px-4 py-3 font-mono text-gray-800">{{ d.customerId }}</td>
                        <td class="px-4 py-3 text-gray-800 font-medium">
                          <div class="flex items-center gap-2">
                            <span>{{ d.customerName }}</span>
                            <span v-if="d.nearGoal" class="text-[11px] px-2 py-0.5 rounded bg-amber-50 text-amber-700 border border-amber-200">接近达标</span>
                          </div>
                        </td>
                        <td class="px-4 py-3 font-mono">{{ d.mtAccount }}</td>
                        <td class="px-4 py-3">{{ d.activityName }}</td>
                        <td class="px-4 py-3 font-mono text-gray-600">{{ d.joinedAt }}</td>
                        <td class="px-4 py-3">
                          <div class="flex flex-col gap-1">
                            <div class="font-mono text-gray-800">${{ formatMoney(d.netDeposit) }} / ${{ formatMoney(TARGET_NET_DEPOSIT) }}</div>
                            <div class="h-1.5 rounded bg-gray-100 overflow-hidden">
                              <div class="h-full bg-blue-500" :style="{ width: d.netDepositPct + '%' }"></div>
                            </div>
                            <div class="text-[11px] text-gray-400 font-mono">{{ d.netDepositPct }}%</div>
                          </div>
                        </td>
                        <td class="px-4 py-3">
                          <div class="flex flex-col gap-1">
                            <div class="font-mono text-gray-800">{{ formatLots(d.lots) }} / {{ formatLots(TARGET_LOTS) }} Lot</div>
                            <div class="h-1.5 rounded bg-gray-100 overflow-hidden">
                              <div class="h-full bg-emerald-500" :style="{ width: d.lotsPct + '%' }"></div>
                            </div>
                            <div class="text-[11px] text-gray-400 font-mono">{{ d.lotsPct }}%</div>
                          </div>
                        </td>
                        <td class="px-4 py-3 text-right font-mono" :class="d.closedPnl >= 0 ? 'text-emerald-700' : 'text-red-600'">{{ formatMoney(d.closedPnl) }}</td>
                        <td class="px-4 py-3 text-right font-mono">{{ formatMoney(d.commission) }}</td>
                        <td class="px-4 py-3">
                          <span class="inline-flex items-center gap-2">
                            <span :class="['w-2 h-2 rounded-full', statusDotClass(d.status)]"></span>
                            <span :class="statusTextClass(d.status)">{{ d.status }}</span>
                          </span>
                        </td>
                        <td class="px-4 py-3 text-right font-mono">{{ d.rewardAmount === null ? '-' : formatMoney(d.rewardAmount) }}</td>
                        <td class="px-4 py-3">{{ d.rewardStatus }}</td>
                        <td class="px-4 py-3 font-mono text-gray-600">{{ d.rewardTime }}</td>
                      </tr>

                      <tr v-if="detailRows.length === 0">
                        <td class="px-4 py-12 text-center text-gray-400" colspan="13">无明细数据</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </el-drawer>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, reactive, ref } from 'vue'
import RelationTree from '@/components/RelationTree.vue'
import { relationTreeDemoData } from '@/mocks/relation-tree-demo'

const TARGET_NET_DEPOSIT = 1000
const TARGET_LOTS = 10
const ACTIVITY_END_AT = '2026-09-28 23:59:59'

const activityOptions = ['星际起航免费开卡']
const statusOptions = ['全部', '进行中', '已达标', '待发放', '已发放']

const form = reactive({
  activityName: activityOptions[0],
  dateStart: '',
  dateEnd: '',
  agentKeyword: '',
  customerKeyword: '',
  status: '全部',
  scope: '直属'
})

const moreOpen = ref(false)
const applied = ref({ ...form })

const applySearch = () => {
  applied.value = { ...form }
}

const resetSearch = () => {
  form.activityName = activityOptions[0]
  form.dateStart = ''
  form.dateEnd = ''
  form.agentKeyword = ''
  form.customerKeyword = ''
  form.status = '全部'
  form.scope = '直属'
  selectedRelation.value = null
  moreOpen.value = false
  applied.value = { ...form }
}

const normalize = (v) => String(v ?? '').trim().toLowerCase()

const parseDate = (v) => {
  const s = String(v ?? '').trim()
  if (!s) return null
  const d = new Date(s.includes('T') ? s : s.includes(' ') ? s.replace(' ', 'T') : s)
  return Number.isNaN(d.getTime()) ? null : d
}

const scopeKey = computed(() => (applied.value.scope === '团队' ? 'team' : 'direct'))

const computeNearGoalByEntry = (d) => {
  const netDepositPct = Math.min(100, Math.max(0, Math.round((Number(d.netDeposit || 0) / TARGET_NET_DEPOSIT) * 100)))
  const lotsPct = Math.min(100, Math.max(0, Math.round((Number(d.lots || 0) / TARGET_LOTS) * 100)))
  return netDepositPct >= 80 || lotsPct >= 80
}

const relationTreeData = computed(() => {
  return relationTreeDemoData
})

const relationDescendants = computed(() => {
  const map = new Map()

  const walk = (node) => {
    if (!node || node.type !== 'ib') return []
    let res = []
    const children = Array.isArray(node.children) ? node.children : []
    for (const ch of children) {
      if (ch.type === 'ib') {
        res.push(ch.id)
        res = res.concat(walk(ch))
      }
    }
    map.set(node.id, res)
    return res
  }

  const roots = relationTreeData.value || []
  for (const r of roots) walk(r)
  return map
})

const selectedRelation = ref(null)

const handleRelationNodeClick = (node) => {
  selectedRelation.value = node

  if (node?.type === 'client') {
    form.customerKeyword = node.customerId || node.id
    applied.value = { ...form }
  }
}

const mockScopes = {
  direct: [
    {
      agentId: 'IB1001',
      agentName: '华安',
      customersTotal: 120,
      entries: [
        { customerId: 'C10001', customerName: '张三', mtAccount: '8100458', activityName: '星际起航免费开卡', joinedAt: '2026-09-06 10:12:00', netDeposit: 820.5, lots: 7.6, closedPnl: 128.35, commission: 12.5, rewardAmount: null, rewardStatus: '-', rewardTime: '-' },
        { customerId: 'C10002', customerName: '李四', mtAccount: '8100477', activityName: '星际起航免费开卡', joinedAt: '2026-09-05 18:42:11', netDeposit: 1240.0, lots: 12.2, closedPnl: -45.12, commission: 22.8, rewardAmount: 50.0, rewardStatus: '待发放', rewardTime: '-' },
        { customerId: 'C10003', customerName: '王五', mtAccount: '8100520', activityName: '星际起航免费开卡', joinedAt: '2026-09-03 09:05:32', netDeposit: 300.0, lots: 1.45, closedPnl: 10.02, commission: 3.2, rewardAmount: null, rewardStatus: '-', rewardTime: '-' },
        { customerId: 'C10004', customerName: '赵六', mtAccount: '8100601', activityName: '星际起航免费开卡', joinedAt: '2026-09-02 12:00:00', netDeposit: 1000.0, lots: 10.0, closedPnl: 210.0, commission: 18.0, rewardAmount: 30.0, rewardStatus: '已发放', rewardTime: '2026-09-04 14:20:00' }
      ]
    },
    {
      agentId: 'IB1020',
      agentName: 'jack',
      customersTotal: 55,
      entries: [
        { customerId: 'C20011', customerName: '陈一', mtAccount: '8300248', activityName: '星际起航免费开卡', joinedAt: '2026-09-07 11:10:00', netDeposit: 980.0, lots: 9.95, closedPnl: 80.55, commission: 16.4, rewardAmount: null, rewardStatus: '-', rewardTime: '-' },
        { customerId: 'C20012', customerName: '周二', mtAccount: '8300255', activityName: '星际起航免费开卡', joinedAt: '2026-09-01 08:03:22', netDeposit: 1500.0, lots: 10.0, closedPnl: 300.1, commission: 35.0, rewardAmount: 50.0, rewardStatus: '已发放', rewardTime: '2026-09-08 09:10:11' },
        { customerId: 'C20013', customerName: '吴三', mtAccount: '8300319', activityName: '星际起航免费开卡', joinedAt: '2026-09-08 15:26:10', netDeposit: 600.0, lots: 3.2, closedPnl: -12.3, commission: 6.7, rewardAmount: null, rewardStatus: '-', rewardTime: '-' },
        { customerId: 'C20012', customerName: '周二', mtAccount: '8300266', activityName: '星际起航免费开卡', joinedAt: '2026-09-01 08:03:22', netDeposit: 200.0, lots: 0.2, closedPnl: 2.01, commission: 0.3, rewardAmount: null, rewardStatus: '-', rewardTime: '-' }
      ]
    }
  ],
  team: [
    {
      agentId: 'IB1001',
      agentName: '华安',
      customersTotal: 180,
      entries: [
        { customerId: 'C10001', customerName: '张三', mtAccount: '8100458', activityName: '星际起航免费开卡', joinedAt: '2026-09-06 10:12:00', netDeposit: 820.5, lots: 7.6, closedPnl: 128.35, commission: 12.5, rewardAmount: null, rewardStatus: '-', rewardTime: '-' },
        { customerId: 'C10002', customerName: '李四', mtAccount: '8100477', activityName: '星际起航免费开卡', joinedAt: '2026-09-05 18:42:11', netDeposit: 1240.0, lots: 12.2, closedPnl: -45.12, commission: 22.8, rewardAmount: 50.0, rewardStatus: '待发放', rewardTime: '-' },
        { customerId: 'C10005', customerName: '孙七', mtAccount: '8100702', activityName: '星际起航免费开卡', joinedAt: '2026-09-04 19:00:00', netDeposit: 1050.0, lots: 10.4, closedPnl: 90.0, commission: 19.0, rewardAmount: 50.0, rewardStatus: '已发放', rewardTime: '2026-09-10 10:00:00' }
      ]
    },
    {
      agentId: 'IB1020',
      agentName: 'jack',
      customersTotal: 88,
      entries: [
        { customerId: 'C20011', customerName: '陈一', mtAccount: '8300248', activityName: '星际起航免费开卡', joinedAt: '2026-09-07 11:10:00', netDeposit: 980.0, lots: 9.95, closedPnl: 80.55, commission: 16.4, rewardAmount: null, rewardStatus: '-', rewardTime: '-' },
        { customerId: 'C20012', customerName: '周二', mtAccount: '8300255', activityName: '星际起航免费开卡', joinedAt: '2026-09-01 08:03:22', netDeposit: 1500.0, lots: 10.0, closedPnl: 300.1, commission: 35.0, rewardAmount: 50.0, rewardStatus: '已发放', rewardTime: '2026-09-08 09:10:11' }
      ]
    },
    {
      agentId: 'IB1108',
      agentName: 'Mikey',
      customersTotal: 66,
      entries: [
        { customerId: 'C30021', customerName: '郑八', mtAccount: '8400101', activityName: '星际起航免费开卡', joinedAt: '2026-09-02 16:21:00', netDeposit: 400.0, lots: 8.4, closedPnl: 15.2, commission: 7.1, rewardAmount: null, rewardStatus: '-', rewardTime: '-' },
        { customerId: 'C30022', customerName: '钱九', mtAccount: '8400120', activityName: '星际起航免费开卡', joinedAt: '2026-09-02 16:21:00', netDeposit: 1000.0, lots: 10.0, closedPnl: 55.0, commission: 12.0, rewardAmount: 50.0, rewardStatus: '待发放', rewardTime: '-' }
      ]
    }
  ]
}

const deriveStatus = (d) => {
  if (d.rewardStatus === '已发放') return '已发放'
  if (d.rewardStatus === '待发放') return '待发放'
  const achieved = Number(d.netDeposit) >= TARGET_NET_DEPOSIT && Number(d.lots) >= TARGET_LOTS
  return achieved ? '已达标' : '进行中'
}

const inDateRange = (joinedAt, start, end) => {
  if (!start && !end) return true
  const jt = parseDate(joinedAt)
  if (!jt) return true
  const st = start ? parseDate(start + 'T00:00:00') : null
  const et = end ? parseDate(end + 'T23:59:59') : null
  if (st && jt < st) return false
  if (et && jt > et) return false
  return true
}

const activityWindowEndAt = computed(() => {
  const now = new Date()
  const endAt = parseDate(ACTIVITY_END_AT)
  if (!endAt) return now
  return now < endAt ? now : endAt
})

const isWithinJoinWindow = (d) => {
  const joinAt = parseDate(d.joinedAt)
  if (!joinAt) return true
  return joinAt <= activityWindowEndAt.value
}

const filteredAgents = computed(() => {
  const list = mockScopes[scopeKey.value]
  const activityName = normalize(applied.value.activityName)
  const agentKw = normalize(applied.value.agentKeyword)
  const customerKw = normalize(applied.value.customerKeyword)
  const status = applied.value.status
  const start = String(applied.value.dateStart ?? '').trim()
  const end = String(applied.value.dateEnd ?? '').trim()

  const selected = selectedRelation.value
  const selectedAgentSet = (() => {
    if (!selected || selected.type !== 'ib') return null
    if (scopeKey.value === 'direct') return new Set([selected.id])
    const desc = relationDescendants.value.get(selected.id) || []
    return new Set([selected.id, ...desc])
  })()

  return list
    .map((a) => {
      const agentMatched = !agentKw || normalize(a.agentId).includes(agentKw) || normalize(a.agentName).includes(agentKw)
      const details = a.entries
        .filter((d) => !activityName || normalize(d.activityName) === activityName)
        .filter(isWithinJoinWindow)
        .filter((d) => inDateRange(d.joinedAt, start, end))
        .map((d) => ({ ...d, status: deriveStatus(d) }))
        .filter((d) => {
          if (status === '全部') return true
          return d.status === status
        })
        .filter((d) => {
          if (!customerKw) return true
          return normalize(d.customerId).includes(customerKw) || normalize(d.customerName).includes(customerKw) || normalize(d.mtAccount).includes(customerKw)
        })
      return { ...a, agentMatched, details }
    })
    .filter((a) => a.agentMatched)
    .filter((a) => {
      if (!selectedAgentSet) return true
      return selectedAgentSet.has(a.agentId)
    })
})

const buildCustomerBestStatus = (details) => {
  const rank = { '进行中': 1, '已达标': 2, '待发放': 3, '已发放': 4 }
  const map = new Map()
  for (const d of details) {
    const cur = map.get(d.customerId)
    if (!cur || rank[d.status] > rank[cur]) map.set(d.customerId, d.status)
  }
  return map
}

const agentRows = computed(() => {
  const rows = []
  for (const a of filteredAgents.value) {
    const details = a.details
    if (details.length === 0) continue
    const customersStatus = buildCustomerBestStatus(details)
    const participantCustomers = customersStatus.size
    const achievedCustomers = Array.from(customersStatus.values()).filter((s) => s !== '进行中').length
    const inProgressCustomers = participantCustomers - achievedCustomers
    const nearGoalCustomers = new Set()
    for (const d of details) {
      if (customersStatus.get(d.customerId) !== '进行中') continue
      if (!computeNearGoalByEntry(d)) continue
      nearGoalCustomers.add(d.customerId)
    }
    const netDeposit = details.reduce((sum, d) => sum + Number(d.netDeposit || 0), 0)
    const lots = details.reduce((sum, d) => sum + Number(d.lots || 0), 0)
    const closedPnl = details.reduce((sum, d) => sum + Number(d.closedPnl || 0), 0)
    const commission = details.reduce((sum, d) => sum + Number(d.commission || 0), 0)
    const rewardPending = details.reduce((sum, d) => sum + (d.rewardStatus === '待发放' ? Number(d.rewardAmount || 0) : 0), 0)
    const rewardIssued = details.reduce((sum, d) => sum + (d.rewardStatus === '已发放' ? Number(d.rewardAmount || 0) : 0), 0)
    rows.push({
      agentId: a.agentId,
      agentName: a.agentName,
      customersTotal: a.customersTotal,
      participantCustomers,
      participantRate: a.customersTotal ? participantCustomers / a.customersTotal : 0,
      participantMtAccounts: details.length,
      inProgressCustomers,
      nearGoalCustomers: nearGoalCustomers.size,
      achievedCustomers,
      achievedRate: participantCustomers ? achievedCustomers / participantCustomers : 0,
      netDeposit,
      lots,
      closedPnl,
      commission,
      rewardPending,
      rewardIssued
    })
  }
  return rows.sort((x, y) => y.participantCustomers - x.participantCustomers)
})

const kpi = computed(() => {
  const rows = agentRows.value
  const customersTotal = rows.reduce((sum, r) => sum + Number(r.customersTotal || 0), 0)
  const participantCustomers = rows.reduce((sum, r) => sum + Number(r.participantCustomers || 0), 0)
  const nearGoalCustomers = rows.reduce((sum, r) => sum + Number(r.nearGoalCustomers || 0), 0)
  const achievedCustomers = rows.reduce((sum, r) => sum + Number(r.achievedCustomers || 0), 0)
  const netDeposit = rows.reduce((sum, r) => sum + Number(r.netDeposit || 0), 0)
  const lots = rows.reduce((sum, r) => sum + Number(r.lots || 0), 0)
  const closedPnl = rows.reduce((sum, r) => sum + Number(r.closedPnl || 0), 0)
  const commission = rows.reduce((sum, r) => sum + Number(r.commission || 0), 0)
  const rewardPending = rows.reduce((sum, r) => sum + Number(r.rewardPending || 0), 0)
  const rewardIssued = rows.reduce((sum, r) => sum + Number(r.rewardIssued || 0), 0)
  return {
    customersTotal,
    participantCustomers,
    participantRate: customersTotal ? participantCustomers / customersTotal : 0,
    nearGoalCustomers,
    achievedCustomers,
    achievedRate: participantCustomers ? achievedCustomers / participantCustomers : 0,
    netDeposit,
    lots,
    closedPnl,
    commission,
    rewardPending,
    rewardIssued
  }
})

const kpiCards = computed(() => [
  { key: 'participantCustomers', level: 'primary', label: '参与客户数', value: formatInt(kpi.value.participantCustomers), sub: `范围客户数 ${formatInt(kpi.value.customersTotal)}` },
  { key: 'participantRate', level: 'primary', label: '参与率', value: formatPercent(kpi.value.participantRate), sub: '参与客户数 / 客户数' },
  { key: 'achievedCustomers', level: 'primary', label: '达标客户数', value: formatInt(kpi.value.achievedCustomers), sub: '满足全部条件' },
  { key: 'achievedRate', level: 'primary', label: '达标率', value: formatPercent(kpi.value.achievedRate), sub: '达标客户数 / 参与客户数' },
  { key: 'netDeposit', level: 'primary', label: '活动净入金($)', value: formatMoney(kpi.value.netDeposit), sub: '参与成功后有效净入金' },
  { key: 'lots', level: 'primary', label: '活动交易量(Lot)', value: formatLots(kpi.value.lots), sub: '参与成功后累计' }
])

const selectedAgentSummary = computed(() => {
  const a = agentRows.value.find((r) => r.agentId === selectedAgentId.value)
  return (
    a || {
      participantMtAccounts: 0,
      inProgressCustomers: 0,
      nearGoalCustomers: 0,
      closedPnl: 0,
      commission: 0,
      rewardPending: 0,
      rewardIssued: 0
    }
  )
})

const detailVisible = ref(false)
const selectedAgentId = ref('')

const openDetail = (agentId) => {
  selectedAgentId.value = agentId
  detailVisible.value = true
}

const selectedAgent = computed(() => filteredAgents.value.find((a) => a.agentId === selectedAgentId.value) || null)

const detailTitle = computed(() => {
  if (!selectedAgent.value) return '客户活动明细'
  return `客户活动明细 - ${selectedAgent.value.agentId}-${selectedAgent.value.agentName}`
})

const detailRows = computed(() => {
  const a = selectedAgent.value
  if (!a) return []
  return a.details
    .map((d) => {
      const netDepositPct = Math.min(100, Math.max(0, Math.round((Number(d.netDeposit || 0) / TARGET_NET_DEPOSIT) * 100)))
      const lotsPct = Math.min(100, Math.max(0, Math.round((Number(d.lots || 0) / TARGET_LOTS) * 100)))
      const nearGoal = d.status === '进行中' && (netDepositPct >= 80 || lotsPct >= 80)
      return {
        ...d,
        netDepositPct,
        lotsPct,
        nearGoal
      }
    })
    .sort((x, y) => (y.status === x.status ? 0 : y.status.localeCompare(x.status)))
})

const detailKpi = computed(() => {
  const list = detailRows.value
  const customersStatus = buildCustomerBestStatus(list)
  const participantCustomers = customersStatus.size
  const achievedCustomers = Array.from(customersStatus.values()).filter((s) => s !== '进行中').length
  const netDeposit = list.reduce((sum, d) => sum + Number(d.netDeposit || 0), 0)
  const lots = list.reduce((sum, d) => sum + Number(d.lots || 0), 0)
  return { participantCustomers, achievedCustomers, netDeposit, lots }
})

const formatMoney = (v) => {
  const n = Number(v || 0)
  return n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

const formatLots = (v) => {
  const n = Number(v || 0)
  return n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

const formatInt = (v) => {
  const n = Number(v || 0)
  return n.toLocaleString('en-US', { maximumFractionDigits: 0 })
}

const formatPercent = (v) => {
  const n = Number(v || 0) * 100
  return `${n.toFixed(2)}%`
}

const statusDotClass = (status) => {
  if (status === '已发放') return 'bg-emerald-500'
  if (status === '待发放') return 'bg-amber-500'
  if (status === '已达标') return 'bg-blue-500'
  return 'bg-gray-400'
}

const statusTextClass = (status) => {
  if (status === '已发放') return 'text-emerald-700 font-medium'
  if (status === '待发放') return 'text-amber-700 font-medium'
  if (status === '已达标') return 'text-blue-700 font-medium'
  return 'text-gray-600 font-medium'
}
</script>
