<template>
  <div class="flex h-full bg-mainBg overflow-hidden w-full">
    <div class="flex-1 flex flex-col min-w-0 bg-gray-50 overflow-hidden p-4 custom-scrollbar overflow-y-auto w-full">
      <main class="flex-1 overflow-y-auto p-4 md:p-6 bg-mainBg">
        <div class="bg-white rounded-xl border border-gray-200 p-5 space-y-4">
          <div class="flex items-center justify-between gap-3 flex-wrap">
            <div class="text-sm font-semibold text-gray-700">银行卡详情</div>
            <div class="flex items-center gap-2">
              <button type="button" class="h-8 px-3 rounded-md bg-white border border-gray-200 text-gray-600 text-xs hover:bg-gray-50 transition-colors" @click="goBack">
                返回
              </button>
              <button type="button" class="h-8 px-3 rounded-md bg-primary text-white text-xs hover:bg-primaryHover transition-colors" @click="goAuditList">
                返回列表
              </button>
            </div>
          </div>

          <div class="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-4 text-sm">
            <div v-for="row in detailRows" :key="row.label" class="flex items-start justify-between gap-3">
              <div class="text-gray-500 shrink-0">{{ row.label }}</div>
              <div class="text-gray-800 font-medium text-right break-all">{{ row.value }}</div>
            </div>
          </div>

          <div class="flex items-center justify-end gap-2 pt-2 border-t border-gray-100">
            <button type="button" class="h-9 px-4 rounded-md bg-white border border-blue-200 text-blue-600 text-sm hover:bg-blue-50 transition-colors" @click="goAuditList">
              去审核
            </button>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const router = useRouter()
const route = useRoute()

const id = computed(() => {
  const v = Array.isArray(route.query.id) ? route.query.id[0] : route.query.id
  return typeof v === 'string' ? v : ''
})

const detailRows = computed(() => {
  const cardNo = id.value || '6222022703791347101'
  const email = cardNo.includes('6222') ? '15196181790@qq.com' : 'admin@dev.com'
  const bankType = cardNo.startsWith('T') ? 'USDT' : 'Bank'
  const status = route.query.status ? String(route.query.status) : '未审核'
  return [
    { label: '编号', value: cardNo },
    { label: '客户邮箱', value: email },
    { label: '银行卡号/钱包地址', value: cardNo },
    { label: '类型', value: bankType },
    { label: '开户名', value: bankType === 'Bank' ? '史密斯' : '-' },
    { label: '开户行', value: bankType === 'Bank' ? '中国建设银行陕西省宝鸡市宝钛支行' : '-' },
    { label: '银行国际代码', value: bankType === 'Bank' ? '-' : '-' },
    { label: '状态', value: status }
  ]
})

const goBack = () => {
  router.back()
}

const goAuditList = () => {
  router.push('/fund/audit-bankcard')
}
</script>

