<template>
  <div class="flex h-full bg-mainBg overflow-hidden">
    <div class="flex-1 flex flex-col min-w-0 bg-gray-50 overflow-hidden p-4 custom-scrollbar overflow-y-auto">
      <div class="flex-1 overflow-y-auto bg-gray-50 p-6">
 <!-- ========== Row 1: 6 个核心 KPI 卡片 ========== -->
 <div class="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4 mb-5">
  <div class="kpi-card bg-white rounded-xl card-shadow border border-gray-100 p-5 cursor-pointer">
   <div class="flex items-center justify-between mb-3">
    <span class="text-xs text-gray-500 font-medium">
     累计入金总额
    </span>
    <div class="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-500">
     <i class="fa-solid fa-arrow-down text-sm">
     </i>
    </div>
   </div>
   <p class="text-2xl font-bold text-gray-800 mb-1.5">
    $
    <span class="tabular-nums">
     8,642,150
    </span>
   </p>
   <div class="flex items-center gap-2 text-xs">
    <span class="inline-flex items-center gap-0.5 text-emerald-600 font-medium">
     <i class="fa-solid fa-arrow-trend-up text-[10px]">
     </i>
     +12.4%
    </span>
    <span class="text-gray-400">
     较上月
    </span>
    <span class="ml-auto text-emerald-600 font-medium">
     +$952,300
    </span>
   </div>
  </div>
  <div class="kpi-card bg-white rounded-xl card-shadow border border-gray-100 p-5 cursor-pointer">
   <div class="flex items-center justify-between mb-3">
    <span class="text-xs text-gray-500 font-medium">
     累计出金总额
    </span>
    <div class="w-8 h-8 rounded-lg bg-rose-50 flex items-center justify-center text-rose-500">
     <i class="fa-solid fa-arrow-up text-sm">
     </i>
    </div>
   </div>
   <p class="text-2xl font-bold text-gray-800 mb-1.5">
    $
    <span class="tabular-nums">
     3,218,760
    </span>
   </p>
   <div class="flex items-center gap-2 text-xs">
    <span class="inline-flex items-center gap-0.5 text-rose-600 font-medium">
     <i class="fa-solid fa-arrow-trend-up text-[10px]">
     </i>
     +5.8%
    </span>
    <span class="text-gray-400">
     较上月
    </span>
    <span class="ml-auto text-gray-500 font-medium">
     出金率 37.2%
    </span>
   </div>
  </div>
  <div class="kpi-card bg-white rounded-xl card-shadow border border-gray-100 p-5 cursor-pointer">
   <div class="flex items-center justify-between mb-3">
    <span class="text-xs text-gray-500 font-medium">
     净入金
    </span>
    <div class="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-blue-500">
     <i class="fa-solid fa-scale-balanced text-sm">
     </i>
    </div>
   </div>
   <p class="text-2xl font-bold text-gray-800 mb-1.5">
    $
    <span class="tabular-nums">
     5,423,390
    </span>
   </p>
   <div class="flex items-center gap-2 text-xs">
    <span class="inline-flex items-center gap-0.5 text-emerald-600 font-medium">
     <i class="fa-solid fa-arrow-trend-up text-[10px]">
     </i>
     +16.7%
    </span>
    <span class="text-gray-400">
     较上月
    </span>
    <span class="ml-auto text-emerald-600 font-medium">
     +$776,000
    </span>
   </div>
  </div>
  <div class="kpi-card bg-white rounded-xl card-shadow border border-gray-100 p-5 cursor-pointer">
   <div class="flex items-center justify-between mb-3">
    <span class="text-xs text-gray-500 font-medium">
     平台毛利
    </span>
    <div class="w-8 h-8 rounded-lg bg-amber-50 flex items-center justify-center text-amber-500">
     <i class="fa-solid fa-sack-dollar text-sm">
     </i>
    </div>
   </div>
   <p class="text-2xl font-bold text-gray-800 mb-1.5">
    $
    <span class="tabular-nums">
     728,450
    </span>
   </p>
   <div class="flex items-center gap-2 text-xs">
    <span class="inline-flex items-center gap-0.5 text-emerald-600 font-medium">
     <i class="fa-solid fa-arrow-trend-up text-[10px]">
     </i>
     +8.2%
    </span>
    <span class="text-gray-400">
     较上月
    </span>
    <span class="ml-auto text-gray-500 font-medium">
     毛利率
     <span class="text-[#DC2626]">
      8.4%
     </span>
    </span>
   </div>
  </div>
  <div class="kpi-card bg-white rounded-xl card-shadow border border-gray-100 p-5 cursor-pointer">
   <div class="flex items-center justify-between mb-3">
    <span class="text-xs text-gray-500 font-medium">
     已发放佣金
    </span>
    <div class="w-8 h-8 rounded-lg bg-orange-50 flex items-center justify-center text-orange-500">
     <i class="fa-solid fa-coins text-sm">
     </i>
    </div>
   </div>
   <p class="text-2xl font-bold text-gray-800 mb-1.5">
    $
    <span class="tabular-nums">
     312,880
    </span>
   </p>
   <div class="flex items-center gap-2 text-xs">
    <span class="inline-flex items-center gap-0.5 text-rose-600 font-medium">
     <i class="fa-solid fa-arrow-trend-up text-[10px]">
     </i>
     +22.1%
    </span>
    <span class="text-gray-400">
     较上月
    </span>
    <span class="ml-auto text-gray-500 font-medium">
     待发
     <span class="text-[#DC2626]">
      $58,200
     </span>
    </span>
   </div>
  </div>
  <div class="kpi-card bg-white rounded-xl card-shadow border border-gray-100 p-5 cursor-pointer">
   <div class="flex items-center justify-between mb-3">
    <span class="text-xs text-gray-500 font-medium">
     MT 账户总净值
    </span>
    <div class="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-500">
     <i class="fa-solid fa-chart-line text-sm">
     </i>
    </div>
   </div>
   <p class="text-2xl font-bold text-gray-800 mb-1.5">
    $
    <span class="tabular-nums">
     6,185,920
    </span>
   </p>
   <div class="flex items-center gap-2 text-xs">
    <span class="inline-flex items-center gap-0.5 text-gray-500">
     <i class="fa-solid fa-minus text-[10px]">
     </i>
     0.0%
    </span>
    <span class="text-gray-400">
     较昨日
    </span>
    <span class="ml-auto text-gray-500 font-medium">
     余额 $6,240,500
    </span>
   </div>
  </div>
 </div>
 <!-- ========== Row 2: 趋势图 + 预警总览 ========== -->
 <div class="grid grid-cols-1 xl:grid-cols-3 gap-5 mb-5">
  <div class="xl:col-span-2 bg-white rounded-xl card-shadow border border-gray-100 p-5">
   <div class="flex items-center justify-between mb-5">
    <div>
     <h3 class="text-sm font-semibold text-gray-800">
      资金流动趋势
     </h3>
     <p class="text-xs text-gray-400 mt-1">
      近 30 天入金 / 出金 / 净入金走势
     </p>
    </div>
    <div class="flex items-center gap-4 text-xs">
     <span class="flex items-center gap-1.5">
      <span class="w-3 h-0.5 bg-emerald-500 rounded">
      </span>
      <span class="text-gray-500">
       入金
      </span>
     </span>
     <span class="flex items-center gap-1.5">
      <span class="w-3 h-0.5 bg-rose-500 rounded">
      </span>
      <span class="text-gray-500">
       出金
      </span>
     </span>
     <span class="flex items-center gap-1.5">
      <span class="w-3 h-0.5 bg-blue-500 rounded">
      </span>
      <span class="text-gray-500">
       净入金
      </span>
     </span>
    </div>
   </div>
   <div class="h-[260px] w-full">
    <canvas id="cashflowChart">
    </canvas>
   </div>
  </div>
  <div class="bg-white rounded-xl card-shadow border border-gray-100 p-5">
   <div class="flex items-center justify-between mb-5">
    <div>
     <h3 class="text-sm font-semibold text-gray-800">
      资金预警总览
     </h3>
     <p class="text-xs text-gray-400 mt-1">
      按严重级别分类统计
     </p>
    </div>
    <button class="text-xs text-gray-400 hover:text-gray-600 transition-colors">
     筛选
     <i class="fa-solid fa-filter ml-1 text-[10px]">
     </i>
    </button>
   </div>
   <div class="space-y-3 mb-5">
    <a class="flex items-center justify-between p-3 bg-red-50/60 border border-red-100 rounded-lg hover:bg-red-50 transition-colors" href="#">
     <div class="flex items-center gap-3">
      <div class="w-10 h-10 rounded-lg bg-red-100 flex items-center justify-center text-red-600">
       <i class="fa-solid fa-circle-exclamation">
       </i>
      </div>
      <div>
       <p class="text-sm font-semibold text-red-700">
        严重
       </p>
       <p class="text-[11px] text-red-500/80">
        需立即处理
       </p>
      </div>
     </div>
     <span class="text-2xl font-bold text-red-600 tabular-nums">
      2
     </span>
    </a>
    <a class="flex items-center justify-between p-3 bg-orange-50/60 border border-orange-100 rounded-lg hover:bg-orange-50 transition-colors" href="#">
     <div class="flex items-center gap-3">
      <div class="w-10 h-10 rounded-lg bg-orange-100 flex items-center justify-center text-orange-600">
       <i class="fa-solid fa-triangle-exclamation">
       </i>
      </div>
      <div>
       <p class="text-sm font-semibold text-orange-700">
        警告
       </p>
       <p class="text-[11px] text-orange-500/80">
        需尽快关注
       </p>
      </div>
     </div>
     <span class="text-2xl font-bold text-orange-600 tabular-nums">
      5
     </span>
    </a>
    <a class="flex items-center justify-between p-3 bg-blue-50/60 border border-blue-100 rounded-lg hover:bg-blue-50 transition-colors" href="#">
     <div class="flex items-center gap-3">
      <div class="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600">
       <i class="fa-solid fa-circle-info">
       </i>
      </div>
      <div>
       <p class="text-sm font-semibold text-blue-700">
        提示
       </p>
       <p class="text-[11px] text-blue-500/80">
        普通提醒
       </p>
      </div>
     </div>
     <span class="text-2xl font-bold text-blue-600 tabular-nums">
      8
     </span>
    </a>
   </div>
   <div class="pt-4 border-t border-gray-100">
    <div class="flex items-center justify-between text-xs mb-3">
     <span class="text-gray-500">
      今日待处理预警
     </span>
     <span class="text-gray-800 font-semibold tabular-nums">
      <span class="text-[#DC2626]">
       7
      </span>
      / 15
     </span>
    </div>
    <div class="h-2 bg-gray-100 rounded-full overflow-hidden">
     <div class="h-full bg-gradient-to-r from-red-500 via-orange-400 to-emerald-400 rounded-full" style="width: 47%">
     </div>
    </div>
   </div>
  </div>
 </div>
 <!-- ========== Row 3: 每日对账 + 待办队列 ========== -->
 <div class="grid grid-cols-1 xl:grid-cols-3 gap-5 mb-5">
  <div class="bg-white rounded-xl card-shadow border border-gray-100 p-5">
   <div class="flex items-center justify-between mb-5">
    <div>
     <h3 class="text-sm font-semibold text-gray-800">
      每日对账健康度
     </h3>
     <p class="text-xs text-gray-400 mt-1">
      最近一次对账
      <span class="text-gray-600 font-medium">
       2026-08-07 06:00
      </span>
     </p>
    </div>
    <button class="text-xs px-3 py-1.5 rounded border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors flex items-center gap-1">
     <i class="fa-solid fa-play text-[10px]">
     </i>
     立即对账
    </button>
   </div>
   <div class="space-y-3">
    <div class="flex items-center justify-between p-3 bg-emerald-50/50 rounded-lg border border-emerald-100">
     <div class="flex items-center gap-3">
      <span class="w-2 h-2 rounded-full bg-emerald-500">
      </span>
      <div>
       <p class="text-sm font-medium text-gray-800">
        配置健康表
       </p>
       <p class="text-[11px] text-gray-500">
        校验可分佣 = 分佣值 + 剩余
       </p>
      </div>
     </div>
     <span class="px-2 py-0.5 rounded-full text-[11px] font-medium bg-emerald-100 text-emerald-700">
      通过
     </span>
    </div>
    <div class="flex items-center justify-between p-3 bg-emerald-50/50 rounded-lg border border-emerald-100">
     <div class="flex items-center gap-3">
      <span class="w-2 h-2 rounded-full bg-emerald-500">
      </span>
      <div>
       <p class="text-sm font-medium text-gray-800">
        单笔链路完整性
       </p>
       <p class="text-[11px] text-gray-500">
        校验链条无缺失、无链路外分钱
       </p>
      </div>
     </div>
     <span class="px-2 py-0.5 rounded-full text-[11px] font-medium bg-emerald-100 text-emerald-700">
      通过
     </span>
    </div>
    <div class="flex items-center justify-between p-3 bg-rose-50/50 rounded-lg border border-rose-100">
     <div class="flex items-center gap-3">
      <span class="w-2 h-2 rounded-full bg-rose-500 pulse-dot">
      </span>
      <div>
       <p class="text-sm font-medium text-gray-800">
        单笔金额归属
       </p>
       <p class="text-[11px] text-[#DC2626]">
        差异
        <span class="font-semibold tabular-nums">
         2
        </span>
        笔 · 共
        <span class="font-semibold">
         $128.50
        </span>
       </p>
      </div>
     </div>
     <span class="px-2 py-0.5 rounded-full text-[11px] font-medium bg-rose-100 text-rose-700">
      异常
     </span>
    </div>
    <div class="flex items-center justify-between p-3 bg-orange-50/50 rounded-lg border border-orange-100">
     <div class="flex items-center gap-3">
      <span class="w-2 h-2 rounded-full bg-orange-500">
      </span>
      <div>
       <p class="text-sm font-medium text-gray-800">
        总盘顶格校验
       </p>
       <p class="text-[11px] text-orange-600">
        3 笔总发放 ≠ 顶级可分佣
       </p>
      </div>
     </div>
     <span class="px-2 py-0.5 rounded-full text-[11px] font-medium bg-orange-100 text-orange-700">
      警告
     </span>
    </div>
    <div class="flex items-center justify-between p-3 bg-emerald-50/50 rounded-lg border border-emerald-100">
     <div class="flex items-center gap-3">
      <span class="w-2 h-2 rounded-full bg-emerald-500">
      </span>
      <div>
       <p class="text-sm font-medium text-gray-800">
        三方平衡表
       </p>
       <p class="text-[11px] text-gray-500">
        CRM / MT / 支付通道三账核对
       </p>
      </div>
     </div>
     <span class="px-2 py-0.5 rounded-full text-[11px] font-medium bg-emerald-100 text-emerald-700">
      通过
     </span>
    </div>
   </div>
  </div>
  <div class="bg-white rounded-xl card-shadow border border-gray-100 p-5">
   <div class="flex items-center justify-between mb-5">
    <div>
     <h3 class="text-sm font-semibold text-gray-800">
      待办队列
     </h3>
     <p class="text-xs text-gray-400 mt-1">
      按 SLA 优先级排序
     </p>
    </div>
    <span class="text-xs text-gray-400">
     共
     <span class="text-gray-700 font-semibold tabular-nums">
      32
     </span>
     项
    </span>
   </div>
   <div class="space-y-3">
    <a class="block p-3 rounded-lg border border-gray-100 hover:bg-gray-50 transition-colors" href="#">
     <div class="flex items-center justify-between mb-2">
      <div class="flex items-center gap-2">
       <span class="px-2 py-0.5 rounded-full text-[10px] font-medium bg-red-100 text-red-700">
        超时
       </span>
       <span class="text-sm font-medium text-gray-800">
        待审核入金
       </span>
      </div>
      <span class="text-lg font-bold text-gray-800 tabular-nums">
       12
      </span>
     </div>
     <div class="flex items-center justify-between text-[11px]">
      <span class="text-gray-500">
       总金额
       <span class="text-gray-700 font-medium">
        $48,500
       </span>
      </span>
      <span class="text-[#DC2626] font-medium">
       <i class="fa-solid fa-clock mr-0.5">
       </i>
       最久 2h 18m
      </span>
     </div>
    </a>
    <a class="block p-3 rounded-lg border border-gray-100 hover:bg-gray-50 transition-colors" href="#">
     <div class="flex items-center justify-between mb-2">
      <div class="flex items-center gap-2">
       <span class="px-2 py-0.5 rounded-full text-[10px] font-medium bg-red-100 text-red-700">
        超时
       </span>
       <span class="text-sm font-medium text-gray-800">
        待审核出金
       </span>
      </div>
      <span class="text-lg font-bold text-gray-800 tabular-nums">
       8
      </span>
     </div>
     <div class="flex items-center justify-between text-[11px]">
      <span class="text-gray-500">
       总金额
       <span class="text-[#DC2626] font-medium">
        $125,800
       </span>
      </span>
      <span class="text-[#DC2626] font-medium">
       <i class="fa-solid fa-clock mr-0.5">
       </i>
       最久 1h 45m
      </span>
     </div>
    </a>
    <a class="block p-3 rounded-lg border border-gray-100 hover:bg-gray-50 transition-colors" href="#">
     <div class="flex items-center justify-between mb-2">
      <div class="flex items-center gap-2">
       <span class="px-2 py-0.5 rounded-full text-[10px] font-medium bg-orange-100 text-orange-700">
        待处理
       </span>
       <span class="text-sm font-medium text-gray-800">
        佣金待审核
       </span>
      </div>
      <span class="text-lg font-bold text-gray-800 tabular-nums">
       5
      </span>
     </div>
     <div class="flex items-center justify-between text-[11px]">
      <span class="text-gray-500">
       总金额
       <span class="text-gray-700 font-medium">
        $58,200
       </span>
      </span>
      <span class="text-orange-600 font-medium">
       <i class="fa-solid fa-clock mr-0.5">
       </i>
       截止今日 18:00
      </span>
     </div>
    </a>
    <a class="block p-3 rounded-lg border border-rose-100 bg-rose-50/30 hover:bg-rose-50 transition-colors" href="#">
     <div class="flex items-center justify-between mb-2">
      <div class="flex items-center gap-2">
       <span class="px-2 py-0.5 rounded-full text-[10px] font-medium bg-red-100 text-red-700">
        严重
       </span>
       <span class="text-sm font-medium text-gray-800">
        佣金链路异常
       </span>
      </div>
      <span class="text-lg font-bold text-[#DC2626] tabular-nums">
       5
      </span>
     </div>
     <div class="flex items-center justify-between text-[11px]">
      <span class="text-gray-500">
       涉及开仓单
       <span class="text-gray-700 font-medium">
        3
       </span>
       张
      </span>
      <span class="text-[#DC2626] font-medium">
       链路外分钱 + 总盘超限
      </span>
     </div>
    </a>
    <a class="block p-3 rounded-lg border border-gray-100 hover:bg-gray-50 transition-colors" href="#">
     <div class="flex items-center justify-between mb-2">
      <div class="flex items-center gap-2">
       <span class="px-2 py-0.5 rounded-full text-[10px] font-medium bg-blue-100 text-blue-700">
        普通
       </span>
       <span class="text-sm font-medium text-gray-800">
        账户待审核
       </span>
      </div>
      <span class="text-lg font-bold text-gray-800 tabular-nums">
       2
      </span>
     </div>
     <div class="flex items-center justify-between text-[11px]">
      <span class="text-gray-500">
       KYC 资料待核验
      </span>
      <span class="text-gray-400">
       SLA 剩余 5h 20m
      </span>
     </div>
    </a>
   </div>
  </div>
  <div class="bg-white rounded-xl card-shadow border border-gray-100 p-5">
   <div class="flex items-center justify-between mb-5">
    <div>
     <h3 class="text-sm font-semibold text-gray-800">
      佣金发放趋势
     </h3>
     <p class="text-xs text-gray-400 mt-1">
      近 6 个月佣金发放情况
     </p>
    </div>
    <span class="text-xs text-gray-500">
     单位: $K
    </span>
   </div>
   <div class="h-[180px] w-full mb-4">
    <canvas id="commissionChart">
    </canvas>
   </div>
   <div class="pt-4 border-t border-gray-100 grid grid-cols-2 gap-3">
    <div class="p-3 bg-gray-50 rounded-lg">
     <p class="text-[11px] text-gray-500 mb-1">
      平均单笔佣金
     </p>
     <p class="text-base font-bold text-gray-800 tabular-nums">
      $246.30
     </p>
    </div>
    <div class="p-3 bg-gray-50 rounded-lg">
     <p class="text-[11px] text-gray-500 mb-1">
      发放覆盖代理
     </p>
     <p class="text-base font-bold text-gray-800 tabular-nums">
      128
      <span class="text-xs text-gray-400 font-normal">
       人
      </span>
     </p>
    </div>
   </div>
  </div>
 </div>
 <!-- ========== Row 4: TOP 榜单 (横向三列) ========== -->
 <div class="grid grid-cols-1 xl:grid-cols-3 gap-5 mb-5">
  <div class="bg-white rounded-xl card-shadow border border-gray-100 p-5">
   <div class="flex items-center justify-between mb-4">
    <h3 class="text-sm font-semibold text-gray-800">
     入金 TOP 代理
    </h3>
    <span class="text-[11px] text-gray-400">
     近 30 天
    </span>
   </div>
   <div class="space-y-3">
    <div class="flex items-center gap-3 p-2 -mx-2 rounded-lg hover:bg-gray-50 transition-colors">
     <div class="w-7 h-7 rounded-full bg-gradient-to-br from-amber-400 to-yellow-500 flex items-center justify-center text-white text-xs font-bold shadow-sm">
      1
     </div>
     <div class="flex-1 min-w-0">
      <div class="flex items-center justify-between mb-1">
       <span class="text-sm font-medium text-gray-800 truncate">
        华安 (413)
       </span>
       <span class="text-sm font-semibold text-gray-800 tabular-nums">
        $3,284,500
       </span>
      </div>
      <div class="h-1.5 bg-gray-100 rounded-full overflow-hidden">
       <div class="h-full bg-gradient-to-r from-amber-400 to-yellow-500 rounded-full" style="width: 100%">
       </div>
      </div>
     </div>
    </div>
    <div class="flex items-center gap-3 p-2 -mx-2 rounded-lg hover:bg-gray-50 transition-colors">
     <div class="w-7 h-7 rounded-full bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center text-white text-xs font-bold shadow-sm">
      2
     </div>
     <div class="flex-1 min-w-0">
      <div class="flex items-center justify-between mb-1">
       <span class="text-sm font-medium text-gray-800 truncate">
        4-test-测试-B
       </span>
       <span class="text-sm font-semibold text-gray-800 tabular-nums">
        $1,862,300
       </span>
      </div>
      <div class="h-1.5 bg-gray-100 rounded-full overflow-hidden">
       <div class="h-full bg-gradient-to-r from-gray-300 to-gray-400 rounded-full" style="width: 57%">
       </div>
      </div>
     </div>
    </div>
    <div class="flex items-center gap-3 p-2 -mx-2 rounded-lg hover:bg-gray-50 transition-colors">
     <div class="w-7 h-7 rounded-full bg-gradient-to-br from-orange-300 to-amber-600 flex items-center justify-center text-white text-xs font-bold shadow-sm">
      3
     </div>
     <div class="flex-1 min-w-0">
      <div class="flex items-center justify-between mb-1">
       <span class="text-sm font-medium text-gray-800 truncate">
        435-test-Han
       </span>
       <span class="text-sm font-semibold text-gray-800 tabular-nums">
        $984,200
       </span>
      </div>
      <div class="h-1.5 bg-gray-100 rounded-full overflow-hidden">
       <div class="h-full bg-gradient-to-r from-orange-300 to-amber-600 rounded-full" style="width: 30%">
       </div>
      </div>
     </div>
    </div>
    <div class="flex items-center gap-3 p-2 -mx-2 rounded-lg hover:bg-gray-50 transition-colors">
     <div class="w-7 h-7 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 text-xs font-bold">
      4
     </div>
     <div class="flex-1 min-w-0">
      <div class="flex items-center justify-between mb-1">
       <span class="text-sm font-medium text-gray-800 truncate">
        华和翰 (389)
       </span>
       <span class="text-sm font-semibold text-gray-800 tabular-nums">
        $658,000
       </span>
      </div>
      <div class="h-1.5 bg-gray-100 rounded-full overflow-hidden">
       <div class="h-full bg-blue-400 rounded-full" style="width: 20%">
       </div>
      </div>
     </div>
    </div>
    <div class="flex items-center gap-3 p-2 -mx-2 rounded-lg hover:bg-gray-50 transition-colors">
     <div class="w-7 h-7 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 text-xs font-bold">
      5
     </div>
     <div class="flex-1 min-w-0">
      <div class="flex items-center justify-between mb-1">
       <span class="text-sm font-medium text-gray-800 truncate">
        杨平 (168)
       </span>
       <span class="text-sm font-semibold text-gray-800 tabular-nums">
        $412,500
       </span>
      </div>
      <div class="h-1.5 bg-gray-100 rounded-full overflow-hidden">
       <div class="h-full bg-blue-400 rounded-full" style="width: 13%">
       </div>
      </div>
     </div>
    </div>
   </div>
  </div>
  <div class="bg-white rounded-xl card-shadow border border-gray-100 p-5">
   <div class="flex items-center justify-between mb-4">
    <h3 class="text-sm font-semibold text-gray-800">
     入金 TOP 客户
    </h3>
    <span class="text-[11px] text-gray-400">
     近 30 天
    </span>
   </div>
   <div class="space-y-3">
    <div class="flex items-center gap-3 p-2 -mx-2 rounded-lg hover:bg-gray-50 transition-colors">
     <div class="w-7 h-7 rounded-full bg-gradient-to-br from-amber-400 to-yellow-500 flex items-center justify-center text-white text-xs font-bold shadow-sm">
      1
     </div>
     <div class="w-8 h-8 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600 text-xs font-bold shrink-0">
      LC
     </div>
     <div class="flex-1 min-w-0">
      <p class="text-sm font-medium text-gray-800 truncate">
       刘先生 · MT500128
      </p>
      <p class="text-[11px] text-gray-400">
       入金 8 次
      </p>
     </div>
     <span class="text-sm font-semibold text-gray-800 tabular-nums">
      $528,000
     </span>
    </div>
    <div class="flex items-center gap-3 p-2 -mx-2 rounded-lg hover:bg-gray-50 transition-colors">
     <div class="w-7 h-7 rounded-full bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center text-white text-xs font-bold shadow-sm">
      2
     </div>
     <div class="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 text-xs font-bold shrink-0">
      ZH
     </div>
     <div class="flex-1 min-w-0">
      <p class="text-sm font-medium text-gray-800 truncate">
       张女士 · MT500086
      </p>
      <p class="text-[11px] text-gray-400">
       入金 5 次
      </p>
     </div>
     <span class="text-sm font-semibold text-gray-800 tabular-nums">
      $412,800
     </span>
    </div>
    <div class="flex items-center gap-3 p-2 -mx-2 rounded-lg hover:bg-gray-50 transition-colors">
     <div class="w-7 h-7 rounded-full bg-gradient-to-br from-orange-300 to-amber-600 flex items-center justify-center text-white text-xs font-bold shadow-sm">
      3
     </div>
     <div class="w-8 h-8 rounded-full bg-purple-50 flex items-center justify-center text-purple-600 text-xs font-bold shrink-0">
      WA
     </div>
     <div class="flex-1 min-w-0">
      <p class="text-sm font-medium text-gray-800 truncate">
       Wang A. · MT500155
      </p>
      <p class="text-[11px] text-gray-400">
       入金 12 次
      </p>
     </div>
     <span class="text-sm font-semibold text-gray-800 tabular-nums">
      $356,200
     </span>
    </div>
    <div class="flex items-center gap-3 p-2 -mx-2 rounded-lg hover:bg-gray-50 transition-colors">
     <div class="w-7 h-7 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 text-xs font-bold">
      4
     </div>
     <div class="w-8 h-8 rounded-full bg-amber-50 flex items-center justify-center text-amber-600 text-xs font-bold shrink-0">
      CX
     </div>
     <div class="flex-1 min-w-0">
      <p class="text-sm font-medium text-gray-800 truncate">
       陈先生 · MT500201
      </p>
      <p class="text-[11px] text-gray-400">
       入金 3 次
      </p>
     </div>
     <span class="text-sm font-semibold text-gray-800 tabular-nums">
      $285,000
     </span>
    </div>
    <div class="flex items-center gap-3 p-2 -mx-2 rounded-lg hover:bg-gray-50 transition-colors">
     <div class="w-7 h-7 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 text-xs font-bold">
      5
     </div>
     <div class="w-8 h-8 rounded-full bg-rose-50 flex items-center justify-center text-rose-600 text-xs font-bold shrink-0">
      HL
     </div>
     <div class="flex-1 min-w-0">
      <p class="text-sm font-medium text-gray-800 truncate">
       黄女士 · MT500033
      </p>
      <p class="text-[11px] text-gray-400">
       入金 6 次
      </p>
     </div>
     <span class="text-sm font-semibold text-gray-800 tabular-nums">
      $218,500
     </span>
    </div>
   </div>
  </div>
  <div class="bg-white rounded-xl card-shadow border border-gray-100 p-5">
   <div class="flex items-center justify-between mb-4">
    <h3 class="text-sm font-semibold text-gray-800">
     佣金 TOP 代理
    </h3>
    <span class="text-[11px] text-gray-400">
     近 30 天
    </span>
   </div>
   <div class="space-y-3">
    <div class="flex items-center gap-3 p-2 -mx-2 rounded-lg hover:bg-gray-50 transition-colors">
     <div class="w-7 h-7 rounded-full bg-gradient-to-br from-amber-400 to-yellow-500 flex items-center justify-center text-white text-xs font-bold shadow-sm">
      1
     </div>
     <div class="flex-1 min-w-0">
      <div class="flex items-center justify-between mb-1">
       <div>
        <span class="text-sm font-medium text-gray-800">
         华安 (413)
        </span>
        <span class="ml-1.5 text-[10px] px-1.5 py-0.5 rounded bg-amber-50 text-amber-700 font-medium">
         顶级
        </span>
       </div>
       <span class="text-sm font-semibold text-orange-600 tabular-nums">
        $128,500
       </span>
      </div>
      <div class="flex items-center gap-3 text-[11px] text-gray-500">
       <span>
        手数
        <span class="text-gray-700 font-medium tabular-nums">
         1,285
        </span>
       </span>
       <span>
        直客
        <span class="text-gray-700 font-medium tabular-nums">
         42
        </span>
        人
       </span>
      </div>
     </div>
    </div>
    <div class="flex items-center gap-3 p-2 -mx-2 rounded-lg hover:bg-gray-50 transition-colors">
     <div class="w-7 h-7 rounded-full bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center text-white text-xs font-bold shadow-sm">
      2
     </div>
     <div class="flex-1 min-w-0">
      <div class="flex items-center justify-between mb-1">
       <div>
        <span class="text-sm font-medium text-gray-800">
         4-test-测试-B
        </span>
        <span class="ml-1.5 text-[10px] px-1.5 py-0.5 rounded bg-blue-50 text-blue-700 font-medium">
         二级
        </span>
       </div>
       <span class="text-sm font-semibold text-orange-600 tabular-nums">
        $86,300
       </span>
      </div>
      <div class="flex items-center gap-3 text-[11px] text-gray-500">
       <span>
        手数
        <span class="text-gray-700 font-medium tabular-nums">
         862
        </span>
       </span>
       <span>
        直客
        <span class="text-gray-700 font-medium tabular-nums">
         28
        </span>
        人
       </span>
      </div>
     </div>
    </div>
    <div class="flex items-center gap-3 p-2 -mx-2 rounded-lg hover:bg-gray-50 transition-colors">
     <div class="w-7 h-7 rounded-full bg-gradient-to-br from-orange-300 to-amber-600 flex items-center justify-center text-white text-xs font-bold shadow-sm">
      3
     </div>
     <div class="flex-1 min-w-0">
      <div class="flex items-center justify-between mb-1">
       <div>
        <span class="text-sm font-medium text-gray-800">
         435-test-Han
        </span>
        <span class="ml-1.5 text-[10px] px-1.5 py-0.5 rounded bg-blue-50 text-blue-700 font-medium">
         二级
        </span>
       </div>
       <span class="text-sm font-semibold text-orange-600 tabular-nums">
        $45,800
       </span>
      </div>
      <div class="flex items-center gap-3 text-[11px] text-gray-500">
       <span>
        手数
        <span class="text-gray-700 font-medium tabular-nums">
         456
        </span>
       </span>
       <span>
        直客
        <span class="text-gray-700 font-medium tabular-nums">
         15
        </span>
        人
       </span>
      </div>
     </div>
    </div>
    <div class="flex items-center gap-3 p-2 -mx-2 rounded-lg hover:bg-gray-50 transition-colors">
     <div class="w-7 h-7 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 text-xs font-bold">
      4
     </div>
     <div class="flex-1 min-w-0">
      <div class="flex items-center justify-between mb-1">
       <div>
        <span class="text-sm font-medium text-gray-800">
         华和翰 (389)
        </span>
        <span class="ml-1.5 text-[10px] px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700 font-medium">
         三级
        </span>
       </div>
       <span class="text-sm font-semibold text-orange-600 tabular-nums">
        $28,280
       </span>
      </div>
      <div class="flex items-center gap-3 text-[11px] text-gray-500">
       <span>
        手数
        <span class="text-gray-700 font-medium tabular-nums">
         281
        </span>
       </span>
       <span>
        直客
        <span class="text-gray-700 font-medium tabular-nums">
         9
        </span>
        人
       </span>
      </div>
     </div>
    </div>
    <div class="flex items-center gap-3 p-2 -mx-2 rounded-lg hover:bg-gray-50 transition-colors">
     <div class="w-7 h-7 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 text-xs font-bold">
      5
     </div>
     <div class="flex-1 min-w-0">
      <div class="flex items-center justify-between mb-1">
       <div>
        <span class="text-sm font-medium text-gray-800">
         han01
        </span>
        <span class="ml-1.5 text-[10px] px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700 font-medium">
         三级
        </span>
       </div>
       <span class="text-sm font-semibold text-orange-600 tabular-nums">
        $15,600
       </span>
      </div>
      <div class="flex items-center gap-3 text-[11px] text-gray-500">
       <span>
        手数
        <span class="text-gray-700 font-medium tabular-nums">
         152
        </span>
       </span>
       <span>
        直客
        <span class="text-gray-700 font-medium tabular-nums">
         6
        </span>
        人
       </span>
      </div>
     </div>
    </div>
   </div>
  </div>
 </div>
 <!-- ========== Row 5: 预警明细宽表 (横向滚动) ========== -->
 <div class="bg-white rounded-xl card-shadow border border-gray-100 mb-5">
  <div class="flex items-center justify-between px-5 py-4 border-b border-gray-100">
   <div>
    <h3 class="text-sm font-semibold text-gray-800">
     预警明细
    </h3>
    <p class="text-xs text-gray-400 mt-0.5">
     按预警时间倒序 · 点击行跳转处理
    </p>
   </div>
   <div class="flex items-center gap-2">
    <div class="flex items-center gap-1.5 px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-lg">
     <span class="w-2 h-2 rounded-full bg-red-500">
     </span>
     <button class="text-xs text-gray-600 hover:text-gray-800 transition-colors">
      严重 2
     </button>
    </div>
    <div class="flex items-center gap-1.5 px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-lg">
     <span class="w-2 h-2 rounded-full bg-orange-500">
     </span>
     <button class="text-xs text-gray-600 hover:text-gray-800 transition-colors">
      警告 5
     </button>
    </div>
    <div class="flex items-center gap-1.5 px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-lg">
     <span class="w-2 h-2 rounded-full bg-blue-500">
     </span>
     <button class="text-xs text-gray-600 hover:text-gray-800 transition-colors">
      提示 8
     </button>
    </div>
    <button class="px-3 py-1.5 text-xs rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors flex items-center gap-1.5">
     <i class="fa-solid fa-file-export text-[11px]">
     </i>
     导出
    </button>
   </div>
  </div>
  <div class="overflow-x-auto no-scrollbar">
   <table class="custom-table w-full min-w-[1280px]">
    <thead class="bg-tableHeader">
     <tr>
      <th class="w-10">
       <input class="rounded border-gray-300 text-primaryBtn focus:ring-primaryBtn w-3.5 h-3.5" type="checkbox"/>
      </th>
      <th>
       预警 ID
      </th>
      <th>
       级别
      </th>
      <th>
       类型
      </th>
      <th>
       关联模块
      </th>
      <th>
       异常描述
      </th>
      <th>
       涉及金额
      </th>
      <th>
       涉及账号/订单
      </th>
      <th>
       首次触发
      </th>
      <th>
       持续时长
      </th>
      <th>
       处理状态
      </th>
      <th>
       责任人
      </th>
      <th class="text-right pr-5">
       操作
      </th>
     </tr>
    </thead>
    <tbody>
     <tr class="alert-row">
      <td>
       <input class="rounded border-gray-300 text-primaryBtn focus:ring-primaryBtn w-3.5 h-3.5" type="checkbox"/>
      </td>
      <td class="font-mono text-xs text-gray-500">
       ALT-20260807-001
      </td>
      <td>
       <span class="px-2 py-0.5 rounded-full text-[11px] font-medium bg-red-100 text-red-700">
        <i class="fa-solid fa-circle-exclamation mr-1 text-[9px]">
        </i>
        严重
       </span>
      </td>
      <td class="text-gray-700 font-medium">
       总盘超限
      </td>
      <td>
       <span class="px-2 py-0.5 rounded text-[11px] bg-orange-50 text-orange-700">
        佣金
       </span>
      </td>
      <td class="text-gray-600">
       开仓单
       <span class="font-mono text-[#DC2626] font-medium">
        #OP-88521
       </span>
       链路总发放 $52.80 &gt; 顶级可分佣 $50.00，
       <span class="text-[#DC2626] font-medium">
        超 $2.80
       </span>
      </td>
      <td class="text-[#DC2626] font-semibold tabular-nums">
       +$2.80
      </td>
      <td class="font-mono text-xs text-gray-500">
       #OP-88521
      </td>
      <td class="text-gray-500">
       08-07 06:00
      </td>
      <td class="text-[#DC2626] font-medium">
       <i class="fa-solid fa-clock mr-0.5 text-[10px]">
       </i>
       8h 32m
      </td>
      <td>
       <span class="px-2 py-0.5 rounded-full text-[11px] font-medium bg-red-100 text-red-700">
        未处理
       </span>
      </td>
      <td>
       —
      </td>
      <td class="text-right pr-5">
       <button class="text-xs text-primaryBtn hover:underline mr-3">
        处理
       </button>
       <button class="text-xs text-gray-400 hover:text-gray-600">
        忽略
       </button>
      </td>
     </tr>
     <tr class="alert-row">
      <td>
       <input class="rounded border-gray-300 text-primaryBtn focus:ring-primaryBtn w-3.5 h-3.5" type="checkbox"/>
      </td>
      <td class="font-mono text-xs text-gray-500">
       ALT-20260807-002
      </td>
      <td>
       <span class="px-2 py-0.5 rounded-full text-[11px] font-medium bg-red-100 text-red-700">
        <i class="fa-solid fa-circle-exclamation mr-1 text-[9px]">
        </i>
        严重
       </span>
      </td>
      <td class="text-gray-700 font-medium">
       链路外分钱
      </td>
      <td>
       <span class="px-2 py-0.5 rounded text-[11px] bg-orange-50 text-orange-700">
        佣金
       </span>
      </td>
      <td class="text-gray-600">
       开仓单
       <span class="font-mono text-[#DC2626] font-medium">
        #OP-88450
       </span>
       产生佣金记录给
       <span class="font-medium">
        435-test-Han
       </span>
       ，但该开仓单属于 B 链路（平行链路隔离异常）
      </td>
      <td class="text-[#DC2626] font-semibold tabular-nums">
       $15.60
      </td>
      <td class="font-mono text-xs text-gray-500">
       #OP-88450
      </td>
      <td class="text-gray-500">
       08-07 06:00
      </td>
      <td class="text-[#DC2626] font-medium">
       <i class="fa-solid fa-clock mr-0.5 text-[10px]">
       </i>
       8h 32m
      </td>
      <td>
       <span class="px-2 py-0.5 rounded-full text-[11px] font-medium bg-red-100 text-red-700">
        未处理
       </span>
      </td>
      <td>
       —
      </td>
      <td class="text-right pr-5">
       <button class="text-xs text-primaryBtn hover:underline mr-3">
        处理
       </button>
       <button class="text-xs text-gray-400 hover:text-gray-600">
        忽略
       </button>
      </td>
     </tr>
     <tr class="alert-row">
      <td>
       <input class="rounded border-gray-300 text-primaryBtn focus:ring-primaryBtn w-3.5 h-3.5" type="checkbox"/>
      </td>
      <td class="font-mono text-xs text-gray-500">
       ALT-20260807-003
      </td>
      <td>
       <span class="px-2 py-0.5 rounded-full text-[11px] font-medium bg-orange-100 text-orange-700">
        <i class="fa-solid fa-triangle-exclamation mr-1 text-[9px]">
        </i>
        警告
       </span>
      </td>
      <td class="text-gray-700 font-medium">
       大额出金
      </td>
      <td>
       <span class="px-2 py-0.5 rounded text-[11px] bg-rose-50 text-rose-700">
        出金
       </span>
      </td>
      <td class="text-gray-600">
       客户
       <span class="font-medium">
        刘先生 MT500128
       </span>
       发起单笔出金
       <span class="text-[#DC2626] font-medium">
        $50,000
       </span>
       ，超过阈值 $30,000
      </td>
      <td class="text-[#DC2626] font-semibold tabular-nums">
       $50,000
      </td>
      <td class="font-mono text-xs text-gray-500">
       #WD-20260807-042
      </td>
      <td class="text-gray-500">
       08-07 12:15
      </td>
      <td class="text-orange-600 font-medium">
       <i class="fa-solid fa-clock mr-0.5 text-[10px]">
       </i>
       2h 17m
      </td>
      <td>
       <span class="px-2 py-0.5 rounded-full text-[11px] font-medium bg-orange-100 text-orange-700">
        处理中
       </span>
      </td>
      <td>
       <span class="flex items-center gap-1.5">
        <span class="w-5 h-5 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-[10px] font-bold">
         SM
        </span>
        史密斯
       </span>
      </td>
      <td class="text-right pr-5">
       <button class="text-xs text-primaryBtn hover:underline mr-3 text-blue-500 hover:text-blue-700">
        详情
       </button>
       <button class="text-xs text-gray-400 hover:text-gray-600">
        转派
       </button>
      </td>
     </tr>
     <tr class="alert-row">
      <td>
       <input class="rounded border-gray-300 text-primaryBtn focus:ring-primaryBtn w-3.5 h-3.5" type="checkbox"/>
      </td>
      <td class="font-mono text-xs text-gray-500">
       ALT-20260807-004
      </td>
      <td>
       <span class="px-2 py-0.5 rounded-full text-[11px] font-medium bg-orange-100 text-orange-700">
        <i class="fa-solid fa-triangle-exclamation mr-1 text-[9px]">
        </i>
        警告
       </span>
      </td>
      <td class="text-gray-700 font-medium">
       美分折算异常
      </td>
      <td>
       <span class="px-2 py-0.5 rounded text-[11px] bg-indigo-50 text-indigo-700">
        对账
       </span>
      </td>
      <td class="text-gray-600">
       账户
       <span class="font-mono font-medium">
        MT500999-USC
       </span>
       美分账户余额折算差额
       <span class="text-[#DC2626] font-medium">
        $125.70
       </span>
       （CRM 与 MT 不一致）
      </td>
      <td class="text-[#DC2626] font-semibold tabular-nums">
       -$125.70
      </td>
      <td class="font-mono text-xs text-gray-500">
       MT500999-USC
      </td>
      <td class="text-gray-500">
       08-07 08:30
      </td>
      <td class="text-orange-600 font-medium">
       <i class="fa-solid fa-clock mr-0.5 text-[10px]">
       </i>
       6h 02m
      </td>
      <td>
       <span class="px-2 py-0.5 rounded-full text-[11px] font-medium bg-red-100 text-red-700">
        未处理
       </span>
      </td>
      <td>
       —
      </td>
      <td class="text-right pr-5">
       <button class="text-xs text-primaryBtn hover:underline mr-3">
        处理
       </button>
       <button class="text-xs text-gray-400 hover:text-gray-600">
        忽略
       </button>
      </td>
     </tr>
     <tr class="alert-row">
      <td>
       <input class="rounded border-gray-300 text-primaryBtn focus:ring-primaryBtn w-3.5 h-3.5" type="checkbox"/>
      </td>
      <td class="font-mono text-xs text-gray-500">
       ALT-20260807-005
      </td>
      <td>
       <span class="px-2 py-0.5 rounded-full text-[11px] font-medium bg-orange-100 text-orange-700">
        <i class="fa-solid fa-triangle-exclamation mr-1 text-[9px]">
        </i>
        警告
       </span>
      </td>
      <td class="text-gray-700 font-medium">
       审核超时
      </td>
      <td>
       <span class="px-2 py-0.5 rounded text-[11px] bg-emerald-50 text-emerald-700">
        入金
       </span>
      </td>
      <td class="text-gray-600">
       入金
       <span class="font-mono font-medium">
        #DP-20260807-018
       </span>
       等待审核超过
       <span class="text-[#DC2626] font-medium">
        2 小时
       </span>
       （SLA: 1h），涉及客户 张女士 MT500086
      </td>
      <td class="text-gray-700 font-semibold tabular-nums">
       $12,500
      </td>
      <td class="font-mono text-xs text-gray-500">
       #DP-20260807-018
      </td>
      <td class="text-gray-500">
       08-07 12:20
      </td>
      <td class="text-[#DC2626] font-medium">
       <i class="fa-solid fa-clock mr-0.5 text-[10px]">
       </i>
       2h 12m
      </td>
      <td>
       <span class="px-2 py-0.5 rounded-full text-[11px] font-medium bg-red-100 text-red-700">
        未处理
       </span>
      </td>
      <td>
       —
      </td>
      <td class="text-right pr-5">
       <button class="text-xs text-primaryBtn hover:underline mr-3">
        处理
       </button>
       <button class="text-xs text-gray-400 hover:text-gray-600">
        转派
       </button>
      </td>
     </tr>
     <tr class="alert-row">
      <td>
       <input class="rounded border-gray-300 text-primaryBtn focus:ring-primaryBtn w-3.5 h-3.5" type="checkbox"/>
      </td>
      <td class="font-mono text-xs text-gray-500">
       ALT-20260807-006
      </td>
      <td>
       <span class="px-2 py-0.5 rounded-full text-[11px] font-medium bg-blue-100 text-blue-700">
        <i class="fa-solid fa-circle-info mr-1 text-[9px]">
        </i>
        提示
       </span>
      </td>
      <td class="text-gray-700 font-medium">
       佣金发放日
      </td>
      <td>
       <span class="px-2 py-0.5 rounded text-[11px] bg-orange-50 text-orange-700">
        佣金
       </span>
      </td>
      <td class="text-gray-600">
       今日为
       <span class="font-medium">
        8 月佣金发放日
       </span>
       ，待审核佣金 $58,200 / 5 笔，截止 18:00 前需完成审核
      </td>
      <td class="text-gray-700 font-semibold tabular-nums">
       $58,200
      </td>
      <td class="text-xs text-gray-500">
       —
      </td>
      <td class="text-gray-500">
       08-07 09:00
      </td>
      <td class="text-blue-600 font-medium">
       <i class="fa-solid fa-clock mr-0.5 text-[10px]">
       </i>
       5h 32m
      </td>
      <td>
       <span class="px-2 py-0.5 rounded-full text-[11px] font-medium bg-orange-100 text-orange-700">
        待跟进
       </span>
      </td>
      <td>
       <span class="flex items-center gap-1.5">
        <span class="w-5 h-5 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center text-[10px] font-bold">
         LH
        </span>
        李华
       </span>
      </td>
      <td class="text-right pr-5">
       <button class="text-xs text-primaryBtn hover:underline text-blue-500 hover:text-blue-700">
        详情
       </button>
      </td>
     </tr>
     <tr class="alert-row">
      <td>
       <input class="rounded border-gray-300 text-primaryBtn focus:ring-primaryBtn w-3.5 h-3.5" type="checkbox"/>
      </td>
      <td class="font-mono text-xs text-gray-500">
       ALT-20260807-007
      </td>
      <td>
       <span class="px-2 py-0.5 rounded-full text-[11px] font-medium bg-blue-100 text-blue-700">
        <i class="fa-solid fa-circle-info mr-1 text-[9px]">
        </i>
        提示
       </span>
      </td>
      <td class="text-gray-700 font-medium">
       赠金活动到期
      </td>
      <td>
       <span class="px-2 py-0.5 rounded text-[11px] bg-purple-50 text-purple-700">
        活动
       </span>
      </td>
      <td class="text-gray-600">
       "先锋体验活动"
       <span class="font-medium">
        还有 3 天
       </span>
       到期，当前参与客户 156 人，未完成赠金发放 8 人
      </td>
      <td class="text-gray-500 tabular-nums">
       —
      </td>
      <td class="text-xs text-gray-500">
       ACT-2026-001
      </td>
      <td class="text-gray-500">
       08-07 10:00
      </td>
      <td class="text-gray-500">
       <i class="fa-solid fa-clock mr-0.5 text-[10px]">
       </i>
       4h 32m
      </td>
      <td>
       <span class="px-2 py-0.5 rounded-full text-[11px] font-medium bg-blue-100 text-blue-700">
        通知中
       </span>
      </td>
      <td>
       —
      </td>
      <td class="text-right pr-5">
       <button class="text-xs text-primaryBtn hover:underline text-blue-500 hover:text-blue-700">
        详情
       </button>
      </td>
     </tr>
    </tbody>
   </table>
  </div>
  <div class="flex items-center justify-between px-5 py-3 border-t border-gray-100">
   <p class="text-xs text-gray-500">
    共
    <span class="text-gray-800 font-semibold tabular-nums">
     15
    </span>
    条预警 · 已选择
    <span class="text-gray-800 font-semibold tabular-nums">
     0
    </span>
    条
   </p>
   <div class="flex items-center gap-1">
    <button class="w-8 h-8 rounded border border-gray-200 text-gray-400 hover:text-gray-600 hover:bg-gray-50 transition-colors flex items-center justify-center text-xs">
     <i class="fa-solid fa-chevron-left">
     </i>
    </button>
    <button class="w-8 h-8 rounded bg-primaryBtn text-white font-medium text-xs flex items-center justify-center">
     1
    </button>
    <button class="w-8 h-8 rounded border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors flex items-center justify-center text-xs">
     2
    </button>
    <button class="w-8 h-8 rounded border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors flex items-center justify-center text-xs">
     3
    </button>
    <button class="w-8 h-8 rounded border border-gray-200 text-gray-400 hover:text-gray-600 hover:bg-gray-50 transition-colors flex items-center justify-center text-xs">
     <i class="fa-solid fa-chevron-right">
     </i>
    </button>
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
