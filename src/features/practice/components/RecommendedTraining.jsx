import React from 'react';

export function RecommendedTraining({
  mathTitle,
  clockTitle,
  mathComplete,
  onStartMath,
  onStartClock
}) {
  return (
    <section className="recommended-training">
      <div>
        <span className="section-kicker">Ruta recomendada</span>
        <h2>Entrenamiento de hoy</h2>
        <p>Dos pasos cortos. La propuesta cambia cada día sin guardar datos.</p>
      </div>

      <div className="recommended-steps">
        <article className={mathComplete ? 'is-complete' : ''}>
          <span>{mathComplete ? '✓' : '1'}</span>
          <div>
            <strong>{mathTitle}</strong>
            <small>Una ronda de 10 retos</small>
          </div>
        </article>
        <article>
          <span>2</span>
          <div>
            <strong>Hores · {clockTitle}</strong>
            <small>10 relojes sin repetir</small>
          </div>
        </article>
      </div>

      <div className="recommended-actions">
        <button className="btn-main" type="button" onClick={onStartMath}>
          {mathComplete ? 'Repetir matemáticas' : 'Empezar entrenamiento'}
        </button>
        <button className="btn-secondary" type="button" onClick={onStartClock}>
          {mathComplete ? 'Continuar con las horas' : 'Ir directo a las horas'}
        </button>
      </div>
    </section>
  );
}
