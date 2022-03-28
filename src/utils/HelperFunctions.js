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

export function decodeHtml(html) {
  let txt = document.createElement("textarea");
  txt.innerHTML = html;
  const decodedHtml = txt.value;
  txt.remove();
  return decodedHtml;
}
