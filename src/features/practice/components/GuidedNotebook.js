import React, { useMemo, useState } from 'react';
import { createNotebookLayout } from '../gameUtils';

const PLACE_LABELS = ['unidades', 'decenas', 'centenas', 'millares'];

const getPlaceLabel = (index, totalColumns) => {
  const offsetFromRight = totalColumns - index - 1;

  return PLACE_LABELS[offsetFromRight] ?? `columna ${index + 1}`;
};

const sanitizeNotebookValue = (value, maxLength) =>
  value.replace(/\D/g, '').slice(0, maxLength);

const buildScratchAnswer = (digits) => {
  const compactValue = digits.join('').replace(/\s+/g, '');

  if (!compactValue) {
    return '';
  }

  return compactValue.replace(/^0+(?=\d)/, '');
};

const createEmptyRow = (columnCount) => Array(columnCount).fill('');

const createEmptyMatrix = (rowCount, columnCount) =>
  Array.from({ length: rowCount }, () => createEmptyRow(columnCount));

export function GuidedNotebook({ question, isSolved, onApplyResult }) {
  const layout = useMemo(() => createNotebookLayout(question), [question]);
  const [helperNotes, setHelperNotes] = useState(() =>
    createEmptyMatrix(
      layout.variant === 'long-multiplication' ? layout.partialRows.length : 1,
      layout.columnCount
    )
  );
  const [partialNotes, setPartialNotes] = useState(() =>
    createEmptyMatrix(layout.partialRows?.length ?? 0, layout.columnCount)
  );
  const [finalCarryNotes, setFinalCarryNotes] = useState(() =>
    createEmptyRow(layout.columnCount)
  );
  const [resultNotes, setResultNotes] = useState(() =>
    createEmptyRow(layout.columnCount)
  );

  const scratchAnswer = buildScratchAnswer(resultNotes);

  const updateHelperNote = (rowIndex, columnIndex, nextValue) => {
    setHelperNotes((currentNotes) =>
      currentNotes.map((row, currentRowIndex) =>
        currentRowIndex === rowIndex
          ? row.map((note, noteIndex) =>
              noteIndex === columnIndex
                ? sanitizeNotebookValue(nextValue, layout.helperInputMaxLength)
                : note
            )
          : row
      )
    );
  };

  const updatePartialNote = (rowIndex, columnIndex, nextValue) => {
    setPartialNotes((currentNotes) =>
      currentNotes.map((row, currentRowIndex) =>
        currentRowIndex === rowIndex
          ? row.map((note, noteIndex) =>
              noteIndex === columnIndex
                ? sanitizeNotebookValue(nextValue, 1)
                : note
            )
          : row
      )
    );
  };

  const updateResultNote = (index, nextValue) => {
    setResultNotes((currentNotes) =>
      currentNotes.map((note, noteIndex) =>
        noteIndex === index ? sanitizeNotebookValue(nextValue, 1) : note
      )
    );
  };

  const updateFinalCarryNote = (index, nextValue) => {
    setFinalCarryNotes((currentNotes) =>
      currentNotes.map((note, noteIndex) =>
        noteIndex === index
          ? sanitizeNotebookValue(nextValue, layout.helperInputMaxLength)
          : note
      )
    );
  };

  const clearNotebook = () => {
    setHelperNotes(
      createEmptyMatrix(
        layout.variant === 'long-multiplication' ? layout.partialRows.length : 1,
        layout.columnCount
      )
    );
    setPartialNotes(createEmptyMatrix(layout.partialRows?.length ?? 0, layout.columnCount));
    setFinalCarryNotes(createEmptyRow(layout.columnCount));
    setResultNotes(createEmptyRow(layout.columnCount));
  };

  return (
    <section className="notebook-panel">
      <div className="notebook-header">
        <div className="notebook-copy">
          <h3>{layout.title}</h3>
          <p className="notebook-note">{layout.description}</p>
        </div>
      </div>

      <p className="notebook-note">{layout.instructions}</p>

      {layout.supportSteps.length ? (
        <div className="notebook-steps" aria-label="Pasos para resolver">
          {layout.supportSteps.map((step) => (
            <span key={step} className="notebook-step">
              {step}
            </span>
          ))}
        </div>
      ) : null}

      <div
        className="notebook-grid"
        style={{ '--notebook-columns': layout.columnCount }}
      >
        {layout.variant === 'long-multiplication' ? (
          <>
            <div className="notebook-row">
              <span className="notebook-row-label" aria-hidden="true" />
              {layout.leftDigits.map((digit, index) => (
                <div
                  key={`left-${index}`}
                  className={`notebook-cell ${digit ? '' : 'is-empty'}`}
                >
                  <span className="notebook-cell-value">{digit || ''}</span>
                </div>
              ))}
            </div>

            <div className="notebook-row">
              <span className="notebook-row-label notebook-operator">
                {question.operator}
              </span>
              {layout.rightDigits.map((digit, index) => (
                <div
                  key={`right-${index}`}
                  className={`notebook-cell ${digit ? '' : 'is-empty'}`}
                >
                  <span className="notebook-cell-value">{digit || ''}</span>
                </div>
              ))}
            </div>

            <div className="notebook-row">
              <span className="notebook-row-label" aria-hidden="true" />
              <div className="notebook-divider" />
            </div>

            {layout.partialRows.map((partialRow, rowIndex) => (
              <React.Fragment key={partialRow.id}>
                <div className="notebook-row">
                  <span className="notebook-row-label">{partialRow.carryLabel}</span>
                  {partialRow.cells.map((cell, columnIndex) =>
                    cell.kind === 'shift' ? (
                      <div
                        key={`carry-gap-${cell.id}`}
                        className="notebook-cell notebook-cell-shift"
                        aria-hidden="true"
                      >
                        <span className="notebook-cell-value" />
                      </div>
                    ) : (
                      <input
                        key={`carry-${cell.id}`}
                        className="notebook-input notebook-input-small"
                        inputMode="numeric"
                        pattern="[0-9]*"
                        autoComplete="off"
                        maxLength={layout.helperInputMaxLength}
                        value={helperNotes[rowIndex][columnIndex]}
                        onChange={(event) =>
                          updateHelperNote(rowIndex, columnIndex, event.target.value)
                        }
                        aria-label={`Llevada de ${partialRow.label} en ${getPlaceLabel(
                          columnIndex,
                          layout.columnCount
                        )}`}
                        disabled={isSolved}
                      />
                    )
                  )}
                </div>

                <div className="notebook-row">
                  <span className="notebook-row-label">{partialRow.label}</span>
                  {partialRow.cells.map((cell, columnIndex) =>
                    cell.kind === 'shift' ? (
                      <div
                        key={cell.id}
                        className="notebook-cell notebook-cell-shift"
                      >
                        <span className="notebook-cell-value">{cell.value}</span>
                      </div>
                    ) : (
                      <input
                        key={cell.id}
                        className="notebook-input notebook-result-input"
                        inputMode="numeric"
                        pattern="[0-9]*"
                        autoComplete="off"
                        maxLength={1}
                        value={partialNotes[rowIndex][columnIndex]}
                        onChange={(event) =>
                          updatePartialNote(rowIndex, columnIndex, event.target.value)
                        }
                        aria-label={`${partialRow.label} en ${getPlaceLabel(
                          columnIndex,
                          layout.columnCount
                        )}`}
                        disabled={isSolved}
                      />
                    )
                  )}
                </div>
              </React.Fragment>
            ))}

            <div className="notebook-row">
              <span className="notebook-row-label" aria-hidden="true" />
              <div className="notebook-divider" />
            </div>

            <div className="notebook-row">
              <span className="notebook-row-label">{layout.finalCarryLabel}</span>
              {layout.finalCarrySlots.map((slot, index) => (
                <input
                  key={slot.id}
                  className="notebook-input notebook-input-small"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  autoComplete="off"
                  maxLength={layout.helperInputMaxLength}
                  value={finalCarryNotes[index]}
                  onChange={(event) =>
                    updateFinalCarryNote(index, event.target.value)
                  }
                  aria-label={`Llevada de la suma final en ${getPlaceLabel(
                    index,
                    layout.columnCount
                  )}`}
                  disabled={isSolved}
                />
              ))}
            </div>

            <div className="notebook-row">
              <span className="notebook-row-label">Total</span>
              {layout.resultSlots.map((slot, index) => (
                <input
                  key={slot.id}
                  className="notebook-input notebook-result-input"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  autoComplete="off"
                  maxLength={1}
                  value={resultNotes[index]}
                  onChange={(event) => updateResultNote(index, event.target.value)}
                  aria-label={`Total en ${getPlaceLabel(index, layout.columnCount)}`}
                  disabled={isSolved}
                />
              ))}
            </div>
          </>
        ) : (
          <>
            <div className="notebook-row">
              <span className="notebook-row-label">{layout.helperLabel}</span>
              {layout.helperSlots.map((slot, index) => (
                <input
                  key={slot.id}
                  className={`notebook-input ${
                    layout.helperMode === 'rewrite-top'
                      ? 'notebook-input-wide'
                      : 'notebook-input-small'
                  }`}
                  inputMode="numeric"
                  pattern="[0-9]*"
                  autoComplete="off"
                  maxLength={layout.helperInputMaxLength}
                  value={helperNotes[0][index]}
                  onChange={(event) => updateHelperNote(0, index, event.target.value)}
                  aria-label={`${layout.helperLabel} en ${getPlaceLabel(index, layout.columnCount)}`}
                  disabled={isSolved}
                />
              ))}
            </div>

            <div className="notebook-row">
              <span className="notebook-row-label" aria-hidden="true" />
              {layout.leftDigits.map((digit, index) => (
                <div
                  key={`left-${index}`}
                  className={`notebook-cell ${digit ? '' : 'is-empty'} ${
                    layout.helperMode === 'rewrite-top' && helperNotes[0][index]
                      ? 'is-rewritten'
                      : ''
                  }`}
                >
                  <span className="notebook-cell-value">{digit || ''}</span>
                </div>
              ))}
            </div>

            <div className="notebook-row">
              <span className="notebook-row-label notebook-operator">
                {question.operator}
              </span>
              {layout.rightDigits.map((digit, index) => (
                <div
                  key={`right-${index}`}
                  className={`notebook-cell ${digit ? '' : 'is-empty'}`}
                >
                  <span className="notebook-cell-value">{digit || ''}</span>
                </div>
              ))}
            </div>

            <div className="notebook-row">
              <span className="notebook-row-label" aria-hidden="true" />
              <div className="notebook-divider" />
            </div>

            <div className="notebook-row">
              <span className="notebook-row-label">Escribo</span>
              {layout.resultSlots.map((slot, index) => (
                <input
                  key={slot.id}
                  className="notebook-input notebook-result-input"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  autoComplete="off"
                  maxLength={1}
                  value={resultNotes[index]}
                  onChange={(event) => updateResultNote(index, event.target.value)}
                  aria-label={`Resultado en ${getPlaceLabel(index, layout.columnCount)}`}
                  disabled={isSolved}
                />
              ))}
            </div>
          </>
        )}
      </div>

      <div className="notebook-actions">
        <button
          className="btn-secondary btn-compact"
          type="button"
          onClick={clearNotebook}
          disabled={isSolved}
        >
          Borrar anotaciones
        </button>
        <button
          className="btn-main btn-compact"
          type="button"
          onClick={() => onApplyResult(scratchAnswer)}
          disabled={isSolved || !scratchAnswer}
        >
          Usar este resultado
        </button>
      </div>
    </section>
  );
}
