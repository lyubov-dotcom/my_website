import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import BeforeAfter from '../components/BeforeAfter'
import '../CaseStudy.css'

const img = (name: string) => `${import.meta.env.BASE_URL}case/octobank/${name}.webp`

const heroMetrics = [
  { value: '83', unit: '%', label: 'Доходят до конца онбординга', detail: 'было 64% → стало 83%' },
  { value: '−52', unit: '%', label: 'Время до входа', detail: '5:10 → 2:30' },
  { value: '−44', unit: '%', label: 'Обращений в поддержку', detail: '≈3 200 → 1 800 в месяц' },
  { value: '12→7', unit: '', label: 'Шагов в сценарии', detail: 'минус 5 экранов' },
]

const problems = [
  'Длинный сценарий: выбор языка, гражданство, вопрос про Ravnaq, поповеры статуса KYC.',
  'Выбор языка — обязательный первый шаг, хотя система уже знает язык устройства.',
  'Ошибки и статусы без контекста, поддержку внутри флоу не найти.',
  'Устаревший визуал: разнородные экраны, «тяжёлые» кнопки, нет единого ритма.',
]

const sliders = [
  {
    id: 'language',
    title: 'Выбор языка',
    note: 'Был обязательный экран со списком языков. Стал — автоопределение по системе устройства; сменить язык можно в навбаре в любой момент.',
    before: img('legacy-language'),
    after: img('new-language'),
  },
  {
    id: 'welcome',
    title: 'Вход по номеру',
    note: 'Голый ввод с цифровой клавиатурой превратился в приветственный экран с понятным контекстом и офертой.',
    before: img('legacy-welcome'),
    after: img('new-welcome'),
  },
  {
    id: 'sms',
    title: 'Код из СМС',
    note: 'Одно поле без статуса → раздельные ячейки с автовводом, таймером и явным номером получателя.',
    before: img('legacy-sms'),
    after: img('new-sms'),
  },
  {
    id: 'password',
    title: 'Пароль',
    note: 'Абстрактное «Установите пароль» → регистрация с живой проверкой требований и подтверждением.',
    before: img('legacy-password'),
    after: img('new-password'),
  },
  {
    id: 'pin',
    title: 'Код для входа',
    note: 'Тот же ПИН, но в нативном ритме iOS: крупнее, спокойнее, с понятным заголовком.',
    before: img('legacy-pin'),
    after: img('new-pin'),
  },
  {
    id: 'myid',
    title: 'Идентификация',
    note: 'Сухой экран MYID → дружелюбный шаг «Подтвердите личность» с выбором резидентства.',
    before: img('legacy-myid'),
    after: img('new-myid'),
  },
]

const navbarFeatures = [
  {
    id: 'lang',
    tag: 'Язык',
    title: 'Язык — по системе, смена в навбаре',
    body: 'Приложение открывается на языке устройства. Флажок в верхнем навбаре открывает быстрый выбор языка — без отдельного шага в начале.',
    image: img('new-language'),
  },
  {
    id: 'info',
    tag: 'Диагностика',
    title: 'Данные об устройстве и версии',
    body: 'Под иконкой в навбаре — версия приложения, ОС и модель устройства. Одна кнопка «Скопировать данные» — и всё готово к отправке в поддержку.',
    image: img('new-support-info'),
  },
  {
    id: 'support',
    tag: 'Поддержка',
    title: 'Поддержка в один тап',
    body: 'Контакты собраны под иконкой в навбаре: Telegram-чат поддержки, телефон и адрес офиса — прямо из экрана входа, куда скопированные данные и отправляются.',
    image: img('new-support-contacts'),
  },
]

const removed = [
  { image: img('legacy-citizenship'), label: 'Выбор гражданства' },
  { image: img('legacy-ravnaq'), label: 'Вопрос про Ravnaq банк' },
  { image: img('legacy-privacy'), label: 'Отдельный экран согласий' },
  { image: img('legacy-kyc'), label: 'Поповер статуса KYC' },
]

const changes = [
  { title: 'Минус обязательные шаги', body: 'Язык, гражданство и лишние подтверждения ушли с критического пути — короче дорога до карты.' },
  { title: 'Единая система', body: 'Общие компоненты, типографика и ритм: экраны выглядят как одно приложение, а не набор форм.' },
  { title: 'Поддержка рядом', body: 'Диагностика и контакты встроены в навбар — пользователь не застревает и не звонит вслепую.' },
  { title: 'Нативность iOS', body: 'Клавиатуры, ячейки кода и модалки — по гайдлайнам платформы, привычно и быстро.' },
]

const secondary = [
  { value: '−100%', label: 'Отказы на экране выбора языка (шаг убран)' },
  { value: '+31%', label: 'Онбордингов завершённых с мобильных' },
  { value: '62 → 86', label: 'Оценка удобства (SUS)' },
]

function Device({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="device">
      <span className="device-notch" aria-hidden="true" />
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

      {/* HERO */}
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
            <li><span>Роль</span>Lead Product Designer</li>
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

      {/* METRICS */}
      <section className="case-metrics">
        {heroMetrics.map((m) => (
          <div className="metric" key={m.label}>
            <strong>
              {m.value}
              {m.unit && <em>{m.unit}</em>}
            </strong>
            <span className="metric-label">{m.label}</span>
            <span className="metric-detail">{m.detail}</span>
          </div>
        ))}
      </section>

      {/* SHOWCASE */}
      <section className="case-block">
        <div className="block-head">
          <span className="block-num">01</span>
          <h2>О проекте</h2>
        </div>
        <div className="showcase">
          <figure className="showcase-slider">
            <div className="slider-frame">
              <BeforeAfter before={img('legacy-welcome')} after={img('new-welcome')} alt="Экран входа" />
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
              <li>−5 шагов регистрации</li>
              <li>Авто-язык по системе</li>
              <li>Смена языка в навбаре</li>
            </ul>
          </div>
        </div>
      </section>

      {/* CONTEXT */}
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

      {/* SLIDERS */}
      <section className="case-block">
        <div className="block-head">
          <span className="block-num">03</span>
          <h2>Легаси ↔ Новый дизайн</h2>
          <p className="block-sub">Потяните ползунок, чтобы сравнить экраны до и после.</p>
        </div>
        <div className="slider-grid">
          {sliders.map((s) => (
            <figure className="slider-card" key={s.id}>
              <div className="slider-frame">
                <BeforeAfter before={s.before} after={s.after} alt={s.title} />
              </div>
              <figcaption>
                <h3>{s.title}</h3>
                <p>{s.note}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* NAVBAR FEATURES */}
      <section className="case-block">
        <div className="block-head">
          <span className="block-num">04</span>
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

      {/* REMOVED STEPS */}
      <section className="case-block">
        <div className="block-head">
          <span className="block-num">05</span>
          <h2>Что убрали с пути</h2>
          <p className="block-sub">
            Эти обязательные экраны больше не стоят между пользователем и приложением.
          </p>
        </div>
        <div className="removed-grid">
          {removed.map((r) => (
            <figure className="removed-card" key={r.label}>
              <Device src={r.image} alt={r.label} />
              <figcaption>
                <span className="removed-x" aria-hidden="true">✕</span>
                {r.label}
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* KEY DECISIONS */}
      <section className="case-block">
        <div className="block-head">
          <span className="block-num">06</span>
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

      {/* RESULTS */}
      <section className="case-block">
        <div className="block-head">
          <span className="block-num">07</span>
          <h2>Результаты</h2>
          <p className="block-sub">Через 8 недель после раскатки, в сравнении с прежним флоу.</p>
        </div>
        <div className="secondary-metrics">
          {secondary.map((m) => (
            <div className="metric metric--sm" key={m.label}>
              <strong>{m.value}</strong>
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

      <section className="case-cta">
        <h2>Нужен такой же онбординг?</h2>
        <button type="button" className="btn btn-primary" onClick={() => goHomeTo('contact')}>Обсудить проект</button>
      </section>

      <p className="case-disclaimer">
        Метрики в кейсе приведены как иллюстрация и могут быть заменены на фактические.
      </p>
    </article>
  )
}

export default CaseStudy
