<template>
  <div class="flex h-full bg-mainBg overflow-hidden">
    <div class="flex-1 flex flex-col min-w-0 bg-gray-50 overflow-hidden p-4 custom-scrollbar overflow-y-auto">
      <div class="flex-1 flex flex-col min-w-0">
        <section class="crm-card mb-4">
          <div class="crm-card-head">搜索</div>
          <div class="crm-card-body">
            <div class="crm-filter-grid">
              <div class="crm-field">
                <div class="crm-label">销售姓名</div>
                <div class="crm-control">
                  <input v-model="filters.salesName" class="crm-input" placeholder="请输入销售姓名" type="text" />
                </div>
              </div>
              <div class="crm-field">
                <div class="crm-label">销售邮箱</div>
                <div class="crm-control">
                  <input v-model="filters.salesEmail" class="crm-input" placeholder="请输入销售邮箱" type="text" />
                </div>
              </div>
              <div class="crm-field">
                <div class="crm-label">平仓编号</div>
                <div class="crm-control">
                  <input v-model="filters.closeId" class="crm-input" placeholder="请输入平仓编号" type="text" />
                </div>
              </div>
              <div class="crm-field">
                <div class="crm-label">客户邮箱</div>
                <div class="crm-control">
                  <input v-model="filters.customerEmail" class="crm-input" placeholder="请输入客户邮箱" type="text" />
                </div>
              </div>
              <div class="crm-field">
                <div class="crm-label">客户姓名</div>
                <div class="crm-control">
                  <input v-model="filters.customerName" class="crm-input" placeholder="请输入客户姓名" type="text" />
                </div>
              </div>
              <div class="crm-field">
                <div class="crm-label">平仓日期</div>
                <div class="crm-control">
                  <input v-model="filters.closeDateRange" class="crm-input" placeholder="开始日期 - 结束日期" type="text" />
                </div>
              </div>
              <div class="crm-field">
                <div class="crm-label">交易品种</div>
                <div class="crm-control">
                  <select v-model="filters.symbol" class="crm-input crm-select">
                    <option value="">全部</option>
                    <option value="XAUUSD">XAUUSD</option>
                    <option value="EURUSD">EURUSD</option>
                    <option value="GBPUSD">GBPUSD</option>
                  </select>
                </div>
              </div>
              <div class="crm-field">
                <div class="crm-label">规则来源</div>
                <div class="crm-control">
                  <select v-model="filters.ruleSource" class="crm-input crm-select">
                    <option value="">全部</option>
                    <option value="default">默认规则</option>
                    <option value="agent">代理规则</option>
                    <option value="mt">MT分组规则</option>
                  </select>
                </div>
              </div>
              <div v-if="showRuleObjectFilter" class="crm-field">
                <div class="crm-label">规则对象</div>
                <div class="crm-control">
                  <select v-model="filters.ruleObject" class="crm-input crm-select">
                    <option value="">全部</option>
                    <option v-for="opt in ruleObjectOptions" :key="opt.value" :value="opt.value">{{ opt.label }}</option>
                  </select>
                </div>
              </div>
              <div class="crm-field">
                <div class="crm-label">奖励周期</div>
                <div class="crm-control">
                  <select v-model="filters.rewardPeriod" class="crm-input crm-select">
                    <option value="">全部</option>
                    <option value="每月最后一日">每月最后一日</option>
                  </select>
                </div>
              </div>
              <div class="crm-field">
                <div class="crm-label">奖励时间</div>
                <div class="crm-control">
                  <input v-model="filters.rewardTimeRange" class="crm-input" placeholder="开始日期 - 结束日期" type="text" />
                </div>
              </div>
              <div class="crm-field">
                <div class="crm-label">入账时间</div>
                <div class="crm-control">
                  <input v-model="filters.creditTimeRange" class="crm-input" placeholder="开始日期 - 结束日期" type="text" />
                </div>
              </div>
              <div class="crm-field">
                <div class="crm-label">MT类型</div>
                <div class="crm-control">
                  <select v-model="filters.mtType" class="crm-input crm-select">
                    <option value="">全部</option>
                    <option value="standard">标准账户</option>
                    <option value="cent">美分账户</option>
                  </select>
                </div>
              </div>
              <div class="crm-field">
                <div class="crm-label">奖励状态</div>
                <div class="crm-control">
                  <select v-model="filters.rewardStatus" class="crm-input crm-select">
                    <option value="">全部</option>
                    <option value="待计算">待计算</option>
                    <option value="待入账">待入账</option>
                    <option value="已入账">已入账</option>
                    <option value="奖励失败">奖励失败</option>
                  </select>
                </div>
              </div>
            </div>

            <div class="crm-actions">
              <button class="crm-btn crm-btn-primary" type="button" @click="handleSearch">搜索</button>
              <button class="crm-btn crm-btn-outline" type="button" @click="handleReset">重置</button>
              <button class="crm-btn crm-btn-primary" type="button" @click="handleExport">导出</button>
            </div>
          </div>
        </section>

        <section class="crm-card">
          <div class="crm-card-body">
            <div class="sales-trading-table overflow-x-auto no-scrollbar">
              <table class="w-full custom-table min-w-[1560px]">
   <thead class="bg-tableHeader sticky top-0 z-10">
    <tr>
     <th class="w-24">销售名称</th>
      <th class="w-40">销售邮箱</th>
     <th class="w-24">客户名称</th>
     <th class="w-28">MT交易账号</th>
     <th class="w-28 change-highlight">MT类型</th>
     <th class="w-24">交易品种</th>
     <th class="w-32 change-highlight">计算手数（标准手）</th>
     <th class="w-28">平仓编号</th>
     <th class="w-32">平仓时间</th>
      <th class="w-40">奖励计算方式</th>
     <th class="w-32">返佣标准</th>
     <th class="w-28 change-highlight">奖励金额</th>
     <th class="w-32">奖励周期</th>
     <th class="w-24">奖励状态</th>
     <th class="w-40">备注</th>
     <th class="w-20">操作</th>
    </tr>
   </thead>
   <tbody>
    <tr v-for="row in filteredRows" :key="row.id">
     <td>{{ row.salesName }}</td>
      <td>
        <span class="remark-ellipsis" :title="row.salesEmail || '-'">{{ row.salesEmail || '-' }}</span>
      </td>
     <td>{{ row.customerName }}</td>
     <td>{{ row.mtAccount }}</td>
     <td>
      <span class="type-pill" :class="row.mtType === 'cent' ? 'cent' : 'standard'">
       <i class="fa-solid" :class="row.mtType === 'cent' ? 'fa-coins' : 'fa-layer-group'"></i>
       {{ row.mtType === 'cent' ? '美分' : '标准' }}
      </span>
     </td>
     <td>{{ row.symbol }}</td>
     <td>
      <div class="text-gray-800 change-highlight font-medium">{{ row.calcLots }}</div>
     </td>
     <td>{{ row.closeId }}</td>
     <td>{{ row.closeTime }}</td>
      <td>{{ row.rewardCalcModeLabel }}</td>
     <td>{{ row.commissionStandard }}</td>
     <td class="change-highlight font-medium">{{ row.rewardAmount }}</td>
     <td>{{ row.rewardPeriod }}</td>
     <td>
      <span class="status-tag" :class="getRewardStatusClass(row.rewardStatus)">{{ row.rewardStatus }}</span>
     </td>
     <td>
      <span class="remark-ellipsis" :title="row.remark || '-'">{{ row.remark || '-' }}</span>
     </td>
     <td>
      <button class="text-[#C19B5E] hover:underline" type="button" @click="openDetail(row)">详情</button>
     </td>
    </tr>
   </tbody>
  </table>
            </div>

            <div class="crm-pagination">
              <div class="crm-pagination-total">共658条</div>
              <div class="crm-pagination-pages">
                <button class="crm-page-btn" type="button">上一页</button>
                <button class="crm-page-num" type="button">50</button>
                <button class="crm-page-num is-active" type="button">51</button>
                <button class="crm-page-num" type="button">52</button>
                <button class="crm-page-num" type="button">53</button>
                <button class="crm-page-num" type="button">54</button>
                <span class="crm-page-ellipsis">...</span>
                <button class="crm-page-num" type="button">90</button>
                <button class="crm-page-btn" type="button">下一页</button>
              </div>
            </div>
          </div>
        </section>
      </div>

    </div>
  </div>

  <div v-if="detailVisible" class="drawer-mask" @click.self="closeDetail">
   <div class="drawer">
    <div class="drawer-head">
     <div class="drawer-title">详情</div>
     <button class="drawer-close" type="button" @click="closeDetail">
      <i class="fa-solid fa-xmark"></i>
     </button>
    </div>
    <div class="drawer-body">
     <div class="drawer-section">
      <div class="drawer-section-title">交易信息</div>
      <div class="drawer-kv">
       <div class="drawer-kv-item"><div class="k">销售名称</div><div class="v">{{ detailRow?.salesName || '-' }}</div></div>
       <div class="drawer-kv-item"><div class="k">销售邮箱</div><div class="v">{{ detailRow?.salesEmail || '-' }}</div></div>
       <div class="drawer-kv-item"><div class="k">客户名称</div><div class="v">{{ detailRow?.customerName || '-' }}</div></div>
       <div class="drawer-kv-item"><div class="k">客户邮箱</div><div class="v">{{ detailRow?.customerEmail || '-' }}</div></div>
       <div class="drawer-kv-item"><div class="k">MT交易账号</div><div class="v">{{ detailRow?.mtAccount || '-' }}</div></div>
       <div class="drawer-kv-item"><div class="k">MT类型</div><div class="v">{{ detailRow?.mtType === 'cent' ? '美分账户' : '标准账户' }}</div></div>
       <div class="drawer-kv-item"><div class="k">交易品种</div><div class="v">{{ detailRow?.symbol || '-' }}</div></div>
       <div class="drawer-kv-item"><div class="k">平仓编号</div><div class="v">{{ detailRow?.closeId || '-' }}</div></div>
       <div class="drawer-kv-item"><div class="k">平仓时间</div><div class="v">{{ detailRow?.closeTime || '-' }}</div></div>
       <div class="drawer-kv-item"><div class="k">原始交易手数</div><div class="v">{{ detailRow?.rawLots || '-' }}</div></div>
       <div class="drawer-kv-item"><div class="k">计算标准手数</div><div class="v">{{ detailRow?.calcLots || '-' }}</div></div>
      </div>
     </div>

     <div class="drawer-section">
      <div class="drawer-section-title">返佣计算依据</div>
      <div class="drawer-kv">
       <div class="drawer-kv-item"><div class="k">规则来源</div><div class="v drawer-strong">{{ detailRow?.ruleSourceLabel || '-' }}</div></div>
       <div class="drawer-kv-item"><div class="k">奖励计算方式</div><div class="v drawer-strong">{{ detailRow?.rewardCalcModeLabel || '-' }}</div></div>
       <div class="drawer-kv-item"><div class="k">规则对象</div><div class="v drawer-strong">{{ detailRow?.ruleObjectLabel || '-' }}</div></div>
       <div class="drawer-kv-item"><div class="k">净入金统计范围</div><div class="v">{{ detailRow?.netDepositScope || '-' }}</div></div>
       <div class="drawer-kv-item"><div class="k">计算时净入金</div><div class="v drawer-strong">{{ detailRow?.netDepositAtCalc || '-' }}</div></div>
       <div class="drawer-kv-item"><div class="k">命中净入金档位</div><div class="v drawer-strong">{{ detailRow?.hitTier || '-' }}</div></div>
       <div class="drawer-kv-item"><div class="k">返佣标准</div><div class="v drawer-strong">{{ detailRow?.commissionStandard || '-' }}</div></div>
       <div class="drawer-kv-item"><div class="k">计算公式</div><div class="v drawer-strong">{{ detailRow?.formula || '-' }}</div></div>
       <div class="drawer-kv-item"><div class="k">配置版本</div><div class="v">{{ detailRow?.configVersion || '-' }}</div></div>
      </div>
     </div>

     <div class="drawer-section">
      <div class="drawer-section-title">奖励结果</div>
      <div class="drawer-kv">
       <div class="drawer-kv-item"><div class="k">奖励周期</div><div class="v">{{ detailRow?.rewardPeriod || '-' }}</div></div>
       <div class="drawer-kv-item"><div class="k">奖励金额</div><div class="v drawer-strong">{{ detailRow?.rewardAmount || '-' }}</div></div>
       <div class="drawer-kv-item"><div class="k">奖励时间</div><div class="v">{{ detailRow?.rewardTime || '-' }}</div></div>
       <div class="drawer-kv-item"><div class="k">入账时间</div><div class="v">{{ detailRow?.creditTime || '-' }}</div></div>
       <div class="drawer-kv-item"><div class="k">奖励状态</div><div class="v"><span class="status-tag" :class="getRewardStatusClass(detailRow?.rewardStatus || '')">{{ detailRow?.rewardStatus || '-' }}</span></div></div>
       <div class="drawer-kv-item"><div class="k">备注/失败原因</div><div class="v">{{ detailRow?.remark || '-' }}</div></div>
      </div>
     </div>
    </div>
   </div>
  </div>
</template>

<script setup>
import { computed, reactive, ref, watch } from 'vue'
import { ElMessage } from 'element-plus'

const filters = reactive({
  salesName: '',
  salesEmail: '',
  closeId: '',
  customerEmail: '',
  customerName: '',
  closeDateRange: '',
  symbol: '',
  ruleSource: '',
  ruleObject: '',
  rewardPeriod: '',
  rewardTimeRange: '',
  creditTimeRange: '',
  mtType: '',
  rewardStatus: '',
})

const showRuleObjectFilter = computed(() => filters.ruleSource === 'agent' || filters.ruleSource === 'mt')

const ruleObjectOptions = computed(() => {
  if (filters.ruleSource === 'agent') {
    return [
      { value: 'agent-a', label: '代理A（A10001）' },
      { value: 'agent-b', label: '代理B（B10001）' },
    ]
  }
  if (filters.ruleSource === 'mt') {
    return [
      { value: 'mt-real-vip-cent', label: 'real\\VIP\\Cent' },
      { value: 'mt-real-vip-standard', label: 'real\\VIP\\Standard' },
    ]
  }
  return []
})

watch(
  () => filters.ruleSource,
  () => {
    filters.ruleObject = ''
  }
)

const demoRows = [
  {
    id: 'r-1',
    salesName: '新销售A',
    salesEmail: 'sales-a@example.com',
    customerName: 'Joker',
    customerEmail: 'joker@example.com',
    mtAccount: '800001',
    mtType: 'standard',
    symbol: 'XAUUSD',
    calcLots: '0.11 Lot',
    rawLots: '0.11 标准手',
    closeId: 'CLOSE-10001',
    closeTime: '2026-07-31 22:10:11',
    ruleSource: 'default',
    ruleSourceLabel: '默认规则',
    rewardCalcModeLabel: '统一计算',
    ruleObject: '',
    ruleObjectLabel: '-',
    netDepositScope: '销售默认规则范围（演示）',
    netDepositAtCalc: '$86,000.00',
    hitTier: '$0.00–$99,999.99',
    commissionStandard: '1.50 USD/标准手',
    formula: '0.11 × 1.50 = 0.1650 USD',
    configVersion: 'V1.0',
    rewardAmount: '0.1650',
    rewardPeriod: '每月最后一日',
    rewardTime: '-',
    creditTime: '-',
    rewardStatus: '待计算',
    remark: '-',
  },
  {
    id: 'r-2',
    salesName: '新销售A',
    salesEmail: 'sales-a@example.com',
    customerName: 'ABNC',
    customerEmail: 'abnc@example.com',
    mtAccount: '900011',
    mtType: 'cent',
    symbol: 'XAUUSD',
    calcLots: '0.11 Lot',
    rawLots: '1.00 美分手',
    closeId: 'CLOSE-10002',
    closeTime: '2026-07-31 22:11:33',
    ruleSource: 'mt',
    ruleSourceLabel: 'MT分组规则',
    rewardCalcModeLabel: '团队净入金阶梯计算',
    ruleObject: 'mt-real-vip-cent',
    ruleObjectLabel: 'real\\VIP\\Cent',
    netDepositScope: '该销售旗下属于该MT分组的账户',
    netDepositAtCalc: '$126,000.00',
    hitTier: '$100,000.00–不设上限',
    commissionStandard: '2.50 USD/标准手',
    formula: '0.11 × 2.50 = 0.2750 USD',
    configVersion: 'V1.0',
    rewardAmount: '0.2750',
    rewardPeriod: '每月最后一日',
    rewardTime: '-',
    creditTime: '-',
    rewardStatus: '待入账',
    remark: '美分折算系数 0.01',
  },
  {
    id: 'r-3',
    salesName: '新销售B',
    salesEmail: 'sales-b@example.com',
    customerName: 'Cent-A',
    customerEmail: 'cent-a@example.com',
    mtAccount: '900022',
    mtType: 'cent',
    symbol: 'EURUSD',
    calcLots: '0.10 Lot',
    rawLots: '1.00 美分手',
    closeId: 'CLOSE-10003',
    closeTime: '2026-07-31 21:00:12',
    ruleSource: 'agent',
    ruleSourceLabel: '代理规则',
    rewardCalcModeLabel: '规则计算',
    ruleObject: 'agent-a',
    ruleObjectLabel: '代理A（A10001）',
    netDepositScope: '该代理及其全部下级代理、直客',
    netDepositAtCalc: '$58,000.00',
    hitTier: '$50,000.00–不设上限',
    commissionStandard: '2.00 USD/标准手',
    formula: '0.10 × 2.00 = 0.2000 USD',
    configVersion: 'V1.0',
    rewardAmount: '0.2000',
    rewardPeriod: '每月最后一日',
    rewardTime: '2026-08-01 00:12:00',
    creditTime: '2026-08-01 09:00:00',
    rewardStatus: '已入账',
    remark: '发放: 上级美元佣金账户',
  },
]

const filteredRows = computed(() => {
  let rows = demoRows
  if (filters.ruleSource) rows = rows.filter((r) => r.ruleSource === filters.ruleSource)
  if (showRuleObjectFilter.value && filters.ruleObject) rows = rows.filter((r) => r.ruleObject === filters.ruleObject)
  return rows
})

const detailVisible = ref(false)
const detailRow = ref(null)

const openDetail = (row) => {
  detailRow.value = row
  detailVisible.value = true
}

const closeDetail = () => {
  detailVisible.value = false
}

const handleSearch = () => {
  ElMessage({ message: '已搜索（演示）', type: 'success' })
}

const handleReset = () => {
  filters.salesName = ''
  filters.salesEmail = ''
  filters.closeId = ''
  filters.customerEmail = ''
  filters.customerName = ''
  filters.closeDateRange = ''
  filters.symbol = ''
  filters.ruleSource = ''
  filters.ruleObject = ''
  filters.rewardPeriod = ''
  filters.rewardTimeRange = ''
  filters.creditTimeRange = ''
  filters.mtType = ''
  filters.rewardStatus = ''
  ElMessage({ message: '已重置（演示）', type: 'success' })
}

const getRewardStatusClass = (status) => {
  const s = String(status || '').trim()
  if (s === '已入账') return 'is-success'
  if (s === '待入账') return 'is-warning'
  if (s === '待计算') return 'is-info'
  if (s === '奖励失败') return 'is-danger'
  return ''
}

const handleExport = () => {
  const rows = filteredRows.value.map((r) => ({
    销售名称: r.salesName,
    销售邮箱: r.salesEmail,
    客户名称: r.customerName,
    MT交易账号: r.mtAccount,
    MT类型: r.mtType === 'cent' ? '美分账户' : '标准账户',
    交易品种: r.symbol,
    原始交易手数: r.rawLots,
    计算标准手数: r.calcLots,
    规则来源: r.ruleSourceLabel,
    奖励计算方式: r.rewardCalcModeLabel,
    规则对象: r.ruleObjectLabel,
    计算时净入金: r.netDepositAtCalc,
    命中档位: r.hitTier,
    返佣标准: r.commissionStandard,
    计算公式: r.formula,
    配置版本: r.configVersion,
    奖励周期: r.rewardPeriod,
    奖励金额: r.rewardAmount,
    奖励状态: r.rewardStatus,
    备注: r.remark || '',
  }))

  const headers = Object.keys(rows[0] || {})
  const csv = [headers.join(','), ...rows.map((r) => headers.map((h) => `"${String(r[h] ?? '').replace(/"/g, '""')}"`).join(','))].join('\n')
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = 'sales-trading-demo-export.csv'
  a.click()
  URL.revokeObjectURL(url)
  ElMessage({ message: '已导出（演示）', type: 'success' })
}
</script>

<style scoped>
.no-scrollbar::-webkit-scrollbar { display: none; }
.no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }

.crm-card {
  background: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
}

.crm-card-head {
  padding: 12px 16px;
  border-bottom: 1px solid #f1f5f9;
  font-size: 13px;
  font-weight: 600;
  color: #374151;
}

.crm-card-body {
  padding: 16px;
}

.crm-filter-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 12px 16px;
}

@media (min-width: 768px) {
  .crm-filter-grid { grid-template-columns: 1fr 1fr; }
}

@media (min-width: 1280px) {
  .crm-filter-grid { grid-template-columns: 1fr 1fr 1fr 1fr; }
}

.crm-field {
  display: flex;
  align-items: center;
  gap: 10px;
  min-width: 0;
}

.crm-label {
  width: 72px;
  font-size: 12px;
  color: #6b7280;
  flex: 0 0 auto;
  white-space: nowrap;
}

.crm-control {
  flex: 1 1 auto;
  min-width: 0;
}

.crm-input {
  width: 100%;
  height: 34px;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 0 10px;
  font-size: 12px;
  color: #111827;
  outline: none;
  background: #fff;
}

.crm-input:focus {
  border-color: rgba(193, 155, 94, 0.6);
  box-shadow: 0 0 0 3px rgba(193, 155, 94, 0.12);
}

.crm-select {
  cursor: pointer;
}

.crm-actions {
  margin-top: 14px;
  display: flex;
  gap: 10px;
  justify-content: flex-start;
}

.crm-btn {
  height: 34px;
  padding: 0 14px;
  border-radius: 8px;
  font-size: 12px;
  font-weight: 500;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: background 0.15s ease, border-color 0.15s ease, color 0.15s ease;
}

.crm-btn-primary {
  background: #c19b5e;
  color: #ffffff;
}

.crm-btn-primary:hover {
  background: #b28747;
}

.crm-btn-outline {
  background: #ffffff;
  border: 1px solid #e5e7eb;
  color: #374151;
}

.crm-btn-outline:hover {
  border-color: #d1d5db;
  background: #f9fafb;
}

.sales-trading-table .custom-table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  font-size: 12px;
}

.sales-trading-table .custom-table thead th {
  font-weight: 600;
  color: #1f2937;
  background: #f9fafb;
  padding: 12px 12px;
  white-space: nowrap;
  border-bottom: 1px solid #e5e7eb;
  border-right: 1px solid #f3f4f6;
}
.sales-trading-table .custom-table thead th:last-child {
  border-right: 0;
}

.sales-trading-table .custom-table tbody td {
  color: #4b5563;
  padding: 12px 12px;
  line-height: 20px;
  border-bottom: 1px solid #f3f4f6;
  border-right: 1px solid #f9fafb;
  vertical-align: middle;
}
.sales-trading-table .custom-table tbody td:last-child {
  border-right: 0;
}

.sales-trading-table .custom-table tbody td:not(:last-child) {
  white-space: nowrap;
}

.sales-trading-table .custom-table tbody td:last-child {
  background: #ffffff;
  position: sticky;
  right: 0;
  z-index: 1;
}

.sales-trading-table .custom-table .change-highlight {
  font-size: 12px;
  font-weight: 400;
  color: #4b5563;
}

.sales-trading-table .type-pill {
  font-size: 11px;
  line-height: 16px;
}

.sales-trading-table .custom-table thead th:last-child {
  position: sticky;
  right: 0;
  z-index: 3;
  background: #f9fafb;
}

.remark-ellipsis {
  display: inline-block;
  max-width: 240px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  vertical-align: bottom;
}

.status-tag {
  display: inline-flex;
  align-items: center;
  height: 20px;
  padding: 0 8px;
  border-radius: 999px;
  font-size: 12px;
  border: 1px solid #e5e7eb;
  background: #fff;
  color: #374151;
}

.status-tag.is-success {
  border-color: #bbf7d0;
  background: #f0fdf4;
  color: #15803d;
}

.status-tag.is-warning {
  border-color: #fde68a;
  background: #fffbeb;
  color: #b45309;
}

.status-tag.is-info {
  border-color: #bfdbfe;
  background: #eff6ff;
  color: #1d4ed8;
}

.status-tag.is-danger {
  border-color: #fecaca;
  background: #fef2f2;
  color: #b91c1c;
}

.crm-pagination {
  margin-top: 12px;
  padding-top: 12px;
  border-top: 1px solid #f1f5f9;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 12px;
}

.crm-pagination-total {
  font-size: 12px;
  color: #6b7280;
}

.crm-pagination-pages {
  display: flex;
  align-items: center;
  gap: 6px;
}

.crm-page-btn,
.crm-page-num {
  height: 30px;
  min-width: 30px;
  padding: 0 10px;
  border-radius: 8px;
  border: 1px solid #e5e7eb;
  background: #fff;
  font-size: 12px;
  color: #374151;
}

.crm-page-btn:hover,
.crm-page-num:hover {
  background: #f9fafb;
}

.crm-page-num.is-active {
  border-color: rgba(193, 155, 94, 0.6);
  background: rgba(193, 155, 94, 0.12);
  color: #c19b5e;
  font-weight: 600;
}

.crm-page-ellipsis {
  font-size: 12px;
  color: #9ca3af;
  padding: 0 4px;
}

.drawer-mask {
  position: fixed;
  inset: 0;
  z-index: 60;
  background: rgba(15, 23, 42, 0.35);
  display: flex;
  justify-content: flex-end;
}

.drawer {
  width: 560px;
  height: 100%;
  background: #fff;
  box-shadow: -8px 0 24px rgba(0, 0, 0, 0.12);
  display: flex;
  flex-direction: column;
}

.drawer-head {
  padding: 14px 16px;
  border-bottom: 1px solid #e5e7eb;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.drawer-title {
  font-size: 16px;
  font-weight: 600;
  color: #111827;
}

.drawer-close {
  width: 32px;
  height: 32px;
  border-radius: 8px;
  color: #6b7280;
}

.drawer-close:hover {
  background: #f3f4f6;
  color: #374151;
}

.drawer-body {
  padding: 16px;
  overflow-y: auto;
}

.drawer-section {
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  padding: 12px;
  background: #fff;
}

.drawer-section + .drawer-section {
  margin-top: 12px;
}

.drawer-section-title {
  font-size: 14px;
  font-weight: 600;
  color: #374151;
  margin-bottom: 10px;
}

.drawer-kv {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px 12px;
}

.drawer-kv-item .k {
  font-size: 12px;
  color: #6b7280;
  margin-bottom: 2px;
}

.drawer-kv-item .v {
  font-size: 12px;
  color: #111827;
  word-break: break-word;
}

.drawer-strong {
  color: #111827;
  font-weight: 600;
}

@media (max-width: 768px) {
  .drawer { width: 92vw; }
  .drawer-kv { grid-template-columns: 1fr; }
}
</style>
