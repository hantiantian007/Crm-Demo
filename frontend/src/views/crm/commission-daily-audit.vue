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
 <div class="bg-white rounded-xl shadow-sm border border-gray-100 flex flex-col overflow-hidden">
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
  <div class="overflow-x-auto no-scrollbar">
   <table class="custom-table w-full min-w-[1500px]">
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
       应/实返佣金额
      </th>
      <th>
       对账结果
      </th>
      <th>
       金额差额
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
       <div class="font-medium">
        李强（MT: 10028571）
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
       <button class="text-blue-600 hover:text-blue-800 text-[12px] font-medium px-2 py-1 rounded hover:bg-blue-50 transition-colors text-blue-500 hover:text-blue-700">
        查看详情
       </button>
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
       <div class="font-medium">
        张敏（MT: USC20234）
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
       <button class="text-blue-600 hover:text-blue-800 text-[12px] font-medium px-2 py-1 rounded hover:bg-blue-50 transition-colors text-blue-500 hover:text-blue-700">
        查看详情
       </button>
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
       <div class="font-medium">
        孙佳（MT: USC21088）
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
       <button class="text-blue-600 hover:text-blue-800 text-[12px] font-medium px-2 py-1 rounded hover:bg-blue-50 transition-colors text-blue-500 hover:text-blue-700">
        查看详情
       </button>
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
       <div class="font-medium">
        王磊（MT: 10029310）
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
       <button class="text-blue-600 hover:text-blue-800 text-[12px] font-medium px-2 py-1 rounded hover:bg-blue-50 transition-colors text-blue-500 hover:text-blue-700">
        查看详情
       </button>
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
       <div class="font-medium">
        陈宇（MT: 10024718）
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
       <button class="text-blue-600 hover:text-blue-800 text-[12px] font-medium px-2 py-1 rounded hover:bg-blue-50 transition-colors text-blue-500 hover:text-blue-700">
        查看详情
       </button>
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
       <div class="font-medium">
        何思雨（MT: 10023391）
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
       <button class="text-blue-600 hover:text-blue-800 text-[12px] font-medium px-2 py-1 rounded hover:bg-blue-50 transition-colors text-blue-500 hover:text-blue-700">
        查看详情
       </button>
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
       <div class="font-medium">
        郑凯（MT: 10030578）
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
       <button class="text-blue-600 hover:text-blue-800 text-[12px] font-medium px-2 py-1 rounded hover:bg-blue-50 transition-colors text-blue-500 hover:text-blue-700">
        查看详情
       </button>
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
       <div class="font-medium">
        冯杰（MT: 10028910）
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
       <button class="text-blue-600 hover:text-blue-800 text-[12px] font-medium px-2 py-1 rounded hover:bg-blue-50 transition-colors text-blue-500 hover:text-blue-700">
        查看详情
       </button>
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
       <div class="font-medium">
        褚敏（MT: 10022884）
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
       <button class="text-blue-600 hover:text-blue-800 text-[12px] font-medium px-2 py-1 rounded hover:bg-blue-50 transition-colors text-blue-500 hover:text-blue-700">
        查看详情
       </button>
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
       <div class="font-medium">
        蒋晨（MT: 10025040）
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
       <button class="text-blue-600 hover:text-blue-800 text-[12px] font-medium px-2 py-1 rounded hover:bg-blue-50 transition-colors text-blue-500 hover:text-blue-700">
        查看详情
       </button>
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
       <div class="font-medium">
        赵磊（MT: 10027483）
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
       <div class="font-medium">
        林小（MT: USC21530）
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
       <div class="font-medium text-gray-600">
        吴丹（MT: 10031205）
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
       <div class="font-medium">
        刘洋（MT: 10026187）
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
       <div class="font-medium">
        张伟（MT: 10019088）
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
       <div class="font-medium">
        黄涛（MT: 10030122）
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
       <div class="font-medium">
        吴佳（MT: 10027136）
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
       <div class="font-medium">
        周明（MT: USC20881）
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
       <div class="font-medium">
        徐磊（MT: USC21977）
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
       <div class="font-medium">
        孙浩（MT: 10024558）
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
       <div class="font-medium text-gray-600">
        韩冰（MT: 10032016）
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
       <div class="font-medium">
        董雪（MT: 10021166）
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
  <div class="flex items-center justify-between p-4 border-t border-gray-100 text-xs text-gray-500">
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

    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
</script>
