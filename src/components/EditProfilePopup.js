import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import PopupWithForm from "./PopupWithForm";

function EditProfilePopup(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const [name, setName] = React.useState();
  const [description, setDescription] = React.useState();

  function handleChangeName(evt) {
    setName(evt.target.value);
  }

  function handleChangeDescription(evt) {
    setDescription(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    props.onUpdateUser({
      name: name,
      about: description,
    });
  }

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser]);

  return (
    <PopupWithForm
      title="Редактировать профиль"
      name="edit"
      buttonText="Сохранить"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      isLoading={props.isLoading}
      children={
        <>
          <input
            autoComplete="off"
            id="name-input"
            type="text"
            className="popup__input popup__input_type_name"
            onChange={handleChangeName}
            value={name ? name : ""}
            name="name"
            placeholder="Имя"
            minLength="2"
            maxLength="40"
            required
          />
          <span id="name-input-error" className="popup__error"></span>
          <input
            type="text"
            value={description ? description : ""}
            className="popup__input popup__input_type_job"
            onChange={handleChangeDescription}
            id="job-input"
            name="about"
            placeholder="Описание"
            minLength="2"
            maxLength="200"
            autoComplete="off"
            required
          />
          <span className="popup__error" id="job-input-error"></span>
        </>
      }
    />
  );
}

export default EditProfilePopup;