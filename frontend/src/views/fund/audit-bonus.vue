<template>
  <div class="flex h-full bg-mainBg overflow-hidden w-full">
    <div class="flex-1 flex flex-col min-w-0 bg-gray-50 overflow-hidden p-4 custom-scrollbar overflow-y-auto w-full">
      <main class="flex-1 overflow-y-auto p-4 md:p-6 bg-mainBg">
        <div class="space-y-4">
          <section class="bg-white rounded-xl border border-gray-200 p-5">
            <div class="text-sm font-semibold text-gray-700 mb-4">搜索</div>
            <div class="grid grid-cols-6 gap-4">
              <div class="col-span-2">
                <label class="block text-xs text-gray-500 mb-2">MT账号</label>
                <input v-model="form.mtAccount" class="h-9 w-full rounded-md border border-gray-200 bg-white px-3 text-xs text-gray-700 outline-none focus:border-[#C19B5E] focus:ring-2 focus:ring-[#C19B5E]/10" placeholder="请输入 MT 账号" />
              </div>
              <div class="col-span-2">
                <label class="block text-xs text-gray-500 mb-2">赠金状态</label>
                <select v-model="form.status" class="h-9 w-full rounded-md border border-gray-200 bg-white px-3 text-xs text-gray-700 outline-none focus:border-[#C19B5E] focus:ring-2 focus:ring-[#C19B5E]/10">
                  <option value="">-请选择-</option>
                  <option value="pending">待审核</option>
                  <option value="approved">已通过</option>
                  <option value="rejected">已拒绝</option>
                </select>
              </div>
              <div class="col-span-2">
                <label class="block text-xs text-gray-500 mb-2">规则名称</label>
                <input v-model="form.rule" class="h-9 w-full rounded-md border border-gray-200 bg-white px-3 text-xs text-gray-700 outline-none focus:border-[#C19B5E] focus:ring-2 focus:ring-[#C19B5E]/10" placeholder="请输入规则名称" />
              </div>
              <div class="col-span-2">
                <label class="block text-xs text-gray-500 mb-2">开始日期</label>
                <input v-model="form.startDate" class="h-9 w-full rounded-md border border-gray-200 bg-white px-3 text-xs text-gray-700 outline-none focus:border-[#C19B5E] focus:ring-2 focus:ring-[#C19B5E]/10" placeholder="开始日期" />
              </div>
              <div class="col-span-2">
                <label class="block text-xs text-gray-500 mb-2">结束日期</label>
                <input v-model="form.endDate" class="h-9 w-full rounded-md border border-gray-200 bg-white px-3 text-xs text-gray-700 outline-none focus:border-[#C19B5E] focus:ring-2 focus:ring-[#C19B5E]/10" placeholder="结束日期" />
              </div>
              <div class="col-span-2 flex items-end gap-3">
                <button class="h-9 px-4 rounded-md bg-primary hover:bg-primaryHover text-white text-sm font-medium transition-colors" type="button" @click="handleSearch">搜索</button>
                <button class="h-9 px-4 rounded-md bg-gray-100 hover:bg-gray-200 text-gray-600 text-sm font-medium transition-colors" type="button" @click="handleReset">重置</button>
              </div>
            </div>
          </section>

          <section class="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div class="overflow-x-auto">
              <table class="min-w-full text-xs">
                <thead class="bg-white text-gray-500">
                  <tr class="border-b border-gray-100">
                    <th class="text-left font-medium px-5 py-4 whitespace-nowrap">编号</th>
                    <th class="text-left font-medium px-5 py-4 whitespace-nowrap">MT账号</th>
                    <th class="text-left font-medium px-5 py-4 whitespace-nowrap">规则</th>
                    <th class="text-left font-medium px-5 py-4 whitespace-nowrap text-red-500">入金金额($)</th>
                    <th class="text-left font-medium px-5 py-4 whitespace-nowrap text-red-500">赠金金额($)</th>
                    <th class="text-left font-medium px-5 py-4 whitespace-nowrap">可提现($)</th>
                    <th class="text-left font-medium px-5 py-4 whitespace-nowrap">状态</th>
                    <th class="text-left font-medium px-5 py-4 whitespace-nowrap">申请时间</th>
                    <th class="text-left font-medium px-5 py-4 whitespace-nowrap">客服审核</th>
                    <th class="text-left font-medium px-5 py-4 whitespace-nowrap">财务审核</th>
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
  mtAccount: '',
  status: '',
  rule: '',
  startDate: '',
  endDate: '',
})

const rows = ref([])

const handleSearch = () => {}
const handleReset = () => {
  form.mtAccount = ''
  form.status = ''
  form.rule = ''
  form.startDate = ''
  form.endDate = ''
}
</script>
