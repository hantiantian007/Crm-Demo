<template>
  <div class="flex h-full bg-mainBg overflow-hidden">
    <div class="flex-1 flex flex-col min-w-0 bg-gray-50 overflow-hidden p-4 custom-scrollbar overflow-y-auto">
      <div class="flex-1 overflow-y-auto p-4">
 <div class="w-full space-y-4">
  <!-- 活动详情概览 -->
  <div class="bg-gradient-to-r from-amber-50 via-white to-teal-50 rounded-xl border border-amber-100 card-shadow overflow-hidden">
   <div class="px-6 py-5 border-b border-amber-100/60 flex flex-wrap items-center gap-4 justify-between">
    <div class="flex items-center gap-4">
     <div>
      <h2 class="text-base font-bold text-gray-800 flex items-center gap-2">
       注册送赠金
       <span class="inline-flex px-2.5 py-0.5 rounded-full text-[11px] font-medium status-running">
        进行中
       </span>
      </h2>
      <p class="text-xs text-gray-500 mt-0.5">
       活动有效期：2026-10-01 00:00:00 至 2026-10-31 23:59:59
      </p>
     </div>
    </div>
   </div>
   <div class="px-6 py-4 grid grid-cols-2 md:grid-cols-5 gap-4">
    <div>
     <p class="text-xs text-gray-500 mb-1">
      活动模型
     </p>
     <p class="text-sm font-bold text-gray-800">
      注册赠金模型
     </p>
    </div>
    <div>
     <p class="text-xs text-gray-500 mb-1">
      参与对象
     </p>
     <p class="text-sm font-bold text-gray-800">
      全部新用户
     </p>
    </div>
    <div>
     <p class="text-xs text-gray-500 mb-1">
      触发条件
     </p>
     <p class="text-sm font-bold text-gray-800">
      实名通过
     </p>
    </div>
    <div>
     <p class="text-xs text-gray-500 mb-1">
      奖励规则
     </p>
     <p class="text-sm font-bold text-gray-800">
      固定金额 $50.00
     </p>
    </div>
    <div>
     <p class="text-xs text-gray-500 mb-1">
      创建人
     </p>
     <p class="text-sm font-bold text-gray-800">
      系统管理员
     </p>
    </div>
   </div>
  </div>
  <!-- 汇总统计卡片 -->
  <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
   <div class="bg-white rounded-xl card-shadow border border-gray-100 p-5">
    <div class="flex items-center justify-between mb-2">
     <span class="text-xs text-gray-500">
      参与总人数
     </span>
    </div>
    <p class="text-2xl font-bold text-gray-800">
     352
    </p>
   </div>
   <div class="bg-white rounded-xl card-shadow border border-gray-100 p-5">
    <div class="flex items-center justify-between mb-2">
     <span class="text-xs text-gray-500">
      累计奖励笔数
     </span>
    </div>
    <p class="text-2xl font-bold text-[#65A30D]">
     120
    </p>
   </div>
   <div class="bg-white rounded-xl card-shadow border border-gray-100 p-5">
    <div class="flex items-center justify-between mb-2">
     <span class="text-xs text-gray-500">
      累计奖励金额 (USD)
     </span>
    </div>
    <p class="text-2xl font-bold text-blue-600">
     6,000.0000
    </p>
   </div>
  </div>
  <!-- 用户列表 -->
  <div class="bg-white rounded-xl border border-gray-100 card-shadow overflow-hidden">
   <!-- 搜索筛选 -->
   <div class="px-5 py-3 border-b border-gray-100">
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-3 text-xs items-center">
     <div class="lg:col-span-3 flex items-center gap-2">
      <span class="text-gray-500 shrink-0">
       客户名称/邮箱:
      </span>
      <input class="filter-input flex-1" placeholder="搜索客户" type="text"/>
     </div>
     <div class="lg:col-span-3 flex items-center gap-2">
      <button class="h-8 px-4 rounded-md bg-primary text-white text-xs hover:bg-primaryHover transition-colors font-medium">
       <i class="fa-solid fa-magnifying-glass mr-1.5">
       </i>
       搜索
      </button>
      <button class="h-8 px-4 rounded-md border border-gray-200 bg-white text-gray-600 text-xs hover:bg-gray-50 transition-colors">
       重置
      </button>
     </div>
    </div>
   </div>
   <!-- 表格 -->
   <div class="overflow-x-auto">
    <table class="w-full text-sm">
     <thead>
      <tr class="text-gray-500 border-b border-gray-100 text-center">
       <th class="font-medium py-3 px-3 text-left">
        客户姓名
       </th>
       <th class="font-medium py-3 px-3 text-left">
        邮箱
       </th>
       <th class="font-medium py-3 px-3 text-left">
        客户分组
       </th>
       <th class="font-medium py-3 px-3">
        达标MT账号
       </th>
       <th class="font-medium py-3 px-3">
        注册时间
       </th>
       <th class="font-medium py-3 px-3">
        达标时间
       </th>
       <th class="font-medium py-3 px-3">
        发放金额 (USD)
       </th>
       <th class="font-medium py-3 px-3">
        状态
       </th>
      </tr>
     </thead>
     <tbody class="text-gray-700 text-center">
      <tr class="table-row border-b border-gray-100">
       <td class="py-3 px-3 text-left font-medium text-gray-800">
        王建国
       </td>
       <td class="py-3 px-3 text-left text-gray-500">
        wangjianguo@example.com
       </td>
       <td class="py-3 px-3 text-left text-gray-500">
        Hatc/China/Direct
       </td>
       <td class="py-3 px-3 font-medium text-gray-800">
        8001023
       </td>
       <td class="py-3 px-3 text-gray-500">
        2026-10-02 10:15:30
       </td>
       <td class="py-3 px-3 text-gray-500">
        2026-10-02 10:30:15
       </td>
       <td class="py-3 px-3 font-medium text-blue-600">
        50.0000
       </td>
       <td class="py-3 px-3">
        <span class="inline-flex px-2 py-0.5 rounded-full text-[11px] font-medium status-pill-qualified">
         已发放
        </span>
       </td>
      </tr>
      <tr class="table-row border-b border-gray-100">
       <td class="py-3 px-3 text-left font-medium text-gray-800">
        李雪
       </td>
       <td class="py-3 px-3 text-left text-gray-500">
        lixue88@example.com
       </td>
       <td class="py-3 px-3 text-left text-gray-500">
        Hatc/VIP/Group1
       </td>
       <td class="py-3 px-3 font-medium text-gray-800">
        8001055
       </td>
       <td class="py-3 px-3 text-gray-500">
        2026-10-05 14:20:00
       </td>
       <td class="py-3 px-3 text-gray-500">
        2026-10-05 15:45:22
       </td>
       <td class="py-3 px-3 font-medium text-blue-600">
        50.0000
       </td>
       <td class="py-3 px-3">
        <span class="inline-flex px-2 py-0.5 rounded-full text-[11px] font-medium status-pill-qualified">
         已发放
        </span>
       </td>
      </tr>
     </tbody>
    </table>
   </div>
   <!-- 底部分页 -->
   <div class="flex items-center justify-between px-6 py-4 border-t border-gray-100 text-[13px] text-gray-500">
    <div>
     15条 / 页
     <span class="mx-1">
      2条记录，第1/1页
     </span>
    </div>
    <div class="flex items-center gap-1">
     <button class="w-7 h-7 flex items-center justify-center rounded border border-gray-200 hover:bg-gray-50 text-gray-400 transition-colors">
      <i class="fa-solid fa-chevron-left text-[10px]">
      </i>
     </button>
     <button class="w-7 h-7 flex items-center justify-center rounded bg-[#C4A373] text-white font-medium shadow-sm">
      1
     </button>
     <button class="w-7 h-7 flex items-center justify-center rounded border border-gray-200 hover:bg-gray-50 text-gray-400 transition-colors">
      <i class="fa-solid fa-chevron-right text-[10px]">
      </i>
     </button>
    </div>
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
