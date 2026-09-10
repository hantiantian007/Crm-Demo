<template>
  <div class="flex h-full bg-mainBg overflow-hidden">
    <div class="flex-1 flex flex-col min-w-0 bg-gray-50 overflow-hidden p-4 custom-scrollbar overflow-y-auto">
      <main class="flex-1 overflow-y-auto p-4 md:p-6 bg-mainBg">
 <div class="bg-[#F7F7F8] rounded-xl border border-gray-200 p-4 md:p-6 min-h-full">
  <div class="bg-white rounded-xl border border-gray-100 overflow-hidden">
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
        真实姓名
       </th>
       <th class="text-left font-medium px-5 py-4 whitespace-nowrap">
        邮箱
       </th>
       <th class="text-left font-medium px-5 py-4 whitespace-nowrap change-highlight">
        余额
       </th>
       <th class="text-left font-medium px-5 py-4 whitespace-nowrap change-highlight">
        净值
       </th>
       <th class="text-left font-medium px-5 py-4 whitespace-nowrap change-highlight">
        保证金
       </th>
       <th class="text-left font-medium px-5 py-4 whitespace-nowrap change-highlight">
        可用预付款
       </th>
       <th class="text-left font-medium px-5 py-4 whitespace-nowrap">
        操作
       </th>
      </tr>
     </thead>
     <tbody class="divide-y divide-gray-100">
      <tr class="hover:bg-gray-50/70">
       <td class="px-5 py-5 whitespace-nowrap text-gray-700">
        8300251
       </td>
       <td class="px-5 py-5 whitespace-nowrap">
        <div class="text-gray-600 change-highlight">
         佣金
        </div>
        <div class="text-xs text-gray-500 mt-2 change-highlight">
         佣金账户 / USD/美元
        </div>
       </td>
       <td class="px-5 py-5 whitespace-nowrap text-gray-600">
        test-b5
       </td>
       <td class="px-5 py-5 whitespace-nowrap text-gray-500">
        b8@qq.com
       </td>
       <td class="px-5 py-5 whitespace-nowrap text-gray-600 change-highlight">
        125.4012 USD/美元
       </td>
       <td class="px-5 py-5 whitespace-nowrap text-gray-600 change-highlight">
        125.4012 USD/美元
       </td>
       <td class="px-5 py-5 whitespace-nowrap text-gray-600 change-highlight">
        0.0000 USD/美元
       </td>
       <td class="px-5 py-5 whitespace-nowrap text-gray-600 change-highlight">
        125.4012 USD/美元
       </td>
       <td class="px-5 py-5 whitespace-nowrap">
        <a class="inline-flex px-4 py-1.5 rounded-md bg-primary hover:bg-primaryHover text-white text-xs font-medium transition-colors" href="client-withdraw-apply-cent-account.html?account=8300251">
         出金
        </a>
       </td>
      </tr>
      <tr class="hover:bg-gray-50/70">
       <td class="px-5 py-5 whitespace-nowrap text-gray-700">
        8100453
       </td>
       <td class="px-5 py-5 whitespace-nowrap">
        <div class="text-gray-600 standard-black">
         交易
        </div>
        <div class="text-xs text-gray-500 mt-2 standard-black">
         标准账户 / USD/美元
        </div>
       </td>
       <td class="px-5 py-5 whitespace-nowrap text-gray-600">
        test-b5
       </td>
       <td class="px-5 py-5 whitespace-nowrap text-gray-500">
        b8@qq.com
       </td>
       <td class="px-5 py-5 whitespace-nowrap text-gray-600 standard-black">
        0.00 USD/美元
       </td>
       <td class="px-5 py-5 whitespace-nowrap text-gray-600 standard-black">
        0.00 USD/美元
       </td>
       <td class="px-5 py-5 whitespace-nowrap text-gray-600 standard-black">
        0.00 USD/美元
       </td>
       <td class="px-5 py-5 whitespace-nowrap text-gray-600 standard-black">
        0.00 USD/美元
       </td>
       <td class="px-5 py-5 whitespace-nowrap">
        <button class="px-4 py-1.5 rounded-md bg-gray-100 text-gray-400 text-xs font-medium cursor-not-allowed">
         出金
        </button>
       </td>
      </tr>
      <tr class="hover:bg-gray-50/70">
       <td class="px-5 py-5 whitespace-nowrap text-gray-700">
        9900456
       </td>
       <td class="px-5 py-5 whitespace-nowrap">
        <div class="text-gray-600 change-highlight">
         交易
        </div>
        <div class="text-xs text-primary mt-2 change-highlight">
         美分账户 / USC/美分
        </div>
       </td>
       <td class="px-5 py-5 whitespace-nowrap text-gray-600">
        test-b5
       </td>
       <td class="px-5 py-5 whitespace-nowrap text-gray-500">
        b8@qq.com
       </td>
       <td class="px-5 py-5 whitespace-nowrap">
        <div class="text-gray-600 change-highlight">
         12,540.12 USC/美分
        </div>
       </td>
       <td class="px-5 py-5 whitespace-nowrap">
        <div class="text-gray-600 change-highlight">
         12,540.12 USC/美分
        </div>
       </td>
       <td class="px-5 py-5 whitespace-nowrap text-gray-600 change-highlight">
        0.00 USC/美分
       </td>
       <td class="px-5 py-5 whitespace-nowrap">
        <div class="text-gray-600 change-highlight">
         12,540.12 USC/美分
        </div>
       </td>
       <td class="px-5 py-5 whitespace-nowrap">
        <a class="inline-flex px-4 py-1.5 rounded-md bg-primary hover:bg-primaryHover text-white text-xs font-medium transition-colors" href="client-withdraw-apply-cent-account.html?account=9900456">
         出金
        </a>
       </td>
      </tr>
     </tbody>
    </table>
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
