<template>
  <div class="flex h-full bg-mainBg overflow-hidden">
    <div class="flex-1 flex flex-col min-w-0 bg-gray-50 overflow-hidden p-4 custom-scrollbar overflow-y-auto">
      <div class="bg-white border border-gray-100 rounded-xl shadow-sm">
        <div class="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <div class="text-sm font-bold text-gray-800">后台操作审计记录</div>
          <button
            type="button"
            class="h-9 px-4 rounded-md bg-primaryBtn hover:bg-primaryBtnHover text-white text-sm font-medium disabled:opacity-60 disabled:cursor-not-allowed"
            :disabled="filteredRecords.length === 0"
            @click="handleExportAudit"
          >
            导出审计数据
          </button>
        </div>
        <div class="px-5 py-4">
          <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-12 gap-3 text-xs items-end">
            <div class="grid grid-cols-[72px,1fr] items-center gap-2 xl:col-span-2">
              <div class="text-gray-600 w-[72px] shrink-0 text-right">操作类型：</div>
              <el-select v-model="filters.type" class="w-full" placeholder="不限" size="small">
                <el-option label="不限" value="all" />
                <el-option label="查看客户详情" value="view_client_detail" />
                <el-option label="导出报表" value="export_report" />
              </el-select>
            </div>
            <div class="grid grid-cols-[72px,1fr] items-center gap-2 xl:col-span-2">
              <div class="text-gray-600 w-[72px] shrink-0 text-right">操作人员：</div>
              <el-input v-model="filters.operator" class="w-full" placeholder="姓名/邮箱" clearable size="small" />
            </div>
            <div class="grid grid-cols-[72px,1fr] items-center gap-2 xl:col-span-2">
              <div class="text-gray-600 w-[72px] shrink-0 text-right">客户/报表：</div>
              <el-input v-model="filters.target" class="w-full" placeholder="客户邮箱/报表名称" clearable size="small" />
            </div>
            <div class="grid grid-cols-[72px,1fr] items-center gap-2 xl:col-span-2">
              <div class="text-gray-600 w-[72px] shrink-0 text-right">操作结果：</div>
              <el-select v-model="filters.result" class="w-full" placeholder="不限" size="small">
                <el-option label="不限" value="all" />
                <el-option label="成功" value="success" />
                <el-option label="失败" value="fail" />
              </el-select>
            </div>
            <div class="grid grid-cols-[72px,1fr] items-center gap-2 xl:col-span-4">
              <div class="text-gray-600 w-[72px] shrink-0 text-right">时间范围：</div>
              <div class="flex items-center gap-2 flex-1 min-w-0">
                <input
                  v-model="filters.startAt"
                  type="datetime-local"
                  class="flex-1 h-9 px-3 rounded-md border border-gray-200 bg-white text-xs text-gray-700 focus:border-primaryBtn outline-none"
                />
                <span class="text-gray-400">~</span>
                <input
                  v-model="filters.endAt"
                  type="datetime-local"
                  class="flex-1 h-9 px-3 rounded-md border border-gray-200 bg-white text-xs text-gray-700 focus:border-primaryBtn outline-none"
                />
              </div>
            </div>
            <div class="flex items-center justify-end gap-3 xl:col-span-2">
              <button class="h-9 bg-white border border-primaryBtn text-primaryBtn hover:bg-primaryBtn hover:text-white px-6 rounded text-xs transition-colors shadow-sm font-medium" @click="applyFilters">
                查询
              </button>
              <button class="h-9 bg-white border border-gray-300 text-gray-600 hover:bg-gray-50 px-6 rounded text-xs transition-colors shadow-sm font-medium" @click="resetFilters">
                重置
              </button>
            </div>
          </div>
        </div>
      </div>

      <div class="mt-4 bg-white border border-gray-100 rounded-xl shadow-sm overflow-hidden">
        <div class="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
          <div class="text-sm font-bold text-gray-800">审计列表</div>
          <div class="text-xs text-gray-500">共 {{ filteredRecords.length }} 条</div>
        </div>
        <div class="overflow-x-auto">
          <table class="w-full text-sm text-left min-w-[1320px]">
            <thead class="bg-tableHeader text-gray-600 border-b border-gray-200">
              <tr>
                <th class="px-4 py-3 font-medium whitespace-nowrap">操作类型</th>
                <th class="px-4 py-3 font-medium whitespace-nowrap">操作人员</th>
                <th class="px-4 py-3 font-medium whitespace-nowrap">操作时间</th>
                <th class="px-4 py-3 font-medium whitespace-nowrap">操作人 IP 地址</th>
                <th class="px-4 py-3 font-medium whitespace-nowrap">IP归属地</th>
                <th class="px-4 py-3 font-medium whitespace-nowrap">客户或报表名称</th>
                <th class="px-4 py-3 font-medium whitespace-nowrap">客户邮箱/报表类型</th>
                <th class="px-4 py-3 font-medium whitespace-nowrap text-right">导出条数</th>
                <th class="px-4 py-3 font-medium whitespace-nowrap text-center w-24">结果</th>
                <th class="px-4 py-3 font-medium whitespace-nowrap">关联页面</th>
                <th class="px-4 py-3 font-medium whitespace-nowrap text-center w-24">操作</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-100">
              <tr v-for="r in filteredRecords" :key="r.audit_id" class="hover:bg-gray-50/50 transition-colors">
                <td class="px-4 py-3 text-gray-700 whitespace-nowrap">{{ typeLabel(r.type) }}</td>
                <td class="px-4 py-3 text-gray-700 whitespace-nowrap">
                  <div class="font-medium text-gray-800">{{ r.operator?.name || '—' }}</div>
                  <div class="text-xs text-gray-500 font-mono">{{ r.operator?.email || r.operator?.account || '' }}</div>
                </td>
                <td class="px-4 py-3 text-gray-600 font-mono text-xs whitespace-nowrap">{{ r.at }}</td>
                <td class="px-4 py-3 text-gray-600 font-mono text-xs whitespace-nowrap">{{ r.ip || '—' }}</td>
                <td class="px-4 py-3 text-gray-700 whitespace-nowrap">{{ ipLocationLabel(r) }}</td>
                <td class="px-4 py-3 whitespace-nowrap">
                  <div class="text-gray-800 font-medium font-mono text-xs">{{ displayPrimary(r) }}</div>
                </td>
                <td class="px-4 py-3 text-gray-600 font-mono text-xs whitespace-nowrap">{{ targetMetaLabel(r) }}</td>
                <td class="px-4 py-3 text-right font-mono text-xs text-gray-700">{{ Number(r.export_count || 0) }}</td>
                <td class="px-4 py-3 text-center">
                  <span class="inline-flex items-center px-2 py-1 rounded-full text-[11px] border" :class="resultTagClass(r.result)">
                    {{ r.result === 'success' ? '成功' : '失败' }}
                  </span>
                </td>
                <td class="px-4 py-3 whitespace-nowrap">
                  <div class="text-gray-800 font-medium">{{ pageLabel(r.page) }}</div>
                  <div class="text-xs text-gray-400">—</div>
                </td>
                <td class="px-4 py-3 text-center">
                  <button type="button" class="text-xs text-gray-600 hover:text-gray-800 hover:underline" @click="openDetail(r)">
                    查看
                  </button>
                </td>
              </tr>
              <tr v-if="filteredRecords.length === 0">
                <td class="px-4 py-8 text-center text-sm text-gray-400" colspan="11">暂无审计记录</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>

  <el-drawer v-model="detail.open" direction="rtl" size="560px" :with-header="false">
    <div class="h-full flex flex-col">
      <div class="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
        <div class="text-sm font-semibold text-gray-800">审计详情</div>
        <button type="button" class="text-xs text-gray-500 hover:text-gray-700" @click="detail.open = false">关闭</button>
      </div>
      <div class="flex-1 overflow-y-auto p-5 space-y-4">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
        <div class="bg-gray-50 border border-gray-100 rounded-lg p-3">
          <div class="text-gray-500 text-xs">操作类型</div>
          <div class="mt-1 text-gray-800 font-medium">{{ typeLabel(detail.row?.type) }}</div>
        </div>
        <div class="bg-gray-50 border border-gray-100 rounded-lg p-3">
          <div class="text-gray-500 text-xs">操作人员</div>
          <div class="mt-1 text-gray-800 font-medium">{{ detail.row?.operator?.name || '—' }}</div>
          <div class="mt-1 text-xs text-gray-500 font-mono">{{ detail.row?.operator?.email || detail.row?.operator?.account || '' }}</div>
        </div>
        <div class="bg-gray-50 border border-gray-100 rounded-lg p-3">
          <div class="text-gray-500 text-xs">操作时间</div>
          <div class="mt-1 font-mono text-xs text-gray-800">{{ detail.row?.at || '—' }}</div>
        </div>
      </div>

      <div class="bg-white border border-gray-100 rounded-lg p-4">
        <div class="text-sm font-semibold text-gray-800">对象信息</div>
        <div class="mt-3 grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
          <div class="bg-gray-50 border border-gray-100 rounded-lg p-3">
            <div class="text-gray-500 text-xs">客户或报表名称</div>
            <div class="mt-1 text-gray-800 font-medium font-mono text-xs">{{ displayPrimary(detail.row) }}</div>
          </div>
          <div class="bg-gray-50 border border-gray-100 rounded-lg p-3">
            <div class="text-gray-500 text-xs">客户邮箱 / 报表类型</div>
            <div class="mt-1 font-mono text-xs text-gray-800">{{ targetMetaLabel(detail.row) }}</div>
          </div>
        </div>
      </div>

      <div class="bg-white border border-gray-100 rounded-lg p-4">
        <div class="text-sm font-semibold text-gray-800">导出范围</div>
        <div class="mt-3 text-xs text-gray-600 whitespace-pre-wrap break-words font-mono bg-gray-50 border border-gray-100 rounded-lg p-3">{{ formatConditions(detail.row?.export_conditions) }}</div>
        <div class="mt-3 grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
          <div class="bg-gray-50 border border-gray-100 rounded-lg p-3">
            <div class="text-gray-500 text-xs">导出条数</div>
            <div class="mt-1 font-mono text-xs text-gray-800">{{ Number(detail.row?.export_count || 0) }}</div>
          </div>
          <div class="bg-gray-50 border border-gray-100 rounded-lg p-3">
            <div class="text-gray-500 text-xs">操作结果</div>
            <div class="mt-1 text-gray-800 font-medium">{{ detail.row?.result === 'success' ? '成功' : '失败' }}</div>
            <div v-if="detail.row?.result === 'fail'" class="mt-1 text-xs text-rose-600">{{ detail.row?.fail_reason || '—' }}</div>
          </div>
        </div>
      </div>

      <div class="bg-white border border-gray-100 rounded-lg p-4">
        <div class="text-sm font-semibold text-gray-800">环境信息</div>
        <div class="mt-3 grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
          <div class="bg-gray-50 border border-gray-100 rounded-lg p-3">
            <div class="text-gray-500 text-xs">操作人 IP 地址</div>
            <div class="mt-1 font-mono text-xs text-gray-800">{{ detail.row?.ip || '—' }}</div>
          </div>
          <div class="bg-gray-50 border border-gray-100 rounded-lg p-3">
            <div class="text-gray-500 text-xs">IP 归属地</div>
            <div class="mt-1 text-xs text-gray-800">{{ ipLocationLabel(detail.row) }}</div>
          </div>
          <div class="bg-gray-50 border border-gray-100 rounded-lg p-3">
            <div class="text-gray-500 text-xs">关联页面</div>
            <div class="mt-1 text-gray-800 font-medium text-xs">{{ pageLabel(detail.row?.page) }}</div>
          </div>
          <div class="md:col-span-2 bg-gray-50 border border-gray-100 rounded-lg p-3">
            <div class="text-gray-500 text-xs">设备或浏览器信息</div>
            <div class="mt-1 font-mono text-xs text-gray-800 break-words whitespace-pre-wrap">{{ detail.row?.ua || '—' }}</div>
          </div>
        </div>
      </div>
      </div>
      <div class="px-5 py-4 border-t border-gray-100 flex items-center justify-end">
        <button type="button" class="h-9 px-4 rounded-md border border-gray-200 bg-white hover:bg-gray-50 text-gray-700 text-sm font-medium" @click="detail.open = false">
          关闭
        </button>
      </div>
    </div>
  </el-drawer>
</template>

<script setup>
import { computed, reactive, ref } from 'vue'
import { useRoute } from 'vue-router'
import { ElMessage } from 'element-plus'
import { exportAuditRecordsAsCsv, getAuditRecords, initOperationAuditDemo, recordExportReport } from '@/store/operationAuditDemo'

const route = useRoute()

initOperationAuditDemo()

const filters = reactive({
  type: 'all',
  operator: '',
  target: '',
  result: 'all',
  startAt: '',
  endAt: '',
})

const applied = ref({ ...filters })

const parseTime = (value) => {
  const raw = String(value || '').trim()
  if (!raw) return null
  const dt = new Date(raw)
  return Number.isNaN(dt.getTime()) ? null : dt
}

const parseAuditAt = (value) => {
  const raw = String(value || '').trim()
  if (!raw) return null
  const dt = new Date(raw.replace(' ', 'T'))
  return Number.isNaN(dt.getTime()) ? null : dt
}

const normalize = (v) => String(v ?? '').trim().toLowerCase()

const records = computed(() => getAuditRecords())

const getCustomerEmail = (row) => {
  const r = row || {}
  const email = String(r.customerEmail || r.customer_email || r.target_email || '').trim()
  return email
}

const displayPrimary = (row) => {
  const r = row || {}
  if (r.type === 'view_client_detail' || r.target_type === 'client') {
    const email = getCustomerEmail(r)
    return email || '—'
  }
  if (r.type === 'export_report' || r.target_type === 'report') {
    const name = reportTypeLabel(r)
    return name || '—'
  }
  const fallback = String(r.target_name || '').trim()
  return fallback || '—'
}

const filteredRecords = computed(() => {
  const f = applied.value
  const type = String(f.type || 'all')
  const result = String(f.result || 'all')
  const opKeyword = normalize(f.operator)
  const targetKeyword = normalize(f.target)
  const startAt = parseTime(f.startAt)
  const endAt = parseTime(f.endAt)

  return (records.value || []).filter((r) => {
    if (type !== 'all' && r.type !== type) return false
    if (result !== 'all' && r.result !== result) return false

    if (opKeyword) {
      const hit = normalize(r.operator?.name).includes(opKeyword) || normalize(r.operator?.account).includes(opKeyword)
      if (!hit) return false
    }

    if (targetKeyword) {
      const hit =
        normalize(displayPrimary(r)).includes(targetKeyword) ||
        normalize(getCustomerEmail(r)).includes(targetKeyword) ||
        normalize(reportTypeLabel(r)).includes(targetKeyword) ||
        normalize(r.target_type).includes(targetKeyword)
      if (!hit) return false
    }

    if (startAt || endAt) {
      const at = parseAuditAt(r.at)
      if (!at) return false
      if (startAt && at.getTime() < startAt.getTime()) return false
      if (endAt && at.getTime() > endAt.getTime()) return false
    }

    return true
  })
})

const applyFilters = () => {
  applied.value = { ...filters }
}

const resetFilters = () => {
  filters.type = 'all'
  filters.operator = ''
  filters.target = ''
  filters.result = 'all'
  filters.startAt = ''
  filters.endAt = ''
  applied.value = { ...filters }
}

const typeLabel = (type) => {
  if (type === 'view_client_detail') return '查看客户详情'
  if (type === 'export_report') return '导出报表'
  return '—'
}

const targetMetaLabel = (row) => {
  const r = row || {}
  if (r.type === 'view_client_detail' || r.target_type === 'client') {
    const email = getCustomerEmail(r)
    return email || '—'
  }
  if (r.type === 'export_report' || r.target_type === 'report') {
    const label = reportTypeLabel(r)
    return label || '—'
  }
  return '—'
}

const reportTypeLabel = (row) => {
  const r = row || {}
  const id = String(r.target_id || '').trim()
  if (id === 'deposit_withdraw_detail') return '出入金报表（明细导出）'
  if (id === 'withdraw_report') return '出金报表'
  if (id === 'trading_report') return '交易报表'
  if (id === 'sales_trading_report') return '销售交易报表'
  const name = String(r.target_name || '').trim()
  return name || ''
}

const pageLabel = (page) => {
  const p = String(page || '').trim()
  if (!p) return '—'
  if (/#\/crm\/client-detail/i.test(p)) return '客户详情页'
  if (/#\/report\/deposit-withdraw/i.test(p)) return '出入金报表页'
  if (/#\/report\/withdraw-report/i.test(p)) return '出金报表页'
  if (/#\/report\/trading/i.test(p)) return '交易报表页'
  if (/#\/report\/sales-trading/i.test(p)) return '销售交易报表页'
  if (/#\/system\/operation-audit/i.test(p)) return '操作审计页'
  return '业务页面'
}

const ipLocationLabel = (row) => {
  const r = row || {}
  const label = String(r.ip_location || '').trim().replace(/\s*·\s*/g, ' · ')
  if (label) return label
  const ip = String(r.ip || '').trim()
  return ip ? '暂无法解析' : '—'
}

const resultTagClass = (result) => {
  if (result === 'success') return 'border-emerald-200 bg-emerald-50 text-emerald-700'
  return 'border-rose-200 bg-rose-50 text-rose-700'
}

const formatConditions = (value) => {
  if (!value) return '—'
  try {
    return JSON.stringify(value, null, 2)
  } catch {
    return String(value)
  }
}

const detail = ref({ open: false, row: null })

const openDetail = (row) => {
  detail.value = { open: true, row }
}

const handleExportAudit = () => {
  const rows = filteredRecords.value || []
  if (rows.length === 0) return
  exportAuditRecordsAsCsv(rows)
  recordExportReport({
    reportName: '操作审计记录（导出）',
    reportType: 'operation_audit',
    conditions: { ...applied.value },
    count: rows.length,
    page: route.fullPath,
    ok: true,
  })
  ElMessage({ message: '已导出（演示）', type: 'success' })
}
</script>
