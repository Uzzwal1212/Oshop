/* eslint-disable import/no-anonymous-default-export */
import validator from "email-validator";
import { errorMessage } from "../../config/message.json";
export default {
  emailValideNew: (email) => {
    let error = "";

    let emailVaid = "";

    if (email) {
      emailVaid = email;
    } else {
      emailVaid = "";
    }

    if (emailVaid.length < 1) {
      error = errorMessage.email_required_new;
    } else if (!validator.validate(email)) {
      error = errorMessage.email_invalid_new;
    }

    return error;
  },

  emailValidate: (email) => {
    let error = "";

    let emailVaid = "";

    if (email) {
      emailVaid = email;
    } else {
      emailVaid = "";
    }

    if (emailVaid.length < 1) {
      error = errorMessage.required;
    } else if (!validator.validate(email)) {
      error = errorMessage.email_invalid;
    }

    return error;
  },

  requiredValidate: (name) => {
    let error = "";
    let nameArray = "";

    if (name) {
      nameArray = name.trim();
    } else {
      nameArray = "";
    }

    if (nameArray.length < 1) {
      error = errorMessage.required;
    }

    return error;
  },

  createPasswordValidate: (password) => {
    let error = "";

    if (password.length < 1 || password.trim() === "") {
      error = errorMessage.required;
    } else if (password.length < 5) {
      error = errorMessage.password;
    }
    return error;
  },

  rateChangeValidate: (rate) => {
    const regex = new RegExp("^[0-9]+\\.?[0-9]*$");

    return rate ? regex.test(rate) : true;
  },

  rateSubmitValidate: (rate) => {
    let error = "";
    const regex = new RegExp("^[0-9]*\\.?[0-9]+$");

    if (!regex.test(rate)) {
      error = errorMessage.decimalOnly;
    }

    return error;
  },

  imageUrlValidate: (url) => {
    let imgUrl = "";
    if (url) {
      imgUrl = url.trim();
    } else {
      imgUrl = "";
    }
    if (imgUrl.trim() === "") {
      return errorMessage.required;
    }
    const regex = new RegExp(/\.(jpeg|jpg|gif|png)$/);

    if (!regex.test(imgUrl)) {
      return errorMessage.invalid;
    }
  },
};
