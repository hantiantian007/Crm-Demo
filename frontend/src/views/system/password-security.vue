<template>
  <div class="flex h-full bg-mainBg overflow-hidden">
    <div class="flex-1 flex flex-col min-w-0 bg-gray-50 overflow-hidden p-4 custom-scrollbar overflow-y-auto">
      <div class="flex-1 overflow-y-auto bg-gray-50 p-6 space-y-6">
        <div v-if="showCurrentPolicyModule" class="bg-white rounded-xl card-shadow border border-gray-100 overflow-hidden">
          <div class="px-6 py-4 border-b border-gray-100 flex items-start justify-between gap-3 flex-wrap">
            <div class="min-w-0">
              <div class="text-base font-bold text-gray-800">配置摘要</div>
              <div class="mt-1 text-xs text-gray-500">
                最近创建配置：<span class="font-medium text-gray-700">{{ summaryTitle }}</span>
              </div>
            </div>
            <div class="flex items-center gap-2 flex-wrap">
              <button type="button" class="inline-flex items-center gap-2 px-4 py-2 bg-primaryBtn hover:bg-primaryBtnHover text-white rounded-lg text-sm font-medium transition-colors shadow-sm" @click="openCreateDialog">
                <i class="fa-solid fa-shield-halved text-xs"></i>
                发起强制改密
              </button>
              <button type="button" class="inline-flex items-center gap-2 px-4 py-2 bg-white hover:bg-gray-50 text-gray-700 rounded-lg text-sm font-medium transition-colors border border-gray-200" @click="openPrdEntry">
                <i class="fa-solid fa-file-lines text-xs"></i>
                PRD
              </button>
            </div>
          </div>
          <div class="p-6">
            <div class="grid grid-cols-1 gap-4">
              <div class="bg-gray-50 rounded-lg border border-gray-100 p-4 space-y-2">
                <div class="text-sm font-semibold text-gray-800">当前安全策略</div>
                <div class="text-xs text-gray-600 leading-relaxed">
                  <div class="flex items-center justify-between gap-3">
                    <span>标题</span>
                    <span class="text-gray-800 font-medium">{{ summaryTitle }}</span>
                  </div>
                  <div class="flex items-center justify-between gap-3 mt-1">
                    <span>适用范围</span>
                    <span class="text-gray-700">{{ summaryRangeText }}</span>
                  </div>
                  <div class="flex items-center justify-between gap-3 mt-1">
                    <span>生效时间</span>
                    <span class="text-gray-700">{{ summaryEffectiveTime }}</span>
                  </div>
                  <div class="flex items-center justify-between gap-3 mt-1">
                    <span>当前状态</span>
                    <span class="font-medium" :class="activePolicyCount > 0 ? 'text-emerald-600' : 'text-gray-500'">{{ activePolicyCount > 0 ? '已启用' : '未启用' }}</span>
                  </div>
                  <div class="flex items-center justify-between gap-3 mt-1">
                    <span>预计影响客户</span>
                    <span class="text-gray-700 font-mono">{{ summaryImpactCount }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-xl card-shadow border border-gray-100 overflow-hidden">
          <div class="px-6 py-4 border-b border-gray-100 flex items-center justify-between gap-3 flex-wrap">
            <div class="text-sm font-bold text-gray-800">配置记录列表</div>
            <div class="flex items-center gap-2 flex-wrap">
              <button type="button" class="h-9 px-4 rounded-md bg-primaryBtn hover:bg-primaryBtnHover text-white text-sm font-medium transition-colors" @click="openCreateDialog">
                新增规则
              </button>
              <div class="text-xs text-gray-500">历史配置仅支持查看/停用</div>
            </div>
          </div>
          <div class="overflow-x-auto">
            <table class="w-full text-sm text-left min-w-[1260px]">
              <thead class="bg-tableHeader text-gray-600 border-b border-gray-200">
                <tr>
                  <th class="px-4 py-3 font-medium whitespace-nowrap">配置 ID</th>
                  <th class="px-4 py-3 font-medium whitespace-nowrap">配置标题</th>
                  <th class="px-4 py-3 font-medium whitespace-nowrap">适用范围</th>
                  <th class="px-4 py-3 font-medium whitespace-nowrap">生效时间</th>
                  <th class="px-4 py-3 font-medium whitespace-nowrap text-center w-24">当前状态</th>
                  <th class="px-4 py-3 font-medium whitespace-nowrap text-right">预计影响</th>
                  <th class="px-4 py-3 font-medium whitespace-nowrap">发起人</th>
                  <th class="px-4 py-3 font-medium whitespace-nowrap">发起时间</th>
                  <th class="px-4 py-3 font-medium whitespace-nowrap text-right">已处理</th>
                  <th class="px-4 py-3 font-medium whitespace-nowrap text-center w-40">操作</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-100">
                <tr v-for="row in scopePolicies" :key="row.policy_id" class="hover:bg-gray-50/50 transition-colors">
                  <td class="px-4 py-3 font-mono text-xs text-gray-700">{{ row.policy_id }}</td>
                  <td class="px-4 py-3 text-gray-800 font-medium whitespace-nowrap">{{ row.title }}</td>
                  <td class="px-4 py-3 text-gray-600 text-xs whitespace-nowrap">{{ formatRangeText(row) }}</td>
                  <td class="px-4 py-3 text-gray-600 whitespace-nowrap">{{ row.effective_time }}</td>
                  <td class="px-4 py-3 text-center">
                    <span class="inline-flex items-center px-2 py-1 rounded-full text-[11px] border" :class="statusTagClass(row.status)">
                      {{ statusLabel(row.status) }}
                    </span>
                  </td>
                  <td class="px-4 py-3 text-right font-mono text-xs text-gray-700">{{ row.status === 'pending' ? calcImpactCount(row) : Number(row.impact_count || 0) }}</td>
                  <td class="px-4 py-3 text-gray-700 whitespace-nowrap">{{ row.operator }}</td>
                  <td class="px-4 py-3 text-gray-500 font-mono text-xs whitespace-nowrap">{{ row.created_at }}</td>
                  <td class="px-4 py-3 text-right font-mono text-xs text-gray-700">{{ Array.isArray(row.processed_user_ids) ? row.processed_user_ids.length : 0 }}</td>
                  <td class="px-4 py-3 text-center">
                    <div class="flex items-center justify-center gap-2">
                      <button type="button" class="px-3 py-1.5 rounded-md text-xs font-medium border border-gray-200 bg-white hover:bg-gray-50 text-gray-700 transition-colors" @click="openViewDialog(row.policy_id)">
                        查看
                      </button>
                      <button
                        v-if="row.status === 'pending'"
                        type="button"
                        class="px-3 py-1.5 rounded-md text-xs font-medium border border-emerald-200 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 transition-colors"
                        @click="openEnableDialog(row.policy_id)"
                      >
                        启用
                      </button>
                      <button
                        v-else-if="row.status === 'active'"
                        type="button"
                        class="px-3 py-1.5 rounded-md text-xs font-medium border border-rose-200 bg-rose-50 hover:bg-rose-100 text-rose-700 transition-colors"
                        @click="handleDisable(row.policy_id)"
                      >
                        停用
                      </button>
                      <span v-else class="text-gray-300 text-xs">—</span>
                    </div>
                  </td>
                </tr>
                <tr v-if="scopePolicies.length === 0">
                  <td class="px-4 py-6 text-center text-sm text-gray-400" colspan="10">暂无配置记录</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div class="bg-white rounded-xl card-shadow border border-gray-100 overflow-hidden">
          <div class="px-6 py-4 border-b border-gray-100 flex items-center justify-between gap-3 flex-wrap">
            <div class="text-sm font-bold text-gray-800">指定账号强制改密</div>
            <div class="text-xs text-gray-500">支持搜索多选，提交后统一生成一个批次</div>
          </div>
          <div class="p-6 space-y-4">
            <div class="flex items-center gap-3 flex-wrap">
              <el-select
                v-model="selectedUserIds"
                multiple
                filterable
                collapse-tags
                collapse-tags-tooltip
                placeholder="搜索并选择账号（支持多选）"
                class="min-w-[320px]"
              >
                <el-option v-for="opt in userOptions" :key="opt.value" :label="opt.label" :value="opt.value" :disabled="opt.disabled" />
              </el-select>
              <div class="text-xs text-gray-500">已选 {{ selectedUserIds.length }} 个账号</div>
              <button
                type="button"
                class="h-10 px-4 rounded-lg text-white bg-primaryBtn hover:bg-primaryBtnHover transition-colors text-sm font-medium disabled:opacity-60 disabled:cursor-not-allowed"
                :disabled="selectedUserIds.length === 0"
                @click="openSingleBatchConfirm"
              >
                强制修改密码
              </button>
            </div>

            <div v-if="selectedUsers.length > 0" class="overflow-x-auto">
              <table class="w-full text-sm text-left min-w-[980px]">
                <thead class="bg-tableHeader text-gray-600 border-b border-gray-200">
                  <tr>
                    <th class="px-4 py-3 font-medium whitespace-nowrap">客户</th>
                    <th class="px-4 py-3 font-medium whitespace-nowrap">邮箱</th>
                    <th class="px-4 py-3 font-medium whitespace-nowrap">客户 ID</th>
                    <th class="px-4 py-3 font-medium whitespace-nowrap">账号类型</th>
                    <th class="px-4 py-3 font-medium whitespace-nowrap">业务身份</th>
                    <th class="px-4 py-3 font-medium whitespace-nowrap">密码状态</th>
                    <th class="px-4 py-3 font-medium whitespace-nowrap text-center w-24">强制标记</th>
                    <th class="px-4 py-3 font-medium whitespace-nowrap text-center w-20">操作</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-gray-100">
                  <tr v-for="u in selectedUsers" :key="u.user_id" class="hover:bg-gray-50/50 transition-colors">
                    <td class="px-4 py-3 text-gray-800 font-medium whitespace-nowrap">{{ u.name }}</td>
                    <td class="px-4 py-3 font-mono text-xs text-gray-600 whitespace-nowrap">{{ u.email }}</td>
                    <td class="px-4 py-3 font-mono text-xs text-gray-700 whitespace-nowrap">{{ u.user_id }}</td>
                    <td class="px-4 py-3 text-gray-700 whitespace-nowrap">{{ accountTypeLabel(u.account_type) }}</td>
                    <td class="px-4 py-3 text-gray-700 whitespace-nowrap">{{ bizIdentityLabel(u.biz_identity) }}</td>
                    <td class="px-4 py-3 text-gray-700 whitespace-nowrap">{{ u.password_status }}</td>
                    <td class="px-4 py-3 text-center">
                      <span class="text-xs" :class="u.force_reset_required ? 'text-amber-700' : 'text-gray-400'">{{ u.force_reset_required ? '已存在' : '无' }}</span>
                    </td>
                    <td class="px-4 py-3 text-center">
                      <button type="button" class="text-xs text-gray-600 hover:text-gray-800 hover:underline" @click="removeSelected(u.user_id)">移除</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div class="pt-2 border-t border-gray-100">
              <div class="flex items-center justify-between gap-3 flex-wrap">
                <div class="text-sm font-semibold text-gray-800">提交批次记录</div>
                <div class="text-xs text-gray-500">每次提交会生成独立批次 ID</div>
              </div>
              <div class="mt-3 overflow-x-auto">
                <table class="w-full text-sm text-left min-w-[980px]">
                  <thead class="bg-tableHeader text-gray-600 border-b border-gray-200">
                    <tr>
                      <th class="px-4 py-3 font-medium whitespace-nowrap">批次 ID</th>
                      <th class="px-4 py-3 font-medium whitespace-nowrap">提交时间</th>
                      <th class="px-4 py-3 font-medium whitespace-nowrap">操作人</th>
                      <th class="px-4 py-3 font-medium whitespace-nowrap">生效时间</th>
                      <th class="px-4 py-3 font-medium whitespace-nowrap text-right">账号数量</th>
                      <th class="px-4 py-3 font-medium whitespace-nowrap text-right">成功</th>
                      <th class="px-4 py-3 font-medium whitespace-nowrap text-right">已存在</th>
                      <th class="px-4 py-3 font-medium whitespace-nowrap text-right">失败</th>
                      <th class="px-4 py-3 font-medium whitespace-nowrap text-center w-24">状态</th>
                      <th class="px-4 py-3 font-medium whitespace-nowrap">执行结果</th>
                      <th class="px-4 py-3 font-medium whitespace-nowrap text-center w-32">操作</th>
                    </tr>
                  </thead>
                  <tbody class="divide-y divide-gray-100">
                    <tr v-for="r in singleBatches" :key="r.batch_id" class="hover:bg-gray-50/50 transition-colors">
                      <td class="px-4 py-3 font-mono text-xs text-gray-700">{{ r.batch_id }}</td>
                      <td class="px-4 py-3 font-mono text-xs text-gray-500 whitespace-nowrap">{{ r.submitted_at }}</td>
                      <td class="px-4 py-3 text-gray-700 whitespace-nowrap">{{ r.operator }}</td>
                      <td class="px-4 py-3 text-gray-700 whitespace-nowrap">{{ r.effective_time }}</td>
                      <td class="px-4 py-3 text-right font-mono text-xs text-gray-700">{{ r.total_count }}</td>
                      <td class="px-4 py-3 text-right font-mono text-xs text-emerald-700">{{ r.success_count }}</td>
                      <td class="px-4 py-3 text-right font-mono text-xs text-amber-700">{{ r.existed_count }}</td>
                      <td class="px-4 py-3 text-right font-mono text-xs text-rose-700">{{ r.failed_count }}</td>
                      <td class="px-4 py-3 text-center">
                        <span class="inline-flex items-center px-2 py-1 rounded-full text-[11px] border" :class="singleBatchStatusTagClass(r.status)">
                          {{ singleBatchStatusLabel(r.status) }}
                        </span>
                      </td>
                      <td class="px-4 py-3 text-gray-600 text-xs whitespace-nowrap">{{ r.result }}</td>
                      <td class="px-4 py-3 text-center">
                        <div class="flex items-center justify-center gap-2">
                          <button type="button" class="text-xs text-gray-600 hover:text-gray-800 hover:underline" @click="openSingleBatchView(r.batch_id)">查看</button>
                          <button
                            v-if="canTerminateSingleBatch(r)"
                            type="button"
                            class="text-xs text-rose-600 hover:text-rose-700 hover:underline"
                            @click="terminateSingleBatch(r.batch_id)"
                          >
                            终止
                          </button>
                          <span v-else class="text-gray-300 text-xs">—</span>
                        </div>
                      </td>
                    </tr>
                    <tr v-if="singleBatches.length === 0">
                      <td class="px-4 py-6 text-center text-sm text-gray-400" colspan="11">暂无批次记录</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <el-dialog v-model="createDialog.open" title="配置强制改密策略" width="92%" :style="{ maxWidth: '620px' }" destroy-on-close>
      <div class="space-y-5 text-sm text-gray-700 leading-relaxed">
        <div>
          <div class="text-sm font-semibold text-gray-800">策略标题</div>
          <div class="mt-2">
            <input
              v-model="createForm.title"
              type="text"
              class="w-full h-10 px-3 rounded-lg border border-gray-200 bg-white text-sm outline-none focus:border-primaryBtn"
              placeholder="请输入策略标题"
              maxlength="20"
            />
            <div v-if="createErrors.title" class="mt-2 text-[11px] text-rose-600">{{ createErrors.title }}</div>
          </div>
        </div>

        <div>
          <div class="text-sm font-semibold text-gray-800">用户提示</div>
          <div class="mt-2">
            <textarea
              v-model="createForm.user_notice"
              rows="3"
              class="w-full px-3 py-2 rounded-lg border border-gray-200 bg-white text-sm outline-none focus:border-primaryBtn resize-none"
              placeholder="请填写本次强制改密的原因与说明"
              maxlength="200"
            ></textarea>
            <div v-if="createErrors.user_notice" class="mt-2 text-[11px] text-rose-600">{{ createErrors.user_notice }}</div>
          </div>
        </div>

        <div>
          <div class="text-sm font-semibold text-gray-800">适用范围</div>
          <div class="mt-2 space-y-3">
            <div class="text-xs text-gray-500 font-medium">账号类型</div>
            <div class="flex flex-wrap gap-3">
              <label class="inline-flex items-center gap-2 text-sm text-gray-700">
                <input class="accent-[#d1a84f]" type="checkbox" checked disabled />
                <span>标准账号</span>
              </label>
            </div>

            <div class="text-xs text-gray-500 font-medium">业务身份</div>
            <div class="flex flex-wrap gap-3">
              <label class="inline-flex items-center gap-2 text-sm text-gray-700">
                <input class="accent-[#d1a84f]" type="checkbox" checked disabled />
                <span>代理</span>
              </label>
              <label class="inline-flex items-center gap-2 text-sm text-gray-700">
                <input class="accent-[#d1a84f]" type="checkbox" checked disabled />
                <span>直客</span>
              </label>
            </div>

            <div class="text-xs text-gray-500 font-medium">范围摘要</div>
            <div class="text-sm text-gray-800">{{ createFormRangeText }}</div>
            <div v-if="createErrors.scope" class="mt-2 text-[11px] text-rose-600">{{ createErrors.scope }}</div>
          </div>
        </div>

        <div>
          <div class="text-sm font-semibold text-gray-800">生效时间</div>
          <div class="mt-2">
            <select v-model="createForm.effective_mode" class="w-full h-10 px-3 rounded-lg border border-gray-200 bg-white text-sm outline-none focus:border-primaryBtn">
              <option value="next_login">下次登录</option>
              <option value="scheduled">指定时间</option>
            </select>
            <input
              v-if="createForm.effective_mode === 'scheduled'"
              v-model="createForm.effective_at"
              type="datetime-local"
              class="w-full h-10 px-3 rounded-lg border border-gray-200 bg-white text-sm outline-none focus:border-primaryBtn mt-3"
            />
            <div v-if="createErrors.effective_at" class="mt-2 text-[11px] text-rose-600">{{ createErrors.effective_at }}</div>
          </div>
        </div>

        <div>
          <div class="text-sm font-semibold text-gray-800">预计影响客户数量</div>
          <div class="mt-2 bg-gray-50 border border-gray-100 rounded-lg px-4 py-3 flex items-center justify-between">
            <div class="text-xs text-gray-500">按当前范围预估</div>
            <div class="font-mono text-sm text-gray-800">{{ createFormImpactCount }}</div>
          </div>
        </div>
      </div>
      <template #footer>
        <div class="flex items-center justify-end gap-2">
          <button type="button" class="h-9 px-4 rounded-md border border-gray-200 bg-white hover:bg-gray-50 text-gray-700 text-sm font-medium" @click="createDialog.open = false">
            取消
          </button>
          <button type="button" class="h-9 px-4 rounded-md bg-primaryBtn hover:bg-primaryBtnHover text-white text-sm font-medium" @click="submitCreatePolicy">
            确认提交
          </button>
        </div>
      </template>
    </el-dialog>

    <el-dialog v-model="enableDialog.open" title="确认启用强制改密配置" width="92%" :style="{ maxWidth: '560px' }" destroy-on-close>
      <div class="space-y-3 text-sm text-gray-700 leading-relaxed">
        <div class="flex items-start gap-2">
          <span class="mt-1 w-1.5 h-1.5 rounded-full bg-[#d1a84f] flex-shrink-0"></span>
          <span>本次影响范围：{{ enableRangeText }}。</span>
        </div>
        <div class="flex items-start gap-2">
          <span class="mt-1 w-1.5 h-1.5 rounded-full bg-[#d1a84f] flex-shrink-0"></span>
          <span>预计影响 <span class="font-mono font-semibold">{{ enableImpactCount }}</span> 个账号（演示数据）。</span>
        </div>
        <div class="flex items-start gap-2">
          <span class="mt-1 w-1.5 h-1.5 rounded-full bg-[#d1a84f] flex-shrink-0"></span>
          <span>生效时间：{{ enableEffectiveTime }}；修改完成前无法访问 CRM。</span>
        </div>
      </div>
      <template #footer>
        <div class="flex items-center justify-end gap-2">
          <button type="button" class="h-9 px-4 rounded-md border border-gray-200 bg-white hover:bg-gray-50 text-gray-700 text-sm font-medium" @click="enableDialog.open = false">
            取消
          </button>
          <button type="button" class="h-9 px-4 rounded-md bg-primaryBtn hover:bg-primaryBtnHover text-white text-sm font-medium" @click="confirmEnablePolicy">
            确认执行
          </button>
        </div>
      </template>
    </el-dialog>

    <el-dialog v-model="viewDialog.open" title="配置详情" width="92%" :style="{ maxWidth: '560px' }" destroy-on-close>
      <div v-if="viewPolicy" class="space-y-3 text-sm text-gray-700 leading-relaxed">
        <div class="flex items-center justify-between gap-3">
          <span class="text-gray-500">配置 ID</span>
          <span class="font-mono text-xs text-gray-800">{{ viewPolicy.policy_id }}</span>
        </div>
        <div class="flex items-center justify-between gap-3">
          <span class="text-gray-500">标题</span>
          <span class="text-gray-800 font-medium">{{ viewPolicy.title }}</span>
        </div>
        <div class="flex items-center justify-between gap-3">
          <span class="text-gray-500">适用范围</span>
          <span class="text-gray-800">{{ formatRangeText(viewPolicy) }}</span>
        </div>
        <div class="flex items-center justify-between gap-3">
          <span class="text-gray-500">生效时间</span>
          <span class="text-gray-800">{{ viewPolicy.effective_time }}</span>
        </div>
        <div class="pt-3 border-t border-gray-100">
          <div class="text-gray-500">用户提示</div>
          <div class="mt-2 text-gray-800 text-sm leading-relaxed whitespace-pre-wrap">{{ getPolicyUserNotice(viewPolicy) }}</div>
        </div>
        <div class="flex items-center justify-between gap-3">
          <span class="text-gray-500">当前状态</span>
          <span class="text-gray-800">{{ statusLabel(viewPolicy.status) }}</span>
        </div>
        <div class="flex items-center justify-between gap-3">
          <span class="text-gray-500">预计影响</span>
          <span class="font-mono text-xs text-gray-800">{{ viewPolicy.status === 'pending' ? calcImpactCount(viewPolicy) : Number(viewPolicy.impact_count || 0) }}</span>
        </div>
        <div class="flex items-center justify-between gap-3">
          <span class="text-gray-500">已处理</span>
          <span class="font-mono text-xs text-gray-800">{{ Array.isArray(viewPolicy.processed_user_ids) ? viewPolicy.processed_user_ids.length : 0 }}</span>
        </div>
        <div class="flex items-center justify-between gap-3">
          <span class="text-gray-500">发起人</span>
          <span class="text-gray-800">{{ viewPolicy.operator }}</span>
        </div>
        <div class="flex items-center justify-between gap-3">
          <span class="text-gray-500">发起时间</span>
          <span class="font-mono text-xs text-gray-800">{{ viewPolicy.created_at }}</span>
        </div>
      </div>
      <template #footer>
        <div class="flex items-center justify-end gap-2">
          <button type="button" class="h-9 px-4 rounded-md border border-gray-200 bg-white hover:bg-gray-50 text-gray-700 text-sm font-medium" @click="viewDialog.open = false">
            关闭
          </button>
        </div>
      </template>
    </el-dialog>

    <el-dialog v-model="singleBatchConfirm.open" title="确认指定账号强制改密" width="92%" :style="{ maxWidth: '680px' }" destroy-on-close>
      <div class="space-y-3 text-sm text-gray-700 leading-relaxed">
        <div class="text-sm text-gray-800 font-semibold">本次将对以下账号启用强制改密：</div>
        <div class="text-xs text-gray-600">生效时间：下次登录；影响：客户完成密码修改前无法访问 CRM。</div>
        <div class="bg-gray-50 border border-gray-100 rounded-lg overflow-hidden">
          <div class="max-h-[260px] overflow-y-auto custom-scrollbar">
            <table class="w-full text-xs text-left">
              <thead class="bg-gray-100 text-gray-600 border-b border-gray-200">
                <tr>
                  <th class="px-4 py-2 font-medium whitespace-nowrap">客户</th>
                  <th class="px-4 py-2 font-medium whitespace-nowrap">邮箱</th>
                  <th class="px-4 py-2 font-medium whitespace-nowrap">客户 ID</th>
                  <th class="px-4 py-2 font-medium whitespace-nowrap">账号类型</th>
                  <th class="px-4 py-2 font-medium whitespace-nowrap">业务身份</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-100">
                <tr v-for="u in selectedUsers" :key="u.user_id">
                  <td class="px-4 py-2 text-gray-800 font-medium whitespace-nowrap">{{ u.name }}</td>
                  <td class="px-4 py-2 font-mono text-gray-600 whitespace-nowrap">{{ u.email }}</td>
                  <td class="px-4 py-2 font-mono text-gray-700 whitespace-nowrap">{{ u.user_id }}</td>
                  <td class="px-4 py-2 text-gray-700 whitespace-nowrap">{{ accountTypeLabel(u.account_type) }}</td>
                  <td class="px-4 py-2 text-gray-700 whitespace-nowrap">{{ bizIdentityLabel(u.biz_identity) }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <template #footer>
        <div class="flex items-center justify-end gap-2">
          <button type="button" class="h-9 px-4 rounded-md border border-gray-200 bg-white hover:bg-gray-50 text-gray-700 text-sm font-medium" @click="singleBatchConfirm.open = false">取消</button>
          <button type="button" class="h-9 px-4 rounded-md bg-primaryBtn hover:bg-primaryBtnHover text-white text-sm font-medium" @click="submitSingleBatch">确认执行</button>
        </div>
      </template>
    </el-dialog>

    <el-dialog v-model="singleBatchView.open" title="批次详情" width="92%" :style="{ maxWidth: '680px' }" destroy-on-close>
      <div v-if="viewSingleBatch" class="space-y-3 text-sm text-gray-700 leading-relaxed">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
          <div class="bg-gray-50 border border-gray-100 rounded-lg p-3">
            <div class="text-gray-400">批次 ID</div>
            <div class="mt-1 font-mono text-gray-800">{{ viewSingleBatch.batch_id }}</div>
          </div>
          <div class="bg-gray-50 border border-gray-100 rounded-lg p-3">
            <div class="text-gray-400">提交时间</div>
            <div class="mt-1 font-mono text-gray-800">{{ viewSingleBatch.submitted_at }}</div>
          </div>
          <div class="bg-gray-50 border border-gray-100 rounded-lg p-3">
            <div class="text-gray-400">操作人</div>
            <div class="mt-1 text-gray-800">{{ viewSingleBatch.operator }}</div>
          </div>
          <div class="bg-gray-50 border border-gray-100 rounded-lg p-3">
            <div class="text-gray-400">生效时间</div>
            <div class="mt-1 text-gray-800">{{ viewSingleBatch.effective_time }}</div>
          </div>
          <div class="bg-gray-50 border border-gray-100 rounded-lg p-3">
            <div class="text-gray-400">批次状态</div>
            <div class="mt-1 text-gray-800">{{ singleBatchStatusLabel(viewSingleBatch.status) }}</div>
          </div>
          <div class="bg-gray-50 border border-gray-100 rounded-lg p-3">
            <div class="text-gray-400">执行结果</div>
            <div class="mt-1 text-gray-800">{{ viewSingleBatch.result }}</div>
          </div>
          <div v-if="viewSingleBatch.status === 'terminated'" class="bg-gray-50 border border-gray-100 rounded-lg p-3 md:col-span-2">
            <div class="text-gray-400">终止信息</div>
            <div class="mt-1 space-y-1 text-gray-800">
              <div class="flex items-center justify-between gap-3">
                <span class="text-gray-500">终止时间</span>
                <span class="font-mono text-xs">{{ viewSingleBatch.terminated_at || '—' }}</span>
              </div>
              <div class="flex items-center justify-between gap-3">
                <span class="text-gray-500">终止操作人</span>
                <span>{{ viewSingleBatch.terminated_by || '—' }}</span>
              </div>
              <div class="flex items-center justify-between gap-3">
                <span class="text-gray-500">终止原因</span>
                <span class="text-gray-700">{{ viewSingleBatch.terminated_reason || '—' }}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="text-sm text-gray-800 font-semibold">包含账号</div>
        <div class="bg-gray-50 border border-gray-100 rounded-lg overflow-hidden">
          <div class="max-h-[260px] overflow-y-auto custom-scrollbar">
            <table class="w-full text-xs text-left">
              <thead class="bg-gray-100 text-gray-600 border-b border-gray-200">
                <tr>
                  <th class="px-4 py-2 font-medium whitespace-nowrap">客户</th>
                  <th class="px-4 py-2 font-medium whitespace-nowrap">邮箱</th>
                  <th class="px-4 py-2 font-medium whitespace-nowrap">客户 ID</th>
                  <th class="px-4 py-2 font-medium whitespace-nowrap text-center w-20">提交结果</th>
                  <th class="px-4 py-2 font-medium whitespace-nowrap text-center w-20">当前状态</th>
                  <th class="px-4 py-2 font-medium whitespace-nowrap text-center w-32">终止前</th>
                  <th class="px-4 py-2 font-medium whitespace-nowrap text-center w-32">终止后</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-100">
                <tr v-for="s in viewSingleBatchUsers" :key="s.user_id">
                  <td class="px-4 py-2 text-gray-800 font-medium whitespace-nowrap">{{ getDemoUserById(s.user_id)?.name || s.user_id }}</td>
                  <td class="px-4 py-2 font-mono text-gray-600 whitespace-nowrap">{{ getDemoUserById(s.user_id)?.email || '' }}</td>
                  <td class="px-4 py-2 font-mono text-gray-700 whitespace-nowrap">{{ s.user_id }}</td>
                  <td class="px-4 py-2 text-center">
                    <span
                      class="text-xs"
                      :class="singleBatchSubmitResultClass(s.submit_result)"
                    >
                      {{ singleBatchSubmitResultLabel(s.submit_result) }}
                    </span>
                  </td>
                  <td class="px-4 py-2 text-center">
                    <span class="text-xs" :class="singleBatchUserStatusClass(s.current_status)">{{ singleBatchUserStatusLabel(s.current_status) }}</span>
                  </td>
                  <td class="px-4 py-2 text-center text-[11px]" :class="s.current_status === 'terminated' ? 'text-gray-700' : 'text-gray-300'">
                    {{ s.current_status === 'terminated' ? (s.terminated_before_blocked ? '需要改密' : '不需要') : '—' }}
                  </td>
                  <td class="px-4 py-2 text-center text-[11px]" :class="s.current_status === 'terminated' ? 'text-gray-700' : 'text-gray-300'">
                    {{ s.current_status === 'terminated' ? (s.terminated_after_blocked ? '仍需改密' : '已解除') : '—' }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <template #footer>
        <div class="flex items-center justify-end gap-2">
          <button type="button" class="h-9 px-4 rounded-md border border-gray-200 bg-white hover:bg-gray-50 text-gray-700 text-sm font-medium" @click="singleBatchView.open = false">关闭</button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { openPrd } from '@/store/prd'
import {
  createScopePolicy,
  disableScopePolicy,
  enableScopePolicy,
  getDemoUserById,
  getPolicyUserNotice,
  getScopePolicyDefaults,
  getScopePolicyById,
  getScopePolicies,
  getSingleForceResetBatches,
  isForceResetScopeUser,
  passwordSecurityDemoState,
  submitSingleForceResetBatch,
  terminateSingleForceResetBatch,
} from '@/store/passwordSecurityDemo'

const showCurrentPolicyModule = false

const accountTypeLabel = (v) => {
  if (v === 'standard') return '标准账号'
  if (v === 'system') return '系统账号'
  return v
}
const bizIdentityLabel = (v) => {
  if (v === 'agent') return '代理'
  if (v === 'direct') return '直客'
  if (v === 'other') return '其他'
  return v
}

const scopePolicies = computed(() => getScopePolicies())
const activePolicyCount = computed(() => scopePolicies.value.filter((p) => p.status === 'active').length)
const summaryPolicy = computed(() => scopePolicies.value[0] || null)
const summaryDefaults = computed(() => getScopePolicyDefaults())

const formatRangeText = () => {
  return '标准账号 · 代理、直客'
}

const calcImpactCount = (cfg) => passwordSecurityDemoState.users.filter((u) => isForceResetScopeUser(u, cfg)).length

const summaryTitle = computed(() => summaryPolicy.value?.title || String(summaryDefaults.value?.title || '密码安全升级'))
const summaryEffectiveTime = computed(() => summaryPolicy.value?.effective_time || String(summaryDefaults.value?.effective_time || '下次登录'))
const summaryRangeText = computed(() => formatRangeText(summaryPolicy.value || summaryDefaults.value))
const summaryImpactCount = computed(() => calcImpactCount(summaryPolicy.value || summaryDefaults.value))

const openPrdEntry = () => openPrd('prd-crm-password-security-force-reset.html', 'CRM 密码安全与风险触发强制重置 - PRD')

const createDialog = ref({ open: false })
const createForm = ref({
  title: '',
  account_types: [],
  biz_identities: [],
  user_notice: '',
  effective_mode: 'next_login',
  effective_at: '',
})
const createErrors = ref({ title: '', scope: '', user_notice: '', effective_at: '' })

const syncCreateForm = () => {
  const d = summaryDefaults.value || {}
  createErrors.value = { title: '', scope: '', user_notice: '', effective_at: '' }
  createForm.value = {
    title: String(d.title || '密码安全升级'),
    account_types: ['standard'],
    biz_identities: ['agent', 'direct'],
    user_notice: '',
    effective_mode: 'next_login',
    effective_at: '',
  }
}

const createFormRangeText = computed(() => formatRangeText(createForm.value))
const createFormImpactCount = computed(() => passwordSecurityDemoState.users.filter((u) => isForceResetScopeUser(u, createForm.value)).length)

const openCreateDialog = () => {
  syncCreateForm()
  createDialog.value.open = true
}

const validateCreateForm = () => {
  createErrors.value = { title: '', scope: '', user_notice: '', effective_at: '' }
  const title = String(createForm.value.title || '')
  if (!title.trim()) createErrors.value.title = '请输入策略标题'
  if (!String(createForm.value.user_notice || '').trim()) createErrors.value.user_notice = '请输入用户提示'
  createForm.value.account_types = ['standard']
  createForm.value.biz_identities = ['agent', 'direct']
  if (String(createForm.value.effective_mode || '') === 'scheduled' && !String(createForm.value.effective_at || '').trim()) createErrors.value.effective_at = '请选择指定时间'
  return !(createErrors.value.title || createErrors.value.user_notice || createErrors.value.effective_at)
}

const enableDialog = ref({ open: false, policyId: '' })

const openEnableDialog = (policyId) => {
  enableDialog.value.policyId = String(policyId || '')
  enableDialog.value.open = true
}

const formatScheduleTime = (v) => {
  const raw = String(v || '').trim()
  if (!raw) return ''
  const [d, t] = raw.split('T')
  if (!d || !t) return ''
  const hhmm = t.slice(0, 5)
  if (!hhmm.includes(':')) return ''
  return `${d} ${hhmm}:00`
}

const submitCreatePolicy = () => {
  if (!validateCreateForm()) return
  const mode = String(createForm.value.effective_mode || 'next_login')
  const scheduledText = mode === 'scheduled' ? formatScheduleTime(createForm.value.effective_at) : ''
  const effectiveTime = mode === 'scheduled' ? scheduledText : '下次登录'

  const res = createScopePolicy(
    {
      title: createForm.value.title,
      account_types: ['standard'],
      biz_identities: ['agent', 'direct'],
      user_notice: createForm.value.user_notice,
      effective_time: effectiveTime,
    },
    '系统管理员（演示）'
  )
  if (!res.ok) {
    createErrors.value.title = res.message || '保存失败'
    return
  }
  createDialog.value.open = false

  let shouldEnable = mode === 'next_login'
  if (mode === 'scheduled') {
    const ts = createForm.value.effective_at ? new Date(String(createForm.value.effective_at)).getTime() : NaN
    shouldEnable = Number.isFinite(ts) && ts <= Date.now()
  }

  if (!shouldEnable) {
    ElMessage.success('新增规则成功（未生效）')
    return
  }

  const enableRes = enableScopePolicy(res.policyId, '系统管理员（演示）')
  if (!enableRes.ok) {
    ElMessage.error(enableRes.message || '启用失败')
    return
  }
  ElMessage.success(`新增规则成功（生效中，影响 ${enableRes.impact} 个账号）`)
}

const enableTargetPolicy = computed(() => getScopePolicyById(enableDialog.value.policyId))
const enableRangeText = computed(() => formatRangeText(enableTargetPolicy.value || {}))
const enableEffectiveTime = computed(() => enableTargetPolicy.value?.effective_time || '下次登录')
const enableImpactCount = computed(() => {
  const p = enableTargetPolicy.value
  if (!p) return 0
  return p.status === 'pending' ? calcImpactCount(p) : Number(p.impact_count || 0)
})

const confirmEnablePolicy = () => {
  const pid = enableDialog.value.policyId
  if (!pid) return
  const res = enableScopePolicy(pid, '系统管理员（演示）')
  if (!res.ok) {
    ElMessage.error(res.message || '操作失败')
    return
  }
  enableDialog.value.open = false
  ElMessage.success(`已启用配置（影响 ${res.impact} 个账号）`)
}

const handleDisable = async (policyId) => {
  await ElMessageBox.confirm('确认停用该配置？停用后不再对新登录生效。', '停用确认', { confirmButtonText: '确认停用', cancelButtonText: '取消', type: 'warning' })
  const res = disableScopePolicy(policyId, '系统管理员（演示）')
  if (!res.ok) {
    ElMessage.error(res.message || '停用失败')
    return
  }
  ElMessage.success('已停用')
}

const viewDialog = ref({ open: false, policyId: '' })
const viewPolicy = computed(() => getScopePolicyById(viewDialog.value.policyId))
const openViewDialog = (policyId) => {
  viewDialog.value.policyId = String(policyId || '')
  viewDialog.value.open = true
}

const statusLabel = (status) => {
  if (status === 'pending') return '未生效'
  if (status === 'active') return '生效中'
  if (status === 'completed') return '已完成'
  if (status === 'disabled') return '已停用'
  return '未知'
}

const statusTagClass = (status) => {
  if (status === 'active') return 'bg-emerald-50 text-emerald-700 border-emerald-100'
  if (status === 'pending') return 'bg-gray-100 text-gray-500 border-gray-200'
  if (status === 'completed') return 'bg-blue-50 text-blue-700 border-blue-100'
  if (status === 'disabled') return 'bg-rose-50 text-rose-700 border-rose-100'
  return 'bg-gray-100 text-gray-500 border-gray-200'
}

const allUsers = computed(() => passwordSecurityDemoState.users || [])
const userOptions = computed(() =>
  allUsers.value.map((u) => {
    const isStandard = String(u.account_type) === 'standard'
    const isSystem = String(u.account_type) === 'system'
    const isAgentOrDirect = String(u.biz_identity) === 'agent' || String(u.biz_identity) === 'direct'
    const disabled = !isStandard || !isAgentOrDirect
    const reason = isSystem ? '系统账号不可选' : !isStandard ? '仅标准账号可选' : !isAgentOrDirect ? '仅代理/直客可选' : ''
    const label = reason ? `${u.name}（${reason}）` : `${u.name}`
    return { value: u.user_id, label, disabled }
  })
)

const selectedUserIds = ref([])
const selectedUsers = computed(() => selectedUserIds.value.map((id) => getDemoUserById(id)).filter(Boolean))
const removeSelected = (id) => {
  selectedUserIds.value = selectedUserIds.value.filter((x) => x !== id)
}

const singleBatches = computed(() => getSingleForceResetBatches())
const singleBatchStatusLabel = (status) => {
  if (status === 'active') return '生效中'
  if (status === 'partial_completed') return '部分完成'
  if (status === 'completed') return '已完成'
  if (status === 'terminated') return '已终止'
  return '未知'
}
const singleBatchStatusTagClass = (status) => {
  if (status === 'active') return 'bg-emerald-50 text-emerald-700 border-emerald-100'
  if (status === 'partial_completed') return 'bg-amber-50 text-amber-700 border-amber-100'
  if (status === 'completed') return 'bg-blue-50 text-blue-700 border-blue-100'
  if (status === 'terminated') return 'bg-rose-50 text-rose-700 border-rose-100'
  return 'bg-gray-100 text-gray-500 border-gray-200'
}
const canTerminateSingleBatch = (batch) => {
  const status = String(batch?.status || '')
  return status === 'active' || status === 'partial_completed'
}

const singleBatchConfirm = ref({ open: false })
const openSingleBatchConfirm = () => {
  singleBatchConfirm.value.open = true
}

const submitSingleBatch = () => {
  const res = submitSingleForceResetBatch(selectedUserIds.value, '系统管理员（演示）', '下次登录')
  if (!res.ok) {
    ElMessage.error(res.message || '提交失败')
    return
  }
  singleBatchConfirm.value.open = false
  selectedUserIds.value = []
  ElMessage.success(`提交成功：${res.result}`)
}

const singleBatchView = ref({ open: false, batchId: '' })
const viewSingleBatch = computed(() => singleBatches.value.find((b) => b.batch_id === singleBatchView.value.batchId) || null)
const viewSingleBatchUsers = computed(() => {
  const b = viewSingleBatch.value
  if (!b) return []
  const states = Array.isArray(b.user_states) ? b.user_states : []
  if (states.length > 0) return states
  const ids = Array.isArray(b.user_ids) ? b.user_ids : []
  return ids.map((id) => ({ user_id: String(id || ''), submit_result: 'failed', current_status: 'failed', terminated_before_blocked: null, terminated_after_blocked: null }))
})
const openSingleBatchView = (batchId) => {
  singleBatchView.value.batchId = String(batchId || '')
  singleBatchView.value.open = true
}

const singleBatchSubmitResultLabel = (r) => {
  if (r === 'success') return '成功'
  if (r === 'existed') return '已存在'
  if (r === 'failed') return '失败'
  return '—'
}
const singleBatchSubmitResultClass = (r) => {
  if (r === 'success') return 'text-emerald-700'
  if (r === 'existed') return 'text-amber-700'
  if (r === 'failed') return 'text-rose-700'
  return 'text-gray-400'
}
const singleBatchUserStatusLabel = (s) => {
  if (s === 'pending') return '待完成'
  if (s === 'completed') return '已完成'
  if (s === 'terminated') return '已终止'
  if (s === 'existed') return '已存在'
  if (s === 'failed') return '失败'
  return '—'
}
const singleBatchUserStatusClass = (s) => {
  if (s === 'pending') return 'text-gray-700'
  if (s === 'completed') return 'text-emerald-700'
  if (s === 'terminated') return 'text-rose-700'
  if (s === 'existed') return 'text-amber-700'
  if (s === 'failed') return 'text-rose-700'
  return 'text-gray-400'
}

const terminateSingleBatch = async (batchId) => {
  try {
    const { value } = await ElMessageBox.prompt('请输入终止原因（可选）', '终止确认', {
      confirmButtonText: '确认终止',
      cancelButtonText: '取消',
      type: 'warning',
      inputPlaceholder: '例如：误操作/范围调整',
      inputValidator: (v) => (String(v || '').length <= 50 ? true : '终止原因最多 50 字'),
    })
    const res = terminateSingleForceResetBatch(batchId, '系统管理员（演示）', value || '')
    if (!res.ok) {
      ElMessage.error(res.message || '终止失败')
      return
    }
    ElMessage.success('已终止该批次')
  } catch {}
}
</script>
