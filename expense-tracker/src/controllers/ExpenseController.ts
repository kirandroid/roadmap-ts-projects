import type { Expense } from "../models/Expense";
import { ExpenseService } from "../services/ExpenseService";
import { IdService } from "../services/IdService";
import { ConsoleView } from "../views/ConsoleView";

export class ExpenseController {
    private expenseService: ExpenseService;
    private idService: IdService;
    private ui: ConsoleView;

    constructor() {
        this.expenseService = new ExpenseService();
        this.idService = new IdService()
        this.ui = new ConsoleView();
    }

    async getNextId(): Promise<number> {
        const nextId = await this.idService.nextId();
        return nextId;
    }

    async addExpense(description: string | undefined, amount: number | undefined): Promise<void> {
        try {
            if (description == undefined || amount == undefined) {
                throw new Error('Description or amount is required')
            }
            const now = new Date();
            const id = await this.getNextId();

            const expense: Expense = {
                id: id,
                description: description,
                amount: amount,
                date: now.toISOString(),
            }
            await this.expenseService.addExpense(expense);
            this.ui.displayExpenseAdded(id);
        } catch (error) {
            this.ui.displayTransactionError('adding expense');
        }
    }

    async listExpenses(): Promise<void> {
        try {
            const expenses = await this.expenseService.listExpenses();
            this.ui.displayExpenseList(expenses);
        } catch (error) {
            this.ui.displayTransactionError('listing expenses');
        }
    }

    async deleteExpense(id: number): Promise<void> {
        try {
            await this.expenseService.deleteExpense(id);
            this.ui.displayExpenseDeleted();
        } catch (error) {
            this.ui.displayTransactionError('deleting expenses');
        }
    }

    async summaryOfExpenses({ month, year }: { month?: number; year?: number } = {}) {
        try {
            const total = await this.expenseService.summaryOfExpenses(month, year);
            this.ui.displayExpenseSummary(total, month, year);
        } catch (error) {
            this.ui.displayTransactionError('summarizing expenses');
        }
    }
}