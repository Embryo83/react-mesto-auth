import React from "react";

function ImagePopup(props) {
  return (
    <section
      className={`popup popup_type_photo ${props.card.link ? "popup_is-open" : ""}`}
    >
      <figure className="popup__container_type_photo">
        <button
          type="button"
          className="popup__close-button"
          onClick={props.onClose}
        ></button>
        <img
          src={props.card.link}
          alt={props.card.name}
          className="popup__photo"
        />
        <figcaption className="popup__caption">{props.card.name}</figcaption>
      </figure>
    </section>
  );
}

export default ImagePopup;