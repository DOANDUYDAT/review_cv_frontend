/* eslint-disable no-unused-vars */
import feathers from "../services/restClient";

const specialistService = feathers.service("specialists");

async function getSpecialist(userId) {
  const specialist = await specialistService.find({
    query: {
      userId
    }
  });
  return specialist;
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
  const res = await specialistService.find({
    query: {
      isAccept: false
    }
  });
  return res;
}

async function updateSpecialistInfo(userId, data) {
  const specialist = await specialistService.patch(userId, data);
  return specialist;
}

async function createSpecialist(info) {
  const specialist = await specialistService.create(info);
  return specialist;
}

export default {
  getSpecialist,
  getAllNewSpecialists,
  accept,
  updateSpecialistInfo,
  createSpecialist
};
