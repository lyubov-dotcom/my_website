import { useEffect, useMemo, useState } from 'react'
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom'
import LogoMark from './components/LogoMark'
import './App.css'

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
  const { hidden, expanded } = useHeaderMotion()
  const navigate = useNavigate()
  const location = useLocation()
  const year = useMemo(() => new Date().getFullYear(), [])
  const isHome = location.pathname === '/'
  const [overHero, setOverHero] = useState(isHome)

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', 'dark')
    localStorage.removeItem('theme')
  }, [])

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

  useEffect(() => {
    if (!isHome) {
      setOverHero(false)
      return
    }

    const hero = document.getElementById('top')
    if (!hero) {
      setOverHero(true)
      return
    }

    const io = new IntersectionObserver(
      ([entry]) => setOverHero(entry.isIntersecting && entry.intersectionRatio > 0.45),
      { threshold: [0.45, 0.7] },
    )
    io.observe(hero)
    return () => io.disconnect()
  }, [isHome])

  const headerClass = [
    'site-bar',
    hidden && !overHero ? 'is-hidden' : '',
    expanded ? 'is-expanded' : '',
    overHero ? 'is-over-hero' : '',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <div className={isHome ? 'shell shell--home' : 'shell'}>
      <header className={headerClass}>
        <div className="site-bar-inner">
          <Link className="brand" to="/">
            <LogoMark className="brand-mark" />
            Любовь
          </Link>
          <nav className="nav-links">
            <button type="button" onClick={() => goToSection('work')}>Работы</button>
            <button type="button" onClick={() => goToSection('experience')}>Опыт</button>
            <button type="button" onClick={() => goToSection('contacts')}>Контакты</button>
          </nav>
        </div>
      </header>

      <div className="page">
        <main>
          <Outlet />
        </main>

        <footer className="footer">
          <span className="footer-brand">
            <LogoMark className="footer-mark" />
            © {year} Любовь Чуйко
          </span>
          <span>UX/UI · продуктовый дизайн · финтех</span>
        </footer>
      </div>
    </div>
  )
}

export default Layout
