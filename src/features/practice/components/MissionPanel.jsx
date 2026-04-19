import React from 'react';

const MISSION_ICONS = {
  season: '🏆',
  daily: '🎯',
  perfect: '✨',
  titles: '🥇',
  'no-hints': '🫡',
  wins: '🏀',
  chests: '🎁'
};

export function MissionPanel({ missions, weeklyProgress }) {
  return (
    <section className="meta-card">
      <div>
        <span className="section-kicker">Club</span>
        <h3>🎯 Objetivos activos</h3>
      </div>

      <div className="weekly-strip">
        <div>
          <strong>📅 Semana en marcha</strong>
          <p>{weeklyProgress.playedCount} de 7 dias con juego</p>
        </div>
        <div className="weekly-days" aria-label="Dias jugados esta semana">
          {weeklyProgress.recentDays.map((day) => (
            <span
              key={day.dayKey}
              className={`weekly-day ${day.played ? 'is-played' : ''}`}
            />
          ))}
        </div>
      </div>

      <div className="mission-list">
        {missions.map((mission) => (
          <article
            key={mission.id}
            className={`mission-item ${mission.complete ? 'is-complete' : ''}`}
          >
            <div className="mission-top">
              <strong>
                <span aria-hidden="true">{MISSION_ICONS[mission.id]} </span>
                {mission.title}
              </strong>
              <span>{mission.progressLabel}</span>
            </div>
            <p>{mission.description}</p>
            <div className="mission-track" aria-hidden="true">
              <div
                className="mission-fill"
                style={{
                  width: `${Math.min(
                    100,
                    (mission.progress / mission.goal) * 100
                  )}%`
                }}
              />
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
