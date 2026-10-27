<template>
  <div class="flex h-full bg-mainBg overflow-hidden">
    <div class="flex-1 flex flex-col min-w-0 bg-gray-50 overflow-hidden p-4 custom-scrollbar overflow-y-auto">
      <div class="flex-1 p-4 overflow-y-auto bg-white flex flex-col">
 <!-- 分配状态 Tabs -->
 <div class="flex border-b border-gray-200 mb-4 px-2 overflow-x-auto whitespace-nowrap no-scrollbar" id="leads-tabs">
  <button v-for="tab in tabs" :key="tab.value" class="pb-2.5 px-4 text-sm font-medium border-b-2 transition-colors" :class="activeTab === tab.value ? 'text-primaryBtn border-primaryBtn' : 'text-gray-500 border-transparent hover:text-gray-700'" @click="changeTab(tab.value)">
    {{ tab.label }}<span v-if="tab.value === 'unassigned'" class="ml-1 bg-red-500 text-white text-xs px-1.5 rounded-full">{{ unassignedCount }}</span>
  </button>
 </div>
 <p class="text-xs text-gray-500 mb-3">当前为本地演示数据；“微信公众号-联系我们”记录非真实公众号提交，后续由后端统一接入留资查询。</p>
 <el-alert v-if="error" :title="error" type="error" :closable="false" show-icon class="mb-3" />
 <!-- 1. 顶部搜索过滤区 (匹配截图样式) -->
 <div class="flex flex-wrap items-center gap-4 mb-4 bg-gray-100/70 p-3 rounded">
  <div class="flex items-center gap-2">
   <span class="text-gray-700 text-sm font-medium">
    客户名称:
   </span>
   <input v-model="filters.name" class="px-3 py-1.5 text-sm outline-none border border-gray-200 rounded w-32 bg-white" placeholder="请输入客户名称" type="text"/>
  </div>
  <div class="flex items-center gap-2">
   <span class="text-gray-700 text-sm font-medium">
    客户邮箱:
   </span>
   <input v-model="filters.email" class="px-3 py-1.5 text-sm outline-none border border-gray-200 rounded w-40 bg-white" placeholder="请输入客户邮箱" type="text"/>
  </div>
  <div class="flex items-center gap-2">
   <span class="text-gray-700 text-sm font-medium">
    联系方式:
   </span>
   <input v-model="filters.contact" class="px-3 py-1.5 text-sm outline-none border border-gray-200 rounded w-32 bg-white" placeholder="手机号 / 微信等" type="text"/>
  </div>
  <div class="flex items-center gap-2">
   <span class="text-gray-700 text-sm font-medium">
    咨询内容:
   </span>
   <select v-model="filters.inquiry" class="px-3 py-1.5 text-sm outline-none border border-gray-200 rounded w-28 bg-white cursor-pointer text-gray-500">
    <option value="">
     全部
    </option>
    <option value="1">
     成为代理
    </option>
    <option value="2">
     政策了解
    </option>
    <option value="3">
     个人交易
    </option>
    <option value="4">
     其他
    </option>
   <option value="5">开户咨询</option><option value="6">活动咨询</option></select>
  </div>
  <div class="flex items-center gap-2">
   <span class="text-gray-700 text-sm font-medium">
    信息来源:
   </span>
   <select v-model="filters.source" class="px-3 py-1.5 text-sm outline-none border border-gray-200 rounded w-28 bg-white cursor-pointer text-gray-500">
    <option value="">
     全部
    </option>
    <option value="website">
     官网访问
    </option>
    <option value="social">
     社交平台
    </option>
    <option value="referral">
     客户推荐
    </option>
    <option value="online_event">
     线上活动
    </option>
    <option value="offline_event">
     线下金融活动
    </option>
    <option value="news_site">
     金融资讯网站
    </option>
    <option value="other">
     其他渠道
    </option>
   <option value="wechat_contact">微信公众号-联系我们</option></select>
  </div>
  <div class="flex items-center gap-2">
   <span class="text-gray-700 text-sm font-medium">
    线索热度:
   </span>
   <select v-model="filters.heat" class="px-3 py-1.5 text-sm outline-none border border-gray-200 rounded w-24 bg-white cursor-pointer text-gray-500">
    <option value="">
     全部
    </option>
    <option value="hot">
     🔥 高意向
    </option>
    <option value="warm">
     🌟 中意向
    </option>
    <option value="cold">
     ❄️ 低意向
    </option>
   </select>
  </div>
  <div class="flex items-center gap-2 role-manager-only">
   <span class="text-gray-700 text-sm font-medium">
    归属销售:
   </span>
   <select v-model="filters.assignee" class="px-3 py-1.5 text-sm outline-none border border-gray-200 rounded w-28 bg-white cursor-pointer text-gray-500">
    <option value="">
     全部
    </option>
    <option value="unassigned">
     未分配
    </option>
    <option value="s1">
     张三
    </option>
    <option value="s2">
     李四
    </option>
   <option value="s3">王刚（销售）</option><option value="c1">小林（客服）</option><option value="c2">小周（客服）</option></select>
  </div>
  <div class="flex items-center gap-2">
   <span class="text-gray-700 text-sm font-medium">
    跟进日期:
   </span>
   <div class="flex items-center border border-gray-200 rounded bg-white overflow-hidden focus-within:border-[#41B8AF] transition-colors">
    <input v-model="filters.followStart" class="px-2 py-1.5 text-sm outline-none text-gray-600 bg-transparent w-[115px] cursor-pointer" type="date"/>
    <span class="text-gray-400 px-1">
     -
    </span>
    <input v-model="filters.followEnd" class="px-2 py-1.5 text-sm outline-none text-gray-600 bg-transparent w-[115px] cursor-pointer" type="date"/>
   </div>
  </div>
  <div class="flex items-center gap-2">
   <span class="text-gray-700 text-sm font-medium">
    下次跟进:
   </span>
   <div class="flex items-center border border-gray-200 rounded bg-white overflow-hidden focus-within:border-[#41B8AF] transition-colors">
    <input v-model="filters.nextStart" class="px-2 py-1.5 text-sm outline-none text-gray-600 bg-transparent w-[115px] cursor-pointer" type="date"/>
    <span class="text-gray-400 px-1">
     -
    </span>
    <input v-model="filters.nextEnd" class="px-2 py-1.5 text-sm outline-none text-gray-600 bg-transparent w-[115px] cursor-pointer" type="date"/>
   </div>
  </div>
  <!-- 查询按钮 -->
  <div class="ml-auto">
   <button @click="search" class="bg-primaryBtn hover:bg-primaryBtnHover text-white px-6 py-1.5 rounded text-sm transition-colors shadow-sm font-medium">
    查询
   </button><button class="ml-2 bg-white border border-gray-300 px-4 py-1.5 rounded text-sm" @click="resetFilters">重置</button>
  </div>
 </div>
 <!-- 2. 数据表格区 -->
 <!-- 批量操作条 -->
 <div class="mb-3 flex items-center justify-between">
  <div class="flex items-center gap-3">
   <button class="bg-primaryBtn hover:bg-primaryBtnHover text-white px-4 py-1.5 rounded text-sm transition-colors shadow-sm font-medium flex items-center gap-1.5 role-manager-only">
    <i class="fas fa-plus">
    </i>
    销售录入
   </button>
   <button class="bg-[#F59E0B] hover:bg-[#D97706] text-white px-4 py-1.5 rounded text-sm transition-colors shadow-sm font-medium flex items-center gap-1.5 role-manager-only">
    <i class="fas fa-headset">
    </i>
    客服录入
   </button>
   <button @click="batchAssign" class="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-1.5 rounded text-sm transition-colors shadow-sm font-medium flex items-center gap-1.5 role-manager-only">
    <i class="fas fa-users-cog">
    </i>
    批量分配
   </button>
   <button class="bg-teal-500 hover:bg-teal-600 text-white px-4 py-1.5 rounded text-sm transition-colors shadow-sm font-medium flex items-center gap-1.5 role-manager-only">
    <i class="fas fa-chart-pie">
    </i>
    留资看板
   </button>
  </div>
  <div>
   <button class="bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 px-4 py-1.5 rounded text-sm transition-colors shadow-sm font-medium flex items-center gap-1.5">
    <i class="fas fa-download">
    </i>
    导出报表
   </button>
  </div>
 </div>
 <div class="lead-table-scroll flex-1 min-h-[320px] overflow-auto border border-gray-200">
   <table class="leads-table custom-table w-full min-w-[2389px] text-[13px]">
    <colgroup>
     <col class="role-manager-only" style="width: 44px"/>
     <col style="width: 88px"/>
     <col style="width: 175px"/>
     <col style="width: 120px"/>
     <col style="width: 110px"/>
     <col style="width: 125px"/>
     <col style="width: 140px"/>
     <col style="width: 112px"/>
     <col style="width: 110px"/>
     <col style="width: 112px"/>
     <col style="width: 75px"/>
     <col style="width: 88px"/>
     <col style="width: 135px"/>
     <col style="width: 90px"/>
     <col style="width: 145px"/>
     <col style="width: 180px"/>
     <col style="width: 145px"/>
     <col style="width: 145px"/>
     <col style="width: 250px"/>
    </colgroup>
    <thead class="bg-tableHeader sticky top-0 z-10">
     <tr>
      <th class="text-center role-manager-only">
       <input class="w-4 h-4 rounded border-gray-300 focus:ring-indigo-500 text-indigo-600 cursor-pointer" id="selectAll" :checked="allSelected" :disabled="!selectable.length" @change="toggleAll($event.target.checked)" type="checkbox"/>
      </th>
      <th>
       姓名
      </th>
      <th>
       邮箱
      </th>
      <th>
       联系电话
      </th>
      <th>
       微信
      </th>
      <th>
       WhatsApp
      </th>
      <th>
       其他联系方式
      </th>
      <th>
       咨询内容
      </th>
      <th>
       信息来源
      </th>
      <th>
       <span class="relative inline-flex items-center gap-1 group">
        <span>
         客户来源
        </span>
        <i class="fa-solid fa-circle-info text-[11px] text-white/80 cursor-help">
        </i>
        <span class="pointer-events-none absolute left-1/2 top-full z-20 mt-2 hidden w-52 -translate-x-1/2 rounded bg-gray-900 px-3 py-2 text-left text-[11px] font-normal leading-4 text-white shadow-lg group-hover:block">
         客户来源代表客户从哪里输入的留资信息
        </span>
       </span>
      </th>
      <th>
       留资次数
      </th>
      <th>
       线索热度
      </th>
      <th>
       有无关联代理
      </th>
      <th>
       归属销售
      </th>
      <th>
       申请时间
      </th>
      <th>
       最新跟进内容
      </th>
      <th>
       最新跟进时间
      </th>
      <th>
       下次跟进时间
      </th>
      <th>
       操作
      </th>
     </tr>
    </thead>
    <tbody>
     <tr v-for="row in paginated.rows" :key="row.id" :class="'data-row-' + row.status">
      <td class="text-center role-manager-only"><input v-model="selectedIds" :value="row.id" :disabled="!['unassigned', 'public'].includes(row.status)" :title="['unassigned', 'public'].includes(row.status) ? '选择留资' : '当前状态不能批量分配'" type="checkbox" class="row-checkbox w-4 h-4 rounded" /></td>
      <td :title="row.name">{{ row.name }}</td>
      <td :title="row.email">{{ row.email }}</td>
      <td :title="row.phone">{{ row.phone }}</td>
      <td :title="row.wechat">{{ row.wechat || '-' }}</td>
      <td :title="row.whatsapp">{{ row.whatsapp || '-' }}</td>
      <td :title="row.otherContact">{{ row.otherContact || '-' }}</td>
      <td><button class="lead-truncated-text text-left" :title="row.inquiry" @click="goLeadDetail(row.id)">{{ row.inquiry }}</button></td>
      <td :title="LEAD_SOURCES[row.source]"><span class="lead-truncated-text">{{ LEAD_SOURCES[row.source] }}</span></td>
      <td :title="row.customerSource"><span class="lead-truncated-text">{{ row.customerSource }}</span></td>
      <td><span class="text-blue-600 font-medium">{{ row.count }} 次</span></td>
      <td :class="heatClass(row.heat)">{{ heatLabel(row.heat) }}</td>
      <td :class="row.agent ? 'text-green-600' : 'text-gray-400'">{{ row.agent ? '有 (' + row.agent + ')' : '无' }}</td>
      <td>{{ staffName(row.assigneeId) }}</td>
      <td>{{ row.createdAt }}</td>
      <td><span class="lead-truncated-text" :title="latestFollow(row)?.content">{{ latestFollow(row)?.content || '-' }}</span></td>
      <td>{{ latestFollow(row)?.time || '-' }}</td>
      <td>{{ row.nextFollowAt || '-' }}</td>
      <td class="lead-operation-cell">
       <button v-if="['assigned', 'unassigned', 'public'].includes(row.status)" class="text-indigo-500 font-medium" @click="openAction('assign', [row.id])">{{ row.status === 'unassigned' ? '分配' : '重新分配' }}</button>
       <button v-if="['unassigned', 'public'].includes(row.status)" class="text-blue-500 font-medium" @click="openAction('assign', [row.id])">认领</button>
       <button class="text-blue-500 font-medium" @click="goLeadDetail(row.id)">详情</button>
       <button v-if="row.assigneeId && !['unassigned', 'public'].includes(row.status)" class="text-green-600 font-medium" @click="openAction('follow', [row.id])">跟进</button>
       <button v-if="row.status === 'assigned'" class="text-orange-500 font-medium" @click="returnToPool(row)">退回公海</button>
       <button v-if="row.status === 'converted' && row.clientId" class="text-blue-500 font-medium" @click="goClientDetail(row.clientId)">客户画像</button>
      </td>
     </tr>
     <tr v-if="!paginated.total"><td colspan="19" class="text-center py-8 text-gray-400">暂无符合条件的留资记录</td></tr>
    </tbody>
   </table>
 </div>
 <!-- 3. 底部翻页区 -->
 <div class="flex flex-wrap gap-3 items-center justify-end mt-4 text-sm text-gray-500">
  <span>共 {{ paginated.total }} 条，第 {{ paginated.page }}/{{ paginated.totalPages }} 页</span>
  <select v-model.number="pageSize" aria-label="每页条数" @change="page = 1"><option :value="5">5 条/页</option><option :value="10">10 条/页</option><option :value="20">20 条/页</option></select>
  <div class="flex items-center gap-1">
   <button class="w-8 h-8 rounded hover:bg-gray-100 disabled:opacity-40" :disabled="paginated.page === 1" aria-label="上一页" @click="page--">‹</button>
   <button v-for="number in paginated.totalPages" :key="number" class="w-8 h-8 rounded" :class="paginated.page === number ? 'bg-[#e8a3a3] text-white' : 'hover:bg-gray-100'" @click="page = number">{{ number }}</button>
   <button class="w-8 h-8 rounded hover:bg-gray-100 disabled:opacity-40" :disabled="paginated.page === paginated.totalPages" aria-label="下一页" @click="page++">›</button>
  </div>
 </div>
 <LeadActionDialog v-model="actionOpen" :mode="actionMode" :ids="actionIds" @saved="selectedIds = []" />
</div>

    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, onUnmounted, reactive, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage, ElMessageBox } from 'element-plus'
import LeadActionDialog from '../../components/leads/LeadActionDialog.vue'
import { leadsStore, LEADS_KEY, LEAD_STATES, LEAD_SOURCES, staffName, latestFollow, filterLeads, paginateLeads } from '../../store/leadsDemo.js'

const router = useRouter()
const { records, error } = leadsStore
const defaults = () => ({ name: '', email: '', contact: '', inquiry: '', source: '', heat: '', assignee: '', followStart: '', followEnd: '', nextStart: '', nextEnd: '' })
const filters = reactive(defaults())
const applied = ref(defaults())
const activeTab = ref('all')
const tabs = [{ value: 'all', label: '全部' }, ...Object.entries(LEAD_STATES).map(([value, label]) => ({ value, label }))]
const page = ref(1)
const pageSize = ref(10)
const selectedIds = ref([])
const unassignedCount = computed(() => records.value.filter(row => row.status === 'unassigned').length)
const filtered = computed(() => filterLeads(records.value, applied.value, activeTab.value))
const paginated = computed(() => paginateLeads(filtered.value, page.value, pageSize.value))
const selectable = computed(() => paginated.value.rows.filter(row => ['unassigned', 'public'].includes(row.status)))
const allSelected = computed(() => selectable.value.length > 0 && selectable.value.every(row => selectedIds.value.includes(row.id)))
watch([filtered, pageSize], () => { page.value = paginated.value.page; selectedIds.value = [] })
watch(page, () => { selectedIds.value = [] })
const actionOpen = ref(false)
const actionMode = ref('assign')
const actionIds = ref([])
const heatLabel = heat => ({ hot: '高', warm: '中', cold: '低' }[heat] || '--')
const heatClass = heat => ({ hot: 'text-red-500 font-bold', warm: 'text-orange-400 font-bold', cold: 'text-blue-400 font-bold' }[heat] || 'text-gray-400')
function changeTab(tab) { activeTab.value = tab; page.value = 1; selectedIds.value = [] }
function search() {
  if ((filters.followStart && filters.followEnd && filters.followStart > filters.followEnd) || (filters.nextStart && filters.nextEnd && filters.nextStart > filters.nextEnd)) return ElMessage.warning('开始日期不能晚于结束日期')
  if (!leadsStore.refresh()) return ElMessage.error(error.value)
  applied.value = { ...filters }; page.value = 1; selectedIds.value = []
}
function resetFilters() { Object.assign(filters, defaults()); activeTab.value = 'all'; search() }
function toggleAll(checked) { selectedIds.value = checked ? selectable.value.map(row => row.id) : [] }
function openAction(mode, ids) { actionMode.value = mode; actionIds.value = [...ids]; actionOpen.value = true }
function batchAssign() { if (!selectedIds.value.length) return ElMessage.warning('请选择待分配或公海记录'); openAction('assign', selectedIds.value) }
async function returnToPool(row) {
  try { await ElMessageBox.confirm('确认将该留资退回公海并清空当前归属？已有跟进记录保留。', '退回公海', { confirmButtonText: '确认', cancelButtonText: '取消', type: 'warning' }) } catch { return }
  const result = leadsStore.returnToPool(row.id, row.revision)
  result.ok ? ElMessage.success('已退回公海') : ElMessage.error(result.error)
}
const goLeadDetail = id => router.push({ path: '/crm/leads-detail', query: { id } })
const goClientDetail = id => router.push({ path: '/crm/client-detail', query: { id } })
function sync(event) { if (!event.key || event.key === LEADS_KEY) leadsStore.refresh() }
onMounted(() => { leadsStore.refresh(); window.addEventListener('storage', sync) })
onUnmounted(() => window.removeEventListener('storage', sync))
</script>

<style scoped>
.leads-table {
  border-collapse: separate;
  border-spacing: 0;
  table-layout: fixed;
  font-size: 13px;
}

.leads-table thead th {
  height: 48px;
  padding: 12px 12px;
  color: #6b7280;
  background: #f9fafb;
  border-bottom: 1px solid #e5e7eb;
  font-size: 12px;
  font-weight: 600;
  line-height: 18px;
  text-align: left;
  vertical-align: middle;
  white-space: normal;
}

.leads-table thead th.text-center {
  text-align: center;
}

.leads-table tbody td {
  height: 56px;
  padding: 12px;
  color: #4b5563;
  border-bottom: 1px solid #f1f3f5;
  line-height: 20px;
  vertical-align: middle;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.leads-table tbody tr:hover td {
  background-color: #f9fafb;
}

.leads-table tbody tr:last-child td {
  border-bottom: 0;
}

.leads-table tbody td.lead-operation-cell {
  overflow: visible;
  text-overflow: clip;
  white-space: normal;
}

.leads-table .lead-operation-cell > button {
  display: inline-flex;
  align-items: center;
  margin: 2px 8px 2px 0;
  max-width: 100%;
  font-size: 12px;
  line-height: 18px;
  vertical-align: middle;
  white-space: nowrap;
}

.leads-table .lead-truncated-text {
  display: -webkit-box;
  overflow: hidden;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow-wrap: anywhere;
  white-space: normal;
  line-height: 18px;
}
</style>
