export function convertStringToBoolean(string) {
  if (string === "True") {
    return true;
  } else if (string === "False") {
    return false;
  }
}

export function convertBooleanToString(boolean) {
  if (boolean === true) {
    return "True";
  } else if (boolean === false) {
    return "False";
  }
}
