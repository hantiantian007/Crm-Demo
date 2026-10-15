<template>
  <div class="flex h-full bg-mainBg overflow-hidden w-full">
    <div class="flex-1 flex flex-col min-w-0 bg-gray-50 overflow-hidden p-4 custom-scrollbar overflow-y-auto w-full">
      <main class="flex-1 overflow-y-auto p-4 md:p-6 bg-mainBg">
        <div class="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div class="px-5 pt-4">
            <el-tabs v-model="activeTab">
              <el-tab-pane label="赠金审核" name="bonus" />
              <el-tab-pane label="赠金转换审核" name="conversion" />
            </el-tabs>
          </div>

          <div v-if="activeTab === 'bonus'" class="p-5 space-y-4">
            <section class="rounded-xl border border-gray-200 p-5">
              <div class="text-sm font-semibold text-gray-700 mb-4">搜索</div>
              <div class="grid grid-cols-6 gap-4">
                <div class="col-span-2">
                  <label class="block text-xs text-gray-500 mb-2">MT账号</label>
                  <input v-model="bonusForm.mtAccount" class="h-9 w-full rounded-md border border-gray-200 bg-white px-3 text-xs text-gray-700 outline-none focus:border-[#C19B5E] focus:ring-2 focus:ring-[#C19B5E]/10" placeholder="请输入 MT 账号" />
                </div>
                <div class="col-span-2">
                  <label class="block text-xs text-gray-500 mb-2">赠金状态</label>
                  <select v-model="bonusForm.status" class="h-9 w-full rounded-md border border-gray-200 bg-white px-3 text-xs text-gray-700 outline-none focus:border-[#C19B5E] focus:ring-2 focus:ring-[#C19B5E]/10">
                    <option value="">-请选择-</option>
                    <option value="pending">待审核</option>
                    <option value="approved">已通过</option>
                    <option value="rejected">已拒绝</option>
                  </select>
                </div>
                <div class="col-span-2">
                  <label class="block text-xs text-gray-500 mb-2">规则名称</label>
                  <input v-model="bonusForm.rule" class="h-9 w-full rounded-md border border-gray-200 bg-white px-3 text-xs text-gray-700 outline-none focus:border-[#C19B5E] focus:ring-2 focus:ring-[#C19B5E]/10" placeholder="请输入规则名称" />
                </div>
                <div class="col-span-2">
                  <label class="block text-xs text-gray-500 mb-2">开始日期</label>
                  <input v-model="bonusForm.startDate" class="h-9 w-full rounded-md border border-gray-200 bg-white px-3 text-xs text-gray-700 outline-none focus:border-[#C19B5E] focus:ring-2 focus:ring-[#C19B5E]/10" placeholder="开始日期" />
                </div>
                <div class="col-span-2">
                  <label class="block text-xs text-gray-500 mb-2">结束日期</label>
                  <input v-model="bonusForm.endDate" class="h-9 w-full rounded-md border border-gray-200 bg-white px-3 text-xs text-gray-700 outline-none focus:border-[#C19B5E] focus:ring-2 focus:ring-[#C19B5E]/10" placeholder="结束日期" />
                </div>
                <div class="col-span-2 flex items-end gap-3">
                  <button class="h-9 px-4 rounded-md bg-primary hover:bg-primaryHover text-white text-sm font-medium transition-colors" type="button">搜索</button>
                  <button class="h-9 px-4 rounded-md bg-gray-100 hover:bg-gray-200 text-gray-600 text-sm font-medium transition-colors" type="button" @click="resetBonusForm">重置</button>
                </div>
              </div>
            </section>

            <section class="rounded-xl border border-gray-200 overflow-hidden">
              <div v-if="bonusRows.length === 0" class="py-16 flex flex-col items-center justify-center text-gray-400">
                <div class="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                  <i class="fa-regular fa-box-open text-3xl text-gray-300"></i>
                </div>
                <div class="text-sm">无可用数据</div>
              </div>
            </section>
          </div>

          <div v-else class="p-5 space-y-4">
            <section class="rounded-xl border border-gray-200 p-5">
              <div class="text-sm font-semibold text-gray-700 mb-4">搜索</div>
              <div class="grid grid-cols-6 gap-4">
                <div class="col-span-2">
                  <label class="block text-xs text-gray-500 mb-2">客户姓名</label>
                  <input v-model="conversionForm.customerName" class="h-9 w-full rounded-md border border-gray-200 bg-white px-3 text-xs text-gray-700 outline-none focus:border-[#C19B5E] focus:ring-2 focus:ring-[#C19B5E]/10" placeholder="请输入客户姓名" />
                </div>
                <div class="col-span-2">
                  <label class="block text-xs text-gray-500 mb-2">客户邮箱</label>
                  <input v-model="conversionForm.customerEmail" class="h-9 w-full rounded-md border border-gray-200 bg-white px-3 text-xs text-gray-700 outline-none focus:border-[#C19B5E] focus:ring-2 focus:ring-[#C19B5E]/10" placeholder="请输入客户邮箱" />
                </div>
                <div class="col-span-2">
                  <label class="block text-xs text-gray-500 mb-2">活动名称</label>
                  <input v-model="conversionForm.activityName" class="h-9 w-full rounded-md border border-gray-200 bg-white px-3 text-xs text-gray-700 outline-none focus:border-[#C19B5E] focus:ring-2 focus:ring-[#C19B5E]/10" placeholder="请输入活动名称" />
                </div>
                <div class="col-span-2">
                  <label class="block text-xs text-gray-500 mb-2">状态</label>
                  <select v-model="conversionForm.status" class="h-9 w-full rounded-md border border-gray-200 bg-white px-3 text-xs text-gray-700 outline-none focus:border-[#C19B5E] focus:ring-2 focus:ring-[#C19B5E]/10">
                    <option value="">-请选择-</option>
                    <option value="审核中">审核中</option>
                    <option value="已完成">已完成</option>
                    <option value="审核拒绝">审核拒绝</option>
                  </select>
                </div>
                <div class="col-span-2 flex items-end gap-3">
                  <button class="h-9 px-4 rounded-md bg-primary hover:bg-primaryHover text-white text-sm font-medium transition-colors" type="button">搜索</button>
                  <button class="h-9 px-4 rounded-md bg-gray-100 hover:bg-gray-200 text-gray-600 text-sm font-medium transition-colors" type="button" @click="resetConversionForm">重置</button>
                </div>
              </div>
            </section>

            <section class="rounded-xl border border-gray-200 overflow-hidden">
              <div class="overflow-x-auto">
                <table class="min-w-full text-xs">
                  <thead class="bg-white text-gray-500">
                    <tr class="border-b border-gray-100">
                      <th class="text-left font-medium px-5 py-4 whitespace-nowrap">申请ID</th>
                      <th class="text-left font-medium px-5 py-4 whitespace-nowrap">客户姓名</th>
                      <th class="text-left font-medium px-5 py-4 whitespace-nowrap">客户邮箱</th>
                      <th class="text-left font-medium px-5 py-4 whitespace-nowrap">活动名称</th>
                      <th class="text-left font-medium px-5 py-4 whitespace-nowrap text-red-500">申请金额($)</th>
                      <th class="text-left font-medium px-5 py-4 whitespace-nowrap">目标真实账户</th>
                      <th class="text-left font-medium px-5 py-4 whitespace-nowrap">风险状态</th>
                      <th class="text-left font-medium px-5 py-4 whitespace-nowrap">状态</th>
                      <th class="text-left font-medium px-5 py-4 whitespace-nowrap">申请时间</th>
                      <th class="text-left font-medium px-5 py-4 whitespace-nowrap">操作</th>
                    </tr>
                  </thead>
                  <tbody class="text-gray-700">
                    <tr v-for="r in filteredConversionRows" :key="r.id" class="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                      <td class="px-5 py-4 font-mono text-gray-700">{{ r.id }}</td>
                      <td class="px-5 py-4">{{ r.customerName }}</td>
                      <td class="px-5 py-4 text-gray-600">{{ r.customerEmail }}</td>
                      <td class="px-5 py-4">{{ r.activityName }}</td>
                      <td class="px-5 py-4 font-mono text-red-500">${{ formatUsd4(r.amount) }}</td>
                      <td class="px-5 py-4">{{ r.targetAccountLabel }}</td>
                      <td class="px-5 py-4">{{ r.riskTag }}</td>
                      <td class="px-5 py-4">{{ r.status }}</td>
                      <td class="px-5 py-4 font-mono text-gray-600">{{ r.appliedAt }}</td>
                      <td class="px-5 py-4">
                        <div class="flex items-center gap-2">
                          <button class="h-8 px-3 rounded-md bg-blue-500 hover:bg-blue-600 text-white text-xs font-medium transition-colors" type="button" @click="openDetail(r.id)">查看详情</button>
                          <button class="h-8 px-3 rounded-md bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed" type="button" :disabled="r.status !== '审核中'" @click="approve(r.id)">审核通过</button>
                          <button class="h-8 px-3 rounded-md bg-rose-500 hover:bg-rose-600 text-white text-xs font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed" type="button" :disabled="r.status !== '审核中'" @click="openReject(r.id)">驳回</button>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div v-if="filteredConversionRows.length === 0" class="py-16 flex flex-col items-center justify-center text-gray-400">
                <div class="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                  <i class="fa-regular fa-box-open text-3xl text-gray-300"></i>
                </div>
                <div class="text-sm">无可用数据</div>
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  </div>

  <el-drawer v-model="detailOpen" :with-header="false" size="560px">
    <div class="h-full flex flex-col">
      <div class="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
        <div class="text-sm font-bold text-gray-800">赠金转换申请详情</div>
        <button class="text-gray-400 hover:text-gray-600" type="button" @click="detailOpen = false">
          <i class="fa-solid fa-xmark"></i>
        </button>
      </div>
      <div class="flex-1 overflow-y-auto custom-scrollbar px-5 py-4 space-y-4 text-xs">
        <div class="grid grid-cols-2 gap-3">
          <div class="col-span-2">
            <div class="text-gray-500 mb-1">客户</div>
            <div class="text-gray-800 font-medium">{{ detail?.customerName || '-' }}（{{ detail?.customerEmail || '-' }}）</div>
          </div>
          <div class="col-span-2">
            <div class="text-gray-500 mb-1">活动名称</div>
            <div class="text-gray-800 font-medium">{{ detail?.activityName || '-' }}</div>
          </div>
          <div>
            <div class="text-gray-500 mb-1">申请金额</div>
            <div class="text-gray-800 font-mono">${{ formatUsd4(detail?.amount) }}</div>
          </div>
          <div>
            <div class="text-gray-500 mb-1">目标真实账户</div>
            <div class="text-gray-800">{{ detail?.targetAccountLabel || '-' }}</div>
          </div>
          <div>
            <div class="text-gray-500 mb-1">风险状态</div>
            <div class="text-gray-800">{{ detail?.riskTag || '-' }}</div>
          </div>
          <div>
            <div class="text-gray-500 mb-1">状态</div>
            <div class="text-gray-800">{{ detail?.status || '-' }}</div>
          </div>
          <div class="col-span-2">
            <div class="text-gray-500 mb-1">赠金明细（按活动独立记账）</div>
            <div class="grid grid-cols-3 gap-2">
              <div class="h-9 px-3 rounded-md border border-gray-200 bg-gray-50 flex items-center">原始赠金：${{ formatUsd4(detailSummary?.issuedCredit) }}</div>
              <div class="h-9 px-3 rounded-md border border-gray-200 bg-gray-50 flex items-center">当前可用：${{ formatUsd4(detailSummary?.availableCredit) }}</div>
              <div class="h-9 px-3 rounded-md border border-gray-200 bg-gray-50 flex items-center">当前占用：${{ formatUsd4(detailSummary?.occupiedNow) }}</div>
              <div class="h-9 px-3 rounded-md border border-gray-200 bg-gray-50 flex items-center">已消耗：${{ formatUsd4(detailSummary?.consumedCredit) }}</div>
              <div class="h-9 px-3 rounded-md border border-gray-200 bg-gray-50 flex items-center">已转换：${{ formatUsd4(detailSummary?.convertedCredit) }}</div>
              <div class="h-9 px-3 rounded-md border border-gray-200 bg-gray-50 flex items-center">可转换：${{ formatUsd4(detailSummary?.convertibleCredit) }}</div>
            </div>
          </div>
          <div class="col-span-2">
            <div class="text-gray-500 mb-1">审核记录</div>
            <div class="rounded-md border border-gray-200 bg-gray-50 px-3 py-2">
              <div v-if="(detail?.auditLogs || []).length === 0" class="text-gray-400">-</div>
              <div v-else class="space-y-1">
                <div v-for="(l, idx) in detail.auditLogs" :key="idx" class="flex items-start justify-between gap-3">
                  <div class="text-gray-700">{{ l.actor }} · {{ l.action }}</div>
                  <div class="text-gray-500 font-mono">{{ l.at }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="px-5 py-4 border-t border-gray-100 flex items-center justify-end">
        <button class="h-9 px-4 rounded-md border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors text-sm font-medium" type="button" @click="detailOpen = false">关闭</button>
      </div>
    </div>
  </el-drawer>

  <el-dialog v-model="rejectOpen" width="520px" :show-close="false" align-center>
    <template #header>
      <div class="flex items-center justify-between w-full">
        <div class="text-sm font-bold text-gray-800">驳回申请</div>
        <button class="text-gray-400 hover:text-gray-600" type="button" @click="rejectOpen = false">
          <i class="fa-solid fa-xmark"></i>
        </button>
      </div>
    </template>
    <div class="space-y-2">
      <div class="text-xs text-gray-500">请填写驳回原因（将保留在审核记录中）。</div>
      <el-input v-model="rejectReason" type="textarea" :rows="3" placeholder="请输入驳回原因" />
      <div v-if="rejectError" class="text-xs text-rose-500">{{ rejectError }}</div>
    </div>
    <template #footer>
      <div class="flex items-center justify-end gap-2">
        <button class="h-9 px-4 rounded-md bg-gray-100 hover:bg-gray-200 text-gray-600 text-sm font-medium transition-colors" type="button" @click="rejectOpen = false">取消</button>
        <button class="h-9 px-4 rounded-md bg-rose-500 hover:bg-rose-600 text-white text-sm font-medium transition-colors" type="button" @click="confirmReject">确认驳回</button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup>
import { reactive, ref, computed } from 'vue'
import { creditConversionState, approveRequest, rejectRequest, getCreditSummary } from '@/store/creditConversionDemo'

const activeTab = ref('bonus')

const bonusForm = reactive({
  mtAccount: '',
  status: '',
  rule: '',
  startDate: '',
  endDate: '',
})

const conversionForm = reactive({
  customerName: '',
  customerEmail: '',
  activityName: '',
  status: '',
})

const bonusRows = ref([])

const resetBonusForm = () => {
  bonusForm.mtAccount = ''
  bonusForm.status = ''
  bonusForm.rule = ''
  bonusForm.startDate = ''
  bonusForm.endDate = ''
}

const resetConversionForm = () => {
  conversionForm.customerName = ''
  conversionForm.customerEmail = ''
  conversionForm.activityName = ''
  conversionForm.status = ''
}

const formatUsd4 = (n) => {
  const v = Number(n || 0)
  return v.toLocaleString('en-US', { minimumFractionDigits: 4, maximumFractionDigits: 4 })
}

const filteredConversionRows = computed(() => {
  const name = conversionForm.customerName.trim()
  const email = conversionForm.customerEmail.trim()
  const activityName = conversionForm.activityName.trim()
  const status = conversionForm.status

  return creditConversionState.conversionRequests
    .map((r) => {
      const summary = getCreditSummary({ customerId: r.customerId, activityId: r.activityId })
      return { ...r, riskTag: summary?.riskTag || '正常' }
    })
    .filter((r) => {
      const matchName = !name || r.customerName.includes(name)
      const matchEmail = !email || r.customerEmail.includes(email)
      const matchActivity = !activityName || r.activityName.includes(activityName)
      const matchStatus = !status || r.status === status
      return matchName && matchEmail && matchActivity && matchStatus
    })
})

const detailOpen = ref(false)
const detail = ref(null)
const detailSummary = ref(null)

const openDetail = (id) => {
  const req = creditConversionState.conversionRequests.find((r) => r.id === id) || null
  detail.value = req
  detailSummary.value = req ? getCreditSummary({ customerId: req.customerId, activityId: req.activityId }) : null
  detailOpen.value = true
}

const approve = (id) => {
  approveRequest({ id, auditor: '审核员-史密斯' })
}

const rejectOpen = ref(false)
const rejectId = ref('')
const rejectReason = ref('')
const rejectError = ref('')

const openReject = (id) => {
  rejectId.value = id
  rejectReason.value = ''
  rejectError.value = ''
  rejectOpen.value = true
}

const confirmReject = () => {
  rejectError.value = ''
  if (!rejectReason.value.trim()) {
    rejectError.value = '请填写驳回原因'
    return
  }
  rejectRequest({ id: rejectId.value, auditor: '审核员-史密斯', reason: rejectReason.value })
  rejectOpen.value = false
}

</script>
