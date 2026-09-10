<template>
  <div class="flex h-full bg-mainBg overflow-hidden">
    <div class="flex-1 flex flex-col min-w-0 bg-gray-50 overflow-hidden p-4 custom-scrollbar overflow-y-auto">
      <main class="flex-1 overflow-y-auto p-4 md:p-6 bg-mainBg">
 <div class="bg-[#F7F7F8] rounded-xl border border-gray-200 p-4 md:p-6 min-h-full">
  <div class="bg-white rounded-xl border border-gray-100 overflow-hidden">
   <div class="px-5 py-4 border-b border-gray-100">
    <a class="inline-flex items-center gap-2 px-3 py-2 rounded-md bg-primary hover:bg-primaryHover text-white text-sm font-medium transition-colors" href="client-withdraw-cent-account.html">
     <i class="fas fa-plus text-xs">
     </i>
     出金申请
    </a>
   </div>
   <div class="overflow-x-auto">
    <table class="min-w-full text-sm">
     <thead class="bg-white text-gray-500">
      <tr class="border-b border-gray-100">
       <th class="text-left font-medium px-5 py-4 whitespace-nowrap">
        MT账号
       </th>
       <th class="text-left font-medium px-5 py-4 whitespace-nowrap change-highlight">
        账户类型
       </th>
       <th class="text-left font-medium px-5 py-4 whitespace-nowrap">
        订单号
       </th>
       <th class="text-left font-medium px-5 py-4 whitespace-nowrap change-highlight">
        出金金额
       </th>
       <th class="text-left font-medium px-5 py-4 whitespace-nowrap change-highlight">
        到账金额
       </th>
       <th class="text-left font-medium px-5 py-4 whitespace-nowrap change-highlight">
        汇率
       </th>
       <th class="text-left font-medium px-5 py-4 whitespace-nowrap">
        支付方式
       </th>
       <th class="text-left font-medium px-5 py-4 whitespace-nowrap">
        申请时间
       </th>
       <th class="text-left font-medium px-5 py-4 whitespace-nowrap">
        状态
       </th>
       <th class="text-left font-medium px-5 py-4 whitespace-nowrap">
        付款状态
       </th>
       <th class="text-left font-medium px-5 py-4 whitespace-nowrap">
        操作
       </th>
      </tr>
     </thead>
     <tbody class="divide-y divide-gray-100">
      <tr class="align-top hover:bg-gray-50/70">
       <td class="px-5 py-5 whitespace-nowrap font-medium text-gray-800">
        8100453
       </td>
       <td class="px-5 py-5 whitespace-nowrap text-gray-500 change-highlight">
        标准账户
       </td>
       <td class="px-5 py-5 whitespace-nowrap text-gray-600">
        OUT_923832107870979672
       </td>
       <td class="px-5 py-5 whitespace-nowrap">
        <div class="font-medium text-gray-800 change-highlight">
         $1,233.00
        </div>
       </td>
       <td class="px-5 py-5 whitespace-nowrap">
        <div class="font-medium text-gray-800 change-highlight">
         $1,233.00
        </div>
       </td>
       <td class="px-5 py-5 whitespace-nowrap text-gray-600 change-highlight">
        1.00000
       </td>
       <td class="px-5 py-5 whitespace-nowrap text-gray-600">
        maxpay-usdt
       </td>
       <td class="px-5 py-5 whitespace-nowrap text-gray-500">
        2026-07-31 15:07:06
       </td>
       <td class="px-5 py-5 whitespace-nowrap text-gray-600">
        会签审核
       </td>
       <td class="px-5 py-5 whitespace-nowrap text-gray-600">
        待支付
       </td>
       <td class="px-5 py-5 whitespace-nowrap">
        <button class="px-2 py-1 rounded text-[12px] font-medium text-[#FF4D4F] border border-[#FFB3B6] bg-[#FFF1F0] hover:bg-[#FFE5E5] transition-colors text-red-500 hover:text-red-700">
         取消
        </button>
       </td>
      </tr>
      <tr class="align-top hover:bg-gray-50/70">
       <td class="px-5 py-5 whitespace-nowrap font-medium text-gray-800">
        9900456
       </td>
       <td class="px-5 py-5 whitespace-nowrap text-primary change-highlight">
        美分账户
       </td>
       <td class="px-5 py-5 whitespace-nowrap text-gray-600 change-highlight">
        OUT_923832107870979699
       </td>
       <td class="px-5 py-5 whitespace-nowrap">
        <div class="font-medium text-gray-800 change-highlight">
         $125.00
        </div>
       </td>
       <td class="px-5 py-5 whitespace-nowrap">
        <div class="font-medium text-gray-800 change-highlight">
         $125.00
        </div>
       </td>
       <td class="px-5 py-5 whitespace-nowrap text-gray-600 change-highlight">
        1.00000
       </td>
       <td class="px-5 py-5 whitespace-nowrap text-gray-600">
        maxpay-usdt
       </td>
       <td class="px-5 py-5 whitespace-nowrap text-gray-500 change-highlight">
        2026-07-31 16:22:18
       </td>
       <td class="px-5 py-5 whitespace-nowrap text-gray-600">
        会签审核
       </td>
       <td class="px-5 py-5 whitespace-nowrap text-gray-600">
        待支付
       </td>
       <td class="px-5 py-5 whitespace-nowrap">
        <button class="px-2 py-1 rounded text-[12px] font-medium text-[#FF4D4F] border border-[#FFB3B6] bg-[#FFF1F0] hover:bg-[#FFE5E5] transition-colors text-red-500 hover:text-red-700">
         取消
        </button>
       </td>
      </tr>
     </tbody>
    </table>
   </div>
   <div class="px-5 py-4 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
    <div>
     15条 / 页   1记录，第 1/1页
    </div>
    <div class="flex items-center gap-2">
     <button class="w-8 h-8 rounded border border-gray-200 bg-white text-gray-300 cursor-not-allowed">
      <i class="fas fa-angle-left">
      </i>
     </button>
     <button class="w-8 h-8 rounded border border-primary bg-primary text-white">
      1
     </button>
     <button class="w-8 h-8 rounded border border-gray-200 bg-white text-gray-300 cursor-not-allowed">
      <i class="fas fa-angle-right">
      </i>
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
