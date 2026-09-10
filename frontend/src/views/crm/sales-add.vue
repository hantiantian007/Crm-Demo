<template>
  <div class="flex h-full bg-mainBg overflow-hidden">
    <div class="flex-1 flex flex-col min-w-0 bg-gray-50 overflow-hidden p-4 custom-scrollbar overflow-y-auto">
      <div class="flex-1 p-6 overflow-y-auto">
 <div class="bg-white rounded shadow-sm border border-gray-200">
  <!-- 标题 -->
  <div class="px-6 py-4 border-b border-gray-200">
   <h1 class="text-xl font-bold text-gray-800">
    新增销售
   </h1>
  </div>
  <!-- 表单内容 -->
  <div class="p-6 w-full">
   <!-- 1. 基础配置 -->
   <div class="section-card">
    <div class="section-header">
     基础配置
    </div>
    <div class="section-body">
     <div class="form-row items-center">
      <label class="form-label !pt-0">
       <span class="required-star">
        *
       </span>
       销售名称：
      </label>
      <div class="form-content relative" id="salesNameContainer">
       <div class="relative w-[400px]">
        <input autocomplete="off" class="form-input pr-8 w-full" id="salesNameInput" onfocus="showSalesDropdown()" onkeyup="filterSales()" placeholder="请输入销售名称或邮箱进行检索..." type="text"/>
        <i class="fa-solid fa-magnifying-glass absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
        </i>
       </div>
       <ul class="absolute z-10 w-[400px] bg-white border border-gray-200 rounded shadow-lg mt-1 hidden max-h-48 overflow-y-auto" id="salesDropdown">
        <li class="px-4 py-2 hover:bg-gray-50 cursor-pointer text-sm text-gray-700 border-b border-gray-100">
         刘浩 (liuhao@qq.com)
        </li>
        <li class="px-4 py-2 hover:bg-gray-50 cursor-pointer text-sm text-gray-700 border-b border-gray-100">
         张三 (zhangsan@qq.com)
        </li>
        <li class="px-4 py-2 hover:bg-gray-50 cursor-pointer text-sm text-gray-700">
         李四 (lisi@qq.com)
        </li>
       </ul>
      </div>
     </div>
     <div class="form-row items-center">
      <label class="form-label !pt-0">
       <span class="required-star">
        *
       </span>
       是否享受返佣：
      </label>
      <div class="form-content">
       <select class="form-select">
        <option value="">
         请选择
        </option>
        <option value="1">
         是
        </option>
        <option value="0">
         否
        </option>
       </select>
      </div>
     </div>
    </div>
   </div>
   <!-- 2. 交易奖励配置 -->
   <div class="section-card">
    <div class="section-header">
     交易奖励配置
    </div>
    <div class="section-body">
     <div class="form-row items-center">
      <label class="form-label !pt-0">
       <span class="required-star">
        *
       </span>
       是否开启交易奖励：
      </label>
      <div class="form-content">
       <select class="form-select" onchange="toggleTradeRewardSection(this)">
        <option value="">
         请选择
        </option>
        <option value="1">
         是
        </option>
        <option value="0">
         否
        </option>
       </select>
      </div>
     </div>
     <div id="tradeRewardConfigSection">
      <div class="form-row items-center">
       <label class="form-label !pt-0">
        <span class="required-star">
         *
        </span>
        奖励计算方式：
       </label>
       <div class="form-content flex items-center gap-6">
        <label class="flex items-center cursor-pointer">
         <input checked="" class="w-4 h-4 text-primary focus:ring-primary border-gray-300" name="reward_type" onchange="toggleTradeReward()" type="radio" value="unified"/>
         <span class="ml-2 text-sm text-gray-700">
          统一计算
         </span>
        </label>
        <label class="flex items-center cursor-pointer">
         <input class="w-4 h-4 text-primary focus:ring-primary border-gray-300" name="reward_type" onchange="toggleTradeReward()" type="radio" value="rule"/>
         <span class="ml-2 text-sm text-gray-700">
          规则计算
         </span>
        </label>
       </div>
      </div>
      <div class="form-row">
       <label class="form-label">
        <span class="required-star">
         *
        </span>
        交易奖励金额：
       </label>
       <div class="form-content">
        <!-- 统一计算：使用稳定的 Table 布局 -->
        <div class="inline-block" id="tradeRewardTable">
         <div class="flex justify-end mb-2">
          <button class="text-primary text-sm hover:text-[#36A29A] transition-colors flex items-center border border-primary bg-white px-3 py-1 rounded shadow-sm" id="tradeRewardEditBtn" type="button">
           <i class="fa-solid fa-pen-to-square mr-1">
           </i>
           <span>
            编辑
           </span>
          </button>
         </div>
         <div class="border border-gray-200 rounded overflow-hidden shadow-sm">
          <table class="w-full text-sm text-center border-collapse bg-white">
           <thead class="bg-[#41B8AF] text-white">
            <tr>
             <th class="py-2.5 px-2 font-medium border-r border-white/20 w-24">
              外汇
             </th>
             <th class="py-2.5 px-2 font-medium border-r border-white/20 w-24">
              黄金
             </th>
             <th class="py-2.5 px-2 font-medium border-r border-white/20 w-24">
              白银
             </th>
             <th class="py-2.5 px-2 font-medium border-r border-white/20 w-24">
              原油
             </th>
             <th class="py-2.5 px-2 font-medium border-r border-white/20 w-24">
              比特币
             </th>
             <th class="py-2.5 px-2 font-medium border-r border-white/20 w-24">
              数字货币
             </th>
             <th class="py-2.5 px-2 font-medium border-r border-white/20 w-24">
              股指
             </th>
             <th class="py-2.5 px-2 font-medium w-24">
              公金条
             </th>
            </tr>
           </thead>
           <tbody>
            <tr class="border-b border-gray-200">
             <td class="p-2 border-r border-gray-200">
              <select class="w-full text-xs border border-gray-300 rounded p-1.5 focus:border-primary outline-none">
               <option>
                请选择
               </option>
               <option value="fixed">
                固定金额
               </option>
               <option value="pip">
                点值
               </option>
              </select>
             </td>
             <td class="p-2 border-r border-gray-200">
              <select class="w-full text-xs border border-gray-300 rounded p-1.5 focus:border-primary outline-none">
               <option>
                请选择
               </option>
               <option value="fixed">
                固定金额
               </option>
               <option value="pip">
                点值
               </option>
              </select>
             </td>
             <td class="p-2 border-r border-gray-200">
              <select class="w-full text-xs border border-gray-300 rounded p-1.5 focus:border-primary outline-none">
               <option>
                请选择
               </option>
               <option value="fixed">
                固定金额
               </option>
               <option value="pip">
                点值
               </option>
              </select>
             </td>
             <td class="p-2 border-r border-gray-200">
              <select class="w-full text-xs border border-gray-300 rounded p-1.5 focus:border-primary outline-none">
               <option>
                请选择
               </option>
               <option value="fixed">
                固定金额
               </option>
               <option value="pip">
                点值
               </option>
              </select>
             </td>
             <td class="p-2 border-r border-gray-200">
              <select class="w-full text-xs border border-gray-300 rounded p-1.5 focus:border-primary outline-none">
               <option>
                请选择
               </option>
               <option value="fixed">
                固定金额
               </option>
               <option value="pip">
                点值
               </option>
              </select>
             </td>
             <td class="p-2 border-r border-gray-200">
              <select class="w-full text-xs border border-gray-300 rounded p-1.5 focus:border-primary outline-none">
               <option>
                请选择
               </option>
               <option value="fixed">
                固定金额
               </option>
               <option value="pip">
                点值
               </option>
              </select>
             </td>
             <td class="p-2 border-r border-gray-200">
              <select class="w-full text-xs border border-gray-300 rounded p-1.5 focus:border-primary outline-none">
               <option>
                请选择
               </option>
               <option value="fixed">
                固定金额
               </option>
               <option value="pip">
                点值
               </option>
              </select>
             </td>
             <td class="p-2">
              <select class="w-full text-xs border border-gray-300 rounded p-1.5 focus:border-primary outline-none">
               <option>
                请选择
               </option>
               <option value="fixed">
                固定金额
               </option>
               <option value="pip">
                点值
               </option>
              </select>
             </td>
            </tr>
            <tr>
             <td class="p-2 border-r border-gray-200">
              <input class="w-full text-xs border border-gray-300 rounded p-1.5 text-center focus:border-primary outline-none" oninput="formatDecimal(this)" placeholder="请输入" type="text"/>
             </td>
             <td class="p-2 border-r border-gray-200">
              <input class="w-full text-xs border border-gray-300 rounded p-1.5 text-center focus:border-primary outline-none" oninput="formatDecimal(this)" placeholder="请输入" type="text"/>
             </td>
             <td class="p-2 border-r border-gray-200">
              <input class="w-full text-xs border border-gray-300 rounded p-1.5 text-center focus:border-primary outline-none" oninput="formatDecimal(this)" placeholder="请输入" type="text"/>
             </td>
             <td class="p-2 border-r border-gray-200">
              <input class="w-full text-xs border border-gray-300 rounded p-1.5 text-center focus:border-primary outline-none" oninput="formatDecimal(this)" placeholder="请输入" type="text"/>
             </td>
             <td class="p-2 border-r border-gray-200">
              <input class="w-full text-xs border border-gray-300 rounded p-1.5 text-center focus:border-primary outline-none" oninput="formatDecimal(this)" placeholder="请输入" type="text"/>
             </td>
             <td class="p-2 border-r border-gray-200">
              <input class="w-full text-xs border border-gray-300 rounded p-1.5 text-center focus:border-primary outline-none" oninput="formatDecimal(this)" placeholder="请输入" type="text"/>
             </td>
             <td class="p-2 border-r border-gray-200">
              <input class="w-full text-xs border border-gray-300 rounded p-1.5 text-center focus:border-primary outline-none" oninput="formatDecimal(this)" placeholder="请输入" type="text"/>
             </td>
             <td class="p-2">
              <input class="w-full text-xs border border-gray-300 rounded p-1.5 text-center focus:border-primary outline-none" oninput="formatDecimal(this)" placeholder="请输入" type="text"/>
             </td>
            </tr>
           </tbody>
          </table>
         </div>
        </div>
        <!-- 规则计算：点击配置按钮 -->
        <div class="hidden w-[400px] border border-primary border-dashed rounded bg-blue-50 items-center justify-center text-sm text-primary cursor-pointer hover:bg-blue-100 h-[100px] transition-colors" id="tradeRewardBtn">
         <i class="fa-solid fa-plus mr-2">
         </i>
         点击配置规则
        </div>
       </div>
      </div>
      <div class="form-row items-center">
       <label class="form-label !pt-0">
        <span class="required-star">
         *
        </span>
        交易持仓间隔：
       </label>
       <div class="form-content flex items-center gap-2">
        <input class="form-input" oninput="formatDecimal(this)" placeholder="请输入持仓间隔" type="text"/>
        <span class="text-sm text-gray-600">
         秒
        </span>
       </div>
      </div>
      <div class="form-row items-center">
       <label class="form-label !pt-0">
        <span class="required-star">
         *
        </span>
        交易奖励结算周期：
       </label>
       <div class="form-content">
        <select class="form-select">
         <option value="">
          请选择
         </option>
         <option value="realtime">
          实时
         </option>
         <option value="daily">
          每日
         </option>
         <option value="weekly">
          每周
         </option>
         <option value="monthly">
          每月
         </option>
         <option value="quarterly">
          每季度
         </option>
         <option value="yearly">
          每年
         </option>
        </select>
       </div>
      </div>
     </div>
    </div>
   </div>
   <!-- 3. 净入金奖励配置 -->
   <div class="section-card">
    <div class="section-header">
     净入金奖励配置
    </div>
    <div class="section-body">
     <div class="form-row items-center">
      <label class="form-label !pt-0">
       <span class="required-star">
        *
       </span>
       是否开启净入金奖励：
      </label>
      <div class="form-content">
       <select class="form-select" onchange="toggleNetDepositRewardSection(this)">
        <option value="">
         请选择
        </option>
        <option value="1">
         是
        </option>
        <option value="0">
         否
        </option>
       </select>
      </div>
     </div>
     <div id="netDepositRewardConfigSection" style="display: none;">
      <div class="form-row items-center">
       <label class="form-label !pt-0">
        <span class="required-star">
         *
        </span>
        是否计算历史净入金：
       </label>
       <div class="form-content">
        <select class="form-select">
         <option value="">
          请选择
         </option>
         <option value="1">
          是
         </option>
         <option value="0">
          否
         </option>
        </select>
       </div>
      </div>
      <div class="form-row items-center">
       <label class="form-label !pt-0">
        <span class="required-star">
         *
        </span>
        是否计算历史交易量：
       </label>
       <div class="form-content">
        <select class="form-select">
         <option value="">
          请选择
         </option>
         <option value="1">
          是
         </option>
         <option value="0">
          否
         </option>
        </select>
       </div>
      </div>
      <div class="form-row items-center" id="calcStartTimeSection">
       <label class="form-label !pt-0">
        <span class="required-star">
         *
        </span>
        计算开始时间：
       </label>
       <div class="form-content flex items-center gap-6">
        <label class="flex items-center cursor-pointer">
         <input checked="" class="w-4 h-4 text-primary focus:ring-primary border-gray-300" name="start_time" type="radio" value="register"/>
         <span class="ml-2 text-sm text-gray-700">
          注册时间
         </span>
        </label>
        <label class="flex items-center cursor-pointer">
         <input class="w-4 h-4 text-primary focus:ring-primary border-gray-300" name="start_time" type="radio" value="rule"/>
         <span class="ml-2 text-sm text-gray-700">
          规则启动时间
         </span>
        </label>
       </div>
      </div>
      <div class="form-row items-center">
       <label class="form-label !pt-0">
        <span class="required-star">
         *
        </span>
        交易量规则：
       </label>
       <div class="form-content flex gap-3">
        <select class="form-select !w-[160px]" id="tradeVolumeRuleSelect" onchange="toggleTradeVolumeRule()">
         <option value="">
          请选择
         </option>
         <option value="single">
          单个用户
         </option>
         <option value="all">
          所有用户合计计算
         </option>
         <option value="group">
          按分组/代理计算
         </option>
        </select>
        <!-- 单个/所有用户：输入框 -->
        <input class="form-input !w-[228px] hidden" id="tradeVolumeInput" oninput="formatDecimal(this)" placeholder="请输入交易手数条件" type="text"/>
        <!-- 分组/代理计算：点击配置按钮 -->
        <div class="hidden w-[228px] border border-primary border-dashed rounded bg-blue-50 items-center justify-center text-sm text-primary cursor-pointer hover:bg-blue-100 h-[38px] transition-colors" id="tradeVolumeBtn">
         <i class="fa-solid fa-plus mr-2">
         </i>
         点击配置
        </div>
       </div>
      </div>
      <div class="form-row items-center">
       <label class="form-label !pt-0">
        <span class="required-star">
         *
        </span>
        奖励计算方式：
       </label>
       <div class="form-content flex items-center gap-6">
        <label class="flex items-center cursor-pointer">
         <input checked="" class="w-4 h-4 text-primary focus:ring-primary border-gray-300" name="net_reward_type" onchange="toggleNetReward()" type="radio" value="unified"/>
         <span class="ml-2 text-sm text-gray-700">
          统一计算
         </span>
        </label>
        <label class="flex items-center cursor-pointer">
         <input class="w-4 h-4 text-primary focus:ring-primary border-gray-300" name="net_reward_type" onchange="toggleNetReward()" type="radio" value="rule"/>
         <span class="ml-2 text-sm text-gray-700">
          规则计算
         </span>
        </label>
       </div>
      </div>
      <div class="form-row items-center">
       <label class="form-label !pt-0">
        <span class="required-star">
         *
        </span>
        净入金奖励条件：
       </label>
       <div class="form-content">
        <!-- 统一计算：输入框 -->
        <div class="flex gap-3" id="netRewardInputs">
         <input class="form-input !w-[194px]" oninput="formatDecimal(this)" placeholder="请输入净入金值" type="text"/>
         <input class="form-input !w-[194px]" oninput="formatDecimal(this)" placeholder="请输入净入金奖励比例" type="text"/>
        </div>
        <!-- 规则计算：点击配置按钮 -->
        <div class="hidden w-[400px] border border-primary border-dashed rounded bg-blue-50 items-center justify-center text-sm text-primary cursor-pointer hover:bg-blue-100 h-[38px] transition-colors" id="netRewardBtn">
         <i class="fa-solid fa-plus mr-2">
         </i>
         点击配置规则
        </div>
       </div>
      </div>
      <div class="form-row items-center">
       <label class="form-label !pt-0">
        <span class="required-star">
         *
        </span>
        净入金奖励周期：
       </label>
       <div class="form-content">
        <select class="form-select">
         <option value="">
          请选择
         </option>
         <option value="monthly">
          每月
         </option>
         <option value="quarterly">
          每季度
         </option>
         <option value="yearly">
          每年
         </option>
        </select>
       </div>
      </div>
     </div>
    </div>
   </div>
   <!-- 底部按钮区 -->
   <div class="flex justify-center gap-4 mt-8 pt-6 border-t border-gray-200">
    <button class="px-8 py-2 border border-gray-300 text-gray-700 bg-white rounded hover:bg-gray-50 transition-colors text-sm font-medium" type="button">
     返回
    </button>
    <button class="px-8 py-2 bg-[#1D64D8] text-white rounded hover:bg-blue-700 transition-colors text-sm font-medium" type="button">
     提交
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
