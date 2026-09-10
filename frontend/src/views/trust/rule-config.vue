<template>
  <div class="flex h-full bg-mainBg overflow-hidden">
    <div class="flex-1 flex flex-col min-w-0 bg-gray-50 overflow-hidden p-4 custom-scrollbar overflow-y-auto">
      <main class="flex-1 min-w-0">
 <div class="p-6 space-y-6">
  <section class="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
   <div class="grid grid-cols-1 xl:grid-cols-7 gap-4">
    <div>
     <label class="block text-xs text-gray-500 mb-2">
      规则名称
     </label>
     <input class="w-full h-10 rounded border border-gray-300 px-3 text-sm outline-none focus:border-[#C19B5E]" placeholder="输入规则名称" type="text" value=""/>
    </div>
    <div>
     <label class="block text-xs text-gray-500 mb-2">
      作用范围
     </label>
     <select class="w-full h-10 rounded border border-gray-300 px-3 text-sm outline-none focus:border-[#C19B5E]">
      <option>
       全部
      </option>
      <option>
       按组
      </option>
      <option>
       按MT账号
      </option>
     </select>
    </div>
    <div>
     <label class="block text-xs text-gray-500 mb-2">
      目标对象
     </label>
     <input class="w-full h-10 rounded border border-gray-300 px-3 text-sm outline-none focus:border-[#C19B5E]" placeholder="组名或 MT 账号" type="text"/>
    </div>
    <div>
     <label class="block text-xs text-gray-500 mb-2">
      开启模式
     </label>
     <select class="w-full h-10 rounded border border-gray-300 px-3 text-sm outline-none focus:border-[#C19B5E]">
      <option>
       全部
      </option>
      <option>
       手动开关
      </option>
      <option>
       自动定时
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
      规则状态
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
  <div class="grid grid-cols-1 2xl:grid-cols-[minmax(0,1.65fr)_380px] gap-6">
   <section class="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
    <div class="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
     <div>
      <h2 class="text-base font-bold text-gray-800">
       规则列表
      </h2>
      <p class="text-xs text-gray-500 mt-1">
       优先级：MT账号规则 &gt; 分组规则
      </p>
     </div>
     <div class="text-xs text-gray-500">
      共 3 条规则
     </div>
    </div>
    <div class="overflow-x-auto no-scrollbar">
     <table class="w-full min-w-[1180px] text-sm text-left whitespace-nowrap">
      <thead class="bg-gray-50 text-gray-500 border-b border-gray-100">
       <tr>
        <th class="px-4 py-3 font-medium">
         规则名称
        </th>
        <th class="px-4 py-3 font-medium">
         作用范围
        </th>
        <th class="px-4 py-3 font-medium">
         目标对象
        </th>
        <th class="px-4 py-3 font-medium">
         开启模式
        </th>
        <th class="px-4 py-3 font-medium">
         时间模式
        </th>
        <th class="px-4 py-3 font-medium">
         开放数据
        </th>
        <th class="px-4 py-3 font-medium">
         开放时间
        </th>
        <th class="px-4 py-3 font-medium">
         当前状态
        </th>
        <th class="px-4 py-3 font-medium">
         手动开关
        </th>
        <th class="px-4 py-3 font-medium">
         最近更新
        </th>
        <th class="px-4 py-3 font-medium">
         操作
        </th>
       </tr>
      </thead>
      <tbody class="text-gray-700 divide-y divide-gray-100">
       <tr class="hover:bg-gray-50 transition-colors">
        <td class="px-4 py-4 font-medium text-gray-800">
         托管主组月度开放
        </td>
        <td class="px-4 py-4">
         按组
        </td>
        <td class="px-4 py-4">
         real\Trust\Managed\Main
        </td>
        <td class="px-4 py-4">
         自动定时
        </td>
        <td class="px-4 py-4">
         每月固定时间
        </td>
        <td class="px-4 py-4">
         持仓 / 交易 / 平仓记录
        </td>
        <td class="px-4 py-4">
         每月 15 日 00:00 - 23:59
        </td>
        <td class="px-4 py-4">
         <span class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
          开放中
         </span>
        </td>
        <td class="px-4 py-4">
         关闭
        </td>
        <td class="px-4 py-4">
         2026-07-21 10:12
        </td>
        <td class="px-4 py-4">
         <a class="text-[#C19B5E] hover:underline" href="javascript:void(0)">
          编辑
         </a>
        </td>
       </tr>
       <tr class="hover:bg-gray-50 transition-colors">
        <td class="px-4 py-4 font-medium text-gray-800">
         8801732 特殊开放规则
        </td>
        <td class="px-4 py-4">
         按MT账号
        </td>
        <td class="px-4 py-4">
         8801732
        </td>
        <td class="px-4 py-4">
         手动开关
        </td>
        <td class="px-4 py-4">
         --
        </td>
        <td class="px-4 py-4">
         持仓 / 交易 / 平仓记录
        </td>
        <td class="px-4 py-4">
         长期有效
        </td>
        <td class="px-4 py-4">
         <span class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-amber-50 text-amber-700 border border-amber-200">
          手动开启
         </span>
        </td>
        <td class="px-4 py-4">
         <span class="inline-flex h-6 items-center rounded-full bg-[#f7efe2] px-2 text-xs font-medium text-[#a88651]">
          开启
         </span>
        </td>
        <td class="px-4 py-4">
         2026-07-20 18:06
        </td>
        <td class="px-4 py-4">
         <a class="text-[#C19B5E] hover:underline" href="javascript:void(0)">
          编辑
         </a>
        </td>
       </tr>
       <tr class="hover:bg-gray-50 transition-colors">
        <td class="px-4 py-4 font-medium text-gray-800">
         8802451 月内指定开放
        </td>
        <td class="px-4 py-4">
         按MT账号
        </td>
        <td class="px-4 py-4">
         8802451
        </td>
        <td class="px-4 py-4">
         自动定时
        </td>
        <td class="px-4 py-4">
         每月内指定时间
        </td>
        <td class="px-4 py-4">
         持仓 / 交易 / 平仓记录
        </td>
        <td class="px-4 py-4">
         每月 5/20 日 09:00 - 18:00
        </td>
        <td class="px-4 py-4">
         <span class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600 border border-gray-200">
          未开放
         </span>
        </td>
        <td class="px-4 py-4">
         关闭
        </td>
        <td class="px-4 py-4">
         2026-07-19 14:33
        </td>
        <td class="px-4 py-4">
         <a class="text-[#C19B5E] hover:underline" href="javascript:void(0)">
          编辑
         </a>
        </td>
       </tr>
      </tbody>
     </table>
    </div>
   </section>
   <aside class="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
    <div class="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
     <h2 class="text-base font-bold text-gray-800">
      规则详情 / 编辑
     </h2>
     <span class="text-xs text-[#C19B5E]">
      示例态
     </span>
    </div>
    <div class="p-5 space-y-5 text-sm">
     <div>
      <label class="block text-xs text-gray-500 mb-2">
       规则名称
      </label>
      <input class="w-full h-10 rounded border border-gray-300 px-3 outline-none focus:border-[#C19B5E]" type="text" value="托管主组月度开放"/>
     </div>
     <div class="grid grid-cols-2 gap-4">
      <div>
       <label class="block text-xs text-gray-500 mb-2">
        作用范围
       </label>
       <select class="w-full h-10 rounded border border-gray-300 px-3 outline-none focus:border-[#C19B5E]">
        <option selected="">
         按组
        </option>
        <option>
         按MT账号
        </option>
       </select>
      </div>
      <div>
       <label class="block text-xs text-gray-500 mb-2">
        目标对象
       </label>
       <input class="w-full h-10 rounded border border-gray-300 px-3 outline-none focus:border-[#C19B5E]" type="text" value="real\Trust\Managed\Main"/>
      </div>
     </div>
     <div class="grid grid-cols-2 gap-4">
      <div>
       <label class="block text-xs text-gray-500 mb-2">
        开启模式
       </label>
       <select class="w-full h-10 rounded border border-gray-300 px-3 outline-none focus:border-[#C19B5E]">
        <option>
         手动开关
        </option>
        <option selected="">
         自动定时
        </option>
       </select>
      </div>
      <div>
       <label class="block text-xs text-gray-500 mb-2">
        时间模式
       </label>
       <select class="w-full h-10 rounded border border-gray-300 px-3 outline-none focus:border-[#C19B5E]">
        <option selected="">
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
     </div>
     <div class="grid grid-cols-2 gap-4">
      <div>
       <label class="block text-xs text-gray-500 mb-2">
        手动开关
       </label>
       <div class="h-10 rounded border border-gray-300 px-3 flex items-center justify-between bg-gray-50">
        <span class="text-gray-500">
         当前关闭
        </span>
        <span class="inline-flex h-6 items-center rounded-full bg-gray-200 px-2 text-xs text-gray-600">
         OFF
        </span>
       </div>
      </div>
      <div>
       <label class="block text-xs text-gray-500 mb-2">
        开放开始
       </label>
       <input class="w-full h-10 rounded border border-gray-300 px-3 outline-none focus:border-[#C19B5E]" type="text" value="每月 15 日 00:00"/>
      </div>
     </div>
     <div class="grid grid-cols-2 gap-4">
      <div>
       <label class="block text-xs text-gray-500 mb-2">
        开放结束
       </label>
       <input class="w-full h-10 rounded border border-gray-300 px-3 outline-none focus:border-[#C19B5E]" type="text" value="每月 15 日 23:59"/>
      </div>
      <div>
       <label class="block text-xs text-gray-500 mb-2">
        时间表达式
       </label>
       <input class="w-full h-10 rounded border border-gray-300 px-3 outline-none focus:border-[#C19B5E]" type="text" value="每月 15 日"/>
      </div>
     </div>
     <div>
      <label class="block text-xs text-gray-500 mb-2">
       规则说明
      </label>
      <textarea class="w-full h-24 rounded border border-gray-300 px-3 py-2 outline-none focus:border-[#C19B5E] resize-none">用于托管主组的月度查看窗口控制。客户在 MT5 中查看数据，CRM 仅展示结果。</textarea>
     </div>
     <div>
      <label class="block text-xs text-gray-500 mb-2">
       开放数据
      </label>
      <div class="h-10 rounded border border-gray-300 px-3 flex items-center bg-gray-50 text-gray-700">
       持仓 / 交易 / 平仓记录
      </div>
     </div>
     <div class="rounded-xl bg-[#fbfaf7] border border-[#efe4d4] p-4 space-y-3">
      <div class="text-xs font-medium text-gray-500">
       规则生效说明
      </div>
      <div class="text-xs text-gray-600 leading-6">
       <div>
        1. 命中任一委托分组后默认禁内转、可出入金、禁密码修改重置。
       </div>
       <div>
        2. 未开放时不可查看持仓、交易、平仓记录；开放后由 MT5 侧统一放开。
       </div>
       <div>
        3. 若同时命中账号规则和分组规则，优先采用 MT 账号规则。
       </div>
       <div>
        4. 自动定时支持每月固定时间、每周固定时间、每月内指定时间。
       </div>
       <div>
        5. 委托结束后需先切换到非托管组，受限能力才恢复。
       </div>
      </div>
     </div>
     <div class="flex justify-end gap-3 pt-2">
      <button class="px-4 py-2 rounded border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 transition-colors text-red-500 hover:text-red-700">
       取消
      </button>
      <button class="px-4 py-2 rounded bg-[#C19B5E] text-white hover:bg-[#a88651] transition-colors">
       保存规则
      </button>
     </div>
    </div>
   </aside>
  </div>
 </div>
</main>

    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
</script>
