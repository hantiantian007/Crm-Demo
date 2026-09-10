<template>
  <div class="bg-mainBg font-sans text-gray-800 antialiased h-screen overflow-hidden flex">
    <template v-if="route.meta.layout === 'empty'">
      <router-view class="flex-1 w-full h-full min-w-0"></router-view>
    </template>
    <template v-else>
      <Sidebar />
      <main class="flex-1 flex flex-col min-w-0">
        <Header />
        <div class="flex-1 p-4 bg-gray-50 flex flex-col overflow-hidden relative">
          <router-view class="flex-1 w-full h-full min-w-0"></router-view>
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