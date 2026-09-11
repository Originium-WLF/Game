/* ==========================================================================
   Тема 1 — HTML
   Схема уровня описана в README.md (раздел «Как добавить свой уровень»)
   ========================================================================== */

window.TOPIC_HTML = {
  id: 'html',
  name: 'HTML',
  icon: '</>',
  color: '#d1541c',        // акцент темы на светлом фоне
  colorDark: '#ff9257',    // он же на тёмном
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
            explain: '<code>&lt;!DOCTYPE html&gt;</code> — объявление типа документа. Стоит самой первой строкой, ' +
              'до тега <code>&lt;html&gt;</code>, и переключает браузер в стандартный режим отображения. ' +
              'Без него страница рисуется в режиме совместимости (quirks mode), где иначе считаются ' +
              'размеры блоков и работает наследование стилей. Это не тег и не элемент: у него нет ' +
              'закрывающей пары и он ничего не выводит.',
            refs: ['HTML Living Standard (WHATWG), § 13.1.1 — The DOCTYPE',
                   'HTML Living Standard, § 4.1 — the document element'] } ] },
        { t: 'line', items: [ { t: 'text', text: '<html lang="ru">' } ] },
        { t: 'line', items: [ { t: 'text', text: '  ' }, { t: 'slot', id: 'h1-head', answer: 'c-head', ph: 'поле 2',
            hint: 'Открывающий тег служебного раздела',
            explain: '<code>&lt;head&gt;</code> открывает раздел метаданных — сведений о странице, а не её содержимого. ' +
              'Сюда помещают кодировку, заголовок вкладки, описание для поисковых систем, ' +
              'настройку масштабирования на мобильных, подключение стилей и скриптов. ' +
              'Ничего из этого пользователь в окне браузера не видит. Раздел идёт первым ' +
              'внутри <code>&lt;html&gt;</code>, до <code>&lt;body&gt;</code>.',
            refs: ['HTML Living Standard (WHATWG), § 4.2 — document metadata',
                   'HTML Living Standard, § 4.2.1 — the head element'] } ] },
        { t: 'line', items: [ { t: 'text', text: '    ' }, { t: 'slot', id: 'h1-meta', answer: 'c-meta', ph: 'поле 3',
            hint: 'Кодировка документа',
            explain: '<code>&lt;meta charset="UTF-8"&gt;</code> объявляет кодировку символов документа. ' +
              'UTF-8 — единственная кодировка, которую предписывает современный стандарт: она покрывает ' +
              'кириллицу, латиницу и любые другие письменности. Объявление должно попасть в первые 1024 байта ' +
              'документа, поэтому его ставят сразу после открывающего <code>&lt;head&gt;</code>. ' +
              'Без него браузер угадывает кодировку, и кириллица превращается в «кракозябры».',
            refs: ['Encoding Standard (WHATWG) — UTF-8 как обязательная кодировка',
                   'HTML Living Standard, § 4.2.5 — the meta element',
                   'HTML Living Standard, § 4.2.5.5 — specifying the document character encoding'] } ] },
        { t: 'line', items: [ { t: 'text', text: '    ' }, { t: 'slot', id: 'h1-title', answer: 'c-title', ph: 'поле 4',
            hint: 'Заголовок вкладки браузера',
            explain: '<code>&lt;title&gt;</code> задаёт название документа. Оно выводится на вкладке браузера, ' +
              'подставляется в закладку и служит заголовком ссылки в результатах поиска. ' +
              'Элемент обязателен: в каждом документе должен быть ровно один непустой ' +
              '<code>&lt;title&gt;</code> внутри <code>&lt;head&gt;</code>. Разметка внутри него не работает — ' +
              'допускается только текст.',
            refs: ['HTML Living Standard (WHATWG), § 4.2.2 — the title element',
                   'WCAG 2.2, критерий успеха 2.4.2 — Page Titled'] } ] },
        { t: 'line', items: [ { t: 'text', text: '  </head>' } ] },
        { t: 'line', items: [ { t: 'text', text: '  ' }, { t: 'slot', id: 'h1-body', answer: 'c-body', ph: 'поле 5',
            hint: 'Открывающий тег видимой части',
            explain: '<code>&lt;body&gt;</code> открывает тело документа — всё, что пользователь видит в окне браузера: ' +
              'текст, изображения, таблицы, формы. В документе он ровно один и следует сразу за ' +
              '<code>&lt;/head&gt;</code>. Именно к нему применяются глобальные стили страницы ' +
              'и на нём обычно ловят события, всплывающие от вложенных элементов.',
            refs: ['HTML Living Standard (WHATWG), § 4.3.1 — the body element'] } ] },
        { t: 'line', items: [ { t: 'text', text: '    <h1>Добро пожаловать</h1>' } ] },
        { t: 'line', items: [ { t: 'text', text: '    <p>Это моя первая страница.</p>' } ] },
        { t: 'line', items: [ { t: 'text', text: '  ' }, { t: 'slot', id: 'h1-bodyend', answer: 'c-bodyend', ph: 'поле 6',
            hint: 'Закрывающий тег видимой части',
            explain: '<code>&lt;/body&gt;</code> закрывает тело документа и ставится перед <code>&lt;/html&gt;</code>. ' +
              'Вложенность парных элементов строгая: что открыли последним — закрываем первым, ' +
              'пересечение тегов недопустимо. Нарушение порядка браузер исправит по правилам ' +
              'разбора ошибок, но дерево документа при этом получится не тем, которое задумано, ' +
              'и стили со скриптами начнут работать непредсказуемо.',
            refs: ['HTML Living Standard (WHATWG), § 13.2 — parsing HTML documents',
                   'HTML Living Standard, § 13.1.2 — elements'] } ] },
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
            explain: '<code>&lt;header&gt;</code> — вводная часть страницы или отдельного раздела: логотип, ' +
              'название, контакты, поиск. Элементов может быть несколько: свой <code>&lt;header&gt;</code> ' +
              'допустим внутри <code>&lt;article&gt;</code> или <code>&lt;section&gt;</code>. ' +
              'Нельзя вкладывать его в другой <code>&lt;header&gt;</code> или в <code>&lt;footer&gt;</code>. ' +
              'Экранные читалки используют его как ориентир «banner» при навигации по странице.',
            refs: ['HTML Living Standard (WHATWG), § 4.3 — sections',
                   'WAI-ARIA: роль banner — соответствие элементу header',
                   'WCAG 2.2, критерий успеха 1.3.1 — Info and Relationships'] } ] },
        { t: 'row', items: [
          { t: 'text', text: 'Горизонтальное меню со ссылками на разделы', cls: 'b-small' },
          { t: 'slot', id: 'h2-nav', answer: 'c-nav', ph: 'тег',
            hint: 'Навигация',
            explain: '<code>&lt;nav&gt;</code> — блок навигационных ссылок: главное меню, «хлебные крошки», ' +
              'оглавление. Размечать им нужно только основные группы ссылок, а не каждое скопление ' +
              'ссылок на странице: ссылки в подвале обычно оставляют в <code>&lt;footer&gt;</code> ' +
              'без обёртки. Внутри чаще всего лежит список <code>&lt;ul&gt;</code>: так читалка ' +
              'объявит число пунктов меню.',
            refs: ['HTML Living Standard (WHATWG), § 4.3 — sections',
                   'WAI-ARIA: роль navigation — соответствие элементу nav'] } ] },
        { t: 'row', items: [
          { t: 'text', text: 'Основное содержимое, уникальное для этой страницы', cls: 'b-small' },
          { t: 'slot', id: 'h2-main', answer: 'c-main', ph: 'тег',
            hint: 'Главная область, одна на страницу',
            explain: '<code>&lt;main&gt;</code> — основное содержимое документа, уникальное для этой страницы. ' +
              'Видимый элемент <code>&lt;main&gt;</code> на странице должен быть только один, ' +
              'и в него не помещают то, что повторяется на всех страницах: шапку, меню, подвал, ' +
              'боковую колонку. Он не должен быть потомком <code>&lt;article&gt;</code>, ' +
              '<code>&lt;aside&gt;</code>, <code>&lt;header&gt;</code>, <code>&lt;footer&gt;</code> ' +
              'или <code>&lt;nav&gt;</code>. Браузеры используют его как цель для перехода ' +
              '«к основному содержимому».',
            refs: ['HTML Living Standard (WHATWG), § 4.4 — grouping content (the main element)',
                   'WCAG 2.2, критерий успеха 2.4.1 — Bypass Blocks'] } ] },
        { t: 'row', items: [
          { t: 'text', text: 'Текст новости, который можно опубликовать отдельно', cls: 'b-small' },
          { t: 'slot', id: 'h2-article', answer: 'c-article', ph: 'тег',
            hint: 'Самостоятельный материал',
            explain: '<code>&lt;article&gt;</code> — самостоятельная, законченная часть содержимого, которую можно ' +
              'распространять отдельно от страницы: новость, статья блога, карточка товара, ' +
              'комментарий, отзыв. Проверка простая: если фрагмент осмысленно читается в RSS-ленте ' +
              'или на чужом сайте — это <code>&lt;article&gt;</code>. Элементы можно вкладывать: ' +
              'комментарии внутри статьи тоже статьи.',
            refs: ['HTML Living Standard (WHATWG), § 4.3 — sections (the article element)'] } ] },
        { t: 'row', items: [
          { t: 'text', text: 'Боковая колонка: «Читайте также» и реклама', cls: 'b-small' },
          { t: 'slot', id: 'h2-aside', answer: 'c-aside', ph: 'тег',
            hint: 'Побочное содержимое',
            explain: '<code>&lt;aside&gt;</code> — содержимое, связанное с основным лишь косвенно: боковая колонка, ' +
              'блок «Читайте также», справка на полях, реклама. Ключевой признак — материал можно ' +
              'убрать, и основной текст не потеряет смысла. Это не «правая колонка» как место ' +
              'на макете: элемент говорит о роли содержимого, а положение задаётся стилями.',
            refs: ['HTML Living Standard (WHATWG), § 4.3 — sections (the aside element)',
                   'WAI-ARIA: роль complementary — соответствие элементу aside'] } ] },
        { t: 'row', items: [
          { t: 'text', text: 'Копирайт, адрес и ссылки на соцсети внизу', cls: 'b-small' },
          { t: 'slot', id: 'h2-footer', answer: 'c-footer', ph: 'тег',
            hint: 'Завершающая часть страницы',
            explain: '<code>&lt;footer&gt;</code> — завершающая часть страницы или раздела: копирайт, контакты, ' +
              'служебные ссылки, сведения об авторе, дата публикации. Как и <code>&lt;header&gt;</code>, ' +
              'может встречаться несколько раз — свой подвал допустим внутри статьи. ' +
              'Вкладывать <code>&lt;footer&gt;</code> в другой <code>&lt;footer&gt;</code> ' +
              'или в <code>&lt;header&gt;</code> нельзя.',
            refs: ['HTML Living Standard (WHATWG), § 4.3 — sections (the footer element)',
                   'WAI-ARIA: роль contentinfo — соответствие элементу footer'] } ] }
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
            explain: '<code>&lt;form&gt;</code> объединяет поля и определяет, куда и как уйдут данные: ' +
              '<code>action</code> — адрес обработчика, <code>method</code> — метод HTTP. ' +
              '<code>post</code> передаёт данные в теле запроса и подходит для действий, ' +
              'изменяющих состояние на сервере; <code>get</code> дописывает их в строку адреса ' +
              'и годится только для поиска и фильтров. Вкладывать форму в форму нельзя. ' +
              'Отправляются лишь те поля, у которых задан атрибут <code>name</code>.',
            refs: ['HTML Living Standard (WHATWG), § 4.10.3 — the form element',
                   'HTML Living Standard, § 4.10.21 — form submission',
                   'RFC 9110, § 9.3 — семантика методов GET и POST'] } ] },
        { t: 'line', items: [ { t: 'text', text: '  <label for="mail">Электронная почта</label>' } ] },
        { t: 'line', items: [ { t: 'text', text: '  ' }, { t: 'slot', id: 'h3-input', answer: 'c-input', ph: 'поле 2',
            hint: 'Однострочное поле для адреса почты',
            explain: '<code>&lt;input type="email"&gt;</code> — однострочное поле для адреса электронной почты. ' +
              'Браузер сам проверяет формат перед отправкой и на мобильных показывает клавиатуру ' +
              'со знаком @. Атрибут <code>required</code> делает поле обязательным, ' +
              '<code>id</code> связывает его с подписью <code>&lt;label for&gt;</code>. ' +
              'Проверка на стороне браузера не отменяет проверку на сервере: её легко обойти.',
            refs: ['HTML Living Standard (WHATWG), § 4.10.5 — the input element',
                   'HTML Living Standard, § 4.10.5.1.5 — email state',
                   'WCAG 2.2, критерий успеха 3.3.1 — Error Identification'] } ] },
        { t: 'line', items: [ { t: 'text', text: '' } ] },
        { t: 'line', items: [ { t: 'text', text: '  <label for="topic">Тема обращения</label>' } ] },
        { t: 'line', items: [ { t: 'text', text: '  ' }, { t: 'slot', id: 'h3-select', answer: 'c-select', ph: 'поле 3',
            hint: 'Выбор одного варианта из списка',
            explain: '<code>&lt;select&gt;</code> — выпадающий список для выбора из заранее известного набора. ' +
              'Варианты задаются вложенными <code>&lt;option&gt;</code>, их можно группировать ' +
              'через <code>&lt;optgroup&gt;</code>. Атрибут <code>multiple</code> разрешает выбрать ' +
              'несколько значений. Отправляется значение атрибута <code>value</code> выбранного варианта, ' +
              'а если его нет — текст внутри <code>&lt;option&gt;</code>.',
            refs: ['HTML Living Standard (WHATWG), § 4.10.7 — the select element',
                   'HTML Living Standard, § 4.10.10 — the option element'] } ] },
        { t: 'line', items: [ { t: 'text', text: '' } ] },
        { t: 'line', items: [ { t: 'text', text: '  <label for="msg">Сообщение</label>' } ] },
        { t: 'line', items: [ { t: 'text', text: '  ' }, { t: 'slot', id: 'h3-textarea', answer: 'c-textarea', ph: 'поле 4',
            hint: 'Многострочный ввод текста',
            explain: '<code>&lt;textarea&gt;</code> — многострочное текстовое поле. Тег обязательно парный, ' +
              'и начальное значение задаётся текстом между тегами, а не атрибутом <code>value</code>. ' +
              'Видимый размер задают атрибутами <code>rows</code> и <code>cols</code> или стилями; ' +
              'ограничить длину ввода можно атрибутом <code>maxlength</code>. ' +
              'Переносы строк внутри сохраняются и уходят на сервер как есть.',
            refs: ['HTML Living Standard (WHATWG), § 4.10.11 — the textarea element'] } ] },
        { t: 'line', items: [ { t: 'text', text: '' } ] },
        { t: 'line', items: [ { t: 'text', text: '  ' }, { t: 'slot', id: 'h3-button', answer: 'c-button', ph: 'поле 5',
            hint: 'Кнопка отправки формы',
            explain: '<code>&lt;button type="submit"&gt;</code> отправляет форму по адресу из атрибута ' +
              '<code>action</code>. Указывать <code>type</code> явно важно: у кнопки внутри формы ' +
              'это значение по умолчанию, и кнопка, задуманная как вспомогательная, ' +
              'случайно отправит форму. Другие значения — <code>reset</code> (сброс полей) ' +
              'и <code>button</code> (никаких действий, только обработчик в скрипте). ' +
              'В отличие от <code>&lt;input type="submit"&gt;</code>, внутрь можно положить разметку.',
            refs: ['HTML Living Standard (WHATWG), § 4.10.6 — the button element',
                   'HTML Living Standard, § 4.10.21 — form submission'] } ] },
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
