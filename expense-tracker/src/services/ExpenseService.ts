import type { Expense } from "../models/Expense";
import { FileStorage } from "../storage/FileStorage";
import { EXPENSES_FILE_PATH } from "../utils/constants";

export class ExpenseService {
  private storage: FileStorage;
  constructor() {
    this.storage = new FileStorage(EXPENSES_FILE_PATH);
  }

  async addExpense(expense: Expense): Promise<void> {
    try {
      const expenses = await this.listExpenses();
      const newExpenses = [...expenses, expense];
      this.appendExpenses(newExpenses);
    } catch (error) {
      throw error;
    }
  }

  private async appendExpenses(expenses: Expense[]): Promise<void> {
    try {
      const data = JSON.stringify(expenses);
      await this.storage.save(data);
    } catch (error) {
      throw error;
    }
  }

  async listExpenses(): Promise<Expense[]> {
    try {
      const file = await this.storage.load();
      const rawData: any[] = await file?.json();
      if (rawData == undefined) {
        return [];
      }
      const expenses: Expense[] = rawData.map(item => ({
        id: Number(item.id),
        description: item.description,
        date: item.date,
        amount: parseFloat(item.amount)
      }));
      return expenses;
    } catch (error) {
      throw error;
    }
  }

  async deleteExpense(id: number): Promise<void> {
    try {
      const expenses = await this.listExpenses();
      const newExpenses = expenses.filter(expense => expense.id !== id);
      this.appendExpenses(newExpenses);
    } catch (error) {
      throw error;
    }
  }

  async summaryOfExpenses(month: number | undefined, year: number | undefined): Promise<number> {
    try {
      const expenses = await this.listExpenses();
      let total = 0;
      let filteredExpenses = <Expense[]>[];
      if (month && year) {
        filteredExpenses = expenses.filter(expense => {
          const date = new Date(expense.date);
          return date.getMonth() + 1 === month && date.getFullYear() === year;
        });
      } else if (month) {
        filteredExpenses = expenses.filter(expense => {
          const date = new Date(expense.date);
          return date.getMonth() + 1 === month;
        });

      } else if (year) {
        filteredExpenses = expenses.filter(expense => {
          const date = new Date(expense.date);
          return date.getFullYear() === year;
        });

      } else {
        filteredExpenses = expenses;
      }
      filteredExpenses.forEach(expense => {
        total += expense.amount;
      });
      return total;
    } catch (error) {
      throw error;
    }
  }

}
