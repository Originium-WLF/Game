/* ==========================================================================
   Тема 2 — CSS
   ========================================================================== */

window.TOPIC_CSS = {
  id: 'css',
  name: 'CSS',
  icon: '#',
  color: '#2f6fd0',
  soft: '#e6eefb',
  desc: 'Свойства оформления, селекторы и флексбокс. Собери правила из отдельных объявлений.',

  levels: [

    /* ---------------------------------------------------------------- */
    {
      id: 'css-1',
      name: 'Оформление карточки',
      desc: 'Цвет, отступы, рамка, шрифт',
      task: 'Подставь свойство, которое даёт описанный в комментарии результат.',
      theory:
        '<p>Правило CSS состоит из селектора и объявлений <code>свойство: значение;</code></p>' +
        '<ul>' +
        '<li><code>background-color</code> — заливка фона, <code>color</code> — цвет текста;</li>' +
        '<li><code>padding</code> — внутренний отступ (между рамкой и содержимым);</li>' +
        '<li><code>margin</code> — внешний отступ (между этим блоком и соседями);</li>' +
        '<li><code>border</code> — рамка, <code>border-radius</code> — скругление её углов;</li>' +
        '<li><code>font-size</code> — размер шрифта.</li>' +
        '</ul>',
      boardType: 'code',
      blocks: [
        { t: 'line', items: [ { t: 'text', text: '.card {' } ] },
        { t: 'line', items: [ { t: 'text', text: '  ' }, { t: 'slot', id: 'c1-bg', answer: 'p-bg', ph: 'свойство' , w: 190,
            hint: 'Отвечает за заливку фона',
            explain: '<code>background-color</code> задаёт цвет фона элемента.' },
          { t: 'text', text: ': #ffffff;' }, { t: 'text', text: '            /* белая заливка */', cls: 'b-comment' } ] },
        { t: 'line', items: [ { t: 'text', text: '  ' }, { t: 'slot', id: 'c1-color', answer: 'p-color', ph: 'свойство', w: 190,
            hint: 'Отвечает за цвет текста',
            explain: '<code>color</code> — цвет текста внутри элемента.' },
          { t: 'text', text: ': #16202e;' }, { t: 'text', text: '            /* тёмный текст */', cls: 'b-comment' } ] },
        { t: 'line', items: [ { t: 'text', text: '  ' }, { t: 'slot', id: 'c1-fs', answer: 'p-fs', ph: 'свойство', w: 190,
            hint: 'Размер шрифта',
            explain: '<code>font-size</code> — размер шрифта; в примере 16 пикселей.' },
          { t: 'text', text: ': 16px;' }, { t: 'text', text: '               /* размер шрифта */', cls: 'b-comment' } ] },
        { t: 'line', items: [ { t: 'text', text: '  ' }, { t: 'slot', id: 'c1-padding', answer: 'p-padding', ph: 'свойство', w: 190,
            hint: 'Отступ внутри рамки',
            explain: '<code>padding</code> — внутренний отступ: воздух между рамкой и содержимым.' },
          { t: 'text', text: ': 20px;' }, { t: 'text', text: '               /* воздух внутри блока */', cls: 'b-comment' } ] },
        { t: 'line', items: [ { t: 'text', text: '  ' }, { t: 'slot', id: 'c1-margin', answer: 'p-margin', ph: 'свойство', w: 190,
            hint: 'Отступ снаружи блока',
            explain: '<code>margin</code> — внешний отступ, раздвигает соседние блоки.' },
          { t: 'text', text: ': 12px;' }, { t: 'text', text: '               /* отступ от соседей */', cls: 'b-comment' } ] },
        { t: 'line', items: [ { t: 'text', text: '  ' }, { t: 'slot', id: 'c1-border', answer: 'p-border', ph: 'свойство', w: 190,
            hint: 'Рамка вокруг блока',
            explain: '<code>border</code> — рамка: толщина, стиль и цвет одной строкой.' },
          { t: 'text', text: ': 1px solid #d8dfea;' }, { t: 'text', text: '  /* тонкая рамка */', cls: 'b-comment' } ] },
        { t: 'line', items: [ { t: 'text', text: '  ' }, { t: 'slot', id: 'c1-radius', answer: 'p-radius', ph: 'свойство', w: 190,
            hint: 'Скругление углов',
            explain: '<code>border-radius</code> скругляет углы блока.' },
          { t: 'text', text: ': 12px;' }, { t: 'text', text: '               /* скруглённые углы */', cls: 'b-comment' } ] },
        { t: 'line', items: [ { t: 'text', text: '}' } ] }
      ],
      cards: [
        { id: 'p-bg',      text: 'background-color', code: true },
        { id: 'p-color',   text: 'color',            code: true },
        { id: 'p-fs',      text: 'font-size',        code: true },
        { id: 'p-padding', text: 'padding',          code: true },
        { id: 'p-margin',  text: 'margin',           code: true },
        { id: 'p-border',  text: 'border',           code: true },
        { id: 'p-radius',  text: 'border-radius',    code: true },
        { id: 'p-x-bgimg', text: 'background-image', code: true, note: 'Подставляет картинку, а не цвет.' },
        { id: 'p-x-zi',    text: 'z-index',          code: true, note: 'Управляет порядком наложения слоёв, оформления не меняет.' },
        { id: 'p-x-ff',    text: 'font-family',      code: true, note: 'Задаёт гарнитуру шрифта, а не его размер.' },
        { id: 'p-x-os',    text: 'outline',          code: true, note: 'Обводка поверх рамки; место в потоке не занимает.' }
      ]
    },

    /* ---------------------------------------------------------------- */
    {
      id: 'css-2',
      name: 'Селекторы',
      desc: 'Как выбрать нужные элементы',
      task: 'Подбери селектор под каждую задачу.',
      theory:
        '<p>Селектор отвечает на вопрос «к чему применить стиль»:</p>' +
        '<ul>' +
        '<li><code>p</code> — по имени тега, все такие элементы;</li>' +
        '<li><code>.btn</code> — по классу, <code>#menu</code> — по уникальному id;</li>' +
        '<li><code>.card p</code> — потомки: абзацы где-то внутри <code>.card</code>;</li>' +
        '<li><code>a:hover</code> — псевдокласс состояния (наведение мышью);</li>' +
        '<li><code>li:first-child</code> — первый ребёнок своего родителя;</li>' +
        '<li><code>input[type="text"]</code> — по значению атрибута.</li>' +
        '</ul>',
      boardType: 'layout',
      blocks: [
        { t: 'row', items: [
          { t: 'text', text: 'Все абзацы на странице', cls: 'b-small' },
          { t: 'slot', id: 'c2-tag', answer: 's-tag', ph: 'селектор',
            hint: 'Выбор по имени тега',
            explain: '<code>p</code> — селектор тега: попадают все абзацы документа.' } ] },
        { t: 'row', items: [
          { t: 'text', text: 'Единственный блок с id="menu"', cls: 'b-small' },
          { t: 'slot', id: 'c2-id', answer: 's-id', ph: 'селектор',
            hint: 'Выбор по идентификатору',
            explain: '<code>#menu</code> — селектор id; id на странице уникален.' } ] },
        { t: 'row', items: [
          { t: 'text', text: 'Все кнопки с классом btn', cls: 'b-small' },
          { t: 'slot', id: 'c2-class', answer: 's-class', ph: 'селектор',
            hint: 'Выбор по классу',
            explain: '<code>.btn</code> — селектор класса, один класс можно повесить на сколько угодно элементов.' } ] },
        { t: 'row', items: [
          { t: 'text', text: 'Ссылка в момент наведения курсора', cls: 'b-small' },
          { t: 'slot', id: 'c2-hover', answer: 's-hover', ph: 'селектор',
            hint: 'Псевдокласс состояния',
            explain: '<code>a:hover</code> срабатывает, пока курсор находится над ссылкой.' } ] },
        { t: 'row', items: [
          { t: 'text', text: 'Только те абзацы, что лежат внутри .card', cls: 'b-small' },
          { t: 'slot', id: 'c2-desc', answer: 's-desc', ph: 'селектор',
            hint: 'Вложенность через пробел',
            explain: '<code>.card p</code> — пробел означает «любой потомок внутри».' } ] },
        { t: 'row', items: [
          { t: 'text', text: 'Первый пункт в каждом списке', cls: 'b-small' },
          { t: 'slot', id: 'c2-first', answer: 's-first', ph: 'селектор',
            hint: 'Псевдокласс позиции',
            explain: '<code>li:first-child</code> — элемент, стоящий первым у своего родителя.' } ] },
        { t: 'row', items: [
          { t: 'text', text: 'Текстовые поля ввода (но не чекбоксы)', cls: 'b-small' },
          { t: 'slot', id: 'c2-attr', answer: 's-attr', ph: 'селектор',
            hint: 'Выбор по атрибуту',
            explain: '<code>input[type="text"]</code> — селектор атрибута, отбирает поля нужного типа.' } ] }
      ],
      cards: [
        { id: 's-tag',    text: 'p',                     code: true },
        { id: 's-id',     text: '#menu',                 code: true },
        { id: 's-class',  text: '.btn',                  code: true },
        { id: 's-hover',  text: 'a:hover',               code: true },
        { id: 's-desc',   text: '.card p',               code: true },
        { id: 's-first',  text: 'li:first-child',        code: true },
        { id: 's-attr',   text: 'input[type="text"]',    code: true },
        { id: 's-x-all',  text: '*',                     code: true, note: 'Универсальный селектор — попадают вообще все элементы страницы.' },
        { id: 's-x-adj',  text: 'p + p',                 code: true, note: 'Соседний селектор: абзац сразу после другого абзаца.' },
        { id: 's-x-last', text: 'li:last-child',         code: true, note: 'Это последний пункт списка, а не первый.' },
        { id: 's-x-grp',  text: '.card, p',              code: true, note: 'Запятая — это группировка: «и .card, и все абзацы», а не вложенность.' }
      ]
    },

    /* ---------------------------------------------------------------- */
    {
      id: 'css-3',
      name: 'Флексбокс',
      desc: 'Раскладка панели инструментов',
      task: 'Собери правило так, чтобы элементы встали в строку с описанным поведением.',
      theory:
        '<p>Флексбокс включается на родителе и раскладывает его детей:</p>' +
        '<ul>' +
        '<li><code>display: flex</code> — включает режим;</li>' +
        '<li><code>flex-direction</code> — направление главной оси (<code>row</code> / <code>column</code>);</li>' +
        '<li><code>justify-content</code> — распределение вдоль главной оси;</li>' +
        '<li><code>align-items</code> — выравнивание поперёк главной оси;</li>' +
        '<li><code>gap</code> — расстояние между элементами;</li>' +
        '<li><code>flex-wrap: wrap</code> — разрешает перенос на новую строку.</li>' +
        '</ul>',
      boardType: 'code',
      blocks: [
        { t: 'line', items: [ { t: 'text', text: '.toolbar {' } ] },
        { t: 'line', items: [ { t: 'text', text: '  ' }, { t: 'slot', id: 'c3-display', answer: 'f-display', ph: 'свойство', w: 180,
            hint: 'Включает флекс-раскладку',
            explain: '<code>display: flex</code> — без этой строки остальные флекс-свойства не работают.' },
          { t: 'text', text: ': flex;' }, { t: 'text', text: '                    /* включаем флексбокс */', cls: 'b-comment' } ] },
        { t: 'line', items: [ { t: 'text', text: '  ' }, { t: 'slot', id: 'c3-dir', answer: 'f-dir', ph: 'свойство', w: 180,
            hint: 'Направление главной оси',
            explain: '<code>flex-direction: row</code> выстраивает элементы в строку слева направо.' },
          { t: 'text', text: ': row;' }, { t: 'text', text: '                     /* элементы в строку */', cls: 'b-comment' } ] },
        { t: 'line', items: [ { t: 'text', text: '  ' }, { t: 'slot', id: 'c3-justify', answer: 'f-justify', ph: 'свойство', w: 180,
            hint: 'Распределение вдоль строки',
            explain: '<code>justify-content: space-between</code> прижимает крайние элементы к краям, промежутки делает равными.' },
          { t: 'text', text: ': space-between;' }, { t: 'text', text: '  /* по краям, промежутки поровну */', cls: 'b-comment' } ] },
        { t: 'line', items: [ { t: 'text', text: '  ' }, { t: 'slot', id: 'c3-align', answer: 'f-align', ph: 'свойство', w: 180,
            hint: 'Выравнивание поперёк строки',
            explain: '<code>align-items: center</code> центрирует элементы по вертикали внутри строки.' },
          { t: 'text', text: ': center;' }, { t: 'text', text: '                  /* по центру по вертикали */', cls: 'b-comment' } ] },
        { t: 'line', items: [ { t: 'text', text: '  ' }, { t: 'slot', id: 'c3-gap', answer: 'f-gap', ph: 'свойство', w: 180,
            hint: 'Расстояние между элементами',
            explain: '<code>gap</code> задаёт промежутки между флекс-элементами без margin-хаков.' },
          { t: 'text', text: ': 12px;' }, { t: 'text', text: '                     /* просвет между кнопками */', cls: 'b-comment' } ] },
        { t: 'line', items: [ { t: 'text', text: '  ' }, { t: 'slot', id: 'c3-wrap', answer: 'f-wrap', ph: 'свойство', w: 180,
            hint: 'Разрешение переноса',
            explain: '<code>flex-wrap: wrap</code> позволяет элементам перейти на следующую строку, если не помещаются.' },
          { t: 'text', text: ': wrap;' }, { t: 'text', text: '                    /* перенос на новую строку */', cls: 'b-comment' } ] },
        { t: 'line', items: [ { t: 'text', text: '}' } ] }
      ],
      cards: [
        { id: 'f-display', text: 'display',         code: true },
        { id: 'f-dir',     text: 'flex-direction',  code: true },
        { id: 'f-justify', text: 'justify-content', code: true },
        { id: 'f-align',   text: 'align-items',     code: true },
        { id: 'f-gap',     text: 'gap',             code: true },
        { id: 'f-wrap',    text: 'flex-wrap',       code: true },
        { id: 'f-x-float', text: 'float',           code: true, note: 'Старый способ раскладки; во флексбоксе float на детях игнорируется.' },
        { id: 'f-x-ta',    text: 'text-align',      code: true, note: 'Выравнивает текст внутри строки, а не флекс-элементы.' },
        { id: 'f-x-vert',  text: 'vertical-align',  code: true, note: 'Работает для строчных элементов и ячеек таблиц, на флекс-детей не влияет.' },
        { id: 'f-x-pos',   text: 'position',        code: true, note: 'Вырывает элемент из потока — это другой механизм раскладки.' }
      ]
    }

  ]
};
