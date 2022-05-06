import { storage, Context, u128, logging, ContractPromiseBatch, context} from "near-sdk-as"
import { Sending} from './model';


export function sendMoneyEqually(names: Array<string>): string{
  const sendtrans = new Sending();
  assert(sendtrans.totalAmount > u128.fromString('1000000000000000000000000'), 'Please deposit at least 1 NEAR to create a game');
  const netAmount = u128.sub(sendtrans.totalAmount,u128.fromString('1000000000000000000000000'));
  const amount = u128.sub(netAmount, u128.fromString(names.length.toString().concat('000000000000000000000000')));
  for (var i = 0, len = names.length; i < len; i++) {
    let adress = ContractPromiseBatch.create(names[i]);
    adress.transfer(amount);
  }
  
  return `Congratulations: ${amount} Ⓝ transferred to ${names.join(' and ')}`;
}

export function sendMoneySeperately(names: Array<string>, amounts: Array<i32>): string{
  const sendtrans = new Sending();
  assert(sendtrans.totalAmount > u128.fromString('1000000000000000000000000'), 'Please deposit at least 1 NEAR to create a game');
  const netAmount = u128.sub(sendtrans.totalAmount,u128.fromString('1000000000000000000000000'));
  //const amount = u128.sub(netAmount, u128.fromString(names.length.toString().concat('000000000000000000000000')));
  for (var i = 0, len = names.length; i < len; i++) {
    let adress = ContractPromiseBatch.create(names[i]);
    adress.transfer(u128.fromString(amounts[i].toString().concat('000000000000000000000000')));
  }
  
  return `Congratulations: ${amounts.join(' and ')} Ⓝ transferred to ${names.join(' and ')}`;
}
