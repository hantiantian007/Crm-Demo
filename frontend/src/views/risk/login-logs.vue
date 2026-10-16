<template>
  <div class="login-logs-page flex h-full bg-mainBg overflow-hidden">
    <main class="login-logs-content flex-1 min-w-0 bg-gray-50 p-4 overflow-y-auto custom-scrollbar">
      <section class="login-logs-panel search-panel">
        <h1 class="panel-title">搜索</h1>
        <form class="login-filter-grid" @submit.prevent="search">
          <div class="login-filter-item">
            <label for="login-name">客户名称：</label>
            <input id="login-name" v-model="filters.name" class="login-control" placeholder="请输入客户名称" type="text" />
          </div>
          <div class="login-filter-item">
            <label for="login-email">客户邮箱：</label>
            <input id="login-email" v-model="filters.email" class="login-control" placeholder="请输入客户邮箱" type="text" />
          </div>
          <div class="login-filter-item">
            <label for="login-superior-email">上级邮箱：</label>
            <input id="login-superior-email" v-model="filters.superiorEmail" class="login-control" placeholder="请输入上级邮箱" type="text" />
          </div>
          <div class="login-filter-item">
            <label for="login-referrer-email">推荐人邮箱：</label>
            <input id="login-referrer-email" v-model="filters.referrerEmail" class="login-control" placeholder="请输入推荐人邮箱" type="text" />
          </div>
          <div class="login-filter-item type-filter-item">
            <label for="login-customer-type">客户类型：</label>
            <select id="login-customer-type" v-model="filters.customerType" class="login-control">
              <option value="">-请选择-</option>
              <option v-for="type in customerTypes" :key="type" :value="type">{{ type }}</option>
            </select>
          </div>
          <div class="login-filter-item date-filter-item">
            <label for="login-date-start">登录日期：</label>
            <div class="date-range-control">
              <input id="login-date-start" v-model="filters.startDate" class="login-control" aria-label="开始日期" type="date" />
              <span>~</span>
              <input v-model="filters.endDate" class="login-control" aria-label="结束日期" type="date" />
            </div>
          </div>
          <div class="login-filter-actions">
            <button class="primary-button" type="submit">搜索</button>
            <button class="secondary-button" type="button" @click="reset">重置</button>
          </div>
        </form>
      </section>

      <section class="login-logs-panel table-panel">
        <div class="table-toolbar">
          <div class="result-summary">共 {{ filteredRows.length }} 条记录</div>
          <button class="export-button" type="button" @click="exportReport">
            <i class="fa-solid fa-download" aria-hidden="true"></i>
            报表导出
          </button>
        </div>

        <div class="login-table-wrap">
          <table class="login-table">
            <colgroup>
              <col style="width: 8%" />
              <col style="width: 10%" />
              <col style="width: 10%" />
              <col style="width: 10%" />
              <col style="width: 6%" />
              <col style="width: 8%" />
              <col style="width: 14%" />
              <col style="width: 7%" />
              <col style="width: 7%" />
              <col style="width: 11%" />
              <col style="width: 9%" />
            </colgroup>
            <thead>
              <tr>
                <th>客户名称</th>
                <th>客户邮箱</th>
                <th>上级邮箱</th>
                <th>推荐人</th>
                <th>客户类型</th>
                <th>登录IP</th>
                <th>登录地点</th>
                <th>客户端类型</th>
                <th>设备信息</th>
                <th>系统信息</th>
                <th>登录时间</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="row in paginatedRows" :key="row.id">
                <td :title="row.customerName">{{ row.customerName }}</td>
                <td :title="row.customerEmail">{{ row.customerEmail }}</td>
                <td :title="row.superiorEmail">{{ row.superiorEmail || '-' }}</td>
                <td :title="row.referrer">{{ row.referrer || '-' }}</td>
                <td :title="row.customerType">{{ row.customerType }}</td>
                <td class="mono-cell" :title="row.loginIp">{{ row.loginIp }}</td>
                <td :title="row.location">{{ row.location }}</td>
                <td :title="row.clientType">{{ row.clientType }}</td>
                <td :title="row.deviceInfo">{{ row.deviceInfo || '-' }}</td>
                <td :title="row.systemInfo">{{ row.systemInfo }}</td>
                <td class="time-cell" :title="row.loginTime">{{ row.loginTime }}</td>
              </tr>
              <tr v-if="paginatedRows.length === 0">
                <td class="empty-state" colspan="11">没有符合条件的登录记录</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="pagination-bar">
          <el-pagination
            v-model:current-page="page"
            v-model:page-size="pageSize"
            :page-sizes="[10, 15, 20]"
            :total="filteredRows.length"
            background
            layout="total, sizes, prev, pager, next"
          />
        </div>
      </section>
    </main>
  </div>
</template>

<script setup>
import { computed, reactive, ref } from 'vue'

const customerTypes = ['直接客户', '代理', 'admin']

const loginRows = [
  { id: 1, customerName: '陈洪涛', customerEmail: 'chtpx@163.com', superiorEmail: 'Luke@hatcgroup.com', referrer: 'jamessun@hatcgroup.com', customerType: '代理', loginIp: '14.155.120.39', location: '中国/广东省/深圳市/南山区', clientType: 'PC端', deviceInfo: '-', systemInfo: 'Windows NT 10.0; Win64; x64; rv:132.0', loginTime: '2026-10-16 16:56:15' },
  { id: 2, customerName: '杨永哲', customerEmail: 'zacyang32@gmail.com', superiorEmail: '425101yao@gmail.com', referrer: '425101yao@gmail.com', customerType: '直接客户', loginIp: '121.202.252.120', location: '中国/中国香港/中国香港', clientType: '手机端', deviceInfo: 'Apple', systemInfo: 'iOS; CPU iPhone OS 26', loginTime: '2026-10-16 16:48:20' },
  { id: 3, customerName: '杨永哲', customerEmail: 'zacyang32@gmail.com', superiorEmail: '425101yao@gmail.com', referrer: '425101yao@gmail.com', customerType: '直接客户', loginIp: '121.202.252.120', location: '中国/中国香港/中国香港', clientType: '手机端', deviceInfo: 'Apple', systemInfo: 'iOS; CPU iPhone OS 18', loginTime: '2026-10-16 16:32:43' },
  { id: 4, customerName: 'Finance-04', customerEmail: 'Finance-04@hatcgroup.com', superiorEmail: '', referrer: '', customerType: '直接客户', loginIp: '182.16.47.18', location: '中国/香港特别行政区', clientType: 'PC端', deviceInfo: '', systemInfo: 'Windows NT 10.0; Win64; x64', loginTime: '2026-10-16 16:28:00' },
  { id: 5, customerName: '和彦军', customerEmail: '18830910921@163.com', superiorEmail: '809310999@qq.com', referrer: '809310999@qq.com', customerType: '代理', loginIp: '120.14.145.53', location: '中国/河北省/邢台市/任泽区', clientType: '手机端', deviceInfo: 'Huawei', systemInfo: 'Android 12; HarmonyOS; NOH', loginTime: '2026-10-16 16:22:14' },
  { id: 6, customerName: 'Finance-01', customerEmail: 'Finance-01@hatcgroup.com', superiorEmail: '', referrer: '', customerType: '直接客户', loginIp: '182.16.36.166', location: '中国/香港特别行政区', clientType: 'PC端', deviceInfo: '', systemInfo: 'Windows NT 10.0; Win64; x64', loginTime: '2026-10-16 16:19:24' },
  { id: 7, customerName: '魏正璞', customerEmail: '175925788@qq.com', superiorEmail: '2468615499@qq.com', referrer: '2468615499@qq.com', customerType: '代理', loginIp: '182.143.191.38', location: '中国/四川省', clientType: '手机端', deviceInfo: '', systemInfo: 'Android 10; K', loginTime: '2026-10-16 16:17:46' },
  { id: 8, customerName: '魏正璞', customerEmail: '175925788@qq.com', superiorEmail: '2468615499@qq.com', referrer: '2468615499@qq.com', customerType: '代理', loginIp: '182.143.191.38', location: '中国/四川省', clientType: '手机端', deviceInfo: 'Huawei', systemInfo: 'Android 10; K', loginTime: '2026-10-16 16:17:39' },
  { id: 9, customerName: 'Finance-02', customerEmail: 'Finance-02@hatcgroup.com', superiorEmail: '', referrer: '', customerType: '直接客户', loginIp: '112.121.161.28', location: '中国/香港特别行政区', clientType: 'PC端', deviceInfo: '', systemInfo: 'Windows NT 10.0; Win64; x64', loginTime: '2026-10-16 16:12:53' },
  { id: 10, customerName: '周树人', customerEmail: 'hanadmin2026@163.com', superiorEmail: '', referrer: '', customerType: 'admin', loginIp: '212.107.29.198', location: '中国/中国香港/中国香港', clientType: 'PC端', deviceInfo: 'Apple', systemInfo: 'Macintosh; Intel Mac OS X 10', loginTime: '2026-10-16 16:02:15' },
  { id: 11, customerName: 'AlexL', customerEmail: 'AlexL@hatcgroup.com', superiorEmail: '', referrer: '', customerType: '直接客户', loginIp: '65.181.88.29', location: '中国/香港特别行政区', clientType: 'PC端', deviceInfo: '', systemInfo: 'Windows NT 10.0; Win64; x64', loginTime: '2026-10-16 16:01:34' },
  { id: 12, customerName: '刘元庆', customerEmail: 'HATc568789@yeah.net', superiorEmail: 'Leekampiu123321@gmail.com', referrer: 'Leekampiu123321@gmail.com', customerType: '代理', loginIp: '1.193.58.62', location: '中国/河南省/郑州市/金水区', clientType: 'PC端', deviceInfo: 'Apple', systemInfo: 'Macintosh; Intel Mac OS X 10', loginTime: '2026-10-16 15:56:22' },
  { id: 13, customerName: '郭计波', customerEmail: 'xingqi7772026@163.com', superiorEmail: '175925788@qq.com', referrer: '13656824799@163.com', customerType: '代理', loginIp: '14.127.44.171', location: '中国/广东省/深圳市/罗湖区', clientType: '手机端', deviceInfo: '', systemInfo: 'Android 12; JAD', loginTime: '2026-10-16 15:42:40' },
  { id: 14, customerName: '李晶', customerEmail: '502828850@qq.com', superiorEmail: 'sylviatse1219@gmail.com', referrer: 'sylviatse1219@gmail.com', customerType: '代理', loginIp: '106.83.20.244', location: '中国/重庆市/重庆市', clientType: '手机端', deviceInfo: 'Huawei', systemInfo: 'Android 16; zh', loginTime: '2026-10-16 15:30:52' },
  { id: 15, customerName: '赵亚飞', customerEmail: 'z461866679@163.com', superiorEmail: '502828850@qq.com', referrer: '502828850@qq.com', customerType: '代理', loginIp: '124.88.0.102', location: '中国/新疆维吾尔自治区/昌吉回族自治州', clientType: '手机端', deviceInfo: 'Huawei', systemInfo: 'Android 16; zh', loginTime: '2026-10-16 15:22:46' },
  { id: 16, customerName: '陈洪涛', customerEmail: 'chtpx@163.com', superiorEmail: 'Luke@hatcgroup.com', referrer: 'jamessun@hatcgroup.com', customerType: '代理', loginIp: '14.155.120.39', location: '中国/广东省/深圳市/南山区', clientType: 'PC端', deviceInfo: '-', systemInfo: 'Windows NT 10.0; Win64; x64; rv:132.0', loginTime: '2026-10-15 22:41:03' },
  { id: 17, customerName: 'Finance-03', customerEmail: 'Finance-03@hatcgroup.com', superiorEmail: '', referrer: '', customerType: '直接客户', loginIp: '182.16.47.22', location: '中国/香港特别行政区', clientType: 'PC端', deviceInfo: '', systemInfo: 'Windows NT 10.0; Win64; x64', loginTime: '2026-10-15 20:18:37' },
  { id: 18, customerName: '张欣然', customerEmail: 'zhangxinran@example.com', superiorEmail: 'luke@hatcgroup.com', referrer: 'luke@hatcgroup.com', customerType: '直接客户', loginIp: '223.104.67.15', location: '中国/广东省/深圳市/福田区', clientType: '手机端', deviceInfo: 'Apple', systemInfo: 'iOS; CPU iPhone OS 18', loginTime: '2026-10-15 18:06:19' },
]

const initialFilters = () => ({
  name: '',
  email: '',
  superiorEmail: '',
  referrerEmail: '',
  customerType: '',
  startDate: '',
  endDate: '',
})

const filters = reactive(initialFilters())
const appliedFilters = ref(initialFilters())
const page = ref(1)
const pageSize = ref(15)

const filteredRows = computed(() => {
  const criteria = appliedFilters.value
  const includesText = (value, query) => !query || String(value || '').toLowerCase().includes(query.toLowerCase())

  return loginRows.filter((row) => {
    const date = row.loginTime.slice(0, 10)
    return includesText(row.customerName, criteria.name)
      && includesText(row.customerEmail, criteria.email)
      && includesText(row.superiorEmail, criteria.superiorEmail)
      && includesText(row.referrer, criteria.referrerEmail)
      && (!criteria.customerType || row.customerType === criteria.customerType)
      && (!criteria.startDate || date >= criteria.startDate)
      && (!criteria.endDate || date <= criteria.endDate)
  })
})

const paginatedRows = computed(() => {
  const start = (page.value - 1) * pageSize.value
  return filteredRows.value.slice(start, start + pageSize.value)
})

function search() {
  appliedFilters.value = { ...filters }
  page.value = 1
}

function reset() {
  Object.assign(filters, initialFilters())
  appliedFilters.value = initialFilters()
  page.value = 1
}

function escapeCsv(value) {
  return `"${String(value ?? '').replaceAll('"', '""')}"`
}

function exportReport() {
  const headers = ['客户名称', '客户邮箱', '上级邮箱', '推荐人', '客户类型', '登录IP', '登录地点', '客户端类型', '设备信息', '系统信息', '登录时间']
  const fields = ['customerName', 'customerEmail', 'superiorEmail', 'referrer', 'customerType', 'loginIp', 'location', 'clientType', 'deviceInfo', 'systemInfo', 'loginTime']
  const csvRows = [headers, ...filteredRows.value.map((row) => fields.map((field) => row[field] || ''))]
  const csv = `\uFEFF${csvRows.map((row) => row.map(escapeCsv).join(',')).join('\r\n')}`
  const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8' }))
  const link = document.createElement('a')
  link.href = url
  link.download = '客户登录日志.csv'
  link.click()
  URL.revokeObjectURL(url)
}
</script>

<style scoped>
.login-logs-content {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.login-logs-panel {
  min-width: 0;
  overflow: hidden;
  border: 1px solid #eef0f2;
  border-radius: 12px;
  background: #fff;
  box-shadow: 0 1px 3px rgb(31 41 55 / 4%);
}

.search-panel {
  padding: 18px 20px 20px;
}

.panel-title {
  margin: 0 0 14px;
  color: #4b5563;
  font-size: 14px;
  font-weight: 600;
  line-height: 20px;
}

.login-filter-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(170px, 1fr)) minmax(140px, 0.75fr) minmax(280px, 1.55fr) auto;
  align-items: center;
  gap: 12px;
}

.login-filter-item {
  display: flex;
  min-width: 0;
  align-items: center;
  gap: 8px;
}

.login-filter-item > label {
  flex: 0 0 auto;
  color: #5f6875;
  font-size: 12px;
  white-space: nowrap;
}

.login-control {
  box-sizing: border-box;
  width: 100%;
  min-width: 0;
  height: 36px;
  padding: 0 10px;
  border: 1px solid #d9dee7;
  border-radius: 6px;
  outline: none;
  background-color: #fff;
  color: #374151;
  font: inherit;
  font-size: 12px;
  transition: border-color 0.15s ease, box-shadow 0.15s ease;
}

.login-control:focus {
  border-color: #d1a84f;
  box-shadow: 0 0 0 3px rgb(209 168 79 / 14%);
}

.login-control::placeholder {
  color: #a3aab5;
}

.date-filter-item {
  min-width: 0;
}

.date-range-control {
  display: grid;
  min-width: 0;
  flex: 1;
  grid-template-columns: minmax(0, 1fr) auto minmax(0, 1fr);
  align-items: center;
  gap: 6px;
}

.date-range-control > span {
  color: #8b929e;
  font-size: 12px;
}

.date-range-control input {
  padding: 0 7px;
  font-family: inherit;
}

.login-filter-actions {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 8px;
}

.primary-button,
.secondary-button,
.export-button {
  display: inline-flex;
  height: 36px;
  align-items: center;
  justify-content: center;
  gap: 7px;
  padding: 0 14px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  white-space: nowrap;
  cursor: pointer;
  transition: background-color 0.15s ease, color 0.15s ease, border-color 0.15s ease;
}

.primary-button {
  border: 1px solid #c29a4c;
  background: #c29a4c;
  color: #fff;
}

.primary-button:hover {
  border-color: #ad853c;
  background: #ad853c;
}

.secondary-button,
.export-button {
  border: 1px solid #d6dbe3;
  background: #fff;
  color: #5f6875;
}

.secondary-button:hover,
.export-button:hover {
  border-color: #c29a4c;
  color: #ad853c;
}

.table-panel {
  display: flex;
  flex: 1 0 auto;
  flex-direction: column;
}

.table-toolbar {
  display: flex;
  min-height: 56px;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 10px 18px;
}

.result-summary {
  color: #7b8491;
  font-size: 12px;
}

.login-table-wrap {
  min-width: 0;
  overflow-x: auto;
}

.login-table {
  width: 100%;
  min-width: 1500px;
  table-layout: fixed;
  border-collapse: collapse;
  color: #5b6573;
  font-size: 12px;
}

.login-table thead th {
  height: 44px;
  padding: 0 10px;
  border-top: 1px solid #edf0f4;
  border-bottom: 1px solid #e5e9ef;
  background: #f9fafb;
  color: #697382;
  font-size: 12px;
  font-weight: 600;
  text-align: left;
  vertical-align: middle;
  white-space: nowrap;
}

.login-table tbody td {
  height: 40px;
  padding: 0 10px;
  border-bottom: 1px solid #edf0f4;
  color: #596473;
  line-height: 18px;
  text-align: left;
  vertical-align: middle;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.login-table tbody tr:hover td {
  background: #fcfbf8;
}

.login-table .mono-cell,
.login-table .time-cell {
  font-variant-numeric: tabular-nums;
  white-space: nowrap;
}

.login-table .time-cell {
  color: #5f6875;
  font-size: 11px;
}

.login-table .empty-state {
  height: 112px;
  color: #9aa2ae;
  text-align: center;
}

.pagination-bar {
  display: flex;
  min-height: 56px;
  align-items: center;
  justify-content: flex-end;
  padding: 10px 16px;
  border-top: 1px solid #edf0f4;
}

@media (max-width: 1600px) {
  .login-filter-grid {
    grid-template-columns: repeat(3, minmax(220px, 1fr));
  }

  .login-filter-actions {
    grid-column: 1 / -1;
  }
}

@media (max-width: 900px) {
  .login-filter-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .date-filter-item,
  .login-filter-actions {
    grid-column: 1 / -1;
  }
}

@media (max-width: 600px) {
  .search-panel {
    padding: 16px;
  }

  .login-filter-grid {
    grid-template-columns: minmax(0, 1fr);
  }

  .login-filter-item > label {
    width: 82px;
  }

  .type-filter-item,
  .date-filter-item,
  .login-filter-actions {
    grid-column: auto;
  }

  .login-filter-actions {
    justify-content: flex-start;
  }

  .pagination-bar {
    justify-content: flex-start;
    overflow-x: auto;
  }
}
</style>
