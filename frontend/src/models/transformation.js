export class transformationmodel {
    constructor(data) {
        this.breakthroughmetrics = data.breakthroughmetrics || {};
        this.valuemetrics = data.valuemetrics || {};
        this.transformationprogress = data.transformationprogress || {};
    }

    static fromapi(data) {
        return new transformationmodel({
            breakthroughmetrics: {
                score: data.breakthroughscore || 0,
                potential: data.breakthroughpotential || 0,
                accelerationopportunities: data.accelerationopportunities || []
            },
            valuemetrics: {
                currentvalue: data.currentvalue || 0,
                projectedvalue: data.projectedvalue || 0,
                optimizationpotential: data.optimizationpotential || 0
            },
            transformationprogress: {
                skillgrowth: data.skillgrowth || 0,
                mindsetshift: data.mindsetshift || 0,
                venturecreation: data.venturecreation || 0
            }
        });
    }
}