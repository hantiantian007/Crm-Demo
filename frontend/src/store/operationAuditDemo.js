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

const DEMO_IP_POOL = [
  { ip: '203.0.113.8', country: '中国', city: '香港' },
  { ip: '198.51.100.23', country: '新加坡', city: '新加坡' },
  { ip: '192.0.2.14', country: '英国', city: '伦敦' },
  { ip: '203.0.113.98', country: '日本', city: '东京' },
]

const formatIpLocation = ({ country, city }) => {
  const c = String(country || '').trim()
  const t = String(city || '').trim()
  if (!c && !t) return ''
  if (!c) return t
  if (!t) return c
  return `${c} · ${t}`
}

const hashKey = (v) => {
  const s = String(v || '')
  let n = 0
  for (let i = 0; i < s.length; i += 1) n = (n * 31 + s.charCodeAt(i)) >>> 0
  return n
}

const pickDemoIp = (key) => {
  const list = DEMO_IP_POOL
  if (list.length === 0) return { ip: '203.0.113.8', label: '暂无法解析' }
  const idx = hashKey(key) % list.length
  const item = list[idx]
  return { ...item, label: formatIpLocation(item) }
}

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

const baseRecord = () => {
  const audit_id = uid()
  const net = pickDemoIp(audit_id)
  return {
    audit_id,
    operator: getOperatorSnapshot(),
    at: now(),
    ip: net.ip,
    ip_location: net.label,
    ua: getBrowserUa(),
    page: '',
    target_name: '',
    target_id: '',
    customerEmail: '',
    target_email: '',
    target_type: '',
    export_conditions: null,
    export_count: 0,
    result: 'success',
    fail_reason: '',
  }
}

const normalizeDemoEmail = (raw) => {
  const v = String(raw || '').trim()
  if (!v) return ''
  if (/@/.test(v)) return v
  const safe = v
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '.')
    .replace(/^\.+|\.+$/g, '')
    .slice(0, 32)
  if (!safe) return ''
  return `${safe}@demo.com`
}

const ensureCustomerEmail = (records) => {
  if (!Array.isArray(records)) return []
  const pool = ['agent@example.com', 'direct@example.com', 'user@example.com']
  let cursor = 0

  return records.map((raw) => {
    const r = raw && typeof raw === 'object' ? { ...raw } : {}
    const isClient = r.type === 'view_client_detail' || r.target_type === 'client'
    if (!isClient) return r

    const current = String(r.customerEmail || r.target_email || '').trim()
    const normalized = normalizeDemoEmail(current)
    if (normalized) {
      r.customerEmail = normalized
      r.target_email = r.target_email || normalized
      return r
    }

    const next = pool[cursor] || `user${cursor + 1}@demo.com`
    cursor += 1
    r.customerEmail = next
    r.target_email = r.target_email || next
    return r
  })
}

const ensureNetworkInfo = (records) => {
  if (!Array.isArray(records)) return []

  const normalizeLocation = (raw, ip) => {
    const label = String(raw || '').trim()
    const normalized = label.replace(/\s*·\s*/g, ' · ')
    if (/^[^·]+ · [^·]+$/.test(normalized)) return normalized
    const matched = DEMO_IP_POOL.find((x) => x.ip === ip)
    if (matched) return formatIpLocation(matched)
    if (label && label !== '解析中') return normalized
    return '暂无法解析'
  }

  return records.map((raw) => {
    const r = raw && typeof raw === 'object' ? { ...raw } : {}
    const snapshot = pickDemoIp(r.audit_id || r.target_id || r.page || '')

    const ip = String(r.ip || '').trim()
    const normalizedIp = ip && ip !== '127.0.0.1' ? ip : snapshot.ip
    r.ip = normalizedIp

    r.ip_location = normalizeLocation(r.ip_location, normalizedIp)
    return r
  })
}

const createInitialRecords = () => [
  {
    ...baseRecord(),
    audit_id: 'AUDIT_20261010_0001',
    type: 'view_client_detail',
    at: '2026-10-10 10:12:35',
    operator: { name: '系统管理员（演示）', account: 'admin@demo.com', role: '系统管理员' },
    target_name: '代理 A（演示）',
    target_id: 'u_agent_01',
    customerEmail: 'agent@example.com',
    target_email: 'agent@example.com',
    target_type: 'client',
    page: '/#/crm/client-detail?id=u_agent_01',
    ip: '203.0.113.8',
    ip_location: '中国 · 香港',
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
    ip: '198.51.100.23',
    ip_location: '新加坡 · 新加坡',
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
        operationAuditDemoState.records = ensureNetworkInfo(ensureCustomerEmail(parsed.records))
        persist()
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
  const email = normalizeDemoEmail(clientId)
  const record = {
    ...baseRecord(),
    type: 'view_client_detail',
    target_name: String(clientName || '').trim() || '客户详情',
    target_id: String(clientId || '').trim(),
    customerEmail: email,
    target_email: email,
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
  const pageLabel = (page) => {
    const p = String(page || '').trim()
    if (!p) return ''
    if (/#\/crm\/client-detail/i.test(p)) return '客户详情页'
    if (/#\/report\/deposit-withdraw/i.test(p)) return '出入金报表页'
    if (/#\/report\/withdraw-report/i.test(p)) return '出金报表页'
    if (/#\/report\/trading/i.test(p)) return '交易报表页'
    if (/#\/report\/sales-trading/i.test(p)) return '销售交易报表页'
    if (/#\/system\/operation-audit/i.test(p)) return '操作审计页'
    return '业务页面'
  }
  const reportTypeLabel = (r) => {
    const id = String(r?.target_id || '').trim()
    if (id === 'deposit_withdraw_detail') return '出入金报表（明细导出）'
    if (id === 'withdraw_report') return '出金报表'
    if (id === 'trading_report') return '交易报表'
    if (id === 'sales_trading_report') return '销售交易报表'
    const name = String(r?.target_name || '').trim()
    return name || ''
  }
  const targetMetaLabel = (r) => {
    if (r?.type === 'view_client_detail' || r?.target_type === 'client') return r?.customerEmail || r?.target_email || ''
    if (r?.type === 'export_report' || r?.target_type === 'report') return reportTypeLabel(r)
    return ''
  }
  const displayPrimary = (r) => {
    if (r?.type === 'view_client_detail' || r?.target_type === 'client') return r?.customerEmail || r?.target_email || ''
    if (r?.type === 'export_report' || r?.target_type === 'report') return reportTypeLabel(r)
    return r?.target_name || ''
  }
  const ipLocationLabel = (r) => {
    const ip = String(r?.ip || '').trim()
    const label = String(r?.ip_location || '').trim()
    const normalized = label.replace(/\s*·\s*/g, ' · ')
    if (/^[^·]+ · [^·]+$/.test(normalized)) return normalized
    const matched = DEMO_IP_POOL.find((x) => x.ip === ip)
    if (matched) return formatIpLocation(matched)
    if (label && label !== '解析中') return normalized
    return ip ? '暂无法解析' : '暂无法解析'
  }
  const mapped = list.map((r) => ({
    操作类型: r.type === 'view_client_detail' ? '查看客户详情' : '导出报表',
    操作人员: r.operator?.name || '',
    操作邮箱: r.operator?.email || r.operator?.account || '',
    操作时间: r.at || '',
    客户或报表名称: displayPrimary(r),
    客户邮箱或报表类型: targetMetaLabel(r),
    导出条件: r.export_conditions ? JSON.stringify(r.export_conditions) : '',
    导出条数: Number(r.export_count || 0),
    操作结果: r.result === 'success' ? '成功' : '失败',
    失败原因: r.fail_reason || '',
    "操作人 IP 地址": r.ip || '',
    "IP 归属地": ipLocationLabel(r),
    设备信息: r.ua || '',
    关联页面: pageLabel(r.page),
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
