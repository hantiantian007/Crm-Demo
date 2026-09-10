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
<div class="text-xs text-gray-500 bg-white px-3 py-1.5 rounded shadow-sm border border-gray-200">
<i class="fas fa-layer-group text-[#55B9B9] mr-2"></i>包含系统：CRM-HK、Crm-Group、HK官网、Group官网
                </div>
<span class="px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-bold border border-green-200">
<i class="fas fa-circle-check text-[10px] mr-1"></i> 最新状态: 同步更新中
                </span>
</div>
</div>
<!-- 研发中需求 -->
<div class="mb-6 bg-orange-50/30 rounded-lg shadow-sm border border-orange-200 overflow-hidden">
<div class="px-4 py-3 border-b border-orange-200 bg-orange-50/50 flex items-center justify-between">
<div class="flex items-center gap-2">
<h2 class="text-base font-bold text-gray-800 flex items-center gap-2">
<i class="fa-solid fa-fire text-orange-500"></i> 研发中需求
                    </h2>
<span class="text-[10px] font-medium text-gray-500 bg-orange-100 text-orange-700 px-2 py-0.5 rounded border border-orange-200">优先处理</span>
</div>
</div>
<!-- 需求列表容器 -->
<div class="p-4 flex flex-col gap-3 bg-gray-50/50">
<!-- 需求集（一） -->
<div class="bg-white rounded-lg shadow-sm border border-orange-200 overflow-hidden accordion-item">
<div @click="toggleElement($event)" class="px-4 py-3 cursor-pointer hover:bg-orange-50/50 transition-colors flex justify-between items-center">
<div class="flex flex-col gap-1">
<div class="flex items-center gap-2">
<span class="bg-orange-100 text-orange-700 px-2 py-0.5 rounded text-[10px] font-bold">需求合集</span>
<h3 class="text-base font-bold text-gray-800">需求集（一）</h3>
</div>
<p class="text-xs text-gray-500 mt-1">需求集（一）相关页面与任务。</p>
</div>
<div class="flex items-center gap-3 text-gray-400">
<span class="text-[10px] bg-gray-100 px-2 py-1 rounded">包含 3 个页面</span>
<i class="fas fa-chevron-down accordion-icon text-xs"></i>
</div>
</div>
<div class="accordion-content border-t border-orange-100">
<div class="overflow-x-auto no-scrollbar">
<table class="min-w-full text-xs text-left">
<thead>
<tr class="bg-gray-50 text-gray-600 border-b border-gray-200">
<th class="px-4 py-2 font-medium whitespace-nowrap w-[200px]">页面/任务名称</th>
<th class="px-4 py-2 font-medium min-w-[240px]">概述</th>
<th class="px-4 py-2 font-medium whitespace-nowrap w-[130px]">所属客户端</th>
<th class="px-4 py-2 font-medium min-w-[260px]">交付物导航 (直达链接)</th>
</tr>
</thead>
<tbody class="divide-y divide-gray-100">
<tr class="table-row-hover">
<td class="px-4 py-3">
<div class="flex items-center gap-2">
<span class="font-medium text-gray-800">关系树优化</span>
</div>
</td>
<td class="px-4 py-3 text-gray-500">
                                            关系树增加MT账号查询条件
                                        </td>
<td class="px-4 py-3">
<span class="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs border border-gray-200">CRM 业务端</span>
</td>
<td class="px-4 py-3">
<div class="flex flex-wrap gap-2">
<span class="text-gray-400 text-xs italic">待补充原型</span>
</div>
</td>
</tr>
<tr class="table-row-hover">
<td class="px-4 py-3">
<div class="flex items-center gap-2">
<span class="font-medium text-gray-800 text-blue-500 hover:text-blue-700">客户变动详情</span>
</div>
</td>
<td class="px-4 py-3 text-gray-500">
                                            客户变动详情增加筛选条件，时间筛选、操作筛选，关系树查询
                                        </td>
<td class="px-4 py-3">
<span class="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs border border-gray-200">CRM 业务端</span>
</td>
<td class="px-4 py-3">
<div class="flex flex-wrap gap-2">
<a class="text-orange-600 hover:text-orange-800 bg-orange-50 hover:bg-orange-100 px-3 py-1.5 rounded transition-colors text-xs border border-orange-100 flex items-center gap-1.5" href="#/crm/change-detail" target="_blank">
<i class="fas fa-desktop"></i> 查看原型
                                                </a>
</div>
</td>
</tr>
<tr class="table-row-hover" v-show="false">
<td class="px-4 py-3">
<div class="flex items-center gap-2">
<span class="font-medium text-gray-800 text-blue-500 hover:text-blue-700">Pcard 活动详情</span>
</div>
</td>
<td class="px-4 py-3 text-gray-500">
                                            增加达标列表，记录客户达标时间和赠金转真实资金的时间
                                        </td>
<td class="px-4 py-3">
<span class="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs border border-gray-200">CRM 业务端</span>
</td>
<td class="px-4 py-3">
<div class="flex flex-wrap gap-2">
<a class="text-orange-600 hover:text-orange-800 bg-orange-50 hover:bg-orange-100 px-3 py-1.5 rounded transition-colors text-xs border border-orange-100 flex items-center gap-1.5" href="#/activity/pcard" target="_blank">
<i class="fas fa-desktop"></i> 查看原型
                                                </a>
</div>
</td>
</tr>
</tbody>
</table>
</div>
</div>
</div>
<!-- 报表统计（新增父级菜单） -->
<div class="bg-white rounded-lg shadow-sm border border-orange-200 overflow-hidden accordion-item">
<div @click="toggleElement($event)" class="px-4 py-3 cursor-pointer hover:bg-orange-50/50 transition-colors flex justify-between items-center">
<div class="flex flex-col gap-1">
<div class="flex items-center gap-3">
<span class="bg-orange-100 text-orange-700 px-2 py-1 rounded text-xs font-bold">数据报表</span>
<h3 class="text-base font-bold text-gray-800">报表统计</h3>
</div>
<p class="text-xs text-gray-500 mt-1">系统各类报表与数据统计相关需求。</p>
</div>
<div class="flex items-center gap-3 text-gray-400">
<span class="text-xs bg-gray-100 px-2 py-1 rounded">包含 8 个页面</span>
<i class="fas fa-chevron-down accordion-icon"></i>
</div>
</div>
<div class="accordion-content border-t border-orange-100">
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
<td class="px-4 py-3">
<div class="flex items-center gap-2">
<span class="font-medium text-gray-800">佣金统计</span>
</div>
</td>
<td class="px-4 py-3 text-gray-500">
                                            增加关系树查询方式
                                        </td>
<td class="px-4 py-3">
<span class="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs border border-gray-200">CRM 业务端</span>
</td>
<td class="px-4 py-3">
<div class="flex flex-wrap gap-2">
<a class="text-orange-600 hover:text-orange-800 bg-orange-50 hover:bg-orange-100 px-3 py-1.5 rounded transition-colors text-xs border border-orange-100 flex items-center gap-1.5" href="#/report/commission-stats" target="_blank">
<i class="fas fa-desktop"></i> 查看原型
                                                </a>
</div>
</td>
</tr>
<tr class="table-row-hover">
<td class="px-4 py-3">
<div class="flex items-center gap-2">
<span class="font-medium text-gray-800">交易报表</span>
</div>
</td>
<td class="px-4 py-3 text-gray-500">
                                            增加关系树查询方式
                                        </td>
<td class="px-4 py-3">
<span class="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs border border-gray-200">CRM 业务端</span>
</td>
<td class="px-4 py-3">
<div class="flex flex-wrap gap-2">
<a class="text-orange-600 hover:text-orange-800 bg-orange-50 hover:bg-orange-100 px-3 py-1.5 rounded transition-colors text-xs border border-orange-100 flex items-center gap-1.5" href="#/report/trading" target="_blank">
<i class="fas fa-desktop"></i> 查看原型
                                                </a>
</div>
</td>
</tr>
<tr class="table-row-hover">
<td class="px-4 py-3">
<div class="flex items-center gap-2">
<span class="font-medium text-gray-800">持仓报表</span>
</div>
</td>
<td class="px-4 py-3 text-gray-500">
                                            增加关系树查询方式
                                        </td>
<td class="px-4 py-3">
<span class="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs border border-gray-200">CRM 业务端</span>
</td>
<td class="px-4 py-3">
<div class="flex flex-wrap gap-2">
<a class="text-orange-600 hover:text-orange-800 bg-orange-50 hover:bg-orange-100 px-3 py-1.5 rounded transition-colors text-xs border border-orange-100 flex items-center gap-1.5" href="#/report/position" target="_blank">
<i class="fas fa-desktop"></i> 查看原型
                                                </a>
<a class="text-indigo-600 hover:text-indigo-800 bg-indigo-50 hover:bg-indigo-100 px-3 py-1.5 rounded transition-colors text-xs border border-indigo-100 flex items-center gap-1.5" href="#/other/prd-report-position" target="_blank">
<i class="fas fa-file-alt"></i> PRD
                                                </a>
</div>
</td>
</tr>
<tr class="table-row-hover">
<td class="px-4 py-3">
<div class="flex items-center gap-2">
<span class="font-medium text-gray-800">平仓交易记录</span>
</div>
</td>
<td class="px-4 py-3 text-gray-500">
                                            增加关系树查询方式
                                        </td>
<td class="px-4 py-3">
<span class="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs border border-gray-200">CRM 业务端</span>
</td>
<td class="px-4 py-3">
<div class="flex flex-wrap gap-2">
<a class="text-orange-600 hover:text-orange-800 bg-orange-50 hover:bg-orange-100 px-3 py-1.5 rounded transition-colors text-xs border border-orange-100 flex items-center gap-1.5" href="#/report/close-position" target="_blank">
<i class="fas fa-desktop"></i> 查看原型
                                                </a>
<a class="text-indigo-600 hover:text-indigo-800 bg-indigo-50 hover:bg-indigo-100 px-3 py-1.5 rounded transition-colors text-xs border border-indigo-100 flex items-center gap-1.5" href="#/other/prd-report-close-position" target="_blank">
<i class="fas fa-file-alt"></i> PRD
                                                </a>
</div>
</td>
</tr>
<tr class="table-row-hover">
<td class="px-4 py-3">
<div class="flex items-center gap-2">
<span class="font-medium text-gray-800">财务报表</span>
</div>
</td>
<td class="px-4 py-3 text-gray-500">
                                            增加关系树查询方式
                                        </td>
<td class="px-4 py-3">
<span class="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs border border-gray-200">CRM 业务端</span>
</td>
<td class="px-4 py-3">
<div class="flex flex-wrap gap-2">
<a class="text-orange-600 hover:text-orange-800 bg-orange-50 hover:bg-orange-100 px-3 py-1.5 rounded transition-colors text-xs border border-orange-100 flex items-center gap-1.5" href="#/report/finance-cent-account" target="_blank">
<i class="fas fa-desktop"></i> 查看原型
                                                </a>
<a class="text-indigo-600 hover:text-indigo-800 bg-indigo-50 hover:bg-indigo-100 px-3 py-1.5 rounded transition-colors text-xs border border-indigo-100 flex items-center gap-1.5" href="#/other/prd-cent-account-page-finance-report" target="_blank">
<i class="fas fa-file-alt"></i> PRD
                                                </a>
</div>
</td>
</tr>
<tr class="table-row-hover">
<td class="px-4 py-3">
<div class="flex items-center gap-2">
<span class="font-medium text-gray-800">佣金报表</span>
</div>
</td>
<td class="px-4 py-3 text-gray-500">
                                            增加关系树查询方式
                                        </td>
<td class="px-4 py-3">
<span class="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs border border-gray-200">CRM 业务端</span>
</td>
<td class="px-4 py-3">
<div class="flex flex-wrap gap-2">
<a class="text-orange-600 hover:text-orange-800 bg-orange-50 hover:bg-orange-100 px-3 py-1.5 rounded transition-colors text-xs border border-orange-100 flex items-center gap-1.5" href="#/report/commission-cent-account" target="_blank">
<i class="fas fa-desktop"></i> 查看原型
                                                </a>
<a class="text-indigo-600 hover:text-indigo-800 bg-indigo-50 hover:bg-indigo-100 px-3 py-1.5 rounded transition-colors text-xs border border-indigo-100 flex items-center gap-1.5" href="#/other/prd-cent-account-page-commission-report" target="_blank">
<i class="fas fa-file-alt"></i> PRD
                                                </a>
</div>
</td>
</tr>
<tr class="table-row-hover">
<td class="px-4 py-3">
<div class="flex items-center gap-2">
<span class="font-medium text-gray-800">持仓统计</span>
</div>
</td>
<td class="px-4 py-3 text-gray-500">
                                            增加关系树查询方式
                                        </td>
<td class="px-4 py-3">
<span class="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs border border-gray-200">CRM 业务端</span>
</td>
<td class="px-4 py-3">
<div class="flex flex-wrap gap-2">
<a class="text-orange-600 hover:text-orange-800 bg-orange-50 hover:bg-orange-100 px-3 py-1.5 rounded transition-colors text-xs border border-orange-100 flex items-center gap-1.5" href="#/report/position-stats" target="_blank">
<i class="fas fa-desktop"></i> 查看原型
                                                </a>
</div>
</td>
</tr>
<tr class="table-row-hover">
<td class="px-4 py-3">
<div class="flex items-center gap-2">
<span class="font-medium text-gray-800">交易记录</span>
</div>
</td>
<td class="px-4 py-3 text-gray-500">
                                            增加关系树查询方式
                                        </td>
<td class="px-4 py-3">
<span class="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs border border-gray-200">CRM 业务端</span>
</td>
<td class="px-4 py-3">
<div class="flex flex-wrap gap-2">
<a class="text-orange-600 hover:text-orange-800 bg-orange-50 hover:bg-orange-100 px-3 py-1.5 rounded transition-colors text-xs border border-orange-100 flex items-center gap-1.5" href="#/report/trade-record-cent-account" target="_blank">
<i class="fas fa-desktop"></i> 查看原型
                                                </a>
<a class="text-indigo-600 hover:text-indigo-800 bg-indigo-50 hover:bg-indigo-100 px-3 py-1.5 rounded transition-colors text-xs border border-indigo-100 flex items-center gap-1.5" href="#/other/prd-cent-account-page-trade-record" target="_blank">
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
<!-- 对账（新增父级菜单） -->
<div class="bg-white rounded-lg shadow-sm border border-orange-200 overflow-hidden accordion-item">
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
<div class="accordion-content border-t border-orange-100">
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
<!-- Pcard活动（新增父级菜单） -->
<div class="bg-white rounded-lg shadow-sm border border-orange-200 overflow-hidden accordion-item">
<div @click="toggleElement($event)" class="px-4 py-3 cursor-pointer hover:bg-orange-50/50 transition-colors flex justify-between items-center">
<div class="flex flex-col gap-1">
<div class="flex items-center gap-3">
<span class="bg-orange-100 text-orange-700 px-2 py-1 rounded text-xs font-bold">营销活动</span>
<h3 class="text-base font-bold text-gray-800">Pcard活动</h3>
</div>
<p class="text-xs text-gray-500 mt-1">Pcard 银行卡免费办理活动相关需求。</p>
</div>
<div class="flex items-center gap-3 text-gray-400">
<span class="text-xs bg-gray-100 px-2 py-1 rounded">包含 1 个任务</span>
<i class="fas fa-chevron-down accordion-icon"></i>
</div>
</div>
<div class="accordion-content border-t border-orange-100">
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
<td class="px-4 py-3 font-bold text-gray-800">Pcard活动 - 首页进度</td>
<td class="px-4 py-3 text-gray-500">
                                            右侧边栏新增进度卡，双进度条展示净入金与手数完成度。
                                        </td>
<td class="px-4 py-3">
<span class="inline-block px-2 py-0.5 text-[11px] rounded tag-group w-max">Group(含HK)</span>
</td>
<td class="px-4 py-3">
<div class="flex flex-wrap gap-2 items-center">
<a class="text-blue-600 hover:text-blue-800 hover:underline text-xs font-medium transition-colors" href="#/home" target="_blank">
                                                    原型
                                                </a>
<button type="button" class="inline-flex items-center gap-1 bg-amber-50 hover:bg-amber-100 text-amber-700 border border-amber-200 px-3 py-1.5 rounded text-xs transition-colors font-medium" @click="openHomeProgressPrd">
  PRD
</button>
<button type="button" class="inline-flex items-center gap-1 bg-amber-50 hover:bg-amber-100 text-amber-700 border border-amber-200 px-3 py-1.5 rounded text-xs transition-colors font-medium" @click="openPcardJoinPrd">
  参与PRD
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
<div class="bg-white rounded-lg shadow-sm border border-orange-200 overflow-hidden accordion-item" style="display: none;">
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
<div class="accordion-content border-t border-orange-100">
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
<a class="inline-flex items-center gap-1 bg-teal-50 hover:bg-teal-100 theme-text px-3 py-1.5 rounded text-xs transition-colors theme-border border" href="#/activity/bonus-list" target="_blank">
<i class="fas fa-desktop text-gray-400"></i> 原型
                                                </a>
<a class="inline-flex items-center gap-1 bg-amber-50 hover:bg-amber-100 text-amber-700 border border-amber-200 px-3 py-1.5 rounded text-xs transition-colors font-medium" href="#/other/prd-bonus-activity" target="_blank">
                                                    PRD
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
<a class="inline-flex items-center gap-1 bg-teal-50 hover:bg-teal-100 theme-text px-3 py-1.5 rounded text-xs transition-colors theme-border border" href="#/activity/bonus-detail" target="_blank">
<i class="fas fa-desktop text-gray-400"></i> 原型
                                                </a>
<a class="inline-flex items-center gap-1 bg-amber-50 hover:bg-amber-100 text-amber-700 border border-amber-200 px-3 py-1.5 rounded text-xs transition-colors font-medium" href="#/other/prd-bonus-detail" target="_blank">
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
<!-- 零散需求 (空状态父级) -->
<div class="bg-white rounded-lg shadow-sm border border-orange-200 overflow-hidden accordion-item">
<div @click="toggleElement($event)" class="px-4 py-3 cursor-pointer hover:bg-orange-50/50 transition-colors flex justify-between items-center">
<div class="flex flex-col gap-1">
<div class="flex items-center gap-3">
<span class="bg-orange-100 text-orange-700 px-2 py-1 rounded text-xs font-bold">其他需求</span>
<h3 class="text-base font-bold text-gray-800">零散需求</h3>
</div>
<p class="text-xs text-gray-500 mt-1">用于承接研发中的零散任务与临时需求，当前作为独立同级菜单保留。</p>
</div>
<div class="flex items-center gap-3 text-gray-400">
<span class="text-xs bg-gray-100 px-2 py-1 rounded">包含 2 个任务</span>
<i class="fas fa-chevron-down accordion-icon"></i>
</div>
</div>
<div class="accordion-content border-t border-orange-100">
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
</tbody>
</table>
</div>
</div>
</div>
</div>
</div>
<!-- 规划中需求 -->
<div class="mb-6 bg-purple-50/30 rounded-lg shadow-sm border border-purple-200 overflow-hidden">
<div class="px-4 py-3 border-b border-purple-200 bg-purple-50/50 flex items-center justify-between">
<div class="flex items-center gap-2">
<h2 class="text-lg font-bold text-gray-800 flex items-center gap-2">
<i class="fa-solid fa-inbox text-[#8B5CF6]"></i> 规划中需求
                    </h2>
<span class="text-xs font-medium text-gray-500 bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full border border-purple-200">排期中</span>
</div>
</div>
<!-- 需求列表容器 -->
<div class="p-4 flex flex-col gap-3 bg-gray-50/50">
<!-- 活动管理 (父级需求) -->
<div class="bg-white rounded-lg shadow-sm border border-purple-200 overflow-hidden accordion-item">
<div @click="toggleElement($event)" class="px-4 py-3 cursor-pointer hover:bg-purple-50/50 transition-colors flex justify-between items-center">
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
<div class="bg-white rounded-lg shadow-sm border border-purple-200 overflow-hidden accordion-item">
<div @click="toggleElement($event)" class="px-4 py-3 cursor-pointer hover:bg-purple-50/50 transition-colors flex justify-between items-center">
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
<div class="bg-white rounded-lg shadow-sm border border-purple-200 overflow-hidden accordion-item">
<div @click="toggleElement($event)" class="px-4 py-3 cursor-pointer hover:bg-purple-50/50 transition-colors flex justify-between items-center">
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
<!-- 规划需求卡片 1 -->
<div class="bg-white rounded-lg shadow-sm border border-purple-200 overflow-hidden accordion-item">
<div @click="toggleElement($event)" class="px-4 py-3 cursor-pointer hover:bg-purple-50/50 transition-colors flex justify-between items-center">
<div class="flex flex-col gap-1">
<div class="flex items-center gap-3">
<span class="bg-purple-100 text-purple-700 px-2 py-1 rounded text-xs font-bold">智能交易系统</span>
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
<a class="px-3 py-1.5 text-xs font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 rounded transition-colors flex items-center gap-1 border border-gray-200" href="#/other/prd-product-list" target="_blank">列表 PRD</a>
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
<a class="px-3 py-1.5 text-xs font-medium rounded transition-colors flex items-center gap-1 border border-gray-200 text-white bg-blue-500 hover:bg-blue-600 border-blue-500" href="#/other/prd-product-detail" target="_blank">详情 PRD</a>
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
<a class="px-3 py-1.5 text-xs font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 rounded transition-colors flex items-center gap-1 border border-gray-200" href="#/other/prd-admin-product-management" target="_blank">PRD</a>
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
<a class="px-3 py-1.5 text-xs font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 rounded transition-colors flex items-center gap-1 border border-gray-200" href="#/other/prd-admin-product-edit" target="_blank">PRD</a>
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
<a class="px-3 py-1.5 text-xs font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 rounded transition-colors flex items-center gap-1 border border-gray-200" href="#/other/prd-client-my-orders" target="_blank">PRD</a>
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
<a class="px-3 py-1.5 text-xs font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 rounded transition-colors flex items-center gap-1 border border-gray-200" href="#/other/prd-admin-product-orders" target="_blank">PRD</a>
<a class="inline-flex items-center gap-1 bg-teal-50 hover:bg-teal-100 theme-text px-3 py-1.5 rounded text-xs transition-colors theme-border border" href="#/product/orders" target="_blank"><i class="fas fa-desktop"></i> 后台订单原型</a>
</div>
</td>
</tr>
</tbody>
</table>
</div>
</div>
</div>
<!-- 集团动态二期 -->
<div class="bg-white rounded-lg shadow-sm border border-purple-200 overflow-hidden accordion-item">
<div @click="toggleElement($event)" class="px-4 py-3 cursor-pointer hover:bg-purple-50/50 transition-colors flex justify-between items-center">
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
import { openPrd } from '@/store/prd'

const openHomeProgressPrd = () => openPrd('prd-home.html', 'Pcard 首页进度 - PRD')

const openPcardJoinPrd = () => openPrd('prd-home-pcard-activity-join.html', 'PCard 活动参与 - PRD')

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
