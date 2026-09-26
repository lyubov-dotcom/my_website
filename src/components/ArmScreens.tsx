export type ArmScreenId =
  | 'overview'
  | 'segments'
  | 'detail'
  | 'queue'
  | 'operation'
  | 'shift'

const nav = [
  { id: 'overview', label: 'Смена' },
  { id: 'segments', label: 'Сегменты' },
  { id: 'queue', label: 'Очередь' },
  { id: 'operation', label: 'Операция' },
  { id: 'shift', label: 'Итог' },
] as const

const crumbs: Record<ArmScreenId, string> = {
  overview: 'nord.arm / смена',
  segments: 'nord.arm / сегменты',
  detail: 'nord.arm / сегменты / цр · первый вход',
  queue: 'nord.arm / очередь',
  operation: 'nord.arm / операция / ор-1842',
  shift: 'nord.arm / итог смены',
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
          <p className="arm-kicker">Смена · 12 марта · 09:12</p>
          <h3>Кого брать в работу</h3>
        </div>
        <div className="arm-head-meta">
          <span>Оператор И. Соколова</span>
          <button type="button" className="arm-btn arm-btn--ghost">Пауза</button>
        </div>
      </header>
      <div className="arm-kpi">
        <article>
          <strong>186</strong>
          <span>В очереди на старте</span>
        </article>
        <article>
          <strong>42</strong>
          <span>Закрыто за смену</span>
        </article>
        <article>
          <strong>11</strong>
          <em>мин</em>
          <span>Медиана закрытия</span>
        </article>
        <article>
          <strong>3</strong>
          <span>Эскалации</span>
        </article>
      </div>
      <div className="arm-split">
        <section className="arm-panel">
          <header>
            <h4>Горящие сегменты</h4>
            <span>правило → очередь</span>
          </header>
          <ul className="arm-seg-cards">
            <li>
              <b>ЦР · первый вход</b>
              <p>Не завершили первую операцию цифрового рубля</p>
              <em>38 человек</em>
            </li>
            <li className="is-hot">
              <b>Посредник · зависли</b>
              <p>Проверка дольше 20 минут, клиент на линии</p>
              <em>14 человек</em>
            </li>
            <li>
              <b>Мобильный оператор</b>
              <p>Смена тарифа без подтверждения</p>
              <em>21 человек</em>
            </li>
            <li>
              <b>Возврат в очередь</b>
              <p>Вчера не дошли до закрытия</p>
              <em>9 человек</em>
            </li>
          </ul>
        </section>
        <section className="arm-panel">
          <header>
            <h4>Темп смены</h4>
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
          <p className="arm-note">Пик в 12:00 — после обеденной волны входящих.</p>
        </section>
      </div>
    </>
  )
}

function Segments() {
  const rows = [
    ['ЦР · первый вход', '38', 'Статус = черновик · продукт = ЦР', 'Соколова', '09:04'],
    ['Посредник · зависли', '14', 'Шаг = проверка · время > 20 мин', 'Очередь', '09:11'],
    ['Мобильный оператор', '21', 'Действие = смена тарифа · нет OTP', 'Смена B', '08:50'],
    ['Высокий остаток', '56', 'Остаток > 1.5 млн · нет депозита', 'Отложено', 'вчера'],
    ['Возврат в очередь', '9', 'Вчера · не закрыто', 'Соколова', '08:12'],
  ]
  return (
    <>
      <header className="arm-head">
        <div>
          <p className="arm-kicker">Сегменты</p>
          <h3>Правила, из которых собирается очередь</h3>
        </div>
        <button type="button" className="arm-btn">Новое правило</button>
      </header>
      <div className="arm-filters">
        <span className="is-on">Все продукты</span>
        <span>Цифровой рубль</span>
        <span>Посредник</span>
        <span>Мобильный оператор</span>
        <span className="arm-search">Поиск по правилу</span>
      </div>
      <table className="arm-table">
        <thead>
          <tr>
            <th>Сегмент</th>
            <th>Людей</th>
            <th>Правило</th>
            <th>Владелец</th>
            <th>Обновлён</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row[0]} className={row[0].startsWith('Посредник') ? 'is-on' : undefined}>
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
          <p className="arm-kicker">Сегмент · ЦР · первый вход</p>
          <h3>Не завершили первую операцию</h3>
        </div>
        <button type="button" className="arm-btn">Открыть очередь сегмента</button>
      </header>
      <div className="arm-split arm-split--detail">
        <section className="arm-panel">
          <header>
            <h4>Правило</h4>
            <span>собирается каждые 5 минут</span>
          </header>
          <ol className="arm-rules">
            <li>Продукт = цифровой рубль</li>
            <li>Статус кошелька = черновик</li>
            <li>Первая операция не подтверждена</li>
            <li>Клиент в приложении за последние 24 часа</li>
          </ol>
          <p className="arm-note">Сегмент — это правило работы, не отчёт. Из него сразу берётся очередь.</p>
        </section>
        <section className="arm-panel">
          <header>
            <h4>Сейчас в сегменте</h4>
            <span>38 · первые 6</span>
          </header>
          <ul className="arm-people">
            {[
              ['Алина К.', 'ждёт подтверждения', '4 мин'],
              ['Павел Н.', 'открыл кошелёк', '11 мин'],
              ['Мария В.', 'ошибка OTP', '16 мин'],
              ['Игорь Л.', 'вернулся вчера', '22 мин'],
              ['Елена С.', 'на шаге суммы', '27 мин'],
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
          <p className="arm-kicker">Очередь смены</p>
          <h3>Следующий клиент уже выбран</h3>
        </div>
        <div className="arm-head-meta">
          <span className="arm-pill">Приоритет: риск + срок</span>
        </div>
      </header>
      <ul className="arm-queue">
        {[
          ['сейчас', 'Мария В.', 'ЦР · первый вход', 'Ошибка OTP', 'высокая'],
          ['далее', 'Павел Н.', 'Посредник · зависли', 'Проверка 21 мин', 'высокая'],
          ['3', 'Алина К.', 'ЦР · первый вход', 'Ждёт подтверждения', 'средняя'],
          ['4', 'Олег Т.', 'Мобильный оператор', 'Нет OTP', 'средняя'],
          ['5', 'Игорь Л.', 'Возврат в очередь', 'Вчера, шаг суммы', 'низкая'],
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
          <p className="arm-kicker">Операция ОР-1842 · цифровой рубль</p>
          <h3>Мария В. · подтвердить первую операцию</h3>
        </div>
        <div className="arm-head-meta">
          <button type="button" className="arm-btn arm-btn--ghost">Вернуть</button>
          <button type="button" className="arm-btn">Закрыть</button>
        </div>
      </header>
      <div className="arm-split arm-split--op">
        <section className="arm-panel">
          <ol className="arm-steps">
            <li className="is-done">Клиент и продукт</li>
            <li className="is-on">Проверка OTP и суммы</li>
            <li>Подтверждение</li>
          </ol>
          <dl className="arm-facts">
            <div>
              <dt>Сумма</dt>
              <dd>12 400 ₽</dd>
            </div>
            <div>
              <dt>Кошелёк</dt>
              <dd>Черновик · ЦР</dd>
            </div>
            <div>
              <dt>OTP</dt>
              <dd className="is-warn">Не прошёл, 2 попытки</dd>
            </div>
            <div>
              <dt>Канал</dt>
              <dd>Приложение</dd>
            </div>
          </dl>
          <p className="arm-note">Клиент, сумма и статус на одном экране. Новое окно не открывается.</p>
        </section>
        <section className="arm-panel">
          <header>
            <h4>Что сделать</h4>
            <span>подсказка сценария</span>
          </header>
          <ul className="arm-actions">
            <li>Попросить клиента запросить новый код.</li>
            <li>Не менять сумму — черновик уже согласован.</li>
            <li>Если третий отказ — эскалация, не новый черновик.</li>
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
          <p className="arm-kicker">Итог смены · 12 марта</p>
          <h3>Закрыли 42, вернули 3, эскалировали 3</h3>
        </div>
      </header>
      <div className="arm-kpi">
        <article>
          <strong>42</strong>
          <span>Закрыто</span>
        </article>
        <article>
          <strong>6%</strong>
          <span>Возврат в очередь</span>
        </article>
        <article>
          <strong>11</strong>
          <em>мин</em>
          <span>Медиана</span>
        </article>
        <article>
          <strong>94%</strong>
          <span>Без эскалации</span>
        </article>
      </div>
      <section className="arm-panel">
        <header>
          <h4>Откуда пришла работа</h4>
          <span>не из сырого списка заявок</span>
        </header>
        <ul className="arm-origin">
          <li>
            <b>ЦР · первый вход</b>
            <i style={{ width: '46%' }} />
            <em>19</em>
          </li>
          <li>
            <b>Посредник</b>
            <i style={{ width: '28%' }} />
            <em>12</em>
          </li>
          <li>
            <b>Мобильный оператор</b>
            <i style={{ width: '18%' }} />
            <em>8</em>
          </li>
          <li>
            <b>Возврат</b>
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
            Норд
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
