import { useState } from 'react'
import './App.css'

function App() {

  const [message, setMessage] = useState("");

  async function getMessage() {
    const response = await fetch("http://localhost:8000/health/message");

    const data = await response.json();

    setMessage(data.message);
    
  }

  return (
    <div>
      <button onClick={getMessage}>
        Get message
      </button>

      <p>{message}</p>
    </div>
  );
}

export default App
