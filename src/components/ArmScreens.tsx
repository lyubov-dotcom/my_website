import { useEffect, useRef, useState } from 'react'

export type ArmScreenId =
  | 'overview'
  | 'segments'
  | 'detail'
  | 'queue'
  | 'operation'
  | 'shift'

const nav = [
  { id: 'overview', label: 'Сегодня' },
  { id: 'segments', label: 'Списки' },
  { id: 'queue', label: 'Очередь' },
  { id: 'operation', label: 'Операция' },
  { id: 'shift', label: 'Итог' },
] as const

const crumbs: Record<ArmScreenId, string> = {
  overview: 'арм / сегодня',
  segments: 'арм / списки',
  detail: 'арм / списки / новый кошелёк',
  queue: 'арм / очередь',
  operation: 'арм / операция / 1842',
  shift: 'арм / итог дня',
}

const activeNav: Record<ArmScreenId, string> = {
  overview: 'overview',
  segments: 'segments',
  detail: 'segments',
  queue: 'queue',
  operation: 'operation',
  shift: 'shift',
}

function Mark() {
  return (
    <span className="arm-mark" aria-hidden="true">
      <svg viewBox="0 0 24 24">
        <path d="M12 2.5 20.5 12 12 21.5 3.5 12Z" fill="none" stroke="currentColor" strokeWidth="1.6" />
        <path d="M12 7v10M7 12h10" fill="none" stroke="currentColor" strokeWidth="1.6" />
      </svg>
    </span>
  )
}

function Overview() {
  return (
    <>
      <header className="arm-head">
        <div>
          <p className="arm-kicker">Сегодня · 12 марта · 09:12</p>
          <h3>Кому помочь сегодня</h3>
        </div>
        <div className="arm-head-meta">
          <span>Сотрудник И. Соколова</span>
          <button type="button" className="arm-btn arm-btn--ghost">Пауза</button>
        </div>
      </header>
      <div className="arm-kpi">
        <article>
          <strong>186</strong>
          <span>В очереди утром</span>
        </article>
        <article>
          <strong>42</strong>
          <span>Сделано за день</span>
        </article>
        <article>
          <strong>11</strong>
          <em>мин</em>
          <span>На одну операцию</span>
        </article>
        <article>
          <strong>3</strong>
          <span>Передали старшему</span>
        </article>
      </div>
      <div className="arm-split">
        <section className="arm-panel">
          <header>
            <h4>Кому помочь срочно</h4>
            <span>из списка сразу в работу</span>
          </header>
          <ul className="arm-seg-cards">
            <li>
              <b>Новый кошелёк</b>
              <p>Не закончили первую операцию с цифровым рублём</p>
              <em>38 человек</em>
            </li>
            <li className="is-hot">
              <b>Застряли на проверке</b>
              <p>Проверка дольше 20 минут, клиент ждёт</p>
              <em>14 человек</em>
            </li>
            <li>
              <b>Смена тарифа</b>
              <p>Не подтвердили смену</p>
              <em>21 человек</em>
            </li>
            <li>
              <b>Вчера не доделали</b>
              <p>Не нажали «Готово»</p>
              <em>9 человек</em>
            </li>
          </ul>
        </section>
        <section className="arm-panel">
          <header>
            <h4>Как шёл день</h4>
            <span>операций в час</span>
          </header>
          <div className="arm-bars" aria-hidden="true">
            {[4, 7, 9, 11, 8, 6].map((n, i) => (
              <div key={i}>
                <i style={{ height: `${n * 8}px` }} />
                <span>{['9', '10', '11', '12', '13', '14'][i]}</span>
              </div>
            ))}
          </div>
          <p className="arm-note">Больше всего дел в 12:00, после обеда.</p>
        </section>
      </div>
    </>
  )
}

function Segments() {
  const rows = [
    ['Новый кошелёк', '38', 'Кошелёк ещё не открыт', 'Соколова', '09:04'],
    ['Застряли на проверке', '14', 'Проверка дольше 20 минут', 'Очередь', '09:11'],
    ['Смена тарифа', '21', 'Нет кода из смс', 'Смена B', '08:50'],
    ['Большой остаток', '56', 'Есть деньги, нет вклада', 'Отложено', 'вчера'],
    ['Вчера не доделали', '9', 'Не нажали «Готово»', 'Соколова', '08:12'],
  ]
  return (
    <>
      <header className="arm-head">
        <div>
          <p className="arm-kicker">Списки</p>
          <h3>Кого собрать в работу</h3>
        </div>
        <button type="button" className="arm-btn">Новый список</button>
      </header>
      <div className="arm-filters">
        <span className="is-on">Все продукты</span>
        <span>Цифровой рубль</span>
        <span>Платежи</span>
        <span>Связь</span>
        <span className="arm-search">Найти список</span>
      </div>
      <table className="arm-table">
        <thead>
          <tr>
            <th>Список</th>
            <th>Людей</th>
            <th>Когда попадает сюда</th>
            <th>Кто ведёт</th>
            <th>Обновлён</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row[0]} className={row[0].startsWith('Застряли') ? 'is-on' : undefined}>
              {row.map((cell) => (
                <td key={cell}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}

function Detail() {
  return (
    <>
      <header className="arm-head">
        <div>
          <p className="arm-kicker">Список · новый кошелёк</p>
          <h3>Не закончили первую операцию</h3>
        </div>
        <button type="button" className="arm-btn">Открыть этих людей</button>
      </header>
      <div className="arm-split arm-split--detail">
        <section className="arm-panel">
          <header>
            <h4>Почему в списке</h4>
            <span>обновляется каждые 5 минут</span>
          </header>
          <ol className="arm-rules">
            <li>Продукт — цифровой рубль</li>
            <li>Кошелёк ещё не открыт</li>
            <li>Первую операцию не подтвердили</li>
            <li>Заходили в приложение за сутки</li>
          </ol>
          <p className="arm-note">Это не отчёт. Из списка сразу берут человека в работу.</p>
        </section>
        <section className="arm-panel">
          <header>
            <h4>Сейчас в списке</h4>
            <span>38 · первые 6</span>
          </header>
          <ul className="arm-people">
            {[
              ['Алина К.', 'ждёт подтверждения', '4 мин'],
              ['Павел Н.', 'открыл кошелёк', '11 мин'],
              ['Мария В.', 'код из смс не прошёл', '16 мин'],
              ['Игорь Л.', 'вернулся вчера', '22 мин'],
              ['Елена С.', 'на шаге с суммой', '27 мин'],
              ['Никита Р.', 'закрыл приложение', '41 мин'],
            ].map((row) => (
              <li key={row[0]}>
                <b>{row[0]}</b>
                <span>{row[1]}</span>
                <em>{row[2]}</em>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </>
  )
}

function Queue() {
  return (
    <>
      <header className="arm-head">
        <div>
          <p className="arm-kicker">Очередь на сегодня</p>
          <h3>Следующий клиент уже выбран</h3>
        </div>
        <div className="arm-head-meta">
          <span className="arm-pill">Сначала срочное</span>
        </div>
      </header>
      <ul className="arm-queue">
        {[
          ['сейчас', 'Мария В.', 'Новый кошелёк', 'Код из смс не прошёл', 'срочно'],
          ['далее', 'Павел Н.', 'Застряли на проверке', 'Ждёт 21 минуту', 'срочно'],
          ['3', 'Алина К.', 'Новый кошелёк', 'Ждёт подтверждения', 'обычное'],
          ['4', 'Олег Т.', 'Смена тарифа', 'Нет кода из смс', 'обычное'],
          ['5', 'Игорь Л.', 'Вчера не доделали', 'Остановились на сумме', 'можно позже'],
        ].map((row) => (
          <li key={row[1]} className={row[0] === 'сейчас' ? 'is-now' : undefined}>
            <em>{row[0]}</em>
            <div>
              <b>{row[1]}</b>
              <span>{row[2]}</span>
            </div>
            <p>{row[3]}</p>
            <strong>{row[4]}</strong>
          </li>
        ))}
      </ul>
    </>
  )
}

function Operation() {
  return (
    <>
      <header className="arm-head">
        <div>
          <p className="arm-kicker">Операция 1842 · цифровой рубль</p>
          <h3>Мария В. · подтвердить первую операцию</h3>
        </div>
        <div className="arm-head-meta">
          <button type="button" className="arm-btn arm-btn--ghost">Вернуть</button>
          <button type="button" className="arm-btn">Готово</button>
        </div>
      </header>
      <div className="arm-split arm-split--op">
        <section className="arm-panel">
          <ol className="arm-steps">
            <li className="is-done">Клиент и продукт</li>
            <li className="is-on">Проверка кода и суммы</li>
            <li>Подтверждение</li>
          </ol>
          <dl className="arm-facts">
            <div>
              <dt>Сумма</dt>
              <dd>12 400 ₽</dd>
            </div>
            <div>
              <dt>Кошелёк</dt>
              <dd>Ещё не открыт</dd>
            </div>
            <div>
              <dt>Код из смс</dt>
              <dd className="is-warn">Не прошёл, 2 попытки</dd>
            </div>
            <div>
              <dt>Откуда</dt>
              <dd>Приложение</dd>
            </div>
          </dl>
          <p className="arm-note">Имя, сумма и статус на одном экране. Новое окно не открывается.</p>
        </section>
        <section className="arm-panel">
          <header>
            <h4>Что сделать</h4>
            <span>короткая подсказка</span>
          </header>
          <ul className="arm-actions">
            <li>Попросить клиента запросить новый код.</li>
            <li>Сумму не менять — она уже согласована.</li>
            <li>Если код не пройдёт третий раз — передать старшему, не начинать заново.</li>
          </ul>
        </section>
      </div>
    </>
  )
}

function Shift() {
  return (
    <>
      <header className="arm-head">
        <div>
          <p className="arm-kicker">Итог дня · 12 марта</p>
          <h3>Сделали 42, вернули 3, передали старшему 3</h3>
        </div>
      </header>
      <div className="arm-kpi">
        <article>
          <strong>42</strong>
          <span>Сделано</span>
        </article>
        <article>
          <strong>6%</strong>
          <span>Начали заново</span>
        </article>
        <article>
          <strong>11</strong>
          <em>мин</em>
          <span>На одну операцию</span>
        </article>
        <article>
          <strong>94%</strong>
          <span>Сами довели до конца</span>
        </article>
      </div>
      <section className="arm-panel">
        <header>
          <h4>Откуда пришли дела</h4>
          <span>не из общей кучи заявок</span>
        </header>
        <ul className="arm-origin">
          <li>
            <b>Новый кошелёк</b>
            <i style={{ width: '46%' }} />
            <em>19</em>
          </li>
          <li>
            <b>Проверка</b>
            <i style={{ width: '28%' }} />
            <em>12</em>
          </li>
          <li>
            <b>Смена тарифа</b>
            <i style={{ width: '18%' }} />
            <em>8</em>
          </li>
          <li>
            <b>Вчерашние</b>
            <i style={{ width: '8%' }} />
            <em>3</em>
          </li>
        </ul>
      </section>
    </>
  )
}

function ScreenBody({ screen }: { screen: ArmScreenId }) {
  if (screen === 'overview') return <Overview />
  if (screen === 'segments') return <Segments />
  if (screen === 'detail') return <Detail />
  if (screen === 'queue') return <Queue />
  if (screen === 'operation') return <Operation />
  return <Shift />
}

const DESK_W = 1080
const DESK_H = 700

export function ArmFrame({
  screen,
  compact = false,
}: {
  screen: ArmScreenId
  compact?: boolean
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [width, setWidth] = useState(0)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const update = () => setWidth(el.clientWidth)
    update()
    const observer = new ResizeObserver(update)
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const scale = width > 0 ? width / DESK_W : 0

  return (
    <div
      ref={ref}
      className="arm-frame"
      style={{ height: scale ? DESK_H * scale : undefined }}
    >
      <div
        className="arm-frame-inner"
        style={{
          width: DESK_W,
          transform: `scale(${scale || 1})`,
          visibility: scale ? 'visible' : 'hidden',
        }}
      >
        <ArmDesktop screen={screen} compact={compact} />
      </div>
    </div>
  )
}

export function ArmDesktop({
  screen,
  compact = false,
}: {
  screen: ArmScreenId
  compact?: boolean
}) {
  return (
    <div className={`arm-desk${compact ? ' is-compact' : ''}`}>
      <div className="arm-desk-bar">
        <i />
        <i />
        <i />
        <span>{crumbs[screen]}</span>
      </div>
      <div className="arm-desk-body">
        <aside className="arm-side">
          <p className="arm-logo">
            <Mark />
            АРМ
          </p>
          <nav>
            {nav.map((item) => (
              <span
                key={item.id}
                className={activeNav[screen] === item.id ? 'is-on' : undefined}
              >
                {item.label}
              </span>
            ))}
          </nav>
        </aside>
        <section className="arm-main">
          <ScreenBody screen={screen} />
        </section>
      </div>
    </div>
  )
}
