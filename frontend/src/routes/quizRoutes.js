// src/routes/quizRoutes.js

import QuizStart from '../components/quiz/QuizStart';
import QuizAttempt from '../components/quiz/QuizAttempt';
import QuizResults from '../components/quiz/QuizResults';

export const quizRoutes = [
    {
        path: "/quiz/:quizId",
        element: QuizStart
    },
    {
        path: "/quiz/:quizId/attempt/:attemptId",
        element: QuizAttempt
    },
    {
        path: "/quiz/:quizId/results/:attemptId",
        element: QuizResults
    }
];