<template>
  <div class="flex h-full bg-mainBg overflow-hidden">
    <div class="flex-1 flex flex-col min-w-0 bg-gray-50 overflow-hidden p-4 custom-scrollbar overflow-y-auto">
      <div class="flex flex-1 items-center border border-gray-300 rounded overflow-hidden">
 <input class="px-3 py-2 outline-none flex-1 text-center text-gray-400" placeholder="开始日期" type="text"/>
 <span class="bg-gray-50 px-2 py-2 text-gray-400 border-x border-gray-300">
  到
 </span>
 <input class="px-3 py-2 outline-none flex-1 text-center text-gray-400" placeholder="结束日期" type="text"/>
</div>

    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
</script>
