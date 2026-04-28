export interface Vector {
  id: string;
  values: number[]; // [x, y] or [x, y, z]
  color: string;
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface TestResult {
  score: number;
  total: number;
  date: string;
  type: 'pretest' | 'posttest';
}
