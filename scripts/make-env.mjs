// Reads the firebaseConfig object copied from the Firebase console
// (paste it into firebase-config.txt) and writes .env.local.
// Usage: node scripts/make-env.mjs

import { readFileSync, writeFileSync, existsSync } from 'node:fs';

const SOURCE = 'firebase-config.txt';
const TARGET = '.env.local';

const KEYS = [
  ['apiKey', 'VITE_FIREBASE_API_KEY'],
  ['authDomain', 'VITE_FIREBASE_AUTH_DOMAIN'],
  ['databaseURL', 'VITE_FIREBASE_DATABASE_URL'],
  ['projectId', 'VITE_FIREBASE_PROJECT_ID'],
  ['storageBucket', 'VITE_FIREBASE_STORAGE_BUCKET'],
  ['messagingSenderId', 'VITE_FIREBASE_MESSAGING_SENDER_ID'],
  ['appId', 'VITE_FIREBASE_APP_ID'],
];

if (!existsSync(SOURCE)) {
  console.error(
    `Файл ${SOURCE} не найден.\n` +
      'Создайте его в корне проекта и вставьте туда блок firebaseConfig\n' +
      'из консоли Firebase (Project settings -> General -> Your apps).'
  );
  process.exit(1);
}

const raw = readFileSync(SOURCE, 'utf8');

const lines = [];
const missing = [];

for (const [key, envName] of KEYS) {
  const match = raw.match(new RegExp(`${key}\\s*:\\s*["'\`]([^"'\`]+)["'\`]`));
  if (match) {
    lines.push(`${envName}=${match[1]}`);
  } else {
    missing.push(key);
    lines.push(`${envName}=`);
  }
}

writeFileSync(TARGET, lines.join('\n') + '\n');

console.log(`Записал ${TARGET}:`);
for (const line of lines) {
  const [name, value] = line.split('=');
  console.log(`  ${name} ${value ? 'ok' : 'ПУСТО'}`);
}

if (missing.includes('databaseURL')) {
  console.log(
    '\ndatabaseURL отсутствует в конфиге.\n' +
      'Так бывает, если веб-приложение зарегистрировали раньше, чем создали\n' +
      'Realtime Database. Скопируйте адрес вида\n' +
      'https://<project>-default-rtdb.<region>.firebasedatabase.app\n' +
      'со вкладки Realtime Database -> Data и впишите его в .env.local вручную.'
  );
} else if (missing.length) {
  console.log(`\nНе нашёл в конфиге: ${missing.join(', ')}`);
}
