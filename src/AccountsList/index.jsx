import { useState, useEffect } from 'react';
import {
  DataGrid,
  DataGridHeader,
  DataGridRow,
  DataGridCell,
  DataGridBody,
  DataGridHeaderCell,
  createTableColumn,
} from '@fluentui/react-components';

function AccountsList() {
  const [accounts, setAccounts] = useState([]);

  useEffect(() => {
    const { VITE_API_BASE_URL } = import.meta.env;
    const fetchAccounts = async () => {
      try {
        const response = await fetch(`${VITE_API_BASE_URL}/accounts`);
        const data = await response.json();
        setAccounts(data);
      } catch (error) {
        console.error('Error fetching accounts:', error);
      }
    };

    fetchAccounts();
  }, []);

  if (!accounts.length) {
    return <p>Loading...</p>;
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

  return (
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
          <DataGridRow key={rowId}>
            {({ renderCell }) => (
              <DataGridCell>{renderCell(item)}</DataGridCell>
            )}
          </DataGridRow>
        )}
      </DataGridBody>
    </DataGrid>
  );
}

export default AccountsList;