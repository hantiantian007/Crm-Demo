<template>
  <div class="flex h-full bg-mainBg overflow-hidden">
    <div class="flex-1 flex flex-col min-w-0 bg-gray-50 overflow-hidden p-4 custom-scrollbar overflow-y-auto">
      <div class="flex-1 p-4 bg-gray-50 flex gap-4 overflow-hidden">
 <!-- 左侧关系树 -->
 <div class="w-64 bg-white border border-gray-200 rounded shadow-sm flex flex-col shrink-0 overflow-hidden">
  <!-- 顶部操作区 -->
  <div class="p-3 border-b border-gray-100 flex gap-2 items-center bg-gray-50/50">
   <div class="flex-1 flex bg-white border border-gray-200 rounded overflow-hidden">
    <input class="w-full px-2 py-1.5 text-xs outline-none" placeholder="搜索代理/客户..." type="text"/>
    <button class="px-2 text-gray-400 hover:text-[#d1a84f] border-l border-gray-200">
     <i class="fas fa-search">
     </i>
    </button>
   </div>
  </div>
  <!-- 树列表 -->
  <div class="flex-1 overflow-y-auto p-2 text-[13px] text-gray-600">
   <!-- 节点: 华安 -->
   <div class="flex items-center justify-between py-1.5 px-2 hover:bg-gray-50 rounded cursor-pointer group" id="tree-285">
    <div class="flex items-center gap-2">
     <i class="fa-solid fa-caret-down text-gray-400 w-3 text-center cursor-pointer">
     </i>
     <span class="text-gray-700">
      285-华安
     </span>
    </div>
    <span class="text-[10px] text-blue-500 bg-blue-50 px-1.5 py-0.5 rounded">
     代理
    </span>
   </div>
   <!-- 节点: Luke -->
   <div class="flex items-center justify-between py-1.5 px-2 pl-6 hover:bg-gray-50 rounded cursor-pointer group">
    <div class="flex items-center gap-2">
     <i class="fa-solid fa-caret-right text-gray-300 w-3 text-center cursor-pointer">
     </i>
     <span class="text-gray-700">
      29-Luke
     </span>
    </div>
    <span class="text-[10px] text-blue-500 bg-blue-50 px-1.5 py-0.5 rounded">
     代理
    </span>
   </div>
   <!-- 节点: jack (Selected) -->
   <div class="flex items-center justify-between py-1.5 px-2 pl-6 bg-[#d1a84f]/10 rounded cursor-pointer group" id="tree-42">
    <div class="flex items-center gap-2">
     <i class="fa-solid fa-caret-down text-[#d1a84f] w-3 text-center cursor-pointer">
     </i>
     <span class="text-[#d1a84f] font-medium">
      42-jack
     </span>
    </div>
    <span class="text-[10px] text-[#d1a84f] bg-[#d1a84f]/20 px-1.5 py-0.5 rounded">
     代理
    </span>
   </div>
   <!-- 子节点 -->
   <div class="flex items-center justify-between py-1.5 px-2 pl-10 hover:bg-gray-50 rounded cursor-pointer group">
    <div class="flex items-center gap-2">
     <i class="fa-solid fa-circle text-gray-200 text-[6px] w-3 text-center">
     </i>
     <span class="text-gray-700">
      70-张生龙
     </span>
    </div>
    <span class="text-[10px] text-orange-500 bg-orange-50 px-1.5 py-0.5 rounded">
     直客
    </span>
   </div>
   <div class="flex items-center justify-between py-1.5 px-2 pl-10 hover:bg-gray-50 rounded cursor-pointer group">
    <div class="flex items-center gap-2">
     <i class="fa-solid fa-circle text-gray-200 text-[6px] w-3 text-center">
     </i>
     <span class="text-gray-700">
      319-黎富英
     </span>
    </div>
    <span class="text-[10px] text-orange-500 bg-orange-50 px-1.5 py-0.5 rounded">
     直客
    </span>
   </div>
   <div class="flex items-center justify-between py-1.5 px-2 pl-10 hover:bg-gray-50 rounded cursor-pointer group">
    <div class="flex items-center gap-2">
     <i class="fa-solid fa-circle text-gray-200 text-[6px] w-3 text-center">
     </i>
     <span class="text-gray-700">
      329-魏正博
     </span>
    </div>
    <span class="text-[10px] text-orange-500 bg-orange-50 px-1.5 py-0.5 rounded">
     直客
    </span>
   </div>
   <div class="flex items-center justify-between py-1.5 px-2 pl-10 hover:bg-gray-50 rounded cursor-pointer group">
    <div class="flex items-center gap-2">
     <i class="fa-solid fa-circle text-gray-200 text-[6px] w-3 text-center">
     </i>
     <span class="text-gray-700">
      468-孙敏宏
     </span>
    </div>
    <span class="text-[10px] text-blue-500 bg-blue-50 px-1.5 py-0.5 rounded">
     代理
    </span>
   </div>
   <div class="flex items-center justify-between py-1.5 px-2 pl-10 hover:bg-gray-50 rounded cursor-pointer group">
    <div class="flex items-center gap-2">
     <i class="fa-solid fa-circle text-gray-200 text-[6px] w-3 text-center">
     </i>
     <span class="text-gray-700">
      528-谢兰香
     </span>
    </div>
    <span class="text-[10px] text-blue-500 bg-blue-50 px-1.5 py-0.5 rounded">
     代理
    </span>
   </div>
   <!-- 其他节点 -->
   <div class="flex items-center justify-between py-1.5 px-2 pl-6 hover:bg-gray-50 rounded cursor-pointer group">
    <div class="flex items-center gap-2">
     <i class="fa-solid fa-caret-right text-gray-300 w-3 text-center cursor-pointer">
     </i>
     <span class="text-gray-700">
      43-汪晋霖
     </span>
    </div>
    <span class="text-[10px] text-blue-500 bg-blue-50 px-1.5 py-0.5 rounded">
     代理
    </span>
   </div>
   <div class="flex items-center justify-between py-1.5 px-2 pl-6 hover:bg-gray-50 rounded cursor-pointer group">
    <div class="flex items-center gap-2">
     <i class="fa-solid fa-caret-right text-gray-300 w-3 text-center cursor-pointer">
     </i>
     <span class="text-gray-700">
      161-Mikey
     </span>
    </div>
    <span class="text-[10px] text-blue-500 bg-blue-50 px-1.5 py-0.5 rounded">
     代理
    </span>
   </div>
   <!-- 直客示例 -->
   <div class="flex items-center justify-between py-1.5 px-2 hover:bg-gray-50 rounded cursor-pointer group">
    <div class="flex items-center gap-2">
     <i class="fa-solid fa-circle text-gray-200 text-[6px] w-3 text-center">
     </i>
     <span class="text-gray-700">
      30-张三
     </span>
    </div>
    <span class="text-[10px] text-orange-500 bg-orange-50 px-1.5 py-0.5 rounded">
     直客
    </span>
   </div>
   <div class="flex items-center justify-between py-1.5 px-2 hover:bg-gray-50 rounded cursor-pointer group">
    <div class="flex items-center gap-2">
     <i class="fa-solid fa-circle text-gray-200 text-[6px] w-3 text-center">
     </i>
     <span class="text-gray-700">
      55-ww3
     </span>
    </div>
    <span class="text-[10px] text-orange-500 bg-orange-50 px-1.5 py-0.5 rounded">
     直客
    </span>
   </div>
  </div>
 </div>
 <!-- 右侧详情与数据 -->
 <!-- 右侧详情与数据 -->
 <div class="flex-1 flex flex-col gap-4 overflow-y-auto no-scrollbar">
  <!-- 搜索过滤卡片 -->
  <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
   <h3 class="font-bold text-gray-800 mb-5 text-[15px]">
    搜索
   </h3>
   <div class="grid grid-cols-5 gap-4 mb-4">
    <div class="flex items-center">
     <label class="text-[13px] text-gray-600 w-20 shrink-0 text-right mr-3">
      MT账号:
     </label>
     <input class="custom-input" placeholder="请输入不超过50字符" type="text"/>
    </div>
    <div class="flex items-center">
     <label class="text-[13px] text-gray-600 w-20 shrink-0 text-right mr-3">
      客户姓名:
     </label>
     <input class="custom-input" placeholder="请输入不超过50字符" type="text"/>
    </div>
    <div class="flex items-center">
     <label class="text-[13px] text-gray-600 w-20 shrink-0 text-right mr-3">
      持仓编号:
     </label>
     <input class="custom-input" placeholder="请输入不超过50字符" type="text"/>
    </div>
    <div class="flex items-center">
     <label class="text-[13px] text-gray-600 w-20 shrink-0 text-right mr-3">
      交易品种:
     </label>
     <select class="custom-select">
      <option>
       全部
      </option>
     </select>
    </div>
   </div>
   <div class="grid grid-cols-5 gap-4 mb-4">
    <div class="flex items-center">
     <label class="text-[13px] text-gray-600 w-20 shrink-0 text-right mr-3">
      买卖类型:
     </label>
     <select class="custom-select">
      <option>
       全部
      </option>
     </select>
    </div>
    <div class="flex items-center">
     <label class="text-[13px] text-gray-600 w-20 shrink-0 text-right mr-3">
      订单编号:
     </label>
     <input class="custom-input" placeholder="请输入不超过50字符" type="text"/>
    </div>
    <div class="flex items-center col-span-2">
     <label class="text-[13px] text-gray-600 w-20 shrink-0 text-right mr-3">
      开仓日期:
     </label>
     <div class="flex items-center w-full">
      <input class="custom-input rounded-r-none border-r-0 text-center" placeholder="开始日期" type="text"/>
      <span class="px-3 py-[5px] bg-gray-50 border-y border-gray-200 text-[13px] text-gray-400">
       到
      </span>
      <input class="custom-input rounded-l-none border-l-0 text-center" placeholder="结束日期" type="text"/>
     </div>
    </div>
    <div class="flex items-center">
     <label class="text-[13px] text-gray-600 w-24 shrink-0 text-right mr-3">
      关系树查询:
     </label>
     <select class="custom-select text-gray-400">
      <option>
       请选择
      </option>
     </select>
    </div>
   </div>
   <div class="flex items-center ml-24 gap-3">
    <button class="bg-primaryBtn hover:bg-primaryBtnHover text-white px-6 py-1.5 rounded text-[13px] transition-colors shadow-sm">
     搜索
    </button>
    <button class="bg-white hover:bg-gray-50 text-gray-600 border border-gray-200 px-6 py-1.5 rounded text-[13px] transition-colors shadow-sm">
     重置
    </button>
   </div>
  </div>
  <!-- 数据表格卡片 -->
  <div class="bg-white rounded-xl shadow-sm border border-gray-100 flex flex-col flex-1">
   <!-- 汇总信息与操作区 -->
   <div class="p-5 flex justify-between items-center border-b border-gray-100">
    <div class="flex items-center gap-6 text-[13px]">
     <div class="font-bold text-gray-800 text-[15px] mr-2">
      汇总统计
     </div>
     <div class="text-gray-500">
      交易手数总计(手):
      <span class="text-primaryBtn font-bold text-lg">
       657.28
      </span>
     </div>
     <div class="text-gray-500">
      盈亏总计($):
      <span class="text-primaryBtn font-bold text-lg">
       1,945,223.51
      </span>
     </div>
     <div class="text-gray-500">
      库存费总计($):
      <span class="text-gray-700 font-bold text-lg">
       -2,330.55
      </span>
     </div>
     <div class="text-gray-500">
      手续费总计($):
      <span class="text-gray-700 font-bold text-lg">
       0.00
      </span>
     </div>
    </div>
    <button class="bg-primaryBtn hover:bg-primaryBtnHover text-white px-5 py-2 rounded text-[13px] transition-colors shadow-sm">
     报表导出
    </button>
   </div>
   <!-- 表格区域 -->
   <div class="overflow-x-auto flex-1">
    <table class="w-full custom-table">
     <thead class="bg-tableHeader">
      <tr>
       <th>
        客户姓名
       </th>
       <th>
        MT账号
       </th>
       <th>
        订单编号
       </th>
       <th>
        持仓编号
       </th>
       <th>
        开仓时间
       </th>
       <th>
        交易品种
       </th>
       <th>
        买卖类型
       </th>
       <th>
        交易手数
       </th>
       <th>
        开仓价格
       </th>
       <th>
        平仓时间
       </th>
       <th>
        平仓价格
       </th>
       <th>
        持仓时间
       </th>
       <th>
        手续费($)
       </th>
       <th>
        库存费($)
       </th>
       <th>
        盈亏($)
       </th>
       <th>
        注释
       </th>
      </tr>
     </thead>
     <tbody>
      <tr>
       <td>
        James Sun
       </td>
       <td>
        8100140
       </td>
       <td>
        524076
       </td>
       <td>
        524076
       </td>
       <td>
        2026-06-12 04:43:04
       </td>
       <td>
        XAUUSD
       </td>
       <td>
        卖出/SELL
       </td>
       <td>
        0.05
       </td>
       <td>
        4,182.33
       </td>
       <td>
        -
       </td>
       <td>
        -
       </td>
       <td>
        -
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
        SA_TA
       </td>
      </tr>
      <tr>
       <td>
        James Sun
       </td>
       <td>
        8100140
       </td>
       <td>
        524064
       </td>
       <td>
        524064
       </td>
       <td>
        2026-06-12 04:39:50
       </td>
       <td>
        XAUUSD
       </td>
       <td>
        卖出/SELL
       </td>
       <td>
        0.03
       </td>
       <td>
        4,178.90
       </td>
       <td>
        -
       </td>
       <td>
        -
       </td>
       <td>
        -
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
        SA_TA
       </td>
      </tr>
      <tr>
       <td>
        James Sun
       </td>
       <td>
        8100140
       </td>
       <td>
        524057
       </td>
       <td>
        524057
       </td>
       <td>
        2026-06-12 04:39:04
       </td>
       <td>
        XAUUSD
       </td>
       <td>
        卖出/SELL
       </td>
       <td>
        0.02
       </td>
       <td>
        4,175.71
       </td>
       <td>
        -
       </td>
       <td>
        -
       </td>
       <td>
        -
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
        SA_TA
       </td>
      </tr>
      <tr>
       <td>
        James Sun
       </td>
       <td>
        8100140
       </td>
       <td>
        524054
       </td>
       <td>
        524054
       </td>
       <td>
        2026-06-12 04:37:15
       </td>
       <td>
        XAUUSD
       </td>
       <td>
        卖出/SELL
       </td>
       <td>
        0.01
       </td>
       <td>
        4,172.30
       </td>
       <td>
        -
       </td>
       <td>
        -
       </td>
       <td>
        -
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
        SA_TA
       </td>
      </tr>
      <tr>
       <td>
        James Sun
       </td>
       <td>
        8100140
       </td>
       <td>
        524052
       </td>
       <td>
        524043
       </td>
       <td>
        2026-06-12 04:36:18
       </td>
       <td>
        XAUUSD
       </td>
       <td>
        买入/BUY
       </td>
       <td>
        0.01
       </td>
       <td>
        4,174.85
       </td>
       <td>
        2026-06-12 09:37:17
       </td>
       <td>
        4,171.84
       </td>
       <td>
        5小时0分钟59秒
       </td>
       <td>
        0.00
       </td>
       <td>
        0.00
       </td>
       <td>
        3.01
       </td>
       <td class="text-gray-400">
        [tp 4171.85]
       </td>
      </tr>
      <tr>
       <td>
        James Sun
       </td>
       <td>
        8100140
       </td>
       <td>
        524043
       </td>
       <td>
        524043
       </td>
       <td>
        2026-06-12 04:36:18
       </td>
       <td>
        XAUUSD
       </td>
       <td>
        卖出/SELL
       </td>
       <td>
        0.01
       </td>
       <td>
        4,174.85
       </td>
       <td>
        -
       </td>
       <td>
        -
       </td>
       <td>
        -
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
        SA_TA
       </td>
      </tr>
      <tr>
       <td>
        James Sun
       </td>
       <td>
        8100140
       </td>
       <td>
        524041
       </td>
       <td>
        524038
       </td>
       <td>
        2026-06-12 04:35:39
       </td>
       <td>
        XAUUSD
       </td>
       <td>
        买入/BUY
       </td>
       <td>
        0.01
       </td>
       <td>
        4,178.55
       </td>
       <td>
        2026-06-12 09:36:19
       </td>
       <td>
        4,175.48
       </td>
       <td>
        5小时0分钟40秒
       </td>
       <td>
        0.00
       </td>
       <td>
        0.00
       </td>
       <td>
        3.07
       </td>
       <td class="text-gray-400">
        [tp 4175.55]
       </td>
      </tr>
      <tr>
       <td>
        James Sun
       </td>
       <td>
        8100140
       </td>
       <td>
        524038
       </td>
       <td>
        524038
       </td>
       <td>
        2026-06-12 04:35:39
       </td>
       <td>
        XAUUSD
       </td>
       <td>
        卖出/SELL
       </td>
       <td>
        0.01
       </td>
       <td>
        4,178.55
       </td>
       <td>
        -
       </td>
       <td>
        -
       </td>
       <td>
        -
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
        SA_TA
       </td>
      </tr>
      <tr>
       <td>
        James Sun
       </td>
       <td>
        8100140
       </td>
       <td>
        524034
       </td>
       <td>
        524027
       </td>
       <td>
        2026-06-12 04:33:32
       </td>
       <td>
        XAUUSD
       </td>
       <td>
        买入/BUY
       </td>
       <td>
        0.01
       </td>
       <td>
        4,180.56
       </td>
       <td>
        2026-06-12 09:35:04
       </td>
       <td>
        4,177.46
       </td>
       <td>
        5小时1分钟32秒
       </td>
       <td>
        0.00
       </td>
       <td>
        0.00
       </td>
       <td>
        3.10
       </td>
       <td class="text-gray-400">
        [tp 4177.56]
       </td>
      </tr>
      <tr>
       <td>
        James Sun
       </td>
       <td>
        8100140
       </td>
       <td>
        524027
       </td>
       <td>
        524027
       </td>
       <td>
        2026-06-12 04:33:32
       </td>
       <td>
        XAUUSD
       </td>
       <td>
        卖出/SELL
       </td>
       <td>
        0.01
       </td>
       <td>
        4,180.56
       </td>
       <td>
        -
       </td>
       <td>
        -
       </td>
       <td>
        -
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
        SA_TA
       </td>
      </tr>
      <tr>
       <td>
        James Sun
       </td>
       <td>
        8100140
       </td>
       <td>
        524004
       </td>
       <td>
        523986
       </td>
       <td>
        2026-06-12 04:18:35
       </td>
       <td>
        XAUUSD
       </td>
       <td>
        买入/BUY
       </td>
       <td>
        0.1
       </td>
       <td>
        4,189.13
       </td>
       <td>
        2026-06-12 09:25:36
       </td>
       <td>
        4,185.48
       </td>
       <td>
        5小时7分钟1秒
       </td>
       <td>
        0.00
       </td>
       <td>
        0.00
       </td>
       <td>
        36.50
       </td>
       <td class="text-gray-400">
        [tp 4186.13]
       </td>
      </tr>
      <tr>
       <td>
        James Sun
       </td>
       <td>
        8100140
       </td>
       <td>
        523986
       </td>
       <td>
        523986
       </td>
       <td>
        2026-06-12 04:18:35
       </td>
       <td>
        XAUUSD
       </td>
       <td>
        卖出/SELL
       </td>
       <td>
        0.1
       </td>
       <td>
        4,189.13
       </td>
       <td>
        -
       </td>
       <td>
        -
       </td>
       <td>
        -
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
        SA_TA
       </td>
      </tr>
      <tr>
       <td>
        曾晓
       </td>
       <td>
        8100340
       </td>
       <td>
        523944
       </td>
       <td>
        523944
       </td>
       <td>
        2026-06-12 04:09:55
       </td>
       <td>
        XAUUSD
       </td>
       <td>
        卖出/SELL
       </td>
       <td>
        0.01
       </td>
       <td>
        4,192.91
       </td>
       <td>
        -
       </td>
       <td>
        -
       </td>
       <td>
        -
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
        -
       </td>
      </tr>
     </tbody>
    </table>
   </div>
   <!-- 分页 -->
   <div class="px-5 py-4 border-t border-gray-100 flex items-center justify-between bg-white mt-auto">
    <div class="text-[13px] text-gray-500">
     显示第 1 至 13 项结果，共 13 项
    </div>
    <div class="flex items-center gap-2">
     <select class="border border-gray-200 rounded px-2 py-1 text-[13px] outline-none focus:border-primaryBtn">
      <option>
       10 条/页
      </option>
      <option selected="">
       20 条/页
      </option>
      <option>
       50 条/页
      </option>
     </select>
     <div class="flex items-center border border-gray-200 rounded overflow-hidden">
      <button class="px-3 py-1 bg-gray-50 text-gray-400 cursor-not-allowed border-r border-gray-200 text-[13px]">
       <i class="fas fa-chevron-left">
       </i>
      </button>
      <button class="px-3 py-1 bg-primaryBtn text-white font-medium text-[13px]">
       1
      </button>
      <button class="px-3 py-1 bg-gray-50 text-gray-400 cursor-not-allowed border-l border-gray-200 text-[13px]">
       <i class="fas fa-chevron-right">
       </i>
      </button>
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
