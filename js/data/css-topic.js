/* ==========================================================================
   Тема 2 — CSS
   ========================================================================== */

window.TOPIC_CSS = {
  id: 'css',
  name: 'CSS',
  icon: '#',
  color: '#2f66c8',        // акцент темы на светлом фоне
  colorDark: '#7ea9ff',    // он же на тёмном
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
            explain: '<code>background-color</code> задаёт цвет фона элемента. Фон закрашивает область содержимого ' +
              'вместе с внутренними отступами и заходит под рамку, но не под внешние отступы: ' +
              'увеличение <code>padding</code> увеличивает закрашенную площадь, а <code>margin</code> — нет. ' +
              'Значение по умолчанию — <code>transparent</code>, поэтому сквозь элемент виден фон родителя.',
            refs: ['CSS Backgrounds and Borders Module Level 3 (W3C), § 3.10 — background-color',
                   'CSS Box Model Module Level 3 (W3C) — области блока'] },
          { t: 'text', text: ': #ffffff;' }, { t: 'text', text: '            /* белая заливка */', cls: 'b-comment' } ] },
        { t: 'line', items: [ { t: 'text', text: '  ' }, { t: 'slot', id: 'c1-color', answer: 'p-color', ph: 'свойство', w: 190,
            hint: 'Отвечает за цвет текста',
            explain: '<code>color</code> задаёт цвет текста. Свойство наследуется, поэтому достаточно объявить его ' +
              'на родителе — вложенные элементы подхватят значение сами. К нему же по умолчанию ' +
              'привязаны цвет рамки и <code>currentColor</code>, которым удобно красить значки. ' +
              'Контраст текста к фону должен быть не ниже 4.5:1 для обычного размера.',
            refs: ['CSS Color Module Level 4 (W3C) — свойство color',
                   'WCAG 2.2, критерий успеха 1.4.3 — Contrast (Minimum)'] },
          { t: 'text', text: ': #16202e;' }, { t: 'text', text: '            /* тёмный текст */', cls: 'b-comment' } ] },
        { t: 'line', items: [ { t: 'text', text: '  ' }, { t: 'slot', id: 'c1-fs', answer: 'p-fs', ph: 'свойство', w: 190,
            hint: 'Размер шрифта',
            explain: '<code>font-size</code> задаёт размер шрифта. Свойство наследуется, а относительные единицы ' +
              'считаются от родителя: <code>em</code> — от размера шрифта родителя, ' +
              '<code>rem</code> — от корневого элемента, что предсказуемее при вложенности. ' +
              'Жёстко фиксировать размер в пикселях не стоит: это мешает пользователю ' +
              'увеличить текст настройками браузера.',
            refs: ['CSS Fonts Module Level 4 (W3C) — свойство font-size',
                   'CSS Values and Units Module Level 4 (W3C) — единицы em и rem',
                   'WCAG 2.2, критерий успеха 1.4.4 — Resize Text'] },
          { t: 'text', text: ': 16px;' }, { t: 'text', text: '               /* размер шрифта */', cls: 'b-comment' } ] },
        { t: 'line', items: [ { t: 'text', text: '  ' }, { t: 'slot', id: 'c1-padding', answer: 'p-padding', ph: 'свойство', w: 190,
            hint: 'Отступ внутри рамки',
            explain: '<code>padding</code> — внутренний отступ между содержимым и рамкой. Он окрашивается фоном ' +
              'элемента и по умолчанию прибавляется к заданной ширине: блок шириной 200px ' +
              'с отступом 20px займёт 240px. Правило <code>box-sizing: border-box</code> меняет это, ' +
              'включая отступы и рамку в объявленную ширину. Отрицательных значений у padding не бывает.',
            refs: ['CSS Box Model Module Level 3 (W3C), § 6 — padding',
                   'CSS Box Sizing Module Level 3 (W3C) — свойство box-sizing'] },
          { t: 'text', text: ': 20px;' }, { t: 'text', text: '               /* воздух внутри блока */', cls: 'b-comment' } ] },
        { t: 'line', items: [ { t: 'text', text: '  ' }, { t: 'slot', id: 'c1-margin', answer: 'p-margin', ph: 'свойство', w: 190,
            hint: 'Отступ снаружи блока',
            explain: '<code>margin</code> — внешний отступ, раздвигающий элемент и его соседей. Он прозрачен: ' +
              'фон элемента на него не распространяется. Вертикальные отступы соседних блоков ' +
              'схлопываются — из двух остаётся больший, а не их сумма; горизонтальные не схлопываются никогда. ' +
              'Значение <code>auto</code> по горизонтали центрирует блок известной ширины. ' +
              'Отрицательные значения допустимы.',
            refs: ['CSS Box Model Module Level 3 (W3C), § 7 — margin',
                   'CSS Box Model Module Level 3, § 7.1 — схлопывание отступов'] },
          { t: 'text', text: ': 12px;' }, { t: 'text', text: '               /* отступ от соседей */', cls: 'b-comment' } ] },
        { t: 'line', items: [ { t: 'text', text: '  ' }, { t: 'slot', id: 'c1-border', answer: 'p-border', ph: 'свойство', w: 190,
            hint: 'Рамка вокруг блока',
            explain: '<code>border</code> — сокращённая запись сразу трёх свойств: <code>border-width</code>, ' +
              '<code>border-style</code> и <code>border-color</code>. Стиль обязателен: ' +
              'при значении <code>none</code> рамка не рисуется, какой бы ни была толщина. ' +
              'Если цвет не указан, берётся текущий цвет текста. Рамка занимает место в потоке ' +
              'и увеличивает размеры блока — в отличие от <code>outline</code>.',
            refs: ['CSS Backgrounds and Borders Module Level 3 (W3C), § 4 — borders',
                   'CSS Box Model Module Level 3 (W3C) — области блока'] },
          { t: 'text', text: ': 1px solid #d8dfea;' }, { t: 'text', text: '  /* тонкая рамка */', cls: 'b-comment' } ] },
        { t: 'line', items: [ { t: 'text', text: '  ' }, { t: 'slot', id: 'c1-radius', answer: 'p-radius', ph: 'свойство', w: 190,
            hint: 'Скругление углов',
            explain: '<code>border-radius</code> скругляет углы блока. Одно значение применяется ко всем четырём углам, ' +
              'через пробел можно задать каждый угол отдельно, а через косую черту — разные радиусы ' +
              'по горизонтали и вертикали, получая эллиптическое скругление. ' +
              'Значение <code>50%</code> у квадрата превращает его в круг. Скругление обрезает и фон, ' +
              'и рамку, но содержимое — только при <code>overflow: hidden</code>.',
            refs: ['CSS Backgrounds and Borders Module Level 3 (W3C), § 5 — border-radius'] },
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
            explain: '<code>p</code> — селектор типа: выбирает все элементы с таким именем во всём документе. ' +
              'Это самый слабый вид селектора, его специфичность 0-0-1, поэтому любое правило ' +
              'с классом перебьёт его независимо от порядка в файле. Удобен для базовых стилей ' +
              'типографики, которые потом уточняются классами.',
            refs: ['Selectors Level 4 (W3C), § 5.1 — type selectors',
                   'CSS Cascading and Inheritance Level 5 (W3C) — специфичность'] } ] },
        { t: 'row', items: [
          { t: 'text', text: 'Единственный блок с id="menu"', cls: 'b-small' },
          { t: 'slot', id: 'c2-id', answer: 's-id', ph: 'селектор',
            hint: 'Выбор по идентификатору',
            explain: '<code>#menu</code> — селектор идентификатора. Значение <code>id</code> должно быть уникальным ' +
              'в пределах документа, поэтому селектор выбирает ровно один элемент. ' +
              'Его специфичность 1-0-0 — выше любого сочетания классов, и перебить такое правило ' +
              'трудно. Для оформления обычно используют классы, а <code>id</code> оставляют ' +
              'для якорных ссылок, атрибута <code>for</code> у подписей и обращения из скриптов.',
            refs: ['Selectors Level 4 (W3C), § 6.7 — ID selectors',
                   'CSS Cascading and Inheritance Level 5 (W3C) — специфичность'] } ] },
        { t: 'row', items: [
          { t: 'text', text: 'Все кнопки с классом btn', cls: 'b-small' },
          { t: 'slot', id: 'c2-class', answer: 's-class', ph: 'селектор',
            hint: 'Выбор по классу',
            explain: '<code>.btn</code> — селектор класса. Один класс можно повесить на любое число элементов, ' +
              'а одному элементу — назначить несколько классов через пробел. Специфичность 0-1-0. ' +
              'Это основной инструмент оформления: он не привязан ни к имени тега, ни к месту ' +
              'в дереве документа, поэтому вёрстку можно менять, не переписывая стили.',
            refs: ['Selectors Level 4 (W3C), § 6.6 — class selectors'] } ] },
        { t: 'row', items: [
          { t: 'text', text: 'Ссылка в момент наведения курсора', cls: 'b-small' },
          { t: 'slot', id: 'c2-hover', answer: 's-hover', ph: 'селектор',
            hint: 'Псевдокласс состояния',
            explain: '<code>a:hover</code> — псевдокласс состояния: правило действует, пока указатель находится ' +
              'над элементом. На устройствах с сенсорным экраном такого состояния фактически нет, ' +
              'поэтому важное поведение на него завязывать нельзя. Псевдоклассы ссылок пишут ' +
              'в порядке <code>:link</code>, <code>:visited</code>, <code>:hover</code>, ' +
              '<code>:active</code> — иначе более поздние правила перекроют предыдущие. ' +
              'Наведение всегда дублируют состоянием <code>:focus-visible</code> для клавиатуры.',
            refs: ['Selectors Level 4 (W3C), § 9 — user action pseudo-classes',
                   'WCAG 2.2, критерий успеха 2.4.7 — Focus Visible'] } ] },
        { t: 'row', items: [
          { t: 'text', text: 'Только те абзацы, что лежат внутри .card', cls: 'b-small' },
          { t: 'slot', id: 'c2-desc', answer: 's-desc', ph: 'селектор',
            hint: 'Вложенность через пробел',
            explain: '<code>.card p</code> — комбинатор потомка: пробел означает «любой абзац внутри .card», ' +
              'на любой глубине вложенности. Если нужен только непосредственный ребёнок, ' +
              'берут <code>&gt;</code>. Специфичность складывается из частей — здесь 0-1-1. ' +
              'Браузер разбирает такие селекторы справа налево, поэтому длинные цепочки ' +
              'и дороже в разборе, и хрупче при изменении вёрстки.',
            refs: ['Selectors Level 4 (W3C), § 15 — combinators',
                   'Selectors Level 4, § 15.1 — descendant combinator'] } ] },
        { t: 'row', items: [
          { t: 'text', text: 'Первый пункт в каждом списке', cls: 'b-small' },
          { t: 'slot', id: 'c2-first', answer: 's-first', ph: 'селектор',
            hint: 'Псевдокласс позиции',
            explain: '<code>li:first-child</code> — структурный псевдокласс: элемент, стоящий первым среди ' +
              'детей своего родителя. Важно, что условие проверяется по всем детям, а не только ' +
              'по элементам того же типа: если перед списком внутри того же родителя окажется ' +
              'другой элемент, правило не сработает — для такого случая есть ' +
              '<code>:first-of-type</code>. Родственные псевдоклассы: <code>:last-child</code>, ' +
              '<code>:nth-child()</code>.',
            refs: ['Selectors Level 4 (W3C), § 10 — structural pseudo-classes'] } ] },
        { t: 'row', items: [
          { t: 'text', text: 'Текстовые поля ввода (но не чекбоксы)', cls: 'b-small' },
          { t: 'slot', id: 'c2-attr', answer: 's-attr', ph: 'селектор',
            hint: 'Выбор по атрибуту',
            explain: '<code>input[type="text"]</code> — селектор атрибута: отбирает только поля с указанным ' +
              'значением, не задевая чекбоксы, переключатели и кнопки. Кроме точного совпадения ' +
              'есть проверки по началу строки (<code>^=</code>), по окончанию (<code>$=</code>) ' +
              'и по вхождению подстроки (<code>*=</code>). Специфичность такая же, как у класса, — 0-1-0. ' +
              'Значения атрибутов по умолчанию сравниваются с учётом регистра.',
            refs: ['Selectors Level 4 (W3C), § 6.2 — attribute selectors'] } ] }
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
            explain: '<code>display: flex</code> превращает элемент во флекс-контейнер: его прямые дети становятся ' +
              'флекс-элементами и выстраиваются вдоль главной оси. Без этой строки остальные ' +
              'флекс-свойства просто не действуют. У детей при этом перестают работать ' +
              '<code>float</code>, <code>clear</code> и <code>vertical-align</code>, ' +
              'а вертикальные отступы больше не схлопываются. Сам контейнер остаётся блочным ' +
              'элементом в общем потоке; <code>inline-flex</code> делает его строчным.',
            refs: ['CSS Flexible Box Layout Module Level 1 (W3C), § 3 — flex containers',
                   'CSS Flexible Box Layout Module Level 1, § 4 — flex items'] },
          { t: 'text', text: ': flex;' }, { t: 'text', text: '                    /* включаем флексбокс */', cls: 'b-comment' } ] },
        { t: 'line', items: [ { t: 'text', text: '  ' }, { t: 'slot', id: 'c3-dir', answer: 'f-dir', ph: 'свойство', w: 180,
            hint: 'Направление главной оси',
            explain: '<code>flex-direction</code> задаёт направление главной оси: <code>row</code> — в строку ' +
              'по направлению письма, <code>column</code> — в столбец, варианты с ' +
              '<code>-reverse</code> разворачивают порядок. Свойство определяет, какая ось ' +
              'считается главной, а какая поперечной, и тем самым меняет смысл ' +
              '<code>justify-content</code> и <code>align-items</code>. ' +
              'Визуальный порядок при этом расходится с порядком в разметке — навигация ' +
              'с клавиатуры по-прежнему идёт по разметке.',
            refs: ['CSS Flexible Box Layout Module Level 1 (W3C), § 5.1 — flex-direction',
                   'WCAG 2.2, критерий успеха 1.3.2 — Meaningful Sequence'] },
          { t: 'text', text: ': row;' }, { t: 'text', text: '                     /* элементы в строку */', cls: 'b-comment' } ] },
        { t: 'line', items: [ { t: 'text', text: '  ' }, { t: 'slot', id: 'c3-justify', answer: 'f-justify', ph: 'свойство', w: 180,
            hint: 'Распределение вдоль строки',
            explain: '<code>justify-content</code> распределяет элементы вдоль главной оси и работает со свободным ' +
              'местом, оставшимся после их раскладки. <code>space-between</code> прижимает крайние ' +
              'элементы к краям, а промежутки между остальными делает равными; ' +
              '<code>space-around</code> и <code>space-evenly</code> распределяют место иначе. ' +
              'Если свободного места нет, свойство ничего не изменит.',
            refs: ['CSS Box Alignment Module Level 3 (W3C), § 8 — justify-content',
                   'CSS Flexible Box Layout Module Level 1 (W3C), § 8.2 — выравнивание по главной оси'] },
          { t: 'text', text: ': space-between;' }, { t: 'text', text: '  /* по краям, промежутки поровну */', cls: 'b-comment' } ] },
        { t: 'line', items: [ { t: 'text', text: '  ' }, { t: 'slot', id: 'c3-align', answer: 'f-align', ph: 'свойство', w: 180,
            hint: 'Выравнивание поперёк строки',
            explain: '<code>align-items</code> выравнивает элементы по поперечной оси — при строке это вертикаль. ' +
              'Значение по умолчанию <code>stretch</code> растягивает их на всю высоту строки, ' +
              'поэтому колонки разной длины выглядят одинаково высокими; <code>center</code> ' +
              'центрирует по высоте, <code>baseline</code> выравнивает по базовой линии текста. ' +
              'Отдельному элементу выравнивание переопределяют свойством <code>align-self</code>.',
            refs: ['CSS Box Alignment Module Level 3 (W3C), § 6 — align-items и align-self',
                   'CSS Flexible Box Layout Module Level 1 (W3C), § 8.3 — выравнивание по поперечной оси'] },
          { t: 'text', text: ': center;' }, { t: 'text', text: '                  /* по центру по вертикали */', cls: 'b-comment' } ] },
        { t: 'line', items: [ { t: 'text', text: '  ' }, { t: 'slot', id: 'c3-gap', answer: 'f-gap', ph: 'свойство', w: 180,
            hint: 'Расстояние между элементами',
            explain: '<code>gap</code> задаёт промежутки между элементами — сокращение для ' +
              '<code>row-gap</code> и <code>column-gap</code>. В отличие от отступов через ' +
              '<code>margin</code>, промежуток появляется только между элементами и не добавляется ' +
              'по внешним краям контейнера, поэтому не нужны приёмы вроде ' +
              '<code>:last-child { margin: 0 }</code>. Свойство работает и во флексбоксе, ' +
              'и в гриде, и в многоколоночной вёрстке.',
            refs: ['CSS Box Alignment Module Level 3 (W3C), § 8.3 — gap, row-gap, column-gap'] },
          { t: 'text', text: ': 12px;' }, { t: 'text', text: '                     /* просвет между кнопками */', cls: 'b-comment' } ] },
        { t: 'line', items: [ { t: 'text', text: '  ' }, { t: 'slot', id: 'c3-wrap', answer: 'f-wrap', ph: 'свойство', w: 180,
            hint: 'Разрешение переноса',
            explain: '<code>flex-wrap</code> разрешает перенос: по умолчанию стоит <code>nowrap</code>, ' +
              'и элементы сжимаются, лишь бы уместиться в одну строку, вплоть до нечитаемого вида. ' +
              'Со значением <code>wrap</code> не поместившиеся переходят на следующую строку, ' +
              'и контейнер становится многострочным — только тогда начинает работать ' +
              '<code>align-content</code>. Это основной способ сделать раскладку пригодной ' +
              'для узких экранов.',
            refs: ['CSS Flexible Box Layout Module Level 1 (W3C), § 5.2 — flex-wrap',
                   'CSS Box Alignment Module Level 3 (W3C), § 7 — align-content',
                   'WCAG 2.2, критерий успеха 1.4.10 — Reflow'] },
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
