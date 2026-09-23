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
  { value: '1 140', unit: '', label: 'Подключений в месяц', detail: 'Новые клиенты, первый месяц бесплатный' },
  { value: '6 800', unit: '', label: 'Продлений в месяц', detail: 'Платных и бесплатных вместе' },
  { value: '39%', unit: '', label: 'Покупают подписку', detail: '61% выполняют условие и остаются бесплатно' },
  { value: '588', unit: 'млн', label: 'Выручка в месяц, UZS', detail: '2 650 платных продлений × 222 000' },
]

const aboutFacts = [
  {
    text: 'Клиент видит пакет привилегий целиком и подключает сервис с главной — без поиска в меню.',
    tone: 'light' as const,
    icon: 'pulse' as const,
  },
  {
    text: 'Привилегии собраны в один список: карта, менеджер, ставки, курс. Каждая строка открывает деталь.',
    tone: 'dark' as const,
    icon: 'people' as const,
  },
  {
    text: 'В запуск вошли предложение, оплата и статусы. Семейный Premium и шаринг подписки оставили за рамками.',
    tone: 'dark' as const,
    icon: 'scope' as const,
  },
]

const scenes = [
  {
    title: 'Увидеть предложение',
    body: 'С главной открыть Premium и понять пакет за минуту.',
    src: img('offer'),
    alt: 'Предложение Premium',
  },
  {
    title: 'Разобрать привилегии',
    body: 'Открыть деталь и вернуться к кнопке, не потеряв контекст.',
    src: img('privilege-deposit'),
    alt: 'Деталь привилегии',
  },
  {
    title: 'Подключить',
    body: 'Увидеть цену, карту списания и нажать одну кнопку.',
    src: img('checkout'),
    alt: 'Экран подключения',
  },
  {
    title: 'Следить за статусом',
    body: 'Льгота, продление и прогресс условий — в «Мой Premium».',
    src: img('status-grace'),
    alt: 'Статус подписки',
  },
]

const crafted = [
  { src: img('home'), alt: 'Главный экран с бейджем Premium', caption: 'Главная · вход в предложение' },
  { src: img('privilege-deposit'), alt: 'Шторка повышенной ставки по депозитам', caption: 'Депозиты · сравнение ставок' },
  { src: img('privilege-manager'), alt: 'Карточка персонального менеджера', caption: 'Менеджер · контакты' },
  { src: img('checkout'), alt: 'Экран подключения Premium', caption: 'Подключение · цена и карта' },
  { src: img('free-conditions'), alt: 'Условия бесплатного продления', caption: 'Условия · одно из двух' },
  { src: img('connected'), alt: 'Мой Premium после подключения', caption: 'Мой Premium · пакет' },
  { src: img('status-grace'), alt: 'Статус с действующей льготой', caption: 'Статус · льгота' },
  { src: img('status-paid'), alt: 'Статус с платной подпиской', caption: 'Статус · 222 000 UZS' },
]

const problems = [
  'На предложении нужно было уместить весь пакет и дать раскрыть любую привилегию, не уводя с кнопки «Подключить».',
  'Первый месяц бесплатный, дальше 222 000 UZS или бесплатно по условию. Эту развилку нельзя прятать в оферту — цифры и прогресс должны стоять рядом со статусом.',
  'После подключения два состояния: льгота ещё действует и месяц уже платный. Одна логика, разные акценты — иначе человек не понимает, за что спишут деньги.',
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

function ScenarioStage() {
  const [step, setStep] = useState(0)
  const [paused, setPaused] = useState(false)
  const current = scenes[step]

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce || paused) return undefined
    const timer = window.setInterval(() => {
      setStep((value) => (value + 1) % scenes.length)
    }, 3200)
    return () => window.clearInterval(timer)
  }, [paused])

  return (
    <div
      className="scene"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <ol className="scene-steps">
        {scenes.map((item, index) => {
          const state = index < step ? 'is-done' : index === step ? 'is-active' : 'is-wait'
          return (
            <li key={item.title}>
              <button
                type="button"
                className={`scene-step ${state}`}
                onClick={() => setStep(index)}
              >
                <span className="scene-num">{String(index + 1).padStart(2, '0')}</span>
                <span className="scene-copy">
                  <strong>{item.title}</strong>
                  <em>{item.body}</em>
                </span>
                <span className="scene-meter" aria-hidden="true" />
              </button>
            </li>
          )
        })}
      </ol>
      <figure className="scene-preview">
        <img key={current.src} src={current.src} alt={current.alt} />
      </figure>
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
              Подключение премиального сервиса: предложение, привилегии,
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
            {metrics.map((item) => (
              <div className="metric" key={item.label}>
                <strong className={item.value.includes(' ') ? 'metric-word' : undefined}>
                  {item.value}
                  {item.unit && <em>{item.unit}</em>}
                </strong>
                <span className="metric-label">{item.label}</span>
                <span className="metric-detail">{item.detail}</span>
              </div>
            ))}
          </section>

          <section id="about" className="story-section">
            <h2 className="story-title">О проекте</h2>
            <div className="about-board">
              <figure className="about-visual">
                <img
                  src={asset('case/covers/octobank-premium.webp')}
                  alt="Экраны подключения Octobank Premium"
                />
                <figcaption>
                  Собирала подключение Premium с нуля в Octo-Mobile. Задача —
                  провести человека от предложения до статуса и честно показать,
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
            <h2 className="story-title">Роль</h2>
            <p className="story-lead">
              Отвечала за сценарий с нуля до передачи в разработку. Предложила
              считать бесплатное продление отдельным исходом — не скидкой,
              а выполнением условия по остатку или тратам картой банка.
            </p>
          </section>

          <section id="made" className="story-section">
            <h2 className="story-title">Сделала</h2>
            <p className="story-sub">предложение со списком привилегий</p>
            <div className="made-stage">
              <Phone
                src={img('offer')}
                alt="Экран предложения Octobank Premium"
              />
            </div>
          </section>

          <section id="crafted" className="story-section">
            <h2 className="story-title">Проработала</h2>
            <p className="story-sub">экраны входа, деталей, оплаты и статусов</p>
            <div className="story-phones story-phones--gallery">
              {crafted.map((shot) => (
                <Phone key={shot.src} src={shot.src} alt={shot.alt} caption={shot.caption} />
              ))}
            </div>
          </section>

          <section id="flow" className="story-section">
            <h2 className="story-title">Сценарий</h2>
            <ScenarioStage />
          </section>

          <section id="problems" className="story-section">
            <h2 className="story-title">Проблемы</h2>
            <div className="problem-grid">
              {problems.map((text, index) => (
                <div className="problem-card" key={text}>
                  <span>{index + 1}</span>
                  <p>{text}</p>
                </div>
              ))}
            </div>
          </section>

          <section id="results" className="story-section">
            <h2 className="story-title">Результаты</h2>
            <p className="story-lead">
              Появился сценарий, который связывает предложение, оплату и статус.
              Ниже — типичный месяц после стабилизации базы: часть клиентов
              платит 222&nbsp;000 UZS, часть держит бесплатное продление
              за остаток или траты.
            </p>
            <div className="result-grid">
              <div className="result-card result-card--accent">
                <strong>588 <em>млн</em></strong>
                <span>UZS выручки в месяц</span>
                <p>2 650 платных продлений × 222 000. Без разовых акций и без раздутой базы.</p>
              </div>
              <div className="result-card">
                <strong>39 / 61</strong>
                <span>Платят / остаются бесплатно</span>
                <div className="result-split" aria-hidden="true">
                  <b style={{ width: '39%' }} />
                  <i style={{ width: '61%' }} />
                </div>
                <p>Из 6 800 продлений 4 150 закрывают условием по остатку или оплатам картой Octobank.</p>
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
