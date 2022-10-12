import axios from "axios";
import { API_KEY } from "./config/API_KEY";
// declare var google: any;
const form = document.querySelector("form")!;
const addressInput = <HTMLInputElement>document.getElementById("address")!;
type googleGeoRes = {
  results: { geometry: { location: { lat: number; lng: number } } }[];
  status: "OK" | "ZERO_RESULTS";
};

function searchAddressHandler(event: Event) {
  event.preventDefault();
  const enteredAddress = addressInput.value;
  axios
    .get<googleGeoRes>(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURI(
        enteredAddress
      )}&key=
  ${API_KEY}`
    )
    .then((res) => {
      if (res.data.status !== "OK") {
        throw new Error("could not fetch location!");
      }
      const coords = res.data.results[0].geometry.location;

      const map = new google.maps.Map(
        document.getElementById("map") as HTMLElement,
        {
          center: coords,
          zoom: 8,
        }
      );
      new google.maps.Marker({ position: coords, map: map });
    })
    .catch((err) => alert(err.message));
}
form.addEventListener("submit", searchAddressHandler);
