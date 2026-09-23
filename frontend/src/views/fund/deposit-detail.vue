<template>
  <div class="flex h-full bg-mainBg overflow-hidden w-full">
    <div class="flex-1 flex flex-col min-w-0 bg-gray-50 overflow-hidden p-4 custom-scrollbar overflow-y-auto w-full">
      <main class="flex-1 overflow-y-auto p-4 md:p-6 bg-mainBg">
        <div class="space-y-4">
          <section class="bg-white rounded-xl border border-gray-200 p-5">
            <div class="text-sm font-semibold text-gray-700">客户与账户信息</div>
            <div class="mt-4 grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-4 text-sm">
              <div v-for="f in customerFields" :key="f.key" class="flex items-start gap-4">
                <div class="text-gray-500 w-40 shrink-0">{{ f.label }}</div>
                <div class="text-gray-800 font-medium break-all">{{ f.value }}</div>
              </div>
            </div>
          </section>

          <section class="bg-white rounded-xl border border-gray-200 p-5">
            <div class="text-sm font-semibold text-gray-700">入金申请信息</div>
            <div class="mt-4 grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-4 text-sm">
              <div
                v-for="f in applicationFields"
                :key="f.key"
                class="flex items-start gap-4"
                :class="f.fullRow ? 'md:col-span-2' : ''"
              >
                <div class="w-40 shrink-0" :class="f.labelClass || 'text-gray-500'">{{ f.label }}</div>
                <div class="break-all" :class="f.valueClass || 'text-gray-800 font-medium'">
                  <template v-if="f.type === 'tag'">
                    <span class="inline-flex items-center px-2 py-1 text-xs font-medium rounded-full border" :class="f.tagClass">
                      {{ f.value }}
                    </span>
                  </template>
                  <template v-else-if="f.type === 'voucher'">
                    <template v-if="f.voucherUrl">
                      <img
                        :src="f.voucherUrl"
                        alt="汇款凭证"
                        class="h-12 w-20 object-cover rounded border border-gray-200 cursor-pointer"
                        @click="openVoucherPreview(f.voucherUrl)"
                      />
                    </template>
                    <template v-else>-</template>
                  </template>
                  <template v-else>{{ f.value }}</template>
                </div>
              </div>
            </div>
          </section>

          <section class="bg-white rounded-xl border border-gray-200 p-5">
            <div class="text-sm font-semibold text-gray-700">支付与交易信息</div>
            <div class="mt-4 grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-4 text-sm">
              <div v-for="f in paymentFields" :key="f.key" class="flex items-start gap-4">
                <div class="text-gray-500 w-40 shrink-0">{{ f.label }}</div>
                <div class="text-gray-800 font-medium break-all">
                  <template v-if="f.type === 'tag'">
                    <span class="inline-flex items-center px-2 py-1 text-xs font-medium rounded-full border" :class="f.tagClass">
                      {{ f.value }}
                    </span>
                  </template>
                  <template v-else>{{ f.value }}</template>
                </div>
              </div>
            </div>
          </section>

          <div class="pt-2 flex justify-center">
            <button type="button" class="h-10 px-10 rounded-md bg-white border border-gray-200 text-gray-600 text-sm font-medium hover:bg-gray-50 transition-colors" @click="goBack">
              返回
            </button>
          </div>
        </div>
      </main>
    </div>
  </div>

  <div v-if="voucherPreviewVisible" class="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50">
    <div class="bg-white rounded-xl border border-gray-200 shadow-xl w-full max-w-4xl overflow-hidden">
      <div class="px-4 py-3 border-b border-gray-200 flex items-center justify-between">
        <div class="text-sm font-semibold text-gray-700">汇款凭证</div>
        <button type="button" class="h-8 w-8 rounded hover:bg-gray-100 text-gray-500" @click="closeVoucherPreview">
          <i class="fa-solid fa-xmark"></i>
        </button>
      </div>
      <div class="p-4 bg-gray-50 flex items-center justify-center">
        <img :src="voucherPreviewUrl" alt="汇款凭证预览" class="max-h-[70vh] w-auto object-contain rounded border border-gray-200 bg-white" />
      </div>
      <div class="px-4 py-3 border-t border-gray-200 flex justify-center">
        <button type="button" class="h-9 px-8 rounded-md bg-white border border-gray-200 text-gray-600 text-sm font-medium hover:bg-gray-50 transition-colors" @click="closeVoucherPreview">
          关闭
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const router = useRouter()
const route = useRoute()

const getQueryText = (v) => {
  if (typeof v === 'string') return v
  if (Array.isArray(v) && typeof v[0] === 'string') return v[0]
  return ''
}

const recordId = computed(() => getQueryText(route.query.id) || getQueryText(route.query.orderId))

const demoVoucher1 = 'https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=bank%20transfer%20receipt%20photo%2C%20flat%20paper%20receipt%20on%20a%20desk%2C%20clear%20text%20blocks%2C%20neutral%20lighting%2C%20realistic%2C%20high%20detail&image_size=landscape_4_3'
const demoVoucher2 = 'https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=mobile%20payment%20screenshot%20style%20receipt%2C%20blurred%20personal%20data%2C%20neutral%20UI%2C%20realistic%20screen%20photo%2C%20high%20detail&image_size=portrait_4_3'

const demoRecords = [
  {
    id: '942659247831777930',
    mtAccount: '8110474',
    mtType: 'cent',
    realName: 'test-沈栋晓',
    email: '13832766457@qq.com',
    depositAmount: 10000,
    depositUnit: 'USC/美分',
    payAmount: 0,
    payCurrency: 'USD',
    rate: 1,
    applyTime: '2026-09-21 13:59:26',
    auditStatus: '已审核',
    handleTime: '2026-09-21 13:59:27',
    payMethod: 'crm',
    voucherUrl: '',
    channelOrderNo: '',
    crmOrderNo: '942659247831777930',
    payStatus: '支付成功',
    mtTradeNo: '1220405',
    tradeTime: '2026-09-21 13:59:27',
    auditor: 'test-F7'
  },
  {
    id: '904617301918089430',
    mtAccount: '8800123',
    mtType: 'standard',
    realName: 'test-林宸',
    email: 'linchen@example.com',
    depositAmount: 100,
    depositUnit: 'USD',
    payAmount: 100,
    payCurrency: 'USD',
    rate: 1,
    applyTime: '2026-07-31 13:11:06',
    auditStatus: '待审核',
    handleTime: '',
    payMethod: 'MAXPAY(USDT)',
    voucherUrl: demoVoucher2,
    channelOrderNo: 'CH_20260731_001',
    crmOrderNo: '904617301918089430',
    payStatus: '待支付',
    mtTradeNo: '',
    tradeTime: '',
    auditor: ''
  },
  {
    id: '904617301918089431',
    mtAccount: '9900668',
    mtType: 'cent',
    realName: 'test-赵璇',
    email: 'zhaoxuan@example.com',
    depositAmount: 25000,
    depositUnit: 'USC/美分',
    payAmount: 1795,
    payCurrency: 'CNY',
    rate: 7.18,
    applyTime: '2026-07-30 18:42:51',
    auditStatus: '已审核',
    handleTime: '2026-07-30 18:45:02',
    payMethod: 'UGATE',
    voucherUrl: demoVoucher1,
    channelOrderNo: 'CH_20260730_018',
    crmOrderNo: '904617301918089431',
    payStatus: '支付成功',
    mtTradeNo: '9938801',
    tradeTime: '2026-07-30 18:45:02',
    auditor: 'test-F7'
  }
]

const record = computed(() => demoRecords.find((x) => String(x.id) === String(recordId.value)) || demoRecords[0])

const displayText = (v) => (v === null || v === undefined || String(v).trim() === '' ? '-' : String(v))

const formatAmount = (v) => {
  if (v === null || v === undefined || v === '') return '-'
  const n = Number(v)
  if (!Number.isFinite(n)) return '-'
  return n.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

const formatRate = (v) => {
  if (v === null || v === undefined || v === '') return '-'
  const n = Number(v)
  if (!Number.isFinite(n)) return '-'
  return n.toFixed(6).replace(/\.?0+$/, '')
}

const mtTypeText = computed(() => (record.value.mtType === 'cent' ? '美分账户' : '标准账户'))

const tagClassByAuditStatus = (status) => {
  if (status === '已审核') return 'bg-emerald-50 text-emerald-700 border-emerald-200'
  if (status === '待审核') return 'bg-amber-50 text-amber-700 border-amber-200'
  if (status === '审核拒绝') return 'bg-red-50 text-red-700 border-red-200'
  if (status === '已取消') return 'bg-gray-100 text-gray-600 border-gray-200'
  return 'bg-gray-100 text-gray-600 border-gray-200'
}

const tagClassByPayStatus = (status) => {
  if (status === '支付成功') return 'bg-emerald-50 text-emerald-700 border-emerald-200'
  if (status === '待支付') return 'bg-amber-50 text-amber-700 border-amber-200'
  if (status === '支付中') return 'bg-blue-50 text-blue-700 border-blue-200'
  if (status === '支付失败') return 'bg-red-50 text-red-700 border-red-200'
  if (status === '已退款') return 'bg-gray-100 text-gray-600 border-gray-200'
  return 'bg-gray-100 text-gray-600 border-gray-200'
}

const customerFields = computed(() => [
  { key: 'mtAccount', label: '入金MT账号', value: displayText(record.value.mtAccount) },
  { key: 'mtType', label: 'MT类型', value: displayText(mtTypeText.value) },
  { key: 'realName', label: '真实姓名', value: displayText(record.value.realName) },
  { key: 'email', label: '邮箱', value: displayText(record.value.email) }
])

const applicationFields = computed(() => {
  const highlightClass = 'text-red-500 font-medium'
  const depositTypeText = displayText(record.value.depositTypeNameSnapshot)
  const countAsRealDepositText = displayText(record.value.countAsRealDepositSnapshot)

  return [
    {
      key: 'depositType',
      label: '入金类型',
      value: depositTypeText,
      labelClass: highlightClass,
      valueClass: depositTypeText === '-' ? highlightClass : undefined
    },
    {
      key: 'countAsRealDeposit',
      label: '是否计入真实入金',
      value: countAsRealDepositText,
      labelClass: highlightClass,
      valueClass: countAsRealDepositText === '-' ? highlightClass : undefined
    },
    { key: 'depositAmount', label: '入金金额', value: formatAmount(record.value.depositAmount) },
    { key: 'payAmount', label: '支付金额', value: formatAmount(record.value.payAmount) },
    { key: 'rate', label: '汇率', value: formatRate(record.value.rate) },
    { key: 'payMethod', label: '支付方式', value: displayText(record.value.payMethod) },
    { key: 'depositUnit', label: '入金币种/单位', value: displayText(record.value.depositUnit) },
    { key: 'payCurrency', label: '支付币种', value: displayText(record.value.payCurrency) },
    { key: 'applyTime', label: '申请时间', value: displayText(record.value.applyTime) },
    { key: 'auditStatus', label: '审核状态', type: 'tag', value: displayText(record.value.auditStatus), tagClass: tagClassByAuditStatus(record.value.auditStatus) },
    { key: 'handleTime', label: '处理时间', value: displayText(record.value.handleTime) },
    { key: 'voucher', label: '汇款凭证', type: 'voucher', voucherUrl: record.value.voucherUrl, fullRow: true }
  ]
})

const paymentFields = computed(() => [
  { key: 'channelOrderNo', label: '支付通道订单号', value: displayText(record.value.channelOrderNo) },
  { key: 'crmOrderNo', label: 'CRM订单号', value: displayText(record.value.crmOrderNo) },
  { key: 'payStatus', label: '支付状态', type: 'tag', value: displayText(record.value.payStatus), tagClass: tagClassByPayStatus(record.value.payStatus) },
  { key: 'mtTradeNo', label: 'MT交易编号', value: displayText(record.value.mtTradeNo) },
  { key: 'tradeTime', label: '交易时间', value: displayText(record.value.tradeTime) },
  { key: 'auditor', label: '审核人', value: displayText(record.value.auditor) }
])

const voucherPreviewVisible = ref(false)
const voucherPreviewUrl = ref('')

const openVoucherPreview = (url) => {
  if (!url) return
  voucherPreviewUrl.value = url
  voucherPreviewVisible.value = true
}

const closeVoucherPreview = () => {
  voucherPreviewVisible.value = false
  voucherPreviewUrl.value = ''
}

const goBack = () => {
  if (window.history.length > 1) {
    router.back()
    return
  }
  router.push('/fund/deposit')
}
</script>
