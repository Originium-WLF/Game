/* ==========================================================================
   Перетаскивание карточек.

   Работает на pointer-событиях, поэтому одинаково ведёт себя с мышью,
   пальцем и стилусом. Дополнительно поддержаны два способа без перетаскивания:
     • клик по карточке, затем клик по полю;
     • клавиатура: Enter/Пробел на карточке, затем Enter/Пробел на поле.
   ========================================================================== */

window.DragDrop = (function () {
  'use strict';

  var THRESHOLD = 6;                       // сдвиг в px, после которого это уже перетаскивание

  var layer   = null;
  var onDrop  = function () {};
  var picked  = null;                      // выбранная кликом карточка (DOM-элемент)

  var drag = null;                         // { card, ghost, dx, dy, pointerId, started }

  /* ---------------------------------------------------------------- */

  function init(dragLayer, dropHandler) {
    layer  = dragLayer;
    onDrop = dropHandler;

    document.addEventListener('pointermove', onMove, { passive: false });
    document.addEventListener('pointerup', onUp);
    document.addEventListener('pointercancel', cancel);
  }

  /** Навешивает поведение на карточку из банка */
  function bindCard(card) {
    card.addEventListener('pointerdown', onDown);
    card.addEventListener('keydown', onCardKey);
    card.addEventListener('click', function (e) { e.preventDefault(); });
  }

  /** Навешивает поведение на поле-приёмник */
  function bindSlot(slot) {
    slot.addEventListener('click', function () {
      if (picked && !slot.classList.contains('is-locked')) {
        var card = picked;
        clearPick();
        onDrop(card, slot);
      }
    });
    slot.addEventListener('keydown', function (e) {
      if ((e.key === 'Enter' || e.key === ' ') && picked && !slot.classList.contains('is-locked')) {
        e.preventDefault();
        var card = picked;
        clearPick();
        onDrop(card, slot);
      }
    });
  }

  /* ------------------------- выбор кликом ------------------------- */

  function pick(card) {
    if (picked === card) { clearPick(); return; }
    clearPick();
    picked = card;
    card.classList.add('is-picked');
    card.setAttribute('aria-pressed', 'true');
  }

  function clearPick() {
    if (picked) {
      picked.classList.remove('is-picked');
      picked.setAttribute('aria-pressed', 'false');
    }
    picked = null;
  }

  function onCardKey(e) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      pick(e.currentTarget);
    }
  }

  /* ------------------------- перетаскивание ------------------------ */

  function onDown(e) {
    if (e.button !== undefined && e.button !== 0) return;   // только левая кнопка
    var card = e.currentTarget;
    drag = {
      card: card,
      startX: e.clientX,
      startY: e.clientY,
      pointerId: e.pointerId,
      started: false,
      ghost: null,
      dx: 0, dy: 0
    };
  }

  function onMove(e) {
    if (!drag || e.pointerId !== drag.pointerId) return;

    if (!drag.started) {
      if (Math.abs(e.clientX - drag.startX) < THRESHOLD &&
          Math.abs(e.clientY - drag.startY) < THRESHOLD) return;
      startGhost(e);
    }

    e.preventDefault();
    moveGhost(e.clientX, e.clientY);
    highlight(e.clientX, e.clientY);
  }

  function startGhost(e) {
    var card = drag.card;
    var rect = card.getBoundingClientRect();

    var ghost = card.cloneNode(true);
    ghost.classList.remove('is-picked');
    ghost.style.width = rect.width + 'px';
    layer.appendChild(ghost);

    drag.ghost   = ghost;
    drag.dx      = drag.startX - rect.left;
    drag.dy      = drag.startY - rect.top;
    drag.started = true;

    card.classList.add('is-dragging');
    document.body.classList.add('is-dragging');
    clearPick();
  }

  function moveGhost(x, y) {
    drag.ghost.style.left = (x - drag.dx) + 'px';
    drag.ghost.style.top  = (y - drag.dy) + 'px';
  }

  function highlight(x, y) {
    var slot = slotAt(x, y);
    var all = document.querySelectorAll('.slot.is-over');
    for (var i = 0; i < all.length; i++) {
      if (all[i] !== slot) all[i].classList.remove('is-over');
    }
    if (slot) slot.classList.add('is-over');
  }

  function slotAt(x, y) {
    var el = document.elementFromPoint(x, y);
    if (!el) return null;
    var slot = el.closest('.slot');
    if (!slot || slot.classList.contains('is-locked')) return null;
    return slot;
  }

  function onUp(e) {
    if (!drag || e.pointerId !== drag.pointerId) return;

    if (!drag.started) {                    // это был обычный клик — выбираем карточку
      pick(drag.card);
      drag = null;
      return;
    }

    var slot = slotAt(e.clientX, e.clientY);
    var card = drag.card;

    finishDrag();

    if (slot) {
      slot.classList.remove('is-over');
      onDrop(card, slot);
    }
  }

  function cancel() { if (drag && drag.started) finishDrag(); else drag = null; }

  function finishDrag() {
    if (drag.ghost && drag.ghost.parentNode) drag.ghost.parentNode.removeChild(drag.ghost);
    drag.card.classList.remove('is-dragging');
    document.body.classList.remove('is-dragging');
    var over = document.querySelectorAll('.slot.is-over');
    for (var i = 0; i < over.length; i++) over[i].classList.remove('is-over');
    drag = null;
  }

  /* ---------------------------------------------------------------- */

  return {
    init: init,
    bindCard: bindCard,
    bindSlot: bindSlot,
    clearPick: clearPick,
    getPicked: function () { return picked; }
  };
})();
