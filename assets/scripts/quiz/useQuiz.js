export let questions = [];
let currentQuestionIndex = 0;

export function getCurrentQuestion() {
  return questions[currentQuestionIndex];
}

export function goToNextQuestion() {
  currentQuestionIndex++;
}

export function getQuestions() {
  return questions;
}

async function fetchTriviaQuestions() {
  const queryParams = { amount: 12, type: 'boolean' };
  const queryString = Object.keys(queryParams)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(queryParams[key])}`)
    .join("&");

  const response = await fetch(`https://trivia-api-fe683df325a4.herokuapp.com/trivia?${queryString}`);
  const data = await response.json();

  if (data) {
    questions = data.map(q => {
      return {
        question: q.question,
        type: q.type,
        correctAnswer: q.correct_answer,
        incorrectAnswers: q.incorrect_answers || []
      };
    });
  } else {
    throw new Error("No data received");
  }
}

export async function initializeQuiz() {
  await fetchTriviaQuestions();
}
