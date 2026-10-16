export const riskTagCatalog = [
  { name: '高风险客户', level: '高风险' },
  { name: '疑似多账户', level: '高风险' },
  { name: '疑似对冲', level: '高风险' },
  { name: '疑似刷量', level: '高风险' },
  { name: '短期大额出金', level: '中风险' },
  { name: '收款信息近期变更', level: '中风险' },
  { name: '安全信息近期变更', level: '中风险' },
  { name: '待补充资料', level: '待处理' },
  { name: '人工重点关注', level: '待处理' }
]

export const riskRuleConfig = Object.freeze({
  suspectedMultiAccount: { walletOrBankAccountsMin: 2, deviceFingerprintsMin: 2, ipAccountsMin: 3, ipWindowDays: 7 },
  suspectedHedging: { orderWindowHours: 24, maxOpenTimeDiffMinutes: 5, maxLotDiffPercent: 10, maxCloseTimeDiffMinutes: 10, matchedGroupsMin: 2 },
  suspectedVolumeBoosting: { closedOrders24hMin: 50, effectiveLots24hMin: 100, orders1hMin: 20, averageHoldingSecondsMax: 60 },
  recentSecurityChange: { walletOrBankWithdrawalHours: 48, contactOrPasswordWithdrawalHours: 24 },
  shortTermLargeWithdrawal: { depositToWithdrawalHours: 24, withdrawalAmountUsdMin: 5000, withdrawalDepositRatioMin: 0.5 }
})

export const riskSimulation = Object.freeze({
  walletOrBankLinkedAccounts: 3,
  deviceFingerprintLinkedAccounts: 2,
  sameIpLinkedAccounts7d: 3,
  hedgeMatchedGroups24h: 2,
  closedOrders24h: 68,
  effectiveLots24h: 124,
  orders1h: 23,
  averageHoldingSeconds: 48,
  securityChangeType: '银行卡',
  securityChangedAt: '2026-10-13 08:00',
  securityWithdrawalAt: '2026-10-14 16:30',
  depositAt: '2026-10-14 09:10',
  withdrawalAt: '2026-10-14 16:30',
  withdrawalAmountUsd: 6500,
  depositAmount24hUsd: 9000
})

export const buildAutoRiskTags = () => [
  {
    id: 'risk-auto-multi-account', name: '疑似多账户', level: '高风险', source: '系统自动', status: '生效',
    addedAt: '2026-10-15 10:00', triggeredAt: '2026-10-15 09:42', addedBy: '系统自动打标',
    relatedObjects: '账户 8100457、5500142、4400321；钱包 wallet-demo-01；银行卡尾号 5566',
    description: `触发依据：相同钱包或银行卡关联 ${riskSimulation.walletOrBankLinkedAccounts} 个账户（阈值 ≥${riskRuleConfig.suspectedMultiAccount.walletOrBankAccountsMin}）；相同设备指纹关联 ${riskSimulation.deviceFingerprintLinkedAccounts} 个账户（阈值 ≥${riskRuleConfig.suspectedMultiAccount.deviceFingerprintsMin}）；近 ${riskRuleConfig.suspectedMultiAccount.ipWindowDays} 天相同 IP 登录 ${riskSimulation.sameIpLinkedAccounts7d} 个账户（阈值 ≥${riskRuleConfig.suspectedMultiAccount.ipAccountsMin}）。`
  },
  {
    id: 'risk-auto-hedging', name: '疑似对冲', level: '高风险', source: '系统自动', status: '生效',
    addedAt: '2026-10-15 10:00', triggeredAt: '2026-10-15 09:35', addedBy: '系统自动打标',
    relatedObjects: '账户 8100457 / 5500142；订单 ORD-H-1021、ORD-H-1022、ORD-H-1023、ORD-H-1024',
    description: `触发依据：同一品种且方向相反，开仓时间差 ≤${riskRuleConfig.suspectedHedging.maxOpenTimeDiffMinutes} 分钟，手数差 ≤${riskRuleConfig.suspectedHedging.maxLotDiffPercent}%，平仓时间差 ≤${riskRuleConfig.suspectedHedging.maxCloseTimeDiffMinutes} 分钟；${riskRuleConfig.suspectedHedging.orderWindowHours} 小时内匹配 ${riskSimulation.hedgeMatchedGroups24h} 组订单（阈值 ≥${riskRuleConfig.suspectedHedging.matchedGroupsMin} 组）。`
  },
  {
    id: 'risk-auto-volume-boosting', name: '疑似刷量', level: '高风险', source: '系统自动', status: '生效',
    addedAt: '2026-10-15 10:00', triggeredAt: '2026-10-15 09:20', addedBy: '系统自动打标',
    relatedObjects: '订单 ORD-V-2001 至 ORD-V-2068；账户 8100457',
    description: `触发依据：24 小时内平仓订单 ${riskSimulation.closedOrders24h} 笔（阈值 ≥${riskRuleConfig.suspectedVolumeBoosting.closedOrders24hMin} 笔）；有效平仓 ${riskSimulation.effectiveLots24h} 手（阈值 ≥${riskRuleConfig.suspectedVolumeBoosting.effectiveLots24hMin} 手）；1 小时内订单 ${riskSimulation.orders1h} 笔且平均持仓 ${riskSimulation.averageHoldingSeconds} 秒（阈值 ≥${riskRuleConfig.suspectedVolumeBoosting.orders1hMin} 笔且 ≤${riskRuleConfig.suspectedVolumeBoosting.averageHoldingSecondsMax} 秒）。`
  },
  {
    id: 'risk-auto-security-change', name: '安全信息近期变更', level: '中风险', source: '系统自动', status: '生效',
    addedAt: '2026-10-15 10:00', triggeredAt: '2026-10-14 16:30', addedBy: '系统自动打标',
    relatedObjects: '账户 8100457；变更记录 SEC-20261013-01；出金申请 WD-20261014-01',
    description: `触发依据：${riskSimulation.securityChangeType}于 ${riskSimulation.securityChangedAt} 修改，${riskSimulation.securityWithdrawalAt} 申请出金，间隔 32.5 小时（阈值：钱包/银行卡变更后 ${riskRuleConfig.recentSecurityChange.walletOrBankWithdrawalHours} 小时内）。`
  },
  {
    id: 'risk-auto-large-withdrawal', name: '短期大额出金', level: '中风险', source: '系统自动', status: '生效',
    addedAt: '2026-10-15 10:00', triggeredAt: '2026-10-14 16:30', addedBy: '系统自动打标',
    relatedObjects: '账户 8100457；入金 DEP-20261014-01；出金 WD-20261014-01',
    description: `触发依据：${riskSimulation.depositAt} 入金后于 ${riskSimulation.withdrawalAt} 申请出金，间隔 7.3 小时（阈值 ≤${riskRuleConfig.shortTermLargeWithdrawal.depositToWithdrawalHours} 小时）；出金 ${riskSimulation.withdrawalAmountUsd.toLocaleString()} USD ≥ ${riskRuleConfig.shortTermLargeWithdrawal.withdrawalAmountUsdMin.toLocaleString()} USD，且占近 24 小时入金 ${riskSimulation.depositAmount24hUsd.toLocaleString()} USD 的 ${(riskSimulation.withdrawalAmountUsd / riskSimulation.depositAmount24hUsd * 100).toFixed(1)}%（阈值 ≥${riskRuleConfig.shortTermLargeWithdrawal.withdrawalDepositRatioMin * 100}%）。`
  }
]
