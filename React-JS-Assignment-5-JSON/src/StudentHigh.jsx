import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  DetailsList,
  DetailsListLayoutMode,
  SelectionMode,
} from "@fluentui/react/lib/DetailsList";
import {
  DefaultButton,
  PrimaryButton,
  Stack,
  Dialog,
  DialogType,
  DialogFooter,
} from "@fluentui/react";
import AddStudent from "./AddStudent";
import "./StudentHigh.css"; // Import the CSS file

const Student2 = () => {
  const [students, setStudents] = useState([
    {
      name: "John Doe",
      marks: {
        math: 85,
        science: 78,
        english: 92,
      },
    },
    {
      name: "Jane Smith",
      marks: {
        math: 79,
        science: 88,
        english: 95,
      },
    },
    {
      name: "Alice Johnson",
      marks: {
        math: 90,
        science: 82,
        english: 88,
      },
    },
    {
      name: "Bob Brown",
      marks: {
        math: 72,
        science: 85,
        english: 78,
      },
    },
  ]);

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDialogVisible, setIsDialogVisible] = useState(false);

  const getStudentsWithHighMathMarks = () => {
    const maxMathMarks = Math.max(
      ...students.map((student) => student.marks.math)
    );
    return students
      .filter((student) => student.marks.math === maxMathMarks)
      .map((student, index) => ({
        key: index,
        srNo: index + 1,
        name: student.name,
        mathMarks: student.marks.math,
      }));
  };

  const columns = [
    {
      key: "column1",
      name: "Sr. No.",
      fieldName: "srNo",
      minWidth: 50,
      maxWidth: 100,
      isResizable: true,
    },
    {
      key: "column2",
      name: "Name",
      fieldName: "name",
      minWidth: 100,
      maxWidth: 200,
      isResizable: true,
    },
    {
      key: "column3",
      name: "Math Marks",
      fieldName: "mathMarks",
      minWidth: 50,
      maxWidth: 100,
      isResizable: true,
    },
  ];

  const handleAddStudent = (newStudent) => {
    setStudents((prevStudents) => [...prevStudents, newStudent]);
    setIsFormOpen(false); // Close the form after adding the student
    setIsDialogVisible(true); // Show the success dialog
  };

  const handleCancel = () => {
    setIsFormOpen(false); // Close the form without adding a student
  };

  const handleDialogDismiss = () => {
    setIsDialogVisible(false); // Hide the success dialog
  };

  const navigate = useNavigate();

  return (
    <div className={`container ${isFormOpen ? "overlay" : ""}`}>
      <h1 style={{ textAlign: "center" }}>Student Data</h1> {/* Heading at the top */}
      <Stack horizontal horizontalAlign="space-between" tokens={{ childrenGap: 10 }}>
        <DefaultButton text="Back" onClick={() => navigate("/")} />
        <PrimaryButton text="Add Student" onClick={() => setIsFormOpen(true)} />
      </Stack>

      <div className="tableContainer">
        {isFormOpen && <div className="tableOverlay" />}
        <div className="detailsListContainer">
          <h2 style={{ textAlign: "center" }}>All Students</h2>
          <DetailsList
            items={students.map((student, index) => ({
              key: index,
              srNo: index + 1,
              name: student.name,
              mathMarks: student.marks.math,
              scienceMarks: student.marks.science,
              englishMarks: student.marks.english,
            }))}
            columns={[
              {
                key: "column1",
                name: "Sr. No.",
                fieldName: "srNo",
                minWidth: 50,
                maxWidth: 100,
              },
              {
                key: "column2",
                name: "Name",
                fieldName: "name",
                minWidth: 100,
                maxWidth: 200,
              },
              {
                key: "column3",
                name: "Math Marks",
                fieldName: "mathMarks",
                minWidth: 50,
                maxWidth: 100,
              },
              {
                key: "column4",
                name: "Science Marks",
                fieldName: "scienceMarks",
                minWidth: 50,
                maxWidth: 100,
              },
              {
                key: "column5",
                name: "English Marks",
                fieldName: "englishMarks",
                minWidth: 50,
                maxWidth: 100,
              },
            ]}
            setKey="set"
            layoutMode={DetailsListLayoutMode.fixedColumns}
            selectionMode={SelectionMode.none}
          />
        </div>

        <div>
          <h2 style={{ textAlign: "center" }}>Students with Highest Math Marks</h2>
          <DetailsList
            items={getStudentsWithHighMathMarks()}
            columns={columns}
            setKey="set"
            layoutMode={DetailsListLayoutMode.fixedColumns}
            selectionMode={SelectionMode.none}
          />
        </div>
      </div>

      {isFormOpen && (
        <div className="formContainer">
          <AddStudent onAddStudent={handleAddStudent} onCancel={handleCancel} />
        </div>
      )}

      {/* Success Dialog */}
      <Dialog
        hidden={!isDialogVisible}
        onDismiss={handleDialogDismiss}
        dialogContentProps={{
          type: DialogType.largeHeader,
          title: "Success",
          subText: "Student added successfully!",
        }}
      >
        <DialogFooter>
          <PrimaryButton onClick={handleDialogDismiss} text="OK" />
        </DialogFooter>
      </Dialog>
    </div>
  );
};

export default Student2;

