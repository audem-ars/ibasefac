export class analyticsmodel {
    constructor(data) {
        this.learningpatterns = data.learningpatterns || {};
        this.interventioneffectiveness = data.interventioneffectiveness || {};
        this.predictivemetrics = data.predictivemetrics || {};
    }

    static fromapi(data) {
        return new analyticsmodel({
            learningpatterns: {
                peaklearningtimes: data.peaklearningtimes || [],
                preferredcontenttypes: data.preferredcontenttypes || [],
                learningstyles: data.learningstyles || []
            },
            interventioneffectiveness: {
                interventiontypes: data.interventiontypes || [],
                recommendationsuccess: data.recommendationsuccess || {}
            },
            predictivemetrics: {
                atriskstudents: data.atriskstudents || [],
                successpredictions: data.successpredictions || []
            }
        });
    }
}