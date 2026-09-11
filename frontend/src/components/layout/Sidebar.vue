<template>
  <aside :class="['bg-menuBg h-full flex flex-col shadow-xl z-20 flex-shrink-0 transition-all duration-300', isCollapse ? 'w-[64px]' : 'w-[240px]']">
    <div class="h-20 flex items-center justify-center border-b border-gray-700/50 overflow-hidden">
      <span v-if="!isCollapse" class="text-4xl font-black tracking-wider text-white whitespace-nowrap">HATC</span>
      <span v-else class="text-2xl font-black text-white">H</span>
    </div>
    <el-menu
      :default-active="$route.path"
      :collapse="isCollapse"
      active-text-color="#d1a84f"
      background-color="#2A2F3E"
      class="el-menu-vertical flex-1 overflow-y-auto no-scrollbar border-r-0"
      text-color="#A1A5B7"
      router
    >

      <el-menu-item index="/home">
        <i class="fa-solid fa-house w-6 text-center text-lg mr-2"></i>
        <template #title>首页</template>
      </el-menu-item>
      <el-sub-menu index="fund">
        <template #title>
          <i class="fa-solid fa-money-bill-transfer w-6 text-center text-lg mr-2"></i>
          <span>出入金</span>
        </template>
        <el-menu-item index="/fund/deposit">入金</el-menu-item>
        <el-menu-item index="/fund/withdraw">出金</el-menu-item>
        <el-menu-item index="/fund/commission-withdraw">返佣提现</el-menu-item>
        <el-menu-item index="/fund/my-bonus">我的赠金</el-menu-item>
        <el-menu-item index="/fund/audit-deposit">待审核入金</el-menu-item>
        <el-menu-item index="/fund/audit-withdraw">待审核出金</el-menu-item>
        <el-menu-item index="/fund/audit-bonus">赠金审核</el-menu-item>
        <el-menu-item index="/fund/audit-bankcard">待审核银行卡</el-menu-item>
        <el-menu-item index="/fund/internal-transfer">内部转账</el-menu-item>
        <el-menu-item index="/fund/audit-transfer">转账审核</el-menu-item>
      </el-sub-menu>
      <el-sub-menu index="reconciliation">
        <template #title>
          <i class="fa-solid fa-file-invoice-dollar w-6 text-center text-lg mr-2"></i>
          <span>财务对账</span>
        </template>
        <el-menu-item index="/reconciliation/daily-record">每日对账日志</el-menu-item>
        <el-menu-item index="/reconciliation/internal">对账异常看板</el-menu-item>
      </el-sub-menu>
      <el-sub-menu index="commission">
        <template #title>
          <i class="fa-solid fa-hand-holding-dollar w-6 text-center text-lg mr-2"></i>
          <span>佣金管理</span>
        </template>
        <el-menu-item index="/commission/basic-template">基础分佣模版</el-menu-item>
        <el-menu-item index="/commission/config">佣金配置</el-menu-item>
        <el-menu-item index="/commission/basic-config">基础分佣配置</el-menu-item>
        <el-menu-item index="/commission/markup-config">加点分佣配置</el-menu-item>
      </el-sub-menu>
      <el-sub-menu index="activity">
        <template #title>
          <i class="fa-solid fa-gift w-6 text-center text-lg mr-2"></i>
          <span>活动管理</span>
        </template>
        <el-menu-item index="/activity/list">活动列表</el-menu-item>
        <el-menu-item index="/activity/growth">成长计划</el-menu-item>
        <el-menu-item index="/activity/ib">IB 计划</el-menu-item>
        <el-menu-item index="/activity/audit">活动审核</el-menu-item>
        <el-menu-item index="/activity/pcard">Pcard活动</el-menu-item>
      </el-sub-menu>
      <el-sub-menu index="news">
        <template #title>
          <i class="fa-solid fa-bullhorn w-6 text-center text-lg mr-2"></i>
          <span>动态公告</span>
        </template>
        <el-menu-item index="/news/group">集团动态</el-menu-item>
        <el-menu-item index="/news/latest">最新公告</el-menu-item>
        <el-menu-item index="/news/push">推送消息</el-menu-item>
      </el-sub-menu>
      <el-sub-menu index="crm">
        <template #title>
          <i class="fa-solid fa-user-group w-6 text-center text-lg mr-2"></i>
          <span>客户管理</span>
        </template>
        <el-menu-item index="/crm/list">客户列表</el-menu-item>
        <el-menu-item index="/crm/account">账户管理</el-menu-item>
        <el-menu-item index="/crm/audit">账户审核</el-menu-item>
        <el-menu-item index="/crm/change-detail">客户变动详情</el-menu-item>
        <el-menu-item index="/crm/group">分组管理</el-menu-item>
        <el-menu-item index="/crm/share">分享链接</el-menu-item>
        <el-menu-item index="/crm/sales">销售列表</el-menu-item>
        <el-menu-item index="/crm/leads">留资列表</el-menu-item>
      </el-sub-menu>
      <el-sub-menu index="report">
        <template #title>
          <i class="fa-solid fa-chart-pie w-6 text-center text-lg mr-2"></i>
          <span>报表中心</span>
        </template>
        <el-menu-item index="/report/commission-stats">佣金统计</el-menu-item>
        <el-menu-item index="/report/trading">交易报表</el-menu-item>
        <el-menu-item index="/report/position">持仓报表</el-menu-item>
        <el-menu-item index="/report/close-trade">平仓交易记录</el-menu-item>
        <el-menu-item index="/report/finance">财务报表</el-menu-item>
        <el-menu-item index="/report/commission-report">佣金报表</el-menu-item>
        <el-menu-item index="/report/position-stats">持仓统计</el-menu-item>
        <el-menu-item index="/report/trade-record">交易记录</el-menu-item>
        <el-menu-item index="/report/sales-trading">销售交易奖励报表</el-menu-item>
        <el-menu-item index="/report/sales-deposit">销售入金奖励统计</el-menu-item>
        <el-menu-item index="/report/activity-join">活动参与报表</el-menu-item>
        <el-menu-item index="/report/equity">盈亏报表</el-menu-item>
      </el-sub-menu>
      <el-sub-menu index="trust">
        <template #title>
          <i class="fa-solid fa-handshake w-6 text-center text-lg mr-2"></i>
          <span>委托交易</span>
        </template>
        <el-menu-item index="/trust/phase1">委托交易一期</el-menu-item>
        <el-menu-item index="/trust/account">委托交易账户管理</el-menu-item>
        <el-menu-item index="/trust/rule-config">查看规则配置</el-menu-item>
      </el-sub-menu>
      <el-sub-menu index="system">
        <template #title>
          <i class="fa-solid fa-gear w-6 text-center text-lg mr-2"></i>
          <span>系统管理</span>
        </template>
        <el-menu-item index="/system/settings">系统设置</el-menu-item>
        <el-menu-item index="/system/mt-settings">MT设置</el-menu-item>
        <el-menu-item index="/system/mass-msg">群发管理</el-menu-item>
        <el-menu-item index="/system/msg">消息管理</el-menu-item>
        <el-menu-item index="/system/logs">日志管理</el-menu-item>
        <el-menu-item index="/system/params">配置参数</el-menu-item>
        <el-menu-item index="/system/currency">支付币种</el-menu-item>
        <el-menu-item index="/system/payment">支付管理</el-menu-item>
        <el-menu-item index="/system/withdraw-settings">提现设置</el-menu-item>
        <el-menu-item index="/system/commission-settings">返佣设置</el-menu-item>
        <el-menu-item index="/system/sms-logs">验证码记录</el-menu-item>
        <el-menu-item index="/system/tags">标签管理</el-menu-item>
      </el-sub-menu>
      <el-menu-item index="/tools">
        <i class="fa-solid fa-wrench w-6 text-center text-lg mr-2"></i>
        <template #title>交易工具</template>
      </el-menu-item>
      <el-sub-menu index="finance-management">
        <template #title>
          <i class="fa-solid fa-wallet w-6 text-center text-lg mr-2"></i>
          <span>财务管理</span>
        </template>
        <el-menu-item index="/finance-management/report-detail">财务报表明细</el-menu-item>
        <el-menu-item index="/finance-management/client-info">客户信息表</el-menu-item>
      </el-sub-menu>
      <el-sub-menu index="risk">
        <template #title>
          <i class="fa-solid fa-shield-halved w-6 text-center text-lg mr-2"></i>
          <span>风控管理</span>
        </template>
        <el-menu-item index="/risk/login-logs">客户登录日志</el-menu-item>
        <el-menu-item index="/risk/ip-alert">登录 IP 一致性比对</el-menu-item>
        <el-menu-item index="/risk/blacklist">黑名单管理</el-menu-item>
        <el-menu-item index="/risk/close-interval">平仓间隔统计</el-menu-item>
      </el-sub-menu>
    </el-menu>
    <!-- 底部收起按钮 -->
    <div class="h-12 border-t border-gray-700/50 flex items-center justify-center cursor-pointer hover:bg-[#373D4E] transition-colors text-gray-400 hover:text-white" @click="toggleCollapse">
      <i :class="['fa-solid transition-transform duration-300', isCollapse ? 'fa-angle-right' : 'fa-angle-left']"></i>
    </div>
  </aside>
</template>

<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const isCollapse = ref(false)

const toggleCollapse = () => {
  isCollapse.value = !isCollapse.value
}
</script>

<style scoped>
.el-menu-vertical { padding-top: 1rem; }
.el-menu-vertical:not(.el-menu--collapse) { width: 240px; }
:deep(.el-menu-item:hover), :deep(.el-sub-menu__title:hover) { background-color: #373D4E !important; color: white !important; }
:deep(.el-menu-item.is-active) { background-color: #373D4E !important; }
</style>
