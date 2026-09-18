import { writeFile } from 'node:fs/promises';

// Small self-contained PDF used to verify the viewer and its documented URL.
const pages = [
  ['Canvas Flipbook', 'Documento de ejemplo', 'Sustituye este archivo por tu PDF de IHM.'],
  ['Pagina 2', 'Navegacion de prueba', 'Usa las flechas, el teclado o la barra del libro.'],
  ['Pagina 3', 'Zoom y pantalla completa', 'Funciones proporcionadas por PageFlipOpen.']
];
const objects = [];
const add = value => (objects.push(value), objects.length);
const escape = text => text.replace(/[\\()]/g, '\\$&');
const catalog = add('<< /Type /Catalog /Pages 2 0 R >>');
const pageTree = add('');
const font = add('<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>');
const pageIds = [];

for (const lines of pages) {
  const content = `BT /F1 28 Tf 72 700 Td (${escape(lines[0])}) Tj /F1 17 Tf 0 -50 Td (${escape(lines[1])}) Tj /F1 12 Tf 0 -42 Td (${escape(lines[2])}) Tj ET`;
  const stream = add(`<< /Length ${Buffer.byteLength(content)} >>\nstream\n${content}\nendstream`);
  pageIds.push(add(`<< /Type /Page /Parent ${pageTree} 0 R /MediaBox [0 0 595 842] /Resources << /Font << /F1 ${font} 0 R >> >> /Contents ${stream} 0 R >>`));
}
objects[pageTree - 1] = `<< /Type /Pages /Kids [${pageIds.map(id => `${id} 0 R`).join(' ')}] /Count ${pageIds.length} >>`;
let data = '%PDF-1.4\n';
const offsets = [0];
objects.forEach((object, index) => {
  offsets.push(Buffer.byteLength(data));
  data += `${index + 1} 0 obj\n${object}\nendobj\n`;
});
const xref = Buffer.byteLength(data);
data += `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n`;
data += offsets.slice(1).map(offset => `${String(offset).padStart(10, '0')} 00000 n \n`).join('');
data += `trailer\n<< /Size ${objects.length + 1} /Root ${catalog} 0 R >>\nstartxref\n${xref}\n%%EOF\n`;
await writeFile('pdf/ihm/semana01.pdf', data);
console.log('PDF de ejemplo creado: pdf/ihm/semana01.pdf');
