<template>
  <div class="flex h-full bg-mainBg overflow-hidden">
    <div class="flex-1 flex flex-col min-w-0 bg-gray-50 overflow-hidden p-4 custom-scrollbar overflow-y-auto">
      <div class="flex-1 p-6 overflow-y-auto">
 <div class="w-full">
  <div class="flex items-center gap-2 mb-6">
   <i class="fas fa-key text-[#d1a84f] text-xl">
   </i>
   <h2 class="text-xl font-bold text-gray-800">
    批量修改 MT 密码
   </h2>
   <span class="text-xs text-gray-400 ml-2">
    按分组批量重置交易密码 / 只读（投资人）密码
   </span>
  </div>
  <div class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
   <div class="p-6 border-b border-gray-100">
    <div class="grid grid-cols-2 gap-6">
     <div>
      <label class="block text-sm font-medium text-gray-700 mb-2">
       <span class="text-red-500 mr-1">
        *
       </span>
       选择分组
      </label>
      <select class="w-full border border-gray-300 rounded-md px-3 py-2.5 text-sm outline-none focus:border-primaryBtn focus:ring-1 focus:ring-primaryBtn text-gray-600 bg-white" id="groupSelect" onchange="previewAccounts()">
       <option value="">
        -- 请选择 MT 服务器分组 --
       </option>
       <option selected="" value="group1">
        MT5-Live-01（真实盘 #1）
       </option>
       <option value="group2">
        MT5-Live-02（真实盘 #2）
       </option>
       <option value="group3">
        MT5-Demo（模拟盘）
       </option>
       <option value="group4">
        MT4-Live（旧版真实盘）
       </option>
      </select>
     </div>
     <div>
      <label class="block text-sm font-medium text-gray-700 mb-2">
       <span class="text-red-500 mr-1">
        *
       </span>
       密码类型
      </label>
      <div class="grid grid-cols-2 gap-3 h-[42px] items-center">
       <label class="flex items-center gap-2 cursor-pointer p-2.5 rounded-md border border-gray-200 hover:border-primaryBtn hover:bg-teal-50 transition-colors has-[:checked]:border-primaryBtn has-[:checked]:bg-teal-50">
        <input checked="" class="w-4 h-4 text-teal-600 focus:ring-teal-500" name="pwdType" type="radio" value="trade"/>
        <div>
         <span class="text-sm font-medium text-gray-800">
          交易密码
         </span>
         <p class="text-[11px] text-gray-400">
          主密码，可登录交易
         </p>
        </div>
       </label>
       <label class="flex items-center gap-2 cursor-pointer p-2.5 rounded-md border border-gray-200 hover:border-primaryBtn hover:bg-teal-50 transition-colors has-[:checked]:border-primaryBtn has-[:checked]:bg-teal-50">
        <input class="w-4 h-4 text-teal-600 focus:ring-teal-500" name="pwdType" type="radio" value="investor"/>
        <div>
         <span class="text-sm font-medium text-gray-800">
          只读密码
         </span>
         <p class="text-[11px] text-gray-400">
          投资人密码，仅查看
         </p>
        </div>
       </label>
      </div>
     </div>
    </div>
   </div>
   <div class="p-6 border-b border-gray-100 bg-gray-50/50">
    <div>
     <label class="block text-sm font-medium text-gray-700 mb-2">
      <span class="text-red-500 mr-1">
       *
      </span>
      统一密码（所有账号共用一个）
     </label>
     <div class="flex gap-2">
      <input class="flex-1 border border-gray-300 rounded-md px-3 py-2.5 text-sm outline-none focus:border-primaryBtn focus:ring-1 focus:ring-primaryBtn font-mono tracking-wider" id="unifiedPwd" placeholder="点击右侧按钮自动生成，或手动输入" type="text"/>
      <button class="px-4 py-2.5 border border-gray-300 bg-white text-gray-600 hover:bg-gray-50 rounded-md text-sm transition-colors flex items-center gap-1.5" type="button">
       <i class="fas fa-magic text-xs">
       </i>
       自动生成
      </button>
      <button class="px-4 py-2.5 border border-gray-300 bg-white text-gray-600 hover:bg-gray-50 rounded-md text-sm transition-colors flex items-center gap-1.5" type="button">
       <i class="far fa-copy text-xs">
       </i>
       复制
      </button>
      <button class="px-4 py-2.5 border border-gray-300 bg-white text-gray-600 hover:bg-gray-50 rounded-md text-sm transition-colors flex items-center gap-1.5" type="button">
       <i class="fas fa-eye text-xs" id="pwdEye">
       </i>
       <span id="pwdEyeLabel">
        隐藏
       </span>
      </button>
     </div>
     <p class="mt-2 text-xs text-gray-400">
      密码规则：8-16 位，必须包含大写字母、小写字母、数字
     </p>
    </div>
   </div>
   <div class="p-6">
    <div class="flex items-center justify-between mb-3">
     <div class="text-sm font-medium text-gray-700">
      待处理账号预览
      <span class="ml-2 text-xs text-gray-400 font-normal" id="accountCount">
       共 0 个账号
      </span>
     </div>
     <span class="text-xs text-gray-400">
      按「选择分组」联动加载
     </span>
    </div>
    <div class="border border-gray-200 rounded-md overflow-hidden">
     <table class="w-full text-sm">
      <thead class="bg-tableHeader text-white">
       <tr>
        <th class="w-10 py-2.5 text-center">
         <input checked="" class="w-4 h-4" type="checkbox"/>
        </th>
        <th class="py-2.5 px-3 text-left w-32">
         MT 账号
        </th>
        <th class="py-2.5 px-3 text-left">
         客户姓名
        </th>
        <th class="py-2.5 px-3 text-left w-32">
         账户类型
        </th>
        <th class="py-2.5 px-3 text-left w-40">
         归属销售
        </th>
        <th class="py-2.5 px-3 text-left w-28">
         净值（USD）
        </th>
       </tr>
      </thead>
      <tbody class="divide-y divide-gray-100 text-gray-700" id="accountTbody">
       <tr>
        <td class="py-10 text-center text-gray-400 text-sm" colspan="6">
         请先在上方选择分组
        </td>
       </tr>
      </tbody>
     </table>
    </div>
   </div>
   <div class="p-5 border-t border-gray-100 bg-gray-50 rounded-b-xl flex justify-center gap-4">
    <button class="px-8 py-2 border border-gray-300 rounded-md hover:bg-white transition-colors text-sm bg-gray-50 text-red-500 hover:text-red-700">
     取消
    </button>
    <button class="px-8 py-2 bg-primaryBtn text-white rounded-md hover:bg-primaryBtnHover transition-colors text-sm shadow-sm">
     <i class="fas fa-check mr-1.5">
     </i>
     确认批量修改
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
