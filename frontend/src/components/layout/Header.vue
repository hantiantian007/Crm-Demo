<template>
  <header class="h-16 bg-topBarBg shadow-sm flex items-center justify-between px-8 z-10 flex-shrink-0">
    <!-- 面包屑导航简易实现 -->
    <div class="flex items-center text-sm text-gray-500 gap-4">
      <div class="flex items-center">
        <!-- 基础标题 -->
        <span v-if="!route.meta.breadcrumb" class="text-gray-700 font-medium">{{ route.meta.title || '首页' }}</span>
        
        <!-- 动态面包屑 -->
        <template v-if="route.meta.breadcrumb">
          <template v-for="(item, index) in route.meta.breadcrumb" :key="index">
            <span :class="index === route.meta.breadcrumb.length - 1 ? 'text-gray-700 font-medium' : 'hover:text-gray-700 cursor-pointer'">{{ item }}</span>
            <i v-if="index < route.meta.breadcrumb.length - 1" class="fa-solid fa-angle-right mx-2 text-xs"></i>
          </template>
        </template>
      </div>
      
      <div class="flex items-center gap-2 border-l pl-4 border-gray-200">
        <!-- 需求看板入口 -->
        <router-link to="/kanban" class="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded text-xs font-medium transition-colors flex items-center">
          <i class="fa-solid fa-layer-group mr-1.5"></i> 需求看板
        </router-link>

        <!-- 历史需求记录入口 -->
        <router-link to="/history-kanban" class="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded text-xs font-medium transition-colors flex items-center">
          <i class="fa-solid fa-clock-rotate-left mr-1.5"></i> 历史需求记录
        </router-link>
        
        <!-- 全局 PRD 按钮 (仅在配置了 prdUrl 时显示) -->
        <button v-if="route.meta.prdUrl" @click="handleOpenPrd" class="px-3 py-1.5 bg-amber-50 hover:bg-amber-100 text-amber-700 rounded text-xs font-medium transition-colors flex items-center gap-1.5 border border-amber-200">
          <i class="fa-solid fa-file-lines"></i> 详情页 PRD
        </button>
      </div>
    </div>
    
    <!-- 右侧个人中心 -->
    <div class="flex items-center gap-4 relative group cursor-pointer">
      <div class="w-8 h-8 rounded-full bg-gray-200 text-white flex items-center justify-center overflow-hidden border border-gray-200 shadow-sm">
        <span class="text-sm font-bold text-gray-600">SM</span>
      </div>
      <div class="absolute right-0 top-[100%] mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform origin-top-right z-50">
        <div class="px-4 py-3 border-b border-gray-100 bg-gray-50/50 rounded-t-lg">
          <p class="text-sm font-medium text-gray-800">史密斯</p>
          <p class="text-xs text-gray-500 mt-0.5 truncate">admin@dev.com</p>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { useRoute } from 'vue-router'
import { openPrd } from '@/store/prd'

const route = useRoute()

const handleOpenPrd = () => {
  if (route.meta.prdUrl) {
    openPrd(route.meta.prdUrl, route.meta.prdTitle || 'PRD 文档')
  }
}
</script>
