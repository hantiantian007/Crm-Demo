<template>
  <div class="flex h-full bg-mainBg overflow-hidden">
    <div class="flex-1 flex flex-col min-w-0 bg-gray-50 overflow-hidden p-4 custom-scrollbar overflow-y-auto">
      <div class="flex-1 overflow-y-auto p-4">
 <div class="w-full space-y-4">
  <div class="bg-white rounded-xl border border-gray-100 card-shadow overflow-hidden">
   <div class="px-5 py-4 border-b border-gray-100">
    <h2 class="text-sm font-semibold text-gray-700">
     计划详情
    </h2>
   </div>
   <div class="px-5 py-4 overflow-x-auto">
    <table class="min-w-full text-sm">
     <thead>
      <tr class="text-left text-gray-500 border-b border-gray-100">
       <th class="font-medium py-3 pr-8">
        计划名称
       </th>
       <th class="font-medium py-3 pr-8">
        活动有效期
       </th>
       <th class="font-medium py-3 pr-8">
        活动状态
       </th>
       <th class="font-medium py-3 pr-8">
        参与人数
       </th>
       <th class="font-medium py-3 pr-8">
        创建人
       </th>
       <th class="font-medium py-3">
        更新时间
       </th>
      </tr>
     </thead>
     <tbody>
      <tr class="text-gray-700">
       <td class="py-4 pr-8">
        IB计划
       </td>
       <td class="py-4 pr-8">
        2030-02-03 12:15:27
       </td>
       <td class="py-4 pr-8">
        <span class="inline-flex px-2.5 py-1 rounded-full text-xs font-medium status-running">
         进行中
        </span>
       </td>
       <td class="py-4 pr-8">
        11
       </td>
       <td class="py-4 pr-8">
        史密斯
       </td>
       <td class="py-4">
        2026-02-03 12:16:27
       </td>
      </tr>
     </tbody>
    </table>
   </div>
  </div>
  <div class="bg-white rounded-xl border border-gray-100 card-shadow overflow-hidden">
   <div class="px-5 py-4 border-b border-gray-100">
    <h2 class="text-sm font-semibold text-gray-700">
     等级配置
    </h2>
   </div>
   <div class="overflow-x-auto">
    <table class="min-w-full text-sm">
     <thead>
      <tr class="text-left text-gray-500 border-b border-gray-100">
       <th class="font-medium py-3.5 px-5">
        等级名称
       </th>
       <th class="font-medium py-3.5 px-4">
        外汇返佣
       </th>
       <th class="font-medium py-3.5 px-4">
        黄金返佣
       </th>
       <th class="font-medium py-3.5 px-4">
        白银返佣
       </th>
       <th class="font-medium py-3.5 px-4">
        原油返佣
       </th>
       <th class="font-medium py-3.5 px-4">
        比特币返佣
       </th>
       <th class="font-medium py-3.5 px-4">
        数字货币返佣
       </th>
       <th class="font-medium py-3.5 px-4">
        股指返佣
       </th>
       <th class="font-medium py-3.5 px-4">
        公金会返佣
       </th>
       <th class="font-medium py-3.5 px-4">
        入金金额
       </th>
       <th class="font-medium py-3.5 px-4">
        交易手数
       </th>
       <th class="font-medium py-3.5 px-5">
        邀请数量
       </th>
      </tr>
     </thead>
     <tbody class="text-gray-700">
      <tr class="border-b border-gray-100">
       <td class="py-3.5 px-5">
        直营
       </td>
       <td class="py-3.5 px-4">
        0
       </td>
       <td class="py-3.5 px-4">
        0
       </td>
       <td class="py-3.5 px-4">
        0
       </td>
       <td class="py-3.5 px-4">
        0
       </td>
       <td class="py-3.5 px-4">
        0
       </td>
       <td class="py-3.5 px-4">
        0
       </td>
       <td class="py-3.5 px-4">
        0
       </td>
       <td class="py-3.5 px-4">
        0
       </td>
       <td class="py-3.5 px-4">
        0.00
       </td>
       <td class="py-3.5 px-4">
        0
       </td>
       <td class="py-3.5 px-5">
        0
       </td>
      </tr>
      <tr class="border-b border-gray-100">
       <td class="py-3.5 px-5">
        RIB
       </td>
       <td class="py-3.5 px-4">
        0
       </td>
       <td class="py-3.5 px-4">
        0
       </td>
       <td class="py-3.5 px-4">
        0
       </td>
       <td class="py-3.5 px-4">
        0
       </td>
       <td class="py-3.5 px-4">
        0
       </td>
       <td class="py-3.5 px-4">
        0
       </td>
       <td class="py-3.5 px-4">
        0
       </td>
       <td class="py-3.5 px-4">
        0
       </td>
       <td class="py-3.5 px-4">
        10,000.00
       </td>
       <td class="py-3.5 px-4">
        0
       </td>
       <td class="py-3.5 px-5">
        0
       </td>
      </tr>
      <tr class="border-b border-gray-100">
       <td class="py-3.5 px-5">
        IB
       </td>
       <td class="py-3.5 px-4">
        6
       </td>
       <td class="py-3.5 px-4">
        12
       </td>
       <td class="py-3.5 px-4">
        0
       </td>
       <td class="py-3.5 px-4">
        12
       </td>
       <td class="py-3.5 px-4">
        0
       </td>
       <td class="py-3.5 px-4">
        6
       </td>
       <td class="py-3.5 px-4">
        9
       </td>
       <td class="py-3.5 px-4">
        0
       </td>
       <td class="py-3.5 px-4">
        0.00
       </td>
       <td class="py-3.5 px-4">
        100
       </td>
       <td class="py-3.5 px-5">
        0
       </td>
      </tr>
      <tr class="border-b border-gray-100">
       <td class="py-3.5 px-5">
        MIB
       </td>
       <td class="py-3.5 px-4">
        8
       </td>
       <td class="py-3.5 px-4">
        14
       </td>
       <td class="py-3.5 px-4">
        0
       </td>
       <td class="py-3.5 px-4">
        14
       </td>
       <td class="py-3.5 px-4">
        0
       </td>
       <td class="py-3.5 px-4">
        8
       </td>
       <td class="py-3.5 px-4">
        11
       </td>
       <td class="py-3.5 px-4">
        0
       </td>
       <td class="py-3.5 px-4">
        0.00
       </td>
       <td class="py-3.5 px-4">
        800
       </td>
       <td class="py-3.5 px-5">
        0
       </td>
      </tr>
      <tr class="border-b border-gray-100">
       <td class="py-3.5 px-5">
        VIB
       </td>
       <td class="py-3.5 px-4">
        10
       </td>
       <td class="py-3.5 px-4">
        16
       </td>
       <td class="py-3.5 px-4">
        0
       </td>
       <td class="py-3.5 px-4">
        16
       </td>
       <td class="py-3.5 px-4">
        0
       </td>
       <td class="py-3.5 px-4">
        10
       </td>
       <td class="py-3.5 px-4">
        13
       </td>
       <td class="py-3.5 px-4">
        0
       </td>
       <td class="py-3.5 px-4">
        0.00
       </td>
       <td class="py-3.5 px-4">
        4000
       </td>
       <td class="py-3.5 px-5">
        0
       </td>
      </tr>
      <tr>
       <td class="py-3.5 px-5">
        PIB
       </td>
       <td class="py-3.5 px-4">
        12
       </td>
       <td class="py-3.5 px-4">
        18
       </td>
       <td class="py-3.5 px-4">
        0
       </td>
       <td class="py-3.5 px-4">
        18
       </td>
       <td class="py-3.5 px-4">
        0
       </td>
       <td class="py-3.5 px-4">
        12
       </td>
       <td class="py-3.5 px-4">
        15
       </td>
       <td class="py-3.5 px-4">
        0
       </td>
       <td class="py-3.5 px-4">
        0.00
       </td>
       <td class="py-3.5 px-4">
        20000
       </td>
       <td class="py-3.5 px-5">
        0
       </td>
      </tr>
     </tbody>
    </table>
   </div>
  </div>
  <div class="bg-white rounded-xl border border-gray-100 card-shadow overflow-hidden">
   <div class="px-5 pt-3 border-b border-gray-100 bg-gray-50/60">
    <div class="flex items-center gap-2 text-xs overflow-x-auto no-scrollbar pb-2">
     <button class="detail-tab-btn px-4 h-7 rounded-sm border tab-active whitespace-nowrap" data-tab="customer">
      客户列表
     </button>
     <button class="detail-tab-btn px-4 h-7 rounded-sm border border-transparent text-gray-500 hover:text-gray-700 whitespace-nowrap" data-tab="rebate">
      返佣记录
     </button>
     <button class="detail-tab-btn px-4 h-7 rounded-sm border border-transparent text-gray-500 hover:text-gray-700 whitespace-nowrap" data-tab="trade">
      交易记录
     </button>
     <button class="detail-tab-btn px-4 h-7 rounded-sm border border-transparent text-gray-500 hover:text-gray-700 whitespace-nowrap" data-tab="invite">
      邀请记录
     </button>
     <button class="detail-tab-btn px-4 h-7 rounded-sm border border-transparent text-gray-500 hover:text-gray-700 whitespace-nowrap" data-tab="history">
      历史统计
     </button>
    </div>
   </div>
   <div class="detail-tab-panel" id="tab-panel-customer">
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
       <input class="filter-input flex-1" type="text"/>
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
         直营
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
    <div class="px-5 py-0">
     <div class="overflow-x-auto">
      <table class="min-w-full text-sm">
       <thead>
        <tr class="text-left text-gray-500 border-b border-gray-100">
         <th class="font-medium py-3 pr-8">
          客户名称
         </th>
         <th class="font-medium py-3 pr-8">
          客户邮箱
         </th>
         <th class="font-medium py-3 pr-8">
          当前等级
         </th>
         <th class="font-medium py-3 pr-8">
          是否清零交易量
         </th>
         <th class="font-medium py-3 pr-8">
          是否固定等级
         </th>
         <th class="font-medium py-3 pr-8">
          升级日期
         </th>
         <th class="font-medium py-3 pr-8">
          累计交易手数
         </th>
         <th class="font-medium py-3 pr-8 change-highlight">
          入金金额
         </th>
         <th class="font-medium py-3 pr-8 change-highlight">
          余额
         </th>
         <th class="font-medium py-3 pr-8">
          邀请数量
         </th>
         <th class="font-medium py-3 pr-8">
          上月交易量
         </th>
         <th class="font-medium py-3">
          上月等级
         </th>
        </tr>
       </thead>
       <tbody class="text-gray-700">
        <tr class="border-b border-gray-100">
         <td class="py-4 pr-8">
          <div class="flex items-center gap-2">
           <i class="fa-solid fa-caret-down expand-icon">
           </i>
           <span>
            test-zhoubinbin
           </span>
          </div>
         </td>
         <td class="py-4 pr-8">
          1741784918@qq.com
         </td>
         <td class="py-4 pr-8">
          直营
         </td>
         <td class="py-4 pr-8">
          是
         </td>
         <td class="py-4 pr-8">
          否
         </td>
         <td class="py-4 pr-8">
          2026-07-24 17:35:22
         </td>
         <td class="py-4 pr-8">
          0.0000
          <span class="value-sub">
           <span class="value-sub-line">
            标准手: 0.00
           </span>
           <span class="value-sub-line">
            美分手: 0.00
           </span>
          </span>
         </td>
         <td class="py-4 pr-8">
          0.00
          <span class="value-sub">
           <span class="value-sub-line">
            USD: 0.00
           </span>
           <span class="value-sub-line">
            USC: 0.00
           </span>
          </span>
         </td>
         <td class="py-4 pr-8">
          0.00
          <span class="value-sub">
           <span class="value-sub-line">
            USD: 0.00
           </span>
           <span class="value-sub-line">
            USC: 0.00
           </span>
          </span>
         </td>
         <td class="py-4 pr-8">
          0
         </td>
         <td class="py-4 pr-8">
          0.0000
          <span class="value-sub">
           <span class="value-sub-line">
            标准手: 0.00
           </span>
           <span class="value-sub-line">
            美分手: 0.00
           </span>
          </span>
         </td>
         <td class="py-4">
          直营
         </td>
        </tr>
        <tr class="border-b border-gray-100 bg-[#FCFCFC]">
         <td class="py-4" colspan="12">
          <div class="flex items-center gap-8 text-xs">
           <span class="text-gray-500">
            操作
           </span>
           <div class="flex items-center gap-2">
            <button class="op-pill">
             等级调整
            </button>
            <button class="op-pill">
             淘汰配置
            </button>
           </div>
          </div>
         </td>
        </tr>
        <tr class="border-b border-gray-100">
         <td class="py-4 pr-8">
          <div class="flex items-center gap-2">
           <i class="fa-solid fa-caret-right expand-icon">
           </i>
           <span>
            test-魏佳用
           </span>
          </div>
         </td>
         <td class="py-4 pr-8">
          15279708217@165.com
         </td>
         <td class="py-4 pr-8">
          RIB
         </td>
         <td class="py-4 pr-8">
          是
         </td>
         <td class="py-4 pr-8">
          否
         </td>
         <td class="py-4 pr-8">
          2026-08-01 00:30:03
         </td>
         <td class="py-4 pr-8">
          0.2020
          <span class="value-sub">
           <span class="value-sub-line">
            标准手: 0.20
           </span>
           <span class="value-sub-line">
            美分手: 0.20
           </span>
          </span>
         </td>
         <td class="py-4 pr-8">
          1,000.00
          <span class="value-sub">
           <span class="value-sub-line">
            USD: 10.00
           </span>
           <span class="value-sub-line">
            USC: 1,000.00
           </span>
          </span>
         </td>
         <td class="py-4 pr-8">
          1,001.00
          <span class="value-sub">
           <span class="value-sub-line">
            USD: 10.01
           </span>
           <span class="value-sub-line">
            USC: 1,001.00
           </span>
          </span>
         </td>
         <td class="py-4 pr-8">
          0
         </td>
         <td class="py-4 pr-8">
          0.1020
          <span class="value-sub">
           <span class="value-sub-line">
            标准手: 0.10
           </span>
           <span class="value-sub-line">
            美分手: 0.20
           </span>
          </span>
         </td>
         <td class="py-4">
          直营
         </td>
        </tr>
        <tr class="border-b border-gray-100">
         <td class="py-4 pr-8">
          <div class="flex items-center gap-2">
           <i class="fa-solid fa-caret-right expand-icon">
           </i>
           <span>
            test-杨敏子
           </span>
          </div>
         </td>
         <td class="py-4 pr-8">
          13994874677@qq.com
         </td>
         <td class="py-4 pr-8">
          直营
         </td>
         <td class="py-4 pr-8">
          是
         </td>
         <td class="py-4 pr-8">
          否
         </td>
         <td class="py-4 pr-8">
          2026-06-30 14:42:45
         </td>
         <td class="py-4 pr-8">
          0.0000
          <span class="value-sub">
           <span class="value-sub-line">
            标准手: 0.00
           </span>
           <span class="value-sub-line">
            美分手: 0.00
           </span>
          </span>
         </td>
         <td class="py-4 pr-8">
          0.00
          <span class="value-sub">
           <span class="value-sub-line">
            USD: 0.00
           </span>
           <span class="value-sub-line">
            USC: 0.00
           </span>
          </span>
         </td>
         <td class="py-4 pr-8">
          0.00
          <span class="value-sub">
           <span class="value-sub-line">
            USD: 0.00
           </span>
           <span class="value-sub-line">
            USC: 0.00
           </span>
          </span>
         </td>
         <td class="py-4 pr-8">
          0
         </td>
         <td class="py-4 pr-8">
          0.0000
          <span class="value-sub">
           <span class="value-sub-line">
            标准手: 0.00
           </span>
           <span class="value-sub-line">
            美分手: 0.00
           </span>
          </span>
         </td>
         <td class="py-4">
          直营
         </td>
        </tr>
        <tr class="border-b border-gray-100">
         <td class="py-4 pr-8">
          <div class="flex items-center gap-2">
           <i class="fa-solid fa-caret-right expand-icon">
           </i>
           <span>
            test-秦洋辰
           </span>
          </div>
         </td>
         <td class="py-4 pr-8">
          15097830595@165.com
         </td>
         <td class="py-4 pr-8">
          直营
         </td>
         <td class="py-4 pr-8">
          是
         </td>
         <td class="py-4 pr-8">
          否
         </td>
         <td class="py-4 pr-8">
          2026-06-30 14:39:47
         </td>
         <td class="py-4 pr-8">
          0.0000
          <span class="value-sub">
           <span class="value-sub-line">
            标准手: 0.00
           </span>
           <span class="value-sub-line">
            美分手: 0.00
           </span>
          </span>
         </td>
         <td class="py-4 pr-8">
          0.00
          <span class="value-sub">
           <span class="value-sub-line">
            USD: 0.00
           </span>
           <span class="value-sub-line">
            USC: 0.00
           </span>
          </span>
         </td>
         <td class="py-4 pr-8">
          0.00
          <span class="value-sub">
           <span class="value-sub-line">
            USD: 0.00
           </span>
           <span class="value-sub-line">
            USC: 0.00
           </span>
          </span>
         </td>
         <td class="py-4 pr-8">
          0
         </td>
         <td class="py-4 pr-8">
          0.0000
          <span class="value-sub">
           <span class="value-sub-line">
            标准手: 0.00
           </span>
           <span class="value-sub-line">
            美分手: 0.00
           </span>
          </span>
         </td>
         <td class="py-4">
          直营
         </td>
        </tr>
        <tr>
         <td class="py-4 pr-8">
          <div class="flex items-center gap-2">
           <i class="fa-solid fa-caret-right expand-icon">
           </i>
           <span>
            test-杨均
           </span>
          </div>
         </td>
         <td class="py-4 pr-8">
          b13@qq.com
         </td>
         <td class="py-4 pr-8">
          RIB
         </td>
         <td class="py-4 pr-8">
          是
         </td>
         <td class="py-4 pr-8">
          否
         </td>
         <td class="py-4 pr-8">
          2026-07-01 00:30:03
         </td>
         <td class="py-4 pr-8">
          0.1015
          <span class="value-sub">
           <span class="value-sub-line">
            标准手: 0.10
           </span>
           <span class="value-sub-line">
            美分手: 0.15
           </span>
          </span>
         </td>
         <td class="py-4 pr-8">
          2,000.00
          <span class="value-sub">
           <span class="value-sub-line">
            USD: 20.00
           </span>
           <span class="value-sub-line">
            USC: 2,000.00
           </span>
          </span>
         </td>
         <td class="py-4 pr-8">
          1,990.90
          <span class="value-sub">
           <span class="value-sub-line">
            USD: 19.91
           </span>
           <span class="value-sub-line">
            USC: 1,990.90
           </span>
          </span>
         </td>
         <td class="py-4 pr-8">
          0
         </td>
         <td class="py-4 pr-8">
          0.0510
          <span class="value-sub">
           <span class="value-sub-line">
            标准手: 0.05
           </span>
           <span class="value-sub-line">
            美分手: 0.10
           </span>
          </span>
         </td>
         <td class="py-4">
          RIB
         </td>
        </tr>
       </tbody>
      </table>
     </div>
    </div>
   </div>
   <div class="detail-tab-panel hidden" id="tab-panel-rebate">
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
       <input class="filter-input flex-1" type="text"/>
      </div>
      <div class="lg:col-span-3 flex items-center gap-2">
       <span class="text-gray-500 shrink-0">
        返佣用户:
       </span>
       <input class="filter-input flex-1" placeholder="请输入返佣用户" type="text"/>
      </div>
      <div class="lg:col-span-3 flex items-center gap-2">
       <span class="text-gray-500 shrink-0">
        返佣用户邮箱:
       </span>
       <input class="filter-input flex-1" placeholder="请输入返佣用户邮箱" type="text"/>
      </div>
      <div class="lg:col-span-3 flex items-center gap-2">
       <span class="text-gray-500 shrink-0">
        平台订单编号:
       </span>
       <input class="filter-input flex-1" placeholder="请输入平台订单编号" type="text"/>
      </div>
      <div class="lg:col-span-3 flex items-center gap-2">
       <span class="text-gray-500 shrink-0">
        是否结算:
       </span>
       <select class="filter-select flex-1">
        <option>
         请选择
        </option>
        <option>
         已结算
        </option>
        <option>
         未结算
        </option>
       </select>
      </div>
      <div class="lg:col-span-5 flex items-center gap-2">
       <span class="text-gray-500 shrink-0">
        平台时间:
       </span>
       <div class="flex items-center flex-1">
        <input class="filter-input flex-1 rounded-r-none" placeholder="开始日期" type="text"/>
        <span class="h-[34px] px-3 inline-flex items-center justify-center border-y border-gray-200 text-gray-400 bg-gray-50">
         到
        </span>
        <input class="filter-input flex-1 rounded-l-none" placeholder="结束日期" type="text"/>
       </div>
      </div>
      <div class="lg:col-span-4 flex items-center gap-2">
       <button class="h-8 px-4 rounded-md bg-primary text-white text-xs hover:bg-primaryHover transition-colors">
        搜索
       </button>
       <button class="h-8 px-4 rounded-md border border-gray-200 bg-white text-gray-600 text-xs hover:bg-gray-50 transition-colors">
        重置
       </button>
       <button class="h-8 px-4 rounded-md border border-gray-200 bg-white text-gray-600 text-xs hover:bg-gray-50 transition-colors">
        导出
       </button>
      </div>
     </div>
    </div>
    <div class="px-5 py-0">
     <div class="overflow-x-auto">
      <table class="min-w-full text-sm">
       <thead>
        <tr class="text-left text-gray-500 border-b border-gray-100">
         <th class="font-medium py-3 pr-8">
          客户名称
         </th>
         <th class="font-medium py-3 pr-8">
          客户邮箱
         </th>
         <th class="font-medium py-3 pr-8">
          邀请人
         </th>
         <th class="font-medium py-3 pr-8">
          返佣账号
         </th>
         <th class="font-medium py-3 pr-8 change-highlight">
          MT类型
         </th>
         <th class="font-medium py-3 pr-8">
          返佣用户
         </th>
         <th class="font-medium py-3 pr-8">
          返佣用户等级
         </th>
         <th class="font-medium py-3 pr-8">
          返佣用户邮箱
         </th>
         <th class="font-medium py-3 pr-8">
          是否结算
         </th>
         <th class="font-medium py-3 pr-8">
          交易手数
         </th>
         <th class="font-medium py-3 pr-8">
          交易品种
         </th>
         <th class="font-medium py-3 pr-8">
          开仓编号
         </th>
         <th class="font-medium py-3 pr-8">
          持仓编号
         </th>
         <th class="font-medium py-3">
          平仓编号
         </th>
        </tr>
       </thead>
       <tbody class="text-gray-700">
        <tr class="border-b border-gray-100">
         <td class="py-4 pr-8">
          <div class="flex items-center gap-2">
           <i class="fa-solid fa-caret-down expand-icon">
           </i>
           <span>
            test-杨均
           </span>
          </div>
         </td>
         <td class="py-4 pr-8">
          b13@qq.com
         </td>
         <td class="py-4 pr-8">
          test-褚必
         </td>
         <td class="py-4 pr-8">
          8300254
         </td>
         <td class="py-4 pr-8">
          <span class="type-pill type-pill-cent">
           美分
          </span>
         </td>
         <td class="py-4 pr-8">
          test-蒋为
         </td>
         <td class="py-4 pr-8">
          RIB
         </td>
         <td class="py-4 pr-8">
          b11@qq.com
         </td>
         <td class="py-4 pr-8">
          已结算
         </td>
         <td class="py-4 pr-8">
          0.1
         </td>
         <td class="py-4 pr-8">
          XAUUSD
         </td>
         <td class="py-4 pr-8">
          1065658
         </td>
         <td class="py-4 pr-8">
          604060
         </td>
         <td class="py-4">
          1065661
         </td>
        </tr>
        <tr class="border-b border-gray-100 bg-[#FCFCFC]">
         <td class="py-4" colspan="14">
          <div class="grid grid-cols-[72px_1fr] gap-y-3 text-xs">
           <span class="text-gray-500">
            返佣规则
           </span>
           <span>
            - $/lot
           </span>
           <span class="text-gray-500">
            实际返佣标准
           </span>
           <span>
            0.50 $/lot
           </span>
           <span class="text-gray-500">
            返佣金额
           </span>
           <span>
            0.05
           </span>
           <span class="text-gray-500">
            平台时间
           </span>
           <span>
            2026-07-28 09:23:40
           </span>
           <span class="text-gray-500">
            备注
           </span>
           <span>
            平级返佣
           </span>
           <span class="text-gray-500">
            操作
           </span>
           <span>
            <button class="mini-primary">
             查看
            </button>
           </span>
          </div>
         </td>
        </tr>
        <tr class="border-b border-gray-100">
         <td class="py-4 pr-8">
          <div class="flex items-center gap-2">
           <i class="fa-solid fa-caret-right expand-icon">
           </i>
           <span>
            James Sun
           </span>
          </div>
         </td>
         <td class="py-4 pr-8">
          jamessun@hatcgroup.com
         </td>
         <td class="py-4 pr-8">
         </td>
         <td class="py-4 pr-8">
          8300133
         </td>
         <td class="py-4 pr-8">
          <span class="type-pill type-pill-standard">
           标准
          </span>
         </td>
         <td class="py-4 pr-8">
          Luke
         </td>
         <td class="py-4 pr-8">
          直营
         </td>
         <td class="py-4 pr-8">
          Luke@hatcgroup.com
         </td>
         <td class="py-4 pr-8">
          已结算
         </td>
         <td class="py-4 pr-8">
          0.1
         </td>
         <td class="py-4 pr-8">
          XAUUSD
         </td>
         <td class="py-4 pr-8">
          1003491
         </td>
         <td class="py-4 pr-8">
          561254
         </td>
         <td class="py-4">
          1003794
         </td>
        </tr>
        <tr class="border-b border-gray-100">
         <td class="py-4 pr-8">
          <div class="flex items-center gap-2">
           <i class="fa-solid fa-caret-right expand-icon">
           </i>
           <span>
            James Sun
           </span>
          </div>
         </td>
         <td class="py-4 pr-8">
          jamessun@hatcgroup.com
         </td>
         <td class="py-4 pr-8">
         </td>
         <td class="py-4 pr-8">
          8300133
         </td>
         <td class="py-4 pr-8">
          <span class="type-pill type-pill-standard">
           标准
          </span>
         </td>
         <td class="py-4 pr-8">
          Luke
         </td>
         <td class="py-4 pr-8">
          直营
         </td>
         <td class="py-4 pr-8">
          Luke@hatcgroup.com
         </td>
         <td class="py-4 pr-8">
          已结算
         </td>
         <td class="py-4 pr-8">
          0.16
         </td>
         <td class="py-4 pr-8">
          XAUUSD
         </td>
         <td class="py-4 pr-8">
          1003511
         </td>
         <td class="py-4 pr-8">
          561270
         </td>
         <td class="py-4">
          1003793
         </td>
        </tr>
        <tr>
         <td class="py-4 pr-8">
          <div class="flex items-center gap-2">
           <i class="fa-solid fa-caret-right expand-icon">
           </i>
           <span>
            James Sun
           </span>
          </div>
         </td>
         <td class="py-4 pr-8">
          jamessun@hatcgroup.com
         </td>
         <td class="py-4 pr-8">
         </td>
         <td class="py-4 pr-8">
          8300133
         </td>
         <td class="py-4 pr-8">
          <span class="type-pill type-pill-standard">
           标准
          </span>
         </td>
         <td class="py-4 pr-8">
          Luke
         </td>
         <td class="py-4 pr-8">
          直营
         </td>
         <td class="py-4 pr-8">
          Luke@hatcgroup.com
         </td>
         <td class="py-4 pr-8">
          已结算
         </td>
         <td class="py-4 pr-8">
          0.26
         </td>
         <td class="py-4 pr-8">
          XAUUSD
         </td>
         <td class="py-4 pr-8">
          1003528
         </td>
         <td class="py-4 pr-8">
          561281
         </td>
         <td class="py-4">
          1003792
         </td>
        </tr>
       </tbody>
      </table>
     </div>
    </div>
   </div>
   <div class="detail-tab-panel hidden" id="tab-panel-trade">
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
       <input class="filter-input flex-1" type="text"/>
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
        MT账号:
       </span>
       <input class="filter-input flex-1" placeholder="请输入MT账号" type="text"/>
      </div>
      <div class="lg:col-span-5 flex items-center gap-2">
       <span class="text-gray-500 shrink-0">
        平仓时间:
       </span>
       <div class="flex items-center flex-1">
        <input class="filter-input flex-1 rounded-r-none" placeholder="开始日期" type="text"/>
        <span class="h-[34px] px-3 inline-flex items-center justify-center border-y border-gray-200 text-gray-400 bg-gray-50">
         到
        </span>
        <input class="filter-input flex-1 rounded-l-none" placeholder="结束日期" type="text"/>
       </div>
      </div>
      <div class="lg:col-span-4 flex items-center gap-2">
       <button class="h-8 px-4 rounded-md bg-primary text-white text-xs hover:bg-primaryHover transition-colors">
        搜索
       </button>
       <button class="h-8 px-4 rounded-md border border-gray-200 bg-white text-gray-600 text-xs hover:bg-gray-50 transition-colors">
        重置
       </button>
       <button class="h-8 px-4 rounded-md border border-gray-200 bg-white text-gray-600 text-xs hover:bg-gray-50 transition-colors">
        导出
       </button>
      </div>
     </div>
    </div>
    <div class="px-5 py-0">
     <div class="overflow-x-auto">
      <table class="min-w-full text-sm">
       <thead>
        <tr class="text-left text-gray-500 border-b border-gray-100">
         <th class="font-medium py-3 pr-8">
          客户名称
         </th>
         <th class="font-medium py-3 pr-8">
          客户邮箱
         </th>
         <th class="font-medium py-3 pr-8">
          MT账号
         </th>
         <th class="font-medium py-3 pr-8 change-highlight">
          MT类型
         </th>
         <th class="font-medium py-3 pr-8">
          交易手数
         </th>
         <th class="font-medium py-3 pr-8">
          交易品种
         </th>
         <th class="font-medium py-3 pr-8">
          开仓时间
         </th>
         <th class="font-medium py-3 pr-8">
          开仓编号
         </th>
         <th class="font-medium py-3 pr-8">
          持仓编号
         </th>
         <th class="font-medium py-3 pr-8">
          平仓编号
         </th>
         <th class="font-medium py-3 pr-8">
          订单编号
         </th>
         <th class="font-medium py-3">
          平仓时间
         </th>
        </tr>
       </thead>
       <tbody class="text-gray-700">
        <tr class="border-b border-gray-100">
         <td class="py-4 pr-8">
          test-杨均
         </td>
         <td class="py-4 pr-8">
          b13@qq.com
         </td>
         <td class="py-4 pr-8">
          8100458
         </td>
         <td class="py-4 pr-8">
          <span class="type-pill type-pill-cent">
           美分
          </span>
         </td>
         <td class="py-4 pr-8">
          0.1
         </td>
         <td class="py-4 pr-8">
          XAUUSD
         </td>
         <td class="py-4 pr-8">
          2026-07-28 09:23:23
         </td>
         <td class="py-4 pr-8">
          1065658
         </td>
         <td class="py-4 pr-8">
          604060
         </td>
         <td class="py-4 pr-8">
          1065661
         </td>
         <td class="py-4 pr-8">
          604063
         </td>
         <td class="py-4">
          2026-07-28 09:23:40
         </td>
        </tr>
        <tr class="border-b border-gray-100">
         <td class="py-4 pr-8">
          test-魏佳用
         </td>
         <td class="py-4 pr-8">
          15279708217@165.com
         </td>
         <td class="py-4 pr-8">
          8100496
         </td>
         <td class="py-4 pr-8">
          <span class="type-pill type-pill-standard">
           标准
          </span>
         </td>
         <td class="py-4 pr-8">
          0.1
         </td>
         <td class="py-4 pr-8">
          XAUUSD
         </td>
         <td class="py-4 pr-8">
          2026-07-01 13:33:21
         </td>
         <td class="py-4 pr-8">
          994342
         </td>
         <td class="py-4 pr-8">
          554534
         </td>
         <td class="py-4 pr-8">
          994343
         </td>
         <td class="py-4 pr-8">
          554536
         </td>
         <td class="py-4">
          2026-07-01 13:33:44
         </td>
        </tr>
        <tr class="border-b border-gray-100">
         <td class="py-4 pr-8">
          test-魏佳用
         </td>
         <td class="py-4 pr-8">
          15279708217@165.com
         </td>
         <td class="py-4 pr-8">
          8100496
         </td>
         <td class="py-4 pr-8">
          <span class="type-pill type-pill-standard">
           标准
          </span>
         </td>
         <td class="py-4 pr-8">
          0.1
         </td>
         <td class="py-4 pr-8">
          XAUUSD
         </td>
         <td class="py-4 pr-8">
          2026-07-01 13:32:17
         </td>
         <td class="py-4 pr-8">
          994326
         </td>
         <td class="py-4 pr-8">
          554529
         </td>
         <td class="py-4 pr-8">
          994334
         </td>
         <td class="py-4 pr-8">
          554530
         </td>
         <td class="py-4">
          2026-07-01 13:32:38
         </td>
        </tr>
        <tr class="border-b border-gray-100">
         <td class="py-4 pr-8">
          test-b3
         </td>
         <td class="py-4 pr-8">
          b3@qq.com
         </td>
         <td class="py-4 pr-8">
          8100444
         </td>
         <td class="py-4 pr-8">
          <span class="type-pill type-pill-standard">
           标准
          </span>
         </td>
         <td class="py-4 pr-8">
          0.1
         </td>
         <td class="py-4 pr-8">
          XAUUSD
         </td>
         <td class="py-4 pr-8">
          2026-07-01 13:28:43
         </td>
         <td class="py-4 pr-8">
          994301
         </td>
         <td class="py-4 pr-8">
          554513
         </td>
         <td class="py-4 pr-8">
          994303
         </td>
         <td class="py-4 pr-8">
          554514
         </td>
         <td class="py-4">
          2026-07-01 13:29:09
         </td>
        </tr>
        <tr>
         <td class="py-4 pr-8">
          test-b2
         </td>
         <td class="py-4 pr-8">
          b2@qq.com
         </td>
         <td class="py-4 pr-8">
          8100442
         </td>
         <td class="py-4 pr-8">
          <span class="type-pill type-pill-standard">
           标准
          </span>
         </td>
         <td class="py-4 pr-8">
          0.1
         </td>
         <td class="py-4 pr-8">
          XAUUSD
         </td>
         <td class="py-4 pr-8">
          2026-07-01 13:25:58
         </td>
         <td class="py-4 pr-8">
          994290
         </td>
         <td class="py-4 pr-8">
          554507
         </td>
         <td class="py-4 pr-8">
          994291
         </td>
         <td class="py-4 pr-8">
          554508
         </td>
         <td class="py-4">
          2026-07-01 13:26:34
         </td>
        </tr>
       </tbody>
      </table>
     </div>
    </div>
   </div>
   <div class="detail-tab-panel hidden" id="tab-panel-invite">
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
       <input class="filter-input flex-1" type="text"/>
      </div>
      <div class="lg:col-span-3 flex items-center gap-2">
       <span class="text-gray-500 shrink-0">
        邀请人姓名:
       </span>
       <input class="filter-input flex-1" placeholder="请输入邀请人姓名" type="text"/>
      </div>
      <div class="lg:col-span-3 flex items-center gap-2">
       <span class="text-gray-500 shrink-0">
        邀请人邮箱:
       </span>
       <input class="filter-input flex-1" placeholder="请输入邀请人邮箱" type="text"/>
      </div>
      <div class="lg:col-span-3 flex items-center gap-2">
       <span class="text-gray-500 shrink-0">
        受邀人姓名:
       </span>
       <input class="filter-input flex-1" placeholder="请输入受邀人姓名" type="text"/>
      </div>
      <div class="lg:col-span-3 flex items-center gap-2">
       <span class="text-gray-500 shrink-0">
        受邀人邮箱:
       </span>
       <input class="filter-input flex-1" placeholder="请输入受邀人邮箱" type="text"/>
      </div>
      <div class="lg:col-span-4 flex items-center gap-2">
       <button class="h-8 px-4 rounded-md bg-primary text-white text-xs hover:bg-primaryHover transition-colors">
        搜索
       </button>
       <button class="h-8 px-4 rounded-md border border-gray-200 bg-white text-gray-600 text-xs hover:bg-gray-50 transition-colors">
        重置
       </button>
      </div>
     </div>
    </div>
    <div class="px-5 py-0">
     <div class="overflow-x-auto">
      <table class="min-w-full text-sm">
       <thead>
        <tr class="text-left text-gray-500 border-b border-gray-100">
         <th class="font-medium py-3 pr-8">
          邀请人姓名
         </th>
         <th class="font-medium py-3 pr-8">
          邀请人邮箱
         </th>
         <th class="font-medium py-3 pr-8">
          受邀人姓名
         </th>
         <th class="font-medium py-3 pr-8">
          受邀人邮箱
         </th>
         <th class="font-medium py-3 pr-8 change-highlight">
          受邀账户类型
         </th>
         <th class="font-medium py-3 pr-8">
          受邀人状态
         </th>
         <th class="font-medium py-3 pr-8 change-highlight">
          受邀人累计入金金额
         </th>
         <th class="font-medium py-3 pr-8">
          受邀人当前等级
         </th>
         <th class="font-medium py-3">
          邀请时间
         </th>
        </tr>
       </thead>
       <tbody class="text-gray-700">
        <tr class="border-b border-gray-100">
         <td class="py-4 pr-8">
          test-周刚
         </td>
         <td class="py-4 pr-8">
          zhougang@linkon.me
         </td>
         <td class="py-4 pr-8">
          test-zhoubinbin
         </td>
         <td class="py-4 pr-8">
          1741784918@qq.com
         </td>
         <td class="py-4 pr-8">
          <span class="type-pill type-pill-standard">
           标准
          </span>
         </td>
         <td class="py-4 pr-8">
          正常
         </td>
         <td class="py-4 pr-8">
          0.00
          <span class="value-sub">
           <span class="value-sub-line">
            USD: 0.00
           </span>
           <span class="value-sub-line">
            USC: 0.00
           </span>
          </span>
         </td>
         <td class="py-4 pr-8">
          直营
         </td>
         <td class="py-4">
          2026-07-24 17:35:22
         </td>
        </tr>
        <tr class="border-b border-gray-100">
         <td class="py-4 pr-8">
          test-孙昊的
         </td>
         <td class="py-4 pr-8">
          15059104067@qq.com
         </td>
         <td class="py-4 pr-8">
          test-魏佳用
         </td>
         <td class="py-4 pr-8">
          15279708217@165.com
         </td>
         <td class="py-4 pr-8">
          <span class="type-pill type-pill-cent">
           美分
          </span>
         </td>
         <td class="py-4 pr-8">
          正常
         </td>
         <td class="py-4 pr-8">
          1,000.00
          <span class="value-sub">
           <span class="value-sub-line">
            USD: 10.00
           </span>
           <span class="value-sub-line">
            USC: 1,000.00
           </span>
          </span>
         </td>
         <td class="py-4 pr-8">
          RIB
         </td>
         <td class="py-4">
          2026-06-30 14:44:23
         </td>
        </tr>
        <tr class="border-b border-gray-100">
         <td class="py-4 pr-8">
          test-孙昊的
         </td>
         <td class="py-4 pr-8">
          15059104067@qq.com
         </td>
         <td class="py-4 pr-8">
          test-杨敏子
         </td>
         <td class="py-4 pr-8">
          13994874677@qq.com
         </td>
         <td class="py-4 pr-8">
          <span class="type-pill type-pill-standard">
           标准
          </span>
         </td>
         <td class="py-4 pr-8">
          正常
         </td>
         <td class="py-4 pr-8">
          0.00
          <span class="value-sub">
           <span class="value-sub-line">
            USD: 0.00
           </span>
           <span class="value-sub-line">
            USC: 0.00
           </span>
          </span>
         </td>
         <td class="py-4 pr-8">
          直营
         </td>
         <td class="py-4">
          2026-06-30 14:42:45
         </td>
        </tr>
        <tr class="border-b border-gray-100">
         <td class="py-4 pr-8">
          test-孙昊的
         </td>
         <td class="py-4 pr-8">
          15059104067@qq.com
         </td>
         <td class="py-4 pr-8">
          test-秦洋辰
         </td>
         <td class="py-4 pr-8">
          15097830595@165.com
         </td>
         <td class="py-4 pr-8">
          <span class="type-pill type-pill-standard">
           标准
          </span>
         </td>
         <td class="py-4 pr-8">
          正常
         </td>
         <td class="py-4 pr-8">
          0.00
          <span class="value-sub">
           <span class="value-sub-line">
            USD: 0.00
           </span>
           <span class="value-sub-line">
            USC: 0.00
           </span>
          </span>
         </td>
         <td class="py-4 pr-8">
          直营
         </td>
         <td class="py-4">
          2026-06-30 14:39:47
         </td>
        </tr>
        <tr class="border-b border-gray-100">
         <td class="py-4 pr-8">
          test-褚必
         </td>
         <td class="py-4 pr-8">
          b12@qq.com
         </td>
         <td class="py-4 pr-8">
          test-杨均
         </td>
         <td class="py-4 pr-8">
          b13@qq.com
         </td>
         <td class="py-4 pr-8">
          <span class="type-pill type-pill-cent">
           美分
          </span>
         </td>
         <td class="py-4 pr-8">
          正常
         </td>
         <td class="py-4 pr-8">
          2,000.00
          <span class="value-sub">
           <span class="value-sub-line">
            USD: 20.00
           </span>
           <span class="value-sub-line">
            USC: 2,000.00
           </span>
          </span>
         </td>
         <td class="py-4 pr-8">
          RIB
         </td>
         <td class="py-4">
          2026-06-08 15:06:52
         </td>
        </tr>
        <tr class="border-b border-gray-100">
         <td class="py-4 pr-8">
          test-蒋为
         </td>
         <td class="py-4 pr-8">
          b11@qq.com
         </td>
         <td class="py-4 pr-8">
          test-褚必
         </td>
         <td class="py-4 pr-8">
          b12@qq.com
         </td>
         <td class="py-4 pr-8">
          <span class="type-pill type-pill-standard">
           标准
          </span>
         </td>
         <td class="py-4 pr-8">
          正常
         </td>
         <td class="py-4 pr-8">
          0.00
          <span class="value-sub">
           <span class="value-sub-line">
            USD: 0.00
           </span>
           <span class="value-sub-line">
            USC: 0.00
           </span>
          </span>
         </td>
         <td class="py-4 pr-8">
          RIB
         </td>
         <td class="py-4">
          2026-06-08 15:03:53
         </td>
        </tr>
        <tr class="border-b border-gray-100">
         <td class="py-4 pr-8">
          test-魏晶夫
         </td>
         <td class="py-4 pr-8">
          b10@qq.com
         </td>
         <td class="py-4 pr-8">
          test-蒋为
         </td>
         <td class="py-4 pr-8">
          b11@qq.com
         </td>
         <td class="py-4 pr-8">
          <span class="type-pill type-pill-standard">
           标准
          </span>
         </td>
         <td class="py-4 pr-8">
          正常
         </td>
         <td class="py-4 pr-8">
          0.00
          <span class="value-sub">
           <span class="value-sub-line">
            USD: 0.00
           </span>
           <span class="value-sub-line">
            USC: 0.00
           </span>
          </span>
         </td>
         <td class="py-4 pr-8">
          RIB
         </td>
         <td class="py-4">
          2026-06-08 15:00:40
         </td>
        </tr>
        <tr class="border-b border-gray-100">
         <td class="py-4 pr-8">
          test-b5
         </td>
         <td class="py-4 pr-8">
          b8@qq.com
         </td>
         <td class="py-4 pr-8">
          test-魏晶夫
         </td>
         <td class="py-4 pr-8">
          b10@qq.com
         </td>
         <td class="py-4 pr-8">
          <span class="type-pill type-pill-standard">
           标准
          </span>
         </td>
         <td class="py-4 pr-8">
          正常
         </td>
         <td class="py-4 pr-8">
          0.00
          <span class="value-sub">
           <span class="value-sub-line">
            USD: 0.00
           </span>
           <span class="value-sub-line">
            USC: 0.00
           </span>
          </span>
         </td>
         <td class="py-4 pr-8">
          RIB
         </td>
         <td class="py-4">
          2026-06-08 14:57:46
         </td>
        </tr>
        <tr class="border-b border-gray-100">
         <td class="py-4 pr-8">
          test-b5
         </td>
         <td class="py-4 pr-8">
          b8@qq.com
         </td>
         <td class="py-4 pr-8">
          test-b5/D1
         </td>
         <td class="py-4 pr-8">
          b9@qq.com
         </td>
         <td class="py-4 pr-8">
          <span class="type-pill type-pill-standard">
           标准
          </span>
         </td>
         <td class="py-4 pr-8">
          正常
         </td>
         <td class="py-4 pr-8">
          0.00
          <span class="value-sub">
           <span class="value-sub-line">
            USD: 0.00
           </span>
           <span class="value-sub-line">
            USC: 0.00
           </span>
          </span>
         </td>
         <td class="py-4 pr-8">
          RIB
         </td>
         <td class="py-4">
          2026-06-08 14:55:31
         </td>
        </tr>
        <tr>
         <td class="py-4 pr-8">
          test-b4
         </td>
         <td class="py-4 pr-8">
          b4@qq.com
         </td>
         <td class="py-4 pr-8">
          test-b5
         </td>
         <td class="py-4 pr-8">
          b8@qq.com
         </td>
         <td class="py-4 pr-8">
          <span class="type-pill type-pill-standard">
           标准
          </span>
         </td>
         <td class="py-4 pr-8">
          正常
         </td>
         <td class="py-4 pr-8">
          10,000.00
          <span class="value-sub">
           <span class="value-sub-line">
            USD: 10,000.00
           </span>
           <span class="value-sub-line">
            USC: 0.00
           </span>
          </span>
         </td>
         <td class="py-4 pr-8">
          RIB
         </td>
         <td class="py-4">
          2026-06-08 14:31:57
         </td>
        </tr>
       </tbody>
      </table>
     </div>
    </div>
   </div>
   <div class="detail-tab-panel hidden" id="tab-panel-history">
    <div class="px-5 py-3 border-b border-gray-100">
     <div class="grid grid-cols-1 lg:grid-cols-12 gap-3 text-xs items-center">
      <div class="lg:col-span-3 flex items-center gap-2">
       <span class="text-gray-500 shrink-0">
        客户姓名:
       </span>
       <input class="filter-input flex-1" placeholder="请输入客户姓名" type="text"/>
      </div>
      <div class="lg:col-span-3 flex items-center gap-2">
       <span class="text-gray-500 shrink-0">
        客户邮箱:
       </span>
       <input class="filter-input flex-1" placeholder="请输入客户邮箱" type="text"/>
      </div>
      <div class="lg:col-span-2 flex items-center gap-2">
       <span class="text-gray-500 shrink-0">
        统计月份:
       </span>
       <input class="filter-input flex-1" placeholder="请选择月份" type="text"/>
      </div>
      <div class="lg:col-span-4 flex items-center gap-2">
       <button class="h-8 px-4 rounded-md bg-primary text-white text-xs hover:bg-primaryHover transition-colors">
        搜索
       </button>
       <button class="h-8 px-4 rounded-md border border-gray-200 bg-white text-gray-600 text-xs hover:bg-gray-50 transition-colors">
        重置
       </button>
      </div>
     </div>
    </div>
    <div class="px-5 py-0">
     <div class="overflow-x-auto">
      <table class="min-w-full text-sm">
       <thead>
        <tr class="text-left text-gray-500 border-b border-gray-100">
         <th class="font-medium py-3 pr-8">
          客户姓名
         </th>
         <th class="font-medium py-3 pr-8">
          客户邮箱
         </th>
         <th class="font-medium py-3 pr-8">
          统计月份
         </th>
         <th class="font-medium py-3 pr-8">
          交易量
         </th>
         <th class="font-medium py-3 pr-8">
          当前等级
         </th>
         <th class="font-medium py-3">
          注册时间
         </th>
        </tr>
       </thead>
       <tbody class="text-gray-700">
        <tr class="border-b border-gray-100">
         <td class="py-4 pr-8">
          test-zhoubinbin
         </td>
         <td class="py-4 pr-8">
          1741784918@qq.com
         </td>
         <td class="py-4 pr-8">
          2026-07
         </td>
         <td class="py-4 pr-8">
          0.0000
          <span class="value-sub">
           <span class="value-sub-line">
            标准手: 0.00
           </span>
           <span class="value-sub-line">
            美分手: 0.00
           </span>
          </span>
         </td>
         <td class="py-4 pr-8">
          直营
         </td>
         <td class="py-4">
          2026-07-24 17:35:22
         </td>
        </tr>
        <tr class="border-b border-gray-100">
         <td class="py-4 pr-8">
          test-魏佳用
         </td>
         <td class="py-4 pr-8">
          15279708217@165.com
         </td>
         <td class="py-4 pr-8">
          2026-07
         </td>
         <td class="py-4 pr-8">
          0.2020
          <span class="value-sub">
           <span class="value-sub-line">
            标准手: 0.20
           </span>
           <span class="value-sub-line">
            美分手: 0.20
           </span>
          </span>
         </td>
         <td class="py-4 pr-8">
          直营
         </td>
         <td class="py-4">
          2026-06-30 14:44:23
         </td>
        </tr>
        <tr class="border-b border-gray-100">
         <td class="py-4 pr-8">
          test-杨敏子
         </td>
         <td class="py-4 pr-8">
          13994874677@qq.com
         </td>
         <td class="py-4 pr-8">
          2026-07
         </td>
         <td class="py-4 pr-8">
          0.0000
          <span class="value-sub">
           <span class="value-sub-line">
            标准手: 0.00
           </span>
           <span class="value-sub-line">
            美分手: 0.00
           </span>
          </span>
         </td>
         <td class="py-4 pr-8">
          直营
         </td>
         <td class="py-4">
          2026-06-30 14:42:45
         </td>
        </tr>
        <tr class="border-b border-gray-100">
         <td class="py-4 pr-8">
          test-秦洋辰
         </td>
         <td class="py-4 pr-8">
          15097830595@165.com
         </td>
         <td class="py-4 pr-8">
          2026-07
         </td>
         <td class="py-4 pr-8">
          0.0000
          <span class="value-sub">
           <span class="value-sub-line">
            标准手: 0.00
           </span>
           <span class="value-sub-line">
            美分手: 0.00
           </span>
          </span>
         </td>
         <td class="py-4 pr-8">
          直营
         </td>
         <td class="py-4">
          2026-06-30 14:39:47
         </td>
        </tr>
        <tr class="border-b border-gray-100">
         <td class="py-4 pr-8">
          test-杨均
         </td>
         <td class="py-4 pr-8">
          b13@qq.com
         </td>
         <td class="py-4 pr-8">
          2026-07
         </td>
         <td class="py-4 pr-8">
          0.1015
          <span class="value-sub">
           <span class="value-sub-line">
            标准手: 0.10
           </span>
           <span class="value-sub-line">
            美分手: 0.15
           </span>
          </span>
         </td>
         <td class="py-4 pr-8">
          RIB
         </td>
         <td class="py-4">
          2026-06-08 15:06:52
         </td>
        </tr>
        <tr class="border-b border-gray-100">
         <td class="py-4 pr-8">
          test-褚必
         </td>
         <td class="py-4 pr-8">
          b12@qq.com
         </td>
         <td class="py-4 pr-8">
          2026-07
         </td>
         <td class="py-4 pr-8">
          0.1000
          <span class="value-sub">
           <span class="value-sub-line">
            标准手: 0.10
           </span>
           <span class="value-sub-line">
            美分手: 0.00
           </span>
          </span>
         </td>
         <td class="py-4 pr-8">
          RIB
         </td>
         <td class="py-4">
          2026-06-08 15:03:53
         </td>
        </tr>
        <tr class="border-b border-gray-100">
         <td class="py-4 pr-8">
          test-蒋为
         </td>
         <td class="py-4 pr-8">
          b11@qq.com
         </td>
         <td class="py-4 pr-8">
          2026-07
         </td>
         <td class="py-4 pr-8">
          0.1000
          <span class="value-sub">
           <span class="value-sub-line">
            标准手: 0.10
           </span>
           <span class="value-sub-line">
            美分手: 0.00
           </span>
          </span>
         </td>
         <td class="py-4 pr-8">
          RIB
         </td>
         <td class="py-4">
          2026-06-08 15:00:40
         </td>
        </tr>
        <tr class="border-b border-gray-100">
         <td class="py-4 pr-8">
          test-魏晶夫
         </td>
         <td class="py-4 pr-8">
          b10@qq.com
         </td>
         <td class="py-4 pr-8">
          2026-07
         </td>
         <td class="py-4 pr-8">
          0.1000
          <span class="value-sub">
           <span class="value-sub-line">
            标准手: 0.10
           </span>
           <span class="value-sub-line">
            美分手: 0.00
           </span>
          </span>
         </td>
         <td class="py-4 pr-8">
          RIB
         </td>
         <td class="py-4">
          2026-06-08 14:57:46
         </td>
        </tr>
        <tr class="border-b border-gray-100">
         <td class="py-4 pr-8">
          test-b5/D1
         </td>
         <td class="py-4 pr-8">
          b9@qq.com
         </td>
         <td class="py-4 pr-8">
          2026-07
         </td>
         <td class="py-4 pr-8">
          0.0000
          <span class="value-sub">
           <span class="value-sub-line">
            标准手: 0.00
           </span>
           <span class="value-sub-line">
            美分手: 0.00
           </span>
          </span>
         </td>
         <td class="py-4 pr-8">
          RIB
         </td>
         <td class="py-4">
          2026-06-08 14:55:31
         </td>
        </tr>
        <tr class="border-b border-gray-100">
         <td class="py-4 pr-8">
          test-b5
         </td>
         <td class="py-4 pr-8">
          b8@qq.com
         </td>
         <td class="py-4 pr-8">
          2026-07
         </td>
         <td class="py-4 pr-8">
          0.1000
          <span class="value-sub">
           <span class="value-sub-line">
            标准手: 0.10
           </span>
           <span class="value-sub-line">
            美分手: 0.00
           </span>
          </span>
         </td>
         <td class="py-4 pr-8">
          RIB
         </td>
         <td class="py-4">
          2026-06-08 14:31:57
         </td>
        </tr>
        <tr class="border-b border-gray-100">
         <td class="py-4 pr-8">
          test-b3/D2-Z01
         </td>
         <td class="py-4 pr-8">
          b7@qq.com
         </td>
         <td class="py-4 pr-8">
          2026-07
         </td>
         <td class="py-4 pr-8">
          0.0000
          <span class="value-sub">
           <span class="value-sub-line">
            标准手: 0.00
           </span>
           <span class="value-sub-line">
            美分手: 0.00
           </span>
          </span>
         </td>
         <td class="py-4 pr-8">
          RIB
         </td>
         <td class="py-4">
          2026-06-08 14:12:57
         </td>
        </tr>
        <tr>
         <td class="py-4 pr-8">
          test-b3/D2
         </td>
         <td class="py-4 pr-8">
          b6@qq.com
         </td>
         <td class="py-4 pr-8">
          2026-07
         </td>
         <td class="py-4 pr-8">
          0.0000
          <span class="value-sub">
           <span class="value-sub-line">
            标准手: 0.00
           </span>
           <span class="value-sub-line">
            美分手: 0.00
           </span>
          </span>
         </td>
         <td class="py-4 pr-8">
          RIB
         </td>
         <td class="py-4">
          2026-06-08 14:09:47
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

    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
</script>
