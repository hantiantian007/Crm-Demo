<template>
  <div class="flex h-full bg-mainBg overflow-hidden">
    <div class="flex-1 flex flex-col min-w-0 bg-gray-50 overflow-hidden p-4 custom-scrollbar overflow-y-auto">
      <div class="flex-1 overflow-y-auto p-4">
 <div class="w-full space-y-4">
  <div class="bg-white rounded-xl px-5 py-4 card-shadow border border-gray-100">
   <h2 class="text-sm font-semibold text-gray-700 mb-3">
    搜索
   </h2>
   <div class="flex flex-wrap items-center gap-3 text-sm">
    <label class="text-gray-500">
     活动名称:
    </label>
    <input class="w-[220px] h-9 px-3 border border-gray-200 rounded-md text-gray-600 outline-none focus:border-primary" placeholder="请输入" type="text" value=""/>
    <label class="text-gray-500 ml-2">
     活动状态:
    </label>
    <select class="w-[90px] h-9 px-2 border border-gray-200 rounded-md text-gray-600 outline-none focus:border-primary">
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
    <button class="h-9 px-4 rounded-md action-primary text-sm transition-colors">
     搜索
    </button>
    <button class="h-9 px-4 rounded-md border border-gray-200 bg-white text-gray-600 hover:bg-gray-50 transition-colors">
     重置
    </button>
   </div>
  </div>
  <div class="bg-white rounded-xl card-shadow border border-gray-100 overflow-hidden">
   <div class="overflow-x-auto">
    <table class="min-w-full text-sm">
     <thead class="bg-white">
      <tr class="text-gray-500 border-b border-gray-100">
       <th class="text-left font-medium py-3.5 px-5">
        活动名称
       </th>
       <th class="text-left font-medium py-3.5 px-4">
        开始时间
       </th>
       <th class="text-left font-medium py-3.5 px-4">
        结束时间
       </th>
       <th class="text-left font-medium py-3.5 px-4">
        活动状态
       </th>
       <th class="text-left font-medium py-3.5 px-4">
        参与人数
       </th>
       <th class="text-left font-medium py-3.5 px-4">
        累计奖励笔数
       </th>
       <th class="text-left font-medium py-3.5 px-4">
        累计奖励金额
       </th>
       <th class="text-left font-medium py-3.5 px-4">
        创建人
       </th>
       <th class="text-left font-medium py-3.5 px-4">
        创建时间
       </th>
       <th class="text-left font-medium py-3.5 px-5">
        操作
       </th>
      </tr>
     </thead>
     <tbody>
      <tr class="table-row border-b border-gray-100">
       <td class="py-3.5 px-5 text-gray-700">
        <div class="flex items-center gap-2">
         <span>
          Pcard活动
         </span>
        </div>
       </td>
       <td class="py-3.5 px-4 text-gray-500">
        2026-01-01 00:00:00
       </td>
       <td class="py-3.5 px-4 text-gray-500">
        2026-12-31 23:59:59
       </td>
       <td class="py-3.5 px-4">
        <span class="inline-flex px-2.5 py-1 rounded-full text-xs font-medium status-running">
         进行中
        </span>
       </td>
       <td class="py-3.5 px-4 text-gray-700 font-medium">
        1,286
       </td>
       <td class="py-3.5 px-4 text-gray-700">
        23
       </td>
       <td class="py-3.5 px-4 text-gray-700">
        —
       </td>
       <td class="py-3.5 px-4 text-gray-500">
        史密斯
       </td>
       <td class="py-3.5 px-4 text-gray-500">
        2025-12-28 10:00:00
       </td>
       <td class="py-3.5 px-5">
        <div class="flex items-center gap-2">
         <a class="px-3 py-1 rounded-md text-xs transition-colors inline-block text-white border bg-blue-500 hover:bg-blue-600 border-blue-500" href="#">
          查看详情
         </a>
         <button class="px-3 py-1 rounded-md text-xs border transition-colors text-white bg-red-500 hover:bg-red-600 border-red-500">
          结束活动
         </button>
        </div>
       </td>
      </tr>
      <tr class="table-row border-b border-gray-100">
       <td class="py-3.5 px-5 text-gray-700">
        IB计划
       </td>
       <td class="py-3.5 px-4 text-gray-500">
        2026-02-03 12:15:27
       </td>
       <td class="py-3.5 px-4 text-gray-500">
        2030-02-03 12:15:27
       </td>
       <td class="py-3.5 px-4">
        <span class="inline-flex px-2.5 py-1 rounded-full text-xs font-medium status-running">
         进行中
        </span>
       </td>
       <td class="py-3.5 px-4 text-gray-700">
        11
       </td>
       <td class="py-3.5 px-4 text-gray-700">
        0
       </td>
       <td class="py-3.5 px-4 text-gray-700">
        0.00
       </td>
       <td class="py-3.5 px-4 text-gray-500">
        史密斯
       </td>
       <td class="py-3.5 px-4 text-gray-500">
        2026-02-03 12:16:27
       </td>
       <td class="py-3.5 px-5">
        <div class="flex items-center gap-2">
         <a class="px-3 py-1 rounded-md text-xs transition-colors inline-block text-white border bg-blue-500 hover:bg-blue-600 border-blue-500" href="#">
          查看详情
         </a>
         <button class="px-3 py-1 rounded-md text-xs border transition-colors text-white bg-red-500 hover:bg-red-600 border-red-500">
          结束活动
         </button>
        </div>
       </td>
      </tr>
      <tr class="table-row border-b border-gray-100">
       <td class="py-3.5 px-5 text-gray-700">
        成长计划活动
       </td>
       <td class="py-3.5 px-4 text-gray-500">
        2025-06-30 22:36:02
       </td>
       <td class="py-3.5 px-4 text-gray-500">
        2030-02-03 12:15:27
       </td>
       <td class="py-3.5 px-4">
        <span class="inline-flex px-2.5 py-1 rounded-full text-xs font-medium status-running">
         进行中
        </span>
       </td>
       <td class="py-3.5 px-4 text-gray-700">
        302
       </td>
       <td class="py-3.5 px-4 text-gray-700">
        0
       </td>
       <td class="py-3.5 px-4 text-gray-700">
        0.00
       </td>
       <td class="py-3.5 px-4 text-gray-500">
        史密斯
       </td>
       <td class="py-3.5 px-4 text-gray-500">
        2025-06-28 14:59:26
       </td>
       <td class="py-3.5 px-5">
        <div class="flex items-center gap-2">
         <a class="px-3 py-1 rounded-md text-xs transition-colors inline-block text-white border bg-blue-500 hover:bg-blue-600 border-blue-500" href="#">
          查看详情
         </a>
         <button class="px-3 py-1 rounded-md text-xs border transition-colors text-white bg-red-500 hover:bg-red-600 border-red-500">
          结束活动
         </button>
        </div>
       </td>
      </tr>
      <tr class="table-row border-b border-gray-100">
       <td class="py-3.5 px-5 text-gray-700">
        先锋体验活动
       </td>
       <td class="py-3.5 px-4 text-gray-500">
        2025-06-30 22:36:02
       </td>
       <td class="py-3.5 px-4 text-gray-500">
        2030-02-03 12:15:27
       </td>
       <td class="py-3.5 px-4">
        <span class="inline-flex px-2.5 py-1 rounded-full text-xs font-medium status-running">
         进行中
        </span>
       </td>
       <td class="py-3.5 px-4 text-gray-700">
        4
       </td>
       <td class="py-3.5 px-4 text-gray-700">
        4
       </td>
       <td class="py-3.5 px-4 text-gray-700">
        41.92
       </td>
       <td class="py-3.5 px-4 text-gray-500">
        史密斯
       </td>
       <td class="py-3.5 px-4 text-gray-500">
        2025-06-28 14:59:26
       </td>
       <td class="py-3.5 px-5">
        <div class="flex items-center gap-2">
         <button class="px-3 py-1 rounded-md text-xs transition-colors text-white border bg-blue-500 hover:bg-blue-600 border-blue-500">
          查看详情
         </button>
         <button class="px-3 py-1 rounded-md text-xs border transition-colors text-white bg-red-500 hover:bg-red-600 border-red-500">
          结束活动
         </button>
        </div>
       </td>
      </tr>
      <tr class="table-row border-b border-gray-100">
       <td class="py-3.5 px-5 text-gray-700">
        止盈活动
       </td>
       <td class="py-3.5 px-4 text-gray-500">
        2025-06-30 22:36:02
       </td>
       <td class="py-3.5 px-4 text-gray-500">
        2025-09-21 00:00:00
       </td>
       <td class="py-3.5 px-4">
        <span class="inline-flex px-2.5 py-1 rounded-full text-xs font-medium status-ended text-red-500 hover:text-red-700">
         已结束
        </span>
       </td>
       <td class="py-3.5 px-4 text-gray-700">
        5
       </td>
       <td class="py-3.5 px-4 text-gray-700">
        2
       </td>
       <td class="py-3.5 px-4 text-gray-700">
        0.20
       </td>
       <td class="py-3.5 px-4 text-gray-500">
        史密斯
       </td>
       <td class="py-3.5 px-4 text-gray-500">
        2025-06-28 14:59:26
       </td>
       <td class="py-3.5 px-5">
        <div class="flex items-center gap-2">
         <button class="px-3 py-1 rounded-md text-xs transition-colors text-white border bg-blue-500 hover:bg-blue-600 border-blue-500">
          查看详情
         </button>
         <button class="px-3 py-1 rounded-md text-xs border action-success transition-colors">
          开始活动
         </button>
        </div>
       </td>
      </tr>
      <tr class="table-row">
       <td class="py-3.5 px-5 text-gray-700">
        黄金多点差交易活动
       </td>
       <td class="py-3.5 px-4 text-gray-500">
        2025-07-01 00:00:00
       </td>
       <td class="py-3.5 px-4 text-gray-500">
        2026-01-01 23:59:59
       </td>
       <td class="py-3.5 px-4">
        <span class="inline-flex px-2.5 py-1 rounded-full text-xs font-medium status-ended text-red-500 hover:text-red-700">
         已结束
        </span>
       </td>
       <td class="py-3.5 px-4 text-gray-700">
        36
       </td>
       <td class="py-3.5 px-4 text-gray-700">
        5485
       </td>
       <td class="py-3.5 px-4 text-gray-700">
        12,704.10
       </td>
       <td class="py-3.5 px-4 text-gray-500">
        史密斯
       </td>
       <td class="py-3.5 px-4 text-gray-500">
        2025-06-30 21:56:38
       </td>
       <td class="py-3.5 px-5">
        <div class="flex items-center gap-2">
         <button class="px-3 py-1 rounded-md text-xs transition-colors text-white border bg-blue-500 hover:bg-blue-600 border-blue-500">
          查看详情
         </button>
         <button class="px-3 py-1 rounded-md text-xs border action-success transition-colors">
          开始活动
         </button>
        </div>
       </td>
      </tr>
     </tbody>
    </table>
   </div>
   <div class="flex items-center justify-between px-5 py-3.5 border-t border-gray-100 text-sm text-gray-500">
    <div>
     15条 / 页，共5条记录，第1/1页
    </div>
    <div class="flex items-center gap-3">
     <button class="w-7 h-7 rounded-full flex items-center justify-center text-gray-400 hover:bg-gray-100">
      <i class="fa-solid fa-chevron-left text-[10px]">
      </i>
     </button>
     <button class="w-7 h-7 rounded-full bg-primary text-white text-xs">
      1
     </button>
     <button class="w-7 h-7 rounded-full flex items-center justify-center text-gray-400 hover:bg-gray-100">
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
