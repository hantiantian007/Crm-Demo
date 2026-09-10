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
      对账日志：
     </strong>
     系统每天凌晨自动执行 T-1 日期的资金核对。此处记录每天的全局对账结果汇总。对于存在异常的数据，系统仅作客观记录，无需人工干预处理单据，财务只需添加“异常说明备注”即可平账归档。
    </p>
   </div>
  </div>
 </div>
 <!-- 筛选栏 -->
 <div class="bg-white p-4 rounded-xl card-shadow border border-gray-100 flex justify-between items-center">
  <div class="flex space-x-4 items-center">
   <div class="flex items-center">
    <label class="text-sm text-gray-500 mr-2">
     选择月份:
    </label>
    <input class="border border-gray-300 rounded px-3 py-1.5 text-sm focus:outline-none focus:border-primaryColor" type="month" value="2026-09"/>
   </div>
   <div class="flex items-center">
    <label class="text-sm text-gray-500 mr-2">
     对账状态:
    </label>
    <select class="border border-gray-300 rounded px-3 py-1.5 text-sm focus:outline-none focus:border-primaryColor">
     <option value="">
      全部状态
     </option>
     <option value="exception">
      存在异常
     </option>
     <option value="balanced">
      已平账
     </option>
    </select>
   </div>
  </div>
  <button class="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded text-sm transition-colors flex items-center">
   <i class="fa-solid fa-download mr-2">
   </i>
   导出本月报表
  </button>
 </div>
 <!-- 每日对账列表 -->
 <div class="bg-white rounded-xl card-shadow border border-gray-100 flex flex-col">
  <div class="overflow-x-auto no-scrollbar">
   <table class="w-full text-left border-collapse">
    <thead>
     <tr class="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider border-b border-gray-200">
      <th class="px-6 py-4 font-medium">
       对账日期 (T-1)
      </th>
      <th class="px-6 py-4 font-medium">
       CRM 入金 (理论)
      </th>
      <th class="px-6 py-4 font-medium">
       CRM 出金 (理论)
      </th>
      <th class="px-6 py-4 font-medium">
       MT Deposit (实际)
      </th>
      <th class="px-6 py-4 font-medium">
       MT Withdrawal (实际)
      </th>
      <th class="px-6 py-4 font-medium text-center">
       异常笔数
      </th>
      <th class="px-6 py-4 font-medium">
       状态
      </th>
      <th class="px-6 py-4 font-medium min-w-[200px]">
       异常说明
      </th>
      <th class="px-6 py-4 font-medium">
       操作
      </th>
     </tr>
    </thead>
    <tbody class="text-sm divide-y divide-gray-100">
     <!-- 2026-09-03 (有异常未说明) -->
     <tr class="hover:bg-gray-50 transition-colors bg-red-50/20">
      <td class="px-6 py-4 font-bold text-gray-800">
       2026-09-03
      </td>
      <td class="px-6 py-4 font-mono text-gray-600">
       $ 1,234,567.8900
      </td>
      <td class="px-6 py-4 font-mono text-gray-600">
       $ 234,567.8900
      </td>
      <td class="px-6 py-4 font-mono text-gray-600">
       $ 1,235,567.8900
      </td>
      <td class="px-6 py-4 font-mono text-gray-600">
       $ 234,567.8900
      </td>
      <td class="px-6 py-4 text-center">
       <a class="inline-flex items-center justify-center w-6 h-6 rounded-full bg-red-100 text-red-600 hover:bg-red-200 font-bold font-mono text-xs cursor-pointer transition-colors" href="#" title="点击查看异常明细">
        2
       </a>
      </td>
      <td class="px-6 py-4">
       <span class="px-2 py-1 bg-red-100 text-red-700 rounded text-xs font-bold border border-red-200">
        <i class="fa-solid fa-triangle-exclamation mr-1">
        </i>
        待说明
       </span>
      </td>
      <td class="px-6 py-4">
       <input class="w-full border border-red-200 rounded px-2 py-1 text-xs focus:outline-none focus:border-primaryColor bg-white" placeholder="选填：填写差异原因..." type="text"/>
      </td>
      <td class="px-6 py-4">
       <button class="btn-outline px-3 py-1.5 rounded text-xs inline-block whitespace-nowrap">
        标记已处理
       </button>
      </td>
     </tr>
     <!-- 2026-09-02 (平账) -->
     <tr class="hover:bg-gray-50 transition-colors">
      <td class="px-6 py-4 font-bold text-gray-800">
       2026-09-02
      </td>
      <td class="px-6 py-4 font-mono text-gray-600">
       $ 890,123.4500
      </td>
      <td class="px-6 py-4 font-mono text-gray-600">
       $ 150,000.0000
      </td>
      <td class="px-6 py-4 font-mono text-gray-600">
       $ 890,123.4500
      </td>
      <td class="px-6 py-4 font-mono text-gray-600">
       $ 150,000.0000
      </td>
      <td class="px-6 py-4 text-center font-mono text-gray-400">
       0
      </td>
      <td class="px-6 py-4">
       <span class="px-2 py-1 bg-green-50 text-green-600 rounded text-xs font-bold border border-green-100">
        <i class="fa-solid fa-check mr-1">
        </i>
        无异常
       </span>
      </td>
      <td class="px-6 py-4">
       <span class="text-gray-400 text-xs italic">
        -
       </span>
      </td>
      <td class="px-6 py-4">
       <span class="text-gray-400 text-xs italic">
        -
       </span>
      </td>
     </tr>
     <!-- 2026-09-01 (曾经有异常，已添加说明) -->
     <tr class="hover:bg-gray-50 transition-colors">
      <td class="px-6 py-4 font-bold text-gray-800">
       2026-09-01
      </td>
      <td class="px-6 py-4 font-mono text-gray-600">
       $ 1,050,000.0000
      </td>
      <td class="px-6 py-4 font-mono text-gray-600">
       $ 300,000.0000
      </td>
      <td class="px-6 py-4 font-mono text-gray-600">
       $ 1,049,500.0000
      </td>
      <td class="px-6 py-4 font-mono text-gray-600">
       $ 300,000.0000
      </td>
      <td class="px-6 py-4 text-center">
       <a class="inline-flex items-center justify-center w-6 h-6 rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200 font-bold font-mono text-xs cursor-pointer transition-colors" href="#" title="点击查看异常明细">
        1
       </a>
      </td>
      <td class="px-6 py-4">
       <span class="px-2 py-1 bg-green-50 text-green-600 rounded text-xs font-bold border border-green-100">
        <i class="fa-solid fa-check-double mr-1">
        </i>
        已处理
       </span>
      </td>
      <td class="px-6 py-4">
       <div class="text-xs text-gray-600 truncate max-w-[200px]" title="网络抖动导致一笔 $500.00 的入金 MT 掉单，已线下补录。">
        网络抖动导致一笔 $500.00 的入金 MT 掉单，已线下补录。
       </div>
      </td>
      <td class="px-6 py-4">
       <button class="text-primaryColor hover:underline text-xs inline-block">
        编辑说明
       </button>
      </td>
     </tr>
    </tbody>
   </table>
  </div>
  <!-- 分页 -->
  <div class="p-4 border-t border-gray-100 flex justify-between items-center text-sm text-gray-500">
   <span>
    显示 1 到 3 条，共 3 条记录
   </span>
   <div class="flex space-x-1">
    <button class="px-3 py-1 border border-gray-200 rounded hover:bg-gray-50 text-gray-400 cursor-not-allowed">
     上一页
    </button>
    <button class="px-3 py-1 bg-primaryColor text-white rounded">
     1
    </button>
    <button class="px-3 py-1 border border-gray-200 rounded hover:bg-gray-50 text-gray-400 cursor-not-allowed">
     下一页
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
