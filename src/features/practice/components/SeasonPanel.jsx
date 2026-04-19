import React from 'react';

const MATCH_ICONS = {
  sum: '➕',
  sub: '➖',
  mul2: '✖️',
  mul3: '🧠',
  mulLong: '🚀',
  mix: '🏀'
};

export function SeasonPanel({
  season,
  pendingChests,
  latestRewardMessage,
  onOpenChest,
  onPlayCurrentMatch,
  onShowSeasonGuide
}) {
  return (
    <section className="meta-card">
      <div>
        <span className="section-kicker">Temporada</span>
        <h3>🏆 Camino a la copa</h3>
      </div>

      <div className="season-summary">
        <div>
          <strong>{season.leagueTitle}</strong>
          <p>
            Temporada {season.number}. {season.leagueSubtitle}
          </p>
        </div>
        <div className="season-scoreboard">
          <span>Marcador</span>
          <strong>
            {season.wins}/{season.totalMatches}
          </strong>
        </div>
      </div>

      <div className="season-current-match">
        <strong>
          {season.currentMatch ? 'Partido actual' : 'Temporada completada'}
        </strong>
        <p>
          {season.currentMatch
            ? `${season.currentMatch.title}: ${season.currentMatch.subtitle}. Necesitas ${season.currentMatch.goalStars} estrellas en ${season.currentMatch.modeLabel.toLowerCase()}.`
            : 'Has cerrado el calendario actual y ya puedes empezar la siguiente temporada.'}
        </p>
        <div className="season-progress-track" aria-hidden="true">
          <div
            className="season-progress-bar"
            style={{ width: `${season.progressPercentage}%` }}
          />
        </div>
        <div className="season-cta-row">
          <button className="btn-main btn-compact" type="button" onClick={onPlayCurrentMatch}>
            {season.currentMatch ? 'Jugar partido actual' : 'Empezar nueva temporada'}
          </button>
          <button className="btn-secondary btn-compact" type="button" onClick={onShowSeasonGuide}>
            Como se gana la liga
          </button>
        </div>
      </div>

      <div className="season-schedule" aria-label="Calendario de temporada">
        {season.schedule.map((match) => (
          <article
            key={match.id}
            className={`season-match is-${match.status}`}
          >
            <div className="season-match-top">
              <strong>
                <span aria-hidden="true">{MATCH_ICONS[match.mode]} </span>
                {match.title}
              </strong>
              <span>{match.goalStars} estrellas</span>
            </div>
            <p>{match.subtitle}</p>
          </article>
        ))}
      </div>

      <div className="adventure-actions">
        <div className="chest-box">
          <strong>🎁 {pendingChests} cofres pendientes</strong>
          <p>
            Los cofres salen de victorias importantes y finales de temporada.
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
          <strong>🏅 Titulos ganados: {season.titles}</strong>
          <p>
            Tu objetivo principal es completar el calendario y levantar una copa
            para pasar a la siguiente temporada.
          </p>
        </div>
      </div>

      {latestRewardMessage ? (
        <div className="meta-highlight">{latestRewardMessage}</div>
      ) : null}
    </section>
  );
}
