<template>
  <div class="flex h-full bg-mainBg overflow-hidden">
    <div class="flex-1 flex flex-col min-w-0 bg-gray-50 overflow-hidden p-4 custom-scrollbar overflow-y-auto">
      <div class="flex-1 p-6 overflow-y-auto bg-white m-4 rounded-lg shadow-sm border border-gray-100 flex flex-col">
 <div class="mb-5 flex items-center gap-3">
  <h1 class="text-xl font-bold text-gray-800">
   交易品种持仓明细
  </h1>
  <span class="inline-block px-3 py-1 bg-[#CCFBF1] text-[#0F766E] rounded font-bold" id="symBadge">
   XAUUSD
  </span>
 </div>
 <div class="mb-6 bg-gray-50 p-5 rounded-lg border border-gray-200">
  <div class="flex flex-wrap items-center gap-x-5 gap-y-4">
   <div class="flex items-center bg-white border border-gray-200 rounded-md h-9 overflow-hidden flex-shrink-0">
    <span class="bg-gray-100 text-gray-600 text-sm px-3 h-full flex items-center border-r border-gray-200 w-[92px] flex-shrink-0">
     MT 账号
    </span>
    <input class="px-3 py-1.5 text-sm outline-none w-[140px] h-full" placeholder="请输入MT账号" type="text"/>
   </div>
   <div class="flex items-center bg-white border border-gray-200 rounded-md h-9 overflow-hidden flex-shrink-0">
    <span class="bg-gray-100 text-gray-600 text-sm px-3 h-full flex items-center border-r border-gray-200 w-[92px] flex-shrink-0">
     账户名称
    </span>
    <input class="px-3 py-1.5 text-sm outline-none w-[140px] h-full" placeholder="请输入账户名称" type="text"/>
   </div>
   <div class="flex items-center bg-white border border-gray-200 rounded-md h-9 overflow-hidden flex-shrink-0">
    <span class="bg-gray-100 text-gray-600 text-sm px-3 h-full flex items-center border-r border-gray-200 w-[92px] flex-shrink-0">
     账号类型
    </span>
    <select class="px-3 py-1.5 text-sm outline-none text-gray-600 bg-white w-[140px] h-full cursor-pointer">
     <option value="">
      全部
     </option>
     <option>
      标准账号
     </option>
     <option>
      美分账号
     </option>
    </select>
   </div>
   <div class="flex items-center bg-white border border-gray-200 rounded-md h-9 overflow-hidden flex-shrink-0">
    <span class="bg-gray-100 text-gray-600 text-sm px-3 h-full flex items-center border-r border-gray-200 w-[92px] flex-shrink-0">
     多空方向
    </span>
    <select class="px-3 py-1.5 text-sm outline-none text-gray-600 bg-white w-[140px] h-full cursor-pointer">
     <option value="">
      全部
     </option>
     <option>
      BUY 多单
     </option>
     <option>
      SELL 空单
     </option>
    </select>
   </div>
   <div class="flex items-center bg-white border border-gray-200 rounded-md h-9 overflow-hidden flex-shrink-0">
    <span class="bg-gray-100 text-gray-600 text-sm px-3 h-full flex items-center border-r border-gray-200 w-[92px] flex-shrink-0">
     关系树
    </span>
    <select class="px-3 py-1.5 text-sm outline-none text-gray-500 bg-white w-[140px] h-full cursor-pointer">
     <option value="">
      请选择
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
  <table class="min-w-[1500px] custom-table text-sm">
   <thead class="bg-tableHeader sticky top-0 z-10">
    <tr>
     <th class="min-w-[80px]">
      编号
     </th>
     <th class="min-w-[140px]">
      MT 账号
     </th>
     <th class="min-w-[160px]">
      账户名称
     </th>
     <th class="min-w-[120px]">
      MT账号类型
     </th>
     <th class="min-w-[140px]">
      MT账号净值(USD)
     </th>
     <th class="min-w-[110px]">
      多空方向
     </th>
     <th class="min-w-[110px]">
      手数
     </th>
     <th class="min-w-[150px]">
      开仓均价
     </th>
     <th class="min-w-[160px]">
      浮动盈亏(USD)
     </th>
     <th class="min-w-[140px]">
      开仓时间
     </th>
    </tr>
   </thead>
   <tbody id="detailTbody">
   </tbody>
  </table>
 </div>
 <div class="flex items-center justify-between mt-4 text-sm text-gray-500">
  <div class="ml-2 bg-[#F0FDFA] border border-[#5EEAD4] rounded px-4 py-2 text-[#0F766E] text-xs flex items-center gap-6">
   <div>
    <span class="opacity-80">
     持仓账号数：
    </span>
    <span class="font-bold">
     27
    </span>
   </div>
   <div>
    <span class="opacity-80">
     BUY 手数汇总：
    </span>
    <span class="font-bold">
     70.00
    </span>
   </div>
   <div>
    <span class="opacity-80">
     SELL 手数汇总：
    </span>
    <span class="font-bold">
     71.50
    </span>
   </div>
   <div>
    <span class="opacity-80">
     净头寸汇总(手)：
    </span>
    <span class="font-bold">
     -1.50
    </span>
   </div>
   <div>
    <span class="opacity-80">
     浮动盈亏汇总(USD)：
    </span>
    <span class="font-bold text-[#DC2626]">
     -13,979.28
    </span>
   </div>
  </div>
  <div class="flex items-center">
   <span class="mr-4">
    共 28 条
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
    <button class="w-8 h-8 flex items-center justify-center rounded hover:bg-gray-100">
     4
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
  </div>
</template>

<script setup>
import { ref } from 'vue'
</script>
