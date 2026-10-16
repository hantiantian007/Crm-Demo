<template>
  <div class="lark-notifications-page bg-gray-50 p-4">
    <header class="mb-4 flex items-start justify-between gap-4">
      <div>
      <h1 class="text-base font-semibold text-gray-800">Lark 通知</h1>
      <p class="mt-1 text-xs text-gray-500">查看通知记录、配置通知人员及管理 Lark 绑定，仅用于前端演示，不会发送实际消息。</p>
      </div>
      <button type="button" class="px-3 py-1.5 bg-amber-50 hover:bg-amber-100 text-amber-700 rounded text-xs font-medium transition-colors flex items-center gap-1.5 border border-amber-200 shrink-0" :aria-label="`查看${currentPrd.title}`" @click="openPrd(currentPrd.url, currentPrd.title)">
        <i class="fa-solid fa-file-lines"></i> PRD
      </button>
    </header>

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
              <col style="width: 160px" /><col style="width: 100px" /><col style="width: 80px" />
            </colgroup>
            <thead class="bg-gray-50 text-gray-500">
              <tr><th scope="col">通知时间</th><th scope="col">通知类型</th><th scope="col">通知内容</th><th scope="col">通知人员</th><th scope="col">发送状态</th><th scope="col">操作</th></tr>
            </thead>
            <tbody>
              <tr v-for="record in pagedRecords" :key="record.id" class="hover:bg-gray-50/70">
                <td class="whitespace-nowrap text-xs text-gray-600">{{ record.time }}</td>
                <td class="text-gray-800">{{ record.type }}</td>
                <td class="text-gray-600"><span class="block truncate" :title="record.content">{{ record.content }}</span></td>
                <td class="text-gray-700">{{ record.recipients.join('、') || '—' }}</td>
                <td><span class="inline-flex whitespace-nowrap rounded border px-2 py-0.5 text-xs" :class="record.status === '已发送' ? 'border-emerald-200 bg-emerald-50 text-emerald-700' : 'border-rose-200 bg-rose-50 text-rose-700'">{{ record.status }}</span></td>
                <td><button type="button" class="text-sm text-blue-600 hover:text-blue-800" @click="viewRecord(record)">查看</button></td>
              </tr>
              <tr v-if="!pagedRecords.length"><td colspan="6" class="text-center text-gray-400">暂无通知记录</td></tr>
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
            <th scope="col">通知人员</th>
            <th scope="col">状态</th>
            <th scope="col">操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="notification in larkNotifications" :key="notification.id" class="hover:bg-gray-50/70">
            <td class="font-medium text-gray-800">{{ notification.name }}</td>
            <td class="text-gray-600">{{ notification.description }}</td>
            <td class="text-gray-700">{{ recipientNames(notification.recipientIds) }}</td>
            <td><span class="inline-flex whitespace-nowrap rounded border border-emerald-200 bg-emerald-50 px-2 py-0.5 text-xs text-emerald-700">已开启</span></td>
            <td><button type="button" class="text-sm text-blue-600 hover:text-blue-800" :aria-label="`设置${notification.name}`" @click="openSettings(notification)">设置</button></td>
          </tr>
        </tbody>
      </table>
    </div>

      </el-tab-pane>
      <el-tab-pane label="Lark 人员" name="people">
    <section aria-labelledby="lark-people-title">
      <div class="mb-3 flex items-center justify-between gap-3">
        <h2 id="lark-people-title" class="text-sm font-semibold text-gray-800">Lark 人员</h2>
        <button type="button" class="h-9 rounded-md bg-primaryBtn px-4 text-sm font-medium text-white hover:bg-primaryBtnHover" @click="openAddPerson">新增</button>
      </div>
      <div class="overflow-x-auto border border-gray-200 bg-white">
        <table class="lark-notifications-table w-full table-fixed text-sm">
          <colgroup>
            <col style="width: 18%" />
            <col style="width: 14%" />
            <col style="width: 40%" />
            <col style="width: 16%" />
            <col style="width: 12%" />
          </colgroup>
          <thead class="bg-gray-50 text-gray-500">
            <tr>
              <th scope="col">CRM管理人员</th>
              <th scope="col">角色</th>
              <th scope="col">Lark 用户 ID</th>
              <th scope="col">绑定状态</th>
              <th scope="col">操作</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="person in larkRecipients" :key="person.id" class="hover:bg-gray-50/70">
              <td class="font-medium text-gray-800">{{ person.name }}</td>
              <td class="text-gray-600">{{ person.role }}</td>
              <td class="text-gray-700"><span class="block truncate" :title="person.larkUserId">{{ person.larkUserId || '—' }}</span></td>
              <td><span class="inline-flex whitespace-nowrap rounded border px-2 py-0.5 text-xs" :class="person.larkUserId ? 'border-emerald-200 bg-emerald-50 text-emerald-700' : 'border-gray-200 bg-gray-50 text-gray-500'">{{ person.larkUserId ? '已绑定' : '未绑定' }}</span></td>
              <td><button type="button" class="text-sm text-blue-600 hover:text-blue-800" :aria-label="`${person.larkUserId ? '编辑' : '绑定'} ${person.name} 的 Lark ID`" @click="openBinding(person)">{{ person.larkUserId ? '编辑' : '绑定' }}</button></td>
            </tr>
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
        <div><span class="text-gray-500">通知人员：</span>{{ selectedRecord.recipients.join('、') || '—' }}</div>
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
            <el-option v-for="notification in larkNotifications" :key="notification.id" :label="notification.name" :value="notification.id" />
          </el-select>
        </el-form-item>
        <el-form-item label="通知人员"><span>{{ recipientNames(simulateRecipients) }}</span></el-form-item>
        <p v-if="!simulateRecipients.length" class="mb-4 text-xs text-amber-700">暂无已绑定通知人员，本次模拟将记录为发送失败。</p>
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

    <el-dialog v-model="addPersonDialogOpen" title="新增 Lark 人员" width="92%" :style="{ maxWidth: '560px' }" destroy-on-close>
      <el-form label-position="top" @submit.prevent="saveNewPerson">
        <el-form-item label="CRM 管理人员" required>
          <el-select v-model="newPersonId" class="w-full" placeholder="请选择已有 CRM 管理人员" aria-label="CRM 管理人员" filterable>
            <el-option v-for="person in crmManagers" :key="person.id" :label="person.name" :value="person.id" />
          </el-select>
        </el-form-item>
        <el-form-item label="角色">
          <span class="text-gray-600">{{ selectedManager?.role || '—' }}</span>
        </el-form-item>
        <el-form-item label="Lark 用户 ID" required>
          <el-input v-model="newPersonLarkId" placeholder="ou_demo_alex" aria-label="Lark 用户 ID" />
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="flex justify-end gap-2">
          <button type="button" class="h-9 rounded-md border border-gray-200 bg-white px-4 text-sm text-gray-700 hover:bg-gray-50" @click="addPersonDialogOpen = false">取消</button>
          <button type="button" class="h-9 rounded-md bg-primaryBtn px-4 text-sm font-medium text-white hover:bg-primaryBtnHover" @click="saveNewPerson">保存</button>
        </div>
      </template>
    </el-dialog>

    <el-dialog v-model="bindingDialogOpen" title="绑定 Lark" width="92%" :style="{ maxWidth: '560px' }" destroy-on-close>
      <el-form v-if="activePerson" label-position="top" @submit.prevent="saveBinding">
        <el-form-item label="CRM管理人员">
          <span class="text-gray-800">{{ activePerson.name }}</span>
        </el-form-item>
        <el-form-item label="Lark 用户 ID">
          <el-input v-model="bindingUserId" placeholder="ou_xxxxxxxxxxxxxxxxx" aria-label="Lark 用户 ID" />
          <p class="mt-2 text-xs leading-5 text-gray-500">清空后保存将解除绑定，并从所有通知配置中移除此人员。仅本地演示，不验证 ID 真实性。</p>
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="flex justify-end gap-2">
          <button type="button" class="h-9 rounded-md border border-gray-200 bg-white px-4 text-sm text-gray-700 hover:bg-gray-50" @click="bindingDialogOpen = false">取消</button>
          <button type="button" class="h-9 rounded-md bg-primaryBtn px-4 text-sm font-medium text-white hover:bg-primaryBtnHover" @click="saveBinding">保存</button>
        </div>
      </template>
    </el-dialog>

    <el-dialog v-model="dialogOpen" title="通知设置" width="92%" :style="{ maxWidth: '560px' }" destroy-on-close>
      <el-form v-if="activeNotification" label-position="top" @submit.prevent="saveSettings">
        <el-form-item label="通知名称">
          <span class="text-gray-800">{{ activeNotification.name }}</span>
        </el-form-item>
        <el-form-item label="通知说明">
          <span class="text-gray-600">{{ activeNotification.description }}</span>
        </el-form-item>
        <el-form-item label="通知人员">
          <el-select v-model="selectedRecipients" multiple class="w-full" placeholder="请选择已绑定的管理人员，可多选" aria-label="通知人员">
            <el-option v-for="person in larkRecipients" :key="person.id" :label="person.larkUserId ? person.name : `${person.name}（未绑定 Lark）`" :value="person.id" :disabled="!person.larkUserId" />
          </el-select>
          <p class="mt-2 text-xs text-gray-500">仅可选择已绑定人员；未配置人员时无通知对象。</p>
        </el-form-item>
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
import { computed, ref, watch } from 'vue'
import { ElMessage } from 'element-plus'
import { openPrd } from '@/store/prd'
import { crmManagers, addLarkPerson, larkNotifications, larkRecipients, boundRecipientIds, saveLarkBinding, saveLarkNotificationRecipients, larkNotificationRecords, larkNotificationExamples, simulateLarkNotification } from '@/store/larkNotificationDemo'

const activeTab = ref('records')
const tabPrds = {
  records: { url: 'prd-lark-notification-records.html', title: 'Lark 通知 PRD' },
  configuration: { url: 'prd-lark-notification-config.html', title: '通知配置 PRD' },
  people: { url: 'prd-lark-personnel.html', title: 'Lark 人员 PRD' }
}
const currentPrd = computed(() => tabPrds[activeTab.value] || tabPrds.records)
const recordPage = ref(1)
const recordPageSize = ref(10)
const pagedRecords = computed(() => larkNotificationRecords.slice((recordPage.value - 1) * recordPageSize.value, recordPage.value * recordPageSize.value))
const recordDialogOpen = ref(false)
const selectedRecord = ref(null)
const simulateDialogOpen = ref(false)
const simulateTypeId = ref('withdrawal')
const simulateRecipients = computed(() => boundRecipientIds(larkNotifications.find((item) => item.id === simulateTypeId.value)?.recipientIds))

function viewRecord(record) {
  selectedRecord.value = record
  recordDialogOpen.value = true
}

function openSimulateSend() {
  simulateTypeId.value = 'withdrawal'
  simulateDialogOpen.value = true
}

function sendDemoNotification() {
  if (!simulateDialogOpen.value) return
  const result = simulateLarkNotification(simulateTypeId.value)
  if (!result.ok) return ElMessage.warning(result.error)
  simulateDialogOpen.value = false
  recordPage.value = 1
  activeTab.value = 'records'
  if (result.status === '已发送') ElMessage.success('模拟发送成功，已新增通知记录')
  else ElMessage.warning('模拟发送失败，详情已记录')
  if (!result.persisted) ElMessage.warning('记录仅在本次会话生效，未能保存到本地')
}

const dialogOpen = ref(false)
const activeNotification = ref(null)
const selectedRecipients = ref([])
const bindingDialogOpen = ref(false)
const activePerson = ref(null)
const bindingUserId = ref('')
const addPersonDialogOpen = ref(false)
const newPersonId = ref('')
const newPersonLarkId = ref('')
const selectedManager = computed(() => crmManagers.value.find((person) => person.id === newPersonId.value))

function openAddPerson() {
  newPersonId.value = ''
  newPersonLarkId.value = ''
  addPersonDialogOpen.value = true
}

function saveNewPerson() {
  const result = addLarkPerson(newPersonId.value, newPersonLarkId.value)
  if (!result.ok) return ElMessage.warning(result.error)
  addPersonDialogOpen.value = false
  if (result.persisted) ElMessage.success('Lark 人员已新增')
  else ElMessage.warning('人员已在本次会话加入，未能保存到本地')
}

watch(() => larkRecipients.map((person) => person.larkUserId), () => {
  selectedRecipients.value = boundRecipientIds(selectedRecipients.value)
})

function openBinding(person) {
  activePerson.value = person
  bindingUserId.value = person.larkUserId
  bindingDialogOpen.value = true
}

function saveBinding() {
  if (!activePerson.value) return
  const persisted = saveLarkBinding(activePerson.value.id, bindingUserId.value)
  bindingDialogOpen.value = false
  if (persisted) ElMessage.success(bindingUserId.value.trim() ? 'Lark 绑定已保存' : '已解除绑定，并同步移除通知对象')
  else ElMessage.warning('设置已在本次会话生效，未能保存到本地')
}

function recipientNames(ids) {
  return larkRecipients.filter((person) => ids.includes(person.id)).map((person) => person.name).join('、') || '—'
}

function openSettings(notification) {
  activeNotification.value = notification
  selectedRecipients.value = [...notification.recipientIds]
  dialogOpen.value = true
}

function saveSettings() {
  if (!activeNotification.value) return
  const persisted = saveLarkNotificationRecipients(activeNotification.value.id, selectedRecipients.value)
  dialogOpen.value = false
  if (persisted) ElMessage.success('通知人员已保存')
  else ElMessage.warning('设置已在本次会话生效，未能保存到本地')
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
