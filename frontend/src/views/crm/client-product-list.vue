<template>
  <div class="flex h-full bg-mainBg overflow-hidden">
    <div class="flex-1 flex flex-col min-w-0 bg-gray-50 overflow-hidden p-4 custom-scrollbar overflow-y-auto">
      <div class="w-full max-w-7xl mx-auto p-2 sm:p-4">
        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-5">
          <div>
            <h1 class="text-2xl font-bold text-gray-900">智能交易系统</h1>
            <p class="text-sm text-gray-500 mt-1">发现更多投资与托管服务，提升您的资产收益</p>
          </div>
          <router-link
            class="px-4 py-2 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 rounded-lg text-sm font-medium transition-colors shadow-sm flex items-center gap-2 w-fit"
            to="/crm/client-my-orders"
          >
            <i class="fas fa-file-invoice-dollar text-gray-400"></i>
            我的订单
          </router-link>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          <div
            v-for="p in products"
            :key="p.id"
            class="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden flex flex-col hover:shadow-md transition-shadow"
          >
            <div :class="['h-40 relative flex items-center justify-center overflow-hidden', p.coverClass]">
              <span class="absolute top-3 left-3 bg-black/40 backdrop-blur-sm text-white text-[10px] px-2 py-1 rounded border border-white/20">
                {{ p.typeLabel }}
              </span>
              <i :class="['fas', p.icon, 'text-4xl relative z-10 group-hover:scale-110 transition-transform duration-300', p.iconColor]"></i>
            </div>

            <div class="p-5 flex flex-col flex-1">
              <h3 class="text-lg font-bold text-gray-900">{{ p.name }}</h3>
              <p class="mt-2 text-sm text-gray-500 line-clamp-2 flex-1">
                {{ p.desc }}
              </p>

              <div class="mt-3 flex items-center gap-2">
                <span class="px-2 py-1 bg-gray-50 border border-gray-100 text-gray-600 rounded text-xs flex items-center gap-1">
                  <i class="fas fa-wallet text-gray-400"></i>
                  余额购买
                </span>
              </div>

              <div class="mt-4 pt-4 border-t border-gray-100 flex items-end justify-between gap-4">
                <div class="min-w-0">
                  <span class="text-xs block" :class="p.stock === 0 ? 'text-red-500 font-bold' : 'text-gray-500'">
                    金额 (库存: {{ p.stock }}<template v-if="p.stock === 0"> 售罄</template>)
                  </span>
                  <div
                    class="mt-0.5 text-xl font-bold whitespace-nowrap"
                    :class="p.stock === 0 ? 'text-gray-400 line-through' : 'text-gray-900'"
                  >
                    <span class="text-sm font-normal mr-1" :class="p.stock === 0 ? 'text-gray-400' : 'text-gray-500'">$</span>
                    {{ p.priceLabel }}
                  </div>
                </div>

                <router-link
                  v-if="p.stock > 0"
                  class="shrink-0 px-4 py-2 bg-primary hover:bg-primaryHover text-white rounded-lg text-sm font-medium transition-colors shadow-sm"
                  :to="`/product/detail?id=${p.id}`"
                >
                  查看详情
                </router-link>
                <button
                  v-else
                  class="shrink-0 px-4 py-2 bg-gray-200 text-gray-500 rounded-lg text-sm font-medium cursor-not-allowed"
                  disabled
                >
                  已售罄
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const products = [
  {
    id: 1,
    name: '先锋一号',
    desc: '顶级量化团队操盘，穿越牛熊周期，为您的资产提供稳健的增值托管服务。',
    typeLabel: '虚拟商品',
    coverClass: 'bg-gradient-to-r from-gray-900 to-gray-800',
    icon: 'fa-robot',
    iconColor: 'text-blue-400',
    stock: 999,
    priceLabel: '5,000.00 起'
  },
  {
    id: 2,
    name: '先锋二号',
    desc: '包含 MACD、RSI 多周期共振核心算法源码，支持导入 MT4/MT5 直接使用，无时间限制。',
    typeLabel: '虚拟商品',
    coverClass: 'bg-gradient-to-r from-teal-900 to-teal-800',
    icon: 'fa-code',
    iconColor: 'text-teal-400',
    stock: 9999,
    priceLabel: '800.00'
  },
  {
    id: 3,
    name: '先锋三号',
    desc: '内含定制版机械键盘、保温杯及 2026 年专属交易者台历，彰显尊贵身份。',
    typeLabel: '实体商品',
    coverClass: 'bg-gradient-to-r from-orange-900 to-red-900',
    icon: 'fa-gift',
    iconColor: 'text-orange-300',
    stock: 0,
    priceLabel: '1,500.00'
  },
  {
    id: 4,
    name: '先锋四号',
    desc: '提供每日深度市场解析与专业机构交易信号，助您把握市场先机。',
    typeLabel: '虚拟商品',
    coverClass: 'bg-gradient-to-r from-purple-900 to-indigo-900',
    icon: 'fa-book-open',
    iconColor: 'text-purple-300',
    stock: 50,
    priceLabel: '1,200.00 起'
  }
]
</script>
