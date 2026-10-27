import { reactive } from 'vue'

export const HEDGING_STORAGE_KEY = 'crm-hedging-reviews-demo-v1'
export const REVIEW_STATUSES = ['待核查', '确认对冲', '非对冲']
export const MATCH_RULE = '仅同一 CRM 客户名下的已平仓订单，支持同一 MT 账号内或多个 MT 账号之间对冲；MT 服务器标准品种代码相同、方向相反；开仓时间差≤5分钟，手数差异率≤10%，持仓时长差异率≤10%；同一 CRM 客户、同一活动范围内滚动24小时至少2对有效匹配订单。相同订单对只计算一次，A-B与B-A视为同一对。'

// 仅对预先配好的演示订单做展示算术；不搜索订单、不执行检测或自动判定。
export const serverTimestamp = value => Date.parse(value.replace(' ', 'T') + '+08:00')
export function serverTime(timestamp) {
  return new Date(timestamp + 8 * 3600000).toISOString().slice(0, 19).replace('T', ' ')
}
export function pairMetrics(pair) {
  const durationA = (serverTimestamp(pair.a.closeTime) - serverTimestamp(pair.a.openTime)) / 1000
  const durationB = (serverTimestamp(pair.b.closeTime) - serverTimestamp(pair.b.openTime)) / 1000
  const ratio = (a, b) => Math.max(a, b) > 0 ? Math.abs(a - b) / Math.max(a, b) * 100 : null
  return {
    durationA, durationB,
    openGap: Math.abs(serverTimestamp(pair.a.openTime) - serverTimestamp(pair.b.openTime)) / 1000,
    lotsRate: ratio(pair.a.lots, pair.b.lots),
    durationRate: ratio(durationA, durationB)
  }
}

// 生成固定演示样本，不读取 MT 数据；同一事件中订单不重复使用。
export function createHedgingEvents() {
  const fixtures = [
    { id: 'HG-20261021-001', date: '2026-10-21', activity: '先锋一号 50,000 USD 活动', symbol: 'XAUUSD', customerId: 'CRM-DEMO-001', customer: '陈大文', email: 'chen.dawen@example.com', accounts: ['8110474', '8110475'], groups: 3 },
    // 替换跨客户样本时使用新的事件和订单编号，旧核查记录保留在本地，但不套用到新事件。
    { id: 'HG-20261020-102', date: '2026-10-20', activity: '秋季交易挑战赛（演示）', symbol: 'EURUSD', customerId: 'CRM-DEMO-002', customer: '李强', email: 'li.qiang@example.com', accounts: ['10028571'], orderBase: 900010101, groups: 3 },
    { id: 'HG-20261019-103', date: '2026-10-19', activity: '新客交易奖励（演示）', symbol: 'GBPUSD', customerId: 'CRM-DEMO-003', customer: 'Alex Chen', email: 'alex.chen@example.com', accounts: ['8110501'], orderBase: 900010201, groups: 2, review: { result: '非对冲', operator: 'Winnie（演示）', time: '2026-10-19 16:30:00', note: '已核对该客户同一 MT 账号内的订单及交易说明；本次订单符合数值特征，但人工核查未认定为对冲。' } },
    { id: 'HG-20261018-104', date: '2026-10-18', activity: '先锋一号 50,000 USD 活动', symbol: 'XAUUSD', customerId: 'CRM-DEMO-004', customer: '刘元庆', email: 'liu.yuanqing@example.com', accounts: ['8110601', '8110603', '8110604'], orderBase: 900010301, groups: 2, review: { result: '确认对冲', operator: 'Alex（演示）', time: '2026-10-18 17:10:00', note: '已核对 CRM 客户与 MT 账号归属及两组反向订单，确认该客户名下多账户存在对冲行为；本记录不调整活动手数或奖励。' } },
    { id: 'HG-20261017-105', date: '2026-10-17', activity: '秋季交易挑战赛（演示）', symbol: 'USDJPY', customerId: 'CRM-DEMO-005', customer: '杨永哲', email: 'yang.yongzhe@example.com', accounts: ['8110701'], orderBase: 900010401, groups: 2 },
    { id: 'HG-20261016-006', date: '2026-10-16', activity: '新客交易奖励（演示）', symbol: 'EURUSD', customerId: 'CRM-DEMO-006', customer: '赵亚飞', email: 'zhao.yafei@example.com', accounts: ['8110801', '8110802'], groups: 2, review: { result: '确认对冲', operator: 'Alex（演示）', time: '2026-10-16 18:20:00', note: '已人工对照同客户两个账户的已平仓订单，确认对冲；未执行任何自动奖励或资金操作。' } }
  ]
  return fixtures.map((item, index) => {
    const pairs = Array.from({ length: item.groups }, (_, i) => {
      const start = serverTimestamp(`${item.date} 08:00:00`) + i * 2 * 3600000
      const duration = 3600 + i * 600
      const order = (account, side, open, held, lots) => ({
        account, customer: item.customer, customerId: item.customerId, activity: item.activity,
        id: String((item.orderBase || 900000001 + index * 100) + i * 2 + (side === '卖出' ? 1 : 0)),
        symbol: item.symbol, direction: side, lots, openTime: serverTime(open), closeTime: serverTime(open + held * 1000)
      })
      return {
        id: `${item.id}-P${i + 1}`,
        a: order(item.accounts[0], '买入', start, duration, 1 + i),
        b: order(item.accounts.length === 1 ? item.accounts[0] : item.accounts[1 + i % (item.accounts.length - 1)], '卖出', start + (i + 1) * 60000, duration + 120, (1 + i) * 0.95)
      }
    })
    const discoveredAt = serverTime(Math.max(...pairs.map(p => serverTimestamp(p.b.closeTime))) + 60000)
    return {
      id: item.id, activity: item.activity, symbol: item.symbol, customer: item.customer, customerId: item.customerId, email: item.email,
      accounts: item.accounts, hedgeType: item.accounts.length === 1 ? '同一 MT 账号内对冲' : '同一客户多 MT 账号对冲',
      discoveredAt, pairs, review: item.review || null
    }
  })
}

export function reviewStatus(event) { return event.review?.result || '待核查' }
export function filterHedgingEvents(events, filters) {
  const query = String(filters.query || '').trim().toLowerCase()
  return events.filter(event => (!filters.activity || event.activity === filters.activity)
    && (!filters.symbol || event.symbol === filters.symbol)
    && (!filters.status || reviewStatus(event) === filters.status)
    && (!query || [event.customer, event.customerId, ...event.accounts].some(value => value.toLowerCase().includes(query)))
    && (!filters.dates?.[0] || event.discoveredAt >= filters.dates[0])
    && (!filters.dates?.[1] || event.discoveredAt <= filters.dates[1]))
}

function validReview(value) {
  return value && ['确认对冲', '非对冲'].includes(value.result)
    && ['operator', 'time', 'note'].every(key => typeof value[key] === 'string' && value[key].trim())
    && Number.isFinite(serverTimestamp(value.time))
}

export function createHedgingStore(storage, now = () => Date.now()) {
  const events = reactive(createHedgingEvents())
  const state = reactive({ warning: '' })
  const read = () => {
    const raw = storage.getItem(HEDGING_STORAGE_KEY)
    if (!raw) return {}
    const data = JSON.parse(raw)
    if (!data || typeof data !== 'object' || Array.isArray(data)) throw new Error('invalid storage')
    if (Object.values(data).some(value => !validReview(value))) throw new Error('invalid review')
    return data
  }
  const applySaved = saved => events.forEach(event => {
    if (!event.review && validReview(saved[event.id])) event.review = { ...saved[event.id] }
  })
  try { applySaved(read()) } catch {
    state.warning = '本地核查记录读取失败，当前展示预置演示数据；为避免覆盖已有记录，本次禁止保存。'
  }
  function review(id, result, explanation, operator) {
    const event = events.find(row => row.id === id)
    if (!event) return { ok: false, error: '事件不存在，请重新选择。' }
    if (event.review) return { ok: false, error: '该事件已处理，不允许重复核查。' }
    const note = String(explanation || '').trim()
    if (!note) return { ok: false, error: '请填写处理说明，不能仅输入空格。' }
    if (note.length > 1000) return { ok: false, error: '处理说明不能超过1000字。' }
    if (!['确认对冲', '非对冲'].includes(result)) return { ok: false, error: '请选择有效的核查结果。' }
    if (!String(operator || '').trim()) return { ok: false, error: '无法记录处理人，请重新打开页面。' }
    if (state.warning) return { ok: false, error: state.warning }
    try {
      // 保存前再次读取，防止另一个页面已处理后重复核查。
      const saved = read()
      applySaved(saved)
      if (event.review) return { ok: false, error: '该事件已在其他页面处理，已同步结果，请查看记录。' }
      const record = { result, note, operator: String(operator).trim(), time: serverTime(now()) }
      storage.setItem(HEDGING_STORAGE_KEY, JSON.stringify({ ...saved, [id]: record }))
      event.review = record
      return { ok: true }
    } catch {
      return { ok: false, error: '本地保存失败，核查状态未更改。请检查浏览器存储权限后重试。' }
    }
  }
  return { events, state, review }
}

// 延迟访问浏览器存储，让存储被禁用时仍可展示页面并明确提示。
export const hedgingDemo = createHedgingStore({
  getItem: key => localStorage.getItem(key),
  setItem: (key, value) => localStorage.setItem(key, value)
})
