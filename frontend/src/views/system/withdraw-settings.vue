<template>
  <div class="flex h-full bg-mainBg overflow-hidden">
    <div class="flex-1 flex flex-col min-w-0 bg-gray-50 overflow-hidden p-4 custom-scrollbar overflow-y-auto">
      <div class="flex-1 overflow-y-auto bg-gray-50 p-6">
        <div class="bg-white rounded-xl card-shadow border border-gray-100 overflow-hidden">
          <div class="px-6 py-4 border-b border-gray-100 flex items-center gap-3 flex-wrap">
            <div class="flex items-center gap-3 flex-1 min-w-0">
              <select
                v-model="filters.status"
                class="flex-shrink-0 w-28 px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primaryBtn/20 focus:border-primaryBtn transition-all bg-white"
              >
                <option value="enabled">启用</option>
                <option value="disabled">禁用</option>
                <option value="">全部</option>
              </select>

              <button
                type="button"
                class="inline-flex items-center gap-2 px-5 py-2 bg-primaryBtn hover:bg-primaryBtnHover text-white rounded-lg text-sm font-medium transition-colors shadow-sm"
                @click="openAddModal"
              >
                <i class="fa-solid fa-plus text-xs"></i>
                添加信息
              </button>

              <button
                type="button"
                class="inline-flex items-center gap-2 px-4 py-2 bg-white hover:bg-gray-50 text-gray-700 rounded-lg text-sm font-medium transition-colors border border-gray-200"
                @click="goConfigRecords"
              >
                <i class="fa-solid fa-clock-rotate-left text-xs"></i>
                配置记录
              </button>

              <div class="ml-auto text-sm text-gray-600 whitespace-nowrap">
                当前命中通道：<span class="font-semibold">{{ hitChannel?.currencyCode }}</span>
                <span class="text-red-500 font-semibold ml-1">{{ hitChannel?.payNo }}</span>
                <span class="ml-2">汇率：</span><span class="text-red-500 font-semibold">{{ hitChannel?.rate }}</span>
              </div>
            </div>
          </div>

          <div class="overflow-x-auto">
            <table class="w-full text-sm text-left min-w-[1200px]">
              <thead class="bg-tableHeader text-gray-600 border-b border-gray-200">
                <tr>
                  <th class="px-4 py-4 font-medium w-12"></th>
                  <th class="px-4 py-4 font-medium whitespace-nowrap">编号</th>
                  <th class="px-4 py-4 font-medium whitespace-nowrap">简称</th>
                  <th class="px-4 py-4 font-medium whitespace-nowrap">支付编号</th>
                  <th class="px-4 py-4 font-medium whitespace-nowrap">名称</th>
                  <th class="px-4 py-4 font-medium whitespace-nowrap">商户号</th>
                  <th class="px-4 py-4 font-medium whitespace-nowrap">AppId</th>
                  <th class="px-4 py-4 font-medium whitespace-nowrap">币种</th>
                  <th class="px-4 py-4 font-medium">提示语</th>
                  <th class="px-4 py-4 font-medium whitespace-nowrap text-right">汇率</th>
                  <th class="px-4 py-4 font-medium whitespace-nowrap text-center">汇率来源</th>
                  <th class="px-4 py-4 font-medium whitespace-nowrap text-center w-24">状态</th>
                  <th class="px-4 py-4 font-medium whitespace-nowrap text-center w-28">操作</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-100">
                <tr v-for="row in filteredRows" :key="row.id" class="hover:bg-gray-50/50 transition-colors">
                  <td class="px-4 py-3">
                    <button type="button" class="w-6 h-6 flex items-center justify-center rounded hover:bg-gray-100 transition-colors">
                      <i class="fa-solid fa-chevron-right text-[10px] text-red-400 transition-all"></i>
                    </button>
                  </td>
                  <td class="px-4 py-3 text-gray-500">{{ row.id }}</td>
                  <td class="px-4 py-3 font-medium text-gray-800">{{ row.shortName }}</td>
                  <td class="px-4 py-3 text-red-500 font-mono text-xs whitespace-nowrap">{{ row.payNo }}</td>
                  <td class="px-4 py-3 text-gray-700 whitespace-nowrap">{{ row.name }}</td>
                  <td class="px-4 py-3 text-gray-600 font-mono text-xs whitespace-nowrap">{{ row.merchantNo }}</td>
                  <td class="px-4 py-3 text-gray-600 font-mono text-[11px] whitespace-nowrap">{{ row.appId }}</td>
                  <td class="px-4 py-3 text-gray-700 whitespace-nowrap">{{ row.currency }}</td>
                  <td class="px-4 py-3 text-gray-500 text-xs min-w-[280px]">{{ row.hint }}</td>
                  <td class="px-4 py-3 text-gray-700 text-right font-mono whitespace-nowrap">{{ row.rate }}</td>
                  <td class="px-4 py-3 text-center whitespace-nowrap">
                    <span
                      class="inline-flex items-center px-2 py-1 text-[11px] font-medium rounded-full border"
                      :class="row.rateSource === 'api' ? 'bg-blue-50 text-blue-600 border-blue-100' : 'bg-emerald-50 text-emerald-600 border-emerald-100'"
                    >
                      {{ row.rateSource === 'api' ? '接口查询' : '页面配置' }}
                    </span>
                  </td>
                  <td class="px-4 py-3 text-center whitespace-nowrap">
                    <button
                      type="button"
                      class="px-3 py-1 text-xs font-medium rounded-full transition-colors"
                      :class="row.status === 'enabled' ? 'bg-emerald-50 text-emerald-600 hover:bg-emerald-100' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'"
                      @click="toggleStatus(row)"
                    >
                      {{ row.status === 'enabled' ? '启用' : '禁用' }}
                    </button>
                  </td>
                  <td class="px-4 py-3 text-center whitespace-nowrap">
                    <button type="button" class="text-blue-500 hover:text-blue-700 text-xs font-medium transition-colors" @click="openEditModal(row)">
                      修改
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div class="px-6 py-5 border-t border-gray-100 flex items-center justify-between">
            <div class="text-sm text-gray-500">
              共 <span class="font-medium text-gray-700">{{ filteredRows.length }}</span> 条记录
            </div>
            <div class="flex items-center gap-2">
              <button type="button" class="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 text-gray-400 hover:bg-gray-50 transition-colors text-sm">
                <i class="fa-solid fa-chevron-left text-[10px]"></i>
              </button>
              <button type="button" class="w-8 h-8 flex items-center justify-center rounded-lg bg-primaryBtn text-white text-sm font-medium shadow-sm">
                1
              </button>
              <button type="button" class="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 text-gray-400 hover:bg-gray-50 transition-colors text-sm">
                <i class="fa-solid fa-chevron-right text-[10px]"></i>
              </button>
            </div>
          </div>
        </div>

        <div v-show="isEditModalOpen" class="fixed inset-0 z-[100] bg-black/40 flex items-center justify-center px-4" @click.self="closeEditModal">
          <div class="w-full max-w-[760px] rounded-2xl bg-white border border-gray-200 shadow-2xl overflow-hidden">
            <div class="h-14 px-6 border-b border-gray-100 flex items-center justify-between">
              <div class="text-base font-semibold text-gray-800">{{ editingMode === 'add' ? '新增提现方式' : '修改提现方式' }}</div>
              <button type="button" class="text-gray-400 hover:text-gray-600" @click="closeEditModal">
                <i class="fa-solid fa-xmark text-lg"></i>
              </button>
            </div>

            <div class="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              <label class="block">
                <div class="text-xs text-gray-500 mb-2">简称</div>
                <input v-model="editForm.shortName" class="w-full h-10 px-3 border border-gray-200 rounded-lg text-sm bg-white" />
              </label>
              <label class="block">
                <div class="text-xs text-gray-500 mb-2">支付编号</div>
                <input v-model="editForm.payNo" class="w-full h-10 px-3 border border-gray-200 rounded-lg text-sm bg-white font-mono" />
              </label>
              <label class="block">
                <div class="text-xs text-gray-500 mb-2">名称</div>
                <input v-model="editForm.name" class="w-full h-10 px-3 border border-gray-200 rounded-lg text-sm bg-white" />
              </label>
              <label class="block">
                <div class="text-xs text-gray-500 mb-2">商户号</div>
                <input v-model="editForm.merchantNo" class="w-full h-10 px-3 border border-gray-200 rounded-lg text-sm bg-white font-mono" />
              </label>
              <label class="block">
                <div class="text-xs text-gray-500 mb-2">AppId</div>
                <input v-model="editForm.appId" class="w-full h-10 px-3 border border-gray-200 rounded-lg text-sm bg-white font-mono" />
              </label>
              <label class="block">
                <div class="text-xs text-gray-500 mb-2">币种</div>
                <select v-model="editForm.currency" class="w-full h-10 px-3 border border-gray-200 rounded-lg text-sm bg-white">
                  <option value="CNY(￥)">CNY(￥)</option>
                  <option value="HKD(HK$)">HKD(HK$)</option>
                  <option value="USDT($)">USDT($)</option>
                </select>
              </label>
              <label class="block md:col-span-2">
                <div class="text-xs text-gray-500 mb-2">提示语</div>
                <input v-model="editForm.hint" class="w-full h-10 px-3 border border-gray-200 rounded-lg text-sm bg-white" />
              </label>
              <label class="block">
                <div class="text-xs text-gray-500 mb-2">汇率</div>
                <input v-model="editForm.rate" class="w-full h-10 px-3 border border-gray-200 rounded-lg text-sm bg-white font-mono" />
              </label>
              <label class="block">
                <div class="text-xs text-gray-500 mb-2">汇率来源</div>
                <select v-model="editForm.rateSource" class="w-full h-10 px-3 border border-gray-200 rounded-lg text-sm bg-white">
                  <option value="page">页面配置</option>
                  <option value="api">接口查询</option>
                </select>
              </label>
              <label class="block">
                <div class="text-xs text-gray-500 mb-2">状态</div>
                <select v-model="editForm.status" class="w-full h-10 px-3 border border-gray-200 rounded-lg text-sm bg-white">
                  <option value="enabled">启用</option>
                  <option value="disabled">禁用</option>
                </select>
              </label>
              <label class="block">
                <div class="text-xs text-gray-500 mb-2">备注</div>
                <input v-model="editForm.remark" class="w-full h-10 px-3 border border-gray-200 rounded-lg text-sm bg-white" />
              </label>
            </div>

            <div class="px-6 py-4 border-t border-gray-100 bg-gray-50 flex items-center justify-end gap-2">
              <button type="button" class="h-10 px-4 rounded-lg bg-white border border-gray-200 text-gray-600 text-sm hover:bg-gray-50" @click="closeEditModal">
                取消
              </button>
              <button type="button" class="h-10 px-4 rounded-lg bg-primaryBtn hover:bg-primaryBtnHover text-white text-sm" @click="submitEdit">
                {{ editingMode === 'add' ? '提交' : '保存' }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { nowText, pushWithdrawLog, withdrawChannels } from '@/store/withdraw-config'

const router = useRouter()

const filters = ref({
  status: 'enabled'
})

const filteredRows = computed(() => {
  if (!filters.value.status) return withdrawChannels.value
  return withdrawChannels.value.filter((x) => x.status === filters.value.status)
})

const hitChannel = computed(() => {
  const candidates = withdrawChannels.value
    .filter((x) => x.status === 'enabled')
    .map((x) => ({
      currencyCode: String(x.currency || '').split('(')[0],
      payNo: x.payNo,
      rate: x.rate,
      rateNum: Number(x.rate || 0)
    }))
    .filter((x) => x.currencyCode === 'CNY')

  if (!candidates.length) {
    return { currencyCode: 'CNY', payNo: '-', rate: '-' }
  }

  candidates.sort((a, b) => b.rateNum - a.rateNum)
  const top = candidates[0]
  return { currencyCode: top.currencyCode, payNo: top.payNo, rate: top.rate }
})

const isEditModalOpen = ref(false)
const editingMode = ref('edit')
const editingId = ref(null)

const editForm = ref({
  shortName: '',
  payNo: '',
  name: '',
  merchantNo: '',
  appId: '',
  currency: 'CNY(￥)',
  hint: '',
  rate: '0',
  rateSource: 'page',
  status: 'enabled',
  remark: ''
})

const goConfigRecords = () => {
  router.push('/fund/withdraw-config-records')
}

const openAddModal = () => {
  editingMode.value = 'add'
  editingId.value = null
  editForm.value = {
    shortName: '',
    payNo: '',
    name: '',
    merchantNo: '',
    appId: '',
    currency: 'CNY(￥)',
    hint: '',
    rate: '0',
    rateSource: 'page',
    status: 'enabled',
    remark: ''
  }
  isEditModalOpen.value = true
}

const openEditModal = (row) => {
  editingMode.value = 'edit'
  editingId.value = row.id
  editForm.value = {
    shortName: row.shortName,
    payNo: row.payNo,
    name: row.name,
    merchantNo: row.merchantNo,
    appId: row.appId,
    currency: row.currency,
    hint: row.hint,
    rate: String(row.rate ?? ''),
    rateSource: row.rateSource,
    status: row.status,
    remark: ''
  }
  isEditModalOpen.value = true
}

const closeEditModal = () => {
  isEditModalOpen.value = false
}

const normalizeRateSource = (v) => (v === 'api' ? '接口查询' : '页面配置')
const normalizeStatus = (v) => (v === 'enabled' ? '启用' : '禁用')

const submitEdit = () => {
  if (editingMode.value === 'add') {
    const nextId = Math.max(...withdrawChannels.value.map((x) => Number(x.id) || 0)) + 1
    const item = {
      id: nextId,
      shortName: editForm.value.shortName || `W${nextId}`,
      payNo: editForm.value.payNo || `withdraw-${nextId}`,
      name: editForm.value.name || editForm.value.shortName || `W${nextId}`,
      merchantNo: editForm.value.merchantNo || '-',
      appId: editForm.value.appId || '-',
      currency: editForm.value.currency,
      hint: editForm.value.hint,
      rate: editForm.value.rate,
      rateSource: editForm.value.rateSource,
      status: editForm.value.status
    }
    withdrawChannels.value = [item, ...withdrawChannels.value]

    pushWithdrawLog({
      time: nowText(),
      user: 'Olivia',
      channel: item.shortName,
      payNo: item.payNo,
      opType: '新增提现方式',
      changes: [
        { key: 'shortName', label: '简称', before: '-', after: item.shortName },
        { key: 'payNo', label: '支付编号', before: '-', after: item.payNo },
        { key: 'name', label: '名称', before: '-', after: item.name },
        { key: 'merchantNo', label: '商户号', before: '-', after: item.merchantNo },
        { key: 'appId', label: 'AppId', before: '-', after: item.appId },
        { key: 'currency', label: '币种', before: '-', after: item.currency },
        { key: 'hint', label: '提示语', before: '-', after: item.hint || '-' },
        { key: 'rate', label: '汇率', before: '-', after: String(item.rate) },
        { key: 'rateSource', label: '汇率来源', before: '-', after: normalizeRateSource(item.rateSource) },
        { key: 'status', label: '状态', before: '-', after: normalizeStatus(item.status) }
      ],
      remark: editForm.value.remark
    })

    closeEditModal()
    return
  }

  const item = withdrawChannels.value.find((x) => x.id === editingId.value)
  if (!item) {
    closeEditModal()
    return
  }

  const mapping = [
    { key: 'shortName', label: '简称', format: (v) => String(v ?? '') },
    { key: 'payNo', label: '支付编号', format: (v) => String(v ?? '') },
    { key: 'name', label: '名称', format: (v) => String(v ?? '') },
    { key: 'merchantNo', label: '商户号', format: (v) => String(v ?? '') },
    { key: 'appId', label: 'AppId', format: (v) => String(v ?? '') },
    { key: 'currency', label: '币种', format: (v) => String(v ?? '') },
    { key: 'hint', label: '提示语', format: (v) => String(v ?? '') },
    { key: 'rate', label: '汇率', format: (v) => String(v ?? '') },
    { key: 'rateSource', label: '汇率来源', format: (v) => normalizeRateSource(v) },
    { key: 'status', label: '状态', format: (v) => normalizeStatus(v) }
  ]

  const changes = mapping
    .map(({ key, label, format }) => {
      const before = format(item[key])
      const after = format(editForm.value[key])
      if (before === after) return null
      return { key, label, before: before || '-', after: after || '-' }
    })
    .filter(Boolean)

  item.shortName = editForm.value.shortName
  item.payNo = editForm.value.payNo
  item.name = editForm.value.name
  item.merchantNo = editForm.value.merchantNo
  item.appId = editForm.value.appId
  item.currency = editForm.value.currency
  item.hint = editForm.value.hint
  item.rate = editForm.value.rate
  item.rateSource = editForm.value.rateSource
  item.status = editForm.value.status

  if (changes.length) {
    pushWithdrawLog({
      time: nowText(),
      user: 'Olivia',
      channel: item.shortName,
      payNo: item.payNo,
      opType: '修改配置',
      changes,
      remark: editForm.value.remark
    })
  }

  closeEditModal()
}

const toggleStatus = (row) => {
  const before = row.status
  row.status = row.status === 'enabled' ? 'disabled' : 'enabled'
  const opType = row.status === 'enabled' ? '启用' : '禁用'
  pushWithdrawLog({
    time: nowText(),
    user: 'Olivia',
    channel: row.shortName,
    payNo: row.payNo,
    opType,
    changes: [{ key: 'status', label: '状态', before: normalizeStatus(before), after: normalizeStatus(row.status) }],
    remark: ''
  })
}
</script>
