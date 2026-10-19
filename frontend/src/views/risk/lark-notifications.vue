<template>
  <div class="lark-notifications-page bg-gray-50 p-4">
    <header class="mb-4 flex items-start justify-between gap-4">
      <div>
      <h1 class="text-base font-semibold text-gray-800">Lark 通知</h1>
      <p class="mt-1 text-xs text-gray-500">查看通知记录、配置通知群组及管理群机器人 Webhook。仅用于前端演示，不会发送实际消息。请勿填写真实凭证。</p>
      </div>
      <button type="button" class="px-3 py-1.5 bg-amber-50 hover:bg-amber-100 text-amber-700 rounded text-xs font-medium transition-colors flex items-center gap-1.5 border border-amber-200 shrink-0" :aria-label="`查看${currentPrd.title}`" @click="openPrd(currentPrd.url, currentPrd.title)">
        <i class="fa-solid fa-file-lines"></i> PRD
      </button>
    </header>

    <p v-if="groupMigrationNotice" class="mb-4 text-xs text-amber-700" role="status">{{ groupMigrationNotice }}</p>
    <el-tabs v-model="activeTab">
      <el-tab-pane label="通知记录" name="records">
        <div class="mb-3 flex items-center justify-between gap-3">
          <span class="text-xs text-gray-500">共 {{ larkNotificationRecords.length }} 条演示通知记录</span>
          <button type="button" class="h-9 rounded-md bg-primaryBtn px-4 text-sm font-medium text-white hover:bg-primaryBtnHover" @click="openSimulateSend">模拟发送</button>
        </div>
        <div class="overflow-x-auto rounded-lg border border-gray-200 bg-white">
          <table class="lark-notifications-table lark-records-table w-full table-fixed text-sm">
            <colgroup>
              <col style="width: 180px" /><col style="width: 120px" /><col />
              <col style="width: 160px" /><col style="width: 100px" /><col style="width: 180px" /><col style="width: 80px" />
            </colgroup>
            <thead class="bg-gray-50 text-gray-500">
              <tr><th scope="col">通知时间</th><th scope="col">通知类型</th><th scope="col">通知内容</th><th scope="col">通知群组</th><th scope="col">发送状态</th><th scope="col">失败原因</th><th scope="col">操作</th></tr>
            </thead>
            <tbody>
              <tr v-for="record in pagedRecords" :key="record.id" class="hover:bg-gray-50/70">
                <td class="whitespace-nowrap text-xs text-gray-600">{{ record.time }}</td>
                <td class="text-gray-800">{{ record.type }}</td>
                <td class="text-gray-600"><span class="block truncate" :title="record.content">{{ record.content }}</span></td>
                <td class="text-gray-700">{{ record.groupNames.join('、') || (record.legacy ? '旧记录未配置群组' : '—') }}</td>
                <td><span class="inline-flex whitespace-nowrap rounded border px-2 py-0.5 text-xs" :class="record.status === '已发送' ? 'border-emerald-200 bg-emerald-50 text-emerald-700' : 'border-rose-200 bg-rose-50 text-rose-700'">{{ record.status }}</span></td>
                <td class="text-xs text-gray-600"><span class="block truncate" :title="record.failureReason">{{ record.failureReason || '—' }}</span></td>
                <td><button type="button" class="text-sm text-blue-600 hover:text-blue-800" @click="viewRecord(record)">查看</button></td>
              </tr>
              <tr v-if="!pagedRecords.length"><td colspan="7" class="text-center text-gray-400">暂无通知记录</td></tr>
            </tbody>
          </table>
        </div>
        <div class="flex justify-end border-t border-gray-100 bg-white px-4 py-4 overflow-x-auto">
          <el-pagination v-model:current-page="recordPage" v-model:page-size="recordPageSize" :page-sizes="[5, 10, 20]" :total="larkNotificationRecords.length" layout="total, sizes, prev, pager, next" @size-change="recordPage = 1" />
        </div>
      </el-tab-pane>
      <el-tab-pane label="通知配置" name="configuration">
    <div class="overflow-x-auto rounded-lg border border-gray-200 bg-white">
      <table class="lark-notifications-table w-full table-fixed text-sm">
        <colgroup>
          <col style="width: 16%" />
          <col style="width: 38%" />
          <col style="width: 26%" />
          <col style="width: 10%" />
          <col style="width: 10%" />
        </colgroup>
        <thead class="bg-gray-50 text-gray-500">
          <tr>
            <th scope="col">通知名称</th>
            <th scope="col">通知说明</th>
            <th scope="col">通知群组</th>
            <th scope="col">状态</th>
            <th scope="col">操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="notification in larkNotifications" :key="notification.id" class="hover:bg-gray-50/70">
            <td class="font-medium text-gray-800">{{ notification.name }}</td>
            <td class="text-gray-600">{{ notification.description }}</td>
            <td class="text-gray-700">{{ groupNames(notification.groupIds) }}</td>
            <td><el-tag :type="notification.enabled ? 'success' : 'info'" size="small">{{ notification.enabled ? '启用' : '停用' }}</el-tag></td>
            <td><button type="button" class="text-sm text-blue-600 hover:text-blue-800" :aria-label="`设置${notification.name}`" @click="openSettings(notification)">设置</button></td>
          </tr>
        </tbody>
      </table>
    </div>

      </el-tab-pane>
      <el-tab-pane label="Lark 群组" name="groups">
        <section aria-labelledby="lark-groups-title">
          <div class="mb-3 flex items-center justify-between gap-3">
            <h2 id="lark-groups-title" class="text-sm font-semibold text-gray-800">Lark 群组</h2>
            <button type="button" class="h-9 rounded-md bg-primaryBtn px-4 text-sm font-medium text-white hover:bg-primaryBtnHover" @click="openGroup()">新增群组</button>
          </div>
          <div class="overflow-x-auto border border-gray-200 bg-white">
            <table class="lark-notifications-table w-full table-fixed text-sm">
              <colgroup><col style="width: 15%" /><col style="width: 23%" /><col style="width: 22%" /><col style="width: 8%" /><col style="width: 17%" /><col style="width: 15%" /></colgroup>
              <thead class="bg-gray-50 text-gray-500"><tr><th>群组名称</th><th>群组说明</th><th>Webhook 地址</th><th>状态</th><th>更新时间</th><th>操作</th></tr></thead>
              <tbody>
                <tr v-for="group in larkGroups" :key="group.id" class="hover:bg-gray-50/70">
                  <td class="font-medium text-gray-800">{{ group.name }}</td>
                  <td class="text-gray-600">{{ group.description || '—' }}</td>
                  <td class="text-xs text-gray-600">{{ maskWebhook(group.webhook) }}</td>
                  <td><el-tag :type="group.enabled ? 'success' : 'info'" size="small">{{ group.enabled ? '启用' : '停用' }}</el-tag></td>
                  <td class="text-xs text-gray-600">{{ group.updatedAt }}</td>
                  <td><div class="flex flex-wrap gap-x-3 gap-y-2">
                    <button type="button" class="text-blue-600 hover:text-blue-800" @click="openGroup(group)">编辑</button>
                    <button type="button" class="text-blue-600 hover:text-blue-800" @click="toggleGroup(group)">{{ group.enabled ? '停用' : '启用' }}</button>
                    <button type="button" class="text-red-600 hover:text-red-800" @click="removeGroup(group)">删除</button>
                  </div></td>
                </tr>
                <tr v-if="!larkGroups.length"><td colspan="6" class="text-center text-gray-400">暂无群组，请新增群组</td></tr>
              </tbody>
            </table>
          </div>
        </section>
      </el-tab-pane>
    </el-tabs>

    <el-dialog v-model="recordDialogOpen" title="通知详情" width="92%" :style="{ maxWidth: '620px' }" destroy-on-close>
      <div v-if="selectedRecord" class="space-y-4 text-sm">
        <div><span class="text-gray-500">通知时间：</span>{{ selectedRecord.time }}</div>
        <div><span class="text-gray-500">通知类型：</span>{{ selectedRecord.type }}</div>
        <div><span class="text-gray-500">接收群组：</span>{{ selectedRecord.groupNames.join('、') || '—' }}</div>
        <p v-if="selectedRecord.legacy" class="text-xs text-amber-700">旧版单聊演示记录：保留原时间、内容和结果，未将原个人接收人虚构为群组。</p>
        <div><span class="text-gray-500">发送状态：</span><span :class="selectedRecord.status === '已发送' ? 'text-emerald-700' : 'text-rose-700'">{{ selectedRecord.status }}</span><span class="ml-2 text-xs text-gray-400">（演示）</span></div>
        <div><div class="mb-2 text-gray-500">通知内容</div><p class="whitespace-pre-wrap break-words text-gray-700 leading-6">{{ selectedRecord.content }}</p></div>
        <p v-if="selectedRecord.failureReason" class="text-rose-700">{{ selectedRecord.failureReason }}</p>
      </div>
      <template #footer><button type="button" class="h-9 rounded-md border border-gray-200 bg-white px-4 text-sm text-gray-700 hover:bg-gray-50" @click="recordDialogOpen = false">关闭</button></template>
    </el-dialog>

    <el-dialog v-model="simulateDialogOpen" title="模拟发送通知" width="92%" :style="{ maxWidth: '560px' }" destroy-on-close>
      <el-form label-position="top" @submit.prevent="sendDemoNotification">
        <el-form-item label="通知类型">
          <el-select v-model="simulateTypeId" class="w-full" aria-label="通知类型">
            <el-option v-for="notification in larkNotifications" :key="notification.id" :label="notification.enabled ? notification.name : `${notification.name}（已停用）`" :value="notification.id" :disabled="!notification.enabled" />
          </el-select>
        </el-form-item>
        <el-form-item label="通知群组"><span>{{ groupNames(simulateGroups) }}</span></el-form-item>
        <p v-if="!simulateGroups.length" class="mb-4 text-xs text-amber-700">暂无已启用通知群组，本次模拟将记录为发送失败。</p>
        <el-form-item label="通知内容"><p class="whitespace-pre-wrap break-words leading-6 text-gray-600">{{ larkNotificationExamples[simulateTypeId] }}</p></el-form-item>
        <p class="text-xs text-gray-500">仅模拟发送并生成本地记录，不调用 Lark API。</p>
      </el-form>
      <template #footer>
        <div class="flex justify-end gap-2">
          <button type="button" class="h-9 rounded-md border border-gray-200 bg-white px-4 text-sm text-gray-700 hover:bg-gray-50" @click="simulateDialogOpen = false">取消</button>
          <button type="button" class="h-9 rounded-md bg-primaryBtn px-4 text-sm font-medium text-white hover:bg-primaryBtnHover" @click="sendDemoNotification">模拟发送</button>
        </div>
      </template>
    </el-dialog>

    <el-dialog v-model="groupDialogOpen" :title="editingGroupId ? '编辑群组' : '新增群组'" width="92%" :style="{ maxWidth: '560px' }" destroy-on-close>
      <el-form label-position="top" @submit.prevent="saveGroup">
        <el-form-item label="群组名称" required><el-input v-model="groupDraft.name" maxlength="80" placeholder="请输入群组名称" /></el-form-item>
        <el-form-item label="群组说明"><el-input v-model="groupDraft.description" type="textarea" :rows="2" maxlength="300" placeholder="请输入群组用途说明" /></el-form-item>
        <el-form-item label="Webhook 地址" required>
          <el-input v-model="groupDraft.webhook" type="password" show-password maxlength="2048" placeholder="https://open.larksuite.com/open-apis/bot/v2/hook/…" autocomplete="off" />
          <p class="mt-2 text-xs leading-5 text-gray-500">由管理员从国际版 Lark 群的自定义机器人设置获取。原型只校验格式，不验证地址有效性；请仅填写演示地址，不要输入真实凭证。正式凭证由后端安全保存。</p>
        </el-form-item>
        <el-form-item label="启用状态"><el-switch v-model="groupDraft.enabled" active-text="启用" inactive-text="停用" /></el-form-item>
      </el-form>
      <template #footer><div class="flex justify-end gap-2">
        <el-button @click="groupDialogOpen = false">取消</el-button>
        <el-button type="primary" @click="saveGroup">保存</el-button>
      </div></template>
    </el-dialog>

    <el-dialog v-model="dialogOpen" title="通知设置" width="92%" :style="{ maxWidth: '560px' }" destroy-on-close>
      <el-form v-if="activeNotification" label-position="top" @submit.prevent="saveSettings">
        <el-form-item label="通知名称">
          <span class="text-gray-800">{{ activeNotification.name }}</span>
        </el-form-item>
        <el-form-item label="通知说明">
          <span class="text-gray-600">{{ activeNotification.description }}</span>
        </el-form-item>
        <el-form-item label="通知群组">
          <el-select v-model="selectedGroups" multiple class="w-full" placeholder="请选择已启用的群组，可多选" aria-label="通知群组">
            <el-option v-for="group in larkGroups" :key="group.id" :label="group.enabled ? group.name : `${group.name}（已停用）`" :value="group.id" :disabled="!group.enabled" />
          </el-select>
          <p class="mt-2 text-xs text-gray-500">仅可选择已启用群组；停用或删除群组会同步移除配置。未配置群组时不发送。</p>
        </el-form-item>
        <el-form-item label="启用状态"><el-switch v-model="notificationEnabled" active-text="启用" inactive-text="停用" /></el-form-item>
      </el-form>
      <template #footer>
        <div class="flex justify-end gap-2">
          <button type="button" class="h-9 rounded-md border border-gray-200 bg-white px-4 text-sm text-gray-700 hover:bg-gray-50" @click="dialogOpen = false">取消</button>
          <button type="button" class="h-9 rounded-md bg-primaryBtn px-4 text-sm font-medium text-white hover:bg-primaryBtnHover" @click="saveSettings">保存</button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { computed, reactive, ref, watch } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { openPrd } from '@/store/prd'
import { larkGroups, larkNotifications, enabledGroupIds, groupNames, maskWebhook, groupMigrationNotice, saveLarkGroup, setLarkGroupEnabled, deleteLarkGroup, saveLarkNotificationGroups, larkNotificationRecords, larkNotificationExamples, simulateLarkNotification } from '@/store/larkNotificationDemo'

const activeTab = ref('records')
const tabPrds = {
  records: { url: 'prd-lark-notification-records.html', title: '通知记录 PRD' },
  configuration: { url: 'prd-lark-notification-config.html', title: '通知配置 PRD' },
  groups: { url: 'prd-lark-personnel.html', title: 'Lark 群组管理 PRD' }
}
const currentPrd = computed(() => tabPrds[activeTab.value] || tabPrds.records)
const recordPage = ref(1)
const recordPageSize = ref(10)
const pagedRecords = computed(() => larkNotificationRecords.slice((recordPage.value - 1) * recordPageSize.value, recordPage.value * recordPageSize.value))
const recordDialogOpen = ref(false)
const selectedRecord = ref(null)
const simulateDialogOpen = ref(false)
const simulateTypeId = ref('withdrawal')
const simulateGroups = computed(() => enabledGroupIds(larkNotifications.find(n => n.id === simulateTypeId.value)?.groupIds))
function viewRecord(record) { selectedRecord.value = record; recordDialogOpen.value = true }
function openSimulateSend() {
  simulateTypeId.value = larkNotifications.find(n => n.enabled)?.id || ''
  simulateDialogOpen.value = true
}
function sendDemoNotification() {
  if (!simulateDialogOpen.value) return
  const result = simulateLarkNotification(simulateTypeId.value)
  if (!result.ok) return ElMessage.warning(result.error)
  simulateDialogOpen.value = false
  recordPage.value = 1
  activeTab.value = 'records'
  if (result.status === '已发送') ElMessage.success('模拟发送成功，已新增演示通知记录，未发送真实消息')
  else ElMessage.warning('模拟发送失败，原因已记录')
  if (!result.persisted) ElMessage.warning('记录仅在本次会话生效，未能保存到本地')
}

const dialogOpen = ref(false)
const activeNotification = ref(null)
const selectedGroups = ref([])
const notificationEnabled = ref(true)
watch(() => larkGroups.map(g => [g.id, g.enabled]), () => {
  selectedGroups.value = enabledGroupIds(selectedGroups.value)
})
function openSettings(notification) {
  activeNotification.value = notification
  selectedGroups.value = enabledGroupIds(notification.groupIds)
  notificationEnabled.value = notification.enabled
  dialogOpen.value = true
}
function showSaved(result, message) {
  if (!result.ok) { ElMessage.warning(result.error); return false }
  if (result.persisted) ElMessage.success(message)
  else ElMessage.warning('设置已在本次会话生效，未能保存到本地')
  return true
}
function saveSettings() {
  if (!activeNotification.value) return
  if (showSaved(saveLarkNotificationGroups(activeNotification.value.id, selectedGroups.value, notificationEnabled.value), '通知配置已保存')) dialogOpen.value = false
}
const groupDialogOpen = ref(false)
const editingGroupId = ref('')
const groupDraft = reactive({ name: '', description: '', webhook: '', enabled: true })
function openGroup(group) {
  editingGroupId.value = group?.id || ''
  Object.assign(groupDraft, { name: group?.name || '', description: group?.description || '', webhook: group?.webhook || '', enabled: group?.enabled ?? true })
  groupDialogOpen.value = true
}
function saveGroup() {
  if (showSaved(saveLarkGroup(editingGroupId.value, groupDraft), '群组已保存')) groupDialogOpen.value = false
}
async function toggleGroup(group) {
  if (group.enabled) {
    try { await ElMessageBox.confirm('停用后将从通知规则及 CRM 登录通知配置中移除此群组，历史记录保留。重新启用不会自动恢复选择。', '停用群组', { type: 'warning', confirmButtonText: '停用', cancelButtonText: '取消' }) }
    catch { return }
  }
  showSaved(setLarkGroupEnabled(group.id, !group.enabled), '群组状态已更新')
}
async function removeGroup(group) {
  try { await ElMessageBox.confirm('确认删除此群组？相关通知规则和 CRM 登录通知将移除此群组，历史通知记录保留。', '删除群组', { type: 'warning', confirmButtonText: '删除', cancelButtonText: '取消' }) }
  catch { return }
  showSaved(deleteLarkGroup(group.id), '群组已删除')
}
</script>

<style scoped>
.lark-notifications-table {
  min-width: 720px;
}
.lark-records-table {
  min-width: 960px;
}
.lark-notifications-table th,
.lark-notifications-table td {
  padding: 14px 16px;
  text-align: left;
  vertical-align: middle;
  border-bottom: 1px solid var(--crm-border, #e5e7eb);
  overflow-wrap: anywhere;
}
.lark-notifications-table th {
  height: 48px;
  font-weight: 500;
}
.lark-notifications-table td {
  height: 56px;
}
.lark-notifications-table tbody tr:last-child td {
  border-bottom: 0;
}
</style>
