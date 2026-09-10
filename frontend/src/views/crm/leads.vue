<template>
  <div class="flex h-full bg-mainBg overflow-hidden">
    <div class="flex-1 flex flex-col min-w-0 bg-gray-50 overflow-hidden p-4 custom-scrollbar overflow-y-auto">
      <div class="flex-1 p-4 overflow-y-auto bg-white flex flex-col">
 <!-- 分配状态 Tabs -->
 <div class="flex border-b border-gray-200 mb-4 px-2 overflow-x-auto whitespace-nowrap no-scrollbar" id="leads-tabs">
  <button class="pb-2.5 px-4 text-sm font-medium text-primaryBtn border-b-2 border-primaryBtn transition-colors" data-tab="all">
   全部
  </button>
  <button class="pb-2.5 px-4 text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300 border-b-2 border-transparent transition-colors" data-tab="assigned">
   跟进中
  </button>
  <button class="pb-2.5 px-4 text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300 border-b-2 border-transparent transition-colors relative role-manager-only" data-tab="unassigned">
   待分配
   <span class="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-red-500 text-white text-[10px] px-1.5 py-0.5 rounded-full">
    1
   </span>
  </button>
  <button class="pb-2.5 px-4 text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300 border-b-2 border-transparent transition-colors" data-tab="public">
   退回公海
  </button>
  <button class="pb-2.5 px-4 text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300 border-b-2 border-transparent transition-colors" data-tab="invalid">
   无效线索
  </button>
  <button class="pb-2.5 px-4 text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300 border-b-2 border-transparent transition-colors" data-tab="converted">
   已转化
  </button>
 </div>
 <!-- 1. 顶部搜索过滤区 (匹配截图样式) -->
 <div class="flex flex-wrap items-center gap-4 mb-4 bg-gray-100/70 p-3 rounded">
  <div class="flex items-center gap-2">
   <span class="text-gray-700 text-sm font-medium">
    客户名称:
   </span>
   <input class="px-3 py-1.5 text-sm outline-none border border-gray-200 rounded w-32 bg-white" placeholder="请输入分组名称" type="text"/>
  </div>
  <div class="flex items-center gap-2">
   <span class="text-gray-700 text-sm font-medium">
    客户邮箱:
   </span>
   <input class="px-3 py-1.5 text-sm outline-none border border-gray-200 rounded w-40 bg-white" placeholder="请输入客户邮箱" type="text"/>
  </div>
  <div class="flex items-center gap-2">
   <span class="text-gray-700 text-sm font-medium">
    联系方式:
   </span>
   <input class="px-3 py-1.5 text-sm outline-none border border-gray-200 rounded w-32 bg-white" placeholder="请输入账号名称" type="text"/>
  </div>
  <div class="flex items-center gap-2">
   <span class="text-gray-700 text-sm font-medium">
    咨询内容:
   </span>
   <select class="px-3 py-1.5 text-sm outline-none border border-gray-200 rounded w-28 bg-white cursor-pointer text-gray-500">
    <option value="">
     全部
    </option>
    <option value="1">
     成为代理
    </option>
    <option value="2">
     政策了解
    </option>
    <option value="3">
     个人交易
    </option>
    <option value="4">
     其他
    </option>
   </select>
  </div>
  <div class="flex items-center gap-2">
   <span class="text-gray-700 text-sm font-medium">
    信息来源:
   </span>
   <select class="px-3 py-1.5 text-sm outline-none border border-gray-200 rounded w-28 bg-white cursor-pointer text-gray-500">
    <option value="">
     全部
    </option>
    <option value="website">
     官网访问
    </option>
    <option value="social">
     社交平台
    </option>
    <option value="referral">
     客户推荐
    </option>
    <option value="online_event">
     线上活动
    </option>
    <option value="offline_event">
     线下金融活动
    </option>
    <option value="news_site">
     金融资讯网站
    </option>
    <option value="other">
     其他渠道
    </option>
   </select>
  </div>
  <div class="flex items-center gap-2">
   <span class="text-gray-700 text-sm font-medium">
    线索热度:
   </span>
   <select class="px-3 py-1.5 text-sm outline-none border border-gray-200 rounded w-24 bg-white cursor-pointer text-gray-500">
    <option value="">
     全部
    </option>
    <option value="hot">
     🔥 高意向
    </option>
    <option value="warm">
     🌟 中意向
    </option>
    <option value="cold">
     ❄️ 低意向
    </option>
   </select>
  </div>
  <div class="flex items-center gap-2 role-manager-only">
   <span class="text-gray-700 text-sm font-medium">
    归属销售:
   </span>
   <select class="px-3 py-1.5 text-sm outline-none border border-gray-200 rounded w-28 bg-white cursor-pointer text-gray-500">
    <option value="">
     全部
    </option>
    <option value="unassigned">
     未分配
    </option>
    <option value="s1">
     张三
    </option>
    <option value="s2">
     李四
    </option>
   </select>
  </div>
  <div class="flex items-center gap-2">
   <span class="text-gray-700 text-sm font-medium">
    跟进日期:
   </span>
   <div class="flex items-center border border-gray-200 rounded bg-white overflow-hidden focus-within:border-[#41B8AF] transition-colors">
    <input class="px-2 py-1.5 text-sm outline-none text-gray-600 bg-transparent w-[115px] cursor-pointer" type="date"/>
    <span class="text-gray-400 px-1">
     -
    </span>
    <input class="px-2 py-1.5 text-sm outline-none text-gray-600 bg-transparent w-[115px] cursor-pointer" type="date"/>
   </div>
  </div>
  <div class="flex items-center gap-2">
   <span class="text-gray-700 text-sm font-medium">
    下次跟进:
   </span>
   <div class="flex items-center border border-gray-200 rounded bg-white overflow-hidden focus-within:border-[#41B8AF] transition-colors">
    <input class="px-2 py-1.5 text-sm outline-none text-gray-600 bg-transparent w-[115px] cursor-pointer" type="date"/>
    <span class="text-gray-400 px-1">
     -
    </span>
    <input class="px-2 py-1.5 text-sm outline-none text-gray-600 bg-transparent w-[115px] cursor-pointer" type="date"/>
   </div>
  </div>
  <!-- 查询按钮 -->
  <div class="ml-auto">
   <button class="bg-primaryBtn hover:bg-primaryBtnHover text-white px-6 py-1.5 rounded text-sm transition-colors shadow-sm font-medium">
    查询
   </button>
  </div>
 </div>
 <!-- 2. 数据表格区 -->
 <!-- 批量操作条 -->
 <div class="mb-3 flex items-center justify-between">
  <div class="flex items-center gap-3">
   <button class="bg-primaryBtn hover:bg-primaryBtnHover text-white px-4 py-1.5 rounded text-sm transition-colors shadow-sm font-medium flex items-center gap-1.5 role-manager-only">
    <i class="fas fa-plus">
    </i>
    销售录入
   </button>
   <button class="bg-[#F59E0B] hover:bg-[#D97706] text-white px-4 py-1.5 rounded text-sm transition-colors shadow-sm font-medium flex items-center gap-1.5 role-manager-only">
    <i class="fas fa-headset">
    </i>
    客服录入
   </button>
   <button class="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-1.5 rounded text-sm transition-colors shadow-sm font-medium flex items-center gap-1.5 role-manager-only">
    <i class="fas fa-users-cog">
    </i>
    批量分配
   </button>
   <button class="bg-teal-500 hover:bg-teal-600 text-white px-4 py-1.5 rounded text-sm transition-colors shadow-sm font-medium flex items-center gap-1.5 role-manager-only">
    <i class="fas fa-chart-pie">
    </i>
    留资看板
   </button>
  </div>
  <div>
   <button class="bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 px-4 py-1.5 rounded text-sm transition-colors shadow-sm font-medium flex items-center gap-1.5">
    <i class="fas fa-download">
    </i>
    导出报表
   </button>
  </div>
 </div>
 <div class="flex-1 overflow-auto border border-gray-200">
  <div class="min-w-max">
   <table class="w-full custom-table text-sm whitespace-nowrap">
    <thead class="bg-tableHeader sticky top-0 z-10">
     <tr>
      <th class="w-12 text-center role-manager-only">
       <input class="w-4 h-4 rounded border-gray-300 focus:ring-indigo-500 text-indigo-600 cursor-pointer" id="selectAll" type="checkbox"/>
      </th>
      <th class="w-24">
       姓名
      </th>
      <th class="w-48">
       邮箱
      </th>
      <th class="w-32">
       联系电话
      </th>
      <th class="w-32">
       微信
      </th>
      <th class="w-32">
       WhatsApp
      </th>
      <th class="w-32">
       其他联系方式
      </th>
      <th class="w-32">
       咨询内容
      </th>
      <th class="w-24">
       信息来源
      </th>
      <th class="w-24">
       <span class="relative inline-flex items-center gap-1 group">
        <span>
         客户来源
        </span>
        <i class="fa-solid fa-circle-info text-[11px] text-white/80 cursor-help">
        </i>
        <span class="pointer-events-none absolute left-1/2 top-full z-20 mt-2 hidden w-52 -translate-x-1/2 rounded bg-gray-900 px-3 py-2 text-left text-[11px] font-normal leading-4 text-white shadow-lg group-hover:block">
         客户来源代表客户从哪里输入的留资信息
        </span>
       </span>
      </th>
      <th class="w-20">
       留资次数
      </th>
      <th class="w-24">
       线索热度
      </th>
      <th class="w-32">
       有无关联代理
      </th>
      <th class="w-24">
       归属销售
      </th>
      <th class="w-40">
       申请时间
      </th>
      <th class="w-48">
       最新跟进内容
      </th>
      <th class="w-40">
       最新跟进时间
      </th>
      <th class="w-40">
       下次跟进时间
      </th>
      <th class="w-56">
       操作
      </th>
     </tr>
    </thead>
    <tbody>
     <!-- 数据行 1 (跟进中) -->
     <tr class="data-row-assigned">
      <td class="text-center role-manager-only">
       <input class="w-4 h-4 rounded border-gray-300 focus:ring-indigo-500 text-indigo-600 cursor-pointer row-checkbox" disabled="" title="已分配状态无法批量选择" type="checkbox"/>
      </td>
      <td>
       张三
      </td>
      <td>
       XXXXX@qq.com
      </td>
      <td>
       15213099999
      </td>
      <td>
       wx_zhangsan
      </td>
      <td>
       +852 12345678
      </td>
      <td>
       -
      </td>
      <td>
       政策了解
      </td>
      <td>
       官网访问
      </td>
      <td>
       官网录入
      </td>
      <td>
       <span class="text-blue-600 font-medium">
        3 次
       </span>
      </td>
      <td>
       <span class="text-red-500 font-bold" title="高意向">
        <i class="fas fa-fire">
        </i>
        高
       </span>
      </td>
      <td>
       <span class="text-green-600 font-medium">
        有 (王代理)
       </span>
      </td>
      <td class="font-medium text-gray-800">
       李四
      </td>
      <td>
       2025-01-01 21:22:22
      </td>
      <td>
       这是客服自己填写
      </td>
      <td>
       2025-01-01 21:22:22
      </td>
      <td class="text-red-500 font-medium whitespace-nowrap">
       <i class="fas fa-bell mr-1 animate-pulse">
       </i>
       明天 10:00
      </td>
      <td class="text-sm whitespace-nowrap">
       <button class="text-indigo-500 hover:text-indigo-700 mx-1 role-manager-only font-medium">
        <i class="fas fa-user-plus mr-1">
        </i>
        重新分配
       </button>
       <button class="mx-1 font-medium text-blue-500 hover:text-blue-700">
        <i class="fas fa-file-alt mr-1">
        </i>
        详情
       </button>
       <button class="text-green-600 hover:text-green-800 mx-1 font-medium">
        <i class="fas fa-edit mr-1">
        </i>
        跟进
       </button>
       <button class="text-orange-500 hover:text-orange-700 mx-1 font-medium">
        <i class="fas fa-recycle mr-1">
        </i>
        退回公海
       </button>
      </td>
     </tr>
     <!-- 数据行 2 (待分配) -->
     <tr class="data-row-unassigned role-manager-only">
      <td class="text-center role-manager-only">
       <input class="w-4 h-4 rounded border-gray-300 focus:ring-indigo-500 text-indigo-600 cursor-pointer row-checkbox" type="checkbox"/>
      </td>
      <td>
       王五
      </td>
      <td>
       wangwu@163.com
      </td>
      <td>
       13800138000
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
       成为代理
      </td>
      <td>
       其他渠道
      </td>
      <td>
       销售录入
      </td>
      <td>
       <span class="text-blue-600 font-medium">
        1 次
       </span>
      </td>
      <td>
       <span class="text-orange-400 font-bold" title="中意向">
        <i class="fas fa-star">
        </i>
        中
       </span>
      </td>
      <td>
       <span class="text-gray-400">
        无
       </span>
      </td>
      <td class="text-gray-400">
       -
      </td>
      <td>
       2025-01-01 21:22:22
      </td>
      <td class="text-gray-400">
       -
      </td>
      <td class="text-gray-400">
       -
      </td>
      <td class="text-gray-400">
       -
      </td>
      <td class="text-sm whitespace-nowrap">
       <button class="text-indigo-500 hover:text-indigo-700 mx-1 role-manager-only font-medium">
        <i class="fas fa-user-plus mr-1">
        </i>
        分配
       </button>
       <button class="text-blue-500 hover:text-blue-700 mx-1 role-sales-only font-medium">
        <i class="fas fa-hand-holding-heart mr-1">
        </i>
        认领
       </button>
       <button class="mx-1 font-medium text-blue-500 hover:text-blue-700">
        <i class="fas fa-file-alt mr-1">
        </i>
        详情
       </button>
      </td>
     </tr>
     <!-- 数据行 3 (原已分配，现合并为跟进中) -->
     <tr class="data-row-assigned role-manager-only">
      <td class="text-center role-manager-only">
       <input class="w-4 h-4 rounded border-gray-300 focus:ring-indigo-500 text-indigo-600 cursor-pointer row-checkbox" disabled="" title="已分配状态无法批量选择" type="checkbox"/>
      </td>
      <td>
       陈老板
      </td>
      <td>
       chen@company.com
      </td>
      <td>
       13600136000
      </td>
      <td>
       chen_boss
      </td>
      <td>
       -
      </td>
      <td>
       -
      </td>
      <td>
       开户咨询
      </td>
      <td>
       客户推荐
      </td>
      <td>
       注册页录入
      </td>
      <td>
       <span class="text-blue-600 font-medium">
        2 次
       </span>
      </td>
      <td>
       <span class="text-red-500 font-bold" title="高意向">
        <i class="fas fa-fire">
        </i>
        高
       </span>
      </td>
      <td>
       <span class="text-green-600 font-medium">
        有 (陈总)
       </span>
      </td>
      <td class="font-medium text-gray-800">
       王刚
      </td>
      <td>
       2024-12-20 14:00:00
      </td>
      <td>
       客户已提交资料审核中
      </td>
      <td>
       2024-12-21 09:30:00
      </td>
      <td class="text-gray-400">
       -
      </td>
      <td class="text-sm whitespace-nowrap">
       <button class="text-indigo-500 hover:text-indigo-700 mx-1 role-manager-only font-medium">
        <i class="fas fa-user-plus mr-1">
        </i>
        重新分配
       </button>
       <button class="mx-1 font-medium text-blue-500 hover:text-blue-700">
        <i class="fas fa-file-alt mr-1">
        </i>
        详情
       </button>
      </td>
     </tr>
     <!-- 数据行 4 (退回公海) -->
     <tr class="data-row-public">
      <td class="text-center role-manager-only">
       <input class="w-4 h-4 rounded border-gray-300 focus:ring-indigo-500 text-indigo-600 cursor-pointer row-checkbox" type="checkbox"/>
      </td>
      <td>
       赵六
      </td>
      <td>
       zhao6@qq.com
      </td>
      <td>
       13900139000
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
       个人交易
      </td>
      <td>
       线下金融活动
      </td>
      <td>
       官网录入
      </td>
      <td>
       <span class="text-blue-600 font-medium">
        2 次
       </span>
      </td>
      <td>
       <span class="text-blue-400 font-bold" title="低意向">
        <i class="fas fa-snowflake">
        </i>
        低
       </span>
      </td>
      <td>
       <span class="text-gray-400">
        无
       </span>
      </td>
      <td class="text-gray-400">
       李四
      </td>
      <td>
       2024-12-10 10:00:00
      </td>
      <td>
       客户电话一直打不通，空号。
      </td>
      <td>
       2024-12-15 15:30:00
      </td>
      <td class="text-gray-400">
       -
      </td>
      <td class="text-sm whitespace-nowrap">
       <button class="text-indigo-500 hover:text-indigo-700 mx-1 role-manager-only font-medium">
        <i class="fas fa-user-plus mr-1">
        </i>
        重新分配
       </button>
       <button class="text-blue-500 hover:text-blue-700 mx-1 role-sales-only font-medium">
        <i class="fas fa-hand-holding-heart mr-1">
        </i>
        认领
       </button>
       <button class="mx-1 font-medium text-blue-500 hover:text-blue-700">
        <i class="fas fa-file-alt mr-1">
        </i>
        详情
       </button>
      </td>
     </tr>
     <!-- 数据行 5 (无效线索) -->
     <tr class="data-row-invalid">
      <td class="text-center role-manager-only">
       <input class="w-4 h-4 rounded border-gray-300 focus:ring-indigo-500 text-indigo-600 cursor-pointer row-checkbox" disabled="" title="无效线索无法批量选择" type="checkbox"/>
      </td>
      <td>
       测试客
      </td>
      <td>
       test@test.com
      </td>
      <td>
       13100000000
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
       其他
      </td>
      <td>
       其他渠道
      </td>
      <td>
       销售录入
      </td>
      <td>
       <span class="text-blue-600 font-medium">
        1 次
       </span>
      </td>
      <td>
       <span class="text-gray-400 font-bold" title="未评估">
        --
       </span>
      </td>
      <td>
       <span class="text-gray-400">
        无
       </span>
      </td>
      <td class="font-medium text-gray-800">
       李四
      </td>
      <td>
       2024-11-20 10:00:00
      </td>
      <td>
       同行套话，非真实意向
      </td>
      <td>
       2024-11-20 10:30:00
      </td>
      <td class="text-gray-400">
       -
      </td>
      <td class="text-sm whitespace-nowrap">
       <button class="mx-1 font-medium text-blue-500 hover:text-blue-700">
        <i class="fas fa-file-alt mr-1">
        </i>
        详情
       </button>
      </td>
     </tr>
     <!-- 数据行 6 (已转化) -->
     <tr class="data-row-converted">
      <td class="text-center role-manager-only">
       <input class="w-4 h-4 rounded border-gray-300 focus:ring-indigo-500 text-indigo-600 cursor-pointer row-checkbox" disabled="" title="已转化状态无法批量选择" type="checkbox"/>
      </td>
      <td>
       孙七
      </td>
      <td>
       sunqi@gmail.com
      </td>
      <td>
       13700137000
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
       成为代理
      </td>
      <td>
       社交平台
      </td>
      <td>
       官网录入
      </td>
      <td>
       <span class="text-blue-600 font-medium">
        4 次
       </span>
      </td>
      <td>
       <span class="text-gray-400 font-bold" title="未评估">
        --
       </span>
      </td>
      <td>
       <span class="text-green-600 font-medium">
        有 (张代理)
       </span>
      </td>
      <td class="font-medium text-gray-800">
       张三
      </td>
      <td>
       2024-11-01 10:00:00
      </td>
      <td>
       客户已成功开通代理账户并完成首笔入金。
      </td>
      <td>
       2024-11-05 14:20:00
      </td>
      <td class="text-gray-400">
       -
      </td>
      <td class="text-sm whitespace-nowrap">
       <button class="text-blue-500 hover:text-blue-700 mx-1 font-medium">
        <i class="fas fa-user-circle mr-1">
        </i>
        客户画像
       </button>
       <button class="mx-1 font-medium text-blue-500 hover:text-blue-700">
        <i class="fas fa-file-alt mr-1">
        </i>
        详情
       </button>
      </td>
     </tr>
     <!-- 填充空白行以模拟截图效果 -->
     <tr>
      <td>
      </td>
      <td>
      </td>
      <td>
      </td>
      <td>
      </td>
      <td>
      </td>
      <td>
      </td>
      <td>
      </td>
      <td>
      </td>
      <td>
      </td>
      <td>
      </td>
      <td>
      </td>
      <td>
      </td>
      <td>
      </td>
      <td>
      </td>
      <td>
      </td>
      <td>
      </td>
      <td>
      </td>
      <td>
      </td>
      <td>
      </td>
     </tr>
     <tr>
      <td>
      </td>
      <td>
      </td>
      <td>
      </td>
      <td>
      </td>
      <td>
      </td>
      <td>
      </td>
      <td>
      </td>
      <td>
      </td>
      <td>
      </td>
      <td>
      </td>
      <td>
      </td>
      <td>
      </td>
      <td>
      </td>
      <td>
      </td>
      <td>
      </td>
      <td>
      </td>
      <td>
      </td>
      <td>
      </td>
      <td>
      </td>
     </tr>
     <tr>
      <td>
      </td>
      <td>
      </td>
      <td>
      </td>
      <td>
      </td>
      <td>
      </td>
      <td>
      </td>
      <td>
      </td>
      <td>
      </td>
      <td>
      </td>
      <td>
      </td>
      <td>
      </td>
      <td>
      </td>
      <td>
      </td>
      <td>
      </td>
      <td>
      </td>
      <td>
      </td>
      <td>
      </td>
      <td>
      </td>
      <td>
      </td>
     </tr>
     <tr>
      <td>
      </td>
      <td>
      </td>
      <td>
      </td>
      <td>
      </td>
      <td>
      </td>
      <td>
      </td>
      <td>
      </td>
      <td>
      </td>
      <td>
      </td>
      <td>
      </td>
      <td>
      </td>
      <td>
      </td>
      <td>
      </td>
      <td>
      </td>
      <td>
      </td>
      <td>
      </td>
      <td>
      </td>
      <td>
      </td>
      <td>
      </td>
     </tr>
     <tr>
      <td>
      </td>
      <td>
      </td>
      <td>
      </td>
      <td>
      </td>
      <td>
      </td>
      <td>
      </td>
      <td>
      </td>
      <td>
      </td>
      <td>
      </td>
      <td>
      </td>
      <td>
      </td>
      <td>
      </td>
      <td>
      </td>
      <td>
      </td>
      <td>
      </td>
      <td>
      </td>
      <td>
      </td>
      <td>
      </td>
      <td>
      </td>
     </tr>
    </tbody>
   </table>
  </div>
 </div>
 <!-- 3. 底部翻页区 -->
 <div class="flex items-center justify-end mt-4 text-sm text-gray-500">
  <span class="mr-4">
   共 658 条
  </span>
  <div class="flex items-center gap-1">
   <button class="w-8 h-8 flex items-center justify-center rounded hover:bg-gray-100 text-gray-400">
    <i class="fa-solid fa-chevron-left text-xs">
    </i>
   </button>
   <button class="w-8 h-8 flex items-center justify-center rounded hover:bg-gray-100">
    50
   </button>
   <!-- 当前激活页 (截图为浅红色背景，文字颜色匹配) -->
   <button class="w-8 h-8 flex items-center justify-center rounded bg-[#e8a3a3] text-white font-medium">
    51
   </button>
   <button class="w-8 h-8 flex items-center justify-center rounded hover:bg-gray-100">
    52
   </button>
   <button class="w-8 h-8 flex items-center justify-center rounded hover:bg-gray-100">
    53
   </button>
   <button class="w-8 h-8 flex items-center justify-center rounded hover:bg-gray-100">
    54
   </button>
   <span class="px-1">
    ...
   </span>
   <button class="w-8 h-8 flex items-center justify-center rounded hover:bg-gray-100">
    90
   </button>
   <button class="w-8 h-8 flex items-center justify-center rounded hover:bg-gray-100">
    <i class="fa-solid fa-chevron-right text-xs">
    </i>
   </button>
  </div>
 </div>
</div>

    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
</script>
