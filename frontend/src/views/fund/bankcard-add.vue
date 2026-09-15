<template>
  <div class="flex flex-col min-w-0 w-full h-full">
    <div class="flex-1 min-w-0 overflow-y-auto custom-scrollbar">
      <div class="space-y-4">
        <section class="bg-white rounded-xl border border-gray-200 p-5">
          <div class="flex items-start justify-between gap-4">
            <div>
              <div class="text-xl font-bold text-gray-900">新增银行卡</div>
              <div class="text-sm text-gray-500 mt-1">支持 BANK / USDT / PCard / Planet card 等绑定信息录入（演示数据）</div>
            </div>
            <div class="flex items-center gap-2">
              <button class="h-9 px-4 rounded bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium transition-colors" type="button" @click="goBack">
                返回
              </button>
              <button class="h-9 px-4 rounded bg-primary hover:bg-primaryHover text-white text-sm font-medium transition-colors" type="button" @click="openHelpModal">
                获取客户编号教程
              </button>
            </div>
          </div>
        </section>

        <section class="bg-white rounded-xl border border-gray-200 p-6 md:p-8">
          <div v-if="submitted" class="rounded-lg border border-emerald-200 bg-emerald-50/60 p-4 text-sm text-emerald-700">
            <div class="font-semibold">提交成功</div>
            <div class="mt-1">已生成一条银行卡绑定申请（演示）。</div>
            <div class="mt-3 flex gap-2">
              <button class="h-9 px-4 rounded bg-primary hover:bg-primaryHover text-white text-sm font-medium transition-colors" type="button" @click="goAuditBankcard">
                返回银行卡审核
              </button>
              <button class="h-9 px-4 rounded bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium transition-colors" type="button" @click="resetForm">
                继续新增
              </button>
            </div>
          </div>

          <form v-else class="max-w-3xl" @submit.prevent="submit">
            <div class="grid grid-cols-1 md:grid-cols-[140px_1fr] gap-y-6 gap-x-6">
              <div class="text-right text-sm font-medium text-gray-700 pt-2">
                <span class="text-red-500">*</span>类型
              </div>
              <div class="flex flex-col gap-3">
                <label v-for="t in cardTypes" :key="t.value" class="flex items-center gap-2 cursor-pointer group">
                  <input v-model="form.cardType" type="radio" name="card_type" :value="t.value" class="w-4 h-4 text-primary focus:ring-primary border-gray-300 cursor-pointer" />
                  <span class="text-sm text-gray-700 group-hover:text-primary transition-colors">{{ t.label }}</span>
                </label>
              </div>

              <div class="text-right text-sm font-medium text-gray-700 pt-2">
                <span class="text-red-500">*</span>钱包地址
              </div>
              <div>
                <input v-model.trim="form.walletAddress" type="text" placeholder="请输入您的钱包地址" class="w-full border border-gray-300 rounded px-4 py-2 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all" />
                <p class="mt-2 text-xs text-red-500">
                  <i class="fas fa-info-circle text-red-500 mr-1"></i> 钱包地址绑定提交后，将发送验证邮件至注册邮箱，确认后绑定方可生效（演示）。
                </p>
              </div>

              <template v-if="needClientId">
                <div class="text-right text-sm font-medium text-gray-700 pt-2">
                  <span class="text-red-500">*</span>客户编号
                </div>
                <div>
                  <input v-model.trim="form.clientId" type="text" placeholder="请输入您的客户编号" class="w-full h-10 px-3 border border-gray-300 rounded outline-none focus:border-[#d1a84f] focus:ring-1 focus:ring-[#d1a84f]/20 text-sm" />
                  <div class="mt-2 flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                    <p class="text-xs text-gray-500">
                      <i class="fa-solid fa-circle-info text-gray-400 mr-1"></i>
                      请在 Planet card / PCard 平台中查看并填写唯一客户编号（演示）。
                    </p>
                    <button type="button" class="text-xs text-blue-600 hover:text-blue-800 flex items-center gap-1 cursor-pointer font-medium bg-blue-50 px-2 py-1 rounded w-fit" @click="openHelpModal">
                      <i class="fa-regular fa-circle-question"></i> 不知道如何获取编号？点击查看教程
                    </button>
                  </div>
                </div>
              </template>

              <div class="text-right text-sm font-medium text-gray-700 pt-2">
                <span class="text-red-500">*</span>二维码
              </div>
              <div>
                <button type="button" class="bg-[#D3A771] hover:bg-[#c09664] text-white px-4 py-2 rounded text-sm transition-colors shadow-sm" @click="qrInput?.click()">
                  选择图片
                </button>
                <span v-if="form.qrFileName" class="ml-3 text-sm text-gray-600">{{ form.qrFileName }}</span>
                <input ref="qrInput" class="hidden" type="file" accept="image/*" @change="handleQrFile" />
              </div>
            </div>

            <div v-if="formError" class="mt-6 rounded-lg border border-red-200 bg-red-50/60 px-3 py-2 text-xs text-red-600">
              {{ formError }}
            </div>

            <div class="mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4 sm:ml-[140px]">
              <button type="submit" class="bg-[#D3A771] hover:bg-[#c09664] text-white px-8 py-2 rounded text-sm font-medium transition-colors shadow-sm">
                提交
              </button>
              <button type="button" class="bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 px-8 py-2 rounded text-sm transition-colors shadow-sm" @click="goBack">
                返回
              </button>
            </div>
          </form>
        </section>
      </div>
    </div>
  </div>

  <div v-if="helpVisible" class="fixed inset-0 z-[100] flex items-center justify-center p-6">
    <div class="absolute inset-0 bg-black/50 backdrop-blur-sm" @click="closeHelpModal"></div>
    <div class="relative bg-white rounded-xl shadow-xl w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden">
      <div class="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
        <h3 class="text-lg font-bold text-gray-800">如何获取 Planet card 客户编号？</h3>
        <button class="text-gray-400 hover:text-gray-600 transition-colors" type="button" @click="closeHelpModal">
          <i class="fa-solid fa-xmark text-lg"></i>
        </button>
      </div>

      <div class="p-6 overflow-y-auto custom-scrollbar">
        <div class="space-y-8">
          <div>
            <div class="flex items-center gap-2 mb-3">
              <span class="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-sm font-bold">1</span>
              <h4 class="font-medium text-gray-800">登录 Planet card 官网或 App</h4>
            </div>
            <p class="text-sm text-gray-500 ml-8 mb-4">请使用您的区号和手机号码，输入登录信息进行登录。</p>
            <div class="ml-8 border border-gray-200 rounded-lg overflow-hidden bg-gray-50 shadow-sm">
              <img :src="tutorialImg1" alt="登录步骤截图" class="w-full object-contain" />
            </div>
          </div>

          <div>
            <div class="flex items-center gap-2 mb-3">
              <span class="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-sm font-bold">2</span>
              <h4 class="font-medium text-gray-800">获取唯一客户编号</h4>
            </div>
            <p class="text-sm text-gray-500 ml-8 mb-4">登录成功后，在页面右上角点击头像区域，在下拉菜单中找到并复制您的唯一客户编号（ID）。</p>
            <div class="ml-8 border border-gray-200 rounded-lg overflow-hidden bg-gray-50 shadow-sm">
              <img :src="tutorialImg2" alt="获取ID截图" class="w-full object-contain" />
            </div>
          </div>
        </div>
      </div>

      <div class="px-6 py-4 border-t border-gray-100 flex justify-end bg-white">
        <button class="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors" type="button" @click="closeHelpModal">
          我已了解
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, reactive, ref, watch } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const cardTypes = [
  { value: 'bank', label: 'BANK' },
  { value: 'usdt_trc20', label: 'USDT_TRC20' },
  { value: 'usdt_erc20', label: 'USDT_ERC20' },
  { value: 'pcard', label: 'PCard' },
  { value: 'planet_card', label: 'Planet card' },
  { value: 'alipay', label: 'AlPay' },
  { value: 'passtopay', label: 'PasstoPay' }
]

const form = reactive({
  cardType: 'usdt_trc20',
  walletAddress: '',
  clientId: '',
  qrFileName: ''
})

const qrInput = ref(null)
const formError = ref('')
const submitted = ref(false)

const needClientId = computed(() => form.cardType === 'planet_card' || form.cardType === 'pcard')

watch(needClientId, (val) => {
  if (!val) form.clientId = ''
})

const handleQrFile = (e) => {
  const f = e.target.files?.[0]
  form.qrFileName = f?.name || ''
}

const submit = () => {
  formError.value = ''
  if (!form.walletAddress) {
    formError.value = '请输入钱包地址'
    return
  }
  if (needClientId.value && !form.clientId) {
    formError.value = '请输入客户编号'
    return
  }
  if (!form.qrFileName) {
    formError.value = '请选择二维码图片'
    return
  }
  submitted.value = true
}

const resetForm = () => {
  form.cardType = 'usdt_trc20'
  form.walletAddress = ''
  form.clientId = ''
  form.qrFileName = ''
  formError.value = ''
  submitted.value = false
}

const goBack = () => {
  if (window.history.length > 1) router.back()
  else router.push('/fund/audit-bankcard')
}

const goAuditBankcard = () => {
  router.push('/fund/audit-bankcard')
}

const helpVisible = ref(false)
const openHelpModal = () => {
  helpVisible.value = true
}
const closeHelpModal = () => {
  helpVisible.value = false
}

const tutorialImg1 = 'https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=realistic%20mobile%20app%20login%20screen%20for%20a%20digital%20wallet%2C%20clean%20UI%2C%20phone%20number%20login%20with%20country%20code%2C%20modern%20fintech%20style%2C%20screenshot%20mockup%2C%20high%20fidelity%2C%20no%20brand%20logos%2C%20no%20sensitive%20data&image_size=landscape_16_9'
const tutorialImg2 = 'https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=realistic%20mobile%20app%20profile%20menu%20screen%2C%20user%20avatar%20dropdown%2C%20highlight%20customer%20ID%20field%2C%20modern%20fintech%20UI%2C%20screenshot%20mockup%2C%20high%20fidelity%2C%20no%20brand%20logos%2C%20no%20sensitive%20data&image_size=landscape_16_9'
</script>
