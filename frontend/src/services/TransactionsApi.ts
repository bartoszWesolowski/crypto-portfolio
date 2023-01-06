import { API } from 'aws-amplify';
import { TransactionItem, TransactionsFileProvider } from './types';

export interface TransactionsFromFileParams {
  fileKey: string;
  type: TransactionsFileProvider;
}

export interface TransactionsFromFileResponse {
  message: string;
  transactions: TransactionItem[];
}

export interface TransactionsApiClient {
  getTransactionsFromFile(
    params: TransactionsFromFileParams,
  ): Promise<TransactionsFromFileResponse>;
}

export class TransactionsApiClientImpl implements TransactionsApiClient {
  async getTransactionsFromFile(
    params: TransactionsFromFileParams,
  ): Promise<TransactionsFromFileResponse> {
    const transactions = await API.get(
      'crypto-portfolio',
      '/transactions/file',
      {
        queryStringParameters: {
          fileKey: params.fileKey,
          type: params.type,
        },
      },
    );
    return transactions as TransactionsFromFileResponse;
  }
}
