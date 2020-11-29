import React from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup(props) {
  const [name, setName] = React.useState('');
  const [link, setLink] = React.useState('');

  function handleChangeName(evt) {
    setName(evt.target.value);
  }

  function handleChangeLink(evt) {
    setLink(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    props.onAddPlace({
      name,
      link
    });
  }

  return (
    <PopupWithForm
      title="Новое место"
      name="add"
      buttonText="Сохранить"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      isLoading={props.isLoading}
      children={
        <>
          <input
            onChange={handleChangeName}
            type="text"
            name="place"
            placeholder="Название"
            value={name}
            className="popup__input popup__input_type_place"
            id="place-input"
            minLength="1"
            maxLength="30"
            autoComplete="off"
            required
          />
          <span className="popup__error" id="place-input-error"></span>
          <input
            onChange={handleChangeLink}
            type="url"
            name="link"
            value={link}
            placeholder="Cсылка на картинку"
            className="popup__input popup__input_type_link"
            id="url-input"
            autoComplete="off"
            required
          />
          <span className="popup__error" id="url-input-error"></span>
        </>
      }
    />
  );
}

export default AddPlacePopup;