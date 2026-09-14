/* ==========================================================================
   Приложение: экраны, навигация, итоги
   ========================================================================== */

(function () {
  'use strict';

  var TOPIC = window.TOPIC_DOCS;

  /* Фотография разработчика. Файла может не быть — тогда показываем инициалы.
     Кадрирование «лицо и плечи» и круглая рамка делаются стилями. */
  var DEV_PHOTO = 'img/developer.jpg';
  var DEV_NAME  = 'Павлов Богдан Иванович';

  var $ = function (id) { return document.getElementById(id); };

  var ui = {
    topbar:      $('topbar'),
    topbarTitle: $('topbar-title'),
    back:        $('btn-back'),
    logout:      $('btn-logout'),
    userName:    $('user-name'),
    userAvatar:  $('user-avatar'),

    screens: {
      welcome: $('screen-welcome'),
      levels:  $('screen-levels'),
      game:    $('screen-game'),
      result:  $('screen-result')
    },

    loginForm: $('form-login'),
    nameInput: $('input-name'),
    nameError: $('name-error'),
    greeting:  $('greeting'),

    levelsSub:  $('levels-sub'),
    levelsGrid: $('levels-grid'),
    overall:    $('overall'),

    result: $('result')
  };

  /* Уровень засчитывается и открывает следующий только при прохождении
     без единой ошибки. Оценка ниже пятёрки следующий уровень не открывает. */
  function isCleared(levelId) {
    var r = Store.getResult(levelId);
    return !!r && r.mistakes === 0;
  }

  /** Первый уровень открыт всегда, остальные — после чистого прохождения предыдущего */
  function isUnlocked(index) {
    return index === 0 || isCleared(TOPIC.levels[index - 1].id);
  }

  var current = { level: null, index: 0, lastResult: null };

  /* ============================ ЭКРАНЫ ============================ */

  function show(name, title) {
    Object.keys(ui.screens).forEach(function (k) {
      ui.screens[k].classList.toggle('is-active', k === name);
    });
    ui.topbar.hidden = (name === 'welcome');
    ui.back.hidden = (name === 'levels');          // список уровней — главный экран
    if (title) ui.topbarTitle.textContent = title;
    scrollToTop();
  }

  /**
   * Возврат к началу страницы при смене экрана.
   *
   * Словарную форму window.scrollTo({ top, behavior }) часть мобильных
   * браузеров не поддерживает и молча ничего не делает, поэтому используем
   * позиционный вызов и дополнительно сбрасываем scrollTop: на iOS
   * прокручивается documentElement, в старых WebView — body.
   * Сброс повторяем в следующем кадре, когда новый экран уже разложен.
   */
  function scrollToTop() {
    var reset = function () {
      window.scrollTo(0, 0);
      if (document.documentElement) document.documentElement.scrollTop = 0;
      if (document.body) document.body.scrollTop = 0;
    };
    reset();
    window.requestAnimationFrame(reset);
  }

  /* Из игры и с экрана результата возвращаемся к списку уровней */
  ui.back.addEventListener('click', openLevels);

  /* ============================ ВХОД ============================== */

  ui.loginForm.addEventListener('submit', function (e) {
    e.preventDefault();
    var name = ui.nameInput.value.trim();
    if (name.length < 2) {
      ui.nameError.textContent = 'Введите имя — минимум 2 символа.';
      ui.nameInput.focus();
      return;
    }
    ui.nameError.textContent = '';
    Store.setName(name);
    applyUser(name);
    openLevels();
  });

  ui.nameInput.addEventListener('input', function () { ui.nameError.textContent = ''; });

  ui.logout.addEventListener('click', function () {
    if (!window.confirm('Выйти и очистить сохранённый прогресс?')) return;
    Store.reset();
    ui.nameInput.value = '';
    show('welcome');
    ui.nameInput.focus();
  });

  function applyUser(name) {
    ui.userName.textContent = name;
    ui.userAvatar.textContent = name.charAt(0).toUpperCase();
    ui.greeting.textContent = 'Привет, ' + name + '!';
  }

  /* ============================ УРОВНИ ============================ */

  function openLevels() {
    renderLevels();
    show('levels', 'Уровни');
  }

  function renderLevels() {
    ui.levelsSub.textContent = TOPIC.desc;
    ui.levelsGrid.innerHTML = '';

    TOPIC.levels.forEach(function (level, i) {
      ui.levelsGrid.appendChild(levelCard(level, i));
    });

    renderOverall();

    /* Перерисовываем список при каждом возврате — старую карточку убираем,
       иначе она добавлялась бы заново на каждый заход */
    var oldDev = ui.screens.levels.querySelector('.dev');
    if (oldDev) oldDev.remove();
    if (allCleared()) ui.screens.levels.appendChild(developerCard());
  }

  function levelCard(level, i) {
    var res = Store.getResult(level.id);
    var open = isUnlocked(i);
    var cleared = isCleared(level.id);

    var card = document.createElement('button');
    card.type = 'button';
    card.className = 'level' + (open ? '' : ' is-locked');
    card.disabled = !open;

    var top = document.createElement('div');
    top.className = 'level__top';
    var num = document.createElement('span');
    num.className = 'level__num';
    num.textContent = 'Уровень ' + (i + 1);
    top.appendChild(num);
    top.appendChild(open ? gradeChip(res ? res.grade : null) : lockChip());

    var name = document.createElement('div');
    name.className = 'level__name';
    name.textContent = level.name;

    var desc = document.createElement('p');
    desc.className = 'level__desc';
    desc.textContent = level.desc;

    var meta = document.createElement('div');
    meta.className = 'level__meta';
    meta.textContent = levelStatus(level, i, res, open, cleared);

    card.appendChild(top);
    card.appendChild(name);
    card.appendChild(desc);
    card.appendChild(meta);

    if (cleared) {
      card.classList.add('has-stamp');          // освобождаем место под штамп
      var stamp = document.createElement('span');
      stamp.className = 'passed-stamp';
      stamp.textContent = 'без ошибок';
      card.appendChild(stamp);
    }

    if (open) {
      card.addEventListener('click', function () { openGame(level, i); });
    } else {
      card.title = 'Пройдите уровень ' + i + ' без ошибок, чтобы открыть этот';
    }
    return card;
  }

  /** Строка состояния под описанием уровня */
  function levelStatus(level, i, res, open, cleared) {
    if (!open) return 'Закрыт · откроется, когда уровень ' + i + ' будет пройден без ошибок';
    if (cleared) return res.score + ' из ' + res.max + ' очков';
    if (res) return 'Лучший результат: ' + res.percent + '% · ошибок было ' + res.mistakes +
                    ' — пройди начисто, чтобы открыть следующий';
    return 'Ещё не пройден';
  }

  function lockChip() {
    var chip = document.createElement('span');
    chip.className = 'grade-chip grade-chip--locked';
    chip.textContent = '🔒';
    chip.title = 'Уровень закрыт';
    return chip;
  }

  function renderOverall() {
    var cleared = 0, done = 0, percentSum = 0;
    TOPIC.levels.forEach(function (lvl) {
      var r = Store.getResult(lvl.id);
      if (r) { done++; percentSum += r.percent; }
      if (isCleared(lvl.id)) cleared++;
    });

    ui.overall.innerHTML = '';

    if (!done) {
      ui.overall.textContent = 'Пройди первый уровень — здесь появится твоя оценка.';
      return;
    }

    var percent = Math.round(percentSum / done);

    var chip = document.createElement('div');
    chip.className = 'overall__grade';
    chip.textContent = Game.gradeOf(percent);

    var text = document.createElement('div');
    text.innerHTML = '<b>Итог:</b> пройдено без ошибок ' + cleared + ' из ' +
      TOPIC.levels.length + ' уровней, средний результат ' + percent + '%.';

    ui.overall.appendChild(chip);
    ui.overall.appendChild(text);
  }

  function gradeChip(grade) {
    var chip = document.createElement('span');
    chip.className = 'grade-chip' + (grade ? ' grade-chip--' + grade : '');
    chip.textContent = grade || '—';
    chip.title = grade ? 'Оценка: ' + grade : 'Уровень ещё не пройден';
    return chip;
  }

  /* ============================= ИГРА ============================= */

  function openGame(level, index) {
    current.level = level;
    current.index = index;
    $('hud').style.setProperty('--tc-light', TOPIC.color);
    $('hud').style.setProperty('--tc-dark', TOPIC.colorDark);
    Game.start(TOPIC, level);
    show('game', 'Уровень ' + (index + 1) + ' · ' + level.name);
  }

  /* =========================== РЕЗУЛЬТАТ ========================== */

  function showResult(res) {
    current.lastResult = res;
    var isRecord = Store.saveResult(res.levelId, {
      score: res.score, max: res.max, percent: res.percent,
      grade: res.grade, mistakes: res.mistakes, date: res.date
    });

    ui.result.innerHTML = '';

    /* Уровень зачтён только без единой ошибки — это же открывает следующий */
    var clean = res.mistakes === 0;
    var next = TOPIC.levels[current.index + 1];

    var title, sub;
    if (clean) {
      title = 'Безупречно!';
      sub = next ? 'Уровень зачтён. Следующий уровень открыт.'
                 : 'Уровень зачтён. Это был последний уровень тренажёра.';
    } else {
      title = 'Уровень не зачтён';
      sub = 'Ошибок: ' + res.mistakes + '. Чтобы открыть следующий уровень, ' +
            'пройди этот без единой ошибки — разбор ниже.';
    }

    var head = document.createElement('div');
    head.className = 'result__head';
    var h = document.createElement('h2');
    h.className = 'result__title';
    h.textContent = title;
    var p = document.createElement('p');
    p.className = 'result__sub';
    p.textContent = sub;
    head.appendChild(h);
    head.appendChild(p);
    ui.result.appendChild(head);

    ui.result.appendChild(gradeRing(res));

    if (isRecord) {
      var rec = document.createElement('p');
      rec.className = 'result__record';
      rec.textContent = 'Это твой лучший результат на этом уровне.';
      ui.result.appendChild(rec);
    }

    var stats = document.createElement('div');
    stats.className = 'result__stats';
    stats.appendChild(statBox(res.score + ' / ' + res.max, 'очки'));
    stats.appendChild(statBox(res.percent + '%', 'выполнено'));
    stats.appendChild(statBox(String(res.mistakes), 'ошибок'));
    stats.appendChild(statBox(formatTime(res.seconds), 'время'));
    ui.result.appendChild(stats);

    if (res.review.length) {
      ui.result.appendChild(sectionTitle('Разбор полей, где были ошибки'));
      var list = document.createElement('ul');
      list.className = 'review';
      res.review.forEach(function (item) {
        var li = document.createElement('li');
        li.className = 'review__item';
        li.innerHTML =
          '<span class="review__name">' + escapeHtml(item.name) +
          ' — попыток: ' + item.attempts + '</span>' +
          '<span class="review__note">' + item.explain + '</span>';
        if (item.refs && item.refs.length) li.appendChild(Game.refsBlock(item.refs));
        list.appendChild(li);
      });
      ui.result.appendChild(list);
    } else {
      ui.result.appendChild(sectionTitle('Разбор'));
      var clean = document.createElement('ul');
      clean.className = 'review';
      clean.innerHTML = '<li class="review__item review__item--clean">' +
        '<span class="review__name">Все поля заполнены с первой попытки.</span></li>';
      ui.result.appendChild(clean);
    }

    if (res.traps.length) {
      ui.result.appendChild(sectionTitle('Почему эти карточки сюда не подходят'));
      var traps = document.createElement('ul');
      traps.className = 'review';
      res.traps.forEach(function (t) {
        var li = document.createElement('li');
        li.className = 'review__item';
        li.innerHTML =
          '<span class="review__name">' + escapeHtml(t.tag || t.text) + '</span>' +
          '<span class="review__note">' + escapeHtml(t.note) + '</span>';
        if (t.refs && t.refs.length) li.appendChild(Game.refsBlock(t.refs));
        traps.appendChild(li);
      });
      ui.result.appendChild(traps);
    }

    var actions = document.createElement('div');
    actions.className = 'result__actions';

    var again = button(clean ? 'Пройти заново' : 'Попробовать ещё раз',
                       clean ? 'btn--soft' : 'btn--primary', function () {
      openGame(current.level, current.index);
    });
    actions.appendChild(again);

    if (clean && next) {
      actions.appendChild(button('Следующий уровень →', 'btn--primary', function () {
        openGame(next, current.index + 1);
      }));
    }
    actions.appendChild(button('К уровням', 'btn--ghost', openLevels));

    ui.result.appendChild(actions);

    /* Тренажёр пройден целиком — знакомим студента с автором */
    if (clean && allCleared()) {
      var done = document.createElement('p');
      done.className = 'result__record';
      done.style.marginTop = '26px';
      done.textContent = 'Все ' + TOPIC.levels.length + ' уровней пройдены без ошибок. Поздравляем!';
      ui.result.appendChild(done);
      ui.result.appendChild(developerCard());
    }

    show('result', 'Результат · ' + current.level.name);

    /* Конфетти только за уровень, пройденный без ошибок */
    if (clean) {
      window.setTimeout(function () { Confetti.fire(confettiColors(), 1.5); }, 260);
    }
  }

  /** Кольцо с оценкой: заполнение показывает процент выполнения */
  function gradeRing(res) {
    var R = 66, C = 2 * Math.PI * R;

    var wrap = document.createElement('div');
    wrap.className = 'result__ring';
    wrap.dataset.grade = res.grade;

    var ns = 'http://www.w3.org/2000/svg';
    var svg = document.createElementNS(ns, 'svg');
    svg.setAttribute('width', '150');
    svg.setAttribute('height', '150');
    svg.setAttribute('viewBox', '0 0 150 150');

    var track = document.createElementNS(ns, 'circle');
    track.setAttribute('class', 'result__ring-track');
    track.setAttribute('cx', '75'); track.setAttribute('cy', '75'); track.setAttribute('r', String(R));

    var fill = document.createElementNS(ns, 'circle');
    fill.setAttribute('class', 'result__ring-fill');
    fill.setAttribute('cx', '75'); fill.setAttribute('cy', '75'); fill.setAttribute('r', String(R));
    fill.setAttribute('stroke-dasharray', String(C));
    fill.setAttribute('stroke-dashoffset', String(C));      // старт с пустого кольца

    svg.appendChild(track);
    svg.appendChild(fill);
    wrap.appendChild(svg);

    var inner = document.createElement('div');
    inner.className = 'result__ring-inner';
    inner.innerHTML =
      '<span class="result__grade-num">' + res.grade + '</span>' +
      '<span class="result__grade-label">оценка</span>';
    wrap.appendChild(inner);

    /* заполняем на следующем кадре, чтобы сработал переход */
    window.requestAnimationFrame(function () {
      fill.setAttribute('stroke-dashoffset', String(C * (1 - res.percent / 100)));
    });

    return wrap;
  }

  /** Цвета бумажек: акцент темы плюс нейтральные праздничные */
  function confettiColors() {
    var themed = (Theme.get() === 'dark') ? TOPIC.colorDark : TOPIC.color;
    return [themed, '#5044d4', '#ffc93c', '#1a8a55', '#e8556d', '#3ec2e0'];
  }

  /** Блок «об авторе»: круглое фото, имя и зачем создан ресурс */
  function developerCard() {
    var box = document.createElement('section');
    box.className = 'dev';

    var photo = document.createElement('div');
    photo.className = 'dev__photo';

    var initials = document.createElement('span');
    initials.className = 'dev__initials';
    initials.textContent = 'ПБ';
    initials.setAttribute('aria-hidden', 'true');
    photo.appendChild(initials);

    var img = document.createElement('img');
    img.className = 'dev__img';
    img.src = DEV_PHOTO;
    img.alt = 'Фотография разработчика: ' + DEV_NAME;
    img.loading = 'lazy';
    img.addEventListener('error', function () { img.remove(); });  // файла нет — остаются инициалы
    photo.appendChild(img);

    var body = document.createElement('div');
    body.className = 'dev__body';
    body.innerHTML =
      '<span class="dev__label">Разработчик</span>' +
      '<h3 class="dev__name">' + escapeHtml(DEV_NAME) + '</h3>' +
      '<p class="dev__text">Ресурс создан как электронное средство обучения ' +
      'для отработки практического навыка оформления организационно-распорядительных ' +
      'документов. Перечень из тридцати реквизитов трудно удержать в голове, пока ' +
      'не разложишь их по настоящему бланку руками, — поэтому тренажёр даёт именно ' +
      'практику: студент сам собирает документ, сразу получает разбор каждой ошибки ' +
      'со ссылкой на пункт стандарта, а следующий уровень открывается только после ' +
      'безупречного прохождения предыдущего.</p>';

    box.appendChild(photo);
    box.appendChild(body);
    return box;
  }

  /** Пройдены ли начисто все уровни */
  function allCleared() {
    return TOPIC.levels.every(function (lvl) { return isCleared(lvl.id); });
  }

  function statBox(value, label) {
    var box = document.createElement('div');
    box.className = 'result__stat';
    box.innerHTML = '<b>' + escapeHtml(value) + '</b><span>' + escapeHtml(label) + '</span>';
    return box;
  }

  function sectionTitle(text) {
    var h = document.createElement('h3');
    h.className = 'result__section-title';
    h.textContent = text;
    return h;
  }

  function button(text, cls, handler) {
    var b = document.createElement('button');
    b.type = 'button';
    b.className = 'btn ' + cls;
    b.textContent = text;
    b.addEventListener('click', handler);
    return b;
  }

  function formatTime(sec) {
    var m = Math.floor(sec / 60), s = sec % 60;
    return m ? m + ' мин ' + s + ' с' : s + ' с';
  }

  function escapeHtml(str) {
    return String(str).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  /* ============================ ЗАПУСК ============================ */

  Game.init({
    board:       $('board'),
    bank:        $('bank'),
    dragLayer:   $('drag-layer'),
    toast:       $('toast'),
    theory:      $('theory'),
    theoryBody:  $('theory-body'),
    hudLevel:    $('hud-level'),
    hudTask:     $('hud-task'),
    hudScore:    $('hud-score'),
    hudFilled:   $('hud-filled'),
    hudMistakes: $('hud-mistakes'),
    hudProgress: $('hud-progress'),
    restart:     $('btn-restart'),
    praise:      $('praise'),
    praiseText:  $('praise-text'),
    mistakes:      $('mistakes'),
    mistakesList:  $('mistakes-list'),
    mistakesCount: $('mistakes-count')
  }, showResult);

  Theme.bind();
  Confetti.init($('confetti'));

  var saved = Store.getName();
  if (saved) {
    ui.nameInput.value = saved;
    applyUser(saved);
    openLevels();
  } else {
    show('welcome');
    ui.nameInput.focus();
  }
})();
