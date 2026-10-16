<template>
  <div class="flex h-full bg-mainBg overflow-hidden">
    <div class="flex-1 flex flex-col min-w-0 bg-gray-50 overflow-hidden p-4 custom-scrollbar overflow-y-auto">
      <div class="flex-1 overflow-y-auto p-6 flex flex-col gap-6 min-h-0">
 <!-- 顶部工具栏：日期 + 手动重算 -->
 <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
  <div class="flex items-center justify-between flex-wrap gap-4">
   <div class="flex items-center gap-5 flex-wrap">
    <div class="flex items-center gap-3">
     <label class="text-[13px] text-gray-600 font-medium">
      对账日期:
     </label>
     <input class="custom-input w-[180px]" type="date" value="2026-08-11"/>
    </div>
   </div>
   <div class="flex items-center gap-3">
    <div class="flex items-center gap-2 text-xs text-gray-500">
     <span class="w-2 h-2 rounded-full bg-emerald-500 pulse-dot">
     </span>
     <span>
      统计时间: 2026-08-11 06:05:28
     </span>
    </div>
   </div>
  </div>
 </div>
 <!-- 两组对照 KPI（数量对不对 + 金额对不对，按 USD / USC 拆分） -->
 <div class="grid grid-cols-2 gap-6">
  <!-- KPI 1：返佣订单数对照（简洁版） -->
  <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-6 relative">
   <!-- 右上角：今日平仓订单总数（全局总锚点） -->
   <div class="absolute top-5 right-5 text-right">
    <div class="text-[11px] text-gray-400 mb-0.5">
     今日平仓订单总数
    </div>
    <div class="stat-num-lg text-gray-800">
     328
     <span class="text-sm font-semibold text-gray-500 ml-1">
      笔
     </span>
    </div>
   </div>
   <div class="flex items-center justify-between mb-6 pr-[180px]">
    <div class="flex items-center gap-2">
     <div class="w-9 h-9 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
      <i class="fas fa-receipt text-[15px]">
      </i>
     </div>
     <div>
      <h3 class="font-bold text-gray-800 text-[15px]">
       返佣订单数对照
      </h3>
     </div>
    </div>
   </div>
   <!-- 优化后的核心对照：卡片式双排版 -->
   <div class="flex items-center justify-between bg-gray-50 rounded-xl p-5 mb-5 relative border border-gray-100">
    <div class="flex-1 text-center">
     <div class="text-xs text-gray-500 mb-1">
      按返佣规则判定
     </div>
     <div class="text-2xl font-bold text-gray-800">
      186
      <span class="text-sm font-normal text-gray-500 ml-0.5">
       笔
      </span>
     </div>
    </div>
    <!-- 中间分隔线 -->
    <div class="w-px h-12 bg-gray-200">
    </div>
    <!-- 中间对比浮层 -->
    <div class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
     <div class="bg-white rounded-full shadow-sm px-3 py-1.5 border border-emerald-100 flex items-center gap-1.5 z-10">
      <i class="fa-solid fa-right-left text-emerald-500 text-xs">
      </i>
      <span class="text-[11px] font-bold text-emerald-600">
       数量一致
      </span>
     </div>
    </div>
    <div class="flex-1 text-center">
     <div class="text-xs text-gray-500 mb-1">
      系统已计算返佣
     </div>
     <div class="text-2xl font-bold text-gray-800">
      186
      <span class="text-sm font-normal text-gray-500 ml-0.5">
       笔
      </span>
     </div>
    </div>
   </div>
   <!-- 底部一行 pill 细分（次要信息） -->
   <div class="flex items-center gap-2 flex-wrap pt-4 border-t border-gray-50 text-[12px]">
    <span class="pill pill-blue">
     <i class="fas fa-dollar-sign mr-1" style="font-size:10px">
     </i>
     USD 158 笔
    </span>
    <span class="pill pill-orange">
     <i class="fas fa-coins mr-1" style="font-size:10px">
     </i>
     USC 28 笔
    </span>
    <div class="flex-1">
    </div>
    <span class="pill pill-green">
     <i class="fas fa-check mr-1" style="font-size:10px">
     </i>
     正常 179 笔
    </span>
    <span class="pill pill-red">
     <i class="fas fa-exclamation mr-1" style="font-size:10px">
     </i>
     异常 7 笔
    </span>
   </div>
  </div>
  <!-- KPI 2：返佣总金额对照（简洁版） -->
  <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
   <div class="flex items-center justify-between mb-6">
    <div class="flex items-center gap-2">
     <div class="w-9 h-9 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
      <i class="fas fa-coins text-[15px]">
      </i>
     </div>
     <div>
      <h3 class="font-bold text-gray-800 text-[15px]">
       返佣总金额对照
      </h3>
     </div>
    </div>
    <i class="not-equal fa-solid fa-triangle-exclamation" title="金额有差额">
    </i>
   </div>
   <!-- 优化后的核心对照：卡片式双排版 -->
   <div class="flex items-center justify-between bg-red-50/40 rounded-xl p-5 mb-5 relative border border-red-100">
    <div class="flex-1 text-center">
     <div class="text-xs text-gray-500 mb-1">
      应返佣（理论重算）
     </div>
     <div class="text-2xl font-bold text-gray-800">
      $42,876.30
     </div>
    </div>
    <!-- 中间分隔线 -->
    <div class="w-px h-12 bg-red-200">
    </div>
    <!-- 中间对比浮层 -->
    <div class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
     <div class="bg-white rounded-lg shadow-sm px-3 py-1.5 border border-red-200 flex flex-col items-center justify-center z-10 min-w-[80px]">
      <span class="text-[14px] font-bold text-red-600 leading-tight">
       +$62.60
      </span>
      <span class="text-[10px] text-red-500 leading-tight mt-0.5">
       金额有差额
      </span>
     </div>
    </div>
    <div class="flex-1 text-center">
     <div class="text-xs text-gray-500 mb-1">
      系统实返佣（佣金记录）
     </div>
     <div class="text-2xl font-bold text-gray-800">
      $42,938.90
     </div>
    </div>
   </div>
   <!-- 底部一行 pill 细分（已根据要求隐藏 USD 一致 绿 / USC 差额 红） -->
   <!--
                    <div class="flex items-center gap-2 flex-wrap pt-4 border-t border-gray-50 text-[12px]">
                        <span class="pill pill-blue border border-blue-100">USD  $41,617.60  <i class="fas fa-check text-emerald-500 ml-1.5" style="font-size:10px"></i>  一致</span>
                        <span class="pill pill-orange border border-orange-100">USC  $1,258.70  vs  $1,321.30  <span class="ml-1.5 text-red-600 font-semibold">+$62.60</span></span>
                    </div>
                    -->
  </div>
 </div>
 <!-- 核心对照表：对账明细（宽表横向滚动 nowrap） -->
 <div class="reconciliation-detail-table-card bg-white rounded-xl shadow-sm border border-gray-100 flex flex-col overflow-visible">
  <div class="flex items-center justify-between p-5 border-b border-gray-100">
   <div class="flex items-center gap-3">
    <h3 class="font-bold text-gray-800 text-[15px]">
     对账明细
    </h3>
    <span class="pill pill-gray">
     共 328 条，异常 7 条
    </span>
    <select class="custom-select w-[130px]">
     <option>
      账户类型（全部）
     </option>
     <option>
      标准账户
     </option>
     <option>
      美分账户
     </option>
    </select>
    <select class="custom-select w-[130px]">
     <option>
      对账结果（全部）
     </option>
     <option>
      异常
     </option>
     <option>
      正常
     </option>
    </select>
   </div>
   <div class="flex items-center gap-3">
    <button class="bg-white hover:bg-gray-50 text-gray-600 border border-gray-200 px-5 py-2 rounded text-[13px] transition-colors shadow-sm flex items-center gap-2">
     <i class="fas fa-download">
     </i>
     导出对账单
    </button>
    <div class="relative">
     <i class="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs">
     </i>
     <input class="custom-input pl-8 w-[280px]" placeholder="搜索平仓单号 / 客户 / MT账号" type="text"/>
    </div>
   </div>
  </div>
  <div class="reconciliation-detail-table-scroll overflow-x-auto no-scrollbar">
   <table class="commission-detail-table custom-table w-full min-w-[1500px]">
    <thead>
     <tr>
      <th>
       平仓单号
      </th>
      <th>
       账户类型
      </th>
      <th>
       客户姓名 / MT账号
      </th>
      <th>
       交易手数
      </th>
      <th>
       应/实返佣人数
      </th>
      <th>
       应/实返佣金额($)
      </th>
      <th>
       对账结果
      </th>
      <th>
       金额差额($)
      </th>
      <th>
       返佣条数差
      </th>
      <th>
       操作
      </th>
     </tr>
    </thead>
    <tbody>
     <tr class="diff-row">
      <td class="font-mono text-gray-700">
       #CL-50892
      </td>
      <td>
       <span class="pill pill-blue">
        标准账户
       </span>
      </td>
      <td>
       <div class="reconciliation-customer">
        <div class="font-medium leading-5">李强</div>
        <div class="text-xs leading-4 text-gray-400">MT: 10028571</div>
       </div>
      </td>
      <td>
       <span class="font-mono font-semibold text-red-600">
        0.50
       </span>
       <span class="text-red-600 font-semibold ml-1">
        标准手
       </span>
      </td>
      <td class="font-mono text-gray-700">
       2 人 /
       <span class="text-red-600 font-semibold">
        3 人
       </span>
      </td>
      <td class="font-mono text-right text-gray-800">
       $14.00 /
       <span class="text-red-600 font-semibold">
        $72.20
       </span>
      </td>
      <td>
       <span class="pill pill-red">
        异常
       </span>
      </td>
      <td class="font-semibold text-red-600">
       +$58.20
      </td>
      <td class="font-semibold text-red-600">
       +1 条
      </td>
      <td>
       <div class="flex items-center justify-center gap-1">
        <button class="text-blue-600 hover:text-blue-800 text-[12px] font-medium px-2 py-1 rounded hover:bg-blue-50 transition-colors text-blue-500 hover:text-blue-700">
         查看详情
        </button>
        <button class="text-red-600 hover:text-red-800 text-[12px] font-medium px-2 py-1 rounded hover:bg-red-50 transition-colors" type="button" @click="openExceptionDrawer('CL-50892')">
         异常处理
        </button>
       </div>
      </td>
     </tr>
     <tr class="diff-row">
      <td class="font-mono text-gray-700">
       #CL-50881
      </td>
      <td>
       <span class="pill pill-orange">
        美分账户
       </span>
      </td>
      <td>
       <div class="reconciliation-customer">
        <div class="font-medium leading-5">张敏</div>
        <div class="text-xs leading-4 text-gray-400">MT: USC20234</div>
       </div>
      </td>
      <td>
       <span class="font-mono font-semibold text-red-600">
        2.50
       </span>
       <span class="text-red-600 font-semibold ml-1">
        美分手
       </span>
      </td>
      <td class="font-mono text-gray-700">
       1 人 / 1 人
      </td>
      <td class="font-mono text-right text-gray-800">
       $0.0035 /
       <span class="text-red-600 font-semibold">
        $1.4035
       </span>
      </td>
      <td>
       <span class="pill pill-red">
        异常
       </span>
      </td>
      <td class="font-semibold text-red-600">
       +$1.40
      </td>
      <td>
       0 条
      </td>
      <td>
       <div class="flex items-center justify-center gap-1">
        <button class="text-blue-600 hover:text-blue-800 text-[12px] font-medium px-2 py-1 rounded hover:bg-blue-50 transition-colors text-blue-500 hover:text-blue-700">
         查看详情
        </button>
        <button class="text-red-600 hover:text-red-800 text-[12px] font-medium px-2 py-1 rounded hover:bg-red-50 transition-colors" type="button" @click="openExceptionDrawer('CL-50881')">
         异常处理
        </button>
       </div>
      </td>
     </tr>
     <tr class="diff-row">
      <td class="font-mono text-gray-700">
       #CL-50878
      </td>
      <td>
       <span class="pill pill-orange">
        美分账户
       </span>
      </td>
      <td>
       <div class="reconciliation-customer">
        <div class="font-medium leading-5">孙佳</div>
        <div class="text-xs leading-4 text-gray-400">MT: USC21088</div>
       </div>
      </td>
      <td>
       <span class="font-mono font-semibold text-red-600">
        12.50
       </span>
       <span class="text-red-600 font-semibold ml-1">
        美分手
       </span>
      </td>
      <td class="font-mono text-gray-700">
       2 人 / 2 人
      </td>
      <td class="font-mono text-right text-gray-800">
       $0.0280 /
       <span class="text-red-600 font-semibold">
        $59.8280
       </span>
      </td>
      <td>
       <span class="pill pill-red">
        异常
       </span>
      </td>
      <td class="font-semibold text-red-600">
       +$59.80
      </td>
      <td>
       0 条
      </td>
      <td>
       <div class="flex items-center justify-center gap-1">
        <button class="text-blue-600 hover:text-blue-800 text-[12px] font-medium px-2 py-1 rounded hover:bg-blue-50 transition-colors text-blue-500 hover:text-blue-700">
         查看详情
        </button>
        <button class="text-red-600 hover:text-red-800 text-[12px] font-medium px-2 py-1 rounded hover:bg-red-50 transition-colors" type="button" @click="openExceptionDrawer('CL-50878')">
         异常处理
        </button>
       </div>
      </td>
     </tr>
     <tr class="diff-row">
      <td class="font-mono text-gray-700">
       #CL-50870
      </td>
      <td>
       <span class="pill pill-blue">
        标准账户
       </span>
      </td>
      <td>
       <div class="reconciliation-customer">
        <div class="font-medium leading-5">王磊</div>
        <div class="text-xs leading-4 text-gray-400">MT: 10029310</div>
       </div>
      </td>
      <td>
       <span class="font-mono font-semibold text-red-600">
        0.20
       </span>
       <span class="text-red-600 font-semibold ml-1">
        标准手
       </span>
      </td>
      <td class="font-mono text-gray-700">
       3 人 / 3 人
      </td>
      <td class="font-mono text-right text-gray-800">
       $2.40 /
       <span class="text-red-600 font-semibold">
        $2.70
       </span>
      </td>
      <td>
       <span class="pill pill-red">
        异常
       </span>
      </td>
      <td class="font-semibold text-red-600">
       +$0.30
      </td>
      <td>
       0 条
      </td>
      <td>
       <div class="flex items-center justify-center gap-1">
        <button class="text-blue-600 hover:text-blue-800 text-[12px] font-medium px-2 py-1 rounded hover:bg-blue-50 transition-colors text-blue-500 hover:text-blue-700">
         查看详情
        </button>
        <button class="text-red-600 hover:text-red-800 text-[12px] font-medium px-2 py-1 rounded hover:bg-red-50 transition-colors" type="button" @click="openExceptionDrawer('CL-50870')">
         异常处理
        </button>
       </div>
      </td>
     </tr>
     <tr class="diff-row">
      <td class="font-mono text-gray-700">
       #CL-50855
      </td>
      <td>
       <span class="pill pill-blue">
        标准账户
       </span>
      </td>
      <td>
       <div class="reconciliation-customer">
        <div class="font-medium leading-5">陈宇</div>
        <div class="text-xs leading-4 text-gray-400">MT: 10024718</div>
       </div>
      </td>
      <td>
       <span class="font-mono font-semibold text-red-600">
        1.00
       </span>
       <span class="text-red-600 font-semibold ml-1">
        标准手
       </span>
      </td>
      <td class="font-mono text-gray-700">
       3 人 /
       <span class="text-red-600 font-semibold">
        2 人
       </span>
      </td>
      <td class="font-mono text-right text-gray-800">
       $15.00 /
       <span class="text-red-600 font-semibold">
        $10.00
       </span>
      </td>
      <td>
       <span class="pill pill-red">
        异常
       </span>
      </td>
      <td class="font-semibold text-red-600">
       -$5.00
      </td>
      <td class="font-semibold text-red-600">
       -1 条
      </td>
      <td>
       <div class="flex items-center justify-center gap-1">
        <button class="text-blue-600 hover:text-blue-800 text-[12px] font-medium px-2 py-1 rounded hover:bg-blue-50 transition-colors text-blue-500 hover:text-blue-700">
         查看详情
        </button>
        <button class="text-red-600 hover:text-red-800 text-[12px] font-medium px-2 py-1 rounded hover:bg-red-50 transition-colors" type="button" @click="openExceptionDrawer('CL-50855')">
         异常处理
        </button>
       </div>
      </td>
     </tr>
     <tr class="diff-row">
      <td class="font-mono text-gray-700">
       #CL-50847
      </td>
      <td>
       <span class="pill pill-blue">
        标准账户
       </span>
      </td>
      <td>
       <div class="reconciliation-customer">
        <div class="font-medium leading-5">何思雨</div>
        <div class="text-xs leading-4 text-gray-400">MT: 10023391</div>
       </div>
      </td>
      <td>
       <span class="font-mono font-semibold text-red-600">
        0.30
       </span>
       <span class="text-red-600 font-semibold ml-1">
        标准手
       </span>
      </td>
      <td class="font-mono text-gray-700">
       2 人 / 2 人
      </td>
      <td class="font-mono text-right text-gray-800">
       $1.80 /
       <span class="text-red-600 font-semibold">
        $2.30
       </span>
      </td>
      <td>
       <span class="pill pill-red">
        异常
       </span>
      </td>
      <td class="font-semibold text-red-600">
       +$0.50
      </td>
      <td>
       0 条
      </td>
      <td>
       <div class="flex items-center justify-center gap-1">
        <button class="text-blue-600 hover:text-blue-800 text-[12px] font-medium px-2 py-1 rounded hover:bg-blue-50 transition-colors text-blue-500 hover:text-blue-700">
         查看详情
        </button>
        <button class="text-red-600 hover:text-red-800 text-[12px] font-medium px-2 py-1 rounded hover:bg-red-50 transition-colors" type="button" @click="openExceptionDrawer('CL-50847')">
         异常处理
        </button>
       </div>
      </td>
     </tr>
     <tr class="diff-row">
      <td class="font-mono text-gray-700">
       #CL-50812
      </td>
      <td>
       <span class="pill pill-blue">
        标准账户
       </span>
      </td>
      <td>
       <div class="reconciliation-customer">
        <div class="font-medium leading-5">郑凯</div>
        <div class="text-xs leading-4 text-gray-400">MT: 10030578</div>
       </div>
      </td>
      <td>
       <span class="font-mono font-semibold text-red-600">
        0.70
       </span>
       <span class="text-red-600 font-semibold ml-1">
        标准手
       </span>
      </td>
      <td class="font-mono text-gray-700">
       3 人 /
       <span class="text-red-600 font-semibold">
        5 人
       </span>
      </td>
      <td class="font-mono text-right text-gray-800">
       $10.50 /
       <span class="text-red-600 font-semibold">
        $45.50
       </span>
      </td>
      <td>
       <span class="pill pill-red">
        异常
       </span>
      </td>
      <td class="font-semibold text-red-600">
       +$35.00
      </td>
      <td class="font-semibold text-red-600">
       +2 条
      </td>
      <td>
       <div class="flex items-center justify-center gap-1">
        <button class="text-blue-600 hover:text-blue-800 text-[12px] font-medium px-2 py-1 rounded hover:bg-blue-50 transition-colors text-blue-500 hover:text-blue-700">
         查看详情
        </button>
        <button class="text-red-600 hover:text-red-800 text-[12px] font-medium px-2 py-1 rounded hover:bg-red-50 transition-colors" type="button" @click="openExceptionDrawer('CL-50812')">
         异常处理
        </button>
       </div>
      </td>
     </tr>
     <tr class="diff-row">
      <td class="font-mono text-gray-700">
       #CL-50808
      </td>
      <td>
       <span class="pill pill-blue">
        标准账户
       </span>
      </td>
      <td>
       <div class="reconciliation-customer">
        <div class="font-medium leading-5">冯杰</div>
        <div class="text-xs leading-4 text-gray-400">MT: 10028910</div>
       </div>
      </td>
      <td>
       <span class="font-mono font-semibold text-red-600">
        0.10
       </span>
       <span class="text-red-600 font-semibold ml-1">
        标准手
       </span>
      </td>
      <td class="font-mono text-gray-700">
       2 人 / 2 人
      </td>
      <td class="font-mono text-right text-gray-800">
       $3.00 /
       <span class="text-red-600 font-semibold">
        $3.50
       </span>
      </td>
      <td>
       <span class="pill pill-red">
        异常
       </span>
      </td>
      <td class="font-semibold text-red-600">
       +$0.50
      </td>
      <td>
       0 条
      </td>
      <td>
       <div class="flex items-center justify-center gap-1">
        <button class="text-blue-600 hover:text-blue-800 text-[12px] font-medium px-2 py-1 rounded hover:bg-blue-50 transition-colors text-blue-500 hover:text-blue-700">
         查看详情
        </button>
        <button class="text-red-600 hover:text-red-800 text-[12px] font-medium px-2 py-1 rounded hover:bg-red-50 transition-colors" type="button" @click="openExceptionDrawer('CL-50808')">
         异常处理
        </button>
       </div>
      </td>
     </tr>
     <tr class="diff-row">
      <td class="font-mono text-gray-700">
       #CL-50804
      </td>
      <td>
       <span class="pill pill-blue">
        标准账户
       </span>
      </td>
      <td>
       <div class="reconciliation-customer">
        <div class="font-medium leading-5">褚敏</div>
        <div class="text-xs leading-4 text-gray-400">MT: 10022884</div>
       </div>
      </td>
      <td>
       <span class="font-mono font-semibold text-red-600">
        1.50
       </span>
       <span class="text-red-600 font-semibold ml-1">
        标准手
       </span>
      </td>
      <td class="font-mono text-gray-700">
       4 人 /
       <span class="text-red-600 font-semibold">
        3 人
       </span>
      </td>
      <td class="font-mono text-right text-gray-800">
       $60.00 /
       <span class="text-red-600 font-semibold">
        $30.00
       </span>
      </td>
      <td>
       <span class="pill pill-red">
        异常
       </span>
      </td>
      <td class="font-semibold text-red-600">
       -$30.00
      </td>
      <td class="font-semibold text-red-600">
       -1 条
      </td>
      <td>
       <div class="flex items-center justify-center gap-1">
        <button class="text-blue-600 hover:text-blue-800 text-[12px] font-medium px-2 py-1 rounded hover:bg-blue-50 transition-colors text-blue-500 hover:text-blue-700">
         查看详情
        </button>
        <button class="text-red-600 hover:text-red-800 text-[12px] font-medium px-2 py-1 rounded hover:bg-red-50 transition-colors" type="button" @click="openExceptionDrawer('CL-50804')">
         异常处理
        </button>
       </div>
      </td>
     </tr>
     <tr class="diff-row">
      <td class="font-mono text-gray-700">
       #CL-50796
      </td>
      <td>
       <span class="pill pill-blue">
        标准账户
       </span>
      </td>
      <td>
       <div class="reconciliation-customer">
        <div class="font-medium leading-5">蒋晨</div>
        <div class="text-xs leading-4 text-gray-400">MT: 10025040</div>
       </div>
      </td>
      <td>
       <span class="font-mono font-semibold text-red-600">
        0.60
       </span>
       <span class="text-red-600 font-semibold ml-1">
        标准手
       </span>
      </td>
      <td class="font-mono text-gray-700">
       3 人 /
       <span class="text-red-600 font-semibold">
        7 人
       </span>
      </td>
      <td class="font-mono text-right text-gray-800">
       $7.20 /
       <span class="text-red-600 font-semibold">
        $36.00
       </span>
      </td>
      <td>
       <span class="pill pill-red">
        异常
       </span>
      </td>
      <td class="font-semibold text-red-600">
       +$28.80
      </td>
      <td class="font-semibold text-red-600">
       +4 条
      </td>
      <td>
       <div class="flex items-center justify-center gap-1">
        <button class="text-blue-600 hover:text-blue-800 text-[12px] font-medium px-2 py-1 rounded hover:bg-blue-50 transition-colors text-blue-500 hover:text-blue-700">
         查看详情
        </button>
        <button class="text-red-600 hover:text-red-800 text-[12px] font-medium px-2 py-1 rounded hover:bg-red-50 transition-colors" type="button" @click="openExceptionDrawer('CL-50796')">
         异常处理
        </button>
       </div>
      </td>
     </tr>
     <tr>
      <td class="font-mono text-gray-700">
       #CL-50891
      </td>
      <td>
       <span class="pill pill-blue">
        标准账户
       </span>
      </td>
      <td>
       <div class="reconciliation-customer">
        <div class="font-medium leading-5">赵磊</div>
        <div class="text-xs leading-4 text-gray-400">MT: 10027483</div>
       </div>
      </td>
      <td>
       <span class="font-mono font-semibold text-red-600">
        1.00
       </span>
       <span class="text-red-600 font-semibold ml-1">
        标准手
       </span>
      </td>
      <td class="font-mono text-gray-700">
       3 人 / 3 人
      </td>
      <td class="font-mono text-right text-gray-800">
       $24.00 / $24.00
      </td>
      <td>
       <span class="pill pill-green">
        正常
       </span>
      </td>
      <td class="text-emerald-600 font-semibold">
       $0.00
      </td>
      <td>
       0 条
      </td>
      <td>
       <button class="text-blue-600 hover:text-blue-800 text-[12px] font-medium px-2 py-1 rounded hover:bg-blue-50 transition-colors text-blue-500 hover:text-blue-700">
        查看详情
       </button>
      </td>
     </tr>
     <tr>
      <td class="font-mono text-gray-700">
       #CL-50885
      </td>
      <td>
       <span class="pill pill-orange">
        美分账户
       </span>
      </td>
      <td>
       <div class="reconciliation-customer">
        <div class="font-medium leading-5">林小</div>
        <div class="text-xs leading-4 text-gray-400">MT: USC21530</div>
       </div>
      </td>
      <td>
       <span class="font-mono font-semibold text-red-600">
        5.00
       </span>
       <span class="text-red-600 font-semibold ml-1">
        美分手
       </span>
      </td>
      <td class="font-mono text-gray-700">
       2 人 / 2 人
      </td>
      <td class="font-mono text-right text-gray-800">
       $0.0070 / $0.0070
      </td>
      <td>
       <span class="pill pill-green">
        正常
       </span>
      </td>
      <td class="text-emerald-600 font-semibold">
       $0.00
      </td>
      <td>
       0 条
      </td>
      <td>
       <button class="text-blue-600 hover:text-blue-800 text-[12px] font-medium px-2 py-1 rounded hover:bg-blue-50 transition-colors text-blue-500 hover:text-blue-700">
        查看详情
       </button>
      </td>
     </tr>
     <tr>
      <td class="font-mono text-gray-500">
       #CL-50890
      </td>
      <td>
       <span class="pill pill-blue">
        标准账户
       </span>
      </td>
      <td>
       <div class="reconciliation-customer">
        <div class="font-medium leading-5 text-gray-600">吴丹</div>
        <div class="text-xs leading-4 text-gray-400">MT: 10031205</div>
       </div>
      </td>
      <td>
       <span class="font-mono font-semibold text-red-600">
        0.10
       </span>
       <span class="text-red-600 font-semibold ml-1">
        标准手
       </span>
      </td>
      <td class="font-mono text-gray-700">
       2 人 / 2 人
      </td>
      <td class="font-mono text-right text-gray-800">
       $0.80 / $0.80
      </td>
      <td>
       <span class="pill pill-green">
        正常
       </span>
      </td>
      <td class="text-emerald-600 font-semibold">
       $0.00
      </td>
      <td>
       0 条
      </td>
      <td>
       <span class="text-gray-300 text-[12px]">
        —
       </span>
      </td>
     </tr>
     <tr>
      <td class="font-mono text-gray-700">
       #CL-50840
      </td>
      <td>
       <span class="pill pill-blue">
        标准账户
       </span>
      </td>
      <td>
       <div class="reconciliation-customer">
        <div class="font-medium leading-5">刘洋</div>
        <div class="text-xs leading-4 text-gray-400">MT: 10026187</div>
       </div>
      </td>
      <td>
       <span class="font-mono font-semibold text-red-600">
        0.80
       </span>
       <span class="text-red-600 font-semibold ml-1">
        标准手
       </span>
      </td>
      <td class="font-mono text-gray-700">
       2 人 / 2 人
      </td>
      <td class="font-mono text-right text-gray-800">
       $14.40 / $14.40
      </td>
      <td>
       <span class="pill pill-green">
        正常
       </span>
      </td>
      <td class="text-emerald-600 font-semibold">
       $0.00
      </td>
      <td>
       0 条
      </td>
      <td>
       <button class="text-blue-600 hover:text-blue-800 text-[12px] font-medium px-2 py-1 rounded hover:bg-blue-50 transition-colors text-blue-500 hover:text-blue-700">
        查看详情
       </button>
      </td>
     </tr>
     <tr>
      <td class="font-mono text-gray-700">
       #CL-50836
      </td>
      <td>
       <span class="pill pill-blue">
        标准账户
       </span>
      </td>
      <td>
       <div class="reconciliation-customer">
        <div class="font-medium leading-5">张伟</div>
        <div class="text-xs leading-4 text-gray-400">MT: 10019088</div>
       </div>
      </td>
      <td>
       <span class="font-mono font-semibold text-red-600">
        2.50
       </span>
       <span class="text-red-600 font-semibold ml-1">
        标准手
       </span>
      </td>
      <td class="font-mono text-gray-700">
       3 人 / 3 人
      </td>
      <td class="font-mono text-right text-gray-800">
       $75.00 / $75.00
      </td>
      <td>
       <span class="pill pill-green">
        正常
       </span>
      </td>
      <td class="text-emerald-600 font-semibold">
       $0.00
      </td>
      <td>
       0 条
      </td>
      <td>
       <button class="text-blue-600 hover:text-blue-800 text-[12px] font-medium px-2 py-1 rounded hover:bg-blue-50 transition-colors text-blue-500 hover:text-blue-700">
        查看详情
       </button>
      </td>
     </tr>
     <tr>
      <td class="font-mono text-gray-700">
       #CL-50831
      </td>
      <td>
       <span class="pill pill-blue">
        标准账户
       </span>
      </td>
      <td>
       <div class="reconciliation-customer">
        <div class="font-medium leading-5">黄涛</div>
        <div class="text-xs leading-4 text-gray-400">MT: 10030122</div>
       </div>
      </td>
      <td>
       <span class="font-mono font-semibold text-red-600">
        1.20
       </span>
       <span class="text-red-600 font-semibold ml-1">
        标准手
       </span>
      </td>
      <td class="font-mono text-gray-700">
       4 人 / 4 人
      </td>
      <td class="font-mono text-right text-gray-800">
       $43.20 / $43.20
      </td>
      <td>
       <span class="pill pill-green">
        正常
       </span>
      </td>
      <td class="text-emerald-600 font-semibold">
       $0.00
      </td>
      <td>
       0 条
      </td>
      <td>
       <button class="text-blue-600 hover:text-blue-800 text-[12px] font-medium px-2 py-1 rounded hover:bg-blue-50 transition-colors text-blue-500 hover:text-blue-700">
        查看详情
       </button>
      </td>
     </tr>
     <tr>
      <td class="font-mono text-gray-700">
       #CL-50828
      </td>
      <td>
       <span class="pill pill-blue">
        标准账户
       </span>
      </td>
      <td>
       <div class="reconciliation-customer">
        <div class="font-medium leading-5">吴佳</div>
        <div class="text-xs leading-4 text-gray-400">MT: 10027136</div>
       </div>
      </td>
      <td>
       <span class="font-mono font-semibold text-red-600">
        0.60
       </span>
       <span class="text-red-600 font-semibold ml-1">
        标准手
       </span>
      </td>
      <td class="font-mono text-gray-700">
       3 人 / 3 人
      </td>
      <td class="font-mono text-right text-gray-800">
       $14.40 / $14.40
      </td>
      <td>
       <span class="pill pill-green">
        正常
       </span>
      </td>
      <td class="text-emerald-600 font-semibold">
       $0.00
      </td>
      <td>
       0 条
      </td>
      <td>
       <button class="text-blue-600 hover:text-blue-800 text-[12px] font-medium px-2 py-1 rounded hover:bg-blue-50 transition-colors text-blue-500 hover:text-blue-700">
        查看详情
       </button>
      </td>
     </tr>
     <tr>
      <td class="font-mono text-gray-700">
       #CL-50825
      </td>
      <td>
       <span class="pill pill-orange">
        美分账户
       </span>
      </td>
      <td>
       <div class="reconciliation-customer">
        <div class="font-medium leading-5">周明</div>
        <div class="text-xs leading-4 text-gray-400">MT: USC20881</div>
       </div>
      </td>
      <td>
       <span class="font-mono font-semibold text-red-600">
        8.00
       </span>
       <span class="text-red-600 font-semibold ml-1">
        美分手
       </span>
      </td>
      <td class="font-mono text-gray-700">
       2 人 / 2 人
      </td>
      <td class="font-mono text-right text-gray-800">
       $0.0112 / $0.0112
      </td>
      <td>
       <span class="pill pill-green">
        正常
       </span>
      </td>
      <td class="text-emerald-600 font-semibold">
       $0.00
      </td>
      <td>
       0 条
      </td>
      <td>
       <button class="text-blue-600 hover:text-blue-800 text-[12px] font-medium px-2 py-1 rounded hover:bg-blue-50 transition-colors text-blue-500 hover:text-blue-700">
        查看详情
       </button>
      </td>
     </tr>
     <tr>
      <td class="font-mono text-gray-700">
       #CL-50819
      </td>
      <td>
       <span class="pill pill-orange">
        美分账户
       </span>
      </td>
      <td>
       <div class="reconciliation-customer">
        <div class="font-medium leading-5">徐磊</div>
        <div class="text-xs leading-4 text-gray-400">MT: USC21977</div>
       </div>
      </td>
      <td>
       <span class="font-mono font-semibold text-red-600">
        20.00
       </span>
       <span class="text-red-600 font-semibold ml-1">
        美分手
       </span>
      </td>
      <td class="font-mono text-gray-700">
       3 人 / 3 人
      </td>
      <td class="font-mono text-right text-gray-800">
       $0.0280 / $0.0280
      </td>
      <td>
       <span class="pill pill-green">
        正常
       </span>
      </td>
      <td class="text-emerald-600 font-semibold">
       $0.00
      </td>
      <td>
       0 条
      </td>
      <td>
       <button class="text-blue-600 hover:text-blue-800 text-[12px] font-medium px-2 py-1 rounded hover:bg-blue-50 transition-colors text-blue-500 hover:text-blue-700">
        查看详情
       </button>
      </td>
     </tr>
     <tr>
      <td class="font-mono text-gray-700">
       #CL-50816
      </td>
      <td>
       <span class="pill pill-blue">
        标准账户
       </span>
      </td>
      <td>
       <div class="reconciliation-customer">
        <div class="font-medium leading-5">孙浩</div>
        <div class="text-xs leading-4 text-gray-400">MT: 10024558</div>
       </div>
      </td>
      <td>
       <span class="font-mono font-semibold text-red-600">
        0.40
       </span>
       <span class="text-red-600 font-semibold ml-1">
        标准手
       </span>
      </td>
      <td class="font-mono text-gray-700">
       2 人 / 2 人
      </td>
      <td class="font-mono text-right text-gray-800">
       $9.60 / $9.60
      </td>
      <td>
       <span class="pill pill-green">
        正常
       </span>
      </td>
      <td class="text-emerald-600 font-semibold">
       $0.00
      </td>
      <td>
       0 条
      </td>
      <td>
       <button class="text-blue-600 hover:text-blue-800 text-[12px] font-medium px-2 py-1 rounded hover:bg-blue-50 transition-colors text-blue-500 hover:text-blue-700">
        查看详情
       </button>
      </td>
     </tr>
     <tr>
      <td class="font-mono text-gray-500">
       #CL-50801
      </td>
      <td>
       <span class="pill pill-blue">
        标准账户
       </span>
      </td>
      <td>
       <div class="reconciliation-customer">
        <div class="font-medium leading-5 text-gray-600">韩冰</div>
        <div class="text-xs leading-4 text-gray-400">MT: 10032016</div>
       </div>
      </td>
      <td>
       <span class="font-mono font-semibold text-red-600">
        0.01
       </span>
       <span class="text-red-600 font-semibold ml-1">
        标准手
       </span>
      </td>
      <td class="font-mono text-gray-700">
       0 人 / 0 人
      </td>
      <td class="font-mono text-right text-gray-800">
       $0.00 / $0.00
      </td>
      <td>
       <span class="pill pill-green">
        正常
       </span>
      </td>
      <td class="text-emerald-600 font-semibold">
       $0.00
      </td>
      <td>
       0 条
      </td>
      <td>
       <span class="text-gray-300 text-[12px]">
        —
       </span>
      </td>
     </tr>
     <tr>
      <td class="font-mono text-gray-700">
       #CL-50798
      </td>
      <td>
       <span class="pill pill-blue">
        标准账户
       </span>
      </td>
      <td>
       <div class="reconciliation-customer">
        <div class="font-medium leading-5">董雪</div>
        <div class="text-xs leading-4 text-gray-400">MT: 10021166</div>
       </div>
      </td>
      <td>
       <span class="font-mono font-semibold text-red-600">
        3.00
       </span>
       <span class="text-red-600 font-semibold ml-1">
        标准手
       </span>
      </td>
      <td class="font-mono text-gray-700">
       3 人 / 3 人
      </td>
      <td class="font-mono text-right text-gray-800">
       $108.00 / $108.00
      </td>
      <td>
       <span class="pill pill-green">
        正常
       </span>
      </td>
      <td class="text-emerald-600 font-semibold">
       $0.00
      </td>
      <td>
       0 条
      </td>
      <td>
       <button class="text-blue-600 hover:text-blue-800 text-[12px] font-medium px-2 py-1 rounded hover:bg-blue-50 transition-colors text-blue-500 hover:text-blue-700">
        查看详情
       </button>
      </td>
     </tr>
    </tbody>
   </table>
  </div>
  <div class="reconciliation-detail-pagination flex items-center justify-between p-4 border-t border-gray-100 text-xs text-gray-500">
   <div>
    共 328 条记录，当前显示前 20 条（异常已置顶）
   </div>
   <div class="flex items-center gap-2">
    <button class="w-8 h-8 rounded border border-gray-200 hover:bg-gray-50 text-gray-500">
     <i class="fas fa-chevron-left text-[10px]">
     </i>
    </button>
    <button class="w-8 h-8 rounded bg-blue-600 text-white font-semibold">
     1
    </button>
    <button class="w-8 h-8 rounded border border-gray-200 hover:bg-gray-50 text-gray-600">
     2
    </button>
    <button class="w-8 h-8 rounded border border-gray-200 hover:bg-gray-50 text-gray-600">
     3
    </button>
    <button class="w-8 h-8 rounded border border-gray-200 hover:bg-gray-50 text-gray-600">
     41
    </button>
    <button class="w-8 h-8 rounded border border-gray-200 hover:bg-gray-50 text-gray-500">
     <i class="fas fa-chevron-right text-[10px]">
     </i>
    </button>
    <select class="custom-select w-[100px] ml-3">
     <option>
      20 条/页
     </option>
     <option>
      50 条/页
     </option>
     <option>
      100 条/页
     </option>
    </select>
   </div>
  </div>
 </div>
</div>

    <el-drawer v-model="exceptionDrawerOpen" :with-header="false" size="640px">
      <div class="flex h-full min-h-0 flex-col">
        <div class="flex shrink-0 items-start justify-between border-b border-gray-200/80 pb-5">
          <div class="flex items-start gap-3">
            <div class="mt-0.5 flex h-9 w-9 items-center justify-center rounded-lg bg-red-50 text-red-600">
              <i class="fas fa-triangle-exclamation text-sm"></i>
            </div>
            <div>
              <div class="text-base font-bold leading-5 text-gray-800">异常处理</div>
              <div class="mt-1.5 text-xs leading-4 text-gray-400">记录当前异常对账明细的处理信息</div>
            </div>
          </div>
          <button class="flex h-8 w-8 items-center justify-center rounded-md text-gray-400 transition-colors hover:bg-gray-50 hover:text-gray-600" type="button" @click="exceptionDrawerOpen = false">
            <i class="fas fa-times text-sm"></i>
          </button>
        </div>

        <div v-if="selectedException" class="min-h-0 flex-1 overflow-y-auto py-5 pr-1">
          <section class="mb-5 rounded-xl bg-gray-50/80 px-4 py-3.5">
            <div class="mb-3 flex items-center justify-between">
              <div class="text-sm font-semibold text-gray-800">异常记录基础信息</div>
              <span class="pill pill-red">{{ selectedException.closeOrderNo }}</span>
            </div>
            <div class="grid grid-cols-2 gap-x-8 gap-y-3">
              <div class="min-w-0"><div class="text-[11px] leading-4 text-gray-400">对账日期</div><div class="mt-0.5 truncate text-[13px] font-medium text-gray-700">{{ selectedException.reconciliationDate }}</div></div>
              <div class="min-w-0"><div class="text-[11px] leading-4 text-gray-400">平仓单号</div><div class="mt-0.5 truncate text-[13px] font-medium text-gray-700">{{ selectedException.closeOrderNo }}</div></div>
              <div class="min-w-0"><div class="text-[11px] leading-4 text-gray-400">账户类型</div><div class="mt-0.5 truncate text-[13px] font-medium text-gray-700">{{ selectedException.accountType }}</div></div>
              <div class="min-w-0"><div class="text-[11px] leading-4 text-gray-400">客户姓名</div><div class="mt-0.5 truncate text-[13px] font-medium text-gray-700">{{ selectedException.customerName }}</div></div>
              <div class="min-w-0"><div class="text-[11px] leading-4 text-gray-400">MT账号</div><div class="mt-0.5 truncate text-[13px] font-medium text-gray-700">{{ selectedException.mtAccount }}</div></div>
              <div class="min-w-0"><div class="text-[11px] leading-4 text-gray-400">交易手数</div><div class="mt-0.5 truncate text-[13px] font-medium text-gray-700">{{ selectedException.lots }}</div></div>
              <div class="min-w-0"><div class="text-[11px] leading-4 text-gray-400">应返佣人数</div><div class="mt-0.5 truncate text-[13px] font-medium text-gray-700">{{ selectedException.expectedPeople }}</div></div>
              <div class="min-w-0"><div class="text-[11px] leading-4 text-gray-400">实返佣人数</div><div class="mt-0.5 truncate text-[13px] font-medium text-gray-700">{{ selectedException.actualPeople }}</div></div>
              <div class="min-w-0"><div class="text-[11px] leading-4 text-gray-400">应返佣金额</div><div class="mt-0.5 truncate text-[13px] font-medium text-gray-700">{{ selectedException.expectedAmount }}</div></div>
              <div class="min-w-0"><div class="text-[11px] leading-4 text-gray-400">实际返佣金额</div><div class="mt-0.5 truncate text-[13px] font-medium text-gray-700">{{ selectedException.actualAmount }}</div></div>
              <div class="min-w-0"><div class="text-[11px] leading-4 text-gray-400">金额差额</div><div class="mt-0.5 truncate text-[13px] font-semibold text-red-600">{{ selectedException.amountDifference }}</div></div>
              <div class="min-w-0"><div class="text-[11px] leading-4 text-gray-400">返佣条数差</div><div class="mt-0.5 truncate text-[13px] font-semibold text-red-600">{{ selectedException.rebateDifference }}</div></div>
            </div>
          </section>

          <section class="exception-processing-card mb-5 rounded-xl bg-gray-50/80 px-4 py-4">
            <div class="mb-4 flex items-center justify-between">
              <div class="text-sm font-semibold text-gray-800">异常处理信息</div>
            </div>
            <div class="space-y-5">
              <div>
                <label class="mb-2 block text-[13px] font-medium text-gray-600"><span class="text-red-500">*</span> 异常原因</label>
                <select v-model="exceptionForm.reason" :class="['custom-select', 'exception-form-select', 'w-full', !exceptionForm.reason ? 'text-gray-400' : 'text-gray-700']">
                  <option value="">请选择异常原因</option>
                  <option v-for="item in exceptionReasons" :key="item" :value="item">{{ item }}</option>
                </select>
              </div>
              <div>
                <label class="mb-2 block text-[13px] font-medium text-gray-600"><span class="text-red-500">*</span> 处理方式</label>
                <select v-model="exceptionForm.method" :class="['custom-select', 'exception-form-select', 'w-full', !exceptionForm.method ? 'text-gray-400' : 'text-gray-700']">
                  <option value="">请选择处理方式</option>
                  <option v-for="item in handlingMethods" :key="item" :value="item">{{ item }}</option>
                </select>
              </div>
              <div>
                <label class="mb-2 block text-[13px] font-medium text-gray-600"><span class="text-red-500">*</span> 处理说明</label>
                <textarea v-model="exceptionForm.note" class="custom-input exception-form-textarea h-28 min-h-[112px] w-full resize-y rounded-md" placeholder="请说明异常原因、实际处理过程和最终处理结果"></textarea>
              </div>
            </div>
          </section>

          <section v-if="exceptionForm.status === '已处理' || exceptionForm.processor || exceptionForm.processedAt" class="rounded-xl bg-gray-50/80 px-4 py-3.5">
            <div class="mb-3 flex items-center gap-2">
              <i class="fas fa-clock-rotate-left text-xs text-gray-400"></i>
              <div class="text-sm font-semibold text-gray-800">处理信息</div>
            </div>
            <div class="grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4">
              <div>
                <div class="text-[11px] leading-4 text-gray-400">处理状态</div>
                <div class="mt-1.5"><span :class="exceptionForm.status === '已处理' ? 'pill pill-green' : 'pill pill-orange'">{{ exceptionForm.status }}</span></div>
              </div>
              <div>
                <div class="text-[11px] leading-4 text-gray-400">处理人</div>
                <div class="mt-1 text-[13px] font-medium leading-5 text-gray-700">{{ exceptionForm.processor || '保存后自动记录' }}</div>
              </div>
              <div>
                <div class="text-[11px] leading-4 text-gray-400">处理时间</div>
                <div class="mt-1 text-[13px] font-medium leading-5 text-gray-700">{{ exceptionForm.processedAt || '保存后自动记录' }}</div>
              </div>
            </div>
          </section>
        </div>

        <div class="flex shrink-0 items-center justify-end gap-3 border-t border-gray-200/80 bg-white pt-4">
          <button class="h-9 rounded-md border border-gray-200 bg-white px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-50" type="button" @click="exceptionDrawerOpen = false">取消</button>
          <button class="h-9 rounded-md bg-[#C19B5E] px-4 text-sm font-medium text-white transition-colors hover:bg-[#B28B52]" type="button" @click="saveExceptionRecord">确认处理</button>
        </div>
      </div>
    </el-drawer>

    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { ElMessage } from 'element-plus'

const exceptionDrawerOpen = ref(false)
const selectedException = ref(null)
const exceptionRecords = reactive({
  'CL-50881': {
    reason: '返佣金额不一致',
    method: '重新同步',
    note: '确认该美分账户的返佣金额与系统同步结果不一致，已重新同步返佣数据，最终金额已恢复一致。',
    status: '已处理',
    processor: '审核员-王浩',
    processedAt: '2026-08-11 09:20:18'
  }
})
const exceptionForm = reactive({
  reason: '',
  method: '',
  note: '',
  status: '待处理',
  processor: '',
  processedAt: ''
})

const exceptionReasons = ['返佣金额不一致', '返佣人数不一致', 'MT数据异常', '数据同步异常', '其他']
const handlingMethods = ['重新同步', '人工核对', '人工调整', '补发返佣', '其他']
const exceptionRows = {
  'CL-50892': { reconciliationDate: '2026-08-11', closeOrderNo: '#CL-50892', accountType: '标准账户', customerName: '李强', mtAccount: '10028571', lots: '0.50 标准手', expectedPeople: '2 人', actualPeople: '3 人', expectedAmount: '$14.00', actualAmount: '$72.20', amountDifference: '+$58.20', rebateDifference: '+1 条' },
  'CL-50881': { reconciliationDate: '2026-08-11', closeOrderNo: '#CL-50881', accountType: '美分账户', customerName: '张敏', mtAccount: 'USC20234', lots: '2.50 美分手', expectedPeople: '1 人', actualPeople: '1 人', expectedAmount: '$0.0035', actualAmount: '$1.4035', amountDifference: '+$1.40', rebateDifference: '0 条' },
  'CL-50878': { reconciliationDate: '2026-08-11', closeOrderNo: '#CL-50878', accountType: '美分账户', customerName: '孙佳', mtAccount: 'USC21088', lots: '12.50 美分手', expectedPeople: '2 人', actualPeople: '2 人', expectedAmount: '$0.0280', actualAmount: '$59.8280', amountDifference: '+$59.80', rebateDifference: '0 条' },
  'CL-50870': { reconciliationDate: '2026-08-11', closeOrderNo: '#CL-50870', accountType: '标准账户', customerName: '王磊', mtAccount: '10029310', lots: '0.20 标准手', expectedPeople: '3 人', actualPeople: '3 人', expectedAmount: '$2.40', actualAmount: '$2.70', amountDifference: '+$0.30', rebateDifference: '0 条' },
  'CL-50855': { reconciliationDate: '2026-08-11', closeOrderNo: '#CL-50855', accountType: '标准账户', customerName: '陈宇', mtAccount: '10024718', lots: '1.00 标准手', expectedPeople: '3 人', actualPeople: '2 人', expectedAmount: '$15.00', actualAmount: '$10.00', amountDifference: '-$5.00', rebateDifference: '-1 条' },
  'CL-50847': { reconciliationDate: '2026-08-11', closeOrderNo: '#CL-50847', accountType: '标准账户', customerName: '何思雨', mtAccount: '10023391', lots: '0.30 标准手', expectedPeople: '2 人', actualPeople: '2 人', expectedAmount: '$1.80', actualAmount: '$2.30', amountDifference: '+$0.50', rebateDifference: '0 条' },
  'CL-50812': { reconciliationDate: '2026-08-11', closeOrderNo: '#CL-50812', accountType: '标准账户', customerName: '郑凯', mtAccount: '10030578', lots: '0.70 标准手', expectedPeople: '3 人', actualPeople: '5 人', expectedAmount: '$10.50', actualAmount: '$45.50', amountDifference: '+$35.00', rebateDifference: '+2 条' },
  'CL-50808': { reconciliationDate: '2026-08-11', closeOrderNo: '#CL-50808', accountType: '标准账户', customerName: '冯杰', mtAccount: '10028910', lots: '0.10 标准手', expectedPeople: '2 人', actualPeople: '2 人', expectedAmount: '$3.00', actualAmount: '$3.50', amountDifference: '+$0.50', rebateDifference: '0 条' },
  'CL-50804': { reconciliationDate: '2026-08-11', closeOrderNo: '#CL-50804', accountType: '标准账户', customerName: '褚敏', mtAccount: '10022884', lots: '1.50 标准手', expectedPeople: '4 人', actualPeople: '3 人', expectedAmount: '$60.00', actualAmount: '$30.00', amountDifference: '-$30.00', rebateDifference: '-1 条' },
  'CL-50796': { reconciliationDate: '2026-08-11', closeOrderNo: '#CL-50796', accountType: '标准账户', customerName: '蒋晨', mtAccount: '10025040', lots: '0.60 标准手', expectedPeople: '3 人', actualPeople: '7 人', expectedAmount: '$7.20', actualAmount: '$36.00', amountDifference: '+$28.80', rebateDifference: '+4 条' }
}

const openExceptionDrawer = (id) => {
  const row = exceptionRows[id]
  if (!row) return
  selectedException.value = row
  Object.assign(exceptionForm, exceptionRecords[id] || {
    reason: '',
    method: '',
    note: '',
    status: '待处理',
    processor: '',
    processedAt: ''
  })
  exceptionDrawerOpen.value = true
}

const formatCurrentTime = () => {
  const now = new Date()
  const pad = (value) => String(value).padStart(2, '0')
  return `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())} ${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`
}

const saveExceptionRecord = () => {
  if (!selectedException.value) return
  if (!exceptionForm.reason) {
    ElMessage.warning('请选择异常原因')
    return
  }
  if (!exceptionForm.method) {
    ElMessage.warning('请选择处理方式')
    return
  }
  if (!exceptionForm.note.trim()) {
    ElMessage.warning('请填写处理说明')
    return
  }
  const id = selectedException.value.closeOrderNo.replace('#', '')
  const record = {
    reason: exceptionForm.reason,
    method: exceptionForm.method,
    note: exceptionForm.note.trim(),
    status: '已处理',
    processor: '当前操作人',
    processedAt: formatCurrentTime()
  }
  exceptionRecords[id] = record
  Object.assign(exceptionForm, record)
  ElMessage.success('异常处理已确认')
}
</script>

<style scoped>
.reconciliation-detail-table-card {
  overflow: visible;
}

.reconciliation-detail-table-scroll {
  overflow-x: auto;
  overflow-y: visible;
}

.commission-detail-table {
  border-collapse: separate;
  border-spacing: 0;
  color: #374151;
  font-size: 13px;
}

.commission-detail-table thead th {
  height: 56px;
  padding: 0 16px;
  background: #fbfcfd;
  border-bottom: 1px solid #edf0f2;
  color: #6b7280;
  font-size: 12px;
  font-weight: 600;
  line-height: 18px;
  text-align: left;
  vertical-align: middle;
  white-space: nowrap;
}

.commission-detail-table tbody td {
  height: 60px;
  padding: 12px 16px;
  border-bottom: 1px solid #f1f3f5;
  line-height: 20px;
  vertical-align: middle;
  white-space: nowrap;
}

.commission-detail-table tbody tr:last-child td {
  border-bottom: 0;
}

.commission-detail-table tbody td:nth-child(4),
.commission-detail-table tbody td:nth-child(5),
.commission-detail-table tbody td:nth-child(7),
.commission-detail-table tbody td:nth-child(9) {
  text-align: center;
}

.commission-detail-table tbody td:nth-child(6),
.commission-detail-table tbody td:nth-child(8) {
  text-align: right;
}

.commission-detail-table tbody td:last-child > .flex {
  gap: 12px;
  min-width: 142px;
}

.commission-detail-table tbody tr:not(.diff-row) td:nth-child(4) span {
  color: #374151 !important;
}

.reconciliation-customer {
  min-width: 150px;
  line-height: 20px;
}

.exception-processing-card {
  border: 1px solid #f1f3f5;
}

.exception-form-select {
  height: 40px;
  padding: 0 38px 0 12px;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  background-color: #fff;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='14' height='14' viewBox='0 0 24 24' fill='none' stroke='%239ca3af' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E");
  background-position: right 12px center;
  background-repeat: no-repeat;
  background-size: 14px 14px;
  color: #374151;
  font-size: 13px;
  line-height: 20px;
  outline: none;
  transition: border-color 0.15s ease, box-shadow 0.15s ease;
  appearance: none;
}

.exception-form-select:focus {
  border-color: #c19b5e;
  box-shadow: 0 0 0 3px rgba(193, 155, 94, 0.12);
}

.exception-form-textarea {
  border: 1px solid #d1d5db;
  background: #fff;
  padding: 10px 12px;
  color: #374151;
  font-size: 13px;
  line-height: 20px;
  outline: none;
  transition: border-color 0.15s ease, box-shadow 0.15s ease;
}

.exception-form-textarea::placeholder {
  color: #9ca3af;
}

.exception-form-textarea:focus {
  border-color: #c19b5e;
  box-shadow: 0 0 0 3px rgba(193, 155, 94, 0.12);
}

.reconciliation-detail-pagination {
  min-height: 64px;
  background: #fff;
}
</style>
