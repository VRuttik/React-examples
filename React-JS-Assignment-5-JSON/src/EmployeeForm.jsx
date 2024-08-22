import React, { useState } from "react";
import { TextField, PrimaryButton, Stack } from "@fluentui/react";
import styles from "./EmployeeForm.module.css";

const EmployeeForm = ({ onAddEmployee, onCancel }) => {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [dob, setDob] = useState("");

  const handleSubmit = () => {
    const newEmployee = {
      name,
      address,
      dob,
    };
    onAddEmployee(newEmployee);
    
    setName("");
    setAddress("");
    setDob("");
  };

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <h1 className={styles.heading}>Add Employee</h1>
        <Stack tokens={{ childrenGap: 15 }} maxWidth={400}>
          <TextField
            className={styles.TextField}
            label="Name"
            value={name}
            onChange={(e, newValue) => setName(newValue || "")}
            required
          />
          <TextField
            className={styles.TextField}
            label="Address"
            value={address}
            onChange={(e, newValue) => setAddress(newValue || "")}
            required
          />
          <TextField
            className={styles.TextField}
            label="Date of Birth"
            value={dob}
            onChange={(e, newValue) => setDob(newValue || "")}
            type="date"
            required
          />
          <div className={styles.buttonsContainer}>
            <PrimaryButton text="Cancel" onClick={onCancel} />
            <PrimaryButton text="Submit" onClick={handleSubmit} />
          </div>
        </Stack>
      </div>
    </div>
  );
};

export default EmployeeForm;



