(function () {
  const frame = document.getElementById('prdFrame')
  const rawConfigs = Array.isArray(window.__PRD_VERSION_CONFIGS__) ? window.__PRD_VERSION_CONFIGS__ : []
  const configs = rawConfigs
    .filter((x) => x && typeof x.version === 'string' && typeof x.file === 'string')
    .map((x) => ({ version: x.version, file: x.file, isCurrent: Boolean(x.isCurrent) }))

  if (!frame || configs.length === 0) return

  const getCurrentFile = () => {
    const src = frame.getAttribute('src') || ''
    const parts = src.split('/')
    return parts[parts.length - 1] || src
  }

  const shouldUseHomePrdStyle = () => {
    const f = getCurrentFile()
    return (
      /^prd-activity-pioneer-one-50000-release_v/i.test(f) ||
      /^prd-activity-audit_v/i.test(f)
    )
  }

  const ensureStyle = (doc) => {
    if (!doc || doc.getElementById('prd-version-style')) return
    const style = doc.createElement('style')
    style.id = 'prd-version-style'
    style.textContent = `
      .prd-version-tabs-scroll{overflow-x:auto;-webkit-overflow-scrolling:touch}
      .prd-version-tabs{display:inline-flex;align-items:center;border:1px solid #e5e7eb;border-radius:12px;background:#fff;overflow:hidden;box-shadow:0 1px 2px rgba(0,0,0,0.04)}
      .prd-version-tab{appearance:none;border:0;background:transparent;cursor:pointer;padding:8px 12px;font-size:12px;font-weight:700;line-height:16px;color:#374151;white-space:nowrap}
      .prd-version-tab:hover{background:#f9fafb}
      .prd-version-tab.is-active{background:#fffbeb;color:#b45309}
      .prd-version-tab + .prd-version-tab{border-left:1px solid #e5e7eb}
      .prd-version-badge{margin-left:6px;padding:2px 8px;border-radius:999px;background:#fef3c7;color:#b45309;font-size:10px;font-weight:800;line-height:14px}
      .prd-version-banner{margin-top:12px;padding:10px 12px;border-radius:12px;border:1px solid #e5e7eb;background:#f9fafb;color:#4b5563;font-size:12px;line-height:18px;display:flex;align-items:center;gap:8px}
      .prd-version-dot{width:6px;height:6px;border-radius:999px;background:#9ca3af;flex:0 0 auto}
    `

    doc.head.appendChild(style)
  }

  const ensureHomePrdStyle = (doc) => {
    if (!doc || doc.getElementById('prd-home-prd-style')) return
    if (!shouldUseHomePrdStyle()) return

    doc.documentElement.setAttribute('data-prd-style', 'home')

    const style = doc.createElement('style')
    style.id = 'prd-home-prd-style'
    style.textContent = `
      html[data-prd-style="home"] body{background:#f3f4f6 !important;color:#111827}
      html[data-prd-style="home"] .wrap{max-width:72rem;margin:0 auto;padding:16px 16px 56px}
      @media (min-width:768px){html[data-prd-style="home"] .wrap{padding:32px 32px 56px}}
      html[data-prd-style="home"] .card{border-radius:12px;border:1px solid #e5e7eb;box-shadow:0 1px 3px rgba(0,0,0,0.08);padding:20px 20px;background:#fff}
      html[data-prd-style="home"] h1{font-size:24px;line-height:32px;font-weight:800;margin:0 0 8px;color:#111827}
      html[data-prd-style="home"] h2{font-size:18px;line-height:28px;font-weight:800;margin:20px 0 10px;color:#111827}
      html[data-prd-style="home"] p{margin:0 0 10px;color:#4b5563;line-height:1.7}
      html[data-prd-style="home"] ul{margin:8px 0 0 18px;color:#4b5563;line-height:1.75}
      html[data-prd-style="home"] .muted{color:#6b7280}
      html[data-prd-style="home"] .muted .tag{display:inline-flex;align-items:center;font-size:12px;font-weight:600;padding:2px 10px;border-radius:999px;background:#f3f4f6;border:1px solid #e5e7eb;color:#374151;margin-right:8px}
      html[data-prd-style="home"] .muted{color:#6b7280}

      html[data-prd-style="home"] .prd-home-wrap{max-width:72rem;margin:0 auto}
      html[data-prd-style="home"] .prd-home-card{background:#fff;border:1px solid #e5e7eb;border-radius:12px;box-shadow:0 1px 3px rgba(0,0,0,0.08);padding:20px 20px}
      html[data-prd-style="home"] .prd-home-card + .prd-home-card{margin-top:16px}
      html[data-prd-style="home"] .prd-home-header{margin-bottom:16px}
      html[data-prd-style="home"] .prd-home-header .muted{display:flex;flex-wrap:wrap;gap:8px;align-items:center;margin-bottom:10px}
      html[data-prd-style="home"] .prd-home-section-title{display:flex;align-items:center;gap:10px;margin:0 0 10px}
      html[data-prd-style="home"] .prd-home-section-title::before{content:'';width:6px;height:6px;border-radius:999px;background:#d1d5db;flex:0 0 auto;margin-top:2px}
      html[data-prd-style="home"] .prd-home-section-title h2{margin:0}
    `
    doc.head.appendChild(style)
  }

  const enhancePioneerOneRelease = (doc) => {
    const f = getCurrentFile()
    if (!/^prd-activity-pioneer-one-50000-release_v/i.test(f)) return
    if (!doc || doc.documentElement.getAttribute('data-prd-enhanced') === '1') return

    const wrap = doc.querySelector('.wrap')
    const card = wrap?.querySelector?.('.card')
    if (!wrap || !card) return

    doc.documentElement.setAttribute('data-prd-enhanced', '1')

    const homeWrap = doc.createElement('div')
    homeWrap.className = 'prd-home-wrap'

    const headerCard = doc.createElement('div')
    headerCard.className = 'prd-home-card prd-home-header'

    const sectionCards = []

    const nodes = Array.from(card.childNodes)

    const firstH2Index = nodes.findIndex((n) => n.nodeType === 1 && n.tagName === 'H2')
    const headerNodes = firstH2Index >= 0 ? nodes.slice(0, firstH2Index) : nodes

    headerNodes.forEach((n) => headerCard.appendChild(n))
    homeWrap.appendChild(headerCard)

    let i = firstH2Index
    while (i >= 0 && i < nodes.length) {
      const n = nodes[i]
      if (!(n.nodeType === 1 && n.tagName === 'H2')) {
        i++
        continue
      }

      const sectionCard = doc.createElement('div')
      sectionCard.className = 'prd-home-card'

      const titleRow = doc.createElement('div')
      titleRow.className = 'prd-home-section-title'

      const h2 = n
      titleRow.appendChild(h2)
      sectionCard.appendChild(titleRow)

      i++
      while (i < nodes.length) {
        const next = nodes[i]
        if (next.nodeType === 1 && next.tagName === 'H2') break
        sectionCard.appendChild(next)
        i++
      }

      sectionCards.push(sectionCard)
      homeWrap.appendChild(sectionCard)
    }

    wrap.innerHTML = ''
    wrap.appendChild(homeWrap)
  }

  const parseVersion = (v) => {
    const m = String(v || '').match(/^V(\d+)\.(\d+)\.(\d+)$/)
    if (!m) return { major: 1, minor: 0, patch: 0 }
    return { major: Number(m[1]), minor: Number(m[2]), patch: Number(m[3]) }
  }

  const compareDesc = (a, b) => {
    const pa = parseVersion(a.version)
    const pb = parseVersion(b.version)
    if (pa.major !== pb.major) return pb.major - pa.major
    if (pa.minor !== pb.minor) return pb.minor - pa.minor
    return pb.patch - pa.patch
  }

  configs.sort(compareDesc)

  const current = configs.find((x) => x.isCurrent) || configs[0]
  configs.forEach((x) => {
    x.isCurrent = x.version === current.version
  })

  let selectedVersion = current.version

  const switchVersion = (version) => {
    const cfg = configs.find((x) => x.version === version) || configs[0]
    selectedVersion = cfg.version
    frame.src = cfg.file
  }

  const findInsertAnchor = (doc) => {
    const h1 = doc.querySelector('h1')
    if (!h1) return null

    const legacyWrap = doc.querySelector('.wrap')
    if (legacyWrap) {
      const card = h1.closest('.card')
      if (card) {
        const p = h1.nextElementSibling && h1.nextElementSibling.tagName === 'P' ? h1.nextElementSibling : null
        return p || h1
      }
    }

    let node = h1
    while (node && node !== doc.body) {
      if (node.nodeType === 1) {
        const cls = node.getAttribute('class') || ''
        if (/\bmb-\d+/.test(cls)) return node
      }
      node = node.parentElement
    }

    return h1.parentElement
  }

  const render = (doc) => {
    ensureStyle(doc)
    ensureHomePrdStyle(doc)
    enhancePioneerOneRelease(doc)
    const anchor = findInsertAnchor(doc)
    if (!anchor) return

    let tabsWrap = doc.getElementById('prd-version-tabs')
    if (!tabsWrap) {
      tabsWrap = doc.createElement('div')
      tabsWrap.id = 'prd-version-tabs'
      anchor.insertAdjacentElement('afterend', tabsWrap)
    }

    let banner = doc.getElementById('prd-version-banner')
    if (!banner) {
      banner = doc.createElement('div')
      banner.id = 'prd-version-banner'
      tabsWrap.insertAdjacentElement('afterend', banner)
    }

    const showHistory = selectedVersion !== current.version

    banner.innerHTML = showHistory
      ? '<div class="prd-version-banner"><span class="prd-version-dot"></span><span>历史版本，仅供查看</span></div>'
      : ''

    const tabsHtml = configs
      .map((x) => {
        const isActive = x.version === selectedVersion
        const currentBadge = x.isCurrent ? '<span class="prd-version-badge">当前</span>' : ''
        return `<button type="button" class="prd-version-tab${isActive ? ' is-active' : ''}" data-version="${x.version}">${x.version}${currentBadge}</button>`
      })
      .join('')

    tabsWrap.innerHTML =
      '<div class="prd-version-tabs-scroll">' +
      '<div class="prd-version-tabs">' +
      tabsHtml +
      '</div>' +
      '</div>'

    tabsWrap.querySelectorAll('button[data-version]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const v = btn.getAttribute('data-version')
        if (!v) return
        switchVersion(v)
      })
    })
  }

  frame.addEventListener('load', () => {
    try {
      render(frame.contentDocument)
    } catch {}
  })

  switchVersion(current.version)
})()
