<template>
  <div class="flex h-full bg-mainBg overflow-hidden">
    <div class="flex-1 flex flex-col min-w-0 bg-gray-50 overflow-hidden p-4 custom-scrollbar overflow-y-auto">
      <div class="flex-1 p-6 overflow-y-auto bg-white m-4 rounded-lg shadow-sm border border-gray-100 flex flex-col">
 <!-- 1. 顶部搜索过滤区 -->
 <div class="flex flex-col gap-4 mb-6 bg-gray-50 p-4 rounded border border-gray-100">
  <!-- 第一行查询条件 -->
  <div class="flex flex-wrap items-center gap-4 w-full">
   <!-- 销售姓名 -->
   <div class="flex items-center bg-white border border-gray-200 rounded overflow-hidden">
    <span class="bg-gray-50 text-gray-600 text-sm px-3 py-1.5 border-r border-gray-200">
     销售姓名:
    </span>
    <input class="px-3 py-1.5 text-sm outline-none w-32 focus:bg-blue-50/30" placeholder="请输入活动名称" type="text"/>
   </div>
   <!-- 销售邮箱 -->
   <div class="flex items-center bg-white border border-gray-200 rounded overflow-hidden">
    <span class="bg-gray-50 text-gray-600 text-sm px-3 py-1.5 border-r border-gray-200">
     销售邮箱:
    </span>
    <input class="px-3 py-1.5 text-sm outline-none w-32" placeholder="请输入活动名称" type="text"/>
   </div>
   <!-- 平仓编号 -->
   <div class="flex items-center bg-white border border-gray-200 rounded overflow-hidden">
    <span class="bg-gray-50 text-gray-600 text-sm px-3 py-1.5 border-r border-gray-200">
     平仓编号:
    </span>
    <input class="px-3 py-1.5 text-sm outline-none w-32" placeholder="请输入活动名称" type="text"/>
   </div>
   <!-- 客户邮箱 -->
   <div class="flex items-center bg-white border border-gray-200 rounded overflow-hidden">
    <span class="bg-gray-50 text-gray-600 text-sm px-3 py-1.5 border-r border-gray-200">
     客户邮箱:
    </span>
    <input class="px-3 py-1.5 text-sm outline-none w-32" placeholder="请输入活动名称" type="text"/>
   </div>
   <!-- 客户姓名 -->
   <div class="flex items-center bg-white border border-gray-200 rounded overflow-hidden">
    <span class="bg-gray-50 text-gray-600 text-sm px-3 py-1.5 border-r border-gray-200">
     客户姓名:
    </span>
    <input class="px-3 py-1.5 text-sm outline-none w-32" placeholder="请输入活动名称" type="text"/>
   </div>
   <!-- 平仓日期 -->
   <div class="flex items-center bg-white border border-gray-200 rounded overflow-hidden">
    <span class="bg-gray-50 text-gray-600 text-sm px-3 py-1.5 border-r border-gray-200">
     平仓日期:
    </span>
    <input class="px-3 py-1.5 text-sm outline-none w-48 text-gray-400" placeholder="开始日期 - 结束日期" type="text"/>
   </div>
   <!-- 查询按钮 -->
   <div class="ml-auto flex items-center">
    <button class="bg-primaryBtn hover:bg-primaryBtnHover text-white px-8 py-1.5 rounded text-sm transition-colors shadow-sm">
     查询
    </button>
   </div>
  </div>
  <!-- 第二行查询条件 -->
  <div class="flex flex-wrap items-center gap-4 w-full">
   <!-- 交易品种 -->
   <div class="flex items-center bg-white border border-gray-200 rounded overflow-hidden">
    <span class="bg-gray-50 text-gray-600 text-sm px-3 py-1.5 border-r border-gray-200">
     交易品种:
    </span>
    <select class="px-3 py-1.5 text-sm outline-none text-gray-500 bg-white w-32 cursor-pointer">
     <option value="">
      全部
     </option>
    </select>
   </div>
   <!-- 奖励周期 -->
   <div class="flex items-center bg-white border border-gray-200 rounded overflow-hidden">
    <span class="bg-gray-50 text-gray-600 text-sm px-3 py-1.5 border-r border-gray-200">
     奖励周期:
    </span>
    <select class="px-3 py-1.5 text-sm outline-none text-gray-500 bg-white w-32 cursor-pointer">
     <option value="">
      全部
     </option>
    </select>
   </div>
   <!-- 奖励时间 -->
   <div class="flex items-center bg-white border border-gray-200 rounded overflow-hidden">
    <span class="bg-gray-50 text-gray-600 text-sm px-3 py-1.5 border-r border-gray-200">
     奖励时间:
    </span>
    <input class="px-3 py-1.5 text-sm outline-none w-48 text-gray-400" placeholder="开始日期 - 结束日期" type="text"/>
   </div>
   <!-- 入账时间 -->
   <div class="flex items-center bg-white border border-gray-200 rounded overflow-hidden">
    <span class="bg-gray-50 text-gray-600 text-sm px-3 py-1.5 border-r border-gray-200">
     入账时间:
    </span>
    <input class="px-3 py-1.5 text-sm outline-none w-48 text-gray-400" placeholder="开始日期 - 结束日期" type="text"/>
   </div>
   <!-- MT类型（美分逻辑） -->
   <div class="flex items-center bg-white border border-gray-200 rounded overflow-hidden">
    <span class="bg-gray-50 text-sm px-3 py-1.5 border-r border-gray-200 change-highlight">
     MT类型:
    </span>
    <select class="px-3 py-1.5 text-sm outline-none text-gray-500 bg-white w-32 cursor-pointer">
     <option value="">
      全部
     </option>
     <option>
      标准账户
     </option>
     <option>
      美分账户
     </option>
    </select>
   </div>
   <!-- 奖励状态 -->
   <div class="flex items-center bg-white border border-gray-200 rounded overflow-hidden">
    <span class="bg-gray-50 text-gray-600 text-sm px-3 py-1.5 border-r border-gray-200">
     奖励状态:
    </span>
    <select class="px-3 py-1.5 text-sm outline-none text-gray-500 bg-white w-32 cursor-pointer">
     <option value="">
      全部
     </option>
    </select>
   </div>
   <!-- 导出按钮 -->
   <div class="ml-auto flex items-center">
    <button class="bg-primaryBtn hover:bg-primaryBtnHover text-white px-8 py-1.5 rounded text-sm transition-colors shadow-sm">
     导出
    </button>
   </div>
  </div>
 </div>
 <!-- 2. 数据表格区 -->
 <div class="sales-trading-table flex-1 overflow-x-auto overflow-y-auto border border-gray-200 rounded no-scrollbar">
  <table class="w-full custom-table min-w-[1600px]">
   <thead class="bg-tableHeader sticky top-0 z-10">
    <tr>
     <th class="w-24">
      销售名称
     </th>
     <th class="w-32">
      销售邮箱
     </th>
     <th class="w-24">
      客户名称
     </th>
     <th class="w-32">
      客户邮箱
     </th>
     <th class="w-28 change-highlight">
      MT类型
     </th>
     <th class="w-28 change-highlight">
      交易手数（标准手）
     </th>
     <th class="w-24">
      交易品种
     </th>
     <th class="w-24">
      平仓编号
     </th>
     <th class="w-32">
      平仓时间
     </th>
     <th class="w-32">
      奖励周期
     </th>
     <th class="w-28 change-highlight">
      奖励金额(USD)
     </th>
     <th class="w-32">
      奖励时间
     </th>
     <th class="w-32">
      入账时间
     </th>
     <th class="w-24">
      奖励状态
     </th>
     <th class="w-32">
      备注
     </th>
    </tr>
   </thead>
   <tbody>
    <tr>
     <td>
      张三
     </td>
     <td>
      XXXXX@qq.com
     </td>
     <td>
      Joker
     </td>
     <td>
      182930@qq.com
     </td>
     <td>
      <span class="type-pill standard">
       <i class="fa-solid fa-layer-group">
       </i>
       标准
      </span>
     </td>
     <td>
      <div class="text-gray-800">
       1.00-标准手
      </div>
     </td>
     <td>
      XAUUSD
     </td>
     <td>
     </td>
     <td>
      2026-07-31 22:10:11
     </td>
     <td>
      每月最后一日
     </td>
     <td class="">
      0.0300
     </td>
     <td>
     </td>
     <td>
      -
     </td>
     <td>
      待计算
     </td>
     <td>
      -
     </td>
    </tr>
    <tr>
     <td>
      张三
     </td>
     <td>
      XXXXX@qq.com
     </td>
     <td>
      ABNC
     </td>
     <td>
      182930@qq.com
     </td>
     <td>
      <span class="type-pill cent">
       <i class="fa-solid fa-coins">
       </i>
       美分
      </span>
     </td>
     <td>
      <div class="text-gray-800 change-highlight font-medium">
       1.00-美分手
      </div>
     </td>
     <td>
      XAUUSD
     </td>
     <td>
     </td>
     <td>
      2026-07-31 22:11:33
     </td>
     <td>
      每月最后一日
     </td>
     <td class="change-highlight font-medium">
      0.0014
     </td>
     <td>
     </td>
     <td>
      -
     </td>
     <td>
      待入账
     </td>
     <td>
      <span class="change-highlight">
       美分折算系数 0.01
      </span>
     </td>
    </tr>
    <tr>
     <td>
      刘浩
     </td>
     <td>
      XXXXX@qq.com
     </td>
     <td>
      ABNC
     </td>
     <td>
      182930@qq.com
     </td>
     <td>
      <span class="type-pill cent">
       <i class="fa-solid fa-coins">
       </i>
       美分
      </span>
     </td>
     <td>
      <div class="text-gray-800 change-highlight font-medium">
       2.00-美分手
      </div>
     </td>
     <td>
      XAUUSD
     </td>
     <td>
     </td>
     <td>
      2026-07-31 22:20:01
     </td>
     <td>
      每月最后一日
     </td>
     <td class="change-highlight font-medium">
      0.0050
     </td>
     <td>
      2026-08-01 00:12:00
     </td>
     <td>
      2026-08-01 09:00:00
     </td>
     <td>
      已入账
     </td>
     <td>
      <span class="change-highlight">
       发放: 上级美元佣金账户
      </span>
     </td>
    </tr>
    <tr>
     <td>
      刘浩
     </td>
     <td>
      XXXXX@qq.com
     </td>
     <td>
      Cent-A
     </td>
     <td>
      cent-a@qq.com
     </td>
     <td>
      <span class="type-pill cent">
       <i class="fa-solid fa-coins">
       </i>
       美分
      </span>
     </td>
     <td>
      <div class="text-gray-800 change-highlight font-medium">
       1.00-美分手
      </div>
     </td>
     <td>
      EURUSD
     </td>
     <td>
     </td>
     <td>
      2026-07-31 21:00:12
     </td>
     <td>
      每月最后一日
     </td>
     <td class="change-highlight font-medium">
      0.0008
     </td>
     <td>
     </td>
     <td>
      -
     </td>
     <td>
      奖励失败
     </td>
     <td>
      无佣金账号
     </td>
    </tr>
    <tr>
     <td>
      刘浩
     </td>
     <td>
      XXXXX@qq.com
     </td>
     <td>
      Std-B
     </td>
     <td>
      std-b@qq.com
     </td>
     <td>
      <span class="type-pill standard">
       <i class="fa-solid fa-layer-group">
       </i>
       标准
      </span>
     </td>
     <td>
      <div class="text-gray-800">
       0.10-标准手
      </div>
     </td>
     <td>
      XAUUSD
     </td>
     <td>
     </td>
     <td>
      2026-07-31 20:55:10
     </td>
     <td>
      每月最后一日
     </td>
     <td class="">
      0.0600
     </td>
     <td>
     </td>
     <td>
      -
     </td>
     <td>
      奖励失败
     </td>
     <td>
      持仓时间不足
     </td>
    </tr>
    <tr>
     <td>
      刘浩
     </td>
     <td>
      XXXXX@qq.com
     </td>
     <td>
      Cent-C
     </td>
     <td>
      cent-c@qq.com
     </td>
     <td>
      <span class="type-pill cent">
       <i class="fa-solid fa-coins">
       </i>
       美分
      </span>
     </td>
     <td>
      <div class="text-gray-800 change-highlight font-medium">
       1.00-美分手
      </div>
     </td>
     <td>
      XAUUSD
     </td>
     <td>
     </td>
     <td>
      2026-07-31 20:30:01
     </td>
     <td>
      每月最后一日
     </td>
     <td class="change-highlight font-medium">
      0.0000
     </td>
     <td>
     </td>
     <td>
      -
     </td>
     <td>
      奖励失败
     </td>
     <td>
      <span class="change-highlight">
       赠金交易(美分)
      </span>
     </td>
    </tr>
    <tr>
     <td>
      刘浩
     </td>
     <td>
      XXXXX@qq.com
     </td>
     <td>
      Cent-D
     </td>
     <td>
      cent-d@qq.com
     </td>
     <td>
      <span class="type-pill cent">
       <i class="fa-solid fa-coins">
       </i>
       美分
      </span>
     </td>
     <td>
      <div class="text-gray-800 change-highlight font-medium">
       5.00-美分手
      </div>
     </td>
     <td>
      GBPUSD
     </td>
     <td>
     </td>
     <td>
      2026-07-31 20:02:30
     </td>
     <td>
      每月最后一日
     </td>
     <td class="change-highlight font-medium">
      0.0022
     </td>
     <td>
     </td>
     <td>
      -
     </td>
     <td>
      奖励失败
     </td>
     <td>
      系统异常
     </td>
    </tr>
    <tr>
     <td>
      刘浩
     </td>
     <td>
      XXXXX@qq.com
     </td>
     <td>
      Cent-E
     </td>
     <td>
      cent-e@qq.com
     </td>
     <td>
      <span class="type-pill cent">
       <i class="fa-solid fa-coins">
       </i>
       美分
      </span>
     </td>
     <td>
      <div class="text-gray-800 change-highlight font-medium">
       3.00-美分手
      </div>
     </td>
     <td>
      XAUUSD
     </td>
     <td>
     </td>
     <td>
      2026-07-31 19:22:21
     </td>
     <td>
      每月最后一日
     </td>
     <td class="change-highlight font-medium">
      0.0018
     </td>
     <td>
      2026-08-01 00:10:00
     </td>
     <td>
      -
     </td>
     <td>
      待入账
     </td>
     <td>
      -
     </td>
    </tr>
    <tr>
     <td>
      刘浩
     </td>
     <td>
      XXXXX@qq.com
     </td>
     <td>
      Std-F
     </td>
     <td>
      std-f@qq.com
     </td>
     <td>
      <span class="type-pill standard">
       <i class="fa-solid fa-layer-group">
       </i>
       标准
      </span>
     </td>
     <td>
      <div class="text-gray-800">
       0.20-标准手
      </div>
     </td>
     <td>
      XAUUSD
     </td>
     <td>
     </td>
     <td>
      2026-07-31 18:45:01
     </td>
     <td>
      每月最后一日
     </td>
     <td class="">
      0.1200
     </td>
     <td>
     </td>
     <td>
      2026-08-01 09:00:00
     </td>
     <td>
      已入账
     </td>
     <td>
      -
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
</script>

<style scoped>
.no-scrollbar::-webkit-scrollbar { display: none; }
.no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }

.sales-trading-table .custom-table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  font-size: 12px;
}

.sales-trading-table .custom-table thead th {
  font-weight: 600;
  color: #374151;
  background: #f9fafb;
  padding: 10px 10px;
  white-space: nowrap;
  border-bottom: 1px solid #e5e7eb;
  border-right: 1px solid #f3f4f6;
}
.sales-trading-table .custom-table thead th:last-child {
  border-right: 0;
}

.sales-trading-table .custom-table tbody td {
  color: #4b5563;
  padding: 10px 10px;
  line-height: 18px;
  border-bottom: 1px solid #f3f4f6;
  border-right: 1px solid #f9fafb;
  vertical-align: middle;
}
.sales-trading-table .custom-table tbody td:last-child {
  border-right: 0;
}

.sales-trading-table .custom-table tbody td:not(:last-child) {
  white-space: nowrap;
}

.sales-trading-table .custom-table tbody td:last-child {
  white-space: normal;
  word-break: break-word;
  min-width: 220px;
}

.sales-trading-table .custom-table .change-highlight {
  font-size: 12px;
  font-weight: 400;
  color: #4b5563;
}

.sales-trading-table .type-pill {
  font-size: 11px;
  line-height: 16px;
}
</style>
