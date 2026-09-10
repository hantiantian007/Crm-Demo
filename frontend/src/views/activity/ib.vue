<template>
  <div class="flex h-full bg-mainBg overflow-hidden">
    <div class="flex-1 flex flex-col min-w-0 bg-gray-50 overflow-hidden p-4 custom-scrollbar overflow-y-auto">
      <div class="flex-1 overflow-y-auto p-4">
 <div class="space-y-4">
  <div class="grid grid-cols-1 xl:grid-cols-[140px_1fr] gap-4">
   <div class="ib-panel rounded-lg border border-slate-800 px-4 py-4 text-white card-shadow">
    <div class="relative z-10">
     <div class="text-[11px] text-slate-300">
      当前等级:
     </div>
     <div class="mt-2 flex items-center gap-2">
      <span class="text-xl font-bold tracking-wide">
       -
      </span>
      <span class="inline-flex items-center px-2.5 h-5 rounded-full text-[11px] bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
       普通
      </span>
     </div>
     <div class="mt-6 text-[11px] text-slate-300">
      今日交易量:
     </div>
     <div class="mt-2 text-[34px] leading-none font-bold text-red-500">
      0
     </div>
    </div>
   </div>
   <div class="ib-panel rounded-lg border border-slate-800 px-6 py-4 text-white card-shadow">
    <div class="relative z-10">
     <div class="flex flex-wrap items-center justify-between gap-3">
      <div class="text-sm font-semibold text-cyan-300">
       总交易量 0 [lot]
      </div>
      <div class="text-[12px] text-slate-300">
       任务截止时间：
       <span class="text-white font-medium">
        2026-09-01 00:30:00
       </span>
       <span class="ml-4">
        剩余时间：
       </span>
       <span class="text-white font-medium">
        26天6小时23分钟
       </span>
      </div>
     </div>
     <div class="mt-7 ib-line">
     </div>
     <div class="mt-[-16px] grid grid-cols-6 gap-4">
      <div class="flex flex-col items-center">
       <div class="ib-node active">
        直属
       </div>
       <div class="mt-3 text-[12px] text-cyan-300 font-semibold">
        0 lot
       </div>
      </div>
      <div class="flex flex-col items-center">
       <div class="ib-node">
        RIB
       </div>
       <div class="mt-3 text-[12px] text-cyan-300 font-semibold">
        0 lot
       </div>
      </div>
      <div class="flex flex-col items-center">
       <div class="ib-node">
        IB
       </div>
       <div class="mt-3 text-[12px] text-cyan-300 font-semibold">
        100 lot
       </div>
      </div>
      <div class="flex flex-col items-center">
       <div class="ib-node">
        MIB
       </div>
       <div class="mt-3 text-[12px] text-cyan-300 font-semibold">
        800 lot
       </div>
      </div>
      <div class="flex flex-col items-center">
       <div class="ib-node">
        VIB
       </div>
       <div class="mt-3 text-[12px] text-cyan-300 font-semibold">
        4000 lot
       </div>
      </div>
      <div class="flex flex-col items-center">
       <div class="ib-node">
        PIB
       </div>
       <div class="mt-3 text-[12px] text-cyan-300 font-semibold">
        20000 lot
       </div>
      </div>
     </div>
    </div>
   </div>
  </div>
  <div class="bg-white rounded-xl border border-gray-100 card-shadow overflow-hidden">
   <div class="px-5 pt-3 border-b border-gray-100 bg-gray-50/60">
    <div class="flex items-center gap-2 text-xs overflow-x-auto no-scrollbar pb-2">
     <button class="ib-user-tab-btn px-4 h-7 rounded-sm border tab-active whitespace-nowrap" data-tab="customer">
      客户列表
     </button>
     <button class="ib-user-tab-btn px-4 h-7 rounded-sm border border-transparent text-gray-500 hover:text-gray-700 whitespace-nowrap" data-tab="rebate">
      返佣记录
     </button>
     <button class="ib-user-tab-btn px-4 h-7 rounded-sm border border-transparent text-gray-500 hover:text-gray-700 whitespace-nowrap" data-tab="trade">
      交易记录
     </button>
     <button class="ib-user-tab-btn px-4 h-7 rounded-sm border border-transparent text-gray-500 hover:text-gray-700 whitespace-nowrap" data-tab="invite">
      邀请记录
     </button>
     <button class="ib-user-tab-btn px-4 h-7 rounded-sm border border-transparent text-gray-500 hover:text-gray-700 whitespace-nowrap" data-tab="history">
      历史统计
     </button>
    </div>
   </div>
   <div class="ib-user-tab-panel" id="ib-user-tab-customer">
    <div class="px-5 py-3 border-b border-gray-100">
     <div class="grid grid-cols-1 lg:grid-cols-12 gap-3 text-xs items-center">
      <div class="lg:col-span-3 flex items-center gap-2">
       <span class="text-gray-500 shrink-0">
        查询范围:
       </span>
       <select class="filter-select w-[72px]">
        <option>
         伞下
        </option>
        <option>
         全部
        </option>
       </select>
       <input class="filter-input flex-1 min-w-0" type="text"/>
      </div>
      <div class="lg:col-span-3 flex items-center gap-2">
       <span class="text-gray-500 shrink-0">
        客户名称:
       </span>
       <input class="filter-input flex-1" placeholder="请输入客户名称" type="text"/>
      </div>
      <div class="lg:col-span-3 flex items-center gap-2">
       <span class="text-gray-500 shrink-0">
        客户邮箱:
       </span>
       <input class="filter-input flex-1" placeholder="请输入客户邮箱" type="text"/>
      </div>
      <div class="lg:col-span-3 flex items-center gap-2">
       <span class="text-gray-500 shrink-0">
        客户等级:
       </span>
       <select class="filter-select flex-1">
        <option>
         请选择
        </option>
        <option>
         普通
        </option>
        <option>
         RIB
        </option>
        <option>
         IB
        </option>
       </select>
      </div>
     </div>
     <div class="flex items-center gap-2 mt-3">
      <button class="h-8 px-4 rounded-md bg-primary text-white text-xs hover:bg-primaryHover transition-colors">
       搜索
      </button>
      <button class="h-8 px-4 rounded-md border border-gray-200 bg-white text-gray-600 text-xs hover:bg-gray-50 transition-colors">
       重置
      </button>
     </div>
    </div>
    <div class="px-5">
     <div class="overflow-x-auto">
      <table class="min-w-full text-sm">
       <thead>
        <tr class="text-left text-gray-500 border-b border-gray-100">
         <th class="font-medium py-3 px-4">
          客户名称
         </th>
         <th class="font-medium py-3 px-4">
          客户邮箱
         </th>
         <th class="font-medium py-3 px-4">
          当前等级
         </th>
         <th class="font-medium py-3 px-4">
          是否清零交易量
         </th>
         <th class="font-medium py-3 px-4">
          是否固定等级
         </th>
         <th class="font-medium py-3 px-4">
          升级日期
         </th>
         <th class="font-medium py-3 px-4">
          累计交易手数
         </th>
         <th class="font-medium py-3 px-4">
          入金金额
         </th>
         <th class="font-medium py-3 px-4">
          余额
         </th>
         <th class="font-medium py-3 px-4">
          邀请数量
         </th>
         <th class="font-medium py-3 px-4">
          上月交易量
         </th>
         <th class="font-medium py-3 px-4">
          上月等级
         </th>
        </tr>
       </thead>
      </table>
     </div>
     <div class="py-16 flex flex-col items-center justify-center text-gray-400">
      <div class="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mb-4">
       <i class="fa-regular fa-box-open text-3xl text-gray-300">
       </i>
      </div>
      <div class="text-sm">
       无可用数据
      </div>
      <div class="mt-6 flex items-center gap-6 text-gray-300">
       <i class="fa-solid fa-chevron-left text-[10px]">
       </i>
       <i class="fa-solid fa-chevron-right text-[10px]">
       </i>
      </div>
     </div>
    </div>
   </div>
   <div class="ib-user-tab-panel hidden px-5 py-16 text-center text-sm text-gray-400" id="ib-user-tab-rebate">
    返佣记录内容待补充
   </div>
   <div class="ib-user-tab-panel hidden px-5 py-16 text-center text-sm text-gray-400" id="ib-user-tab-trade">
    交易记录内容待补充
   </div>
   <div class="ib-user-tab-panel hidden px-5 py-16 text-center text-sm text-gray-400" id="ib-user-tab-invite">
    邀请记录内容待补充
   </div>
   <div class="ib-user-tab-panel hidden px-5 py-16 text-center text-sm text-gray-400" id="ib-user-tab-history">
    历史统计内容待补充
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
