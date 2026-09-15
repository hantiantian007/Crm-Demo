<template>
  <div class="flex h-full bg-mainBg overflow-hidden">
    <div class="flex-1 flex flex-col min-w-0 bg-gray-50 overflow-hidden p-4 custom-scrollbar overflow-y-auto">
      <div class="flex-1 overflow-y-auto p-6 flex flex-col gap-6">
 <section class="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
  <div class="flex items-center justify-between mb-5">
   <h3 class="font-bold text-gray-800 text-[15px]">
    搜索
   </h3>
  </div>
  <div class="grid grid-cols-5 gap-4">
   <div class="flex items-center gap-3 col-span-1">
    <label class="text-[13px] text-gray-600 shrink-0">
     转入/转出账户:
    </label>
    <input v-model="filters.account" class="filter-input" placeholder="请输入MT账户" type="text"/>
   </div>
   <div class="flex items-center gap-3 col-span-1">
    <label class="text-[13px] text-gray-600 shrink-0">
     转入/转出单号:
    </label>
    <input class="filter-input" placeholder="请输入流水单号" type="text"/>
   </div>
   <div class="flex items-center gap-3 col-span-1">
    <label class="text-[13px] text-gray-600 shrink-0">
     转入/转出用户:
    </label>
    <input class="filter-input" placeholder="请输入用户姓名" type="text"/>
   </div>
   <div class="flex items-center gap-3 col-span-2">
    <label class="text-[13px] text-gray-600 shrink-0">
     转账金额:
    </label>
    <div class="flex items-center w-full gap-2">
     <input class="filter-input" placeholder="最低金额" type="text"/>
     <span class="text-gray-400 text-xs">
      至
     </span>
     <input class="filter-input" placeholder="最高金额" type="text"/>
    </div>
   </div>
   <div class="flex items-center gap-3 col-span-1">
    <label class="text-[13px] text-gray-600 shrink-0">
     转账状态:
    </label>
    <select class="filter-select">
     <option>
      全部
     </option>
     <option>
      转账成功
     </option>
     <option>
      转账失败
     </option>
     <option>
      处理中
     </option>
    </select>
   </div>
   <div class="flex items-center gap-3 col-span-2">
    <label class="text-[13px] text-gray-600 shrink-0">
     申请日期:
    </label>
    <div class="flex items-center w-full gap-2">
     <input class="filter-input" placeholder="开始日期" type="text"/>
     <span class="text-gray-400 text-xs">
      到
     </span>
     <input class="filter-input" placeholder="结束日期" type="text"/>
    </div>
   </div>
   <div class="col-span-2 flex items-center justify-start gap-3">
    <button class="bg-primaryBtn hover:bg-primaryBtnHover text-white px-6 py-2 rounded text-[13px] transition-colors shadow-sm">
     搜索
    </button>
    <button class="bg-white hover:bg-gray-50 text-gray-600 border border-gray-200 px-6 py-2 rounded text-[13px] transition-colors shadow-sm">
     重置
    </button>
   </div>
  </div>
 </section>
 <section class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
  <div class="px-6 pt-5 pb-4 border-b border-gray-100">
   <div class="flex items-center justify-between gap-4 flex-wrap">
    <div class="flex items-center gap-4 flex-wrap">
     <button class="inline-flex items-center px-3 py-1 rounded-md bg-[#d1a84f] text-white text-xs font-semibold change-highlight hover:bg-primaryBtnHover transition-colors">
      内转转账
     </button>
    </div>
    <div class="flex items-center gap-3">
     <button class="bg-primaryBtn hover:bg-primaryBtnHover text-white px-5 py-2 rounded text-[13px] transition-colors shadow-sm">
      报表导出
     </button>
    </div>
   </div>
  </div>
  <div class="table-wrap overflow-x-auto">
   <table class="w-full record-table min-w-[1400px]">
    <thead>
     <tr>
      <th>
       转出账户
      </th>
      <th>
       转出用户
      </th>
      <th>
       转入账户
      </th>
      <th>
       转入用户
      </th>
      <th class="change-highlight">
       转账金额
      </th>
      <th>
       转出单号
      </th>
      <th>
       转入单号
      </th>
      <th>
       转账状态
      </th>
      <th>
       申请时间(S)
      </th>
      <th>
       操作
      </th>
     </tr>
    </thead>
    <tbody>
     <tr v-show="matchRow(['8300184', '8100324'])">
      <td>
       <span class="account-chip chip-live">
        美分
       </span>
       <span class="account-chip chip-commission">
        佣金
       </span>
       8300184
      </td>
      <td>
       景志敏
      </td>
      <td>
       <span class="account-chip chip-live">
        美分
       </span>
       <span class="account-chip chip-trade">
        交易
       </span>
       8100324
      </td>
      <td>
       景志敏
      </td>
      <td class="change-highlight">
       1,125.00USD
      </td>
      <td>
       OUT_925279955741314450
      </td>
      <td>
       IN_925279955720342550
      </td>
      <td class="status-success">
       转账成功
      </td>
      <td>
       2026-08-04 15:00:20
      </td>
      <td>
       <button class="px-3 py-1 rounded text-white hover:bg-primaryBtnHover transition-colors border bg-blue-500 hover:bg-blue-600 border-blue-500" type="button" @click="openDetail('detail_1')">
        查看详情
       </button>
      </td>
     </tr>
     <tr v-show="matchRow(['8350104', '8150105'])">
      <td>
       <span class="account-chip chip-demo">
        标准
       </span>
       <span class="account-chip chip-commission">
        佣金
       </span>
       8350104
      </td>
      <td>
       test-测试小何
      </td>
      <td>
       <span class="account-chip chip-demo">
        标准
       </span>
       <span class="account-chip chip-trade">
        交易
       </span>
       8150105
      </td>
      <td>
       test-测试小何
      </td>
      <td class="change-highlight">
       10.00USD
      </td>
      <td>
       OUT_893436878825113770
      </td>
      <td>
       IN_893436878276726268
      </td>
      <td class="status-success">
       转账成功
      </td>
      <td>
       2026-05-08 18:06:57
      </td>
      <td>
       <button class="px-3 py-1 rounded text-white hover:bg-primaryBtnHover transition-colors border bg-blue-500 hover:bg-blue-600 border-blue-500" type="button" @click="openDetail('detail_2')">
        查看详情
       </button>
      </td>
     </tr>
     <tr v-show="matchRow(['8150114', '8150111'])">
      <td>
       <span class="account-chip chip-demo">
        标准
       </span>
       <span class="account-chip chip-trade">
        交易
       </span>
       8150114
      </td>
      <td>
       测试小何
      </td>
      <td>
       <span class="account-chip chip-demo">
        标准
       </span>
       <span class="account-chip chip-trade">
        交易
       </span>
       8150111
      </td>
      <td>
       测试小何
      </td>
      <td class="change-highlight">
       400.00USD
      </td>
      <td>
       OUT_875273148629519344
      </td>
      <td>
       IN_875273148600156214
      </td>
      <td class="status-success">
       转账成功
      </td>
      <td>
       2026-03-19 15:11:08
      </td>
      <td>
       <button class="px-3 py-1 rounded text-white hover:bg-primaryBtnHover transition-colors border bg-blue-500 hover:bg-blue-600 border-blue-500" type="button" @click="openDetail('detail_3')">
        查看详情
       </button>
      </td>
     </tr>
     <tr v-show="matchRow(['1810105', '1810103'])">
      <td>
       <span class="account-chip chip-live">
        美分
       </span>
       <span class="account-chip chip-trade">
        交易
       </span>
       1810105
      </td>
      <td>
       Test Amy
      </td>
      <td>
       <span class="account-chip chip-live">
        美分
       </span>
       <span class="account-chip chip-trade">
        交易
       </span>
       1810103
      </td>
      <td>
       Test Amy
      </td>
      <td class="change-highlight">
       6.00USD
      </td>
      <td>
       OUT_837250233216796339
      </td>
      <td>
       IN_837250233216794800
      </td>
      <td class="status-success">
       转账成功
      </td>
      <td>
       2025-12-04 17:01:38
      </td>
      <td>
       <button class="px-3 py-1 rounded text-white hover:bg-primaryBtnHover transition-colors border bg-blue-500 hover:bg-blue-600 border-blue-500" type="button" @click="openDetail('detail_4')">
        查看详情
       </button>
      </td>
     </tr>
     <tr v-show="matchRow(['8310102', '1810103'])">
      <td>
       <span class="account-chip chip-live">
        美分
       </span>
       <span class="account-chip chip-commission">
        佣金
       </span>
       8310102
      </td>
      <td>
       Test Amy
      </td>
      <td>
       <span class="account-chip chip-live">
        美分
       </span>
       <span class="account-chip chip-trade">
        交易
       </span>
       1810103
      </td>
      <td>
       Test Amy
      </td>
      <td class="change-highlight">
       7.00USD
      </td>
      <td>
       OUT_837248714950052973
      </td>
      <td>
       IN_837248714950050224
      </td>
      <td class="status-failed">
       转账失败
      </td>
      <td>
       2025-12-04 16:55:36
      </td>
      <td>
       <button class="px-3 py-1 rounded text-white hover:bg-primaryBtnHover transition-colors border bg-blue-500 hover:bg-blue-600 border-blue-500" type="button" @click="openDetail('detail_5')">
        查看详情
       </button>
      </td>
     </tr>
    </tbody>
   </table>
  </div>
 </section>
</div>

      <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40" v-show="detailModal.visible">
        <div class="w-full max-w-[520px] bg-white rounded-xl shadow-2xl overflow-hidden border border-gray-200">
          <div class="h-14 px-6 border-b border-gray-200 flex items-center justify-between">
            <div class="text-lg font-semibold text-gray-700">内部转账详情</div>
            <button type="button" class="text-gray-400 hover:text-gray-600 transition-colors" @click="closeDetail">
              <i class="fa-solid fa-xmark text-xl"></i>
            </button>
          </div>
          <div class="px-6 py-5 space-y-3 text-sm">
            <div class="flex items-center justify-between">
              <div class="text-gray-500">状态</div>
              <div class="font-semibold text-gray-800">{{ detailModal.data.statusText }}</div>
            </div>
            <div class="flex items-center justify-between">
              <div class="text-gray-500">转出单号</div>
              <div class="font-medium text-gray-800">{{ detailModal.data.outOrderNo }}</div>
            </div>
            <div class="flex items-center justify-between">
              <div class="text-gray-500">转入单号</div>
              <div class="font-medium text-gray-800">{{ detailModal.data.inOrderNo }}</div>
            </div>
            <div class="flex items-center justify-between">
              <div class="text-gray-500">转账金额</div>
              <div class="font-semibold text-gray-900 change-highlight">{{ detailModal.data.amount }}</div>
            </div>
            <div class="flex items-center justify-between">
              <div class="text-gray-500">申请时间</div>
              <div class="font-medium text-gray-800">{{ detailModal.data.applyTime }}</div>
            </div>
            <div class="flex items-center justify-between">
              <div class="text-gray-500">失败原因</div>
              <div class="font-medium text-gray-800">{{ detailModal.data.reason }}</div>
            </div>
          </div>
          <div class="px-6 py-4 border-t border-gray-200 flex items-center justify-end gap-3 bg-gray-50">
            <button type="button" class="px-6 py-2 rounded-lg bg-gray-100 text-gray-700 text-sm font-medium hover:bg-gray-200 transition-colors" @click="closeDetail">
              关闭
            </button>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { computed, reactive, ref, watch } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const filters = reactive({
  account: ''
})

watch(
  () => route.query.account,
  (value) => {
    if (typeof value === 'string' && value.trim()) {
      filters.account = value.trim()
      return
    }
    if (Array.isArray(value) && value[0]) {
      filters.account = String(value[0]).trim()
      return
    }
    filters.account = ''
  },
  { immediate: true }
)

const normalizedAccount = computed(() => String(filters.account || '').trim())

const matchRow = (accounts) => {
  if (!normalizedAccount.value) return true
  return (accounts || []).some((a) => String(a || '').includes(normalizedAccount.value))
}

const detailMap = {
  detail_1: { statusText: '转账成功', outOrderNo: 'OUT_925279955741314450', inOrderNo: 'IN_925279955720342550', amount: '1,125.00USD', applyTime: '2026-08-04 15:00:20', reason: '-' },
  detail_2: { statusText: '转账成功', outOrderNo: 'OUT_893436878825113770', inOrderNo: 'IN_893436878276726268', amount: '10.00USD', applyTime: '2026-05-08 18:06:57', reason: '-' },
  detail_3: { statusText: '转账成功', outOrderNo: 'OUT_875273148629519344', inOrderNo: 'IN_875273148600156214', amount: '400.00USD', applyTime: '2026-03-19 15:11:08', reason: '-' },
  detail_4: { statusText: '转账成功', outOrderNo: 'OUT_837250233216796339', inOrderNo: 'IN_837250233216794800', amount: '6.00USD', applyTime: '2025-12-04 17:01:38', reason: '-' },
  detail_5: { statusText: '转账失败', outOrderNo: 'OUT_837248714950052973', inOrderNo: 'IN_837248714950050224', amount: '7.00USD', applyTime: '2025-12-04 16:55:36', reason: '目标账户异常，转账失败' }
}

const detailModal = ref({
  visible: false,
  data: detailMap.detail_1
})

const openDetail = (key) => {
  detailModal.value = { visible: true, data: detailMap[key] || detailMap.detail_1 }
}

const closeDetail = () => {
  detailModal.value = { visible: false, data: detailModal.value.data }
}
</script>
