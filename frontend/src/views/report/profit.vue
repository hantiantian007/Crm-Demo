<template>
  <div class="flex h-full bg-mainBg overflow-hidden">
    <div class="flex-1 flex flex-col min-w-0 bg-gray-50 overflow-hidden p-4 custom-scrollbar overflow-y-auto">
      <div class="flex-1 p-4 bg-gray-50 flex gap-4 overflow-hidden">
 <!-- 左侧关系树 -->
 <div class="w-64 bg-white border border-gray-200 rounded shadow-sm flex flex-col shrink-0 overflow-hidden">
  <!-- 顶部操作区 -->
  <div class="p-3 border-b border-gray-100 flex gap-2 items-center bg-gray-50/50">
   <div class="flex-1 flex bg-white border border-gray-200 rounded overflow-hidden">
    <input class="w-full px-2 py-1.5 text-xs outline-none" placeholder="搜索代理/客户..." type="text"/>
    <button class="px-2 text-gray-400 hover:text-primary border-l border-gray-200">
     <i class="fas fa-search">
     </i>
    </button>
   </div>
  </div>
  <!-- 树列表 -->
  <div class="flex-1 overflow-y-auto p-2 text-[13px] text-gray-600">
   <!-- 节点: 华安 -->
   <div class="flex items-center justify-between py-1.5 px-2 hover:bg-gray-50 rounded cursor-pointer group" id="tree-285">
    <div class="flex items-center gap-2">
     <i class="fa-solid fa-caret-down text-gray-400 w-3 text-center cursor-pointer">
     </i>
     <span class="text-gray-700">
      285-华安
     </span>
    </div>
    <span class="text-[10px] text-blue-500 bg-blue-50 px-1.5 py-0.5 rounded">
     代理
    </span>
   </div>
   <!-- 节点: Luke -->
   <div class="flex items-center justify-between py-1.5 px-2 pl-6 hover:bg-gray-50 rounded cursor-pointer group">
    <div class="flex items-center gap-2">
     <i class="fa-solid fa-caret-right text-gray-300 w-3 text-center cursor-pointer">
     </i>
     <span class="text-gray-700">
      29-Luke
     </span>
    </div>
    <span class="text-[10px] text-blue-500 bg-blue-50 px-1.5 py-0.5 rounded">
     代理
    </span>
   </div>
   <!-- 节点: jack (Selected) -->
   <div class="flex items-center justify-between py-1.5 px-2 pl-6 bg-primary/10 rounded cursor-pointer group" id="tree-42">
    <div class="flex items-center gap-2">
     <i class="fa-solid fa-caret-down text-primary w-3 text-center cursor-pointer">
     </i>
     <span class="text-primary font-medium">
      42-jack
     </span>
    </div>
    <span class="text-[10px] text-primary bg-primary/20 px-1.5 py-0.5 rounded">
     代理
    </span>
   </div>
   <!-- 子节点 -->
   <div class="flex items-center justify-between py-1.5 px-2 pl-10 hover:bg-gray-50 rounded cursor-pointer group">
    <div class="flex items-center gap-2">
     <i class="fa-solid fa-circle text-gray-200 text-[6px] w-3 text-center">
     </i>
     <span class="text-gray-700">
      70-张生龙
     </span>
    </div>
    <span class="text-[10px] text-orange-500 bg-orange-50 px-1.5 py-0.5 rounded">
     直客
    </span>
   </div>
   <div class="flex items-center justify-between py-1.5 px-2 pl-10 hover:bg-gray-50 rounded cursor-pointer group">
    <div class="flex items-center gap-2">
     <i class="fa-solid fa-circle text-gray-200 text-[6px] w-3 text-center">
     </i>
     <span class="text-gray-700">
      319-黎富英
     </span>
    </div>
    <span class="text-[10px] text-orange-500 bg-orange-50 px-1.5 py-0.5 rounded">
     直客
    </span>
   </div>
   <div class="flex items-center justify-between py-1.5 px-2 pl-10 hover:bg-gray-50 rounded cursor-pointer group">
    <div class="flex items-center gap-2">
     <i class="fa-solid fa-circle text-gray-200 text-[6px] w-3 text-center">
     </i>
     <span class="text-gray-700">
      329-魏正博
     </span>
    </div>
    <span class="text-[10px] text-orange-500 bg-orange-50 px-1.5 py-0.5 rounded">
     直客
    </span>
   </div>
   <div class="flex items-center justify-between py-1.5 px-2 pl-10 hover:bg-gray-50 rounded cursor-pointer group">
    <div class="flex items-center gap-2">
     <i class="fa-solid fa-circle text-gray-200 text-[6px] w-3 text-center">
     </i>
     <span class="text-gray-700">
      468-孙敏宏
     </span>
    </div>
    <span class="text-[10px] text-blue-500 bg-blue-50 px-1.5 py-0.5 rounded">
     代理
    </span>
   </div>
   <div class="flex items-center justify-between py-1.5 px-2 pl-10 hover:bg-gray-50 rounded cursor-pointer group">
    <div class="flex items-center gap-2">
     <i class="fa-solid fa-circle text-gray-200 text-[6px] w-3 text-center">
     </i>
     <span class="text-gray-700">
      528-谢兰香
     </span>
    </div>
    <span class="text-[10px] text-blue-500 bg-blue-50 px-1.5 py-0.5 rounded">
     代理
    </span>
   </div>
   <!-- 其他节点 -->
   <div class="flex items-center justify-between py-1.5 px-2 pl-6 hover:bg-gray-50 rounded cursor-pointer group">
    <div class="flex items-center gap-2">
     <i class="fa-solid fa-caret-right text-gray-300 w-3 text-center cursor-pointer">
     </i>
     <span class="text-gray-700">
      43-汪晋霖
     </span>
    </div>
    <span class="text-[10px] text-blue-500 bg-blue-50 px-1.5 py-0.5 rounded">
     代理
    </span>
   </div>
   <div class="flex items-center justify-between py-1.5 px-2 pl-6 hover:bg-gray-50 rounded cursor-pointer group">
    <div class="flex items-center gap-2">
     <i class="fa-solid fa-caret-right text-gray-300 w-3 text-center cursor-pointer">
     </i>
     <span class="text-gray-700">
      161-Mikey
     </span>
    </div>
    <span class="text-[10px] text-blue-500 bg-blue-50 px-1.5 py-0.5 rounded">
     代理
    </span>
   </div>
   <!-- 直客示例 -->
   <div class="flex items-center justify-between py-1.5 px-2 hover:bg-gray-50 rounded cursor-pointer group">
    <div class="flex items-center gap-2">
     <i class="fa-solid fa-circle text-gray-200 text-[6px] w-3 text-center">
     </i>
     <span class="text-gray-700">
      30-张三
     </span>
    </div>
    <span class="text-[10px] text-orange-500 bg-orange-50 px-1.5 py-0.5 rounded">
     直客
    </span>
   </div>
   <div class="flex items-center justify-between py-1.5 px-2 hover:bg-gray-50 rounded cursor-pointer group">
    <div class="flex items-center gap-2">
     <i class="fa-solid fa-circle text-gray-200 text-[6px] w-3 text-center">
     </i>
     <span class="text-gray-700">
      55-ww3
     </span>
    </div>
    <span class="text-[10px] text-orange-500 bg-orange-50 px-1.5 py-0.5 rounded">
     直客
    </span>
   </div>
  </div>
 </div>
 <!-- 右侧详情与数据 -->
 <div class="flex-1 flex flex-col gap-4 overflow-hidden">
  <!-- 顶部控制栏 -->
  <div class="bg-white border border-gray-200 rounded p-4 shadow-sm shrink-0 flex items-center justify-between">
   <div class="flex items-center gap-6">
    <div class="flex items-center gap-2">
     <span class="text-sm font-medium text-gray-700">
      数据模式:
     </span>
     <div class="bg-gray-100 p-1 rounded-md flex text-sm">
      <button class="px-4 py-1.5 rounded bg-white text-primary shadow-sm font-medium transition-all" id="mode-realtime">
       实时数据
      </button>
      <button class="px-4 py-1.5 rounded text-gray-500 hover:text-gray-700 font-medium transition-all" id="mode-snapshot">
       历史快照
      </button>
     </div>
    </div>
    <div class="flex items-center gap-2" id="time-filter-wrap" style="display: none;">
     <span class="text-sm font-medium text-gray-700">
      时间:
     </span>
     <div class="flex items-center gap-2">
      <input class="px-3 py-1.5 text-sm outline-none border border-gray-200 rounded w-[150px] h-9 bg-white focus:border-primary focus:ring-1 focus:ring-primary/30 transition-colors" type="date" value="2026-08-01"/>
      <span class="text-gray-400 text-sm">
       至
      </span>
      <input class="px-3 py-1.5 text-sm outline-none border border-gray-200 rounded w-[150px] h-9 bg-white focus:border-primary focus:ring-1 focus:ring-primary/30 transition-colors" type="date" value="2026-08-19"/>
     </div>
    </div>
   </div>
   <div class="flex items-center gap-3">
    <button class="bg-white border border-gray-200 text-gray-600 hover:text-primary hover:border-primary px-4 py-2 rounded text-sm font-medium transition-colors flex items-center gap-2 shadow-sm">
     <i class="fa-solid fa-rotate-right">
     </i>
     刷新数据
    </button>
   </div>
  </div>
  <!-- 汇总数据卡片 -->
  <div class="bg-white border border-gray-200 rounded p-5 shadow-sm shrink-0">
   <h3 class="font-bold text-gray-800 mb-4 text-base flex items-center gap-2">
    <div class="w-1 h-4 bg-primary rounded">
    </div>
    伞下盈亏概况 (当前选中:
    <span id="summary-select-label">
     42-jack
    </span>
    )
   </h3>
   <div class="grid grid-cols-8 gap-x-0 gap-y-4 text-sm border border-gray-200 rounded overflow-hidden">
    <div class="flex flex-col gap-2 px-3 py-3 border-r border-gray-200 bg-gray-50/50">
     <span class="text-gray-500">
      净值
     </span>
     <span class="font-bold text-gray-800 text-lg" id="sum-equity">
      51,550.00
     </span>
    </div>
    <div class="flex flex-col gap-2 px-3 py-3 border-r border-gray-200 bg-gray-50/50">
     <span class="text-gray-500">
      結餘
     </span>
     <span class="font-bold text-gray-800 text-lg" id="sum-balance">
      50,000.00
     </span>
    </div>
    <div class="flex flex-col gap-2 px-3 py-3 border-r border-gray-200 bg-gray-50/50">
     <span class="text-gray-500">
      浮动盈亏
     </span>
     <span class="font-bold text-red-500 text-lg" id="sum-profit">
      -4,500.00
     </span>
    </div>
    <div class="flex flex-col gap-2 px-3 py-3 border-r border-gray-200 bg-gray-50/50">
     <span class="text-gray-500">
      信用
     </span>
     <span class="font-bold text-gray-800 text-lg" id="sum-credit">
      2,000.00
     </span>
    </div>
    <div class="flex flex-col gap-2 px-3 py-3 border-r border-gray-200 bg-gray-50/50">
     <span class="text-gray-500">
      手續費
     </span>
     <span class="font-bold text-gray-800 text-lg" id="sum-commission">
      85.00
     </span>
    </div>
    <div class="flex flex-col gap-2 px-3 py-3 border-r border-gray-200 bg-gray-50/50">
     <span class="text-gray-500">
      佣金
     </span>
     <span class="font-bold text-green-600 text-lg" id="sum-rebate">
      -120.00
     </span>
    </div>
    <div class="flex flex-col gap-2 px-3 py-3 border-r border-gray-200 bg-gray-50/50">
     <span class="text-gray-500">
      过夜利息
     </span>
     <span class="font-bold text-red-500 text-lg" id="sum-swap">
      -48.50
     </span>
    </div>
    <div class="flex flex-col gap-2 px-3 py-3 bg-gray-50/50">
     <span class="text-gray-500">
      平倉盈虧
     </span>
     <span class="font-bold text-green-600 text-lg" id="sum-closed">
      3,280.00
     </span>
    </div>
   </div>
  </div>
  <!-- 下半部分：下钻表格 -->
  <div class="bg-white border border-gray-200 rounded p-5 shadow-sm flex-1 flex flex-col overflow-hidden">
   <div class="flex items-center justify-between mb-4 shrink-0">
    <h3 class="font-bold text-gray-800 text-base flex items-center gap-2">
     <div class="w-1 h-4 bg-primary rounded">
     </div>
     代理/客户盈亏明细
    </h3>
    <button class="bg-primary hover:bg-primaryHover text-white px-4 py-1.5 rounded text-xs font-medium transition-colors flex items-center gap-1.5 shadow-sm">
     <i class="fa-solid fa-download">
     </i>
     导出列表
    </button>
   </div>
   <div class="flex-1 overflow-auto border border-gray-200 rounded relative">
    <table class="w-full text-sm text-left custom-table">
     <thead class="bg-tableHeader text-white sticky top-0 z-10">
      <tr>
       <th class="py-3 px-4 font-medium border border-primary/20 text-center min-w-[200px]">
        账号/名称
       </th>
       <th class="py-3 px-3 font-medium border border-primary/20 text-center min-w-[120px]">
        净值
       </th>
       <th class="py-3 px-3 font-medium border border-primary/20 text-center min-w-[120px]">
        結餘
       </th>
       <th class="py-3 px-3 font-medium border border-primary/20 text-center min-w-[130px]">
        浮动盈亏
       </th>
       <th class="py-3 px-3 font-medium border border-primary/20 text-center min-w-[120px]">
        信用
       </th>
       <th class="py-3 px-3 font-medium border border-primary/20 text-center min-w-[120px]">
        手续费
       </th>
       <th class="py-3 px-3 font-medium border border-primary/20 text-center min-w-[120px]">
        返佣
       </th>
       <th class="py-3 px-3 font-medium border border-primary/20 text-center min-w-[130px]">
        过夜利息
       </th>
      </tr>
     </thead>
     <tbody class="bg-white text-gray-700" id="table-body">
      <tr class="hover:bg-gray-50 transition-colors bg-gray-50/50 font-medium">
       <td class="border border-gray-200 py-2.5 px-4 text-center">
        <div class="flex items-center justify-center gap-2">
         <span class="inline-block w-1 h-4 bg-primary rounded">
         </span>
         <span>
          42-jack
         </span>
        </div>
       </td>
       <td class="border border-gray-200 py-2.5 px-3 text-center">
        4,600.00
       </td>
       <td class="border border-gray-200 py-2.5 px-3 text-center">
        5,000.00
       </td>
       <td class="border border-gray-200 py-2.5 px-3 text-center text-red-500">
        -5,000.00
       </td>
       <td class="border border-gray-200 py-2.5 px-3 text-center">
        100.00
       </td>
       <td class="border border-gray-200 py-2.5 px-3 text-center">
        5.50
       </td>
       <td class="border border-gray-200 py-2.5 px-3 text-center">
        -30.00
       </td>
       <td class="border border-gray-200 py-2.5 px-3 text-center text-red-500">
        -5.50
       </td>
      </tr>
      <tr class="hover:bg-gray-50 transition-colors">
       <td class="border border-gray-200 py-2.5 px-4 text-center pl-8">
        70-张生龙
       </td>
       <td class="border border-gray-200 py-2.5 px-3 text-center">
        1,840.00
       </td>
       <td class="border border-gray-200 py-2.5 px-3 text-center">
        1,020.00
       </td>
       <td class="border border-gray-200 py-2.5 px-3 text-center text-green-600">
        +200.00
       </td>
       <td class="border border-gray-200 py-2.5 px-3 text-center">
        800.00
       </td>
       <td class="border border-gray-200 py-2.5 px-3 text-center">
        2.00
       </td>
       <td class="border border-gray-200 py-2.5 px-3 text-center">
        -12.00
       </td>
       <td class="border border-gray-200 py-2.5 px-3 text-center">
        -0.80
       </td>
      </tr>
      <tr class="hover:bg-gray-50 transition-colors">
       <td class="border border-gray-200 py-2.5 px-4 text-center pl-8">
        319-黎富英
       </td>
       <td class="border border-gray-200 py-2.5 px-3 text-center">
        2,700.00
       </td>
       <td class="border border-gray-200 py-2.5 px-3 text-center">
        1,450.00
       </td>
       <td class="border border-gray-200 py-2.5 px-3 text-center text-green-600">
        +500.00
       </td>
       <td class="border border-gray-200 py-2.5 px-3 text-center">
        1,200.00
       </td>
       <td class="border border-gray-200 py-2.5 px-3 text-center">
        6.00
       </td>
       <td class="border border-gray-200 py-2.5 px-3 text-center">
        -18.00
       </td>
       <td class="border border-gray-200 py-2.5 px-3 text-center">
        -5.20
       </td>
      </tr>
      <tr class="hover:bg-gray-50 transition-colors">
       <td class="border border-gray-200 py-2.5 px-4 text-center pl-8">
        329-魏正博
       </td>
       <td class="border border-gray-200 py-2.5 px-3 text-center">
        200.00
       </td>
       <td class="border border-gray-200 py-2.5 px-3 text-center">
        1,000.00
       </td>
       <td class="border border-gray-200 py-2.5 px-3 text-center">
        -800.00
       </td>
       <td class="border border-gray-200 py-2.5 px-3 text-center">
        0.00
       </td>
       <td class="border border-gray-200 py-2.5 px-3 text-center">
        0.50
       </td>
       <td class="border border-gray-200 py-2.5 px-3 text-center">
        -5.00
       </td>
       <td class="border border-gray-200 py-2.5 px-3 text-center">
        -0.50
       </td>
      </tr>
      <tr class="hover:bg-gray-50 transition-colors">
       <td class="border border-gray-200 py-2.5 px-4 text-center pl-8">
        468-孙敏宏
       </td>
       <td class="border border-gray-200 py-2.5 px-3 text-center">
        8,580.00
       </td>
       <td class="border border-gray-200 py-2.5 px-3 text-center">
        8,500.00
       </td>
       <td class="border border-gray-200 py-2.5 px-3 text-center text-green-600">
        +800.00
       </td>
       <td class="border border-gray-200 py-2.5 px-3 text-center">
        0.00
       </td>
       <td class="border border-gray-200 py-2.5 px-3 text-center">
        18.00
       </td>
       <td class="border border-gray-200 py-2.5 px-3 text-center">
        -25.00
       </td>
       <td class="border border-gray-200 py-2.5 px-3 text-center">
        -4.00
       </td>
      </tr>
      <tr class="hover:bg-gray-50 transition-colors">
       <td class="border border-gray-200 py-2.5 px-4 text-center pl-8">
        528-谢兰香
       </td>
       <td class="border border-gray-200 py-2.5 px-3 text-center">
        33,630.00
       </td>
       <td class="border border-gray-200 py-2.5 px-3 text-center">
        33,030.00
       </td>
       <td class="border border-gray-200 py-2.5 px-3 text-center">
        -200.00
       </td>
       <td class="border border-gray-200 py-2.5 px-3 text-center">
        -100.00
       </td>
       <td class="border border-gray-200 py-2.5 px-3 text-center">
        53.00
       </td>
       <td class="border border-gray-200 py-2.5 px-3 text-center">
        -30.00
       </td>
       <td class="border border-gray-200 py-2.5 px-3 text-center text-red-500">
        -32.50
       </td>
      </tr>
     </tbody>
    </table>
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
