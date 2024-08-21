// Account.jsx
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardHeader, Text, Spinner } from '@fluentui/react-components';
import fetchAccount from '../services/account';

export default function Account() {
  const { id } = useParams();
  const [account, setAccount] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchAccount(id, setAccount, setLoading, setError);
  }, [id]);

  if (loading) {
    return <Spinner label="Loading account details..." />;
  }

  if (error) {
    return <Text variant="large" color="red">Error: {error.message}</Text>;
  }

  return (
    <Card>
      <CardHeader>
        <Text variant="large">Account Details</Text>
      </CardHeader>
      <>
        <Text><strong>ID:</strong> {account.id}</Text>
        <Text><strong>Email:</strong> {account.email}</Text>
        <Text><strong>Created:</strong> {new Date(account.created).toLocaleString()}</Text>
        <Text><strong>Updated:</strong> {new Date(account.updated).toLocaleString()}</Text>
      </>
    </Card>
  );
}