// src/components/quiz/questions.js

export const getQuizQuestions = (quizId) => {
    switch(Number(quizId)) {
        case 1: // JavaScript Basics
            return [
                {
                    id: "j1",
                    question: "What is closure in JavaScript?",
                    options: [
                        "A way to close the browser",
                        "A function that retains access to variables from its outer scope",
                        "A method to end a program",
                        "A type of loop"
                    ],
                    correctAnswer: 1
                },
                {
                    id: "j2",
                    question: "What's the difference between let and var?",
                    options: [
                        "There is no difference",
                        "let is block-scoped, var is function-scoped",
                        "var is faster than let",
                        "let is only for numbers"
                    ],
                    correctAnswer: 1
                },
                {
                    id: "j3",
                    question: "What is the purpose of the 'this' keyword in JavaScript?",
                    options: [
                        "To refer to the previous function",
                        "To refer to the current object's context",
                        "To create new variables",
                        "To import modules"
                    ],
                    correctAnswer: 1
                },
                {
                    id: "j4",
                    question: "What is a Promise in JavaScript?",
                    options: [
                        "A guarantee the code has no bugs",
                        "An object representing the eventual completion of an asynchronous operation",
                        "A special type of function",
                        "A way to promise variables won't change"
                    ],
                    correctAnswer: 1
                },
                {
                    id: "j5",
                    question: "What is the difference between == and === in JavaScript?",
                    options: [
                        "They are the same",
                        "=== checks both value and type, == only checks value",
                        "== is faster than ===",
                        "=== is only for numbers"
                    ],
                    correctAnswer: 1
                },
                {
                    id: "j6",
                    question: "What is event bubbling in JavaScript?",
                    options: [
                        "A way to create new events",
                        "When an event triggers on a child element and propagates up through parents",
                        "A method to prevent events",
                        "A way to delete events"
                    ],
                    correctAnswer: 1
                },
                {
                    id: "j7",
                    question: "What is destructuring in JavaScript?",
                    options: [
                        "Breaking down code into files",
                        "A way to extract array elements or object properties into distinct variables",
                        "Removing unused code",
                        "Converting between data types"
                    ],
                    correctAnswer: 1
                },
                {
                    id: "j8",
                    question: "What is the purpose of async/await?",
                    options: [
                        "To make code run faster",
                        "To write asynchronous code that looks synchronous",
                        "To create new functions",
                        "To import modules"
                    ],
                    correctAnswer: 1
                },
                {
                    id: "j9",
                    question: "What is a callback function?",
                    options: [
                        "A function that returns immediately",
                        "A function passed as an argument to another function and executed later",
                        "A function that can only return true or false",
                        "A function that calls itself"
                    ],
                    correctAnswer: 1
                },
                {
                    id: "j10",
                    question: "What is the purpose of the map() method in JavaScript?",
                    options: [
                        "To create a new object",
                        "To create a new array by transforming each element of an existing array",
                        "To merge two arrays",
                        "To remove elements from an array"
                    ],
                    correctAnswer: 1
                }
            ];

        case 2: // React Fundamentals
            return [
                {
                    id: "r1",
                    question: "What is the virtual DOM in React?",
                    options: [
                        "A direct copy of the actual DOM",
                        "A lightweight copy of the actual DOM used for performance optimization",
                        "A programming language",
                        "A web browser feature"
                    ],
                    correctAnswer: 1
                },
                {
                    id: "r2",
                    question: "What is the purpose of useState hook?",
                    options: [
                        "To make HTTP requests",
                        "To manage state in functional components",
                        "To handle routing",
                        "To style components"
                    ],
                    correctAnswer: 1
                },
                {
                    id: "r3",
                    question: "What is the purpose of useEffect hook?",
                    options: [
                        "To create new components",
                        "To handle side effects like data fetching, subscriptions, or DOM manipulation",
                        "To manage state",
                        "To handle routing"
                    ],
                    correctAnswer: 1
                },
                {
                    id: "r4",
                    question: "What is JSX?",
                    options: [
                        "A database language",
                        "A syntax extension for JavaScript that allows writing HTML-like code in React",
                        "A new programming language",
                        "A styling framework"
                    ],
                    correctAnswer: 1
                },
                {
                    id: "r5",
                    question: "What is the purpose of React props?",
                    options: [
                        "To style components",
                        "To pass data from parent to child components",
                        "To create new components",
                        "To handle routing"
                    ],
                    correctAnswer: 1
                },
                {
                    id: "r6",
                    question: "What is React state?",
                    options: [
                        "A database system",
                        "An object that determines how a component renders and behaves",
                        "A styling method",
                        "A routing system"
                    ],
                    correctAnswer: 1
                },
                {
                    id: "r7",
                    question: "What is the purpose of useContext hook?",
                    options: [
                        "To create new contexts",
                        "To consume context and subscribe to context changes",
                        "To manage local state",
                        "To handle routing"
                    ],
                    correctAnswer: 1
                },
                {
                    id: "r8",
                    question: "What are React components?",
                    options: [
                        "CSS files",
                        "Independent, reusable pieces of UI",
                        "Database tables",
                        "JavaScript variables"
                    ],
                    correctAnswer: 1
                },
                {
                    id: "r9",
                    question: "What is prop drilling in React?",
                    options: [
                        "A way to create props",
                        "Passing props through multiple levels of components that don't need them",
                        "A type of component",
                        "A routing method"
                    ],
                    correctAnswer: 1
                },
                {
                    id: "r10",
                    question: "What is the purpose of React.memo?",
                    options: [
                        "To create new components",
                        "To prevent unnecessary re-renders of components",
                        "To handle routing",
                        "To manage state"
                    ],
                    correctAnswer: 1
                }
            ];

        case 3: // CSS Mastery
            return [
                {
                    id: "c1",
                    question: "What is the CSS box model?",
                    options: [
                        "A 3D modeling tool",
                        "A layout concept that includes content, padding, border, and margin",
                        "A JavaScript framework",
                        "A type of selector"
                    ],
                    correctAnswer: 1
                },
                {
                    id: "c2",
                    question: "What is the difference between padding and margin?",
                    options: [
                        "They are the same thing",
                        "Padding is space inside the element, margin is space outside",
                        "Margin is faster than padding",
                        "Padding is only for text"
                    ],
                    correctAnswer: 1
                },
                {
                    id: "c3",
                    question: "What is a CSS preprocessor?",
                    options: [
                        "A tool to minify CSS",
                        "A program that extends CSS with additional features like variables and nesting",
                        "A type of CSS framework",
                        "A browser extension"
                    ],
                    correctAnswer: 1
                },
                {
                    id: "c4",
                    question: "What is the purpose of CSS flexbox?",
                    options: [
                        "To add animations",
                        "To create flexible and responsive layout structures",
                        "To style text",
                        "To handle forms"
                    ],
                    correctAnswer: 1
                },
                {
                    id: "c5",
                    question: "What is CSS Grid?",
                    options: [
                        "A framework",
                        "A two-dimensional layout system for creating complex grid-based layouts",
                        "A type of selector",
                        "A preprocessor"
                    ],
                    correctAnswer: 1
                },
                {
                    id: "c6",
                    question: "What are CSS media queries used for?",
                    options: [
                        "To play media files",
                        "To apply different styles based on device characteristics like screen size",
                        "To import other CSS files",
                        "To create animations"
                    ],
                    correctAnswer: 1
                },
                {
                    id: "c7",
                    question: "What is CSS specificity?",
                    options: [
                        "A CSS framework",
                        "A rule that determines which styles are applied when multiple rules target the same element",
                        "A type of selector",
                        "A preprocessor feature"
                    ],
                    correctAnswer: 1
                },
                {
                    id: "c8",
                    question: "What is the purpose of CSS transitions?",
                    options: [
                        "To create new styles",
                        "To smoothly change property values over a specified duration",
                        "To import fonts",
                        "To handle responsive design"
                    ],
                    correctAnswer: 1
                },
                {
                    id: "c9",
                    question: "What is the difference between display: none and visibility: hidden?",
                    options: [
                        "They are the same",
                        "display: none removes the element from layout flow, visibility: hidden keeps the space",
                        "visibility: hidden is faster",
                        "display: none is only for images"
                    ],
                    correctAnswer: 1
                },
                {
                    id: "c10",
                    question: "What are CSS pseudo-classes?",
                    options: [
                        "Regular CSS classes",
                        "Keywords that specify a special state of an element",
                        "A type of CSS framework",
                        "JavaScript functions"
                    ],
                    correctAnswer: 1
                }
            ];
            case 4: // AI Fundamentals
            return [
                {
                    id: "ai1",
                    question: "What is machine learning?",
                    options: [
                        "Programming computers with explicit rules",
                        "Systems that learn and improve from experience without explicit programming",
                        "A type of computer hardware",
                        "A programming language"
                    ],
                    correctAnswer: 1
                },
                {
                    id: "ai2",
                    question: "What is the difference between supervised and unsupervised learning?",
                    options: [
                        "Supervised learning is faster",
                        "Supervised learning uses labeled data while unsupervised finds patterns in unlabeled data",
                        "Unsupervised learning is always more accurate",
                        "They are the same thing"
                    ],
                    correctAnswer: 1
                },
                {
                    id: "ai3",
                    question: "What is deep learning?",
                    options: [
                        "Learning while sleeping",
                        "A subset of machine learning using neural networks with multiple layers",
                        "Traditional programming",
                        "A type of database"
                    ],
                    correctAnswer: 1
                },
                {
                    id: "ai4",
                    question: "What is a neural network?",
                    options: [
                        "A computer network",
                        "A mathematical model inspired by biological neurons that processes information through layers",
                        "A type of computer memory",
                        "A programming language"
                    ],
                    correctAnswer: 1
                },
                {
                    id: "ai5",
                    question: "What is training data used for?",
                    options: [
                        "Testing the final model",
                        "Teaching the AI model patterns and relationships",
                        "Storing results",
                        "Documentation"
                    ],
                    correctAnswer: 1
                },
                {
                    id: "ai6",
                    question: "What is overfitting?",
                    options: [
                        "When a model is too simple",
                        "When a model learns training data too well and performs poorly on new data",
                        "When training is too fast",
                        "When the model is too small"
                    ],
                    correctAnswer: 1
                },
                {
                    id: "ai7",
                    question: "What is reinforcement learning?",
                    options: [
                        "Learning from books",
                        "Learning through trial and error with rewards and penalties",
                        "Learning from labeled data",
                        "Learning without data"
                    ],
                    correctAnswer: 1
                },
                {
                    id: "ai8",
                    question: "What is an algorithm?",
                    options: [
                        "A type of computer",
                        "A step-by-step procedure for solving a problem or accomplishing a task",
                        "A programming language",
                        "A type of data"
                    ],
                    correctAnswer: 1
                },
                {
                    id: "ai9",
                    question: "What is natural language processing (NLP)?",
                    options: [
                        "Processing programming languages",
                        "The field of AI focused on understanding and generating human language",
                        "Data encryption",
                        "Image processing"
                    ],
                    correctAnswer: 1
                },
                {
                    id: "ai10",
                    question: "What is computer vision?",
                    options: [
                        "Computer screens",
                        "The field of AI focused on helping computers understand and process visual information",
                        "Virtual reality",
                        "3D printing"
                    ],
                    correctAnswer: 1
                }
            ];

        case 5: // AI Ethics
            return [
                {
                    id: "e1",
                    question: "What is algorithmic bias?",
                    options: [
                        "Computer errors",
                        "When AI systems reflect and amplify existing societal biases",
                        "System crashes",
                        "Slow processing"
                    ],
                    correctAnswer: 1
                },
                {
                    id: "e2",
                    question: "What is AI transparency?",
                    options: [
                        "Invisible AI",
                        "The ability to understand and explain how AI systems make decisions",
                        "Clear computer screens",
                        "Fast processing"
                    ],
                    correctAnswer: 1
                },
                {
                    id: "e3",
                    question: "Why is data privacy important in AI?",
                    options: [
                        "It makes AI faster",
                        "It protects individual rights and prevents misuse of personal information",
                        "It's not important",
                        "It saves storage space"
                    ],
                    correctAnswer: 1
                },
                {
                    id: "e4",
                    question: "What is AI accountability?",
                    options: [
                        "AI financial systems",
                        "The principle that AI systems and their creators should be responsible for their decisions",
                        "AI documentation",
                        "AI marketing"
                    ],
                    correctAnswer: 1
                },
                {
                    id: "e5",
                    question: "What is fairness in AI?",
                    options: [
                        "Equal processing speed",
                        "Ensuring AI systems treat all groups of people equitably",
                        "Low cost AI",
                        "AI competition"
                    ],
                    correctAnswer: 1
                },
                {
                    id: "e6",
                    question: "What is the role of human oversight in AI?",
                    options: [
                        "To slow down AI",
                        "To ensure AI systems operate safely and ethically",
                        "To reduce costs",
                        "To make AI faster"
                    ],
                    correctAnswer: 1
                },
                {
                    id: "e7",
                    question: "What is AI safety?",
                    options: [
                        "Physical security",
                        "Ensuring AI systems behave reliably and don't cause unintended harm",
                        "Computer warranties",
                        "Data backup"
                    ],
                    correctAnswer: 1
                },
                {
                    id: "e8",
                    question: "What is informed consent in AI?",
                    options: [
                        "AI agreements",
                        "People understanding and agreeing to how their data will be used by AI",
                        "Software licenses",
                        "Terms of service"
                    ],
                    correctAnswer: 1
                },
                {
                    id: "e9",
                    question: "What is AI governance?",
                    options: [
                        "AI control panels",
                        "Framework of guidelines and regulations for responsible AI development",
                        "Computer management",
                        "System settings"
                    ],
                    correctAnswer: 1
                },
                {
                    id: "e10",
                    question: "What is digital privacy?",
                    options: [
                        "Password protection",
                        "The right to control personal information in digital systems",
                        "Private networks",
                        "Secure hardware"
                    ],
                    correctAnswer: 1
                }
            ];

        case 6: // Machine Learning Basics
            return [
                {
                    id: "ml1",
                    question: "What is a feature in machine learning?",
                    options: [
                        "A product feature",
                        "An input variable used to make predictions",
                        "A software update",
                        "A type of bug"
                    ],
                    correctAnswer: 1
                },
                {
                    id: "ml2",
                    question: "What is classification in machine learning?",
                    options: [
                        "Organizing files",
                        "Predicting a categorical label for input data",
                        "Data storage",
                        "Password protection"
                    ],
                    correctAnswer: 1
                },
                {
                    id: "ml3",
                    question: "What is regression in machine learning?",
                    options: [
                        "Going backwards",
                        "Predicting a continuous numerical value",
                        "Data deletion",
                        "System recovery"
                    ],
                    correctAnswer: 1
                },
                {
                    id: "ml4",
                    question: "What is cross-validation?",
                    options: [
                        "Checking passwords",
                        "A technique to assess model performance on different data subsets",
                        "Data backup",
                        "System testing"
                    ],
                    correctAnswer: 1
                },
                {
                    id: "ml5",
                    question: "What is a dataset?",
                    options: [
                        "A computer setting",
                        "A collection of data used for training and testing ML models",
                        "A type of network",
                        "A software license"
                    ],
                    correctAnswer: 1
                },
                {
                    id: "ml6",
                    question: "What is model validation?",
                    options: [
                        "Software validation",
                        "Evaluating a model's performance on unseen data",
                        "Password verification",
                        "System updates"
                    ],
                    correctAnswer: 1
                },
                {
                    id: "ml7",
                    question: "What is data preprocessing?",
                    options: [
                        "Data deletion",
                        "Cleaning and preparing data before training a model",
                        "Data storage",
                        "File compression"
                    ],
                    correctAnswer: 1
                },
                {
                    id: "ml8",
                    question: "What is feature selection?",
                    options: [
                        "Choosing products",
                        "Choosing the most relevant variables for a model",
                        "Software selection",
                        "Hardware upgrades"
                    ],
                    correctAnswer: 1
                },
                {
                    id: "ml9",
                    question: "What is a training set?",
                    options: [
                        "Exercise equipment",
                        "Data used to teach a model patterns and relationships",
                        "User manual",
                        "Software tutorial"
                    ],
                    correctAnswer: 1
                },
                {
                    id: "ml10",
                    question: "What is model deployment?",
                    options: [
                        "Military deployment",
                        "Making a trained model available for use in real applications",
                        "Software installation",
                        "Hardware setup"
                    ],
                    correctAnswer: 1
                }
            ];
            case 7: // Computer Vision
            return [
                {
                    id: "cv1",
                    question: "What is image segmentation?",
                    options: [
                        "Dividing images into files",
                        "Partitioning images into meaningful segments or objects",
                        "Image compression",
                        "Image deletion"
                    ],
                    correctAnswer: 1
                },
                {
                    id: "cv2",
                    question: "What is object detection?",
                    options: [
                        "Finding lost items",
                        "Identifying and locating specific objects within images",
                        "Scanning barcodes",
                        "Taking photos"
                    ],
                    correctAnswer: 1
                },
                {
                    id: "cv3",
                    question: "What is facial recognition?",
                    options: [
                        "Looking at faces",
                        "Technology that identifies people by analyzing facial features",
                        "Face painting",
                        "Photo editing"
                    ],
                    correctAnswer: 1
                },
                {
                    id: "cv4",
                    question: "What are convolutional neural networks?",
                    options: [
                        "Regular networks",
                        "Neural networks specialized for processing visual data",
                        "Computer networks",
                        "Social networks"
                    ],
                    correctAnswer: 1
                },
                {
                    id: "cv5",
                    question: "What is feature extraction in computer vision?",
                    options: [
                        "Removing features",
                        "Identifying distinctive visual patterns and characteristics",
                        "Adding features",
                        "Feature films"
                    ],
                    correctAnswer: 1
                },
                {
                    id: "cv6",
                    question: "What is image classification?",
                    options: [
                        "Organizing photos",
                        "Categorizing images into predefined classes",
                        "Image editing",
                        "File storage"
                    ],
                    correctAnswer: 1
                },
                {
                    id: "cv7",
                    question: "What is optical character recognition (OCR)?",
                    options: [
                        "Reading glasses",
                        "Technology that converts text images into machine-readable text",
                        "Character design",
                        "Writing tools"
                    ],
                    correctAnswer: 1
                },
                {
                    id: "cv8",
                    question: "What is pose estimation?",
                    options: [
                        "Yoga positions",
                        "Detecting human body positions and movements in images",
                        "Camera angles",
                        "Photo poses"
                    ],
                    correctAnswer: 1
                },
                {
                    id: "cv9",
                    question: "What is semantic segmentation?",
                    options: [
                        "Language processing",
                        "Assigning each pixel in an image to a specific class or category",
                        "Data segmentation",
                        "File splitting"
                    ],
                    correctAnswer: 1
                },
                {
                    id: "cv10",
                    question: "What is image preprocessing?",
                    options: [
                        "Photo editing",
                        "Preparing images for analysis by adjusting quality and format",
                        "Image storage",
                        "Taking photos"
                    ],
                    correctAnswer: 1
                }
            ];

        case 8: // Natural Language Processing
            return [
                {
                    id: "nlp1",
                    question: "What is tokenization?",
                    options: [
                        "Creating tokens",
                        "Breaking text into smaller units like words or subwords",
                        "Cryptocurrency",
                        "Password creation"
                    ],
                    correctAnswer: 1
                },
                {
                    id: "nlp2",
                    question: "What is sentiment analysis?",
                    options: [
                        "Emotional therapy",
                        "Determining the emotional tone or opinion in text",
                        "Data analysis",
                        "Market research"
                    ],
                    correctAnswer: 1
                },
                {
                    id: "nlp3",
                    question: "What is named entity recognition?",
                    options: [
                        "Name tags",
                        "Identifying and classifying named entities (people, organizations, locations) in text",
                        "Business naming",
                        "Brand recognition"
                    ],
                    correctAnswer: 1
                },
                {
                    id: "nlp4",
                    question: "What is machine translation?",
                    options: [
                        "Machine manuals",
                        "Automatically translating text from one language to another",
                        "Code conversion",
                        "Language learning"
                    ],
                    correctAnswer: 1
                },
                {
                    id: "nlp5",
                    question: "What is text summarization?",
                    options: [
                        "Text editing",
                        "Automatically generating concise summaries of longer texts",
                        "Note taking",
                        "Book reviews"
                    ],
                    correctAnswer: 1
                },
                {
                    id: "nlp6",
                    question: "What is part-of-speech tagging?",
                    options: [
                        "Label making",
                        "Identifying grammatical parts of speech in text",
                        "Speech writing",
                        "Grammar checking"
                    ],
                    correctAnswer: 1
                },
                {
                    id: "nlp7",
                    question: "What is text classification?",
                    options: [
                        "Filing documents",
                        "Categorizing text into predefined categories",
                        "Book organization",
                        "Library systems"
                    ],
                    correctAnswer: 1
                },
                {
                    id: "nlp8",
                    question: "What are word embeddings?",
                    options: [
                        "Word art",
                        "Vector representations of words capturing semantic meanings",
                        "Font styles",
                        "Text decoration"
                    ],
                    correctAnswer: 1
                },
                {
                    id: "nlp9",
                    question: "What is language modeling?",
                    options: [
                        "Fashion modeling",
                        "Predicting the probability of sequences of words",
                        "3D modeling",
                        "Data modeling"
                    ],
                    correctAnswer: 1
                },
                {
                    id: "nlp10",
                    question: "What is information extraction?",
                    options: [
                        "Data mining",
                        "Automatically extracting structured information from unstructured text",
                        "Web scraping",
                        "File extraction"
                    ],
                    correctAnswer: 1
                }
            ];

        case 9: // AI Applications
            return [
                {
                    id: "app1",
                    question: "What is a recommendation system?",
                    options: [
                        "Advice columns",
                        "AI systems that suggest items based on user preferences and behavior",
                        "System requirements",
                        "Product reviews"
                    ],
                    correctAnswer: 1
                },
                {
                    id: "app2",
                    question: "What is predictive maintenance?",
                    options: [
                        "Regular checkups",
                        "Using AI to predict when equipment needs maintenance",
                        "Equipment repair",
                        "Safety inspections"
                    ],
                    correctAnswer: 1
                },
                {
                    id: "app3",
                    question: "What are chatbots?",
                    options: [
                        "Chat rooms",
                        "AI programs that simulate human conversation",
                        "Messaging apps",
                        "Phone systems"
                    ],
                    correctAnswer: 1
                },
                {
                    id: "app4",
                    question: "What is autonomous driving?",
                    options: [
                        "Manual driving",
                        "Vehicles that use AI to navigate without human input",
                        "Driver training",
                        "Traffic control"
                    ],
                    correctAnswer: 1
                },
                {
                    id: "app5",
                    question: "What is fraud detection?",
                    options: [
                        "Security cameras",
                        "Using AI to identify suspicious financial transactions",
                        "Password protection",
                        "Insurance claims"
                    ],
                    correctAnswer: 1
                },
                {
                    id: "app6",
                    question: "What is medical imaging AI?",
                    options: [
                        "Photography",
                        "AI systems that analyze medical images for diagnosis",
                        "Image editing",
                        "Hospital equipment"
                    ],
                    correctAnswer: 1
                },
                {
                    id: "app7",
                    question: "What is smart home automation?",
                    options: [
                        "Home renovation",
                        "AI systems controlling home devices and environment",
                        "Security systems",
                        "Energy savings"
                    ],
                    correctAnswer: 1
                },
                {
                    id: "app8",
                    question: "What is AI in gaming?",
                    options: [
                        "Video games",
                        "AI systems controlling game characters and environments",
                        "Game design",
                        "Player profiles"
                    ],
                    correctAnswer: 1
                },
                {
                    id: "app9",
                    question: "What is AI in agriculture?",
                    options: [
                        "Traditional farming",
                        "Using AI for crop monitoring and optimization",
                        "Farm equipment",
                        "Weather forecasting"
                    ],
                    correctAnswer: 1
                },
                {
                    id: "app10",
                    question: "What is AI in customer service?",
                    options: [
                        "Phone support",
                        "Using AI to handle customer inquiries and support",
                        "Help desks",
                        "Call centers"
                    ],
                    correctAnswer: 1
                }
            ];
            case 10: // AI Security
            return [
                {
                    id: "sec1",
                    question: "What is AI-powered threat detection?",
                    options: [
                        "Basic antivirus",
                        "Using AI to identify and respond to security threats in real-time",
                        "Manual security checks",
                        "Password management"
                    ],
                    correctAnswer: 1
                },
                {
                    id: "sec2",
                    question: "What is adversarial machine learning?",
                    options: [
                        "Regular training",
                        "Techniques to fool or manipulate AI systems with malicious inputs",
                        "Model optimization",
                        "Data cleaning"
                    ],
                    correctAnswer: 1
                },
                {
                    id: "sec3",
                    question: "What is AI model robustness?",
                    options: [
                        "Physical strength",
                        "An AI system's ability to perform well under various conditions and attacks",
                        "System speed",
                        "Code quality"
                    ],
                    correctAnswer: 1
                },
                {
                    id: "sec4",
                    question: "What is privacy-preserving machine learning?",
                    options: [
                        "Data deletion",
                        "Training AI models while protecting sensitive data",
                        "Password protection",
                        "Encryption"
                    ],
                    correctAnswer: 1
                },
                {
                    id: "sec5",
                    question: "What is model poisoning?",
                    options: [
                        "Data corruption",
                        "Deliberately tampering with training data to compromise AI models",
                        "System errors",
                        "Hardware damage"
                    ],
                    correctAnswer: 1
                },
                {
                    id: "sec6",
                    question: "What is AI authentication?",
                    options: [
                        "Password checking",
                        "Using AI to verify user identities through various methods",
                        "Login systems",
                        "Security cameras"
                    ],
                    correctAnswer: 1
                },
                {
                    id: "sec7",
                    question: "What is model extraction?",
                    options: [
                        "Data backup",
                        "Stealing AI model functionality through repeated queries",
                        "File copying",
                        "Code sharing"
                    ],
                    correctAnswer: 1
                },
                {
                    id: "sec8",
                    question: "What is secure AI deployment?",
                    options: [
                        "Regular deployment",
                        "Implementing AI systems with proper security measures and monitoring",
                        "Software updates",
                        "System backup"
                    ],
                    correctAnswer: 1
                },
                {
                    id: "sec9",
                    question: "What is AI-based anomaly detection?",
                    options: [
                        "Error checking",
                        "Using AI to identify unusual patterns that may indicate security threats",
                        "Quality control",
                        "Testing"
                    ],
                    correctAnswer: 1
                },
                {
                    id: "sec10",
                    question: "What is differential privacy?",
                    options: [
                        "Data sorting",
                        "Mathematical framework for sharing data while protecting individual privacy",
                        "File organization",
                        "Access control"
                    ],
                    correctAnswer: 1
                }
            ];

        case 11: // AI Infrastructure
            return [
                {
                    id: "inf1",
                    question: "What is cloud computing in AI?",
                    options: [
                        "Weather forecasting",
                        "Using remote servers to run AI workloads",
                        "Local processing",
                        "Data storage"
                    ],
                    correctAnswer: 1
                },
                {
                    id: "inf2",
                    question: "What are GPUs in AI?",
                    options: [
                        "Display devices",
                        "Specialized processors that accelerate AI computations",
                        "Memory units",
                        "Network cards"
                    ],
                    correctAnswer: 1
                },
                {
                    id: "inf3",
                    question: "What is distributed training?",
                    options: [
                        "Online courses",
                        "Training AI models across multiple machines or processors",
                        "Local training",
                        "Manual training"
                    ],
                    correctAnswer: 1
                },
                {
                    id: "inf4",
                    question: "What is model serving?",
                    options: [
                        "Food service",
                        "Deploying AI models to handle production workloads",
                        "Customer service",
                        "Data storage"
                    ],
                    correctAnswer: 1
                },
                {
                    id: "inf5",
                    question: "What is containerization in AI?",
                    options: [
                        "Storage boxes",
                        "Packaging AI applications with their dependencies",
                        "Shipping containers",
                        "Data organization"
                    ],
                    correctAnswer: 1
                },
                {
                    id: "inf6",
                    question: "What is model versioning?",
                    options: [
                        "Version numbers",
                        "Tracking different iterations of AI models",
                        "Software updates",
                        "Data backup"
                    ],
                    correctAnswer: 1
                },
                {
                    id: "inf7",
                    question: "What is orchestration in AI?",
                    options: [
                        "Music playing",
                        "Managing and coordinating AI workloads and resources",
                        "Task scheduling",
                        "System monitoring"
                    ],
                    correctAnswer: 1
                },
                {
                    id: "inf8",
                    question: "What is model optimization?",
                    options: [
                        "Cost cutting",
                        "Improving AI model performance and efficiency",
                        "Speed testing",
                        "Quality control"
                    ],
                    correctAnswer: 1
                },
                {
                    id: "inf9",
                    question: "What is inference optimization?",
                    options: [
                        "Logical reasoning",
                        "Making AI model predictions faster and more efficient",
                        "Data processing",
                        "System upgrades"
                    ],
                    correctAnswer: 1
                },
                {
                    id: "inf10",
                    question: "What is AI pipeline automation?",
                    options: [
                        "Plumbing systems",
                        "Automating the process of training and deploying AI models",
                        "Manual processes",
                        "Data flow"
                    ],
                    correctAnswer: 1
                }
            ];

        case 12: // AI Development
            return [
                {
                    id: "dev1",
                    question: "What is model architecture?",
                    options: [
                        "Building design",
                        "The structure and organization of an AI model's components",
                        "System design",
                        "Code structure"
                    ],
                    correctAnswer: 1
                },
                {
                    id: "dev2",
                    question: "What is hyperparameter tuning?",
                    options: [
                        "Radio tuning",
                        "Adjusting model parameters to optimize performance",
                        "System settings",
                        "Code optimization"
                    ],
                    correctAnswer: 1
                },
                {
                    id: "dev3",
                    question: "What is transfer learning?",
                    options: [
                        "Data transfer",
                        "Using pre-trained models as starting points for new tasks",
                        "Knowledge sharing",
                        "Model copying"
                    ],
                    correctAnswer: 1
                },
                {
                    id: "dev4",
                    question: "What is model evaluation?",
                    options: [
                        "Price evaluation",
                        "Assessing AI model performance using various metrics",
                        "System testing",
                        "Quality control"
                    ],
                    correctAnswer: 1
                },
                {
                    id: "dev5",
                    question: "What is feature engineering?",
                    options: [
                        "Engineering design",
                        "Creating and selecting relevant input features for AI models",
                        "Data processing",
                        "System development"
                    ],
                    correctAnswer: 1
                },
                {
                    id: "dev6",
                    question: "What is model debugging?",
                    options: [
                        "Pest control",
                        "Identifying and fixing issues in AI models",
                        "Code testing",
                        "Error checking"
                    ],
                    correctAnswer: 1
                },
                {
                    id: "dev7",
                    question: "What is ensemble learning?",
                    options: [
                        "Group performance",
                        "Combining multiple AI models to improve performance",
                        "Team training",
                        "Model collection"
                    ],
                    correctAnswer: 1
                },
                {
                    id: "dev8",
                    question: "What is model interpretability?",
                    options: [
                        "Language translation",
                        "Understanding how AI models make decisions",
                        "Code reading",
                        "Data analysis"
                    ],
                    correctAnswer: 1
                },
                {
                    id: "dev9",
                    question: "What is data augmentation?",
                    options: [
                        "Data storage",
                        "Creating variations of training data to improve model performance",
                        "Data backup",
                        "Information copying"
                    ],
                    correctAnswer: 1
                },
                {
                    id: "dev10",
                    question: "What is model compression?",
                    options: [
                        "File compression",
                        "Reducing AI model size while maintaining performance",
                        "Data reduction",
                        "Storage optimization"
                    ],
                    correctAnswer: 1
                }
            ];
            case 13: // Advanced Machine Learning
    return [
        {
            id: "aml1",
            question: "What is ensemble stacking in machine learning?",
            options: [
                "Simple model combination",
                "A meta-learning technique that combines multiple models using another model to learn optimal weights",
                "Random model selection",
                "Sequential model training"
            ],
            correctAnswer: 1
        },
        {
            id: "aml2",
            question: "What is the concept of model distillation?",
            options: [
                "Model compression",
                "Training a smaller model to mimic a larger model's behavior while maintaining performance",
                "Model deletion",
                "Random sampling"
            ],
            correctAnswer: 1
        },
        {
            id: "aml3",
            question: "What are Gaussian Processes in machine learning?",
            options: [
                "Random number generators",
                "Probabilistic models that define distributions over functions for uncertainty estimation",
                "Data preprocessing methods",
                "Model evaluation metrics"
            ],
            correctAnswer: 1
        },
        {
            id: "aml4",
            question: "What is meta-learning?",
            options: [
                "Basic model training",
                "Training models to learn how to learn, adapting quickly to new tasks",
                "Data organization",
                "Parameter tuning"
            ],
            correctAnswer: 1
        },
        {
            id: "aml5",
            question: "What are variational autoencoders (VAEs)?",
            options: [
                "Simple neural networks",
                "Generative models that learn probabilistic latent representations of data",
                "Data compression tools",
                "Classification models"
            ],
            correctAnswer: 1
        },
        {
            id: "aml6",
            question: "What is curriculum learning?",
            options: [
                "Standard training",
                "Training models on increasingly difficult examples to improve learning efficiency",
                "Random training",
                "One-shot learning"
            ],
            correctAnswer: 1
        },
        {
            id: "aml7",
            question: "What are energy-based models?",
            options: [
                "Power consumption models",
                "Models that learn to assign low energy to correct configurations and high energy to incorrect ones",
                "Efficiency metrics",
                "Resource management systems"
            ],
            correctAnswer: 1
        },
        {
            id: "aml8",
            question: "What is contrastive learning?",
            options: [
                "Supervised learning",
                "Learning representations by comparing similar and dissimilar examples",
                "Model comparison",
                "Data labeling"
            ],
            correctAnswer: 1
        },
        {
            id: "aml9",
            question: "What are normalizing flows?",
            options: [
                "Data normalization",
                "Invertible neural networks that transform simple distributions into complex ones",
                "Network architecture",
                "Training algorithms"
            ],
            correctAnswer: 1
        },
        {
            id: "aml10",
            question: "What is multi-task learning?",
            options: [
                "Single task focus",
                "Training models to perform multiple related tasks simultaneously, sharing knowledge between tasks",
                "Task scheduling",
                "Sequential learning"
            ],
            correctAnswer: 1
        }
    ];

case 14: // Advanced Neural Architectures
    return [
        {
            id: "ana1",
            question: "What are attention mechanisms in transformers?",
            options: [
                "Simple weight calculations",
                "Components that dynamically weight input elements based on their relevance to the current task",
                "Random selection process",
                "Static neural connections"
            ],
            correctAnswer: 1
        },
        {
            id: "ana2",
            question: "What is neural architecture search (NAS)?",
            options: [
                "Manual model design",
                "Automated process of discovering optimal neural network architectures for specific tasks",
                "Random architecture selection",
                "Fixed architecture templates"
            ],
            correctAnswer: 1
        },
        {
            id: "ana3",
            question: "What are capsule networks?",
            options: [
                "Regular neural networks",
                "Networks that use groups of neurons to represent hierarchical relationships and spatial information",
                "Data containers",
                "Training algorithms"
            ],
            correctAnswer: 1
        },
        {
            id: "ana4",
            question: "What are graph neural networks (GNNs)?",
            options: [
                "Flow charts",
                "Neural networks that operate on graph-structured data, processing nodes and edges",
                "Visualization tools",
                "Data structures"
            ],
            correctAnswer: 1
        },
        {
            id: "ana5",
            question: "What is a mixture of experts (MoE) architecture?",
            options: [
                "Team collaboration",
                "Neural network that routes inputs to specialized sub-networks for processing",
                "Expert systems",
                "Decision trees"
            ],
            correctAnswer: 1
        },
        {
            id: "ana6",
            question: "What are memory-augmented neural networks?",
            options: [
                "Large storage systems",
                "Networks with explicit memory components for storing and retrieving information",
                "Cache systems",
                "Data buffers"
            ],
            correctAnswer: 1
        },
        {
            id: "ana7",
            question: "What are neural ordinary differential equations (Neural ODEs)?",
            options: [
                "Mathematical equations",
                "Continuous-depth neural networks that learn differential equations",
                "Training rules",
                "Loss functions"
            ],
            correctAnswer: 1
        },
        {
            id: "ana8",
            question: "What are sparse transformers?",
            options: [
                "Small networks",
                "Transformer variants that use sparse attention patterns to reduce computational complexity",
                "Data compression",
                "Network pruning"
            ],
            correctAnswer: 1
        },
        {
            id: "ana9",
            question: "What are reversible neural networks?",
            options: [
                "Backward models",
                "Networks designed to conserve information through reversible transformations",
                "Model rollbacks",
                "Training checkpoints"
            ],
            correctAnswer: 1
        },
        {
            id: "ana10",
            question: "What are neural radiance fields (NeRF)?",
            options: [
                "Light sensors",
                "Neural networks that learn to represent and render 3D scenes from 2D images",
                "Graphics engines",
                "Image processors"
            ],
            correctAnswer: 1
        }
    ];

case 15: // Advanced AI Research Methods
    return [
        {
            id: "arm1",
            question: "What is few-shot learning?",
            options: [
                "Regular training",
                "Learning to solve new tasks with very few training examples by leveraging prior knowledge",
                "Large dataset training",
                "Random learning"
            ],
            correctAnswer: 1
        },
        {
            id: "arm2",
            question: "What is self-supervised learning?",
            options: [
                "Supervised learning",
                "Learning meaningful representations from unlabeled data by creating supervised tasks from the data itself",
                "Unsupervised clustering",
                "Random feature learning"
            ],
            correctAnswer: 1
        },
        {
            id: "arm3",
            question: "What is causal inference in AI?",
            options: [
                "Correlation analysis",
                "Methods for understanding cause-and-effect relationships in data and models",
                "Statistical testing",
                "Data visualization"
            ],
            correctAnswer: 1
        },
        {
            id: "arm4",
            question: "What is active learning?",
            options: [
                "Continuous training",
                "Selectively querying for most informative training examples to minimize labeling effort",
                "Dynamic programming",
                "Automated learning"
            ],
            correctAnswer: 1
        },
        {
            id: "arm5",
            question: "What is neurosymbolic AI?",
            options: [
                "Brain simulation",
                "Combining neural networks with symbolic reasoning for improved interpretability",
                "Cognitive computing",
                "Expert systems"
            ],
            correctAnswer: 1
        },
        {
            id: "arm6",
            question: "What is counterfactual learning?",
            options: [
                "Historical analysis",
                "Learning from hypothetical scenarios that differ from observed data",
                "Predictive modeling",
                "Data augmentation"
            ],
            correctAnswer: 1
        },
        {
            id: "arm7",
            question: "What is continual learning?",
            options: [
                "Regular updates",
                "Learning continuously from a stream of data while preventing catastrophic forgetting",
                "Incremental updates",
                "Sequential processing"
            ],
            correctAnswer: 1
        },
        {
            id: "arm8",
            question: "What is adversarial training?",
            options: [
                "Competition-based learning",
                "Training models to be robust against adversarial examples and attacks",
                "Model comparison",
                "Performance testing"
            ],
            correctAnswer: 1
        },
        {
            id: "arm9",
            question: "What is interpretable AI?",
            options: [
                "Model documentation",
                "Developing AI systems whose decisions can be understood and explained by humans",
                "Code comments",
                "User interfaces"
            ],
            correctAnswer: 1
        },
        {
            id: "arm10",
            question: "What is representation learning?",
            options: [
                "Data visualization",
                "Learning meaningful and useful representations of data automatically",
                "Feature engineering",
                "Data preprocessing"
            ],
            correctAnswer: 1
        }
    ];
    case 16: // Deep Learning Fundamentals
    return [
        {
            id: "dl1",
            question: "What is a neural network activation function?",
            options: [
                "A network startup procedure",
                "A mathematical function that determines the output of a neuron",
                "A type of neural network",
                "A training algorithm"
            ],
            correctAnswer: 1
        },
        {
            id: "dl2",
            question: "What is backpropagation?",
            options: [
                "Reversing network connections",
                "Algorithm for calculating gradients and updating weights in neural networks",
                "A type of neural layer",
                "Forward pass computation"
            ],
            correctAnswer: 1
        },
        {
            id: "dl3",
            question: "What is a loss function in deep learning?",
            options: [
                "A function that loses data",
                "A function that measures how well the model is performing",
                "A way to delete neural networks",
                "A type of neural layer"
            ],
            correctAnswer: 1
        },
        {
            id: "dl4",
            question: "What is gradient descent?",
            options: [
                "Decreasing network size",
                "An optimization algorithm that minimizes the loss function",
                "Reducing data size",
                "A type of activation function"
            ],
            correctAnswer: 1
        },
        {
            id: "dl5",
            question: "What is batch normalization?",
            options: [
                "Grouping data",
                "A technique to normalize layer inputs to improve training stability",
                "Data preprocessing",
                "Model evaluation"
            ],
            correctAnswer: 1
        },
        {
            id: "dl6",
            question: "What is dropout in deep learning?",
            options: [
                "Network failure",
                "A regularization technique that randomly deactivates neurons during training",
                "Removing layers",
                "Data filtering"
            ],
            correctAnswer: 1
        },
        {
            id: "dl7",
            question: "What is a convolutional layer?",
            options: [
                "A network connection",
                "A layer that applies filters to detect features in input data",
                "Data conversion",
                "Model output"
            ],
            correctAnswer: 1
        },
        {
            id: "dl8",
            question: "What is an epoch in deep learning?",
            options: [
                "A time period",
                "One complete pass through the entire training dataset",
                "Model version",
                "Network size"
            ],
            correctAnswer: 1
        },
        {
            id: "dl9",
            question: "What is the vanishing gradient problem?",
            options: [
                "Loss of data",
                "When gradients become too small in deep networks, hindering training",
                "Network deletion",
                "Model size issues"
            ],
            correctAnswer: 1
        },
        {
            id: "dl10",
            question: "What is transfer learning in deep learning?",
            options: [
                "Moving data",
                "Using pre-trained models as a starting point for new tasks",
                "Network copying",
                "Data transfer"
            ],
            correctAnswer: 1
        }
    ];

case 17: // Reinforcement Learning
    return [
        {
            id: "rl1",
            question: "What is an agent in reinforcement learning?",
            options: [
                "A secret agent",
                "The entity that takes actions in an environment to maximize reward",
                "A type of reward",
                "A training algorithm"
            ],
            correctAnswer: 1
        },
        {
            id: "rl2",
            question: "What is the environment in reinforcement learning?",
            options: [
                "Natural surroundings",
                "The system with which the agent interacts and receives feedback",
                "Computer settings",
                "Training data"
            ],
            correctAnswer: 1
        },
        {
            id: "rl3",
            question: "What is a policy in reinforcement learning?",
            options: [
                "Rules and regulations",
                "A strategy that determines what action the agent takes in each state",
                "Security measures",
                "Training guidelines"
            ],
            correctAnswer: 1
        },
        {
            id: "rl4",
            question: "What is the reward function?",
            options: [
                "Monetary payment",
                "A function that defines the immediate feedback for each action",
                "Score calculation",
                "Performance metric"
            ],
            correctAnswer: 1
        },
        {
            id: "rl5",
            question: "What is Q-learning?",
            options: [
                "Quick learning",
                "An algorithm that learns optimal action-value functions",
                "Quality testing",
                "Data analysis"
            ],
            correctAnswer: 1
        },
        {
            id: "rl6",
            question: "What is the exploration-exploitation trade-off?",
            options: [
                "Resource management",
                "Balance between trying new actions and using known good actions",
                "Cost calculation",
                "Performance testing"
            ],
            correctAnswer: 1
        },
        {
            id: "rl7",
            question: "What is a Markov Decision Process (MDP)?",
            options: [
                "Management process",
                "Mathematical framework for modeling decision-making in uncertain environments",
                "Data processing",
                "Learning algorithm"
            ],
            correctAnswer: 1
        },
        {
            id: "rl8",
            question: "What is temporal difference learning?",
            options: [
                "Time management",
                "Method for learning by bootstrapping from future estimates",
                "Schedule planning",
                "Data timing"
            ],
            correctAnswer: 1
        },
        {
            id: "rl9",
            question: "What is a value function?",
            options: [
                "Price calculation",
                "Function that predicts expected future rewards for states or actions",
                "Data validation",
                "Performance measure"
            ],
            correctAnswer: 1
        },
        {
            id: "rl10",
            question: "What is policy gradient?",
            options: [
                "Political change",
                "Method for directly optimizing the policy through gradient ascent",
                "Learning rate",
                "Training process"
            ],
            correctAnswer: 1
        }
    ];

case 18: // Generative AI & GANs
    return [
        {
            id: "gan1",
            question: "What is a Generative Adversarial Network (GAN)?",
            options: [
                "A computer network",
                "A system where two neural networks compete to generate and evaluate data",
                "A database system",
                "A training algorithm"
            ],
            correctAnswer: 1
        },
        {
            id: "gan2",
            question: "What is the generator in a GAN?",
            options: [
                "Power generator",
                "Neural network that creates synthetic data samples",
                "Data processor",
                "Training module"
            ],
            correctAnswer: 1
        },
        {
            id: "gan3",
            question: "What is the discriminator in a GAN?",
            options: [
                "Filter system",
                "Neural network that distinguishes real from generated samples",
                "Data sorter",
                "Quality checker"
            ],
            correctAnswer: 1
        },
        {
            id: "gan4",
            question: "What is mode collapse in GANs?",
            options: [
                "System failure",
                "When the generator produces limited varieties of outputs",
                "Network error",
                "Training failure"
            ],
            correctAnswer: 1
        },
        {
            id: "gan5",
            question: "What is conditional GAN?",
            options: [
                "Limited GAN",
                "GAN that generates data based on specific input conditions",
                "Basic GAN",
                "Simple generator"
            ],
            correctAnswer: 1
        },
        {
            id: "gan6",
            question: "What is the latent space in generative models?",
            options: [
                "Hidden storage",
                "Continuous space where input vectors are mapped to generate outputs",
                "Memory space",
                "Data storage"
            ],
            correctAnswer: 1
        },
        {
            id: "gan7",
            question: "What is style transfer?",
            options: [
                "Fashion design",
                "Technique to apply the style of one image to another",
                "Data transfer",
                "File copying"
            ],
            correctAnswer: 1
        },
        {
            id: "gan8",
            question: "What is text-to-image generation?",
            options: [
                "Image scanning",
                "Creating images from textual descriptions using generative AI",
                "Text processing",
                "Image editing"
            ],
            correctAnswer: 1
        },
        {
            id: "gan9",
            question: "What is a diffusion model?",
            options: [
                "Chemical process",
                "Generative model that gradually transforms noise into data",
                "Data spreading",
                "Network type"
            ],
            correctAnswer: 1
        },
        {
            id: "gan10",
            question: "What is cycle consistency in GANs?",
            options: [
                "Repeating process",
                "Principle that translated data should convert back to original",
                "Training cycle",
                "Data loop"
            ],
            correctAnswer: 1
        }
    ];

case 19: // AI Model Optimization
    return [
        {
            id: "opt1",
            question: "What is model pruning?",
            options: [
                "Removing data",
                "Removing unnecessary weights or neurons to reduce model size",
                "Cleaning code",
                "Training reduction"
            ],
            correctAnswer: 1
        },
        {
            id: "opt2",
            question: "What is quantization?",
            options: [
                "Math calculation",
                "Reducing the precision of model weights to decrease size",
                "Data measurement",
                "Size reduction"
            ],
            correctAnswer: 1
        },
        {
            id: "opt3",
            question: "What is knowledge distillation?",
            options: [
                "Information filtering",
                "Training a smaller model to mimic a larger model",
                "Data processing",
                "Model copying"
            ],
            correctAnswer: 1
        },
        {
            id: "opt4",
            question: "What is model compression?",
            options: [
                "File compression",
                "Techniques to reduce model size while maintaining performance",
                "Data reduction",
                "Storage saving"
            ],
            correctAnswer: 1
        },
        {
            id: "opt5",
            question: "What is architectural optimization?",
            options: [
                "Building design",
                "Modifying model structure to improve efficiency",
                "System planning",
                "Network design"
            ],
            correctAnswer: 1
        },
        {
            id: "opt6",
            question: "What is inference optimization?",
            options: [
                "Logical deduction",
                "Improving model prediction speed and efficiency",
                "Data processing",
                "System upgrade"
            ],
            correctAnswer: 1
        },
        {
            id: "opt7",
            question: "What is hardware acceleration?",
            options: [
                "Speed increase",
                "Using specialized hardware to speed up model execution",
                "System upgrade",
                "Performance boost"
            ],
            correctAnswer: 1
        },
        {
            id: "opt8",
            question: "What is model profiling?",
            options: [
                "Performance review",
                "Analyzing model performance characteristics and bottlenecks",
                "System check",
                "Quality testing"
            ],
            correctAnswer: 1
        },
        {
            id: "opt9",
            question: "What is operator fusion?",
            options: [
                "Chemical process",
                "Combining multiple operations to reduce computation overhead",
                "Data merging",
                "System integration"
            ],
            correctAnswer: 1
        },
        {
            id: "opt10",
            question: "What is dynamic batching?",
            options: [
                "Batch processing",
                "Optimizing inference by grouping multiple requests",
                "Data grouping",
                "Request handling"
            ],
            correctAnswer: 1
        }
    ];

case 20: // AI Tools & Frameworks
    return [
        {
            id: "tf1",
            question: "What is TensorFlow?",
            options: [
                "Data flow tool",
                "An open-source machine learning framework developed by Google",
                "Tensor calculator",
                "Math library"
            ],
            correctAnswer: 1
        },
        {
            id: "tf2",
            question: "What is PyTorch?",
            options: [
                "Python tool",
                "A deep learning framework developed by Facebook",
                "Torch program",
                "Data processor"
            ],
            correctAnswer: 1
        },
        {
            id: "tf3",
            question: "What is Keras?",
            options: [
                "Data tool",
                "A high-level neural network API that can run on multiple backends",
                "Programming language",
                "Database system"
            ],
            correctAnswer: 1
        },
        {
            id: "tf4",
            question: "What is scikit-learn?",
            options: [
                "Learning tool",
                "A machine learning library for Python focusing on classical algorithms",
                "Data science kit",
                "Analysis tool"
            ],
            correctAnswer: 1
        },
        {
            id: "tf5",
            question: "What is Jupyter Notebook?",
            options: [
                "Note-taking app",
                "An interactive computing environment for data science",
                "Documentation tool",
                "Code editor"
            ],
            correctAnswer: 1
        },
        {
            id: "tf6",
            question: "What is Apache Spark MLlib?",
            options: [
                "Spark plugin",
                "A distributed machine learning library for big data",
                "Database tool",
                "Analysis software"
            ],
            correctAnswer: 1
        },
        {
            id: "tf7",
            question: "What is NumPy?",
            options: [
                "Number calculator",
                "A fundamental package for scientific computing in Python",
                "Math tool",
                "Data processor"
            ],
            correctAnswer: 1
        },
        {
            id: "tf8",
            question: "What is pandas?",
            options: [
                "Animal database",
                "A data manipulation and analysis library for Python",
                "Data viewer",
                "Spreadsheet tool"
            ],
            correctAnswer: 1
        },
        {
            id: "tf9",
            question: "What is Docker?",
            options: [
                "Storage system",
                "A platform for developing and deploying applications in containers",
                "Network tool",
                "Development environment"
            ],
            correctAnswer: 1
        },
        {
            id: "tf10",
            question: "What is Git?",
            options: [
                "Code editor",
                "A version control system for tracking code changes",
                "Project manager",
                "File system"
            ],
            correctAnswer: 1
        }
    ];

case 21: // MLOps & AI Deployment
    return [
        {
            id: "mlops1",
            question: "What is MLOps?",
            options: [
                "Machine learning operations",
                "A set of practices for automating and managing the ML lifecycle",
                "Development process",
                "Project management"
            ],
            correctAnswer: 1
        },
        {
            id: "mlops2",
            question: "What is CI/CD in MLOps?",
            options: [
                "Code management",
                "Continuous Integration and Continuous Deployment for ML systems",
                "Testing process",
                "Development cycle"
            ],
            correctAnswer: 1
        },
        {
            id: "mlops3",
            question: "What is model versioning?",
            options: [
                "Version numbering",
                "Tracking different iterations of ML models and their artifacts",
                "Code versions",
                "Data storage"
            ],
            correctAnswer: 1
        },
        {
            id: "mlops4",
            question: "What is model monitoring?",
            options: [
                "System watching",
                "Tracking model performance and behavior in production",
                "Data checking",
                "Quality control"
            ],
            correctAnswer: 1
        },
        {
            id: "mlops5",
            question: "What is feature store?",
            options: [
                "Data shop",
                "A centralized repository for storing and managing ML features",
                "Code storage",
                "Model database"
            ],
            correctAnswer: 1
        },
        {
            id: "mlops6",
            question: "What is model serving?",
            options: [
                "Service provision",
                "Making ML models available for real-time predictions",
                "Data serving",
                "System hosting"
            ],
            correctAnswer: 1
        },
        {
            id: "mlops7",
            question: "What is experiment tracking?",
            options: [
                "Lab notes",
                "Recording and comparing different ML experiments and their results",
                "Data logging",
                "Testing notes"
            ],
            correctAnswer: 1
        },
        {
            id: "mlops8",
            question: "What is model registry?",
            options: [
                "Registration system",
                "A centralized repository for managing ML model lifecycle",
                "Data catalog",
                "Code repository"
            ],
            correctAnswer: 1
        },
        {
            id: "mlops9",
            question: "What is data versioning?",
            options: [
                "Version control",
                "Tracking changes and managing different versions of datasets",
                "File management",
                "Storage system"
            ],
            correctAnswer: 1
        },
        {
            id: "mlops10",
            question: "What is A/B testing in MLOps?",
            options: [
                "Alphabet testing",
                "Comparing performance of different model versions in production",
                "Basic testing",
                "Quality check"
            ],
            correctAnswer: 1
        }
    ];

case 22: // AI Testing & Quality Assurance
    return [
        {
            id: "qa1",
            question: "What is model validation?",
            options: [
                "Basic checking",
                "Process of evaluating model performance on unseen data",
                "Data verification",
                "System testing"
            ],
            correctAnswer: 1
        },
        {
            id: "qa2",
            question: "What is bias testing?",
            options: [
                "Opinion checking",
                "Evaluating model fairness across different demographic groups",
                "Data testing",
                "System check"
            ],
            correctAnswer: 1
        },
        {
            id: "qa3",
            question: "What is robustness testing?",
            options: [
                "Strength testing",
                "Evaluating model performance under various conditions and perturbations",
                "System durability",
                "Quality check"
            ],
            correctAnswer: 1
        },
        {
            id: "qa4",
            question: "What is performance testing?",
            options: [
                "Speed testing",
                "Evaluating model accuracy, speed, and resource usage",
                "System check",
                "Quality control"
            ],
            correctAnswer: 1
        },
        {
            id: "qa5",
            question: "What is unit testing in AI?",
            options: [
                "Component testing",
                "Testing individual components of AI systems in isolation",
                "Basic testing",
                "System check"
            ],
            correctAnswer: 1
        },
        {
            id: "qa6",
            question: "What is integration testing in AI?",
            options: [
                "Combined testing",
                "Testing how different AI components work together",
                "System merger",
                "Unity check"
            ],
            correctAnswer: 1
        },
        {
            id: "qa7",
            question: "What is regression testing?",
            options: [
                "Backwards testing",
                "Ensuring new changes don't break existing functionality",
                "System review",
                "Quality check"
            ],
            correctAnswer: 1
        },
        {
            id: "qa8",
            question: "What is stress testing?",
            options: [
                "Pressure test",
                "Testing system behavior under extreme conditions",
                "Load testing",
                "Performance check"
            ],
            correctAnswer: 1
        },
        {
            id: "qa9",
            question: "What is security testing?",
            options: [
                "Safety check",
                "Evaluating system vulnerabilities and protection mechanisms",
                "Protection test",
                "Defense check"
            ],
            correctAnswer: 1
        },
        {
            id: "qa10",
            question: "What is acceptance testing?",
            options: [
                "Approval check",
                "Validating if the system meets business requirements",
                "Final testing",
                "System review"
            ],
            correctAnswer: 1
        }
    ];

case 23: // AI Project Management
    return [
        {
            id: "pm1",
            question: "What is an AI project roadmap?",
            options: [
                "Travel map",
                "Strategic plan outlining AI project milestones and deliverables",
                "Project guide",
                "Task list"
            ],
            correctAnswer: 1
        },
        {
            id: "pm2",
            question: "What is sprint planning in AI projects?",
            options: [
                "Running plan",
                "Planning short development cycles for AI project tasks",
                "Quick planning",
                "Fast tracking"
            ],
            correctAnswer: 1
        },
        {
            id: "pm3",
            question: "What is stakeholder management?",
            options: [
                "People management",
                "Managing relationships with all parties interested in the AI project",
                "Team leadership",
                "Resource handling"
            ],
            correctAnswer: 1
        },
        {
            id: "pm4",
            question: "What is risk management in AI projects?",
            options: [
                "Safety planning",
                "Identifying and mitigating potential project risks and issues",
                "Problem solving",
                "Issue handling"
            ],
            correctAnswer: 1
        },
        {
            id: "pm5",
            question: "What is resource allocation?",
            options: [
                "Resource distribution",
                "Assigning appropriate resources to different project tasks",
                "Budget planning",
                "Asset management"
            ],
            correctAnswer: 1
        },
        {
            id: "pm6",
            question: "What is project scope management?",
            options: [
                "Area management",
                "Defining and controlling what is included in the project",
                "Size control",
                "Boundary setting"
            ],
            correctAnswer: 1
        },
        {
            id: "pm7",
            question: "What is agile methodology?",
            options: [
                "Flexible approach",
                "Iterative project management approach with frequent feedback",
                "Quick method",
                "Fast development"
            ],
            correctAnswer: 1
        },
        {
            id: "pm8",
            question: "What is a project milestone?",
            options: [
                "Distance marker",
                "Significant checkpoint or achievement in project timeline",
                "Progress point",
                "Time marker"
            ],
            correctAnswer: 1
        },
        {
            id: "pm9",
            question: "What is change management?",
            options: [
                "Money handling",
                "Managing transitions and updates in project scope or direction",
                "System updates",
                "Process control"
            ],
            correctAnswer: 1
        },
        {
            id: "pm10",
            question: "What is project documentation?",
            options: [
                "Paper filing",
                "Recording and maintaining project information and decisions",
                "File storage",
                "Data recording"
            ],
            correctAnswer: 1
        }
    ];

case 24: // AI UX & Human-AI Interaction
    return [
        {
            id: "ux1",
            question: "What is AI user experience?",
            options: [
                "Computer usage",
                "How users interact with and experience AI systems",
                "System interface",
                "Program usage"
            ],
            correctAnswer: 1
        },
        {
            id: "ux2",
            question: "What is human-centered AI?",
            options: [
                "People focus",
                "Designing AI systems around human needs and capabilities",
                "User priority",
                "Personal AI"
            ],
            correctAnswer: 1
        },
        {
            id: "ux3",
            question: "What is AI transparency?",
            options: [
                "Clear vision",
                "Making AI decision-making processes understandable to users",
                "System clarity",
                "Open view"
            ],
            correctAnswer: 1
        },
        {
            id: "ux4",
            question: "What is AI feedback loop?",
            options: [
                "Circle process",
                "Cycle of user interaction and AI system improvement",
                "Response cycle",
                "System update"
            ],
            correctAnswer: 1
        },
        {
            id: "ux5",
            question: "What is AI interface design?",
            options: [
                "Screen design",
                "Creating user interfaces for AI-powered systems",
                "System layout",
                "Visual design"
            ],
            correctAnswer: 1
        },
        {
            id: "ux6",
            question: "What is AI accessibility?",
            options: [
                "Easy access",
                "Making AI systems usable by people with different abilities",
                "System reach",
                "User access"
            ],
            correctAnswer: 1
        },
        {
            id: "ux7",
            question: "What is AI personalization?",
            options: [
                "Personal setting",
                "Tailoring AI interactions to individual user preferences",
                "Custom setup",
                "User profile"
            ],
            correctAnswer: 1
        },
        {
            id: "ux8",
            question: "What is error handling in AI UX?",
            options: [
                "Problem fixing",
                "Managing and communicating AI system errors to users",
                "Issue solving",
                "Bug fixing"
            ],
            correctAnswer: 1
        },
        {
            id: "ux9",
            question: "What is AI interaction design?",
            options: [
                "Design work",
                "Creating meaningful ways for users to interact with AI",
                "System design",
                "Interface planning"
            ],
            correctAnswer: 1
        },
        {
            id: "ux10",
            question: "What is AI usability testing?",
            options: [
                "Usage check",
                "Evaluating how well users can interact with AI systems",
                "System testing",
                "Performance check"
            ],
            correctAnswer: 1
        }
    ];

case 25: // AI Data Management
    return [
        {
            id: "dm1",
            question: "What is data governance in AI?",
            options: [
                "Data rules",
                "Framework for managing data assets and ensuring quality",
                "Information control",
                "Data handling"
            ],
            correctAnswer: 1
        },
        {
            id: "dm2",
            question: "What is data quality management?",
            options: [
                "Quality control",
                "Ensuring data meets required standards for AI use",
                "Information check",
                "Data testing"
            ],
            correctAnswer: 1
        },
        {
            id: "dm3",
            question: "What is data lineage?",
            options: [
                "Data history",
                "Tracking data's origin, movement, and transformations",
                "Information path",
                "Data tracking"
            ],
            correctAnswer: 1
        },
        {
            id: "dm4",
            question: "What is data versioning?",
            options: [
                "Version control",
                "Managing different versions of datasets over time",
                "Data copies",
                "Information versions"
            ],
            correctAnswer: 1
        },
        {
            id: "dm5",
            question: "What is data privacy management?",
            options: [
                "Privacy control",
                "Protecting sensitive information in AI systems",
                "Data security",
                "Information protection"
            ],
            correctAnswer: 1
        },
        {
            id: "dm6",
            question: "What is data pipeline?",
            options: [
                "Data flow",
                "System for moving and transforming data between systems",
                "Information transfer",
                "Data movement"
            ],
            correctAnswer: 1
        },
        {
            id: "dm7",
            question: "What is data labeling?",
            options: [
                "Information marking",
                "Process of annotating data for supervised learning",
                "Data tagging",
                "Content marking"
            ],
            correctAnswer: 1
        },
        {
            id: "dm8",
            question: "What is data augmentation?",
            options: [
                "Data increase",
                "Techniques for creating variations of training data",
                "Information growth",
                "Content expansion"
            ],
            correctAnswer: 1
        },
        {
            id: "dm9",
            question: "What is data validation?",
            options: [
                "Information check",
                "Verifying data accuracy and consistency",
                "Data testing",
                "Quality control"
            ],
            correctAnswer: 1
        },
        {
            id: "dm10",
            question: "What is metadata management?",
            options: [
                "Extra data",
                "Managing information about datasets and their attributes",
                "Data details",
                "Information records"
            ],
            correctAnswer: 1
        }
    ];

        default:
            return []; // Return empty array for unknown quiz ID
    }
};