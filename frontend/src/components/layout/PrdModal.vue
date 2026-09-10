<template>
  <el-drawer
    v-model="prdState.visible"
    :title="prdState.title"
    size="80%"
    direction="rtl"
    destroy-on-close
    class="custom-prd-drawer"
    @close="closePrd"
  >
    <div class="h-full w-full bg-gray-50 rounded-lg overflow-hidden border border-gray-200">
      <iframe 
        v-if="prdState.url" 
        :src="prdState.url" 
        class="w-full h-full border-none"
        title="PRD Preview"
      ></iframe>
      <div v-else class="flex h-full items-center justify-center text-gray-400">
        加载中...
      </div>
    </div>
  </el-drawer>
</template>

<script setup>
import { prdState, closePrd } from '@/store/prd'
</script>

<style>
.custom-prd-drawer .el-drawer__body {
  padding: 10px 20px 20px 20px;
}
</style>
