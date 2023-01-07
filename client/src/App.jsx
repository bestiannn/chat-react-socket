import { useState } from "react";
import Chat from "./components/Chat";
import Login from "./components/Login";

const App = () => {
  const [username, setUsername] = useState("");
  const [usernameReady, setUsernameReady] = useState(false);

  return (
    <div className="flex min-h-screen bg-slate-800 text-white">
      {!usernameReady && (
        <Login
          setUsernameReady={setUsernameReady}
          username={username}
          setUsername={setUsername}
        />
      )}
      {usernameReady && <Chat username={username} />}
    </div>
  );
};

export default App;
