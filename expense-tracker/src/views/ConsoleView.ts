import type { Expense } from "../models/Expense";

export class ConsoleView {

    displayExpenseAdded(id: number): void {
        console.log(`Expense added successfully (ID: ${id})`);
    }

    displayTransactionError(transaction: string){
        console.log(`Error occured when ${transaction}`);  
    }

    displayExpenseSummary(totalExpense: number, month?: string, year?: number): void {
        if (month && year) {
            console.log(`Total expenses for ${month}/${year}: $${totalExpense}`);
            return;
        }
        if (month) {
            console.log(`Total expenses for ${month}: $${totalExpense}`);
            return;
        }
        if (year) {
            console.log(`Total expenses for ${year}: $${totalExpense}`);
            return;
        }
        console.log(`Total expenses: $${totalExpense}`);

    }

    displayExpenseDeleted(): void {
        console.log('Expense deleted successfully');
    }

    private WrapText(text: string, maxWidth: number): string {
        const words = text.split(' ');
        let lines = [];
        let currentLine = '';

        words.forEach(word => {
            if ((currentLine + word).length <= maxWidth) {
                currentLine += (currentLine === '' ? '' : ' ') + word;
            } else {
                lines.push(currentLine);
                currentLine = word;
            }
        });
        if (currentLine) lines.push(currentLine);
        return lines.join('\n');
    }

    displayExpenseList(expenses: Expense[]): void {
        const columnWidths = { id: 4, date: 11, desc: 13, amount: 10 };

        console.log(`${'id'.padEnd(columnWidths.id)} ${'Date'.padEnd(columnWidths.date)} ${'Description'.padEnd(columnWidths.desc)} ${'Amount'.padEnd(columnWidths.amount)}`);
        expenses.forEach(expense => {
            const formattedDate = new Date(expense.date).toISOString().split('T')[0] ?? '';
            const descLines = this.WrapText(expense.description, columnWidths.desc).split('\n');
            console.log(
                expense.id.toString().padEnd(columnWidths.id),
                formattedDate.padEnd(columnWidths.date),
                descLines[0]?.padEnd(columnWidths.desc),
                expense.amount.toString(columnWidths.amount)
            );

            for (let i = 1; i < descLines.length; i++) {
                console.log(
                    ''.padEnd(columnWidths.id),
                    ''.padEnd(columnWidths.date),
                    descLines[i]?.padEnd(columnWidths.desc),
                    ''.padEnd(columnWidths.amount),
                );
            }
            console.log('');
        });
    }
}