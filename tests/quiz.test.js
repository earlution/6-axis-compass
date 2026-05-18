const fs = require('fs');
const path = require('path');

function loadModule(file) {
  const code = fs.readFileSync(path.join(__dirname, '..', 'src', file), 'utf-8');
  // Strip imports and exports for direct evaluation
  return code
    .replace(/^\s*import\s+.*from\s+['"].*['"];?\s*$/gm, '')
    .replace(/^\s*export\s+/gm, '');
}

// Load data.js then quiz.js into a function scope and extract bindings
const { computeScores, createQuiz, QUESTIONS } = (() => {
  const code = loadModule('data.js') + '\n' + loadModule('quiz.js') + '; return { computeScores, createQuiz, QUESTIONS };';
  return new Function(code)();
})();

function assertEqual(actual, expected, message) {
  const sortObj = obj => {
    if (typeof obj !== 'object' || obj === null) return obj;
    if (Array.isArray(obj)) return obj.map(sortObj);
    const sorted = {};
    Object.keys(obj).sort().forEach(k => sorted[k] = sortObj(obj[k]));
    return sorted;
  };
  const a = JSON.stringify(sortObj(actual));
  const e = JSON.stringify(sortObj(expected));
  if (a !== e) {
    console.error(`FAIL: ${message}`);
    console.error(`  Expected: ${e}`);
    console.error(`  Actual:   ${a}`);
    process.exit(1);
  }
}

// Test 1: All neutral answers → all scores = 5.0
const neutral = {};
for (let i = 0; i < 24; i++) neutral[i] = 2;
assertEqual(computeScores(neutral), {
  Cultural: 5.0, Economic: 5.0, Military: 5.0,
  Sovereignty: 5.0, 'Governance': 5.0, Class: 5.0
}, 'All neutral should yield 5.0 per axis');

// Test 2: All strongly agree → 5.0 per axis (balanced by reverse questions)
const agree = {};
for (let i = 0; i < 24; i++) agree[i] = 4;
assertEqual(computeScores(agree), {
  Cultural: 5.0, Economic: 5.0, Military: 5.0,
  Sovereignty: 5.0, 'Governance': 5.0, Class: 5.0
}, 'All agree should yield 5.0 per axis due to reverse scoring');

// Test 3: All strongly disagree → 5.0 per axis (balanced by reverse questions)
const disagree = {};
for (let i = 0; i < 24; i++) disagree[i] = 0;
assertEqual(computeScores(disagree), {
  Cultural: 5.0, Economic: 5.0, Military: 5.0,
  Sovereignty: 5.0, 'Governance': 5.0, Class: 5.0
}, 'All disagree should yield 5.0 per axis due to reverse scoring');

// Test 3b: Forward=4, Reverse=0 → maximum score per axis
const maxAnswers = {};
QUESTIONS.forEach((q, i) => {
  maxAnswers[i] = q.reverse ? 0 : 4;
});
assertEqual(computeScores(maxAnswers), {
  Cultural: 10, Economic: 10, Military: 10,
  Sovereignty: 10, 'Governance': 10, Class: 10
}, 'Forward=4, Reverse=0 should yield 10 per axis');

// Test 3c: Forward=0, Reverse=4 → minimum score per axis
const minAnswers = {};
QUESTIONS.forEach((q, i) => {
  minAnswers[i] = q.reverse ? 4 : 0;
});
assertEqual(computeScores(minAnswers), {
  Cultural: 0, Economic: 0, Military: 0,
  Sovereignty: 0, 'Governance': 0, Class: 0
}, 'Forward=0, Reverse=4 should yield 0 per axis');

// Test 4: createQuiz basic state
const quiz = createQuiz();
assertEqual(quiz.current, 0, 'Quiz starts at question 0');
assertEqual(quiz.total, 24, 'Quiz has 24 questions');
assertEqual(quiz.isComplete, false, 'Quiz is not complete initially');
assertEqual(quiz.progress, 0, 'Progress starts at 0%');
assertEqual(quiz.stepLabel, '1 / 24', 'Step label starts at 1/24');

// Test 5: Quiz answer progression
quiz.answer(3);
assertEqual(quiz.current, 1, 'Quiz advances to question 1');
assertEqual(quiz.progress, 4, 'Progress is 4% after 1 question');

// Test 6: Quiz back navigation
quiz.back();
assertEqual(quiz.current, 0, 'Back returns to question 0');

// Test 7: Quiz answers are captured
quiz.answer(4);
quiz.answer(0);
const answers = quiz.getAnswers();
assertEqual(answers[0], 4, 'First answer stored correctly');
assertEqual(answers[1], 0, 'Second answer stored correctly');

console.log('All tests passed');
