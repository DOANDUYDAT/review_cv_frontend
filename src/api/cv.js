/* eslint-disable no-unused-vars */
import feathers from "../services/restClient";

const cvService = feathers.service("uploads");

async function uploadCv(file) {
  let formData = new FormData();
  formData.append("uri", file);
  console.log(formData.get("uri"));
  const res = await cvService.create(formData, {
    headers: {
      "content-type": "multipart/form-data"
    }
  });
  return res;
}

export default {
  uploadCv
};
