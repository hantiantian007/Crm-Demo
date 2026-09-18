<template>
  <div class="flex h-full bg-mainBg overflow-hidden w-full">
    <div class="flex-1 flex flex-col min-w-0 bg-gray-50 overflow-hidden p-4 custom-scrollbar overflow-y-auto w-full">
      <main class="flex-1 overflow-y-auto p-4 md:p-6 bg-mainBg">
        <div class="space-y-5 w-full">
          <section class="bg-white rounded-xl border border-gray-200 p-5">
            <div class="text-sm font-semibold text-gray-700 mb-4">基础配置</div>
            <div class="basic-grid">
              <div class="form-row">
                <div class="form-label">
                  <span class="req">*</span>
                  <span>销售名称</span>
                </div>
                <div class="form-control">
                  <div class="combo">
                    <input
                      ref="salesNameInputRef"
                      v-model="form.salesNameQuery"
                      class="input"
                      :class="salesNameError ? 'input-error' : ''"
                      placeholder="请输入销售名称进行查询"
                      @focus="
                        nameDropdownVisible = true
                      "
                      @input="nameDropdownVisible = true; salesNameError = false"
                    />
                    <button class="combo-arrow" type="button" @click="nameDropdownVisible = !nameDropdownVisible">
                      <i class="fa-solid fa-chevron-down text-[10px]"></i>
                    </button>
                    <div v-if="nameDropdownVisible" class="combo-panel" @mousedown.prevent>
                      <button v-for="opt in filteredSalesOptions" :key="opt.value" class="combo-item" type="button" @click="selectSales(opt)">
                        <div class="combo-item-title">{{ opt.label }}</div>
                        <div class="combo-item-sub">{{ opt.email }}</div>
                      </button>
                      <div v-if="filteredSalesOptions.length === 0" class="combo-empty">无匹配结果</div>
                    </div>
                  </div>
                  <div v-if="form.salesNameValue" class="help">已选择：{{ form.salesNameValue }}（{{ form.salesEmail }}）</div>
                </div>
              </div>

              <div class="form-row">
                <div class="form-label">
                  <span class="req">*</span>
                  <span>是否享受返佣</span>
                </div>
                <div class="form-control">
                  <div class="radio-group">
                    <label class="radio">
                      <input v-model="form.commissionEnabled" type="radio" value="yes" />
                      <span>是</span>
                    </label>
                    <label class="radio">
                      <input v-model="form.commissionEnabled" type="radio" value="no" />
                      <span>否</span>
                    </label>
                  </div>
                  <div class="help">
                    <span v-if="form.commissionEnabled === 'yes'">选择“是”代表继承基础分佣配置（演示说明）。</span>
                    <span v-else-if="form.commissionEnabled === 'no'">选择“否”代表不参与基础返佣（演示说明）。</span>
                    <span v-else>请选择是否享受返佣。</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section class="bg-white rounded-xl border border-gray-200 p-5">
            <div class="text-sm font-semibold text-gray-700 mb-4">交易返佣配置</div>
            <div class="section-grid">
              <div class="form-row">
                <div class="form-label">
                  <span class="req">*</span>
                  <span>是否开启交易返佣</span>
                </div>
                <div class="form-control">
                  <div class="radio-group">
                    <label class="radio">
                      <input v-model="form.tradingRewardEnabled" type="radio" value="yes" />
                      <span>是</span>
                    </label>
                    <label class="radio">
                      <input v-model="form.tradingRewardEnabled" type="radio" value="no" />
                      <span>否</span>
                    </label>
                  </div>
                </div>
              </div>

              <template v-if="form.tradingRewardEnabled === 'yes'">
                <div class="form-row grid-span-2">
                  <div class="form-label">
                    <span class="req">*</span>
                    <span>交易返佣计算方式</span>
                  </div>
                  <div class="form-control">
                    <div class="radio-group">
                      <label class="radio">
                        <input v-model="form.tradingCalcMode" type="radio" value="uniform" />
                        <span>统一计算</span>
                      </label>
                      <label class="radio">
                        <input v-model="form.tradingCalcMode" type="radio" value="rule" />
                        <span>规则计算</span>
                      </label>
                      <label class="radio">
                        <input v-model="form.tradingCalcMode" type="radio" value="teamNetDepositTier" />
                        <span>净入金阶梯计算</span>
                      </label>
                    </div>
                  </div>
                </div>

                <div v-if="form.tradingCalcMode === 'uniform'" class="form-row grid-span-2">
                  <div class="form-label">
                    <span class="req">*</span>
                    <span>全产品返佣金额</span>
                  </div>
                  <div class="form-control">
                    <div class="table-head">
                      <div class="table-title">全产品返佣（演示数据）</div>
                      <div class="flex items-center gap-2">
                        <button v-if="!tradingTableEditing" class="btn btn-outline btn-sm" type="button" @click="tradingTableEditing = true">编辑</button>
                        <template v-else>
                          <button class="btn btn-primary btn-sm" type="button" @click="saveTradingTable">保存</button>
                          <button class="btn btn-outline btn-sm" type="button" @click="cancelTradingTable">取消</button>
                        </template>
                      </div>
                    </div>
                    <div class="overflow-x-auto border border-gray-200 rounded-lg">
                      <table class="min-w-[640px] w-full text-xs">
                        <thead class="bg-tableHeader text-gray-600">
                          <tr>
                            <th class="text-left font-medium px-4 py-3 whitespace-nowrap">产品名称</th>
                            <th class="text-left font-medium px-4 py-3 whitespace-nowrap">返佣类型</th>
                            <th class="text-left font-medium px-4 py-3 whitespace-nowrap">返佣值</th>
                          </tr>
                        </thead>
                        <tbody class="text-gray-700">
                          <tr v-for="row in tradingUniformDraft" :key="row.product" class="border-t border-gray-100">
                            <td class="px-4 py-3 whitespace-nowrap">{{ row.product }}</td>
                            <td class="px-4 py-3 whitespace-nowrap">
                              <select v-if="tradingTableEditing" v-model="row.rewardType" class="input input-sm">
                                <option value="fixed">固定金额</option>
                                <option value="point">点值</option>
                              </select>
                              <span v-else>{{ row.rewardType === 'fixed' ? '固定金额' : '点值' }}</span>
                            </td>
                            <td class="px-4 py-3 whitespace-nowrap">
                              <input v-if="tradingTableEditing" v-model="row.rewardValue" class="input input-sm w-[140px]" inputmode="decimal" />
                              <span v-else>{{ row.rewardValue }}</span>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>

                <div v-else-if="form.tradingCalcMode === 'rule'" class="form-row grid-span-2">
                  <div class="form-label">
                    <span class="req">*</span>
                    <span>交易返佣金额</span>
                  </div>
                  <div class="form-control">
                    <button class="btn btn-outline" type="button" @click="tradingRuleModalVisible = true">点击配置</button>
                  </div>
                </div>

                <div v-else-if="form.tradingCalcMode === 'teamNetDepositTier'" class="form-row grid-span-2">
                  <div class="form-label">
                    <span class="req">*</span>
                    <span>交易返佣金额</span>
                  </div>
                  <div class="form-control">
                    <div class="flex items-center justify-between gap-4 mb-2">
                      <div class="text-sm font-semibold text-gray-700">默认阶梯配置</div>
                      <div class="flex items-center gap-2">
                        <button v-if="!tierEditing" class="btn btn-outline btn-sm" type="button" @click="startEditTierTable">编辑</button>
                        <template v-else>
                          <button class="btn btn-outline-gold btn-sm" type="button" @click="addTierRow">新增档位</button>
                          <button class="btn btn-primary btn-sm" type="button" @click="saveTierTable">保存</button>
                          <button class="btn btn-outline btn-sm" type="button" @click="cancelTierTable">取消</button>
                        </template>
                      </div>
                    </div>
                    <div class="text-xs text-gray-500 mb-3">适用于未配置代理或MT分组特殊规则的客户及交易账户。</div>

                    <div class="tier-products">
                      <div class="tier-products-label">产品</div>
                      <div class="tier-products-tabs">
                        <button
                          v-for="opt in tierProductOptions"
                          :key="opt.key"
                          class="tier-product-tab"
                          :class="selectedDefaultProductKey === opt.key ? 'is-active' : ''"
                          type="button"
                          @click="selectedDefaultProductKey = opt.key"
                        >
                          {{ opt.label }}
                        </button>
                      </div>
                    </div>

                    <div class="overflow-x-auto border border-gray-200 rounded-lg">
                      <table class="min-w-[760px] w-full text-xs">
                        <thead class="bg-tableHeader text-gray-600">
                          <tr>
                            <th class="text-left font-medium px-4 py-3 whitespace-nowrap">净入金起始值（USD）</th>
                            <th class="text-left font-medium px-4 py-3 whitespace-nowrap">净入金结束值（USD）</th>
                            <th class="text-left font-medium px-4 py-3 whitespace-nowrap">返佣金额</th>
                            <th class="text-left font-medium px-4 py-3 whitespace-nowrap">单位</th>
                            <th class="text-left font-medium px-4 py-3 whitespace-nowrap w-[90px]">操作</th>
                          </tr>
                        </thead>
                        <tbody class="text-gray-700">
                          <tr v-for="(row, idx) in tierDraft" :key="row.id" class="border-t border-gray-100">
                            <td class="px-4 py-3 whitespace-nowrap">
                              <span>{{ formatMoney(row.start) }}</span>
                            </td>
                            <td class="px-4 py-3 whitespace-nowrap">
                              <input
                                v-if="tierEditing && row.endType === 'value'"
                                v-model="row.end"
                                class="input input-sm w-[160px]"
                                :class="tierFieldErrors[row.id]?.end ? 'input-error' : ''"
                                inputmode="decimal"
                              />
                              <span v-else>{{ row.endType === 'unlimited' ? '不设上限' : formatMoney(row.end) }}</span>
                            </td>
                            <td class="px-4 py-3 whitespace-nowrap">
                              <input v-if="tierEditing" v-model="row.commission" class="input input-sm w-[140px]" inputmode="decimal" />
                              <span v-else>{{ formatMoney(row.commission) }}</span>
                            </td>
                            <td class="px-4 py-3 whitespace-nowrap">{{ row.unit }}</td>
                            <td class="px-4 py-3 whitespace-nowrap w-[90px]">
                              <button v-if="tierEditing" class="btn-danger-text" type="button" @click="deleteTierRow(idx)">删除</button>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                    <div class="mt-4 tier-diff">
                      <div class="tier-diff-row">
                        <div class="tier-diff-label">是否启用差异化阶梯</div>
                        <div class="tier-diff-control">
                          <div class="radio-group">
                            <label class="radio">
                              <input v-model="diffTierEnabled" type="radio" value="no" />
                              <span>否</span>
                            </label>
                            <label class="radio">
                              <input v-model="diffTierEnabled" type="radio" value="yes" />
                              <span>是</span>
                            </label>
                          </div>
                        </div>
                      </div>

                      <template v-if="diffTierEnabled === 'yes'">
                        <div class="mt-3 flex items-center gap-12 flex-wrap">
                          <button class="btn btn-outline-gold" type="button" @click="handleDiffTierEntryClick">配置差异化阶梯</button>
                        </div>
                        <div class="help">MT分组＋产品 &gt; 最近一级已配置代理＋产品 &gt; 默认配置＋产品</div>
                        <div class="mt-3">
                          <div v-if="diffSummary.hasAny" class="diff-summary">
                            <div class="diff-summary-head">
                              <div class="text-sm font-semibold text-gray-700">差异化阶梯摘要</div>
                              <button class="btn btn-outline-gold btn-sm" type="button" @click="handleDiffTierEntryClick">查看/编辑配置</button>
                            </div>
                            <div class="diff-summary-row">
                              <div class="diff-summary-label">已配置代理</div>
                              <div class="diff-summary-value">{{ diffSummary.agentCount }}个</div>
                            </div>
                            <div class="diff-summary-row">
                              <div class="diff-summary-label">已配置MT分组</div>
                              <div class="diff-summary-value">{{ diffSummary.mtCount }}个</div>
                            </div>
                            <div class="diff-summary-block">
                              <div class="diff-summary-subtitle">代理规则</div>
                              <div v-for="line in diffSummary.agentLines" :key="line" class="diff-summary-line">{{ line }}</div>
                            </div>
                            <div class="diff-summary-block">
                              <div class="diff-summary-subtitle">MT分组规则</div>
                              <div v-for="line in diffSummary.mtLines" :key="line" class="diff-summary-line">{{ line }}</div>
                            </div>
                          </div>
                          <div v-else class="help">暂未配置代理或MT分组特殊阶梯，当前全部使用默认规则。</div>
                        </div>
                      </template>
                    </div>

                  </div>
                </div>

                <div class="form-row">
                  <div class="form-label">
                    <span class="req">*</span>
                    <span>交易持仓间隔</span>
                  </div>
                  <div class="form-control">
                    <div class="inline-field">
                      <input v-model="form.holdIntervalSec" class="input w-[220px]" inputmode="numeric" placeholder="请输入" />
                      <div class="unit">秒</div>
                    </div>
                    <div class="help">仅允许输入大于等于0的整数。</div>
                  </div>
                </div>

                <div class="form-row">
                  <div class="form-label">
                    <span class="req">*</span>
                    <span>交易返佣结算周期</span>
                  </div>
                  <div class="form-control">
                    <select v-model="form.tradingSettleCycle" class="input">
                      <option value="realtime">实时</option>
                      <option value="daily">每日</option>
                      <option value="weekly">每周</option>
                      <option value="monthly">每月</option>
                      <option value="quarterly">每季度</option>
                      <option value="yearly">每年</option>
                    </select>
                  </div>
                </div>
              </template>

              <div v-else-if="form.tradingRewardEnabled === 'no'" class="form-row grid-span-2">
                <div class="form-label"></div>
                <div class="form-control">
                  <div class="help">关闭后将隐藏交易返佣相关配置项。</div>
                </div>
              </div>
            </div>
          </section>

          <section class="bg-white rounded-xl border border-gray-200 p-5">
            <div class="text-sm font-semibold text-gray-700 mb-4">净入金奖励配置</div>
            <div class="section-grid">
              <div class="form-row">
                <div class="form-label">
                  <span class="req">*</span>
                  <span>是否开启净入金奖励</span>
                </div>
                <div class="form-control">
                  <div class="radio-group">
                    <label class="radio">
                      <input v-model="form.netDepositRewardEnabled" type="radio" value="yes" />
                      <span>是</span>
                    </label>
                    <label class="radio">
                      <input v-model="form.netDepositRewardEnabled" type="radio" value="no" />
                      <span>否</span>
                    </label>
                  </div>
                </div>
              </div>

              <template v-if="form.netDepositRewardEnabled === 'yes'">
                <div class="form-row">
                  <div class="form-label">
                    <span class="req">*</span>
                    <span>是否计算历史净入金</span>
                  </div>
                  <div class="form-control">
                    <div class="radio-group">
                      <label class="radio">
                        <input v-model="form.calcHistoryNetDeposit" type="radio" value="yes" />
                        <span>是</span>
                      </label>
                      <label class="radio">
                        <input v-model="form.calcHistoryNetDeposit" type="radio" value="no" />
                        <span>否</span>
                      </label>
                    </div>
                  </div>
                </div>

                <div class="form-row">
                  <div class="form-label">
                    <span class="req">*</span>
                    <span>是否计算历史交易量</span>
                  </div>
                  <div class="form-control">
                    <div class="radio-group">
                      <label class="radio">
                        <input v-model="form.calcHistoryTradingVolume" type="radio" value="yes" />
                        <span>是</span>
                      </label>
                      <label class="radio">
                        <input v-model="form.calcHistoryTradingVolume" type="radio" value="no" />
                        <span>否</span>
                      </label>
                    </div>
                  </div>
                </div>
              </template>

              <div class="form-row">
                <div class="form-label">
                  <span class="req">*</span>
                  <span>计算开始时间</span>
                </div>
                <div class="form-control">
                  <div class="radio-group">
                    <label class="radio">
                      <input v-model="form.calcStartTime" type="radio" value="registerTime" />
                      <span>注册时间</span>
                    </label>
                    <label class="radio">
                      <input v-model="form.calcStartTime" type="radio" value="ruleStartTime" />
                      <span>规则启动时间</span>
                    </label>
                  </div>
                </div>
              </div>

              <template v-if="form.netDepositRewardEnabled === 'yes'">
                <div class="form-row grid-span-2">
                  <div class="form-label">
                    <span class="req">*</span>
                    <span>交易量规则</span>
                  </div>
                  <div class="form-control">
                    <select v-model="form.tradingVolumeRule" class="input">
                      <option value="">请选择计算方式</option>
                      <option value="single">单个用户</option>
                      <option value="allSum">所有用户合计计算</option>
                      <option value="groupUser">分组/用户计算</option>
                    </select>
                    <div v-if="form.tradingVolumeRule === 'single' || form.tradingVolumeRule === 'allSum'" class="mt-3">
                      <input v-model="form.tradingVolumeInput" class="input w-full md:w-[360px]" inputmode="decimal" placeholder="请输入交易量" />
                    </div>
                    <div v-else-if="form.tradingVolumeRule === 'groupUser'" class="mt-3">
                      <button class="btn btn-outline" type="button" @click="volumeRuleModalVisible = true">点击配置</button>
                    </div>
                  </div>
                </div>

                <div class="form-row grid-span-2">
                  <div class="form-label">
                    <span class="req">*</span>
                    <span>净入金奖励计算方式</span>
                  </div>
                  <div class="form-control">
                    <div class="radio-group radio-group-wrap">
                      <label class="radio">
                        <input v-model="form.netDepositCalcMode" type="radio" value="perUser" />
                        <span>所有用户单个计算</span>
                      </label>
                      <label class="radio">
                        <input v-model="form.netDepositCalcMode" type="radio" value="allSum" />
                        <span>所有用户合计计算</span>
                      </label>
                      <label class="radio">
                        <input v-model="form.netDepositCalcMode" type="radio" value="groupUser" />
                        <span>分组/用户计算</span>
                      </label>
                    </div>
                    <div v-if="form.netDepositCalcMode === 'perUser' || form.netDepositCalcMode === 'allSum'" class="mt-3 grid grid-cols-1 md:grid-cols-2 gap-3">
                      <input v-model="form.netDepositValue" class="input" inputmode="decimal" placeholder="请输入净入金值" />
                      <div class="inline-field">
                        <input v-model="form.netDepositRate" class="input" inputmode="decimal" placeholder="请输入净入金奖励比例" />
                        <div class="unit">%</div>
                      </div>
                    </div>
                    <div v-else-if="form.netDepositCalcMode === 'groupUser'" class="mt-3">
                      <button class="btn btn-outline" type="button" @click="netDepositConditionModalVisible = true">点击配置</button>
                    </div>
                  </div>
                </div>

                <div class="form-row">
                  <div class="form-label">
                    <span class="req">*</span>
                    <span>净入金奖励周期</span>
                  </div>
                  <div class="form-control">
                    <select v-model="form.netDepositCycle" class="input">
                      <option value="">请选择</option>
                      <option value="daily">日结</option>
                      <option value="monthly">每月</option>
                      <option value="quarterly">每季度</option>
                      <option value="yearly">每年</option>
                    </select>
                  </div>
                </div>
              </template>
            </div>
          </section>

          <div class="flex items-center gap-3">
            <button class="btn btn-outline w-[110px]" type="button" @click="handleBack">返回</button>
            <button class="btn btn-primary w-[110px]" type="button" @click="handleSubmit">提交</button>
          </div>
        </div>
      </main>
    </div>

    <div v-if="tradingRuleModalVisible" class="mask" @click.self="tradingRuleModalVisible = false">
      <div class="modal modal-wide">
        <div class="modal-title">交易奖励金额配置</div>
        <div class="modal-tabs">
          <button class="tab" :class="tradingRuleTab === 'user' ? 'is-active' : ''" type="button" @click="tradingRuleTab = 'user'">按用户配置</button>
          <button class="tab" :class="tradingRuleTab === 'group' ? 'is-active' : ''" type="button" @click="tradingRuleTab = 'group'">按分组配置</button>
        </div>
        <div class="modal-body">
          <div class="modal-grid">
            <div class="modal-left">
              <div class="modal-left-title">{{ tradingRuleTab === 'user' ? '关系树（演示）' : '分组列表（演示）' }}</div>
              <div class="modal-left-box">
                <div class="modal-left-item" v-for="n in 6" :key="n">{{ tradingRuleTab === 'user' ? '节点 ' + n : '分组 ' + n }}</div>
              </div>
            </div>
            <div class="modal-right">
              <div class="modal-right-title">产品奖励配置（演示）</div>
              <div class="overflow-x-auto border border-gray-200 rounded-lg">
                <table class="min-w-[640px] w-full text-xs">
                  <thead class="bg-tableHeader text-gray-600">
                    <tr>
                      <th class="text-left font-medium px-4 py-3 whitespace-nowrap">产品名称</th>
                      <th class="text-left font-medium px-4 py-3 whitespace-nowrap">奖励类型</th>
                      <th class="text-left font-medium px-4 py-3 whitespace-nowrap">奖励值</th>
                    </tr>
                  </thead>
                  <tbody class="text-gray-700">
                    <tr v-for="row in tradingUniformDraft" :key="row.product" class="border-t border-gray-100">
                      <td class="px-4 py-3 whitespace-nowrap">{{ row.product }}</td>
                      <td class="px-4 py-3 whitespace-nowrap">{{ row.rewardType === 'fixed' ? '固定金额' : '点值' }}</td>
                      <td class="px-4 py-3 whitespace-nowrap">{{ row.rewardValue }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-actions">
          <button class="btn btn-primary btn-sm" type="button" @click="tradingRuleModalVisible = false">保存</button>
          <button class="btn btn-outline btn-sm" type="button" @click="tradingRuleModalVisible = false">取消</button>
        </div>
      </div>
    </div>

    <div v-if="volumeRuleModalVisible" class="mask" @click.self="volumeRuleModalVisible = false">
      <div class="modal modal-wide">
        <div class="modal-title">交易量规则配置</div>
        <div class="modal-tabs">
          <button class="tab" :class="volumeRuleTab === 'user' ? 'is-active' : ''" type="button" @click="volumeRuleTab = 'user'">按用户配置</button>
          <button class="tab" :class="volumeRuleTab === 'group' ? 'is-active' : ''" type="button" @click="volumeRuleTab = 'group'">按分组配置</button>
        </div>
        <div class="modal-body">
          <div class="modal-grid">
            <div class="modal-left">
              <div class="modal-left-title">{{ volumeRuleTab === 'user' ? '用户列表（演示）' : '分组列表（演示）' }}</div>
              <div class="modal-left-box">
                <div class="modal-left-item" v-for="n in 6" :key="n">{{ volumeRuleTab === 'user' ? '用户 ' + n : '分组 ' + n }}</div>
              </div>
            </div>
            <div class="modal-right">
              <div class="modal-right-title">交易量配置（演示）</div>
              <div class="overflow-x-auto border border-gray-200 rounded-lg">
                <table class="min-w-[520px] w-full text-xs">
                  <thead class="bg-tableHeader text-gray-600">
                    <tr>
                      <th class="text-left font-medium px-4 py-3 whitespace-nowrap">对象</th>
                      <th class="text-left font-medium px-4 py-3 whitespace-nowrap">交易量</th>
                    </tr>
                  </thead>
                  <tbody class="text-gray-700">
                    <tr v-for="n in 6" :key="n" class="border-t border-gray-100">
                      <td class="px-4 py-3 whitespace-nowrap">{{ volumeRuleTab === 'user' ? '用户 ' + n : '分组 ' + n }}</td>
                      <td class="px-4 py-3 whitespace-nowrap">0</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-actions">
          <button class="btn btn-primary btn-sm" type="button" @click="volumeRuleModalVisible = false">保存</button>
          <button class="btn btn-outline btn-sm" type="button" @click="volumeRuleModalVisible = false">取消</button>
        </div>
      </div>
    </div>

    <div v-if="netDepositConditionModalVisible" class="mask" @click.self="netDepositConditionModalVisible = false">
      <div class="modal modal-wide">
        <div class="modal-title">净入金奖励条件配置</div>
        <div class="modal-tabs">
          <button class="tab" :class="netDepositTab === 'user' ? 'is-active' : ''" type="button" @click="netDepositTab = 'user'">按用户配置</button>
          <button class="tab" :class="netDepositTab === 'group' ? 'is-active' : ''" type="button" @click="netDepositTab = 'group'">按分组配置</button>
        </div>
        <div class="modal-body">
          <div class="modal-grid">
            <div class="modal-left">
              <div class="modal-left-title">{{ netDepositTab === 'user' ? '用户列表（演示）' : '分组列表（演示）' }}</div>
              <div class="modal-left-box">
                <div class="modal-left-item" v-for="n in 6" :key="n">{{ netDepositTab === 'user' ? '用户 ' + n : '分组 ' + n }}</div>
              </div>
            </div>
            <div class="modal-right">
              <div class="modal-right-title">条件配置（演示）</div>
              <div class="overflow-x-auto border border-gray-200 rounded-lg">
                <table class="min-w-[640px] w-full text-xs">
                  <thead class="bg-tableHeader text-gray-600">
                    <tr>
                      <th class="text-left font-medium px-4 py-3 whitespace-nowrap">对象</th>
                      <th class="text-left font-medium px-4 py-3 whitespace-nowrap">净入金值</th>
                      <th class="text-left font-medium px-4 py-3 whitespace-nowrap">奖励比例(%)</th>
                    </tr>
                  </thead>
                  <tbody class="text-gray-700">
                    <tr v-for="n in 6" :key="n" class="border-t border-gray-100">
                      <td class="px-4 py-3 whitespace-nowrap">{{ netDepositTab === 'user' ? '用户 ' + n : '分组 ' + n }}</td>
                      <td class="px-4 py-3 whitespace-nowrap">0</td>
                      <td class="px-4 py-3 whitespace-nowrap">0</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-actions">
          <button class="btn btn-primary btn-sm" type="button" @click="netDepositConditionModalVisible = false">保存</button>
          <button class="btn btn-outline btn-sm" type="button" @click="netDepositConditionModalVisible = false">取消</button>
        </div>
      </div>
    </div>

    <div v-if="diffTierModalVisible" class="mask" @click.self="handleDiffTierModalCancel">
      <div class="modal modal-diff">
        <div class="modal-title">差异化阶梯配置</div>
        <div class="modal-tabs">
          <button class="tab" :class="diffTierTab === 'agent' ? 'is-active' : ''" type="button" @click="diffTierTab = 'agent'">按代理配置</button>
          <button class="tab" :class="diffTierTab === 'mt' ? 'is-active' : ''" type="button" @click="diffTierTab = 'mt'">按MT分组配置</button>
        </div>
        <div class="diff-modal-head">
          <div class="diff-modal-line">
            <div class="diff-modal-label">当前销售</div>
            <div class="diff-modal-value">{{ form.salesNameValue || '-' }}</div>
          </div>
          <div class="diff-modal-line">
            <div class="diff-modal-label">规则优先级</div>
            <div class="diff-modal-value">MT分组＋产品 &gt; 最近一级已配置代理＋产品 &gt; 默认配置＋产品</div>
          </div>
          <div class="diff-modal-line">
            <div class="diff-modal-label">说明</div>
            <div class="diff-modal-value">同一订单只匹配一套规则，不叠加返佣。</div>
          </div>
        </div>
        <div class="modal-body">
          <div class="diff-grid">
            <div class="diff-left">
              <div v-if="diffTierTab === 'agent'" class="diff-left-title">代理关系</div>
              <div v-else class="diff-left-title">MT分组</div>

              <input v-if="diffTierTab === 'agent'" v-model="agentSearchQuery" class="input diff-search" placeholder="请输入代理名称或账号" />
              <input v-else v-model="mtSearchQuery" class="input diff-search" placeholder="请输入MT分组名称" />

              <div v-if="diffTierTab === 'agent'" class="diff-list">
                <div v-for="node in visibleAgentNodes" :key="node.id" class="tree-node" :class="selectedAgentId === node.id ? 'is-active' : ''" :style="{ paddingLeft: `${10 + node.depth * 16}px` }" @click="selectAgent(node.id)">
                  <button v-if="node.hasChildren" class="tree-toggle" type="button" @click.stop="toggleAgentExpanded(node.id)">
                    <i class="fa-solid" :class="node.expanded ? 'fa-chevron-down' : 'fa-chevron-right'"></i>
                  </button>
                  <div class="tree-main">
                    <div class="tree-title">{{ node.name }}</div>
                    <div class="tree-sub">{{ node.account }}</div>
                  </div>
                  <div class="tree-tag" :class="hasScopeConfig(agentRulesDraft[node.id]) ? 'is-config' : ''">{{ hasScopeConfig(agentRulesDraft[node.id]) ? '已配置' : '默认' }}</div>
                </div>
              </div>

              <div v-else class="diff-list">
                <div v-for="g in visibleMtGroups" :key="g.id" class="tree-node" :class="selectedMtGroupId === g.id ? 'is-active' : ''" @click="selectMtGroup(g.id)">
                  <div class="tree-main">
                    <div class="tree-title">{{ g.name }}</div>
                  </div>
                  <div class="tree-tag" :class="hasScopeConfig(mtRulesDraft[g.id]) ? 'is-config' : ''">{{ hasScopeConfig(mtRulesDraft[g.id]) ? '已配置' : '默认' }}</div>
                </div>
              </div>
            </div>

            <div class="diff-right">
              <template v-if="diffTierTab === 'agent'">
                <div v-if="selectedAgentId" class="diff-panel">
                  <div class="diff-panel-head">
                    <div>
                      <div class="diff-panel-title">{{ currentAgentNode?.name }}</div>
                      <div class="diff-panel-sub">{{ currentAgentNode?.account }}</div>
                    </div>
                  </div>

                  <div class="mt-3">
                    <div class="diff-product-bar">
                      <div class="diff-product-label">产品</div>
                      <div class="diff-product-controls">
                        <div class="diff-product-tabs">
                          <button
                            v-for="opt in tierProductOptions"
                            :key="opt.key"
                            class="diff-product-tab"
                            :class="getScopeSelectedProduct(agentRulesDraft[selectedAgentId]) === opt.key ? 'is-active' : ''"
                            type="button"
                            @click="setScopeSelectedProduct(agentRulesDraft[selectedAgentId], opt.key)"
                          >
                            {{ opt.label }}
                          </button>
                        </div>
                        <button
                          v-if="!scopeHasProduct(agentRulesDraft[selectedAgentId], getScopeSelectedProduct(agentRulesDraft[selectedAgentId]))"
                          class="btn btn-outline-gold btn-sm"
                          type="button"
                          @click="copyDefaultToScopeProduct(agentRulesDraft[selectedAgentId])"
                        >
                          复制默认阶梯并启用
                        </button>
                      </div>
                    </div>

                    <div v-if="!scopeHasProduct(agentRulesDraft[selectedAgentId], getScopeSelectedProduct(agentRulesDraft[selectedAgentId]))" class="help">
                      当前产品未启用覆盖规则，继承下一优先级规则（演示）。
                    </div>

                    <div class="flex items-center justify-between gap-4 mb-2 mt-3">
                      <div class="text-sm font-semibold text-gray-700">阶梯配置（演示数据）</div>
                      <div class="flex items-center gap-2">
                        <button v-if="!isScopeEditing(agentRulesDraft[selectedAgentId])" class="btn btn-outline btn-sm" type="button" @click="startEditScopeProduct(agentRulesDraft[selectedAgentId])">
                          编辑
                        </button>
                        <template v-else>
                          <button class="btn btn-outline-gold btn-sm" type="button" @click="addRuleTierRow(getScopeCurrentRule(agentRulesDraft[selectedAgentId]))">新增档位</button>
                          <button class="btn btn-primary btn-sm" type="button" @click="saveRuleTier(getScopeCurrentRule(agentRulesDraft[selectedAgentId]))">保存</button>
                          <button class="btn btn-outline btn-sm" type="button" @click="cancelRuleTier(getScopeCurrentRule(agentRulesDraft[selectedAgentId]))">取消</button>
                        </template>
                      </div>
                    </div>

                    <div class="overflow-x-auto border border-gray-200 rounded-lg">
                      <table class="min-w-[760px] w-full text-xs">
                        <thead class="bg-tableHeader text-gray-600">
                          <tr>
                            <th class="text-left font-medium px-4 py-3 whitespace-nowrap">净入金起始值（USD）</th>
                            <th class="text-left font-medium px-4 py-3 whitespace-nowrap">净入金结束值（USD）</th>
                            <th class="text-left font-medium px-4 py-3 whitespace-nowrap">返佣金额</th>
                            <th class="text-left font-medium px-4 py-3 whitespace-nowrap">单位</th>
                            <th class="text-left font-medium px-4 py-3 whitespace-nowrap w-[90px]">操作</th>
                          </tr>
                        </thead>
                        <tbody class="text-gray-700">
                          <tr v-for="(row, idx) in getScopeRows(agentRulesDraft[selectedAgentId])" :key="row.id" class="border-t border-gray-100">
                            <td class="px-4 py-3 whitespace-nowrap">
                              <span>{{ formatMoney(row.start) }}</span>
                            </td>
                            <td class="px-4 py-3 whitespace-nowrap">
                              <input
                                v-if="isScopeEditing(agentRulesDraft[selectedAgentId]) && row.endType === 'value'"
                                v-model="row.end"
                                class="input input-sm w-[160px]"
                                :class="getScopeCurrentRule(agentRulesDraft[selectedAgentId])?.fieldErrors?.[row.id]?.end ? 'input-error' : ''"
                                inputmode="decimal"
                              />
                              <span v-else>{{ row.endType === 'unlimited' ? '不设上限' : formatMoney(row.end) }}</span>
                            </td>
                            <td class="px-4 py-3 whitespace-nowrap">
                              <input v-if="isScopeEditing(agentRulesDraft[selectedAgentId])" v-model="row.commission" class="input input-sm w-[140px]" inputmode="decimal" />
                              <span v-else>{{ formatMoney(row.commission) }}</span>
                            </td>
                            <td class="px-4 py-3 whitespace-nowrap">{{ row.unit }}</td>
                            <td class="px-4 py-3 whitespace-nowrap w-[90px]">
                              <button
                                v-if="isScopeEditing(agentRulesDraft[selectedAgentId])"
                                class="btn-danger-text"
                                type="button"
                                @click="deleteRuleTierRow(getScopeCurrentRule(agentRulesDraft[selectedAgentId]), idx)"
                              >
                                删除
                              </button>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                  </div>
                </div>

                <div v-else class="help">请选择左侧代理。</div>
              </template>

              <template v-else>
                <div v-if="selectedMtGroupId" class="diff-panel">
                  <div class="diff-panel-head">
                    <div>
                      <div class="diff-panel-title">{{ currentMtGroup?.name }}</div>
                    </div>
                  </div>

                  <div class="mt-3">
                    <div class="diff-product-bar">
                      <div class="diff-product-label">产品</div>
                      <div class="diff-product-controls">
                        <div class="diff-product-tabs">
                          <button
                            v-for="opt in tierProductOptions"
                            :key="opt.key"
                            class="diff-product-tab"
                            :class="getScopeSelectedProduct(mtRulesDraft[selectedMtGroupId]) === opt.key ? 'is-active' : ''"
                            type="button"
                            @click="setScopeSelectedProduct(mtRulesDraft[selectedMtGroupId], opt.key)"
                          >
                            {{ opt.label }}
                          </button>
                        </div>
                        <button
                          v-if="!scopeHasProduct(mtRulesDraft[selectedMtGroupId], getScopeSelectedProduct(mtRulesDraft[selectedMtGroupId]))"
                          class="btn btn-outline-gold btn-sm"
                          type="button"
                          @click="copyDefaultToScopeProduct(mtRulesDraft[selectedMtGroupId])"
                        >
                          复制默认阶梯并启用
                        </button>
                      </div>
                    </div>

                    <div v-if="!scopeHasProduct(mtRulesDraft[selectedMtGroupId], getScopeSelectedProduct(mtRulesDraft[selectedMtGroupId]))" class="help">
                      当前产品未启用覆盖规则，继承下一优先级规则（演示）。
                    </div>

                    <div class="flex items-center justify-between gap-4 mb-2 mt-3">
                      <div class="text-sm font-semibold text-gray-700">阶梯配置（演示数据）</div>
                      <div class="flex items-center gap-2">
                        <button v-if="!isScopeEditing(mtRulesDraft[selectedMtGroupId])" class="btn btn-outline btn-sm" type="button" @click="startEditScopeProduct(mtRulesDraft[selectedMtGroupId])">
                          编辑
                        </button>
                        <template v-else>
                          <button class="btn btn-outline-gold btn-sm" type="button" @click="addRuleTierRow(getScopeCurrentRule(mtRulesDraft[selectedMtGroupId]))">新增档位</button>
                          <button class="btn btn-primary btn-sm" type="button" @click="saveRuleTier(getScopeCurrentRule(mtRulesDraft[selectedMtGroupId]))">保存</button>
                          <button class="btn btn-outline btn-sm" type="button" @click="cancelRuleTier(getScopeCurrentRule(mtRulesDraft[selectedMtGroupId]))">取消</button>
                        </template>
                      </div>
                    </div>

                    <div class="overflow-x-auto border border-gray-200 rounded-lg">
                      <table class="min-w-[760px] w-full text-xs">
                        <thead class="bg-tableHeader text-gray-600">
                          <tr>
                            <th class="text-left font-medium px-4 py-3 whitespace-nowrap">净入金起始值（USD）</th>
                            <th class="text-left font-medium px-4 py-3 whitespace-nowrap">净入金结束值（USD）</th>
                            <th class="text-left font-medium px-4 py-3 whitespace-nowrap">返佣金额</th>
                            <th class="text-left font-medium px-4 py-3 whitespace-nowrap">单位</th>
                            <th class="text-left font-medium px-4 py-3 whitespace-nowrap w-[90px]">操作</th>
                          </tr>
                        </thead>
                        <tbody class="text-gray-700">
                          <tr v-for="(row, idx) in getScopeRows(mtRulesDraft[selectedMtGroupId])" :key="row.id" class="border-t border-gray-100">
                            <td class="px-4 py-3 whitespace-nowrap">
                              <span>{{ formatMoney(row.start) }}</span>
                            </td>
                            <td class="px-4 py-3 whitespace-nowrap">
                              <input
                                v-if="isScopeEditing(mtRulesDraft[selectedMtGroupId]) && row.endType === 'value'"
                                v-model="row.end"
                                class="input input-sm w-[160px]"
                                :class="getScopeCurrentRule(mtRulesDraft[selectedMtGroupId])?.fieldErrors?.[row.id]?.end ? 'input-error' : ''"
                                inputmode="decimal"
                              />
                              <span v-else>{{ row.endType === 'unlimited' ? '不设上限' : formatMoney(row.end) }}</span>
                            </td>
                            <td class="px-4 py-3 whitespace-nowrap">
                              <input v-if="isScopeEditing(mtRulesDraft[selectedMtGroupId])" v-model="row.commission" class="input input-sm w-[140px]" inputmode="decimal" />
                              <span v-else>{{ formatMoney(row.commission) }}</span>
                            </td>
                            <td class="px-4 py-3 whitespace-nowrap">{{ row.unit }}</td>
                            <td class="px-4 py-3 whitespace-nowrap w-[90px]">
                              <button v-if="isScopeEditing(mtRulesDraft[selectedMtGroupId])" class="btn-danger-text" type="button" @click="deleteRuleTierRow(getScopeCurrentRule(mtRulesDraft[selectedMtGroupId]), idx)">删除</button>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>

                <div v-else class="help">请选择左侧MT分组。</div>
              </template>
            </div>
          </div>
        </div>
        <div class="modal-actions">
          <button class="btn btn-outline" type="button" @click="handleDiffTierModalCancel">取消</button>
          <button class="btn btn-primary" type="button" @click="saveDiffTierModal">保存配置</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, nextTick, reactive, ref, watch } from 'vue'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'

const router = useRouter()

const salesNameInputRef = ref(null)
const salesNameError = ref(false)

const salesOptions = [
  { value: 'test-测试小何', label: 'test-测试小何', email: '66666666@165.com' },
  { value: 'test-褚萌隐', label: 'test-褚萌隐', email: '15186061920@qq.com' },
  { value: 'test-b2', label: 'test-b2', email: 'b2@qq.com' },
  { value: 'test-Han', label: 'test-Han', email: 'ceshi@q.com' },
  { value: 'H', label: 'H', email: 'Hancs@q.com' },
  { value: '新销售A', label: '新销售A', email: 'sales-a@example.com' },
  { value: '新销售B', label: '新销售B', email: 'sales-b@example.com' },
]

const nameDropdownVisible = ref(false)

const form = reactive({
  salesNameQuery: '',
  salesNameValue: '',
  salesEmail: '',
  commissionEnabled: '',

  tradingRewardEnabled: '',
  tradingCalcMode: 'uniform',
  holdIntervalSec: '',
  tradingSettleCycle: 'realtime',

  netDepositRewardEnabled: '',
  calcHistoryNetDeposit: '',
  calcHistoryTradingVolume: '',
  calcStartTime: 'registerTime',
  tradingVolumeRule: '',
  tradingVolumeInput: '',
  netDepositCalcMode: 'perUser',
  netDepositValue: '',
  netDepositRate: '',
  netDepositCycle: '',
})

const filteredSalesOptions = computed(() => {
  const q = String(form.salesNameQuery || '').trim().toLowerCase()
  if (!q) return salesOptions
  return salesOptions.filter((o) => o.label.toLowerCase().includes(q) || o.email.toLowerCase().includes(q))
})

const selectSales = (opt) => {
  const next = opt?.value || ''
  const hasDiff = Object.keys(agentRuleConfigs.value || {}).length > 0 || Object.keys(mtRuleConfigs.value || {}).length > 0
  if (form.salesNameValue && next && form.salesNameValue !== next && hasDiff) {
    const ok = window.confirm('更换销售后，当前差异化阶梯配置将被清空，是否继续？')
    if (!ok) return
    agentRuleConfigs.value = {}
    mtRuleConfigs.value = {}
    if (diffTierModalVisible.value) closeDiffTierModal()
  }
  form.salesNameValue = opt.value
  form.salesEmail = opt.email
  form.salesNameQuery = opt.label
  nameDropdownVisible.value = false
  salesNameError.value = false
}

const focusSalesNameInput = async () => {
  await nextTick()
  const el = salesNameInputRef.value
  if (el && typeof el.scrollIntoView === 'function') el.scrollIntoView({ block: 'center', behavior: 'smooth' })
  if (el && typeof el.focus === 'function') el.focus()
}

const handleDiffTierEntryClick = async () => {
  if (!form.salesNameValue) {
    ElMessage({ message: '请先选择销售名称', type: 'warning' })
    salesNameError.value = true
    await focusSalesNameInput()
    return
  }
  openDiffTierModal()
}

const toNumber = (v) => {
  const n = Number(String(v || '').replace(/,/g, ''))
  if (Number.isNaN(n)) return null
  return n
}

const formatMoney = (v) => {
  const n = toNumber(v)
  if (n === null) return ''
  return n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

const products = ['外汇', '黄金', '白银', '原油', '比特币', '数字货币', '股指', '公斤条']

const tierProductOptions = [
  { key: 'forex', label: '外汇' },
  { key: 'gold', label: '黄金' },
  { key: 'silver', label: '白银' },
  { key: 'oil', label: '原油' },
  { key: 'btc', label: '比特币' },
  { key: 'crypto', label: '数字货币' },
  { key: 'index', label: '股指' },
  { key: 'kg', label: '公斤条' },
]

const getTierProductLabel = (key) => tierProductOptions.find((p) => p.key === key)?.label || key

const createUniformRows = () =>
  products.map((p) => ({
    product: p,
    rewardType: 'fixed',
    rewardValue: '0.00',
  }))

const tradingTableEditing = ref(false)
const tradingUniformSaved = ref(createUniformRows())
const tradingUniformDraft = ref(createUniformRows())

const cloneRows = (rows) => rows.map((r) => ({ ...r }))

const saveTradingTable = () => {
  tradingUniformSaved.value = cloneRows(tradingUniformDraft.value)
  tradingTableEditing.value = false
  ElMessage({ message: '已保存（演示）', type: 'success' })
}

const cancelTradingTable = () => {
  tradingUniformDraft.value = cloneRows(tradingUniformSaved.value)
  tradingTableEditing.value = false
}

const tradingRuleModalVisible = ref(false)
const tradingRuleTab = ref('user')

const volumeRuleModalVisible = ref(false)
const volumeRuleTab = ref('user')

const netDepositConditionModalVisible = ref(false)
const netDepositTab = ref('user')

const validateNonNegativeInt = (v) => {
  const raw = String(v || '').trim()
  if (!raw) return false
  if (!/^\d+$/.test(raw)) return false
  return true
}

const createTierRows = () => [
  {
    id: 'tier-1',
    start: '0.00',
    endType: 'value',
    end: '99999.99',
    commission: '1.50',
    unit: 'USD/标准手',
  },
  {
    id: 'tier-2',
    start: '100000.00',
    endType: 'unlimited',
    end: '',
    commission: '2.00',
    unit: 'USD/标准手',
  },
]

const createGoldTierRows = () => [
  {
    id: 'tier-g-1',
    start: '0.00',
    endType: 'value',
    end: '49999.99',
    commission: '2.50',
    unit: 'USD/标准手',
  },
  {
    id: 'tier-g-2',
    start: '50000.00',
    endType: 'unlimited',
    end: '',
    commission: '3.00',
    unit: 'USD/标准手',
  },
]

const selectedDefaultProductKey = ref('forex')

const buildTierState = (rows) =>
  reactive({
    editing: false,
    saved: cloneRows(rows),
    draft: cloneRows(rows),
    fieldErrors: {},
    syncing: false,
  })

const defaultTierStates = reactive({
  forex: buildTierState(createTierRows()),
  gold: buildTierState(createGoldTierRows()),
  silver: buildTierState(createTierRows()),
  oil: buildTierState(createTierRows()),
  btc: buildTierState(createTierRows()),
  crypto: buildTierState(createTierRows()),
  index: buildTierState(createTierRows()),
  kg: buildTierState(createTierRows()),
})

const currentDefaultTierState = computed(() => {
  return defaultTierStates[selectedDefaultProductKey.value] || defaultTierStates.forex
})

const tierEditing = computed({
  get: () => !!currentDefaultTierState.value.editing,
  set: (v) => {
    currentDefaultTierState.value.editing = !!v
  },
})

const tierSaved = computed({
  get: () => currentDefaultTierState.value.saved,
  set: (v) => {
    currentDefaultTierState.value.saved = v
  },
})

const tierDraft = computed({
  get: () => currentDefaultTierState.value.draft,
  set: (v) => {
    currentDefaultTierState.value.draft = v
  },
})

const tierFieldErrors = computed({
  get: () => currentDefaultTierState.value.fieldErrors,
  set: (v) => {
    currentDefaultTierState.value.fieldErrors = v
  },
})

const syncingTier = computed({
  get: () => !!currentDefaultTierState.value.syncing,
  set: (v) => {
    currentDefaultTierState.value.syncing = !!v
  },
})

const parseMoneyToCents = (v) => {
  const raw = String(v ?? '').trim()
  if (!raw) return null
  if (!/^\d+(\.\d{0,2})?$/.test(raw)) return null
  const [intPart, fracPart = ''] = raw.split('.')
  const frac = String(fracPart).padEnd(2, '0')
  const cents = BigInt(intPart) * 100n + BigInt(frac || '0')
  if (cents > BigInt(Number.MAX_SAFE_INTEGER)) return null
  return Number(cents)
}

const centsToFixedMoney = (cents) => {
  const abs = Math.abs(Number(cents || 0))
  const intPart = Math.floor(abs / 100)
  const frac = String(abs % 100).padStart(2, '0')
  return `${intPart}.${frac}`
}

const getDefaultSavedRowsByProduct = (key) => cloneRows(defaultTierStates[key]?.saved || createTierRows())

const diffTierEnabled = ref('no')
const diffTierModalVisible = ref(false)
const diffTierTab = ref('agent')
const diffTierModalSnapshot = ref('')

const agentSearchQuery = ref('')
const mtSearchQuery = ref('')

const agentTreeBase = [
  { id: 'agent-a', name: '代理A', account: 'A10001', parentId: null },
  { id: 'agent-a-1', name: '代理A-1', account: 'A10011', parentId: 'agent-a' },
  { id: 'agent-a-2', name: '代理A-2', account: 'A10012', parentId: 'agent-a' },
  { id: 'agent-b', name: '代理B', account: 'B10001', parentId: null },
  { id: 'agent-b-1', name: '代理B-1', account: 'B10011', parentId: 'agent-b' },
]

const mtGroupsBase = [
  { id: 'mt-real-hatc-standard', name: 'real\\HATC\\Standard' },
  { id: 'mt-real-hatc-cent', name: 'real\\HATC\\Cent' },
  { id: 'mt-real-vip-standard', name: 'real\\VIP\\Standard' },
  { id: 'mt-real-vip-cent', name: 'real\\VIP\\Cent' },
]

const demoAgentTiers = {
  'agent-a': [
    { id: 'a-1', start: '0.00', endType: 'value', end: '49999.99', commission: '1.50', unit: 'USD/标准手' },
    { id: 'a-2', start: '50000.00', endType: 'unlimited', end: '', commission: '2.00', unit: 'USD/标准手' },
  ],
  'agent-b': [
    { id: 'b-1', start: '0.00', endType: 'value', end: '149999.99', commission: '1.50', unit: 'USD/标准手' },
    { id: 'b-2', start: '150000.00', endType: 'unlimited', end: '', commission: '2.00', unit: 'USD/标准手' },
  ],
}

const demoMtTiers = {
  'mt-real-vip-standard': [
    { id: 'vip-1', start: '0.00', endType: 'value', end: '29999.99', commission: '1.50', unit: 'USD/标准手' },
    { id: 'vip-2', start: '30000.00', endType: 'unlimited', end: '', commission: '2.00', unit: 'USD/标准手' },
  ],
  'mt-real-vip-cent': [
    { id: 'vipc-1', start: '0.00', endType: 'value', end: '29999.99', commission: '1.50', unit: 'USD/标准手' },
    { id: 'vipc-2', start: '30000.00', endType: 'unlimited', end: '', commission: '2.00', unit: 'USD/标准手' },
  ],
}

const agentRuleConfigs = ref({})
const mtRuleConfigs = ref({})

const agentExpanded = ref({ 'agent-a': true, 'agent-b': true })
const selectedAgentId = ref('agent-a')
const selectedMtGroupId = ref('mt-real-hatc-standard')

const agentRulesDraft = ref({})
const mtRulesDraft = ref({})

const buildRuleDraft = (initialRows, enabled) => {
  const rule = reactive({
    enabled: !!enabled,
    editing: false,
    saved: cloneRows(initialRows),
    draft: cloneRows(initialRows),
    fieldErrors: {},
    syncing: false,
  })
  watch(
    () => rule.draft,
    () => {
      if (!rule.enabled || !rule.editing) return
      if (rule.syncing) return
      rule.syncing = true
      syncRuleTierRows(rule)
      rule.syncing = false
    },
    { deep: true }
  )
  return rule
}

const buildScopeDraft = () =>
  reactive({
    selectedProduct: 'forex',
    products: reactive({}),
  })

const hasScopeConfig = (scope) => {
  const keys = Object.keys(scope?.products || {})
  return keys.length > 0
}

const getScopeSelectedProduct = (scope) => String(scope?.selectedProduct || 'forex')
const setScopeSelectedProduct = (scope, key) => {
  if (!scope) return
  scope.selectedProduct = key
}

const scopeHasProduct = (scope, key) => !!scope?.products?.[key]

const getScopeCurrentRule = (scope) => {
  if (!scope) return null
  const key = getScopeSelectedProduct(scope)
  return scope.products?.[key] || null
}

const isScopeEditing = (scope) => !!getScopeCurrentRule(scope)?.editing

const getScopeRows = (scope) => {
  if (!scope) return []
  const key = getScopeSelectedProduct(scope)
  const rule = scope.products?.[key]
  if (rule) return rule.editing ? rule.draft : rule.saved
  return getDefaultSavedRowsByProduct(key)
}

const copyDefaultToScopeProduct = (scope) => {
  if (!scope) return
  const key = getScopeSelectedProduct(scope)
  if (scope.products?.[key]) return
  const seed = getDefaultSavedRowsByProduct(key)
  scope.products[key] = buildRuleDraft(seed, true)
  startEditRuleTier(scope.products[key])
}

const startEditScopeProduct = (scope) => {
  if (!scope) return
  const key = getScopeSelectedProduct(scope)
  if (!scope.products?.[key]) {
    const seed = getDefaultSavedRowsByProduct(key)
    scope.products[key] = buildRuleDraft(seed, true)
  }
  startEditRuleTier(scope.products[key])
}

const openDiffTierModal = () => {
  if (!form.salesNameValue) return
  diffTierModalVisible.value = true
  diffTierTab.value = 'agent'
  agentSearchQuery.value = ''
  mtSearchQuery.value = ''

  agentRulesDraft.value = {}
  mtRulesDraft.value = {}

  agentTreeBase.forEach((n) => {
    const scope = buildScopeDraft()
    const saved = agentRuleConfigs.value?.[n.id]
    const savedProducts = saved?.products || null
    if (savedProducts) {
      Object.entries(savedProducts).forEach(([k, tiers]) => {
        scope.products[k] = buildRuleDraft(tiers, true)
      })
    } else if (demoAgentTiers[n.id]) {
      scope.products.forex = buildRuleDraft(demoAgentTiers[n.id], true)
    }
    agentRulesDraft.value[n.id] = scope
  })

  mtGroupsBase.forEach((g) => {
    const scope = buildScopeDraft()
    const saved = mtRuleConfigs.value?.[g.id]
    const savedProducts = saved?.products || null
    if (savedProducts) {
      Object.entries(savedProducts).forEach(([k, tiers]) => {
        scope.products[k] = buildRuleDraft(tiers, true)
      })
    } else if (demoMtTiers[g.id]) {
      scope.products.forex = buildRuleDraft(demoMtTiers[g.id], true)
    }
    mtRulesDraft.value[g.id] = scope
  })

  selectedAgentId.value = 'agent-a'
  selectedMtGroupId.value = 'mt-real-hatc-standard'

  diffTierModalSnapshot.value = snapshotDiffTierModal()
}

const closeDiffTierModal = () => {
  diffTierModalVisible.value = false
}

const snapshotDiffTierModal = () => {
  const agentPlain = Object.fromEntries(
    Object.entries(agentRulesDraft.value || {}).map(([id, scope]) => {
      const productsPlain = Object.fromEntries(
        Object.entries(scope?.products || {}).map(([k, r]) => [k, { saved: cloneRows(r.saved || []), draft: cloneRows(r.draft || []), editing: !!r.editing }])
      )
      return [id, { selectedProduct: scope?.selectedProduct || 'forex', products: productsPlain }]
    })
  )
  const mtPlain = Object.fromEntries(
    Object.entries(mtRulesDraft.value || {}).map(([id, scope]) => {
      const productsPlain = Object.fromEntries(
        Object.entries(scope?.products || {}).map(([k, r]) => [k, { saved: cloneRows(r.saved || []), draft: cloneRows(r.draft || []), editing: !!r.editing }])
      )
      return [id, { selectedProduct: scope?.selectedProduct || 'forex', products: productsPlain }]
    })
  )
  return JSON.stringify({ agentPlain, mtPlain })
}

const handleDiffTierModalCancel = () => {
  const cur = snapshotDiffTierModal()
  if (cur === diffTierModalSnapshot.value) {
    closeDiffTierModal()
    return
  }
  const ok = window.confirm('当前配置尚未保存，确定关闭吗？')
  if (!ok) return
  closeDiffTierModal()
}

const visibleAgentNodes = computed(() => {
  const q = String(agentSearchQuery.value || '').trim().toLowerCase()
  const nodes = agentTreeBase.map((n) => ({ ...n }))
  const childrenMap = new Map()
  nodes.forEach((n) => {
    if (!childrenMap.has(n.parentId)) childrenMap.set(n.parentId, [])
    childrenMap.get(n.parentId).push(n.id)
  })
  const nodeMap = new Map(nodes.map((n) => [n.id, n]))
  const matchSet = new Set()
  if (q) {
    nodes.forEach((n) => {
      if (n.name.toLowerCase().includes(q) || n.account.toLowerCase().includes(q)) matchSet.add(n.id)
    })
    const addAncestors = (id) => {
      const n = nodeMap.get(id)
      if (!n || !n.parentId) return
      matchSet.add(n.parentId)
      addAncestors(n.parentId)
    }
    Array.from(matchSet).forEach((id) => addAncestors(id))
  }

  const res = []
  const walk = (parentId, depth) => {
    const ids = childrenMap.get(parentId) || []
    ids.forEach((id) => {
      const n = nodeMap.get(id)
      if (!n) return
      if (q && !matchSet.has(id)) return
      const hasChildren = (childrenMap.get(id) || []).length > 0
      const expanded = !!agentExpanded.value[id]
      res.push({ ...n, depth, hasChildren, expanded })
      if (hasChildren && expanded) walk(id, depth + 1)
    })
  }
  walk(null, 0)
  return res
})

const visibleMtGroups = computed(() => {
  const q = String(mtSearchQuery.value || '').trim().toLowerCase()
  if (!q) return mtGroupsBase
  return mtGroupsBase.filter((g) => g.name.toLowerCase().includes(q))
})

const currentAgentNode = computed(() => agentTreeBase.find((n) => n.id === selectedAgentId.value) || null)
const currentMtGroup = computed(() => mtGroupsBase.find((g) => g.id === selectedMtGroupId.value) || null)

const toggleAgentExpanded = (id) => {
  agentExpanded.value = { ...agentExpanded.value, [id]: !agentExpanded.value[id] }
}

const selectAgent = (id) => {
  selectedAgentId.value = id
}

const selectMtGroup = (id) => {
  selectedMtGroupId.value = id
}

const syncRuleTierRows = (rule) => {
  if (!rule || !Array.isArray(rule.draft) || !rule.draft.length) return
  rule.draft[0].start = '0.00'
  const lastIdx = rule.draft.length - 1
  rule.draft.forEach((r, idx) => {
    r.endType = idx === lastIdx ? 'unlimited' : 'value'
    if (idx === lastIdx) r.end = ''
    if (!r.unit) r.unit = 'USD/标准手'
  })
  rule.fieldErrors = {}
  for (let i = 1; i < rule.draft.length; i++) {
    const prev = rule.draft[i - 1]
    const prevEndCents = parseMoneyToCents(prev.end)
    if (String(prev.end || '').trim() && prevEndCents === null) {
      rule.fieldErrors[prev.id] = { ...(rule.fieldErrors[prev.id] || {}), end: 'invalid' }
    }
    if (prevEndCents === null) {
      rule.draft[i].start = ''
      continue
    }
    rule.draft[i].start = centsToFixedMoney(prevEndCents + 1)
  }
  for (let i = 0; i < rule.draft.length; i++) {
    const row = rule.draft[i]
    if (row.endType !== 'value') continue
    const startCents = parseMoneyToCents(row.start)
    const endCents = parseMoneyToCents(row.end)
    if (String(row.end || '').trim() && endCents === null) {
      rule.fieldErrors[row.id] = { ...(rule.fieldErrors[row.id] || {}), end: 'invalid' }
      continue
    }
    if (startCents !== null && endCents !== null && endCents <= startCents) {
      rule.fieldErrors[row.id] = { ...(rule.fieldErrors[row.id] || {}), end: 'lte' }
    }
  }
}

const getRuleRows = (rule, readonlyMode) => {
  if (!rule) return []
  if (readonlyMode) return tierSaved.value
  return rule.editing ? rule.draft : rule.saved
}

const ensureRuleSeed = (id, rule, type) => {
  const seed = type === 'agent' ? demoAgentTiers[id] : demoMtTiers[id]
  rule.saved = cloneRows(seed || tierSaved.value)
  rule.draft = cloneRows(rule.saved)
  rule.editing = false
  rule.fieldErrors = {}
}

const startEditAgentRule = (id) => {
  const rule = agentRulesDraft.value?.[id]
  if (!rule) return
  rule.__prevEnabled = !!rule.enabled
  if (!rule.enabled) {
    rule.enabled = true
    ensureRuleSeed(id, rule, 'agent')
  }
  startEditRuleTier(rule)
}

const startEditMtRule = (id) => {
  const rule = mtRulesDraft.value?.[id]
  if (!rule) return
  rule.__prevEnabled = !!rule.enabled
  if (!rule.enabled) {
    rule.enabled = true
    ensureRuleSeed(id, rule, 'mt')
  }
  startEditRuleTier(rule)
}

const startEditRuleTier = (rule) => {
  rule.draft = cloneRows(rule.saved)
  syncRuleTierRows(rule)
  rule.editing = true
}

const addRuleTierRow = (rule) => {
  if (!rule?.editing) return
  syncRuleTierRows(rule)
  if (rule.draft.length >= 2) {
    const currentIdx = rule.draft.length - 2
    const current = rule.draft[currentIdx]
    const endRaw = String(current.end || '').trim()
    if (!endRaw) {
      ElMessage({ message: '请先填写当前档位的净入金结束值', type: 'warning' })
      return
    }
    const startCents = parseMoneyToCents(current.start)
    const endCents = parseMoneyToCents(endRaw)
    if (startCents === null || endCents === null || endCents <= startCents) {
      ElMessage({ message: `第${currentIdx + 1}档结束值必须大于起始值`, type: 'warning' })
      return
    }
  }
  const idx = Math.max(0, rule.draft.length - 1)
  rule.draft.splice(idx, 0, {
    id: `tier-${Date.now()}-${Math.random().toString(16).slice(2)}`,
    start: '',
    endType: 'value',
    end: '',
    commission: '',
    unit: 'USD/标准手',
  })
  syncRuleTierRows(rule)
}

const deleteRuleTierRow = (rule, idx) => {
  if (!rule?.editing) return
  if (!Array.isArray(rule.draft) || rule.draft.length <= 1) {
    ElMessage({ message: '阶梯返佣至少需保留一档', type: 'warning' })
    return
  }
  if (!window.confirm('确定删除该返佣档位吗？')) return
  rule.draft.splice(idx, 1)
  syncRuleTierRows(rule)
}

const validateRuleTier = (rule) => {
  if (!rule?.enabled) return { ok: true }
  if (!Array.isArray(rule.draft) || rule.draft.length === 0) return { ok: false, msg: '阶梯配置异常' }

  syncRuleTierRows(rule)

  const lastIdx = rule.draft.length - 1
  if (rule.draft[lastIdx].endType !== 'unlimited') return { ok: false, msg: '最后一档必须为“不设上限”' }

  if (rule.fieldErrors && Object.keys(rule.fieldErrors).length) {
    const idx = rule.draft.findIndex((r) => rule.fieldErrors[r.id]?.end)
    if (idx >= 0) {
      const type = rule.fieldErrors[rule.draft[idx].id]?.end
      if (type === 'invalid') return { ok: false, msg: `第${idx + 1}档净入金结束值需为大于等于0的数字` }
      return { ok: false, msg: `第${idx + 1}档结束值必须大于起始值` }
    }
    return { ok: false, msg: '存在档位输入错误' }
  }

  for (let i = 0; i < rule.draft.length; i++) {
    const row = rule.draft[i]
    const tierNo = i + 1
    const startCents = parseMoneyToCents(row.start)
    if (startCents === null) return { ok: false, msg: `第${tierNo}档净入金起始值异常` }

    if (i === 0) {
      if (startCents !== 0) return { ok: false, msg: '第一档起始值必须为0.00' }
    } else {
      const prevEndCents = parseMoneyToCents(rule.draft[i - 1].end)
      if (prevEndCents === null) return { ok: false, msg: `第${tierNo - 1}档净入金结束值不能为空` }
      if (startCents !== prevEndCents + 1) return { ok: false, msg: '档位必须连续，且不能重叠或留空' }
    }

    if (i !== lastIdx) {
      const endRaw = String(row.end || '').trim()
      if (!endRaw) return { ok: false, msg: `第${tierNo}档净入金结束值不能为空` }
      const endCents = parseMoneyToCents(endRaw)
      if (endCents === null) return { ok: false, msg: `第${tierNo}档净入金结束值需为大于等于0的数字` }
      if (endCents <= startCents) return { ok: false, msg: `第${tierNo}档结束值必须大于起始值` }
      row.end = centsToFixedMoney(endCents)
    } else {
      row.end = ''
      row.endType = 'unlimited'
    }

    const commissionRaw = String(row.commission || '').trim()
    if (!commissionRaw) return { ok: false, msg: `第${tierNo}档返佣金额不能为空` }
    const commissionCents = parseMoneyToCents(commissionRaw)
    if (commissionCents === null) return { ok: false, msg: `第${tierNo}档返佣金额需为大于等于0的数字` }
    row.commission = centsToFixedMoney(commissionCents)
    row.start = centsToFixedMoney(startCents)
    row.unit = row.unit || 'USD/标准手'
  }

  syncRuleTierRows(rule)
  return { ok: true }
}

const saveRuleTier = (rule) => {
  const res = validateRuleTier(rule)
  if (!res.ok) {
    ElMessage({ message: res.msg, type: 'warning' })
    return
  }
  rule.saved = cloneRows(rule.draft)
  rule.editing = false
  rule.__prevEnabled = undefined
  ElMessage({ message: '已保存（演示）', type: 'success' })
}

const cancelRuleTier = (rule) => {
  rule.draft = cloneRows(rule.saved)
  rule.editing = false
  syncRuleTierRows(rule)
  if (rule.__prevEnabled === false) {
    rule.enabled = false
    rule.saved = cloneRows(tierSaved.value)
    rule.draft = cloneRows(rule.saved)
    rule.__prevEnabled = undefined
  }
}

const saveDiffTierModal = () => {
  const agentEntries = Object.entries(agentRulesDraft.value || {})
  for (const [id, scope] of agentEntries) {
    const name = agentTreeBase.find((n) => n.id === id)?.name || '代理'
    const productsEntries = Object.entries(scope?.products || {})
    for (const [productKey, rule] of productsEntries) {
      if (!rule) continue
      if (rule.editing) {
        const r = validateRuleTier(rule)
        if (!r.ok) {
          ElMessage({ message: `${name}（${getTierProductLabel(productKey)}）：${r.msg}`, type: 'warning' })
          return
        }
        rule.saved = cloneRows(rule.draft)
        rule.editing = false
      } else {
        rule.draft = cloneRows(rule.saved)
        const r = validateRuleTier(rule)
        if (!r.ok) {
          ElMessage({ message: `${name}（${getTierProductLabel(productKey)}）：${r.msg}`, type: 'warning' })
          return
        }
        rule.saved = cloneRows(rule.draft)
      }
    }
  }

  const mtEntries = Object.entries(mtRulesDraft.value || {})
  for (const [id, scope] of mtEntries) {
    const name = mtGroupsBase.find((g) => g.id === id)?.name || 'MT分组'
    const productsEntries = Object.entries(scope?.products || {})
    for (const [productKey, rule] of productsEntries) {
      if (!rule) continue
      if (rule.editing) {
        const r = validateRuleTier(rule)
        if (!r.ok) {
          ElMessage({ message: `${name}（${getTierProductLabel(productKey)}）：${r.msg}`, type: 'warning' })
          return
        }
        rule.saved = cloneRows(rule.draft)
        rule.editing = false
      } else {
        rule.draft = cloneRows(rule.saved)
        const r = validateRuleTier(rule)
        if (!r.ok) {
          ElMessage({ message: `${name}（${getTierProductLabel(productKey)}）：${r.msg}`, type: 'warning' })
          return
        }
        rule.saved = cloneRows(rule.draft)
      }
    }
  }

  agentRuleConfigs.value = {}
  mtRuleConfigs.value = {}

  agentEntries.forEach(([id, scope]) => {
    const products = Object.fromEntries(Object.entries(scope?.products || {}).map(([k, r]) => [k, cloneRows(r.saved || [])]))
    if (Object.keys(products).length) agentRuleConfigs.value[id] = { products }
  })
  mtEntries.forEach(([id, scope]) => {
    const products = Object.fromEntries(Object.entries(scope?.products || {}).map(([k, r]) => [k, cloneRows(r.saved || [])]))
    if (Object.keys(products).length) mtRuleConfigs.value[id] = { products }
  })

  ElMessage({ message: '差异化阶梯配置已保存（演示）', type: 'success' })
  closeDiffTierModal()
}

const formatThreshold = (moneyStr) => {
  const cents = parseMoneyToCents(moneyStr)
  if (cents === null) return '-'
  const intPart = Math.floor(cents / 100)
  const frac = cents % 100
  const base = intPart.toLocaleString('en-US')
  if (frac === 0) return base
  return `${base}.${String(frac).padStart(2, '0')}`
}

const summarizeRuleLine = (label, tiers) => {
  const rows = Array.isArray(tiers) ? tiers : []
  if (!rows.length) return `${label}：-`
  const unlimitedIdx = rows.findIndex((r) => r.endType === 'unlimited')
  const last = unlimitedIdx >= 0 ? rows[unlimitedIdx] : rows[rows.length - 1]
  const startText = formatThreshold(last?.start || '')
  const comText = last?.commission ? Number(String(last.commission)).toFixed(2) : '-'
  return `${label}：${startText} USD起，${comText} USD/标准手`
}

const diffSummary = computed(() => {
  const agents = Object.entries(agentRuleConfigs.value || {}).filter(([, v]) => v?.products && Object.keys(v.products).length > 0)
  const mts = Object.entries(mtRuleConfigs.value || {}).filter(([, v]) => v?.products && Object.keys(v.products).length > 0)

  const agentLines = []
  agents.forEach(([id, v]) => {
    const name = agentTreeBase.find((n) => n.id === id)?.name || id
    Object.entries(v.products || {}).forEach(([productKey, tiers]) => {
      agentLines.push(summarizeRuleLine(`${name}-${getTierProductLabel(productKey)}`, tiers))
    })
  })

  const mtLines = []
  mts.forEach(([id, v]) => {
    const name = mtGroupsBase.find((g) => g.id === id)?.name || id
    Object.entries(v.products || {}).forEach(([productKey, tiers]) => {
      mtLines.push(summarizeRuleLine(`${name}-${getTierProductLabel(productKey)}`, tiers))
    })
  })

  return {
    hasAny: agentLines.length > 0 || mtLines.length > 0,
    agentCount: agents.length,
    mtCount: mts.length,
    agentLines,
    mtLines,
  }
})

const syncTierRows = () => {
  if (!Array.isArray(tierDraft.value) || tierDraft.value.length === 0) {
    tierDraft.value = [
      {
        id: `tier-${Date.now()}`,
        start: '0.00',
        endType: 'unlimited',
        end: '',
        commission: '',
        unit: 'USD/标准手',
      },
    ]
    return
  }

  tierDraft.value[0].start = '0.00'

  const lastIdx = tierDraft.value.length - 1
  tierDraft.value.forEach((r, idx) => {
    r.endType = idx === lastIdx ? 'unlimited' : 'value'
    if (idx === lastIdx) r.end = ''
    if (!r.unit) r.unit = 'USD/标准手'
  })

  tierFieldErrors.value = {}

  for (let i = 1; i < tierDraft.value.length; i++) {
    const prev = tierDraft.value[i - 1]
    const prevEndCents = parseMoneyToCents(prev.end)
    if (String(prev.end || '').trim() && prevEndCents === null) {
      tierFieldErrors.value[prev.id] = { ...(tierFieldErrors.value[prev.id] || {}), end: 'invalid' }
    }
    if (prevEndCents === null) {
      tierDraft.value[i].start = ''
      continue
    }
    tierDraft.value[i].start = centsToFixedMoney(prevEndCents + 1)
  }

  for (let i = 0; i < tierDraft.value.length; i++) {
    const row = tierDraft.value[i]
    if (row.endType !== 'value') continue
    const startCents = parseMoneyToCents(row.start)
    const endCents = parseMoneyToCents(row.end)
    if (String(row.end || '').trim() && endCents === null) {
      tierFieldErrors.value[row.id] = { ...(tierFieldErrors.value[row.id] || {}), end: 'invalid' }
      continue
    }
    if (startCents !== null && endCents !== null && endCents <= startCents) {
      tierFieldErrors.value[row.id] = { ...(tierFieldErrors.value[row.id] || {}), end: 'lte' }
    }
  }
}

watch(
  tierDraft,
  () => {
    if (!tierEditing.value) return
    if (syncingTier.value) return
    syncingTier.value = true
    syncTierRows()
    syncingTier.value = false
  },
  { deep: true }
)

const startEditTierTable = () => {
  tierDraft.value = cloneRows(tierSaved.value)
  syncTierRows()
  tierEditing.value = true
}

const addTierRow = () => {
  if (!tierEditing.value) return
  syncTierRows()

  if (tierDraft.value.length >= 2) {
    const currentIdx = tierDraft.value.length - 2
    const current = tierDraft.value[currentIdx]
    if (current && current.endType === 'value') {
      const endRaw = String(current.end || '').trim()
      if (!endRaw) {
        ElMessage({ message: '请先填写当前档位的净入金结束值', type: 'warning' })
        return
      }
      const startCents = parseMoneyToCents(current.start)
      const endCents = parseMoneyToCents(endRaw)
      if (startCents === null || endCents === null || endCents <= startCents) {
        ElMessage({ message: `第${currentIdx + 1}档结束值必须大于起始值`, type: 'warning' })
        return
      }
    }
  }

  const idx = Math.max(0, tierDraft.value.length - 1)
  tierDraft.value.splice(idx, 0, {
    id: `tier-${Date.now()}-${Math.random().toString(16).slice(2)}`,
    start: '',
    endType: 'value',
    end: '',
    commission: '',
    unit: 'USD/标准手',
  })
  syncTierRows()
}

const deleteTierRow = (idx) => {
  if (!tierEditing.value) return
  if (!Array.isArray(tierDraft.value) || tierDraft.value.length <= 1) {
    ElMessage({ message: '阶梯返佣至少需保留一档', type: 'warning' })
    return
  }
  if (!window.confirm('确定删除该返佣档位吗？')) return
  tierDraft.value.splice(idx, 1)
  syncTierRows()
}

const validateTierTable = () => {
  if (!Array.isArray(tierDraft.value) || tierDraft.value.length === 0) return { ok: false, msg: '阶梯配置异常' }

  syncTierRows()

  const lastIdx = tierDraft.value.length - 1
  if (tierDraft.value[lastIdx].endType !== 'unlimited') return { ok: false, msg: '最后一档必须为“不设上限”' }

  if (tierFieldErrors.value && Object.keys(tierFieldErrors.value).length) {
    const idx = tierDraft.value.findIndex((r) => tierFieldErrors.value[r.id]?.end)
    if (idx >= 0) {
      const type = tierFieldErrors.value[tierDraft.value[idx].id]?.end
      if (type === 'invalid') return { ok: false, msg: `第${idx + 1}档净入金结束值需为大于等于0的数字` }
      return { ok: false, msg: `第${idx + 1}档结束值必须大于起始值` }
    }
    return { ok: false, msg: '存在档位输入错误' }
  }

  for (let i = 0; i < tierDraft.value.length; i++) {
    const row = tierDraft.value[i]
    const tierNo = i + 1

    const startCents = parseMoneyToCents(row.start)
    if (startCents === null) return { ok: false, msg: `第${tierNo}档净入金起始值异常` }

    if (i === 0) {
      if (startCents !== 0) return { ok: false, msg: '第一档起始值必须为0.00' }
    } else {
      const prev = tierDraft.value[i - 1]
      const prevEndCents = parseMoneyToCents(prev.end)
      if (prevEndCents === null) return { ok: false, msg: `第${tierNo - 1}档净入金结束值不能为空` }
      const expectedStart = prevEndCents + 1
      if (startCents !== expectedStart) return { ok: false, msg: '档位必须连续，且不能重叠或留空' }
    }

    if (i !== lastIdx) {
      const endRaw = String(row.end || '').trim()
      if (!endRaw) return { ok: false, msg: `第${tierNo}档净入金结束值不能为空` }
      const endCents = parseMoneyToCents(endRaw)
      if (endCents === null) return { ok: false, msg: `第${tierNo}档净入金结束值需为大于等于0的数字` }
      if (endCents <= startCents) return { ok: false, msg: `第${tierNo}档结束值必须大于起始值` }
      row.end = centsToFixedMoney(endCents)
    } else {
      row.end = ''
      row.endType = 'unlimited'
    }

    const commissionRaw = String(row.commission || '').trim()
    if (!commissionRaw) return { ok: false, msg: `第${tierNo}档返佣金额不能为空` }
    const commissionCents = parseMoneyToCents(commissionRaw)
    if (commissionCents === null) return { ok: false, msg: `第${tierNo}档返佣金额需为大于等于0的数字` }
    row.commission = centsToFixedMoney(commissionCents)

    row.start = centsToFixedMoney(startCents)
    row.unit = row.unit || 'USD/标准手'
  }

  syncTierRows()
  return { ok: true }
}

const saveTierTable = () => {
  const res = validateTierTable()
  if (!res.ok) {
    ElMessage({ message: res.msg, type: 'warning' })
    return
  }
  tierSaved.value = cloneRows(tierDraft.value)
  tierEditing.value = false
  ElMessage({ message: '阶梯返佣配置已保存（演示）', type: 'success' })
}

const cancelTierTable = () => {
  tierDraft.value = cloneRows(tierSaved.value)
  tierEditing.value = false
}

const handleBack = () => {
  router.push('/commission/sales-list')
}

const scrollToTop = async () => {
  await nextTick()
  const el = document.querySelector('.el-main') || document.querySelector('main')
  if (el && typeof el.scrollTo === 'function') el.scrollTo({ top: 0, behavior: 'smooth' })
}

const handleSubmit = async () => {
  if (!form.salesNameValue) {
    ElMessage({ message: '请填写销售名称', type: 'warning' })
    await scrollToTop()
    return
  }
  if (!form.commissionEnabled) {
    ElMessage({ message: '请选择是否享受返佣', type: 'warning' })
    await scrollToTop()
    return
  }

  if (!form.tradingRewardEnabled) {
    ElMessage({ message: '请选择是否开启交易返佣', type: 'warning' })
    return
  }

  if (form.tradingRewardEnabled === 'yes') {
    if (!form.tradingCalcMode) {
      ElMessage({ message: '请选择交易返佣计算方式', type: 'warning' })
      return
    }
    if (form.tradingCalcMode === 'teamNetDepositTier') {
      const res = validateTierTable()
      if (!res.ok) {
        ElMessage({ message: res.msg, type: 'warning' })
        return
      }
    }
    if (!validateNonNegativeInt(form.holdIntervalSec)) {
      ElMessage({ message: '交易持仓间隔需为大于等于0的整数', type: 'warning' })
      return
    }
    if (!form.tradingSettleCycle) {
      ElMessage({ message: '请选择交易返佣结算周期', type: 'warning' })
      return
    }
  }

  if (!form.netDepositRewardEnabled) {
    ElMessage({ message: '请选择是否开启净入金奖励', type: 'warning' })
    return
  }

  if (form.netDepositRewardEnabled === 'yes') {
    if (!form.calcHistoryNetDeposit) {
      ElMessage({ message: '请选择是否计算历史净入金', type: 'warning' })
      return
    }
    if (!form.calcHistoryTradingVolume) {
      ElMessage({ message: '请选择是否计算历史交易量', type: 'warning' })
      return
    }
    if (!form.tradingVolumeRule) {
      ElMessage({ message: '请选择交易量规则', type: 'warning' })
      return
    }
    if ((form.tradingVolumeRule === 'single' || form.tradingVolumeRule === 'allSum') && !String(form.tradingVolumeInput || '').trim()) {
      ElMessage({ message: '请填写交易量', type: 'warning' })
      return
    }
    if (!form.netDepositCalcMode) {
      ElMessage({ message: '请选择净入金奖励计算方式', type: 'warning' })
      return
    }
    if (form.netDepositCalcMode === 'perUser' || form.netDepositCalcMode === 'allSum') {
      if (!String(form.netDepositValue || '').trim()) {
        ElMessage({ message: '请填写净入金值', type: 'warning' })
        return
      }
      if (!String(form.netDepositRate || '').trim()) {
        ElMessage({ message: '请填写净入金奖励比例', type: 'warning' })
        return
      }
    }
    if (!form.netDepositCycle) {
      ElMessage({ message: '请选择净入金奖励周期', type: 'warning' })
      return
    }
  }

  if (form.tradingRewardEnabled === 'yes' && form.tradingCalcMode === 'teamNetDepositTier') {
    ElMessage({ message: '销售阶梯返佣配置已提交（演示）', type: 'success' })
  } else {
    ElMessage({ message: '销售配置已提交（演示）', type: 'success' })
  }
  router.push('/commission/sales-list')
}
</script>

<style scoped>
.form-row {
  display: grid;
  grid-template-columns: 160px 1fr;
  gap: 16px;
  align-items: start;
}

@media (max-width: 768px) {
  .form-row {
    grid-template-columns: 1fr;
    gap: 8px;
  }
}

.basic-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px 24px;
}

@media (max-width: 1024px) {
  .basic-grid {
    grid-template-columns: 1fr;
    gap: 12px;
  }
}

.section-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px 24px;
}

@media (max-width: 1024px) {
  .section-grid {
    grid-template-columns: 1fr;
  }
}

.grid-span-2 {
  grid-column: 1 / -1;
}

.tier-diff-row {
  display: grid;
  grid-template-columns: 160px 1fr;
  gap: 16px;
  align-items: start;
}

@media (max-width: 768px) {
  .tier-diff-row {
    grid-template-columns: 1fr;
    gap: 8px;
  }
}

.tier-diff-label {
  font-size: 13px;
  color: #4b5563;
  padding-top: 7px;
}

.tier-products {
  border: 1px solid #eef2f7;
  border-radius: 12px;
  background: #fafafa;
  padding: 12px 14px;
  margin-bottom: 12px;
}

.tier-products-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  flex-wrap: wrap;
}

.tier-products-label {
  font-size: 12px;
  font-weight: 700;
  color: #374151;
}

.tier-products-actions {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
}

.tier-products-tabs {
  margin-top: 10px;
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.tier-product-tab {
  height: 30px;
  padding: 0 12px;
  border-radius: 999px;
  border: 1px solid #e5e7eb;
  background: #ffffff;
  color: #6b7280;
  font-size: 12px;
  font-weight: 600;
}

.tier-product-tab.is-active {
  border-color: rgba(209, 168, 79, 0.55);
  color: #b89241;
  background: rgba(209, 168, 79, 0.12);
}

.diff-product-bar {
  display: grid;
  grid-template-columns: 52px 1fr;
  gap: 12px;
  align-items: start;
  margin-bottom: 10px;
}

.diff-product-label {
  font-size: 12px;
  color: #9ca3af;
  padding-top: 7px;
}

.diff-product-controls {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  flex-wrap: wrap;
}

.diff-product-tabs {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.diff-product-tab {
  height: 30px;
  padding: 0 10px;
  border-radius: 999px;
  border: 1px solid #e5e7eb;
  background: #ffffff;
  color: #6b7280;
  font-size: 12px;
  font-weight: 600;
}

.diff-product-tab.is-active {
  border-color: rgba(209, 168, 79, 0.55);
  color: #b89241;
  background: rgba(209, 168, 79, 0.12);
}

.diff-product-controls .btn-danger-text {
  margin-left: auto;
}

.diff-product-controls .btn.btn-outline-gold.btn-sm {
  white-space: nowrap;
}

.diff-product-controls .btn-danger-text {
  white-space: nowrap;
}

.diff-product-controls .diff-product-tabs {
  flex: 1;
}

.diff-product-controls .diff-product-tabs .diff-product-tab {
  white-space: nowrap;
}

.diff-product-controls .tier-product-tab {
  white-space: nowrap;
}

.diff-product-controls .btn {
  flex-shrink: 0;
}

.diff-product-controls .btn-danger-text {
  flex-shrink: 0;
}

.diff-product-controls .btn.btn-outline-gold.btn-sm {
  flex-shrink: 0;
}

.diff-product-controls .diff-product-tabs {
  min-width: 0;
}

.diff-product-controls .diff-product-tabs {
  overflow: hidden;
}

.form-label {
  display: flex;
  gap: 6px;
  align-items: center;
  font-size: 13px;
  color: #4b5563;
  padding-top: 7px;
}

.req {
  color: #ef4444;
  font-weight: 700;
}

.form-control {
  min-width: 0;
}

.help {
  margin-top: 8px;
  font-size: 12px;
  color: #9ca3af;
}

.radio-group {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
}

.radio-group-wrap {
  gap: 14px;
}

.radio {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  color: #374151;
}

.input {
  height: 36px;
  width: 100%;
  border-radius: 8px;
  border: 1px solid #e5e7eb;
  background: #ffffff;
  padding: 0 12px;
  font-size: 13px;
  color: #374151;
  outline: none;
}

.input:focus {
  border-color: #d1a84f;
  box-shadow: 0 0 0 4px rgba(209, 168, 79, 0.12);
}

.input-error {
  border-color: #ef4444;
  box-shadow: 0 0 0 4px rgba(239, 68, 68, 0.12);
}

.input-sm {
  height: 32px;
  border-radius: 6px;
  font-size: 12px;
}

.inline-field {
  display: flex;
  align-items: center;
  gap: 10px;
}

.unit {
  font-size: 13px;
  color: #6b7280;
  flex-shrink: 0;
}

.btn {
  height: 36px;
  padding: 0 16px;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 600;
  transition: background-color 0.15s ease, border-color 0.15s ease, color 0.15s ease;
}

.btn:disabled {
  opacity: 0.45;
  cursor: not-allowed;
}

.btn-primary {
  background: #d1a84f;
  color: #ffffff;
}

.btn-primary:hover {
  background: #b89241;
}

.btn-outline {
  background: #ffffff;
  color: #374151;
  border: 1px solid #e5e7eb;
}

.btn-outline:hover {
  background: #f9fafb;
}

.btn-outline-gold {
  background: #ffffff;
  color: #d1a84f;
  border: 1px solid #d1a84f;
}

.btn-outline-gold:hover {
  background: rgba(209, 168, 79, 0.08);
}

.btn-danger-text {
  color: #ef4444;
  font-size: 12px;
  font-weight: 600;
}

.btn-danger-text:hover {
  color: #dc2626;
}

.btn-sm {
  height: 30px;
  padding: 0 12px;
  border-radius: 6px;
  font-size: 12px;
}

.table-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 10px;
}

.table-title {
  font-size: 13px;
  font-weight: 600;
  color: #374151;
}

.combo {
  position: relative;
}

.combo-arrow {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  width: 28px;
  height: 28px;
  border-radius: 6px;
  border: 1px solid #e5e7eb;
  background: #ffffff;
  color: #6b7280;
}

.combo-panel {
  position: absolute;
  z-index: 20;
  top: calc(100% + 6px);
  left: 0;
  right: 0;
  border-radius: 10px;
  border: 1px solid #e5e7eb;
  background: #ffffff;
  box-shadow: 0 10px 30px rgba(17, 24, 39, 0.12);
  padding: 6px;
  max-height: 240px;
  overflow: auto;
}

.combo-item {
  width: 100%;
  text-align: left;
  padding: 10px 10px;
  border-radius: 8px;
}

.combo-item:hover {
  background: #f9fafb;
}

.combo-item-title {
  font-size: 13px;
  color: #111827;
  font-weight: 600;
}

.combo-item-sub {
  margin-top: 4px;
  font-size: 12px;
  color: #9ca3af;
}

.combo-empty {
  padding: 10px 10px;
  font-size: 12px;
  color: #9ca3af;
}

.mask {
  position: fixed;
  inset: 0;
  background: rgba(17, 24, 39, 0.55);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 18px;
  z-index: 2500;
}

.modal {
  width: min(640px, 100%);
  background: #ffffff;
  border-radius: 12px;
  border: 1px solid #e5e7eb;
  overflow: hidden;
}

.modal-wide {
  width: min(980px, 100%);
}

.modal-diff {
  width: min(1400px, 88vw);
}

@media (max-width: 1024px) {
  .modal-diff {
    width: 94vw;
  }
}

@media (max-width: 640px) {
  .modal-diff {
    width: 98vw;
  }
}

.diff-modal-head {
  padding: 12px 16px;
  border-bottom: 1px solid #eef2f7;
  background: #ffffff;
  display: grid;
  gap: 6px;
}

.diff-modal-line {
  display: grid;
  grid-template-columns: 90px 1fr;
  gap: 10px;
  align-items: start;
  font-size: 12px;
  color: #6b7280;
}

.diff-modal-label {
  color: #9ca3af;
}

.diff-modal-value {
  color: #374151;
}

.diff-grid {
  display: grid;
  grid-template-columns: minmax(260px, 25%) 1fr;
  gap: 16px;
}

@media (max-width: 768px) {
  .diff-grid {
    grid-template-columns: 1fr;
  }
}

.diff-search {
  margin-bottom: 12px;
}

.diff-left-title {
  font-size: 12px;
  font-weight: 700;
  color: #374151;
  margin-bottom: 10px;
}

.diff-list {
  border: 1px solid #e5e7eb;
  border-radius: 10px;
  padding: 6px;
  max-height: 520px;
  overflow: auto;
}

.tree-node {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 10px;
  border-radius: 8px;
  cursor: pointer;
}

.tree-node:hover {
  background: #f9fafb;
}

.tree-node.is-active {
  background: rgba(209, 168, 79, 0.12);
}

.tree-toggle {
  width: 22px;
  height: 22px;
  border-radius: 6px;
  border: 1px solid #e5e7eb;
  background: #ffffff;
  color: #6b7280;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  font-size: 11px;
}

.tree-main {
  min-width: 0;
  flex: 1;
}

.tree-title {
  font-size: 12px;
  font-weight: 600;
  color: #374151;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.tree-sub {
  font-size: 11px;
  color: #9ca3af;
  margin-top: 2px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.tree-tag {
  font-size: 11px;
  padding: 2px 8px;
  border-radius: 999px;
  background: #f3f4f6;
  color: #6b7280;
  flex-shrink: 0;
}

.tree-tag.is-config {
  background: rgba(16, 185, 129, 0.12);
  color: #059669;
}

.diff-panel {
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  padding: 14px;
  background: #ffffff;
}

.diff-panel-head {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
  flex-wrap: wrap;
  margin-bottom: 10px;
}

.diff-panel-title {
  font-size: 14px;
  font-weight: 700;
  color: #111827;
}

.diff-panel-sub {
  margin-top: 4px;
  font-size: 12px;
  color: #6b7280;
}

.diff-meta {
  margin-top: 6px;
  font-size: 12px;
  color: #6b7280;
}

.diff-enable {
  display: grid;
  gap: 6px;
}

.diff-enable-label {
  font-size: 12px;
  color: #6b7280;
}

.diff-summary {
  border: 1px solid #eef2f7;
  background: #f9fafb;
  border-radius: 12px;
  padding: 12px 14px;
}

.diff-summary-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  margin-bottom: 10px;
}

.diff-summary-row {
  display: grid;
  grid-template-columns: 110px 1fr;
  gap: 10px;
  font-size: 12px;
  color: #6b7280;
  margin-top: 6px;
}

.diff-summary-label {
  color: #9ca3af;
}

.diff-summary-value {
  color: #374151;
}

.diff-summary-block {
  margin-top: 10px;
}

.diff-summary-subtitle {
  font-size: 12px;
  font-weight: 700;
  color: #374151;
  margin-bottom: 6px;
}

.diff-summary-line {
  font-size: 12px;
  color: #6b7280;
  line-height: 1.5;
}

.checkbox {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
  color: #374151;
}

.checkbox input {
  width: 14px;
  height: 14px;
  accent-color: #d1a84f;
}

.modal-title {
  padding: 14px 16px;
  font-size: 14px;
  font-weight: 700;
  color: #111827;
  border-bottom: 1px solid #eef2f7;
  background: #fafafa;
}

.modal-tabs {
  display: flex;
  gap: 8px;
  padding: 12px 16px;
  border-bottom: 1px solid #eef2f7;
}

.tab {
  height: 32px;
  padding: 0 14px;
  border-radius: 999px;
  border: 1px solid #e5e7eb;
  color: #6b7280;
  font-size: 12px;
  font-weight: 600;
  background: #ffffff;
}

.tab.is-active {
  border-color: rgba(209, 168, 79, 0.55);
  color: #b89241;
  background: rgba(209, 168, 79, 0.12);
}

.modal-body {
  padding: 16px;
}

.modal-grid {
  display: grid;
  grid-template-columns: 220px 1fr;
  gap: 14px;
}

@media (max-width: 768px) {
  .modal-grid {
    grid-template-columns: 1fr;
  }
}

.modal-left-title,
.modal-right-title {
  font-size: 12px;
  font-weight: 600;
  color: #374151;
  margin-bottom: 10px;
}

.modal-left-box {
  border: 1px solid #e5e7eb;
  border-radius: 10px;
  padding: 10px;
  max-height: 320px;
  overflow: auto;
}

.modal-left-item {
  padding: 10px 10px;
  border-radius: 8px;
  font-size: 12px;
  color: #374151;
}

.modal-left-item:hover {
  background: #f9fafb;
}

.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  padding: 14px 16px;
  border-top: 1px solid #eef2f7;
  background: #fafafa;
}

.info-box {
  border: 1px solid #eef2f7;
  background: #f9fafb;
  border-radius: 10px;
  padding: 12px 14px;
  display: grid;
  gap: 6px;
}

.info-item {
  font-size: 12px;
  color: #6b7280;
  line-height: 1.45;
}
</style>
