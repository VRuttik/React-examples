import React, { Component, createRef } from "react";
import { TextField, PrimaryButton } from "@fluentui/react";

class Calculator extends Component {
  constructor(props) {
    super(props);
    this.firstNumberRef = createRef();
    this.secondNumberRef = createRef();
    this.outputRef = createRef();
  }

  calculate = (operation) => {
    const a = parseFloat(this.firstNumberRef.current.value);
    const b = parseFloat(this.secondNumberRef.current.value);

    if (isNaN(a) || isNaN(b)) {
      alert("Invalid Input: Please enter valid numbers.");
      this.outputRef.current.innerText = "Invalid Input";
      return;
    }

    if (operation === "divide" && b === 0) {
      alert("Cannot divide by 0");
      this.outputRef.current.innerText = "Cannot divide by 0";
      return;
    }

    let result;

    switch (operation) {
      case "add":
        result = a + b;
        break;
      case "subtract":
        result = a - b;
        break;
      case "multiply":
        result = a * b;
        break;
      case "divide":
        result = (a / b).toFixed(2);
        break;
      default:
        result = "Invalid operation";
    }

    this.outputRef.current.innerHTML = `<h2>Result: ${result}</h2>`;
  };

  render() {
    return (
      <div
        style={{
          width: "80%",
          justifyContent: "center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: "50px",
        }}
      >
        <TextField
          label="First Number:"
          placeholder="Enter the first number"
          componentRef={this.firstNumberRef}
          style={{ marginBottom: "10px" }}
        />
        <TextField
          label="Second Number:"
          placeholder="Enter the second number"
          componentRef={this.secondNumberRef}
          style={{ marginBottom: "10px" }}
        />

        <div
          style={{
            display: "flex",
            marginBottom: "10px",
            padding: "10px",
            marginLeft: "0px",
            marginTop: "10px",
          }}
        >
          <PrimaryButton
            text="Add"
            onClick={() => this.calculate("add")}
            style={{ marginRight: "5px" }}
          />
          <PrimaryButton
            text="Subtract"
            onClick={() => this.calculate("subtract")}
            style={{ marginRight: "5px" }}
          />
        </div>

        <div
          style={{
            display: "flex",
            marginBottom: "10px",
            padding: "10px",
            marginLeft: "0px",
          }}
        >
          <PrimaryButton
            text="Multiply"
            onClick={() => this.calculate("multiply")}
            style={{ marginRight: "5px" }}
          />
          <PrimaryButton text="Divide" onClick={() => this.calculate("divide")} />
        </div>

        <div id="output" ref={this.outputRef} style={{ marginTop: "10px" }}>
          <h2>Result:</h2>
        </div>
      </div>
    );
  }
}

export default Calculator;

