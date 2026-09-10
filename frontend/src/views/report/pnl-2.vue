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
   <div class="flex items-center justify-between py-1.5 px-2 hover:bg-gray-50 rounded cursor-pointer group">
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
   <div class="flex items-center justify-between py-1.5 px-2 pl-6 bg-blue-50 rounded cursor-pointer">
    <div class="flex items-center gap-2">
     <i class="fa-solid fa-caret-down text-primary w-3 text-center cursor-pointer">
     </i>
     <span class="text-primary font-medium">
      42-jack
     </span>
    </div>
    <span class="text-[10px] text-blue-600 bg-blue-100 px-1.5 py-0.5 rounded">
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
  <!-- 顶部控制栏 (快照/实时切换) -->
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
   <div class="flex items-center justify-between mb-4 cursor-pointer">
    <h3 class="font-bold text-gray-800 text-base flex items-center gap-2">
     <div class="w-1 h-4 bg-primary rounded">
     </div>
     全平台汇总
    </h3>
    <i class="fas fa-chevron-down text-gray-400 transition-transform duration-200 -rotate-90" id="globalSummaryIcon">
    </i>
   </div>
   <div class="grid grid-cols-4 md:grid-cols-5 gap-y-4 gap-x-4 text-sm hidden" id="globalSummary">
    <div class="flex flex-col gap-1">
     <span class="text-gray-500">
      总净值
     </span>
     <span class="font-bold text-gray-800 text-lg">
      305,000.00
     </span>
    </div>
    <div class="flex flex-col gap-1">
     <span class="text-gray-500">
      总结余
     </span>
     <span class="font-bold text-gray-800 text-lg">
      250,000.00
     </span>
    </div>
    <div class="flex flex-col gap-1">
     <span class="text-gray-500">
      浮动盈亏
     </span>
     <span class="font-bold text-green-600 text-lg">
      +5,000.00
     </span>
    </div>
    <div class="flex flex-col gap-1">
     <span class="text-gray-500">
      总信用
     </span>
     <span class="font-bold text-gray-800 text-lg">
      50,000.00
     </span>
    </div>
    <div class="flex flex-col gap-1">
     <span class="text-gray-500">
      平仓手数
     </span>
     <span class="font-bold text-gray-800 text-lg">
      120.00
     </span>
    </div>
    <div class="flex flex-col gap-1">
     <span class="text-gray-500">
      平仓笔数
     </span>
     <span class="font-bold text-gray-800 text-lg">
      350
     </span>
    </div>
    <div class="flex flex-col gap-1">
     <span class="text-gray-500">
      总手续费
     </span>
     <span class="font-bold text-gray-800 text-lg">
      -1,200.00
     </span>
    </div>
    <div class="flex flex-col gap-1">
     <span class="text-gray-500">
      总佣金
     </span>
     <span class="font-bold text-gray-800 text-lg">
      -800.00
     </span>
    </div>
    <div class="flex flex-col gap-1">
     <span class="text-gray-500">
      过夜利息
     </span>
     <span class="font-bold text-gray-800 text-lg">
      -300.00
     </span>
    </div>
    <div class="flex flex-col gap-1">
     <span class="text-gray-500">
      平仓盈亏
     </span>
     <span class="font-bold text-red-500 text-lg">
      -50,000.00
     </span>
    </div>
   </div>
  </div>
  <!-- 代理及伞下汇总数据卡片 -->
  <div class="bg-white border border-gray-200 rounded p-5 shadow-sm shrink-0">
   <div class="flex items-center justify-between mb-4 cursor-pointer">
    <h3 class="font-bold text-gray-800 text-base flex items-center gap-2">
     <div class="w-1 h-4 bg-primary rounded">
     </div>
     代理及伞下汇总 (当前选中: 42-jack)
    </h3>
    <i class="fas fa-chevron-down text-gray-400 transition-transform duration-200 -rotate-90" id="ibSummaryIcon">
    </i>
   </div>
   <div class="grid grid-cols-4 md:grid-cols-5 gap-y-4 gap-x-4 text-sm hidden" id="ibSummary">
    <div class="flex flex-col gap-1">
     <span class="text-gray-500">
      总净值
     </span>
     <span class="font-bold text-gray-800 text-lg">
      247,000.00
     </span>
    </div>
    <div class="flex flex-col gap-1">
     <span class="text-gray-500">
      总结余
     </span>
     <span class="font-bold text-gray-800 text-lg">
      200,000.00
     </span>
    </div>
    <div class="flex flex-col gap-1">
     <span class="text-gray-500">
      浮动盈亏
     </span>
     <span class="font-bold text-green-600 text-lg">
      +7,000.00
     </span>
    </div>
    <div class="flex flex-col gap-1">
     <span class="text-gray-500">
      总信用
     </span>
     <span class="font-bold text-gray-800 text-lg">
      40,000.00
     </span>
    </div>
    <div class="flex flex-col gap-1">
     <span class="text-gray-500">
      平仓手数
     </span>
     <span class="font-bold text-gray-800 text-lg">
      120.00
     </span>
    </div>
    <div class="flex flex-col gap-1">
     <span class="text-gray-500">
      平仓笔数
     </span>
     <span class="font-bold text-gray-800 text-lg">
      350
     </span>
    </div>
    <div class="flex flex-col gap-1">
     <span class="text-gray-500">
      总手续费
     </span>
     <span class="font-bold text-gray-800 text-lg">
      -700.00
     </span>
    </div>
    <div class="flex flex-col gap-1">
     <span class="text-gray-500">
      总佣金
     </span>
     <span class="font-bold text-gray-800 text-lg">
      -700.00
     </span>
    </div>
    <div class="flex flex-col gap-1">
     <span class="text-gray-500">
      过夜利息
     </span>
     <span class="font-bold text-gray-800 text-lg">
      -200.00
     </span>
    </div>
    <div class="flex flex-col gap-1">
     <span class="text-gray-500">
      平仓盈亏
     </span>
     <span class="font-bold text-red-500 text-lg">
      -60,000.00
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
   </div>
   <div class="flex-1 overflow-auto border border-gray-200 rounded relative">
    <table class="w-full text-sm text-left custom-table">
     <thead class="bg-tableHeader text-white sticky top-0 z-10">
      <tr>
       <th class="py-3 px-4 font-medium border border-primary/20 text-left min-w-[200px]">
        账号/名称
       </th>
       <th class="py-3 px-2 font-medium border border-primary/20 text-right">
        净值
       </th>
       <th class="py-3 px-2 font-medium border border-primary/20 text-right">
        结余
       </th>
       <th class="py-3 px-2 font-medium border border-primary/20 text-right">
        浮动盈亏
       </th>
       <th class="py-3 px-2 font-medium border border-primary/20 text-right">
        信用
       </th>
       <th class="py-3 px-2 font-medium border border-primary/20 text-right">
        平仓手数
       </th>
       <th class="py-3 px-2 font-medium border border-primary/20 text-right">
        平仓笔数
       </th>
       <th class="py-3 px-2 font-medium border border-primary/20 text-right">
        手续费
       </th>
       <th class="py-3 px-2 font-medium border border-primary/20 text-right">
        佣金
       </th>
       <th class="py-3 px-2 font-medium border border-primary/20 text-right">
        过夜利息
       </th>
       <th class="py-3 px-4 font-medium border border-primary/20 text-center w-24">
        操作
       </th>
      </tr>
     </thead>
     <tbody class="bg-white text-gray-700">
      <!-- Level 1: Selected Node (e.g. Master IB) -->
      <tr class="hover:bg-gray-50 transition-colors bg-gray-50/50 font-medium group">
       <td class="border border-gray-200 py-2.5 px-4 text-left">
        jack
       </td>
       <td class="border border-gray-200 py-2.5 px-2 text-right">
        247,000.00
       </td>
       <td class="border border-gray-200 py-2.5 px-2 text-right">
        200,000.00
       </td>
       <td class="border border-gray-200 py-2.5 px-2 text-right text-green-600">
        +7,000.00
       </td>
       <td class="border border-gray-200 py-2.5 px-2 text-right">
        40,000.00
       </td>
       <td class="border border-gray-200 py-2.5 px-2 text-right">
        120.00
       </td>
       <td class="border border-gray-200 py-2.5 px-2 text-right">
        350
       </td>
       <td class="border border-gray-200 py-2.5 px-2 text-right">
        -700.00
       </td>
       <td class="border border-gray-200 py-2.5 px-2 text-right">
        -700.00
       </td>
       <td class="border border-gray-200 py-2.5 px-2 text-right">
        -200.00
       </td>
       <td class="border border-gray-200 py-2.5 px-4 text-center">
        <button class="text-primary hover:text-primaryHover text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity text-blue-500 hover:text-blue-700">
         详情
        </button>
       </td>
      </tr>
      <!-- Level 2: Direct Child (Client) -->
      <tr class="hover:bg-gray-50 transition-colors group">
       <td class="border border-gray-200 py-2.5 px-4 text-left">
        张生龙
       </td>
       <td class="border border-gray-200 py-2.5 px-2 text-right">
        102,000.00
       </td>
       <td class="border border-gray-200 py-2.5 px-2 text-right">
        80,000.00
       </td>
       <td class="border border-gray-200 py-2.5 px-2 text-right text-green-600">
        +2,000.00
       </td>
       <td class="border border-gray-200 py-2.5 px-2 text-right">
        20,000.00
       </td>
       <td class="border border-gray-200 py-2.5 px-2 text-right">
        50.00
       </td>
       <td class="border border-gray-200 py-2.5 px-2 text-right">
        120
       </td>
       <td class="border border-gray-200 py-2.5 px-2 text-right">
        -400.00
       </td>
       <td class="border border-gray-200 py-2.5 px-2 text-right">
        -400.00
       </td>
       <td class="border border-gray-200 py-2.5 px-2 text-right">
        -150.00
       </td>
       <td class="border border-gray-200 py-2.5 px-4 text-center">
        <button class="text-primary hover:text-primaryHover text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity text-blue-500 hover:text-blue-700">
         详情
        </button>
       </td>
      </tr>
      <!-- Level 2: Direct Child (Client) -->
      <tr class="hover:bg-gray-50 transition-colors group">
       <td class="border border-gray-200 py-2.5 px-4 text-left">
        黎富英
       </td>
       <td class="border border-gray-200 py-2.5 px-2 text-right">
        145,000.00
       </td>
       <td class="border border-gray-200 py-2.5 px-2 text-right">
        120,000.00
       </td>
       <td class="border border-gray-200 py-2.5 px-2 text-right text-green-600">
        +5,000.00
       </td>
       <td class="border border-gray-200 py-2.5 px-2 text-right">
        20,000.00
       </td>
       <td class="border border-gray-200 py-2.5 px-2 text-right">
        70.00
       </td>
       <td class="border border-gray-200 py-2.5 px-2 text-right">
        230
       </td>
       <td class="border border-gray-200 py-2.5 px-2 text-right">
        -300.00
       </td>
       <td class="border border-gray-200 py-2.5 px-2 text-right">
        -300.00
       </td>
       <td class="border border-gray-200 py-2.5 px-2 text-right">
        -50.00
       </td>
       <td class="border border-gray-200 py-2.5 px-4 text-center">
        <button class="text-primary hover:text-primaryHover text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity text-blue-500 hover:text-blue-700">
         详情
        </button>
       </td>
      </tr>
      <!-- Level 2: Direct Child (Client) -->
      <tr class="hover:bg-gray-50 transition-colors group">
       <td class="border border-gray-200 py-2.5 px-4 text-left">
        魏正博
       </td>
       <td class="border border-gray-200 py-2.5 px-2 text-right">
        0.00
       </td>
       <td class="border border-gray-200 py-2.5 px-2 text-right">
        0.00
       </td>
       <td class="border border-gray-200 py-2.5 px-2 text-right text-gray-500">
        0.00
       </td>
       <td class="border border-gray-200 py-2.5 px-2 text-right">
        0.00
       </td>
       <td class="border border-gray-200 py-2.5 px-2 text-right">
        0.00
       </td>
       <td class="border border-gray-200 py-2.5 px-2 text-right">
        0
       </td>
       <td class="border border-gray-200 py-2.5 px-2 text-right">
        0.00
       </td>
       <td class="border border-gray-200 py-2.5 px-2 text-right">
        0.00
       </td>
       <td class="border border-gray-200 py-2.5 px-2 text-right">
        0.00
       </td>
       <td class="border border-gray-200 py-2.5 px-4 text-center">
        <button class="text-primary hover:text-primaryHover text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity text-blue-500 hover:text-blue-700">
         详情
        </button>
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
