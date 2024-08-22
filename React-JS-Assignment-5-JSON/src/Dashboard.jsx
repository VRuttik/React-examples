import React from "react";
import { PrimaryButton, Stack } from "@fluentui/react";
import { useNavigate } from "react-router-dom";
import './Dashboard.css'; // Import the CSS file

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="dashboardContainer">
      <h1 className="dashboardHeading">Dashboard</h1>

      <Stack horizontal tokens={{ childrenGap: 20 }} horizontalAlign="center">
        <PrimaryButton
          text="View Students" 
          onClick={() => navigate("/view-students")}
        />
        <PrimaryButton 
          text="Student Management" 
          onClick={() => navigate("/add-student")}
        />
        <PrimaryButton 
          text="Employee Management" 
          onClick={() => navigate("/employee")}
        />
      </Stack>
    </div>
  );
};

export default Dashboard;


