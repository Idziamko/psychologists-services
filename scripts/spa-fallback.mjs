// GitHub Pages serves 404.html for unknown paths.
// Copying the app shell there lets React Router handle deep links
// like /psychologists or /favorites on a direct hit or page refresh.

import { copyFileSync, existsSync } from 'node:fs';

const SOURCE = 'dist/index.html';
const TARGET = 'dist/404.html';

if (!existsSync(SOURCE)) {
  console.error(`${SOURCE} не найден, сначала npm run build`);
  process.exit(1);
}

copyFileSync(SOURCE, TARGET);
console.log(`${TARGET} создан из ${SOURCE}`);
