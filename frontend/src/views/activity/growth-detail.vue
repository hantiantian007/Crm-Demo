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
        成长计划
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
        53
       </td>
       <td class="py-4 pr-8">
        史密斯
       </td>
       <td class="py-4">
        2026-03-24 15:36:13
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
        1级
       </td>
       <td class="py-3.5 px-4">
        10
       </td>
       <td class="py-3.5 px-4">
        20
       </td>
       <td class="py-3.5 px-4">
        30
       </td>
       <td class="py-3.5 px-4">
        40
       </td>
       <td class="py-3.5 px-4">
        50
       </td>
       <td class="py-3.5 px-4">
        60
       </td>
       <td class="py-3.5 px-4">
        70
       </td>
       <td class="py-3.5 px-4">
        0
       </td>
       <td class="py-3.5 px-4">
        1.00
       </td>
       <td class="py-3.5 px-4">
        1
       </td>
       <td class="py-3.5 px-5">
        2
       </td>
      </tr>
      <tr class="border-b border-gray-100">
       <td class="py-3.5 px-5">
        2级
       </td>
       <td class="py-3.5 px-4">
        14
       </td>
       <td class="py-3.5 px-4">
        24
       </td>
       <td class="py-3.5 px-4">
        34
       </td>
       <td class="py-3.5 px-4">
        44
       </td>
       <td class="py-3.5 px-4">
        54
       </td>
       <td class="py-3.5 px-4">
        64
       </td>
       <td class="py-3.5 px-4">
        74
       </td>
       <td class="py-3.5 px-4">
        0
       </td>
       <td class="py-3.5 px-4">
        2.00
       </td>
       <td class="py-3.5 px-4">
        2
       </td>
       <td class="py-3.5 px-5">
        0
       </td>
      </tr>
      <tr class="border-b border-gray-100">
       <td class="py-3.5 px-5">
        3级
       </td>
       <td class="py-3.5 px-4">
        16
       </td>
       <td class="py-3.5 px-4">
        26
       </td>
       <td class="py-3.5 px-4">
        36
       </td>
       <td class="py-3.5 px-4">
        46
       </td>
       <td class="py-3.5 px-4">
        56
       </td>
       <td class="py-3.5 px-4">
        66
       </td>
       <td class="py-3.5 px-4">
        76
       </td>
       <td class="py-3.5 px-4">
        0
       </td>
       <td class="py-3.5 px-4">
        3.00
       </td>
       <td class="py-3.5 px-4">
        3
       </td>
       <td class="py-3.5 px-5">
        0
       </td>
      </tr>
      <tr class="border-b border-gray-100">
       <td class="py-3.5 px-5">
        4级
       </td>
       <td class="py-3.5 px-4">
        18
       </td>
       <td class="py-3.5 px-4">
        28
       </td>
       <td class="py-3.5 px-4">
        38
       </td>
       <td class="py-3.5 px-4">
        48
       </td>
       <td class="py-3.5 px-4">
        58
       </td>
       <td class="py-3.5 px-4">
        68
       </td>
       <td class="py-3.5 px-4">
        78
       </td>
       <td class="py-3.5 px-4">
        0
       </td>
       <td class="py-3.5 px-4">
        4.00
       </td>
       <td class="py-3.5 px-4">
        15
       </td>
       <td class="py-3.5 px-5">
        0
       </td>
      </tr>
      <tr>
       <td class="py-3.5 px-5">
        5级
       </td>
       <td class="py-3.5 px-4">
        20
       </td>
       <td class="py-3.5 px-4">
        30
       </td>
       <td class="py-3.5 px-4">
        40
       </td>
       <td class="py-3.5 px-4">
        50
       </td>
       <td class="py-3.5 px-4">
        60
       </td>
       <td class="py-3.5 px-4">
        70
       </td>
       <td class="py-3.5 px-4">
        80
       </td>
       <td class="py-3.5 px-4">
        0
       </td>
       <td class="py-3.5 px-4">
        5.00
       </td>
       <td class="py-3.5 px-4">
        20
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
     <button class="growth-tab-btn px-4 h-7 rounded-sm border tab-active whitespace-nowrap" data-tab="customer">
      客户列表
     </button>
     <button class="growth-tab-btn px-4 h-7 rounded-sm border border-transparent text-gray-500 hover:text-gray-700 whitespace-nowrap" data-tab="rebate">
      返佣记录
     </button>
     <button class="growth-tab-btn px-4 h-7 rounded-sm border border-transparent text-gray-500 hover:text-gray-700 whitespace-nowrap" data-tab="trade">
      交易记录
     </button>
     <button class="growth-tab-btn px-4 h-7 rounded-sm border border-transparent text-gray-500 hover:text-gray-700 whitespace-nowrap" data-tab="invite">
      邀请记录
     </button>
    </div>
   </div>
   <div class="growth-tab-panel" id="growth-tab-customer">
    <div class="px-4 py-3 border-b border-gray-100">
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
         0级
        </option>
        <option>
         1级
        </option>
        <option>
         2级
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
    <div class="px-4">
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
          升级日期
         </th>
         <th class="font-medium py-3 px-4 change-highlight">
          累计交易手数
         </th>
         <th class="font-medium py-3 px-4 change-highlight">
          入金金额
         </th>
         <th class="font-medium py-3 px-4 change-highlight">
          余额
         </th>
         <th class="font-medium py-3 px-4">
          邀请数量
         </th>
         <th class="font-medium py-3 px-4">
          操作
         </th>
        </tr>
       </thead>
       <tbody class="text-gray-700">
        <tr class="border-b border-gray-100">
         <td class="py-3.5 px-4">
          test-孙春
         </td>
         <td class="py-3.5 px-4">
          13755079682@qq.com
         </td>
         <td class="py-3.5 px-4">
          0级
         </td>
         <td class="py-3.5 px-4">
          2026-07-21 15:21:29
         </td>
         <td class="py-3.5 px-4">
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
         <td class="py-3.5 px-4">
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
         <td class="py-3.5 px-4">
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
         <td class="py-3.5 px-4">
          0
         </td>
         <td class="py-3.5 px-4">
          <span class="inline-flex items-center px-3 h-6 rounded-md text-[12px] text-white bg-primary">
           等级调整
          </span>
         </td>
        </tr>
        <tr class="border-b border-gray-100">
         <td class="py-3.5 px-4">
          test-何工雄
         </td>
         <td class="py-3.5 px-4">
          15276724108@qq.com
         </td>
         <td class="py-3.5 px-4">
          0级
         </td>
         <td class="py-3.5 px-4">
          2026-07-17 11:12:29
         </td>
         <td class="py-3.5 px-4">
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
         <td class="py-3.5 px-4">
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
         <td class="py-3.5 px-4">
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
         <td class="py-3.5 px-4">
          0
         </td>
         <td class="py-3.5 px-4">
          <span class="inline-flex items-center px-3 h-6 rounded-md text-[12px] text-white bg-primary">
           等级调整
          </span>
         </td>
        </tr>
        <tr class="border-b border-gray-100">
         <td class="py-3.5 px-4">
          test-李份
         </td>
         <td class="py-3.5 px-4">
          13642016896@qq.com
         </td>
         <td class="py-3.5 px-4">
          0级
         </td>
         <td class="py-3.5 px-4">
          2026-07-17 11:08:18
         </td>
         <td class="py-3.5 px-4">
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
         <td class="py-3.5 px-4">
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
         <td class="py-3.5 px-4">
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
         <td class="py-3.5 px-4">
          0
         </td>
         <td class="py-3.5 px-4">
          <span class="inline-flex items-center px-3 h-6 rounded-md text-[12px] text-white bg-primary">
           等级调整
          </span>
         </td>
        </tr>
        <tr class="border-b border-gray-100">
         <td class="py-3.5 px-4">
          test-曹君龄
         </td>
         <td class="py-3.5 px-4">
          13993637663@qq.com
         </td>
         <td class="py-3.5 px-4">
          0级
         </td>
         <td class="py-3.5 px-4">
          2026-07-17 11:06:08
         </td>
         <td class="py-3.5 px-4">
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
         <td class="py-3.5 px-4">
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
         <td class="py-3.5 px-4">
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
         <td class="py-3.5 px-4">
          0
         </td>
         <td class="py-3.5 px-4">
          <span class="inline-flex items-center px-3 h-6 rounded-md text-[12px] text-white bg-primary">
           等级调整
          </span>
         </td>
        </tr>
        <tr class="border-b border-gray-100">
         <td class="py-3.5 px-4">
          test-吕辰试
         </td>
         <td class="py-3.5 px-4">
          15216214854@165.com
         </td>
         <td class="py-3.5 px-4">
          0级
         </td>
         <td class="py-3.5 px-4">
          2026-07-17 11:03:57
         </td>
         <td class="py-3.5 px-4">
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
         <td class="py-3.5 px-4">
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
         <td class="py-3.5 px-4">
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
         <td class="py-3.5 px-4">
          0
         </td>
         <td class="py-3.5 px-4">
          <span class="inline-flex items-center px-3 h-6 rounded-md text-[12px] text-white bg-primary">
           等级调整
          </span>
         </td>
        </tr>
        <tr>
         <td class="py-3.5 px-4">
          test-何周滢
         </td>
         <td class="py-3.5 px-4">
          15703741282@qq.com
         </td>
         <td class="py-3.5 px-4">
          0级
         </td>
         <td class="py-3.5 px-4">
          2026-07-17 10:58:23
         </td>
         <td class="py-3.5 px-4">
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
         <td class="py-3.5 px-4">
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
         <td class="py-3.5 px-4">
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
         <td class="py-3.5 px-4">
          0
         </td>
         <td class="py-3.5 px-4">
          <span class="inline-flex items-center px-3 h-6 rounded-md text-[12px] text-white bg-primary">
           等级调整
          </span>
         </td>
        </tr>
       </tbody>
      </table>
     </div>
    </div>
   </div>
   <div class="growth-tab-panel hidden" id="growth-tab-rebate">
    <div class="px-4 py-3 border-b border-gray-100">
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
        平仓订单编号:
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
         未结算
        </option>
        <option>
         已结算
        </option>
       </select>
      </div>
      <div class="lg:col-span-4 flex items-center gap-2">
       <span class="text-gray-500 shrink-0">
        平台时间:
       </span>
       <input class="filter-input w-[118px]" placeholder="开始日期" type="text"/>
       <span class="text-gray-300">
        到
       </span>
       <input class="filter-input w-[118px]" placeholder="结束日期" type="text"/>
      </div>
      <div class="lg:col-span-5 flex items-center gap-2">
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
    <div class="px-4">
     <div class="overflow-x-auto">
      <table class="min-w-full text-sm">
       <thead>
        <tr class="text-left text-gray-500 border-b border-gray-100">
         <th class="font-medium py-3 px-3">
         </th>
         <th class="font-medium py-3 px-3">
          客户名称
         </th>
         <th class="font-medium py-3 px-3">
          客户邮箱
         </th>
         <th class="font-medium py-3 px-3">
          邀请人
         </th>
         <th class="font-medium py-3 px-3">
          返佣账号
         </th>
         <th class="font-medium py-3 px-3">
          返佣用户
         </th>
         <th class="font-medium py-3 px-3">
          返佣用户等级
         </th>
         <th class="font-medium py-3 px-3">
          返佣用户邮箱
         </th>
         <th class="font-medium py-3 px-3 change-highlight">
          MT类型
         </th>
         <th class="font-medium py-3 px-3">
          是否结算
         </th>
         <th class="font-medium py-3 px-3">
          交易手数
         </th>
         <th class="font-medium py-3 px-3">
          交易品种
         </th>
         <th class="font-medium py-3 px-3">
          开仓编号
         </th>
         <th class="font-medium py-3 px-3">
          持仓编号
         </th>
         <th class="font-medium py-3 px-3">
          平台编号
         </th>
        </tr>
       </thead>
       <tbody class="text-gray-700">
        <tr class="border-b border-gray-100">
         <td class="py-3 px-3 text-red-400">
          ▼
         </td>
         <td class="py-3 px-3">
          test-a4
         </td>
         <td class="py-3 px-3">
          a6@qq.com
         </td>
         <td class="py-3 px-3">
          test-a3
         </td>
         <td class="py-3 px-3">
          8300100
         </td>
         <td class="py-3 px-3">
          test-测试-A
         </td>
         <td class="py-3 px-3">
          AAA
         </td>
         <td class="py-3 px-3">
          2428702751@qq.com
         </td>
         <td class="py-3 px-3">
          <span class="type-pill type-pill-cent">
           美分
          </span>
         </td>
         <td class="py-3 px-3">
          未结算
         </td>
         <td class="py-3 px-3">
          0.2
         </td>
         <td class="py-3 px-3">
          XAUUSD
         </td>
         <td class="py-3 px-3">
          1065650
         </td>
         <td class="py-3 px-3">
          604056
         </td>
         <td class="py-3 px-3">
          1065651
         </td>
        </tr>
        <tr class="border-b border-gray-100 bg-gray-50/40">
         <td>
         </td>
         <td class="py-0" colspan="14">
          <div class="grid grid-cols-[120px_1fr] text-xs text-gray-600">
           <div class="py-2 border-b border-gray-100 px-3 font-medium">
            返佣规则
           </div>
           <div class="py-2 border-b border-gray-100 px-3">
            30 $/lot
           </div>
           <div class="py-2 border-b border-gray-100 px-3 font-medium">
            实际返佣标准
           </div>
           <div class="py-2 border-b border-gray-100 px-3">
            2.00 $/lot
           </div>
           <div class="py-2 border-b border-gray-100 px-3 font-medium">
            返佣金额
           </div>
           <div class="py-2 border-b border-gray-100 px-3">
            0.40
           </div>
           <div class="py-2 border-b border-gray-100 px-3 font-medium">
            平台时间
           </div>
           <div class="py-2 border-b border-gray-100 px-3">
            2026-07-28 09:18:46
           </div>
           <div class="py-2 px-3 font-medium">
            操作
           </div>
           <div class="py-2 px-3">
            <span class="inline-flex items-center px-3 h-6 rounded-md text-[12px] text-white bg-primary">
             查看
            </span>
           </div>
          </div>
         </td>
        </tr>
        <tr class="border-b border-gray-100">
         <td class="py-3 px-3 text-red-400">
          ▶
         </td>
         <td class="py-3 px-3">
          test-a4
         </td>
         <td class="py-3 px-3">
          a6@qq.com
         </td>
         <td class="py-3 px-3">
          test-a3
         </td>
         <td class="py-3 px-3">
          8300179
         </td>
         <td class="py-3 px-3">
          test-a2
         </td>
         <td class="py-3 px-3">
          3级
         </td>
         <td class="py-3 px-3">
          a2@qq.com
         </td>
         <td class="py-3 px-3">
          <span class="type-pill type-pill-standard">
           标准
          </span>
         </td>
         <td class="py-3 px-3">
          已结算
         </td>
         <td class="py-3 px-3">
          0.2
         </td>
         <td class="py-3 px-3">
          XAUUSD
         </td>
         <td class="py-3 px-3">
          1065650
         </td>
         <td class="py-3 px-3">
          604056
         </td>
         <td class="py-3 px-3">
          1065651
         </td>
        </tr>
        <tr class="border-b border-gray-100">
         <td class="py-3 px-3 text-red-400">
          ▶
         </td>
         <td class="py-3 px-3">
          许眠婷
         </td>
         <td class="py-3 px-3">
          string777@126.com
         </td>
         <td class="py-3 px-3">
          test-韩预发
         </td>
         <td class="py-3 px-3">
          8300198
         </td>
         <td class="py-3 px-3">
          test-韩预发
         </td>
         <td class="py-3 px-3">
          5级
         </td>
         <td class="py-3 px-3">
          935292016@qq.com
         </td>
         <td class="py-3 px-3">
          <span class="type-pill type-pill-cent">
           美分
          </span>
         </td>
         <td class="py-3 px-3">
          已结算
         </td>
         <td class="py-3 px-3">
          0.5
         </td>
         <td class="py-3 px-3">
          XAUUSD
         </td>
         <td class="py-3 px-3">
          1032930
         </td>
         <td class="py-3 px-3">
          580944
         </td>
         <td class="py-3 px-3">
          1051362
         </td>
        </tr>
        <tr>
         <td class="py-3 px-3 text-red-400">
          ▶
         </td>
         <td class="py-3 px-3">
          曾曦
         </td>
         <td class="py-3 px-3">
          835705246@qq.com
         </td>
         <td class="py-3 px-3">
          test-韩预发
         </td>
         <td class="py-3 px-3">
          8300198
         </td>
         <td class="py-3 px-3">
          test-韩预发
         </td>
         <td class="py-3 px-3">
          5级
         </td>
         <td class="py-3 px-3">
          935292016@qq.com
         </td>
         <td class="py-3 px-3">
          <span class="type-pill type-pill-standard">
           标准
          </span>
         </td>
         <td class="py-3 px-3">
          已结算
         </td>
         <td class="py-3 px-3">
          0.01
         </td>
         <td class="py-3 px-3">
          XAUUSD
         </td>
         <td class="py-3 px-3">
          1012562
         </td>
         <td class="py-3 px-3">
          567307
         </td>
         <td class="py-3 px-3">
          1028314
         </td>
        </tr>
       </tbody>
      </table>
     </div>
    </div>
   </div>
   <div class="growth-tab-panel hidden" id="growth-tab-trade">
    <div class="px-4 py-3 border-b border-gray-100">
     <div class="grid grid-cols-1 lg:grid-cols-12 gap-3 text-xs items-center">
      <div class="lg:col-span-4 flex items-center gap-2">
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
      <div class="lg:col-span-2 flex items-center gap-2">
       <span class="text-gray-500 shrink-0">
        MT账号:
       </span>
       <input class="filter-input flex-1" placeholder="请输入MT账号" type="text"/>
      </div>
      <div class="lg:col-span-5 flex items-center gap-2">
       <span class="text-gray-500 shrink-0">
        平台时间:
       </span>
       <input class="filter-input w-[118px]" placeholder="开始日期" type="text"/>
       <span class="text-gray-300">
        到
       </span>
       <input class="filter-input w-[118px]" placeholder="结束日期" type="text"/>
      </div>
      <div class="lg:col-span-7 flex items-center gap-2">
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
    <div class="px-4">
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
          MT账号
         </th>
         <th class="font-medium py-3 px-4 change-highlight">
          MT类型
         </th>
         <th class="font-medium py-3 px-4">
          交易手数
         </th>
         <th class="font-medium py-3 px-4">
          交易品种
         </th>
         <th class="font-medium py-3 px-4">
          开仓时间
         </th>
         <th class="font-medium py-3 px-4">
          开仓编号
         </th>
         <th class="font-medium py-3 px-4">
          持仓编号
         </th>
         <th class="font-medium py-3 px-4">
          平仓编号
         </th>
         <th class="font-medium py-3 px-4">
          订单编号
         </th>
         <th class="font-medium py-3 px-4">
          平台时间
         </th>
        </tr>
       </thead>
       <tbody class="text-gray-700">
        <tr class="border-b border-gray-100">
         <td class="py-3.5 px-4">
          test-a4
         </td>
         <td class="py-3.5 px-4">
          a6@qq.com
         </td>
         <td class="py-3.5 px-4">
          8100272
         </td>
         <td class="py-3.5 px-4">
          <span class="type-pill type-pill-cent">
           美分
          </span>
         </td>
         <td class="py-3.5 px-4">
          0.2
         </td>
         <td class="py-3.5 px-4">
          XAUUSD
         </td>
         <td class="py-3.5 px-4">
          2026-07-28 09:17:34
         </td>
         <td class="py-3.5 px-4">
          1065650
         </td>
         <td class="py-3.5 px-4">
          604056
         </td>
         <td class="py-3.5 px-4">
          1065651
         </td>
         <td class="py-3.5 px-4">
          604057
         </td>
         <td class="py-3.5 px-4">
          2026-07-28 09:18:46
         </td>
        </tr>
        <tr class="border-b border-gray-100">
         <td class="py-3.5 px-4">
          test-韩齐
         </td>
         <td class="py-3.5 px-4">
          15735948169@qq.com
         </td>
         <td class="py-3.5 px-4">
          8100527
         </td>
         <td class="py-3.5 px-4">
          <span class="type-pill type-pill-standard">
           标准
          </span>
         </td>
         <td class="py-3.5 px-4">
          0.12
         </td>
         <td class="py-3.5 px-4">
          XAUUSD
         </td>
         <td class="py-3.5 px-4">
          2026-07-13 06:42:01
         </td>
         <td class="py-3.5 px-4">
          1020745
         </td>
         <td class="py-3.5 px-4">
          573221
         </td>
         <td class="py-3.5 px-4">
          1020746
         </td>
         <td class="py-3.5 px-4">
          573222
         </td>
         <td class="py-3.5 px-4">
          2026-07-13 06:42:45
         </td>
        </tr>
        <tr class="border-b border-gray-100">
         <td class="py-3.5 px-4">
          test-张淑构
         </td>
         <td class="py-3.5 px-4">
          13654389992@qq.com
         </td>
         <td class="py-3.5 px-4">
          8100526
         </td>
         <td class="py-3.5 px-4">
          <span class="type-pill type-pill-cent">
           美分
          </span>
         </td>
         <td class="py-3.5 px-4">
          0.11
         </td>
         <td class="py-3.5 px-4">
          XAUUSD
         </td>
         <td class="py-3.5 px-4">
          2026-07-13 06:28:37
         </td>
         <td class="py-3.5 px-4">
          1020724
         </td>
         <td class="py-3.5 px-4">
          573205
         </td>
         <td class="py-3.5 px-4">
          1020725
         </td>
         <td class="py-3.5 px-4">
          573206
         </td>
         <td class="py-3.5 px-4">
          2026-07-13 06:29:04
         </td>
        </tr>
        <tr class="border-b border-gray-100">
         <td class="py-3.5 px-4">
          test-a4
         </td>
         <td class="py-3.5 px-4">
          a6@qq.com
         </td>
         <td class="py-3.5 px-4">
          8100272
         </td>
         <td class="py-3.5 px-4">
          <span class="type-pill type-pill-standard">
           标准
          </span>
         </td>
         <td class="py-3.5 px-4">
          0.11
         </td>
         <td class="py-3.5 px-4">
          XAUUSD
         </td>
         <td class="py-3.5 px-4">
          2026-06-17 06:15:58
         </td>
         <td class="py-3.5 px-4">
          951027
         </td>
         <td class="py-3.5 px-4">
          529886
         </td>
         <td class="py-3.5 px-4">
          951028
         </td>
         <td class="py-3.5 px-4">
          529887
         </td>
         <td class="py-3.5 px-4">
          2026-06-17 06:16:29
         </td>
        </tr>
        <tr>
         <td class="py-3.5 px-4">
          test-吴名码
         </td>
         <td class="py-3.5 px-4">
          15035649861@qq.com
         </td>
         <td class="py-3.5 px-4">
          8150127
         </td>
         <td class="py-3.5 px-4">
          <span class="type-pill type-pill-cent">
           美分
          </span>
         </td>
         <td class="py-3.5 px-4">
          0.04
         </td>
         <td class="py-3.5 px-4">
          AUDNZD
         </td>
         <td class="py-3.5 px-4">
          2026-04-23 09:16:03
         </td>
         <td class="py-3.5 px-4">
          677503
         </td>
         <td class="py-3.5 px-4">
          386938
         </td>
         <td class="py-3.5 px-4">
          677517
         </td>
         <td class="py-3.5 px-4">
          386939
         </td>
         <td class="py-3.5 px-4">
          2026-04-23 09:16:53
         </td>
        </tr>
       </tbody>
      </table>
     </div>
    </div>
   </div>
   <div class="growth-tab-panel hidden" id="growth-tab-invite">
    <div class="px-4 py-3 border-b border-gray-100">
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
      <div class="lg:col-span-4 flex items-center gap-2">
       <span class="text-gray-500 shrink-0">
        受邀人邮箱:
       </span>
       <input class="filter-input flex-1" placeholder="请输入受邀人邮箱" type="text"/>
      </div>
      <div class="lg:col-span-8 flex items-center gap-2">
       <button class="h-8 px-4 rounded-md bg-primary text-white text-xs hover:bg-primaryHover transition-colors">
        搜索
       </button>
       <button class="h-8 px-4 rounded-md border border-gray-200 bg-white text-gray-600 text-xs hover:bg-gray-50 transition-colors">
        重置
       </button>
      </div>
     </div>
    </div>
    <div class="px-4">
     <div class="overflow-x-auto">
      <table class="min-w-full text-sm">
       <thead>
        <tr class="text-left text-gray-500 border-b border-gray-100">
         <th class="font-medium py-3 px-4">
          邀请人姓名
         </th>
         <th class="font-medium py-3 px-4">
          邀请人邮箱
         </th>
         <th class="font-medium py-3 px-4">
          受邀人姓名
         </th>
         <th class="font-medium py-3 px-4">
          受邀人邮箱
         </th>
         <th class="font-medium py-3 px-4 change-highlight">
          受邀账户类型
         </th>
         <th class="font-medium py-3 px-4">
          受邀人状态
         </th>
         <th class="font-medium py-3 px-4 change-highlight">
          受邀人累计入金金额
         </th>
         <th class="font-medium py-3 px-4">
          受邀人当前等级
         </th>
         <th class="font-medium py-3 px-4">
          邀请时间
         </th>
        </tr>
       </thead>
       <tbody class="text-gray-700">
        <tr class="border-b border-gray-100">
         <td class="py-3.5 px-4">
          test-小测试
         </td>
         <td class="py-3.5 px-4">
          44444444@qq.com
         </td>
         <td class="py-3.5 px-4">
          test-孙春
         </td>
         <td class="py-3.5 px-4">
          13755079682@qq.com
         </td>
         <td class="py-3.5 px-4">
          <span class="type-pill type-pill-cent">
           美分
          </span>
         </td>
         <td class="py-3.5 px-4">
          正常
         </td>
         <td class="py-3.5 px-4">
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
         <td class="py-3.5 px-4">
          0级
         </td>
         <td class="py-3.5 px-4">
          2026-07-21 15:21:28
         </td>
        </tr>
        <tr class="border-b border-gray-100">
         <td class="py-3.5 px-4">
          test-测试-A
         </td>
         <td class="py-3.5 px-4">
          2428702751@qq.com
         </td>
         <td class="py-3.5 px-4">
          test-何工雄
         </td>
         <td class="py-3.5 px-4">
          15276724108@qq.com
         </td>
         <td class="py-3.5 px-4">
          <span class="type-pill type-pill-standard">
           标准
          </span>
         </td>
         <td class="py-3.5 px-4">
          正常
         </td>
         <td class="py-3.5 px-4">
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
         <td class="py-3.5 px-4">
          0级
         </td>
         <td class="py-3.5 px-4">
          2026-07-17 11:12:29
         </td>
        </tr>
        <tr class="border-b border-gray-100">
         <td class="py-3.5 px-4">
          test-小测试
         </td>
         <td class="py-3.5 px-4">
          44444444@qq.com
         </td>
         <td class="py-3.5 px-4">
          test-李份
         </td>
         <td class="py-3.5 px-4">
          13642016896@qq.com
         </td>
         <td class="py-3.5 px-4">
          <span class="type-pill type-pill-cent">
           美分
          </span>
         </td>
         <td class="py-3.5 px-4">
          正常
         </td>
         <td class="py-3.5 px-4">
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
         <td class="py-3.5 px-4">
          0级
         </td>
         <td class="py-3.5 px-4">
          2026-07-17 11:08:18
         </td>
        </tr>
        <tr class="border-b border-gray-100">
         <td class="py-3.5 px-4">
          test-小测试
         </td>
         <td class="py-3.5 px-4">
          44444444@qq.com
         </td>
         <td class="py-3.5 px-4">
          test-曹君龄
         </td>
         <td class="py-3.5 px-4">
          13993637663@qq.com
         </td>
         <td class="py-3.5 px-4">
          <span class="type-pill type-pill-standard">
           标准
          </span>
         </td>
         <td class="py-3.5 px-4">
          正常
         </td>
         <td class="py-3.5 px-4">
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
         <td class="py-3.5 px-4">
          0级
         </td>
         <td class="py-3.5 px-4">
          2026-07-17 11:06:07
         </td>
        </tr>
        <tr>
         <td class="py-3.5 px-4">
          test-小测试
         </td>
         <td class="py-3.5 px-4">
          44444444@qq.com
         </td>
         <td class="py-3.5 px-4">
          test-施辰
         </td>
         <td class="py-3.5 px-4">
          15206123997@165.com
         </td>
         <td class="py-3.5 px-4">
          <span class="type-pill type-pill-cent">
           美分
          </span>
         </td>
         <td class="py-3.5 px-4">
          正常
         </td>
         <td class="py-3.5 px-4">
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
         <td class="py-3.5 px-4">
          0级
         </td>
         <td class="py-3.5 px-4">
          2026-07-17 11:02:06
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
