import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from './Dashboard';
import StudentTable from './StudentTable';
import StudentHigh from './StudentHigh';
import Employees from './Employees';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/view-students" element={<StudentTable />} />
        <Route path="/add-student" element={<StudentHigh />} />
        <Route path="/employee" element={<Employees />} />
      </Routes>
    </Router>
  );
}


