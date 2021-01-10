/* eslint-disable no-unused-vars */
import feathers from "../services/socketClient";

const reviewService = feathers.service("reviews");
const reportService = feathers.service("reviews/report");
const ratingService = feathers.service("reviews/rate");

const LIMIT_NUMBER = 10;

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
      },
      $sort: {
        createdAt: -1
      }
    }
  });
  return data;
}

async function getListReviewByListReviewId(listReviewId, pageNumber) {
  const skipNumber = (pageNumber - 1) * LIMIT_NUMBER;
  const { data } = await reviewService.find({
    query: {
      _id: {
        $in: listReviewId
      },
      $sort: {
        createdAt: -1
      },
      $limit: LIMIT_NUMBER,
      $skip: skipNumber
    }
  });
  return data;
}

async function getListReviewByCvId(cvId) {
  const { data } = await reviewService.find({
    query: {
      cvId,
      $sort: {
        createdAt: -1
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
  console.log(_id);
  const review = await ratingService.create({
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
  ratingReview,
  getListReviewByCvId,
  getListReviewByListReviewId
};
