/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Redirect, Route, useHistory, Switch } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import Header from "./Header";
import Login from "./Login";
import Register from "./Register";
import InfoTooltip from "./InfoTooltip";
import Main from "./Main";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import ConfirmPopup from "./ConfirmPopup";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import { api } from "../utils/api";
import * as auth from "../utils/auth.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import success from "../images/success.svg";
import fail from "../images/fail.svg";

const App = () => {
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [cards, setCards] = useState([]);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isConfirmPopupOpen, setIsConfirmPopupOpen] = useState(false);
  const [selectedCard, setIsImagePopupOpen] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [cardDelete, setCardDelete] = useState({});
  const [isLoading, setLoading] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = React.useState(false);
  const [tooltipImg, setTooltipImg] = React.useState(success);
  const [message, setMessage] = React.useState("");

  const history = useHistory();

  useEffect(() => {
    tokenCheck();
  }, []);

  const tokenCheck = () => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      auth
        .getContent(jwt)
        .then((res) => {
          if (res) {
            setLoggedIn(true);
            setEmail(res.data.email);
            history.push("/");
          }
        })
        .catch((err) => {
          if (err === "Ошибка: 401") {
            console.log("Токен не передан или передан не в том формате");
          }
          console.log("Переданный токен некорректен");
        });
    }
  };

  const handleRegister = (password, email) => {
    auth
      .register(password, email)
      .then((data) => {
        if (data) {
          localStorage.setItem("jwt", data.jwt);
          setIsInfoTooltipOpen(true);
          setTooltipImg(success);
          setLoggedIn(true);
          setMessage("Вы успешно зарегистрировались!");
          history.push("/sign-in");
        }
      })
      .catch((err) => {
        if (err === "Ошибка: 400") {
          console.log("Некорректно заполнено одно из полей");
        }
        setIsInfoTooltipOpen(true);
        setTooltipImg(fail);
        setMessage("Что-то пошло не так! Попробуйте еще раз");
      });
  };

  const handleLogin = (password, email) => {
    auth
      .authorize(password, email)
      .then((data) => {
        if (data.token) {
          localStorage.setItem("jwt", data.token);
          setEmail(email);
          setLoggedIn(true);
          history.push("/");
        }
      })
      .catch((err) => {
        setIsInfoTooltipOpen(true);
        setTooltipImg(fail);
        setMessage("Что-то пошло не так! Попробуйте ещё раз.");
        if (err === "Ошибка: 400") {
          console.log("Не передано одно из полей");
        } else if (err === "Ошибка: 401") {
          console.log("Пользователь с данным email не найден");
        }
      });
  };

  const handleLogout = () => {
    localStorage.removeItem("jwt");
    setEmail("");
    setLoggedIn(false);
    history.push("/sign-in");
  };

  function userInfo(user) {
    setCurrentUser(user);
  }

  useEffect(() => {
    Promise.all([api.getInitialCards(), api.getUserInfo()])
      .then(([cards, user]) => {
        setCards(cards);
        userInfo(user);
      })
      .catch((err) => console.log(err));
  }, []);

  function handleUpdateUser(user) {
    setLoading(true);
    api
      .editProfile(user.name, user.about)
      .then((user) => {
        userInfo(user);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  function handleUpdateAvatar(data) {
    setLoading(true);
    api
      .editAvatar(data)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleCardClick(card) {
    setIsImagePopupOpen(card);
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    api.handleLike(card._id, !isLiked).then((newCard) => {
      const newCards = cards.map((c) => (c._id === card._id ? newCard : c));
      setCards(newCards);
    });
  }

  function handleConfirmSubmit() {
    setLoading(true);
    api
      .deleteCard(cardDelete._id)
      .then(() => {
        const newCards = cards.filter((c) => c._id !== cardDelete._id);
        setCards(newCards);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  function handleCardDelete(card) {
    setCardDelete(card);
    setIsConfirmPopupOpen(true);
  }

  function handleAddPlaceSubmit(item) {
    setLoading(true);
    api
      .addNewCard(item)
      .then((res) => {
        setCards([res, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsImagePopupOpen({});
    setIsConfirmPopupOpen(false);
    setIsInfoTooltipOpen(false);
  }

  return (
    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>
        <div className="page__container">
          <Header
            loggedIn={loggedIn}
            email={email}
            handleLogout={handleLogout}
          />
          <Switch>
            <Route path="/sign-up">
              <Register
                name="register"
                title="Регистрация"
                submit="Зарегистрироваться"
                handleRegister={handleRegister}
              />
            </Route>
            <Route path="/sign-in">
              <Login
                name="login"
                title="Вход"
                submit="Войти"
                handleLogin={handleLogin}
                handleTokenCheck={tokenCheck}
                loggedIn={loggedIn}
              />
            </Route>
            <ProtectedRoute
              path="/"
              loggedIn={loggedIn}
              component={Main}
              onEditProfile={handleEditProfileClick}
              onEditAvatar={handleEditAvatarClick}
              onAddPlace={handleAddPlaceClick}
              onCardClick={handleCardClick}
              onCardLike={handleCardLike}
              onCardDelete={handleCardDelete}
              cards={cards}
            />

            <Route path="/">
              {loggedIn ? <Redirect to="/" /> : <Redirect to="/sign-in" />}
            </Route>
          </Switch>

          {loggedIn && <Footer />}
          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
            isLoading={isLoading}
          />
          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
            isLoading={isLoading}
          />
          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlace={handleAddPlaceSubmit}
            isLoading={isLoading}
          />
          <ConfirmPopup
            isOpen={isConfirmPopupOpen}
            onClose={closeAllPopups}
            onConfirm={handleConfirmSubmit}
            isLoading={isLoading}
          />
          <ImagePopup card={selectedCard} onClose={closeAllPopups} />
          <InfoTooltip
            isOpen={isInfoTooltipOpen}
            onClose={closeAllPopups}
            tooltipStatus={tooltipImg}
            image={tooltipImg}
            message={message}
            loggedIn={loggedIn}
          />
        </div>
      </CurrentUserContext.Provider>
    </div>
  );
};

export default App;
