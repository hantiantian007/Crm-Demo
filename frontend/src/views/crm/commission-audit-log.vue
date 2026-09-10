<template>
  <div class="flex h-full bg-mainBg overflow-hidden">
    <div class="flex-1 flex flex-col min-w-0 bg-gray-50 overflow-hidden p-4 custom-scrollbar overflow-y-auto">
      <div class="flex-1 overflow-y-auto p-6 flex flex-col gap-6 min-h-0">
 <!-- 工具栏：搜索 + 日期范围 + 状态筛选 -->
 <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
  <div class="flex items-center justify-between flex-wrap gap-4">
   <div class="flex items-center gap-5 flex-wrap">
    <div class="flex items-center gap-3">
     <label class="text-[13px] text-gray-600 font-medium whitespace-nowrap">
      对账日期范围:
     </label>
     <input class="custom-input w-[160px]" type="date" value="2026-07-13"/>
     <span class="text-gray-400">
      至
     </span>
     <input class="custom-input w-[160px]" type="date" value="2026-08-11"/>
    </div>
    <div class="flex items-center gap-2">
     <select class="custom-select w-[140px]">
      <option>
       对账状态: 全部
      </option>
      <option>
       正常
      </option>
      <option>
       异常
      </option>
     </select>
    </div>
   </div>
  </div>
 </div>
 <!-- 对账批次宽表（横向 nowrap 滚动） -->
 <div class="bg-white rounded-xl shadow-sm border border-gray-100 flex flex-col overflow-hidden">
  <div class="flex items-center justify-between p-5 border-b border-gray-100">
   <div class="flex items-center gap-3">
    <h3 class="font-bold text-gray-800 text-[15px]">
     对账批次列表
    </h3>
    <span class="pill pill-gray">
     共 31 条，异常批次 3 条已高亮
    </span>
   </div>
  </div>
  <div class="overflow-x-auto no-scrollbar">
   <table class="custom-table w-full min-w-[880px]">
    <thead class="bg-tableHeader sticky top-0">
     <tr>
      <th>
       对账日期
      </th>
      <th>
       平仓订单数
      </th>
      <th>
       应返佣金额
      </th>
      <th>
       实际返佣金额
      </th>
      <th>
       对账状态
      </th>
      <th>
       异常笔数
      </th>
      <th>
       金额差额
      </th>
      <th>
       操作
      </th>
     </tr>
    </thead>
    <tbody>
     <!-- 今日批次（待线下处理：异常） -->
     <tr class="bg-orange-50/30">
      <td class="font-semibold">
       2026-08-11
      </td>
      <td>
       328
      </td>
      <td class="font-mono font-semibold">
       $42,876.30
      </td>
      <td class="font-mono font-semibold">
       $42,938.90
      </td>
      <td>
       <span class="pill pill-red">
        🔴 异常
       </span>
      </td>
      <td class="font-bold text-red-600">
       7 笔
      </td>
      <td class="font-bold text-red-600">
       +$62.60
      </td>
      <td>
       <div class="flex items-center justify-center">
        <a class="text-blue-600 hover:text-blue-800 text-[12px] font-medium px-2 py-1 rounded hover:bg-blue-50 transition-colors text-blue-500 hover:text-blue-700" href="#">
         查看详情
        </a>
       </div>
      </td>
     </tr>
     <!-- 昨天批次（异常未清零） -->
     <tr class="bg-red-50/20">
      <td>
       2026-08-10
      </td>
      <td>
       391
      </td>
      <td class="font-mono font-semibold">
       $51,228.80
      </td>
      <td class="font-mono font-semibold">
       $51,370.40
      </td>
      <td>
       <span class="pill pill-red">
        🔴 异常
       </span>
      </td>
      <td class="font-bold text-red-600">
       3 笔
      </td>
      <td class="font-bold text-red-600">
       +$141.60
      </td>
      <td>
       <div class="flex items-center justify-center">
        <a class="text-blue-600 hover:text-blue-800 text-[12px] font-medium px-2 py-1 rounded hover:bg-blue-50 transition-colors text-blue-500 hover:text-blue-700" href="#">
         查看详情
        </a>
       </div>
      </td>
     </tr>
     <!-- 08-09 批次（正常） -->
     <tr>
      <td>
       2026-08-09
      </td>
      <td>
       418
      </td>
      <td class="font-mono">
       $58,394.10
      </td>
      <td class="font-mono">
       $58,394.10
      </td>
      <td>
       <span class="pill pill-green">
        ✅ 正常
       </span>
      </td>
      <td class="font-semibold text-emerald-700">
       0 笔
      </td>
      <td class="text-emerald-600 font-semibold">
       $0.00
      </td>
      <td>
       <div class="flex items-center justify-center">
        <a class="text-blue-600 hover:text-blue-800 text-[12px] font-medium px-2 py-1 rounded hover:bg-blue-50 transition-colors text-blue-500 hover:text-blue-700" href="#">
         查看详情
        </a>
       </div>
      </td>
     </tr>
     <!-- 08-08 批次（原4笔异常→线下处理完成→正常） -->
     <tr>
      <td>
       2026-08-08
      </td>
      <td>
       264
      </td>
      <td class="font-mono">
       $34,620.00
      </td>
      <td class="font-mono">
       $34,620.00
      </td>
      <td>
       <span class="pill pill-green">
        ✅ 正常
       </span>
      </td>
      <td class="font-semibold text-emerald-700">
       0 笔
      </td>
      <td class="text-emerald-600 font-semibold">
       $0.00
      </td>
      <td>
       <div class="flex items-center justify-center">
        <a class="text-blue-600 hover:text-blue-800 text-[12px] font-medium px-2 py-1 rounded hover:bg-blue-50 transition-colors text-blue-500 hover:text-blue-700" href="#">
         查看详情
        </a>
       </div>
      </td>
     </tr>
     <!-- 08-07 批次（正常） -->
     <tr>
      <td>
       2026-08-07
      </td>
      <td>
       302
      </td>
      <td class="font-mono">
       $40,088.25
      </td>
      <td class="font-mono">
       $40,088.25
      </td>
      <td>
       <span class="pill pill-green">
        ✅ 正常
       </span>
      </td>
      <td class="font-semibold text-emerald-700">
       0 笔
      </td>
      <td class="text-emerald-600 font-semibold">
       $0.00
      </td>
      <td>
       <div class="flex items-center justify-center">
        <a class="text-blue-600 hover:text-blue-800 text-[12px] font-medium px-2 py-1 rounded hover:bg-blue-50 transition-colors text-blue-500 hover:text-blue-700" href="#">
         查看详情
        </a>
       </div>
      </td>
     </tr>
     <!-- 08-06 批次（原9笔异常→线下处理完成→正常） -->
     <tr>
      <td>
       2026-08-06
      </td>
      <td>
       346
      </td>
      <td class="font-mono">
       $46,133.50
      </td>
      <td class="font-mono">
       $46,133.50
      </td>
      <td>
       <span class="pill pill-green">
        ✅ 正常
       </span>
      </td>
      <td class="font-semibold text-emerald-700">
       0 笔
      </td>
      <td class="text-emerald-600 font-semibold">
       $0.00
      </td>
      <td>
       <div class="flex items-center justify-center">
        <a class="text-blue-600 hover:text-blue-800 text-[12px] font-medium px-2 py-1 rounded hover:bg-blue-50 transition-colors text-blue-500 hover:text-blue-700" href="#">
         查看详情
        </a>
       </div>
      </td>
     </tr>
     <!-- 08-05 批次（正常） -->
     <tr>
      <td>
       2026-08-05
      </td>
      <td>
       312
      </td>
      <td class="font-mono">
       $41,285.80
      </td>
      <td class="font-mono">
       $41,285.80
      </td>
      <td>
       <span class="pill pill-green">
        ✅ 正常
       </span>
      </td>
      <td class="font-semibold text-emerald-700">
       0 笔
      </td>
      <td class="text-emerald-600 font-semibold">
       $0.00
      </td>
      <td>
       <div class="flex items-center justify-center">
        <a class="text-blue-600 hover:text-blue-800 text-[12px] font-medium px-2 py-1 rounded hover:bg-blue-50 transition-colors text-blue-500 hover:text-blue-700" href="#">
         查看详情
        </a>
       </div>
      </td>
     </tr>
    </tbody>
   </table>
  </div>
  <div class="flex items-center justify-between p-4 border-t border-gray-100 text-xs text-gray-500">
   <div>
    共 31 条记录，当前显示前 7 条
   </div>
   <div class="flex items-center gap-2">
    <button class="w-8 h-8 rounded border border-gray-200 hover:bg-gray-50 text-gray-500">
     <i class="fas fa-chevron-left text-[10px]">
     </i>
    </button>
    <button class="w-8 h-8 rounded bg-blue-600 text-white font-semibold">
     1
    </button>
    <button class="w-8 h-8 rounded border border-gray-200 hover:bg-gray-50 text-gray-600">
     2
    </button>
    <button class="w-8 h-8 rounded border border-gray-200 hover:bg-gray-50 text-gray-600">
     3
    </button>
    <button class="w-8 h-8 rounded border border-gray-200 hover:bg-gray-50 text-gray-600">
     5
    </button>
    <button class="w-8 h-8 rounded border border-gray-200 hover:bg-gray-50 text-gray-500">
     <i class="fas fa-chevron-right text-[10px]">
     </i>
    </button>
    <select class="custom-select w-[100px] ml-3">
     <option>
      20 条/页
     </option>
     <option>
      50 条/页
     </option>
     <option>
      100 条/页
     </option>
    </select>
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
