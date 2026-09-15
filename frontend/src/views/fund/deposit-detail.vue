<template>
  <div class="flex h-full bg-mainBg overflow-hidden w-full">
    <div class="flex-1 flex flex-col min-w-0 bg-gray-50 overflow-hidden p-4 custom-scrollbar overflow-y-auto w-full">
      <main class="flex-1 overflow-y-auto p-4 md:p-6 bg-mainBg">
        <div class="space-y-4">
          <section class="bg-white rounded-xl border border-gray-200 p-5">
            <div class="flex items-center justify-between gap-3 flex-wrap">
              <div class="text-sm font-semibold text-gray-700">入金详情</div>
              <div class="flex items-center gap-2">
                <button type="button" class="h-8 px-3 rounded-md bg-white border border-gray-200 text-gray-600 text-xs hover:bg-gray-50 transition-colors" @click="goBack">
                  返回
                </button>
                <button type="button" class="h-8 px-3 rounded-md bg-primary text-white text-xs hover:bg-primaryHover transition-colors" @click="goDepositList">
                  入金列表
                </button>
              </div>
            </div>

            <div class="mt-4 grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-4 text-sm">
              <div v-for="row in detailRows" :key="row.label" class="flex items-start justify-between gap-3">
                <div class="text-gray-500 shrink-0">{{ row.label }}</div>
                <div class="text-gray-800 font-medium text-right break-all">{{ row.value }}</div>
              </div>
            </div>
          </section>

          <section class="bg-white rounded-xl border border-gray-200 p-5">
            <div class="text-sm font-semibold text-gray-700 mb-4">审核处理</div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block text-xs text-gray-500 mb-2">处理结果（演示）</label>
                <select v-model="form.result" class="h-9 w-full rounded-md border border-gray-200 bg-white px-3 text-sm text-gray-700 outline-none focus:border-[#C19B5E] focus:ring-2 focus:ring-[#C19B5E]/10">
                  <option value="approve">通过</option>
                  <option value="reject">拒绝</option>
                </select>
              </div>
              <div>
                <label class="block text-xs text-gray-500 mb-2">备注</label>
                <input v-model="form.remark" class="h-9 w-full rounded-md border border-gray-200 bg-white px-3 text-sm text-gray-700 outline-none focus:border-[#C19B5E] focus:ring-2 focus:ring-[#C19B5E]/10" placeholder="请输入备注（演示）" />
              </div>
            </div>

            <div class="flex items-center justify-end gap-2 pt-4">
              <button type="button" class="h-9 px-4 rounded-md bg-white border border-gray-200 text-gray-600 text-sm hover:bg-gray-50 transition-colors" @click="goDepositPending">
                去待审核入金
              </button>
              <button type="button" class="h-9 px-4 rounded-md bg-primary text-white text-sm hover:bg-primaryHover transition-colors" @click="goDepositList">
                完成
              </button>
            </div>
          </section>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import { computed, reactive } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const router = useRouter()
const route = useRoute()

const orderId = computed(() => {
  const v = Array.isArray(route.query.orderId) ? route.query.orderId[0] : route.query.orderId
  return typeof v === 'string' ? v : ''
})

const detailRows = computed(() => {
  const v = orderId.value || 'OUT_923832107870979672'
  const mtAccount = v.includes('9198') ? '8300105' : '9900761'
  const mtType = mtAccount.startsWith('99') ? '美分账户 / USC' : '标准账户 / USD'
  const amountText = mtType.includes('USC') ? '100,000.00 USC（折算 1,000.00 USD）' : '$1,233.00'
  return [
    { label: '订单号', value: v },
    { label: 'MT账号', value: mtAccount },
    { label: 'MT类型', value: mtType },
    { label: '入金金额', value: amountText },
    { label: '支付方式', value: v.includes('OUT_') ? 'AIPAY' : 'crm' },
    { label: '审核状态', value: '待审核' },
    { label: '付款状态', value: '待支付' },
    { label: '申请时间', value: '2026-07-31 15:07:06' }
  ]
})

const form = reactive({
  result: 'approve',
  remark: ''
})

const goBack = () => router.back()
const goDepositList = () => router.push('/fund/deposit')
const goDepositPending = () => router.push('/fund/deposit-pending-review')
</script>

