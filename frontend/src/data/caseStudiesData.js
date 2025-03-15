// src/data/caseStudiesData.js

export const caseStudiesData = {
    'healthcare-ai': {
        id: 'healthcare-ai',
        title: 'Healthcare AI Implementation',
        organization: 'Major US Hospital Network',
        timeline: '2022-2024',
        status: 'Completed',
        successRate: 92,
        category: 'Healthcare',
        impact: 'Reduced diagnosis time by 60%',
        description: 'Implementation of AI diagnostic tools in radiology department across 12 hospitals.',
        fullDescription: `This case study examines the successful implementation of AI diagnostic tools 
                        across a major US hospital network. The project spanned 24 months and involved 
                        integrating AI systems into existing radiology workflows across 12 hospitals.`,
        challenges: [
            'Data privacy compliance',
            'Staff training and adoption',
            'Integration with existing systems',
            'Performance validation'
        ],
        detailedChallenges: [
            {
                title: 'Data Privacy Compliance',
                description: 'Ensuring HIPAA compliance while training AI models',
                solutions: [
                    'Implemented secure data handling protocols',
                    'Developed anonymization pipelines',
                    'Established access control systems'
                ]
            },
            {
                title: 'Staff Training and Adoption',
                description: 'Training medical staff on new AI systems',
                solutions: [
                    'Created comprehensive training programs',
                    'Developed user-friendly interfaces',
                    'Provided ongoing support systems'
                ]
            },
            {
                title: 'System Integration',
                description: 'Integrating with existing hospital systems',
                solutions: [
                    'Built custom API interfaces',
                    'Developed fallback systems',
                    'Implemented gradual rollout'
                ]
            }
        ],
        outcomes: [
            'Reduced patient wait times by 45%',
            'Improved diagnostic accuracy by 28%',
            'Decreased radiologist workload by 35%',
            'Cost savings of $2.3M annually'
        ],
        lessons: [
            'Early stakeholder involvement is crucial',
            'Phased rollout reduces disruption',
            'Continuous training improves adoption',
            'Regular performance audits essential'
        ],
        metrics: [
            {
                label: 'Diagnosis Time Reduction',
                value: '60%',
                color: 'green'
            },
            {
                label: 'Accuracy Improvement',
                value: '28%',
                color: 'blue'
            },
            {
                label: 'Cost Reduction',
                value: '35%',
                color: 'purple'
            }
        ],
        implementationTimeline: [
            {
                title: 'Planning',
                duration: '3 months',
                items: [
                    'Stakeholder alignment',
                    'Requirements gathering',
                    'Vendor selection'
                ]
            },
            {
                title: 'Implementation',
                duration: '12 months',
                items: [
                    'System integration',
                    'Staff training',
                    'Pilot program'
                ]
            },
            {
                title: 'Optimization',
                duration: '9 months',
                items: [
                    'Performance tuning',
                    'Workflow refinement',
                    'Scale deployment'
                ]
            }
        ],
        documents: [
            {
                title: 'Implementation Guide',
                type: 'PDF',
                size: '2.8 MB'
            },
            {
                title: 'Technical Specifications',
                type: 'PDF',
                size: '1.5 MB'
            },
            {
                title: 'Training Materials',
                type: 'ZIP',
                size: '4.2 MB'
            }
        ]
    },
    'ai-myths': {
        id: 'ai-myths',
        title: 'OpenAI Transition Case Study',
        organization: 'Tech Industry Analysis',
        timeline: '2023-2024',
        status: 'Recent',
        category: 'Industry Analysis',
        impact: 'Major industry shift',
        description: 'Analysis of OpenAI\'s transition from non-profit to capped-profit model and its industry impact.',
        fullDescription: `Comprehensive analysis of OpenAI\'s organizational transformation and its implications 
                        for the AI industry. This case study examines the challenges and outcomes of balancing 
                        commercial interests with AI safety goals.`,
        challenges: [
            'Balancing profit with AI safety',
            'Maintaining transparency',
            'Stakeholder management',
            'Public perception'
        ],
        detailedChallenges: [
            {
                title: 'Balancing Interests',
                description: 'Managing commercial success while prioritizing AI safety',
                solutions: [
                    'Established clear governance structures',
                    'Created transparent decision frameworks',
                    'Implemented safety protocols'
                ]
            },
            {
                title: 'Stakeholder Communication',
                description: 'Maintaining clear communication with all stakeholders',
                solutions: [
                    'Regular public updates',
                    'Stakeholder consultation process',
                    'Transparent reporting mechanisms'
                ]
            }
        ],
        outcomes: [
            'Increased investment in AI safety',
            'New industry standards for AI governance',
            'Enhanced public discourse on AI ethics',
            'Improved corporate accountability models'
        ],
        lessons: [
            'Clear communication is essential',
            'Governance structure matters',
            'Balance profit with ethics',
            'Transparency builds trust'
        ],
        metrics: [
            {
                label: 'Safety Investment',
                value: '300%',
                color: 'green'
            },
            {
                label: 'Public Trust',
                value: '85%',
                color: 'blue'
            }
        ],
        implementationTimeline: [
            {
                title: 'Transition Planning',
                duration: '6 months',
                items: [
                    'Stakeholder consultation',
                    'Structure development',
                    'Policy creation'
                ]
            },
            {
                title: 'Implementation',
                duration: '8 months',
                items: [
                    'Governance changes',
                    'Policy rollout',
                    'Public communication'
                ]
            }
        ],
        documents: [
            {
                title: 'Transition Report',
                type: 'PDF',
                size: '3.2 MB'
            },
            {
                title: 'Governance Framework',
                type: 'PDF',
                size: '2.1 MB'
            }
        ]
    }
    // Add other case studies as needed
};