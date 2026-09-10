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
    <button class="px-2 text-gray-400 hover:text-[#d1a84f] border-l border-gray-200">
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
   <div class="flex items-center justify-between py-1.5 px-2 pl-6 bg-[#d1a84f]/10 rounded cursor-pointer group" id="tree-42">
    <div class="flex items-center gap-2">
     <i class="fa-solid fa-caret-down text-[#d1a84f] w-3 text-center cursor-pointer">
     </i>
     <span class="text-[#d1a84f] font-medium">
      42-jack
     </span>
    </div>
    <span class="text-[10px] text-[#d1a84f] bg-[#d1a84f]/20 px-1.5 py-0.5 rounded">
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
 <!-- 右侧详情与数据 -->
 <div class="flex-1 flex flex-col gap-4 overflow-y-auto no-scrollbar">
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
    <div class="flex items-center gap-2">
     <span class="text-sm font-medium text-gray-700">
      时间:
     </span>
     <div class="flex items-center border border-gray-200 rounded overflow-hidden relative group" id="time-selector-container">
      <button class="px-3 py-1.5 text-sm bg-gray-50 text-gray-400 border-r border-gray-200 cursor-not-allowed transition-colors" id="btn-today">
       今日
      </button>
      <button class="px-3 py-1.5 text-sm bg-gray-50 text-gray-400 font-medium border-r border-gray-200 cursor-not-allowed transition-colors" id="btn-month">
       本月
      </button>
      <div class="px-3 py-1.5 text-sm text-gray-400 bg-gray-50 flex items-center gap-2 cursor-not-allowed transition-colors" id="btn-custom">
       <span id="time-text">
        实时统计 (本月1日至当前)
       </span>
       <i class="fa-regular fa-calendar text-gray-300" id="time-icon">
       </i>
      </div>
     </div>
    </div>
   </div>
   <div class="flex items-center gap-3">
    <button class="bg-white border border-gray-200 text-gray-600 hover:text-primary hover:border-primary px-4 py-2 rounded text-sm font-medium transition-colors flex items-center gap-2 shadow-sm">
     <i class="fa-solid fa-rotate-right">
     </i>
     刷新数据
    </button>
    <button class="bg-primary hover:bg-primaryHover text-white px-4 py-2 rounded text-sm font-medium transition-colors flex items-center gap-2 shadow-sm">
     <i class="fa-solid fa-download">
     </i>
     导出报表
    </button>
   </div>
  </div>
  <!-- 汇总数据卡片 -->
  <div class="bg-white border border-gray-200 rounded p-5 shadow-sm shrink-0">
   <h3 class="font-bold text-gray-800 mb-4 text-base flex items-center gap-2">
    <div class="w-1 h-4 bg-primary rounded">
    </div>
    伞下持仓概况 (当前选中: 42-jack / XAUUSD)
   </h3>
   <div class="grid grid-cols-6 gap-y-4 gap-x-4 text-sm">
    <div class="flex flex-col gap-1">
     <span class="text-gray-500">
      当前总多头 (Buy)
     </span>
     <span class="font-bold text-gray-800 text-lg">
      1,250.50 手
     </span>
    </div>
    <div class="flex flex-col gap-1">
     <span class="text-gray-500">
      当前总空头 (Sell)
     </span>
     <span class="font-bold text-gray-800 text-lg">
      850.00 手
     </span>
    </div>
    <div class="flex flex-col gap-1">
     <span class="text-gray-500">
      净敞口 (Net Exposure)
     </span>
     <span class="font-bold text-red-500 text-lg">
      400.50 手
     </span>
    </div>
    <div class="flex flex-col gap-1">
     <span class="text-gray-500">
      敞口方向
     </span>
     <span class="font-bold text-red-500 text-lg">
      多头 (Buy)
     </span>
    </div>
    <div class="flex flex-col gap-1">
     <span class="text-gray-500">
      平台浮动盈亏
     </span>
     <span class="font-bold text-red-500 text-lg">
      -125,000.00
     </span>
    </div>
    <div class="flex flex-col gap-1">
     <span class="text-gray-500">
      高风险品种数
     </span>
     <span class="font-bold text-red-500 text-lg">
      2
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
     品种/代理持仓明细
    </h3>
    <div class="flex items-center gap-4">
     <div class="flex items-center gap-2 text-sm text-gray-600">
      <span class="w-2 h-2 rounded-full bg-red-500">
      </span>
      <span class="text-xs">
       单边敞口预警
      </span>
     </div>
    </div>
   </div>
   <div class="flex-1 overflow-auto border border-gray-200 rounded relative">
    <table class="w-full text-sm text-left custom-table">
     <thead class="bg-tableHeader text-white sticky top-0 z-10">
      <tr>
       <th class="py-3 px-4 font-medium border border-primary/20 text-left min-w-[200px]">
        账号/名称 (品种/代理/客户)
       </th>
       <th class="py-3 px-2 font-medium border border-primary/20 text-right">
        多头手数 (Buy)
       </th>
       <th class="py-3 px-2 font-medium border border-primary/20 text-right">
        多头均价
       </th>
       <th class="py-3 px-2 font-medium border border-primary/20 text-right">
        空头手数 (Sell)
       </th>
       <th class="py-3 px-2 font-medium border border-primary/20 text-right">
        空头均价
       </th>
       <th class="py-3 px-2 font-medium border border-primary/20 text-right">
        净头寸敞口
       </th>
       <th class="py-3 px-2 font-medium border border-primary/20 text-center">
        敞口方向
       </th>
       <th class="py-3 px-2 font-medium border border-primary/20 text-right">
        当前市价
       </th>
       <th class="py-3 px-2 font-medium border border-primary/20 text-right">
        浮动盈亏
       </th>
      </tr>
     </thead>
     <tbody class="bg-white text-gray-700">
      <!-- Level 1: Selected Node -->
      <tr class="hover:bg-red-50 transition-colors bg-red-50/30 font-medium border-l-2 border-l-red-500">
       <td class="border border-gray-200 py-2.5 px-4 text-left">
        jack
       </td>
       <td class="border border-gray-200 py-2.5 px-2 text-right text-green-600">
        250.00
       </td>
       <td class="border border-gray-200 py-2.5 px-2 text-right">
        2349.50
       </td>
       <td class="border border-gray-200 py-2.5 px-2 text-right text-red-500">
        100.00
       </td>
       <td class="border border-gray-200 py-2.5 px-2 text-right">
        2346.00
       </td>
       <td class="border border-gray-200 py-2.5 px-2 text-right">
        150.00
       </td>
       <td class="border border-gray-200 py-2.5 px-2 text-center text-red-500">
        多头
       </td>
       <td class="border border-gray-200 py-2.5 px-2 text-right">
        -
       </td>
       <td class="border border-gray-200 py-2.5 px-2 text-right text-red-500">
        -237,500.00
       </td>
      </tr>
      <!-- Level 2: Direct Child (Client) -->
      <tr class="hover:bg-gray-50 transition-colors">
       <td class="border border-gray-200 py-2.5 px-4 text-left">
        张生龙
       </td>
       <td class="border border-gray-200 py-2.5 px-2 text-right text-green-600">
        100.00
       </td>
       <td class="border border-gray-200 py-2.5 px-2 text-right">
        2348.00
       </td>
       <td class="border border-gray-200 py-2.5 px-2 text-right text-red-500">
        50.00
       </td>
       <td class="border border-gray-200 py-2.5 px-2 text-right">
        2347.00
       </td>
       <td class="border border-gray-200 py-2.5 px-2 text-right">
        50.00
       </td>
       <td class="border border-gray-200 py-2.5 px-2 text-center text-red-500">
        多头
       </td>
       <td class="border border-gray-200 py-2.5 px-2 text-right">
        -
       </td>
       <td class="border border-gray-200 py-2.5 px-2 text-right text-red-500">
        -115,000.00
       </td>
      </tr>
      <!-- Level 2: Direct Child (Client) -->
      <tr class="hover:bg-gray-50 transition-colors">
       <td class="border border-gray-200 py-2.5 px-4 text-left">
        黎富英
       </td>
       <td class="border border-gray-200 py-2.5 px-2 text-right text-green-600">
        150.00
       </td>
       <td class="border border-gray-200 py-2.5 px-2 text-right">
        2350.50
       </td>
       <td class="border border-gray-200 py-2.5 px-2 text-right text-red-500">
        50.00
       </td>
       <td class="border border-gray-200 py-2.5 px-2 text-right">
        2345.00
       </td>
       <td class="border border-gray-200 py-2.5 px-2 text-right">
        100.00
       </td>
       <td class="border border-gray-200 py-2.5 px-2 text-center text-red-500">
        多头
       </td>
       <td class="border border-gray-200 py-2.5 px-2 text-right">
        -
       </td>
       <td class="border border-gray-200 py-2.5 px-2 text-right text-red-500">
        -122,500.00
       </td>
      </tr>
      <!-- Level 2: Direct Child (Client) -->
      <tr class="hover:bg-gray-50 transition-colors">
       <td class="border border-gray-200 py-2.5 px-4 text-left">
        魏正博
       </td>
       <td class="border border-gray-200 py-2.5 px-2 text-right text-green-600">
        0.00
       </td>
       <td class="border border-gray-200 py-2.5 px-2 text-right">
        -
       </td>
       <td class="border border-gray-200 py-2.5 px-2 text-right text-red-500">
        0.00
       </td>
       <td class="border border-gray-200 py-2.5 px-2 text-right">
        -
       </td>
       <td class="border border-gray-200 py-2.5 px-2 text-right">
        0.00
       </td>
       <td class="border border-gray-200 py-2.5 px-2 text-center text-gray-500">
        无敞口
       </td>
       <td class="border border-gray-200 py-2.5 px-2 text-right">
        -
       </td>
       <td class="border border-gray-200 py-2.5 px-2 text-right text-gray-500">
        0.00
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
