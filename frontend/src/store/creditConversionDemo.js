import { reactive } from 'vue'

const STORAGE_KEY = 'crm_credit_conversion_demo_v1'

const nowTs = () => Date.now()
const nowStr = () => new Date().toISOString().slice(0, 19).replace('T', ' ')
const uid = (p) => `${p}-${Math.random().toString(16).slice(2, 10).toUpperCase()}`

const money4 = (n) => {
  const v = Number(n || 0)
  return Number.isFinite(v) ? Number(v.toFixed(4)) : 0
}

const initState = () => ({
  accounts: [
    { id: 'ACC-8100457', label: '8100457（USD）', mtAccount: '8100457', mtType: 'MT5', currency: 'USD', verified: true, status: 'normal', balanceUsd: 1230.0 },
    { id: 'ACC-8100611', label: '8100611（USD）', mtAccount: '8100611', mtType: 'MT4', currency: 'USD', verified: true, status: 'normal', balanceUsd: 820.5 },
    { id: 'ACC-8100777', label: '8100777（USD）', mtAccount: '8100777', mtType: 'MT5', currency: 'USD', verified: false, status: 'normal', balanceUsd: 0.0 },
    { id: 'ACC-8100888', label: '8100888（USD）', mtAccount: '8100888', mtType: 'MT5', currency: 'USD', verified: true, status: 'abnormal', balanceUsd: 0.0 },
  ],
  customerActivityCredits: [
    {
      customerId: 'CUST-wangjianguo',
      customerName: '王建国',
      customerEmail: 'wangjianguo@example.com',
      activityId: 'pioneer-one-50000',
      activityName: '先锋一号 50,000 USD 活动',
      achieved: true,
      totalDepositUsd: 50000,
      totalLots: 500,
      rewardAmountUsd: 500,
      issuedCredit: 500,
      consumedCredit: 80,
      occupiedCredit: 0,
      convertedCredit: 120,
      frozenCredit: 0,
      accountAbnormal: false,
      riskTag: '正常',
    },
    {
      customerId: 'CUST-lixue',
      customerName: '李雪',
      customerEmail: 'lixue88@example.com',
      activityId: 'pioneer-one-50000',
      activityName: '先锋一号 50,000 USD 活动',
      achieved: true,
      totalDepositUsd: 5500,
      totalLots: 41.2,
      rewardAmountUsd: 300,
      issuedCredit: 300,
      consumedCredit: 0,
      occupiedCredit: 60,
      convertedCredit: 0,
      frozenCredit: 240,
      accountAbnormal: false,
      riskTag: '正常',
    },
    {
      customerId: 'CUST-chendawen',
      customerName: '陈大文',
      customerEmail: 'chen.dw@example.com',
      activityId: 'pioneer-one-50000',
      activityName: '先锋一号 50,000 USD 活动',
      achieved: true,
      totalDepositUsd: 50000,
      totalLots: 500,
      rewardAmountUsd: 5000,
      issuedCredit: 5000,
      consumedCredit: 500,
      occupiedCredit: 0,
      convertedCredit: 0,
      frozenCredit: 0,
      accountAbnormal: false,
      riskTag: '正常',
    },
    {
      customerId: 'CUST-zhaozihan',
      customerName: '赵子涵',
      customerEmail: 'zhaozihan@example.com',
      activityId: 'pioneer-one-50000',
      activityName: '先锋一号 50,000 USD 活动',
      achieved: true,
      totalDepositUsd: 2100,
      totalLots: 12.5,
      rewardAmountUsd: 50,
      issuedCredit: 50,
      consumedCredit: 0,
      occupiedCredit: 0,
      convertedCredit: 0,
      frozenCredit: 0,
      accountAbnormal: true,
      riskTag: '账户异常',
    },
    {
      customerId: 'CUST-wangjianguo',
      customerName: '王建国',
      customerEmail: 'wangjianguo@example.com',
      activityId: 'register-bonus-100',
      activityName: '新用户注册赠金',
      achieved: true,
      totalDepositUsd: 0,
      totalLots: 0,
      rewardAmountUsd: 100,
      issuedCredit: 100,
      consumedCredit: 12,
      occupiedCredit: 10,
      convertedCredit: 0,
      frozenCredit: 0,
      accountAbnormal: false,
      riskTag: '正常',
    },
  ],
  conversionRequests: [
    {
      id: 'CR-10001',
      activityId: 'pioneer-one-50000',
      activityName: '先锋一号 50,000 USD 活动',
      customerId: 'CUST-wangjianguo',
      customerName: '王建国',
      customerEmail: 'wangjianguo@example.com',
      amount: 120,
      convertibleAmount: 120,
      targetAccountId: 'ACC-8100457',
      targetAccountLabel: '8100457（USD）',
      appliedAt: '2026-10-05 10:12:20',
      status: '已完成',
      reviewResult: '通过',
      rejectReason: '',
      reviewedAt: '2026-10-05 10:38:12',
      completedAt: '2026-10-05 11:02:11',
      payoutResult: '真实资金已入账：8100457（USD），入账成功',
      auditLogs: [
        { at: '2026-10-05 10:12:20', actor: '客户', action: '提交申请', note: '一次性转换全部可转换信用金' },
        { at: '2026-10-05 10:38:12', actor: '审核员-史密斯', action: '审核通过', note: '校验达标状态与可转换金额' },
        { at: '2026-10-05 11:02:11', actor: '审核员-史密斯', action: '审核通过并完成', note: '一次性扣减信用金并入账真实资金' },
      ],
    },
    {
      id: 'CR-10002',
      activityId: 'pioneer-one-50000',
      activityName: '先锋一号 50,000 USD 活动',
      customerId: 'CUST-lixue',
      customerName: '李雪',
      customerEmail: 'lixue88@example.com',
      amount: 240,
      convertibleAmount: 240,
      targetAccountId: 'ACC-8100611',
      targetAccountLabel: '8100611（USD）',
      appliedAt: '2026-10-09 09:18:40',
      status: '审核中',
      reviewResult: '',
      rejectReason: '',
      reviewedAt: '',
      completedAt: '',
      payoutResult: '',
      auditLogs: [{ at: '2026-10-09 09:18:40', actor: '客户', action: '提交申请', note: '一次性转换全部可转换信用金' }],
    },
    {
      id: 'CR-10003',
      activityId: 'pioneer-one-50000',
      activityName: '先锋一号 50,000 USD 活动',
      customerId: 'CUST-wangjianguo',
      customerName: '王建国',
      customerEmail: 'wangjianguo@example.com',
      amount: 60,
      convertibleAmount: 60,
      targetAccountId: 'ACC-8100457',
      targetAccountLabel: '8100457（USD）',
      appliedAt: '2026-10-12 15:06:05',
      status: '审核拒绝',
      reviewResult: '拒绝',
      rejectReason: '存在异常登录风险标记，需补充身份核验材料',
      reviewedAt: '2026-10-12 15:20:31',
      completedAt: '2026-10-12 15:20:31',
      payoutResult: '',
      auditLogs: [
        { at: '2026-10-12 15:06:05', actor: '客户', action: '提交申请', note: '一次性转换全部可转换信用金' },
        { at: '2026-10-12 15:20:31', actor: '审核员-王浩', action: '审核拒绝', note: '存在异常登录风险标记，需补充身份核验材料' },
      ],
    },
    {
      id: 'CR-10004',
      activityId: 'pioneer-one-50000',
      activityName: '先锋一号 50,000 USD 活动',
      customerId: 'CUST-lixue',
      customerName: '李雪',
      customerEmail: 'lixue88@example.com',
      amount: 90,
      convertibleAmount: 90,
      targetAccountId: 'ACC-8100611',
      targetAccountLabel: '8100611（USD）',
      appliedAt: '2026-10-13 10:11:52',
      status: '审核通过',
      reviewResult: '通过',
      rejectReason: '',
      reviewedAt: '2026-10-13 10:35:08',
      completedAt: '',
      payoutResult: '',
      auditLogs: [
        { at: '2026-10-13 10:11:52', actor: '客户', action: '提交申请', note: '一次性转换全部可转换信用金' },
        { at: '2026-10-13 10:35:08', actor: '审核员-史密斯', action: '审核通过', note: '已通过合规校验，等待入账处理' },
      ],
    },
  ],
  emailOtp: { code: '', expiresAt: 0, cooldownUntil: 0 },
  ledger: [
    { id: 'LED-10001', customerId: 'CUST-wangjianguo', activityId: 'pioneer-one-50000', activityName: '先锋一号 50,000 USD 活动', type: '赠金发放', amount: 500, at: '2026-09-05 10:15:30', remark: '审核通过后发放' },
    { id: 'LED-10002', customerId: 'CUST-wangjianguo', activityId: 'pioneer-one-50000', activityName: '先锋一号 50,000 USD 活动', type: '保证金占用', amount: 150, at: '2026-09-08 14:22:10', remark: '交易保证金占用' },
    { id: 'LED-10003', customerId: 'CUST-wangjianguo', activityId: 'pioneer-one-50000', activityName: '先锋一号 50,000 USD 活动', type: '保证金释放', amount: 150, at: '2026-09-10 09:18:01', remark: '平仓释放' },
    { id: 'LED-10004', customerId: 'CUST-wangjianguo', activityId: 'pioneer-one-50000', activityName: '先锋一号 50,000 USD 活动', type: '赠金消耗', amount: 80, at: '2026-09-12 11:04:52', remark: '交易亏损与手续费扣减' },
    { id: 'LED-10005', customerId: 'CUST-wangjianguo', activityId: 'pioneer-one-50000', activityName: '先锋一号 50,000 USD 活动', type: '转真实资金', amount: 120, at: '2026-10-05 11:02:11', remark: '审核通过并完成' },
    { id: 'LED-10006', customerId: 'CUST-wangjianguo', activityId: 'register-bonus-100', activityName: '新用户注册赠金', type: '赠金发放', amount: 100, at: '2026-09-02 09:12:10', remark: '开户成功发放' },
  ],
})

const load = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return initState()
    const parsed = JSON.parse(raw)
    const state = { ...initState(), ...parsed }
    // 仅修复旧版默认待审核样例遗漏的申请冻结，不覆盖用户已处理或已变更的资金数据。
    const legacyRequest = state.conversionRequests.find((r) => r.id === 'CR-10002')
    const legacyCredit = state.customerActivityCredits.find((r) => r.customerId === 'CUST-lixue' && r.activityId === 'pioneer-one-50000')
    if (legacyRequest?.status === '审核中' && legacyRequest.customerId === 'CUST-lixue'
      && legacyRequest.activityId === 'pioneer-one-50000' && legacyRequest.amount === 240
      && legacyRequest.appliedAt === '2026-10-09 09:18:40'
      && legacyCredit?.issuedCredit === 300 && legacyCredit.consumedCredit === 0
      && legacyCredit.occupiedCredit === 60 && legacyCredit.convertedCredit === 0 && legacyCredit.frozenCredit === 0) {
      legacyCredit.frozenCredit = 240
    }
    return state
  } catch {
    return initState()
  }
}

export const creditConversionState = reactive(load())

const persist = () => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(creditConversionState))
  } catch {}
}

export const getAccountsForSelect = () => creditConversionState.accounts.filter((a) => a.verified && a.status === 'normal')

export const getCustomerActivityCredit = ({ customerId, activityId }) =>
  creditConversionState.customerActivityCredits.find((r) => r.customerId === customerId && r.activityId === activityId) || null

export const getCreditSummary = ({ customerId, activityId }) => {
  const row = getCustomerActivityCredit({ customerId, activityId })
  if (!row) return null
  const available = money4(row.issuedCredit - row.consumedCredit - row.occupiedCredit - row.convertedCredit - row.frozenCredit)
  const convertible = row.achieved && !row.accountAbnormal ? available : 0
  return {
    ...row,
    availableCredit: Math.max(0, available),
    convertibleCredit: Math.max(0, convertible),
    occupiedNow: money4(row.occupiedCredit + row.frozenCredit),
  }
}

export const getRequestsByCustomerActivity = ({ customerId, activityId }) =>
  creditConversionState.conversionRequests.filter((r) => r.customerId === customerId && r.activityId === activityId)

export const hasPendingRequest = ({ customerId, activityId }) =>
  creditConversionState.conversionRequests.some((r) => r.customerId === customerId && r.activityId === activityId && r.status === '审核中')

export const getApplyBlockReason = ({ customerId, activityId }) => {
  const s = getCreditSummary({ customerId, activityId })
  if (!s) return '活动信息不存在'
  if (s.accountAbnormal) return '账户异常，暂不可申请'
  if (!s.achieved) return '活动未达标，暂不可申请'
  if (s.convertibleCredit <= 0) return '可转换金额为 0，暂不可申请'
  if (s.occupiedCredit > 0) return '赠金被占用，暂不可申请'
  if (hasPendingRequest({ customerId, activityId })) return '存在处理中申请，暂不可重复提交'
  return ''
}

export const sendEmailOtp = () => {
  const ts = nowTs()
  if (creditConversionState.emailOtp.cooldownUntil > ts) {
    return { ok: false, message: '发送过于频繁，请稍后再试' }
  }
  const code = String(Math.floor(Math.random() * 900000) + 100000)
  creditConversionState.emailOtp.code = code
  creditConversionState.emailOtp.expiresAt = ts + 100 * 60 * 1000
  creditConversionState.emailOtp.cooldownUntil = ts + 60 * 1000
  persist()
  return { ok: true, code }
}

export const verifyEmailOtp = (code) => {
  const ts = nowTs()
  if (!creditConversionState.emailOtp.code) return { ok: false, message: '请先发送验证码' }
  if (creditConversionState.emailOtp.expiresAt <= ts) return { ok: false, message: '验证码已过期' }
  if (String(code || '').trim() !== String(creditConversionState.emailOtp.code)) return { ok: false, message: '验证码错误' }
  creditConversionState.emailOtp.code = ''
  creditConversionState.emailOtp.expiresAt = 0
  persist()
  return { ok: true }
}

export const submitConversionRequest = ({ customerId, activityId, targetAccountId }) => {
  const block = getApplyBlockReason({ customerId, activityId })
  if (block) return { ok: false, message: block }
  const s = getCreditSummary({ customerId, activityId })
  const account = creditConversionState.accounts.find((a) => a.id === targetAccountId) || null
  if (!account || !account.verified || account.status !== 'normal') return { ok: false, message: '目标真实资金账户不可用' }
  const amount = money4(s.convertibleCredit)
  if (amount <= 0) return { ok: false, message: '可转换金额为 0，暂不可申请' }

  const creditRow = getCustomerActivityCredit({ customerId, activityId })
  creditRow.frozenCredit = money4(creditRow.frozenCredit + amount)

  const id = uid('CR')
  const req = {
    id,
    activityId,
    activityName: s.activityName,
    customerId,
    customerName: s.customerName,
    customerEmail: s.customerEmail,
    amount,
    targetAccountId: account.id,
    targetAccountLabel: account.label,
    appliedAt: nowStr(),
    status: '审核中',
    reviewResult: '',
    rejectReason: '',
    completedAt: '',
    auditLogs: [{ at: nowStr(), actor: '客户', action: '提交申请', note: '一次性转换全部可转换信用金' }],
  }
  // 演示场景保留提交时的可转换金额快照，后续冻结/审核不改变历史展示。
  if (s.demoScenario) req.convertibleAmount = amount
  creditConversionState.conversionRequests.unshift(req)
  creditConversionState.ledger.unshift({
    id: uid('LED'),
    customerId,
    activityId,
    activityName: s.activityName,
    type: '赠金占用',
    amount,
    at: nowStr(),
    remark: `提交转真实资金申请（${id}）`,
  })
  persist()
  return { ok: true, id }
}

export const approveRequest = ({ id, auditor }) => {
  const req = creditConversionState.conversionRequests.find((r) => r.id === id) || null
  if (!req || req.status !== '审核中') return { ok: false, message: '申请不存在或状态不可审核' }
  const creditRow = getCustomerActivityCredit({ customerId: req.customerId, activityId: req.activityId })
  if (!creditRow) return { ok: false, message: '活动赠金记录不存在' }
  if (money4(creditRow.frozenCredit) < money4(req.amount)) return { ok: false, message: '冻结金额不足' }

  creditRow.frozenCredit = money4(creditRow.frozenCredit - req.amount)
  creditRow.convertedCredit = money4(creditRow.convertedCredit + req.amount)

  const account = creditConversionState.accounts.find((a) => a.id === req.targetAccountId) || null
  if (account) account.balanceUsd = money4(account.balanceUsd + req.amount)

  req.status = '已完成'
  req.reviewResult = '通过'
  req.rejectReason = ''
  req.reviewedAt = nowStr()
  req.completedAt = req.reviewedAt
  req.auditLogs.push({ at: req.reviewedAt, actor: auditor || '审核员', action: '审核通过并完成', note: '一次性扣减信用金并入账真实资金' })

  creditConversionState.ledger.unshift({
    id: uid('LED'),
    customerId: req.customerId,
    activityId: req.activityId,
    activityName: req.activityName,
    type: '转真实资金',
    amount: req.amount,
    at: req.completedAt,
    remark: `审核通过（${req.id}）`,
  })
  persist()
  return { ok: true }
}

export const rejectRequest = ({ id, auditor, reason }) => {
  const req = creditConversionState.conversionRequests.find((r) => r.id === id) || null
  if (!req || req.status !== '审核中') return { ok: false, message: '申请不存在或状态不可审核' }
  const rejectReason = String(reason || '').trim()
  if (!rejectReason) return { ok: false, message: '请填写驳回原因' }
  const creditRow = getCustomerActivityCredit({ customerId: req.customerId, activityId: req.activityId })
  if (!creditRow) return { ok: false, message: '活动赠金记录不存在' }
  const amt = money4(req.amount)
  creditRow.frozenCredit = money4(Math.max(0, creditRow.frozenCredit - amt))

  req.status = '审核拒绝'
  req.reviewResult = '拒绝'
  req.rejectReason = rejectReason
  req.reviewedAt = nowStr()
  req.completedAt = req.reviewedAt
  req.auditLogs.push({ at: req.reviewedAt, actor: auditor || '审核员', action: '审核拒绝', note: req.rejectReason })

  creditConversionState.ledger.unshift({
    id: uid('LED'),
    customerId: req.customerId,
    activityId: req.activityId,
    activityName: req.activityName,
    type: '审核驳回',
    amount: amt,
    at: req.completedAt,
    remark: `驳回（${req.id}）`,
  })
  persist()
  return { ok: true }
}

export const getLedgerRows = ({ customerId }) => {
  const list = creditConversionState.ledger.filter((r) => !customerId || r.customerId === customerId)
  return [...list].sort((a, b) => String(b.at).localeCompare(String(a.at)))
}

// 两个独立的演示客户共用正式的前端申请/审核流程，不覆盖原有客户或历史记录。
const pioneerScenarios = {
  application_rejected: { customerId: 'CUST-pioneer-rejected-demo', customerName: '陈大文（拒绝演示）' },
  application_resubmitted: { customerId: 'CUST-pioneer-resubmitted-demo', customerName: '陈大文（重新申请演示）' },
}

export const isPioneerConversionScenario = (mode) => Object.hasOwn(pioneerScenarios, mode)
export const getPioneerScenarioCustomerId = (mode) => pioneerScenarios[mode]?.customerId || ''

export const ensurePioneerConversionScenario = (mode) => {
  if (!isPioneerConversionScenario(mode)) return { ok: false, message: '演示场景不存在' }
  const customer = pioneerScenarios[mode]
  const context = { customerId: customer.customerId, activityId: 'pioneer-one-50000' }
  // 返回场景时保留重新申请及后台审核的实际结果，切换不重置已产生的数据。
  if (getCustomerActivityCredit(context)) return { ok: true }
  const account = getAccountsForSelect()[0]
  if (!account) return { ok: false, message: '暂无可用 MT 账户，无法展示申请场景' }
  creditConversionState.customerActivityCredits.push({
    ...context,
    customerName: customer.customerName,
    customerEmail: `${mode}@example.com`,
    activityName: '先锋一号 50,000 USD 活动',
    demoScenario: mode,
    achieved: true,
    totalDepositUsd: 50000,
    totalLots: 500,
    rewardAmountUsd: 5000,
    issuedCredit: 5000,
    consumedCredit: 500,
    occupiedCredit: 0,
    convertedCredit: 0,
    frozenCredit: 0,
    accountAbnormal: false,
    riskTag: '正常',
  })
  const first = submitConversionRequest({ ...context, targetAccountId: account.id })
  if (!first.ok) return first
  const rejected = rejectRequest({
    id: first.id,
    auditor: '审核员-王浩',
    reason: '申请材料不完整，请补充账户归属证明后重新申请。',
  })
  if (!rejected.ok) return rejected
  if (mode === 'application_resubmitted') return submitConversionRequest({ ...context, targetAccountId: account.id })
  return { ok: true }
}
