import { Command } from "commander";
import { ExpenseController } from "./src/controllers/ExpenseController";

const program = new Command();
const controller = new ExpenseController();

program
  .name('Expense Tracker')
  .description('CLI to track your expenses')
  .version('1.0.0');


program.command('add')
  .description('Add a new expense')
  .option('-d, --description <string>', 'Description of the expense')
  .option('-a, --amount <number>', 'Amount of the expense')
  .action((options) => {
    const description = options.description;
    const amount = options.amount ? parseInt(options.amount) : undefined;
    if (description == undefined || amount == undefined) {
      console.log('Description and amount are required');
      process.exit(1);
    }
    controller.addExpense(description, amount);
  });

program.command('list')
  .description('List all expenses')
  .action(() => {
    controller.listExpenses();
  });

program.command('summary')
  .description('Display a summary of expenses')
  .option('-m, --month <number>', 'Month as a number (1-12)')
  .option('-y, --year <number>', 'Year (e.g., 2026)')
  .action((options) => {
    const month = options.month ? parseInt(options.month) : undefined;
    const year = options.year ? parseInt(options.year) : undefined;
    controller.summaryOfExpenses({ month, year });
  });

program.command('delete')
  .description('Delete an expense')
  .option('-i, --id <number>', 'ID of the expense')
  .action((options) => {
    const id = options.id ? parseInt(options.id) : undefined;
    if (id == undefined) {
      console.log('ID is required');
      process.exit(1);
    }
    controller.deleteExpense(id);
  });

program.parse();