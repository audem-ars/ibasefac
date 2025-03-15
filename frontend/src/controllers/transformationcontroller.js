class transformationcontroller {
    static async fetchvaluemetrics(userid) {
        try {
            const response = await fetch(`/api/transformation/value/${userid}`);
            return await response.json();
        } catch (error) {
            console.error('Error fetching value metrics:', error);
            throw error;
        }
    }

    static async updatetransformationprogress(userid, metrics) {
        try {
            const response = await fetch(`/api/transformation/progress/${userid}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(metrics)
            });
            return await response.json();
        } catch (error) {
            console.error('Error updating transformation progress:', error);
            throw error;
        }
    }

    static async calculatebreakthroughpotential(userid) {
        try {
            const response = await fetch(`/api/transformation/breakthrough/potential/${userid}`);
            return await response.json();
        } catch (error) {
            console.error('Error calculating breakthrough potential:', error);
            throw error;
        }
    }
}

export { dashboardcontroller, analyticscontroller, transformationcontroller };