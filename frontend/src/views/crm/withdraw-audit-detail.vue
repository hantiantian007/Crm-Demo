<template>
  <div class="flex h-full bg-mainBg overflow-hidden">
    <div class="flex-1 flex flex-col min-w-0 bg-gray-50 overflow-hidden p-4 custom-scrollbar overflow-y-auto">
      <main class="flex-1 overflow-y-auto p-4 md:p-6 bg-mainBg">
 <div class="grid grid-cols-[minmax(0,1fr)_320px] gap-5">
  <div class="space-y-4">
   <section class="bg-white rounded-xl border border-gray-200 p-5">
    <div class="text-sm font-semibold text-gray-700 mb-4">
     出金详情
    </div>
    <div class="detail-grid" id="detailGrid">
    </div>
   </section>
   <section class="bg-white rounded-xl border border-gray-200 p-5">
    <div class="text-sm font-semibold text-gray-700 mb-4">
     资金信息
    </div>
    <div class="fund-grid" id="fundGrid">
    </div>
   </section>
   <section class="bg-white rounded-xl border border-gray-200 overflow-hidden">
    <div class="px-5 py-4 border-b border-gray-100 text-sm font-semibold text-gray-700">
     入金记录
    </div>
    <div class="overflow-x-auto">
     <table class="min-w-full text-sm">
      <thead class="bg-gray-50 text-gray-500">
       <tr class="border-b border-gray-100">
        <th class="text-left font-medium px-5 py-3 whitespace-nowrap">
         订单号
        </th>
        <th class="text-left font-medium px-5 py-3 whitespace-nowrap change-highlight">
         MT类型
        </th>
        <th class="text-left font-medium px-5 py-3 whitespace-nowrap">
         MT账号
        </th>
        <th class="text-left font-medium px-5 py-3 whitespace-nowrap change-highlight">
         金额
        </th>
        <th class="text-left font-medium px-5 py-3 whitespace-nowrap">
         支付方式
        </th>
        <th class="text-left font-medium px-5 py-3 whitespace-nowrap">
         审核状态
        </th>
        <th class="text-left font-medium px-5 py-3 whitespace-nowrap">
         支付状态
        </th>
        <th class="text-left font-medium px-5 py-3 whitespace-nowrap">
         申请时间
        </th>
        <th class="text-left font-medium px-5 py-3 whitespace-nowrap">
         处理时间
        </th>
       </tr>
      </thead>
      <tbody class="divide-y divide-gray-100" id="recordBody">
      </tbody>
     </table>
    </div>
    <div class="px-5 py-4 border-t border-gray-100 flex flex-col items-center gap-3">
     <div class="flex items-center gap-2 text-xs text-gray-500">
      <button class="w-7 h-7 rounded-full border border-gray-200 text-gray-400 flex items-center justify-center">
       <i class="fa-solid fa-angle-left text-[10px]">
       </i>
      </button>
      <button class="w-7 h-7 rounded-full bg-primary text-white font-medium">
       1
      </button>
      <button class="w-7 h-7 rounded-full text-gray-500 hover:bg-gray-100">
       2
      </button>
      <button class="w-7 h-7 rounded-full text-gray-500 hover:bg-gray-100">
       3
      </button>
      <button class="w-7 h-7 rounded-full text-gray-500 hover:bg-gray-100">
       4
      </button>
      <button class="w-7 h-7 rounded-full text-gray-500 hover:bg-gray-100">
       5
      </button>
      <button class="w-7 h-7 rounded-full border border-gray-200 text-gray-400 flex items-center justify-center">
       <i class="fa-solid fa-angle-right text-[10px]">
       </i>
      </button>
     </div>
     <div class="text-xs text-gray-400">
      第1/5页，共42条记录
     </div>
    </div>
   </section>
   <section class="bg-white rounded-xl border border-gray-200 overflow-hidden">
    <div class="px-5 py-4 border-b border-gray-100 text-sm font-semibold text-gray-700">
     支付信息
    </div>
    <div class="overflow-x-auto">
     <table class="min-w-full text-sm">
      <thead class="bg-gray-50 text-gray-500">
       <tr class="border-b border-gray-100">
        <th class="text-left font-medium px-5 py-3 whitespace-nowrap">
         支付方式
        </th>
        <th class="text-left font-medium px-5 py-3 whitespace-nowrap">
         支付编号
        </th>
        <th class="text-left font-medium px-5 py-3 whitespace-nowrap">
         支付时间
        </th>
        <th class="text-left font-medium px-5 py-3 whitespace-nowrap">
         支付状态
        </th>
        <th class="text-left font-medium px-5 py-3 whitespace-nowrap">
         实际支付金额
        </th>
        <th class="text-left font-medium px-5 py-3 whitespace-nowrap">
         支付金额
        </th>
        <th class="text-left font-medium px-5 py-3 whitespace-nowrap">
         操作者
        </th>
        <th class="text-left font-medium px-5 py-3 whitespace-nowrap">
         原因
        </th>
        <th class="text-left font-medium px-5 py-3 whitespace-nowrap">
         操作
        </th>
       </tr>
      </thead>
      <tbody class="divide-y divide-gray-100" id="paymentBody">
      </tbody>
     </table>
    </div>
   </section>
  </div>
  <aside class="space-y-4">
   <section class="bg-white rounded-xl border border-gray-200 p-5">
    <div class="flex items-start justify-between mb-5">
     <div class="text-sm font-semibold text-gray-700">
      审核详情
     </div>
     <div class="stamp">
      已审核
     </div>
    </div>
    <div class="timeline" id="timeline">
    </div>
   </section>
  </aside>
 </div>
</main>

    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
</script>
