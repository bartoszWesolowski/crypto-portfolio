import { Panel, FlexboxGrid } from 'rsuite';
import { TransactionList } from './TransactionsList';

export const TransactionsPage = () => {
  return (
    <FlexboxGrid justify="center">
      <FlexboxGrid.Item colspan={24}>
        <Panel header={<h3>Transactions</h3>} bordered>
          <TransactionList />
        </Panel>
      </FlexboxGrid.Item>
    </FlexboxGrid>
  );
};
