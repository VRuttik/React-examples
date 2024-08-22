import React, { useState } from "react";
import { TextField, DefaultButton, Modal } from "@fluentui/react";

export default function Content() {
  
  const [value1, setValue1] = useState("");
  const [value2, setValue2] = useState("");
  const [value3, setValue3] = useState("");
  const [items, setItems] = useState([]);
  const [originalItems, setOriginalItems] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState("");
  const [modalMessage, setModalMessage] = useState("");

  const addItem = () => {
    const trimmedValue = value1.trim();
    if (trimmedValue !== "") {
      if (
        items.some((item) => item.toLowerCase() === trimmedValue.toLowerCase())
      ) {
        setModalMessage(`${trimmedValue} is already in the list`);
        setIsModalOpen(true);
      } else {
        const updatedItems = [...items, trimmedValue];
        setItems(updatedItems);
        setOriginalItems(updatedItems);
      }
      setValue1("");
    }
  };

  const openDeleteModal = () => {
    const trimmedValue = value2.trim();
    if (trimmedValue !== "") {
      const itemExists = items.some(
        (item) => item.toLowerCase() === trimmedValue.toLowerCase(),
      );
      if (!itemExists) {
        setModalMessage(`${trimmedValue} is not in the list`);
        setIsModalOpen(true);
      } else {
        setItemToDelete(trimmedValue);
        setModalMessage(`Are you sure you want to delete "${trimmedValue}"?`);
        setIsModalOpen(true);
      }
    }
  };

    const confirmDeleteItem = () => {
    const updatedItems = items.filter(
      (item) => item.toLowerCase() !== itemToDelete.toLowerCase(),
    );
    setItems(updatedItems);
    setOriginalItems(updatedItems);
    setIsModalOpen(false);
    setValue2("");
  };

  const searchItem = () => {
    const trimmedValue = value3.trim();
    if (trimmedValue === "") {
      setItems(originalItems);
    } else {
      const foundItems = originalItems.filter((item) =>
        item.toLowerCase().startsWith(trimmedValue.toLowerCase()),
      );
      setItems(foundItems);
    }
  };

  return (
    <>
      <h1>Shopping Cart</h1>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          marginBottom: "10px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <label style={{ fontWeight: "200" }}>Add Item:</label>
          <TextField
            value={value1}
            onChange={(e, newValue) => setValue1(newValue || "")}
            placeholder="Enter item to add"
            style={{ flexGrow: 1 }}
          />
          <DefaultButton
            text="Add"
            onClick={addItem}
            style={{ backgroundColor: "#ffbd03", color: "white" }}
          />
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <label style={{ fontWeight: "200" }}>Delete Item:</label>
          <TextField
            value={value2}
            onChange={(e, newValue) => setValue2(newValue || "")}
            placeholder="Enter item to delete"
            style={{ flexGrow: 1 }}
          />
          <DefaultButton
            text="Delete"
            onClick={openDeleteModal}
            style={{ backgroundColor: "#ffbd03", color: "white" }}
          />
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <label style={{ fontWeight: "200" }}>Search Item:</label>
          <TextField
            value={value3}
            onChange={(e, newValue) => {
              setValue3(newValue || "");
              if (!newValue) {
                setItems(originalItems);
              }
            }}
            placeholder="Enter item to search"
            style={{ flexGrow: 1 }}
          />
          <DefaultButton
            text="Search"
            onClick={searchItem}
            style={{ backgroundColor: "#ffbd03", color: "white" }}
          />
        </div>
      </div>
      <ul>
        {items.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>

      <Modal
        isOpen={isModalOpen}
        onDismiss={() => setIsModalOpen(false)}
        isBlocking={false}
      >
        <div style={{ padding: "20px" }}>
          <h2>
            {modalMessage.includes("Are you sure") ? "Confirm Delete" : "Alert"}
          </h2>
          <p>{modalMessage}</p>
          <div
            style={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}
          >
            {modalMessage.includes("Are you sure") ? (
              <>
                <DefaultButton
                  text="Cancel"
                  onClick={() => setIsModalOpen(false)}
                  style={{ backgroundColor: "#cccccc", color: "black" }}
                />
                <DefaultButton
                  text="Delete"
                  onClick={confirmDeleteItem}
                  style={{ backgroundColor: "#d9534f", color: "white" }}
                />
              </>
            ) : (
              <DefaultButton
                text="Close"
                onClick={() => setIsModalOpen(false)}
                style={{ backgroundColor: "#cccccc", color: "black" }}
              />
            )}
          </div>
        </div>
      </Modal>
    </>
  );
}
