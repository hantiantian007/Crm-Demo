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
   <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-4">
    <div class="flex items-center">
     <label class="text-[13px] text-gray-600 w-[70px] shrink-0 text-right mr-3">
      用户类型:
     </label>
     <select class="custom-select flex-1">
      <option>
       不限
      </option>
     </select>
    </div>
    <div class="flex items-center col-span-1 lg:col-span-2 xl:col-span-2">
     <label class="text-[13px] text-gray-600 w-[70px] shrink-0 text-right mr-3">
      查询范围:
     </label>
     <div class="flex items-center gap-2 flex-1">
      <select class="custom-select w-[100px]">
       <option>
        伞下
       </option>
      </select>
      <select class="custom-select flex-1">
       <option>
        请选择上级
       </option>
      </select>
     </div>
    </div>
    <div class="flex items-center">
     <label class="text-[13px] text-gray-600 w-[70px] shrink-0 text-right mr-3">
      MT账号:
     </label>
     <input class="custom-input flex-1" placeholder="请输入" type="text"/>
    </div>
    <div class="flex items-center">
     <label class="text-[13px] text-gray-600 w-[70px] shrink-0 text-right mr-3">
      客户邮箱:
     </label>
     <input class="custom-input flex-1" placeholder="请输入" type="text"/>
    </div>
    <div class="flex items-center">
     <label class="text-[13px] text-gray-600 w-[70px] shrink-0 text-right mr-3">
      成交号:
     </label>
     <input class="custom-input flex-1" placeholder="请输入" type="text"/>
    </div>
    <div class="flex items-center">
     <label class="text-[13px] text-gray-600 w-[70px] shrink-0 text-right mr-3">
      持仓编号:
     </label>
     <input class="custom-input flex-1" placeholder="请输入" type="text"/>
    </div>
    <div class="flex items-center">
     <label class="text-[13px] text-gray-600 w-[70px] shrink-0 text-right mr-3">
      订单编号:
     </label>
     <input class="custom-input flex-1" placeholder="请输入" type="text"/>
    </div>
    <div class="flex items-center">
     <label class="text-[13px] text-gray-600 w-[70px] shrink-0 text-right mr-3">
      趋势:
     </label>
     <select class="custom-select flex-1">
      <option>
       全部
      </option>
     </select>
    </div>
    <div class="flex items-center">
     <label class="text-[13px] text-gray-600 w-[70px] shrink-0 text-right mr-3">
      交易指令:
     </label>
     <select class="custom-select flex-1">
      <option>
       全部
      </option>
     </select>
    </div>
    <div class="flex items-center col-span-1 lg:col-span-2 xl:col-span-2">
     <label class="text-[13px] text-gray-600 w-[70px] shrink-0 text-right mr-3">
      平台时间:
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
     <label class="text-[13px] text-gray-600 w-[70px] shrink-0 text-right mr-3">
      交易品种:
     </label>
     <select class="custom-select flex-1">
      <option>
       全部
      </option>
     </select>
    </div>
   </div>
   <div class="flex items-center justify-end gap-3 mt-4">
    <button class="bg-white border border-primaryBtn text-primaryBtn hover:bg-primaryBtn hover:text-white px-6 py-1.5 rounded text-[13px] transition-colors shadow-sm font-medium">
     搜索
    </button>
    <button class="bg-white border border-gray-300 text-gray-600 hover:bg-gray-50 px-6 py-1.5 rounded text-[13px] transition-colors shadow-sm font-medium">
     重置
    </button>
   </div>
  </div>
  <!-- 数据表格卡片 -->
  <div class="bg-white rounded-xl shadow-sm border border-gray-100 flex flex-col flex-1">
   <!-- 汇总信息与操作区 -->
   <div class="p-5 flex justify-between items-center border-b border-gray-100 flex-wrap gap-4">
    <div class="flex items-center gap-6 text-[13px]">
     <div class="font-bold text-gray-800 text-[15px] mr-2">
      汇总统计
     </div>
     <div class="text-gray-500">
      订单盈亏($):
      <span class="text-primaryBtn font-bold text-lg font-mono">
       93,140.9864
      </span>
     </div>
     <div class="text-gray-500">
      交易量(标准手):
      <span class="text-primaryBtn font-bold text-lg font-mono">
       6371.15
      </span>
     </div>
     <div class="text-gray-500">
      交易量(美分手):
      <span class="text-primaryBtn font-bold text-lg font-mono">
       175.24
      </span>
     </div>
    </div>
    <button class="bg-white border border-primaryBtn text-primaryBtn hover:bg-primaryBtn hover:text-white px-5 py-2 rounded text-[13px] transition-colors shadow-sm font-medium">
     报表导出
    </button>
   </div>
   <!-- 表格区域 -->
   <div class="overflow-x-auto flex-1 no-scrollbar">
    <table class="w-full custom-table min-w-[1300px]">
     <thead class="bg-tableHeader">
      <tr>
       <th class="w-10">
       </th>
       <th>
        MT账号
       </th>
       <th>
        MT类型
       </th>
       <th>
        平台时间
       </th>
       <th>
        客户邮箱
       </th>
       <th>
        成交号
       </th>
       <th>
        持仓编号
       </th>
       <th>
        订单编号
       </th>
       <th>
        交易品种
       </th>
       <th>
        趋势
       </th>
       <th>
        交易指令
       </th>
       <th>
        手数类型
       </th>
       <th>
        交易量(手)
       </th>
       <th>
        价位
       </th>
       <th>
        盈亏($)
       </th>
       <th>
        库存费($)
       </th>
      </tr>
     </thead>
     <tbody>
      <!-- Row 1 -->
      <tr>
       <td class="text-red-500 cursor-pointer hover:text-red-600">
        <i class="fa-solid fa-chevron-right text-[10px]">
        </i>
       </td>
       <td class="font-medium text-gray-700">
        8100199
       </td>
       <td>
        标准账户
       </td>
       <td class="text-gray-500 font-mono">
        2026-09-07 10:50:34
       </td>
       <td class="text-gray-500">
        15291791111@139.com
       </td>
       <td class="font-mono">
        1181456
       </td>
       <td class="font-mono">
        684393
       </td>
       <td class="font-mono">
        684393
       </td>
       <td class="font-medium text-gray-700">
        XAUUSD
       </td>
       <td>
        开仓
       </td>
       <td>
        卖出交易
       </td>
       <td>
        标准手
       </td>
       <td>
        0.1
       </td>
       <td class="font-mono">
        4,398.8600
       </td>
       <td class="font-mono text-gray-500">
        0.0000
       </td>
       <td class="font-mono text-gray-500">
        0.0000
       </td>
      </tr>
      <!-- Row 2 -->
      <tr>
       <td class="text-red-500 cursor-pointer hover:text-red-600">
        <i class="fa-solid fa-chevron-right text-[10px]">
        </i>
       </td>
       <td class="font-medium text-gray-700">
        8300133
       </td>
       <td>
        标准账户
       </td>
       <td class="text-gray-500 font-mono">
        2026-09-07 10:46:00
       </td>
       <td class="text-gray-500">
        Luke@hatcgroup.com
       </td>
       <td class="font-mono">
        1181450
       </td>
       <td class="text-gray-300">
        -
       </td>
       <td class="text-gray-300">
        -
       </td>
       <td class="text-gray-300">
        -
       </td>
       <td class="text-gray-300">
        -
       </td>
       <td>
        结余操作
       </td>
       <td>
        标准手
       </td>
       <td>
        0
       </td>
       <td class="font-mono text-gray-500">
        0.0000
       </td>
       <td class="font-mono text-gray-700">
        0.4000
       </td>
       <td class="font-mono text-gray-500">
        0.0000
       </td>
      </tr>
      <!-- Row 3 -->
      <tr>
       <td class="text-red-500 cursor-pointer hover:text-red-600">
        <i class="fa-solid fa-chevron-right text-[10px]">
        </i>
       </td>
       <td class="font-medium text-gray-700">
        8300162
       </td>
       <td>
        标准账户
       </td>
       <td class="text-gray-500 font-mono">
        2026-09-07 10:46:00
       </td>
       <td class="text-gray-500">
        chtpx@163.com
       </td>
       <td class="font-mono">
        1181449
       </td>
       <td class="text-gray-300">
        -
       </td>
       <td class="text-gray-300">
        -
       </td>
       <td class="text-gray-300">
        -
       </td>
       <td class="text-gray-300">
        -
       </td>
       <td>
        结余操作
       </td>
       <td>
        标准手
       </td>
       <td>
        0
       </td>
       <td class="font-mono text-gray-500">
        0.0000
       </td>
       <td class="font-mono text-gray-700">
        1.0000
       </td>
       <td class="font-mono text-gray-500">
        0.0000
       </td>
      </tr>
      <!-- Row 4 -->
      <tr>
       <td class="text-red-500 cursor-pointer hover:text-red-600">
        <i class="fa-solid fa-chevron-right text-[10px]">
        </i>
       </td>
       <td class="font-medium text-gray-700">
        8300163
       </td>
       <td>
        标准账户
       </td>
       <td class="text-gray-500 font-mono">
        2026-09-07 10:46:00
       </td>
       <td class="text-gray-500">
        15291791111@139.com
       </td>
       <td class="font-mono">
        1181448
       </td>
       <td class="text-gray-300">
        -
       </td>
       <td class="text-gray-300">
        -
       </td>
       <td class="text-gray-300">
        -
       </td>
       <td class="text-gray-300">
        -
       </td>
       <td>
        结余操作
       </td>
       <td>
        标准手
       </td>
       <td>
        0
       </td>
       <td class="font-mono text-gray-500">
        0.0000
       </td>
       <td class="font-mono text-gray-700">
        1.0000
       </td>
       <td class="font-mono text-gray-500">
        0.0000
       </td>
      </tr>
      <!-- Row 5 -->
      <tr>
       <td class="text-red-500 cursor-pointer hover:text-red-600">
        <i class="fa-solid fa-chevron-right text-[10px]">
        </i>
       </td>
       <td class="font-medium text-gray-700">
        8100199
       </td>
       <td>
        标准账户
       </td>
       <td class="text-gray-500 font-mono">
        2026-09-07 10:45:42
       </td>
       <td class="text-gray-500">
        15291791111@139.com
       </td>
       <td class="font-mono">
        1181446
       </td>
       <td class="font-mono">
        684385
       </td>
       <td class="font-mono">
        684386
       </td>
       <td class="font-medium text-gray-700">
        XAUUSD
       </td>
       <td>
        平仓
       </td>
       <td>
        卖出交易
       </td>
       <td>
        标准手
       </td>
       <td>
        0.1
       </td>
       <td class="font-mono">
        4,396.8100
       </td>
       <td class="font-mono text-gray-700">
        26.6000
       </td>
       <td class="font-mono text-gray-500">
        0.0000
       </td>
      </tr>
      <!-- Row 6 -->
      <tr>
       <td class="text-red-500 cursor-pointer hover:text-red-600">
        <i class="fa-solid fa-chevron-right text-[10px]">
        </i>
       </td>
       <td class="font-medium text-gray-700">
        8100199
       </td>
       <td>
        标准账户
       </td>
       <td class="text-gray-500 font-mono">
        2026-09-07 10:44:14
       </td>
       <td class="text-gray-500">
        15291791111@139.com
       </td>
       <td class="font-mono">
        1181445
       </td>
       <td class="font-mono">
        684385
       </td>
       <td class="font-mono">
        684385
       </td>
       <td class="font-medium text-gray-700">
        XAUUSD
       </td>
       <td>
        开仓
       </td>
       <td>
        买入交易
       </td>
       <td>
        标准手
       </td>
       <td>
        0.1
       </td>
       <td class="font-mono">
        4,394.1500
       </td>
       <td class="font-mono text-gray-500">
        0.0000
       </td>
       <td class="font-mono text-gray-500">
        0.0000
       </td>
      </tr>
      <!-- Row 7 -->
      <tr>
       <td class="text-red-500 cursor-pointer hover:text-red-600">
        <i class="fa-solid fa-chevron-right text-[10px]">
        </i>
       </td>
       <td class="font-medium text-gray-700">
        8300133
       </td>
       <td>
        标准账户
       </td>
       <td class="text-gray-500 font-mono">
        2026-09-07 10:41:12
       </td>
       <td class="text-gray-500">
        Luke@hatcgroup.com
       </td>
       <td class="font-mono">
        1181441
       </td>
       <td class="text-gray-300">
        -
       </td>
       <td class="text-gray-300">
        -
       </td>
       <td class="text-gray-300">
        -
       </td>
       <td class="text-gray-300">
        -
       </td>
       <td>
        结余操作
       </td>
       <td>
        标准手
       </td>
       <td>
        0
       </td>
       <td class="font-mono text-gray-500">
        0.0000
       </td>
       <td class="font-mono text-gray-700">
        0.4000
       </td>
       <td class="font-mono text-gray-500">
        0.0000
       </td>
      </tr>
      <!-- Row 8 -->
      <tr>
       <td class="text-red-500 cursor-pointer hover:text-red-600">
        <i class="fa-solid fa-chevron-right text-[10px]">
        </i>
       </td>
       <td class="font-medium text-gray-700">
        8300162
       </td>
       <td>
        标准账户
       </td>
       <td class="text-gray-500 font-mono">
        2026-09-07 10:41:12
       </td>
       <td class="text-gray-500">
        chtpx@163.com
       </td>
       <td class="font-mono">
        1181440
       </td>
       <td class="text-gray-300">
        -
       </td>
       <td class="text-gray-300">
        -
       </td>
       <td class="text-gray-300">
        -
       </td>
       <td class="text-gray-300">
        -
       </td>
       <td>
        结余操作
       </td>
       <td>
        标准手
       </td>
       <td>
        0
       </td>
       <td class="font-mono text-gray-500">
        0.0000
       </td>
       <td class="font-mono text-gray-700">
        1.0000
       </td>
       <td class="font-mono text-gray-500">
        0.0000
       </td>
      </tr>
      <!-- Row 9 -->
      <tr>
       <td class="text-red-500 cursor-pointer hover:text-red-600">
        <i class="fa-solid fa-chevron-right text-[10px]">
        </i>
       </td>
       <td class="font-medium text-gray-700">
        8300163
       </td>
       <td>
        标准账户
       </td>
       <td class="text-gray-500 font-mono">
        2026-09-07 10:41:12
       </td>
       <td class="text-gray-500">
        15291791111@139.com
       </td>
       <td class="font-mono">
        1181439
       </td>
       <td class="text-gray-300">
        -
       </td>
       <td class="text-gray-300">
        -
       </td>
       <td class="text-gray-300">
        -
       </td>
       <td class="text-gray-300">
        -
       </td>
       <td>
        结余操作
       </td>
       <td>
        标准手
       </td>
       <td>
        0
       </td>
       <td class="font-mono text-gray-500">
        0.0000
       </td>
       <td class="font-mono text-gray-700">
        1.0000
       </td>
       <td class="font-mono text-gray-500">
        0.0000
       </td>
      </tr>
     </tbody>
    </table>
   </div>
   <!-- 分页 -->
   <div class="px-6 py-4 border-t border-gray-100 flex items-center justify-between bg-white">
    <div class="text-sm text-gray-500">
     共
     <span class="font-medium text-gray-700">
      9
     </span>
     条记录
    </div>
    <div class="flex items-center gap-2">
     <button class="px-3 py-1 text-sm border border-gray-200 rounded text-gray-400 cursor-not-allowed">
      上一页
     </button>
     <button class="px-3 py-1 text-sm bg-menuActive text-white rounded">
      1
     </button>
     <button class="px-3 py-1 text-sm border border-gray-200 rounded text-gray-600 hover:bg-gray-50 transition-colors">
      下一页
     </button>
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
