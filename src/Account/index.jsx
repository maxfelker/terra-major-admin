// Account.jsx
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardHeader, Text, Spinner } from '@fluentui/react-components';
import { fetchAccount } from '../services/accounts';
import styles from './styles.module.css';

export default function Account() {
  const { id } = useParams();
  const [account, setAccount] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true; // Track if the component is still mounted
    const loadAccount = async () => {
      setLoading(true);
      try {
        const account = await fetchAccount(id);
        if (isMounted) {
          setAccount(account);
        }
      } catch (error) {
        if (isMounted) {
          setError(error);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };
    loadAccount();
    return () => {
      isMounted = false; // Cleanup function to set isMounted to false
    };
  }, [id]);

  function displayDateString(date) {
      return new Date(date).toLocaleString() || '';
  }

  if (loading) {
    return <Spinner label="Loading account details..." />;
  }

  if (error) {
    return <Text variant="large" color="red">Error: {error.message}</Text>;
  }

  return (
    <>
      <h1>Account Details</h1>
      <Card>
        <Text><strong>ID:</strong> {account.id}</Text>
        <Text><strong>Email:</strong> {account.email}</Text>
        <Text><strong>Created:</strong> {displayDateString(account.created)}</Text>
        <Text><strong>Updated:</strong> {displayDateString(account.updated)}</Text>
      </Card>
      <Card className={styles.secondaryCard}>
        <CardHeader>Account Sandboxes</CardHeader>
          {account.sandboxes && account.sandboxes.length > 0 ? (
            <>
              <CardHeader>Account Sandboxes</CardHeader>
              {account.sandboxes.map((sandbox) => (
                <Text key={sandbox.id}>{sandbox.name}</Text>
              ))}
            </>
          ) : (
            <Text className={styles.secondaryCardText}>No sandboxes found for this account.</Text>
          )}
      </Card>
    </>
  );
}