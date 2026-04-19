import { createNotebookLayout, createQuestionForMode } from './gameUtils';

describe('gameUtils', () => {
  it('creates long multiplication questions with at least 3 digits by 2 digits', () => {
    const question = createQuestionForMode('mulLong');

    expect(question.type).toBe('mulLong');
    expect(String(question.left).length).toBeGreaterThanOrEqual(3);
    expect(String(question.right).length).toBeGreaterThanOrEqual(2);
    expect(question.operator).toBe('x');
    expect(question.answer).toBe(question.left * question.right);
  });

  it('builds partial rows for long multiplication notebooks', () => {
    const layout = createNotebookLayout({
      type: 'mulLong',
      left: 326,
      right: 24,
      operator: 'x',
      answer: 7824
    });

    expect(layout.variant).toBe('long-multiplication');
    expect(layout.columnCount).toBe(4);
    expect(layout.partialRows).toHaveLength(2);
    expect(layout.partialRows[0].label).toBe('x 4');
    expect(layout.partialRows[1].label).toBe('x 20');
    expect(layout.finalCarryLabel).toBe('Llevo suma');
    expect(layout.finalCarrySlots).toHaveLength(4);
    expect(
      layout.partialRows[1].cells[layout.partialRows[1].cells.length - 1]
    ).toMatchObject({
      kind: 'shift',
      value: '0'
    });
    expect(layout.resultSlots).toHaveLength(4);
  });
});
