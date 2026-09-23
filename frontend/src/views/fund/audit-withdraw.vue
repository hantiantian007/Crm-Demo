<template>
  <div class="flex h-full bg-mainBg overflow-hidden w-full">
    <div class="flex-1 flex flex-col min-w-0 bg-gray-50 overflow-hidden p-4 custom-scrollbar overflow-y-auto w-full">
      <main class="flex-1 overflow-y-auto p-4 md:p-6 bg-mainBg">
        <div class="space-y-4">
          <section class="bg-white rounded-xl border border-gray-200 p-5">
            <div class="text-sm font-semibold text-gray-700 mb-4">筛选条件</div>
            <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
              <div>
                <label class="block text-xs text-gray-500 mb-2">用户类型</label>
                <select v-model="filters.userType" class="filter-select">
                  <option value="">请选择</option>
                  <option value="standard">标准</option>
                  <option value="agent">代理</option>
                  <option value="client">普通客户</option>
                </select>
              </div>
              <div>
                <label class="block text-xs text-gray-500 mb-2">操作人</label>
                <input v-model="filters.operator" class="filter-input" placeholder="请输入" />
              </div>
              <div>
                <label class="block text-xs text-gray-500 mb-2">订单号</label>
                <input v-model="filters.orderNo" class="filter-input" placeholder="请输入" />
              </div>
              <div>
                <label class="block text-xs text-gray-500 mb-2">MT账号</label>
                <input v-model="filters.mtAccount" class="filter-input" placeholder="请输入" />
              </div>
              <div>
                <label class="block text-xs text-gray-500 mb-2">MT类型</label>
                <select v-model="filters.mtType" class="filter-select">
                  <option value="">请选择</option>
                  <option value="standard">标准账户</option>
                  <option value="cent">美分账户</option>
                </select>
              </div>
              <div>
                <label class="block text-xs text-gray-500 mb-2">出金方式</label>
                <select v-model="filters.withdrawMethod" class="filter-select">
                  <option value="">请选择</option>
                  <option value="USDT">USDT</option>
                  <option value="AIPAY">AIPAY</option>
                  <option value="UGATE">UGATE</option>
                  <option value="passttopay">passttopay</option>
                </select>
              </div>
              <div>
                <label class="block text-xs text-gray-500 mb-2">审核状态</label>
                <select v-model="filters.auditStatus" class="filter-select">
                  <option value="">请选择</option>
                  <option value="待审核">待审核</option>
                  <option value="会签审核">会签审核</option>
                  <option value="已通过">已通过</option>
                  <option value="已拒绝">已拒绝</option>
                  <option value="已取消">已取消</option>
                </select>
              </div>
              <div>
                <label class="block text-xs text-gray-500 mb-2">时间类型</label>
                <select v-model="filters.timeType" class="filter-select">
                  <option value="apply">申请时间</option>
                  <option value="audit">审核时间</option>
                  <option value="pay">支付时间</option>
                </select>
              </div>
              <div>
                <label class="block text-xs text-gray-500 mb-2">开始时间</label>
                <input v-model="filters.startTime" class="filter-input" placeholder="请选择" />
              </div>
              <div>
                <label class="block text-xs text-gray-500 mb-2">结束时间</label>
                <input v-model="filters.endTime" class="filter-input" placeholder="请选择" />
              </div>
              <div>
                <label class="block text-xs text-gray-500 mb-2">支付状态</label>
                <select v-model="filters.payStatus" class="filter-select">
                  <option value="">请选择</option>
                  <option value="待支付">待支付</option>
                  <option value="支付中">支付中</option>
                  <option value="支付成功">支付成功</option>
                  <option value="支付失败">支付失败</option>
                  <option value="支付取消">支付取消</option>
                  <option value="已退款">已退款</option>
                </select>
              </div>
            </div>
            <div class="pt-4 flex items-center justify-end gap-3">
              <button type="button" class="h-9 px-5 rounded-md bg-white border border-gray-200 text-gray-600 text-sm font-medium hover:bg-gray-50 transition-colors" @click="resetFilters">
                重置
              </button>
              <button type="button" class="h-9 px-5 rounded-md bg-primaryBtn hover:bg-primaryBtnHover text-white text-sm font-medium transition-colors" @click="search">
                查询
              </button>
            </div>
          </section>

          <section class="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div class="px-5 py-4 border-b border-gray-100 flex items-center justify-between gap-4 flex-wrap">
              <div class="flex items-center gap-3">
                <button class="inline-flex items-center px-3 py-1.5 rounded-md bg-primaryBtn text-white text-sm font-medium hover:bg-primaryBtnHover transition-colors" @click="openManageWithdrawModal" type="button">
                  管理出金
                </button>
              </div>
              <div class="flex items-center gap-5 text-xs text-gray-600 flex-wrap">
                <div>出金笔数：<span class="font-semibold text-gray-800">{{ summary.count }}</span></div>
                <div>USD出金金额：<span class="font-semibold text-gray-800">{{ summary.usdText }}</span></div>
                <div>USC出金金额：<span class="font-semibold text-gray-800">{{ summary.uscText }}</span></div>
              </div>
              <button class="px-4 py-2 rounded-md bg-primaryBtn hover:bg-primaryBtnHover text-white text-xs font-medium transition-colors" type="button">
                报表导出
              </button>
            </div>

            <div class="overflow-x-auto border-b border-gray-100">
              <table class="min-w-[1240px] w-full text-sm text-left">
                <thead class="bg-gray-50 text-gray-500">
                  <tr class="border-b border-gray-100">
                    <th class="px-5 py-3 w-10"></th>
                    <th class="px-5 py-3 font-medium whitespace-nowrap">MT账号</th>
                    <th class="px-5 py-3 font-medium whitespace-nowrap">MT类型</th>
                    <th class="px-5 py-3 font-medium whitespace-nowrap">订单号</th>
                    <th class="px-5 py-3 font-medium whitespace-nowrap">客户名称</th>
                    <th class="px-5 py-3 font-medium whitespace-nowrap">出金金额</th>
                    <th class="px-5 py-3 font-medium whitespace-nowrap">到账金额</th>
                    <th class="px-5 py-3 font-medium whitespace-nowrap">审核状态</th>
                    <th class="px-5 py-3 font-medium whitespace-nowrap">支付状态</th>
                    <th class="px-5 py-3 font-medium whitespace-nowrap">申请时间</th>
                    <th class="px-5 py-3 font-medium whitespace-nowrap text-right">操作</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-gray-100">
                  <template v-for="row in pagedRows" :key="row.id">
                    <tr class="hover:bg-gray-50/70">
                      <td class="px-5 py-3 align-top">
                        <button class="text-gray-400 hover:text-primaryBtn transition-colors" @click="toggleDetail(row.id)" type="button">
                          <i class="fa-solid fa-chevron-right text-xs transition-transform" :class="{ 'rotate-90': expandedRows.includes(row.id) }"></i>
                        </button>
                      </td>
                      <td class="px-5 py-3 whitespace-nowrap text-gray-700 font-medium">{{ row.mtAccount }}</td>
                      <td class="px-5 py-3 whitespace-nowrap">
                        <span class="type-pill" :class="row.mtType === 'cent' ? 'cent' : 'standard'">{{ row.mtTypeLabel }}</span>
                      </td>
                      <td class="px-5 py-3 whitespace-nowrap">
                        <div class="max-w-[220px] truncate text-gray-600" :title="row.orderNo">{{ row.orderNo }}</div>
                      </td>
                      <td class="px-5 py-3 whitespace-nowrap text-gray-600">{{ row.clientName }}</td>
                      <td class="px-5 py-3 whitespace-nowrap text-gray-700 font-semibold">{{ moneyText(row.withdrawAmount, row.withdrawCurrency) }}</td>
                      <td class="px-5 py-3 whitespace-nowrap text-gray-700">{{ moneyText(row.arrivalAmount, row.arrivalCurrency) }}</td>
                      <td class="px-5 py-3 whitespace-nowrap">
                        <span class="status-pill" :class="auditStatusClass(row.auditStatus)">{{ row.auditStatus }}</span>
                      </td>
                      <td class="px-5 py-3 whitespace-nowrap">
                        <span class="status-pill" :class="payStatusClass(row.payStatus)">{{ row.payStatus }}</span>
                      </td>
                      <td class="px-5 py-3 whitespace-nowrap text-gray-500">{{ row.applyTime }}</td>
                      <td class="px-5 py-3 whitespace-nowrap text-right">
                        <div class="inline-flex items-center gap-2">
                          <button type="button" class="px-3 py-1.5 rounded bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-medium transition-colors" @click="goWithdrawAuditDetail(row.mtAccount)">
                            详情
                          </button>
                          <button
                            v-if="row.auditStatus === '待审核'"
                            type="button"
                            class="px-3 py-1.5 rounded bg-primaryBtn hover:bg-primaryBtnHover text-white text-xs font-medium transition-colors"
                            @click="goWithdrawAuditDetail(row.mtAccount)"
                          >
                            审核
                          </button>
                          <button
                            v-if="row.hasPayment"
                            type="button"
                            class="px-3 py-1.5 rounded border border-gray-200 bg-white text-gray-600 text-xs font-medium hover:bg-gray-50 transition-colors"
                            @click="viewPaymentRecord(row)"
                          >
                            支付记录
                          </button>
                        </div>
                      </td>
                    </tr>
                    <tr v-show="expandedRows.includes(row.id)" class="bg-gray-50/40">
                      <td class="px-5 py-4" colspan="11">
                        <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-10 gap-y-3 text-xs">
                          <div class="flex gap-3">
                            <div class="text-gray-500 w-28 shrink-0">MT分组</div>
                            <div class="text-gray-700 font-medium break-all">{{ displayText(row.mtGroup) }}</div>
                          </div>
                          <div class="flex gap-3">
                            <div class="text-gray-500 w-28 shrink-0">手机号</div>
                            <div class="text-gray-700 font-medium break-all">{{ displayText(row.phone) }}</div>
                          </div>
                          <div class="flex gap-3">
                            <div class="text-gray-500 w-28 shrink-0">上级信息</div>
                            <div class="text-gray-700 font-medium break-all">{{ displayText(row.parentInfo) }}</div>
                          </div>
                          <div class="flex gap-3">
                            <div class="text-gray-500 w-28 shrink-0">客服审核时间</div>
                            <div class="text-gray-700 font-medium break-all">{{ displayText(row.csTime) }}</div>
                          </div>
                          <div class="flex gap-3">
                            <div class="text-gray-500 w-28 shrink-0">风控审核时间</div>
                            <div class="text-gray-700 font-medium break-all">{{ displayText(row.riskTime) }}</div>
                          </div>
                          <div class="flex gap-3">
                            <div class="text-gray-500 w-28 shrink-0">财务审核时间</div>
                            <div class="text-gray-700 font-medium break-all">{{ displayText(row.financeTime) }}</div>
                          </div>
                          <div class="flex gap-3">
                            <div class="text-gray-500 w-28 shrink-0">操作人</div>
                            <div class="text-gray-700 font-medium break-all">{{ displayText(row.operator) }}</div>
                          </div>
                          <div class="flex gap-3 md:col-span-2 xl:col-span-2">
                            <div class="text-gray-500 w-28 shrink-0">其他补充信息</div>
                            <div class="text-gray-700 font-medium break-all">{{ displayText(row.extraInfo) }}</div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  </template>

                  <tr v-if="!pagedRows.length">
                    <td class="px-5 py-10 text-center text-gray-400 text-sm" colspan="11">暂无数据</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div class="px-5 py-4 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
              <div class="text-xs text-gray-500">总记录数：{{ filteredRows.length }}</div>
              <div class="flex items-center justify-end gap-3">
                <div class="text-xs text-gray-500">每页</div>
                <select v-model="pageSize" class="h-8 px-2 rounded border border-gray-200 bg-white text-xs text-gray-600">
                  <option :value="10">10</option>
                  <option :value="20">20</option>
                  <option :value="50">50</option>
                </select>
                <button
                  type="button"
                  class="h-8 w-8 rounded border border-gray-200 text-gray-600 text-xs hover:bg-gray-50 disabled:opacity-40"
                  :disabled="page <= 1"
                  @click="page = Math.max(1, page - 1)"
                >
                  <i class="fa-solid fa-angle-left text-[10px]"></i>
                </button>
                <div class="text-xs text-gray-600 min-w-[64px] text-center">{{ page }}/{{ totalPages }}</div>
                <button
                  type="button"
                  class="h-8 w-8 rounded border border-gray-200 text-gray-600 text-xs hover:bg-gray-50 disabled:opacity-40"
                  :disabled="page >= totalPages"
                  @click="page = Math.min(totalPages, page + 1)"
                >
                  <i class="fa-solid fa-angle-right text-[10px]"></i>
                </button>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>

    <!-- Manage Withdraw Modal -->
    <div class="modal-mask" v-show="isModalOpen">
      <div class="modal-panel">
        <div class="h-14 px-6 border-b border-gray-200 flex items-center justify-between">
          <div class="text-lg font-semibold text-gray-700">管理员出金</div>
          <button type="button" @click="closeManageWithdrawModal" class="text-gray-400 hover:text-gray-600 transition-colors">
            <i class="fa-solid fa-xmark text-xl"></i>
          </button>
        </div>
        <div class="px-6 py-5 space-y-5">
          <div>
            <label class="block text-[15px] font-medium text-gray-600 mb-3">
              <span class="change-highlight">*</span> {{ manageWithdrawAmountLabel }}
            </label>
            <input v-model="modalForm.amount" class="modal-input" :placeholder="manageWithdrawAmountPlaceholder" />
          </div>
          <div>
            <label class="block text-[15px] font-medium text-gray-600 mb-3">
              <span class="change-highlight">*</span> 出金类型：
            </label>
            <select v-model="modalForm.withdrawTypeId" class="modal-input">
              <option v-for="t in enabledWithdrawTypes" :key="t.id" :value="t.id">{{ t.name }}</option>
            </select>
            <div class="withdraw-type-hint" :class="withdrawTypeHintClass">
              <div>是否计入真实出金：{{ withdrawTypeHintText }}</div>
            </div>
          </div>
          <div>
            <label class="block text-[15px] font-medium text-gray-600 mb-3">
              <span class="change-highlight">*</span> MT账号：
            </label>
            <input v-model="modalForm.mtAccount" @input="updateManageWithdrawType" class="modal-input" placeholder="请输入MT账号" />
            <div class="mt-2 text-xs" :class="isHighlightHint ? 'change-highlight' : 'text-gray-400'">
              {{ manageWithdrawTypeHint }}
            </div>
          </div>
          <div>
            <label class="block text-[15px] font-medium text-gray-600 mb-3">
              <span class="change-highlight">*</span> 确认账号：
            </label>
            <input v-model="modalForm.confirmAccount" class="modal-input" placeholder="确认账号" />
          </div>
          <div>
            <div class="flex items-center justify-between mb-3">
              <label class="block text-[15px] font-medium text-gray-600">
                <span class="change-highlight">*</span> MT Comment：
              </label>
              <span class="text-xs text-gray-400">{{ modalForm.comment.length }}/32</span>
            </div>
            <textarea v-model="modalForm.comment" maxlength="32" class="modal-textarea" placeholder="请输入"></textarea>
          </div>
          <div>
            <label class="block text-[15px] font-medium text-gray-600 mb-3">
              <span class="change-highlight">*</span> 备注：
            </label>
            <textarea v-model="modalForm.remark" class="modal-textarea" placeholder="请输入备注"></textarea>
          </div>
        </div>
        <div class="px-6 py-4 border-t border-gray-200 flex items-center justify-end gap-3 bg-gray-50">
          <button type="button" @click="closeManageWithdrawModal" class="px-6 py-2 rounded-lg bg-red-500 text-white text-sm font-medium hover:bg-red-600 transition-colors">
            取消
          </button>
          <button type="button" @click="submitManageWithdraw" class="px-6 py-2 rounded-lg bg-primaryBtn text-white text-sm font-medium hover:bg-primaryBtnHover transition-colors">
            确认
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { findTypeConfig, getEnabledTypeConfigs, pushFundOperationSnapshot } from '@/store/fund-type-config'

const router = useRouter()

const expandedRows = ref([])

const toggleDetail = (id) => {
  if (expandedRows.value.includes(id)) {
    expandedRows.value = expandedRows.value.filter(rowId => rowId !== id)
  } else {
    expandedRows.value.push(id)
  }
}

const filters = ref({
  userType: '',
  operator: '',
  orderNo: '',
  mtAccount: '',
  mtType: '',
  withdrawMethod: '',
  auditStatus: '',
  timeType: 'apply',
  startTime: '',
  endTime: '',
  payStatus: ''
})

const page = ref(1)
const pageSize = ref(10)

const resetFilters = () => {
  filters.value = {
    userType: '',
    operator: '',
    orderNo: '',
    mtAccount: '',
    mtType: '',
    withdrawMethod: '',
    auditStatus: '',
    timeType: 'apply',
    startTime: '',
    endTime: '',
    payStatus: ''
  }
  page.value = 1
}

const search = () => {
  page.value = 1
}

const displayText = (v) => (v === null || v === undefined || String(v).trim() === '' ? '-' : String(v))

const formatAmount = (v) => {
  if (v === null || v === undefined || v === '') return '-'
  const n = Number(v)
  if (!Number.isFinite(n)) return '-'
  return n.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

const moneyText = (amount, currency) => {
  const a = formatAmount(amount)
  if (a === '-') return '-'
  const c = displayText(currency)
  return `${a} ${c}`
}

const auditStatusClass = (status) => {
  if (status === '待审核') return 'pill-gray'
  if (status === '会签审核' || status === '审核中') return 'pill-amber'
  if (status === '已通过' || status === '已审核') return 'pill-green'
  if (status === '已拒绝' || status === '审核拒绝') return 'pill-red'
  if (status === '已取消') return 'pill-gray'
  return 'pill-gray'
}

const payStatusClass = (status) => {
  if (status === '待支付') return 'pill-gray'
  if (status === '支付中') return 'pill-amber'
  if (status === '支付成功') return 'pill-green'
  if (status === '支付失败') return 'pill-red'
  if (status === '支付取消') return 'pill-gray'
  if (status === '已退款') return 'pill-gray'
  return 'pill-gray'
}

const tableRows = computed(() => [
  {
    id: 'w_1',
    mtAccount: '8100453',
    mtType: 'standard',
    mtTypeLabel: '标准账户',
    orderNo: 'OUT_923832107870979672',
    clientName: 'test-b5',
    withdrawAmount: 1233,
    withdrawCurrency: 'USD',
    arrivalAmount: 1233,
    arrivalCurrency: 'USD',
    auditStatus: '会签审核',
    payStatus: '待支付',
    applyTime: '2026-07-31 15:07:06',
    mtGroup: '标准分组XXXXX',
    phone: '13932282801',
    parentInfo: 'test-b4',
    csTime: '2026-07-31 15:07:08',
    riskTime: '-',
    financeTime: '-',
    operator: '财务-A',
    extraInfo: '-',
    hasPayment: true
  },
  {
    id: 'w_2',
    mtAccount: '9900456',
    mtType: 'cent',
    mtTypeLabel: '美分账户',
    orderNo: 'OUT_919847271934199098',
    clientName: 'test-小测试',
    withdrawAmount: 120,
    withdrawCurrency: 'USD',
    arrivalAmount: 861.6,
    arrivalCurrency: 'CNY',
    auditStatus: '已通过',
    payStatus: '支付中',
    applyTime: '2026-07-20 15:09:10',
    mtGroup: '美分分组XXXX',
    phone: '14578541002',
    parentInfo: 'test-测试小组',
    csTime: '2026-07-20 15:13:23',
    riskTime: '2026-07-20 15:15:15',
    financeTime: '2026-07-20 15:16:56',
    operator: '财务-B',
    extraInfo: '-',
    hasPayment: true
  },
  {
    id: 'w_3',
    mtAccount: '8110474',
    mtType: 'cent',
    mtTypeLabel: '美分账户',
    orderNo: 'OUT_942623916520637783',
    clientName: 'test-沈栋晓',
    withdrawAmount: 10000,
    withdrawCurrency: 'USC',
    arrivalAmount: 10000,
    arrivalCurrency: 'USC',
    auditStatus: '待审核',
    payStatus: '待支付',
    applyTime: '2026-09-21 11:39:02',
    mtGroup: 'real\\HATC-Inland\\Test\\Stan-Cent',
    phone: '13832766457',
    parentInfo: '孙春测试',
    csTime: '-',
    riskTime: '-',
    financeTime: '-',
    operator: 'test-沈栋晓',
    extraInfo: '-',
    hasPayment: false
  }
])

const filteredRows = computed(() => {
  const f = filters.value
  return tableRows.value.filter((r) => {
    if (f.mtType && r.mtType !== f.mtType) return false
    if (f.mtAccount && !String(r.mtAccount).includes(String(f.mtAccount).trim())) return false
    if (f.orderNo && !String(r.orderNo).includes(String(f.orderNo).trim())) return false
    if (f.auditStatus && r.auditStatus !== f.auditStatus) return false
    if (f.payStatus && r.payStatus !== f.payStatus) return false
    return true
  })
})

const summary = computed(() => {
  const rows = filteredRows.value
  const usd = rows.filter((x) => x.withdrawCurrency === 'USD').reduce((sum, x) => sum + Number(x.withdrawAmount || 0), 0)
  const usc = rows.filter((x) => x.withdrawCurrency === 'USC').reduce((sum, x) => sum + Number(x.withdrawAmount || 0), 0)
  return {
    count: rows.length,
    usdText: moneyText(usd, 'USD'),
    uscText: moneyText(usc, 'USC')
  }
})

const totalPages = computed(() => Math.max(1, Math.ceil(filteredRows.value.length / Number(pageSize.value || 10))))

const pagedRows = computed(() => {
  if (page.value > totalPages.value) page.value = totalPages.value
  const start = (page.value - 1) * Number(pageSize.value || 10)
  return filteredRows.value.slice(start, start + Number(pageSize.value || 10))
})

const viewPaymentRecord = (row) => {
  if (!row?.hasPayment) return
  window.alert('演示：支付记录')
}

const isModalOpen = ref(false)
const modalForm = ref({
  amount: '',
  withdrawTypeId: 'wt_demo',
  mtAccount: '',
  confirmAccount: '',
  comment: '',
  remark: ''
})

const accountTypeMap = {
  '8100453': { type: '标准账户', unitLabel: '美元', placeholder: '请输入美元金额', hint: '当前 MT账号 为标准账户，出金金额按 USD/美元 输入。' },
  '9900456': { type: '美分账户', unitLabel: '美元', placeholder: '请输入美元金额', hint: '当前 MT账号 为美分账户，出金金额按 USD/美元 输入。' }
}

const manageWithdrawAmountLabel = computed(() => {
  const accountInfo = accountTypeMap[modalForm.value.mtAccount.trim()]
  return accountInfo ? `出金金额（${accountInfo.unitLabel}）：` : '出金金额（美元）：'
})

const manageWithdrawAmountPlaceholder = computed(() => {
  const accountInfo = accountTypeMap[modalForm.value.mtAccount.trim()]
  return accountInfo ? accountInfo.placeholder : '请输入金额'
})

const manageWithdrawTypeHint = computed(() => {
  const mtAccount = modalForm.value.mtAccount.trim()
  const accountInfo = accountTypeMap[mtAccount]
  if (accountInfo) return accountInfo.hint
  return mtAccount ? '当前 MT账号 未匹配到 demo 账户类型，默认按 USD/美元 展示。' : '请输入 MT账号 后自动识别出金单位。'
})

const isHighlightHint = computed(() => {
  const mtAccount = modalForm.value.mtAccount.trim()
  return !!accountTypeMap[mtAccount]
})

const enabledWithdrawTypes = computed(() => getEnabledTypeConfigs('withdraw'))

const currentWithdrawType = computed(() => {
  const v = findTypeConfig('withdraw', modalForm.value.withdrawTypeId)
  if (v && v.status === 'enabled') return v
  return enabledWithdrawTypes.value[0] || null
})

const withdrawTypeHintText = computed(() => (currentWithdrawType.value?.countAsReal ? '计入真实出金' : '不计入真实出金'))

const withdrawTypeHintClass = computed(() => (currentWithdrawType.value?.countAsReal ? 'withdraw-type-hint--ok' : 'withdraw-type-hint--warn'))

const updateManageWithdrawType = () => {
  if (!modalForm.value.confirmAccount.trim()) {
    modalForm.value.confirmAccount = modalForm.value.mtAccount.trim()
  }
}

const openManageWithdrawModal = () => {
  const validIds = new Set(enabledWithdrawTypes.value.map((x) => String(x.id)))
  if (!validIds.has(String(modalForm.value.withdrawTypeId))) {
    modalForm.value.withdrawTypeId = enabledWithdrawTypes.value[0]?.id || ''
  }
  isModalOpen.value = true
  updateManageWithdrawType()
}

const closeManageWithdrawModal = () => {
  isModalOpen.value = false
  // Reset form
  modalForm.value = {
    amount: '',
    withdrawTypeId: 'wt_demo',
    mtAccount: '',
    confirmAccount: '',
    comment: '',
    remark: ''
  }
}

const submitManageWithdraw = () => {
  if (!modalForm.value.withdrawTypeId) {
    window.alert('请选择出金类型')
    return
  }

  const type = currentWithdrawType.value
  pushFundOperationSnapshot({
    direction: 'withdraw',
    typeId: type?.id || String(modalForm.value.withdrawTypeId || ''),
    typeNameSnapshot: type?.name || '',
    countAsRealSnapshot: !!type?.countAsReal,
    amount: Number(modalForm.value.amount || 0),
    status: 'success',
    settled: true
  })

  closeManageWithdrawModal()
}

const goWithdrawAuditDetail = (account) => {
  router.push({ path: '/crm/withdraw-audit-detail', query: { account: String(account || '') } })
}
</script>

<style scoped>
.filter-input, .filter-select {
  height: 36px;
  border: 1px solid #E5E7EB;
  border-radius: 6px;
  background: #fff;
  color: #4B5563;
  font-size: 13px;
  padding: 0 12px;
  outline: none;
  width: 100%;
}
.filter-input:focus, .filter-select:focus {
  border-color: #C19B5E;
  box-shadow: 0 0 0 3px rgba(193, 155, 94, 0.12);
}
.type-pill {
  display: inline-flex;
  align-items: center;
  padding: 4px 10px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 600;
  line-height: 1;
  white-space: nowrap;
}
.type-pill.standard {
  color: #1D4ED8;
  background: #EFF6FF;
  border: 1px solid #BFDBFE;
}
.type-pill.cent {
  color: #7C3AED;
  background: #F5F3FF;
  border: 1px solid #DDD6FE;
}
.status-pill {
  display: inline-flex;
  align-items: center;
  padding: 2px 10px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 600;
  line-height: 20px;
  border: 1px solid transparent;
  white-space: nowrap;
}
.status-pill.pill-gray {
  background: #F3F4F6;
  color: #4B5563;
  border-color: #E5E7EB;
}
.status-pill.pill-amber {
  background: #FFF7ED;
  color: #B45309;
  border-color: #FED7AA;
}
.status-pill.pill-green {
  background: #ECFDF5;
  color: #047857;
  border-color: #A7F3D0;
}
.status-pill.pill-red {
  background: #FEF2F2;
  color: #B91C1C;
  border-color: #FECACA;
}
.modal-mask {
  position: fixed;
  inset: 0;
  background: rgba(17, 24, 39, 0.42);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  z-index: 60;
}
.modal-panel {
  width: 100%;
  max-width: 600px;
  background: #FFFFFF;
  border-radius: 10px;
  box-shadow: 0 24px 48px rgba(15, 23, 42, 0.18);
  overflow: hidden;
}
.modal-input {
  width: 100%;
  height: 36px;
  border: 1px solid #E5E7EB;
  border-radius: 8px;
  padding: 0 12px;
  font-size: 13px;
  color: #374151;
  outline: none;
  background: #fff;
}
.modal-input:focus,
.modal-textarea:focus {
  border-color: #C19B5E;
  box-shadow: 0 0 0 3px rgba(193, 155, 94, 0.12);
}
.modal-textarea {
  width: 100%;
  min-height: 38px;
  border: 1px solid #E5E7EB;
  border-radius: 8px;
  padding: 8px 12px;
  font-size: 13px;
  color: #374151;
  outline: none;
  resize: none;
  background: #fff;
}
.withdraw-type-hint {
  margin-top: 8px;
  font-size: 12px;
  border-radius: 8px;
  border: 1px solid #E5E7EB;
  padding: 8px 10px;
  line-height: 1.4;
}
.withdraw-type-hint--ok {
  background: #ECFDF5;
  border-color: #A7F3D0;
  color: #047857;
}
.withdraw-type-hint--warn {
  background: #FFF7ED;
  border-color: #FED7AA;
  color: #9A3412;
}
.withdraw-type-hint--special {
  background: #FFF7ED;
  border-color: #FDBA74;
  color: #B45309;
}
</style>
