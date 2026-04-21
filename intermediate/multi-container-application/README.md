# Multi-Container Application

A small Bun-based full-stack application split into three Docker Compose services:
- `frontend`: Bun server that serves the React application
- `api`: Express API backed by MongoDB via Mongoose
- `db`: MongoDB 7 with a named Docker volume

This project follows the roadmap.sh Multi-Container Application project:
https://roadmap.sh/projects/multi-container-service

Current status: Requirement #1 is complete for the API portion. The API is dockerized, runs with MongoDB via Docker Compose, and persists todo data in the MongoDB volume.

## Quick Start

1. Create or update the repo-level `.env` with database credentials:

```env
DB_USER=myuser
DB_PASSWORD=mypassword
DB_NAME=multi-container-app
```

2. Build and start the stack:

```bash
docker compose up -d --build
```

3. Open the services:
- Frontend: `http://localhost:3000`
- API: `http://localhost:8080`
- MongoDB: `mongodb://localhost:27017`

## Commands

| Command | Description |
|---------|-------------|
| `docker compose up -d --build` | Build and start all services |
| `docker compose up -d api --build` | Rebuild and start only the API |
| `docker compose up -d frontend --build` | Rebuild and start only the frontend |
| `docker compose logs -f api` | Follow API logs |
| `docker compose logs -f frontend` | Follow frontend logs |
| `docker compose logs -f db` | Follow MongoDB logs |
| `docker compose down` | Stop the stack |

## Architecture

The project is organized as two Bun applications plus a MongoDB container:

- `frontend/` runs a Bun HTTP server from `src/index.ts`, which serves the React app defined by `src/index.html` and `src/frontend.tsx`.
- `api/` exposes todo CRUD endpoints from `index.ts` and persists data with Mongoose models in `api/src/schema/`.
- `docker-compose.yml` connects the services and injects `DATABASE_URL` into the API using credentials from `.env`.

## Operational Notes

- The API must use `DATABASE_URL` from Compose. The Mongo root user authenticates against the `admin` database, so the connection string includes `?authSource=admin`.
- Both app images use per-service `.dockerignore` files to keep host `node_modules` out of the Docker build context. Without that, host binaries can overwrite Linux container binaries and cause `Exec format error`.
- The frontend container runs `bun src/index.ts` in production. Its `build.ts` step produces browser assets, but not the server entrypoint used at runtime.
- MongoDB uses the named volume `mongo_data`. If you change `DB_USER`, `DB_PASSWORD`, or `DB_NAME` after the volume has already been initialized, Mongo will keep the old credentials. Recreate the volume if you need Mongo init settings to be applied again.
