// 固定前端演示数据：不是 MT5 查询结果，不执行佣金计算、换汇或自动流水匹配。
// 全部金额以已统一为 USD 的 1/10000 单位保存；USC 只标记交易账户类型，不混加原始币种。
const seeds = [
  {
    "id": "CL-50892",
    "accountType": "标准账户",
    "customer": "李强",
    "account": "10028571",
    "lots": "0.50 标准手",
    "expectedPeople": 2,
    "crmPeople": 3,
    "expectedAmount": "14.00"
  },
  {
    "id": "CL-50881",
    "accountType": "美分账户",
    "customer": "张敏",
    "account": "USC20234",
    "lots": "2.50 美分手",
    "expectedPeople": 1,
    "crmPeople": 1,
    "expectedAmount": "0.0035"
  },
  {
    "id": "CL-50878",
    "accountType": "美分账户",
    "customer": "孙佳",
    "account": "USC21088",
    "lots": "12.50 美分手",
    "expectedPeople": 2,
    "crmPeople": 2,
    "expectedAmount": "0.0280"
  },
  {
    "id": "CL-50870",
    "accountType": "标准账户",
    "customer": "王磊",
    "account": "10029310",
    "lots": "0.20 标准手",
    "expectedPeople": 3,
    "crmPeople": 3,
    "expectedAmount": "2.40"
  },
  {
    "id": "CL-50855",
    "accountType": "标准账户",
    "customer": "陈宇",
    "account": "10024718",
    "lots": "1.00 标准手",
    "expectedPeople": 3,
    "crmPeople": 2,
    "expectedAmount": "15.00"
  },
  {
    "id": "CL-50847",
    "accountType": "标准账户",
    "customer": "何思雨",
    "account": "10023391",
    "lots": "0.30 标准手",
    "expectedPeople": 2,
    "crmPeople": 2,
    "expectedAmount": "1.80"
  },
  {
    "id": "CL-50812",
    "accountType": "标准账户",
    "customer": "郑凯",
    "account": "10030578",
    "lots": "0.70 标准手",
    "expectedPeople": 3,
    "crmPeople": 5,
    "expectedAmount": "10.50"
  },
  {
    "id": "CL-50808",
    "accountType": "标准账户",
    "customer": "冯杰",
    "account": "10028910",
    "lots": "0.10 标准手",
    "expectedPeople": 2,
    "crmPeople": 2,
    "expectedAmount": "3.00"
  },
  {
    "id": "CL-50804",
    "accountType": "标准账户",
    "customer": "褚敏",
    "account": "10022884",
    "lots": "1.50 标准手",
    "expectedPeople": 4,
    "crmPeople": 3,
    "expectedAmount": "60.00"
  },
  {
    "id": "CL-50796",
    "accountType": "标准账户",
    "customer": "蒋晨",
    "account": "10025040",
    "lots": "0.60 标准手",
    "expectedPeople": 3,
    "crmPeople": 7,
    "expectedAmount": "7.20"
  },
  {
    "id": "CL-50891",
    "accountType": "标准账户",
    "customer": "赵磊",
    "account": "10027483",
    "lots": "1.00 标准手",
    "expectedPeople": 3,
    "crmPeople": 3,
    "expectedAmount": "24.00"
  },
  {
    "id": "CL-50885",
    "accountType": "美分账户",
    "customer": "林小",
    "account": "USC21530",
    "lots": "5.00 美分手",
    "expectedPeople": 2,
    "crmPeople": 2,
    "expectedAmount": "0.0070"
  },
  {
    "id": "CL-50890",
    "accountType": "标准账户",
    "customer": "吴丹",
    "account": "10031205",
    "lots": "0.10 标准手",
    "expectedPeople": 2,
    "crmPeople": 2,
    "expectedAmount": "0.80"
  },
  {
    "id": "CL-50840",
    "accountType": "标准账户",
    "customer": "刘洋",
    "account": "10026187",
    "lots": "0.80 标准手",
    "expectedPeople": 2,
    "crmPeople": 2,
    "expectedAmount": "14.40"
  },
  {
    "id": "CL-50836",
    "accountType": "标准账户",
    "customer": "张伟",
    "account": "10019088",
    "lots": "2.50 标准手",
    "expectedPeople": 3,
    "crmPeople": 3,
    "expectedAmount": "75.00"
  },
  {
    "id": "CL-50831",
    "accountType": "标准账户",
    "customer": "黄涛",
    "account": "10030122",
    "lots": "1.20 标准手",
    "expectedPeople": 4,
    "crmPeople": 4,
    "expectedAmount": "43.20"
  },
  {
    "id": "CL-50828",
    "accountType": "标准账户",
    "customer": "吴佳",
    "account": "10027136",
    "lots": "0.60 标准手",
    "expectedPeople": 3,
    "crmPeople": 3,
    "expectedAmount": "14.40"
  },
  {
    "id": "CL-50825",
    "accountType": "美分账户",
    "customer": "周明",
    "account": "USC20881",
    "lots": "8.00 美分手",
    "expectedPeople": 2,
    "crmPeople": 2,
    "expectedAmount": "0.0112"
  },
  {
    "id": "CL-50819",
    "accountType": "美分账户",
    "customer": "徐磊",
    "account": "USC21977",
    "lots": "20.00 美分手",
    "expectedPeople": 3,
    "crmPeople": 3,
    "expectedAmount": "0.0280"
  },
  {
    "id": "CL-50816",
    "accountType": "标准账户",
    "customer": "孙浩",
    "account": "10024558",
    "lots": "0.40 标准手",
    "expectedPeople": 2,
    "crmPeople": 2,
    "expectedAmount": "9.60"
  },
  {
    "id": "CL-50798",
    "accountType": "标准账户",
    "customer": "董雪",
    "account": "10021166",
    "lots": "3.00 标准手",
    "expectedPeople": 3,
    "crmPeople": 3,
    "expectedAmount": "108.00"
  }
]

const units = value => Math.round(Number(value) * 10000)
const sum = values => values.reduce((total, value) => total + value, 0)
const split = (amount, count) => Array.from({ length: count }, (_, index) => Math.floor(amount / count) + (index < amount % count ? 1 : 0))

// 与 commission-audit-log.vue 的七个固定批次对应；其他日期无数据，不套用当日批次。
const batches = [
  ['2026-08-11', 328, 186, 28, 42876.30, 42938.90, 42920.90, [58.2, 1.4, 2.2, .3, -5, .5, 5]],
  ['2026-08-10', 391, 210, 32, 51228.80, 51370.40, 51390.40, [100, 40, 1.6]],
  ['2026-08-09', 418, 230, 35, 58394.10, 58394.10, 58394.10, []],
  ['2026-08-08', 264, 160, 24, 34620, 34620, 34620, []],
  ['2026-08-07', 302, 175, 26, 40088.25, 40088.25, 40080.25, []],
  ['2026-08-06', 346, 195, 30, 46133.50, 46133.50, 46133.50, []],
  ['2026-08-05', 312, 180, 27, 41285.80, 41285.80, 41285.80, []]
]

// null 表示来源数据未取得；空数组表示已核对但没有入账，二者不能混同。
export const recipientMtAmount = recipient => !Array.isArray(recipient.credits) || recipient.credits.some(credit => !Number.isSafeInteger(credit.amount)) ? null : sum(recipient.credits.map(credit => credit.amount))
export const recipientMtResult = recipient => {
  if (recipientMtAmount(recipient) === null || recipient.needsReview) return '待核实'
  if (recipient.expected && !recipient.credits.length) return '漏入账'
  // 显式预置的重复记录标识，按收款账号及佣金记录确认，绝不根据注释推断。
  if (recipient.duplicateConfirmed) return '重复入账'
  const difference = recipientMtAmount(recipient) - recipient.crmAmount
  return difference < 0 ? '少入账' : difference > 0 ? '多入账' : '正常'
}

export function summarizeRow(row) {
  const crmAmount = sum(row.recipients.map(recipient => recipient.crmAmount))
  const mtAmounts = row.recipients.map(recipientMtAmount)
  const mtAmount = !row.recipients.length || mtAmounts.includes(null) ? null : sum(mtAmounts)
  const expectedPeople = row.recipients.filter(recipient => recipient.expected).length
  const crmPeople = row.recipients.filter(recipient => recipient.crmRecorded).length
  const mtPeople = !row.recipients.length || row.recipients.some(recipient => !Array.isArray(recipient.credits)) ? null : row.recipients.filter(recipient => recipient.credits?.length).length
  const results = row.recipients.map(recipientMtResult)
  const mtStatus = !row.recipients.length ? null : ['待核实', '重复入账', '漏入账', '少入账', '多入账'].find(status => results.includes(status)) || '正常'
  return {
    ...row, expectedPeople, crmPeople, mtPeople, crmAmount, mtAmount, mtStatus,
    crmStatus: crmAmount !== row.expectedAmount || expectedPeople !== crmPeople ? '异常' : '正常',
    mtOrderMatched: expectedPeople > 0 && row.recipients.filter(recipient => recipient.expected).every(recipient => recipient.credits?.some(credit => credit.matched)),
    crmDifference: crmAmount - row.expectedAmount,
    mtDifference: mtAmount === null ? null : mtAmount - crmAmount
  }
}

function createBatch([date, total, eligible, centCount, expectedTotal, crmTotal, mtTotal, differences]) {
  const fixedAmounts = seeds.map(seed => units(seed.expectedAmount))
  const remainingAmounts = split(units(expectedTotal) - sum(fixedAmounts), eligible - seeds.length)
  const seedCentCount = seeds.filter(seed => seed.accountType === '美分账户').length
  const rows = Array.from({ length: total }, (_, index) => {
    const seed = seeds[index]
    const hasCommission = index < eligible
    const isCent = seed ? seed.accountType === '美分账户' : hasCommission && index >= eligible - (centCount - seedCentCount)
    const id = date === '2026-08-11' && seed ? seed.id : `CL-${date.replaceAll('-', '')}-${String(index + 1).padStart(4, '0')}`
    const expectedAmount = hasCommission ? (fixedAmounts[index] ?? remainingAmounts[index - seeds.length]) : 0
    const expectedPeople = hasCommission ? seed?.expectedPeople || 2 : 0
    const crmPeople = index < differences.length && date === '2026-08-11' ? seed.crmPeople : expectedPeople
    const crmAmount = expectedAmount + units(differences[index] || 0)
    const allocation = split(crmAmount, crmPeople)
    // 专门预置一条缺少 18 USD 代理入账的订单，所有金额均为固定分配，不是返佣规则重算。
    if (date === '2026-08-11' && index === 21) {
      allocation[0] = units(18)
      allocation[1] = crmAmount - allocation[0]
    }
    const account = seed?.account.replace(/^USC/, '') || String(8100000 + index)
    // 页面平仓单号是 CRM 展示编号；MT Deal 使用独立字符串，不由平仓单号猜测。
    const closeDeal = `900719925${date.replaceAll('-', '')}${String(index + 1).padStart(4, '0')}`
    const recipients = Array.from({ length: Math.max(expectedPeople, crmPeople) }, (_, agentIndex) => {
      const commissionAccount = String(9000100 + agentIndex)
      const commissionRecord = `${id}-C${agentIndex + 1}`
      // 这里构造固定合成流水，不是对未知 MT 金额使用 CRM 值兜底。
      const amount = allocation[agentIndex] || 0
      return {
        agent: ['华安', 'LBLY', 'Inland', '王经理', '李经理'][agentIndex], commissionAccount, commissionRecord,
        expected: agentIndex < expectedPeople, crmRecorded: agentIndex < crmPeople,
        crmAmount: amount, needsReview: false, duplicateConfirmed: false,
        credits: amount ? [{ id: `MT-${commissionRecord}-1`, amount, matched: true,
          comment: `CM${account}${closeDeal}`, time: `${date} 05:10:${String(agentIndex + index % 50).padStart(2, '0')}` }] : []
      }
    })
    return { id, date, account, closeDeal, customer: seed?.customer || ['陈明', '周宁', '林佳', '王洋', '赵敏'][index % 5],
      accountType: isCent ? '美分账户' : '标准账户', lots: seed?.lots || `${(1 + index % 8).toFixed(2)} ${isCent ? '美分手' : '标准手'}`,
      expectedAmount, recipients }
  })
  if (date === '2026-08-11') {
    // CRM 少记的代理在 MT 已入账；MT 订单覆盖率与 CRM 人数差异独立。
    const missingCrm = rows[4].recipients[2]
    missingCrm.credits = [{ id: `MT-${missingCrm.commissionRecord}-1`, amount: units(5), matched: true,
      comment: `CM${rows[4].account}${rows[4].closeDeal}`, time: `${date} 05:12:00` }]
    rows[21].recipients[0].credits = [] // 漏入账 -18
    rows[8].recipients[0].credits[0].amount -= units(7) // 少入账 -7
    rows[9].recipients[0].credits[0].amount += units(1) // 多入账 +1
    const duplicate = rows[10].recipients[0]
    duplicate.credits.push({ ...duplicate.credits[0], id: `MT-${duplicate.commissionRecord}-2`, amount: units(1) })
    duplicate.duplicateConfirmed = true // 同一收款账号、同一佣金记录的第二笔已确认重复流水 +1
    rows[11].recipients[0].needsReview = true
    rows[11].recipients[0].reviewReason = '金额及收款代理已匹配，入账时间缺失，待核实来源记录。'
    rows[11].recipients[0].credits[0].time = null
  } else {
    rows[21].recipients[0].credits[0].amount += units(mtTotal) - units(crmTotal)
  }
  return { date, rows: rows.map(summarizeRow) }
}

export const commissionAuditBatches = Object.fromEntries(batches.map(spec => [spec[0], createBatch(spec)]))
export function summarizeBatch(rows) {
  const expectedRows = rows.filter(row => row.expectedPeople > 0)
  const mtAmounts = rows.filter(row => row.recipients.length).map(row => row.mtAmount)
  return {
    total: rows.length, expectedCount: expectedRows.length,
    crmCount: rows.filter(row => row.crmPeople > 0).length,
    mtCount: rows.filter(row => row.mtOrderMatched).length,
    standardCount: expectedRows.filter(row => row.accountType === '标准账户').length,
    centCount: expectedRows.filter(row => row.accountType === '美分账户').length,
    abnormalCount: rows.filter(row => row.crmStatus === '异常').length,
    expectedAmount: sum(rows.map(row => row.expectedAmount)),
    crmAmount: sum(rows.map(row => row.crmAmount)),
    mtAmount: mtAmounts.includes(null) ? null : sum(mtAmounts)
  }
}
