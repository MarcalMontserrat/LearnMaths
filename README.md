# LearnMaths

Aplicacion web pequena para practicar matematicas de primaria en el navegador.

## Que incluye

- Rondas de 10 ejercicios.
- Modos de sumas, restas y multiplicaciones.
- Sistema de estrellas por intento.
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
npm start
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
      gameUtils.js
      hooks/
        usePracticeSession.js
      components/
        CoachPanel.jsx
        HeroSection.jsx
        ModeGrid.jsx
        PracticePanel.jsx
  custom.css
  index.jsx
```

## Organizacion actual

- `src/features/practice/Home.jsx` compone la pantalla principal.
- `src/features/practice/hooks/usePracticeSession.js` concentra el estado y las acciones de la ronda.
- `src/features/practice/gameUtils.js` contiene la generacion de ejercicios y reglas de puntuacion.
- `src/features/practice/config.js` mantiene modos, textos y claves de almacenamiento.
- `src/custom.css` conserva el estilo global de la aplicacion.

## Notas

- El progreso se guarda en `localStorage`.
- No hay API ni base de datos.
- El proyecto parte de una sola app React en la raiz del repositorio.
