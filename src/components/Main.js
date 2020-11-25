import React from "react";
import Card from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Main(props) {
  const currentUser = React.useContext(CurrentUserContext);
  if (props.cards.length === 0) {
    return (
      <section className="profile">
        <h1 className="profile__loading">Загрузка...</h1>
      </section>
    );
  }

  return (
    <main className="page__content">
      <section className="profile section section_narrow">
        <div className="profile__content">
          <div className="profile__user">
            <img
              alt="Аватар"
              src={currentUser.avatar}
              className="profile__avatar"
            />
            <button
              type="button"
              onClick={props.onEditAvatar}
              className="profile__avatar-button"
            ></button>
          </div>
          <div className="profile__info">
            <div className="profile__info-header">
              <h1 className="profile__title">{currentUser.name}</h1>
              <button
                type="button"
                onClick={props.onEditProfile}
                className="profile__edit-button"
              ></button>
            </div>
            <h2 className="profile__subtitle">{currentUser.about}</h2>
          </div>
          <button
            type="button"
            onClick={props.onAddPlace}
            className="profile__add-button"
          ></button>
        </div>
      </section>
      <section className="elements section section_narrow">
        <ul className="elements__list">
          <CurrentUserContext.Provider value={currentUser}>
            {props.cards.map((card) => (
              <Card
                card={card}
                key={card._id}
                onCardClick={props.onCardClick}
                onCardLike={props.onCardLike}
                onCardDelete={props.onCardDelete}
              />
            ))}
          </CurrentUserContext.Provider>
        </ul>
      </section>
    </main>
  );
}

export default Main;