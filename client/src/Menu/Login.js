import React from "react";

function LoginModule() {
  let accounts = [
    { id: 0, login: "ser9ga", password: "1234" },
    { id: 1, login: "maxonroke", password: "4321" },
    { id: 2, login: "guest", password: "0000" },
  ];

  function loginButton() {
    function handleClick(e) {
      e.preventDefault();
    }

    return (
      <div style={{width: "100%", borderWidth: "2px", borderStyle: "solid"}}>
        <button>Войти</button>
        <tr><td>Пользователь:</td>&nbsp;<td><input></input></td></tr>
        <tr><td>Пароль:</td>&nbsp;<td><input></input></td></tr>
      </div>
    );
  }

  return loginButton ()
}

export default LoginModule;
