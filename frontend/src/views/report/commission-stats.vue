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
 <div class="flex-1 min-w-0 flex flex-col gap-4 overflow-y-auto no-scrollbar">
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
   <div class="commission-stats-table-wrap min-w-0 flex-1 overflow-hidden">
    <table class="commission-stats-table w-full custom-table">
     <colgroup>
      <col style="width: 4%"/>
      <col style="width: 6%"/>
      <col style="width: 7%"/>
      <col style="width: 10%"/>
      <col style="width: 7%"/>
      <col style="width: 10%"/>
      <col style="width: 7%"/>
      <col style="width: 9%"/>
      <col style="width: 7%"/>
      <col style="width: 9%"/>
      <col style="width: 6%"/>
      <col style="width: 5%"/>
      <col style="width: 5%"/>
      <col style="width: 8%"/>
     </colgroup>
     <thead class="bg-tableHeader">
      <tr>
       <th class="commission-expand-column">
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
      <!-- Row 1 -->
      <tr :class="{ 'commission-row-expanded': expandedRowId === '143217' }">
       <td class="commission-expand-cell">
        <button
         type="button"
         class="commission-expand-button"
         :aria-expanded="expandedRowId === '143217'"
         aria-controls="commission-details-143217"
         :aria-label="expandedRowId === '143217' ? '收起记录 143217 详情' : '展开记录 143217 详情'"
         @click="toggleExpanded('143217')"
        >
         <i :class="['fa-solid', expandedRowId === '143217' ? 'fa-chevron-down' : 'fa-chevron-right', 'text-[10px]']"></i>
        </button>
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
        <div class="commission-user-cell">
         <span class="commission-user-name" title="test-测试-B">test-测试-B</span>
         <span class="commission-user-email" title="3218965885@qq.com">3218965885@qq.com</span>
        </div>
       </td>
       <td class="font-medium">
        8300248
       </td>
       <td>
        <div class="commission-user-cell">
         <span class="commission-user-name" title="华安">华安</span>
         <span class="commission-user-email" title="huaan@qqq.com">huaan@qqq.com</span>
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
      <tr v-show="expandedRowId === '143217'" id="commission-details-143217" class="expanded-row">
       <td class="commission-expanded-cell" colspan="14">
        <div class="commission-expanded-details">
         <div class="commission-expanded-item">
          <span class="commission-expanded-label">系统时间：</span>
          <span class="commission-expanded-value font-mono">返佣 2026-09-07 10:47:41　平仓 2026-09-07 10:47:26</span>
         </div>
         <div class="commission-expanded-item">
          <span class="commission-expanded-label">MT时间：</span>
          <span class="commission-expanded-value font-mono">返佣 2026-09-07 05:47:41　平仓 2026-09-07 05:47:26</span>
         </div>
         <div class="commission-expanded-item">
          <span class="commission-expanded-label">返佣类型：</span>
          <span class="commission-expanded-value">内佣 / stan-代理返佣-PIB</span>
         </div>
         <div class="commission-expanded-item">
          <span class="commission-expanded-label">返佣状态：</span>
          <span class="commission-expanded-value">已结算</span>
         </div>
         <div class="commission-expanded-item">
          <span class="commission-expanded-label">交易编号：</span>
          <span class="commission-expanded-value font-mono">开仓 1180850　平仓 1180852</span>
         </div>
        </div>
       </td>
      </tr>
      <!-- Row 2 -->
      <tr :class="{ 'commission-row-expanded': expandedRowId === '143215' }">
       <td class="commission-expand-cell">
        <button
         type="button"
         class="commission-expand-button"
         :aria-expanded="expandedRowId === '143215'"
         aria-controls="commission-details-143215"
         :aria-label="expandedRowId === '143215' ? '收起记录 143215 详情' : '展开记录 143215 详情'"
         @click="toggleExpanded('143215')"
        >
         <i :class="['fa-solid', expandedRowId === '143215' ? 'fa-chevron-down' : 'fa-chevron-right', 'text-[10px]']"></i>
        </button>
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
        <div class="commission-user-cell">
         <span class="commission-user-name" title="test-测试-B">test-测试-B</span>
         <span class="commission-user-email" title="3218965885@qq.com">3218965885@qq.com</span>
        </div>
       </td>
       <td class="font-medium">
        8300248
       </td>
       <td>
        <div class="commission-user-cell">
         <span class="commission-user-name" title="华安">华安</span>
         <span class="commission-user-email" title="huaan@qqq.com">huaan@qqq.com</span>
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
      <tr v-show="expandedRowId === '143215'" id="commission-details-143215" class="expanded-row">
       <td class="commission-expanded-cell" colspan="14">
        <p class="commission-expanded-empty">当前记录暂无其他详细信息</p>
       </td>
      </tr>
      <!-- Row 3 -->
      <tr :class="{ 'commission-row-expanded': expandedRowId === '143213' }">
       <td class="commission-expand-cell">
        <button
         type="button"
         class="commission-expand-button"
         :aria-expanded="expandedRowId === '143213'"
         aria-controls="commission-details-143213"
         :aria-label="expandedRowId === '143213' ? '收起记录 143213 详情' : '展开记录 143213 详情'"
         @click="toggleExpanded('143213')"
        >
         <i :class="['fa-solid', expandedRowId === '143213' ? 'fa-chevron-down' : 'fa-chevron-right', 'text-[10px]']"></i>
        </button>
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
        <div class="commission-user-cell">
         <span class="commission-user-name" title="test-测试-B">test-测试-B</span>
         <span class="commission-user-email" title="3218965885@qq.com">3218965885@qq.com</span>
        </div>
       </td>
       <td class="font-medium">
        8300248
       </td>
       <td>
        <div class="commission-user-cell">
         <span class="commission-user-name" title="华安">华安</span>
         <span class="commission-user-email" title="huaan@qqq.com">huaan@qqq.com</span>
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
      <tr v-show="expandedRowId === '143213'" id="commission-details-143213" class="expanded-row">
       <td class="commission-expanded-cell" colspan="14">
        <p class="commission-expanded-empty">当前记录暂无其他详细信息</p>
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
  </div>
</template>

<script setup>
import { ref } from 'vue'

const expandedRowId = ref(null)

function toggleExpanded(rowId) {
  expandedRowId.value = expandedRowId.value === rowId ? null : rowId
}
</script>

<style scoped>
.commission-stats-table {
  table-layout: fixed;
  border-collapse: separate;
  border-spacing: 0;
  font-size: 12px;
}

.commission-stats-table thead th {
  height: 46px;
  padding: 9px 6px;
  color: #6b7280;
  font-size: 12px;
  font-weight: 600;
  line-height: 16px;
  text-align: left;
  vertical-align: middle;
  white-space: normal;
  overflow-wrap: anywhere;
  border-bottom: 1px solid #e5e7eb;
}

.commission-stats-table tbody td {
  height: 54px;
  padding: 9px 6px;
  color: #4b5563;
  line-height: 17px;
  text-align: left;
  vertical-align: middle;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  border-bottom: 1px solid #f1f3f5;
}

.commission-stats-table .commission-expand-column,
.commission-stats-table .commission-expand-cell {
  padding-right: 3px;
  padding-left: 3px;
  text-align: center;
}

.commission-expand-button {
  display: inline-flex;
  width: 24px;
  height: 24px;
  align-items: center;
  justify-content: center;
  color: #d84a4a;
  border-radius: 4px;
  transition: background-color 0.15s ease, color 0.15s ease;
}

.commission-expand-button:hover {
  color: #c53030;
  background-color: #fef2f2;
}

.commission-expand-button:focus-visible {
  outline: 2px solid #d1a84f;
  outline-offset: 1px;
}

.commission-row-expanded > td {
  background-color: #f9fafb;
}

.commission-stats-table tbody tr:not(.expanded-row):hover td {
  background-color: #f9fafb;
}

.commission-stats-table tbody td:nth-child(10) {
  padding-right: 8px;
  padding-left: 4px;
  text-align: right;
  font-variant-numeric: tabular-nums;
  overflow: visible;
  text-overflow: clip;
}

.commission-stats-table tbody td:nth-child(14) {
  font-size: 11px;
  white-space: nowrap;
}

.commission-user-cell {
  display: flex;
  min-width: 0;
  flex-direction: column;
  align-items: flex-start;
  gap: 2px;
  overflow: hidden;
  line-height: 15px;
}

.commission-user-name,
.commission-user-email {
  display: block;
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.commission-user-name {
  color: #4b5563;
  font-size: 12px;
}

.commission-user-email {
  color: #6b7280;
  font-size: 11px;
}

.commission-stats-table tbody td.commission-expanded-cell {
  height: auto;
  padding: 10px 12px !important;
  white-space: normal;
  overflow: visible;
  background-color: #f8fafc;
}

.commission-expanded-details {
  display: grid;
  width: 100%;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 4px 16px;
}

.commission-expanded-item {
  display: flex;
  min-width: 0;
  align-items: baseline;
  flex-wrap: wrap;
  column-gap: 5px;
  padding: 2px 0;
}

.commission-expanded-label {
  color: #6b7280;
  font-size: 11px;
  font-weight: 600;
  line-height: 15px;
  white-space: nowrap;
}

.commission-expanded-value {
  min-width: 0;
  color: #4b5563;
  font-size: 12px;
  line-height: 17px;
  overflow-wrap: anywhere;
}

.commission-expanded-empty {
  margin: 0;
  padding: 2px 0;
  color: #9ca3af;
  font-size: 12px;
  line-height: 18px;
}

@media (max-width: 1100px) {
  .commission-expanded-details {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 640px) {
  .commission-expanded-details {
    grid-template-columns: minmax(0, 1fr);
  }
}
</style>
