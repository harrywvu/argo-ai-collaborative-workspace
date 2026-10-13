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
    </div>
  );
}