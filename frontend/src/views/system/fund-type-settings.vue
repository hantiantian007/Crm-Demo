<template>
  <div class="flex h-full bg-mainBg overflow-hidden">
    <div class="flex-1 flex flex-col min-w-0 bg-gray-50 overflow-hidden p-4 custom-scrollbar overflow-y-auto">
      <div class="flex-1 overflow-y-auto bg-gray-50 p-6">
        <div class="bg-white rounded-xl card-shadow border border-gray-100 overflow-hidden">
          <div class="px-6 py-4 border-b border-gray-100 flex items-center justify-between gap-3 flex-wrap">
            <div class="text-base font-bold text-gray-800">管理出入金类型设置</div>
            <div class="flex items-center gap-2">
              <button
                type="button"
                class="inline-flex items-center gap-2 px-5 py-2 bg-primaryBtn hover:bg-primaryBtnHover text-white rounded-lg text-sm font-medium transition-colors shadow-sm"
                @click="openAddModal"
              >
                <i class="fa-solid fa-plus text-xs"></i>
                新增类型
              </button>
            </div>
          </div>

          <div class="px-6 pt-4">
            <el-tabs v-model="activeTab" class="fund-type-tabs">
              <el-tab-pane label="管理入金类型" name="deposit"></el-tab-pane>
              <el-tab-pane label="管理出金类型" name="withdraw"></el-tab-pane>
            </el-tabs>
          </div>

          <div class="px-6 pb-5 text-xs text-gray-500">
            已使用的类型不支持删除，只能停用；“是否计入真实入金/出金”仅影响统计口径，不改变资金增减处理。
          </div>

          <div class="overflow-x-auto">
            <table class="w-full text-sm text-left min-w-[980px]">
              <thead class="bg-tableHeader text-gray-600 border-b border-gray-200">
                <tr>
                  <th class="px-4 py-4 font-medium whitespace-nowrap w-[260px]">类型名称</th>
                  <th class="px-4 py-4 font-medium whitespace-nowrap w-[180px]">是否计入真实</th>
                  <th class="px-4 py-4 font-medium whitespace-nowrap w-[120px] text-center">状态</th>
                  <th class="px-4 py-4 font-medium whitespace-nowrap w-[120px] text-right">排序</th>
                  <th class="px-4 py-4 font-medium">备注</th>
                  <th class="px-4 py-4 font-medium whitespace-nowrap w-[140px] text-center">操作</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-100">
                <tr v-for="row in currentRows" :key="row.id" class="hover:bg-gray-50/50 transition-colors">
                  <td class="px-4 py-3 font-medium text-gray-800 whitespace-nowrap">{{ row.name }}</td>
                  <td class="px-4 py-3 whitespace-nowrap">
                    <span
                      class="inline-flex items-center px-2 py-1 text-[11px] font-medium rounded-full border"
                      :class="row.countAsReal ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-gray-100 text-gray-600 border-gray-200'"
                    >
                      {{ row.countAsReal ? '是' : '否' }}
                    </span>
                  </td>
                  <td class="px-4 py-3 text-center whitespace-nowrap">
                    <button
                      type="button"
                      class="px-3 py-1 text-xs font-medium rounded-full transition-colors"
                      :class="row.status === 'enabled' ? 'bg-emerald-50 text-emerald-600 hover:bg-emerald-100' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'"
                      @click="toggleStatus(row)"
                    >
                      {{ row.status === 'enabled' ? '启用' : '停用' }}
                    </button>
                  </td>
                  <td class="px-4 py-3 text-right font-mono text-gray-600 whitespace-nowrap">{{ Number(row.sort || 0) }}</td>
                  <td class="px-4 py-3 text-gray-500 text-xs">{{ row.remark || '-' }}</td>
                  <td class="px-4 py-3 text-center whitespace-nowrap">
                    <button type="button" class="text-blue-500 hover:text-blue-700 text-xs font-medium transition-colors" @click="openEditModal(row)">
                      编辑
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div class="px-6 py-5 border-t border-gray-100 flex items-center justify-between">
            <div class="text-sm text-gray-500">
              共 <span class="font-medium text-gray-700">{{ currentRows.length }}</span> 条
            </div>
          </div>
        </div>

        <div class="mt-4 bg-white rounded-xl card-shadow border border-gray-100 overflow-hidden">
          <div class="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
            <div class="text-base font-bold text-gray-800">类型配置审计记录</div>
          </div>
          <div class="overflow-x-auto">
            <table class="w-full text-sm text-left min-w-[1100px]">
              <thead class="bg-tableHeader text-gray-600 border-b border-gray-200">
                <tr>
                  <th class="px-4 py-4 font-medium whitespace-nowrap w-[180px]">操作时间</th>
                  <th class="px-4 py-4 font-medium whitespace-nowrap w-[140px]">操作人</th>
                  <th class="px-4 py-4 font-medium whitespace-nowrap w-[120px]">方向</th>
                  <th class="px-4 py-4 font-medium whitespace-nowrap w-[120px]">动作</th>
                  <th class="px-4 py-4 font-medium">修改前</th>
                  <th class="px-4 py-4 font-medium">修改后</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-100">
                <tr v-for="log in fundTypeConfigAuditLogs" :key="log.id" class="hover:bg-gray-50/50 transition-colors">
                  <td class="px-4 py-3 text-gray-500 font-mono text-xs whitespace-nowrap">{{ log.time }}</td>
                  <td class="px-4 py-3 text-gray-700 whitespace-nowrap">{{ log.operator }}</td>
                  <td class="px-4 py-3 text-gray-700 whitespace-nowrap">{{ log.direction === 'deposit' ? '入金' : '出金' }}</td>
                  <td class="px-4 py-3 text-gray-700 whitespace-nowrap">{{ log.action }}</td>
                  <td class="px-4 py-3 text-gray-500 text-xs">
                    <div class="font-mono break-all">{{ renderLogSnapshot(log.before) }}</div>
                  </td>
                  <td class="px-4 py-3 text-gray-500 text-xs">
                    <div class="font-mono break-all">{{ renderLogSnapshot(log.after) }}</div>
                  </td>
                </tr>
                <tr v-if="!fundTypeConfigAuditLogs.length">
                  <td class="px-4 py-6 text-center text-gray-400 text-sm" colspan="6">暂无记录</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>

  <el-dialog v-model="modalVisible" :title="modalTitle" width="520px">
    <div class="space-y-4">
      <div>
        <div class="text-sm text-gray-600 font-medium mb-2">类型名称<span class="text-red-500 ml-1">*</span></div>
        <input v-model="form.name" class="w-full h-10 px-3 rounded-lg border border-gray-200 outline-none focus:ring-2 focus:ring-primaryBtn/20 focus:border-primaryBtn text-sm" placeholder="请输入类型名称" />
        <div class="mt-2 text-xs text-gray-400">同一方向下类型名称不可重复。</div>
      </div>

      <div class="grid grid-cols-2 gap-4">
        <div>
          <div class="text-sm text-gray-600 font-medium mb-2">是否计入真实<span class="text-red-500 ml-1">*</span></div>
          <select v-model="form.countAsReal" class="w-full h-10 px-3 rounded-lg border border-gray-200 bg-white outline-none focus:ring-2 focus:ring-primaryBtn/20 focus:border-primaryBtn text-sm">
            <option :value="true">是</option>
            <option :value="false">否</option>
          </select>
        </div>
        <div>
          <div class="text-sm text-gray-600 font-medium mb-2">状态<span class="text-red-500 ml-1">*</span></div>
          <select v-model="form.status" class="w-full h-10 px-3 rounded-lg border border-gray-200 bg-white outline-none focus:ring-2 focus:ring-primaryBtn/20 focus:border-primaryBtn text-sm">
            <option value="enabled">启用</option>
            <option value="disabled">停用</option>
          </select>
        </div>
      </div>

      <div class="grid grid-cols-2 gap-4">
        <div>
          <div class="text-sm text-gray-600 font-medium mb-2">排序</div>
          <input v-model="form.sort" type="number" class="w-full h-10 px-3 rounded-lg border border-gray-200 outline-none focus:ring-2 focus:ring-primaryBtn/20 focus:border-primaryBtn text-sm" placeholder="数字越小越靠前" />
        </div>
        <div>
          <div class="text-sm text-gray-600 font-medium mb-2">方向</div>
          <div class="h-10 flex items-center px-3 rounded-lg border border-gray-200 bg-gray-50 text-sm text-gray-600">
            {{ activeTab === 'deposit' ? '入金' : '出金' }}
          </div>
        </div>
      </div>

      <div>
        <div class="text-sm text-gray-600 font-medium mb-2">备注</div>
        <textarea v-model="form.remark" rows="3" class="w-full px-3 py-2 rounded-lg border border-gray-200 outline-none focus:ring-2 focus:ring-primaryBtn/20 focus:border-primaryBtn text-sm" placeholder="选填"></textarea>
      </div>
    </div>

    <template #footer>
      <div class="flex items-center justify-end gap-2">
        <button type="button" class="px-4 py-2 rounded border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors" @click="modalVisible = false">取消</button>
        <button type="button" class="px-4 py-2 rounded bg-primaryBtn hover:bg-primaryBtnHover text-white transition-colors" @click="submitForm">保存</button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup>
import { computed, reactive, ref } from 'vue'
import { addTypeConfig, depositTypeConfigs, fundTypeConfigAuditLogs, setTypeConfigStatus, updateTypeConfig, withdrawTypeConfigs } from '@/store/fund-type-config'

const activeTab = ref('deposit')

const currentRows = computed(() => (activeTab.value === 'deposit' ? depositTypeConfigs.value : withdrawTypeConfigs.value))

const modalVisible = ref(false)
const mode = ref('add')
const editingId = ref('')

const form = reactive({
  name: '',
  countAsReal: false,
  status: 'enabled',
  sort: 0,
  remark: ''
})

const modalTitle = computed(() => (mode.value === 'add' ? '新增类型' : '编辑类型'))

const resetForm = () => {
  form.name = ''
  form.countAsReal = false
  form.status = 'enabled'
  form.sort = 0
  form.remark = ''
}

const openAddModal = () => {
  mode.value = 'add'
  editingId.value = ''
  resetForm()
  modalVisible.value = true
}

const openEditModal = (row) => {
  mode.value = 'edit'
  editingId.value = String(row.id)
  form.name = String(row.name || '')
  form.countAsReal = !!row.countAsReal
  form.status = row.status === 'disabled' ? 'disabled' : 'enabled'
  form.sort = Number(row.sort || 0)
  form.remark = String(row.remark || '')
  modalVisible.value = true
}

const toggleStatus = (row) => {
  const next = row.status === 'enabled' ? 'disabled' : 'enabled'
  const res = setTypeConfigStatus(activeTab.value, row.id, next)
  if (!res.ok) window.alert(res.message || '操作失败')
}

const submitForm = () => {
  const payload = {
    name: String(form.name || '').trim(),
    countAsReal: !!form.countAsReal,
    status: form.status,
    sort: Number(form.sort || 0),
    remark: String(form.remark || '')
  }

  const res = mode.value === 'add'
    ? addTypeConfig(activeTab.value, payload)
    : updateTypeConfig(activeTab.value, editingId.value, payload)

  if (!res.ok) {
    window.alert(res.message || '保存失败')
    return
  }

  modalVisible.value = false
}

const renderLogSnapshot = (v) => {
  if (!v) return '-'
  const parts = [
    `name=${v.name}`,
    `countAsReal=${v.countAsReal ? 'yes' : 'no'}`,
    `status=${v.status}`,
    `sort=${Number(v.sort || 0)}`
  ]
  if (v.remark) parts.push(`remark=${v.remark}`)
  return parts.join(' | ')
}
</script>

<style scoped>
:deep(.fund-type-tabs .el-tabs__item.is-active) { color: #d1a84f; }
:deep(.fund-type-tabs .el-tabs__active-bar) { background-color: #d1a84f; }
</style>

