<template>
  <div class="flex h-full bg-mainBg overflow-hidden">
    <div class="flex-1 flex flex-col min-w-0 bg-gray-50 overflow-hidden p-4 custom-scrollbar overflow-y-auto">
      <main class="flex-1 min-w-0">
 <div class="p-6 space-y-6">
  <section class="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
   <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
    <div>
     <label class="block text-xs text-gray-500 mb-2">
      分组名称
     </label>
     <input class="w-full h-10 rounded border border-gray-300 px-3 text-sm outline-none focus:border-[#C19B5E]" placeholder="输入分组名称或路径" type="text"/>
    </div>
    <div>
     <label class="block text-xs text-gray-500 mb-2">
      状态
     </label>
     <select class="w-full h-10 rounded border border-gray-300 px-3 text-sm outline-none focus:border-[#C19B5E]">
      <option>
       全部
      </option>
      <option>
       启用
      </option>
      <option>
       停用
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
    <div class="flex items-end justify-end">
     <span class="text-xs text-gray-500">
      共 2 个分组
     </span>
    </div>
   </div>
  </section>
  <section class="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
   <div class="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
    <div>
     <h2 class="text-base font-bold text-gray-800">
      分组列表
     </h2>
     <p class="text-xs text-gray-500 mt-1">
      删除分组后，新进入该分组的账号将不再被识别为委托账号；已在该分组内的账号仍按其当前分组结果判定。
     </p>
    </div>
   </div>
   <div class="overflow-x-auto no-scrollbar">
    <table class="w-full min-w-[980px] text-sm text-left whitespace-nowrap">
     <thead class="bg-gray-50 text-gray-500 border-b border-gray-100">
      <tr>
       <th class="px-4 py-3 font-medium">
        委托分组
       </th>
       <th class="px-4 py-3 font-medium">
        状态
       </th>
       <th class="px-4 py-3 font-medium">
        创建人
       </th>
       <th class="px-4 py-3 font-medium">
        创建时间
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
        real\Trust\Managed\Main
       </td>
       <td class="px-4 py-4">
        <span class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
         启用
        </span>
       </td>
       <td class="px-4 py-4">
        管理员A
       </td>
       <td class="px-4 py-4">
        2026-07-01 10:00
       </td>
       <td class="px-4 py-4">
        2026-07-21 11:20
       </td>
       <td class="px-4 py-4 flex items-center gap-3">
        <a class="text-[#C19B5E] hover:underline" href="javascript:void(0)">
         编辑
        </a>
        <a class="text-red-600 hover:underline" href="javascript:void(0)">
         删除
        </a>
       </td>
      </tr>
      <tr class="hover:bg-gray-50 transition-colors">
       <td class="px-4 py-4 font-medium text-gray-800">
        real\Trust\Managed\VIP
       </td>
       <td class="px-4 py-4">
        <span class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600 border border-gray-200">
         停用
        </span>
       </td>
       <td class="px-4 py-4">
        管理员B
       </td>
       <td class="px-4 py-4">
        2026-07-10 09:12
       </td>
       <td class="px-4 py-4">
        2026-07-18 16:40
       </td>
       <td class="px-4 py-4 flex items-center gap-3">
        <a class="text-[#C19B5E] hover:underline" href="javascript:void(0)">
         编辑
        </a>
        <a class="text-red-600 hover:underline" href="javascript:void(0)">
         删除
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
