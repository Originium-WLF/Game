/* ==========================================================================
   Приложение: экраны, навигация, итоги
   ========================================================================== */

(function () {
  'use strict';

  var TOPICS = [window.TOPIC_HTML, window.TOPIC_CSS, window.TOPIC_DOCS];

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
      topics:  $('screen-topics'),
      levels:  $('screen-levels'),
      game:    $('screen-game'),
      result:  $('screen-result')
    },

    loginForm: $('form-login'),
    nameInput: $('input-name'),
    nameError: $('name-error'),
    greeting:  $('greeting'),

    topicsGrid: $('topics-grid'),
    overall:    $('overall'),

    levelsTitle: $('levels-title'),
    levelsSub:   $('levels-sub'),
    levelsGrid:  $('levels-grid'),

    result: $('result')
  };

  /* Уровень считается пройденным начиная с оценки 3. Ниже — конфетти не летит. */
  var PASS_GRADE = 3;

  var current = { topic: null, level: null, lastResult: null };
  var history = [];

  /* ============================ ЭКРАНЫ ============================ */

  function show(name, title) {
    Object.keys(ui.screens).forEach(function (k) {
      ui.screens[k].classList.toggle('is-active', k === name);
    });
    ui.topbar.hidden = (name === 'welcome');
    ui.back.hidden = (name === 'topics');
    if (title) ui.topbarTitle.textContent = title;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function goto(name, title) {
    if (history[history.length - 1] !== name) history.push(name);
    show(name, title);
  }

  ui.back.addEventListener('click', function () {
    var from = history.pop();
    if (from === 'result' || from === 'game') openLevels(current.topic);
    else openTopics();
  });

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
    openTopics();
  });

  ui.nameInput.addEventListener('input', function () { ui.nameError.textContent = ''; });

  ui.logout.addEventListener('click', function () {
    if (!window.confirm('Выйти и очистить сохранённый прогресс?')) return;
    Store.reset();
    ui.nameInput.value = '';
    history = [];
    show('welcome');
    ui.nameInput.focus();
  });

  function applyUser(name) {
    ui.userName.textContent = name;
    ui.userAvatar.textContent = name.charAt(0).toUpperCase();
    ui.greeting.textContent = 'Привет, ' + name + '!';
  }

  /* ========================== ВЫБОР ТЕМЫ ========================== */

  function openTopics() {
    history = ['topics'];
    renderTopics();
    show('topics', 'Выбор темы');
  }

  function renderTopics() {
    ui.topicsGrid.innerHTML = '';

    TOPICS.forEach(function (topic) {
      var st = topicStats(topic);

      var card = document.createElement('button');
      card.type = 'button';
      card.className = 'topic';
      card.style.setProperty('--tc-light', topic.color);
      card.style.setProperty('--tc-dark', topic.colorDark);

      var icon = document.createElement('div');
      icon.className = 'topic__icon';
      icon.textContent = topic.icon;

      var name = document.createElement('div');
      name.className = 'topic__name';
      name.textContent = topic.name;

      var desc = document.createElement('p');
      desc.className = 'topic__desc';
      desc.textContent = topic.desc;

      var bar = document.createElement('div');
      bar.className = 'bar';
      var fill = document.createElement('div');
      fill.className = 'bar__fill';
      fill.style.width = (st.done / st.count * 100) + '%';
      bar.appendChild(fill);

      var foot = document.createElement('div');
      foot.className = 'topic__foot';
      var count = document.createElement('span');
      count.className = 'topic__count';
      count.textContent = 'Пройдено ' + st.done + ' из ' + st.count;
      foot.appendChild(count);
      if (st.done) foot.appendChild(gradeChip(st.grade));

      card.appendChild(icon);
      card.appendChild(name);
      card.appendChild(desc);
      card.appendChild(bar);
      card.appendChild(foot);

      card.addEventListener('click', function () { openLevels(topic); });
      ui.topicsGrid.appendChild(card);
    });

    renderOverall();
  }

  function renderOverall() {
    var done = 0, count = 0, sum = 0;
    TOPICS.forEach(function (t) {
      var s = topicStats(t);
      done += s.done; count += s.count; sum += s.percentSum;
    });

    ui.overall.innerHTML = '';
    if (!done) {
      ui.overall.textContent = 'Пройди уровни — здесь появится итоговая оценка по всем темам.';
      return;
    }

    var percent = Math.round(sum / done);
    var chip = document.createElement('div');
    chip.className = 'overall__grade';
    chip.textContent = Game.gradeOf(percent);

    var text = document.createElement('div');
    text.innerHTML = '<b>Общий результат:</b> пройдено ' + done + ' из ' + count +
      ' уровней, средний результат ' + percent + '%.';

    ui.overall.appendChild(chip);
    ui.overall.appendChild(text);
  }

  function topicStats(topic) {
    var done = 0, percentSum = 0;
    topic.levels.forEach(function (lvl) {
      var r = Store.getResult(lvl.id);
      if (r) { done++; percentSum += r.percent; }
    });
    return {
      done: done,
      count: topic.levels.length,
      percentSum: percentSum,
      grade: done ? Game.gradeOf(Math.round(percentSum / done)) : null
    };
  }

  function gradeChip(grade) {
    var chip = document.createElement('span');
    chip.className = 'grade-chip' + (grade ? ' grade-chip--' + grade : '');
    chip.textContent = grade || '—';
    chip.title = grade ? 'Оценка: ' + grade : 'Уровень ещё не пройден';
    return chip;
  }

  /* ========================= ВЫБОР УРОВНЯ ========================= */

  function openLevels(topic) {
    current.topic = topic;
    history = ['topics', 'levels'];

    ui.levelsTitle.textContent = topic.name;
    ui.levelsSub.textContent = topic.desc;
    ui.levelsGrid.innerHTML = '';

    topic.levels.forEach(function (level, i) {
      var res = Store.getResult(level.id);

      var card = document.createElement('button');
      card.type = 'button';
      card.className = 'level';

      var top = document.createElement('div');
      top.className = 'level__top';
      var num = document.createElement('span');
      num.className = 'level__num';
      num.textContent = 'Уровень ' + (i + 1);
      top.appendChild(num);
      top.appendChild(gradeChip(res ? res.grade : null));

      var name = document.createElement('div');
      name.className = 'level__name';
      name.textContent = level.name;

      var desc = document.createElement('p');
      desc.className = 'level__desc';
      desc.textContent = level.desc;

      var meta = document.createElement('div');
      meta.className = 'level__meta';
      meta.textContent = res
        ? 'Лучший результат: ' + res.score + ' из ' + res.max + ' (' + res.percent + '%)'
        : 'Ещё не пройден';

      card.appendChild(top);
      card.appendChild(name);
      card.appendChild(desc);
      card.appendChild(meta);

      card.addEventListener('click', function () { openGame(topic, level); });
      ui.levelsGrid.appendChild(card);
    });

    show('levels', topic.name);
  }

  /* ============================= ИГРА ============================= */

  function openGame(topic, level) {
    current.topic = topic;
    current.level = level;
    $('hud').style.setProperty('--tc-light', topic.color);
    $('hud').style.setProperty('--tc-dark', topic.colorDark);
    Game.start(topic, level);
    goto('game', topic.name + ' · ' + level.name);
  }

  /* =========================== РЕЗУЛЬТАТ ========================== */

  function showResult(res) {
    current.lastResult = res;
    var isRecord = Store.saveResult(res.levelId, {
      score: res.score, max: res.max, percent: res.percent,
      grade: res.grade, mistakes: res.mistakes, date: res.date
    });

    ui.result.innerHTML = '';

    var passed = res.grade >= PASS_GRADE;

    var praise = {
      5: { title: 'Отлично!',            sub: 'Уровень пройден почти без ошибок.' },
      4: { title: 'Хорошо',              sub: 'Пара неточностей — разбери их ниже.' },
      3: { title: 'Уровень пройден',     sub: 'Основное понятно, но ошибок многовато.' },
      2: { title: 'Уровень не пройден',  sub: 'Открой подсказку по теме и попробуй ещё раз.' }
    }[res.grade];

    var head = document.createElement('div');
    head.className = 'result__head';
    var title = document.createElement('h2');
    title.className = 'result__title';
    title.textContent = praise.title;
    var sub = document.createElement('p');
    sub.className = 'result__sub';
    sub.textContent = praise.sub;
    head.appendChild(title);
    head.appendChild(sub);
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
        traps.appendChild(li);
      });
      ui.result.appendChild(traps);
    }

    var actions = document.createElement('div');
    actions.className = 'result__actions';

    actions.appendChild(button('Пройти заново', 'btn--soft', function () {
      openGame(current.topic, current.level);
    }));

    var next = nextLevel();
    if (next) {
      actions.appendChild(button('Следующий уровень →', 'btn--primary', function () {
        openGame(current.topic, next);
      }));
    } else {
      actions.appendChild(button('К списку тем', 'btn--primary', openTopics));
    }
    actions.appendChild(button('К уровням', 'btn--ghost', function () { openLevels(current.topic); }));

    ui.result.appendChild(actions);

    goto('result', 'Результат: ' + current.level.name);

    /* Конфетти только за пройденный уровень. За двойку не летит ничего. */
    if (passed) {
      window.setTimeout(function () {
        Confetti.fire(confettiColors(current.topic), res.grade === 5 ? 1.5 : 1);
      }, 260);
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
  function confettiColors(topic) {
    var themed = (Theme.get() === 'dark') ? topic.colorDark : topic.color;
    return [themed, '#5044d4', '#ffc93c', '#1a8a55', '#e8556d', '#3ec2e0'];
  }

  function nextLevel() {
    var list = current.topic.levels;
    var i = list.indexOf(current.level);
    return (i >= 0 && i < list.length - 1) ? list[i + 1] : null;
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
    restart:     $('btn-restart')
  }, showResult);

  Theme.bind();
  Confetti.init($('confetti'));

  var saved = Store.getName();
  if (saved) {
    ui.nameInput.value = saved;
    applyUser(saved);
    openTopics();
  } else {
    show('welcome');
    ui.nameInput.focus();
  }
})();
