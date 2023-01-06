import { useState, useEffect } from 'react';
import {
  Panel,
  FlexboxGrid,
  Loader,
  ButtonToolbar,
  Notification,
  Placeholder,
  useToaster,
} from 'rsuite';
import { TransactionItem } from '../../../services/types';

import { Table, Button } from 'rsuite';
import { TransactionsApiClientImpl } from '../../../services/TransactionsApi';
import { toast } from 'aws-amplify';
import { MessageType } from 'rsuite/esm/Notification/Notification';
export interface ImportTransactionsFormProps {
  transactions: TransactionItem[];
}
export const ImportTransactionsForm = ({
  transactions,
}: ImportTransactionsFormProps) => {
  const [isLoading, setLoading] = useState(false);

  const { Column, HeaderCell, Cell } = Table;

  const transactionsClient = new TransactionsApiClientImpl();

  const toaster = useToaster();

  const message = (text: string, messageType: MessageType) => {
    return (
      <Notification type={messageType} header={messageType} closable>
        <div>{text}</div>
      </Notification>
    );
  };

  const saveTransactions = async () => {
    try {
      setLoading(true);
      await transactionsClient.saveTransactions(transactions);
      toaster.push(message('Transactions saved', 'success'), {
        placement: 'topCenter',
      });
    } catch (e) {
      toaster.push(message('Failed to save transactions', 'error'), {
        placement: 'topCenter',
      });
    }
    setLoading(false);
  };

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
              <Button
                type="submit"
                appearance="primary"
                disabled={isLoading}
                onClick={saveTransactions}
              >
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
