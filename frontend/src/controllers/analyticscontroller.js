class analyticscontroller {
    static async fetchlearningpatterns(userid) {
        try {
            const response = await fetch(`/api/analytics/patterns/${userid}`);
            return await response.json();
        } catch (error) {
            console.error('Error fetching learning patterns:', error);
            throw error;
        }
    }

    static async fetchinterventionmetrics(userid) {
        try {
            const response = await fetch(`/api/analytics/interventions/${userid}`);
            return await response.json();
        } catch (error) {
            console.error('Error fetching intervention metrics:', error);
            throw error;
        }
    }

    static async fetchpredictiveinsights(userid) {
        try {
            const response = await fetch(`/api/analytics/predictions/${userid}`);
            return await response.json();
        } catch (error) {
            console.error('Error fetching predictive insights:', error);
            throw error;
        }
    }
}