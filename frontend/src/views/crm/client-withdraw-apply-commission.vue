<template>
  <div class="flex h-full bg-mainBg overflow-hidden">
    <div class="flex-1 flex flex-col min-w-0 bg-gray-50 overflow-hidden p-4 custom-scrollbar overflow-y-auto">
      <main class="flex-1 overflow-y-auto p-4 md:p-6 bg-mainBg">
 <div class="w-full mx-auto bg-white rounded-xl border border-gray-100 px-5 py-6 md:px-8 md:py-7">
  <h1 class="text-base font-semibold text-gray-800 pb-3 border-b border-gray-100">
   出金
  </h1>
  <div class="mt-5 space-y-4">
   <div>
    <label class="block text-sm text-gray-700 mb-2 change-highlight" id="accountLabel">
     出金账号:
    </label>
    <input class="w-full max-w-[385px] h-11 rounded border border-gray-200 px-4 text-sm text-gray-700 bg-gray-50" id="accountField" readonly="" type="text"/>
   </div>
   <div>
    <div class="text-sm text-gray-700 mb-2 change-highlight" id="balanceLabel">
     余额(美元):
    </div>
    <div class="flex flex-wrap items-center gap-x-3 gap-y-2 text-xs text-gray-500">
     <span class="text-gray-700 change-highlight" id="balanceText">
      10000 USD/美元
     </span>
     <span class="change-highlight">
      可用余额:
      <span class="text-[#22A3FF] change-highlight" id="availableText">
       8767 USD/美元
      </span>
     </span>
     <span class="change-highlight">
      出金中:
      <span class="text-[#C19B5E] change-highlight" id="withdrawingText">
       1233 USD/美元
      </span>
     </span>
     <span class="change-highlight">
      未绑定奖励:
      <span class="text-[#D97706] change-highlight" id="bonusText">
       0 USD/美元
      </span>
     </span>
    </div>
   </div>
   <div>
    <div class="text-sm text-gray-700 mb-2">
     * 支付方式:
    </div>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-3 max-w-[620px]" id="paymentGrid">
     <button class="pay-card selected text-left rounded-md border border-gray-200 px-4 py-3 bg-white" data-id="quickpay-cny" type="button">
      <div class="font-semibold text-[13px] text-gray-800">
       QUICKPAY-CNY (Y)
      </div>
      <div class="text-[11px] text-[#2563EB] mt-1">
       限额：100-100000USD
      </div>
     </button>
     <button class="pay-card text-left rounded-md border border-gray-200 px-4 py-3 bg-white" data-id="maxpay-usdt" type="button">
      <div class="font-semibold text-[13px] text-gray-800">
       MAXPAY-USDT ($)
      </div>
      <div class="text-[11px] text-[#2563EB] mt-1">
       限额：100-100000USD
      </div>
     </button>
     <button class="pay-card text-left rounded-md border border-gray-200 px-4 py-3 bg-white" data-id="assets-hkd" type="button">
      <div class="font-semibold text-[13px] text-gray-800">
       资产折扣 (HK$)
      </div>
      <div class="text-[11px] text-[#2563EB] mt-1">
       限额：1000-100000USD
      </div>
     </button>
     <button class="pay-card text-left rounded-md border border-gray-200 px-4 py-3 bg-white" data-id="ugate" type="button">
      <div class="font-semibold text-[13px] text-gray-800">
       UGATE (Y)
      </div>
      <div class="text-[11px] text-[#2563EB] mt-1">
       限额：100-700USD
      </div>
     </button>
     <button class="pay-card text-left rounded-md border border-gray-200 px-4 py-3 bg-white" data-id="plas-card" type="button">
      <div class="font-semibold text-[13px] text-gray-800">
       PLANE CARD (HK$)
      </div>
      <div class="text-[11px] text-[#2563EB] mt-1">
       限额：1-1000000USD
      </div>
     </button>
     <button class="pay-card text-left rounded-md border border-gray-200 px-4 py-3 bg-white" data-id="aipay" type="button">
      <div class="font-semibold text-[13px] text-gray-800">
       AIPAY (Y)
      </div>
      <div class="text-[11px] text-[#2563EB] mt-1">
       限额：1-1000000USD
      </div>
     </button>
     <button class="pay-card text-left rounded-md border border-gray-200 px-4 py-3 bg-white md:col-span-1" data-id="passtopay" type="button">
      <div class="font-semibold text-[13px] text-gray-800">
       PASSTOPAY (Y)
      </div>
      <div class="text-[11px] text-[#2563EB] mt-1">
       限额：1-10000USD
      </div>
     </button>
    </div>
   </div>
   <div>
    <div class="mb-2 flex flex-wrap items-center justify-between gap-2 max-w-[620px]">
     <label class="block text-sm text-gray-700 change-highlight" id="amountLabel">
      * 出金金额(美元):
     </label>
     <div class="text-xs text-gray-500 change-highlight">
      <span id="availableUsdWrap">
       <span>
        可出金金额：
       </span>
       <span class="text-[#22A3FF] font-medium change-highlight" id="availableUsdHint">
        8,767.00 USD/美元
       </span>
       <span class="mx-1" id="availableHintDivider">
        |
       </span>
      </span>
      <span id="availableOriginalLabel">
       原始金额：
      </span>
      <span class="font-medium change-highlight" id="availableOriginalHint">
       8,767.00 USD/美元
      </span>
     </div>
    </div>
    <input class="w-full max-w-[620px] h-11 rounded border border-gray-200 px-4 text-sm text-gray-700 placeholder:text-gray-400" id="amountInput" min="0.01" placeholder="请输入出金金额（美元）" step="0.01" type="number"/>
    <div class="text-xs text-gray-400 mt-2 change-highlight" id="amountHint">
     所有账户出金金额统一按美元输入，支持输入到小数点后两位。
    </div>
   </div>
   <div>
    <label class="block text-sm text-gray-700 mb-2 change-highlight" id="rateLabel">
     * 当前汇率:
    </label>
    <input class="w-full max-w-[620px] h-11 rounded border border-gray-200 px-4 text-sm text-gray-700 bg-gray-50" id="rateField" readonly="" type="text" value="7.18"/>
   </div>
   <div class="max-w-[620px] rounded-md bg-gray-50 border border-gray-200 px-4 py-3 flex items-center justify-between">
    <div class="text-sm text-gray-500 change-highlight" id="receivedLabel">
     到账金额:
    </div>
    <div class="text-[16px] md:text-[18px] font-bold text-gray-800 change-highlight" id="receivedText">
     0.00
     <span class="text-xs font-medium text-gray-500 change-highlight">
      (CNY/人民币)
     </span>
    </div>
   </div>
   <button class="px-5 h-9 rounded bg-primary hover:bg-primaryHover text-white text-sm font-medium transition-colors">
    保存
   </button>
  </div>
 </div>
</main>

    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
</script>
