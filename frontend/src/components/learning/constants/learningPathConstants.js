// src/components/learning/constants/learningPathConstants.js

export const LEARNING_AREAS = {
    'ai_fundamentals': 'AI Fundamentals',
    'machine_learning': 'Machine Learning',
    'deep_learning': 'Deep Learning',
    'computer_vision': 'Computer Vision',
    'nlp': 'Natural Language Processing',
    'ai_ethics': 'AI Ethics',
    'mlops': 'MLOps & Deployment'
};

export const TIME_COMMITMENTS = [
    { value: 'light', label: '5-10 hours/week', description: 'Light pace' },
    { value: 'moderate', label: '10-20 hours/week', description: 'Moderate pace' },
    { value: 'intensive', label: '20+ hours/week', description: 'Intensive pace' }
];

export const EXPERIENCE_LEVELS = [
    { value: 'beginner', label: 'Beginner', description: 'New to AI' },
    { value: 'intermediate', label: 'Intermediate', description: 'Some AI experience' },
    { value: 'advanced', label: 'Advanced', description: 'Experienced in AI' }
];

export const PATH_TYPES = {
    STRUCTURED: 'structured',
    FLEXIBLE: 'flexible',
    ACCELERATED: 'accelerated'
};