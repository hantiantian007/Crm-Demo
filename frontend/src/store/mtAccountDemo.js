import { reactive } from 'vue'

const STORAGE_KEY = 'crm_mt_accounts_demo_v1'

const initState = () => ({
  accounts: [
    { id: 'MTACC-8100457', userId: 'u_direct_01', mtAccount: '8100457', mtType: 'standard', status: 'normal' },
    { id: 'MTACC-8300248', userId: 'u_direct_01', mtAccount: '8300248', mtType: 'cent', status: 'normal' },

    { id: 'MTACC-8100611', userId: 'u_agent_01', mtAccount: '8100611', mtType: 'standard', status: 'normal' },
    { id: 'MTACC-8300255', userId: 'u_agent_01', mtAccount: '8300255', mtType: 'cent', status: 'normal' },

    { id: 'MTACC-8100777', userId: 'u_other_01', mtAccount: '8100777', mtType: 'standard', status: 'normal' },
    { id: 'MTACC-8300320', userId: 'u_other_01', mtAccount: '8300320', mtType: 'cent', status: 'normal' },
  ],
})

const load = () => {
  try {
    if (typeof window === 'undefined') return initState()
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return initState()
    const parsed = JSON.parse(raw)
    return { ...initState(), ...parsed }
  } catch {
    return initState()
  }
}

export const mtAccountState = reactive(load())

const persist = () => {
  try {
    if (typeof window === 'undefined') return
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(mtAccountState))
  } catch {}
}

export const getMtTypeLabel = (t) => {
  const v = String(t || '')
  if (v === 'cent') return '美分账户'
  return '标准账户'
}

export const getMtStatusLabel = (s) => {
  const v = String(s || '')
  if (v === 'frozen') return '冻结'
  if (v === 'abnormal') return '异常'
  return '正常'
}

export const getMtAccountById = (id) => mtAccountState.accounts.find((a) => a.id === String(id || '')) || null

export const getMyMtAccounts = (userId) => {
  const uid = String(userId || '')
  if (!uid) return []
  return mtAccountState.accounts.filter((a) => a.userId === uid)
}

export const getMyAvailableMtAccounts = (userId) => getMyMtAccounts(userId).filter((a) => a.status === 'normal')

export const markAccountStatus = ({ id, status }) => {
  const row = getMtAccountById(id)
  if (!row) return
  row.status = String(status || 'normal')
  persist()
}

