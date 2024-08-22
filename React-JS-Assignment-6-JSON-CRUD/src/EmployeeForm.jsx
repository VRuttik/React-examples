import React, { useState } from "react";
import {
  TextField,
  PrimaryButton,
  DefaultButton,
  Stack,
  DatePicker,
} from "@fluentui/react";
import styles from "./EmployeeForm.module.css";

const EmployeeForm = ({ employee, onAddEmployee, onCancel }) => {
  const [name, setName] = useState(employee ? employee.name : "");
  const [address, setAddress] = useState(employee ? employee.address : "");
  const [dob, setDob] = useState(
    employee ? new Date(employee.dob) : new Date(),
  );

  // Define min and max date
  const minDate = new Date(1900, 0, 1); // January 1, 1900
  const maxDate = new Date(2024, 11, 31); // December 31, 2024

  const handleSubmit = () => {
    const newEmployee = {
      id: employee?.id || Date.now(),
      name,
      address,
      dob: dob.toISOString(),
    };
    onAddEmployee(newEmployee);
  };

  return (
    <div className={styles.formContainer}>
      <h2 style={{textAlign:"center"}}>{employee ? "Edit Employee" : "Add Employee"}</h2>
      <Stack tokens={{ childrenGap: 15 }}>
        <TextField
          label="Name"
          value={name}
          onChange={(e, newValue) => setName(newValue || "")}
          required
        />
        <TextField
          label="Address"
          value={address}
          onChange={(e, newValue) => setAddress(newValue || "")}
          required
        />
        <DatePicker
          label="Date of Birth"
          value={dob}
          onSelectDate={(date) => setDob(date || new Date())}
          placeholder="Select a date"
          ariaLabel="Select a date"
          minDate={minDate}
          maxDate={maxDate}
        />
        <Stack
          horizontal
          tokens={{ childrenGap: 40 }}
          horizontalAlign="center"
          verticalAlign="center"
        >
          <DefaultButton onClick={onCancel}>Cancel</DefaultButton>
          <PrimaryButton onClick={handleSubmit}>
            {employee ? "Update" : "Submit"}
          </PrimaryButton>
        </Stack>
      </Stack>
    </div>
  );
};

export default EmployeeForm;
