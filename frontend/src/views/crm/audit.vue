<template>
  <div class="flex flex-col min-w-0 w-full h-full">
    <div class="flex-1 min-w-0 overflow-y-auto custom-scrollbar">
      <div class="space-y-4">
        <section class="bg-white rounded-xl border border-gray-200 p-5">
          <div class="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
            <div>
              <div class="text-xl font-bold text-gray-900">开户审核详情</div>
              <div class="text-sm text-gray-500 mt-1">对开户申请进行审核并配置 MT 组与杠杆（演示数据）</div>
            </div>
            <div class="flex items-center gap-2">
              <span class="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium border" :class="statusBadgeClass(auditItem.status)">
                <span class="w-1.5 h-1.5 rounded-full mr-1.5" :class="statusDotClass(auditItem.status)"></span>
                {{ statusLabel(auditItem.status) }}
              </span>
              <button class="h-8 px-3 rounded bg-gray-100 hover:bg-gray-200 text-gray-600 text-xs font-medium transition-colors" type="button" @click="goBack">
                返回列表
              </button>
            </div>
          </div>
        </section>

        <section class="bg-white rounded-xl border border-gray-200 p-6 md:p-8">
          <div class="overflow-hidden rounded-lg border border-gray-100">
            <table class="w-full text-sm">
              <tbody class="divide-y divide-gray-100">
                <tr>
                  <td class="w-[14%] bg-gray-50 px-6 py-4 text-gray-500">邮箱</td>
                  <td class="w-[36%] px-6 py-4 text-gray-900 font-medium">{{ auditItem.email }}</td>
                  <td class="w-[14%] bg-gray-50 px-6 py-4 text-gray-500">地区</td>
                  <td class="w-[36%] px-6 py-4 text-gray-900 font-medium">{{ auditItem.region }}</td>
                </tr>
                <tr>
                  <td class="bg-gray-50 px-6 py-4 text-gray-500">真实姓名</td>
                  <td class="px-6 py-4 text-gray-900 font-medium">{{ auditItem.realName }}</td>
                  <td class="bg-gray-50 px-6 py-4 text-gray-500">证件号码</td>
                  <td class="px-6 py-4 text-gray-900 font-medium">{{ auditItem.idNumberMasked }}</td>
                </tr>
                <tr>
                  <td class="bg-gray-50 px-6 py-4 text-gray-500 align-top">身份证正面</td>
                  <td class="px-6 py-4">
                    <img :src="auditItem.idFrontImg" alt="身份证正面" class="h-28 w-40 rounded border border-gray-200 object-cover" />
                  </td>
                  <td class="bg-gray-50 px-6 py-4 text-gray-500 align-top">身份证反面</td>
                  <td class="px-6 py-4">
                    <img :src="auditItem.idBackImg" alt="身份证反面" class="h-28 w-40 rounded border border-gray-200 object-cover" />
                  </td>
                </tr>
                <tr>
                  <td class="bg-gray-50 px-6 py-4 text-gray-500">手机</td>
                  <td class="px-6 py-4 text-gray-900 font-medium">{{ auditItem.phoneMasked }}</td>
                  <td class="bg-gray-50 px-6 py-4 text-gray-500">推荐人</td>
                  <td class="px-6 py-4 text-gray-900 font-medium">{{ auditItem.referrer }}</td>
                </tr>
                <tr>
                  <td class="bg-gray-50 px-6 py-4 text-gray-500">申请编号</td>
                  <td class="px-6 py-4 text-gray-900 font-medium">{{ auditItem.id }}</td>
                  <td class="bg-gray-50 px-6 py-4 text-gray-500">MT账号</td>
                  <td class="px-6 py-4 text-gray-900 font-medium">{{ auditItem.mtAccount || '-' }}</td>
                </tr>
                <tr>
                  <td class="bg-gray-50 px-6 py-4 text-gray-500">申请时间</td>
                  <td class="px-6 py-4 text-gray-500">{{ auditItem.applyTime }}</td>
                  <td class="bg-gray-50 px-6 py-4 text-gray-500">处理时间</td>
                  <td class="px-6 py-4 text-gray-500">{{ auditItem.handleTime || '-' }}</td>
                </tr>
                <tr>
                  <td class="bg-gray-50 px-6 py-4 text-gray-500 change-highlight">MT类型</td>
                  <td class="px-6 py-4">
                    <span class="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold border" :class="mtTypePillClass(auditItem.mtType)">
                      <span class="w-2 h-2 rounded-full" :class="auditItem.mtType === 'cent' ? 'bg-emerald-500' : 'bg-slate-500'"></span>
                      {{ auditItem.mtType === 'cent' ? '美分账户' : '标准账户' }}
                    </span>
                  </td>
                  <td class="bg-gray-50 px-6 py-4 text-gray-500">备注</td>
                  <td class="px-6 py-4">
                    <div class="flex flex-col md:flex-row md:items-center gap-3">
                      <span class="text-gray-900 font-medium">{{ auditItem.remark || '暂无备注' }}</span>
                      <button class="px-3 py-1 border border-blue-300 text-blue-500 text-xs rounded hover:bg-blue-50 transition-colors w-fit" type="button" @click="openRemark">
                        修改备注
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div class="flex flex-col md:flex-row items-stretch md:items-center justify-center gap-3 pt-6">
            <button
              class="h-10 px-8 bg-primary hover:bg-primaryHover text-white font-medium rounded shadow-sm transition-colors text-sm disabled:opacity-50 disabled:cursor-not-allowed"
              type="button"
              :disabled="auditItem.status !== 'pending'"
              @click="openAuditModal"
            >
              审核
            </button>
            <button
              class="h-10 px-8 bg-white border border-red-300 text-red-500 hover:bg-red-50 font-medium rounded shadow-sm transition-colors text-sm disabled:opacity-50 disabled:cursor-not-allowed"
              type="button"
              :disabled="auditItem.status !== 'pending'"
              @click="openRejectModal"
            >
              拒绝
            </button>
          </div>

          <div v-if="auditItem.status === 'rejected' && auditItem.rejectReason" class="mt-6 rounded-lg border border-red-200 bg-red-50/50 p-4 text-sm text-red-700">
            <div class="font-semibold">拒绝原因</div>
            <div class="mt-1">{{ auditItem.rejectReason }}</div>
          </div>
        </section>

        <section class="bg-white rounded-xl border border-gray-200 p-6">
          <div class="flex items-center justify-between gap-4 mb-4">
            <h3 class="text-base font-bold text-gray-900">申请记录</h3>
            <div class="text-xs text-gray-500">同一邮箱的历史申请（演示）</div>
          </div>

          <div class="overflow-x-auto">
            <table class="min-w-[1100px] w-full text-xs">
              <thead class="text-gray-500 bg-gray-50 border-b border-gray-200">
                <tr>
                  <th class="px-4 py-3 font-medium text-left w-[140px]">姓名</th>
                  <th class="px-4 py-3 font-medium text-left w-[240px]">邮箱</th>
                  <th class="px-4 py-3 font-medium text-left w-[140px]">电话</th>
                  <th class="px-4 py-3 font-medium text-left w-[120px]">MT账号</th>
                  <th class="px-4 py-3 font-medium text-left w-[240px]">分组</th>
                  <th class="px-4 py-3 font-medium text-left w-[120px]">MT类型</th>
                  <th class="px-4 py-3 font-medium text-left w-[110px]">杠杆</th>
                  <th class="px-4 py-3 font-medium text-left w-[110px]">审核状态</th>
                  <th class="px-4 py-3 font-medium text-left w-[180px]">拒绝原因</th>
                  <th class="px-4 py-3 font-medium text-left w-[100px]">审核人</th>
                  <th class="px-4 py-3 font-medium text-left w-[160px]">申请时间</th>
                  <th class="px-4 py-3 font-medium text-left w-[160px]">处理时间</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-100 text-sm">
                <tr v-for="r in historyRows" :key="r.id" class="hover:bg-gray-50/50">
                  <td class="px-4 py-3 text-gray-900 font-medium">{{ r.realName }}</td>
                  <td class="px-4 py-3 text-gray-700">{{ r.email }}</td>
                  <td class="px-4 py-3 text-gray-700">{{ r.phoneMasked }}</td>
                  <td class="px-4 py-3 text-gray-900">{{ r.mtAccount || '-' }}</td>
                  <td class="px-4 py-3 text-gray-700">{{ r.group || '-' }}</td>
                  <td class="px-4 py-3">
                    <span class="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium border" :class="r.mtType === 'cent' ? 'bg-red-50 text-red-600 border-red-200' : 'bg-gray-50 text-gray-700 border-gray-200'">
                      {{ r.mtType === 'cent' ? '美分账户' : '标准账户' }}
                    </span>
                  </td>
                  <td class="px-4 py-3 text-gray-700">{{ r.leverage || '-' }}</td>
                  <td class="px-4 py-3">
                    <span class="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium border" :class="statusBadgeClass(r.status)">
                      <span class="w-1.5 h-1.5 rounded-full mr-1.5" :class="statusDotClass(r.status)"></span>
                      {{ statusLabel(r.status) }}
                    </span>
                  </td>
                  <td class="px-4 py-3 text-gray-600">{{ r.rejectReason || '-' }}</td>
                  <td class="px-4 py-3 text-gray-600">{{ r.auditor || '-' }}</td>
                  <td class="px-4 py-3 text-gray-500">{{ r.applyTime }}</td>
                  <td class="px-4 py-3 text-gray-500">{{ r.handleTime || '-' }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  </div>

  <div v-if="auditModal.visible" class="fixed inset-0 z-[100] flex items-center justify-center p-6">
    <div class="absolute inset-0 bg-black/50 backdrop-blur-sm" @click="closeAuditModal"></div>
    <div class="relative w-full max-w-3xl bg-white rounded-xl shadow-2xl overflow-hidden">
      <div class="flex items-center justify-between px-6 md:px-8 py-5 border-b border-gray-200 bg-gray-50">
        <h3 class="text-[15px] font-bold text-gray-700">客户资料审核</h3>
        <button class="text-gray-400 hover:text-gray-600 transition-colors" type="button" @click="closeAuditModal">
          <i class="fa-solid fa-xmark text-lg"></i>
        </button>
      </div>

      <div class="px-6 md:px-8 py-6">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 text-sm mb-6">
          <div class="flex items-center gap-2">
            <span class="text-gray-500 font-medium">客户信息：</span>
            <span class="text-gray-700 font-semibold">{{ auditItem.realName }}</span>
          </div>
          <div class="flex items-center gap-2">
            <span class="text-gray-500 font-medium">邮箱：</span>
            <span class="text-[#8AA0B8] font-semibold">{{ auditItem.email }}</span>
          </div>

          <div>
            <label class="block text-gray-500 font-medium mb-2">用户类型：</label>
            <select v-model="auditModal.form.userType" class="w-full h-10 px-3 rounded-lg border border-gray-300 outline-none focus:border-[#C19B5E] focus:ring-2 focus:ring-[#C19B5E]/10 text-sm text-gray-700 bg-white">
              <option value="agent">代理</option>
              <option value="normal">普通用户</option>
            </select>
          </div>
          <div>
            <label class="block text-gray-500 font-medium mb-2">账户属性：</label>
            <select v-model="auditModal.form.accountAttr" class="w-full h-10 px-3 rounded-lg border border-gray-300 outline-none focus:border-[#C19B5E] focus:ring-2 focus:ring-[#C19B5E]/10 text-sm text-gray-700 bg-white">
              <option value="demo">模拟账户</option>
              <option value="real">真实账户</option>
            </select>
          </div>

          <div>
            <label class="block text-gray-500 font-medium mb-2">杠杆比例：</label>
            <select v-model="auditModal.form.leverage" class="w-full h-10 px-3 rounded-lg border border-gray-300 outline-none focus:border-[#C19B5E] focus:ring-2 focus:ring-[#C19B5E]/10 text-sm text-gray-700 bg-white">
              <option value="1:50">1:50</option>
              <option value="1:100">1:100</option>
              <option value="1:200">1:200</option>
            </select>
          </div>
          <div>
            <label class="block text-gray-500 font-medium mb-2">MT类型：</label>
            <select v-model="auditModal.form.mtType" class="w-full h-10 px-3 rounded-lg border border-gray-300 outline-none focus:border-[#C19B5E] focus:ring-2 focus:ring-[#C19B5E]/10 text-sm text-gray-700 bg-white" @change="syncTradeGroups">
              <option value="standard">标准账户</option>
              <option value="cent">美分账户</option>
            </select>
          </div>

          <div>
            <label class="block text-gray-500 font-medium mb-2">MT交易账号分组：</label>
            <select v-model="auditModal.form.mtTradeGroup" class="w-full h-10 px-3 rounded-lg border border-gray-300 outline-none focus:border-[#C19B5E] focus:ring-2 focus:ring-[#C19B5E]/10 text-sm text-gray-700 bg-white">
              <option v-for="g in availableTradeGroups" :key="g" :value="g">{{ g }}</option>
            </select>
          </div>
          <div>
            <label class="block text-gray-500 font-medium mb-2">MT佣金账号分组：</label>
            <select v-model="auditModal.form.mtCommissionGroup" class="w-full h-10 px-3 rounded-lg border border-gray-300 outline-none focus:border-[#C19B5E] focus:ring-2 focus:ring-[#C19B5E]/10 text-sm text-gray-700 bg-white">
              <option v-for="g in commissionGroups" :key="g" :value="g">{{ g }}</option>
            </select>
          </div>
        </div>

        <div class="text-center text-sm text-red-500 py-2">
          提示：开户申请前，请确认 MT 组和杠杆，账户申请生成后不能修改
        </div>
      </div>

      <div class="flex flex-col md:flex-row justify-end gap-3 px-6 md:px-8 py-4 border-t border-gray-200 bg-gray-50">
        <button class="h-10 px-6 border border-gray-300 rounded text-gray-600 bg-white hover:bg-gray-50 transition-colors" type="button" @click="closeAuditModal">
          关闭
        </button>
        <button class="h-10 px-6 rounded bg-red-500 hover:bg-red-600 text-white transition-colors" type="button" @click="openRejectModalFromAudit">
          拒绝
        </button>
        <button class="h-10 px-6 rounded bg-primary hover:bg-primaryHover text-white transition-colors" type="button" @click="handleApprove">
          保存并开户
        </button>
      </div>
    </div>
  </div>

  <div v-if="rejectModal.visible" class="fixed inset-0 z-[110] flex items-center justify-center p-6">
    <div class="absolute inset-0 bg-black/60 backdrop-blur-sm" @click="closeRejectModal"></div>
    <div class="relative w-full max-w-lg bg-white rounded-xl shadow-2xl overflow-hidden">
      <div class="bg-gray-50 px-6 py-4 border-b border-gray-100 flex justify-between items-center">
        <h3 class="text-lg font-bold text-gray-900">拒绝申请</h3>
        <button class="text-gray-400 hover:text-gray-600 transition-colors" type="button" @click="closeRejectModal">
          <i class="fa-solid fa-xmark text-lg"></i>
        </button>
      </div>
      <div class="p-6">
        <div class="bg-gray-50 rounded-lg border border-gray-200 p-4 text-sm">
          <div class="text-gray-500">申请人：<span class="text-gray-900 font-medium">{{ auditItem.realName }}</span></div>
          <div class="text-gray-500 mt-1">邮箱：<span class="text-gray-900 font-medium">{{ auditItem.email }}</span></div>
        </div>
        <div class="mt-4">
          <label class="block text-xs font-medium text-gray-700 mb-2">拒绝原因 <span class="text-red-500">*</span></label>
          <textarea v-model.trim="rejectModal.reason" rows="3" class="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-red-400 focus:ring-2 focus:ring-red-400/10" placeholder="请输入拒绝原因"></textarea>
          <div v-if="rejectModal.error" class="text-xs text-red-500 mt-2">{{ rejectModal.error }}</div>
        </div>
      </div>
      <div class="px-6 py-4 bg-gray-50 border-t border-gray-100 flex justify-end gap-3">
        <button class="px-5 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-200 rounded-lg text-sm font-medium transition-colors" type="button" @click="closeRejectModal">
          取消
        </button>
        <button class="px-6 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg text-sm font-bold shadow-sm transition-colors" type="button" @click="handleReject">
          确认拒绝
        </button>
      </div>
    </div>
  </div>

  <div v-if="remarkModal.visible" class="fixed inset-0 z-[110] flex items-center justify-center p-6">
    <div class="absolute inset-0 bg-black/50 backdrop-blur-sm" @click="closeRemark"></div>
    <div class="relative w-full max-w-lg bg-white rounded-xl shadow-2xl overflow-hidden">
      <div class="bg-gray-50 px-6 py-4 border-b border-gray-100 flex justify-between items-center">
        <h3 class="text-lg font-bold text-gray-900">修改备注</h3>
        <button class="text-gray-400 hover:text-gray-600 transition-colors" type="button" @click="closeRemark">
          <i class="fa-solid fa-xmark text-lg"></i>
        </button>
      </div>
      <div class="p-6">
        <label class="block text-xs font-medium text-gray-700 mb-2">备注</label>
        <textarea v-model.trim="remarkModal.value" rows="3" class="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-[#C19B5E] focus:ring-2 focus:ring-[#C19B5E]/10" placeholder="请输入备注"></textarea>
      </div>
      <div class="px-6 py-4 bg-gray-50 border-t border-gray-100 flex justify-end gap-3">
        <button class="px-5 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-200 rounded-lg text-sm font-medium transition-colors" type="button" @click="closeRemark">
          取消
        </button>
        <button class="px-6 py-2 bg-primary hover:bg-primaryHover text-white rounded-lg text-sm font-bold shadow-sm transition-colors" type="button" @click="saveRemark">
          保存
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, reactive, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const nowText = () => new Date().toISOString().slice(0, 19).replace('T', ' ')

const allRows = ref([
  {
    id: 'A-20260609-0001',
    realName: '测试-孙舟',
    email: 'test-user01@demo.com',
    phoneMasked: '137****9682',
    region: '中国',
    idNumberMasked: '21010219950316****',
    idFrontImg: 'https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=realistic%20identity%20document%20front%20photo%20on%20desk%2C%20compliance%20review%20mockup%2C%20sensitive%20information%20blurred%2C%20clean%20office%20lighting%2C%20photorealistic&image_size=portrait_4_3',
    idBackImg: 'https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=realistic%20identity%20document%20back%20photo%20on%20desk%2C%20compliance%20review%20mockup%2C%20sensitive%20information%20blurred%2C%20clean%20office%20lighting%2C%20photorealistic&image_size=portrait_4_3',
    referrer: 'test-刘测试 (ref-demo01@qq.com)',
    mtType: 'cent',
    mtAccount: '9900456',
    group: 'real\\HATC\\Inland\\Test\\Cent',
    leverage: '1:100',
    applyTime: '2026-07-21 15:21:28',
    handleTime: '',
    status: 'pending',
    auditor: '',
    rejectReason: '',
    remark: ''
  },
  {
    id: 'A-20260719-0008',
    realName: '测试-孙舟',
    email: 'test-user01@demo.com',
    phoneMasked: '137****9682',
    region: '中国',
    idNumberMasked: '21010219950316****',
    idFrontImg: 'https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=realistic%20identity%20document%20front%20photo%20on%20desk%2C%20compliance%20review%20mockup%2C%20sensitive%20information%20blurred%2C%20clean%20office%20lighting%2C%20photorealistic&image_size=portrait_4_3',
    idBackImg: 'https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=realistic%20identity%20document%20back%20photo%20on%20desk%2C%20compliance%20review%20mockup%2C%20sensitive%20information%20blurred%2C%20clean%20office%20lighting%2C%20photorealistic&image_size=portrait_4_3',
    referrer: 'test-刘测试 (ref-demo01@qq.com)',
    mtType: 'standard',
    mtAccount: '8300256',
    group: 'real\\HATC\\Inland\\Test\\Stan',
    leverage: '1:100',
    applyTime: '2026-07-19 09:32:16',
    handleTime: '2026-07-19 09:35:41',
    status: 'opened',
    auditor: 'Olivia',
    rejectReason: '',
    remark: ''
  }
])

const auditItem = ref(allRows.value[0])

const loadById = () => {
  const id = String(route.query.id || '')
  const found = allRows.value.find((x) => x.id === id)
  auditItem.value = found || allRows.value.find((x) => x.status === 'pending') || allRows.value[0]
}

watch(() => route.query.id, loadById, { immediate: true })

const historyRows = computed(() => allRows.value.filter((x) => x.email === auditItem.value.email))

const statusLabel = (status) => {
  if (status === 'opened') return '已开户'
  if (status === 'pending') return '待审核'
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

const mtTypePillClass = (type) => {
  if (type === 'cent') return 'text-emerald-700 bg-emerald-50 border-emerald-200'
  return 'text-slate-700 bg-slate-50 border-slate-200'
}

const goBack = () => {
  router.push('/crm/audit-list')
}

const auditModal = reactive({
  visible: false,
  form: {
    userType: 'agent',
    accountAttr: 'demo',
    leverage: '1:100',
    mtType: 'cent',
    mtTradeGroup: '',
    mtCommissionGroup: ''
  }
})

const commissionGroups = ['real\\HATC\\Test\\Agent', 'real\\HATC\\Agent\\Cent']
const tradeGroupsStandard = ['标准分组XXXXX', '标准分组YYYYY']
const tradeGroupsCent = ['美分分组XXXX', '美分分组ZZZZ']

const availableTradeGroups = computed(() => (auditModal.form.mtType === 'cent' ? tradeGroupsCent : tradeGroupsStandard))

const syncTradeGroups = () => {
  const options = availableTradeGroups.value
  if (!options.includes(auditModal.form.mtTradeGroup)) auditModal.form.mtTradeGroup = options[0] || ''
}

const openAuditModal = () => {
  auditModal.visible = true
  auditModal.form.userType = 'agent'
  auditModal.form.accountAttr = 'demo'
  auditModal.form.leverage = auditItem.value.leverage || '1:100'
  auditModal.form.mtType = auditItem.value.mtType || 'standard'
  auditModal.form.mtCommissionGroup = commissionGroups[0]
  syncTradeGroups()
}

const closeAuditModal = () => {
  auditModal.visible = false
}

const remarkModal = reactive({
  visible: false,
  value: ''
})

const openRemark = () => {
  remarkModal.visible = true
  remarkModal.value = auditItem.value.remark || ''
}

const closeRemark = () => {
  remarkModal.visible = false
  remarkModal.value = ''
}

const saveRemark = () => {
  auditItem.value.remark = remarkModal.value
  closeRemark()
}

const rejectModal = reactive({
  visible: false,
  reason: '',
  error: ''
})

const openRejectModal = () => {
  rejectModal.visible = true
  rejectModal.reason = ''
  rejectModal.error = ''
}

const openRejectModalFromAudit = () => {
  closeAuditModal()
  openRejectModal()
}

const closeRejectModal = () => {
  rejectModal.visible = false
  rejectModal.reason = ''
  rejectModal.error = ''
}

const handleApprove = () => {
  auditItem.value.status = 'opened'
  auditItem.value.handleTime = nowText()
  auditItem.value.auditor = 'Olivia'
  auditItem.value.mtType = auditModal.form.mtType
  auditItem.value.leverage = auditModal.form.leverage
  auditItem.value.group = auditModal.form.mtTradeGroup
  if (!auditItem.value.mtAccount) auditItem.value.mtAccount = auditModal.form.mtType === 'cent' ? '9900456' : '8300256'
  auditItem.value.rejectReason = ''
  closeAuditModal()
}

const handleReject = () => {
  if (!rejectModal.reason) {
    rejectModal.error = '请输入拒绝原因'
    return
  }
  auditItem.value.status = 'rejected'
  auditItem.value.handleTime = nowText()
  auditItem.value.auditor = 'Olivia'
  auditItem.value.rejectReason = rejectModal.reason
  closeRejectModal()
  closeAuditModal()
}
</script>
