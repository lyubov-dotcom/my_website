import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import '../CaseStudy.css'
import '../LandingCase.css'

const asset = (p: string) => `${import.meta.env.BASE_URL}${p}`
const shot = (name: string) => asset(`case/funsun/${name}.webp`)

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

function LandingShot({ src, alt, caption }: { src: string; alt: string; caption: string }) {
  return (
    <figure className="land-shot">
      <img src={src} alt={alt} loading="lazy" />
      <figcaption>{caption}</figcaption>
    </figure>
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
