import React from 'react';

const SKILL_ICONS = {
  sum: '➕',
  sub: '➖',
  mul2: '✖️',
  mul3: '🧠',
  mulLong: '🚀'
};

export function SkillProgressPanel({ skills }) {
  return (
    <section className="meta-card">
      <div>
        <span className="section-kicker">Progreso por habilidad</span>
        <h3>📈 Niveles</h3>
      </div>

      <div className="skill-list">
        {skills.map((skill) => (
          <article key={skill.id} className="skill-item">
            <div className="skill-top">
              <div>
                <strong>
                  <span aria-hidden="true">{SKILL_ICONS[skill.id]} </span>
                  {skill.title}
                </strong>
                <p>{skill.rounds} rondas completadas</p>
              </div>
              <span className="skill-level">🪜 Nivel {skill.level}</span>
            </div>

            <div className="skill-track" aria-hidden="true">
              <div
                className="skill-fill"
                style={{ width: `${skill.percentage}%` }}
              />
            </div>

            <p className="skill-foot">
              {skill.current} / {skill.required} XP para el siguiente nivel
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
