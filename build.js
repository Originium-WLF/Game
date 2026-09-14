/* ==========================================================================
   Сборка проекта в один HTML-файл.

   Каждый тег <link rel="stylesheet"> и <script src> с локальным адресом
   заменяется содержимым файла прямо на своём месте, поэтому порядок и
   расположение (head или body) сохраняются. Внешние адреса — например,
   шрифты Google — остаются ссылками.

   Запуск:  node build.js
   Результат: dist/index.html   — самостоятельная страница
              dist/embed.html   — то же без обёртки <html>/<head>/<body>,
                                  для площадок, которые добавляют её сами
   ========================================================================== */

const fs = require('fs');
const path = require('path');

const root = __dirname;
const read = (p) => fs.readFileSync(path.join(root, p), 'utf8');
const isExternal = (href) => /^(https?:)?\/\//.test(href);

let doc = read('index.html');
let inlinedStyles = 0;
let inlinedScripts = 0;

doc = doc.replace(/[ \t]*<link rel="stylesheet" href="([^"]+)">/g, (tag, href) => {
  if (isExternal(href)) return tag;
  inlinedStyles++;
  return `  <style>\n/* ${href} */\n${read(href)}\n  </style>`;
});

doc = doc.replace(/[ \t]*<script src="([^"]+)"><\/script>/g, (tag, src) => {
  if (isExternal(src)) return tag;
  inlinedScripts++;
  return `  <script>\n/* ${src} */\n${read(src)}\n  </script>`;
});

/* Фотография разработчика подключается из скрипта по относительному пути.
   В однофайловой сборке относительных путей нет — встраиваем её как data-URI. */
const photoRel = 'img/developer.jpg';
const photoAbs = path.join(root, photoRel);
let photoNote = 'не найдена, останутся инициалы';

if (fs.existsSync(photoAbs)) {
  const ext = path.extname(photoAbs).slice(1).toLowerCase();
  const mime = ext === 'png' ? 'image/png' : ext === 'webp' ? 'image/webp' : 'image/jpeg';
  const dataUri = `data:${mime};base64,${fs.readFileSync(photoAbs).toString('base64')}`;
  doc = doc.split(`'${photoRel}'`).join(`'${dataUri}'`);
  photoNote = `встроена, ${(fs.statSync(photoAbs).size / 1024).toFixed(0)} КБ`;
}

fs.mkdirSync(path.join(root, 'dist'), { recursive: true });
fs.writeFileSync(path.join(root, 'dist/index.html'), doc);

/* Вариант без обёртки: оставляем содержимое head (кроме служебных мета)
   и содержимое body одним куском.

   Границы body ищем с конца: среди карточек уровня HTML встречаются строки
   вида "</body>", и поиск с начала обрезал бы страницу на них. */
const head = doc.slice(doc.indexOf('<head>') + 6, doc.indexOf('</head>'));
const body = doc.slice(doc.indexOf('<body>') + 6, doc.lastIndexOf('</body>'));

const embedHead = head
  .replace(/[ \t]*<meta charset="[^"]*">\n?/g, '')
  .replace(/[ \t]*<meta name="viewport"[^>]*>\n?/g, '')
  .replace(/[ \t]*<link rel="icon"[^>]*>\n?/g, '')      // иконку задаёт сама площадка
  .trim();

fs.writeFileSync(path.join(root, 'dist/embed.html'), `${embedHead}\n${body.trim()}\n`);

const kb = (f) => (fs.statSync(path.join(root, f)).size / 1024).toFixed(0);
console.log(`Встроено: ${inlinedStyles} стилей, ${inlinedScripts} скриптов`);
console.log(`  фотография разработчика — ${photoNote}`);
console.log(`  dist/index.html — ${kb('dist/index.html')} КБ`);
console.log(`  dist/embed.html — ${kb('dist/embed.html')} КБ`);
