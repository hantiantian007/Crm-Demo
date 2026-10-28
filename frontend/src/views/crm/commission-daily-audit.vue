<template>
  <div class="h-full min-w-0 overflow-y-auto bg-gray-50 p-6 custom-scrollbar">
    <div class="flex flex-col gap-6">
      <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
        <div class="flex items-center justify-between flex-wrap gap-4">
          <div class="flex items-center gap-3">
            <label class="text-[13px] text-gray-600 font-medium" for="audit-date">对账日期:</label>
            <input id="audit-date" v-model="auditDate" class="custom-input w-[180px]" type="date" />
          </div>
          <span class="text-xs text-gray-500">{{ currentBatch ? `统计时间: ${auditDate} 06:05:28` : '该日期暂无演示批次' }}</span>
        </div>
        <p class="mt-3 text-xs leading-5 text-gray-500">固定前端演示数据，非真实 MT5 入账。金额统一为 USD 演示口径，保留美分账户小数精度，不混加 USD / USC 原始数值。</p>
      </div>

      <div class="audit-kpis">
        <section class="bg-white rounded-xl shadow-sm border border-gray-100 p-6 min-w-0">
          <div class="flex items-center justify-between gap-3 mb-5">
            <div class="flex items-center gap-2"><div class="w-9 h-9 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center"><i class="fas fa-receipt text-[15px]"></i></div><h3 class="font-bold text-gray-800 text-[15px]">返佣订单数对照</h3></div>
            <span class="text-xs text-gray-500">今日平仓订单总数 {{ summary?.total ?? '—' }} 笔</span>
          </div>
          <div class="audit-metrics bg-gray-50 border border-gray-100 rounded-xl">
            <div><div class="metric-label">应返佣订单数</div><strong>{{ summary?.expectedCount ?? '—' }}</strong><span class="metric-unit">笔</span></div>
            <div><div class="metric-label">CRM返佣订单数</div><strong>{{ summary?.crmCount ?? '—' }}</strong><span class="metric-unit">笔</span></div>
            <div title="全部应收佣代理均关联到 MT5 入账才计为一笔；金额是否一致独立核对。"><div class="metric-label">MT返佣订单数</div><strong>{{ summary?.mtCount ?? '—' }}</strong><span class="metric-unit">笔</span></div>
          </div>
          <div class="audit-differences">
            <span>CRM数量差异 <b :class="differenceClass(countCrmDifference)">{{ signedCount(countCrmDifference) }} 笔</b></span>
            <span>MT数量差异 <b :class="differenceClass(countMtDifference)">{{ signedCount(countMtDifference) }} 笔</b></span>
          </div>
          <div class="flex items-center gap-3 flex-wrap pt-4 border-t border-gray-100 text-xs">
            <span class="pill pill-blue">USD {{ summary?.standardCount ?? '—' }} 笔</span><span class="pill pill-orange">USC {{ summary?.centCount ?? '—' }} 笔</span>
            <span class="ml-auto text-gray-500">CRM返佣订单：</span><span class="pill pill-green">正常 {{ summary ? summary.expectedCount - summary.abnormalCount : '—' }} 笔</span><span class="pill pill-red">异常 {{ summary?.abnormalCount ?? '—' }} 笔</span>
          </div>
        </section>
        <section class="bg-white rounded-xl shadow-sm border border-gray-100 p-6 min-w-0">
          <div class="flex items-center gap-2 mb-5"><div class="w-9 h-9 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center"><i class="fas fa-coins text-[15px]"></i></div><h3 class="font-bold text-gray-800 text-[15px]">返佣总金额对照</h3></div>
          <div class="audit-metrics bg-gray-50 border border-gray-100 rounded-xl">
            <div><div class="metric-label">应返佣金额</div><strong>{{ money(summary?.expectedAmount) }}</strong></div>
            <div><div class="metric-label">CRM实际返佣金额</div><strong>{{ money(summary?.crmAmount) }}</strong></div>
            <div><div class="metric-label">MT返佣金额</div><strong>{{ money(summary?.mtAmount) }}</strong></div>
          </div>
          <div class="audit-differences">
            <span>CRM金额差异 <b :class="differenceClass(amountCrmDifference)">{{ signedMoney(amountCrmDifference) }}{{ amountCrmDifference === 0 ? '（正常）' : '' }}</b></span>
            <span>MT金额差异 <b :class="differenceClass(amountMtDifference)">{{ signedMoney(amountMtDifference) }}{{ amountMtDifference === 0 ? '（正常）' : '' }}</b></span>
          </div>
          <p class="text-xs leading-5 text-gray-500 pt-4 border-t border-gray-100">金额独立核对；MT 差异不计入 CRM 异常笔数，不改变异常处理结果。</p>
        </section>
      </div>

      <div class="reconciliation-detail-table-card bg-white rounded-xl shadow-sm border border-gray-100 min-w-0">
        <div class="flex items-center justify-between flex-wrap gap-4 p-5 border-b border-gray-100">
          <div class="flex items-center flex-wrap gap-3">
            <h3 class="font-bold text-gray-800 text-[15px]">对账明细</h3>
            <span class="pill pill-gray">共 {{ rows.length }} 条，CRM异常 {{ summary?.abnormalCount ?? 0 }} 条</span>
            <select v-model="accountTypeFilter" class="custom-select w-[145px]" aria-label="账户类型"><option value="all">账户类型（全部）</option><option>标准账户</option><option>美分账户</option></select>
            <select v-model="crmStatusFilter" class="custom-select w-[145px]" aria-label="对账结果"><option value="all">对账结果（全部）</option><option>异常</option><option>正常</option></select>
            <select v-model="processingStatusFilter" class="custom-select w-[145px]" aria-label="处理状态"><option value="all">处理状态（全部）</option><option>未处理</option><option>已处理</option></select>
          </div>
          <div class="flex items-center flex-wrap gap-3">
            <button class="bg-white hover:bg-gray-50 text-gray-600 border border-gray-200 px-5 py-2 rounded text-[13px] transition-colors shadow-sm" @click="exportAudit"><i class="fas fa-download mr-2"></i>导出对账单</button>
            <input v-model="search" class="custom-input w-[280px]" placeholder="搜索平仓单号 / 客户 / MT账号" aria-label="搜索对账明细" />
          </div>
        </div>
        <div class="reconciliation-detail-table-scroll">
          <table class="commission-detail-table custom-table w-full min-w-[2050px]">
            <thead><tr><th>平仓单号</th><th>账户类型</th><th>客户姓名 / MT账号</th><th>交易手数</th><th title="MT人数按已关联入账的不同收款代理计数，重复流水不重复计人。">应/CRM/MT返佣人数</th><th>应/CRM返佣金额($)</th><th>MT返佣金额($)</th><th>对账结果</th><th>MT对账结果</th><th>处理状态</th><th>金额差额($)</th><th>返佣条数差</th><th>操作</th></tr></thead>
            <tbody>
              <tr v-for="row in pagedRows" :key="row.id" :class="row.crmStatus === '异常' ? 'diff-row bg-orange-50/30' : ''">
                <td class="font-mono text-gray-700">#{{ row.id }}</td><td>{{ row.accountType }}</td>
                <td><div class="reconciliation-customer"><div class="font-medium">{{ row.customer }}</div><div class="text-xs text-gray-400">MT: {{ row.account }}</div></div></td>
                <td><span :class="row.crmStatus === '异常' ? 'text-red-600' : 'text-gray-700'" class="font-mono font-semibold">{{ row.lots.split(' ')[0] }}</span><span class="ml-2 text-xs text-gray-500">{{ row.lots.split(' ')[1] }}</span></td>
                <td class="font-mono">{{ row.expectedPeople }} 人 / <span :class="row.crmPeople !== row.expectedPeople ? 'text-red-600' : ''">{{ row.crmPeople }} 人</span> / <span :class="row.mtPeople === null ? 'text-gray-400' : row.mtPeople !== row.crmPeople ? 'text-red-600' : ''">{{ row.mtPeople === null ? '—' : `${row.mtPeople} 人` }}</span></td>
                <td class="font-mono">{{ money(row.expectedAmount) }} / <span :class="row.crmDifference ? 'text-red-600' : ''">{{ money(row.crmAmount) }}</span></td>
                <td class="font-mono" :class="differenceClass(row.mtDifference)">{{ money(row.mtAmount) }}</td>
                <td><span :class="row.crmStatus === '正常' ? 'pill pill-green' : 'pill pill-red'">{{ row.crmStatus }}</span></td>
                <td><span :class="mtStatusClass(row.mtStatus)">{{ row.mtStatus || '—' }}</span></td>
                <td><span :class="getProcessingStatus(row.id, row.crmStatus) === '已处理' ? 'text-blue-600' : 'text-red-600'">{{ getProcessingStatus(row.id, row.crmStatus) }}</span></td>
                <td class="font-mono" :class="row.crmDifference ? 'text-red-600 font-semibold' : 'text-gray-500'">{{ signedMoney(row.crmDifference) }}</td>
                <td :class="row.crmPeople !== row.expectedPeople ? 'text-red-600 font-semibold' : 'text-gray-500'">{{ signedCount(row.crmPeople - row.expectedPeople) }} 条</td>
                <td><div class="flex items-center gap-3"><button class="text-blue-600 hover:text-blue-800 text-xs py-1" @click="openDetail(row)">查看详情</button><button v-if="row.crmStatus === '异常'" class="text-red-600 hover:text-red-800 text-xs py-1" @click="openExceptionDrawer(row.id)">{{ getProcessingStatus(row.id, row.crmStatus) === '已处理' ? '查看处理记录' : '异常处理' }}</button></div></td>
              </tr>
              <tr v-if="!pagedRows.length"><td colspan="13" class="text-gray-400">{{ currentBatch ? '没有符合条件的对账明细' : '该日期暂无演示数据，请选择 2026-08-05 至 2026-08-11' }}</td></tr>
            </tbody>
          </table>
        </div>
        <div class="reconciliation-detail-pagination flex items-center justify-between flex-wrap gap-4 px-4 py-4 border-t border-gray-100">
          <span class="text-xs text-gray-500">共 {{ filteredRows.length }} 条记录，当前显示 {{ pagedRows.length }} 条（异常已置顶）</span>
          <div class="flex items-center gap-2 text-xs">
            <button class="page-button" :disabled="page === 1" @click="page--" aria-label="上一页">‹</button>
            <button v-for="number in pageNumbers" :key="number" class="page-button" :class="number === page ? 'page-current' : ''" @click="page = number">{{ number }}</button>
            <span class="text-gray-500">第 {{ page }}/{{ pageCount }} 页</span>
            <button class="page-button" :disabled="page >= pageCount" @click="page++" aria-label="下一页">›</button>
            <select v-model.number="pageSize" class="custom-select w-[100px] ml-3" aria-label="每页条数"><option :value="20">20 条/页</option><option :value="50">50 条/页</option><option :value="100">100 条/页</option></select>
          </div>
        </div>
      </div>
    </div>

    <el-drawer v-model="detailOpen" title="佣金明细" size="90%">
      <div v-if="selectedDetail" class="audit-readonly-detail">
        <dl class="audit-detail-info">
          <div><dt>平仓单号（CRM）</dt><dd>#{{ selectedDetail.id }}</dd></div><div><dt>MT5 平仓 Deal 编号</dt><dd>{{ selectedDetail.closeDeal }}</dd></div>
          <div><dt>客户 / 交易 MT 账号</dt><dd>{{ selectedDetail.customer }} / {{ selectedDetail.account }}</dd></div><div><dt>对账日期 / 账户类型</dt><dd>{{ selectedDetail.date }} / {{ selectedDetail.accountType }}</dd></div>
          <div><dt>交易手数</dt><dd>{{ selectedDetail.lots }}</dd></div><div><dt>应 / CRM返佣人数</dt><dd>{{ selectedDetail.expectedPeople }} / {{ selectedDetail.crmPeople }} 人</dd></div>
          <div><dt>应 / CRM返佣金额</dt><dd>{{ money(selectedDetail.expectedAmount) }} / {{ money(selectedDetail.crmAmount) }}</dd></div><div><dt>CRM对账结果 / 金额差额</dt><dd>{{ selectedDetail.crmStatus }} / {{ signedMoney(selectedDetail.crmDifference) }}</dd></div>
        </dl>
        <h3 class="text-sm font-semibold mt-6 mb-3">CRM佣金明细（USD）</h3>
        <div class="overflow-x-auto"><table class="audit-credit-table"><thead><tr><th>收款代理</th><th>佣金记录编号</th><th>应收佣代理</th><th>CRM记录状态</th><th>CRM返佣金额</th></tr></thead><tbody><tr v-for="recipient in selectedDetail.recipients" :key="recipient.commissionRecord"><td>{{ recipient.agent }}</td><td>{{ recipient.commissionRecord }}</td><td>{{ recipient.expected ? '是' : '否' }}</td><td>{{ recipient.crmRecorded ? '已记录' : '未记录' }}</td><td>{{ money(recipient.crmAmount) }}</td></tr><tr v-if="!selectedDetail.recipients.length"><td colspan="5">该平仓订单不涉及返佣。</td></tr></tbody></table></div>
        <h3 class="text-sm font-semibold mt-6 mb-3">MT5佣金入账核对</h3>
        <p class="text-xs text-gray-500 leading-5 mb-4">仅为固定演示关联结果。注释按 CM + 交易 MT 账号 + MT5 平仓 Deal 编号构造，具体拼接及匹配口径待后端确认；不使用页面平仓单号推测 Deal。重复入账按收款佣金账号及同一佣金记录对应的多笔流水确认，不以相同注释直接判定。</p>
        <div class="overflow-x-auto"><table class="audit-credit-table min-w-[2250px]">
          <thead><tr><th>收款代理</th><th>代理 MT5 佣金账号</th><th>交易 MT 账号</th><th>MT5 平仓 Deal 编号</th><th>CRM返佣金额</th><th>MT5实际入账金额</th><th>MT5入账注释</th><th>MT5入账流水编号</th><th>入账时间</th><th>金额差异</th><th>MT5对账结果</th></tr></thead>
          <tbody>
            <tr v-for="recipient in selectedDetail.recipients" :key="recipient.commissionRecord">
              <td>{{ recipient.agent }}</td><td>{{ recipient.commissionAccount }}</td><td>{{ selectedDetail.account }}</td><td class="font-mono">{{ selectedDetail.closeDeal }}</td><td>{{ money(recipient.crmAmount) }}</td>
              <td><div>{{ money(recipientMtAmount(recipient)) }}</div><div v-if="recipient.credits?.length > 1" class="text-xs text-gray-500">{{ recipient.credits.map(credit => money(credit.amount)).join(' + ') }}</div></td>
              <td><div v-for="credit in recipient.credits || []" :key="credit.id" class="ledger-line font-mono">{{ credit.comment || '—' }}</div><span v-if="!recipient.credits?.length">—</span></td>
              <td><div v-for="credit in recipient.credits || []" :key="credit.id" class="ledger-line font-mono">{{ credit.id }}</div><span v-if="!recipient.credits?.length">—</span></td>
              <td><div v-for="credit in recipient.credits || []" :key="credit.id" class="ledger-line">{{ credit.time || '—' }}</div><span v-if="!recipient.credits?.length">—</span></td>
              <td :class="differenceClass(recipientDifference(recipient))">{{ signedMoney(recipientDifference(recipient)) }}</td><td><span :class="mtStatusClass(recipientMtResult(recipient))">{{ recipientMtResult(recipient) }}</span><div v-if="recipient.reviewReason" class="mt-2 text-xs text-gray-500 whitespace-normal max-w-[220px]">{{ recipient.reviewReason }}</div></td>
            </tr>
            <tr v-if="!selectedDetail.recipients.length"><td colspan="11">—（无应收佣代理，不计入 MT返佣订单数）</td></tr>
          </tbody>
        </table></div>
        <p class="mt-4 text-xs text-gray-500">MT返佣人数：{{ selectedDetail.mtPeople ?? '—' }}；MT返佣金额：{{ money(selectedDetail.mtAmount) }}；MT金额差异：{{ signedMoney(selectedDetail.mtDifference) }}。同一收款代理的多笔流水只计 1 人；各代理独立核对。</p>
        <section v-if="exceptionRecords[selectedDetail.id]" class="mt-6 pt-4 border-t border-gray-100">
          <h3 class="text-sm font-semibold mb-3">CRM异常处理记录</h3>
          <dl class="audit-detail-info"><div><dt>异常原因 / 处理方式</dt><dd>{{ exceptionRecords[selectedDetail.id].reason }} / {{ exceptionRecords[selectedDetail.id].method }}</dd></div><div><dt>处理状态 / 处理人 / 处理时间</dt><dd>{{ exceptionRecords[selectedDetail.id].status }} / {{ exceptionRecords[selectedDetail.id].processor }} / {{ exceptionRecords[selectedDetail.id].processedAt }}</dd></div><div class="col-span-full"><dt>处理说明</dt><dd>{{ exceptionRecords[selectedDetail.id].note }}</dd></div></dl>
        </section>
      </div>
      <template #footer><el-button @click="detailOpen = false">关闭</el-button></template>
    </el-drawer>

    <el-drawer v-model="exceptionDrawerOpen" :with-header="false" size="640px">
      <div class="flex h-full min-h-0 flex-col">
        <div class="flex shrink-0 items-start justify-between border-b border-gray-200/80 pb-5">
          <div class="flex items-start gap-3">
            <div class="mt-0.5 flex h-9 w-9 items-center justify-center rounded-lg bg-red-50 text-red-600">
              <i class="fas fa-triangle-exclamation text-sm"></i>
            </div>
            <div>
              <div class="text-base font-bold leading-5 text-gray-800">异常处理</div>
              <div class="mt-1.5 text-xs leading-4 text-gray-400">记录当前异常对账明细的处理信息</div>
            </div>
          </div>
          <button class="flex h-8 w-8 items-center justify-center rounded-md text-gray-400 transition-colors hover:bg-gray-50 hover:text-gray-600" type="button" @click="exceptionDrawerOpen = false">
            <i class="fas fa-times text-sm"></i>
          </button>
        </div>

        <div v-if="selectedException" class="min-h-0 flex-1 overflow-y-auto py-5 pr-1">
          <section class="mb-5 rounded-xl bg-gray-50/80 px-4 py-3.5">
            <div class="mb-3 flex items-center justify-between">
              <div class="text-sm font-semibold text-gray-800">异常记录基础信息</div>
              <span class="pill pill-red">{{ selectedException.closeOrderNo }}</span>
            </div>
            <div class="grid grid-cols-2 gap-x-8 gap-y-3">
              <div class="min-w-0"><div class="text-[11px] leading-4 text-gray-400">对账日期</div><div class="mt-0.5 truncate text-[13px] font-medium text-gray-700">{{ selectedException.reconciliationDate }}</div></div>
              <div class="min-w-0"><div class="text-[11px] leading-4 text-gray-400">平仓单号</div><div class="mt-0.5 truncate text-[13px] font-medium text-gray-700">{{ selectedException.closeOrderNo }}</div></div>
              <div class="min-w-0"><div class="text-[11px] leading-4 text-gray-400">账户类型</div><div class="mt-0.5 truncate text-[13px] font-medium text-gray-700">{{ selectedException.accountType }}</div></div>
              <div class="min-w-0"><div class="text-[11px] leading-4 text-gray-400">客户姓名</div><div class="mt-0.5 truncate text-[13px] font-medium text-gray-700">{{ selectedException.customerName }}</div></div>
              <div class="min-w-0"><div class="text-[11px] leading-4 text-gray-400">MT账号</div><div class="mt-0.5 truncate text-[13px] font-medium text-gray-700">{{ selectedException.mtAccount }}</div></div>
              <div class="min-w-0"><div class="text-[11px] leading-4 text-gray-400">交易手数</div><div class="mt-0.5 truncate text-[13px] font-medium text-gray-700">{{ selectedException.lots }}</div></div>
              <div class="min-w-0"><div class="text-[11px] leading-4 text-gray-400">应返佣人数</div><div class="mt-0.5 truncate text-[13px] font-medium text-gray-700">{{ selectedException.expectedPeople }}</div></div>
              <div class="min-w-0"><div class="text-[11px] leading-4 text-gray-400">实返佣人数</div><div class="mt-0.5 truncate text-[13px] font-medium text-gray-700">{{ selectedException.actualPeople }}</div></div>
              <div class="min-w-0"><div class="text-[11px] leading-4 text-gray-400">应返佣金额</div><div class="mt-0.5 truncate text-[13px] font-medium text-gray-700">{{ selectedException.expectedAmount }}</div></div>
              <div class="min-w-0"><div class="text-[11px] leading-4 text-gray-400">实际返佣金额</div><div class="mt-0.5 truncate text-[13px] font-medium text-gray-700">{{ selectedException.actualAmount }}</div></div>
              <div class="min-w-0"><div class="text-[11px] leading-4 text-gray-400">金额差额</div><div class="mt-0.5 truncate text-[13px] font-semibold text-red-600">{{ selectedException.amountDifference }}</div></div>
              <div class="min-w-0"><div class="text-[11px] leading-4 text-gray-400">返佣条数差</div><div class="mt-0.5 truncate text-[13px] font-semibold text-red-600">{{ selectedException.rebateDifference }}</div></div>
            </div>
          </section>

          <section class="exception-processing-card mb-5 rounded-xl bg-gray-50/80 px-4 py-4">
            <div class="mb-4 flex items-center justify-between">
              <div class="text-sm font-semibold text-gray-800">异常处理信息</div>
            </div>
            <div class="space-y-5">
              <div>
                <label class="mb-2 block text-[13px] font-medium text-gray-600"><span class="text-red-500">*</span> 异常原因</label>
                <select v-model="exceptionForm.reason" :class="['custom-select', 'exception-form-select', 'w-full', !exceptionForm.reason ? 'text-gray-400' : 'text-gray-700']">
                  <option value="">请选择异常原因</option>
                  <option v-for="item in exceptionReasons" :key="item" :value="item">{{ item }}</option>
                </select>
              </div>
              <div>
                <label class="mb-2 block text-[13px] font-medium text-gray-600"><span class="text-red-500">*</span> 处理方式</label>
                <select v-model="exceptionForm.method" :class="['custom-select', 'exception-form-select', 'w-full', !exceptionForm.method ? 'text-gray-400' : 'text-gray-700']">
                  <option value="">请选择处理方式</option>
                  <option v-for="item in handlingMethods" :key="item" :value="item">{{ item }}</option>
                </select>
              </div>
              <div>
                <label class="mb-2 block text-[13px] font-medium text-gray-600"><span class="text-red-500">*</span> 处理说明</label>
                <textarea v-model="exceptionForm.note" class="custom-input exception-form-textarea h-28 min-h-[112px] w-full resize-y rounded-md" placeholder="请说明异常原因、实际处理过程和最终处理结果"></textarea>
              </div>
            </div>
          </section>

          <section v-if="exceptionForm.status === '已处理' || exceptionForm.processor || exceptionForm.processedAt" class="rounded-xl bg-gray-50/80 px-4 py-3.5">
            <div class="mb-3 flex items-center gap-2">
              <i class="fas fa-clock-rotate-left text-xs text-gray-400"></i>
              <div class="text-sm font-semibold text-gray-800">处理信息</div>
            </div>
            <div class="grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4">
              <div>
                <div class="text-[11px] leading-4 text-gray-400">处理状态</div>
                <div class="mt-1.5"><span :class="exceptionForm.status === '已处理' ? 'pill pill-green' : 'pill pill-orange'">{{ exceptionForm.status }}</span></div>
              </div>
              <div>
                <div class="text-[11px] leading-4 text-gray-400">处理人</div>
                <div class="mt-1 text-[13px] font-medium leading-5 text-gray-700">{{ exceptionForm.processor || '保存后自动记录' }}</div>
              </div>
              <div>
                <div class="text-[11px] leading-4 text-gray-400">处理时间</div>
                <div class="mt-1 text-[13px] font-medium leading-5 text-gray-700">{{ exceptionForm.processedAt || '保存后自动记录' }}</div>
              </div>
            </div>
          </section>
        </div>

        <div class="flex shrink-0 items-center justify-end gap-3 border-t border-gray-200/80 bg-white pt-4">
          <button class="h-9 rounded-md border border-gray-200 bg-white px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-50" type="button" @click="exceptionDrawerOpen = false">取消</button>
          <button class="h-9 rounded-md bg-[#C19B5E] px-4 text-sm font-medium text-white transition-colors hover:bg-[#B28B52]" type="button" @click="saveExceptionRecord">确认处理</button>
        </div>
      </div>
    </el-drawer>
  </div>
</template>

<script setup>
import { computed, reactive, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { commissionAuditBatches, summarizeBatch, recipientMtAmount, recipientMtResult } from '@/store/commissionAuditDemo'
import { ElMessage } from 'element-plus'

const exceptionDrawerOpen = ref(false)
const selectedException = ref(null)
const processingStatusFilter = ref('all')
const exceptionRecords = reactive({
  'CL-50881': {
    reason: '返佣金额不一致',
    method: '重新同步',
    note: '确认该美分账户的返佣金额与系统同步结果不一致，已重新同步返佣数据，最终金额已恢复一致。',
    status: '已处理',
    processor: '审核员-王浩',
    processedAt: '2026-08-11 09:20:18'
  }
})
const exceptionForm = reactive({
  reason: '',
  method: '',
  note: '',
  status: '待处理',
  processor: '',
  processedAt: ''
})

const exceptionReasons = ['返佣金额不一致', '返佣人数不一致', 'MT数据异常', '数据同步异常', '其他']
const handlingMethods = ['重新同步', '人工核对', '人工调整', '补发返佣', '其他']

const getProcessingStatus = (id, reconciliationResult) => {
  if (reconciliationResult === '正常') return '已处理'
  return exceptionRecords[id]?.status || '未处理'
}

const matchesProcessingStatus = (id, reconciliationResult) => {
  return processingStatusFilter.value === 'all' || getProcessingStatus(id, reconciliationResult) === processingStatusFilter.value
}

const openExceptionDrawer = (id) => {
  const row = exceptionRows.value[id]
  if (!row) return
  selectedException.value = row
  Object.assign(exceptionForm, exceptionRecords[id] || {
    reason: '',
    method: '',
    note: '',
    status: '待处理',
    processor: '',
    processedAt: ''
  })
  exceptionDrawerOpen.value = true
}

const formatCurrentTime = () => {
  const now = new Date()
  const pad = (value) => String(value).padStart(2, '0')
  return `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())} ${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`
}

const saveExceptionRecord = () => {
  if (!selectedException.value) return
  if (!exceptionForm.reason) {
    ElMessage.warning('请选择异常原因')
    return
  }
  if (!exceptionForm.method) {
    ElMessage.warning('请选择处理方式')
    return
  }
  if (!exceptionForm.note.trim()) {
    ElMessage.warning('请填写处理说明')
    return
  }
  const id = selectedException.value.closeOrderNo.replace('#', '')
  const record = {
    reason: exceptionForm.reason,
    method: exceptionForm.method,
    note: exceptionForm.note.trim(),
    status: '已处理',
    processor: '当前操作人',
    processedAt: formatCurrentTime()
  }
  exceptionRecords[id] = record
  Object.assign(exceptionForm, record)
  ElMessage.success('异常处理已确认')
}

const route = useRoute()
const auditDate = ref(typeof route.query.date === 'string' ? route.query.date : '2026-08-11')
const accountTypeFilter = ref('all')
const crmStatusFilter = ref('all')
const search = ref('')
const page = ref(1)
const pageSize = ref(20)
const detailOpen = ref(false)
const selectedDetail = ref(null)
const currentBatch = computed(() => commissionAuditBatches[auditDate.value] || null)
const rows = computed(() => currentBatch.value?.rows || [])
const summary = computed(() => currentBatch.value ? summarizeBatch(rows.value) : null)
const countCrmDifference = computed(() => summary.value ? summary.value.crmCount - summary.value.expectedCount : null)
const countMtDifference = computed(() => summary.value ? summary.value.mtCount - summary.value.crmCount : null)
const amountCrmDifference = computed(() => summary.value ? summary.value.crmAmount - summary.value.expectedAmount : null)
const amountMtDifference = computed(() => summary.value?.mtAmount != null ? summary.value.mtAmount - summary.value.crmAmount : null)
const hasValue = value => typeof value === 'number' && Number.isFinite(value)
const money = value => hasValue(value) ? `$${(Math.abs(value) / 10000).toLocaleString('en-US', { minimumFractionDigits: value % 100 === 0 ? 2 : 4, maximumFractionDigits: 4 })}` : '—'
const signedMoney = value => hasValue(value) ? `${value > 0 ? '+' : value < 0 ? '-' : ''}${money(value)}` : '—'
const signedCount = value => hasValue(value) ? `${value > 0 ? '+' : ''}${value}` : '—'
const differenceClass = value => !hasValue(value) ? 'text-gray-400' : value === 0 ? 'text-emerald-600' : 'text-red-600'
const mtStatusClass = status => !status ? 'text-gray-400' : status === '正常' ? 'pill pill-green' : status === '待核实' ? 'pill pill-orange' : 'pill pill-red'
const recipientDifference = recipient => recipientMtAmount(recipient) === null ? null : recipientMtAmount(recipient) - recipient.crmAmount
const openDetail = row => { selectedDetail.value = row; detailOpen.value = true }

const filteredRows = computed(() => {
  const keyword = search.value.trim().toLowerCase()
  return rows.value.filter(row =>
    (accountTypeFilter.value === 'all' || row.accountType === accountTypeFilter.value) &&
    (crmStatusFilter.value === 'all' || row.crmStatus === crmStatusFilter.value) &&
    matchesProcessingStatus(row.id, row.crmStatus) &&
    (!keyword || [row.id, row.customer, row.account].some(value => value.toLowerCase().includes(keyword)))
  ).sort((a, b) => Number(b.crmStatus === '异常') - Number(a.crmStatus === '异常'))
})
const pageCount = computed(() => Math.max(1, Math.ceil(filteredRows.value.length / pageSize.value)))
const pagedRows = computed(() => filteredRows.value.slice((page.value - 1) * pageSize.value, page.value * pageSize.value))
const pageNumbers = computed(() => {
  const start = Math.max(1, Math.min(page.value - 2, pageCount.value - 4))
  return Array.from({ length: Math.min(5, pageCount.value) }, (_, index) => start + index)
})
watch([auditDate, accountTypeFilter, crmStatusFilter, processingStatusFilter, search, pageSize], () => { page.value = 1 })
watch(pageCount, count => { if (page.value > count) page.value = count })
watch(auditDate, () => { detailOpen.value = false; exceptionDrawerOpen.value = false })
watch(() => route.query.date, date => { if (typeof date === 'string') auditDate.value = date })

// 沿用原异常处理字段和保存流程，只从当前批次的同一份明细生成只读展示数据。
const exceptionRows = computed(() => Object.fromEntries(rows.value.filter(row => row.crmStatus === '异常').map(row => [row.id, {
  reconciliationDate: row.date, closeOrderNo: `#${row.id}`, accountType: row.accountType,
  customerName: row.customer, mtAccount: row.account, lots: row.lots,
  expectedPeople: `${row.expectedPeople} 人`, actualPeople: `${row.crmPeople} 人`,
  expectedAmount: money(row.expectedAmount), actualAmount: money(row.crmAmount),
  amountDifference: signedMoney(row.crmDifference), rebateDifference: `${signedCount(row.crmPeople - row.expectedPeople)} 条`
}])))

const exportAudit = () => {
  if (!filteredRows.value.length) { ElMessage.warning('暂无可导出的演示明细'); return }
  const headers = ['平仓单号', '账户类型', '客户姓名', 'MT账号', '交易手数', '应返佣人数', 'CRM返佣人数', 'MT返佣人数', '应返佣金额(USD)', 'CRM返佣金额(USD)', 'MT返佣金额(USD)', '对账结果', 'MT对账结果', '处理状态', 'CRM金额差额(USD)', '返佣条数差']
  const content = filteredRows.value.map(row => [row.id, row.accountType, row.customer, row.account, row.lots, row.expectedPeople, row.crmPeople, row.mtPeople ?? '—', money(row.expectedAmount), money(row.crmAmount), money(row.mtAmount), row.crmStatus, row.mtStatus || '—', getProcessingStatus(row.id, row.crmStatus), signedMoney(row.crmDifference), row.crmPeople - row.expectedPeople])
  const escape = value => `"${String(value).replaceAll('"', '""')}"`
  const blob = new Blob(['\uFEFF' + [headers, ...content].map(row => row.map(escape).join(',')).join('\r\n')], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const anchor = document.createElement('a')
  anchor.href = url
  anchor.download = `对账明细-演示-${auditDate.value}.csv`
  anchor.click()
  setTimeout(() => URL.revokeObjectURL(url), 1000)
  ElMessage.success('已导出当前筛选结果（演示数据）')
}
</script>

<style scoped>
.reconciliation-detail-table-card {
  overflow: visible;
}

.reconciliation-detail-table-scroll {
  overflow-x: auto;
  overflow-y: visible;
}

.commission-detail-table {
  border-collapse: separate;
  border-spacing: 0;
  color: #374151;
  font-size: 13px;
}

.commission-detail-table thead th {
  height: 56px;
  padding: 0 16px;
  background: #fbfcfd;
  border-bottom: 1px solid #edf0f2;
  color: #6b7280;
  font-size: 12px;
  font-weight: 600;
  line-height: 18px;
  text-align: left;
  vertical-align: middle;
  white-space: nowrap;
}

.commission-detail-table tbody td {
  height: 60px;
  padding: 12px 16px;
  border-bottom: 1px solid #f1f3f5;
  line-height: 20px;
  text-align: left;
  vertical-align: middle;
  white-space: nowrap;
}

.commission-detail-table tbody tr:last-child td {
  border-bottom: 0;
}

.commission-detail-table tbody td:last-child > .flex {
  justify-content: flex-start;
  gap: 12px;
  min-width: 142px;
}

.commission-detail-table tbody td:last-child button {
  padding-left: 0;
  text-align: left;
}

.commission-detail-table tbody tr:not(.diff-row) td:nth-child(4) span {
  color: #374151 !important;
}

.reconciliation-customer {
  min-width: 150px;
  line-height: 20px;
}

.exception-processing-card {
  border: 1px solid #f1f3f5;
}

.exception-form-select {
  height: 40px;
  padding: 0 38px 0 12px;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  background-color: #fff;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='14' height='14' viewBox='0 0 24 24' fill='none' stroke='%239ca3af' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E");
  background-position: right 12px center;
  background-repeat: no-repeat;
  background-size: 14px 14px;
  color: #374151;
  font-size: 13px;
  line-height: 20px;
  outline: none;
  transition: border-color 0.15s ease, box-shadow 0.15s ease;
  appearance: none;
}

.exception-form-select:focus {
  border-color: #c19b5e;
  box-shadow: 0 0 0 3px rgba(193, 155, 94, 0.12);
}

.exception-form-textarea {
  border: 1px solid #d1d5db;
  background: #fff;
  padding: 10px 12px;
  color: #374151;
  font-size: 13px;
  line-height: 20px;
  outline: none;
  transition: border-color 0.15s ease, box-shadow 0.15s ease;
}

.exception-form-textarea::placeholder {
  color: #9ca3af;
}

.exception-form-textarea:focus {
  border-color: #c19b5e;
  box-shadow: 0 0 0 3px rgba(193, 155, 94, 0.12);
}

.reconciliation-detail-pagination {
  min-height: 64px;
  background: #fff;
}

.audit-kpis { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 24px; }
.audit-metrics { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); padding: 18px 8px; }
.audit-metrics > div { padding: 0 10px; min-width: 0; }
.audit-metrics > div + div { border-left: 1px solid #e5e7eb; }
.metric-label { font-size: 12px; color: #6b7280; margin-bottom: 8px; }
.audit-metrics strong { font-size: clamp(16px, 1.4vw, 22px); font-variant-numeric: tabular-nums; color: #1f2937; overflow-wrap: anywhere; }
.metric-unit { font-size: 12px; color: #6b7280; margin-left: 4px; }
.audit-differences { display: flex; flex-wrap: wrap; gap: 10px 24px; padding: 16px 0; font-size: 12px; color: #6b7280; }
.audit-differences b { margin-left: 6px; font-variant-numeric: tabular-nums; }
.page-button { height: 32px; min-width: 32px; border: 1px solid #e5e7eb; border-radius: 4px; background: white; color: #6b7280; }
.page-button:hover:not(:disabled) { background: #f9fafb; }
.page-button.page-current { background: #2563eb; color: white; border-color: #2563eb; }
.page-button:disabled { opacity: .4; cursor: not-allowed; }
.commission-detail-table tbody tr:hover { background-color: #f9fafb; }
.audit-detail-info { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 16px 24px; font-size: 13px; }
.audit-detail-info dt { color: #6b7280; font-size: 12px; margin-bottom: 5px; }
.audit-detail-info dd { color: #374151; overflow-wrap: anywhere; }
.audit-credit-table { width: 100%; border-collapse: collapse; font-size: 13px; color: #374151; }
.audit-credit-table th, .audit-credit-table td { text-align: left; padding: 14px 16px; border-bottom: 1px solid #edf0f2; white-space: nowrap; vertical-align: top; font-variant-numeric: tabular-nums; }
.audit-credit-table th { color: #6b7280; background: #fbfcfd; font-weight: 600; }
.ledger-line { min-height: 24px; line-height: 24px; }
@media (max-width: 1200px) { .audit-kpis { grid-template-columns: minmax(0, 1fr); } }
@media (max-width: 600px) { .audit-metrics { grid-template-columns: minmax(0, 1fr); gap: 16px; } .audit-metrics > div + div { border-left: 0; } .audit-detail-info { grid-template-columns: minmax(0, 1fr); } }
</style>
