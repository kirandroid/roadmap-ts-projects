# Blogging Platform API

[Roadmap Link](https://roadmap.sh/projects/blogging-platform-api)

A high-performance blogging API built with **Bun**, **TypeScript**, **Prisma**, and **MySQL**, fully containerized with **Docker**.

## 🚀 Prerequisites

Before starting, ensure you have the following installed:

- [Bun](https://bun.sh/)
- [Docker & Docker Compose](https://www.docker.com/products/docker-desktop/)

---

## 🛠️ Setup Instructions

### 1. Clone and Install

```bash
# Install dependencies
bun install
```

### 2. Configure Environment Variables

Create a `.env` file in the root directory:

```env
# Database connection for local migrations (Terminal)
# Use 'root' to allow Prisma to create the shadow database
DATABASE_URL="mysql://root:myrootpassword@localhost:3306/mypractice"

# Database credentials for the Docker Container
DB_ROOT_PASSWORD=myrootpassword
DB_NAME=mypractice
DB_USER=myuser
DB_PASSWORD=mypassword

PORT=3000
```

### 3. Initialize the Database

Since we are using MySQL, we need to run the first migration using the `root` user to allow Prisma to handle the "Shadow Database" correctly.

1. **Start the database container only:**

    ```bash
    docker-compose up -d db
    ```

2. **Run the initial migration:**
    ```bash
    bunx prisma migrate dev --name init
    ```

---

## 🐳 Running with Docker

Once the initial migration is created, you can launch the entire stack (API + Database):

```bash
# Build and start
docker-compose up --build
```

The API will be available at: `http://localhost:9860`

---

## 🔄 Development Workflow

### Adding new Database Models

1. Update `prisma/schema.prisma`.
2. Ensure your Docker database is running (`docker-compose up -d db`).
3. Run:
    ```bash
    bunx prisma migrate dev --name add_new_feature
    ```
4. Restart your Docker containers to apply changes to the API.

### Database Visualization

You can connect to the database using tools like **TablePlus**, **DBeaver**, or **MySQL Workbench**:

- **Host:** `localhost`
- **Port:** `3306`
- **User:** `root`
- **Password:** `myrootpassword` (as defined in `.env`)

---

## 📂 Project Structure

- `index.ts`: Entry point for the Bun server.
- `prisma/schema.prisma`: Database schema and provider configuration.
- `Dockerfile`: Multi-stage build for the Bun application.
- `docker-compose.yml`: Orchestration for the API and MySQL services.

---

## 📚 API Reference

The API follows REST conventions and is prefixed with `/api/v1`. All endpoints return JSON responses.

### Authentication

Most endpoints require authentication via JWT tokens. Include the token in the Authorization header:
```
Authorization: Bearer <token>
```

#### Auth Endpoints

| Method | Endpoint | Description | Request Body | Response |
|--------|----------|-------------|--------------|----------|
| POST | `/api/v1/auth/login` | Authenticate user | `{ username: string, password: string }` | `{ status: "success", accessToken: string, refreshToken: string }` |
| POST | `/api/v1/auth/register` | Register new user | `{ username: string, firstName: string, lastName: string, password: string }` | `{ status: "success" }` |
| POST | `/api/v1/auth/logout` | Logout user (clears refresh token) | None | `{ status: "success" }` |
| POST | `/api/v1/auth/refresh` | Refresh access token | `{ refreshToken: string }` | `{ status: "success", accessToken: string, refreshToken: string }` |

#### Post Endpoints

| Method | Endpoint | Description | Request Body/Params | Response |
|--------|----------|-------------|---------------------|----------|
| POST | `/api/v1/posts` | Create new post | `{ title: string, content: string, categories?: number[], tags?: number[] }` | `{ status: "success", data: PostObject }` |
| GET | `/api/v1/posts` | Get all posts (supports search) | Query: `{ search?: string }` | `{ status: "success", data: PostObject[] }` |
| GET | `/api/v1/post/:id` | Get post by ID | Params: `{ id: number }` | `{ status: "success", data: PostObject }` |
| PATCH | `/api/v1/post/:id` | Update post | Params: `{ id: number }`, Body: `{ title?: string, content?: string, categories?: number[], tags?: number[] }` | `{ status: "success" }` |
| DELETE | `/api/v1/post/:id` | Delete post | Params: `{ id: number }` | `{ status: "success" }` |

#### Category Endpoints

| Method | Endpoint | Description | Request Body/Params | Response |
|--------|----------|-------------|---------------------|----------|
| POST | `/api/v1/categories` | Create new category | `{ name: string }` | `{ status: "success" }` |
| GET | `/api/v1/categories` | Get all categories (supports search) | Query: `{ search?: string }` | `{ status: "success", data: CategoryObject[] }` |
| PATCH | `/api/v1/category/:id` | Update category | Params: `{ id: number }`, Body: `{ name: string }` | `{ status: "success" }` |
| DELETE | `/api/v1/category/:id` | Delete category | Params: `{ id: number }` | `{ status: "success" }` |

#### Tag Endpoints

| Method | Endpoint | Description | Request Body/Params | Response |
|--------|----------|-------------|---------------------|----------|
| POST | `/api/v1/tags` | Create new tag | `{ name: string }` | `{ status: "success" }` |
| GET | `/api/v1/tags` | Get all tags (supports search) | Query: `{ search?: string }` | `{ status: "success", data: TagObject[] }` |
| PATCH | `/api/v1/tag/:id` | Update tag | Params: `{ id: number }`, Body: `{ name: string }` | `{ status: "success" }` |
| DELETE | `/api/v1/tag/:id` | Delete tag | Params: `{ id: number }` | `{ status: "success" }` |

### Data Models

#### Post Object
```json
{
  "id": number,
  "title": string,
  "content": string,
  "authorId": number,
  "createdAt": string (ISO date),
  "updatedAt": string (ISO date),
  "author": {
    "id": number,
    "username": string,
    "firstName": string,
    "lastName": string
  },
  "categories": [
    {
      "id": number,
      "name": string
    }
  ],
  "tags": [
    {
      "id": number,
      "name": string
    }
  ]
}
```

#### Category Object
```json
{
  "id": number,
  "name": string
}
```

#### Tag Object
```json
{
  "id": number,
  "name": string
}
```

#### User Object (returned during registration/login)
```json
{
  "id": number,
  "username": string,
  "firstName": string,
  "lastName": string
}
```

---

## ⚠️ Troubleshooting

### Connection Error (P1001)

If you see `Can't reach database server at db:3306` while running migrations in your terminal, it's because your terminal is looking for a host named `db`.
**Fix:** Ensure your `.env` file `DATABASE_URL` uses `localhost` for migrations.

### Shadow Database Error (P3014)

MySQL requires high privileges to create the temporary shadow database used by Prisma.
**Fix:** Use the `root` user in your `DATABASE_URL` when running `prisma migrate dev`.

### Dockerfile "Missing file" error

If Docker fails with `failed to read dockerfile`, ensure the file is named exactly `Dockerfile` (case sensitive, no extension) and is located in the root folder.
