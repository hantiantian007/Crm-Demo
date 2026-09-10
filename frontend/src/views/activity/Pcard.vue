<template>
  <div class="flex-1 flex flex-col min-w-0 bg-gray-50 overflow-hidden">
    <div class="flex-1 overflow-y-auto p-4 custom-scrollbar">
      <div class="w-full space-y-4">
        <!-- 活动详情概览 -->
        <div class="bg-gradient-to-r from-amber-50 via-white to-teal-50 rounded-xl border border-amber-100 shadow-sm overflow-hidden">
          <div class="px-6 py-5 border-b border-amber-100/60 flex flex-wrap items-center gap-4 justify-between">
            <div class="flex items-center gap-4">
              <div>
                <h2 class="text-base font-bold text-gray-800 flex items-center gap-2">
                  Pcard活动
                  <span class="inline-flex px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-blue-100 text-blue-600 border border-blue-200">进行中</span>
                </h2>
                <p class="text-xs text-gray-500 mt-0.5">活动有效期：2026-01-01 00:00:00 至 2026-12-31 23:59:59</p>
              </div>
            </div>
          </div>

          <div class="px-6 py-4 grid grid-cols-2 md:grid-cols-5 gap-4">
            <div>
              <p class="text-xs text-gray-500 mb-1">净入金要求</p>
              <p class="text-sm font-bold text-gray-800">≥ $1,000</p>
            </div>
            <div>
              <p class="text-xs text-gray-500 mb-1">交易手数要求</p>
              <p class="text-sm font-bold text-gray-800">≥ 10 Lot</p>
            </div>
            <div>
              <p class="text-xs text-gray-500 mb-1">参与范围</p>
              <p class="text-sm font-bold text-gray-800">全部用户</p>
            </div>
            <div>
              <p class="text-xs text-gray-500 mb-1">创建人</p>
              <p class="text-sm font-bold text-gray-800">史密斯</p>
            </div>
          </div>
        </div>

        <!-- 汇总统计卡片 -->
        <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
            <div class="flex items-center justify-between mb-2">
              <span class="text-xs text-gray-500">参与总人数</span>
            </div>
            <p class="text-2xl font-bold text-gray-800">1,286</p>
          </div>
          <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
            <div class="flex items-center justify-between mb-2">
              <span class="text-xs text-gray-500">已达标</span>
            </div>
            <div class="flex items-baseline gap-2">
              <p class="text-2xl font-bold text-emerald-600">158</p>
              <p class="text-xs text-gray-400">达标率 12.3%</p>
            </div>
          </div>
          <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
            <div class="flex items-center justify-between mb-2">
              <span class="text-xs text-gray-500">参与中（未达标）</span>
            </div>
            <p class="text-2xl font-bold text-indigo-600">882</p>
          </div>
        </div>

        <!-- 数据列表区域 -->
        <div class="bg-white rounded-xl shadow-sm border border-gray-100 flex flex-col min-h-[500px]">
          <!-- 列表切换 Tabs -->
          <div class="px-5 py-4 border-b border-gray-100 flex flex-wrap items-center justify-between gap-4">
            <div class="flex space-x-1 bg-gray-100/50 p-1 rounded-lg border border-gray-200/60">
              <button 
                @click="activeTab = 'customer'"
                :class="activeTab === 'customer' ? 'bg-white text-gray-800 shadow-sm border-gray-200/50' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-200/50'"
                class="px-4 py-1.5 text-sm font-medium rounded-md border border-transparent transition-all">
                客户列表
              </button>
              <button 
                @click="activeTab = 'qualified'"
                :class="activeTab === 'qualified' ? 'bg-white text-gray-800 shadow-sm border-gray-200/50' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-200/50'"
                class="px-4 py-1.5 text-sm font-medium rounded-md border border-transparent transition-all">
                达标列表
              </button>
            </div>
          </div>

          <!-- 客户列表 -->
          <div v-show="activeTab === 'customer'" class="flex-1 flex flex-col">
            <!-- 搜索 -->
            <div class="px-5 py-3 border-b border-gray-100 bg-gray-50/50">
              <div class="flex flex-wrap items-center gap-4 text-xs">
                <div class="flex items-center gap-2">
                  <span class="text-gray-500">客户名称/邮箱:</span>
                  <el-input v-model="customerSearch.keyword" placeholder="搜索客户" clearable class="w-48" size="small" />
                </div>
                <div class="flex items-center gap-2">
                  <span class="text-gray-500">账号类型:</span>
                  <el-select v-model="customerSearch.accountType" placeholder="全部" clearable class="w-32" size="small">
                    <el-option label="全部" value="" />
                    <el-option label="标准账号" value="标准账号" />
                    <el-option label="美分账号" value="美分账号" />
                  </el-select>
                </div>
                <div class="flex items-center gap-2">
                  <span class="text-gray-500">状态:</span>
                  <el-select v-model="customerSearch.status" placeholder="全部" clearable class="w-32" size="small">
                    <el-option label="全部" value="" />
                    <el-option label="参与中" value="参与中" />
                    <el-option label="已达标" value="已达标" />
                  </el-select>
                </div>
                <button class="bg-[#d1a84f] hover:bg-[#b89241] text-white px-4 py-1.5 rounded text-xs font-medium transition-colors">
                  搜索
                </button>
              </div>
            </div>

            <!-- 客户列表 DataTable -->
            <div class="flex-1 p-0 overflow-hidden min-h-[300px]">
              <DataTable
                :data="filteredCustomerData"
                :total="filteredCustomerData.length"
                v-model:page="customerPage"
                v-model:limit="customerLimit"
              >
                <el-table-column label="客户信息" min-width="180">
                  <template #default="{ row }">
                    <div class="flex flex-col">
                      <span class="font-medium text-gray-800">{{ row.name }}</span>
                      <span class="text-[11px] text-gray-400">{{ row.email }}</span>
                    </div>
                  </template>
                </el-table-column>
                <el-table-column prop="mtAccount" label="MT账号" min-width="100">
                  <template #default="{ row }">
                    <span class="font-medium text-gray-800">{{ row.mtAccount }}</span>
                  </template>
                </el-table-column>
                <el-table-column label="账号类型" min-width="100">
                  <template #default="{ row }">
                    <span v-if="row.accountType === '标准账号'" class="inline-flex px-2 py-0.5 rounded-full text-[11px] font-medium border border-gray-200 bg-gray-50 text-gray-600">标准账号</span>
                    <span v-else class="inline-flex px-2 py-0.5 rounded-full text-[11px] font-medium border border-amber-300 bg-amber-50 text-amber-700">美分账号</span>
                  </template>
                </el-table-column>
                <el-table-column label="净入金 (USD)" min-width="120" align="right">
                  <template #default="{ row }">
                    <span class="font-medium text-gray-500">${{ row.deposit }}</span>
                  </template>
                </el-table-column>
                <el-table-column label="交易手数 (Lot)" min-width="120" align="right">
                  <template #default="{ row }">
                    <span class="font-medium">{{ row.lots }}</span>
                  </template>
                </el-table-column>
                <el-table-column label="当前剩余信用金" min-width="130" align="right">
                  <template #default="{ row }">
                    <span v-if="row.credit !== '-'" class="font-medium text-emerald-600">{{ row.credit }}</span>
                    <span v-else class="text-gray-400">-</span>
                  </template>
                </el-table-column>
                <el-table-column label="活动状态" min-width="100">
                  <template #default="{ row }">
                    <span :class="row.status === '已达标' ? 'text-emerald-600' : 'text-blue-600'" class="font-medium">{{ row.status }}</span>
                  </template>
                </el-table-column>
                <el-table-column label="距达标还差" min-width="150">
                  <template #default="{ row }">
                    <div v-if="row.status === '已达标'" class="text-emerald-600 font-medium text-xs">— 完成 —</div>
                    <div v-else class="text-red-600 font-medium text-xs" v-html="row.diffHtml"></div>
                  </template>
                </el-table-column>
                <el-table-column prop="registerTime" label="注册时间" min-width="110">
                  <template #default="{ row }">
                    <span class="text-gray-500 text-xs">{{ row.registerTime }}</span>
                  </template>
                </el-table-column>
              </DataTable>
            </div>
          </div>

          <!-- 达标列表 -->
          <div v-show="activeTab === 'qualified'" class="flex-1 flex flex-col">
            <!-- 搜索 -->
            <div class="px-5 py-3 border-b border-gray-100 bg-gray-50/50">
              <div class="flex flex-wrap items-center gap-4 text-xs">
                <div class="flex items-center gap-2">
                  <span class="text-gray-500">客户名称/邮箱:</span>
                  <el-input v-model="qualifiedSearch.keyword" placeholder="搜索客户" clearable class="w-48" size="small" />
                </div>
                <div class="flex items-center gap-2">
                  <span class="text-gray-500">账号类型:</span>
                  <el-select v-model="qualifiedSearch.accountType" placeholder="全部" clearable class="w-32" size="small">
                    <el-option label="全部" value="" />
                    <el-option label="标准账号" value="标准账号" />
                    <el-option label="美分账号" value="美分账号" />
                  </el-select>
                </div>
                <div class="flex items-center gap-2">
                  <span class="text-gray-500">达标时间:</span>
                  <el-date-picker
                    v-model="qualifiedSearch.dateRange"
                    type="daterange"
                    range-separator="-"
                    start-placeholder="开始"
                    end-placeholder="结束"
                    size="small"
                    class="!w-60"
                  />
                </div>
                <button class="bg-[#d1a84f] hover:bg-[#b89241] text-white px-4 py-1.5 rounded text-xs font-medium transition-colors">
                  搜索
                </button>
              </div>
            </div>

            <!-- 达标列表 DataTable -->
            <div class="flex-1 p-0 overflow-hidden min-h-[300px]">
              <DataTable
                :data="filteredQualifiedData"
                :total="filteredQualifiedData.length"
                v-model:page="qualifiedPage"
                v-model:limit="qualifiedLimit"
              >
                <el-table-column label="客户信息" min-width="180">
                  <template #default="{ row }">
                    <div class="flex flex-col">
                      <span class="font-medium text-gray-800">{{ row.name }}</span>
                      <span class="text-[11px] text-gray-400">{{ row.email }}</span>
                    </div>
                  </template>
                </el-table-column>
                <el-table-column prop="mtAccount" label="MT账号" min-width="100">
                  <template #default="{ row }">
                    <span class="font-medium text-gray-800">{{ row.mtAccount }}</span>
                  </template>
                </el-table-column>
                <el-table-column label="账号类型" min-width="100">
                  <template #default="{ row }">
                    <span v-if="row.accountType === '标准账号'" class="inline-flex px-2 py-0.5 rounded-full text-[11px] font-medium border border-gray-200 bg-gray-50 text-gray-600">标准账号</span>
                    <span v-else class="inline-flex px-2 py-0.5 rounded-full text-[11px] font-medium border border-amber-300 bg-amber-50 text-amber-700">美分账号</span>
                  </template>
                </el-table-column>
                <el-table-column label="达标时净入金" min-width="120" align="right">
                  <template #default="{ row }">
                    <span class="font-medium text-gray-500">${{ row.deposit }}</span>
                  </template>
                </el-table-column>
                <el-table-column label="达标时交易手数" min-width="120" align="right">
                  <template #default="{ row }">
                    <span class="font-medium">{{ row.lots }}</span>
                  </template>
                </el-table-column>
                <el-table-column label="赠金转真实资金" min-width="130" align="right">
                  <template #default="{ row }">
                    <span class="font-medium text-emerald-600">${{ row.bonus }}</span>
                  </template>
                </el-table-column>
                <el-table-column prop="qualifiedTime" label="达标时间" min-width="140">
                  <template #default="{ row }">
                    <span class="text-gray-500 text-xs">{{ row.qualifiedTime }}</span>
                  </template>
                </el-table-column>
                <el-table-column prop="convertTime" label="资金转换时间" min-width="140">
                  <template #default="{ row }">
                    <span class="text-gray-500 text-xs">{{ row.convertTime }}</span>
                  </template>
                </el-table-column>
              </DataTable>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'
import DataTable from '@/components/DataTable.vue'
import { openPrd } from '@/store/prd'

// Tab 状态
const activeTab = ref('customer')

// PRD 方法
const handleOpenPrd = () => {
  openPrd('prd-pcard-detail.html', 'Pcard 详情与数据 - PRD')
}

// ----------------- 客户列表数据 -----------------
const customerSearch = reactive({
  keyword: '',
  accountType: '',
  status: ''
})
const customerPage = ref(1)
const customerLimit = ref(20)

const customerData = ref([
  {
    name: 'test-杨敏子',
    email: '13994874677@qq.com',
    mtAccount: '600001',
    accountType: '标准账号',
    deposit: '860.0000',
    lots: '3.1200',
    credit: '100.00',
    status: '参与中',
    diffHtml: '差 <b>$140</b> + <b>6.88</b> Lot',
    registerTime: '2026-03-22'
  },
  {
    name: '史密斯',
    email: 'admin@dev.com',
    mtAccount: '600002',
    accountType: '标准账号',
    deposit: '1,013.0000',
    lots: '0.0000',
    credit: '-',
    status: '参与中',
    diffHtml: '还差 <b>10.00</b> Lot',
    registerTime: '2026-01-02'
  },
  {
    name: 'test-秦洋辰',
    email: '15097830595@165.com',
    mtAccount: '600003',
    accountType: '美分账号',
    deposit: '320.0000',
    lots: '1.0500',
    credit: '50.00',
    status: '参与中',
    diffHtml: '差 <b>$680</b> + <b>8.95</b> Lot',
    registerTime: '2026-04-10'
  },
  {
    name: 'test-杨均',
    email: 'b13@qq.com',
    mtAccount: '600004',
    accountType: '标准账号',
    deposit: '2,500.0000',
    lots: '12.8200',
    credit: '-',
    status: '已达标',
    diffHtml: '— 完成 —',
    registerTime: '2026-01-20'
  }
])

const filteredCustomerData = computed(() => {
  return customerData.value.filter(item => {
    const matchKeyword = !customerSearch.keyword || 
      item.name.includes(customerSearch.keyword) || 
      item.email.includes(customerSearch.keyword)
    const matchAccount = !customerSearch.accountType || item.accountType === customerSearch.accountType
    const matchStatus = !customerSearch.status || item.status === customerSearch.status
    return matchKeyword && matchAccount && matchStatus
  })
})

// ----------------- 达标列表数据 -----------------
const qualifiedSearch = reactive({
  keyword: '',
  accountType: '',
  dateRange: null
})
const qualifiedPage = ref(1)
const qualifiedLimit = ref(20)

const qualifiedData = ref([
  {
    name: 'test-杨均',
    email: 'b13@qq.com',
    mtAccount: '600004',
    accountType: '标准账号',
    deposit: '2,500.0000',
    lots: '12.8200',
    bonus: '100.00',
    qualifiedTime: '2026-03-15 14:22:10',
    convertTime: '2026-03-15 14:22:15'
  },
  {
    name: '陈大文',
    email: 'chen.dw@example.com',
    mtAccount: '600008',
    accountType: '标准账号',
    deposit: '1,200.0000',
    lots: '10.1000',
    bonus: '100.00',
    qualifiedTime: '2026-04-02 09:15:33',
    convertTime: '2026-04-02 09:15:40'
  }
])

const filteredQualifiedData = computed(() => {
  return qualifiedData.value.filter(item => {
    const matchKeyword = !qualifiedSearch.keyword || 
      item.name.includes(qualifiedSearch.keyword) || 
      item.email.includes(qualifiedSearch.keyword)
    const matchAccount = !qualifiedSearch.accountType || item.accountType === qualifiedSearch.accountType
    return matchKeyword && matchAccount
  })
})
</script>

<style scoped>
.custom-scrollbar::-webkit-scrollbar { width: 6px; height: 6px; }
.custom-scrollbar::-webkit-scrollbar-thumb { background: #e5e7eb; border-radius: 4px; }
.custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
</style>