import React from 'react';

export function CoachPanel({
  completedCount,
  mistakes,
  selectedModeTitle,
  pendingChests,
  availableStars,
  activeBoss,
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
          {activeBoss
            ? `${activeBoss.title} esta activo. Necesitas ${activeBoss.goalStars} estrellas en su modo para derrotarlo.`
            : 'Ideal para rondas cortas de 5 a 10 minutos. Sigue el mapa para desbloquear cofres, temas y nuevos rivales.'}
        </p>
      </div>

      <div className="tips-list">
        <div className="tip-card">
          <strong>🎯 Desafio diario</strong>
          <p>Haz una ronda del modo marcado para llevarte la recompensa extra.</p>
        </div>
        <div className="tip-card">
          <strong>🗺️ Ruta del mapa</strong>
          <p>Las casillas especiales te dan cofres y activan los jefes.</p>
        </div>
        <div className="tip-card">
          <strong>🎉 Ultimo premio</strong>
          <p>{latestRewardMessage || 'Todavia no has activado ninguna recompensa especial.'}</p>
        </div>
      </div>
    </aside>
  );
}
