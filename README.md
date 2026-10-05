# Argo Collaborative AI Workspace

## Run the FastAPI server

From the project root:

```bash
cd server
source .venv/bin/activate
fastapi dev main.py
```

Open:

- API: http://127.0.0.1:8000
- Interactive docs: http://127.0.0.1:8000/docs

If the virtual environment does not exist yet:

```bash
cd server
python3 -m venv .venv
source .venv/bin/activate
python -m pip install "fastapi[standard]"
fastapi dev main.py
```
