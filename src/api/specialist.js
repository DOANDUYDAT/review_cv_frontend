/* eslint-disable no-unused-vars */
import feathers from "../services/restClient";

const specialistService = feathers.service("specialists");
const updateInfoService = feathers.service("specialists/update-info");

async function getSpecialist(userId) {
  const { data } = await specialistService.find({
    query: {
      userId
    }
  });
  return data[0];
}

async function accept(id, data, params) {
  // const newData = {
  //   isAccept: true
  // }
  // const newParams = {
  //   query: {
  //     age: {
  //       $lte: 18
  //     }
  //   }
  // }
  // const response = await specialistService.patch(id, data, params);
  return true;
}

async function getAllNewSpecialists() {
  const { data } = await specialistService.find({
    query: {
      isAccept: false
    }
  });
  return data;
}

async function getAllSpecialists() {
  // const skipNumber = pageNumber * 20;
  const { data } = await specialistService.find({});
  return data;
}

async function updateSpecialistInfo(data) {
  const specialist = await updateInfoService.create(data);
  return specialist;
}

async function createSpecialist(info) {
  const specialist = await specialistService.create(info);
  return specialist;
}

export { updateInfoService };

export default {
  getSpecialist,
  getAllNewSpecialists,
  accept,
  updateSpecialistInfo,
  createSpecialist,
  getAllSpecialists
};
