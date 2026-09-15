<template>
  <div class="bg-bgDark min-h-screen flex flex-col font-sans relative overflow-hidden text-white">
    
<!-- 顶部导航条 -->
<header class="w-full h-16 flex justify-between items-center px-8 absolute top-0 left-0 z-10">
<!-- Logo -->
<div class="text-2xl font-black tracking-wider text-white">HATC</div>
<!-- 语言切换 -->
<div class="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity">
<img alt="CN" class="w-5 h-auto rounded-sm" src="https://flagcdn.com/w20/cn.png"/>
<span class="text-sm font-medium">简体中文</span>
<i class="fas fa-chevron-down text-xs ml-1 text-gray-400"></i>
</div>
</header>
<!-- 主要内容区 -->
<main class="flex-1 flex items-center justify-center w-full max-w-7xl mx-auto px-4 gap-20">
<!-- 左侧插画区 -->
<div class="hidden lg:flex flex-1 justify-center items-center">
<!-- 这里用一个占位的抽象图形容器来模拟截图中的 3D 资产元素 -->
<div class="relative w-[500px] h-[400px]">
<!-- 模拟背景波浪 -->
<svg class="absolute top-10 -left-10 w-[600px] h-[300px] opacity-20" preserveaspectratio="none" viewbox="0 0 100 50">
<path d="M0,25 C20,0 30,50 50,25 C70,0 80,50 100,25" fill="none" stroke="white" stroke-width="0.5"></path>
<path d="M0,35 C20,10 30,60 50,35 C70,10 80,60 100,35" fill="none" stroke="white" stroke-width="0.2"></path>
</svg>
<!-- 模拟主图卡片 -->
<div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[350px] h-[280px] bg-gradient-to-br from-yellow-100 to-yellow-600 rounded-xl shadow-2xl rotate-[-15deg] opacity-90 flex items-center justify-center overflow-hidden">
<div class="w-[80%] h-[80%] bg-white/20 backdrop-blur-sm rounded-lg border border-white/30 flex flex-col items-center justify-center gap-4">
<div class="w-16 h-16 rounded-full bg-white/30 flex items-center justify-center"><i class="fas fa-user text-3xl text-yellow-800"></i></div>
<div class="w-3/4 h-3 bg-white/40 rounded-full"></div>
<div class="w-1/2 h-3 bg-white/40 rounded-full"></div>
</div>
</div>
<!-- 模拟悬浮元素 -->
<div class="absolute bottom-10 left-10 w-24 h-24 bg-panelDark rounded-2xl shadow-xl flex items-center justify-center border border-gray-700">
<i class="fas fa-chart-bar text-4xl text-brandYellow"></i>
</div>
<div class="absolute top-20 right-0 w-32 h-16 bg-gradient-to-r from-orange-300 to-orange-500 rounded-lg shadow-lg rotate-[10deg] opacity-80"></div>
</div>
</div>
<!-- 右侧登录表单区 -->
<div class="w-full max-w-[420px] bg-panelDark p-10 rounded-2xl shadow-2xl border border-gray-700/50 relative z-10">
<h2 class="text-2xl font-bold mb-8 text-white">登录 HATC</h2>
<form class="space-y-6">
<!-- 邮箱 -->
<div class="space-y-2">
<label class="block text-sm font-medium text-gray-300">邮箱</label>
<input class="w-full bg-inputBg border border-transparent focus:border-brandYellow text-white text-sm rounded-lg px-4 py-3.5 outline-none transition-colors placeholder-gray-500" placeholder="请输入邮箱" type="email"/>
</div>
<!-- 密码 -->
<div class="space-y-2">
<label class="block text-sm font-medium text-gray-300">密码</label>
<div class="relative">
<input class="w-full bg-inputBg border border-transparent focus:border-brandYellow text-white text-sm rounded-lg px-4 py-3.5 outline-none transition-colors placeholder-gray-500 pr-10" placeholder="请输入登录密码" type="password"/>
<button class="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300" type="button">
<i class="fas fa-eye-slash text-sm"></i>
</button>
</div>
</div>
<!-- 验证码 -->
<div class="space-y-2">
<label class="block text-sm font-medium text-gray-300">验证码</label>
<div class="flex gap-3">
<input class="flex-1 bg-inputBg border border-transparent focus:border-brandYellow text-white text-sm rounded-lg px-4 py-3.5 outline-none transition-colors placeholder-gray-500" placeholder="请输入验证码" type="text"/>
<!-- 模拟图形验证码 -->
<div class="w-[100px] h-[48px] bg-white rounded-lg overflow-hidden cursor-pointer flex items-center justify-center shrink-0 border border-gray-600">
<span class="text-gray-800 font-mono font-bold tracking-widest text-lg transform rotate-[-5deg] skew-x-12 opacity-80" style="text-shadow: 2px 2px 4px rgba(0,0,0,0.2);">2815</span>
<!-- 模拟干扰线 -->
<div class="absolute w-full h-[1px] bg-red-400 rotate-12"></div>
<div class="absolute w-full h-[1px] bg-blue-400 rotate-[-15deg]"></div>
</div>
</div>
</div>
<!-- 登录按钮 -->
<button class="w-full bg-brandYellow hover:bg-brandYellowHover text-gray-900 font-bold py-3.5 rounded-lg transition-colors mt-2 shadow-lg shadow-yellow-500/20 disabled:opacity-75 disabled:cursor-not-allowed" type="button" :disabled="isSubmitting" @click="handleLogin">
<span v-if="isSubmitting"><i class="fas fa-spinner fa-spin"></i> 登录中...</span>
<span v-else>登录</span>
</button>
<!-- 底部辅助链接 -->
<div class="flex justify-between items-center text-sm mt-6">
<div class="text-gray-400">
                        没有账号？ <router-link class="text-brandYellow hover:text-brandYellowHover font-medium transition-colors" to="/register">去注册</router-link>
</div>
<button class="text-gray-400 hover:text-white transition-colors" type="button">
  忘记密码
</button>
</div>
</form>
</div>
</main>
<!-- 右下角悬浮客服按钮 -->
<button class="absolute bottom-8 right-8 w-14 h-14 bg-white rounded-full shadow-[0_0_20px_rgba(255,255,255,0.3)] flex items-center justify-center hover:scale-110 transition-transform z-20 group">
<i class="fas fa-headset text-2xl text-gray-800 group-hover:text-brandYellow transition-colors"></i>
</button>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const router = useRouter()
const route = useRoute()

const isSubmitting = ref(false)

const normalizeRedirect = (value) => {
  const raw = String(value || '').trim()
  if (!raw) return ''
  if (raw.startsWith('#/')) return raw.slice(1)
  if (raw.startsWith('/')) return raw
  if (raw === 'admin-home.html') return '/home'
  return ''
}

const handleLogin = async () => {
  if (isSubmitting.value) return
  isSubmitting.value = true
  const redirect = normalizeRedirect(route.query.redirect)

  window.setTimeout(() => {
    router.push(redirect || '/home')
    isSubmitting.value = false
  }, 800)
}
</script>
