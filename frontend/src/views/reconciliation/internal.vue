<template>
  <div class="flex h-full bg-mainBg overflow-hidden">
    <div class="flex-1 flex flex-col min-w-0 bg-gray-50 overflow-hidden p-4 custom-scrollbar overflow-y-auto">
      <div class="flex-1 overflow-y-auto p-6 space-y-6">
 <!-- 提示信息 -->
 <div class="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-r shadow-sm">
  <div class="flex">
   <div class="flex-shrink-0">
    <i class="fa-solid fa-circle-info text-blue-400">
    </i>
   </div>
   <div class="ml-3">
    <p class="text-sm text-blue-700">
     <strong>
      对账逻辑 (做减法)：
     </strong>
     当前为 T+1 自动对账模式。系统自动对比昨日 CRM 系统成功流水与 MT4/MT5 底层资金变动。完全匹配的数据已自动归档，本页面仅展示存在差异（异常）的数据供人工排查。本页面仅作数据记录，不做任何单据状态修改。
    </p>
   </div>
  </div>
 </div>
 <!-- 核心数据对比卡片 -->
 <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
  <!-- CRM 理论值 -->
  <div class="bg-white rounded-xl p-6 card-shadow border border-gray-100">
   <div class="flex items-center justify-between mb-4">
    <h3 class="text-gray-500 font-medium text-sm">
     <i class="fa-solid fa-book text-gray-400 mr-2">
     </i>
     昨日 CRM 理论账本
    </h3>
   </div>
   <div class="space-y-3">
    <div class="flex flex-col space-y-1">
     <div class="flex justify-between">
      <span class="text-gray-800 font-bold text-sm">
       总入金 (成功)
      </span>
      <span class="text-gray-800 font-bold font-mono">
       $ 1,234,567.8900
      </span>
     </div>
     <div class="flex justify-between pl-3 border-l-2 border-primaryColor/30">
      <span class="text-gray-500 text-xs">
       真实支付 (通道)
      </span>
      <span class="text-gray-500 text-xs font-mono">
       $ 1,000,000.0000
      </span>
     </div>
     <div class="flex justify-between pl-3 border-l-2 border-primaryColor/30">
      <span class="text-gray-500 text-xs">
       内转转入
      </span>
      <span class="text-gray-500 text-xs font-mono">
       $ 200,000.0000
      </span>
     </div>
     <div class="flex justify-between pl-3 border-l-2 border-primaryColor/30">
      <span class="text-gray-500 text-xs">
       后台人工入金
      </span>
      <span class="text-gray-500 text-xs font-mono">
       $ 34,567.8900
      </span>
     </div>
    </div>
    <div class="flex flex-col space-y-1 mt-4">
     <div class="flex justify-between">
      <span class="text-gray-800 font-bold text-sm">
       总出金 (成功)
      </span>
      <span class="text-gray-800 font-bold font-mono">
       $ 234,567.8900
      </span>
     </div>
     <div class="flex justify-between pl-3 border-l-2 border-primaryColor/30">
      <span class="text-gray-500 text-xs">
       真实支付 (提现)
      </span>
      <span class="text-gray-500 text-xs font-mono">
       $ 100,000.0000
      </span>
     </div>
     <div class="flex justify-between pl-3 border-l-2 border-primaryColor/30">
      <span class="text-gray-500 text-xs">
       内转转出
      </span>
      <span class="text-gray-500 text-xs font-mono">
       $ 100,000.0000
      </span>
     </div>
     <div class="flex justify-between pl-3 border-l-2 border-primaryColor/30">
      <span class="text-gray-500 text-xs">
       后台人工扣款
      </span>
      <span class="text-gray-500 text-xs font-mono">
       $ 34,567.8900
      </span>
     </div>
    </div>
    <div class="flex justify-between border-t border-dashed border-gray-200 pt-3 mt-4">
     <span class="text-gray-800 font-bold text-sm">
      净入金
     </span>
     <span class="text-green-600 font-bold font-mono">
      $ 1,000,000.0000
     </span>
    </div>
   </div>
  </div>
  <!-- MT 实际值 -->
  <div class="bg-white rounded-xl p-6 card-shadow border border-gray-100">
   <div class="flex items-center justify-between mb-4">
    <h3 class="text-gray-500 font-medium text-sm">
     <i class="fa-solid fa-server text-gray-400 mr-2">
     </i>
     昨日 MT 实际资金 (Balance)
    </h3>
   </div>
   <div class="space-y-3">
    <div class="flex justify-between">
     <span class="text-gray-500 text-sm">
      总 Deposit
     </span>
     <span class="text-gray-800 font-bold font-mono">
      $ 1,235,567.8900
     </span>
    </div>
    <div class="flex justify-between">
     <span class="text-gray-500 text-sm">
      总 Withdrawal
     </span>
     <span class="text-gray-800 font-bold font-mono">
      $ 234,567.8900
     </span>
    </div>
    <div class="flex justify-between border-t border-dashed pt-2">
     <span class="text-gray-500 text-sm">
      净变动
     </span>
     <span class="text-green-600 font-bold font-mono">
      $ 1,001,000.0000
     </span>
    </div>
   </div>
  </div>
 </div>
 <!-- 差异明细列表 -->
 <div class="bg-white rounded-xl card-shadow border border-gray-100 flex flex-col">
  <div class="p-5 border-b border-gray-100 flex justify-between items-center">
   <h2 class="text-lg font-bold text-gray-800">
    差异账号清单
   </h2>
   <div class="flex space-x-3">
    <!-- 搜索与筛选可以放在这里 -->
   </div>
  </div>
  <div class="overflow-x-auto no-scrollbar">
   <table class="w-full text-left border-collapse">
    <thead>
     <tr class="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider">
      <th class="px-6 py-4 font-medium">
       交易账号
      </th>
      <th class="px-6 py-4 font-medium">
       CRM 记录总额
      </th>
      <th class="px-6 py-4 font-medium">
       MT 实际变动
      </th>
      <th class="px-6 py-4 font-medium">
       差异金额
      </th>
      <th class="px-6 py-4 font-medium">
       差异类型
      </th>
     </tr>
    </thead>
    <tbody class="text-sm divide-y divide-gray-100">
     <tr class="hover:bg-gray-50 transition-colors">
      <td class="px-6 py-4 font-mono font-bold text-gray-800">
       88001234
      </td>
      <td class="px-6 py-4 font-mono text-gray-600">
       <div class="font-bold">
        $ 1,000.0000
       </div>
       <div class="text-[11px] text-gray-400">
        真实支付(通道)
       </div>
      </td>
      <td class="px-6 py-4 font-mono text-gray-600">
       <div class="font-bold">
        $ 0.0000
       </div>
       <div class="text-[11px] text-gray-400">
        -
       </div>
      </td>
      <td class="px-6 py-4 font-mono text-red-500 font-bold">
       -$ 1,000.0000
      </td>
      <td class="px-6 py-4">
       <span class="px-2 py-1 bg-red-100 text-red-700 rounded text-xs">
        CRM有, MT无 (掉单)
       </span>
      </td>
     </tr>
     <tr class="hover:bg-gray-50 transition-colors">
      <td class="px-6 py-4 font-mono font-bold text-gray-800">
       88009988
      </td>
      <td class="px-6 py-4 font-mono text-gray-600">
       <div class="font-bold">
        $ 0.0000
       </div>
       <div class="text-[11px] text-gray-400">
        未知(单边账)
       </div>
      </td>
      <td class="px-6 py-4 font-mono text-gray-600">
       <div class="font-bold">
        $ 500.0000
       </div>
      </td>
      <td class="px-6 py-4 font-mono text-orange-500 font-bold">
       +$ 500.0000
      </td>
      <td class="px-6 py-4">
       <span class="px-2 py-1 bg-orange-100 text-orange-700 rounded text-xs">
        MT有, CRM无 (单边账)
       </span>
      </td>
     </tr>
    </tbody>
   </table>
  </div>
  <div class="p-4 border-t border-gray-100 flex justify-between items-center text-sm text-gray-500">
   <span>
    共发现 2 条异常记录
   </span>
  </div>
 </div>
</div>

    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
</script>
