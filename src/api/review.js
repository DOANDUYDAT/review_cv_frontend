/* eslint-disable no-unused-vars */
import feathers from "../services/socketClient";

const reviewService = feathers.service("reviews");
const reportService = feathers.service("reports");

async function uploadReview(cvId, reviewUpload) {
  const fData = new FormData();
  fData.append("uri", reviewUpload);
  fData.append("cvId", cvId);
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

async function reportReview(reviewId, content) {
  const res = await reportService.create({
    reviewId,
    content
  });
  console.log(res);
  return res;
}

async function getListReviewByCvId(listCvId) {
  const { data } = await reviewService.find({
    query: {
      cvId: {
        $in: listCvId
      }
    }
  });
  return data;
}

export default {
  uploadReview,
  reportReview,
  getListReviewByCvId
};
