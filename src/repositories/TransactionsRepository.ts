/* eslint-disable prettier/prettier */
import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface TransactionDTO{
  title: string;
  value: number;
  type: 'income' | 'outcome';
}
class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
     return this.transactions;
  }

  public getBalance(): Balance {

    const income = this.transactions.filter(type => type.type === 'income').reduce((accumulator, currentValue) => accumulator + currentValue.value, 0);
    const outcome = this.transactions.filter(type => type.type === 'outcome').reduce((accumulator, currentValue) => accumulator + currentValue.value, 0);
    const total = income-outcome;

    const balance : Balance = ({
      income,
      outcome,
      total
    });

    return balance;
  }

  public create({title, value, type}: TransactionDTO): Transaction {

    const balance = this.getBalance();

    if(type === "outcome" && value > balance.total){
      throw new Error('Transaction not allowed');
    }else{
      const transaction = new Transaction({title, value, type});

      this.transactions.push(transaction);

      return transaction;
    }

  }
}

export default TransactionsRepository;
