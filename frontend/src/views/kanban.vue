<template>
  <div class="flex-1 overflow-y-auto p-4 md:p-4 relative custom-scrollbar bg-gray-50 w-full text-xs">
    
<div class="max-w-screen-2xl mx-auto">
<!-- 页面头部 -->
<div class="mb-4 flex justify-between items-end">
<div>
<h1 class="text-xl font-bold text-gray-800 mb-1">CRM 需求总看板 (活文档)</h1>
<p class="text-xs text-gray-500">唯一事实来源 (SSOT) - 按需求层级化管理</p>
</div>
<div class="flex items-center gap-3">
<router-link to="/history-kanban" class="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded text-xs font-medium transition-colors flex items-center">
<i class="fa-solid fa-clock-rotate-left mr-1.5"></i> 历史需求记录
</router-link>
<div class="text-xs text-gray-500 bg-white px-3 py-1.5 rounded shadow-sm border border-gray-200">
<i class="fas fa-layer-group text-[#55B9B9] mr-2"></i>包含系统：CRM-HK、Crm-Group、HK官网、Group官网
                </div>
<span class="px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-bold border border-green-200">
<i class="fas fa-circle-check text-[10px] mr-1"></i> 最新状态: 同步更新中
                </span>
</div>
</div>
<!-- 研发中需求 -->
<div class="mb-6 bg-orange-50/20 rounded-lg border border-orange-100 overflow-hidden">
<div class="px-4 py-3 border-b border-orange-100 bg-orange-50/40 flex items-center justify-between">
<div class="flex items-center gap-2">
<h2 class="text-base font-bold text-gray-800 flex items-center gap-2">
<i class="fa-solid fa-fire text-orange-500"></i> 研发中需求
                    </h2>
<div class="flex items-center gap-2">
<span class="text-[10px] font-medium text-orange-700 bg-orange-100 px-2 py-0.5 rounded border border-orange-200/60">研发中</span>
<span class="text-[10px] font-medium text-orange-700 bg-orange-100/60 px-2 py-0.5 rounded border border-orange-200/40">优先处理</span>
</div>
</div>
</div>
<!-- 需求列表容器 -->
<div class="p-4 flex flex-col gap-3 bg-orange-50/10">
<!-- 对账（新增父级菜单） -->
<div class="bg-white rounded-lg border border-gray-100 overflow-hidden accordion-item">
<div @click="toggleElement($event)" class="px-4 py-3 cursor-pointer hover:bg-orange-50/50 transition-colors flex justify-between items-center">
<div class="flex flex-col gap-1">
<div class="flex items-center gap-3">
<span class="bg-orange-100 text-orange-700 px-2 py-1 rounded text-xs font-bold">财务对账</span>
<h3 class="text-base font-bold text-gray-800">对账</h3>
</div>
<p class="text-xs text-gray-500 mt-1">系统资金对账：CRM业务账本与MT底层资金比对，抓取异常。</p>
</div>
<div class="flex items-center gap-3 text-gray-400">
<span class="text-xs bg-gray-100 px-2 py-1 rounded">包含 2 个页面</span>
<i class="fas fa-chevron-down accordion-icon"></i>
</div>
</div>
<div class="accordion-content border-t border-gray-100">
<div class="overflow-x-auto no-scrollbar">
<table class="min-w-full text-xs text-left">
<thead>
<tr class="bg-gray-50 text-gray-600 border-b border-gray-200">
<th class="px-4 py-2 font-medium whitespace-nowrap w-[220px]">页面/任务名称</th>
<th class="px-4 py-2 font-medium min-w-[260px]">概述</th>
<th class="px-4 py-2 font-medium whitespace-nowrap w-[150px]">所属客户端</th>
<th class="px-4 py-2 font-medium min-w-[280px]">交付物导航 (直达链接)</th>
</tr>
</thead>
<tbody class="divide-y divide-gray-100">
<tr class="table-row-hover">
<td class="px-4 py-3 font-bold text-gray-800">对账管理 - 每日对账日志</td>
<td class="px-4 py-3 text-gray-500">
                                            记录每天 (T-1) 系统全局资金对账的结果（总入金、总出金、总差异笔数及状态）。对于异常批次可添加异常说明。
                                        </td>
<td class="px-4 py-3">
<span class="inline-block px-2 py-0.5 text-[11px] rounded tag-group w-max">Group(含HK)</span>
</td>
<td class="px-4 py-3">
<div class="flex flex-wrap gap-2 items-center">
<a class="text-blue-600 hover:text-blue-800 hover:underline text-xs font-medium transition-colors" href="#/other/reconciliation-daily-record" target="_blank">
                                                    原型
                                                </a>
<a class="inline-flex items-center gap-1 bg-amber-50 hover:bg-amber-100 text-amber-700 border border-amber-200 px-3 py-1.5 rounded text-xs transition-colors font-medium" href="#/other/prd-reconciliation-daily-record" target="_blank">
                                                    PRD
                                                </a>
</div>
</td>
</tr>
<tr class="table-row-hover">
<td class="px-4 py-3 font-bold text-gray-800">对账管理 - 异常看板</td>
<td class="px-4 py-3 text-gray-500">
                                            按 T+1 维度比对 CRM 成功记录与 MT 底层流水，仅罗列差异账号，供财务排查使用（无修改操作）。
                                        </td>
<td class="px-4 py-3">
<span class="inline-block px-2 py-0.5 text-[11px] rounded tag-group w-max">Group(含HK)</span>
</td>
<td class="px-4 py-3">
<div class="flex flex-wrap gap-2 items-center">
<a class="text-blue-600 hover:text-blue-800 hover:underline text-xs font-medium transition-colors" href="#/other/reconciliation-internal" target="_blank">
                                                    原型
                                                </a>
</div>
</td>
</tr>
</tbody>
</table>
</div>
</div>
</div>

<div class="bg-white rounded-lg border border-gray-100 overflow-hidden accordion-item">
<div @click="toggleElement($event)" class="px-4 py-3 cursor-pointer hover:bg-orange-50/50 transition-colors flex justify-between items-center">
<div class="flex flex-col gap-1">
<div class="flex items-center gap-3">
<span class="bg-orange-100 text-orange-700 px-2 py-1 rounded text-xs font-bold">佣金管理</span>
<h3 class="text-base font-bold text-gray-800">销售差异化阶梯返佣配置</h3>
</div>
<p class="text-xs text-gray-500 mt-1">支持团队净入金阶梯返佣的默认规则，并可按代理、按 MT 分组配置差异化阶梯。</p>
</div>
<div class="flex items-center gap-3 text-gray-400">
<span class="text-xs bg-gray-100 px-2 py-1 rounded">包含 2 个页面</span>
<i class="fas fa-chevron-down accordion-icon"></i>
</div>
</div>
<div class="accordion-content border-t border-gray-100">
<div class="overflow-x-auto no-scrollbar">
<table class="min-w-full text-xs text-left">
<thead>
<tr class="bg-gray-50 text-gray-600 border-b border-gray-200">
<th class="px-4 py-2 font-medium whitespace-nowrap w-[220px]">页面/任务名称</th>
<th class="px-4 py-2 font-medium min-w-[260px]">概述</th>
<th class="px-4 py-2 font-medium whitespace-nowrap w-[150px]">所属客户端</th>
<th class="px-4 py-2 font-medium min-w-[280px]">交付物导航 (直达链接)</th>
</tr>
</thead>
<tbody class="divide-y divide-gray-100">
<tr class="table-row-hover" style="display:none;">
<td class="px-4 py-3 font-bold text-gray-800">销售列表（佣金管理）</td>
<td class="px-4 py-3 text-gray-500">展示销售配置列表，并通过顶部 PRD 按钮查看需求文档。</td>
<td class="px-4 py-3"><span class="inline-block px-2 py-0.5 text-[11px] rounded tag-group w-max">Group(含HK)</span></td>
<td class="px-4 py-3">
<div class="flex flex-wrap gap-2 items-center">
<a class="text-blue-600 hover:text-blue-800 hover:underline text-xs font-medium transition-colors" href="#/commission/sales-list" target="_blank">原型</a>
<button type="button" class="inline-flex items-center gap-1 bg-amber-50 hover:bg-amber-100 text-amber-700 border border-amber-200 px-3 py-1.5 rounded text-xs transition-colors font-medium" @click="openSalesDifferentialTierRebatePrd">
<i class="fas fa-file-alt"></i> PRD
</button>
</div>
</td>
</tr>
<tr class="table-row-hover">
<td class="px-4 py-3 font-bold text-gray-800">新增销售（阶梯返佣配置）</td>
<td class="px-4 py-3 text-gray-500">配置默认阶梯与差异化代理/MT 分组阶梯规则（演示交互）。</td>
<td class="px-4 py-3"><span class="inline-block px-2 py-0.5 text-[11px] rounded tag-group w-max">Group(含HK)</span></td>
<td class="px-4 py-3">
<div class="flex flex-wrap gap-2 items-center">
<a class="text-blue-600 hover:text-blue-800 hover:underline text-xs font-medium transition-colors" href="#/commission/sales-list/create" target="_blank">原型</a>
<button type="button" class="inline-flex items-center gap-1 bg-amber-50 hover:bg-amber-100 text-amber-700 border border-amber-200 px-3 py-1.5 rounded text-xs transition-colors font-medium" @click="openSalesDifferentialTierRebatePrd">
<i class="fas fa-file-alt"></i> PRD
</button>
</div>
</td>
</tr>
</tbody>
</table>
</div>
</div>
</div>

<div class="bg-white rounded-lg border border-gray-100 overflow-hidden accordion-item">
<div @click="toggleElement($event)" class="px-4 py-3 cursor-pointer hover:bg-orange-50/50 transition-colors flex justify-between items-center">
<div class="flex flex-col gap-1">
<div class="flex items-center gap-3 flex-wrap">
<span class="bg-orange-100 text-orange-700 px-2 py-1 rounded text-xs font-bold">活动管理</span>
<h3 class="text-base font-bold text-gray-800">先锋一号 50,000 USD 体验金盈利释放管理</h3>
</div>
<p class="text-xs text-gray-500 mt-1">复用现有活动参加与活动审核流程：客户提交参加申请（模拟账户账号+截图），后台资格审核通过后从通过时间开始累计净入金，逐档触发盈利释放；Lot 按累计目标计算不清零。</p>
</div>
<div class="flex items-center gap-3 text-gray-400">
<span class="text-xs bg-gray-100 px-2 py-1 rounded">包含 3 个任务</span>
<i class="fas fa-chevron-down accordion-icon"></i>
</div>
</div>
<div class="accordion-content border-t border-gray-100">
<div class="overflow-x-auto no-scrollbar">
<table class="min-w-full text-xs text-left">
<thead>
<tr class="bg-gray-50 text-gray-600 border-b border-gray-200">
<th class="px-4 py-2 font-medium whitespace-nowrap w-[220px]">页面/任务名称</th>
<th class="px-4 py-2 font-medium min-w-[260px]">概述</th>
<th class="px-4 py-2 font-medium whitespace-nowrap w-[150px]">所属客户端</th>
<th class="px-4 py-2 font-medium min-w-[280px]">交付物导航 (直达链接)</th>
</tr>
</thead>
<tbody class="divide-y divide-gray-100">
<tr class="table-row-hover">
<td class="px-4 py-3 font-bold text-gray-800">客户参加弹窗（沿用现有参加方式）</td>
<td class="px-4 py-3 text-gray-500">字段：HATC参与MT账号、模拟账户账号、模拟账户截图、活动条款确认；提交参加活动申请。</td>
<td class="px-4 py-3"><span class="inline-block px-2 py-0.5 text-[11px] rounded tag-group w-max">Group(含HK)</span></td>
<td class="px-4 py-3">
<div class="flex flex-wrap gap-2 items-center">
<a class="text-blue-600 hover:text-blue-800 hover:underline text-xs font-medium transition-colors" href="#/home?join=pioneer-one-50000" target="_blank">原型</a>
<button type="button" class="inline-flex items-center gap-1 bg-amber-50 hover:bg-amber-100 text-amber-700 border border-amber-200 px-3 py-1.5 rounded text-xs transition-colors font-medium" @click="openPioneerOnePrd">
<i class="fas fa-file-alt"></i> PRD
</button>
</div>
</td>
</tr>
<tr class="table-row-hover">
<td class="px-4 py-3 font-bold text-gray-800">先锋一号 50,000 USD 活动详情</td>
<td class="px-4 py-3 text-gray-500">活动详情页原型入口（复用现有“先锋体验活动详情”结构）。</td>
<td class="px-4 py-3"><span class="inline-block px-2 py-0.5 text-[11px] rounded tag-group w-max">Group(含HK)</span></td>
<td class="px-4 py-3">
<div class="flex flex-wrap gap-2 items-center">
<a class="text-blue-600 hover:text-blue-800 hover:underline text-xs font-medium transition-colors" href="#/activity/pioneer-one-50000-detail" target="_blank">原型</a>
<button type="button" class="inline-flex items-center gap-1 bg-amber-50 hover:bg-amber-100 text-amber-700 border border-amber-200 px-3 py-1.5 rounded text-xs transition-colors font-medium" @click="openPioneerOnePrd">
<i class="fas fa-file-alt"></i> PRD
</button>
</div>
</td>
</tr>
<tr class="table-row-hover">
<td class="px-4 py-3 font-bold text-gray-800">先锋一号 50,000 USD 活动审核</td>
<td class="px-4 py-3 text-gray-500">活动管理 &gt; 活动审核：支持筛选申请活动=先锋一号 50,000 USD 体验金活动。</td>
<td class="px-4 py-3"><span class="inline-block px-2 py-0.5 text-[11px] rounded tag-group w-max">Group(含HK)</span></td>
<td class="px-4 py-3">
<div class="flex flex-wrap gap-2 items-center">
<a class="text-blue-600 hover:text-blue-800 hover:underline text-xs font-medium transition-colors" href="#/activity/audit" target="_blank">原型</a>
<button type="button" class="inline-flex items-center gap-1 bg-amber-50 hover:bg-amber-100 text-amber-700 border border-amber-200 px-3 py-1.5 rounded text-xs transition-colors font-medium" @click="openPioneerOneAuditPrd">
<i class="fas fa-file-alt"></i> PRD
</button>
</div>
</td>
</tr>
</tbody>
</table>
</div>
</div>
</div>

<div class="bg-white rounded-lg border border-gray-100 overflow-hidden accordion-item">
<div @click="toggleElement($event)" class="px-4 py-3 cursor-pointer hover:bg-orange-50/50 transition-colors flex justify-between items-center">
<div class="flex flex-col gap-1">
<div class="flex items-center gap-3 flex-wrap">
<span class="bg-orange-100 text-orange-700 px-2 py-1 rounded text-xs font-bold">系统管理</span>
<span class="bg-orange-100 text-orange-700 px-2 py-1 rounded text-xs font-bold">支付配置</span>
<h3 class="text-base font-bold text-gray-800">支付设置 - 配置记录</h3>
</div>
<p class="text-xs text-gray-500 mt-1">包含配置日志与业务汇率记录；仅当真实入金业务实际使用了汇率时才生成汇率记录（查询接口/页面展示/人工查看均不记录）。</p>
</div>
<div class="flex items-center gap-3 text-gray-400">
<span class="text-xs bg-gray-100 px-2 py-1 rounded">包含 2 个模块</span>
<i class="fas fa-chevron-down accordion-icon"></i>
</div>
</div>
<div class="accordion-content border-t border-gray-100">
<div class="overflow-x-auto no-scrollbar">
<table class="min-w-full text-xs text-left">
<thead>
<tr class="bg-gray-50 text-gray-600 border-b border-gray-200">
<th class="px-4 py-2 font-medium whitespace-nowrap w-[220px]">页面/任务名称</th>
<th class="px-4 py-2 font-medium min-w-[260px]">概述</th>
<th class="px-4 py-2 font-medium whitespace-nowrap w-[150px]">所属客户端</th>
<th class="px-4 py-2 font-medium min-w-[280px]">交付物导航 (直达链接)</th>
</tr>
</thead>
<tbody class="divide-y divide-gray-100">
<tr class="table-row-hover">
<td class="px-4 py-3 font-bold text-gray-800">配置日志</td>
<td class="px-4 py-3 text-gray-500">记录操作人、时间与配置项修改前后对比，单次多字段变更合并展示。</td>
<td class="px-4 py-3"><span class="inline-block px-2 py-0.5 text-[11px] rounded tag-group w-max">Group(含HK)</span></td>
<td class="px-4 py-3">
<div class="flex flex-wrap gap-2 items-center">
<a class="text-blue-600 hover:text-blue-800 hover:underline text-xs font-medium transition-colors" href="#/fund/payment-config-records" target="_blank">原型</a>
<button type="button" class="inline-flex items-center gap-1 bg-amber-50 hover:bg-amber-100 text-amber-700 border border-amber-200 px-3 py-1.5 rounded text-xs transition-colors font-medium" @click="openPaymentConfigRecordsPrd">
<i class="fas fa-file-alt"></i> PRD
</button>
</div>
</td>
</tr>
<tr class="table-row-hover">
<td class="px-4 py-3 font-bold text-gray-800">业务汇率记录</td>
<td class="px-4 py-3 text-gray-500">只有真实入金业务实际使用了汇率才留痕；查询、展示、人工查看不记录。</td>
<td class="px-4 py-3"><span class="inline-block px-2 py-0.5 text-[11px] rounded tag-group w-max">Group(含HK)</span></td>
<td class="px-4 py-3">
<div class="flex flex-wrap gap-2 items-center">
<a class="text-blue-600 hover:text-blue-800 hover:underline text-xs font-medium transition-colors" href="#/fund/payment-config-records" target="_blank">原型</a>
<button type="button" class="inline-flex items-center gap-1 bg-amber-50 hover:bg-amber-100 text-amber-700 border border-amber-200 px-3 py-1.5 rounded text-xs transition-colors font-medium" @click="openPaymentConfigRecordsPrd">
<i class="fas fa-file-alt"></i> PRD
</button>
</div>
</td>
</tr>
</tbody>
</table>
</div>
</div>
</div>

<div class="bg-white rounded-lg border border-gray-100 overflow-hidden accordion-item">
<div @click="toggleElement($event)" class="px-4 py-3 cursor-pointer hover:bg-orange-50/50 transition-colors flex justify-between items-center">
<div class="flex flex-col gap-1">
<div class="flex items-center gap-3 flex-wrap">
<span class="bg-orange-100 text-orange-700 px-2 py-1 rounded text-xs font-bold">系统管理</span>
<span class="bg-orange-100 text-orange-700 px-2 py-1 rounded text-xs font-bold">提现配置</span>
<h3 class="text-base font-bold text-gray-800">提现设置 - 配置记录</h3>
</div>
<p class="text-xs text-gray-500 mt-1">包含配置日志与业务汇率记录；仅当真实出金业务实际使用了汇率时才生成汇率记录（查询接口/页面展示/人工查看均不记录）。</p>
</div>
<div class="flex items-center gap-3 text-gray-400">
<span class="text-xs bg-gray-100 px-2 py-1 rounded">包含 2 个模块</span>
<i class="fas fa-chevron-down accordion-icon"></i>
</div>
</div>
<div class="accordion-content border-t border-gray-100">
<div class="overflow-x-auto no-scrollbar">
<table class="min-w-full text-xs text-left">
<thead>
<tr class="bg-gray-50 text-gray-600 border-b border-gray-200">
<th class="px-4 py-2 font-medium whitespace-nowrap w-[220px]">页面/任务名称</th>
<th class="px-4 py-2 font-medium min-w-[260px]">概述</th>
<th class="px-4 py-2 font-medium whitespace-nowrap w-[150px]">所属客户端</th>
<th class="px-4 py-2 font-medium min-w-[280px]">交付物导航 (直达链接)</th>
</tr>
</thead>
<tbody class="divide-y divide-gray-100">
<tr class="table-row-hover">
<td class="px-4 py-3 font-bold text-gray-800">配置日志</td>
<td class="px-4 py-3 text-gray-500">记录操作人、时间与配置项修改前后对比，单次多字段变更合并展示。</td>
<td class="px-4 py-3"><span class="inline-block px-2 py-0.5 text-[11px] rounded tag-group w-max">Group(含HK)</span></td>
<td class="px-4 py-3">
<div class="flex flex-wrap gap-2 items-center">
<a class="text-blue-600 hover:text-blue-800 hover:underline text-xs font-medium transition-colors" href="#/fund/withdraw-config-records" target="_blank">原型</a>
<button type="button" class="inline-flex items-center gap-1 bg-amber-50 hover:bg-amber-100 text-amber-700 border border-amber-200 px-3 py-1.5 rounded text-xs transition-colors font-medium" @click="openWithdrawConfigRecordsPrd">
<i class="fas fa-file-alt"></i> PRD
</button>
</div>
</td>
</tr>
<tr class="table-row-hover">
<td class="px-4 py-3 font-bold text-gray-800">业务汇率记录</td>
<td class="px-4 py-3 text-gray-500">只有真实出金业务实际使用了汇率才留痕；查询、展示、人工查看不记录。</td>
<td class="px-4 py-3"><span class="inline-block px-2 py-0.5 text-[11px] rounded tag-group w-max">Group(含HK)</span></td>
<td class="px-4 py-3">
<div class="flex flex-wrap gap-2 items-center">
<a class="text-blue-600 hover:text-blue-800 hover:underline text-xs font-medium transition-colors" href="#/fund/withdraw-config-records" target="_blank">原型</a>
<button type="button" class="inline-flex items-center gap-1 bg-amber-50 hover:bg-amber-100 text-amber-700 border border-amber-200 px-3 py-1.5 rounded text-xs transition-colors font-medium" @click="openWithdrawConfigRecordsPrd">
<i class="fas fa-file-alt"></i> PRD
</button>
</div>
</td>
</tr>
</tbody>
</table>
</div>
</div>
</div>

<!-- 活动管理（新增父级菜单） 暂时隐藏 -->
<div class="bg-white rounded-lg border border-gray-100 overflow-hidden accordion-item" style="display: none;">
<div @click="toggleElement($event)" class="px-4 py-3 cursor-pointer hover:bg-orange-50/50 transition-colors flex justify-between items-center">
<div class="flex flex-col gap-1">
<div class="flex items-center gap-3">
<span class="bg-orange-100 text-orange-700 px-2 py-1 rounded text-xs font-bold">营销活动</span>
<h3 class="text-base font-bold text-gray-800">活动管理</h3>
</div>
<p class="text-xs text-gray-500 mt-1">系统各类营销活动与赠金配置相关需求。</p>
</div>
<div class="flex items-center gap-3 text-gray-400">
<span class="text-xs bg-gray-100 px-2 py-1 rounded">包含 0 个任务</span>
<i class="fas fa-chevron-down accordion-icon"></i>
</div>
</div>
<div class="accordion-content border-t border-gray-100">
<div class="overflow-x-auto no-scrollbar">
<table class="min-w-full text-xs text-left">
<thead>
<tr class="bg-gray-50 text-gray-600 border-b border-gray-200">
<th class="px-4 py-2 font-medium whitespace-nowrap w-[220px]">页面/任务名称</th>
<th class="px-4 py-2 font-medium min-w-[260px]">概述</th>
<th class="px-4 py-2 font-medium whitespace-nowrap w-[150px]">所属客户端</th>
<th class="px-4 py-2 font-medium min-w-[280px]">交付物导航 (直达链接)</th>
</tr>
</thead>
<tbody class="divide-y divide-gray-100">
<tr class="table-row-hover">
<td class="px-4 py-3 font-bold text-gray-800">注册赠金活动</td>
<td class="px-4 py-3 text-gray-500">
                                            用户注册后，赠送赠金。
                                        </td>
<td class="px-4 py-3">
<span class="inline-block px-2 py-0.5 text-[11px] rounded tag-group w-max">Group(含HK)</span>
</td>
<td class="px-4 py-3">
<div class="flex flex-wrap gap-2 items-center">
<a class="kb-btn kb-btn-proto inline-flex items-center gap-1 bg-teal-50 hover:bg-teal-100 theme-text px-3 py-1.5 rounded text-xs transition-colors theme-border border" href="#/activity/bonus-list" target="_blank">
<i class="fas fa-desktop text-gray-400"></i> 原型
                                                </a>
<a class="kb-btn kb-btn-prd inline-flex items-center gap-1 bg-amber-50 hover:bg-amber-100 text-amber-700 border border-amber-200 px-3 py-1.5 rounded text-xs transition-colors font-medium" href="#/other/prd-bonus-activity" target="_blank">
<i class="fas fa-file-alt"></i> PRD
                                                </a>
</div>
</td>
</tr>
<tr class="table-row-hover">
<td class="px-4 py-3 font-bold text-gray-800">赠金详情</td>
<td class="px-4 py-3 text-gray-500">展示赠金活动的配置信息以及获得奖励的用户列表。</td>
<td class="px-4 py-3"><span class="inline-block px-2 py-0.5 text-[11px] rounded tag-group w-max">Group(含HK)</span></td>
<td class="px-4 py-3">
<div class="flex flex-wrap gap-2 items-center">
<a class="kb-btn kb-btn-proto inline-flex items-center gap-1 bg-teal-50 hover:bg-teal-100 theme-text px-3 py-1.5 rounded text-xs transition-colors theme-border border" href="#/activity/bonus-detail" target="_blank">
<i class="fas fa-desktop text-gray-400"></i> 原型
                                                </a>
<a class="kb-btn kb-btn-prd inline-flex items-center gap-1 bg-amber-50 hover:bg-amber-100 text-amber-700 border border-amber-200 px-3 py-1.5 rounded text-xs transition-colors font-medium" href="#/other/prd-bonus-detail" target="_blank">
<i class="fas fa-file-alt"></i> PRD
                                                </a>
</div>
</td>
</tr>
</tbody>
</table>
</div>
</div>
</div>

<div class="bg-white rounded-lg border border-gray-100 overflow-hidden accordion-item">
<div @click="toggleElement($event)" class="px-4 py-3 cursor-pointer hover:bg-orange-50/50 transition-colors flex justify-between items-center">
<div class="flex flex-col gap-1">
<div class="flex items-center gap-3">
<span class="bg-orange-100 text-orange-700 px-2 py-1 rounded text-xs font-bold">智能交易系统</span>
<h3 class="text-base font-bold text-gray-800">商品销售流程</h3>
</div>
<p class="text-xs text-gray-500 mt-1">支持未登录/未注册用户通过官网导流，强关联 CRM 登录/注册环节实现购买闭环，并包含后台商品配置及订单审核管理。</p>
</div>
<div class="flex items-center gap-3 text-gray-400">
<span class="text-xs bg-gray-100 px-2 py-1 rounded">包含 7 个页面</span>
<i class="fas fa-chevron-down accordion-icon"></i>
</div>
</div>
<div class="accordion-content border-t border-gray-100">
<div class="overflow-x-auto no-scrollbar">
<table class="min-w-full text-xs text-left">
<thead>
<tr class="bg-gray-50 text-gray-600 border-b border-gray-200">
<th class="px-4 py-2 font-medium whitespace-nowrap w-[200px]">页面名称</th>
<th class="px-4 py-2 font-medium min-w-[200px]">页面概述</th>
<th class="px-4 py-2 font-medium whitespace-nowrap w-[150px]">所属客户端</th>
<th class="px-4 py-2 font-medium min-w-[280px]">交付物导航 (直达链接)</th>
</tr>
</thead>
<tbody class="divide-y divide-gray-100">
<tr class="table-row-hover">
<td class="px-4 py-3 font-bold text-gray-800">官网导流入口</td>
<td class="px-4 py-3 text-gray-500">官网双端新增“商品购买”按钮，支持重定向至CRM登录页，并在登录后自动跳转至商品列表。</td>
<td class="px-4 py-3">
<div class="flex flex-col gap-1">
<span class="inline-block px-2 py-0.5 text-[11px] rounded tag-group-only w-max">Group</span>
<span class="inline-block px-2 py-0.5 text-[11px] rounded tag-hk w-max">CRM-HK</span>
</div>
</td>
<td class="px-4 py-3">
<div class="flex flex-wrap gap-2 items-center">
<a class="px-3 py-1.5 text-xs font-medium text-blue-700 bg-blue-50 hover:bg-blue-100 rounded transition-colors flex items-center gap-1 border border-blue-200" href="#/other/index" target="_blank"><i class="fas fa-globe"></i> Group 官网</a>
<a class="px-3 py-1.5 text-xs font-medium text-blue-700 bg-blue-50 hover:bg-blue-100 rounded transition-colors flex items-center gap-1 border border-blue-200" href="#/other/index" target="_blank"><i class="fas fa-globe"></i> HK 官网</a>
</div>
</td>
</tr>
<tr class="table-row-hover">
<td class="px-4 py-3 font-bold text-gray-800">C端商品列表页</td>
<td class="px-4 py-3 text-gray-500">展示在售增值商品卡片、商品类型标签及金额等基础信息，并提供购买入口。</td>
<td class="px-4 py-3"><span class="inline-block px-2 py-0.5 text-[11px] rounded tag-group w-max">Group(含HK)</span></td>
<td class="px-4 py-3">
<div class="flex flex-wrap gap-2 items-center">
<a class="kb-btn kb-btn-prd px-3 py-1.5 text-xs font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 rounded transition-colors flex items-center gap-1 border border-gray-200" href="#/other/prd-product-list" target="_blank"><i class="fas fa-file-alt"></i> 列表 PRD</a>
<a class="inline-flex items-center gap-1 bg-teal-50 hover:bg-teal-100 theme-text px-3 py-1.5 rounded text-xs transition-colors theme-border border" href="#/crm/client-product-list" target="_blank"><i class="fas fa-desktop"></i> 列表原型</a>
</div>
</td>
</tr>
<tr class="table-row-hover">
<td class="px-4 py-3 font-bold text-gray-800">C端商品详情页</td>
<td class="px-4 py-3 text-gray-500">承载商品轮播详情介绍、套餐选择，以及余额扣款校验和下单支付弹窗流转。</td>
<td class="px-4 py-3"><span class="inline-block px-2 py-0.5 text-[11px] rounded tag-group w-max">Group(含HK)</span></td>
<td class="px-4 py-3">
<div class="flex flex-wrap gap-2 items-center">
<a class="kb-btn kb-btn-prd px-3 py-1.5 text-xs font-medium rounded transition-colors flex items-center gap-1 border border-gray-200 text-white bg-blue-500 hover:bg-blue-600 border-blue-500" href="#/other/prd-product-detail" target="_blank"><i class="fas fa-file-alt"></i> 详情 PRD</a>
<a class="inline-flex items-center gap-1 bg-teal-50 hover:bg-teal-100 theme-text px-3 py-1.5 rounded text-xs transition-colors theme-border border text-blue-500 hover:text-blue-700" href="#/product/detail" target="_blank"><i class="fas fa-desktop"></i> 详情原型</a>
</div>
</td>
</tr>
<tr class="table-row-hover">
<td class="px-4 py-3 font-bold text-gray-800">后台商品管理列表</td>
<td class="px-4 py-3 text-gray-500">增值商品的后台管理列表，支持状态筛选、上架管理及浏览量（PV/UV）数据展示。</td>
<td class="px-4 py-3"><span class="inline-block px-2 py-0.5 text-[11px] rounded tag-group w-max">Group(含HK)</span></td>
<td class="px-4 py-3">
<div class="flex flex-wrap gap-2 items-center">
<a class="kb-btn kb-btn-prd px-3 py-1.5 text-xs font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 rounded transition-colors flex items-center gap-1 border border-gray-200" href="#/other/prd-admin-product-management" target="_blank"><i class="fas fa-file-alt"></i> PRD</a>
<a class="inline-flex items-center gap-1 bg-teal-50 hover:bg-teal-100 theme-text px-3 py-1.5 rounded text-xs transition-colors theme-border border" href="#/product/management" target="_blank"><i class="fas fa-desktop"></i> 原型</a>
</div>
</td>
</tr>
<tr class="table-row-hover">
<td class="px-4 py-3 font-bold text-gray-800">新增/编辑商品</td>
<td class="px-4 py-3 text-gray-500">增值商品的独立配置页面，支持基本信息填写、图片上传及多套餐价格与库存数量设定。</td>
<td class="px-4 py-3"><span class="inline-block px-2 py-0.5 text-[11px] rounded tag-group w-max">Group(含HK)</span></td>
<td class="px-4 py-3">
<div class="flex flex-wrap gap-2 items-center">
<a class="kb-btn kb-btn-prd px-3 py-1.5 text-xs font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 rounded transition-colors flex items-center gap-1 border border-gray-200" href="#/other/prd-admin-product-edit" target="_blank"><i class="fas fa-file-alt"></i> PRD</a>
<a class="inline-flex items-center gap-1 bg-teal-50 hover:bg-teal-100 theme-text px-3 py-1.5 rounded text-xs transition-colors theme-border border" href="#/product/edit" target="_blank"><i class="fas fa-desktop"></i> 原型</a>
</div>
</td>
</tr>
<tr class="table-row-hover">
<td class="px-4 py-3 font-bold text-gray-800">客户端我的订单</td>
<td class="px-4 py-3 text-gray-500">C 端用户查看已购买商品的订单列表及状态。</td>
<td class="px-4 py-3"><span class="inline-block px-2 py-0.5 text-[11px] rounded tag-group w-max">Group(含HK)</span></td>
<td class="px-4 py-3">
<div class="flex flex-wrap gap-2 items-center">
<a class="kb-btn kb-btn-prd px-3 py-1.5 text-xs font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 rounded transition-colors flex items-center gap-1 border border-gray-200" href="#/other/prd-client-my-orders" target="_blank"><i class="fas fa-file-alt"></i> PRD</a>
<a class="inline-flex items-center gap-1 bg-teal-50 hover:bg-teal-100 theme-text px-3 py-1.5 rounded text-xs transition-colors theme-border border" href="#/crm/client-my-orders" target="_blank"><i class="fas fa-desktop"></i> 客户端订单原型</a>
</div>
</td>
</tr>
<tr class="table-row-hover">
<td class="px-4 py-3 font-bold text-gray-800">后台订单管理</td>
<td class="px-4 py-3 text-gray-500">后台商品订单审核，包含审核通过/拒绝流转及资金归集至运营 MT 账号的逻辑。</td>
<td class="px-4 py-3"><span class="inline-block px-2 py-0.5 text-[11px] rounded tag-group w-max">Group(含HK)</span></td>
<td class="px-4 py-3">
<div class="flex flex-wrap gap-2 items-center">
<a class="kb-btn kb-btn-prd px-3 py-1.5 text-xs font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 rounded transition-colors flex items-center gap-1 border border-gray-200" href="#/other/prd-admin-product-orders" target="_blank"><i class="fas fa-file-alt"></i> PRD</a>
<a class="inline-flex items-center gap-1 bg-teal-50 hover:bg-teal-100 theme-text px-3 py-1.5 rounded text-xs transition-colors theme-border border" href="#/product/orders" target="_blank"><i class="fas fa-desktop"></i> 后台订单原型</a>
</div>
</td>
</tr>
</tbody>
</table>
</div>
</div>
</div>
</div>
</div>
<!-- 规划中需求 -->
<div class="mb-6 bg-purple-50/20 rounded-lg border border-purple-100 overflow-hidden">
<div class="px-4 py-3 border-b border-purple-100 bg-purple-50/40 flex items-center justify-between">
<div class="flex items-center gap-2">
<h2 class="text-lg font-bold text-gray-800 flex items-center gap-2">
<i class="fa-solid fa-inbox text-[#8B5CF6]"></i> 规划中需求
                    </h2>
<div class="flex items-center gap-2">
<span class="text-[10px] font-medium text-purple-700 bg-purple-100 px-2 py-0.5 rounded border border-purple-200/60">规划中</span>
<span class="text-[10px] font-medium text-purple-700 bg-purple-100/60 px-2 py-0.5 rounded border border-purple-200/40">排期中</span>
</div>
</div>
</div>
<!-- 需求列表容器 -->
<div class="p-4 flex flex-col gap-3 bg-purple-50/10">
<div class="bg-white rounded-lg border border-gray-100 overflow-hidden accordion-item">
<div @click="toggleElement($event)" class="px-4 py-3 cursor-pointer hover:bg-purple-50/40 transition-colors flex justify-between items-center">
<div class="flex flex-col gap-1">
<div class="flex items-center gap-3">
<span class="bg-purple-100 text-purple-700 px-2 py-1 rounded text-xs font-bold">出入金</span>
<h3 class="text-base font-bold text-gray-800">管理员入金</h3>
</div>
<p class="text-xs text-gray-500 mt-1">增加手动入金类型区分。</p>
</div>
<div class="flex items-center gap-3 text-gray-400">
<span class="text-xs bg-gray-100 px-2 py-1 rounded">包含 1 个任务</span>
<i class="fas fa-chevron-down accordion-icon"></i>
</div>
</div>
<div class="accordion-content border-t border-gray-100">
<div class="overflow-x-auto no-scrollbar">
<table class="min-w-full text-xs text-left">
<thead>
<tr class="bg-gray-50 text-gray-600 border-b border-gray-200">
<th class="px-4 py-2 font-medium whitespace-nowrap w-[200px]">页面/任务名称</th>
<th class="px-4 py-2 font-medium min-w-[200px]">概述</th>
<th class="px-4 py-2 font-medium whitespace-nowrap w-[150px]">所属客户端</th>
<th class="px-4 py-2 font-medium min-w-[280px]">交付物导航 (直达链接)</th>
</tr>
</thead>
<tbody class="divide-y divide-gray-100">
<tr class="table-row-hover">
<td class="px-4 py-3 font-bold text-gray-800">管理员入金</td>
<td class="px-4 py-3 text-gray-500">增加手动入金类型区分。</td>
<td class="px-4 py-3"><span class="inline-block px-2 py-0.5 text-[11px] rounded tag-group w-max">Group(含HK)</span></td>
<td class="px-4 py-3">
<div class="flex flex-wrap gap-2 items-center">
<a class="kb-btn kb-btn-prd px-3 py-1.5 text-xs font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 rounded transition-colors flex items-center gap-1 border border-gray-200" href="#/other/prd-admin-deposit" target="_blank"><i class="fas fa-file-alt"></i> PRD</a>
<a class="inline-flex items-center gap-1 bg-teal-50 hover:bg-teal-100 theme-text px-3 py-1.5 rounded text-xs transition-colors theme-border border" href="#/fund/deposit-pending-review" target="_blank"><i class="fas fa-desktop"></i> 原型</a>
</div>
</td>
</tr>
</tbody>
</table>
</div>
</div>
</div>
<!-- 活动管理 (父级需求) -->
<div class="bg-white rounded-lg border border-gray-100 overflow-hidden accordion-item">
<div @click="toggleElement($event)" class="px-4 py-3 cursor-pointer hover:bg-purple-50/40 transition-colors flex justify-between items-center">
<div class="flex flex-col gap-1">
<div class="flex items-center gap-3">
<span class="bg-purple-100 text-purple-700 px-2 py-1 rounded text-xs font-bold">报表中心</span>
<h3 class="text-base font-bold text-gray-800">报表关系树筛选</h3>
</div>
<p class="text-xs text-gray-500 mt-1">出入金报表、提现报表、现实持仓报表增加左侧关系树按代理/直客筛选。</p>
</div>
<div class="flex items-center gap-3 text-gray-400">
<span class="text-xs bg-gray-100 px-2 py-1 rounded">包含 3 个页面</span>
<i class="fas fa-chevron-down accordion-icon"></i>
</div>
</div>
<div class="accordion-content border-t border-gray-100">
<div class="overflow-x-auto no-scrollbar">
<table class="min-w-full text-xs text-left">
<thead>
<tr class="bg-gray-50 text-gray-600 border-b border-gray-200">
<th class="px-4 py-2 font-medium whitespace-nowrap w-[200px]">页面/任务名称</th>
<th class="px-4 py-2 font-medium min-w-[200px]">概述</th>
<th class="px-4 py-2 font-medium whitespace-nowrap w-[150px]">所属客户端</th>
<th class="px-4 py-2 font-medium min-w-[280px]">交付物导航 (直达链接)</th>
</tr>
</thead>
<tbody class="divide-y divide-gray-100">
<tr class="table-row-hover">
<td class="px-4 py-3 font-bold text-gray-800">出入金报表</td>
<td class="px-4 py-3 text-gray-500">支持关系树 + 顶部筛选交集过滤的演示报表。</td>
<td class="px-4 py-3"><span class="inline-block px-2 py-0.5 text-[11px] rounded tag-group w-max">Group(含HK)</span></td>
<td class="px-4 py-3">
<div class="flex flex-wrap gap-2 items-center">
<a class="kb-btn kb-btn-prd px-3 py-1.5 text-xs font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 rounded transition-colors flex items-center gap-1 border border-gray-200" href="#/other/prd-report-relation-tree-filter" target="_blank"><i class="fas fa-file-alt"></i> PRD</a>
<a class="inline-flex items-center gap-1 bg-teal-50 hover:bg-teal-100 theme-text px-3 py-1.5 rounded text-xs transition-colors theme-border border" href="#/report/deposit-withdraw" target="_blank"><i class="fas fa-desktop"></i> 原型</a>
</div>
</td>
</tr>
<tr class="table-row-hover">
<td class="px-4 py-3 font-bold text-gray-800">提现报表</td>
<td class="px-4 py-3 text-gray-500">支持关系树 + 顶部筛选交集过滤的演示报表。</td>
<td class="px-4 py-3"><span class="inline-block px-2 py-0.5 text-[11px] rounded tag-group w-max">Group(含HK)</span></td>
<td class="px-4 py-3">
<div class="flex flex-wrap gap-2 items-center">
<a class="kb-btn kb-btn-prd px-3 py-1.5 text-xs font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 rounded transition-colors flex items-center gap-1 border border-gray-200" href="#/other/prd-report-relation-tree-filter" target="_blank"><i class="fas fa-file-alt"></i> PRD</a>
<a class="inline-flex items-center gap-1 bg-teal-50 hover:bg-teal-100 theme-text px-3 py-1.5 rounded text-xs transition-colors theme-border border" href="#/report/withdraw-report" target="_blank"><i class="fas fa-desktop"></i> 原型</a>
</div>
</td>
</tr>
<tr class="table-row-hover">
<td class="px-4 py-3 font-bold text-gray-800">现实持仓报表</td>
<td class="px-4 py-3 text-gray-500">按交易品种聚合展示，支持关系树筛选。</td>
<td class="px-4 py-3"><span class="inline-block px-2 py-0.5 text-[11px] rounded tag-group w-max">Group(含HK)</span></td>
<td class="px-4 py-3">
<div class="flex flex-wrap gap-2 items-center">
<a class="kb-btn kb-btn-prd px-3 py-1.5 text-xs font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 rounded transition-colors flex items-center gap-1 border border-gray-200" href="#/other/prd-report-relation-tree-filter" target="_blank"><i class="fas fa-file-alt"></i> PRD</a>
<a class="inline-flex items-center gap-1 bg-teal-50 hover:bg-teal-100 theme-text px-3 py-1.5 rounded text-xs transition-colors theme-border border" href="#/report/real-position" target="_blank"><i class="fas fa-desktop"></i> 原型</a>
</div>
</td>
</tr>
</tbody>
</table>
</div>
</div>
</div>
<div v-if="showActivityParticipationAnalysis" class="bg-white rounded-lg border border-gray-100 overflow-hidden accordion-item">
<div @click="toggleElement($event)" class="px-4 py-3 cursor-pointer hover:bg-purple-50/40 transition-colors flex justify-between items-center">
<div class="flex flex-col gap-1">
<div class="flex items-center gap-3">
<span class="bg-purple-100 text-purple-700 px-2 py-1 rounded text-xs font-bold">活动管理</span>
<h3 class="text-base font-bold text-gray-800">活动参与分析</h3>
</div>
<p class="text-xs text-gray-500 mt-1">从活动角度分析代理及伞下客户参与度、达标率和业务贡献。</p>
</div>
<div class="flex items-center gap-3 text-gray-400">
<span class="text-xs bg-gray-100 px-2 py-1 rounded">包含 1 个页面</span>
<i class="fas fa-chevron-down accordion-icon"></i>
</div>
</div>
<div class="accordion-content border-t border-gray-100">
<div class="overflow-x-auto no-scrollbar">
<table class="min-w-full text-xs text-left">
<thead>
<tr class="bg-gray-50 text-gray-600 border-b border-gray-200">
<th class="px-4 py-2 font-medium whitespace-nowrap w-[200px]">页面/任务名称</th>
<th class="px-4 py-2 font-medium min-w-[200px]">概述</th>
<th class="px-4 py-2 font-medium whitespace-nowrap w-[150px]">所属客户端</th>
<th class="px-4 py-2 font-medium min-w-[280px]">交付物导航 (直达链接)</th>
</tr>
</thead>
<tbody class="divide-y divide-gray-100">
<tr class="table-row-hover">
<td class="px-4 py-3 font-bold text-gray-800">活动参与分析</td>
<td class="px-4 py-3 text-gray-500">支持活动筛选、指标卡片、代理排行榜及客户明细联动的演示分析页。</td>
<td class="px-4 py-3"><span class="inline-block px-2 py-0.5 text-[11px] rounded tag-group w-max">Group(含HK)</span></td>
<td class="px-4 py-3">
<div class="flex flex-wrap gap-2 items-center">
<a class="kb-btn kb-btn-prd px-3 py-1.5 text-xs font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 rounded transition-colors flex items-center gap-1 border border-gray-200" href="#/other/prd-activity-participation-analysis" target="_blank"><i class="fas fa-file-alt"></i> PRD</a>
<a class="inline-flex items-center gap-1 bg-teal-50 hover:bg-teal-100 theme-text px-3 py-1.5 rounded text-xs transition-colors theme-border border" href="#/activity/participation-analysis" target="_blank"><i class="fas fa-desktop"></i> 原型</a>
</div>
</td>
</tr>
</tbody>
</table>
</div>
</div>
</div>
<div class="bg-white rounded-lg border border-gray-100 overflow-hidden accordion-item">
<div @click="toggleElement($event)" class="px-4 py-3 cursor-pointer hover:bg-purple-50/40 transition-colors flex justify-between items-center">
<div class="flex flex-col gap-1">
<div class="flex items-center gap-3">
<span class="bg-purple-100 text-purple-700 px-2 py-1 rounded text-xs font-bold">活动管理</span>
<h3 class="text-base font-bold text-gray-800">美分活动</h3>
</div>
<p class="text-xs text-gray-500 mt-1">美分活动相关需求规划。</p>
</div>
<div class="flex items-center gap-3 text-gray-400">
<span class="text-xs bg-gray-100 px-2 py-1 rounded">包含 2 个任务</span>
<i class="fas fa-chevron-down accordion-icon"></i>
</div>
</div>
<div class="accordion-content border-t border-gray-100">
<div class="overflow-x-auto no-scrollbar">
<table class="min-w-full text-xs text-left">
<thead>
<tr class="bg-gray-50 text-gray-600 border-b border-gray-200">
<th class="px-4 py-2 font-medium whitespace-nowrap w-[200px]">页面/任务名称</th>
<th class="px-4 py-2 font-medium min-w-[200px]">概述</th>
<th class="px-4 py-2 font-medium whitespace-nowrap w-[150px]">所属客户端</th>
<th class="px-4 py-2 font-medium min-w-[280px]">交付物导航 (直达链接)</th>
</tr>
</thead>
<tbody class="divide-y divide-gray-100">
<tr class="table-row-hover">
<td class="px-4 py-3 font-bold text-gray-800">活动规则逻辑 PRD</td>
<td class="px-4 py-3 text-gray-500">美分活动完整闭环、数据库底层配置参数及核心防重防刷异常流程说明。</td>
<td class="px-4 py-3">
<span class="inline-block px-2 py-0.5 text-[11px] rounded tag-group w-max">Group(含HK)</span>
</td>
<td class="px-4 py-3">
<div class="flex flex-wrap gap-2 items-center">
<a class="inline-flex items-center gap-1 bg-amber-50 hover:bg-amber-100 text-amber-700 border border-amber-200 px-3 py-1.5 rounded text-xs transition-colors" href="#/other/prd-activity-cent-account" target="_blank">
                                                    PRD
                                                </a>
</div>
</td>
</tr>
<tr class="table-row-hover">
<td class="px-4 py-3 font-bold text-gray-800">活动配置与监控报表</td>
<td class="px-4 py-3 text-gray-500">顶部展示底层配置参数（只读），底部通过 Tab 整合客户列表、交易记录等监控数据。</td>
<td class="px-4 py-3">
<span class="inline-block px-2 py-0.5 text-[11px] rounded tag-group w-max">Group(含HK)</span>
</td>
<td class="px-4 py-3">
<div class="flex flex-wrap gap-2 items-center">
<a class="inline-flex items-center gap-1 bg-teal-50 hover:bg-teal-100 theme-text px-3 py-1.5 rounded text-xs transition-colors theme-border border" href="#/activity/cent-detail" target="_blank">
                                                    原型
                                                </a>
</div>
</td>
</tr>
<tr class="table-row-hover">
<td class="px-4 py-3 font-bold text-gray-800">关联页面微调 (财务/客户)</td>
<td class="px-4 py-3 text-gray-500">财务流水页新增“美分活动奖励”类型；客户详情页新增活动专属标签与绑定账号展示。</td>
<td class="px-4 py-3">
<span class="inline-block px-2 py-0.5 text-[11px] rounded tag-group w-max">Group(含HK)</span>
</td>
<td class="px-4 py-3">
<div class="flex flex-wrap gap-2 items-center">
<a class="inline-flex items-center gap-1 bg-teal-50 hover:bg-teal-100 theme-text px-3 py-1.5 rounded text-xs transition-colors theme-border border" href="#/crm/client-detail" target="_blank">
                                                    原型
                                                </a>
</div>
</td>
</tr>
</tbody>
</table>
</div>
</div>
</div>
<div class="bg-white rounded-lg border border-gray-100 overflow-hidden accordion-item">
<div @click="toggleElement($event)" class="px-4 py-3 cursor-pointer hover:bg-purple-50/40 transition-colors flex justify-between items-center">
<div class="flex flex-col gap-1">
<div class="flex items-center gap-3">
<span class="bg-purple-100 text-purple-700 px-2 py-1 rounded text-xs font-bold">客户留资</span>
<h3 class="text-base font-bold text-gray-800">客户留资三期</h3>
</div>
<p class="text-xs text-gray-500 mt-1">围绕留资列表、销售录入弹窗与线索详情继续细化：补充留资次数、增强详情可维护能力，并完善轻量录入字段。</p>
</div>
<div class="flex items-center gap-3 text-gray-400">
<span class="text-xs bg-gray-100 px-2 py-1 rounded">包含 1 个任务</span>
<i class="fas fa-chevron-down accordion-icon"></i>
</div>
</div>
<div class="accordion-content border-t border-gray-100">
<div class="overflow-x-auto no-scrollbar">
<table class="min-w-full text-xs text-left">
<thead>
<tr class="bg-gray-50 text-gray-600 border-b border-gray-200">
<th class="px-4 py-2 font-medium whitespace-nowrap w-[200px]">页面/任务名称</th>
<th class="px-4 py-2 font-medium min-w-[200px]">概述</th>
<th class="px-4 py-2 font-medium whitespace-nowrap w-[150px]">所属客户端</th>
<th class="px-4 py-2 font-medium min-w-[280px]">交付物导航 (直达链接)</th>
</tr>
</thead>
<tbody class="divide-y divide-gray-100">
<tr class="table-row-hover">
<td class="px-4 py-3 font-bold text-gray-800">留资消息提醒</td>
<td class="px-4 py-3 text-gray-500">左侧菜单角标提醒：主管新增待分配未读数量；销售新分配与公海新增未读数量。</td>
<td class="px-4 py-3">
<span class="inline-block px-2 py-0.5 text-[11px] rounded tag-group w-max">Group(含HK)</span>
</td>
<td class="px-4 py-3">
<div class="flex flex-wrap gap-2 items-center">
<a class="px-3 py-1.5 text-xs font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 rounded transition-colors flex items-center gap-1 border border-gray-200" href="#/other/prd-leads-message-reminder" target="_blank">
                                                    PRD
                                                </a>
</div>
</td>
</tr>
</tbody>
</table>
</div>
</div>
</div>
<div class="bg-white rounded-lg border border-gray-100 overflow-hidden accordion-item">
<div @click="toggleElement($event)" class="px-4 py-3 cursor-pointer hover:bg-purple-50/40 transition-colors flex justify-between items-center">
<div class="flex flex-col gap-1">
<div class="flex items-center gap-3">
<span class="bg-purple-100 text-purple-700 px-2 py-1 rounded text-xs font-bold">基础逻辑</span>
<h3 class="text-base font-bold text-gray-800">委托交易</h3>
</div>
<p class="text-xs text-gray-500 mt-1">委托交易分组支持配置，可随时新增或删除；委托交易账户独立页面管理，客户详情仅保留原本信息。委托账户在独立管理页中统一查看限制状态、开放时间和结束状态，实际查看动作在 MT5 中完成。</p>
</div>
<div class="flex items-center gap-3 text-gray-400">
<span class="text-xs bg-gray-100 px-2 py-1 rounded">包含 4 个页面</span>
<i class="fas fa-chevron-down accordion-icon"></i>
</div>
</div>
<div class="accordion-content border-t border-gray-100">
<div class="overflow-x-auto no-scrollbar">
<table class="min-w-full text-xs text-left">
<thead>
<tr class="bg-gray-50 text-gray-600 border-b border-gray-200">
<th class="px-4 py-2 font-medium whitespace-nowrap w-[220px]">页面/任务名称</th>
<th class="px-4 py-2 font-medium min-w-[260px]">概述</th>
<th class="px-4 py-2 font-medium whitespace-nowrap w-[150px]">所属客户端</th>
<th class="px-4 py-2 font-medium min-w-[280px]">交付物导航 (直达链接)</th>
</tr>
</thead>
<tbody class="divide-y divide-gray-100">
<tr class="table-row-hover">
<td class="px-4 py-3 font-bold text-gray-800">委托交易一期</td>
<td class="px-4 py-3 text-gray-500">委托交易的一期基础需求占位，归档一期范围内的业务规则、页面与交付物，便于与后续查看规则、分组配置等能力拆分管理。</td>
<td class="px-4 py-3">
<span class="inline-block px-2 py-0.5 text-[11px] rounded tag-group w-max">Group(含HK)</span>
</td>
<td class="px-4 py-3">
<div class="flex flex-wrap gap-2 items-center">
<a class="inline-flex items-center gap-1 bg-teal-50 hover:bg-teal-100 theme-text px-3 py-1.5 rounded text-xs transition-colors theme-border border" href="#/trust/phase1" target="_blank">
<i class="fas fa-desktop"></i> 原型
                                                </a>
</div>
</td>
</tr>
<tr class="table-row-hover">
<td class="px-4 py-3 font-bold text-gray-800">委托交易账户管理</td>
<td class="px-4 py-3 text-gray-500">独立集中展示委托账号与已结束委托账号，查看交易数据查看状态、规则来源、开放时间与委托状态；客户详情不承载这些信息。</td>
<td class="px-4 py-3">
<span class="inline-block px-2 py-0.5 text-[11px] rounded tag-group w-max">Group(含HK)</span>
</td>
<td class="px-4 py-3">
<div class="flex flex-wrap gap-2 items-center">
<a class="px-3 py-1.5 text-xs font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 rounded transition-colors flex items-center gap-1 border border-gray-200" href="#/other/prd-trust-account-visibility" target="_blank">
                                                    PRD
                                                </a>
<a class="inline-flex items-center gap-1 bg-teal-50 hover:bg-teal-100 theme-text px-3 py-1.5 rounded text-xs transition-colors theme-border border" href="#/trust/account-management" target="_blank">
<i class="fas fa-desktop"></i> 原型
                                                </a>
</div>
</td>
</tr>
<tr class="table-row-hover">
<td class="px-4 py-3 font-bold text-gray-800">查看规则配置</td>
<td class="px-4 py-3 text-gray-500">支持按委托分组或 MT 账号设置持仓、交易、平仓记录的数据开放时间，并选择手动开关或每月固定、每周固定、每月内指定时间的自动开启规则；CRM 仅负责配置与展示，MT5 负责实际放行。</td>
<td class="px-4 py-3">
<span class="inline-block px-2 py-0.5 text-[11px] rounded tag-group w-max">Group(含HK)</span>
</td>
<td class="px-4 py-3">
<div class="flex flex-wrap gap-2 items-center">
<a class="px-3 py-1.5 text-xs font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 rounded transition-colors flex items-center gap-1 border border-gray-200" href="#/other/prd-trust-account-visibility" target="_blank">
                                                    PRD
                                                </a>
<a class="inline-flex items-center gap-1 bg-teal-50 hover:bg-teal-100 theme-text px-3 py-1.5 rounded text-xs transition-colors theme-border border" href="#/trust/rule-config" target="_blank">
<i class="fas fa-desktop"></i> 规则原型
                                                </a>
</div>
</td>
</tr>
<tr class="table-row-hover">
<td class="px-4 py-3 font-bold text-gray-800">委托交易分组配置</td>
<td class="px-4 py-3 text-gray-500">维护委托交易分组名单，支持随时新增、删除与启停用；分组名单用于识别哪些 MT 账号进入委托限制态。</td>
<td class="px-4 py-3">
<span class="inline-block px-2 py-0.5 text-[11px] rounded tag-group w-max">Group(含HK)</span>
</td>
<td class="px-4 py-3">
<div class="flex flex-wrap gap-2 items-center">
<a class="px-3 py-1.5 text-xs font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 rounded transition-colors flex items-center gap-1 border border-gray-200" href="#/other/prd-trust-account-visibility" target="_blank">
                                                    PRD
                                                </a>
<a class="inline-flex items-center gap-1 bg-teal-50 hover:bg-teal-100 theme-text px-3 py-1.5 rounded text-xs transition-colors theme-border border" href="#/trust/group-config" target="_blank">
<i class="fas fa-desktop"></i> 分组原型
                                                </a>
</div>
</td>
</tr>
</tbody>
</table>
</div>
</div>
</div>
<!-- 集团动态二期 -->
<div class="bg-white rounded-lg border border-gray-100 overflow-hidden accordion-item">
<div @click="toggleElement($event)" class="px-4 py-3 cursor-pointer hover:bg-purple-50/40 transition-colors flex justify-between items-center">
<div class="flex flex-col gap-1">
<div class="flex items-center gap-3">
<span class="bg-purple-100 text-purple-700 px-2 py-1 rounded text-xs font-bold">官网内容管理</span>
<h3 class="text-base font-bold text-gray-800">集团动态二期</h3>
</div>
<p class="text-xs text-gray-500 mt-1">将集团动态二期拆分为后台创建能力、后台列表管理、官网前端展示三个独立需求，分别推进、分别验收。</p>
</div>
<div class="flex items-center gap-3 text-gray-400">
<span class="text-xs bg-gray-100 px-2 py-1 rounded">包含 3 个需求</span>
<i class="fas fa-chevron-down accordion-icon"></i>
</div>
</div>
<div class="accordion-content border-t border-gray-100">
<div class="overflow-x-auto no-scrollbar">
<table class="min-w-full text-xs text-left">
<thead>
<tr class="bg-gray-50 text-gray-600 border-b border-gray-200">
<th class="px-4 py-2 font-medium whitespace-nowrap w-[220px]">页面/任务名称</th>
<th class="px-4 py-2 font-medium min-w-[260px]">概述</th>
<th class="px-4 py-2 font-medium whitespace-nowrap w-[150px]">所属客户端</th>
<th class="px-4 py-2 font-medium min-w-[280px]">交付物导航 (直达链接)</th>
</tr>
</thead>
<tbody class="divide-y divide-gray-100">
<tr class="table-row-hover">
<td class="px-4 py-3 font-bold text-gray-800">集团动态二期 - 后台发布能力</td>
<td class="px-4 py-3 text-gray-500">聚焦后台创建与编辑能力：支持 HK / Group 双站点投放、创建页适配、正文块与图片模块配置，以及桌面端/移动端预览。</td>
<td class="px-4 py-3">
<span class="inline-block px-2 py-0.5 text-[11px] rounded tag-group-only w-max">Crm-Group</span>
</td>
<td class="px-4 py-3">
<div class="flex flex-wrap gap-2 items-center">
<a class="px-3 py-1.5 text-xs font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 rounded transition-colors flex items-center gap-1 border border-gray-200" href="#/other/prd-group-news-backend-phase2" target="_blank">
                                                    PRD
                                                </a>
<a class="inline-flex items-center gap-1 bg-teal-50 hover:bg-teal-100 theme-text px-3 py-1.5 rounded text-xs transition-colors theme-border border" href="#/news/create-optimized" target="_blank">
<i class="fas fa-desktop"></i> 后台原型
                                                </a>
</div>
</td>
</tr>
<tr class="table-row-hover">
<td class="px-4 py-3 font-bold text-gray-800">集团动态二期 - 后台列表管理</td>
<td class="px-4 py-3 text-gray-500">聚焦已创建动态的后台管理能力：支持 HK / Group 双站点维度查看、搜索筛选、状态管理、编辑入口，以及一键复制已创建动态。</td>
<td class="px-4 py-3">
<span class="inline-block px-2 py-0.5 text-[11px] rounded tag-group-only w-max">Crm-Group</span>
</td>
<td class="px-4 py-3">
<div class="flex flex-wrap gap-2 items-center">
<a class="px-3 py-1.5 text-xs font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 rounded transition-colors flex items-center gap-1 border border-gray-200" href="#/other/prd-group-news-list-management-phase2" target="_blank">
                                                    PRD
                                                </a>
<a class="inline-flex items-center gap-1 bg-teal-50 hover:bg-teal-100 theme-text px-3 py-1.5 rounded text-xs transition-colors theme-border border" href="#/news/list" target="_blank">
<i class="fas fa-table-list"></i> 列表原型
                                                </a>
</div>
</td>
</tr>
<tr class="table-row-hover">
<td class="px-4 py-3 font-bold text-gray-800">集团动态二期 - 官网前端展示</td>
<td class="px-4 py-3 text-gray-500">聚焦 HK / Group 官网详情页展示能力：统一标题、摘要、正文与图片模块渲染规则，并适配桌面端、移动端与未发布空态。</td>
<td class="px-4 py-3">
<span class="inline-block px-2 py-0.5 text-[11px] rounded tag-gw w-max">Group 官网</span>
</td>
<td class="px-4 py-3">
<div class="flex flex-wrap gap-2 items-center">
<a class="px-3 py-1.5 text-xs font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 rounded transition-colors flex items-center gap-1 border border-gray-200" href="#/other/prd-group-news-frontend-phase2" target="_blank">
                                                    PRD
                                                </a>
<a class="inline-flex items-center gap-1 bg-teal-50 hover:bg-teal-100 theme-text px-3 py-1.5 rounded text-xs transition-colors theme-border border" href="#/news/display-modes" target="_blank">
<i class="fas fa-globe"></i> 前端原型
                                                </a>
</div>
</td>
</tr>
</tbody>
</table>
</div>
</div>
</div>
</div>
<!-- Buttons will be injected by JS -->
<!-- 折叠面板交互脚本 -->
  </div>
</div>
  </div>
</template>


<script setup>
import { onMounted, onUnmounted } from 'vue'
import { openPrd } from '@/store/prd'

const showActivityParticipationAnalysis = false

const openPcardJoinPrd = () => openPrd('prd-home-pcard-activity-join.html', 'PCard 活动参与 - PRD')
const openReportActivityJoinPrd = () => openPrd('prd-report-activity-join.html', '活动参与报表 - PRD')
const openAgentHomePrd = () => openPrd('prd-agent-home.html', '代理首页 - PRD')
const openPioneerOnePrd = () => openPrd('prd-activity-pioneer-one-50000-release.html', '先锋一号 50,000 USD 体验金活动详情与盈利释放 - PRD')
const openPioneerOneAuditPrd = () => openPrd('prd-activity-audit.html', '活动管理 - 活动审核（含先锋一号 50,000 USD 体验金活动）- PRD')
const openPaymentConfigRecordsPrd = () => openPrd('prd-payment-management.html', '支付设置 - 配置记录 - PRD')
const openWithdrawConfigRecordsPrd = () => openPrd('prd-withdraw-settings.html', '提现设置 - 配置记录 - PRD')
const openSalesDifferentialTierRebatePrd = () => openPrd('prd-sales-differential-tier-rebate.html', '销售差异化阶梯返佣配置 - PRD')

const handlePrdAnchors = (e) => {
  const el = e.target?.closest?.('a')
  if (!el) return

  const href = el.getAttribute('href') || ''
  if (!href) return

  if (href.startsWith('#/other/prd-')) {
    const slug = href.replace('#/other/', '')
    openPrd(`${slug}.html`, 'PRD 文档')
    e.preventDefault()
    return
  }

  if (/^prd-[^?#]+\.html$/i.test(href)) {
    openPrd(href, 'PRD 文档')
    e.preventDefault()
  }
}

onMounted(() => {
  document.addEventListener('click', handlePrdAnchors, true)
})

onUnmounted(() => {
  document.removeEventListener('click', handlePrdAnchors, true)
})

const toggleElement = (e) => {
  const button = e.currentTarget;
  if (button.classList.contains('section-header')) {
    const content = button.nextElementSibling;
    const icon = button.querySelector('.section-icon');
    if (content && content.classList.contains('hidden')) {
      content.classList.remove('hidden');
      if(icon) icon.style.transform = 'rotate(180deg)';
    } else if (content) {
      content.classList.add('hidden');
      if(icon) icon.style.transform = 'rotate(0deg)';
    }
  } else {
    const content = button.nextElementSibling;
    const icon = button.querySelector('.accordion-icon');
    if (content && content.classList.contains('open')) {
      content.classList.remove('open');
      if(icon) icon.classList.remove('open');
    } else if (content) {
      content.classList.add('open');
      if(icon) icon.classList.add('open');
    }
  }
}
</script>

<style scoped>
.theme-bg { background-color: #55B9B9; }
.theme-text { color: #55B9B9; }
.theme-border { border-color: #55B9B9; }
.table-row-hover { transition: all 0.2s ease-in-out; }
.table-row-hover:hover { background-color: #f0f9f9; transform: translateY(-1px); box-shadow: 0 2px 4px rgba(85, 185, 185, 0.1); }
.no-scrollbar::-webkit-scrollbar { display: none; }
.no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
.tag-hk { background-color: #e0f2fe; color: #1e40af; border: 1px solid #bfdbfe; }
.tag-group { background-color: #fce7f3; color: #9d174d; border: 1px solid #fbcfe8; }
.tag-group-only { background-color: #ede9fe; color: #6d28d9; border: 1px solid #ddd6fe; }
.tag-gw { background-color: #ecfdf5; color: #115e59; border: 1px solid #a7f3d0; }
.accordion-content { transition: max-height 0.3s ease-in-out, opacity 0.3s ease-in-out; max-height: 0; opacity: 0; overflow: hidden; }
.accordion-content.open { max-height: 5000px; opacity: 1; overflow: visible; }
.accordion-icon { transition: transform 0.3s ease; }
.accordion-icon.open { transform: rotate(180deg); }
.custom-scrollbar::-webkit-scrollbar { width: 6px; height: 6px; }
.custom-scrollbar::-webkit-scrollbar-thumb { background: #e5e7eb; border-radius: 4px; }
.custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
</style>
