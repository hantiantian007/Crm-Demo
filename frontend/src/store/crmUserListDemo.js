import { reactive } from 'vue'

// 独立的 CRM 用户账号演示数据，不与风控通知的管理人员名单混用。
const storageKey = 'crm-user-login-notification-v1'
const seeds = [
  ['crm-john', 'John', 'john.chen@example.com', '直接客户', 3, '正常', true, true, 'ou_demo_john', '2026-10-16 18:30:25', '121.202.252.120', '中国/香港', '手机端', 'iOS 18'],
  ['crm-chen', '陈洪涛', 'chen.hongtao@example.com', '代理', 8, '正常', true, true, 'ou_demo_chen', '2026-10-16 18:12:06', '14.155.120.39', '中国/广东省/深圳市/南山区', 'PC端', 'Windows 11 / Chrome'],
  ['crm-yang', '杨永哲', 'yang.yongzhe@example.com', '直接客户', 2, '正常', false, false, '', '2026-10-16 17:58:42', '121.202.252.121', '中国/香港', '手机端', 'iOS 18'],
  ['crm-he', '和彦军', 'he.yanjun@example.com', '代理', 5, '正常', true, false, 'ou_demo_he', '2026-10-16 17:45:10', '120.14.145.53', '中国/河北省/邢台市', '手机端', 'Android 14 / Huawei'],
  ['crm-wei', '魏正璞', 'wei.zhengpu@example.com', '代理', 4, '禁用', false, false, '', '2026-10-15 16:17:46', '182.143.191.38', '中国/四川省/成都市', '手机端', 'Android 13'],
  ['crm-zhou', '周树人', 'zhou.shuren@example.com', '直接客户', 1, '正常', true, true, 'ou_demo_zhou', '2026-10-16 16:02:15', '212.107.29.198', '中国/香港', 'PC端', 'macOS 15 / Safari'],
  ['crm-alexl', 'AlexL', 'alex.liu@example.com', '直接客户', 2, '正常', false, false, '', '2026-10-16 16:01:34', '65.181.88.29', '新加坡', 'PC端', 'Windows 10 / Edge'],
  ['crm-liu', '刘元庆', 'liu.yuanqing@example.com', '代理', 6, '正常', true, true, 'ou_demo_liu', '2026-10-16 15:56:22', '1.193.58.62', '中国/河南省/郑州市', 'PC端', 'macOS 14 / Chrome'],
  ['crm-guo', '郭计波', 'guo.jibo@example.com', '直接客户', 2, '正常', false, false, '', '2026-10-16 15:42:40', '14.127.44.171', '中国/广东省/深圳市/罗湖区', '手机端', 'Android 14'],
  ['crm-li', '李品', 'li.pin@example.com', '代理', 7, '正常', true, false, 'ou_demo_li', '2026-10-16 15:30:52', '106.80.34.244', '中国/重庆市', '手机端', 'Android 15'],
  ['crm-zhao', '赵亚飞', 'zhao.yafei@example.com', '直接客户', 1, '禁用', true, false, '', '2026-10-14 15:12:46', '124.88.0.102', '中国/新疆/昌吉州', 'PC端', 'Windows 11 / Chrome'],
  ['crm-emily', 'Emily Wong', 'emily.wong@example.com', '直接客户', 3, '正常', true, true, 'ou_demo_emily', '2026-10-16 14:50:09', '203.0.113.12', '中国/香港', '手机端', 'iOS 18'],
  ['crm-wang', '王磊', 'wang.lei@example.com', '代理', 9, '正常', true, false, '', '2026-10-16 14:38:17', '198.51.100.28', '中国/上海市/浦东新区', 'PC端', 'Windows 11 / Edge'],
  ['crm-sarah', 'Sarah Lin', 'sarah.lin@example.com', '直接客户', 2, '正常', false, true, 'ou_demo_sarah', '2026-10-16 13:26:45', '203.0.113.38', '中国/台湾/台北市', '手机端', 'iOS 17'],
  ['crm-zhang', '张敏', 'zhang.min@example.com', '代理', 4, '禁用', false, false, '', '2026-10-13 12:42:08', '198.51.100.56', '中国/北京市/朝阳区', 'PC端', 'Windows 10 / Chrome'],
  ['crm-kevin', 'Kevin Xu', 'kevin.xu@example.com', '直接客户', 1, '正常', true, false, 'ou_demo_kevin', '2026-10-16 12:18:33', '203.0.113.60', '澳大利亚/悉尼', 'PC端', 'macOS 15 / Safari'],
  ['crm-lin', '林晓', 'lin.xiao@example.com', '其他', 0, '正常', false, false, '', '2026-10-16 11:32:20', '198.51.100.70', '中国/福建省/厦门市', '手机端', 'Android 14'],
  ['crm-michael', 'Michael Zhou', 'michael.zhou@example.com', '代理', 5, '正常', true, true, 'ou_demo_michael', '2026-10-16 10:45:16', '203.0.113.85', '英国/伦敦', 'PC端', 'Windows 11 / Chrome']
]

function readSettings() {
  try {
    const saved = JSON.parse(localStorage.getItem(storageKey) || '{}')
    return saved && typeof saved === 'object' && !Array.isArray(saved) ? saved : {}
  } catch {
    return {}
  }
}

const saved = readSettings()
export const crmUsers = reactive(seeds.map(([id, name, email, type, mtAccountCount, loginStatus, twoFactorEnabled, loginNotificationEnabled, larkUserId, lastLoginAt, lastLoginIp, loginLocation, loginDevice, systemInfo]) => ({
  id, name, email, type, mtAccountCount, loginStatus, twoFactorEnabled, lastLoginAt, lastLoginIp, loginLocation, loginDevice, systemInfo,
  larkUserId: typeof saved[id]?.larkUserId === 'string' ? saved[id].larkUserId.trim() : larkUserId,
  // 兼容旧版仅保存开关布尔值的本地配置。
  loginNotificationEnabled: typeof saved[id] === 'boolean' ? saved[id]
    : typeof saved[id]?.enabled === 'boolean' ? saved[id].enabled : loginNotificationEnabled
})))

export const crmUserTypes = [...new Set(crmUsers.map((user) => user.type))]
export const emptyUserFilters = () => ({ name: '', email: '', type: '', notification: '', status: '' })

export function filterCrmUsers(users, filters) {
  const name = filters.name.trim().toLowerCase()
  const email = filters.email.trim().toLowerCase()
  return users.filter((user) =>
    user.name.toLowerCase().includes(name) && user.email.toLowerCase().includes(email) &&
    (!filters.type || user.type === filters.type) &&
    (!filters.notification || String(user.loginNotificationEnabled) === filters.notification) &&
    (!filters.status || user.loginStatus === filters.status)
  )
}

export function saveUserLoginNotification(id, enabled, larkUserId) {
  const user = crmUsers.find((item) => item.id === id)
  if (!user || typeof enabled !== 'boolean' || (larkUserId !== undefined && typeof larkUserId !== 'string')) return { ok: false, error: '用户或配置无效，请重新选择' }
  user.loginNotificationEnabled = enabled
  if (larkUserId !== undefined) user.larkUserId = larkUserId.trim()
  try {
    localStorage.setItem(storageKey, JSON.stringify(Object.fromEntries(crmUsers.map((item) => [item.id, {
      enabled: item.loginNotificationEnabled,
      larkUserId: item.larkUserId
    }]))))
    return { ok: true, persisted: true }
  } catch {
    return { ok: true, persisted: false }
  }
}
