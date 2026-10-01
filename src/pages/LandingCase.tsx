import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import '../CaseStudy.css'
import '../LandingCase.css'

const asset = (p: string) => `${import.meta.env.BASE_URL}${p}`
const shot = (name: string) => asset(`case/funsun/${name}.webp`)
const photo = (name: string) => asset(`case/funsun/photo-${name}.webp`)

const chips = [
  { k: 'Роль', v: 'UX-дизайнер' },
  { k: 'Компания', v: 'FUN&SUN' },
  { k: 'Что', v: 'Посадочная страница' },
  { k: 'Год', v: '2022' },
]

const steps = [
  { n: '01', title: 'Заявка', body: 'Сначала контакт, не поиск. Иначе страница снова становится каталогом.' },
  { n: '02', title: 'Предложение', body: 'Эксперт присылает несколько туров под запрос — не пустое «мы перезвоним».' },
  { n: '03', title: 'Выбор тура', body: 'Человек выбирает уже из короткого списка, а не из сотен отелей.' },
  { n: '04', title: 'Оплата', body: 'Платит, когда понятно, куда едет. Не раньше.' },
  { n: '05', title: 'Документы', body: 'Всё приходит в кабинет. Страница на этом не бросает.' },
]

const screens = [
  { src: shot('hero'), alt: 'Первый экран посадочной FUN&SUN', caption: 'Первый экран держит страх и действие рядом: «не можете найти тур?» — и сразу телефон.' },
  { src: shot('rest'), alt: 'Блок видов отдыха', caption: 'Не страны, а тип отдыха. Так проще сказать, чего хочешь, если ещё не знаешь направление.' },
  { src: shot('cta'), alt: 'Жёлтая полоса с заявкой', caption: 'Заявку вынесла в полосу, которая едет вместе со страницей. Если передумал на середине — не надо возвращаться наверх.' },
  { src: shot('help'), alt: 'Блок поддержки', caption: 'Блок про эксперта закрывает то, чего боятся больше всего: ошибиться с отелем, билетом, страховкой.' },
  { src: shot('steps'), alt: 'Пять шагов до отпуска', caption: 'Пять шагов, чтобы было видно конец пути. Без этого заявка ощущается как чёрный ящик.' },
  { src: shot('places'), alt: 'Направления', caption: 'Страны оставила как подсказку, не как каталог. Куда можно сейчас — и сразу к эксперту.' },
  { src: shot('form'), alt: 'Форма заявки', caption: 'Вторая точка входа внизу. Кто не оставил телефон сверху, оставляет здесь, когда уже всё прочитал.' },
]

const insights = [
  { value: '+27%', label: 'заявок', text: 'К прежней главной за обычный месяц. Без акции и без раздутой недели.' },
  { value: '1:20', label: 'до формы', text: 'Среднее время на странице до отправки. Люди не блуждают — решают.' },
  { value: '61%', label: 'доходят до формы', text: 'Часть оставляет заявку сразу, часть — только после шагов и направлений. Обе точки нужны.' },
  { value: '34%', label: 'телефон сверху', text: 'Треть не читает страницу целиком. Поэтому заявка стоит уже на первом экране.' },
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
          Собрала посадочную для подбора тура: человек описывает, какой отдых
          хочет — дальше с ним работает эксперт. Каталог на сотни отелей здесь
          только мешал. Люди уходили, так и не выбрав.
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
        caption="Первый экран держит страх и действие рядом: вопрос и сразу заявка."
      />

      <section className="land-block">
        <h2>Почему не каталог</h2>
        <p>
          Страх простой: выбрать не тот отель и потерять деньги. Я сняла выбор
          с человека и оставила одно действие — заявку. Остальное на эксперте.
          Если страница снова предлагает «поискать самим», она не работает.
        </p>
      </section>

      <section className="land-block">
        <h2>Как устроен путь</h2>
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
          caption="Так шаги выглядят на странице. Копирайт маркетинга оставила: он уже живой, я собирала логику."
        />
      </section>

      <section className="land-block">
        <h2>Что собрала</h2>
        <div className="land-shots">
          {screens.map((item) => (
            <LandingShot key={item.src} {...item} />
          ))}
        </div>
      </section>

      <section className="land-block">
        <h2>Чего не хватало на макете</h2>
        <p>
          Воронка обрывалась на форме. Человек отправлял заявку и не понимал,
          что будет дальше. Дорисовала три экрана в том же языке страницы:
          белый фон, жёлтые кнопки, живые фото.
        </p>
        <div className="land-extra">
          <figure>
            <ToursScreen />
            <figcaption>После заявки — сразу туры, а не пустое ожидание звонка. Иначе контакт ощущается как потерянный.</figcaption>
          </figure>
          <figure>
            <ThanksScreen />
            <figcaption>Написала, когда перезвонят и что будет, если не дозвонятся. Без этого «спасибо» ничего не закрывает.</figcaption>
          </figure>
          <figure>
            <InsightsScreen />
            <figcaption>Цифры на самой странице: сколько ждать и сколько туров придёт. Чтобы обещание было конкретным.</figcaption>
          </figure>
        </div>
      </section>

      <section className="land-block">
        <h2>Что дали цифры</h2>
        <p>
          Смотрела обычный месяц после запуска, не лучшую неделю. Цифры ниже —
          чтобы было видно, сработала ли ставка на заявку вместо каталога.
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
