export async function fetchAccounts() {
    const VITE_API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
    try {
        const response = await fetch(`${VITE_API_BASE_URL}/accounts`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching accounts:', error);
        throw error;
    }
}

export async function fetchAccount(id) {
    const VITE_API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
    try {
        const response = await fetch(`${VITE_API_BASE_URL}/accounts/${id}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching account:', error);
        throw error;
    }
};