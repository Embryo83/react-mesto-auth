import React from "react";

function InfoTooltip({ onClose, isOpen, image, message }) {
  return (
    <section className={`popup ${isOpen && "popup_is-open"}`}>
      <div className="popup__container">
        <img className="popup__info-pic" src={image} alt="Статус" />
        <h2 className="popup__info-text">{message}</h2>
        <button
          type="button"
          className="popup__close-button"
          onClick={onClose}
        ></button>
      </div>
    </section>
  );
}

export default InfoTooltip;