import React, {useEffect } from "react";
import Table from "./Table";

function CalcProcessing() {
  let [fetchResult, setFetchResult] = React.useState([]);
  const tryFetch = function () {
    fetch(process.env.REACT_APP_BACK_URL, {
      method: "POST",
      body: JSON.stringify(buffer),
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setFetchResult(data);
        console.log('fetchResult: ', fetchResult);
      })
      .catch((err) => console.log(err));
  };

  let [buffer, setBuffer] = React.useState([]);
  
  useEffect(() => {
    // Обновляем заголовок документа с помощью API браузера
    tryFetch();
  });

  function keyPressed(key, symbol, type) {
    let comp = [{ key: key, symbol: symbol, type: type }];
    const simpleInsert = function () {
      return setBuffer(buffer.concat(comp));
    };

    if (buffer.length === 0) {
      if (type === "operation" || type === "point") {
        setBuffer(
          buffer.concat([{ key: 0, symbol: 0, type: "digit" }]).concat(comp)
        );
      } else {
        simpleInsert();
      }
    } else {
      if (type === "operation") {
        if (
          buffer[buffer.length - 1].type === "operation" ||
          buffer[buffer.length - 1].type === "point"
        ) {
          setBuffer(buffer.splice(0, buffer.length - 1).concat(comp));
        } else {
          simpleInsert();
        }
      } else if (type === "point") {
        if (buffer[buffer.length - 1].type === "point") {
        } else if (buffer[buffer.length - 1].type === "operation") {
          setBuffer(
            buffer.concat([{ key: 0, symbol: 0, type: "digit" }]).concat(comp)
          );
        } else {
          let flag = false;
          if (
            buffer
              .map((item) => {
                if (item.type === "point") {
                  flag = true;
                } else if (item.type === "operation") {
                  flag = false;
                }
                return flag;
              })
              .pop() === false
          ) {
            simpleInsert();
          }
        }
      } else if (key === 0) {
        let flagZero = true;
        let flagPoint = false;
        let flagDigit = false;

        buffer.map(function (item) {
          if (item.key === 0) {
            flagZero = false;
          }
          if (item.key > 0) {
            flagZero = true;
            flagDigit = true;
          }
          if (item.type === "point") {
            flagZero = true;
            flagPoint = true;
          }
          if (item.type === "operation") {
            flagZero = true;
            flagPoint = false;
            flagDigit = false;
          }
          return undefined;
        });

        if ((flagZero || flagPoint || flagDigit) === true) {
          setBuffer(buffer.concat(comp));
        }
      } else if (key > 0) {
        if (buffer.length === 0) {
          simpleInsert();
        }

        if (buffer.length !== 0) {
          if (buffer[buffer.length - 1].key === 0) {
            let flag1 = true;
            let flag2 = true;

            buffer.map(function (item) {
              if (item.key > 0) {
                flag1 = false;
              }
              if (item.type === "point") {
                flag2 = false;
              }

              if (item.type === "operation") {
                flag1 = true;
                flag2 = true;
              }
              return undefined;
            });

            if (flag1 === true && flag2 === true) {
              setBuffer(buffer.splice(0, buffer.length - 1).concat(comp));
            } else {
              simpleInsert();
            }
          } else {
            simpleInsert();
          }
        }
      }
    }
  }

  function cancelEntry() {
    setBuffer(buffer.splice(0, buffer.length - 1));
  }
  function clearAll() {
    setBuffer([]);
  }

  function getResult() {
    setBuffer([{ key: fetchResult, symbol: fetchResult, type: "number" }]);
  }
  // let res;
  // function CalculateResult() {
  //   if (buffer.length === 0) {
  //     res = 0;
  //   }
  //   if (buffer.length !== 0) {
  //     if (buffer[buffer.length - 1].type === "number") {
  //       res = eval(
  //         buffer
  //           .map((item) => {
  //             return item.key;
  //           })
  //           .join("")
  //       );
  //     } else {
  //       res = eval(
  //         buffer
  //           .slice(0, buffer.length - 1)
  //           .map((item) => {
  //             return item.key;
  //           })
  //           .join("")
  //       );
  //     }
  //   }
  //   console.log(buffer);
  //   return <h1>Result: {fetchResult}</h1>;
  // }

  function BufferOperation() {
    let buff;
    if (buffer.length === 0) {
      buff = 0;
    }
    if (buffer.length !== 0) {
      buff = buffer
        .map(function (item) {
          return item.symbol;
        })
        .join("");
    }
    return <h1>Buffer: {buff}</h1>;
  }

  return (
    <div>
      <h1>ENGLISH, MOTHERFUCKER!!</h1>
      {/* <CalculateResult /> */}
      <h1>Result: {fetchResult}</h1>
      <BufferOperation />
      <Table
        keyPressed={keyPressed}
        cancelEntry={cancelEntry}
        clearAll={clearAll}
        getResult={getResult}
      />
    </div>
  );
}

export default CalcProcessing;
