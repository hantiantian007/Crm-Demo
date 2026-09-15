<template>
  <div class="flex h-full bg-mainBg overflow-hidden">
    <div class="flex-1 flex flex-col min-w-0 bg-gray-50 overflow-hidden p-4 custom-scrollbar overflow-y-auto">
      <div class="flex-1 p-6 overflow-y-auto">
 <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
  <div class="flex justify-end gap-2 mb-6">
   <button class="px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-600 rounded text-xs font-medium transition-colors flex items-center" type="button" @click="openPagePrd">
    <i class="fas fa-file-alt mr-1.5">
    </i>
    查看页面PRD
   </button>
   <router-link class="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded text-xs font-medium transition-colors flex items-center" to="/kanban">
    <i class="fas fa-arrow-left mr-1.5">
    </i>
    返回需求看板
   </router-link>
  </div>
  <div class="w-full mx-auto pt-2">
   <div class="grid grid-cols-[120px_minmax(0,1fr)] gap-x-8 gap-y-5 items-center">
    <label class="field-label text-sm font-medium text-right">
     真实姓名：
    </label>
    <input class="field-input text-sm" readonly="" type="text" value="test-艳霞"/>
    <label class="field-label text-sm font-medium text-right">
     邮箱：
    </label>
    <input class="field-input text-sm" readonly="" type="text" value="15749654364@qq.com"/>
    <label class="field-label text-sm font-medium text-right">
     手机：
    </label>
    <input class="field-input text-sm" readonly="" type="text" value="15749654364"/>
    <label class="field-label text-sm font-medium text-right change-highlight">
     账户类型：
    </label>
    <div>
     <select class="field-input text-sm pr-10 change-highlight change-border">
      <option selected="">
       标准账户
      </option>
      <option>
       美分账户
      </option>
     </select>
    </div>
    <label class="field-label text-sm font-medium text-right change-highlight">
     账号类型：
    </label>
    <div>
     <input class="field-input text-sm change-highlight change-border" readonly="" type="text" value="交易账号"/>
     <button class="inline-block mt-2 text-xs text-blue-500 hover:text-blue-600 hover:underline" type="button" @click="claimDialogVisible = true">
      客户自主领取号
     </button>
    </div>
   </div>
   <div class="mt-7 pl-[152px] flex items-center gap-3">
    <button class="inline-flex items-center justify-center rounded bg-[#C4A373] px-6 py-2 text-sm font-medium text-white shadow-sm hover:bg-[#b28f5d] transition-colors">
     提交
    </button>
    <button class="inline-flex items-center justify-center rounded border border-gray-300 bg-white px-6 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors" type="button" @click="goBack">
     返回
    </button>
   </div>
   <el-dialog v-model="claimDialogVisible" title="客户自主领取号" width="520px">
    <div class="text-sm text-gray-600 leading-6">
     当前为演示页面。实际流程中，客户可在客户端自助领取 MT 交易账号。
    </div>
    <template #footer>
     <button class="h-9 px-4 rounded bg-primary hover:bg-primaryHover text-white text-sm font-medium transition-colors" type="button" @click="claimDialogVisible = false">
      知道了
     </button>
    </template>
   </el-dialog>
  </div>
 </div>
</div>

    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { openPrd } from '@/store/prd'

const router = useRouter()

const claimDialogVisible = ref(false)

const openPagePrd = () => {
  openPrd('prd-account-mt-open.html', '申请MT账户 - PRD')
}

const goBack = () => {
  router.push('/crm/account')
}
</script>
