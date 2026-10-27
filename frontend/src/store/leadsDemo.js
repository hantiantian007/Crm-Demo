import { ref } from 'vue'

// Frontend demo only. WeChat fixtures are NOT real official-account submissions.
// Future integration: the form submits to a backend; CRM queries its lead API.
// There is no cross-project transmission, form interception or API request here.
export const LEADS_KEY = 'crm-leads-demo-v1'
export const WECHAT_SOURCE = 'wechat_contact'
export const WECHAT_LABEL = '微信公众号-联系我们'
export const LEAD_OPERATOR = '演示管理员'
export const LEAD_STATES = { assigned: '跟进中', unassigned: '待分配', public: '退回公海', invalid: '无效线索', converted: '已转化' }
export const LEAD_SOURCES = { website: '官网访问', social: '社交平台', referral: '客户推荐', online_event: '线上活动', offline_event: '线下金融活动', news_site: '金融资讯网站', other: '其他渠道', [WECHAT_SOURCE]: WECHAT_LABEL }
export const INQUIRY_TYPES = { '1': '成为代理', '2': '政策了解', '3': '个人交易', '4': '其他', '5': '开户咨询', '6': '活动咨询' }
export const LEAD_STAFF = [{ id: 's1', name: '张三', role: '销售' }, { id: 's2', name: '李四', role: '销售' }, { id: 's3', name: '王刚', role: '销售' }, { id: 'c1', name: '小林', role: '客服' }, { id: 'c2', name: '小周', role: '客服' }]
export const copyLead = value => JSON.parse(JSON.stringify(value))
export const leadTime = (date = new Date()) => new Date(date.getTime() + 8 * 3600000).toISOString().slice(0, 19).replace('T', ' ')
export const staffName = id => LEAD_STAFF.find(person => person.id === id)?.name || '-'
export const latestFollow = row => row.followups.at(-1)
const makeId = () => globalThis.crypto?.randomUUID?.() || `${Date.now()}-${Math.random().toString(36).slice(2)}`

// Contact form demo validation; no WeChat identity or country-specific phone check.
export function validateContactSubmission(input = {}) {
  const values = Object.fromEntries(['name', 'countryCode', 'phoneNumber', 'wechat', 'email'].map(key => [key, String(input[key] ?? '').trim()]))
  values.inquiry = String(input.inquiry ?? '')
  const errors = {}
  for (const [key, label] of Object.entries({ name: '姓名', phoneNumber: '手机号码', wechat: '微信号', email: '邮箱' })) {
    if (!values[key]) errors[key] = `${label}不能为空，不能仅输入空格`
  }
  if (!/^\+\d{1,4}$/.test(values.countryCode)) errors.countryCode = '请选择有效的国家/地区区号'
  if (values.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) errors.email = '请输入有效的邮箱地址'
  if ([...values.inquiry].length > 500) errors.inquiry = '留言内容不能超过 500 字'
  return { values, errors, ok: Object.keys(errors).length === 0 }
}

export function createLeadFixtures() {
  // Preserve the six original list records, source meanings and lead IDs.
  const legacy = [
    { id: 'LD-20250101-001', name: '张三', email: 'XXXXX@qq.com', phone: '15213099999', wechat: 'wx_zhangsan', whatsapp: '+852 12345678', inquiry: '政策了解', inquiryType: '2', source: 'website', customerSource: '官网录入', count: 3, heat: 'hot', agent: '王代理', assigneeId: 's2', status: 'assigned', createdAt: '2025-01-01 21:22:22', note: '这是客服自己填写', followAt: '2025-01-01 21:22:22', nextFollowAt: '2025-01-02 10:00:00' },
    { id: 'LD-20250101-002', name: '王五', email: 'wangwu@163.com', phone: '13800138000', inquiry: '成为代理', inquiryType: '1', source: 'other', customerSource: '销售录入', count: 1, heat: 'warm', status: 'unassigned', createdAt: '2025-01-01 21:22:22' },
    { id: 'LD-20241220-003', name: '陈老板', email: 'chen@company.com', phone: '13600136000', wechat: 'chen_boss', inquiry: '开户咨询', inquiryType: '5', source: 'referral', customerSource: '注册页录入', count: 2, heat: 'hot', agent: '陈总', assigneeId: 's3', status: 'assigned', createdAt: '2024-12-20 14:00:00', note: '客户已提交资料审核中', followAt: '2024-12-21 09:30:00' },
    { id: 'LD-20241210-004', name: '赵六', email: 'zhao6@qq.com', phone: '13900139000', inquiry: '个人交易', inquiryType: '3', source: 'offline_event', customerSource: '官网录入', count: 2, heat: 'cold', assigneeId: 's2', status: 'public', createdAt: '2024-12-10 10:00:00', note: '客户电话一直打不通，空号。', followAt: '2024-12-15 15:30:00' },
    { id: 'LD-20241120-005', name: '测试客', email: 'test@test.com', phone: '13100000000', inquiry: '其他', inquiryType: '4', source: 'other', customerSource: '销售录入', count: 1, assigneeId: 's2', status: 'invalid', createdAt: '2024-11-20 10:00:00', note: '同行套话，非真实意向', followAt: '2024-11-20 10:30:00' },
    { id: 'LD-20241101-006', name: '孙七', email: 'sunqi@gmail.com', phone: '13700137000', inquiry: '成为代理', inquiryType: '1', source: 'social', customerSource: '官网录入', count: 4, agent: '张代理', assigneeId: 's1', status: 'converted', createdAt: '2024-11-01 10:00:00', note: '客户已成功开通代理账户并完成首笔入金。', followAt: '2024-11-05 14:20:00', clientId: '88820391' },
    { id: 'LD-DEMO-SERVICE-001', name: '何女士', email: 'service.lead@example.com', phone: '+852 6123 0099', inquiry: '活动咨询', inquiryType: '6', source: 'online_event', customerSource: '客服录入', count: 1, heat: 'warm', assigneeId: 'c1', status: 'assigned', createdAt: '2026-10-23 10:00:00', note: '已通过邮件发送活动介绍，等待客户回复。', followAt: '2026-10-23 10:30:00' }
  ]
  const wechat = [
    ['陈明', '+86', '13800001001', '您好，想了解开户需要准备哪些资料。'],
    ['林晓雨', '+852', '61230002', '请问如何修改绑定邮箱？我可以提供身份验证资料，希望工作人员通过邮件联系我。'],
    ['Alex Chen', '+65', '81230003', '想了解服务时间及账户类型，请通过电子邮件与我联系，谢谢。'],
    ['黄嘉欣', '+886', '912000004', '我在微信公众号查看了活动介绍，想确认参加条件、适用账户以及活动结束时间。\n工作时间不方便接听电话，请先通过邮件发送相关说明。我尚未提交开户申请，也想了解后续需要准备的资料及咨询渠道，谢谢。']
  ].map(([name, countryCode, number, inquiry], index) => ({ id: `LD-DEMO-WECHAT-${index + 1}`, name, email: `wechat.contact${index + 1}@example.com`, countryCode, phone: `${countryCode} ${number}`, inquiry, inquiryType: '4', source: WECHAT_SOURCE, customerSource: WECHAT_LABEL, count: 1, status: 'unassigned', createdAt: `2026-10-${26 - index} 09:30:00`, channel: '微信公众号' }))
  return [...wechat, ...legacy].map(item => {
    const row = { wechat: '', whatsapp: '', otherContact: '', heat: '', agent: '', assigneeId: '', countryCode: '', nextFollowAt: '', clientId: '', channel: 'Email', notes: '', tags: [], revision: 0, ...item }
    row.followups = item.note ? [{ id: `${row.id}-initial`, content: item.note, actor: staffName(row.assigneeId), time: item.followAt, status: row.status, nextFollowAt: row.nextFollowAt }] : []
    row.changes = []
    row.conversion = row.clientId ? { accountStatus: '审核通过', firstDepositAt: '2024-11-05 14:20:00', firstDeposit: '5,000.00', netDeposit: '12,500.00', balance: '15,230.50', lots: '45.5', profit: '+2,730.50' } : null
    // Historical counts are retained. Only known submission details are supplied;
    // do not fabricate earlier timestamps or automatically merge matching emails.
    row.submissions = [{ name: row.name, phone: row.phone, countryCode: row.countryCode, email: row.email, inquiry: row.inquiry, time: row.createdAt, source: row.source, customerSource: row.customerSource }]
    return row
  })
}

export function filterLeads(rows, filters = {}, tab = 'all') {
  const text = value => String(value || '').trim().toLowerCase()
  const inRange = (value, from, to) => (!from || (!!value && value >= `${from} 00:00:00`)) && (!to || (!!value && value <= `${to} 23:59:59`))
  return rows.filter(row => (tab === 'all' || row.status === tab)
    && row.name.toLowerCase().includes(text(filters.name))
    && row.email.toLowerCase().includes(text(filters.email))
    && (!text(filters.contact) || [row.phone, row.wechat, row.whatsapp, row.otherContact].some(value => text(value).replace(/[\s()-]/g, '').includes(text(filters.contact).replace(/[\s()-]/g, ''))))
    && (!filters.inquiry || row.inquiryType === filters.inquiry)
    && (!filters.source || row.source === filters.source)
    && (!filters.heat || row.heat === filters.heat)
    && (!filters.assignee || (filters.assignee === 'unassigned' ? !row.assigneeId : row.assigneeId === filters.assignee))
    && inRange(latestFollow(row)?.time, filters.followStart, filters.followEnd)
    && inRange(row.nextFollowAt, filters.nextStart, filters.nextEnd))
}
export function paginateLeads(rows, requestedPage = 1, size = 10) {
  const totalPages = Math.max(1, Math.ceil(rows.length / size))
  const page = Math.min(Math.max(1, requestedPage), totalPages)
  return { page, totalPages, total: rows.length, rows: rows.slice((page - 1) * size, page * size) }
}
function validRow(row) {
  return row && ['id', 'name', 'email', 'phone', 'inquiry', 'createdAt', 'customerSource', 'assigneeId', 'nextFollowAt'].every(key => typeof row[key] === 'string')
    && LEAD_STATES[row.status] && LEAD_SOURCES[row.source] && Number.isInteger(row.revision)
    && ['followups', 'changes', 'submissions', 'tags'].every(key => Array.isArray(row[key]))
    && row.followups.every(f => f && typeof f.content === 'string' && typeof f.time === 'string' && typeof f.actor === 'string' && LEAD_STATES[f.status])
    && row.submissions.every(s => s && typeof s.phone === 'string' && typeof s.inquiry === 'string')
}

export function createLeadsStore({ storage = () => window.localStorage, now = leadTime } = {}) {
  const records = ref([])
  const error = ref('')
  function refresh() {
    try {
      const raw = storage().getItem(LEADS_KEY)
      const rows = raw === null ? createLeadFixtures() : JSON.parse(raw)
      if (!Array.isArray(rows) || !rows.every(validRow) || new Set(rows.map(row => row.id)).size !== rows.length) throw new Error('invalid')
      records.value = rows
      error.value = ''
      return true
    } catch { error.value = '本地留资演示数据读取失败，未覆盖原数据。请检查浏览器存储权限或数据。'; return false }
  }
  function mutate(ids, revisions, action) {
    if (!refresh()) return { ok: false, error: error.value }
    const next = copyLead(records.value)
    const selected = [...new Set(ids)].map(id => next.find(row => row.id === id))
    if (!selected.length || selected.some(row => !row)) return { ok: false, error: '请选择存在的留资记录' }
    if (selected.some(row => row.revision !== revisions?.[row.id])) return { ok: false, error: '记录已更新，请重新打开操作窗口后再试' }
    const message = action(selected, now())
    if (message) return { ok: false, error: message }
    selected.forEach(row => { row.revision += 1 })
    try { storage().setItem(LEADS_KEY, JSON.stringify(next)); records.value = next; return { ok: true } }
    catch { return { ok: false, error: '保存失败：本地存储不可用或空间不足，修改未生效，请重试' } }
  }
  function submitContact(input) {
    const checked = validateContactSubmission(input)
    if (!checked.ok) return { ok: false, errors: checked.errors, error: Object.values(checked.errors)[0] }
    if (!refresh()) return { ok: false, error: error.value }
    const values = checked.values
    const time = now()
    const phone = `${values.countryCode} ${values.phoneNumber}`
    let id
    do { id = `LD-CONTACT-${makeId()}` } while (records.value.some(row => row.id === id))
    const row = {
      id, ...values, phone, inquiryType: '4', source: WECHAT_SOURCE, customerSource: WECHAT_LABEL,
      createdAt: time, status: 'unassigned', assigneeId: '', count: 1, revision: 0,
      whatsapp: '', otherContact: '', heat: '', agent: '', nextFollowAt: '', clientId: '',
      channel: '微信公众号', notes: '', tags: [], followups: [], changes: [], conversion: null,
      // Immutable submission snapshot: assignment/follow-up/profile edits never change it.
      submissions: [{ ...values, phone, time, source: WECHAT_SOURCE, customerSource: WECHAT_LABEL }],
      demoOnly: true
    }
    const next = [row, ...copyLead(records.value)]
    try {
      storage().setItem(LEADS_KEY, JSON.stringify(next))
      records.value = next
      return { ok: true, id }
    } catch { return { ok: false, error: '提交失败：本地存储不可用或空间不足，请保留填写内容后重试' } }
  }
  function assign(ids, assigneeId, revisions) {
    if (!LEAD_STAFF.some(person => person.id === assigneeId)) return { ok: false, error: '请选择销售或客服' }
    return mutate(ids, revisions, (rows, time) => {
      if (rows.some(row => ['invalid', 'converted'].includes(row.status))) return '无效或已转化记录不能分配，请先通过跟进更新状态'
      rows.forEach(row => {
        row.changes.push({ time, field: '归属销售 / 跟进状态', before: `${staffName(row.assigneeId)} / ${LEAD_STATES[row.status]}`, after: `${staffName(assigneeId)} / 跟进中`, actor: LEAD_OPERATOR })
        row.assigneeId = assigneeId
        row.status = 'assigned'
      })
    })
  }
  function follow(id, payload, revision) {
    const content = String(payload.content || '').trim()
    if (!content) return { ok: false, error: '请填写跟进内容，不能仅输入空格' }
    if (content.length > 2000) return { ok: false, error: '跟进内容不能超过 2000 字' }
    if (!['assigned', 'invalid', 'converted'].includes(payload.status)) return { ok: false, error: '请选择现有跟进状态' }
    const nextFollowAt = payload.nextFollowAt ? payload.nextFollowAt.replace('T', ' ') + (payload.nextFollowAt.length === 16 ? ':00' : '') : ''
    if (nextFollowAt && !Number.isFinite(Date.parse(nextFollowAt.replace(' ', 'T') + '+08:00'))) return { ok: false, error: '下次跟进时间格式无效' }
    return mutate([id], { [id]: revision }, ([row], time) => {
      if (!row.assigneeId || ['unassigned', 'public'].includes(row.status)) return '请先分配给销售或客服，再新增跟进'
      row.followups.push({ id: makeId(), content, actor: LEAD_OPERATOR, time, status: payload.status, nextFollowAt })
      row.changes.push({ time, field: '跟进状态', before: LEAD_STATES[row.status], after: LEAD_STATES[payload.status], actor: LEAD_OPERATOR })
      row.status = payload.status
      row.nextFollowAt = nextFollowAt
    })
  }
  function returnToPool(id, revision) {
    return mutate([id], { [id]: revision }, ([row], time) => {
      if (row.status !== 'assigned') return '仅跟进中的记录可以退回公海'
      row.changes.push({ time, field: '归属销售 / 跟进状态', before: `${staffName(row.assigneeId)} / 跟进中`, after: '- / 退回公海', actor: LEAD_OPERATOR })
      row.assigneeId = ''
      row.status = 'public'
      row.nextFollowAt = ''
    })
  }
  function saveProfile(id, values, revision) {
    if (!values.name?.trim() || !values.phone?.trim()) return { ok: false, error: '姓名和手机号码不能为空' }
    return mutate([id], { [id]: revision }, ([row], time) => {
      for (const key of ['name', 'phone', 'wechat', 'whatsapp', 'otherContact', 'notes', 'channel']) {
        const value = String(values[key] || '').trim()
        if (value !== row[key]) row.changes.push({ time, field: ({ name: '姓名', phone: '手机号码', wechat: '微信', whatsapp: 'WhatsApp', otherContact: '其他联系方式', notes: '备注说明', channel: '查询渠道' })[key], before: row[key] || '-', after: value || '-', actor: LEAD_OPERATOR })
        row[key] = value
      }
      // Original submissions, source, email and free-form message remain intact.
    })
  }
  return { records, error, refresh, assign, follow, returnToPool, saveProfile, submitContact }
}
export const leadsStore = createLeadsStore()
