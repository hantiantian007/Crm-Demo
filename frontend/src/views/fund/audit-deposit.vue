<template>
  <div class="flex h-full bg-mainBg overflow-hidden w-full">
    <div class="flex-1 flex flex-col min-w-0 bg-gray-50 overflow-hidden p-4 custom-scrollbar overflow-y-auto w-full">
      <main class="flex-1 overflow-y-auto p-4 md:p-6 bg-mainBg">
        <div class="space-y-4">
          <section class="bg-white rounded-xl border border-gray-200 p-5">
            <div class="text-sm font-semibold text-gray-700 mb-4">搜索</div>
            <div class="grid grid-cols-6 gap-4">
              <div>
                <label class="block text-xs text-gray-500 mb-2">用户类型</label>
                <select v-model="form.userType" class="h-9 w-full rounded-md border border-gray-200 bg-white px-3 text-xs text-gray-700 outline-none focus:border-[#C19B5E] focus:ring-2 focus:ring-[#C19B5E]/10">
                  <option value="">-请选择-</option>
                  <option value="standard">标准</option>
                  <option value="agent">代理</option>
                  <option value="client">普通客户</option>
                </select>
              </div>
              <div>
                <label class="block text-xs text-gray-500 mb-2">操作人</label>
                <input v-model="form.operator" class="h-9 w-full rounded-md border border-gray-200 bg-white px-3 text-xs text-gray-700 outline-none focus:border-[#C19B5E] focus:ring-2 focus:ring-[#C19B5E]/10" placeholder="请输入操作人姓名" />
              </div>
              <div>
                <label class="block text-xs text-gray-500 mb-2">订单号</label>
                <input v-model="form.orderNo" class="h-9 w-full rounded-md border border-gray-200 bg-white px-3 text-xs text-gray-700 outline-none focus:border-[#C19B5E] focus:ring-2 focus:ring-[#C19B5E]/10" placeholder="请输入订单号" />
              </div>
              <div>
                <label class="block text-xs text-gray-500 mb-2">MT账号</label>
                <input v-model="form.mtAccount" class="h-9 w-full rounded-md border border-gray-200 bg-white px-3 text-xs text-gray-700 outline-none focus:border-[#C19B5E] focus:ring-2 focus:ring-[#C19B5E]/10" placeholder="请输入入金账户" />
              </div>
              <div>
                <label class="block text-xs text-gray-500 mb-2 text-red-500">MT类型</label>
                <select v-model="form.mtType" class="h-9 w-full rounded-md border border-gray-200 bg-white px-3 text-xs text-gray-700 outline-none focus:border-[#C19B5E] focus:ring-2 focus:ring-[#C19B5E]/10 text-red-500">
                  <option value="">-请选择-</option>
                  <option value="standard">标准账户</option>
                  <option value="cent">美分账户</option>
                </select>
              </div>
              <div>
                <label class="block text-xs text-gray-500 mb-2">入金方式</label>
                <select v-model="form.depositMethod" class="h-9 w-full rounded-md border border-gray-200 bg-white px-3 text-xs text-gray-700 outline-none focus:border-[#C19B5E] focus:ring-2 focus:ring-[#C19B5E]/10">
                  <option value="">-请选择-</option>
                  <option value="usdt">USDT</option>
                  <option value="aipay">AIPAY</option>
                  <option value="ugate">UGATE</option>
                </select>
              </div>
              <div>
                <label class="block text-xs text-gray-500 mb-2">审核状态</label>
                <select v-model="form.auditStatus" class="h-9 w-full rounded-md border border-gray-200 bg-white px-3 text-xs text-gray-700 outline-none focus:border-[#C19B5E] focus:ring-2 focus:ring-[#C19B5E]/10">
                  <option value="">-请选择-</option>
                  <option value="pending">待审核</option>
                  <option value="approved">已通过</option>
                  <option value="rejected">已拒绝</option>
                </select>
              </div>
              <div>
                <label class="block text-xs text-gray-500 mb-2">时间类型</label>
                <select v-model="form.timeType" class="h-9 w-full rounded-md border border-gray-200 bg-white px-3 text-xs text-gray-700 outline-none focus:border-[#C19B5E] focus:ring-2 focus:ring-[#C19B5E]/10">
                  <option value="apply">申请时间</option>
                  <option value="operate">操作时间</option>
                </select>
              </div>
              <div>
                <label class="block text-xs text-gray-500 mb-2">开始日期</label>
                <input v-model="form.startDate" class="h-9 w-full rounded-md border border-gray-200 bg-white px-3 text-xs text-gray-700 outline-none focus:border-[#C19B5E] focus:ring-2 focus:ring-[#C19B5E]/10" placeholder="开始日期" />
              </div>
              <div>
                <label class="block text-xs text-gray-500 mb-2">结束日期</label>
                <input v-model="form.endDate" class="h-9 w-full rounded-md border border-gray-200 bg-white px-3 text-xs text-gray-700 outline-none focus:border-[#C19B5E] focus:ring-2 focus:ring-[#C19B5E]/10" placeholder="结束日期" />
              </div>
              <div>
                <label class="block text-xs text-gray-500 mb-2">支付状态</label>
                <select v-model="form.payStatus" class="h-9 w-full rounded-md border border-gray-200 bg-white px-3 text-xs text-gray-700 outline-none focus:border-[#C19B5E] focus:ring-2 focus:ring-[#C19B5E]/10">
                  <option value="">-请选择-</option>
                  <option value="unpaid">待支付</option>
                  <option value="paying">支付中</option>
                  <option value="paid">支付成功</option>
                </select>
              </div>
              <div class="flex items-end gap-3">
                <button class="h-9 px-4 rounded-md bg-primary hover:bg-primaryHover text-white text-sm font-medium transition-colors" type="button" @click="handleSearch">搜索</button>
                <button class="h-9 px-4 rounded-md bg-gray-100 hover:bg-gray-200 text-gray-600 text-sm font-medium transition-colors" type="button" @click="handleReset">重置</button>
              </div>
            </div>
          </section>

          <section class="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div class="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
              <div class="flex items-center gap-3">
                <button class="inline-flex items-center px-3 py-1.5 rounded-md bg-primary text-white text-sm font-medium hover:bg-primaryHover transition-colors" type="button">
                  管理入金
                </button>
                <div class="text-xs text-gray-500">
                  入金汇总：
                  <span class="ml-2 text-red-500">统计笔数：0 笔</span>
                  <span class="ml-2 text-red-500">入金金额：合计$：0.0000</span>
                </div>
              </div>
              <button class="px-4 py-2 rounded-md bg-primary hover:bg-primaryHover text-white text-xs font-medium transition-colors" type="button">
                报表导出
              </button>
            </div>

            <div class="overflow-x-auto">
              <table class="min-w-full text-xs">
                <thead class="bg-white text-gray-500">
                  <tr class="border-b border-gray-100">
                    <th class="text-left font-medium px-5 py-4 whitespace-nowrap">MT账号</th>
                    <th class="text-left font-medium px-5 py-4 whitespace-nowrap">客户信息</th>
                    <th class="text-left font-medium px-5 py-4 whitespace-nowrap text-red-500">入金/支付金额</th>
                    <th class="text-left font-medium px-5 py-4 whitespace-nowrap">入金方式</th>
                    <th class="text-left font-medium px-5 py-4 whitespace-nowrap">审核状态</th>
                    <th class="text-left font-medium px-5 py-4 whitespace-nowrap">支付状态</th>
                    <th class="text-left font-medium px-5 py-4 whitespace-nowrap">申请/处理时间</th>
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
      </main>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'

const form = reactive({
  userType: '',
  operator: '',
  orderNo: '',
  mtAccount: '',
  mtType: '',
  depositMethod: '',
  auditStatus: '',
  timeType: 'apply',
  startDate: '',
  endDate: '',
  payStatus: '',
})

const rows = ref([])

const handleSearch = () => {}
const handleReset = () => {
  form.userType = ''
  form.operator = ''
  form.orderNo = ''
  form.mtAccount = ''
  form.mtType = ''
  form.depositMethod = ''
  form.auditStatus = ''
  form.timeType = 'apply'
  form.startDate = ''
  form.endDate = ''
  form.payStatus = ''
}
</script>
