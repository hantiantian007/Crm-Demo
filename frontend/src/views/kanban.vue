<template>
  <div class="kb-page flex-1 overflow-y-auto p-4 md:p-4 relative custom-scrollbar bg-gray-50 w-full text-xs">
<!-- 页面头部 -->
<div class="kb-section mb-4 flex justify-between items-end">
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
<div class="kb-section mb-6 bg-orange-50/20 rounded-lg border border-orange-100 overflow-hidden">
<div class="px-4 py-3 border-b border-orange-100 bg-orange-50/40 flex items-center justify-between">
<div class="flex items-center gap-2">
<h2 class="text-base font-bold text-gray-800 flex items-center gap-2">
<i class="fa-solid fa-fire text-orange-500"></i> 研发中需求
                    </h2>
<div class="flex items-center gap-2">
<span class="text-[10px] font-medium text-orange-700 bg-orange-100 px-2 py-0.5 rounded border border-orange-200/60">研发中</span>
<span class="text-[10px] font-medium text-orange-700 bg-orange-100/60 px-2 py-0.5 rounded border border-orange-200/40">优先处理</span>
<span class="text-[10px] font-medium text-orange-700 bg-orange-100/60 px-2 py-0.5 rounded border border-orange-200/40">{{ inProgressCount }} 项</span>
</div>
</div>
</div>
<!-- 需求列表容器 -->
<div ref="inProgressListRef" class="p-4 flex flex-col gap-3 bg-orange-50/10">

<div class="bg-white rounded-lg border border-gray-100 overflow-hidden accordion-item">
<div @click="toggleElement($event)" class="px-4 py-3 cursor-pointer hover:bg-orange-50/50 transition-colors flex justify-between items-center">
<div class="flex flex-col gap-1">
<div class="flex items-center gap-3">
<span class="bg-orange-100 text-orange-700 px-2 py-1 rounded text-xs font-bold">出入金</span>
<h3 class="text-base font-bold text-gray-800">出金审核</h3>
</div>
<p class="text-xs text-gray-500 mt-1">支付失败后，增加重新选择其他通道发起支付的功能。</p>
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
<th class="px-4 py-2 font-medium whitespace-nowrap w-[220px]">页面/任务名称</th>
<th class="px-4 py-2 font-medium min-w-[320px]">概述</th>
<th class="px-4 py-2 font-medium whitespace-nowrap w-[150px]">所属客户端</th>
<th class="px-4 py-2 font-medium min-w-[280px]">交付物导航 (直达链接)</th>
</tr>
</thead>
<tbody class="divide-y divide-gray-100">
<tr class="table-row-hover">
<td class="px-4 py-3 font-bold text-gray-800">出金审核</td>
<td class="px-4 py-3 text-gray-500 whitespace-normal leading-5">支付失败后，增加重新选择其他通道发起支付的功能。</td>
<td class="px-4 py-3"><span class="inline-block px-2 py-0.5 text-[11px] rounded tag-group w-max">CRM</span></td>
<td class="px-4 py-3 text-gray-500">暂无原型、PRD</td>
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
<span class="bg-orange-100 text-orange-700 px-2 py-1 rounded text-xs font-bold">风控管理</span>
<h3 class="text-base font-bold text-gray-800">Lark 通知中心</h3>
</div>
<p class="text-xs text-gray-500 mt-1">建设 CRM Lark 群消息通知功能，包含通知记录、通知配置、Lark 群组三个 Tab。</p>
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
<th class="px-4 py-2 font-medium whitespace-nowrap w-[220px]">页面/任务名称</th>
<th class="px-4 py-2 font-medium min-w-[320px]">概述</th>
<th class="px-4 py-2 font-medium whitespace-nowrap w-[150px]">所属客户端</th>
<th class="px-4 py-2 font-medium min-w-[280px]">交付物导航 (直达链接)</th>
</tr>
</thead>
<tbody class="divide-y divide-gray-100">
<tr class="table-row-hover">
<td class="px-4 py-3 font-bold text-gray-800">Lark 通知中心</td>
<td class="px-4 py-3 text-gray-500 whitespace-normal leading-5"><ul class="list-disc pl-4 space-y-1"><li>建设 CRM Lark 群消息通知功能。</li><li>包含通知记录、通知配置、Lark 群组三个 Tab，统一管理通知记录、业务配置及群机器人 Webhook。</li></ul></td>
<td class="px-4 py-3"><span class="inline-block px-2 py-0.5 text-[11px] rounded tag-group w-max">CRM</span></td>
<td class="px-4 py-3"><div class="flex flex-wrap gap-2 items-center"><a class="text-blue-600 hover:text-blue-800 hover:underline text-xs font-medium transition-colors" href="#/risk/lark-notifications" target="_blank">原型</a>
<button type="button" class="inline-flex items-center gap-1 bg-amber-50 hover:bg-amber-100 text-amber-700 border border-amber-200 px-3 py-1.5 rounded text-xs transition-colors font-medium" @click="openLarkCenterPrd">
<i class="fas fa-file-alt"></i> PRD
</button>
</div></td>
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
<span class="bg-orange-100 text-orange-700 px-2 py-1 rounded text-xs font-bold">风控管理</span>
<h3 class="text-base font-bold text-gray-800">Lark 业务通知规则</h3>
</div>
<p class="text-xs text-gray-500 mt-1">增加 10 个核心业务通知规则，覆盖风控、审核、数据同步、支付、活动及客户活跃度场景。</p>
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
<th class="px-4 py-2 font-medium whitespace-nowrap w-[220px]">页面/任务名称</th>
<th class="px-4 py-2 font-medium min-w-[320px]">概述</th>
<th class="px-4 py-2 font-medium whitespace-nowrap w-[150px]">所属客户端</th>
<th class="px-4 py-2 font-medium min-w-[280px]">交付物导航 (直达链接)</th>
</tr>
</thead>
<tbody class="divide-y divide-gray-100">
<tr class="table-row-hover">
<td class="px-4 py-3 font-bold text-gray-800">Lark 业务通知规则</td>
<td class="px-4 py-3 text-gray-500 whitespace-normal leading-5"><ul class="list-disc pl-4 space-y-1"><li>增加 10 个核心业务通知规则：高风险出金、跨账户对冲、多账户关联、出金审核超时、MT5 数据同步异常、支付通道异常、活动参与、活动达标、活动疑似对冲、高价值客户活跃度下降。</li><li>作为后续研发对接对应业务模块的统一通知规则清单。</li></ul></td>
<td class="px-4 py-3"><span class="inline-block px-2 py-0.5 text-[11px] rounded tag-group w-max">CRM</span></td>
<td class="px-4 py-3"><div class="flex flex-wrap gap-2 items-center"><a class="text-blue-600 hover:text-blue-800 hover:underline text-xs font-medium transition-colors" href="#/risk/lark-notifications" target="_blank">原型</a>
<button type="button" class="inline-flex items-center gap-1 bg-amber-50 hover:bg-amber-100 text-amber-700 border border-amber-200 px-3 py-1.5 rounded text-xs transition-colors font-medium" @click="openLarkRulesPrd">
<i class="fas fa-file-alt"></i> PRD
</button>
</div></td>
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
<span class="bg-orange-100 text-orange-700 px-2 py-1 rounded text-xs font-bold">风控管理</span>
<h3 class="text-base font-bold text-gray-800">Lark 群组管理</h3>
</div>
<p class="text-xs text-gray-500 mt-1">维护 Lark 群名称、说明及脱敏 Webhook，支持新增、编辑、启用/停用和删除，用于多群通知配置。</p>
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
<th class="px-4 py-2 font-medium whitespace-nowrap w-[220px]">页面/任务名称</th>
<th class="px-4 py-2 font-medium min-w-[320px]">概述</th>
<th class="px-4 py-2 font-medium whitespace-nowrap w-[150px]">所属客户端</th>
<th class="px-4 py-2 font-medium min-w-[280px]">交付物导航 (直达链接)</th>
</tr>
</thead>
<tbody class="divide-y divide-gray-100">
<tr class="table-row-hover">
<td class="px-4 py-3 font-bold text-gray-800">Lark 群组管理</td>
<td class="px-4 py-3 text-gray-500 whitespace-normal leading-5"><ul class="list-disc pl-4 space-y-1"><li>维护群组名称、说明、Webhook、状态及更新时间。</li><li>支持新增、编辑、启用/停用和删除，列表地址脱敏。</li><li>业务通知及 CRM 登录通知支持多选启用群组，不再维护个人 ID 绑定。</li></ul></td>
<td class="px-4 py-3"><span class="inline-block px-2 py-0.5 text-[11px] rounded tag-group w-max">CRM</span></td>
<td class="px-4 py-3"><div class="flex flex-wrap gap-2 items-center"><a class="text-blue-600 hover:text-blue-800 hover:underline text-xs font-medium transition-colors" href="#/risk/lark-notifications" target="_blank">原型</a>
<button type="button" class="inline-flex items-center gap-1 bg-amber-50 hover:bg-amber-100 text-amber-700 border border-amber-200 px-3 py-1.5 rounded text-xs transition-colors font-medium" @click="openLarkGroupsPrd">
<i class="fas fa-file-alt"></i> PRD
</button>
</div></td>
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
<span class="bg-orange-100 text-orange-700 px-2 py-1 rounded text-xs font-bold">系统管理</span>
<h3 class="text-base font-bold text-gray-800">CRM 客户登录异常通知</h3>
</div>
<p class="text-xs text-gray-500 mt-1">在系统管理 → 系统设置 → 用户管理的用户列表中配置 CRM 登录通知，针对指定客户开启并通知配置的 Lark 群组。</p>
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
<th class="px-4 py-2 font-medium whitespace-nowrap w-[220px]">页面/任务名称</th>
<th class="px-4 py-2 font-medium min-w-[320px]">概述</th>
<th class="px-4 py-2 font-medium whitespace-nowrap w-[150px]">所属客户端</th>
<th class="px-4 py-2 font-medium min-w-[280px]">交付物导航 (直达链接)</th>
</tr>
</thead>
<tbody class="divide-y divide-gray-100">
<tr class="table-row-hover">
<td class="px-4 py-3 font-bold text-gray-800">CRM 客户登录异常通知</td>
<td class="px-4 py-3 text-gray-500 whitespace-normal leading-5"><ul class="list-disc pl-4 space-y-1"><li>在「系统管理 → 系统设置 → 用户管理」的用户列表中增加登录通知配置。</li><li>可针对指定客户开启 CRM 登录通知；客户登录 CRM 后，通知配置的 Lark 群组。</li><li>用于解决客户账号被非本人登录后无法及时发现的问题。</li><li>原型使用启用群组多选及本地配置，未来发送 Lark 群消息；本期不接入登录事件或真实消息。</li></ul></td>
<td class="px-4 py-3"><span class="inline-block px-2 py-0.5 text-[11px] rounded tag-group w-max">CRM</span></td>
<td class="px-4 py-3"><div class="flex flex-wrap gap-2 items-center"><a class="text-blue-600 hover:text-blue-800 hover:underline text-xs font-medium transition-colors" href="#/system/settings/users" target="_blank">原型</a>
<button type="button" class="inline-flex items-center gap-1 bg-amber-50 hover:bg-amber-100 text-amber-700 border border-amber-200 px-3 py-1.5 rounded text-xs transition-colors font-medium" @click="openCrmLoginNotificationPrd">
<i class="fas fa-file-alt"></i> PRD
</button>
</div></td>
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
<span class="bg-orange-100 text-orange-700 px-2 py-1 rounded text-xs font-bold">客户管理 / 推荐管理</span>
<h3 class="text-base font-bold text-gray-800">推荐码自定义及区分代理与直客推荐码</h3>
</div>
<p class="text-xs text-gray-500 mt-1">支持推荐码自定义，并能够区分代理推荐码与直客推荐码，便于后续识别不同类型推荐来源及客户归属。</p>
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
<th class="px-4 py-2 font-medium whitespace-nowrap w-[220px]">页面/任务名称</th>
<th class="px-4 py-2 font-medium min-w-[320px]">概述</th>
<th class="px-4 py-2 font-medium whitespace-nowrap w-[150px]">所属客户端</th>
<th class="px-4 py-2 font-medium min-w-[280px]">交付物导航 (直达链接)</th>
</tr>
</thead>
<tbody class="divide-y divide-gray-100">
<tr class="table-row-hover">
<td class="px-4 py-3 font-bold text-gray-800">推荐码自定义及区分代理与直客推荐码</td>
<td class="px-4 py-3 text-gray-500 whitespace-normal leading-5">支持推荐码自定义，并能够区分代理推荐码与直客推荐码，便于后续识别不同类型推荐来源及客户归属。</td>
<td class="px-4 py-3"><span class="inline-block px-2 py-0.5 text-[11px] rounded tag-group w-max">CRM</span></td>
<td class="px-4 py-3 text-gray-500">暂无原型、PRD</td>
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
<span class="bg-orange-100 text-orange-700 px-2 py-1 rounded text-xs font-bold">客户管理</span>
<h3 class="text-base font-bold text-gray-800">公众号留资页面及留资信息增加</h3>
</div>
<p class="text-xs text-gray-500 mt-1">建设微信公众号「联系我们」留资页面，支持用户填写姓名、手机号、微信号、电子邮箱及留言内容，提交后将相关信息接入 CRM 现有留资列表，供管理人员查询、分配和跟进。</p>
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
<th class="px-4 py-2 font-medium whitespace-nowrap w-[220px]">页面/任务名称</th>
<th class="px-4 py-2 font-medium min-w-[320px]">概述</th>
<th class="px-4 py-2 font-medium whitespace-nowrap w-[150px]">所属客户端</th>
<th class="px-4 py-2 font-medium min-w-[280px]">交付物导航 (直达链接)</th>
</tr>
</thead>
<tbody class="divide-y divide-gray-100">
<tr class="table-row-hover">
<td class="px-4 py-3 font-bold text-gray-800">公众号留资页面及留资信息增加</td>
<td class="px-4 py-3 text-gray-500 whitespace-normal leading-5">建设微信公众号「联系我们」留资页面，支持用户填写姓名、手机号、微信号、电子邮箱及留言内容，提交后将相关信息接入 CRM 现有留资列表，供管理人员查询、分配和跟进。</td>
<td class="px-4 py-3"><span class="inline-block px-2 py-0.5 text-[11px] rounded tag-group w-max">CRM</span></td>
<td class="px-4 py-3"><div class="flex flex-wrap gap-2 items-center">
<a class="text-blue-600 hover:text-blue-800 hover:underline text-xs font-medium transition-colors" href="#/other/contact-us" target="_blank">联系我们原型</a>
<a class="text-blue-600 hover:text-blue-800 hover:underline text-xs font-medium transition-colors" href="#/crm/leads" target="_blank">留资列表原型</a>
<button type="button" class="inline-flex items-center gap-1 bg-amber-50 hover:bg-amber-100 text-amber-700 border border-amber-200 px-3 py-1.5 rounded text-xs transition-colors font-medium" @click="openContactUsLeadsPrd"><i class="fas fa-file-alt"></i> PRD</button>
</div></td>
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
<h3 class="text-base font-bold text-gray-800">MT5佣金入账对账</h3>
</div>
<p class="text-xs text-gray-500 mt-1">在现有「佣金管理 → 对账记录」功能基础上，增加 CRM 与 MT5 佣金账户的对账能力。</p>
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
<th class="px-4 py-2 font-medium whitespace-nowrap w-[220px]">页面/任务名称</th>
<th class="px-4 py-2 font-medium min-w-[320px]">概述</th>
<th class="px-4 py-2 font-medium whitespace-nowrap w-[150px]">所属客户端</th>
<th class="px-4 py-2 font-medium min-w-[280px]">交付物导航 (直达链接)</th>
</tr>
</thead>
<tbody class="divide-y divide-gray-100">
<tr class="table-row-hover">
<td class="px-4 py-3 font-bold text-gray-800">MT5佣金入账对账</td>
<td class="px-4 py-3 text-gray-500 whitespace-normal leading-5">
<p>在现有「佣金管理 → 对账记录」功能基础上，增加 CRM 与 MT5 佣金账户的对账能力。</p>
<ul class="list-disc pl-4 space-y-1 mt-2">
<li>对账记录列表增加 MT返佣金额。</li>
<li>对账详情增加应返佣、CRM返佣、MT返佣的数量对照。</li>
<li>增加应返佣金额、CRM实际返佣金额、MT实际入账金额对照。</li>
<li>对账明细增加 MT返佣人数、MT返佣金额及 MT对账结果。</li>
<li>根据 <code>CM + MT账号 + 平仓交易编号</code> 注释，结合实际收款代理佣金账号关联 MT5 入账流水。</li>
<li>支持发现漏入账、少入账、多入账、重复入账等差异。</li>
</ul>
</td>
<td class="px-4 py-3"><span class="inline-block px-2 py-0.5 text-[11px] rounded tag-group w-max">CRM</span></td>
<td class="px-4 py-3"><div class="flex flex-wrap gap-2 items-center">
<a class="text-blue-600 hover:text-blue-800 hover:underline text-xs font-medium transition-colors" href="#/crm/commission-audit-log" target="_blank">对账记录原型</a>
<a class="text-blue-600 hover:text-blue-800 hover:underline text-xs font-medium transition-colors" href="#/crm/commission-daily-audit" target="_blank">对账详情原型</a>
<button type="button" class="inline-flex items-center gap-1 bg-amber-50 hover:bg-amber-100 text-amber-700 border border-amber-200 px-3 py-1.5 rounded text-xs transition-colors font-medium" @click="openMt5CommissionReconciliationPrd"><i class="fas fa-file-alt"></i> PRD</button>
</div></td>
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
<span class="bg-orange-100 text-orange-700 px-2 py-1 rounded text-xs font-bold">出金管理 / 风控管理</span>
<h3 class="text-base font-bold text-gray-800">出金风险提示</h3>
</div>
<p class="text-xs text-gray-500 mt-1">在现有出金审核详情页面增加风险提示能力，展示客户近期安全信息变更、关联账户风险、异常登录等情况，帮助审核人员识别异常出金并进行人工复核。</p>
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
<th class="px-4 py-2 font-medium whitespace-nowrap w-[220px]">页面/任务名称</th>
<th class="px-4 py-2 font-medium min-w-[320px]">概述</th>
<th class="px-4 py-2 font-medium whitespace-nowrap w-[150px]">所属客户端</th>
<th class="px-4 py-2 font-medium min-w-[280px]">交付物导航 (直达链接)</th>
</tr>
</thead>
<tbody class="divide-y divide-gray-100">
<tr class="table-row-hover">
<td class="px-4 py-3 font-bold text-gray-800">出金风险提示</td>
<td class="px-4 py-3 text-gray-500 whitespace-normal leading-5">
<p>在现有出金审核详情页面增加风险提示能力，展示客户近期安全信息变更、关联账户风险、异常登录等情况，帮助审核人员识别异常出金并进行人工复核。</p>
<ul class="list-disc pl-4 space-y-1 mt-2">
<li>出金申请与客户、MT 账号正确关联。</li>
<li>增加风险等级、命中规则数量及审核建议。</li>
<li>展示近期收款账户变更、身份信息变更、关联账户风险、异常登录及设备变化等风险。</li>
<li>增加风险命中明细及风险事件时间线。</li>
<li>支持记录风险核查说明及处理结果。</li>
<li>保留现有出金审核流程，不自动冻结或拒绝出金。</li>
</ul>
</td>
<td class="px-4 py-3"><span class="inline-block px-2 py-0.5 text-[11px] rounded tag-group w-max">CRM</span></td>
<td class="px-4 py-3"><div class="flex flex-wrap gap-2 items-center">
<a class="text-blue-600 hover:text-blue-800 hover:underline text-xs font-medium transition-colors" href="#/crm/withdraw-audit-detail?account=8110474" target="_blank" rel="noopener noreferrer">查看原型</a>
<button type="button" class="inline-flex items-center gap-1 bg-amber-50 hover:bg-amber-100 text-amber-700 border border-amber-200 px-3 py-1.5 rounded text-xs transition-colors font-medium" @click="openWithdrawSecurityRiskPrd"><i class="fas fa-file-alt"></i> 查看 PRD</button>
</div></td>
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
<div v-if="showMyBankcardKanban" class="bg-white rounded-lg border border-gray-100 overflow-hidden accordion-item">
<div @click="toggleElement($event)" class="px-4 py-3 cursor-pointer hover:bg-orange-50/50 transition-colors flex justify-between items-center">
<div class="flex flex-col gap-1">
<div class="flex items-center gap-3">
<span class="bg-orange-100 text-orange-700 px-2 py-1 rounded text-xs font-bold">出入金</span>
<h3 class="text-base font-bold text-gray-800">管理员出入金增加类型</h3>
</div>
<p class="text-xs text-gray-500 mt-1">支持管理员入金和管理员出金业务类型配置，并设置是否计入真实入金或真实出金。</p>
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
<tr class="table-row-hover">
<td class="px-4 py-3 font-bold text-gray-800">管理员出金</td>
<td class="px-4 py-3 text-gray-500">管理出金类型与是否计入真实出金提示。</td>
<td class="px-4 py-3"><span class="inline-block px-2 py-0.5 text-[11px] rounded tag-group w-max">Group(含HK)</span></td>
<td class="px-4 py-3">
<div class="flex flex-wrap gap-2 items-center">
<a class="kb-btn kb-btn-prd px-3 py-1.5 text-xs font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 rounded transition-colors flex items-center gap-1 border border-gray-200" href="#/other/prd-admin-withdraw" target="_blank"><i class="fas fa-file-alt"></i> PRD</a>
<a class="inline-flex items-center gap-1 bg-teal-50 hover:bg-teal-100 theme-text px-3 py-1.5 rounded text-xs transition-colors theme-border border" href="#/fund/audit-withdraw" target="_blank"><i class="fas fa-desktop"></i> 原型</a>
</div>
</td>
</tr>
<tr class="table-row-hover">
<td class="px-4 py-3 font-bold text-gray-800">出入金类型设置</td>
<td class="px-4 py-3 text-gray-500">配置入金/出金类型及是否计入真实口径。</td>
<td class="px-4 py-3"><span class="inline-block px-2 py-0.5 text-[11px] rounded tag-group w-max">Group(含HK)</span></td>
<td class="px-4 py-3">
<div class="flex flex-wrap gap-2 items-center">
<a class="kb-btn kb-btn-prd px-3 py-1.5 text-xs font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 rounded transition-colors flex items-center gap-1 border border-gray-200" href="#/other/prd-fund-type-setting" target="_blank"><i class="fas fa-file-alt"></i> PRD</a>
<a class="inline-flex items-center gap-1 bg-teal-50 hover:bg-teal-100 theme-text px-3 py-1.5 rounded text-xs transition-colors theme-border border" href="#/system/fund-type-setting" target="_blank"><i class="fas fa-desktop"></i> 原型</a>
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
</div>
<!-- 待研发需求 -->
<div class="kb-section mb-6 bg-purple-50/20 rounded-lg border border-purple-100 overflow-hidden">
<div class="px-4 py-3 border-b border-purple-100 bg-purple-50/40 flex items-center justify-between">
<div class="flex items-center gap-2">
<h2 class="text-lg font-bold text-gray-800 flex items-center gap-2">
<i class="fa-solid fa-inbox text-[#8B5CF6]"></i> 待研发需求
                    </h2>
<div class="flex items-center gap-2">
<span class="text-[10px] font-medium text-purple-700 bg-purple-100 px-2 py-0.5 rounded border border-purple-200/60">待研发</span>
<span class="text-[10px] font-medium text-purple-700 bg-purple-100/60 px-2 py-0.5 rounded border border-purple-200/40">排期中</span>
<span class="text-[10px] font-medium text-purple-700 bg-purple-100/60 px-2 py-0.5 rounded border border-purple-200/40">{{ pendingCount }} 项</span>
</div>
</div>
</div>
<!-- 需求列表容器 -->
<div ref="pendingListRef" class="p-4 flex flex-col gap-3 bg-purple-50/10">
<!-- 对账（迁移至待研发） -->
<div class="bg-white rounded-lg border border-gray-100 overflow-hidden accordion-item">
<div @click="toggleElement($event)" class="px-4 py-3 cursor-pointer hover:bg-purple-50/40 transition-colors flex justify-between items-center">
<div class="flex flex-col gap-1">
<div class="flex items-center gap-3">
<span class="bg-purple-100 text-purple-700 px-2 py-1 rounded text-xs font-bold">财务对账</span>
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

<!-- 客户详情页 - 风险标签 -->
<div class="bg-white rounded-lg border border-gray-100 overflow-hidden accordion-item">
<div @click="toggleElement($event)" class="px-4 py-3 cursor-pointer hover:bg-purple-50/40 transition-colors flex justify-between items-center">
<div class="flex flex-col gap-1">
<div class="flex items-center gap-3 flex-wrap">
<span class="bg-purple-100 text-purple-700 px-2 py-1 rounded text-xs font-bold">客户管理</span>
<h3 class="text-base font-bold text-gray-800">客户详情页 - 风险标签</h3>
<span class="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded border border-emerald-200">新增</span>
<span class="text-[10px] font-medium text-purple-700 bg-purple-100 px-2 py-0.5 rounded border border-purple-200/60">待研发</span>
<span class="text-[10px] font-medium text-rose-700 bg-rose-50 px-2 py-0.5 rounded border border-rose-200">高优先级</span>
</div>
<p class="text-xs text-gray-500 mt-1">在客户详情页展示和管理客户风险状态，支持标签添加、说明补充、解除及处理信息记录。</p>
</div>
<div class="flex items-center gap-3 text-gray-400">
<span class="text-xs bg-gray-100 px-2 py-1 rounded">包含 1 个页面</span>
<i class="fas fa-chevron-down accordion-icon"></i>
</div>
</div>
<div class="accordion-content border-t border-gray-100">
<div class="overflow-x-auto no-scrollbar">
<table class="min-w-full text-xs text-left">
<thead><tr class="bg-gray-50 text-gray-600 border-b border-gray-200"><th class="px-4 py-2 font-medium whitespace-nowrap w-[220px]">页面/任务名称</th><th class="px-4 py-2 font-medium min-w-[420px]">需求描述与主要内容</th><th class="px-4 py-2 font-medium whitespace-nowrap w-[150px]">所属页面</th><th class="px-4 py-2 font-medium whitespace-nowrap w-[120px]">状态</th><th class="px-4 py-2 font-medium whitespace-nowrap w-[120px]">优先级</th><th class="px-4 py-2 font-medium min-w-[220px]">交付物导航 (直达链接)</th></tr></thead>
<tbody class="divide-y divide-gray-100">
<tr class="table-row-hover"><td class="px-4 py-3 font-bold text-gray-800">客户详情页 - 风险标签</td><td class="px-4 py-3 text-gray-500 whitespace-normal leading-5">展示客户风险标签，支持高风险、疑似多账户、疑似对冲、疑似刷量、短期大额出金等标签；支持添加标签、补充风险说明、解除标签；解除时必须填写解除原因，并记录添加人、添加时间和处理说明，状态变化后即时更新页面。</td><td class="px-4 py-3"><span class="inline-block px-2 py-0.5 text-[11px] rounded tag-group w-max">客户详情页</span></td><td class="px-4 py-3"><span class="inline-block px-2 py-0.5 text-[11px] rounded bg-purple-100 text-purple-700 border border-purple-200">待研发</span></td><td class="px-4 py-3"><span class="inline-block px-2 py-0.5 text-[11px] rounded bg-rose-50 text-rose-700 border border-rose-200">高</span></td><td class="px-4 py-3"><div class="flex flex-wrap gap-2 items-center"><a class="text-blue-600 hover:text-blue-800 hover:underline text-xs font-medium transition-colors" href="#/crm/client-detail?id=u_agent_01" target="_blank">原型</a><a class="inline-flex items-center gap-1 bg-amber-50 hover:bg-amber-100 text-amber-700 border border-amber-200 px-3 py-1.5 rounded text-xs transition-colors font-medium" href="#/other/prd-cent-account-page-client-detail" target="_blank"><i class="fas fa-file-alt"></i> PRD</a></div></td></tr>
</tbody>
</table>
</div>
</div>
</div>

<!-- 客户详情页 - 多账户关联 -->
<div class="bg-white rounded-lg border border-gray-100 overflow-hidden accordion-item">
<div @click="toggleElement($event)" class="px-4 py-3 cursor-pointer hover:bg-purple-50/40 transition-colors flex justify-between items-center">
<div class="flex flex-col gap-1">
<div class="flex items-center gap-3 flex-wrap">
<span class="bg-purple-100 text-purple-700 px-2 py-1 rounded text-xs font-bold">客户管理</span>
<h3 class="text-base font-bold text-gray-800">客户详情页 - 多账户关联</h3>
<span class="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded border border-emerald-200">新增</span>
<span class="text-[10px] font-medium text-purple-700 bg-purple-100 px-2 py-0.5 rounded border border-purple-200/60">待研发</span>
<span class="text-[10px] font-medium text-rose-700 bg-rose-50 px-2 py-0.5 rounded border border-rose-200">高优先级</span>
</div>
<p class="text-xs text-gray-500 mt-1">在客户详情页展示客户与其他账户的模拟关联关系，支持查看关联原因、交易信息及标记待风控复核。</p>
</div>
<div class="flex items-center gap-3 text-gray-400">
<span class="text-xs bg-gray-100 px-2 py-1 rounded">包含 1 个页面</span>
<i class="fas fa-chevron-down accordion-icon"></i>
</div>
</div>
<div class="accordion-content border-t border-gray-100">
<div class="overflow-x-auto no-scrollbar">
<table class="min-w-full text-xs text-left">
<thead><tr class="bg-gray-50 text-gray-600 border-b border-gray-200"><th class="px-4 py-2 font-medium whitespace-nowrap w-[220px]">页面/任务名称</th><th class="px-4 py-2 font-medium min-w-[420px]">需求描述与主要内容</th><th class="px-4 py-2 font-medium whitespace-nowrap w-[150px]">所属页面</th><th class="px-4 py-2 font-medium whitespace-nowrap w-[120px]">状态</th><th class="px-4 py-2 font-medium whitespace-nowrap w-[120px]">优先级</th><th class="px-4 py-2 font-medium min-w-[220px]">交付物导航 (直达链接)</th></tr></thead>
<tbody class="divide-y divide-gray-100">
<tr class="table-row-hover"><td class="px-4 py-3 font-bold text-gray-800">客户详情页 - 多账户关联</td><td class="px-4 py-3 text-gray-500 whitespace-normal leading-5">展示关联账户列表及相同姓名、手机号、邮箱、证件、银行卡、钱包、IP、设备、代理关系等关联类型；展示关联强度、反向交易、共享收款账户和当前风险状态；支持查看关联原因与模拟交易信息，标记待风控复核，并从关联详情添加“疑似多账户”风险标签。</td><td class="px-4 py-3"><span class="inline-block px-2 py-0.5 text-[11px] rounded tag-group w-max">客户详情页</span></td><td class="px-4 py-3"><span class="inline-block px-2 py-0.5 text-[11px] rounded bg-purple-100 text-purple-700 border border-purple-200">待研发</span></td><td class="px-4 py-3"><span class="inline-block px-2 py-0.5 text-[11px] rounded bg-rose-50 text-rose-700 border border-rose-200">高</span></td><td class="px-4 py-3"><div class="flex flex-wrap gap-2 items-center"><a class="text-blue-600 hover:text-blue-800 hover:underline text-xs font-medium transition-colors" href="#/crm/client-detail?id=u_agent_01" target="_blank">原型</a><a class="inline-flex items-center gap-1 bg-amber-50 hover:bg-amber-100 text-amber-700 border border-amber-200 px-3 py-1.5 rounded text-xs transition-colors font-medium" href="#/other/prd-cent-account-page-client-detail" target="_blank"><i class="fas fa-file-alt"></i> PRD</a></div></td></tr>
</tbody>
</table>
</div>
</div>
</div>

<!-- 商品销售流程（迁移至待研发） -->
<div class="bg-white rounded-lg border border-gray-100 overflow-hidden accordion-item">
<div @click="toggleElement($event)" class="px-4 py-3 cursor-pointer hover:bg-purple-50/40 transition-colors flex justify-between items-center">
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
</template>


<script setup>
import { onMounted, onUnmounted, ref, nextTick } from 'vue'
import { openPrd } from '@/store/prd'

const openContactUsLeadsPrd = () => openPrd('prd-contact-us-leads.html', '联系我们表单及留资接入 PRD')
const openMt5CommissionReconciliationPrd = () => openPrd('prd-mt5-commission-reconciliation.html', 'MT5佣金入账对账需求 PRD')
const openWithdrawSecurityRiskPrd = () => openPrd('prd-withdraw-detail.html', '出金风险提示 - PRD')

const showActivityParticipationAnalysis = false
const showMyBankcardKanban = false
const showMyBankcardChild = false

const inProgressListRef = ref(null)
const pendingListRef = ref(null)
const inProgressCount = ref(0)
const pendingCount = ref(0)

const openPcardJoinPrd = () => openPrd('prd-home-pcard-activity-join.html', 'PCard 活动参与 - PRD')
const openReportActivityJoinPrd = () => openPrd('prd-report-activity-join.html', '活动参与报表 - PRD')
const openAgentHomePrd = () => openPrd('prd-agent-home.html', '代理首页 - PRD')
const openLarkCenterPrd = () => openPrd('prd-lark-notification-records.html', 'Lark 通知 PRD')
const openLarkRulesPrd = () => openPrd('prd-lark-notification-config.html', '通知配置 PRD')
const openLarkGroupsPrd = () => openPrd('prd-lark-personnel.html', 'Lark 群组管理 PRD')
const openCrmLoginNotificationPrd = () => openPrd('prd-crm-login-notification.html', 'CRM 登录通知配置 PRD')
const openPaymentConfigRecordsPrd = () => openPrd('prd-payment-management.html', '支付设置 - 配置记录 - PRD')
const openWithdrawConfigRecordsPrd = () => openPrd('prd-withdraw-settings.html', '提现设置 - 配置记录 - PRD')
const openSalesDifferentialTierRebatePrd = () => openPrd('prd-sales-differential-tier-rebate.html', '销售差异化阶梯返佣配置 - PRD')
const openSalesTradingRewardReportPrd = () => openPrd('prd-sales-trading-reward-report.html', '销售交易奖励报表 - PRD')
const openCustomerRegisterProfilePrd = () => openPrd('prd-customer-register-profile.html', '客户注册资料 - PRD')
const openPasswordSecurityPrd = () => openPrd('prd-crm-password-security-force-reset.html', 'CRM 密码安全与风险触发强制重置 - PRD')
const openBankcardAddPrd = () => openPrd('prd-bankcard-add.html', '新增银行卡 - PRD')

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
  nextTick(() => {
    const getCount = (el) => (el?.querySelectorAll?.(':scope > .accordion-item:not([style*=\"display: none\"])') || []).length
    inProgressCount.value = getCount(inProgressListRef.value)
    pendingCount.value = getCount(pendingListRef.value)
  })
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
