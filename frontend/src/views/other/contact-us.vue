<template>
  <div class="contact-us-page">
    <p class="demo-note">前端演示 · 提交仅保存到当前浏览器的 CRM 留资列表，尚未接入微信公众号或后端</p>
    <section class="contact-card" aria-labelledby="contact-title">
      <header class="contact-heading">
        <svg class="contact-logo" viewBox="0 0 240 70" role="img" aria-label="HATC">
          <defs><g id="contact-hatc-mark" fill="currentColor">
            <path d="M0 2H18V27H39V2H57V68H39V43H18V68H0Z M61 68L83 2H103L125 68H106L93 21L80 68Z M109 2H177L168 19H151V68H132V19H115Z" />
            <path d="M238 11L227 25C218 17 205 16 198 24C190 32 190 44 198 52C205 59 219 58 227 50L239 62C223 75 199 73 185 59C172 45 173 23 187 10C201 -3 223 -2 238 11Z" />
            <path d="M83 68L93 39L102 68Z" fill="#009647" />
          </g></defs>
          <use href="#contact-hatc-mark" />
        </svg>
        <h1 id="contact-title">联系我们</h1>
      </header>

      <form class="contact-form" novalidate @submit.prevent="submit">
        <div class="contact-field">
          <label for="contact-name">姓名 <span class="required">*</span></label>
          <input id="contact-name" v-model="form.name" class="contact-input" autocomplete="name" placeholder="请输入姓名" required :aria-invalid="!!errors.name" aria-describedby="contact-name-error" @input="clearFeedback('name')" />
          <p v-if="errors.name" id="contact-name-error" class="field-error" role="alert">{{ errors.name }}</p>
        </div>
        <div class="contact-field">
          <label for="contact-phone">手机号码 <span class="required">*</span></label>
          <div class="phone-control" :class="{ invalid: errors.phoneNumber || errors.countryCode }">
            <select v-model="form.countryCode" class="country-select" aria-label="国家/地区区号" autocomplete="tel-country-code" :aria-invalid="!!errors.countryCode" aria-describedby="contact-phone-error" @change="clearFeedback('countryCode')">
              <option v-for="code in countryCodes" :key="code" :value="code">{{ code }}</option>
            </select>
            <input id="contact-phone" v-model="form.phoneNumber" class="contact-input phone-input" type="tel" autocomplete="tel-national" placeholder="请输入手机号" required :aria-invalid="!!errors.phoneNumber" aria-describedby="contact-phone-error" @input="clearFeedback('phoneNumber')" />
          </div>
          <p v-if="errors.phoneNumber || errors.countryCode" id="contact-phone-error" class="field-error" role="alert">{{ errors.countryCode || errors.phoneNumber }}</p>
        </div>
        <div class="contact-field">
          <label for="contact-wechat">微信号 <span class="required">*</span></label>
          <input id="contact-wechat" v-model="form.wechat" class="contact-input" type="text" placeholder="请输入微信号" required :aria-invalid="!!errors.wechat" aria-describedby="contact-wechat-error" @input="clearFeedback('wechat')" />
          <p v-if="errors.wechat" id="contact-wechat-error" class="field-error" role="alert">{{ errors.wechat }}</p>
        </div>
        <div class="contact-field">
          <label for="contact-email">电子邮箱 <span class="required">*</span></label>
          <input id="contact-email" v-model="form.email" class="contact-input" type="email" autocomplete="email" placeholder="请输入电子邮箱" required :aria-invalid="!!errors.email" aria-describedby="contact-email-error" @input="clearFeedback('email')" />
          <p v-if="errors.email" id="contact-email-error" class="field-error" role="alert">{{ errors.email }}</p>
        </div>
        <div class="contact-field">
          <label for="contact-message">留言内容 <span class="optional">选填</span></label>
          <div class="message-control">
            <textarea id="contact-message" :value="form.inquiry" class="contact-input" placeholder="请输入留言内容" aria-describedby="contact-count contact-message-error" :aria-invalid="!!errors.inquiry" @input="updateMessage" @compositionend="updateMessage"></textarea>
            <span id="contact-count" class="message-count">{{ messageLength }}/500</span>
          </div>
          <p v-if="errors.inquiry" id="contact-message-error" class="field-error" role="alert">{{ errors.inquiry }}</p>
        </div>
        <p v-if="failure" class="field-error submit-feedback" role="alert">{{ failure }}</p>
        <p v-if="success" class="submit-success submit-feedback" role="status">提交成功，已保存为本地演示留资，状态为“待分配”。</p>
        <button class="contact-submit" type="submit" :disabled="saving">{{ saving ? '提交中…' : '提交' }}<span aria-hidden="true">→</span></button>
      </form>
    </section>
    <footer class="contact-footer">
      <svg viewBox="0 0 240 70" role="img" aria-label="HATC"><use href="#contact-hatc-mark" /></svg>
      <span class="footer-divider" aria-hidden="true">|</span><span>连接需求 · 开启对话</span>
    </footer>
  </div>
</template>

<script setup>
import { computed, nextTick, reactive, ref } from 'vue'
import { leadsStore, validateContactSubmission } from '../../store/leadsDemo.js'

// Reuse the calling-code options already offered by the CRM registration form.
const countryCodes = ['+86', '+84', '+852', '+82', '+81', '+66', '+65']
const emptyForm = () => ({ name: '', countryCode: '+86', phoneNumber: '', wechat: '', email: '', inquiry: '' })
const form = reactive(emptyForm())
const errors = ref({})
const saving = ref(false)
const failure = ref('')
const success = ref(false)
const messageLength = computed(() => [...form.inquiry].length)
function clearFeedback(field) { delete errors.value[field]; failure.value = ''; success.value = false }
function updateMessage(event) {
  if (event.isComposing) return
  form.inquiry = [...event.target.value].slice(0, 500).join('')
  event.target.value = form.inquiry
  clearFeedback('inquiry')
}
async function submit() {
  if (saving.value) return
  success.value = false
  failure.value = ''
  const checked = validateContactSubmission(form)
  errors.value = checked.errors
  if (!checked.ok) return
  saving.value = true
  const payload = { ...form }
  try {
    await nextTick()
    const result = leadsStore.submitContact(payload)
    if (!result.ok) { failure.value = result.error; errors.value = result.errors || {}; return }
    Object.assign(form, emptyForm())
    success.value = true
  } catch { failure.value = '提交失败，请保留填写内容后重试' }
  finally { saving.value = false }
}
</script>

<style scoped>
.contact-us-page { color: #142d3e; background: #eef2f4; padding: 24px 20px 32px; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "PingFang SC", "Microsoft YaHei", sans-serif; }
.demo-note { max-width: 560px; margin: 0 auto 16px; font-size: 12px; line-height: 1.6; color: #697d8a; }
.contact-card { position: relative; max-width: 560px; margin: auto; padding: 34px; border-radius: 30px; background: #fcfdfd; box-shadow: 0 18px 40px #142d3e14; overflow: hidden; }
.contact-card::before { position: absolute; content: ''; top: 0; left: 12%; right: 12%; height: 2px; background: linear-gradient(90deg, transparent, #00dba0, transparent); }
.contact-heading { border-bottom: 1px solid #e1e8eb; padding-bottom: 22px; margin-bottom: 28px; }
.contact-logo { display: block; width: 148px; height: auto; color: #083c60; }
.contact-heading h1 { margin: 20px 0 0; font-size: 34px; line-height: 1.2; font-weight: 750; letter-spacing: 1px; }
.contact-form { display: flex; flex-direction: column; gap: 26px; }
.contact-field label { display: block; margin-bottom: 12px; font-weight: 650; font-size: 18px; line-height: 1.4; }
.required { color: #008c69; margin-left: 5px; }
.optional { color: #8898a2; font-size: 14px; font-weight: 400; margin-left: 8px; }
.contact-us-page .contact-form .contact-input { display: block; width: 100%; min-width: 0; height: 64px; padding: 0 20px; border: 1px solid #d8e3e8; border-radius: 14px; background: #f5f7f8; color: #142d3e; font: inherit; font-size: 18px; box-shadow: inset 0 0 0 1px #e4eaed; outline: none; }
.contact-us-page .contact-form .contact-input::placeholder { color: #95a1aa; }
.contact-us-page .contact-form .contact-input:focus { border-color: #009b77; box-shadow: 0 0 0 3px #00c99418; }
.contact-us-page .contact-form .contact-input[aria-invalid="true"], .phone-control.invalid { border-color: #dc6b6b; }
.phone-control { display: flex; align-items: center; border: 1px solid #d8e3e8; border-radius: 14px; background: #f5f7f8; box-shadow: inset 0 0 0 1px #e4eaed; }
.phone-control:focus-within { border-color: #009b77; box-shadow: 0 0 0 3px #00c99418; }
.contact-us-page .contact-form .country-select { flex: 0 0 108px; width: 108px; height: 36px; padding: 0 26px 0 20px; background-color: transparent; border: 0; border-right: 1px solid #d8e3e8; border-radius: 0; font: inherit; font-size: 18px; color: #142d3e; box-shadow: none; }
.contact-us-page .contact-form .country-select:focus-visible { outline: 2px solid #009b77; outline-offset: -2px; }
.contact-us-page .contact-form .phone-input, .contact-us-page .contact-form .phone-input:focus { border: 0; box-shadow: none; background: transparent; }
.message-control { position: relative; }
.contact-us-page .contact-form textarea.contact-input { height: 190px; min-height: 150px; padding: 20px 20px 42px; line-height: 1.6; resize: vertical; }
.message-count { position: absolute; right: 20px; bottom: 14px; color: #8999a4; font-size: 15px; pointer-events: none; }
.field-error { margin: 8px 0 0; color: #c34141; font-size: 13px; line-height: 1.5; }
.submit-feedback { margin: -8px 0 0; }
.submit-success { color: #008765; font-size: 13px; line-height: 1.6; }
.contact-form .contact-submit { position: relative; display: block; height: 66px; width: 100%; margin-top: 6px; padding: 0 54px; border: 1px solid #00c991; border-radius: 14px; color: #07352f; background: #00d99b; font-size: 22px; font-weight: 650; letter-spacing: 3px; box-shadow: 0 8px 20px #00c99412; cursor: pointer; }
.contact-submit span { position: absolute; right: 26px; font-size: 29px; line-height: 1; top: 16px; font-weight: 400; }
.contact-form .contact-submit:hover:not(:disabled) { background: #00ca91; }
.contact-submit:focus-visible { outline: 3px solid #008765; outline-offset: 3px; }
.contact-submit:disabled { opacity: .65; cursor: wait; }
.contact-footer { display: flex; flex-wrap: wrap; align-items: center; justify-content: center; gap: 20px; margin-top: 40px; font-size: 15px; letter-spacing: 2px; color: #748998; }
.contact-footer svg { width: 66px; color: #083c60; }
.footer-divider { color: #354c5c; }
@media (max-width: 600px) {
  .contact-us-page { padding: 16px 12px 28px; }
  .contact-card { padding: 26px 22px; border-radius: 24px; }
  .contact-heading h1 { font-size: 30px; }
  .contact-form { gap: 22px; }
  .contact-us-page .contact-form .contact-input { font-size: 16px; padding-left: 14px; padding-right: 14px; }
  .contact-us-page .contact-form .country-select { flex-basis: 90px; width: 90px; padding-left: 12px; font-size: 16px; }
  .contact-footer { gap: 12px; font-size: 13px; letter-spacing: 1px; }
}
</style>
