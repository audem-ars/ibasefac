// models/sampleQuestions.js

const sampleQuestions = [
    // Multiple Choice Questions - React Beginner
    {
        questionText: "What is the purpose of React's useState hook?",
        questionType: "multiple-choice",
        options: [
            { text: "To handle side effects in components", isCorrect: false },
            { text: "To manage state in functional components", isCorrect: true },
            { text: "To create new components", isCorrect: false },
            { text: "To handle routing in React", isCorrect: false }
        ],
        points: 10,
        difficulty: "beginner",
        category: "React",
        explanation: "useState is a Hook that allows you to add state to functional components in React.",
        hints: [
            { text: "Think about component data management", pointsPenalty: 2 }
        ]
    },
    {
        questionText: "What is JSX in React?",
        questionType: "multiple-choice",
        options: [
            { text: "A JavaScript library", isCorrect: false },
            { text: "A syntax extension for JavaScript that allows HTML-like code in React", isCorrect: true },
            { text: "A new programming language", isCorrect: false },
            { text: "A database query language", isCorrect: false }
        ],
        points: 10,
        difficulty: "beginner",
        category: "React",
        explanation: "JSX is a syntax extension for JavaScript that lets you write HTML-like code within JavaScript.",
        hints: [
            { text: "It's related to writing HTML in React", pointsPenalty: 2 }
        ]
    },

    // Coding Questions - JavaScript Intermediate
    {
        questionText: "Write a function that reverses a string without using the built-in reverse() method",
        questionType: "coding",
        codeSnippet: {
            startingCode: "function reverseString(str) {\n  // Your code here\n}",
            language: "javascript",
            testCases: [
                {
                    input: "hello",
                    expectedOutput: "olleh",
                    description: "Basic string reversal"
                },
                {
                    input: "JavaScript",
                    expectedOutput: "tpircSavaJ",
                    description: "Mixed case string"
                }
            ]
        },
        points: 15,
        difficulty: "intermediate",
        category: "JavaScript",
        explanation: "This tests understanding of string manipulation and loop concepts.",
        hints: [
            { text: "Consider using a for loop", pointsPenalty: 3 },
            { text: "You can convert string to array using split()", pointsPenalty: 3 }
        ]
    },

    // Fill in Blanks - JavaScript Advanced
    {
        questionText: "Complete the Promise chain for handling an API request",
        questionType: "fill-in-blanks",
        fillInBlanks: {
            text: "fetch(url)\n  .___(response => response.json())\n  .___(data => console.log(data))\n  .___(error => console.error(error));",
            blanks: [
                {
                    id: "blank1",
                    acceptableAnswers: ["then"],
                    hint: "Method to handle successful promise resolution"
                },
                {
                    id: "blank2",
                    acceptableAnswers: ["then"],
                    hint: "Chain another success handler"
                },
                {
                    id: "blank3",
                    acceptableAnswers: ["catch"],
                    hint: "Method to handle errors"
                }
            ]
        },
        points: 20,
        difficulty: "advanced",
        category: "JavaScript",
        explanation: "This tests understanding of Promise chaining and asynchronous JavaScript.",
        hints: [
            { text: "Think about Promise methods", pointsPenalty: 4 }
        ]
    },

    // Matching Question - React Components
    {
        questionText: "Match the React concepts with their descriptions",
        questionType: "matching",
        matchingPairs: [
            {
                left: "useState",
                right: "Manages state in functional components"
            },
            {
                left: "useEffect",
                right: "Handles side effects in components"
            },
            {
                left: "useContext",
                right: "Subscribes to React context"
            },
            {
                left: "useRef",
                right: "Persists values between renders"
            }
        ],
        points: 15,
        difficulty: "intermediate",
        category: "React",
        explanation: "These are fundamental React hooks and their primary purposes.",
        hints: [
            { text: "Think about each hook's main purpose", pointsPenalty: 3 }
        ]
    },

    // True/False Question - JavaScript Basics
    {
        questionText: "JavaScript is a statically-typed language",
        questionType: "true-false",
        options: [
            { text: "True", isCorrect: false },
            { text: "False", isCorrect: true }
        ],
        points: 5,
        difficulty: "beginner",
        category: "JavaScript",
        explanation: "JavaScript is a dynamically-typed language, meaning variable types are determined at runtime.",
        hints: [
            { text: "Think about variable declarations in JavaScript", pointsPenalty: 1 }
        ]
    }
];

module.exports = sampleQuestions;

// Example usage in quiz creation:
/*
const Quiz = require('./models/quiz');
const sampleQuestions = require('./models/sampleQuestions');

const newQuiz = new Quiz({
    title: "Web Development Fundamentals",
    description: "Test your knowledge of React and JavaScript",
    questions: sampleQuestions,
    timeLimit: 30,
    passingScore: 70,
    lessonId: 'your-lesson-id',
    moduleId: 'your-module-id',
    courseId: 'your-course-id',
    randomization: {
        enabled: true,
        questionSelection: {
            enabled: true,
            count: 5
        }
    },
    adaptiveSettings: {
        enabled: true,
        initialDifficulty: "beginner"
    }
});
*/