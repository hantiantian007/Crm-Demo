import { ref } from 'vue'

export const nowText = () => {
  const d = new Date()
  const pad2 = (n) => String(n).padStart(2, '0')
  return `${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())} ${pad2(d.getHours())}:${pad2(d.getMinutes())}:${pad2(d.getSeconds())}`
}

const genId = (prefix) => `${prefix}_${Date.now()}_${Math.random().toString(16).slice(2, 8)}`

export const depositTypeConfigs = ref([
  { id: 'dt_real_deposit', name: '真实入金补录', countAsReal: true, status: 'enabled', remark: '' },
  { id: 'dt_diff_deposit', name: '差额补入', countAsReal: true, status: 'enabled', remark: '' },
  { id: 'dt_activity_reward', name: '活动奖励', countAsReal: false, status: 'enabled', remark: '' },
  { id: 'dt_account_compensation', name: '账户补偿', countAsReal: false, status: 'enabled', remark: '' },
  { id: 'dt_adjustment', name: '账务调整', countAsReal: false, status: 'enabled', remark: '' },
  { id: 'dt_demo', name: '演示数据', countAsReal: false, status: 'enabled', remark: '演示默认类型' }
])

export const withdrawTypeConfigs = ref([
  { id: 'wt_real_withdraw', name: '真实出金补录', countAsReal: true, status: 'enabled', remark: '' },
  { id: 'wt_diff_withdraw', name: '差额补出', countAsReal: true, status: 'enabled', remark: '' },
  { id: 'wt_activity_reward_revoke', name: '活动奖励扣回', countAsReal: false, status: 'enabled', remark: '' },
  { id: 'wt_commission_overpaid_recover', name: '返佣多发扣回', countAsReal: false, status: 'enabled', remark: '' },
  { id: 'wt_account_deduct', name: '账户资金扣减', countAsReal: false, status: 'enabled', remark: '' },
  { id: 'wt_adjustment', name: '账务调整', countAsReal: false, status: 'enabled', remark: '' },
  { id: 'wt_demo', name: '演示数据', countAsReal: false, status: 'enabled', remark: '演示默认类型' }
])

export const fundOperationSnapshots = ref([])

const listByDirection = (direction) => {
  if (direction === 'deposit') return depositTypeConfigs
  if (direction === 'withdraw') return withdrawTypeConfigs
  return null
}

export const getEnabledTypeConfigs = (direction) => {
  const listRef = listByDirection(direction)
  if (!listRef) return []
  return listRef.value.filter((x) => x.status === 'enabled').slice()
}

export const findTypeConfig = (direction, typeId) => {
  const listRef = listByDirection(direction)
  if (!listRef) return null
  return listRef.value.find((x) => String(x.id) === String(typeId)) || null
}

export const addTypeConfig = (direction, payload) => {
  const listRef = listByDirection(direction)
  if (!listRef) return { ok: false, message: '未知方向' }

  const name = String(payload?.name || '').trim()
  if (!name) return { ok: false, message: '类型名称不能为空' }
  if (listRef.value.some((x) => String(x.name) === name)) return { ok: false, message: '同一方向不能重名' }

  const next = {
    id: genId(direction === 'deposit' ? 'dt' : 'wt'),
    name,
    countAsReal: !!payload?.countAsReal,
    status: payload?.status === 'disabled' ? 'disabled' : 'enabled',
    remark: String(payload?.remark || '')
  }

  listRef.value = [...listRef.value, next]
  return { ok: true, id: next.id }
}

export const updateTypeConfig = (direction, id, payload) => {
  const listRef = listByDirection(direction)
  if (!listRef) return { ok: false, message: '未知方向' }
  const idx = listRef.value.findIndex((x) => String(x.id) === String(id))
  if (idx < 0) return { ok: false, message: '未找到类型' }

  const before = { ...listRef.value[idx] }
  const name = String(payload?.name || '').trim()
  if (!name) return { ok: false, message: '类型名称不能为空' }
  if (listRef.value.some((x) => String(x.name) === name && String(x.id) !== String(id))) return { ok: false, message: '同一方向不能重名' }

  const next = {
    ...before,
    name,
    countAsReal: !!payload?.countAsReal,
    status: payload?.status === 'disabled' ? 'disabled' : 'enabled',
    remark: String(payload?.remark || '')
  }

  listRef.value = listRef.value.map((x) => (String(x.id) === String(id) ? next : x))
  return { ok: true }
}

export const setTypeConfigStatus = (direction, id, status) => {
  const listRef = listByDirection(direction)
  if (!listRef) return { ok: false, message: '未知方向' }
  const row = listRef.value.find((x) => String(x.id) === String(id))
  if (!row) return { ok: false, message: '未找到类型' }
  const next = { ...row, status: status === 'disabled' ? 'disabled' : 'enabled' }
  listRef.value = listRef.value.map((x) => (String(x.id) === String(id) ? next : x))
  return { ok: true }
}

export const pushFundOperationSnapshot = (payload) => {
  fundOperationSnapshots.value = [{ id: genId('fund_op'), time: nowText(), ...payload }, ...fundOperationSnapshots.value]
}
