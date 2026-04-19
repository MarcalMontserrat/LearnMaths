# LearnMaths

Aplicacion web pequena para practicar matematicas de primaria en el navegador, con una temporada de baloncesto como capa de progreso principal.

## Que incluye

- Rondas de 10 ejercicios.
- Modos de sumas, restas y multiplicaciones.
- Sistema de estrellas por intento y celebracion rapida por jugada.
- Temporadas con calendario de partidos, victorias y copas.
- Misiones, insignias, cofres y tienda visual.
- Guardado local de estrellas totales y mejor racha.
- Interfaz responsive sin backend.

## Stack

- React 18
- React Router 6
- Vite
- Vitest
- ESLint

## Scripts

```bash
npm install
npm run dev
npm run lint
npm test
npm run build
```

## Estructura

```text
src/
  App.jsx
  AppRoutes.jsx
  components/
    Layout.jsx
  features/
    practice/
      Home.jsx
      config.js
      gamificationUtils.js
      gameUtils.js
      hooks/
        usePracticeSession.js
      components/
        CoachPanel.jsx
        GuidedNotebook.jsx
        HeroSection.jsx
        ModeGrid.jsx
        PracticePanel.jsx
        SeasonIntroModal.jsx
        SeasonPanel.jsx
  custom.css
  index.jsx
```

## Organizacion actual

- `src/features/practice/Home.jsx` compone la pantalla principal.
- `src/features/practice/hooks/usePracticeSession.js` concentra el estado y las acciones de la ronda.
- `src/features/practice/gameUtils.js` contiene la generacion de ejercicios y reglas de puntuacion.
- `src/features/practice/gamificationUtils.js` gestiona temporada, recompensas, insignias y tienda.
- `src/features/practice/config.js` mantiene modos, textos y claves de almacenamiento.
- `src/custom.css` conserva el estilo global de la aplicacion.

## Como se juega

- Cada ronda tiene 10 cuentas.
- Cada cuenta correcta da de 1 a 3 estrellas segun errores.
- El objetivo principal es ganar el partido actual de la temporada.
- Para ganar un partido debes jugar el modo pedido y llegar al minimo de estrellas.
- Al completar el calendario levantas una copa y pasas a la siguiente temporada.

## Deploy

El proyecto queda listo para desplegar como SPA estatica en Vercel o Netlify.

## GitHub Pages

El repo ya queda preparado para publicarse en GitHub Pages con GitHub Actions.

URL esperada en este repo:

```text
https://marcalmontserrat.github.io/LearnMaths/
```

Pasos:

1. En GitHub, abre `Settings -> Pages`.
2. En `Build and deployment`, selecciona `GitHub Actions`.
3. Haz push a `main`.
4. Espera a que termine el workflow `Deploy to GitHub Pages`.

Detalles tecnicos:

- `vite.config.js` calcula la `base` del build a partir del nombre del repo.
- `npm run build` genera tambien `dist/404.html` para que la SPA no se rompa al entrar en rutas directas.
- El workflow vive en `.github/workflows/deploy-pages.yml`.

### Vercel

```bash
npm install
npm run build
```

Usa la configuracion por defecto de Vite. El archivo `vercel.json` ya redirige cualquier ruta a `index.html`.

### Netlify

```bash
npm install
npm run build
```

Publica la carpeta `dist/`. El archivo `netlify.toml` ya incluye el redirect para rutas del cliente.

## Notas

- El progreso se guarda en `localStorage`.
- No hay API ni base de datos.
- El proyecto parte de una sola app React en la raiz del repositorio.
