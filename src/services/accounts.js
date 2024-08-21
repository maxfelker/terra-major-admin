
const fetchAccounts = async (setAccounts, setLoading) => {
    const VITE_API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
    try {
      const response = await fetch(`${VITE_API_BASE_URL}/accounts`);
      const data = await response.json();
      setAccounts(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching accounts:', error);
      setLoading(false);
    }
}

export default fetchAccounts;