import { createNotebookLayout, createQuestionForMode, getRoundMessage, getStarsForMistakes } from './gameUtils';

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

  describe('createQuestionForMode', () => {
    it.each(['sum', 'sub', 'mul2', 'mul3', 'mulLong'])(
      'creates a valid question for mode %s',
      (mode) => {
        const question = createQuestionForMode(mode);
        expect(question.type).toBe(mode);
        expect(question.answer).toBeTypeOf('number');
        expect(question.operator).toBeTruthy();
        expect(question.hint).toBeTruthy();
      }
    );

    it('creates a question for mix mode using one of the core types', () => {
      const question = createQuestionForMode('mix');
      expect(['sum', 'sub', 'mul2', 'mul3']).toContain(question.type);
    });

    it('sum answer equals left + right', () => {
      const question = createQuestionForMode('sum');
      expect(question.answer).toBe(question.left + question.right);
    });

    it('sub answer equals left - right and is positive', () => {
      const question = createQuestionForMode('sub');
      expect(question.answer).toBe(question.left - question.right);
      expect(question.answer).toBeGreaterThan(0);
    });

    it('mul2 left operand is 2 digits', () => {
      const question = createQuestionForMode('mul2');
      expect(String(question.left).length).toBe(2);
    });

    it('mul3 left operand is 3 digits', () => {
      const question = createQuestionForMode('mul3');
      expect(String(question.left).length).toBe(3);
    });
  });

  describe('getStarsForMistakes', () => {
    it('returns 3 for 0 mistakes', () => {
      expect(getStarsForMistakes(0)).toBe(3);
    });

    it('returns 2 for 1 mistake', () => {
      expect(getStarsForMistakes(1)).toBe(2);
    });

    it('returns 1 for 2 or more mistakes', () => {
      expect(getStarsForMistakes(2)).toBe(1);
      expect(getStarsForMistakes(5)).toBe(1);
    });
  });

  describe('getRoundMessage', () => {
    it('returns spectactular message for 26+ stars', () => {
      expect(getRoundMessage(26)).toBe('Ronda espectacular');
      expect(getRoundMessage(30)).toBe('Ronda espectacular');
    });

    it('returns good job message for 18-25 stars', () => {
      expect(getRoundMessage(18)).toBe('Buen trabajo');
      expect(getRoundMessage(25)).toBe('Buen trabajo');
    });

    it('returns keep training for under 18 stars', () => {
      expect(getRoundMessage(17)).toBe('Sigue entrenando');
      expect(getRoundMessage(0)).toBe('Sigue entrenando');
    });
  });

  describe('createNotebookLayout for standard operations', () => {
    it('creates a standard sum layout', () => {
      const layout = createNotebookLayout({ type: 'sum', left: 456, right: 789, operator: '+', answer: 1245 });
      expect(layout.variant).toBe('standard');
      expect(layout.helperMode).toBe('carry');
    });

    it('creates a standard sub layout', () => {
      const layout = createNotebookLayout({ type: 'sub', left: 456, right: 123, operator: '-', answer: 333 });
      expect(layout.variant).toBe('standard');
      expect(layout.helperMode).toBe('rewrite-top');
    });
  });
});
