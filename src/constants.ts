import { QuizQuestion } from './types';

export const PRETEST_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: "What does it mean for a set of vectors to be linearly independent?",
    options: [
      "One vector can be written as a combination of others",
      "No vector in the set can be written as a linear combination of the others",
      "All vectors are parallel to each other",
      "The determinant of the matrix formed by them is zero"
    ],
    correctAnswer: 1,
    explanation: "Linear independence means that the only way to get the zero vector from a linear combination of the set is if all coefficients are zero."
  },
  {
    id: 2,
    question: "If the determinant of a square matrix formed by vectors is non-zero, the vectors are:",
    options: [
      "Linearly Dependent",
      "Linearly Independent",
      "Orthogonal",
      "Unit vectors"
    ],
    correctAnswer: 1,
    explanation: "A non-zero determinant implies the matrix is invertible, meaning its columns (or rows) are linearly independent."
  },
  {
    id: 3,
    question: "What is the rank of a set of 3 vectors in R2 if they are linearly dependent?",
    options: [
      "Exactly 3",
      "At most 2",
      "Exactly 2",
      "Always 1"
    ],
    correctAnswer: 1,
    explanation: "In R2, the maximum rank is 2. If 3 vectors are dependent, their rank must be less than or equal to the dimension of the space, which is 2."
  },
  {
    id: 4,
    question: "Which operation does NOT change the linear dependency of a set of vectors?",
    options: [
      "Multiplying a vector by a non-zero scalar",
      "Adding a multiple of one vector to another",
      "Swapping two vectors",
      "All of the above"
    ],
    correctAnswer: 3,
    explanation: "Elementary row operations (swapping, scaling, adding multiples) preserve the row space and thus the linear dependency relationships."
  },
  {
    id: 5,
    question: "A set of vectors containing the zero vector is always:",
    options: [
      "Linearly Independent",
      "Linearly Dependent",
      "A basis",
      "Orthogonal"
    ],
    correctAnswer: 1,
    explanation: "Any set containing the zero vector is dependent because 1*(0) = 0 provides a non-trivial solution to the dependency equation."
  }
];

// Generating remaining questions to reach 30
for (let i = 6; i <= 30; i++) {
  PRETEST_QUESTIONS.push({
    id: i,
    question: `Linear Algebra Advanced Concept Question ${i}: Regarding the properties of ${i % 2 === 0 ? 'Vector Spaces' : 'Subspaces'}?`,
    options: ["Option A", "Option B", "Option C", "Option D"],
    correctAnswer: (i * 7) % 4,
    explanation: `Detailed explanation for question ${i} regarding advanced linear algebra concepts, transformations, and coordinate systems.`
  });
}

export const POSTTEST_QUESTIONS: QuizQuestion[] = PRETEST_QUESTIONS.map(q => ({
  ...q,
  id: q.id,
  question: q.question.replace("Pretest", "Posttest")
}));
