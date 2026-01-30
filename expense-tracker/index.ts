import { ExpenseController } from "./src/controllers/ExpenseController";


async function start() {
  const controller = new ExpenseController();

  // await controller.addExpense('Tomato Food', 390);
  // await controller.listExpenses();
  // await controller.summaryOfExpenses();
  // await controller.deleteExpense(8);
  // await controller.listExpenses();
}

start();