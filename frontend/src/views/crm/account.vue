<template>
  <div class="flex h-full bg-mainBg overflow-hidden w-full">
    <div class="flex-1 flex flex-col min-w-0 bg-gray-50 overflow-hidden p-4 custom-scrollbar overflow-y-auto w-full">
      <div class="flex-1 p-6 overflow-y-auto bg-white m-4 rounded-lg shadow-sm border border-gray-100 flex flex-col">
 <div class="flex justify-end gap-2 mb-4">
  <a class="px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-600 rounded text-xs font-medium transition-colors flex items-center" data-prd-drawer="" data-prd-title="账户管理页面PRD" href="#">
   <i class="fas fa-file-alt mr-1.5">
   </i>
   查看页面PRD
  </a>
  <a class="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded text-xs font-medium transition-colors flex items-center" href="#">
   <i class="fas fa-arrow-left mr-1.5">
   </i>
   返回需求看板
  </a>
 </div>
 <div class="bg-white p-6 rounded shadow-sm mb-6 border border-gray-100">
  <div class="flex justify-between items-center mb-4">
   <h2 class="text-base font-bold text-gray-800">
    搜索
   </h2>
  </div>
  <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-6 gap-4 text-sm">
   <div class="flex items-center gap-2 xl:col-span-2">
    <span class="text-gray-600 text-right w-[80px] shrink-0">
     查询范围：
    </span>
    <div class="flex flex-1 gap-2">
     <select class="border border-gray-300 rounded px-2 py-2 outline-none w-24 text-gray-600">
      <option>
       伞下
      </option>
     </select>
     <select class="border border-gray-300 rounded px-2 py-2 outline-none flex-1 text-gray-400">
      <option>
       请选择上级
      </option>
     </select>
    </div>
   </div>
   <div class="flex items-center gap-2">
    <span class="text-gray-600 text-right w-[70px] shrink-0">
     MT账号：
    </span>
    <input class="border border-gray-300 rounded px-3 py-2 outline-none flex-1" placeholder="MT账号" type="text"/>
   </div>
   <div class="flex items-center gap-2">
    <span class="text-gray-600 text-right w-[55px] shrink-0">
     邮箱：
    </span>
    <input class="border border-gray-300 rounded px-3 py-2 outline-none flex-1" placeholder="邮箱" type="text"/>
   </div>
   <div class="flex items-center gap-2">
    <span class="text-gray-600 text-right w-[55px] shrink-0">
     姓名：
    </span>
    <input class="border border-gray-300 rounded px-3 py-2 outline-none flex-1" placeholder="姓名" type="text"/>
   </div>
   <div class="flex items-center gap-2">
    <span class="text-right w-[82px] shrink-0 change-highlight">
     账户类型：
    </span>
    <select class="border rounded px-2 py-2 outline-none flex-1 change-highlight change-border">
     <option>
      全部
     </option>
     <option>
      标准账户
     </option>
     <option>
      佣金账户
     </option>
     <option>
      美分账户
     </option>
    </select>
   </div>
   <div class="flex items-center gap-2 xl:col-span-2">
    <span class="text-gray-600 text-right w-[80px] shrink-0">
     开户日期：
    </span>
    <div class="flex flex-1 items-center border border-gray-300 rounded overflow-hidden">
     <input class="px-3 py-2 outline-none flex-1 text-center text-gray-400" placeholder="开始日期" type="text"/>
     <span class="bg-gray-50 px-2 py-2 text-gray-400 border-x border-gray-300">
      到
     </span>
     <input class="px-3 py-2 outline-none flex-1 text-center text-gray-400" placeholder="结束日期" type="text"/>
    </div>
   </div>
   <div class="flex items-center gap-3 xl:col-span-4 justify-end">
    <button class="bg-[#C4A373] hover:bg-[#b09063] text-white px-6 py-2 rounded transition-colors shadow-sm">
     搜索
    </button>
    <button class="bg-white border border-gray-300 text-gray-600 hover:bg-gray-50 px-6 py-2 rounded transition-colors shadow-sm">
     重置
    </button>
   </div>
  </div>
 </div>
 <div class="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden flex-1 flex flex-col">
  <div class="px-5 py-4 border-b border-gray-100">
   <a class="inline-flex items-center rounded bg-[#C4A373] px-4 py-2 text-sm font-medium text-white hover:bg-[#b09063] transition-colors" href="#">
    MT开户
   </a>
  </div>
  <div class="overflow-x-auto flex-1">
   <table class="w-full text-sm whitespace-nowrap">
    <thead class="bg-white sticky top-0 z-10 border-b border-gray-100 text-gray-500">
     <tr>
      <th class="text-left font-medium px-5 py-4">
       所属用户
      </th>
      <th class="text-left font-medium px-5 py-4">
       客户类型
      </th>
      <th class="text-left font-medium px-5 py-4">
       MT账户
      </th>
      <th class="text-left font-medium px-5 py-4">
       账户属性
      </th>
      <th class="text-left font-medium px-5 py-4 change-highlight">
       账户类型
      </th>
      <th class="text-left font-medium px-5 py-4">
       杠杆
      </th>
      <th class="text-left font-medium px-5 py-4">
       余额
      </th>
      <th class="text-left font-medium px-5 py-4">
       净值
      </th>
      <th class="text-left font-medium px-5 py-4">
       佣金
      </th>
      <th class="text-left font-medium px-5 py-4">
       可用预付款
      </th>
      <th class="text-left font-medium px-5 py-4">
       比例
      </th>
      <th class="text-left font-medium px-5 py-4">
       入金金额
      </th>
      <th class="text-left font-medium px-5 py-4">
       出金金额
      </th>
      <th class="text-left font-medium px-5 py-4">
       交易量
      </th>
      <th class="text-left font-medium px-5 py-4">
       持仓
      </th>
      <th class="text-left font-medium px-5 py-4">
       交易类别
      </th>
      <th class="text-left font-medium px-5 py-4">
       代理佣金
      </th>
     </tr>
    </thead>
    <tbody class="text-gray-700">
     <tr class="border-b border-gray-50 hover:bg-gray-50 transition-colors">
      <td class="px-5 py-4">
       <span class="text-red-500 mr-2">
        ›
       </span>
       <span class="text-blue-500 hover:underline cursor-pointer">
        test-杨均
       </span>
      </td>
      <td class="px-5 py-4">
       直客客户
      </td>
      <td class="px-5 py-4">
       8100458
      </td>
      <td class="px-5 py-4">
       交易
      </td>
      <td class="px-5 py-4 change-highlight">
       标准账户
      </td>
      <td class="px-5 py-4">
       1:100
      </td>
      <td class="px-5 py-4">
       1,990.90
       <span class="table-cell-sub change-highlight">
        USD/美元
       </span>
      </td>
      <td class="px-5 py-4">
       1,990.90
       <span class="table-cell-sub change-highlight">
        USD/美元
       </span>
      </td>
      <td class="px-5 py-4">
       0.00
       <span class="table-cell-sub change-highlight">
        USD/美元
       </span>
      </td>
      <td class="px-5 py-4">
       1,990.90
       <span class="table-cell-sub change-highlight">
        USD/美元
       </span>
      </td>
      <td class="px-5 py-4">
       0
      </td>
      <td class="px-5 py-4">
       2,000.00
       <span class="table-cell-sub change-highlight">
        USD/美元
       </span>
      </td>
      <td class="px-5 py-4">
       0.00
       <span class="table-cell-sub change-highlight">
        USD/美元
       </span>
      </td>
      <td class="px-5 py-4">
       0.25
      </td>
      <td class="px-5 py-4">
       0
      </td>
      <td class="px-5 py-4">
       正常
      </td>
      <td class="px-5 py-4">
       正常
      </td>
     </tr>
     <tr class="border-b border-gray-50 hover:bg-gray-50 transition-colors">
      <td class="px-5 py-4">
       <span class="text-red-500 mr-2">
        ›
       </span>
       <span class="text-blue-500 hover:underline cursor-pointer">
        test-杨均
       </span>
      </td>
      <td class="px-5 py-4">
       代理
      </td>
      <td class="px-5 py-4">
       8300255
      </td>
      <td class="px-5 py-4">
       佣金
      </td>
      <td class="px-5 py-4 change-highlight">
       佣金账户
      </td>
      <td class="px-5 py-4">
       1:100
      </td>
      <td class="px-5 py-4">
       3.0000
       <span class="table-cell-sub change-highlight">
        USD/美元
       </span>
      </td>
      <td class="px-5 py-4">
       3.0000
       <span class="table-cell-sub change-highlight">
        USD/美元
       </span>
      </td>
      <td class="px-5 py-4">
       0.0000
       <span class="table-cell-sub change-highlight">
        USD/美元
       </span>
      </td>
      <td class="px-5 py-4">
       3.0000
       <span class="table-cell-sub change-highlight">
        USD/美元
       </span>
      </td>
      <td class="px-5 py-4">
       0
      </td>
      <td class="px-5 py-4">
       0.0000
       <span class="table-cell-sub change-highlight">
        USD/美元
       </span>
      </td>
      <td class="px-5 py-4">
       0.0000
       <span class="table-cell-sub change-highlight">
        USD/美元
       </span>
      </td>
      <td class="px-5 py-4">
       0
      </td>
      <td class="px-5 py-4">
       0
      </td>
      <td class="px-5 py-4">
       禁用
      </td>
      <td class="px-5 py-4">
       禁用
      </td>
     </tr>
     <tr class="border-b border-gray-50 hover:bg-red-50/40 transition-colors">
      <td class="px-5 py-4 change-highlight">
       <span class="mr-2">
        ›
       </span>
       <span class="text-blue-500 hover:underline cursor-pointer">
        test-杨均
       </span>
      </td>
      <td class="px-5 py-4 change-highlight">
       直客客户
      </td>
      <td class="px-5 py-4 change-highlight">
       9900456
      </td>
      <td class="px-5 py-4 change-highlight">
       交易
      </td>
      <td class="px-5 py-4 change-highlight">
       美分账户
      </td>
      <td class="px-5 py-4 change-highlight">
       1:100
      </td>
      <td class="px-5 py-4 change-highlight">
       756,000.00
       <span class="table-cell-sub">
        USC/美分
       </span>
      </td>
      <td class="px-5 py-4 change-highlight">
       760,000.00
       <span class="table-cell-sub">
        USC/美分
       </span>
      </td>
      <td class="px-5 py-4 change-highlight">
       500.00
       <span class="table-cell-sub">
        USC/美分
       </span>
      </td>
      <td class="px-5 py-4 change-highlight">
       83,000.00
       <span class="table-cell-sub">
        USC/美分
       </span>
      </td>
      <td class="px-5 py-4 change-highlight">
       142
      </td>
      <td class="px-5 py-4 change-highlight">
       120,000.00
       <span class="table-cell-sub">
        USC/美分
       </span>
      </td>
      <td class="px-5 py-4 change-highlight">
       30,000.00
       <span class="table-cell-sub">
        USC/美分
       </span>
      </td>
      <td class="px-5 py-4 change-highlight">
       0.52
      </td>
      <td class="px-5 py-4 change-highlight">
       1
      </td>
      <td class="px-5 py-4 change-highlight">
       正常
      </td>
      <td class="px-5 py-4 change-highlight">
       正常
      </td>
     </tr>
     <tr class="border-b border-gray-50 hover:bg-gray-50 transition-colors">
      <td class="px-5 py-4">
       <span class="text-red-500 mr-2">
        ›
       </span>
       <span class="text-blue-500 hover:underline cursor-pointer">
        test-韩心
       </span>
      </td>
      <td class="px-5 py-4">
       代理
      </td>
      <td class="px-5 py-4">
       8300254
      </td>
      <td class="px-5 py-4">
       佣金
      </td>
      <td class="px-5 py-4 change-highlight">
       佣金账户
      </td>
      <td class="px-5 py-4">
       1:100
      </td>
      <td class="px-5 py-4">
       0.1300
       <span class="table-cell-sub change-highlight">
        USD/美元
       </span>
      </td>
      <td class="px-5 py-4">
       0.1300
       <span class="table-cell-sub change-highlight">
        USD/美元
       </span>
      </td>
      <td class="px-5 py-4">
       0.0000
       <span class="table-cell-sub change-highlight">
        USD/美元
       </span>
      </td>
      <td class="px-5 py-4">
       0.1300
       <span class="table-cell-sub change-highlight">
        USD/美元
       </span>
      </td>
      <td class="px-5 py-4">
       0
      </td>
      <td class="px-5 py-4">
       0.0000
       <span class="table-cell-sub change-highlight">
        USD/美元
       </span>
      </td>
      <td class="px-5 py-4">
       0.0000
       <span class="table-cell-sub change-highlight">
        USD/美元
       </span>
      </td>
      <td class="px-5 py-4">
       0
      </td>
      <td class="px-5 py-4">
       0
      </td>
      <td class="px-5 py-4">
       禁用
      </td>
      <td class="px-5 py-4">
       禁用
      </td>
     </tr>
    </tbody>
   </table>
  </div>
 </div>
</div>

    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
</script>
