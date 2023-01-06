import { API } from 'aws-amplify';
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Form,
  ButtonToolbar,
  Button,
  Panel,
  FlexboxGrid,
  Loader,
  Uploader,
} from 'rsuite';
import { FileType } from 'rsuite/esm/Uploader';
import {
  TransactionItem,
  TransactionsFileProvider,
} from '../../../services/types';

import { useAppContext } from '../../../contextLib';
import { s3Upload } from '../../../lib/awsLib';
import { TransactionsApiClientImpl } from '../../../services/TransactionsApi';
import { ImportTransactionsForm } from './ImportTransactionsForm';

export interface FileImportFormProps {
  importType: TransactionsFileProvider;
}

export const FileImportForm = (props: FileImportFormProps) => {
  const [formValue, setFormValue] = useState({
    importType: props.importType,
    password: '',
  } as Record<string, string>);

  const transactionsClient = new TransactionsApiClientImpl();

  const [files, setFiles] = useState([] as FileType[]);

  const [transactions, setTransactions] = useState([] as TransactionItem[]);

  const [isLoading, setLoading] = useState(false);

  const nav = useNavigate();

  const { isAuthenticated } = useAppContext();

  const location = useLocation();

  useEffect(() => {
    if (!isAuthenticated) {
      nav(`/login?redirect=${location.pathname}`);
    }
  }, [isAuthenticated, nav, location.pathname]);

  const handleSubmit = async (
    checkStatus: boolean,
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();
    console.log(files);
    if (files.length == 0) {
      alert('No files to submit');
      return;
    }
    try {
      setLoading(true);
      const key = await s3Upload(files[0]);
      const t = await fetchTransactions(key);
      setTransactions(t);
    } catch (e: any) {
      console.log(e);
    }
    setLoading(false);
  };

  const fetchTransactions = async (fileKey: string) => {
    const response = await transactionsClient.getTransactionsFromFile({
      fileKey: fileKey,
      type: props.importType,
    });
    return response.transactions;
  };

  return (
    <FlexboxGrid justify="center">
      <FlexboxGrid.Item colspan={24}>
        <Panel header={<h3>Import transactions</h3>} bordered>
          <Form
            fluid
            onChange={setFormValue}
            formValue={formValue}
            onSubmit={handleSubmit}
          >
            <Form.Group>
              <Form.ControlLabel>Transaction history CSV</Form.ControlLabel>
              <Uploader
                autoUpload={false}
                onChange={setFiles}
                action={''}
                multiple={false}
              />
            </Form.Group>
            <Form.Group>
              <ButtonToolbar>
                <Button type="submit" appearance="primary" disabled={isLoading}>
                  {isLoading && <Loader size="xs" />}Process file
                </Button>
              </ButtonToolbar>
            </Form.Group>
          </Form>
          <ImportTransactionsForm transactions={transactions} />
        </Panel>
      </FlexboxGrid.Item>
    </FlexboxGrid>
  );
};
