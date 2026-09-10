<template>
  <div class="flex h-full bg-mainBg overflow-hidden">
    <div class="flex-1 flex flex-col min-w-0 bg-gray-50 overflow-hidden p-4 custom-scrollbar overflow-y-auto">
      <div class="flex-1 overflow-y-auto p-6 space-y-6">
 <section class="bg-white rounded-2xl border border-gray-100 shadow-panel p-5">
  <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-4">
   <div>
    <label class="block text-xs text-gray-500 mb-2">
     客户邮箱 / 姓名
    </label>
    <div class="relative">
     <i class="fa-solid fa-search absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs">
     </i>
     <input class="w-full h-10 pl-9 pr-3 rounded-lg border border-gray-200 text-sm text-gray-700 bg-gray-50 focus:outline-none" id="searchInput" placeholder="支持邮箱或姓名模糊搜索" type="text"/>
    </div>
   </div>
   <div>
    <label class="block text-xs text-gray-500 mb-2">
     登录IP
    </label>
    <div class="relative">
     <i class="fa-solid fa-globe absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs">
     </i>
     <input class="w-full h-10 pl-9 pr-3 rounded-lg border border-gray-200 text-sm text-gray-700 bg-gray-50 focus:outline-none" id="ipSearchInput" placeholder="支持 CRM / MT5 登录IP搜索" type="text"/>
    </div>
   </div>
   <div>
    <label class="block text-xs text-gray-500 mb-2">
     比对结果 / 提示标签
    </label>
    <select class="w-full h-10 rounded-lg border border-gray-200 bg-white px-3 text-sm text-gray-700" id="resultSelect">
     <option selected="">
      全部结果
     </option>
     <option>
      同一IP
     </option>
     <option>
      IP不一致
     </option>
     <option>
      未匹配到MT5登录
     </option>
     <option>
      同IP多客户
     </option>
    </select>
   </div>
   <div>
    <label class="block text-xs text-gray-500 mb-2">
     登录时间（CRM）
    </label>
    <div class="grid grid-cols-[1fr_auto_1fr] items-center gap-2">
     <input class="w-full h-10 rounded-lg border border-gray-200 px-3 text-sm text-gray-700 bg-white focus:outline-none" type="date"/>
     <span class="text-xs text-gray-400">
      至
     </span>
     <input class="w-full h-10 rounded-lg border border-gray-200 px-3 text-sm text-gray-700 bg-white focus:outline-none" type="date"/>
    </div>
   </div>
   <div class="flex items-end gap-3">
    <button class="h-10 px-4 rounded-lg bg-primaryBtn text-white text-sm hover:bg-primaryBtnHover transition-colors">
     查询
    </button>
    <button class="h-10 px-4 rounded-lg border border-gray-200 text-sm text-gray-600 hover:border-gray-300 transition-colors">
     重置
    </button>
    <button class="h-10 px-4 rounded-lg bg-white border border-gray-200 text-sm text-gray-600 hover:border-brandGold hover:text-brandGold transition-colors">
     <i class="fa-solid fa-download mr-2">
     </i>
     导出
    </button>
   </div>
  </div>
 </section>
 <section class="bg-white rounded-2xl border border-gray-100 shadow-panel overflow-hidden">
  <div class="flex items-center justify-between px-5 py-4 border-b border-gray-100">
   <div>
    <h2 class="text-base font-bold text-gray-800">
     IP 一致性比对清单
    </h2>
   </div>
   <div>
   </div>
  </div>
  <div class="table-scroll overflow-x-auto">
   <table class="w-full min-w-[1640px] whitespace-nowrap text-sm">
    <thead class="bg-[#2f3648] text-white">
     <tr>
      <th class="text-left font-medium px-4 py-3">
       客户信息
      </th>
      <th class="text-left font-medium px-4 py-3">
       CRM 登录
      </th>
      <th class="text-left font-medium px-4 py-3">
       MT5 登录
      </th>
      <th class="text-left font-medium px-4 py-3">
       30天内累计登录次数
      </th>
      <th class="text-left font-medium px-4 py-3">
       CRM同IP30天内汇总
      </th>
      <th class="text-left font-medium px-4 py-3">
       MT5同IP30天内汇总
      </th>
      <th class="text-left font-medium px-4 py-3">
       比对结果
      </th>
      <th class="text-left font-medium px-4 py-3">
       操作
      </th>
     </tr>
    </thead>
    <tbody class="divide-y divide-gray-100">
     <tr class="cursor-pointer hover:bg-[#fbfaf7] transition-colors">
      <td class="px-4 py-4">
       <div class="font-semibold text-gray-800">
        林先生-lin@example.com
       </div>
       <div class="text-xs text-gray-500 mt-1">
        MT5: 8801732
       </div>
      </td>
      <td class="px-4 py-4">
       <div class="font-medium text-gray-800">
        103.12.18.21
       </div>
       <div class="text-xs text-gray-500 mt-1">
        中国广东省广州市
       </div>
       <div class="text-xs text-gray-400 mt-1">
        2026-07-09 09:12:18
       </div>
      </td>
      <td class="px-4 py-4">
       <div class="font-medium text-gray-800">
        45.88.201.10
       </div>
       <div class="text-xs text-gray-500 mt-1">
        英国伦敦
       </div>
       <div class="text-xs text-gray-400 mt-1">
        2026-07-09 09:19:42
       </div>
      </td>
      <td class="px-4 py-4 text-xs text-gray-600">
       <div class="text-gray-800">
        18次（IP不一致5次）
       </div>
      </td>
      <td class="px-4 py-4 text-xs text-gray-600">
       <button class="p-0 bg-transparent border-0 text-blue-600 hover:text-blue-700 underline underline-offset-2 focus:outline-none" type="button">
        3个客户
       </button>
      </td>
      <td class="px-4 py-4 text-xs text-gray-600">
       <button class="p-0 bg-transparent border-0 text-blue-600 hover:text-blue-700 underline underline-offset-2 focus:outline-none" type="button">
        2个客户
       </button>
      </td>
      <td class="px-4 py-4">
       <div class="flex items-center gap-2">
        <span class="px-2 py-1 rounded-full bg-[#ffe5ea] text-riskHigh">
         IP不一致
        </span>
        <span class="px-2 py-1 rounded-full bg-[#fff3dd] text-riskMedium text-xs">
         同IP多客户
        </span>
       </div>
      </td>
      <td class="px-4 py-4">
       <div class="flex items-center gap-3 text-xs">
        <button class="text-brandGold hover:text-[#a88651] text-blue-500 hover:text-blue-700">
         查看详情
        </button>
        <a class="text-blue-500 hover:text-blue-700" href="#">
         客户详情
        </a>
       </div>
      </td>
     </tr>
     <tr class="cursor-pointer hover:bg-[#fbfaf7] transition-colors">
      <td class="px-4 py-4">
       <div class="font-semibold text-gray-800">
        陈小姐-chen@example.com
       </div>
       <div class="text-xs text-gray-500 mt-1">
        MT5: 8801941
       </div>
      </td>
      <td class="px-4 py-4">
       <div class="font-medium text-gray-800">
        58.62.19.87
       </div>
       <div class="text-xs text-gray-500 mt-1">
        中国广东省深圳市
       </div>
       <div class="text-xs text-gray-400 mt-1">
        2026-07-09 11:08:05
       </div>
      </td>
      <td class="px-4 py-4">
       <div class="font-medium text-gray-800">
        58.62.19.99
       </div>
       <div class="text-xs text-gray-500 mt-1">
        中国广东省深圳市
       </div>
       <div class="text-xs text-gray-400 mt-1">
        2026-07-09 11:14:10
       </div>
      </td>
      <td class="px-4 py-4 text-xs text-gray-600">
       <div class="text-gray-800">
        9次（IP不一致2次）
       </div>
      </td>
      <td class="px-4 py-4 text-xs text-gray-600">
       <button class="p-0 bg-transparent border-0 text-blue-600 hover:text-blue-700 underline underline-offset-2 focus:outline-none" type="button">
        1个客户
       </button>
      </td>
      <td class="px-4 py-4 text-xs text-gray-600">
       <button class="p-0 bg-transparent border-0 text-blue-600 hover:text-blue-700 underline underline-offset-2 focus:outline-none" type="button">
        1个客户
       </button>
      </td>
      <td class="px-4 py-4">
       <span class="px-2 py-1 rounded-full bg-[#fff3dd] text-riskMedium">
        IP不一致
       </span>
      </td>
      <td class="px-4 py-4">
       <div class="flex items-center gap-3 text-xs">
        <button class="text-brandGold hover:text-[#a88651] text-blue-500 hover:text-blue-700">
         查看详情
        </button>
        <a class="text-blue-500 hover:text-blue-700" href="#">
         客户详情
        </a>
       </div>
      </td>
     </tr>
     <tr class="cursor-pointer hover:bg-[#fbfaf7] transition-colors">
      <td class="px-4 py-4">
       <div class="font-semibold text-gray-800">
        张先生-zhang@example.com
       </div>
       <div class="text-xs text-gray-500 mt-1">
        MT5: 8802013
       </div>
      </td>
      <td class="px-4 py-4">
       <div class="font-medium text-gray-800">
        203.186.12.19
       </div>
       <div class="text-xs text-gray-500 mt-1">
        中国香港
       </div>
       <div class="text-xs text-gray-400 mt-1">
        2026-07-09 13:42:55
       </div>
      </td>
      <td class="px-4 py-4">
       <div class="font-medium text-gray-800">
        203.186.12.19
       </div>
       <div class="text-xs text-gray-500 mt-1">
        中国香港
       </div>
       <div class="text-xs text-gray-400 mt-1">
        2026-07-09 13:51:24
       </div>
      </td>
      <td class="px-4 py-4 text-xs text-gray-600">
       <div class="text-gray-800">
        6次（IP不一致0次）
       </div>
      </td>
      <td class="px-4 py-4 text-xs text-gray-600">
       <button class="p-0 bg-transparent border-0 text-blue-600 hover:text-blue-700 underline underline-offset-2 focus:outline-none" type="button">
        2个客户
       </button>
      </td>
      <td class="px-4 py-4 text-xs text-gray-600">
       <button class="p-0 bg-transparent border-0 text-blue-600 hover:text-blue-700 underline underline-offset-2 focus:outline-none" type="button">
        2个客户
       </button>
      </td>
      <td class="px-4 py-4">
       <div class="flex items-center gap-2">
        <span class="px-2 py-1 rounded-full bg-[#edf9f7] text-riskLow">
         同一IP
        </span>
        <span class="px-2 py-1 rounded-full bg-[#fff3dd] text-riskMedium text-xs">
         同IP多客户
        </span>
       </div>
      </td>
      <td class="px-4 py-4">
       <div class="flex items-center gap-3 text-xs">
        <button class="text-brandGold hover:text-[#a88651] text-blue-500 hover:text-blue-700">
         查看详情
        </button>
        <a class="text-blue-500 hover:text-blue-700" href="#">
         客户详情
        </a>
       </div>
      </td>
     </tr>
     <tr class="cursor-pointer hover:bg-[#fbfaf7] transition-colors">
      <td class="px-4 py-4">
       <div class="font-semibold text-gray-800">
        赵女士-zhao@example.com
       </div>
       <div class="text-xs text-gray-500 mt-1">
        MT5: 8802407
       </div>
      </td>
      <td class="px-4 py-4">
       <div class="font-medium text-gray-800">
        171.221.10.51
       </div>
       <div class="text-xs text-gray-500 mt-1">
        中国四川省成都市
       </div>
       <div class="text-xs text-gray-400 mt-1">
        2026-07-09 15:12:06
       </div>
      </td>
      <td class="px-4 py-4">
       <div class="font-medium text-gray-800">
        171.221.54.12
       </div>
       <div class="text-xs text-gray-500 mt-1">
        中国四川省成都市
       </div>
       <div class="text-xs text-gray-400 mt-1">
        2026-07-09 15:45:39
       </div>
      </td>
      <td class="px-4 py-4 text-xs text-gray-600">
       <div class="text-gray-800">
        11次（IP不一致4次）
       </div>
      </td>
      <td class="px-4 py-4 text-xs text-gray-600">
       <button class="p-0 bg-transparent border-0 text-blue-600 hover:text-blue-700 underline underline-offset-2 focus:outline-none" type="button">
        1个客户
       </button>
      </td>
      <td class="px-4 py-4 text-xs text-gray-600">
       <button class="p-0 bg-transparent border-0 text-blue-600 hover:text-blue-700 underline underline-offset-2 focus:outline-none" type="button">
        3个客户
       </button>
      </td>
      <td class="px-4 py-4">
       <span class="px-2 py-1 rounded-full bg-[#fff3dd] text-riskMedium">
        IP不一致
       </span>
      </td>
      <td class="px-4 py-4">
       <div class="flex items-center gap-3 text-xs">
        <button class="text-brandGold hover:text-[#a88651] text-blue-500 hover:text-blue-700">
         查看详情
        </button>
        <a class="text-blue-500 hover:text-blue-700" href="#">
         客户详情
        </a>
       </div>
      </td>
     </tr>
     <tr class="cursor-pointer hover:bg-[#fbfaf7] transition-colors">
      <td class="px-4 py-4">
       <div class="font-semibold text-gray-800">
        吴先生-wu@example.com
       </div>
       <div class="text-xs text-gray-500 mt-1">
        MT5: 8802688
       </div>
      </td>
      <td class="px-4 py-4">
       <div class="font-medium text-gray-800">
        61.145.77.203
       </div>
       <div class="text-xs text-gray-500 mt-1">
        中国广东省东莞市
       </div>
       <div class="text-xs text-gray-400 mt-1">
        2026-07-09 17:26:41
       </div>
      </td>
      <td class="px-4 py-4">
       <div class="font-medium text-gray-400">
        --
       </div>
       <div class="text-xs text-gray-400 mt-1">
        --
       </div>
       <div class="text-xs text-gray-400 mt-1">
        未匹配到 MT5 登录
       </div>
      </td>
      <td class="px-4 py-4 text-xs text-gray-600">
       <div class="text-gray-800">
        3次（IP不一致0次）
       </div>
      </td>
      <td class="px-4 py-4 text-xs text-gray-600">
       <button class="p-0 bg-transparent border-0 text-blue-600 hover:text-blue-700 underline underline-offset-2 focus:outline-none" type="button">
        4个客户
       </button>
      </td>
      <td class="px-4 py-4 text-xs text-gray-600">
       <div class="text-gray-400">
        --
       </div>
      </td>
      <td class="px-4 py-4">
       <div class="flex items-center gap-2">
        <span class="px-2 py-1 rounded-full bg-[#f3f0ff] text-[#6d59d9]">
         未匹配到MT5登录
        </span>
        <span class="px-2 py-1 rounded-full bg-[#fff3dd] text-riskMedium text-xs">
         同IP多客户
        </span>
       </div>
      </td>
      <td class="px-4 py-4">
       <div class="flex items-center gap-3 text-xs">
        <button class="text-brandGold hover:text-[#a88651] text-blue-500 hover:text-blue-700">
         查看详情
        </button>
        <a class="text-blue-500 hover:text-blue-700" href="#">
         客户详情
        </a>
       </div>
      </td>
     </tr>
    </tbody>
   </table>
  </div>
  <div class="px-5 py-4 border-t border-gray-100 flex items-center justify-between text-sm text-gray-500">
   <span>
    展示第 1-5 条，共 27 条
   </span>
   <div class="flex items-center gap-2">
    <button class="w-9 h-9 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors">
     ‹
    </button>
    <button class="w-9 h-9 rounded-lg bg-brandGold text-white">
     1
    </button>
    <button class="w-9 h-9 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors">
     2
    </button>
    <button class="w-9 h-9 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors">
     ›
    </button>
   </div>
  </div>
 </section>
</div>

    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
</script>
