<template>
  <div class="hedging-page bg-gray-50 p-4">
    <header class="mb-4">
      <h1 class="text-base font-semibold text-gray-800">对冲交易记录</h1>
      <p v-if="false" class="mt-1 text-xs text-gray-500">仅展示同一 CRM 客户名下的同账号或多 MT 账号对冲演示数据，不包含跨客户关联。疑似匹配不等同违规；人工核查不扣除活动手数、不取消奖励、不发送通知。</p>
    </header>
    <el-alert v-if="state.warning" :title="state.warning" type="warning" :closable="false" class="mb-4" />
    <section class="hedging-panel mb-4" aria-label="筛选对冲交易记录">
      <el-form label-position="top" class="filter-grid" @submit.prevent="search">
        <el-form-item label="发现时间范围" class="date-filter">
          <el-date-picker v-model="filters.dates" type="datetimerange" value-format="YYYY-MM-DD HH:mm:ss" start-placeholder="开始时间" end-placeholder="结束时间" range-separator="至" :default-time="defaultTime" />
        </el-form-item>
        <el-form-item label="活动名称"><el-select v-model="filters.activity" clearable placeholder="全部活动" aria-label="活动名称"><el-option v-for="activity in activities" :key="activity" :label="activity" :value="activity" /></el-select></el-form-item>
        <el-form-item label="CRM客户 / MT账号"><el-input v-model="filters.query" clearable placeholder="客户姓名、客户ID或MT账号" aria-label="客户姓名、客户ID或MT账号" /></el-form-item>
        <el-form-item label="交易品种"><el-select v-model="filters.symbol" clearable placeholder="全部品种" aria-label="交易品种"><el-option v-for="symbol in symbols" :key="symbol" :label="symbol" :value="symbol" /></el-select></el-form-item>
        <el-form-item label="核查状态"><el-select v-model="filters.status" clearable placeholder="全部状态" aria-label="核查状态"><el-option v-for="status in REVIEW_STATUSES" :key="status" :label="status" :value="status" /></el-select></el-form-item>
        <div class="filter-actions"><el-button type="primary" native-type="submit">查询</el-button><el-button @click="reset">重置</el-button></div>
      </el-form>
      <details v-if="false" class="rule-note"><summary>疑似对冲规则与演示口径</summary><p>{{ MATCH_RULE }}</p><p>手数及持仓时长差异率均为 ABS(A − B) / MAX(A, B) × 100%。必要字段缺失、任一有效平仓手数为0、双方持仓时长均为0时不参与匹配。时间统一为演示 MT 服务器时间（UTC+8），不使用客户端时间匹配。每笔订单仅属于一对预置订单，仅按 CRM 客户ID与 MT 账号归属识别，不按同名客户合并；不包含通过共用 IP、设备、银行卡或钱包识别的跨客户对冲，也不新增关联账户识别逻辑。</p></details>
    </section>

    <section class="hedging-panel list-panel" aria-label="对冲事件列表">
      <div class="list-heading"><h2>对冲事件列表</h2><span>共 {{ filtered.length }} 条</span></div>
      <div class="table-scroll">
        <table class="hedging-table event-table">
          <colgroup><col style="width:170px" /><col style="width:200px" /><col style="width:220px" /><col style="width:155px" /><col style="width:180px" /><col style="width:100px" /><col style="width:140px" /><col style="width:105px" /><col style="width:150px" /><col style="width:100px" /></colgroup>
          <thead><tr><th>触发时间</th><th>活动名称</th><th>CRM 客户 / 邮箱</th><th>涉及 MT 账号</th><th>对冲类型</th><th>交易品种</th><th class="numeric">匹配订单对数 <el-tooltip :content="pairCountHint" placement="top" :show-after="150"><span class="pair-count-help" tabindex="0" role="img" :aria-label="pairCountHint"><i class="fa-regular fa-circle-question" aria-hidden="true"></i></span></el-tooltip></th><th>核查状态</th><th>处理人</th><th>操作</th></tr></thead>
          <tbody>
            <tr v-for="event in pagedEvents" :key="event.id">
              <td class="time-text">{{ event.discoveredAt }}</td>
              <td><span class="truncate-text" :title="event.activity">{{ event.activity }}</span></td>
              <td><span class="truncate-text" :title="event.customer">{{ event.customer }}</span><span class="truncate-text text-xs text-gray-500" :title="event.email">{{ event.email }}</span></td>
              <td><span class="truncate-text mono" :title="event.accounts.join('、')">{{ event.accounts.join('、') }}</span></td>
              <td>{{ event.hedgeType }}</td>
              <td>{{ event.symbol }}</td><td class="numeric">{{ event.pairs.length }} 对</td>
              <td><el-tag :type="statusType(reviewStatus(event))" size="small">{{ reviewStatus(event) }}</el-tag></td>
              <td><span class="truncate-text" :title="event.review?.operator">{{ event.review?.operator || '—' }}</span></td>
              <td><button type="button" class="text-blue-600 hover:text-blue-800" @click="viewEvent(event)">查看详情</button></td>
            </tr>
            <tr v-if="!pagedEvents.length"><td colspan="10" class="empty-cell">暂无符合条件的记录，请调整筛选条件或重置。</td></tr>
          </tbody>
        </table>
      </div>
      <div class="pagination-bar"><el-pagination v-model:current-page="page" v-model:page-size="pageSize" :page-sizes="[5, 10, 20]" :total="filtered.length" layout="total, sizes, prev, pager, next" background @size-change="page = 1" /></div>
    </section>

    <el-dialog v-model="detailOpen" title="对冲交易详情" width="94%" :style="{ maxWidth: '1080px' }" top="5vh" destroy-on-close>
      <div v-if="selected" class="hedging-detail">
        <section>
          <h2>事件基本信息</h2>
          <dl class="info-grid">
            <div><dt>事件编号</dt><dd>{{ selected.id }}</dd></div><div><dt>活动名称</dt><dd>{{ selected.activity }}</dd></div>
            <div><dt>CRM 客户名称</dt><dd>{{ selected.customer }}</dd></div><div><dt>CRM 客户 ID</dt><dd>{{ selected.customerId }}</dd></div>
            <div><dt>涉及 MT 账号</dt><dd>{{ selected.accounts.join('、') }}</dd></div><div><dt>对冲类型</dt><dd>{{ selected.hedgeType }}</dd></div>
            <div><dt>首次发现时间</dt><dd>{{ selected.discoveredAt }}</dd></div><div><dt>匹配订单对数 <el-tooltip :content="pairCountHint" placement="top" :show-after="150"><span class="pair-count-help" tabindex="0" role="img" :aria-label="pairCountHint"><i class="fa-regular fa-circle-question" aria-hidden="true"></i></span></el-tooltip></dt><dd>{{ selected.pairs.length }} 对</dd></div>
            <div><dt>当前核查状态</dt><dd><el-tag :type="statusType(reviewStatus(selected))" size="small">{{ reviewStatus(selected) }}</el-tag></dd></div>
            <div><dt>账号归属依据</dt><dd>CRM 客户与 MT 账号归属关系（演示），涉及账号均属于 {{ selected.customerId }}。</dd></div>
          </dl>
        </section>
        <section>
          <h2>对冲订单对照</h2>
          <p class="detail-note">仅展示已平仓演示订单，按 MT 服务器标准品种代码对照，时间为 MT 服务器时间（UTC+8）。各订单对属于同一 CRM 客户、同一活动，均在首次发现前滚动24小时内；相同订单对不重复统计。</p>
          <el-tabs v-model="pairId"><el-tab-pane v-for="(pair, index) in selected.pairs" :key="pair.id" :label="`第 ${index + 1} 对`" :name="pair.id" /></el-tabs>
          <div v-if="activePair" class="table-scroll">
            <table class="hedging-table comparison-table">
              <colgroup><col style="width:26%" /><col style="width:37%" /><col style="width:37%" /></colgroup>
              <thead><tr><th>对照字段</th><th>A 侧订单</th><th>B 侧订单</th></tr></thead>
              <tbody>
                <tr v-for="field in orderFields" :key="field.key"><th scope="row">{{ field.label }}</th><td v-for="side in ['a', 'b']" :key="side" :class="field.key === 'direction' ? (activePair[side].direction === '买入' ? 'text-blue-700' : 'text-rose-700') : ''">{{ orderValue(activePair[side], field.key) }}</td></tr>
                <tr><th scope="row">持仓时长</th><td>{{ durationText(metrics.durationA) }}</td><td>{{ durationText(metrics.durationB) }}</td></tr>
              </tbody>
            </table>
          </div>
          <dl v-if="metrics" class="metric-grid">
            <div><dt>开仓时间差（≤5分钟）</dt><dd>{{ durationText(metrics.openGap) }}</dd></div>
            <div><dt>手数差异率（≤10%）</dt><dd>{{ metrics.lotsRate.toFixed(2) }}%</dd></div>
            <div><dt>持仓时长差异率（≤10%）</dt><dd>{{ metrics.durationRate.toFixed(2) }}%</dd></div>
          </dl>
          <p class="detail-note">命中的匹配规则：{{ MATCH_RULE }}以上数值仅由当前预置订单计算展示，不执行自动检测或自动核查。</p>
        </section>
        <section>
          <h2>人工核查记录</h2>
          <dl v-if="selected.review" class="info-grid">
            <div><dt>处理人</dt><dd>{{ selected.review.operator }}</dd></div><div><dt>处理时间（UTC+8）</dt><dd>{{ selected.review.time }}</dd></div>
            <div><dt>核查结果</dt><dd><el-tag :type="statusType(selected.review.result)" size="small">{{ selected.review.result }}</el-tag></dd></div>
            <div class="full-width"><dt>处理说明</dt><dd class="review-note">{{ selected.review.note }}</dd></div>
          </dl>
          <p v-else class="detail-note">暂无人工核查记录，待核查。提交核查后自动记录处理人及处理时间。</p>
        </section>
      </div>
      <template #footer>
        <el-button @click="detailOpen = false">关闭</el-button>
        <template v-if="selected && !selected.review"><el-button :disabled="!!state.warning" @click="openReview('非对冲')">判定为非对冲</el-button><el-button type="danger" :disabled="!!state.warning" @click="openReview('确认对冲')">确认对冲</el-button></template>
        <span v-else class="ml-3 text-xs text-gray-500">已处理，仅供查看</span>
      </template>
    </el-dialog>

    <el-dialog v-model="reviewOpen" :title="reviewResult === '确认对冲' ? '确认对冲' : '判定为非对冲'" width="92%" :style="{ maxWidth: '540px' }" append-to-body :close-on-click-modal="false" destroy-on-close>
      <p class="mb-4 text-sm text-gray-600">事件 {{ selected?.id }}。核查结果仅保存到当前浏览器，不改变活动手数、奖励或资金。确认后不可重复核查。</p>
      <el-form label-position="top" @submit.prevent="submitReview">
        <el-form-item label="处理说明" required :error="reviewError"><el-input v-model="reviewNote" type="textarea" :rows="4" maxlength="1000" show-word-limit placeholder="请说明核查依据及处理结论" aria-label="处理说明" @input="reviewError = ''" /></el-form-item>
        <p class="text-xs text-gray-500">处理人：{{ reviewer }}；处理时间将在保存成功时自动记录。</p>
      </el-form>
      <template #footer><el-button @click="reviewOpen = false">取消</el-button><el-button type="primary" :disabled="!reviewNote.trim() || !!selected?.review" @click="submitReview">确认提交</el-button></template>
    </el-dialog>
  </div>
</template>

<script setup>
import { computed, reactive, ref, watch } from 'vue'
import { ElMessage } from 'element-plus'
import { getSessionUser } from '@/store/passwordSecurityDemo'
import { hedgingDemo, REVIEW_STATUSES, MATCH_RULE, pairMetrics, reviewStatus, filterHedgingEvents } from '@/store/hedgingRecordsDemo'

const { events, state } = hedgingDemo
const pairCountHint = '两笔符合对冲规则的反向订单计为 1 对。同一笔订单在同一检测批次中最多参与 1 对匹配。'
const emptyFilters = () => ({ dates: [], activity: '', query: '', symbol: '', status: '' })
const filters = reactive(emptyFilters())
const applied = ref(emptyFilters())
const page = ref(1)
const pageSize = ref(10)
const defaultTime = [new Date(2000, 0, 1, 0, 0, 0), new Date(2000, 0, 1, 23, 59, 59)]
const activities = [...new Set(events.map(e => e.activity))]
const symbols = [...new Set(events.map(e => e.symbol))]
const filtered = computed(() => filterHedgingEvents(events, applied.value))
const pagedEvents = computed(() => filtered.value.slice((page.value - 1) * pageSize.value, page.value * pageSize.value))
watch(() => filtered.value.length, length => { page.value = Math.min(page.value, Math.max(1, Math.ceil(length / pageSize.value))) })
function search() {
  if (filters.dates?.length === 2 && filters.dates[0] > filters.dates[1]) { ElMessage.warning('开始时间不能晚于结束时间'); return }
  applied.value = { ...filters, dates: [...(filters.dates || [])] }
  page.value = 1
}
function reset() { Object.assign(filters, emptyFilters()); applied.value = emptyFilters(); page.value = 1 }
const statusType = status => ({ '待核查': 'warning', '确认对冲': 'danger', '非对冲': 'success' }[status])
const detailOpen = ref(false)
const selectedId = ref('')
const selected = computed(() => events.find(e => e.id === selectedId.value))
const pairId = ref('')
const activePair = computed(() => selected.value?.pairs.find(p => p.id === pairId.value))
const metrics = computed(() => activePair.value ? pairMetrics(activePair.value) : null)
const orderFields = [
  { key: 'account', label: 'MT 账号' }, { key: 'customer', label: 'CRM 客户名称' }, { key: 'customerId', label: 'CRM 客户 ID' }, { key: 'id', label: '订单编号' },
  { key: 'symbol', label: '交易品种' }, { key: 'direction', label: '交易方向' }, { key: 'lots', label: '有效平仓手数' },
  { key: 'openTime', label: '开仓时间' }, { key: 'closeTime', label: '平仓时间' }
]
const orderValue = (order, key) => key === 'lots' ? `${order.lots.toFixed(2)} Lot` : order[key]
const durationText = seconds => `${Math.floor(seconds / 3600)}小时 ${Math.floor(seconds % 3600 / 60)}分 ${seconds % 60}秒`
function viewEvent(event) { selectedId.value = event.id; pairId.value = event.pairs[0].id; detailOpen.value = true }
const reviewOpen = ref(false)
const reviewResult = ref('')
const reviewNote = ref('')
const reviewError = ref('')
const reviewer = ref('')
function openReview(result) {
  if (!selected.value || selected.value.review) return
  reviewer.value = getSessionUser()?.name || '系统管理员（演示）'
  reviewResult.value = result; reviewNote.value = ''; reviewError.value = ''; reviewOpen.value = true
}
function submitReview() {
  const result = hedgingDemo.review(selectedId.value, reviewResult.value, reviewNote.value, reviewer.value)
  if (!result.ok) { reviewError.value = result.error; return }
  reviewOpen.value = false
  ElMessage.success('核查结果已保存到本地，列表与详情已更新')
}
</script>

<style scoped>
.hedging-panel { background: var(--crm-surface); border: 1px solid var(--crm-border); border-radius: 10px; padding: 18px; }
.filter-grid { display: grid; grid-template-columns: repeat(4, minmax(160px, 1fr)); gap: 12px 18px; align-items: end; }
.filter-grid :deep(.el-form-item) { margin-bottom: 0; min-width: 0; }
.filter-grid :deep(.el-select), .filter-grid :deep(.el-date-editor) { width: 100%; min-width: 0; }
.date-filter { grid-column: span 2; }
.filter-actions { display: flex; align-items: center; min-height: 36px; }
.rule-note { margin-top: 16px; font-size: 12px; color: var(--crm-muted); line-height: 1.7; }
.rule-note summary { cursor: pointer; width: fit-content; }
.rule-note p { margin-top: 6px; }
.list-panel { padding: 0; overflow: hidden; }
.list-heading { display: flex; align-items: center; gap: 12px; padding: 16px 18px; }
.list-heading h2, .hedging-detail h2 { font-size: 14px; font-weight: 600; color: var(--crm-text); }
.list-heading span { font-size: 12px; color: var(--crm-muted); }
.table-scroll { max-width: 100%; overflow-x: auto; }
.hedging-table { width: 100%; table-layout: fixed; border-collapse: collapse; font-size: 13px; }
.event-table { min-width: 1520px; }
.pair-count-help { display: inline-flex; align-items: center; cursor: help; color: var(--crm-muted); }
.pair-count-help:focus-visible { outline: 2px solid var(--crm-primary); outline-offset: 2px; border-radius: 2px; }
.hedging-table th, .hedging-table td { padding: 12px; border-bottom: 1px solid #eef0f3; text-align: left; vertical-align: middle; }
.hedging-table thead th { height: 46px; background: var(--crm-table-head); color: var(--crm-muted); font-weight: 500; }
.event-table td { height: 54px; }
.event-table tbody tr:hover { background: var(--crm-table-hover); }
.hedging-table .numeric { text-align: right; font-variant-numeric: tabular-nums; }
.truncate-text { display: block; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.mono, .time-text { font-variant-numeric: tabular-nums; font-size: 12px; white-space: nowrap; }
.hedging-table .empty-cell { padding: 36px 16px; text-align: center; color: var(--crm-muted); }
.pagination-bar { padding: 16px 18px; border-top: 1px solid var(--crm-border); overflow-x: auto; display: flex; justify-content: flex-end; }
.hedging-detail { max-height: 66vh; overflow-y: auto; padding-right: 10px; color: var(--crm-text); }
.hedging-detail section + section { margin-top: 20px; padding-top: 16px; border-top: 1px solid var(--crm-border); }
.hedging-detail h2 { margin-bottom: 12px; }
.info-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 12px 20px; font-size: 13px; }
.info-grid > div { display: grid; grid-template-columns: 110px minmax(0, 1fr); gap: 8px; align-items: start; }
.info-grid dt, .metric-grid dt { color: var(--crm-muted); }
.info-grid dd { margin: 0; overflow-wrap: anywhere; }
.full-width { grid-column: 1 / -1; }
.review-note { white-space: pre-wrap; }
.detail-note { font-size: 12px; color: var(--crm-muted); line-height: 1.7; }
.comparison-table { min-width: 530px; }
.comparison-table th, .comparison-table td { padding: 9px 12px; overflow-wrap: anywhere; font-variant-numeric: tabular-nums; }
.comparison-table tbody th { color: var(--crm-muted); font-weight: 400; }
.metric-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 12px; background: var(--crm-table-head); padding: 12px; margin: 12px 0; font-size: 12px; }
.metric-grid dd { margin: 5px 0 0; font-weight: 600; font-variant-numeric: tabular-nums; }
@media (max-width: 1100px) { .filter-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
@media (max-width: 640px) { .filter-grid, .info-grid, .metric-grid { grid-template-columns: minmax(0, 1fr); } .date-filter { grid-column: auto; } .info-grid > div { grid-template-columns: 100px minmax(0, 1fr); } .pagination-bar { justify-content: flex-start; } }
</style>
