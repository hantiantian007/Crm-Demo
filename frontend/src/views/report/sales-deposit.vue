<template>
  <div class="flex h-full bg-mainBg overflow-hidden">
    <div class="flex-1 flex flex-col min-w-0 bg-gray-50 overflow-hidden p-4 custom-scrollbar overflow-y-auto">
      <div class="flex-1 p-6 overflow-y-auto bg-white m-4 rounded-lg shadow-sm border border-gray-100 flex flex-col">
 <!-- 1. 顶部搜索过滤区 -->
 <div class="flex flex-col gap-4 mb-6 bg-gray-50 p-4 rounded border border-gray-100">
  <!-- 第一行查询条件 -->
  <div class="flex flex-wrap items-center gap-4 w-full">
   <!-- 销售姓名 -->
   <div class="flex items-center bg-white border border-gray-200 rounded overflow-hidden">
    <span class="bg-gray-50 text-gray-600 text-sm px-3 py-1.5 border-r border-gray-200">
     销售姓名:
    </span>
    <input class="px-3 py-1.5 text-sm outline-none w-32 focus:bg-blue-50/30" placeholder="请输入活动名称" type="text"/>
   </div>
   <!-- 销售邮箱 -->
   <div class="flex items-center bg-white border border-gray-200 rounded overflow-hidden">
    <span class="bg-gray-50 text-gray-600 text-sm px-3 py-1.5 border-r border-gray-200">
     销售邮箱:
    </span>
    <input class="px-3 py-1.5 text-sm outline-none w-32" placeholder="请输入活动名称" type="text"/>
   </div>
   <!-- 客户邮箱 -->
   <div class="flex items-center bg-white border border-gray-200 rounded overflow-hidden">
    <span class="bg-gray-50 text-gray-600 text-sm px-3 py-1.5 border-r border-gray-200">
     客户邮箱:
    </span>
    <input class="px-3 py-1.5 text-sm outline-none w-32" placeholder="请输入活动名称" type="text"/>
   </div>
   <!-- 客户姓名 -->
   <div class="flex items-center bg-white border border-gray-200 rounded overflow-hidden">
    <span class="bg-gray-50 text-gray-600 text-sm px-3 py-1.5 border-r border-gray-200">
     客户姓名:
    </span>
    <input class="px-3 py-1.5 text-sm outline-none w-32" placeholder="请输入活动名称" type="text"/>
   </div>
   <!-- 奖励状态 -->
   <div class="flex items-center bg-white border border-gray-200 rounded overflow-hidden">
    <span class="bg-gray-50 text-gray-600 text-sm px-3 py-1.5 border-r border-gray-200">
     奖励状态:
    </span>
    <select class="px-3 py-1.5 text-sm outline-none text-gray-500 bg-white w-32 cursor-pointer">
     <option value="">
      全部
     </option>
     <option value="待计算">
      待计算
     </option>
     <option value="待入账">
      待入账
     </option>
     <option value="已入账">
      已入账
     </option>
     <option value="奖励失败">
      奖励失败
     </option>
    </select>
   </div>
   <!-- 奖励周期 -->
   <div class="flex items-center bg-white border border-gray-200 rounded overflow-hidden">
    <span class="bg-gray-50 text-gray-600 text-sm px-3 py-1.5 border-r border-gray-200">
     奖励周期:
    </span>
    <select class="px-3 py-1.5 text-sm outline-none text-gray-500 bg-white w-32 cursor-pointer">
     <option value="">
      全部
     </option>
     <option value="每月最后一日">
      每月最后一日
     </option>
     <option value="每季度最后一日">
      每季度最后一日
     </option>
    </select>
   </div>
   <!-- 奖励时间 -->
   <div class="flex items-center bg-white border border-gray-200 rounded overflow-hidden">
    <span class="bg-gray-50 text-gray-600 text-sm px-3 py-1.5 border-r border-gray-200">
     奖励时间:
    </span>
    <input class="px-3 py-1.5 text-sm outline-none w-48 text-gray-400" placeholder="开始日期 - 结束日期" type="text"/>
   </div>
   <!-- 按钮区 -->
   <div class="ml-auto flex items-center gap-2">
    <button class="bg-primaryBtn hover:bg-primaryBtnHover text-white px-6 py-1.5 rounded text-sm transition-colors shadow-sm">
     查询
    </button>
    <button class="bg-[#41B8AF] hover:bg-[#359f97] text-white px-6 py-1.5 rounded text-sm transition-colors shadow-sm">
     导出
    </button>
   </div>
  </div>
 </div>
 <!-- 2. 数据表格区 -->
 <div class="flex-1 overflow-auto border border-gray-200 rounded">
  <table class="min-w-[1600px] custom-table text-sm">
   <thead class="bg-tableHeader sticky top-0 z-10">
    <tr>
     <th class="w-14 text-left font-medium px-5 py-3 whitespace-nowrap pl-6 pr-0">
     </th>
     <th class="text-left font-medium px-5 py-3 whitespace-nowrap min-w-[140px]">
      销售名称
     </th>
     <th class="text-left font-medium px-5 py-3 whitespace-nowrap min-w-[260px]">
      销售邮箱
     </th>
     <th class="text-left font-medium px-5 py-3 whitespace-nowrap min-w-[140px]">
      MT返佣账号
     </th>
     <th class="text-left font-medium px-5 py-3 whitespace-nowrap min-w-[220px]">
      客户名称
     </th>
     <th class="text-left font-medium px-5 py-3 whitespace-nowrap min-w-[260px]">
      客户邮箱
     </th>
     <th class="text-left font-medium px-5 py-3 whitespace-nowrap min-w-[120px]">
      统计周期
     </th>
     <th class="text-left font-medium px-5 py-3 whitespace-nowrap min-w-[180px]">
      客户上个周期净入金
     </th>
     <th class="text-left font-medium px-5 py-3 whitespace-nowrap min-w-[180px]">
      客户上个周期交易量
     </th>
     <th class="text-left font-medium px-5 py-3 whitespace-nowrap min-w-[180px]">
      客户上个周期奖励状态
     </th>
    </tr>
   </thead>
   <tbody id="salesDepositTbody">
   </tbody>
  </table>
 </div>
 <!-- 3. 底部翻页区 -->
 <div class="flex items-center justify-end mt-4 text-sm text-gray-500">
  <span class="mr-4">
   共 658 条
  </span>
  <div class="flex items-center gap-1">
   <button class="w-8 h-8 flex items-center justify-center rounded hover:bg-gray-100 text-gray-400">
    <i class="fa-solid fa-chevron-left text-xs">
    </i>
   </button>
   <button class="w-8 h-8 flex items-center justify-center rounded hover:bg-gray-100">
    50
   </button>
   <!-- 当前激活页 -->
   <button class="w-8 h-8 flex items-center justify-center rounded bg-red-100 text-red-500 font-medium">
    51
   </button>
   <button class="w-8 h-8 flex items-center justify-center rounded hover:bg-gray-100">
    52
   </button>
   <button class="w-8 h-8 flex items-center justify-center rounded hover:bg-gray-100">
    53
   </button>
   <button class="w-8 h-8 flex items-center justify-center rounded hover:bg-gray-100">
    54
   </button>
   <span class="px-1">
    ...
   </span>
   <button class="w-8 h-8 flex items-center justify-center rounded hover:bg-gray-100">
    90
   </button>
   <button class="w-8 h-8 flex items-center justify-center rounded hover:bg-gray-100">
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
