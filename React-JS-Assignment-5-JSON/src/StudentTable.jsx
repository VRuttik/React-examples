import React, { useState } from "react";
import {
  DefaultButton,
  PrimaryButton,
  DetailsList,
  DetailsListLayoutMode,
  Modal,
  Stack,
} from "@fluentui/react";
import StudentData from "./JSON Data/Students.json";
import { useNavigate } from "react-router-dom";
import StudentForm from "./StudentForm";

const StudentTable = () => {
  const [students, setStudents] = useState(StudentData);
  const [showForm, setShowForm] = useState(false);

  const columns = [
    {
      key: "column1",
      name: "Sr. NO",
      fieldName: "id",
      minWidth: 50,
      maxWidth: 100,
      isResizable: true,
    },
    {
      key: "column2",
      name: "First Name",
      fieldName: "firstName",
      minWidth: 100,
      maxWidth: 150,
      isResizable: true,
    },
    {
      key: "column3",
      name: "Last Name",
      fieldName: "lastName",
      minWidth: 100,
      maxWidth: 150,
      isResizable: true,
    },
    {
      key: "column4",
      name: "Email Address",
      fieldName: "email",
      minWidth: 150,
      maxWidth: 200,
      isResizable: true,
    },
    {
      key: "column5",
      name: "Mobile No",
      fieldName: "mobile",
      minWidth: 100,
      maxWidth: 150,
      isResizable: true,
    },
  ];

  const handleAddStudent = (newStudent) => {
    setStudents([...students, newStudent]);
    setShowForm(false);
  };

  const handleCancel = () => {
    setShowForm(false);
  };

  const navigate = useNavigate();

  return (
    <div>
      <h1
        style={{
          textAlign: "center",
          color: "purple",
          textDecoration: "underline",
          marginBottom: "20px",
        }}
      >
        Student Data
      </h1>
      <Stack horizontal horizontalAlign="space-between">
        <DefaultButton
          text="Back"
          onClick={() => navigate("/")}
        />
        <PrimaryButton text="Add Student" onClick={() => setShowForm(true)} />
      </Stack>

      <Modal
        isOpen={showForm}
        onDismiss={handleCancel}
        isBlocking={false}
        styles={{ main: { maxWidth: 600, margin: "0 auto" } }}
      >
        <StudentForm onAddStudent={handleAddStudent} onCancel={handleCancel} />
      </Modal>

      <DetailsList
        items={students}
        columns={columns}
        setKey="set"
        layoutMode={DetailsListLayoutMode.justified}
        selectionPreservedOnEmptyClick={true}
        ariaLabelForSelectionColumn="Toggle selection"
        ariaLabelForSelectAllCheckbox="Toggle selection for all items"
        checkButtonAriaLabel="select row"
        styles={{ root: { pointerEvents: showForm ? "none" : "auto" } }} // Disable table interactions while form is open
      />
    </div>
  );
};

export default StudentTable;
