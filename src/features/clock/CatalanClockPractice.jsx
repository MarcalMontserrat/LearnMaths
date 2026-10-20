import React, { useState } from 'react';
import { createClockQuestion, getClockHandAngles } from './clockUtils';

const CLOCK_SESSION_LENGTH = 10;
const CLOCK_FACE_NUMBERS = Array.from({ length: 12 }, (_, index) => index + 1);

const getClockNumberStyle = (number) => {
  const angle = ((number - 3) * Math.PI) / 6;
  const radius = 39;

  return {
    left: `${50 + Math.cos(angle) * radius}%`,
    top: `${50 + Math.sin(angle) * radius}%`
  };
};

function AnalogClock({ hour, minutes }) {
  const angles = getClockHandAngles(hour, minutes);

  return (
    <div
      className="analog-clock"
      role="img"
      aria-label={`Reloj analogico marcando ${hour} y ${minutes}`}
    >
      {CLOCK_FACE_NUMBERS.map((number) => (
        <span
          key={number}
          className="clock-number"
          style={getClockNumberStyle(number)}
        >
          {number}
        </span>
      ))}
      <span
        className="clock-hand clock-hour-hand"
        style={{ '--clock-angle': `${angles.hour}deg` }}
      />
      <span
        className="clock-hand clock-minute-hand"
        style={{ '--clock-angle': `${angles.minute}deg` }}
      />
      <span className="clock-pin" />
    </div>
  );
}

export function CatalanClockPractice() {
  const [question, setQuestion] = useState(() => createClockQuestion());
  const [questionIndex, setQuestionIndex] = useState(0);
  const [firstTryAnswers, setFirstTryAnswers] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isSolved, setIsSolved] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const [feedback, setFeedback] = useState(null);
  const [isComplete, setIsComplete] = useState(false);

  const resetQuestion = () => {
    setQuestion(createClockQuestion());
    setAttempts(0);
    setSelectedOption(null);
    setIsSolved(false);
    setShowHint(false);
    setShowHelp(false);
    setFeedback(null);
  };

  const restart = () => {
    setQuestionIndex(0);
    setFirstTryAnswers(0);
    setIsComplete(false);
    resetQuestion();
  };

  const handleOptionClick = (option) => {
    if (isSolved) {
      return;
    }

    setSelectedOption(option);

    if (option === question.answer) {
      if (attempts === 0) {
        setFirstTryAnswers((current) => current + 1);
      }
      setIsSolved(true);
      setFeedback({ type: 'success', message: 'Molt bé! Aquesta és la resposta correcta.' });
      return;
    }

    setAttempts((current) => current + 1);
    setFeedback({
      type: 'error',
      message: 'Encara no. Mira quants quarts han passat i pensa en l’hora següent.'
    });
  };

  const handleNext = () => {
    if (questionIndex + 1 >= CLOCK_SESSION_LENGTH) {
      setIsComplete(true);
      return;
    }

    setQuestionIndex((current) => current + 1);
    resetQuestion();
  };

  return (
    <section className="clock-practice" aria-labelledby="clock-practice-title">
      <div className="clock-practice-header">
        <div>
          <span className="section-kicker">Extra · català</span>
          <h2 id="clock-practice-title">Quina hora és?</h2>
          <p>Aprèn el sistema català de campanar mirant un rellotge.</p>
        </div>
        <div className="score-pill">
          🕒 {Math.min(questionIndex + (isSolved ? 1 : 0), CLOCK_SESSION_LENGTH)}/{CLOCK_SESSION_LENGTH}
        </div>
      </div>

      <div className="progress-track" aria-hidden="true">
        <div
          className="progress-bar"
          style={{
            width: `${((questionIndex + (isSolved ? 1 : 0)) / CLOCK_SESSION_LENGTH) * 100}%`
          }}
        />
      </div>

      {isComplete ? (
        <div className="clock-summary">
          <span className="summary-chip">Ronda completada</span>
          <h3>{firstTryAnswers}/10 al primer intent</h3>
          <p>Has resolt totes les hores. Repeteix la ronda per millorar la marca.</p>
          <button className="btn-main" type="button" onClick={restart}>
            Tornar-hi
          </button>
        </div>
      ) : (
        <div className="clock-practice-grid">
          <div className="clock-board">
            <span className="section-kicker">Pissarra del rellotge</span>
            <AnalogClock hour={question.hour} minutes={question.minutes} />
            {showHelp ? (
              <div className="clock-digital-help">
                <span>Hora digital</span>
                <strong>{question.digitalTime}</strong>
              </div>
            ) : null}
          </div>

          <div className="clock-question-card">
            <span className="section-kicker">Pregunta {questionIndex + 1} de 10</span>
            <h3>Quina hora marca el rellotge?</h3>
            <div className="clock-options">
              {question.options.map((option) => {
                const isCorrect = isSolved && option === question.answer;
                const isWrong = selectedOption === option && option !== question.answer;

                return (
                  <button
                    key={option}
                    className={`clock-option ${isCorrect ? 'is-correct' : ''} ${isWrong ? 'is-wrong' : ''}`}
                    type="button"
                    onClick={() => handleOptionClick(option)}
                    disabled={isSolved}
                  >
                    {option}
                  </button>
                );
              })}
            </div>

            <div className="clock-actions">
              <button
                className="btn-secondary"
                type="button"
                onClick={() => setShowHint((current) => !current)}
              >
                {showHint ? 'Amagar pista' : 'Mostrar pista'}
              </button>
              <button
                className="btn-secondary"
                type="button"
                onClick={() => setShowHelp((current) => !current)}
              >
                {showHelp ? 'Amagar ajuda' : 'Veure hora digital'}
              </button>
            </div>

            {feedback ? (
              <div className={`feedback ${feedback.type}`} aria-live="polite">
                {feedback.message}
              </div>
            ) : null}

            {showHint ? (
              <div className="hint-box">
                <span className="section-kicker">Pista</span>
                <p>{question.hint}</p>
              </div>
            ) : null}

            {isSolved ? (
              <button className="btn-main" type="button" onClick={handleNext}>
                {questionIndex + 1 >= CLOCK_SESSION_LENGTH
                  ? 'Veure resultat'
                  : 'Següent hora'}
              </button>
            ) : null}
          </div>

          <aside className="clock-help-card">
            <span className="section-kicker">Ajuda ràpida</span>
            <h3>Els quarts miren endavant</h3>
            <ul>
              <li><strong>:00</strong> · l’hora en punt</li>
              <li><strong>:15</strong> · un quart de l’hora següent</li>
              <li><strong>:30</strong> · dos quarts de l’hora següent</li>
              <li><strong>:45</strong> · tres quarts de l’hora següent</li>
            </ul>
          </aside>
        </div>
      )}
    </section>
  );
}
