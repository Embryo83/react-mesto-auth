import React, { useState } from "react";
import { Link } from "react-router-dom";

const Login = ({ handleLogin }) => {
  const [data, setData] = useState({
    password: "",
    email: "",
  });
  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    let { password, email } = data;
    handleLogin(password, email);
  };

  return (
    <section className="login">
      <div className="login__container">
        <h3 className="login__title">Вход</h3>
        <form onSubmit={handleSubmit} className="login__form" name="login">
          <input
            onChange={handleChange}
            className="login__input-email"
            id="email"
            value={data.email}
            type="email"
            name="email"
            placeholder="Email"
          />
          <input
            onChange={handleChange}
            className="login__input-password"
            value={data.password}
            type="password"
            name="password"
            placeholder="Пароль"
          />
          <button type="submit" className="login__submit-button">
            Войти
          </button>
          <div className="login__signup-container">
            <p>
              Ещё не зарегистрированы?{" "}
              <Link to="sign-up" className="login__signup">
                Регистрация
              </Link>
            </p>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Login;