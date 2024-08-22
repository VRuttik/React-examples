import React, { useState } from "react";
import { TextField, PrimaryButton, Stack, DefaultButton, Dialog, DialogType, DialogFooter } from "@fluentui/react";
import styles from "./StudentForm.module.css"; // Import the CSS module

const StudentForm = ({ onAddStudent, onCancel }) => {
  const [firstName, setFirstName] = useState("");
  const [secondName, setSecondName] = useState("");
  const [lastName, setLastName] = useState("");
  const [rollNo, setRollNo] = useState("");
  const [className, setClassName] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [address, setAddress] = useState("");
  const [isDialogVisible, setIsDialogVisible] = useState(false);

  const handleSubmit = () => {
    const newStudent = {
      firstName,
      secondName,
      lastName,
      rollNo,
      class: className,
      birthdate,
      address,
    };
    onAddStudent(newStudent); // Pass data back to parent component

    // Clear form fields
    setFirstName("");
    setSecondName("");
    setLastName("");
    setRollNo("");
    setClassName("");
    setBirthdate("");
    setAddress("");

    // Show success dialog
    setIsDialogVisible(true);
  };

  const handleDialogDismiss = () => {
    setIsDialogVisible(false); // Hide dialog
  };

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <h1 className={styles.heading}>Add Student</h1>
        <Stack tokens={{ childrenGap: 15 }} maxWidth={400}>
          <Stack horizontal tokens={{ childrenGap: 15 }}>
            <TextField
              label="First Name"
              value={firstName}
              onChange={(e, newValue) => setFirstName(newValue || "")}
              required
              className={styles.textField}
            />
            <TextField
              label="Second Name"
              value={secondName}
              onChange={(e, newValue) => setSecondName(newValue || "")}
              required
              className={styles.textField}
            />
          </Stack>
          <Stack horizontal tokens={{ childrenGap: 15 }}>
            <TextField
              label="Last Name"
              value={lastName}
              onChange={(e, newValue) => setLastName(newValue || "")}
              required
              className={styles.textField}
            />
            <TextField
              label="Roll No"
              value={rollNo}
              onChange={(e, newValue) => setRollNo(newValue || "")}
              type="number"
              required
              className={styles.textField}
            />
          </Stack>
          <Stack horizontal tokens={{ childrenGap: 15 }}>
            <TextField
              label="Class"
              value={className}
              onChange={(e, newValue) => setClassName(newValue || "")}
              required
              className={styles.textField}
            />
            <TextField
              label="Birthdate"
              value={birthdate}
              onChange={(e, newValue) => setBirthdate(newValue || "")}
              type="date"
              required
              className={styles.textField}
            />
          </Stack>
          <TextField
            label="Address"
            value={address}
            onChange={(e, newValue) => setAddress(newValue || "")}
            multiline
            required
            className={styles.textField}
          />
          <div className={styles.buttonContainer}>
            <DefaultButton text="Cancel" onClick={onCancel} />
            <PrimaryButton text="Submit" onClick={handleSubmit} />
          </div>
        </Stack>
      </div>

      {/* Success Dialog */}
      <Dialog
        hidden={!isDialogVisible}
        onDismiss={handleDialogDismiss}
        dialogContentProps={{
          type: DialogType.largeHeader,
          title: 'Success',
          subText: 'Student added successfully!'
        }}
      >
        <DialogFooter>
          <PrimaryButton onClick={handleDialogDismiss} text="OK" />
        </DialogFooter>
      </Dialog>
    </div>
  );
};

export default StudentForm;

