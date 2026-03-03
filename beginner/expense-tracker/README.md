# expense-tracker
https://roadmap.sh/projects/expense-tracker
To install dependencies:

```bash
bun install
```

To run:

```bash
bun run index.ts
```

This project was created using `bun init` in bun v1.3.5. [Bun](https://bun.com) is a fast all-in-one JavaScript runtime.

Add a expense

```bash
bun run index.ts add --description "Test Expense" --amount 100
```

List expenses

```bash
bun run index.ts list
```

Summary of expenses

```bash
bun run index.ts summary

bun run index.ts summary --month 1

bun run index.ts summary --month 1 --year 2026

bun run index.ts summary --year 2026
```

Delete expense

```bash
bun run index.ts delete --id 1
```