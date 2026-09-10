/* ==========================================================================
   Конфетти. Две «пушки» из нижних углов, лента бумажек с вращением.
   Своя реализация на canvas — без библиотек и без внешних запросов.
   ========================================================================== */

window.Confetti = (function () {
  'use strict';

  var canvas = null;
  var ctx = null;
  var pieces = [];
  var raf = null;
  var lastTime = 0;

  var GRAVITY = 1500;        // px/с²
  var DRAG = 0.86;           // сопротивление воздуха за секунду
  var FLOOR_FADE = 0.9;      // доля высоты, после которой бумажка тает

  function init(el) {
    canvas = el;
    ctx = canvas.getContext('2d');
    window.addEventListener('resize', resize);
    resize();
  }

  function resize() {
    if (!canvas) return;
    var dpr = window.devicePixelRatio || 1;
    canvas.width = Math.floor(window.innerWidth * dpr);
    canvas.height = Math.floor(window.innerHeight * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  /**
   * Запускает залп.
   * @param {string[]} colors цвета бумажек
   * @param {number}   power  1 — обычный залп, больше — гуще и выше
   */
  function fire(colors, power) {
    if (!ctx) return;
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    power = power || 1;
    var w = window.innerWidth;
    var h = window.innerHeight;
    var count = Math.round(70 * power);

    /* две пушки в нижних углах, стреляют внутрь и вверх */
    launch(count, colors, 0.06 * w, h + 10, -Math.PI / 3.1, w, h);
    launch(count, colors, 0.94 * w, h + 10, -Math.PI + Math.PI / 3.1, w, h);

    if (!raf) {
      lastTime = performance.now();
      raf = window.requestAnimationFrame(tick);
    }
  }

  function launch(count, colors, x, y, baseAngle, w, h) {
    var speed = Math.max(w, h) * 1.25;
    for (var i = 0; i < count; i++) {
      var angle = baseAngle + (Math.random() - 0.5) * 0.7;
      var v = speed * (0.55 + Math.random() * 0.55);
      pieces.push({
        x: x,
        y: y,
        vx: Math.cos(angle) * v,
        vy: Math.sin(angle) * v,
        w: 6 + Math.random() * 6,
        h: 9 + Math.random() * 7,
        rot: Math.random() * Math.PI * 2,
        vr: (Math.random() - 0.5) * 14,
        tilt: Math.random() * Math.PI * 2,
        vt: 5 + Math.random() * 6,
        color: colors[(Math.random() * colors.length) | 0],
        life: 1,
        ribbon: Math.random() < 0.28
      });
    }
  }

  function tick(now) {
    var dt = Math.min((now - lastTime) / 1000, 0.05);
    lastTime = now;

    var h = window.innerHeight;
    ctx.clearRect(0, 0, window.innerWidth, h);

    var drag = Math.pow(DRAG, dt);

    for (var i = pieces.length - 1; i >= 0; i--) {
      var p = pieces[i];

      p.vx *= drag;
      p.vy = p.vy * drag + GRAVITY * dt;
      p.x += p.vx * dt;
      p.y += p.vy * dt;
      p.rot += p.vr * dt;
      p.tilt += p.vt * dt;

      if (p.y > h * FLOOR_FADE) p.life -= dt * 1.4;
      if (p.life <= 0 || p.y > h + 60) { pieces.splice(i, 1); continue; }

      draw(p);
    }

    if (pieces.length) {
      raf = window.requestAnimationFrame(tick);
    } else {
      ctx.clearRect(0, 0, window.innerWidth, h);
      raf = null;
    }
  }

  function draw(p) {
    ctx.save();
    ctx.translate(p.x, p.y);
    ctx.rotate(p.rot);
    /* сжатие по вертикали изображает поворот бумажки к зрителю */
    ctx.scale(1, Math.abs(Math.cos(p.tilt)) * 0.85 + 0.15);
    ctx.globalAlpha = Math.max(0, Math.min(1, p.life));
    ctx.fillStyle = p.color;
    if (p.ribbon) {
      ctx.fillRect(-p.w / 4, -p.h, p.w / 2, p.h * 2);
    } else {
      ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
    }
    ctx.restore();
  }

  function stop() {
    pieces.length = 0;
    if (raf) { window.cancelAnimationFrame(raf); raf = null; }
    if (ctx) ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
  }

  return { init: init, fire: fire, stop: stop };
})();
