<template>
  <div class="flex h-full bg-mainBg overflow-hidden w-full">
    <div class="flex-1 flex flex-col min-w-0 bg-gray-50 overflow-hidden p-4 custom-scrollbar overflow-y-auto w-full">
      <main class="flex-1 overflow-y-auto p-4 md:p-6 bg-mainBg">
        <div class="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div class="px-5 pt-4">
            <el-tabs v-model="activeTab">
              <el-tab-pane label="活动审核" name="activity" />
              <el-tab-pane label="赠金转化申请" name="conversion" />
            </el-tabs>
          </div>

          <div v-if="activeTab === 'activity'" class="p-5 space-y-4">
            <section class="rounded-xl border border-gray-200 p-5">
              <div class="text-sm font-semibold text-gray-700 mb-4">筛选</div>
              <div class="flex flex-wrap items-end gap-4 text-xs">
                <div class="flex items-center gap-2">
                  <span class="text-gray-500">客户姓名:</span>
                  <el-input v-model="form.customerName" placeholder="请输入客户姓名" clearable class="w-40" size="small" />
                </div>
                <div class="flex items-center gap-2">
                  <span class="text-gray-500">客户邮箱:</span>
                  <el-input v-model="form.customerEmail" placeholder="请输入客户邮箱" clearable class="w-56" size="small" />
                </div>
                <div class="flex items-center gap-2">
                  <span class="text-gray-500">申请活动:</span>
                  <el-select v-model="form.activityName" placeholder="全部" clearable class="w-72" size="small">
                    <el-option v-for="o in activityOptions" :key="o" :label="o" :value="o" />
                  </el-select>
                </div>
                <div class="flex items-center gap-2">
                  <span class="text-gray-500">审核状态:</span>
                  <el-select v-model="form.auditStatus" placeholder="全部" clearable class="w-28" size="small">
                    <el-option v-for="o in auditStatusOptions" :key="o" :label="o" :value="o" />
                  </el-select>
                </div>
                <button class="bg-[#d1a84f] hover:bg-[#b89241] text-white px-4 py-1.5 rounded text-xs font-medium transition-colors" type="button" @click="handleSearch">
                  搜索
                </button>
                <button class="bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 px-4 py-1.5 rounded text-xs font-medium transition-colors" type="button" @click="handleReset">
                  重置
                </button>
              </div>
            </section>

            <DataTable :data="pagedRows" :total="filteredRows.length" v-model:page="page" v-model:limit="limit">
              <el-table-column label="客户姓名" min-width="120" fixed="left">
                <template #default="{ row }">
                  <span class="font-medium text-gray-800">{{ row.customerName }}</span>
                </template>
              </el-table-column>
              <el-table-column label="客户邮箱" min-width="210">
                <template #default="{ row }">
                  <span class="text-gray-600">{{ row.customerEmail }}</span>
                </template>
              </el-table-column>
              <el-table-column label="上级信息" min-width="220">
                <template #default="{ row }">
                  <div class="flex flex-col gap-0.5">
                    <span class="text-gray-700">{{ row.uplineName || '-' }}</span>
                    <span class="text-[11px] text-gray-400">{{ row.uplineContact || '-' }}</span>
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="注册时间" min-width="160">
                <template #default="{ row }">
                  <span class="font-mono text-gray-600">{{ row.registeredAt }}</span>
                </template>
              </el-table-column>
              <el-table-column label="申请活动" min-width="220">
                <template #default="{ row }">
                  <span class="text-gray-700">{{ row.activityName }}</span>
                </template>
              </el-table-column>
              <el-table-column label="申请时间" min-width="160">
                <template #default="{ row }">
                  <span class="font-mono text-gray-600">{{ row.appliedAt }}</span>
                </template>
              </el-table-column>
              <el-table-column label="审核状态" min-width="120">
                <template #default="{ row }">
                  <span class="inline-flex items-center gap-2">
                    <span :class="['w-2 h-2 rounded-full', auditDotClass(row.auditStatus)]"></span>
                    <span :class="auditTextClass(row.auditStatus)">{{ row.auditStatus }}</span>
                  </span>
                </template>
              </el-table-column>
              <el-table-column label="拒绝原因" min-width="180">
                <template #default="{ row }">
                  <span class="text-gray-600">{{ row.rejectReason || '-' }}</span>
                </template>
              </el-table-column>
              <el-table-column label="操作" min-width="140" fixed="right">
                <template #default="{ row }">
                  <div class="flex items-center gap-3">
                    <button class="text-blue-600 hover:text-blue-800 hover:underline text-xs font-medium" type="button" @click="openView(row)">
                      查看
                    </button>
                    <button
                      v-if="row.auditStatus === '待审核'"
                      class="text-blue-600 hover:text-blue-800 hover:underline text-xs font-medium"
                      type="button"
                      @click="openAudit(row)"
                    >
                      审核
                    </button>
                  </div>
                </template>
              </el-table-column>
            </DataTable>
          </div>

          <div v-else class="p-5 space-y-4">
            <section class="rounded-xl border border-gray-200 p-5">
              <div class="text-sm font-semibold text-gray-700 mb-4">筛选</div>
              <div class="flex flex-wrap items-end gap-4 text-xs">
                <div class="flex items-center gap-2">
                  <span class="text-gray-500">客户姓名:</span>
                  <el-input v-model="conversionForm.customerName" placeholder="请输入客户姓名" clearable class="w-40" size="small" />
                </div>
                <div class="flex items-center gap-2">
                  <span class="text-gray-500">客户邮箱:</span>
                  <el-input v-model="conversionForm.customerEmail" placeholder="请输入客户邮箱" clearable class="w-56" size="small" />
                </div>
                <div class="flex items-center gap-2">
                  <span class="text-gray-500">活动名称:</span>
                  <el-input v-model="conversionForm.activityName" placeholder="请输入活动名称" clearable class="w-72" size="small" />
                </div>
                <div class="flex items-center gap-2">
                  <span class="text-gray-500">状态:</span>
                  <el-select v-model="conversionForm.status" placeholder="全部" clearable class="w-28" size="small">
                    <el-option label="审核中" value="审核中" />
                    <el-option label="审核通过" value="审核通过" />
                    <el-option label="已完成" value="已完成" />
                    <el-option label="审核拒绝" value="审核拒绝" />
                  </el-select>
                </div>
                <button class="bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 px-4 py-1.5 rounded text-xs font-medium transition-colors" type="button" @click="resetConversionForm">
                  重置
                </button>
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
                      <th class="text-left font-medium px-5 py-4 whitespace-nowrap text-red-500">可转换金额</th>
                      <th class="text-left font-medium px-5 py-4 whitespace-nowrap text-red-500">申请金额</th>
                      <th class="text-left font-medium px-5 py-4 whitespace-nowrap">目标真实账户</th>
                      <th class="text-left font-medium px-5 py-4 whitespace-nowrap">MT类型</th>
                      <th class="text-left font-medium px-5 py-4 whitespace-nowrap">风险状态</th>
                      <th class="text-left font-medium px-5 py-4 whitespace-nowrap">状态</th>
                      <th class="text-left font-medium px-5 py-4 whitespace-nowrap">审核结果</th>
                      <th class="text-left font-medium px-5 py-4 whitespace-nowrap">驳回原因</th>
                      <th class="text-left font-medium px-5 py-4 whitespace-nowrap">申请时间</th>
                      <th class="text-left font-medium px-5 py-4 whitespace-nowrap">审核时间</th>
                      <th class="text-left font-medium px-5 py-4 whitespace-nowrap">完成时间</th>
                      <th class="text-left font-medium px-5 py-4 whitespace-nowrap">操作</th>
                    </tr>
                  </thead>
                  <tbody class="text-gray-700">
                    <tr v-for="r in filteredConversionRows" :key="r.id" class="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                      <td class="px-5 py-4 font-mono text-gray-700">{{ r.id }}</td>
                      <td class="px-5 py-4">{{ r.customerName }}</td>
                      <td class="px-5 py-4 text-gray-600">{{ r.customerEmail }}</td>
                      <td class="px-5 py-4">{{ r.activityName }}</td>
                      <td class="px-5 py-4 font-mono text-gray-700">{{ formatUsd4(r.convertibleAmount) }}</td>
                      <td class="px-5 py-4 font-mono text-red-500">{{ formatUsd4(r.amount) }}</td>
                      <td class="px-5 py-4">{{ r.targetAccountLabel }}</td>
                      <td class="px-5 py-4">{{ r.mtType }}</td>
                      <td class="px-5 py-4">{{ r.riskTag }}</td>
                      <td class="px-5 py-4">{{ r.status }}</td>
                      <td class="px-5 py-4">{{ r.reviewResult || '-' }}</td>
                      <td class="px-5 py-4 text-gray-600">{{ r.rejectReason || '-' }}</td>
                      <td class="px-5 py-4 font-mono text-gray-600">{{ r.appliedAt }}</td>
                      <td class="px-5 py-4 font-mono text-gray-600">{{ r.reviewedAt || '-' }}</td>
                      <td class="px-5 py-4 font-mono text-gray-600">{{ r.completedAt || '-' }}</td>
                      <td class="px-5 py-4">
                        <div class="flex items-center gap-2 whitespace-nowrap">
                          <button class="h-8 px-3 rounded-md bg-blue-500 hover:bg-blue-600 text-white text-xs font-medium transition-colors" type="button" @click="openConversionDetail(r.id)">查看详情</button>
                          <button v-if="r.status === '审核中'" class="h-8 px-3 rounded-md bg-primaryBtn hover:bg-primaryBtnHover text-white text-xs font-medium transition-colors" type="button" @click="openConversionReview(r.id)">审核</button>
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

  <el-dialog v-model="viewVisible" width="860px" :show-close="false" align-center>
    <template #header>
      <div class="flex items-center justify-between w-full">
        <div class="text-sm font-bold text-gray-800">查看</div>
        <button class="text-gray-400 hover:text-gray-600" type="button" @click="viewVisible = false">
          <i class="fa-solid fa-xmark"></i>
        </button>
      </div>
    </template>

    <div class="grid grid-cols-2 gap-x-10 gap-y-3 text-xs text-gray-700">
      <div class="flex items-center gap-2">
        <span class="text-gray-500 w-20 shrink-0">客户姓名:</span>
        <span class="font-medium">{{ selected.customerName }}</span>
      </div>
      <div class="flex items-center gap-2">
        <span class="text-gray-500 w-20 shrink-0">客户邮箱:</span>
        <span class="font-mono">{{ selected.customerEmail }}</span>
      </div>
      <div class="flex items-center gap-2">
        <span class="text-gray-500 w-20 shrink-0">上级信息:</span>
        <span>{{ selected.uplineName || '-' }}</span>
      </div>
      <div class="flex items-center gap-2">
        <span class="text-gray-500 w-20 shrink-0">注册时间:</span>
        <span class="font-mono">{{ selected.registeredAt }}</span>
      </div>
      <div class="flex items-center gap-2">
        <span class="text-gray-500 w-20 shrink-0">报名时间:</span>
        <span class="font-mono">{{ selected.appliedAt }}</span>
      </div>
      <div class="flex items-center gap-2">
        <span class="text-gray-500 w-20 shrink-0">申请活动:</span>
        <span>{{ selected.activityName }}</span>
      </div>
      <div class="flex items-center gap-2">
        <span class="text-gray-500 w-20 shrink-0">HATC MT账号:</span>
        <span class="font-mono">{{ selected.hatcMtAccount || '-' }}</span>
      </div>
      <div class="flex items-center gap-2">
        <span class="text-gray-500 w-20 shrink-0">Star账号:</span>
        <span class="font-mono">{{ selected.demoAccount || '-' }}</span>
      </div>
      <div class="flex items-start gap-2 col-span-2">
        <span class="text-gray-500 w-20 shrink-0 mt-1">账户截图:</span>
        <div class="flex items-center gap-3">
          <button v-if="selected.screenshotUrl" class="flex items-center gap-2 text-blue-600 hover:text-blue-800 hover:underline" type="button" @click="openPreview(selected.screenshotUrl)">
            <img :src="selected.screenshotUrl" alt="" class="w-20 h-14 object-cover rounded border border-gray-200" />
            <span class="text-xs">{{ selected.screenshotName }}</span>
          </button>
          <span v-else class="text-gray-500">-</span>
        </div>
      </div>
      <div class="flex items-center gap-2">
        <span class="text-gray-500 w-20 shrink-0">审核状态:</span>
        <span class="inline-flex items-center gap-2">
          <span :class="['w-2 h-2 rounded-full', auditDotClass(selected.auditStatus)]"></span>
          <span :class="auditTextClass(selected.auditStatus)">{{ selected.auditStatus }}</span>
        </span>
      </div>
      <div class="flex items-center gap-2">
        <span class="text-gray-500 w-20 shrink-0">审核人:</span>
        <span>{{ selected.auditor || '-' }}</span>
      </div>
      <div class="flex items-center gap-2">
        <span class="text-gray-500 w-20 shrink-0">审核时间:</span>
        <span class="font-mono">{{ selected.auditAt || '-' }}</span>
      </div>
      <div class="flex items-center gap-2">
        <span class="text-gray-500 w-20 shrink-0">拒绝原因:</span>
        <span>{{ selected.rejectReason || '-' }}</span>
      </div>
    </div>

    <template #footer>
      <div class="flex items-center justify-end gap-3">
        <button class="px-6 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-600 text-sm font-medium transition-colors" type="button" @click="viewVisible = false">
          关闭
        </button>
      </div>
    </template>
  </el-dialog>

  <el-dialog v-model="auditVisible" width="920px" :show-close="false" align-center>
    <template #header>
      <div class="flex items-center justify-between w-full">
        <div class="text-sm font-bold text-gray-800">审核</div>
        <button class="text-gray-400 hover:text-gray-600" type="button" @click="closeAudit">
          <i class="fa-solid fa-xmark"></i>
        </button>
      </div>
    </template>

    <div class="grid grid-cols-2 gap-x-10 gap-y-3 text-xs text-gray-700">
      <div class="flex items-center gap-2">
        <span class="text-gray-500 w-20 shrink-0">客户姓名:</span>
        <span class="font-medium">{{ selected.customerName }}</span>
      </div>
      <div class="flex items-center gap-2">
        <span class="text-gray-500 w-20 shrink-0">客户邮箱:</span>
        <span class="font-mono">{{ selected.customerEmail }}</span>
      </div>
      <div class="flex items-center gap-2">
        <span class="text-gray-500 w-20 shrink-0">上级信息:</span>
        <span>{{ selected.uplineName || '-' }}</span>
      </div>
      <div class="flex items-center gap-2">
        <span class="text-gray-500 w-20 shrink-0">注册时间:</span>
        <span class="font-mono">{{ selected.registeredAt }}</span>
      </div>
      <div class="flex items-center gap-2">
        <span class="text-gray-500 w-20 shrink-0">报名时间:</span>
        <span class="font-mono">{{ selected.appliedAt }}</span>
      </div>
      <div class="flex items-center gap-2">
        <span class="text-gray-500 w-20 shrink-0">申请活动:</span>
        <span>{{ selected.activityName }}</span>
      </div>
      <div class="flex items-center gap-2">
        <span class="text-gray-500 w-20 shrink-0">HATC MT账号:</span>
        <span class="font-mono">{{ selected.hatcMtAccount || '-' }}</span>
      </div>
      <div class="flex items-start gap-2">
        <span class="text-gray-500 w-20 shrink-0 mt-1">账户截图:</span>
        <div>
          <button v-if="selected.screenshotUrl" class="flex items-center gap-2 text-blue-600 hover:text-blue-800 hover:underline" type="button" @click="openPreview(selected.screenshotUrl)">
            <img :src="selected.screenshotUrl" alt="" class="w-20 h-14 object-cover rounded border border-gray-200" />
            <span class="text-xs">{{ selected.screenshotName }}</span>
          </button>
          <span v-else class="text-gray-500">-</span>
        </div>
      </div>
      <div class="flex items-center gap-2">
        <span class="text-gray-500 w-20 shrink-0">Star账号:</span>
        <span class="font-mono">{{ selected.demoAccount || '-' }}</span>
      </div>
    </div>

    <div class="border-t border-gray-200 my-5"></div>

    <div class="grid grid-cols-2 gap-4 text-xs">
      <div>
        <div class="flex items-center gap-1 text-gray-600 mb-2">
          <span v-if="auditForm.result === '通过'" class="text-red-500">*</span>
          <span>盈利金额（USD）</span>
        </div>
        <el-input
          v-model="auditForm.profitAmount"
          placeholder="请输入盈利金额（USD）"
          size="small"
          type="number"
          inputmode="decimal"
          step="0.01"
          min="0"
          @input="clearError('profitAmount')"
          @blur="normalizeProfitAmount"
        />
        <div v-if="errors.profitAmount" class="text-red-500 text-[11px] mt-1">{{ errors.profitAmount }}</div>
        <div class="text-[11px] text-gray-400 mt-1">统一按 USD 填写；美分账户换算由后台处理。盈利金额 ≤ 0 时，不产生奖励。</div>
      </div>
      <div>
        <div class="flex items-center gap-1 text-gray-600 mb-2">
          <span class="text-red-500">*</span>
          <span>审核结果</span>
        </div>
        <el-select v-model="auditForm.result" placeholder="请选择审核结果" class="w-full" size="small" @change="onAuditResultChange">
          <el-option label="通过" value="通过" />
          <el-option label="拒绝" value="拒绝" />
        </el-select>
        <div v-if="errors.result" class="text-red-500 text-[11px] mt-1">{{ errors.result }}</div>
      </div>
      <div class="col-span-2">
        <div class="text-gray-600 mb-2">审核备注</div>
        <el-input v-model="auditForm.remark" type="textarea" :rows="2" placeholder="可选" size="small" />
      </div>
    </div>

    <div v-if="auditForm.result === '拒绝'" class="mt-4 grid grid-cols-2 gap-4 text-xs">
      <div>
        <div class="flex items-center gap-1 text-gray-600 mb-2">
          <span class="text-red-500">*</span>
          <span>拒绝原因</span>
        </div>
        <el-select v-model="auditForm.rejectReason" placeholder="请选择拒绝原因" class="w-full" size="small" @change="clearError('rejectReason')">
          <el-option v-for="o in rejectReasonOptions" :key="o" :label="o" :value="o" />
        </el-select>
        <div v-if="errors.rejectReason" class="text-red-500 text-[11px] mt-1">{{ errors.rejectReason }}</div>
      </div>
      <div>
        <div class="flex items-center gap-1 text-gray-600 mb-2">
          <span v-if="auditForm.rejectReason === '其他'" class="text-red-500">*</span>
          <span>补充说明</span>
        </div>
        <el-input v-model="auditForm.extraDesc" type="textarea" :rows="2" :placeholder="auditForm.rejectReason === '其他' ? '其他原因请补充说明（必填）' : '可选'" size="small" @input="clearError('extraDesc')" />
        <div v-if="errors.extraDesc" class="text-red-500 text-[11px] mt-1">{{ errors.extraDesc }}</div>
      </div>
    </div>

    <template #footer>
      <div class="flex items-center justify-end gap-3">
        <button class="px-6 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-600 text-sm font-medium transition-colors" type="button" @click="closeAudit">
          取消
        </button>
        <button class="px-6 py-2 rounded-lg bg-primary text-white text-sm font-medium hover:bg-primaryHover transition-colors" type="button" @click="submitAudit">
          确定
        </button>
      </div>
    </template>
  </el-dialog>

  <el-dialog v-model="previewVisible" width="860px" :show-close="false" align-center>
    <template #header>
      <div class="flex items-center justify-between w-full">
        <div class="text-sm font-bold text-gray-800">预览</div>
        <button class="text-gray-400 hover:text-gray-600" type="button" @click="previewVisible = false">
          <i class="fa-solid fa-xmark"></i>
        </button>
      </div>
    </template>
    <div class="w-full flex items-center justify-center">
      <img v-if="previewUrl" :src="previewUrl" alt="" class="max-w-full max-h-[560px] rounded border border-gray-200" />
      <div v-else class="text-gray-500 text-sm py-10">无可预览内容</div>
    </div>
    <template #footer>
      <div class="flex items-center justify-end">
        <button class="px-6 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-600 text-sm font-medium transition-colors" type="button" @click="previewVisible = false">
          关闭
        </button>
      </div>
    </template>
  </el-dialog>

  <el-dialog v-model="conversionDetailVisible" :title="canReviewConversion ? '赠金转化申请审核' : '赠金转化申请详情'" width="780px" align-center :close-on-click-modal="false" :close-on-press-escape="!conversionSubmitting" :show-close="!conversionSubmitting">
    <div v-if="conversionDetail" class="conversion-review-body space-y-5 text-sm text-gray-700" :class="{ 'conversion-review-compact': canReviewConversion }">
      <section>
        <h3 class="mb-3 text-sm font-semibold text-gray-800">客户基本信息</h3>
        <dl class="grid grid-cols-1 gap-x-8 gap-y-3 sm:grid-cols-2">
          <div><dt class="mb-1 text-xs text-gray-500">客户姓名</dt><dd>{{ conversionDetail.customerName }}</dd></div>
          <div><dt class="mb-1 text-xs text-gray-500">客户邮箱</dt><dd class="break-all">{{ conversionDetail.customerEmail }}</dd></div>
          <div class="sm:col-span-2"><dt class="mb-1 text-xs text-gray-500">活动名称</dt><dd>{{ conversionDetail.activityName }}</dd></div>
          <div :class="{ 'sm:col-span-2': canReviewConversion }"><dt class="mb-1 text-xs text-gray-500">{{ canReviewConversion ? 'MT账号' : '目标真实账户' }}</dt><dd>{{ conversionDetail.targetAccountLabel }}</dd></div>
          <div v-if="!canReviewConversion"><dt class="mb-1 text-xs text-gray-500">MT 类型</dt><dd>{{ detailAccount?.mtType || '-' }}</dd></div>
        </dl>
      </section>

      <section class="conversion-review-funds border-y border-gray-100 bg-gray-50 px-4 py-4">
        <h3 class="mb-3 text-sm font-semibold text-gray-800">资金信息</h3>
        <dl class="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <dt class="text-xs text-gray-500">客户当前赠金金额</dt>
            <dd class="mt-2 text-xl font-semibold tabular-nums text-gray-800">{{ detailSummary ? formatUsd4(currentBonusAmount) : '-' }}</dd>
            <p v-if="!canReviewConversion" class="mt-1 text-xs text-gray-500">当前活动赠金余额，包含占用及申请冻结金额</p>
          </div>
          <div>
            <dt class="text-xs text-gray-500">申请转真实资金金额</dt>
            <dd class="mt-2 text-xl font-semibold tabular-nums text-primaryBtn">{{ formatUsd4(conversionDetail.amount) }}</dd>
            <p class="mt-1 text-xs text-gray-500">本次申请金额，以提交时记录为准</p>
          </div>
        </dl>
        <p v-if="!canReviewConversion" class="mt-3 text-xs text-gray-500">申请记录可转换金额：{{ formatUsd4(conversionDetail.convertibleAmount ?? conversionDetail.amount) }}</p>
      </section>

      <section>
        <h3 class="mb-3 text-sm font-semibold text-gray-800">申请信息</h3>
        <dl class="grid grid-cols-1 gap-x-8 gap-y-3 sm:grid-cols-2">
          <div><dt class="mb-1 text-xs text-gray-500">申请ID</dt><dd class="font-mono">{{ conversionDetail.id }}</dd></div>
          <div><dt class="mb-1 text-xs text-gray-500">当前状态</dt><dd><el-tag :type="conversionDetail.status === '审核拒绝' ? 'danger' : conversionDetail.status === '审核中' ? 'warning' : 'success'" size="small">{{ conversionDetail.status }}</el-tag></dd></div>
          <div><dt class="mb-1 text-xs text-gray-500">申请时间</dt><dd class="tabular-nums">{{ conversionDetail.appliedAt }}</dd></div>
          <div v-if="!canReviewConversion"><dt class="mb-1 text-xs text-gray-500">风险状态</dt><dd :class="detailSummary?.riskTag && detailSummary.riskTag !== '正常' ? 'text-red-600' : 'text-gray-700'">{{ detailSummary?.riskTag || '-' }}</dd></div>
          <div><dt class="mb-1 text-xs text-gray-500">审核结果</dt><dd>{{ conversionDetail.reviewResult || '-' }}</dd></div>
          <div><dt class="mb-1 text-xs text-gray-500">审核时间</dt><dd class="tabular-nums">{{ conversionDetail.reviewedAt || '-' }}</dd></div>
          <div><dt class="mb-1 text-xs text-gray-500">完成时间</dt><dd class="tabular-nums">{{ conversionDetail.completedAt || '-' }}</dd></div>
          <div><dt class="mb-1 text-xs text-gray-500">入账结果</dt><dd class="break-words">{{ conversionDetail.payoutResult || '-' }}</dd></div>
          <div v-if="conversionDetail.rejectReason" class="sm:col-span-2"><dt class="mb-1 text-xs text-gray-500">驳回原因</dt><dd class="whitespace-pre-wrap break-words text-red-600">{{ conversionDetail.rejectReason }}</dd></div>
        </dl>
      </section>

      <section v-if="!canReviewConversion" class="border-t border-gray-100 pt-4">
        <h3 class="mb-2 text-sm font-semibold text-gray-800">信用金概览</h3>
        <div class="flex flex-wrap gap-x-5 gap-y-2 text-xs text-gray-600">
          <span>已发放：{{ formatUsd4(detailSummary?.issuedCredit) }}</span>
          <span>已消耗：{{ formatUsd4(detailSummary?.consumedCredit) }}</span>
          <span>占用中：{{ formatUsd4(detailSummary?.occupiedNow) }}</span>
          <span>可转换：{{ formatUsd4(detailSummary?.convertibleCredit) }}</span>
          <span>已转换：{{ formatUsd4(detailSummary?.convertedCredit) }}</span>
        </div>
      </section>
      <section class="border-t border-gray-100 pt-4">
        <h3 class="mb-2 text-sm font-semibold text-gray-800">审核记录</h3>
        <div v-if="!conversionDetail.auditLogs?.length" class="text-xs text-gray-400">暂无审核记录</div>
        <div v-for="(log, idx) in conversionDetail.auditLogs || []" :key="idx" class="mb-2 text-xs">
          <div class="flex flex-wrap justify-between gap-2"><span>{{ log.actor }} · {{ log.action }}</span><span class="text-gray-500">{{ log.at }}</span></div>
          <p v-if="log.note" class="mt-1 break-words text-gray-500">{{ log.note }}</p>
        </div>
      </section>
      <section v-if="canReviewConversion" class="border-t border-gray-100 pt-4">
        <label for="conversion-reject-reason" class="mb-2 block text-sm font-medium text-gray-700">驳回原因 <span class="text-red-500">*</span><span class="ml-2 text-xs font-normal text-gray-500">仅审核拒绝时必填</span></label>
        <el-input id="conversion-reject-reason" v-model="conversionRejectReason" type="textarea" :rows="3" :disabled="conversionSubmitting" placeholder="审核拒绝时请填写具体原因" />
        <p v-if="!conversionRejectReason.trim()" class="mt-2 text-xs text-gray-500">填写驳回原因后才可提交审核拒绝，不影响审核通过。</p>
      </section>
      <p v-else class="text-xs text-gray-500">当前为只读详情，不允许在此重复审核。</p>
    </div>
    <template #footer>
      <div class="flex w-full flex-wrap items-center justify-end gap-3">
        <el-button :disabled="conversionSubmitting" @click="conversionDetailVisible = false">{{ canReviewConversion ? '取消' : '关闭' }}</el-button>
        <template v-if="canReviewConversion">
          <el-button type="primary" :loading="conversionSubmitting" @click="approveConversion">审核通过</el-button>
          <el-button type="danger" :disabled="conversionSubmitting || !conversionRejectReason.trim()" @click="confirmConversionReject">审核拒绝</el-button>
        </template>
      </div>
    </template>
  </el-dialog>
</template>

<script setup>
import { reactive, ref, computed } from 'vue'
import DataTable from '@/components/DataTable.vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { creditConversionState, approveRequest, rejectRequest, getCreditSummary } from '@/store/creditConversionDemo'

const activeTab = ref('activity')

const activityOptions = ['先锋活动', '先锋一号 50,000 USD 活动']
const auditStatusOptions = ['待审核', '已通过', '已拒绝']
const rejectReasonOptions = ['账户信息不符', '截图无法确认', '资料不完整', 'HATC MT账户不符合要求', '重复申请', '其他']

const form = reactive({
  customerName: '',
  customerEmail: '',
  activityName: '',
  auditStatus: ''
})

const page = ref(1)
const limit = ref(20)

const createSvgDataUrl = (seed) => {
  const safe = String(seed || 'A').replace(/[^a-zA-Z0-9]/g, '').slice(0, 8) || 'A'
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="960" height="640"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#f3f4f6"/><stop offset="1" stop-color="#ffffff"/></linearGradient></defs><rect width="100%" height="100%" fill="url(#g)"/><rect x="36" y="36" width="888" height="568" rx="16" fill="#ffffff" stroke="#e5e7eb"/><rect x="72" y="92" width="816" height="44" rx="10" fill="#f9fafb" stroke="#e5e7eb"/><rect x="72" y="160" width="520" height="18" rx="9" fill="#e5e7eb"/><rect x="72" y="196" width="620" height="18" rx="9" fill="#e5e7eb"/><rect x="72" y="232" width="420" height="18" rx="9" fill="#e5e7eb"/><rect x="72" y="296" width="816" height="18" rx="9" fill="#e5e7eb"/><rect x="72" y="332" width="760" height="18" rx="9" fill="#e5e7eb"/><rect x="72" y="368" width="816" height="18" rx="9" fill="#e5e7eb"/><rect x="72" y="404" width="560" height="18" rx="9" fill="#e5e7eb"/><text x="92" y="122" font-size="16" fill="#6b7280" font-family="-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial">账户截图</text><text x="748" y="122" font-size="14" fill="#9ca3af" font-family="ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas">ID: ${safe}</text></svg>`
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`
}

const rows = ref([
  {
    id: 'AUD-10001',
    customerName: '王建国',
    customerEmail: 'wangjianguo@example.com',
    uplineName: 'test-测试小A',
    uplineContact: '2428702751@qq.com',
    registeredAt: '2026-09-02 09:12:10',
    activityName: '先锋一号 50,000 USD 活动',
    appliedAt: '2026-09-05 10:15:30',
    auditStatus: '待审核',
    rejectReason: '',
    rejectExtra: '',
    hatcMtAccount: '8001023',
    demoAccount: 'D-9000231',
    screenshotName: 'demo_account_9000231.png',
    screenshotUrl: createSvgDataUrl('9000231'),
    profitAmountUsd: '',
    auditor: '',
    auditAt: ''
  },
  {
    id: 'AUD-10002',
    customerName: '李雪',
    customerEmail: 'lixue88@example.com',
    uplineName: 'test-杨校民',
    uplineContact: '13885982890@qq.com',
    registeredAt: '2026-09-03 11:22:50',
    activityName: '先锋一号 50,000 USD 活动',
    appliedAt: '2026-09-07 14:20:00',
    auditStatus: '已通过',
    rejectReason: '',
    rejectExtra: '',
    hatcMtAccount: '8001055',
    demoAccount: 'D-9000418',
    screenshotName: 'demo_account_9000418.png',
    screenshotUrl: createSvgDataUrl('9000418'),
    profitAmountUsd: '8000.00',
    auditor: '史密斯',
    auditAt: '2026-09-07 15:02:12'
  },
  {
    id: 'AUD-10003',
    customerName: '陈大文',
    customerEmail: 'chen.dw@example.com',
    uplineName: '',
    uplineContact: '',
    registeredAt: '2026-09-08 08:40:05',
    activityName: '先锋一号 50,000 USD 活动',
    appliedAt: '2026-09-10 09:33:12',
    auditStatus: '已拒绝',
    rejectReason: '截图无法确认',
    rejectExtra: '截图信息不完整',
    hatcMtAccount: '8001088',
    demoAccount: 'D-9000662',
    screenshotName: 'demo_account_9000662.png',
    screenshotUrl: createSvgDataUrl('9000662'),
    profitAmountUsd: '',
    auditor: '系统管理员',
    auditAt: '2026-09-10 10:12:44'
  },
  {
    id: 'AUD-10004',
    customerName: 'test-孙吴时',
    customerEmail: '15059104067@qq.com',
    uplineName: '',
    uplineContact: '',
    registeredAt: '2026-04-10 17:01:45',
    activityName: '先锋活动',
    appliedAt: '2026-04-10 17:01:45',
    auditStatus: '待审核',
    rejectReason: '',
    rejectExtra: '',
    hatcMtAccount: '66666666',
    demoAccount: '2024',
    screenshotName: 'demo_account_2024.png',
    screenshotUrl: createSvgDataUrl('2024'),
    profitAmountUsd: '',
    auditor: '',
    auditAt: ''
  }
])

const filteredRows = computed(() => {
  const name = form.customerName.trim()
  const email = form.customerEmail.trim()
  const activityName = form.activityName
  const auditStatus = form.auditStatus

  return rows.value.filter(r => {
    const matchName = !name || r.customerName.includes(name)
    const matchEmail = !email || r.customerEmail.includes(email)
    const matchActivity = !activityName || r.activityName === activityName
    const matchStatus = !auditStatus || r.auditStatus === auditStatus
    return matchName && matchEmail && matchActivity && matchStatus
  })
})

const pagedRows = computed(() => {
  const start = (page.value - 1) * limit.value
  return filteredRows.value.slice(start, start + limit.value)
})

const viewVisible = ref(false)
const auditVisible = ref(false)
const previewVisible = ref(false)
const previewUrl = ref('')

const selected = reactive({
  id: '',
  customerName: '',
  customerEmail: '',
  uplineName: '',
  uplineContact: '',
  registeredAt: '',
  activityName: '',
  appliedAt: '',
  auditStatus: '',
  rejectReason: '',
  rejectExtra: '',
  hatcMtAccount: '',
  demoAccount: '',
  screenshotName: '',
  screenshotUrl: '',
  profitAmountUsd: '',
  auditor: '',
  auditAt: ''
})

const auditForm = reactive({
  profitAmount: '',
  result: '',
  remark: '',
  rejectReason: '',
  extraDesc: ''
})

const errors = reactive({
  profitAmount: '',
  result: '',
  rejectReason: '',
  extraDesc: ''
})

const handleSearch = () => {
  page.value = 1
}

const handleReset = () => {
  form.customerName = ''
  form.customerEmail = ''
  form.activityName = ''
  form.auditStatus = ''
  page.value = 1
}

const conversionForm = reactive({
  customerName: '',
  customerEmail: '',
  activityName: '',
  status: '',
})

const resetConversionForm = () => {
  conversionForm.customerName = ''
  conversionForm.customerEmail = ''
  conversionForm.activityName = ''
  conversionForm.status = ''
}

const filteredConversionRows = computed(() => {
  const name = conversionForm.customerName.trim()
  const email = conversionForm.customerEmail.trim()
  const activityName = conversionForm.activityName.trim()
  const status = conversionForm.status
  return creditConversionState.conversionRequests.filter((r) => {
    const matchName = !name || String(r.customerName || '').includes(name)
    const matchEmail = !email || String(r.customerEmail || '').includes(email)
    const matchActivity = !activityName || String(r.activityName || '').includes(activityName)
    const matchStatus = !status || String(r.status || '') === status
    return matchName && matchEmail && matchActivity && matchStatus
  }).map((r) => {
    const s = getCreditSummary({ customerId: r.customerId, activityId: r.activityId })
    const account = creditConversionState.accounts.find((a) => a.id === r.targetAccountId) || null
    return {
      ...r,
      riskTag: s?.riskTag || '-',
      mtType: account?.mtType || '-',
      convertibleAmount: Number(r.convertibleAmount ?? s?.convertibleCredit ?? 0) || 0,
      reviewResult: String(r.reviewResult || ''),
      rejectReason: String(r.rejectReason || ''),
      reviewedAt: String(r.reviewedAt || ''),
      completedAt: String(r.completedAt || ''),
    }
  })
})

const conversionDetailVisible = ref(false)
const conversionDetailId = ref('')
const conversionDetail = computed(() => creditConversionState.conversionRequests.find((r) => r.id === conversionDetailId.value) || null)
const conversionReviewMode = ref(false)
const conversionSubmitting = ref(false)
const conversionRejectReason = ref('')
const canReviewConversion = computed(() => conversionReviewMode.value && conversionDetail.value?.status === '审核中')
const detailAccount = computed(() => {
  const req = conversionDetail.value
  if (!req) return null
  return creditConversionState.accounts.find((a) => a.id === req.targetAccountId) || null
})
const detailSummary = computed(() => {
  const req = conversionDetail.value
  if (!req) return null
  return getCreditSummary({ customerId: req.customerId, activityId: req.activityId })
})
const currentBonusAmount = computed(() => {
  const summary = detailSummary.value
  return summary ? Math.max(0, summary.issuedCredit - summary.consumedCredit - summary.convertedCredit) : 0
})

const openConversionDetail = (id) => {
  const req = creditConversionState.conversionRequests.find((r) => r.id === id)
  if (!req) return ElMessage.warning('申请不存在')
  conversionDetailId.value = id
  conversionReviewMode.value = false
  conversionRejectReason.value = ''
  conversionDetailVisible.value = true
}

const openConversionReview = (id) => {
  openConversionDetail(id)
  conversionReviewMode.value = conversionDetail.value?.id === id && conversionDetail.value.status === '审核中'
}

const approveConversion = async () => {
  if (!canReviewConversion.value || conversionSubmitting.value) return
  const id = conversionDetail.value.id
  conversionSubmitting.value = true
  try {
    await ElMessageBox.confirm(`确认通过本次 ${formatUsd4(conversionDetail.value.amount)} 转真实资金申请？`, '确认审核通过', {
      confirmButtonText: '确认通过', cancelButtonText: '取消', type: 'warning',
      closeOnClickModal: false,
    })
    const res = approveRequest({ id, auditor: '系统管理员（演示）' })
    if (!res.ok) return ElMessage.error(res.message || '操作失败')
    conversionReviewMode.value = false
    ElMessage.success('已审核通过并完成，列表已更新')
  } catch (error) {
    if (error !== 'cancel' && error !== 'close') ElMessage.error('审核未完成，请重试')
  } finally {
    conversionSubmitting.value = false
  }
}

const confirmConversionReject = () => {
  if (!canReviewConversion.value || conversionSubmitting.value) return
  const reason = conversionRejectReason.value.trim()
  if (!reason) return ElMessage.warning('请填写驳回原因')
  conversionSubmitting.value = true
  try {
    const res = rejectRequest({ id: conversionDetail.value.id, auditor: '系统管理员（演示）', reason })
    if (!res.ok) return ElMessage.error(res.message || '操作失败')
    conversionReviewMode.value = false
    ElMessage.success('已审核拒绝，列表已更新')
  } finally {
    conversionSubmitting.value = false
  }
}

const formatUsd4 = (val) => {
  const num = Number(val) || 0
  return `${num.toLocaleString('en-US', { minimumFractionDigits: 4, maximumFractionDigits: 4 })} USD`
}

const openView = (row) => {
  Object.assign(selected, row)
  viewVisible.value = true
}

const openAudit = (row) => {
  Object.assign(selected, row)
  auditForm.profitAmount = ''
  auditForm.result = ''
  auditForm.remark = ''
  auditForm.rejectReason = ''
  auditForm.extraDesc = ''
  errors.profitAmount = ''
  errors.result = ''
  errors.rejectReason = ''
  errors.extraDesc = ''
  auditVisible.value = true
}

const closeAudit = () => {
  auditVisible.value = false
  errors.profitAmount = ''
  errors.result = ''
  errors.rejectReason = ''
  errors.extraDesc = ''
}

const clearError = (key) => {
  errors[key] = ''
}

const onAuditResultChange = () => {
  clearError('result')
  clearError('profitAmount')
}

const normalizeProfitAmount = () => {
  const raw = String(auditForm.profitAmount || '').trim()
  if (!raw) return
  const n = Number(raw)
  if (Number.isNaN(n)) {
    auditForm.profitAmount = ''
    return
  }
  const safe = Math.max(0, n)
  auditForm.profitAmount = safe.toFixed(2)
}

const nowText = () => {
  const d = new Date()
  const pad = (n) => String(n).padStart(2, '0')
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`
}

const submitAudit = () => {
  errors.profitAmount = ''
  errors.result = ''
  errors.rejectReason = ''
  errors.extraDesc = ''

  if (!auditForm.result) errors.result = '请选择审核结果'
  if (auditForm.result === '通过') {
    const raw = String(auditForm.profitAmount || '').trim()
    const n = Number(raw)
    if (!raw || Number.isNaN(n)) errors.profitAmount = '请输入盈利金额（USD）'
    else auditForm.profitAmount = Math.max(0, n).toFixed(2)
  }
  if (auditForm.result === '拒绝') {
    if (!auditForm.rejectReason) errors.rejectReason = '请选择拒绝原因'
    if (auditForm.rejectReason === '其他' && !auditForm.extraDesc.trim()) errors.extraDesc = '补充说明必填'
  }

  if (errors.profitAmount || errors.result || errors.rejectReason || errors.extraDesc) return

  const idx = rows.value.findIndex(r => r.id === selected.id)
  if (idx < 0) return

  const next = { ...rows.value[idx] }
  const at = nowText()
  const operator = '系统管理员'

  if (auditForm.result === '通过') {
    next.auditStatus = '已通过'
    next.rejectReason = ''
    next.rejectExtra = ''
    next.profitAmountUsd = auditForm.profitAmount
    next.auditor = operator
    next.auditAt = at
  } else {
    next.auditStatus = '已拒绝'
    next.rejectReason = auditForm.rejectReason
    next.rejectExtra = auditForm.extraDesc.trim()
    next.profitAmountUsd = ''
    next.auditor = operator
    next.auditAt = at
  }

  rows.value.splice(idx, 1, next)
  Object.assign(selected, next)
  auditVisible.value = false
}

const openPreview = (url) => {
  previewUrl.value = url
  previewVisible.value = true
}

const auditDotClass = (status) => {
  if (status === '已通过') return 'bg-emerald-500'
  if (status === '已拒绝') return 'bg-red-500'
  return 'bg-amber-500'
}

const auditTextClass = (status) => {
  if (status === '已通过') return 'text-emerald-700 font-medium'
  if (status === '已拒绝') return 'text-red-600 font-medium'
  return 'text-gray-600 font-medium'
}
</script>

<style scoped>
/* 仅收紧审核模式，查看详情保持原有布局。 */
.conversion-review-compact > section + section {
  margin-top: 12px;
}
.conversion-review-compact > section > h3 {
  margin-bottom: 8px;
}
.conversion-review-compact > section > dl {
  row-gap: 8px;
}
.conversion-review-compact dt {
  margin-bottom: 2px;
}
.conversion-review-compact .conversion-review-funds {
  padding-top: 12px;
  padding-bottom: 12px;
}
.conversion-review-compact .conversion-review-funds dd {
  margin-top: 4px;
}
.conversion-review-compact > section.border-t {
  padding-top: 12px;
}
.custom-scrollbar::-webkit-scrollbar { width: 6px; height: 6px; }
.custom-scrollbar::-webkit-scrollbar-thumb { background: #e5e7eb; border-radius: 4px; }
.custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
</style>
