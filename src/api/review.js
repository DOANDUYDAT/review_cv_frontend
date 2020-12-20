/* eslint-disable no-unused-vars */
import feathers from "../services/socketClient";

const reviewService = feathers.service("reviews");

async function uploadReview(reviewUpload) {
  const fData = new FormData();
  fData.append("uri", reviewUpload);
  let myHeaders = new Headers();
  let token = "Bearer " + (await feathers.authentication.getAccessToken());
  myHeaders.append("Authorization", token);
  const res = await fetch("http://localhost:3030/reviews", {
    method: "POST",
    body: fData,
    headers: myHeaders,
    redirect: "follow"
  });
  return res;
}

export default {
  uploadReview
};
