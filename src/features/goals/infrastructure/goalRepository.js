import { authHeaders, httpClient } from "../../../shared/infrastructure/httpClient";

export async function getGoals(userId, token) {
    const headers = authHeaders(token);

    try {
        return await httpClient('/goal/', {headers});
    } catch(error) {
        if (error.status && error.status !== 404) {
            throw error;
        }
    }
}

export async function createGoal(token, goal) {
    const headers = authHeaders(token);

    try {
        return await httpClient('/goal/', {
            method: 'POST',
            headers,
            body: JSON.stringify(goal),
        });
    } catch(error) {
        if (error.status && error.status !== 404) {
            throw error;
        }
    }
}