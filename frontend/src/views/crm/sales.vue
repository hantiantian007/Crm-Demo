<template>
  <div class="flex h-full bg-mainBg overflow-hidden">
    <div class="flex-1 flex flex-col min-w-0 bg-gray-50 overflow-hidden p-4 custom-scrollbar overflow-y-auto">
      <div class="flex-1 p-6 overflow-y-auto bg-white m-4 rounded-lg shadow-sm border border-gray-100 flex flex-col">
 <!-- 1. 顶部搜索过滤区 -->
 <div class="flex flex-wrap items-center justify-between gap-4 mb-6 bg-gray-50 p-4 rounded border border-gray-100">
  <div class="flex flex-wrap items-center gap-4 flex-1">
   <!-- 销售名称 -->
   <div class="flex items-center bg-white border border-blue-200 rounded overflow-hidden shadow-sm">
    <span class="bg-blue-50 text-gray-600 text-sm px-3 py-1.5 border-r border-blue-200">
     销售名称:
    </span>
    <input class="px-3 py-1.5 text-sm outline-none w-32 focus:bg-blue-50/30" placeholder="请输入销售名称" type="text"/>
   </div>
   <!-- 销售邮箱 -->
   <div class="flex items-center bg-white border border-gray-200 rounded overflow-hidden">
    <span class="bg-gray-50 text-gray-600 text-sm px-3 py-1.5 border-r border-gray-200">
     销售邮箱:
    </span>
    <input class="px-3 py-1.5 text-sm outline-none w-40" placeholder="请输入客户邮箱" type="text"/>
   </div>
   <!-- 享受返佣 (下拉) -->
   <div class="flex items-center bg-white border border-gray-200 rounded overflow-hidden">
    <span class="bg-gray-50 text-gray-600 text-sm px-3 py-1.5 border-r border-gray-200">
     享受返佣:
    </span>
    <select class="px-3 py-1.5 text-sm outline-none text-gray-500 bg-white w-24 cursor-pointer">
     <option value="">
      请选择
     </option>
     <option value="1">
      是
     </option>
     <option value="0">
      否
     </option>
    </select>
   </div>
   <!-- 交易奖励 (下拉) -->
   <div class="flex items-center bg-white border border-gray-200 rounded overflow-hidden">
    <span class="bg-gray-50 text-gray-600 text-sm px-3 py-1.5 border-r border-gray-200">
     交易奖励:
    </span>
    <select class="px-3 py-1.5 text-sm outline-none text-gray-500 bg-white w-24 cursor-pointer">
     <option value="">
      请选择
     </option>
     <option value="1">
      是
     </option>
     <option value="0">
      否
     </option>
    </select>
   </div>
   <!-- 净入金奖励 (下拉) -->
   <div class="flex items-center bg-white border border-gray-200 rounded overflow-hidden">
    <span class="bg-gray-50 text-gray-600 text-sm px-3 py-1.5 border-r border-gray-200">
     净入金奖励:
    </span>
    <select class="px-3 py-1.5 text-sm outline-none text-gray-500 bg-white w-24 cursor-pointer">
     <option value="">
      请选择
     </option>
     <option value="1">
      是
     </option>
     <option value="0">
      否
     </option>
    </select>
   </div>
  </div>
  <!-- 右侧操作按钮组 -->
  <div class="flex items-center gap-2">
   <button class="bg-primaryBtn hover:bg-primaryBtnHover text-white px-5 py-1.5 rounded text-sm transition-colors shadow-sm">
    查询
   </button>
   <button class="bg-gray-400 hover:bg-gray-500 text-white px-5 py-1.5 rounded text-sm transition-colors shadow-sm">
    重置
   </button>
   <a class="bg-primaryBtn hover:bg-primaryBtnHover text-white px-5 py-1.5 rounded text-sm transition-colors shadow-sm flex items-center gap-1 ml-2" href="#">
    <i class="fa-solid fa-plus text-xs">
    </i>
    新增账户
   </a>
  </div>
 </div>
 <!-- 2. 数据表格区 -->
 <div class="flex-1 overflow-auto border border-gray-200 rounded">
  <table class="w-full custom-table text-sm">
   <thead class="bg-tableHeader sticky top-0 z-10">
    <tr>
     <th class="w-24">
      销售名称
     </th>
     <th class="w-48">
      销售邮箱
     </th>
     <th class="w-24">
      是否享受返佣
     </th>
     <th class="w-32">
      是否开启交易奖励
     </th>
     <th class="w-32">
      交易奖励周期
     </th>
     <th class="w-32">
      是否开启净入金奖励
     </th>
     <th class="w-32">
      净入金奖励周期
     </th>
     <th class="w-24">
      更新人
     </th>
     <th class="w-32">
      更新时间
     </th>
     <th class="w-24">
      操作
     </th>
    </tr>
   </thead>
   <tbody>
    <!-- 数据行 1 -->
    <tr>
     <td>
      刘浩
     </td>
     <td>
      XXXXX@qq.com
     </td>
     <td>
      是
     </td>
     <td>
      是
     </td>
     <td>
      每月最后一天
     </td>
     <td>
      是
     </td>
     <td>
      每月最后一天
     </td>
     <td>
      admin
     </td>
     <td>
      2025-01-01
     </td>
     <td class="text-sm">
      <button class="mx-1 text-blue-500 hover:text-blue-700">
       详情
      </button>
      <button class="text-[#41B8AF] hover:text-[#359f97] mx-1">
       编辑
      </button>
     </td>
    </tr>
    <!-- 数据行 2 -->
    <tr>
     <td>
      张三
     </td>
     <td>
      XXXXX@qq.com
     </td>
     <td>
      否
     </td>
     <td>
      否
     </td>
     <td>
      季度最后一天
     </td>
     <td>
      否
     </td>
     <td>
      季度最后一天
     </td>
     <td>
      admin
     </td>
     <td>
      2025-01-01
     </td>
     <td class="text-sm">
      <button class="mx-1 text-blue-500 hover:text-blue-700">
       详情
      </button>
      <button class="text-[#41B8AF] hover:text-[#359f97] mx-1">
       编辑
      </button>
     </td>
    </tr>
    <!-- 填充空白行以模拟截图效果 -->
    <tr>
     <td>
     </td>
     <td>
     </td>
     <td>
     </td>
     <td>
     </td>
     <td>
     </td>
     <td>
     </td>
     <td>
     </td>
     <td>
     </td>
     <td>
     </td>
     <td>
     </td>
    </tr>
    <tr>
     <td>
     </td>
     <td>
     </td>
     <td>
     </td>
     <td>
     </td>
     <td>
     </td>
     <td>
     </td>
     <td>
     </td>
     <td>
     </td>
     <td>
     </td>
     <td>
     </td>
    </tr>
    <tr>
     <td>
     </td>
     <td>
     </td>
     <td>
     </td>
     <td>
     </td>
     <td>
     </td>
     <td>
     </td>
     <td>
     </td>
     <td>
     </td>
     <td>
     </td>
     <td>
     </td>
    </tr>
    <tr>
     <td>
     </td>
     <td>
     </td>
     <td>
     </td>
     <td>
     </td>
     <td>
     </td>
     <td>
     </td>
     <td>
     </td>
     <td>
     </td>
     <td>
     </td>
     <td>
     </td>
    </tr>
    <tr>
     <td>
     </td>
     <td>
     </td>
     <td>
     </td>
     <td>
     </td>
     <td>
     </td>
     <td>
     </td>
     <td>
     </td>
     <td>
     </td>
     <td>
     </td>
     <td>
     </td>
    </tr>
    <tr>
     <td>
     </td>
     <td>
     </td>
     <td>
     </td>
     <td>
     </td>
     <td>
     </td>
     <td>
     </td>
     <td>
     </td>
     <td>
     </td>
     <td>
     </td>
     <td>
     </td>
    </tr>
   </tbody>
  </table>
 </div>
 <!-- 3. 底部翻页区 -->
 <div class="flex items-center justify-end mt-4 text-sm text-gray-500">
  <span class="mr-4">
   共 658 条
  </span>
  <div class="flex items-center gap-1">
   <button class="w-8 h-8 flex items-center justify-center rounded hover:bg-gray-100 text-gray-400">
    <i class="fa-solid fa-chevron-left text-xs">
    </i>
   </button>
   <button class="w-8 h-8 flex items-center justify-center rounded hover:bg-gray-100">
    50
   </button>
   <!-- 当前激活页 -->
   <button class="w-8 h-8 flex items-center justify-center rounded bg-red-100 text-red-500 font-medium">
    51
   </button>
   <button class="w-8 h-8 flex items-center justify-center rounded hover:bg-gray-100">
    52
   </button>
   <button class="w-8 h-8 flex items-center justify-center rounded hover:bg-gray-100">
    53
   </button>
   <button class="w-8 h-8 flex items-center justify-center rounded hover:bg-gray-100">
    54
   </button>
   <span class="px-1">
    ...
   </span>
   <button class="w-8 h-8 flex items-center justify-center rounded hover:bg-gray-100">
    90
   </button>
   <button class="w-8 h-8 flex items-center justify-center rounded hover:bg-gray-100">
    <i class="fa-solid fa-chevron-right text-xs">
    </i>
   </button>
  </div>
 </div>
</div>

    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
</script>
