/* eslint-disable no-unused-vars */
import feathers from "../services/restClient";

const specialistService = feathers.service("specialists");

async function getSpecialist(userId) {
  const user = await specialistService.get(userId);
  return user;
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
  // return users.filter(e => e.isAccept == false);
}

async function updateInfo(userId, data) {
  const users = await specialistService.patch(userId, data);
  return users;
}

async function createSpecialist(info) {
  const specialist = await specialistService.create(info);
  return specialist;
}

export default {
  getSpecialist,
  getAllNewSpecialists,
  accept,
  updateInfo,
  createSpecialist
};
