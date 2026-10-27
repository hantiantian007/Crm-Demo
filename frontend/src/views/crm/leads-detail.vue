<template>
  <div class="flex h-full bg-mainBg overflow-hidden">
    <div class="flex-1 min-w-0 bg-gray-50 p-4 overflow-y-auto custom-scrollbar">
      <div class="p-6">
        <div class="mb-4 flex items-center justify-between gap-3">
          <button class="px-3 py-2 rounded bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm" @click="goBack">← 返回留资列表</button>
          <span class="text-xs text-gray-500">本地演示数据 · 非真实公众号提交</span>
        </div>
        <el-alert v-if="error" :title="error" type="error" :closable="false" show-icon class="mb-4" />
        <el-empty v-if="!lead" description="未找到该留资，请返回列表选择有效记录" />
        <template v-else>
          <div class="bg-white p-5 rounded-lg shadow-sm border border-gray-200 mb-4 flex flex-col lg:flex-row justify-between gap-4">
            <div class="flex items-center gap-4 min-w-0">
              <div class="w-12 h-12 shrink-0 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold text-xl">{{ lead.name.slice(0, 1) }}</div>
              <div class="min-w-0">
                <h2 class="text-xl font-bold text-gray-800 flex flex-wrap items-center gap-2">{{ lead.name }}<el-tag size="small" :type="statusType">{{ LEAD_STATES[lead.status] }}</el-tag></h2>
                <p class="text-sm text-gray-500 mt-1 break-words">线索 ID：{{ lead.id }} | 归属销售 / 客服：{{ staffName(lead.assigneeId) }} | 申请时间：{{ lead.createdAt }}</p>
                <div v-if="lead.tags.length" class="flex gap-2 mt-2"><el-tag v-for="tag in lead.tags" :key="tag" size="small">{{ tag }}</el-tag></div>
              </div>
            </div>
            <div class="flex gap-2 items-start flex-wrap">
              <el-button @click="showInviteNotice">复制代理邀请链接</el-button>
              <el-button @click="showInviteNotice">复制直客邀请链接</el-button>
              <el-button v-if="['assigned', 'unassigned', 'public'].includes(lead.status)" @click="openAction('assign')">{{ lead.status === 'unassigned' ? '分配' : '重新分配' }}</el-button>
              <el-button v-if="lead.status === 'assigned'" type="warning" plain @click="returnToPool">退回公海</el-button>
            </div>
          </div>

          <div class="flex flex-col lg:flex-row gap-4 items-start">
            <section class="w-full lg:w-1/3 bg-white rounded-lg shadow-sm border border-gray-200 p-5 min-w-0">
              <div class="flex justify-between items-center mb-4 border-b border-gray-100 pb-2">
                <h3 class="text-lg font-bold text-gray-800 border-l-4 border-primaryBtn pl-2">基础信息</h3>
                <button class="text-sm text-blue-600 hover:text-blue-800" @click="saveProfile">保存修改</button>
              </div>
              <form class="space-y-4" @submit.prevent="saveProfile">
                <label class="profile-field">姓名 <span class="text-red-500">*</span><input v-model="profile.name" maxlength="100" required /></label>
                <label class="profile-field">手机号码（含国家/地区区号） <span class="text-red-500">*</span><input v-model="profile.phone" maxlength="50" required /></label>
                <label class="profile-field">电子邮箱<input :value="lead.email" readonly class="bg-gray-50" /></label>
                <label class="profile-field">微信号<textarea v-model="profile.wechat" rows="2" class="full-text"></textarea></label>
                <label class="profile-field">WhatsApp<input v-model="profile.whatsapp" maxlength="100" /></label>
                <label class="profile-field">其他联系方式<input v-model="profile.otherContact" maxlength="200" /></label>
                <label class="profile-field">所属代理<input :value="lead.agent || '无'" readonly class="bg-gray-50" /></label>
                <label class="profile-field">咨询内容<textarea :value="lead.inquiry" readonly rows="5" class="full-text bg-gray-50"></textarea></label>
                <p v-if="lead.source === WECHAT_SOURCE" class="text-xs text-gray-500">以上为公众号表单留言（最多 500 字），不替换为咨询分类；查询分类暂归入“其他”。原始内容保留。</p>
                <label class="profile-field">信息来源<input :value="LEAD_SOURCES[lead.source]" readonly class="bg-gray-50" /></label>
                <label class="profile-field">客户来源<input :value="lead.customerSource" readonly class="bg-gray-50" /></label>
                <label class="profile-field">查询渠道<select v-model="profile.channel"><option v-for="channel in ['WhatsApp', 'Email', 'Zendesk', 'Telegram', '微信公众号']" :key="channel">{{ channel }}</option></select></label>
                <label class="profile-field">备注说明<textarea v-model="profile.notes" rows="3" maxlength="1000"></textarea></label>
              </form>
            </section>

            <section class="w-full lg:w-2/3 bg-white rounded-lg shadow-sm border border-gray-200 min-w-0 overflow-hidden">
              <div class="flex border-b border-gray-200 bg-gray-50 px-4 pt-2 overflow-x-auto whitespace-nowrap">
                <button v-for="tab in detailTabs" :key="tab.value" class="px-4 py-2 text-sm font-medium border-b-2" :class="activeTab === tab.value ? 'text-primaryBtn border-primaryBtn bg-white rounded-t-lg' : 'text-gray-500 border-transparent'" @click="activeTab = tab.value">{{ tab.label }}</button>
              </div>
              <div class="p-5">
                <div v-if="activeTab === 'followup'">
                  <div class="flex items-center justify-between gap-3 mb-4">
                    <p class="text-xs text-gray-500">跟进时间使用 UTC+8；列表与详情共用记录。</p>
                    <el-button type="primary" :disabled="!canFollow" @click="openAction('follow')">新增跟进</el-button>
                  </div>
                  <p v-if="!canFollow" class="text-sm text-gray-500 mb-4">请先分配给销售或客服，再新增跟进。</p>
                  <el-empty v-if="!lead.followups.length" description="暂无跟进记录" :image-size="60" />
                  <div v-else class="relative border-l-2 border-gray-200 ml-3 mt-6 space-y-6">
                    <div v-for="item in [...lead.followups].reverse()" :key="item.id" class="relative pl-6">
                      <div class="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-blue-500 border-4 border-white shadow"></div>
                      <div class="bg-gray-50 p-3 rounded border border-gray-100">
                        <div class="flex justify-between gap-3 mb-1"><span class="font-medium text-gray-800 text-sm">{{ item.actor }}</span><span class="text-xs text-gray-500">{{ item.time }}</span></div>
                        <p class="text-sm text-gray-600 full-text">{{ item.content }}</p>
                        <div class="mt-2 flex flex-wrap gap-2 text-xs"><el-tag size="small">{{ LEAD_STATES[item.status] }}</el-tag><span v-if="item.nextFollowAt" class="text-orange-600">下次跟进：{{ item.nextFollowAt }}</span></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div v-else-if="activeTab === 'changes'" class="overflow-x-auto">
                  <table class="w-full text-left text-sm min-w-[600px] change-table">
                    <thead class="bg-gray-50 text-gray-700"><tr><th>变更时间</th><th>变更字段</th><th>变更前内容</th><th>变更后内容</th><th>操作人</th></tr></thead>
                    <tbody><tr v-for="(item, index) in [...lead.changes].reverse()" :key="index"><td>{{ item.time }}</td><td>{{ item.field }}</td><td class="full-text">{{ item.before }}</td><td class="full-text">{{ item.after }}</td><td>{{ item.actor }}</td></tr><tr v-if="!lead.changes.length"><td colspan="5" class="text-center text-gray-400">暂无变更记录</td></tr></tbody>
                  </table>
                </div>
                <div v-else-if="activeTab === 'submissions'" class="space-y-4">
                  <p class="text-xs text-gray-500">累计 {{ lead.count }} 次留资。以下展示当前演示数据中已提供的原始提交；不自动合并同名或同邮箱记录。</p>
                  <div v-for="(item, index) in lead.submissions" :key="index" class="border border-gray-200 rounded-lg p-4 bg-white">
                    <div class="flex justify-between gap-3 mb-3"><h4 class="font-bold text-gray-800">原始提交信息</h4><span class="text-xs text-gray-500">{{ item.time }}</span></div>
                    <dl class="submission-grid">
                      <div><dt>姓名</dt><dd>{{ item.name }}</dd></div><div><dt>原始联系方式</dt><dd>{{ item.phone }}</dd></div>
                      <div><dt>国家/地区区号</dt><dd>{{ item.countryCode || '原记录未单独提供' }}</dd></div><div><dt>客户邮箱</dt><dd>{{ item.email }}</dd></div>
                      <div class="col-span-2"><dt>原始微信号</dt><dd class="full-text">{{ item.wechat || '原记录未提供' }}</dd></div>
                      <div><dt>信息来源</dt><dd>{{ LEAD_SOURCES[item.source] }}</dd></div><div><dt>客户来源</dt><dd>{{ item.customerSource }}</dd></div>
                      <div class="col-span-2"><dt>完整咨询内容</dt><dd class="full-text">{{ item.inquiry }}</dd></div>
                    </dl>
                  </div>
                </div>
                <div v-else>
                  <div v-if="lead.status === 'converted'" class="bg-green-50 border border-green-200 rounded-lg p-5">
                    <h4 class="font-bold text-green-800 mb-3">已转化</h4>
                    <p class="text-sm text-gray-600">最近跟进：{{ latestFollow(lead)?.time || '-' }}</p>
                    <dl v-if="lead.clientId && lead.conversion" class="submission-grid mt-4 bg-white p-4 rounded border border-green-100">
                      <div><dt>关联客户账户</dt><dd>{{ lead.clientId }}</dd></div>
                      <div><dt>开户状态</dt><dd>{{ lead.conversion.accountStatus }}</dd></div>
                      <div><dt>首次入金时间</dt><dd>{{ lead.conversion.firstDepositAt }}</dd></div>
                      <div><dt>首次入金金额</dt><dd>$ {{ lead.conversion.firstDeposit }}</dd></div>
                      <div><dt>净入金（入-出）</dt><dd>$ {{ lead.conversion.netDeposit }}</dd></div>
                      <div><dt>当前账户余额</dt><dd>$ {{ lead.conversion.balance }}</dd></div>
                      <div><dt>累计交易手数</dt><dd>{{ lead.conversion.lots }} 手</dd></div>
                      <div><dt>累计盈亏</dt><dd>$ {{ lead.conversion.profit }}</dd></div>
                    </dl>
                    <el-button v-if="lead.clientId" type="success" class="mt-4" @click="goClientDetail(lead.clientId)">查看客户画像（{{ lead.clientId }}）</el-button>
                    <p v-else class="text-sm text-gray-500 mt-3">已更新留资跟进状态，当前没有关联客户账户；不会自动开户或生成资金数据。</p>
                  </div>
                  <el-empty v-else description="当前尚未转化" :image-size="70" />
                  <div class="mt-6 p-5 border border-dashed border-gray-300 rounded-lg bg-gray-50">
                    <h4 class="font-medium text-gray-800 mb-2">关联客户账户</h4>
                    <p class="text-xs text-gray-500 mb-3">保留原型关联入口，本次不实现真实开户或客户账户绑定；当前关联：{{ lead.clientId || '无' }}。</p>
                    <div class="flex gap-3"><input class="flex-1 min-w-0" placeholder="输入 CRM 客户 ID" disabled /><el-button disabled>保存关联</el-button></div>
                  </div>
                </div>
              </div>
            </section>
          </div>
          <LeadActionDialog v-model="actionOpen" :mode="actionMode" :ids="[lead.id]" />
        </template>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, onUnmounted, reactive, ref, watch } from 'vue'
import { onBeforeRouteLeave, useRoute, useRouter } from 'vue-router'
import { ElMessage, ElMessageBox } from 'element-plus'
import LeadActionDialog from '../../components/leads/LeadActionDialog.vue'
import { leadsStore, LEADS_KEY, LEAD_STATES, LEAD_SOURCES, WECHAT_SOURCE, copyLead, staffName, latestFollow } from '../../store/leadsDemo.js'
const route = useRoute()
const router = useRouter()
const { records, error } = leadsStore
const lead = computed(() => records.value.find(row => row.id === route.query.id))
const profile = reactive({})
const profileRevision = ref(0)
const baseline = ref('')
const dirty = computed(() => baseline.value && JSON.stringify(profile) !== baseline.value)
const activeTab = ref('followup')
const detailTabs = computed(() => [{ value: 'followup', label: '跟进记录' }, { value: 'changes', label: '变更记录' }, { value: 'submissions', label: '留资记录（' + (lead.value?.count || 0) + '）' }, { value: 'conversion', label: '转化成果' }])
const actionOpen = ref(false)
const actionMode = ref('assign')
const canFollow = computed(() => lead.value?.assigneeId && !['unassigned', 'public'].includes(lead.value.status))
const statusType = computed(() => ({ assigned: 'primary', unassigned: 'warning', public: 'info', invalid: 'danger', converted: 'success' }[lead.value?.status]))
function loadProfile() {
  if (!lead.value) return
  const row = lead.value
  Object.assign(profile, Object.fromEntries(['name', 'phone', 'wechat', 'whatsapp', 'otherContact', 'notes', 'channel'].map(key => [key, row[key] || ''])))
  profileRevision.value = row.revision
  baseline.value = JSON.stringify(profile)
}
watch(lead, (row, previous) => {
  if (!row) return
  if (row.id !== previous?.id || !dirty.value) loadProfile()
})
watch(() => route.query.id, () => { activeTab.value = 'followup'; actionOpen.value = false; leadsStore.refresh(); loadProfile() }, { immediate: true })
function saveProfile() {
  if (!lead.value) return
  if (!dirty.value) return ElMessage.info('基础信息未修改')
  const result = leadsStore.saveProfile(lead.value.id, copyLead(profile), profileRevision.value)
  if (!result.ok) return ElMessage.error(result.error)
  loadProfile()
  ElMessage.success('基础信息已保存，原始提交信息保留')
}
async function confirmDiscard() {
  if (!dirty.value) return true
  try { await ElMessageBox.confirm('基础信息尚未保存，是否放弃修改？', '未保存的修改', { confirmButtonText: '放弃修改', cancelButtonText: '继续编辑' }); loadProfile(); return true } catch { return false }
}
async function openAction(mode) {
  if (!await confirmDiscard()) return
  actionMode.value = mode; actionOpen.value = true
}
async function returnToPool() {
  if (!await confirmDiscard()) return
  const selected = lead.value
  try { await ElMessageBox.confirm('确认退回公海并清空归属？已有跟进记录保留。', '退回公海', { confirmButtonText: '确认', cancelButtonText: '取消' }) } catch { return }
  const result = leadsStore.returnToPool(selected.id, selected.revision)
  result.ok ? ElMessage.success('已退回公海') : ElMessage.error(result.error)
}
onBeforeRouteLeave(confirmDiscard)
const goBack = () => router.push('/crm/leads')
const goClientDetail = id => router.push({ path: '/crm/client-detail', query: { id } })
const showInviteNotice = () => ElMessage.info('当前演示记录没有可用的专属邀请链接；本次不接入真实邀请或开户流程')
function sync(event) { if (!event.key || event.key === LEADS_KEY) leadsStore.refresh() }
onMounted(() => window.addEventListener('storage', sync))
onUnmounted(() => window.removeEventListener('storage', sync))
</script>

<style scoped>
.profile-field { display: block; font-size: 14px; color: #374151; }
.profile-field input, .profile-field textarea, .profile-field select { display: block; width: 100%; margin-top: 6px; }
.full-text { white-space: pre-wrap; overflow-wrap: anywhere; line-height: 1.75; }
.change-table th, .change-table td { padding: 12px; border-bottom: 1px solid #e5e7eb; vertical-align: top; }
.submission-grid { display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 1fr); gap: 14px; font-size: 13px; }
.submission-grid dt { color: #6b7280; margin-bottom: 4px; }
.submission-grid dd { overflow-wrap: anywhere; }
</style>
