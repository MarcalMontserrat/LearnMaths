import React from 'react';
import { MODE_OPTIONS } from '../config';

const MODE_ICONS = {
  mix: '🏀',
  sum: '🎯',
  sub: '🛡️',
  mul2: '⚡',
  mul3: '🚀',
  mulLong: '🔥'
};

export function ModeGrid({ activeMode, onModeChange }) {
  return (
    <section className="mode-grid" aria-label="Seleccion de modo">
      {MODE_OPTIONS.map((option) => (
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
    </section>
  );
}
