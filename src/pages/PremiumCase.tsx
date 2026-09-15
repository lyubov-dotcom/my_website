import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import '../CaseStudy.css'

const asset = (p: string) => `${import.meta.env.BASE_URL}${p}`

const metrics = [
  { value: '1', unit: 'мес', label: 'Бесплатно при подключении' },
  { value: '0', unit: '', label: 'Комиссия за снятие наличных' },
  { value: '12', unit: '%', label: 'До, UZS по депозитам' },
  { value: '8', unit: '%', label: 'До, USD по депозитам' },
  { value: '14', unit: 'млн', label: 'Переводы без комиссии, сум' },
  { value: '8', unit: '%', label: 'На остаток по картам Octo' },
]

const shots = [
  {
    src: asset('case/premium/screen-landing.webp'),
    alt: 'Экран подключения Octobank Premium',
  },
  {
    src: asset('case/premium/screen-benefits.webp'),
    alt: 'Условия и курс Octobank Premium',
  },
]

const offers = [
  { value: 'Lounge', label: 'Премиальная карта бесплатно' },
  { value: '24/7', label: 'Персональный менеджер' },
  { value: 'Priority', label: 'Приоритетное обслуживание' },
  { value: '0', label: 'Снятие наличных без комиссии' },
  { value: '12%', label: 'Ставка по депозитам UZS' },
  { value: '8%', label: 'Ставка по депозитам USD' },
  { value: '14 млн', label: 'Переводы без комиссии' },
  { value: 'FX', label: 'Улучшенный курс конвертации' },
]

function PremiumCase() {
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
    <article className="case case--premium">
      <button type="button" className="case-back" onClick={() => goHomeTo('work')}>← Все проекты</button>

      <header className="case-hero case-hero--plain">
        <p className="eyebrow">Octobank · Premium · 2026</p>
        <h1>Octobank Premium</h1>
        <p className="lede">Подключение премиального сервиса</p>
        <ul className="case-chips">
          <li><span>Роль</span>Product designer</li>
          <li><span>Платформы</span>iOS · Android</li>
          <li><span>Продукт</span>Octo-Mobile</li>
          <li><span>Год</span>2026</li>
        </ul>
      </header>

      <figure className="premium-cover">
        <img
          src={asset('case/covers/octobank-premium.webp')}
          alt="Обложка: экраны подключения Octobank Premium"
        />
      </figure>

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

      <section className="case-block">
        <div className="block-head">
          <span className="block-num">01</span>
          <h2>Экраны</h2>
        </div>
        <div className="premium-shots">
          {shots.map((shot) => (
            <figure key={shot.src}>
              <img src={shot.src} alt={shot.alt} loading="lazy" />
            </figure>
          ))}
        </div>
      </section>

      <section className="case-block">
        <div className="block-head">
          <span className="block-num">02</span>
          <h2>Оффер</h2>
        </div>
        <div className="premium-offer">
          {offers.map((item) => (
            <div className="offer" key={item.label}>
              <strong>{item.value}</strong>
              <span>{item.label}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="case-block">
        <div className="block-head">
          <span className="block-num">03</span>
          <h2>Сценарий</h2>
        </div>
        <div className="premium-story">
          <figure className="premium-story-visual">
            <img
              src={asset('case/covers/octobank-premium.webp')}
              alt="Два экрана Premium: оффер и условия"
              loading="lazy"
            />
          </figure>
          <div className="premium-story-metrics">
            <div className="metric metric--sm">
              <strong className="metric-word">Два экрана</strong>
              <span className="metric-label">Оффер и детальные условия — без лишних шагов до кнопки «Подключить»</span>
            </div>
            <div className="metric metric--sm">
              <strong className="metric-word">Первый месяц</strong>
              <span className="metric-label">Бесплатный пробный период вынесен к CTA на обоих экранах</span>
            </div>
            <div className="metric metric--sm">
              <strong className="metric-word">Цифры рядом</strong>
              <span className="metric-label">Лимиты, ставки и курс видны до оплаты — решение принимается на месте</span>
            </div>
          </div>
        </div>
      </section>
    </article>
  )
}

export default PremiumCase
