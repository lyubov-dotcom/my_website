import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import BeforeAfter from '../components/BeforeAfter'
import '../CaseStudy.css'

const img = (name: string) => `${import.meta.env.BASE_URL}case/octobank/${name}.webp`

const heroMetrics = [
  { value: '83', unit: '%', label: 'Доходят до конца онбординга', detail: 'было 64% → стало 83%' },
  { value: '52', unit: '%', label: 'Сократили время до входа', detail: '5:10 → 2:30' },
  { value: '44', unit: '%', label: 'Уменьшили обращения в поддержку', detail: '≈3 200 → 1 800 в месяц' },
  { value: '12→8', unit: '', label: 'Шагов в сценарии', detail: 'минус 4 экрана' },
]

const problems = [
  'Длинный сценарий: выбор языка, гражданство, вопрос про Ravnaq, поповеры статуса KYC.',
  'Выбор языка — обязательный первый шаг, хотя система уже знает язык устройства.',
  'Ошибки и статусы без контекста, поддержку внутри флоу не найти.',
  'Устаревший визуал: разнородные экраны, «тяжёлые» кнопки, нет единого ритма.',
]

const navbarFeatures = [
  {
    id: 'lang',
    tag: 'Язык',
    title: 'Язык — по системе, смена в навбаре',
    body: 'Приложение открывается на языке устройства. Флажок в верхнем навбаре открывает быстрый выбор языка — без отдельного шага в начале.',
    image: img('nav-language'),
  },
  {
    id: 'info',
    tag: 'Диагностика',
    title: 'Данные об устройстве и версии',
    body: 'Под иконкой в навбаре — версия приложения, ОС и модель устройства. Одна кнопка «Скопировать данные» — и всё готово к отправке в поддержку.',
    image: img('nav-diagnostics'),
  },
  {
    id: 'support',
    tag: 'Поддержка',
    title: 'Поддержка в один тап',
    body: 'Контакты собраны под иконкой в навбаре: Telegram-чат поддержки, телефон и адрес офиса — прямо из экрана входа, куда скопированные данные и отправляются.',
    image: img('nav-support'),
  },
]

const removed: {
  image: string
  title: string
  body: string
  after?: string
}[] = [
  {
    image: img('legacy-language'),
    title: 'Экран выбора языка',
    body: 'Убрали обязательный первый шаг: приложение подстраивается под язык системы устройства. Сменить язык можно в любой момент — по иконке в навбаре.',
  },
  {
    image: img('legacy-privacy'),
    title: 'Обязательное подписание документов',
    body: 'Отдельный экран согласий заменили короткой строкой над кнопкой: отправляя номер телефона, пользователь принимает документы. Сами документы открываются по ссылкам прямо в этом тексте.',
  },
  {
    image: img('legacy-ravnaq'),
    title: 'Вопрос «вы клиент банка?»',
    body: 'Больше не спрашиваем — определяем это автоматически по введённому номеру телефона.',
  },
  {
    image: img('legacy-citizenship'),
    after: img('new-myid'),
    title: 'Селектор гражданства',
    body: 'Вместо выпадающего списка — экран с двумя кнопками: «Я резидент Узбекистана» и «Я не резидент». Для клиента разницы нет — все проходят биометрию через MyID. Шаг нужен команде разработки: по нему понятно, какой функционал доступен пользователю (например, нерезиденту недоступны некоторые услуги, такие как кредит).',
  },
]

const changes = [
  { title: 'Минус обязательные шаги', body: 'Язык, гражданство и лишние подтверждения ушли с критического пути — короче дорога до карты.' },
  { title: 'Единая система', body: 'Общие компоненты, типографика и ритм: экраны выглядят как одно приложение, а не набор форм.' },
  { title: 'Поддержка рядом', body: 'Диагностика и контакты встроены в навбар — пользователь не застревает и не звонит вслепую.' },
  { title: 'Нативность iOS', body: 'Клавиатуры, ячейки кода и модалки — по гайдлайнам платформы, привычно и быстро.' },
]

const secondary = [
  { value: 'Без лишнего шага', label: 'Язык берётся из системы — вход начинается сразу с номера' },
  { value: 'Поддержка в навбаре', label: 'Данные устройства копируются и уходят в Telegram одним тапом' },
  { value: 'Короче путь', label: 'Четыре экрана сняли с регистрации — до карты быстрее и спокойнее' },
]

function Device({ src, alt, bare = false }: { src: string; alt: string; bare?: boolean }) {
  return (
    <div className={`device${bare ? ' device--bare' : ''}`}>
      {!bare && <span className="device-notch" aria-hidden="true" />}
      <img src={src} alt={alt} loading="lazy" />
    </div>
  )
}

function CaseStudy() {
  const navigate = useNavigate()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const goHomeTo = (id: string) => {
    navigate('/')
    window.setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    }, 80)
  }

  return (
    <article className="case">
      <button type="button" className="case-back" onClick={() => goHomeTo('work')}>← Все проекты</button>

      <header className="case-hero">
        <div className="case-hero-copy">
          <p className="eyebrow">Octobank · Fintech · 2026</p>
          <h1>Меньше шагов —<br />быстрее вход в&nbsp;банк</h1>
          <p className="lede">
            Редизайн авторизации и регистрации Octobank: сократили путь до входа,
            заменили легаси-компоненты на новую дизайн-систему и убрали лишние
            шаги на пути пользователя.
          </p>
          <ul className="case-chips">
            <li><span>Роль</span>Product designer</li>
            <li><span>Платформы</span>iOS · Android</li>
            <li><span>Сроки</span>2 спринта (4 недели)</li>
            <li><span>Год</span>2026</li>
          </ul>
        </div>
        <div className="case-hero-visual" aria-hidden="true">
          <div className="hero-phone hero-phone--back">
            <img src={img('new-welcome')} alt="" loading="lazy" />
          </div>
          <div className="hero-phone hero-phone--front">
            <img src={img('new-dashboard')} alt="" loading="lazy" />
          </div>
        </div>
      </header>

      <section className="case-metrics">
        {heroMetrics.map((m) => (
          <div className="metric" key={m.label}>
            <strong className={m.value.length > 4 ? 'metric-word' : undefined}>
              {m.value}
              {m.unit && <em>{m.unit}</em>}
            </strong>
            <span className="metric-label">{m.label}</span>
            <span className="metric-detail">{m.detail}</span>
          </div>
        ))}
      </section>

      <section className="case-block">
        <div className="block-head">
          <span className="block-num">01</span>
          <h2>О проекте</h2>
        </div>
        <div className="showcase">
          <figure className="showcase-slider">
            <div className="showcase-frame">
              <BeforeAfter
                className="ba--wide"
                before={img('frames-legacy')}
                after={img('frames-new')}
                alt="Экраны онбординга Octobank"
                beforeLabel="Легаси"
                afterLabel="Новый дизайн"
              />
            </div>
            <figcaption>Потяните ползунок: слева — легаси, справа — новый дизайн.</figcaption>
          </figure>
          <div className="showcase-copy">
            <p>
              Это полный редизайн авторизации Octobank: легаси-компоненты заменены
              на элементы новой дизайн-системы — единые поля, кнопки, модалки и
              типографика.
            </p>
            <p>
              Но это не только визуал. Я пересобрала сам флоу и сократила число
              шагов регистрации. Выбор языка теперь происходит автоматически — по
              языку системы устройства, поэтому отдельный экран выбора больше не
              нужен. При этом сменить язык можно в любой момент по иконке в навбаре.
            </p>
            <ul className="showcase-tags">
              <li>Новая дизайн-система</li>
              <li>Минус 4 шага регистрации</li>
              <li>Авто-язык по системе</li>
              <li>Смена языка в навбаре</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="case-block">
        <div className="block-head">
          <span className="block-num">02</span>
          <h2>С чего начинали</h2>
        </div>
        <div className="case-two">
          <p className="block-intro">
            Старый онбординг Octobank вырос из отдельных форм: пользователь
            проходил длинную цепочку экранов, а на первом шаге его встречал
            обязательный выбор языка. До главного экрана доходили не все.
          </p>
          <ul className="case-list case-list--bad">
            {problems.map((p) => <li key={p}>{p}</li>)}
          </ul>
        </div>
      </section>

      <section className="case-block">
        <div className="block-head">
          <span className="block-num">03</span>
          <h2>Новый навбар: язык, диагностика, поддержка</h2>
          <p className="block-sub">
            Три вещи, которые раньше терялись, теперь всегда под рукой — в верхней панели.
          </p>
        </div>
        <div className="feature-list">
          {navbarFeatures.map((f, i) => (
            <div className={`feature ${i % 2 ? 'feature--rev' : ''}`} key={f.id}>
              <Device src={f.image} alt={f.title} />
              <div className="feature-copy">
                <span className="feature-tag">{f.tag}</span>
                <h3>{f.title}</h3>
                <p>{f.body}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="case-block">
        <div className="block-head">
          <span className="block-num">04</span>
          <h2>Что убрали и упростили</h2>
          <p className="block-sub">
            Обязательные экраны, которые больше не стоят между пользователем и приложением.
          </p>
        </div>
        <div className="removed-list">
          {removed.map((r) => (
            <div className="removed-item" key={r.title}>
              <div className="removed-shots">
                <Device bare src={r.image} alt={`Легаси: ${r.title}`} />
                {r.after && (
                  <>
                    <span className="removed-arrow" aria-hidden="true">→</span>
                    <Device bare src={r.after} alt={`Новый: ${r.title}`} />
                  </>
                )}
              </div>
              <div className="removed-copy">
                <h3><span className="removed-x" aria-hidden="true">✕</span>{r.title}</h3>
                <p>{r.body}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="case-block">
        <div className="block-head">
          <span className="block-num">05</span>
          <h2>Ключевые решения</h2>
        </div>
        <div className="changes-grid">
          {changes.map((c) => (
            <div className="change" key={c.title}>
              <h3>{c.title}</h3>
              <p>{c.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="case-block">
        <div className="block-head">
          <span className="block-num">06</span>
          <h2>Результаты</h2>
          <p className="block-sub">Через 8 недель после раскатки, в сравнении с прежним флоу.</p>
        </div>
        <div className="secondary-metrics">
          {secondary.map((m) => (
            <div className="metric metric--sm" key={m.label}>
              <strong className="metric-word">{m.value}</strong>
              <span className="metric-label">{m.label}</span>
            </div>
          ))}
        </div>
        <p className="case-outcome">
          Убрав лишние шаги и встроив поддержку в интерфейс, мы сократили путь до
          первого входа и сняли часть нагрузки с колл-центра: пользователи
          доходят до карты сами, а если застревают — решают вопрос в один тап.
        </p>
      </section>
    </article>
  )
}

export default CaseStudy
