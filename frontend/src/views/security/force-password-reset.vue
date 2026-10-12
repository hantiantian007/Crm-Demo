<template>
  <div class="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-10">
    <div class="w-full max-w-[520px] bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
      <div class="px-6 py-5 border-b border-gray-100">
        <div class="text-base font-bold text-gray-800">为了保护您的账户安全，请设置新密码</div>
        <div class="mt-2 text-xs text-gray-500 leading-relaxed">
          完成密码修改前无法访问 CRM 其他功能。
        </div>
        <div class="mt-2 text-[11px] text-gray-400">
          策略：<span class="text-gray-600 font-medium">{{ policyTitle }}</span>
        </div>
        <div class="mt-3 rounded-lg border border-gray-100 bg-gray-50 px-4 py-3 text-xs text-gray-700 leading-relaxed">
          <div class="font-medium text-gray-800">用户提示</div>
          <div class="mt-2 space-y-1">
            <div v-for="(t, idx) in policyNotices" :key="idx">{{ t }}</div>
          </div>
        </div>
      </div>

      <div v-if="showBlockedTip" class="px-6 pt-5">
        <div class="rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
          为了保护账户安全，完成密码修改前无法访问 CRM 其他功能。
        </div>
      </div>

      <div class="p-6 space-y-5">
        <div class="text-xs text-gray-500">
          当前账号：<span class="font-medium text-gray-800">{{ user?.name || '—' }}</span>
          <span class="ml-2 font-mono text-[11px] text-gray-400">{{ user?.email || '' }}</span>
        </div>

        <div class="space-y-2">
          <div class="text-sm text-gray-700 font-medium">新密码</div>
          <input
            v-model="form.password"
            type="password"
            class="w-full h-10 px-3 rounded-lg border border-gray-200 bg-white text-sm outline-none focus:border-primaryBtn"
            placeholder="请输入新密码"
            autocomplete="new-password"
          />
          <div v-if="errors.password" class="text-[11px] text-rose-600">{{ errors.password }}</div>
        </div>

        <div class="space-y-2">
          <div class="text-sm text-gray-700 font-medium">确认新密码</div>
          <input
            v-model="form.confirm"
            type="password"
            class="w-full h-10 px-3 rounded-lg border border-gray-200 bg-white text-sm outline-none focus:border-primaryBtn"
            placeholder="请再次输入新密码"
            autocomplete="new-password"
          />
          <div v-if="errors.confirm" class="text-[11px] text-rose-600">{{ errors.confirm }}</div>
        </div>

        <div class="space-y-2">
          <div class="text-sm text-gray-700 font-medium">邮箱验证码</div>
          <div class="flex items-center gap-2">
            <input
              v-model="form.otp"
              type="text"
              inputmode="numeric"
              class="flex-1 h-10 px-3 rounded-lg border border-gray-200 bg-white text-sm outline-none focus:border-primaryBtn font-mono"
              placeholder="请输入 6 位验证码"
            />
            <button
              type="button"
              class="h-10 px-4 rounded-lg text-sm font-medium transition-colors border"
              :class="canSendOtp ? 'bg-white hover:bg-gray-50 text-gray-700 border-gray-200' : 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed'"
              :disabled="!canSendOtp"
              @click="handleSendOtp"
            >
              {{ otpButtonText }}
            </button>
          </div>
          <div v-if="errors.otp" class="text-[11px] text-rose-600">{{ errors.otp }}</div>
          <div v-if="otpHint" class="text-[11px] text-gray-500 leading-relaxed">
            演示数据：验证码已发送。<span class="font-mono text-gray-700">{{ otpHint }}</span>
          </div>
        </div>

        <div class="bg-gray-50 rounded-lg border border-gray-100 p-4">
          <div class="text-sm font-semibold text-gray-800">密码规则实时校验</div>
          <div class="mt-3 space-y-2 text-xs">
            <div class="flex items-center gap-2">
              <span class="w-4 text-center" :class="ruleChecks.lengthOk ? 'text-emerald-600' : 'text-gray-300'">✓</span>
              <span :class="ruleChecks.lengthOk ? 'text-gray-700' : 'text-gray-400'">长度不少于 8 位</span>
            </div>
            <div class="flex items-center gap-2">
              <span class="w-4 text-center" :class="ruleChecks.notSameAsOld ? 'text-emerald-600' : 'text-gray-300'">✓</span>
              <span :class="ruleChecks.notSameAsOld ? 'text-gray-700' : 'text-gray-400'">新密码不能与当前密码相同</span>
            </div>
            <div class="flex items-center gap-2">
              <span class="w-4 text-center" :class="ruleChecks.notCommon ? 'text-emerald-600' : 'text-gray-300'">✓</span>
              <span :class="ruleChecks.notCommon ? 'text-gray-700' : 'text-gray-400'">不属于常见或风险密码</span>
            </div>
            <div class="flex items-center gap-2">
              <span class="w-4 text-center" :class="ruleChecks.notPersonal ? 'text-emerald-600' : 'text-gray-300'">✓</span>
              <span :class="ruleChecks.notPersonal ? 'text-gray-700' : 'text-gray-400'">不包含明显个人信息（邮箱/姓名等）</span>
            </div>
            <div class="flex items-center gap-2">
              <span class="w-4 text-center" :class="ruleChecks.confirmMatch ? 'text-emerald-600' : 'text-gray-300'">✓</span>
              <span :class="ruleChecks.confirmMatch ? 'text-gray-700' : 'text-gray-400'">两次输入一致</span>
            </div>
          </div>
        </div>

        <div class="flex items-center gap-3">
          <button
            type="button"
            class="flex-1 h-11 rounded-lg bg-primaryBtn hover:bg-primaryBtnHover text-white text-sm font-semibold transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
            :disabled="submitting"
            @click="handleSubmit"
          >
            {{ submitting ? '提交中...' : '修改密码' }}
          </button>
          <button
            type="button"
            class="h-11 px-4 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 text-gray-700 text-sm font-medium transition-colors"
            @click="openSupport"
          >
            客服帮助
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, onUnmounted, reactive, ref } from 'vue'
import { ElMessage } from 'element-plus'
import { useRoute, useRouter } from 'vue-router'
import {
  completePasswordReset,
  getSessionUser,
  getUserPendingPolicyNotices,
  getUserPendingPolicyTitles,
  passwordSecurityDemoState,
  requestEmailOtp,
  verifyEmailOtp,
} from '@/store/passwordSecurityDemo'

const router = useRouter()
const route = useRoute()

const user = computed(() => getSessionUser())
const showBlockedTip = computed(() => String(route.query.blocked || '') === '1')
const policyTitle = computed(() => {
  const uid = user.value?.user_id
  if (!uid) return '密码安全升级'
  const titles = getUserPendingPolicyTitles(uid)
  const extra = user.value?.single_force_reset_required ? ['指定账号强制改密'] : []
  const merged = [...(Array.isArray(titles) ? titles : []), ...extra]
  if (merged.length === 0) return '密码安全升级'
  const uniq = Array.from(new Set(merged))
  return uniq.join('、')
})

const policyNotices = computed(() => {
  const uid = user.value?.user_id
  if (!uid) return ['为保护您的账户安全，请完成密码修改后继续使用 CRM。']
  const notices = getUserPendingPolicyNotices(uid)
  const uniq = Array.from(new Set((Array.isArray(notices) ? notices : []).filter(Boolean)))
  if (uniq.length === 0) return ['为保护您的账户安全，请完成密码修改后继续使用 CRM。']
  return uniq
})

const form = reactive({ password: '', confirm: '', otp: '' })
const errors = reactive({ password: '', confirm: '', otp: '' })
const submitting = ref(false)

const tick = ref(Date.now())
let timer = 0

const otpState = computed(() => passwordSecurityDemoState.otp_state?.[user.value?.user_id || ''] || {})
const cooldownRemain = computed(() => {
  const t = Number(otpState.value.cooldown_until || 0) - tick.value
  return Math.max(0, Math.ceil(t / 1000))
})
const lockedRemain = computed(() => {
  const t = Number(otpState.value.locked_until || 0) - tick.value
  return Math.max(0, Math.ceil(t / 1000))
})
const expireRemain = computed(() => {
  const t = Number(otpState.value.expires_at || 0) - tick.value
  return Math.max(0, Math.ceil(t / 1000))
})

const canSendOtp = computed(() => cooldownRemain.value === 0 && lockedRemain.value === 0 && Boolean(user.value?.user_id))
const otpButtonText = computed(() => {
  if (lockedRemain.value > 0) return `已限制 ${lockedRemain.value}s`
  if (cooldownRemain.value > 0) return `${cooldownRemain.value}s`
  return '获取验证码'
})

const otpHint = computed(() => {
  const code = String(otpState.value.code || '')
  if (!code) return ''
  if (expireRemain.value <= 0) return ''
  return `验证码：${code}（10 分钟有效）`
})

const commonPasswords = [
  '123456',
  '12345678',
  'password',
  'qwerty',
  '111111',
  'abc123',
  'letmein',
  'admin',
  'oldpass@123',
]

const ruleChecks = computed(() => {
  const pwd = String(form.password || '')
  const low = pwd.toLowerCase()
  const oldPwd = String(user.value?.current_password_demo || '')
  const email = String(user.value?.email || '')
  const emailPrefix = email.includes('@') ? email.split('@')[0] : ''
  const name = String(user.value?.name || '')
  const tokens = [emailPrefix, email, name].filter(Boolean).map((t) => String(t).toLowerCase())
  const notPersonal = tokens.every((t) => (t ? !low.includes(t) : true))
  const notCommon = !commonPasswords.includes(low.trim())
  const lengthOk = pwd.length >= 8
  const notSameAsOld = pwd && oldPwd ? pwd !== oldPwd : Boolean(pwd)
  const confirmMatch = pwd && String(form.confirm || '') === pwd
  return { lengthOk, notSameAsOld, notCommon, notPersonal, confirmMatch }
})

const validateForm = () => {
  errors.password = ''
  errors.confirm = ''
  errors.otp = ''

  if (!ruleChecks.value.lengthOk) errors.password = '密码长度不足，请至少输入 8 位'
  else if (!ruleChecks.value.notSameAsOld) errors.password = '新密码不能与当前密码相同'
  else if (!ruleChecks.value.notCommon) errors.password = '该密码存在安全风险，请更换其他密码'
  else if (!ruleChecks.value.notPersonal) errors.password = '密码包含明显个人信息，请更换'

  if (!form.confirm) errors.confirm = '请再次输入新密码'
  else if (!ruleChecks.value.confirmMatch) errors.confirm = '两次输入的密码不一致'

  if (!String(form.otp || '').trim()) errors.otp = '请输入邮箱验证码'

  return !(errors.password || errors.confirm || errors.otp)
}

const handleSendOtp = () => {
  errors.otp = ''
  const uid = user.value?.user_id
  if (!uid) return
  const res = requestEmailOtp(uid)
  if (!res.ok) {
    ElMessage.error(res.message || '验证码发送失败')
    return
  }
  ElMessage.success('验证码已发送（演示）')
}

const handleSubmit = async () => {
  if (submitting.value) return
  if (!user.value?.user_id) return
  if (!validateForm()) return

  submitting.value = true
  const uid = user.value.user_id
  const otpRes = verifyEmailOtp(uid, form.otp)
  if (!otpRes.ok) {
    errors.otp = otpRes.message || '验证码校验失败'
    submitting.value = false
    return
  }

  await new Promise((r) => window.setTimeout(r, 500))
  completePasswordReset(uid, form.password)
  submitting.value = false
  router.replace('/security/reset-success')
}

const openSupport = () => {
  ElMessage.info('客服入口（演示）')
}

onMounted(() => {
  timer = window.setInterval(() => {
    tick.value = Date.now()
  }, 500)
})

onUnmounted(() => {
  if (timer) window.clearInterval(timer)
})
</script>
