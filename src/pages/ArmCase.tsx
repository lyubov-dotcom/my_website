import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArmDesktop, type ArmScreenId } from '../components/ArmScreens'
import '../CaseStudy.css'
import '../PremiumCase.css'
import '../ArmCase.css'

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
  { value: '42', unit: '', label: 'Операций за смену', detail: 'На одного оператора после стабилизации' },
  { value: '11', unit: 'мин', label: 'Медиана закрытия', detail: 'От взятия в работу до статуса «закрыто»' },
  { value: '6%', unit: '', label: 'Возврат в очередь', detail: 'Было 14%, когда контекст терялся' },
  { value: '1', unit: '', label: 'Поверхность вместо трёх', detail: 'Сегмент, очередь и операция в одном АРМ' },
]

const aboutFacts = [
  {
    text: 'Очередь собирается из сегментов. Оператор видит правило и сразу берёт человека в работу.',
    tone: 'light' as const,
    icon: 'pulse' as const,
  },
  {
    text: 'Карточка операции держит клиента, сумму и статус. Новое окно не открывается.',
    tone: 'dark' as const,
    icon: 'people' as const,
  },
  {
    text: 'В запуск вошли смена, сегменты и очередь. Отчёты для комплаенса оставили на второй этап.',
    tone: 'dark' as const,
    icon: 'scope' as const,
  },
]

const scenes: { title: string; body: string; screen: ArmScreenId }[] = [
  {
    title: 'Открыть смену',
    body: 'Увидеть, какие сегменты горят, а не сырой список заявок.',
    screen: 'overview',
  },
  {
    title: 'Разобрать правило',
    body: 'Понять, почему человек в сегменте, и открыть его очередь.',
    screen: 'detail',
  },
  {
    title: 'Взять следующего',
    body: 'Приоритет считает риск и срок, а не только время поступления.',
    screen: 'queue',
  },
  {
    title: 'Закрыть операцию',
    body: 'Клиент и сумма остаются на экране до статуса «закрыто».',
    screen: 'operation',
  },
]

const crafted: { screen: ArmScreenId; caption: string }[] = [
  { screen: 'overview', caption: 'Смена · кого брать' },
  { screen: 'detail', caption: 'Сегмент · правило и люди' },
  { screen: 'queue', caption: 'Очередь · следующий клиент' },
  { screen: 'operation', caption: 'Операция · без нового окна' },
  { screen: 'shift', caption: 'Итог · откуда пришла работа' },
]

const problems = [
  'Сегменты жили в Excel и BI. Оператор смотрел цифры в одном месте, а работал в другом — до действия очередь уже устаревала.',
  'Карточка клиента открывалась отдельно от операции. На третьем шаге пропадали сумма, канал и причина, почему человек в работе.',
  'Приоритет считался по времени поступления. Срочные ЦР и зависший посредник стояли в одной линии с вчерашним возвратом.',
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

function Desk({
  screen,
  caption,
  tall = 'gallery',
}: {
  screen: ArmScreenId
  caption?: string
  tall?: 'hero' | 'scene' | 'gallery'
}) {
  return (
    <figure className="arm-shot">
      <div className={`arm-frame arm-frame--${tall}`}>
        <div className="arm-frame-inner">
          <ArmDesktop screen={screen} />
        </div>
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
    }, 3600)
    return () => window.clearInterval(timer)
  }, [paused])

  return (
    <div
      className="scene scene--desk"
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
        <Desk key={current.screen} screen={current.screen} tall="scene" />
      </figure>
    </div>
  )
}

function ArmCase() {
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
    <article className="case case--arm case--story">
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
            <p className="eyebrow">Веб-АРМ · Норд · 2024</p>
            <h1>Веб-АРМ</h1>
            <p className="lede">
              Пульт операциониста: сегменты клиентов, очередь смены
              и закрытие операции — на одной поверхности.
            </p>
            <ul className="case-chips">
              <li><span>Роль</span>Product designer</li>
              <li><span>Платформа</span>Desktop web</li>
              <li><span>Продукт</span>Норд · внутренний АРМ</li>
              <li><span>Год</span>2024</li>
            </ul>
          </header>

          <section className="case-metrics">
            {metrics.map((item) => (
              <div className="metric" key={item.label}>
                <strong>
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
              <figure className="about-visual about-visual--arm">
                <div className="arm-frame arm-frame--hero">
                  <div className="arm-frame-inner">
                    <ArmDesktop screen="overview" />
                  </div>
                </div>
                <figcaption>
                  Собирала веб-АРМ для операционной смены. Задача — провести
                  человека от правила сегмента до закрытой операции, не прыгая
                  между Excel, BI и карточкой в другой системе.
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
              Отвечала за информационную архитектуру и сценарий смены.
              Предложила считать сегмент правилом работы, а не отчётом:
              из него сразу собирается очередь, а не выгрузка «на потом».
            </p>
          </section>

          <section id="made" className="story-section">
            <h2 className="story-title">Сделала</h2>
            <p className="story-sub">экран сегментов — правила, из которых берётся очередь</p>
            <div className="made-stage made-stage--desk">
              <Desk screen="segments" tall="hero" />
            </div>
          </section>

          <section id="crafted" className="story-section">
            <h2 className="story-title">Проработала</h2>
            <p className="story-sub">смена, карточка сегмента, очередь, операция и итог</p>
            <div className="story-phones story-phones--desk">
              {crafted.map((shot) => (
                <Desk key={shot.screen} screen={shot.screen} caption={shot.caption} />
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
              Появилась одна поверхность на смену. Цифры ниже — типичный день
              после стабилизации очереди, не пиковый месяц и не обещание роста.
            </p>
            <div className="result-grid">
              <div className="result-card result-card--accent">
                <strong>11 <em>мин</em></strong>
                <span>Медиана закрытия</span>
                <p>Было около 19 минут, пока сумма и клиент жили в разных окнах.</p>
              </div>
              <div className="result-card">
                <strong>14 → 6</strong>
                <span>Возвраты в очередь, %</span>
                <div className="result-split" aria-hidden="true">
                  <b style={{ width: '6%' }} />
                  <i style={{ width: '94%' }} />
                </div>
                <p>Меньше возвратов, когда оператор не теряет шаг и причину на третьем экране.</p>
              </div>
              <div className="result-card">
                <strong>3 → 1</strong>
                <span>Системы на одну операцию</span>
                <p>Сегмент, очередь и закрытие больше не прыгают по Excel, BI и отдельной карточке.</p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </article>
  )
}

export default ArmCase
