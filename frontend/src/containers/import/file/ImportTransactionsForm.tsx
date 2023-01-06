import { useState, useEffect } from 'react';
import { Panel, FlexboxGrid, Loader, ButtonToolbar } from 'rsuite';
import { TransactionItem } from '../../../services/types';

import { Table, Button } from 'rsuite';
export interface ImportTransactionsFormProps {
  transactions: TransactionItem[];
}
export const ImportTransactionsForm = ({
  transactions,
}: ImportTransactionsFormProps) => {
  const [isLoading, setLoading] = useState(false);

  const { Column, HeaderCell, Cell } = Table;

  const saveTransactions = () => {};
  const transactionsForm = () => {
    return (
      <FlexboxGrid justify="center">
        <FlexboxGrid.Item colspan={24}>
          <Panel header={<h3>Processed Transactions</h3>} bordered>
            <Table
              data={transactions}
              onRowClick={(rowData) => {
                console.log(rowData);
              }}
            >
              <Column width={60} align="center" fixed>
                <HeaderCell>Id</HeaderCell>
                <Cell dataKey="id" />
              </Column>

              <Column width={200}>
                <HeaderCell>Date</HeaderCell>
                <Cell dataKey="date" />
              </Column>

              <Column width={150}>
                <HeaderCell>Pair</HeaderCell>
                <Cell dataKey="pair" />
              </Column>

              <Column>
                <HeaderCell>Type</HeaderCell>
                <Cell dataKey="type" />
              </Column>

              <Column>
                <HeaderCell>Amount</HeaderCell>
                <Cell dataKey="amount" />
              </Column>

              <Column>
                <HeaderCell>Price</HeaderCell>
                <Cell dataKey="price" />
              </Column>

              <Column>
                <HeaderCell>Value</HeaderCell>
                <Cell dataKey="value" />
              </Column>
              <Column width={80} fixed="right">
                <HeaderCell>...</HeaderCell>

                <Cell style={{ padding: '6px' }}>
                  {(rowData) => (
                    <Button
                      appearance="link"
                      onClick={() => alert(`id:${rowData.id}`)}
                    >
                      Edit
                    </Button>
                  )}
                </Cell>
              </Column>
            </Table>
            <ButtonToolbar>
              <Button type="submit" appearance="primary" disabled={isLoading}>
                {isLoading && <Loader size="xs" />}Save transactions
              </Button>
            </ButtonToolbar>
          </Panel>
        </FlexboxGrid.Item>
      </FlexboxGrid>
    );
  };
  return transactions.length > 0 ? transactionsForm() : null;
};
