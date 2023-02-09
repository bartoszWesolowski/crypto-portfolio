import { Panel, FlexboxGrid, useToaster, Loader } from 'rsuite';
import { TransactionItem } from '../../../services/types';

import { Table, Button } from 'rsuite';
import { TransactionsApiClientImpl } from '../../../services/TransactionsApi';
import { useEffect, useState } from 'react';
import Notification, {
  MessageType,
} from 'rsuite/esm/Notification/Notification';

export const TransactionList = () => {
  const [isLoading, setLoading] = useState(false);

  const transactionsClient = new TransactionsApiClientImpl();

  const toaster = useToaster();

  const [transactions, setTransactions] = useState([] as TransactionItem[]);

  const message = (text: string, messageType: MessageType) => {
    return (
      <Notification type={messageType} header={messageType} closable>
        <div>{text}</div>
      </Notification>
    );
  };

  const { Column, HeaderCell, Cell } = Table;

  const getTransactions = async () => {
    try {
      setLoading(true);
      const response = await transactionsClient.getTransactions();
      setTransactions(response.transactions);
    } catch (e) {
      toaster.push(message('Failed to save transactions', 'error'), {
        placement: 'topCenter',
      });
    }
    setLoading(false);
  };

  useEffect(() => {
    getTransactions();
  }, []);

  const transactionsForm = () => {
    return (
      <FlexboxGrid justify="center">
        <FlexboxGrid.Item colspan={24}>
          <Panel header={<h3>Transactions</h3>} bordered>
            <Table
              autoHeight={true}
              data={transactions}
              onRowClick={(rowData) => {
                console.log(rowData);
              }}
            >
              <Column width={80} align="center" fixed fullText>
                <HeaderCell>Id</HeaderCell>
                <Cell dataKey="_id" />
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
          </Panel>
        </FlexboxGrid.Item>
      </FlexboxGrid>
    );
  };

  const render = () => {
    return transactions.length > 0 ? (
      transactionsForm()
    ) : (
      <div>No transactions</div>
    );
  };

  return isLoading ? <Loader /> : render();
};
