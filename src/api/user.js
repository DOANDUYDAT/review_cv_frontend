/* eslint-disable no-unused-vars */
import feathers from "../services/restClient";

const userService = feathers.service("users");

async function getUser(id) {
  const user = await userService.get(id, {});
  return user;
}

async function getAllUsers() {
  const res = await userService.find({});
  return res;
}

export default {
  getUser,
  getAllUsers
};
