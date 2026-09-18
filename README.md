# Canvas Flipbook

Visor PDF estático para Canvas LMS, basado en **PageFlipOpen 0.4.3**. GitHub Pages sirve directamente `index.html`; Node y npm solo se necesitan para preparar los archivos o ejecutar el servidor local. El paquete instalado queda en `node_modules/`, que Git ignora. Los únicos archivos de PageFlipOpen publicados están en `vendor/pageflipopen/` (bundle, CSS, worker de PDF.js y licencia).

## Uso

Coloca tus PDF en una de estas carpetas:

```text
pdf/
├── ihm/
├── programacion/
├── metodologia/
└── ergonomia/
```

Ejemplo: `pdf/ihm/semana01.pdf` se abre con:

```text
https://USUARIO.github.io/canvas-flipbook/?file=ihm/semana01.pdf
```

El repositorio incluye un PDF de muestra de tres páginas en esa ruta para comprobar el visor. Reemplázalo por tu material antes de compartir el enlace con estudiantes. Se puede regenerar con `node scripts/create-sample.mjs`.

El parámetro `file` acepta solo rutas relativas a `pdf/`, con extensión `.pdf` y una de las cuatro carpetas indicadas. No admite URLs externas, rutas ascendentes ni escapes. Si el PDF no existe, se muestra un mensaje de error.

PageFlipOpen ofrece cambio de página, campo para saltar a una página, zoom, gestos táctiles, teclado y pantalla completa. Su diseño cambia automáticamente entre una y dos páginas según el ancho disponible. En pantalla completa dentro de Canvas, el `iframe` y Canvas deben permitir esa función.

## Preparar y probar en local

```bash
npm install
npm run prepare:vendor
npm start
```

Abre `http://localhost:4173/?file=ihm/semana01.pdf` después de añadir el PDF. También puedes abrir `http://localhost:4173/` para ver la pantalla de instrucciones. Tras actualizar PageFlipOpen, vuelve a ejecutar `npm run prepare:vendor` y confirma los cambios de `vendor/`.

## Publicar gratis con GitHub Pages

1. Crea un repositorio **público** llamado `canvas-flipbook` en tu cuenta de GitHub.
2. En esta carpeta, ejecuta:

   ```bash
   git remote add origin https://github.com/USUARIO/canvas-flipbook.git
   git push -u origin main
   ```

3. En GitHub, abre **Settings → Pages**. En **Build and deployment**, elige **Deploy from a branch**, rama `main` y carpeta `/ (root)`. Guarda la configuración.
4. Cuando termine la publicación, verifica `https://USUARIO.github.io/canvas-flipbook/?file=ihm/semana01.pdf`.

No hace falta ejecutar npm en GitHub Pages. El archivo `.nojekyll` indica que los archivos estáticos se deben servir tal como están. Si un nombre de PDF tiene espacios o acentos, codifícalo en el enlace URL.

## Insertar en Canvas LMS

En el editor HTML de una página de Canvas, usa:

```html
<iframe
  src="https://USUARIO.github.io/canvas-flipbook/?file=ihm/semana01.pdf"
  width="100%"
  height="750"
  style="border:0;"
  allow="fullscreen"
  allowfullscreen>
</iframe>
```

Sustituye `USUARIO` por tu usuario de GitHub. Los PDF del repositorio público serán accesibles públicamente. Si Canvas elimina el `iframe` al guardar, revisa las políticas de contenido externo de tu instancia de Canvas.

## Créditos

PageFlipOpen se distribuye bajo licencia MIT; su licencia se conserva en `vendor/pageflipopen/LICENSE`.
