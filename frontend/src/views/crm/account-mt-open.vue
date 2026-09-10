<template>
  <div class="flex h-full bg-mainBg overflow-hidden">
    <div class="flex-1 flex flex-col min-w-0 bg-gray-50 overflow-hidden p-4 custom-scrollbar overflow-y-auto">
      <div class="flex-1 p-6 overflow-y-auto">
 <div class="bg-white rounded-2xl shadow-sm border border-gray-100 min-h-[calc(100vh-10rem)] p-6">
  <div class="flex justify-end gap-2 mb-6">
   <a class="px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-600 rounded text-xs font-medium transition-colors flex items-center" data-prd-drawer="" data-prd-title="申请MT账户页面PRD" href="#">
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
  <div class="w-full mx-auto pt-2">
   <div class="grid grid-cols-[120px_minmax(0,1fr)] gap-x-8 gap-y-5 items-center">
    <label class="field-label text-sm font-medium text-right">
     真实姓名：
    </label>
    <input class="field-input text-sm" readonly="" type="text" value="test-艳霞"/>
    <label class="field-label text-sm font-medium text-right">
     邮箱：
    </label>
    <input class="field-input text-sm" readonly="" type="text" value="15749654364@qq.com"/>
    <label class="field-label text-sm font-medium text-right">
     手机：
    </label>
    <input class="field-input text-sm" readonly="" type="text" value="15749654364"/>
    <label class="field-label text-sm font-medium text-right change-highlight">
     账户类型：
    </label>
    <div>
     <select class="field-input text-sm pr-10 change-highlight change-border">
      <option selected="">
       标准账户
      </option>
      <option>
       美分账户
      </option>
     </select>
    </div>
    <label class="field-label text-sm font-medium text-right change-highlight">
     账号类型：
    </label>
    <div>
     <input class="field-input text-sm change-highlight change-border" readonly="" type="text" value="交易账号"/>
     <a class="inline-block mt-2 text-xs text-blue-500 hover:text-blue-600 hover:underline" href="#">
      客户自主领取号
     </a>
    </div>
   </div>
   <div class="mt-7 pl-[152px] flex items-center gap-3">
    <button class="inline-flex items-center justify-center rounded bg-[#C4A373] px-6 py-2 text-sm font-medium text-white shadow-sm hover:bg-[#b28f5d] transition-colors">
     提交
    </button>
    <a class="inline-flex items-center justify-center rounded border border-gray-300 bg-white px-6 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors" href="#">
     返回
    </a>
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
