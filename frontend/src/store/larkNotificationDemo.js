import { computed, reactive } from 'vue'
import { passwordSecurityDemoState } from './passwordSecurityDemo.js'

const storageKey = 'crm-lark-notification-settings-v3'
const previousStorageKey = 'crm-lark-notification-recipients-v2'

const saved = readSavedState(storageKey)
const previousRecipients = readSavedState(previousStorageKey)
const initialRecipients = [
  { id: 'alex', name: 'Alex', role: '风控', larkUserId: 'ou_demo_alex' },
  { id: 'winnie', name: 'Winnie', role: '财务', larkUserId: 'ou_demo_winnie' },
  { id: 'amy', name: 'Amy', role: '运营', larkUserId: '' },
  { id: 'david', name: 'David', role: '管理员', larkUserId: '' }
]

// CRM 人员目录与 Lark 名单分离；这里只读取已有管理账号，不创建 CRM 用户。
export const crmManagers = computed(() => {
  const managers = initialRecipients.map(({ id, name, role }) => ({ id, name, role }))
  const knownIds = new Set(managers.map((person) => person.id))
  for (const user of passwordSecurityDemoState.users || []) {
    if (user.account_type !== 'system' || !user.user_id || knownIds.has(user.user_id)) continue
    managers.push({ id: user.user_id, name: user.name, role: '系统管理员' })
    knownIds.add(user.user_id)
  }
  return managers
})

export const larkRecipients = reactive(crmManagers.value.filter((person) =>
  initialRecipients.some((initial) => initial.id === person.id) ||
  Object.prototype.hasOwnProperty.call(saved.bindings || {}, person.id)
).map((person) => ({
  ...person,
  larkUserId: typeof saved.bindings?.[person.id] === 'string'
    ? saved.bindings[person.id].trim()
    : initialRecipients.find((initial) => initial.id === person.id)?.larkUserId || ''
})))

const defaults = [
  // 沿用原出金配置 ID，兼容已保存人员及现有模拟发送的默认选项。
  { id: 'withdrawal', name: '高风险出金 / 风险规则命中', description: '用户提交出金后，命中高风险规则或风险等级达到“高”时，通知风控负责人。', recipientIds: ['alex', 'winnie'] },
  { id: 'cross-account-hedging', name: '跨账户对冲', description: '检测到多个交易账户存在明显反向交易，并满足预设对冲规则时，通知风控人员及活动风控负责人。', recipientIds: [] },
  { id: 'multi-account-association', name: '多账户关联', description: '检测到多个账户存在共用钱包、银行卡、设备、IP等明显关联关系并达到规则条件时，通知风控人员。', recipientIds: [] },
  { id: 'withdrawal-audit-timeout', name: '出金审核超时', description: '出金订单进入待审核状态后，超过设定时间仍未处理时通知审核人员；持续超时可升级通知负责人。', recipientIds: [] },
  { id: 'mt5-sync-error', name: 'MT5交易 / 平仓数据同步异常', description: 'MT5与CRM之间出现交易数据同步失败、延迟或数据不一致时，通知技术负责人。', recipientIds: [] },
  { id: 'payment-channel-error', name: '入金 / 出金支付通道异常', description: '支付通道不可用、API失败、回调异常、订单状态异常或短时间大量失败时，通知财务或技术负责人。', recipientIds: [] },
  { id: 'activity-participation', name: '活动有人参与', description: '用户首次产生符合活动规则的有效参与行为时，通知活动负责人或运营人员。', recipientIds: [] },
  { id: 'activity-qualified', name: '活动有人达标', description: '用户达到活动最终达标条件时，通知活动负责人或运营人员。', recipientIds: [] },
  { id: 'activity-suspected-hedging', name: '活动有人疑似对冲交易', description: '活动参与用户触发活动反作弊规则，被系统标记为“疑似对冲”时，通知风控及活动负责人。', recipientIds: [] },
  { id: 'high-value-activity-decline', name: '高价值客户活跃度明显下降', description: '高价值客户交易手数、交易频率或活跃度达到设定下降条件时，通知对应销售或客户负责人。', recipientIds: [] }
]

export function boundRecipientIds(ids) {
  return Array.isArray(ids)
    ? larkRecipients.filter((person) => person.larkUserId && ids.includes(person.id)).map((person) => person.id)
    : []
}

function readSavedState(key) {
  try {
    const saved = JSON.parse(localStorage.getItem(key) || '{}')
    return saved && typeof saved === 'object' && !Array.isArray(saved) ? saved : {}
  } catch {
    return {}
  }
}

export const larkNotifications = reactive(defaults.map((notification) => {
  const storedIds = saved.notifications?.[notification.id] ?? previousRecipients[notification.id]
  // 空数组是有效配置：解除全部人员后，刷新不能恢复默认通知对象。
  const recipientIds = boundRecipientIds(Array.isArray(storedIds) ? storedIds : notification.recipientIds)
  return { ...notification, recipientIds }
}))

export function saveLarkNotificationRecipients(id, ids) {
  const notification = larkNotifications.find((item) => item.id === id)
  if (!notification) return false
  notification.recipientIds = boundRecipientIds(ids)
  return persist()
}

export function saveLarkBinding(id, larkUserId) {
  const person = larkRecipients.find((item) => item.id === id)
  if (!person) return false
  person.larkUserId = String(larkUserId || '').trim()
  larkNotifications.forEach((notification) => {
    notification.recipientIds = boundRecipientIds(notification.recipientIds)
  })
  return persist()
}

export function addLarkPerson(id, larkUserId) {
  const manager = crmManagers.value.find((person) => person.id === id)
  if (!manager) return { ok: false, error: '请选择已有 CRM 管理人员' }
  if (larkRecipients.some((person) => person.id === id)) return { ok: false, error: '该人员已存在' }
  const userId = String(larkUserId || '').trim()
  if (!userId) return { ok: false, error: '请填写 Lark 用户 ID' }
  larkRecipients.push({ ...manager, larkUserId: userId })
  return { ok: true, persisted: persist() }
}

const recordsStorageKey = 'crm-lark-notification-records-v1'
// 历史记录保留发送时的原始内容，不随规则名称或说明更新。
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
  { id: 'demo-withdrawal', time: '2026-10-16 16:20:35', type: '出金通知', content: historicalExamples.withdrawal, recipients: ['Alex', 'Winnie'], status: '已发送', failureReason: '' },
  { id: 'demo-login', time: '2026-10-16 15:42:18', type: '异常登录通知', content: historicalExamples.login, recipients: ['Alex'], status: '已发送', failureReason: '' },
  { id: 'demo-high-risk', time: '2026-10-16 14:18:06', type: '高风险通知', content: historicalExamples['high-risk'], recipients: ['Alex', 'Winnie'], status: '发送失败', failureReason: '演示发送失败：消息服务暂时不可用，未调用真实接口。' }
]
const savedRecords = readSavedState(recordsStorageKey).records
export const larkNotificationRecords = reactive(Array.isArray(savedRecords)
  ? savedRecords.filter((record) => record && ['id', 'time', 'type', 'content'].every((key) => typeof record[key] === 'string') &&
    Array.isArray(record.recipients) && record.recipients.every((name) => typeof name === 'string') &&
    ['已发送', '发送失败'].includes(record.status))
  : initialRecords)

// 仅由演示按钮手动调用；历史通知人员保存名称快照，不随当前绑定变动。
export function simulateLarkNotification(typeId) {
  const notification = larkNotifications.find((item) => item.id === typeId)
  if (!notification) return { ok: false, error: '请选择通知类型' }
  const recipientIds = boundRecipientIds(notification.recipientIds)
  const recipients = larkRecipients.filter((person) => recipientIds.includes(person.id)).map((person) => person.name)
  const date = new Date()
  const pad = (value) => String(value).padStart(2, '0')
  const time = `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())} ${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`
  const record = {
    id: `lark-${Date.now()}-${Math.random().toString(36).slice(2)}`,
    time,
    type: notification.name,
    content: larkNotificationExamples[typeId],
    recipients,
    status: recipients.length ? '已发送' : '发送失败',
    failureReason: recipients.length ? '' : '当前通知未配置已绑定的通知人员，请先检查通知配置及人员绑定。'
  }
  larkNotificationRecords.unshift(record)
  try {
    localStorage.setItem(recordsStorageKey, JSON.stringify({ records: larkNotificationRecords }))
    return { ok: true, status: record.status, persisted: true }
  } catch {
    return { ok: true, status: record.status, persisted: false }
  }
}

function persist() {
  try {
    localStorage.setItem(storageKey, JSON.stringify({
      bindings: Object.fromEntries(larkRecipients.map((person) => [person.id, person.larkUserId])),
      notifications: {
        ...previousRecipients,
        ...saved.notifications,
        ...Object.fromEntries(larkNotifications.map((item) => [item.id, item.recipientIds]))
      }
    }))
    return true
  } catch {
    return false
  }
}

