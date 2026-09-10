<template>
  <div class="flex h-full bg-mainBg overflow-hidden">
    <div class="flex-1 flex flex-col min-w-0 bg-gray-50 overflow-hidden p-4 custom-scrollbar overflow-y-auto">
      <div class="p-5 flex-1 flex flex-col">
 <h3 class="text-lg font-bold text-gray-900 mb-2">
  先锋一号
 </h3>
 <p class="text-sm text-gray-500 mb-4 line-clamp-2 flex-1">
  顶级量化团队操盘，穿越牛熊周期，为您的资产提供稳健的增值托管服务。
 </p>
 <div class="flex items-center gap-2 mb-4">
  <span class="px-2 py-1 bg-gray-50 border border-gray-100 text-gray-600 rounded text-xs flex items-center gap-1">
   <i class="fas fa-wallet text-gray-400">
   </i>
   余额购买
  </span>
 </div>
 <div class="flex justify-between items-center border-t border-gray-100 pt-4 mt-auto">
  <div>
   <span class="text-xs text-gray-500 block mb-0.5">
    金额 (库存: 999)
   </span>
   <div class="text-xl font-bold text-gray-900">
    <span class="text-sm font-normal text-gray-500 mr-1">
     $
    </span>
    5,000.00 起
   </div>
  </div>
  <a class="px-5 py-2 bg-primary hover:bg-primaryHover text-white rounded-lg text-sm font-medium transition-colors shadow-sm text-blue-500 hover:text-blue-700" href="#">
   查看详情
  </a>
 </div>
</div>

    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
</script>
