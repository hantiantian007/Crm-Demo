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
  <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
   <h3 class="font-bold text-gray-800 mb-5 text-[15px]">
    搜索
   </h3>
   <div class="grid grid-cols-6 gap-4 mb-4">
    <div class="flex items-center">
     <label class="text-[13px] text-gray-600 w-16 shrink-0 text-right mr-3">
      MT账号:
     </label>
     <input class="custom-input" placeholder="请输入不超过50字符" type="text"/>
    </div>
    <div class="flex items-center">
     <label class="text-[13px] text-gray-600 w-16 shrink-0 text-right mr-3">
      客户姓名:
     </label>
     <input class="custom-input" placeholder="请输入不超过50字符" type="text"/>
    </div>
    <div class="flex items-center">
     <label class="text-[13px] text-gray-600 w-16 shrink-0 text-right mr-3">
      客户邮箱:
     </label>
     <input class="custom-input" placeholder="请输入不超过50字符" type="text"/>
    </div>
    <div class="flex items-center">
     <label class="text-[13px] text-gray-600 w-16 shrink-0 text-right mr-3">
      持仓编号:
     </label>
     <input class="custom-input" placeholder="请输入不超过50字符" type="text"/>
    </div>
    <div class="flex items-center">
     <label class="text-[13px] text-gray-600 w-16 shrink-0 text-right mr-3">
      交易品种:
     </label>
     <select class="custom-select">
      <option>
       全部
      </option>
      <option>
       XAUUSD
      </option>
      <option>
       XAGUSD
      </option>
     </select>
    </div>
    <div class="flex items-center">
     <label class="text-[13px] text-gray-600 w-16 shrink-0 text-right mr-3">
      买卖类型:
     </label>
     <select class="custom-select">
      <option>
       全部
      </option>
      <option>
       买入
      </option>
      <option>
       卖出
      </option>
     </select>
    </div>
   </div>
   <div class="grid grid-cols-6 gap-4 mb-4">
    <div class="flex items-center">
     <label class="text-[13px] text-gray-600 w-16 shrink-0 text-right mr-3">
      订单编号:
     </label>
     <input class="custom-input" placeholder="请输入不超过50字符" type="text"/>
    </div>
    <div class="flex items-center col-span-2">
     <label class="text-[13px] text-gray-600 w-16 shrink-0 text-right mr-3">
      开仓日期:
     </label>
     <div class="flex items-center w-full">
      <select class="custom-select rounded-r-none border-r-0 max-w-[110px]">
       <option>
        系统时间
       </option>
      </select>
      <input class="custom-input rounded-none border-r-0 text-center" placeholder="开始日期" type="text"/>
      <span class="px-3 py-[7px] bg-gray-50 border-y border-gray-200 text-[13px] text-gray-400">
       到
      </span>
      <input class="custom-input rounded-l-none border-l-0 text-center" placeholder="结束日期" type="text"/>
     </div>
    </div>
    <div class="flex items-center">
     <label class="text-[13px] text-gray-600 w-20 shrink-0 text-right mr-3">
      关系树查询:
     </label>
     <select class="custom-select text-gray-400">
      <option>
       请选择
      </option>
     </select>
    </div>
    <div class="flex items-center">
     <label class="text-[13px] text-gray-600 w-20 shrink-0 text-right mr-3 change-highlight">
      账户类型:
     </label>
     <select class="custom-select change-highlight">
      <option>
       全部
      </option>
      <option>
       标准账户
      </option>
      <option>
       美分账户
      </option>
     </select>
    </div>
    <div class="flex items-center justify-end gap-3">
     <button class="bg-primaryBtn hover:bg-primaryBtnHover text-white px-6 py-1.5 rounded text-[13px] transition-colors shadow-sm">
      搜索
     </button>
     <button class="bg-white hover:bg-gray-50 text-gray-600 border border-gray-200 px-6 py-1.5 rounded text-[13px] transition-colors shadow-sm">
      重置
     </button>
    </div>
   </div>
  </div>
  <div class="bg-white rounded-xl shadow-sm border border-gray-100 flex flex-col flex-1">
   <div class="p-5 flex justify-between items-center border-b border-gray-100">
    <div class="flex items-center gap-6 text-[13px] flex-wrap">
     <div class="font-bold text-gray-800 text-[15px] mr-2">
      汇总统计
     </div>
     <div class="text-gray-500 change-highlight summary-stat">
      <span>
       标准账户交易手数(手):
      </span>
      <span class="text-primaryBtn font-bold text-lg change-highlight">
       0.25
      </span>
     </div>
     <div class="text-gray-500 change-highlight summary-stat">
      <span>
       美分账户交易手数(手):
      </span>
      <span class="text-primaryBtn font-bold text-lg change-highlight">
       0.15
      </span>
     </div>
     <div class="text-gray-500 change-highlight summary-stat">
      <span>
       库存费总计(USD):
      </span>
      <span class="font-bold text-lg change-highlight">
       0.00
      </span>
     </div>
     <div class="text-gray-500 change-highlight summary-stat">
      <span>
       手续费总计(USD):
      </span>
      <span class="font-bold text-lg change-highlight">
       0.00
      </span>
     </div>
     <div class="text-gray-500 change-highlight summary-stat">
      <span>
       客户盈亏总计(USD):
      </span>
      <span class="font-bold text-lg change-highlight">
       66.50
      </span>
     </div>
    </div>
    <button class="bg-primaryBtn hover:bg-primaryBtnHover text-white px-5 py-2 rounded text-[13px] transition-colors shadow-sm">
     报表导出
    </button>
   </div>
   <div class="overflow-x-auto flex-1">
    <table class="w-full custom-table">
     <thead class="bg-tableHeader">
      <tr>
       <th class="w-8">
       </th>
       <th>
        客户姓名
       </th>
       <th>
        MT账号
       </th>
       <th class="change-highlight">
        账户类型
       </th>
       <th class="change-highlight">
        手数
       </th>
       <th>
        客户邮箱
       </th>
       <th>
        订单编号
       </th>
       <th>
        持仓编号
       </th>
       <th>
        开仓时间(mt)
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
        结算价格
       </th>
       <th class="change-highlight">
        浮动盈亏(USD)
       </th>
       <th>
        状态类型
       </th>
       <th class="change-highlight">
        库存费(USD)
       </th>
      </tr>
     </thead>
     <tbody>
      <tr>
       <td>
        <button class="text-[#FF6B6B]">
         <i class="fas fa-chevron-right text-[10px] transition-transform">
         </i>
        </button>
       </td>
       <td class="text-left">
        <div class="font-medium text-gray-800">
         test-杨均
        </div>
       </td>
       <td>
        8100458
       </td>
       <td class="change-highlight">
        标准账户
       </td>
       <td class="change-highlight">
        标准手
       </td>
       <td>
        b13@qq.com
       </td>
       <td>
        604063
       </td>
       <td>
        604060
       </td>
       <td>
        2026-07-28 09:23:23
       </td>
       <td>
        XAUUSD
       </td>
       <td>
        卖出交易
       </td>
       <td>
        0.10
       </td>
       <td>
        4,046.00
       </td>
       <td>
        4,045.27
       </td>
       <td>
        -7.30
       </td>
       <td>
        平仓
       </td>
       <td>
        0.00
       </td>
      </tr>
      <tr class="hidden change-bg" id="tradeDetail1">
       <td>
       </td>
       <td class="text-left" colspan="16">
        <div class="detail-list">
         <div class="detail-row-item">
          <span class="detail-label">
           手续费(USD)
          </span>
          <span class="detail-value">
           0.00
          </span>
         </div>
         <div class="detail-row-item">
          <span class="detail-label">
           奖励(USD)
          </span>
          <span class="detail-value">
           -
          </span>
         </div>
         <div class="detail-row-item">
          <span class="detail-label">
           注释
          </span>
          <span class="detail-value">
           -
          </span>
         </div>
        </div>
       </td>
      </tr>
      <tr>
       <td>
        <button class="text-[#FF6B6B]">
         <i class="fas fa-chevron-right text-[10px] transition-transform">
         </i>
        </button>
       </td>
       <td class="text-left">
        <div class="font-medium text-gray-800">
         test-杨均
        </div>
       </td>
       <td class="change-highlight">
        9900456
       </td>
       <td class="change-highlight">
        美分账户
       </td>
       <td class="change-highlight">
        美分手
       </td>
       <td>
        b13@qq.com
       </td>
       <td class="change-highlight">
        511348
       </td>
       <td>
        511344
       </td>
       <td>
        2026-06-08 10:15:29
       </td>
       <td>
        XAGUSD
       </td>
       <td>
        卖出交易
       </td>
       <td>
        0.15
       </td>
       <td>
        67.04
       </td>
       <td>
        67.03
       </td>
       <td class="change-highlight multiline-cell">
        <span class="main-value change-highlight">
         75.60
        </span>
        <span class="sub-value change-highlight">
         USC 7,560
        </span>
       </td>
       <td>
        平仓
       </td>
       <td class="change-highlight multiline-cell">
        <span class="main-value change-highlight">
         0.00
        </span>
        <span class="sub-value change-highlight">
         USC 0
        </span>
       </td>
      </tr>
      <tr class="hidden change-bg" id="tradeDetail2">
       <td>
       </td>
       <td class="text-left" colspan="16">
        <div class="detail-list">
         <div class="detail-row-item">
          <span class="detail-label change-highlight">
           手续费(USD)
          </span>
          <span class="detail-value change-highlight">
           0.00
          </span>
         </div>
        </div>
       </td>
      </tr>
     </tbody>
    </table>
   </div>
   <div class="px-5 py-4 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
    <div>
     15条 / 页   2条记录，第 1/1页
    </div>
    <div class="flex items-center gap-2">
     <button class="w-8 h-8 rounded border border-gray-200 bg-white text-gray-300 cursor-not-allowed">
      <i class="fas fa-angle-left">
      </i>
     </button>
     <button class="w-8 h-8 rounded border border-primaryBtn bg-primaryBtn text-white">
      1
     </button>
     <button class="w-8 h-8 rounded border border-gray-200 bg-white text-gray-300 cursor-not-allowed">
      <i class="fas fa-angle-right">
      </i>
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
