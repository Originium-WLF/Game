/* ==========================================================================
   Хранилище прогресса (localStorage с безопасными заглушками)
   ========================================================================== */

window.Store = (function () {
  'use strict';

  var KEY = 'sim-trainer-v1';

  var empty = { name: '', results: {} };   // results: { 'html-1': {score, max, percent, grade, mistakes, date} }

  function read() {
    try {
      var raw = localStorage.getItem(KEY);
      if (!raw) return clone(empty);
      var data = JSON.parse(raw);
      if (!data || typeof data !== 'object') return clone(empty);
      if (typeof data.name !== 'string') data.name = '';
      if (!data.results || typeof data.results !== 'object') data.results = {};
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

    getAll: function () { return read().results; },

    reset: function () { write(clone(empty)); }
  };
})();
