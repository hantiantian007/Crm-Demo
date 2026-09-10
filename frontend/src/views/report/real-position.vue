<template>
  <div class="flex h-full bg-mainBg overflow-hidden">
    <div class="flex-1 flex flex-col min-w-0 bg-gray-50 overflow-hidden p-4 custom-scrollbar overflow-y-auto">
      <div class="flex-1 p-6 overflow-y-auto bg-white m-4 rounded-lg shadow-sm border border-gray-100 flex flex-col">
 <div class="mb-6 bg-gray-50 p-5 rounded-lg border border-gray-200">
  <div class="flex flex-wrap items-center gap-x-5 gap-y-4">
   <div class="flex items-center bg-white border border-gray-200 rounded-md h-9 overflow-hidden flex-shrink-0">
    <span class="bg-gray-100 text-gray-600 text-sm px-3 h-full flex items-center border-r border-gray-200 w-[92px] flex-shrink-0">
     交易品种
    </span>
    <select class="px-3 py-1.5 text-sm outline-none text-gray-600 bg-white w-[140px] h-full cursor-pointer">
     <option value="">
      全部
     </option>
    </select>
   </div>
   <div class="ml-auto flex items-center gap-3 h-9">
    <button class="bg-primaryBtn hover:bg-primaryBtnHover text-white px-7 h-full rounded-md text-sm transition-colors shadow-sm font-medium">
     查询
    </button>
    <button class="bg-[#41B8AF] hover:bg-[#359f97] text-white px-7 h-full rounded-md text-sm transition-colors shadow-sm font-medium">
     导出
    </button>
   </div>
  </div>
 </div>
 <div class="flex-1 overflow-auto border border-gray-200 rounded">
  <table class="min-w-[1050px] w-full custom-table text-sm">
   <thead class="bg-tableHeader sticky top-0 z-10">
    <tr>
     <th class="min-w-[120px]">
      交易品种
     </th>
     <th class="min-w-[140px]">
      净头寸(手)
      <br/>
      <span class="text-[11px] opacity-80 font-normal">
       买入 − 卖出
      </span>
     </th>
     <th class="min-w-[220px]">
      浮动盈亏(USD)
     </th>
     <th class="min-w-[130px]">
      笔数
      <br/>
      <span class="text-[11px] opacity-80 font-normal">
       BUY / SELL
      </span>
     </th>
     <th class="min-w-[180px]">
      买入 / 价格
      <br/>
      <span class="text-[11px] opacity-80 font-normal">
       手数 / 平均价
      </span>
     </th>
     <th class="min-w-[180px]">
      卖出 / 价格
      <br/>
      <span class="text-[11px] opacity-80 font-normal">
       手数 / 平均价
      </span>
     </th>
    </tr>
   </thead>
   <tbody id="positionTbody">
   </tbody>
  </table>
 </div>
 <div class="flex items-center justify-end mt-4 text-sm text-gray-500">
  <span class="mr-4">
   共 20 条
  </span>
  <div class="flex items-center gap-1">
   <button class="w-8 h-8 flex items-center justify-center rounded hover:bg-gray-100 text-gray-400">
    <i class="fa-solid fa-chevron-left text-xs">
    </i>
   </button>
   <button class="w-8 h-8 flex items-center justify-center rounded bg-red-100 text-red-500 font-medium">
    1
   </button>
   <button class="w-8 h-8 flex items-center justify-center rounded hover:bg-gray-100">
    2
   </button>
   <button class="w-8 h-8 flex items-center justify-center rounded hover:bg-gray-100">
    3
   </button>
   <button class="w-8 h-8 flex items-center justify-center rounded hover:bg-gray-100 text-gray-400">
    <i class="fa-solid fa-chevron-right text-xs">
    </i>
   </button>
  </div>
 </div>
</div>

    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
</script>
