import { reactive } from 'vue'

const STORAGE_KEY = 'demo_password_security_v1'

const nowISO = () => {
  const d = new Date()
  const pad = (n) => String(n).padStart(2, '0')
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`
}

const uid = (prefix) => `${prefix}_${Math.random().toString(16).slice(2, 10)}${Date.now().toString(16).slice(-6)}`

const DEMO_SINGLE_ACTIVE_BATCH_ID = 'single_batch_demo_active_01'
const DEFAULT_USER_NOTICE = '为保护您的账户安全，请完成密码修改后继续使用 CRM。'

const safeParse = (raw) => {
  try {
    return JSON.parse(raw)
  } catch {
    return null
  }
}

const ensureDemoSingleActiveBatch = (state) => {
  if (!state) return false
  if (!Array.isArray(state.users)) return false
  const batches = Array.isArray(state.single_force_reset_batches) ? state.single_force_reset_batches : []
  if (batches.some((b) => String(b?.batch_id || '') === DEMO_SINGLE_ACTIVE_BATCH_ID)) return false
  const hasTerminatable = batches.some((b) => ['active', 'partial_completed'].includes(String(b?.status || '')))
  if (hasTerminatable) return false

  const submittedAt = nowISO()
  const userIds = ['u_agent_01', 'u_direct_01'].filter((id) => state.users.some((u) => String(u?.user_id || '') === String(id)))

  if (userIds.length === 0) return false

  userIds.forEach((id) => {
    const user = state.users.find((u) => String(u?.user_id || '') === String(id)) || null
    if (!user) return
    if (!Array.isArray(user.force_reset_policy_ids)) user.force_reset_policy_ids = []
    if (!Array.isArray(user.force_reset_completed_policy_ids)) user.force_reset_completed_policy_ids = []
    if (typeof user.single_force_reset_required !== 'boolean') user.single_force_reset_required = false
    if (typeof user.single_force_reset_set_at !== 'string') user.single_force_reset_set_at = ''
    if (typeof user.single_force_reset_batch_id !== 'string') user.single_force_reset_batch_id = ''

    user.force_reset_required = true
    user.single_force_reset_required = true
    user.single_force_reset_set_at = submittedAt
    user.single_force_reset_batch_id = DEMO_SINGLE_ACTIVE_BATCH_ID
    user.force_reset_set_at = user.force_reset_set_at || submittedAt
    user.password_status = '必须修改'
  })

  const userStates = userIds.map((id) => ({
    user_id: String(id),
    submit_result: 'success',
    current_status: 'pending',
    completed_at: '',
    terminated_at: '',
    terminated_before_blocked: null,
    terminated_after_blocked: null,
  }))

  const batch = {
    batch_id: DEMO_SINGLE_ACTIVE_BATCH_ID,
    user_ids: userIds,
    total_count: userIds.length,
    success_count: userIds.length,
    existed_count: 0,
    failed_count: 0,
    status: 'active',
    completed_count: 0,
    operator: '系统管理员（演示）',
    submitted_at: submittedAt,
    effective_time: '下次登录',
    result: `成功 ${userIds.length}，已存在 0，失败 0`,
    success_user_ids: userIds,
    existed_user_ids: [],
    failed_user_ids: [],
    user_states: userStates,
    terminated_at: '',
    terminated_by: '',
    terminated_reason: '',
  }

  if (!Array.isArray(state.single_force_reset_batches)) state.single_force_reset_batches = []
  state.single_force_reset_batches.unshift(batch)
  return true
}

const createInitialState = () => ({
  session: { user_id: '', logged_in: false },
  scope_policy_defaults: {
    title: '密码安全升级',
    account_types: ['standard'],
    biz_identities: ['agent', 'direct'],
    effective_time: '下次登录',
  },
  scope_policies: [],
  lark_receivers: [
    { id: 'lr_1', name: '风控值班（演示）', target: 'lark_open_id_demo_1', enabled: true },
    { id: 'lr_2', name: '客服值班（演示）', target: 'lark_open_id_demo_2', enabled: true },
  ],
  users: [
    {
      user_id: 'u_admin_01',
      name: '系统管理员（演示）',
      email: 'admin@demo.com',
      account_type: 'system',
      biz_identity: 'system',
      password_status: '正常',
      force_reset_required: false,
      force_reset_policy_ids: [],
      force_reset_completed_policy_ids: [],
      single_force_reset_required: false,
      single_force_reset_set_at: '',
      single_force_reset_batch_id: '',
      force_reset_reason: '',
      force_reset_campaign_id: '',
      force_reset_set_at: '',
      force_reset_completed_at: '',
      current_password_demo: 'Admin@12345',
    },
    {
      user_id: 'u_agent_01',
      name: '代理 A（演示）',
      email: 'agent_a@demo.com',
      account_type: 'standard',
      biz_identity: 'agent',
      password_status: '正常',
      force_reset_required: false,
      force_reset_policy_ids: [],
      force_reset_completed_policy_ids: [],
      single_force_reset_required: false,
      single_force_reset_set_at: '',
      single_force_reset_batch_id: '',
      force_reset_reason: '',
      force_reset_campaign_id: '',
      force_reset_set_at: '',
      force_reset_completed_at: '',
      current_password_demo: 'OldPass@123',
    },
    {
      user_id: 'u_direct_01',
      name: '直客 B（演示）',
      email: 'direct_b@demo.com',
      account_type: 'standard',
      biz_identity: 'direct',
      password_status: '正常',
      force_reset_required: false,
      force_reset_policy_ids: [],
      force_reset_completed_policy_ids: [],
      single_force_reset_required: false,
      single_force_reset_set_at: '',
      single_force_reset_batch_id: '',
      force_reset_reason: '',
      force_reset_campaign_id: '',
      force_reset_set_at: '',
      force_reset_completed_at: '',
      current_password_demo: 'OldPass@123',
    },
    {
      user_id: 'u_other_01',
      name: '标准账号（非代理/直客）（演示）',
      email: 'other_user@demo.com',
      account_type: 'standard',
      biz_identity: 'other',
      password_status: '正常',
      force_reset_required: false,
      force_reset_policy_ids: [],
      force_reset_completed_policy_ids: [],
      single_force_reset_required: false,
      single_force_reset_set_at: '',
      single_force_reset_batch_id: '',
      force_reset_reason: '',
      force_reset_campaign_id: '',
      force_reset_set_at: '',
      force_reset_completed_at: '',
      current_password_demo: 'OldPass@123',
    },
  ],
  scope_campaign: {
    active: false,
    campaign_id: '',
    set_at: '',
    operator: '',
    impact_count: 0,
    status: 'idle',
  },
  campaign_records: [],
  single_force_reset_batches: [],
  otp_state: {},
  risk_events: [
    {
      risk_event_id: 're_1',
      risk_type: 'IP变化',
      user_id: 'u_agent_01',
      customer: '代理 A（演示）',
      old_ip: '203.0.113.8',
      new_ip: '198.51.100.21',
      old_device: 'Windows / Chrome 126',
      new_device: 'Windows / Chrome 126',
      trigger_at: '2026-10-08 10:12:03',
      risk_reason: 'IP 变化，但设备与行为一致（演示）',
      current_action: '记录并通知',
      lark_notify_status: 'sent',
      handled_status: '待处理',
    },
    {
      risk_event_id: 're_2',
      risk_type: '设备环境变化',
      user_id: 'u_direct_01',
      customer: '直客 B（演示）',
      old_ip: '198.51.100.11',
      new_ip: '198.51.100.11',
      old_device: 'iOS / Safari 17',
      new_device: 'Android / Chrome 125',
      trigger_at: '2026-10-08 10:18:44',
      risk_reason: '设备与浏览器同时变化（演示）',
      current_action: '记录并通知',
      lark_notify_status: 'failed',
      handled_status: '待处理',
    },
    {
      risk_event_id: 're_3',
      risk_type: '异常登录',
      user_id: 'u_agent_01',
      customer: '代理 A（演示）',
      old_ip: '198.51.100.21',
      new_ip: '192.0.2.7',
      old_device: 'Windows / Chrome 126',
      new_device: 'macOS / Chrome 126',
      trigger_at: '2026-10-08 10:22:10',
      risk_reason: 'IP 与设备同时变化（演示）',
      current_action: '记录并通知',
      lark_notify_status: 'sent',
      handled_status: '已通知',
    },
    {
      risk_event_id: 're_4',
      risk_type: '异常操作',
      user_id: 'u_direct_01',
      customer: '直客 B（演示）',
      old_ip: '198.51.100.11',
      new_ip: '203.0.113.99',
      old_device: 'Android / Chrome 125',
      new_device: 'Android / Chrome 125',
      trigger_at: '2026-10-08 10:28:02',
      risk_reason: 'IP 变化后立即发起敏感操作（演示）',
      current_action: '记录并通知',
      lark_notify_status: 'sent',
      handled_status: '待处理',
    },
  ],
  audit_logs: [],
})

const loadState = () => {
  if (typeof window === 'undefined') return createInitialState()
  const raw = window.localStorage.getItem(STORAGE_KEY)
  const parsed = safeParse(raw)
  if (!parsed) {
    const init = createInitialState()
    const changed = ensureDemoSingleActiveBatch(init)
    if (changed) window.localStorage.setItem(STORAGE_KEY, JSON.stringify(init))
    return init
  }
  const base = createInitialState()
  const merged = { ...base, ...parsed }
  const changed = ensureDemoSingleActiveBatch(merged)
  if (changed) window.localStorage.setItem(STORAGE_KEY, JSON.stringify(merged))
  return merged
}

export const passwordSecurityDemoState = reactive(loadState())

const persist = () => {
  if (typeof window === 'undefined') return
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(passwordSecurityDemoState))
}

export const getDemoUserById = (userId) => {
  const id = String(userId || '')
  return passwordSecurityDemoState.users.find((u) => u.user_id === id) || null
}

export const getSessionUser = () => getDemoUserById(passwordSecurityDemoState.session.user_id)

const ensureUserFields = (user) => {
  if (!user) return
  if (!Array.isArray(user.force_reset_policy_ids)) user.force_reset_policy_ids = []
  if (!Array.isArray(user.force_reset_completed_policy_ids)) user.force_reset_completed_policy_ids = []
  if (typeof user.single_force_reset_required !== 'boolean') user.single_force_reset_required = false
  if (typeof user.single_force_reset_set_at !== 'string') user.single_force_reset_set_at = ''
  if (typeof user.single_force_reset_batch_id !== 'string') user.single_force_reset_batch_id = ''
}

export const getScopePolicyDefaults = () => passwordSecurityDemoState.scope_policy_defaults || {}

const isUserBlocked = (user) => {
  if (!user) return false
  ensureUserFields(user)
  const pending = Array.isArray(user.force_reset_policy_ids) ? user.force_reset_policy_ids.length > 0 : false
  return Boolean(user.force_reset_required || user.single_force_reset_required || pending)
}

const syncUserPasswordStatus = (user) => {
  if (!user) return
  const blocked = isUserBlocked(user)
  user.password_status = blocked ? '必须修改' : '正常'
  if (!blocked) {
    user.force_reset_set_at = ''
    user.force_reset_reason = ''
    user.force_reset_campaign_id = ''
  }
}

export const isForceResetScopeUser = (user, _cfg = getScopePolicyDefaults()) => {
  if (!user) return false
  return String(user.account_type || '') === 'standard' && (String(user.biz_identity || '') === 'agent' || String(user.biz_identity || '') === 'direct')
}

export const getScopePolicies = () => (Array.isArray(passwordSecurityDemoState.scope_policies) ? passwordSecurityDemoState.scope_policies : [])

export const getScopePolicyById = (policyId) => getScopePolicies().find((p) => p.policy_id === String(policyId || '')) || null

export const getPolicyUserNotice = (policy) => {
  const text = String(policy?.user_notice || '').trim()
  return text || DEFAULT_USER_NOTICE
}

export const createScopePolicy = (payload, operator = '系统管理员（演示）') => {
  const rawTitle = String(payload?.title || '')
  const title = rawTitle.trim()
  if (!title) return { ok: false, message: '策略标题不能为空' }
  if (title.length > 20) return { ok: false, message: '策略标题过长' }

  const effectiveTime = String(payload?.effective_time || '').trim() || '下次登录'
  const rawNotice = String(payload?.user_notice || '')
  const userNotice = rawNotice.trim()
  if (!userNotice) return { ok: false, message: '请输入用户提示' }

  const accountTypes = ['standard']
  const bizIdentities = ['agent', 'direct']

  const policyId = uid('policy')
  const createdAt = nowISO()
  const policy = {
    policy_id: policyId,
    title,
    account_types: Array.from(new Set(accountTypes)),
    biz_identities: Array.from(new Set(bizIdentities)),
    effective_time: effectiveTime,
    user_notice: userNotice,
    status: 'pending',
    created_at: createdAt,
    operator,
    impact_count: 0,
    processed_user_ids: [],
  }

  passwordSecurityDemoState.scope_policies.unshift(policy)
  pushAudit({ type: 'scope_policy_create', operator, detail: `新建范围配置：${title}（${policyId}）` })
  persist()
  return { ok: true, policyId }
}

const applyPolicyToUsers = (policy, operator = '系统管理员（演示）') => {
  const impactedIds = passwordSecurityDemoState.users.filter((u) => isForceResetScopeUser(u, policy)).map((u) => u.user_id)
  policy.impact_count = impactedIds.length

  impactedIds.forEach((id) => {
    const user = getDemoUserById(id)
    if (!user) return
    ensureUserFields(user)
    if (user.force_reset_completed_policy_ids.includes(policy.policy_id)) return
    if (!user.force_reset_policy_ids.includes(policy.policy_id)) user.force_reset_policy_ids.push(policy.policy_id)
    user.force_reset_required = true
    user.force_reset_set_at = user.force_reset_set_at || nowISO()
    user.password_status = '必须修改'
  })

  pushAudit({ type: 'scope_policy_apply', operator, detail: `启用范围配置：${policy.title}（影响 ${impactedIds.length} 个账号）` })
  persist()
  return impactedIds.length
}

const tryMarkPolicyCompleted = (policy) => {
  const processedCount = Array.isArray(policy.processed_user_ids) ? policy.processed_user_ids.length : 0
  if (policy.status === 'active' && policy.impact_count > 0 && processedCount >= policy.impact_count) {
    policy.status = 'completed'
    persist()
  }
}

export const enableScopePolicy = (policyId, operator = '系统管理员（演示）') => {
  const policy = getScopePolicyById(policyId)
  if (!policy) return { ok: false, message: '配置不存在' }
  if (policy.status === 'disabled') return { ok: false, message: '配置已停用' }
  if (policy.status === 'completed') return { ok: false, message: '配置已完成' }
  policy.status = 'active'
  const impact = applyPolicyToUsers(policy, operator)
  tryMarkPolicyCompleted(policy)
  persist()
  return { ok: true, impact }
}

export const getUserPendingPolicyNotices = (userId) => {
  const user = getDemoUserById(userId)
  if (!user) return []
  ensureUserFields(user)
  const ids = Array.isArray(user.force_reset_policy_ids) ? user.force_reset_policy_ids : []
  return ids.map((id) => getPolicyUserNotice(getScopePolicyById(id))).filter(Boolean)
}

export const disableScopePolicy = (policyId, operator = '系统管理员（演示）') => {
  const policy = getScopePolicyById(policyId)
  if (!policy) return { ok: false, message: '配置不存在' }
  policy.status = 'disabled'
  pushAudit({ type: 'scope_policy_disable', operator, detail: `停用范围配置：${policy.title}（${policy.policy_id}）` })
  persist()
  return { ok: true }
}

export const getForceResetUnavailableReason = (user) => {
  if (!user) return '账号不存在'
  return ''
}

const pushAudit = (payload) => {
  passwordSecurityDemoState.audit_logs.unshift({
    id: uid('audit'),
    at: nowISO(),
    ...payload,
  })
  persist()
}

export const setSessionUser = (userId) => {
  const user = getDemoUserById(userId)
  passwordSecurityDemoState.session.user_id = user?.user_id || ''
  passwordSecurityDemoState.session.logged_in = Boolean(user)
  pushAudit({ type: 'login', operator: user?.name || '未知', detail: `登录：${user?.user_id || ''}` })
  persist()
}

export const clearSessionUser = () => {
  passwordSecurityDemoState.session.user_id = ''
  passwordSecurityDemoState.session.logged_in = false
  persist()
}

export const getForceResetBlocked = () => {
  const user = getSessionUser()
  if (!user) return false
  ensureUserFields(user)
  const pending = Array.isArray(user.force_reset_policy_ids) ? user.force_reset_policy_ids.length > 0 : false
  return Boolean(user.force_reset_required || user.single_force_reset_required || pending)
}

export const startScopeForceReset = (operator = '系统管理员（演示）') => {
  const defaults = getScopePolicyDefaults()
  const created = createScopePolicy(defaults, operator)
  if (!created.ok) return { policyId: '', impactedCount: 0 }
  const enabled = enableScopePolicy(created.policyId, operator)
  if (!enabled.ok) return { policyId: created.policyId, impactedCount: 0 }
  return { policyId: created.policyId, impactedCount: enabled.impact || 0 }
}

export const forceSingleAccountReset = (targetUserId, operator = '系统管理员（演示）') => {
  const user = getDemoUserById(targetUserId)
  if (!user) return { ok: false, message: '账号不存在' }
  ensureUserFields(user)
  user.force_reset_required = true
  user.single_force_reset_required = true
  user.single_force_reset_set_at = nowISO()
  user.force_reset_set_at = user.force_reset_set_at || nowISO()
  user.password_status = '必须修改'
  pushAudit({ type: 'single_force_reset', operator, detail: `单账号强制改密：${user.user_id}` })
  persist()
  return { ok: true }
}

const isUserAlreadyForced = (user) => {
  if (!user) return false
  ensureUserFields(user)
  const pending = Array.isArray(user.force_reset_policy_ids) ? user.force_reset_policy_ids.length > 0 : false
  return Boolean(user.force_reset_required || user.single_force_reset_required || pending)
}

const normalizeSingleBatch = (batch) => {
  if (!batch) return null
  if (!Array.isArray(batch.user_ids)) batch.user_ids = []
  if (!Array.isArray(batch.success_user_ids)) batch.success_user_ids = []
  if (!Array.isArray(batch.existed_user_ids)) batch.existed_user_ids = []
  if (!Array.isArray(batch.failed_user_ids)) batch.failed_user_ids = []
  if (!Array.isArray(batch.user_states)) {
    const successSet = new Set(batch.success_user_ids.map(String))
    const existedSet = new Set(batch.existed_user_ids.map(String))
    batch.user_states = batch.user_ids.map((id) => {
      const uidStr = String(id || '')
      const submitResult = successSet.has(uidStr) ? 'success' : existedSet.has(uidStr) ? 'existed' : 'failed'
      const currentStatus = submitResult === 'success' ? 'pending' : submitResult
      return {
        user_id: uidStr,
        submit_result: submitResult,
        current_status: currentStatus,
        completed_at: '',
        terminated_at: '',
        terminated_before_blocked: null,
        terminated_after_blocked: null,
      }
    })
  }
  if (typeof batch.terminated_at !== 'string') batch.terminated_at = ''
  if (typeof batch.terminated_by !== 'string') batch.terminated_by = ''
  if (typeof batch.terminated_reason !== 'string') batch.terminated_reason = ''

  const completedCount = batch.user_states.filter((s) => s?.current_status === 'completed').length
  batch.completed_count = completedCount

  if (typeof batch.status !== 'string' || !batch.status) {
    const successCount = Number(batch.success_count || 0)
    if (batch.terminated_at) batch.status = 'terminated'
    else if (successCount === 0) batch.status = 'completed'
    else if (completedCount >= successCount) batch.status = 'completed'
    else if (completedCount > 0) batch.status = 'partial_completed'
    else batch.status = 'active'
  }

  return batch
}

export const getSingleForceResetBatches = () =>
  (Array.isArray(passwordSecurityDemoState.single_force_reset_batches) ? passwordSecurityDemoState.single_force_reset_batches : []).map((b) => normalizeSingleBatch(b))

export const submitSingleForceResetBatch = (userIds, operator = '系统管理员（演示）', effectiveTime = '下次登录') => {
  const ids = Array.isArray(userIds) ? userIds.map((v) => String(v || '')).filter(Boolean) : []
  const uniq = Array.from(new Set(ids))
  if (uniq.length === 0) return { ok: false, message: '请选择账号' }

  const batchId = uid('single_batch')
  const submittedAt = nowISO()
  const successIds = []
  const existedIds = []
  const failedIds = []
  const userStates = []

  uniq.forEach((id) => {
    const user = getDemoUserById(id)
    if (!user) {
      failedIds.push(id)
      userStates.push({
        user_id: id,
        submit_result: 'failed',
        current_status: 'failed',
        completed_at: '',
        terminated_at: '',
        terminated_before_blocked: null,
        terminated_after_blocked: null,
      })
      return
    }
    if (String(user.account_type) !== 'standard') {
      failedIds.push(id)
      userStates.push({
        user_id: id,
        submit_result: 'failed',
        current_status: 'failed',
        completed_at: '',
        terminated_at: '',
        terminated_before_blocked: null,
        terminated_after_blocked: null,
      })
      return
    }
    if (String(user.biz_identity) !== 'agent' && String(user.biz_identity) !== 'direct') {
      failedIds.push(id)
      userStates.push({
        user_id: id,
        submit_result: 'failed',
        current_status: 'failed',
        completed_at: '',
        terminated_at: '',
        terminated_before_blocked: null,
        terminated_after_blocked: null,
      })
      return
    }
    if (isUserAlreadyForced(user)) {
      existedIds.push(id)
      userStates.push({
        user_id: id,
        submit_result: 'existed',
        current_status: 'existed',
        completed_at: '',
        terminated_at: '',
        terminated_before_blocked: null,
        terminated_after_blocked: null,
      })
      return
    }
    ensureUserFields(user)
    user.force_reset_required = true
    user.single_force_reset_required = true
    user.single_force_reset_set_at = submittedAt
    user.single_force_reset_batch_id = batchId
    user.force_reset_set_at = user.force_reset_set_at || submittedAt
    user.password_status = '必须修改'
    successIds.push(id)
    userStates.push({
      user_id: id,
      submit_result: 'success',
      current_status: 'pending',
      completed_at: '',
      terminated_at: '',
      terminated_before_blocked: null,
      terminated_after_blocked: null,
    })
  })

  const totalCount = uniq.length
  const successCount = successIds.length
  const existedCount = existedIds.length
  const failedCount = failedIds.length

  const batch = {
    batch_id: batchId,
    user_ids: uniq,
    total_count: totalCount,
    success_count: successCount,
    existed_count: existedCount,
    failed_count: failedCount,
    status: successCount === 0 ? 'completed' : 'active',
    completed_count: 0,
    operator,
    submitted_at: submittedAt,
    effective_time: effectiveTime,
    result: `成功 ${successCount}，已存在 ${existedCount}，失败 ${failedCount}`,
    success_user_ids: successIds,
    existed_user_ids: existedIds,
    failed_user_ids: failedIds,
    user_states: userStates,
    terminated_at: '',
    terminated_by: '',
    terminated_reason: '',
  }

  passwordSecurityDemoState.single_force_reset_batches.unshift(batch)
  pushAudit({ type: 'single_force_reset_batch', operator, detail: `指定账号强制改密：${batchId}（${batch.result}）` })
  persist()
  return { ok: true, batchId, ...batch }
}

export const terminateSingleForceResetBatch = (batchId, operator = '系统管理员（演示）', reason = '') => {
  const bid = String(batchId || '')
  const batches = Array.isArray(passwordSecurityDemoState.single_force_reset_batches) ? passwordSecurityDemoState.single_force_reset_batches : []
  const batch = normalizeSingleBatch(batches.find((b) => b?.batch_id === bid) || null)
  if (!batch) return { ok: false, message: '批次不存在' }
  if (batch.status !== 'active' && batch.status !== 'partial_completed') return { ok: false, message: '当前批次不可终止' }

  const terminatedAt = nowISO()
  batch.status = 'terminated'
  batch.terminated_at = terminatedAt
  batch.terminated_by = operator
  batch.terminated_reason = String(reason || '').trim()

  batch.user_states.forEach((s) => {
    if (!s || s.submit_result !== 'success') return
    if (s.current_status !== 'pending') return
    const user = getDemoUserById(s.user_id)
    if (!user) return
    ensureUserFields(user)
    const beforeBlocked = isUserBlocked(user)
    if (String(user.single_force_reset_batch_id || '') === bid) {
      user.single_force_reset_required = false
      user.single_force_reset_set_at = ''
      user.single_force_reset_batch_id = ''
    }
    const hasPendingPolicy = Array.isArray(user.force_reset_policy_ids) ? user.force_reset_policy_ids.length > 0 : false
    if (!hasPendingPolicy) user.force_reset_required = false
    const afterBlocked = isUserBlocked(user)
    if (!afterBlocked) syncUserPasswordStatus(user)
    s.current_status = 'terminated'
    s.terminated_at = terminatedAt
    s.terminated_before_blocked = beforeBlocked
    s.terminated_after_blocked = afterBlocked
  })

  pushAudit({ type: 'single_force_reset_batch_terminate', operator, detail: `终止指定账号强制改密批次：${bid}` })
  persist()
  return { ok: true }
}

export const completePasswordReset = (userId, newPasswordDemo = '') => {
  const user = getDemoUserById(userId)
  if (!user) return
  ensureUserFields(user)
  const singleBatchId = String(user.single_force_reset_batch_id || '')
  if (singleBatchId) {
    const batches = Array.isArray(passwordSecurityDemoState.single_force_reset_batches) ? passwordSecurityDemoState.single_force_reset_batches : []
    const batch = normalizeSingleBatch(batches.find((b) => b?.batch_id === singleBatchId) || null)
    if (batch) {
      const state = Array.isArray(batch.user_states) ? batch.user_states.find((s) => s?.user_id === user.user_id) : null
      if (state && state.submit_result === 'success' && state.current_status === 'pending') {
        state.current_status = 'completed'
        state.completed_at = nowISO()
        batch.completed_count = batch.user_states.filter((s) => s?.current_status === 'completed').length
        if (batch.status !== 'terminated') {
          if (Number(batch.success_count || 0) > 0 && batch.completed_count >= Number(batch.success_count || 0)) batch.status = 'completed'
          else if (batch.completed_count > 0) batch.status = 'partial_completed'
        }
        persist()
      }
    }
  }
  const pendingPolicies = Array.isArray(user.force_reset_policy_ids) ? [...user.force_reset_policy_ids] : []
  pendingPolicies.forEach((pid) => {
    if (!user.force_reset_completed_policy_ids.includes(pid)) user.force_reset_completed_policy_ids.push(pid)
    const policy = getScopePolicyById(pid)
    if (!policy) return
    if (!Array.isArray(policy.processed_user_ids)) policy.processed_user_ids = []
    if (!policy.processed_user_ids.includes(user.user_id)) policy.processed_user_ids.push(user.user_id)
    tryMarkPolicyCompleted(policy)
  })
  user.force_reset_policy_ids = []
  user.force_reset_required = false
  user.single_force_reset_required = false
  user.single_force_reset_set_at = ''
  user.single_force_reset_batch_id = ''
  user.force_reset_completed_at = nowISO()
  user.password_status = '正常'
  if (newPasswordDemo) user.current_password_demo = newPasswordDemo
  pushAudit({
    type: 'password_reset_completed',
    operator: user.name,
    detail: `完成密码修改：${user.user_id}${pendingPolicies.length ? `；命中配置：${pendingPolicies.join(',')}` : ''}`,
  })
  persist()
}

export const getUserPendingPolicyTitles = (userId) => {
  const user = getDemoUserById(userId)
  if (!user) return []
  ensureUserFields(user)
  const ids = Array.isArray(user.force_reset_policy_ids) ? user.force_reset_policy_ids : []
  return ids.map((id) => getScopePolicyById(id)?.title).filter(Boolean)
}

export const requestEmailOtp = (userId) => {
  const user = getDemoUserById(userId)
  if (!user) return { ok: false, message: '账号不存在' }
  const now = Date.now()
  const existing = passwordSecurityDemoState.otp_state[userId] || {}
  if (existing.cooldown_until && now < existing.cooldown_until) {
    const remain = Math.ceil((existing.cooldown_until - now) / 1000)
    return { ok: false, message: `操作过于频繁，请 ${remain} 秒后再试` }
  }
  if (existing.locked_until && now < existing.locked_until) {
    const remain = Math.ceil((existing.locked_until - now) / 1000)
    return { ok: false, message: `验证失败次数过多，请 ${remain} 秒后再试` }
  }

  const code = String(Math.floor(100000 + Math.random() * 900000))
  const expiresAt = now + 10 * 60 * 1000
  const cooldownUntil = now + 60 * 1000
  passwordSecurityDemoState.otp_state[userId] = {
    code,
    sent_at: now,
    expires_at: expiresAt,
    cooldown_until: cooldownUntil,
    failed_count: 0,
    locked_until: 0,
  }
  pushAudit({ type: 'otp_send', operator: '系统', detail: `发送邮箱验证码：${user.email}` })
  persist()
  return { ok: true, code, expiresAt, cooldownUntil }
}

export const verifyEmailOtp = (userId, inputCode) => {
  const otp = passwordSecurityDemoState.otp_state[userId]
  const now = Date.now()
  if (!otp?.code) return { ok: false, message: '请先获取验证码' }
  if (otp.locked_until && now < otp.locked_until) return { ok: false, message: '验证失败次数过多，请稍后再试' }
  if (otp.expires_at && now > otp.expires_at) return { ok: false, message: '验证码已失效，请重新获取' }

  const input = String(inputCode || '').trim()
  if (input && input === String(otp.code)) return { ok: true }

  otp.failed_count = Number(otp.failed_count || 0) + 1
  if (otp.failed_count >= 5) {
    otp.locked_until = now + 10 * 60 * 1000
    persist()
    return { ok: false, message: '验证失败次数过多，请稍后再试' }
  }
  persist()
  return { ok: false, message: `验证码错误（剩余 ${5 - otp.failed_count} 次）` }
}

export const retryLarkNotify = (riskEventId) => {
  const e = passwordSecurityDemoState.risk_events.find((x) => x.risk_event_id === riskEventId)
  if (!e) return { ok: false, message: '风险事件不存在' }
  e.lark_notify_status = 'sent'
  pushAudit({ type: 'lark_retry', operator: '系统', detail: `重试 Lark 通知：${riskEventId}` })
  persist()
  return { ok: true }
}
