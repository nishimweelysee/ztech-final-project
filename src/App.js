import React, { useContext } from "react";
import { UserContext } from "./context/UserContext";

function App() {
  const {user} = useContext(UserContext);
  return (
    <div className="App">
        Hi
    </div>
  );
}

export default App;
