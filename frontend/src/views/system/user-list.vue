<template>
  <div class="crm-user-list bg-gray-50 p-4 space-y-5">
    <header>
      <h1 class="text-base font-semibold text-gray-800">用户列表</h1>
      <p class="mt-1 text-xs text-gray-500">管理 CRM 用户账号的登录通知配置。当前仅使用演示数据，不接入真实登录事件或发送消息。</p>
    </header>

    <section class="rounded-xl border border-gray-200 bg-white p-5" aria-labelledby="user-search-title">
      <h2 id="user-search-title" class="mb-4 text-sm font-semibold text-gray-700">搜索</h2>
      <el-form label-position="top" class="users-filter-grid" @submit.prevent="search">
        <el-form-item label="用户名称"><el-input v-model="filters.name" placeholder="请输入用户名称" aria-label="用户名称" clearable /></el-form-item>
        <el-form-item label="用户邮箱"><el-input v-model="filters.email" placeholder="请输入用户邮箱" aria-label="用户邮箱" clearable /></el-form-item>
        <el-form-item label="用户类型"><el-select v-model="filters.type" aria-label="用户类型"><el-option label="全部" value="" /><el-option v-for="type in crmUserTypes" :key="type" :label="type" :value="type" /></el-select></el-form-item>
        <el-form-item label="登录通知状态"><el-select v-model="filters.notification" aria-label="登录通知状态"><el-option label="全部" value="" /><el-option label="已开启" value="true" /><el-option label="未开启" value="false" /></el-select></el-form-item>
        <el-form-item label="登录状态"><el-select v-model="filters.status" aria-label="登录状态"><el-option label="全部" value="" /><el-option label="正常" value="正常" /><el-option label="禁用" value="禁用" /></el-select></el-form-item>
        <div class="flex items-end gap-2">
          <button type="submit" class="h-9 rounded-md bg-primaryBtn px-4 text-sm font-medium text-white hover:bg-primaryBtnHover">搜索</button>
          <button type="button" class="h-9 rounded-md border border-gray-200 bg-white px-4 text-sm text-gray-700 hover:bg-gray-50" @click="reset">重置</button>
        </div>
      </el-form>
    </section>

    <section class="min-w-0 overflow-hidden rounded-xl border border-gray-200 bg-white" aria-labelledby="user-list-title">
      <div class="flex items-center gap-3 px-5 py-4">
        <h2 id="user-list-title" class="text-sm font-semibold text-gray-800">用户列表</h2>
        <span class="text-xs text-gray-500">共 {{ filteredUsers.length }} 条记录</span>
      </div>
      <el-table :data="pagedUsers" row-key="id" class="users-table" empty-text="暂无匹配用户，请调整筛选条件或重置" style="width: 100%">
        <el-table-column prop="name" label="用户名称" min-width="135" show-overflow-tooltip />
        <el-table-column prop="email" label="用户邮箱" min-width="210" show-overflow-tooltip />
        <el-table-column prop="type" label="用户类型" width="100" />
        <el-table-column prop="mtAccountCount" label="MT账户数量" width="115" align="right" />
        <el-table-column label="登录状态" width="100"><template #default="{ row }"><el-tag :type="row.loginStatus === '正常' ? 'success' : 'danger'" size="small" effect="light">{{ row.loginStatus }}</el-tag></template></el-table-column>
        <el-table-column label="登录双重验证" width="120"><template #default="{ row }"><el-tag :type="row.twoFactorEnabled ? 'success' : 'info'" size="small" effect="light">{{ row.twoFactorEnabled ? '启用' : '禁用' }}</el-tag></template></el-table-column>
        <el-table-column label="登录通知" width="100"><template #default="{ row }"><button type="button" class="rounded focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500" :aria-label="`设置 ${row.name} 的 CRM 登录通知，当前${row.loginNotificationEnabled ? '已开启' : '未开启'}`" title="点击设置 CRM 登录通知" @click="openSettings(row)"><el-tag :type="row.loginNotificationEnabled ? 'success' : 'info'" size="small" effect="light" class="cursor-pointer">{{ row.loginNotificationEnabled ? '已开启' : '未开启' }}</el-tag></button></template></el-table-column>
        <el-table-column prop="lastLoginAt" label="最后登录时间" width="180" />
        <el-table-column prop="lastLoginIp" label="最后登录IP" width="145" />
        <el-table-column label="操作" width="120" fixed="right"><template #default="{ row }"><div class="flex items-center gap-4 whitespace-nowrap"><button type="button" class="text-blue-600 hover:text-blue-800" :aria-label="`查看 ${row.name}`" @click="openDetails(row)">查看</button><button type="button" class="text-blue-600 hover:text-blue-800" :aria-label="`设置 ${row.name} 的登录通知`" @click="openSettings(row)">设置</button></div></template></el-table-column>
      </el-table>
      <div class="flex flex-wrap items-center justify-between gap-3 border-t border-gray-100 px-5 py-4">
        <span class="text-xs text-gray-500">共 {{ filteredUsers.length }} 条记录，当前显示 {{ pagedUsers.length }} 条</span>
        <div class="max-w-full overflow-x-auto"><el-pagination v-model:current-page="page" v-model:page-size="pageSize" :page-sizes="[10, 20, 50]" :total="filteredUsers.length" layout="sizes, prev, pager, next" background @size-change="page = 1" /></div>
      </div>
    </section>

    <el-dialog v-model="settingsOpen" title="登录通知设置" width="92%" :style="{ maxWidth: '560px' }" destroy-on-close>
      <template #header="{ titleId, titleClass }">
        <div class="flex items-center justify-between gap-4 pr-3">
          <span :id="titleId" :class="titleClass">登录通知设置</span>
          <button type="button" class="px-3 py-1.5 bg-amber-50 hover:bg-amber-100 text-amber-700 rounded text-xs font-medium transition-colors flex items-center gap-1.5 border border-amber-200" @click="openPrd('prd-crm-login-notification.html', 'CRM 登录通知配置 PRD')">
            <i class="fa-solid fa-file-lines"></i> PRD
          </button>
        </div>
      </template>
      <el-form v-if="selectedUser" label-position="top" @submit.prevent="saveSettings">
        <el-form-item label="用户名称"><span>{{ selectedUser.name }}</span></el-form-item>
        <el-form-item label="用户邮箱"><span class="break-all">{{ selectedUser.email }}</span></el-form-item>
        <el-form-item label="登录通知"><el-switch v-model="notificationDraft" active-text="开启" inactive-text="关闭" aria-label="登录通知" /></el-form-item>
        <el-form-item label="通知群组">
          <el-select v-model="groupIdsDraft" multiple class="w-full" placeholder="请选择已启用的 Lark 群组" aria-label="通知群组">
            <el-option v-for="group in larkGroups" :key="group.id" :label="group.enabled ? group.name : `${group.name}（已停用）`" :value="group.id" :disabled="!group.enabled" />
          </el-select>
          <p class="mt-2 text-xs text-gray-500">支持多选。群组在「风控管理 → Lark 通知 → Lark 群组」维护，不再绑定个人 Lark ID。</p>
        </el-form-item>
        <el-form-item label="配置状态"><el-tag :type="!notificationDraft ? 'info' : groupIdsDraft.length ? 'success' : 'warning'" size="small">{{ !notificationDraft ? '已关闭' : groupIdsDraft.length ? '已配置' : '待配置' }}</el-tag></el-form-item>
        <p class="text-sm leading-6 text-gray-600">开启后，未来该用户成功登录 CRM 时通知所选 Lark 群组；不是 MT5 登录提醒。</p>
        <p v-if="notificationDraft && !groupIdsDraft.length" role="status" class="mt-3 text-xs leading-5 text-amber-700">尚未配置已启用的通知群组，可保存为待配置；没有有效群组时不发送通知。</p>
        <p class="mt-3 text-xs leading-5 text-gray-500">未来通知内容来源于客户登录日志中的登录时间、IP、地点、客户端类型、设备信息和系统信息。本阶段仅保存配置，不接入登录事件或发送真实消息。</p>
      </el-form>
      <template #footer><div class="flex justify-end gap-2"><button type="button" class="h-9 rounded-md border border-gray-200 px-4 text-sm text-gray-700 hover:bg-gray-50" @click="settingsOpen = false">取消</button><button type="button" class="h-9 rounded-md bg-primaryBtn px-4 text-sm font-medium text-white hover:bg-primaryBtnHover" @click="saveSettings">保存</button></div></template>
    </el-dialog>

    <el-dialog v-model="detailsOpen" title="用户详情" width="92%" :style="{ maxWidth: '720px' }" destroy-on-close>
      <dl v-if="detailUser" class="grid grid-cols-1 gap-x-6 gap-y-4 text-sm sm:grid-cols-2">
        <div v-for="field in detailFields" :key="field.label"><dt class="mb-1 text-xs text-gray-500">{{ field.label }}</dt><dd class="break-words text-gray-800">{{ field.value }}</dd></div>
      </dl>
      <template #footer><button type="button" class="h-9 rounded-md border border-gray-200 px-4 text-sm text-gray-700 hover:bg-gray-50" @click="detailsOpen = false">关闭</button></template>
    </el-dialog>
  </div>
</template>

<script setup>
import { computed, reactive, ref, watch } from 'vue'
import { ElMessage } from 'element-plus'
import { openPrd } from '@/store/prd'
import { crmUsers, crmUserTypes, emptyUserFilters, filterCrmUsers, saveUserLoginNotification } from '@/store/crmUserListDemo'
import { larkGroups, enabledGroupIds, groupNames } from '@/store/larkNotificationDemo'

const filters = reactive(emptyUserFilters())
const appliedFilters = ref(emptyUserFilters())
const page = ref(1)
const pageSize = ref(10)
const filteredUsers = computed(() => filterCrmUsers(crmUsers, appliedFilters.value))
const totalPages = computed(() => Math.max(1, Math.ceil(filteredUsers.value.length / pageSize.value)))
watch(totalPages, (total) => { page.value = Math.min(page.value, total) })
const pagedUsers = computed(() => filteredUsers.value.slice((page.value - 1) * pageSize.value, page.value * pageSize.value))
const settingsOpen = ref(false)
const selectedUser = ref(null)
const notificationDraft = ref(false)
const groupIdsDraft = ref([])
watch(() => larkGroups.map(group => [group.id, group.enabled]), () => {
  groupIdsDraft.value = enabledGroupIds(groupIdsDraft.value)
})
const detailsOpen = ref(false)
const detailUser = ref(null)
const detailFields = computed(() => {
  const user = detailUser.value
  if (!user) return []
  return [
    { label: '用户名称', value: user.name }, { label: '用户邮箱', value: user.email },
    { label: '用户类型', value: user.type }, { label: 'MT账户数量', value: user.mtAccountCount },
    { label: '登录状态', value: user.loginStatus }, { label: '登录双重验证', value: user.twoFactorEnabled ? '启用' : '禁用' },
    { label: '登录通知', value: user.loginNotificationEnabled ? '已开启' : '未开启' }, { label: '通知群组', value: groupNames(user.notificationGroupIds) },
    { label: '最后登录时间', value: user.lastLoginAt }, { label: '最后登录IP', value: user.lastLoginIp },
    { label: '登录地点', value: user.loginLocation }, { label: '登录设备', value: user.loginDevice },
    { label: '系统信息', value: user.systemInfo }
  ]
})

function search() {
  appliedFilters.value = { ...filters }
  page.value = 1
}
function reset() {
  Object.assign(filters, emptyUserFilters())
  search()
}
function openDetails(user) {
  detailUser.value = user
  detailsOpen.value = true
}
function openSettings(user) {
  selectedUser.value = user
  notificationDraft.value = user.loginNotificationEnabled
  groupIdsDraft.value = enabledGroupIds(user.notificationGroupIds)
  settingsOpen.value = true
}
function saveSettings() {
  if (!selectedUser.value) return
  const result = saveUserLoginNotification(selectedUser.value.id, notificationDraft.value, groupIdsDraft.value)
  if (!result.ok) return ElMessage.warning(result.error)
  settingsOpen.value = false
  if (result.persisted) ElMessage.success('登录通知配置已保存')
  else ElMessage.warning('配置已在本次会话生效，未能保存到本地')
}
</script>

<style scoped>
.users-filter-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(190px, 1fr));
  gap: 16px;
}
.users-filter-grid :deep(.el-form-item) { margin-bottom: 0; }
.users-filter-grid :deep(.el-select) { width: 100%; }
.users-table :deep(th.el-table__cell) { height: 48px; background: #f9fafb; color: var(--crm-text-secondary, #6b7280); font-weight: 500; }
.users-table :deep(td.el-table__cell) { height: 56px; }
.users-table :deep(.cell) { padding-left: 14px; padding-right: 14px; }
.users-table :deep(.el-table__row:hover > td.el-table__cell) { background-color: #f9fafb; }
</style>
