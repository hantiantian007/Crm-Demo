<template>
  <div class="flex-1 overflow-y-auto p-4 md:p-6 relative custom-scrollbar bg-gray-50 w-full text-sm">
    <div class="max-w-screen-2xl mx-auto">
      <!-- 页面头部 -->
      <div class="mb-4 flex justify-between items-end">
        <div>
          <h1 class="text-xl font-bold text-gray-800 mb-1">历史需求记录</h1>
          <p class="text-xs text-gray-500">已上线或归档的历史需求 (Completed)</p>
        </div>
      </div>

      <!-- 已完成需求池 (Completed) -->
<div class="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden mb-6 opacity-70 accordion-item">
<div @click="toggleElement($event)" class="px-4 py-3 border-b border-gray-200 bg-gray-50 flex justify-between items-center cursor-pointer hover:bg-gray-100 transition-colors">
<div class="flex items-center gap-2">
<h2 class="text-base font-bold text-gray-800 flex items-center gap-2">
<i class="fa-solid fa-check-circle text-green-500"></i> 已完成需求 (Completed)
                    </h2>
<span class="text-xs font-medium text-gray-500 bg-gray-200 px-3 py-1 rounded-full">已上线 / 归档</span>
</div>
<div class="flex items-center gap-3 text-gray-400">
<span class="text-xs bg-gray-200 px-2 py-1 rounded">点击展开查看</span>
<i class="fas fa-chevron-down accordion-icon"></i>
</div>
</div>
<div class="accordion-content">
<div class="overflow-x-auto no-scrollbar">
<table class="min-w-full text-xs text-left">
<thead>
<tr class="bg-gray-100 text-gray-600">
<th class="px-5 py-4 font-medium whitespace-nowrap">所属模块</th>
<th class="px-5 py-4 font-medium whitespace-nowrap">需求名称</th>
<th class="px-5 py-4 font-medium min-w-[200px]">需求概述</th>
<th class="px-5 py-4 font-medium whitespace-nowrap">所属客户端</th>
<th class="px-5 py-4 font-medium text-center whitespace-nowrap"><i class="far fa-calendar-check mr-1"></i>完成状态</th>
<th class="px-5 py-4 font-medium whitespace-nowrap">上线时间</th>
<th class="px-5 py-4 font-medium min-w-[280px]">交付物预览</th>
</tr>
</thead>
<tbody class="text-gray-600 divide-y divide-gray-100" id="completed-tbody">
<!-- 已完成: 返佣校验-佣金每日对账 -->
<tr class="table-row-hover bg-white">
<td class="px-5 py-4 font-medium text-gray-900 whitespace-nowrap">返佣校验</td>
<td class="px-5 py-4 font-bold text-gray-800 whitespace-nowrap">佣金每日对账</td>
<td class="px-5 py-4 text-gray-500">纯提醒型对账工具：基于「平仓订单」独立重算理论返佣（不改动任何系统金额），与系统实际返佣记录进行“订单数”和“总金额”的双向对比。</td>
<td class="px-5 py-4">
<div class="flex flex-col gap-1">
<span class="inline-block px-2 py-0.5 text-[11px] rounded tag-group w-max">Group(含HK)</span>
</div>
</td>
<td class="px-5 py-4 text-center font-medium text-gray-800 relative group whitespace-nowrap">2026-09-01</td>
<td class="px-5 py-4 text-gray-500 whitespace-nowrap">2026-08-30 18:00</td>
<td class="px-5 py-4">
<div class="flex flex-col gap-2">
<div class="flex flex-wrap gap-2 items-center">
<a class="inline-flex items-center gap-1 bg-teal-50 hover:bg-teal-100 theme-text px-3 py-1.5 rounded text-xs transition-colors theme-border border" href="#/crm/commission-daily-audit" target="_blank">
<i class="fas fa-desktop text-gray-400"></i> 对账页原型
                                        </a>
</div>
</div>
</td>
</tr>
<!-- 已完成: 返佣校验-对账记录 -->
<tr class="table-row-hover bg-white">
<td class="px-5 py-4 font-medium text-gray-900 whitespace-nowrap">返佣校验</td>
<td class="px-5 py-4 font-bold text-gray-800 whitespace-nowrap">对账记录</td>
<td class="px-5 py-4 text-gray-500">纯留痕型对账批次记录库：按对账日期归档生成的批次列表。宏观展示各批次的对账状态、订单数/金额快照及差额统计。</td>
<td class="px-5 py-4">
<div class="flex flex-col gap-1">
<span class="inline-block px-2 py-0.5 text-[11px] rounded tag-group w-max">Group(含HK)</span>
</div>
</td>
<td class="px-5 py-4 text-center font-medium text-gray-800 relative group whitespace-nowrap">2026-09-01</td>
<td class="px-5 py-4 text-gray-500 whitespace-nowrap">2026-08-30 18:00</td>
<td class="px-5 py-4">
<div class="flex flex-col gap-2">
<div class="flex flex-wrap gap-2 items-center">
<a class="inline-flex items-center gap-1 bg-teal-50 hover:bg-teal-100 theme-text px-3 py-1.5 rounded text-xs transition-colors theme-border border" href="#/crm/commission-audit-log" target="_blank">
<i class="fas fa-desktop text-gray-400"></i> 对账记录原型
                                        </a>
</div>
</div>
</td>
</tr>
<!-- 已完成: 其他需求-公司新闻 -->
<tr class="table-row-hover bg-white">
<td class="px-5 py-4 font-medium text-gray-900 whitespace-nowrap">其他需求</td>
<td class="px-5 py-4 font-bold text-gray-800 whitespace-nowrap">公司新闻</td>
<td class="px-5 py-4 text-gray-500">公司新闻增加简体中文录入。</td>
<td class="px-5 py-4">
<div class="flex flex-col gap-1">
<span class="inline-block px-2 py-0.5 text-[11px] rounded tag-hk w-max">HK CRM</span>
</div>
</td>
<td class="px-5 py-4 text-center font-medium text-gray-800 relative group whitespace-nowrap">2026-09-01</td>
<td class="px-5 py-4 text-gray-500 whitespace-nowrap">2026-08-30 18:00</td>
<td class="px-5 py-4">
<div class="flex flex-col gap-2">
<div class="flex flex-wrap gap-2 items-center">
<a class="inline-flex items-center gap-1 bg-teal-50 hover:bg-teal-100 theme-text px-3 py-1.5 rounded text-xs transition-colors theme-border border" href="#/other/news-add" target="_blank">
<i class="fas fa-desktop text-gray-400"></i> 原型
                                        </a>
</div>
</div>
</td>
</tr>
<!-- 已完成: 出入金-出金申请 -->
<tr class="table-row-hover bg-white">
<td class="px-5 py-4 font-medium text-gray-900 whitespace-nowrap">出入金</td>
<td class="px-5 py-4 font-bold text-gray-800 whitespace-nowrap">出金申请</td>
<td class="px-5 py-4 text-gray-500">出金申请时，未显示赠金金额。</td>
<td class="px-5 py-4">
<div class="flex flex-col gap-1">
<span class="inline-block px-2 py-0.5 text-[11px] rounded tag-group w-max">Group(含HK)</span>
</div>
</td>
<td class="px-5 py-4 text-center font-medium text-gray-800 relative group whitespace-nowrap">2026-09-10</td>
<td class="px-5 py-4 text-gray-500 whitespace-nowrap">2026-09-10 17:55</td>
<td class="px-5 py-4">
<div class="flex flex-col gap-2">
<div class="flex flex-wrap gap-2 items-center">
<a class="inline-flex items-center gap-1 bg-teal-50 hover:bg-teal-100 theme-text px-3 py-1.5 rounded text-xs transition-colors theme-border border" href="#/fund/withdraw" target="_blank">
<i class="fas fa-laptop-code text-gray-400"></i> 原型
                                        </a>
</div>
</div>
</td>
</tr>
<!-- 已完成: 出入金-银行卡审核 -->
<tr class="table-row-hover bg-white">
<td class="px-5 py-4 font-medium text-gray-900 whitespace-nowrap">出入金</td>
<td class="px-5 py-4 font-bold text-gray-800 whitespace-nowrap">银行卡审核</td>
<td class="px-5 py-4 text-gray-500">银行卡审核时，增加 Pcard 唯一编号字段。</td>
<td class="px-5 py-4">
<div class="flex flex-col gap-1">
<span class="inline-block px-2 py-0.5 text-[11px] rounded tag-group w-max">Group(含HK)</span>
</div>
</td>
<td class="px-5 py-4 text-center font-medium text-gray-800 relative group whitespace-nowrap">2026-09-10</td>
<td class="px-5 py-4 text-gray-500 whitespace-nowrap">2026-09-10 17:55</td>
<td class="px-5 py-4">
<div class="flex flex-col gap-2">
<div class="flex flex-wrap gap-2 items-center">
<a class="inline-flex items-center gap-1 bg-teal-50 hover:bg-teal-100 theme-text px-3 py-1.5 rounded text-xs transition-colors theme-border border" href="#/fund/audit-bankcard" target="_blank">
<i class="fas fa-laptop-code text-gray-400"></i> 原型
                                        </a>
</div>
</div>
</td>
</tr>
<!-- 已完成: 营销活动-Pcard活动下级需求 -->
<tr class="table-row-hover bg-white">
<td class="px-5 py-4 font-medium text-gray-900 whitespace-nowrap">营销活动</td>
<td class="px-5 py-4 font-bold text-gray-800 whitespace-nowrap">Pcard活动下级需求</td>
<td class="px-5 py-4 text-gray-500">活动列表与详情数据展示：新增活动入口、状态与参与人数展示；精简详情状态流转与过滤条件，仅保留参与中与已达标只读数据。</td>
<td class="px-5 py-4">
<div class="flex flex-col gap-1">
<span class="inline-block px-2 py-0.5 text-[11px] rounded tag-group w-max">Group(含HK)</span>
</div>
</td>
<td class="px-5 py-4 text-center font-medium text-gray-800 relative group whitespace-nowrap">2026-09-10</td>
<td class="px-5 py-4 text-gray-500 whitespace-nowrap">2026-09-10 17:55</td>
<td class="px-5 py-4">
<div class="flex flex-col gap-2">
<div class="flex flex-wrap gap-2 items-center">
<a class="inline-flex items-center gap-1 bg-teal-50 hover:bg-teal-100 theme-text px-3 py-1.5 rounded text-xs transition-colors theme-border border" href="#/activity/list" target="_blank">
<i class="fas fa-laptop-code text-gray-400"></i> 活动列表
                                        </a>
<a class="inline-flex items-center gap-1 bg-teal-50 hover:bg-teal-100 theme-text px-3 py-1.5 rounded text-xs transition-colors theme-border border" href="#/activity/pcard" target="_blank">
<i class="fas fa-laptop-code text-gray-400"></i> 详情与数据
                                        </a>
<a class="px-3 py-1.5 text-xs font-medium text-blue-700 bg-blue-50 hover:bg-blue-100 rounded transition-colors flex items-center gap-1 border border-blue-200" href="#/other/prd-pcard-list" target="_blank">PRD-列表</a>
<a class="px-3 py-1.5 text-xs font-medium text-blue-700 bg-blue-50 hover:bg-blue-100 rounded transition-colors flex items-center gap-1 border border-blue-200" href="#/other/prd-pcard-detail" target="_blank">PRD-详情</a>
</div>
</div>
</td>
</tr>
<!-- 已完成: 出入金-银行卡绑定提示 -->
<tr class="table-row-hover bg-white">
<td class="px-5 py-4 font-medium text-gray-900 whitespace-nowrap">出入金</td>
<td class="px-5 py-4 font-bold text-gray-800 whitespace-nowrap">银行卡绑定提示</td>
<td class="px-5 py-4 text-gray-500">绑定 Planet card 时，增加获取唯一编号的图文弹窗提示。</td>
<td class="px-5 py-4">
<div class="flex flex-col gap-1">
<span class="inline-block px-2 py-0.5 text-[11px] rounded tag-group w-max">Group(含HK)</span>
</div>
</td>
<td class="px-5 py-4 text-center font-medium text-gray-800 relative group whitespace-nowrap">2026-09-10</td>
<td class="px-5 py-4 text-gray-500 whitespace-nowrap">2026-09-10 17:55</td>
<td class="px-5 py-4">
<span class="text-gray-400 text-xs italic">
<i class="fas fa-info-circle mr-1"></i>无 PRD / 无原型
                                </span>
</td>
</tr>
<!-- 已完成: 资金管理-支付对接需求 -->
<tr class="table-row-hover bg-white">
<td class="px-5 py-4 font-medium text-gray-900 whitespace-nowrap">资金管理</td>
<td class="px-5 py-4 font-bold text-gray-800 whitespace-nowrap">支付对接需求</td>
<td class="px-5 py-4 text-gray-500">对接新的支付通道。</td>
<td class="px-5 py-4">
<div class="flex flex-col gap-1">
<span class="inline-block px-2 py-0.5 text-[11px] rounded tag-group w-max">Group(含HK)</span>
</div>
</td>
<td class="px-5 py-4 text-center font-medium text-gray-800 relative group whitespace-nowrap">2026-09-10</td>
<td class="px-5 py-4 text-gray-500 whitespace-nowrap">2026-09-10 17:55</td>
<td class="px-5 py-4">
<span class="text-gray-400 text-xs italic">
<i class="fas fa-info-circle mr-1"></i>无 PRD / 无原型
                                </span>
</td>
</tr>
<!-- 已完成: 数据统计-净值报表 -->
<tr class="table-row-hover bg-white">
<td class="px-5 py-4 font-medium text-gray-900 whitespace-nowrap">报表中心</td>
<td class="px-5 py-4 font-bold text-gray-800 whitespace-nowrap">净值报表</td>
<td class="px-5 py-4 text-gray-500">客户/账户维度的净值统计报表；原型复用现有净值报表页面结构。</td>
<td class="px-5 py-4">
<div class="flex flex-col gap-1">
<span class="inline-block px-2 py-0.5 text-[11px] rounded tag-group w-max">Group(含HK)</span>
</div>
</td>
<td class="px-5 py-4 text-center font-medium text-gray-800 relative group whitespace-nowrap">2026-08-31</td>
<td class="px-5 py-4 text-gray-500 whitespace-nowrap">2026-08-30 18:00</td>
<td class="px-5 py-4">
<div class="flex flex-col gap-2">
<div class="flex flex-wrap gap-2 items-center">
<a class="inline-flex items-center gap-1 bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1.5 rounded text-xs transition-colors border border-gray-200" href="#/other/prd-report-equity" target="_blank">PRD</a>
<a class="inline-flex items-center gap-1 bg-teal-50 hover:bg-teal-100 theme-text px-3 py-1.5 rounded text-xs transition-colors theme-border border" href="#/report/equity" target="_blank">原型</a>
</div>
</div>
</td>
</tr>
<!-- 已完成: 数据统计-现实持仓报表 -->
<tr class="table-row-hover bg-white">
<td class="px-5 py-4 font-medium text-gray-900 whitespace-nowrap">报表中心</td>
<td class="px-5 py-4 font-bold text-gray-800 whitespace-nowrap">现实持仓报表</td>
<td class="px-5 py-4 text-gray-500">按交易品种维度汇总多空双向持仓量、均价、净敞口、盈亏与未覆盖敞口，底部汇总行突出展示。</td>
<td class="px-5 py-4">
<div class="flex flex-col gap-1">
<span class="inline-block px-2 py-0.5 text-[11px] rounded tag-group w-max">Group(含HK)</span>
</div>
</td>
<td class="px-5 py-4 text-center font-medium text-gray-800 relative group whitespace-nowrap">2026-08-31</td>
<td class="px-5 py-4 text-gray-500 whitespace-nowrap">2026-08-30 18:00</td>
<td class="px-5 py-4">
<div class="flex flex-col gap-2">
<div class="flex flex-wrap gap-2 items-center">
<a class="inline-flex items-center gap-1 bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1.5 rounded text-xs transition-colors border border-gray-200" href="#/other/prd-report-real-position" target="_blank">PRD</a>
<a class="inline-flex items-center gap-1 bg-teal-50 hover:bg-teal-100 theme-text px-3 py-1.5 rounded text-xs transition-colors theme-border border" href="#/report/real-position" target="_blank">原型</a>
</div>
</div>
</td>
</tr>
<!-- 已完成: 数据统计-平仓统计报表 -->
<tr class="table-row-hover bg-white">
<td class="px-5 py-4 font-medium text-gray-900 whitespace-nowrap">报表中心</td>
<td class="px-5 py-4 font-bold text-gray-800 whitespace-nowrap">平仓统计报表</td>
<td class="px-5 py-4 text-gray-500">历史平仓订单的汇总与明细统计；原型复用平仓交易记录页面结构。</td>
<td class="px-5 py-4">
<div class="flex flex-col gap-1">
<span class="inline-block px-2 py-0.5 text-[11px] rounded tag-group w-max">Group(含HK)</span>
</div>
</td>
<td class="px-5 py-4 text-center font-medium text-gray-800 relative group whitespace-nowrap">2026-08-31</td>
<td class="px-5 py-4 text-gray-500 whitespace-nowrap">2026-08-30 18:00</td>
<td class="px-5 py-4">
<div class="flex flex-col gap-2">
<div class="flex flex-wrap gap-2 items-center">
<a class="inline-flex items-center gap-1 bg-teal-50 hover:bg-teal-100 theme-text px-3 py-1.5 rounded text-xs transition-colors theme-border border" href="#/report/close-position" target="_blank">原型</a>
</div>
</div>
</td>
</tr>
<!-- 已完成: 数据统计-盈亏报表 -->
<tr class="table-row-hover bg-white">
<td class="px-5 py-4 font-medium text-gray-900 whitespace-nowrap">报表中心</td>
<td class="px-5 py-4 font-bold text-gray-800 whitespace-nowrap">盈亏报表</td>
<td class="px-5 py-4 text-gray-500">客户/代理维度的盈亏汇总统计；原型基于净值报表结构调整。</td>
<td class="px-5 py-4">
<div class="flex flex-col gap-1">
<span class="inline-block px-2 py-0.5 text-[11px] rounded tag-group w-max">Group(含HK)</span>
</div>
</td>
<td class="px-5 py-4 text-center font-medium text-gray-800 relative group whitespace-nowrap">2026-08-31</td>
<td class="px-5 py-4 text-gray-500 whitespace-nowrap">2026-08-30 18:00</td>
<td class="px-5 py-4">
<div class="flex flex-col gap-2">
<div class="flex flex-wrap gap-2 items-center">
<a class="inline-flex items-center gap-1 bg-teal-50 hover:bg-teal-100 theme-text px-3 py-1.5 rounded text-xs transition-colors theme-border border" href="#/report/profit" target="_blank">原型</a>
</div>
</div>
</td>
</tr>
<!-- 已完成: 其他需求-客户留资 -->
<tr class="table-row-hover bg-white">
<td class="px-5 py-4 font-medium text-gray-900 whitespace-nowrap">其他需求</td>
<td class="px-5 py-4 font-bold text-gray-800 whitespace-nowrap">客户留资</td>
<td class="px-5 py-4 text-gray-500">客户留资页面增加一个新增入口，供客服人员手动录入留资信息。</td>
<td class="px-5 py-4">
<div class="flex flex-col gap-1">
<span class="inline-block px-2 py-0.5 text-[11px] rounded tag-group w-max">Group(含HK)</span>
</div>
</td>
<td class="px-5 py-4 text-center font-medium text-gray-800 relative group whitespace-nowrap">2026-08-31</td>
<td class="px-5 py-4 text-gray-500 whitespace-nowrap">2026-08-30 18:00</td>
<td class="px-5 py-4">
<div class="flex flex-col gap-2">
<div class="flex flex-wrap gap-2 items-center">
<a class="inline-flex items-center gap-1 bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1.5 rounded text-xs transition-colors border border-gray-200" href="#/other/prd-leads-list" target="_blank">PRD</a>
<a class="inline-flex items-center gap-1 bg-teal-50 hover:bg-teal-100 theme-text px-3 py-1.5 rounded text-xs transition-colors theme-border border" href="#/crm/leads-list" target="_blank">原型</a>
<a class="inline-flex items-center gap-1 bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 px-3 py-1.5 rounded text-xs transition-colors" href="#/other/manual-customer-leads" target="_blank"><i class="fa-solid fa-book"></i> 操作手册</a>
</div>
</div>
</td>
</tr>
<!-- 已完成: 其他需求-批量修改MT密码 -->
<tr class="table-row-hover bg-white">
<td class="px-5 py-4 font-medium text-gray-900 whitespace-nowrap">其他需求</td>
<td class="px-5 py-4 font-bold text-gray-800 whitespace-nowrap">批量修改MT密码</td>
<td class="px-5 py-4 text-gray-500">支持对选中的多个 MT 账号进行批量重置密码操作，提高运维效率。</td>
<td class="px-5 py-4">
<div class="flex flex-col gap-1">
<span class="inline-block px-2 py-0.5 text-[11px] rounded tag-group w-max">Group(含HK)</span>
</div>
</td>
<td class="px-5 py-4 text-center font-medium text-gray-800 relative group whitespace-nowrap">2026-08-31</td>
<td class="px-5 py-4 text-gray-500 whitespace-nowrap">2026-08-30 18:00</td>
<td class="px-5 py-4">
<div class="flex flex-col gap-2">
<div class="flex flex-wrap gap-2 items-center">
<a class="inline-flex items-center gap-1 bg-teal-50 hover:bg-teal-100 theme-text px-3 py-1.5 rounded text-xs transition-colors theme-border border" href="#/other/batch-mt-password-reset" target="_blank">原型</a>
<a class="inline-flex items-center gap-1 bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 px-3 py-1.5 rounded text-xs transition-colors" href="#/other/manual-batch-password-reset" target="_blank"><i class="fa-solid fa-book"></i> 操作手册</a>
</div>
</div>
</td>
</tr>
<!-- 已完成: 其他需求-优势页面 -->
<tr class="table-row-hover bg-white">
<td class="px-5 py-4 font-medium text-gray-900 whitespace-nowrap">其他需求</td>
<td class="px-5 py-4 font-bold text-gray-800 whitespace-nowrap">优势页面</td>
<td class="px-5 py-4 text-gray-500">港版增加【我们的优势】页面。</td>
<td class="px-5 py-4">
<div class="flex flex-col gap-1">
<span class="inline-block px-2 py-0.5 text-[11px] rounded tag-hk w-max">HK 官网</span>
</div>
</td>
<td class="px-5 py-4 text-center font-medium text-gray-800 relative group whitespace-nowrap">2026-08-31</td>
<td class="px-5 py-4 text-gray-500 whitespace-nowrap">2026-08-30 18:00</td>
<td class="px-5 py-4">
<span class="text-gray-400 text-xs italic">
<i class="fas fa-info-circle mr-1"></i>无 PRD / 无原型
                                </span>
</td>
</tr>
<!-- 已完成: 盈亏报表-1 -->
<tr class="table-row-hover bg-white">
<td class="px-5 py-4 font-medium text-gray-900 whitespace-nowrap">风控与运营报表</td>
<td class="px-5 py-4 font-bold text-gray-800 whitespace-nowrap">盈亏报表-1</td>
<td class="px-5 py-4 text-gray-500">展示各代理/直客净入金、平仓与浮动盈亏、平台净客损 (版本 1)</td>
<td class="px-5 py-4">
<div class="flex flex-col gap-1">
<span class="inline-block px-2 py-0.5 text-[11px] rounded tag-group w-max">Group(含HK)</span>
</div>
</td>
<td class="px-5 py-4 text-center font-medium text-gray-800 relative group whitespace-nowrap">2026-08-26</td>
<td class="px-5 py-4 text-gray-500 whitespace-nowrap">2026-08-30 18:00</td>
<td class="px-5 py-4">
<div class="flex flex-col gap-2">
<div class="flex flex-wrap gap-2 items-center">
<a class="inline-flex items-center gap-1 bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1.5 rounded text-xs transition-colors border border-gray-200" href="#/other/prd-report-pnl-1" target="_blank">PRD</a>
<a class="inline-flex items-center gap-1 bg-teal-50 hover:bg-teal-100 theme-text px-3 py-1.5 rounded text-xs transition-colors theme-border border" href="#/report/pnl-1" target="_blank">原型</a>
</div>
</div>
</td>
</tr>
<!-- 已完成: 盈亏报表-2 -->
<tr class="table-row-hover bg-white">
<td class="px-5 py-4 font-medium text-gray-900 whitespace-nowrap">风控与运营报表</td>
<td class="px-5 py-4 font-bold text-gray-800 whitespace-nowrap">盈亏报表-2</td>
<td class="px-5 py-4 text-gray-500">展示各代理/直客净入金、平仓与浮动盈亏、平台净客损 (版本 2)</td>
<td class="px-5 py-4">
<div class="flex flex-col gap-1">
<span class="inline-block px-2 py-0.5 text-[11px] rounded tag-group w-max">Group(含HK)</span>
</div>
</td>
<td class="px-5 py-4 text-center font-medium text-gray-800 relative group whitespace-nowrap">2026-08-26</td>
<td class="px-5 py-4 text-gray-500 whitespace-nowrap">2026-08-30 18:00</td>
<td class="px-5 py-4">
<div class="flex flex-col gap-2">
<div class="flex flex-wrap gap-2 items-center">
<a class="inline-flex items-center gap-1 bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1.5 rounded text-xs transition-colors border border-gray-200" href="#/other/prd-report-pnl-2" target="_blank">PRD</a>
<a class="inline-flex items-center gap-1 bg-teal-50 hover:bg-teal-100 theme-text px-3 py-1.5 rounded text-xs transition-colors theme-border border" href="#/report/pnl-2" target="_blank">原型</a>
</div>
</div>
</td>
</tr>
<!-- 已完成: 净值报表 -->
<tr class="table-row-hover bg-white">
<td class="px-5 py-4 font-medium text-gray-900 whitespace-nowrap">风控与运营报表</td>
<td class="px-5 py-4 font-bold text-gray-800 whitespace-nowrap">净值报表</td>
<td class="px-5 py-4 text-gray-500">核心风控页面，高亮预付款比例 &lt; 150% 的高风险客户</td>
<td class="px-5 py-4">
<div class="flex flex-col gap-1">
<span class="inline-block px-2 py-0.5 text-[11px] rounded tag-group w-max">Group(含HK)</span>
</div>
</td>
<td class="px-5 py-4 text-center font-medium text-gray-800 relative group whitespace-nowrap">2026-08-26</td>
<td class="px-5 py-4 text-gray-500 whitespace-nowrap">2026-08-30 18:00</td>
<td class="px-5 py-4">
<div class="flex flex-col gap-2">
<div class="flex flex-wrap gap-2 items-center">
<a class="inline-flex items-center gap-1 bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1.5 rounded text-xs transition-colors border border-gray-200" href="#/other/prd-report-equity" target="_blank">PRD</a>
<a class="inline-flex items-center gap-1 bg-teal-50 hover:bg-teal-100 theme-text px-3 py-1.5 rounded text-xs transition-colors theme-border border" href="#/report/equity" target="_blank">原型</a>
</div>
</div>
</td>
</tr>
<!-- 已完成: 持仓报表 -->
<tr class="table-row-hover bg-white">
<td class="px-5 py-4 font-medium text-gray-900 whitespace-nowrap">风控与运营报表</td>
<td class="px-5 py-4 font-bold text-gray-800 whitespace-nowrap">持仓报表</td>
<td class="px-5 py-4 text-gray-500">监控各交易品种的多空净敞口方向，防范单边风险</td>
<td class="px-5 py-4">
<div class="flex flex-col gap-1">
<span class="inline-block px-2 py-0.5 text-[11px] rounded tag-group w-max">Group(含HK)</span>
</div>
</td>
<td class="px-5 py-4 text-center font-medium text-gray-800 relative group whitespace-nowrap">2026-08-26</td>
<td class="px-5 py-4 text-gray-500 whitespace-nowrap">2026-08-30 18:00</td>
<td class="px-5 py-4">
<div class="flex flex-col gap-2">
<div class="flex flex-wrap gap-2 items-center">
<a class="inline-flex items-center gap-1 bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1.5 rounded text-xs transition-colors border border-gray-200" href="#/other/prd-report-position" target="_blank">PRD</a>
<a class="inline-flex items-center gap-1 bg-teal-50 hover:bg-teal-100 theme-text px-3 py-1.5 rounded text-xs transition-colors theme-border border" href="#/report/position" target="_blank">原型</a>
</div>
</div>
</td>
</tr>
<!-- 已完成: 同名账户开通 -->
<tr class="table-row-hover bg-white">
<td class="px-5 py-4 font-medium text-gray-900 whitespace-nowrap">账户管理</td>
<td class="px-5 py-4 font-bold text-gray-800 whitespace-nowrap">同名账户开通</td>
<td class="px-5 py-4 text-gray-500">同名账户开通，增加自动审核配置开关。</td>
<td class="px-5 py-4">
<div class="flex flex-col gap-1">
<span class="inline-block px-2 py-0.5 text-[11px] rounded tag-group w-max">Group(含HK)</span>
</div>
</td>
<td class="px-5 py-4 text-center font-medium text-gray-800 relative group whitespace-nowrap">2026-08-20</td>
<td class="px-5 py-4 text-gray-500 whitespace-nowrap">2026-08-30 18:00</td>
<td class="px-5 py-4">
<span class="text-gray-400 text-xs italic">
<i class="fas fa-info-circle mr-1"></i>无 PRD / 无原型
                                </span>
</td>
</tr>
<!-- 已完成: 留言数量提醒 -->
<tr class="table-row-hover bg-white">
<td class="px-5 py-4 font-medium text-gray-900 whitespace-nowrap">客户服务</td>
<td class="px-5 py-4 font-bold text-gray-800 whitespace-nowrap">留言数量提醒</td>
<td class="px-5 py-4 text-gray-500">留言功能增加消息提醒。</td>
<td class="px-5 py-4">
<div class="flex flex-col gap-1">
<span class="inline-block px-2 py-0.5 text-[11px] rounded tag-group w-max">Group(含HK)</span>
</div>
</td>
<td class="px-5 py-4 text-center font-medium text-gray-800 relative group whitespace-nowrap">2026-08-20</td>
<td class="px-5 py-4 text-gray-500 whitespace-nowrap">2026-08-30 18:00</td>
<td class="px-5 py-4">
<span class="text-gray-400 text-xs italic">
<i class="fas fa-info-circle mr-1"></i>无 PRD / 无原型
                                </span>
</td>
</tr>
<!-- 已完成: 支付管理列表 -->
<tr class="table-row-hover bg-white">
<td class="px-5 py-4 font-medium text-gray-900 whitespace-nowrap">资金管理</td>
<td class="px-5 py-4 font-bold text-gray-800 whitespace-nowrap">支付管理列表</td>
<td class="px-5 py-4 text-gray-500">统一展示所有已配置支付方式，10 列固定结构（编号、简称、支付编号、支付名称、商户号、币种、提示语、汇率、状态、操作），支持行展开查看限额/费率/备注、一键启停、编辑删除、新增支付方式弹窗。</td>
<td class="px-5 py-4">
<div class="flex flex-col gap-1">
<span class="inline-block px-2 py-0.5 text-[11px] rounded tag-group-only w-max">Crm-Group</span>
</div>
</td>
<td class="px-5 py-4 text-center font-medium text-gray-800 relative group whitespace-nowrap">2026-08-20</td>
<td class="px-5 py-4 text-gray-500 whitespace-nowrap">2026-08-30 18:00</td>
<td class="px-5 py-4">
<div class="flex flex-wrap gap-2 items-center">
<a class="inline-flex items-center gap-1 bg-teal-50 hover:bg-teal-100 theme-text px-3 py-1.5 rounded text-xs transition-colors theme-border border" href="#/fund/payment-management" target="_blank">
<i class="fas fa-laptop-code text-gray-400"></i> 支付管理原型
                                    </a>
<a class="px-3 py-1.5 text-xs font-medium text-blue-700 bg-blue-50 hover:bg-blue-100 rounded transition-colors flex items-center gap-1 border border-blue-200" href="#/other/prd-payment-management" target="_blank">
                                        页面PRD
                                    </a>
</div>
</td>
</tr>
<tr class="table-row-hover bg-white">
<td class="px-5 py-4 font-medium text-gray-900 whitespace-nowrap">佣金管理</td>
<td class="px-5 py-4 font-bold text-gray-800 whitespace-nowrap">禁止返佣</td>
<td class="px-5 py-4 text-gray-500">支持针对单个用户设置不接收任何返佣，用于黑名单配置，防止特定客户/销售可独立关闭返佣发放。</td>
<td class="px-5 py-4">
<div class="flex flex-col gap-1">
<span class="inline-block px-2 py-0.5 text-[11px] rounded tag-group w-max">Group(含HK)</span>
</div>
</td>
<td class="px-5 py-4 text-center font-medium text-gray-800 relative group whitespace-nowrap">2026-08-18</td>
<td class="px-5 py-4 text-gray-500 whitespace-nowrap">2026-08-30 18:00</td>
<td class="px-5 py-4">
<div class="flex flex-wrap gap-2 items-center">
<span class="px-2 py-0.5 text-[10px] rounded-full bg-gray-100 text-gray-500 border border-gray-200">无交付物</span>
</div>
</td>
</tr>
<tr class="table-row-hover bg-white">
<td class="px-5 py-4 font-medium text-gray-900 whitespace-nowrap">报表中心</td>
<td class="px-5 py-4 font-bold text-gray-800 whitespace-nowrap">增加导出功能</td>
<td class="px-5 py-4 text-gray-500">销售出入金统计、销售交易统计报表补齐导出能力，严格按当前筛选条件导出报表数据一键导出 CSV / Excel。</td>
<td class="px-5 py-4">
<div class="flex flex-col gap-1">
<span class="inline-block px-2 py-0.5 text-[11px] rounded tag-group w-max">Group(含HK)</span>
</div>
</td>
<td class="px-5 py-4 text-center font-medium text-gray-800 relative group whitespace-nowrap">2026-08-18</td>
<td class="px-5 py-4 text-gray-500 whitespace-nowrap">2026-08-30 18:00</td>
<td class="px-5 py-4">
<div class="flex flex-wrap gap-2 items-center">
<span class="px-2 py-0.5 text-[10px] rounded-full bg-gray-100 text-gray-500 border border-gray-200">无交付物</span>
</div>
</td>
</tr>
<tr class="table-row-hover bg-white">
<td class="px-5 py-4 font-medium text-gray-900 whitespace-nowrap">业务改造</td>
<td class="px-5 py-4 font-bold text-gray-800 whitespace-nowrap">美分业务</td>
<td class="px-5 py-4 text-gray-500">集中承接美分账户相关的产品、系统、流程与统计口径调整，涵盖注册页、开户审核、入金/出金、内部转账、交易报表、佣金对账等 20 个任务的全链路适配，补齐账户类型切换、4 位小数精度、金额双口径（USC/USD）展示。</td>
<td class="px-5 py-4">
<div class="flex flex-col gap-1">
<span class="inline-block px-2 py-0.5 text-[11px] rounded tag-group w-max">Group(含HK)</span>
</div>
</td>
<td class="px-5 py-4 text-center font-medium text-gray-800 relative group whitespace-nowrap">2026-08-14</td>
<td class="px-5 py-4 text-gray-500 whitespace-nowrap">2026-08-30 18:00</td>
<td class="px-5 py-4">
<div class="flex flex-col gap-1.5">
<div class="flex flex-wrap gap-1.5 items-center">
<a class="inline-flex items-center gap-1 bg-teal-50 hover:bg-teal-100 theme-text px-2.5 py-1 rounded text-[11px] transition-colors theme-border border" href="#/other/register" target="_blank">
<i class="fas fa-laptop-code text-gray-400"></i> 注册页原型
                                        </a>
<a class="inline-flex items-center gap-1 bg-teal-50 hover:bg-teal-100 theme-text px-2.5 py-1 rounded text-[11px] transition-colors theme-border border" href="#/crm/client-deposit-cent-account" target="_blank">
<i class="fas fa-object-group text-gray-400"></i> 入金原型
                                        </a>
<a class="inline-flex items-center gap-1 bg-teal-50 hover:bg-teal-100 theme-text px-2.5 py-1 rounded text-[11px] transition-colors theme-border border" href="Crm-Group/client-withdraw-apply-cent-account.html?account=9900456" target="_blank">
<i class="fas fa-object-group text-gray-400"></i> 出金申请
                                        </a>
<a class="inline-flex items-center gap-1 bg-teal-50 hover:bg-teal-100 theme-text px-2.5 py-1 rounded text-[11px] transition-colors theme-border border" href="#/fund/deposit-pending-review" target="_blank">
<i class="fas fa-table-list text-gray-400"></i> 待审核入金
                                        </a>
<a class="inline-flex items-center gap-1 bg-teal-50 hover:bg-teal-100 theme-text px-2.5 py-1 rounded text-[11px] transition-colors theme-border border" href="#/crm/audit" target="_blank">
<i class="fas fa-laptop-code text-gray-400"></i> 开户审核
                                        </a>
<a class="inline-flex items-center gap-1 bg-teal-50 hover:bg-teal-100 theme-text px-2.5 py-1 rounded text-[11px] transition-colors theme-border border" href="Crm-Group/admin-withdraw-audit-detail.html?account=9900456" target="_blank">
<i class="fas fa-laptop-code text-gray-400"></i> 出金审核
                                        </a>
</div>
<div class="flex flex-wrap gap-1.5 items-center">
<a class="px-2.5 py-1 text-[11px] font-medium text-blue-700 bg-blue-50 hover:bg-blue-100 rounded transition-colors flex items-center gap-1 border border-blue-200" href="#/other/prd-cent-account-page-register" target="_blank">
                                            注册页 PRD
                                        </a>
<a class="px-2.5 py-1 text-[11px] font-medium text-blue-700 bg-blue-50 hover:bg-blue-100 rounded transition-colors flex items-center gap-1 border border-blue-200" href="#/other/prd-cent-account-page-deposit" target="_blank">
                                            入金 PRD
                                        </a>
<a class="px-2.5 py-1 text-[11px] font-medium text-blue-700 bg-blue-50 hover:bg-blue-100 rounded transition-colors flex items-center gap-1 border border-blue-200" href="#/other/prd-cent-account-page-withdraw-apply" target="_blank">
                                            出金申请 PRD
                                        </a>
<span class="px-2 py-0.5 text-[10px] rounded-full bg-gray-100 text-gray-500 border border-gray-200">共 20 个任务</span>
</div>
</div>
</td>
</tr>
<tr class="table-row-hover bg-white">
<td class="px-5 py-4 font-medium text-gray-900 whitespace-nowrap">局部架构调整</td>
<td class="px-5 py-4 font-bold text-gray-800 whitespace-nowrap">统计报表时区添加</td>
<td class="px-5 py-4 text-gray-500">CRM 统计报表统一增加 MT 时间筛选（以 MT 时间口径为准），用于对齐佣金/奖励类报表的时间统计口径，禁止 +6h 硬编码。</td>
<td class="px-5 py-4">
<div class="flex flex-col gap-1">
<span class="inline-block px-2 py-0.5 text-[11px] rounded tag-group w-max">Group(含HK)</span>
</div>
</td>
<td class="px-5 py-4 text-center font-medium text-gray-800 relative group whitespace-nowrap">2026-07-29</td>
<td class="px-5 py-4 text-gray-500 whitespace-nowrap">2026-08-30 18:00</td>
<td class="px-5 py-4 text-gray-400">无 PRD / 无原型</td>
</tr>
<tr class="table-row-hover bg-white">
<td class="px-5 py-4 font-medium text-gray-900 whitespace-nowrap">客户管理</td>
<td class="px-5 py-4 font-bold text-gray-800 whitespace-nowrap">开通MT账号</td>
<td class="px-5 py-4 text-gray-500">CRM 后台客服人员可以通过后台帮助客户开通新的 MT 账号。</td>
<td class="px-5 py-4">
<div class="flex flex-col gap-1">
<span class="inline-block px-2 py-0.5 text-[11px] rounded tag-group w-max">Group(含HK)</span>
</div>
</td>
<td class="px-5 py-4 text-center font-medium text-gray-800 relative group whitespace-nowrap">2026-07-29</td>
<td class="px-5 py-4 text-gray-500 whitespace-nowrap">2026-08-30 18:00</td>
<td class="px-5 py-4 text-gray-400">无 PRD / 无原型</td>
</tr>
<tr class="table-row-hover bg-white">
<td class="px-5 py-4 font-medium text-gray-900 whitespace-nowrap">基础逻辑</td>
<td class="px-5 py-4 font-bold text-gray-800 whitespace-nowrap">添加银行卡BUG</td>
<td class="px-5 py-4 text-gray-500">用户在添加钱包时，钱包二维码图片为必填项需要校验，避免未上传二维码时仍可提交。</td>
<td class="px-5 py-4">
<div class="flex flex-col gap-1">
<span class="inline-block px-2 py-0.5 text-[11px] rounded tag-group w-max">Group(含HK)</span>
</div>
</td>
<td class="px-5 py-4 text-center font-medium text-gray-800 relative group whitespace-nowrap">2026-07-28</td>
<td class="px-5 py-4 text-gray-500 whitespace-nowrap">2026-08-30 18:00</td>
<td class="px-5 py-4 text-gray-400">无 PRD / 无原型</td>
</tr>
<tr class="table-row-hover bg-white">
<td class="px-5 py-4 font-medium text-gray-900 whitespace-nowrap">官网</td>
<td class="px-5 py-4 font-bold text-gray-800 whitespace-nowrap">在线客服调整</td>
<td class="px-5 py-4 text-gray-500">海外版官网取消腾讯在线客服入口，港版官网增加 Zendesk 在线客服入口，按站点分别落地对应客服方案。</td>
<td class="px-5 py-4">
<div class="flex flex-col gap-1">
<span class="inline-block px-2 py-0.5 text-[11px] rounded tag-group w-max">Group(含HK)</span>
</div>
</td>
<td class="px-5 py-4 text-center font-medium text-gray-800 relative group whitespace-nowrap">2026-07-28</td>
<td class="px-5 py-4 text-gray-500 whitespace-nowrap">2026-08-30 18:00</td>
<td class="px-5 py-4 text-gray-400">无 PRD / 无原型</td>
</tr>
<tr class="table-row-hover bg-white">
<td class="px-5 py-4 font-medium text-gray-900 whitespace-nowrap">风控管理</td>
<td class="px-5 py-4 font-bold text-gray-800 whitespace-nowrap">登录环境异常预警</td>
<td class="px-5 py-4 text-gray-500">比对客户 CRM 与 MT5 的登录 IP、地区、ASN 与历史画像，识别异常登录环境并提醒风控人工核查，当前阶段仅做预警，不对客户执行自动限制。</td>
<td class="px-5 py-4">
<div class="flex flex-col gap-1">
<span class="inline-block px-2 py-0.5 text-[11px] rounded tag-group w-max">Group(含HK)</span>
</div>
</td>
<td class="px-5 py-4 text-center font-medium text-gray-800 relative group whitespace-nowrap">2026-07-21</td>
<td class="px-5 py-4 text-gray-500 whitespace-nowrap">2026-08-30 18:00</td>
<td class="px-5 py-4">
<div class="flex flex-col gap-2">
<div class="flex flex-wrap gap-2 items-center">
<a class="inline-flex items-center gap-1 bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1.5 rounded text-xs transition-colors border border-gray-200" href="#/other/prd-risk-login-alert" target="_blank">
                                            PRD
                                        </a>
<a class="inline-flex items-center gap-1 bg-teal-50 hover:bg-teal-100 theme-text px-3 py-1.5 rounded text-xs transition-colors theme-border border" href="#/other/risk-login-alert" target="_blank">
<i class="fas fa-laptop-code"></i> 预警列表原型
                                        </a>
<a class="inline-flex items-center gap-1 bg-teal-50 hover:bg-teal-100 theme-text px-3 py-1.5 rounded text-xs transition-colors theme-border border text-blue-500 hover:text-blue-700" href="#/crm/client-detail" target="_blank">
<i class="fas fa-laptop-code"></i> 客户详情原型
                                        </a>
</div>
</div>
</td>
</tr>
<tr class="table-row-hover bg-white">
<td class="px-5 py-4 font-medium text-gray-900 whitespace-nowrap">基础逻辑</td>
<td class="px-5 py-4 font-bold text-gray-800 whitespace-nowrap">审批提醒</td>
<td class="px-5 py-4 text-gray-500">统一 CRM 审批模块左侧菜单提醒逻辑，按当前管理员权限与当前审核节点精确统计待处理数量，当前覆盖出金审核、银行卡审核、账户审核。</td>
<td class="px-5 py-4">
<div class="flex flex-col gap-1">
<span class="inline-block px-2 py-0.5 text-[11px] rounded tag-group w-max">Group(含HK)</span>
</div>
</td>
<td class="px-5 py-4 text-center font-medium text-gray-800 relative group whitespace-nowrap">2026-07-21</td>
<td class="px-5 py-4 text-gray-500 whitespace-nowrap">2026-08-30 18:00</td>
<td class="px-5 py-4">
<div class="flex flex-col gap-2">
<div class="flex flex-wrap gap-2 items-center">
<a class="inline-flex items-center gap-1 bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1.5 rounded text-xs transition-colors border border-gray-200" href="#/other/prd-approval-reminder" target="_blank">
                                            PRD
                                        </a>
<a class="inline-flex items-center gap-1 bg-teal-50 hover:bg-teal-100 theme-text px-3 py-1.5 rounded text-xs transition-colors theme-border border" href="#/crm/audit-list" target="_blank">
<i class="fas fa-laptop-code"></i> 原型
                                        </a>
</div>
</div>
</td>
</tr>
<tr class="table-row-hover bg-white">
<td class="px-5 py-4 font-medium text-gray-900 whitespace-nowrap">系统维护</td>
<td class="px-5 py-4 font-bold text-gray-800 whitespace-nowrap">首页 (数据概览)</td>
<td class="px-5 py-4 text-gray-500">所有核心数据概览的统计方式变更为：包含自己及伞下所有层级客户数据汇总。</td>
<td class="px-5 py-4">
<div class="flex flex-col gap-1">
<span class="inline-block px-2 py-0.5 text-[11px] rounded tag-group w-max">Group(含HK)</span>
</div>
</td>
<td class="px-5 py-4 text-center font-medium text-gray-800 relative group whitespace-nowrap">2026-07-21</td>
<td class="px-5 py-4 text-gray-500 whitespace-nowrap">2026-08-30 18:00</td>
<td class="px-5 py-4">
<div class="flex flex-col gap-2">
<div class="flex flex-wrap gap-2 items-center">
<a class="inline-flex items-center gap-1 bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1.5 rounded text-xs transition-colors border border-gray-200" href="#/other/prd-home" target="_blank">
                                            PRD
                                        </a>
<a class="inline-flex items-center gap-1 bg-teal-50 hover:bg-teal-100 theme-text px-3 py-1.5 rounded text-xs transition-colors theme-border border" href="#/home" target="_blank">
<i class="fas fa-laptop-code"></i> 原型
                                        </a>
</div>
</div>
</td>
</tr>
<tr class="table-row-hover bg-white">
<td class="px-5 py-4 font-medium text-gray-900 whitespace-nowrap">系统维护</td>
<td class="px-5 py-4 font-bold text-gray-800 whitespace-nowrap">后台账号解锁</td>
<td class="px-5 py-4 text-gray-500">用户密码错误次数过多时，可在后台直接解锁。</td>
<td class="px-5 py-4">
<div class="flex flex-col gap-1">
<span class="inline-block px-2 py-0.5 text-[11px] rounded tag-group w-max">Group(含HK)</span>
</div>
</td>
<td class="px-5 py-4 text-center font-medium text-gray-800 relative group whitespace-nowrap">2026-07-21</td>
<td class="px-5 py-4 text-gray-500 whitespace-nowrap">2026-08-30 18:00</td>
<td class="px-5 py-4">
<span class="text-gray-400 text-xs italic">
<i class="fas fa-info-circle mr-1"></i>无原型、PRD，按设计图开发
                                </span>
</td>
</tr>
<tr class="table-row-hover bg-white">
<td class="px-5 py-4 font-medium text-gray-900 whitespace-nowrap">系统维护</td>
<td class="px-5 py-4 font-bold text-gray-800 whitespace-nowrap">港版注册</td>
<td class="px-5 py-4 text-gray-500">基于既有 CRM-HK 开户/注册流程新增邀请链接分流逻辑：按链接类型决定投资者类型是否展示、是否可改、是否进入专业投资者问卷，并自动归入对应分组。</td>
<td class="px-5 py-4">
<div class="flex flex-col gap-1">
<span class="inline-block px-2 py-0.5 text-[11px] rounded tag-hk w-max">CRM-HK</span>
</div>
</td>
<td class="px-5 py-4 text-center font-medium text-gray-800 relative group whitespace-nowrap">2026-07-21</td>
<td class="px-5 py-4 text-gray-500 whitespace-nowrap">2026-08-30 18:00</td>
<td class="px-5 py-4">
<div class="flex flex-col gap-2">
<div class="flex flex-wrap gap-2 items-center">
<a class="inline-flex items-center gap-1 bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1.5 rounded text-xs transition-colors border border-gray-200" href="#/other/prd-register" target="_blank">
                                            PRD
                                        </a>
</div>
</div>
</td>
</tr>
<tr class="table-row-hover bg-white">
<td class="px-5 py-4 font-medium text-gray-900 whitespace-nowrap">系统维护</td>
<td class="px-5 py-4 font-bold text-gray-800 whitespace-nowrap">海外版身份校验</td>
<td class="px-5 py-4 text-gray-500">仅海外版实名认证时校验是否为香港身份证；若命中有效 HKID，则提示“暂时不支持香港身份证开户注册。”并禁止提交。</td>
<td class="px-5 py-4">
<div class="flex flex-col gap-1">
<span class="inline-block px-2 py-0.5 text-[11px] rounded tag-group-only w-max">Crm-Group</span>
</div>
</td>
<td class="px-5 py-4 text-center font-medium text-gray-800 relative group whitespace-nowrap">2026-07-21</td>
<td class="px-5 py-4 text-gray-500 whitespace-nowrap">2026-08-30 18:00</td>
<td class="px-5 py-4">
<div class="flex flex-col gap-2">
<div class="flex flex-wrap gap-2 items-center">
<a class="inline-flex items-center gap-1 bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1.5 rounded text-xs transition-colors border border-gray-200" href="#/other/prd-overseas-id-check" target="_blank">
                                            PRD
                                        </a>
<a class="inline-flex items-center gap-1 bg-teal-50 hover:bg-teal-100 theme-text px-3 py-1.5 rounded text-xs transition-colors theme-border border" href="#/other/profile-fill" target="_blank">
<i class="fas fa-laptop-code"></i> 资料填写原型
                                        </a>
</div>
</div>
</td>
</tr>
<tr class="table-row-hover bg-white">
<td class="px-5 py-4 font-medium text-gray-900 whitespace-nowrap">客户管理</td>
<td class="px-5 py-4 font-bold text-gray-800 whitespace-nowrap">客户留资二期</td>
<td class="px-5 py-4 text-gray-500">引入线索公海池回收机制、热度打分、留资详情增强、客户画像打通与系统标签管理，完成售前留资到客户资产视角的闭环升级。</td>
<td class="px-5 py-4">
<div class="flex flex-col gap-1">
<span class="inline-block px-2 py-0.5 text-[11px] rounded tag-group w-max">Group(含HK)</span>
</div>
</td>
<td class="px-5 py-4 text-center font-medium text-gray-800 relative group whitespace-nowrap">2026-07-14</td>
<td class="px-5 py-4 text-gray-500 whitespace-nowrap">2026-08-30 18:00</td>
<td class="px-5 py-4">
<div class="flex flex-col gap-2">
<div class="flex flex-wrap gap-2 items-center">
<a class="inline-flex items-center gap-1 bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1.5 rounded text-xs transition-colors border border-gray-200" href="#/other/prd-leads-list" target="_blank">
                                            留资列表PRD
                                        </a>
<a class="inline-flex items-center gap-1 text-gray-700 px-3 py-1.5 rounded text-xs transition-colors border border-gray-200 text-white bg-blue-500 hover:bg-blue-600 border-blue-500" href="#/other/prd-leads-detail" target="_blank">
                                            留资详情PRD
                                        </a>
<a class="inline-flex items-center gap-1 text-gray-700 px-3 py-1.5 rounded text-xs transition-colors border border-gray-200 text-white bg-blue-500 hover:bg-blue-600 border-blue-500" href="#/other/prd-client-detail" target="_blank">
                                            客户详情PRD
                                        </a>
<a class="inline-flex items-center gap-1 bg-teal-50 hover:bg-teal-100 theme-text px-3 py-1.5 rounded text-xs transition-colors theme-border border" href="#/crm/leads-list" target="_blank">
<i class="fas fa-laptop-code"></i> 列表原型
                                        </a>
<a class="inline-flex items-center gap-1 bg-teal-50 hover:bg-teal-100 theme-text px-3 py-1.5 rounded text-xs transition-colors theme-border border text-blue-500 hover:text-blue-700" href="#/crm/leads-detail" target="_blank">
<i class="fas fa-laptop-code"></i> 详情原型
                                        </a>
<a class="inline-flex items-center gap-1 bg-teal-50 hover:bg-teal-100 theme-text px-3 py-1.5 rounded text-xs transition-colors theme-border border text-blue-500 hover:text-blue-700" href="#/crm/client-detail" target="_blank">
<i class="fas fa-laptop-code"></i> 客户详情原型
                                        </a>
<a class="inline-flex items-center gap-1 bg-teal-50 hover:bg-teal-100 theme-text px-3 py-1.5 rounded text-xs transition-colors theme-border border" href="#/other/tag-management" target="_blank">
<i class="fas fa-laptop-code"></i> 标签原型
                                        </a>
</div>
</div>
</td>
</tr>
<tr class="table-row-hover bg-white">
<td class="px-5 py-4 font-medium text-gray-900 whitespace-nowrap">局部架构调整</td>
<td class="px-5 py-4 font-bold text-gray-800 whitespace-nowrap">时区处理规范</td>
<td class="px-5 py-4 text-gray-500">统一 MT5 时区，禁止 +6h 硬编码，底层 UTC 转换标准（仅限两张销售奖励报表）。</td>
<td class="px-5 py-4">
<div class="flex flex-col gap-1">
<span class="inline-block px-2 py-0.5 text-[11px] rounded tag-group w-max">Group(含HK)</span>
</div>
</td>
<td class="px-5 py-4 text-center font-medium text-gray-800 relative group whitespace-nowrap">2026-07-09</td>
<td class="px-5 py-4 text-gray-500 whitespace-nowrap">2026-08-30 18:00</td>
<td class="px-5 py-4">
<div class="flex flex-col gap-2">
<div class="flex flex-wrap gap-2 items-center">
<a class="inline-flex items-center gap-1 bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1.5 rounded text-xs transition-colors border border-gray-200" href="#/other/prd-timezone-standard" target="_blank">
                                            PRD
                                        </a>
</div>
</div>
</td>
</tr>
<tr class="table-row-hover bg-white">
<td class="px-5 py-4 font-medium text-gray-900 whitespace-nowrap">局部架构调整</td>
<td class="px-5 py-4 font-bold text-gray-800 whitespace-nowrap">多周期提成底层规范</td>
<td class="px-5 py-4 text-gray-500">User ID 维度抵消防刷单，“搭积木”式日切片快照流转架构（仅限两张销售奖励报表）。</td>
<td class="px-5 py-4">
<div class="flex flex-col gap-1">
<span class="inline-block px-2 py-0.5 text-[11px] rounded tag-group w-max">Group(含HK)</span>
</div>
</td>
<td class="px-5 py-4 text-center font-medium text-gray-800 relative group whitespace-nowrap">2026-07-09</td>
<td class="px-5 py-4 text-gray-500 whitespace-nowrap">2026-08-30 18:00</td>
<td class="px-5 py-4">
<div class="flex flex-col gap-2">
<div class="flex flex-wrap gap-2 items-center">
<a class="inline-flex items-center gap-1 bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1.5 rounded text-xs transition-colors border border-gray-200" href="#/other/prd-commission-calculation" target="_blank">
                                            PRD
                                        </a>
</div>
</div>
</td>
</tr>
<tr class="table-row-hover bg-white">
<td class="px-5 py-4 font-medium text-gray-900 whitespace-nowrap">系统维护</td>
<td class="px-5 py-4 font-bold text-gray-800 whitespace-nowrap">邮件样式调整</td>
<td class="px-5 py-4 text-gray-500">按设计稿调整邮件样式。</td>
<td class="px-5 py-4">
<div class="flex flex-col gap-1">
<span class="inline-block px-2 py-0.5 text-[11px] rounded tag-group-only w-max">Group</span>
</div>
</td>
<td class="px-5 py-4 text-center font-medium text-gray-800 relative group whitespace-nowrap">2026-07-09</td>
<td class="px-5 py-4 text-gray-500 whitespace-nowrap">2026-08-30 18:00</td>
<td class="px-5 py-4">
<span class="text-gray-400 text-xs italic">
<i class="fas fa-info-circle mr-1"></i>无原型、PRD，按设计图开发
                                </span>
</td>
</tr>
<!-- 已完成: HK 独立开户审核流 -->
<tr class="table-row-hover bg-white">
<td class="px-5 py-4 font-medium text-gray-900 whitespace-nowrap">客户管理</td>
<td class="px-5 py-4 font-bold text-gray-800 whitespace-nowrap">账户审核详情页</td>
<td class="px-5 py-4 text-gray-500">HK 后台审核详情页，包含身份证与银行卡等附件资料审核。</td>
<td class="px-5 py-4">
<div class="flex flex-col gap-1">
<span class="inline-block px-2 py-0.5 text-[11px] rounded tag-hk w-max">CRM-HK</span>
</div>
</td>
<td class="px-5 py-4 text-center font-medium text-gray-800 relative group whitespace-nowrap">2026-07-01</td>
<td class="px-5 py-4 text-gray-500 whitespace-nowrap">2026-08-30 18:00</td>
<td class="px-5 py-4">
<div class="flex flex-col gap-2">
<div class="flex flex-wrap gap-2 items-center">
<a class="inline-flex items-center gap-1 bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1.5 rounded text-xs transition-colors border border-gray-200" href="#/crm/prd-audit" target="_blank">
                                            PRD
                                        </a>
<a class="inline-flex items-center gap-1 bg-teal-50 hover:bg-teal-100 theme-text px-3 py-1.5 rounded text-xs transition-colors theme-border border" href="#/crm/audit" target="_blank">
<i class="fas fa-laptop-code"></i> 原型
                                        </a>
</div>
</div>
</td>
</tr>
<tr class="table-row-hover bg-white">
<td class="px-5 py-4 font-medium text-gray-900 whitespace-nowrap">客户管理</td>
<td class="px-5 py-4 font-bold text-gray-800 whitespace-nowrap">C端开户申请向导</td>
<td class="px-5 py-4 text-gray-500">多步骤表单，包含个人资料、银行资料、证明文件、投资者问卷。</td>
<td class="px-5 py-4">
<div class="flex flex-col gap-1">
<span class="inline-block px-2 py-0.5 text-[11px] rounded tag-hk w-max">CRM-HK</span>
</div>
</td>
<td class="px-5 py-4 text-center font-medium text-gray-800 relative group whitespace-nowrap">2026-07-01</td>
<td class="px-5 py-4 text-gray-500 whitespace-nowrap">2026-08-30 18:00</td>
<td class="px-5 py-4">
<div class="flex flex-col gap-2">
<div class="flex flex-wrap gap-2 items-center">
<a class="inline-flex items-center gap-1 bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1.5 rounded text-xs transition-colors border border-gray-200" href="#/other/prd-register" target="_blank">
                                            PRD
                                        </a>
<a class="inline-flex items-center gap-1 bg-teal-50 hover:bg-teal-100 theme-text px-3 py-1.5 rounded text-xs transition-colors theme-border border" href="#/other/login" target="_blank">
<i class="fas fa-laptop-code"></i> CRM-HK原型
                                        </a>
</div>
</div>
</td>
</tr>
<!-- 已完成需求: 官网公益页面 -->
<tr class="table-row-hover bg-white">
<td class="px-5 py-4 font-medium text-gray-900 whitespace-nowrap">官网模块</td>
<td class="px-5 py-4 font-bold text-gray-800 whitespace-nowrap">官网公益页面</td>
<td class="px-5 py-4 text-gray-500">展示集团公益活动与社会责任相关内容，提升品牌形象。</td>
<td class="px-5 py-4">
<div class="flex flex-col gap-1">
<span class="inline-block px-2 py-0.5 text-[11px] rounded tag-gw w-max">官网(HK/Group)</span>
</div>
</td>
<td class="px-5 py-4 text-center font-medium text-gray-800 relative group whitespace-nowrap">2026-06-25</td>
<td class="px-5 py-4 text-gray-500 whitespace-nowrap">2026-08-30 18:00</td>
<td class="px-5 py-4">
<span class="text-gray-400 text-xs italic">
<i class="fas fa-info-circle mr-1"></i>无需原型，依UI设计图开发
                                </span>
</td>
</tr>
<!-- 需求 2-2: Group-Gw 留资入口 -->
<tr class="table-row-hover bg-white">
<td class="px-5 py-4 font-medium text-gray-900 whitespace-nowrap">引流模块</td>
<td class="px-5 py-4 font-bold text-gray-800 whitespace-nowrap">官网留资入口 (Group)</td>
<td class="px-5 py-4 text-gray-500">官网顶部增加“联系我们”入口，点击弹出“试用账户申请”表单，收集散客意向。</td>
<td class="px-5 py-4">
<div class="flex flex-col gap-1">
<span class="inline-block px-2 py-0.5 text-[11px] rounded tag-gw w-max">Group-Gw</span>
</div>
</td>
<td class="px-5 py-4 text-center font-medium text-gray-800 relative group whitespace-nowrap">2026-6-24</td>
<td class="px-5 py-4 text-gray-500 whitespace-nowrap">2026-08-30 18:00</td>
<td class="px-5 py-4">
<div class="flex flex-col gap-2">
<div class="flex flex-wrap gap-2 items-center">
<a class="inline-flex items-center gap-1 bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1.5 rounded text-xs transition-colors border border-gray-200" href="#/other/prd-contact" target="_blank">
                                            PRD
                                        </a>
<a class="inline-flex items-center gap-1 bg-teal-50 hover:bg-teal-100 theme-text px-3 py-1.5 rounded text-xs transition-colors theme-border border" href="#/other/index" target="_blank">
<i class="fas fa-laptop-code"></i> Group-Gw原型
                                        </a>
</div>
</div>
</td>
</tr>
<!-- 需求 3 -->
<tr class="table-row-hover bg-white">
<td class="px-5 py-4 font-medium text-gray-900 whitespace-nowrap">客户管理</td>
<td class="px-5 py-4 font-bold text-gray-800 whitespace-nowrap">留资列表</td>
<td class="px-5 py-4 text-gray-500">承接官网/登陆页面无邀请码散客留下的联系资料，供市场人员查看和跟进。</td>
<td class="px-5 py-4">
<div class="flex flex-col gap-1">
<span class="inline-block px-2 py-0.5 text-[11px] rounded tag-group w-max">Group(含HK)</span>
<span class="inline-block px-2 py-0.5 text-[11px] rounded tag-gw w-max">官网(HK/Group)</span>
</div>
</td>
<td class="px-5 py-4 text-center font-medium text-gray-800 relative group whitespace-nowrap">2026-6-24</td>
<td class="px-5 py-4 text-gray-500 whitespace-nowrap">2026-08-30 18:00</td>
<td class="px-5 py-4">
<div class="flex flex-col gap-2">
<div class="flex flex-wrap gap-2 items-center">
<a class="inline-flex items-center gap-1 bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1.5 rounded text-xs transition-colors border border-gray-200" href="#/other/prd-leads-list" target="_blank">
                                            PRD
                                        </a>
<a class="inline-flex items-center gap-1 bg-teal-50 hover:bg-teal-100 theme-text px-3 py-1.5 rounded text-xs transition-colors theme-border border" href="#/crm/leads-list" target="_blank">
<i class="fas fa-laptop-code"></i> 原型
                                        </a>
</div>
</div>
</td>
</tr>
<!-- 需求 2-1: Hk-Gw 留资入口 -->
<tr class="table-row-hover bg-white">
<td class="px-5 py-4 font-medium text-gray-900 whitespace-nowrap">引流模块</td>
<td class="px-5 py-4 font-bold text-gray-800 whitespace-nowrap">官网留资入口 (HK)</td>
<td class="px-5 py-4 text-gray-500">官网顶部增加“联系我们”入口，点击弹出“试用账户申请”表单，收集散客意向。</td>
<td class="px-5 py-4">
<div class="flex flex-col gap-1">
<span class="inline-block px-2 py-0.5 text-[11px] rounded tag-gw w-max">Hk-Gw</span>
</div>
</td>
<td class="px-5 py-4 text-center font-medium text-gray-800 relative group whitespace-nowrap">2026-6-24</td>
<td class="px-5 py-4 text-gray-500 whitespace-nowrap">2026-08-30 18:00</td>
<td class="px-5 py-4">
<div class="flex flex-col gap-2">
<div class="flex flex-wrap gap-2 items-center">
<a class="inline-flex items-center gap-1 bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1.5 rounded text-xs transition-colors border border-gray-200" href="#/other/prd-contact" target="_blank">
                                            PRD
                                        </a>
<a class="inline-flex items-center gap-1 bg-teal-50 hover:bg-teal-100 theme-text px-3 py-1.5 rounded text-xs transition-colors theme-border border" href="#/other/index" target="_blank">
<i class="fas fa-laptop-code"></i> Hk-Gw原型
                                        </a>
</div>
</div>
</td>
</tr>
<!-- 需求 1: Crm-Group 注册页 -->
<tr class="table-row-hover bg-white">
<td class="px-5 py-4 font-medium text-gray-900 whitespace-nowrap">登录模块</td>
<td class="px-5 py-4 font-bold text-gray-800 whitespace-nowrap">注册页 (Group)</td>
<td class="px-5 py-4 text-gray-500">提供新用户的注册入口，包含邮箱、密码、推荐码、图形验证码及注册条款确认。无邀请码增加弹窗留资入口。</td>
<td class="px-5 py-4">
<div class="flex flex-col gap-1">
<span class="inline-block px-2 py-0.5 text-[11px] rounded tag-group-only w-max">Crm-Group</span>
</div>
</td>
<td class="px-5 py-4 text-center font-medium text-gray-800 relative group whitespace-nowrap">2026-6-24</td>
<td class="px-5 py-4 text-gray-500 whitespace-nowrap">2026-08-30 18:00</td>
<td class="px-5 py-4">
<div class="flex flex-col gap-2">
<div class="flex flex-wrap gap-2 items-center">
<a class="inline-flex items-center gap-1 bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1.5 rounded text-xs transition-colors border border-gray-200" href="#/other/prd-register" target="_blank">
                                            PRD
                                        </a>
<a class="inline-flex items-center gap-1 bg-teal-50 hover:bg-teal-100 theme-text px-3 py-1.5 rounded text-xs transition-colors theme-border border" href="#/other/register" target="_blank">
<i class="fas fa-laptop-code"></i> Crm-Group原型
                                        </a>
</div>
</div>
</td>
</tr>
<!-- 新增移入需求: 平仓交易记录 -->
<tr class="table-row-hover bg-white">
<td class="px-5 py-4 font-medium text-gray-900 whitespace-nowrap">报表中心</td>
<td class="px-5 py-4 font-bold text-gray-800 whitespace-nowrap">平仓交易记录</td>
<td class="px-5 py-4 text-gray-500">提供所有已平仓订单的明细查询及多维度的汇总统计（盈亏、手续费等）。</td>
<td class="px-5 py-4">
<div class="flex flex-col gap-1">
<span class="inline-block px-2 py-0.5 text-[11px] rounded tag-group w-max">Group(含HK)</span>
</div>
</td>
<td class="px-5 py-4 text-center font-medium text-gray-800 relative group whitespace-nowrap">2026-6-22</td>
<td class="px-5 py-4 text-gray-500 whitespace-nowrap">2026-08-30 18:00</td>
<td class="px-5 py-4">
<div class="flex flex-col gap-2">
<div class="flex flex-wrap gap-2 items-center">
<a class="inline-flex items-center gap-1 bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1.5 rounded text-xs transition-colors border border-gray-200" href="#/other/prd-report-close-position" target="_blank">
                                            PRD
                                        </a>
<a class="inline-flex items-center gap-1 bg-teal-50 hover:bg-teal-100 theme-text px-3 py-1.5 rounded text-xs transition-colors border theme-border" href="#/report/close-position" target="_blank">
<i class="fas fa-laptop-code"></i> 原型
                                        </a>
</div>
</div>
</td>
</tr>
<tr class="table-row-hover bg-white">
<td class="px-5 py-4 font-medium text-gray-900 whitespace-nowrap">报表中心</td>
<td class="px-5 py-4 font-bold text-gray-800 whitespace-nowrap">销售入金奖励报表二期</td>
<td class="px-5 py-4 text-gray-500">基于最新业务规则更新入金奖励计算逻辑等（延用一期PRD及原型）。</td>
<td class="px-5 py-4">
<div class="flex flex-col gap-1">
<span class="inline-block px-2 py-0.5 text-[11px] rounded tag-group w-max">Group(含HK)</span>
</div>
</td>
<td class="px-5 py-4 text-center font-medium text-gray-800 relative group whitespace-nowrap">2026-06-18</td>
<td class="px-5 py-4 text-gray-500 whitespace-nowrap">2026-08-30 18:00</td>
<td class="px-5 py-4">
<div class="flex flex-col gap-2">
<div class="flex flex-wrap gap-2 items-center">
<a class="px-3 py-1.5 text-xs font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 rounded transition-colors flex items-center gap-1 border border-gray-200" href="#/other/prd-report-sales-deposit" target="_blank">
                                            PRD
                                        </a>
<a class="px-3 py-1.5 text-xs font-medium text-brandGreen bg-green-50 hover:bg-green-100 rounded transition-colors flex items-center gap-1 border border-green-200" href="#/report/sales-deposit" target="_blank">
<i class="fas fa-desktop"></i> 原型
                                        </a>
</div>
</div>
</td>
</tr>
<!-- 新增：新增销售 (二期) -->
<tr class="table-row-hover bg-white">
<td class="px-5 py-4 font-medium text-gray-900 whitespace-nowrap">销售模块</td>
<td class="px-5 py-4 font-bold text-gray-800 whitespace-nowrap">新增销售 (二期)</td>
<td class="px-5 py-4 text-gray-500">优化销售奖励规则：处理交易手数清空逻辑、历史数据结转期限、跨周期统计防刷单漏洞及按天计算时区界定等边界问题。</td>
<td class="px-5 py-4">
<div class="flex flex-col gap-1">
<span class="inline-block px-2 py-0.5 text-[11px] rounded tag-group w-max">Group(含HK)</span>
</div>
</td>
<td class="px-5 py-4 text-center font-medium text-gray-800 relative group whitespace-nowrap">待定</td>
<td class="px-5 py-4">
<div class="flex items-center gap-2">
<a class="px-3 py-1.5 text-xs font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 rounded transition-colors flex items-center gap-1 border border-gray-200" href="#/other/prd-sales-add" target="_blank">
                                        PRD
                                    </a>
<a class="px-3 py-1.5 text-xs font-medium text-brandGreen bg-green-50 hover:bg-green-100 rounded transition-colors flex items-center gap-1 border border-green-200" href="#/crm/sales-add" target="_blank">
<i class="fas fa-desktop"></i> 原型
                                    </a>
</div>
</td>
</tr>
<!-- 新增：logo跳转 -->
<tr class="table-row-hover bg-white">
<td class="px-5 py-4 font-medium text-gray-900 whitespace-nowrap">全局优化</td>
<td class="px-5 py-4 font-bold text-gray-800 whitespace-nowrap">logo跳转</td>
<td class="px-5 py-4 text-gray-500">登陆、注册、忘记密码等页面，点击logo后打开官网</td>
<td class="px-5 py-4">
<div class="flex flex-col gap-1">
<span class="inline-block px-2 py-0.5 text-[11px] rounded tag-group w-max">Group(含HK)</span>
</div>
</td>
<td class="px-5 py-4 text-center font-medium text-gray-800 relative group whitespace-nowrap">2026-06-17</td>
<td class="px-5 py-4 text-gray-500 whitespace-nowrap">2026-08-30 18:00</td>
<td class="px-5 py-4">
<span class="text-gray-400 text-xs italic"><i class="fas fa-info-circle mr-1"></i>无相关原型或PRD文档</span>
</td>
</tr>
<!-- 历史合入 1.1.0: 新增银行卡 -->
<tr class="table-row-hover bg-white">
<td class="px-5 py-4 font-medium text-gray-900 whitespace-nowrap">财务模块</td>
<td class="px-5 py-4 font-bold text-gray-800 whitespace-nowrap">新增银行卡</td>
<td class="px-5 py-4 text-gray-500">支持添加USDT、支付宝及银行卡类型，动态表单切换，包含相关文案提示。</td>
<td class="px-5 py-4">
<div class="flex flex-col gap-1">
<span class="inline-block px-2 py-0.5 text-[11px] rounded tag-group w-max">Group(含HK)</span>
</div>
</td>
<td class="px-5 py-4 text-center font-medium text-gray-800 relative group whitespace-nowrap">2026-06-17</td>
<td class="px-5 py-4 text-gray-500 whitespace-nowrap">2026-08-30 18:00</td>
<td class="px-5 py-4">
<div class="flex flex-col gap-2">
<div class="flex flex-wrap gap-2 items-center">
<a class="inline-flex items-center gap-1 bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1.5 rounded text-xs transition-colors border border-gray-200" href="#/other/prd-bankcard-add" target="_blank">
                                            PRD
                                        </a>
<a class="inline-flex items-center gap-1 bg-teal-50 hover:bg-teal-100 theme-text px-3 py-1.5 rounded text-xs transition-colors theme-border border" href="#/other/bankcard-add" target="_blank">
<i class="fas fa-laptop-code"></i> 原型
                                        </a>
</div>
</div>
</td>
</tr>
<!-- 历史合入 1.1.0: 销售管理 -->
<tr class="table-row-hover bg-white">
<td class="px-5 py-4 font-medium text-gray-900 whitespace-nowrap">代理与销售模块</td>
<td class="px-5 py-4 font-bold text-gray-800 whitespace-nowrap">销售管理</td>
<td class="px-5 py-4 text-gray-500">提供完整的销售人员名录列表展示、状态筛选及查询功能。</td>
<td class="px-5 py-4">
<div class="flex flex-col gap-1">
<span class="inline-block px-2 py-0.5 text-[11px] rounded tag-group w-max">Group(含HK)</span>
</div>
</td>
<td class="px-5 py-4 text-center font-medium text-gray-800 relative group whitespace-nowrap">2026-06-17</td>
<td class="px-5 py-4 text-gray-500 whitespace-nowrap">2026-08-30 18:00</td>
<td class="px-5 py-4">
<div class="flex flex-col gap-2">
<div class="flex flex-wrap gap-2 items-center">
<a class="inline-flex items-center gap-1 bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1.5 rounded text-xs transition-colors border border-gray-200" href="#/other/prd-sales-list" target="_blank">
                                            PRD
                                        </a>
<a class="inline-flex items-center gap-1 bg-teal-50 hover:bg-teal-100 theme-text px-3 py-1.5 rounded text-xs transition-colors theme-border border" href="#/crm/sales-list" target="_blank">
<i class="fas fa-laptop-code"></i> 原型
                                        </a>
</div>
</div>
</td>
</tr>
<!-- 历史合入 1.1.0: 新增销售 -->
<tr class="table-row-hover bg-white">
<td class="px-5 py-4 font-medium text-gray-900 whitespace-nowrap">代理与销售模块</td>
<td class="px-5 py-4 font-bold text-gray-800 whitespace-nowrap">新增销售</td>
<td class="px-5 py-4 text-gray-500">支持新增销售人员，配置其基本信息、返佣资格及各项奖励周期。</td>
<td class="px-5 py-4">
<div class="flex flex-col gap-1">
<span class="inline-block px-2 py-0.5 text-[11px] rounded tag-group w-max">Group(含HK)</span>
</div>
</td>
<td class="px-5 py-4 text-center font-medium text-gray-800 relative group whitespace-nowrap">2026-06-17</td>
<td class="px-5 py-4 text-gray-500 whitespace-nowrap">2026-08-30 18:00</td>
<td class="px-5 py-4">
<div class="flex flex-col gap-2">
<div class="flex flex-wrap gap-2 items-center">
<a class="inline-flex items-center gap-1 bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1.5 rounded text-xs transition-colors border border-gray-200" href="#/other/prd-sales-add" target="_blank">
                                            PRD
                                        </a>
<a class="inline-flex items-center gap-1 bg-teal-50 hover:bg-teal-100 theme-text px-3 py-1.5 rounded text-xs transition-colors theme-border border" href="#/crm/sales-add" target="_blank">
<i class="fas fa-laptop-code"></i> 原型
                                        </a>
</div>
</div>
</td>
</tr>
<!-- 历史合入 1.1.0: 销售交易奖励报表 -->
<tr class="table-row-hover bg-white">
<td class="px-5 py-4 font-medium text-gray-900 whitespace-nowrap">报表中心</td>
<td class="px-5 py-4 font-bold text-gray-800 whitespace-nowrap">销售交易奖励报表</td>
<td class="px-5 py-4 text-gray-500">根据销售名下挂载客户的交易量计算并展示奖励明细。</td>
<td class="px-5 py-4">
<div class="flex flex-col gap-1">
<span class="inline-block px-2 py-0.5 text-[11px] rounded tag-group w-max">Group(含HK)</span>
</div>
</td>
<td class="px-5 py-4 text-center font-medium text-gray-800 relative group whitespace-nowrap">2026-06-17</td>
<td class="px-5 py-4 text-gray-500 whitespace-nowrap">2026-08-30 18:00</td>
<td class="px-5 py-4">
<div class="flex flex-col gap-2">
<div class="flex flex-wrap gap-2 items-center">
<a class="inline-flex items-center gap-1 bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1.5 rounded text-xs transition-colors border border-gray-200" href="#/other/prd-report-sales-trading" target="_blank">
                                            PRD
                                        </a>
<a class="inline-flex items-center gap-1 bg-teal-50 hover:bg-teal-100 theme-text px-3 py-1.5 rounded text-xs transition-colors theme-border border" href="#/report/sales-trading" target="_blank">
<i class="fas fa-laptop-code"></i> 原型
                                        </a>
</div>
</div>
</td>
</tr>
<!-- 历史合入 1.1.0: 销售入金奖励报表 -->
<tr class="table-row-hover bg-white">
<td class="px-5 py-4 font-medium text-gray-900 whitespace-nowrap">报表中心</td>
<td class="px-5 py-4 font-bold text-gray-800 whitespace-nowrap">销售入金奖励报表</td>
<td class="px-5 py-4 text-gray-500">根据销售名下挂载客户的净入金金额计算并展示奖励明细。</td>
<td class="px-5 py-4">
<div class="flex flex-col gap-1">
<span class="inline-block px-2 py-0.5 text-[11px] rounded tag-group w-max">Group(含HK)</span>
</div>
</td>
<td class="px-5 py-4 text-center font-medium text-gray-800 relative group whitespace-nowrap">2026-06-17</td>
<td class="px-5 py-4 text-gray-500 whitespace-nowrap">2026-08-30 18:00</td>
<td class="px-5 py-4">
<div class="flex flex-col gap-2">
<div class="flex flex-wrap gap-2 items-center">
<a class="inline-flex items-center gap-1 bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1.5 rounded text-xs transition-colors border border-gray-200" href="#/other/prd-report-sales-deposit" target="_blank">
                                            PRD
                                        </a>
<a class="inline-flex items-center gap-1 bg-teal-50 hover:bg-teal-100 theme-text px-3 py-1.5 rounded text-xs transition-colors theme-border border" href="#/report/sales-deposit" target="_blank">
<i class="fas fa-laptop-code"></i> 原型
                                        </a>
</div>
</div>
</td>
</tr>
<!-- 已完成: 官网数据源 -->
<tr class="table-row-hover bg-white">
<td class="px-5 py-4 font-medium text-gray-900 whitespace-nowrap">官网模块</td>
<td class="px-5 py-4 font-bold text-gray-800 whitespace-nowrap">官网数据源</td>
<td class="px-5 py-4 text-gray-500">为官网行情报价模块补齐数据源接入方案、前后端接口规范、缓存降级策略，以及前端联调与测试验收口径。</td>
<td class="px-5 py-4">
<div class="flex flex-col gap-1">
<span class="inline-block px-2 py-0.5 text-[11px] rounded tag-gw w-max">Group 官网</span>
<span class="inline-block px-2 py-0.5 text-[11px] rounded tag-gw w-max">HK 官网</span>
</div>
</td>
<td class="px-5 py-4 text-center font-medium text-gray-800 relative group whitespace-nowrap">2026-08-18</td>
<td class="px-5 py-4 text-gray-500 whitespace-nowrap">2026-08-30 18:00</td>
<td class="px-5 py-4">
<div class="flex flex-wrap gap-2 items-center">
<a class="px-3 py-1.5 text-xs font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 rounded transition-colors flex items-center gap-1 border border-gray-200" href="#/other/prd-market-quotes-backend" target="_blank">
                                        交付文档
                                    </a>
</div>
</td>
</tr>
</tbody>
</table>
</div>
<div class="px-4 py-3 border-t border-gray-200 flex items-center justify-between bg-gray-50 rounded-b-xl">
<div class="text-xs text-gray-500" id="pagination-info">
                    显示第 1 至 10 项结果，共 0 项
                </div>
<div class="flex items-center gap-2">
<select class="border border-gray-300 rounded px-2 py-1 text-xs outline-none focus:border-teal-500 bg-white" id="items-per-page">
<option selected="" value="10">10 条/页</option>
<option value="20">20 条/页</option>
<option value="50">50 条/页</option>
</select>
<div class="flex items-center border border-gray-300 rounded overflow-hidden" id="pagination-controls">

    </div>
  </div>
</div>
</div>
</div>
</div>
</div>
</template>

<script setup>
const toggleElement = (event) => {
  const header = event.currentTarget;
  const item = header.closest('.accordion-item');
  const content = item.querySelector('.accordion-content');
  const icon = header.querySelector('.accordion-icon');
  
  if (content.style.maxHeight) {
    content.style.maxHeight = null;
    icon.style.transform = 'rotate(0deg)';
  } else {
    content.style.maxHeight = content.scrollHeight + "px";
    icon.style.transform = 'rotate(-180deg)';
  }
}
</script>

<style scoped>
.accordion-content {
  max-height: none;
  overflow: hidden;
  transition: max-height 0.3s ease-out;
}
.accordion-icon {
  transition: transform 0.3s ease;
}
.tag-group {
  background-color: #f3f4f6;
  color: #4b5563;
  border: 1px solid #e5e7eb;
}
.tag-hk {
  background-color: #f0fdf4;
  color: #16a34a;
  border: 1px solid #bbf7d0;
}
.tag-crm {
  background-color: #eff6ff;
  color: #2563eb;
  border: 1px solid #bfdbfe;
}
</style>
