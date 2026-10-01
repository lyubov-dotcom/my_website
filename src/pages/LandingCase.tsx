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

const screens = [
  {
    src: shot('hero'),
    alt: 'Первый экран посадочной FUN&SUN',
    caption:
      'Сразу выявляем боль пользователя заголовком «Не можете найти идеальный тур?». Визуализация в виде чат-баблов создает эффект живого общения и персонализации. Короткая форма захвата — только телефон.',
  },
  {
    src: shot('rest'),
    alt: 'Блок видов отдыха',
    caption:
      'Сегментация по интересам: блоки «Экскурсионный», «Пляжный», «Лечебный», «Активный» помогают пользователю быстро идентифицировать свой тип отдыха.',
  },
  {
    src: shot('help'),
    alt: 'Повторная форма и блок про эксперта',
    caption:
      'Здесь продублирована форма отправки заявки, чтобы была возможность не возвращаться наверх. Блок про эксперта закрывает то, чего боятся больше всего: ошибиться с отелем, билетом, страховкой.',
  },
  {
    src: shot('steps'),
    alt: 'Пять простых шагов до отпуска',
    caption:
      'Снижение тревожности: блок «Пять простых шагов» визуализирует процесс, снимая страх неизвестности — что будет после отправки заявки.',
  },
  {
    src: shot('places'),
    alt: 'Направления, куда можно отправиться сейчас',
    caption:
      'Визуальный контент: использованы качественные фотографии направлений (Хорватия, ОАЭ, Египет), чтобы вызвать «вау-эффект» и желание путешествовать. Это также возможность перейти в каталог и самому начать изучать направления. Каталог откроется на вкладке рядом, лендинг останется в доступе — к нему всегда можно вернуться.',
  },
  {
    src: shot('form'),
    alt: 'Полная форма заявки в конце страницы',
    caption:
      'Для полноценной заявки в конце добавлен блок с возможностью прописать пожелания и оставить для связи электронную почту.',
  },
]

const insights = [
  {
    value: '2.1% → 6.8%',
    label: 'конверсия в заявку (CR)',
    text: 'Выросла после запуска лендинга. Смотрела обычный месяц, не лучшую неделю.',
  },
  {
    value: 'Форма сразу',
    label: 'что повлияло',
    text: 'Упростили форму — убрали лишние поля — и поставили её на первый экран.',
  },
  {
    value: 'Нижняя форма',
    label: 'анализ форм',
    text: 'Самая высокая конверсия у нижней формы в блоке «Просто оставьте заявку»: к этому моменту пользователь уже прогрет контентом.',
  },
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
          Посадочная страница для сбора заявок на индивидуальный подбор тура.
          Не каталог: клиент оставляет контакты, а менеджер вручную подбирает
          идеальное путешествие.
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

      <section className="land-block">
        <h2>Цель и проблема</h2>
        <p>
          <strong>Цель.</strong> Создать посадочную страницу для сбора заявок на
          индивидуальный подбор тура. В отличие от стандартных каталогов, здесь
          упор на экспертный подход: клиент оставляет контакты, а менеджер
          вручную подбирает идеальное путешествие.
        </p>
        <p>
          <strong>Проблема.</strong> Пользователи теряются в огромном количестве
          фильтров и стандартных предложений.
        </p>
      </section>

      <section className="land-block">
        <h2>Экраны</h2>
        <div className="land-shots">
          {screens.map((item) => (
            <LandingShot key={item.src} {...item} />
          ))}
        </div>
      </section>

      <section className="land-block">
        <h2>Аналитика</h2>
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

      <section className="land-block">
        <h2>Выводы</h2>
        <p>
          Проект доказал, что для сложного продукта — подбора тура — важна не
          перегрузка фильтрами, а доверительная атмосфера и чёткое объяснение
          ценности услуги. Дизайн не только радует глаз, но и напрямую влияет
          на бизнес-показатели клиента.
        </p>
      </section>
    </article>
  )
}

export default LandingCase
