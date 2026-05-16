import { AXES, QUESTIONS, RESPONSES } from './data.js';

/**
 * @param {Record<number, number>} answers — question index → response value
 * @returns {Record<string, number>} axis name → score 0–10
 */
export function computeScores(answers) {
  const scores = {};
  for (const axis of AXES) {
    const axisQuestions = QUESTIONS
      .map((q, i) => ({ ...q, index: i }))
      .filter(q => q.axis === axis);
    let total = 0;
    for (const q of axisQuestions) {
      const v = answers[q.index] !== undefined ? answers[q.index] : 2; // default to neutral
      total += q.reverse ? (4 - v) : v;
    }
    scores[axis] = parseFloat(((total / 16) * 10).toFixed(1));
  }
  return scores;
}

export function createQuiz() {
  let current = 0;
  const answers = {};

  return {
    get current() { return current; },
    get total() { return QUESTIONS.length; },
    get isComplete() { return current >= QUESTIONS.length; },
    get question() { return QUESTIONS[current]; },
    get progress() { return Math.round((current / QUESTIONS.length) * 100); },
    get stepLabel() { return `${current + 1} / ${QUESTIONS.length}`; },

    answer(value) {
      answers[current] = value;
      current++;
      return this.isComplete;
    },

    back() {
      if (current > 0) current--;
    },

    getAnswers() { return { ...answers }; },
    getScores() { return computeScores(answers); }
  };
}
