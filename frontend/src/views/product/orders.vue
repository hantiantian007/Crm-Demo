<template>
  <div class="flex h-full bg-mainBg overflow-hidden w-full">
    <div class="flex-1 flex flex-col min-w-0 bg-gray-50 overflow-hidden p-4 custom-scrollbar overflow-y-auto w-full">
      <main class="flex-1 overflow-y-auto p-4 md:p-6 bg-mainBg">
        <div class="space-y-4">
          <section class="bg-white rounded-xl border border-gray-200 p-5">
            <div class="text-sm font-semibold text-gray-700 mb-4">搜索</div>
            <div class="grid grid-cols-6 gap-4">
              <div class="col-span-2">
                <label class="block text-xs text-gray-500 mb-2">状态</label>
                <select v-model="form.status" class="h-9 w-full rounded-md border border-gray-200 bg-white px-3 text-xs text-gray-700 outline-none focus:border-[#C19B5E] focus:ring-2 focus:ring-[#C19B5E]/10">
                  <option value="">-全部-</option>
                  <option value="pending">待确认</option>
                  <option value="delivered">已交付</option>
                  <option value="rejected">已拒绝/取消</option>
                </select>
              </div>
              <div class="col-span-2">
                <label class="block text-xs text-gray-500 mb-2">关键词</label>
                <input v-model="form.keyword" class="h-9 w-full rounded-md border border-gray-200 bg-white px-3 text-xs text-gray-700 outline-none focus:border-[#C19B5E] focus:ring-2 focus:ring-[#C19B5E]/10" placeholder="订单编号 / 邮箱 / 客户姓名" />
              </div>
              <div class="col-span-2">
                <label class="block text-xs text-gray-500 mb-2">购买时间</label>
                <div class="grid grid-cols-2 gap-3">
                  <input v-model="form.startDate" class="h-9 w-full rounded-md border border-gray-200 bg-white px-3 text-xs text-gray-700 outline-none focus:border-[#C19B5E] focus:ring-2 focus:ring-[#C19B5E]/10" placeholder="开始日期" />
                  <input v-model="form.endDate" class="h-9 w-full rounded-md border border-gray-200 bg-white px-3 text-xs text-gray-700 outline-none focus:border-[#C19B5E] focus:ring-2 focus:ring-[#C19B5E]/10" placeholder="结束日期" />
                </div>
              </div>
              <div class="col-span-6 flex items-center gap-3">
                <button class="h-9 px-4 rounded-md bg-primary hover:bg-primaryHover text-white text-sm font-medium transition-colors" type="button" @click="handleSearch">搜索</button>
                <button class="h-9 px-4 rounded-md bg-gray-100 hover:bg-gray-200 text-gray-600 text-sm font-medium transition-colors" type="button" @click="handleReset">重置</button>
              </div>
            </div>
          </section>

          <section class="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div class="overflow-x-auto">
              <table class="min-w-[1400px] w-full text-xs">
                <thead class="bg-white text-gray-500">
                  <tr class="border-b border-gray-100">
                    <th class="text-left font-medium px-5 py-4 whitespace-nowrap">基础信息</th>
                    <th class="text-left font-medium px-5 py-4 whitespace-nowrap">商品名称/套餐</th>
                    <th class="text-left font-medium px-5 py-4 whitespace-nowrap">Star账号</th>
                    <th class="text-left font-medium px-5 py-4 whitespace-nowrap">实付金额</th>
                    <th class="text-left font-medium px-5 py-4 whitespace-nowrap">付款MT账号</th>
                    <th class="text-left font-medium px-5 py-4 whitespace-nowrap">有效期限</th>
                    <th class="text-left font-medium px-5 py-4 whitespace-nowrap">状态</th>
                    <th class="text-left font-medium px-5 py-4 whitespace-nowrap">操作</th>
                  </tr>
                </thead>
              </table>
            </div>

            <div v-if="rows.length === 0" class="py-16 flex flex-col items-center justify-center text-gray-400">
              <div class="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                <i class="fa-regular fa-box-open text-3xl text-gray-300"></i>
              </div>
              <div class="text-sm">无可用数据</div>
            </div>
          </section>
        </div>

        <div v-if="approveModalVisible" class="fixed inset-0 z-[100] flex items-center justify-center p-6">
          <div class="absolute inset-0 bg-black/50" @click="approveModalVisible = false"></div>
          <div class="relative w-full max-w-md bg-white rounded-xl shadow-2xl overflow-hidden">
            <div class="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-gray-50">
              <div class="text-sm font-bold text-gray-800">确认发货/开通</div>
              <button class="text-gray-400 hover:text-gray-600" type="button" @click="approveModalVisible = false">
                <i class="fa-solid fa-xmark"></i>
              </button>
            </div>
            <div class="p-6 text-sm text-gray-600 space-y-3">
              <div>确认通过后订单将变更为“已交付”。</div>
              <div class="text-xs text-gray-400">订单编号：{{ selectedOrder?.id || '-' }}</div>
            </div>
            <div class="px-6 py-4 bg-gray-50 border-t border-gray-100 flex justify-end gap-3">
              <button class="h-9 px-4 rounded-md bg-gray-100 hover:bg-gray-200 text-gray-600 text-sm font-medium transition-colors" type="button" @click="approveModalVisible = false">取消</button>
              <button class="h-9 px-4 rounded-md bg-primary hover:bg-primaryHover text-white text-sm font-medium transition-colors" type="button" @click="handleApproveConfirm">确认通过</button>
            </div>
          </div>
        </div>

        <div v-if="rejectModalVisible" class="fixed inset-0 z-[100] flex items-center justify-center p-6">
          <div class="absolute inset-0 bg-black/50" @click="rejectModalVisible = false"></div>
          <div class="relative w-full max-w-md bg-white rounded-xl shadow-2xl overflow-hidden">
            <div class="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-gray-50">
              <div class="text-sm font-bold text-gray-800 flex items-center gap-2">
                <i class="fa-solid fa-triangle-exclamation text-red-500"></i>
                拒绝/取消订单
              </div>
              <button class="text-gray-400 hover:text-gray-600" type="button" @click="rejectModalVisible = false">
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
              <button class="h-9 px-4 rounded-md bg-gray-100 hover:bg-gray-200 text-gray-600 text-sm font-medium transition-colors" type="button" @click="rejectModalVisible = false">暂不处理</button>
              <button class="h-9 px-4 rounded-md bg-red-500 hover:bg-red-600 text-white text-sm font-medium transition-colors" type="button" @click="handleRejectConfirm">确认拒绝</button>
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import { computed, reactive, ref } from 'vue'

const form = reactive({
  status: '',
  keyword: '',
  startDate: '',
  endDate: '',
})

const rows = ref([])

const approveModalVisible = ref(false)
const rejectModalVisible = ref(false)
const selectedOrder = ref(null)
const rejectForm = reactive({
  reasonType: '',
  reasonDetail: '',
})

const handleSearch = () => {}
const handleReset = () => {
  form.status = ''
  form.keyword = ''
  form.startDate = ''
  form.endDate = ''
}

const canOperate = computed(() => selectedOrder.value?.status === 'pending')

const openApprove = (row) => {
  selectedOrder.value = row
  approveModalVisible.value = true
}

const openReject = (row) => {
  selectedOrder.value = row
  rejectForm.reasonType = ''
  rejectForm.reasonDetail = ''
  rejectModalVisible.value = true
}

const handleApproveConfirm = () => {
  if (!canOperate.value) return
  approveModalVisible.value = false
}

const handleRejectConfirm = () => {
  if (!canOperate.value) return
  rejectModalVisible.value = false
}
</script>
