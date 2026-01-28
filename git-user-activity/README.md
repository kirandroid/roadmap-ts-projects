# git-user-activity

To install dependencies:

```bash
bun install
```

To run:

```bash
bun run index.ts
```

This project was created using `bun init` in bun v1.3.5. [Bun](https://bun.com) is a fast all-in-one JavaScript runtime.

Learning more on architecturing a project;
Using 4 Layer achitecture;

- Controller Layer
  - No business logic in this layer, its only job is to handle incoming request, validate inputs and call the right service.
- Service Layer
  - Business logic goes here.
- Repository Layer
  - This layer talks with the datasource, CRUD operations goes here
- Model Layer
  - Interfaces that represents the actual data

src/
├── controllers/  
├── services/  
├── repositories/  
├── models/  
├── dto/
└── app.ts
