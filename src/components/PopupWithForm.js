import React from "react";
import FormValidator from "./FormValidator";
import { object } from "../utils/utils";

function PopupWithForm(props) {
  React.useEffect(() => {
    const formValidator = new FormValidator(
      `.popup_type_${props.name}`,
      object
    );
    formValidator.enableValidation();
    formValidator.resetError();
  }, [props.name]);

  return (
    <section
      className={`popup popup_type_${props.name} ${
        props.isOpen ? "popup_is-open" : ""
      }`}
    >
      <div className="popup__container">
        <button
          type="button"
          className="popup__close-button"
          onClick={props.onClose}
        ></button>
        <h2 className="popup__title">{props.title}</h2>
        <form
          action="#"
          name={props.name}
          className="popup__form"
          onSubmit={props.onSubmit}
          noValidate
        >
          {props.children}
          <button type="submit" className="popup__submit-button">
            {props.isLoading ? "Сохранение..." : props.buttonText}
          </button>
        </form>
      </div>
    </section>
  );
}

export default PopupWithForm;