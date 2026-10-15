<template>
  <div class="flex h-full bg-mainBg overflow-hidden">
    <div class="flex-1 flex flex-col min-w-0 bg-gray-50 overflow-hidden">
      <div class="flex-1 overflow-y-auto p-4 custom-scrollbar">
        <div class="w-full space-y-4">
          <div class="bg-gradient-to-r from-amber-50 via-white to-teal-50 rounded-xl border border-amber-100 shadow-sm overflow-hidden">
            <div class="px-6 py-5 border-b border-amber-100/60 flex flex-wrap items-center gap-4 justify-between">
              <div class="flex items-center gap-4">
                <div>
                  <h2 class="text-base font-bold text-gray-800 flex items-center gap-2">
                    {{ activity.name }}
                    <span class="inline-flex px-2.5 py-0.5 rounded-full text-[11px] font-medium status-running">
                      {{ activity.status }}
                    </span>
                  </h2>
                  <p class="text-xs text-gray-500 mt-0.5">
                    活动有效期：{{ activity.startAt }} 至 {{ activity.endAt }}
                  </p>
                  <div class="mt-2 flex items-center gap-2 flex-wrap">
                    <button
                      class="inline-flex items-center gap-2 h-8 px-3 rounded-md bg-gray-900 hover:bg-gray-800 text-white text-xs font-medium transition-colors"
                      type="button"
                      @click="rulesDrawerOpen = true"
                    >
                      <i class="fa-solid fa-list-check"></i>
                      查看活动要求
                    </button>
                  </div>
                </div>
              </div>
              <div class="flex items-center gap-2">
                <div class="flex flex-col items-end gap-1 mr-1">
                  <div class="text-[11px] text-gray-500">状态切换演示</div>
                  <el-select v-model="demoMode" size="small" class="w-44">
                    <el-option label="未参与" value="not_joined" />
                    <el-option label="已参与部分达标" value="joined_partial" />
                    <el-option label="已参与全部达标" value="joined_full" />
                  </el-select>
                </div>

                <span
                  v-if="viewJoined"
                  class="inline-flex items-center gap-2 h-8 px-3 rounded-md bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold"
                >
                  <i class="fa-solid fa-circle-check"></i>
                  已参加活动
                </span>
                <span
                  v-else
                  class="inline-flex items-center gap-2 h-8 px-3 rounded-md bg-gray-50 border border-gray-200 text-gray-700 text-xs font-semibold"
                >
                  <i class="fa-regular fa-circle"></i>
                  未参与
                </span>

                <button
                  v-if="!viewJoined"
                  class="h-8 px-3 rounded-md bg-[#d1a84f] hover:bg-[#b89241] text-white text-xs font-medium transition-colors"
                  type="button"
                  @click="handleJoin"
                >
                  参与活动
                </button>
                <button class="h-8 px-3 rounded-md bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 text-xs font-medium transition-colors" type="button" @click="router.back()">
                  返回
                </button>
              </div>
            </div>
          </div>

          <div v-if="viewJoined" class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div class="px-6 py-3 border-b border-gray-100 flex items-center justify-between gap-4">
              <div class="min-w-0">
                <div class="text-sm font-bold text-gray-800">我的活动进度</div>
                <div class="text-xs text-gray-500 mt-1">
                  {{ currentCustomerLabel }}
                </div>
              </div>
              <div class="flex items-center gap-3 flex-shrink-0">
                <span
                  v-if="viewIsAchieved"
                  class="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-semibold border border-emerald-200 bg-emerald-50 text-emerald-700"
                >
                  <i class="fa-solid fa-award"></i>
                  已达标
                </span>
                <span
                  v-else
                  class="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-semibold border border-gray-200 bg-gray-50 text-gray-700"
                >
                  <i class="fa-regular fa-hourglass-half"></i>
                  未达标
                </span>
              </div>
            </div>
            <div class="px-6 py-3 space-y-3">
              <div v-if="viewIsAchieved" class="bg-emerald-50 border border-emerald-200 text-emerald-700 px-4 py-3 rounded-lg text-xs font-medium flex items-start gap-2">
                <i class="fa-solid fa-circle-check mt-0.5"></i>
                <span>您已满足活动条件，可发起“赠金转真实资金”申请。</span>
              </div>
              <div>
                <div class="flex items-center justify-between gap-3 text-xs mb-2">
                  <div class="text-gray-600">净入金进度</div>
                  <div class="font-mono text-gray-700 text-right">
                    {{ formatUsd2Dollar(viewProgressNetDepositValue) }} / {{ formatUsd2Dollar(progressNetDepositTarget) }}
                    <span class="text-[11px] text-gray-500 font-sans">｜ 当前释放档位：{{ formatPercent(viewReleaseTierPct) }}</span>
                  </div>
                </div>
                <div class="flex items-center gap-2">
                  <div class="flex-1 h-2 rounded-full bg-gray-100 overflow-hidden">
                    <div class="h-2 bg-emerald-500" :style="{ width: `${viewProgressNetDepositPct}%` }"></div>
                  </div>
                  <div class="w-10 text-right text-[11px] text-gray-500 font-mono">{{ viewProgressNetDepositPct }}%</div>
                </div>
                <div v-if="!viewIsAchieved" class="mt-1 text-[11px] text-gray-500">
                  还差 <span class="font-mono">{{ formatUsd2Dollar(viewNetDepositGap) }}</span>
                </div>
              </div>

              <div>
                <div class="flex items-center justify-between gap-3 text-xs mb-2">
                  <div class="text-gray-600">交易手数进度</div>
                  <div class="font-mono text-gray-700 text-right">
                    {{ formatLotsWithUnit(viewProgressTradeLotsValue) }} / {{ formatLotsWithUnit(progressTradeLotsTarget) }}
                    <span class="text-[11px] text-gray-500 font-sans">｜ 已释放金额：{{ formatUsd2Dollar(viewReleasedAmount) }}</span>
                  </div>
                </div>
                <div class="flex items-center gap-2">
                  <div class="flex-1 h-2 rounded-full bg-gray-100 overflow-hidden">
                    <div class="h-2" :class="viewIsAchieved ? 'bg-emerald-500' : 'bg-blue-500'" :style="{ width: `${viewProgressTradeLotsPct}%` }"></div>
                  </div>
                  <div class="w-10 text-right text-[11px] text-gray-500 font-mono">{{ viewProgressTradeLotsPct }}%</div>
                </div>
                <div v-if="!viewIsAchieved" class="mt-1 text-[11px] text-gray-500">
                  还差 <span class="font-mono">{{ formatLotsWithUnit(viewTradeLotsGap) }}</span>
                </div>
              </div>

              <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
                <div>
                  <div class="text-[11px] text-gray-500 mb-1">已发放信用金</div>
                  <div class="text-sm font-bold text-gray-800 font-mono">{{ formatUsd4(viewCreditSummary?.issuedCredit) }}</div>
                </div>
                <div>
                  <div class="text-[11px] text-gray-500 mb-1">已消耗信用金</div>
                  <div class="text-sm font-bold text-gray-800 font-mono">{{ formatUsd4(viewCreditSummary?.consumedCredit) }}</div>
                </div>
                <div>
                  <div class="text-[11px] text-gray-500 mb-1">当前占用信用金</div>
                  <div class="text-sm font-bold text-gray-800 font-mono">{{ formatUsd4(viewCreditSummary?.occupiedNow) }}</div>
                </div>
                <div>
                  <div class="text-[11px] text-gray-500 mb-1">可转换信用金</div>
                  <div class="text-sm font-bold text-gray-800 font-mono">{{ formatUsd4(viewCreditSummary?.convertibleCredit) }}</div>
                </div>
                <div>
                  <div class="text-[11px] text-gray-500 mb-1">已转换真实资金</div>
                  <div class="text-sm font-bold text-gray-800 font-mono">{{ formatUsd4(viewCreditSummary?.convertedCredit) }}</div>
                </div>
              </div>
            </div>
          </div>

          <div v-if="viewJoined" class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div class="px-6 py-3 border-b border-gray-100 flex items-center justify-between gap-4">
              <div class="min-w-0">
                <div class="text-sm font-bold text-gray-800">赠金转真实资金</div>
                <div class="text-xs text-gray-500 mt-1">不支持部分转换，系统将一次性转换全部可转换信用金。</div>
              </div>
              <div class="flex items-center gap-3 flex-shrink-0">
                <span
                  v-if="viewApplyStatus === 'pending'"
                  class="inline-flex items-center gap-2 h-8 px-3 rounded-md bg-orange-50 border border-orange-200 text-orange-700 text-xs font-semibold"
                >
                  <i class="fa-solid fa-hourglass-half"></i>
                  审核中
                </span>
                <span
                  v-else-if="viewApplyStatus === 'done'"
                  class="inline-flex items-center gap-2 h-8 px-3 rounded-md bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold"
                >
                  <i class="fa-solid fa-circle-check"></i>
                  已完成
                </span>
                <template v-else>
                  <button
                    v-if="viewIsAchieved"
                    class="h-8 px-3 rounded-md bg-[#d1a84f] hover:bg-[#b89241] text-white text-xs font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    type="button"
                    :disabled="!!applyBlockReason"
                    @click="openApplyDrawer"
                  >
                    申请转真实资金
                  </button>
                </template>
              </div>
            </div>
            <div class="px-6 py-3">
              <div v-if="!viewIsAchieved" class="text-xs text-gray-500">达标后可申请转为真实资金。</div>
              <div v-else-if="applyBlockReason" class="text-xs text-rose-500">{{ applyBlockReason }}</div>
            </div>
          </div>

          <div v-if="viewJoined" class="bg-white rounded-xl shadow-sm border border-gray-100 flex flex-col min-h-[520px] overflow-hidden">
            <div class="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
              <div class="text-sm font-bold text-gray-800">转换记录</div>
            </div>
            <div class="flex-1 p-0 overflow-hidden min-h-[320px]">
              <DataTable :data="conversionRows" :total="conversionRows.length" v-model:page="conversionPage" v-model:limit="conversionLimit">
                <el-table-column label="申请金额" min-width="120" align="right">
                  <template #default="{ row }">
                    <span class="font-mono text-gray-700">{{ formatUsd4(row.amount) }}</span>
                  </template>
                </el-table-column>
                <el-table-column label="目标真实账户" min-width="160">
                  <template #default="{ row }">
                    <span class="text-gray-700">{{ row.targetAccountLabel || '-' }}</span>
                  </template>
                </el-table-column>
                <el-table-column label="申请时间" min-width="170">
                  <template #default="{ row }">
                    <span class="font-mono text-gray-600">{{ row.appliedAt || '-' }}</span>
                  </template>
                </el-table-column>
                <el-table-column label="状态" min-width="120">
                  <template #default="{ row }">
                    <span class="text-gray-700">{{ row.status }}</span>
                  </template>
                </el-table-column>
                <el-table-column label="完成时间" min-width="170">
                  <template #default="{ row }">
                    <span class="font-mono text-gray-600">{{ row.completedAt }}</span>
                  </template>
                </el-table-column>
                <el-table-column label="审核结果" min-width="100">
                  <template #default="{ row }">
                    <span class="text-gray-700">{{ row.reviewResult }}</span>
                  </template>
                </el-table-column>
                <el-table-column label="驳回原因" min-width="160">
                  <template #default="{ row }">
                    <span class="text-gray-600">{{ row.rejectReason }}</span>
                  </template>
                </el-table-column>
                <el-table-column label="操作" min-width="100" fixed="right">
                  <template #default="{ row }">
                    <button class="text-xs text-[#b89241] hover:text-[#a07f39] font-medium" type="button" @click="openRequestDetail(row.id)">查看</button>
                  </template>
                </el-table-column>
              </DataTable>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <el-drawer v-model="applyDrawerOpen" :with-header="false" size="520px">
    <div class="h-full flex flex-col">
      <div class="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
        <div class="text-sm font-bold text-gray-800">申请转真实资金</div>
        <button class="text-gray-400 hover:text-gray-600" type="button" @click="applyDrawerOpen = false">
          <i class="fa-solid fa-xmark"></i>
        </button>
      </div>
      <div class="flex-1 overflow-y-auto px-5 py-4 space-y-4">
        <div class="space-y-2">
          <div class="text-xs text-gray-500">可转换信用金（一次性全部转换）</div>
          <div class="h-9 px-3 rounded-md border border-gray-200 bg-gray-50 text-xs text-gray-700 flex items-center font-mono">
            {{ formatUsd4(viewCreditSummary?.convertibleCredit) }}
          </div>
        </div>

        <div class="space-y-2">
          <div class="text-xs text-gray-500">目标真实资金账户</div>
          <el-select v-model="applyForm.targetAccountId" placeholder="选择目标账户" class="w-full" size="small">
            <el-option v-for="o in accountOptions" :key="o.value" :label="o.label" :value="o.value" />
          </el-select>
          <div v-if="selectedAccount" class="text-[11px] text-gray-500">
            账户余额：{{ formatUsd2(selectedAccount.balanceUsd) }}
          </div>
        </div>

        <div class="space-y-2">
          <div class="text-xs text-gray-500">邮箱验证码</div>
          <div class="flex items-center gap-2">
            <el-input v-model="applyForm.otp" placeholder="请输入验证码" size="small" class="flex-1" />
            <button
              class="h-8 px-3 rounded-md border border-gray-200 bg-white text-gray-700 text-xs hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              type="button"
              :disabled="otpCooldownLeft > 0"
              @click="handleSendOtp"
            >
              {{ otpCooldownLeft > 0 ? `${otpCooldownLeft}s` : '发送验证码' }}
            </button>
          </div>
          <div v-if="otpTip" class="text-[11px] text-gray-500">{{ otpTip }}</div>
        </div>

        <div class="space-y-2">
          <label class="flex items-start gap-2 text-xs text-gray-600">
            <input v-model="applyForm.agreed" type="checkbox" class="mt-0.5" />
            <span>
              我已确认：不支持部分转换，本次提交将一次性转换全部可转换信用金；同一活动仅允许存在一笔处理中申请。
            </span>
          </label>
          <div v-if="applySubmitError" class="text-xs text-rose-500">{{ applySubmitError }}</div>
        </div>
      </div>
      <div class="px-5 py-4 border-t border-gray-100 flex items-center justify-end gap-3">
        <button class="h-9 px-4 rounded-md border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors text-sm font-medium" type="button" @click="applyDrawerOpen = false">取消</button>
        <button class="h-9 px-4 rounded-md bg-[#d1a84f] hover:bg-[#b89241] text-white transition-colors text-sm font-medium" type="button" @click="handleSubmitApply">
          确认提交
        </button>
      </div>
    </div>
  </el-drawer>

  <el-drawer v-model="requestDetailDrawerOpen" :with-header="false" size="520px">
    <div class="h-full flex flex-col">
      <div class="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
        <div class="text-sm font-bold text-gray-800">申请详情</div>
        <button class="text-gray-400 hover:text-gray-600" type="button" @click="requestDetailDrawerOpen = false">
          <i class="fa-solid fa-xmark"></i>
        </button>
      </div>
      <div class="flex-1 overflow-y-auto px-5 py-4">
        <div class="grid grid-cols-2 gap-4 text-xs">
          <div>
            <div class="text-gray-500 mb-1">活动</div>
            <div class="text-gray-800">{{ requestDetail?.activityName || activity.name }}</div>
          </div>
          <div>
            <div class="text-gray-500 mb-1">申请金额</div>
            <div class="text-gray-800 font-mono">{{ formatUsd4(requestDetail?.amount) }}</div>
          </div>
          <div>
            <div class="text-gray-500 mb-1">目标真实账户</div>
            <div class="text-gray-800">{{ requestDetail?.targetAccountLabel || '-' }}</div>
          </div>
          <div>
            <div class="text-gray-500 mb-1">申请时间</div>
            <div class="text-gray-800 font-mono">{{ requestDetail?.appliedAt || '-' }}</div>
          </div>
          <div>
            <div class="text-gray-500 mb-1">状态</div>
            <div class="text-gray-800">{{ requestDetail?.status || '-' }}</div>
          </div>
          <div>
            <div class="text-gray-500 mb-1">完成时间</div>
            <div class="text-gray-800 font-mono">{{ requestDetail?.completedAt || '-' }}</div>
          </div>
          <div class="col-span-2">
            <div class="text-gray-500 mb-1">审核记录</div>
            <div class="rounded-md border border-gray-200 bg-gray-50 px-3 py-2">
              <div v-if="(requestDetail?.auditLogs || []).length === 0" class="text-gray-400">-</div>
              <div v-else class="space-y-1">
                <div v-for="(l, idx) in requestDetail.auditLogs" :key="idx" class="flex items-start justify-between gap-3">
                  <div class="text-gray-700">{{ l.actor }} · {{ l.action }}</div>
                  <div class="text-gray-500 font-mono">{{ l.at }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="px-5 py-4 border-t border-gray-100 flex items-center justify-end">
        <button class="h-9 px-4 rounded-md border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors text-sm font-medium" type="button" @click="requestDetailDrawerOpen = false">关闭</button>
      </div>
    </div>
  </el-drawer>

  <el-drawer v-model="rulesDrawerOpen" :with-header="false" size="520px">
    <div class="h-full flex flex-col">
      <div class="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
        <div class="text-sm font-bold text-gray-800">活动要求</div>
        <button class="text-gray-400 hover:text-gray-600" type="button" @click="rulesDrawerOpen = false">
          <i class="fa-solid fa-xmark"></i>
        </button>
      </div>
      <div class="flex-1 overflow-y-auto px-5 py-4 space-y-4 text-xs text-gray-700">
        <div class="rounded-lg border border-gray-200 bg-gray-50 px-4 py-3">
          <div class="font-semibold text-gray-800 mb-2">达标条件</div>
          <div class="space-y-1">
            <div>净入金达到 <span class="font-mono">{{ formatUsd2Dollar(progressNetDepositTarget) }}</span></div>
            <div>达标交易手数达到 <span class="font-mono">{{ formatLotsWithUnit(progressTradeLotsTarget) }}</span></div>
          </div>
        </div>

        <div class="rounded-lg border border-gray-200 bg-gray-50 px-4 py-3">
          <div class="font-semibold text-gray-800 mb-2">转真实资金规则</div>
          <div class="space-y-1">
            <div>不支持部分转换，必须一次性转换全部可转换信用金。</div>
            <div>同一活动仅允许存在一笔“审核中”申请。</div>
            <div>申请需选择目标真实账户并完成邮箱验证码校验。</div>
          </div>
        </div>

        <div class="rounded-lg border border-gray-200 bg-gray-50 px-4 py-3">
          <div class="font-semibold text-gray-800 mb-2">说明</div>
          <div class="space-y-1 text-gray-600">
            <div>页面数据为演示用展示，具体以实际业务规则为准。</div>
          </div>
        </div>
      </div>
      <div class="px-5 py-4 border-t border-gray-100 flex items-center justify-end">
        <button class="h-9 px-4 rounded-md border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors text-sm font-medium" type="button" @click="rulesDrawerOpen = false">关闭</button>
      </div>
    </div>
  </el-drawer>
</template>

<script setup>
import { ref, reactive, computed, watch, onMounted, onUnmounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import DataTable from '@/components/DataTable.vue'
import { getParticipation, isJoined as isActivityJoined, getDemoMode, setDemoMode } from '@/store/activityParticipationDemo'
import { getSessionUser } from '@/store/passwordSecurityDemo'
import {
  creditConversionState,
  getAccountsForSelect,
  getCreditSummary,
  getApplyBlockReason,
  sendEmailOtp,
  verifyEmailOtp,
  submitConversionRequest,
  getRequestsByCustomerActivity,
} from '@/store/creditConversionDemo'

const route = useRoute()
const router = useRouter()

const rulesDrawerOpen = ref(false)

const activityId = computed(() => {
  const raw = Array.isArray(route.query.activity) ? route.query.activity[0] : route.query.activity
  return String(raw || 'pioneer-one-50000')
})

const getActivityById = (id) => {
  if (id === 'pioneer-one-50000') {
    return {
      id,
      name: '先锋一号 50,000 USD 活动',
      status: '进行中',
      startAt: '2026-09-01 00:00:00',
      endAt: '2026-12-31 23:59:59',
      targets: { netDeposit: 50000, tradeLots: 500 },
    }
  }
  return {
    id,
    name: '先锋一号 50,000 USD 活动',
    status: '进行中',
    startAt: '2026-09-01 00:00:00',
    endAt: '2026-12-31 23:59:59',
    targets: { netDeposit: 50000, tradeLots: 500 },
  }
}

const activity = reactive(getActivityById(activityId.value))

watch(
  () => activityId.value,
  (id) => {
    Object.assign(activity, getActivityById(id))
  }
)

const sessionUser = computed(() => getSessionUser())
const currentCustomerId = computed(() => {
  const userId = String(sessionUser.value?.user_id || '')
  const mapped = {
    u_agent_01: 'CUST-lixue',
    u_direct_01: 'CUST-wangjianguo',
    u_other_01: 'CUST-chendawen',
  }[userId]
  return String(mapped || '')
})

const fallbackCustomerId = computed(() => {
  const key = activityId.value
  const rows = Array.isArray(creditConversionState.customerActivityCredits) ? creditConversionState.customerActivityCredits : []
  const matches = rows.filter((r) => r.activityId === key && !r.accountAbnormal)
  const noReq = (cid) => !creditConversionState.conversionRequests.some((r) => r.customerId === cid && r.activityId === key)
  const noPending = (cid) => !creditConversionState.conversionRequests.some((r) => r.customerId === cid && r.activityId === key && r.status === '审核中')
  const preferred = matches.find((r) => noReq(r.customerId) && noPending(r.customerId)) || matches.find((r) => noPending(r.customerId)) || matches[0]
  return String(preferred?.customerId || '')
})

const effectiveCustomerId = computed(() => String(currentCustomerId.value || fallbackCustomerId.value || ''))

const participation = computed(() => getParticipation(activityId.value) || null)
const joined = computed(() => isActivityJoined(activityId.value))

const handleJoin = () => {
  router.push({ path: '/home', query: { join: activityId.value } })
}

const releaseTierPct = computed(() => Number(participation.value?.releaseTierPct || 0))
const releasedAmount = computed(() => Number(participation.value?.releasedAmount || 0))

const conversionSummary = computed(() => getCreditSummary({ customerId: effectiveCustomerId.value, activityId: activityId.value }))
const currentCustomerLabel = computed(() => {
  const s = conversionSummary.value
  const name = String(sessionUser.value?.name || '').trim()
  const email = String(sessionUser.value?.email || '').trim()
  const base = [name, email].filter(Boolean).join(' · ')
  if (!s) return base ? `客户：${base}` : '客户：-'
  return `客户：${s.customerName} · ${s.customerEmail}`
})

const progressNetDepositTarget = computed(() => Number(activity.targets?.netDeposit || 0))
const progressTradeLotsTarget = computed(() => Number(activity.targets?.tradeLots || 0))

const progressNetDepositValue = computed(() => {
  const s = conversionSummary.value
  if (s && Number.isFinite(Number(s.totalDepositUsd))) return Number(s.totalDepositUsd)
  const v = participation.value?.progresses?.netDeposit?.value
  return Number(v || 0)
})

const progressTradeLotsValue = computed(() => {
  const s = conversionSummary.value
  if (s && Number.isFinite(Number(s.totalLots))) return Number(s.totalLots)
  const v = participation.value?.progresses?.tradeLots?.value
  return Number(v || 0)
})

const progressNetDepositPct = computed(() => {
  const t = progressNetDepositTarget.value
  if (!t) return 0
  return Math.max(0, Math.min(100, Math.round((progressNetDepositValue.value / t) * 100)))
})

const progressTradeLotsPct = computed(() => {
  const t = progressTradeLotsTarget.value
  if (!t) return 0
  return Math.max(0, Math.min(100, Math.round((progressTradeLotsValue.value / t) * 100)))
})

const isAchieved = computed(() => progressNetDepositValue.value >= progressNetDepositTarget.value && progressTradeLotsValue.value >= progressTradeLotsTarget.value)

const netDepositGap = computed(() => Math.max(0, progressNetDepositTarget.value - progressNetDepositValue.value))
const tradeLotsGap = computed(() => Math.max(0, progressTradeLotsTarget.value - progressTradeLotsValue.value))

const demoMode = computed({
  get: () => getDemoMode(activityId.value),
  set: (v) => setDemoMode(activityId.value, v),
})

const viewJoined = computed(() => demoMode.value !== 'not_joined')
const viewIsAchieved = computed(() => demoMode.value === 'joined_full')

const viewProgressNetDepositValue = computed(() => {
  if (demoMode.value === 'joined_partial') return 8200
  if (demoMode.value === 'joined_full') return progressNetDepositTarget.value
  return 0
})

const viewProgressTradeLotsValue = computed(() => {
  if (demoMode.value === 'joined_partial') return 98.75
  if (demoMode.value === 'joined_full') return progressTradeLotsTarget.value
  return 0
})

const viewProgressNetDepositPct = computed(() => {
  const t = progressNetDepositTarget.value
  if (!t) return 0
  return Math.max(0, Math.min(100, Math.round((viewProgressNetDepositValue.value / t) * 100)))
})

const viewProgressTradeLotsPct = computed(() => {
  const t = progressTradeLotsTarget.value
  if (!t) return 0
  return Math.max(0, Math.min(100, Math.round((viewProgressTradeLotsValue.value / t) * 100)))
})

const viewNetDepositGap = computed(() => Math.max(0, progressNetDepositTarget.value - viewProgressNetDepositValue.value))
const viewTradeLotsGap = computed(() => Math.max(0, progressTradeLotsTarget.value - viewProgressTradeLotsValue.value))

const viewReleaseTierPct = computed(() => {
  if (demoMode.value === 'joined_partial') return 0.1
  if (demoMode.value === 'joined_full') return releaseTierPct.value
  return 0
})

const viewReleasedAmount = computed(() => {
  if (demoMode.value === 'joined_partial') return 0
  if (demoMode.value === 'joined_full') return releasedAmount.value
  return 0
})

const viewCreditSummary = computed(() => {
  if (!viewJoined.value) return null
  if (demoMode.value === 'joined_partial') {
    return {
      issuedCredit: 300,
      consumedCredit: 80,
      occupiedNow: 60,
      convertibleCredit: 0,
      convertedCredit: 0,
    }
  }
  return (
    conversionSummary.value || {
      issuedCredit: 5000,
      consumedCredit: 500,
      occupiedNow: 0,
      convertibleCredit: 4500,
      convertedCredit: 0,
    }
  )
})

const applyBlockReason = computed(() => getApplyBlockReason({ customerId: effectiveCustomerId.value, activityId: activityId.value }))

const conversionPage = ref(1)
const conversionLimit = ref(15)
const conversionRows = computed(() => {
  const list = getRequestsByCustomerActivity({ customerId: effectiveCustomerId.value, activityId: activityId.value })
  return list.map((r) => ({
    ...r,
    reviewResult: r.status === '审核中' ? '-' : r.reviewResult || '-',
    rejectReason: r.status === '审核拒绝' ? r.rejectReason || '-' : '-',
    completedAt: r.status === '审核中' ? '-' : r.completedAt || '-',
  }))
})

const latestRequest = computed(() => {
  const list = getRequestsByCustomerActivity({ customerId: effectiveCustomerId.value, activityId: activityId.value })
  const sorted = [...list].sort((a, b) => String(b.appliedAt || '').localeCompare(String(a.appliedAt || '')))
  return sorted[0] || null
})

const applyStatus = computed(() => {
  const pending = getRequestsByCustomerActivity({ customerId: effectiveCustomerId.value, activityId: activityId.value }).some((r) => r.status === '审核中')
  if (pending) return 'pending'
  if (latestRequest.value?.status === '已完成') return 'done'
  return ''
})

const viewApplyStatus = computed(() => {
  if (!viewJoined.value) return ''
  if (demoMode.value === 'joined_full') return ''
  return applyStatus.value
})

const applyDrawerOpen = ref(false)
const applyForm = reactive({
  targetAccountId: '',
  otp: '',
  agreed: false,
})
const applySubmitError = ref('')
const otpTip = ref('')
const otpCooldownLeft = ref(0)
let otpTimer = null

const tickOtp = () => {
  const left = Math.max(0, Math.ceil((creditConversionState.emailOtp.cooldownUntil - Date.now()) / 1000))
  otpCooldownLeft.value = left
  if (left <= 0 && otpTimer) {
    clearInterval(otpTimer)
    otpTimer = null
  }
}

onMounted(() => {
  otpTimer = setInterval(tickOtp, 500)
  tickOtp()
})

onUnmounted(() => {
  if (otpTimer) clearInterval(otpTimer)
})

const accountOptions = computed(() => getAccountsForSelect().map((a) => ({ value: a.id, label: a.label })))
const selectedAccount = computed(() => creditConversionState.accounts.find((a) => a.id === applyForm.targetAccountId) || null)

const openApplyDrawer = () => {
  if (!viewIsAchieved.value) return
  if (demoMode.value !== 'joined_full' && (applyStatus.value === 'pending' || applyStatus.value === 'done')) return
  if (applyBlockReason.value) return
  applyForm.targetAccountId = ''
  applyForm.otp = ''
  applyForm.agreed = false
  applySubmitError.value = ''
  otpTip.value = ''
  applyDrawerOpen.value = true
}

watch(
  [() => route.query.openApply, () => viewIsAchieved.value],
  ([raw, ok]) => {
    const openApply = Array.isArray(raw) ? raw[0] : raw
    if (String(openApply || '') !== '1') return
    if (!ok) return
    openApplyDrawer()
    try {
      const q = { ...route.query }
      delete q.openApply
      router.replace({ path: route.path, query: q })
    } catch {}
  },
  { immediate: true }
)

const handleSendOtp = () => {
  const res = sendEmailOtp()
  if (!res.ok) {
    otpTip.value = res.message
    tickOtp()
    return
  }
  otpTip.value = `演示码：${res.code}（有效期 100 分钟）`
  tickOtp()
}

const handleSubmitApply = () => {
  applySubmitError.value = ''
  if (applyBlockReason.value) {
    applySubmitError.value = applyBlockReason.value
    return
  }
  if (!applyForm.targetAccountId) {
    applySubmitError.value = '请选择目标真实资金账户'
    return
  }
  if (!applyForm.agreed) {
    applySubmitError.value = '请确认一次性转换声明'
    return
  }
  const otpRes = verifyEmailOtp(applyForm.otp)
  if (!otpRes.ok) {
    applySubmitError.value = otpRes.message
    return
  }
  const res = submitConversionRequest({
    customerId: effectiveCustomerId.value,
    activityId: activityId.value,
    targetAccountId: applyForm.targetAccountId,
  })
  if (!res.ok) {
    applySubmitError.value = res.message
    return
  }
  applyDrawerOpen.value = false
}

const requestDetailDrawerOpen = ref(false)
const requestDetail = ref(null)

const openRequestDetail = (id) => {
  const req = creditConversionState.conversionRequests.find((r) => r.id === id) || null
  requestDetail.value = req
  requestDetailDrawerOpen.value = true
}

const formatUsd4 = (val) => {
  const num = Number(val) || 0
  return `${num.toLocaleString('en-US', { minimumFractionDigits: 4, maximumFractionDigits: 4 })} USD`
}

const formatUsd2 = (val) => {
  const num = Number(val) || 0
  return `${num.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} USD`
}

const formatUsd2Dollar = (val) => {
  const num = Number(val) || 0
  return `$${num.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
}

const formatLots = (val) => {
  const num = Number(val) || 0
  return num.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

const formatLotsWithUnit = (val) => `${formatLots(val)} Lot`

const formatPercent = (ratio) => {
  const num = Number(ratio)
  if (!Number.isFinite(num)) return '-'
  return `${Math.round(num * 100)}%`
}
</script>

<style scoped>
.custom-scrollbar::-webkit-scrollbar { width: 6px; height: 6px; }
.custom-scrollbar::-webkit-scrollbar-thumb { background: #e5e7eb; border-radius: 4px; }
.custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
</style>
