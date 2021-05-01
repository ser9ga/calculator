import React from "react";



function Table({ keyPressed, cancelEntry, clearAll, getResult }) {
  const styles = {
    button: {
      digit: {
        width: "100px",
        height: "50px",
        margin: "3px",
        fontSize: "25pt",
        borderRadius: "7px",
        borderWidth: "1px",
      },
      functional: {
        width: "100px",
        height: "50px",
        margin: "3px",
        fontSize: "25pt",
        background: "silver",
        borderRadius: "7px",
        borderWidth: "1px",
      },
    },
  };

  
  const button = function (key, symbol, type) {
    if (typeof key === "number") {
      symbol = key;
      type = "number";
    }
    let styling;
    if (typeof key === "number" || type === "point") {
      styling = styles.button.digit;
    } else {
      styling = styles.button.functional;
    }

    return (
      <td>
        <button
          style={styling}
          onClick={() => {
            if (type === "number" || "point" || "operation") {
              keyPressed(key, symbol, type);
            }
            if (type === "cancelEntry") {
              cancelEntry();
            }
            if (type === "clearAll") {
              clearAll();
            }
            if (type === "getResult") {
              getResult();
            }
          }}
        >
          {symbol}
        </button>
      </td>
    );
  };

  return (
    <table>
      <tbody>
        <tr>
          {button(1)}
          {button(2)}
          {button(3)}
          {button("/", "÷", "operation")}
        </tr>
        <tr>
          {button(4)}
          {button(5)}
          {button(6)}
          {button("*", "×", "operation")}
        </tr>
        <tr>
          {button(7)}
          {button(8)}
          {button(9)}
          {button("-", "-", "operation")}
        </tr>
        <tr>
          {button("CE", "CE", "cancelEntry")}
          {button(0)}
          {button(".", ".", "point")}
          {button("+", "+", "operation")}
        </tr>
        <tr>
          {button("C", "C", "clearAll")}
          <td></td>
          <td></td>
          {button("=", "=", "getResult")}
        </tr>
      </tbody>
    </table>
  );
}

export default Table;
