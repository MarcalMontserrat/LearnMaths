import React from 'react';

export function CoachPanel({ completedCount, mistakes, selectedModeTitle }) {
  return (
    <aside className="coach-card">
      <div>
        <span className="section-kicker">Panel de juego</span>
        <h3>Como usarla</h3>
      </div>

      <div className="mini-stats">
        <div className="mini-stat">
          <span>Retos completados</span>
          <strong>{completedCount}</strong>
        </div>
        <div className="mini-stat">
          <span>Errores en esta cuenta</span>
          <strong>{mistakes}</strong>
        </div>
        <div className="mini-stat">
          <span>Modo elegido</span>
          <strong>{selectedModeTitle}</strong>
        </div>
      </div>

      <div className="coach-note">
        <p>
          Ideal para rondas cortas de 5 a 10 minutos. Si se atasca en una
          cuenta, puede usar la pista y repetirla con calma en papel.
        </p>
      </div>

      <div className="tips-list">
        <div className="tip-card">
          <strong>Sumas y restas</strong>
          <p>Siempre empieza por la columna de las unidades.</p>
        </div>
        <div className="tip-card">
          <strong>Multiplicaciones</strong>
          <p>Descompone el numero grande en centenas, decenas y unidades.</p>
        </div>
        <div className="tip-card">
          <strong>Ritmo</strong>
          <p>Mejor pocas cuentas bien hechas que muchas con prisa.</p>
        </div>
      </div>
    </aside>
  );
}
