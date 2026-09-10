<template>
  <div class="flex h-full bg-mainBg overflow-hidden">
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
   <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 mb-4">
    <div class="flex items-center">
     <label class="text-[13px] text-gray-600 w-[70px] shrink-0 text-right mr-3 font-medium">
      用户类型:
     </label>
     <select class="custom-select flex-1">
      <option>
       不限
      </option>
     </select>
    </div>
    <div class="flex items-center">
     <label class="text-[13px] text-gray-600 w-[70px] shrink-0 text-right mr-3 font-medium">
      查询范围:
     </label>
     <select class="custom-select flex-1">
      <option>
       所有
      </option>
     </select>
    </div>
    <div class="flex items-center">
     <label class="text-[13px] text-gray-600 w-[70px] shrink-0 text-right mr-3 font-medium">
      交易品种:
     </label>
     <input class="custom-input flex-1" placeholder="请输入" type="text"/>
    </div>
    <div class="flex items-center">
     <label class="text-[13px] text-gray-600 w-[70px] shrink-0 text-right mr-3 font-medium">
      交易账号:
     </label>
     <input class="custom-input flex-1" placeholder="请输入" type="text"/>
    </div>
    <div class="flex items-center">
     <label class="text-[13px] text-gray-600 w-[70px] shrink-0 text-right mr-3 font-medium">
      返佣状态:
     </label>
     <select class="custom-select flex-1">
      <option>
       已结算
      </option>
     </select>
    </div>
    <div class="flex items-center">
     <label class="text-[13px] text-gray-600 w-[70px] shrink-0 text-right mr-3 font-medium">
      返佣账号:
     </label>
     <input class="custom-input flex-1" placeholder="请输入" type="text"/>
    </div>
    <div class="flex items-center col-span-1 lg:col-span-2 xl:col-span-2">
     <div class="flex gap-2 w-full">
      <select class="custom-select w-[100px] shrink-0">
       <option>
        系统时间
       </option>
      </select>
      <select class="custom-select w-[80px] shrink-0">
       <option>
        平仓
       </option>
      </select>
      <div class="flex items-center flex-1">
       <input class="custom-input rounded-r-none border-r-0 text-center" placeholder="开始日期" type="text"/>
       <span class="px-3 py-[5px] bg-gray-50 border-y border-gray-200 text-[13px] text-gray-400">
        到
       </span>
       <input class="custom-input rounded-l-none border-l-0 text-center" placeholder="结束日期" type="text"/>
      </div>
     </div>
    </div>
    <div class="flex items-center">
     <label class="text-[13px] text-gray-600 w-[70px] shrink-0 text-right mr-3 font-medium">
      持仓编号:
     </label>
     <input class="custom-input flex-1" placeholder="请输入" type="text"/>
    </div>
    <div class="flex items-center">
     <label class="text-[13px] text-gray-600 w-[70px] shrink-0 text-right mr-3 font-medium">
      编号:
     </label>
     <input class="custom-input flex-1" placeholder="请输入" type="text"/>
    </div>
    <div class="flex items-center">
     <label class="text-[13px] text-gray-600 w-[70px] shrink-0 text-right mr-3 font-medium">
      返佣类型:
     </label>
     <select class="custom-select flex-1">
      <option>
       全部
      </option>
     </select>
    </div>
    <!-- 占位使其靠右 -->
    <div class="hidden xl:block col-span-3">
    </div>
    <div class="flex items-center justify-end gap-3 col-span-1 md:col-span-2 lg:col-span-3 xl:col-span-5 mt-2">
     <button class="bg-white border border-primaryBtn text-primaryBtn hover:bg-primaryBtn hover:text-white px-6 py-1.5 rounded text-[13px] transition-colors shadow-sm font-medium">
      搜索
     </button>
     <button class="bg-white border border-gray-300 text-gray-600 hover:bg-gray-50 px-6 py-1.5 rounded text-[13px] transition-colors shadow-sm font-medium">
      重置
     </button>
    </div>
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
      返佣金额($):
      <span class="text-primaryBtn font-bold text-lg font-mono">
       72,828.5774
      </span>
     </div>
     <div class="text-gray-500">
      交易量(标准手):
      <span class="text-primaryBtn font-bold text-lg font-mono">
       11,216.87
      </span>
     </div>
     <div class="text-gray-500">
      交易量(美分手):
      <span class="text-primaryBtn font-bold text-lg font-mono">
       138.78
      </span>
     </div>
    </div>
    <button class="bg-white border border-primaryBtn text-primaryBtn hover:bg-primaryBtn hover:text-white px-5 py-2 rounded text-[13px] transition-colors shadow-sm font-medium">
     报表导出
    </button>
   </div>
   <!-- 表格区域 -->
   <div class="overflow-x-auto flex-1 no-scrollbar">
    <table class="w-full custom-table min-w-[1400px]">
     <thead class="bg-tableHeader">
      <tr>
       <th class="w-10">
       </th>
       <th>
        编号
       </th>
       <th>
        持仓编号
       </th>
       <th>
        订单编号
       </th>
       <th>
        交易账号
       </th>
       <th>
        交易用户
       </th>
       <th>
        返佣账号
       </th>
       <th>
        返佣用户
       </th>
       <th>
        返佣等级
       </th>
       <th>
        返佣金额($)
       </th>
       <th>
        手数类型
       </th>
       <th>
        交易量(手)
       </th>
       <th>
        交易品种
       </th>
       <th>
        返佣标准
       </th>
      </tr>
     </thead>
     <tbody>
      <!-- Row 1 (Expanded) -->
      <tr class="bg-gray-50/30">
       <td class="text-red-500 cursor-pointer">
        <i class="fa-solid fa-chevron-down text-[10px]">
        </i>
       </td>
       <td class="font-medium text-gray-700 font-mono">
        143217
       </td>
       <td class="font-mono">
        684022
       </td>
       <td>
        <div class="text-[12px] font-mono text-gray-500 text-left">
         开仓: 684022
         <br/>
         平仓: 684024
        </div>
       </td>
       <td class="font-medium">
        4100101
       </td>
       <td>
        <div class="text-[12px] text-gray-500 text-left">
         test-测试-B
         <br/>
         3218965885@qq.com
        </div>
       </td>
       <td class="font-medium">
        8300248
       </td>
       <td>
        <div class="text-[12px] text-gray-500 text-left">
         华安
         <br/>
         huaan@qqq.com
        </div>
       </td>
       <td>
        代理-PIB
       </td>
       <td class="font-mono font-medium text-green-600">
        0.0500
       </td>
       <td>
        标准手
       </td>
       <td>
        0.01
       </td>
       <td class="font-medium text-gray-700">
        XAUUSD
       </td>
       <td class="text-gray-500">
        5.00 $/lot
       </td>
      </tr>
      <tr class="expanded-row">
       <td class="border-t-0 pt-0" colspan="14">
        <div class="flex flex-col gap-3 pl-[42px] mt-2 mb-4">
         <div class="flex">
          <span class="text-gray-800 font-bold w-24 shrink-0">
           系统时间
          </span>
          <div class="text-gray-600 font-mono text-[13px] leading-relaxed">
           返佣: 2026-09-07 10:47:41
           <br/>
           平仓: 2026-09-07 10:47:26
          </div>
         </div>
         <div class="flex">
          <span class="text-gray-800 font-bold w-24 shrink-0">
           MT时间
          </span>
          <div class="text-gray-600 font-mono text-[13px] leading-relaxed">
           返佣: 2026-09-07 05:47:41
           <br/>
           平仓: 2026-09-07 05:47:26
          </div>
         </div>
         <div class="flex">
          <span class="text-gray-800 font-bold w-24 shrink-0">
           返佣类型
          </span>
          <div class="text-gray-600 text-[13px] leading-relaxed">
           内佣
           <br/>
           stan-代理返佣-PIB
          </div>
         </div>
         <div class="flex">
          <span class="text-gray-800 font-bold w-24 shrink-0">
           返佣状态
          </span>
          <div class="text-gray-600 text-[13px] leading-relaxed">
           已结算
          </div>
         </div>
         <div class="flex">
          <span class="text-gray-800 font-bold w-24 shrink-0">
           交易编号
          </span>
          <div class="text-gray-600 font-mono text-[13px] leading-relaxed">
           开仓: 1180850
           <br/>
           平仓: 1180852
          </div>
         </div>
        </div>
       </td>
      </tr>
      <!-- Row 2 -->
      <tr>
       <td class="text-red-500 cursor-pointer hover:text-red-600">
        <i class="fa-solid fa-chevron-right text-[10px]">
        </i>
       </td>
       <td class="font-medium text-gray-700 font-mono">
        143215
       </td>
       <td class="font-mono">
        684019
       </td>
       <td>
        <div class="text-[12px] font-mono text-gray-500 text-left">
         开仓: 684019
         <br/>
         平仓: 684021
        </div>
       </td>
       <td class="font-medium">
        4100101
       </td>
       <td>
        <div class="text-[12px] text-gray-500 text-left">
         test-测试-B
         <br/>
         3218965885@qq.com
        </div>
       </td>
       <td class="font-medium">
        8300248
       </td>
       <td>
        <div class="text-[12px] text-gray-500 text-left">
         华安
         <br/>
         huaan@qqq.com
        </div>
       </td>
       <td>
        代理-PIB
       </td>
       <td class="font-mono font-medium text-green-600">
        0.0500
       </td>
       <td>
        标准手
       </td>
       <td>
        0.01
       </td>
       <td class="font-medium text-gray-700">
        XAUUSD
       </td>
       <td class="text-gray-500">
        5.00 $/lot
       </td>
      </tr>
      <!-- Row 3 -->
      <tr>
       <td class="text-red-500 cursor-pointer hover:text-red-600">
        <i class="fa-solid fa-chevron-right text-[10px]">
        </i>
       </td>
       <td class="font-medium text-gray-700 font-mono">
        143213
       </td>
       <td class="font-mono">
        558782
       </td>
       <td>
        <div class="text-[12px] font-mono text-gray-500 text-left">
         开仓: 558782
         <br/>
         平仓: 684020
        </div>
       </td>
       <td class="font-medium">
        4100101
       </td>
       <td>
        <div class="text-[12px] text-gray-500 text-left">
         test-测试-B
         <br/>
         3218965885@qq.com
        </div>
       </td>
       <td class="font-medium">
        8300248
       </td>
       <td>
        <div class="text-[12px] text-gray-500 text-left">
         华安
         <br/>
         huaan@qqq.com
        </div>
       </td>
       <td>
        代理-PIB
       </td>
       <td class="font-mono font-medium text-green-600">
        0.1000
       </td>
       <td>
        标准手
       </td>
       <td>
        0.02
       </td>
       <td class="font-medium text-gray-700">
        XAUUSD
       </td>
       <td class="text-gray-500">
        5.00 $/lot
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
      3
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
</template>

<script setup>
import { ref } from 'vue'
</script>
