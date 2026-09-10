<template>
  <div class="flex h-full bg-mainBg overflow-hidden">
    <div class="flex-1 flex flex-col min-w-0 bg-gray-50 overflow-hidden p-4 custom-scrollbar overflow-y-auto">
      <main class="flex-1 min-w-0">
 <div class="p-6 space-y-6">
  <section class="grid grid-cols-1 md:grid-cols-4 gap-4">
   <div class="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
    <div class="text-xs text-gray-500">
     当前委托中
    </div>
    <div class="text-2xl font-bold text-gray-800 mt-2">
     28
    </div>
    <div class="text-xs text-gray-400 mt-2">
     委托分组：可在“委托分组配置”中维护
    </div>
   </div>
   <div class="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
    <div class="text-xs text-gray-500">
     当前开放中
    </div>
    <div class="text-2xl font-bold text-emerald-600 mt-2">
     9
    </div>
    <div class="text-xs text-gray-400 mt-2">
     按规则允许查看交易数据
    </div>
   </div>
   <div class="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
    <div class="text-xs text-gray-500">
     未开放
    </div>
    <div class="text-2xl font-bold text-amber-600 mt-2">
     19
    </div>
    <div class="text-xs text-gray-400 mt-2">
     持仓/交易/平仓记录不可见
    </div>
   </div>
   <div class="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
    <div class="text-xs text-gray-500">
     本月已移出委托组
    </div>
    <div class="text-2xl font-bold text-gray-800 mt-2">
     6
    </div>
    <div class="text-xs text-gray-400 mt-2">
     已恢复普通账号能力
    </div>
   </div>
  </section>
  <section class="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
   <div class="grid grid-cols-1 xl:grid-cols-7 gap-4">
    <div>
     <label class="block text-xs text-gray-500 mb-2">
      客户信息
     </label>
     <input class="w-full h-10 rounded border border-gray-300 px-3 text-sm outline-none focus:border-[#C19B5E]" placeholder="姓名 / 邮箱 / MT账号" type="text"/>
    </div>
    <div>
     <label class="block text-xs text-gray-500 mb-2">
      委托状态
     </label>
     <select class="w-full h-10 rounded border border-gray-300 px-3 text-sm outline-none focus:border-[#C19B5E]">
      <option>
       全部
      </option>
      <option>
       委托中
      </option>
      <option>
       已结束
      </option>
      <option>
       异常
      </option>
     </select>
    </div>
    <div>
     <label class="block text-xs text-gray-500 mb-2">
      查看状态
     </label>
     <select class="w-full h-10 rounded border border-gray-300 px-3 text-sm outline-none focus:border-[#C19B5E]">
      <option>
       全部
      </option>
      <option>
       开放中
      </option>
      <option>
       未开放
      </option>
      <option>
       手动开启
      </option>
     </select>
    </div>
    <div>
     <label class="block text-xs text-gray-500 mb-2">
      时间模式
     </label>
     <select class="w-full h-10 rounded border border-gray-300 px-3 text-sm outline-none focus:border-[#C19B5E]">
      <option>
       全部
      </option>
      <option>
       每月固定时间
      </option>
      <option>
       每周固定时间
      </option>
      <option>
       每月内指定时间
      </option>
     </select>
    </div>
    <div>
     <label class="block text-xs text-gray-500 mb-2">
      委托组
     </label>
     <select class="w-full h-10 rounded border border-gray-300 px-3 text-sm outline-none focus:border-[#C19B5E]">
      <option>
       全部
      </option>
      <option selected="">
       real\Trust\Managed\Main
      </option>
      <option>
       real\Trust\Managed\VIP
      </option>
     </select>
    </div>
    <div>
     <label class="block text-xs text-gray-500 mb-2">
      能力状态
     </label>
     <select class="w-full h-10 rounded border border-gray-300 px-3 text-sm outline-none focus:border-[#C19B5E]">
      <option>
       全部
      </option>
      <option>
       禁内转
      </option>
      <option>
       禁密码修改重置
      </option>
      <option>
       已恢复普通能力
      </option>
     </select>
    </div>
    <div class="flex items-end gap-3">
     <button class="h-10 px-4 rounded bg-[#C19B5E] text-white text-sm hover:bg-[#a88651] transition-colors">
      查询
     </button>
     <button class="h-10 px-4 rounded border border-gray-300 bg-white text-sm text-gray-700 hover:bg-gray-50 transition-colors">
      重置
     </button>
    </div>
   </div>
  </section>
  <section class="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
   <div class="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
    <div>
     <h2 class="text-base font-bold text-gray-800">
      委托账户列表
     </h2>
     <p class="text-xs text-gray-500 mt-1">
      统一查看委托账号状态、开放规则，以及账号何时移入委托组、何时移出委托组。
     </p>
    </div>
    <div class="text-xs text-gray-500">
     共 34 条记录
    </div>
   </div>
   <div class="overflow-x-auto no-scrollbar">
    <table class="w-full min-w-[1360px] text-sm text-left whitespace-nowrap">
     <thead class="bg-gray-50 text-gray-500 border-b border-gray-100">
      <tr>
       <th class="px-4 py-3 font-medium">
        MT账号
       </th>
       <th class="px-4 py-3 font-medium">
        客户
       </th>
       <th class="px-4 py-3 font-medium">
        当前分组
       </th>
       <th class="px-4 py-3 font-medium">
        委托状态
       </th>
       <th class="px-4 py-3 font-medium">
        查看状态
       </th>
       <th class="px-4 py-3 font-medium">
        时间模式
       </th>
       <th class="px-4 py-3 font-medium">
        规则来源
       </th>
       <th class="px-4 py-3 font-medium">
        开放时间
       </th>
       <th class="px-4 py-3 font-medium">
        移入委托组时间
       </th>
       <th class="px-4 py-3 font-medium">
        移出委托组时间
       </th>
       <th class="px-4 py-3 font-medium">
        操作
       </th>
      </tr>
     </thead>
     <tbody class="text-gray-700 divide-y divide-gray-100">
      <tr class="hover:bg-gray-50 transition-colors">
       <td class="px-4 py-4 font-medium text-gray-800">
        8100457
       </td>
       <td class="px-4 py-4">
        张三 - zhangsan@test.com
       </td>
       <td class="px-4 py-4">
        real\Trust\Managed\Main
       </td>
       <td class="px-4 py-4">
        <span class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-[#f7efe2] text-[#a88651] border border-[#eadcc4]">
         委托中
        </span>
       </td>
       <td class="px-4 py-4">
        <span class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
         开放中
        </span>
       </td>
       <td class="px-4 py-4">
        每月固定时间
       </td>
       <td class="px-4 py-4">
        组规则：托管主组月度开放
       </td>
       <td class="px-4 py-4">
        每月 15 日 00:00 - 23:59
       </td>
       <td class="px-4 py-4">
        2026-07-01 10:21:08
       </td>
       <td class="px-4 py-4">
        --
       </td>
       <td class="px-4 py-4 flex items-center gap-3">
        <a class="text-[#C19B5E] hover:underline" href="admin-trust-rule-config.html">
         查看规则
        </a>
        <a class="text-blue-600 hover:underline" href="javascript:void(0)">
         查看变更记录
        </a>
       </td>
      </tr>
      <tr class="hover:bg-gray-50 transition-colors">
       <td class="px-4 py-4 font-medium text-gray-800">
        8801732
       </td>
       <td class="px-4 py-4">
        李四 - lisi@test.com
       </td>
       <td class="px-4 py-4">
        real\Trust\Managed\Main
       </td>
       <td class="px-4 py-4">
        <span class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-amber-50 text-amber-700 border border-amber-200">
         委托中
        </span>
       </td>
       <td class="px-4 py-4">
        <span class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-amber-50 text-amber-700 border border-amber-200">
         手动开启
        </span>
       </td>
       <td class="px-4 py-4">
        --
       </td>
       <td class="px-4 py-4">
        账号规则：8801732 特殊开放
       </td>
       <td class="px-4 py-4">
        长期有效
       </td>
       <td class="px-4 py-4">
        2026-07-08 09:35:12
       </td>
       <td class="px-4 py-4">
        --
       </td>
       <td class="px-4 py-4 flex items-center gap-3">
        <a class="text-[#C19B5E] hover:underline" href="admin-trust-rule-config.html">
         查看规则
        </a>
        <a class="text-blue-600 hover:underline" href="javascript:void(0)">
         查看变更记录
        </a>
       </td>
      </tr>
      <tr class="hover:bg-gray-50 transition-colors">
       <td class="px-4 py-4 font-medium text-gray-800">
        8802451
       </td>
       <td class="px-4 py-4">
        王五 - wangwu@test.com
       </td>
       <td class="px-4 py-4">
        real\HATC\Standard
       </td>
       <td class="px-4 py-4">
        <span class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border border-gray-200 text-white bg-red-500 hover:bg-red-600 border-red-500">
         已结束
        </span>
       </td>
       <td class="px-4 py-4">
        --
       </td>
       <td class="px-4 py-4">
        每月内指定时间
       </td>
       <td class="px-4 py-4">
        历史规则：8802451 月内指定开放
       </td>
       <td class="px-4 py-4">
        每月 5/20 日 09:00 - 18:00
       </td>
       <td class="px-4 py-4">
        2026-06-15 11:20:03
       </td>
       <td class="px-4 py-4">
        2026-07-18 17:40:21
       </td>
       <td class="px-4 py-4 flex items-center gap-3">
        <a class="text-[#C19B5E] hover:underline" href="admin-trust-rule-config.html">
         查看规则
        </a>
        <a class="text-blue-600 hover:underline" href="javascript:void(0)">
         查看变更记录
        </a>
       </td>
      </tr>
     </tbody>
    </table>
   </div>
  </section>
 </div>
</main>

    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
</script>
