import React from 'react';
import { SESSION_LENGTH } from '../config';
import { getRoundMessage } from '../gameUtils';

export function PracticePanel({
  roundComplete,
  completedCount,
  roundStars,
  progressPercentage,
  question,
  currentStarValue,
  answer,
  answerInputRef,
  isSolved,
  showHint,
  feedback,
  mode,
  onAnswerChange,
  onSubmit,
  onToggleHint,
  onRestartRound,
  onNextQuestion
}) {
  return (
    <article className="practice-card">
      <div className="round-caption">
        <div>
          <span className="section-kicker">Ronda actual</span>
          <h2>
            {roundComplete
              ? 'Resumen final'
              : `Reto ${completedCount + 1} de ${SESSION_LENGTH}`}
          </h2>
        </div>
        <div className="score-pill">{roundStars} estrellas</div>
      </div>

      <div className="progress-track" aria-hidden="true">
        <div
          className="progress-bar"
          style={{ width: `${progressPercentage}%` }}
        />
      </div>

      {roundComplete ? (
        <div className="summary-card">
          <span className="summary-chip">{getRoundMessage(roundStars)}</span>
          <h3>Has completado los 10 retos.</h3>
          <p className="summary-stars">{roundStars} / 30 estrellas</p>
          <p>
            Puedes repetir la misma ronda o cambiar de modo para seguir
            practicando otras cuentas.
          </p>
          <button className="btn-main" type="button" onClick={() => onRestartRound(mode)}>
            Jugar otra ronda
          </button>
        </div>
      ) : (
        <>
          <div className="operation-meta">
            <span className="info-pill strong">{question.label}</span>
            <span className="info-pill">
              Ahora mismo puedes ganar {currentStarValue} estrellas
            </span>
          </div>

          <div className="question-board" aria-live="polite">
            <div className="question-row">
              <span className="question-operator" />
              <span className="question-number">{question.left}</span>
            </div>
            <div className="question-row">
              <span className="question-operator">{question.operator}</span>
              <span className="question-number">{question.right}</span>
            </div>
            <div className="question-line" />
          </div>

          <form className="answer-form" onSubmit={onSubmit}>
            <label className="answer-label" htmlFor="math-answer">
              Escribe el resultado:
            </label>
            <div className="answer-row">
              <input
                id="math-answer"
                ref={answerInputRef}
                className="answer-input"
                inputMode="numeric"
                pattern="[0-9]*"
                autoComplete="off"
                value={answer}
                onChange={(event) => onAnswerChange(event.target.value)}
                disabled={isSolved}
              />
              <button className="btn-main" type="submit" disabled={isSolved}>
                Comprobar
              </button>
              <button className="btn-secondary" type="button" onClick={onToggleHint}>
                {showHint ? 'Ocultar pista' : 'Mostrar pista'}
              </button>
            </div>
          </form>

          <div className={`feedback ${feedback.type}`}>{feedback.message}</div>

          {showHint ? (
            <div className="hint-box">
              <span className="section-kicker">Pista</span>
              <p>{question.hint}</p>
            </div>
          ) : null}

          {isSolved ? (
            <button className="btn-main" type="button" onClick={onNextQuestion}>
              {completedCount >= SESSION_LENGTH ? 'Ver resumen' : 'Siguiente reto'}
            </button>
          ) : null}
        </>
      )}
    </article>
  );
}
