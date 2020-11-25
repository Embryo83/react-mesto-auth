import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const avatarRef = React.useRef();

  function handleSubmit(evt) {
    evt.preventDefault();
    props.onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  }

  React.useEffect(() => {
    avatarRef.current.value = "";
  }, [currentUser]);

  return (
    <PopupWithForm
      title="Обновить аватар"
      buttonText="Сохранить"
      name="avatar"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      isLoading={props.isLoading}
      children={
        <>
          <input
            ref={avatarRef}
            id="avatar-input"
            type="url"
            name="link"
            placeholder="Ссылка на картинку"
            className="popup__input popup__input_type_ava"
            required
          />
          <span id="avatar-input-error" className="popup__error"></span>
        </>
      }
    />
  );
}

export default EditAvatarPopup;