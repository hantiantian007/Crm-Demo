<template>
  <div class="flex flex-col min-w-0 w-full">
    <div class="flex-1 min-w-0 overflow-y-auto custom-scrollbar">
      <div class="space-y-4 w-full max-w-[880px] mx-auto px-3 sm:px-4 lg:px-0">
        <section class="bg-white rounded-xl border border-gray-200 p-4 sm:p-5">
          <div class="flex items-center gap-4">
            <div class="w-14 h-14 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center overflow-hidden">
              <i class="fa-solid fa-user text-2xl text-gray-400"></i>
            </div>
            <div class="min-w-0">
              <div class="text-lg font-bold text-gray-900">客户注册资料</div>
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
            <form class="space-y-6" @submit.prevent="handleSubmit">
              <div class="space-y-7">
                <div>
                  <div class="flex items-center gap-2">
                    <span class="w-1 h-4 bg-[#C19B5E] rounded"></span>
                    <div class="text-sm font-semibold text-gray-900">基本信息</div>
                  </div>
                  <div class="mt-4 grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <div>
                      <label class="block text-xs text-[#C19B5E] mb-2"><span class="text-[#C19B5E] mr-1">*</span>手机号</label>
                      <div class="grid grid-cols-1 sm:grid-cols-[120px_1fr] gap-3">
                        <select v-model="form.phoneCode" class="h-9 rounded-md border border-gray-200 bg-white px-3 text-xs text-gray-700 outline-none focus:border-[#C19B5E] focus:ring-2 focus:ring-[#C19B5E]/10">
                          <option value="">请选择</option>
                          <option value="+84">+84</option>
                          <option value="+86">+86</option>
                          <option value="+852">+852</option>
                          <option value="+82">+82</option>
                          <option value="+81">+81</option>
                          <option value="+66">+66</option>
                          <option value="+65">+65</option>
                        </select>
                        <input v-model.trim="form.phone" class="h-9 rounded-md border border-gray-200 bg-white px-3 text-xs text-gray-700 outline-none focus:border-[#C19B5E] focus:ring-2 focus:ring-[#C19B5E]/10" placeholder="请输入您的手机号" />
                      </div>
                    </div>

                    <div>
                      <label class="block text-xs text-[#C19B5E] mb-2"><span class="text-[#C19B5E] mr-1">*</span>真实姓名</label>
                      <input v-model.trim="form.realName" class="h-9 w-full rounded-md border border-gray-200 bg-white px-3 text-xs text-gray-700 outline-none focus:border-[#C19B5E] focus:ring-2 focus:ring-[#C19B5E]/10" placeholder="请输入您的真实姓名" />
                    </div>

                    <div class="lg:col-span-2">
                      <label class="block text-xs text-[#C19B5E] mb-2"><span class="text-[#C19B5E] mr-1">*</span>出生日期</label>
                      <input v-model="form.birthDate" type="date" class="h-9 w-full rounded-md border border-gray-200 bg-white px-3 text-xs text-gray-700 outline-none focus:border-[#C19B5E] focus:ring-2 focus:ring-[#C19B5E]/10" />
                    </div>
                  </div>
                </div>

                <div>
                  <div class="flex items-center gap-2">
                    <span class="w-1 h-4 bg-[#C19B5E] rounded"></span>
                    <div class="text-sm font-semibold text-gray-900">证件信息</div>
                  </div>
                  <div class="mt-4 grid grid-cols-1 lg:grid-cols-2 gap-4">
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
                    </div>

                    <div class="lg:col-span-2">
                      <label class="block text-xs text-[#C19B5E] mb-2"><span class="text-[#C19B5E] mr-1">*</span>证件照片</label>
                      <div class="grid grid-cols-1 lg:grid-cols-2 gap-3">
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
                      <p class="mt-2 text-[11px] leading-4 text-[#C58B2D]">请确保图片信息清晰可见，不要裁剪边角。</p>
                    </div>
                  </div>
                </div>

                <div>
                  <div class="flex items-center gap-2">
                    <span class="w-1 h-4 bg-[#C19B5E] rounded"></span>
                    <div class="text-sm font-semibold text-gray-900">居住地址</div>
                  </div>
                  <div class="mt-4 grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <div class="lg:col-span-2">
                      <label class="block text-xs text-[#D97706] mb-2"><span class="text-[#D97706] mr-1">*</span>地区</label>
                      <select
                        v-model="form.region"
                        class="h-9 w-full rounded-md border border-gray-200 bg-white px-3 text-xs outline-none focus:border-[#C19B5E] focus:ring-2 focus:ring-[#C19B5E]/10"
                        :class="form.region ? 'text-[#D97706]' : 'text-gray-700'"
                      >
                        <option value="">请选择地区</option>
                        <option value="VN">越南</option>
                        <option value="CN">中国</option>
                        <option value="HK">中国香港</option>
                        <option value="KR">韩国</option>
                        <option value="JP">日本</option>
                        <option value="TH">泰国</option>
                        <option value="SG">新加坡</option>
                      </select>
                    </div>

                    <div>
                      <label class="block text-xs text-[#D97706] mb-2"><span class="text-[#D97706] mr-1">*</span>省/州</label>
                      <select
                        v-model="form.province"
                        class="h-9 w-full rounded-md border border-gray-200 bg-white px-3 text-xs outline-none focus:border-[#C19B5E] focus:ring-2 focus:ring-[#C19B5E]/10 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed"
                        :class="form.province ? 'text-[#D97706]' : 'text-gray-700'"
                        :disabled="!form.region"
                      >
                        <option value="">请选择省/州</option>
                        <option v-for="p in provinceOptions" :key="p" :value="p">{{ p }}</option>
                      </select>
                    </div>

                    <div>
                      <label class="block text-xs text-[#D97706] mb-2"><span class="text-[#D97706] mr-1">*</span>城市</label>
                      <select
                        v-model="form.city"
                        class="h-9 w-full rounded-md border border-gray-200 bg-white px-3 text-xs outline-none focus:border-[#C19B5E] focus:ring-2 focus:ring-[#C19B5E]/10 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed"
                        :class="form.city ? 'text-[#D97706]' : 'text-gray-700'"
                        :disabled="!form.region || !form.province"
                      >
                        <option value="">请选择城市</option>
                        <option v-for="c in cityOptions" :key="c" :value="c">{{ c }}</option>
                      </select>
                    </div>

                    <div class="lg:col-span-2">
                      <label class="block text-xs text-[#D97706] mb-2"><span class="text-[#D97706] mr-1">*</span>详细居住地址</label>
                      <input
                        v-model.trim="form.addressDetail"
                        class="h-9 w-full rounded-md border border-gray-200 bg-white px-3 text-xs outline-none focus:border-[#C19B5E] focus:ring-2 focus:ring-[#C19B5E]/10"
                        :class="form.addressDetail ? 'text-[#D97706]' : 'text-gray-700'"
                        placeholder="请输入详细居住地址"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div class="space-y-4">
                <div v-if="formError" class="rounded-lg border border-red-200 bg-red-50/60 px-3 py-2 text-xs text-red-600">
                  {{ formError }}
                </div>

                <div class="flex flex-col sm:flex-row sm:items-center gap-3 pt-1">
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
              <div class="mt-1 text-gray-600">该页用于展示账号安全相关设置。</div>
            </div>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'

const router = useRouter()
const route = useRoute()

const userEmail = computed(() => String(route.query.email || '935292015@A.com'))

const activeTab = ref('profile')
const formError = ref('')

const form = ref({
  region: '',
  phoneCode: '',
  phone: '',
  realName: '',
  birthDate: '',
  certType: '',
  certNo: '',
  province: '',
  city: '',
  addressDetail: '',
  idFrontFileName: '',
  idBackFileName: ''
})

const regionProvinceCityMap = {
  VN: [
    { name: '河内市', cities: ['河内'] },
    { name: '胡志明市', cities: ['胡志明市'] },
    { name: '岘港市', cities: ['岘港'] }
  ],
  CN: [
    { name: '广东省', cities: ['广州市', '深圳市', '佛山市'] },
    { name: '重庆市', cities: ['重庆市'] },
    { name: '四川省', cities: ['成都市', '绵阳市'] }
  ],
  HK: [
    { name: '香港特别行政区', cities: ['香港岛', '九龙', '新界'] }
  ],
  KR: [
    { name: '首尔特别市', cities: ['首尔'] },
    { name: '釜山广域市', cities: ['釜山'] },
    { name: '京畿道', cities: ['水原市', '高阳市'] }
  ],
  JP: [
    { name: '东京都', cities: ['东京'] },
    { name: '大阪府', cities: ['大阪市'] },
    { name: '北海道', cities: ['札幌市'] }
  ],
  TH: [
    { name: '曼谷', cities: ['曼谷'] },
    { name: '清迈府', cities: ['清迈'] },
    { name: '普吉府', cities: ['普吉'] }
  ],
  SG: [
    { name: '新加坡', cities: ['中区', '东区', '北区', '东北区', '西区'] }
  ]
}

const provinceOptions = computed(() => {
  const list = regionProvinceCityMap[form.value.region] || []
  return list.map((p) => p.name)
})

const cityOptions = computed(() => {
  const list = regionProvinceCityMap[form.value.region] || []
  const p = list.find((it) => it.name === form.value.province)
  return p?.cities || []
})

watch(
  () => form.value.region,
  () => {
    form.value.province = ''
    form.value.city = ''
  }
)

watch(
  () => form.value.province,
  () => {
    form.value.city = ''
  }
)

const frontInput = ref(null)
const backInput = ref(null)

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
  if (!v.region) return (formError.value = '请选择地区')
  if (!v.province) return (formError.value = '请选择省/州')
  if (!v.city) return (formError.value = '请选择城市')
  if (!v.addressDetail) return (formError.value = '请输入详细居住地址')
  if (!v.phoneCode || !v.phone || !v.realName || !v.birthDate || !v.certType || !v.certNo) return (formError.value = '请先填写必填项')
  ElMessage({ message: '提交成功（演示）', type: 'success' })
}

const goBack = () => {
  if (window.history.length > 1) router.back()
  else router.push('/home')
}
</script>
