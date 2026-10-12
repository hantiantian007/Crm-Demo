<template>
  <div class="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-10">
    <div class="w-full max-w-[520px] bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
      <div class="px-6 py-6 border-b border-gray-100">
        <div class="flex items-start gap-3">
          <div class="w-10 h-10 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600">
            <i class="fa-solid fa-check"></i>
          </div>
          <div class="min-w-0">
            <div class="text-base font-bold text-gray-800">密码修改成功</div>
            <div class="mt-1 text-xs text-gray-500 leading-relaxed">
              新密码已生效。其他设备上的登录状态已失效，请使用新密码重新登录。
            </div>
          </div>
        </div>
      </div>

      <div class="p-6 space-y-4">
        <div class="text-xs text-gray-500">
          当前账号：<span class="font-medium text-gray-800">{{ user?.name || '—' }}</span>
          <span class="ml-2 font-mono text-[11px] text-gray-400">{{ user?.email || '' }}</span>
        </div>

        <div class="flex items-center gap-3">
          <button type="button" class="flex-1 h-11 rounded-lg bg-primaryBtn hover:bg-primaryBtnHover text-white text-sm font-semibold transition-colors" @click="enterCrm">
            进入 CRM
          </button>
          <button type="button" class="h-11 px-4 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 text-gray-700 text-sm font-medium transition-colors" @click="backToLogin">
            返回登录
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { clearSessionUser, getSessionUser } from '@/store/passwordSecurityDemo'

const router = useRouter()
const user = computed(() => getSessionUser())

const enterCrm = () => {
  const identity = user.value?.biz_identity
  if (identity === 'agent') router.replace('/agent-home')
  else if (identity === 'direct') router.replace('/direct-home')
  else router.replace('/home')
}

const backToLogin = () => {
  clearSessionUser()
  router.replace('/login')
}
</script>

