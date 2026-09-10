<template>
  <div class="flex h-full bg-mainBg overflow-hidden">
    <div class="flex-1 flex flex-col min-w-0 bg-gray-50 overflow-hidden p-4 custom-scrollbar overflow-y-auto">
      <div class="flex-1 overflow-y-auto p-4 md:p-6 bg-[#f7f8fa]">
 <div class="w-full space-y-4">
  <div class="bg-white rounded-xl px-6 py-5 card-shadow border border-gray-100">
   <h2 class="text-base font-bold text-gray-800 mb-4">
    搜索
   </h2>
   <div class="flex flex-wrap items-center gap-4 text-sm">
    <div class="flex items-center gap-2">
     <label class="text-gray-600 font-medium">
      活动名称:
     </label>
     <input class="w-[240px] h-9 px-3 border border-gray-200 rounded text-gray-600 outline-none focus:border-primary transition-colors" placeholder="请输入" type="text" value=""/>
    </div>
    <div class="flex items-center gap-2">
     <label class="text-gray-600 font-medium">
      活动状态:
     </label>
     <select class="w-[120px] h-9 px-2 border border-gray-200 rounded text-gray-600 outline-none focus:border-primary transition-colors">
      <option>
       全部
      </option>
      <option>
       进行中
      </option>
      <option>
       已结束
      </option>
     </select>
    </div>
    <div class="flex items-center gap-2 ml-2">
     <button class="h-9 px-5 rounded action-primary text-sm font-medium transition-colors">
      搜索
     </button>
     <button class="h-9 px-5 rounded border border-gray-200 bg-white text-gray-600 hover:bg-gray-50 transition-colors font-medium">
      重置
     </button>
     <button class="h-9 px-5 rounded border border-primary text-primary hover:bg-orange-50 transition-colors font-medium ml-2">
      创建活动
     </button>
    </div>
   </div>
  </div>
  <div class="bg-white rounded-xl card-shadow border border-gray-100 overflow-hidden mt-4">
   <div class="overflow-x-auto">
    <table class="min-w-full text-sm">
     <thead class="bg-white">
      <tr class="text-gray-600 font-bold border-b border-gray-100">
       <th class="text-left py-4 px-6">
        活动名称
       </th>
       <th class="text-left py-4 px-5">
        开始时间
       </th>
       <th class="text-left py-4 px-5">
        结束时间
       </th>
       <th class="text-left py-4 px-5">
        活动状态
       </th>
       <th class="text-left py-4 px-5">
        参与人数
       </th>
       <th class="text-left py-4 px-5">
        累计奖励笔数
       </th>
       <th class="text-left py-4 px-5">
        累计奖励金额
       </th>
       <th class="text-left py-4 px-5">
        创建人
       </th>
       <th class="text-left py-4 px-5">
        创建时间
       </th>
       <th class="text-left py-4 px-6">
        操作
       </th>
      </tr>
     </thead>
     <tbody class="text-gray-500">
      <tr class="table-row border-b border-gray-100">
       <td class="py-4 px-6 text-gray-700">
        注册送赠金
       </td>
       <td class="py-4 px-5">
        2026-10-01 00:00:00
       </td>
       <td class="py-4 px-5">
        2026-10-31 23:59:59
       </td>
       <td class="py-4 px-5">
        <span class="text-[#65A30D] font-medium">
         进行中
        </span>
       </td>
       <td class="py-4 px-5">
        352
       </td>
       <td class="py-4 px-5">
        120
       </td>
       <td class="py-4 px-5">
        6,000.0000
       </td>
       <td class="py-4 px-5">
        系统管理员
       </td>
       <td class="py-4 px-5">
        2026-09-28 10:00:00
       </td>
       <td class="py-4 px-6">
        <div class="flex items-center gap-2">
         <a class="px-3 py-1 rounded text-[13px] transition-colors inline-block font-medium text-white border bg-blue-500 hover:bg-blue-600 border-blue-500" href="#">
          查看详情
         </a>
         <button class="px-3 py-1 rounded text-[13px] border border-red-200 hover:bg-red-50 transition-colors font-medium text-red-500 hover:text-red-700">
          结束活动
         </button>
        </div>
       </td>
      </tr>
      <tr class="table-row border-b border-gray-100">
       <td class="py-4 px-6 text-gray-700">
        IB计划
       </td>
       <td class="py-4 px-5">
        2026-02-03 12:15:27
       </td>
       <td class="py-4 px-5">
        2030-02-03 12:15:27
       </td>
       <td class="py-4 px-5">
        <span class="text-[#65A30D] font-medium">
         进行中
        </span>
       </td>
       <td class="py-4 px-5">
        18
       </td>
       <td class="py-4 px-5">
        0
       </td>
       <td class="py-4 px-5">
        0.0000
       </td>
       <td class="py-4 px-5">
        史密斯
       </td>
       <td class="py-4 px-5">
        2026-02-03 12:16:27
       </td>
       <td class="py-4 px-6">
        <div class="flex items-center gap-2">
         <a class="px-3 py-1 rounded text-[13px] transition-colors inline-block font-medium text-white border bg-blue-500 hover:bg-blue-600 border-blue-500" href="#">
          查看详情
         </a>
         <button class="px-3 py-1 rounded text-[13px] border border-red-200 hover:bg-red-50 transition-colors font-medium text-red-500 hover:text-red-700">
          结束活动
         </button>
        </div>
       </td>
      </tr>
      <tr class="table-row border-b border-gray-100">
       <td class="py-4 px-6 text-gray-700">
        成长计划
       </td>
       <td class="py-4 px-5">
        2026-02-03 12:15:27
       </td>
       <td class="py-4 px-5">
        2030-02-03 12:15:27
       </td>
       <td class="py-4 px-5">
        <span class="text-[#65A30D] font-medium">
         进行中
        </span>
       </td>
       <td class="py-4 px-5">
        58
       </td>
       <td class="py-4 px-5">
        0
       </td>
       <td class="py-4 px-5">
        0.0000
       </td>
       <td class="py-4 px-5">
        史密斯
       </td>
       <td class="py-4 px-5">
        2030-02-03 12:15:27
       </td>
       <td class="py-4 px-6">
        <div class="flex items-center gap-2">
         <a class="px-3 py-1 rounded text-[13px] transition-colors inline-block font-medium text-white border bg-blue-500 hover:bg-blue-600 border-blue-500" href="#">
          查看详情
         </a>
         <button class="px-3 py-1 rounded text-[13px] border border-red-200 hover:bg-red-50 transition-colors font-medium text-red-500 hover:text-red-700">
          结束活动
         </button>
        </div>
       </td>
      </tr>
      <tr class="table-row border-b border-gray-100">
       <td class="py-4 px-6 text-gray-700">
        先锋体验活动
       </td>
       <td class="py-4 px-5">
        2026-02-03 12:15:27
       </td>
       <td class="py-4 px-5">
        2030-02-03 12:15:27
       </td>
       <td class="py-4 px-5">
        <span class="text-[#65A30D] font-medium">
         进行中
        </span>
       </td>
       <td class="py-4 px-5">
        26
       </td>
       <td class="py-4 px-5">
        28
       </td>
       <td class="py-4 px-5">
        861.1400
       </td>
       <td class="py-4 px-5">
        史密斯
       </td>
       <td class="py-4 px-5">
        2026-02-03 12:16:27
       </td>
       <td class="py-4 px-6">
        <div class="flex items-center gap-2">
         <a class="px-3 py-1 rounded text-[13px] transition-colors inline-block font-medium text-white border bg-blue-500 hover:bg-blue-600 border-blue-500" href="#">
          查看详情
         </a>
         <button class="px-3 py-1 rounded text-[13px] border border-red-200 hover:bg-red-50 transition-colors font-medium text-red-500 hover:text-red-700">
          结束活动
         </button>
        </div>
       </td>
      </tr>
      <tr class="table-row border-b border-gray-100">
       <td class="py-4 px-6 text-gray-700">
        止盈活动
       </td>
       <td class="py-4 px-5">
        2025-06-30 22:36:02
       </td>
       <td class="py-4 px-5">
        2025-09-21 00:00:00
       </td>
       <td class="py-4 px-5">
        <span class="font-medium text-red-500 hover:text-red-700">
         已结束
        </span>
       </td>
       <td class="py-4 px-5">
        5
       </td>
       <td class="py-4 px-5">
        2
       </td>
       <td class="py-4 px-5">
        0.2000
       </td>
       <td class="py-4 px-5">
        史密斯
       </td>
       <td class="py-4 px-5">
        2025-06-28 14:59:26
       </td>
       <td class="py-4 px-6">
        <div class="flex items-center gap-2">
         <a class="px-3 py-1 rounded text-[13px] transition-colors inline-block font-medium text-white border bg-blue-500 hover:bg-blue-600 border-blue-500" href="#">
          查看详情
         </a>
         <button class="px-3 py-1 rounded text-[13px] border border-[#65A30D] text-[#65A30D] hover:bg-[#F7FEE7] transition-colors font-medium">
          开始活动
         </button>
        </div>
       </td>
      </tr>
      <tr class="table-row border-b border-gray-100">
       <td class="py-4 px-6 text-gray-700">
        黄金零点差交易活动
       </td>
       <td class="py-4 px-5">
        2025-07-01 00:00:00
       </td>
       <td class="py-4 px-5">
        2026-01-01 23:59:59
       </td>
       <td class="py-4 px-5">
        <span class="font-medium text-red-500 hover:text-red-700">
         已结束
        </span>
       </td>
       <td class="py-4 px-5">
        34
       </td>
       <td class="py-4 px-5">
        4934
       </td>
       <td class="py-4 px-5">
        10,483.8000
       </td>
       <td class="py-4 px-5">
        史密斯
       </td>
       <td class="py-4 px-5">
        2025-06-30 21:56:38
       </td>
       <td class="py-4 px-6">
        <div class="flex items-center gap-2">
         <a class="px-3 py-1 rounded text-[13px] transition-colors inline-block font-medium text-white border bg-blue-500 hover:bg-blue-600 border-blue-500" href="#">
          查看详情
         </a>
         <button class="px-3 py-1 rounded text-[13px] border border-[#65A30D] text-[#65A30D] hover:bg-[#F7FEE7] transition-colors font-medium">
          开始活动
         </button>
        </div>
       </td>
      </tr>
     </tbody>
    </table>
   </div>
   <div class="flex items-center justify-between px-6 py-4 border-t border-gray-100 text-[13px] text-gray-500">
    <div>
     15条 / 页
     <span class="mx-1">
      6条记录，第1/1页
     </span>
    </div>
    <div class="flex items-center gap-2">
     <button class="w-7 h-7 rounded flex items-center justify-center text-gray-400 hover:bg-gray-50 transition-colors">
      <i class="fa-solid fa-chevron-left text-[10px]">
      </i>
     </button>
     <button class="w-7 h-7 rounded action-primary text-white font-medium">
      1
     </button>
     <button class="w-7 h-7 rounded flex items-center justify-center text-gray-400 hover:bg-gray-50 transition-colors">
      <i class="fa-solid fa-chevron-right text-[10px]">
      </i>
     </button>
    </div>
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
