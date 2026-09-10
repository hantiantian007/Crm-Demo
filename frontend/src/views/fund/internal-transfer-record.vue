<template>
  <div class="flex h-full bg-mainBg overflow-hidden">
    <div class="flex-1 flex flex-col min-w-0 bg-gray-50 overflow-hidden p-4 custom-scrollbar overflow-y-auto">
      <div class="flex-1 overflow-y-auto p-6 flex flex-col gap-6">
 <section class="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
  <div class="flex items-center justify-between mb-5">
   <h3 class="font-bold text-gray-800 text-[15px]">
    搜索
   </h3>
  </div>
  <div class="grid grid-cols-5 gap-4">
   <div class="flex items-center gap-3 col-span-1">
    <label class="text-[13px] text-gray-600 shrink-0">
     转入/转出账户:
    </label>
    <input class="filter-input" placeholder="请输入MT账户" type="text"/>
   </div>
   <div class="flex items-center gap-3 col-span-1">
    <label class="text-[13px] text-gray-600 shrink-0">
     转入/转出单号:
    </label>
    <input class="filter-input" placeholder="请输入流水单号" type="text"/>
   </div>
   <div class="flex items-center gap-3 col-span-1">
    <label class="text-[13px] text-gray-600 shrink-0">
     转入/转出用户:
    </label>
    <input class="filter-input" placeholder="请输入用户姓名" type="text"/>
   </div>
   <div class="flex items-center gap-3 col-span-2">
    <label class="text-[13px] text-gray-600 shrink-0">
     转账金额:
    </label>
    <div class="flex items-center w-full gap-2">
     <input class="filter-input" placeholder="最低金额" type="text"/>
     <span class="text-gray-400 text-xs">
      至
     </span>
     <input class="filter-input" placeholder="最高金额" type="text"/>
    </div>
   </div>
   <div class="flex items-center gap-3 col-span-1">
    <label class="text-[13px] text-gray-600 shrink-0">
     转账状态:
    </label>
    <select class="filter-select">
     <option>
      全部
     </option>
     <option>
      转账成功
     </option>
     <option>
      转账失败
     </option>
     <option>
      处理中
     </option>
    </select>
   </div>
   <div class="flex items-center gap-3 col-span-2">
    <label class="text-[13px] text-gray-600 shrink-0">
     申请日期:
    </label>
    <div class="flex items-center w-full gap-2">
     <input class="filter-input" placeholder="开始日期" type="text"/>
     <span class="text-gray-400 text-xs">
      到
     </span>
     <input class="filter-input" placeholder="结束日期" type="text"/>
    </div>
   </div>
   <div class="col-span-2 flex items-center justify-start gap-3">
    <button class="bg-primaryBtn hover:bg-primaryBtnHover text-white px-6 py-2 rounded text-[13px] transition-colors shadow-sm">
     搜索
    </button>
    <button class="bg-white hover:bg-gray-50 text-gray-600 border border-gray-200 px-6 py-2 rounded text-[13px] transition-colors shadow-sm">
     重置
    </button>
   </div>
  </div>
 </section>
 <section class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
  <div class="px-6 pt-5 pb-4 border-b border-gray-100">
   <div class="flex items-center justify-between gap-4 flex-wrap">
    <div class="flex items-center gap-4 flex-wrap">
     <button class="inline-flex items-center px-3 py-1 rounded-md bg-[#d1a84f] text-white text-xs font-semibold change-highlight hover:bg-primaryBtnHover transition-colors">
      内转转账
     </button>
    </div>
    <div class="flex items-center gap-3">
     <button class="bg-primaryBtn hover:bg-primaryBtnHover text-white px-5 py-2 rounded text-[13px] transition-colors shadow-sm">
      报表导出
     </button>
    </div>
   </div>
  </div>
  <div class="table-wrap overflow-x-auto">
   <table class="w-full record-table min-w-[1400px]">
    <thead>
     <tr>
      <th>
       转出账户
      </th>
      <th>
       转出用户
      </th>
      <th>
       转入账户
      </th>
      <th>
       转入用户
      </th>
      <th class="change-highlight">
       转账金额
      </th>
      <th>
       转出单号
      </th>
      <th>
       转入单号
      </th>
      <th>
       转账状态
      </th>
      <th>
       申请时间(S)
      </th>
      <th>
       操作
      </th>
     </tr>
    </thead>
    <tbody>
     <tr>
      <td>
       <span class="account-chip chip-live">
        美分
       </span>
       <span class="account-chip chip-commission">
        佣金
       </span>
       8300184
      </td>
      <td>
       景志敏
      </td>
      <td>
       <span class="account-chip chip-live">
        美分
       </span>
       <span class="account-chip chip-trade">
        交易
       </span>
       8100324
      </td>
      <td>
       景志敏
      </td>
      <td class="change-highlight">
       1,125.00USD
      </td>
      <td>
       OUT_925279955741314450
      </td>
      <td>
       IN_925279955720342550
      </td>
      <td class="status-success">
       转账成功
      </td>
      <td>
       2026-08-04 15:00:20
      </td>
      <td>
       <button class="px-3 py-1 rounded text-white hover:bg-primaryBtnHover transition-colors border bg-blue-500 hover:bg-blue-600 border-blue-500">
        查看详情
       </button>
      </td>
     </tr>
     <tr>
      <td>
       <span class="account-chip chip-demo">
        标准
       </span>
       <span class="account-chip chip-commission">
        佣金
       </span>
       8350104
      </td>
      <td>
       test-测试小何
      </td>
      <td>
       <span class="account-chip chip-demo">
        标准
       </span>
       <span class="account-chip chip-trade">
        交易
       </span>
       8150105
      </td>
      <td>
       test-测试小何
      </td>
      <td class="change-highlight">
       10.00USD
      </td>
      <td>
       OUT_893436878825113770
      </td>
      <td>
       IN_893436878276726268
      </td>
      <td class="status-success">
       转账成功
      </td>
      <td>
       2026-05-08 18:06:57
      </td>
      <td>
       <button class="px-3 py-1 rounded text-white hover:bg-primaryBtnHover transition-colors border bg-blue-500 hover:bg-blue-600 border-blue-500">
        查看详情
       </button>
      </td>
     </tr>
     <tr>
      <td>
       <span class="account-chip chip-demo">
        标准
       </span>
       <span class="account-chip chip-trade">
        交易
       </span>
       8150114
      </td>
      <td>
       测试小何
      </td>
      <td>
       <span class="account-chip chip-demo">
        标准
       </span>
       <span class="account-chip chip-trade">
        交易
       </span>
       8150111
      </td>
      <td>
       测试小何
      </td>
      <td class="change-highlight">
       400.00USD
      </td>
      <td>
       OUT_875273148629519344
      </td>
      <td>
       IN_875273148600156214
      </td>
      <td class="status-success">
       转账成功
      </td>
      <td>
       2026-03-19 15:11:08
      </td>
      <td>
       <button class="px-3 py-1 rounded text-white hover:bg-primaryBtnHover transition-colors border bg-blue-500 hover:bg-blue-600 border-blue-500">
        查看详情
       </button>
      </td>
     </tr>
     <tr>
      <td>
       <span class="account-chip chip-live">
        美分
       </span>
       <span class="account-chip chip-trade">
        交易
       </span>
       1810105
      </td>
      <td>
       Test Amy
      </td>
      <td>
       <span class="account-chip chip-live">
        美分
       </span>
       <span class="account-chip chip-trade">
        交易
       </span>
       1810103
      </td>
      <td>
       Test Amy
      </td>
      <td class="change-highlight">
       6.00USD
      </td>
      <td>
       OUT_837250233216796339
      </td>
      <td>
       IN_837250233216794800
      </td>
      <td class="status-success">
       转账成功
      </td>
      <td>
       2025-12-04 17:01:38
      </td>
      <td>
       <button class="px-3 py-1 rounded text-white hover:bg-primaryBtnHover transition-colors border bg-blue-500 hover:bg-blue-600 border-blue-500">
        查看详情
       </button>
      </td>
     </tr>
     <tr>
      <td>
       <span class="account-chip chip-live">
        美分
       </span>
       <span class="account-chip chip-commission">
        佣金
       </span>
       8310102
      </td>
      <td>
       Test Amy
      </td>
      <td>
       <span class="account-chip chip-live">
        美分
       </span>
       <span class="account-chip chip-trade">
        交易
       </span>
       1810103
      </td>
      <td>
       Test Amy
      </td>
      <td class="change-highlight">
       7.00USD
      </td>
      <td>
       OUT_837248714950052973
      </td>
      <td>
       IN_837248714950050224
      </td>
      <td class="status-failed">
       转账失败
      </td>
      <td>
       2025-12-04 16:55:36
      </td>
      <td>
       <button class="px-3 py-1 rounded text-white hover:bg-primaryBtnHover transition-colors border bg-blue-500 hover:bg-blue-600 border-blue-500">
        查看详情
       </button>
      </td>
     </tr>
    </tbody>
   </table>
  </div>
 </section>
</div>

    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
</script>
