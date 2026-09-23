<template>
  <div class="flex h-full bg-mainBg overflow-hidden w-full">
    <div class="flex-1 flex flex-col min-w-0 bg-gray-50 overflow-hidden p-4 custom-scrollbar overflow-y-auto w-full">
      <main class="flex-1 overflow-y-auto p-4 md:p-6 bg-mainBg">
 <div class="space-y-4">
  <div class="text-sm text-gray-500">
   出入金 <span class="mx-1">›</span> 入金记录
  </div>
  <section class="bg-white rounded-xl border border-gray-200 p-5">
   <div class="text-sm font-semibold text-gray-700 mb-4">
    搜索
   </div>
   <div class="space-y-3">
    <div class="flex flex-wrap items-center gap-x-6 gap-y-3">
     <div class="filter-item w-full sm:w-auto">
      <div class="filter-label">
       用户类型：
      </div>
      <select class="filter-select filter-compact w-full sm:w-[92px]">
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
     <div class="filter-item w-full sm:w-auto">
      <div class="filter-label">
       订单号：
      </div>
      <input class="filter-input filter-compact w-full sm:w-[170px]" placeholder="请输入订单号"/>
     </div>
     <div class="filter-item w-full sm:w-auto">
      <div class="filter-label">
       MT账号：
      </div>
      <input class="filter-input filter-compact w-full sm:w-[170px]" placeholder="请输入入金MT的账户"/>
     </div>
     <div class="filter-item w-full sm:w-auto">
      <div class="filter-label">
       支付方式：
      </div>
      <select class="filter-select filter-compact w-full sm:w-[170px]">
       <option>
        -请选择-
       </option>
       <option>
        passttopay
       </option>
       <option>
        MaxPay(USDT)
       </option>
       <option>
        crm
       </option>
      </select>
     </div>
     <div class="filter-item w-full sm:w-auto">
      <div class="filter-label">
       审核状态：
      </div>
      <select class="filter-select filter-compact w-full sm:w-[140px]">
       <option>
        -请选择-
       </option>
       <option>
        待审核
       </option>
       <option>
        已审核
       </option>
      </select>
     </div>
     <div class="filter-item w-full sm:w-auto">
      <div class="filter-label">
       申请时间：
      </div>
      <select class="filter-select filter-compact w-full sm:w-[120px]">
       <option>
        申请时间
       </option>
       <option>
        操作时间
       </option>
      </select>
     </div>
     <div class="filter-item w-full sm:w-auto">
      <input class="filter-input filter-compact w-full sm:w-[120px]" placeholder="开始日期"/>
      <span class="filter-sep">
       到
      </span>
      <input class="filter-input filter-compact w-full sm:w-[120px]" placeholder="结束日期"/>
     </div>
     <div class="filter-item w-full sm:w-auto">
      <div class="filter-label">
       支付状态：
      </div>
      <select class="filter-select filter-compact w-full sm:w-[140px]">
       <option>
        -请选择-
       </option>
       <option>
        待支付
       </option>
       <option>
        支付成功
       </option>
      </select>
     </div>
    </div>
    <div class="flex flex-wrap items-center gap-x-6 gap-y-3">
     <div class="filter-item w-full sm:w-auto">
      <div class="filter-label">
       MT类型：
      </div>
      <select class="filter-select filter-compact w-full sm:w-[92px]">
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
     <button class="manage-deposit-btn search-btn" type="button">
      搜索
     </button>
    </div>
   </div>
  </section>
  <section class="bg-white rounded-xl border border-gray-200 overflow-hidden">
   <div class="px-5 py-4 border-b border-gray-100">
    <div class="flex flex-col gap-3 min-w-0">
     <div class="flex items-center gap-2">
      <button class="manage-deposit-btn manage-deposit-primary inline-flex items-center px-3 py-1.5 rounded-md font-medium transition-colors self-start" type="button" @click="openManageDepositModal">
       管理员入金
      </button>
      <button type="button" class="h-8 px-3 rounded-md border border-gray-200 bg-white text-gray-700 text-xs font-medium hover:bg-gray-50 transition-colors" @click="openAdminDepositPrd">
       PRD
      </button>
     </div>
     <div class="text-xs text-gray-500 flex flex-wrap items-center gap-x-4 gap-y-1 min-w-0">
      <span>入金汇总：</span>
      <span>实数：1102 笔</span>
      <span>入金总额：$2,880,460.3500 / USC 6,257,068.00</span>
     </div>
    </div>
   </div>
   <div class="list-scroll">
    <div class="px-5 py-3 text-xs text-gray-500 border-b border-gray-100">
     <div class="list-grid font-medium">
      <div>MT账号</div>
      <div>MT类型</div>
      <div>订单号</div>
      <div>上级信息</div>
      <div>联系方式</div>
      <div>金额</div>
      <div>手动入金类型</div>
      <div>支付方式</div>
      <div>审核状态</div>
      <div>支付状态</div>
      <div>时间</div>
      <div class="text-right">操作</div>
     </div>
    </div>
    <div class="divide-y divide-gray-100">
     <div class="px-5 py-4 hover:bg-gray-50/80">
      <div class="list-grid">
       <div class="text-sm text-gray-700">
        <div>MT账号：7100104</div>
        <div class="text-xs text-gray-400 mt-1">MT分组：real/Overseas Markets\Test\Stan-Cent</div>
       </div>
       <div class="text-sm text-gray-500">
        美分账户
       </div>
       <div class="text-sm text-gray-500 break-all">
        IN_928167163091487760
       </div>
       <div class="text-sm text-gray-500">
        test-陶渊份
       </div>
       <div class="text-sm text-gray-500">
        <div>姓名：test-严而</div>
        <div class="mt-1">手机号：150****6464</div>
       </div>
       <div class="text-sm text-gray-700">
        <div>入金金额：USC 205,000.00</div>
        <div class="mt-1 text-gray-400">支付金额：¥16,400.00</div>
       </div>
       <div class="text-sm text-gray-500">
        真实入金补录
       </div>
       <div class="text-sm text-gray-500">
        passttopay
       </div>
       <div class="text-sm text-gray-500">
        <div>已审核</div>
        <div class="mt-1 text-gray-400">审核人：test-F7</div>
       </div>
       <div class="text-sm text-gray-500">
        支付成功
       </div>
       <div class="text-sm text-gray-500">
        <div>申请时间：2026-08-12 14:13:04</div>
        <div class="mt-1 text-gray-400">处理时间：2026-08-12 14:17:57</div>
       </div>
      <div class="op-actions flex items-center justify-end">
        <button class="manage-deposit-btn btn-sm" type="button" @click="goDepositDetail('IN_928167163091487760')">查看</button>
       </div>
      </div>
     </div>
     <div class="px-5 py-4 hover:bg-gray-50/80">
      <div class="list-grid">
       <div class="text-sm text-gray-700">
        <div>MT账号：7100103</div>
        <div class="text-xs text-gray-400 mt-1">MT分组：real/Overseas Markets\Test\Stan-Cent</div>
       </div>
       <div class="text-sm text-gray-500">
        美分账户
       </div>
       <div class="text-sm text-gray-500 break-all">
        IN_92813531767277709
       </div>
       <div class="text-sm text-gray-500">
        test
       </div>
       <div class="text-sm text-gray-500">
        <div>姓名：test-meifen</div>
        <div class="mt-1">手机号：152****0001</div>
       </div>
       <div class="text-sm text-gray-700">
        <div>入金金额：USC 50,000.00</div>
        <div class="mt-1 text-gray-400">支付金额：$500.0000</div>
       </div>
       <div class="text-sm text-gray-500">
        活动奖励
       </div>
       <div class="text-sm text-gray-500">
        MaxPay(USDT)
       </div>
       <div class="text-sm text-gray-500">
        待审核
       </div>
       <div class="text-sm text-gray-500">
        待支付
       </div>
       <div class="text-sm text-gray-500">
        <div>申请时间：2026-08-12 12:06:31</div>
        <div class="mt-1 text-gray-400">处理时间：未处理</div>
       </div>
      <div class="op-actions flex items-center justify-end gap-2">
        <button class="btn-audit btn-sm" type="button" @click="openAudit('7100103')">审核</button>
        <button class="btn-reject btn-sm" type="button">驳回</button>
        <button class="manage-deposit-btn btn-sm" type="button" @click="goDepositDetail('IN_92813531767277709')">查看</button>
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
                <span class="change-highlight">*</span> 入金类型：
              </label>
              <select v-model="modalForm.depositTypeId" class="modal-input">
                <option v-for="t in enabledDepositTypes" :key="t.id" :value="t.id">{{ t.name }}</option>
              </select>
              <div class="deposit-type-hint" :class="depositTypeHintClass">
                是否计入真实入金：{{ depositTypeHintText }}
              </div>
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
            <button type="button" @click="submitManageDeposit" class="manage-deposit-btn px-6 py-2 rounded-lg text-white text-sm font-medium transition-colors">
              确认
            </button>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { openPrd } from '@/store/prd'
import { findTypeConfig, getEnabledTypeConfigs, pushFundOperationSnapshot } from '@/store/fund-type-config'

const router = useRouter()
const openAdminDepositPrd = () => openPrd('prd-admin-deposit.html', '管理员入金 - PRD')

const expandedRows = ref([])
const isModalOpen = ref(false)
const modalForm = ref({
  amount: '',
  depositTypeId: 'dt_demo',
  mtAccount: '',
  confirmAccount: '',
  comment: '',
  remark: ''
})

const enabledDepositTypes = computed(() => getEnabledTypeConfigs('deposit'))

const currentDepositType = computed(() => {
  const v = findTypeConfig('deposit', modalForm.value.depositTypeId)
  if (v && v.status === 'enabled') return v
  return enabledDepositTypes.value[0] || null
})

const depositTypeHintText = computed(() => (currentDepositType.value?.countAsReal ? '计入真实入金' : '不计入真实入金'))

const depositTypeHintClass = computed(() => (currentDepositType.value?.countAsReal ? 'deposit-type-hint--ok' : 'deposit-type-hint--warn'))

const toggleDetail = (id) => {
  if (expandedRows.value.includes(id)) {
    expandedRows.value = expandedRows.value.filter((x) => x !== id)
    return
  }
  expandedRows.value.push(id)
}

const openManageDepositModal = () => {
  const validIds = new Set(enabledDepositTypes.value.map((x) => String(x.id)))
  if (!validIds.has(String(modalForm.value.depositTypeId))) {
    modalForm.value.depositTypeId = enabledDepositTypes.value[0]?.id || ''
  }
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

const goDepositDetail = (id) => {
  router.push({ path: '/fund/deposit-detail', query: { id: String(id || '') } })
}

const closeManageDepositModal = () => {
  isModalOpen.value = false
  modalForm.value = {
    amount: '',
    depositTypeId: 'dt_demo',
    mtAccount: '',
    confirmAccount: '',
    comment: '',
    remark: ''
  }
}

const submitManageDeposit = () => {
  const requiredFields = [
    { key: 'amount', label: '入金金额（美元）' },
    { key: 'depositTypeId', label: '入金类型' },
    { key: 'mtAccount', label: 'MT账号' },
    { key: 'confirmAccount', label: '确认账号' },
    { key: 'comment', label: 'MT Comment' },
    { key: 'remark', label: '备注' }
  ]

  const missing = requiredFields.find((f) => !String(modalForm.value[f.key] || '').trim())
  if (missing) {
    window.alert(`请填写：${missing.label}（演示校验）`)
    return
  }

  const type = currentDepositType.value
  pushFundOperationSnapshot({
    direction: 'deposit',
    typeId: type?.id || String(modalForm.value.depositTypeId || ''),
    typeNameSnapshot: type?.name || '',
    countAsRealSnapshot: !!type?.countAsReal,
    amount: Number(modalForm.value.amount || 0),
    status: 'success',
    settled: true
  })

  closeManageDepositModal()
}
</script>

<style scoped>
.filter-input, .filter-select {
  height: 36px;
  border: 1px solid #E5E7EB;
  border-radius: 6px;
  background: #fff;
  color: #4B5563;
  font-size: 13px;
  padding: 0 12px;
  outline: none;
  width: 100%;
}
.filter-input:focus, .filter-select:focus {
  border-color: #C19B5E;
  box-shadow: 0 0 0 3px rgba(193, 155, 94, 0.12);
}
.filter-item {
  display: flex;
  align-items: center;
  gap: 8px;
}
.filter-label {
  font-size: 12px;
  color: #6B7280;
  white-space: nowrap;
}
.filter-sep {
  font-size: 12px;
  color: #9CA3AF;
  white-space: nowrap;
}
.filter-compact {
  height: 32px;
  font-size: 12px;
  border-radius: 4px;
  padding: 0 10px;
}
.search-btn {
  height: 32px;
  min-width: 48px;
  padding: 0 16px;
  border-radius: 4px;
  font-size: 12px;
  white-space: nowrap;
}
.manage-deposit-primary {
  height: 32px;
  min-width: 86px;
  justify-content: center;
  font-size: 12px;
  white-space: nowrap;
}
.btn-sm {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 24px;
  min-width: 42px;
  padding: 0 10px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 600;
  line-height: 1;
  white-space: nowrap;
}
.op-actions {
  flex-wrap: nowrap;
  gap: 8px;
}
.btn-audit {
  border: 1px solid #86EFAC;
  background: #ECFDF5;
  color: #16A34A;
}
.btn-audit:hover {
  background: #DCFCE7;
}
.btn-reject {
  border: 1px solid #FCA5A5;
  background: #FEF2F2;
  color: #DC2626;
}
.btn-reject:hover {
  background: #FEE2E2;
}
.type-pill {
  display: inline-flex;
  align-items: center;
  padding: 4px 10px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 600;
  line-height: 1;
  white-space: nowrap;
}
.type-pill.standard {
  color: #475569;
  background: #F1F5F9;
  border: 1px solid #CBD5E1;
}
.type-pill.cent {
  color: #047857;
  background: #ECFDF5;
  border: 1px solid #A7F3D0;
}
.list-scroll {
  overflow-x: auto;
  overflow-y: hidden;
}
.list-scroll .text-sm,
.list-scroll .text-xs {
  color: #4b5563 !important;
}
.list-scroll .text-gray-400 {
  color: #6b7280 !important;
}
.list-scroll .text-gray-500 {
  color: #4b5563 !important;
}
.list-scroll::-webkit-scrollbar {
  height: 8px;
}
.list-scroll::-webkit-scrollbar-thumb {
  background: rgba(156, 163, 175, 0.45);
  border-radius: 999px;
}
.list-scroll::-webkit-scrollbar-track {
  background: transparent;
}
.list-grid {
  display: grid;
  grid-template-columns: 280px 80px 170px 100px 160px 210px 140px 120px 140px 90px 200px 180px;
  align-items: start;
  min-width: 1870px;
  column-gap: 16px;
}
.detail-panel {
  width: 430px;
  max-width: 100%;
  padding-top: 12px;
}
.detail-row {
  display: grid;
  grid-template-columns: 84px 1fr;
  gap: 14px;
  padding: 10px 0;
  border-bottom: 1px solid #E5E7EB;
}
.detail-label {
  color: #6B7280;
  font-size: 12px;
  margin: 0;
  font-weight: 600;
}
.detail-value {
  color: #374151;
  font-size: 13px;
  font-weight: 500;
  line-height: 1.6;
}
.change-highlight {
  color: #DC2626 !important;
}
.manage-deposit-btn {
  background: #C19B5E;
  color: #FFFFFF;
  border: 1px solid #C19B5E;
}
.manage-deposit-btn:hover {
  background: #B4894E;
  border-color: #B4894E;
}
.deposit-type-hint {
  margin-top: 8px;
  padding: 6px 10px;
  border-radius: 6px;
  border: 1px solid transparent;
  font-size: 12px;
  line-height: 1.35;
}
.deposit-type-hint--ok {
  background: #ECFDF5;
  border-color: #A7F3D0;
  color: #16A34A;
}
.deposit-type-hint--warn {
  background: #FFF7ED;
  border-color: #FDBA74;
  color: #C2410C;
}
.deposit-type-hint--special {
  background: #FFF7ED;
  border-color: #FDBA74;
  color: #C2410C;
}
.modal-mask {
  position: fixed;
  inset: 0;
  background: rgba(17, 24, 39, 0.42);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  z-index: 60;
}
.modal-input {
  width: 100%;
  height: 36px;
  border: 1px solid #E5E7EB;
  border-radius: 8px;
  padding: 0 12px;
  font-size: 13px;
  color: #374151;
  outline: none;
  background: #fff;
}
.modal-input:focus,
.modal-textarea:focus {
  border-color: #C19B5E;
  box-shadow: 0 0 0 3px rgba(193, 155, 94, 0.12);
}
.modal-textarea {
  width: 100%;
  min-height: 38px;
  border: 1px solid #E5E7EB;
  border-radius: 8px;
  padding: 8px 12px;
  font-size: 13px;
  color: #374151;
  outline: none;
  resize: none;
  background: #fff;
}
</style>
