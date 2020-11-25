import React from "react";
import PopupWithForm from "./PopupWithForm";

function ConfirmPopup(props) {
  function handleSubmit(evt) {
    evt.preventDefault();
    props.onConfirm();
  }

  return (
    <PopupWithForm
      title="Вы уверены?"
      name="confirm"
      buttonText="Да"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      isLoading={props.isLoading}
    />
  );
}
export default ConfirmPopup;