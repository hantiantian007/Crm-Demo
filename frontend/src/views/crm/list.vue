<template>
  <div class="flex h-full bg-mainBg overflow-hidden w-full">
    <div class="flex-1 flex flex-col min-w-0 bg-gray-50 overflow-hidden p-4 custom-scrollbar overflow-y-auto w-full">
      <div class="flex-1 p-6 overflow-y-auto bg-white m-4 rounded-lg shadow-sm border border-gray-100 flex flex-col">
 <div class="flex justify-end mb-4">
  <a class="text-xs text-blue-500 hover:text-blue-600 transition-colors" data-prd-drawer="" data-prd-title="客户列表页面PRD" href="#">
   查看页面PRD
  </a>
 </div>
 <!-- 1. 顶部搜索过滤区 -->
 <div class="bg-white p-6 rounded shadow-sm mb-6 border border-gray-100">
  <div class="flex justify-between items-center mb-4">
   <h2 class="text-base font-bold text-gray-800">
    搜索
   </h2>
  </div>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 text-sm">
   <!-- 常驻关键搜索项 -->
   <div class="flex items-center gap-2">
    <span class="text-gray-600 text-right w-[100px] shrink-0">
     查询范围：
    </span>
    <div class="flex flex-1 gap-1">
     <select class="border border-gray-300 rounded px-2 py-1.5 outline-none w-1/3 text-gray-600">
      <option>
       伞下
      </option>
     </select>
     <select class="border border-gray-300 rounded px-2 py-1.5 outline-none w-2/3 text-gray-400">
      <option>
       请选择上级
      </option>
     </select>
    </div>
   </div>
   <div class="flex items-center gap-2">
    <span class="text-gray-600 text-right w-[100px] shrink-0">
     真实姓名：
    </span>
    <input class="border border-gray-300 rounded px-3 py-1.5 outline-none flex-1" placeholder="请输入" type="text"/>
   </div>
   <div class="flex items-center gap-2">
    <span class="text-gray-600 text-right w-[100px] shrink-0">
     邮箱：
    </span>
    <input class="border border-gray-300 rounded px-3 py-1.5 outline-none flex-1" placeholder="请输入" type="text"/>
   </div>
   <div class="flex items-center gap-2">
    <span class="text-gray-600 text-right w-[100px] shrink-0">
     MT账号：
    </span>
    <input class="border border-gray-300 rounded px-3 py-1.5 outline-none flex-1" placeholder="请输入" type="text"/>
   </div>
   <!-- 可折叠的高级搜索项 -->
   <div class="advanced-search-item hidden flex items-center gap-2">
    <span class="text-gray-600 text-right w-[100px] shrink-0">
     推荐人邮箱：
    </span>
    <input class="border border-gray-300 rounded px-3 py-1.5 outline-none flex-1" placeholder="请输入" type="text"/>
   </div>
   <div class="advanced-search-item hidden flex items-center gap-2">
    <span class="text-gray-600 text-right w-[100px] shrink-0">
     身份证：
    </span>
    <input class="border border-gray-300 rounded px-3 py-1.5 outline-none flex-1" placeholder="请输入" type="text"/>
   </div>
   <div class="advanced-search-item hidden flex items-center gap-2">
    <span class="text-gray-600 text-right w-[100px] shrink-0">
     角色类型：
    </span>
    <select class="border border-gray-300 rounded px-2 py-1.5 outline-none flex-1 text-gray-600">
     <option>
      全部
     </option>
    </select>
   </div>
   <div class="advanced-search-item hidden flex items-center gap-2">
    <span class="text-gray-600 text-right w-[100px] shrink-0">
     客户类型：
    </span>
    <select class="border border-gray-300 rounded px-2 py-1.5 outline-none flex-1 text-gray-400">
     <option>
      请选择
     </option>
    </select>
   </div>
   <div class="advanced-search-item hidden flex items-center gap-2">
    <span class="text-right w-[100px] shrink-0 change-highlight">
     账户类型：
    </span>
    <select class="border border-gray-300 rounded px-2 py-1.5 outline-none flex-1 change-highlight">
     <option>
      全部
     </option>
     <option>
      仅标准账户
     </option>
     <option>
      仅美分账户
     </option>
     <option>
      标准+美分
     </option>
    </select>
   </div>
   <div class="advanced-search-item hidden flex items-center gap-2">
    <span class="text-gray-600 text-right w-[100px] shrink-0">
     客户标记：
    </span>
    <select class="border border-gray-300 rounded px-2 py-1.5 outline-none flex-1 text-gray-400">
     <option>
      请选择
     </option>
    </select>
   </div>
   <div class="advanced-search-item hidden flex items-center gap-2">
    <span class="text-gray-600 text-right w-[100px] shrink-0">
     状态：
    </span>
    <select class="border border-gray-300 rounded px-2 py-1.5 outline-none flex-1 text-gray-400">
     <option>
      请选择
     </option>
    </select>
   </div>
   <div class="advanced-search-item hidden flex items-center gap-2">
    <span class="text-gray-600 text-right w-[100px] shrink-0">
     分佣配置：
    </span>
    <select class="border border-gray-300 rounded px-2 py-1.5 outline-none flex-1 text-gray-400">
     <option>
      请选择
     </option>
    </select>
   </div>
   <div class="advanced-search-item hidden flex items-center gap-2">
    <span class="text-gray-600 text-right w-[100px] shrink-0">
     登录双重验证：
    </span>
    <select class="border border-gray-300 rounded px-2 py-1.5 outline-none flex-1 text-gray-400">
     <option>
      请选择
     </option>
    </select>
   </div>
   <div class="advanced-search-item hidden flex items-center gap-2 lg:col-span-2">
    <span class="text-gray-600 text-right w-[100px] shrink-0">
     时间范围：
    </span>
    <div class="flex flex-1 items-center border border-gray-300 rounded overflow-hidden">
     <input class="px-3 py-1.5 outline-none flex-1 text-center text-gray-400" placeholder="开始日期" type="text"/>
     <span class="bg-gray-50 px-2 py-1.5 text-gray-400 border-x border-gray-300">
      到
     </span>
     <input class="px-3 py-1.5 outline-none flex-1 text-center text-gray-400" placeholder="结束日期" type="text"/>
    </div>
   </div>
   <div class="advanced-search-item hidden flex items-center gap-2 lg:col-span-2">
    <span class="text-gray-600 text-right w-[100px] shrink-0">
     最后登录时间：
    </span>
    <div class="flex flex-1 items-center border border-gray-300 rounded overflow-hidden">
     <input class="px-3 py-1.5 outline-none flex-1 text-center text-gray-400" placeholder="开始日期" type="text"/>
     <span class="bg-gray-50 px-2 py-1.5 text-gray-400 border-x border-gray-300">
      到
     </span>
     <input class="px-3 py-1.5 outline-none flex-1 text-center text-gray-400" placeholder="结束日期" type="text"/>
    </div>
   </div>
   <!-- 操作按钮组 -->
   <div class="flex items-center gap-3 xl:col-span-4 lg:col-span-3 md:col-span-2 justify-end mt-2">
    <button class="text-blue-500 hover:text-blue-700 text-sm flex items-center gap-1 mr-2 transition-colors">
     <span id="searchToggleText">
      展开
     </span>
     <i class="fa-solid fa-chevron-down" id="searchToggleIcon">
     </i>
    </button>
    <button class="bg-white border border-gray-300 text-gray-600 hover:bg-gray-50 px-6 py-1.5 rounded transition-colors shadow-sm">
     重置
    </button>
    <button class="bg-[#C4A373] hover:bg-[#b09063] text-white px-6 py-1.5 rounded transition-colors shadow-sm">
     搜索客户
    </button>
   </div>
  </div>
 </div>
 <!-- 2. 数据表格区 -->
 <div class="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden flex-1 flex flex-col">
  <!-- Top Buttons -->
  <div class="p-4 flex justify-between items-center border-b border-gray-100">
   <button class="bg-[#C4A373] hover:bg-[#b09063] text-white px-4 py-1.5 rounded text-sm transition-colors flex items-center gap-2">
    <i class="fa-solid fa-user-plus text-xs">
    </i>
    添加客户
   </button>
   <button class="bg-[#C4A373] hover:bg-[#b09063] text-white px-4 py-1.5 rounded text-sm transition-colors">
    报表导出
   </button>
  </div>
  <!-- Table -->
  <div class="overflow-x-auto flex-1">
   <table class="w-full text-sm text-left whitespace-nowrap">
    <thead class="text-gray-500 bg-white border-b border-gray-100 sticky top-0 z-10">
     <tr>
      <th class="font-medium py-4 px-4 pl-12 relative">
       客户信息
      </th>
      <th class="font-medium py-4 px-4">
       联系方式
      </th>
      <th class="font-medium py-4 px-4">
       登录双重验证
      </th>
      <th class="font-medium py-4 px-4">
       上级信息
      </th>
      <th class="font-medium py-4 px-4">
       所属代理(IB)
      </th>
      <th class="font-medium py-4 px-4">
       推荐人
      </th>
      <th class="font-medium py-4 px-4">
       MT账户数量
      </th>
      <th class="font-medium py-4 px-4">
       状态
      </th>
      <th class="font-medium py-4 px-4">
       分佣配置
      </th>
      <th class="font-medium py-4 px-4 change-highlight">
       未提现(USD)
      </th>
      <th class="font-medium py-4 px-4 change-highlight">
       入金金额
      </th>
      <th class="font-medium py-4 px-4 change-highlight">
       出金金额
      </th>
      <th class="font-medium py-4 px-4">
       积分
      </th>
      <th class="font-medium py-4 px-4">
       交易量(手)
      </th>
      <th class="font-medium py-4 px-4">
       持仓量(手)
      </th>
     </tr>
    </thead>
    <tbody class="text-gray-700">
     <!-- Row 1 -->
     <tr class="border-b border-gray-50 hover:bg-gray-50 transition-colors cursor-pointer group">
      <td class="py-4 px-4 relative">
       <i class="fa-solid fa-chevron-right text-red-500 absolute left-4 top-1/2 -translate-y-1/2 transition-transform duration-200 fold-icon rotate-90">
       </i>
       <div class="pl-6">
        <div class="font-medium text-gray-800">
         123123
        </div>
        <div class="text-xs text-gray-500 mt-1 flex items-center gap-1">
         <i class="fa-solid fa-user text-blue-500">
         </i>
         代理
        </div>
       </div>
      </td>
      <td class="py-4 px-4">
       <a class="text-blue-500 hover:underline block" href="#">
        han111@g.com
       </a>
       <div class="text-gray-500 mt-1">
        15213099999
       </div>
      </td>
      <td class="py-4 px-4">
       禁用
      </td>
      <td class="py-4 px-4">
       <div>
        test
       </div>
       <div class="text-gray-500 mt-1">
        935292015@q.com
       </div>
      </td>
      <td class="py-4 px-4">
       <div class="text-blue-500 hover:underline cursor-pointer">
        IB-8821 (王代理)
       </div>
       <div class="text-gray-500 mt-1">
        wang@ib.com
       </div>
      </td>
      <td class="py-4 px-4">
       <div>
        test
       </div>
       <div class="text-gray-500 mt-1">
        935292015@q.com
       </div>
      </td>
      <td class="py-4 px-4">
       <div class="text-blue-500 font-medium">
        2
       </div>
       <div class="text-xs mt-1 change-highlight">
        标准 1 / 美分 1
       </div>
      </td>
      <td class="py-4 px-4">
       正常
      </td>
      <td class="py-4 px-4">
       未配置
      </td>
      <td class="py-4 px-4">
       0.0000
      </td>
      <td class="py-4 px-4">
       <div>
        100.90
       </div>
       <div class="text-xs mt-1 change-highlight">
        USD：100.00
       </div>
       <div class="text-xs mt-1 change-highlight">
        USC：90.00
       </div>
      </td>
      <td class="py-4 px-4">
       <div>
        0.00
       </div>
      </td>
      <td class="py-4 px-4">
       0.00
      </td>
      <td class="py-4 px-4">
       0.00
      </td>
      <td class="py-4 px-4">
       0.00
      </td>
     </tr>
     <!-- Row 1 Details -->
     <tr class="bg-[#fafafa] border-b border-gray-100" id="client-1">
      <td class="py-6 px-10" colspan="15">
       <div class="grid grid-cols-1 gap-4 max-w-2xl">
        <div class="flex items-center">
         <span class="text-gray-500 w-32">
          注册时间
         </span>
         <span class="text-gray-800">
          2026-06-09 16:42
         </span>
        </div>
        <div class="flex items-center">
         <span class="text-gray-500 w-32">
          角色
         </span>
         <span class="text-gray-800">
          代理
         </span>
        </div>
        <div class="flex items-center">
         <span class="text-gray-500 w-32">
          最近一次登录时间
         </span>
         <span class="text-gray-800">
          2026-06-09 16:43:02
         </span>
        </div>
        <div class="flex items-center">
         <span class="text-gray-500 w-32 change-highlight">
          入金金额(USC)
         </span>
         <span class="text-gray-800 change-highlight">
          0 USC/美分
         </span>
        </div>
        <div class="flex items-center">
         <span class="text-gray-500 w-32 change-highlight">
          出金金额(USD)
         </span>
         <span class="text-gray-800 change-highlight">
          0.00 USD
         </span>
        </div>
        <div class="flex items-center mt-2">
         <span class="text-gray-500 w-32">
          操作
         </span>
         <div class="flex items-center gap-2">
          <a class="bg-[#C4A373] text-white px-4 py-1 rounded text-xs hover:bg-[#b09063] inline-block" href="#">
           查看
          </a>
          <button class="text-blue-500 px-4 py-1 rounded text-xs hover:bg-blue-50 border border-blue-200 bg-white">
           修改代理
          </button>
          <button class="text-blue-500 px-4 py-1 rounded text-xs hover:bg-blue-50">
           修改
          </button>
          <button class="border border-[#C4A373] text-[#C4A373] px-3 py-1 rounded text-xs hover:bg-[#C4A373] hover:text-white flex items-center gap-1">
           操作
           <i class="fa-solid fa-caret-down">
           </i>
          </button>
         </div>
        </div>
       </div>
      </td>
     </tr>
     <!-- Row 2 -->
     <tr class="border-b border-gray-50 hover:bg-gray-50 transition-colors cursor-pointer group">
      <td class="py-4 px-4 relative">
       <i class="fa-solid fa-chevron-right text-red-500 absolute left-4 top-1/2 -translate-y-1/2 transition-transform duration-200 fold-icon">
       </i>
       <div class="pl-6">
        <div class="font-medium text-gray-800">
         test-杨均
        </div>
        <div class="text-xs text-gray-500 mt-1 flex items-center gap-1">
         <i class="fa-solid fa-user text-blue-500">
         </i>
         直接客户
        </div>
       </div>
      </td>
      <td class="py-4 px-4">
       <a class="text-blue-500 hover:underline block" href="#">
        b13@qq.com
       </a>
       <div class="text-gray-500 mt-1">
        13670510921
       </div>
      </td>
      <td class="py-4 px-4">
       禁用
      </td>
      <td class="py-4 px-4">
       <div>
        test-褚必
       </div>
       <div class="text-gray-500 mt-1">
        b12@qq.com
       </div>
      </td>
      <td class="py-4 px-4 text-gray-400">
       无
      </td>
      <td class="py-4 px-4">
       <div>
        test-褚必
       </div>
       <div class="text-gray-500 mt-1">
        b12@qq.com
       </div>
      </td>
      <td class="py-4 px-4">
       <div class="text-blue-500 font-medium">
        1
       </div>
       <div class="text-xs mt-1 change-highlight">
        美分 1
       </div>
      </td>
      <td class="py-4 px-4">
       正常
      </td>
      <td class="py-4 px-4">
       /
      </td>
      <td class="py-4 px-4">
       0.0000
      </td>
      <td class="py-4 px-4">
       <div>
        2,000.00
       </div>
       <div class="text-xs mt-1 change-highlight">
        USD：0.00
       </div>
       <div class="text-xs mt-1 change-highlight">
        USC：200,000.00
       </div>
      </td>
      <td class="py-4 px-4">
       <div class="change-highlight">
        50.00
       </div>
      </td>
      <td class="py-4 px-4">
       0.00
      </td>
      <td class="py-4 px-4">
       0.15
      </td>
      <td class="py-4 px-4">
       0.00
      </td>
     </tr>
     <!-- Row 2 Details -->
     <tr class="bg-[#fafafa] border-b border-gray-100 hidden" id="client-2">
      <td class="py-6 px-10" colspan="15">
       <div class="grid grid-cols-1 gap-4 max-w-2xl">
        <div class="flex items-center">
         <span class="text-gray-500 w-32">
          注册时间
         </span>
         <span class="text-gray-800">
          2026-06-08 10:15
         </span>
        </div>
        <div class="flex items-center">
         <span class="text-gray-500 w-32">
          角色
         </span>
         <span class="text-gray-800">
          直接客户
         </span>
        </div>
        <div class="flex items-center">
         <span class="text-gray-500 w-32">
          最近一次登录时间
         </span>
         <span class="text-gray-800">
          2026-06-10 09:20:11
         </span>
        </div>
        <div class="flex items-center">
         <span class="text-gray-500 w-32 change-highlight">
          入金金额(USC)
         </span>
         <span class="text-gray-800 change-highlight">
          200,000 USC/美分
         </span>
        </div>
        <div class="flex items-center">
         <span class="text-gray-500 w-32 change-highlight">
          出金金额(USD)
         </span>
         <span class="text-gray-800 change-highlight">
          50.00 USD
         </span>
        </div>
        <div class="flex items-center mt-2">
         <span class="text-gray-500 w-32">
          操作
         </span>
         <div class="flex items-center gap-2">
          <a class="bg-[#C4A373] text-white px-4 py-1 rounded text-xs hover:bg-[#b09063] inline-block" href="#">
           查看
          </a>
          <button class="text-blue-500 px-4 py-1 rounded text-xs hover:bg-blue-50 border border-blue-200 bg-white">
           修改代理
          </button>
          <button class="text-blue-500 px-4 py-1 rounded text-xs hover:bg-blue-50">
           修改
          </button>
          <button class="border border-[#C4A373] text-[#C4A373] px-3 py-1 rounded text-xs hover:bg-[#C4A373] hover:text-white flex items-center gap-1">
           操作
           <i class="fa-solid fa-caret-down">
           </i>
          </button>
         </div>
        </div>
       </div>
      </td>
     </tr>
     <!-- Row 3 -->
     <tr class="border-b border-gray-50 hover:bg-gray-50 transition-colors cursor-pointer group">
      <td class="py-4 px-4 relative">
       <i class="fa-solid fa-chevron-right text-red-500 absolute left-4 top-1/2 -translate-y-1/2 transition-transform duration-200 fold-icon">
       </i>
       <div class="pl-6">
        <div class="font-medium text-gray-800">
         test-褚必
        </div>
        <div class="text-xs text-gray-500 mt-1 flex items-center gap-1">
         <i class="fa-solid fa-user text-blue-500">
         </i>
         代理
        </div>
       </div>
      </td>
      <td class="py-4 px-4">
       <a class="text-blue-500 hover:underline block" href="#">
        b12@qq.com
       </a>
       <div class="text-gray-500 mt-1">
        13993242210
       </div>
      </td>
      <td class="py-4 px-4">
       禁用
      </td>
      <td class="py-4 px-4">
       <div>
        test-蒋为
       </div>
       <div class="text-gray-500 mt-1">
        b11@qq.com
       </div>
      </td>
      <td class="py-4 px-4 text-gray-400">
       无
      </td>
      <td class="py-4 px-4">
       <div>
        test-蒋为
       </div>
       <div class="text-gray-500 mt-1">
        b11@qq.com
       </div>
      </td>
      <td class="py-4 px-4">
       <div class="text-blue-500 font-medium">
        2
       </div>
       <div class="text-xs mt-1 change-highlight">
        标准 2 / 美分 0
       </div>
      </td>
      <td class="py-4 px-4">
       正常
      </td>
      <td class="py-4 px-4">
       未配置
      </td>
      <td class="py-4 px-4">
       0.0000
      </td>
      <td class="py-4 px-4">
       0.00
      </td>
      <td class="py-4 px-4">
       0.00
      </td>
      <td class="py-4 px-4">
       0.00
      </td>
      <td class="py-4 px-4">
       0.00
      </td>
      <td class="py-4 px-4">
       0.00
      </td>
     </tr>
     <!-- Row 3 Details -->
     <tr class="bg-[#fafafa] border-b border-gray-100 hidden" id="client-3">
      <td class="py-6 px-10" colspan="15">
       <div class="grid grid-cols-1 gap-4 max-w-2xl">
        <div class="flex items-center">
         <span class="text-gray-500 w-32">
          注册时间
         </span>
         <span class="text-gray-800">
          2026-06-07 14:22
         </span>
        </div>
        <div class="flex items-center">
         <span class="text-gray-500 w-32">
          角色
         </span>
         <span class="text-gray-800">
          代理
         </span>
        </div>
        <div class="flex items-center">
         <span class="text-gray-500 w-32">
          最近一次登录时间
         </span>
         <span class="text-gray-800">
          2026-06-11 11:30:05
         </span>
        </div>
        <div class="flex items-center mt-2">
         <span class="text-gray-500 w-32">
          操作
         </span>
         <div class="flex items-center gap-2">
          <a class="bg-[#C4A373] text-white px-4 py-1 rounded text-xs hover:bg-[#b09063] inline-block" href="#">
           查看
          </a>
          <button class="text-blue-500 px-4 py-1 rounded text-xs hover:bg-blue-50 border border-blue-200 bg-white">
           修改代理
          </button>
          <button class="text-blue-500 px-4 py-1 rounded text-xs hover:bg-blue-50">
           修改
          </button>
          <button class="border border-[#C4A373] text-[#C4A373] px-3 py-1 rounded text-xs hover:bg-[#C4A373] hover:text-white flex items-center gap-1">
           操作
           <i class="fa-solid fa-caret-down">
           </i>
          </button>
         </div>
        </div>
       </div>
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
   <!-- 当前激活页 -->
   <button class="w-8 h-8 flex items-center justify-center rounded bg-red-100 text-red-500 font-medium">
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
