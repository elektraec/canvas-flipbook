# Canvas Flipbook

Visor PDF estático para Canvas LMS, basado en **PageFlipOpen 0.4.3**. GitHub Pages sirve directamente `index.html`; Node y npm solo se necesitan para preparar los archivos o ejecutar el servidor local. El paquete instalado queda en `node_modules/`, que Git ignora. Los únicos archivos de PageFlipOpen publicados están en `vendor/pageflipopen/` (bundle, CSS, worker de PDF.js y licencia).

**Sitio publicado:** https://elektraec.github.io/canvas-flipbook/

## Logo y colores

El logo está en `assets/logo-indoamerica.png` y se muestra en el encabezado desde una ruta relativa compatible con GitHub Pages. Para reemplazarlo, conserva ese nombre y usa un PNG de fondo transparente. La paleta de la Universidad Indoamérica está definida al inicio de `styles.css`: `#3a1467`, `#542e91`, `#644a98`, `#f37121`, `#ffd54c` y `#ffffff`. Consulta `assets/README.md`.

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
https://elektraec.github.io/canvas-flipbook/?file=ihm/semana01.pdf
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

## Publicación en GitHub Pages

El repositorio público ya está en https://github.com/elektraec/canvas-flipbook. Pages publica desde la rama `main`, carpeta `/ (root)`. Para publicar cambios, agrega o reemplaza los PDF, haz un commit y ejecuta `git push origin main`.

Para instalar este proyecto en otra cuenta de GitHub:

1. Crea un repositorio **público** llamado `canvas-flipbook`.
2. Configura su URL como remoto de esta carpeta y sube `main`:

   ```bash
   git remote add origin https://github.com/USUARIO/canvas-flipbook.git
   git push -u origin main
   ```

3. En GitHub, abre **Settings → Pages**. En **Build and deployment**, elige **Deploy from a branch**, rama `main` y carpeta `/ (root)`. Guarda la configuración.
4. Cuando termine la publicación, verifica `https://TU_USUARIO.github.io/canvas-flipbook/?file=ihm/semana01.pdf`.

No hace falta ejecutar npm en GitHub Pages. El archivo `.nojekyll` indica que los archivos estáticos se deben servir tal como están. Si un nombre de PDF tiene espacios o acentos, codifícalo en el enlace URL.

## Insertar en Canvas LMS

En el editor HTML de una página de Canvas, usa:

```html
<iframe
  src="https://elektraec.github.io/canvas-flipbook/?file=ihm/semana01.pdf"
  width="100%"
  height="750"
  style="border:0;"
  allow="fullscreen"
  allowfullscreen>
</iframe>
```

Si publicas una copia en otra cuenta, sustituye `elektraec` por tu usuario de GitHub. Los PDF del repositorio público serán accesibles públicamente. Si Canvas elimina el `iframe` al guardar, revisa las políticas de contenido externo de tu instancia de Canvas.

## Créditos

PageFlipOpen se distribuye bajo licencia MIT; su licencia se conserva en `vendor/pageflipopen/LICENSE`.
