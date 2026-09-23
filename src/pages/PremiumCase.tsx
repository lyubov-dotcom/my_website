import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../CaseStudy.css'
import '../PremiumCase.css'

const asset = (p: string) => `${import.meta.env.BASE_URL}${p}`
const img = (name: string) => asset(`case/premium/${name}.webp`)

const toc = [
  { id: 'summary', label: 'Кратко' },
  { id: 'about', label: 'О проекте' },
  { id: 'role', label: 'Роль' },
  { id: 'made', label: 'Сделала' },
  { id: 'crafted', label: 'Проработала' },
  { id: 'flow', label: 'Сценарий' },
  { id: 'problems', label: 'Проблемы' },
  { id: 'results', label: 'Результаты' },
] as const

const metrics = [
  { value: '1 140', unit: '', label: 'Новых подключений в месяц', detail: 'после стабилизации базы' },
  { value: '6 800', unit: '', label: 'Продлений подписки в месяц', detail: 'платных и бесплатных вместе' },
  { value: '39', unit: '%', label: 'Платят со второго месяца', detail: '61% выполняют условие и остаются бесплатно' },
  { value: '588', unit: 'млн', label: 'Выручка в месяц, UZS', detail: '2 650 платных продлений × 222 000' },
]

const aboutFacts = [
  {
    text: 'Клиент видит пакет привилегий целиком и подключает сервис с главной — без отдельного раздела в дебрях меню.',
    tone: 'light' as const,
    icon: 'pulse' as const,
  },
  {
    text: 'Каждая привилегия раскрывается деталью: ставки, менеджер, курс. Список оффера остаётся оглавлением.',
    tone: 'dark' as const,
    icon: 'people' as const,
  },
  {
    text: 'В запуск вошли оффер, оплата и статусы. Семейный Premium и шаринг подписки оставили за рамками.',
    tone: 'dark' as const,
    icon: 'scope' as const,
  },
]

const flow = [
  { title: 'Увидеть оффер', body: 'С главной открыть Premium и понять пакет за минуту.' },
  { title: 'Разобрать привилегии', body: 'Открыть деталь и вернуться к кнопке, не потеряв контекст.' },
  { title: 'Подключить', body: 'Увидеть цену, карту списания и нажать одну кнопку.' },
  { title: 'Следить за статусом', body: 'Льгота, продление и прогресс условий — в «Мой Premium».' },
]

const crafted = [
  { src: img('home'), alt: 'Главный экран с бейджем Premium', caption: 'Главная · вход в оффер' },
  { src: img('privilege-deposit'), alt: 'Шторка повышенной ставки по депозитам', caption: 'Депозиты · сравнение ставок' },
  { src: img('privilege-manager'), alt: 'Карточка персонального менеджера', caption: 'Менеджер · контакты' },
  { src: img('checkout'), alt: 'Экран подключения Premium', caption: 'Подключение · цена и карта' },
  { src: img('free-conditions'), alt: 'Условия бесплатного продления', caption: 'Условия · одно из двух' },
  { src: img('connected'), alt: 'Мой Premium после подключения', caption: 'Мой Premium · пакет' },
  { src: img('status-grace'), alt: 'Статус с действующей льготой', caption: 'Статус · льгота' },
  { src: img('status-paid'), alt: 'Статус с платной подпиской', caption: 'Статус · 222 000 UZS' },
]

const problems = [
  'На оффере нужно было показать весь пакет и дать раскрыть любую привилегию, не уводя с кнопки «Подключить».',
  'Первый месяц бесплатный, дальше 222 000 UZS или бесплатно по условию. Цифры и прогресс нельзя прятать в оферту — они должны стоять рядом со статусом.',
  'После подключения два разных состояния: льгота ещё действует и месяц уже платный. Одна логика, разные акценты — иначе человек не понимает, за что спишут деньги.',
]

function Icon({ name }: { name: 'pulse' | 'people' | 'scope' }) {
  if (name === 'pulse') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M3 12h3l2.2-6 3.6 12 2.4-6H21" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    )
  }
  if (name === 'people') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="9" cy="8" r="2.4" fill="none" stroke="currentColor" strokeWidth="1.8" />
        <circle cx="16" cy="9" r="2" fill="none" stroke="currentColor" strokeWidth="1.8" />
        <path d="M4.5 18c.6-2.6 2.6-4 4.5-4s3.9 1.4 4.5 4M13 14c1.7 0 3.4 1 4 3.2" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    )
  }
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="7.5" fill="none" stroke="currentColor" strokeWidth="1.8" />
      <path d="M12 8.5v3.2L15 14" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  )
}

function Phone({ src, alt, caption }: { src: string; alt: string; caption?: string }) {
  return (
    <figure className="story-phone">
      <div className="story-phone-frame">
        <img src={src} alt={alt} loading="lazy" />
      </div>
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  )
}

function ScenarioTrack() {
  const [step, setStep] = useState(0)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce || paused) return undefined
    const timer = window.setInterval(() => {
      setStep((current) => (current + 1) % flow.length)
    }, 2800)
    return () => window.clearInterval(timer)
  }, [paused])

  return (
    <div
      className="scenario"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="scenario-cards">
        {flow.map((item, index) => {
          const state = index < step ? 'is-done' : index === step ? 'is-active' : 'is-next'
          return (
            <button
              type="button"
              key={item.title}
              className={`scenario-card ${state}`}
              onClick={() => setStep(index)}
            >
              <span className="scenario-index">{String(index + 1).padStart(2, '0')}</span>
              <strong>{item.title}</strong>
              <p>{item.body}</p>
              <span className="scenario-fill" aria-hidden="true" />
            </button>
          )
        })}
      </div>
      <div className="scenario-rail" aria-hidden="true">
        <span className="scenario-rail-line" />
        <span className="scenario-rail-token" style={{ left: `${(step / (flow.length - 1)) * 100}%` }} />
      </div>
    </div>
  )
}

function PremiumCase() {
  const navigate = useNavigate()
  const [active, setActive] = useState<(typeof toc)[number]['id']>('summary')

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  useEffect(() => {
    const observed = toc
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => Boolean(el))

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)
        const id = visible[0]?.target.id as (typeof toc)[number]['id'] | undefined
        if (id) setActive(id)
      },
      { rootMargin: '-20% 0px -60% 0px', threshold: [0.1, 0.25, 0.5] },
    )

    observed.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  const goHomeTo = (id: string) => {
    navigate('/')
    window.setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    }, 80)
  }

  const goTo = (id: (typeof toc)[number]['id']) => {
    setActive(id)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <article className="case case--premium case--story">
      <button type="button" className="case-back" onClick={() => goHomeTo('work')}>← Все проекты</button>

      <div className="story-layout">
        <nav className="story-toc" aria-label="Содержание кейса">
          {toc.map((item) => (
            <button
              type="button"
              key={item.id}
              className={active === item.id ? 'is-active' : undefined}
              onClick={() => goTo(item.id)}
            >
              {item.label}
            </button>
          ))}
        </nav>

        <div className="story-main">
          <header id="summary" className="case-hero case-hero--plain story-section">
            <p className="eyebrow">Octobank · Premium · 2026</p>
            <h1>Octobank Premium</h1>
            <p className="lede">
              Подключение премиального сервиса: оффер, привилегии,
              оплата и статус после подключения.
            </p>
            <ul className="case-chips">
              <li><span>Роль</span>Product designer</li>
              <li><span>Платформы</span>iOS · Android</li>
              <li><span>Продукт</span>Octo-Mobile</li>
              <li><span>Год</span>2026</li>
            </ul>
          </header>

          <section className="case-metrics">
            {metrics.map((m) => (
              <div className="metric" key={m.label}>
                <strong className={m.value.includes(' ') ? 'metric-word' : undefined}>
                  {m.value}
                  {m.unit && <em>{m.unit}</em>}
                </strong>
                <span className="metric-label">{m.label}</span>
                <span className="metric-detail">{m.detail}</span>
              </div>
            ))}
          </section>

          <section id="about" className="story-section">
            <p className="story-kicker">О проекте</p>
            <div className="about-board">
              <figure className="about-visual">
                <img
                  src={asset('case/covers/octobank-premium.webp')}
                  alt="Экраны подключения Octobank Premium"
                />
                <figcaption>
                  Собирала подключение Premium с нуля в Octo-Mobile. Задача —
                  провести человека от оффера до статуса и честно показать,
                  когда сервис платный, а когда остаётся бесплатным.
                </figcaption>
              </figure>
              {aboutFacts.map((fact) => (
                <div className={`about-fact about-fact--${fact.tone}`} key={fact.text}>
                  <p>{fact.text}</p>
                  <span className="about-fact-icon">
                    <Icon name={fact.icon} />
                  </span>
                </div>
              ))}
            </div>
          </section>

          <section id="role" className="story-section">
            <p className="story-kicker">Роль</p>
            <h2>Отвечала за сценарий с нуля до передачи в разработку</h2>
            <p className="story-lead">
              Собрала оффер, детали привилегий и два состояния после подключения:
              льготный период и платная подписка. Предложила считать бесплатное
              продление отдельным исходом — не «скидкой», а выполнением условия
              по остатку или тратам.
            </p>
          </section>

          <section id="made" className="story-section">
            <p className="story-kicker">Сделала</p>
            <h2>оффер со списком привилегий</h2>
            <div className="story-phones story-phones--one">
              <Phone
                src={img('offer')}
                alt="Экран оффера Octobank Premium"
                caption="Оффер · полный пакет и кнопка «Подключить»"
              />
            </div>
          </section>

          <section id="crafted" className="story-section">
            <p className="story-kicker">Проработала</p>
            <h2>экраны входа, деталей, оплаты и статусов</h2>
            <p className="story-lead">
              Точка входа на главной, шторки привилегий, экран подключения,
              условия бесплатности и два вида «Мой Premium» — льгота и платный месяц.
            </p>
            <div className="story-phones story-phones--gallery">
              {crafted.map((shot) => (
                <Phone key={shot.src} src={shot.src} alt={shot.alt} caption={shot.caption} />
              ))}
            </div>
          </section>

          <section id="flow" className="story-section">
            <p className="story-kicker">Сценарий</p>
            <h2>Четыре шага до статуса</h2>
            <ScenarioTrack />
          </section>

          <section id="problems" className="story-section">
            <p className="story-kicker">Проблемы</p>
            <h2>С чем столкнулась</h2>
            <div className="problem-grid">
              {problems.map((text, index) => (
                <div className="problem-card" key={text}>
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  <p>{text}</p>
                </div>
              ))}
            </div>
          </section>

          <section id="results" className="story-section">
            <p className="story-kicker">Результаты</p>
            <h2>Сценарий, который приносит и выручку, и остатки</h2>
            <p className="story-lead">
              Появился путь от оффера до статуса. Ниже — типичный месяц
              после стабилизации базы: часть клиентов платит 222&nbsp;000 UZS,
              часть держит бесплатное продление за остаток или траты.
            </p>
            <div className="result-grid">
              <div className="result-card result-card--accent">
                <strong>588 <em>млн</em></strong>
                <span>UZS выручки в месяц с платных продлений</span>
                <p>2 650 человек × 222 000. Без разовых акций и без завышения базы.</p>
              </div>
              <div className="result-card">
                <strong>39 / 61</strong>
                <span>Платят / остаются бесплатно</span>
                <div className="result-split" aria-hidden="true">
                  <b style={{ width: '39%' }} />
                  <i style={{ width: '61%' }} />
                </div>
                <p>4 150 продлений закрывают условием по остатку или оплатам картой Octobank.</p>
              </div>
              <div className="result-card">
                <strong>1 140</strong>
                <span>Новых подключений в месяц</span>
                <p>Первый месяц бесплатный. Деньги и отсев считаем со второго.</p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </article>
  )
}

export default PremiumCase
