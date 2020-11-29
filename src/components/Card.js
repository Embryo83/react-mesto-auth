import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import cn from "classnames";
import PropTypes from "prop-types";

function Card(props) {
  const currentUser = React.useContext(CurrentUserContext);

  const isOwn = props.card.owner._id === currentUser._id;
  const cardDeleteButtonClassName = cn("element__delete-button", {
    "element__delete-button_hidden" : !isOwn
  }); 
  const isLiked = props.card.likes.some((i) => i._id === currentUser._id);
  const cardLikeButtonClassName = cn("element__like-button", {
    "element__like-button_active" : isLiked
  })

  function handleClick() {
    props.onCardClick(props.card);
  }

  function handleLike() {
    props.onCardLike(props.card);
  }

  function handleDelete() {
    props.onCardDelete(props.card);
  }

  return (
    <li className="element">
      <img
        src={props.card.link}
        className="element__item"
        alt={props.card.name}
        onClick={handleClick}
      />
      <button
        type="button"
        className={cardDeleteButtonClassName}
        onClick={handleDelete}
      ></button>
      <div className="element__caption">
        <h2 className="element__title">{props.card.name}</h2>
        <div className="element__like-container">
          <button
            type="button"
            className={cardLikeButtonClassName}
            onClick={handleLike}
          ></button>
          <span className="element__like-counter">
            {props.card.likes.length}
          </span>
        </div>
      </div>
    </li>
  );
}

Card.propTypes = {
  onCardClick: PropTypes.func.isRequired,
  onCardLike: PropTypes.func.isRequired,
  onCardDelete: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  owner: PropTypes.object.isRequired,
  likes: PropTypes.array,
  link: PropTypes.string,
  name: PropTypes.string,
  length: PropTypes.number,
};

export default Card;