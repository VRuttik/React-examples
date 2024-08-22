import React, { useState } from "react";
import {
  Dialog,
  DialogType,
  DialogFooter,
  DefaultButton,
  PrimaryButton,
  DetailsList,
  DetailsListLayoutMode,
  SelectionMode,
  IconButton,
  TooltipHost,
} from "@fluentui/react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { format } from 'date-fns'; // Import date-fns for formatting dates

const EmployeeTable = ({ employees, onEdit, onDelete }) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState(null);

  const handleDelete = (id) => {
    setSelectedEmployeeId(id);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    onDelete(selectedEmployeeId);
    setShowDeleteModal(false);
    setSelectedEmployeeId(null);
  };

  const columns = [
    {
      key: "column1",
      name: "Name",
      fieldName: "name",
      minWidth: 100,
      maxWidth: 200,
      isMultiline: false,
      isResizable: true,
    },
    {
      key: "column2",
      name: "Address",
      fieldName: "address",
      minWidth: 200,
      maxWidth: 300,
      isResizable: true,
    },
    {
      key: "column3",
      name: "Date of Birth",
      fieldName: "dob",
      minWidth: 100,
      maxWidth: 150,
      isResizable: true,
      onRender: (item) => (
        <span>
          {item.dob ? format(new Date(item.dob), 'MMM d, yyyy') : 'N/A'}
        </span>
      ),
    },
    {
      key: "column4",
      name: "Actions",
      fieldName: "actions",
      minWidth: 100,
      maxWidth: 150,
      isResizable: true,
      onRender: (item) => (
        <div className="actionsColumn">
          <TooltipHost content="Edit">
            <IconButton
              iconProps={{ iconName: "Edit" }}
              onClick={() => onEdit(item)}
            >
              <FontAwesomeIcon icon={faEdit} />
            </IconButton>
          </TooltipHost>
          <TooltipHost content="Delete">
            <IconButton
              iconProps={{ iconName: "Delete" }}
              onClick={() => handleDelete(item.id)}
            >
              <FontAwesomeIcon icon={faTrash} />
            </IconButton>
          </TooltipHost>
        </div>
      ),
    },
  ];

  return (
    <>
      <DetailsList
        items={employees}
        columns={columns}
        setKey="set"
        layoutMode={DetailsListLayoutMode.fixedColumns}
        selectionMode={SelectionMode.none}
        className="detailsList" // Add a CSS class for styling
      />


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
    </>
  );
};

export default EmployeeTable;


