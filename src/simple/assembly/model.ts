import {context, u128, PersistentUnorderedMap, logging } from 'near-sdk-as';

@nearBindgen
export class Sending {
  id: string;
  totalAmount: u128;

  constructor() {
    this.id = context.blockIndex.toString().slice(2, 8);
    this.totalAmount = context.attachedDeposit;
  }
}

export const sendtrans = new PersistentUnorderedMap<string, Sending>('g');
