import { useEffect, useMemo, useState } from 'react'
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom'
import './App.css'

type Theme = 'light' | 'dark'

function useTheme(): [Theme, () => void] {
  const [theme, setTheme] = useState<Theme>(() => {
    const stored = localStorage.getItem('theme')
    return stored === 'light' || stored === 'dark' ? stored : 'dark'
  })

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('theme', theme)
  }, [theme])

  const toggle = () => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))
  return [theme, toggle]
}

function useHeaderMotion() {
  const [hidden, setHidden] = useState(false)
  const [expanded, setExpanded] = useState(false)

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let lastY = window.scrollY
    let ticking = false

    const apply = () => {
      ticking = false
      const y = window.scrollY
      const delta = y - lastY

      if (y < 12) {
        setHidden(false)
        setExpanded(false)
      } else if (!reduce && delta > 8) {
        setHidden(true)
        setExpanded(false)
      } else if (!reduce && delta < -8) {
        setHidden(false)
        setExpanded(true)
      }

      lastY = y
    }

    const onScroll = () => {
      if (ticking) return
      ticking = true
      window.requestAnimationFrame(apply)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return { hidden, expanded }
}

function Layout() {
  const [theme, toggleTheme] = useTheme()
  const { hidden, expanded } = useHeaderMotion()
  const navigate = useNavigate()
  const location = useLocation()
  const year = useMemo(() => new Date().getFullYear(), [])

  const goToSection = (id: string) => {
    const scroll = () => {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    }
    if (location.pathname !== '/') {
      navigate('/')
      window.setTimeout(scroll, 80)
    } else {
      scroll()
    }
  }

  const headerClass = [
    'site-bar',
    hidden ? 'is-hidden' : '',
    expanded ? 'is-expanded' : '',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <div className="shell">
      <header className={headerClass}>
        <div className="site-bar-inner">
          <Link className="brand" to="/">
            <span className="brand-mark" aria-hidden="true">✳</span>
            Любовь
          </Link>
          <nav className="nav-links">
            <button type="button" onClick={() => goToSection('work')}>Работы</button>
            <button type="button" onClick={() => goToSection('experience')}>Опыт</button>
            <button type="button" onClick={() => goToSection('contacts')}>Контакты</button>
          </nav>
          <button
            type="button"
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label="Переключить тему"
          >
            {theme === 'dark' ? '☀︎ Светлая' : '☾ Тёмная'}
          </button>
        </div>
      </header>

      <div className="page">
        <main>
          <Outlet />
        </main>

        <footer className="footer">
          <span>© {year} Любовь Чуйко</span>
          <span>UX/UI · продуктовый дизайн · финтех</span>
        </footer>
      </div>
    </div>
  )
}

export default Layout
