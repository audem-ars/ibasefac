// src/components/education/LearningData.js

export const learningModules = [
    {
        id: 1,
        title: 'JavaScript Basics',
        content: {
            introduction: 'Master the advanced concepts of JavaScript programming, including type coercion, function scope, and array manipulation',
            sections: [
                {
                    title: 'JavaScript Types and Comparisons',
                    content: `Understanding JavaScript's type system, comparison operators, and type coercion is fundamental for writing reliable code. This section covers the intricacies of JavaScript's type system and equality comparisons.`,
                    examples: [
                        {
                            code: `// Type coercion examples
    let num = 42;
    let str = "42";
    let bool = true;
    
    console.log(num == str);       // true (type coercion)
    console.log(num === str);      // false (strict equality)
    console.log(1 + "2");         // "12" (string concatenation)
    console.log(true + 1);        // 2 (boolean to number)
    console.log([1] + [2]);       // "12" (array to string)`,
                            explanation: 'Demonstrates various type coercion scenarios and comparison operations'
                        },
                        {
                            code: `// Type checking and conversion
    const value = "123";
    const isNumber = typeof value === "number";
    const convertedNum = Number(value);
    const isNumeric = !isNaN(value);
    
    console.log(Array.isArray([]));        // true
    console.log(typeof null);              // "object"
    console.log(typeof undefined);         // "undefined"`,
                            explanation: 'Shows type checking and explicit type conversion methods'
                        }
                    ],
                    learningObjectives: [
                        'Understand JavaScript type coercion rules',
                        'Master different equality comparison operators',
                        'Learn type checking and conversion techniques'
                    ],
                    potentialQuestions: [
                        {
                            type: 'multipleChoice',
                            question: 'What is the result of `1 + "2"` in JavaScript?',
                            options: ['3', '"12"', 'NaN', 'undefined'],
                            correctAnswer: '"12"'
                        },
                        {
                            type: 'trueFalse',
                            question: 'The === operator performs type coercion before comparison.',
                            correctAnswer: false
                        }
                    ]
                },
                {
                    title: 'Function Scope and Closures',
                    content: `Functions in JavaScript create their own scope and can form closures, allowing for powerful patterns in data privacy and state management.`,
                    examples: [
                        {
                            code: `// Closure example
    function createCounter() {
        let count = 0;
        
        return {
            increment() {
                return ++count;
            },
            decrement() {
                return --count;
            },
            getCount() {
                return count;
            }
        };
    }
    
    const counter = createCounter();
    console.log(counter.increment()); // 1
    console.log(counter.increment()); // 2
    console.log(counter.getCount()); // 2`,
                            explanation: 'Demonstrates closure creation and private variable access'
                        },
                        {
                            code: `// Function scope and hoisting
    console.log(hoisted);    // undefined
    var hoisted = "Hello";
    
    console.log(notHoisted); // ReferenceError
    let notHoisted = "World";
    
    function outer() {
        let x = 10;
        function inner() {
            console.log(x); // Closure accessing x
        }
        return inner;
    }`,
                            explanation: 'Shows function scope, variable hoisting, and closure mechanics'
                        }
                    ],
                    learningObjectives: [
                        'Master function scope and closure concepts',
                        'Understand variable hoisting behavior',
                        'Learn practical applications of closures'
                    ],
                    potentialQuestions: [
                        {
                            type: 'coding',
                            question: 'Create a closure that maintains a private counter variable',
                            expectedOutput: 'A function that creates a counter with increment/decrement methods'
                        }
                    ]
                },
                {
                    title: 'Array Methods and Manipulation',
                    content: `JavaScript provides powerful array methods for data transformation and manipulation. Understanding these methods is crucial for effective array handling.`,
                    examples: [
                        {
                            code: `// Advanced array methods
    const numbers = [1, 2, 3, 4, 5];
    
    const doubled = numbers.map(n => n * 2);
    const evens = numbers.filter(n => n % 2 === 0);
    const sum = numbers.reduce((acc, curr) => acc + curr, 0);
    
    // Array transformation
    const matrix = [[1, 2], [3, 4]].flat();
    const unique = [...new Set([1, 1, 2, 2, 3])];
    
    // Array manipulation
    const arr = ['a', 'b', 'c'];
    arr.splice(1, 1, 'x', 'y');    // ['a', 'x', 'y', 'c']`,
                            explanation: 'Shows advanced array methods and transformations'
                        },
                        {
                            code: `// Array destructuring and spreading
    const [first, ...rest] = [1, 2, 3, 4];
    console.log(first);  // 1
    console.log(rest);   // [2, 3, 4]
    
    // Combining arrays
    const arr1 = [1, 2];
    const arr2 = [3, 4];
    const combined = [...arr1, ...arr2];
    
    // Finding elements
    const users = [{id: 1}, {id: 2}];
    const found = users.find(user => user.id === 2);`,
                            explanation: 'Demonstrates array destructuring, spreading, and searching'
                        }
                    ],
                    learningObjectives: [
                        'Master common array methods (map, filter, reduce)',
                        'Understand array destructuring and spreading',
                        'Learn array transformation techniques'
                    ],
                    potentialQuestions: [
                        {
                            type: 'multipleChoice',
                            question: 'Which array method transforms each element into a new value?',
                            options: ['filter', 'map', 'reduce', 'find'],
                            correctAnswer: 'map'
                        },
                        {
                            type: 'coding',
                            question: 'Write code to flatten a nested array using the flat() method',
                            expectedOutput: 'Code that successfully flattens a nested array'
                        }
                    ]
                }
            ]
        }
    },
    {
        id: 4,
        title: 'AI & Machine Learning Fundamentals',
    content: {
        introduction: 'Comprehensive overview of artificial intelligence and machine learning fundamentals, covering core concepts, learning paradigms, and specialized AI fields.',
        sections: [
            {
                title: 'Machine Learning Foundations',
                content: 'Core concepts and types of machine learning:\n\n1. Machine Learning Basics:\n- Definition and principles\n- Learning paradigms\n- Model development\n- Performance evaluation\n\n2. Learning Types:\n- Supervised learning\n- Unsupervised learning\n- Reinforcement learning\n- Hybrid approaches\n\n3. Model Development:\n- Training processes\n- Validation methods\n- Overfitting prevention\n- Model optimization',
                examples: [
                    {
                        code: `class MachineLearningFramework:
    def __init__(self):
        self.model = None
        self.training_stats = {}

    def train_model(self, data, learning_type='supervised'):
        """
        Implements different types of learning approaches
        """
        if learning_type == 'supervised':
            return self.supervised_learning(data)
        elif learning_type == 'unsupervised':
            return self.unsupervised_learning(data)
        elif learning_type == 'reinforcement':
            return self.reinforcement_learning(data)

    def supervised_learning(self, data):
        training_process = {
            'data_preparation': self.prepare_labeled_data(data),
            'model_training': self.train_with_labels(),
            'validation': self.validate_performance(),
            'optimization': self.optimize_model()
        }
        
        return {
            'trained_model': self.model,
            'performance_metrics': self.evaluate_metrics(),
            'training_history': training_process
        }`,
                        explanation: 'Machine learning implementation showing:\n1. Learning type selection\n2. Training process\n3. Model optimization\n4. Performance evaluation',
                        concept: 'Machine Learning Framework Implementation'
                    }
                ],
                learningObjectives: [
                    'Understand machine learning fundamentals',
                    'Master different learning types',
                    'Learn training processes',
                    'Develop model optimization skills'
                ]
            },
            {
                title: 'Deep Learning and Neural Networks',
                content: 'Understanding deep learning and neural network architectures:\n\n1. Deep Learning:\n- Neural network basics\n- Architecture types\n- Layer functions\n- Training methods\n\n2. Neural Networks:\n- Network components\n- Layer connectivity\n- Activation functions\n- Backpropagation\n\n3. Model Training:\n- Loss functions\n- Optimization algorithms\n- Hyperparameter tuning\n- Performance monitoring',
                examples: [
                    {
                        code: `class DeepLearningSystem:
    def __init__(self):
        self.network = None
        self.training_config = {}

    def build_neural_network(self, architecture_type='feedforward'):
        """
        Creates neural network architectures
        """
        network_architecture = {
            'input_layer': self.define_input_layer(),
            'hidden_layers': self.create_hidden_layers(),
            'output_layer': self.define_output_layer(),
            'connections': self.establish_connections()
        }
        
        training_setup = {
            'loss_function': self.select_loss_function(),
            'optimizer': self.configure_optimizer(),
            'learning_rate': self.set_learning_rate(),
            'batch_size': self.determine_batch_size()
        }
        
        return {
            'architecture': network_architecture,
            'training_config': training_setup,
            'performance_monitor': self.setup_monitoring()
        }`,
                        explanation: 'Deep learning implementation showing:\n1. Network architecture\n2. Training configuration\n3. Performance monitoring\n4. Optimization setup',
                        concept: 'Neural Network Implementation'
                    }
                ],
                learningObjectives: [
                    'Master neural network concepts',
                    'Learn deep learning architectures',
                    'Understand training methods',
                    'Develop optimization skills'
                ]
            },
            {
                title: 'Specialized AI Fields',
                content: 'Advanced AI applications and specialized fields:\n\n1. Natural Language Processing:\n- Text understanding\n- Language generation\n- Sentiment analysis\n- Machine translation\n\n2. Computer Vision:\n- Image processing\n- Object detection\n- Scene understanding\n- Visual recognition\n\n3. Advanced Algorithms:\n- Algorithm design\n- Complexity analysis\n- Optimization methods\n- Implementation strategies',
                examples: [
                    {
                        code: `class SpecializedAISystem:
    def __init__(self):
        self.nlp_module = None
        self.vision_module = None

    def implement_specialized_systems(self):
        """
        Implements specialized AI applications
        """
        nlp_system = {
            'text_processing': self.setup_text_processor(),
            'language_model': self.initialize_language_model(),
            'sentiment_analyzer': self.create_sentiment_analyzer(),
            'translator': self.setup_translator()
        }
        
        vision_system = {
            'image_processor': self.setup_image_processor(),
            'object_detector': self.initialize_object_detector(),
            'scene_analyzer': self.create_scene_analyzer(),
            'recognition_module': self.setup_recognition()
        }
        
        return {
            'nlp': nlp_system,
            'vision': vision_system,
            'integration': self.integrate_systems()
        }`,
                        explanation: 'Specialized AI implementation showing:\n1. NLP systems\n2. Computer vision\n3. Algorithm implementation\n4. System integration',
                        concept: 'Specialized AI Implementation'
                    }
                ],
                learningObjectives: [
                    'Master NLP concepts',
                    'Learn computer vision techniques',
                    'Understand algorithmic approaches',
                    'Develop specialized AI skills'
                ]
            },
            {
                title: 'Model Evaluation and Optimization',
                content: 'Techniques for evaluating and optimizing AI models:\n\n1. Model Evaluation:\n- Performance metrics\n- Validation techniques\n- Error analysis\n- Testing strategies\n\n2. Optimization Methods:\n- Hyperparameter tuning\n- Model selection\n- Performance improvement\n- Overfitting prevention\n\n3. Quality Assurance:\n- Testing procedures\n- Validation methods\n- Performance monitoring\n- Improvement strategies',
                examples: [
                    {
                        code: `class ModelOptimization:
    def __init__(self):
        self.evaluation_metrics = {}
        self.optimization_params = {}

    def optimize_model_performance(self, model, data):
        """
        Implements model evaluation and optimization
        """
        evaluation_results = {
            'metrics': self.calculate_metrics(model, data),
            'validation': self.perform_validation(),
            'error_analysis': self.analyze_errors(),
            'performance_tests': self.run_tests()
        }
        
        optimization_process = {
            'hyperparameter_tuning': self.tune_hyperparameters(),
            'model_selection': self.select_best_model(),
            'performance_improvement': self.improve_performance(),
            'overfitting_prevention': self.prevent_overfitting()
        }
        
        return {
            'evaluation': evaluation_results,
            'optimization': optimization_process,
            'recommendations': self.generate_recommendations()
        }`,
                        explanation: 'Model optimization implementation showing:\n1. Performance evaluation\n2. Optimization methods\n3. Quality assurance\n4. Improvement strategies',
                        concept: 'Model Optimization Framework'
                    }
                ],
                learningObjectives: [
                    'Master evaluation techniques',
                    'Learn optimization methods',
                    'Understand quality assurance',
                    'Develop performance tuning skills'
                ]
            }
        ]
    }
},
    {
        id: 5,
        title: 'AI Ethics & Responsible Development',
    content: {
        introduction: 'Comprehensive overview of AI ethics and responsible development practices, covering algorithmic fairness, transparency, privacy, and governance frameworks.',
        sections: [
            {
                title: 'Algorithmic Fairness and Bias',
                content: 'Understanding and addressing bias in AI systems:\n\n1. Algorithmic Bias:\n- Definition and types\n- Detection methods\n- Mitigation strategies\n- Impact assessment\n\n2. Fairness Metrics:\n- Group fairness\n- Individual fairness\n- Equality of opportunity\n- Implementation techniques\n\n3. Bias Mitigation:\n- Dataset balancing\n- Algorithm modification\n- Post-processing methods\n- Validation approaches',
                examples: [
                    {
                        code: `class BiasDetection:
    def __init__(self):
        self.metrics = {}
        self.bias_scores = {}

    def analyze_dataset_bias(self, data, protected_attributes):
        """
        Analyzes dataset for potential biases across protected attributes
        """
        bias_metrics = {
            'statistical_parity': self.calculate_statistical_parity(data, protected_attributes),
            'equal_opportunity': self.calculate_equal_opportunity(data, protected_attributes),
            'disparate_impact': self.calculate_disparate_impact(data, protected_attributes)
        }
        
        mitigation_strategies = {
            'reweighting': self.compute_reweighting_factors(data),
            'preprocessing': self.identify_preprocessing_steps(data),
            'threshold_adjustment': self.calculate_fair_thresholds(data)
        }
        
        return {
            'bias_metrics': bias_metrics,
            'mitigation_strategies': mitigation_strategies,
            'recommendations': self.generate_recommendations(bias_metrics)
        }`,
                        explanation: 'Bias detection implementation showing:\n1. Bias metric calculation\n2. Mitigation strategy development\n3. Recommendation generation\n4. Fairness assessment',
                        concept: 'Algorithmic Fairness Implementation'
                    }
                ],
                learningObjectives: [
                    'Understand types of algorithmic bias',
                    'Master fairness metric calculations',
                    'Learn bias mitigation techniques',
                    'Develop skills in fair AI development'
                ]
            },
            {
                title: 'Transparency and Accountability',
                content: 'Ensuring AI system transparency and accountability:\n\n1. AI Transparency:\n- Explainable AI methods\n- Decision traceability\n- Model documentation\n- User communication\n\n2. Accountability Framework:\n- Responsibility allocation\n- Audit procedures\n- Incident response\n- Stakeholder engagement\n\n3. Documentation Standards:\n- Model cards\n- Dataset documentation\n- Decision logs\n- Impact assessments',
                examples: [
                    {
                        code: `class AITransparency:
    def __init__(self):
        self.documentation = {}
        self.audit_logs = []

    def document_model_decisions(self, model, decision_context):
        """
        Creates comprehensive documentation for model decisions
        """
        transparency_report = {
            'model_architecture': self.document_architecture(model),
            'decision_process': self.trace_decision_path(decision_context),
            'feature_importance': self.calculate_feature_importance(model),
            'confidence_metrics': self.compute_confidence_scores(decision_context)
        }
        
        accountability_measures = {
            'audit_trail': self.generate_audit_trail(),
            'responsibility_matrix': self.create_responsibility_matrix(),
            'incident_response': self.define_incident_procedures(),
            'stakeholder_communication': self.prepare_stakeholder_reports()
        }
        
        return {
            'transparency': transparency_report,
            'accountability': accountability_measures,
            'documentation': self.generate_documentation()
        }`,
                        explanation: 'Transparency implementation demonstrating:\n1. Decision documentation\n2. Audit trail generation\n3. Responsibility tracking\n4. Stakeholder reporting',
                        concept: 'AI Transparency Framework'
                    }
                ],
                learningObjectives: [
                    'Master explainable AI techniques',
                    'Learn documentation standards',
                    'Understand audit procedures',
                    'Develop accountability frameworks'
                ]
            },
            {
                title: 'Privacy and Data Protection',
                content: 'Implementing privacy and data protection measures:\n\n1. Digital Privacy:\n- Data protection principles\n- Privacy-preserving techniques\n- Consent management\n- Rights implementation\n\n2. Data Governance:\n- Data lifecycle management\n- Access controls\n- Encryption standards\n- Compliance frameworks\n\n3. Privacy Engineering:\n- Privacy by design\n- Data minimization\n- Security measures\n- Risk assessment',
                examples: [
                    {
                        code: `class PrivacyProtection:
    def __init__(self):
        self.privacy_settings = {}
        self.consent_records = {}

    def implement_privacy_measures(self, data_context):
        """
        Implements comprehensive privacy protection measures
        """
        privacy_controls = {
            'data_minimization': self.apply_data_minimization(),
            'encryption': self.implement_encryption(),
            'access_control': self.setup_access_controls(),
            'consent_management': self.manage_consent()
        }
        
        governance_framework = {
            'policies': self.define_privacy_policies(),
            'procedures': self.establish_procedures(),
            'compliance': self.ensure_compliance(),
            'monitoring': self.setup_monitoring()
        }
        
        return {
            'privacy_measures': privacy_controls,
            'governance': governance_framework,
            'risk_assessment': self.assess_privacy_risks()
        }`,
                        explanation: 'Privacy implementation showing:\n1. Privacy controls\n2. Governance framework\n3. Risk assessment\n4. Compliance management',
                        concept: 'Privacy Protection Framework'
                    }
                ],
                learningObjectives: [
                    'Master privacy-preserving techniques',
                    'Learn data protection principles',
                    'Understand compliance requirements',
                    'Develop privacy engineering skills'
                ]
            },
            {
                title: 'AI Governance and Safety',
                content: 'Establishing AI governance and safety frameworks:\n\n1. AI Governance:\n- Policy development\n- Regulatory compliance\n- Risk management\n- Ethical guidelines\n\n2. Safety Measures:\n- Risk assessment\n- Control mechanisms\n- Monitoring systems\n- Incident response\n\n3. Human Oversight:\n- Review procedures\n- Intervention protocols\n- Training requirements\n- Performance monitoring',
                examples: [
                    {
                        code: `class AIGovernance:
    def __init__(self):
        self.governance_framework = {}
        self.safety_measures = {}

    def establish_governance_framework(self, organization_context):
        """
        Establishes comprehensive AI governance framework
        """
        governance_structure = {
            'policies': self.develop_policies(),
            'procedures': self.establish_procedures(),
            'oversight': self.implement_oversight(),
            'compliance': self.ensure_compliance()
        }
        
        safety_framework = {
            'risk_assessment': self.assess_risks(),
            'controls': self.implement_controls(),
            'monitoring': self.setup_monitoring(),
            'response': self.define_response_procedures()
        }
        
        return {
            'governance': governance_structure,
            'safety': safety_framework,
            'oversight': self.define_oversight_mechanisms()
        }`,
                        explanation: 'Governance implementation demonstrating:\n1. Policy development\n2. Safety measures\n3. Oversight mechanisms\n4. Compliance management',
                        concept: 'AI Governance Framework'
                    }
                ],
                learningObjectives: [
                    'Master AI governance principles',
                    'Learn safety implementation',
                    'Understand oversight mechanisms',
                    'Develop risk management skills'
                ]
            }
        ]
    }
},
    {
        id: 14,
        title: 'Advanced Neural Architectures',
        content: {
            introduction: 'Explore cutting-edge neural network architectures and mechanisms, from attention mechanisms to neural ODEs',
            sections: [
                {
                    title: 'Attention Mechanisms',
                    content: 'Advanced components that allow neural networks to dynamically focus on relevant parts of the input, revolutionizing natural language processing and beyond.',
                    examples: [
                        {
                            code: `// Attention Implementation
            const attention = {
                // Query, Key, Value matrices
                W_query: torch.randn(512, 64),
                W_key: torch.randn(512, 64),
                W_value: torch.randn(512, 64),
                
                // Attention calculation
                calculate: function(input) {
                    // Project input to Q,K,V
                    const Q = torch.matmul(input, this.W_query);
                    const K = torch.matmul(input, this.W_key);
                    const V = torch.matmul(input, this.W_value);
                    
                    // Calculate attention scores
                    const scores = torch.matmul(Q, K.transpose(-2, -1));
                    const scaled_scores = scores / Math.sqrt(64);
                    
                    // Apply softmax
                    const weights = torch.softmax(scaled_scores, dim=-1);
                    
                    // Get weighted values
                    return torch.matmul(weights, V);
                }
            };
            
            // Multi-head attention setup
            const multihead_attention = {
                num_heads: 8,
                head_dim: 64,
                
                split_heads: function(x) {
                    // Reshape for multiple attention heads
                    return x.view(x.size(0), -1, this.num_heads, this.head_dim);
                }
            };`,
                            explanation: 'Implementation of the attention mechanism showing:\n1. Query, Key, Value projections\n2. Attention score calculation\n3. Multi-head attention setup\n4. Dimension splitting for parallel attention',
                            concept: 'Attention Mechanism'
                        },
                        {
                            code: `// Transformer Block Implementation
            const transformer_block = {
                // Layer components
                attention: multihead_attention,
                feedforward: {
                    linear1: torch.nn.Linear(512, 2048),
                    linear2: torch.nn.Linear(2048, 512),
                    dropout: torch.nn.Dropout(0.1)
                },
                
                // Layer normalization
                norm1: torch.nn.LayerNorm(512),
                norm2: torch.nn.LayerNorm(512),
                
                forward: function(x) {
                    // Self-attention
                    let out = this.attention.calculate(x);
                    out = this.norm1(x + out);
                    
                    // Feedforward
                    let ff = this.feedforward.linear1(out);
                    ff = torch.relu(ff);
                    ff = this.feedforward.dropout(ff);
                    ff = this.feedforward.linear2(ff);
                    
                    return this.norm2(out + ff);
                }
            };`,
                            explanation: 'Complete transformer block showing:\n1. Multi-head attention layer\n2. Position-wise feedforward network\n3. Residual connections\n4. Layer normalization',
                            concept: 'Transformer Architecture'
                        }
                    ],
                    learningObjectives: [
                        'Master attention mechanism implementation and mathematics',
                        'Understand transformer architecture components',
                        'Implement multi-head attention and self-attention',
                        'Apply transformers to various tasks'
                    ],
                    potentialQuestions: [
                        {
                            type: 'multipleChoice',
                            question: 'What are attention mechanisms in transformers?',
                            options: [
                                'Simple weight calculations',
                                'Components that dynamically weight input elements based on their relevance',
                                'Random selection process',
                                'Static neural connections'
                            ],
                            correctAnswer: 'Components that dynamically weight input elements based on their relevance'
                        }
                    ]
                },
                {
                    title: 'Graph Neural Networks',
                    content: 'Neural networks designed to process graph-structured data, enabling deep learning on networks and relational data structures.',
                    examples: [
                        {
                            code: `// Graph Neural Network Implementation
            const graph_neural_network = {
                // Network parameters
                node_embedding: torch.nn.Embedding(num_nodes, 64),
                edge_embedding: torch.nn.Embedding(num_edge_types, 32),
                
                // Message passing function
                message_passing: function(nodes, edges) {
                    let messages = {};
                    
                    // For each edge, compute and aggregate messages
                    edges.forEach(edge => {
                        const source = nodes[edge.from];
                        const target = nodes[edge.to];
                        const edge_type = edge.type;
                        
                        // Compute message
                        const message = this.compute_message(
                            source,
                            target,
                            this.edge_embedding(edge_type)
                        );
                        
                        // Aggregate messages
                        if (!messages[edge.to]) messages[edge.to] = [];
                        messages[edge.to].push(message);
                    });
                    
                    return messages;
                },
                
                // Node update function
                update_nodes: function(nodes, messages) {
                    return nodes.map((node, idx) => {
                        if (messages[idx]) {
                            // Aggregate incoming messages
                            const agg_message = torch.mean(
                                torch.stack(messages[idx])
                            );
                            // Update node representation
                            return torch.relu(
                                this.update_network(
                                    torch.cat([node, agg_message])
                                )
                            );
                        }
                        return node;
                    });
                }
            };`,
                            explanation: 'Graph Neural Network implementation showing:\n1. Node and edge embeddings\n2. Message passing between nodes\n3. Message aggregation\n4. Node state updates',
                            concept: 'Graph Neural Networks'
                        }
                    ],
                    learningObjectives: [
                        'Understand graph neural network architectures',
                        'Implement message passing and aggregation',
                        'Design node and edge feature processing',
                        'Apply GNNs to graph-structured problems'
                    ],
                    potentialQuestions: [
                        {
                            type: 'multipleChoice',
                            question: 'What are graph neural networks (GNNs)?',
                            options: [
                                'Flow charts',
                                'Neural networks that operate on graph-structured data',
                                'Visualization tools',
                                'Data structures'
                            ],
                            correctAnswer: 'Neural networks that operate on graph-structured data'
                        }
                    ]
                }
            ]
        }
    },
    {
        id: 15,
        title: 'Advanced AI Research Methods',
        content: {
            introduction: 'Study cutting-edge AI research methodologies and techniques, from few-shot learning to neurosymbolic AI',
            sections: [
                {
                    title: 'Few-Shot Learning',
                    content: 'Advanced techniques for training models to learn from very limited examples, enabling AI systems to generalize from small datasets like humans do.',
                    examples: [
                        {
                            code: `// Prototypical Network Implementation
            const protoNet = {
                // Encoder network configuration
                encoder: {
                    conv1: torch.nn.Conv2d(3, 64, 3),
                    conv2: torch.nn.Conv2d(64, 64, 3),
                    conv3: torch.nn.Conv2d(64, 64, 3),
                    conv4: torch.nn.Conv2d(64, 64, 3),
                    pool: torch.nn.MaxPool2d(2, 2),
                    flatten: torch.nn.Flatten()
                },
                
                // Calculate prototypes for each class
                getPrototypes: function(support_set, labels) {
                    // Encode all support examples
                    const embeddings = this.encoder(support_set);
                    const prototypes = {};
                    
                    // Calculate mean embedding for each class
                    labels.forEach((label, idx) => {
                        if (!prototypes[label]) {
                            prototypes[label] = [];
                        }
                        prototypes[label].push(embeddings[idx]);
                    });
                    
                    // Average embeddings for each class
                    Object.keys(prototypes).forEach(label => {
                        prototypes[label] = torch.stack(prototypes[label])
                            .mean(0);
                    });
                    
                    return prototypes;
                },
                
                // Classify query examples
                classify: function(query, prototypes) {
                    const queryEmbedding = this.encoder(query);
                    const distances = {};
                    
                    // Calculate distance to each prototype
                    Object.keys(prototypes).forEach(label => {
                        distances[label] = euclideanDistance(
                            queryEmbedding,
                            prototypes[label]
                        );
                    });
                    
                    return distances;
                }
            };`,
                            explanation: 'Implementation of Prototypical Networks showing:\n1. Encoder architecture for feature extraction\n2. Prototype calculation for each class\n3. Distance-based classification\n4. Support and query set handling',
                            concept: 'Prototypical Networks'
                        },
                        {
                            code: `// MAML (Model-Agnostic Meta-Learning) Implementation
            const maml = {
                // Base model architecture
                baseModel: {
                    conv1: torch.nn.Conv2d(3, 64, 3),
                    conv2: torch.nn.Conv2d(64, 64, 3),
                    fc: torch.nn.Linear(64, num_classes)
                },
                
                // Inner loop adaptation
                adapt: function(task, steps = 5, alpha = 0.01) {
                    let adapted = cloneModel(this.baseModel);
                    
                    // Perform gradient steps on task
                    for (let i = 0; i < steps; i++) {
                        // Forward pass
                        const output = adapted.forward(task.support.x);
                        const loss = crossEntropy(output, task.support.y);
                        
                        // Update model parameters
                        const grads = torch.autograd.grad(loss);
                        adapted = updateParameters(adapted, grads, alpha);
                    }
                    
                    return adapted;
                },
                
                // Outer loop optimization
                metaUpdate: function(tasks, beta = 0.001) {
                    const losses = [];
                    
                    // Adapt model to each task
                    tasks.forEach(task => {
                        const adapted = this.adapt(task);
                        
                        // Evaluate on query set
                        const queryOutput = adapted.forward(task.query.x);
                        const queryLoss = crossEntropy(
                            queryOutput,
                            task.query.y
                        );
                        
                        losses.push(queryLoss);
                    });
                    
                    // Update meta-parameters
                    const metaloss = torch.stack(losses).mean();
                    const metagrads = torch.autograd.grad(metaloss);
                    this.baseModel = updateParameters(
                        this.baseModel,
                        metagrads,
                        beta
                    );
                }
            };`,
                            explanation: 'MAML implementation showing:\n1. Inner loop adaptation to specific tasks\n2. Outer loop meta-optimization\n3. Gradient-based parameter updates\n4. Task-specific model adaptation',
                            concept: 'Meta-Learning'
                        }
                    ],
                    learningObjectives: [
                        'Master few-shot learning principles and implementations',
                        'Understand and implement Prototypical Networks',
                        'Implement MAML for meta-learning',
                        'Apply few-shot learning to real-world problems'
                    ],
                    potentialQuestions: [
                        {
                            type: 'multipleChoice',
                            question: 'What is the main purpose of few-shot learning?',
                            options: [
                                'Training with large datasets',
                                'Learning from very few examples',
                                'Optimizing model architecture',
                                'Reducing training time'
                            ],
                            correctAnswer: 'Learning from very few examples'
                        }
                    ]
                },
                {
                    title: 'Self-Supervised Learning',
                    content: 'Advanced techniques for learning from unlabeled data by automatically generating supervision signals from the data itself.',
                    examples: [
                        {
                            code: `// SimCLR Implementation
            const simclr = {
                // Network components
                encoder: resnet50(),
                projector: torch.nn.Sequential(
                    torch.nn.Linear(2048, 512),
                    torch.nn.ReLU(),
                    torch.nn.Linear(512, 128)
                ),
                
                // Data augmentation pipeline
                augment: function(image) {
                    return torch.nn.Sequential(
                        randomResizedCrop(224),
                        randomHorizontalFlip(),
                        colorJitter(0.4),
                        gaussianBlur(23)
                    )(image);
                },
                
                // Contrastive loss calculation
                contrastiveLoss: function(z1, z2, temperature = 0.5) {
                    // Normalize embeddings
                    z1 = torch.normalize(z1, dim=1);
                    z2 = torch.normalize(z2, dim=1);
                    
                    // Gather representations from all GPUs
                    z = torch.cat([z1, z2], dim=0);
                    
                    // Calculate similarity matrix
                    similarity = torch.mm(z, z.t()) / temperature;
                    
                    // Remove diagonal similarities
                    mask = torch.eye(z.shape[0]).bool();
                    similarity = similarity.masked_fill_(mask, -9e15);
                    
                    // Calculate loss
                    labels = torch.arange(z1.shape[0]);
                    labels = torch.cat([
                        labels + z1.shape[0],
                        labels
                    ]);
                    
                    return crossEntropy(similarity, labels);
                },
                
                // Training step
                train: function(batch) {
                    // Generate two views of each image
                    view1 = this.augment(batch);
                    view2 = this.augment(batch);
                    
                    // Get representations
                    z1 = this.projector(this.encoder(view1));
                    z2 = this.projector(this.encoder(view2));
                    
                    // Calculate loss
                    return this.contrastiveLoss(z1, z2);
                }
            };`,
                            explanation: 'SimCLR implementation showing:\n1. Encoder and projection networks\n2. Data augmentation pipeline\n3. Contrastive loss calculation\n4. Training procedure with views',
                            concept: 'Contrastive Learning'
                        }
                    ],
                    learningObjectives: [
                        'Master self-supervised learning techniques',
                        'Implement contrastive learning frameworks',
                        'Design effective data augmentation strategies',
                        'Apply self-supervised learning to unlabeled data'
                    ],
                    potentialQuestions: [
                        {
                            type: 'multipleChoice',
                            question: 'What is self-supervised learning?',
                            options: [
                                'Learning with labels',
                                'Learning from unlabeled data by creating supervision signals',
                                'Learning from synthetic data',
                                'Learning from reinforcement'
                            ],
                            correctAnswer: 'Learning from unlabeled data by creating supervision signals'
                        }
                    ]
                },
                {
                    title: 'Neurosymbolic AI',
                    content: 'Integration of neural networks with symbolic reasoning to combine the strength of deep learning with logical inference capabilities.',
                    examples: [
                        {
                            code: `// Neurosymbolic System Implementation
            const neuroSymbolic = {
                // Neural component
                neuralNet: {
                    encoder: torch.nn.Sequential(
                        torch.nn.Linear(input_dim, 256),
                        torch.nn.ReLU(),
                        torch.nn.Linear(256, 128)
                    ),
                    
                    extract: function(input) {
                        return this.encoder(input);
                    }
                },
                
                // Symbolic component
                symbolicReasoner: {
                    // Knowledge base
                    rules: new Set(),
                    facts: new Set(),
                    
                    // Add logical rules
                    addRule: function(rule) {
                        this.rules.add(rule);
                    },
                    
                    // Logical inference
                    infer: function(facts) {
                        let conclusions = new Set(facts);
                        let changed = true;
                        
                        while (changed) {
                            changed = false;
                            this.rules.forEach(rule => {
                                const newFacts = rule.apply(conclusions);
                                
                                newFacts.forEach(fact => {
                                    if (!conclusions.has(fact)) {
                                        conclusions.add(fact);
                                        changed = true;
                                    }
                                });
                            });
                        }
                        
                        return conclusions;
                    }
                },
                
                // Neural to symbolic conversion
                neuralToSymbolic: function(features, threshold = 0.5) {
                    const facts = new Set();
                    
                    // Convert neural outputs to symbolic facts
                    features.forEach((value, idx) => {
                        if (value > threshold) {
                            facts.add(this.predicates[idx]);
                        }
                    });
                    
                    return facts;
                },
                
                // Complete pipeline
                process: function(input) {
                    // Neural processing
                    const features = this.neuralNet.extract(input);
                    
                    // Convert to symbolic facts
                    const facts = this.neuralToSymbolic(features);
                    
                    // Symbolic reasoning
                    const conclusions = this.symbolicReasoner.infer(facts);
                    
                    return conclusions;
                }
            };`,
                            explanation: 'Neurosymbolic system implementation showing:\n1. Neural network for feature extraction\n2. Symbolic reasoner with rules and facts\n3. Neural-to-symbolic conversion\n4. Combined reasoning pipeline',
                            concept: 'Neurosymbolic Integration'
                        }
                    ],
                    learningObjectives: [
                        'Understand neurosymbolic AI principles',
                        'Implement hybrid neural-symbolic systems',
                        'Design effective neural-to-symbolic mappings',
                        'Apply neurosymbolic reasoning to complex tasks'
                    ],
                    potentialQuestions: [
                        {
                            type: 'multipleChoice',
                            question: 'What is the main advantage of neurosymbolic AI?',
                            options: [
                                'Faster training',
                                'Combining neural learning with symbolic reasoning',
                                'Lower memory usage',
                                'Simpler architecture'
                            ],
                            correctAnswer: 'Combining neural learning with symbolic reasoning'
                        }
                    ]
                }
            ]
        }
    },
    {
        id: 13,
        title: 'Advanced Machine Learning',
        content: {
            introduction: 'Deep dive into complex machine learning concepts',
            sections: [
                {
                    title: 'Ensemble Methods',
                    content: 'Ensemble methods combine multiple models to create more robust predictions.',
                    examples: [
                        {
                            code: `# Random Forest Example
    from sklearn.ensemble import RandomForestClassifier
    
    rf = RandomForestClassifier(n_estimators=100)
    rf.fit(X_train, y_train)
    
    # Gradient Boosting Example
    from sklearn.ensemble import GradientBoostingClassifier
    
    gb = GradientBoostingClassifier()
    gb.fit(X_train, y_train)`,
                            explanation: 'Common ensemble methods include Random Forests and Gradient Boosting',
                            concept: 'Ensemble Methods',
                        },
                        {
                            code: `# Combining Predictions
    rf_predictions = rf.predict(X_test)
    gb_predictions = gb.predict(X_test)
    
    # Simple Averaging
    ensemble_predictions = (rf_predictions + gb_predictions) / 2`,
                            explanation: 'Example of combining predictions from two models',
                            concept: 'Combining Models',
                        }
                    ],
                    learningObjectives: [
                        'Describe the core concept behind Ensemble Methods.',
                        'Implement Random Forest and Gradient Boosting.',
                        'Combine predictions from different models using averaging or voting.',
                        'Understand the benefits and drawbacks of using Ensemble Methods.'
                    ],
                    potentialQuestions: [
                        {
                            type: 'multipleChoice',
                            question: 'What is the primary benefit of using ensemble methods?',
                            options: ['Reduced overfitting', 'Improved generalization', 'Faster training', 'Simplified Model Deployment'],
                            correctAnswer: 'Improved generalization'
                        },
                        {
                            type: 'trueFalse',
                            question: 'Ensemble methods are always more computationally expensive than single models.',
                            correctAnswer: 'true'
                        },
                        {
                            type: 'coding',
                            question: 'Create a function that takes two sets of model predictions as input and returns the averaged prediction results.',
                            expectedOutput: 'A function that returns a set of averaged predictions'
                        }
                    ]
                },
                {
                    title: 'Model Distillation',
                    content: 'Process of transferring knowledge from a large model to a smaller one.',
                    examples: [
                        {
                            code: `import torch
    
    def distillation_loss(student_outputs, teacher_outputs, T=2.0):
        return torch.nn.KLDivLoss()(
            F.log_softmax(student_outputs/T, dim=1),
            F.softmax(teacher_outputs/T, dim=1)
        )`,
                            explanation: 'Temperature-scaled distillation loss function',
                            concept: 'Model Distillation',
                        },
                        {
                            code: `# Example of Training Student Model
    for epoch in range(num_epochs):
        student_outputs = student_model(inputs)
        teacher_outputs = teacher_model(inputs)
        
        loss = distillation_loss(student_outputs, teacher_outputs)
        loss.backward()`,
                            explanation: 'Training the student model with distillation loss',
                            concept: 'Student Training',
                        }
                    ],
                    learningObjectives: [
                        'Define Model Distillation and its purpose.',
                        'Describe how temperature scaling affects distillation loss.',
                        'Implement the distillation loss function.',
                        'Understand the benefits and limitations of model distillation.'
                    ],
                    potentialQuestions: [
                        {
                            type: 'multipleChoice',
                            question: 'What is the primary purpose of model distillation?',
                            options: ['To improve model accuracy', 'To reduce model size', 'To accelerate model training', 'To enhance interpretability'],
                            correctAnswer: 'To reduce model size'
                        },
                        {
                            type: 'trueFalse',
                            question: 'Model distillation always requires labeled data.',
                            correctAnswer: 'true'
                        },
                        {
                            type: 'coding',
                            question: 'Create a function that calculates distillation loss given student and teacher model outputs. Include temperature scaling.',
                            expectedOutput: 'A function implementing distillation loss calculation'
                        }
                    ]
                },
                {
                    title: 'Meta-Learning',
                    content: 'Training models that can learn how to learn, enabling quick adaptation to new tasks.',
                    examples: [
                        {
                            code: `class MAML(nn.Module):
        def __init__(self, base_model):
            self.model = base_model
            self.meta_lr = 0.01
            
        def adapt(self, support_set):
            adapted_params = self.model.clone()
            adapted_params.train(support_set)
            return adapted_params`,
                            explanation: 'Model-Agnostic Meta-Learning (MAML) implementation structure',
                            concept: 'Meta-Learning'
                        },
                        {
                            code: `# Example of Inner Loop Training
    adapted_params = model.adapt(support_set)
    
    # Example of Outer Loop Update
    meta_loss = compute_meta_loss(adapted_params, query_set)
    meta_optimizer.zero_grad()
    meta_loss.backward()
    meta_optimizer.step()`,
                            explanation: 'Inner and outer loop training in meta-learning',
                            concept: 'Training Loop'
                        }
                    ],
                    learningObjectives: [
                        'Define Meta-Learning and its goal.',
                        'Describe the concept of few-shot learning in meta-learning.',
                        'Explain the inner and outer loop training process in MAML.',
                        'Understand applications of Meta-Learning.'
                    ],
                    potentialQuestions: [
                        {
                            type: 'multipleChoice',
                            question: 'What is the primary goal of meta-learning?',
                            options: ['To train models faster', 'To improve single-task performance', 'To learn how to learn', 'To reduce computational cost'],
                            correctAnswer: 'To learn how to learn'
                        },
                        {
                            type: 'trueFalse',
                            question: 'Meta-learning requires a large number of labeled datasets.',
                            correctAnswer: 'true'
                        },
                        {
                            type: 'coding',
                            question: 'Create a function that performs one step of gradient descent in the inner loop of MAML, given a support set and a base model.',
                            expectedOutput: 'A function performing a gradient descent step in the inner loop'
                        }
                    ]
                }
            ]
        }
    },
    {
        id: 2,
        title: 'React Fundamentals',
        content: {
            introduction: 'Learn core React concepts and patterns',
            sections: [
                {
                    title: 'Components and Props',
                    content: 'React components are reusable UI pieces that accept props as inputs. Components can be created as functions or classes, each with their own benefits.',
                    examples: [
                        {
                            code: `function Welcome(props) {
              return <h1>Hello, {props.name}</h1>;
            }
            
            const element = <Welcome name="Sara" />;`,
                            explanation: 'Basic functional component with props',
                            concept: 'Functional Component'
                        },
                        {
                            code: `class Welcome extends React.Component {
            render() {
              return <h1>Hello, {this.props.name}</h1>;
            }
          }`,
                            explanation: 'Basic class component with props',
                            concept: 'Class Component'
                        },
                        {
                            code: `// Example demonstrating prop drilling
    const App = () => {
      const user = { name: 'John' };
      return <ParentComponent user={user} />;
    }
    
    const ParentComponent = ({ user }) => {
      return <ChildComponent user={user} />;
    }
    
    const ChildComponent = ({ user }) => {
      return <h1>Hello, {user.name}</h1>;
    }`,
                            explanation: 'Example of prop drilling through components',
                            concept: 'Prop Drilling'
                        }
                    ],
                    learningObjectives: [
                        'Describe what React components are and why they are useful.',
                        'Differentiate between functional and class components.',
                        'Explain how to pass data to components using props.',
                        'Understand what prop drilling is and how to avoid it.',
                        'Explain the Virtual DOM and its benefits.',
                        'Write and understand JSX syntax.'
                    ],
                    potentialQuestions: [
                        {
                            type: 'multipleChoice',
                            question: 'What is the primary purpose of React components?',
                            options: ['To handle data', 'To create reusable UI pieces', 'To manage application state', 'To optimize performance'],
                            correctAnswer: 'To create reusable UI pieces'
                        },
                        {
                            type: 'multipleChoice',
                            question: 'What is the virtual DOM in React?',
                            options: [
                                'A direct copy of the actual DOM',
                                'A lightweight copy of the actual DOM used for performance optimization',
                                'A programming language',
                                'A web browser feature'
                            ],
                            correctAnswer: 'A lightweight copy of the actual DOM used for performance optimization'
                        },
                        {
                            type: 'multipleChoice',
                            question: 'What is prop drilling in React?',
                            options: [
                                'A way to create props',
                                'Passing props through multiple levels of components that don not need them',
                                'A type of component',
                                'A routing method'
                            ],
                            correctAnswer: 'Passing props through multiple levels of components that don not need them'
                        }
                    ]
                },
                {
                    title: 'State and Lifecycle',
                    content: 'State enables React components to manage dynamic data. Understanding state management and component lifecycle is crucial for building interactive applications.',
                    examples: [
                        {
                            code: `function Counter() {
              const [count, setCount] = useState(0);
              
              useEffect(() => {
                document.title = \`Count: \${count}\`;
              }, [count]);
            
              return (
                <button onClick={() => setCount(count + 1)}>
                  Count: {count}
                </button>
              );
            }`,
                            explanation: 'Component using state and effects',
                            concept: 'State and Effects'
                        },
                        {
                            code: `class Clock extends React.Component {
            constructor(props) {
              super(props);
              this.state = {date: new Date()};
            }
            
            componentDidMount() {
              this.timerID = setInterval(
                () => this.tick(),
                1000
              );
            }
            
            componentWillUnmount() {
              clearInterval(this.timerID);
            }
            
            tick() {
              this.setState({
                date: new Date()
              });
            }
            
            render() {
              return (
                <div>
                  <h1>Hello, world!</h1>
                  <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
                </div>
              );
            }
          }`,
                            explanation: 'Class component using lifecycle methods',
                            concept: 'Lifecycle'
                        }
                    ],
                    learningObjectives: [
                        'Explain what state is in React and its purpose.',
                        'Describe how to update state in React components.',
                        'Understand the role of lifecycle methods in class components.',
                        'Use the `useEffect` hook for managing side effects.',
                        'Implement performance optimization using React.memo'
                    ],
                    potentialQuestions: [
                        {
                            type: 'multipleChoice',
                            question: 'What is React state?',
                            options: [
                                'A database system',
                                'An object that determines how a component renders and behaves',
                                'A styling method',
                                'A routing system'
                            ],
                            correctAnswer: 'An object that determines how a component renders and behaves'
                        },
                        {
                            type: 'multipleChoice',
                            question: 'What is the purpose of React.memo?',
                            options: [
                                'To create new components',
                                'To prevent unnecessary re-renders of components',
                                'To handle routing',
                                'To manage state'
                            ],
                            correctAnswer: 'To prevent unnecessary re-renders of components'
                        }
                    ]
                },
                {
                    title: 'Hooks',
                    content: 'Hooks let you use state and other React features in functional components.',
                    examples: [
                        {
                            code: `function DataFetcher() {
              const [data, setData] = useState(null);
              const [loading, setLoading] = useState(true);
            
              useEffect(() => {
                fetchData().then(result => {
                  setData(result);
                  setLoading(false);
                });
              }, []);
            
              if (loading) return 'Loading...';
              return <div>{data}</div>;
            }`,
                            explanation: 'Using useState and useEffect hooks for data fetching',
                            concept: 'Data Fetching'
                        },
                        {
                            code: `function ThemeComponent() {
              const theme = useContext(ThemeContext);
              return (
                <div className={theme}>
                  Themed content
                </div>
              );
            }`,
                            explanation: 'Using useContext hook for theme management',
                            concept: 'Context Usage'
                        }
                    ],
                    learningObjectives: [
                        'Explain what React Hooks are and why they are useful.',
                        'Describe the purpose of the `useState` and `useEffect` hooks.',
                        'Understand how to use the `useContext` hook.',
                        'Create custom React Hooks for reusable logic.',
                        'Understand the rules of using React Hooks.'
                    ],
                    potentialQuestions: [
                        {
                            type: 'multipleChoice',
                            question: 'What is the purpose of useState hook?',
                            options: [
                                'To make HTTP requests',
                                'To manage state in functional components',
                                'To handle routing',
                                'To style components'
                            ],
                            correctAnswer: 'To manage state in functional components'
                        },
                        {
                            type: 'multipleChoice',
                            question: 'What is the purpose of useEffect hook?',
                            options: [
                                'To create new components',
                                'To handle side effects like data fetching, subscriptions, or DOM manipulation',
                                'To manage state',
                                'To handle routing'
                            ],
                            correctAnswer: 'To handle side effects like data fetching, subscriptions, or DOM manipulation'
                        },
                        {
                            type: 'multipleChoice',
                            question: 'What is the purpose of useContext hook?',
                            options: [
                                'To create new contexts',
                                'To consume context and subscribe to context changes',
                                'To manage local state',
                                'To handle routing'
                            ],
                            correctAnswer: 'To consume context and subscribe to context changes'
                        }
                    ]
                }
            ]
        }
    },
            {
                id: 3,
                title: 'CSS Mastery',
                content: {
                    introduction: 'Master modern CSS techniques, layouts, and best practices: From fundamental concepts to advanced styling and responsive design. This comprehensive guide covers everything from the box model to complex animations.',
                    sections: [
                        {
                            title: 'CSS Fundamentals and Box Model',
                            content: 'Understanding core CSS concepts, the box model, and how elements interact with space.',
                            examples: [
                                {
                                    code: `/* Box Model Demonstration */
            .box-model-example {
                /* Content area */
                width: 300px;
                height: 200px;
                
                /* Padding - space inside the border */
                padding: 20px;
                
                /* Border - the edge of the element */
                border: 2px solid #333;
                
                /* Margin - space outside the border */
                margin: 30px;
                
                /* Box-sizing for predictable sizing */
                box-sizing: border-box;
            }
            
            /* Display Property Examples */
            .different-displays {
                /* Block takes full width */
                display: block;
                
                /* Inline flows with text */
                display: inline;
                
                /* Inline-block combines both */
                display: inline-block;
                
                /* Hidden but preserves space */
                visibility: hidden;
                
                /* Completely removed */
                display: none;
            }`,
                                    explanation: 'The CSS Box Model is fundamental to layout:\n1. Content: The actual content area\n2. Padding: Space inside the border\n3. Border: The edge of the element\n4. Margin: Space outside the border\n\nDisplay properties control how elements interact with layout flow.',
                                    concept: 'Box Model and Display'
                                },
                                {
                                    code: `/* CSS Specificity Examples */
            /* Specificity: 0001 */
            p {
                color: blue;
            }
            
            /* Specificity: 0010 */
            .text {
                color: red;
            }
            
            /* Specificity: 0100 */
            #unique {
                color: green;
            }
            
            /* Specificity: 0011 */
            .container .text {
                color: purple;
            }
            
            /* Specificity: 0011 */
            .text:hover {
                color: orange;
            }
            
            /* Using !important (avoid when possible) */
            .text {
                color: yellow !important;
            }`,
                                    explanation: 'CSS Specificity determines which styles are applied when multiple rules conflict:\n1. Inline styles (1000)\n2. IDs (0100)\n3. Classes, attributes, pseudo-classes (0010)\n4. Elements, pseudo-elements (0001)',
                                    concept: 'CSS Specificity'
                                }
                            ],
                            learningObjectives: [
                                'Master the CSS Box Model and its components',
                                'Understand the difference between padding and margin',
                                'Learn CSS specificity and cascade rules',
                                'Master different display properties and their effects'
                            ]
                        },
                        {
                            title: 'Modern Layout Systems',
                            content: 'Advanced layout techniques using Flexbox and Grid, with responsive design considerations.',
                            examples: [
                                {
                                    code: `/* Flexbox Layout System */
            .flex-container {
                display: flex;
                justify-content: space-between;
                align-items: center;
                flex-wrap: wrap;
                gap: 20px;
            }
            
            .flex-item {
                flex: 1 1 300px;
                /* flex-grow, flex-shrink, flex-basis */
            }
            
            /* Grid Layout System */
            .grid-container {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
                grid-gap: 20px;
                grid-auto-rows: minmax(100px, auto);
            }
            
            .grid-item {
                grid-column: span 2;
                /* For specific item placement */
            }
            
            /* Responsive Design with Media Queries */
            @media screen and (max-width: 768px) {
                .grid-container {
                    grid-template-columns: 1fr;
                }
                
                .flex-item {
                    flex: 1 1 100%;
                }
            }`,
                                    explanation: 'Modern CSS provides powerful layout systems:\n1. Flexbox for one-dimensional layouts\n2. Grid for two-dimensional layouts\n3. Media queries for responsive design\n4. Combined approaches for complex layouts',
                                    concept: 'Layout Systems'
                                },
                                {
                                    code: `/* CSS Preprocessor Example (SCSS) */
            // Variables
            $primary-color: #3498db;
            $spacing: 20px;
            
            // Nesting
            .container {
                max-width: 1200px;
                margin: 0 auto;
                
                // Nested elements
                .header {
                    padding: $spacing;
                    background: $primary-color;
                    
                    // Nested pseudo-classes
                    &:hover {
                        background: darken($primary-color, 10%);
                    }
                }
            }
            
            // Mixins
            @mixin flex-center {
                display: flex;
                justify-content: center;
                align-items: center;
            }
            
            // Using mixins
            .centered-content {
                @include flex-center;
            }`,
                                    explanation: 'CSS preprocessors extend CSS capabilities with:\n1. Variables for consistent values\n2. Nesting for clearer structure\n3. Mixins for reusable code\n4. Functions for dynamic values',
                                    concept: 'CSS Preprocessors'
                                }
                            ],
                            learningObjectives: [
                                'Master Flexbox and Grid layout systems',
                                'Understand CSS preprocessor features and benefits',
                                'Create responsive layouts with media queries',
                                'Implement complex layouts using combined approaches'
                            ]
                        },
                        {
                            title: 'Advanced Styling and Interactions',
                            content: 'Advanced CSS techniques for styling, animations, and interactive elements.',
                            examples: [
                                {
                                    code: `/* Pseudo-classes and States */
            .button {
                background: #3498db;
                padding: 10px 20px;
                transition: all 0.3s ease;
                
                /* Different states */
                &:hover {
                    background: #2980b9;
                    transform: scale(1.05);
                }
                
                &:active {
                    transform: scale(0.95);
                }
                
                &:focus {
                    outline: 3px solid rgba(52, 152, 219, 0.5);
                    outline-offset: 2px;
                }
                
                /* Form states */
                &:disabled {
                    opacity: 0.6;
                    cursor: not-allowed;
                }
            }
            
            /* Advanced Transitions and Animations */
            @keyframes slideIn {
                from {
                    transform: translateX(-100%);
                    opacity: 0;
                }
                
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            
            .animated-element {
                animation: slideIn 0.5s ease-out forwards;
                
                /* Multiple transitions */
                transition: 
                    transform 0.3s ease,
                    background-color 0.3s ease,
                    box-shadow 0.3s ease-in-out;
                    
                &:hover {
                    transform: translateY(-5px);
                    box-shadow: 0 5px 15px rgba(0,0,0,0.3);
                }
            }`,
                                    explanation: 'Advanced CSS includes:\n1. Pseudo-classes for element states\n2. Smooth transitions between states\n3. Complex animations with keyframes\n4. Interactive effects and feedback',
                                    concept: 'Advanced Interactions'
                                },
                                {
                                    code: `/* Modern CSS Features */
            .modern-styles {
                /* Custom properties (CSS variables) */
                --primary-color: #3498db;
                --spacing-unit: 8px;
                
                /* Using CSS variables */
                color: var(--primary-color);
                padding: calc(var(--spacing-unit) * 2);
                
                /* Logical properties */
                margin-block: 1rem;
                padding-inline: 2rem;
                
                /* Modern color formats */
                background: hsl(210 50% 50% / 0.8);
                border-color: rgb(51 51 51 / 75%);
                
                /* Modern selectors */
                &:is(:hover, :focus) {
                    background: hsl(210 50% 40%);
                }
                
                /* Container queries */
                container-type: inline-size;
                @container (min-width: 400px) {
                    font-size: 1.2rem;
                }
            }`,
                                    explanation: 'Modern CSS features include:\n1. Custom properties for dynamic values\n2. Logical properties for internationalization\n3. Modern color formats\n4. Container queries for component-based design',
                                    concept: 'Modern CSS'
                                }
                            ],
                            learningObjectives: [
                                'Master pseudo-classes and element states',
                                'Create complex animations and transitions',
                                'Understand and use modern CSS features',
                                'Implement advanced interactive effects'
                            ]
                        }
                    ]
                }
            },
            {
                id: 7,
                title: 'Computer Vision',
                content: {
                    introduction: 'Learn how AI processes, analyzes, and understands visual information: From basic image processing to advanced visual understanding tasks. This comprehensive guide covers fundamental concepts and state-of-the-art techniques in computer vision.',
                    sections: [
                        {
                            title: 'Image Processing and Preprocessing',
                            content: 'Essential techniques for preparing and enhancing images for computer vision tasks.',
                            examples: [
                                {
                                    code: `import cv2
            import numpy as np
            
            class ImagePreprocessor:
                def __init__(self):
                    self.standard_size = (224, 224)
                
                def preprocess_image(self, image):
                    # Basic preprocessing pipeline
                    # Resize for consistency
                    resized = cv2.resize(image, self.standard_size)
                    
                    # Convert to different color spaces
                    gray = cv2.cvtColor(resized, cv2.COLOR_BGR2GRAY)
                    hsv = cv2.cvtColor(resized, cv2.COLOR_BGR2HSV)
                    
                    # Apply noise reduction
                    denoised = cv2.fastNlMeansDenoising(gray)
                    
                    # Enhance contrast
                    clahe = cv2.createCLAHE(clipLimit=2.0, tileGridSize=(8,8))
                    enhanced = clahe.apply(denoised)
                    
                    return {
                        'original': resized,
                        'grayscale': gray,
                        'hsv': hsv,
                        'enhanced': enhanced
                    }`,
                                    explanation: 'Image preprocessing is crucial for preparing images for analysis. It includes:\n1. Resizing for consistent input\n2. Color space conversion\n3. Noise reduction\n4. Contrast enhancement\n5. Normalization\nThese steps improve the quality and consistency of input data for computer vision models.',
                                    concept: 'Image Preprocessing'
                                },
                                {
                                    code: `def advanced_preprocessing(image):
                # Normalize pixel values
                normalized = image.astype(float) / 255.0
                
                # Apply various filters
                gaussian = cv2.GaussianBlur(image, (5,5), 0)
                median = cv2.medianBlur(image, 5)
                bilateral = cv2.bilateralFilter(image, 9, 75, 75)
                
                return {
                    'normalized': normalized,
                    'gaussian': gaussian,
                    'median': median,
                    'bilateral': bilateral
                }`,
                                    explanation: 'Advanced preprocessing techniques include specialized filtering methods and normalization strategies that prepare images for specific computer vision tasks.',
                                    concept: 'Advanced Preprocessing'
                                }
                            ],
                            learningObjectives: [
                                'Master fundamental image preprocessing techniques',
                                'Understand different color spaces and their uses',
                                'Learn various filtering and enhancement methods',
                                'Apply appropriate preprocessing for different CV tasks'
                            ]
                        },
                        {
                            title: 'Segmentation and Feature Extraction',
                            content: 'Techniques for dividing images into meaningful segments and extracting important features.',
                            examples: [
                                {
                                    code: `class SegmentationTools:
                def __init__(self):
                    self.segment_net = cv2.dnn.readNetFromTensorflow('segment_model.pb')
                
                def semantic_segmentation(self, image):
                    # Semantic segmentation assigns each pixel a class
                    blob = cv2.dnn.blobFromImage(image, 1/255.0)
                    self.segment_net.setInput(blob)
                    output = self.segment_net.forward()
                    # Process output to get per-pixel classifications
                    return output
                
                def extract_features(self, image):
                    # SIFT feature extraction
                    sift = cv2.SIFT_create()
                    keypoints, descriptors = sift.detectAndCompute(image, None)
                    
                    # HOG feature extraction
                    hog = cv2.HOGDescriptor()
                    hog_features = hog.compute(image)
                    
                    return {
                        'keypoints': keypoints,
                        'descriptors': descriptors,
                        'hog_features': hog_features
                    }`,
                                    explanation: 'Image segmentation partitions images into meaningful segments or objects. Feature extraction identifies distinctive visual patterns and characteristics. These techniques are fundamental for:\n1. Object recognition\n2. Scene understanding\n3. Image analysis\n4. Pattern detection',
                                    concept: 'Segmentation and Features'
                                },
                                {
                                    code: `def image_segmentation_methods(image):
                # Thresholding-based segmentation
                _, thresh = cv2.threshold(image, 128, 255, cv2.THRESH_BINARY)
                
                # Watershed segmentation
                markers = np.zeros(image.shape[:2], dtype=np.int32)
                markers = cv2.watershed(image, markers)
                
                # Grab Cut segmentation
                mask = np.zeros(image.shape[:2], np.uint8)
                bgdModel = np.zeros((1,65), np.float64)
                fgdModel = np.zeros((1,65), np.float64)
                rect = (50,50,450,290)
                cv2.grabCut(image, mask, rect, bgdModel, fgdModel, 5, cv2.GC_INIT_WITH_RECT)`,
                                    explanation: 'Different segmentation methods serve various purposes in computer vision, from simple threshold-based approaches to sophisticated algorithms for complex scene understanding.',
                                    concept: 'Segmentation Methods'
                                }
                            ],
                            learningObjectives: [
                                'Understand different types of image segmentation',
                                'Master feature extraction techniques',
                                'Learn semantic segmentation concepts',
                                'Apply segmentation for object identification'
                            ]
                        },
                        {
                            title: 'Object Detection and Recognition',
                            content: 'Advanced techniques for detecting, recognizing, and analyzing objects in images.',
                            examples: [
                                {
                                    code: `import torch
            from torchvision.models import detection
            
            class ObjectDetector:
                def __init__(self):
                    self.model = detection.fasterrcnn_resnet50_fpn(pretrained=True)
                    self.model.eval()
                    
                def detect_objects(self, image):
                    # Convert image to tensor
                    tensor = torch.from_numpy(image).permute(2, 0, 1)
                    predictions = self.model([tensor])
                    
                    return {
                        'boxes': predictions[0]['boxes'],
                        'labels': predictions[0]['labels'],
                        'scores': predictions[0]['scores']
                    }
                    
                def facial_recognition(self, image):
                    # Face detection
                    face_cascade = cv2.CascadeClassifier(
                        cv2.data.haarcascades + 'haarcascade_frontalface_default.xml'
                    )
                    faces = face_cascade.detectMultiScale(image, 1.3, 5)
                    
                    # Face recognition (using a pre-trained model)
                    recognizer = cv2.face.LBPHFaceRecognizer_create()
                    return faces, recognizer`,
                                    explanation: 'Object detection and facial recognition are key computer vision tasks that involve:\n1. Locating objects/faces in images\n2. Drawing bounding boxes\n3. Classifying detected objects\n4. Recognizing specific individuals',
                                    concept: 'Detection and Recognition'
                                }
                            ],
                            learningObjectives: [
                                'Master object detection techniques',
                                'Understand facial recognition systems',
                                'Learn to implement detection models',
                                'Apply recognition algorithms effectively'
                            ]
                        },
                        {
                            title: 'Advanced Vision Tasks',
                            content: 'Specialized computer vision tasks including OCR, pose estimation, and advanced CNN applications.',
                            examples: [
                                {
                                    code: `import pytesseract
            import mediapipe as mp
            
            class AdvancedVisionTasks:
                def __init__(self):
                    self.mp_pose = mp.solutions.pose
                    self.pose = self.mp_pose.Pose()
                    
                def perform_ocr(self, image):
                    # Optical Character Recognition
                    text = pytesseract.image_to_string(image)
                    boxes = pytesseract.image_to_boxes(image)
                    return text, boxes
                
                def estimate_pose(self, image):
                    # Human pose estimation
                    results = self.pose.process(image)
                    if results.pose_landmarks:
                        landmarks = results.pose_landmarks.landmark
                        return [(lm.x, lm.y, lm.z) for lm in landmarks]
                    return []
                
                def classify_image(self, image):
                    # Image classification using CNN
                    model = torch.hub.load('pytorch/vision:v0.10.0', 
                                         'resnet50', pretrained=True)
                    model.eval()
                    # Preprocess and classify
                    output = model(self.preprocess(image))
                    return torch.nn.functional.softmax(output[0], dim=0)`,
                                    explanation: 'Advanced vision tasks include:\n1. OCR: Converting text images to machine-readable text\n2. Pose Estimation: Detecting human body positions\n3. Image Classification: Categorizing images into classes\n4. Each task requires specialized models and techniques',
                                    concept: 'Advanced Tasks'
                                },
                                {
                                    code: `class CNNArchitecture(nn.Module):
                def __init__(self):
                    super().__init__()
                    # Convolutional layers
                    self.conv1 = nn.Conv2d(3, 64, 3)
                    self.conv2 = nn.Conv2d(64, 128, 3)
                    self.conv3 = nn.Conv2d(128, 256, 3)
                    
                    # Pooling and normalization
                    self.pool = nn.MaxPool2d(2, 2)
                    self.batch_norm = nn.BatchNorm2d(256)
                    
                    # Fully connected layers
                    self.fc1 = nn.Linear(256 * 6 * 6, 512)
                    self.fc2 = nn.Linear(512, 10)
                    
                def forward(self, x):
                    # Forward pass implementation
                    x = self.pool(F.relu(self.conv1(x)))
                    x = self.pool(F.relu(self.conv2(x)))
                    x = self.pool(self.batch_norm(F.relu(self.conv3(x))))
                    x = x.view(-1, 256 * 6 * 6)
                    x = F.relu(self.fc1(x))
                    x = self.fc2(x)
                    return x`,
                                    explanation: 'Convolutional Neural Networks (CNNs) are specialized for processing visual data through:\n1. Convolutional layers for feature extraction\n2. Pooling layers for dimension reduction\n3. Fully connected layers for classification\n4. Various activation functions and normalization techniques',
                                    concept: 'CNN Architecture'
                                }
                            ],
                            learningObjectives: [
                                'Master OCR implementation and applications',
                                'Understand pose estimation techniques',
                                'Learn CNN architectures and their uses',
                                'Apply advanced vision tasks to real problems'
                            ]
                        }
                    ]
                }
            },
            {
                id: 8,
                title: 'Natural Language Processing',
                content: {
                    introduction: 'Understanding how AI processes and interprets human language: A comprehensive guide to NLP fundamentals and advanced concepts. This module covers everything from basic text processing to state-of-the-art language understanding techniques.',
                    sections: [
                        {
                            title: 'Fundamental Text Processing',
                            content: 'Core concepts and techniques for processing text data, focusing on the building blocks of NLP.',
                            examples: [
                                {
                                    code: `from nltk.tokenize import word_tokenize, sent_tokenize
            from nltk.corpus import stopwords
            
            def demonstrate_tokenization(text):
                # Sentence tokenization
                sentences = sent_tokenize(text)
                print("Sentences:", sentences)
                
                # Word tokenization
                words = word_tokenize(text)
                print("Words:", words)
                
                return sentences, words`,
                                    explanation: 'Tokenization is the process of breaking text into smaller units (tokens) such as words, subwords, or sentences. It\'s the first step in most NLP pipelines and is crucial for all further processing. Word tokenization splits text into words, while sentence tokenization splits text into sentences.',
                                    concept: 'Tokenization Fundamentals'
                                },
                                {
                                    code: `from nltk.tag import pos_tag
            from nltk.chunk import ne_chunk
            
            def analyze_text_structure(text):
                # POS Tagging
                tokens = word_tokenize(text)
                pos_tags = pos_tag(tokens)
                
                # Example of what each tag means
                tag_examples = {
                    'NN': 'Noun',
                    'VB': 'Verb',
                    'JJ': 'Adjective',
                    'RB': 'Adverb'
                }
                
                return pos_tags`,
                                    explanation: 'Part-of-speech (POS) tagging identifies the grammatical parts of speech in text. This is essential for understanding sentence structure and meaning. Each token is labeled with its grammatical role (noun, verb, adjective, etc.).',
                                    concept: 'POS Tagging'
                                }
                            ],
                            learningObjectives: [
                                'Master tokenization techniques and understand when to use different tokenization approaches',
                                'Comprehend the importance and application of POS tagging in text analysis',
                                'Learn the fundamental building blocks of text processing',
                                'Understand how these basic techniques enable more complex NLP tasks'
                            ]
                        },
                        {
                            title: 'Text Analysis and Understanding',
                            content: 'Advanced techniques for extracting meaning and insights from text, including sentiment analysis, named entity recognition, and text classification.',
                            examples: [
                                {
                                    code: `from transformers import pipeline
            
            def comprehensive_text_analysis(text):
                # Sentiment Analysis
                sentiment_analyzer = pipeline('sentiment-analysis')
                sentiment = sentiment_analyzer(text)[0]
                
                # Named Entity Recognition
                ner = pipeline('ner')
                entities = ner(text)
                
                # Text Classification
                classifier = pipeline('text-classification')
                category = classifier(text)[0]
                
                return {
                    'sentiment': sentiment,
                    'entities': entities,
                    'category': category
                }`,
                                    explanation: 'This section covers three key NLP tasks:\n1. Sentiment Analysis: Determines the emotional tone or opinion in text (positive, negative, neutral)\n2. Named Entity Recognition (NER): Identifies and classifies named entities (people, organizations, locations) in text\n3. Text Classification: Categorizes text into predefined categories based on its content',
                                    concept: 'Text Analysis Suite'
                                },
                                {
                                    code: `# Information Extraction System
            import spacy
            
            def extract_structured_info(text):
                nlp = spacy.load("en_core_web_sm")
                doc = nlp(text)
                
                # Extract various types of information
                extracted_info = {
                    'entities': [(ent.text, ent.label_) for ent in doc.ents],
                    'noun_phrases': [chunk.text for chunk in doc.noun_chunks],
                    'relationships': [(token.head.text, token.text, token.dep_) 
                                     for token in doc if token.dep_ != 'punct']
                }
                
                return extracted_info`,
                                    explanation: 'Information Extraction (IE) automatically extracts structured information from unstructured text. This involves identifying specific pieces of information like names, relationships, events, and facts. IE is crucial for converting human-readable text into machine-processable structured data.',
                                    concept: 'Information Extraction'
                                }
                            ],
                            learningObjectives: [
                                'Master sentiment analysis techniques and understand their applications',
                                'Learn to implement and use named entity recognition systems',
                                'Understand text classification methodologies and their use cases',
                                'Develop skills in extracting structured information from text'
                            ]
                        },
                        {
                            title: 'Language Generation and Translation',
                            content: 'Advanced systems for generating and translating text, including language modeling and machine translation.',
                            examples: [
                                {
                                    code: `from transformers import AutoModelForCausalLM, AutoTokenizer
            
            class LanguageModelDemo:
                def __init__(self):
                    self.model = AutoModelForCausalLM.from_pretrained("gpt2")
                    self.tokenizer = AutoTokenizer.from_pretrained("gpt2")
                
                def generate_text(self, prompt, max_length=100):
                    inputs = self.tokenizer(prompt, return_tensors="pt")
                    outputs = self.model.generate(
                        **inputs,
                        max_length=max_length,
                        temperature=0.7,
                        do_sample=True
                    )
                    return self.tokenizer.decode(outputs[0])`,
                                    explanation: 'Language modeling predicts the probability of sequences of words. It\'s fundamental to many NLP tasks and is used for:\n1. Text generation\n2. Completion suggestions\n3. Understanding context\n4. Transfer learning in NLP',
                                    concept: 'Language Modeling'
                                },
                                {
                                    code: `# Machine Translation System
            from transformers import MarianMTModel, MarianTokenizer
            
            class TranslationSystem:
                def __init__(self, source_lang="en", target_lang="fr"):
                    model_name = f"Helsinki-NLP/opus-mt-{source_lang}-{target_lang}"
                    self.model = MarianMTModel.from_pretrained(model_name)
                    self.tokenizer = MarianTokenizer.from_pretrained(model_name)
                
                def translate(self, text):
                    inputs = self.tokenizer(text, return_tensors="pt")
                    translation = self.model.generate(**inputs)
                    return self.tokenizer.decode(translation[0], skip_special_tokens=True)`,
                                    explanation: 'Machine translation automatically translates text from one language to another. Modern systems use neural networks and can:\n1. Handle multiple language pairs\n2. Preserve context and meaning\n3. Account for cultural nuances\n4. Learn from parallel texts',
                                    concept: 'Machine Translation'
                                }
                            ],
                            learningObjectives: [
                                'Understand the principles of language modeling and its applications',
                                'Master the concepts behind machine translation systems',
                                'Learn about neural approaches to text generation',
                                'Comprehend the challenges and solutions in language generation tasks'
                            ]
                        },
                        {
                            title: 'Text Summarization and Vector Representations',
                            content: 'Techniques for condensing text and representing words as vectors, including word embeddings and text summarization.',
                            examples: [
                                {
                                    code: `from transformers import pipeline
            from gensim.models import Word2Vec
            import numpy as np
            
            class TextProcessor:
                def __init__(self):
                    self.summarizer = pipeline('summarization')
                    
                def summarize_text(self, text, max_length=130, min_length=30):
                    summary = self.summarizer(text, 
                                            max_length=max_length,
                                            min_length=min_length,
                                            do_sample=False)
                    return summary[0]['summary_text']`,
                                    explanation: 'Text summarization automatically generates concise summaries of longer texts. There are two main approaches:\n1. Extractive: Selects important sentences from the original text\n2. Abstractive: Generates new sentences capturing key information',
                                    concept: 'Text Summarization'
                                },
                                {
                                    code: `class WordEmbeddings:
                def __init__(self, sentences):
                    self.model = Word2Vec(sentences, 
                                        vector_size=100, 
                                        window=5, 
                                        min_count=1)
                
                def get_word_vector(self, word):
                    return self.model.wv[word]
                
                def find_similar_words(self, word, n=5):
                    return self.model.wv.most_similar(word, topn=n)
                
                def vector_math(self, pos_words, neg_words):
                    return self.model.wv.most_similar(
                        positive=pos_words,
                        negative=neg_words,
                        topn=5)`,
                                    explanation: 'Word embeddings are vector representations of words that capture semantic meanings. They:\n1. Represent words as dense vectors\n2. Capture semantic relationships\n3. Enable mathematical operations on words\n4. Form the basis for modern NLP systems',
                                    concept: 'Word Embeddings'
                                }
                            ],
                            learningObjectives: [
                                'Master text summarization techniques and their applications',
                                'Understand word embeddings and their role in modern NLP',
                                'Learn to work with vector representations of text',
                                'Apply these techniques to real-world problems'
                            ]
                        }
                    ]
                }
            },
            {
                id: 9,
                title: 'AI Applications',
                content: {
                    introduction: 'Real-world applications of AI technology and their practical implementations',
                    sections: [
                        {
                            title: 'Recommendation Systems',
                            content: 'Systems that suggest items based on user preferences and behavior.',
                            examples: [
                                {
                                    code: `def collaborative_filter(user_matrix, item_matrix):
                recommendations = np.dot(user_matrix, item_matrix.T)
                return recommendations`,
                                    explanation: 'Simple collaborative filtering',
                                    concept: 'Collab Filtering'
                                },
                                {
                                    code: `# Content-Based Filtering
            def content_based_filter(item_features, user_profile):
                recommendations = np.dot(item_features, user_profile.T)
                return recommendations`,
                                    explanation: 'Content-based filtering implementation',
                                    concept: 'Content Filtering'
                                },
                                {
                                    code: `# Hybrid Recommendation System
            def hybrid_recommender(user_data, item_features, weights={'collab': 0.7, 'content': 0.3}):
                collab_scores = collaborative_filter(user_data['interactions'], item_features)
                content_scores = content_based_filter(item_features, user_data['preferences'])
                return weights['collab'] * collab_scores + weights['content'] * content_scores`,
                                    explanation: 'Hybrid system combining multiple approaches',
                                    concept: 'Hybrid Filtering'
                                }
                            ],
                            learningObjectives: [
                                'Describe the purpose and types of recommendation systems.',
                                'Implement collaborative and content-based filtering techniques.',
                                'Understand how recommendation systems use user preferences and behavior.',
                                'Apply recommendation systems in real-world scenarios.',
                                'Compare and evaluate different recommendation approaches.',
                                'Design hybrid recommendation systems.'
                            ],
                            potentialQuestions: [
                                {
                                    type: 'multipleChoice',
                                    question: 'What do recommendation systems primarily aim to do?',
                                    options: ['Classify data', 'Predict outcomes', 'Suggest items', 'Cluster data'],
                                    correctAnswer: 'Suggest items'
                                },
                                {
                                    type: 'trueFalse',
                                    question: 'Collaborative filtering is based solely on item features, not user behavior.',
                                    correctAnswer: 'false'
                                },
                                {
                                    type: 'coding',
                                    question: 'Implement a hybrid recommendation system that combines collaborative and content-based filtering.',
                                    expectedOutput: 'A Python function implementing hybrid filtering'
                                }
                            ]
                        },
                        {
                            title: 'Chatbots',
                            content: 'AI systems designed for natural conversation with users, incorporating natural language processing, intent classification, entity recognition, and dialog management.',
                            examples: [
                                {
                                    code: `# Complete Chatbot Architecture
            class Chatbot:
                def __init__(self):
                    self.intent_classifier = IntentClassifier()
                    self.entity_extractor = EntityExtractor()
                    self.dialog_manager = DialogManager()
                    self.response_generator = ResponseGenerator()
                    
                def process_message(self, user_input, session_id):
                    # 1. Preprocess the input
                    cleaned_text = self.preprocess_text(user_input)
                    
                    # 2. Classify intent
                    intent = self.intent_classifier.classify(cleaned_text)
                    
                    # 3. Extract entities
                    entities = self.entity_extractor.extract(cleaned_text)
                    
                    # 4. Manage dialog state
                    dialog_state = self.dialog_manager.update_state(
                        session_id, intent, entities
                    )
                    
                    # 5. Generate response
                    response = self.response_generator.generate(
                        intent, entities, dialog_state
                    )
                    
                    return response`,
                                    explanation: 'Complete chatbot architecture showing all major components',
                                    concept: 'Chatbot Architecture'
                                },
                                {
                                    code: `# Intent Classification with ML
            class IntentClassifier:
                def __init__(self):
                    self.vectorizer = TfidfVectorizer()
                    self.classifier = MultinomialNB()
                    
                def train(self, texts, intents):
                    # Transform text to numerical features
                    X = self.vectorizer.fit_transform(texts)
                    
                    # Train the classifier
                    self.classifier.fit(X, intents)
                
                def classify(self, text):
                    # Transform input text
                    X = self.vectorizer.transform([text])
                    
                    # Get prediction and confidence
                    intent = self.classifier.predict(X)[0]
                    confidence = np.max(self.classifier.predict_proba(X))
                    
                    return {
                        'intent': intent,
                        'confidence': confidence
                    }`,
                                    explanation: 'Machine learning-based intent classification',
                                    concept: 'Intent Classification'
                                },
                                {
                                    code: `# Entity Extraction System
            class EntityExtractor:
                def __init__(self):
                    self.ner_model = spacy.load('en_core_web_sm')
                    self.patterns = {
                        'email': r'\\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Z|a-z]{2,}\\b',
                        'phone': r'\\b\\d{3}[-.]?\\d{3}[-.]?\\d{4}\\b',
                    }
                    
                def extract(self, text):
                    entities = {
                        'spacy': self._extract_spacy(text),
                        'regex': self._extract_regex(text),
                        'custom': self._extract_custom(text)
                    }
                    return entities
                    
                def _extract_spacy(self, text):
                    doc = self.ner_model(text)
                    return {ent.label_: ent.text for ent in doc.ents}
                    
                def _extract_regex(self, text):
                    found = {}
                    for name, pattern in self.patterns.items():
                        matches = re.findall(pattern, text)
                        if matches:
                            found[name] = matches
                    return found`,
                                    explanation: 'Entity extraction using multiple methods',
                                    concept: 'Entity Recognition'
                                },
                                {
                                    code: `# Dialog Management System
            class DialogManager:
                def __init__(self):
                    self.sessions = {}
                    
                def update_state(self, session_id, intent, entities):
                    if session_id not in self.sessions:
                        self.sessions[session_id] = {
                            'current_state': 'START',
                            'history': [],
                            'required_slots': set(),
                            'filled_slots': {}
                        }
                        
                    session = self.sessions[session_id]
                    
                    # Update dialog state based on intent
                    new_state = self._determine_next_state(
                        session['current_state'],
                        intent,
                        entities
                    )
                    
                    # Update slot filling
                    self._update_slots(session, entities)
                    
                    # Add to history
                    session['history'].append({
                        'intent': intent,
                        'entities': entities,
                        'state': new_state
                    })
                    
                    session['current_state'] = new_state
                    return session
                    
                def _determine_next_state(self, current_state, intent, entities):
                    transitions = {
                        'START': {
                            'greeting': 'WELCOMED',
                            'question': 'HELPING',
                            'book_appointment': 'BOOKING'
                        },
                        'WELCOMED': {
                            'question': 'HELPING',
                            'book_appointment': 'BOOKING',
                            'goodbye': 'END'
                        }
                    }
                    
                    return transitions.get(current_state, {}).get(
                        intent['intent'], current_state
                    )`,
                                    explanation: 'Dialog management system with state tracking',
                                    concept: 'Dialog Management'
                                },
                                {
                                    code: `# Context-Aware Response Generation
            class ResponseGenerator:
                def __init__(self):
                    self.templates = {
                        'greeting': [
                            'Hello! How can I help you today?',
                            'Hi there! What can I do for you?'
                        ],
                        'goodbye': [
                            'Goodbye! Have a great day!',
                            'Thanks for chatting. See you later!'
                        ]
                    }
                    
                def generate(self, intent, entities, dialog_state):
                    # Get base template
                    template = self._get_template(
                        intent['intent'],
                        dialog_state['current_state']
                    )
                    
                    # Fill in entities
                    response = self._fill_template(
                        template,
                        entities,
                        dialog_state['filled_slots']
                    )
                    
                    # Add follow-up if needed
                    if self._needs_followup(dialog_state):
                        response += self._generate_followup(dialog_state)
                        
                    return response`,
                                    explanation: 'Context-aware response generation system',
                                    concept: 'Response Generation'
                                }
                            ],
                            learningObjectives: [
                                'Describe the components of a chatbot: intent classification, entity extraction, dialog management, and response generation.',
                                'Implement machine learning-based intent classification using TF-IDF and Naive Bayes.',
                                'Build an entity extraction system using both NER models and regex patterns.',
                                'Design a dialog management system with state tracking and slot filling.',
                                'Create a context-aware response generation system using templates and dynamic filling.',
                                'Understand how these components work together in a complete chatbot architecture.'
                            ],
                            potentialQuestions: [
                                {
                                    type: 'multipleChoice',
                                    question: 'What are the main components of a chatbot system?',
                                    options: [
                                        'Only intent classification',
                                        'Intent classification, entity extraction, dialog management, and response generation',
                                        'Just natural language processing',
                                        'Only response templates'
                                    ],
                                    correctAnswer: 'Intent classification, entity extraction, dialog management, and response generation'
                                },
                                {
                                    type: 'coding',
                                    question: 'Implement a dialog management system that can track conversation state and required slots.',
                                    expectedOutput: 'A DialogManager class implementation'
                                },
                                {
                                    type: 'trueFalse',
                                    question: 'Entity extraction can only be done using pre-trained NER models.',
                                    correctAnswer: 'false'
                                }
                            ]
                        },
                        {
                            title: 'Predictive Maintenance',
                            content: 'Using AI to predict when equipment needs maintenance.',
                            examples: [
                                {
                                    code: `def predict_failure(sensor_data):
                features = extract_features(sensor_data)
                risk_score = model.predict_proba(features)
                return risk_score > FAILURE_THRESHOLD`,
                                    explanation: 'Predictive maintenance system',
                                    concept: 'Predictive Maintenance'
                                },
                                {
                                    code: `# Time Series Analysis with Advanced Features
            from statsmodels.tsa.arima.model import ARIMA
            import numpy as np
            
            def analyze_sensor_data(data, window_size=24):
                # Extract statistical features
                features = {
                    'mean': np.mean(data),
                    'std': np.std(data),
                    'max': np.max(data),
                    'min': np.min(data),
                    'trend': np.polyfit(range(len(data)), data, 1)[0]
                }
                
                # Time series modeling
                model = ARIMA(data, order=(5,1,0))
                model_fit = model.fit()
                forecast = model_fit.forecast(steps=window_size)
                
                return features, forecast`,
                                    explanation: 'Advanced time series analysis for predictive maintenance',
                                    concept: 'Time Series Analysis'
                                }
                            ],
                            learningObjectives: [
                                'Describe the concept of predictive maintenance.',
                                'Extract features from sensor data.',
                                'Use time series analysis for predicting failures.',
                                'Understand the benefits and challenges of predictive maintenance systems.',
                                'Implement anomaly detection for equipment monitoring.',
                                'Design real-time monitoring systems.'
                            ],
                            potentialQuestions: [
                                {
                                    type: 'multipleChoice',
                                    question: 'What is the primary goal of predictive maintenance?',
                                    options: ['To fix equipment after failure', 'To predict equipment failure', 'To optimize equipment performance', 'To reduce energy consumption'],
                                    correctAnswer: 'To predict equipment failure'
                                },
                                {
                                    type: 'trueFalse',
                                    question: 'Predictive maintenance systems do not require any historical data.',
                                    correctAnswer: 'false'
                                },
                                {
                                    type: 'coding',
                                    question: 'Implement a complete predictive maintenance system with feature extraction and time series analysis.',
                                    expectedOutput: 'A predictive maintenance implementation'
                                }
                            ]
                        }
                    ]
                }
            },
            {
                id: 10,
                title: 'AI Security',
                content: {
                    introduction: 'Learn about security considerations in AI systems, from threat detection to privacy preservation',
                    sections: [
                        {
                            title: 'AI-Powered Threat Detection',
                            content: 'AI systems can identify and respond to security threats in real-time by analyzing patterns in network traffic, user behavior, and system activities.',
                            examples: [
                                {
                                    code: `import tensorflow as tf
            from sklearn.ensemble import IsolationForest
            
            class ThreatDetectionSystem:
                def __init__(self):
                    self.anomaly_detector = IsolationForest(
                        contamination=0.1,
                        random_state=42
                    )
                    
                def train_detector(self, normal_traffic_data):
                    self.anomaly_detector.fit(normal_traffic_data)
                    
                def detect_threats(self, current_traffic):
                    # -1 for anomalies, 1 for normal
                    predictions = self.anomaly_detector.predict(current_traffic)
                    
                    # Convert to threat scores
                    threat_scores = []
                    for pred in predictions:
                        if pred == -1:
                            threat_level = self.calculate_threat_level(current_traffic)
                            threat_scores.append(threat_level)
                        else:
                            threat_scores.append(0)
                            
                    return threat_scores`,
                                    explanation: 'Implementation of an AI-based threat detection system using anomaly detection',
                                    concept: "Threat Detection"
                                }
                            ],
                            learningObjectives: [
                                'Understand AI-based threat detection principles',
                                'Implement anomaly detection for security',
                                'Design real-time monitoring systems',
                                'Handle threat response automation',
                                'Evaluate detection system performance'
                            ],
                            potentialQuestions: [
                                {
                                    type: 'multipleChoice',
                                    question: 'What is AI-powered threat detection?',
                                    options: ['Basic antivirus', 'Using AI to identify and respond to security threats in real-time', 'Manual security checks', 'Password management'],
                                    correctAnswer: 'Using AI to identify and respond to security threats in real-time'
                                }
                            ]
                        },
                        {
                            title: 'Adversarial Machine Learning',
                            content: 'Understanding techniques used to fool or manipulate AI systems and developing robust defenses against such attacks.',
                            examples: [
                                {
                                    code: `import torch
            import torch.nn.functional as F
            
            def generate_adversarial_example(model, image, label, epsilon):
                # Set requires_grad
                image.requires_grad = True
                
                # Forward pass
                output = model(image)
                loss = F.cross_entropy(output, label)
                
                # Backward pass
                loss.backward()
                
                # Generate perturbation
                perturbation = epsilon * image.grad.data.sign()
                
                # Create adversarial example
                adversarial_image = image + perturbation
                adversarial_image = torch.clamp(adversarial_image, 0, 1)
                
                return adversarial_image
            
            def adversarial_training(model, loader, optimizer, epsilon):
                for images, labels in loader:
                    # Generate adversarial examples
                    adv_images = generate_adversarial_example(
                        model, images, labels, epsilon
                    )
                    
                    # Train on both clean and adversarial
                    optimizer.zero_grad()
                    loss = 0.5 * (F.cross_entropy(model(images), labels) +
                                  F.cross_entropy(model(adv_images), labels))
                    loss.backward()
                    optimizer.step()`,
                                    explanation: 'Implementation of adversarial attack generation and defensive training',
                                    concept: "Adversarial ML"
                                }
                            ],
                            learningObjectives: [
                                'Understand adversarial attack methods',
                                'Implement defense mechanisms',
                                'Evaluate model robustness',
                                'Master adversarial training techniques',
                                'Detect adversarial examples'
                            ],
                            potentialQuestions: [
                                {
                                    type: 'multipleChoice',
                                    question: 'What is adversarial machine learning?',
                                    options: ['Regular training', 'Techniques to fool or manipulate AI systems with malicious inputs', 'Model optimization', 'Data cleaning'],
                                    correctAnswer: 'Techniques to fool or manipulate AI systems with malicious inputs'
                                }
                            ]
                        },
                        {
                            title: 'Privacy-Preserving Machine Learning',
                            content: 'Techniques and methods for training AI models while protecting sensitive data and ensuring privacy compliance.',
                            examples: [
                                {
                                    code: `from tensorflow_privacy import GaussianAverageQuery
            from tensorflow_privacy.privacy.analysis import compute_dp_sgd_privacy
            
            def create_private_model(input_shape, epsilon=1.0, delta=1e-5):
                # Define noise multiplier
                noise_multiplier = 1.1
                l2_norm_clip = 1.0
                num_microbatches = 1
                
                # Create private optimizer
                optimizer = tf.keras.optimizers.SGD(
                    learning_rate=0.1,
                    momentum=0.9
                )
                
                # Add privacy wrapper
                private_optimizer = DPGradientDescentGaussianOptimizer(
                    l2_norm_clip=l2_norm_clip,
                    noise_multiplier=noise_multiplier,
                    num_microbatches=num_microbatches,
                    optimizer=optimizer
                )
                
                # Build model with privacy guarantees
                model = tf.keras.Sequential([
                    tf.keras.layers.Dense(64, activation='relu'),
                    tf.keras.layers.Dense(32, activation='relu'),
                    tf.keras.layers.Dense(10, activation='softmax')
                ])
                
                model.compile(
                    optimizer=private_optimizer,
                    loss='categorical_crossentropy',
                    metrics=['accuracy']
                )
                
                return model`,
                                    explanation: 'Implementation of differential privacy in deep learning',
                                    concept: "Privacy-Preserving ML"
                                }
                            ],
                            learningObjectives: [
                                'Understand privacy-preserving ML techniques',
                                'Implement differential privacy',
                                'Master secure multi-party computation',
                                'Apply homomorphic encryption',
                                'Ensure GDPR compliance in ML'
                            ],
                            potentialQuestions: [
                                {
                                    type: 'multipleChoice',
                                    question: 'What is privacy-preserving machine learning?',
                                    options: ['Data deletion', 'Training AI models while protecting sensitive data', 'Password protection', 'Encryption'],
                                    correctAnswer: 'Training AI models while protecting sensitive data'
                                }
                            ]
                        },
                        {
                            title: 'Model Robustness and Security',
                            content: 'Ensuring AI systems perform reliably under various conditions and are protected against different types of attacks.',
                            examples: [
                                {
                                    code: `class RobustModel:
                def __init__(self, base_model):
                    self.model = base_model
                    self.attack_detector = AttackDetector()
                    
                def robust_inference(self, input_data):
                    # Check for adversarial attacks
                    if self.attack_detector.is_adversarial(input_data):
                        return self.handle_adversarial_input(input_data)
                        
                    # Input sanitization
                    cleaned_input = self.sanitize_input(input_data)
                    
                    # Ensemble prediction
                    predictions = []
                    for model in self.ensemble_models:
                        pred = model.predict(cleaned_input)
                        predictions.append(pred)
                        
                    # Majority voting
                    final_prediction = self.majority_vote(predictions)
                    
                    return final_prediction`,
                                    explanation: 'Implementation of a robust model with multiple security measures',
                                    concept: "Model Robustness"
                                }
                            ],
                            learningObjectives: [
                                'Understand model robustness principles',
                                'Implement security measures',
                                'Test model reliability',
                                'Handle edge cases and attacks',
                                'Monitor model performance'
                            ],
                            potentialQuestions: [
                                {
                                    type: 'multipleChoice',
                                    question: 'What is AI model robustness?',
                                    options: ['Physical strength', 'An AI system\'s ability to perform well under various conditions and attacks', 'System speed', 'Code quality'],
                                    correctAnswer: 'An AI system\'s ability to perform well under various conditions and attacks'
                                }
                            ]
                        }
                    ]
                }
            },
            {
                id: 11,
                title: 'AI Infrastructure',
                content: {
                    introduction: 'Understanding the technical foundation of AI systems, from cloud computing to model deployment',
                    sections: [
                        {
                            title: 'Cloud Computing in AI',
                            content: 'Cloud computing provides scalable, flexible resources for AI workloads, enabling teams to access powerful computing resources on-demand without maintaining physical infrastructure.',
                            examples: [
                                {
                                    code: `# AWS SageMaker Example
            import sagemaker
            from sagemaker.pytorch import PyTorch
            
            # Configure training job
            pytorch_estimator = PyTorch(
                entry_point='train.py',
                role='SageMakerRole',
                instance_count=1,
                instance_type='ml.p3.2xlarge',
                framework_version='1.8.1',
                py_version='py36'
            )
            
            # Start training in the cloud
            pytorch_estimator.fit({'training': 's3://bucket/training-data'})`,
                                    explanation: 'Setting up and running AI training jobs on AWS SageMaker',
                                    concept: "Cloud Training"
                                }
                            ],
                            learningObjectives: [
                                'Understand cloud computing fundamentals for AI',
                                'Learn to use major cloud platforms (AWS, GCP, Azure)',
                                'Master cloud resource management',
                                'Implement cloud-based training pipelines',
                                'Optimize cloud costs for AI workloads'
                            ],
                            potentialQuestions: [
                                {
                                    type: 'multipleChoice',
                                    question: 'What is cloud computing in AI?',
                                    options: ['Weather forecasting', 'Using remote servers to run AI workloads', 'Local processing', 'Data storage'],
                                    correctAnswer: 'Using remote servers to run AI workloads'
                                }
                            ]
                        },
                        {
                            title: 'GPUs and Accelerated Computing',
                            content: 'GPUs (Graphics Processing Units) are specialized processors that dramatically accelerate AI computations through parallel processing capabilities. They are essential for training large models efficiently.',
                            examples: [
                                {
                                    code: `import torch
            
            # Check GPU availability
            device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
            
            # Move model and data to GPU
            model = model.to(device)
            inputs = inputs.to(device)
            
            # Configure for mixed precision training
            scaler = torch.cuda.amp.GradScaler()
            with torch.cuda.amp.autocast():
                outputs = model(inputs)
                loss = criterion(outputs, targets)
            
            scaler.scale(loss).backward()
            scaler.step(optimizer)
            scaler.update()`,
                                    explanation: 'GPU utilization and mixed precision training in PyTorch',
                                    concept: "GPU Computing"
                                }
                            ],
                            learningObjectives: [
                                'Understand GPU architecture and capabilities',
                                'Master GPU memory management',
                                'Implement efficient GPU-accelerated training',
                                'Optimize model performance on GPUs',
                                'Handle multi-GPU scenarios'
                            ],
                            potentialQuestions: [
                                {
                                    type: 'multipleChoice',
                                    question: 'What are GPUs in AI?',
                                    options: ['Display devices', 'Specialized processors that accelerate AI computations', 'Memory units', 'Network cards'],
                                    correctAnswer: 'Specialized processors that accelerate AI computations'
                                }
                            ]
                        },
                        {
                            title: 'Distributed Training',
                            content: 'Distributed training enables AI models to be trained across multiple machines or processors, significantly reducing training time and enabling the training of larger models.',
                            examples: [
                                {
                                    code: `import torch.distributed as dist
            from torch.nn.parallel import DistributedDataParallel
            
            def setup_distributed_training():
                # Initialize process group
                dist.init_process_group(backend='nccl')
                
                # Create model and move to GPU
                model = YourModel().cuda()
                model = DistributedDataParallel(model)
                
                # Create distributed sampler
                train_sampler = torch.utils.data.distributed.DistributedSampler(
                    train_dataset
                )
                
                # Create data loader
                train_loader = torch.utils.data.DataLoader(
                    train_dataset,
                    batch_size=batch_size,
                    sampler=train_sampler
                )`,
                                    explanation: 'Setting up distributed training with PyTorch',
                                    concept: "Distributed Training"
                                }
                            ],
                            learningObjectives: [
                                'Master distributed training concepts',
                                'Implement data-parallel training',
                                'Handle distributed model synchronization',
                                'Optimize distributed training performance',
                                'Debug distributed training issues'
                            ],
                            potentialQuestions: [
                                {
                                    type: 'multipleChoice',
                                    question: 'What is distributed training?',
                                    options: ['Online courses', 'Training AI models across multiple machines or processors', 'Local training', 'Manual training'],
                                    correctAnswer: 'Training AI models across multiple machines or processors'
                                }
                            ]
                        },
                        {
                            title: 'Model Serving and Deployment',
                            content: 'Model serving involves deploying AI models to handle production workloads efficiently and reliably, ensuring high availability and optimal performance.',
                            examples: [
                                {
                                    code: `from fastapi import FastAPI
            import torch
            
            app = FastAPI()
            model = torch.load('model.pth')
            model.eval()
            
            @app.post("/predict")
            async def predict(data: dict):
                # Preprocess input
                input_tensor = preprocess_input(data)
                
                # Make prediction
                with torch.no_grad():
                    prediction = model(input_tensor)
                
                # Postprocess output
                result = postprocess_output(prediction)
                
                return {"prediction": result}
            
            # Start server
            import uvicorn
            uvicorn.run(app, host="0.0.0.0", port=8000)`,
                                    explanation: 'Setting up a model serving API with FastAPI',
                                    concept: "Model Serving"
                                }
                            ],
                            learningObjectives: [
                                'Understand model serving architectures',
                                'Implement REST APIs for model serving',
                                'Handle model versioning and updates',
                                'Optimize serving performance',
                                'Monitor model serving systems'
                            ],
                            potentialQuestions: [
                                {
                                    type: 'multipleChoice',
                                    question: 'What is model serving?',
                                    options: ['Food service', 'Deploying AI models to handle production workloads', 'Customer service', 'Data storage'],
                                    correctAnswer: 'Deploying AI models to handle production workloads'
                                }
                            ]
                        },
                        {
                            title: 'Containerization and Orchestration',
                            content: 'Containerization packages AI applications with their dependencies, while orchestration manages and coordinates AI workloads and resources across clusters.',
                            examples: [
                                {
                                    code: `# Dockerfile
            FROM pytorch/pytorch:1.8.1-cuda11.1-cudnn8-runtime
            
            WORKDIR /app
            COPY requirements.txt .
            RUN pip install -r requirements.txt
            
            COPY model/ /app/model/
            COPY serve.py /app/
            
            EXPOSE 8000
            CMD ["python", "serve.py"]
            
            # Kubernetes deployment
            apiVersion: apps/v1
            kind: Deployment
            metadata:
              name: model-serving
            spec:
              replicas: 3
              selector:
                matchLabels:
                  app: model-serving
              template:
                metadata:
                  labels:
                    app: model-serving
                spec:
                  containers:
                  - name: model-serving
                    image: your-registry/model-serving:latest
                    ports:
                    - containerPort: 8000`,
                                    explanation: 'Containerization and orchestration setup for AI applications',
                                    concept: "Containerization and Orchestration"
                                }
                            ],
                            learningObjectives: [
                                'Master Docker containerization',
                                'Understand Kubernetes orchestration',
                                'Implement CI/CD pipelines',
                                'Manage container resources',
                                'Handle container networking'
                            ],
                            potentialQuestions: [
                                {
                                    type: 'multipleChoice',
                                    question: 'What is containerization in AI?',
                                    options: ['Storage boxes', 'Packaging AI applications with their dependencies', 'Shipping containers', 'Data organization'],
                                    correctAnswer: 'Packaging AI applications with their dependencies'
                                },
                                {
                                    type: 'multipleChoice',
                                    question: 'What is orchestration in AI?',
                                    options: ['Music playing', 'Managing and coordinating AI workloads and resources', 'Task scheduling', 'System monitoring'],
                                    correctAnswer: 'Managing and coordinating AI workloads and resources'
                                }
                            ]
                        }
                    ]
                }
            },
            {
                id: 12,
                title: 'AI Development',
                content: {
                    introduction: 'Learn about building and optimizing AI models through practical examples and hands-on implementations',
                    sections: [
                        {
                            title: 'Model Architecture',
                            content: 'Understanding the structure and organization of AI models components, including neural networks, CNNs, RNNs, and transformers. The architecture defines how different layers and components interact to process input data and generate predictions.',
                            examples: [
                                {
                                    code: `from tensorflow.keras import Sequential
            from tensorflow.keras.layers import Dense, Conv2D, MaxPooling2D, Flatten
            
            # Basic CNN Architecture
            def create_cnn_model():
                model = Sequential([
                    Conv2D(32, (3, 3), activation='relu', input_shape=(28, 28, 1)),
                    MaxPooling2D((2, 2)),
                    Conv2D(64, (3, 3), activation='relu'),
                    Flatten(),
                    Dense(64, activation='relu'),
                    Dense(10, activation='softmax')
                ])
                return model`,
                                    explanation: 'Convolutional Neural Network (CNN) architecture for image processing tasks',
                                    concept: "CNN Architecture"
                                },
                                {
                                    code: `# Transformer Architecture
            from transformers import BertModel, BertConfig
            
            def create_transformer_model():
                config = BertConfig(
                    hidden_size=768,
                    num_attention_heads=12,
                    num_hidden_layers=12,
                    intermediate_size=3072
                )
                model = BertModel(config)
                return model`,
                                    explanation: 'Transformer architecture for natural language processing',
                                    concept: "Transformer Architecture"
                                }
                            ],
                            learningObjectives: [
                                'Understand different types of neural network architectures',
                                'Learn how to design model structures for specific tasks',
                                'Master the concepts of layers, neurons, and connections',
                                'Implement various architecture patterns',
                                'Choose appropriate architectures based on problem requirements'
                            ],
                            potentialQuestions: [
                                {
                                    type: 'multipleChoice',
                                    question: 'What is model architecture?',
                                    options: ['Building design', 'The structure and organization of an AI model\'s components', 'System design', 'Code structure'],
                                    correctAnswer: 'The structure and organization of an AI model\'s components'
                                }
                            ]
                        },
                        {
                            title: 'Transfer Learning',
                            content: 'Transfer learning allows us to leverage pre-trained models to solve new tasks with less data and training time. This approach is particularly useful when working with limited datasets or computational resources.',
                            examples: [
                                {
                                    code: `import tensorflow as tf
            from tensorflow.keras.applications import ResNet50
            from tensorflow.keras.layers import Dense, GlobalAveragePooling2D
            
            def create_transfer_model():
                # Load pre-trained ResNet50
                base_model = ResNet50(weights='imagenet', include_top=False)
                
                # Freeze base model layers
                for layer in base_model.layers:
                    layer.trainable = False
                    
                # Add custom layers
                x = GlobalAveragePooling2D()(base_model.output)
                x = Dense(1024, activation='relu')(x)
                predictions = Dense(num_classes, activation='softmax')(x)
                
                model = tf.keras.Model(inputs=base_model.input, outputs=predictions)
                return model`,
                                    explanation: 'Transfer learning example using pre-trained ResNet50 model',
                                    concept: "Transfer Learning"
                                }
                            ],
                            learningObjectives: [
                                'Understand the principles of transfer learning',
                                'Learn how to use pre-trained models effectively',
                                'Master fine-tuning techniques',
                                'Implement transfer learning for various applications',
                                'Optimize transfer learning performance'
                            ],
                            potentialQuestions: [
                                {
                                    type: 'multipleChoice',
                                    question: 'What is transfer learning?',
                                    options: ['Data transfer', 'Using pre-trained models as starting points for new tasks', 'Knowledge sharing', 'Model copying'],
                                    correctAnswer: 'Using pre-trained models as starting points for new tasks'
                                }
                            ]
                        },
                        {
                            title: 'Model Evaluation',
                            content: 'Model evaluation is crucial for understanding model performance and making improvements. It involves using various metrics and techniques to assess how well a model performs on different tasks and datasets.',
                            examples: [
                                {
                                    code: `from sklearn.metrics import accuracy_score, precision_recall_fscore_support
            import numpy as np
            
            def comprehensive_evaluation(model, X_test, y_test):
                # Make predictions
                y_pred = model.predict(X_test)
                
                # Calculate basic metrics
                accuracy = accuracy_score(y_test, y_pred)
                precision, recall, f1, _ = precision_recall_fscore_support(
                    y_test, y_pred, average='weighted'
                )
                
                # Calculate ROC curve
                fpr, tpr, _ = roc_curve(y_test, y_pred)
                auc_score = auc(fpr, tpr)
                
                # Cross-validation
                cv_scores = cross_val_score(model, X_test, y_test, cv=5)
                
                return {
                    'accuracy': accuracy,
                    'precision': precision,
                    'recall': recall,
                    'f1': f1,
                    'auc': auc_score,
                    'cv_scores': cv_scores.mean()
                }`,
                                    explanation: 'Comprehensive model evaluation with multiple metrics',
                                    concept: "Model Evaluation"
                                }
                            ],
                            learningObjectives: [
                                'Master different evaluation metrics',
                                'Understand when to use specific metrics',
                                'Implement cross-validation techniques',
                                'Analyze model performance comprehensively',
                                'Make data-driven decisions for model improvement'
                            ],
                            potentialQuestions: [
                                {
                                    type: 'multipleChoice',
                                    question: 'What is model evaluation?',
                                    options: ['Price evaluation', 'Assessing AI model performance using various metrics', 'System testing', 'Quality control'],
                                    correctAnswer: 'Assessing AI model performance using various metrics'
                                }
                            ]
                        },
                        {
                            title: 'Feature Engineering',
                            content: 'Feature engineering involves creating, selecting, and transforming input features to improve model performance. This process requires domain knowledge and understanding of the data.',
                            examples: [
                                {
                                    code: `from sklearn.preprocessing import StandardScaler, PolynomialFeatures
            from sklearn.feature_selection import SelectKBest, f_classif
            
            def engineer_features(X, y=None):
                # Create pipeline
                pipeline = Pipeline([
                    # Standardize features
                    ('scaler', StandardScaler()),
                    
                    # Create polynomial features
                    ('poly', PolynomialFeatures(degree=2)),
                    
                    # Select best features
                    ('selector', SelectKBest(f_classif, k=10))
                ])
                
                # Feature importance analysis
                feature_importance = RandomForestClassifier()
                feature_importance.fit(X, y)
                importance_scores = feature_importance.feature_importances_
                
                return pipeline, importance_scores`,
                                    explanation: 'Feature engineering pipeline with scaling, polynomial features, and selection',
                                    concept: "Feature Engineering"
                                }
                            ],
                            learningObjectives: [
                                'Master feature creation techniques',
                                'Learn feature selection methods',
                                'Understand feature transformation',
                                'Implement feature importance analysis',
                                'Optimize feature engineering pipeline'
                            ],
                            potentialQuestions: [
                                {
                                    type: 'multipleChoice',
                                    question: 'What is feature engineering?',
                                    options: ['Engineering design', 'Creating and selecting relevant input features for AI models', 'Data processing', 'System development'],
                                    correctAnswer: 'Creating and selecting relevant input features for AI models'
                                }
                            ]
                        }
                    ]
                }
            },
            {
                id: 25,
                title: 'AI Data Management',
    content: {
        introduction: 'Comprehensive guide to managing data throughout the AI development lifecycle, covering data governance, quality management, privacy, and pipeline development.',
        sections: [
            {
                title: 'Data Governance and Quality Management',
                content: 'Core frameworks and practices for managing data assets, ensuring quality, and maintaining data governance standards:\n\n1. Data Governance Framework:\n- Policies and procedures\n- Roles and responsibilities\n- Compliance requirements\n- Quality standards\n\n2. Quality Management:\n- Data validation processes\n- Consistency checks\n- Completeness verification\n- Accuracy assessment\n\n3. Compliance Management:\n- Regulatory requirements\n- Industry standards\n- Documentation practices\n- Audit procedures',
                examples: [
                    {
                        code: `class DataGovernance {
    constructor() {
        this.policies = new Map();
        this.qualityMetrics = new Map();
    }

    implementGovernance() {
        return {
            policies: this.definePolicies(),
            standards: this.establishStandards(),
            compliance: this.ensureCompliance(),
            monitoring: this.setupMonitoring()
        };
    }

    async validateDataQuality(dataset) {
        return {
            completeness: await this.checkCompleteness(dataset),
            accuracy: await this.verifyAccuracy(dataset),
            consistency: await this.assessConsistency(dataset),
            recommendations: this.generateQualityRecommendations()
        };
    }

    trackDataLineage(data) {
        return {
            origin: this.identifyOrigin(data),
            transformations: this.logTransformations(data),
            dependencies: this.mapDependencies(data),
            usage: this.trackUsage(data)
        };
    }
}`,
                        explanation: 'Data governance implementation includes:\n1. Policy definition and enforcement\n2. Quality metrics tracking\n3. Lineage documentation\n4. Compliance monitoring',
                        concept: 'Data Governance Framework'
                    }
                ],
                learningObjectives: [
                    'Master data governance framework implementation',
                    'Learn quality management best practices',
                    'Understand compliance requirements',
                    'Develop skills in quality metrics tracking'
                ]
            },
            {
                title: 'Data Privacy and Pipeline Management',
                content: 'Strategies for protecting sensitive data and building efficient data pipelines:\n\n1. Privacy Management:\n- Data anonymization\n- Access control\n- Encryption standards\n- Privacy by design\n\n2. Pipeline Architecture:\n- Data ingestion\n- Processing workflows\n- Transformation logic\n- Output handling\n\n3. Pipeline Optimization:\n- Performance tuning\n- Resource allocation\n- Error handling\n- Monitoring systems',
                examples: [
                    {
                        code: `class DataPipeline {
    constructor() {
        this.stages = new Map();
        this.transformations = new Set();
    }

    buildPipeline() {
        return {
            ingestion: this.configureIngestion(),
            processing: this.setupProcessing(),
            transformation: this.defineTransformations(),
            output: this.configureOutput()
        };
    }

    async processData(data) {
        return {
            validated: await this.validateInput(data),
            transformed: await this.applyTransformations(data),
            enriched: await this.enrichData(data),
            validated: await this.validateOutput(data)
        };
    }

    monitorPipeline() {
        return {
            performance: this.trackPerformance(),
            errors: this.monitorErrors(),
            throughput: this.measureThroughput(),
            health: this.assessHealth()
        };
    }
}`,
                        explanation: 'Data pipeline management focuses on:\n1. Pipeline architecture design\n2. Data transformation workflow\n3. Monitoring and optimization\n4. Error handling',
                        concept: 'Data Pipeline Management'
                    }
                ],
                learningObjectives: [
                    'Master data privacy protection techniques',
                    'Learn pipeline development practices',
                    'Understand data transformation workflows',
                    'Develop skills in pipeline optimization'
                ]
            },
            {
                title: 'Data Labeling and Augmentation',
                content: 'Methods for preparing and enhancing training data:\n\n1. Labeling Strategies:\n- Manual labeling\n- Semi-automated labeling\n- Active learning\n- Quality assurance\n\n2. Augmentation Techniques:\n- Image augmentation\n- Text augmentation\n- Synthetic data generation\n- Data balancing\n\n3. Validation Methods:\n- Cross-validation\n- Statistical validation\n- Domain validation\n- Expert review',
                examples: [
                    {
                        code: `class DataPreparation {
    constructor() {
        this.labelingTasks = new Map();
        this.augmentationTechniques = new Set();
    }

    manageLabelingProcess() {
        return {
            tasks: this.distributeTasks(),
            quality: this.ensureQuality(),
            verification: this.implementVerification(),
            tracking: this.trackProgress()
        };
    }

    async augmentDataset(dataset) {
        return {
            augmented: await this.applyAugmentations(dataset),
            balanced: await this.balanceClasses(dataset),
            validated: await this.validateAugmentations(dataset),
            metadata: this.updateMetadata(dataset)
        };
    }

    validateResults() {
        return {
            accuracy: this.checkAccuracy(),
            consistency: this.verifyConsistency(),
            coverage: this.assessCoverage(),
            recommendations: this.generateRecommendations()
        };
    }
}`,
                        explanation: 'Data preparation encompasses:\n1. Labeling workflow management\n2. Augmentation strategy implementation\n3. Validation process\n4. Quality assurance',
                        concept: 'Data Preparation Framework'
                    }
                ],
                learningObjectives: [
                    'Master data labeling methodologies',
                    'Learn augmentation techniques',
                    'Understand validation processes',
                    'Develop skills in quality assurance'
                ]
            }
        ]
    }
},
            {
                id: 16,
                title: 'Deep Learning Fundamentals',
                content: {
                    introduction: 'Master the foundational concepts of deep learning and neural networks. This comprehensive course covers everything from basic neural network architecture to advanced optimization techniques.',
                    sections: [
                        {
                            title: 'Neural Network Foundations',
                            content: `Neural networks are the backbone of deep learning. Understanding their structure and basic components is crucial for mastering deep learning.
            
            A neural network consists of layers of interconnected nodes (neurons) that process and transform input data. Each connection has a weight that determines its importance in the network.
            
            Key concepts covered in this section:
            1. Neurons and their biological inspiration
            2. Layers (input, hidden, output)
            3. Weights and biases
            4. Forward propagation
            5. Basic network architectures`,
                            examples: [
                                {
                                    code: `import torch.nn as nn
            
            class SimpleNN(nn.Module):
                def __init__(self, input_size, hidden_size, output_size):
                    super().__init__()
                    self.layer1 = nn.Linear(input_size, hidden_size)
                    self.activation = nn.ReLU()
                    self.layer2 = nn.Linear(hidden_size, output_size)
                
                def forward(self, x):
                    x = self.layer1(x)
                    x = self.activation(x)
                    x = self.layer2(x)
                    return x
            
            # Example usage
            model = SimpleNN(input_size=784, hidden_size=128, output_size=10)`,
                                    explanation: 'Basic neural network implementation showing layer structure',
                                    concept: 'Neural Network Structure'
                                },
                                {
                                    code: `# Examining layer properties
            print(f"Layer 1 weights shape: {model.layer1.weight.shape}")
            print(f"Layer 1 bias shape: {model.layer1.bias.shape}")
            
            # Forward pass example
            input_data = torch.randn(32, 784)  # Batch of 32 samples
            output = model(input_data)
            print(f"Output shape: {output.shape}")`,
                                    explanation: 'Understanding layer properties and data flow',
                                    concept: 'Network Properties'
                                }
                            ],
                            learningObjectives: [
                                'Explain the basic structure of neural networks',
                                'Understand the role of neurons, layers, and connections',
                                'Implement a simple neural network using PyTorch',
                                'Analyze network architecture and data flow',
                                'Calculate output dimensions for different layer configurations'
                            ],
                            practiceExercises: [
                                {
                                    title: 'Network Architecture Design',
                                    description: 'Design a neural network for MNIST digit classification',
                                    template: `class MNISTClassifier(nn.Module):
                def __init__(self):
                    super().__init__()
                    # TODO: Add appropriate layers
                    
                def forward(self, x):
                    # TODO: Implement forward pass
                    pass`,
                                    solution: `class MNISTClassifier(nn.Module):
                def __init__(self):
                    super().__init__()
                    self.flatten = nn.Flatten()
                    self.layer1 = nn.Linear(784, 128)
                    self.activation1 = nn.ReLU()
                    self.layer2 = nn.Linear(128, 64)
                    self.activation2 = nn.ReLU()
                    self.output = nn.Linear(64, 10)
                
                def forward(self, x):
                    x = self.flatten(x)
                    x = self.activation1(self.layer1(x))
                    x = self.activation2(self.layer2(x))
                    x = self.output(x)
                    return x`
                                }
                            ]
                        },
                        {
                            title: 'Activation Functions',
                            content: `Activation functions introduce non-linearity into neural networks, allowing them to learn complex patterns. Different activation functions serve different purposes and have unique characteristics.
            
            Key concepts covered:
            1. Purpose of activation functions
            2. Types of activation functions
               - ReLU and variants
               - Sigmoid and tanh
               - Advanced functions (GELU, Swish)
            3. Choosing appropriate activation functions
            4. Impact on gradient flow
            5. Common issues and solutions`,
                            examples: [
                                {
                                    code: `# Common activation functions
            activation_functions = {
                'relu': nn.ReLU(),
                'leaky_relu': nn.LeakyReLU(0.01),
                'sigmoid': nn.Sigmoid(),
                'tanh': nn.Tanh(),
                'elu': nn.ELU(),
                'gelu': nn.GELU()
            }
            
            # Visualizing activation functions
            import matplotlib.pyplot as plt
            import numpy as np
            
            x = np.linspace(-5, 5, 100)
            plt.figure(figsize=(12, 8))
            for name, func in activation_functions.items():
                y = func(torch.FloatTensor(x)).numpy()
                plt.plot(x, y, label=name)
            plt.legend()
            plt.grid(True)
            plt.title('Activation Functions Comparison')
            plt.show()`,
                                    explanation: 'Comparison of different activation functions',
                                    concept: 'Activation Functions'
                                }
                            ],
                            learningObjectives: [
                                'Understand the purpose and importance of activation functions',
                                'Compare different types of activation functions',
                                'Choose appropriate activation functions for different scenarios',
                                'Implement and visualize activation functions',
                                'Debug common activation function issues'
                            ],
                            practiceExercises: [
                                {
                                    title: 'Activation Function Analysis',
                                    description: 'Analyze the impact of different activation functions on model performance',
                                    template: `def compare_activation_functions(X_train, y_train):
                results = {}
                for activation_name, activation_func in activation_functions.items():
                    # TODO: Create and train model with different activation functions
                    # TODO: Record and compare results
                return results`
                                }
                            ]
                        },
                        {
                            title: 'Backpropagation and Gradient Descent',
                            content: `Backpropagation is the core algorithm that enables neural networks to learn from data. This section covers the mathematics and implementation of backpropagation and various gradient descent optimization techniques.
            
            Key concepts covered:
            1. Chain rule and gradient calculation
            2. Backpropagation algorithm steps
            3. Types of gradient descent
               - Batch gradient descent
               - Stochastic gradient descent
               - Mini-batch gradient descent
            4. Learning rate scheduling
            5. Gradient clipping`,
                            examples: [
                                {
                                    code: `# Training loop with gradient descent
            def train_model(model, train_loader, criterion, optimizer, epochs):
                for epoch in range(epochs):
                    for batch_idx, (data, target) in enumerate(train_loader):
                        # Forward pass
                        output = model(data)
                        loss = criterion(output, target)
                        
                        # Backward pass
                        optimizer.zero_grad()
                        loss.backward()
                        
                        # Gradient clipping
                        torch.nn.utils.clip_grad_norm_(model.parameters(), max_norm=1.0)
                        
                        # Parameter update
                        optimizer.step()
                        
                        if batch_idx % 100 == 0:
                            print(f'Epoch: {epoch}, Batch: {batch_idx}, Loss: {loss.item():.4f}')`,
                                    explanation: 'Implementation of training loop with gradient descent',
                                    concept: 'Gradient Descent'
                                },
                                {
                                    code: `# Learning rate scheduling
            scheduler = torch.optim.lr_scheduler.ReduceLROnPlateau(
                optimizer, 
                mode='min',
                factor=0.1,
                patience=10,
                verbose=True
            )
            
            # Training with scheduler
            for epoch in range(epochs):
                train_loss = train_epoch(model, train_loader, criterion, optimizer)
                scheduler.step(train_loss)`,
                                    explanation: 'Learning rate scheduling implementation',
                                    concept: 'Learning Rate'
                                }
                            ],
                            learningObjectives: [
                                'Understand the mathematics behind backpropagation',
                                'Implement gradient descent optimization',
                                'Choose appropriate learning rates and scheduling strategies',
                                'Debug training issues related to gradients',
                                'Implement gradient clipping and normalization'
                            ],
                            practiceExercises: [
                                {
                                    title: 'Custom Optimizer Implementation',
                                    description: 'Implement a simple SGD optimizer from scratch',
                                    template: `class CustomSGD:
                def __init__(self, parameters, lr=0.01):
                    self.parameters = list(parameters)
                    self.lr = lr
                
                def step(self):
                    # TODO: Implement parameter update
                    pass
                
                def zero_grad(self):
                    # TODO: Implement gradient reset
                    pass`
                                }
                            ]
                        },
                        {
                            title: 'Loss Functions and Metrics',
                            content: `Loss functions guide the learning process by measuring how well the model is performing. Understanding different loss functions and when to use them is crucial for effective model training.
            
            Key concepts covered:
            1. Common loss functions
               - Mean Squared Error
               - Cross Entropy Loss
               - Binary Cross Entropy
               - Custom loss functions
            2. Evaluation metrics
            3. Loss function selection
            4. Multi-task learning losses
            5. Loss scaling and weighting`,
                            examples: [
                                {
                                    code: `# Common loss functions
            loss_functions = {
                'mse': nn.MSELoss(),
                'cross_entropy': nn.CrossEntropyLoss(),
                'bce': nn.BCELoss(),
                'l1': nn.L1Loss()
            }
            
            # Custom loss function
            class CustomLoss(nn.Module):
                def __init__(self, weight=0.5):
                    super().__init__()
                    self.weight = weight
                    self.mse = nn.MSELoss()
                    self.bce = nn.BCELoss()
                
                def forward(self, pred, target):
                    return self.weight * self.mse(pred, target) + \
                           (1 - self.weight) * self.bce(pred, target)`,
                                    explanation: 'Implementation of various loss functions',
                                    concept: 'Loss Functions'
                                }
                            ],
                            learningObjectives: [
                                'Understand different types of loss functions',
                                'Choose appropriate loss functions for different tasks',
                                'Implement custom loss functions',
                                'Calculate and interpret evaluation metrics',
                                'Handle multi-task learning scenarios'
                            ],
                            practiceExercises: [
                                {
                                    title: 'Loss Function Analysis',
                                    description: 'Compare different loss functions for a classification task',
                                    template: `def compare_loss_functions(model, data_loader):
                results = {}
                for loss_name, loss_func in loss_functions.items():
                    # TODO: Train model with different loss functions
                    # TODO: Compare and analyze results
                return results`
                                }
                            ]
                        },
                        {
                            title: 'Regularization Techniques',
                            content: `Regularization helps prevent overfitting and improves model generalization. This section covers various regularization techniques and their implementation.
            
            Key concepts covered:
            1. L1 and L2 regularization
            2. Dropout
            3. Batch Normalization
            4. Early Stopping
            5. Data Augmentation`,
                            examples: [
                                {
                                    code: `class RegularizedNN(nn.Module):
                def __init__(self, input_size, hidden_size, output_size, dropout_rate=0.5):
                    super().__init__()
                    self.layer1 = nn.Linear(input_size, hidden_size)
                    self.bn1 = nn.BatchNorm1d(hidden_size)
                    self.dropout = nn.Dropout(dropout_rate)
                    self.layer2 = nn.Linear(hidden_size, output_size)
                
                def forward(self, x):
                    x = self.layer1(x)
                    x = self.bn1(x)
                    x = F.relu(x)
                    x = self.dropout(x)
                    x = self.layer2(x)
                    return x`,
                                    explanation: 'Neural network with regularization techniques',
                                    concept: 'Regularization'
                                }
                            ],
                            learningObjectives: [
                                'Understand different regularization techniques',
                                'Implement various regularization methods',
                                'Choose appropriate regularization for different scenarios',
                                'Monitor and prevent overfitting',
                                'Debug regularization-related issues'
                            ],
                            practiceExercises: [
                                {
                                    title: 'Regularization Comparison',
                                    description: 'Compare the effect of different regularization techniques',
                                    template: `def compare_regularization(X_train, y_train):
                models = {
                    'base': create_base_model(),
                    'l1': create_l1_model(),
                    'l2': create_l2_model(),
                    'dropout': create_dropout_model(),
                    'batch_norm': create_bn_model()
                }
                # TODO: Train and compare models
                return results`
                                }
                            ]
                        }
                    ]
                }
            },
            {
                id: 17,
                title: 'Reinforcement Learning',
    content: {
        introduction: 'Comprehensive guide to reinforcement learning, covering fundamental concepts through advanced implementations.',
        sections: [
            {
                title: 'Foundations and Core Concepts',
                content: 'Key elements of reinforcement learning:\n\n1. Agent-Environment Interaction:\n- Agent definition\n- Environment modeling\n- State spaces\n- Action spaces\n\n2. Reward Systems:\n- Reward functions\n- Delayed rewards\n- Credit assignment\n- Reward shaping\n\n3. Markov Decision Processes:\n- State transitions\n- Probability distributions\n- Discount factors\n- Optimality criteria',
                examples: [
                    {
                        code: `class RLEnvironment:
    def __init__(self):
        self.state_space = self.define_state_space()
        self.action_space = self.define_action_space()
        self.current_state = None

    def step(self, action):
        next_state = self.transition_function(self.current_state, action)
        reward = self.reward_function(self.current_state, action, next_state)
        done = self.is_terminal_state(next_state)
        info = self.get_additional_info()
        
        self.current_state = next_state
        return next_state, reward, done, info

    def reset(self):
        self.current_state = self.initial_state()
        return self.current_state

    def reward_function(self, state, action, next_state):
        immediate_reward = self.calculate_immediate_reward(state, action)
        future_reward = self.estimate_future_reward(next_state)
        return immediate_reward + self.discount_factor * future_reward`,
                        explanation: 'Environment implementation showing:\n1. State-action spaces\n2. Transition functions\n3. Reward calculation\n4. Environment dynamics',
                        concept: 'RL Environment Design'
                    }
                ],
                learningObjectives: [
                    'Master core RL concepts and terminology',
                    'Learn environment design principles',
                    'Understand reward system design',
                    'Develop skills in MDP modeling'
                ]
            },
            {
                title: 'Value-Based Methods',
                content: 'Value function estimation and Q-learning:\n\n1. Value Functions:\n- State values\n- Action values\n- Optimal values\n- Value iteration\n\n2. Q-Learning:\n- Q-table updates\n- Learning rates\n- Exploration strategies\n- Convergence properties\n\n3. Deep Q-Networks:\n- Neural architectures\n- Experience replay\n- Target networks\n- Double Q-learning',
                examples: [
                    {
                        code: `class QLearningAgent:
    def __init__(self, state_size, action_size):
        self.q_table = np.zeros((state_size, action_size))
        self.learning_rate = 0.1
        self.discount_factor = 0.95
        self.epsilon = 0.1

    def select_action(self, state):
        if random.random() < self.epsilon:
            return random.randint(0, self.action_size - 1)
        return np.argmax(self.q_table[state])

    def update(self, state, action, reward, next_state):
        old_value = self.q_table[state, action]
        next_max = np.max(self.q_table[next_state])
        
        new_value = (1 - self.learning_rate) * old_value + \
                   self.learning_rate * (reward + self.discount_factor * next_max)
        
        self.q_table[state, action] = new_value
        return self.calculate_td_error(old_value, new_value)

    def decay_exploration(self):
        self.epsilon *= 0.995
        self.epsilon = max(0.01, self.epsilon)`,
                        explanation: 'Q-learning implementation featuring:\n1. Q-table management\n2. Action selection\n3. Value updates\n4. Exploration decay',
                        concept: 'Q-Learning Implementation'
                    }
                ],
                learningObjectives: [
                    'Master value function computation',
                    'Learn Q-learning implementation',
                    'Understand exploration strategies',
                    'Develop skills in DQN design'
                ]
            },
            {
                title: 'Policy-Based Methods',
                content: 'Direct policy optimization approaches:\n\n1. Policy Gradients:\n- Policy parameterization\n- Gradient estimation\n- Baseline subtraction\n- Update rules\n\n2. Actor-Critic Methods:\n- Actor networks\n- Critic networks\n- Advantage estimation\n- Trust regions\n\n3. Advanced Policy Methods:\n- PPO\n- TRPO\n- SAC\n- A3C',
                examples: [
                    {
                        code: `class PolicyGradientAgent:
    def __init__(self, state_dim, action_dim):
        self.policy_network = self.build_policy_network(state_dim, action_dim)
        self.optimizer = tf.keras.optimizers.Adam(learning_rate=0.001)
        self.baseline = self.build_baseline_network(state_dim)

    def build_policy_network(self, state_dim, action_dim):
        model = tf.keras.Sequential([
            tf.keras.layers.Dense(64, activation='relu'),
            tf.keras.layers.Dense(32, activation='relu'),
            tf.keras.layers.Dense(action_dim, activation='softmax')
        ])
        return model

    @tf.function
    def compute_loss(self, actions, advantages):
        action_probs = self.policy_network(states)
        selected_action_probs = tf.reduce_sum(
            action_probs * tf.one_hot(actions, self.action_dim), axis=1
        )
        loss = -tf.reduce_mean(tf.math.log(selected_action_probs) * advantages)
        return loss

    def update(self, states, actions, rewards):
        advantages = self.compute_advantages(states, rewards)
        with tf.GradientTape() as tape:
            loss = self.compute_loss(actions, advantages)
        
        grads = tape.gradient(loss, self.policy_network.trainable_variables)
        self.optimizer.apply_gradients(
            zip(grads, self.policy_network.trainable_variables)
        )`,
                        explanation: 'Policy gradient implementation showing:\n1. Network architecture\n2. Loss computation\n3. Advantage estimation\n4. Policy updates',
                        concept: 'Policy Gradient Methods'
                    }
                ],
                learningObjectives: [
                    'Master policy gradient methods',
                    'Learn actor-critic implementation',
                    'Understand advanced policy algorithms',
                    'Develop skills in policy optimization'
                ]
            },
            {
                title: 'Advanced RL Concepts',
                content: 'Advanced topics and applications:\n\n1. Multi-Agent RL:\n- Agent interaction\n- Cooperative learning\n- Competitive learning\n- Communication protocols\n\n2. Hierarchical RL:\n- Task decomposition\n- Option frameworks\n- Skill acquisition\n- Transfer learning\n\n3. Model-Based RL:\n- Environment modeling\n- Planning algorithms\n- Sample efficiency\n- uncertainty handling',
                examples: [
                    {
                        code: `class MultiAgentRL:
    def __init__(self, num_agents, state_dim, action_dim):
        self.agents = [
            self.create_agent(state_dim, action_dim) 
            for _ in range(num_agents)
        ]
        self.shared_memory = self.initialize_shared_memory()

    def create_agent(self, state_dim, action_dim):
        return {
            'policy': self.build_policy_network(state_dim, action_dim),
            'critic': self.build_critic_network(state_dim),
            'memory': self.create_experience_buffer(),
            'optimizer': self.configure_optimizer()
        }

    def joint_action_selection(self, states):
        actions = []
        for agent_id, agent in enumerate(self.agents):
            agent_state = self.process_state_for_agent(states, agent_id)
            action = agent['policy'].select_action(agent_state)
            actions.append(action)
        return actions

    def update_agents(self, experiences):
        for agent_id, agent in enumerate(self.agents):
            agent_experience = self.process_experience(experiences, agent_id)
            self.update_single_agent(agent, agent_experience)`,
                        explanation: 'Multi-agent RL implementation featuring:\n1. Agent management\n2. Joint action selection\n3. Experience sharing\n4. Coordinated updates',
                        concept: 'Multi-Agent Reinforcement Learning'
                    }
                ],
                learningObjectives: [
                    'Master multi-agent RL concepts',
                    'Learn hierarchical RL implementation',
                    'Understand model-based approaches',
                    'Develop skills in advanced RL applications'
                ]
            }
        ]
    }
},
            {
                id: 18,
                title: 'Generative AI & GANs',
                content: {
                    introduction: `Master the principles and implementation of Generative Adversarial Networks (GANs) and other generative AI models. This comprehensive course covers everything from basic GAN architecture to advanced techniques and applications in image generation, style transfer, and more.`,
                    sections: [
                        {
                            title: 'Introduction to Generative Models',
                            content: `Generative models are a class of AI models that can create new data samples similar to those they were trained on. This section covers the fundamental concepts of generative modeling and various approaches.
            
            Key concepts covered:
            1. Types of generative models
               - Generative Adversarial Networks (GANs)
               - Variational Autoencoders (VAEs)
               - Autoregressive Models
               - Diffusion Models
            2. Applications of generative models
            3. Comparing different approaches
            4. Understanding latent spaces
            5. Evaluation metrics for generative models`,
                            examples: [
                                {
                                    code: `# Simple Autoencoder - Foundation for VAEs
            class Autoencoder(nn.Module):
                def __init__(self, input_dim, latent_dim):
                    super().__init__()
                    # Encoder
                    self.encoder = nn.Sequential(
                        nn.Linear(input_dim, 128),
                        nn.ReLU(),
                        nn.Linear(128, latent_dim)
                    )
                    # Decoder
                    self.decoder = nn.Sequential(
                        nn.Linear(latent_dim, 128),
                        nn.ReLU(),
                        nn.Linear(128, input_dim),
                        nn.Sigmoid()
                    )
                
                def forward(self, x):
                    z = self.encoder(x)
                    return self.decoder(z)`,
                                    explanation: 'Basic autoencoder implementation as foundation for generative models',
                                    concept: 'Autoencoder Architecture'
                                },
                                {
                                    code: `# Calculating reconstruction loss
            def reconstruction_loss(model, data_loader, criterion):
                total_loss = 0
                for batch in data_loader:
                    # Forward pass
                    recon = model(batch)
                    # Calculate loss
                    loss = criterion(recon, batch)
                    total_loss += loss.item()
                return total_loss / len(data_loader)`,
                                    explanation: 'Evaluating generative model performance',
                                    concept: 'Model Evaluation'
                                }
                            ],
                            learningObjectives: [
                                'Understand different types of generative models',
                                'Compare and contrast various generative approaches',
                                'Implement basic autoencoder architecture',
                                'Evaluate generative model performance',
                                'Choose appropriate generative models for different tasks'
                            ],
                            practiceExercises: [
                                {
                                    title: 'Implement Basic Autoencoder',
                                    description: 'Create and train a simple autoencoder on MNIST dataset',
                                    template: `class SimpleMNISTAutoencoder(nn.Module):
                def __init__(self):
                    super().__init__()
                    # TODO: Implement encoder and decoder
                    
                def forward(self, x):
                    # TODO: Implement forward pass
                    pass
            
            def train_autoencoder(model, train_loader, num_epochs):
                # TODO: Implement training loop
                pass`
                                }
                            ]
                        },
                        {
                            title: 'GAN Architecture and Training',
                            content: `GANs consist of two neural networks competing against each other: a generator that creates fake data and a discriminator that tries to distinguish real from fake data. This adversarial process results in the generation of highly realistic synthetic data.
            
            Key concepts covered:
            1. GAN components
               - Generator architecture
               - Discriminator architecture
            2. Loss functions and objectives
            3. Training dynamics
            4. Common challenges
               - Mode collapse
               - Vanishing gradients
               - Training instability
            5. Tips for stable training`,
                            examples: [
                                {
                                    code: `class Generator(nn.Module):
                def __init__(self, latent_dim, img_shape):
                    super().__init__()
                    self.img_shape = img_shape
                    
                    def block(in_feat, out_feat, normalize=True):
                        layers = [nn.Linear(in_feat, out_feat)]
                        if normalize:
                            layers.append(nn.BatchNorm1d(out_feat, 0.8))
                        layers.append(nn.LeakyReLU(0.2, inplace=True))
                        return layers
                    
                    self.model = nn.Sequential(
                        *block(latent_dim, 128, normalize=False),
                        *block(128, 256),
                        *block(256, 512),
                        *block(512, 1024),
                        nn.Linear(1024, int(np.prod(img_shape))),
                        nn.Tanh()
                    )
                
                def forward(self, z):
                    img = self.model(z)
                    img = img.view(img.size(0), *self.img_shape)
                    return img
            
            class Discriminator(nn.Module):
                def __init__(self, img_shape):
                    super().__init__()
                    
                    self.model = nn.Sequential(
                        nn.Linear(int(np.prod(img_shape)), 512),
                        nn.LeakyReLU(0.2, inplace=True),
                        nn.Linear(512, 256),
                        nn.LeakyReLU(0.2, inplace=True),
                        nn.Linear(256, 1),
                        nn.Sigmoid()
                    )
                
                def forward(self, img):
                    img_flat = img.view(img.size(0), -1)
                    validity = self.model(img_flat)
                    return validity`,
                                    explanation: 'Basic GAN architecture implementation',
                                    concept: 'GAN Implementation'
                                },
                                {
                                    code: `# GAN training loop
            def train_gan(generator, discriminator, dataloader, num_epochs):
                adversarial_loss = torch.nn.BCELoss()
                optimizer_G = torch.optim.Adam(generator.parameters(), lr=0.0002, betas=(0.5, 0.999))
                optimizer_D = torch.optim.Adam(discriminator.parameters(), lr=0.0002, betas=(0.5, 0.999))
                
                for epoch in range(num_epochs):
                    for i, (imgs, _) in enumerate(dataloader):
                        # Ground truths
                        valid = torch.ones(imgs.size(0), 1);
                        fake = torch.zeros(imgs.size(0), 1);
                        
                        # Train Generator
                        optimizer_G.zero_grad();
                        z = torch.randn(imgs.size(0), latent_dim);
                        gen_imgs = generator(z);
                        g_loss = adversarial_loss(discriminator(gen_imgs), valid);
                        g_loss.backward();
                        optimizer_G.step();
                        
                        # Train Discriminator
                        optimizer_D.zero_grad();
                        real_loss = adversarial_loss(discriminator(imgs), valid);
                        fake_loss = adversarial_loss(discriminator(gen_imgs.detach()), fake);
                        d_loss = (real_loss + fake_loss) / 2;
                        d_loss.backward();
                        optimizer_D.step();`,
                                    explanation: 'GAN training implementation with loss calculation',
                                    concept: 'GAN Training'
                                }
                            ],
                            learningObjectives: [
                                'Understand GAN architecture components',
                                'Implement generator and discriminator networks',
                                'Master GAN training dynamics',
                                'Handle common GAN training issues',
                                'Apply techniques for stable training'
                            ],
                            practiceExercises: [
                                {
                                    title: 'Implement MNIST GAN',
                                    description: 'Create and train a GAN to generate handwritten digits',
                                    template: `# TODO: Implement Generator
            # TODO: Implement Discriminator
            # TODO: Implement training loop with proper loss functions
            # TODO: Add visualization of generated samples`
                                }
                            ]
                        },
                        {
                            title: 'Advanced GAN Architectures',
                            content: `Various GAN architectures have been developed to address specific challenges and use cases. This section covers popular GAN variants and their applications.
            
            Key concepts covered:
            1. DCGAN (Deep Convolutional GAN)
            2. Conditional GAN
            3. CycleGAN
            4. Progressive GAN
            5. StyleGAN
            6. Advanced training techniques`,
                            examples: [
                                {
                                    code: `class DCGAN_Generator(nn.Module):
                def __init__(self, latent_dim, channels):
                    super().__init__()
                    
                    self.init_size = 32 // 4  # Initial size before upsampling
                    self.l1 = nn.Sequential(nn.Linear(latent_dim, 128 * self.init_size ** 2))
                    
                    self.conv_blocks = nn.Sequential(
                        nn.BatchNorm2d(128),
                        nn.Upsample(scale_factor=2),
                        nn.Conv2d(128, 128, 3, stride=1, padding=1),
                        nn.BatchNorm2d(128, 0.8),
                        nn.LeakyReLU(0.2, inplace=True),
                        nn.Upsample(scale_factor=2),
                        nn.Conv2d(128, 64, 3, stride=1, padding=1),
                        nn.BatchNorm2d(64, 0.8),
                        nn.LeakyReLU(0.2, inplace=True),
                        nn.Conv2d(64, channels, 3, stride=1, padding=1),
                        nn.Tanh()
                    )
                    
                def forward(self, z):
                    out = self.l1(z);
                    out = out.view(out.shape[0], 128, self.init_size, self.init_size);
                    img = self.conv_blocks(out);
                    return img`,
                                    explanation: 'DCGAN generator implementation',
                                    concept: 'DCGAN'
                                },
                                {
                                    code: `class ConditionalGAN_Generator(nn.Module):
                def __init__(self, latent_dim, n_classes, img_shape):
                    super().__init__()
                    
                    self.label_emb = nn.Embedding(n_classes, latent_dim);
                    
                    def block(in_feat, out_feat, normalize=True):
                        layers = [nn.Linear(in_feat, out_feat)];
                        if normalize:
                            layers.append(nn.BatchNorm1d(out_feat, 0.8));
                        layers.append(nn.LeakyReLU(0.2, inplace=True));
                        return layers
                    
                    self.model = nn.Sequential(
                        *block(latent_dim * 2, 128, normalize=False),
                        *block(128, 256),
                        *block(256, 512),
                        *block(512, 1024),
                        nn.Linear(1024, int(np.prod(img_shape))),
                        nn.Tanh()
                    );
                    
                def forward(self, noise, labels):
                    gen_input = torch.cat((self.label_emb(labels), noise), -1);
                    img = self.model(gen_input);
                    img = img.view(img.size(0), *img_shape);
                    return img`,
                                    explanation: 'Conditional GAN implementation',
                                    concept: 'Conditional GAN'
                                }
                            ],
                            learningObjectives: [
                                'Understand different GAN architectures',
                                'Implement various GAN variants',
                                'Choose appropriate architectures for specific tasks',
                                'Apply advanced training techniques',
                                'Debug and optimize GAN performance'
                            ],
                            practiceExercises: [
                                {
                                    title: 'Implement Conditional GAN',
                                    description: 'Create a conditional GAN for generating specific digit classes',
                                    template: `# TODO: Implement conditional generator
            # TODO: Implement conditional discriminator
            # TODO: Implement conditional GAN training loop`
                                }
                            ]
                        },
                        {
                            title: 'GAN Applications and Use Cases',
                            content: `GANs have numerous practical applications across various domains. This section explores real-world applications and implementation considerations.
            
            Key concepts covered:
            1. Image synthesis
            2. Style transfer
            3. Image-to-image translation
            4. Super-resolution
            5. Domain adaptation
            6. Ethical considerations`,
                            examples: [
                                {
                                    code: `class StyleTransferGAN(nn.Module):
                def __init__(self):
                    super().__init__()
                    
                    # Content encoder
                    self.content_encoder = nn.Sequential(
                        nn.Conv2d(3, 64, 7, stride=1, padding=3),
                        nn.InstanceNorm2d(64),
                        nn.ReLU(inplace=True),
                        # Add more layers as needed
                    );
                    
                    # Style encoder
                    self.style_encoder = nn.Sequential(
                        nn.Conv2d(3, 64, 7, stride=1, padding=3),
                        nn.InstanceNorm2d(64),
                        nn.ReLU(inplace=True),
                        # Add more layers as needed
                    );
                    
                    # Generator
                    self.generator = nn.Sequential(
                        # Residual blocks
                        ResidualBlock(64),
                        ResidualBlock(64),
                        # Add more layers as needed
                    );
                    
                def forward(self, content_img, style_img):
                    content_features = self.content_encoder(content_img);
                    style_features = self.style_encoder(style_img);
                    return self.generator(content_features, style_features)`,
                                    explanation: 'Style transfer GAN implementation',
                                    concept: 'Style Transfer'
                                }
                            ],
                            learningObjectives: [
                                'Understand various GAN applications',
                                'Implement GANs for specific use cases',
                                'Evaluate GAN performance in different domains',
                                'Consider ethical implications',
                                'Deploy GANs in production environments'
                            ],
                            practiceExercises: [
                                {
                                    title: 'Image Style Transfer',
                                    description: 'Implement a simple style transfer system using GANs',
                                    template: `# TODO: Implement style transfer GAN
            # TODO: Implement content and style loss functions
            # TODO: Create training pipeline for style transfer`
                                }
                            ]
                        },
                        {
                            title: 'GAN Evaluation and Debugging',
                            content: `Evaluating and debugging GANs presents unique challenges due to their adversarial nature. This section covers metrics, visualization techniques, and debugging strategies.
            
            Key concepts covered:
            1. Evaluation metrics
               - Inception Score
               - FID Score
               - Precision and Recall
            2. Visualization techniques
            3. Common failure modes
            4. Debugging strategies
            5. Performance optimization`,
                            examples: [
                                {
                                    code: `def calculate_inception_score(generator, num_samples=50000):
                # Generate images
                z = torch.randn(num_samples, latent_dim);
                gen_imgs = generator(z).detach();
                
                # Calculate inception score
                inception_model = inception_v3(pretrained=True, transform_input=False);
                inception_model.eval();
                
                preds = [];
                for i in range(0, num_samples, batch_size):
                    batch = gen_imgs[i:i + batch_size];
                    pred = inception_model(batch);
                    preds.append(pred);
                
                preds = torch.cat(preds, dim=0);
                # Calculate mean KL divergence
                kl_div = torch.nn.KLDivLoss(reduction='batchmean');
                scores = [];
                for i in range(num_splits):
                    part = preds[i * (num_samples // num_splits): 
                                (i + 1) * (num_samples // num_splits)];
                    py = torch.mean(part, dim=0);
                    scores.append(torch.exp(kl_div(py.log(), part)));
                
                return torch.mean(torch.stack(scores)), torch.std(torch.stack(scores))`,
                                    explanation: 'Implementation of Inception Score calculation',
                                    concept: 'GAN Evaluation'
                                },
                                {
                                    code: `def visualize_gan_progress(generator, fixed_noise, epoch):
                """Visualize GAN progress during training"""
                with torch.no_grad():
                    fake_images = generator(fixed_noise).detach().cpu();
                
                # Create grid of images
                img_grid = make_grid(fake_images, normalize=True, nrow=8);
                
                # Save or display images
                plt.figure(figsize=(10, 10));
                plt.imshow(img_grid.permute(1, 2, 0));
                plt.axis('off');
                plt.title(f'Generated Images - Epoch {epoch}');
                plt.savefig(f'gan_progress_epoch_{epoch}.png');
                plt.close();
            
            def debug_gan_training(g_loss_history, d_loss_history):
                """Analyze GAN training dynamics"""
                plt.figure(figsize=(10, 5));
                plt.plot(g_loss_history, label='Generator Loss');
                plt.plot(d_loss_history, label='Discriminator Loss');
                plt.xlabel('Iterations');
                plt.ylabel('Loss');
                plt.legend();
                plt.title('GAN Training Dynamics');
                plt.grid(True);
                plt.show();
            
            def check_gradient_flow(model):
                """Monitor gradient flow in the model"""
                for name, param in model.named_parameters():
                    if param.requires_grad and param.grad is not None:
                        print(f'{name}: {param.grad.abs().mean().item()}');`,
                                    explanation: 'Tools for monitoring and debugging GAN training',
                                    concept: 'GAN Debugging'
                                }
                            ],
                            learningObjectives: [
                                'Implement and understand GAN evaluation metrics',
                                'Use visualization tools for monitoring GAN progress',
                                'Debug common GAN training issues',
                                'Optimize GAN performance',
                                'Apply systematic debugging approaches'
                            ],
                            practiceExercises: [
                                {
                                    title: 'GAN Evaluation Pipeline',
                                    description: 'Create a comprehensive evaluation pipeline for GANs',
                                    template: `class GANEvaluator:
                def __init__(self):
                    # TODO: Initialize necessary metrics and models
                    pass
                
                def calculate_inception_score(self, generator):
                    # TODO: Implement inception score calculation
                    pass
                
                def calculate_fid_score(self, generator, real_images):
                    # TODO: Implement FID score calculation
                    pass
                
                def visualize_results(self, generator, epoch):
                    # TODO: Implement visualization
                    pass
                    
                def evaluate_diversity(self, generator):
                    # TODO: Implement diversity metrics
                    pass`
                                }
                            ]
                        }
                    ]
                }
            },
            {
                id: 19,
                title: 'AI Model Optimization',
    content: {
        introduction: 'Guide to optimizing AI models for improved performance, efficiency, and deployment.',
        sections: [
            {
                title: 'Model Size Reduction',
                content: 'Techniques for reducing model size while maintaining performance:\n\n1. Pruning:\n- Weight pruning\n- Neuron pruning\n- Structured pruning\n- Iterative pruning\n\n2. Quantization:\n- Post-training quantization\n- Quantization-aware training\n- Mixed-precision training\n- Dynamic quantization\n\n3. Knowledge Distillation:\n- Teacher-student architecture\n- Soft targets\n- Temperature scaling\n- Feature distillation',
                examples: [
                    {
                        code: `class ModelCompression:
    def __init__(self, model):
        self.model = model
        self.compressed_model = None

    def apply_pruning(self, pruning_ratio=0.5):
        masks = self.calculate_pruning_masks()
        weights = self.get_model_weights()
        
        return {
            'pruned_weights': self.apply_masks(weights, masks),
            'compression_ratio': self.calculate_compression(),
            'accuracy_impact': self.measure_accuracy_impact(),
            'memory_saved': self.calculate_memory_savings()
        }

    def quantize_model(self, bits=8):
        return {
            'quantized_weights': self.perform_quantization(bits),
            'size_reduction': self.measure_size_reduction(),
            'performance_impact': self.assess_performance(),
            'memory_usage': self.measure_memory_usage()
        }

    def knowledge_distillation(self, student_model):
        return {
            'teacher_predictions': self.get_soft_targets(),
            'student_training': self.train_student(student_model),
            'knowledge_transfer': self.transfer_knowledge(),
            'comparison': self.compare_models()
        }`,
                        explanation: 'Model compression implementation showing:\n1. Pruning strategies\n2. Quantization methods\n3. Knowledge distillation\n4. Performance monitoring',
                        concept: 'Model Size Optimization'
                    }
                ],
                learningObjectives: [
                    'Master model compression techniques',
                    'Learn quantization implementation',
                    'Understand knowledge distillation',
                    'Develop skills in model optimization'
                ]
            },
            {
                title: 'Performance Optimization',
                content: 'Methods for improving model execution speed and efficiency:\n\n1. Architectural Optimization:\n- Layer optimization\n- Skip connections\n- Bottleneck design\n- Architecture search\n\n2. Inference Optimization:\n- Graph optimization\n- Kernel fusion\n- Memory planning\n- Cache optimization\n\n3. Hardware Acceleration:\n- GPU optimization\n- TPU utilization\n- FPGA deployment\n- Custom hardware',
                examples: [
                    {
                        code: `class PerformanceOptimizer:
    def __init__(self):
        self.optimizations = []
        self.metrics = {}

    def optimize_architecture(self):
        return {
            'layer_optimization': self.optimize_layers(),
            'connection_pruning': self.optimize_connections(),
            'bottleneck_redesign': self.optimize_bottlenecks(),
            'architecture_search': self.search_optimal_architecture()
        }

    def optimize_inference(self):
        return {
            'graph_optimization': self.optimize_compute_graph(),
            'memory_planning': self.optimize_memory_access(),
            'kernel_fusion': self.fuse_operations(),
            'cache_optimization': self.optimize_cache_usage()
        }

    def hardware_acceleration(self):
        return {
            'gpu_optimization': self.optimize_gpu_kernels(),
            'tpu_deployment': self.deploy_to_tpu(),
            'custom_hardware': self.optimize_for_hardware(),
            'performance_metrics': self.measure_speedup()
        }`,
                        explanation: 'Performance optimization covering:\n1. Architecture optimization\n2. Inference optimization\n3. Hardware acceleration\n4. Performance measurement',
                        concept: 'Performance Enhancement'
                    }
                ],
                learningObjectives: [
                    'Master performance optimization techniques',
                    'Learn hardware acceleration methods',
                    'Understand architectural optimization',
                    'Develop skills in inference optimization'
                ]
            },
            {
                title: 'Profiling and Analysis',
                content: 'Tools and techniques for analyzing model performance:\n\n1. Model Profiling:\n- Performance analysis\n- Memory profiling\n- Computational bottlenecks\n- Resource utilization\n\n2. Operator Optimization:\n- Operator fusion\n- Kernel optimization\n- Memory access patterns\n- Computation scheduling\n\n3. Dynamic Optimization:\n- Batch size optimization\n- Dynamic shape handling\n- Adaptive computation\n- Runtime optimization',
                examples: [
                    {
                        code: `class ModelProfiler:
    def __init__(self):
        self.profiling_data = {}
        self.optimization_suggestions = []

    def profile_model_performance(self):
        return {
            'compute_profile': self.analyze_computation(),
            'memory_profile': self.analyze_memory_usage(),
            'bottlenecks': self.identify_bottlenecks(),
            'recommendations': self.generate_recommendations()
        }

    def optimize_operators(self):
        return {
            'operator_fusion': self.fuse_compatible_ops(),
            'kernel_optimization': self.optimize_kernels(),
            'memory_patterns': self.optimize_memory_patterns(),
            'scheduling': self.optimize_scheduling()
        }

    def implement_dynamic_batching(self):
        return {
            'batch_optimization': self.optimize_batch_size(),
            'shape_handling': self.handle_dynamic_shapes(),
            'adaptive_compute': self.implement_adaptive_compute(),
            'runtime_opts': self.optimize_runtime()
        }`,
                        explanation: 'Model profiling and analysis showing:\n1. Performance profiling\n2. Operator optimization\n3. Dynamic batching\n4. Runtime optimization',
                        concept: 'Model Analysis and Optimization'
                    }
                ],
                learningObjectives: [
                    'Master model profiling techniques',
                    'Learn operator optimization methods',
                    'Understand dynamic optimization',
                    'Develop skills in performance analysis'
                ]
            }
        ]
    }
},
            {
                id: 20,
                title: 'AI Tools & Frameworks',
    content: {
        introduction: 'Comprehensive overview of essential tools and frameworks in AI development, covering deep learning frameworks, scientific computing libraries, and development tools.',
        sections: [
            {
                title: 'Deep Learning Frameworks',
                content: 'Major deep learning frameworks and their applications:\n\n1. TensorFlow:\n- Architecture overview\n- Core components\n- Deployment options\n- Use cases\n\n2. PyTorch:\n- Dynamic computation graphs\n- Research features\n- Production deployment\n- Ecosystem tools\n\n3. Keras:\n- High-level API design\n- Backend options\n- Model development\n- Integration capabilities',
                examples: [
                    {
                        code: `# TensorFlow Example
import tensorflow as tf

class DeepLearningFramework:
    def __init__(self):
        self.model = None
        self.training_config = {}

    def build_model(self):
        model = tf.keras.Sequential([
            tf.keras.layers.Dense(128, activation='relu'),
            tf.keras.layers.Dropout(0.2),
            tf.keras.layers.Dense(64, activation='relu'),
            tf.keras.layers.Dense(10, activation='softmax')
        ])
        return model

    def configure_training(self):
        return {
            'optimizer': tf.keras.optimizers.Adam(),
            'loss': tf.keras.losses.CategoricalCrossentropy(),
            'metrics': ['accuracy']
        }

    def train_model(self, data, epochs=10):
        history = self.model.fit(
            data.train_data,
            data.train_labels,
            epochs=epochs,
            validation_data=(data.val_data, data.val_labels)
        )
        return history`,
                        explanation: 'Deep learning framework implementation showcasing:\n1. Model architecture definition\n2. Training configuration\n3. Model training process\n4. Performance monitoring',
                        concept: 'Deep Learning Framework Usage'
                    },
                    {
                        code: `# PyTorch Example
import torch
import torch.nn as nn

class PyTorchImplementation:
    def __init__(self):
        self.device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
        self.model = None

    def create_model(self):
        model = nn.Sequential(
            nn.Linear(784, 128),
            nn.ReLU(),
            nn.Dropout(0.2),
            nn.Linear(128, 64),
            nn.ReLU(),
            nn.Linear(64, 10),
            nn.Softmax(dim=1)
        ).to(self.device)
        return model

    def training_loop(self, train_loader, epochs=10):
        criterion = nn.CrossEntropyLoss()
        optimizer = torch.optim.Adam(self.model.parameters())
        
        for epoch in range(epochs):
            for batch_idx, (data, target) in enumerate(train_loader):
                data, target = data.to(self.device), target.to(self.device)
                optimizer.zero_grad()
                output = self.model(data)
                loss = criterion(output, target)
                loss.backward()
                optimizer.step()`,
                        explanation: 'PyTorch implementation demonstrating:\n1. Device management\n2. Model creation\n3. Training loop implementation\n4. Optimization process',
                        concept: 'PyTorch Development'
                    }
                ],
                learningObjectives: [
                    'Master deep learning framework fundamentals',
                    'Learn framework selection criteria',
                    'Understand implementation differences',
                    'Develop skills in framework usage'
                ]
            },
            {
                title: 'Scientific Computing and Data Analysis',
                content: 'Essential libraries for scientific computing and data manipulation:\n\n1. NumPy:\n- Array operations\n- Mathematical functions\n- Broadcasting rules\n- Performance optimization\n\n2. Pandas:\n- Data structures\n- Data cleaning\n- Analysis functions\n- Data visualization\n\n3. Scikit-learn:\n- Machine learning algorithms\n- Model selection\n- Preprocessing tools\n- Evaluation metrics',
                examples: [
                    {
                        code: `import numpy as np
import pandas as pd
from sklearn.preprocessing import StandardScaler
from sklearn.model_selection import train_test_split

class DataProcessor:
    def __init__(self):
        self.scaler = StandardScaler()
        self.data = None

    def process_numerical_data(self, data):
        return {
            'mean': np.mean(data, axis=0),
            'std': np.std(data, axis=0),
            'normalized': self.scaler.fit_transform(data),
            'statistics': self.calculate_statistics(data)
        }

    def pandas_operations(self, df):
        return {
            'cleaned': self.clean_data(df),
            'transformed': self.transform_features(df),
            'aggregated': self.aggregate_data(df),
            'analyzed': self.analyze_patterns(df)
        }

    def sklearn_preprocessing(self, X, y):
        X_train, X_test, y_train, y_test = train_test_split(
            X, y, test_size=0.2, random_state=42
        )
        return {
            'train_data': self.preprocess_data(X_train),
            'test_data': self.preprocess_data(X_test),
            'train_labels': y_train,
            'test_labels': y_test
        }`,
                        explanation: 'Scientific computing implementation showing:\n1. NumPy array operations\n2. Pandas data manipulation\n3. Scikit-learn preprocessing\n4. Data analysis workflows',
                        concept: 'Scientific Computing Tools'
                    }
                ],
                learningObjectives: [
                    'Master scientific computing libraries',
                    'Learn data manipulation techniques',
                    'Understand preprocessing methods',
                    'Develop skills in data analysis'
                ]
            },
            {
                title: 'Development and Deployment Tools',
                content: 'Tools for development, version control, and deployment:\n\n1. Jupyter Notebook:\n- Interactive development\n- Code documentation\n- Result visualization\n- Collaboration features\n\n2. Docker:\n- Container basics\n- Image creation\n- Deployment patterns\n- Orchestration\n\n3. Git:\n- Version control\n- Collaboration workflows\n- Branch management\n- Integration practices',
                examples: [
                    {
                        code: `# Development Environment Setup
from jupyter_client import KernelManager
import docker
import git

class DevelopmentEnvironment:
    def __init__(self):
        self.kernel_manager = KernelManager()
        self.docker_client = docker.from_env()
        self.repo = None

    def setup_jupyter(self):
        return {
            'kernel': self.configure_kernel(),
            'extensions': self.install_extensions(),
            'environment': self.setup_environment(),
            'configuration': self.configure_settings()
        }

    def manage_containers(self):
        return {
            'images': self.build_images(),
            'containers': self.run_containers(),
            'networks': self.setup_networks(),
            'volumes': self.configure_volumes()
        }

    def version_control(self):
        return {
            'repository': self.initialize_repo(),
            'branches': self.manage_branches(),
            'commits': self.track_changes(),
            'collaboration': self.setup_collaboration()
        }`,
                        explanation: 'Development tools implementation covering:\n1. Jupyter environment setup\n2. Docker container management\n3. Git version control\n4. Development workflow',
                        concept: 'Development Environment'
                    }
                ],
                learningObjectives: [
                    'Master development environment setup',
                    'Learn container management',
                    'Understand version control practices',
                    'Develop skills in tool integration'
                ]
            },
            {
                title: 'Big Data and Distributed Computing',
                content: 'Frameworks for handling large-scale data and distributed computing:\n\n1. Apache Spark MLlib:\n- Distributed processing\n- Scalable algorithms\n- Pipeline creation\n- Performance tuning\n\n2. Distributed Training:\n- Multi-GPU training\n- Cluster management\n- Synchronization strategies\n- Resource optimization\n\n3. Big Data Tools:\n- Data processing\n- Storage solutions\n- Computation frameworks\n- Workflow management',
                examples: [
                    {
                        code: `from pyspark.ml import Pipeline
from pyspark.ml.feature import VectorAssembler
from pyspark.ml.classification import RandomForestClassifier
from pyspark.ml.evaluation import MulticlassClassificationEvaluator

class DistributedComputing:
    def __init__(self, spark_session):
        self.spark = spark_session
        self.pipeline = None

    def setup_spark_pipeline(self):
        return {
            'preprocessing': self.configure_preprocessing(),
            'training': self.setup_training(),
            'evaluation': self.configure_evaluation(),
            'deployment': self.prepare_deployment()
        }

    def distributed_training(self):
        return {
            'partitioning': self.partition_data(),
            'distribution': self.distribute_training(),
            'aggregation': self.aggregate_results(),
            'synchronization': self.manage_synchronization()
        }

    def manage_resources(self):
        return {
            'allocation': self.allocate_resources(),
            'monitoring': self.monitor_usage(),
            'optimization': self.optimize_performance(),
            'scaling': self.manage_scaling()
        }`,
                        explanation: 'Distributed computing implementation showing:\n1. Spark pipeline setup\n2. Distributed training management\n3. Resource allocation\n4. Performance optimization',
                        concept: 'Distributed Computing Framework'
                    }
                ],
                learningObjectives: [
                    'Master distributed computing concepts',
                    'Learn big data processing techniques',
                    'Understand resource management',
                    'Develop skills in scalable systems'
                ]
            }
        ]
    }
},
            {
                id: 21,
                title: 'MLOps & AI Deployment',
    content: {
        introduction: 'Comprehensive guide to MLOps practices, covering the entire machine learning lifecycle from development to deployment and monitoring.',
        sections: [
            {
                title: 'MLOps Fundamentals and CI/CD',
                content: 'Core practices for implementing MLOps and CI/CD pipelines:\n\n1. MLOps Foundation:\n- Development workflows\n- Automation practices\n- Infrastructure management\n- Collaboration frameworks\n\n2. CI/CD Implementation:\n- Pipeline architecture\n- Testing strategies\n- Deployment automation\n- Version control\n\n3. Infrastructure Management:\n- Scalability planning\n- Resource optimization\n- Cost management\n- Security practices',
                examples: [
                    {
                        code: `class MLOpsWorkflow {
    constructor() {
        this.pipelines = new Map();
        this.environments = new Set();
    }

    setupCICD() {
        return {
            buildPipeline: this.configureBuildPipeline(),
            testAutomation: this.setupTestAutomation(),
            deploymentFlow: this.configureDeployment(),
            monitoring: this.setupMonitoring()
        };
    }

    async manageModelVersions(model) {
        return {
            versioning: await this.versionModel(model),
            artifacts: await this.trackArtifacts(model),
            dependencies: await this.manageDependencies(model),
            documentation: this.generateDocumentation(model)
        };
    }

    monitorDeployment() {
        return {
            performance: this.trackPerformance(),
            health: this.monitorHealth(),
            alerts: this.configureAlerts(),
            scaling: this.manageScaling()
        };
    }
}`,
                        explanation: 'MLOps workflow implementation includes:\n1. CI/CD pipeline setup\n2. Version management\n3. Deployment monitoring\n4. Infrastructure scaling',
                        concept: 'MLOps Pipeline Implementation'
                    }
                ],
                learningObjectives: [
                    'Master MLOps fundamentals and best practices',
                    'Learn CI/CD implementation for ML systems',
                    'Understand infrastructure management',
                    'Develop skills in automation and scaling'
                ]
            },
            {
                title: 'Model Serving and Monitoring',
                content: 'Strategies for deploying and monitoring ML models:\n\n1. Model Serving:\n- API development\n- Load balancing\n- Caching strategies\n- Service scaling\n\n2. Monitoring Systems:\n- Performance tracking\n- Drift detection\n- Alert management\n- Logging systems\n\n3. A/B Testing:\n- Test design\n- Implementation strategies\n- Analysis methods\n- Decision frameworks',
                examples: [
                    {
                        code: `class ModelServing {
    constructor() {
        this.endpoints = new Map();
        this.metrics = new Set();
    }

    deployModel(model) {
        return {
            api: this.createAPI(model),
            scaling: this.configureScaling(model),
            monitoring: this.setupMonitoring(model),
            documentation: this.generateAPIDocs(model)
        };
    }

    async monitorPerformance() {
        return {
            metrics: await this.collectMetrics(),
            drift: await this.detectDrift(),
            alerts: await this.manageAlerts(),
            reports: this.generateReports()
        };
    }

    implementABTesting() {
        return {
            testSetup: this.configureTest(),
            deployment: this.deployVariants(),
            analysis: this.analyzeResults(),
            decisions: this.makeDecisions()
        };
    }
}`,
                        explanation: 'Model serving and monitoring involves:\n1. API endpoint management\n2. Performance monitoring\n3. A/B testing implementation\n4. Decision making based on metrics',
                        concept: 'Model Deployment and Monitoring'
                    }
                ],
                learningObjectives: [
                    'Master model serving techniques',
                    'Learn monitoring system implementation',
                    'Understand A/B testing methodologies',
                    'Develop skills in performance optimization'
                ]
            },
            {
                title: 'Feature Store and Experiment Tracking',
                content: 'Management of ML features and experiments:\n\n1. Feature Store:\n- Feature management\n- Version control\n- Access patterns\n- Documentation\n\n2. Experiment Tracking:\n- Metadata management\n- Result comparison\n- Resource tracking\n- Reproducibility\n\n3. Model Registry:\n- Version management\n- Artifact storage\n- Deployment tracking\n- Lifecycle management',
                examples: [
                    {
                        code: `class FeatureManagement {
    constructor() {
        this.features = new Map();
        this.experiments = new Set();
    }

    manageFeatureStore() {
        return {
            storage: this.configureStorage(),
            versioning: this.manageVersions(),
            access: this.controlAccess(),
            documentation: this.maintainDocs()
        };
    }

    async trackExperiments() {
        return {
            metadata: await this.recordMetadata(),
            results: await this.compareResults(),
            resources: await this.trackResources(),
            reproduction: this.ensureReproducibility()
        };
    }

    manageRegistry() {
        return {
            versions: this.trackVersions(),
            artifacts: this.storeArtifacts(),
            deployments: this.trackDeployments(),
            lifecycle: this.manageLifecycle()
        };
    }
}`,
                        explanation: 'Feature and experiment management includes:\n1. Feature store implementation\n2. Experiment tracking systems\n3. Registry management\n4. Lifecycle tracking',
                        concept: 'Feature and Experiment Management'
                    }
                ],
                learningObjectives: [
                    'Master feature store implementation',
                    'Learn experiment tracking methodologies',
                    'Understand registry management',
                    'Develop skills in lifecycle tracking'
                ]
            }
        ]
    }
},
            {
                id: 22,
                title: 'AI Testing & Quality Assurance',
    content: {
        introduction: 'A comprehensive guide to testing and quality assurance in AI systems, covering model validation, bias testing, performance evaluation, and system integration testing. This module explores both theoretical foundations and practical implementation of AI testing methodologies.',
        sections: [
            {
                title: 'Model Validation and Performance Testing',
                content: 'Core methodologies for validating AI models and evaluating their performance across various metrics. Model validation ensures AI systems perform reliably and accurately in real-world scenarios. Key aspects include:\n\n1. Validation Strategies:\n- Hold-out validation\n- K-fold cross-validation\n- Stratified sampling\n- Time-series validation\n\n2. Performance Metrics:\n- Classification metrics (precision, recall, F1)\n- Regression metrics (MSE, MAE, R²)\n- Ranking metrics (NDCG, MRR)\n- Custom domain-specific metrics\n\n3. Bias Detection:\n- Statistical bias measures\n- Demographic analysis\n- Fairness metrics\n- Mitigation strategies\n\n4. Resource Optimization:\n- Inference time optimization\n- Memory usage profiling\n- Batch processing efficiency\n- Hardware utilization',
                examples: [
                    {
                        code: `class ModelValidator {
    constructor(model, testData) {
        this.model = model;
        this.testData = testData;
        this.metrics = new Map();
    }

    async validateModel() {
        const results = {
            accuracy: await this.evaluateAccuracy(),
            robustness: await this.testRobustness(),
            bias: await this.assessBias(),
            performance: await this.measurePerformance()
        };

        this.logValidationResults(results);
        return this.generateValidationReport(results);
    }

    async evaluateAccuracy() {
        const metrics = {
            precision: await this.calculatePrecision(),
            recall: await this.calculateRecall(),
            f1Score: await this.calculateF1Score(),
            confusionMatrix: await this.generateConfusionMatrix()
        };

        return this.analyzeAccuracyMetrics(metrics);
    }

    async testRobustness() {
        return {
            noiseResistance: await this.evaluateNoiseResistance(),
            edgeCases: await this.testEdgeCases(),
            adversarialExamples: await this.testAdversarialExamples(),
            stabilityScore: await this.calculateStability()
        };
    }

    async assessBias() {
        return {
            demographicParity: await this.checkDemographicParity(),
            equalOpportunity: await this.evaluateEqualOpportunity(),
            disparateImpact: await this.measureDisparateImpact(),
            recommendations: this.generateBiasRecommendations()
        };
    }
}`,
                        explanation: 'Model validation encompasses:\n1. Accuracy evaluation across multiple metrics\n2. Robustness testing against perturbations\n3. Bias assessment across demographic groups\n4. Performance measurement under various conditions',
                        concept: 'Model Validation Framework'
                    },
                    {
                        code: `class PerformanceTester {
    constructor() {
        this.benchmarks = new Map();
        this.metrics = new Set();
    }

    async evaluatePerformance(model) {
        const results = {
            speed: await this.measureSpeed(model),
            resources: await this.measureResourceUsage(model),
            scalability: await this.testScalability(model),
            reliability: await this.assessReliability(model)
        };

        return this.generatePerformanceReport(results);
    }

    async measureSpeed(model) {
        return {
            inferenceTime: await this.measureInferenceTime(model),
            throughput: await this.measureThroughput(model),
            latency: await this.measureLatency(model),
            optimization: this.suggestOptimizations()
        };
    }

    async measureResourceUsage(model) {
        return {
            memoryUsage: await this.trackMemoryUsage(model),
            cpuUtilization: await this.monitorCPUUsage(model),
            gpuUtilization: await this.monitorGPUUsage(model),
            efficiency: this.calculateEfficiencyMetrics()
        };
    }
}`,
                        explanation: 'Performance testing focuses on:\n1. Speed and latency measurement\n2. Resource utilization tracking\n3. Scalability assessment\n4. Reliability evaluation',
                        concept: 'Performance Evaluation'
                    }
                ],
                learningObjectives: [
                    'Master model validation techniques and metrics',
                    'Learn comprehensive performance testing methodologies',
                    'Understand bias assessment and mitigation strategies',
                    'Develop skills in generating detailed validation reports'
                ]
            },
            {
                title: 'Integration and System Testing',
                content: 'Methods for testing AI system components individually and as an integrated whole.',
                examples: [
                    {
                        code: `class IntegrationTester {
    constructor() {
        this.testCases = new Map();
        this.components = new Set();
    }

    async runIntegrationTests() {
        const results = {
            unitTests: await this.runUnitTests(),
            componentTests: await this.testComponents(),
            systemTests: await this.testSystemIntegration(),
            endToEnd: await this.runEndToEndTests()
        };

        return this.generateTestReport(results);
    }

    async testComponents() {
        return {
            interfaceTests: await this.testInterfaces(),
            dataFlowTests: await this.verifyDataFlow(),
            errorHandling: await this.testErrorHandling(),
            performance: await this.measureIntegrationPerformance()
        };
    }

    async testSystemIntegration() {
        return {
            systemBehavior: await this.verifySystemBehavior(),
            interactions: await this.testComponentInteractions(),
            stability: await this.assessSystemStability(),
            recovery: await this.testSystemRecovery()
        };
    }
}`,
                        explanation: 'Integration testing involves:\n1. Component interface testing\n2. System-wide integration verification\n3. End-to-end testing\n4. Error handling validation',
                        concept: 'Integration Testing'
                    },
                    {
                        code: `class SecurityTester {
    constructor() {
        this.vulnerabilities = new Set();
        this.securityChecks = new Map();
    }

    async performSecurityAudit() {
        const results = {
            vulnerabilityScans: await this.scanVulnerabilities(),
            penetrationTests: await this.conductPenetrationTests(),
            securityControls: await this.validateSecurityControls(),
            compliance: await this.checkCompliance()
        };

        return this.generateSecurityReport(results);
    }

    async scanVulnerabilities() {
        return {
            dataLeaks: await this.checkDataLeaks(),
            modelExploits: await this.identifyModelExploits(),
            systemVulnerabilities: await this.findSystemVulnerabilities(),
            recommendations: this.generateSecurityRecommendations()
        };
    }

    async validateSecurityControls() {
        return {
            authentication: await this.testAuthentication(),
            authorization: await this.testAuthorization(),
            encryption: await this.verifyEncryption(),
            monitoring: await this.validateMonitoring()
        };
    }
}`,
                        explanation: 'Security testing encompasses:\n1. Vulnerability assessment\n2. Penetration testing\n3. Security control validation\n4. Compliance verification',
                        concept: 'Security Testing'
                    }
                ],
                learningObjectives: [
                    'Master integration testing methodologies',
                    'Learn security testing techniques',
                    'Understand system-wide testing approaches',
                    'Develop skills in comprehensive test reporting'
                ]
            },
            {
                title: 'Stress Testing and Acceptance',
                content: 'Techniques for stress testing AI systems and validating them against business requirements.',
                examples: [
                    {
                        code: `class StressTester {
    constructor() {
        this.loadProfiles = new Map();
        this.metrics = new Set();
    }

    async performStressTest() {
        const results = {
            loadTesting: await this.conductLoadTesting(),
            stressConditions: await this.simulateStressConditions(),
            scalability: await this.testScalability(),
            stability: await this.assessStability()
        };

        return this.generateStressTestReport(results);
    }

    async conductLoadTesting() {
        return {
            concurrentUsers: await this.testConcurrentUsers(),
            dataVolume: await this.testDataVolume(),
            requestRate: await this.measureRequestRate(),
            responseTime: await this.trackResponseTime()
        };
    }

    async simulateStressConditions() {
        return {
            extremeLoad: await this.testExtremeLoad(),
            resourceExhaustion: await this.simulateResourceExhaustion(),
            networkConditions: await this.testNetworkConditions(),
            recovery: await this.testRecoveryTime()
        };
    }
}`,
                        explanation: 'Stress testing involves:\n1. Load testing under normal conditions\n2. Testing under extreme conditions\n3. Scalability assessment\n4. Recovery time measurement',
                        concept: 'Stress Testing'
                    },
                    {
                        code: `class AcceptanceTester {
    constructor() {
        this.requirements = new Map();
        this.acceptanceCriteria = new Set();
    }

    async conductAcceptanceTests() {
        const results = {
            functionalTests: await this.testFunctionality(),
            userAcceptance: await this.conductUserAcceptance(),
            businessRules: await this.validateBusinessRules(),
            performance: await this.verifyPerformance()
        };

        return this.generateAcceptanceReport(results);
    }

    async testFunctionality() {
        return {
            features: await this.validateFeatures(),
            workflows: await this.testWorkflows(),
            integration: await this.verifyIntegration(),
            usability: await this.assessUsability()
        };
    }

    async validateBusinessRules() {
        return {
            requirements: await this.checkRequirements(),
            compliance: await this.verifyCompliance(),
            accuracy: await this.validateAccuracy(),
            reliability: await this.assessReliability()
        };
    }
}`,
                        explanation: 'Acceptance testing focuses on:\n1. Functional requirement validation\n2. User acceptance testing\n3. Business rule verification\n4. Performance criteria validation',
                        concept: 'Acceptance Testing'
                    }
                ],
                learningObjectives: [
                    'Master stress testing methodologies',
                    'Learn acceptance testing techniques',
                    'Understand business requirement validation',
                    'Develop skills in comprehensive test reporting'
                ]
            }
        ]
    }
},
            {
                id: 23,
                title: 'AI Project Management',
    content: {
        introduction: 'A comprehensive guide to managing AI projects effectively, covering agile methodologies, risk management, and stakeholder engagement. This module explores both traditional project management principles and specialized approaches for AI development.',
        sections: [
            {
                title: 'Project Planning and Roadmapping',
                content: 'Core methodologies for planning AI projects, including sprint planning, milestone definition, and roadmap creation.',
                examples: [
                    {
                        code: `class AIProjectRoadmap {
    constructor() {
        this.milestones = new Map();
        this.dependencies = new Map();
        this.risks = new Set();
    }

    createProjectTimeline(projectScope) {
        const timeline = {
            dataPreparation: this.planDataPhase(projectScope),
            modelDevelopment: this.planModelPhase(projectScope),
            testing: this.planTestingPhase(projectScope),
            deployment: this.planDeploymentPhase(projectScope)
        };

        this.validateTimeline(timeline);
        return this.generateRoadmap(timeline);
    }

    planSprintCycle(sprintGoals) {
        return {
            planning: this.defineSprintScope(sprintGoals),
            execution: this.allocateResources(sprintGoals),
            review: this.defineReviewCriteria(sprintGoals),
            retrospective: this.setupRetrospective(sprintGoals)
        };
    }

    trackProgress(milestone) {
        return {
            completedTasks: this.getCompletedTasks(milestone),
            blockers: this.identifyBlockers(milestone),
            risks: this.assessRisks(milestone),
            adjustments: this.recommendAdjustments(milestone)
        };
    }
}`,
                        explanation: 'Project planning in AI development requires specialized approaches for:\n1. Creating detailed project timelines\n2. Planning sprint cycles\n3. Tracking progress against milestones\n4. Managing dependencies and risks',
                        concept: 'AI Project Planning'
                    },
                    {
                        code: `class AgileAIManagement {
    constructor() {
        this.sprints = [];
        this.backlog = new PriorityQueue();
    }

    planSprint() {
        const sprint = {
            tasks: this.prioritizeTasks(),
            resources: this.allocateResources(),
            timeline: this.defineTimeline(),
            deliverables: this.defineDeliverables()
        };

        this.sprints.push(sprint);
        return this.generateSprintPlan(sprint);
    }

    manageBacklog() {
        return {
            highPriority: this.backlog.getHighPriorityItems(),
            dependencies: this.analyzeDependencies(),
            estimates: this.generateEstimates(),
            constraints: this.identifyConstraints()
        };
    }

    conductRetrospective(sprint) {
        return {
            achievements: this.analyzeAchievements(sprint),
            challenges: this.identifyChallenges(sprint),
            learnings: this.documentLearnings(sprint),
            improvements: this.proposeImprovements(sprint)
        };
    }
}`,
                        explanation: 'Agile methodology in AI projects focuses on:\n1. Flexible sprint planning\n2. Backlog management\n3. Regular retrospectives\n4. Continuous improvement',
                        concept: 'Agile AI Development'
                    }
                ],
                learningObjectives: [
                    'Master AI project roadmap creation and management',
                    'Learn effective sprint planning techniques for AI development',
                    'Understand milestone tracking and progress measurement',
                    'Develop skills in agile project management for AI'
                ]
            },
            {
                title: 'Stakeholder and Resource Management',
                content: 'Techniques for managing stakeholder relationships and allocating resources effectively in AI projects.',
                examples: [
                    {
                        code: `class StakeholderManager {
    constructor() {
        this.stakeholders = new Map();
        this.communications = new Map();
    }

    manageStakeholders() {
        return {
            engagement: this.planEngagement(),
            communication: this.establishCommunication(),
            expectations: this.manageExpectations(),
            feedback: this.collectFeedback()
        };
    }

    planEngagement() {
        return {
            stakeholderMap: this.createStakeholderMap(),
            engagementStrategy: this.developStrategy(),
            communicationPlan: this.createCommunicationPlan(),
            feedbackMechanism: this.establishFeedbackLoop()
        };
    }

    trackEngagement(stakeholder) {
        return {
            interactions: this.logInteractions(stakeholder),
            satisfaction: this.measureSatisfaction(stakeholder),
            concerns: this.trackConcerns(stakeholder),
            actions: this.planActions(stakeholder)
        };
    }
}`,
                        explanation: 'Stakeholder management in AI projects involves:\n1. Identifying and mapping stakeholders\n2. Planning engagement strategies\n3. Managing communications\n4. Tracking stakeholder satisfaction',
                        concept: 'Stakeholder Management'
                    },
                    {
                        code: `class ResourceAllocation {
    constructor() {
        this.resources = new Map();
        this.allocations = new Map();
    }

    allocateResources(project) {
        return {
            computing: this.allocateComputing(project),
            personnel: this.allocatePersonnel(project),
            data: this.allocateData(project),
            budget: this.allocateBudget(project)
        };
    }

    monitorUtilization() {
        return {
            usage: this.trackResourceUsage(),
            efficiency: this.measureEfficiency(),
            bottlenecks: this.identifyBottlenecks(),
            recommendations: this.makeRecommendations()
        };
    }

    optimizeAllocation() {
        return {
            reallocation: this.planReallocation(),
            improvements: this.identifyImprovements(),
            savings: this.calculateSavings(),
            timeline: this.adjustTimeline()
        };
    }
}`,
                        explanation: 'Resource allocation in AI projects focuses on:\n1. Managing computational resources\n2. Allocating personnel effectively\n3. Monitoring resource utilization\n4. Optimizing resource distribution',
                        concept: 'Resource Management'
                    }
                ],
                learningObjectives: [
                    'Master stakeholder management techniques',
                    'Learn effective resource allocation strategies',
                    'Understand resource optimization methods',
                    'Develop skills in stakeholder communication'
                ]
            },
            {
                title: 'Risk and Change Management',
                content: 'Strategies for managing risks and implementing changes in AI projects.',
                examples: [
                    {
                        code: `class RiskManager {
    constructor() {
        this.risks = new Map();
        this.mitigations = new Map();
    }

    assessProjectRisks() {
        return {
            technical: this.assessTechnicalRisks(),
            operational: this.assessOperationalRisks(),
            business: this.assessBusinessRisks(),
            compliance: this.assessComplianceRisks()
        };
    }

    implementMitigations(risks) {
        return {
            strategies: this.developStrategies(risks),
            actions: this.defineActions(risks),
            monitoring: this.setupMonitoring(risks),
            contingencies: this.planContingencies(risks)
        };
    }

    monitorRisks() {
        return {
            status: this.trackRiskStatus(),
            trends: this.analyzeTrends(),
            effectiveness: this.evaluateMitigations(),
            updates: this.updateRiskProfile()
        };
    }
}`,
                        explanation: 'Risk management in AI projects includes:\n1. Comprehensive risk assessment\n2. Mitigation strategy development\n3. Continuous risk monitoring\n4. Contingency planning',
                        concept: 'Risk Management'
                    },
                    {
                        code: `class ChangeManager {
    constructor() {
        this.changes = new Map();
        this.impacts = new Map();
    }

    manageChange(change) {
        return {
            assessment: this.assessImpact(change),
            planning: this.planImplementation(change),
            execution: this.executeChange(change),
            review: this.reviewOutcome(change)
        };
    }

    documentChange(change) {
        return {
            details: this.recordDetails(change),
            approvals: this.trackApprovals(change),
            implementation: this.documentImplementation(change),
            lessons: this.captureLessons(change)
        };
    }

    communicateChange(change) {
        return {
            stakeholders: this.identifyAudience(change),
            message: this.craftMessage(change),
            timeline: this.communicateTimeline(change),
            support: this.provideSupportInfo(change)
        };
    }
}`,
                        explanation: 'Change management in AI projects focuses on:\n1. Impact assessment\n2. Implementation planning\n3. Documentation\n4. Communication strategy',
                        concept: 'Change Management'
                    }
                ],
                learningObjectives: [
                    'Master risk assessment and mitigation techniques',
                    'Learn effective change management strategies',
                    'Understand documentation and communication methods',
                    'Develop skills in managing project transitions'
                ]
            }
        ]
    }
},
            {
                id: 24,
                title: 'AI UX & Human-AI Interaction',
    content: {
        introduction: 'A comprehensive exploration of designing user experiences for AI systems, focusing on human-centered design principles, interaction patterns, and best practices for creating intuitive and accessible AI interfaces. This module covers fundamental concepts through advanced implementation strategies.',
        sections: [
            {
                title: 'AI UX Fundamentals',
                content: 'Core concepts and principles of designing user experiences for AI systems, with emphasis on human-centered design and user interaction patterns.',
                examples: [
                    {
                        code: `class AISystemFeedback {
    constructor() {
        this.confidenceThreshold = 0.85;
        this.userFeedbackHistory = new Map();
    }

    assessConfidence(prediction, actualData) {
        const confidence = this.calculateConfidence(prediction, actualData);
        return {
            prediction,
            confidence,
            shouldShowUncertainty: confidence < this.confidenceThreshold,
            explanatoryFactors: this.getExplanatoryFactors(prediction)
        };
    }

    presentUncertainty(result) {
        if (result.shouldShowUncertainty) {
            return {
                mainPrediction: result.prediction,
                confidenceLevel: Math.round(result.confidence * 100) + '%',
                alternativeOptions: this.generateAlternatives(result),
                userGuidance: this.generateGuidance(result)
            };
        }
        return result.prediction;
    }

    calculateConfidence(prediction, actualData) {
        // Implementation of confidence calculation
        return 0.9; // Placeholder
    }

    getExplanatoryFactors(prediction) {
        return [
            'Input data quality',
            'Historical accuracy',
            'Similar case outcomes'
        ];
    }
}`,
                        explanation: 'AI UX fundamentals focus on transparently communicating system confidence and uncertainty to users. This implementation demonstrates how to:\n1. Assess and communicate AI system confidence\n2. Present uncertainty in an understandable way\n3. Provide explanatory factors for predictions\n4. Generate appropriate user guidance',
                        concept: 'AI System Transparency'
                    },
                    {
                        code: `class UserInteractionTracker {
    constructor() {
        this.interactions = [];
        this.feedbackPatterns = new Map();
    }

    trackInteraction(userId, interactionType, context) {
        const interaction = {
            userId,
            timestamp: new Date(),
            type: interactionType,
            context,
            sessionData: this.getCurrentSessionData()
        };
        
        this.interactions.push(interaction);
        this.analyzeFeedbackPattern(interaction);
        return this.generateAdaptiveResponse(interaction);
    }

    analyzeFeedbackPattern(interaction) {
        const userPatterns = this.feedbackPatterns.get(interaction.userId) || [];
        userPatterns.push({
            type: interaction.type,
            timestamp: interaction.timestamp
        });
        
        this.feedbackPatterns.set(interaction.userId, userPatterns);
        return this.detectPatternChanges(userPatterns);
    }

    generateAdaptiveResponse(interaction) {
        const patterns = this.feedbackPatterns.get(interaction.userId);
        return {
            responseType: this.determineOptimalResponse(patterns),
            adaptiveElements: this.getAdaptiveElements(patterns),
            userPreferences: this.extractPreferences(patterns)
        };
    }
}`,
                        explanation: 'User interaction tracking and analysis are crucial for creating adaptive AI interfaces. This system:\n1. Tracks user interactions and feedback\n2. Analyzes interaction patterns over time\n3. Generates adaptive responses based on user behavior\n4. Maintains user interaction history for personalization',
                        concept: 'User Interaction Analysis'
                    }
                ],
                learningObjectives: [
                    'Understand core principles of AI UX design and their importance',
                    'Master techniques for communicating AI system confidence and uncertainty',
                    'Learn to implement effective user interaction tracking systems',
                    'Develop skills in creating adaptive AI interfaces'
                ]
            },
            {
                title: 'AI Accessibility and Personalization',
                content: 'Advanced techniques for making AI systems accessible to diverse users and implementing personalization features.',
                examples: [
                    {
                        code: `class AIAccessibilityManager {
    constructor() {
        this.accessibilityProfiles = new Map();
        this.adaptationRules = new Set();
    }

    createAccessibilityProfile(userId, requirements) {
        const profile = {
            userId,
            visualAdaptations: this.determineVisualAdaptations(requirements),
            audioAdaptations: this.determineAudioAdaptations(requirements),
            interactionAdaptations: this.determineInteractionAdaptations(requirements),
            cognitiveSupports: this.determineCognitiveSupports(requirements)
        };
        
        this.accessibilityProfiles.set(userId, profile);
        return this.generateAccessibleInterface(profile);
    }

    generateAccessibleInterface(profile) {
        return {
            interfaceElements: this.adaptInterfaceElements(profile),
            interactionModes: this.determineInteractionModes(profile),
            feedbackMethods: this.configureFeedbackMethods(profile),
            supportFeatures: this.enableSupportFeatures(profile)
        };
    }

    adaptInterfaceElements(profile) {
        // Implementation of interface adaptation
        return {
            visualElements: this.adaptVisualElements(profile.visualAdaptations),
            audioElements: this.adaptAudioElements(profile.audioAdaptations),
            interactionElements: this.adaptInteractionElements(profile.interactionAdaptations)
        };
    }
}`,
                        explanation: 'AI accessibility management ensures systems are usable by people with different abilities through:\n1. Creating and managing accessibility profiles\n2. Adapting interface elements for different needs\n3. Supporting multiple interaction modes\n4. Implementing cognitive support features',
                        concept: 'AI Accessibility Implementation'
                    },
                    {
                        code: `class AIPersonalizationEngine {
    constructor() {
        this.userPreferences = new Map();
        this.learningModels = new Map();
    }

    updateUserModel(userId, interaction) {
        const currentModel = this.learningModels.get(userId) || this.initializeUserModel();
        const updatedModel = this.incorporateNewInteraction(currentModel, interaction);
        
        this.learningModels.set(userId, updatedModel);
        return this.generatePersonalizedExperience(updatedModel);
    }

    generatePersonalizedExperience(userModel) {
        return {
            interfaceCustomization: this.customizeInterface(userModel),
            contentAdaptation: this.adaptContent(userModel),
            interactionPatterns: this.optimizeInteractions(userModel),
            assistiveFeatures: this.configureAssistance(userModel)
        };
    }

    incorporateNewInteraction(model, interaction) {
        // Implementation of model updating
        return {
            preferences: this.updatePreferences(model.preferences, interaction),
            behaviors: this.updateBehaviors(model.behaviors, interaction),
            needs: this.updateNeeds(model.needs, interaction)
        };
    }
}`,
                        explanation: 'AI personalization engines create tailored user experiences through:\n1. Building and updating user models\n2. Generating personalized interfaces\n3. Adapting content and interactions\n4. Learning from user behavior',
                        concept: 'AI Personalization Systems'
                    }
                ],
                learningObjectives: [
                    'Master techniques for implementing AI accessibility features',
                    'Learn to create effective personalization systems',
                    'Understand how to adapt AI interfaces for different user needs',
                    'Develop skills in building adaptive learning models'
                ]
            },
            {
                title: 'Error Handling and User Testing',
                content: 'Comprehensive approaches to managing AI system errors and conducting effective usability testing.',
                examples: [
                    {
                        code: `class AIErrorHandler {
    constructor() {
        this.errorPatterns = new Map();
        this.recoveryStrategies = new Map();
    }

    handleError(error, context) {
        const analysis = this.analyzeError(error, context);
        const strategy = this.determineStrategy(analysis);
        
        this.updateErrorPatterns(analysis);
        return this.implementRecovery(strategy, context);
    }

    analyzeError(error, context) {
        return {
            type: this.classifyError(error),
            severity: this.assessSeverity(error, context),
            impact: this.assessUserImpact(error, context),
            recoveryOptions: this.identifyRecoveryOptions(error)
        };
    }

    implementRecovery(strategy, context) {
        return {
            userMessage: this.generateUserMessage(strategy),
            recoverySteps: this.generateRecoverySteps(strategy),
            alternativeOptions: this.provideAlternatives(strategy),
            preventiveMeasures: this.implementPreventiveMeasures(strategy)
        };
    }
}`,
                        explanation: 'AI error handling systems manage and communicate errors effectively through:\n1. Error analysis and classification\n2. Strategy determination\n3. Recovery implementation\n4. User communication',
                        concept: 'AI Error Management'
                    },
                    {
                        code: `class AIUsabilityTester {
    constructor() {
        this.testScenarios = new Map();
        this.userMetrics = new Map();
    }

    conductUsabilityTest(userId, scenario) {
        const test = this.initializeTest(userId, scenario);
        return this.monitorAndRecord(test);
    }

    monitorAndRecord(test) {
        return {
            userActions: this.trackUserActions(test),
            systemResponses: this.recordSystemResponses(test),
            metrics: this.calculateMetrics(test),
            insights: this.generateInsights(test)
        };
    }

    calculateMetrics(test) {
        return {
            taskCompletionRate: this.calculateCompletionRate(test),
            timeOnTask: this.calculateTimeOnTask(test),
            errorRate: this.calculateErrorRate(test),
            userSatisfaction: this.calculateSatisfactionScore(test)
        };
    }

    generateInsights(test) {
        return {
            usabilityIssues: this.identifyIssues(test),
            improvementAreas: this.identifyImprovements(test),
            userFeedback: this.analyzeFeedback(test),
            recommendations: this.generateRecommendations(test)
        };
    }
}`,
                        explanation: 'AI usability testing systems evaluate system effectiveness through:\n1. Structured test scenarios\n2. User action monitoring\n3. Metric calculation\n4. Insight generation',
                        concept: 'AI Usability Testing'
                    }
                ],
                learningObjectives: [
                    'Master AI system error handling techniques',
                    'Learn to implement effective usability testing systems',
                    'Understand how to measure and improve AI system usability',
                    'Develop skills in generating actionable insights from user testing'
                ]
            }
        ]
    }
}
            
];