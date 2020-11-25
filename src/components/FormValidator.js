export default class FormValidator {
    constructor(form, options, inputList, buttonElement) {
      this._form = document.querySelector(form);
      this._options = options;
      this._inputList = inputList;
      this._buttonElement = buttonElement;
    }
  
    _showInputError(inputElement, errorMessage) {
      const errorElement = this._form.querySelector(`#${inputElement.id}-error`);
      inputElement.classList.add(this._options.inputErrorClass);
      errorElement.textContent = errorMessage;
      errorElement.classList.add(this._options.errorClass);
    }
  
    _hideInputError(inputElement) {
      const errorElement = this._form.querySelector(`#${inputElement.id}-error`);
      inputElement.classList.remove(this._options.inputErrorClass);
      errorElement.classList.remove(this._options.errorClass);
      errorElement.textContent = "";
    }
  
    _checkInputValidity(input) {
      if (!input.validity.valid) {
        this._showInputError(input, input.validationMessage);
      } else {
        this._hideInputError(input, input.validationMessage);
      }
    }
  
    _hasInvalidInput() {
      return this._inputList.some((input) => {
        return !input.validity.valid;
      });
    }
  
    _toggleButtonState() {
      if (this._hasInvalidInput(this._inputList)) {
        this._buttonElement.setAttribute("disabled", true);
        this._buttonElement.classList.add(this._options.inactiveButtonClass);
      } else {
        this._buttonElement.removeAttribute("disabled");
        this._buttonElement.classList.remove(this._options.inactiveButtonClass);
      }
    }
  
    _checkInput(input) {
      this._checkInputValidity(input);
      this._toggleButtonState();
    }
  
    _setEventListeners() {
      this._inputList = Array.from(
        this._form.querySelectorAll(this._options.inputSelector)
      );
      this._buttonElement = this._form.querySelector(
        this._options.submitButtonSelector
      );
  
      this._inputList.forEach((input) => {
        input.addEventListener("input", () => {
          this._checkInput(input);
        });
      });
    }
  
    resetError() {
      this._toggleButtonState();
    }
  
    enableValidation() {
      this._setEventListeners();
    }
  }