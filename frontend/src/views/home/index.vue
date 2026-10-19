<template>
  <div
    ref="homeScrollRef"
    class="flex flex-col flex-1 min-h-0 custom-scrollbar overflow-y-auto bg-gray-50 p-4 md:p-6"
  >
    <div class="w-full grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_320px] xl:grid-cols-[minmax(0,1fr)_360px] gap-6">
      <div class="min-w-0 flex flex-col gap-6">
        <div class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div class="p-5">
            <div class="-mt-1 mb-4 flex items-center justify-between gap-3 flex-wrap">
              <div class="overflow-x-auto no-scrollbar">
                <div class="inline-flex min-w-max bg-gray-100/60 p-1 rounded-lg border border-gray-200/60">
                  <button
                    v-for="(t, idx) in activityTabs"
                    :key="t.key"
                    type="button"
                    class="h-8 px-3 text-xs font-medium whitespace-nowrap transition-colors flex-shrink-0 max-w-[180px] truncate"
                    :class="[
                      idx === 0 ? 'rounded-l-md' : idx === activityTabs.length - 1 ? 'rounded-r-md' : 'rounded-none',
                      idx !== activityTabs.length - 1 ? 'border-r border-gray-200/60' : '',
                      activeActivityKey === t.key ? 'bg-white text-gray-800 shadow-sm' : 'bg-transparent text-gray-500 hover:text-gray-700'
                    ]"
                    @click="activeActivityKey = t.key"
                    :title="t.title"
                  >
                    {{ t.tabLabel }}
                  </button>
                </div>
              </div>

              <div v-if="currentActivity.key === 'pioneer-one-50000'" class="flex items-center gap-2">
                <div class="text-[11px] text-gray-500 whitespace-nowrap">状态切换演示</div>
                <el-select v-model="pioneerDemoMode" size="small" class="w-44">
                  <el-option label="未参与" value="not_joined" />
                  <el-option label="已参与部分达标" value="joined_partial" />
                  <el-option label="已参与全部达标" value="joined_full" />
                  <el-option label="申请被拒绝" value="application_rejected" />
                  <el-option label="拒绝后重新申请" value="application_resubmitted" />
                </el-select>
                <button
                  v-if="pioneerDemoMode === 'joined_full'"
                  type="button"
                  class="h-7 px-3 rounded-md border border-gray-200 bg-white text-gray-700 text-xs font-medium hover:bg-gray-50 transition-colors"
                  @click="resetPioneerHomeApplyState"
                >
                  重置申请状态
                </button>
              </div>
            </div>

            <div class="flex items-start gap-6">
              <div class="flex items-start gap-4 min-w-0">
                <div class="w-12 h-12 rounded-xl bg-[#C19B5E] text-white flex items-center justify-center flex-shrink-0">
                  <i class="fa-regular fa-credit-card text-xl"></i>
                </div>
                <div class="min-w-0">
                  <div class="flex items-center gap-3 min-w-0 flex-wrap">
                    <div class="text-base font-bold text-gray-900 truncate">{{ currentActivity.title }}</div>
                    <button
                      v-if="currentActivity.key !== 'pioneer-one-50000'"
                      class="h-8 px-4 rounded-md text-white text-xs font-bold transition-colors bg-rose-500 hover:bg-rose-600 flex-shrink-0"
                      type="button"
                      @click="handlePrimaryAction(currentActivity.key)"
                    >
                      {{ primaryActionText(currentActivity) }}
                    </button>
                    <button
                      v-else-if="!uiJoined"
                      class="h-8 px-4 rounded-md text-white text-xs font-bold transition-colors bg-rose-500 hover:bg-rose-600 flex-shrink-0"
                      type="button"
                      @click="openPioneerJoinDialog"
                    >
                      参与活动
                    </button>
                    <button
                      v-if="currentActivity.key === 'pioneer-one-50000'"
                      type="button"
                      class="h-8 px-4 rounded-md bg-gray-900 hover:bg-gray-800 text-white text-xs font-bold transition-colors flex items-center gap-2 flex-shrink-0"
                      @click="pioneerRuleDialog.open = true"
                    >
                      <i class="fa-solid fa-list-check"></i>
                      查看活动要求
                    </button>
                    <span
                      v-if="uiJoined"
                      class="inline-flex items-center gap-2 h-8 px-3 rounded-md bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold flex-shrink-0"
                    >
                      <i class="fa-solid fa-circle-check"></i>
                      已参加活动
                    </span>
                    <span
                      v-else-if="currentParticipationStatus === 'ended'"
                      class="inline-flex items-center gap-2 h-8 px-3 rounded-md bg-gray-50 border border-gray-200 text-gray-700 text-xs font-semibold flex-shrink-0"
                    >
                      <i class="fa-regular fa-circle"></i>
                      已结束活动
                    </span>
                    <span
                      v-else
                      class="inline-flex items-center gap-2 h-8 px-3 rounded-md bg-gray-50 border border-gray-200 text-gray-700 text-xs font-semibold flex-shrink-0"
                    >
                      <i class="fa-regular fa-circle"></i>
                      未参加活动
                    </span>
                    <span
                      v-if="currentActivity.key === 'pioneer-one-50000' && uiAchieved"
                      class="inline-flex items-center gap-2 h-8 px-3 rounded-md bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold flex-shrink-0"
                    >
                      <i class="fa-solid fa-award"></i>
                      已达标
                    </span>
                    <span
                      v-if="currentActivity.key === 'pioneer-one-50000' && uiJoined && !uiAchieved"
                      class="inline-flex items-center gap-2 h-8 px-3 rounded-md bg-gray-50 border border-gray-200 text-gray-700 text-xs font-semibold flex-shrink-0"
                    >
                      <i class="fa-regular fa-circle"></i>
                      未达标
                    </span>
                  </div>
                  <div class="text-sm text-orange-500 font-medium mt-1">{{ currentActivity.mainCopy }}</div>
                  <div v-if="currentActivity.conditionText" class="text-xs text-orange-500 font-medium mt-1">{{ currentActivity.conditionText }}</div>

                  <div class="mt-2 text-[11px] text-gray-500 font-mono flex items-center gap-2 flex-wrap">
                    <span>{{ currentActivity.timeRange }}</span>
                    <span class="text-gray-300">|</span>
                    <span class="text-gray-500">剩余 {{ formatInt(currentActivity.remainingDays) }} 天</span>
                  </div>
                </div>
              </div>
            </div>

            <div class="mt-5 space-y-4">
              <div v-if="!uiJoined" class="bg-orange-50 border border-orange-200 text-orange-600 px-4 py-3 rounded-lg text-xs font-medium flex items-start gap-2">
                <i class="fa-solid fa-circle-info mt-0.5"></i>
                <span>当前未参与该活动，点击“参与活动”完成报名后可查看活动进度与释放信息。</span>
              </div>
              <div v-else v-for="p in currentProgresses" :key="p.key" class="space-y-2">
                <div class="flex items-center justify-between gap-4">
                  <div
                    class="text-xs font-medium flex items-center gap-2"
                    :class="p.color === 'emerald' ? 'text-emerald-600' : p.color === 'blue' ? 'text-blue-600' : 'text-gray-600'"
                  >
                    <i :class="p.icon"></i>
                    {{ p.label }}
                  </div>
                  <div class="text-xs font-bold text-gray-800">
                    <span v-if="p.format === 'money'">${{ formatMoney(p.value) }}</span>
                    <span v-else-if="p.format === 'lots'">{{ formatLots(p.value) }} Lot</span>
                    <span v-else>{{ formatInt(p.value) }}</span>
                    <span class="text-gray-400 font-medium">
                      /
                      <span v-if="p.format === 'money'">${{ formatMoney(p.target) }}</span>
                      <span v-else-if="p.format === 'lots'">{{ formatLots(p.target) }} Lot</span>
                      <span v-else>{{ formatInt(p.target) }}</span>
                    </span>
                    <span
                      v-if="currentActivity.key === 'pioneer-one-50000' && uiJoined && p.key === 'net-deposit'"
                      class="text-[11px] text-gray-500 font-medium ml-1"
                    >
                      ｜ 当前释放档位：{{ uiReleaseTierPct }}%
                    </span>
                    <span
                      v-if="currentActivity.key === 'pioneer-one-50000' && uiJoined && p.key === 'trade-lots'"
                      class="text-[11px] text-gray-500 font-medium ml-1"
                    >
                      ｜ 已释放金额：${{ formatMoney(uiReleasedAmount) }}
                    </span>
                  </div>
                </div>
                <div class="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    class="h-full rounded-full"
                    :class="p.color === 'emerald' ? 'bg-emerald-400' : p.color === 'blue' ? 'bg-blue-500' : 'bg-gray-400'"
                    :style="{ width: `${percent(p.value, p.target)}%` }"
                  ></div>
                </div>
                <div
                  v-if="currentActivity.key === 'pioneer-one-50000' && uiJoined && !uiAchieved && p.key === 'net-deposit'"
                  class="text-[11px] text-gray-500"
                >
                  还差 <span class="font-mono">${{ formatMoney(uiNetDepositGap) }}</span>
                </div>
                <div
                  v-if="currentActivity.key === 'pioneer-one-50000' && uiJoined && !uiAchieved && p.key === 'trade-lots'"
                  class="text-[11px] text-gray-500"
                >
                  还差 <span class="font-mono">{{ formatLots(uiTradeLotsGap) }} Lot</span>
                </div>
              </div>

              <div v-if="currentActivity.key === 'pioneer-one-50000' && uiJoined" class="space-y-3">
                <div class="bg-white rounded-lg border border-gray-200 px-4 py-3 flex items-start justify-between gap-4 flex-wrap">
                  <div class="min-w-0">
                    <div v-if="pioneerApplyUiState === 'pending'" class="text-xs font-semibold text-gray-800">
                      {{ pioneerLatestRequest?.status || '审核中' }}
                      <span class="text-gray-400 font-medium">｜</span>
                      申请金额 <span class="font-mono">{{ formatUsd4(pioneerLatestRequest?.amount) }}</span>
                      <span class="text-gray-400 font-medium">｜</span>
                      申请时间 <span class="font-mono">{{ pioneerLatestRequest?.appliedAt }}</span>
                      <span v-if="pioneerConversionScenario" class="font-medium">｜ MT账号 {{ pioneerLatestRequest?.targetAccountLabel }}</span>
                    </div>
                    <div v-else-if="pioneerApplyUiState === 'rejected'" class="text-xs font-semibold text-rose-600">
                      审核拒绝
                      <span class="text-gray-400 font-medium">｜</span>
                      驳回原因：<span class="text-gray-700 font-medium">{{ pioneerLatestRequest?.rejectReason || '-' }}</span>
                    </div>
                    <div v-else-if="pioneerApplyUiState === 'done'" class="text-xs font-semibold text-emerald-700">
                      转换已完成
                      <span class="text-gray-400 font-medium">｜</span>
                      完成时间 <span class="font-mono text-gray-700">{{ pioneerLatestRequest?.completedAt }}</span>
                      <span class="text-gray-400 font-medium">｜</span>
                      目标 MT 账户 <span class="text-gray-700">{{ pioneerLatestRequest?.targetAccountLabel }}</span>
                      <span class="text-gray-400 font-medium">｜</span>
                      入账金额 <span class="font-mono text-gray-700">{{ formatUsd4(pioneerLatestRequest?.amount) }}</span>
                    </div>
                    <div v-else-if="uiAchieved" class="text-xs font-semibold text-emerald-700">
                      已满足活动条件，可发起赠金转真实资金申请
                    </div>
                    <div v-else class="text-xs font-semibold text-gray-600">未达标，暂不可申请转真实资金</div>

                    <div v-if="pioneerApplyHint" class="mt-1 text-[11px] text-gray-500">{{ pioneerApplyHint }}</div>
                    <div v-if="pioneerApplyBlockReason" class="mt-1 text-[11px] text-rose-500">{{ pioneerApplyBlockReason }}</div>
                  </div>

                  <div class="flex items-center gap-2 flex-shrink-0">
                    <button
                      v-if="pioneerApplyUiState === 'rejected' && uiAchieved"
                      type="button"
                      class="h-8 px-3 rounded-md bg-[#d1a84f] hover:bg-[#b89241] text-white text-xs font-medium transition-colors"
                      @click="openApplyDrawer()"
                    >
                      重新申请
                    </button>
                    <button
                      v-else-if="uiAchieved && pioneerApplyUiState === ''"
                      type="button"
                      class="h-8 px-3 rounded-md bg-[#d1a84f] hover:bg-[#b89241] text-white text-xs font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      :disabled="!!pioneerApplyBlockReason"
                      @click="openApplyDrawer()"
                    >
                      申请转真实资金
                    </button>
                  </div>
                </div>
                <div v-if="pioneerConversionScenario" class="space-y-2 text-xs">
                  <div class="flex flex-wrap gap-x-4 gap-y-2 text-gray-600">
                    <span>演示客户：{{ pioneerConversionSummary?.customerName }}</span>
                    <span>可用赠金：<strong class="font-mono text-gray-800">{{ formatUsd4(pioneerConversionSummary?.availableCredit) }}</strong></span>
                    <span>申请冻结：<strong class="font-mono text-gray-800">{{ formatUsd4(pioneerConversionSummary?.frozenCredit) }}</strong></span>
                  </div>
                  <p class="text-gray-500">以下记录与后台「赠金转化申请」同步，切换场景不会删除历史或重置已完成的审核。</p>
                  <h3 class="font-semibold text-gray-800">申请记录</h3>
                  <ul class="divide-y divide-gray-100">
                    <li v-for="request in pioneerScenarioRequests" :key="request.id" class="py-3 space-y-2">
                      <div class="flex items-center justify-between gap-3 flex-wrap">
                        <span class="font-mono text-gray-700">{{ request.id }}</span>
                        <span :class="request.status === '审核拒绝' ? 'text-rose-600' : request.status === '已完成' ? 'text-emerald-700' : 'text-blue-600'">{{ request.status }}</span>
                      </div>
                      <dl class="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 text-gray-700">
                        <div><dt class="inline text-gray-500">申请金额：</dt><dd class="inline font-mono">{{ formatUsd4(request.amount) }}</dd></div>
                        <div><dt class="inline text-gray-500">MT账号：</dt><dd class="inline">{{ request.targetAccountLabel }}</dd></div>
                        <div><dt class="inline text-gray-500">申请时间：</dt><dd class="inline">{{ request.appliedAt }}</dd></div>
                        <div><dt class="inline text-gray-500">审核时间：</dt><dd class="inline">{{ request.reviewedAt || '待审核' }}</dd></div>
                      </dl>
                      <p v-if="request.rejectReason" class="text-rose-600 break-words">驳回原因：{{ request.rejectReason }}</p>
                    </li>
                  </ul>
                </div>
              </div>

              <div v-if="uiJoined && currentActivity.footerTip" class="bg-orange-50 border border-orange-200 text-orange-600 px-4 py-3 rounded-lg text-xs font-medium flex items-start gap-2">
                <i class="fa-solid fa-circle-info mt-0.5"></i>
                <span>{{ currentActivity.footerTip }}</span>
              </div>
            </div>
          </div>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex justify-between items-start">
            <div>
              <p class="text-sm text-gray-500 font-medium mb-2">MT余额 $</p>
              <p class="text-2xl font-bold text-gray-800 mb-2">1,239.20</p>
              <p class="text-xs text-gray-400">MT账号数 <span class="font-medium text-gray-600">2</span></p>
            </div>
            <div class="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-500">
              <i class="fa-solid fa-thumbs-up"></i>
            </div>
          </div>

          <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex justify-between items-start">
            <div>
              <p class="text-sm text-gray-500 font-medium mb-2">入 / 出金量 $</p>
              <p class="text-xl font-bold text-gray-800 mb-2">1,013.00 / <span class="text-gray-400">-0.00</span></p>
              <p class="text-xs text-gray-400">净入金 <span class="font-medium text-gray-600">$ 1,013.00</span></p>
            </div>
            <div class="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-500">
              <i class="fa-solid fa-file-invoice-dollar"></i>
            </div>
          </div>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div class="flex flex-col gap-6">
            <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex-1 flex flex-col justify-center">
              <p class="text-sm text-gray-500 font-medium mb-2">交易量 Lot / 盈亏 $</p>
              <p class="text-xl font-bold text-gray-800">0 / 0.00</p>
            </div>
            <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex-1 flex flex-col justify-center">
              <p class="text-sm text-gray-500 font-medium mb-2">持仓量 Lot / 浮动盈亏 $</p>
              <p class="text-xl font-bold text-gray-800">0 / 0.00</p>
            </div>
          </div>

          <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-6 lg:col-span-2 flex flex-col">
            <p class="text-sm text-gray-500 font-medium mb-6">胜率分析</p>
            <div class="flex-1 flex flex-col items-center justify-center">
              <div class="relative w-40 h-40 flex items-center justify-center mb-6">
                <canvas id="winRateChart"></canvas>
                <div class="absolute -left-16 top-1/2 -translate-y-1/2 text-xs text-gray-500 flex items-center">
                  亏损笔数: 0
                </div>
                <div class="absolute -right-16 top-1/2 -translate-y-1/2 text-xs text-gray-500 flex items-center">
                  获利笔数: 0
                </div>
              </div>
              <div class="flex items-center gap-6 mt-2">
                <div class="flex items-center gap-2"><span class="w-4 h-2 bg-orange-400 rounded-sm"></span><span class="text-xs text-gray-500">获利笔数</span></div>
                <div class="flex items-center gap-2"><span class="w-4 h-2 bg-gray-300 rounded-sm"></span><span class="text-xs text-gray-500">亏损笔数</span></div>
              </div>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex-1 flex flex-col min-h-[300px]">
          <p class="text-sm text-gray-500 font-medium mb-6">交易盈亏分析 ($)</p>
          <div class="flex-1 w-full relative">
            <canvas id="pnlChart"></canvas>
          </div>
          <div class="h-8 mt-4 bg-[#e8f0fe] rounded-full border border-[#c7d2fe] relative flex items-center">
            <div class="absolute left-0 w-4 h-full bg-white border border-gray-300 rounded-full shadow-sm cursor-pointer z-10 flex items-center justify-center"><i class="fa-solid fa-bars text-[8px] text-gray-400 transform rotate-90"></i></div>
            <div class="absolute right-0 w-4 h-full bg-white border border-gray-300 rounded-full shadow-sm cursor-pointer z-10 flex items-center justify-center"><i class="fa-solid fa-bars text-[8px] text-gray-400 transform rotate-90"></i></div>
            <div class="h-full bg-blue-100 w-full opacity-50"></div>
          </div>
        </div>
      </div>

      <div class="min-w-0 flex flex-col gap-6">
        <div class="bg-white rounded-xl shadow-sm border border-gray-100 px-5 py-4">
          <div class="flex items-start justify-between gap-4">
            <div class="min-w-0">
              <p class="text-sm text-gray-500 font-medium">活动信息</p>
              <div class="mt-3 space-y-2">
                <button
                  v-for="a in activityTabs"
                  :key="a.key"
                  type="button"
                  class="w-full flex items-center justify-between gap-3 px-3 py-2 rounded-md border text-xs transition-colors"
                  :class="activeActivityKey === a.key ? 'border-amber-200 bg-amber-50 text-amber-800' : 'border-gray-200 bg-white text-gray-700 hover:bg-gray-50'"
                  @click="activeActivityKey = a.key"
                >
                  <span class="min-w-0 truncate font-medium">{{ a.title }}</span>
                  <i class="fa-solid fa-chevron-right text-[10px] text-gray-400 flex-shrink-0"></i>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-xl shadow-sm border border-gray-100 px-5 py-4">
          <div class="flex justify-between items-center mb-2">
            <p class="text-sm text-gray-500 font-medium">通知公告</p>
            <a href="#" class="text-xs text-gray-400 hover:text-gray-600">查看更多 ></a>
          </div>
          <div class="flex justify-between items-center group cursor-pointer mt-1 py-2">
            <div class="flex items-center gap-2 min-w-0">
              <span class="w-1.5 h-1.5 bg-[#d1a84f] rounded-full flex-shrink-0"></span>
              <p class="text-sm text-gray-700 group-hover:text-[#d1a84f] transition-colors truncate">关于美国大选期间保证金调整通知</p>
            </div>
            <span class="text-xs text-gray-400 flex-shrink-0">11-04</span>
          </div>
          <div class="flex justify-between items-center group cursor-pointer mt-1 py-2">
            <div class="flex items-center gap-2 min-w-0">
              <span class="w-1.5 h-1.5 bg-gray-300 rounded-full flex-shrink-0"></span>
              <p class="text-sm text-gray-700 group-hover:text-[#d1a84f] transition-colors truncate">感恩节假期交易时间调整</p>
            </div>
            <span class="text-xs text-gray-400 flex-shrink-0">10-28</span>
          </div>
        </div>
      </div>
    </div>

    <el-dialog
      v-model="pioneerJoinDialogVisible"
      title="参与先锋一号 50,000 USD 活动"
      width="92%"
      :style="{ maxWidth: '560px' }"
      :close-on-click-modal="false"
      destroy-on-close
    >
      <div class="space-y-4">
        <div class="space-y-3 text-sm text-gray-700 leading-relaxed">
          <div class="flex items-start gap-2">
            <span class="mt-1 w-1.5 h-1.5 rounded-full bg-[#d1a84f] flex-shrink-0"></span>
            <span>请准备绑定 MT 账户、Star 账号、Star 盈利金额，并上传盈利证明材料。</span>
          </div>
        </div>

        <div class="space-y-4">
          <div class="space-y-2">
            <div class="text-sm text-gray-700 font-medium">
              绑定的 MT 账户 <span class="text-rose-500">*</span>
            </div>
              <el-select
                v-model="pioneerBindMtAccountId"
                size="large"
                class="w-full"
                :disabled="!hasAvailableMtAccounts"
                :placeholder="hasAvailableMtAccounts ? '请选择已有 MT 账户' : '暂无可用 MT 账户'"
              >
                <el-option v-for="opt in mtAccountOptions" :key="opt.value" :label="opt.label" :value="opt.value" />
              </el-select>
              <div v-if="!hasAvailableMtAccounts" class="text-xs text-rose-500">暂无可用 MT 账户，请先开通 MT 账户</div>
          </div>

          <div class="space-y-2">
            <div class="text-sm text-gray-700 font-medium">
              Star 账号 <span class="text-rose-500">*</span>
            </div>
            <input
              v-model="pioneerDemoAccount"
              class="w-full h-10 px-3 rounded-md border border-gray-200 bg-white text-sm outline-none focus:border-[#d1a84f]"
              placeholder="请输入 Star 账号"
              type="text"
            />
          </div>

          <div class="space-y-2">
            <div class="text-sm text-gray-700 font-medium">
              Star 盈利金额 <span class="text-rose-500">*</span>
            </div>
            <input
              v-model="pioneerStarProfitAmount"
              class="w-full h-10 px-3 rounded-md border border-gray-200 bg-white text-sm outline-none focus:border-[#d1a84f]"
              placeholder="请输入 Star 盈利金额"
              type="number"
              min="0"
              step="0.01"
            />
          </div>

          <div class="space-y-2">
            <div class="text-sm text-gray-700 font-medium">
              上传盈利证明材料 <span class="text-rose-500">*</span>
            </div>
            <div class="flex items-center gap-3 flex-wrap">
              <label class="inline-flex items-center gap-2 h-10 px-4 rounded-md border border-gray-200 text-gray-700 hover:bg-gray-50 cursor-pointer">
                <i class="fa-solid fa-upload text-xs text-gray-500"></i>
                <span class="text-sm">选择文件</span>
                <input class="hidden" type="file" accept="image/*" @change="onPioneerScreenshotChange" />
              </label>
              <div class="text-sm text-gray-500 min-w-0">
                <span v-if="pioneerScreenshotName" class="font-mono truncate inline-block max-w-[320px]">{{ pioneerScreenshotName }}</span>
                <span v-else>未选择文件</span>
              </div>
            </div>
          </div>
        </div>

        <div v-if="pioneerJoinError" class="text-xs text-rose-500">{{ pioneerJoinError }}</div>
      </div>
      <template #footer>
        <div class="flex items-center justify-end gap-2">
          <button
            type="button"
            class="h-9 px-4 rounded-md border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors"
            @click="pioneerJoinDialogVisible = false"
          >
            取消
          </button>
          <button
            type="button"
            class="h-9 px-4 rounded-md text-white bg-rose-500 hover:bg-rose-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            :disabled="!hasAvailableMtAccounts"
            @click="confirmPioneerJoin"
          >
            确认参与
          </button>
        </div>
      </template>
    </el-dialog>

    <el-dialog v-model="pioneerRuleDialog.open" title="先锋一号 50,000 USD 活动要求" width="92%" :style="{ maxWidth: '720px' }" destroy-on-close>
      <div class="space-y-3 text-sm text-gray-700 leading-relaxed">
        <div class="flex items-start gap-2">
          <span class="mt-1 w-1.5 h-1.5 rounded-full bg-[#d1a84f] flex-shrink-0"></span>
          <span>完成 Star 交易并提交活动参与资料，后台审核通过后方可参与。</span>
        </div>
        <div class="flex items-start gap-2">
          <span class="mt-1 w-1.5 h-1.5 rounded-full bg-[#d1a84f] flex-shrink-0"></span>
          <span>奖励根据活动期间累计净入金自动分档释放；累计净入金提升后可多次获得增量释放。</span>
        </div>
        <div class="flex items-start gap-2">
          <span class="mt-1 w-1.5 h-1.5 rounded-full bg-[#d1a84f] flex-shrink-0"></span>
          <span>自动释放的奖励先以信用金发放至绑定 MT 账户；信用金不能直接出金或转账。</span>
        </div>
        <div class="flex items-start gap-2">
          <span class="mt-1 w-1.5 h-1.5 rounded-full bg-[#d1a84f] flex-shrink-0"></span>
          <span>完成活动达标交易手数后可申请转为真实资金；申请时会重新校验当前累计净入金，并需客服与风控审核。</span>
        </div>
        <div class="flex items-start gap-2">
          <span class="mt-1 w-1.5 h-1.5 rounded-full bg-[#d1a84f] flex-shrink-0"></span>
          <span>疑似对冲及其他违规订单不计入活动达标交易手数。</span>
        </div>
      </div>
      <template #footer>
        <div class="flex items-center justify-end">
          <button type="button" class="h-9 px-4 rounded-md text-white bg-rose-500 hover:bg-rose-600 transition-colors" @click="pioneerRuleDialog.open = false">我知道了</button>
        </div>
      </template>
    </el-dialog>

    <el-drawer v-model="pioneerApplyDrawerOpen" :with-header="false" size="520px">
      <div class="h-full flex flex-col">
        <div class="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
          <div class="text-sm font-bold text-gray-800">申请转真实资金</div>
          <button class="text-gray-400 hover:text-gray-600" type="button" @click="pioneerApplyDrawerOpen = false">
            <i class="fa-solid fa-xmark"></i>
          </button>
        </div>
        <div class="flex-1 overflow-y-auto px-5 py-4 space-y-4">
          <div class="space-y-2">
            <div class="text-xs text-gray-500">可转换信用金（一次性全部转换）</div>
            <div class="h-9 px-3 rounded-md border border-gray-200 bg-gray-50 text-xs text-gray-700 flex items-center font-mono">
              {{ formatUsd4(pioneerViewCreditSummary?.convertibleCredit) }}
            </div>
          </div>

          <div class="space-y-2">
            <div class="text-xs text-gray-500">目标 MT 账户</div>
            <el-select v-model="pioneerApplyForm.targetAccountId" placeholder="选择目标账户" class="w-full" size="small">
              <el-option v-for="o in pioneerAccountOptions" :key="o.value" :label="o.label" :value="o.value" />
            </el-select>
          </div>

          <div class="space-y-2">
            <div class="text-xs text-gray-500">邮箱验证码</div>
            <div class="flex items-center gap-2">
              <el-input v-model="pioneerApplyForm.otp" placeholder="请输入验证码" size="small" class="flex-1" />
              <button
                class="h-8 px-3 rounded-md border border-gray-200 bg-white text-gray-700 text-xs hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                type="button"
                :disabled="pioneerOtpCooldownLeft > 0"
                @click="handleSendPioneerOtp"
              >
                {{ pioneerOtpCooldownLeft > 0 ? `${pioneerOtpCooldownLeft}s` : '发送验证码' }}
              </button>
            </div>
            <div v-if="pioneerOtpTip" class="text-[11px] text-gray-500">{{ pioneerOtpTip }}</div>
          </div>

          <div class="space-y-2">
            <label class="flex items-start gap-2 text-xs text-gray-600">
              <input v-model="pioneerApplyForm.agreed" type="checkbox" class="mt-0.5" />
              <span>我已确认：不支持部分转换，本次提交将一次性转换全部可转换信用金；同一活动仅允许存在一笔处理中申请。</span>
            </label>
            <div v-if="pioneerApplySubmitError" class="text-xs text-rose-500">{{ pioneerApplySubmitError }}</div>
          </div>
        </div>
        <div class="px-5 py-4 border-t border-gray-100 flex items-center justify-end gap-3">
          <button class="h-9 px-4 rounded-md border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors text-sm font-medium" type="button" @click="pioneerApplyDrawerOpen = false">
            取消
          </button>
          <button class="h-9 px-4 rounded-md bg-[#d1a84f] hover:bg-[#b89241] text-white transition-colors text-sm font-medium" type="button" @click="handleSubmitPioneerApply">
            确认提交
          </button>
        </div>
      </div>
    </el-drawer>

  </div>
</template>

<script setup>
import { computed, nextTick, onMounted, onUnmounted, reactive, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getParticipation, isJoined, markJoined, getDemoMode, setDemoMode } from '@/store/activityParticipationDemo'
import { getSessionUser } from '@/store/passwordSecurityDemo'
import { getMtAccountById, getMyAvailableMtAccounts, getMtStatusLabel, getMtTypeLabel } from '@/store/mtAccountDemo'
import {
  creditConversionState,
  getAccountsForSelect,
  getCreditSummary,
  getRequestsByCustomerActivity,
  getApplyBlockReason,
  hasPendingRequest,
  submitConversionRequest,
  isPioneerConversionScenario,
  getPioneerScenarioCustomerId,
  ensurePioneerConversionScenario,
  sendEmailOtp,
  verifyEmailOtp,
} from '@/store/creditConversionDemo'

const homeScrollRef = ref(null)
const route = useRoute()
const router = useRouter()

const formatInt = (n) => {
  const v = Number(n || 0)
  return v.toLocaleString('en-US')
}

const formatMoney = (n) => {
  const v = Number(n || 0)
  return v.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

const formatLots = (n) => {
  const v = Number(n || 0)
  return v.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

const formatUsd4 = (n) => {
  const v = Number(n || 0)
  const val = Number.isFinite(v) ? v : 0
  return `${val.toLocaleString('en-US', { minimumFractionDigits: 4, maximumFractionDigits: 4 })} USD`
}

const percent = (value, target) => {
  const v = Number(value || 0)
  const t = Number(target || 0)
  if (!t) return 0
  const pct = (v / t) * 100
  return Math.min(100, Math.max(0, Math.round(pct)))
}

const homeActivities = ref([
  {
    key: 'free-card',
    tabLabel: '星际起航免费开卡',
    title: '星际起航免费开卡',
    mainCopy: '新用户开户即送100USD赠金',
    conditionText: `单客户达标条件：净入金 $${formatMoney(1000)} + 交易 ${formatLots(10)} Lot`,
    timeRange: '2026-09-01 ~ 2026-09-28',
    remainingDays: 13,
    stats: { participated: 126, achieved: 43, nearAchieved: 56 },
    footerTip: '达标口径：按客户维度判断；统计从客户参与成功时间起算。'
  },
  {
    key: 'pioneer-one-50000',
    tabLabel: '先锋一号 50,000 USD',
    title: '先锋一号 50,000 USD 活动',
    mainCopy: '完成净入金与交易手数目标，可按档位释放活动盈利',
    conditionText: '',
    timeRange: '2026-09-01 ~ 2026-10-31',
    remainingDays: 45,
    stats: { participated: 68, achieved: 19, nearAchieved: 24 },
    footerTip: ''
  }
])

const pioneerRuleDialog = reactive({ open: false })
const pioneerBindMtAccountId = ref('')
const pioneerStarProfitAmount = ref('')
const pioneerJoinError = ref('')

const activityTabs = computed(() => {
  const list = Array.isArray(homeActivities.value) ? homeActivities.value : []
  return [...list]
})

const findDefaultActivityKey = () => {
  const list = Array.isArray(activityTabs.value) ? activityTabs.value : []
  const firstJoined = list.find((a) => isJoined(a.key))
  return firstJoined?.key || list[0]?.key || ''
}

const activeActivityKey = ref(findDefaultActivityKey())

watch(
  () => activityTabs.value.map((t) => t.key).join('|'),
  () => {
    const list = Array.isArray(activityTabs.value) ? activityTabs.value : []
    const exists = list.some((t) => t.key === activeActivityKey.value)
    if (!exists) activeActivityKey.value = findDefaultActivityKey()
  }
)

const currentActivity = computed(() => {
  const list = Array.isArray(homeActivities.value) ? homeActivities.value : []
  return list.find((a) => a.key === activeActivityKey.value) || list[0]
})

const currentParticipation = computed(() => getParticipation(currentActivity.value?.key) || { status: 'not_joined' })
const currentParticipationStatus = computed(() => String(currentParticipation.value?.status || 'not_joined'))
const currentJoined = computed(() => isJoined(currentActivity.value?.key))

const pioneerDemoMode = computed({
  get: () => getDemoMode('pioneer-one-50000'),
  set: (v) => {
    if (isPioneerConversionScenario(v)) {
      const result = ensurePioneerConversionScenario(v)
      if (!result.ok) {
        window.alert(result.message)
        return
      }
    }
    setDemoMode('pioneer-one-50000', v)
  },
})
const pioneerConversionScenario = computed(() => isPioneerConversionScenario(pioneerDemoMode.value))

const uiJoined = computed(() => {
  const key = String(currentActivity.value?.key || '')
  if (key === 'pioneer-one-50000') return pioneerDemoMode.value !== 'not_joined'
  return currentJoined.value
})

const uiAchieved = computed(() => {
  const key = String(currentActivity.value?.key || '')
  if (key === 'pioneer-one-50000') return pioneerDemoMode.value === 'joined_full' || pioneerConversionScenario.value
  return false
})

const statusText = (status) => {
  if (status === 'joined') return '已参加活动'
  if (status === 'ended') return '已结束活动'
  return '未参加活动'
}

const primaryActionText = (activity) => {
  const key = String(activity?.key || '')
  const joined = key === 'pioneer-one-50000' ? getDemoMode(key) !== 'not_joined' : isJoined(key)
  if (joined) return '查看详情'
  return '参与活动'
}

const HOME_STATE_KEY = 'crm_home_state_v1'

const saveHomeState = () => {
  try {
    const el = homeScrollRef.value
    const payload = {
      scrollTop: Number(el?.scrollTop || 0),
      activeActivityKey: String(activeActivityKey.value || '')
    }
    sessionStorage.setItem(HOME_STATE_KEY, JSON.stringify(payload))
  } catch {}
}

const restoreHomeState = async () => {
  try {
    const raw = sessionStorage.getItem(HOME_STATE_KEY)
    if (!raw) return false
    const data = JSON.parse(raw)
    if (data?.activeActivityKey) activeActivityKey.value = String(data.activeActivityKey)
    await nextTick()
    const el = homeScrollRef.value
    if (el && Number.isFinite(Number(data?.scrollTop))) el.scrollTop = Number(data.scrollTop)
    sessionStorage.removeItem(HOME_STATE_KEY)
    return true
  } catch {
    return false
  }
}

const activityDetailPath = (activity) => {
  const key = String(activity?.key || '')
  if (key === 'free-card') return '/activity/bonus-detail'
  return ''
}

const handlePrimaryAction = (key) => {
  const list = Array.isArray(homeActivities.value) ? homeActivities.value : []
  const activity = list.find((a) => a.key === key) || null
  if (!activity) return

  const uiJoined = activity.key === 'pioneer-one-50000' ? getDemoMode(activity.key) !== 'not_joined' : isJoined(activity.key)

  if (!uiJoined) {
    if (activity.key === 'pioneer-one-50000') {
      openPioneerJoinDialog()
      return
    }
    markJoined(activity.key, {
      progresses: {
        netDeposit: { value: 0, target: 1000 },
        tradeLots: { value: 0, target: 10 },
      },
    })
    window.alert('参与申请已提交')
    return
  }

  const path = activityDetailPath(activity)
  if (!path) return
  saveHomeState()
  router.push({ path })
}

const handleViewActivities = () => {
  window.alert('查看活动（演示）')
}

const pioneerActivity = computed(() => {
  const list = Array.isArray(homeActivities.value) ? homeActivities.value : []
  return list.find((a) => a.key === 'pioneer-one-50000') || null
})

const pioneerJoined = computed(() => {
  return getDemoMode(pioneerActivity.value?.key) !== 'not_joined'
})

const handleJoinActivity = () => {
  if (pioneerJoined.value) return
  activeActivityKey.value = 'pioneer-one-50000'
  handlePrimaryAction('pioneer-one-50000')
}

const pioneerJoinDialogVisible = ref(false)
const pioneerDemoAccount = ref('')
const pioneerScreenshotUrl = ref('')
const pioneerScreenshotName = ref('')

const sessionUser = computed(() => getSessionUser())
const myMtAccounts = computed(() => getMyAvailableMtAccounts(sessionUser.value?.user_id))
const mtAccountOptions = computed(() =>
  myMtAccounts.value.map((a) => ({
    value: a.id,
    label: `${a.mtAccount} · ${getMtTypeLabel(a.mtType)} · ${getMtStatusLabel(a.status)}`,
  }))
)
const selectedMtAccount = computed(() => getMtAccountById(pioneerBindMtAccountId.value))
const hasAvailableMtAccounts = computed(() => mtAccountOptions.value.length > 0)

const pioneerActivityId = 'pioneer-one-50000'

const pioneerCurrentCustomerId = computed(() => {
  const userId = String(sessionUser.value?.user_id || '')
  const mapped = {
    u_agent_01: 'CUST-lixue',
    u_direct_01: 'CUST-wangjianguo',
    u_other_01: 'CUST-chendawen',
  }[userId]
  return String(mapped || '')
})

const pioneerFallbackCustomerId = computed(() => {
  const key = pioneerActivityId
  const rows = Array.isArray(creditConversionState.customerActivityCredits) ? creditConversionState.customerActivityCredits : []
  const matches = rows.filter((r) => r.activityId === key && !r.accountAbnormal && !r.demoScenario)
  const noReq = (cid) => !creditConversionState.conversionRequests.some((r) => r.customerId === cid && r.activityId === key)
  const noPending = (cid) =>
    !creditConversionState.conversionRequests.some((r) => r.customerId === cid && r.activityId === key && r.status === '审核中')
  const preferred = matches.find((r) => noReq(r.customerId) && noPending(r.customerId)) || matches.find((r) => noPending(r.customerId)) || matches[0]
  return String(preferred?.customerId || '')
})

const pioneerEffectiveCustomerId = computed(() => pioneerConversionScenario.value
  ? getPioneerScenarioCustomerId(pioneerDemoMode.value)
  : String(pioneerCurrentCustomerId.value || pioneerFallbackCustomerId.value || ''))
const pioneerScenarioRequests = computed(() => pioneerConversionScenario.value
  ? getRequestsByCustomerActivity({ customerId: pioneerEffectiveCustomerId.value, activityId: pioneerActivityId })
  : [])

const PIONEER_HOME_APPLY_KEY = 'crm_pioneer_home_apply_state_v1'

const pioneerHomeApplyStorageKey = computed(() => `${PIONEER_HOME_APPLY_KEY}:${pioneerActivityId}:${pioneerEffectiveCustomerId.value}`)

const pioneerHomeApplyRequest = ref(null)

const loadPioneerHomeApplyState = () => {
  try {
    const key = pioneerHomeApplyStorageKey.value
    const raw = localStorage.getItem(key)
    if (!raw) return null
    const parsed = JSON.parse(raw)
    if (!parsed || typeof parsed !== 'object') return null
    return parsed
  } catch {
    return null
  }
}

const persistPioneerHomeApplyState = () => {
  try {
    const key = pioneerHomeApplyStorageKey.value
    if (!pioneerHomeApplyRequest.value) {
      localStorage.removeItem(key)
      return
    }
    localStorage.setItem(key, JSON.stringify(pioneerHomeApplyRequest.value))
  } catch {}
}

const resetPioneerHomeApplyState = () => {
  pioneerHomeApplyRequest.value = null
  persistPioneerHomeApplyState()
}

watch(
  () => pioneerDemoMode.value,
  (mode, previousMode) => {
    if (isPioneerConversionScenario(mode) || isPioneerConversionScenario(previousMode)) return
    resetPioneerHomeApplyState()
  }
)

watch(
  () => pioneerEffectiveCustomerId.value,
  () => {
    pioneerHomeApplyRequest.value = loadPioneerHomeApplyState()
  },
  { immediate: true }
)

const pioneerConversionSummary = computed(() => getCreditSummary({ customerId: pioneerEffectiveCustomerId.value, activityId: pioneerActivityId }))

const pioneerViewCreditSummary = computed(() => {
  if (!uiJoined.value) return null
  if (pioneerDemoMode.value === 'joined_partial') {
    return {
      issuedCredit: 300,
      consumedCredit: 80,
      occupiedNow: 60,
      convertibleCredit: 0,
      convertedCredit: 0,
    }
  }
  if (pioneerDemoMode.value === 'joined_full' && !pioneerHomeApplyRequest.value) {
    const rows = Array.isArray(creditConversionState.customerActivityCredits) ? creditConversionState.customerActivityCredits : []
    const row = rows.find((r) => r.customerId === pioneerEffectiveCustomerId.value && r.activityId === pioneerActivityId) || null
    if (row) {
      const issuedCredit = Number(row.issuedCredit || 0)
      const consumedCredit = Number(row.consumedCredit || 0)
      const occupiedCredit = Number(row.occupiedCredit || 0)
      const convertedCredit = Number(row.convertedCredit || 0)
      const available = Math.max(0, issuedCredit - consumedCredit - occupiedCredit - convertedCredit)
      const convertible = row.achieved && !row.accountAbnormal ? available : 0
      return {
        ...row,
        availableCredit: available,
        convertibleCredit: convertible,
        occupiedNow: occupiedCredit,
      }
    }
  }
  return (
    pioneerConversionSummary.value || {
      issuedCredit: 5000,
      consumedCredit: 500,
      occupiedNow: 0,
      convertibleCredit: 4500,
      convertedCredit: 0,
    }
  )
})

const pioneerApplyBlockReason = computed(() => {
  if (String(currentActivity.value?.key || '') !== pioneerActivityId) return ''
  if (!uiJoined.value) return ''
  if (pioneerConversionScenario.value) {
    const context = { customerId: pioneerEffectiveCustomerId.value, activityId: pioneerActivityId }
    if (hasPendingRequest(context)) return '存在处理中申请，暂不可重复提交'
    return getApplyBlockReason(context)
  }
  if (pioneerDemoMode.value !== 'joined_full') return ''
  const s = pioneerViewCreditSummary.value
  if (!s) return '活动信息不存在'
  if (pioneerHomeApplyRequest.value) return '存在处理中申请，暂不可重复提交'
  if (s.accountAbnormal) return '账户异常，暂不可申请'
  if (!s.achieved) return '活动未达标，暂不可申请'
  if (Number(s.convertibleCredit || 0) <= 0) return '可转换金额为 0，暂不可申请'
  if (Number(s.occupiedCredit || 0) > 0) return '赠金被占用，暂不可申请'
  return ''
})

const pioneerLatestRequest = computed(() => {
  if (String(currentActivity.value?.key || '') !== pioneerActivityId) return null
  if (!uiJoined.value) return null
  if (pioneerConversionScenario.value) return pioneerScenarioRequests.value[0] || null
  if (pioneerDemoMode.value !== 'joined_full') return null
  return pioneerHomeApplyRequest.value || null
})

const pioneerApplyUiState = computed(() => {
  if (String(currentActivity.value?.key || '') !== pioneerActivityId) return ''
  if (!uiJoined.value) return ''
  if (pioneerDemoMode.value !== 'joined_full' && !pioneerConversionScenario.value) return ''
  if (pioneerConversionScenario.value && ['审核中', '审核通过'].includes(pioneerLatestRequest.value?.status)) return 'pending'
  const req = pioneerHomeApplyRequest.value
  if (!pioneerConversionScenario.value && req?.status === '审核中') return 'pending'
  const latest = pioneerLatestRequest.value
  if (!latest) return ''
  if (latest.status === '审核拒绝') return 'rejected'
  if (latest.status === '已完成') return 'done'
  return ''
})

const pioneerApplyHint = computed(() => {
  if (String(currentActivity.value?.key || '') !== pioneerActivityId) return ''
  if (!uiJoined.value) return ''
  if (pioneerDemoMode.value === 'joined_partial') {
    return `未达标原因：净入金还差 ${formatUsd4(uiNetDepositGap.value)}；交易手数还差 ${formatLots(uiTradeLotsGap.value)} Lot`
  }
  return ''
})

const pioneerApplyDrawerOpen = ref(false)
const pioneerApplyForm = reactive({
  targetAccountId: '',
  otp: '',
  agreed: false,
})
const pioneerApplySubmitError = ref('')
const pioneerOtpTip = ref('')
const pioneerOtpCooldownLeft = ref(0)
let pioneerOtpTimer = null

const tickPioneerOtp = () => {
  const left = Math.max(0, Math.ceil((creditConversionState.emailOtp.cooldownUntil - Date.now()) / 1000))
  pioneerOtpCooldownLeft.value = left
}

const pioneerAccountOptions = computed(() => getAccountsForSelect().map((a) => ({ value: a.id, label: a.label })))

const openApplyDrawer = () => {
  if (String(currentActivity.value?.key || '') !== pioneerActivityId) return
  if (!uiAchieved.value) return
  if (pioneerApplyUiState.value === 'pending' || pioneerApplyUiState.value === 'done') return
  if (pioneerApplyBlockReason.value) return
  pioneerApplyForm.targetAccountId = ''
  pioneerApplyForm.otp = ''
  pioneerApplyForm.agreed = false
  pioneerApplySubmitError.value = ''
  pioneerOtpTip.value = ''
  pioneerApplyDrawerOpen.value = true
}

const handleSendPioneerOtp = () => {
  const res = sendEmailOtp()
  if (!res.ok) {
    pioneerOtpTip.value = res.message
    tickPioneerOtp()
    return
  }
  pioneerOtpTip.value = `演示码：${res.code}（有效期 100 分钟）`
  tickPioneerOtp()
}

const handleSubmitPioneerApply = () => {
  pioneerApplySubmitError.value = ''
  if (pioneerApplyBlockReason.value) {
    pioneerApplySubmitError.value = pioneerApplyBlockReason.value
    return
  }
  if (!pioneerApplyForm.targetAccountId) {
    pioneerApplySubmitError.value = '请选择目标 MT 账户'
    return
  }
  if (!pioneerApplyForm.agreed) {
    pioneerApplySubmitError.value = '请确认一次性转换声明'
    return
  }
  const otpRes = verifyEmailOtp(pioneerApplyForm.otp)
  if (!otpRes.ok) {
    pioneerApplySubmitError.value = otpRes.message
    return
  }
  if (pioneerConversionScenario.value) {
    const result = submitConversionRequest({
      customerId: pioneerEffectiveCustomerId.value,
      activityId: pioneerActivityId,
      targetAccountId: pioneerApplyForm.targetAccountId,
    })
    if (!result.ok) {
      pioneerApplySubmitError.value = result.message
      return
    }
    pioneerApplyDrawerOpen.value = false
    return
  }
  const now = new Date().toISOString().slice(0, 19).replace('T', ' ')
  const target = pioneerAccountOptions.value.find((o) => o.value === pioneerApplyForm.targetAccountId) || null
  pioneerHomeApplyRequest.value = {
    status: '审核中',
    amount: Number(pioneerViewCreditSummary.value?.convertibleCredit || 0),
    appliedAt: now,
    targetAccountId: pioneerApplyForm.targetAccountId,
    targetAccountLabel: target?.label || '',
  }
  persistPioneerHomeApplyState()
  pioneerApplyDrawerOpen.value = false
}

const openPioneerJoinDialog = () => {
  pioneerBindMtAccountId.value = ''
  pioneerDemoAccount.value = ''
  pioneerStarProfitAmount.value = ''
  pioneerScreenshotUrl.value = ''
  pioneerScreenshotName.value = ''
  pioneerJoinError.value = ''
  pioneerJoinDialogVisible.value = true
}

const onPioneerScreenshotChange = (e) => {
  const input = e.target
  const file = input?.files?.[0]
  if (!file) {
    pioneerScreenshotUrl.value = ''
    pioneerScreenshotName.value = ''
    return
  }
  pioneerScreenshotName.value = file.name
  pioneerScreenshotUrl.value = URL.createObjectURL(file)
}

const confirmPioneerJoin = () => {
  pioneerJoinError.value = ''
  if (!hasAvailableMtAccounts.value) {
    pioneerJoinError.value = '暂无可用 MT 账户，请先开通 MT 账户'
    return
  }
  if (!pioneerBindMtAccountId.value) {
    pioneerJoinError.value = '请选择绑定的 MT 账户'
    return
  }
  const mtRow = selectedMtAccount.value
  if (!mtRow || mtRow.status !== 'normal') {
    pioneerJoinError.value = '绑定的 MT 账户不可用'
    return
  }
  if (!pioneerDemoAccount.value.trim()) {
    pioneerJoinError.value = '请输入 Star 账号'
    return
  }
  const profit = Number(pioneerStarProfitAmount.value)
  if (!Number.isFinite(profit) || profit <= 0) {
    pioneerJoinError.value = '请输入 Star 盈利金额'
    return
  }
  if (!pioneerScreenshotUrl.value) {
    pioneerJoinError.value = '请上传盈利证明材料'
    return
  }
  pioneerJoinDialogVisible.value = false
  markJoined('pioneer-one-50000', {
    progresses: {
      netDeposit: { value: 0, target: 50000 },
      tradeLots: { value: 0, target: 500 },
    },
    releaseTierPct: 0,
    releasedAmount: 0,
    bindMtAccountId: mtRow.id,
    bindMtAccount: mtRow.mtAccount,
    bindMtType: mtRow.mtType,
  })
  window.alert('参与申请已提交')
}

const currentProgresses = computed(() => {
  const key = String(currentActivity.value?.key || '')
  const p = currentParticipation.value?.progresses || {}
  if (key === 'pioneer-one-50000') {
    const mode = pioneerDemoMode.value
    const netTarget = Number(p.netDeposit?.target ?? 50000)
    const lotsTarget = Number(p.tradeLots?.target ?? 500)
    const netValue =
      mode === 'joined_partial' ? 8200 : uiAchieved.value ? netTarget : Number(p.netDeposit?.value ?? 0)
    const lotsValue =
      mode === 'joined_partial' ? 98.75 : uiAchieved.value ? lotsTarget : Number(p.tradeLots?.value ?? 0)
    return [
      { key: 'net-deposit', label: '活动净入金', icon: 'fa-solid fa-dollar-sign', color: 'emerald', value: netValue, target: netTarget, format: 'money' },
      { key: 'trade-lots', label: '活动达标交易手数', icon: 'fa-solid fa-chart-line', color: uiAchieved.value ? 'emerald' : 'blue', value: lotsValue, target: lotsTarget, format: 'lots' },
    ]
  }
  return [
    { key: 'net-deposit', label: '活动净入金', icon: 'fa-solid fa-dollar-sign', color: 'emerald', value: p.netDeposit?.value ?? 0, target: p.netDeposit?.target ?? 1000, format: 'money' },
    { key: 'trade-lots', label: '活动达标交易手数', icon: 'fa-solid fa-chart-line', color: 'blue', value: p.tradeLots?.value ?? 0, target: p.tradeLots?.target ?? 10, format: 'lots' },
  ]
})

const uiReleaseTierPct = computed(() => {
  if (String(currentActivity.value?.key || '') !== 'pioneer-one-50000') return 0
  if (!uiJoined.value) return 0
  if (pioneerConversionScenario.value) return 100
  const ratio = pioneerDemoMode.value === 'joined_partial' ? 0.1 : Number(currentParticipation.value?.releaseTierPct || 0)
  return Math.round(ratio * 100)
})

const uiReleasedAmount = computed(() => {
  if (String(currentActivity.value?.key || '') !== 'pioneer-one-50000') return 0
  if (!uiJoined.value) return 0
  if (pioneerConversionScenario.value) return Number(pioneerConversionSummary.value?.issuedCredit || 0)
  if (pioneerDemoMode.value === 'joined_partial') return 0
  return Number(currentParticipation.value?.releasedAmount || 0)
})

const uiNetDepositGap = computed(() => {
  if (String(currentActivity.value?.key || '') !== 'pioneer-one-50000') return 0
  const rows = currentProgresses.value
  const net = rows.find((r) => r.key === 'net-deposit')
  if (!net) return 0
  return Math.max(0, Number(net.target || 0) - Number(net.value || 0))
})

const uiTradeLotsGap = computed(() => {
  if (String(currentActivity.value?.key || '') !== 'pioneer-one-50000') return 0
  const rows = currentProgresses.value
  const lots = rows.find((r) => r.key === 'trade-lots')
  if (!lots) return 0
  return Math.max(0, Number(lots.target || 0) - Number(lots.value || 0))
})

const scrollToTop = () => {
  const el = homeScrollRef.value
  if (!el) return
  el.scrollTop = 0
  el.scrollLeft = 0
}

watch(
  () => route.query.join,
  (value) => {
    const join = Array.isArray(value) ? value[0] : value
    if (join !== 'pioneer-one-50000') return
    handleJoinActivity()
  },
  { immediate: true }
)

onMounted(async () => {
  if (!pioneerOtpTimer) {
    pioneerOtpTimer = setInterval(tickPioneerOtp, 500)
    tickPioneerOtp()
  }
  const restored = await restoreHomeState()
  if (restored) return
  await nextTick()
  if (route.query.join) {
    scrollToTop()
    requestAnimationFrame(scrollToTop)
    setTimeout(scrollToTop, 50)
  }
})

onUnmounted(() => {
  if (pioneerOtpTimer) clearInterval(pioneerOtpTimer)
})
</script>

<style scoped>
.custom-scrollbar::-webkit-scrollbar { width: 6px; height: 6px; }
.custom-scrollbar::-webkit-scrollbar-thumb { background: #e5e7eb; border-radius: 4px; }
.custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
</style>
