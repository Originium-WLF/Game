/* ==========================================================================
   Игровой уровень: отрисовка поля, приём карточек, подсчёт очков
   ========================================================================== */

window.Game = (function () {
  'use strict';

  /* Очки за поле в зависимости от номера попытки */
  var POINTS = [100, 60, 30, 10];

  /* Хвалим за каждый верный реквизит: студенту важно видеть, что он молодец */
  var PRAISE = [
    'Правильно, молодец!',
    'Верно! Отличная работа',
    'Молодец, точно на месте!',
    'Так держать!',
    'В точку! Молодец',
    'Верно! Хорошо разбираешься'
  ];

  /* Ошибка — не приговор: подбадриваем и зовём попробовать снова */
  var ENCOURAGE = [
    'Неправильно — попробуй ещё!',
    'Пока мимо. Попробуй ещё раз!',
    'Не тот реквизит — не сдавайся, пробуй!',
    'Неверно. Ещё попытка — у тебя получится!',
    'Мимо — попробуй другую карточку!'
  ];

  var praiseAt = 0, encourageAt = 0;

  function nextPraise()    { return PRAISE[praiseAt++ % PRAISE.length]; }
  function nextEncourage() { return ENCOURAGE[encourageAt++ % ENCOURAGE.length]; }
  var MAX_PER_SLOT = POINTS[0];

  var el = {};            // ссылки на DOM
  var state = null;
  var onFinish = function () {};
  var busy = false;       // блокировка на время анимации ошибки

  /* ---------------------------------------------------------------- */

  function init(refs, finishHandler) {
    el = refs;
    onFinish = finishHandler;
    DragDrop.init(el.dragLayer, handleDrop);
    el.restart.addEventListener('click', function () { start(state.topic, state.level); });

    /* Достижение «Наизусть» требует пройти уровень, не заглядывая в подсказку */
    el.theory.addEventListener('toggle', function () {
      if (el.theory.open && state) state.theoryOpened = true;
    });
  }

  /* ------------------------------ старт ---------------------------- */

  function start(topic, level) {
    busy = false;
    DragDrop.clearPick();

    state = {
      topic: topic,
      level: level,
      slots: {},
      score: 0,
      solved: 0,
      total: 0,
      mistakes: 0,
      unusedWrong: {},        // id лишних карточек, которые пытались поставить
      logged: {},             // уже разобранные пары «карточка + поле»
      logCount: 0,
      streak: 0,              // подряд верных реквизитов
      theoryOpened: false,    // открывал ли студент подсказку по теме
      startedAt: Date.now()
    };

    resetMistakes();
    resetPraise();

    el.hudLevel.textContent = level.name;
    el.hudTask.textContent = level.task;
    el.theoryBody.innerHTML = level.theory;
    el.theory.open = false;

    renderBoard(level);
    renderBank(level);
    updateHud();
  }

  /* ---------------------------- отрисовка -------------------------- */

  function renderBoard(level) {
    var board = el.board;
    board.className = 'board board--' + level.boardType;
    board.innerHTML = '';
    level.blocks.forEach(function (block) { board.appendChild(buildBlock(block)); });
  }

  function buildBlock(block) {
    switch (block.t) {

      case 'text': {
        var p = document.createElement('p');
        p.className = 'b-text ' + (block.cls || '');
        p.textContent = block.text;
        return p;
      }

      case 'spacer': {
        var s = document.createElement('div');
        s.className = 'b-spacer';
        return s;
      }

      case 'rule':
        return document.createElement('hr');

      case 'row': {
        var row = document.createElement('div');
        row.className = 'b-row ' + (block.cls || '');
        block.items.forEach(function (it) { row.appendChild(buildBlock(it)); });
        return row;
      }

      case 'block': {
        var g = document.createElement('div');
        g.className = block.cls || '';
        block.items.forEach(function (it) { g.appendChild(buildBlock(it)); });
        return g;
      }

      case 'line': {                       /* строка кода: текст и поля вперемешку */
        var line = document.createElement('div');
        line.className = 'b-code-line';
        block.items.forEach(function (it) {
          if (it.t === 'text') {
            var span = document.createElement('span');
            if (it.cls) span.className = it.cls;
            span.textContent = it.text;
            line.appendChild(span);
          } else {
            line.appendChild(buildBlock(it));
          }
        });
        if (!block.items.length) line.innerHTML = '&nbsp;';
        return line;
      }

      case 'slot':
        return buildSlot(block);
    }
    return document.createTextNode('');
  }

  function buildSlot(def) {
    var slot = document.createElement('div');
    slot.className = 'slot';
    slot.dataset.slotId = def.id;
    slot.setAttribute('tabindex', '0');
    slot.setAttribute('role', 'button');
    slot.setAttribute('aria-label', 'Пустое поле: ' + def.ph);
    if (def.w) slot.style.minWidth = def.w + 'px';

    var ph = document.createElement('span');
    ph.className = 'slot__placeholder';
    ph.textContent = def.ph;
    slot.appendChild(ph);

    state.slots[def.id] = {
      el: slot,
      def: def,
      answer: def.answer,
      attempts: 0,
      solved: false
    };
    state.total++;

    DragDrop.bindSlot(slot);
    return slot;
  }

  function renderBank(level) {
    el.bank.innerHTML = '';
    shuffle(level.cards.slice()).forEach(function (def) {
      el.bank.appendChild(buildCard(def, state.topic));
    });
  }

  function buildCard(def, topic) {
    var card = document.createElement('div');
    card.className = 'card' + (def.code ? ' card--code' : '');
    card.dataset.cardId = def.id;
    card.setAttribute('tabindex', '0');
    card.setAttribute('role', 'button');
    card.setAttribute('aria-pressed', 'false');
    card.style.setProperty('--tc-light', topic.color);
    card.style.setProperty('--tc-dark', topic.colorDark || topic.color);

    if (def.tag) {
      var tag = document.createElement('span');
      tag.className = 'card__tag';
      tag.textContent = def.tag;
      card.appendChild(tag);
    }
    var text = document.createElement('span');
    text.className = 'card__text';
    text.textContent = def.text;
    card.appendChild(text);

    card._def = def;
    DragDrop.bindCard(card);
    return card;
  }

  /* ------------------------- приём карточки ------------------------ */

  function handleDrop(card, slot) {
    if (busy || !card || !slot) return;
    var st = state.slots[slot.dataset.slotId];
    if (!st || st.solved) return;

    st.attempts++;

    if (card.dataset.cardId === st.answer) {
      acceptCard(card, slot, st);
    } else {
      rejectCard(card, slot, st);
    }
  }

  function acceptCard(card, slot, st) {
    var earned = POINTS[Math.min(st.attempts - 1, POINTS.length - 1)];
    st.solved = true;
    st.earned = earned;
    state.score += earned;
    state.solved++;

    slot.classList.remove('is-wrong');
    slot.classList.add('is-correct', 'is-locked');
    slot.setAttribute('aria-label', 'Заполнено верно: ' + card._def.text);
    slot.innerHTML = '';

    var content = document.createElement('span');
    content.className = 'slot__content';
    content.textContent = card._def.text;
    slot.appendChild(content);
    slot.appendChild(mark('✓'));

    card.parentNode.removeChild(card);
    checkBankEmpty();

    state.streak++;
    Achievements.onCorrect(state.streak, card._def.tag);

    var phrase = nextPraise();
    showGoodFeedback(phrase, card._def, earned, st.attempts);
    toast(phrase + '  +' + earned, 'good');
    updateHud();

    if (state.solved === state.total) {
      window.setTimeout(finish, 700);
    }
  }

  function rejectCard(card, slot, st) {
    busy = true;
    state.mistakes++;
    state.streak = 0;
    if (card._def.note) state.unusedWrong[card._def.id] = card._def;

    var backup = slot.innerHTML;
    slot.classList.add('is-wrong');
    slot.innerHTML = '';

    var content = document.createElement('span');
    content.className = 'slot__content';
    content.textContent = card._def.text;
    slot.appendChild(content);
    slot.appendChild(mark('✕'));

    card.classList.add('is-flying');
    logMistake(card._def, st);

    var phrase = nextEncourage();
    showBadFeedback(phrase, card._def);
    toast(phrase, 'bad');
    updateHud();

    window.setTimeout(function () {
      slot.classList.remove('is-wrong');
      slot.innerHTML = backup;
      card.classList.remove('is-flying');
      busy = false;
    }, 950);
  }

  function mark(sign) {
    var m = document.createElement('span');
    m.className = 'slot__mark';
    m.textContent = sign;
    return m;
  }

  function checkBankEmpty() {
    if (el.bank.children.length === 0) {
      var empty = document.createElement('div');
      empty.className = 'bank__empty';
      empty.textContent = 'Все карточки разложены.';
      el.bank.appendChild(empty);
    }
  }

  /* ------------------------ обратная связь -------------------------- */

  function resetPraise() {
    el.feedback.hidden = true;
    el.feedbackText.textContent = '';
    praiseAt = 0;
    encourageAt = 0;
  }

  /** Зелёная полоса: что именно студент поставил верно */
  function showGoodFeedback(phrase, cardDef, earned, attempts) {
    /* «со» нужно только перед «второй»: со второй, но с третьей, с четвёртой */
    var tail = (attempts === 1) ? ' с первой попытки'
             : (attempts === 2) ? ' со второй попытки'
             : ' с ' + attempts + '-й попытки';
    showFeedback('good', '✓', phrase,
      ' «' + (cardDef.tag || cardDef.text) + '» на своём месте' + tail +
      '. +' + earned + ' очков.');
  }

  /** Красная полоса: ободряем и зовём попробовать снова */
  function showBadFeedback(phrase, cardDef) {
    showFeedback('bad', '✕', phrase,
      ' «' + (cardDef.tag || cardDef.text) + '» в это поле не подходит. ' +
      'Разбор — внизу страницы.');
  }

  function showFeedback(kind, icon, phrase, tail) {
    el.feedback.className = 'feedback feedback--' + kind;
    el.feedbackIcon.textContent = icon;

    el.feedbackText.innerHTML = '';
    var strong = document.createElement('b');
    strong.textContent = phrase;
    el.feedbackText.appendChild(strong);
    el.feedbackText.appendChild(document.createTextNode(tail));

    el.feedback.hidden = false;
    void el.feedback.offsetWidth;               // перезапуск анимации
    el.feedback.classList.add('is-new');
  }

  /* --------------------------- разбор ошибок ----------------------- */

  function resetMistakes() {
    el.mistakes.hidden = true;
    el.mistakesList.innerHTML = '';
    el.mistakesCount.textContent = '0';
  }

  /**
   * Добавляет в панель внизу разбор одной ошибки: что поставили,
   * куда, почему не подходит и что сюда нужно на самом деле.
   */
  function logMistake(cardDef, st) {
    var key = cardDef.id + '>' + st.def.id;

    /* повтор той же пары не плодим — подсвечиваем уже записанный разбор */
    if (state.logged[key]) {
      var old = el.mistakesList.querySelector('[data-key="' + key + '"]');
      if (old) {
        old.classList.remove('is-repeat');
        void old.offsetWidth;                    // перезапуск анимации
        old.classList.add('is-repeat');
      }
      return;
    }
    state.logged[key] = true;
    state.logCount++;
    Achievements.onMistakeLogged();

    var item = document.createElement('li');
    item.className = 'mis';
    item.dataset.key = key;

    var no = document.createElement('span');
    no.className = 'mis__no';
    no.textContent = state.logCount;

    var body = document.createElement('div');
    body.className = 'mis__body';

    var what = document.createElement('p');
    what.className = 'mis__what';
    what.appendChild(chip(cardDef.tag || cardDef.text));
    what.appendChild(document.createTextNode(' — не подходит в поле '));
    var where = document.createElement('span');
    where.className = 'mis__slot';
    where.textContent = '«' + (st.def.hint || st.def.ph) + '»';
    what.appendChild(where);

    var why = document.createElement('p');
    why.className = 'mis__why';
    why.textContent = reason(cardDef);

    var need = document.createElement('p');
    need.className = 'mis__need';
    need.innerHTML = st.def.explain;

    body.appendChild(what);
    body.appendChild(why);
    body.appendChild(need);

    var refs = mergeRefs(st.def.refs, cardDef.note ? cardDef.refs : null);
    if (refs.length) body.appendChild(refsBlock(refs));

    item.appendChild(no);
    item.appendChild(body);

    el.mistakesList.insertBefore(item, el.mistakesList.firstChild);
    el.mistakesCount.textContent = state.logCount;
    el.mistakes.hidden = false;
  }

  /** Ссылки на пункты стандартов: сначала по полю, затем по самой карточке */
  function mergeRefs(slotRefs, cardRefs) {
    var out = [], seen = {};
    [slotRefs || [], cardRefs || []].forEach(function (list) {
      list.forEach(function (ref) {
        if (!seen[ref]) { seen[ref] = true; out.push(ref); }
      });
    });
    return out;
  }

  function refsBlock(refs) {
    var wrap = document.createElement('div');
    wrap.className = 'refs';

    var label = document.createElement('span');
    label.className = 'refs__label';
    label.textContent = 'Основание';
    wrap.appendChild(label);

    var list = document.createElement('ul');
    list.className = 'refs__list';
    refs.forEach(function (ref) {
      var li = document.createElement('li');
      li.className = 'refs__item';
      li.textContent = ref;
      list.appendChild(li);
    });
    wrap.appendChild(list);
    return wrap;
  }

  function chip(text) {
    var span = document.createElement('span');
    span.className = 'mis__card';
    span.textContent = text;
    return span;
  }

  /** Почему карточка не подходит: либо она лишняя, либо её место в другом поле */
  function reason(cardDef) {
    if (cardDef.note) return cardDef.note;

    var home = homeSlot(cardDef.id);
    if (home) return 'Эта карточка нужна в другом месте — в поле «' + home + '».';
    return 'Эта карточка относится к другому полю.';
  }

  /** Подсказка того поля, которому карточка принадлежит на самом деле */
  function homeSlot(cardId) {
    var ids = Object.keys(state.slots);
    for (var i = 0; i < ids.length; i++) {
      var st = state.slots[ids[i]];
      if (st.answer === cardId) return st.def.hint || st.def.ph;
    }
    return null;
  }

  /* ------------------------------ HUD ------------------------------ */

  function updateHud() {
    el.hudScore.textContent = state.score;
    el.hudFilled.textContent = state.solved + '/' + state.total;
    el.hudMistakes.textContent = state.mistakes;
    el.hudProgress.style.width = (state.total ? (state.solved / state.total) * 100 : 0) + '%';
  }

  /* ---------------------------- завершение ------------------------- */

  function finish() {
    el.toast.className = 'toast';          // убираем всплывающее сообщение с экрана результата
    var max = state.total * MAX_PER_SLOT;
    var percent = max ? Math.round((state.score / max) * 100) : 0;

    var review = [];
    Object.keys(state.slots).forEach(function (id) {
      var st = state.slots[id];
      if (st.attempts > 1) {
        review.push({
          name: st.def.hint || st.def.ph,
          attempts: st.attempts,
          explain: st.def.explain,
          refs: st.def.refs || []
        });
      }
    });

    var traps = Object.keys(state.unusedWrong).map(function (k) { return state.unusedWrong[k]; });

    onFinish({
      topicId: state.topic.id,
      levelId: state.level.id,
      score: state.score,
      max: max,
      percent: percent,
      grade: gradeOf(percent),
      mistakes: state.mistakes,
      slots: state.total,
      seconds: Math.round((Date.now() - state.startedAt) / 1000),
      theoryOpened: state.theoryOpened,
      review: review,
      traps: traps,
      date: new Date().toISOString()
    });
  }

  /** Перевод процента в пятибалльную оценку */
  function gradeOf(percent) {
    if (percent >= 90) return 5;
    if (percent >= 75) return 4;
    if (percent >= 60) return 3;
    return 2;
  }

  /* --------------------------- утилиты ----------------------------- */

  function shuffle(arr) {
    for (var i = arr.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var t = arr[i]; arr[i] = arr[j]; arr[j] = t;
    }
    return arr;
  }

  var toastTimer = null;
  function toast(message, kind) {
    var t = el.toast;
    t.textContent = message;
    t.className = 'toast is-visible' + (kind ? ' is-' + kind : '');
    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(function () { t.className = 'toast'; }, 1600);
  }

  /* ---------------------------------------------------------------- */

  return { init: init, start: start, gradeOf: gradeOf, refsBlock: refsBlock };
})();
