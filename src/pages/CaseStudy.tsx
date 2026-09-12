import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import '../CaseStudy.css'

/*
 * Swapping in the real Figma screens:
 * 1. In Figma, export each frame as PNG (2x) — see README/Case study section.
 * 2. Drop the files into `public/case/` (e.g. legacy-1.png, new-1.png, …).
 * 3. Add the paths to a step below, e.g. `legacyImg: '/my_website/case/legacy-1.png'`.
 *    When an image path is present it replaces the coded mock automatically.
 */

type Field = {
  label: string
  value?: string
  placeholder?: string
  error?: string
  ok?: boolean
}

type ScreenSpec = {
  variant: 'legacy' | 'new'
  header: string
  progress?: { step: number; total: number }
  fields: Field[]
  note?: string
  cta: string
  meta?: string
  otp?: boolean
  success?: boolean
}

type Step = {
  id: string
  title: string
  summary: string
  legacy: ScreenSpec
  new: ScreenSpec
  legacyImg?: string
  newImg?: string
}

const heroMetrics = [
  { value: '+19 pp', label: 'Конверсия завершения', detail: '63% → 82%' },
  { value: '−57%', label: 'Время регистрации', detail: '7:40 → 3:20' },
  { value: '−41%', label: 'Звонков в колл-центр', detail: 'по теме регистрации' },
]

const secondaryMetrics = [
  { value: '−34%', label: 'Отказы на шаге верификации' },
  { value: '+26%', label: 'Заявок с мобильных' },
  { value: '62 → 84', label: 'Оценка удобства (SUS)' },
]

const problems = [
  'Одна форма из 20+ полей — люди бросали регистрацию на середине.',
  'Ошибки без подсказок: «проверьте правильность полей» — и всё.',
  'Верификация ощущалась как «чёрный ящик» без статуса.',
  'Не видно прогресса — непонятно, сколько ещё осталось.',
]

const solutions = [
  '4 коротких шага с наглядным прогрессом.',
  'Один вопрос — один экран, крупные поля.',
  'Понятные инлайн-подсказки и автоформат ввода.',
  'Автозаполнение из профиля и код по СМС с автовводом.',
]

const changes = [
  { title: 'Пошаговый флоу', body: 'Разбили монолитную форму на 4 экрана. Меньше страха, выше завершаемость.' },
  { title: 'Живые подсказки', body: 'Ошибки объясняют, что не так и как исправить — прямо под полем.' },
  { title: 'Умная верификация', body: 'СМС-код с автовводом и понятным таймером вместо «глухого» экрана.' },
  { title: 'Автозаполнение', body: 'Данные подтягиваются из профиля — пользователь только проверяет.' },
]

const steps: Step[] = [
  {
    id: 'start',
    title: '1. Начало регистрации',
    summary: 'Легаси встречал стеной полей. В новом флоу — один простой вопрос.',
    legacy: {
      variant: 'legacy',
      header: 'Регистрация',
      fields: [
        { label: 'ФИО', placeholder: 'Иванов Иван Иванович' },
        { label: 'Дата рождения', placeholder: 'дд.мм.гггг' },
        { label: 'Паспорт: серия и номер', placeholder: '0000 000000' },
        { label: 'ИНН', placeholder: '000000000000' },
        { label: 'СНИЛС', placeholder: '000-000-000 00' },
        { label: 'Телефон', placeholder: '+7 (___) ___-__-__' },
        { label: 'E-mail', placeholder: 'you@mail.ru' },
        { label: 'Пароль', placeholder: '••••••••' },
      ],
      error: undefined,
      note: 'Проверьте правильность заполнения всех полей',
      cta: 'Отправить заявку',
    } as ScreenSpec,
    new: {
      variant: 'new',
      header: 'Ваш номер телефона',
      progress: { step: 1, total: 4 },
      fields: [{ label: 'Телефон', value: '+7 916 000-45-45', ok: true }],
      note: 'Пришлём код в СМС — это займёт пару минут.',
      cta: 'Продолжить',
    },
  },
  {
    id: 'verify',
    title: '2. Подтверждение по СМС',
    summary: 'Раньше — «глухой» экран без статуса. Теперь — автоввод кода и таймер.',
    legacy: {
      variant: 'legacy',
      header: 'Введите код из СМС',
      fields: [
        { label: 'Код подтверждения', placeholder: 'Код из сообщения', error: 'Неверный код' },
        { label: 'Повторите телефон', placeholder: '+7 (___) ___-__-__' },
      ],
      cta: 'Проверить',
      meta: 'Если код не пришёл — обратитесь в отделение банка.',
    },
    new: {
      variant: 'new',
      header: 'Код из СМС',
      progress: { step: 2, total: 4 },
      otp: true,
      fields: [],
      note: 'Отправили на +7 916 ··· 45. Повторить через 0:24',
      cta: 'Подтвердить',
    },
  },
  {
    id: 'data',
    title: '3. Личные данные',
    summary: 'Вместо ручного ввода паспорта — предзаполнение с проверкой.',
    legacy: {
      variant: 'legacy',
      header: 'Паспортные данные',
      fields: [
        { label: 'Серия и номер', placeholder: '0000 000000' },
        { label: 'Кем выдан', placeholder: 'Отделом УФМС…' },
        { label: 'Дата выдачи', placeholder: 'дд.мм.гггг', error: 'Неверный формат даты' },
        { label: 'Код подразделения', placeholder: '000-000' },
        { label: 'Адрес регистрации', placeholder: 'Город, улица, дом' },
      ],
      cta: 'Далее',
    },
    new: {
      variant: 'new',
      header: 'Проверьте данные',
      progress: { step: 3, total: 4 },
      fields: [
        { label: 'ФИО', value: 'Иванова Анна Петровна', ok: true },
        { label: 'Паспорт', value: '45 08 ·· ····', ok: true },
        { label: 'Адрес', value: 'Москва, ул. Тверская, 1', ok: true },
      ],
      note: 'Мы подтянули данные из профиля — просто проверьте.',
      cta: 'Всё верно',
    },
  },
  {
    id: 'done',
    title: '4. Готово',
    summary: 'Сухое «ожидайте звонка» превратилось в понятный успех и следующий шаг.',
    legacy: {
      variant: 'legacy',
      header: 'Заявка принята',
      fields: [],
      meta: 'Ваша заявка отправлена. Оператор перезвонит в течение 3 рабочих дней.',
      cta: 'Закрыть',
    },
    new: {
      variant: 'new',
      header: 'Счёт открыт!',
      progress: { step: 4, total: 4 },
      success: true,
      fields: [],
      note: 'Карта уже в приложении. Можно пополнять и платить.',
      cta: 'Перейти в приложение',
    },
  },
]

function StatusBar({ dark }: { dark?: boolean }) {
  return (
    <div className={`pm-status ${dark ? 'pm-status--dark' : ''}`}>
      <span>9:41</span>
      <span className="pm-status-icons" aria-hidden="true">••••| 5G ▮</span>
    </div>
  )
}

function Screen({ spec }: { spec: ScreenSpec }) {
  const isNew = spec.variant === 'new'
  return (
    <div className={`pm-screen pm-screen--${spec.variant}`}>
      <StatusBar dark={isNew} />
      <div className="pm-body">
        {spec.progress && (
          <div className="pm-progress">
            <div className="pm-progress-track">
              <div
                className="pm-progress-fill"
                style={{ width: `${(spec.progress.step / spec.progress.total) * 100}%` }}
              />
            </div>
            <span className="pm-progress-label">
              Шаг {spec.progress.step} из {spec.progress.total}
            </span>
          </div>
        )}

        <h4 className="pm-title">{spec.header}</h4>

        {spec.success && (
          <div className="pm-success">
            <div className="pm-success-badge" aria-hidden="true">✓</div>
            <div className="pm-card">
              <span className="pm-card-brand">AURORA</span>
              <span className="pm-card-number">•••• •••• •••• 4045</span>
              <span className="pm-card-name">ANNA IVANOVA</span>
            </div>
          </div>
        )}

        {spec.otp && (
          <div className="pm-otp">
            {['4', '8', '', ''].map((d, i) => (
              <span key={i} className={`pm-otp-box ${d ? 'pm-otp-box--filled' : ''} ${i === 2 ? 'pm-otp-box--active' : ''}`}>{d}</span>
            ))}
          </div>
        )}

        <div className="pm-fields">
          {spec.fields.map((f, i) => (
            <label key={i} className={`pm-field ${f.error ? 'pm-field--error' : ''} ${f.ok ? 'pm-field--ok' : ''}`}>
              <span className="pm-field-label">{f.label}</span>
              <span className={`pm-input ${f.value ? 'pm-input--filled' : ''}`}>
                {f.value || f.placeholder}
                {f.ok && <span className="pm-input-ok" aria-hidden="true">✓</span>}
              </span>
              {f.error && <span className="pm-field-msg">{f.error}</span>}
            </label>
          ))}
        </div>

        {spec.note && <p className={`pm-note ${isNew ? 'pm-note--new' : 'pm-note--legacy'}`}>{spec.note}</p>}
        {spec.meta && <p className="pm-meta">{spec.meta}</p>}

        <button type="button" className={`pm-cta ${isNew ? 'pm-cta--new' : 'pm-cta--legacy'}`}>
          {spec.cta}
        </button>
      </div>
    </div>
  )
}

function Phone({ spec, img, alt }: { spec: ScreenSpec; img?: string; alt: string }) {
  return (
    <div className="phone">
      <div className="phone-notch" aria-hidden="true" />
      {img ? <img className="phone-img" src={img} alt={alt} /> : <Screen spec={spec} />}
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
        <p className="eyebrow">Case study · Fintech</p>
        <h1>Онлайн-регистрация в&nbsp;банке<br />без боли</h1>
        <p className="lede">
          Редизайн флоу открытия счёта для Aurora Bank: превратили длинную анкету
          в короткий пошаговый сценарий — и сняли нагрузку с колл-центра.
        </p>
        <ul className="case-meta">
          <li><span>Роль</span>Lead Product Designer</li>
          <li><span>Сроки</span>6 недель</li>
          <li><span>Платформы</span>iOS · Android · Web</li>
          <li><span>Команда</span>PM, 2 инженера, аналитик</li>
        </ul>
      </header>

      <section className="case-metrics">
        {heroMetrics.map((m) => (
          <div className="metric" key={m.label}>
            <strong>{m.value}</strong>
            <span className="metric-label">{m.label}</span>
            <span className="metric-detail">{m.detail}</span>
          </div>
        ))}
      </section>

      <section className="case-block">
        <div className="case-two">
          <div>
            <h2>Проблема</h2>
            <ul className="case-list case-list--bad">
              {problems.map((p) => <li key={p}>{p}</li>)}
            </ul>
          </div>
          <div>
            <h2>Что сделали</h2>
            <ul className="case-list case-list--good">
              {solutions.map((s) => <li key={s}>{s}</li>)}
            </ul>
          </div>
        </div>
      </section>

      <section className="case-block">
        <div className="section-head">
          <h2>Легаси → новый дизайн</h2>
          <p>Пошаговое сравнение старого и обновлённого сценария регистрации.</p>
        </div>

        <div className="flow">
          {steps.map((step) => (
            <div className="flow-step" key={step.id}>
              <div className="flow-head">
                <h3>{step.title}</h3>
                <p>{step.summary}</p>
              </div>
              <div className="compare">
                <div className="compare-col">
                  <span className="tag tag--legacy">Легаси</span>
                  <Phone spec={step.legacy} img={step.legacyImg} alt={`Легаси экран: ${step.title}`} />
                </div>
                <div className="compare-arrow" aria-hidden="true">→</div>
                <div className="compare-col">
                  <span className="tag tag--new">Новый дизайн</span>
                  <Phone spec={step.new} img={step.newImg} alt={`Новый экран: ${step.title}`} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="case-block">
        <div className="section-head">
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
        <div className="section-head">
          <h2>Результаты</h2>
          <p>Через 8 недель после запуска, сравнение с прежним флоу.</p>
        </div>
        <div className="secondary-metrics">
          {secondaryMetrics.map((m) => (
            <div className="metric metric--sm" key={m.label}>
              <strong>{m.value}</strong>
              <span className="metric-label">{m.label}</span>
            </div>
          ))}
        </div>
        <p className="case-outcome">
          Короткий пошаговый флоу с понятными подсказками поднял завершаемость
          регистрации и заметно разгрузил колл-центр: клиенты стали доходить до
          конца сами, без звонков в поддержку.
        </p>
      </section>

      <section className="case-cta">
        <h2>Нужен такой же результат?</h2>
        <button type="button" className="btn btn-primary" onClick={() => goHomeTo('contact')}>Обсудить проект</button>
      </section>
    </article>
  )
}

export default CaseStudy
