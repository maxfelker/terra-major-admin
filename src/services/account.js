const fetchAccount = async (id, setAccount, setLoading, setError) => {
    const VITE_API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
    try {
      const response = await fetch(`${VITE_API_BASE_URL}/accounts/${id}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setAccount(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching account:', error);
      setError(error);
      setLoading(false);
    } 
  };

  export default fetchAccount;