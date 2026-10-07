# Argo Collaborative AI Workspace

Argo currently includes a FastAPI server, a React/Vite client, and a PostgreSQL database. The server exposes health checks and an endpoint to create workspaces. The client currently displays a button that calls the health message endpoint.

## Start PostgreSQL

From the project root, copy the example environment file and start the database:

```bash
cp .env.example .env
docker compose up -d db
```

The default database is available on `localhost:5432`. If you change the PostgreSQL credentials in `.env`, use the same values in the server connection string below.

## Start the API

Create a Python virtual environment and install the server dependencies:

```bash
cd server
python3 -m venv .venv
source .venv/bin/activate
python -m pip install "fastapi[standard]" sqlalchemy pydantic-settings "psycopg[binary]"
```

Create `server/.env` with the database connection string:

```dotenv
DB_URL=postgresql+psycopg://argo:argo@localhost:5432/argo
```

Then create the tables and start the API from the `server` directory:

```bash
python create_tables.py
fastapi dev main.py
```

The API runs at [http://127.0.0.1:8000](http://127.0.0.1:8000), with interactive docs at [http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs).

## Start the client

In another terminal, from the project root:

```bash
cd client
npm ci
npm run dev
```

Open [http://localhost:5173](http://localhost:5173). The client calls the API at `http://localhost:8000`, so keep the API running while using it.

## Create a workspace

The workspace endpoint accepts a name, provider, and model name:

```bash
curl -X POST http://127.0.0.1:8000/workspaces \
  -H "Content-Type: application/json" \
  -d '{"name":"My workspace","provider":"openai","model_name":"example-model"}'
```

It returns the new workspace with its `id` and `created_at` timestamp. The provider and model name are stored as strings; the API does not validate them against a provider catalog yet.
