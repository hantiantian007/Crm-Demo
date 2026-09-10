<template>
  <div class="flex h-full bg-mainBg overflow-hidden">
    <div class="flex-1 flex flex-col min-w-0 bg-gray-50 overflow-hidden p-4 custom-scrollbar overflow-y-auto">
      <main class="flex-1 overflow-y-auto p-4 md:p-6 bg-mainBg">
 <div class="bg-[#F7F7F8] rounded-xl border border-gray-200 p-4 md:p-6 min-h-full">
  <div class="bg-white rounded-xl border border-gray-100 px-6 py-6 md:px-8 md:py-7 w-full">
   <div class="pb-4 border-b border-gray-100">
    <div class="text-lg font-semibold text-gray-800">
     入金
    </div>
   </div>
   <div class="pt-6 max-w-[640px] space-y-5">
    <div>
     <label class="block text-sm text-gray-700 mb-2">
      * 入金账号：
     </label>
     <div class="relative">
      <select class="w-full h-11 rounded-md border border-gray-200 px-4 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary appearance-none bg-white" id="accountSelect">
       <option value="8800123">
        8800123 - 标准账户 / USD
       </option>
       <option selected="" value="9900456">
        9900456 - 美分账户 / USC
       </option>
       <option value="9900668">
        9900668 - 美分账户 / USC
       </option>
      </select>
      <div class="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
       <i class="fas fa-angle-down">
       </i>
      </div>
     </div>
     <div class="mt-2 grid grid-cols-1 md:grid-cols-3 gap-2 text-xs">
      <div class="rounded-md bg-gray-50 border border-gray-200 px-3 py-2">
       <span class="text-gray-500 change-highlight">
        账户类型：
       </span>
       <span class="text-gray-800 font-medium change-highlight" id="summaryType">
        美分账户
       </span>
      </div>
      <div class="rounded-md bg-gray-50 border border-gray-200 px-3 py-2">
       <span class="text-gray-500 change-highlight">
        单位：
       </span>
       <span class="text-gray-800 font-medium change-highlight" id="summaryUnit">
        USC/美分
       </span>
      </div>
     </div>
    </div>
    <div>
     <label class="block text-sm text-gray-700 mb-2 change-highlight">
      * 支付方式：
     </label>
     <div class="grid grid-cols-1 md:grid-cols-2 gap-3" id="paymentMethods">
      <button class="payment-card text-left rounded-lg border-2 border-primary bg-blue-50/40 p-4 transition-colors" data-code="MAXPAY" data-max="1000" data-min="50" data-name="MAXPAY(USDT)" data-pay-currency="USD" data-rate="1">
       <div class="flex items-start justify-between gap-3">
        <div>
         <div class="text-sm font-bold text-gray-900">
          MAXPAY(USDT)
         </div>
         <div class="text-xs text-blue-600 mt-1">
          支付币种：USD
         </div>
         <div class="text-xs text-blue-600 mt-1">
          限额：50.0000 - 1000.0000 USD
         </div>
        </div>
        <i class="fas fa-check text-primary mt-1">
        </i>
       </div>
      </button>
      <button class="payment-card text-left rounded-lg border border-gray-200 bg-white p-4 transition-colors hover:border-primary/50" data-code="UGATE" data-max="400" data-min="50" data-name="UGATE" data-pay-currency="CNY" data-rate="7.18">
       <div class="text-sm font-bold text-gray-900 change-highlight">
        UGATE
       </div>
       <div class="text-xs text-blue-600 mt-1 change-highlight">
        支付币种：CNY
       </div>
       <div class="text-xs text-blue-600 mt-1 change-highlight">
        限额：50.0000 - 400.0000 USD
       </div>
      </button>
      <button class="payment-card text-left rounded-lg border border-gray-200 bg-white p-4 transition-colors hover:border-primary/50" data-code="PASSTOPAY" data-max="10000" data-min="50" data-name="PASSTOPAY" data-pay-currency="USD" data-rate="1">
       <div class="text-sm font-bold text-gray-900">
        PASSTOPAY
       </div>
       <div class="text-xs text-blue-600 mt-1">
        支付币种：USD
       </div>
       <div class="text-xs text-blue-600 mt-1">
        限额：50.0000 - 10000.0000 USD
       </div>
      </button>
      <button class="payment-card text-left rounded-lg border border-gray-200 bg-white p-4 transition-colors hover:border-primary/50" data-code="AIPAY" data-max="500" data-min="50" data-name="AIPAY" data-pay-currency="CNY" data-rate="7.18">
       <div class="text-sm font-bold text-gray-900 change-highlight">
        AIPAY
       </div>
       <div class="text-xs text-blue-600 mt-1 change-highlight">
        支付币种：CNY
       </div>
       <div class="text-xs text-blue-600 mt-1 change-highlight">
        限额：50.0000 - 500.0000 USD
       </div>
      </button>
     </div>
    </div>
    <div>
     <label class="block text-sm text-gray-700 mb-2 change-highlight" id="depositAmountLabel">
      * 入金金额(美分)：
     </label>
     <input class="w-full h-11 rounded-md border border-gray-200 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" id="depositAmount" min="0" placeholder="请输入入金金额" step="1" type="number" value="10000"/>
     <div class="mt-2 text-xs text-red-500 hidden" id="depositMinError">
      当前入金金额低于最低入金金额，请至少输入 50000 USC/美分。
     </div>
    </div>
    <div>
     <label class="block text-sm text-gray-700 mb-2">
      支付汇率：
     </label>
     <input class="w-full h-11 rounded-md border border-gray-200 px-4 text-sm bg-white" id="paymentRateField" readonly="" type="text" value="1.00"/>
    </div>
    <div class="rounded-md bg-[#F4F4F5] px-4 py-4">
     <div class="flex items-center justify-between">
      <div class="text-sm text-gray-500">
       支付金额:
      </div>
      <div class="text-[18px] md:text-[20px] font-bold text-[#1F2937] change-highlight" id="payableSummary">
       100.00
       <span class="text-sm font-medium text-gray-500 change-highlight">
        (USD/美元)
       </span>
      </div>
     </div>
    </div>
    <div class="flex items-center gap-3 pt-1">
     <button class="px-6 h-9 rounded bg-primary hover:bg-primaryHover text-white text-sm font-medium transition-colors shadow-sm" id="saveButton">
      保存
     </button>
     <div class="text-xs text-gray-500 change-highlight" id="topAccountHint">
      当前账号为美分账户，到账单位为 USC
     </div>
    </div>
    <div class="hidden">
     <div id="payMethodText">
     </div>
     <div id="payAmountText">
     </div>
     <div id="creditAccountText">
     </div>
    </div>
   </div>
  </div>
 </div>
</main>

    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
</script>
