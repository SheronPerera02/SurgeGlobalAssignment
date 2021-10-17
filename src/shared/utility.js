export const updateObject = (state, updatedFields) => {
  return {
    ...state,
    ...updatedFields,
  };
};

export const status = {
  1: "Todo",
  2: "In Progress",
  3: "Done",
};

export const checkValidity = (value, rules) => {
  let isValid = true;
  if (rules.required) {
    isValid = value !== "" && isValid;
  }

  if (rules.minLength) {
    isValid = value.length >= rules.minLength && isValid;
  }

  if (rules.isEmail) {
    let atposition = value.indexOf("@");
    let dotposition = value.lastIndexOf(".");

    isValid = atposition !== -1 && dotposition !== -1 && isValid;

    if (atposition !== -1 && dotposition !== -1) {
      isValid =
        !(
          atposition < 1 ||
          dotposition < atposition + 2 ||
          dotposition + 2 >= value.length
        ) && isValid;
    }
  }

  return isValid;
};

export const checkFormValidity = (controls) => {
  let formIsValid = true;
  Object.keys(controls).forEach((key) => {
    formIsValid = controls[key].isValid && formIsValid;
  });
  return formIsValid;
};
