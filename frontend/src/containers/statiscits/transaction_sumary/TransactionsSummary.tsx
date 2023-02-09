import { Panel, FlexboxGrid, useToaster, Loader } from 'rsuite';
import { Grid, Row, Col } from 'rsuite';

import { Table } from 'rsuite';
import {
  TransactionsApiClientImpl,
  TransactionsSummaryEntry,
} from '../../../services/TransactionsApi';
import { useEffect, useState } from 'react';
import Notification, {
  MessageType,
} from 'rsuite/esm/Notification/Notification';

type SortType = 'asc' | 'desc' | undefined;

class TransactionSummaryEntryWrapper implements TransactionsSummaryEntry {
  wrapped: TransactionsSummaryEntry;

  constructor(wrapped: TransactionsSummaryEntry) {
    this.wrapped = wrapped;
    this.pair = wrapped.pair;
    this.amountBought = wrapped.amountBought ?? 0;
    this.amountSpent = wrapped.amountSpent ?? 0;
    this.amountSold = wrapped.amountSold ?? 0;
    this.amountEarned = wrapped.amountEarned ?? 0;
    this.balance = this.getBalance();
  }
  pair: string;
  amountBought: number;
  amountSpent: number;
  amountSold: number;
  amountEarned: number;
  balance: number;

  /**
   * averageBuyPrice: number  */
  public averageBuyPrice(): number {
    if (this.amountBought > 0) {
      return this.amountSpent / this.amountBought;
    }
    return 0;
  }
  /**
   * averageBuyPrice: number  */
  public averageSellPrice(): number {
    if (this.amountSold > 0) {
      return this.amountEarned / this.amountSold;
    }
    return 0;
  }
  /**
   * averageBuyPrice: number  */
  public getBalance(): number {
    return this.amountBought - this.amountSold;
  }

  public getProp(name: string): string | number | undefined {
    return (this as unknown as Record<string, string | number>)[name];
  }
}
export const TransactionsSummary = () => {
  const [isLoading, setLoading] = useState(false);

  const transactionsClient = new TransactionsApiClientImpl();

  const toaster = useToaster();

  const [transactions, setTransactions] = useState(
    [] as TransactionSummaryEntryWrapper[],
  );

  const [sortColumn, setSortColumn] = useState('');
  const [sortType, setSortType] = useState('asc' as SortType);

  const getData = () => {
    console.log(`sortColumn: ${sortColumn}`);
    if (sortColumn && sortType) {
      return transactions.sort((a, b) => {
        let x = a.getProp(sortColumn);
        let y = b.getProp(sortColumn);
        let result = 0;
        if (typeof x === 'string') {
          const asStringX = x as string;
          const asStringY = y as string;
          result = asStringX.localeCompare(asStringY);
        } else {
          const asNumberX = (x ?? 0) as number;
          const asNumberY = (y ?? 0) as number;
          result = asNumberX - asNumberY;
        }
        if (sortType !== 'asc') {
          result = -1 * result;
        }
        return result;
      });
    }
    return transactions;
  };

  const handleSortColumn = (sortColumn: string, sortType: SortType) => {
    setSortColumn(sortColumn);
    setSortType(sortType);
  };

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
      const response = await transactionsClient.getTransactionsSummary();
      setTransactions(
        response.transactionsSummary.map(
          (e) => new TransactionSummaryEntryWrapper(e),
        ),
      );
    } catch (e) {
      toaster.push(message('Failed to get transactions', 'error'), {
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
        <FlexboxGrid.Item as={Col} colspan={24} md={20}>
          <Panel header={<h3>Transactions summary</h3>} bordered>
            <Table
              autoHeight={true}
              data={getData()}
              defaultExpandAllRows={true}
              loading={isLoading}
              sortColumn={sortColumn}
              sortType={sortType}
              onSortColumn={handleSortColumn}
              onRowClick={(rowData) => {
                console.log(rowData);
              }}
            >
              <Column align="center" fullText sortable>
                <HeaderCell>Pair</HeaderCell>
                <Cell dataKey="pair" />
              </Column>

              <Column width={200} sortable>
                <HeaderCell>Balance</HeaderCell>
                <Cell fullText dataKey="balance">
                  {(data) => (
                    <span>
                      {(data as TransactionSummaryEntryWrapper)
                        .getBalance()
                        .toLocaleString('en-gb', {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 5,
                        })}
                    </span>
                  )}
                </Cell>
              </Column>

              <Column width={200} sortable>
                <HeaderCell>Bought</HeaderCell>
                <Cell fullText dataKey="amountBought">
                  {(data) => (
                    <span>
                      {(
                        data as TransactionSummaryEntryWrapper
                      ).amountBought.toLocaleString('en-gb', {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 5,
                      })}
                    </span>
                  )}
                </Cell>
              </Column>

              <Column width={150} sortable>
                <HeaderCell>Spent</HeaderCell>
                <Cell fullText dataKey="amountSpent">
                  {(data) => (
                    <span>
                      {(
                        data as TransactionSummaryEntryWrapper
                      ).amountSpent?.toFixed(5)}
                    </span>
                  )}
                </Cell>
              </Column>

              <Column sortable>
                <HeaderCell>Sold</HeaderCell>
                <Cell dataKey="amountSold" />
              </Column>

              <Column sortable>
                <HeaderCell>Earned</HeaderCell>
                <Cell dataKey="amountEarned" />
              </Column>

              <Column sortable>
                <HeaderCell>Average Buy Price</HeaderCell>
                <Cell fullText>
                  {(data) => (
                    <span>
                      {(data as TransactionSummaryEntryWrapper)
                        .averageBuyPrice()
                        .toFixed(2)}
                    </span>
                  )}
                </Cell>
              </Column>
              <Column sortable>
                <HeaderCell>Average Sell Price</HeaderCell>
                <Cell fullText>
                  {(data) => (
                    <span>
                      {(data as TransactionSummaryEntryWrapper)
                        .averageSellPrice()
                        .toFixed(2)}
                    </span>
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
