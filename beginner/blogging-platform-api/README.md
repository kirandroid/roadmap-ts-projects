# Blogging Platform API

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

## ⚠️ Troubleshooting

### Connection Error (P1001)

If you see `Can't reach database server at db:3306` while running migrations in your terminal, it's because your terminal is looking for a host named `db`.
**Fix:** Ensure your `.env` file `DATABASE_URL` uses `localhost` for migrations.

### Shadow Database Error (P3014)

MySQL requires high privileges to create the temporary shadow database used by Prisma.
**Fix:** Use the `root` user in your `DATABASE_URL` when running `prisma migrate dev`.

### Dockerfile "Missing file" error

If Docker fails with `failed to read dockerfile`, ensure the file is named exactly `Dockerfile` (case sensitive, no extension) and is located in the root folder.
