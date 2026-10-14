import { reactive } from 'vue'
import { demoRoleState } from '@/store/demoRole'
import { getSessionUser } from '@/store/passwordSecurityDemo'

const STORAGE_KEY = 'demo_operation_audit_v1'

const uid = () => {
  const rand = Math.random().toString(36).slice(2, 8).toUpperCase()
  return `AUDIT_${Date.now()}_${rand}`
}

const now = () => {
  const d = new Date()
  const pad = (n) => String(n).padStart(2, '0')
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`
}

const getDefaultIp = () => '127.0.0.1'

const getBrowserUa = () => {
  try {
    return navigator.userAgent || ''
  } catch {
    return ''
  }
}

const normalizeRoleLabel = (user) => {
  if (!user) return '未知'
  if (user.account_type === 'system' || demoRoleState.role === 'admin') return '系统管理员'
  if (user.biz_identity === 'agent') return '代理'
  if (user.biz_identity === 'direct') return '直客'
  return '客户'
}

const getOperatorSnapshot = () => {
  const user = getSessionUser()
  return {
    name: user?.name || '系统管理员（演示）',
    account: user?.email || 'admin@demo.com',
    role: normalizeRoleLabel(user),
  }
}

const baseRecord = () => ({
  audit_id: uid(),
  operator: getOperatorSnapshot(),
  at: now(),
  ip: getDefaultIp(),
  ua: getBrowserUa(),
  page: '',
  target_name: '',
  target_id: '',
  target_type: '',
  export_conditions: null,
  export_count: 0,
  result: 'success',
  fail_reason: '',
})

const createInitialRecords = () => [
  {
    ...baseRecord(),
    audit_id: 'AUDIT_20261010_0001',
    type: 'view_client_detail',
    at: '2026-10-10 10:12:35',
    operator: { name: '系统管理员（演示）', account: 'admin@demo.com', role: '系统管理员' },
    target_name: '代理 A（演示）',
    target_id: 'u_agent_01',
    target_type: 'client',
    page: '/#/crm/client-detail?id=u_agent_01',
  },
  {
    ...baseRecord(),
    audit_id: 'AUDIT_20261010_0002',
    type: 'export_report',
    at: '2026-10-10 10:18:22',
    operator: { name: '系统管理员（演示）', account: 'admin@demo.com', role: '系统管理员' },
    target_name: '出入金报表（明细导出）',
    target_id: 'deposit_withdraw_detail',
    target_type: 'report',
    export_conditions: { time_range: '2026-09-01 ~ 2026-09-30', filters: { userType: 'all' }, data_scope: '全部' },
    export_count: 23,
    page: '/#/report/deposit-withdraw',
  },
]

export const operationAuditDemoState = reactive({
  records: [],
})

const persist = () => {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(operationAuditDemoState))
  } catch {
  }
}

export const initOperationAuditDemo = () => {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (raw) {
      const parsed = JSON.parse(raw)
      if (Array.isArray(parsed?.records)) {
        operationAuditDemoState.records = parsed.records
        return
      }
    }
  } catch {
  }
  operationAuditDemoState.records = createInitialRecords()
  persist()
}

export const getAuditRecords = () => {
  if (!Array.isArray(operationAuditDemoState.records) || operationAuditDemoState.records.length === 0) {
    initOperationAuditDemo()
  }
  return operationAuditDemoState.records
}

const pushRecord = (record) => {
  const list = getAuditRecords()
  list.unshift(record)
  persist()
  return record
}

export const recordViewClientDetail = ({ clientId, clientName, page, ok, reason }) => {
  const record = {
    ...baseRecord(),
    type: 'view_client_detail',
    target_name: String(clientName || '').trim() || '客户详情',
    target_id: String(clientId || '').trim(),
    target_type: 'client',
    page: String(page || '').trim(),
    result: ok ? 'success' : 'fail',
    fail_reason: ok ? '' : String(reason || '').trim(),
  }
  return pushRecord(record)
}

export const recordExportReport = ({ reportName, reportType, conditions, count, page, ok, reason }) => {
  const record = {
    ...baseRecord(),
    type: 'export_report',
    target_name: String(reportName || '').trim() || '报表导出',
    target_id: String(reportType || '').trim(),
    target_type: 'report',
    export_conditions: conditions ?? null,
    export_count: Number(count || 0),
    page: String(page || '').trim(),
    result: ok ? 'success' : 'fail',
    fail_reason: ok ? '' : String(reason || '').trim(),
  }
  return pushRecord(record)
}

export const exportAuditRecordsAsCsv = (rows) => {
  const list = Array.isArray(rows) ? rows : []
  const mapped = list.map((r) => ({
    操作记录ID: r.audit_id,
    操作类型: r.type === 'view_client_detail' ? '查看客户详情' : '导出报表',
    操作人员: r.operator?.name || '',
    操作账号: r.operator?.account || '',
    操作角色: r.operator?.role || '',
    操作时间: r.at || '',
    客户或报表名称: r.target_name || '',
    客户ID或报表类型: r.target_id || '',
    导出条件: r.export_conditions ? JSON.stringify(r.export_conditions) : '',
    导出条数: Number(r.export_count || 0),
    操作结果: r.result === 'success' ? '成功' : '失败',
    失败原因: r.fail_reason || '',
    IP地址: r.ip || '',
    设备信息: r.ua || '',
    关联页面: r.page || '',
  }))
  const headers = Object.keys(mapped[0] || {})
  const csv = [headers.join(','), ...mapped.map((r) => headers.map((h) => `"${String(r[h] ?? '').replace(/"/g, '""')}"`).join(','))].join('\n')
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `operation-audit-${Date.now()}.csv`
  a.click()
  URL.revokeObjectURL(url)
}
