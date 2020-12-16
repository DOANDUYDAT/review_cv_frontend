/* eslint-disable no-unused-vars */
import feathers from "../services/socketClient";

const uploadService = feathers.service("uploads");
const cvService = feathers.service("cvs");

async function uploadCv(fileInput) {
  const fData = new FormData();
  fData.append("uri", fileInput, fileInput.name);
  const res = await fetch("http://localhost:3030/uploads", {
    method: "POST",
    body: fData
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
