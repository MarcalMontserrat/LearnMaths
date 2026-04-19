import React from 'react';

const NODE_ICONS = {
  start: '🚩',
  mode: '📘',
  chest: '🎁',
  boss: '👑'
};

export function AdventurePanel({
  mapCards,
  activeBoss,
  pendingChests,
  latestRewardMessage,
  onOpenChest
}) {
  const currentIndex = mapCards.findIndex((node) => node.current);
  const startIndex = Math.max(0, currentIndex - 2);
  const endIndex = Math.min(mapCards.length, startIndex + 6);
  const visibleNodes = mapCards.slice(startIndex, endIndex);

  return (
    <section className="meta-card">
      <div>
        <span className="section-kicker">Mapa</span>
        <h3>🗺️ Camino de aventura</h3>
      </div>

      <div className="map-strip" aria-label="Mapa de progreso">
        {visibleNodes.map((node) => (
          <article
            key={`${node.id}-${node.index}`}
            className={`map-node ${node.current ? 'is-current' : ''} ${
              node.cleared ? 'is-cleared' : ''
            } ${node.type === 'boss' ? 'is-boss' : ''} ${
              node.type === 'chest' ? 'is-chest' : ''
            }`}
          >
            <strong>
              <span aria-hidden="true">{NODE_ICONS[node.type]} </span>
              {node.label}
            </strong>
            <p>{node.subtitle}</p>
          </article>
        ))}
      </div>

      <p className="map-foot">
        Casilla {currentIndex + 1} de {mapCards.length}
      </p>

      <div className="adventure-actions">
        <div className="chest-box">
          <strong>🎁 {pendingChests} cofres pendientes</strong>
          <p>
            Abrelos para conseguir estrellas extra o desbloquear temas.
          </p>
          <button
            className="btn-main btn-compact"
            type="button"
            onClick={onOpenChest}
            disabled={!pendingChests}
          >
            🎁 Abrir cofre
          </button>
        </div>

        <div className="boss-box">
          <strong>{activeBoss ? `👑 ${activeBoss.title}` : '🌿 Sin jefe activo'}</strong>
          <p>
            {activeBoss
              ? `${activeBoss.subtitle}. Recompensa: ${activeBoss.rewardStars} estrellas y 1 cofre.`
              : 'Sigue avanzando en el mapa para desbloquear el siguiente jefe.'}
          </p>
        </div>
      </div>

      {latestRewardMessage ? (
        <div className="meta-highlight">{latestRewardMessage}</div>
      ) : null}
    </section>
  );
}
