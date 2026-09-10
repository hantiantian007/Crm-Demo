<template>
  <div class="flex h-full bg-mainBg overflow-hidden">
    <div class="flex-1 flex flex-col min-w-0 bg-gray-50 overflow-hidden p-4 custom-scrollbar overflow-y-auto">
      <div class="flex-1 overflow-y-auto p-6 flex flex-col gap-6">
 <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
  <h3 class="font-bold text-gray-800 mb-5 text-[15px]">
   搜索
  </h3>
  <div class="grid grid-cols-5 gap-4 items-center">
   <div class="flex items-center">
    <label class="text-[13px] text-gray-600 w-14 shrink-0 text-right mr-3">
     邮箱:
    </label>
    <input class="custom-input" placeholder="请输入" type="text"/>
   </div>
   <div class="flex items-center">
    <label class="text-[13px] text-gray-600 w-14 shrink-0 text-right mr-3">
     姓名:
    </label>
    <input class="custom-input" placeholder="请输入" type="text"/>
   </div>
   <div class="flex items-center col-span-2">
    <label class="text-[13px] text-gray-600 w-20 shrink-0 text-right mr-3">
     时间范围:
    </label>
    <div class="flex items-center w-full">
     <input class="custom-input rounded-r-none border-r-0 text-center" placeholder="开始日期" type="text"/>
     <span class="px-3 py-[8px] bg-gray-50 border-y border-gray-200 text-[13px] text-gray-400">
      到
     </span>
     <input class="custom-input rounded-l-none border-l-0 text-center" placeholder="结束日期" type="text"/>
    </div>
   </div>
   <div class="flex items-center justify-end gap-3">
    <button class="bg-primaryBtn hover:bg-primaryBtnHover text-white px-5 py-1.5 rounded text-[13px] transition-colors shadow-sm">
     搜索
    </button>
    <button class="bg-white hover:bg-gray-50 text-gray-600 border border-gray-200 px-5 py-1.5 rounded text-[13px] transition-colors shadow-sm">
     重置
    </button>
   </div>
  </div>
  <div class="grid grid-cols-5 gap-4 mt-4">
   <div class="flex items-center">
    <label class="text-[13px] text-gray-600 w-14 shrink-0 text-right mr-3 change-highlight">
     账户类型:
    </label>
    <select class="custom-select change-highlight">
     <option>
      全部
     </option>
     <option>
      仅标准账户
     </option>
     <option>
      仅美分账户
     </option>
    </select>
   </div>
  </div>
 </div>
 <div class="grid grid-cols-5 gap-4">
  <div class="stat-card">
   <div class="flex items-start justify-between">
    <div>
     <div class="text-[13px] text-gray-500 mb-3">
      客户数量
     </div>
     <div class="text-[30px] font-bold text-gray-800 leading-none">
      6
     </div>
    </div>
    <div class="stat-icon">
     <i class="fa-solid fa-user">
     </i>
    </div>
   </div>
  </div>
  <div class="stat-card">
   <div class="flex items-start justify-between">
    <div>
     <div class="text-[13px] text-gray-500 mb-3 change-highlight">
      入金(USD)
     </div>
     <div class="text-[30px] font-bold text-gray-800 leading-none">
      12,680.00
     </div>
    </div>
    <div class="stat-icon">
     <i class="fa-solid fa-arrow-right-to-bracket">
     </i>
    </div>
   </div>
  </div>
  <div class="stat-card">
   <div class="flex items-start justify-between">
    <div>
     <div class="text-[13px] text-gray-500 mb-3 change-highlight">
      出金(USD)
     </div>
     <div class="text-[30px] font-bold text-gray-800 leading-none">
      180.00
     </div>
    </div>
    <div class="stat-icon">
     <i class="fa-solid fa-arrow-right-from-bracket">
     </i>
    </div>
   </div>
  </div>
  <div class="stat-card">
   <div class="flex items-start justify-between">
    <div>
     <div class="text-[13px] text-gray-500 mb-3 change-highlight">
      净入金(USD)
     </div>
     <div class="text-[30px] font-bold text-gray-800 leading-none">
      12,500.00
     </div>
    </div>
    <div class="stat-icon">
     <i class="fa-solid fa-wallet">
     </i>
    </div>
   </div>
  </div>
  <div class="stat-card">
   <div class="flex items-start justify-between">
    <div>
     <div class="text-[13px] text-gray-500 mb-3 change-highlight">
      佣金(USD)
     </div>
     <div class="text-[30px] font-bold text-gray-800 leading-none">
      86.2414
     </div>
    </div>
    <div class="stat-icon">
     <i class="fa-solid fa-money-bill-wave">
     </i>
    </div>
   </div>
  </div>
  <div class="stat-card">
   <div class="flex items-start justify-between">
    <div>
     <div class="text-[13px] text-gray-500 mb-3 change-highlight">
      交易量(手)
     </div>
     <div class="text-[16px] font-bold text-gray-800 leading-none change-highlight">
      0.25标准手
     </div>
     <div class="text-[16px] font-bold text-gray-800 leading-none mt-2 change-highlight">
      0.32美分手
     </div>
    </div>
    <div class="stat-icon">
     <i class="fa-solid fa-chart-column">
     </i>
    </div>
   </div>
  </div>
  <div class="stat-card">
   <div class="flex items-start justify-between">
    <div>
     <div class="text-[13px] text-gray-500 mb-3">
      持仓
     </div>
     <div class="text-[30px] font-bold text-gray-800 leading-none">
      2
     </div>
    </div>
    <div class="stat-icon">
     <i class="fa-solid fa-layer-group">
     </i>
    </div>
   </div>
  </div>
  <div class="stat-card">
   <div class="flex items-start justify-between">
    <div>
     <div class="text-[13px] text-gray-500 mb-3">
      MT账户数量
     </div>
     <div class="text-[30px] font-bold text-gray-800 leading-none">
      11
     </div>
     <div class="text-[12px] mt-2 change-highlight">
      标准 7 / 美分 4
     </div>
    </div>
    <div class="stat-icon">
     <i class="fa-solid fa-id-card">
     </i>
    </div>
   </div>
  </div>
  <div class="stat-card">
   <div class="flex items-start justify-between">
    <div>
     <div class="text-[13px] text-gray-500 mb-3 change-highlight">
      MT净值
     </div>
     <div class="text-[30px] font-bold text-gray-800 leading-none">
      11,994.78
     </div>
     <div class="text-[12px] mt-2 change-highlight">
      统计汇总：11,994.78
     </div>
     <div class="text-[12px] mt-1 change-highlight">
      USD：4,434.78
     </div>
     <div class="text-[12px] mt-1 change-highlight">
      USC：756,000.00
     </div>
    </div>
    <div class="stat-icon">
     <i class="fa-solid fa-scale-balanced">
     </i>
    </div>
   </div>
  </div>
  <div class="stat-card">
   <div class="flex items-start justify-between">
    <div>
     <div class="text-[13px] text-gray-500 mb-3 change-highlight">
      MT余额
     </div>
     <div class="text-[30px] font-bold text-gray-800 leading-none">
      12,021.54
     </div>
     <div class="text-[12px] mt-2 change-highlight">
      统计汇总：12,021.54
     </div>
     <div class="text-[12px] mt-1 change-highlight">
      USD：4,421.54
     </div>
     <div class="text-[12px] mt-1 change-highlight">
      USC：760,000.00
     </div>
    </div>
    <div class="stat-icon">
     <i class="fa-solid fa-sack-dollar">
     </i>
    </div>
   </div>
  </div>
 </div>
 <div class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
  <div class="overflow-x-auto">
   <table class="w-full custom-table">
    <thead class="bg-tableHeader">
     <tr>
      <th>
       客户名称
      </th>
      <th>
       角色
      </th>
      <th>
       联系方式
      </th>
      <th class="change-highlight">
       账户类型
      </th>
      <th class="change-highlight">
       MT数量(个)
      </th>
      <th class="change-highlight">
       入金(USD)
      </th>
      <th class="change-highlight">
       出金(USD)
      </th>
      <th class="change-highlight">
       净入金(USD)
      </th>
      <th class="change-highlight">
       佣金(USD)
      </th>
      <th class="change-highlight">
       交易量(手)
      </th>
      <th>
       客户数量
      </th>
      <th>
       新增客户数量
      </th>
      <th>
       状态
      </th>
      <th>
       注册时间
      </th>
     </tr>
    </thead>
    <tbody>
     <tr>
      <td class="text-left font-medium text-gray-800">
       客户A-演示
      </td>
      <td>
       代理(PIB)
      </td>
      <td>
       demo.a@example.com
      </td>
      <td class="change-highlight">
       标准账户 + 美分账户
      </td>
      <td class="change-highlight">
       <span class="text-blue-500 underline">
        2
       </span>
       <div class="text-[11px] mt-1 change-highlight">
        标准 1 / 美分 1
       </div>
      </td>
      <td>
       12,000.00
      </td>
      <td>
       0.00
      </td>
      <td>
       12,000.00
      </td>
      <td>
       86.2400
      </td>
      <td class="change-highlight">
       0.25标准手 / 0.32美分手
      </td>
      <td>
       5
      </td>
      <td>
       0
      </td>
      <td class="text-[#22C55E] font-medium">
       正常
      </td>
      <td>
       2026-06-08 14:31
      </td>
     </tr>
     <tr>
      <td class="text-left font-medium text-gray-800">
       客户B-演示
      </td>
      <td>
       代理(PIB)
      </td>
      <td>
       demo.b@example.com
      </td>
      <td class="change-highlight">
       标准账户
      </td>
      <td class="change-highlight">
       <span class="text-blue-500 underline">
        2
       </span>
      </td>
      <td>
       0.00
      </td>
      <td>
       0.00
      </td>
      <td>
       0.00
      </td>
      <td>
       0.0000
      </td>
      <td class="change-highlight">
       0.25标准手
      </td>
      <td>
       0
      </td>
      <td>
       0
      </td>
      <td class="text-[#22C55E] font-medium">
       正常
      </td>
      <td>
       2026-06-08 14:55
      </td>
     </tr>
     <tr>
      <td class="text-left font-medium text-gray-800 change-highlight">
       客户C-演示
      </td>
      <td>
       代理(PIB)
      </td>
      <td>
       cent.demo@example.com
      </td>
      <td class="change-highlight">
       美分账户
      </td>
      <td class="change-highlight">
       <span class="text-blue-500 underline">
        2
       </span>
       <div class="text-[11px] mt-1 change-highlight">
        美分 2
       </div>
      </td>
      <td>
       680.00
      </td>
      <td>
       180.00
      </td>
      <td>
       500.00
      </td>
      <td>
       0.0014
      </td>
      <td class="change-highlight">
       0.32美分手
      </td>
      <td>
       3
      </td>
      <td>
       0
      </td>
      <td class="text-[#22C55E] font-medium">
       正常
      </td>
      <td>
       2026-06-08 14:57
      </td>
     </tr>
    </tbody>
   </table>
  </div>
 </div>
</div>

    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
</script>
