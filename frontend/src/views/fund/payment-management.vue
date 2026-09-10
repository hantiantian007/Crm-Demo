<template>
  <div class="flex h-full bg-mainBg overflow-hidden">
    <div class="flex-1 flex flex-col min-w-0 bg-gray-50 overflow-hidden p-4 custom-scrollbar overflow-y-auto">
      <div class="flex-1 overflow-y-auto bg-gray-50 p-6">
 <!-- 支付管理主卡片 -->
 <div class="bg-white rounded-xl card-shadow border border-gray-100 overflow-hidden">
  <!-- 操作栏 -->
  <div class="px-6 py-4 border-b border-gray-100 flex items-center gap-3 flex-wrap">
   <div class="flex items-center gap-3 flex-1 min-w-0">
    <select class="flex-shrink-0 w-32 px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primaryBtn/20 focus:border-primaryBtn transition-all bg-white" id="filterStatus" onchange="filterPaymentList()">
     <option value="">
      全部状态
     </option>
     <option value="启用">
      启用
     </option>
     <option value="禁用">
      禁用
     </option>
    </select>
    <div class="flex items-center gap-2 ml-auto px-3 py-2 rounded-lg border border-amber-200 bg-amber-50/80">
     <span class="text-[11px] text-gray-500 whitespace-nowrap">
      当前命中通道
     </span>
     <div class="flex items-center gap-1.5">
      <span class="text-xs text-amber-800 font-bold whitespace-nowrap">
       CNY · alpay
      </span>
      <span class="px-2 py-0.5 text-[10px] font-bold rounded bg-amber-100 text-amber-800 border border-amber-200 whitespace-nowrap">
       汇率 6.88
      </span>
     </div>
    </div>
   </div>
   <div class="flex items-center gap-2 flex-shrink-0">
    <button class="inline-flex items-center gap-2 px-5 py-2 bg-primaryBtn hover:bg-primaryBtnHover text-white rounded-lg text-sm font-medium transition-colors shadow-sm">
     <i class="fa-solid fa-plus text-xs">
     </i>
     添加支付方式
    </button>
   </div>
  </div>
  <!-- 表格区域 -->
  <div class="overflow-x-auto">
   <table class="w-full text-sm text-left">
    <thead class="bg-tableHeader text-gray-600 border-b border-gray-200">
     <tr>
      <th class="px-4 py-4 font-medium w-12">
      </th>
      <th class="px-4 py-4 font-medium whitespace-nowrap">
       编号
      </th>
      <th class="px-4 py-4 font-medium whitespace-nowrap">
       简称
      </th>
      <th class="px-4 py-4 font-medium whitespace-nowrap">
       支付编号
      </th>
      <th class="px-4 py-4 font-medium whitespace-nowrap">
       支付名称
      </th>
      <th class="px-4 py-4 font-medium whitespace-nowrap">
       商户号
      </th>
      <th class="px-4 py-4 font-medium whitespace-nowrap">
       币种
      </th>
      <th class="px-4 py-4 font-medium">
       提示语
      </th>
      <th class="px-4 py-4 font-medium whitespace-nowrap text-right">
       汇率
      </th>
      <th class="px-4 py-4 font-medium whitespace-nowrap text-center w-24">
       状态
      </th>
      <th class="px-4 py-4 font-medium whitespace-nowrap text-center w-28">
       通道来源
      </th>
      <th class="px-4 py-4 font-medium whitespace-nowrap text-center w-28">
       操作
      </th>
     </tr>
    </thead>
    <tbody class="divide-y divide-gray-100">
     <!-- 行 2 -->
     <tr class="hover:bg-gray-50/50 transition-colors">
      <td class="px-4 py-3">
       <button class="w-6 h-6 flex items-center justify-center rounded hover:bg-gray-100 transition-colors">
        <i class="fa-solid fa-chevron-right text-[10px] text-gray-400 transition-all">
        </i>
       </button>
      </td>
      <td class="px-4 py-3 text-gray-500">
       2
      </td>
      <td class="px-4 py-3 font-medium text-gray-800">
       EXLP
      </td>
      <td class="px-4 py-3 text-red-500 font-mono text-xs">
       exlinked-cny-allpay
      </td>
      <td class="px-4 py-3 text-gray-700">
       QuickPay-Allpay
      </td>
      <td class="px-4 py-3 text-gray-600 font-mono text-xs">
       1930804
      </td>
      <td class="px-4 py-3 text-gray-700">
       CNY(￥)
      </td>
      <td class="px-4 py-3 text-gray-500">
      </td>
      <td class="px-4 py-3 text-gray-700 text-right font-mono">
       0
      </td>
      <td class="px-4 py-3 text-center">
       <button class="px-3 py-1 text-xs font-medium rounded-full bg-emerald-50 text-emerald-600 hover:bg-emerald-100 transition-colors">
        启用
       </button>
      </td>
      <td class="px-4 py-3 text-center">
       <span class="inline-flex items-center px-2 py-1 text-[11px] font-medium rounded-full bg-blue-50 text-blue-600 border border-blue-100">
        接口查询
       </span>
      </td>
      <td class="px-4 py-3 text-center">
       <div class="flex items-center justify-center gap-3">
        <button class="text-blue-500 hover:text-blue-700 text-xs font-medium transition-colors">
         编辑
        </button>
        <button class="text-gray-400 hover:text-red-500 text-xs font-medium transition-colors">
         删除
        </button>
       </div>
      </td>
     </tr>
     <tr class="hidden bg-gray-50/30">
      <td class="px-8 py-5" colspan="12">
       <div class="grid grid-cols-2 gap-6 text-sm">
        <div class="flex gap-3">
         <span class="text-gray-500 w-20 flex-shrink-0">
          支付渠道：
         </span>
         <span class="text-gray-800 font-medium">
          第三方快捷支付
         </span>
        </div>
        <div class="flex gap-3">
         <span class="text-gray-500 w-20 flex-shrink-0">
          单笔限额：
         </span>
         <span class="text-gray-800">
          ￥10,000 ~ ￥500,000
         </span>
        </div>
        <div class="flex gap-3">
         <span class="text-gray-500 w-20 flex-shrink-0">
          每日限额：
         </span>
         <span class="text-gray-800">
          ￥2,000,000
         </span>
        </div>
        <div class="flex gap-3">
         <span class="text-gray-500 w-20 flex-shrink-0">
          手续费率：
         </span>
         <span class="text-gray-800">
          0.38%
         </span>
        </div>
        <div class="flex gap-3 col-span-2">
         <span class="text-gray-500 w-20 flex-shrink-0">
          备注：
         </span>
         <span class="text-gray-600">
          -
         </span>
        </div>
       </div>
      </td>
     </tr>
     <!-- 行 16 -->
     <tr class="hover:bg-gray-50/50 transition-colors">
      <td class="px-4 py-3">
       <button class="w-6 h-6 flex items-center justify-center rounded hover:bg-gray-100 transition-colors">
        <i class="fa-solid fa-chevron-right text-[10px] text-gray-400 transition-all">
        </i>
       </button>
      </td>
      <td class="px-4 py-3 text-gray-500">
       16
      </td>
      <td class="px-4 py-3 font-medium text-gray-800">
       alpay
      </td>
      <td class="px-4 py-3 text-red-500 font-mono text-xs">
       alpay
      </td>
      <td class="px-4 py-3 text-gray-700">
       alpay
      </td>
      <td class="px-4 py-3 text-gray-600 font-mono text-xs">
       209045
      </td>
      <td class="px-4 py-3 text-gray-700">
       CNY(￥)
      </td>
      <td class="px-4 py-3 text-gray-500">
      </td>
      <td class="px-4 py-3 text-gray-700 text-right font-mono">
       6.88
      </td>
      <td class="px-4 py-3 text-center">
       <button class="px-3 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200 transition-colors">
        禁用
       </button>
      </td>
      <td class="px-4 py-3 text-center">
       <span class="inline-flex items-center px-2 py-1 text-[11px] font-medium rounded-full bg-emerald-50 text-emerald-600 border border-emerald-100">
        页面配置
       </span>
      </td>
      <td class="px-4 py-3 text-center">
       <div class="flex items-center justify-center gap-3">
        <button class="text-blue-500 hover:text-blue-700 text-xs font-medium transition-colors">
         编辑
        </button>
        <button class="text-gray-400 hover:text-red-500 text-xs font-medium transition-colors">
         删除
        </button>
       </div>
      </td>
     </tr>
     <tr class="hidden bg-gray-50/30">
      <td class="px-8 py-5" colspan="12">
       <div class="grid grid-cols-2 gap-6 text-sm">
        <div class="flex gap-3">
         <span class="text-gray-500 w-20 flex-shrink-0">
          支付渠道：
         </span>
         <span class="text-gray-800 font-medium">
          支付宝转账
         </span>
        </div>
        <div class="flex gap-3">
         <span class="text-gray-500 w-20 flex-shrink-0">
          单笔限额：
         </span>
         <span class="text-gray-800">
          ￥100 ~ ￥50,000
         </span>
        </div>
        <div class="flex gap-3">
         <span class="text-gray-500 w-20 flex-shrink-0">
          每日限额：
         </span>
         <span class="text-gray-800">
          ￥200,000
         </span>
        </div>
        <div class="flex gap-3">
         <span class="text-gray-500 w-20 flex-shrink-0">
          手续费率：
         </span>
         <span class="text-gray-800">
          0.00%
         </span>
        </div>
        <div class="flex gap-3 col-span-2">
         <span class="text-gray-500 w-20 flex-shrink-0">
          备注：
         </span>
         <span class="text-gray-600">
          -
         </span>
        </div>
       </div>
      </td>
     </tr>
     <!-- 行 13 -->
     <tr class="hover:bg-gray-50/50 transition-colors">
      <td class="px-4 py-3">
       <button class="w-6 h-6 flex items-center justify-center rounded hover:bg-gray-100 transition-colors">
        <i class="fa-solid fa-chevron-right text-[10px] text-gray-400 transition-all">
        </i>
       </button>
      </td>
      <td class="px-4 py-3 text-gray-500">
       13
      </td>
      <td class="px-4 py-3 font-medium text-gray-800">
       Pcard
      </td>
      <td class="px-4 py-3 text-red-500 font-mono text-xs">
       passtocredit
      </td>
      <td class="px-4 py-3 text-gray-700">
       Pcard
      </td>
      <td class="px-4 py-3 text-gray-600 font-mono text-xs">
       32
      </td>
      <td class="px-4 py-3 text-gray-700">
       HKD(HK$)
      </td>
      <td class="px-4 py-3 text-gray-500 text-xs">
       您的入金将以USDT 为抵押，充值入金到您的交易账户
      </td>
      <td class="px-4 py-3 text-gray-700 text-right font-mono">
       7.78
      </td>
      <td class="px-4 py-3 text-center">
       <button class="px-3 py-1 text-xs font-medium rounded-full bg-emerald-50 text-emerald-600 hover:bg-emerald-100 transition-colors">
        启用
       </button>
      </td>
      <td class="px-4 py-3 text-center">
       <span class="inline-flex items-center px-2 py-1 text-[11px] font-medium rounded-full bg-emerald-50 text-emerald-600 border border-emerald-100">
        页面配置
       </span>
      </td>
      <td class="px-4 py-3 text-center">
       <div class="flex items-center justify-center gap-3">
        <button class="text-blue-500 hover:text-blue-700 text-xs font-medium transition-colors">
         编辑
        </button>
        <button class="text-gray-400 hover:text-red-500 text-xs font-medium transition-colors">
         删除
        </button>
       </div>
      </td>
     </tr>
     <tr class="hidden bg-gray-50/30">
      <td class="px-8 py-5" colspan="12">
       <div class="grid grid-cols-2 gap-6 text-sm">
        <div class="flex gap-3">
         <span class="text-gray-500 w-20 flex-shrink-0">
          支付渠道：
         </span>
         <span class="text-gray-800 font-medium">
          预付卡支付
         </span>
        </div>
        <div class="flex gap-3">
         <span class="text-gray-500 w-20 flex-shrink-0">
          单笔限额：
         </span>
         <span class="text-gray-800">
          HK$100 ~ HK$100,000
         </span>
        </div>
        <div class="flex gap-3">
         <span class="text-gray-500 w-20 flex-shrink-0">
          每日限额：
         </span>
         <span class="text-gray-800">
          HK$500,000
         </span>
        </div>
        <div class="flex gap-3">
         <span class="text-gray-500 w-20 flex-shrink-0">
          手续费率：
         </span>
         <span class="text-gray-800">
          1.00%
         </span>
        </div>
        <div class="flex gap-3 col-span-2">
         <span class="text-gray-500 w-20 flex-shrink-0">
          备注：
         </span>
         <span class="text-gray-600">
          支持港币入金，自动按汇率折算为USDT抵押入账
         </span>
        </div>
       </div>
      </td>
     </tr>
     <!-- 行 10 -->
     <tr class="hover:bg-gray-50/50 transition-colors">
      <td class="px-4 py-3">
       <button class="w-6 h-6 flex items-center justify-center rounded hover:bg-gray-100 transition-colors">
        <i class="fa-solid fa-chevron-right text-[10px] text-gray-400 transition-all">
        </i>
       </button>
      </td>
      <td class="px-4 py-3 text-gray-500">
       10
      </td>
      <td class="px-4 py-3 font-medium text-gray-800">
       UTRC
      </td>
      <td class="px-4 py-3 text-red-500 font-mono text-xs">
       usdt-trc20
      </td>
      <td class="px-4 py-3 text-gray-700">
       usdt-trc20
      </td>
      <td class="px-4 py-3 text-gray-600 font-mono text-[11px] break-all">
       TY6CxXQxsppq3B8NnP493Y4Ph97zgkfKBU
      </td>
      <td class="px-4 py-3 text-gray-700">
       USDT($)
      </td>
      <td class="px-4 py-3 text-gray-500">
      </td>
      <td class="px-4 py-3 text-gray-700 text-right font-mono">
       1.5
      </td>
      <td class="px-4 py-3 text-center">
       <button class="px-3 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200 transition-colors">
        禁用
       </button>
      </td>
      <td class="px-4 py-3 text-center">
       <span class="inline-flex items-center px-2 py-1 text-[11px] font-medium rounded-full bg-emerald-50 text-emerald-600 border border-emerald-100">
        页面配置
       </span>
      </td>
      <td class="px-4 py-3 text-center">
       <div class="flex items-center justify-center gap-3">
        <button class="text-blue-500 hover:text-blue-700 text-xs font-medium transition-colors">
         编辑
        </button>
        <button class="text-gray-400 hover:text-red-500 text-xs font-medium transition-colors">
         删除
        </button>
       </div>
      </td>
     </tr>
     <tr class="hidden bg-gray-50/30">
      <td class="px-8 py-5" colspan="12">
       <div class="grid grid-cols-2 gap-6 text-sm">
        <div class="flex gap-3">
         <span class="text-gray-500 w-20 flex-shrink-0">
          支付渠道：
         </span>
         <span class="text-gray-800 font-medium">
          USDT-TRC20 链上转账
         </span>
        </div>
        <div class="flex gap-3">
         <span class="text-gray-500 w-20 flex-shrink-0">
          单笔限额：
         </span>
         <span class="text-gray-800">
          $10 ~ $100,000
         </span>
        </div>
        <div class="flex gap-3">
         <span class="text-gray-500 w-20 flex-shrink-0">
          每日限额：
         </span>
         <span class="text-gray-800">
          $500,000
         </span>
        </div>
        <div class="flex gap-3">
         <span class="text-gray-500 w-20 flex-shrink-0">
          手续费率：
         </span>
         <span class="text-gray-800">
          0.00%
         </span>
        </div>
        <div class="flex gap-3 col-span-2">
         <span class="text-gray-500 w-20 flex-shrink-0">
          备注：
         </span>
         <span class="text-gray-600">
          -
         </span>
        </div>
       </div>
      </td>
     </tr>
     <!-- 行 9 -->
     <tr class="hover:bg-gray-50/50 transition-colors">
      <td class="px-4 py-3">
       <button class="w-6 h-6 flex items-center justify-center rounded hover:bg-gray-100 transition-colors">
        <i class="fa-solid fa-chevron-right text-[10px] text-gray-400 transition-all">
        </i>
       </button>
      </td>
      <td class="px-4 py-3 text-gray-500">
       9
      </td>
      <td class="px-4 py-3 font-medium text-gray-800">
       UERC
      </td>
      <td class="px-4 py-3 text-red-500 font-mono text-xs">
       usdt-erc20
      </td>
      <td class="px-4 py-3 text-gray-700">
       usdt-erc20
      </td>
      <td class="px-4 py-3 text-gray-600 font-mono text-[11px] break-all">
       0x7819e711B1C0a2859CB4453a0B6751e8412C2455
      </td>
      <td class="px-4 py-3 text-gray-700">
       USDT($)
      </td>
      <td class="px-4 py-3 text-gray-500">
      </td>
      <td class="px-4 py-3 text-gray-700 text-right font-mono">
       1
      </td>
      <td class="px-4 py-3 text-center">
       <button class="px-3 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200 transition-colors">
        禁用
       </button>
      </td>
      <td class="px-4 py-3 text-center">
       <span class="inline-flex items-center px-2 py-1 text-[11px] font-medium rounded-full bg-emerald-50 text-emerald-600 border border-emerald-100">
        页面配置
       </span>
      </td>
      <td class="px-4 py-3 text-center">
       <div class="flex items-center justify-center gap-3">
        <button class="text-blue-500 hover:text-blue-700 text-xs font-medium transition-colors">
         编辑
        </button>
        <button class="text-gray-400 hover:text-red-500 text-xs font-medium transition-colors">
         删除
        </button>
       </div>
      </td>
     </tr>
     <tr class="hidden bg-gray-50/30">
      <td class="px-8 py-5" colspan="12">
       <div class="grid grid-cols-2 gap-6 text-sm">
        <div class="flex gap-3">
         <span class="text-gray-500 w-20 flex-shrink-0">
          支付渠道：
         </span>
         <span class="text-gray-800 font-medium">
          USDT-ERC20 链上转账
         </span>
        </div>
        <div class="flex gap-3">
         <span class="text-gray-500 w-20 flex-shrink-0">
          单笔限额：
         </span>
         <span class="text-gray-800">
          $100 ~ $500,000
         </span>
        </div>
        <div class="flex gap-3">
         <span class="text-gray-500 w-20 flex-shrink-0">
          每日限额：
         </span>
         <span class="text-gray-800">
          $2,000,000
         </span>
        </div>
        <div class="flex gap-3">
         <span class="text-gray-500 w-20 flex-shrink-0">
          手续费率：
         </span>
         <span class="text-gray-800">
          0.00%
         </span>
        </div>
        <div class="flex gap-3 col-span-2">
         <span class="text-gray-500 w-20 flex-shrink-0">
          备注：
         </span>
         <span class="text-gray-600">
          -
         </span>
        </div>
       </div>
      </td>
     </tr>
     <!-- 行 8 -->
     <tr class="hover:bg-gray-50/50 transition-colors">
      <td class="px-4 py-3">
       <button class="w-6 h-6 flex items-center justify-center rounded hover:bg-gray-100 transition-colors">
        <i class="fa-solid fa-chevron-right text-[10px] text-gray-400 transition-all">
        </i>
       </button>
      </td>
      <td class="px-4 py-3 text-gray-500">
       8
      </td>
      <td class="px-4 py-3 font-medium text-gray-800">
       EXLP
      </td>
      <td class="px-4 py-3 text-red-500 font-mono text-xs">
       exlinked-usdt-ERC20
      </td>
      <td class="px-4 py-3 text-gray-700">
       CryptoLink-USDT-ERC20
      </td>
      <td class="px-4 py-3 text-gray-600 font-mono text-xs">
       1930604
      </td>
      <td class="px-4 py-3 text-gray-700">
       USDT($)
      </td>
      <td class="px-4 py-3 text-gray-500">
      </td>
      <td class="px-4 py-3 text-gray-700 text-right font-mono">
       1
      </td>
      <td class="px-4 py-3 text-center">
       <button class="px-3 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200 transition-colors">
        禁用
       </button>
      </td>
      <td class="px-4 py-3 text-center">
       <span class="inline-flex items-center px-2 py-1 text-[11px] font-medium rounded-full bg-blue-50 text-blue-600 border border-blue-100">
        接口查询
       </span>
      </td>
      <td class="px-4 py-3 text-center">
       <div class="flex items-center justify-center gap-3">
        <button class="text-blue-500 hover:text-blue-700 text-xs font-medium transition-colors">
         编辑
        </button>
        <button class="text-gray-400 hover:text-red-500 text-xs font-medium transition-colors">
         删除
        </button>
       </div>
      </td>
     </tr>
     <tr class="hidden bg-gray-50/30">
      <td class="px-8 py-5" colspan="12">
       <div class="grid grid-cols-2 gap-6 text-sm">
        <div class="flex gap-3">
         <span class="text-gray-500 w-20 flex-shrink-0">
          支付渠道：
         </span>
         <span class="text-gray-800 font-medium">
          第三方 USDT-ERC20 快捷支付
         </span>
        </div>
        <div class="flex gap-3">
         <span class="text-gray-500 w-20 flex-shrink-0">
          单笔限额：
         </span>
         <span class="text-gray-800">
          $10 ~ $50,000
         </span>
        </div>
        <div class="flex gap-3">
         <span class="text-gray-500 w-20 flex-shrink-0">
          每日限额：
         </span>
         <span class="text-gray-800">
          $200,000
         </span>
        </div>
        <div class="flex gap-3">
         <span class="text-gray-500 w-20 flex-shrink-0">
          手续费率：
         </span>
         <span class="text-gray-800">
          0.50%
         </span>
        </div>
        <div class="flex gap-3 col-span-2">
         <span class="text-gray-500 w-20 flex-shrink-0">
          备注：
         </span>
         <span class="text-gray-600">
          -
         </span>
        </div>
       </div>
      </td>
     </tr>
     <!-- 行 7 -->
     <tr class="hover:bg-gray-50/50 transition-colors">
      <td class="px-4 py-3">
       <button class="w-6 h-6 flex items-center justify-center rounded hover:bg-gray-100 transition-colors">
        <i class="fa-solid fa-chevron-right text-[10px] text-gray-400 transition-all">
        </i>
       </button>
      </td>
      <td class="px-4 py-3 text-gray-500">
       7
      </td>
      <td class="px-4 py-3 font-medium text-gray-800">
       EXLP
      </td>
      <td class="px-4 py-3 text-red-500 font-mono text-xs">
       exlinked-usdt-matic
      </td>
      <td class="px-4 py-3 text-gray-700">
       CryptoLink-USDT-Polygon
      </td>
      <td class="px-4 py-3 text-gray-600 font-mono text-xs">
       1930804
      </td>
      <td class="px-4 py-3 text-gray-700">
       USDT($)
      </td>
      <td class="px-4 py-3 text-gray-500">
      </td>
      <td class="px-4 py-3 text-gray-700 text-right font-mono">
       1
      </td>
      <td class="px-4 py-3 text-center">
       <button class="px-3 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200 transition-colors">
        禁用
       </button>
      </td>
      <td class="px-4 py-3 text-center">
       <span class="inline-flex items-center px-2 py-1 text-[11px] font-medium rounded-full bg-blue-50 text-blue-600 border border-blue-100">
        接口查询
       </span>
      </td>
      <td class="px-4 py-3 text-center">
       <div class="flex items-center justify-center gap-3">
        <button class="text-blue-500 hover:text-blue-700 text-xs font-medium transition-colors">
         编辑
        </button>
        <button class="text-gray-400 hover:text-red-500 text-xs font-medium transition-colors">
         删除
        </button>
       </div>
      </td>
     </tr>
     <tr class="hidden bg-gray-50/30">
      <td class="px-8 py-5" colspan="12">
       <div class="grid grid-cols-2 gap-6 text-sm">
        <div class="flex gap-3">
         <span class="text-gray-500 w-20 flex-shrink-0">
          支付渠道：
         </span>
         <span class="text-gray-800 font-medium">
          第三方 USDT-Polygon 快捷支付
         </span>
        </div>
        <div class="flex gap-3">
         <span class="text-gray-500 w-20 flex-shrink-0">
          单笔限额：
         </span>
         <span class="text-gray-800">
          $10 ~ $50,000
         </span>
        </div>
        <div class="flex gap-3">
         <span class="text-gray-500 w-20 flex-shrink-0">
          每日限额：
         </span>
         <span class="text-gray-800">
          $200,000
         </span>
        </div>
        <div class="flex gap-3">
         <span class="text-gray-500 w-20 flex-shrink-0">
          手续费率：
         </span>
         <span class="text-gray-800">
          0.30%
         </span>
        </div>
        <div class="flex gap-3 col-span-2">
         <span class="text-gray-500 w-20 flex-shrink-0">
          备注：
         </span>
         <span class="text-gray-600">
          -
         </span>
        </div>
       </div>
      </td>
     </tr>
     <!-- 行 6 -->
     <tr class="hover:bg-gray-50/50 transition-colors">
      <td class="px-4 py-3">
       <button class="w-6 h-6 flex items-center justify-center rounded hover:bg-gray-100 transition-colors">
        <i class="fa-solid fa-chevron-right text-[10px] text-gray-400 transition-all">
        </i>
       </button>
      </td>
      <td class="px-4 py-3 text-gray-500">
       6
      </td>
      <td class="px-4 py-3 font-medium text-gray-800">
       EXLP
      </td>
      <td class="px-4 py-3 text-red-500 font-mono text-xs">
       exlinked-usdt-bep20
      </td>
      <td class="px-4 py-3 text-gray-700">
       CryptoLink-USDT-BEP20
      </td>
      <td class="px-4 py-3 text-gray-600 font-mono text-xs">
       1930804
      </td>
      <td class="px-4 py-3 text-gray-700">
       USDT($)
      </td>
      <td class="px-4 py-3 text-gray-500">
      </td>
      <td class="px-4 py-3 text-gray-700 text-right font-mono">
       1
      </td>
      <td class="px-4 py-3 text-center">
       <button class="px-3 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200 transition-colors">
        禁用
       </button>
      </td>
      <td class="px-4 py-3 text-center">
       <span class="inline-flex items-center px-2 py-1 text-[11px] font-medium rounded-full bg-blue-50 text-blue-600 border border-blue-100">
        接口查询
       </span>
      </td>
      <td class="px-4 py-3 text-center">
       <div class="flex items-center justify-center gap-3">
        <button class="text-blue-500 hover:text-blue-700 text-xs font-medium transition-colors">
         编辑
        </button>
        <button class="text-gray-400 hover:text-red-500 text-xs font-medium transition-colors">
         删除
        </button>
       </div>
      </td>
     </tr>
     <tr class="hidden bg-gray-50/30">
      <td class="px-8 py-5" colspan="12">
       <div class="grid grid-cols-2 gap-6 text-sm">
        <div class="flex gap-3">
         <span class="text-gray-500 w-20 flex-shrink-0">
          支付渠道：
         </span>
         <span class="text-gray-800 font-medium">
          第三方 USDT-BEP20 快捷支付
         </span>
        </div>
        <div class="flex gap-3">
         <span class="text-gray-500 w-20 flex-shrink-0">
          单笔限额：
         </span>
         <span class="text-gray-800">
          $10 ~ $50,000
         </span>
        </div>
        <div class="flex gap-3">
         <span class="text-gray-500 w-20 flex-shrink-0">
          每日限额：
         </span>
         <span class="text-gray-800">
          $200,000
         </span>
        </div>
        <div class="flex gap-3">
         <span class="text-gray-500 w-20 flex-shrink-0">
          手续费率：
         </span>
         <span class="text-gray-800">
          0.30%
         </span>
        </div>
        <div class="flex gap-3 col-span-2">
         <span class="text-gray-500 w-20 flex-shrink-0">
          备注：
         </span>
         <span class="text-gray-600">
          -
         </span>
        </div>
       </div>
      </td>
     </tr>
     <!-- 行 5 -->
     <tr class="hover:bg-gray-50/50 transition-colors">
      <td class="px-4 py-3">
       <button class="w-6 h-6 flex items-center justify-center rounded hover:bg-gray-100 transition-colors">
        <i class="fa-solid fa-chevron-right text-[10px] text-gray-400 transition-all">
        </i>
       </button>
      </td>
      <td class="px-4 py-3 text-gray-500">
       5
      </td>
      <td class="px-4 py-3 font-medium text-gray-800">
       EXLP
      </td>
      <td class="px-4 py-3 text-red-500 font-mono text-xs">
       exlinked-usdt-TRC20
      </td>
      <td class="px-4 py-3 text-gray-700">
       CryptoLink-USDT-TRC20
      </td>
      <td class="px-4 py-3 text-gray-600 font-mono text-xs">
       1930804
      </td>
      <td class="px-4 py-3 text-gray-700">
       USDT($)
      </td>
      <td class="px-4 py-3 text-gray-500">
      </td>
      <td class="px-4 py-3 text-gray-700 text-right font-mono">
       1
      </td>
      <td class="px-4 py-3 text-center">
       <button class="px-3 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200 transition-colors">
        禁用
       </button>
      </td>
      <td class="px-4 py-3 text-center">
       <span class="inline-flex items-center px-2 py-1 text-[11px] font-medium rounded-full bg-blue-50 text-blue-600 border border-blue-100">
        接口查询
       </span>
      </td>
      <td class="px-4 py-3 text-center">
       <div class="flex items-center justify-center gap-3">
        <button class="text-blue-500 hover:text-blue-700 text-xs font-medium transition-colors">
         编辑
        </button>
        <button class="text-gray-400 hover:text-red-500 text-xs font-medium transition-colors">
         删除
        </button>
       </div>
      </td>
     </tr>
     <tr class="hidden bg-gray-50/30">
      <td class="px-8 py-5" colspan="12">
       <div class="grid grid-cols-2 gap-6 text-sm">
        <div class="flex gap-3">
         <span class="text-gray-500 w-20 flex-shrink-0">
          支付渠道：
         </span>
         <span class="text-gray-800 font-medium">
          第三方 USDT-TRC20 快捷支付
         </span>
        </div>
        <div class="flex gap-3">
         <span class="text-gray-500 w-20 flex-shrink-0">
          单笔限额：
         </span>
         <span class="text-gray-800">
          $10 ~ $50,000
         </span>
        </div>
        <div class="flex gap-3">
         <span class="text-gray-500 w-20 flex-shrink-0">
          每日限额：
         </span>
         <span class="text-gray-800">
          $200,000
         </span>
        </div>
        <div class="flex gap-3">
         <span class="text-gray-500 w-20 flex-shrink-0">
          手续费率：
         </span>
         <span class="text-gray-800">
          0.50%
         </span>
        </div>
        <div class="flex gap-3 col-span-2">
         <span class="text-gray-500 w-20 flex-shrink-0">
          备注：
         </span>
         <span class="text-gray-600">
          -
         </span>
        </div>
       </div>
      </td>
     </tr>
     <!-- 行 4 -->
     <tr class="hover:bg-gray-50/50 transition-colors">
      <td class="px-4 py-3">
       <button class="w-6 h-6 flex items-center justify-center rounded hover:bg-gray-100 transition-colors">
        <i class="fa-solid fa-chevron-right text-[10px] text-gray-400 transition-all">
        </i>
       </button>
      </td>
      <td class="px-4 py-3 text-gray-500">
       4
      </td>
      <td class="px-4 py-3 font-medium text-gray-800">
       EXLP
      </td>
      <td class="px-4 py-3 text-red-500 font-mono text-xs">
       exlinked-cny
      </td>
      <td class="px-4 py-3 text-gray-700">
       QuickPay-CNY
      </td>
      <td class="px-4 py-3 text-gray-600 font-mono text-xs">
       1930804
      </td>
      <td class="px-4 py-3 text-gray-700">
       CNY(￥)
      </td>
      <td class="px-4 py-3 text-gray-500">
      </td>
      <td class="px-4 py-3 text-gray-700 text-right font-mono">
       0
      </td>
      <td class="px-4 py-3 text-center">
       <button class="px-3 py-1 text-xs font-medium rounded-full bg-emerald-50 text-emerald-600 hover:bg-emerald-100 transition-colors">
        启用
       </button>
      </td>
      <td class="px-4 py-3 text-center">
       <span class="inline-flex items-center px-2 py-1 text-[11px] font-medium rounded-full bg-blue-50 text-blue-600 border border-blue-100">
        接口查询
       </span>
      </td>
      <td class="px-4 py-3 text-center">
       <div class="flex items-center justify-center gap-3">
        <button class="text-blue-500 hover:text-blue-700 text-xs font-medium transition-colors">
         编辑
        </button>
        <button class="text-gray-400 hover:text-red-500 text-xs font-medium transition-colors">
         删除
        </button>
       </div>
      </td>
     </tr>
     <tr class="hidden bg-gray-50/30">
      <td class="px-8 py-5" colspan="12">
       <div class="grid grid-cols-2 gap-6 text-sm">
        <div class="flex gap-3">
         <span class="text-gray-500 w-20 flex-shrink-0">
          支付渠道：
         </span>
         <span class="text-gray-800 font-medium">
          第三方人民币快捷支付
         </span>
        </div>
        <div class="flex gap-3">
         <span class="text-gray-500 w-20 flex-shrink-0">
          单笔限额：
         </span>
         <span class="text-gray-800">
          ￥10,000 ~ ￥500,000
         </span>
        </div>
        <div class="flex gap-3">
         <span class="text-gray-500 w-20 flex-shrink-0">
          每日限额：
         </span>
         <span class="text-gray-800">
          ￥2,000,000
         </span>
        </div>
        <div class="flex gap-3">
         <span class="text-gray-500 w-20 flex-shrink-0">
          手续费率：
         </span>
         <span class="text-gray-800">
          0.38%
         </span>
        </div>
        <div class="flex gap-3 col-span-2">
         <span class="text-gray-500 w-20 flex-shrink-0">
          备注：
         </span>
         <span class="text-gray-600">
          -
         </span>
        </div>
       </div>
      </td>
     </tr>
     <!-- 行 3 -->
     <tr class="hover:bg-gray-50/50 transition-colors">
      <td class="px-4 py-3">
       <button class="w-6 h-6 flex items-center justify-center rounded hover:bg-gray-100 transition-colors">
        <i class="fa-solid fa-chevron-right text-[10px] text-gray-400 transition-all">
        </i>
       </button>
      </td>
      <td class="px-4 py-3 text-gray-500">
       3
      </td>
      <td class="px-4 py-3 font-medium text-gray-800">
       TOPP
      </td>
      <td class="px-4 py-3 text-red-500 font-mono text-xs">
       toppay-cny
      </td>
      <td class="px-4 py-3 text-gray-700">
       GlobalPay-CNY
      </td>
      <td class="px-4 py-3 text-gray-600 font-mono text-xs">
       UM1912312428485689345
      </td>
      <td class="px-4 py-3 text-gray-700">
       CNY(￥)
      </td>
      <td class="px-4 py-3 text-gray-500">
      </td>
      <td class="px-4 py-3 text-gray-700 text-right font-mono">
       -
      </td>
      <td class="px-4 py-3 text-center">
       <button class="px-3 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200 transition-colors">
        禁用
       </button>
      </td>
      <td class="px-4 py-3 text-center">
       <span class="inline-flex items-center px-2 py-1 text-[11px] font-medium rounded-full bg-blue-50 text-blue-600 border border-blue-100">
        接口查询
       </span>
      </td>
      <td class="px-4 py-3 text-center">
       <div class="flex items-center justify-center gap-3">
        <button class="text-blue-500 hover:text-blue-700 text-xs font-medium transition-colors">
         编辑
        </button>
        <button class="text-gray-400 hover:text-red-500 text-xs font-medium transition-colors">
         删除
        </button>
       </div>
      </td>
     </tr>
     <tr class="hidden bg-gray-50/30">
      <td class="px-8 py-5" colspan="12">
       <div class="grid grid-cols-2 gap-6 text-sm">
        <div class="flex gap-3">
         <span class="text-gray-500 w-20 flex-shrink-0">
          支付渠道：
         </span>
         <span class="text-gray-800 font-medium">
          环球人民币支付
         </span>
        </div>
        <div class="flex gap-3">
         <span class="text-gray-500 w-20 flex-shrink-0">
          单笔限额：
         </span>
         <span class="text-gray-800">
          ￥5,000 ~ ￥300,000
         </span>
        </div>
        <div class="flex gap-3">
         <span class="text-gray-500 w-20 flex-shrink-0">
          每日限额：
         </span>
         <span class="text-gray-800">
          ￥1,000,000
         </span>
        </div>
        <div class="flex gap-3">
         <span class="text-gray-500 w-20 flex-shrink-0">
          手续费率：
         </span>
         <span class="text-gray-800">
          0.45%
         </span>
        </div>
        <div class="flex gap-3 col-span-2">
         <span class="text-gray-500 w-20 flex-shrink-0">
          备注：
         </span>
         <span class="text-gray-600">
          -
         </span>
        </div>
       </div>
      </td>
     </tr>
     <!-- 行 1 -->
     <tr class="hover:bg-gray-50/50 transition-colors">
      <td class="px-4 py-3">
       <button class="w-6 h-6 flex items-center justify-center rounded hover:bg-gray-100 transition-colors">
        <i class="fa-solid fa-chevron-right text-[10px] text-gray-400 transition-all">
        </i>
       </button>
      </td>
      <td class="px-4 py-3 text-gray-500">
       1
      </td>
      <td class="px-4 py-3 font-medium text-gray-800">
       EXLP
      </td>
      <td class="px-4 py-3 text-red-500 font-mono text-xs">
       exlinked-cny-wechat
      </td>
      <td class="px-4 py-3 text-gray-700">
       QuickPay-WeChat
      </td>
      <td class="px-4 py-3 text-gray-600 font-mono text-xs">
       1930804
      </td>
      <td class="px-4 py-3 text-gray-700">
       CNY(￥)
      </td>
      <td class="px-4 py-3 text-gray-500">
      </td>
      <td class="px-4 py-3 text-gray-700 text-right font-mono">
       0
      </td>
      <td class="px-4 py-3 text-center">
       <button class="px-3 py-1 text-xs font-medium rounded-full bg-emerald-50 text-emerald-600 hover:bg-emerald-100 transition-colors">
        启用
       </button>
      </td>
      <td class="px-4 py-3 text-center">
       <span class="inline-flex items-center px-2 py-1 text-[11px] font-medium rounded-full bg-blue-50 text-blue-600 border border-blue-100">
        接口查询
       </span>
      </td>
      <td class="px-4 py-3 text-center">
       <div class="flex items-center justify-center gap-3">
        <button class="text-blue-500 hover:text-blue-700 text-xs font-medium transition-colors">
         编辑
        </button>
        <button class="text-gray-400 hover:text-red-500 text-xs font-medium transition-colors">
         删除
        </button>
       </div>
      </td>
     </tr>
     <tr class="hidden bg-gray-50/30">
      <td class="px-8 py-5" colspan="12">
       <div class="grid grid-cols-2 gap-6 text-sm">
        <div class="flex gap-3">
         <span class="text-gray-500 w-20 flex-shrink-0">
          支付渠道：
         </span>
         <span class="text-gray-800 font-medium">
          微信快捷支付
         </span>
        </div>
        <div class="flex gap-3">
         <span class="text-gray-500 w-20 flex-shrink-0">
          单笔限额：
         </span>
         <span class="text-gray-800">
          ￥1,000 ~ ￥50,000
         </span>
        </div>
        <div class="flex gap-3">
         <span class="text-gray-500 w-20 flex-shrink-0">
          每日限额：
         </span>
         <span class="text-gray-800">
          ￥200,000
         </span>
        </div>
        <div class="flex gap-3">
         <span class="text-gray-500 w-20 flex-shrink-0">
          手续费率：
         </span>
         <span class="text-gray-800">
          0.38%
         </span>
        </div>
        <div class="flex gap-3 col-span-2">
         <span class="text-gray-500 w-20 flex-shrink-0">
          备注：
         </span>
         <span class="text-gray-600">
          -
         </span>
        </div>
       </div>
      </td>
     </tr>
     <!-- 行 11 -->
     <tr class="hover:bg-gray-50/50 transition-colors">
      <td class="px-4 py-3">
       <button class="w-6 h-6 flex items-center justify-center rounded hover:bg-gray-100 transition-colors">
        <i class="fa-solid fa-chevron-right text-[10px] text-gray-400 transition-all">
        </i>
       </button>
      </td>
      <td class="px-4 py-3 text-gray-500">
       11
      </td>
      <td class="px-4 py-3 font-medium text-gray-800">
       UBEP
      </td>
      <td class="px-4 py-3 text-red-500 font-mono text-xs">
       usdt-bep20
      </td>
      <td class="px-4 py-3 text-gray-700">
       usdt-bep20
      </td>
      <td class="px-4 py-3 text-gray-600 font-mono text-[11px] break-all">
       0xb542efac420f2d0a4D23a196ed779fb5ab0c552B
      </td>
      <td class="px-4 py-3 text-gray-700">
       USDT($)
      </td>
      <td class="px-4 py-3 text-gray-500">
      </td>
      <td class="px-4 py-3 text-gray-700 text-right font-mono">
       0
      </td>
      <td class="px-4 py-3 text-center">
       <button class="px-3 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200 transition-colors">
        禁用
       </button>
      </td>
      <td class="px-4 py-3 text-center">
       <span class="inline-flex items-center px-2 py-1 text-[11px] font-medium rounded-full bg-emerald-50 text-emerald-600 border border-emerald-100">
        页面配置
       </span>
      </td>
      <td class="px-4 py-3 text-center">
       <div class="flex items-center justify-center gap-3">
        <button class="text-blue-500 hover:text-blue-700 text-xs font-medium transition-colors">
         编辑
        </button>
        <button class="text-gray-400 hover:text-red-500 text-xs font-medium transition-colors">
         删除
        </button>
       </div>
      </td>
     </tr>
     <tr class="hidden bg-gray-50/30">
      <td class="px-8 py-5" colspan="12">
       <div class="grid grid-cols-2 gap-6 text-sm">
        <div class="flex gap-3">
         <span class="text-gray-500 w-20 flex-shrink-0">
          支付渠道：
         </span>
         <span class="text-gray-800 font-medium">
          USDT-BEP20 链上转账
         </span>
        </div>
        <div class="flex gap-3">
         <span class="text-gray-500 w-20 flex-shrink-0">
          单笔限额：
         </span>
         <span class="text-gray-800">
          $50 ~ $500,000
         </span>
        </div>
        <div class="flex gap-3">
         <span class="text-gray-500 w-20 flex-shrink-0">
          每日限额：
         </span>
         <span class="text-gray-800">
          $2,000,000
         </span>
        </div>
        <div class="flex gap-3">
         <span class="text-gray-500 w-20 flex-shrink-0">
          手续费率：
         </span>
         <span class="text-gray-800">
          0.00%
         </span>
        </div>
        <div class="flex gap-3 col-span-2">
         <span class="text-gray-500 w-20 flex-shrink-0">
          备注：
         </span>
         <span class="text-gray-600">
          -
         </span>
        </div>
       </div>
      </td>
     </tr>
    </tbody>
   </table>
  </div>
  <!-- 分页区域 -->
  <div class="px-6 py-5 border-t border-gray-100 flex items-center justify-between">
   <div class="text-sm text-gray-500">
    共
    <span class="font-medium text-gray-700" id="recordCount">
     12
    </span>
    条记录
   </div>
   <div class="flex items-center gap-2">
    <button class="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 text-gray-400 hover:bg-gray-50 transition-colors text-sm">
     <i class="fa-solid fa-chevron-left text-[10px]">
     </i>
    </button>
    <button class="w-8 h-8 flex items-center justify-center rounded-lg bg-primaryBtn text-white text-sm font-medium shadow-sm">
     1
    </button>
    <button class="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors text-sm">
     2
    </button>
    <button class="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 text-gray-400 hover:bg-gray-50 transition-colors text-sm">
     <i class="fa-solid fa-chevron-right text-[10px]">
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
