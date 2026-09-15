<template>
  <div class="flex flex-col min-w-0 w-full">
    <div class="flex-1 min-w-0 overflow-y-auto custom-scrollbar">
      <div class="space-y-4">
        <section class="bg-white rounded-xl border border-gray-200 p-5">
          <div class="flex items-center gap-4">
            <div class="w-14 h-14 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center overflow-hidden">
              <i class="fa-solid fa-user text-2xl text-gray-400"></i>
            </div>
            <div class="min-w-0">
              <div class="text-lg font-bold text-gray-900">资料补全</div>
              <div class="text-xs text-gray-500 mt-1 truncate">{{ userEmail }}</div>
            </div>
          </div>
        </section>

        <section class="bg-white rounded-xl border border-gray-200 p-4 sm:p-5">
          <div class="border-b border-gray-200 pb-2 flex items-center gap-6 text-sm">
            <button
              class="relative font-medium"
              :class="activeTab === 'profile' ? 'text-gray-900' : 'text-gray-400 hover:text-gray-600'"
              type="button"
              @click="activeTab = 'profile'"
            >
              用户资料
              <span v-if="activeTab === 'profile'" class="absolute left-0 -bottom-[10px] w-10 h-0.5 bg-[#C19B5E] rounded-full"></span>
            </button>
            <button
              class="relative font-medium"
              :class="activeTab === 'security' ? 'text-gray-900' : 'text-gray-400 hover:text-gray-600'"
              type="button"
              @click="activeTab = 'security'"
            >
              账号安全
              <span v-if="activeTab === 'security'" class="absolute left-0 -bottom-[10px] w-10 h-0.5 bg-[#C19B5E] rounded-full"></span>
            </button>
          </div>

          <div v-if="activeTab === 'profile'" class="mt-5">
            <div v-if="submitted" class="rounded-lg border border-emerald-200 bg-emerald-50/60 p-4 text-sm text-emerald-700">
              <div class="font-semibold">资料提交成功</div>
              <div class="mt-1 text-emerald-700/90">已生成一条待审核申请（演示）。</div>
              <div class="mt-3 flex flex-col sm:flex-row gap-2">
                <button class="h-9 px-4 rounded bg-primary hover:bg-primaryHover text-white text-sm font-medium transition-colors" type="button" @click="goAuditList">
                  前往开户审核列表
                </button>
                <button class="h-9 px-4 rounded bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium transition-colors" type="button" @click="goHome">
                  返回首页
                </button>
              </div>
            </div>

            <form v-else class="grid grid-cols-1 lg:grid-cols-2 gap-5" @submit.prevent="handleSubmit">
              <div class="lg:col-span-1 space-y-4">
                <div>
                  <label class="block text-xs text-[#C19B5E] mb-2"><span class="text-[#C19B5E] mr-1">*</span>地区</label>
                  <select v-model="form.region" class="h-9 w-full rounded-md border border-gray-200 bg-white px-3 text-xs text-gray-700 outline-none focus:border-[#C19B5E] focus:ring-2 focus:ring-[#C19B5E]/10">
                    <option value="">请选择</option>
                    <option value="HK">中国香港</option>
                    <option value="SG">新加坡</option>
                    <option value="AE">阿联酋</option>
                    <option value="UK">英国</option>
                    <option value="CN">中国</option>
                  </select>
                </div>

                <div>
                  <label class="block text-xs text-[#C19B5E] mb-2"><span class="text-[#C19B5E] mr-1">*</span>手机号</label>
                  <div class="grid grid-cols-[100px_1fr] gap-3">
                    <select v-model="form.phoneCode" class="h-9 rounded-md border border-gray-200 bg-white px-3 text-xs text-gray-700 outline-none focus:border-[#C19B5E] focus:ring-2 focus:ring-[#C19B5E]/10">
                      <option value="">请选择</option>
                      <option value="+852">+852</option>
                      <option value="+65">+65</option>
                      <option value="+971">+971</option>
                      <option value="+44">+44</option>
                      <option value="+86">+86</option>
                    </select>
                    <input v-model.trim="form.phone" class="h-9 rounded-md border border-gray-200 bg-white px-3 text-xs text-gray-700 outline-none focus:border-[#C19B5E] focus:ring-2 focus:ring-[#C19B5E]/10" placeholder="请输入您的手机号" />
                  </div>
                </div>

                <div>
                  <label class="block text-xs text-[#C19B5E] mb-2"><span class="text-[#C19B5E] mr-1">*</span>真实姓名</label>
                  <input v-model.trim="form.realName" class="h-9 w-full rounded-md border border-gray-200 bg-white px-3 text-xs text-gray-700 outline-none focus:border-[#C19B5E] focus:ring-2 focus:ring-[#C19B5E]/10" placeholder="请输入您的真实姓名" />
                </div>

                <div>
                  <label class="block text-xs text-[#C19B5E] mb-2"><span class="text-[#C19B5E] mr-1">*</span>出生日期</label>
                  <input v-model="form.birthDate" type="date" class="h-9 w-full rounded-md border border-gray-200 bg-white px-3 text-xs text-gray-700 outline-none focus:border-[#C19B5E] focus:ring-2 focus:ring-[#C19B5E]/10" />
                </div>

                <div>
                  <label class="block text-xs text-[#C19B5E] mb-2"><span class="text-[#C19B5E] mr-1">*</span>证件类型</label>
                  <select v-model="form.certType" class="h-9 w-full rounded-md border border-gray-200 bg-white px-3 text-xs text-gray-700 outline-none focus:border-[#C19B5E] focus:ring-2 focus:ring-[#C19B5E]/10">
                    <option value="">请选择</option>
                    <option value="passport">护照</option>
                    <option value="id_card">身份证 / ID</option>
                  </select>
                </div>

                <div>
                  <label class="block text-xs text-[#C19B5E] mb-2"><span class="text-[#C19B5E] mr-1">*</span>证件号</label>
                  <input v-model.trim="form.certNo" class="h-9 w-full rounded-md border border-gray-200 bg-white px-3 text-xs text-gray-700 outline-none focus:border-[#C19B5E] focus:ring-2 focus:ring-[#C19B5E]/10" placeholder="请输入您的证件号码" />
                  <div v-if="hkidBlockHint" class="mt-2 rounded border border-red-200 bg-red-50/60 px-3 py-2 text-xs text-red-600 leading-5">
                    {{ hkidBlockHint }}
                  </div>
                </div>
              </div>

              <div class="lg:col-span-1 space-y-4">
                <div>
                  <label class="block text-xs text-[#C19B5E] mb-2"><span class="text-[#C19B5E] mr-1">*</span>证件照片</label>
                  <div class="grid grid-cols-2 gap-3">
                    <button class="h-[84px] rounded-lg bg-gray-100 border border-gray-200 flex flex-col items-center justify-center text-gray-500 text-xs hover:bg-gray-50 transition-colors" type="button" @click="frontInput?.click()">
                      <div class="w-7 h-7 rounded-full bg-white flex items-center justify-center mb-2 border border-gray-200">
                        <i class="fa-solid fa-camera text-red-400"></i>
                      </div>
                      {{ form.idFrontFileName || '上传正面' }}
                    </button>
                    <button class="h-[84px] rounded-lg bg-gray-100 border border-gray-200 flex flex-col items-center justify-center text-gray-500 text-xs hover:bg-gray-50 transition-colors" type="button" @click="backInput?.click()">
                      <div class="w-7 h-7 rounded-full bg-white flex items-center justify-center mb-2 border border-gray-200">
                        <i class="fa-solid fa-camera text-red-400"></i>
                      </div>
                      {{ form.idBackFileName || '上传反面' }}
                    </button>
                  </div>
                  <input ref="frontInput" class="hidden" type="file" accept="image/*" @change="handleFrontFile" />
                  <input ref="backInput" class="hidden" type="file" accept="image/*" @change="handleBackFile" />
                  <p class="mt-2 text-[11px] leading-4 text-[#C58B2D]">请确保图片信息清晰可见，不得裁剪边角，否则可能无法通过审核（演示）。</p>
                </div>

                <div>
                  <label class="block text-xs text-[#C19B5E] mb-2"><span class="text-[#C19B5E] mr-1">*</span>居住地</label>
                  <input v-model.trim="form.address" class="h-9 w-full rounded-md border border-gray-200 bg-white px-3 text-xs text-gray-700 outline-none focus:border-[#C19B5E] focus:ring-2 focus:ring-[#C19B5E]/10" placeholder="请输入" />
                </div>

                <div v-if="formError" class="rounded-lg border border-red-200 bg-red-50/60 px-3 py-2 text-xs text-red-600">
                  {{ formError }}
                </div>

                <div class="flex items-center gap-3 pt-1">
                  <button class="h-9 px-6 rounded bg-[#C19B5E] hover:opacity-90 text-white text-sm font-medium transition-opacity" type="submit">
                    提交
                  </button>
                  <button class="h-9 px-6 rounded border border-gray-200 bg-white text-sm text-gray-600 hover:border-gray-300 transition-colors" type="button" @click="goBack">
                    返回
                  </button>
                </div>
              </div>
            </form>
          </div>

          <div v-else class="mt-5">
            <div class="rounded-lg border border-gray-200 bg-gray-50/50 p-4 text-sm text-gray-700">
              <div class="font-semibold">账号安全</div>
              <div class="mt-1 text-gray-600">该页用于展示账号安全相关设置（演示），本轮优先恢复资料补全主流程。</div>
            </div>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const router = useRouter()
const route = useRoute()

const userEmail = computed(() => String(route.query.email || '3680704143@qq.com'))

const activeTab = ref('profile')
const submitted = ref(false)
const formError = ref('')

const form = ref({
  region: '',
  phoneCode: '',
  phone: '',
  realName: '',
  birthDate: '',
  certType: '',
  certNo: '',
  address: '',
  idFrontFileName: '',
  idBackFileName: ''
})

const frontInput = ref(null)
const backInput = ref(null)

const isHkid = (value) => /^[A-Z]{1,2}\d{6}\([0-9A]\)$/i.test(String(value || '').trim())

const hkidBlockHint = computed(() => {
  if (form.value.region !== 'HK') return ''
  if (form.value.certType !== 'id_card') return ''
  if (!isHkid(form.value.certNo)) return '暂时不支持香港身份证开户注册。'
  return '识别结果：香港身份证（HKID）。海外版不支持香港身份证开户注册，请使用其他证件或前往港版申请。'
})

const handleFrontFile = (e) => {
  const f = e.target.files?.[0]
  form.value.idFrontFileName = f?.name || ''
}

const handleBackFile = (e) => {
  const f = e.target.files?.[0]
  form.value.idBackFileName = f?.name || ''
}

const handleSubmit = () => {
  formError.value = ''
  const v = form.value
  if (!v.region || !v.phoneCode || !v.phone || !v.realName || !v.birthDate || !v.certType || !v.certNo || !v.address) {
    formError.value = '请先填写必填项'
    return
  }
  if (hkidBlockHint.value && v.certType === 'id_card') {
    formError.value = '当前证件类型/地区组合不支持提交'
    return
  }
  submitted.value = true
}

const goBack = () => {
  if (window.history.length > 1) router.back()
  else router.push('/register')
}

const goAuditList = () => {
  router.push('/crm/audit-list')
}

const goHome = () => {
  router.push('/home')
}
</script>
