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
    async function loadAccounts() {
      try {
        setLoading(true);
        const accounts = await fetchAccounts();
        console.log(accounts);
        setAccounts(accounts);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    }
    loadAccounts();
  }, []);

  if (loading) {
    return <Spinner label="Loading accounts..." />;
  }

  if (!accounts.length) {
    return <p>No accounts found.</p>;
  }

  const columns = [
    createTableColumn({
      columnId: 'email',
      renderHeaderCell: () => 'Email',
      renderCell: (item) => item.email,
    }),
    createTableColumn({
      columnId: 'created',
      renderHeaderCell: () => 'Created',
      renderCell: (item) => new Date(item.created).toLocaleString(),
    })
  ];

  function handleRowClick(id) {
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