// Account.jsx
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardHeader, Text, Spinner } from '@fluentui/react-components';
import { loadAccount } from '../utils/accounts';
import './styles.css';

export default function Account() {
  const { id } = useParams();
  const [account, setAccount] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadAccount(id, setLoading, setAccount, setError);
  }, [id]);

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
        <Text><strong>Created:</strong> {new Date(account.created).toLocaleString()}</Text>
        <Text><strong>Updated:</strong> {new Date(account.updated).toLocaleString()}</Text>
      </Card>
      <Card className="secondary-card">
        <CardHeader>Account Sandboxes</CardHeader>
          {account.sandboxes && account.sandboxes.length > 0 ? (
            <>
              <CardHeader>Account Sandboxes</CardHeader>
              {account.sandboxes.map((sandbox) => (
                <Text key={sandbox.id}>{sandbox.name}</Text>
              ))}
            </>
          ) : (
            <Text className="secondary-card--text">No sandboxes found for this account.</Text>
          )}
      </Card>
    </>
  );
}