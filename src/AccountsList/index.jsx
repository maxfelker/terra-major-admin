import { useState, useEffect } from 'react';
import {
  DataGrid,
  DataGridHeader,
  DataGridRow,
  DataGridCell,
  DataGridBody,
  DataGridHeaderCell,
  createTableColumn,
  Spinner,
  Text
} from '@fluentui/react-components';
import { useNavigate } from 'react-router-dom';
import { fetchAccounts } from '../services/accounts';

export default function AccountsList() {
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const navigate = useNavigate();

  useEffect(() => {
    let isMounted = true; // Track if the component is still mounted
    const loadAccounts = async () => {
      setLoading(true);
      try {
        const account = await fetchAccounts();
        if (isMounted) {
          setAccounts(account);
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
    loadAccounts();
    return () => {
      isMounted = false; // Cleanup function to set isMounted to false
    };
  }, []);

  if (loading) {
    return <Spinner label="Loading accounts..." />;
  }

  if (!accounts.length) {
    return <p>No accounts found.</p>;
  }

  const columns = [
    createTableColumn({
      columnId: 'id',
      renderHeaderCell: () => 'Account ID',
      renderCell: (item) => item.id,
    }),
    createTableColumn({
      columnId: 'email',
      renderHeaderCell: () => 'Email',
      renderCell: (item) => item.email,
    }),
    createTableColumn({
      columnId: 'created',
      renderHeaderCell: () => 'Created',
      renderCell: (item) => new Date(item.created).toLocaleString(),
    }),
    createTableColumn({
      columnId: 'updated',
      renderHeaderCell: () => 'Updated',
      renderCell: (item) => new Date(item.updated).toLocaleString(),
    }),
  ];

  const handleRowClick = (id) => {
    navigate(`/accounts/${id}`);
  };

  if (error) {
    return <Text variant="large" color="red">Error: {error.message}</Text>;
  }

  return (
    <>
      <h1>Accounts</h1>
      <DataGrid
        items={accounts}
        columns={columns}
        getRowId={(item) => item.id}
      >
        
        <DataGridHeader>
          <DataGridRow>
            {({ renderHeaderCell }) => (
              <DataGridHeaderCell>{renderHeaderCell()}</DataGridHeaderCell>
            )}
          </DataGridRow>
        </DataGridHeader>
        <DataGridBody>
          {({ item, rowId }) => (
            <DataGridRow key={rowId} onClick={() => handleRowClick(item.id)}>
              {({ renderCell }) => (
                <DataGridCell>{renderCell(item)}</DataGridCell>
              )}
            </DataGridRow>
          )}
        </DataGridBody>
      </DataGrid>
    </>
  );
}