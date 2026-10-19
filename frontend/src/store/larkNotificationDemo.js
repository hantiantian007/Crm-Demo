import { reactive } from 'vue'

const storageKey = 'crm-lark-notification-groups-v4'
const recordsStorageKey = 'crm-lark-group-notification-records-v2'
export const loginGroupStorageKey = 'crm-user-login-notification-groups-v2'
function readSavedState(key) {
  try {
    const value = JSON.parse(localStorage.getItem(key) || '{}')
    return value && typeof value === 'object' && !Array.isArray(value) ? value : {}
  } catch { return {} }
}
export function notificationTime() {
  const d = new Date()
  const pad = n => String(n).padStart(2, '0')
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`
}
const saved = readSavedState(storageKey)
const legacy = readSavedState('crm-lark-notification-settings-v3')
const legacyV2 = readSavedState('crm-lark-notification-recipients-v2')
const hasLegacy = Object.keys(legacy).length > 0 || Object.keys(legacyV2).length > 0
export const groupMigrationNotice = hasLegacy
  ? '原个人接收人配置不自动转换为群组，请重新选择通知群组。旧本地数据保留，未用于群消息发送。' : ''

// 全部为无效的示例地址；本模块没有任何网络发送能力。
const initialGroups = [
  { id: 'group-risk', name: '风控通知群', description: '风控审核与风险提醒', webhook: 'https://open.larksuite.com/open-apis/bot/v2/hook/demo-risk-not-a-real-token', enabled: true, updatedAt: '2026-10-16 10:00:00' },
  { id: 'group-finance', name: '财务通知群', description: '资金审核及支付通道提醒', webhook: 'https://open.larksuite.com/open-apis/bot/v2/hook/demo-finance-not-a-real-token', enabled: true, updatedAt: '2026-10-16 10:00:00' },
  { id: 'group-operations', name: '运营通知群', description: '活动与客户运营提醒', webhook: 'https://open.larksuite.com/open-apis/bot/v2/hook/demo-operations-not-a-real-token', enabled: false, updatedAt: '2026-10-16 10:00:00' }
]
export const larkGroups = reactive(Array.isArray(saved.groups)
  ? saved.groups.filter(g => g && ['id', 'name', 'description', 'webhook', 'updatedAt'].every(k => typeof g[k] === 'string') && typeof g.enabled === 'boolean')
  : initialGroups)
export function enabledGroupIds(ids) {
  return Array.isArray(ids) ? larkGroups.filter(g => g.enabled && ids.includes(g.id)).map(g => g.id) : []
}
export function groupNames(ids) {
  return larkGroups.filter(g => Array.isArray(ids) && ids.includes(g.id)).map(g => g.name).join('、') || '—'
}
export function maskWebhook(value) {
  return value ? 'https://open.larksuite.com/…/••••••' : '—'
}
const defaults = [
  { id: 'withdrawal', name: '高风险出金 / 风险规则命中', description: '用户提交出金后，命中高风险规则或风险等级达到“高”时，通知风控负责人。', groupIds: ['group-risk', 'group-finance'] },
  { id: 'cross-account-hedging', name: '跨账户对冲', description: '检测到多个交易账户存在明显反向交易，并满足预设对冲规则时，通知风控人员及活动风控负责人。', groupIds: [] },
  { id: 'multi-account-association', name: '多账户关联', description: '检测到多个账户存在共用钱包、银行卡、设备、IP等明显关联关系并达到规则条件时，通知风控人员。', groupIds: [] },
  { id: 'withdrawal-audit-timeout', name: '出金审核超时', description: '出金订单进入待审核状态后，超过设定时间仍未处理时通知审核人员；持续超时可升级通知负责人。', groupIds: [] },
  { id: 'mt5-sync-error', name: 'MT5交易 / 平仓数据同步异常', description: 'MT5与CRM之间出现交易数据同步失败、延迟或数据不一致时，通知技术负责人。', groupIds: [] },
  { id: 'payment-channel-error', name: '入金 / 出金支付通道异常', description: '支付通道不可用、API失败、回调异常、订单状态异常或短时间大量失败时，通知财务或技术负责人。', groupIds: [] },
  { id: 'activity-participation', name: '活动有人参与', description: '用户首次产生符合活动规则的有效参与行为时，通知活动负责人或运营人员。', groupIds: [] },
  { id: 'activity-qualified', name: '活动有人达标', description: '用户达到活动最终达标条件时，通知活动负责人或运营人员。', groupIds: [] },
  { id: 'activity-suspected-hedging', name: '活动有人疑似对冲交易', description: '活动参与用户触发活动反作弊规则，被系统标记为“疑似对冲”时，通知风控及活动负责人。', groupIds: [] },
  { id: 'high-value-activity-decline', name: '高价值客户活跃度明显下降', description: '高价值客户交易手数、交易频率或活跃度达到设定下降条件时，通知对应销售或客户负责人。', groupIds: [] }
]

export const larkNotifications = reactive(defaults.map(rule => {
  const stored = saved.notifications?.[rule.id]
  return {
    ...rule,
    groupIds: enabledGroupIds(Array.isArray(stored?.groupIds) ? stored.groupIds : hasLegacy ? [] : rule.groupIds),
    enabled: typeof stored?.enabled === 'boolean' ? stored.enabled : true,
    updatedAt: typeof stored?.updatedAt === 'string' ? stored.updatedAt : ''
  }
}))
function persist() {
  try {
    localStorage.setItem(storageKey, JSON.stringify({
      groups: larkGroups,
      notifications: Object.fromEntries(larkNotifications.map(n => [n.id, { groupIds: n.groupIds, enabled: n.enabled, updatedAt: n.updatedAt }]))
    }))
    return true
  } catch { return false }
}
function finishGroupChange() {
  larkNotifications.forEach(rule => {
    const ids = enabledGroupIds(rule.groupIds)
    if (ids.length !== rule.groupIds.length) {
      rule.groupIds = ids
      rule.updatedAt = notificationTime()
    }
  })
  // 用户列表可能尚未加载；仍需清理已保存的登录通知群组，避免重新启用后恢复旧选择。
  let loginPersisted = true
  try {
    const settings = readSavedState(loginGroupStorageKey)
    let changed = false
    Object.values(settings).forEach(config => {
      if (!config || !Array.isArray(config.groupIds)) return
      const ids = enabledGroupIds(config.groupIds)
      if (ids.length !== config.groupIds.length) { config.groupIds = ids; changed = true }
    })
    if (changed) localStorage.setItem(loginGroupStorageKey, JSON.stringify(settings))
  } catch { loginPersisted = false }
  const persisted = persist()
  return { ok: true, persisted: persisted && loginPersisted }
}
export function saveLarkGroup(id, draft) {
  const existing = id ? larkGroups.find(g => g.id === id) : null
  if (id && !existing) return { ok: false, error: '群组不存在，请重新选择' }
  const name = String(draft.name || '').trim()
  const description = String(draft.description || '').trim()
  const webhook = String(draft.webhook || '').trim()
  if (!name || name.length > 80) return { ok: false, error: '请填写群组名称（最多80字符）' }
  if (description.length > 300) return { ok: false, error: '群组说明不能超过300字符' }
  if (!webhook || webhook.length > 2048) return { ok: false, error: '请填写 Webhook 地址（最多2048字符）' }
  if (typeof draft.enabled !== 'boolean') return { ok: false, error: '请选择启用状态' }
  try {
    const url = new URL(webhook)
    if (url.protocol !== 'https:' || url.hostname !== 'open.larksuite.com' || url.port || url.username || url.password || url.search || url.hash
      || !/^\/open-apis\/bot\/v2\/hook\/[^/]+\/?$/.test(url.pathname)) throw new Error()
  } catch { return { ok: false, error: '请填写国际版 Lark 群自定义机器人的 HTTPS Webhook 地址，仅校验格式，不验证有效性' } }
  if (larkGroups.some(g => g.id !== id && g.name === name)) return { ok: false, error: '该群组名称已存在' }
  const fields = { name, description, webhook, enabled: draft.enabled, updatedAt: notificationTime() }
  if (existing) Object.assign(existing, fields)
  else larkGroups.push({ id: `group-${Date.now()}-${Math.random().toString(36).slice(2)}`, ...fields })
  return finishGroupChange()
}
export function setLarkGroupEnabled(id, enabled) {
  const group = larkGroups.find(g => g.id === id)
  if (!group || typeof enabled !== 'boolean') return { ok: false, error: '群组或状态无效' }
  group.enabled = enabled
  group.updatedAt = notificationTime()
  return finishGroupChange()
}
export function deleteLarkGroup(id) {
  const index = larkGroups.findIndex(g => g.id === id)
  if (index < 0) return { ok: false, error: '群组不存在' }
  larkGroups.splice(index, 1)
  return finishGroupChange()
}
export function saveLarkNotificationGroups(id, ids, enabled) {
  const rule = larkNotifications.find(n => n.id === id)
  if (!rule || !Array.isArray(ids) || typeof enabled !== 'boolean') return { ok: false, error: '通知配置无效' }
  const valid = enabledGroupIds(ids)
  if (ids.some(id => !valid.includes(id))) return { ok: false, error: '只能选择已启用的群组，请重新选择' }
  rule.groupIds = valid
  rule.enabled = enabled
  rule.updatedAt = notificationTime()
  return { ok: true, persisted: persist() }
}

const historicalExamples = {
  withdrawal: '用户 John 提交出金申请 10,000 USD。\nMT5账号：8110474\n请相关管理人员及时查看出金申请并进行审核。',
  login: '用户 8110474 出现异常登录。\n检测到新设备及异地 IP 登录，请相关管理人员核查账号安全。',
  'high-risk': '用户 8110474 命中高风险规则。\n风险标签：疑似多账户、疑似对冲。\n请风控人员核查关联账户及交易情况。'
}
export const larkNotificationExamples = Object.fromEntries(defaults.map((rule) => [
  rule.id,
  `${rule.name}\n${rule.description}\n此消息仅用于手动模拟，不代表系统已执行自动检测。`
]))

const initialRecords = [
  { id: 'demo-withdrawal', time: '2026-10-16 16:20:35', type: '出金通知', content: historicalExamples.withdrawal, groupNames: ['风控通知群', '财务通知群'], status: '已发送', failureReason: '' },
  { id: 'demo-login', time: '2026-10-16 15:42:18', type: '异常登录通知', content: historicalExamples.login, groupNames: ['风控通知群'], status: '已发送', failureReason: '' },
  { id: 'demo-high-risk', time: '2026-10-16 14:18:06', type: '高风险通知', content: historicalExamples['high-risk'], groupNames: ['风控通知群', '财务通知群'], status: '发送失败', failureReason: '演示发送失败：消息服务暂时不可用，未调用真实接口。' }
]
const savedRecords = readSavedState(recordsStorageKey).records
const oldRecords = readSavedState('crm-lark-notification-records-v1').records
const records = Array.isArray(savedRecords) ? savedRecords : Array.isArray(oldRecords)
  ? oldRecords.map(({ recipients, ...record }) => ({ ...record, groupNames: [], legacy: true }))
  : initialRecords
export const larkNotificationRecords = reactive(records.filter(r => r
  && ['id', 'time', 'type', 'content'].every(k => typeof r[k] === 'string')
  && Array.isArray(r.groupNames) && r.groupNames.every(n => typeof n === 'string')
  && ['已发送', '发送失败'].includes(r.status)))

// 保存群名称快照；改名、停用、删除群组均不改写历史，不保存 Webhook 到通知记录。
export function simulateLarkNotification(typeId) {
  const rule = larkNotifications.find(n => n.id === typeId)
  if (!rule) return { ok: false, error: '请选择通知类型' }
  if (!rule.enabled) return { ok: false, error: '该通知规则已停用，不生成通知记录' }
  const ids = enabledGroupIds(rule.groupIds)
  const names = larkGroups.filter(g => ids.includes(g.id)).map(g => g.name)
  const record = {
    id: `lark-${Date.now()}-${Math.random().toString(36).slice(2)}`,
    time: notificationTime(), type: rule.name, content: larkNotificationExamples[typeId],
    groupNames: names, status: names.length ? '已发送' : '发送失败',
    failureReason: names.length ? '' : '演示发送失败：未配置已启用的通知群组，未调用真实接口。'
  }
  larkNotificationRecords.unshift(record)
  try {
    localStorage.setItem(recordsStorageKey, JSON.stringify({ records: larkNotificationRecords }))
    return { ok: true, status: record.status, persisted: true }
  } catch { return { ok: true, status: record.status, persisted: false } }
}
