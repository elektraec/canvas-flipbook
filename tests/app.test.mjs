import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { runInNewContext } from 'node:vm';

const app = readFileSync(new URL('../app.js', import.meta.url), 'utf8');

function load(query) {
  const elements = Object.fromEntries(['message', 'flipbook', 'document-title', 'open-pdf'].map(id => [id, {
    hidden: false,
    textContent: '',
    href: '',
    querySelector() { return { textContent: '' }; }
  }]));
  let options;
  let worker;
  class PageFlipOpen {
    static setPdfWorkerSrc(value) { worker = value; }
    constructor(_element, value) { options = value; }
  }
  runInNewContext(app, {
    URLSearchParams,
    window: { location: { search: query } },
    document: { getElementById: id => elements[id] },
    PageFlipOpen,
    console
  });
  return { options, worker, elements };
}

test('loads an allowed PDF with relative paths and PageFlipOpen', () => {
  const result = load('?file=ihm/semana01.pdf');
  assert.equal(result.options.source, './pdf/ihm/semana01.pdf');
  assert.equal(result.worker, './vendor/pageflipopen/pdf.worker.mjs');
  assert.equal(result.options.enableZoom, true);
  assert.equal(result.options.enableFullscreen, true);
});

test('accepts the four allowed folders and nested PDF paths', () => {
  for (const folder of ['ihm', 'programacion', 'metodologia', 'ergonomia']) {
    assert.equal(load(`?file=${folder}/unidad/tema%201.pdf`).options.source,
      `./pdf/${folder}/unidad/tema%201.pdf`);
  }
});

test('rejects paths outside pdf and malformed file parameters', () => {
  for (const query of [
    '?file=../secret.pdf',
    '?file=ihm/../secret.pdf',
    '?file=ihm/%252e%252e/secret.pdf',
    '?file=ihm%2F..%2Fsecret.pdf',
    '?file=ihm%5Csecret.pdf',
    '?file=https%3A%2F%2Fexample.com%2Fx.pdf',
    '?file=%2Fpdf%2Fihm%2Fx.pdf',
    '?file=other/x.pdf',
    '?file=ihm/x.png',
    '?file=ihm/x.pdf&file=ihm/y.pdf'
  ]) {
    assert.equal(load(query).options, undefined, query);
  }
});
