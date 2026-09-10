<template>
  <div class="flex h-full bg-mainBg overflow-hidden">
    <div class="flex-1 flex flex-col min-w-0 bg-gray-50 overflow-hidden p-4 custom-scrollbar overflow-y-auto">
      <div class="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden flex-1 flex flex-col">
 <!-- Top Buttons -->
 <div class="p-4 flex justify-between items-center border-b border-gray-100">
  <button class="bg-[#C4A373] hover:bg-[#b09063] text-white px-4 py-1.5 rounded text-sm transition-colors flex items-center gap-2">
   <i class="fa-solid fa-plus text-xs">
   </i>
   新建标签
  </button>
 </div>
 <!-- Table -->
 <div class="overflow-x-auto flex-1">
  <table class="w-full text-sm text-left whitespace-nowrap custom-table">
   <thead class="bg-tableHeader">
    <tr>
     <th class="w-16">
      序号
     </th>
     <th>
      标签名称
     </th>
     <th>
      使用频次
      <i class="fa-solid fa-sort-down ml-1">
      </i>
     </th>
     <th>
      状态
     </th>
     <th>
      创建人
     </th>
     <th>
      创建时间
     </th>
     <th>
      操作
     </th>
    </tr>
   </thead>
   <tbody class="text-gray-700">
    <tr>
     <td>
      1
     </td>
     <td class="font-medium text-gray-800">
      高净值客户
     </td>
     <td class="text-blue-600 font-medium">
      98
     </td>
     <td>
      <span class="px-2 py-1 bg-green-50 text-green-600 rounded text-xs">
       启用中
      </span>
     </td>
     <td class="text-gray-500">
      系统预设
     </td>
     <td>
      2026-05-12 10:22:15
     </td>
     <td>
      <button class="text-red-500 hover:text-red-700 mr-2 transition-colors">
       停用
      </button>
     </td>
    </tr>
    <tr>
     <td>
      2
     </td>
     <td class="font-medium text-gray-800">
      小白需指导
     </td>
     <td class="text-blue-600 font-medium">
      45
     </td>
     <td>
      <span class="px-2 py-1 bg-green-50 text-green-600 rounded text-xs">
       启用中
      </span>
     </td>
     <td class="text-gray-800">
      张主管
     </td>
     <td>
      2026-05-15 14:10:00
     </td>
     <td>
      <button class="text-red-500 hover:text-red-700 mr-2 transition-colors">
       停用
      </button>
     </td>
    </tr>
    <tr>
     <td>
      3
     </td>
     <td class="font-medium text-gray-800">
      近期观望
     </td>
     <td class="text-blue-600 font-medium">
      32
     </td>
     <td>
      <span class="px-2 py-1 bg-green-50 text-green-600 rounded text-xs">
       启用中
      </span>
     </td>
     <td class="text-gray-800">
      李销售
     </td>
     <td>
      2026-05-18 09:30:45
     </td>
     <td>
      <button class="text-red-500 hover:text-red-700 mr-2 transition-colors">
       停用
      </button>
     </td>
    </tr>
    <tr>
     <td>
      4
     </td>
     <td class="font-medium text-gray-400">
      代理同行
     </td>
     <td class="text-gray-400 font-medium">
      12
     </td>
     <td>
      <span class="px-2 py-1 bg-gray-100 text-gray-500 rounded text-xs">
       已停用
      </span>
     </td>
     <td class="text-gray-800">
      王主管
     </td>
     <td>
      2026-06-01 11:20:10
     </td>
     <td>
      <button class="text-green-500 hover:text-green-700 mr-2 transition-colors">
       启用
      </button>
     </td>
    </tr>
    <tr>
     <td>
      5
     </td>
     <td class="font-medium text-gray-800">
      外汇老手
     </td>
     <td class="text-blue-600 font-medium">
      8
     </td>
     <td>
      <span class="px-2 py-1 bg-green-50 text-green-600 rounded text-xs">
       启用中
      </span>
     </td>
     <td class="text-gray-500">
      系统预设
     </td>
     <td>
      2026-06-10 16:05:30
     </td>
     <td>
      <button class="text-red-500 hover:text-red-700 mr-2 transition-colors">
       停用
      </button>
     </td>
    </tr>
   </tbody>
  </table>
 </div>
</div>

    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
</script>
