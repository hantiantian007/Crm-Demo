// Only structural markup is retained. Article typography belongs to the template.
export const escapeHtml = (value = '') => String(value).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]))

export function safeUrl(value, image = false) {
  const url = String(value || '').trim()
  if (!url || /[\u0000-\u0020\u007f]/.test(url)) return ''
  if (image && /^data:image\/(png|jpeg|gif|webp);base64,[a-z0-9+/=]+$/i.test(url)) return url
  if (/^\/(?!\/)/.test(url) || /^\.\.?\//.test(url)) return url
  try {
    const parsed = new URL(url)
    return (['https:', 'http:'].includes(parsed.protocol) || (!image && parsed.protocol === 'mailto:')) && !parsed.username && !parsed.password ? url : ''
  } catch { return '' }
}

export function sanitizeRichText(html = '') {
  const doc = new DOMParser().parseFromString(String(html), 'text/html')
  const allowed = new Set(['p', 'h2', 'h3', 'h4', 'strong', 'em', 'ul', 'ol', 'li', 'a', 'br', 'blockquote', 'img'])
  const blocked = new Set(['script', 'style', 'iframe', 'object', 'embed', 'svg', 'math', 'form', 'input', 'button', 'textarea', 'select', 'video', 'audio', 'template', 'noscript', 'link', 'meta', 'head'])
  function render(node) {
    if (node.nodeType === 3) return escapeHtml(node.textContent)
    if (node.nodeType !== 1) return ''
    const source = node.localName.toLowerCase()
    if (blocked.has(source)) return ''
    const tag = ({ b: 'strong', i: 'em', h1: 'h2', div: 'p' })[source] || source
    const content = Array.from(node.childNodes, render).join('')
    // Pasted layout wrappers may contain paragraphs/headings/lists. Unwrap them
    // instead of generating invalid nested paragraphs that browsers rearrange.
    if (source === 'div' && Array.from(node.children).some(child => ['p', 'div', 'h1', 'h2', 'h3', 'h4', 'ul', 'ol', 'blockquote', 'section', 'article'].includes(child.localName))) return content
    if (!allowed.has(tag)) return content
    if (tag === 'img') {
      const src = safeUrl(node.getAttribute('src'), true)
      return src ? `<img src="${escapeHtml(src)}" alt="${escapeHtml(node.getAttribute('alt') || '正文图片')}" loading="lazy" referrerpolicy="no-referrer">` : ''
    }
    if (tag === 'br') return '<br>'
    if (tag === 'a') {
      const href = safeUrl(node.getAttribute('href'))
      return href ? `<a href="${escapeHtml(href)}" target="_blank" rel="noopener noreferrer">${content}</a>` : content
    }
    return `<${tag}>${content}</${tag}>`
  }
  return Array.from(doc.body.childNodes, render).join('')
}

export const plainTextHtml = text => String(text || '').split(/\r?\n/).map(line => `<p>${escapeHtml(line) || '<br>'}</p>`).join('')
