import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import EmployeeForm from "./EmployeeForm";
import EmployeeTable from "./EmployeeTable";
import {
  PrimaryButton,
  DefaultButton,
  Stack,
  Dialog,
  DialogFooter,
  DialogType,
} from "@fluentui/react";
import "./Employees.css";

const Employees = () => {
  const [employees, setEmployees] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [currentEmployee, setCurrentEmployee] = useState(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const storedEmployees = JSON.parse(localStorage.getItem("employees")) || [];
    setEmployees(storedEmployees);
  }, []);

  useEffect(() => {
    localStorage.setItem("employees", JSON.stringify(employees));
  }, [employees]);

  const handleAddEmployee = (employee) => {
    setEmployees((prevEmployees) => {
      if (currentEmployee) {
        return prevEmployees.map((emp) =>
          emp.id === employee.id ? employee : emp,
        );
      } else {
        return [...prevEmployees, { ...employee, id: Date.now() }];
      }
    });
    setShowForm(false);
    setShowSuccessModal(true);
    setCurrentEmployee(null);
  };

  const handleEditEmployee = (employee) => {
    setCurrentEmployee(employee);
    setShowForm(true);
  };

  const handleDeleteEmployee = (id) => {
    setSelectedEmployeeId(id);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    setEmployees(employees.filter((emp) => emp.id !== selectedEmployeeId));
    setShowDeleteModal(false);
    setSelectedEmployeeId(null);
  };

  const handleCancel = () => {
    setShowForm(false);
    setCurrentEmployee(null);
  };

  return (
    <div className="employees-container">

      <h2 style={{textAlign:"center",marginTop:"70px", fontFamily:"sans-serif"}}>Employee List</h2>
      <Stack
        horizontal
        tokens={{ childrenGap: 15 }}
        className="buttonContainer"
      >
        <DefaultButton
          text="Back"
          className="backButton"
          onClick={() => navigate("/")}
        />
        <PrimaryButton
          text="Add Employee"
          className="addEmployeeButton"
          onClick={() => setShowForm(true)}
        />
      </Stack>
      {employees.length > 0 && !showForm && (
        <EmployeeTable
          employees={employees}
          onEdit={handleEditEmployee}
          onDelete={handleDeleteEmployee}
          className="employeeTable"
        />
      )}

      {showForm && (
        <EmployeeForm
          employee={currentEmployee}
          onAddEmployee={handleAddEmployee}
          onCancel={handleCancel}
        />
      )}

      {/* Success Modal */}
      <Dialog
        hidden={!showSuccessModal}
        onDismiss={() => setShowSuccessModal(false)}
        dialogContentProps={{
          type: DialogType.largeHeader,
          title: "Success",
          subText: "Employee added/updated successfully!",
        }}
      >
        <DialogFooter>
          <PrimaryButton onClick={() => setShowSuccessModal(false)} text="OK" />
        </DialogFooter>
      </Dialog>

      {/* Delete Confirmation Modal */}
      <Dialog
        hidden={!showDeleteModal}
        onDismiss={() => setShowDeleteModal(false)}
        dialogContentProps={{
          type: DialogType.largeHeader,
          title: "Confirm Deletion",
          subText: "Are you sure you want to delete this employee?",
        }}
      >
        <DialogFooter>
          <PrimaryButton onClick={confirmDelete} text="Yes" />
          <DefaultButton onClick={() => setShowDeleteModal(false)} text="No" />
        </DialogFooter>
      </Dialog>
    </div>
  );
};

export default Employees;
