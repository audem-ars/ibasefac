// src/routes/regulationRoutes.js

import AIRegulationsList from '../components/regulations/AIRegulationsList';
import PracticalGuidelines from '../components/regulations/PracticalGuidelines';
import GuidelineDetail from '../components/regulations/GuidelineDetail';
import GuidelinesOverview from '../components/regulations/GuidelinesOverview';
import AIRegulationsDetail from '../components/regulations/AIRegulationsDetail';
import AIRegulationsStart from '../components/regulations/AIRegulationsStart';
import RegulationDetail from '../components/regulations/RegulationDetail';
import CurrentRegulations from '../components/regulations/CurrentRegulations';
import CaseStudies from '../components/regulations/CaseStudies';
import CaseStudyDetail from '../components/regulations/CaseStudyDetail';
import CommunityFeatures from '../components/regulations/CommunityFeatures';
import CommunityDetail from '../components/regulations/CommunityDetail';

export const regulationRoutes = [
    {
        path: "/regulations",
        element: AIRegulationsList
    },
    {
        path: "/regulations/current",
        element: CurrentRegulations
    },
    {
        path: "/regulations/guidelines",
        element: PracticalGuidelines
    },
    {
        path: "/regulations/guidelines/overview",
        element: GuidelinesOverview
    },
    {
        path: "/regulations/guidelines/:guidelineId",
        element: GuidelineDetail
    },
    {
        path: "/regulations/:regulationId/details",
        element: RegulationDetail
    },
    {
        path: "/regulations/:regulationId",
        element: AIRegulationsDetail
    },
    {
        path: "/regulations/:topicId/start",
        element: AIRegulationsStart
    },
    {
        path: "/regulations/case-studies",
        element: CaseStudies
    },
    {
        path: "/regulations/case-studies/:caseStudyId",
        element: CaseStudyDetail
    },
    // New community routes
    {
        path: "/regulations/community",
        element: CommunityFeatures
    },
    {
        path: "/regulations/community/:topicId",
        element: CommunityDetail
    }
];