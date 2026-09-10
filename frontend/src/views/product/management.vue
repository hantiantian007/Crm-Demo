<template>
  <div class="flex h-full bg-mainBg overflow-hidden">
    <div class="flex-1 flex flex-col min-w-0 bg-gray-50 overflow-hidden p-4 custom-scrollbar overflow-y-auto">
      <div class="w-full bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden flex flex-col flex-1">
 <!-- 卡片头部与搜索 -->
 <div class="px-6 py-5 border-b border-gray-200 bg-white">
  <div class="flex justify-between items-center mb-6">
   <div>
    <h2 class="text-xl font-bold text-gray-800">
     商品管理列表
    </h2>
    <p class="text-sm text-gray-500 mt-1">
     维护和管理智能交易系统商品，支持实体/虚拟类型及多支付方式配置
    </p>
   </div>
   <button class="px-4 py-2 bg-primary hover:bg-primaryHover text-white rounded shadow-sm text-sm font-medium transition-colors flex items-center gap-2">
    <i class="fas fa-plus">
    </i>
    新增商品
   </button>
  </div>
  <div class="flex flex-wrap gap-4 items-end">
   <div class="w-64">
    <label class="block text-xs font-medium text-gray-700 mb-1">
     商品名称
    </label>
    <input class="w-full text-sm border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-shadow" placeholder="输入商品名称" type="text"/>
   </div>
   <div class="w-48">
    <label class="block text-xs font-medium text-gray-700 mb-1">
     商品类型
    </label>
    <select class="w-full text-sm border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary bg-white">
     <option value="">
      全部类型
     </option>
     <option value="virtual">
      虚拟商品
     </option>
    </select>
   </div>
   <div class="w-48">
    <label class="block text-xs font-medium text-gray-700 mb-1">
     状态
    </label>
    <select class="w-full text-sm border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary bg-white">
     <option value="">
      全部状态
     </option>
     <option value="active">
      已上架
     </option>
     <option value="scheduled">
      定时上架
     </option>
     <option value="inactive">
      已下架
     </option>
    </select>
   </div>
   <div class="flex gap-2">
    <button class="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded text-sm font-medium transition-colors">
     重置
    </button>
    <button class="px-4 py-2 bg-[#55B9B9] hover:bg-[#45a3a3] text-white rounded text-sm font-medium transition-colors shadow-sm">
     查询
    </button>
   </div>
  </div>
 </div>
 <!-- 表格区域 -->
 <div class="flex-1 overflow-auto bg-gray-50/30 p-6 pb-48">
  <div class="bg-white rounded-lg border border-gray-200 shadow-sm">
   <table class="w-full text-sm text-left">
    <thead class="bg-gray-50 text-gray-600 font-medium border-b border-gray-200">
     <tr>
      <th class="px-6 py-4">
       商品信息
      </th>
      <th class="px-6 py-4">
       支持支付方式
      </th>
      <th class="px-6 py-4">
       库存/销量
      </th>
      <th class="px-6 py-4">
       基础售价
      </th>
      <th class="px-6 py-4">
       浏览数据
      </th>
      <th class="px-6 py-4">
       状态
      </th>
      <th class="px-6 py-4">
       更新时间
      </th>
      <th class="px-6 py-4">
       更新人
      </th>
      <th class="px-6 py-4 text-right">
       操作
      </th>
     </tr>
    </thead>
    <tbody class="divide-y divide-gray-100">
     <tr class="hover:bg-gray-50 transition-colors">
      <td class="px-6 py-4">
       <div class="flex items-center gap-3">
        <div class="w-10 h-10 rounded bg-teal-50 flex items-center justify-center text-teal-500 shrink-0">
         <i class="fas fa-code text-lg">
         </i>
        </div>
        <div>
         <div class="font-medium text-gray-800">
          先锋二号
         </div>
         <div class="text-xs text-gray-500 mt-0.5">
          ID: PRD-004
         </div>
        </div>
       </div>
      </td>
      <td class="px-6 py-4">
       <div class="flex flex-col gap-1.5">
        <span class="inline-flex items-center gap-1 text-xs text-gray-600">
         <i class="fas fa-wallet text-gray-400">
         </i>
         余额购买
        </span>
       </div>
      </td>
      <td class="px-6 py-4">
       <div class="flex flex-col gap-1">
        <span class="text-sm font-medium text-gray-800">
         库存: 9999
        </span>
        <span class="text-xs text-gray-500">
         销量: 128
        </span>
       </div>
      </td>
      <td class="px-6 py-4">
       <div class="text-sm font-medium text-gray-800">
        $800.00
        <span class="text-xs text-gray-500 font-normal px-1.5 py-0.5 bg-gray-100 rounded ml-1">
         无时间限制
        </span>
       </div>
      </td>
      <td class="px-6 py-4">
       <div class="flex flex-col gap-1">
        <div class="text-xs text-gray-500">
         浏览量(PV):
         <span class="font-medium text-gray-800">
          1,234
         </span>
        </div>
        <div class="text-xs text-gray-500">
         访客数(UV):
         <span class="font-medium text-gray-800">
          856
         </span>
        </div>
       </div>
      </td>
      <td class="px-6 py-4">
       <div class="flex flex-col gap-1">
        <div class="text-xs text-gray-500">
         浏览量(PV):
         <span class="font-medium text-gray-800">
          3,456
         </span>
        </div>
        <div class="text-xs text-gray-500">
         访客数(UV):
         <span class="font-medium text-gray-800">
          2,100
         </span>
        </div>
       </div>
      </td>
      <td class="px-6 py-4">
       <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-green-50 text-green-700 border border-green-100">
        <span class="w-1.5 h-1.5 rounded-full bg-green-500">
        </span>
        已上架
       </span>
      </td>
      <td class="px-6 py-4 text-gray-500">
       2026-06-25 11:30:00
      </td>
      <td class="px-6 py-4">
       <span class="text-sm text-gray-700">
        李四
       </span>
      </td>
      <td class="px-6 py-4 text-right">
       <button class="text-primary hover:text-primaryHover font-medium text-sm transition-colors mr-3">
        编辑
       </button>
       <button class="text-red-500 hover:text-red-700 font-medium text-sm transition-colors">
        下架
       </button>
      </td>
     </tr>
     <tr class="hover:bg-gray-50 transition-colors">
      <td class="px-6 py-4">
       <div class="flex items-center gap-3">
        <div class="w-10 h-10 rounded bg-blue-50 flex items-center justify-center text-blue-500 shrink-0">
         <i class="fas fa-robot text-lg">
         </i>
        </div>
        <div>
         <div class="font-medium text-gray-800">
          先锋一号
         </div>
         <div class="text-xs text-gray-500 mt-0.5">
          ID: PRD-001
         </div>
        </div>
       </div>
      </td>
      <td class="px-6 py-4">
       <div class="flex flex-col gap-1.5">
        <span class="inline-flex items-center gap-1 text-xs text-gray-600">
         <i class="fas fa-wallet text-gray-400">
         </i>
         余额购买
        </span>
       </div>
      </td>
      <td class="px-6 py-4">
       <div class="flex flex-col gap-1">
        <span class="text-sm font-medium text-gray-800">
         库存: 999
        </span>
        <span class="text-xs text-gray-500">
         销量: 56
        </span>
       </div>
      </td>
      <td class="px-6 py-4">
       <div class="text-sm font-medium text-gray-800 cursor-help relative group" onmouseenter="showPackageTooltip(this)" onmouseleave="hidePackageTooltip(this)">
        $5,000.00 起
        <span class="text-xs text-primary font-normal px-1.5 py-0.5 bg-blue-50 border border-blue-100 rounded ml-1 transition-colors group-hover:bg-blue-100">
         多套餐
         <i class="fas fa-chevron-down text-[10px] ml-0.5">
         </i>
        </span>
        <!-- 套餐预览浮层 (Tooltip) -->
        <div class="hidden absolute top-full left-0 mt-2 w-72 bg-white rounded-lg shadow-xl border border-gray-100 z-50 p-1">
         <div class="px-3 py-2 border-b border-gray-50 flex justify-between items-center">
          <span class="text-xs font-bold text-gray-800">
           套餐明细 (3)
          </span>
         </div>
         <div class="p-2 space-y-1">
          <div class="flex justify-between items-center px-2 py-1.5 hover:bg-gray-50 rounded transition-colors">
           <div class="flex-1 min-w-0 pr-3">
            <div class="text-sm font-medium text-gray-800 truncate" title="基础版">
             基础版
            </div>
            <div class="text-xs text-gray-500">
             库存: 100
            </div>
           </div>
           <div class="text-right shrink-0">
            <div class="text-sm font-bold text-gray-900">
             $5,000.00
             <span class="text-xs text-gray-500 font-normal">
              /月
             </span>
            </div>
            <div class="text-[10px] text-gray-400 line-through">
             原价: $6,000.00
            </div>
           </div>
          </div>
          <div class="flex justify-between items-center px-2 py-1.5 hover:bg-gray-50 rounded transition-colors">
           <div class="flex-1 min-w-0 pr-3">
            <div class="text-sm font-medium text-gray-800 truncate" title="进阶版">
             进阶版
            </div>
            <div class="text-xs text-gray-500">
             库存: 50
            </div>
           </div>
           <div class="text-right shrink-0">
            <div class="text-sm font-bold text-gray-900">
             $13,500.00
             <span class="text-xs text-gray-500 font-normal">
              /季
             </span>
            </div>
            <div class="text-[10px] text-gray-400 line-through">
             原价: $15,000.00
            </div>
           </div>
          </div>
          <div class="flex justify-between items-center px-2 py-1.5 hover:bg-gray-50 rounded transition-colors">
           <div class="flex-1 min-w-0 pr-3">
            <div class="text-sm font-medium text-gray-800 truncate" title="这是一个为了测试超过三十个字符而专门设置的很长很长的套餐名称示例">
             这是一个为了测试超过三十个字符而专门设置的很长很长的套餐名称示例
            </div>
            <div class="text-xs text-red-500">
             库存: 0 (售罄)
            </div>
           </div>
           <div class="text-right shrink-0">
            <div class="text-sm font-bold text-gray-900">
             $48,000.00
             <span class="text-xs text-gray-500 font-normal">
              /年
             </span>
            </div>
            <div class="text-[10px] text-gray-400 line-through">
             原价: $60,000.00
            </div>
           </div>
          </div>
         </div>
        </div>
       </div>
      </td>
      <td class="px-6 py-4">
       <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-green-50 text-green-700 border border-green-100">
        <span class="w-1.5 h-1.5 rounded-full bg-green-500">
        </span>
        已上架
       </span>
      </td>
      <td class="px-6 py-4 text-gray-500">
       2026-06-25 10:00:00
      </td>
      <td class="px-6 py-4">
       <span class="text-sm text-gray-700">
        张三
       </span>
      </td>
      <td class="px-6 py-4 text-right">
       <button class="text-primary hover:text-primaryHover font-medium text-sm transition-colors mr-3">
        编辑
       </button>
       <button class="text-red-500 hover:text-red-700 font-medium text-sm transition-colors">
        下架
       </button>
      </td>
     </tr>
     <tr class="hover:bg-gray-50 transition-colors">
      <td class="px-6 py-4">
       <div class="flex items-center gap-3">
        <div class="w-10 h-10 rounded bg-orange-50 flex items-center justify-center text-orange-500 shrink-0">
         <i class="fas fa-gift text-lg">
         </i>
        </div>
        <div>
         <div class="font-medium text-gray-800">
          先锋三号
         </div>
         <div class="text-xs text-gray-500 mt-0.5">
          ID: PRD-002
         </div>
        </div>
       </div>
      </td>
      <td class="px-6 py-4">
       <div class="flex flex-col gap-1.5">
        <span class="inline-flex items-center gap-1 text-xs text-gray-600">
         <i class="fas fa-wallet text-blue-500">
         </i>
         余额购买
        </span>
       </div>
      </td>
      <td class="px-6 py-4">
       <div class="flex flex-col gap-1">
        <span class="text-sm font-bold text-red-500">
         库存: 0 (售罄)
        </span>
        <span class="text-xs text-gray-500">
         销量: 245
        </span>
       </div>
      </td>
      <td class="px-6 py-4">
       <div class="text-sm font-medium text-gray-800">
        $1,500.00
        <span class="text-xs text-gray-500 font-normal px-1.5 py-0.5 bg-gray-100 rounded ml-1">
         无时间限制
        </span>
       </div>
      </td>
      <td class="px-6 py-4">
       <div class="flex flex-col gap-1">
        <div class="text-xs text-gray-500">
         浏览量(PV):
         <span class="font-medium text-gray-800">
          89
         </span>
        </div>
        <div class="text-xs text-gray-500">
         访客数(UV):
         <span class="font-medium text-gray-800">
          45
         </span>
        </div>
       </div>
      </td>
      <td class="px-6 py-4">
       <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-green-50 text-green-700 border border-green-100">
        <span class="w-1.5 h-1.5 rounded-full bg-green-500">
        </span>
        已上架
       </span>
      </td>
      <td class="px-6 py-4 text-gray-500">
       2026-06-20 15:30:12
      </td>
      <td class="px-6 py-4">
       <span class="text-sm text-gray-700">
        王五
       </span>
      </td>
      <td class="px-6 py-4 text-right">
       <button class="text-primary hover:text-primaryHover font-medium text-sm transition-colors mr-3">
        编辑
       </button>
       <button class="text-red-500 hover:text-red-700 font-medium text-sm transition-colors">
        下架
       </button>
      </td>
     </tr>
     <tr class="hover:bg-gray-50 transition-colors">
      <td class="px-6 py-4">
       <div class="flex items-center gap-3">
        <div class="w-10 h-10 rounded bg-purple-50 flex items-center justify-center text-purple-500 shrink-0">
         <i class="fas fa-book-open text-lg">
         </i>
        </div>
        <div>
         <div class="font-medium text-gray-800">
          先锋四号
         </div>
         <div class="text-xs text-gray-500 mt-0.5">
          ID: PRD-003
         </div>
        </div>
       </div>
      </td>
      <td class="px-6 py-4">
       <div class="flex flex-col gap-1.5">
        <span class="inline-flex items-center gap-1 text-xs text-gray-600">
         <i class="fas fa-wallet text-gray-400">
         </i>
         余额购买
        </span>
       </div>
      </td>
      <td class="px-6 py-4">
       <div class="flex flex-col gap-1">
        <span class="text-sm font-medium text-gray-800">
         库存: 50
        </span>
        <span class="text-xs text-gray-500">
         销量: 0
        </span>
       </div>
      </td>
      <td class="px-6 py-4">
       <div class="flex flex-col gap-1 text-sm font-medium">
        <div class="text-gray-800 cursor-help relative group" onmouseenter="showPackageTooltip(this)" onmouseleave="hidePackageTooltip(this)">
         $1,200.00 起
         <span class="text-xs text-primary font-normal px-1.5 py-0.5 bg-blue-50 border border-blue-100 rounded ml-1 transition-colors group-hover:bg-blue-100">
          多套餐
          <i class="fas fa-chevron-down text-[10px] ml-0.5">
          </i>
         </span>
         <!-- 套餐预览浮层 (Tooltip) -->
         <div class="hidden absolute top-full left-0 mt-2 w-72 bg-white rounded-lg shadow-xl border border-gray-100 z-50 p-1">
          <div class="px-3 py-2 border-b border-gray-50 flex justify-between items-center">
           <span class="text-xs font-bold text-gray-800">
            套餐明细 (2)
           </span>
          </div>
          <div class="p-2 space-y-1">
           <div class="flex justify-between items-center px-2 py-1.5 hover:bg-gray-50 rounded transition-colors">
            <div class="flex-1 min-w-0 pr-3">
             <div class="text-sm font-medium text-gray-800 truncate" title="体验版">
              体验版
             </div>
             <div class="text-xs text-gray-500">
              库存: 50
             </div>
            </div>
            <div class="text-right shrink-0">
             <div class="text-sm font-bold text-gray-900">
              $1,200.00
              <span class="text-xs text-gray-500 font-normal">
               /周
              </span>
             </div>
             <div class="text-[10px] text-gray-400 line-through">
              原价: $1,500.00
             </div>
            </div>
           </div>
           <div class="flex justify-between items-center px-2 py-1.5 hover:bg-gray-50 rounded transition-colors">
            <div class="flex-1 min-w-0 pr-3">
             <div class="text-sm font-medium text-gray-800 truncate" title="正式版">
              正式版
             </div>
             <div class="text-xs text-gray-500">
              库存: 20
             </div>
            </div>
            <div class="text-right shrink-0">
             <div class="text-sm font-bold text-gray-900">
              $4,500.00
              <span class="text-xs text-gray-500 font-normal">
               /月
              </span>
             </div>
             <div class="text-[10px] text-gray-400 line-through">
              原价: $5,500.00
             </div>
            </div>
           </div>
          </div>
         </div>
        </div>
       </div>
      </td>
      <td class="px-6 py-4">
       <div class="flex flex-col gap-1">
        <div class="text-xs text-gray-500">
         浏览量(PV):
         <span class="font-medium text-gray-800">
          45
         </span>
        </div>
        <div class="text-xs text-gray-500">
         访客数(UV):
         <span class="font-medium text-gray-800">
          20
         </span>
        </div>
       </div>
      </td>
      <td class="px-6 py-4">
       <div class="flex flex-col items-start gap-1">
        <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-100">
         <i class="far fa-clock text-blue-500">
         </i>
         定时上架
        </span>
        <span class="text-[10px] text-gray-500 ml-1">
         2026-07-01 10:00
        </span>
       </div>
      </td>
      <td class="px-6 py-4 text-gray-500">
       2026-06-15 09:12:00
      </td>
      <td class="px-6 py-4">
       <span class="text-sm text-gray-700">
        赵六
       </span>
      </td>
      <td class="px-6 py-4 text-right">
       <button class="text-primary hover:text-primaryHover font-medium text-sm transition-colors mr-3">
        编辑
       </button>
       <button class="text-green-600 hover:text-green-800 font-medium text-sm transition-colors">
        上架
       </button>
      </td>
     </tr>
    </tbody>
   </table>
  </div>
 </div>
</div>

    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
</script>
