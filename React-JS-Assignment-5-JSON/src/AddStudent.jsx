import React, { useState } from "react";
import { TextField, PrimaryButton, DefaultButton, Stack, Dialog, DialogType, DialogFooter } from "@fluentui/react";
import styles from "./StudentForm.module.css"; // Import the CSS module

const AddStudent = ({ onAddStudent, onCancel }) => {
  const [studentName, setStudentName] = useState("");
  const [mathMarks, setMathMarks] = useState("");
  const [scienceMarks, setScienceMarks] = useState("");
  const [englishMarks, setEnglishMarks] = useState("");
  const [isDialogVisible, setIsDialogVisible] = useState(false);

  const handleAddStudent = () => {
    const newStudent = {
      name: studentName,
      marks: {
        math: parseInt(mathMarks, 10),
        science: parseInt(scienceMarks, 10),
        english: parseInt(englishMarks, 10),
      },
    };
    onAddStudent(newStudent);

    // Clear form fields
    setStudentName("");
    setMathMarks("");
    setScienceMarks("");
    setEnglishMarks("");

    // Show success dialog
    setIsDialogVisible(true);
  };

  const handleDialogDismiss = () => {
    setIsDialogVisible(false); // Hide dialog
  };

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <h2 className={styles.heading}>Add New Student</h2>
        <Stack tokens={{ childrenGap: 15 }} maxWidth={400}>
          <TextField
            label="Student Name"
            value={studentName}
            onChange={(e, newValue) => setStudentName(newValue || "")}
            required
            className={styles.textField}
          />
          <Stack horizontal tokens={{ childrenGap: 15 }}>
            <TextField
              label="Math Marks"
              value={mathMarks}
              onChange={(e, newValue) => setMathMarks(newValue || "")}
              type="number"
              required
              className={styles.textField}
            />
            <TextField
              label="Science Marks"
              value={scienceMarks}
              onChange={(e, newValue) => setScienceMarks(newValue || "")}
              type="number"
              required
              className={styles.textField}
            />
            <TextField
              label="English Marks"
              value={englishMarks}
              onChange={(e, newValue) => setEnglishMarks(newValue || "")}
              type="number"
              required
              className={styles.textField}
            />
          </Stack>
          <div className={styles.buttonContainer}>
            <DefaultButton text="Cancel" onClick={onCancel} />
            <PrimaryButton text="Add" onClick={handleAddStudent} />
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

export default AddStudent;


