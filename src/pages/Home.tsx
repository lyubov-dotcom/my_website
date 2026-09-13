import { Link } from 'react-router-dom'

const asset = (p: string) => `${import.meta.env.BASE_URL}${p}`

const scrollToId = (id: string) => {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}

const stats = [
  { value: '5 лет', label: 'в UX/UI и продуктовом дизайне' },
  { value: 'Fintech', label: 'банки и цифровые продукты' },
  { value: 'ДС', label: 'дизайн-системы с нуля и в команде' },
]

const jobs = [
  {
    company: 'Octobank',
    role: 'Продуктовый дизайнер',
    dates: '02.2025 — н.в.',
    focus: 'Дебетовые карты, лояльность, дизайн-система банка.',
    points: [
      'Редизайн Octo-mobile: концепция, макеты разделов, пересмотр UX ключевых флоу — около 50% приложения.',
      'Упростила главный экран: быстрее доступ к самым частым операциям.',
      'С нуля: дебетовые карты, кешбэк и программа лояльности; первые концепции для Premium.',
      'Новые компоненты дизайн-системы: спецификации и микровзаимодействия для разработки.',
    ],
  },
  {
    company: 'ПАО «Промсвязьбанк»',
    role: 'Продуктовый дизайнер',
    dates: '04.2023 — 02.2025',
    focus: 'Цифровой рубль, дизайн-система, внутренние сервисы.',
    points: [
      'Сценарии кошелька ЦР: регистрация, переводы C2C/C2B, обмен, история, QR, утверждено Банком России.',
      'Улучшила UX «Сервиса финансового посредника» — дашборд для операционистов.',
      'Компоненты Tools: календарь событий, графики, «Древо»; документация модуля операций (>5000 операций).',
      'Новые разделы WEB-ARM: Цифровой рубль и Мобильный оператор — от входа до завершения операции.',
    ],
  },
  {
    company: 'Freelance',
    role: 'Дизайнер интерфейсов',
    dates: '12.2022 — 05.2023',
    focus: 'Лендинги и многостраничные сайты.',
    points: [
      'Исследование аудитории, анализ конкурентов, адаптивный дизайн.',
      'Проекты: недвижимость, маркетплейсы, медицина; иконки и баннеры для соцсетей.',
    ],
  },
  {
    company: 'TUI Russia & CIS (сейчас FUN&SUN / FS Travel)',
    role: 'UX-дизайнер',
    dates: '10.2021 — 12.2022',
    focus: 'Сайт FUN&SUN и основы дизайн-системы.',
    points: [
      'Макеты и адаптив сайта, новая главная, лендинги маркетинга.',
      'Внутренние страницы: экскурсии, «О нас», «Мои заказы»; экраны системы NPS.',
      'Компоненты и документация ДС, пак иконок в стиле Flat.',
    ],
  },
]

function Home() {
  return (
    <>
      <section id="top" className="hero">
        <p className="eyebrow">UX/UI · продуктовый дизайнер · финтех</p>
        <h1>
          Любовь Чуйко —<br />
          интерфейсы, в которых<br />
          всё <span className="accent">логично</span>
        </h1>
        <p className="lede">
          Привет! Я дизайнер интерфейсов. По образованию инженер — этот опыт
          помогает разбираться в сложных системах и не упускать детали. Слушаю
          пользователей и нахожу общий язык с командой. 5 лет в UX/UI, сейчас
          делаю банковские продукты.
        </p>
        <div className="hero-actions">
          <button type="button" className="btn btn-primary" onClick={() => scrollToId('work')}>Смотреть работы</button>
          <button type="button" className="btn btn-ghost" onClick={() => scrollToId('experience')}>Опыт</button>
        </div>
        <ul className="stats">
          {stats.map((s) => (
            <li key={s.label}>
              <strong>{s.value}</strong>
              <span>{s.label}</span>
            </li>
          ))}
        </ul>
      </section>

      <section id="work" className="work">
        <div className="section-head">
          <h2>Работы</h2>
          <p>Публичный кейс. Есть проекты под НДА — покажу на интервью.</p>
        </div>
        <div className="project-grid project-grid--single">
          <Link className="project-card project-card--link" to="/case/bank-registration">
            <div
              className="project-thumb project-thumb--shot"
              style={{ background: 'linear-gradient(135deg, #2f6bff, transparent 140%)' }}
            >
              <img
                className="project-shot"
                src={asset('case/octobank/new-dashboard.webp')}
                alt="Octobank — превью"
                loading="lazy"
              />
              <span className="project-year">2026</span>
              <span className="project-badge">Открыть кейс →</span>
            </div>
            <h3>Octobank</h3>
            <p>Продуктовый дизайн · онбординг</p>
          </Link>
        </div>
      </section>

      <section id="experience" className="experience">
        <div className="section-head">
          <h2>Опыт работы</h2>
        </div>
        <div className="job-list">
          {jobs.map((job) => (
            <article className="job" key={job.company}>
              <header className="job-head">
                <div>
                  <h3>{job.company}</h3>
                  <p className="job-role">{job.role}</p>
                </div>
                <span className="job-dates">{job.dates}</span>
              </header>
              <p className="job-focus">{job.focus}</p>
              <ul>
                {job.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section id="about" className="about">
        <div className="section-head">
          <h2>Обо мне</h2>
        </div>
        <p className="about-copy">
          Меня вдохновляет дизайн, который не нужно объяснять. Цель — чтобы
          пользователь не спрашивал: «Как этим пользоваться?» Работаю с финтехом:
          мобильные банки, цифровые сервисы, внутренние кабинеты и дизайн-системы.
        </p>
        <div className="edu-grid">
          <div>
            <h3>Образование</h3>
            <p>РГУ нефти и газа им. И.М. Губкина</p>
            <p className="muted">Бакалавр и магистр, химическая технология и экология · 2015, 2017</p>
          </div>
          <div>
            <h3>Обучение</h3>
            <p>Skillbox — профессия UX/UI дизайнер, 2021</p>
            <p className="muted">Онлайн-стажировка DSGNERS! (CreativePeople и Humbleteam), 2020</p>
          </div>
        </div>
      </section>

      <section id="contacts" className="contacts">
        <div className="section-head">
          <h2>Контакты</h2>
          <p>Можно написать или позвонить — отвечаю в Telegram, WhatsApp и по почте.</p>
        </div>
        <ul className="contact-links">
          <li>
            <span>Телефон</span>
            <a href="tel:+79162538106">+7 916 253-81-06</a>
          </li>
          <li>
            <span>Email</span>
            <a href="mailto:lyubovchyiko@gmail.com">lyubovchyiko@gmail.com</a>
          </li>
          <li>
            <span>Behance</span>
            <a href="https://www.behance.net/chyukola93" target="_blank" rel="noreferrer">behance.net/chyukola93</a>
          </li>
        </ul>
      </section>
    </>
  )
}

export default Home
