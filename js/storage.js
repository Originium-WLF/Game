/* ==========================================================================
   Хранилище прогресса (localStorage с безопасными заглушками)
   ========================================================================== */

window.Store = (function () {
  'use strict';

  var KEY = 'sim-trainer-v2';   // v2: другой набор уровней, старый прогресс неприменим

  // results:      { 'doc-prikaz': {score, max, percent, grade, mistakes, date} }
  // achievements: { 'first-doc': '2026-09-14T10:00:00.000Z' }
  // stats:        накопительные счётчики для достижений
  // sets:         множества для достижений вида «собери все» —
  //               'reqs' хранит освоенные номера реквизитов,
  //               'theory' — уровни, где открывали подсказку
  var empty = {
    name: '',
    results: {},
    achievements: {},
    stats: { signs: 0, seals: 0, reviewed: 0, cleanStreak: 0, restarts: 0, seconds: 0 },
    sets: {}
  };

  function read() {
    try {
      var raw = localStorage.getItem(KEY);
      if (!raw) return clone(empty);
      var data = JSON.parse(raw);
      if (!data || typeof data !== 'object') return clone(empty);
      if (typeof data.name !== 'string') data.name = '';
      if (!data.results || typeof data.results !== 'object') data.results = {};
      /* Поля достижений появились позже — дополняем старые записи */
      if (!data.achievements || typeof data.achievements !== 'object') data.achievements = {};
      if (!data.stats || typeof data.stats !== 'object') data.stats = clone(empty.stats);
      Object.keys(empty.stats).forEach(function (k) {
        if (typeof data.stats[k] !== 'number') data.stats[k] = 0;
      });
      if (!data.sets || typeof data.sets !== 'object') data.sets = {};
      return data;
    } catch (e) {
      return clone(empty);
    }
  }

  function write(data) {
    try {
      localStorage.setItem(KEY, JSON.stringify(data));
    } catch (e) {
      /* приватный режим или запрет на хранение — играем без сохранения */
    }
  }

  function clone(o) { return JSON.parse(JSON.stringify(o)); }

  return {
    getName: function () { return read().name; },

    setName: function (name) {
      var d = read();
      d.name = name;
      write(d);
    },

    /** Сохраняем результат уровня, если он лучше предыдущего */
    saveResult: function (levelId, result) {
      var d = read();
      var prev = d.results[levelId];
      if (!prev || result.percent > prev.percent) {
        d.results[levelId] = result;
        write(d);
        return true;                       // новый рекорд
      }
      return false;
    },

    getResult: function (levelId) { return read().results[levelId] || null; },

    /* ----------------------- достижения ------------------------ */

    getAchievements: function () { return read().achievements; },

    hasAchievement: function (id) { return !!read().achievements[id]; },

    /** Записывает достижение. Возвращает false, если оно уже было. */
    addAchievement: function (id) {
      var d = read();
      if (d.achievements[id]) return false;
      d.achievements[id] = new Date().toISOString();
      write(d);
      return true;
    },

    /* --------------- накопительные счётчики --------------------- */

    getStat: function (key) { return read().stats[key] || 0; },

    /** Увеличивает счётчик и возвращает новое значение */
    bumpStat: function (key, by) {
      var d = read();
      d.stats[key] = (d.stats[key] || 0) + (by === undefined ? 1 : by);
      write(d);
      return d.stats[key];
    },

    /* ------------------------ множества ------------------------- */

    /** Добавляет ключ в множество. Возвращает его размер после добавления. */
    addToSet: function (name, key) {
      var d = read();
      if (!d.sets[name]) d.sets[name] = {};
      d.sets[name][key] = true;
      write(d);
      return Object.keys(d.sets[name]).length;
    },

    setSize: function (name) {
      var set = read().sets[name];
      return set ? Object.keys(set).length : 0;
    },

    /** Все ли перечисленные ключи уже есть в множестве */
    hasAllInSet: function (name, keys) {
      var set = read().sets[name] || {};
      return keys.every(function (k) { return !!set[k]; });
    },

    setStat: function (key, value) {
      var d = read();
      d.stats[key] = value;
      write(d);
      return value;
    },

    getAll: function () { return read().results; },

    reset: function () { write(clone(empty)); }
  };
})();
