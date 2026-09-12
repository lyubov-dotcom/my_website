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

function Layout() {
  const [theme, toggleTheme] = useTheme()
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

  return (
    <div className="page">
      <header className="nav">
        <Link className="brand" to="/">
          <span className="brand-mark" aria-hidden="true">✳</span>
          Lyubov
        </Link>
        <nav className="nav-links">
          <button type="button" onClick={() => goToSection('work')}>Work</button>
          <button type="button" onClick={() => goToSection('about')}>About</button>
          <button type="button" onClick={() => goToSection('contact')}>Contact</button>
        </nav>
        <button
          type="button"
          className="theme-toggle"
          onClick={toggleTheme}
          aria-label="Toggle color theme"
        >
          {theme === 'dark' ? '☀︎ Light' : '☾ Dark'}
        </button>
      </header>

      <main>
        <Outlet />
      </main>

      <footer className="footer">
        <span>© {year} Lyubov Design Studio</span>
        <span>Made with React &amp; Vite</span>
      </footer>
    </div>
  )
}

export default Layout
