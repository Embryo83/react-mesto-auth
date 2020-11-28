import React, { useState } from "react";
import { Link } from "react-router-dom";

const Register = ({ handleRegister }) => {
  const [data, setData] = useState({
    password: "",
    email: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let { password, email } = data;
    handleRegister(password, email);
  };

  return (
    <section className="login">
      <div className="login__container">
        <h3 className="login__title">Регистрация</h3>
        <form className="login__form" name="login" onSubmit={handleSubmit}>
          <input
            onChange={handleChange}
            className="login__input-email"
            value={data.email}
            id="email"
            type="email"
            name="email"
            placeholder="Email"
          />
          <input
            onChange={handleChange}
            className="login__input-password"
            value={data.password}
            id="password"
            type="password"
            name="password"
            placeholder="Пароль"
          />
          <button
            onSubmit={handleSubmit}
            type="submit"
            className="login__submit-button"
          >
            Зарегистрироваться
          </button>
          <div className="login__signup-container">
            <p>
              Уже зарегистрированы?{" "}
              <Link to="sign-in" className="login__signup">
                Войти
              </Link>
            </p>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Register;
