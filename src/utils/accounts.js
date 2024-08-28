import { fetchAccount, fetchAccounts } from "../services/accounts";

export async function loadAccount(id, setLoading, setAccount, setError) {
    setLoading(true);
    try {
        const account = await fetchAccount(id);
        setAccount(account);
    } catch (error) {
        setError(error);
    } finally {
        setLoading(false);
    }
};

export async function loadAccounts(setLoading, setAccounts, setError) {
    setLoading(true);
    try {
        const accounts = await fetchAccounts();
        setAccounts(accounts);
    } catch (error) {
        setError(error);
    } finally {
        setLoading(false);
    }
};