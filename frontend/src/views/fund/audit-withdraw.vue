<template>
  <div class="flex h-full bg-mainBg overflow-hidden w-full">
    <div class="flex-1 flex flex-col min-w-0 bg-gray-50 overflow-hidden p-4 custom-scrollbar overflow-y-auto w-full">
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
                  <option>标准</option>
                  <option>代理</option>
                  <option>普通客户</option>
                </select>
              </div>
              <div>
                <label class="block text-xs text-gray-500 mb-2">
                  操作人
                </label>
                <input class="filter-input" placeholder="请输入操作人姓名" />
              </div>
              <div>
                <label class="block text-xs text-gray-500 mb-2">
                  订单号
                </label>
                <input class="filter-input" placeholder="请输入订单号" />
              </div>
              <div>
                <label class="block text-xs text-gray-500 mb-2">
                  MT账号
                </label>
                <input class="filter-input" placeholder="请输入出金账户" />
              </div>
              <div>
                <label class="block text-xs text-gray-500 mb-2 change-highlight">
                  MT类型
                </label>
                <select class="filter-select change-highlight">
                  <option>-请选择-</option>
                  <option>标准账户</option>
                  <option>美分账户</option>
                </select>
              </div>
              <div>
                <label class="block text-xs text-gray-500 mb-2">
                  出金方式
                </label>
                <select class="filter-select">
                  <option>-请选择-</option>
                  <option>USDT</option>
                  <option>AIPAY</option>
                  <option>UGATE</option>
                </select>
              </div>
              <div>
                <label class="block text-xs text-gray-500 mb-2">
                  审核状态
                </label>
                <select class="filter-select">
                  <option>-请选择-</option>
                  <option>会签审核</option>
                  <option>已下发</option>
                  <option>已拒绝</option>
                </select>
              </div>
              <div>
                <label class="block text-xs text-gray-500 mb-2">
                  申请时间
                </label>
                <select class="filter-select">
                  <option>申请时间</option>
                  <option>操作时间</option>
                </select>
              </div>
              <div>
                <label class="block text-xs text-gray-500 mb-2">
                  开始日期
                </label>
                <input class="filter-input" placeholder="开始日期" />
              </div>
              <div>
                <label class="block text-xs text-gray-500 mb-2">
                  结束日期
                </label>
                <input class="filter-input" placeholder="结束日期" />
              </div>
              <div>
                <label class="block text-xs text-gray-500 mb-2">
                  支付状态
                </label>
                <select class="filter-select">
                  <option>-请选择-</option>
                  <option>待支付</option>
                  <option>支付中</option>
                  <option>支付成功</option>
                </select>
              </div>
              <div class="flex items-end">
                <button class="h-9 px-4 rounded-md bg-primary hover:bg-primaryHover text-white text-sm font-medium transition-colors">
                  搜索
                </button>
              </div>
            </div>
          </section>

          <section class="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div class="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
              <div class="flex items-center gap-3">
                <button class="inline-flex items-center px-3 py-1.5 rounded-md bg-primary text-white text-sm font-medium hover:bg-primaryHover transition-colors" @click="openManageWithdrawModal" type="button">
                  管理出金
                </button>
                <div class="text-xs text-gray-500">
                  出金汇总：
                  <span class="ml-2">笔数：399 笔</span>
                  <span class="ml-2 text-red-500">出金金额：合计$：200.00（USD：100.00、USC：10000.00）</span>
                </div>
              </div>
              <button class="px-4 py-2 rounded-md bg-primary hover:bg-primaryHover text-white text-xs font-medium transition-colors">
                报表导出
              </button>
            </div>

            <div class="list-scroll border-b border-gray-100">
              <div class="px-5 py-4 text-xs text-gray-500">
                <div class="list-grid font-medium">
                  <div></div>
                  <div>MT账号</div>
                  <div class="change-highlight">MT类型</div>
                  <div>订单号</div>
                  <div>上级信息</div>
                  <div>联系方式</div>
                  <div class="change-highlight">出金金额 / 到账金额</div>
                  <div>审核状态</div>
                  <div>操作人</div>
                  <div>操作时间</div>
                  <div>支付状态</div>
                </div>
              </div>
            </div>

            <div class="divide-y divide-gray-100">
              <!-- Item 1 -->
              <div>
                <div class="list-scroll">
                  <div class="px-5 py-4 hover:bg-gray-50/80">
                    <div class="list-grid">
                      <div class="pt-1">
                        <button class="transition-colors" :class="expandedRows.includes('withdraw-detail-1') ? 'text-red-500' : 'text-gray-400 hover:text-primary'" @click="toggleDetail('withdraw-detail-1')">
                          <i class="fa-solid fa-chevron-right text-xs transition-transform" :class="{ 'rotate-90': expandedRows.includes('withdraw-detail-1') }"></i>
                        </button>
                      </div>
                      <div class="text-sm text-gray-700">
                        <div class="font-medium">8100453</div>
                        <div class="text-xs text-gray-400 mt-1">MT分组：标准分组XXXXX</div>
                      </div>
                      <div class="text-sm">
                        <span class="type-pill standard change-highlight">标准账户</span>
                      </div>
                      <div class="text-sm text-gray-500 break-all">OUT_923832107870979672</div>
                      <div class="text-sm text-gray-500">test-b4</div>
                      <div class="text-sm text-gray-500">
                        <div>姓名：test-b5</div>
                        <div class="mt-1">手机号：13932282801</div>
                      </div>
                      <div class="text-sm text-gray-700">
                        <div>出金金额：$1,233.00</div>
                        <div class="mt-1 text-gray-400">到账金额：$1,233.00</div>
                      </div>
                      <div class="text-sm text-gray-500">会签审核</div>
                      <div class="text-sm text-gray-500">财务-A</div>
                      <div class="text-sm text-gray-500">
                        <div>申请时间：2026-07-31 15:07:06</div>
                        <div class="mt-1">审核时间：2026-07-31 15:07:08</div>
                      </div>
                      <div class="text-sm text-gray-500">待支付</div>
                    </div>
                  </div>
                </div>
                <div class="px-8 pb-5 border-t border-gray-100" v-show="expandedRows.includes('withdraw-detail-1')">
                  <div class="detail-panel">
                    <div class="detail-row">
                      <div class="detail-label">支付方式</div>
                      <div class="detail-value">MAXPAY-USDT</div>
                    </div>
                    <div class="detail-row">
                      <div class="detail-label">时间</div>
                      <div class="detail-value">
                        <div>申请时间：2026-07-31 15:07:06</div>
                        <div>客服审核：2026-07-31 15:07:08</div>
                      </div>
                    </div>
                    <div class="detail-row">
                      <div class="detail-label">账户余额</div>
                      <div class="detail-value">10,000.00 USD</div>
                    </div>
                    <div class="detail-row">
                      <div class="detail-label">账户净值</div>
                      <div class="detail-value">10,000.00 USD</div>
                    </div>
                    <div class="detail-row border-b-0">
                      <div class="detail-label">操作</div>
                      <div class="flex items-center gap-2">
                        <a class="px-3 py-1.5 rounded border border-blue-500 bg-white text-blue-500 text-xs font-medium hover:bg-blue-50 transition-colors" href="#/fund/withdraw-audit-detail?account=8100453">
                          审核
                        </a>
                        <a class="px-3 py-1.5 rounded bg-blue-500 text-white text-xs font-medium hover:bg-blue-600 transition-colors" href="#/fund/withdraw-audit-detail?account=8100453">
                          查看
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Item 2 -->
              <div>
                <div class="list-scroll">
                  <div class="px-5 py-4 hover:bg-gray-50/80">
                    <div class="list-grid">
                      <div class="pt-1">
                        <button class="transition-colors" :class="expandedRows.includes('withdraw-detail-2') ? 'text-red-500' : 'text-gray-400 hover:text-primary'" @click="toggleDetail('withdraw-detail-2')">
                          <i class="fa-solid fa-chevron-right text-xs transition-transform" :class="{ 'rotate-90': expandedRows.includes('withdraw-detail-2') }"></i>
                        </button>
                      </div>
                      <div class="text-sm text-gray-700">
                        <div class="font-medium">9900456</div>
                        <div class="text-xs text-gray-400 mt-1">MT分组：美分分组XXXX</div>
                      </div>
                      <div class="text-sm">
                        <span class="type-pill cent change-highlight">美分账户</span>
                      </div>
                      <div class="text-sm text-gray-500 break-all">OUT_919847271934199098</div>
                      <div class="text-sm text-gray-500">test-测试小组</div>
                      <div class="text-sm text-gray-500">
                        <div>姓名：test-小测试</div>
                        <div class="mt-1">手机号：14578541002</div>
                      </div>
                      <div class="text-sm text-gray-700">
                        <div>出金金额：$120.00</div>
                        <div class="mt-1 text-gray-400">到账金额：￥861.60</div>
                      </div>
                      <div class="text-sm text-amber-600">已下发</div>
                      <div class="text-sm text-gray-500">财务-B</div>
                      <div class="text-sm text-gray-500">
                        <div>客服审核：2026-07-20 15:13:23</div>
                        <div class="mt-1">风险审核：2026-07-20 15:15:15</div>
                        <div class="mt-1">财务审核：2026-07-20 15:16:56</div>
                      </div>
                      <div class="text-sm text-gray-500">支付中</div>
                    </div>
                  </div>
                </div>
                <div class="px-8 pb-5 border-t border-gray-100" v-show="expandedRows.includes('withdraw-detail-2')">
                  <div class="detail-panel">
                    <div class="detail-row">
                      <div class="detail-label">支付方式</div>
                      <div class="detail-value">AIPAY</div>
                    </div>
                    <div class="detail-row">
                      <div class="detail-label">时间</div>
                      <div class="detail-value">
                        <div>申请时间：2026-07-20 15:09:10</div>
                        <div>客服审核：2026-07-20 15:13:23</div>
                        <div>财务审核：2026-07-20 15:16:56</div>
                      </div>
                    </div>
                    <div class="detail-row">
                      <div class="detail-label">账户余额</div>
                      <div class="detail-value">52,450.00 USC</div>
                    </div>
                    <div class="detail-row">
                      <div class="detail-label">账户净值</div>
                      <div class="detail-value">52,460.00 USC</div>
                    </div>
                    <div class="detail-row border-b-0">
                      <div class="detail-label">操作</div>
                      <div class="flex items-center gap-2">
                        <a class="px-3 py-1.5 rounded border border-blue-500 bg-white text-blue-500 text-xs font-medium hover:bg-blue-50 transition-colors" href="#/fund/withdraw-audit-detail?account=9900456">
                          审核
                        </a>
                        <a class="px-3 py-1.5 rounded bg-blue-500 text-white text-xs font-medium hover:bg-blue-600 transition-colors" href="#/fund/withdraw-audit-detail?account=9900456">
                          查看
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>

    <!-- Manage Withdraw Modal -->
    <div class="modal-mask" v-show="isModalOpen">
      <div class="modal-panel">
        <div class="h-14 px-6 border-b border-gray-200 flex items-center justify-between">
          <div class="text-lg font-semibold text-gray-700">管理员出金</div>
          <button type="button" @click="closeManageWithdrawModal" class="text-gray-400 hover:text-gray-600 transition-colors">
            <i class="fa-solid fa-xmark text-xl"></i>
          </button>
        </div>
        <div class="px-6 py-5 space-y-5">
          <div>
            <label class="block text-[15px] font-medium text-gray-600 mb-3">
              <span class="change-highlight">*</span> {{ manageWithdrawAmountLabel }}
            </label>
            <input v-model="modalForm.amount" class="modal-input" :placeholder="manageWithdrawAmountPlaceholder" />
          </div>
          <div>
            <label class="block text-[15px] font-medium text-gray-600 mb-3">
              <span class="change-highlight">*</span> MT账号：
            </label>
            <input v-model="modalForm.mtAccount" @input="updateManageWithdrawType" class="modal-input" placeholder="请输入MT账号" />
            <div class="mt-2 text-xs" :class="isHighlightHint ? 'change-highlight' : 'text-gray-400'">
              {{ manageWithdrawTypeHint }}
            </div>
          </div>
          <div>
            <label class="block text-[15px] font-medium text-gray-600 mb-3">
              <span class="change-highlight">*</span> 确认账号：
            </label>
            <input v-model="modalForm.confirmAccount" class="modal-input" placeholder="确认账号" />
          </div>
          <div>
            <div class="flex items-center justify-between mb-3">
              <label class="block text-[15px] font-medium text-gray-600">
                <span class="change-highlight">*</span> MT Comment：
              </label>
              <span class="text-xs text-gray-400">{{ modalForm.comment.length }}/32</span>
            </div>
            <textarea v-model="modalForm.comment" maxlength="32" class="modal-textarea" placeholder="请输入"></textarea>
          </div>
          <div>
            <label class="block text-[15px] font-medium text-gray-600 mb-3">
              <span class="change-highlight">*</span> 备注：
            </label>
            <textarea v-model="modalForm.remark" class="modal-textarea" placeholder="请输入备注"></textarea>
          </div>
        </div>
        <div class="px-6 py-4 border-t border-gray-200 flex items-center justify-end gap-3 bg-gray-50">
          <button type="button" @click="closeManageWithdrawModal" class="px-6 py-2 rounded-lg bg-red-500 text-white text-sm font-medium hover:bg-red-600 transition-colors">
            取消
          </button>
          <button type="button" @click="closeManageWithdrawModal" class="px-6 py-2 rounded-lg bg-primary text-white text-sm font-medium hover:bg-primaryHover transition-colors">
            确认
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const expandedRows = ref([])

const toggleDetail = (id) => {
  if (expandedRows.value.includes(id)) {
    expandedRows.value = expandedRows.value.filter(rowId => rowId !== id)
  } else {
    expandedRows.value.push(id)
  }
}

const isModalOpen = ref(false)
const modalForm = ref({
  amount: '',
  mtAccount: '',
  confirmAccount: '',
  comment: '',
  remark: ''
})

const accountTypeMap = {
  '8100453': { type: '标准账户', unitLabel: '美元', placeholder: '请输入美元金额', hint: '当前 MT账号 为标准账户，出金金额按 USD/美元 输入。' },
  '9900456': { type: '美分账户', unitLabel: '美元', placeholder: '请输入美元金额', hint: '当前 MT账号 为美分账户，出金金额按 USD/美元 输入。' }
}

const manageWithdrawAmountLabel = computed(() => {
  const accountInfo = accountTypeMap[modalForm.value.mtAccount.trim()]
  return accountInfo ? `出金金额（${accountInfo.unitLabel}）：` : '出金金额（美元）：'
})

const manageWithdrawAmountPlaceholder = computed(() => {
  const accountInfo = accountTypeMap[modalForm.value.mtAccount.trim()]
  return accountInfo ? accountInfo.placeholder : '请输入金额'
})

const manageWithdrawTypeHint = computed(() => {
  const mtAccount = modalForm.value.mtAccount.trim()
  const accountInfo = accountTypeMap[mtAccount]
  if (accountInfo) return accountInfo.hint
  return mtAccount ? '当前 MT账号 未匹配到 demo 账户类型，默认按 USD/美元 展示。' : '请输入 MT账号 后自动识别出金单位。'
})

const isHighlightHint = computed(() => {
  const mtAccount = modalForm.value.mtAccount.trim()
  return !!accountTypeMap[mtAccount]
})

const updateManageWithdrawType = () => {
  if (!modalForm.value.confirmAccount.trim()) {
    modalForm.value.confirmAccount = modalForm.value.mtAccount.trim()
  }
}

const openManageWithdrawModal = () => {
  isModalOpen.value = true
  updateManageWithdrawType()
}

const closeManageWithdrawModal = () => {
  isModalOpen.value = false
  // Reset form
  modalForm.value = {
    amount: '',
    mtAccount: '',
    confirmAccount: '',
    comment: '',
    remark: ''
  }
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
  grid-template-columns: 28px 126px 92px 170px 112px 170px 188px 100px 120px 152px 96px;
  align-items: start;
  min-width: 1366px;
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
.modal-panel {
  width: 100%;
  max-width: 600px;
  background: #FFFFFF;
  border-radius: 10px;
  box-shadow: 0 24px 48px rgba(15, 23, 42, 0.18);
  overflow: hidden;
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
