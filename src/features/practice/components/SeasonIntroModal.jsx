import React from 'react';

export function SeasonIntroModal({
  season,
  onClose,
  onPlayCurrentMatch
}) {
  return (
    <div className="season-guide-overlay" role="presentation">
      <div
        className="season-guide-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="season-guide-title"
      >
        <span className="section-kicker">Bienvenida a la temporada</span>
        <h2 id="season-guide-title">🏀 Asi se gana la liga</h2>
        <p>
          Tu objetivo principal no es solo hacer cuentas: es ganar partidos y
          completar el calendario para levantar una copa.
        </p>

        <div className="season-guide-steps">
          <article className="season-guide-step">
            <strong>1. Juega el partido actual</strong>
            <p>
              Cada partido pide un modo concreto y un minimo de estrellas.
            </p>
          </article>
          <article className="season-guide-step">
            <strong>2. Gana rondas de 10 retos</strong>
            <p>
              Si llegas a la meta, sumas una victoria y pasas al siguiente
              partido.
            </p>
          </article>
          <article className="season-guide-step">
            <strong>3. Completa la temporada</strong>
            <p>
              Al cerrar el calendario ganas una copa, cofres y una temporada
              nueva.
            </p>
          </article>
        </div>

        {season.currentMatch ? (
          <div className="season-guide-focus">
            <strong>Partido actual: {season.currentMatch.title}</strong>
            <p>
              Te pide {season.currentMatch.goalStars} estrellas en{' '}
              {season.currentMatch.modeLabel.toLowerCase()}.
            </p>
          </div>
        ) : null}

        <div className="season-guide-actions">
          <button className="btn-main" type="button" onClick={onPlayCurrentMatch}>
            Jugar partido actual
          </button>
          <button className="btn-secondary" type="button" onClick={onClose}>
            Entendido
          </button>
        </div>
      </div>
    </div>
  );
}
