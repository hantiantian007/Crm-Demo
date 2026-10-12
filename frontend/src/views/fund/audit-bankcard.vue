<template>
  <div class="w-full h-full flex flex-col min-w-0 bg-gray-50 p-4">
    <!-- 搜索区域 -->
    <div class="bg-white p-5 rounded-xl shadow-sm border border-gray-100 mb-4 shrink-0">
      <div v-if="isMyBankcardPage" class="flex items-center justify-between gap-4">
        <button @click="goAddBankcard" class="bg-[#d1a84f] hover:bg-[#b89241] text-white px-6 h-[32px] rounded text-sm font-medium transition-colors">
          <i class="fa-solid fa-plus mr-2 text-xs"></i>
          添加银行卡
        </button>
        <div class="text-xs text-gray-500">
          当前账号：<span class="font-medium text-gray-700">{{ sessionUserEmail || '—' }}</span>
        </div>
      </div>
      <div v-else class="flex flex-wrap items-center gap-4 text-sm">
        <div class="flex items-center gap-2">
          <label class="text-gray-600 shrink-0 font-medium">邮箱：</label>
          <el-input v-model="searchForm.email" placeholder="请输入邮箱" class="w-48" clearable />
        </div>
        <div class="flex items-center gap-2">
          <label class="text-gray-600 shrink-0 font-medium">MT账号：</label>
          <el-input v-model="searchForm.mtAccount" placeholder="MT账号" class="w-48" clearable />
        </div>
        <div class="flex items-center gap-2">
          <label class="text-gray-600 shrink-0 font-medium">银行卡号/钱包地址：</label>
          <el-input v-model="searchForm.bankCard" placeholder="银行卡号/钱包地址" class="w-48" clearable />
        </div>
        <div class="flex items-center gap-2">
          <label class="text-gray-600 shrink-0 font-medium">状态：</label>
          <el-select v-model="searchForm.status" placeholder="全部" class="w-32">
            <el-option label="全部" value="" />
            <el-option label="未审核" value="pending" />
            <el-option label="已审核" value="approved" />
            <el-option label="已拒绝" value="rejected" />
          </el-select>
        </div>
        <button @click="handleSearch" class="bg-[#d1a84f] hover:bg-[#b89241] text-white px-6 h-[32px] rounded text-sm font-medium transition-colors">
          搜索
        </button>
        <button @click="goAddBankcard" class="bg-primary hover:bg-primaryHover text-white px-6 h-[32px] rounded text-sm font-medium transition-colors">
          新增银行卡
        </button>
      </div>
    </div>

    <!-- 列表区域 -->
    <div class="bg-white rounded-xl shadow-sm border border-gray-100 flex-1 min-h-0 flex flex-col">
      <div class="flex-1 p-5 overflow-auto custom-scrollbar">
        <table class="w-full text-left text-sm text-gray-600">
          <thead class="bg-white text-gray-700 font-medium border-b border-gray-100">
            <tr v-if="!isMyBankcardPage">
              <th class="py-4 px-4 font-medium whitespace-nowrap">邮箱</th>
              <th class="py-4 px-4 font-medium whitespace-nowrap">类型</th>
              <th class="py-4 px-4 font-medium whitespace-nowrap">银行卡号/钱包地址</th>
              <th class="py-4 px-4 font-medium whitespace-nowrap">开户名</th>
              <th class="py-4 px-4 font-medium whitespace-nowrap">开户行</th>
              <th class="py-4 px-4 font-medium whitespace-nowrap">银行国际代码</th>
              <th class="py-4 px-4 font-medium whitespace-nowrap">卡图片</th>
              <th class="py-4 px-4 font-medium whitespace-nowrap">客户编号</th>
              <th class="py-4 px-4 font-medium whitespace-nowrap">申请时间</th>
              <th class="py-4 px-4 font-medium whitespace-nowrap">状态</th>
              <th class="py-4 px-4 font-medium whitespace-nowrap">处理时间</th>
              <th class="py-4 px-4 font-medium whitespace-nowrap">备注</th>
              <th class="py-4 px-4 font-medium whitespace-nowrap">操作</th>
            </tr>
            <tr v-else>
              <th class="py-4 px-4 font-medium whitespace-nowrap">类型</th>
              <th class="py-4 px-4 font-medium whitespace-nowrap">银行卡号/钱包地址</th>
              <th class="py-4 px-4 font-medium whitespace-nowrap">开户名</th>
              <th class="py-4 px-4 font-medium whitespace-nowrap">开户行</th>
              <th class="py-4 px-4 font-medium whitespace-nowrap">银行国际代码</th>
              <th class="py-4 px-4 font-medium whitespace-nowrap">卡图片</th>
              <th class="py-4 px-4 font-medium whitespace-nowrap">客户编号</th>
              <th class="py-4 px-4 font-medium whitespace-nowrap">申请时间</th>
              <th class="py-4 px-4 font-medium whitespace-nowrap">状态</th>
              <th class="py-4 px-4 font-medium whitespace-nowrap">处理时间</th>
              <th class="py-4 px-4 font-medium whitespace-nowrap">备注</th>
              <th class="py-4 px-4 font-medium whitespace-nowrap">操作</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-100">
            <template v-if="!isMyBankcardPage">
              <tr v-for="(item, index) in displayedTableData" :key="index" class="hover:bg-gray-50/50 transition-colors">
                <td class="py-4 px-4">
                  <button type="button" class="text-gray-600 hover:text-blue-500 underline decoration-gray-300 underline-offset-2" @click="goDetail(item)">{{ item.email }}</button>
                </td>
                <td class="py-4 px-4 whitespace-nowrap">{{ formatType(item) }}</td>
                <td class="py-4 px-4 break-all">{{ item.bankCard }}</td>
                <td class="py-4 px-4">{{ item.accountName }}</td>
                <td class="py-4 px-4">{{ item.bankName }}</td>
                <td class="py-4 px-4">{{ item.swiftCode }}</td>
                <td class="py-4 px-4">
                  <div class="flex gap-2">
                    <template v-if="item.images && item.images.length > 0">
                      <div v-for="(img, i) in item.images" :key="i" class="w-8 h-8 flex items-center justify-center text-gray-400 text-xs overflow-hidden shrink-0">
                        <i v-if="img === 'icon'" class="fa-regular fa-image text-green-500 text-lg"></i>
                        <div v-else class="w-full h-full bg-gray-300 rounded-sm"></div>
                      </div>
                    </template>
                    <span v-else>-</span>
                  </div>
                </td>
                <td class="py-4 px-4 whitespace-nowrap text-gray-500 font-mono text-xs">{{ item.clientNo || item.pcardId || '-' }}</td>
                <td class="py-4 px-4 whitespace-nowrap">{{ item.applyTime }}</td>
                <td class="py-4 px-4 whitespace-nowrap">
                  <span class="inline-flex items-center px-2 py-1 rounded-full text-[11px] font-medium border" :class="statusTagClass(item.status)">
                    {{ item.status }}
                  </span>
                </td>
                <td class="py-4 px-4 whitespace-nowrap">{{ item.processTime }}</td>
                <td class="py-4 px-4">{{ item.remark }}</td>
                <td class="py-4 px-4 whitespace-nowrap">
                  <button @click="handleAudit(item)" class="text-blue-500 border border-blue-200 px-3 py-1 rounded text-xs hover:bg-blue-50 transition-colors bg-white">
                    审核
                  </button>
                </td>
              </tr>
            </template>
            <template v-else>
              <tr v-for="(item, index) in displayedTableData" :key="index" class="hover:bg-gray-50/50 transition-colors">
                <td class="py-4 px-4 whitespace-nowrap">{{ formatType(item) }}</td>
                <td class="py-4 px-4">
                  <button type="button" class="text-gray-700 hover:text-blue-500 underline decoration-gray-300 underline-offset-2 break-all" @click="goDetail(item)">{{ item.bankCard }}</button>
                </td>
                <td class="py-4 px-4">{{ item.accountName }}</td>
                <td class="py-4 px-4">{{ item.bankName }}</td>
                <td class="py-4 px-4">{{ item.swiftCode }}</td>
                <td class="py-4 px-4">
                  <div class="flex gap-2">
                    <template v-if="item.images && item.images.length > 0">
                      <div v-for="(img, i) in item.images" :key="i" class="w-8 h-8 flex items-center justify-center text-gray-400 text-xs overflow-hidden shrink-0">
                        <i v-if="img === 'icon'" class="fa-regular fa-image text-green-500 text-lg"></i>
                        <div v-else class="w-full h-full bg-gray-300 rounded-sm"></div>
                      </div>
                    </template>
                    <span v-else>-</span>
                  </div>
                </td>
                <td class="py-4 px-4 whitespace-nowrap text-gray-500 font-mono text-xs">{{ item.clientNo || item.pcardId || '-' }}</td>
                <td class="py-4 px-4 whitespace-nowrap">{{ item.applyTime }}</td>
                <td class="py-4 px-4 whitespace-nowrap">
                  <span class="inline-flex items-center px-2 py-1 rounded-full text-[11px] font-medium border" :class="statusTagClass(item.status)">
                    {{ item.status }}
                  </span>
                </td>
                <td class="py-4 px-4 whitespace-nowrap">{{ item.processTime }}</td>
                <td class="py-4 px-4">{{ item.remark }}</td>
                <td class="py-4 px-4 whitespace-nowrap">
                  <button type="button" class="text-blue-500 border border-blue-200 px-3 py-1 rounded text-xs hover:bg-blue-50 transition-colors bg-white" @click="handleEdit(item)">
                    修改
                  </button>
                  <button type="button" class="text-rose-500 border border-rose-200 px-3 py-1 rounded text-xs hover:bg-rose-50 transition-colors bg-white ml-2" @click="handleDelete(item)">
                    删除
                  </button>
                </td>
              </tr>
              <tr v-if="displayedTableData.length === 0">
                <td class="py-8 px-4 text-center text-gray-400" colspan="12">暂无银行卡记录</td>
              </tr>
            </template>
          </tbody>
        </table>
      </div>
      
      <!-- 分页 -->
      <div class="p-5 border-t border-gray-100 flex justify-end shrink-0">
        <el-pagination
          v-model:current-page="currentPage"
          v-model:page-size="pageSize"
          :page-sizes="[10, 20, 50, 100]"
          layout="total, sizes, prev, pager, next, jumper"
          :total="100"
        />
      </div>
    </div>

    <!-- 审核弹窗 -->
    <el-dialog
      v-if="!isMyBankcardPage"
      v-model="auditDialogVisible"
      title="审核"
      width="800px"
      :close-on-click-modal="false"
      destroy-on-close
    >
      <div v-if="currentAuditItem" class="p-4">
        <!-- 详情表格 -->
        <div class="border border-gray-200 rounded-sm mb-6">
          <div class="grid grid-cols-2 border-b border-gray-200">
            <div class="bg-gray-50 px-4 py-3 text-sm font-medium text-gray-700 border-r border-gray-200">客户邮箱</div>
            <div class="bg-gray-50 px-4 py-3 text-sm font-medium text-gray-700">开户名</div>
          </div>
          <div class="grid grid-cols-2 border-b border-gray-200">
            <div class="px-4 py-3 text-sm text-gray-600 border-r border-gray-200 break-all">{{ currentAuditItem.email }}</div>
            <div class="px-4 py-3 text-sm text-gray-600 break-all">{{ currentAuditItem.accountName === '-' ? 'test-魏嘉子' : currentAuditItem.accountName }}</div>
          </div>

          <div class="grid grid-cols-2 border-b border-gray-200">
            <div class="bg-gray-50 px-4 py-3 text-sm font-medium text-gray-700 border-r border-gray-200">开户行</div>
            <div class="bg-gray-50 px-4 py-3 text-sm font-medium text-gray-700">银行卡账号</div>
          </div>
          <div class="grid grid-cols-2 border-b border-gray-200">
            <div class="px-4 py-3 text-sm text-gray-600 border-r border-gray-200 break-all">{{ currentAuditItem.bankName === '-' ? '' : currentAuditItem.bankName }}</div>
            <div class="px-4 py-3 text-sm text-gray-600 break-all">{{ currentAuditItem.bankCard }}</div>
          </div>

          <div class="grid grid-cols-2 border-b border-gray-200">
            <div class="bg-gray-50 px-4 py-3 text-sm font-medium text-gray-700 border-r border-gray-200">银行国际代码</div>
            <div class="bg-gray-50 px-4 py-3 text-sm font-medium text-gray-700">申请时间</div>
          </div>
          <div class="grid grid-cols-2 border-b border-gray-200">
            <div class="px-4 py-3 text-sm text-gray-600 border-r border-gray-200 break-all">{{ currentAuditItem.swiftCode === '-' ? '' : currentAuditItem.swiftCode }}</div>
            <div class="px-4 py-3 text-sm text-gray-600 break-all">{{ currentAuditItem.applyTime }}</div>
          </div>

          <div class="grid grid-cols-2 border-b border-gray-200">
            <div class="bg-gray-50 px-4 py-3 text-sm font-medium text-gray-700 border-r border-gray-200">审核状态</div>
            <div class="bg-gray-50 px-4 py-3 text-sm font-medium text-gray-700">处理时间</div>
          </div>
          <div class="grid grid-cols-2 border-b border-gray-200">
            <div class="px-4 py-3 text-sm text-gray-600 border-r border-gray-200 break-all">{{ currentAuditItem.status }}</div>
            <div class="px-4 py-3 text-sm text-gray-600 break-all">{{ currentAuditItem.processTime }}</div>
          </div>

          <div class="grid grid-cols-2 border-b border-gray-200">
            <div class="bg-gray-50 px-4 py-3 text-sm font-medium text-gray-700 border-r border-gray-200">备注</div>
            <div class="bg-gray-50 px-4 py-3 text-sm font-medium text-gray-700">卡图片</div>
          </div>
          <div class="grid grid-cols-2" :class="{ 'border-b border-gray-200': currentAuditItem.bankType === 'Pcard' }">
            <div class="px-4 py-3 text-sm text-gray-600 border-r border-gray-200 break-all">{{ currentAuditItem.remark === '-' ? '' : currentAuditItem.remark }}</div>
            <div class="px-4 py-3 text-sm text-gray-600 break-all"></div>
          </div>

          <!-- Pcard客户唯一编号 (仅 Pcard 类型显示) -->
          <template v-if="currentAuditItem.bankType === 'Pcard'">
            <div class="grid grid-cols-2 border-b border-gray-200">
              <div class="bg-gray-50 px-4 py-3 text-sm font-medium text-gray-700 border-r border-gray-200">Pcard客户唯一编号</div>
              <div class="bg-gray-50 px-4 py-3 text-sm font-medium text-gray-700"></div>
            </div>
            <div class="grid grid-cols-2">
              <div class="px-4 py-3 text-sm text-gray-600 border-r border-gray-200 break-all">{{ currentAuditItem.pcardId || '-' }}</div>
              <div class="px-4 py-3 text-sm text-gray-600 break-all"></div>
            </div>
          </template>
        </div>

        <!-- 审核操作 -->
        <div class="flex items-center gap-6 mb-8">
          <label class="flex items-center gap-2 cursor-pointer group">
            <input type="radio" v-model="auditForm.result" value="pass" class="w-4 h-4 text-[#d1a84f] focus:ring-[#d1a84f] border-gray-300 cursor-pointer" />
            <span class="text-sm font-medium text-[#d1a84f]">通过</span>
          </label>
          <label class="flex items-center gap-2 cursor-pointer group">
            <input type="radio" v-model="auditForm.result" value="reject" class="w-4 h-4 text-[#d1a84f] focus:ring-[#d1a84f] border-gray-300 cursor-pointer" />
            <span class="text-sm text-gray-600">拒绝</span>
          </label>
        </div>

        <!-- 提交按钮 -->
        <div class="flex justify-center">
          <button @click="submitAudit" class="bg-[#d1a84f] hover:bg-[#b89241] text-white px-8 py-2 rounded text-sm font-medium transition-colors">
            提交
          </button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script setup>
import { computed, ref, reactive } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getSessionUser } from '@/store/passwordSecurityDemo'
import { ElMessage, ElMessageBox } from 'element-plus'

const router = useRouter()
const route = useRoute()

const isMyBankcardPage = computed(() => route.path === '/fund/my-bankcard')
const sessionUserEmail = computed(() => getSessionUser()?.email || '')

const searchForm = reactive({
  email: '',
  mtAccount: '',
  bankCard: '',
  status: ''
})

const initSearchFormFromQuery = () => {
  const q = route.query || {}
  if (typeof q.email === 'string' && q.email.trim()) searchForm.email = q.email.trim()
  if (typeof q.mtAccount === 'string' && q.mtAccount.trim()) searchForm.mtAccount = q.mtAccount.trim()
  if (typeof q.bankCard === 'string' && q.bankCard.trim()) searchForm.bankCard = q.bankCard.trim()
  if (typeof q.status === 'string' && q.status.trim()) searchForm.status = q.status.trim()
}

initSearchFormFromQuery()

const currentPage = ref(1)
const pageSize = ref(10)

const tableData = ref([
  {
    email: 'agent_a@demo.com',
    bankCard: '5210 7860 0000 0000',
    accountName: '-',
    bankName: '-',
    swiftCode: '-',
    bankType: 'Pcard',
    pcardId: '86004301',
    images: ['box', 'box'],
    applyTime: '2026-09-07 10:12:23',
    status: '已审核',
    processTime: '2026-09-07 12:11:34',
    remark: '-'
  },
  {
    email: 'agent_a@demo.com',
    bankCard: 'TBXGajHnTqdd4Xx...1QJmwHL',
    accountName: '-',
    bankName: '-',
    swiftCode: '-',
    bankType: 'USDT_TRC20',
    images: ['icon'],
    applyTime: '2026-08-20 18:10:06',
    status: '已审核',
    processTime: '2026-08-20 18:35:28',
    remark: '-'
  },
  {
    email: '15196181790@qq.com',
    bankCard: '6222022703791347101',
    accountName: '-',
    bankName: '-',
    swiftCode: '-',
    bankType: 'Bank',
    images: [],
    applyTime: '2026-04-29 14:40:17',
    status: '未审核',
    processTime: '-',
    remark: '-'
  },
  {
    email: 'D001@q.com',
    bankCard: 'XHirjsjritjttj',
    accountName: '-',
    bankName: '-',
    swiftCode: '-',
    bankType: 'Pcard',
    pcardId: 'PC-2026-889900',
    images: ['box'],
    applyTime: '2026-04-15 10:41:41',
    status: '未审核',
    processTime: '-',
    remark: '-'
  },
  {
    email: 'admin@dev.com',
    bankCard: '3333123123',
    accountName: '史密斯',
    bankName: '123123',
    swiftCode: '-',
    images: [],
    applyTime: '2026-04-09 18:49:05',
    status: '未审核',
    processTime: '-',
    remark: '-'
  },
  {
    email: 'admin@dev.com',
    bankCard: '123123123',
    accountName: '-',
    bankName: '-',
    swiftCode: '-',
    images: ['box'],
    applyTime: '2026-04-09 18:48:55',
    status: '未审核',
    processTime: '-',
    remark: '-'
  },
  {
    email: 'admin@dev.com',
    bankCard: '123123',
    accountName: '史密斯',
    bankName: '123',
    swiftCode: '123',
    images: ['box', 'box'],
    applyTime: '2026-04-09 18:48:44',
    status: '未审核',
    processTime: '-',
    remark: '-'
  },
  {
    email: 'CS001@qq.com',
    bankCard: '5555',
    accountName: '-',
    bankName: '-',
    swiftCode: '-',
    images: ['icon'],
    applyTime: '2026-01-19 11:07:16',
    status: '未审核',
    processTime: '-',
    remark: '-'
  },
  {
    email: '348845310@qq.com',
    bankCard: '6215340302102249585',
    accountName: '付文涛',
    bankName: '中国建设银行陕西省宝鸡市宝钛支行',
    swiftCode: '-',
    images: ['icon', 'icon'],
    applyTime: '2025-12-18 10:57:08',
    status: '未审核',
    processTime: '-',
    remark: '-'
  },
  {
    email: '379600849@qq.com',
    bankCard: 'TEAheGbrWgEJuFVdA7bSZMdnu6T4dNx8m6',
    accountName: '-',
    bankName: '-',
    swiftCode: '-',
    images: ['icon'],
    applyTime: '2025-12-17 12:57:14',
    status: '未审核',
    processTime: '-',
    remark: '-'
  },
  {
    email: '452891211@qq.com',
    bankCard: 'TQyhK7BeBErcpnwXZLaAbuZgnFkzdhtjXP',
    accountName: '-',
    bankName: '-',
    swiftCode: '-',
    images: ['icon'],
    applyTime: '2025-12-15 23:13:50',
    status: '未审核',
    processTime: '-',
    remark: '-'
  }
])

const statusMap = {
  pending: '未审核',
  approved: '已审核',
  rejected: '已拒绝'
}

const displayedTableData = computed(() => {
  let rows = Array.isArray(tableData.value) ? [...tableData.value] : []

  if (isMyBankcardPage.value) {
    const email = sessionUserEmail.value
    if (email) rows = rows.filter((r) => r.email === email)
  } else {
    const email = String(searchForm.email || '').trim()
    if (email) rows = rows.filter((r) => String(r.email || '').includes(email))
  }

  const bankCard = String(searchForm.bankCard || '').trim()
  if (bankCard) rows = rows.filter((r) => String(r.bankCard || '').includes(bankCard))

  const statusKey = String(searchForm.status || '').trim()
  if (statusKey) {
    const label = statusMap[statusKey] || statusKey
    rows = rows.filter((r) => String(r.status || '') === label)
  }

  return rows
})

const handleSearch = () => {
  console.log('Search:', searchForm)
}

// 审核弹窗逻辑
const auditDialogVisible = ref(false)
const currentAuditItem = ref(null)
const auditForm = reactive({
  result: 'pass'
})

const handleAudit = (item) => {
  if (isMyBankcardPage.value) return
  currentAuditItem.value = { ...item }
  auditForm.result = 'pass' // 默认选中通过
  auditDialogVisible.value = true
}

const submitAudit = () => {
  console.log('Submit Audit:', {
    item: currentAuditItem.value,
    result: auditForm.result
  })
  auditDialogVisible.value = false
}

const goDetail = (item) => {
  router.push({ path: '/fund/bankcard-detail', query: { id: String(item?.bankCard || ''), from: route.path } })
}

const goAddBankcard = () => {
  router.push({ path: '/fund/bankcard-add', query: { from: route.path } })
}

const formatType = (item) => {
  const raw = String(item?.bankType || item?.cardType || '').trim()
  if (raw) {
    if (raw === 'Pcard') return 'pcard'
    if (raw === 'Bank') return 'bank'
    if (raw === 'USDT_TRC20') return 'usdt_trc20'
    if (raw === 'USDT_ERC20') return 'usdt_erc20'
    return raw.toLowerCase()
  }
  const cardNo = String(item?.bankCard || '')
  if (cardNo.startsWith('T')) return 'usdt_trc20'
  if (cardNo) return 'bank'
  return '-'
}

const statusTagClass = (status) => {
  if (status === '已审核') return 'bg-emerald-50 text-emerald-700 border-emerald-200'
  if (status === '已拒绝') return 'bg-rose-50 text-rose-700 border-rose-200'
  return 'bg-gray-100 text-gray-600 border-gray-200'
}

const handleEdit = () => {
  ElMessage.info('修改（演示）')
}

const handleDelete = async (item) => {
  await ElMessageBox.confirm('确认删除该银行卡绑定？（演示）', '删除确认', { type: 'warning', confirmButtonText: '删除', cancelButtonText: '取消' })
  tableData.value = tableData.value.filter((r) => r !== item)
  ElMessage.success('已删除（演示）')
}
</script>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #e5e7eb;
  border-radius: 10px;
}
.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: #d1d5db;
}
</style>
