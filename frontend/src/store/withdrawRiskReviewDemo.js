// 仅用于前端演示：保留申请归属校验和风险时间线，不触发审核或资金操作。
// 人工核查功能暂缓；不读取、写入或清空已有 demo_withdraw_risk_reviews_v1 本地历史。
const nonempty = value => typeof value === 'string' && !!value.trim()

export function confirmRiskApplication(requestedAccount, current, demo) {
  if (!nonempty(requestedAccount) || !current || !demo ||
      ![current.orderNo, current.mtAccount, current.accountName, current.email].every(nonempty) ||
      requestedAccount.trim() !== current.mtAccount || demo.mtAccount !== current.mtAccount ||
      demo.customerName !== current.accountName || demo.customerEmail !== current.email) return null
  return { applicationId: current.orderNo, mtAccount: current.mtAccount,
    customerName: current.accountName, customerEmail: current.email }
}

export function buildRiskEventTimeline(scope, riskRecords, applicationTime) {
  if (!scope) return []
  // 风险明细是唯一风险事件来源，不为填满时间线增加未发生的事件。
  const events = riskRecords.map(risk => ({ id: risk.id, riskId: risk.id, time: risk.triggeredAt,
    name: risk.name, description: risk.description, level: risk.level,
    hasEvidence: !!(risk.evidence?.rule && risk.evidence?.description && risk.relatedObjects) }))
  if (nonempty(applicationTime)) events.push({ id: `application-${scope.applicationId}`, time: applicationTime,
    name: '本次出金申请提交', description: `申请 ${scope.applicationId}；客户 ${scope.customerName}；MT账号 ${scope.mtAccount}（演示）`,
    level: '', hasEvidence: false })
  // 已有演示事件统一 YYYY-MM-DD HH:mm:ss，可按字符串排序，不改写为客户端时间。
  return events.sort((a, b) => String(a.time || '').localeCompare(String(b.time || '')) || a.id.localeCompare(b.id))
}
