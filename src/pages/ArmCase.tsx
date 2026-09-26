import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArmFrame, type ArmScreenId } from '../components/ArmScreens'
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
  { value: '42', unit: '', label: 'Операций за день', detail: 'Столько успевает один сотрудник' },
  { value: '11', unit: 'мин', label: 'На одну операцию', detail: 'От «беру в работу» до «готово»' },
  { value: '6%', unit: '', label: 'Начали заново', detail: 'Раньше так было у 14 из 100' },
  { value: '1', unit: '', label: 'Окно вместо трёх', detail: 'Список, очередь и операция в одном месте' },
]

const aboutFacts = [
  {
    text: 'Списки клиентов собираются сами. Сотрудник сразу видит, кому помочь.',
    tone: 'light' as const,
    icon: 'pulse' as const,
  },
  {
    text: 'На одном экране имя, сумма и что сейчас происходит. Новое окно не открывается.',
    tone: 'dark' as const,
    icon: 'people' as const,
  },
  {
    text: 'В первую версию вошли рабочий день, списки и очередь. Сложные отчёты сделали позже.',
    tone: 'dark' as const,
    icon: 'scope' as const,
  },
]

const scenes: { title: string; body: string; screen: ArmScreenId }[] = [
  {
    title: 'Открыть день',
    body: 'Увидеть, кому помочь в первую очередь.',
    screen: 'overview',
  },
  {
    title: 'Понять список',
    body: 'Прочитать, почему человек здесь, и открыть этих людей.',
    screen: 'detail',
  },
  {
    title: 'Взять следующего',
    body: 'Сначала срочные дела, не просто кто раньше написал.',
    screen: 'queue',
  },
  {
    title: 'Закончить операцию',
    body: 'Имя и сумма остаются на экране до кнопки «Готово».',
    screen: 'operation',
  },
]

const crafted: { screen: ArmScreenId; caption: string }[] = [
  { screen: 'overview', caption: 'Начало дня · кому помочь' },
  { screen: 'detail', caption: 'Список · кто в нём и почему' },
  { screen: 'queue', caption: 'Очередь · кто следующий' },
  { screen: 'operation', caption: 'Операция · всё на одном экране' },
  { screen: 'shift', caption: 'Конец дня · что успели' },
]

const problems = [
  'Списки жили в Excel и отдельных отчётах. Сотрудник смотрел цифры в одном месте, а работал в другом. Пока переключался, список уже устаревал.',
  'Карточка клиента открывалась отдельно. На третьем шаге забывали сумму и зачем человек в работе.',
  'Очередь шла по времени прихода. Срочное дело стояло в одной линии с вчерашним незакрытым.',
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
}: {
  screen: ArmScreenId
  caption?: string
}) {
  return (
    <figure className="arm-shot">
      <ArmFrame screen={screen} />
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
        <Desk key={current.screen} screen={current.screen} />
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
            <p className="eyebrow">Веб-АРМ · внутренний сервис · 2024</p>
            <h1>Веб-АРМ</h1>
            <p className="lede">
              Это рабочий стол для сотрудника банка. На одном экране видно,
              кому помочь сейчас, и можно закончить операцию — без прыжков
              по разным программам.
            </p>
            <ul className="case-chips">
              <li><span>Роль</span>Дизайнер</li>
              <li><span>Где</span>Компьютер</li>
              <li><span>Что</span>Внутренний сервис</li>
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
                <ArmFrame screen="overview" />
                <figcaption>
                  Я делала рабочий стол для сотрудников банка. Нужно было,
                  чтобы человек видел список клиентов и мог закончить операцию
                  в одном месте — не прыгая между Excel, отчётами и другой
                  программой.
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
              Я придумала, как устроен рабочий день: от списка клиентов
              до кнопки «Готово». Список — это не отчёт «посмотреть потом»,
              а люди, с которыми нужно работать прямо сейчас.
            </p>
          </section>

          <section id="made" className="story-section">
            <h2 className="story-title">Сделала</h2>
            <p className="story-sub">экран со списками — кого собрать и почему</p>
            <div className="made-stage made-stage--desk">
              <Desk screen="segments" />
            </div>
          </section>

          <section id="crafted" className="story-section">
            <h2 className="story-title">Проработала</h2>
            <p className="story-sub">начало дня, карточка списка, очередь, операция и итог дня</p>
            <div className="arm-gallery">
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
              Появилось одно место на весь рабочий день. Цифры ниже — обычный
              день, когда всё уже работает. Это не лучший месяц и не обещание,
              что так будет всегда.
            </p>
            <div className="result-grid">
              <div className="result-card result-card--accent">
                <strong>11 <em>мин</em></strong>
                <span>На одну операцию</span>
                <p>Раньше около 19 минут: сумма была в одном окне, клиент в другом.</p>
              </div>
              <div className="result-card">
                <strong>14 → 6</strong>
                <span>Из ста операций начинали заново</span>
                <div className="result-split" aria-hidden="true">
                  <b style={{ width: '6%' }} />
                  <i style={{ width: '94%' }} />
                </div>
                <p>Стало меньше, потому что сотрудник не теряет, на каком он шаге.</p>
              </div>
              <div className="result-card">
                <strong>3 → 1</strong>
                <span>Столько программ нужно было</span>
                <p>Больше не надо прыгать по Excel, отчётам и отдельной карточке.</p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </article>
  )
}

export default ArmCase
