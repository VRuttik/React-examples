import React from "react";
import { PrimaryButton } from "@fluentui/react";
import { useNavigate } from "react-router-dom";
import "./App.css";
import '@fortawesome/fontawesome-free/css/all.min.css';

const App = () => {
  const navigate = useNavigate();

  return (
    <div className="app-container">
      <h2>Employee Management System</h2>
      <PrimaryButton text="Manage Employees" onClick={() => navigate("/employees")} />
    </div>
  );
};

export default App;


