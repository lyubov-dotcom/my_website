import { Link } from 'react-router-dom'
import { ArmDesktop } from '../components/ArmScreens'
import '../ArmCase.css'

const asset = (p: string) => `${import.meta.env.BASE_URL}${p}`

const cases = [
  {
    to: '/case/bank-registration',
    cover: 'case/covers/octobank-onboarding.webp',
    title: 'Octobank',
    subtitle: 'Регистрация нового пользователя',
    year: '2026',
  },
  {
    to: '/case/octobank-premium',
    cover: 'case/covers/octobank-premium.webp',
    title: 'Octobank Premium',
    subtitle: 'Подключение премиального сервиса',
    year: '2026',
  },
]

const jobs = [
  {
    company: 'Octobank',
    role: 'Продуктовый дизайнер',
    dates: '02.2025 — н.в.',
    focus: 'Редизайн Octo-Mobile, продуктовые сценарии и дизайн-система банка.',
    points: [
      'Вела редизайн мобильного приложения Octo-Mobile: разрабатывала и презентовала дизайн-концепции, согласовывала направление со стейкхолдерами и командой.',
      'Проектировала макеты всех разделов банковского приложения на основе утверждённой концепции — от навигации до продуктовых сценариев.',
      'Пересматривала UX существующих флоу: находила трение, предлагала более короткие пути и доводила решения до продакшена.',
      'Работала с разработчиками, аналитиками, тестировщиками и PM на всех этапах — от постановки задачи до релиза.',
      'Проводила дизайн-ревью вёрстки: сверяла реализацию со спецификациями и закрывала расхождения до раскатки.',
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
          Интерфейсы, в которых<br />
          всё <span className="accent">логично</span>
        </h1>
        <p className="lede">
          Я UX/UI-дизайнер с инженерным бэкграундом. Мой опыт позволяет видеть
          систему целиком, разбираться в сложных механизмах и не упускать детали.
          Слушаю пользователей, слышу команду и уже 5 лет создаю продукты,
          которым удобно доверять. Сейчас работаю над интерфейсами для банковской
          сферы.
        </p>
      </section>

      <section id="work" className="work">
        <div className="section-head">
          <h2>Работы</h2>
          <p>Здесь публичные кейсы. Есть много проектов под НДА могу показать на интервью.</p>
        </div>
        <div className="project-grid">
          {cases.map((item) => (
            <Link className="project-card project-card--link" to={item.to} key={item.to}>
              <div className="project-thumb project-thumb--cover">
                <img
                  className="project-shot"
                  src={asset(item.cover)}
                  alt={item.title}
                  loading="lazy"
                />
                <span className="project-year">{item.year}</span>
                <span className="project-badge">Открыть кейс →</span>
              </div>
              <h3>{item.title}</h3>
              <p>{item.subtitle}</p>
            </Link>
          ))}
          <Link className="project-card project-card--link project-card--wide" to="/case/web-arm">
            <div className="project-thumb project-thumb--cover project-thumb--wide">
              <div className="arm-cover">
                <ArmDesktop screen="overview" compact />
              </div>
              <span className="project-year">2024</span>
              <span className="project-badge">Открыть кейс →</span>
            </div>
            <h3>Веб-АРМ</h3>
            <p>Рабочий стол сотрудника банка: кому помочь и как закончить операцию</p>
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
