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

export interface TransactionsSummaryEntry {
  pair: string;
  amountBought?: number;
  amountSpent?: number;
  amountSold?: number;
  amountEarned?: number;
  price?: number;
}

export type TransactionsSummaryResponse = {
  transactionsSummary: TransactionsSummaryEntry[];
};

export interface TransactionsApiClient {
  getTransactionsFromFile(
    params: TransactionsFromFileParams,
  ): Promise<TransactionsFromFileResponse>;

  saveTransactions(transactions: TransactionItem[]): Promise<any>;

  getTransactions(): Promise<TransactionsFromFileResponse>;

  getTransactionsSummary(): Promise<TransactionsSummaryResponse>;
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

  async saveTransactions(transactions: TransactionItem[]): Promise<any> {
    return await API.post('crypto-portfolio', '/transactions', {
      body: { transactions: transactions },
    });
  }

  async getTransactions(): Promise<TransactionsFromFileResponse> {
    return (await API.get(
      'crypto-portfolio',
      '/transactions',
      {},
    )) as TransactionsFromFileResponse;
  }

  async getTransactionsSummary(): Promise<TransactionsSummaryResponse> {
    const r = await API.get('crypto-portfolio', '/transactions/summary', {});
    return r as TransactionsSummaryResponse;
  }
}
