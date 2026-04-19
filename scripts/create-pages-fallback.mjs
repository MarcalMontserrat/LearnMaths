import { copyFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';

const distDirectory = resolve(process.cwd(), 'dist');
const indexFile = resolve(distDirectory, 'index.html');
const fallbackFile = resolve(distDirectory, '404.html');

if (existsSync(indexFile)) {
  copyFileSync(indexFile, fallbackFile);
}
