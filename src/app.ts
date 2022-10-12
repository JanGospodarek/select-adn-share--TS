import axios from "axios";
import { API_KEY } from "./config/API_KEY";
const form = document.querySelector("form")!;
const addressInput = <HTMLInputElement>document.getElementById("address")!;
function searchAddressHandler(event: Event) {
  event.preventDefault();
  const enteredAddress = addressInput.value;
  axios
    .get(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURI(
        enteredAddress
      )}&key=
  ${API_KEY}`
    )
    .then((res) => {
      console.log(res);
    })
    .catch((err) => console.log(err));
}
form.addEventListener("submit", searchAddressHandler);
