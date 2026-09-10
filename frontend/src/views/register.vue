<template>
  <div class="bg-bgDark min-h-screen flex flex-col font-sans relative overflow-hidden text-white antialiased">
    
<div class="pointer-events-none fixed inset-0 overflow-hidden">
<div class="star w-1 h-1 top-[11%] left-[12%] opacity-70"></div>
<div class="star w-1.5 h-1.5 top-[17%] left-[61%] opacity-60"></div>
<div class="star w-2 h-2 top-[28%] left-[79%] opacity-90"></div>
<div class="star w-1 h-1 top-[52%] left-[19%] opacity-50"></div>
<div class="star w-1.5 h-1.5 top-[64%] left-[73%] opacity-70"></div>
<div class="star w-1 h-1 top-[77%] left-[38%] opacity-40"></div>
<div class="earth-horizon"></div>
<div class="earth-glow"></div>
</div>
<!-- 顶部导航条 -->
<header class="w-full h-20 flex justify-between items-center px-6 lg:px-10 absolute top-0 left-0 z-10">
<!-- Logo -->
<div class="text-2xl font-black tracking-wider text-white flex items-center gap-2">
<span class="text-brandCyan"><i class="fa-solid fa-play fa-rotate-270 text-xl"></i></span>
            HATC
        </div>
<!-- 功能按钮与语言切换 -->
<div class="flex items-center gap-4">
<a class="flex items-center gap-1.5 bg-white/5 hover:bg-white/10 text-cyan-100 px-3 py-1.5 rounded-full transition-colors border border-cyan-300/20 text-xs font-medium" data-prd-drawer="" data-prd-title="注册页面PRD" href="#">
<i class="fas fa-file-alt"></i> 查看页面PRD
            </a>
<a class="flex items-center gap-1.5 bg-white/5 hover:bg-white/10 text-gray-200 px-3 py-1.5 rounded-full transition-colors border border-white/10 text-xs font-medium" href="#">
<i class="fas fa-arrow-left"></i> 返回需求看板
            </a>
<!-- 语言切换 -->
<div class="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity ml-2">
<img alt="CN" class="w-5 h-auto rounded-sm" src="https://flagcdn.com/w20/cn.png"/>
<span class="text-sm font-medium">简体中文</span>
<i class="fas fa-chevron-down text-xs ml-1 text-gray-400"></i>
</div>
</div>
</header>
<!-- 主要内容区 -->
<main class="hero-section flex-1 flex items-center justify-center w-full max-w-[1400px] mx-auto px-6 lg:px-10 gap-12 lg:gap-16 pt-24 pb-10">
<!-- 左侧官网风格展示区 -->
<div class="hidden lg:flex flex-1 flex-col justify-center max-w-[760px] relative z-10">
<div class="inline-flex items-center gap-2 w-max rounded-full border border-cyan-400/20 bg-cyan-400/[0.08] px-4 py-2 text-xs tracking-[0.28em] text-cyan-100/90 uppercase">
                HATC CRM Group
            </div>
<h1 class="mt-6 text-5xl xl:text-6xl font-bold tracking-tight leading-[1.05]">
                Change,<br/>
<span class="bg-gradient-to-r from-white via-brandCyan to-brandGreen bg-clip-text text-transparent">Starts from Here.</span>
</h1>
<div class="mt-5 max-w-[560px] space-y-3 text-base xl:text-lg text-slate-300 leading-8">
<p>智能交易，为轻松盈利强势打造。</p>
<p>低门槛开启全球市场，把握更高效的交易机会。</p>
<p>立即注册 HATC，体验更专业、更稳定的交易环境。</p>
</div>
<div class="mt-6 flex flex-wrap gap-3 text-sm">
<span class="rounded-full border border-cyan-300/20 bg-white/5 px-4 py-2 text-cyan-100">标准账户 / USD</span>
<span class="rounded-full border border-emerald-300/20 bg-emerald-400/10 px-4 py-2 text-emerald-200">美分账户 / USC</span>
<span class="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-slate-200">开户注册一体化</span>
</div>
</div>
<!-- 右侧注册表单区 -->
<div class="w-full max-w-[460px] register-panel p-8 md:p-10 rounded-[28px] relative z-10">
<h2 class="text-[30px] font-bold text-white tracking-tight">创建您的 HATC 账户</h2>
<form class="space-y-4">
<!-- 邮箱 -->
<div class="space-y-1">
<label class="block text-sm font-medium text-gray-300"><span class="text-errorRed mr-1">*</span>邮箱</label>
<input class="form-input" placeholder="请输入您的邮箱" type="email"/>
</div>
<!-- 密码 (带有错误状态演示) -->
<div class="space-y-1">
<label class="block text-sm font-medium text-gray-300"><span class="text-errorRed mr-1">*</span>密码</label>
<div class="relative">
<input class="form-input is-error pr-10" placeholder="请输入您的登录密码" type="password"/>
<button class="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300" type="button">
<i class="fas fa-eye-slash text-sm"></i>
</button>
</div>
<p class="text-xs text-errorRed mt-1">请输入您的密码</p>
</div>
<!-- 推荐码 -->
<div class="space-y-1">
<label class="block text-sm font-medium text-gray-300">推荐码</label>
<input class="form-input" placeholder="请填写推荐码" type="text"/>
<p class="text-xs text-gray-400 mt-2">无邀请码，请点击此处：<span class="text-brandCyan hover:text-brandCyanHover cursor-pointer font-medium transition-colors">申请账号</span></p>
</div>
<!-- 账户类型 -->
<div class="space-y-2">
<label class="block text-sm font-medium text-gray-300"><span class="text-errorRed mr-1">*</span>开通交易账户类型</label>
<div class="grid grid-cols-2 gap-3">
<label class="cursor-pointer">
<input class="peer sr-only" name="accountType" type="radio"/>
<div class="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-4 transition-all duration-200 peer-checked:border-brandCyan peer-checked:bg-cyan-400/10 peer-checked:shadow-[0_0_0_1px_rgba(0,229,255,0.16),0_18px_40px_rgba(0,229,255,0.08)]">
<div class="text-sm font-semibold text-white">标准账户</div>
<p class="text-xs text-gray-300 mt-2">USD</p>
</div>
</label>
<label class="cursor-pointer">
<input class="peer sr-only" name="accountType" type="radio"/>
<div class="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-4 transition-all duration-200 peer-checked:border-brandGreen peer-checked:bg-emerald-400/10 peer-checked:shadow-[0_0_0_1px_rgba(17,211,154,0.16),0_18px_40px_rgba(17,211,154,0.08)]">
<div class="text-sm font-semibold text-white">美分账户</div>
<p class="text-xs text-gray-300 mt-2">USC</p>
</div>
</label>
</div>
<p class="text-xs text-gray-400">注册后可继续开通其他交易类型账户。</p>
</div>
<!-- 验证码 -->
<div class="space-y-1">
<label class="block text-sm font-medium text-gray-300"><span class="text-errorRed mr-1">*</span>验证码</label>
<div class="flex gap-3">
<input class="form-input flex-1" placeholder="请输入图片验证码" type="text"/>
<!-- 模拟图形验证码 (与截图高度一致) -->
<div class="w-[100px] h-[52px] rounded-2xl overflow-hidden cursor-pointer flex items-center justify-center shrink-0 relative border border-cyan-300/20 bg-[linear-gradient(135deg,#0d2a5e,#13397b)]">
<span class="text-cyan-100 font-serif font-bold tracking-widest text-xl transform skew-x-12 opacity-90 z-10">wVXm</span>
<!-- 模拟干扰线 -->
<div class="absolute w-[120%] h-[2px] bg-cyan-300/40 rotate-12 top-4 -left-2 z-0"></div>
<div class="absolute w-[120%] h-[1px] bg-emerald-300/50 rotate-[-15deg] bottom-3 -left-2 z-0"></div>
</div>
</div>
</div>
<!-- 注册按钮 -->
<button class="w-full bg-gradient-to-r from-brandBlue to-brandBlueDark hover:from-[#08c6f1] hover:to-[#0495c1] text-white font-bold py-3.5 rounded-2xl transition-all duration-200 mt-6 shadow-[0_16px_36px_rgba(0,180,219,0.28)]" type="button">
                    提交注册
                </button>
<!-- 底部辅助信息 -->
<div class="flex flex-col gap-3 text-sm mt-4">
<div class="text-gray-400">
                        已有账号？ <a class="text-brandCyan hover:text-brandCyanHover font-medium transition-colors" href="#">登录</a>
</div>
<label class="flex items-center gap-2 cursor-pointer group">
<div class="relative flex items-center justify-center w-4 h-4 rounded border border-gray-500 bg-transparent group-hover:border-brandCyan transition-colors">
<input checked="" class="peer absolute opacity-0 w-full h-full cursor-pointer" type="checkbox"/>
<i class="fas fa-check text-[10px] text-brandCyan opacity-0 peer-checked:opacity-100 transition-opacity"></i>
</div>
<span class="text-gray-400 text-xs">
<a class="text-brandCyan hover:underline" href="#">《注册条款》</a>我本人知晓和同意上述所有条款
                        </span>
</label>
</div>
</form>
</div>
</main>
<!-- 右下角悬浮客服按钮 -->
<button class="absolute bottom-8 right-8 w-14 h-14 bg-[linear-gradient(135deg,#0fc3e8,#0f7db8)] rounded-full shadow-[0_0_24px_rgba(0,229,255,0.3)] flex items-center justify-center hover:scale-110 transition-transform z-20 group border border-cyan-200/30">
<i class="fas fa-headset text-2xl text-white group-hover:text-cyan-50 transition-colors"></i>
</button>
<!-- 试用账户申请弹窗 -->
<div class="fixed inset-0 bg-black/60 z-[100] hidden flex items-center justify-center backdrop-blur-sm transition-opacity duration-300 opacity-0 text-gray-800 font-sans" id="applyModal">
<div class="bg-white w-[560px] rounded shadow-2xl flex flex-col overflow-hidden transform scale-95 transition-transform duration-300" id="applyModalContent">
<!-- Header -->
<div class="h-12 bg-[#333333] flex items-center justify-between px-4 shrink-0 relative">
<h3 class="text-white font-medium text-center w-full">留下资料</h3>
<button class="text-white hover:text-gray-300 absolute right-4">
<i class="fas fa-times text-lg"></i>
</button>
</div>
<!-- Body -->
<div class="p-8 pb-4">
<p class="text-sm text-gray-700 mb-6">信息提交后，我们的顾问会在2个工作日内与您联系</p>
<div class="space-y-4">
<!-- 姓名 -->
<div class="flex border border-gray-300 rounded-sm overflow-hidden">
<div class="w-28 bg-gray-50 flex items-center justify-center border-r border-gray-300 text-gray-700 text-sm"><span class="text-red-500 mr-1">*</span>姓名</div>
<input class="flex-1 px-3 py-2 text-sm outline-none focus:bg-gray-50 transition-colors" placeholder="请输入" type="text"/>
</div>
<!-- 联系电话 -->
<div class="flex border border-gray-300 rounded-sm overflow-hidden">
<div class="w-28 bg-gray-50 flex items-center justify-center border-r border-gray-300 text-gray-700 text-sm"><span class="text-red-500 mr-1">*</span>联系电话</div>
<input class="flex-1 px-3 py-2 text-sm outline-none focus:bg-gray-50 transition-colors" placeholder="请输入" type="text"/>
</div>
<!-- 电子邮箱 -->
<div class="flex border border-gray-300 rounded-sm overflow-hidden">
<div class="w-28 bg-gray-50 flex items-center justify-center border-r border-gray-300 text-gray-700 text-sm"><span class="text-red-500 mr-1">*</span>电子邮箱</div>
<input class="flex-1 px-3 py-2 text-sm outline-none focus:bg-gray-50 transition-colors" placeholder="请输入" required="" type="email"/>
</div>
<!-- 信息来源 -->
<div class="flex border border-gray-300 rounded-sm overflow-hidden mt-4">
<div class="w-28 bg-gray-50 flex items-center justify-center border-r border-gray-300 text-gray-700 text-sm px-2"><span class="text-red-500 mr-1">*</span>信息来源</div>
<select class="flex-1 px-3 py-2 text-sm outline-none cursor-pointer bg-white focus:bg-gray-50 transition-colors text-gray-600" required="">
<option value="">请选择</option>
<option value="website">官网访问</option>
<option value="social">社交平台</option>
<option value="referral">客户推荐</option>
<option value="online_event">线上活动</option>
<option value="offline_event">线下金融活动</option>
<option value="news_site">金融资讯网站</option>
<option value="other">其他渠道</option>
</select>
</div>
<!-- 咨询内容 -->
<div class="flex border border-gray-300 rounded-sm overflow-hidden mt-4">
<div class="w-28 bg-gray-50 flex items-center justify-center border-r border-gray-300 text-gray-700 text-sm px-2">咨询内容</div>
<select class="flex-1 px-3 py-2 text-sm outline-none cursor-pointer bg-white focus:bg-gray-50 transition-colors text-gray-600">
<option value="">请选择</option>
<option value="1">成为代理</option>
<option value="2">政策了解</option>
<option value="3">个人交易</option>
<option value="4">其他</option>
</select>
</div>
<!-- 微信 -->
<div class="flex border border-gray-300 rounded-sm overflow-hidden mt-4">
<div class="w-28 bg-gray-50 flex items-center justify-center border-r border-gray-300 text-gray-700 text-sm px-2">微信</div>
<input class="flex-1 px-3 py-2 text-sm outline-none focus:bg-gray-50 transition-colors min-w-0" placeholder="请输入（非必填）" type="text"/>
</div>
<!-- WhatsApp -->
<div class="flex border border-gray-300 rounded-sm overflow-hidden mt-4">
<div class="w-28 bg-gray-50 flex items-center justify-center border-r border-gray-300 text-gray-700 text-sm px-2">WhatsApp</div>
<input class="flex-1 px-3 py-2 text-sm outline-none focus:bg-gray-50 transition-colors min-w-0" placeholder="请输入（非必填）" type="text"/>
</div>
<!-- 其他联系方式 -->
<div class="flex border border-gray-300 rounded-sm overflow-hidden mt-4 mb-4">
<div class="w-28 bg-gray-50 flex items-center justify-center border-r border-gray-300 text-gray-700 text-sm px-2">其他联系方式</div>
<input class="flex-1 px-3 py-2 text-sm outline-none focus:bg-gray-50 transition-colors min-w-0" placeholder="请输入（非必填）" type="text"/>
</div>
<!-- 验证码 -->
<div class="flex border border-gray-300 rounded-sm overflow-hidden h-10">
<div class="w-28 bg-gray-50 flex items-center justify-center border-r border-gray-300 text-gray-700 text-sm shrink-0"><span class="text-red-500 mr-1">*</span>验证码</div>
<input class="flex-1 px-3 py-2 text-sm outline-none focus:bg-gray-50 transition-colors min-w-0" placeholder="请输入" type="text"/>
<!-- 图形验证码 -->
<div class="w-[120px] bg-[#e6e8fa] border-l border-gray-300 cursor-pointer flex items-center justify-center shrink-0 relative overflow-hidden">
<span class="text-[#2b358e] font-serif font-bold tracking-widest text-lg transform skew-x-12 z-10">eXp9</span>
<div class="absolute w-[150%] h-[1px] bg-red-400 rotate-12 z-0"></div>
<div class="absolute w-[150%] h-[1px] bg-yellow-600 rotate-[-15deg] z-0"></div>
</div>
</div>
</div>
</div>
<!-- Footer -->
<div class="p-6 pt-2 flex justify-center gap-6">
<button class="px-10 py-2 border border-blue-500 text-blue-500 rounded hover:bg-blue-50 transition-colors text-sm bg-white">取消</button>
<button class="px-10 py-2 bg-[#3b82f6] text-white rounded hover:bg-blue-600 transition-colors text-sm border border-[#3b82f6]">提交</button>
</div>
</div>
</div>
<!-- 自定义 Alert 弹窗 -->
<div class="fixed inset-0 z-[200] hidden flex items-center justify-center transition-opacity duration-300 opacity-0" id="customAlert">
<div class="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>
<div class="bg-white rounded-lg shadow-xl p-6 w-[90%] max-w-[320px] text-center transform scale-95 transition-all duration-300 relative z-10" id="customAlertContent">
<div class="w-12 h-12 rounded-full bg-green-100 mx-auto flex items-center justify-center mb-4">
<i class="fa-solid fa-check text-2xl text-green-500"></i>
</div>
<p class="text-gray-800 font-medium mb-6">您的资料已提交，请注意邮箱信息</p>
<button class="w-full py-2.5 bg-[#1e40af] hover:bg-blue-800 text-white font-bold rounded transition-colors text-sm shadow-sm">
                确定
            </button>
</div>
</div>
<script>
        // 试用账户申请弹窗逻辑
        const applyModal = document.getElementById('applyModal');
        const applyModalContent = document.getElementById('applyModalContent');
        const customAlert = document.getElementById('customAlert');
        const customAlertContent = document.getElementById('customAlertContent');

        function openApplyModal() {
            applyModal.classList.remove('hidden');
            setTimeout(() => {
                applyModal.classList.remove('opacity-0');
                applyModalContent.classList.remove('scale-95');
                applyModalContent.classList.add('scale-100');
            }, 10);
        }

        function closeApplyModal() {
            applyModal.classList.add('opacity-0');
            applyModalContent.classList.remove('scale-100');
            applyModalContent.classList.add('scale-95');
            setTimeout(() => { applyModal.classList.add('hidden'); }, 300);
        }

        function closeCustomAlert() {
            customAlert.classList.add('opacity-0');
            customAlertContent.classList.remove('scale-100');
            customAlertContent.classList.add('scale-95');
            setTimeout(() => { customAlert.classList.add('hidden'); }, 300);
        }

        function submitApply(e) {
            e.preventDefault();
            closeApplyModal();
            setTimeout(() => {
                customAlert.classList.remove('hidden');
                setTimeout(() => {
                    customAlert.classList.remove('opacity-0');
                    customAlertContent.classList.remove('scale-95');
                    customAlertContent.classList.add('scale-100');
                }, 10);
            }, 300);
        }
    </script>

  </div>
</template>

<script setup>
</script>
