/* ==========================================================================
   Сборка проекта в один HTML-файл.

   Зачем: файл можно открыть без сервера, отправить одним вложением или
   опубликовать там, где принимается только одна страница.

   Запуск:  node build.js
   Результат: dist/index.html            — самостоятельная страница
              dist/embed.html            — то же без обёртки <html>/<head>/<body>,
                                           для площадок, которые её добавляют сами
   ========================================================================== */

const fs = require('fs');
const path = require('path');

const root = __dirname;
const read = (p) => fs.readFileSync(path.join(root, p), 'utf8');

const html = read('index.html');

/* Порядок подключения берём из самого index.html, чтобы сборка не разъехалась
   с исходником, если появится новый файл темы. */
const scripts = [...html.matchAll(/<script src="([^"]+)"><\/script>/g)].map((m) => m[1]);
const styles  = [...html.matchAll(/<link rel="stylesheet" href="([^"]+)">/g)].map((m) => m[1]);

const inlinedStyles = styles
  .map((href) => `  <style>\n/* ${href} */\n${read(href)}\n  </style>`)
  .join('\n');

const inlinedScripts = scripts
  .map((src) => `  <script>\n/* ${src} */\n${read(src)}\n  </script>`)
  .join('\n');

/* Тело страницы: всё между <body> и </body>, без тегов подключения */
const body = html
  .slice(html.indexOf('<body>') + '<body>'.length, html.indexOf('</body>'))
  .replace(/\s*<script src="[^"]+"><\/script>/g, '')
  .trim();

const head = html.slice(html.indexOf('<head>') + '<head>'.length, html.indexOf('</head>'));
const title = (head.match(/<title>([^<]*)<\/title>/) || [, 'Тренажёр'])[1];
const icon  = (head.match(/<link rel="icon"[^>]*>/) || [''])[0];

fs.mkdirSync(path.join(root, 'dist'), { recursive: true });

/* --- самостоятельная страница --- */
fs.writeFileSync(path.join(root, 'dist/index.html'),
`<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${title}</title>
  ${icon}
${inlinedStyles}
</head>
<body>
${body}
${inlinedScripts}
</body>
</html>
`);

/* --- вариант без обёртки --- */
fs.writeFileSync(path.join(root, 'dist/embed.html'),
`<title>${title}</title>
${inlinedStyles}
${body}
${inlinedScripts}
`);

const kb = (f) => (fs.statSync(path.join(root, f)).size / 1024).toFixed(0);
console.log(`Собрано: ${styles.length} стилей, ${scripts.length} скриптов`);
console.log(`  dist/index.html — ${kb('dist/index.html')} КБ`);
console.log(`  dist/embed.html — ${kb('dist/embed.html')} КБ`);
