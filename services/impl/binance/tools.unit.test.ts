import { describe, it, expect } from 'vitest';
import { removeLetters } from './tools';

describe('Binance tools test', () => {
  it('Should remove currency from text', () => {
    expect(removeLetters('1.23VET')).toEqual('1.23');
  });
});
