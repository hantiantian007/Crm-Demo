<template>
  <div class="flex h-full bg-mainBg overflow-hidden">
    <div class="flex-1 flex flex-col min-w-0 bg-gray-50 overflow-hidden p-4 custom-scrollbar overflow-y-auto">
      <div class="w-full max-w-7xl mx-auto p-2 sm:p-4">
        <div class="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-6">
          <div>
            <h1 class="text-2xl font-bold text-gray-900">商品详情</h1>
            <p class="text-sm text-gray-500 mt-1">查看智能交易系统套餐详情</p>
          </div>
          <router-link
            class="px-4 py-2 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 rounded-lg text-sm font-medium transition-colors shadow-sm flex items-center gap-2 w-fit"
            to="/crm/client-product-list"
          >
            <i class="fas fa-arrow-left text-gray-400"></i>
            返回列表
          </router-link>
        </div>

        <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6 sm:p-8 flex flex-col lg:flex-row gap-8">
          <div class="w-full lg:w-[480px] flex-shrink-0">
            <div class="relative border border-gray-200 rounded-lg bg-white overflow-hidden group">
              <div class="flex transition-transform duration-300 ease-in-out w-[300%]" :style="{ transform: `translateX(-${currentSlide * 33.3333}%)` }">
                <div class="w-1/3 flex-shrink-0 h-[360px] sm:h-[420px] flex items-center justify-center bg-gradient-to-br from-indigo-900 to-purple-800 relative overflow-hidden">
                  <div class="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.2),transparent_40%),radial-gradient(circle_at_80%_70%,rgba(255,255,255,0.15),transparent_45%)]"></div>
                  <div class="relative text-center text-white px-6">
                    <div class="text-xs tracking-widest opacity-80 mb-2">STAR ACTIVATION</div>
                    <div class="text-3xl font-black leading-tight">
                      {{ product.name }}
                    </div>
                    <div class="mt-5 inline-flex items-center gap-2 text-xs bg-white/10 border border-white/15 px-3 py-1 rounded-full">
                      <i class="fas fa-star"></i>
                      <span>星启APP</span>
                    </div>
                  </div>
                </div>
                <div class="w-1/3 flex-shrink-0 h-[360px] sm:h-[420px] flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-700">
                  <div class="text-center text-white px-6">
                    <i class="fas fa-chart-line text-5xl text-blue-300"></i>
                    <div class="mt-4 text-lg font-bold">策略看板演示</div>
                    <div class="mt-1 text-sm text-white/80">支持多周期趋势分析</div>
                  </div>
                </div>
                <div class="w-1/3 flex-shrink-0 h-[360px] sm:h-[420px] flex items-center justify-center bg-gradient-to-br from-teal-900 to-teal-700">
                  <div class="text-center text-white px-6">
                    <i class="fas fa-mobile-alt text-5xl text-teal-200"></i>
                    <div class="mt-4 text-lg font-bold">移动端演示</div>
                    <div class="mt-1 text-sm text-white/80">随时查看运行状态</div>
                  </div>
                </div>
              </div>

              <button
                class="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 hover:bg-white rounded-full shadow-md flex items-center justify-center text-gray-800 opacity-0 group-hover:opacity-100 transition-opacity"
                type="button"
                @click="prevSlide"
              >
                <i class="fas fa-chevron-left"></i>
              </button>
              <button
                class="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 hover:bg-white rounded-full shadow-md flex items-center justify-center text-gray-800 opacity-0 group-hover:opacity-100 transition-opacity"
                type="button"
                @click="nextSlide"
              >
                <i class="fas fa-chevron-right"></i>
              </button>

              <div class="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                <button
                  v-for="idx in 3"
                  :key="idx"
                  class="w-2 h-2 rounded-full transition-colors"
                  :class="currentSlide === idx - 1 ? 'bg-primary' : 'bg-gray-300'"
                  type="button"
                  @click="currentSlide = idx - 1"
                ></button>
              </div>
            </div>
          </div>

          <div class="flex-1 flex flex-col min-w-0">
            <div class="mb-6">
              <h2 class="text-lg sm:text-xl font-bold text-gray-900 truncate" :title="product.title">
                {{ product.title }}
              </h2>
              <div class="mt-2 flex items-center gap-2">
                <span class="bg-gray-100 text-gray-600 text-[11px] px-2 py-0.5 rounded border border-gray-200">{{ product.typeLabel }}</span>
                <p class="text-gray-500 text-sm">付费套餐</p>
              </div>
            </div>

            <div class="space-y-3 mb-8">
              <label v-for="pkg in product.packages" :key="pkg.id" class="block relative cursor-pointer">
                <input v-model="selectedPackageId" class="peer sr-only" name="package" type="radio" :value="pkg.id" :disabled="pkg.stock === 0" />
                <div
                  class="border border-gray-200 rounded-lg p-4 flex flex-col gap-2 transition-all hover:border-gray-300 peer-disabled:bg-gray-50 peer-disabled:opacity-60 peer-disabled:cursor-not-allowed"
                  :class="selectedPackageId === pkg.id ? 'border-primary bg-primary/5' : ''"
                >
                  <div class="flex justify-between items-start gap-2">
                    <div class="font-bold text-gray-800 text-sm line-clamp-2" :title="pkg.name">{{ pkg.name }}</div>
                    <div class="shrink-0 text-xs px-2 py-0.5 rounded" :class="pkg.stock === 0 ? 'text-red-500 bg-red-50' : 'text-gray-500 bg-gray-100'">
                      {{ pkg.stock === 0 ? '已售罄 (库存 0)' : `库存: ${pkg.stock}` }}
                    </div>
                  </div>
                  <div class="flex items-baseline gap-2 mt-1">
                    <span class="text-xl font-bold text-gray-900">${{ formatMoney(pkg.price) }}</span>
                    <span v-if="pkg.originalPrice" class="text-xs text-gray-500 line-through">${{ formatMoney(pkg.originalPrice) }}</span>
                    <span class="text-sm text-gray-700 font-medium ml-1">{{ pkg.unitLabel }}</span>
                  </div>
                </div>
              </label>
            </div>

            <div class="mt-auto pt-6 border-t border-gray-100">
              <div class="bg-gray-50 rounded-lg p-5 mb-5 flex justify-between items-center gap-6">
                <div class="flex flex-col gap-1.5">
                  <div class="text-sm text-gray-500">当前账户余额汇总</div>
                  <div class="font-medium text-gray-800">{{ formatMoney(accountBalance) }} USD</div>
                </div>
                <div class="flex flex-col gap-1.5 text-right">
                  <div class="text-sm text-gray-500">应付总额</div>
                  <div class="text-2xl font-bold text-red-500">${{ formatMoney(payableAmount) }}</div>
                </div>
              </div>

              <div class="mb-4">
                <label class="block text-sm font-medium text-gray-700 mb-2">应用交易账户 (强绑定)</label>
                <select v-model="applyAccount" class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary focus:border-primary bg-white">
                  <option value="">请选择需挂载策略的 MT5 账户...</option>
                  <option value="8881234">8881234 (USD) - 标准账户</option>
                  <option value="8885678">8885678 (USD) - VIP账户</option>
                </select>
              </div>

              <div class="mb-4">
                <label class="block text-sm font-medium text-gray-700 mb-2">是否已有 Star 账号？</label>
                <div class="flex items-center gap-4 mb-2">
                  <label class="flex items-center gap-2 cursor-pointer">
                    <input v-model="hasStarAccount" class="text-primary focus:ring-primary" name="has_star_main" type="radio" :value="true" />
                    <span class="text-sm text-gray-700">是</span>
                  </label>
                  <label class="flex items-center gap-2 cursor-pointer">
                    <input v-model="hasStarAccount" class="text-primary focus:ring-primary" name="has_star_main" type="radio" :value="false" />
                    <span class="text-sm text-gray-700">否</span>
                  </label>
                </div>
                <div v-if="hasStarAccount">
                  <input v-model="starAccount" class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary focus:border-primary bg-white" placeholder="请输入您的 Star 账号" type="text" />
                </div>
              </div>

              <div class="flex flex-col gap-2">
                <button
                  v-if="!insufficientBalance"
                  class="w-full py-3 bg-primary hover:bg-primaryHover text-white rounded-lg text-base font-bold shadow-sm transition-colors flex items-center justify-center gap-2"
                  type="button"
                  :disabled="!canPurchase"
                  :class="!canPurchase ? 'opacity-50 cursor-not-allowed' : ''"
                  @click="openPayModal"
                >
                  立即购买
                </button>
                <button
                  v-else
                  class="w-full bg-red-50 text-red-600 border border-red-200 py-3 rounded-lg font-medium hover:bg-red-100 transition-colors"
                  type="button"
                  @click="goDeposit"
                >
                  余额不足，去入金
                </button>
                <div class="text-center mt-2">
                  <button class="text-xs text-gray-400 hover:text-primary underline" type="button" @click="insufficientBalance = !insufficientBalance">
                    切换演示: 模拟余额不足
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="mt-8 bg-white rounded-lg shadow-sm border border-gray-200 p-6 sm:p-8">
          <h3 class="text-lg font-bold text-gray-900 mb-6 pb-2 border-b border-gray-100 inline-block">商品介绍</h3>
          <div class="text-center mb-8 mt-2">
            <h2 class="text-2xl font-bold text-gray-800">产品特色与功能</h2>
          </div>
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div class="space-y-4">
              <div class="border-b border-gray-100 pb-4">
                <h4 class="text-base font-bold text-gray-800 mb-2">进阶趋势分析，智能强大</h4>
                <p class="text-sm text-gray-500 leading-relaxed">智能捕捉市场动态，识别趋势行情，帮助您把握关键机会。</p>
              </div>
              <div class="border-b border-gray-100 pb-4">
                <h4 class="text-base font-bold text-gray-800 mb-2">操作简单，一键智能交易</h4>
                <p class="text-sm text-gray-500 leading-relaxed">无需复杂操作，只需简单设置即可开始交易，上手即用。</p>
              </div>
              <div class="border-b border-gray-100 pb-4">
                <h4 class="text-base font-bold text-gray-800 mb-2">自动风控与策略护航</h4>
                <p class="text-sm text-gray-500 leading-relaxed">多维度风控策略辅助决策，降低非理性操作带来的风险。</p>
              </div>
            </div>
            <div class="rounded-xl overflow-hidden border border-gray-200 bg-gradient-to-br from-gray-900 to-gray-700 flex items-center justify-center h-64">
              <div class="text-center text-white px-8">
                <i class="fas fa-shield-alt text-5xl text-white/80"></i>
                <div class="mt-4 text-lg font-bold">演示素材</div>
                <div class="mt-1 text-sm text-white/70">Demo 阶段使用静态演示内容</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div v-if="payModalOpen" class="fixed inset-0 z-[100]">
    <div class="absolute inset-0 bg-black/60 backdrop-blur-sm" @click="closePayModal"></div>
    <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[92%] max-w-md bg-white rounded-xl shadow-2xl overflow-hidden flex flex-col">
      <div class="bg-gray-50 px-6 py-4 border-b border-gray-100 flex justify-between items-center">
        <h3 class="text-lg font-bold text-gray-900">确认支付</h3>
        <button class="text-gray-400 hover:text-gray-600 transition-colors" type="button" @click="closePayModal">
          <i class="fas fa-times text-lg"></i>
        </button>
      </div>
      <div class="p-6 flex flex-col gap-5">
        <div class="flex justify-between items-center pb-4 border-b border-gray-100">
          <span class="text-gray-500">购买商品</span>
          <span class="font-medium text-gray-900 text-right w-2/3 truncate" :title="product.title">{{ product.title }}</span>
        </div>
        <div class="flex justify-between items-center pb-4 border-b border-gray-100">
          <span class="text-gray-500">应付金额</span>
          <span class="text-xl font-bold text-red-500">${{ formatMoney(payableAmount) }}</span>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">请选择扣款 MT 账号 <span class="text-red-500">*</span></label>
          <select v-model="payAccount" class="block w-full px-3 py-2.5 text-sm border-gray-300 focus:outline-none focus:ring-primary focus:border-primary rounded-md bg-white border">
            <option disabled value="">请选择账号...</option>
            <option value="667788">MT5 - 667788 (可用余额: $1,500.00)</option>
            <option value="556677">MT5 - 556677 (可用余额: $120.00)</option>
            <option value="998877">MT5 - 998877 (可用余额: $8,500.00)</option>
          </select>
          <p class="text-xs text-gray-500 mt-3">
            <i class="fas fa-info-circle mr-1 text-blue-500"></i>
            后台审核通过后，对应金额将从您的钱包余额中扣除。
          </p>
        </div>

        <div class="mt-2">
          <label class="block text-sm font-medium text-gray-700 mb-2">应用交易账户 (强绑定)</label>
          <select v-model="applyAccount" class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary focus:border-primary bg-white">
            <option value="">请选择需挂载策略的 MT5 账户...</option>
            <option value="8881234">8881234 (USD) - 标准账户</option>
            <option value="8885678">8885678 (USD) - VIP账户</option>
          </select>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">是否已有 Star 账号？</label>
          <div class="flex items-center gap-4 mb-2">
            <label class="flex items-center gap-2 cursor-pointer">
              <input v-model="hasStarAccount" class="text-primary focus:ring-primary" name="has_star_modal" type="radio" :value="true" />
              <span class="text-sm text-gray-700">是</span>
            </label>
            <label class="flex items-center gap-2 cursor-pointer">
              <input v-model="hasStarAccount" class="text-primary focus:ring-primary" name="has_star_modal" type="radio" :value="false" />
              <span class="text-sm text-gray-700">否</span>
            </label>
          </div>
          <div v-if="hasStarAccount">
            <input v-model="starAccount" class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary focus:border-primary bg-white" placeholder="请输入您的 Star 账号" type="text" />
          </div>
        </div>
      </div>

      <div class="px-6 py-4 bg-gray-50 border-t border-gray-100 flex justify-end items-center gap-3">
        <button class="px-5 py-2.5 text-gray-600 hover:text-gray-800 hover:bg-gray-200 rounded-lg text-sm font-medium transition-colors" type="button" @click="closePayModal">
          取消
        </button>
        <button
          class="px-8 py-2.5 bg-primary hover:bg-primaryHover text-white rounded-lg text-sm font-bold shadow-sm transition-colors flex items-center gap-2"
          type="button"
          :disabled="!payAccount"
          :class="!payAccount ? 'opacity-50 cursor-not-allowed' : ''"
          @click="confirmPayment"
        >
          确认购买
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, watchEffect } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const productId = computed(() => {
  const n = Number(route.query.id)
  return Number.isFinite(n) && n > 0 ? n : 1
})

const productList = [
  {
    id: 1,
    name: '先锋一号',
    title: '【APP 版本】先锋一号',
    typeLabel: '虚拟商品',
    packages: [
      { id: 1, name: '基础版', price: 5000, originalPrice: 6000, unitLabel: '/月（订阅）', stock: 0 },
      { id: 3, name: '进阶版', price: 13500, originalPrice: 15000, unitLabel: '/季（订阅）', stock: 50 },
      {
        id: 12,
        name: '这是一个为了测试超过三十个字符而专门设置的很长很长的套餐名称示例',
        price: 48000,
        originalPrice: 60000,
        unitLabel: '/年（订阅）',
        stock: 10
      }
    ]
  },
  {
    id: 2,
    name: '先锋二号',
    title: '先锋二号',
    typeLabel: '虚拟商品',
    packages: [{ id: 21, name: '买断版', price: 800, originalPrice: 1000, unitLabel: '（无时间限制）', stock: 9999 }]
  },
  {
    id: 3,
    name: '先锋三号',
    title: '先锋三号',
    typeLabel: '实体商品',
    packages: [{ id: 31, name: '标准版', price: 1500, originalPrice: null, unitLabel: '（无时间限制）', stock: 0 }]
  },
  {
    id: 4,
    name: '先锋四号',
    title: '先锋四号',
    typeLabel: '虚拟商品',
    packages: [
      { id: 41, name: '体验版', price: 1200, originalPrice: 1500, unitLabel: '/周（订阅）', stock: 50 },
      { id: 42, name: '正式版', price: 4500, originalPrice: 5500, unitLabel: '/月（订阅）', stock: 20 }
    ]
  }
]

const product = computed(() => productList.find((p) => p.id === productId.value) ?? productList[0])

const selectedPackageId = ref(null)
watchEffect(() => {
  const available = product.value.packages.find((p) => p.stock > 0) ?? product.value.packages[0]
  if (!available) return
  if (!selectedPackageId.value || !product.value.packages.some((p) => p.id === selectedPackageId.value)) {
    selectedPackageId.value = available.id
  }
})

const selectedPackage = computed(() => product.value.packages.find((p) => p.id === selectedPackageId.value) ?? null)

const accountBalance = 10120
const payableAmount = computed(() => selectedPackage.value?.price ?? 0)

const applyAccount = ref('')
const hasStarAccount = ref(false)
const starAccount = ref('')

const insufficientBalance = ref(false)
const payModalOpen = ref(false)
const payAccount = ref('')

const canPurchase = computed(() => {
  if (!selectedPackage.value) return false
  if (selectedPackage.value.stock === 0) return false
  return true
})

const currentSlide = ref(0)
const prevSlide = () => {
  currentSlide.value = (currentSlide.value + 2) % 3
}
const nextSlide = () => {
  currentSlide.value = (currentSlide.value + 1) % 3
}

const formatMoney = (n) => {
  const num = typeof n === 'number' ? n : Number(n)
  if (!Number.isFinite(num)) return '0.00'
  return num.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

const openPayModal = () => {
  if (!canPurchase.value) return
  payAccount.value = ''
  payModalOpen.value = true
}

const closePayModal = () => {
  payModalOpen.value = false
}

const confirmPayment = () => {
  if (!payAccount.value) return
  closePayModal()
  router.push(`/crm/client-my-orders?productId=${productId.value}`)
}

const goDeposit = () => {
  router.push('/fund/deposit')
}
</script>
