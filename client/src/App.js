import React from "react";
import CalcProcessing from "./Calc/CalcProcessing";
// import LoginModule from "./Menu/Login";
import samuel from "./Calc/samuel2.jpg";

function App() {
  return (
    <div>
      <div className="header">
        <img src={samuel} alt={samuel} />
      </div>
      <div className="wrapper">
        {/* <LoginModule /> */}
        <CalcProcessing />
      </div>
    </div>
  );
}

export default App;
