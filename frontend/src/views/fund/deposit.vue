<template>
  <div class="flex h-full bg-mainBg overflow-hidden w-full">
    <div class="flex-1 flex flex-col min-w-0 bg-gray-50 overflow-hidden p-4 custom-scrollbar overflow-y-auto w-full">
      <main class="flex-1 overflow-y-auto p-4 md:p-6 bg-mainBg">
        <div class="bg-[#F7F7F8] rounded-xl border border-gray-200 p-4 md:p-6 min-h-full">
          <div class="bg-white rounded-xl border border-gray-100 overflow-hidden">
            <div class="px-5 py-4 border-b border-gray-100">
              <router-link class="inline-flex items-center gap-2 px-3 py-2 rounded-md bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium transition-colors" to="/crm/client-deposit-cent-account">
                <i class="fas fa-plus text-xs"></i>
                入金申请
              </router-link>
            </div>
            <div class="overflow-x-auto">
              <table class="min-w-full text-sm">
                <thead class="bg-white text-gray-500">
                  <tr class="border-b border-gray-100">
                    <th class="text-left font-medium px-5 py-4 whitespace-nowrap">
                      MT账号
                    </th>
                    <th class="text-left font-medium px-5 py-4 whitespace-nowrap change-highlight">
                      MT账户类型
                    </th>
                    <th class="text-left font-medium px-5 py-4 whitespace-nowrap">
                      订单号
                    </th>
                    <th class="text-left font-medium px-5 py-4 whitespace-nowrap change-highlight">
                      入金金额
                    </th>
                    <th class="text-left font-medium px-5 py-4 whitespace-nowrap">
                      支付金额
                    </th>
                    <th class="text-left font-medium px-5 py-4 whitespace-nowrap">
                      支付方式
                    </th>
                    <th class="text-left font-medium px-5 py-4 whitespace-nowrap">
                      状态
                    </th>
                    <th class="text-left font-medium px-5 py-4 whitespace-nowrap">
                      付款状态
                    </th>
                    <th class="text-left font-medium px-5 py-4 whitespace-nowrap">
                      时间
                    </th>
                    <th class="text-left font-medium px-5 py-4 whitespace-nowrap">
                      操作
                    </th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-gray-100">
                  <tr class="align-top hover:bg-gray-50/70">
                    <td class="px-5 py-5 whitespace-nowrap font-medium text-gray-800">
                      9900456
                    </td>
                    <td class="px-5 py-5 whitespace-nowrap text-primary font-medium change-highlight">
                      美分账户 / USC
                    </td>
                    <td class="px-5 py-5 whitespace-nowrap text-gray-600">
                      904617301918089429
                    </td>
                    <td class="px-5 py-5 whitespace-nowrap">
                      <div class="font-medium text-gray-800 change-highlight">
                        10,000 USC
                      </div>
                      <div class="text-xs text-gray-400 mt-2 change-highlight">
                        折算 100.00 USD
                      </div>
                    </td>
                    <td class="px-5 py-5 whitespace-nowrap">
                      <div class="font-medium text-gray-800">
                        100.00 USD
                      </div>
                      <div class="text-xs text-gray-400 mt-2">
                        汇率 1.0000
                      </div>
                    </td>
                    <td class="px-5 py-5 whitespace-nowrap text-gray-600">
                      crm
                    </td>
                    <td class="px-5 py-5 whitespace-nowrap text-gray-600">
                      已审核
                    </td>
                    <td class="px-5 py-5 whitespace-nowrap text-gray-600">
                      支付成功
                    </td>
                    <td class="px-5 py-5 whitespace-nowrap text-gray-500">
                      2026-07-31 14:34:19
                    </td>
                    <td class="px-5 py-5 whitespace-nowrap">
                      <button class="px-3 py-1.5 rounded-md bg-blue-500 text-white hover:bg-blue-600 text-xs font-medium transition-colors">
                        查看详情
                      </button>
                    </td>
                  </tr>
                  <tr class="align-top hover:bg-gray-50/70">
                    <td class="px-5 py-5 whitespace-nowrap font-medium text-gray-800">
                      8800123
                    </td>
                    <td class="px-5 py-5 whitespace-nowrap text-gray-500 font-medium change-highlight">
                      标准账户 / USD
                    </td>
                    <td class="px-5 py-5 whitespace-nowrap text-gray-600">
                      904617301918089430
                    </td>
                    <td class="px-5 py-5 whitespace-nowrap">
                      <div class="font-medium text-gray-800 change-highlight">
                        100.00 USD
                      </div>
                    </td>
                    <td class="px-5 py-5 whitespace-nowrap">
                      <div class="font-medium text-gray-800">
                        100.00 USD
                      </div>
                      <div class="text-xs text-gray-400 mt-2">
                        汇率 1.0000
                      </div>
                    </td>
                    <td class="px-5 py-5 whitespace-nowrap text-gray-600">
                      MAXPAY(USDT)
                    </td>
                    <td class="px-5 py-5 whitespace-nowrap text-gray-600">
                      处理中
                    </td>
                    <td class="px-5 py-5 whitespace-nowrap text-gray-600">
                      待支付
                    </td>
                    <td class="px-5 py-5 whitespace-nowrap text-gray-500">
                      2026-07-31 13:11:06
                    </td>
                    <td class="px-5 py-5 whitespace-nowrap">
                      <button class="px-3 py-1.5 rounded-md bg-blue-500 text-white hover:bg-blue-600 text-xs font-medium transition-colors">
                        查看详情
                      </button>
                    </td>
                  </tr>
                  <tr class="align-top hover:bg-gray-50/70">
                    <td class="px-5 py-5 whitespace-nowrap font-medium text-gray-800">
                      9900668
                    </td>
                    <td class="px-5 py-5 whitespace-nowrap text-primary font-medium change-highlight">
                      美分账户 / USC
                    </td>
                    <td class="px-5 py-5 whitespace-nowrap text-gray-600">
                      904617301918089431
                    </td>
                    <td class="px-5 py-5 whitespace-nowrap">
                      <div class="font-medium text-gray-800 change-highlight">
                        25,000 USC
                      </div>
                      <div class="text-xs text-gray-400 mt-2 change-highlight">
                        折算 250.00 USD
                      </div>
                    </td>
                    <td class="px-5 py-5 whitespace-nowrap">
                      <div class="font-medium text-gray-800 change-highlight">
                        1,795.00 CNY
                      </div>
                      <div class="text-xs text-gray-400 mt-2 change-highlight">
                        汇率 7.1800
                      </div>
                    </td>
                    <td class="px-5 py-5 whitespace-nowrap text-gray-600">
                      UGATE
                    </td>
                    <td class="px-5 py-5 whitespace-nowrap text-gray-600">
                      已审核
                    </td>
                    <td class="px-5 py-5 whitespace-nowrap text-gray-600">
                      支付成功
                    </td>
                    <td class="px-5 py-5 whitespace-nowrap text-gray-500">
                      2026-07-30 18:42:51
                    </td>
                    <td class="px-5 py-5 whitespace-nowrap">
                      <button class="px-3 py-1.5 rounded-md bg-blue-500 text-white hover:bg-blue-600 text-xs font-medium transition-colors">
                        查看详情
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="px-5 py-4 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
              <div>
                15条 / 页&nbsp;&nbsp; 1/1页
              </div>
              <div class="flex items-center gap-2">
                <button class="w-8 h-8 rounded border border-gray-200 bg-white text-gray-300 cursor-not-allowed">
                  <i class="fas fa-angle-left"></i>
                </button>
                <button class="w-8 h-8 rounded border border-primary bg-primary text-white">
                  1
                </button>
                <button class="w-8 h-8 rounded border border-gray-200 bg-white text-gray-300 cursor-not-allowed">
                  <i class="fas fa-angle-right"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
</script>

<style scoped>
.change-highlight {
  color: #DC2626 !important;
}
</style>
