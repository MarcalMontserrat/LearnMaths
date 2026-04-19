import React from 'react';

export function HeroSection({
  selectedModeTitle,
  totalStars,
  availableStars,
  perfectStreak,
  bestStreak,
  weeklyProgress,
  dailyChallenge,
  seasonCard
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
          <span>🏆 {seasonCard.leagueTitle}</span>
          <span>📅 {weeklyProgress.playedCount} dias jugados esta semana</span>
          <span>🔥 Mejor racha {bestStreak}</span>
        </div>
      </div>

      <div className="hero-panel">
        <div className="panel-top">
          <div>
            <p className="panel-kicker">Marcador de temporada</p>
            <h2>
              {seasonCard.leagueTitle} · T{seasonCard.number}
            </h2>
          </div>
          <div className="stars-total">{totalStars}</div>
        </div>

        <div className="stat-row">
          <div className="stat-box">
            <span>💎 Estrellas libres</span>
            <strong>{availableStars}</strong>
          </div>
          <div className="stat-box">
            <span>🏆 Titulos</span>
            <strong>{seasonCard.titles}</strong>
          </div>
          <div className="stat-box">
            <span>✨ Racha perfecta</span>
            <strong>{perfectStreak}</strong>
          </div>
          <div className="stat-box">
            <span>🎯 Partido actual</span>
            <strong>{seasonCard.wins}/{seasonCard.totalMatches}</strong>
          </div>
        </div>

        <p className="panel-note">
          Cada ronda correcta te acerca al siguiente partido del calendario.
          Tu objetivo grande ya no es solo sumar puntos: es completar la
          temporada y levantar una copa. Ahora mismo estas entrenando en{' '}
          {selectedModeTitle?.toLowerCase() ?? dailyChallenge.title.toLowerCase()}.
        </p>
      </div>
    </section>
  );
}
