export class dashboardmodel {
    constructor(data) {
        this.overallmetrics = data.overallmetrics;
        this.performancemetrics = data.performancemetrics;
        this.transformationmetrics = data.transformationmetrics;
        this.enterprisemetrics = data.enterprisemetrics;
    }

    static fromapi(data) {
        return new dashboardmodel({
            overallmetrics: {
                totalstudents: data.totalstudents || 0,
                averagecompletion: data.averagecompletion || 0,
                studentengagement: data.studentengagement || 0,
                retentionrate: data.retentionrate || 0
            },
            performancemetrics: data.performancemetrics || {},
            transformationmetrics: data.transformationmetrics || {},
            enterprisemetrics: data.enterprisemetrics || {}
        });
    }
}
