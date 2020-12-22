/* eslint-disable no-unused-vars */
import feathers from "../services/socketClient";

const reviewService = feathers.service("reviews");
const reportService = feathers.service("reports");
const ratingService = feathers.service("reviews/rating");

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

async function getListReviewByListCvId(listCvId) {
  const { data } = await reviewService.find({
    query: {
      cvId: {
        $in: listCvId
      }
    }
  });
  return data;
}

async function getReview(id) {
  const review = await reviewService.get(id);
  return review;
}

async function ratingReview(_id, content) {
  const review = ratingService.create({
    _id,
    content
  });
  return review;
}

export default {
  uploadReview,
  reportReview,
  getListReviewByListCvId,
  getReview,
  ratingReview
};
