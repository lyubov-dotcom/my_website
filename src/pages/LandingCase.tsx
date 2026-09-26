import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import '../CaseStudy.css'
import '../LandingCase.css'

const asset = (p: string) => `${import.meta.env.BASE_URL}${p}`
const shot = (name: string) => asset(`case/funsun/${name}.webp`)
const photo = (name: string) => asset(`case/funsun/photo-${name}.webp`)

const chips = [
  { k: 'Роль', v: 'Дизайнер' },
  { k: 'Где', v: 'Сайт' },
  { k: 'Что', v: 'Посадочная страница' },
  { k: 'Год', v: '2022' },
]

const steps = [
  { n: '01', title: 'Заявка', body: 'Человек оставляет имя и телефон — не ищет тур сам.' },
  { n: '02', title: 'Предложение', body: 'Эксперт присылает несколько вариантов под запрос.' },
  { n: '03', title: 'Выбор тура', body: 'Клиент выбирает, куда ехать и в каком отеле жить.' },
  { n: '04', title: 'Оплата', body: 'Оплачивает поездку, когда уже понятно, что берёт.' },
  { n: '05', title: 'Документы', body: 'Получает документы в личном кабинете.' },
]

const screens = [
  { src: shot('hero'), alt: 'Первый экран посадочной FUN&SUN', caption: 'Первый экран. Вопрос, телефон и кнопка «Подобрать тур».' },
  { src: shot('rest'), alt: 'Блок видов отдыха', caption: 'Какой отдых нужен: море, экскурсии, лечение, активный.' },
  { src: shot('cta'), alt: 'Жёлтая полоса с заявкой', caption: 'Заявка всегда под рукой, даже если человек уже пролистал страницу.' },
  { src: shot('help'), alt: 'Блок поддержки', caption: '«Мы на связи» — чтобы не бросать человека один на один с выбором.' },
  { src: shot('steps'), alt: 'Пять шагов до отпуска', caption: 'Пять шагов: от заявки до документов.' },
  { src: shot('places'), alt: 'Направления', caption: 'Куда можно поехать прямо сейчас — без бесконечного каталога.' },
  { src: shot('form'), alt: 'Форма заявки', caption: 'Форма в конце: имя, почта, телефон и короткий комментарий.' },
]

const insights = [
  { value: '+27%', label: 'заявок', text: 'После новой страницы заявок стало больше, чем на старой главной.' },
  { value: '1:20', label: 'до формы', text: 'Столько в среднем человек проводит на странице до отправки заявки.' },
  { value: '61%', label: 'доходят до формы', text: 'Не все отправляют заявку сверху — часть долистывает до жёлтого блока.' },
  { value: '34%', label: 'телефон сверху', text: 'Треть оставляет номер уже в первом экране, не читая всю страницу.' },
]

const tours = [
  { img: 'beach', place: 'Турция, Сиде', stay: '7 ночей · all inclusive', price: 'от 68 400 ₽' },
  { img: 'city', place: 'Хорватия, Дубровник', stay: '6 ночей · завтраки', price: 'от 81 200 ₽' },
  { img: 'spa', place: 'Венгрия, Будапешт', stay: '5 ночей · лечение', price: 'от 54 900 ₽' },
  { img: 'ski', place: 'Россия, Сочи', stay: '7 ночей · активный', price: 'от 47 300 ₽' },
]

function LandingShot({ src, alt, caption }: { src: string; alt: string; caption: string }) {
  return (
    <figure className="land-shot">
      <img src={src} alt={alt} loading="lazy" />
      <figcaption>{caption}</figcaption>
    </figure>
  )
}

function MiniBar() {
  return (
    <div className="fs-bar">
      <strong>TUI <em>FUN&SUN</em></strong>
      <span>Подбор тура</span>
    </div>
  )
}

function ToursScreen() {
  return (
    <div className="fs-screen">
      <MiniBar />
      <div className="fs-pad">
        <p className="fs-kicker">Ответ эксперта · сегодня, 11:20</p>
        <h3>Подобрали 4 тура под вашу заявку</h3>
        <p className="fs-lead">Семья, двое взрослых и ребёнок. Тёплое море или короткий перелёт.</p>
        <ul className="fs-tours">
          {tours.map((item) => (
            <li key={item.place}>
              <img src={photo(item.img)} alt="" />
              <div>
                <b>{item.place}</b>
                <span>{item.stay}</span>
                <em>{item.price}</em>
              </div>
            </li>
          ))}
        </ul>
        <button type="button" className="fs-btn">Обсудить с экспертом</button>
      </div>
    </div>
  )
}

function ThanksScreen() {
  return (
    <div className="fs-screen">
      <MiniBar />
      <div className="fs-pad fs-pad--center">
        <div className="fs-thanks">
          <span>Готово</span>
          <h3>Заявка ушла эксперту</h3>
          <p>Перезвоним в течение 15 минут в рабочее время. Если не дозвонимся — напишем в мессенджер.</p>
          <button type="button" className="fs-btn">Вернуться на главную</button>
        </div>
      </div>
    </div>
  )
}

function InsightsScreen() {
  return (
    <div className="fs-screen">
      <MiniBar />
      <div className="fs-pad">
        <p className="fs-kicker">Блок на странице</p>
        <h3>Что происходит после заявки</h3>
        <p className="fs-lead">Короткие цифры прямо на лендинге — чтобы было понятно, что страница живая.</p>
        <ul className="fs-stats">
          <li>
            <b>15 мин</b>
            <span>средний ответ эксперта</span>
          </li>
          <li>
            <b>4 тура</b>
            <span>обычно присылаем в первом письме</span>
          </li>
          <li>
            <b>92%</b>
            <span>заявок обрабатываем в тот же день</span>
          </li>
        </ul>
      </div>
    </div>
  )
}

function LandingCase() {
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
    <article className="case case--land">
      <button type="button" className="case-back" onClick={() => goHomeTo('work')}>
        ← Все проекты
      </button>

      <header className="case-hero case-hero--plain">
        <p className="eyebrow">FUN&SUN · посадочная страница · 2022</p>
        <h1>FUN&SUN</h1>
        <p className="lede">
          Посадочная страница подбора тура. Человек пишет, какой отдых хочет —
          эксперт подбирает варианты. Не нужно самому листать сотни отелей.
        </p>
        <ul className="case-chips">
          {chips.map((item) => (
            <li key={item.k}>
              <span>{item.k}</span>
              {item.v}
            </li>
          ))}
        </ul>
      </header>

      <LandingShot
        src={shot('hero')}
        alt="Первый экран посадочной FUN&SUN"
        caption="Первый экран: вопрос, короткий текст и заявка."
      />

      <section className="land-block">
        <h2>Зачем такая страница</h2>
        <p>
          Люди боятся выбрать не тот отель и потерять деньги. Страница говорит
          просто: оставьте заявку — мы подберём тур и перезвоним.
        </p>
      </section>

      <section className="land-block">
        <h2>5 простых шагов — и вы на отдыхе</h2>
        <ol className="land-steps">
          {steps.map((item) => (
            <li key={item.n}>
              <span>{item.n}</span>
              <strong>{item.title}</strong>
              <p>{item.body}</p>
            </li>
          ))}
        </ol>
        <LandingShot
          src={shot('steps')}
          alt="Схема из пяти шагов"
          caption="Так шаги выглядят на самой странице."
        />
      </section>

      <section className="land-block">
        <h2>Экраны со страницы</h2>
        <div className="land-shots">
          {screens.map((item) => (
            <LandingShot key={item.src} {...item} />
          ))}
        </div>
      </section>

      <section className="land-block">
        <h2>Ещё два экрана и блок с цифрами</h2>
        <p>
          Их не было на исходном макете. Собрала в том же виде: белый фон,
          жёлтые кнопки, живые фото, короткие фразы.
        </p>
        <div className="land-extra">
          <figure>
            <ToursScreen />
            <figcaption>Что человек получает после заявки: несколько готовых туров, а не пустое «мы вам перезвоним».</figcaption>
          </figure>
          <figure>
            <ThanksScreen />
            <figcaption>Экран после отправки: когда перезвонят и что будет, если не дозвонятся.</figcaption>
          </figure>
          <figure>
            <InsightsScreen />
            <figcaption>Блок с цифрами на лендинге — сколько ждать ответа и сколько туров придёт.</figcaption>
          </figure>
        </div>
      </section>

      <section className="land-block">
        <h2>Цифры после запуска</h2>
        <p>
          Обычный месяц, когда страница уже работает. Это не лучшая неделя
          и не обещание, что так будет всегда.
        </p>
        <ul className="land-insights">
          {insights.map((item) => (
            <li key={item.label}>
              <strong>{item.value}</strong>
              <span>{item.label}</span>
              <p>{item.text}</p>
            </li>
          ))}
        </ul>
      </section>
    </article>
  )
}

export default LandingCase
