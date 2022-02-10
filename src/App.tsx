import React from "react";
import "./App.css";
import { Dashboard } from "./components/Dashboard";

function App() {
  return (
    <div className="App">
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Dashboard />
      </div>
    </div>
  );
}

export default App;
