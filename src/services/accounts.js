function getBaseUrl() {    
    return import.meta.env.VITE_API_BASE_URL;
}

export async function fetchAccounts() {
    try {
        const url = `${getBaseUrl()}/accounts`;
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        return await response.json();
    } catch (error) {
        throw new Error(error);
    }
}

export async function fetchAccount(id) {
    try {
        const url = `${getBaseUrl()}/accounts/${id}`;
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        return await response.json();
    } catch (error) {
        throw error;
    }
};