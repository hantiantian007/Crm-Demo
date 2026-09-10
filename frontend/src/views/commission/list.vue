<template>
  <div class="flex h-full bg-mainBg overflow-hidden">
    <div class="bg-white rounded-xl shadow-sm border border-gray-100 flex flex-1 gap-0 overflow-hidden min-h-[600px]" id="configArea">
 <aside class="w-[280px] border-r border-gray-100 flex flex-col bg-gray-50/30">
  <div class="px-4 py-3 border-b border-gray-100">
   <div class="flex items-center gap-2 text-gray-800 font-semibold text-[14px] mb-2">
    <i class="fas fa-sitemap text-primaryBtn">
    </i>
    MT分组
   </div>
   <div class="bg-blue-600 text-white rounded-lg px-4 py-2.5 flex items-center justify-between cursor-pointer hover:bg-blue-700 transition-colors">
    <span class="text-sm font-medium">
     ALL
    </span>
    <i class="fas fa-list text-xs opacity-70">
    </i>
   </div>
  </div>
  <div class="flex-1 overflow-y-auto p-3 space-y-1 text-sm" id="groupTree">
   <div class="space-y-1">
    <div class="group-item hover:bg-blue-50 rounded-lg px-3 py-2 flex items-center justify-between cursor-pointer text-gray-700 border border-transparent" data-group="413-华安">
     <div class="flex items-center gap-2">
      <i class="far fa-check-circle text-green-500 text-xs">
      </i>
      <span>
       413-华安
      </span>
     </div>
     <div class="flex items-center gap-1">
      <span class="group-status text-[11px] px-2 py-0.5 rounded-full bg-green-100 text-green-700">
       已配置
      </span>
      <i class="fas fa-chevron-down text-[9px] text-gray-400">
      </i>
     </div>
    </div>
    <div class="pl-4 space-y-1">
     <div class="group-item hover:bg-blue-50 rounded-lg px-3 py-2 flex items-center justify-between cursor-pointer text-gray-700 border border-transparent" data-group="4-test-测试-B">
      <div class="flex items-center gap-2">
       <i class="far fa-check-circle text-green-500 text-xs">
       </i>
       <span>
        4-test-测试-B
       </span>
      </div>
      <div class="flex items-center gap-1">
       <span class="group-status text-[11px] px-2 py-0.5 rounded-full bg-green-100 text-green-700">
        已配置
       </span>
       <i class="fas fa-chevron-down text-[9px] text-gray-400">
       </i>
      </div>
     </div>
     <div class="pl-4 space-y-1">
      <div class="group-item bg-primaryBtn text-white font-medium rounded-lg px-3 py-2 flex items-center justify-between cursor-pointer border border-transparent" data-group="18-test-测试-C">
       <div class="flex items-center gap-2">
        <i class="far fa-check-circle text-green-200 text-xs">
        </i>
        <span>
         18-test-测试-C
        </span>
       </div>
       <span class="group-status text-[11px] px-2 py-0.5 rounded-full bg-green-100/90 text-green-800">
        已配置
       </span>
      </div>
      <div class="group-item hover:bg-blue-50 rounded-lg px-3 py-2 flex items-center justify-between cursor-pointer text-gray-700 border border-transparent" data-group="168-test-杨平">
       <div class="flex items-center gap-2">
        <i class="far fa-dot-circle text-red-500 text-xs">
        </i>
        <span>
         168-test-杨平
        </span>
       </div>
       <span class="group-status text-[11px] px-2 py-0.5 rounded-full bg-red-100 text-red-700">
        未配置
       </span>
      </div>
     </div>
     <div class="group-item hover:bg-blue-50 rounded-lg px-3 py-2 flex items-center justify-between cursor-pointer text-gray-700 border border-transparent" data-group="389-test-华和翰">
      <div class="flex items-center gap-2">
       <i class="far fa-check-circle text-green-500 text-xs">
       </i>
       <span>
        389-test-华和翰
       </span>
      </div>
      <div class="flex items-center gap-1">
       <span class="group-status text-[11px] px-2 py-0.5 rounded-full bg-green-100 text-green-700">
        已配置
       </span>
       <i class="fas fa-chevron-right text-[9px] text-gray-400">
       </i>
      </div>
     </div>
     <div class="group-item hover:bg-blue-50 rounded-lg px-3 py-2 flex items-center justify-between cursor-pointer text-gray-700 border border-transparent" data-group="435-test-Han">
      <div class="flex items-center gap-2">
       <i class="far fa-check-circle text-green-500 text-xs">
       </i>
       <span>
        435-test-Han
       </span>
      </div>
      <div class="flex items-center gap-1">
       <span class="group-status text-[11px] px-2 py-0.5 rounded-full bg-green-100 text-green-700">
        已配置
       </span>
       <i class="fas fa-chevron-right text-[9px] text-gray-400">
       </i>
      </div>
     </div>
    </div>
   </div>
  </div>
 </aside>
 <section class="flex-1 flex flex-col">
  <div class="right-header px-6 py-4 border-b border-gray-100 flex items-center justify-between">
   <div class="text-sm text-gray-500 flex items-center gap-2">
    <i class="fas fa-info-circle text-blue-500">
    </i>
    <span>
     恒等式说明：
     <span class="font-mono text-gray-700 font-medium">
      可分佣金额 = 分佣值（返给上级） + 剩余层级可分佣金额（自己的池）
     </span>
    </span>
   </div>
   <button class="bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded text-sm transition-colors flex items-center gap-1.5">
    <i class="fas fa-edit">
    </i>
    编辑
   </button>
  </div>
  <div class="flex-1 p-6 overflow-auto" id="productsArea">
  </div>
 </section>
</div>

  </div>
</template>

<script setup>
import { ref } from 'vue'
</script>
