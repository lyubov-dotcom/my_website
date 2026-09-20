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
  { id: 'flow', label: 'Сценарий' },
  { id: 'problems', label: 'Проблемы' },
  { id: 'entry', label: 'Точка входа' },
  { id: 'offer', label: 'Оффер' },
  { id: 'privileges', label: 'Привилегии' },
  { id: 'checkout', label: 'Подключение' },
  { id: 'free', label: 'Бесплатно' },
  { id: 'status', label: 'Мой Premium' },
  { id: 'results', label: 'Результат' },
] as const

const metrics = [
  { value: '1', unit: 'мес', label: 'Бесплатно при подключении' },
  { value: '222', unit: 'тыс', label: 'Продление, UZS — или бесплатно' },
  { value: '24', unit: '%', label: 'До, ставка по депозитам UZS' },
]

const flow = [
  { n: '01', title: 'Увидеть оффер', body: 'С главной открыть Premium и понять ценность за минуту' },
  { n: '02', title: 'Разобрать привилегии', body: 'Открыть деталь — ставки, менеджер, курс — не выходя из сценария' },
  { n: '03', title: 'Подключить', body: 'Увидеть цену, карту списания и нажать одну кнопку' },
  { n: '04', title: 'Следить за статусом', body: 'В «Мой Premium» — льгота, продление и условия бесплатности' },
]

const roleCards = [
  { verb: 'Собрала', text: 'иерархию оффера и список привилегий' },
  { verb: 'Проработала', text: 'детали: менеджер, ставки, курс' },
  { verb: 'Спроектировала', text: 'подключение и статусы после оплаты' },
]

const team = [
  { role: 'Аналитики', text: 'Логика условий и лимитов' },
  { role: 'Разработка', text: 'Дизайн-ревью вёрстки' },
  { role: 'PM', text: 'Рамки запуска' },
  { role: 'QA', text: 'Статусы и льготы' },
]

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
                <strong>
                  {m.value}
                  {m.unit && <em>{m.unit}</em>}
                </strong>
                <span className="metric-label">{m.label}</span>
              </div>
            ))}
          </section>

          <figure className="premium-cover">
            <img
              src={asset('case/covers/octobank-premium.webp')}
              alt="Обложка: экраны подключения Octobank Premium"
            />
          </figure>

          <section id="about" className="story-section">
            <p className="story-kicker">О проекте</p>
            <h2>Сценарий с нуля — от оффера до «Мой Premium»</h2>
            <div className="story-copy">
              <p>
                Premium в Octo-Mobile нужно было не просто показать списком льгот,
                а провести человека до подключения и оставить ему понятный статус после.
              </p>
              <p>
                В запуск вошли оффер, детальные карточки привилегий, экран оплаты
                и кабинет подписки. Отдельный акцент — как остаться на Premium бесплатно:
                по остатку на счетах или по тратам картой банка.
              </p>
            </div>
          </section>

          <section id="role" className="story-section">
            <p className="story-kicker">Роль</p>
            <h2>Отвечала за раздел с нуля до передачи в разработку</h2>
            <p className="story-lead">
              Собрала структуру оффера, детали привилегий и два состояния после оплаты:
              льготный период и платная подписка.
            </p>
            <div className="story-role-grid">
              {roleCards.map((card) => (
                <div className="story-role" key={card.verb}>
                  <strong>{card.verb}</strong>
                  <span>{card.text}</span>
                </div>
              ))}
            </div>
            <p className="story-note">Работала с аналитиками, разработкой, PM и QA на всём пути.</p>
            <div className="story-team">
              {team.map((item) => (
                <div key={item.role}>
                  <strong>{item.role}</strong>
                  <span>{item.text}</span>
                </div>
              ))}
            </div>
          </section>

          <section id="flow" className="story-section">
            <p className="story-kicker">Сценарий</p>
            <h2>Четыре шага до статуса</h2>
            <ol className="story-flow">
              {flow.map((step) => (
                <li key={step.n}>
                  <span className="story-flow-n">{step.n} / 04</span>
                  <strong>{step.title}</strong>
                  <p>{step.body}</p>
                </li>
              ))}
            </ol>
          </section>

          <section id="problems" className="story-section">
            <p className="story-kicker">Проблемы</p>
            <h2>Ценность до оплаты, честность после</h2>
            <div className="story-copy">
              <p>
                На оффере нужно сразу показать, за что платит человек, и дать
                раскрыть любую привилегию, не ломая путь к кнопке.
              </p>
              <p>
                Первый месяц бесплатный, дальше — 222&nbsp;000 UZS или снова бесплатно,
                если выполнено одно из условий. Это нельзя прятать в документ:
                цифры и прогресс должны быть рядом со статусом.
              </p>
              <p>
                После подключения появляются два разных экрана: льгота ещё действует
                и подписка уже платная. Логика одна, акценты разные.
              </p>
            </div>
          </section>

          <section id="entry" className="story-section">
            <p className="story-kicker">Точка входа</p>
            <h2>Premium виден с главной</h2>
            <div className="story-copy">
              <p>
                На главном экране у профиля бейдж Premium. Это и статус,
                и вход в оффер — не отдельный баннер, который нужно искать в меню.
              </p>
            </div>
            <div className="story-phones story-phones--one">
              <Phone src={img('home')} alt="Главный экран Octo-Mobile с бейджем Premium" caption="Главная · бейдж у профиля" />
            </div>
          </section>

          <section id="offer" className="story-section">
            <p className="story-kicker">Оффер</p>
            <h2>Все привилегии на одном экране</h2>
            <div className="story-copy">
              <p>
                Карта, менеджер, приоритет, снятие и переводы без комиссии,
                ставки, курс и процент на остаток. Внизу — первый месяц бесплатно
                и кнопка «Подключить».
              </p>
              <p>
                Каждая строка открывает деталь. Сам список остаётся оглавлением:
                человек видит пакет целиком и уходит вглубь только если хочет.
              </p>
            </div>
            <div className="story-phones story-phones--one">
              <Phone src={img('offer')} alt="Экран оффера Octobank Premium со списком привилегий" caption="Оффер · полный список" />
            </div>
          </section>

          <section id="privileges" className="story-section">
            <p className="story-kicker">Привилегии</p>
            <h2>Деталь рядом с решением</h2>
            <div className="story-copy">
              <p>
                Ставки по депозитам сравнивают Premium и обычный тариф
                и сразу предлагают открыть вклад. Менеджер — не абстрактная «поддержка»,
                а человек, контакты и что он делает.
              </p>
            </div>
            <div className="story-phones">
              <Phone src={img('privilege-deposit')} alt="Шторка с повышенной ставкой по депозитам" caption="Депозиты · сравнение ставок" />
              <Phone src={img('privilege-manager')} alt="Карточка персонального менеджера" caption="Менеджер · контакты и действия" />
            </div>
          </section>

          <section id="checkout" className="story-section">
            <p className="story-kicker">Подключение</p>
            <h2>Один экран — цена, карта, кнопка</h2>
            <div className="story-copy">
              <p>
                Первый месяц бесплатно. Продление — бесплатно при условии
                или 222&nbsp;000 UZS. Карта списания меняется здесь же.
                Согласие с офертой — в строке под кнопкой, как в регистрации.
              </p>
            </div>
            <div className="story-phones story-phones--one">
              <Phone src={img('checkout')} alt="Экран подключения Premium: цена и карта списания" caption="Подключение" />
            </div>
          </section>

          <section id="free" className="story-section">
            <p className="story-kicker">Бесплатно</p>
            <h2>Как не платить со второго месяца</h2>
            <div className="story-copy">
              <p>
                Достаточно одного условия: суммарный остаток на картах и депозитах
                или оплаты картой Octobank. Прогресс показывает, где человек сейчас
                и сколько не хватает до порога.
              </p>
            </div>
            <div className="story-phones story-phones--one">
              <Phone src={img('free-conditions')} alt="Условия бесплатного Premium с прогрессом" caption="Условия · одно из двух" />
            </div>
          </section>

          <section id="status" className="story-section">
            <p className="story-kicker">Мой Premium</p>
            <h2>После оплаты сценарий не заканчивается</h2>
            <div className="story-copy">
              <p>
                Подключённый оффер показывает карту, те же привилегии и FAQ.
                Отдельный экран статуса — дата, стоимость, карта списания
                и выполнение условий.
              </p>
              <p>
                Пока действует льгота, её видно первым блоком.
                Когда месяц уже платный, акцент смещается на сумму
                и шанс остаться бесплатно до даты списания.
              </p>
            </div>
            <div className="story-phones story-phones--one">
              <Phone src={img('connected')} alt="Мой Premium после подключения: карта и привилегии" caption="Мой Premium · пакет подключён" />
            </div>
            <div className="story-phones">
              <Phone src={img('status-grace')} alt="Статус Premium с действующей льготой" caption="Льгота · ещё 2 месяца бесплатно" />
              <Phone src={img('status-paid')} alt="Статус Premium с платной подпиской" caption="Платный месяц · 222 000 UZS" />
            </div>
          </section>

          <section id="results" className="story-section">
            <p className="story-kicker">Результат</p>
            <h2>Цельный путь, а не лендинг внутри банка</h2>
            <div className="story-copy">
              <p>
                Появился сценарий, который связывает оффер, детали привилегий,
                оплату и управление подпиской. Ниже — цифры самого продукта,
                не конверсия раздела: её ещё предстоит замерить.
              </p>
            </div>
            <div className="case-metrics">
              {metrics.map((m) => (
                <div className="metric" key={`r-${m.label}`}>
                  <strong>
                    {m.value}
                    {m.unit && <em>{m.unit}</em>}
                  </strong>
                  <span className="metric-label">{m.label}</span>
                </div>
              ))}
            </div>
            <div className="story-next">
              <p className="story-kicker">Как оценить</p>
              <ul>
                <li>
                  Замерить путь от главной и оффера до «Подключить»:
                  где останавливаются и сколько доходят до оплаты.
                </li>
                <li>
                  Отдельно — доля тех, кто удерживает бесплатное продление
                  по остатку или тратам, и кто отключает подписку в статусе.
                </li>
              </ul>
            </div>
          </section>
        </div>
      </div>
    </article>
  )
}

export default PremiumCase
