import { useState, useEffect } from 'react';
import {
  DataGrid,
  DataGridHeader,
  DataGridRow,
  DataGridCell,
  DataGridBody,
  DataGridHeaderCell,
  createTableColumn,
  Spinner
} from '@fluentui/react-components';

import fetchAccounts from '../services/accounts';

function AccountsList() {

  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAccounts(setAccounts, setLoading);
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