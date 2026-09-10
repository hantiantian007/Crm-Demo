import { reactive } from 'vue'

export const prdState = reactive({
  visible: false,
  url: '',
  title: 'PRD 预览'
})

export const openPrd = (url, title = 'PRD 预览') => {
  prdState.url = url
  prdState.title = title
  prdState.visible = true
}

export const closePrd = () => {
  prdState.visible = false
  // 延迟清除 URL，防止关闭动画时出现白屏闪烁
  setTimeout(() => {
    prdState.url = ''
  }, 300)
}
