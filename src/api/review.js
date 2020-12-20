/* eslint-disable no-unused-vars */
import feathers from "../services/socketClient";

const reviewService = feathers.service("reviews");

async function createReview(data) {
  let myForm = new FormData();
  myForm.append("name", data.name);
  myForm.append("value", data.value);
  myForm.append("quantity", data.quantity);
  myForm.append("category", data.category);
  myForm.append("uri", data.image);

  let myHeaders = new Headers();
  let token = "Bearer " + (await feathers.authentication.getAccessToken());
  myHeaders.append("Authorization", token);
  console.log(token);
  const res = await fetch("http://localhost:3030/reviews", {
    method: "POST",
    body: myForm,
    headers: myHeaders,
    redirect: "follow"
  });
  return res;
}
export default {
  createReview
};
