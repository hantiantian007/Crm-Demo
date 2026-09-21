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
      <!-- 客户标签展示区 -->
      <div class="flex flex-wrap items-center gap-2 mt-3" id="clientTagsContainer">
       <span class="inline-flex items-center bg-amber-50 text-amber-600 border border-amber-200 text-xs px-2 py-0.5 rounded" title="该客户名下有MT账号正在参与联名活动">
        <i class="fa-solid fa-gift mr-1">
        </i>
        先锋联名活动
       </span>
       <span class="inline-flex items-center bg-red-50 text-red-600 border border-red-200 text-xs px-2 py-0.5 rounded">
        高净值客户
        <button class="ml-1 text-red-400 hover:text-red-600">
         <i class="fa-solid fa-times text-[10px]">
         </i>
        </button>
       </span>
       <span class="inline-flex items-center bg-blue-50 text-blue-600 border border-blue-200 text-xs px-2 py-0.5 rounded">
        偏好黄金
        <button class="ml-1 text-blue-400 hover:text-blue-600">
         <i class="fa-solid fa-times text-[10px]">
         </i>
        </button>
       </span>
       <button class="inline-flex items-center bg-gray-50 text-gray-500 border border-dashed border-gray-300 hover:border-blue-400 hover:text-blue-500 text-xs px-2 py-0.5 rounded cursor-pointer transition-colors">
        <i class="fa-solid fa-plus mr-1">
        </i>
        添加标签
       </button>
      </div>
     </div>
    </div>
    <!-- 正常 印章 -->
    <div class="mr-8">
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
</template>

<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const router = useRouter()
const route = useRoute()

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
