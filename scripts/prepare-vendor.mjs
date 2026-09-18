import { copyFile, mkdir } from 'node:fs/promises';
import { join } from 'node:path';

const source = join('node_modules', 'pageflipopen');
const destination = join('vendor', 'pageflipopen');
await mkdir(destination, { recursive: true });
for (const file of ['pageflipopen.css', 'pageflipopen.min.js', 'pdf.worker.mjs']) {
  await copyFile(join(source, 'dist', file), join(destination, file));
}
await copyFile(join(source, 'LICENSE'), join(destination, 'LICENSE'));
console.log('Archivos de PageFlipOpen listos para GitHub Pages.');
