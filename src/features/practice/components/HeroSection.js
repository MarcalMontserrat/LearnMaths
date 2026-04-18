import React from 'react';

export function HeroSection({
  selectedModeTitle,
  totalStars,
  perfectStreak,
  bestStreak
}) {
  return (
    <section className="hero">
      <div className="hero-copy">
        <span className="eyebrow">Practica para 3o de primaria</span>
        <h1>Mision Matematica</h1>
        <p>
          Una pagina pensada para practicar sumas, restas y multiplicaciones
          sin distracciones, con retos cortos, puntos y pistas faciles de
          seguir.
        </p>
        <div className="hero-badges">
          <span>10 retos por ronda</span>
          <span>Todo funciona en el navegador</span>
          <span>Guarda las estrellas en este dispositivo</span>
        </div>
      </div>

      <div className="hero-panel">
        <div className="panel-top">
          <div>
            <p className="panel-kicker">Progreso guardado</p>
            <h2>{selectedModeTitle}</h2>
          </div>
          <div className="stars-total">{totalStars}</div>
        </div>

        <div className="stat-row">
          <div className="stat-box">
            <span>Racha perfecta</span>
            <strong>{perfectStreak}</strong>
          </div>
          <div className="stat-box">
            <span>Mejor racha</span>
            <strong>{bestStreak}</strong>
          </div>
        </div>

        <p className="panel-note">
          Cada cuenta da 3 estrellas al primer intento, 2 al segundo y 1 si
          necesitas mas pruebas.
        </p>
      </div>
    </section>
  );
}
