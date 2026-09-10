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
  <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
   <div class="flex items-center justify-between mb-5">
    <h3 class="font-bold text-gray-800 text-[15px]">
     搜索
    </h3>
    <button class="flex items-center gap-2 text-xs font-medium text-gray-500 hover:text-gray-700 transition-colors">
     <span>
      收起搜索条件
     </span>
     <i class="fas fa-chevron-up transition-transform">
     </i>
    </button>
   </div>
   <div class="grid grid-cols-4 gap-4 mb-4">
    <div class="flex items-center">
     <label class="text-[13px] text-gray-600 w-24 shrink-0 text-right mr-3">
      MT交易账号:
     </label>
     <input class="custom-input" placeholder="请输入" type="text"/>
    </div>
    <div class="flex items-center">
     <label class="text-[13px] text-gray-600 w-24 shrink-0 text-right mr-3">
      平台客户姓名:
     </label>
     <input class="custom-input" placeholder="请输入" type="text"/>
    </div>
    <div class="flex items-center">
     <label class="text-[13px] text-gray-600 w-24 shrink-0 text-right mr-3">
      平台客户邮箱:
     </label>
     <input class="custom-input" placeholder="请输入" type="text"/>
    </div>
    <div class="flex items-center justify-end gap-3">
     <button class="bg-primaryBtn hover:bg-primaryBtnHover text-white px-6 py-1.5 rounded text-[13px] transition-colors shadow-sm">
      查询
     </button>
     <button class="bg-white hover:bg-gray-50 text-gray-600 border border-gray-200 px-6 py-1.5 rounded text-[13px] transition-colors shadow-sm">
      重置
     </button>
    </div>
   </div>
   <div class="grid grid-cols-4 gap-4 mb-4">
    <div class="flex items-center">
     <label class="text-[13px] text-gray-600 w-24 shrink-0 text-right mr-3">
      查询范围:
     </label>
     <select class="custom-select">
      <option>
       全部
      </option>
      <option>
       直属返佣
      </option>
      <option>
       代理返佣
      </option>
     </select>
    </div>
    <div class="flex items-center">
     <label class="text-[13px] text-gray-600 w-24 shrink-0 text-right mr-3">
      平台信息:
     </label>
     <input class="custom-input" placeholder="请输入" type="text"/>
    </div>
    <div class="flex items-center">
     <label class="text-[13px] text-gray-600 w-24 shrink-0 text-right mr-3">
      交易品种:
     </label>
     <select class="custom-select">
      <option>
       请选择
      </option>
      <option>
       XAUUSD
      </option>
      <option>
       EURUSD
      </option>
      <option>
       USDJPY
      </option>
      <option>
       BTCUSD
      </option>
     </select>
    </div>
    <div class="flex items-center">
     <label class="text-[13px] text-gray-600 w-24 shrink-0 text-right mr-3">
      MT返佣账号:
     </label>
     <input class="custom-input" placeholder="请输入" type="text"/>
    </div>
   </div>
   <div class="grid grid-cols-4 gap-4 mb-4">
    <div class="flex items-center">
     <label class="text-[13px] text-gray-600 w-24 shrink-0 text-right mr-3">
      返佣客户姓名:
     </label>
     <input class="custom-input" placeholder="请输入" type="text"/>
    </div>
    <div class="flex items-center">
     <label class="text-[13px] text-gray-600 w-24 shrink-0 text-right mr-3">
      返佣客户邮箱:
     </label>
     <input class="custom-input" placeholder="请输入" type="text"/>
    </div>
    <div class="flex items-center">
     <label class="text-[13px] text-gray-600 w-24 shrink-0 text-right mr-3">
      开仓单号:
     </label>
     <input class="custom-input" placeholder="请输入" type="text"/>
    </div>
    <div class="flex items-center">
     <label class="text-[13px] text-gray-600 w-24 shrink-0 text-right mr-3">
      返佣状态:
     </label>
     <select class="custom-select text-gray-400">
      <option>
       请选择
      </option>
      <option>
       已结算
      </option>
      <option>
       待结算
      </option>
     </select>
    </div>
   </div>
   <div class="grid grid-cols-4 gap-4 mb-4">
    <div class="flex items-center">
     <label class="text-[13px] text-gray-600 w-24 shrink-0 text-right mr-3">
      关系树查询:
     </label>
     <select class="custom-select text-gray-400">
      <option>
       请选择
      </option>
     </select>
    </div>
    <div class="flex items-center">
     <label class="text-[13px] text-red-600 w-24 shrink-0 text-right mr-3 font-semibold">
      账户类型:
     </label>
     <select class="custom-select text-red-600 border-red-300">
      <option>
       全部
      </option>
      <option>
       标准账户
      </option>
      <option>
       美分账户
      </option>
     </select>
    </div>
    <div class="flex items-center">
     <label class="text-[13px] text-gray-600 w-24 shrink-0 text-right mr-3">
      返佣状态:
     </label>
     <select class="custom-select text-gray-400">
      <option>
       请选择
      </option>
      <option>
       已结算
      </option>
      <option>
       待结转
      </option>
     </select>
    </div>
    <div>
    </div>
   </div>
   <div class="grid grid-cols-4 gap-4">
    <div class="flex items-center col-span-2">
     <label class="text-[13px] text-gray-600 w-24 shrink-0 text-right mr-3">
      返佣日期:
     </label>
     <div class="flex items-center w-full">
      <select class="custom-select rounded-r-none border-r-0 max-w-[110px]">
       <option>
        系统时间
       </option>
      </select>
      <input class="custom-input rounded-none border-r-0 text-center" placeholder="开始日期" type="text"/>
      <span class="px-3 py-[8px] bg-gray-50 border-y border-gray-200 text-[13px] text-gray-400">
       到
      </span>
      <input class="custom-input rounded-l-none border-l-0 text-center" placeholder="结束日期" type="text"/>
     </div>
    </div>
   </div>
  </div>
  <div class="bg-white rounded-xl shadow-sm border border-gray-100 flex flex-col flex-1">
   <div class="p-5 border-b border-gray-100">
    <div class="flex justify-between items-center flex-wrap gap-3">
     <div class="flex items-center gap-6 text-[13px] flex-wrap">
      <div class="font-bold text-gray-800 text-[15px] mr-2">
       汇总统计
      </div>
      <div class="text-red-600 summary-stat">
       <span class="font-semibold">
        返佣金额(USD):
       </span>
       <span class="font-bold text-lg">
        61,637.37
       </span>
      </div>
      <div class="text-red-600 summary-stat">
       <span class="font-semibold">
        标准账户返佣手数:
       </span>
       <span class="font-bold text-lg">
        7,481.20
       </span>
      </div>
      <div class="text-red-600 summary-stat">
       <span class="font-semibold">
        美分账户返佣手数:
       </span>
       <span class="font-bold text-lg">
        8.16
       </span>
      </div>
     </div>
     <div class="flex gap-2">
      <button class="bg-primaryBtn hover:bg-primaryBtnHover text-white px-5 py-2 rounded text-[13px] transition-colors shadow-sm">
       报表导出
      </button>
     </div>
    </div>
   </div>
   <div class="overflow-x-auto flex-1">
    <table class="min-w-[1800px] custom-table">
     <thead class="bg-tableHeader">
      <tr>
       <th class="w-8 text-left">
       </th>
       <th class="text-left">
        开仓单号
       </th>
       <th class="text-left">
        开仓订单编号
       </th>
       <th class="text-left">
        平台编号
       </th>
       <th class="text-left">
        平台订单编号
       </th>
       <th class="text-left">
        MT交易账号
       </th>
       <th class="text-left">
        账户类型
       </th>
       <th class="text-left">
        账户名称
       </th>
       <th class="text-left">
        账户邮箱
       </th>
       <th class="text-left">
        MT返佣账号
       </th>
       <th class="text-left">
        返佣客户姓名
       </th>
       <th class="text-left">
        返佣客户邮箱
       </th>
       <th class="text-left">
        手数
       </th>
       <th class="text-left">
        平台手数
       </th>
       <th class="text-left">
        交易品种
       </th>
       <th class="text-left">
        返佣金额(USD)
       </th>
      </tr>
     </thead>
     <tbody id="rebateTbody">
     </tbody>
    </table>
   </div>
   <div class="px-5 py-4 flex items-center justify-between text-xs text-gray-500 border-t border-gray-100">
    <div>
     15条 / 页　共
     <span id="totalRows">
      0
     </span>
     记录，第1/1页
    </div>
    <div class="flex items-center gap-2">
     <button class="w-7 h-7 rounded border border-gray-200 bg-white text-gray-400">
      &lt;
     </button>
     <button class="w-7 h-7 rounded bg-primaryBtn text-white">
      1
     </button>
     <button class="w-7 h-7 rounded border border-gray-200 bg-white text-gray-400">
      &gt;
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
