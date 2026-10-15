import { reactive } from 'vue'

const STORAGE_KEY = 'crm_activity_participation_demo_v1'

const nowStr = () => new Date().toISOString().slice(0, 19).replace('T', ' ')

const initState = () => ({
  byKey: {
    'free-card': {
      status: 'joined',
      joinedAt: '2026-09-02 09:12:10',
      progresses: {
        netDeposit: { value: 1013.0, target: 1000 },
        tradeLots: { value: 10.25, target: 10 },
      },
    },
    'pioneer-one-50000': {
      status: 'not_joined',
      joinedAt: '',
      progresses: {
        netDeposit: { value: 0, target: 50000 },
        tradeLots: { value: 0, target: 500 },
      },
      releaseTierPct: 0,
      releasedAmount: 0,
    },
  },
})

const load = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return initState()
    const parsed = JSON.parse(raw)
    return { ...initState(), ...parsed, byKey: { ...initState().byKey, ...(parsed?.byKey || {}) } }
  } catch {
    return initState()
  }
}

export const activityParticipationState = reactive(load())

const initDemoUiState = () => ({
  byKey: {},
})

export const activityDemoUiState = reactive(initDemoUiState())

const persist = () => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(activityParticipationState))
  } catch {}
}

export const getParticipation = (activityKey) => activityParticipationState.byKey[String(activityKey || '')] || null

export const isJoined = (activityKey) => {
  const s = getParticipation(activityKey)?.status
  return s === 'joined' || s === 'ended'
}

const calcAchieved = (activityKey) => {
  const p = getParticipation(activityKey)
  const progresses = p?.progresses || {}
  const net = Number(progresses?.netDeposit?.value || 0)
  const netTarget = Number(progresses?.netDeposit?.target || 0)
  const lots = Number(progresses?.tradeLots?.value || 0)
  const lotsTarget = Number(progresses?.tradeLots?.target || 0)
  return netTarget > 0 && lotsTarget > 0 && net >= netTarget && lots >= lotsTarget
}

const resolveDefaultDemoMode = (activityKey) => {
  if (!isJoined(activityKey)) return 'not_joined'
  return calcAchieved(activityKey) ? 'joined_full' : 'joined_partial'
}

export const getDemoMode = (activityKey) => {
  const key = String(activityKey || '')
  const mode = String(activityDemoUiState.byKey[key] || '').trim()
  if (mode === 'not_joined' || mode === 'joined_partial' || mode === 'joined_full') return mode
  return resolveDefaultDemoMode(key)
}

export const setDemoMode = (activityKey, mode) => {
  const key = String(activityKey || '')
  const v = String(mode || '').trim()
  if (v !== 'not_joined' && v !== 'joined_partial' && v !== 'joined_full') return
  activityDemoUiState.byKey[key] = v
}

export const markJoined = (activityKey, payload = {}) => {
  const key = String(activityKey || '')
  const prev = activityParticipationState.byKey[key] || { status: 'not_joined' }
  activityParticipationState.byKey[key] = {
    ...prev,
    ...payload,
    status: 'joined',
    joinedAt: payload.joinedAt || prev.joinedAt || nowStr(),
  }
  persist()
}

export const markNotJoined = (activityKey) => {
  const key = String(activityKey || '')
  const prev = activityParticipationState.byKey[key] || {}
  activityParticipationState.byKey[key] = { ...prev, status: 'not_joined', joinedAt: '' }
  persist()
}
