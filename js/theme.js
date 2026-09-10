/* ==========================================================================
   Светлая и тёмная тема. По умолчанию светлая; выбор запоминается.
   Скрипт подключается до отрисовки, чтобы страница не мигала.
   ========================================================================== */

window.Theme = (function () {
  'use strict';

  var KEY = 'sim-trainer-theme';
  var current = 'light';

  function apply(name) {
    current = (name === 'dark') ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', current);
    try { localStorage.setItem(KEY, current); } catch (e) { /* хранилище недоступно */ }
    updateButtons();
  }

  function toggle() { apply(current === 'dark' ? 'light' : 'dark'); }

  function updateButtons() {
    var dark = current === 'dark';
    var buttons = document.querySelectorAll('.theme-toggle');
    for (var i = 0; i < buttons.length; i++) {
      buttons[i].setAttribute('aria-pressed', dark ? 'true' : 'false');
      buttons[i].setAttribute('title', dark ? 'Включить светлую тему' : 'Включить тёмную тему');
    }
  }

  /* Раннее применение: до первой отрисовки, ещё без кнопок в разметке */
  var saved = null;
  try { saved = localStorage.getItem(KEY); } catch (e) { /* приватный режим */ }
  current = (saved === 'dark') ? 'dark' : 'light';
  document.documentElement.setAttribute('data-theme', current);

  return {
    apply: apply,
    toggle: toggle,
    get: function () { return current; },
    bind: function () {
      var buttons = document.querySelectorAll('.theme-toggle');
      for (var i = 0; i < buttons.length; i++) {
        buttons[i].addEventListener('click', toggle);
      }
      updateButtons();
    }
  };
})();
