/* eslint-disable no-unused-vars */
import feathers from "../services/restClient";

const specialistService = feathers.service("specialists");

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

async function updateSpecialistInfo(userId, data) {
  const specialist = await specialistService.patch(userId, data);
  return specialist;
}

async function createSpecialist(info) {
  const specialist = await specialistService.create(info);
  return specialist;
}

export { specialistService as specialistRoot };

export default {
  getSpecialist,
  getAllNewSpecialists,
  accept,
  updateSpecialistInfo,
  createSpecialist,
  getAllSpecialists
};
