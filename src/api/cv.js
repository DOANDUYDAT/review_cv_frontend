/* eslint-disable no-unused-vars */
import feathers from "../services/socketClient";

const uploadService = feathers.service("uploads");
const cvService = feathers.service("cvs");

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

export default {
  uploadCv
};
