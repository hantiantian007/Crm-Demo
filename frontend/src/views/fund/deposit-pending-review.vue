<template>
  <div class="flex h-full bg-mainBg overflow-hidden">
    <div class="flex-1 flex flex-col min-w-0 bg-gray-50 overflow-hidden p-4 custom-scrollbar overflow-y-auto">
      <main class="flex-1 overflow-y-auto p-4 md:p-6 bg-mainBg">
 <div class="space-y-4">
  <section class="bg-white rounded-xl border border-gray-200 p-5">
   <div class="text-sm font-semibold text-gray-700 mb-4">
    搜索
   </div>
   <div class="grid grid-cols-6 gap-4">
    <div>
     <label class="block text-xs text-gray-500 mb-2">
      用户类型
     </label>
     <select class="filter-select">
      <option>
       标准
      </option>
      <option>
       代理
      </option>
      <option>
       普通客户
      </option>
     </select>
    </div>
    <div>
     <label class="block text-xs text-gray-500 mb-2">
      操作人
     </label>
     <input class="filter-input" placeholder="请输入操作人姓名"/>
    </div>
    <div>
     <label class="block text-xs text-gray-500 mb-2">
      订单号
     </label>
     <input class="filter-input" placeholder="请输入订单号"/>
    </div>
    <div>
     <label class="block text-xs text-gray-500 mb-2">
      MT账号
     </label>
     <input class="filter-input" placeholder="请输入入金账户"/>
    </div>
    <div>
     <label class="block text-xs text-gray-500 mb-2 change-highlight">
      MT类型
     </label>
     <select class="filter-select change-highlight">
      <option>
       -请选择-
      </option>
      <option>
       标准账户
      </option>
      <option>
       美分账户
      </option>
     </select>
    </div>
    <div>
     <label class="block text-xs text-gray-500 mb-2">
      入金方式
     </label>
     <select class="filter-select">
      <option>
       -请选择-
      </option>
      <option>
       USDT
      </option>
      <option>
       AIPAY
      </option>
      <option>
       UGATE
      </option>
     </select>
    </div>
    <div>
     <label class="block text-xs text-gray-500 mb-2">
      审核状态
     </label>
     <select class="filter-select">
      <option>
       -请选择-
      </option>
      <option>
       待审核
      </option>
      <option>
       已通过
      </option>
      <option>
       已拒绝
      </option>
     </select>
    </div>
    <div>
     <label class="block text-xs text-gray-500 mb-2">
      申请时间
     </label>
     <select class="filter-select">
      <option>
       申请时间
      </option>
      <option>
       操作时间
      </option>
     </select>
    </div>
    <div>
     <label class="block text-xs text-gray-500 mb-2">
      开始日期
     </label>
     <input class="filter-input" placeholder="开始日期"/>
    </div>
    <div>
     <label class="block text-xs text-gray-500 mb-2">
      结束日期
     </label>
     <input class="filter-input" placeholder="结束日期"/>
    </div>
    <div>
     <label class="block text-xs text-gray-500 mb-2">
      支付状态
     </label>
     <select class="filter-select">
      <option>
       -请选择-
      </option>
      <option>
       待支付
      </option>
      <option>
       支付中
      </option>
      <option>
       支付成功
      </option>
     </select>
    </div>
    <div class="flex items-end">
     <button class="h-9 px-4 rounded-md bg-primary hover:bg-primaryHover text-white text-sm font-medium transition-colors" type="button">
      搜索
     </button>
    </div>
   </div>
  </section>
  <section class="bg-white rounded-xl border border-gray-200 overflow-hidden">
   <div class="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
    <div class="flex items-center gap-3">
     <button class="inline-flex items-center px-3 py-1.5 rounded-md bg-primary text-white text-sm font-medium hover:bg-primaryHover transition-colors" type="button" @click="openManageDepositModal">
      管理入金
     </button>
     <div class="text-xs text-gray-500">
      入金汇总：
      <span class="ml-2 change-highlight">
       统计笔数：399 笔
      </span>
      <span class="ml-2 change-highlight">
       入金金额：合计$：200.00（USD：100.00、USC：10000.00）
      </span>
     </div>
    </div>
    <button class="px-4 py-2 rounded-md bg-primary hover:bg-primaryHover text-white text-xs font-medium transition-colors">
     报表导出
    </button>
   </div>
   <div class="list-scroll border-b border-gray-100">
    <div class="px-5 py-4 text-xs text-gray-500">
     <div class="list-grid font-medium">
      <div>
      </div>
      <div>
       MT账号
      </div>
      <div class="change-highlight">
       MT类型
      </div>
      <div>
       订单号
      </div>
      <div>
       上级信息
      </div>
      <div>
       联系方式
      </div>
      <div class="change-highlight">
       金额
      </div>
      <div class="change-highlight">
       支付方式
      </div>
      <div>
       审核状态
      </div>
      <div>
       操作人
      </div>
      <div>
       操作时间
      </div>
     </div>
    </div>
   </div>
   <div class="divide-y divide-gray-100">
    <div>
     <div class="list-scroll">
      <div class="px-5 py-4 hover:bg-gray-50/80">
       <div class="list-grid">
        <div class="pt-1">
         <button class="text-gray-400 hover:text-primary transition-colors" type="button" @click="toggleDetail('deposit-detail-1')">
          <i class="fa-solid fa-chevron-right text-xs transition-transform" :class="{ 'rotate-90': expandedRows.includes('deposit-detail-1') }">
          </i>
         </button>
        </div>
        <div class="text-sm text-gray-700">
         <div class="font-medium">
          8100453
         </div>
         <div class="text-xs text-gray-400 mt-1">
          MT分组：标准分组XXXXX
         </div>
        </div>
        <div class="text-sm">
         <span class="type-pill standard change-highlight">
          标准账户
         </span>
        </div>
        <div class="text-sm text-gray-500 break-all">
         OUT_923832107870979672
        </div>
        <div class="text-sm text-gray-500">
         test-b4
        </div>
        <div class="text-sm text-gray-500">
         <div>
          姓名：test-b5
         </div>
         <div class="mt-1">
          手机号：13932282801
         </div>
        </div>
        <div class="text-sm text-gray-700">
         <div>
          入金金额：$1,233.00
         </div>
         <div class="mt-1 text-gray-400">
          支付金额：$1,233.00
         </div>
        </div>
        <div class="text-sm text-gray-500">
         maxpay-usdt
        </div>
        <div class="text-sm text-gray-500">
         会签审核
        </div>
        <div class="text-sm text-gray-500">
         -
        </div>
        <div class="text-sm text-gray-500">
         <div>
          2026-07-31 15:07:08
         </div>
         <div class="mt-1 text-gray-400">
          待支付
         </div>
        </div>
       </div>
      </div>
     </div>
     <div class="px-8 pb-5 border-t border-gray-100" v-show="expandedRows.includes('deposit-detail-1')">
      <div class="detail-panel">
       <div class="detail-row">
        <div class="detail-label">
         时间
        </div>
        <div class="detail-value">
         <div>
          申请时间：2026-07-31 15:07:06
         </div>
         <div>
          处理时间：2026-07-31 15:07:08
         </div>
        </div>
       </div>
       <div class="detail-row border-b-0">
        <div class="detail-label">
         操作
        </div>
        <div class="flex items-center gap-2">
         <button class="px-3 py-1.5 rounded border border-blue-300 bg-white text-blue-600 text-xs font-medium hover:bg-blue-50 transition-colors" type="button" @click="openAudit('9900761')">
          审核
         </button>
         <button class="px-3 py-1.5 rounded bg-primary text-white text-xs font-medium hover:bg-primaryHover transition-colors" type="button" @click="goDepositDetail('OUT_923832107870979672')">
          查看
         </button>
        </div>
       </div>
      </div>
     </div>
    </div>
    <div>
     <div class="list-scroll">
      <div class="px-5 py-4 hover:bg-gray-50/80">
       <div class="list-grid">
        <div class="pt-1">
         <button class="text-gray-400 hover:text-primary transition-colors" type="button" @click="toggleDetail('deposit-detail-2')">
          <i class="fa-solid fa-chevron-right text-xs transition-transform" :class="{ 'rotate-90': expandedRows.includes('deposit-detail-2') }">
          </i>
         </button>
        </div>
        <div class="text-sm text-gray-700">
         <div class="font-medium">
          8300105
         </div>
         <div class="text-xs text-gray-400 mt-1">
          MT分组：美分分组XXXX
         </div>
        </div>
        <div class="text-sm">
         <span class="type-pill cent change-highlight">
          美分账户
         </span>
        </div>
        <div class="text-sm text-gray-500 break-all">
         OUT_919847271934199098
        </div>
        <div class="text-sm text-gray-500">
         test-测试小组
        </div>
        <div class="text-sm text-gray-500">
         <div>
          姓名：test-小测试
         </div>
         <div class="mt-1">
          手机号：14578541002
         </div>
        </div>
        <div class="text-sm text-gray-700">
         <div class="change-highlight">
          入金金额：100,000.00 USC
         </div>
         <div class="mt-1 text-gray-400">
          支付金额：￥7,180.00
         </div>
        </div>
        <div class="text-sm text-gray-500">
         AIPAY
        </div>
        <div class="text-sm text-amber-600">
         已下发
        </div>
        <div class="text-sm text-gray-500">
         财务-A
        </div>
        <div class="text-sm text-gray-500">
         <div>
          客服审核时间：2026-07-20 15:13:23
         </div>
         <div class="mt-1">
          风险审核时间：2026-07-20 15:15:15
         </div>
         <div class="mt-1">
          财务审核时间：2026-07-20 15:16:56
         </div>
        </div>
       </div>
      </div>
     </div>
     <div class="px-8 pb-5 border-t border-gray-100" v-show="expandedRows.includes('deposit-detail-2')">
      <div class="detail-panel">
       <div class="detail-row">
        <div class="detail-label">
         时间
        </div>
        <div class="detail-value">
         <div>
          申请时间：2026-07-20 15:09:10
         </div>
         <div>
          处理时间：2026-07-20 15:16:56
         </div>
        </div>
       </div>
       <div class="detail-row border-b-0">
        <div class="detail-label">
         操作
        </div>
        <div class="flex items-center gap-2">
         <button class="px-3 py-1.5 rounded border border-blue-300 bg-white text-blue-600 text-xs font-medium hover:bg-blue-50 transition-colors" type="button" @click="openAudit('8300105')">
          审核
         </button>
         <button class="px-3 py-1.5 rounded bg-primary text-white text-xs font-medium hover:bg-primaryHover transition-colors" type="button" @click="goDepositDetail('OUT_919847271934199098')">
          查看
         </button>
        </div>
       </div>
      </div>
     </div>
    </div>
   </div>
  </section>
 </div>
</main>

      <div class="modal-mask" v-show="isModalOpen">
        <div class="w-full max-w-[620px] bg-white rounded-xl shadow-2xl overflow-hidden border border-gray-200">
          <div class="h-14 px-6 border-b border-gray-200 flex items-center justify-between">
            <div class="text-lg font-semibold text-gray-700">管理入金</div>
            <button type="button" @click="closeManageDepositModal" class="text-gray-400 hover:text-gray-600 transition-colors">
              <i class="fa-solid fa-xmark text-xl"></i>
            </button>
          </div>
          <div class="px-6 py-5 space-y-5">
            <div>
              <label class="block text-[15px] font-medium text-gray-600 mb-3">
                <span class="change-highlight">*</span> 入金金额（美元）：
              </label>
              <input v-model="modalForm.amount" class="modal-input" placeholder="请输入美元金额" />
            </div>
            <div>
              <label class="block text-[15px] font-medium text-gray-600 mb-3">
                <span class="change-highlight">*</span> MT账号：
              </label>
              <input v-model="modalForm.mtAccount" class="modal-input" placeholder="请输入MT账号" />
              <div class="mt-2 text-xs text-gray-400">请输入 MT账号 后自动识别入金单位（演示）。</div>
            </div>
            <div>
              <label class="block text-[15px] font-medium text-gray-600 mb-3">
                <span class="change-highlight">*</span> 确认账号：
              </label>
              <input v-model="modalForm.confirmAccount" class="modal-input" placeholder="确认账号" />
            </div>
            <div>
              <label class="block text-[15px] font-medium text-gray-600 mb-3">
                <span class="change-highlight">*</span> MT Comment：
              </label>
              <input v-model="modalForm.comment" maxlength="32" class="modal-input" placeholder="请输入（最多32字符）" />
            </div>
            <div>
              <label class="block text-[15px] font-medium text-gray-600 mb-3">
                <span class="change-highlight">*</span> 备注：
              </label>
              <textarea v-model="modalForm.remark" class="modal-textarea" placeholder="请输入备注"></textarea>
            </div>
          </div>
          <div class="px-6 py-4 border-t border-gray-200 flex items-center justify-end gap-3 bg-gray-50">
            <button type="button" @click="closeManageDepositModal" class="px-6 py-2 rounded-lg bg-red-500 text-white text-sm font-medium hover:bg-red-600 transition-colors">
              取消
            </button>
            <button type="button" @click="closeManageDepositModal" class="px-6 py-2 rounded-lg bg-primary text-white text-sm font-medium hover:bg-primaryHover transition-colors">
              确认
            </button>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const expandedRows = ref([])
const isModalOpen = ref(false)
const modalForm = ref({
  amount: '',
  mtAccount: '',
  confirmAccount: '',
  comment: '',
  remark: ''
})

const toggleDetail = (id) => {
  if (expandedRows.value.includes(id)) {
    expandedRows.value = expandedRows.value.filter((x) => x !== id)
    return
  }
  expandedRows.value.push(id)
}

const openManageDepositModal = () => {
  isModalOpen.value = true
}

const openAudit = (mtAccount) => {
  modalForm.value = {
    ...modalForm.value,
    mtAccount: String(mtAccount || ''),
    confirmAccount: String(mtAccount || '')
  }
  openManageDepositModal()
}

const goDepositDetail = (orderId) => {
  router.push({ path: '/fund/deposit-detail', query: { orderId: String(orderId || '') } })
}

const closeManageDepositModal = () => {
  isModalOpen.value = false
  modalForm.value = {
    amount: '',
    mtAccount: '',
    confirmAccount: '',
    comment: '',
    remark: ''
  }
}
</script>
