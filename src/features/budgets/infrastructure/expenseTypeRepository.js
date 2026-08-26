import { authHeaders, httpClient } from "../../../shared/infrastructure/httpClient";

export async function getExpenseTypes(token) {
    const headers = authHeaders(token); 
    
    try {
        return await httpClient('/expense-type/', { headers });
    } catch(err) {
        throw err;
    }
}