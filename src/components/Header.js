import React from "react";
import logo from "../images/logo.svg";
import { Link, Route } from "react-router-dom";

function Header({ email, handleLogout, loggedIn }) {
  return (
    <header className="header section">
      <img className="logo" src={logo} alt="логотип Место" />
      <div className="header__section">
        {loggedIn && (
          <Route exact path="/">
            <p className="header__email">{email}</p>
            <Link
              to="/sign-in"
              className="header__button header__button_type_logout"
              onClick={handleLogout}
            >
              Выйти
            </Link>
          </Route>
        )}

        <Route path="/sign-up">
          <Link to="/sign-in" className="header__button">
            Войти
          </Link>
        </Route>

        <Route path="/sign-in">
          <Link to="/sign-up" className="header__button">
            Регистрация
          </Link>
        </Route>
      </div>
    </header>
  );
}

export default Header;