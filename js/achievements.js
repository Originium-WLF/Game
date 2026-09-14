/* ==========================================================================
   Достижения

   Условия привязаны к реальным событиям тренажёра, а не к абстрактным
   счётчикам: за чистое прохождение, за серию верных реквизитов, за
   конкретные реквизиты, которые студент научился ставить.

   Порядок в списке — порядок на экране профиля: сначала то, что получают
   в первые минуты, затем редкое.
   ========================================================================== */

window.Achievements = (function () {
  'use strict';

  var LIST = [
    { id: 'first-doc',  icon: '📄', name: 'Первый документ',
      how: 'Завершить любой уровень' },

    { id: 'clean-one',  icon: '🎯', name: 'Чисто сработано',
      how: 'Пройти уровень без единой ошибки' },

    { id: 'streak-5',   icon: '🔥', name: 'Пять подряд',
      how: 'Поставить подряд пять верных реквизитов, ни разу не ошибившись' },

    { id: 'night',      icon: '🌙', name: 'Ночная смена',
      how: 'Переключиться на тёмную тему' },

    { id: 'reviewed-10',icon: '📚', name: 'Работа над ошибками',
      how: 'Разобрать десять ошибок в журнале — ошибаться не стыдно' },

    { id: 'curious',    icon: '📖', name: 'Любознательный',
      how: 'Открыть подсказку по теме на десяти разных уровнях' },

    { id: 'persistent', icon: '🔁', name: 'Не сдаюсь',
      how: 'Пять раз начать уровень заново кнопкой «Сначала»' },

    { id: 'fast',       icon: '⏱️', name: 'Скорая регистрация',
      how: 'Пройти уровень без ошибок быстрее чем за минуту' },

    { id: 'comeback',   icon: '🌅', name: 'Второе дыхание',
      how: 'Пройти начисто уровень, на котором раньше ошибался' },

    { id: 'sign-5',     icon: '🖋️', name: 'Твёрдая подпись',
      how: 'Пять раз верно поставить реквизит 22 «Подпись»' },

    { id: 'seal',       icon: '🔴', name: 'Печать поставлена',
      how: 'Верно поставить реквизит 24 «Печать»' },

    { id: 'no-hint',    icon: '🧠', name: 'Наизусть',
      how: 'Пройти уровень без ошибок, ни разу не открыв подсказку по теме' },

    { id: 'clean-3',    icon: '💎', name: 'Три подряд',
      how: 'Пройти без ошибок три уровня подряд' },

    { id: 'grade-5x5',  icon: '🏅', name: 'Отличник',
      how: 'Получить пятёрку на пяти уровнях' },

    { id: 'blank',      icon: '🏢', name: 'Мастер бланка',
      how: 'Верно поставить герб (01), эмблему (02) и должность лица (07)' },

    { id: 'incoming',   icon: '📨', name: 'Входящий обработан',
      how: 'Верно поставить все отметки получателя: 27, 28, 29 и 30' },

    { id: 'certify',    icon: '✍️', name: 'Все виды удостоверения',
      how: 'Верно поставить подпись (22), отметку об электронной подписи (23) и отметку о заверении копии (26)' },

    { id: 'half',       icon: '🗂️', name: 'Половина пути',
      how: 'Пройти без ошибок шесть уровней' },

    { id: 'half-hour',  icon: '⏳', name: 'Полчаса практики',
      how: 'Провести в уровнях суммарно тридцать минут' },

    { id: 'lightning',  icon: '⚡', name: 'Молния',
      how: 'Пройти уровень без ошибок быстрее чем за тридцать секунд' },

    { id: 'clean-6',    icon: '💯', name: 'Идеальная серия',
      how: 'Пройти без ошибок шесть уровней подряд' },

    { id: 'full',       icon: '🏛️', name: 'Полный формуляр',
      how: 'Пройти без ошибок все двенадцать уровней' }
  ];

  var byId = {};
  LIST.forEach(function (a) { byId[a.id] = a; });

  var popupEl = null;
  var queue = [];
  var showing = false;

  function init(el) { popupEl = el; }

  /**
   * Выдаёт достижение, если его ещё нет.
   * @returns {boolean} true, если достижение выдано именно сейчас
   */
  function grant(id) {
    if (!byId[id]) return false;
    if (!Store.addAchievement(id)) return false;   // уже было
    queue.push(byId[id]);
    pump();
    return true;
  }

  /* ------------------------- всплывающее окно ----------------------- */

  function pump() {
    if (showing || !queue.length || !popupEl) return;
    showing = true;

    var a = queue.shift();
    popupEl.innerHTML = '';

    var icon = document.createElement('span');
    icon.className = 'ach-pop__icon';
    icon.textContent = a.icon;

    var body = document.createElement('span');
    body.className = 'ach-pop__body';

    var label = document.createElement('span');
    label.className = 'ach-pop__label';
    label.textContent = 'Достижение получено';

    var name = document.createElement('span');
    name.className = 'ach-pop__name';
    name.textContent = a.name;

    body.appendChild(label);
    body.appendChild(name);
    popupEl.appendChild(icon);
    popupEl.appendChild(body);

    popupEl.hidden = false;
    void popupEl.offsetWidth;                      // перезапуск анимации
    popupEl.classList.add('is-visible');

    /* Когда достижений выдано сразу несколько, показываем каждое короче —
       иначе очередь из пяти растянется на двадцать секунд. */
    var hold = queue.length ? 2400 : 4200;

    window.setTimeout(function () {
      popupEl.classList.remove('is-visible');
      window.setTimeout(function () {
        popupEl.hidden = true;
        showing = false;
        pump();                                    // следующее из очереди
      }, 340);
    }, hold);
  }

  /* --------------------------- события ------------------------------ */

  /** Верно поставленный реквизит: серия, «именные» и «собери все» достижения */
  function onCorrect(streak, cardTag) {
    if (streak >= 5) grant('streak-5');

    var num = (cardTag || '').slice(0, 2);
    if (!/^\d\d$/.test(num)) return;              // у карточек-частей текста номера нет

    Store.addToSet('reqs', num);

    if (num === '22' && Store.bumpStat('signs') >= 5) grant('sign-5');
    if (num === '24') grant('seal');

    if (Store.hasAllInSet('reqs', ['01', '02', '07'])) grant('blank');
    if (Store.hasAllInSet('reqs', ['27', '28', '29', '30'])) grant('incoming');
    if (Store.hasAllInSet('reqs', ['22', '23', '26'])) grant('certify');
  }

  /** Перезапуск уровня кнопкой «Сначала» */
  function onRestart() {
    if (Store.bumpStat('restarts') >= 5) grant('persistent');
  }

  /** Ошибка попала в разбор */
  function onMistakeLogged() {
    if (Store.bumpStat('reviewed') >= 10) grant('reviewed-10');
  }

  /**
   * Итог уровня.
   * @param {{levelId:string, clean:boolean, seconds:number,
   *          theoryOpened:boolean, hadMistakesBefore:boolean,
   *          gradeFives:number, cleared:number, total:number}} r
   */
  function onLevelDone(r) {
    grant('first-doc');

    if (Store.bumpStat('seconds', r.seconds) >= 30 * 60) grant('half-hour');
    if (r.theoryOpened && Store.addToSet('theory', r.levelId) >= 10) grant('curious');
    if (r.gradeFives >= 5) grant('grade-5x5');

    if (!r.clean) {
      Store.setStat('cleanStreak', 0);
      return;
    }

    grant('clean-one');
    if (r.seconds < 60) grant('fast');
    if (r.seconds < 30) grant('lightning');
    if (!r.theoryOpened) grant('no-hint');
    if (r.hadMistakesBefore) grant('comeback');

    var streak = Store.bumpStat('cleanStreak');
    if (streak >= 3) grant('clean-3');
    if (streak >= 6) grant('clean-6');

    if (r.cleared >= 6) grant('half');
    if (r.cleared >= r.total) grant('full');
  }

  function onDarkTheme() { grant('night'); }

  /* ---------------------------------------------------------------- */

  return {
    LIST: LIST,
    init: init,
    grant: grant,
    earned: function () { return Store.getAchievements(); },
    count: function () { return Object.keys(Store.getAchievements()).length; },
    onCorrect: onCorrect,
    onRestart: onRestart,
    onMistakeLogged: onMistakeLogged,
    onLevelDone: onLevelDone,
    onDarkTheme: onDarkTheme
  };
})();
