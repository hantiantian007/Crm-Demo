<template>
  <div class="flex h-full bg-mainBg overflow-hidden w-full">
    <div class="flex-1 flex flex-col min-w-0 bg-gray-50 overflow-hidden p-4 custom-scrollbar overflow-y-auto w-full">
      <main class="flex-1 overflow-y-auto p-4 md:p-6 bg-mainBg">
        <div class="space-y-4">
          <section class="bg-white rounded-xl border border-gray-200 p-5">
            <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
              <div>
                <div class="text-xl font-bold text-gray-900">商品订单管理</div>
                <div class="text-sm text-gray-500 mt-1">后台商品订单审核，包含通过/拒绝流转与人工交付信息录入</div>
              </div>
            </div>
            <div class="mt-4 p-3 bg-blue-50 border border-blue-100 rounded-lg flex items-start gap-3">
              <i class="fa-solid fa-circle-info text-blue-500 mt-0.5"></i>
              <div class="text-sm text-blue-800">
                <span class="font-bold">说明：</span> 客户提交订单后将暂不扣除其钱包余额，订单状态为“待确认”。点击「通过」后订单生效；点击「拒绝」则关闭订单，无需退款（演示）。
              </div>
            </div>
          </section>

          <section class="bg-white rounded-xl border border-gray-200 p-5">
            <div class="text-sm font-semibold text-gray-700 mb-4">搜索</div>
            <div class="grid grid-cols-1 md:grid-cols-6 gap-4">
              <div class="md:col-span-2">
                <label class="block text-xs text-gray-500 mb-2">状态</label>
                <select v-model="form.status" class="h-9 w-full rounded-md border border-gray-200 bg-white px-3 text-xs text-gray-700 outline-none focus:border-[#C19B5E] focus:ring-2 focus:ring-[#C19B5E]/10">
                  <option value="">-全部-</option>
                  <option value="pending">待确认</option>
                  <option value="delivered">已通过/生效</option>
                  <option value="rejected">已拒绝/取消</option>
                </select>
              </div>
              <div class="md:col-span-2">
                <label class="block text-xs text-gray-500 mb-2">关键词</label>
                <input v-model="form.keyword" class="h-9 w-full rounded-md border border-gray-200 bg-white px-3 text-xs text-gray-700 outline-none focus:border-[#C19B5E] focus:ring-2 focus:ring-[#C19B5E]/10" placeholder="订单编号 / 邮箱 / 客户姓名" />
              </div>
              <div class="md:col-span-2">
                <label class="block text-xs text-gray-500 mb-2">购买时间</label>
                <div class="grid grid-cols-2 gap-3">
                  <input v-model="form.startDate" class="h-9 w-full rounded-md border border-gray-200 bg-white px-3 text-xs text-gray-700 outline-none focus:border-[#C19B5E] focus:ring-2 focus:ring-[#C19B5E]/10" placeholder="开始日期" type="date" />
                  <input v-model="form.endDate" class="h-9 w-full rounded-md border border-gray-200 bg-white px-3 text-xs text-gray-700 outline-none focus:border-[#C19B5E] focus:ring-2 focus:ring-[#C19B5E]/10" placeholder="结束日期" type="date" />
                </div>
              </div>
              <div class="md:col-span-6 flex items-center gap-3">
                <button class="h-9 px-4 rounded-md bg-primary hover:bg-primaryHover text-white text-sm font-medium transition-colors" type="button" @click="handleSearch">搜索</button>
                <button class="h-9 px-4 rounded-md bg-gray-100 hover:bg-gray-200 text-gray-600 text-sm font-medium transition-colors" type="button" @click="handleReset">重置</button>
              </div>
            </div>
          </section>

          <section class="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div class="overflow-x-auto">
              <table class="min-w-[1200px] w-full text-xs">
                <thead class="bg-white text-gray-500">
                  <tr class="border-b border-gray-100">
                    <th class="text-left font-medium px-5 py-4 whitespace-nowrap w-[300px]">基础信息</th>
                    <th class="text-left font-medium px-5 py-4 whitespace-nowrap w-[260px]">商品名称/套餐</th>
                    <th class="text-left font-medium px-5 py-4 whitespace-nowrap w-[140px]">Star账号</th>
                    <th class="text-left font-medium px-5 py-4 whitespace-nowrap w-[120px]">实付金额</th>
                    <th class="text-left font-medium px-5 py-4 whitespace-nowrap w-[130px]">付款MT账号</th>
                    <th class="text-left font-medium px-5 py-4 whitespace-nowrap w-[190px]">有效期限</th>
                    <th class="text-left font-medium px-5 py-4 whitespace-nowrap w-[120px]">状态</th>
                    <th class="text-right font-medium px-5 py-4 whitespace-nowrap w-[160px]">操作</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-gray-100 text-sm">
                  <tr v-for="row in filteredRows" :key="row.id" class="hover:bg-gray-50 transition-colors" :class="row.status === 'rejected' ? 'opacity-75 bg-gray-50/30' : row.status === 'delivered' ? 'bg-gray-50/30' : ''">
                    <td class="px-5 py-4 align-top">
                      <div class="text-gray-900 font-medium">{{ row.id }}</div>
                      <div class="mt-1 text-xs text-gray-500">{{ row.createdAt }}</div>
                      <div class="mt-2 text-gray-900">{{ row.clientName }}</div>
                      <div class="mt-0.5 text-xs text-gray-500">{{ row.clientEmail }}</div>
                      <div v-if="row.clientMtLogin" class="mt-1 text-xs text-primary">
                        <i class="fas fa-wallet mr-1"></i>
                        MT5: {{ row.clientMtLogin }}
                      </div>
                    </td>
                    <td class="px-5 py-4 align-top">
                      <div class="font-medium text-blue-600">{{ row.productName }}</div>
                      <div class="mt-2">
                        <span class="px-2 py-1 rounded text-xs" :class="row.packageType === 'oneTime' ? 'bg-purple-50 text-purple-600' : 'bg-gray-100 text-gray-700'">
                          {{ row.packageLabel }}
                        </span>
                      </div>
                    </td>
                    <td class="px-5 py-4 align-top">
                      <span :class="row.starAccount ? 'text-gray-900' : 'text-gray-400 italic'">{{ row.starAccount || '/' }}</span>
                    </td>
                    <td class="px-5 py-4 align-top">
                      <div class="font-bold" :class="row.status === 'rejected' ? 'text-gray-400 line-through' : 'text-red-500'">${{ formatMoney(row.amount) }}</div>
                    </td>
                    <td class="px-5 py-4 align-top text-gray-900">
                      {{ row.payMtAccount }}
                    </td>
                    <td class="px-5 py-4 align-top">
                      <span :class="row.status === 'pending' ? 'text-gray-400 italic text-xs' : 'text-gray-500 text-xs'">
                        {{ row.validityText }}
                      </span>
                    </td>
                    <td class="px-5 py-4 align-top">
                      <span class="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium border" :class="statusBadgeClass(row.status)">
                        <span class="w-1.5 h-1.5 rounded-full mr-1.5" :class="statusDotClass(row.status)"></span>
                        {{ statusLabel(row.status) }}
                      </span>
                    </td>
                    <td class="px-5 py-4 align-top text-right">
                      <div v-if="row.status === 'pending'" class="flex items-center justify-end gap-2">
                        <button class="px-3 py-1.5 bg-primary hover:bg-primaryHover text-white rounded text-xs font-medium transition-colors shadow-sm" type="button" @click="openDelivery(row)">
                          通过
                        </button>
                        <button class="px-3 py-1.5 bg-red-500 hover:bg-red-600 text-white rounded text-xs font-medium transition-colors shadow-sm" type="button" @click="openReject(row)">
                          拒绝
                        </button>
                      </div>
                      <span v-else class="text-xs text-gray-400">-</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div v-if="filteredRows.length === 0" class="py-16 flex flex-col items-center justify-center text-gray-400">
              <div class="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                <i class="fa-regular fa-box-open text-3xl text-gray-300"></i>
              </div>
              <div class="text-sm">无可用数据</div>
            </div>
          </section>
        </div>

        <div v-if="deliveryModalVisible" class="fixed inset-0 z-[100] flex items-center justify-center p-6">
          <div class="absolute inset-0 bg-black/60 backdrop-blur-sm" @click="closeDelivery"></div>
          <div class="relative w-full max-w-lg bg-white rounded-xl shadow-2xl overflow-hidden flex flex-col">
            <div class="bg-gray-50 px-6 py-4 border-b border-gray-100 flex justify-between items-center">
              <h3 class="text-lg font-bold text-gray-900">人工交付业务</h3>
              <button class="text-gray-400 hover:text-gray-600 transition-colors" type="button" :disabled="deliverySubmitting" :class="deliverySubmitting ? 'opacity-50 cursor-not-allowed' : ''" @click="closeDelivery">
                <i class="fa-solid fa-xmark text-lg"></i>
              </button>
            </div>

            <div class="p-6 overflow-y-auto max-h-[70vh]">
              <div class="bg-blue-50 text-blue-700 text-xs px-3 py-2.5 rounded mb-5 flex items-start gap-2 border border-blue-100">
                <i class="fa-solid fa-circle-info mt-0.5 text-blue-500"></i>
                <span>请在第三方平台为客户开通权限后，在此录入交付信息。交付后订单状态将更新为“已通过/生效”。</span>
              </div>

              <div class="bg-gray-50 p-4 rounded-lg border border-gray-200 mb-6 text-sm">
                <div class="grid grid-cols-2 gap-3">
                  <div class="text-gray-500">订单编号：<span class="text-gray-900 font-medium">{{ selectedOrder?.id || '-' }}</span></div>
                  <div class="text-gray-500">客户姓名：<span class="text-gray-900 font-medium">{{ selectedOrder?.clientName || '-' }}</span></div>
                  <div class="text-gray-500 col-span-2">商品名称：<span class="text-gray-900 font-medium">{{ selectedOrder?.productName || '-' }}</span></div>
                </div>
              </div>

              <div class="space-y-4">
                <div>
                  <label class="block text-xs font-medium text-gray-700 mb-1">第三方平台账号 (选填)</label>
                  <input v-model.trim="deliveryForm.thirdPartyAccount" type="text" placeholder="请输入为客户开通的业务账号，若无则留空" class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary">
                </div>

                <div v-if="selectedOrder?.packageType !== 'oneTime'" class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label class="block text-xs font-medium text-gray-700 mb-1">生效日期 <span class="text-red-500">*</span></label>
                    <input v-model="deliveryForm.startDate" type="date" class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary">
                  </div>
                  <div>
                    <label class="block text-xs font-medium text-gray-700 mb-1">失效日期 (留空为永久)</label>
                    <input v-model="deliveryForm.endDate" type="date" class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary">
                  </div>
                </div>

                <div v-else class="bg-gray-50 p-3 rounded-lg border border-gray-200 text-sm text-gray-600">
                  <i class="fa-solid fa-check-circle text-green-500 mr-1"></i>
                  此商品为<span class="font-bold text-gray-800">无时间限制</span>，交付后权限将永久生效。
                </div>

                <div>
                  <label class="block text-xs font-medium text-gray-700 mb-1">交付备注 (选填)</label>
                  <textarea v-model.trim="deliveryForm.note" rows="2" placeholder="如需给客户留言或备注特殊情况，请在此填写..." class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"></textarea>
                </div>
              </div>
            </div>

            <div class="px-6 py-4 bg-gray-50 border-t border-gray-100 flex justify-end gap-3">
              <button class="px-5 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-200 rounded-lg text-sm font-medium transition-colors" type="button" :disabled="deliverySubmitting" :class="deliverySubmitting ? 'opacity-50 cursor-not-allowed' : ''" @click="closeDelivery">
                取消
              </button>
              <button
                class="px-6 py-2 bg-primary hover:bg-primaryHover text-white rounded-lg text-sm font-bold shadow-sm transition-colors flex items-center gap-2"
                type="button"
                :disabled="deliverySubmitting"
                :class="deliverySubmitting ? 'opacity-70 cursor-not-allowed' : ''"
                @click="handleDeliveryConfirm"
              >
                {{ deliverySubmitting ? '处理中...' : '确认交付' }}
              </button>
            </div>
          </div>
        </div>

        <div v-if="rejectModalVisible" class="fixed inset-0 z-[100] flex items-center justify-center p-6">
          <div class="absolute inset-0 bg-black/50" @click="closeReject"></div>
          <div class="relative w-full max-w-md bg-white rounded-xl shadow-2xl overflow-hidden">
            <div class="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-gray-50">
              <div class="text-sm font-bold text-gray-800 flex items-center gap-2">
                <i class="fa-solid fa-triangle-exclamation text-red-500"></i>
                拒绝/取消订单
              </div>
              <button class="text-gray-400 hover:text-gray-600" type="button" :disabled="rejectSubmitting" :class="rejectSubmitting ? 'opacity-50 cursor-not-allowed' : ''" @click="closeReject">
                <i class="fa-solid fa-xmark"></i>
              </button>
            </div>
            <div class="p-6">
              <div class="bg-red-50 text-red-700 text-xs px-3 py-2.5 rounded mb-5 border border-red-100 flex items-start gap-2">
                <i class="fa-solid fa-circle-info mt-0.5 text-red-500"></i>
                <span><span class="font-bold">重要提示：</span>拒绝订单后，该笔订单将被关闭并释放相关额度。因生成订单时未扣除客户余额，故无需进行退款操作。</span>
              </div>
              <div class="bg-gray-50 p-4 rounded-lg border border-gray-200 mb-6 text-sm">
                <div class="grid grid-cols-2 gap-3">
                  <div class="text-gray-500 col-span-2">订单编号：<span class="text-gray-900 font-medium">{{ selectedOrder?.id || '-' }}</span></div>
                  <div class="text-gray-500">客户姓名：<span class="text-gray-900 font-medium">{{ selectedOrder?.clientName || '-' }}</span></div>
                  <div class="text-gray-500">订单金额：<span class="text-red-500 font-bold">{{ selectedOrder?.amount || '-' }}</span></div>
                </div>
              </div>
              <div class="space-y-2">
                <label class="block text-xs font-medium text-gray-700">拒绝原因 (必填，客户端可见)<span class="text-red-500 ml-1">*</span></label>
                <select v-model="rejectForm.reasonType" class="h-9 w-full rounded-md border border-gray-200 bg-white px-3 text-xs text-gray-700 outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/10">
                  <option value="">请选择拒绝原因</option>
                  <option value="1">客户账户状态异常，无法开通权限</option>
                  <option value="2">该商品库存/额度已满，暂停售卖</option>
                  <option value="3">客户主动要求取消订单</option>
                  <option value="4">系统价格配置错误</option>
                  <option value="other">其他原因 (请在下方补充)</option>
                </select>
                <textarea v-model="rejectForm.reasonDetail" class="w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-xs text-gray-700 outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/10" placeholder="补充详细说明..." rows="2"></textarea>
              </div>
            </div>
            <div class="px-6 py-4 bg-gray-50 border-t border-gray-100 flex justify-end gap-3">
              <button
                class="h-9 px-4 rounded-md bg-gray-100 hover:bg-gray-200 text-gray-600 text-sm font-medium transition-colors"
                type="button"
                :disabled="rejectSubmitting"
                :class="rejectSubmitting ? 'opacity-50 cursor-not-allowed' : ''"
                @click="closeReject"
              >
                暂不处理
              </button>
              <button
                class="h-9 px-4 rounded-md bg-red-500 hover:bg-red-600 text-white text-sm font-medium transition-colors"
                type="button"
                :disabled="rejectSubmitting"
                :class="rejectSubmitting ? 'opacity-70 cursor-not-allowed' : ''"
                @click="handleRejectConfirm"
              >
                {{ rejectSubmitting ? '提交中...' : '确认拒绝' }}
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import { computed, reactive, ref } from 'vue'

const formatMoney = (n) => {
  const num = typeof n === 'number' ? n : Number(n)
  if (!Number.isFinite(num)) return '0.00'
  return num.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

const form = reactive({
  status: '',
  keyword: '',
  startDate: '',
  endDate: '',
})

const applied = reactive({
  status: '',
  keyword: '',
  startDate: '',
  endDate: '',
})

const rows = ref([
  {
    id: 'ORD-20260623-8891',
    createdAt: '2026-06-23 14:30:22',
    clientName: '张三',
    clientEmail: 'zhangsan@email.com',
    clientMtLogin: '8881234 (USD)',
    productName: '先锋一号智能交易系统',
    packageLabel: '1个月',
    packageType: 'period',
    starAccount: 'Star-12345',
    amount: 300,
    payMtAccount: '667788',
    validityText: '待运营线下人工开通',
    status: 'pending',
    rejectReason: ''
  },
  {
    id: 'ORD-20260622-5531',
    createdAt: '2026-06-22 10:11:45',
    clientName: '赵六',
    clientEmail: 'zhaoliu@email.com',
    clientMtLogin: '8885678 (USD)',
    productName: '先锋二号',
    packageLabel: '无时间限制',
    packageType: 'oneTime',
    starAccount: '',
    amount: 999,
    payMtAccount: '余额支付',
    validityText: '待运营线下人工开通',
    status: 'pending',
    rejectReason: ''
  },
  {
    id: 'ORD-20260621-1024',
    createdAt: '2026-06-21 09:15:00',
    clientName: '李四',
    clientEmail: 'lisi_fx@email.com',
    clientMtLogin: '',
    productName: '先锋一号智能交易系统',
    packageLabel: '3个月',
    packageType: 'period',
    starAccount: 'Star-8888',
    amount: 150,
    payMtAccount: '556677',
    validityText: '2026-06-21 至 2026-09-21',
    status: 'delivered',
    rejectReason: ''
  },
  {
    id: 'ORD-20260620-0034',
    createdAt: '2026-06-20 10:05:12',
    clientName: '王五',
    clientEmail: 'wangwu@email.com',
    clientMtLogin: '',
    productName: '先锋一号',
    packageLabel: '7天',
    packageType: 'period',
    starAccount: '',
    amount: 5000,
    payMtAccount: '8099124',
    validityText: '-',
    status: 'rejected',
    rejectReason: '客户主动要求取消订单'
  }
])

const deliveryModalVisible = ref(false)
const rejectModalVisible = ref(false)
const selectedOrder = ref(null)
const deliverySubmitting = ref(false)
const rejectSubmitting = ref(false)
const deliveryForm = reactive({
  thirdPartyAccount: '',
  startDate: '',
  endDate: '',
  note: ''
})
const rejectForm = reactive({
  reasonType: '',
  reasonDetail: '',
})

const handleSearch = () => {
  applied.status = form.status
  applied.keyword = form.keyword
  applied.startDate = form.startDate
  applied.endDate = form.endDate
}

const handleReset = () => {
  form.status = ''
  form.keyword = ''
  form.startDate = ''
  form.endDate = ''

  applied.status = ''
  applied.keyword = ''
  applied.startDate = ''
  applied.endDate = ''
}

const filteredRows = computed(() => {
  const keyword = applied.keyword.trim().toLowerCase()
  return rows.value.filter((r) => {
    if (applied.status && r.status !== applied.status) return false
    if (keyword) {
      const hay = `${r.id} ${r.clientName} ${r.clientEmail}`.toLowerCase()
      if (!hay.includes(keyword)) return false
    }

    if (applied.startDate) {
      const created = r.createdAt.slice(0, 10)
      if (created < applied.startDate) return false
    }
    if (applied.endDate) {
      const created = r.createdAt.slice(0, 10)
      if (created > applied.endDate) return false
    }

    return true
  })
})

const statusLabel = (status) => {
  if (status === 'pending') return '待确认'
  if (status === 'delivered') return '已通过/生效'
  if (status === 'rejected') return '已拒绝/取消'
  return status
}

const statusDotClass = (status) => {
  if (status === 'pending') return 'bg-yellow-500'
  if (status === 'delivered') return 'bg-green-500'
  if (status === 'rejected') return 'bg-red-500'
  return 'bg-gray-400'
}

const statusBadgeClass = (status) => {
  if (status === 'pending') return 'bg-yellow-100 text-yellow-800 border-yellow-200'
  if (status === 'delivered') return 'bg-green-100 text-green-800 border-green-200'
  if (status === 'rejected') return 'bg-red-50 text-red-600 border-red-200'
  return 'bg-gray-100 text-gray-700 border-gray-200'
}

const openDelivery = (row) => {
  selectedOrder.value = row
  deliveryForm.thirdPartyAccount = ''
  deliveryForm.startDate = ''
  deliveryForm.endDate = ''
  deliveryForm.note = ''
  deliverySubmitting.value = false
  deliveryModalVisible.value = true
}

const openReject = (row) => {
  selectedOrder.value = row
  rejectForm.reasonType = ''
  rejectForm.reasonDetail = ''
  rejectSubmitting.value = false
  rejectModalVisible.value = true
}

const closeDelivery = () => {
  if (deliverySubmitting.value) return
  deliveryModalVisible.value = false
}

const closeReject = () => {
  if (rejectSubmitting.value) return
  rejectModalVisible.value = false
}

const handleDeliveryConfirm = () => {
  if (deliverySubmitting.value) return
  if (!selectedOrder.value || selectedOrder.value.status !== 'pending') return

  if (selectedOrder.value.packageType !== 'oneTime' && !deliveryForm.startDate) {
    alert('请填写生效日期')
    return
  }

  deliverySubmitting.value = true
  setTimeout(() => {
    const start = deliveryForm.startDate
    const end = deliveryForm.endDate

    if (selectedOrder.value?.packageType === 'oneTime') {
      selectedOrder.value.validityText = '永久有效'
    } else if (start && end) {
      selectedOrder.value.validityText = `${start} 至 ${end}`
    } else if (start && !end) {
      selectedOrder.value.validityText = `${start} 至 永久有效`
    }

    if (selectedOrder.value) selectedOrder.value.status = 'delivered'
    deliverySubmitting.value = false
    deliveryModalVisible.value = false
    alert('交付成功（演示）')
  }, 700)
}

const handleRejectConfirm = () => {
  if (rejectSubmitting.value) return
  if (!selectedOrder.value || selectedOrder.value.status !== 'pending') return
  if (!rejectForm.reasonType) {
    alert('请选择拒绝原因')
    return
  }
  if (rejectForm.reasonType === 'other' && !rejectForm.reasonDetail.trim()) {
    alert('请补充详细说明')
    return
  }

  const map = {
    1: '客户账户状态异常，无法开通权限',
    2: '该商品库存/额度已满，暂停售卖',
    3: '客户主动要求取消订单',
    4: '系统价格配置错误',
    other: rejectForm.reasonDetail.trim()
  }

  rejectSubmitting.value = true
  setTimeout(() => {
    if (selectedOrder.value) {
      selectedOrder.value.rejectReason = map[rejectForm.reasonType]
      selectedOrder.value.status = 'rejected'
      selectedOrder.value.validityText = '-'
    }
    rejectSubmitting.value = false
    rejectModalVisible.value = false
    alert('已拒绝并关闭订单（演示）')
  }, 700)
}
</script>
