<template>
  <div class="min-h-full bg-gray-50 p-4">
    <div class="space-y-4">
      <section class="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
        <h2 class="mb-5 text-sm font-semibold text-gray-700">搜索</h2>

        <form class="flex flex-wrap items-center gap-x-5 gap-y-3" @submit.prevent="handleSearch">
          <label class="flex items-center gap-2 text-sm text-gray-600">
            <span class="w-[62px] shrink-0">代理名称:</span>
            <input
              v-model.trim="searchForm.agentName"
              class="h-9 w-[240px] rounded-md border border-gray-200 bg-white px-3 text-sm text-gray-700 outline-none transition focus:border-primaryBtn focus:ring-2 focus:ring-primaryBtn/10"
              placeholder="请输入"
              type="text"
            />
          </label>

          <label class="flex items-center gap-2 text-sm text-gray-600">
            <span class="w-[54px] shrink-0">代理邮箱:</span>
            <input
              v-model.trim="searchForm.agentEmail"
              class="h-9 w-[240px] rounded-md border border-gray-200 bg-white px-3 text-sm text-gray-700 outline-none transition focus:border-primaryBtn focus:ring-2 focus:ring-primaryBtn/10"
              placeholder="请输入"
              type="text"
            />
          </label>

          <button
            class="inline-flex h-9 items-center justify-center rounded-md bg-primaryBtn px-5 text-sm font-medium text-white shadow-sm transition hover:bg-primaryBtnHover focus:outline-none focus:ring-2 focus:ring-primaryBtn/20"
            type="submit"
          >
            搜索
          </button>
        </form>
      </section>

      <section class="overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm">
        <div class="px-6 pb-1 pt-6">
          <button
            class="inline-flex h-9 items-center gap-2 rounded-md bg-primaryBtn px-4 text-sm font-medium text-white shadow-sm transition hover:bg-primaryBtnHover focus:outline-none focus:ring-2 focus:ring-primaryBtn/20"
            type="button"
            @click="handleAdd"
          >
            <i class="fa-solid fa-circle-plus text-xs" aria-hidden="true"></i>
            添加
          </button>
        </div>

        <div class="overflow-x-auto px-5">
          <table class="w-full min-w-[900px] table-fixed text-sm">
            <colgroup>
              <col class="w-[12%]" />
              <col class="w-[12%]" />
              <col class="w-[28%]" />
              <col class="w-[16%]" />
              <col class="w-[16%]" />
              <col class="w-[16%]" />
            </colgroup>
            <thead>
              <tr>
                <th class="text-left">用户序号</th>
                <th class="text-left">代理名称</th>
                <th class="text-left">代理邮箱</th>
                <th class="text-left">下级代理层数</th>
                <th class="text-left">下级代理数</th>
                <th class="text-left">操作</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="row in filteredRows" :key="row.userId" class="transition-colors hover:bg-gray-50/70">
                <td>{{ row.userId }}</td>
                <td>{{ row.agentName }}</td>
                <td class="break-words">{{ row.agentEmail }}</td>
                <td>{{ row.downlineLevels }}</td>
                <td>{{ row.downlineCount }}</td>
                <td>
                  <button
                    class="inline-flex h-8 items-center justify-center rounded-md bg-primaryBtn px-3 text-xs font-medium text-white transition hover:bg-primaryBtnHover focus:outline-none focus:ring-2 focus:ring-primaryBtn/20"
                    type="button"
                    @click="handleDetail(row)"
                  >
                    查看详情
                  </button>
                </td>
              </tr>
            </tbody>
          </table>

          <div v-if="filteredRows.length === 0" class="py-12 text-center text-sm text-gray-400">
            暂无符合条件的记录
          </div>
        </div>

        <footer class="grid grid-cols-1 items-center gap-3 border-t border-gray-100 px-6 py-4 text-xs text-gray-500 md:grid-cols-3">
          <div class="flex items-center gap-4 font-medium">
            <span>15条 / 页</span>
            <span>{{ filteredRows.length }}条记录，第{{ filteredRows.length ? '1/1' : '0/0' }}页</span>
          </div>

          <nav class="flex items-center justify-center gap-3" aria-label="分页">
            <button
              class="flex h-8 w-8 items-center justify-center rounded-full text-gray-400 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:hover:bg-transparent"
              type="button"
              aria-label="上一页"
              disabled
            >
              <i class="fa-solid fa-chevron-left text-[10px]" aria-hidden="true"></i>
            </button>
            <button class="flex h-8 w-8 items-center justify-center rounded-full bg-primaryBtn text-sm font-medium text-white" type="button" aria-current="page" disabled>
              1
            </button>
            <button
              class="flex h-8 w-8 items-center justify-center rounded-full text-gray-400 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:hover:bg-transparent"
              type="button"
              aria-label="下一页"
              disabled
            >
              <i class="fa-solid fa-chevron-right text-[10px]" aria-hidden="true"></i>
            </button>
          </nav>

          <div aria-hidden="true"></div>
        </footer>
      </section>
    </div>
  </div>
</template>

<script setup>
import { computed, reactive, ref } from 'vue'
import { ElMessage } from 'element-plus'

const demoRows = [
  { userId: 146, agentName: '华安', agentEmail: 'mkt@huaantaichang.com', downlineLevels: 8, downlineCount: 350 },
  { userId: 126, agentName: 'LBLY', agentEmail: 'LBLY2177@qq.com', downlineLevels: 1, downlineCount: 0 },
  { userId: 22, agentName: 'company', agentEmail: 'Hatc-hk@hatcgroup.com', downlineLevels: 1, downlineCount: 0 },
  { userId: 19, agentName: 'luketsai', agentEmail: 'luketsai@yahoo.com', downlineLevels: 2, downlineCount: 2 },
  { userId: 1, agentName: 'Inland', agentEmail: 'Inland@hatcgroup.com', downlineLevels: 3, downlineCount: 6 },
]

const searchForm = reactive({ agentName: '', agentEmail: '' })
const activeSearch = ref({ agentName: '', agentEmail: '' })

const filteredRows = computed(() => {
  const name = activeSearch.value.agentName.toLocaleLowerCase()
  const email = activeSearch.value.agentEmail.toLocaleLowerCase()

  return demoRows.filter((row) => (
    row.agentName.toLocaleLowerCase().includes(name)
    && row.agentEmail.toLocaleLowerCase().includes(email)
  ))
})

function handleSearch() {
  activeSearch.value = { ...searchForm }
}

function handleAdd() {
  ElMessage.info('添加功能暂未开放')
}

function handleDetail(row) {
  ElMessage.info(`代理 ${row.agentName} 的详情暂未开放`)
}
</script>
