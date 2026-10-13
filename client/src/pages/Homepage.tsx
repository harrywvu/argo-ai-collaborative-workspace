import {useEffect, useState} from "react";

interface Workspace {
  id: number;
  name: string;
  provider: string;
  model_name: string;
  created_at: string;
}

export default function Homepage() {
    const [workspaces, setWorkspaces] = useState<Workspace[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const [name, setName] = useState("");
    const [provider, setProvider] = useState("");
    const [modelName, setModelName] = useState("");

  const [creating, setCreating] = useState(false);
  const [createError, setCreateError] = useState<string | null>(null);

  async function handleCreate(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setCreating(true);
    setCreateError(null);

    try {
        const response = await fetch("http://localhost:8000/workspaces", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: name,
                provider: provider,
                model_name: modelName,
            }),
        });

        if (!response.ok) {
            throw new Error(`Failed to create workspace: ${response.status}`);
        }

        const newWorkspace: Workspace = await response.json();
        setWorkspaces((prev) => [...prev, newWorkspace]);

        setName("");
        setProvider("");
        setModelName("");

    } catch (error) {
        setCreateError(error instanceof Error ? error.message : "Could not create workspace");
    } finally {
        setCreating(false);
    }
  }

  useEffect(() => {
    async function fetchWorkspaces() {
      try {
        const response = await fetch("http://localhost:8000/workspaces");
        if (!response.ok) {
          throw new Error(`Failed to fetch workspaces: ${response.status}`);
        }

        const data: Workspace[] = await response.json();
        setWorkspaces(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Could not load workspaces");
      } finally {
        setLoading(false);
      }
    }

    fetchWorkspaces();
  }, []);

  return (
    <div>
      <h1>My Workspaces</h1>

      {loading && <p>Loading workspaces...</p>}

      {error && <p>{error}</p>}

      {!loading && !error && workspaces.length === 0 && (
        <p>No workspaces found.</p>
      )}

      {!loading && !error && workspaces.map((workspace) => (
        <div key={workspace.id}>
          <h2>{workspace.name}</h2>
          <p>Provider: {workspace.provider}</p>
          <p>Model: {workspace.model_name}</p>
          <p>Created: {workspace.created_at}</p>
        </div>
      ))}

      <form onSubmit={handleCreate}>
        <h2>Create Workspace</h2>

        <input
            type="text"
            placeholder="Workspace name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
        />

        <input
            type="text"
            placeholder="Provider"
            value={provider}
            onChange={(e) => setProvider(e.target.value)}
            required
        />

        <input
            type="text"
            placeholder="Model name"
            value={modelName}
            onChange={(e) => setModelName(e.target.value)}
            required
        />

        <button type="submit" disabled={creating}>
            {creating ? "Creating..." : "Create Workspace"}
        </button>

        {createError && <p>{createError}</p>}
        </form>
    </div>
  );
}