<template>
  <div class="w-full min-w-0 min-h-full">
    <div class="flex h-full bg-mainBg overflow-hidden">
      <div class="flex-1 flex flex-col min-w-0 bg-gray-50 overflow-hidden p-4 custom-scrollbar overflow-y-auto">
        <div class="flex-1 overflow-y-auto bg-gray-50 p-6">
          <div class="bg-white rounded-xl card-shadow border border-gray-100 overflow-hidden">
          <div class="px-6 py-4 border-b border-gray-100 flex items-start justify-between gap-3 flex-wrap">
            <div>
              <div class="text-base font-bold text-gray-800">FAQ内容管理</div>
              <div class="mt-1 text-xs text-gray-500">一处维护，按语言、渠道和用户身份发布到官网与 CRM。</div>
            </div>
            <div class="flex items-center gap-2 flex-wrap">
              <button
                type="button"
                class="inline-flex items-center gap-2 px-4 py-2 bg-primaryBtn hover:bg-primaryBtnHover text-white rounded-lg text-sm font-medium transition-colors shadow-sm"
                @click="openCreateFaq"
              >
                <i class="fa-solid fa-plus text-xs"></i>
                新增FAQ
              </button>
              <el-dropdown trigger="click" @command="handleTopPreviewCommand">
                <button type="button" class="px-4 py-2 rounded-lg text-sm font-medium border border-gray-200 bg-white hover:bg-gray-50 text-gray-700">
                  预览
                </button>
                <template #dropdown>
                  <el-dropdown-menu>
                    <el-dropdown-item command="web">官网预览</el-dropdown-item>
                    <el-dropdown-item command="crm">CRM预览</el-dropdown-item>
                  </el-dropdown-menu>
                </template>
              </el-dropdown>
              <el-dropdown trigger="click" @command="handleTopMoreCommand">
                <button type="button" class="px-4 py-2 rounded-lg text-sm font-medium border border-gray-200 bg-white hover:bg-gray-50 text-gray-700">
                  更多
                </button>
                <template #dropdown>
                  <el-dropdown-menu>
                    <el-dropdown-item command="restore">恢复示例数据</el-dropdown-item>
                  </el-dropdown-menu>
                </template>
              </el-dropdown>
            </div>
          </div>

          <div class="px-6 pt-4">
            <el-tabs v-model="activeTab" class="faq-mgmt-tabs">
              <el-tab-pane label="FAQ管理" name="faq"></el-tab-pane>
              <el-tab-pane label="分类管理" name="category"></el-tab-pane>
              <el-tab-pane label="数据概览" name="overview"></el-tab-pane>
            </el-tabs>
          </div>

          <div v-if="activeTab === 'faq'" class="px-6 pb-6">
            <div class="mt-2 bg-gray-50 border border-gray-200 rounded-lg p-4">
              <div class="flex flex-col gap-3">
                <div class="flex items-center gap-2 flex-wrap">
                  <el-input v-model="faqFilters.q" placeholder="综合搜索：FAQ编号 / 标题 / 关键词" clearable class="w-[360px]" />
                  <el-select v-model="faqFilters.categoryId" placeholder="所属分类" clearable class="w-[200px]">
                    <el-option v-for="c in categoryOptionsForFilter" :key="c.id" :label="c.label" :value="c.id" />
                  </el-select>
                  <el-select v-model="faqFilters.status" placeholder="发布状态" clearable class="w-[200px]">
                    <el-option v-for="s in mergedStatusOptions" :key="s.value" :label="s.label" :value="s.value" />
                  </el-select>
                  <button
                    type="button"
                    class="inline-flex items-center px-5 py-2 bg-primaryBtn hover:bg-primaryBtnHover text-white rounded-lg text-sm font-medium transition-colors shadow-sm"
                    @click="applyFaqFilter"
                  >
                    查询
                  </button>
                  <button type="button" class="inline-flex items-center px-5 py-2 border border-gray-200 bg-white hover:bg-gray-50 text-gray-700 rounded-lg text-sm font-medium" @click="resetFaqFilter">
                    重置
                  </button>
                  <button type="button" class="inline-flex items-center px-4 py-2 border border-gray-200 bg-white hover:bg-gray-50 text-gray-700 rounded-lg text-sm font-medium" @click="toggleFaqAdvanced">
                    更多筛选
                    <i :class="state.ui.faqAdvancedOpen ? 'fa-solid fa-angle-up ml-2 text-xs' : 'fa-solid fa-angle-down ml-2 text-xs'"></i>
                  </button>
                </div>

                <div v-if="state.ui.faqAdvancedOpen" class="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div class="bg-white border border-gray-200 rounded-lg p-3">
                    <div class="text-xs text-gray-500 mb-1">展示渠道</div>
                    <el-select v-model="faqFilters.channels" placeholder="请选择" multiple collapse-tags collapse-tags-tooltip clearable class="w-full">
                      <el-option label="官网" value="web" />
                      <el-option label="CRM" value="crm" />
                    </el-select>
                  </div>
                  <div class="bg-white border border-gray-200 rounded-lg p-3">
                    <div class="text-xs text-gray-500 mb-1">可见人群</div>
                    <el-select v-model="faqFilters.audience" placeholder="请选择" clearable class="w-full">
                      <el-option v-for="o in audienceOptions" :key="o.value" :label="o.label" :value="o.value" />
                    </el-select>
                  </div>
                  <div class="bg-white border border-gray-200 rounded-lg p-3">
                    <div class="text-xs text-gray-500 mb-1">更新时间范围</div>
                    <el-date-picker
                      v-model="faqFilters.updatedRange"
                      type="daterange"
                      range-separator="至"
                      start-placeholder="开始时间"
                      end-placeholder="结束时间"
                      value-format="YYYY-MM-DD"
                      class="w-full"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div class="mt-4 overflow-x-auto">
              <table class="w-full text-sm text-left min-w-[980px]">
                <thead class="bg-tableHeader text-gray-600 border-b border-gray-200">
                  <tr>
                    <th class="px-4 py-4 font-medium whitespace-nowrap w-[420px]">FAQ内容</th>
                    <th class="px-4 py-4 font-medium whitespace-nowrap w-[160px]">所属分类</th>
                    <th class="px-4 py-4 font-medium whitespace-nowrap w-[140px]">展示渠道</th>
                    <th class="px-4 py-4 font-medium whitespace-nowrap w-[140px]">可见人群</th>
                    <th class="px-4 py-4 font-medium whitespace-nowrap w-[240px]">发布状态</th>
                    <th class="px-4 py-4 font-medium whitespace-nowrap w-[170px]">更新时间</th>
                    <th class="px-4 py-4 font-medium whitespace-nowrap w-[160px] text-center">操作</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-gray-100">
                  <tr v-for="row in pagedFaqs" :key="row.id" class="hover:bg-gray-50/50 transition-colors">
                    <td class="px-4 py-3">
                      <div class="font-medium text-gray-900 line-clamp-2" :title="row.langs['zh-Hans'].draft.keywords || ''">
                        {{ row.langs['zh-Hans'].draft.title || '-' }}
                      </div>
                      <div class="mt-1 text-xs text-gray-500">{{ row.id }}</div>
                    </td>
                    <td class="px-4 py-3 text-gray-700 whitespace-nowrap">{{ categoryPathById(row.base.categoryId) }}</td>
                    <td class="px-4 py-3 whitespace-nowrap">
                      <span v-for="c in row.base.channels" :key="c" class="inline-flex items-center px-2 py-1 text-[11px] font-medium rounded-full border mr-1 mb-1" :class="c === 'web' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-indigo-50 text-indigo-600 border-indigo-100'">
                        {{ c === 'web' ? '官网' : 'CRM' }}
                      </span>
                    </td>
                    <td class="px-4 py-3 text-gray-700 whitespace-nowrap">{{ audienceLabel(row.base.audience) }}</td>
                    <td class="px-4 py-3 whitespace-nowrap">
                      <span class="inline-flex items-center px-2 py-1 text-[11px] font-medium rounded-full border" :class="mergedStatusTagClass(mergedPublishStatus(row).status)">
                        {{ mergedStatusLabel(mergedPublishStatus(row).status) }}
                      </span>
                    </td>
                    <td class="px-4 py-3 text-gray-500 text-xs whitespace-nowrap">{{ formatDateTime(row.updatedAt) }}</td>
                    <td class="px-4 py-3 text-center whitespace-nowrap">
                      <div class="flex items-center justify-center gap-3">
                        <button type="button" class="text-blue-500 hover:text-blue-700 text-xs font-medium transition-colors" @click="openEditFaq(row)">编辑</button>
                        <button type="button" class="text-blue-500 hover:text-blue-700 text-xs font-medium transition-colors" @click="openRowPreview(row)">预览</button>
                        <el-dropdown trigger="click" @command="(cmd) => handleRowMoreCommand(row, cmd)">
                          <span class="text-gray-700 hover:text-gray-900 text-xs font-medium transition-colors cursor-pointer">更多</span>
                          <template #dropdown>
                            <el-dropdown-menu>
                              <el-dropdown-item command="copy">复制</el-dropdown-item>
                              <el-dropdown-item command="history">历史版本</el-dropdown-item>
                              <el-dropdown-item v-if="canRowUnpublish(row)" divided command="unpublish">下架</el-dropdown-item>
                            </el-dropdown-menu>
                          </template>
                        </el-dropdown>
                      </div>
                    </td>
                  </tr>
                  <tr v-if="pagedFaqs.length === 0">
                    <td colspan="7" class="px-4 py-10 text-center text-gray-500 text-sm">暂无数据</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div class="pt-4 flex items-center justify-between flex-wrap gap-2">
              <div class="text-sm text-gray-500">
                共 <span class="font-medium text-gray-700">{{ filteredFaqs.length }}</span> 条
              </div>
              <el-pagination
                v-model:current-page="faqPagination.page"
                v-model:page-size="faqPagination.pageSize"
                :page-sizes="[10, 20, 50]"
                layout="sizes, prev, pager, next"
                :total="filteredFaqs.length"
              />
            </div>
          </div>

          <div v-else-if="activeTab === 'category'" class="px-6 pb-6">
            <div class="mt-2 bg-gray-50 border border-gray-200 rounded-lg p-4">
              <div class="text-xs text-gray-500">分类拆分为一级分类与二级分类；FAQ 必须绑定二级分类。</div>
            </div>

            <div class="mt-4">
              <el-tabs v-model="categoryTab" type="card">
                <el-tab-pane label="一级分类" name="level1"></el-tab-pane>
                <el-tab-pane label="二级分类" name="level2"></el-tab-pane>
              </el-tabs>
            </div>

            <div class="mt-3 flex items-center justify-between gap-3 flex-wrap">
              <div class="text-xs text-gray-500">{{ categoryTab === 'level1' ? '一级分类：名称、状态、备注。' : '二级分类：必须选择一个已启用的一级分类。' }}</div>
              <button
                type="button"
                class="inline-flex items-center gap-2 px-4 py-2 bg-primaryBtn hover:bg-primaryBtnHover text-white rounded-lg text-sm font-medium transition-colors shadow-sm"
                @click="openCreateCategory(categoryTab)"
              >
                <i class="fa-solid fa-plus text-xs"></i>
                新增{{ categoryTab === 'level1' ? '一级分类' : '二级分类' }}
              </button>
            </div>

            <div class="mt-4 overflow-x-auto" v-if="categoryTab === 'level1'">
              <table class="w-full text-sm text-left min-w-[980px]">
                <thead class="bg-tableHeader text-gray-600 border-b border-gray-200">
                  <tr>
                    <th class="px-4 py-4 font-medium whitespace-nowrap w-[60px] text-center"></th>
                    <th class="px-4 py-4 font-medium whitespace-nowrap w-[300px]">名称</th>
                    <th class="px-4 py-4 font-medium whitespace-nowrap">备注</th>
                    <th class="px-4 py-4 font-medium whitespace-nowrap w-[120px] text-center">状态</th>
                    <th class="px-4 py-4 font-medium whitespace-nowrap w-[120px] text-center">FAQ数量</th>
                    <th class="px-4 py-4 font-medium whitespace-nowrap w-[180px] text-center">操作</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-gray-100">
                  <tr
                    v-for="c in level1CategoryRows"
                    :key="c.id"
                    class="hover:bg-gray-50/50 transition-colors"
                    draggable="true"
                    @dragstart="onCategoryDragStart(c)"
                    @dragover.prevent
                    @drop="onCategoryDrop(c)"
                  >
                    <td class="px-4 py-3 text-center whitespace-nowrap text-gray-400">
                      <i class="fa-solid fa-grip-vertical"></i>
                    </td>
                    <td class="px-4 py-3">
                      <div class="font-medium text-gray-900">{{ c.name['zh-Hans'] }}</div>
                      <div class="mt-1 text-xs text-gray-500">{{ c.id }}</div>
                    </td>
                    <td class="px-4 py-3 text-gray-700">{{ c.remark || '-' }}</td>
                    <td class="px-4 py-3 text-center whitespace-nowrap">
                      <button
                        type="button"
                        class="px-3 py-1 text-xs font-medium rounded-full transition-colors"
                        :class="c.enabled ? 'bg-emerald-50 text-emerald-600 hover:bg-emerald-100' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'"
                        @click="toggleCategoryStatus(c)"
                      >
                        {{ c.enabled ? '启用' : '停用' }}
                      </button>
                    </td>
                    <td class="px-4 py-3 text-center text-gray-700 whitespace-nowrap">{{ faqCountByCategoryIdTotal(c.id) }}</td>
                    <td class="px-4 py-3 text-center whitespace-nowrap">
                      <div class="flex items-center justify-center gap-3">
                        <button type="button" class="text-blue-500 hover:text-blue-700 text-xs font-medium transition-colors" @click="openEditCategory('level1', c)">编辑</button>
                        <button
                          type="button"
                          class="text-red-500 hover:text-red-600 text-xs font-medium transition-colors disabled:text-gray-300 disabled:hover:text-gray-300"
                          :disabled="faqCountByCategoryIdTotal(c.id) > 0"
                          :title="faqCountByCategoryIdTotal(c.id) > 0 ? '该分类已被FAQ使用，只能停用' : ''"
                          @click="attemptDeleteCategory(c)"
                        >
                          删除
                        </button>
                      </div>
                    </td>
                  </tr>
                  <tr v-if="level1CategoryRows.length === 0">
                    <td colspan="6" class="px-4 py-10 text-center text-gray-500 text-sm">暂无一级分类</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div class="mt-4 overflow-x-auto" v-else>
              <table class="w-full text-sm text-left min-w-[980px]">
                <thead class="bg-tableHeader text-gray-600 border-b border-gray-200">
                  <tr>
                    <th class="px-4 py-4 font-medium whitespace-nowrap w-[60px] text-center"></th>
                    <th class="px-4 py-4 font-medium whitespace-nowrap w-[260px]">名称</th>
                    <th class="px-4 py-4 font-medium whitespace-nowrap w-[220px]">一级分类</th>
                    <th class="px-4 py-4 font-medium whitespace-nowrap">备注</th>
                    <th class="px-4 py-4 font-medium whitespace-nowrap w-[120px] text-center">状态</th>
                    <th class="px-4 py-4 font-medium whitespace-nowrap w-[120px] text-center">FAQ数量</th>
                    <th class="px-4 py-4 font-medium whitespace-nowrap w-[180px] text-center">操作</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-gray-100">
                  <tr
                    v-for="c in level2CategoryRows"
                    :key="c.id"
                    class="hover:bg-gray-50/50 transition-colors"
                    draggable="true"
                    @dragstart="onCategoryDragStart(c)"
                    @dragover.prevent
                    @drop="onCategoryDrop(c)"
                  >
                    <td class="px-4 py-3 text-center whitespace-nowrap text-gray-400">
                      <i class="fa-solid fa-grip-vertical"></i>
                    </td>
                    <td class="px-4 py-3">
                      <div class="font-medium text-gray-900">{{ c.name['zh-Hans'] }}</div>
                      <div class="mt-1 text-xs text-gray-500">{{ c.id }}</div>
                    </td>
                    <td class="px-4 py-3 text-gray-700 whitespace-nowrap">{{ categoryLabelById(c.parentId) }}</td>
                    <td class="px-4 py-3 text-gray-700">{{ c.remark || '-' }}</td>
                    <td class="px-4 py-3 text-center whitespace-nowrap">
                      <button
                        type="button"
                        class="px-3 py-1 text-xs font-medium rounded-full transition-colors"
                        :class="c.enabled ? 'bg-emerald-50 text-emerald-600 hover:bg-emerald-100' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'"
                        @click="toggleCategoryStatus(c)"
                      >
                        {{ c.enabled ? '启用' : '停用' }}
                      </button>
                    </td>
                    <td class="px-4 py-3 text-center text-gray-700 whitespace-nowrap">{{ faqCountByCategoryId(c.id) }}</td>
                    <td class="px-4 py-3 text-center whitespace-nowrap">
                      <div class="flex items-center justify-center gap-3">
                        <button type="button" class="text-blue-500 hover:text-blue-700 text-xs font-medium transition-colors" @click="openEditCategory('level2', c)">编辑</button>
                        <button
                          type="button"
                          class="text-red-500 hover:text-red-600 text-xs font-medium transition-colors disabled:text-gray-300 disabled:hover:text-gray-300"
                          :disabled="faqCountByCategoryId(c.id) > 0"
                          :title="faqCountByCategoryId(c.id) > 0 ? '该分类已被FAQ使用，只能停用' : ''"
                          @click="attemptDeleteCategory(c)"
                        >
                          删除
                        </button>
                      </div>
                    </td>
                  </tr>
                  <tr v-if="level2CategoryRows.length === 0">
                    <td colspan="7" class="px-4 py-10 text-center text-gray-500 text-sm">暂无二级分类</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div v-else-if="activeTab === 'overview'" class="px-6 pb-6">
            <div class="mt-2 bg-gray-50 border border-gray-200 rounded-lg p-4">
              <el-form :model="statsFilters" label-width="88px">
                <el-row :gutter="12">
                  <el-col :xs="24" :sm="12" :md="8">
                    <el-form-item label="日期范围">
                      <el-date-picker
                        v-model="statsFilters.dateRange"
                        type="daterange"
                        range-separator="至"
                        start-placeholder="开始时间"
                        end-placeholder="结束时间"
                        value-format="YYYY-MM-DD"
                        class="w-full"
                      />
                      <div class="mt-2 flex items-center gap-2 flex-wrap">
                        <button type="button" class="px-3 py-1.5 rounded-lg text-xs font-medium border border-gray-200 bg-white hover:bg-gray-50 text-gray-700" @click="setStatsDateRangePreset(7)">
                          最近7天
                        </button>
                        <button type="button" class="px-3 py-1.5 rounded-lg text-xs font-medium border border-gray-200 bg-white hover:bg-gray-50 text-gray-700" @click="setStatsDateRangePreset(30)">
                          最近30天
                        </button>
                        <button type="button" class="px-3 py-1.5 rounded-lg text-xs font-medium border border-gray-200 bg-white hover:bg-gray-50 text-gray-700" @click="setStatsDateRangeAll">
                          全部时间
                        </button>
                        <button type="button" class="px-3 py-1.5 rounded-lg text-xs font-medium border border-gray-200 bg-white hover:bg-gray-50 text-gray-700" @click="resetStatsFilters">
                          重置
                        </button>
                      </div>
                    </el-form-item>
                  </el-col>
                  <el-col :xs="24" :sm="12" :md="8">
                    <el-form-item label="展示渠道">
                      <el-select v-model="statsFilters.channel" placeholder="请选择" clearable class="w-full">
                        <el-option label="官网" value="web" />
                        <el-option label="CRM" value="crm" />
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :xs="24" :sm="12" :md="8">
                    <el-form-item label="语言">
                      <el-select v-model="statsFilters.lang" placeholder="请选择" clearable class="w-full">
                        <el-option label="简体中文" value="zh-Hans" />
                        <el-option label="繁體中文" value="zh-Hant" />
                        <el-option label="English" value="en" />
                      </el-select>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form>
              <div class="mt-2 text-xs text-gray-500">演示数据，包含预览操作记录</div>
            </div>

            <div class="mt-4 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3">
              <div class="bg-white border border-gray-200 rounded-lg p-4">
                <div class="text-xs text-gray-500">阅读次数</div>
                <div class="mt-1 text-2xl font-bold text-gray-800">{{ statsSummary.views }}</div>
              </div>
              <div class="bg-white border border-gray-200 rounded-lg p-4">
                <div class="text-xs text-gray-500">有帮助次数</div>
                <div class="mt-1 text-2xl font-bold text-gray-800">{{ statsSummary.helpful }}</div>
              </div>
              <div class="bg-white border border-gray-200 rounded-lg p-4">
                <div class="text-xs text-gray-500">未解决次数</div>
                <div class="mt-1 text-2xl font-bold text-gray-800">{{ statsSummary.notSolved }}</div>
              </div>
              <div class="bg-white border border-gray-200 rounded-lg p-4">
                <div class="text-xs text-gray-500 flex items-center gap-1">
                  <span>未解决反馈占比</span>
                  <el-tooltip content="未解决次数 ÷（有帮助次数＋未解决次数）" placement="top">
                    <i class="fa-regular fa-circle-question text-gray-400"></i>
                  </el-tooltip>
                </div>
                <div class="mt-1 text-2xl font-bold text-gray-800">{{ statsSummary.notSolvedShare }}</div>
              </div>
            </div>

            <div v-if="filteredFeedbackEvents.length === 0" class="mt-4 bg-white border border-gray-200 rounded-lg p-10 text-center text-sm text-gray-500">
              暂无数据
            </div>
            <div v-else>
              <div class="mt-4 grid grid-cols-1 xl:grid-cols-2 gap-4">
                <div class="bg-white border border-gray-200 rounded-lg overflow-hidden">
                  <div class="px-4 py-3 border-b border-gray-100 font-medium text-gray-800">待优化 FAQ</div>
                  <div class="overflow-x-auto">
                    <table class="w-full text-sm min-w-[560px]">
                      <thead class="bg-tableHeader text-gray-600 border-b border-gray-200">
                        <tr>
                          <th class="px-4 py-3 font-medium">FAQ</th>
                          <th class="px-4 py-3 font-medium text-center">反馈总数</th>
                          <th class="px-4 py-3 font-medium text-center">未解决</th>
                          <th class="px-4 py-3 font-medium text-center">未解决反馈占比</th>
                          <th class="px-4 py-3 font-medium text-center">操作</th>
                        </tr>
                      </thead>
                      <tbody class="divide-y divide-gray-100">
                        <tr v-for="r in optimizeFaqRows" :key="r.faqId">
                          <td class="px-4 py-3">
                            <div class="font-medium text-gray-900 line-clamp-1">{{ r.title }}</div>
                            <div class="mt-1 text-xs text-gray-500">{{ r.faqId }}</div>
                          </td>
                          <td class="px-4 py-3 text-center text-gray-700">{{ r.total }}</td>
                          <td class="px-4 py-3 text-center text-gray-700">{{ r.notSolved }}</td>
                          <td class="px-4 py-3 text-center text-gray-700">{{ r.share }}</td>
                          <td class="px-4 py-3 text-center">
                            <button type="button" class="text-blue-500 hover:text-blue-700 text-xs font-medium transition-colors" @click="openEditFaq(r.faq)">编辑</button>
                          </td>
                        </tr>
                        <tr v-if="optimizeFaqRows.length === 0">
                          <td colspan="5" class="px-4 py-10 text-center text-gray-500 text-sm">暂无数据</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <div class="bg-white border border-gray-200 rounded-lg overflow-hidden">
                  <div class="px-4 py-3 border-b border-gray-100 font-medium text-gray-800">无结果搜索词</div>
                  <div class="px-4 py-4">
                    <el-input v-model="noResultTermKeyword" placeholder="筛选搜索词" clearable />
                  </div>
                  <div class="overflow-x-auto">
                    <table class="w-full text-sm min-w-[560px]">
                      <thead class="bg-tableHeader text-gray-600 border-b border-gray-200">
                        <tr>
                          <th class="px-4 py-3 font-medium">搜索词</th>
                          <th class="px-4 py-3 font-medium text-center">无结果次数</th>
                        </tr>
                      </thead>
                      <tbody class="divide-y divide-gray-100">
                        <tr v-for="r in noResultTermsRowsDisplay" :key="r.term">
                          <td class="px-4 py-3 font-medium text-gray-900">{{ r.term }}</td>
                          <td class="px-4 py-3 text-center text-gray-700">{{ r.count }}</td>
                        </tr>
                        <tr v-if="noResultTermsRowsDisplay.length === 0">
                          <td colspan="2" class="px-4 py-10 text-center text-gray-500 text-sm">暂无无结果搜索词</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              <div class="mt-4">
                <button
                  type="button"
                  class="w-full flex items-center justify-between px-4 py-2 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 text-sm font-medium text-gray-800"
                  @click="state.ui.overviewMoreOpen = !state.ui.overviewMoreOpen"
                >
                  <span>更多统计</span>
                  <i class="fa-solid fa-chevron-down text-gray-400 transition-transform" :class="state.ui.overviewMoreOpen ? 'rotate-180' : ''"></i>
                </button>
                <div v-show="state.ui.overviewMoreOpen" class="mt-3 bg-white border border-gray-200 rounded-lg overflow-hidden">
                  <div class="px-4 py-3 border-b border-gray-100">
                    <el-tabs v-model="overviewMoreTab" type="card">
                      <el-tab-pane label="按语言统计" name="lang"></el-tab-pane>
                      <el-tab-pane label="按分类统计" name="category"></el-tab-pane>
                    </el-tabs>
                  </div>

                  <div v-if="overviewMoreTab === 'lang'" class="overflow-x-auto">
                    <table class="w-full text-sm min-w-[560px]">
                      <thead class="bg-tableHeader text-gray-600 border-b border-gray-200">
                        <tr>
                          <th class="px-4 py-3 font-medium">语言</th>
                          <th class="px-4 py-3 font-medium text-center">阅读</th>
                          <th class="px-4 py-3 font-medium text-center">有帮助</th>
                          <th class="px-4 py-3 font-medium text-center">未解决</th>
                          <th class="px-4 py-3 font-medium text-center">无结果搜索</th>
                        </tr>
                      </thead>
                      <tbody class="divide-y divide-gray-100">
                        <tr v-for="r in statsByLangRowsDisplay" :key="r.lang">
                          <td class="px-4 py-3 font-medium text-gray-800">{{ langLabel(r.lang) }}</td>
                          <td class="px-4 py-3 text-center text-gray-700">{{ r.views }}</td>
                          <td class="px-4 py-3 text-center text-gray-700">{{ r.helpful }}</td>
                          <td class="px-4 py-3 text-center text-gray-700">{{ r.notSolved }}</td>
                          <td class="px-4 py-3 text-center text-gray-700">{{ r.noResult }}</td>
                        </tr>
                        <tr v-if="statsByLangRowsDisplay.length === 0">
                          <td colspan="5" class="px-4 py-10 text-center text-gray-500 text-sm">暂无数据</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <div v-else class="overflow-x-auto">
                    <div class="px-4 py-3 text-xs text-gray-500">口径：按 FAQ 当前所属分类归集历史事件（演示）</div>
                    <table class="w-full text-sm min-w-[560px]">
                      <thead class="bg-tableHeader text-gray-600 border-b border-gray-200">
                        <tr>
                          <th class="px-4 py-3 font-medium">分类（一级 / 二级）</th>
                          <th class="px-4 py-3 font-medium text-center">阅读</th>
                          <th class="px-4 py-3 font-medium text-center">有帮助</th>
                          <th class="px-4 py-3 font-medium text-center">未解决</th>
                        </tr>
                      </thead>
                      <tbody class="divide-y divide-gray-100">
                        <tr v-for="r in statsByCategoryRows" :key="r.categoryId">
                          <td class="px-4 py-3 font-medium text-gray-800">{{ categoryPathById(r.categoryId) }}</td>
                          <td class="px-4 py-3 text-center text-gray-700">{{ r.views }}</td>
                          <td class="px-4 py-3 text-center text-gray-700">{{ r.helpful }}</td>
                          <td class="px-4 py-3 text-center text-gray-700">{{ r.notSolved }}</td>
                        </tr>
                        <tr v-if="statsByCategoryRows.length === 0">
                          <td colspan="4" class="px-4 py-10 text-center text-gray-500 text-sm">暂无数据</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>

          </div>
        </div>
      </div>
    </div>

  <el-drawer
    v-model="faqDrawer.open"
    :title="faqDrawer.title"
    size="860px"
    direction="rtl"
    :close-on-click-modal="false"
    :before-close="onFaqDrawerBeforeClose"
  >
    <div class="px-1">
      <el-form :model="faqForm" label-width="108px">
        <div class="text-sm font-bold text-gray-800 mb-2">基础设置</div>
        <div class="bg-gray-50 border border-gray-200 rounded-lg p-4">
          <el-row :gutter="12">
            <el-col :xs="24" :sm="12">
              <el-form-item label="所属分类" required>
                <div class="w-full grid grid-cols-1 md:grid-cols-2 gap-2">
                  <el-select v-model="faqCategoryLevel1Id" placeholder="一级分类" class="w-full">
                    <el-option v-for="c in categoryLevel1OptionsForEdit" :key="c.id" :label="c.label" :value="c.id" :disabled="!!c.disabled" />
                  </el-select>
                  <el-select v-model="faqForm.base.categoryId" placeholder="二级分类" class="w-full">
                    <el-option v-for="c in categoryLevel2OptionsForEdit" :key="c.id" :label="c.label" :value="c.id" :disabled="!!c.disabled" />
                  </el-select>
                </div>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="12">
              <el-form-item label="展示渠道" required>
                <el-select v-model="faqForm.base.channels" placeholder="请选择" multiple collapse-tags collapse-tags-tooltip class="w-full">
                  <el-option label="官网" value="web" />
                  <el-option label="CRM" value="crm" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="12">
              <el-form-item label="可见人群" required>
                <el-select v-model="faqForm.base.audience" placeholder="请选择" multiple collapse-tags collapse-tags-tooltip class="w-full">
                  <el-option v-for="o in audienceOptions" :key="o.value" :label="o.label" :value="o.value" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="12">
              <el-form-item label="排序值">
                <el-input-number v-model="faqForm.base.sortValue" :min="0" :max="99999" :step="1" :precision="0" class="w-full" controls-position="right" />
              </el-form-item>
            </el-col>
          </el-row>
        </div>

        <div class="text-sm font-bold text-gray-800 mt-5 mb-2">三语言内容</div>
        <el-tabs v-model="faqForm.activeLang" type="card">
          <el-tab-pane label="简体中文" name="zh-Hans"></el-tab-pane>
          <el-tab-pane label="繁體中文" name="zh-Hant"></el-tab-pane>
          <el-tab-pane label="English" name="en"></el-tab-pane>
        </el-tabs>

        <div class="mt-3 bg-white border border-gray-200 rounded-lg p-4">
          <div class="flex items-start justify-between gap-2 flex-wrap mb-3">
            <div class="text-xs text-gray-500">
              FAQ整体状态：
              <span class="inline-flex items-center px-2 py-1 text-[11px] font-medium rounded-full border ml-1" :class="mergedStatusTagClass(mergedPublishStatus(faqForm).status)">
                {{ mergedStatusLabel(mergedPublishStatus(faqForm).status) }}
              </span>
            </div>
            <div
              v-if="mergedPublishStatus(faqForm).status === 'published' && hasLegacyNeedsUpdateFlag(faqForm)"
              class="text-xs text-yellow-700 bg-yellow-50 border border-yellow-100 rounded-lg px-3 py-2"
            >
              存在之前未发布的修改，保存并发布后生效。
            </div>
          </div>
          <el-form-item label="问题标题" required>
            <el-input v-model="currentLangDraft.title" placeholder="请输入" @input="markCurrentLangEdited" />
          </el-form-item>
          <el-form-item label="简短回答">
            <el-input v-model="currentLangDraft.shortAnswer" type="textarea" :rows="2" placeholder="用于列表摘要和页面内帮助" @input="markCurrentLangEdited" />
          </el-form-item>
          <el-form-item label="详细回答" required>
            <div class="w-full">
              <div class="border border-gray-200 rounded-lg overflow-hidden">
                <div class="bg-gray-50 border-b border-gray-200 px-2 py-1 flex items-center gap-1 flex-wrap">
                  <button type="button" class="px-2 py-1 rounded text-xs font-medium hover:bg-gray-100" @click="editorCommand('bold')">加粗</button>
                  <button type="button" class="px-2 py-1 rounded text-xs font-medium hover:bg-gray-100" @click="editorCommand('italic')">斜体</button>
                  <button type="button" class="px-2 py-1 rounded text-xs font-medium hover:bg-gray-100" @click="editorCommand('formatBlock', '<h3>')">标题</button>
                  <button type="button" class="px-2 py-1 rounded text-xs font-medium hover:bg-gray-100" @click="editorCommand('insertOrderedList')">有序列表</button>
                  <button type="button" class="px-2 py-1 rounded text-xs font-medium hover:bg-gray-100" @click="editorCommand('insertUnorderedList')">无序列表</button>
                  <button type="button" class="px-2 py-1 rounded text-xs font-medium hover:bg-gray-100" @click="insertLink">插入链接</button>
                  <button type="button" class="px-2 py-1 rounded text-xs font-medium hover:bg-gray-100" @click="insertImage">插入图片</button>
                  <button type="button" class="px-2 py-1 rounded text-xs font-medium hover:bg-gray-100" @click="insertTable">插入表格</button>
                  <button type="button" class="px-2 py-1 rounded text-xs font-medium hover:bg-gray-100" @click="editorCommand('removeFormat')">清除格式</button>
                </div>
                <div
                  :key="`editor-${faqForm.id}-${faqForm.activeLang}`"
                  ref="editorRef"
                  class="px-3 py-2 min-h-[160px] text-sm leading-7 outline-none"
                  contenteditable="true"
                  @input="onEditorInput"
                  @blur="onEditorInput"
                ></div>
              </div>
            </div>
          </el-form-item>
          <el-form-item label="搜索关键词">
            <el-input v-model="currentLangDraft.keywords" placeholder="用逗号分隔" @input="markCurrentLangEdited" />
          </el-form-item>
        </div>
      </el-form>
    </div>

    <template #footer>
      <div class="w-full flex items-center justify-end gap-2 flex-wrap">
        <button type="button" class="px-4 py-2 rounded-lg text-sm font-medium border border-gray-200 bg-white hover:bg-gray-50 text-gray-700" @click="requestCloseFaqDrawer">
          取消
        </button>
        <button
          v-if="mergedPublishStatus(faqForm).status !== 'published'"
          type="button"
          class="px-4 py-2 rounded-lg text-sm font-medium border border-gray-200 bg-white hover:bg-gray-50 text-gray-700"
          @click="saveDraft"
        >
          {{ mergedPublishStatus(faqForm).status === 'unpublished' ? '保存' : '保存草稿' }}
        </button>
        <button type="button" class="px-4 py-2 rounded-lg text-sm font-medium border border-gray-200 bg-white hover:bg-gray-50 text-gray-700" @click="previewCurrentDraft">
          预览
        </button>
        <button type="button" class="px-4 py-2 rounded-lg text-sm font-medium bg-primaryBtn hover:bg-primaryBtnHover text-white" @click="confirmPublishAllLangs">
          {{ mergedPublishStatus(faqForm).status === 'published' ? '保存并发布' : mergedPublishStatus(faqForm).status === 'unpublished' ? '重新发布' : '发布' }}
        </button>
      </div>
    </template>
  </el-drawer>

  <el-dialog v-model="historyDialog.open" title="历史版本" width="860px">
    <div class="overflow-x-auto">
      <table class="w-full text-sm min-w-[820px]">
        <thead class="bg-tableHeader text-gray-600 border-b border-gray-200">
          <tr>
            <th class="px-4 py-3 font-medium whitespace-nowrap">时间</th>
            <th class="px-4 py-3 font-medium whitespace-nowrap">语言</th>
            <th class="px-4 py-3 font-medium whitespace-nowrap">版本</th>
            <th class="px-4 py-3 font-medium whitespace-nowrap">状态</th>
            <th class="px-4 py-3 font-medium whitespace-nowrap">操作人</th>
            <th class="px-4 py-3 font-medium whitespace-nowrap text-center">操作</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-100">
          <tr v-for="(h, idx) in historyDialog.rows" :key="idx">
            <td class="px-4 py-3 text-gray-500 whitespace-nowrap">{{ formatDateTime(h.time) }}</td>
            <td class="px-4 py-3 text-gray-700 whitespace-nowrap">{{ langLabel(h.lang) }}</td>
            <td class="px-4 py-3 text-gray-700 whitespace-nowrap">v{{ h.version }}</td>
            <td class="px-4 py-3 whitespace-nowrap">
              <span class="inline-flex items-center px-2 py-1 text-[11px] font-medium rounded-full border" :class="statusTagClass(h.status)">
                {{ statusLabel(h.status) }}
              </span>
            </td>
            <td class="px-4 py-3 text-gray-700 whitespace-nowrap">{{ h.operator }}</td>
            <td class="px-4 py-3 text-center whitespace-nowrap">
              <div class="flex items-center justify-center gap-2">
                <button
                  type="button"
                  class="text-blue-500 hover:text-blue-700 text-xs font-medium transition-colors disabled:text-gray-300 disabled:hover:text-gray-300"
                  :disabled="!h.content"
                  @click="openHistoryPreview(h)"
                >
                  预览
                </button>
                <button
                  type="button"
                  class="text-emerald-600 hover:text-emerald-700 text-xs font-medium transition-colors disabled:text-gray-300 disabled:hover:text-gray-300"
                  :disabled="!h.content"
                  @click="loadHistoryToForm(h)"
                >
                  载入到编辑
                </button>
              </div>
            </td>
          </tr>
          <tr v-if="historyDialog.rows.length === 0">
            <td colspan="6" class="px-4 py-10 text-center text-gray-500 text-sm">暂无历史版本</td>
          </tr>
        </tbody>
      </table>
    </div>
  </el-dialog>

  <el-dialog v-model="langActionDialog.open" title="下架" width="520px">
    <div class="text-sm text-gray-700">
      <div class="text-xs text-gray-500 mb-3">FAQ：{{ langActionDialog.faqId }}</div>
      <div class="bg-gray-50 border border-gray-200 rounded-lg p-4">
        <div class="text-sm font-bold text-gray-900 mb-2">下架说明</div>
        <div class="text-xs text-gray-500">下架将同时作用于简体中文、繁體中文和 English。</div>
      </div>
    </div>
    <template #footer>
      <div class="flex items-center justify-end gap-2">
        <button type="button" class="px-4 py-2 rounded-lg text-sm font-medium border border-gray-200 bg-white hover:bg-gray-50 text-gray-700" @click="langActionDialog.open = false">
          取消
        </button>
        <button type="button" class="px-4 py-2 rounded-lg text-sm font-medium bg-primaryBtn hover:bg-primaryBtnHover text-white" @click="confirmLangAction">
          确认下架
        </button>
      </div>
    </template>
  </el-dialog>

  <el-dialog v-model="previewDialog.open" :title="previewDialog.title" width="980px">
    <div class="p-2">
      <div class="flex items-center gap-2 flex-wrap">
        <el-select v-model="previewDialog.lang" class="w-[180px]" :disabled="previewDialog.source === 'history'" @change="updateRowPreview">
          <el-option label="简体中文" value="zh-Hans" />
          <el-option label="繁體中文" value="zh-Hant" />
          <el-option label="English" value="en" />
        </el-select>
        <span class="text-xs text-gray-500">{{ previewDialog.faqId }}</span>
      </div>
      <div class="mt-3 bg-white border border-gray-200 rounded-lg p-5">
        <div v-if="previewDialog.missing" class="text-sm text-orange-700 bg-orange-50 border border-orange-100 rounded px-3 py-2">
          {{ previewDialog.missing }}
        </div>
        <div v-else>
          <div class="text-xs text-gray-500">{{ previewDialog.category }} / {{ previewDialog.faqId }}</div>
          <div class="mt-1 text-xl font-bold text-gray-800">{{ previewDialog.content.title }}</div>
          <div class="mt-3 text-sm text-gray-700 leading-7" v-html="previewDialog.content.detailHtml"></div>
        </div>
      </div>
    </div>
  </el-dialog>

  <el-dialog
    v-model="portalDialog.open"
    :fullscreen="true"
    :show-close="false"
    :close-on-click-modal="false"
    :lock-scroll="true"
    :append-to-body="true"
    class="faq-preview-dialog"
  >
    <div class="h-full flex flex-col">
      <div class="bg-gray-50 border-b border-gray-200 px-4 py-3 flex items-center justify-between gap-3 flex-wrap">
        <div class="flex items-center gap-3">
          <div class="text-sm font-bold text-gray-800">{{ portalDialog.mode === 'web' ? '官网帮助中心预览' : 'CRM帮助中心预览' }}</div>
          <div class="text-xs text-gray-500">全屏预览（演示数据）</div>
        </div>
        <div class="flex items-center gap-2 flex-wrap">
          <el-select v-model="portalDialog.lang" class="w-[180px]" @change="persistPortalLang">
            <el-option label="zh-Hans 简体中文" value="zh-Hans" />
            <el-option label="zh-Hant 繁體中文" value="zh-Hant" />
            <el-option label="en English" value="en" />
          </el-select>
          <el-select v-model="portalDialog.identity" class="w-[160px]">
            <el-option label="直客" value="client" />
            <el-option label="代理" value="agent" />
          </el-select>
          <button type="button" class="px-4 py-2 rounded-lg text-sm font-medium bg-primaryBtn hover:bg-primaryBtnHover text-white" @click="portalDialog.open = false">
            关闭预览
          </button>
        </div>
      </div>

      <div class="flex-1 min-h-0 bg-[#F5F6F8] overflow-y-auto">
        <div v-if="portalDialog.mode === 'web'" class="min-h-full">
          <div class="bg-menuBg text-white">
            <div class="max-w-[1200px] mx-auto px-4 h-14 flex items-center justify-between gap-4">
              <div class="flex items-center gap-3">
                <div class="text-base font-black tracking-wider">HATC</div>
                <div class="text-sm text-white/80">帮助中心</div>
              </div>
              <div class="hidden md:flex items-center gap-6 text-sm text-white/80">
                <span class="text-white font-medium border-b-2 border-primaryBtn pb-0.5">帮助首页</span>
                <span class="hover:text-white transition-colors">常见问题</span>
                <span class="hover:text-white transition-colors">联系客服</span>
              </div>
            </div>
          </div>

          <div class="max-w-[1200px] mx-auto px-4 py-6">
            <div v-if="!portalDetail.open" class="bg-white border border-gray-200 rounded-[10px] p-5 md:p-6">
              <div class="text-xl md:text-2xl font-bold text-gray-900">您好，需要什么帮助？</div>
              <div class="mt-2 text-sm text-gray-500">搜索常见问题，快速找到业务说明和处理方法。</div>
              <div class="mt-4 flex flex-col md:flex-row gap-2 md:items-center">
                <el-input
                  v-model="portalDialog.search"
                  placeholder="搜索：入金未到账、出金审核、佣金结算、MT5账户"
                  clearable
                  class="md:flex-1"
                  @keyup.enter="onPortalSearch"
                />
                <button type="button" class="px-5 py-2 rounded-lg text-sm font-medium bg-primaryBtn hover:bg-primaryBtnHover text-white" @click="onPortalSearch">
                  搜索
                </button>
              </div>
              <div class="mt-3 flex flex-wrap items-center gap-2 text-sm">
                <div class="text-xs text-gray-500">热门搜索</div>
                <button
                  v-for="t in portalHotTerms"
                  :key="t"
                  type="button"
                  class="px-3 py-1.5 rounded-full text-xs font-medium border border-gray-200 bg-white hover:bg-gray-50 text-gray-700"
                  @click="applyPortalHotTerm(t)"
                >
                  {{ t }}
                </button>
              </div>
            </div>
            <div v-else class="bg-white border border-gray-200 rounded-[10px] px-4 py-3 flex flex-col md:flex-row gap-2 md:items-center">
              <button type="button" class="px-3 py-2 rounded-lg text-sm font-medium border border-gray-200 bg-white hover:bg-gray-50 text-gray-700" @click="closePortalDetail">
                返回列表
              </button>
              <el-input v-model="portalDialog.search" placeholder="搜索帮助中心" clearable class="md:flex-1" @keyup.enter="onPortalSearch" />
              <button type="button" class="px-4 py-2 rounded-lg text-sm font-medium bg-primaryBtn hover:bg-primaryBtnHover text-white" @click="onPortalSearch">
                搜索
              </button>
            </div>

            <div class="mt-4 grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-4">
              <div class="bg-white border border-gray-200 rounded-[10px] overflow-hidden">
                <div class="px-4 py-3 border-b border-gray-100 text-sm font-medium text-gray-800">问题分类</div>
                <div class="p-3">
                  <button
                    type="button"
                    class="w-full text-left px-3 py-2 rounded-lg text-sm font-medium border transition-colors"
                    :class="portalDialog.categoryId === 'all' ? 'bg-[#FFF7ED] border-[#F3DEC6] text-[#8A5B1F] border-l-4 border-l-primaryBtn' : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'"
                    @click="portalDialog.categoryId = 'all'"
                  >
                    全部问题
                    <span class="float-right text-xs text-gray-500">{{ portalList.length }}</span>
                  </button>
                  <div class="mt-2 space-y-2">
                    <div v-for="node in portalCategoryTree" :key="node.id" class="space-y-1">
                      <button
                        type="button"
                        class="w-full text-left px-3 py-2 rounded-lg text-sm font-medium border transition-colors"
                        :class="portalDialog.categoryId === node.id ? 'bg-[#FFF7ED] border-[#F3DEC6] text-[#8A5B1F] border-l-4 border-l-primaryBtn' : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'"
                        @click="portalDialog.categoryId = node.id"
                      >
                        {{ node.label }}
                        <span class="float-right text-xs text-gray-500">{{ node.count }}</span>
                      </button>
                      <div v-if="node.children && node.children.length" class="pl-2 space-y-1">
                        <button
                          v-for="c in node.children"
                          :key="c.id"
                          type="button"
                          class="w-full text-left px-3 py-2 rounded-lg text-[13px] font-medium border transition-colors"
                          :class="portalDialog.categoryId === c.id ? 'bg-[#FFF7ED] border-[#F3DEC6] text-[#8A5B1F] border-l-4 border-l-primaryBtn' : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'"
                          @click="portalDialog.categoryId = c.id"
                        >
                          {{ c.label }}
                          <span class="float-right text-xs text-gray-500">{{ c.count }}</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="bg-white border border-gray-200 rounded-[10px] overflow-hidden">
                <div class="px-4 py-3 border-b border-gray-100 flex items-center justify-between gap-3 flex-wrap">
                  <div>
                    <div v-if="portalDetail.open" class="text-xs text-gray-500">帮助中心 / {{ portalDetail.path }}</div>
                    <div v-else class="text-xs text-gray-500">{{ webLocationText }}</div>
                    <div v-if="portalDetail.open" class="mt-0.5 text-base font-bold text-gray-900">{{ portalDetail.category }}</div>
                    <div v-else class="mt-0.5 text-base font-bold text-gray-900">{{ webCurrentCategoryTitle }}</div>
                  </div>
                  <div class="text-sm text-gray-500">共 <span class="font-medium text-gray-800">{{ portalList.length }}</span> 条</div>
                </div>

                <div v-if="portalList.length === 0" class="p-8 md:p-10 text-center">
                  <div class="text-base font-bold text-gray-900">没有找到相关问题</div>
                  <div class="mt-2 text-sm text-gray-500">尝试更换关键词或切换分类。也可以直接联系客服。</div>
                  <div class="mt-5 flex items-center justify-center gap-2 flex-wrap">
                    <button
                      v-for="c in portalCategoryButtons.slice(0, 4)"
                      :key="c.id"
                      type="button"
                      class="px-3 py-2 rounded-lg text-sm font-medium border border-gray-200 bg-white hover:bg-gray-50 text-gray-700"
                      @click="portalDialog.categoryId = c.id"
                    >
                      {{ c.label }}
                    </button>
                    <button type="button" class="px-4 py-2 rounded-lg text-sm font-medium bg-primaryBtn hover:bg-primaryBtnHover text-white" @click="contactSupport">
                      联系客服
                    </button>
                  </div>
                  <div class="mt-6 text-left max-w-[720px] mx-auto">
                    <div class="text-sm font-bold text-gray-800">热门问题</div>
                    <div class="mt-2 space-y-2">
                      <button
                        v-for="f in portalHotFaqs"
                        :key="f.id"
                        type="button"
                        class="w-full text-left px-3 py-2 rounded-lg border border-gray-200 hover:bg-gray-50"
                        @click="openPortalDetail(f.faq)"
                      >
                        <div class="text-sm font-medium text-gray-900">{{ f.title }}</div>
                        <div class="mt-1 text-xs text-gray-500 line-clamp-1">{{ f.shortAnswer || '-' }}</div>
                      </button>
                    </div>
                  </div>
                </div>

                  <div v-else class="p-4 md:p-5">
                  <div v-if="portalDetail.open" class="grid grid-cols-1 gap-6">
                    <div>
                      <div v-if="portalDetail.missing" class="text-sm text-orange-700 bg-orange-50 border border-orange-100 rounded px-3 py-2">
                        {{ portalDetail.missing }}
                      </div>
                      <div v-else>
                        <div class="text-xs text-gray-500">帮助中心 / {{ portalDetail.path }}</div>
                        <div class="mt-2 text-2xl font-bold text-gray-900">{{ portalDetail.content.title }}</div>
                        <div class="mt-5 text-sm text-gray-700 leading-7" v-html="portalDetail.content.detailHtml"></div>
                        <div class="mt-6 pt-5 border-t border-gray-100 flex items-center justify-between gap-3 flex-wrap">
                          <div class="text-sm text-gray-700 font-medium">
                            以上内容是否解决了您的问题？
                            <span v-if="isPreviewSessionFeedbackDone(portalDetail.faqId)" class="ml-2 text-xs text-gray-500">已反馈</span>
                          </div>
                          <div class="flex items-center gap-2">
                            <button
                              type="button"
                              class="px-4 py-2 rounded-lg text-sm font-medium border border-gray-200 bg-white hover:bg-gray-50 text-gray-700 disabled:opacity-60 disabled:cursor-not-allowed"
                              :disabled="isPreviewSessionFeedbackDone(portalDetail.faqId)"
                              @click="submitFeedback(true, portalDetail.faqId)"
                            >
                              有帮助
                            </button>
                            <button
                              type="button"
                              class="px-4 py-2 rounded-lg text-sm font-medium border border-gray-200 bg-white hover:bg-gray-50 text-gray-700 disabled:opacity-60 disabled:cursor-not-allowed"
                              :disabled="isPreviewSessionFeedbackDone(portalDetail.faqId)"
                              @click="submitFeedback(false, portalDetail.faqId)"
                            >
                              未解决
                            </button>
                            <button type="button" class="px-4 py-2 rounded-lg text-sm font-medium bg-primaryBtn hover:bg-primaryBtnHover text-white" @click="contactSupport">
                              联系客服
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div v-else class="divide-y divide-gray-100">
                    <button v-for="f in portalList" :key="f.id" type="button" class="w-full text-left py-4 hover:bg-gray-50/60 transition-colors" @click="openPortalDetail(f.faq)">
                      <div class="flex items-start justify-between gap-3">
                        <div class="min-w-0">
                          <div class="flex items-center gap-2 flex-wrap">
                            <div class="text-sm md:text-base font-bold text-gray-900 break-words">{{ f.title }}</div>
                          </div>
                          <div class="mt-1 text-sm text-gray-600 line-clamp-1">{{ f.shortAnswer || '-' }}</div>
                        </div>
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div v-else class="max-w-[1200px] mx-auto px-4 py-6">
          <div class="mt-4 bg-white border border-gray-200 rounded-[10px] p-5 md:p-6">
            <div class="flex items-start justify-between gap-3 flex-wrap">
              <div>
                <div class="text-xl md:text-2xl font-bold text-gray-900">您好，有什么可以帮助您？</div>
                <div class="mt-2 text-sm text-gray-500">搜索常见问题，或从当前业务场景快速进入帮助。</div>
              </div>
              <div class="flex items-center gap-2">
                <button type="button" class="px-4 py-2 rounded-lg text-sm font-medium border border-gray-200 bg-white hover:bg-gray-50 text-gray-700" @click="contactSupport">
                  联系客服
                </button>
              </div>
            </div>
            <div class="mt-4 flex flex-col md:flex-row gap-2 md:items-center">
              <el-input
                v-model="portalDialog.search"
                placeholder="搜索：入金/充值、出金/提现、佣金/返佣、MT账号/MT5账号"
                clearable
                class="md:flex-1"
                @keyup.enter="onPortalSearch"
              />
              <button type="button" class="px-5 py-2 rounded-lg text-sm font-medium bg-primaryBtn hover:bg-primaryBtnHover text-white" @click="onPortalSearch">
                搜索
              </button>
            </div>
          </div>

          <div class="mt-4 bg-white border border-gray-200 rounded-[10px] overflow-hidden">
            <div class="px-4 py-3 border-b border-gray-100 flex items-start justify-between gap-3 flex-wrap">
              <div>
                <div class="text-sm font-bold text-gray-900">常见问题</div>
                <div class="mt-2 flex flex-wrap items-center gap-2">
                  <button
                    type="button"
                    class="px-3 py-1.5 rounded-full text-xs font-medium border transition-colors"
                    :class="portalDialog.categoryId === 'all' ? 'bg-[#FFF7ED] border-[#F3DEC6] text-[#8A5B1F]' : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'"
                    @click="portalDialog.categoryId = 'all'"
                  >
                    全部
                  </button>
                  <button
                    v-for="c in crmQuickCategories"
                    :key="c.id"
                    type="button"
                    class="px-3 py-1.5 rounded-full text-xs font-medium border transition-colors"
                    :class="portalDialog.categoryId === c.id ? 'bg-[#FFF7ED] border-[#F3DEC6] text-[#8A5B1F]' : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'"
                    @click="portalDialog.categoryId = c.id"
                  >
                    {{ c.label }}（{{ c.count }}）
                  </button>
                </div>
              </div>
              <div class="text-sm text-gray-500">共 <span class="font-medium text-gray-800">{{ portalList.length }}</span> 条</div>
            </div>

            <div v-if="portalList.length === 0" class="p-8 text-center text-gray-500">
              没有找到相关问题
            </div>
            <div v-else class="p-4">
              <el-collapse v-model="crmCollapseActive" accordion>
                <el-collapse-item v-for="f in portalList.slice(0, 20)" :key="f.id" :name="f.id">
                  <template #title>
                    <div class="flex items-center justify-between gap-3 w-full pr-2">
                      <div class="text-sm font-bold text-gray-900">{{ f.title }}</div>
                      <span class="text-xs text-gray-500">{{ f.id }}</span>
                    </div>
                  </template>
                  <div class="text-sm text-gray-700 leading-7">
                    <div class="text-sm text-gray-600">{{ f.shortAnswer || '-' }}</div>
                    <div class="mt-4 bg-white border border-gray-200 rounded-[10px] p-4">
                      <div class="text-sm text-gray-700 leading-7" v-html="getPublishedContent(f.faq, portalDialog.lang)?.detailHtml || ''"></div>
                    </div>
                    <div class="mt-4 flex items-center justify-between gap-3 flex-wrap">
                      <div class="text-sm text-gray-700 font-medium">
                        以上内容是否解决了您的问题？
                        <span v-if="isPreviewSessionFeedbackDone(f.id)" class="ml-2 text-xs text-gray-500">已反馈</span>
                      </div>
                      <div class="flex items-center gap-2 flex-wrap">
                        <button
                          type="button"
                          class="px-4 py-2 rounded-lg text-sm font-medium border border-gray-200 bg-white hover:bg-gray-50 text-gray-700 disabled:opacity-60 disabled:cursor-not-allowed"
                          :disabled="isPreviewSessionFeedbackDone(f.id)"
                          @click="submitFeedback(true, f.id)"
                        >
                          有帮助
                        </button>
                        <button
                          type="button"
                          class="px-4 py-2 rounded-lg text-sm font-medium border border-gray-200 bg-white hover:bg-gray-50 text-gray-700 disabled:opacity-60 disabled:cursor-not-allowed"
                          :disabled="isPreviewSessionFeedbackDone(f.id)"
                          @click="submitFeedback(false, f.id)"
                        >
                          未解决
                        </button>
                        <button type="button" class="px-4 py-2 rounded-lg text-sm font-medium bg-primaryBtn hover:bg-primaryBtnHover text-white" @click="contactSupport">
                          联系客服
                        </button>
                      </div>
                    </div>
                  </div>
                </el-collapse-item>
              </el-collapse>
            </div>
          </div>
        </div>
      </div>
    </div>
  </el-dialog>

  <el-dialog v-model="categoryDialog.open" :title="categoryDialog.title" width="640px">
    <el-form :model="categoryForm" label-width="108px">
      <el-form-item label="名称" required>
        <el-input v-model="categoryForm.name" placeholder="请输入" />
      </el-form-item>
      <el-form-item v-if="categoryDialog.level === 'level2'" label="一级分类" required>
        <el-select v-model="categoryForm.parentId" placeholder="请选择" class="w-full">
          <el-option v-for="c in parentCategoryOptionsForLevel2" :key="c.id" :label="c.label" :value="c.id" :disabled="!!c.disabled" />
        </el-select>
      </el-form-item>
      <el-form-item label="状态">
        <el-switch v-model="categoryForm.enabled" />
      </el-form-item>
      <el-form-item label="备注">
        <el-input v-model="categoryForm.remark" type="textarea" :rows="3" placeholder="可选" />
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="flex items-center justify-end gap-2">
        <button type="button" class="px-4 py-2 rounded-lg text-sm font-medium border border-gray-200 bg-white hover:bg-gray-50 text-gray-700" @click="categoryDialog.open = false">
          取消
        </button>
        <button type="button" class="px-4 py-2 rounded-lg text-sm font-medium bg-primaryBtn hover:bg-primaryBtnHover text-white" @click="saveCategory">
          保存
        </button>
      </div>
    </template>
  </el-dialog>
  </div>
</template>

<script setup>
import { computed, nextTick, reactive, ref, watch } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'

const STORAGE_KEY = 'crm_faq_management_v1'
const PREVIEW_LANG_KEY = 'crm_faq_preview_lang_v1'

const activeTab = ref('faq')

const audienceOptions = [
  { label: '代理', value: 'agent' },
  { label: '直客', value: 'client' }
]

const statusOptions = [
  { label: '草稿', value: 'draft' },
  { label: '已发布', value: 'published' },
  { label: '未填写', value: 'empty' },
  { label: '已下架', value: 'unpublished' }
]

const mergedStatusOptions = [
  { label: '草稿', value: 'draft' },
  { label: '已发布', value: 'published' },
  { label: '已下架', value: 'unpublished' }
]

function nowTs() {
  return Date.now()
}

function formatDateTime(ts) {
  if (!ts) return '-'
  const d = new Date(ts)
  const pad = (n) => String(n).padStart(2, '0')
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`
}

function cloneJson(v) {
  return JSON.parse(JSON.stringify(v))
}

function normalizeSpace(s) {
  return String(s || '').trim().replace(/\s+/g, ' ')
}

function langLabel(lang) {
  if (lang === 'zh-Hans') return '简体中文'
  if (lang === 'zh-Hant') return '繁體中文'
  return 'English'
}

function roleLabel(role) {
  if (role === 'agent') return '普通代理'
  if (role === 'agent_level_1') return '一级代理'
  if (role === 'agent_manager') return '有下级管理权限的代理'
  return '-'
}

function normalizeForSearch(lang, text) {
  const src = String(text || '')
    .toLowerCase()
    .replace(/\s+/g, ' ')
    .trim()
  const synonyms = [
    { words: ['入金', '充值'], key: 'deposit' },
    { words: ['出金', '提现'], key: 'withdraw' },
    { words: ['佣金', '返佣'], key: 'commission' },
    { words: ['交易账号', 'mt账号', 'mt5账号'], key: 'mt' }
  ]
  let out = src
  for (const s of synonyms) {
    for (const w of s.words) out = out.replaceAll(String(w).toLowerCase(), s.key)
  }
  if (lang === 'zh-Hant') {
    out = out.replaceAll('儲值', 'deposit').replaceAll('提現', 'withdraw').replaceAll('賬戶', '账户')
  }
  return out
}

function statusLabel(s) {
  const found = statusOptions.find((x) => x.value === s)
  return found ? found.label : '-'
}

function langStatusLabel(s) {
  return statusLabel(s)
}

function statusTagClass(s) {
  if (s === 'published') return 'bg-emerald-50 text-emerald-600 border-emerald-100'
  if (s === 'draft') return 'bg-orange-50 text-orange-600 border-orange-100'
  if (s === 'unpublished') return 'bg-gray-100 text-gray-600 border-gray-200'
  return 'bg-gray-50 text-gray-500 border-gray-200'
}

function audienceLabel(v) {
  const arr = Array.isArray(v) ? v : []
  const hasAgent = arr.includes('agent')
  const hasClient = arr.includes('client')
  if (hasAgent && hasClient) return '代理、直客'
  if (hasAgent) return '代理'
  if (hasClient) return '直客'
  return '-'
}

function identityLabel(v) {
  if (v === 'agent') return '代理'
  if (v === 'client') return '直客'
  return '-'
}

function makeLangDraft() {
  return {
    title: '',
    shortAnswer: '',
    detailHtml: '',
    keywords: '',
    seoTitle: '',
    seoDesc: '',
    images: '',
    attachments: '',
    version: 1,
    updatedAt: nowTs(),
    lastEditor: '运营管理员',
    autoGenerated: false,
    manualEdited: false,
    publishedAt: null,
    publishedContent: null,
    needsUpdate: false,
    unpublished: false
  }
}

function makeFaq() {
  return {
    id: '',
    createdAt: nowTs(),
    updatedAt: nowTs(),
    base: {
      categoryId: '',
      channels: ['web', 'crm'],
      audience: ['agent', 'client'],
      sortValue: 0
    },
    activeLang: 'zh-Hans',
    langs: {
      'zh-Hans': { draft: makeLangDraft() },
      'zh-Hant': { draft: makeLangDraft() },
      en: { draft: makeLangDraft() }
    },
    history: {
      'zh-Hans': [],
      'zh-Hant': [],
      en: []
    }
  }
}

function migrateAudienceValue(v) {
  const raw = Array.isArray(v) ? v : typeof v === 'string' ? [v] : []
  const next = new Set()
  for (const item of raw) {
    if (item === 'all' || item === 'login') {
      next.add('agent')
      next.add('client')
      continue
    }
    if (item === 'agent' || item === 'agent_level_1' || item === 'agent_manager') {
      next.add('agent')
      continue
    }
    if (item === 'client') {
      next.add('client')
      continue
    }
  }
  if (next.size === 0) {
    next.add('agent')
    next.add('client')
  }
  return [...next]
}

function makeCategory(id, nameHans, nameHant, nameEn, parentId) {
  return {
    id,
    parentId: parentId || null,
    enabled: true,
    createdAt: nowTs(),
    remark: '',
    name: {
      'zh-Hans': nameHans,
      'zh-Hant': nameHant || nameHans,
      en: nameEn || nameHans
    }
  }
}

function defaultState() {
  const categories = [
    makeCategory('CAT-1001', '出入金', '出入金', 'Funding'),
    makeCategory('CAT-1002', '佣金管理', '佣金管理', 'Commission'),
    makeCategory('CAT-1003', 'MT5账户', 'MT5賬戶', 'MT5 Account'),
    makeCategory('CAT-1004', '客户管理', '客戶管理', 'Client Management'),
    makeCategory('CAT-1005', '代理管理', '代理管理', 'Partner Management'),
    makeCategory('CAT-2001', '入金', '入金', 'Deposit', 'CAT-1001'),
    makeCategory('CAT-2002', '出金', '出金', 'Withdrawal', 'CAT-1001'),
    makeCategory('CAT-2003', '内部转账', '內部轉賬', 'Internal Transfer', 'CAT-1001'),
    makeCategory('CAT-2101', '佣金计算', '佣金計算', 'Commission Calculation', 'CAT-1002'),
    makeCategory('CAT-2102', '佣金结算', '佣金結算', 'Commission Settlement', 'CAT-1002'),
    makeCategory('CAT-2201', '常见问题', '常見問題', 'General', 'CAT-1003'),
    makeCategory('CAT-2301', '常见问题', '常見問題', 'General', 'CAT-1004'),
    makeCategory('CAT-2401', '常见问题', '常見問題', 'General', 'CAT-1005')
  ]
  const publishTs = nowTs()
  function publishAllLangs(faq) {
    for (const l of ['zh-Hans', 'zh-Hant', 'en']) {
      const d = faq?.langs?.[l]?.draft
      if (!d) continue
      d.publishedContent = buildPublishedSnapshot(d)
      d.publishedAt = publishTs
      d.unpublished = false
      d.needsUpdate = false
    }
  }
  const f1 = makeFaq()
  f1.id = 'FAQ-1001'
  f1.base.categoryId = 'CAT-2001'
  f1.base.channels = ['web', 'crm']
  f1.base.audience = ['agent', 'client']
  f1.base.relatedPages = ['deposit_apply', 'deposit_record']
  f1.langs['zh-Hans'].draft.title = '入金支付成功后，为什么 MT5 账户还没到账？'
  f1.langs['zh-Hans'].draft.shortAnswer = '支付成功与交易账户入账是两个处理节点。'
  f1.langs['zh-Hans'].draft.detailHtml =
    '<p>支付成功后，资金还需要经过账户入账处理。请先进入“入金记录”，查看该订单的 MT5 入账状态。</p><ol><li>如果显示“入账处理中”，请在预计时间内等待。</li><li>如果显示“入账异常”，请打开订单详情并联系支持。</li><li>请不要重复付款，以免产生重复订单。</li></ol>'
  f1.langs['zh-Hans'].draft.keywords = '入金,充值,未到账,MT5'
  f1.langs['zh-Hans'].draft.publishedContent = cloneJson({
    title: f1.langs['zh-Hans'].draft.title,
    shortAnswer: f1.langs['zh-Hans'].draft.shortAnswer,
    detailHtml: f1.langs['zh-Hans'].draft.detailHtml,
    keywords: f1.langs['zh-Hans'].draft.keywords
  })
  f1.langs['zh-Hans'].draft.publishedAt = nowTs()
  f1.langs['zh-Hant'].draft.title = '入金支付成功後，為什麼 MT5 帳戶還沒到帳？'
  f1.langs['zh-Hant'].draft.shortAnswer = '支付成功與交易帳戶入帳是兩個處理節點。'
  f1.langs['zh-Hant'].draft.detailHtml =
    '<p>支付成功後，資金還需要經過帳戶入帳處理。請先進入「入金記錄」，查看該訂單的 MT5 入帳狀態。</p><ol><li>如果顯示「入帳處理中」，請在預計時間內等待。</li><li>如果顯示「入帳異常」，請打開訂單詳情並聯絡支援。</li><li>請不要重複付款，以免產生重複訂單。</li></ol>'
  f1.langs['zh-Hant'].draft.keywords = '入金,儲值,未到帳,MT5'
  f1.langs['zh-Hant'].draft.publishedContent = cloneJson({
    title: f1.langs['zh-Hant'].draft.title,
    shortAnswer: f1.langs['zh-Hant'].draft.shortAnswer,
    detailHtml: f1.langs['zh-Hant'].draft.detailHtml,
    keywords: f1.langs['zh-Hant'].draft.keywords
  })
  f1.langs['zh-Hant'].draft.publishedAt = f1.langs['zh-Hans'].draft.publishedAt
  f1.langs.en.draft.title = 'Why has my deposit not reached my MT5 account?'
  f1.langs.en.draft.shortAnswer = 'A successful payment and an MT5 credit are separate processing stages.'
  f1.langs.en.draft.detailHtml =
    '<p>After a successful payment, funds still need to be credited to your trading account. Open Deposit History and check the MT5 credit status.</p><ol><li>If the status is Processing, wait until the estimated completion time.</li><li>If the status is Credit exception, open the order and contact support.</li><li>Do not make another payment for the same deposit.</li></ol>'
  f1.langs.en.draft.keywords = 'deposit,payment,pending,MT5'

  const f2 = makeFaq()
  f2.id = 'FAQ-1002'
  f2.base.categoryId = 'CAT-2001'
  f2.base.channels = ['web', 'crm']
  f2.base.audience = ['agent', 'client']
  f2.base.relatedPages = ['deposit_apply']
  f2.langs['zh-Hans'].draft.title = '美分账户的入金金额应该怎么填写？'
  f2.langs['zh-Hans'].draft.shortAnswer = '美分账户以 USC 计价，100 USC 等值 1 USD。'
  f2.langs['zh-Hans'].draft.detailHtml =
    '<p>美分账户的余额单位是 USC。100 USC 等值 1 USD。</p><p>例如，希望交易账户增加等值 100 USD，应填写 10,000 USC。提交前请再次核对“预计入账”和“实际支付”两个金额。</p>'
  f2.langs['zh-Hans'].draft.keywords = '美分,USC,金额,换算,入金'
  f2.langs['zh-Hans'].draft.publishedContent = cloneJson({
    title: f2.langs['zh-Hans'].draft.title,
    shortAnswer: f2.langs['zh-Hans'].draft.shortAnswer,
    detailHtml: f2.langs['zh-Hans'].draft.detailHtml,
    keywords: f2.langs['zh-Hans'].draft.keywords
  })
  f2.langs['zh-Hans'].draft.publishedAt = nowTs()
  f2.langs['zh-Hant'].draft.title = '美分帳戶的入金金額應該怎麼填寫？'
  f2.langs['zh-Hant'].draft.shortAnswer = '美分帳戶以 USC 計價，100 USC 等值 1 USD。'
  f2.langs['zh-Hant'].draft.detailHtml =
    '<p>美分帳戶的餘額單位是 USC。100 USC 等值 1 USD。</p><p>例如，希望交易帳戶增加等值 100 USD，應填寫 10,000 USC。</p>'
  f2.langs['zh-Hant'].draft.keywords = '美分,USC,金額,換算,入金'
  f2.langs['zh-Hant'].draft.publishedContent = cloneJson({
    title: f2.langs['zh-Hant'].draft.title,
    shortAnswer: f2.langs['zh-Hant'].draft.shortAnswer,
    detailHtml: f2.langs['zh-Hant'].draft.detailHtml,
    keywords: f2.langs['zh-Hant'].draft.keywords
  })
  f2.langs['zh-Hant'].draft.publishedAt = f2.langs['zh-Hans'].draft.publishedAt
  f2.langs['zh-Hant'].draft.needsUpdate = true
  f2.langs.en.draft.title = 'How do I enter a deposit amount for a Cent account?'
  f2.langs.en.draft.shortAnswer = 'Cent accounts are denominated in USC; 100 USC equals 1 USD.'
  f2.langs.en.draft.detailHtml =
    '<p>The balance of a Cent account is shown in USC. 100 USC equals 1 USD.</p><p>For example, to add the equivalent of 100 USD, enter 10,000 USC.</p>'
  f2.langs.en.draft.keywords = 'cent,USC,amount,conversion,deposit'
  f2.langs.en.draft.publishedContent = cloneJson({
    title: f2.langs.en.draft.title,
    shortAnswer: f2.langs.en.draft.shortAnswer,
    detailHtml: f2.langs.en.draft.detailHtml,
    keywords: f2.langs.en.draft.keywords
  })
  f2.langs.en.draft.publishedAt = f2.langs['zh-Hans'].draft.publishedAt
  f2.langs.en.draft.needsUpdate = true

  const f3 = makeFaq()
  f3.id = 'FAQ-1003'
  f3.base.categoryId = 'CAT-1002'
  f3.base.channels = ['crm']
  f3.base.audience = ['agent']
  f3.base.relatedPages = ['commission_detail']
  f3.langs['zh-Hans'].draft.title = '代理佣金什么时候结算？'
  f3.langs['zh-Hans'].draft.shortAnswer = '佣金结算时间取决于已生效的代理方案。'
  f3.langs['zh-Hans'].draft.detailHtml =
    '<p>你可以在“佣金管理”中查看当前方案、计算周期和预计结算时间。佣金明细会关联贡献客户与交易记录。</p><p>若交易仍在审核或不满足计佣条件，对应金额不会进入可提现余额。</p>'
  f3.langs['zh-Hans'].draft.keywords = '返佣,佣金,结算,提现'
  f3.langs['zh-Hans'].draft.publishedContent = cloneJson({
    title: f3.langs['zh-Hans'].draft.title,
    shortAnswer: f3.langs['zh-Hans'].draft.shortAnswer,
    detailHtml: f3.langs['zh-Hans'].draft.detailHtml,
    keywords: f3.langs['zh-Hans'].draft.keywords
  })
  f3.langs['zh-Hans'].draft.publishedAt = nowTs()
  f3.langs['zh-Hant'].draft.title = '代理佣金什麼時候結算？'
  f3.langs['zh-Hant'].draft.shortAnswer = '佣金結算時間取決於已生效的代理方案。'
  f3.langs['zh-Hant'].draft.detailHtml =
    '<p>你可以在「佣金管理」中查看當前方案、計算週期和預計結算時間。佣金明細會關聯貢獻客戶與交易記錄。</p>'
  f3.langs['zh-Hant'].draft.keywords = '返佣,佣金,結算,提現'
  f3.langs['zh-Hant'].draft.publishedContent = cloneJson({
    title: f3.langs['zh-Hant'].draft.title,
    shortAnswer: f3.langs['zh-Hant'].draft.shortAnswer,
    detailHtml: f3.langs['zh-Hant'].draft.detailHtml,
    keywords: f3.langs['zh-Hant'].draft.keywords
  })
  f3.langs['zh-Hant'].draft.publishedAt = f3.langs['zh-Hans'].draft.publishedAt
  f3.langs.en.draft.title = 'When is partner commission settled?'
  f3.langs.en.draft.shortAnswer = 'The settlement time depends on your active partner plan.'
  f3.langs.en.draft.detailHtml =
    '<p>Open Commission Management to review your active plan, calculation period, and estimated settlement time.</p><p>Each entry links to the contributing client and trade record.</p>'
  f3.langs.en.draft.keywords = 'rebate,commission,settlement,withdraw'
  f3.langs.en.draft.publishedContent = cloneJson({
    title: f3.langs.en.draft.title,
    shortAnswer: f3.langs.en.draft.shortAnswer,
    detailHtml: f3.langs.en.draft.detailHtml,
    keywords: f3.langs.en.draft.keywords
  })
  f3.langs.en.draft.publishedAt = f3.langs['zh-Hans'].draft.publishedAt

  const f4 = makeFaq()
  f4.id = 'FAQ-1004'
  f4.base.categoryId = 'CAT-1003'
  f4.base.channels = ['web', 'crm']
  f4.base.audience = ['agent', 'client']
  f4.base.relatedPages = ['mt5_account']
  f4.langs['zh-Hans'].draft.title = '订单、成交和持仓有什么区别？'
  f4.langs['zh-Hans'].draft.shortAnswer = '订单是交易指令，成交是执行结果，持仓是当前交易义务。'
  f4.langs['zh-Hans'].draft.detailHtml =
    '<p>在 MT5 中，订单、成交和持仓代表不同的数据。</p><p>一个订单可能产生多笔成交，持仓也可能被多笔成交共同影响。查询交易记录时，请先确认当前查看的数据类型。</p>'
  f4.langs['zh-Hans'].draft.keywords = '订单,成交,持仓,MT5'
  f4.langs['zh-Hant'].draft.title = '訂單、成交和持倉有什麼區別？'
  f4.langs['zh-Hant'].draft.shortAnswer = '訂單是交易指令，成交是執行結果，持倉是當前交易義務。'
  f4.langs['zh-Hant'].draft.detailHtml = '<p>在 MT5 中，訂單、成交和持倉代表不同的資料。</p>'
  f4.langs['zh-Hant'].draft.keywords = '訂單,成交,持倉,MT5'
  f4.langs.en.draft.title = 'What is the difference between orders, deals and positions?'
  f4.langs.en.draft.shortAnswer = 'An order is an instruction, a deal is an execution, and a position is the current exposure.'
  f4.langs.en.draft.detailHtml =
    '<p>In MT5, orders, deals, and positions are different records.</p><p>One order may result in multiple deals, and multiple deals may affect one position.</p>'
  f4.langs.en.draft.keywords = 'order,deal,position,MT5'

  const f5 = makeFaq()
  f5.id = 'FAQ-1005'
  f5.base.categoryId = 'CAT-2002'
  f5.base.channels = ['web', 'crm']
  f5.base.audience = ['client']
  f5.base.relatedPages = ['withdraw_apply', 'withdraw_record']
  f5.langs['zh-Hans'].draft.title = '出金申请多久能到账？'
  f5.langs['zh-Hans'].draft.shortAnswer = '到账时间取决于审核进度与通道处理，具体以订单状态为准。'
  f5.langs['zh-Hans'].draft.detailHtml =
    '<p>出金到账一般会经历“提交申请 → 审核 → 通道处理 → 到账”几个步骤。</p><ol><li>请先在「出金记录」中查看当前订单状态与提示信息。</li><li>若长时间停留在同一状态，请确认资料是否完整、是否需要补充验证。</li><li>如需协助，请准备订单号与相关截图联系支持。</li></ol><p>不同地区与收款方式的处理时效可能不同，请以页面展示为准。</p>'
  f5.langs['zh-Hans'].draft.keywords = '出金,到账,审核,订单状态'
  f5.langs['zh-Hant'].draft.title = '出金申請多久能到帳？'
  f5.langs['zh-Hant'].draft.shortAnswer = '到帳時間取決於審核進度與通道處理，請以訂單狀態為準。'
  f5.langs['zh-Hant'].draft.detailHtml =
    '<p>出金到帳通常會經歷「提交申請 → 審核 → 通道處理 → 到帳」等步驟。</p><ol><li>先在「出金記錄」查看訂單狀態與提示。</li><li>若長時間停留在同一狀態，請確認是否需要補充驗證或資料。</li><li>需要協助時，請準備訂單號與相關截圖聯絡支援。</li></ol><p>不同地區與收款方式的處理時效可能不同，請以頁面顯示為準。</p>'
  f5.langs['zh-Hant'].draft.keywords = '出金,到帳,審核,訂單狀態'
  f5.langs.en.draft.title = 'How long does a withdrawal take to arrive?'
  f5.langs.en.draft.shortAnswer = 'Timing depends on review progress and payment-channel processing; please follow the order status.'
  f5.langs.en.draft.detailHtml =
    '<p>A withdrawal typically goes through “Submission → Review → Channel processing → Arrival”.</p><ol><li>Check the status and notes in Withdrawal History.</li><li>If the status does not change for an extended time, confirm whether additional verification or information is required.</li><li>If you need help, prepare the order ID and screenshots and contact support.</li></ol><p>Processing time may vary by region and payout method. Please refer to on-screen status updates.</p>'
  f5.langs.en.draft.keywords = 'withdrawal,arrival,review,order status'
  publishAllLangs(f5)

  const f6 = makeFaq()
  f6.id = 'FAQ-1006'
  f6.base.categoryId = 'CAT-2002'
  f6.base.channels = ['web', 'crm']
  f6.base.audience = ['client']
  f6.base.relatedPages = ['withdraw_apply', 'withdraw_record']
  f6.langs['zh-Hans'].draft.title = '出金申请被拒绝如何处理？'
  f6.langs['zh-Hans'].draft.shortAnswer = '先查看拒绝原因与提示，按要求补充或修改信息后再提交。'
  f6.langs['zh-Hans'].draft.detailHtml =
    '<p>出金被拒绝通常会提示具体原因。建议按以下步骤处理：</p><ol><li>在「出金记录」打开该笔订单，查看拒绝原因与系统提示。</li><li>核对身份信息、收款信息是否与账户资料一致（如姓名、证件、收款方式等）。</li><li>如提示需补充材料，请按要求上传清晰、完整的资料后重新提交。</li><li>若原因不明确或反复被拒绝，请联系支持并提供订单号。</li></ol>'
  f6.langs['zh-Hans'].draft.keywords = '出金,被拒绝,原因,补充材料'
  f6.langs['zh-Hant'].draft.title = '出金申請被拒絕如何處理？'
  f6.langs['zh-Hant'].draft.shortAnswer = '先查看拒絕原因與提示，依要求補充或修改資訊後再提交。'
  f6.langs['zh-Hant'].draft.detailHtml =
    '<p>出金被拒絕通常會提示具體原因。建議依下列步驟處理：</p><ol><li>在「出金記錄」打開該筆訂單，查看拒絕原因與系統提示。</li><li>核對身分資訊、收款資訊是否與帳戶資料一致（如姓名、證件、收款方式等）。</li><li>如提示需補充材料，請按要求上傳清晰、完整的資料後重新提交。</li><li>若原因不明或反覆被拒，請聯絡支援並提供訂單號。</li></ol>'
  f6.langs['zh-Hant'].draft.keywords = '出金,被拒絕,原因,補充資料'
  f6.langs.en.draft.title = 'What should I do if my withdrawal is rejected?'
  f6.langs.en.draft.shortAnswer = 'Check the rejection reason and follow the instructions to update information or provide additional documents.'
  f6.langs.en.draft.detailHtml =
    '<p>A rejected withdrawal usually comes with a reason. Recommended steps:</p><ol><li>Open the order in Withdrawal History to review the rejection reason and notes.</li><li>Verify that identity and payout details match your account information (e.g., name, ID, payout method).</li><li>If additional documents are required, upload clear and complete materials and submit again.</li><li>If the reason is unclear or repeated, contact support with the order ID.</li></ol>'
  f6.langs.en.draft.keywords = 'withdrawal,rejected,reason,documents'
  publishAllLangs(f6)

  const f7 = makeFaq()
  f7.id = 'FAQ-1007'
  f7.base.categoryId = 'CAT-2003'
  f7.base.channels = ['web', 'crm']
  f7.base.audience = ['client']
  f7.base.relatedPages = ['internal_transfer']
  f7.langs['zh-Hans'].draft.title = 'MT账户之间如何内部转账？'
  f7.langs['zh-Hans'].draft.shortAnswer = '在「内部转账」中选择转出/转入账户并填写金额，提交后以状态结果为准。'
  f7.langs['zh-Hans'].draft.detailHtml =
    '<p>你可以通过平台的内部转账功能在不同 MT 账户之间划转资金：</p><ol><li>进入「出入金 / 内部转账」。</li><li>选择转出账户与转入账户，并填写转账金额。</li><li>确认信息无误后提交，随后在记录中查看处理状态。</li></ol><p>如转账失败，请查看失败原因提示（例如账户状态异常、信息不匹配等）。</p>'
  f7.langs['zh-Hans'].draft.keywords = '内部转账,MT账户,划转,记录'
  f7.langs['zh-Hant'].draft.title = 'MT 帳戶之間如何內部轉帳？'
  f7.langs['zh-Hant'].draft.shortAnswer = '在「內部轉帳」選擇轉出/轉入帳戶並填寫金額，提交後以狀態結果為準。'
  f7.langs['zh-Hant'].draft.detailHtml =
    '<p>你可透過平台的內部轉帳功能在不同 MT 帳戶之間劃轉資金：</p><ol><li>進入「出入金 / 內部轉帳」。</li><li>選擇轉出帳戶與轉入帳戶，並填寫轉帳金額。</li><li>確認資訊無誤後提交，並在記錄中查看處理狀態。</li></ol><p>如轉帳失敗，請查看失敗原因提示（例如帳戶狀態異常、資訊不匹配等）。</p>'
  f7.langs['zh-Hant'].draft.keywords = '內部轉帳,MT帳戶,劃轉,記錄'
  f7.langs.en.draft.title = 'How do I transfer funds between MT accounts internally?'
  f7.langs.en.draft.shortAnswer = 'Use Internal Transfer to select source/target accounts and enter the amount; follow the status result.'
  f7.langs.en.draft.detailHtml =
    '<p>You can move funds between MT accounts using Internal Transfer:</p><ol><li>Open Funding → Internal Transfer.</li><li>Select the source account and the target account, then enter the transfer amount.</li><li>Submit and check the processing status in the transfer record.</li></ol><p>If the transfer fails, review the on-screen failure reason (e.g., account status issue, information mismatch).</p>'
  f7.langs.en.draft.keywords = 'internal transfer,MT account,transfer,status'
  publishAllLangs(f7)

  const f8 = makeFaq()
  f8.id = 'FAQ-1008'
  f8.base.categoryId = 'CAT-2201'
  f8.base.channels = ['web', 'crm']
  f8.base.audience = ['client']
  f8.base.relatedPages = ['mt5_account']
  f8.langs['zh-Hans'].draft.title = '如何重置MT5交易密码？'
  f8.langs['zh-Hans'].draft.shortAnswer = '可在账户管理中发起重置，按安全校验完成后获取新密码或重置指引。'
  f8.langs['zh-Hans'].draft.detailHtml =
    '<p>重置交易密码通常需要进行安全校验：</p><ol><li>进入「MT5 账户」或「账户管理」页面，找到“重置交易密码/修改密码”。</li><li>按提示完成邮箱/手机等验证。</li><li>重置成功后，使用新密码登录 MT5 客户端并及时更新保存。</li></ol><p>若无法完成验证或多次失败，请联系支持处理。</p>'
  f8.langs['zh-Hans'].draft.keywords = 'MT5,交易密码,重置,验证'
  f8.langs['zh-Hant'].draft.title = '如何重置 MT5 交易密碼？'
  f8.langs['zh-Hant'].draft.shortAnswer = '可在帳戶管理中發起重置，完成安全校驗後取得新密碼或重置指引。'
  f8.langs['zh-Hant'].draft.detailHtml =
    '<p>重置交易密碼通常需要進行安全校驗：</p><ol><li>進入「MT5 帳戶」或「帳戶管理」頁面，找到「重置交易密碼/修改密碼」。</li><li>依提示完成信箱/手機等驗證。</li><li>重置成功後，使用新密碼登入 MT5 客戶端並及時更新保存。</li></ol><p>若無法完成驗證或多次失敗，請聯絡支援協助處理。</p>'
  f8.langs['zh-Hant'].draft.keywords = 'MT5,交易密碼,重置,驗證'
  f8.langs.en.draft.title = 'How do I reset my MT5 trading password?'
  f8.langs.en.draft.shortAnswer = 'Initiate a reset in Account Management and complete security verification to obtain the new password or reset instructions.'
  f8.langs.en.draft.detailHtml =
    '<p>Resetting a trading password typically requires security verification:</p><ol><li>Go to MT5 Account / Account Management and locate “Reset/Change Trading Password”.</li><li>Complete email/phone verification as prompted.</li><li>After success, log in to the MT5 client with the new password and store it securely.</li></ol><p>If verification cannot be completed or repeatedly fails, contact support.</p>'
  f8.langs.en.draft.keywords = 'MT5,trading password,reset,verification'
  publishAllLangs(f8)

  const f9 = makeFaq()
  f9.id = 'FAQ-1009'
  f9.base.categoryId = 'CAT-2201'
  f9.base.channels = ['web', 'crm']
  f9.base.audience = ['agent', 'client']
  f9.base.relatedPages = ['mt5_account']
  f9.langs['zh-Hans'].draft.title = '标准账户和美分账户的区别？'
  f9.langs['zh-Hans'].draft.shortAnswer = '主要区别在计价单位与余额显示方式；美分账户以 USC 计价，100 USC 等值 1 USD。'
  f9.langs['zh-Hans'].draft.detailHtml =
    '<p>标准账户与美分账户的核心差异在于计价单位与余额展示：</p><ul><li><b>标准账户：</b>通常以 USD 等标准货币单位展示余额。</li><li><b>美分账户：</b>以 USC 计价，100 USC 等值 1 USD，余额数值看起来更大。</li></ul><p>具体交易规则与可用产品以你的账户配置与平台说明为准。</p>'
  f9.langs['zh-Hans'].draft.keywords = '标准账户,美分账户,USC,区别'
  f9.langs['zh-Hant'].draft.title = '標準帳戶和美分帳戶的區別？'
  f9.langs['zh-Hant'].draft.shortAnswer = '主要差異在計價單位與餘額顯示；美分帳戶以 USC 計價，100 USC 等值 1 USD。'
  f9.langs['zh-Hant'].draft.detailHtml =
    '<p>標準帳戶與美分帳戶的核心差異在於計價單位與餘額展示：</p><ul><li><b>標準帳戶：</b>通常以 USD 等標準貨幣單位顯示餘額。</li><li><b>美分帳戶：</b>以 USC 計價，100 USC 等值 1 USD，餘額數值看起來更大。</li></ul><p>實際交易規則與可用產品以帳戶配置與平台說明為準。</p>'
  f9.langs['zh-Hant'].draft.keywords = '標準帳戶,美分帳戶,USC,區別'
  f9.langs.en.draft.title = 'What is the difference between a Standard account and a Cent account?'
  f9.langs.en.draft.shortAnswer = 'The key difference is the denomination and balance display; Cent accounts use USC where 100 USC equals 1 USD.'
  f9.langs.en.draft.detailHtml =
    '<p>The main difference is denomination and how balances are displayed:</p><ul><li><b>Standard account:</b> balance is typically shown in a standard currency unit such as USD.</li><li><b>Cent account:</b> denominated in USC; 100 USC equals 1 USD, so the numeric balance appears larger.</li></ul><p>Specific trading rules and available products depend on your account setup and platform guidelines.</p>'
  f9.langs.en.draft.keywords = 'standard account,cent account,USC,difference'
  publishAllLangs(f9)

  const f10 = makeFaq()
  f10.id = 'FAQ-1010'
  f10.base.categoryId = 'CAT-2301'
  f10.base.channels = ['web', 'crm']
  f10.base.audience = ['client']
  f10.base.relatedPages = ['kyc', 'identity_verification']
  f10.langs['zh-Hans'].draft.title = '实名认证未通过如何修改？'
  f10.langs['zh-Hans'].draft.shortAnswer = '根据拒绝原因补充或更换材料后重新提交，确保信息与证件一致。'
  f10.langs['zh-Hans'].draft.detailHtml =
    '<p>实名认证未通过时，系统一般会给出原因或提示。建议：</p><ol><li>进入「实名认证/身份认证」查看拒绝原因。</li><li>按提示更新证件照片、有效期或个人信息，确保与证件一致且清晰无遮挡。</li><li>重新提交后等待审核结果；如需补充材料按提示上传。</li></ol><p>若多次失败或原因不明确，请联系支持协助核查。</p>'
  f10.langs['zh-Hans'].draft.keywords = '实名认证,未通过,修改,身份认证'
  f10.langs['zh-Hant'].draft.title = '實名認證未通過如何修改？'
  f10.langs['zh-Hant'].draft.shortAnswer = '依拒絕原因補充或更換材料後重新提交，確保資訊與證件一致。'
  f10.langs['zh-Hant'].draft.detailHtml =
    '<p>實名認證未通過時，系統通常會提供原因或提示。建議：</p><ol><li>進入「實名認證/身分認證」查看拒絕原因。</li><li>依提示更新證件照片、有效期或個人資訊，確保與證件一致且清晰無遮擋。</li><li>重新提交後等待審核結果；如需補充材料，請按提示上傳。</li></ol><p>若多次失敗或原因不明，請聯絡支援協助核查。</p>'
  f10.langs['zh-Hant'].draft.keywords = '實名認證,未通過,修改,身分認證'
  f10.langs.en.draft.title = 'What should I do if my identity verification fails?'
  f10.langs.en.draft.shortAnswer = 'Review the rejection reason, update your information or documents, and resubmit with consistent details.'
  f10.langs.en.draft.detailHtml =
    '<p>If verification fails, the system typically provides a reason. Recommended actions:</p><ol><li>Open Identity Verification to review the rejection reason.</li><li>Update document photos/validity or personal details as instructed. Ensure they are clear and consistent with your ID.</li><li>Resubmit and wait for the review result; provide additional documents if requested.</li></ol><p>If it keeps failing or the reason is unclear, contact support for assistance.</p>'
  f10.langs.en.draft.keywords = 'KYC,verification failed,resubmit,documents'
  publishAllLangs(f10)

  const f11 = makeFaq()
  f11.id = 'FAQ-1011'
  f11.base.categoryId = 'CAT-2101'
  f11.base.channels = ['crm']
  f11.base.audience = ['agent']
  f11.base.relatedPages = ['commission_detail', 'commission_rules']
  f11.langs['zh-Hans'].draft.title = '代理佣金的计算依据是什么？'
  f11.langs['zh-Hans'].draft.shortAnswer = '以已生效的代理方案为准，通常与贡献客户、产品、交易量与有效性规则相关。'
  f11.langs['zh-Hans'].draft.detailHtml =
    '<p>佣金的计算依据以你当前生效的代理方案为准。你可以在 CRM 的「佣金管理」中查看：</p><ul><li>当前方案与计佣规则（按产品/客户/周期等维度）。</li><li>佣金明细对应的贡献客户与交易记录。</li><li>如存在无效交易、审核中记录或异常调整，会在明细中体现说明。</li></ul><p>如对某笔明细有疑问，建议在明细中定位到对应记录后联系支持。</p>'
  f11.langs['zh-Hans'].draft.keywords = '代理,佣金,计算依据,规则'
  f11.langs['zh-Hant'].draft.title = '代理佣金的計算依據是什麼？'
  f11.langs['zh-Hant'].draft.shortAnswer = '以已生效的代理方案為準，通常與貢獻客戶、產品、交易量與有效性規則相關。'
  f11.langs['zh-Hant'].draft.detailHtml =
    '<p>佣金的計算依據以你目前生效的代理方案為準。你可以在 CRM 的「佣金管理」查看：</p><ul><li>當前方案與計佣規則（按產品/客戶/週期等維度）。</li><li>佣金明細對應的貢獻客戶與交易記錄。</li><li>如存在無效交易、審核中記錄或異常調整，會在明細中呈現說明。</li></ul><p>如對某筆明細有疑問，建議先定位到對應記錄再聯絡支援。</p>'
  f11.langs['zh-Hant'].draft.keywords = '代理,佣金,計算依據,規則'
  f11.langs.en.draft.title = 'What is the basis for partner commission calculation?'
  f11.langs.en.draft.shortAnswer = 'It follows your active partner plan and is typically related to contributing clients, products, volume and validity rules.'
  f11.langs.en.draft.detailHtml =
    '<p>Commission calculation is based on your active partner plan. In CRM → Commission Management you can review:</p><ul><li>Your plan and calculation rules (by product/client/period).</li><li>Commission details linked to contributing clients and trade records.</li><li>Any invalid trades, pending reviews or adjustments shown with explanations in the details.</li></ul><p>If you have questions about a specific entry, locate the related record and contact support.</p>'
  f11.langs.en.draft.keywords = 'partner,commission,calculation,plan'
  publishAllLangs(f11)

  const f12 = makeFaq()
  f12.id = 'FAQ-1012'
  f12.base.categoryId = 'CAT-2102'
  f12.base.channels = ['crm']
  f12.base.audience = ['agent']
  f12.base.relatedPages = ['commission_settlement', 'commission_withdraw']
  f12.langs['zh-Hans'].draft.title = '佣金结算后为什么未到账？'
  f12.langs['zh-Hans'].draft.shortAnswer = '请先确认结算状态、收款/提现信息与是否存在审核或风控处理。'
  f12.langs['zh-Hans'].draft.detailHtml =
    '<p>如果显示已结算但未到账，建议依次排查：</p><ol><li>在「佣金结算」查看该笔记录的发放状态（如处理中、待确认等）。</li><li>确认收款/提现信息是否已完善且与账户资料一致。</li><li>若存在审核、风控或异常处理，相关提示通常会在明细中展示。</li><li>如仍无法定位原因，请提供结算单号联系支持。</li></ol>'
  f12.langs['zh-Hans'].draft.keywords = '佣金,结算,未到账,发放状态'
  f12.langs['zh-Hant'].draft.title = '佣金結算後為什麼未到帳？'
  f12.langs['zh-Hant'].draft.shortAnswer = '請先確認結算狀態、收款/提現資訊及是否存在審核或風控處理。'
  f12.langs['zh-Hant'].draft.detailHtml =
    '<p>若顯示已結算但未到帳，建議依序排查：</p><ol><li>在「佣金結算」查看該筆記錄的發放狀態（如處理中、待確認等）。</li><li>確認收款/提現資訊是否完善且與帳戶資料一致。</li><li>如存在審核、風控或異常處理，相關提示通常會在明細中顯示。</li><li>仍無法定位原因時，請提供結算單號聯絡支援。</li></ol>'
  f12.langs['zh-Hant'].draft.keywords = '佣金,結算,未到帳,發放狀態'
  f12.langs.en.draft.title = 'Why is my commission not received after settlement?'
  f12.langs.en.draft.shortAnswer = 'Check the payout status, payout/withdrawal details, and whether any review or risk handling is in progress.'
  f12.langs.en.draft.detailHtml =
    '<p>If it shows settled but not received, check the following:</p><ol><li>In Commission Settlement, review the payout status (e.g., processing, pending confirmation).</li><li>Confirm payout/withdrawal details are completed and match your account information.</li><li>If there is any review, risk control or exception handling, notes are typically shown in the details.</li><li>If still unclear, contact support with the settlement reference.</li></ol>'
  f12.langs.en.draft.keywords = 'commission,settlement,not received,payout status'
  publishAllLangs(f12)

  const f13 = makeFaq()
  f13.id = 'FAQ-1013'
  f13.base.categoryId = 'CAT-2401'
  f13.base.channels = ['crm']
  f13.base.audience = ['agent']
  f13.base.relatedPages = ['agent_invite', 'agent_clients']
  f13.langs['zh-Hans'].draft.title = '代理如何邀请直客注册？'
  f13.langs['zh-Hans'].draft.shortAnswer = '在 CRM 获取专属开户链接或邀请码，发送给客户注册即可自动绑定归属。'
  f13.langs['zh-Hans'].draft.detailHtml =
    '<p>邀请直客通常通过专属链接或邀请码完成：</p><ol><li>进入「代理管理 / 邀请客户」获取你的专属链接或邀请码。</li><li>将链接发送给客户，由客户完成注册与必要的身份信息填写。</li><li>注册成功后，客户将按系统规则绑定到你的名下（以页面展示为准）。</li></ol><p>建议妥善保管邀请信息，避免在不安全的公共渠道传播。</p>'
  f13.langs['zh-Hans'].draft.keywords = '代理,邀请,直客注册,邀请码'
  f13.langs['zh-Hant'].draft.title = '代理如何邀請直客註冊？'
  f13.langs['zh-Hant'].draft.shortAnswer = '在 CRM 取得專屬邀請連結或邀請碼，發給客戶註冊即可自動綁定歸屬。'
  f13.langs['zh-Hant'].draft.detailHtml =
    '<p>邀請直客通常透過專屬連結或邀請碼完成：</p><ol><li>進入「代理管理 / 邀請客戶」取得你的專屬連結或邀請碼。</li><li>將連結發給客戶，由客戶完成註冊與必要的身分資訊填寫。</li><li>註冊成功後，客戶將依系統規則綁定到你名下（以頁面顯示為準）。</li></ol><p>建議妥善保管邀請資訊，避免在不安全的公開管道傳播。</p>'
  f13.langs['zh-Hant'].draft.keywords = '代理,邀請,直客註冊,邀請碼'
  f13.langs.en.draft.title = 'How can a partner invite a client to register?'
  f13.langs.en.draft.shortAnswer = 'Get your referral link or code in CRM and share it with the client to register and be attributed automatically.'
  f13.langs.en.draft.detailHtml =
    '<p>Client invitation is usually done via a referral link or code:</p><ol><li>Go to Partner Management → Invite Client to get your referral link/code.</li><li>Share it with the client to complete registration and required information.</li><li>After registration, the client will be attributed to you according to on-screen rules.</li></ol><p>Please keep referral information secure and avoid sharing it in unsafe public channels.</p>'
  f13.langs.en.draft.keywords = 'partner,invite,client registration,referral'
  publishAllLangs(f13)

  const f14 = makeFaq()
  f14.id = 'FAQ-1014'
  f14.base.categoryId = 'CAT-2401'
  f14.base.channels = ['crm']
  f14.base.audience = ['agent']
  f14.base.relatedPages = ['agent_team', 'agent_reports']
  f14.langs['zh-Hans'].draft.title = '代理可以查看哪些下级数据？'
  f14.langs['zh-Hans'].draft.shortAnswer = '可查看范围取决于你的代理层级与权限配置，系统会按权限展示可见项。'
  f14.langs['zh-Hans'].draft.detailHtml =
    '<p>下级数据的可见范围由你的代理层级与权限决定。常见可见内容包括：</p><ul><li>下级账号列表与基础信息（按权限脱敏展示）。</li><li>下级客户/账户的汇总数据与报表。</li><li>与你的佣金相关的贡献汇总与明细。</li></ul><p>若你认为权限异常或缺少某些入口，请联系运营管理员或支持协助确认。</p>'
  f14.langs['zh-Hans'].draft.keywords = '代理,下级数据,权限,报表'
  f14.langs['zh-Hant'].draft.title = '代理可以查看哪些下級資料？'
  f14.langs['zh-Hant'].draft.shortAnswer = '可查看範圍取決於你的代理層級與權限設定，系統會依權限顯示可見項。'
  f14.langs['zh-Hant'].draft.detailHtml =
    '<p>下級資料的可見範圍由你的代理層級與權限決定。常見可見內容包括：</p><ul><li>下級帳號列表與基礎資訊（依權限脫敏顯示）。</li><li>下級客戶/帳戶的彙總數據與報表。</li><li>與你的佣金相關的貢獻彙總與明細。</li></ul><p>若你認為權限異常或缺少入口，請聯絡營運管理員或支援協助確認。</p>'
  f14.langs['zh-Hant'].draft.keywords = '代理,下級資料,權限,報表'
  f14.langs.en.draft.title = 'What downline data can a partner view?'
  f14.langs.en.draft.shortAnswer = 'Visibility depends on your partner level and permission settings; the system shows only permitted items.'
  f14.langs.en.draft.detailHtml =
    '<p>Downline visibility is determined by your partner level and permissions. Common items include:</p><ul><li>Downline account list and basic information (masked when required).</li><li>Aggregated statistics and reports for downline clients/accounts.</li><li>Contribution summaries and details related to your commission.</li></ul><p>If you believe access is incorrect or missing, contact the operations admin or support to confirm.</p>'
  f14.langs.en.draft.keywords = 'partner,downline,permission,report'
  publishAllLangs(f14)

  const demoEvents = [
    { type: 'view', time: nowTs() - 86400000 * 2, faqId: 'FAQ-1001', channel: 'web', lang: 'zh-Hans' },
    { type: 'view', time: nowTs() - 86400000 * 2, faqId: 'FAQ-1001', channel: 'web', lang: 'zh-Hans' },
    { type: 'helpful', time: nowTs() - 86400000 * 2, faqId: 'FAQ-1001', channel: 'web', lang: 'zh-Hans' },
    { type: 'view', time: nowTs() - 86400000, faqId: 'FAQ-1002', channel: 'web', lang: 'zh-Hans' },
    { type: 'not_solved', time: nowTs() - 86400000, faqId: 'FAQ-1002', channel: 'web', lang: 'zh-Hans' },
    { type: 'search', time: nowTs() - 86400000, channel: 'web', lang: 'zh-Hans', term: '入金未到账' },
    { type: 'no_result', time: nowTs() - 86400000, channel: 'web', lang: 'zh-Hans', term: '怎么解绑银行卡' },
    { type: 'view', time: nowTs() - 3600000, faqId: 'FAQ-1005', channel: 'crm', lang: 'zh-Hans' },
    { type: 'view', time: nowTs() - 3600000, faqId: 'FAQ-1006', channel: 'crm', lang: 'zh-Hans' }
  ]
  return {
    categories,
    faqs: [f1, f2, f3, f4, f5, f6, f7, f8, f9, f10, f11, f12, f13, f14],
    feedback: { views: {}, helpful: {}, notSolved: {}, searches: {}, noResultTerms: {} },
    feedbackEvents: demoEvents,
    ui: { faqAdvancedOpen: false, overviewMoreOpen: false },
    operationLogs: []
  }
}

function normalizeCategoryShape(next) {
  const cats = Array.isArray(next.categories) ? next.categories : []
  const byId = new Map(cats.map((c) => [c?.id, c]).filter((x) => x[0]))
  for (const c of cats) {
    if (!c || typeof c !== 'object') continue
    if (!('parentId' in c)) c.parentId = null
    if (!c.parentId) c.parentId = null
    if (c.parentId && !byId.has(c.parentId)) c.parentId = null
    if (typeof c.enabled !== 'boolean') c.enabled = true
    if (!c.createdAt) c.createdAt = nowTs()
    if (!c.name || typeof c.name !== 'object') c.name = { 'zh-Hans': '', 'zh-Hant': '', en: '' }
    if (typeof c.name['zh-Hans'] !== 'string') c.name['zh-Hans'] = ''
    if (typeof c.name['zh-Hant'] !== 'string') c.name['zh-Hant'] = c.name['zh-Hans']
    if (typeof c.name.en !== 'string') c.name.en = c.name['zh-Hans']
    if (typeof c.remark !== 'string') c.remark = ''
  }
  next.categories = cats
}

function ensureTwoLevelCategoriesAndBinding(next) {
  normalizeCategoryShape(next)
  const cats = next.categories || []
  const byId = new Map(cats.map((c) => [c.id, c]))

  function allocateDefaultChildId(parent) {
    const m = String(parent.id || '').match(/^CAT-(\d+)$/)
    const base = m ? m[1] : String(parent.id || '').replaceAll(/[^0-9]/g, '') || '9999'
    for (let i = 1; i <= 99; i += 1) {
      const candidate = `CAT-${base}${String(i).padStart(2, '0')}`
      const existed = byId.get(candidate)
      if (!existed) return candidate
      if (existed.parentId === parent.id) return candidate
    }
    return `CAT-${base}99`
  }

  function getOrCreateDefaultChild(parent) {
    const id = allocateDefaultChildId(parent)
    const existed = byId.get(id)
    if (existed && existed.parentId === parent.id) return existed
    const child = {
      id,
      parentId: parent.id,
      enabled: true,
      createdAt: nowTs(),
      remark: '默认二级分类',
      name: {
        'zh-Hans': `${parent.name?.['zh-Hans'] || ''} - 默认`,
        'zh-Hant': `${parent.name?.['zh-Hant'] || parent.name?.['zh-Hans'] || ''} - 默認`,
        en: `${parent.name?.en || parent.name?.['zh-Hans'] || ''} - Default`
      }
    }
    cats.push(child)
    byId.set(child.id, child)
    return child
  }

  for (const f of next.faqs || []) {
    const cid = f?.base?.categoryId
    if (!cid) continue
    const cat = byId.get(cid)
    if (!cat) continue
    if (!cat.parentId) {
      const child = getOrCreateDefaultChild(cat)
      f.base.categoryId = child.id
    }
  }

  next.categories = cats
}

function normalizeLoadedState(parsed) {
  const next = parsed && typeof parsed === 'object' ? parsed : defaultState()
  if (!next.feedback) next.feedback = { views: {}, helpful: {}, notSolved: {}, searches: {}, noResultTerms: {} }
  if (!next.feedbackEvents) next.feedbackEvents = []
  if (!next.operationLogs) next.operationLogs = []
  if (!next.categories) next.categories = defaultState().categories
  if (!next.faqs) next.faqs = defaultState().faqs
  if (!next.ui || typeof next.ui !== 'object') next.ui = { faqAdvancedOpen: false, overviewMoreOpen: false }
  if (typeof next.ui.faqAdvancedOpen !== 'boolean') next.ui.faqAdvancedOpen = false
  if (typeof next.ui.overviewMoreOpen !== 'boolean') next.ui.overviewMoreOpen = false

  next.faqs = (next.faqs || []).map((f) => {
    const faq = f && typeof f === 'object' ? f : makeFaq()
    if (!faq.base) faq.base = {}
    if (!faq.base.categoryId) faq.base.categoryId = ''
    if (!Array.isArray(faq.base.channels)) faq.base.channels = ['web', 'crm']
    faq.base.audience = migrateAudienceValue(faq.base.audience)
    const sv = Number(faq.base.sortValue)
    faq.base.sortValue = Number.isFinite(sv) ? Math.max(0, Math.floor(sv)) : 0

    if (!faq.activeLang) faq.activeLang = 'zh-Hans'
    if (!faq.langs) faq.langs = {}
    for (const l of ['zh-Hans', 'zh-Hant', 'en']) {
      if (!faq.langs[l]) faq.langs[l] = { draft: makeLangDraft() }
      if (!faq.langs[l].draft) faq.langs[l].draft = makeLangDraft()
      const d = faq.langs[l].draft
      if (typeof d.title !== 'string') d.title = ''
      if (typeof d.shortAnswer !== 'string') d.shortAnswer = ''
      if (typeof d.detailHtml !== 'string') d.detailHtml = ''
      if (typeof d.keywords !== 'string') d.keywords = ''
      if (typeof d.seoTitle !== 'string') d.seoTitle = ''
      if (typeof d.seoDesc !== 'string') d.seoDesc = ''
      if (typeof d.images !== 'string') d.images = ''
      if (typeof d.attachments !== 'string') d.attachments = ''
      if (typeof d.version !== 'number') d.version = 1
      if (!d.updatedAt) d.updatedAt = nowTs()
      if (!d.lastEditor) d.lastEditor = '运营管理员'
      if (typeof d.autoGenerated !== 'boolean') d.autoGenerated = false
      if (typeof d.manualEdited !== 'boolean') d.manualEdited = false
      if (typeof d.needsUpdate !== 'boolean') d.needsUpdate = false
      if (typeof d.unpublished !== 'boolean') d.unpublished = false
    }
    if (!faq.history) faq.history = { 'zh-Hans': [], 'zh-Hant': [], en: [] }
    for (const l of ['zh-Hans', 'zh-Hant', 'en']) {
      if (!Array.isArray(faq.history?.[l])) faq.history[l] = []
    }
    return faq
  })

  ensureTwoLevelCategoriesAndBinding(next)
  return next
}

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return defaultState()
    const parsed = JSON.parse(raw)
    if (!parsed || typeof parsed !== 'object') return defaultState()
    return normalizeLoadedState(parsed)
  } catch (e) {
    return defaultState()
  }
}

const state = reactive(loadState())

watch(
  state,
  () => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cloneJson(state)))
    } catch (e) {}
  },
  { deep: true }
)

const operationLogs = computed(() => state.operationLogs || [])

function pushOperationLog(action, faqId, lang) {
  state.operationLogs = state.operationLogs || []
  state.operationLogs.unshift({
    time: nowTs(),
    operator: '运营管理员',
    action,
    faqId: faqId || '-',
    lang: lang || null
  })
}

const categoryTab = ref('level1')

const level1Categories = computed(() => (state.categories || []).filter((c) => !c.parentId))
const level2Categories = computed(() => (state.categories || []).filter((c) => !!c.parentId))

function getCategoryById(id) {
  return (state.categories || []).find((x) => x.id === id) || null
}

function categoryLabelById(id) {
  const c = (state.categories || []).find((x) => x.id === id)
  return c ? c.name['zh-Hans'] : '-'
}

function categoryPathLabelById(id) {
  const c = getCategoryById(id)
  if (!c) return '-'
  if (!c.parentId) return c.name?.['zh-Hans'] || '-'
  const p = getCategoryById(c.parentId)
  const parentLabel = p?.name?.['zh-Hans'] || '-'
  const childLabel = c.name?.['zh-Hans'] || '-'
  return `${parentLabel} / ${childLabel}`
}

const categoryOptionsForFilter = computed(() =>
  (state.categories || []).map((c) => {
    const label = c.parentId ? categoryPathLabelById(c.id) : c.name?.['zh-Hans'] || '-'
    return {
      id: c.id,
      label: c.enabled ? label : `${label}（已停用）`
    }
  })
)

const level1CategoryRows = computed(() => level1Categories.value.slice().sort((a, b) => a.createdAt - b.createdAt))

const level2CategoryRows = computed(() => {
  const byParent = new Map()
  for (const c of level2Categories.value) {
    if (!byParent.has(c.parentId)) byParent.set(c.parentId, [])
    byParent.get(c.parentId).push(c)
  }
  const ordered = []
  for (const p of level1CategoryRows.value) {
    const children = (byParent.get(p.id) || []).slice().sort((a, b) => a.createdAt - b.createdAt)
    ordered.push(...children)
  }
  return ordered
})

const categoryOptions = computed(() => {
  const parentEnabledMap = new Map(level1Categories.value.map((c) => [c.id, !!c.enabled]))
  return level2Categories.value
    .filter((c) => c.enabled && parentEnabledMap.get(c.parentId))
    .map((c) => ({ id: c.id, label: categoryPathLabelById(c.id) }))
})

const categoryOptionsForEdit = computed(() => {
  const enabled = categoryOptions.value
  const currentId = faqForm?.base?.categoryId
  if (!currentId) return enabled
  const current = getCategoryById(currentId)
  if (!current) return enabled
  if (current.enabled && current.parentId && getCategoryById(current.parentId)?.enabled) return enabled
  const existed = enabled.some((x) => x.id === currentId)
  if (existed) return enabled
  return [{ id: current.id, label: `${categoryPathLabelById(current.id)}（已停用）`, disabled: true }, ...enabled]
})

function getLevel1IdForCategoryId(id) {
  const c = getCategoryById(id)
  if (!c) return ''
  return c.parentId || c.id
}

function isLevel2CategoryId(id) {
  const c = getCategoryById(id)
  return !!(c && c.parentId)
}

const faqCategoryLevel1Id = ref('')

const categoryLevel1OptionsForEdit = computed(() => {
  const enabled = level1Categories.value.filter((c) => c.enabled).map((c) => ({ id: c.id, label: c.name?.['zh-Hans'] || '-' }))
  const currentId = faqCategoryLevel1Id.value
  if (!currentId) return enabled
  const current = getCategoryById(currentId)
  if (!current || current.enabled) return enabled
  const existed = enabled.some((x) => x.id === currentId)
  if (existed) return enabled
  return [{ id: current.id, label: `${current.name?.['zh-Hans'] || '-'}（已停用）`, disabled: true }, ...enabled]
})

const categoryLevel2OptionsForEdit = computed(() => {
  const parentId = faqCategoryLevel1Id.value
  const parent = parentId ? getCategoryById(parentId) : null
  const parentEnabled = !!parent?.enabled
  const children = level2Categories.value.filter((c) => c.parentId === parentId)
  const enabled = children
    .filter((c) => c.enabled && parentEnabled)
    .map((c) => ({ id: c.id, label: c.name?.['zh-Hans'] || '-' }))
  const currentId = faqForm?.base?.categoryId
  if (!currentId) return enabled
  const current = getCategoryById(currentId)
  if (!current) return enabled
  if (current.enabled && current.parentId === parentId && parentEnabled) return enabled
  const existed = enabled.some((x) => x.id === currentId)
  if (existed) return enabled
  if (current.parentId !== parentId) return enabled
  return [{ id: current.id, label: `${current.name?.['zh-Hans'] || '-'}（已停用）`, disabled: true }, ...enabled]
})

function faqCountByCategoryId(id) {
  return (state.faqs || []).filter((f) => f.base.categoryId === id).length
}

function faqCountByCategoryIdTotal(id) {
  const cats = state.categories || []
  const childIds = cats.filter((c) => c.parentId === id).map((c) => c.id)
  let total = faqCountByCategoryId(id)
  for (const cid of childIds) total += faqCountByCategoryId(cid)
  return total
}

function hasMeaningfulContent(d) {
  return !!(normalizeSpace(d?.title) && normalizeSpace(stripHtmlText(d?.detailHtml)))
}

function mergedStatusLabel(s) {
  const found = mergedStatusOptions.find((x) => x.value === s)
  return found ? found.label : '-'
}

function mergedStatusTagClass(s) {
  if (s === 'published') return 'bg-emerald-50 text-emerald-600 border-emerald-100'
  if (s === 'draft') return 'bg-orange-50 text-orange-600 border-orange-100'
  if (s === 'unpublished') return 'bg-gray-100 text-gray-600 border-gray-200'
  return 'bg-gray-50 text-gray-500 border-gray-200'
}

function isAllLangsPublished(faq) {
  return ['zh-Hans', 'zh-Hant', 'en'].every((lang) => {
    const d = faq?.langs?.[lang]?.draft
    return !!(d && d.publishedContent && !d.unpublished)
  })
}

function mergedPublishStatus(faq) {
  const allPublished = isAllLangsPublished(faq)
  const anyUnpublished = ['zh-Hans', 'zh-Hant', 'en'].some((lang) => !!faq?.langs?.[lang]?.draft?.unpublished)
  if (allPublished && anyUnpublished) return { status: 'unpublished' }
  if (allPublished) return { status: 'published' }
  return { status: 'draft' }
}

function canRowUnpublish(faq) {
  const s = mergedPublishStatus(faq).status
  return s === 'published'
}

function langStatus(faq, lang) {
  const d = faq?.langs?.[lang]?.draft
  if (!d) return 'empty'
  if (!hasMeaningfulContent(d)) return 'empty'
  if (d.unpublished) return 'unpublished'
  if (d.publishedContent) return 'published'
  return 'draft'
}

function getPublishedContent(faq, lang) {
  const d = faq?.langs?.[lang]?.draft
  if (!d || d.unpublished) return null
  if (!isAllLangsPublished(faq)) return null
  return d.publishedContent || null
}

const faqFilters = reactive({
  q: '',
  categoryId: '',
  status: '',
  channels: [],
  audience: '',
  updatedRange: []
})

const appliedFaqFilters = ref(cloneJson(faqFilters))

function applyFaqFilter() {
  appliedFaqFilters.value = cloneJson(faqFilters)
  faqPagination.page = 1
}

function resetFaqFilter() {
  faqFilters.q = ''
  faqFilters.categoryId = ''
  faqFilters.status = ''
  faqFilters.channels = []
  faqFilters.audience = ''
  faqFilters.updatedRange = []
  applyFaqFilter()
}

const faqPagination = reactive({
  page: 1,
  pageSize: 10
})

function matchUpdatedRange(ts, range) {
  if (!Array.isArray(range) || range.length !== 2) return true
  const [s, e] = range
  if (!s || !e) return true
  const start = new Date(`${s}T00:00:00`).getTime()
  const end = new Date(`${e}T23:59:59`).getTime()
  return ts >= start && ts <= end
}

function matchFaqCategory(faq, selectedId) {
  if (!selectedId) return true
  const cats = state.categories || []
  const selected = cats.find((c) => c.id === selectedId)
  if (!selected) return true
  const cur = cats.find((c) => c.id === faq?.base?.categoryId)
  if (!cur) return false
  if (!selected.parentId) return cur.id === selected.id || cur.parentId === selected.id
  return cur.id === selected.id
}

const filteredFaqs = computed(() => {
  const f = appliedFaqFilters.value
  const qTerm = normalizeSpace(f.q).toLowerCase()
  const rows = (state.faqs || []).filter((x) => {
    if (f.categoryId && !matchFaqCategory(x, f.categoryId)) return false
    if (f.audience && (!Array.isArray(x.base.audience) || !x.base.audience.includes(f.audience))) return false
    if (Array.isArray(f.channels) && f.channels.length) {
      for (const c of f.channels) if (!x.base.channels.includes(c)) return false
    }
    if (f.status) {
      if (mergedPublishStatus(x).status !== f.status) return false
    }
    if (qTerm) {
      const hay = [x.id, x.langs?.['zh-Hans']?.draft?.title, x.langs?.['zh-Hans']?.draft?.keywords].filter(Boolean).join(' ').toLowerCase()
      if (!hay.includes(qTerm)) return false
    }
    if (!matchUpdatedRange(x.updatedAt, f.updatedRange)) return false
    return true
  })
  return rows
    .slice()
    .sort(
      (a, b) =>
        (Number(a?.base?.sortValue || 0) - Number(b?.base?.sortValue || 0)) || (Number(b?.updatedAt || 0) - Number(a?.updatedAt || 0))
    )
})

const pagedFaqs = computed(() => {
  const start = (faqPagination.page - 1) * faqPagination.pageSize
  return filteredFaqs.value.slice(start, start + faqPagination.pageSize)
})

const faqDrawer = reactive({ open: false, title: '新增FAQ' })
const faqForm = reactive(makeFaq())

const currentLangDraft = computed(() => faqForm?.langs?.[faqForm.activeLang]?.draft || makeLangDraft())
const editorRef = ref(null)
const faqDrawerSnapshot = ref('')

function snapshotFaqDrawer() {
  try {
    faqDrawerSnapshot.value = JSON.stringify(cloneJson(faqForm))
  } catch (e) {
    faqDrawerSnapshot.value = ''
  }
}

function isFaqDrawerDirty() {
  if (!faqDrawerSnapshot.value) return false
  try {
    return JSON.stringify(cloneJson(faqForm)) !== faqDrawerSnapshot.value
  } catch (e) {
    return false
  }
}

async function onFaqDrawerBeforeClose(done) {
  if (!isFaqDrawerDirty()) return done()
  const ok = await ElMessageBox.confirm('当前页面存在未保存内容，确认关闭吗？', '未保存提醒', {
    confirmButtonText: '确认关闭',
    cancelButtonText: '继续编辑',
    type: 'warning'
  }).catch(() => false)
  if (ok === false) return
  done()
}

function requestCloseFaqDrawer() {
  onFaqDrawerBeforeClose(() => {
    faqDrawer.open = false
  })
}

function syncEditorFromDraft() {
  if (!editorRef.value) return
  editorRef.value.innerHTML = currentLangDraft.value?.detailHtml || ''
}

watch(
  () => [faqDrawer.open, faqForm.activeLang, faqForm.id],
  () => {
    if (!faqDrawer.open) return
    nextTick(() => syncEditorFromDraft())
  }
)

watch(
  () => [faqDrawer.open, faqCategoryLevel1Id.value],
  () => {
    if (!faqDrawer.open) return
    const current = getCategoryById(faqForm.base.categoryId)
    if (current && current.parentId === faqCategoryLevel1Id.value) return
    const first = categoryLevel2OptionsForEdit.value.find((x) => !x.disabled) || categoryLevel2OptionsForEdit.value[0]
    faqForm.base.categoryId = first?.id || ''
  }
)

function nextFaqId() {
  const ids = (state.faqs || []).map((x) => x.id).filter((x) => /^FAQ-\d+$/.test(x))
  const max = ids.reduce((m, id) => Math.max(m, Number(id.split('-')[1])), 1000)
  return `FAQ-${max + 1}`
}

function resetFaqFormTo(faq) {
  Object.assign(faqForm, makeFaq())
  Object.assign(faqForm, cloneJson(faq))
}

function openCreateFaq() {
  resetFaqFormTo(makeFaq())
  faqForm.base.categoryId = categoryOptions.value[0]?.id || ''
  faqCategoryLevel1Id.value = getLevel1IdForCategoryId(faqForm.base.categoryId)
  faqForm.activeLang = 'zh-Hans'
  faqDrawer.title = '新增FAQ'
  faqDrawer.open = true
  snapshotFaqDrawer()
  nextTick(() => syncEditorFromDraft())
}

function openEditFaq(row) {
  resetFaqFormTo(row)
  faqCategoryLevel1Id.value = getLevel1IdForCategoryId(faqForm.base.categoryId)
  faqDrawer.title = `编辑FAQ（${row.id}）`
  faqDrawer.open = true
  snapshotFaqDrawer()
  nextTick(() => syncEditorFromDraft())
}

function commitFaqFormToState() {
  const payload = cloneJson(faqForm)
  if (!payload.id) payload.id = nextFaqId()
  payload.updatedAt = nowTs()
  const idx = (state.faqs || []).findIndex((x) => x.id === payload.id)
  if (idx >= 0) state.faqs.splice(idx, 1, payload)
  else state.faqs.unshift(payload)
  faqForm.id = payload.id
  snapshotFaqDrawer()
  return payload.id
}

function stripHtmlText(html) {
  return String(html || '')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<[^>]*>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .trim()
}

function isLangContentChangedComparedToSnapshot() {
  if (!faqDrawerSnapshot.value) return true
  let prev = null
  try {
    prev = JSON.parse(faqDrawerSnapshot.value)
  } catch (e) {
    return true
  }
  for (const l of ['zh-Hans', 'zh-Hant', 'en']) {
    const p = prev?.langs?.[l]?.draft || {}
    const c = faqForm?.langs?.[l]?.draft || {}
    const pt = normalizeSpace(p.title)
    const ct = normalizeSpace(c.title)
    const ps = normalizeSpace(p.shortAnswer)
    const cs = normalizeSpace(c.shortAnswer)
    const pk = normalizeSpace(p.keywords)
    const ck = normalizeSpace(c.keywords)
    const ph = String(p.detailHtml || '').trim()
    const ch = String(c.detailHtml || '').trim()
    if (pt !== ct || ps !== cs || pk !== ck || ph !== ch) return true
  }
  return false
}

function hasLegacyNeedsUpdateFlag(faq) {
  return ['zh-Hans', 'zh-Hant', 'en'].some((l) => !!faq?.langs?.[l]?.draft?.needsUpdate)
}

function clearLegacyNeedsUpdateFlag(faq) {
  for (const l of ['zh-Hans', 'zh-Hant', 'en']) {
    const d = faq?.langs?.[l]?.draft
    if (d && 'needsUpdate' in d) d.needsUpdate = false
  }
}

function saveDraft() {
  const status = mergedPublishStatus(faqForm).status
  if (status === 'published') return ElMessage.warning('已发布内容仅支持“保存并发布”')
  if (!isLevel2CategoryId(faqForm.base.categoryId)) return ElMessage.warning('请选择二级分类')
  if (!Array.isArray(faqForm.base.audience) || faqForm.base.audience.length === 0) return ElMessage.warning('请至少选择一个可见人群')
  if (!isFaqDrawerDirty()) return ElMessage.info('无修改，无需保存')
  const sv = Number(faqForm.base.sortValue)
  faqForm.base.sortValue = Number.isFinite(sv) ? Math.max(0, Math.floor(sv)) : 0
  const d = currentLangDraft.value
  d.title = normalizeSpace(d.title)
  d.shortAnswer = normalizeSpace(d.shortAnswer)
  d.detailHtml = String(d.detailHtml || '').trim()
  d.keywords = normalizeSpace(d.keywords)
  d.updatedAt = nowTs()
  d.lastEditor = '运营管理员'
  const id = commitFaqFormToState()
  pushOperationLog(status === 'unpublished' ? '保存（已下架）' : '保存草稿', id, faqForm.activeLang)
  ElMessage.success(status === 'unpublished' ? '已保存（仍为已下架）' : '草稿已保存')
}

function buildPublishedSnapshot(d) {
  return cloneJson({
    title: d.title,
    shortAnswer: d.shortAnswer,
    detailHtml: d.detailHtml,
    keywords: d.keywords,
    seoTitle: d.seoTitle,
    seoDesc: d.seoDesc,
    images: d.images,
    attachments: d.attachments
  })
}

async function confirmPublishAllLangs() {
  const status = mergedPublishStatus(faqForm).status
  const hasLegacy = hasLegacyNeedsUpdateFlag(faqForm)
  if (!isLevel2CategoryId(faqForm.base.categoryId)) return ElMessage.warning('请选择二级分类')
  if (!faqForm.base.channels.length) return ElMessage.warning('请至少选择一个展示渠道')
  if (!Array.isArray(faqForm.base.audience) || faqForm.base.audience.length === 0) return ElMessage.warning('请至少选择一个可见人群')
  if (faqForm.base.channels.includes('web') && !faqForm.base.audience.includes('client')) return ElMessage.warning('官网内容必须对直客可见')
  const sv = Number(faqForm.base.sortValue)
  faqForm.base.sortValue = Number.isFinite(sv) ? Math.max(0, Math.floor(sv)) : 0

  const allCompleted = ['zh-Hans', 'zh-Hant', 'en'].every((l) => hasMeaningfulContent(faqForm.langs?.[l]?.draft))
  if (!allCompleted) return ElMessage.warning('三种语言的标题和正文需全部填写完整后才能发布')

  const title = normalizeSpace(faqForm.langs?.['zh-Hans']?.draft?.title) || '-'
  const channelLabel = (faqForm.base.channels || []).map((c) => (c === 'web' ? '官网' : 'CRM')).join('、') || '-'
  const content = `<div style="line-height:1.6">
    <div><b>FAQ 标题：</b>${title}</div>
    <div><b>发布语言：</b>简体中文、繁體中文、English（同时发布）</div>
    <div><b>展示渠道：</b>${channelLabel}</div>
    <div><b>可见人群：</b>${audienceLabel(faqForm.base.audience)}</div>
    <div><b>生效时间：</b>立即</div>
  </div>`
  const dialogTitle = status === 'published' ? '确认保存并发布' : status === 'unpublished' ? '确认重新发布' : '确认发布'
  const confirmText = status === 'published' ? '确认保存并发布' : status === 'unpublished' ? '确认重新发布' : '确认发布'
  const ok = await ElMessageBox.confirm(content, dialogTitle, {
    confirmButtonText: confirmText,
    cancelButtonText: '取消',
    type: 'warning',
    dangerouslyUseHTMLString: true
  }).catch(() => false)
  if (ok === false) return
  const time = nowTs()
  for (const l of ['zh-Hans', 'zh-Hant', 'en']) {
    const d = faqForm.langs?.[l]?.draft
    if (!d) continue
    d.publishedContent = buildPublishedSnapshot(d)
    d.publishedAt = time
    d.unpublished = false
    if ('needsUpdate' in d) d.needsUpdate = false
    faqForm.history[l] = faqForm.history[l] || []
    faqForm.history[l].unshift({ time, lang: l, version: d.version, status: 'published', operator: '运营管理员', content: cloneJson(d.publishedContent) })
  }
  if (hasLegacy) clearLegacyNeedsUpdateFlag(faqForm)
  const id = commitFaqFormToState()
  pushOperationLog('发布', id, null)
  ElMessage.success('发布成功')
}

function previewCurrentDraft() {
  previewDialog.open = true
  previewDialog.source = 'draft_form'
  previewDialog.title = '草稿预览'
  previewDialog.faqId = faqForm.id || '（未保存）'
  previewDialog.lang = faqForm.activeLang
  updateRowPreview()
}

function markCurrentLangEdited() {
  const d = currentLangDraft.value
  d.manualEdited = true
  if (d.autoGenerated) d.autoGenerated = false
}

function focusEditor() {
  if (!editorRef.value) return
  editorRef.value.focus()
}

function editorCommand(cmd, value) {
  focusEditor()
  try {
    if (value !== undefined) document.execCommand(cmd, false, value)
    else document.execCommand(cmd, false, null)
  } catch (e) {}
  onEditorInput()
}

async function insertLink() {
  focusEditor()
  const res = await ElMessageBox.prompt('请输入链接 URL', '插入链接', {
    confirmButtonText: '插入',
    cancelButtonText: '取消',
    inputPlaceholder: 'https://example.com'
  }).catch(() => null)
  if (!res) return
  const url = normalizeSpace(res.value)
  if (!url) return
  try {
    document.execCommand('createLink', false, url)
  } catch (e) {}
  onEditorInput()
}

async function insertImage() {
  focusEditor()
  const res = await ElMessageBox.prompt('请输入图片 URL', '插入图片', {
    confirmButtonText: '插入',
    cancelButtonText: '取消',
    inputPlaceholder: 'https://...'
  }).catch(() => null)
  if (!res) return
  const url = normalizeSpace(res.value)
  if (!url) return
  try {
    document.execCommand('insertImage', false, url)
  } catch (e) {}
  onEditorInput()
}

function insertTable() {
  focusEditor()
  const html =
    '<table style="width:100%;border-collapse:collapse" border="1"><tbody><tr><td>&nbsp;</td><td>&nbsp;</td></tr><tr><td>&nbsp;</td><td>&nbsp;</td></tr></tbody></table><p></p>'
  try {
    document.execCommand('insertHTML', false, html)
  } catch (e) {}
  onEditorInput()
}

function onEditorInput() {
  if (!editorRef.value) return
  const d = currentLangDraft.value
  d.detailHtml = editorRef.value.innerHTML
  markCurrentLangEdited()
}

function copyFaq(row) {
  const copied = cloneJson(row)
  copied.id = nextFaqId()
  copied.createdAt = nowTs()
  copied.updatedAt = nowTs()
  for (const l of ['zh-Hans', 'zh-Hant', 'en']) {
    copied.langs[l].draft.publishedContent = null
    copied.langs[l].draft.publishedAt = null
    copied.langs[l].draft.needsUpdate = false
    copied.langs[l].draft.unpublished = false
    copied.history[l] = []
  }
  state.faqs.unshift(copied)
  pushOperationLog('复制', copied.id, null)
  ElMessage.success(`已复制为 ${copied.id}`)
}

function openHistory(row) {
  const rows = []
  for (const l of ['zh-Hans', 'zh-Hant', 'en']) {
    const arr = row.history?.[l] || []
    for (const item of arr) rows.push({ ...item, faqId: row.id })
  }
  rows.sort((a, b) => b.time - a.time)
  historyDialog.faqId = row.id
  historyDialog.rows = rows
  historyDialog.open = true
}

const langActionDialog = reactive({ open: false, faqId: '' })

function handleRowMoreCommand(row, cmd) {
  if (cmd === 'copy') return copyFaq(row)
  if (cmd === 'history') return openHistory(row)
  if (cmd === 'unpublish') return openLangActionDialog(row)
}

function openLangActionDialog(row) {
  if (!canRowUnpublish(row)) return ElMessage.warning('当前FAQ未处于已发布状态')
  langActionDialog.open = true
  langActionDialog.faqId = row.id
}

async function confirmLangAction() {
  const row = (state.faqs || []).find((x) => x.id === langActionDialog.faqId)
  if (!row) return
  const idx = (state.faqs || []).findIndex((x) => x.id === row.id)
  if (idx < 0) return
  const faq = cloneJson(state.faqs[idx])
  const time = nowTs()
  for (const l of ['zh-Hans', 'zh-Hant', 'en']) {
    const d = faq?.langs?.[l]?.draft
    if (!d) continue
    if (d.publishedContent) {
      faq.history[l] = faq.history[l] || []
      faq.history[l].unshift({ time, lang: l, version: d.version, status: 'unpublished', operator: '运营管理员', content: cloneJson(d.publishedContent) })
    }
    d.unpublished = true
    d.needsUpdate = false
  }
  faq.updatedAt = time
  state.faqs.splice(idx, 1, faq)
  pushOperationLog('下架', faq.id, null)
  ElMessage.success('已下架')
  langActionDialog.open = false
}

const historyDialog = reactive({ open: false, faqId: '', rows: [] })

function openHistoryPreview(h) {
  if (!h?.content) return
  const faq = (state.faqs || []).find((x) => x.id === h.faqId)
  previewDialog.open = true
  previewDialog.source = 'history'
  previewDialog.title = `历史版本预览（${h.faqId} v${h.version}）`
  previewDialog.faqId = h.faqId
  previewDialog.lang = h.lang
  previewDialog.category = faq ? categoryLabelById(faq.base.categoryId) : '-'
  previewDialog.missing = ''
  previewDialog.content = cloneJson({ title: h.content.title || '-', detailHtml: h.content.detailHtml || '' })
}

async function loadHistoryToForm(h) {
  if (!h?.content) return
  const row = (state.faqs || []).find((x) => x.id === h.faqId)
  if (!row) return ElMessage.warning('FAQ不存在')

  if (faqDrawer.open && isFaqDrawerDirty()) {
    const ok = await ElMessageBox.confirm('当前页面存在未保存内容，确认放弃并载入历史版本吗？', '未保存提醒', {
      confirmButtonText: '放弃修改',
      cancelButtonText: '取消',
      type: 'warning'
    }).catch(() => false)
    if (ok === false) return
  }

  if (!faqDrawer.open || faqForm.id !== row.id) {
    openEditFaq(row)
  }

  const d = faqForm.langs?.[h.lang]?.draft
  if (!d) return
  d.title = h.content.title || ''
  d.shortAnswer = h.content.shortAnswer || ''
  d.detailHtml = h.content.detailHtml || ''
  d.keywords = h.content.keywords || ''
  d.seoTitle = h.content.seoTitle || ''
  d.seoDesc = h.content.seoDesc || ''
  d.images = h.content.images || ''
  d.attachments = h.content.attachments || ''
  d.autoGenerated = false
  d.manualEdited = true
  faqForm.activeLang = h.lang
  historyDialog.open = false
  nextTick(() => syncEditorFromDraft())
  ElMessage.success('已载入到编辑表单，尚未保存')
}

const previewDialog = reactive({ open: false, source: 'published', title: '预览', faqId: '', lang: 'zh-Hans', category: '', content: null, missing: '' })

function updateRowPreview() {
  if (previewDialog.source === 'history') return
  const faq = previewDialog.source === 'draft_form' ? faqForm : (state.faqs || []).find((x) => x.id === previewDialog.faqId)
  if (!faq) return
  previewDialog.category = categoryLabelById(faq.base.categoryId)
  if (previewDialog.source === 'draft' || previewDialog.source === 'draft_form') {
    const d = faq.langs?.[previewDialog.lang]?.draft
    if (!d || !hasMeaningfulContent(d)) {
      previewDialog.content = null
      previewDialog.missing = `此问题暂未提供 ${langLabel(previewDialog.lang)} 草稿内容。`
      return
    }
    previewDialog.missing = ''
    previewDialog.content = cloneJson({ title: d.title, detailHtml: d.detailHtml })
    return
  }

  const content = getPublishedContent(faq, previewDialog.lang)
  if (!content) {
    previewDialog.content = null
    previewDialog.missing = `此问题暂未提供 ${langLabel(previewDialog.lang)} 已发布版本。`
    return
  }
  previewDialog.missing = ''
  previewDialog.content = content
}

function openRowPreview(row) {
  previewDialog.open = true
  previewDialog.source = 'draft'
  previewDialog.title = '预览'
  previewDialog.faqId = row.id
  previewDialog.lang = 'zh-Hans'
  updateRowPreview()
}

const portalDialog = reactive({
  open: false,
  mode: 'web',
  lang: 'zh-Hans',
  identity: 'client',
  categoryId: 'all',
  search: ''
})

const crmCollapseActive = ref('')

const portalDetail = reactive({
  open: false,
  faqId: '',
  category: '',
  path: '',
  updatedText: '-',
  audienceText: '-',
  content: null,
  missing: ''
})

const portalHotTerms = ['入金未到账', '出金审核', '佣金结算', 'MT5账户']

const previewSessionFeedbackKeys = ref(new Set())
const portalDetailViewFaqId = ref('')
const portalDetailViewLangs = ref(new Set())
const crmCollapseViewFaqId = ref('')
const crmCollapseViewLangs = ref(new Set())

function previewChannel() {
  return portalDialog.mode === 'crm' ? 'crm' : 'web'
}

function resetPreviewSession() {
  previewSessionFeedbackKeys.value = new Set()
  portalDetailViewFaqId.value = ''
  portalDetailViewLangs.value = new Set()
  crmCollapseViewFaqId.value = ''
  crmCollapseViewLangs.value = new Set()
}

function isPreviewSessionFeedbackDone(faqId) {
  const id = String(faqId || '')
  if (!id) return false
  const key = `${id}:${previewChannel()}:${portalDialog.lang}`
  return previewSessionFeedbackKeys.value.has(key)
}

function recordViewOnceInCurrentOpenSession(faqId, lang, scope) {
  const id = String(faqId || '')
  if (!id) return
  const l = String(lang || '')
  if (!l) return
  if (scope === 'portal_detail') {
    if (portalDetailViewFaqId.value !== id) {
      portalDetailViewFaqId.value = id
      portalDetailViewLangs.value = new Set()
    }
    if (portalDetailViewLangs.value.has(l)) return
    portalDetailViewLangs.value.add(l)
    bumpStat('views', `${id}:${previewChannel()}:${l}`)
    return
  }
  if (scope === 'crm_collapse') {
    if (crmCollapseViewFaqId.value !== id) {
      crmCollapseViewFaqId.value = id
      crmCollapseViewLangs.value = new Set()
    }
    if (crmCollapseViewLangs.value.has(l)) return
    crmCollapseViewLangs.value.add(l)
    bumpStat('views', `${id}:crm:${l}`)
  }
}

function applyPortalHotTerm(t) {
  portalDialog.search = t
  onPortalSearch()
}

function persistPortalLang() {
  try {
    localStorage.setItem(PREVIEW_LANG_KEY, portalDialog.lang)
  } catch (e) {}
}

function categoryPathById(id) {
  const all = state.categories || []
  const cur = all.find((x) => x.id === id)
  if (!cur) return '-'
  if (!cur.parentId) return cur.name?.['zh-Hans'] || '-'
  const parent = all.find((x) => x.id === cur.parentId)
  const p = parent?.name?.['zh-Hans'] || ''
  const c = cur.name?.['zh-Hans'] || ''
  return [p, c].filter(Boolean).join(' / ') || '-'
}

function refreshPortalDetail() {
  if (!portalDetail.open || !portalDetail.faqId) return
  const faq = (state.faqs || []).find((x) => x.id === portalDetail.faqId)
  if (!faq) return
  portalDetail.category = categoryLabelById(faq.base.categoryId)
  portalDetail.path = categoryPathById(faq.base.categoryId)
  portalDetail.updatedText = formatDateTime(faq.updatedAt)
  portalDetail.audienceText = audienceLabel(faq.base.audience)
  const content = getPublishedContent(faq, portalDialog.lang)
  if (!content) {
    portalDetail.content = null
    portalDetail.missing = `此问题暂未提供 ${langLabel(portalDialog.lang)} 已发布版本。`
    return
  }
  portalDetail.missing = ''
  portalDetail.content = content
  recordViewOnceInCurrentOpenSession(portalDetail.faqId, portalDialog.lang, 'portal_detail')
}

watch(
  () => portalDialog.lang,
  () => {
    refreshPortalDetail()
  }
)

watch(
  () => [portalDialog.mode, portalDialog.lang, crmCollapseActive.value],
  ([mode, lang, active]) => {
    if (mode !== 'crm') return
    if (!active) {
      crmCollapseViewFaqId.value = ''
      crmCollapseViewLangs.value = new Set()
      return
    }
    const faq = (state.faqs || []).find((x) => x.id === active)
    if (!faq) return
    const content = getPublishedContent(faq, lang)
    if (!content) return
    recordViewOnceInCurrentOpenSession(active, lang, 'crm_collapse')
  }
)

function canIdentityView(audience, identity) {
  const arr = migrateAudienceValue(audience)
  return arr.includes(identity)
}

const portalList = computed(() => {
  const channel = portalDialog.mode === 'crm' ? 'crm' : 'web'
  const keyword = normalizeForSearch(portalDialog.lang, portalDialog.search)
  return (state.faqs || [])
    .filter((f) => {
      if (!f.base.channels.includes(channel)) return false
      if (!canIdentityView(f.base.audience, portalDialog.identity)) return false
      if (portalDialog.categoryId !== 'all' && !matchFaqCategory(f, portalDialog.categoryId)) return false
      const content = getPublishedContent(f, portalDialog.lang)
      if (!content) return false
      if (keyword) {
        const hay = normalizeForSearch(portalDialog.lang, `${content.title} ${content.shortAnswer} ${content.detailHtml} ${content.keywords}`)
        if (!hay.includes(keyword)) return false
      }
      return true
    })
    .slice()
    .sort(
      (a, b) =>
        (Number(a?.base?.sortValue || 0) - Number(b?.base?.sortValue || 0)) || (Number(b?.updatedAt || 0) - Number(a?.updatedAt || 0))
    )
    .map((f) => {
      const content = getPublishedContent(f, portalDialog.lang)
      return {
        id: f.id,
        categoryId: f.base.categoryId,
        title: content?.title || '-',
        shortAnswer: content?.shortAnswer || '',
        category: categoryLabelById(f.base.categoryId),
        updatedText: formatDateTime(f.updatedAt),
        audienceText: audienceLabel(f.base.audience),
        faq: f
      }
    })
})

const portalCategoryButtons = computed(() => {
  const channel = portalDialog.mode === 'crm' ? 'crm' : 'web'
  const map = new Map()
  for (const f of state.faqs || []) {
    if (!f.base.channels.includes(channel)) continue
    if (!canIdentityView(f.base.audience, portalDialog.identity)) continue
    const content = getPublishedContent(f, portalDialog.lang)
    if (!content) continue
    map.set(f.base.categoryId, (map.get(f.base.categoryId) || 0) + 1)
  }
  return [...map.entries()]
    .map(([id, count]) => ({ id, count, label: categoryLabelById(id) }))
    .sort((a, b) => b.count - a.count)
})

const portalCategoryCountMap = computed(() => {
  const map = new Map()
  for (const c of portalCategoryButtons.value) map.set(c.id, c.count)
  return map
})

const portalCategoryTree = computed(() => {
  const all = (state.categories || []).filter((c) => c.enabled)
  const parents = all.filter((c) => !c.parentId)
  const childrenByParent = new Map()
  for (const c of all) {
    if (!c.parentId) continue
    if (!childrenByParent.has(c.parentId)) childrenByParent.set(c.parentId, [])
    childrenByParent.get(c.parentId).push(c)
  }
  const nodes = []
  for (const p of parents) {
    const children = (childrenByParent.get(p.id) || []).map((x) => ({
      id: x.id,
      label: x.name?.['zh-Hans'] || '-',
      count: portalCategoryCountMap.value.get(x.id) || 0
    }))
    const selfCount = portalCategoryCountMap.value.get(p.id) || 0
    const childCount = children.reduce((s, x) => s + x.count, 0)
    const total = selfCount + childCount
    if (total <= 0) continue
    nodes.push({
      id: p.id,
      label: p.name?.['zh-Hans'] || '-',
      count: total,
      children: children.filter((x) => x.count > 0)
    })
  }
  nodes.sort((a, b) => b.count - a.count)
  return nodes
})

const webLocationText = computed(() => {
  if (portalDialog.categoryId === 'all') return '帮助中心 / 全部问题'
  return `帮助中心 / ${categoryPathById(portalDialog.categoryId)}`
})

const webCurrentCategoryTitle = computed(() => {
  if (portalDialog.categoryId === 'all') return '全部问题'
  return categoryLabelById(portalDialog.categoryId)
})

const portalAllAvailableFaqs = computed(() => {
  const channel = portalDialog.mode === 'crm' ? 'crm' : 'web'
  return (state.faqs || [])
    .filter((f) => {
      if (!f.base.channels.includes(channel)) return false
      if (!canIdentityView(f.base.audience, portalDialog.identity)) return false
      const content = getPublishedContent(f, portalDialog.lang)
      if (!content) return false
      return true
    })
    .slice()
    .sort(
      (a, b) =>
        (Number(a?.base?.sortValue || 0) - Number(b?.base?.sortValue || 0)) || (Number(b?.updatedAt || 0) - Number(a?.updatedAt || 0))
    )
    .map((f) => {
      const content = getPublishedContent(f, portalDialog.lang)
      return {
        id: f.id,
        categoryId: f.base.categoryId,
        title: content?.title || '-',
        shortAnswer: content?.shortAnswer || '',
        category: categoryLabelById(f.base.categoryId),
        updatedText: formatDateTime(f.updatedAt),
        audienceText: audienceLabel(f.base.audience),
        faq: f
      }
    })
})

const portalHotFaqs = computed(() => {
  const channel = portalDialog.mode === 'crm' ? 'crm' : 'web'
  const list = portalAllAvailableFaqs.value || []
  const viewCountMap = new Map()
  for (const e of state.feedbackEvents || []) {
    if (e?.type !== 'view') continue
    if (e?.channel !== channel) continue
    if (e?.lang !== portalDialog.lang) continue
    const id = String(e?.faqId || '')
    if (!id) continue
    viewCountMap.set(id, (viewCountMap.get(id) || 0) + 1)
  }
  const withCount = list.map((x, idx) => ({
    ...x,
    __idx: idx,
    __views: Number(viewCountMap.get(x.id) || 0)
  }))
  const viewed = withCount.filter((x) => x.__views > 0).sort((a, b) => b.__views - a.__views || a.__idx - b.__idx)
  const zero = withCount.filter((x) => x.__views <= 0).sort((a, b) => a.__idx - b.__idx)
  const out = viewed.slice(0, 3)
  if (out.length < 3) out.push(...zero.slice(0, 3 - out.length))
  return out.map(({ __idx, __views, ...rest }) => rest)
})

const crmQuickCategories = computed(() => {
  const idOrder = ['CAT-1001', 'CAT-1002', 'CAT-1003', 'CAT-1004', 'CAT-1005']
  const iconMap = {
    'CAT-1001': 'fa-solid fa-money-bill-transfer',
    'CAT-1002': 'fa-solid fa-hand-holding-dollar',
    'CAT-1003': 'fa-solid fa-chart-line',
    'CAT-1004': 'fa-solid fa-users',
    'CAT-1005': 'fa-solid fa-sitemap'
  }
  const all = state.categories || []
  return idOrder
    .map((id) => {
      const c = all.find((x) => x.id === id)
      if (!c || !c.enabled) return null
      const children = all.filter((x) => x.parentId === id && x.enabled)
      const selfCount = portalCategoryCountMap.value.get(id) || 0
      const childCount = children.reduce((s, x) => s + (portalCategoryCountMap.value.get(x.id) || 0), 0)
      const total = selfCount + childCount
      if (total <= 0) return null
      return { id, label: c.name?.['zh-Hans'] || '-', count: total, icon: iconMap[id] || 'fa-solid fa-circle-question' }
    })
    .filter(Boolean)
})

function bumpStat(map, key) {
  if (!state.feedback) state.feedback = { views: {}, helpful: {}, notSolved: {}, searches: {}, noResultTerms: {} }
  state.feedback[map] = state.feedback[map] || {}
  state.feedback[map][key] = Number(state.feedback[map][key] || 0) + 1
  state.feedbackEvents = state.feedbackEvents || []
  const time = nowTs()
  if (map === 'searches') {
    const parts = String(key || '').split(':')
    const channel = parts[0] || ''
    const lang = parts[1] || ''
    state.feedbackEvents.unshift({ type: 'search', time, channel, lang, term: normalizeSpace(portalDialog.search).slice(0, 60) })
    return
  }
  const parts = String(key || '').split(':')
  const faqId = parts[0] || ''
  const channel = parts[1] || ''
  const lang = parts[2] || ''
  const type = map === 'views' ? 'view' : map === 'helpful' ? 'helpful' : map === 'notSolved' ? 'not_solved' : map
  state.feedbackEvents.unshift({ type, time, faqId, channel, lang })
}

function openPortalDetail(faq) {
  portalDetail.open = true
  portalDetail.faqId = faq.id
  portalDetail.category = categoryLabelById(faq.base.categoryId)
  portalDetail.path = categoryPathById(faq.base.categoryId)
  portalDetail.updatedText = formatDateTime(faq.updatedAt)
  portalDetail.audienceText = audienceLabel(faq.base.audience)
  portalDetailViewFaqId.value = faq.id
  portalDetailViewLangs.value = new Set()
  const content = getPublishedContent(faq, portalDialog.lang)
  if (!content) {
    portalDetail.content = null
    portalDetail.missing = `此问题暂未提供 ${langLabel(portalDialog.lang)} 已发布版本。`
    return
  }
  portalDetail.missing = ''
  portalDetail.content = content
  recordViewOnceInCurrentOpenSession(faq.id, portalDialog.lang, 'portal_detail')
}

function closePortalDetail() {
  portalDetail.open = false
  portalDetail.faqId = ''
  portalDetail.category = ''
  portalDetail.path = ''
  portalDetail.updatedText = ''
  portalDetail.audienceText = ''
  portalDetail.missing = ''
  portalDetail.content = null
  portalDetailViewFaqId.value = ''
  portalDetailViewLangs.value = new Set()
}

function submitFeedback(helpful, faqId) {
  const id = String(faqId || '')
  if (!id) return
  const key = `${id}:${previewChannel()}:${portalDialog.lang}`
  if (previewSessionFeedbackKeys.value.has(key)) return ElMessage.info('已反馈')
  bumpStat(helpful ? 'helpful' : 'notSolved', key)
  previewSessionFeedbackKeys.value.add(key)
  ElMessage.success('已反馈')
}

function contactSupport() {
  ElMessage.success('已为你打开联系客服入口（演示）')
}

function countPortalSearchMatchesIgnoringCategory(term) {
  const keyword = normalizeForSearch(portalDialog.lang, term)
  if (!keyword) return 0
  const channel = previewChannel()
  let count = 0
  for (const f of state.faqs || []) {
    if (!f?.base?.channels?.includes(channel)) continue
    if (!canIdentityView(f.base.audience, portalDialog.identity)) continue
    const content = getPublishedContent(f, portalDialog.lang)
    if (!content) continue
    const hay = normalizeForSearch(portalDialog.lang, `${content.title} ${content.shortAnswer} ${content.detailHtml} ${content.keywords}`)
    if (!hay.includes(keyword)) continue
    count += 1
  }
  return count
}

function onPortalSearch() {
  const term = normalizeSpace(portalDialog.search).slice(0, 60)
  if (!term) return
  bumpStat('searches', `${previewChannel()}:${portalDialog.lang}`)
  const matches = countPortalSearchMatchesIgnoringCategory(term)
  if (matches === 0) {
    const scope = `${previewChannel()}:${portalDialog.lang}`
    state.feedback.noResultTerms = state.feedback.noResultTerms || {}
    state.feedback.noResultTerms[scope] = state.feedback.noResultTerms[scope] || {}
    state.feedback.noResultTerms[scope][term] = Number(state.feedback.noResultTerms[scope][term] || 0) + 1
    state.feedbackEvents = state.feedbackEvents || []
    state.feedbackEvents.unshift({
      type: 'no_result',
      time: nowTs(),
      channel: previewChannel(),
      lang: portalDialog.lang,
      term
    })
  }
}

function openWebPreview() {
  resetPreviewSession()
  portalDialog.open = true
  portalDialog.mode = 'web'
  portalDialog.identity = 'client'
  portalDialog.categoryId = 'all'
  portalDialog.search = ''
  portalDetail.open = false
  crmCollapseActive.value = ''
  const saved = localStorage.getItem(PREVIEW_LANG_KEY)
  if (saved === 'zh-Hans' || saved === 'zh-Hant' || saved === 'en') portalDialog.lang = saved
}

function openCrmPreview() {
  resetPreviewSession()
  portalDialog.open = true
  portalDialog.mode = 'crm'
  portalDialog.identity = 'agent'
  portalDialog.categoryId = 'all'
  portalDialog.search = ''
  portalDetail.open = false
  crmCollapseActive.value = ''
  const saved = localStorage.getItem(PREVIEW_LANG_KEY)
  if (saved === 'zh-Hans' || saved === 'zh-Hant' || saved === 'en') portalDialog.lang = saved
}

const draggedCategoryId = ref(null)

function onCategoryDragStart(c) {
  draggedCategoryId.value = c.id
}

function onCategoryDrop(target) {
  const fromId = draggedCategoryId.value
  draggedCategoryId.value = null
  if (!fromId || fromId === target.id) return
  const list = (state.categories || []).slice()
  const fromIdx = list.findIndex((x) => x.id === fromId)
  const toIdx = list.findIndex((x) => x.id === target.id)
  if (fromIdx < 0 || toIdx < 0) return
  const moving = list[fromIdx]
  if ((moving.parentId || null) !== (target.parentId || null)) {
    return ElMessage.warning('仅支持在同级分类内拖动排序（演示）')
  }
  list.splice(fromIdx, 1)
  list.splice(toIdx, 0, moving)
  state.categories = list
  ElMessage.success('已调整排序（演示）')
}

const categoryDialog = reactive({ open: false, title: '新增一级分类', mode: 'create', level: 'level1' })
const categoryForm = reactive({ id: '', parentId: null, enabled: true, name: '', remark: '' })

const parentCategoryOptionsForLevel2 = computed(() => {
  const enabled = level1Categories.value.filter((c) => c.enabled).map((c) => ({ id: c.id, label: c.name?.['zh-Hans'] || '-' }))
  const currentId = categoryForm.parentId
  if (!currentId) return enabled
  const current = getCategoryById(currentId)
  if (!current || current.enabled) return enabled
  const existed = enabled.some((x) => x.id === currentId)
  if (existed) return enabled
  return [{ id: current.id, label: `${current.name?.['zh-Hans'] || '-'}（已停用）`, disabled: true }, ...enabled]
})

function nextCategoryId() {
  const nums = (state.categories || [])
    .map((c) => String(c.id || '').match(/CAT-(\d+)/)?.[1])
    .filter(Boolean)
    .map((x) => Number(x))
  const max = nums.reduce((m, n) => Math.max(m, n), 1000)
  return `CAT-${max + 1}`
}

function openCreateCategory(level) {
  categoryDialog.open = true
  categoryDialog.mode = 'create'
  categoryDialog.level = level === 'level2' ? 'level2' : 'level1'
  categoryDialog.title = categoryDialog.level === 'level1' ? '新增一级分类' : '新增二级分类'
  categoryForm.id = nextCategoryId()
  categoryForm.enabled = true
  categoryForm.name = ''
  categoryForm.remark = ''
  categoryForm.parentId = categoryDialog.level === 'level2' ? parentCategoryOptionsForLevel2.value[0]?.id || null : null
}

function openEditCategory(level, c) {
  categoryDialog.open = true
  categoryDialog.mode = 'edit'
  categoryDialog.level = level === 'level2' ? 'level2' : 'level1'
  categoryDialog.title = categoryDialog.level === 'level1' ? `编辑一级分类（${c.id}）` : `编辑二级分类（${c.id}）`
  categoryForm.id = c.id
  categoryForm.parentId = c.parentId || null
  categoryForm.enabled = !!c.enabled
  categoryForm.name = c.name?.['zh-Hans'] || ''
  categoryForm.remark = c.remark || ''
}

function validateCategoryForm() {
  if (!normalizeSpace(categoryForm.name)) return '请输入名称'
  if (categoryDialog.level === 'level2') {
    if (!categoryForm.parentId) return '请选择一级分类'
    const parent = getCategoryById(categoryForm.parentId)
    if (!parent) return '一级分类不存在'
    if (!parent.enabled) return '请选择已启用的一级分类'
  }
  return null
}

function saveCategory() {
  const err = validateCategoryForm()
  if (err) return ElMessage.warning(err)
  const id = categoryForm.id || nextCategoryId()
  const existed = getCategoryById(id)
  const nameHans = normalizeSpace(categoryForm.name)
  const payload = {
    id,
    parentId: categoryDialog.level === 'level2' ? categoryForm.parentId || null : null,
    enabled: !!categoryForm.enabled,
    createdAt: existed?.createdAt || nowTs(),
    remark: normalizeSpace(categoryForm.remark),
    name: {
      'zh-Hans': nameHans,
      'zh-Hant': existed?.name?.['zh-Hant'] || nameHans,
      en: existed?.name?.en || nameHans
    }
  }
  if (categoryDialog.mode === 'create') {
    if (existed) return ElMessage.warning('分类编号已存在')
    state.categories.push(payload)
    pushOperationLog(categoryDialog.level === 'level1' ? '新增一级分类' : '新增二级分类', payload.id, null)
    ElMessage.success('已新增')
  } else {
    const idx = (state.categories || []).findIndex((x) => x.id === id)
    if (idx < 0) return ElMessage.warning('分类不存在')
    state.categories.splice(idx, 1, payload)
    pushOperationLog(categoryDialog.level === 'level1' ? '编辑一级分类' : '编辑二级分类', payload.id, null)
    ElMessage.success('已保存')
  }
  categoryDialog.open = false
}

async function toggleCategoryStatus(c) {
  if (c.enabled) {
    const ok = await ElMessageBox.confirm(`确认停用分类 ${c.name['zh-Hans']} 吗？停用后该分类不可在新增或编辑FAQ时被选择。`, '确认停用', {
      confirmButtonText: '停用',
      cancelButtonText: '取消',
      type: 'warning'
    }).catch(() => false)
    if (ok === false) return
    c.enabled = false
    pushOperationLog('停用分类', c.id, null)
    ElMessage.success('已停用')
    return
  }
  c.enabled = true
  pushOperationLog('启用分类', c.id, null)
  ElMessage.success('已启用')
}

async function attemptDeleteCategory(c) {
  const count = faqCountByCategoryIdTotal(c.id)
  if (count > 0) return ElMessage.warning('该分类下已存在FAQ，请先迁移内容后再删除')
  const ok = await ElMessageBox.confirm(`确认删除分类 ${c.name['zh-Hans']} 吗？`, '确认删除', {
    confirmButtonText: '删除',
    cancelButtonText: '取消',
    type: 'warning'
  }).catch(() => false)
  if (ok === false) return
  state.categories = (state.categories || []).filter((x) => x.id !== c.id && x.parentId !== c.id)
  pushOperationLog('删除分类', c.id, null)
  ElMessage.success('已删除')
}

const statsFilters = reactive({ dateRange: [], channel: '', lang: '' })
const noResultTermKeyword = ref('')
const overviewMoreTab = ref('lang')

function formatYmd(d) {
  const dt = new Date(d)
  const y = dt.getFullYear()
  const m = String(dt.getMonth() + 1).padStart(2, '0')
  const day = String(dt.getDate()).padStart(2, '0')
  return `${y}-${m}-${day}`
}

function setStatsDateRangePreset(days) {
  const end = new Date()
  end.setHours(0, 0, 0, 0)
  const start = new Date(end.getTime() - (Number(days || 0) - 1) * 86400000)
  statsFilters.dateRange = [formatYmd(start), formatYmd(end)]
}

function setStatsDateRangeAll() {
  statsFilters.dateRange = []
}

function resetStatsFilters() {
  setStatsDateRangePreset(30)
  statsFilters.channel = ''
  statsFilters.lang = ''
  noResultTermKeyword.value = ''
}

resetStatsFilters()

const filteredFeedbackEvents = computed(() => {
  const list = state.feedbackEvents || []
  const range = Array.isArray(statsFilters.dateRange) ? statsFilters.dateRange : []
  const start = range?.[0] ? new Date(`${range[0]}T00:00:00+08:00`).getTime() : null
  const end = range?.[1] ? new Date(`${range[1]}T23:59:59+08:00`).getTime() : null
  return list.filter((e) => {
    if (!e || typeof e !== 'object') return false
    if (statsFilters.channel && e.channel !== statsFilters.channel) return false
    if (statsFilters.lang && e.lang !== statsFilters.lang) return false
    if (start && Number(e.time || 0) < start) return false
    if (end && Number(e.time || 0) > end) return false
    return true
  })
})

const statsSummary = computed(() => {
  const list = filteredFeedbackEvents.value
  const views = list.filter((e) => e.type === 'view').length
  const helpful = list.filter((e) => e.type === 'helpful').length
  const notSolved = list.filter((e) => e.type === 'not_solved').length
  const denom = helpful + notSolved
  const share = denom ? `${((notSolved / denom) * 100).toFixed(1)}%` : '—'
  return { views, helpful, notSolved, notSolvedShare: share }
})

const statsByLangRows = computed(() => {
  const rows = []
  for (const l of ['zh-Hans', 'zh-Hant', 'en']) {
    const list = filteredFeedbackEvents.value.filter((e) => e.lang === l)
    const views = list.filter((e) => e.type === 'view').length
    const helpful = list.filter((e) => e.type === 'helpful').length
    const notSolved = list.filter((e) => e.type === 'not_solved').length
    const noResult = list.filter((e) => e.type === 'no_result').length
    rows.push({ lang: l, views, helpful, notSolved, noResult })
  }
  return rows
})

const statsByLangRowsDisplay = computed(() => statsByLangRows.value.filter((r) => r.views || r.helpful || r.notSolved || r.noResult))

const optimizeFaqRows = computed(() => {
  const map = new Map()
  for (const e of filteredFeedbackEvents.value) {
    if (!e.faqId) continue
    if (!map.has(e.faqId)) map.set(e.faqId, { faqId: e.faqId, helpful: 0, notSolved: 0 })
    if (e.type === 'helpful') map.get(e.faqId).helpful += 1
    if (e.type === 'not_solved') map.get(e.faqId).notSolved += 1
  }
  const preferredLang = statsFilters.lang
  const rows = []
  for (const v of map.values()) {
    if (v.notSolved <= 0) continue
    const faq = (state.faqs || []).find((x) => x.id === v.faqId)
    const title =
      (preferredLang && faq?.langs?.[preferredLang]?.draft?.title) ||
      faq?.langs?.['zh-Hans']?.draft?.title ||
      faq?.langs?.['zh-Hant']?.draft?.title ||
      faq?.langs?.en?.draft?.title ||
      '-'
    const total = v.helpful + v.notSolved
    const shareNum = total ? v.notSolved / total : 0
    rows.push({
      faqId: v.faqId,
      title,
      total,
      notSolved: v.notSolved,
      shareNum,
      share: total ? `${(shareNum * 100).toFixed(1)}%` : '—',
      faq
    })
  }
  return rows.sort((a, b) => b.notSolved - a.notSolved || b.shareNum - a.shareNum).slice(0, 5)
})

const statsByCategoryRows = computed(() => {
  const map = new Map()
  const list = filteredFeedbackEvents.value.filter((e) => e.faqId)
  for (const e of list) {
    const faq = (state.faqs || []).find((x) => x.id === e.faqId)
    if (!faq) continue
    const cat = faq.base.categoryId
    if (!map.has(cat)) map.set(cat, { categoryId: cat, views: 0, helpful: 0, notSolved: 0 })
    if (e.type === 'view') map.get(cat).views += 1
    if (e.type === 'helpful') map.get(cat).helpful += 1
    if (e.type === 'not_solved') map.get(cat).notSolved += 1
  }
  return [...map.values()].sort((a, b) => b.views - a.views)
})

const noResultTermsRows = computed(() => {
  const map = new Map()
  for (const e of filteredFeedbackEvents.value) {
    if (e.type !== 'no_result') continue
    const term = normalizeSpace(e.term)
    if (!term) continue
    map.set(term, (map.get(term) || 0) + 1)
  }
  return [...map.entries()]
    .map(([term, count]) => ({ term, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 200)
})

const noResultTermsRowsDisplay = computed(() => {
  const kw = normalizeSpace(noResultTermKeyword.value)
  const list = kw ? noResultTermsRows.value.filter((x) => x.term.includes(kw)) : noResultTermsRows.value
  return list.slice(0, 10)
})

function toggleFaqAdvanced() {
  if (!state.ui || typeof state.ui !== 'object') state.ui = { faqAdvancedOpen: false, overviewMoreOpen: false }
  state.ui.faqAdvancedOpen = !state.ui.faqAdvancedOpen
}

function handleTopPreviewCommand(cmd) {
  if (cmd === 'web') return openWebPreview()
  if (cmd === 'crm') return openCrmPreview()
}

async function handleTopMoreCommand(cmd) {
  if (cmd === 'restore') return confirmRestoreDemoData()
}

async function confirmRestoreDemoData() {
  const ok = await ElMessageBox.confirm('将恢复内置示例数据，并覆盖当前本地修改，确认继续吗？', '恢复示例数据', {
    confirmButtonText: '确认恢复',
    cancelButtonText: '取消',
    type: 'warning'
  }).catch(() => false)
  if (ok === false) return
  restoreDemoData()
}

function restoreDemoData() {
  const d = defaultState()
  state.categories = d.categories
  state.faqs = d.faqs
  state.feedback = d.feedback
  state.feedbackEvents = d.feedbackEvents
  state.ui = d.ui
  state.operationLogs = d.operationLogs
  ElMessage.success('已恢复示例数据')
}
</script>
