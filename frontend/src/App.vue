<template>
  <div class="bg-mainBg font-sans text-gray-800 antialiased h-screen flex min-w-0">
    <template v-if="route.meta.layout === 'empty'">
      <div class="flex-1 min-w-0 overflow-y-auto">
        <router-view class="w-full min-w-0 min-h-full"></router-view>
      </div>
    </template>
    <template v-else>
      <Sidebar />
      <main class="flex-1 flex flex-col min-w-0">
        <Header />
        <div class="flex-1 p-4 bg-gray-50 relative overflow-y-auto min-w-0">
          <router-view class="w-full min-w-0 min-h-full"></router-view>
        </div>
      </main>
      <PrdModal />
    </template>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'
import Sidebar from '@/components/layout/Sidebar.vue'
import Header from '@/components/layout/Header.vue'
import PrdModal from '@/components/layout/PrdModal.vue'

const route = useRoute()
</script>
