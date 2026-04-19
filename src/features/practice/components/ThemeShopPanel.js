import React from 'react';

export function ThemeShopPanel({
  themes,
  availableStars,
  onBuyTheme,
  onSelectTheme
}) {
  return (
    <section className="meta-card">
      <div>
        <span className="section-kicker">Tienda</span>
        <h3>🎨 Temas cosmeticos</h3>
      </div>

      <div className="wallet-box">
        <strong>💎 {availableStars} estrellas libres</strong>
        <p>Puedes gastarlas sin perder tu total historico.</p>
      </div>

      <div className="theme-list">
        {themes.map((theme) => (
          <article
            key={theme.id}
            className={`theme-card ${theme.active ? 'is-active' : ''}`}
          >
            <div>
              <strong>{theme.title}</strong>
              <p>{theme.description}</p>
            </div>
            <div className="theme-actions">
              <span>{theme.cost ? `${theme.cost} estrellas` : 'Incluido'}</span>
              {theme.owned ? (
                <button
                  className="btn-secondary btn-compact"
                  type="button"
                  onClick={() => onSelectTheme(theme.id)}
                  disabled={theme.active}
                >
                  {theme.active ? '✅ Activo' : '🎨 Usar'}
                </button>
              ) : (
                <button
                  className="btn-main btn-compact"
                  type="button"
                  onClick={() => onBuyTheme(theme.id)}
                  disabled={availableStars < theme.cost}
                >
                  🛍️ Comprar
                </button>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
