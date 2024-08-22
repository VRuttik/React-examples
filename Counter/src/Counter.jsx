import React, { Component } from "react";
import { DefaultButton } from "@fluentui/react";

class Counter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
    };
  }

  increase = () => {
    this.setState({ count: this.state.count + 1 });
  };

  decrease = () => {
    this.setState({ count: this.state.count - 1 });
  };

  reset = () => {
    this.setState({ count: 0 });
  };

  render() {
    const { count } = this.state;

    let backgroundColor;
    if (count > 0) {
      backgroundColor = "green";
    } else if (count < 0) {
      backgroundColor = "red";
    } else {
      backgroundColor = "orange";
    }

    return (
      <div>
        <h1>
          Counter:{" "}
          <span
            style={{
              backgroundColor,
              color: "white",
              padding: "5px 10px",
              borderRadius: "5px",
            }}
          >
            {count}
          </span>
        </h1>

        <DefaultButton
          text="Decrease"
          style={{ backgroundColor: "red", color: "white", margin: "10px" }}
          onClick={this.decrease}
        />

        <DefaultButton
          text="Reset"
          style={{ backgroundColor: "blue", color: "white", margin: "10px" }}
          onClick={this.reset}
        />

        <DefaultButton
          text="Increase"
          style={{ backgroundColor: "green", color: "white", margin: "10px" }}
          onClick={this.increase}
        />
      </div>
    );
  }
}

export default Counter;
