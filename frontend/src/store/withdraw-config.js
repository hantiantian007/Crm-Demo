import { ref } from 'vue'

export const withdrawChannels = ref([
  {
    id: 6,
    shortName: 'Ugate',
    payNo: 'uGate',
    name: 'UGate',
    merchantNo: '368809',
    appId: '-',
    currency: 'CNY(￥)',
    hint: '',
    rate: '6.65',
    rateSource: 'page',
    status: 'enabled'
  },
  {
    id: 7,
    shortName: 'PPay',
    payNo: 'pcardPay',
    name: 'Planet card',
    merchantNo: 'HATC',
    appId: '-',
    currency: 'HKD(HK$)',
    hint: '',
    rate: '7.657',
    rateSource: 'page',
    status: 'enabled'
  },
  {
    id: 9,
    shortName: 'passto',
    payNo: 'passttopay',
    name: 'passttopay',
    merchantNo: 'M1774254744',
    appId: '69c0fa98c79816b6e64518b4',
    currency: 'CNY(￥)',
    hint: '',
    rate: '6.66',
    rateSource: 'page',
    status: 'enabled'
  },
  {
    id: 4,
    shortName: 'MAXP',
    payNo: 'usdt-maxpay',
    name: 'maxpay-usdt',
    merchantNo: '11002',
    appId: '0197f39b-602c-735f-8a29-55d7e4322655',
    currency: 'USDT($)',
    hint: '',
    rate: '1',
    rateSource: 'page',
    status: 'enabled'
  },
  {
    id: 5,
    shortName: 'Pcard',
    payNo: 'passtocredit',
    name: '资产抵押',
    merchantNo: '32',
    appId: '85977be3681d8ce90696b9b068d219b4',
    currency: 'HKD(HK$)',
    hint: '您的出金将赎回USDT为抵押，获取相应额度注入您的卡内',
    rate: '7.659',
    rateSource: 'page',
    status: 'enabled'
  }
])

export const withdrawConfigLogs = ref([
  {
    id: 'wl1',
    time: '2026-09-15 09:05:12',
    user: 'Olivia',
    channel: 'passto',
    payNo: 'passttopay',
    opType: '修改配置',
    changes: [
      { key: 'rate', label: '汇率', before: '6.67', after: '6.66' },
      { key: 'rateSource', label: '汇率来源', before: '页面配置', after: '页面配置' }
    ],
    remark: '演示数据'
  }
])

export const withdrawDailyRates = ref([
  {
    id: 'wr1',
    bizTime: '2026-09-15 09:05:12',
    bizType: '出金',
    channel: 'Ugate',
    shortName: 'Ugate',
    rateSource: 'api',
    apiRate: '6.821357',
    usedRate: '6.820000',
    fetchTime: '2026-09-15 09:05:12'
  },
  {
    id: 'wr3',
    bizTime: '2026-09-15 10:21:44',
    bizType: '出金',
    channel: 'Pcard',
    shortName: 'Pcard',
    rateSource: 'page',
    usedRate: '7.659000',
    effectiveTime: '2026-09-15 00:00:00'
  }
])

export const nowText = () => {
  const d = new Date()
  const pad2 = (n) => String(n).padStart(2, '0')
  return `${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())} ${pad2(d.getHours())}:${pad2(d.getMinutes())}:${pad2(d.getSeconds())}`
}

export const pushWithdrawLog = (payload) => {
  withdrawConfigLogs.value = [{ id: `wl${Date.now()}`, ...payload }, ...withdrawConfigLogs.value]
}
