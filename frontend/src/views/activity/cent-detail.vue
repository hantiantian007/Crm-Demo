<template>
  <div class="flex h-full bg-mainBg overflow-hidden">
    <div class="flex-1 flex flex-col min-w-0 bg-gray-50 overflow-hidden p-4 custom-scrollbar overflow-y-auto">
      <div class="flex-1 overflow-y-auto p-6">
 <div class="w-full space-y-6">
  <!-- 计划详情区块 -->
  <div class="bg-white rounded-lg card-shadow">
   <div class="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
    <h3 class="text-[15px] font-bold text-gray-800">
     计划详情
    </h3>
    <span class="px-3 py-1 bg-green-50 text-green-600 text-xs font-medium rounded border border-green-100">
     进行中
    </span>
   </div>
   <div class="p-6 grid grid-cols-2 md:grid-cols-5 gap-8">
    <div>
     <p class="info-label">
      计划名称
     </p>
     <p class="info-value">
      先锋一号+美分联名计划
     </p>
    </div>
    <div>
     <p class="info-label">
      活动有效期
     </p>
     <p class="info-value">
      长期有效
     </p>
    </div>
    <div>
     <p class="info-label">
      全局限制
     </p>
     <p class="info-value">
      5次/日，单日上限 1,000.00 USDC
     </p>
    </div>
    <div>
     <p class="info-label">
      创建人
     </p>
     <p class="info-value">
      史密斯
     </p>
    </div>
    <div>
     <p class="info-label">
      更新时间
     </p>
     <p class="info-value">
      2026-02-03 12:16:27
     </p>
    </div>
   </div>
  </div>
  <!-- 等级配置/阶梯表格 -->
  <div class="bg-white rounded-lg card-shadow overflow-hidden">
   <div class="px-6 py-4 border-b border-gray-100">
    <h3 class="text-[15px] font-bold text-gray-800">
     奖励阶梯配置 (底层参数只读)
    </h3>
   </div>
   <div class="overflow-x-auto no-scrollbar">
    <table class="w-full text-[13px] text-center">
     <thead>
      <tr class="bg-gray-50/50 border-b border-gray-200">
       <th class="px-6 py-4 font-medium text-gray-500">
        入金门槛 (USD)
       </th>
       <th class="px-6 py-4 font-medium text-gray-500">
        对应美分账户额度 / 标准账户同等购买力
       </th>
       <th class="px-6 py-4 font-medium text-gray-500">
        触发奖励单量要求 (Lot)
       </th>
       <th class="px-6 py-4 font-medium text-gray-500">
        单笔奖励金额 (USDC)
       </th>
      </tr>
     </thead>
     <tbody class="divide-y divide-gray-100">
      <tr class="hover:bg-gray-50 transition-colors">
       <td class="px-6 py-4 text-gray-700">
        1,000.00
       </td>
       <td class="px-6 py-4 text-gray-700">
        100,000
       </td>
       <td class="px-6 py-4 text-gray-700">
        0.10
       </td>
       <td class="px-6 py-4 text-gray-700">
        20.00
       </td>
      </tr>
      <tr class="hover:bg-gray-50 transition-colors">
       <td class="px-6 py-4 text-gray-700">
        2,000.00
       </td>
       <td class="px-6 py-4 text-gray-700">
        200,000
       </td>
       <td class="px-6 py-4 text-gray-700">
        0.20
       </td>
       <td class="px-6 py-4 text-gray-700">
        40.00
       </td>
      </tr>
      <tr class="hover:bg-gray-50 transition-colors">
       <td class="px-6 py-4 text-gray-700">
        3,000.00
       </td>
       <td class="px-6 py-4 text-gray-700">
        300,000
       </td>
       <td class="px-6 py-4 text-gray-700">
        0.30
       </td>
       <td class="px-6 py-4 text-gray-700">
        60.00
       </td>
      </tr>
      <tr class="hover:bg-gray-50 transition-colors">
       <td class="px-6 py-4 text-gray-700">
        4,000.00
       </td>
       <td class="px-6 py-4 text-gray-700">
        400,000
       </td>
       <td class="px-6 py-4 text-gray-700">
        0.40
       </td>
       <td class="px-6 py-4 text-gray-700">
        80.00
       </td>
      </tr>
      <tr class="hover:bg-gray-50 transition-colors">
       <td class="px-6 py-4 text-gray-700">
        5,000.00
       </td>
       <td class="px-6 py-4 text-gray-700">
        500,000
       </td>
       <td class="px-6 py-4 text-gray-700">
        0.50
       </td>
       <td class="px-6 py-4 text-gray-700">
        100.00
       </td>
      </tr>
      <tr class="hover:bg-gray-50 transition-colors">
       <td class="px-6 py-4 text-gray-700">
        10,000.00
       </td>
       <td class="px-6 py-4 text-gray-700">
        1,000,000
       </td>
       <td class="px-6 py-4 text-gray-700">
        1.00
       </td>
       <td class="px-6 py-4 text-gray-700">
        200.00
       </td>
      </tr>
      <tr class="hover:bg-gray-50 transition-colors">
       <td class="px-6 py-4 text-gray-700">
        20,000.00
       </td>
       <td class="px-6 py-4 text-gray-700">
        2,000,000
       </td>
       <td class="px-6 py-4 text-gray-700">
        1.00
       </td>
       <td class="px-6 py-4 text-gray-700">
        200.00
       </td>
      </tr>
     </tbody>
    </table>
   </div>
  </div>
  <!-- 底部数据模块 (整合原监控报表) -->
  <div class="bg-white rounded-lg card-shadow mt-6">
   <!-- Tabs -->
   <div class="flex items-center px-4 border-b border-gray-100">
    <div class="tab-item active">
     客户列表
    </div>
    <div class="tab-item">
     交易记录
    </div>
    <div class="tab-item">
     历史统计
    </div>
   </div>
   <!-- 筛选区域 -->
   <div class="p-5 border-b border-gray-50 bg-[#FAFAFA]">
    <div class="flex flex-wrap items-center gap-6">
     <div class="flex items-center gap-3">
      <span class="text-[13px] font-medium text-gray-700 w-16">
       客户邮箱:
      </span>
      <input class="filter-input w-64" placeholder="请输入客户邮箱" type="text"/>
     </div>
     <div class="flex items-center gap-3">
      <span class="text-[13px] font-medium text-gray-700 w-16">
       MT 账号:
      </span>
      <input class="filter-input w-48" placeholder="输入绑定账号" type="text"/>
     </div>
     <div class="flex items-center gap-3">
      <span class="text-[13px] font-medium text-gray-700 w-16">
       监控状态:
      </span>
      <select class="filter-select w-40">
       <option>
        请选择
       </option>
       <option>
        正常 (达标)
       </option>
       <option>
        未达标
       </option>
       <option>
        异常违规
       </option>
      </select>
     </div>
    </div>
    <div class="mt-4 flex gap-3">
     <button class="btn-golden px-6 py-2 rounded font-medium text-[13px]">
      搜索
     </button>
     <button class="btn-outline px-6 py-2 rounded font-medium text-[13px]">
      重置
     </button>
    </div>
   </div>
   <!-- 数据列表 -->
   <div class="overflow-x-auto no-scrollbar">
    <table class="w-full text-[13px] text-center">
     <thead>
      <tr class="bg-white border-b border-gray-100">
       <th class="px-6 py-4 font-medium text-gray-500">
        CRM 客户邮箱
       </th>
       <th class="px-6 py-4 font-medium text-gray-500">
        唯一绑定 MT 账号
       </th>
       <th class="px-6 py-4 font-medium text-gray-500">
        首笔入金 (USD)
       </th>
       <th class="px-6 py-4 font-medium text-gray-500">
        累计达标订单
       </th>
       <th class="px-6 py-4 font-medium text-gray-500">
        今日派发次数
       </th>
       <th class="px-6 py-4 font-medium text-gray-500">
        累计派发 (USDC)
       </th>
       <th class="px-6 py-4 font-medium text-gray-500">
        监控状态
       </th>
      </tr>
     </thead>
     <tbody class="divide-y divide-gray-50">
      <tr class="hover:bg-gray-50 transition-colors">
       <td class="px-6 py-4 text-gray-700">
        user1@example.com
       </td>
       <td class="px-6 py-4 font-mono text-gray-600">
        8001234
       </td>
       <td class="px-6 py-4 text-gray-700">
        1,500.00
       </td>
       <td class="px-6 py-4 text-gray-700">
        12
       </td>
       <td class="px-6 py-4 text-gray-500">
        2 / 5
       </td>
       <td class="px-6 py-4 font-medium text-green-600">
        240.00
       </td>
       <td class="px-6 py-4">
        <span class="text-xs bg-green-50 text-green-600 border border-green-100 px-2.5 py-1 rounded">
         正常
        </span>
       </td>
      </tr>
      <tr class="hover:bg-gray-50 transition-colors">
       <td class="px-6 py-4 text-gray-700">
        john.doe@test.com
       </td>
       <td class="px-6 py-4 font-mono text-gray-600">
        8009876
       </td>
       <td class="px-6 py-4 text-gray-700">
        5,000.00
       </td>
       <td class="px-6 py-4 text-gray-700">
        50
       </td>
       <td class="px-6 py-4 text-orange-500 font-bold">
        5 / 5
       </td>
       <td class="px-6 py-4 font-medium text-green-600">
        5,000.00
       </td>
       <td class="px-6 py-4">
        <span class="text-xs bg-orange-50 text-orange-600 border border-orange-100 px-2.5 py-1 rounded" title="今日已达防刷上限">
         触及上限
        </span>
       </td>
      </tr>
      <tr class="hover:bg-red-50/30 bg-red-50/10 transition-colors">
       <td class="px-6 py-4 text-gray-700">
        spammer@fake.com
       </td>
       <td class="px-6 py-4 font-mono text-gray-600">
        8005555
       </td>
       <td class="px-6 py-4 text-gray-700">
        2,000.00
       </td>
       <td class="px-6 py-4 text-red-500 font-bold">
        8
       </td>
       <td class="px-6 py-4 text-gray-500">
        0 / 5
       </td>
       <td class="px-6 py-4 font-medium text-gray-400">
        0.00
       </td>
       <td class="px-6 py-4">
        <span class="text-xs bg-red-50 text-red-600 border border-red-100 px-2.5 py-1 rounded font-bold">
         违规拦截
        </span>
       </td>
      </tr>
     </tbody>
    </table>
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
