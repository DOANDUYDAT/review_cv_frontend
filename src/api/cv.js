/* eslint-disable no-unused-vars */
import feathers from "../services/socketClient";

const cvService = feathers.service("cvs");
const interestService = feathers.service("cvs/interest");
const reviewCvService = feathers.service("cvs/review-cv");

async function uploadCv(cvUpload) {
  const fData = new FormData();
  fData.append("uri", cvUpload);
  let myHeaders = new Headers();
  let token = "Bearer " + (await feathers.authentication.getAccessToken());
  myHeaders.append("Authorization", token);
  const res = await fetch("http://localhost:3030/cvs", {
    method: "POST",
    body: fData,
    headers: myHeaders,
    redirect: "follow"
  });
  return res;
}

async function getAllCvs() {
  const { data } = await cvService.find({});
  return data;
}

async function interestedCv(cvId) {
  const res = await interestService.create({
    cvId
  });
  return res;
}

async function getCvById(id) {
  const cv = await cvService.get(id);
  return cv;
}

async function reviewCv(cvId) {
  const res = await reviewCvService.create({
    cvId
  });
  return res;
}

export default {
  uploadCv,
  interestedCv,
  getAllCvs,
  getCvById,
  reviewCv
};
