import React from 'react';
import { MODE_OPTIONS } from '../config';

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
          <span className="mode-chip">Modo</span>
          <strong>{option.title}</strong>
          <p>{option.description}</p>
        </button>
      ))}
    </section>
  );
}
