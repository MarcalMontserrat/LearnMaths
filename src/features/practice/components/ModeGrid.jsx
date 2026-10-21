import React from 'react';
import { MODE_OPTIONS } from '../config';

const MODE_ICONS = {
  mix: '🏀',
  sum: '🎯',
  sub: '🛡️',
  mul2: '⚡',
  mul3: '🚀',
  mulLong: '🔥',
  mul33: '🎯',
  div1: '➗',
  problems: '📖'
};

const MULTIPLICATION_MODE_IDS = new Set(['mul2', 'mul3', 'mulLong', 'mul33']);

export function ModeGrid({ activeMode, onModeChange }) {
  const primaryModes = MODE_OPTIONS.filter(
    (option) => !MULTIPLICATION_MODE_IDS.has(option.id)
  );
  const multiplicationModes = MODE_OPTIONS.filter((option) =>
    MULTIPLICATION_MODE_IDS.has(option.id)
  );

  return (
    <section className="mode-selector" aria-label="Seleccion de modo">
      <div className="mode-grid">
        {primaryModes.map((option) => (
          <button
            key={option.id}
            className={`mode-card ${activeMode === option.id ? 'is-active' : ''}`}
            style={{ '--mode-accent': option.accent }}
            type="button"
            onClick={() => onModeChange(option.id)}
          >
            <div className="mode-card-top">
              <span className="mode-chip">Entreno</span>
              <span className="mode-icon" aria-hidden="true">
                {MODE_ICONS[option.id] ?? '🏀'}
              </span>
            </div>
            <strong>{option.title}</strong>
            <p>{option.description}</p>
          </button>
        ))}
      </div>

      <div className="multiplication-mode-group">
        <div>
          <span className="section-kicker">Multiplicaciones</span>
          <h2>Elige dificultad</h2>
          <p>Un solo bloque, desde calentamiento hasta reto avanzado.</p>
        </div>
        <div className="multiplication-options">
          {multiplicationModes.map((option) => (
            <button
              key={option.id}
              className={activeMode === option.id ? 'is-active' : ''}
              type="button"
              onClick={() => onModeChange(option.id)}
            >
              <span aria-hidden="true">{MODE_ICONS[option.id]}</span>
              <strong>{option.title}</strong>
              <small>{option.description}</small>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
