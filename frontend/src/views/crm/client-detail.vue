<template>
  <div class="flex h-full bg-mainBg overflow-hidden">
    <div class="flex-1 flex flex-col min-w-0 bg-gray-50 overflow-hidden p-4 custom-scrollbar overflow-y-auto">
      <div class="flex-1 p-4 sm:p-6 overflow-y-auto bg-mainBg flex flex-col gap-6 w-full">
 <div class="grid grid-cols-1 xl:grid-cols-3 gap-6 w-full">
  <!-- 左侧两列：核心信息 -->
  <div class="xl:col-span-2 flex flex-col gap-6">
   <!-- 卡片1：基础信息 (头像等) -->
   <div class="bg-white rounded-lg p-4 sm:p-6 shadow-sm border border-gray-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 relative overflow-hidden">
    <div class="flex items-center gap-4">
     <!-- 头像占位 -->
     <div class="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center text-gray-400 text-2xl border border-gray-200">
      <i class="fa-solid fa-user">
      </i>
     </div>
     <div>
      <div class="text-lg font-medium text-gray-800 mb-1">
       test-褚必-b12@qq.com
      </div>
      <div class="flex items-center gap-3 text-sm text-gray-600">
       <span>
        13993242210
       </span>
       <span class="bg-blue-50 text-blue-500 px-2 py-0.5 rounded text-xs">
        代理
       </span>
      </div>
      <!-- 风险标签摘要 -->
      <div class="flex flex-wrap items-center gap-2 mt-3" id="clientTagsContainer">
       <span v-for="tag in riskTags" :key="tag.id" class="inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded border" :class="riskLevelTagClass(tag.level)">
        <span class="w-1.5 h-1.5 rounded-full" :class="riskLevelDotClass(tag.level)"></span>
        {{ tag.name }}
       </span>
       <button class="inline-flex items-center bg-gray-50 text-gray-500 border border-dashed border-gray-300 hover:border-blue-400 hover:text-blue-500 text-xs px-2 py-0.5 rounded cursor-pointer transition-colors" type="button" @click="openAddRiskTag">
        <i class="fa-solid fa-plus mr-1"></i>
        添加风险标签
       </button>
      </div>
     </div>
    </div>
    <div class="mr-8 flex items-center gap-3 flex-wrap justify-end">
      <div v-if="demoUser?.force_reset_required" class="inline-flex items-center px-2 py-1 rounded-full text-[11px] font-medium border bg-amber-50 text-amber-700 border-amber-200">
        已设置下次登录强制改密
      </div>
      <button
        type="button"
        class="inline-flex items-center gap-1 px-3 py-1.5 rounded-md text-xs font-medium border transition-colors"
        :class="forceResetUnavailableReason ? 'border-gray-200 bg-gray-100 text-gray-400 cursor-not-allowed' : 'border-primaryBtn bg-primaryBtn text-white hover:bg-primaryBtnHover'"
        :disabled="Boolean(forceResetUnavailableReason)"
        @click="openForceResetDialog"
      >
        <i class="fa-solid fa-key"></i> 强制修改密码
      </button>
      <div class="stamp">
        正常
      </div>
    </div>
   </div>
   <!-- 卡片2：账户信息 -->
   <div class="bg-white rounded-lg p-4 sm:p-6 shadow-sm border border-gray-100">
    <h3 class="text-base font-bold text-gray-800 mb-4 sm:mb-6">
     账户信息
    </h3>
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-4 sm:gap-y-6 text-sm">
     <div>
      <div class="text-gray-500 mb-1">
       上级姓名:
      </div>
      <div class="text-gray-800">
       test-蒋为
      </div>
     </div>
     <div>
      <div class="text-gray-500 mb-1">
       上级邮箱:
      </div>
      <div class="text-gray-800">
       b11@qq.com
      </div>
     </div>
     <div>
      <div class="text-gray-500 mb-1">
       推荐人姓名:
      </div>
      <div class="text-gray-800">
       test-蒋为
      </div>
     </div>
     <div>
      <div class="text-gray-500 mb-1">
       推荐人邮箱:
      </div>
      <div class="text-gray-800">
       b11@qq.com
      </div>
     </div>
     <div>
      <div class="text-gray-500 mb-1">
       客户类型:
      </div>
      <div class="text-gray-800">
       代理
      </div>
     </div>
     <div>
      <div class="text-gray-500 mb-1">
       客户角色:
      </div>
      <div class="text-gray-800">
       代理
      </div>
     </div>
     <div>
      <div class="text-gray-500 mb-1">
       分佣配置:
      </div>
      <div class="text-gray-800">
       未配置
      </div>
     </div>
     <div>
      <div class="text-gray-500 mb-1">
       账户类型:
      </div>
      <div class="text-red-500">
       标准账户 + 美分账户
      </div>
     </div>
     <div>
      <div class="text-gray-500 mb-1">
       MT账号数量:
      </div>
      <div class="text-red-500">
       3
       <span class="text-xs text-red-500 ml-1">
        （标准 2 / 美分 1）
       </span>
      </div>
      <div class="text-xs text-amber-600 mt-1">
       <i class="fa-solid fa-check-circle mr-1">
       </i>
       已绑活动账号: 8001234
      </div>
     </div>
     <div>
      <div class="text-gray-500 mb-1">
       银行卡数量:
      </div>
      <div class="text-gray-800">
       0
      </div>
     </div>
    </div>
   </div>
   <!-- 卡片3：资金信息 -->
   <!-- 风险标签 -->
   <div class="bg-emerald-50/20 rounded-lg p-4 sm:p-6 shadow-sm border border-emerald-200/70">
    <div class="flex items-start justify-between gap-3 mb-4">
     <div>
      <div class="flex items-center gap-2"><h3 class="text-base font-bold text-gray-800">风险标签</h3><span class="rounded border border-emerald-200 bg-emerald-100 px-2 py-0.5 text-[10px] font-bold text-emerald-700">新增</span></div>
      <p class="text-xs text-gray-500 mt-1">系统自动打标 Demo：规则由前端模拟数据驱动，仅用于风险提示，不触发自动限制。</p>
     </div>
     <button type="button" class="inline-flex items-center gap-1 rounded border border-[#C4A373] px-3 py-1.5 text-xs text-[#9b7844] hover:bg-[#fbf7ef] transition-colors" @click="openAddRiskTag">
      <i class="fa-solid fa-plus"></i> 添加标签
     </button>
    </div>
    <div class="overflow-x-auto">
     <table class="w-full min-w-[1180px] text-sm text-left whitespace-nowrap">
      <thead class="border-b border-gray-100 text-gray-500">
       <tr><th class="py-3 px-2 font-medium">标签名称</th><th class="py-3 px-2 font-medium">风险等级</th><th class="py-3 px-2 font-medium">来源 / 状态</th><th class="py-3 px-2 font-medium">触发时间</th><th class="py-3 px-2 font-medium">添加人</th><th class="py-3 px-2 font-medium">关联账户 / 订单</th><th class="py-3 px-2 font-medium">触发依据 / 风险说明</th><th class="py-3 px-2 font-medium">操作</th></tr>
      </thead>
      <tbody>
       <tr v-for="tag in riskTags" :key="tag.id" class="border-b border-gray-50 hover:bg-gray-50">
        <td class="py-3 px-2 font-medium text-gray-800">{{ tag.name }}</td>
        <td class="py-3 px-2"><span class="inline-flex items-center gap-1 rounded border px-2 py-1 text-xs" :class="riskLevelTagClass(tag.level)"><span class="w-1.5 h-1.5 rounded-full" :class="riskLevelDotClass(tag.level)"></span>{{ tag.level }}</span></td>
        <td class="py-3 px-2"><div class="flex flex-col gap-1"><span class="rounded border px-2 py-1 text-xs" :class="tag.source === '系统自动' ? 'border-blue-200 bg-blue-50 text-blue-700' : 'border-gray-200 bg-gray-50 text-gray-600'">{{ tag.source }}</span><span class="text-xs text-emerald-600">{{ tag.status }}</span></div></td>
        <td class="py-3 px-2 text-gray-600">{{ tag.triggeredAt || tag.addedAt }}</td>
        <td class="py-3 px-2 text-gray-600">{{ tag.addedBy }}</td>
        <td class="py-3 px-2 text-gray-600 whitespace-normal min-w-[220px]">{{ tag.relatedObjects || '—' }}</td>
        <td class="py-3 px-2 text-gray-600 whitespace-normal min-w-[360px]">{{ tag.description || '未填写' }}</td>
        <td class="py-3 px-2"><div class="flex items-center gap-2"><button type="button" class="text-blue-600 hover:text-blue-800 text-xs" @click="openEditRiskTag(tag)">补充说明</button><button type="button" class="text-rose-600 hover:text-rose-800 text-xs" @click="openRemoveRiskTag(tag)">解除</button></div></td>
       </tr>
       <tr v-if="riskTags.length === 0"><td colspan="8" class="py-8 text-center text-gray-400">暂无风险标签</td></tr>
      </tbody>
     </table>
    </div>
   </div>
   <!-- 多账户关联 -->
   <div class="bg-emerald-50/20 rounded-lg p-4 sm:p-6 shadow-sm border border-emerald-200/70">
    <div class="flex items-start justify-between gap-3 mb-4">
     <div><div class="flex items-center gap-2"><h3 class="text-base font-bold text-gray-800">关联账户</h3><span class="rounded border border-emerald-200 bg-emerald-100 px-2 py-0.5 text-[10px] font-bold text-emerald-700">新增</span></div><p class="text-xs text-gray-500 mt-1">基于模拟数据展示客户之间的关联关系。</p></div>
     <span class="rounded-full bg-blue-50 px-2.5 py-1 text-xs text-blue-600">{{ relatedAccounts.length }} 个关联账户</span>
    </div>
    <div class="overflow-x-auto">
     <table class="w-full min-w-[1180px] text-sm text-left whitespace-nowrap">
      <thead class="border-b border-gray-100 text-gray-500"><tr><th class="py-3 px-2 font-medium">账户编号</th><th class="py-3 px-2 font-medium">客户姓名</th><th class="py-3 px-2 font-medium">关联类型</th><th class="py-3 px-2 font-medium">关联强度</th><th class="py-3 px-2 font-medium">最近登录时间</th><th class="py-3 px-2 font-medium">反向交易</th><th class="py-3 px-2 font-medium">共享收款账户</th><th class="py-3 px-2 font-medium">当前风险状态</th><th class="py-3 px-2 font-medium">操作</th></tr></thead>
      <tbody>
       <tr v-for="account in relatedAccounts" :key="account.accountId" class="border-b border-gray-50 hover:bg-gray-50">
        <td class="py-3 px-2 font-medium text-blue-600">{{ account.accountId }}</td><td class="py-3 px-2">{{ account.name }}</td><td class="py-3 px-2">{{ account.relationType }}</td>
        <td class="py-3 px-2"><span class="rounded border px-2 py-1 text-xs" :class="relationStrengthClass(account.strength)">{{ account.strength }}</span></td><td class="py-3 px-2 text-gray-600">{{ account.lastLoginAt }}</td><td class="py-3 px-2">{{ account.reverseTrade ? '是' : '否' }}</td><td class="py-3 px-2">{{ account.sharedPayee ? '是' : '否' }}</td>
        <td class="py-3 px-2"><span class="rounded border px-2 py-1 text-xs" :class="riskStatusClass(account.riskStatus)">{{ account.riskStatus }}</span></td>
        <td class="py-3 px-2"><div class="flex items-center gap-2"><button type="button" class="text-blue-600 hover:text-blue-800 text-xs" @click="openRelatedAccount(account)">查看关联</button><button type="button" class="text-[#9b7844] hover:text-[#7f6037] text-xs" @click="markRelationReview(account)">{{ reviewIds.includes(account.accountId) ? '已待复核' : '待风控复核' }}</button></div></td>
       </tr>
      </tbody>
     </table>
    </div>
   </div>
   <!-- 卡片3：资金信息 -->
   <div class="bg-white rounded-lg p-4 sm:p-6 shadow-sm border border-gray-100">
    <h3 class="text-base font-bold text-gray-800 mb-4 sm:mb-6">
     资金信息
    </h3>
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-4 sm:gap-y-6 text-sm">
     <div>
      <div class="text-gray-500 mb-1">
       累计入金:
      </div>
      <div class="text-red-500">
       91.00 USD
      </div>
      <div class="text-xs text-red-500 mt-1">
       USD：90.00
      </div>
      <div class="text-xs text-red-500 mt-1">
       USC：100.01
      </div>
     </div>
     <div>
      <div class="text-gray-500 mb-1">
       累计出金:
      </div>
      <div class="text-red-500">
       1,230.00 USD/美元
      </div>
      <div class="text-xs text-red-500 mt-1">
       包含美分账户出金：45.00 USD
      </div>
     </div>
     <div>
      <div class="text-gray-500 mb-1">
       累计净入金:
      </div>
      <div class="text-red-500">
       8,870.00 USD/美元
      </div>
     </div>
     <div>
      <div class="text-gray-500 mb-1">
       累计交易笔数:
      </div>
      <div class="text-gray-800">
       1
      </div>
     </div>
     <div>
      <div class="text-gray-500 mb-1">
       累计标准交易手数:
      </div>
      <div class="text-red-500">
       0.25
      </div>
     </div>
     <div>
      <div class="text-gray-500 mb-1">
       累计美分交易手数:
      </div>
      <div class="text-red-500">
       0.15
      </div>
     </div>
     <div>
      <div class="text-gray-500 mb-1">
       佣金产生总额:
      </div>
      <div class="text-gray-800">
       0.00
      </div>
     </div>
     <div>
      <div class="text-gray-500 mb-1">
       赠金:
      </div>
      <div class="text-gray-800">
       0.00
      </div>
     </div>
     <div>
      <div class="text-gray-500 mb-1">
       试用账号盈利金额:
      </div>
      <div class="text-gray-800">
       0.00
      </div>
     </div>
    </div>
   </div>
   <!-- 卡片4：留资溯源信息 (横向展示) -->
   <div class="bg-white rounded-lg p-4 sm:p-6 shadow-sm border border-gray-100 relative">
    <div class="flex items-center justify-between mb-4 sm:mb-6">
     <h3 class="text-base font-bold text-gray-800">
      <i class="fa-solid fa-link text-blue-500 mr-2">
      </i>
      留资溯源信息
     </h3>
     <div class="flex items-center gap-3">
      <span class="bg-green-100 text-green-600 text-xs px-2 py-1 rounded">
       已转化
      </span>
      <button class="text-sm text-blue-600 hover:text-blue-800 transition-colors hidden sm:inline-flex items-center gap-1" type="button" @click="goLeadsTrace">
       <i class="fa-solid fa-arrow-left">
       </i>
       查看留资轨迹
      </button>
     </div>
    </div>
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-4 sm:gap-y-6 text-sm">
     <div>
      <div class="text-gray-500 mb-1">
       信息来源:
      </div>
      <div class="text-gray-800">
       官网访问
      </div>
     </div>
     <div>
      <div class="text-gray-500 mb-1">
       咨询内容:
      </div>
      <div class="text-gray-800">
       个人交易
      </div>
     </div>
     <div>
      <div class="text-gray-500 mb-1">
       线索热度:
      </div>
      <div class="text-red-500 font-medium">
       高
      </div>
     </div>
     <div>
      <div class="text-gray-500 mb-1">
       线索入库时间:
      </div>
      <div class="text-gray-800">
       2026-05-20
      </div>
     </div>
     <div>
      <div class="text-gray-500 mb-1">
       首响时间:
      </div>
      <div class="text-gray-800">
       15分钟
      </div>
     </div>
     <div>
      <div class="text-gray-500 mb-1">
       历史跟进次数:
      </div>
      <div class="text-gray-800">
       8次
      </div>
     </div>
     <div>
      <div class="text-gray-500 mb-1">
       转化归属销售:
      </div>
      <div class="text-gray-800 font-medium">
       李销售
      </div>
     </div>
     <div>
      <div class="text-gray-500 mb-1 flex items-center gap-2">
       <button class="text-xs text-blue-500 hover:text-blue-700 hover:underline">
        <i class="fa-solid fa-edit mr-1">
        </i>
        修改
       </button>
       <span>
        归属代理 (IB):
       </span>
      </div>
      <div class="text-blue-600 font-medium" id="currentIBDisplay">
       王代理 (wang@ib.com)
      </div>
     </div>
     <div>
      <div class="text-gray-500 mb-1">
       转化周期:
      </div>
      <div class="text-orange-500 font-medium">
       19天
      </div>
     </div>
     <div>
      <div class="text-gray-500 mb-1">
       首次入金时间:
      </div>
      <div class="text-gray-800">
       2026-06-08
      </div>
     </div>
     <div>
      <div class="text-gray-500 mb-1">
       首次入金金额:
      </div>
      <div class="text-green-600 font-medium">
       $5,000.00
      </div>
     </div>
     <div>
      <div class="text-gray-500 mb-1">
       首次交易时间:
      </div>
      <div class="text-gray-800">
       2026-06-08
      </div>
     </div>
    </div>
    <!-- 移动端显示的溯源按钮 -->
    <button class="mt-4 sm:hidden flex items-center justify-center gap-2 text-sm text-blue-600 bg-white border border-blue-200 hover:bg-blue-50 px-4 py-2 rounded transition-colors w-full" type="button" @click="goLeadsTrace">
     <i class="fa-solid fa-arrow-left">
     </i>
     查看原始留资轨迹
    </button>
   </div>
  </div>
  <!-- 右侧一列：基础及注册信息 -->
  <div class="flex flex-col gap-6">
   <!-- 卡片5：身份与居住信息 -->
   <div class="bg-white rounded-lg p-4 sm:p-6 shadow-sm border border-gray-100">
    <h3 class="text-base font-bold text-gray-800 mb-4 sm:mb-6">
     身份与居住信息
    </h3>
    <div class="flex flex-col gap-3 sm:gap-4 text-sm">
     <div class="flex">
      <span class="text-gray-500 w-28 sm:w-32 shrink-0">
       证件号码:
      </span>
      <span class="text-gray-800 break-all">
       {{ displayOrDash(identityResidence.certNo) }}
      </span>
     </div>
     <div class="flex">
      <span class="text-gray-500 w-28 sm:w-32 shrink-0">
       出生日期:
      </span>
      <span class="text-gray-800">
       {{ displayOrDash(identityResidence.birthDate) }}
      </span>
     </div>
     <div class="flex">
      <span class="text-gray-500 w-28 sm:w-32 shrink-0">
       出生国家:
      </span>
      <span class="text-gray-800">
       {{ displayOrDash(identityResidence.birthCountry) }}
      </span>
     </div>
     <div class="flex">
      <span class="text-[#2563EB] w-28 sm:w-32 shrink-0">
       注册地区:
      </span>
      <span class="text-[#2563EB]">
       {{ displayOrDash(identityResidence.registerRegion) }}
      </span>
     </div>
     <div class="flex">
      <span class="text-[#2563EB] w-28 sm:w-32 shrink-0">
       常住国家/地区:
      </span>
      <span class="text-[#2563EB]">
       {{ displayOrDash(identityResidence.residenceCountry) }}
      </span>
     </div>
     <div class="flex">
      <span class="text-[#2563EB] w-28 sm:w-32 shrink-0">
       省/州:
      </span>
      <span class="text-[#2563EB]">
       {{ displayOrDash(identityResidence.province) }}
      </span>
     </div>
     <div class="flex">
      <span class="text-[#2563EB] w-28 sm:w-32 shrink-0">
       城市:
      </span>
      <span class="text-[#2563EB]">
       {{ displayOrDash(identityResidence.city) }}
      </span>
     </div>
     <div class="flex">
      <span class="text-[#2563EB] w-28 sm:w-32 shrink-0">
       详细居住地址:
      </span>
      <span class="text-[#2563EB] break-words whitespace-normal leading-5">
       {{ displayOrDash(identityResidence.addressDetail) }}
      </span>
     </div>
    </div>
   </div>
   <!-- 卡片6：注册信息 -->
   <div class="bg-white rounded-lg p-4 sm:p-6 shadow-sm border border-gray-100">
    <h3 class="text-base font-bold text-gray-800 mb-4 sm:mb-6">
     注册信息
    </h3>
    <div class="flex flex-col gap-3 sm:gap-4 text-sm">
     <div class="flex">
      <span class="text-gray-500 w-32 shrink-0">
       注册时间:
      </span>
      <span class="text-gray-800">
       {{ displayOrDash(registerInfo.registerAt) }}
      </span>
     </div>
     <div class="flex">
      <span class="text-gray-500 w-32 shrink-0">
       注册IP:
      </span>
      <span class="text-gray-800 break-all">
       {{ displayOrDash(registerInfo.registerIp) }}
      </span>
     </div>
     <div class="flex">
      <span class="w-32 shrink-0 flex items-center gap-1">
       <span class="text-[#D97706]">注册IP归属地:</span>
       <span class="text-gray-300 cursor-help" title="根据注册IP解析，仅用于地区分析和风险辅助判断。">
        <i class="fa-regular fa-circle-question text-[12px]"></i>
       </span>
      </span>
      <span class="text-gray-800 break-words whitespace-normal leading-5">
       {{ displayOrDash(registerInfo.registerIpLocation) }}
      </span>
     </div>
     <div class="flex">
      <span class="text-[#D97706] w-32 shrink-0">
       登录次数:
      </span>
      <span class="text-gray-800">
       {{ displayOrDash(registerInfo.loginCount) }}
      </span>
     </div>
     <div class="flex">
      <span class="text-gray-500 w-32 shrink-0">
       最后一次登录时间:
      </span>
      <span class="text-gray-800">
       {{ displayOrDash(registerInfo.lastLoginAt) }}
      </span>
     </div>
    </div>
   </div>
   <!-- 卡片7：登录环境风险 -->
   <div class="bg-white rounded-lg p-4 sm:p-6 shadow-sm border border-[#eadcc4]">
    <div class="flex items-start justify-between gap-3 mb-4">
     <div class="flex items-end justify-between gap-3 w-full">
      <h3 class="text-base font-bold text-gray-800 flex items-center gap-2">
       <i class="fa-solid fa-shield-halved text-[#C19B5E]">
       </i>
       登录环境风险
      </h3>
      <button class="text-sm text-[#C19B5E] hover:text-[#a88651] transition-colors whitespace-nowrap" type="button" @click="goIpAlert">
       查看明细
       <i class="fa-solid fa-angle-right ml-1">
       </i>
      </button>
     </div>
    </div>
    <p class="text-xs text-gray-500 leading-5 mb-4">
     地区判断仅用于风险提示和人工核查，不会直接限制客户操作。
    </p>
    <div class="space-y-4 text-sm">
     <div class="rounded-xl bg-[#fbfaf7] border border-[#efe4d4] p-3">
      <div class="flex items-start justify-between gap-3">
       <div class="min-w-0">
        <div class="text-gray-500 text-xs">
         最近判定时间
        </div>
        <div class="text-gray-800 font-medium mt-2">
         {{ displayOrDash(loginRisk.judgedAt) }}
        </div>
       </div>
       <div class="text-right shrink-0">
        <div class="text-[#2563EB] text-xs">
         整体风险等级
        </div>
        <div class="mt-2">
         <span class="inline-flex items-center gap-1 px-2 py-1 rounded border text-[11px] font-medium" :class="riskLevelTagClass(loginRisk.overallRisk)">
          <span class="w-1.5 h-1.5 rounded-full" :class="riskLevelDotClass(loginRisk.overallRisk)"></span>
          <span class="text-[#2563EB]">{{ displayOrDash(loginRisk.overallRisk) }}</span>
         </span>
        </div>
       </div>
      </div>
     </div>

     <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
      <div class="rounded-xl bg-gray-50 p-3">
       <div class="text-xs text-[#2563EB] mb-2 font-medium">
        CRM登录
       </div>
       <div class="space-y-2 text-xs">
        <div class="flex items-start gap-2">
         <span class="text-[#2563EB] w-20 shrink-0">最近登录IP</span>
         <span class="text-[#2563EB] break-all">{{ displayOrDash(loginRisk.crm.ip) }}</span>
        </div>
        <div class="flex items-start gap-2">
         <span class="text-[#2563EB] w-20 shrink-0">最近登录地区</span>
         <span class="text-[#2563EB] break-words whitespace-normal leading-5">{{ displayOrDash(loginRisk.crm.region) }}</span>
        </div>
        <div class="flex items-start gap-2">
         <span class="text-[#2563EB] w-20 shrink-0">最近登录时间</span>
         <span class="text-[#2563EB] font-mono">{{ displayOrDash(loginRisk.crm.at) }}</span>
        </div>
       </div>
      </div>
      <div class="rounded-xl bg-gray-50 p-3">
       <div class="text-xs text-[#2563EB] mb-2 font-medium">
        MT5登录
       </div>
       <div class="space-y-2 text-xs">
        <div class="flex items-start gap-2">
         <span class="text-[#2563EB] w-20 shrink-0">最近登录IP</span>
         <span class="text-[#2563EB] break-all">{{ displayOrDash(loginRisk.mt5.ip) }}</span>
        </div>
        <div class="flex items-start gap-2">
         <span class="text-[#2563EB] w-20 shrink-0">最近登录地区</span>
         <span class="text-[#2563EB] break-words whitespace-normal leading-5">{{ displayOrDash(loginRisk.mt5.region) }}</span>
        </div>
        <div class="flex items-start gap-2">
         <span class="text-[#2563EB] w-20 shrink-0">MT账号</span>
         <span class="text-[#2563EB] font-mono">{{ displayOrDash(loginRisk.mt5.mtAccount) }}</span>
        </div>
        <div class="flex items-start gap-2">
         <span class="text-[#2563EB] w-20 shrink-0">最近登录时间</span>
         <span class="text-[#2563EB] font-mono">{{ displayOrDash(loginRisk.mt5.at) }}</span>
        </div>
       </div>
      </div>
     </div>

     <div class="rounded-xl bg-gray-50 p-3">
      <div class="text-xs text-[#2563EB] font-medium">
       登录地区统计
      </div>
      <div class="mt-3 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
       <div class="rounded-lg bg-white border border-gray-100 px-3 py-2.5">
        <div class="text-[#2563EB] text-[11px]">近30天常用登录地区</div>
        <div class="mt-1 text-[#2563EB] break-words whitespace-normal leading-5">{{ displayOrDash(loginRisk.stats.commonRegion30d) }}</div>
       </div>
       <div class="rounded-lg bg-white border border-gray-100 px-3 py-2.5">
        <div class="text-[#2563EB] text-[11px]">近30天登录国家/地区数量</div>
        <div class="mt-1 text-[#2563EB] font-mono">{{ displayOrDash(loginRisk.stats.countryCount30d) }}</div>
       </div>
       <div class="rounded-lg bg-white border border-gray-100 px-3 py-2.5">
        <div class="text-[#2563EB] text-[11px]">近30天异常地区登录次数</div>
        <div class="mt-1 text-[#2563EB] font-mono">{{ displayOrDash(loginRisk.stats.abnormalCount30d) }}</div>
       </div>
      </div>
     </div>

     <div class="rounded-xl bg-gray-50 p-3">
      <div class="text-xs text-[#2563EB] font-medium">
       一致性判断
      </div>
      <div class="mt-3 space-y-2 text-xs">
       <div class="flex items-center justify-between gap-3">
        <span class="text-[#2563EB]">注册地区与常住地区</span>
        <span class="inline-flex items-center gap-1 px-2 py-1 rounded border text-[11px] font-medium" :class="consistencyTagClass(loginRisk.consistency.registerVsResidence.status)">
         {{ loginRisk.consistency.registerVsResidence.status }}
        </span>
       </div>
       <div class="flex items-center justify-between gap-3">
        <span class="text-[#2563EB]">注册地区与CRM登录地区</span>
        <span class="inline-flex items-center gap-1 px-2 py-1 rounded border text-[11px] font-medium" :class="consistencyTagClass(loginRisk.consistency.registerVsCrm.status)">
         {{ loginRisk.consistency.registerVsCrm.status }}
        </span>
       </div>
       <div class="flex items-center justify-between gap-3">
        <span class="text-[#2563EB]">注册地区与MT5登录地区</span>
        <span class="inline-flex items-center gap-1 px-2 py-1 rounded border text-[11px] font-medium" :class="consistencyTagClass(loginRisk.consistency.registerVsMt5.status)">
         {{ loginRisk.consistency.registerVsMt5.status }}
        </span>
       </div>
       <div class="flex items-center justify-between gap-3">
        <span class="text-[#2563EB]">CRM与MT5登录地区</span>
        <span class="inline-flex items-center gap-1 px-2 py-1 rounded border text-[11px] font-medium" :class="consistencyTagClass(loginRisk.consistency.crmVsMt5.status)">
         {{ loginRisk.consistency.crmVsMt5.status }}
        </span>
       </div>
      </div>
     </div>
    </div>
   </div>
  </div>
 </div>
<!-- 活动赠金 -->
<div v-if="false" class="bg-white rounded-lg shadow-sm border border-gray-100 mt-4 w-full">
 <div class="px-4 sm:px-6 py-4 border-b border-gray-100 flex items-center justify-between">
  <div>
   <div class="text-base font-bold text-gray-800">活动赠金</div>
   <div class="text-xs text-gray-500 mt-1">按活动独立记账：已发放 / 可用 / 已占用 / 已释放 / 已消耗 / 已转换 / 已失效。</div>
  </div>
 </div>
 <div class="p-0 sm:p-6 overflow-x-auto">
  <table class="w-full text-sm text-left whitespace-nowrap min-w-[980px]">
   <thead class="text-gray-500 border-b border-gray-100">
    <tr>
     <th class="font-medium py-4 px-4">活动名称</th>
     <th class="font-medium py-4 px-4 text-right">原始赠金</th>
     <th class="font-medium py-4 px-4 text-right">当前可用</th>
     <th class="font-medium py-4 px-4 text-right">当前占用</th>
     <th class="font-medium py-4 px-4 text-right">已消耗</th>
     <th class="font-medium py-4 px-4 text-right">已转换</th>
     <th class="font-medium py-4 px-4 text-right">可转换金额</th>
    </tr>
   </thead>
   <tbody class="text-gray-700">
    <tr v-for="r in activityCreditRows" :key="r.activityId" class="border-b border-gray-50 hover:bg-gray-50 transition-colors">
     <td class="py-4 px-4 font-medium text-gray-800">{{ r.activityName }}</td>
     <td class="py-4 px-4 text-right font-mono">${{ formatUsd4(r.issuedCredit) }}</td>
     <td class="py-4 px-4 text-right font-mono">${{ formatUsd4(r.availableCredit) }}</td>
     <td class="py-4 px-4 text-right font-mono">${{ formatUsd4(r.occupiedNow) }}</td>
     <td class="py-4 px-4 text-right font-mono">${{ formatUsd4(r.consumedCredit) }}</td>
     <td class="py-4 px-4 text-right font-mono">${{ formatUsd4(r.convertedCredit) }}</td>
     <td class="py-4 px-4 text-right font-mono">${{ formatUsd4(r.convertibleCredit) }}</td>
    </tr>
    <tr v-if="activityCreditRows.length === 0">
     <td class="py-10 px-4 text-gray-400" colspan="7">无可用数据</td>
    </tr>
   </tbody>
  </table>
 </div>
 <div class="px-4 sm:px-6 py-4 border-t border-gray-100">
  <div class="text-sm font-bold text-gray-800 mb-3">赠金流水</div>
  <div class="overflow-x-auto">
   <table class="w-full text-sm text-left whitespace-nowrap min-w-[980px]">
    <thead class="text-gray-500 border-b border-gray-100">
     <tr>
      <th class="font-medium py-4 px-4">时间</th>
      <th class="font-medium py-4 px-4">活动名称</th>
      <th class="font-medium py-4 px-4">类型</th>
      <th class="font-medium py-4 px-4 text-right">金额</th>
      <th class="font-medium py-4 px-4">备注</th>
     </tr>
    </thead>
    <tbody class="text-gray-700">
     <tr v-for="l in ledgerRows" :key="l.id" class="border-b border-gray-50 hover:bg-gray-50 transition-colors">
      <td class="py-4 px-4 font-mono text-gray-600">{{ l.at }}</td>
      <td class="py-4 px-4">{{ l.activityName }}</td>
      <td class="py-4 px-4">{{ l.type }}</td>
      <td class="py-4 px-4 text-right font-mono">${{ formatUsd4(l.amount) }}</td>
      <td class="py-4 px-4 text-gray-600">{{ l.remark }}</td>
     </tr>
     <tr v-if="ledgerRows.length === 0">
      <td class="py-10 px-4 text-gray-400" colspan="5">无可用数据</td>
     </tr>
    </tbody>
   </table>
  </div>
 </div>
</div>
 <!-- 下半部分：多 Tab 表格区域 -->
 <div class="bg-white rounded-lg shadow-sm border border-gray-100 flex flex-col w-full">
  <!-- Tabs 导航 -->
  <div class="flex items-center border-b border-gray-100 overflow-x-auto no-scrollbar">
   <button class="px-6 py-4 text-sm font-medium text-[#C4A373] border-b-2 border-[#C4A373] whitespace-nowrap bg-white">
    账号列表
   </button>
   <button class="px-6 py-4 text-sm text-gray-500 hover:text-gray-800 whitespace-nowrap bg-white border-b-2 border-transparent">
    银行卡信息
   </button>
   <button class="px-6 py-4 text-sm text-gray-500 hover:text-gray-800 whitespace-nowrap bg-white border-b-2 border-transparent">
    登录信息
   </button>
   <button class="px-6 py-4 text-sm text-gray-500 hover:text-gray-800 whitespace-nowrap bg-white border-b-2 border-transparent">
    入金记录
   </button>
   <button class="px-6 py-4 text-sm text-gray-500 hover:text-gray-800 whitespace-nowrap bg-white border-b-2 border-transparent">
    出金记录
   </button>
   <button class="px-6 py-4 text-sm text-gray-500 hover:text-gray-800 whitespace-nowrap bg-white border-b-2 border-transparent">
    客户变更记录
   </button>
   <button class="px-6 py-4 text-sm text-gray-500 hover:text-gray-800 whitespace-nowrap bg-white border-b-2 border-transparent">
    邀请记录
   </button>
  </div>
  <!-- 表格内容区 -->
  <div class="p-0 sm:p-6 overflow-x-auto">
   <table class="w-full text-sm text-left whitespace-nowrap min-w-[800px]">
    <thead class="text-gray-500 border-b border-gray-100">
     <tr>
      <th class="font-medium py-4 px-4">
       MT账号
      </th>
      <th class="font-medium py-4 px-4">
       账号属性
      </th>
      <th class="font-medium py-4 px-4">
       分组名称
      </th>
      <th class="font-medium py-4 px-4">
       杠杆
      </th>
      <th class="font-medium py-4 px-4 text-red-500">
       手数
      </th>
      <th class="font-medium py-4 px-4">
       余额
      </th>
      <th class="font-medium py-4 px-4">
       赠金
      </th>
      <th class="font-medium py-4 px-4">
       入金金额
      </th>
      <th class="font-medium py-4 px-4">
       出金金额
      </th>
      <th class="font-medium py-4 px-4">
       开通日期
      </th>
     </tr>
    </thead>
    <tbody class="text-gray-700">
     <tr class="border-b border-gray-50 hover:bg-gray-50 transition-colors">
      <td class="py-4 px-4 text-red-500">
       <button class="text-red-500 hover:underline font-medium" type="button" @click="goAccountDetail('8100457')">
        8100457
       </button>
      </td>
      <td class="py-4 px-4 text-red-500">
       标准账户[交易]
      </td>
      <td class="py-4 px-4 text-red-500">
       real\HATC\Test\Standard
      </td>
      <td class="py-4 px-4">
       1:100
      </td>
      <td class="py-4 px-4 text-red-500">
       标准手
      </td>
      <td class="py-4 px-4 text-red-500">
       1,230.00
       <span class="text-xs text-red-500 ml-1">
        USD/美元
       </span>
      </td>
      <td class="py-4 px-4 text-red-500">
       0.00
       <span class="text-xs text-red-500 ml-1">
        USD/美元
       </span>
      </td>
      <td class="py-4 px-4 text-red-500">
       2,500.00
       <span class="text-xs text-red-500 ml-1">
        USD/美元
       </span>
      </td>
      <td class="py-4 px-4 text-red-500">
       400.00
       <span class="text-xs text-red-500 ml-1">
        USD/美元
       </span>
      </td>
      <td class="py-4 px-4">
       2026-06-08 15:05:15
      </td>
     </tr>
     <tr class="border-b border-gray-50 hover:bg-gray-50 transition-colors">
      <td class="py-4 px-4 text-red-500">
       <button class="text-red-500 hover:underline font-medium" type="button" @click="goAccountDetail('8300255')">
        8300255
       </button>
      </td>
      <td class="py-4 px-4 text-red-500">
       标准账户[佣金]
      </td>
      <td class="py-4 px-4">
       real\HATC\Test\Agent
      </td>
      <td class="py-4 px-4">
       1:100
      </td>
      <td class="py-4 px-4 text-red-500">
       标准手
      </td>
      <td class="py-4 px-4 text-red-500">
       3.0000
       <span class="text-xs text-red-500 ml-1">
        USD/美元
       </span>
      </td>
      <td class="py-4 px-4 text-red-500">
       0.0000
       <span class="text-xs text-red-500 ml-1">
        USD/美元
       </span>
      </td>
      <td class="py-4 px-4 text-red-500">
       0.0000
       <span class="text-xs text-red-500 ml-1">
        USD/美元
       </span>
      </td>
      <td class="py-4 px-4 text-red-500">
       0.0000
       <span class="text-xs text-red-500 ml-1">
        USD/美元
       </span>
      </td>
      <td class="py-4 px-4">
       2026-06-08 15:05:29
      </td>
     </tr>
     <tr class="border-b border-gray-50 hover:bg-gray-50 transition-colors">
      <td class="py-4 px-4 text-red-500">
       <button class="text-red-500 hover:underline font-medium" type="button" @click="goAccountDetail('9900456')">
        9900456
       </button>
      </td>
      <td class="py-4 px-4 text-red-500">
       美分账户[交易]
      </td>
      <td class="py-4 px-4 text-red-500">
       real\HATC\Cent\Real-02
      </td>
      <td class="py-4 px-4 text-red-500">
       1:100
      </td>
      <td class="py-4 px-4 text-red-500">
       美分手
      </td>
      <td class="py-4 px-4 text-red-500">
       756,000.00
       <span class="text-xs text-red-500 ml-1">
        USC/美分
       </span>
      </td>
      <td class="py-4 px-4 text-red-500">
       500.00
       <span class="text-xs text-red-500 ml-1">
        USC/美分
       </span>
      </td>
      <td class="py-4 px-4 text-red-500">
       760,000.00
       <span class="text-xs text-red-500 ml-1">
        USC/美分
       </span>
      </td>
      <td class="py-4 px-4 text-red-500">
       83,000.00
       <span class="text-xs text-red-500 ml-1">
        USC/美分
       </span>
      </td>
      <td class="py-4 px-4 text-red-500">
       2026-06-08 15:05:29
      </td>
     </tr>
    </tbody>
   </table>
  </div>
  <!-- 底部返回按钮 -->
  <div class="p-6 pt-2 flex justify-center border-t border-gray-50">
   <button class="border border-gray-300 text-gray-600 px-6 py-2 rounded text-sm hover:bg-gray-50 transition-colors" type="button" @click="goBack">
    返回
   </button>
  </div>
 </div>
</div>

    </div>
  </div>

  <el-dialog v-model="riskTagDialog.open" :title="riskTagDialog.mode === 'add' ? '添加风险标签' : '补充风险说明'" width="92%" :style="{ maxWidth: '620px' }" destroy-on-close>
    <div class="space-y-4 text-sm">
      <div v-if="riskTagDialog.mode === 'add'"><label class="mb-1 block text-gray-600">标签名称</label><select v-model="riskTagForm.name" class="w-full rounded border border-gray-300 px-3 py-2 outline-none"><option value="" disabled>请选择风险标签</option><option v-for="name in availableRiskTagNames" :key="name" :value="name">{{ name }}</option></select></div>
      <div v-else class="rounded-lg bg-gray-50 px-3 py-2 text-gray-700">当前标签：<span class="font-medium">{{ riskTagDialog.tag?.name }}</span></div>
      <div v-if="riskTagDialog.mode === 'add'"><label class="mb-1 block text-gray-600">风险等级</label><select v-model="riskTagForm.level" class="w-full rounded border border-gray-300 px-3 py-2 outline-none"><option>低风险</option><option>中风险</option><option>高风险</option><option>待处理</option></select></div>
      <div><label class="mb-1 block text-gray-600">风险说明</label><textarea v-model="riskTagForm.description" rows="3" class="w-full rounded border border-gray-300 px-3 py-2 outline-none" placeholder="请输入说明"></textarea></div>
    </div>
    <template #footer><div class="flex justify-end gap-2"><button type="button" class="h-9 rounded-md border border-gray-200 px-4 text-sm text-gray-700 hover:bg-gray-50" @click="riskTagDialog.open = false">取消</button><button type="button" class="h-9 rounded-md bg-primaryBtn px-4 text-sm font-medium text-white hover:bg-primaryBtnHover" @click="saveRiskTag">保存</button></div></template>
  </el-dialog>

  <el-dialog v-model="removeRiskDialog.open" title="解除风险标签" width="92%" :style="{ maxWidth: '520px' }" destroy-on-close>
    <div class="space-y-3 text-sm"><div class="rounded-lg bg-rose-50 px-3 py-2 text-rose-700">将解除标签：{{ removeRiskDialog.tag?.name }}</div><label class="block text-gray-600">解除原因<span class="ml-1 text-rose-500">*</span></label><textarea v-model="removeRiskDialog.reason" rows="3" class="w-full rounded border border-gray-300 px-3 py-2 outline-none" placeholder="请填写解除原因"></textarea></div>
    <template #footer><div class="flex justify-end gap-2"><button type="button" class="h-9 rounded-md border border-gray-200 px-4 text-sm text-gray-700 hover:bg-gray-50" @click="removeRiskDialog.open = false">取消</button><button type="button" class="h-9 rounded-md bg-rose-600 px-4 text-sm font-medium text-white hover:bg-rose-700" @click="confirmRemoveRiskTag">确认解除</button></div></template>
  </el-dialog>

  <el-dialog v-model="relatedAccountDialog.open" title="关联账户详情" width="92%" :style="{ maxWidth: '680px' }" destroy-on-close>
    <div v-if="relatedAccountDialog.account" class="space-y-4 text-sm text-gray-700">
      <div class="grid grid-cols-1 gap-3 sm:grid-cols-2"><div class="rounded-lg bg-gray-50 p-3"><div class="text-xs text-gray-500">关联账户</div><div class="mt-1 font-medium">{{ relatedAccountDialog.account.accountId }} / {{ relatedAccountDialog.account.name }}</div></div><div class="rounded-lg bg-gray-50 p-3"><div class="text-xs text-gray-500">关联原因</div><div class="mt-1 font-medium">{{ relatedAccountDialog.account.reason }}</div></div><div class="rounded-lg bg-gray-50 p-3"><div class="text-xs text-gray-500">风险状态</div><div class="mt-1"><span class="rounded border px-2 py-1 text-xs" :class="riskStatusClass(relatedAccountDialog.account.riskStatus)">{{ relatedAccountDialog.account.riskStatus }}</span></div></div><div class="rounded-lg bg-gray-50 p-3"><div class="text-xs text-gray-500">关联交易（模拟）</div><div class="mt-1 font-medium">{{ relatedAccountDialog.account.tradeInfo }}</div></div></div>
      <div class="rounded-lg border border-blue-100 bg-blue-50 px-3 py-2 text-xs leading-5 text-blue-700">演示说明：关联关系、交易信息和风险状态均为前端模拟数据，不执行真实计算或外部查询。</div>
    </div>
    <template #footer><div class="flex justify-end gap-2"><button type="button" class="h-9 rounded-md border border-rose-200 bg-rose-50 px-4 text-sm font-medium text-rose-700 hover:bg-rose-100" @click="addMultiAccountRisk">添加“疑似多账户”标签</button><button type="button" class="h-9 rounded-md border border-gray-200 px-4 text-sm text-gray-700 hover:bg-gray-50" @click="relatedAccountDialog.open = false">关闭</button></div></template>
  </el-dialog>

  <el-dialog v-model="forceResetDialog.open" title="确认强制修改密码" width="92%" :style="{ maxWidth: '620px' }" destroy-on-close>
    <div class="space-y-3 text-sm text-gray-700 leading-relaxed">
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
        <div class="bg-gray-50 border border-gray-100 rounded-lg p-3">
          <div class="text-gray-500">客户名称</div>
          <div class="mt-1 text-gray-800 font-medium">{{ demoUser?.name || '—' }}</div>
        </div>
        <div class="bg-gray-50 border border-gray-100 rounded-lg p-3">
          <div class="text-gray-500">客户类型</div>
          <div class="mt-1 text-gray-800 font-medium">{{ demoUser?.biz_identity_label || '—' }}</div>
        </div>
        <div class="bg-gray-50 border border-gray-100 rounded-lg p-3">
          <div class="text-gray-500">账号类型</div>
          <div class="mt-1 text-gray-800 font-medium">{{ demoUser?.account_type_label || '—' }}</div>
        </div>
        <div class="bg-gray-50 border border-gray-100 rounded-lg p-3">
          <div class="text-gray-500">当前密码状态</div>
          <div class="mt-1 text-gray-800 font-medium">{{ demoUser?.password_status || '—' }}</div>
        </div>
      </div>
      <div class="flex items-start gap-2">
        <span class="mt-1 w-1.5 h-1.5 rounded-full bg-[#d1a84f] flex-shrink-0"></span>
        <span>确认后该账号下次登录必须修改密码，修改完成前无法访问 CRM。</span>
      </div>
      <div v-if="forceResetUnavailableReason" class="rounded-lg border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
        {{ forceResetUnavailableReason }}
      </div>
    </div>
    <template #footer>
      <div class="flex items-center justify-end gap-2">
        <button type="button" class="h-9 px-4 rounded-md border border-gray-200 bg-white hover:bg-gray-50 text-gray-700 text-sm font-medium" @click="forceResetDialog.open = false">
          取消
        </button>
        <button
          type="button"
          class="h-9 px-4 rounded-md bg-primaryBtn hover:bg-primaryBtnHover text-white text-sm font-medium disabled:opacity-60 disabled:cursor-not-allowed"
          :disabled="Boolean(forceResetUnavailableReason)"
          @click="confirmForceReset"
        >
          确认执行
        </button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { forceSingleAccountReset, getDemoUserById, getForceResetUnavailableReason } from '@/store/passwordSecurityDemo'
import { creditConversionState, getCreditSummary, getLedgerRows } from '@/store/creditConversionDemo'
import { buildAutoRiskTags, riskTagCatalog } from '@/store/risk-tag-demo'

const router = useRouter()
const route = useRoute()

const demoUser = computed(() => {
  const id = String(route.query.id || '').trim()
  const hit = getDemoUserById(id)
  if (hit) {
    return {
      ...hit,
      biz_identity_label: hit.biz_identity === 'agent' ? '代理' : hit.biz_identity === 'direct' ? '直客' : '其他',
      account_type_label: hit.account_type === 'system' ? '系统' : '标准',
    }
  }
  const fallback = getDemoUserById('u_agent_01')
  return fallback
    ? {
        ...fallback,
        biz_identity_label: fallback.biz_identity === 'agent' ? '代理' : fallback.biz_identity === 'direct' ? '直客' : '其他',
        account_type_label: fallback.account_type === 'system' ? '系统' : '标准',
      }
    : null
})

const forceResetUnavailableReason = computed(() => getForceResetUnavailableReason(demoUser.value))
const forceResetDialog = ref({ open: false })

const openForceResetDialog = () => {
  forceResetDialog.value.open = true
}

const confirmForceReset = () => {
  const u = demoUser.value
  if (!u) return
  const res = forceSingleAccountReset(u.user_id, '系统管理员（演示）')
  if (!res.ok) {
    ElMessage.error(res.message || '操作失败')
    return
  }
  forceResetDialog.value.open = false
  ElMessage.success('已设置下次登录强制改密')
}


const goLeadsTrace = () => {
  router.push({ path: '/crm/leads-detail', query: { fromClientId: String(route.query.id || '') } })
}

const goIpAlert = () => {
  router.push({ path: '/risk/ip-alert', query: { clientId: String(route.query.id || '') } })
}

const goAccountDetail = (mtAccount) => {
  router.push({ path: '/crm/account-detail', query: { id: String(mtAccount || '') } })
}

const goBack = () => {
  router.back()
}

const displayOrDash = (v) => {
  const s = String(v ?? '').trim()
  return s ? s : '-'
}

const formatUsd4 = (n) => {
  const v = Number(n || 0)
  return v.toLocaleString('en-US', { minimumFractionDigits: 4, maximumFractionDigits: 4 })
}

const demoCustomerId = computed(() => 'CUST-wangjianguo')

const activityCreditRows = computed(() => {
  const customerId = demoCustomerId.value
  const rows = creditConversionState.customerActivityCredits.filter((r) => r.customerId === customerId)
  return rows.map((r) => getCreditSummary({ customerId: r.customerId, activityId: r.activityId }) || r)
})

const ledgerRows = computed(() => getLedgerRows({ customerId: demoCustomerId.value }))

const identityResidence = computed(() => ({
  certNo: '210102196808159167',
  birthDate: '1999-11-26',
  birthCountry: '',
  registerRegion: '中国',
  residenceCountry: '中国',
  province: '重庆市',
  city: '重庆市',
  addressDetail: '九龙坡区XX路XX号'
}))

const registerInfo = computed(() => ({
  registerAt: '2026-06-08 15:03:53',
  registerIp: '123.145.242.250',
  registerIpLocation: '中国 / 重庆市 / 重庆市 / 九龙坡区',
  loginCount: '1',
  lastLoginAt: '2026-06-08 15:04:05'
}))

const loginRisk = computed(() => ({
  judgedAt: '2026-07-09 15:46:12',
  overallRisk: '中风险',
  crm: { ip: '171.221.10.51', region: '中国 / 四川省 / 成都市', at: '2026-07-09 15:45:52' },
  mt5: { ip: '171.221.54.12', region: '新加坡', mtAccount: '8801732', at: '2026-07-09 15:45:36' },
  stats: { commonRegion30d: '中国 / 四川省 / 成都市', countryCount30d: '2', abnormalCount30d: '1' },
  consistency: {
    registerVsResidence: { status: '一致' },
    registerVsCrm: { status: '一致' },
    registerVsMt5: { status: '不一致' },
    crmVsMt5: { status: '不一致' }
  }
}))

const riskTags = ref(buildAutoRiskTags())

const availableRiskTagNames = computed(() => riskTagCatalog.filter((item) => !riskTags.value.some((tag) => tag.name === item.name)).map((item) => item.name))
const riskTagDialog = ref({ open: false, mode: 'add', tag: null })
const riskTagForm = ref({ name: '', level: '中风险', description: '' })
const removeRiskDialog = ref({ open: false, tag: null, reason: '' })

const relatedAccounts = ref([
  { accountId: '8100457', name: 'test-褚必', relationType: '相同证件', strength: '高关联', lastLoginAt: '2026-10-14 19:26:10', reverseTrade: true, sharedPayee: true, riskStatus: '中风险', reason: '证件号码一致，且共享同一收款银行卡。', tradeInfo: '近 30 天存在 6 笔反向交易（模拟）' },
  { accountId: '8300255', name: 'test-杨均', relationType: '相同代理关系', strength: '中关联', lastLoginAt: '2026-10-14 10:05:31', reverseTrade: false, sharedPayee: false, riskStatus: '待处理', reason: '与当前客户属于同一代理关系。', tradeInfo: '近 30 天交易 12 笔，未发现反向交易（模拟）' },
  { accountId: '9900456', name: '王建国', relationType: '相同 IP', strength: '低关联', lastLoginAt: '2026-10-13 08:42:17', reverseTrade: false, sharedPayee: false, riskStatus: '正常', reason: '近 30 天存在相同登录 IP。', tradeInfo: '最近一次交易为 EURUSD 0.15 手（模拟）' }
  ,{ accountId: '7700188', name: '李雪', relationType: '相同手机号', strength: '高关联', lastLoginAt: '2026-10-12 16:18:24', reverseTrade: false, sharedPayee: false, riskStatus: '正常', reason: '预留手机号一致。', tradeInfo: '近 30 天交易 4 笔（模拟）' }
  ,{ accountId: '6600219', name: '赵子涵', relationType: '相同邮箱', strength: '高关联', lastLoginAt: '2026-10-11 12:04:09', reverseTrade: false, sharedPayee: false, riskStatus: '待处理', reason: '注册邮箱一致。', tradeInfo: '近 30 天无交易（模拟）' }
  ,{ accountId: '5500142', name: '陈大文', relationType: '相同银行卡', strength: '高关联', lastLoginAt: '2026-10-10 09:36:45', reverseTrade: true, sharedPayee: true, riskStatus: '中风险', reason: '收款银行卡后四位一致。', tradeInfo: '存在 2 笔同向资金流（模拟）' }
  ,{ accountId: '4400321', name: '周明', relationType: '相同钱包', strength: '高关联', lastLoginAt: '2026-10-09 18:22:11', reverseTrade: false, sharedPayee: true, riskStatus: '中风险', reason: '数字钱包地址一致。', tradeInfo: '最近一次出金 1,200 USD（模拟）' }
  ,{ accountId: '3300287', name: '孙晨', relationType: '相同设备', strength: '中关联', lastLoginAt: '2026-10-08 20:13:36', reverseTrade: false, sharedPayee: false, riskStatus: '正常', reason: '设备指纹一致。', tradeInfo: '近 30 天交易 8 笔（模拟）' }
  ,{ accountId: '2200165', name: '刘洋', relationType: '相同代理关系', strength: '中关联', lastLoginAt: '2026-10-07 11:48:52', reverseTrade: false, sharedPayee: false, riskStatus: '正常', reason: '归属于同一代理。', tradeInfo: '近 30 天交易 3 笔（模拟）' }
])
const reviewIds = ref([])
const relatedAccountDialog = ref({ open: false, account: null })

const openAddRiskTag = () => {
  riskTagForm.value = { name: availableRiskTagNames.value[0] || '', level: '中风险', description: '' }
  riskTagDialog.value = { open: true, mode: 'add', tag: null }
}

const openEditRiskTag = (tag) => {
  riskTagForm.value = { name: tag.name, level: tag.level, description: tag.description || '' }
  riskTagDialog.value = { open: true, mode: 'edit', tag }
}

const saveRiskTag = () => {
  const form = riskTagForm.value
  if (!form.name) return ElMessage.warning('请选择风险标签')
  if (!String(form.description || '').trim()) return ElMessage.warning('请填写风险说明')
  if (riskTagDialog.value.mode === 'edit') {
    riskTagDialog.value.tag.description = form.description.trim()
    riskTagDialog.value.tag.level = form.level
    ElMessage.success('风险说明已更新')
  } else {
    riskTags.value.push({ id: `risk-${Date.now()}`, name: form.name, level: form.level, source: '人工添加', status: '生效', addedAt: '2026-10-15 10:00', triggeredAt: '2026-10-15 10:00', addedBy: '当前操作人（演示）', relatedObjects: '—', description: form.description.trim() })
    ElMessage.success('风险标签已添加')
  }
  riskTagDialog.value.open = false
}

const openRemoveRiskTag = (tag) => {
  removeRiskDialog.value = { open: true, tag, reason: '' }
}

const confirmRemoveRiskTag = () => {
  const dialog = removeRiskDialog.value
  if (!String(dialog.reason || '').trim()) return ElMessage.warning('请填写解除原因')
  riskTags.value = riskTags.value.filter((tag) => tag.id !== dialog.tag.id)
  removeRiskDialog.value.open = false
  ElMessage.success('风险标签已解除')
}

const openRelatedAccount = (account) => {
  relatedAccountDialog.value = { open: true, account }
}

const markRelationReview = (account) => {
  if (!reviewIds.value.includes(account.accountId)) {
    reviewIds.value.push(account.accountId)
    ElMessage.success(`关联账户 ${account.accountId} 已标记为待风控复核`)
  }
}

const addMultiAccountRisk = () => {
  if (riskTags.value.some((tag) => tag.name === '疑似多账户')) {
    ElMessage.info('当前客户已有“疑似多账户”标签')
    return
  }
  riskTags.value.push({ id: `risk-${Date.now()}`, name: '疑似多账户', level: '高风险', source: '人工添加', status: '生效', addedAt: '2026-10-15 10:00', triggeredAt: '2026-10-15 10:00', addedBy: '当前操作人（演示）', relatedObjects: '关联账户模拟关系', description: '根据关联账户模拟关系添加，待人工复核。' })
  ElMessage.success('已添加“疑似多账户”风险标签')
}

const relationStrengthClass = (strength) => {
  if (strength === '高关联') return 'border-rose-200 bg-rose-50 text-rose-700'
  if (strength === '中关联') return 'border-orange-200 bg-orange-50 text-orange-700'
  return 'border-blue-200 bg-blue-50 text-blue-700'
}

const riskStatusClass = (status) => {
  if (status === '高风险') return 'border-rose-200 bg-rose-50 text-rose-700'
  if (status === '中风险') return 'border-orange-200 bg-orange-50 text-orange-700'
  if (status === '待处理') return 'border-blue-200 bg-blue-50 text-blue-700'
  return 'border-emerald-200 bg-emerald-50 text-emerald-700'
}

const riskLevelTagClass = (level) => {
  if (level === '高风险') return 'border-rose-200 bg-rose-50 text-rose-700'
  if (level === '中风险') return 'border-orange-200 bg-orange-50 text-orange-700'
  return 'border-emerald-200 bg-emerald-50 text-emerald-700'
}

const riskLevelDotClass = (level) => {
  if (level === '高风险') return 'bg-rose-500'
  if (level === '中风险') return 'bg-orange-400'
  return 'bg-emerald-500'
}

const consistencyTagClass = (status) => {
  if (status === '一致') return 'border-emerald-200 bg-emerald-50 text-emerald-700'
  if (status === '不一致') return 'border-amber-200 bg-amber-50 text-amber-700'
  return 'border-rose-200 bg-rose-50 text-rose-700'
}
</script>
