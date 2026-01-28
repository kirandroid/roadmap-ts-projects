# task-tracker

To install dependencies:

```bash
bun install
```

To run:

```bash
bun run index.ts
```

This project was created using `bun init` in bun v1.3.5. [Bun](https://bun.com) is a fast all-in-one JavaScript runtime.

Add Task

```bash
bun run index.ts add "Buy groceries"
```

Update Task

```bash
bun run index.ts update {{ID}} "Updated description"
```

Delete Task

```bash
bun run index.ts delete {{ID}}
```

Mark Task as in-progress

```bash
bun run index.ts mark-in-progress {{ID}}
```

Mark Task as done

```bash
bun run index.ts mark-done {{ID}}
```

List all Tasks

```bash
bun run index.ts list
```

List done Tasks

```bash
bun run index.ts list done
```

List todo Tasks

```bash
bun run index.ts list todo
```

List in-progress Tasks

```bash
bun run index.ts list in-progress
```
