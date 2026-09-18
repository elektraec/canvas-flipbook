(function () {
  'use strict';

  const allowedFolders = new Set(['ihm', 'programacion', 'metodologia', 'ergonomia']);
  const params = new URLSearchParams(window.location.search);
  const file = params.get('file');
  const message = document.getElementById('message');
  const flipbook = document.getElementById('flipbook');
  const title = document.getElementById('document-title');
  const openPdf = document.getElementById('open-pdf');

  function showMessage(heading, detail) {
    flipbook.hidden = true;
    message.hidden = false;
    message.querySelector('h2').textContent = heading;
    message.querySelector('p').textContent = detail;
  }

  function validatedPdfPath(value) {
    if (typeof value !== 'string' || value.length > 240 || !value) return null;
    // URLSearchParams has decoded the query once. Reject further escapes and path tricks.
    if (/[\\%?#\u0000-\u001f\u007f]/u.test(value)) return null;
    const parts = value.split('/');
    if (parts.length < 2 || !allowedFolders.has(parts[0])) return null;
    if (parts.some(part => !part || part === '.' || part === '..' || !/^[\p{L}\p{N}._ -]+$/u.test(part))) return null;
    if (!/\.pdf$/iu.test(parts.at(-1))) return null;
    return `./pdf/${parts.map(encodeURIComponent).join('/')}`;
  }

  if (!file) return;
  if (params.getAll('file').length !== 1) {
    showMessage('Enlace no válido', 'Usa un solo parámetro file con la ruta de un PDF.');
    return;
  }

  const pdfPath = validatedPdfPath(file);
  if (!pdfPath) {
    showMessage('Ruta de PDF no válida', 'Solo se permiten archivos .pdf dentro de ihm, programacion, metodologia o ergonomia en la carpeta pdf/.');
    return;
  }

  if (typeof PageFlipOpen !== 'function') {
    showMessage('No se pudo iniciar el visor', 'Faltan los archivos de PageFlipOpen. Ejecuta npm run prepare:vendor antes de publicar.');
    return;
  }

  title.textContent = file.split('/').at(-1).replace(/\.pdf$/iu, '').replace(/[_-]+/gu, ' ');
  openPdf.href = pdfPath;
  openPdf.hidden = false;
  message.hidden = false;
  showMessage('Cargando documento…', 'El libro estará disponible en unos segundos.');
  flipbook.hidden = false;

  PageFlipOpen.setPdfWorkerSrc('./vendor/pageflipopen/pdf.worker.mjs');
  new PageFlipOpen(flipbook, {
    source: pdfPath,
    autoLayout: true,
    autoHeight: true,
    enableZoom: true,
    enableFullscreen: true,
    enableKeyboard: true,
    enableTouch: true,
    toolbar: true,
    toolbarAlwaysVisible: true,
    onReady() { message.hidden = true; },
    onError(error) {
      console.error('Error al abrir el PDF:', error);
      showMessage('No se pudo abrir el documento', 'Comprueba que el PDF exista en la carpeta pdf/ y que su nombre coincida con el enlace.');
    }
  });
})();
