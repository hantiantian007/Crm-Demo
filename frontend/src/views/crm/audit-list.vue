<template>
  <div class="flex flex-col min-w-0 w-full h-full">
    <div class="flex-1 min-w-0 overflow-y-auto custom-scrollbar">
      <div class="space-y-4">
        <section class="bg-white rounded-xl border border-gray-200 p-5">
          <div class="flex items-start justify-between gap-4">
            <div>
              <div class="text-xl font-bold text-gray-900">开户审核</div>
              <div class="text-sm text-gray-500 mt-1">查看开户申请并进行审核/拒绝（演示数据）</div>
            </div>
            <div class="hidden md:flex items-center gap-2 text-xs text-gray-500">
              <span class="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-50 border border-gray-200">
                <span class="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                待审核
              </span>
              <span class="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-50 border border-gray-200">
                <span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                已开户
              </span>
              <span class="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-50 border border-gray-200">
                <span class="w-1.5 h-1.5 rounded-full bg-red-500"></span>
                已拒绝
              </span>
            </div>
          </div>
        </section>

        <section class="bg-white rounded-xl border border-gray-200 p-5">
          <div class="text-sm font-semibold text-gray-700 mb-4">搜索</div>
          <div class="grid grid-cols-1 md:grid-cols-12 gap-4">
            <div class="md:col-span-3">
              <label class="block text-xs text-gray-500 mb-2">真实姓名</label>
              <input
                v-model.trim="form.realName"
                class="h-9 w-full rounded-md border border-gray-200 bg-white px-3 text-xs text-gray-700 outline-none focus:border-[#C19B5E] focus:ring-2 focus:ring-[#C19B5E]/10"
                placeholder="请输入"
              />
            </div>
            <div class="md:col-span-3">
              <label class="block text-xs text-gray-500 mb-2">邮箱</label>
              <input
                v-model.trim="form.email"
                class="h-9 w-full rounded-md border border-gray-200 bg-white px-3 text-xs text-gray-700 outline-none focus:border-[#C19B5E] focus:ring-2 focus:ring-[#C19B5E]/10"
                placeholder="请输入"
              />
            </div>
            <div class="md:col-span-3">
              <label class="block text-xs text-gray-500 mb-2">手机</label>
              <input
                v-model.trim="form.phone"
                class="h-9 w-full rounded-md border border-gray-200 bg-white px-3 text-xs text-gray-700 outline-none focus:border-[#C19B5E] focus:ring-2 focus:ring-[#C19B5E]/10"
                placeholder="请输入"
              />
            </div>
            <div class="md:col-span-3">
              <label class="block text-xs text-gray-500 mb-2">审核状态</label>
              <select
                v-model="form.status"
                class="h-9 w-full rounded-md border border-gray-200 bg-white px-3 text-xs text-gray-700 outline-none focus:border-[#C19B5E] focus:ring-2 focus:ring-[#C19B5E]/10"
              >
                <option value="">全部</option>
                <option value="opened">已开户</option>
                <option value="pending">未审核</option>
                <option value="rejected">已拒绝</option>
              </select>
            </div>
            <div class="md:col-span-3">
              <label class="block text-xs text-gray-500 mb-2">账户类型</label>
              <select
                v-model="form.accountType"
                class="h-9 w-full rounded-md border border-gray-200 bg-white px-3 text-xs text-gray-700 outline-none focus:border-[#C19B5E] focus:ring-2 focus:ring-[#C19B5E]/10"
              >
                <option value="">全部</option>
                <option value="standard">标准账户</option>
                <option value="cent">美分账户</option>
              </select>
            </div>

            <div class="md:col-span-9 flex items-center gap-3">
              <button class="h-9 px-6 rounded-md bg-primary hover:bg-primaryHover text-white text-sm font-medium transition-colors" type="button" @click="handleSearch">
                搜索
              </button>
              <button class="h-9 px-6 rounded-md bg-gray-100 hover:bg-gray-200 text-gray-600 text-sm font-medium transition-colors" type="button" @click="handleReset">
                重置
              </button>
            </div>
          </div>
        </section>

        <section class="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div class="overflow-x-auto">
            <table class="min-w-[1200px] w-full text-xs">
              <thead class="bg-white text-gray-500">
                <tr class="border-b border-gray-100">
                  <th class="text-left font-medium px-5 py-4 whitespace-nowrap w-[160px]">真实姓名</th>
                  <th class="text-left font-medium px-5 py-4 whitespace-nowrap w-[220px]">邮箱</th>
                  <th class="text-left font-medium px-5 py-4 whitespace-nowrap w-[140px]">手机</th>
                  <th class="text-left font-medium px-5 py-4 whitespace-nowrap w-[120px]">MT账号</th>
                  <th class="text-left font-medium px-5 py-4 whitespace-nowrap w-[260px]">组</th>
                  <th class="text-left font-medium px-5 py-4 whitespace-nowrap w-[120px]">账户类型</th>
                  <th class="text-left font-medium px-5 py-4 whitespace-nowrap w-[110px]">杠杆</th>
                  <th class="text-left font-medium px-5 py-4 whitespace-nowrap w-[160px]">申请时间</th>
                  <th class="text-left font-medium px-5 py-4 whitespace-nowrap w-[160px]">处理时间</th>
                  <th class="text-left font-medium px-5 py-4 whitespace-nowrap w-[120px]">状态</th>
                  <th class="text-right font-medium px-5 py-4 whitespace-nowrap w-[220px]">操作</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-100 text-sm">
                <tr
                  v-for="row in pagedRows"
                  :key="row.id"
                  class="hover:bg-gray-50 transition-colors"
                  :class="row.status === 'rejected' ? 'bg-red-50/30' : row.accountType === 'cent' && row.status === 'pending' ? 'bg-red-50/10' : ''"
                >
                  <td class="px-5 py-4 align-top text-gray-900 font-medium">{{ row.realName }}</td>
                  <td class="px-5 py-4 align-top text-gray-700">{{ row.email }}</td>
                  <td class="px-5 py-4 align-top text-gray-700">{{ row.phone }}</td>
                  <td class="px-5 py-4 align-top text-gray-900">{{ row.mtAccount }}</td>
                  <td class="px-5 py-4 align-top text-gray-700">{{ row.group }}</td>
                  <td class="px-5 py-4 align-top">
                    <span class="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium border" :class="accountTypeBadgeClass(row.accountType)">
                      {{ row.accountType === 'cent' ? '美分账户' : '标准账户' }}
                    </span>
                  </td>
                  <td class="px-5 py-4 align-top text-gray-700">{{ row.leverage }}</td>
                  <td class="px-5 py-4 align-top text-gray-500">{{ row.applyTime }}</td>
                  <td class="px-5 py-4 align-top text-gray-500">{{ row.handleTime || '-' }}</td>
                  <td class="px-5 py-4 align-top">
                    <span class="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium border" :class="statusBadgeClass(row.status)">
                      <span class="w-1.5 h-1.5 rounded-full mr-1.5" :class="statusDotClass(row.status)"></span>
                      {{ statusLabel(row.status) }}
                    </span>
                  </td>
                  <td class="px-5 py-4 align-top text-right">
                    <div v-if="row.status === 'pending'" class="flex items-center justify-end gap-2">
                      <button class="px-3 py-1.5 bg-primary hover:bg-primaryHover text-white rounded text-xs font-medium transition-colors shadow-sm" type="button" @click="goAudit(row)">
                        审核
                      </button>
                      <button class="px-3 py-1.5 bg-white border border-red-300 text-red-500 hover:bg-red-50 rounded text-xs font-medium transition-colors shadow-sm" type="button" @click="openReject(row)">
                        拒绝
                      </button>
                    </div>
                    <div v-else-if="row.status === 'opened'" class="flex items-center justify-end">
                      <button class="px-3 py-1.5 bg-white border border-[#C19B5E] text-[#C19B5E] hover:bg-[#C19B5E]/10 rounded text-xs font-medium transition-colors shadow-sm" type="button" @click="openResend(row)">
                        重发开户信息
                      </button>
                    </div>
                    <span v-else class="text-xs text-gray-400">-</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div v-if="filteredRows.length === 0" class="py-16 flex flex-col items-center justify-center text-gray-400">
            <div class="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mb-4">
              <i class="fa-regular fa-folder-open text-3xl text-gray-300"></i>
            </div>
            <div class="text-sm">无匹配数据</div>
          </div>

          <div class="px-5 py-4 border-t border-gray-100 flex flex-col md:flex-row md:items-center md:justify-end gap-3 text-sm text-gray-500">
            <div class="md:mr-auto">共 {{ filteredRows.length }} 条</div>
            <div class="flex items-center gap-1">
              <button class="w-8 h-8 flex items-center justify-center rounded hover:bg-gray-100 text-gray-500 disabled:text-gray-300 disabled:hover:bg-transparent" type="button" :disabled="page <= 1" @click="page--">
                <i class="fa-solid fa-chevron-left text-xs"></i>
              </button>
              <button
                v-for="p in pageButtons"
                :key="p"
                class="w-8 h-8 flex items-center justify-center rounded hover:bg-gray-100"
                :class="p === page ? 'bg-red-100 text-red-500 font-medium hover:bg-red-100' : ''"
                type="button"
                @click="page = p"
              >
                {{ p }}
              </button>
              <button class="w-8 h-8 flex items-center justify-center rounded hover:bg-gray-100 text-gray-500 disabled:text-gray-300 disabled:hover:bg-transparent" type="button" :disabled="page >= pageCount" @click="page++">
                <i class="fa-solid fa-chevron-right text-xs"></i>
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  </div>

  <div v-if="rejectModal.visible" class="fixed inset-0 z-[100] flex items-center justify-center p-6">
    <div class="absolute inset-0 bg-black/50 backdrop-blur-sm" @click="closeReject"></div>
    <div class="relative w-full max-w-lg bg-white rounded-xl shadow-2xl overflow-hidden">
      <div class="bg-gray-50 px-6 py-4 border-b border-gray-100 flex justify-between items-center">
        <h3 class="text-lg font-bold text-gray-900">拒绝申请</h3>
        <button class="text-gray-400 hover:text-gray-600 transition-colors" type="button" @click="closeReject">
          <i class="fa-solid fa-xmark text-lg"></i>
        </button>
      </div>
      <div class="p-6">
        <div class="bg-gray-50 rounded-lg border border-gray-200 p-4 text-sm">
          <div class="text-gray-500">申请人：<span class="text-gray-900 font-medium">{{ rejectModal.row?.realName || '-' }}</span></div>
          <div class="text-gray-500 mt-1">MT账号：<span class="text-gray-900 font-medium">{{ rejectModal.row?.mtAccount || '-' }}</span></div>
        </div>
        <div class="mt-4">
          <label class="block text-xs font-medium text-gray-700 mb-2">拒绝原因 <span class="text-red-500">*</span></label>
          <textarea
            v-model.trim="rejectModal.reason"
            rows="3"
            class="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-red-400 focus:ring-2 focus:ring-red-400/10"
            placeholder="请输入拒绝原因"
          ></textarea>
          <div v-if="rejectModal.error" class="text-xs text-red-500 mt-2">{{ rejectModal.error }}</div>
        </div>
      </div>
      <div class="px-6 py-4 bg-gray-50 border-t border-gray-100 flex justify-end gap-3">
        <button class="px-5 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-200 rounded-lg text-sm font-medium transition-colors" type="button" @click="closeReject">
          取消
        </button>
        <button class="px-6 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg text-sm font-bold shadow-sm transition-colors" type="button" @click="confirmReject">
          确认拒绝
        </button>
      </div>
    </div>
  </div>

  <div v-if="resendModal.visible" class="fixed inset-0 z-[100] flex items-center justify-center p-6">
    <div class="absolute inset-0 bg-black/50 backdrop-blur-sm" @click="closeResend"></div>
    <div class="relative w-full max-w-md bg-white rounded-xl shadow-2xl overflow-hidden">
      <div class="bg-gray-50 px-6 py-4 border-b border-gray-100 flex justify-between items-center">
        <h3 class="text-lg font-bold text-gray-900">重发开户信息</h3>
        <button class="text-gray-400 hover:text-gray-600 transition-colors" type="button" @click="closeResend">
          <i class="fa-solid fa-xmark text-lg"></i>
        </button>
      </div>
      <div class="p-6 text-sm text-gray-700">
        已模拟向 <span class="font-medium text-gray-900">{{ resendModal.row?.email || '-' }}</span> 重发开户信息。
      </div>
      <div class="px-6 py-4 bg-gray-50 border-t border-gray-100 flex justify-end">
        <button class="px-6 py-2 bg-primary hover:bg-primaryHover text-white rounded-lg text-sm font-bold shadow-sm transition-colors" type="button" @click="closeResend">
          我知道了
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const form = reactive({
  realName: '',
  email: '',
  phone: '',
  status: '',
  accountType: ''
})

const page = ref(1)
const pageSize = 10

const rows = ref([
  {
    id: 'A-20260609-0001',
    realName: '测试-孙舟',
    email: 'test-user01@demo.com',
    phone: '137****9682',
    mtAccount: '8300256',
    group: 'real\\HATC\\Inland\\Test\\Stan',
    accountType: 'standard',
    leverage: '1:100',
    applyTime: '2026-06-09 16:45:06',
    handleTime: '2026-06-09 16:45:07',
    status: 'opened',
    rejectReason: '',
    auditor: 'Olivia'
  },
  {
    id: 'A-20260609-0002',
    realName: '测试-孙舟',
    email: 'test-user01@demo.com',
    phone: '137****9682',
    mtAccount: '8100459',
    group: 'real\\HATC\\Inland\\Test\\Stan',
    accountType: 'standard',
    leverage: '1:100',
    applyTime: '2026-06-09 16:45:00',
    handleTime: '',
    status: 'pending',
    rejectReason: '',
    auditor: ''
  },
  {
    id: 'A-20260608-0003',
    realName: 'test-杨均',
    email: 'b13@qq.com',
    phone: '136****0921',
    mtAccount: '9900456',
    group: 'real\\HATC\\Inland\\Test\\Cent',
    accountType: 'cent',
    leverage: '1:100',
    applyTime: '2026-06-08 15:08:50',
    handleTime: '',
    status: 'pending',
    rejectReason: '',
    auditor: ''
  },
  {
    id: 'A-20260608-0004',
    realName: 'test-蒋为',
    email: 'b11@qq.com',
    phone: '135****5079',
    mtAccount: '8100456',
    group: 'real\\HATC\\Inland\\Test\\Stan',
    accountType: 'standard',
    leverage: '1:100',
    applyTime: '2026-06-08 15:02:11',
    handleTime: '',
    status: 'pending',
    rejectReason: '',
    auditor: ''
  }
])

const handleSearch = () => {
  page.value = 1
}

const handleReset = () => {
  form.realName = ''
  form.email = ''
  form.phone = ''
  form.status = ''
  form.accountType = ''
  page.value = 1
}

const filteredRows = computed(() => {
  const keyword = (v) => String(v || '').toLowerCase()
  return rows.value.filter((r) => {
    if (form.realName && !keyword(r.realName).includes(keyword(form.realName))) return false
    if (form.email && !keyword(r.email).includes(keyword(form.email))) return false
    if (form.phone && !keyword(r.phone).includes(keyword(form.phone))) return false
    if (form.status && r.status !== form.status) return false
    if (form.accountType && r.accountType !== form.accountType) return false
    return true
  })
})

const pageCount = computed(() => Math.max(1, Math.ceil(filteredRows.value.length / pageSize)))

const pagedRows = computed(() => {
  const start = (page.value - 1) * pageSize
  return filteredRows.value.slice(start, start + pageSize)
})

const pageButtons = computed(() => {
  const total = pageCount.value
  const current = Math.min(Math.max(1, page.value), total)
  const result = []
  const start = Math.max(1, current - 1)
  const end = Math.min(total, start + 4)
  const realStart = Math.max(1, end - 4)
  for (let p = realStart; p <= end; p++) result.push(p)
  return result
})

const statusLabel = (status) => {
  if (status === 'opened') return '已开户'
  if (status === 'pending') return '未审核'
  if (status === 'rejected') return '已拒绝'
  return '-'
}

const statusDotClass = (status) => {
  if (status === 'opened') return 'bg-emerald-500'
  if (status === 'pending') return 'bg-amber-400'
  if (status === 'rejected') return 'bg-red-500'
  return 'bg-gray-300'
}

const statusBadgeClass = (status) => {
  if (status === 'opened') return 'bg-emerald-50 text-emerald-700 border-emerald-200'
  if (status === 'pending') return 'bg-amber-50 text-amber-700 border-amber-200'
  if (status === 'rejected') return 'bg-red-50 text-red-700 border-red-200'
  return 'bg-gray-50 text-gray-600 border-gray-200'
}

const accountTypeBadgeClass = (type) => {
  if (type === 'cent') return 'bg-red-50 text-red-600 border-red-200'
  return 'bg-gray-50 text-gray-700 border-gray-200'
}

const goAudit = (row) => {
  router.push({ path: '/crm/audit', query: { id: row.id } })
}

const rejectModal = reactive({
  visible: false,
  row: null,
  reason: '',
  error: ''
})

const openReject = (row) => {
  rejectModal.visible = true
  rejectModal.row = row
  rejectModal.reason = ''
  rejectModal.error = ''
}

const closeReject = () => {
  rejectModal.visible = false
  rejectModal.row = null
  rejectModal.reason = ''
  rejectModal.error = ''
}

const confirmReject = () => {
  if (!rejectModal.reason) {
    rejectModal.error = '请输入拒绝原因'
    return
  }
  const target = rows.value.find((x) => x.id === rejectModal.row?.id)
  if (target) {
    target.status = 'rejected'
    target.rejectReason = rejectModal.reason
    target.handleTime = new Date().toISOString().slice(0, 19).replace('T', ' ')
    target.auditor = 'Olivia'
  }
  closeReject()
}

const resendModal = reactive({
  visible: false,
  row: null
})

const openResend = (row) => {
  resendModal.visible = true
  resendModal.row = row
}

const closeResend = () => {
  resendModal.visible = false
  resendModal.row = null
}
</script>
