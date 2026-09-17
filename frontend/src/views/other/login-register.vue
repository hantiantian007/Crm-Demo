<template>
  <div class="lr-host">
    <div class="lr-shell">
      <div class="lr-layout">
        <section class="lr-promo hidden lg:flex">
          <div class="lr-promo-card">
            <div class="lr-promo-decor lr-promo-decor-1"></div>
            <div class="lr-promo-decor lr-promo-decor-2"></div>
            <div class="lr-promo-decor lr-promo-decor-3"></div>

            <div class="lr-logo">
              <div class="lr-logo-mark">HATC</div>
              <div class="lr-logo-sub">CRM Demo</div>
            </div>

            <div class="lr-promo-title">
              值得信赖的
              <span class="lr-accent">国际化平台</span>
            </div>

            <div class="lr-pill">改变 从这里开始</div>
          </div>
        </section>

        <section class="lr-form">
          <div class="lr-lang">
            <select v-model="lang" class="lr-lang-select">
              <option value="zh-CN">简体中文</option>
              <option value="zh-TW">繁體中文</option>
              <option value="en">English</option>
            </select>
          </div>

          <div class="lr-card">
            <div class="lr-card-head">
              <div class="lr-card-title">{{ mode === 'login' ? '登录' : '注册' }}</div>
              <div class="lr-card-sub">
                <span v-if="mode === 'login'">欢迎回来，请输入您的账号信息</span>
                <span v-else>创建您的账号，开始体验平台服务</span>
              </div>
            </div>

            <form v-if="mode === 'login'" class="lr-form-body" @submit.prevent>
              <div class="lr-field">
                <label class="lr-label">邮箱</label>
                <input v-model="loginForm.email" class="lr-input" placeholder="请输入邮箱" />
              </div>

              <div class="lr-field">
                <label class="lr-label">密码</label>
                <div class="lr-input-wrap">
                  <input v-model="loginForm.password" class="lr-input lr-input-password" :type="showLoginPassword ? 'text' : 'password'" placeholder="请输入登录密码" />
                  <button class="lr-eye" type="button" @click="showLoginPassword = !showLoginPassword">
                    <i :class="showLoginPassword ? 'fa-regular fa-eye' : 'fa-regular fa-eye-slash'"></i>
                  </button>
                </div>
              </div>

              <div class="lr-field">
                <label class="lr-label">验证码</label>
                <div class="lr-captcha-row">
                  <input v-model="loginForm.captchaInput" class="lr-input lr-captcha-input" placeholder="请输入验证码" />
                  <button class="lr-captcha" type="button" @click="refreshCaptcha('login')">
                    <span class="lr-captcha-text">{{ loginCaptcha }}</span>
                  </button>
                </div>
              </div>

              <button class="lr-btn lr-btn-primary" type="button" @click="handleLogin">立即登录</button>

              <div class="lr-links">
                <button class="lr-link" type="button" @click="mode = 'register'">注册</button>
                <button class="lr-link" type="button" @click="handleForgotPassword">忘记密码</button>
              </div>
            </form>

            <form v-else class="lr-form-body" @submit.prevent>
              <div class="lr-field">
                <label class="lr-label">交易账户类型</label>
                <div class="lr-segment">
                  <button class="lr-seg-btn" :class="registerForm.accountType === 'usd' ? 'is-active' : ''" type="button" @click="registerForm.accountType = 'usd'">
                    标准账户 / USD
                  </button>
                  <button class="lr-seg-btn" :class="registerForm.accountType === 'usc' ? 'is-active' : ''" type="button" @click="registerForm.accountType = 'usc'">
                    美分账户 / USC
                  </button>
                </div>
              </div>

              <div class="lr-field">
                <label class="lr-label">邮箱</label>
                <input v-model="registerForm.email" class="lr-input" placeholder="请输入邮箱" />
              </div>

              <div class="lr-field">
                <label class="lr-label">登录密码</label>
                <div class="lr-input-wrap">
                  <input v-model="registerForm.password" class="lr-input lr-input-password" :type="showRegisterPassword ? 'text' : 'password'" placeholder="请输入登录密码" />
                  <button class="lr-eye" type="button" @click="showRegisterPassword = !showRegisterPassword">
                    <i :class="showRegisterPassword ? 'fa-regular fa-eye' : 'fa-regular fa-eye-slash'"></i>
                  </button>
                </div>
              </div>

              <div class="lr-field">
                <label class="lr-label">推荐码</label>
                <input v-model="registerForm.referralCode" class="lr-input" placeholder="请填写推荐码" />
                <div class="lr-hint">
                  无邀请码，请点击此处：
                  <button class="lr-link-inline" type="button" @click="openApplyModal">申请账号</button>
                </div>
              </div>

              <div class="lr-field">
                <label class="lr-label">验证码</label>
                <div class="lr-captcha-row">
                  <input v-model="registerForm.captchaInput" class="lr-input lr-captcha-input" placeholder="请输入验证码" />
                  <button class="lr-captcha" type="button" @click="refreshCaptcha('register')">
                    <span class="lr-captcha-text">{{ registerCaptcha }}</span>
                  </button>
                </div>
              </div>

              <button class="lr-btn lr-btn-primary" type="button" @click="handleRegister">立即注册</button>

              <div class="lr-terms">
                <input v-model="registerForm.agreed" class="lr-check" type="checkbox" />
                <div class="lr-terms-text">
                  <button class="lr-link-inline" type="button" @click="openTermsModal">《注册条款》</button>
                  <span class="lr-terms-desc">我本人知晓和同意上述所有条款</span>
                </div>
              </div>

              <div class="lr-bottom">
                已有账号？
                <button class="lr-link-inline" type="button" @click="mode = 'login'">登录</button>
              </div>
            </form>
          </div>
        </section>
      </div>
    </div>

    <div v-if="termsModalVisible" class="lr-modal-mask" @click.self="termsModalVisible = false">
      <div class="lr-modal">
        <div class="lr-modal-title">注册条款（演示）</div>
        <div class="lr-modal-body">
          <div class="lr-modal-text">
            1. 本页面仅用于演示新版登录注册视觉与交互。\n
            2. 不会连接真实接口，不会保存您的邮箱与密码。\n
            3. 提交按钮仅做必填校验，提示为演示效果。
          </div>
        </div>
        <div class="lr-modal-actions">
          <button class="lr-btn lr-btn-primary" type="button" @click="acceptTerms">我已阅读并同意</button>
        </div>
      </div>
    </div>

    <div v-if="applyModalVisible" class="lr-modal-mask" @click.self="applyModalVisible = false">
      <div class="lr-modal lr-modal-wide">
        <div class="lr-modal-title">留下资料</div>
        <div class="lr-modal-sub">信息提交后，我们的顾问会在2个工作日内与您联系。</div>
        <div class="lr-modal-body">
          <div class="lr-apply-grid">
            <div class="lr-field">
              <label class="lr-label">姓名</label>
              <input v-model="applyForm.name" class="lr-input" placeholder="请输入姓名" />
            </div>
            <div class="lr-field">
              <label class="lr-label">手机号</label>
              <input v-model="applyForm.phone" class="lr-input" placeholder="请输入手机号" />
            </div>
            <div class="lr-field">
              <label class="lr-label">邮箱</label>
              <input v-model="applyForm.email" class="lr-input" placeholder="请输入邮箱" />
            </div>
            <div class="lr-field">
              <label class="lr-label">您从哪里了解到我们</label>
              <input v-model="applyForm.source" class="lr-input" placeholder="请输入来源" />
            </div>
            <div class="lr-field lr-field-span">
              <label class="lr-label">咨询内容</label>
              <input v-model="applyForm.consult" class="lr-input" placeholder="请输入咨询内容" />
            </div>
            <div class="lr-field">
              <label class="lr-label">微信</label>
              <input v-model="applyForm.wechat" class="lr-input" placeholder="请输入微信" />
            </div>
            <div class="lr-field">
              <label class="lr-label">WhatsApp</label>
              <input v-model="applyForm.whatsapp" class="lr-input" placeholder="请输入 WhatsApp" />
            </div>
            <div class="lr-field">
              <label class="lr-label">其他联系方式</label>
              <input v-model="applyForm.otherContact" class="lr-input" placeholder="请输入其他联系方式" />
            </div>
            <div class="lr-field">
              <label class="lr-label">验证码</label>
              <div class="lr-captcha-row">
                <input v-model="applyForm.captchaInput" class="lr-input lr-captcha-input" placeholder="请输入验证码" />
                <button class="lr-captcha" type="button" @click="refreshCaptcha('apply')">
                  <span class="lr-captcha-text">{{ applyCaptcha }}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div class="lr-modal-actions lr-modal-actions-right">
          <button class="lr-btn lr-btn-primary" type="button" @click="handleApplySubmit">提交申请</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { ElMessage } from 'element-plus'

const lang = ref('zh-CN')
const mode = ref('login')

const showLoginPassword = ref(false)
const showRegisterPassword = ref(false)

const loginForm = reactive({
  email: '',
  password: '',
  captchaInput: '',
})

const registerForm = reactive({
  accountType: 'usd',
  email: '',
  password: '',
  referralCode: '',
  captchaInput: '',
  agreed: false,
})

const applyForm = reactive({
  name: '',
  phone: '',
  email: '',
  source: '',
  consult: '',
  wechat: '',
  whatsapp: '',
  otherContact: '',
  captchaInput: '',
})

const loginCaptcha = ref('')
const registerCaptcha = ref('')
const applyCaptcha = ref('')

const termsModalVisible = ref(false)
const applyModalVisible = ref(false)

const randomCaptcha = () => {
  const n = Math.floor(1000 + Math.random() * 9000)
  return String(n)
}

const refreshCaptcha = (target) => {
  if (target === 'login') loginCaptcha.value = randomCaptcha()
  if (target === 'register') registerCaptcha.value = randomCaptcha()
  if (target === 'apply') applyCaptcha.value = randomCaptcha()
}

refreshCaptcha('login')
refreshCaptcha('register')
refreshCaptcha('apply')

const requireFields = (pairs) => {
  for (const [k, v] of pairs) {
    if (!String(v || '').trim()) {
      ElMessage({ message: `请填写${k}`, type: 'warning' })
      return false
    }
  }
  return true
}

const handleLogin = () => {
  const ok = requireFields([
    ['邮箱', loginForm.email],
    ['登录密码', loginForm.password],
    ['验证码', loginForm.captchaInput],
  ])
  if (!ok) return
  ElMessage({ message: '登录功能为演示效果', type: 'success' })
}

const handleRegister = () => {
  const ok = requireFields([
    ['邮箱', registerForm.email],
    ['登录密码', registerForm.password],
    ['验证码', registerForm.captchaInput],
  ])
  if (!ok) return
  if (!registerForm.agreed) {
    ElMessage({ message: '请先阅读并同意注册条款', type: 'warning' })
    return
  }
  ElMessage({ message: '注册功能为演示效果', type: 'success' })
}

const handleForgotPassword = () => {
  ElMessage({ message: '忘记密码流程待补充', type: 'info' })
}

const openTermsModal = () => {
  termsModalVisible.value = true
}

const acceptTerms = () => {
  registerForm.agreed = true
  termsModalVisible.value = false
}

const openApplyModal = () => {
  applyModalVisible.value = true
  applyForm.captchaInput = ''
  refreshCaptcha('apply')
}

const handleApplySubmit = () => {
  const ok = requireFields([
    ['姓名', applyForm.name],
    ['手机号', applyForm.phone],
    ['邮箱', applyForm.email],
    ['验证码', applyForm.captchaInput],
  ])
  if (!ok) return
  ElMessage({ message: '申请资料已提交（演示）', type: 'success' })
  applyModalVisible.value = false
}
</script>

<style scoped>
.lr-host {
  margin: -16px;
  min-height: 100%;
  background: #030e1d;
  color: #ffffff;
}

.lr-shell {
  min-height: 100%;
  padding: 28px 20px;
}

.lr-layout {
  max-width: 1120px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr;
  gap: 22px;
}

@media (min-width: 1024px) {
  .lr-layout {
    grid-template-columns: 1fr 460px;
    gap: 28px;
    align-items: stretch;
  }
}

.lr-promo {
  position: relative;
}

.lr-promo-card {
  position: relative;
  border-radius: 12px;
  background: radial-gradient(1000px 500px at 0% 0%, rgba(0, 255, 136, 0.12), transparent 60%),
    radial-gradient(800px 400px at 80% 20%, rgba(0, 183, 255, 0.1), transparent 55%),
    linear-gradient(180deg, rgba(16, 26, 41, 0.9), rgba(4, 12, 25, 0.9));
  border: 1px solid rgba(255, 255, 255, 0.08);
  overflow: hidden;
  padding: 34px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.lr-promo-decor {
  position: absolute;
  border-radius: 999px;
  filter: blur(0px);
  opacity: 0.9;
}

.lr-promo-decor-1 {
  width: 220px;
  height: 220px;
  background: radial-gradient(circle at 30% 30%, rgba(0, 255, 136, 0.28), rgba(0, 255, 136, 0));
  left: -60px;
  top: -60px;
}

.lr-promo-decor-2 {
  width: 260px;
  height: 260px;
  background: radial-gradient(circle at 40% 40%, rgba(0, 183, 255, 0.18), rgba(0, 183, 255, 0));
  right: -80px;
  bottom: -90px;
}

.lr-promo-decor-3 {
  width: 140px;
  height: 140px;
  background: radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0));
  right: 40px;
  top: 40px;
}

.lr-logo {
  margin-bottom: 22px;
}

.lr-logo-mark {
  font-size: 44px;
  font-weight: 900;
  letter-spacing: 2px;
  color: #ffffff;
}

.lr-logo-sub {
  margin-top: 6px;
  font-size: 14px;
  color: rgba(186, 205, 228, 0.7);
}

.lr-promo-title {
  font-size: 28px;
  font-weight: 800;
  line-height: 1.25;
  color: rgba(255, 255, 255, 0.95);
  margin-bottom: 18px;
}

.lr-accent {
  color: #00ff88;
}

.lr-pill {
  display: inline-flex;
  align-items: center;
  align-self: flex-start;
  padding: 10px 16px;
  border-radius: 999px;
  font-size: 13px;
  font-weight: 700;
  color: rgba(255, 255, 255, 0.92);
  background: rgba(0, 255, 136, 0.14);
  border: 1px solid rgba(0, 255, 136, 0.22);
}

.lr-form {
  position: relative;
}

.lr-lang {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 12px;
}

.lr-lang-select {
  height: 40px;
  border-radius: 10px;
  padding: 0 12px;
  background: rgba(16, 26, 41, 0.75);
  color: rgba(255, 255, 255, 0.92);
  border: 1px solid rgba(255, 255, 255, 0.12);
  outline: none;
}

.lr-card {
  border-radius: 12px;
  background: #101a29;
  border: 1px solid rgba(255, 255, 255, 0.08);
  padding: 28px 26px;
}

.lr-card-head {
  margin-bottom: 18px;
}

.lr-card-title {
  font-size: 28px;
  font-weight: 800;
  letter-spacing: 1px;
}

.lr-card-sub {
  margin-top: 8px;
  font-size: 14px;
  color: rgba(186, 205, 228, 0.75);
}

.lr-form-body {
  display: grid;
  gap: 16px;
}

.lr-field {
  display: grid;
  gap: 8px;
}

.lr-label {
  font-size: 13px;
  color: rgba(186, 205, 228, 0.85);
}

.lr-input {
  height: 60px;
  border-radius: 12px;
  background: #1c2634;
  border: 1px solid rgba(255, 255, 255, 0.08);
  padding: 0 16px;
  color: rgba(255, 255, 255, 0.95);
  outline: none;
}

.lr-input::placeholder {
  color: rgba(186, 205, 228, 0.55);
}

.lr-input:focus {
  border-color: rgba(0, 255, 136, 0.55);
  box-shadow: 0 0 0 4px rgba(0, 255, 136, 0.12);
}

.lr-input-wrap {
  position: relative;
}

.lr-input-password {
  padding-right: 52px;
}

.lr-eye {
  position: absolute;
  right: 14px;
  top: 50%;
  transform: translateY(-50%);
  width: 36px;
  height: 36px;
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  background: rgba(16, 26, 41, 0.6);
  color: rgba(186, 205, 228, 0.85);
}

.lr-eye:hover {
  color: #00ff88;
}

.lr-captcha-row {
  display: grid;
  grid-template-columns: 1fr 140px;
  gap: 12px;
  align-items: center;
}

.lr-captcha-input {
  height: 60px;
}

.lr-captcha {
  height: 60px;
  border-radius: 12px;
  background: rgba(0, 255, 136, 0.12);
  border: 1px solid rgba(0, 255, 136, 0.28);
  color: #00ff88;
  font-weight: 900;
  letter-spacing: 4px;
}

.lr-captcha-text {
  display: inline-block;
  transform: rotate(-4deg);
}

.lr-btn {
  height: 60px;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 800;
  width: 100%;
}

.lr-btn-primary {
  background: #00ff88;
  color: #030e1d;
}

.lr-btn-primary:hover {
  background: rgba(0, 255, 136, 0.85);
}

.lr-links {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  margin-top: 6px;
}

.lr-link {
  font-size: 14px;
  color: rgba(186, 205, 228, 0.8);
}

.lr-link:hover {
  color: #00ff88;
}

.lr-link-inline {
  font-size: 14px;
  color: #00ff88;
  font-weight: 700;
}

.lr-link-inline:hover {
  text-decoration: underline;
}

.lr-hint {
  font-size: 13px;
  color: rgba(186, 205, 228, 0.75);
  margin-top: 6px;
}

.lr-segment {
  display: grid;
  grid-template-columns: 1fr 1fr;
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(28, 38, 52, 0.7);
}

.lr-seg-btn {
  height: 52px;
  font-size: 13px;
  font-weight: 800;
  color: rgba(186, 205, 228, 0.85);
}

.lr-seg-btn.is-active {
  background: rgba(0, 255, 136, 0.16);
  color: #00ff88;
}

.lr-seg-btn:not(.is-active):hover {
  background: rgba(255, 255, 255, 0.06);
  color: rgba(255, 255, 255, 0.92);
}

.lr-terms {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  margin-top: 4px;
}

.lr-check {
  width: 18px;
  height: 18px;
  accent-color: #00ff88;
  margin-top: 3px;
}

.lr-terms-text {
  display: grid;
  gap: 6px;
}

.lr-terms-desc {
  font-size: 13px;
  color: rgba(186, 205, 228, 0.8);
}

.lr-bottom {
  margin-top: 8px;
  font-size: 14px;
  color: rgba(186, 205, 228, 0.8);
  text-align: center;
}

.lr-modal-mask {
  position: fixed;
  inset: 0;
  background: rgba(3, 14, 29, 0.72);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  z-index: 2000;
}

.lr-modal {
  width: min(520px, 100%);
  border-radius: 12px;
  background: #101a29;
  border: 1px solid rgba(255, 255, 255, 0.1);
  padding: 22px;
  box-shadow: 0 18px 60px rgba(0, 0, 0, 0.45);
}

.lr-modal-wide {
  width: min(860px, 100%);
}

.lr-modal-title {
  font-size: 18px;
  font-weight: 900;
  letter-spacing: 0.5px;
}

.lr-modal-sub {
  margin-top: 8px;
  font-size: 13px;
  color: rgba(186, 205, 228, 0.75);
}

.lr-modal-body {
  margin-top: 16px;
}

.lr-modal-text {
  white-space: pre-line;
  font-size: 14px;
  color: rgba(186, 205, 228, 0.9);
  line-height: 1.6;
}

.lr-modal-actions {
  margin-top: 18px;
  display: flex;
  justify-content: center;
}

.lr-modal-actions-right {
  justify-content: flex-end;
}

.lr-apply-grid {
  display: grid;
  gap: 14px;
  grid-template-columns: 1fr;
}

@media (min-width: 768px) {
  .lr-apply-grid {
    grid-template-columns: 1fr 1fr;
  }
}

.lr-field-span {
  grid-column: 1 / -1;
}
</style>

