import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import EmployeeForm from "./EmployeeForm";
import {
  DefaultButton,
  PrimaryButton,
  Stack,
  Dialog,
  DialogFooter,
  DialogType,
} from "@fluentui/react";
import {
  DetailsList,
  DetailsListLayoutMode,
  SelectionMode,
} from "@fluentui/react/lib/DetailsList";
import "./Employees.css"; // Import the CSS

const Employees = () => {
  const [showForm, setShowForm] = useState(false);
  const [employees, setEmployees] = useState([]);
  const [showEmployeeList, setShowEmployeeList] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  // Load employees from localStorage when the component mounts
  useEffect(() => {
    const storedEmployees = JSON.parse(localStorage.getItem("employees")) || [];
    setEmployees(storedEmployees);
  }, []);

  // Save employees to localStorage whenever employees state changes
  useEffect(() => {
    localStorage.setItem("employees", JSON.stringify(employees));
  }, [employees]);

  const columns = [
    {
      key: "column1",
      name: "Name",
      fieldName: "name",
      minWidth: 100,
      maxWidth: 200,
    },
    {
      key: "column2",
      name: "Address",
      fieldName: "address",
      minWidth: 200,
      maxWidth: 300,
    },
    {
      key: "column3",
      name: "Date of Birth",
      fieldName: "dob",
      minWidth: 100,
      maxWidth: 150,
    },
  ];

  const handleAddEmployee = (newEmployee) => {
    const updatedEmployees = [...employees, newEmployee];
    setEmployees(updatedEmployees);
    setShowForm(false); // Hide form after adding
    setShowSuccessModal(true); // Show success modal
    setShowEmployeeList(true); // Automatically show the list after adding
  };

  const handleCancel = () => {
    setShowForm(false); // Hide form without adding
  };

  const navigate = useNavigate();

  const handlePrintClick = () => {
    // Set showEmployeeList to true to display the employee list
    setShowEmployeeList(true);
  };

  return (
    <div>
      <Stack
        tokens={{ childrenGap: 15 }}
        horizontal
        horizontalAlign="center"
        className="buttonContainer"
      >
        <DefaultButton
          text="Back"
          style={{ float: "right" }}
          onClick={() => navigate("/")}
        />

        <PrimaryButton text="Add Employee" onClick={() => setShowForm(true)} />
        <PrimaryButton
          text="Print"
          onClick={handlePrintClick}
        />
      </Stack>

      {/* Employee List Displayed when Print is Clicked */}
      {showEmployeeList && employees.length > 0 && (
        <div style={{ marginTop: "20px" }}>
          <h2>Employee List</h2>
          <DetailsList
            items={employees}
            columns={columns}
            setKey="set"
            layoutMode={DetailsListLayoutMode.fixedColumns}
            selectionMode={SelectionMode.none}
          />
        </div>
      )}

      {showForm && (
        <EmployeeForm onAddEmployee={handleAddEmployee} onCancel={handleCancel} />
      )}

      {/* Success Modal */}
      <Dialog
        hidden={!showSuccessModal}
        onDismiss={() => setShowSuccessModal(false)}
        dialogContentProps={{
          type: DialogType.largeHeader,
          title: "Success",
          subText: "Employee added successfully!",
        }}
      >
        <DialogFooter>
          <PrimaryButton
            onClick={() => setShowSuccessModal(false)}
            text="OK"
          />
        </DialogFooter>
      </Dialog>
    </div>
  );
};

export default Employees;


