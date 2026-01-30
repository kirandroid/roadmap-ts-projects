import { ExpenseController } from "./src/controllers/ExpenseController";


async function start() {
  const controller = new ExpenseController();

  // await controller.addExpense('Tomato Food', 390);
  // await controller.listExpenses();
  await controller.summaryOfExpenses({ month: 1, year: 2020 });
  // await controller.deleteExpense(8);
  // await controller.listExpenses();
}

start();