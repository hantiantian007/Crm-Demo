<template>
  <div class="flex h-full bg-mainBg overflow-hidden">
    <div class="flex-1 flex flex-col min-w-0 bg-gray-50 overflow-hidden p-4 custom-scrollbar overflow-y-auto">
      <main class="flex-1 overflow-y-auto p-4 md:p-6 bg-mainBg">
 <div class="w-full mx-auto bg-white rounded-xl border border-gray-100 px-5 py-6 md:px-8 md:py-7">
  <h1 class="text-base font-semibold text-gray-800 pb-3 border-b border-gray-100">
   出金
  </h1>
  <div class="mt-5 space-y-4">
   <div>
    <label class="block text-sm text-gray-700 mb-2 change-highlight" id="accountLabel">
     出金账号:
    </label>
    <input class="w-full max-w-[385px] h-11 rounded border border-gray-200 px-4 text-sm text-gray-700 bg-gray-50" id="accountField" readonly="" type="text"/>
   </div>
   <div>
    <div class="text-sm text-gray-700 mb-2 change-highlight" id="balanceLabel">
     余额(美元):
    </div>
    <div class="flex flex-wrap items-center gap-x-3 gap-y-2 text-xs text-gray-500">
     <span class="text-gray-700 change-highlight" id="balanceText">
      10000 USD/美元
     </span>
     <span class="change-highlight">
      可用余额:
      <span class="text-[#22A3FF] change-highlight" id="availableText">
       8767 USD/美元
      </span>
     </span>
     <span class="change-highlight">
      出金中:
      <span class="text-[#C19B5E] change-highlight" id="withdrawingText">
       1233 USD/美元
      </span>
     </span>
     <span class="change-highlight">
      未绑定奖励:
      <span class="text-[#D97706] change-highlight" id="bonusText">
       0 USD/美元
      </span>
     </span>
    </div>
   </div>
   <div>
    <div class="text-sm text-gray-700 mb-2">
     * 支付方式:
    </div>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-3 max-w-[620px]" id="paymentGrid">
     <button
      class="pay-card text-left rounded-md border border-gray-200 px-4 py-3 bg-white"
      :class="selectedPaymentId === 'quickpay-cny' ? 'selected' : ''"
      data-id="quickpay-cny"
      type="button"
      @click="selectPayment('quickpay-cny')"
     >
      <div class="font-semibold text-[13px] text-gray-800">
       QUICKPAY-CNY (Y)
      </div>
      <div class="text-[11px] text-[#2563EB] mt-1">
       限额：100-100000USD
      </div>
     </button>
     <button
      class="pay-card text-left rounded-md border border-gray-200 px-4 py-3 bg-white"
      :class="selectedPaymentId === 'maxpay-usdt' ? 'selected' : ''"
      data-id="maxpay-usdt"
      type="button"
      @click="selectPayment('maxpay-usdt')"
     >
      <div class="font-semibold text-[13px] text-gray-800">
       MAXPAY-USDT ($)
      </div>
      <div class="text-[11px] text-[#2563EB] mt-1">
       限额：100-100000USD
      </div>
     </button>
     <button
      class="pay-card text-left rounded-md border border-gray-200 px-4 py-3 bg-white"
      :class="selectedPaymentId === 'assets-hkd' ? 'selected' : ''"
      data-id="assets-hkd"
      type="button"
      @click="selectPayment('assets-hkd')"
     >
      <div class="font-semibold text-[13px] text-gray-800">
       资产折扣 (HK$)
      </div>
      <div class="text-[11px] text-[#2563EB] mt-1">
       限额：1000-100000USD
      </div>
     </button>
     <button
      class="pay-card text-left rounded-md border border-gray-200 px-4 py-3 bg-white"
      :class="selectedPaymentId === 'ugate' ? 'selected' : ''"
      data-id="ugate"
      type="button"
      @click="selectPayment('ugate')"
     >
      <div class="font-semibold text-[13px] text-gray-800">
       UGATE (Y)
      </div>
      <div class="text-[11px] text-[#2563EB] mt-1">
       限额：100-700USD
      </div>
     </button>
     <button
      class="pay-card text-left rounded-md border border-gray-200 px-4 py-3 bg-white"
      :class="selectedPaymentId === 'plas-card' ? 'selected' : ''"
      data-id="plas-card"
      type="button"
      @click="selectPayment('plas-card')"
     >
      <div class="font-semibold text-[13px] text-gray-800">
       PLANE CARD (HK$)
      </div>
      <div class="text-[11px] text-[#2563EB] mt-1">
       限额：1-1000000USD
      </div>
     </button>
     <button
      class="pay-card text-left rounded-md border border-gray-200 px-4 py-3 bg-white"
      :class="selectedPaymentId === 'aipay' ? 'selected' : ''"
      data-id="aipay"
      type="button"
      @click="selectPayment('aipay')"
     >
      <div class="font-semibold text-[13px] text-gray-800">
       AIPAY (Y)
      </div>
      <div class="text-[11px] text-[#2563EB] mt-1">
       限额：1-1000000USD
      </div>
     </button>
     <button
      class="pay-card text-left rounded-md border border-gray-200 px-4 py-3 bg-white md:col-span-1"
      :class="selectedPaymentId === 'passtopay' ? 'selected' : ''"
      data-id="passtopay"
      type="button"
      @click="selectPayment('passtopay')"
     >
      <div class="font-semibold text-[13px] text-gray-800">
       PASSTOPAY (Y)
      </div>
      <div class="text-[11px] text-[#2563EB] mt-1">
       限额：1-10000USD
      </div>
     </button>
    </div>
   </div>
   <div>
    <div class="mb-2 flex flex-wrap items-center justify-between gap-2 max-w-[620px]">
     <label class="block text-sm text-gray-700 change-highlight" id="amountLabel">
      * 出金金额(美元):
     </label>
     <div class="text-xs text-gray-500 change-highlight">
      <span id="availableUsdWrap">
       <span>
        可出金金额：
       </span>
       <span class="text-[#22A3FF] font-medium change-highlight" id="availableUsdHint">
        8,767.00 USD/美元
       </span>
       <span class="mx-1" id="availableHintDivider">
        |
       </span>
      </span>
      <span id="availableOriginalLabel">
       原始金额：
      </span>
      <span class="font-medium change-highlight" id="availableOriginalHint">
       8,767.00 USD/美元
      </span>
     </div>
    </div>
    <input v-model="amountUsd" class="w-full max-w-[620px] h-11 rounded border border-gray-200 px-4 text-sm text-gray-700 placeholder:text-gray-400" id="amountInput" min="0.01" placeholder="请输入出金金额（美元）" step="0.01" type="number"/>
    <div class="text-xs text-gray-400 mt-2 change-highlight" id="amountHint">
     所有账户出金金额统一按美元输入，支持输入到小数点后两位。
    </div>
   </div>
   <div>
    <label class="block text-sm text-gray-700 mb-2 change-highlight" id="rateLabel">
     * 当前汇率:
    </label>
    <input class="w-full max-w-[620px] h-11 rounded border border-gray-200 px-4 text-sm text-gray-700 bg-gray-50" id="rateField" readonly="" type="text" value="7.18"/>
   </div>
   <div class="max-w-[620px] rounded-md bg-gray-50 border border-gray-200 px-4 py-3 flex items-center justify-between">
    <div class="text-sm text-gray-500 change-highlight" id="receivedLabel">
     到账金额:
    </div>
    <div class="text-[16px] md:text-[18px] font-bold text-gray-800 change-highlight" id="receivedText">
     0.00
     <span class="text-xs font-medium text-gray-500 change-highlight">
      (CNY/人民币)
     </span>
    </div>
   </div>
   <div class="max-w-[620px]">
    <label class="block text-sm text-gray-700 mb-2">
     * 验证码:
    </label>
    <div class="flex items-center gap-2">
     <input
      v-model="otpInput"
      class="flex-1 h-11 rounded border border-gray-200 px-4 text-sm text-gray-700 placeholder:text-gray-400 outline-none focus:border-primaryBtn"
      placeholder="请输入 8 位验证码"
      maxlength="8"
      inputmode="text"
      autocomplete="one-time-code"
     />
     <button
      type="button"
      class="h-11 px-4 rounded bg-primaryBtn hover:bg-primaryBtnHover text-white text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      :disabled="sendDisabled"
      @click="sendOtp"
     >
      {{ sendBtnText }}
     </button>
    </div>
    <div class="mt-2 text-xs" :class="otpStatusClass">
     {{ otpStatusText }}
    </div>
   </div>
   <button
    type="button"
    class="px-5 h-9 rounded bg-primaryBtn hover:bg-primaryBtnHover text-white text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
    :disabled="!canSubmit"
    @click="submitWithdraw"
   >
    保存
   </button>
  </div>
 </div>
</main>


    </div>
  </div>
</template>

<script setup>
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'

const selectedPaymentId = ref('quickpay-cny')
const amountUsd = ref('')

const nowMs = ref(Date.now())
let tickTimer = null

const otpMeta = ref({
  code: '',
  sentAtMs: 0,
  expiresAtMs: 0,
  cooldownUntilMs: 0,
  verified: false,
  used: false,
  invalidReason: '',
})

const otpInput = ref('')

const selectPayment = (id) => {
  selectedPaymentId.value = String(id || '')
}

const randomOtp8 = () => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  let out = ''
  for (let i = 0; i < 8; i += 1) out += chars[Math.floor(Math.random() * chars.length)]
  return out
}

const isOtpSent = computed(() => Boolean(otpMeta.value.code))
const cooldownRemainSec = computed(() => (otpMeta.value.cooldownUntilMs ? Math.max(0, Math.ceil((otpMeta.value.cooldownUntilMs - nowMs.value) / 1000)) : 0))
const expireRemainSec = computed(() => (otpMeta.value.expiresAtMs ? Math.max(0, Math.ceil((otpMeta.value.expiresAtMs - nowMs.value) / 1000)) : 0))
const otpExpired = computed(() => isOtpSent.value && expireRemainSec.value <= 0)

const sendDisabled = computed(() => cooldownRemainSec.value > 0)
const sendBtnText = computed(() => (cooldownRemainSec.value > 0 ? `${cooldownRemainSec.value}s` : '发送验证码'))

const invalidateOtp = (reason) => {
  otpMeta.value = {
    code: '',
    sentAtMs: 0,
    expiresAtMs: 0,
    cooldownUntilMs: 0,
    verified: false,
    used: false,
    invalidReason: String(reason || '').trim(),
  }
  otpInput.value = ''
}

const sendOtp = () => {
  const now = Date.now()
  const code = randomOtp8()
  otpMeta.value = {
    code,
    sentAtMs: now,
    expiresAtMs: now + 10 * 60 * 1000,
    cooldownUntilMs: now + 60 * 1000,
    verified: false,
    used: false,
    invalidReason: '',
  }
  otpInput.value = ''
}

watch([amountUsd, selectedPaymentId], ([a1, p1], [a0, p0]) => {
  if (!isOtpSent.value) return
  if (String(a1 || '') === String(a0 || '') && String(p1 || '') === String(p0 || '')) return
  invalidateOtp('出金金额或支付方式已变化，请重新获取验证码。')
})

watch([otpInput, nowMs], ([input]) => {
  const value = String(input || '').trim().toUpperCase()
  if (!isOtpSent.value) {
    otpMeta.value.verified = false
    return
  }
  if (otpMeta.value.used) {
    otpMeta.value.verified = false
    return
  }
  if (otpExpired.value) {
    otpMeta.value.verified = false
    return
  }
  if (!value) {
    otpMeta.value.verified = false
    return
  }
  otpMeta.value.verified = value === String(otpMeta.value.code || '')
})

const otpStatusText = computed(() => {
  if (otpMeta.value.invalidReason) return otpMeta.value.invalidReason
  if (!isOtpSent.value) return '请点击“发送验证码”获取验证码。'
  if (otpMeta.value.used) return '该验证码已使用，如需再次提交请重新获取验证码。'
  if (otpExpired.value) return '验证码已过期，请重新获取验证码。'
  if (otpMeta.value.verified) return '验证码验证成功，可以点击“保存”提交出金申请。'
  const input = String(otpInput.value || '').trim().toUpperCase()
  if (input) {
    if (input.length < 8) return '请输入 8 位验证码。'
    if (input.length >= 8 && input !== String(otpMeta.value.code || '')) return `验证码错误（演示码：${String(otpMeta.value.code || '')}），请重新输入。`
  }
  const showCode = String(otpMeta.value.code || '')
  const remain = expireRemainSec.value
  const mm = String(Math.floor(remain / 60)).padStart(2, '0')
  const ss = String(remain % 60).padStart(2, '0')
  return `验证码已发送（演示码：${showCode}），有效期剩余 ${mm}:${ss}。`
})

const otpStatusClass = computed(() => {
  if (otpMeta.value.invalidReason) return 'text-rose-600'
  if (!isOtpSent.value) return 'text-gray-500'
  if (otpMeta.value.used) return 'text-gray-500'
  if (otpExpired.value) return 'text-rose-600'
  if (otpMeta.value.verified) return 'text-emerald-600'
  if (otpInput.value && !otpMeta.value.verified) return 'text-rose-600'
  return 'text-gray-500'
})

const canSubmit = computed(() => Boolean(otpMeta.value.verified && !otpMeta.value.used && !otpExpired.value))

const submitWithdraw = () => {
  if (!canSubmit.value) return
  otpMeta.value.used = true
}

onMounted(() => {
  tickTimer = window.setInterval(() => {
    nowMs.value = Date.now()
  }, 1000)
})

onBeforeUnmount(() => {
  if (tickTimer) window.clearInterval(tickTimer)
  tickTimer = null
})
</script>
