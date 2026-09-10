/* ==========================================================================
   Тема 1 — HTML
   Схема уровня описана в README.md (раздел «Как добавить свой уровень»)
   ========================================================================== */

window.TOPIC_HTML = {
  id: 'html',
  name: 'HTML',
  icon: '</>',
  color: '#e2622f',
  soft: '#fdeee7',
  desc: 'Структура страницы, семантические теги и формы. Собери разметку из готовых фрагментов.',

  levels: [

    /* ---------------------------------------------------------------- */
    {
      id: 'html-1',
      name: 'Скелет страницы',
      desc: 'Базовая структура HTML-документа',
      task: 'Расставь недостающие теги так, чтобы получился корректный HTML-документ.',
      theory:
        '<p>Любая страница строится по одной схеме:</p>' +
        '<ul>' +
        '<li><code>&lt;!DOCTYPE html&gt;</code> — объявление типа документа, всегда первая строка;</li>' +
        '<li><code>&lt;head&gt;</code> — служебные данные: кодировка, заголовок вкладки, подключение стилей. На странице не видны;</li>' +
        '<li><code>&lt;body&gt;</code> — всё, что пользователь видит в окне браузера;</li>' +
        '<li>парные теги закрываются в обратном порядке: что открыли последним — закрываем первым.</li>' +
        '</ul>',
      boardType: 'code',
      blocks: [
        { t: 'line', items: [ { t: 'slot', id: 'h1-doctype', answer: 'c-doctype', ph: 'поле 1',
            hint: 'Объявление типа документа',
            explain: '<code>&lt;!DOCTYPE html&gt;</code> — первая строка файла, включает стандартный режим отображения.' } ] },
        { t: 'line', items: [ { t: 'text', text: '<html lang="ru">' } ] },
        { t: 'line', items: [ { t: 'text', text: '  ' }, { t: 'slot', id: 'h1-head', answer: 'c-head', ph: 'поле 2',
            hint: 'Открывающий тег служебного раздела',
            explain: '<code>&lt;head&gt;</code> — раздел с метаданными: кодировка, title, ссылки на CSS.' } ] },
        { t: 'line', items: [ { t: 'text', text: '    ' }, { t: 'slot', id: 'h1-meta', answer: 'c-meta', ph: 'поле 3',
            hint: 'Кодировка документа',
            explain: '<code>&lt;meta charset="UTF-8"&gt;</code> задаёт кодировку — без неё кириллица может превратиться в «кракозябры».' } ] },
        { t: 'line', items: [ { t: 'text', text: '    ' }, { t: 'slot', id: 'h1-title', answer: 'c-title', ph: 'поле 4',
            hint: 'Заголовок вкладки браузера',
            explain: '<code>&lt;title&gt;</code> — название страницы: показывается на вкладке и в результатах поиска.' } ] },
        { t: 'line', items: [ { t: 'text', text: '  </head>' } ] },
        { t: 'line', items: [ { t: 'text', text: '  ' }, { t: 'slot', id: 'h1-body', answer: 'c-body', ph: 'поле 5',
            hint: 'Открывающий тег видимой части',
            explain: '<code>&lt;body&gt;</code> открывает содержимое, которое видит пользователь.' } ] },
        { t: 'line', items: [ { t: 'text', text: '    <h1>Добро пожаловать</h1>' } ] },
        { t: 'line', items: [ { t: 'text', text: '    <p>Это моя первая страница.</p>' } ] },
        { t: 'line', items: [ { t: 'text', text: '  ' }, { t: 'slot', id: 'h1-bodyend', answer: 'c-bodyend', ph: 'поле 6',
            hint: 'Закрывающий тег видимой части',
            explain: '<code>&lt;/body&gt;</code> закрывается перед <code>&lt;/html&gt;</code>: вложенность соблюдается строго.' } ] },
        { t: 'line', items: [ { t: 'text', text: '</html>' } ] }
      ],
      cards: [
        { id: 'c-doctype', text: '<!DOCTYPE html>', code: true },
        { id: 'c-head',    text: '<head>',          code: true },
        { id: 'c-meta',    text: '<meta charset="UTF-8">', code: true },
        { id: 'c-title',   text: '<title>Моя первая страница</title>', code: true },
        { id: 'c-body',    text: '<body>',          code: true },
        { id: 'c-bodyend', text: '</body>',         code: true },
        { id: 'c-x-html',  text: '</html>',         code: true, note: 'Закрывающий тег <html> уже стоит в разметке последней строкой.' },
        { id: 'c-x-div',   text: '<div>',           code: true, note: '<div> — блок без смысла, в скелете документа он не нужен.' },
        { id: 'c-x-style', text: '<style>',         code: true, note: 'Стили подключают отдельно; для базовой структуры тег не требуется.' },
        { id: 'c-x-br',    text: '<br>',            code: true, note: '<br> — перенос строки внутри текста, к структуре документа отношения не имеет.' }
      ]
    },

    /* ---------------------------------------------------------------- */
    {
      id: 'html-2',
      name: 'Семантическая разметка',
      desc: 'Теги, которые описывают смысл блока',
      task: 'Подбери семантический тег для каждой области страницы.',
      theory:
        '<p>Семантические теги говорят браузеру и поисковику, <b>чем является</b> блок, а не как он выглядит:</p>' +
        '<ul>' +
        '<li><code>&lt;header&gt;</code> — шапка, <code>&lt;footer&gt;</code> — подвал;</li>' +
        '<li><code>&lt;nav&gt;</code> — блок навигационных ссылок;</li>' +
        '<li><code>&lt;main&gt;</code> — основное содержимое, на странице ровно один раз;</li>' +
        '<li><code>&lt;article&gt;</code> — самостоятельный материал, который можно вынести отдельно;</li>' +
        '<li><code>&lt;aside&gt;</code> — то, что связано с содержимым косвенно (боковая колонка).</li>' +
        '</ul>',
      boardType: 'layout',
      blocks: [
        { t: 'row', items: [
          { t: 'text', text: 'Логотип, название сайта и телефон вверху страницы', cls: 'b-small' },
          { t: 'slot', id: 'h2-header', answer: 'c-header', ph: 'тег',
            hint: 'Вводная часть страницы',
            explain: '<code>&lt;header&gt;</code> — вводный блок: логотип, название, контакты.' } ] },
        { t: 'row', items: [
          { t: 'text', text: 'Горизонтальное меню со ссылками на разделы', cls: 'b-small' },
          { t: 'slot', id: 'h2-nav', answer: 'c-nav', ph: 'тег',
            hint: 'Навигация',
            explain: '<code>&lt;nav&gt;</code> — блок основных навигационных ссылок.' } ] },
        { t: 'row', items: [
          { t: 'text', text: 'Основное содержимое, уникальное для этой страницы', cls: 'b-small' },
          { t: 'slot', id: 'h2-main', answer: 'c-main', ph: 'тег',
            hint: 'Главная область, одна на страницу',
            explain: '<code>&lt;main&gt;</code> — основное содержимое; на странице должен быть только один такой тег.' } ] },
        { t: 'row', items: [
          { t: 'text', text: 'Текст новости, который можно опубликовать отдельно', cls: 'b-small' },
          { t: 'slot', id: 'h2-article', answer: 'c-article', ph: 'тег',
            hint: 'Самостоятельный материал',
            explain: '<code>&lt;article&gt;</code> — законченный материал: новость, статья, отзыв.' } ] },
        { t: 'row', items: [
          { t: 'text', text: 'Боковая колонка: «Читайте также» и реклама', cls: 'b-small' },
          { t: 'slot', id: 'h2-aside', answer: 'c-aside', ph: 'тег',
            hint: 'Побочное содержимое',
            explain: '<code>&lt;aside&gt;</code> — содержимое, связанное с основным лишь косвенно.' } ] },
        { t: 'row', items: [
          { t: 'text', text: 'Копирайт, адрес и ссылки на соцсети внизу', cls: 'b-small' },
          { t: 'slot', id: 'h2-footer', answer: 'c-footer', ph: 'тег',
            hint: 'Завершающая часть страницы',
            explain: '<code>&lt;footer&gt;</code> — подвал: копирайт, контакты, служебные ссылки.' } ] }
      ],
      cards: [
        { id: 'c-header',  text: '<header>',  code: true },
        { id: 'c-nav',     text: '<nav>',     code: true },
        { id: 'c-main',    text: '<main>',    code: true },
        { id: 'c-article', text: '<article>', code: true },
        { id: 'c-aside',   text: '<aside>',   code: true },
        { id: 'c-footer',  text: '<footer>',  code: true },
        { id: 'c-x-div2',  text: '<div>',     code: true, note: '<div> не несёт смысла — его берут, когда подходящего семантического тега нет.' },
        { id: 'c-x-span',  text: '<span>',    code: true, note: '<span> — строчный контейнер для куска текста, не для области страницы.' },
        { id: 'c-x-fig',   text: '<figure>',  code: true, note: '<figure> — иллюстрация с подписью, а не структурная область.' },
        { id: 'c-x-table', text: '<table>',   code: true, note: '<table> — таблица данных; вёрстку макета на таблицах давно не делают.' }
      ]
    },

    /* ---------------------------------------------------------------- */
    {
      id: 'html-3',
      name: 'Форма обратной связи',
      desc: 'Поля ввода, список и кнопка отправки',
      task: 'Собери рабочую форму: под каждой подписью должно стоять подходящее поле.',
      theory:
        '<p>Форма отправляет данные на сервер. Ключевые элементы:</p>' +
        '<ul>' +
        '<li><code>&lt;form action="…" method="post"&gt;</code> — куда и каким методом уходят данные;</li>' +
        '<li><code>&lt;input type="email"&gt;</code> — однострочное поле с проверкой адреса;</li>' +
        '<li><code>&lt;textarea&gt;</code> — многострочный текст, тег обязательно парный;</li>' +
        '<li><code>&lt;select&gt;</code> — выпадающий список с <code>&lt;option&gt;</code> внутри;</li>' +
        '<li><code>&lt;button type="submit"&gt;</code> — отправка формы.</li>' +
        '</ul>' +
        '<p>Атрибут <code>for</code> у <code>&lt;label&gt;</code> должен совпадать с <code>id</code> поля.</p>',
      boardType: 'code',
      blocks: [
        { t: 'line', items: [ { t: 'slot', id: 'h3-form', answer: 'c-form', ph: 'поле 1',
            hint: 'Открывающий тег формы с адресом и методом',
            explain: '<code>&lt;form action="/feedback" method="post"&gt;</code> — адрес обработчика и метод отправки.' } ] },
        { t: 'line', items: [ { t: 'text', text: '  <label for="mail">Электронная почта</label>' } ] },
        { t: 'line', items: [ { t: 'text', text: '  ' }, { t: 'slot', id: 'h3-input', answer: 'c-input', ph: 'поле 2',
            hint: 'Однострочное поле для адреса почты',
            explain: '<code>&lt;input type="email" id="mail" required&gt;</code> — браузер сам проверит формат адреса.' } ] },
        { t: 'line', items: [ { t: 'text', text: '' } ] },
        { t: 'line', items: [ { t: 'text', text: '  <label for="topic">Тема обращения</label>' } ] },
        { t: 'line', items: [ { t: 'text', text: '  ' }, { t: 'slot', id: 'h3-select', answer: 'c-select', ph: 'поле 3',
            hint: 'Выбор одного варианта из списка',
            explain: '<code>&lt;select&gt;</code> — выпадающий список; варианты задаются тегами <code>&lt;option&gt;</code>.' } ] },
        { t: 'line', items: [ { t: 'text', text: '' } ] },
        { t: 'line', items: [ { t: 'text', text: '  <label for="msg">Сообщение</label>' } ] },
        { t: 'line', items: [ { t: 'text', text: '  ' }, { t: 'slot', id: 'h3-textarea', answer: 'c-textarea', ph: 'поле 4',
            hint: 'Многострочный ввод текста',
            explain: '<code>&lt;textarea&gt;&lt;/textarea&gt;</code> — многострочное поле, тег парный, размер задаётся через rows/cols.' } ] },
        { t: 'line', items: [ { t: 'text', text: '' } ] },
        { t: 'line', items: [ { t: 'text', text: '  ' }, { t: 'slot', id: 'h3-button', answer: 'c-button', ph: 'поле 5',
            hint: 'Кнопка отправки формы',
            explain: '<code>&lt;button type="submit"&gt;</code> отправляет форму по адресу из атрибута action.' } ] },
        { t: 'line', items: [ { t: 'text', text: '</form>' } ] }
      ],
      cards: [
        { id: 'c-form',     text: '<form action="/feedback" method="post">', code: true },
        { id: 'c-input',    text: '<input type="email" id="mail" required>', code: true },
        { id: 'c-select',   text: '<select id="topic">...</select>', code: true },
        { id: 'c-textarea', text: '<textarea id="msg" rows="4"></textarea>', code: true },
        { id: 'c-button',   text: '<button type="submit">Отправить</button>', code: true },
        { id: 'c-x-pass',   text: '<input type="password" id="mail">', code: true, note: 'Тип password скрывает ввод точками — для адреса почты не подходит.' },
        { id: 'c-x-reset',  text: '<button type="reset">Очистить</button>', code: true, note: 'type="reset" очищает форму, но не отправляет её.' },
        { id: 'c-x-link',   text: '<a href="/feedback">Отправить</a>', code: true, note: 'Ссылка выполняет переход, а не отправку данных формы.' },
        { id: 'c-x-img',    text: '<img src="mail.png" alt="почта">', code: true, note: 'Картинка ничего не вводит и не отправляет.' }
      ]
    }

  ]
};
