import React from 'react';

export function CoachPanel({
  completedCount,
  mistakes,
  selectedModeTitle,
  pendingChests,
  availableStars,
  seasonCard,
  latestRewardMessage
}) {
  return (
    <aside className="coach-card">
      <div>
        <span className="section-kicker">Banquillo</span>
        <h3>🏀 Estado de la pista</h3>
      </div>

      <div className="mini-stats">
        <div className="mini-stat">
          <span>✅ Retos completados</span>
          <strong>{completedCount}</strong>
        </div>
        <div className="mini-stat">
          <span>🧮 Errores en esta cuenta</span>
          <strong>{mistakes}</strong>
        </div>
        <div className="mini-stat">
          <span>🎲 Modo elegido</span>
          <strong>{selectedModeTitle}</strong>
        </div>
        <div className="mini-stat">
          <span>🏀 Partido actual</span>
          <strong>{seasonCard.currentMatch?.title ?? 'Copa lograda'}</strong>
        </div>
        <div className="mini-stat">
          <span>🎁 Cofres listos</span>
          <strong>{pendingChests}</strong>
        </div>
        <div className="mini-stat">
          <span>💎 Estrellas libres</span>
          <strong>{availableStars}</strong>
        </div>
      </div>

      <div className="coach-note">
        <p>
          {seasonCard.currentMatch
            ? `${seasonCard.currentMatch.title}: juega ${seasonCard.currentMatch.modeLabel.toLowerCase()} y consigue ${seasonCard.currentMatch.goalStars} estrellas para sumar una victoria.`
            : 'Has cerrado el calendario actual. Sigue jugando para arrancar la siguiente temporada.'}
        </p>
      </div>

      <div className="tips-list">
        <div className="tip-card">
          <strong>🏆 Meta principal</strong>
          <p>Tu foco debe ser ganar el partido actual del calendario.</p>
        </div>
        <div className="tip-card">
          <strong>🎯 Desafio diario</strong>
          <p>Si coincide con tu entrenamiento de hoy, te llevas bonus extra.</p>
        </div>
        <div className="tip-card">
          <strong>🎉 Ultimo premio</strong>
          <p>{latestRewardMessage || 'Todavia no has activado ninguna recompensa especial.'}</p>
        </div>
      </div>
    </aside>
  );
}
