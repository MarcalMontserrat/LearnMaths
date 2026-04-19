import React from 'react';

export function CollectionPanel({ badges }) {
  return (
    <section className="meta-card">
      <div>
        <span className="section-kicker">Album</span>
        <h3>🏅 Insignias</h3>
      </div>

      <div className="badge-grid">
        {badges.map((badge) => (
          <article
            key={badge.id}
            className={`badge-card ${badge.unlocked ? 'is-unlocked' : ''}`}
          >
            <strong>{badge.title}</strong>
            <p>{badge.description}</p>
            <span>{badge.unlocked ? '✅ Desbloqueada' : '🔒 Bloqueada'}</span>
          </article>
        ))}
      </div>
    </section>
  );
}
