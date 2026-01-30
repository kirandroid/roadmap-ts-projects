import { Command } from "commander";
import { ExpenseController } from "./src/controllers/ExpenseController";

const program = new Command();
const controller = new ExpenseController();

program
  .name('Expense Tracker')
  .description('CLI to track your expenses')
  .version('1.0.0');

program.command('summary')
  .description('Display a summary of expenses')
  .option('-m, --month <number>', 'Month as a number (1-12)')
  .option('-y, --year <number>', 'Year (e.g., 2026)')
  .action((options) => {
    const month = options.month ? parseInt(options.month) : undefined;
    const year = options.year ? parseInt(options.year) : undefined;
    controller.summaryOfExpenses({ month, year });
  });

program.parse();