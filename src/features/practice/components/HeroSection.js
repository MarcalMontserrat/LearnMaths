import React from 'react';

export function HeroSection({
  selectedModeTitle,
  totalStars,
  availableStars,
  perfectStreak,
  bestStreak,
  weeklyProgress,
  dailyChallenge
}) {
  return (
    <section className="hero">
      <div className="hero-copy">
        <span className="eyebrow">Entrena en la pista de 3o de primaria</span>
        <h1>Mision Matematica</h1>
        <p>
          Una pagina pensada para practicar sumas, restas y multiplicaciones
          como si cada ronda fuera una jugada: corta, clara y con un marcador
          que te deja ver el progreso sin distracciones.
        </p>
        <div className="hero-badges">
          <span>🏀 10 jugadas por ronda</span>
          <span>📅 {weeklyProgress.playedCount} dias jugados esta semana</span>
          <span>🎯 {dailyChallenge.title}</span>
        </div>
      </div>

      <div className="hero-panel">
        <div className="panel-top">
          <div>
            <p className="panel-kicker">Marcador de temporada</p>
            <h2>{selectedModeTitle}</h2>
          </div>
          <div className="stars-total">{totalStars}</div>
        </div>

        <div className="stat-row">
          <div className="stat-box">
            <span>💎 Estrellas libres</span>
            <strong>{availableStars}</strong>
          </div>
          <div className="stat-box">
            <span>🏆 Mejor racha</span>
            <strong>{bestStreak}</strong>
          </div>
          <div className="stat-box">
            <span>✨ Racha perfecta</span>
            <strong>{perfectStreak}</strong>
          </div>
          <div className="stat-box">
            <span>🎯 Desafio diario</span>
            <strong>{dailyChallenge.goalStars}</strong>
          </div>
        </div>

        <p className="panel-note">
          Cada cuenta da 3 estrellas al primer intento, 2 al segundo y 1 si
          necesitas mas pruebas. Juegas rondas cortas, subes niveles y mantienes
          el ritmo como en una sesion de tiro.
        </p>
      </div>
    </section>
  );
}
